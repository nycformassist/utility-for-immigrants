import React, { useState } from 'react';
import { Shield, Globe, Printer, ArrowRight, ArrowLeft, CheckCircle2, Copy, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LANGUAGES, UI_LABELS, PHASE_1_QUESTIONS, TRIAGE_QUESTION, PHASE_2_QUESTIONS, PHASE_3_QUESTIONS, NYC_RESOURCES, CONSULATES, PROXIES, NARRATIVE_STARTERS } from './constants';

export default function App() {
  const [lang, setLang] = useState('EN');
  const [stage, setStage] = useState<'LANG' | 'PHASE1' | 'TRIAGE' | 'PHASE2' | 'PHASE3' | 'PHASE4' | 'ANALYZING' | 'PACKET'>('LANG');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [resources, setResources] = useState<any[]>([]);
  const [consulate, setConsulate] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');

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
      if (stage === 'PHASE1') {
        setStage('TRIAGE');
        setCurrentQ(0);
      } else if (stage === 'TRIAGE') {
        setStage('PHASE2');
        setCurrentQ(0);
      } else if (stage === 'PHASE2') {
        setStage('PHASE3');
        setCurrentQ(0);
      } else if (stage === 'PHASE3') {
        setStage('PHASE4');
        setCurrentQ(0);
      } else if (stage === 'PHASE4') {
        handleInterviewComplete();
      }
    }
  };

  const handlePrevQuestion = () => {
    if (stage === 'PHASE4') {
      setStage('PHASE3');
      setCurrentQ(PHASE_3_QUESTIONS.length - 1);
    } else if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    } else {
      if (stage === 'PHASE3') {
        setStage('PHASE2');
        setCurrentQ((PHASE_2_QUESTIONS[answers.case_type || 'asylum'] || []).length - 1);
      } else if (stage === 'PHASE2') {
        setStage('TRIAGE');
        setCurrentQ(0);
      } else if (stage === 'TRIAGE') {
        setStage('PHASE1');
        setCurrentQ(PHASE_1_QUESTIONS.length - 1);
      } else if (stage === 'PHASE1') {
        setStage('LANG');
      }
    }
  };

  const handleInterviewComplete = async () => {
    setStage('ANALYZING');
    
    // Resource Logic
    const zip = answers.zip_code || '';
    const prefix = zip.substring(0, 3);
    const match = NYC_RESOURCES.find(r => r.prefix === prefix);
    if (match) setResources([match]);
    else setResources(NYC_RESOURCES.filter(r => r.prefix === '100' || r.prefix === '104'));

    const country = (answers.country_of_origin || '').toLowerCase().trim();
    if (country && CONSULATES[country]) setConsulate(CONSULATES[country]);

    try {
      // SURGICAL FIX: Redirecting direct API call to the secure Netlify cloud engine
      const response = await fetch('/.netlify/functions/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, lang }),
      });
      
      const data = await response.json();
      setAiAnalysis(data.text || "Analysis could not be generated.");
    } catch (error) {
      console.error("AI Generation Error:", error);
      setAiAnalysis("Analysis generation failed due to a system error. Please proceed with the manual review.");
    }

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
          const selectedProxies = PROXIES[key].items.filter((i: any) => answers[i.id] === 'yes');
          if (selectedProxies.length > 0) {
            score++;
          }
        }
      }
    };
    ['has_passport', 'has_i94', 'has_lease', 'has_persecution_proof', 'has_green_card', 'has_tax_transcripts', 'has_marriage_cert', 'has_proof_of_relationship', 'has_arrests'].forEach(check);
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

  const generateHtml = () => {
    const { score, total } = calculateReadinessScore();
    const readinessPercent = Math.round((score / total) * 100);

    const resourcesHtml = resources.map(res => `
      <div style="padding: 1.5rem; border: 2px solid #e0e7ff; background-color: #eef2ff; border-radius: 0.75rem; margin-bottom: 1rem; position: relative;">
        <div style="position: absolute; top: 0; right: 0; background-color: #4f46e5; color: white; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.75rem; border-bottom-left-radius: 0.5rem; text-transform: uppercase;">
          ${res.borough}
        </div>
        <h4 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin: 0 0 0.5rem 0;">${res.name}</h4>
        <p style="color: #334155; margin: 0 0 0.25rem 0; font-weight: 500;">${res.address}</p>
        <p style="color: #334155; margin: 0 0 1rem 0; font-weight: 500;">${res.phone}</p>
      </div>
    `).join('');

    const triageRows: string[] = [];
    let hasProxies = false;
    const addRow = (item: string, key: string, nextStepYes: string, nextStepNo: string) => {
      if (answers[key]) {
        const isYes = answers[key] === 'yes';
        let statusHtml = isYes ? `<span class="status-green">${ui.statusGreen}</span>` : `<span class="status-red">${ui.statusRed}</span>`;
        let nextStepHtml = isYes ? nextStepYes : nextStepNo;
        
        if (!isYes && PROXIES[key]) {
          const selectedProxies = PROXIES[key].items.filter((i: any) => answers[i.id] === 'yes');
          if (selectedProxies.length > 0) {
            hasProxies = true;
            const proxyNames = selectedProxies.map((i: any) => i.label[lang]).join(', ');
            statusHtml = `<span class="status-green" style="background-color: #fef3c7; color: #92400e;">Ready via Secondary</span>`;
            nextStepHtml = `Secondary Verification: ${proxyNames}`;
          }
        }

        triageRows.push(`
          <tr>
            <td style="font-weight: 500;">${item}</td>
            <td>${statusHtml}</td>
            <td style="color: #64748b;">${nextStepHtml}</td>
          </tr>
        `);
      }
    };

    addRow('Passport', 'has_passport', 'Vaulted', consulate ? `Visit ${consulate.name}` : 'Locate alternative ID');
    addRow('I-94', 'has_i94', 'Vaulted', 'Check cbp.dhs.gov');
    addRow('Formal Lease', 'has_lease', 'Vaulted', 'Gather residence proof');
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${ui.packetTitle}</title>
        <style>
          body { font-family: sans-serif; padding: 2rem; color: #0f172a; }
          .font-serif { font-family: serif; }
          .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 2rem; }
          .section { margin-top: 2rem; }
          table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
          th, td { border: 1px solid #e2e8f0; padding: 0.75rem; text-align: left; }
          .status-green { color: green; font-weight: bold; }
          .status-red { color: red; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="font-serif">${ui.packetTitle}</h1>
          <p>Readiness Score: ${readinessPercent}%</p>
        </div>
        <div class="section">
          <h3 class="font-serif">Legal Analysis</h3>
          <p style="white-space: pre-wrap;">${aiAnalysis}</p>
        </div>
        <div class="section">
          <table>
            <thead><tr><th>Item</th><th>Status</th><th>Next Step</th></tr></thead>
            <tbody>${triageRows.join('')}</tbody>
          </table>
        </div>
      </body>
      </html>
    `;
  };

  const openPrintablePacket = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(generateHtml());
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  const copyRawHtml = () => {
    navigator.clipboard.writeText(generateHtml());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full text-center mb-8">
        <img src="https://imgur.com/xwdnkYt.png" alt="Seal" className="w-24 h-24 mx-auto mb-6 object-contain" />
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4 tracking-tight">{ui.title}</h1>
        <p className="text-lg text-slate-600 font-medium">{ui.subtitle}</p>
      </div>

      {stage !== 'LANG' && stage !== 'PACKET' && stage !== 'ANALYZING' && (
        <div className="max-w-3xl w-full mb-8">
          <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
            <span>Progress</span>
            <span>{getProgress()}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${getProgress()}%` }}></div>
          </div>
        </div>
      )}

      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <AnimatePresence mode="wait">
          {stage === 'LANG' && (
            <motion.div key="lang" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 sm:p-12">
              <div className="text-center mb-8">
                <Globe className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                <h2 className="text-2xl font-serif font-semibold text-slate-900">{ui.selectLanguage}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {LANGUAGES.map((l) => (
                  <button key={l.code} onClick={() => { setLang(l.code); setStage('PHASE1'); }} className="p-4 rounded-xl border-2 text-left hover:border-indigo-300 hover:bg-slate-50">
                    <span className="block text-lg font-medium">{l.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {(stage === 'PHASE1' || stage === 'TRIAGE' || stage === 'PHASE2' || stage === 'PHASE3') && question && (
            <motion.div key={question.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 sm:p-12">
              <h2 className="text-3xl font-serif font-semibold text-slate-900 mb-6">{question.labels[lang]}</h2>
              <div className="bg-[#312E81] rounded-xl p-4 flex items-start space-x-3 mb-8 text-[#E0E7FF] italic border-l-4 border-indigo-400">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-indigo-300" />
                <p className="text-sm leading-relaxed">{question.guardianTips[lang]}</p>
              </div>

              <div className="space-y-4">
                {question.type === 'radio' ? (
                  <div className="space-y-3">
                    {question.options?.map((opt: any) => (
                      <button key={opt.value} onClick={() => setAnswers({...answers, [question.id]: opt.value})} className={`w-full p-5 rounded-xl border-2 text-left flex justify-between items-center ${answers[question.id] === opt.value ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:bg-slate-50'}`}>
                        <span className="text-lg font-medium">{opt.labels[lang]}</span>
                        {answers[question.id] === opt.value && <CheckCircle2 className="w-6 h-6 text-indigo-600" />}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input type={question.type} value={answers[question.id] || ''} onChange={(e) => setAnswers({...answers, [question.id]: e.target.value})} placeholder={question.placeholders?.[lang]} className="w-full text-xl p-4 rounded-xl border-2 border-slate-200" />
                )}
              </div>

              {/* AMBER PROXY BOX - INVESTIGATIVE PROCESS */}
              {PROXIES[question.id] && answers[question.id] === 'no' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-6">
                  <h4 className="text-amber-900 font-bold mb-2">{PROXIES[question.id].title[lang]}</h4>
                  <p className="text-amber-800 text-sm mb-4">{PROXIES[question.id].desc[lang]}</p>
                  <div className="space-y-2">
                    {PROXIES[question.id].items.map((item: any) => (
                      <label key={item.id} className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" checked={answers[item.id] === 'yes'} onChange={(e) => setAnswers({...answers, [item.id]: e.target.checked ? 'yes' : 'no'})} className="w-5 h-5 text-amber-600 border-amber-300" />
                        <span className="text-amber-900 text-sm font-medium">{item.label[lang]}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}

              <footer className="flex justify-between mt-10 pt-6 border-t border-slate-100">
                <button onClick={handlePrevQuestion} className="flex items-center space-x-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest"><ArrowLeft className="w-4 h-4" /> <span>{ui.back}</span></button>
                <button onClick={handleNextQuestion} disabled={!answers[question.id] && question.id !== 'a_number'} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-indigo-700 disabled:opacity-30 flex items-center space-x-2"><span>{ui.next}</span><ArrowRight className="w-4 h-4" /></button>
              </footer>
            </motion.div>
          )}

          {stage === 'PHASE4' && (
            <motion.div key="phase4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 sm:p-12 text-center">
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 tracking-tight">Final Summary & Narrative</h2>
              <textarea value={answers.narrative_text || ''} onChange={(e) => setAnswers({...answers, narrative_text: e.target.value})} placeholder="Any additional context for your legal counsel?" rows={6} className="w-full text-lg p-4 rounded-xl border-2 border-slate-100 mb-8" />
              <button onClick={handleInterviewComplete} className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-200">Generate Legal Readiness Packet</button>
            </motion.div>
          )}

          {stage === 'ANALYZING' && (
            <div className="p-20 text-center">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-2xl font-serif font-bold text-slate-900">Analyzing Evidence Fortress...</h2>
            </div>
          )}

          {stage === 'PACKET' && (
            <motion.div key="packet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 sm:p-12 text-center">
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">{ui.packetReady}</h2>
              <div className="bg-slate-50 p-8 rounded-3xl text-left border border-slate-200 mb-8 shadow-inner">
                <h3 className="font-bold text-slate-800 mb-4 border-b pb-2 text-xs uppercase tracking-widest">Legal Analysis Summary</h3>
                <p className="text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">{aiAnalysis}</p>
              </div>
              <button onClick={openPrintablePacket} className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 mx-auto shadow-2xl shadow-indigo-200"><Printer /> {ui.openPrint}</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <footer className="mt-12 text-[10px] text-slate-400 uppercase tracking-[0.5em] font-black opacity-40">Sanctuary Architect 20345</footer>
    </div>
  );
}