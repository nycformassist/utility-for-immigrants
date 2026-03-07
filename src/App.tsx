import React, { useState, useRef } from 'react';
import { Shield, Globe, Printer, ArrowRight, ArrowLeft, CheckCircle2, Copy, Info } from 'lucide-react';
import { motion } from 'motion/react';
// GoogleGenAI removed — all AI calls go through /api/analyze serverless function
import { LANGUAGES, UI_LABELS, PHASE_1_QUESTIONS, TRIAGE_QUESTION, PHASE_2_QUESTIONS, PHASE_3_QUESTIONS, NYC_RESOURCES, CONSULATES, PROXIES, NARRATIVE_STARTERS } from './constants';

export default function App() {
  const [lang, setLang] = useState('EN');
  const [stage, setStage] = useState<'LANG' | 'PHASE1' | 'TRIAGE' | 'PHASE2' | 'PHASE3' | 'PHASE4' | 'ANALYZING' | 'PACKET'>('LANG');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [resources, setResources] = useState<any[]>([]);
  const [consulate, setConsulate] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  // ── STALE CLOSURE FIX ──────────────────────────────────────────────────────
  // aiAnalysis stored in BOTH state (for UI) and ref (for print).
  // generateHtml() receives the ref value directly — never a stale snapshot.
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const aiAnalysisRef = useRef<string>('');

  const setAnalysis = (text: string) => {
    aiAnalysisRef.current = text;
    setAiAnalysis(text);
  };

  const ui = UI_LABELS[lang] || UI_LABELS['EN'];

  const getQuestionsForStage = () => {
    if (stage === 'PHASE1') return PHASE_1_QUESTIONS;
    if (stage === 'TRIAGE') return [TRIAGE_QUESTION];
    if (stage === 'PHASE2') return PHASE_2_QUESTIONS[answers.case_type || 'asylum'] || [];
    if (stage === 'PHASE3') return PHASE_3_QUESTIONS;
    return [];
  };

  const questions = getQuestionsForStage();
  const question = questions[currentQ];

  const handleNextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      if (stage === 'PHASE1') { setStage('TRIAGE'); setCurrentQ(0); }
      else if (stage === 'TRIAGE') { setStage('PHASE2'); setCurrentQ(0); }
      else if (stage === 'PHASE2') { setStage('PHASE3'); setCurrentQ(0); }
      else if (stage === 'PHASE3') { setStage('PHASE4'); setCurrentQ(0); }
      else if (stage === 'PHASE4') { handleInterviewComplete(); }
    }
  };

  const handlePrevQuestion = () => {
    if (stage === 'PHASE4') {
      setStage('PHASE3');
      setCurrentQ(PHASE_3_QUESTIONS.length - 1);
    } else if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    } else {
      if (stage === 'PHASE3') { setStage('PHASE2'); setCurrentQ((PHASE_2_QUESTIONS[answers.case_type || 'asylum'] || []).length - 1); }
      else if (stage === 'PHASE2') { setStage('TRIAGE'); setCurrentQ(0); }
      else if (stage === 'TRIAGE') { setStage('PHASE1'); setCurrentQ(PHASE_1_QUESTIONS.length - 1); }
      else if (stage === 'PHASE1') { setStage('LANG'); }
    }
  };

  // ── STEP 1: INTERVIEW COMPLETE → AWAIT fetch → commit to ref → THEN show PACKET
  const handleInterviewComplete = async () => {
    setStage('ANALYZING');

    const zip = answers.zip_code || '';
    const prefix = zip.substring(0, 3);
    const match = NYC_RESOURCES.find((r: any) => r.prefix === prefix);
    if (match) setResources([match]);
    else setResources(NYC_RESOURCES.filter((r: any) => r.prefix === '100' || r.prefix === '104'));

    const country = (answers.country_of_origin || '').toLowerCase().trim();
    if (country && CONSULATES[country]) setConsulate(CONSULATES[country]);

    try {
      const narrativeStarters = NARRATIVE_STARTERS
        .filter((s: any) => answers[s.id] === 'yes')
        .map((s: any) => s.labels['EN']);

      // ── STREAMING FETCH ──────────────────────────────────────────────────
      // Reads SSE chunks from /api/analyze as they arrive.
      // The ANALYZING screen stays visible while text streams in.
      // setStage('PACKET') only fires after the 'done' event — never before.
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, lang, narrativeStarters }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let analysisText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = decoder.decode(value).split('\n');
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const event = JSON.parse(line.slice(6));
            if (event.type === 'chunk') {
              analysisText += event.text;
            } else if (event.type === 'done') {
              analysisText = event.analysis || analysisText;
            } else if (event.type === 'error') {
              analysisText = event.analysis || 'Analysis generation failed. Please proceed with the manual review.';
            }
          } catch { /* skip malformed SSE lines */ }
        }
      }

      setAnalysis(analysisText || 'Analysis could not be generated.');
    } catch (error) {
      console.error('AI Generation Error:', error);
      setAnalysis('Analysis generation failed due to a system error. Please proceed with the manual review.');
    }

    // Only advance to PACKET after analysis is fully committed
    setStage('PACKET');
  };

  const calculateReadinessScore = () => {
    let score = 0;
    let total = 0;
    const check = (key: string) => {
      if (answers[key]) {
        total++;
        if (answers[key] === 'yes') {
          score++;
        } else if (PROXIES[key]) {
          const sel = PROXIES[key].items.filter((i: any) => answers[i.id] === 'yes');
          if (sel.length > 0) score++;
        }
      }
    };
    ['has_passport','has_i94','has_lease','has_persecution_proof','has_green_card',
     'has_tax_transcripts','has_marriage_cert','has_proof_of_relationship','has_arrests'].forEach(check);
    return { score, total: total || 1 };
  };

  const getProgress = () => {
    if (stage === 'PHASE1') return 20;
    if (stage === 'TRIAGE') return 40;
    if (stage === 'PHASE2') return 60;
    if (stage === 'PHASE3') return 80;
    if (stage === 'PHASE4') return 90;
    if (stage === 'PACKET') return 100;
    return 0;
  };

  // ── generateHtml ACCEPTS liveAnalysis as a param — no stale closure possible ──
  const generateHtml = (liveAnalysis: string, liveConsulate: any, liveResources: any[]) => {
    const { score, total } = calculateReadinessScore();
    const readinessPercent = Math.round((score / total) * 100);

    const resourcesHtml = liveResources.map((res: any) => `
      <div style="padding:1.5rem;border:2px solid #e0e7ff;background:#eef2ff;border-radius:.75rem;margin-bottom:1rem;position:relative;">
        <div style="position:absolute;top:0;right:0;background:#4f46e5;color:white;font-size:.75rem;font-weight:700;padding:.25rem .75rem;border-bottom-left-radius:.5rem;text-transform:uppercase;">${res.borough}</div>
        <h4 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 .5rem 0;">${res.name}</h4>
        <p style="color:#334155;margin:0 0 .25rem 0;font-weight:500;">${res.address}</p>
        <p style="color:#334155;margin:0 0 1rem 0;font-weight:500;">${res.phone}</p>
        <div style="background:white;padding:1rem;border-radius:.5rem;border:1px solid #c7d2fe;margin-bottom:1rem;">
          <p style="font-size:.875rem;font-weight:600;color:#312e81;margin:0 0 .5rem 0;">🚇 ${res.transit}</p>
          <p style="font-size:.875rem;font-weight:500;color:#475569;margin:0;">🚶 ${ui.subwayExit}: ${res.exit}</p>
        </div>
      </div>`).join('');

    const triageRows: string[] = [];
    let hasProxies = false;
    const addRow = (item: string, key: string, nextStepYes: string, nextStepNo: string) => {
      if (answers[key]) {
        const isYes = answers[key] === 'yes';
        let statusHtml = isYes
          ? `<span class="status-green">${ui.statusGreen}</span>`
          : `<span class="status-red">${ui.statusRed}</span>`;
        let nextStepHtml = isYes ? nextStepYes : nextStepNo;
        if (!isYes && PROXIES[key]) {
          const sel = PROXIES[key].items.filter((i: any) => answers[i.id] === 'yes');
          if (sel.length > 0) {
            hasProxies = true;
            statusHtml = `<span class="status-green" style="background:#fef3c7;color:#92400e;">${ui.readyViaSecondary || 'Ready via Secondary'}</span>`;
            nextStepHtml = `${ui.readinessEstablishedViaProxy || 'Proxy'}: ${sel.map((i: any) => i.label[lang]).join(', ')}`;
          }
        }
        triageRows.push(`<tr><td style="font-weight:500;">${item}</td><td>${statusHtml}</td><td style="color:#64748b;">${nextStepHtml}</td></tr>`);
      }
    };

    addRow('Passport','has_passport','Photo-Vault & Email to self', liveConsulate ? `Visit ${liveConsulate.name} at ${liveConsulate.address}` : 'Locate alternative ID');
    addRow('I-94 Record','has_i94','Photo-Vault & Email to self','Retrieve digitally at i94.cbp.dhs.gov');
    addRow('Formal Lease','has_lease','Photo-Vault & Email to self','Gather alternative residence documents');
    addRow('Proof of Persecution','has_persecution_proof','Photo-Vault & Email to self','Begin gathering photos, reports, or witness letters');
    addRow('Green Card','has_green_card','Photo-Vault & Email to self','Locate or request replacement');
    addRow('Tax Transcripts','has_tax_transcripts','Photo-Vault & Email to self','Request from IRS.gov');
    addRow('Marriage/Divorce Certs','has_marriage_cert','Photo-Vault & Email to self','Request from vital records');
    addRow('Proof of Relationship','has_proof_of_relationship','Photo-Vault & Email to self','Gather photos, joint accounts');
    addRow('Certificates of Disposition','has_arrests','Photo-Vault & Email to self','Request from criminal court');

    const selectedStarters = NARRATIVE_STARTERS
      .filter((s: any) => answers[s.id] === 'yes')
      .map((s: any) => s.labels[lang as keyof typeof s.labels]);
    const narrativeText = answers.narrative_text || '';
    const hasNarrative = selectedStarters.length > 0 || narrativeText.trim().length > 0;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${ui.packetTitle}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap');
    body{font-family:'Inter',sans-serif;color:#0f172a;max-width:800px;margin:0 auto;padding:2rem;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    h1,h2,h3,.font-serif{font-family:'Merriweather',serif;}
    .watermark{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-35deg);font-family:'Merriweather',serif;font-size:5rem;font-weight:700;color:rgba(79,70,229,0.07);white-space:nowrap;pointer-events:none;letter-spacing:.2em;text-transform:uppercase;z-index:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    @media print{-webkit-print-color-adjust:exact;print-color-adjust:exact;.watermark{display:block!important;}}
    .header{text-align:center;border-bottom:2px solid #0f172a;padding-bottom:2rem;margin-bottom:2rem;}
    .header img{width:5rem;height:5rem;margin:0 auto 1rem;object-fit:contain;display:block;}
    .header h1{font-size:1.875rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin:0 0 .5rem;}
    .header p{font-size:.875rem;font-family:monospace;color:#64748b;text-transform:uppercase;letter-spacing:.1em;margin:0;}
    .section{margin-bottom:2rem;page-break-inside:avoid;}
    .section-title{font-size:1.25rem;font-weight:700;margin:0 0 1rem;border-bottom:1px solid #e2e8f0;padding-bottom:.5rem;}
    .exec-summary{font-size:1.125rem;color:#1e293b;line-height:1.8;font-style:italic;background:#f8fafc;padding:1.25rem;border-radius:.5rem;border:1px solid #e2e8f0;margin:0;white-space:pre-wrap;}
    table{width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:.5rem;overflow:hidden;}
    th{background:#f8fafc;text-align:left;padding:.75rem 1.5rem;font-size:.75rem;font-weight:500;color:#64748b;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e2e8f0;}
    td{padding:1rem 1.5rem;font-size:.875rem;border-bottom:1px solid #e2e8f0;}
    .status-green{display:inline-flex;padding:.125rem .625rem;border-radius:9999px;font-size:.75rem;font-weight:500;background:#dcfce7;color:#166534;}
    .status-red{display:inline-flex;padding:.125rem .625rem;border-radius:9999px;font-size:.75rem;font-weight:500;background:#fee2e2;color:#991b1b;}
    .footer{margin-top:3rem;padding-top:2rem;border-top:1px solid #e2e8f0;text-align:center;}
    .footer p{margin:0 0 .5rem;font-size:.875rem;font-weight:500;}
    .footer small{font-size:.75rem;color:#64748b;text-transform:uppercase;letter-spacing:.1em;}
  </style>
</head>
<body>
  <div class="watermark">CONFIDENTIAL</div>
  <div class="header">
    <img src="/logo.png" alt="The Human Anchor Seal" onerror="this.style.display='none'" />
    <h1 class="font-serif">${ui.packetTitle}</h1>
    <p>${ui.humanAnchorSeal} &bull; ${new Date().toLocaleDateString()}</p>
    <div style="margin-top:1rem;display:inline-block;background:#eef2ff;color:#4f46e5;padding:.5rem 1rem;border-radius:9999px;font-weight:700;font-size:.875rem;">${ui.readinessScore}: ${readinessPercent}%</div>
  </div>
  <div class="section">
    <h3 class="section-title font-serif">${ui.sourceOfTruth || 'Source of Truth Analysis'}</h3>
    <p class="exec-summary font-serif">${liveAnalysis}</p>
  </div>
  ${hasNarrative ? `<div class="section"><h3 class="section-title font-serif">${ui.personalNarrative}</h3><div style="background:white;padding:1.5rem;border:1px solid #e2e8f0;border-radius:.5rem;">${selectedStarters.length > 0 ? `<ul style="margin-top:0;margin-bottom:1rem;padding-left:1.5rem;color:#334155;font-weight:500;">${selectedStarters.map((s: any) => `<li style="margin-bottom:.5rem;">${s}</li>`).join('')}</ul>` : ''}${narrativeText ? `<p style="margin:0;color:#1e293b;line-height:1.6;white-space:pre-wrap;">${narrativeText}</p>` : ''}</div></div>` : ''}
  <div class="section">
    <h3 class="section-title font-serif">${ui.triageTable}</h3>
    <table><thead><tr><th>${ui.item}</th><th>${ui.status}</th><th>${ui.nextStep}</th></tr></thead><tbody>${triageRows.join('')}</tbody></table>
  </div>
  <div class="section">
    <h3 class="section-title font-serif">${ui.localResources}</h3>
    ${resourcesHtml || '<p style="color:#64748b;font-style:italic;">No specific resources found.</p>'}
  </div>
  <div class="footer">
    ${hasProxies ? `<p style="font-size:.875rem;font-weight:600;color:#92400e;background:#fef3c7;padding:1rem;border-radius:.5rem;margin-bottom:1rem;text-align:left;">${ui.noteForLegalCounsel}</p>` : ''}
    <p>${ui.privacyShield}</p>
    <small>${ui.disclaimer}</small>
    <div style="margin-top:2rem;font-size:.75rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.1em;">Sanctuary Architect 20345 | Powered by Parametric Insight Engine</div>
  </div>
</body>
</html>`;
  };

  // ── STEP 2: PRINT — async sequence, dialog never fires before content is ready ──
  // 1. open blank window  2. write HTML with ref value  3. close doc
  // 4. await load event (fonts rendered)  5. THEN window.print()
  const openPrintablePacket = async () => {
    setIsPrinting(true);
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Please allow pop-ups to print your Readiness Packet.');
        return;
      }
      const html = generateHtml(aiAnalysisRef.current, consulate, resources);
      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();

      await new Promise<void>(resolve => {
        printWindow.addEventListener('load', () => resolve(), { once: true });
        setTimeout(resolve, 1200); // fallback if load event doesn't fire
      });

      printWindow.focus();
      printWindow.print();
    } finally {
      setIsPrinting(false);
    }
  };

  const copyRawHtml = () => {
    navigator.clipboard.writeText(generateHtml(aiAnalysisRef.current, consulate, resources));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full text-center mb-8">
        <img src="/logo.png" alt="The Human Anchor Seal" className="w-24 h-24 mx-auto mb-6 object-contain"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4 tracking-tight">{ui.title}</h1>
        <p className="text-lg text-slate-600 font-medium">{ui.subtitle}</p>
      </div>

      {stage !== 'LANG' && stage !== 'PACKET' && stage !== 'ANALYZING' && (
        <div className="max-w-3xl w-full mb-8">
          <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
            <span>{ui.immigrantReadiness}</span><span>{getProgress()}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${getProgress()}%` }}></div>
          </div>
        </div>
      )}

      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {stage === 'LANG' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <Globe className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
              <h2 className="text-2xl font-serif font-semibold text-slate-900">{ui.selectLanguage}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LANGUAGES.map((l: any) => (
                <button key={l.code} onClick={() => { setLang(l.code); setStage('PHASE1'); setCurrentQ(0); }}
                  className="p-4 rounded-xl border-2 text-left transition-all duration-200 border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700">
                  <span className="block text-lg font-medium">{l.name}</span>
                  <span className="block text-xs text-slate-500 mt-1">{l.code}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {(stage === 'PHASE1' || stage === 'TRIAGE' || stage === 'PHASE2' || stage === 'PHASE3') && question && (
          <motion.div key={question.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="p-8 sm:p-12">
            <div className="mb-8 flex items-center justify-between text-sm font-medium text-slate-400">
              <span className="uppercase tracking-wider">{stage === 'PHASE1' ? ui.phase1 : stage === 'TRIAGE' ? ui.phase2 : stage === 'PHASE2' ? ui.phase2 : ui.phase3}</span>
              <span>Q {currentQ + 1} / {questions.length}</span>
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl font-serif font-semibold text-slate-900">{question.labels[lang as keyof typeof question.labels]}</h2>
              <div className="bg-indigo-50 rounded-xl p-4 flex items-start space-x-3 border border-indigo-100">
                <Shield className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-indigo-900 leading-relaxed font-medium">{question.guardianTips[lang as keyof typeof question.guardianTips]}</p>
              </div>
              <div>
                {question.type === 'radio' && question.options ? (
                  <div className="space-y-3">
                    {question.options.map((opt: any) => (
                      <button key={opt.value} onClick={() => setAnswers({...answers, [question.id]: opt.value})}
                        className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between ${answers[question.id] === opt.value ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700'}`}>
                        <span className="text-lg font-medium">{opt.labels[lang as keyof typeof opt.labels]}</span>
                        {answers[question.id] === opt.value && <CheckCircle2 className="w-6 h-6 text-indigo-600" />}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input type={question.type} value={answers[question.id] || ''}
                    onChange={(e) => setAnswers({...answers, [question.id]: e.target.value})}
                    placeholder={question.placeholders ? question.placeholders[lang as keyof typeof question.placeholders] : ''}
                    className="w-full text-xl p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:ring-0 transition-colors" />
                )}
              </div>
              {['has_passport','has_i94','has_lease','has_persecution_proof','has_green_card','has_tax_transcripts','has_marriage_cert','has_proof_of_relationship','has_arrests'].includes(question.id) && answers[question.id] === 'yes' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3 mt-4">
                  <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-900 font-semibold">{ui.photoVault}</p>
                </motion.div>
              )}
              {PROXIES[question.id] && answers[question.id] === 'no' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mt-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <Info className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <h4 className="text-indigo-900 font-semibold text-lg">{PROXIES[question.id].title[lang as keyof typeof PROXIES[string]['title']]}</h4>
                  </div>
                  <div className="pl-8">
                    <p className="text-indigo-800 text-sm mb-3">{PROXIES[question.id].desc[lang as keyof typeof PROXIES[string]['desc']]}</p>
                    <div className="space-y-3">
                      {PROXIES[question.id].items.map((item: any) => (
                        <label key={item.id} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-indigo-100/50 transition-colors">
                          <input type="checkbox" checked={answers[item.id] === 'yes'}
                            onChange={(e) => setAnswers({...answers, [item.id]: e.target.checked ? 'yes' : 'no'})}
                            className="w-5 h-5 text-indigo-600 border-indigo-300 rounded focus:ring-indigo-500" />
                          <span className="text-indigo-900 text-sm font-medium">{item.label[lang as keyof typeof item.label]}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div className="flex justify-between pt-6 border-t border-slate-100">
                <button onClick={handlePrevQuestion} className="px-6 py-3 text-slate-600 font-medium hover:text-slate-900 transition-colors flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" /><span>{ui.back}</span>
                </button>
                <button onClick={handleNextQuestion} disabled={!answers[question.id] && question.id !== 'a_number'}
                  className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  <span>{ui.next}</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {stage === 'PHASE4' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="p-8 sm:p-12">
            <div className="mb-8 flex items-center justify-between text-sm font-medium text-slate-400">
              <span className="uppercase tracking-wider">{ui.phase4}</span>
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl font-serif font-semibold text-slate-900">{ui.narrativeTitle}</h2>
              <div className="bg-indigo-50 rounded-xl p-4 flex items-start space-x-3 border border-indigo-100">
                <Info className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-indigo-900 leading-relaxed font-medium">{ui.narrativeDesc}</p>
              </div>
              <div className="space-y-4">
                {NARRATIVE_STARTERS.map((starter: any) => (
                  <label key={starter.id} className="flex items-start space-x-3 cursor-pointer p-3 rounded-xl border-2 border-slate-200 hover:border-indigo-300 hover:bg-slate-50 transition-colors">
                    <input type="checkbox" checked={answers[starter.id] === 'yes'}
                      onChange={(e) => setAnswers({...answers, [starter.id]: e.target.checked ? 'yes' : 'no'})}
                      className="w-5 h-5 mt-0.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
                    <span className="text-slate-700 font-medium">{starter.labels[lang as keyof typeof starter.labels]}</span>
                  </label>
                ))}
              </div>
              <div>
                <textarea value={answers.narrative_text || ''} onChange={(e) => setAnswers({...answers, narrative_text: e.target.value})}
                  placeholder={ui.narrativePlaceholder} maxLength={1000} rows={6}
                  className="w-full text-lg p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:ring-0 transition-colors resize-none" />
                <div className="text-right text-xs text-slate-400 mt-2">{(answers.narrative_text || '').length} / 1000</div>
              </div>
              <div className="flex justify-between pt-6 border-t border-slate-100">
                <button onClick={handlePrevQuestion} className="px-6 py-3 text-slate-600 font-medium hover:text-slate-900 transition-colors flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" /><span>{ui.back}</span>
                </button>
                <button onClick={handleNextQuestion} className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors flex items-center space-x-2">
                  <span>{ui.next}</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {stage === 'ANALYZING' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-16 text-center">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-serif font-semibold text-slate-900">{ui.analyzing}</h2>
            <p className="text-slate-500 mt-2">{ui.generating}</p>
          </motion.div>
        )}

        {stage === 'PACKET' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="p-8 sm:p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">{ui.packetReady}</h2>
            <p className="text-lg text-slate-600 mb-8">{ui.packetDesc}</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button onClick={openPrintablePacket} disabled={isPrinting}
                className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center space-x-2 shadow-lg w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-wait">
                <Printer className="w-5 h-5" />
                <span>{isPrinting ? 'Preparing...' : ui.openPrint}</span>
              </button>
              <button onClick={() => { setStage('LANG'); setAnswers({}); setCurrentQ(0); setAnalysis(''); }}
                className="px-8 py-4 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors w-full sm:w-auto justify-center border border-slate-200">
                {ui.startOver}
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {stage === 'PACKET' && (
        <div className="mt-8 text-center max-w-2xl">
          <button onClick={copyRawHtml} className="inline-flex items-center space-x-2 text-slate-500 hover:text-slate-700 px-4 py-2 rounded-full text-sm font-medium transition-colors">
            <Copy className="w-4 h-4" />
            <span>{copied ? ui.copied : ui.copyHtml}</span>
          </button>
        </div>
      )}
      <div className="mt-12 text-center text-xs text-slate-400 uppercase tracking-widest">
        Sanctuary Architect 20345 | Powered by Parametric Insight Engine
      </div>
    </div>
  );
}
