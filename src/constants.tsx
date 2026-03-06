export const LANGUAGES = [
  { code: 'EN', name: 'English' },
  { code: 'ES', name: 'Español' },
  { code: 'HT', name: 'Kreyòl Ayisyen' },
  { code: 'AR', name: 'العربية' },
  { code: 'ZH', name: '简体中文' },
];

export const NYC_RESOURCES = [
  { prefix: "100", borough: "Manhattan", name: "The Legal Aid Society", address: "199 Water St, New York, NY 10038", phone: "(212) 577-3300", mapUrl: "https://maps.google.com/?q=199+Water+St,+New+York,+NY+10038", transit: "Take the 2/3 to Wall St.", exit: "Use the Wall St exit and walk south." },
  { prefix: "104", borough: "Bronx", name: "The Bronx Defenders", address: "360 E 161st St, Bronx, NY 10451", phone: "(718) 838-7878", mapUrl: "https://maps.google.com/?q=360+E+161st+St,+Bronx,+NY+10451", transit: "Take the 4/B/D to 161st-Yankee Stadium.", exit: "Front of Train exit for Grand Concourse." },
  { prefix: "111", borough: "Queens", name: "MinKwon Center", address: "133-29 41st Ave, Flushing, NY 11355", phone: "(718) 460-5600", mapUrl: "https://maps.google.com/?q=133-29+41st+Ave,+Flushing,+NY+11355", transit: "Take the 7 train to Flushing-Main St.", exit: "Exit at Main St and walk south." },
  { prefix: "112", borough: "Brooklyn", name: "Brooklyn Legal Services", address: "105 Court St, Brooklyn, NY 11201", phone: "(718) 233-6222", mapUrl: "https://maps.google.com/?q=105+Court+St,+Brooklyn,+NY+11201", transit: "Take the 2/3/4/5 or R to Borough Hall/Court St.", exit: "Exit at Court St." },
  { prefix: "103", borough: "Staten Island", name: "Project Hospitality", address: "100 Park Ave, Staten Island, NY 10302", phone: "(718) 448-1544", mapUrl: "https://maps.google.com/?q=100+Park+Ave,+Staten+Island,+NY+10302", transit: "Take the S48/S98 bus to Richmond Terrace/Park Ave.", exit: "Exit at Park Ave." }
];

export const CONSULATES: Record<string, { name: string, address: string, mapUrl: string }> = {
  "venezuela": { name: "Consulate General of Venezuela", address: "7 E 51st St, New York, NY 10022", mapUrl: "https://maps.google.com/?q=7+E+51st+St,+New+York,+NY+10022" },
  "haiti": { name: "Consulate General of Haiti", address: "815 2nd Ave, New York, NY 10017", mapUrl: "https://maps.google.com/?q=815+2nd+Ave,+New+York,+NY+10017" },
  "colombia": { name: "Consulate General of Colombia", address: "10 E 46th St, New York, NY 10017", mapUrl: "https://maps.google.com/?q=10+E+46th+St,+New+York,+NY+10017" },
  "mauritania": { name: "Permanent Mission of Mauritania", address: "211 E 43rd St, New York, NY 10017", mapUrl: "https://maps.google.com/?q=211+E+43rd+St,+New+York,+NY+10017" }
};

export const UI_LABELS: Record<string, any> = {
  EN: {
    title: "Immigrant Legal Readiness Utility", subtitle: "A secure, private space to prepare your journey.",
    start: "Start Session", next: "Next", back: "Back", analyzing: "Analyzing your procedural needs...",
    generating: "Generating Readiness Packet...", packetTitle: "Readiness Packet", printBtn: "Save as PDF / Print",
    privacyShield: "Privacy Shield: Your data is never saved or shared.", formsChecklist: "Required Forms Checklist",
    localResources: "Safe-Landing Hub", humanAnchorSeal: "The Human Anchor", disclaimer: "This tool provides procedural information, not legal advice.",
    evidenceChecklist: "Evidence Audit", yes: "Yes", no: "No",
    photoVault: "Photo-Vault this now: Email a clear photo to yourself with subject 'LEGAL SHIELD'.",
    subwayExit: "Subway Exit", triageTable: "Priority Action Table", item: "Item", status: "Status", nextStep: "Strategic Next Step",
    executiveSummary: "Executive Summary", sourceOfTruth: "Source of Truth Analysis", statusGreen: "Available", statusRed: "Missing", readinessScore: "Readiness Score",
    copyHtml: "Copy Raw HTML", copied: "Copied!",
    phase1: "Phase 1: Core Identity", phase2: "Phase 2: Pathway Triage", phase3: "Phase 3: Legal Screening", phase4: "Phase 4: Personal Narrative",
    immigrantReadiness: "Immigrant Readiness", selectLanguage: "Select your preferred language",
    packetReady: "Your Readiness Packet is Ready", packetDesc: "We have compiled your Executive Summary, Priority Action Table, and Local Resources.",
    openPrint: "Open & Print Packet", startOver: "Start Over",
    altIdTitle: "Acceptable Alternative IDs",
    altIdDesc: "To reduce delays in the process, please gather any of the following alternative forms of identification:",
    altIdList: [
      "Consular IDs (e.g., Matrícula Consular)",
      "Birth Certificates",
      "National Identity Cards",
      "Municipal IDs (e.g., IDNYC)"
    ],
    readyViaSecondary: "Ready via Secondary Verification",
    readinessEstablishedViaProxy: "Readiness Established via Proxy",
    noteForLegalCounsel: "Note for Legal Counsel: Where primary evidence is missing, secondary proxies have been identified to expedite the intake process.",
    narrativeTitle: "In Your Own Words",
    narrativeDesc: "Please select any statements that apply to you and provide a brief explanation (max 1000 characters).",
    narrativePlaceholder: "Explain your situation here...",
    personalNarrative: "Personal Narrative"
  },
  ES: {
    title: "Utilidad de Preparación Legal", subtitle: "Un espacio seguro y privado.",
    start: "Iniciar", next: "Siguiente", back: "Atrás", analyzing: "Analizando...",
    generating: "Generando...", packetTitle: "Paquete de Preparación", printBtn: "Imprimir / PDF",
    privacyShield: "Privacidad: Sus datos no se guardan.", formsChecklist: "Formularios",
    localResources: "Centro Seguro", humanAnchorSeal: "El Ancla Humana", disclaimer: "Información, no consejo legal.",
    evidenceChecklist: "Auditoría", yes: "Sí", no: "No",
    photoVault: "Bóveda de fotos: Envíese una foto.",
    subwayExit: "Salida del Metro", triageTable: "Tabla de Acción", item: "Artículo", status: "Estado", nextStep: "Próximo Paso",
    executiveSummary: "Resumen", sourceOfTruth: "Análisis de Fuente de Verdad", statusGreen: "Disponible", statusRed: "Falta", readinessScore: "Puntuación",
    copyHtml: "Copiar HTML", copied: "¡Copiado!",
    phase1: "Fase 1: Identidad", phase2: "Fase 2: Vía", phase3: "Fase 3: Evaluación Legal", phase4: "Fase 4: Narrativa Personal",
    immigrantReadiness: "Preparación del Inmigrante", selectLanguage: "Seleccione su idioma preferido",
    packetReady: "Su Paquete de Preparación está Listo", packetDesc: "Hemos compilado su Resumen Ejecutivo, Tabla de Acción Prioritaria y Recursos Locales.",
    openPrint: "Abrir e Imprimir Paquete", startOver: "Empezar de Nuevo",
    altIdTitle: "Identificaciones Alternativas Aceptables",
    altIdDesc: "Para reducir demoras en el proceso, por favor reúna cualquiera de las siguientes formas alternativas de identificación:",
    altIdList: [
      "Identificaciones Consulares (ej. Matrícula Consular)",
      "Certificados de Nacimiento",
      "Tarjetas de Identidad Nacional",
      "Identificaciones Municipales (ej. IDNYC)"
    ],
    readyViaSecondary: "Listo por Verificación Secundaria",
    readinessEstablishedViaProxy: "Preparación Establecida a través de Proxy",
    noteForLegalCounsel: "Nota para el Asesor Legal: Cuando falta evidencia primaria, se han identificado proxies secundarios para acelerar el proceso de admisión.",
    narrativeTitle: "En Sus Propias Palabras",
    narrativeDesc: "Seleccione cualquier declaración que se aplique a usted y proporcione una breve explicación (máx. 1000 caracteres).",
    narrativePlaceholder: "Explique su situación aquí...",
    personalNarrative: "Narrativa Personal"
  },
  ZH: {
    title: "移民法律准备工具", subtitle: "一个安全、私密的空间来准备您的旅程。",
    start: "开始", next: "下一步", back: "返回", analyzing: "正在分析您的程序需求...",
    generating: "正在生成准备包...", packetTitle: "准备包", printBtn: "打印 / 保存为 PDF",
    privacyShield: "隐私保护：您的数据绝不会被保存或共享。", formsChecklist: "所需表格清单",
    localResources: "安全登陆中心", humanAnchorSeal: "人类锚点", disclaimer: "此工具提供程序信息，而非法律建议。",
    evidenceChecklist: "证据审核", yes: "是", no: "否",
    photoVault: "立即照片存档：将清晰的照片通过电子邮件发送给自己，主题为“法律保护盾”。",
    subwayExit: "地铁出口", triageTable: "优先行动表", item: "项目", status: "状态", nextStep: "战略下一步",
    executiveSummary: "执行摘要", sourceOfTruth: "真相来源分析", statusGreen: "可用", statusRed: "缺失", readinessScore: "准备度得分",
    copyHtml: "复制 HTML", copied: "已复制！",
    phase1: "第一阶段：核心身份", phase2: "第二阶段：途径分类", phase3: "第三阶段：法律筛查", phase4: "第四阶段：个人陈述",
    immigrantReadiness: "移民准备度", selectLanguage: "选择您的首选语言",
    packetReady: "您的准备包已就绪", packetDesc: "我们已经汇编了您的执行摘要、优先行动表和本地资源。",
    openPrint: "打开并打印准备包", startOver: "重新开始",
    altIdTitle: "可接受的替代身份证件",
    altIdDesc: "为了减少流程中的延误，请收集以下任何一种替代身份证明：",
    altIdList: [
      "领事身份证（例如：领事登记卡）",
      "出生证明",
      "国民身份证",
      "市政身份证（例如：IDNYC）"
    ],
    readyViaSecondary: "通过二次验证就绪",
    readinessEstablishedViaProxy: "通过替代文件建立准备",
    noteForLegalCounsel: "法律顾问注意事项：在缺少主要证据的情况下，已确定次要替代文件以加快接收流程。",
    narrativeTitle: "用您自己的话来说",
    narrativeDesc: "请选择适用于您的任何陈述，并提供简短说明（最多 1000 个字符）。",
    narrativePlaceholder: "在这里解释您的情况...",
    personalNarrative: "个人陈述"
  },
  HT: {
    title: "Sèvis Preparasyon Legal pou Imigran", subtitle: "Yon espas an sekirite, prive pou prepare vwayaj ou.",
    start: "Kòmanse", next: "Pwochen", back: "Tounen", analyzing: "N ap analize bezwen pwosedi ou yo...",
    generating: "N ap jere Pake Preparasyon an...", packetTitle: "Pake Preparasyon", printBtn: "Enprime / PDF",
    privacyShield: "Pwoteksyon Vi Prive: Nou pa janm sove oswa pataje done ou yo.", formsChecklist: "Lis Fòm ki Nesesè",
    localResources: "Sant Sekirite", humanAnchorSeal: "Lank Imèn nan", disclaimer: "Zouti sa a bay enfòmasyon sou pwosedi, pa konsèy legal.",
    evidenceChecklist: "Odit Prèv", yes: "Wi", no: "Non",
    photoVault: "Sove foto sa a kounye a: Voye yon foto klè ba tèt ou ak sijè 'PWOTEKSYON LEGAL'.",
    subwayExit: "Sòti Tren", triageTable: "Tablo Aksyon Priyorite", item: "Atik", status: "Estati", nextStep: "Pwochen Etap Estratejik",
    executiveSummary: "Rezime Egzekitif", sourceOfTruth: "Analiz Sous Verite", statusGreen: "Disponib", statusRed: "Manke", readinessScore: "Nòt Preparasyon",
    copyHtml: "Kopi HTML", copied: "Kopye!",
    phase1: "Faza 1: Idantite Debaz", phase2: "Faza 2: Triyaj Chemen", phase3: "Faza 3: Evalyasyon Legal", phase4: "Faza 4: Istwa Pèsonèl",
    immigrantReadiness: "Preparasyon Imigran", selectLanguage: "Chwazi lang ou pi pito a",
    packetReady: "Pake Preparasyon ou an Pare", packetDesc: "Nou konpile Rezime Egzekitif ou, Tablo Aksyon Priyorite, ak Resous Lokal yo.",
    openPrint: "Louvri ak Enprime Pake a", startOver: "Kòmanse Ankò",
    altIdTitle: "Pyes Idantite Altènatif ki Akseptab",
    altIdDesc: "Pou diminye reta nan pwosesis la, tanpri rasanble nenpòt nan fòm idantifikasyon altènatif sa yo:",
    altIdList: [
      "Kat Idantite Konsila (egz., Matrícula Consular)",
      "Sètifika Nesans",
      "Kat Idantite Nasyonal",
      "Kat Idantite Minisipal (egz., IDNYC)"
    ],
    readyViaSecondary: "Pare atravè Verifikasyon Segondè",
    readinessEstablishedViaProxy: "Preparasyon Etabli atravè Pwokirasyon",
    noteForLegalCounsel: "Nòt pou Avoka: Kote prèv prensipal la manke, yo idantifye pwokirasyon segondè pou akselere pwosesis admisyon an.",
    narrativeTitle: "Nan Pwòp Mo Pa Ou",
    narrativeDesc: "Tanpri chwazi nenpòt deklarasyon ki aplike pou ou epi bay yon ti esplikasyon (max 1000 karaktè).",
    narrativePlaceholder: "Eksplike sitiyasyon ou isit la...",
    personalNarrative: "Istwa Pèsonèl"
  },
  AR: {
    title: "أداة الاستعداد القانوني للمهاجرين", subtitle: "مساحة آمنة وخاصة لإعداد رحلتك.",
    start: "ابدأ", next: "التالي", back: "رجوع", analyzing: "جاري تحليل احتياجاتك الإجرائية...",
    generating: "جاري إنشاء حزمة الاستعداد...", packetTitle: "حزمة الاستعداد", printBtn: "طباعة / PDF",
    privacyShield: "حماية الخصوصية: لا يتم حفظ بياناتك أو مشاركتها أبدًا.", formsChecklist: "قائمة النماذج المطلوبة",
    localResources: "مركز الهبوط الآمن", humanAnchorSeal: "المرساة البشرية", disclaimer: "توفر هذه الأداة معلومات إجرائية، وليس نصيحة قانونية.",
    evidenceChecklist: "تدقيق الأدلة", yes: "نعم", no: "لا",
    photoVault: "احفظ الصورة الآن: أرسل صورة واضحة لنفسك عبر البريد الإلكتروني بعنوان 'درع قانوني'.",
    subwayExit: "مخرج المترو", triageTable: "جدول الإجراءات ذات الأولوية", item: "عنصر", status: "الحالة", nextStep: "الخطوة الاستراتيجية التالية",
    executiveSummary: "ملخص تنفيذي", sourceOfTruth: "تحليل مصدر الحقيقة", statusGreen: "متاح", statusRed: "مفقود", readinessScore: "درجة الاستعداد",
    copyHtml: "نسخ HTML", copied: "تم النسخ!",
    phase1: "المرحلة 1: الهوية الأساسية", phase2: "المرحلة 2: فرز المسار", phase3: "المرحلة 3: الفحص القانوني", phase4: "المرحلة 4: السرد الشخصي",
    immigrantReadiness: "استعداد المهاجرين", selectLanguage: "اختر لغتك المفضلة",
    packetReady: "حزمة الاستعداد الخاصة بك جاهزة", packetDesc: "لقد قمنا بتجميع الملخص التنفيذي وجدول الإجراءات ذات الأولوية والموارد المحلية.",
    openPrint: "فتح وطباعة الحزمة", startOver: "البدء من جديد",
    altIdTitle: "هويات بديلة مقبولة",
    altIdDesc: "لتقليل التأخير في العملية، يرجى جمع أي من أشكال تحديد الهوية البديلة التالية:",
    altIdList: [
      "الهويات القنصلية (مثل بطاقة التسجيل القنصلية)",
      "شهادات الميلاد",
      "بطاقات الهوية الوطنية",
      "الهويات البلدية (مثل IDNYC)"
    ],
    readyViaSecondary: "جاهز عبر التحقق الثانوي",
    readinessEstablishedViaProxy: "تم إثبات الاستعداد عبر الوكيل",
    noteForLegalCounsel: "ملاحظة للمستشار القانوني: في حالة عدم وجود أدلة أولية، تم تحديد وكلاء ثانويين لتسريع عملية الاستيعاب.",
    narrativeTitle: "بكلماتك الخاصة",
    narrativeDesc: "يرجى تحديد أي بيانات تنطبق عليك وتقديم شرح موجز (بحد أقصى 1000 حرف).",
    narrativePlaceholder: "اشرح وضعك هنا...",
    personalNarrative: "السرد الشخصي"
  }
};

export const NARRATIVE_STARTERS = [
  { id: "narrative_safety", labels: { EN: "I fear for my physical safety if I return.", ES: "Temo por mi seguridad física si regreso.", ZH: "如果我回去，我担心我的人身安全。", HT: "Mwen pè pou sekirite fizik mwen si m tounen.", AR: "أخشى على سلامتي الجسدية إذا عدت." } },
  { id: "narrative_politics", labels: { EN: "I am targeted because of my political beliefs.", ES: "Soy un objetivo debido a mis creencias políticas.", ZH: "我因为我的政治信仰而成为目标。", HT: "Mwen vize akòz kwayans politik mwen.", AR: "أنا مستهدف بسبب معتقداتي السياسية." } },
  { id: "narrative_religion", labels: { EN: "I face persecution due to my religion.", ES: "Enfrento persecución debido a mi religión.", ZH: "我因为我的宗教信仰而面临迫害。", HT: "Mwen fè fas ak pèsekisyon akòz relijyon mwen.", AR: "أواجه الاضطهاد بسبب ديني." } },
  { id: "narrative_identity", labels: { EN: "I am in danger because of my race, nationality, or social group.", ES: "Estoy en peligro debido a mi raza, nacionalidad o grupo social.", ZH: "由于我的种族、国籍或社会群体，我处于危险之中。", HT: "Mwen an danje akòz ras mwen, nasyonalite mwen, oswa gwoup sosyal mwen.", AR: "أنا في خطر بسبب عرقي أو جنسيتي أو مجموعتي الاجتماعية." } },
  { id: "narrative_general", labels: { EN: "I have a general fear of violence or harm in my home country.", ES: "Tengo un miedo general a la violencia o daño en mi país de origen.", ZH: "我对祖国的暴力或伤害有普遍的恐惧。", HT: "Mwen gen yon laperèz jeneral pou vyolans oswa mal nan peyi mwen.", AR: "لدي خوف عام من العنف أو الأذى في بلدي الأصلي." } }
];

export const PHASE_1_QUESTIONS = [
  { id: "full_name", type: "text", labels: { EN: "What is your full legal name?", ES: "¿Cuál es su nombre legal completo?", ZH: "您的全名是什么？", HT: "Ki non legal konplè ou?", AR: "ما هو اسمك القانوني الكامل؟" }, placeholders: { EN: "e.g., Jane Doe", ES: "ej., Jane Doe", ZH: "例如：Jane Doe", HT: "egz., Jane Doe", AR: "مثال: جين دو" }, guardianTips: { EN: "Your name is safe. We use this only to populate your personal packet.", ES: "Su nombre está seguro.", ZH: "您的名字是安全的。我们仅使用它来生成您的个人准备包。", HT: "Non ou an sekirite. Nou itilize sa sèlman pou ranpli pake pèsonèl ou.", AR: "اسمك آمن. نستخدم هذا فقط لملء حزمتك الشخصية." } },
  { id: "country_of_origin", type: "text", labels: { EN: "What is your country of origin?", ES: "¿Cuál es su país de origen?", ZH: "您的原籍国是哪里？", HT: "Ki peyi orijin ou?", AR: "ما هو بلدك الأصلي؟" }, placeholders: { EN: "e.g., Colombia", ES: "ej., Colombia", ZH: "例如：哥伦比亚", HT: "egz., Kolonbi", AR: "مثال: كولومبيا" }, guardianTips: { EN: "Knowing your home country helps identify specific relief programs and Consulate locations.", ES: "Ayuda a identificar programas de alivio.", ZH: "了解您的祖国有助于确定具体的救济计划和领事馆位置。", HT: "Konnen peyi ou ede idantifye pwogram soulajman espesifik ak kote Konsila yo.", AR: "تساعد معرفة بلدك الأصلي في تحديد برامج الإغاثة المحددة ومواقع القنصليات." } },
  { id: "entry_date", type: "date", labels: { EN: "When did you enter the United States?", ES: "¿Cuándo ingresó a los Estados Unidos?", ZH: "您何时进入美国？", HT: "Ki lè ou te antre Ozetazini?", AR: "متى دخلت الولايات المتحدة؟" }, placeholders: { EN: "MM/DD/YYYY", ES: "DD/MM/AAAA", ZH: "年/月/日", HT: "JJ/MM/AAAA", AR: "يوم/شهر/سنة" }, guardianTips: { EN: "Crucial for the one-year asylum deadline and other time-sensitive protections.", ES: "Crucial para la fecha límite de asilo.", ZH: "对于一年期庇护截止日期和其他对时间敏感的保护措施至关重要。", HT: "Enpòtan pou dat limit azil yon ane a ak lòt pwoteksyon ki sansib a tan.", AR: "حاسم للموعد النهائي للجوء لمدة عام واحد وغيرها من وسائل الحماية الحساسة للوقت." } },
  { id: "zip_code", type: "text", labels: { EN: "What is your NYC Zip Code?", ES: "¿Cuál es su código postal de NYC?", ZH: "您的纽约市邮政编码是多少？", HT: "Ki Kòd Pòstal NYC ou?", AR: "ما هو الرمز البريدي الخاص بك في مدينة نيويورك؟" }, placeholders: { EN: "e.g., 10001", ES: "ej., 10001", ZH: "例如：10001", HT: "egz., 10001", AR: "مثال: 10001" }, guardianTips: { EN: "Your Zip Code connects you to trusted, local community advocates in your borough.", ES: "Lo conecta con defensores locales.", ZH: "您的邮政编码将您与您所在行政区的可信赖的当地社区倡导者联系起来。", HT: "Kòd Pòstal ou konekte ou ak defansè kominote lokal ou fè konfyans nan katye ou.", AR: "يربطك الرمز البريدي الخاص بك بمحامي المجتمع المحليين الموثوق بهم في منطقتك." } },
  { id: "has_passport", type: "radio", options: [{value: "yes", labels: {EN: "Yes", ES: "Sí", ZH: "是", HT: "Wi", AR: "نعم"}}, {value: "no", labels: {EN: "No", ES: "No", ZH: "否", HT: "Non", AR: "لا"}}], labels: { EN: "Do you have a valid Passport from your home country?", ES: "¿Tiene un pasaporte válido?", ZH: "您有来自您祖国的有效护照吗？", HT: "Èske w gen yon Paspò valab ki soti nan peyi w?", AR: "هل لديك جواز سفر ساري المفعول من بلدك الأصلي؟" }, guardianTips: { EN: "A passport establishes your identity. If you don't have one, we will note that you need alternative ID.", ES: "Establece su identidad.", ZH: "护照可以证明您的身份。如果您没有，我们将注明您需要替代身份证件。", HT: "Yon paspò etabli idantite w. Si ou pa gen youn, nou pral note ke ou bezwen yon lòt pyès idantite.", AR: "يثبت جواز السفر هويتك. إذا لم يكن لديك واحد، فسنشير إلى أنك بحاجة إلى هوية بديلة." } },
  { id: "has_i94", type: "radio", options: [{value: "yes", labels: {EN: "Yes", ES: "Sí", ZH: "是", HT: "Wi", AR: "نعم"}}, {value: "no", labels: {EN: "No", ES: "No", ZH: "否", HT: "Non", AR: "لا"}}], labels: { EN: "Do you have your I-94 (Arrival/Departure Record)?", ES: "¿Tiene su I-94?", ZH: "您有 I-94（出入境记录）吗？", HT: "Èske w gen I-94 ou (Dosye Arive/Depa)?", AR: "هل لديك I-94 (سجل الوصول/المغادرة)؟" }, guardianTips: { EN: "The I-94 proves your lawful entry. It is critical for many applications.", ES: "Prueba su entrada legal.", ZH: "I-94 证明您的合法入境。这对许多申请至关重要。", HT: "I-94 la pwouve antre legal ou. Li enpòtan anpil pou anpil aplikasyon.", AR: "يثبت I-94 دخولك القانوني. إنه أمر بالغ الأهمية للعديد من التطبيقات." } },
  { id: "has_lease", type: "radio", options: [{value: "yes", labels: {EN: "Yes", ES: "Sí", ZH: "是", HT: "Wi", AR: "نعم"}}, {value: "no", labels: {EN: "No", ES: "No", ZH: "否", HT: "Non", AR: "لا"}}], labels: { EN: "Do you have a formal lease agreement for your residence?", ES: "¿Tiene un contrato de arrendamiento formal?", ZH: "您有正式的住宅租赁协议吗？", HT: "Èske w gen yon akò fòmèl lwaye pou rezidans ou?", AR: "هل لديك عقد إيجار رسمي لمقر إقامتك؟" }, guardianTips: { EN: "A lease proves your physical presence and residence.", ES: "Prueba su presencia física.", ZH: "租赁协议证明您的实际居住地。", HT: "Yon lwaye pwouve prezans fizik ou ak rezidans ou.", AR: "يثبت عقد الإيجار وجودك الفعلي وإقامتك." } }
];

export const PROXIES: Record<string, any> = {
  has_passport: {
    title: { EN: "Alternative Identity Documents", ES: "Documentos de Identidad Alternativos", ZH: "替代身份证明文件", HT: "Dokiman Idantite Altènatif", AR: "وثائق الهوية البديلة" },
    desc: { EN: "Since you don't have a passport, please select any of the following you can provide:", ES: "Dado que no tiene pasaporte, seleccione cualquiera de los siguientes que pueda proporcionar:", ZH: "由于您没有护照，请选择您可以提供的以下任何一项：", HT: "Piske ou pa gen paspò, tanpri chwazi nenpòt nan sa ki annapre yo ou ka bay:", AR: "نظرًا لعدم امتلاكك جواز سفر، يرجى تحديد أي مما يلي يمكنك تقديمه:" },
    items: [
      { id: "proxy_passport_1", label: { EN: "Consular ID (Matrícula)", ES: "Identificación Consular (Matrícula)", ZH: "领事身份证 (Matrícula)", HT: "Kat Idantite Konsila (Matrícula)", AR: "الهوية القنصلية (Matrícula)" } },
      { id: "proxy_passport_2", label: { EN: "Birth Certificate", ES: "Certificado de Nacimiento", ZH: "出生证明", HT: "Sètifika Nesans", AR: "شهادة الميلاد" } },
      { id: "proxy_passport_3", label: { EN: "National ID Card", ES: "Tarjeta de Identidad Nacional", ZH: "国民身份证", HT: "Kat Idantite Nasyonal", AR: "بطاقة الهوية الوطنية" } }
    ]
  },
  has_lease: {
    title: { EN: "Alternative Residence Documents", ES: "Documentos de Residencia Alternativos", ZH: "替代居住证明文件", HT: "Dokiman Rezidans Altènatif", AR: "وثائق الإقامة البديلة" },
    desc: { EN: "Since you don't have a lease, please select any of the following you can provide:", ES: "Dado que no tiene un contrato de arrendamiento, seleccione cualquiera de los siguientes que pueda proporcionar:", ZH: "由于您没有租赁协议，请选择您可以提供的以下任何一项：", HT: "Piske ou pa gen yon lwaye, tanpri chwazi nenpòt nan sa ki annapre yo ou ka bay:", AR: "نظرًا لعدم امتلاكك عقد إيجار، يرجى تحديد أي مما يلي يمكنك تقديمه:" },
    items: [
      { id: "proxy_lease_1", label: { EN: "School Records", ES: "Registros Escolares", ZH: "学校记录", HT: "Dosye Lekòl", AR: "السجلات المدرسية" } },
      { id: "proxy_lease_2", label: { EN: "Notarized Letter from Landlord/Roommate", ES: "Carta Notariada del Propietario/Compañero de Cuarto", ZH: "房东/室友的公证信", HT: "Lèt Notarye nan men Pwopriyetè/Kolokatè", AR: "رسالة موثقة من المالك/زميل السكن" } },
      { id: "proxy_lease_3", label: { EN: "Utility Bill", ES: "Factura de Servicios Públicos", ZH: "水电费账单", HT: "Bòdwo Sèvis Piblik", AR: "فاتورة خدمات" } }
    ]
  },
  has_i94: {
    title: { EN: "Alternative Arrival Documents", ES: "Documentos de Llegada Alternativos", ZH: "替代抵达证明文件", HT: "Dokiman Arive Altènatif", AR: "وثائق الوصول البديلة" },
    desc: { EN: "Since you don't have an I-94, please select any of the following you can provide:", ES: "Dado que no tiene un I-94, seleccione cualquiera de los siguientes que pueda proporcionar:", ZH: "由于您没有 I-94，请选择您可以提供的以下任何一项：", HT: "Piske ou pa gen yon I-94, tanpri chwazi nenpòt nan sa ki annapre yo ou ka bay:", AR: "نظرًا لعدم امتلاكك I-94، يرجى تحديد أي مما يلي يمكنك تقديمه:" },
    items: [
      { id: "proxy_i94_1", label: { EN: "Travel Tickets / Boarding Passes", ES: "Boletos de Viaje / Tarjetas de Embarque", ZH: "旅行机票 / 登机牌", HT: "Biyè Vwayaj / Kat Anbakman", AR: "تذاكر السفر / بطاقات الصعود إلى الطائرة" } },
      { id: "proxy_i94_2", label: { EN: "Dated Photos in the US", ES: "Fotos Fechadas en EE. UU.", ZH: "在美国的带日期照片", HT: "Foto ki gen Dat Ozetazini", AR: "صور مؤرخة في الولايات المتحدة" } },
      { id: "proxy_i94_3", label: { EN: "Clinic or Hospital Receipts", ES: "Recibos de Clínica u Hospital", ZH: "诊所或医院收据", HT: "Resi Klinik oswa Lopital", AR: "إيصالات العيادة أو المستشفى" } }
    ]
  },
  has_persecution_proof: {
    title: { EN: "Alternative Persecution Evidence", ES: "Evidencia de Persecución Alternativa", ZH: "替代迫害证据", HT: "Prèv Pèsekisyon Altènatif", AR: "أدلة الاضطهاد البديلة" },
    desc: { EN: "Since you don't have direct proof, please select any of the following you can provide:", ES: "Dado que no tiene prueba directa, seleccione cualquiera de los siguientes que pueda proporcionar:", ZH: "由于您没有直接证据，请选择您可以提供的以下任何一项：", HT: "Piske ou pa gen prèv dirèk, tanpri chwazi nenpòt nan sa ki annapre yo ou ka bay:", AR: "نظرًا لعدم امتلاكك دليل مباشر، يرجى تحديد أي مما يلي يمكنك تقديمه:" },
    items: [
      { id: "proxy_persecution_1", label: { EN: "Witness Letters", ES: "Cartas de Testigos", ZH: "证人信件", HT: "Lèt Temwen", AR: "رسائل الشهود" } },
      { id: "proxy_persecution_2", label: { EN: "Medical Records", ES: "Registros Médicos", ZH: "医疗记录", HT: "Dosye Medikal", AR: "السجلات الطبية" } },
      { id: "proxy_persecution_3", label: { EN: "News Articles / Country Conditions", ES: "Artículos de Noticias / Condiciones del País", ZH: "新闻文章 / 国家状况", HT: "Atik Nouvèl / Kondisyon Peyi a", AR: "مقالات إخبارية / ظروف البلد" } }
    ]
  },
  has_green_card: {
    title: { EN: "Alternative Status Documents", ES: "Documentos de Estado Alternativos", ZH: "替代身份文件", HT: "Dokiman Estati Altènatif", AR: "وثائق الحالة البديلة" },
    desc: { EN: "Since you don't have your Green Card, please select any of the following you can provide:", ES: "Dado que no tiene su Tarjeta Verde, seleccione cualquiera de los siguientes que pueda proporcionar:", ZH: "由于您没有绿卡，请选择您可以提供的以下任何一项：", HT: "Piske ou pa gen Kat Vèt ou, tanpri chwazi nenpòt nan sa ki annapre yo ou ka bay:", AR: "نظرًا لعدم امتلاكك البطاقة الخضراء، يرجى تحديد أي مما يلي يمكنك تقديمه:" },
    items: [
      { id: "proxy_greencard_1", label: { EN: "I-551 Stamp in Passport", ES: "Sello I-551 en Pasaporte", ZH: "护照上的 I-551 印章", HT: "So I-551 nan Paspò", AR: "ختم I-551 في جواز السفر" } },
      { id: "proxy_greencard_2", label: { EN: "USCIS Approval Notice (I-797)", ES: "Aviso de Aprobación de USCIS (I-797)", ZH: "USCIS 批准通知 (I-797)", HT: "Avi Apwobasyon USCIS (I-797)", AR: "إشعار موافقة USCIS (I-797)" } },
      { id: "proxy_greencard_3", label: { EN: "Copy of Lost Green Card", ES: "Copia de Tarjeta Verde Perdida", ZH: "丢失绿卡的复印件", HT: "Kopi Kat Vèt Pèdi a", AR: "نسخة من البطاقة الخضراء المفقودة" } }
    ]
  },
  has_tax_transcripts: {
    title: { EN: "Alternative Financial Documents", ES: "Documentos Financieros Alternativos", ZH: "替代财务文件", HT: "Dokiman Finansye Altènatif", AR: "الوثائق المالية البديلة" },
    desc: { EN: "Since you don't have tax transcripts, please select any of the following you can provide:", ES: "Dado que no tiene transcripciones de impuestos, seleccione cualquiera de los siguientes que pueda proporcionar:", ZH: "由于您没有税务记录，请选择您可以提供的以下任何一项：", HT: "Piske ou pa gen relve taks, tanpri chwazi nenpòt nan sa ki annapre yo ou ka bay:", AR: "نظرًا لعدم امتلاكك نصوص ضريبية، يرجى تحديد أي مما يلي يمكنك تقديمه:" },
    items: [
      { id: "proxy_tax_1", label: { EN: "W-2 or 1099 Forms", ES: "Formularios W-2 o 1099", ZH: "W-2 或 1099 表格", HT: "Fòm W-2 oswa 1099", AR: "نماذج W-2 أو 1099" } },
      { id: "proxy_tax_2", label: { EN: "Pay Stubs", ES: "Recibos de Pago", ZH: "工资单", HT: "Fich Peye", AR: "قسائم الدفع" } },
      { id: "proxy_tax_3", label: { EN: "Bank Statements", ES: "Estados de Cuenta Bancarios", ZH: "银行对账单", HT: "Relve Labank", AR: "كشوف الحسابات المصرفية" } }
    ]
  },
  has_marriage_cert: {
    title: { EN: "Alternative Relationship Documents", ES: "Documentos de Relación Alternativos", ZH: "替代关系证明文件", HT: "Dokiman Relasyon Altènatif", AR: "وثائق العلاقة البديلة" },
    desc: { EN: "Since you don't have a marriage certificate, please select any of the following you can provide:", ES: "Dado que no tiene un certificado de matrimonio, seleccione cualquiera de los siguientes que pueda proporcionar:", ZH: "由于您没有结婚证书，请选择您可以提供的以下任何一项：", HT: "Piske ou pa gen yon sètifika maryaj, tanpri chwazi nenpòt nan sa ki annapre yo ou ka bay:", AR: "نظرًا لعدم امتلاكك شهادة زواج، يرجى تحديد أي مما يلي يمكنك تقديمه:" },
    items: [
      { id: "proxy_marriage_1", label: { EN: "Religious Marriage Certificate", ES: "Certificado de Matrimonio Religioso", ZH: "宗教结婚证书", HT: "Sètifika Maryaj Relijye", AR: "شهادة الزواج الديني" } },
      { id: "proxy_marriage_2", label: { EN: "Birth Certificates of Children Together", ES: "Certificados de Nacimiento de Hijos en Común", ZH: "共同子女的出生证明", HT: "Sètifika Nesans Timoun Ansanm", AR: "شهادات ميلاد الأطفال معًا" } },
      { id: "proxy_marriage_3", label: { EN: "Affidavits from Family/Friends", ES: "Declaraciones Juradas de Familiares/Amigos", ZH: "家人/朋友的宣誓书", HT: "Deklarasyon Sou Sèman nan men Fanmi/Zanmi", AR: "إفادات من العائلة/الأصدقاء" } }
    ]
  },
  has_proof_of_relationship: {
    title: { EN: "Alternative Proof of Relationship", ES: "Prueba de Relación Alternativa", ZH: "替代关系证明", HT: "Prèv Relasyon Altènatif", AR: "دليل بديل على العلاقة" },
    desc: { EN: "Since you don't have direct proof, please select any of the following you can provide:", ES: "Dado que no tiene prueba directa, seleccione cualquiera de los siguientes que pueda proporcionar:", ZH: "由于您没有直接证据，请选择您可以提供的以下任何一项：", HT: "Piske ou pa gen prèv dirèk, tanpri chwazi nenpòt nan sa ki annapre yo ou ka bay:", AR: "نظرًا لعدم امتلاكك دليل مباشر، يرجى تحديد أي مما يلي يمكنك تقديمه:" },
    items: [
      { id: "proxy_relationship_1", label: { EN: "Joint Lease or Utility Bills", ES: "Contrato de Arrendamiento o Facturas Conjuntas", ZH: "共同租赁或水电费账单", HT: "Lwaye oswa Bòdwo Sèvis Piblik Ansanm", AR: "عقد إيجار مشترك أو فواتير خدمات" } },
      { id: "proxy_relationship_2", label: { EN: "Remittance Receipts", ES: "Recibos de Remesas", ZH: "汇款收据", HT: "Resi Transfè Lajan", AR: "إيصالات التحويلات" } },
      { id: "proxy_relationship_3", label: { EN: "Communication Logs (WhatsApp, Emails)", ES: "Registros de Comunicación (WhatsApp, Correos Electrónicos)", ZH: "通信记录 (WhatsApp, 电子邮件)", HT: "Jounal Kominikasyon (WhatsApp, Imèl)", AR: "سجلات الاتصالات (واتساب، رسائل البريد الإلكتروني)" } }
    ]
  },
  has_arrests: {
    title: { EN: "Alternative Criminal Record Documents", ES: "Documentos de Antecedentes Penales Alternativos", ZH: "替代犯罪记录文件", HT: "Dokiman Dosye Kriminèl Altènatif", AR: "وثائق السجل الجنائي البديلة" },
    desc: { EN: "Since you don't have Certificates of Disposition, please select any of the following you can provide:", ES: "Dado que no tiene Certificados de Disposición, seleccione cualquiera de los siguientes que pueda proporcionar:", ZH: "由于您没有处置证书，请选择您可以提供的以下任何一项：", HT: "Piske ou pa gen Sètifika Dispozisyon, tanpri chwazi nenpòt nan sa ki annapre yo ou ka bay:", AR: "نظرًا لعدم امتلاكك شهادات تصرف، يرجى تحديد أي مما يلي يمكنك تقديمه:" },
    items: [
      { id: "proxy_arrests_1", label: { EN: "Rap Sheet (Criminal History Record)", ES: "Hoja de Antecedentes Penales", ZH: "犯罪历史记录", HT: "Fèy Dosye Kriminèl", AR: "صحيفة الحالة الجنائية" } },
      { id: "proxy_arrests_2", label: { EN: "Court Appearance Notices", ES: "Avisos de Comparecencia ante el Tribunal", ZH: "出庭通知", HT: "Avi Konparisyon nan Tribinal", AR: "إشعارات المثول أمام المحكمة" } },
      { id: "proxy_arrests_3", label: { EN: "Letters from Previous Defense Attorney", ES: "Cartas del Abogado Defensor Anterior", ZH: "前辩护律师的信件", HT: "Lèt nan men Ansyen Avoka Defans", AR: "رسائل من محامي الدفاع السابق" } }
    ]
  }
};

export const TRIAGE_QUESTION = {
  id: "case_type", type: "radio",
  options: [
    { value: "asylum", labels: { EN: "Asylum / Fear of Return", ES: "Asilo / Miedo a regresar", ZH: "庇护 / 害怕返回", HT: "Azil / Laperèz pou Retounen", AR: "اللجوء / الخوف من العودة" } },
    { value: "citizenship", labels: { EN: "Citizenship / Naturalization", ES: "Ciudadanía / Naturalización", ZH: "公民身份 / 入籍", HT: "Sitwayènte / Natiralizasyon", AR: "المواطنة / التجنس" } },
    { value: "family", labels: { EN: "Family-Based Petition", ES: "Petición Familiar", ZH: "基于家庭的请愿", HT: "Petisyon ki baze sou Fanmi", AR: "التماس عائلي" } }
  ],
  labels: { EN: "What is your primary legal goal?", ES: "¿Cuál es su objetivo legal principal?", ZH: "您的主要法律目标是什么？", HT: "Ki objektif legal prensipal ou?", AR: "ما هو هدفك القانوني الأساسي؟" },
  guardianTips: { EN: "This determines the exact forms and evidence we prepare for your packet.", ES: "Esto determina los formularios exactos.", ZH: "这决定了我们为您的准备包准备的确切表格和证据。", HT: "Sa a detèmine fòm egzak ak prèv nou prepare pou pake ou a.", AR: "يحدد هذا النماذج والأدلة الدقيقة التي نعدها لحزمتك." }
};

export const PHASE_2_QUESTIONS: Record<string, any[]> = {
  asylum: [
    { id: "has_persecution_proof", type: "radio", options: [{value: "yes", labels: {EN: "Yes", ES: "Sí", ZH: "是", HT: "Wi", AR: "نعم"}}, {value: "no", labels: {EN: "No", ES: "No", ZH: "否", HT: "Non", AR: "لا"}}], labels: { EN: "Do you have evidence of persecution (e.g., photos, police reports, threats)?", ES: "¿Tiene evidencia de persecución?", ZH: "您有受迫害的证据吗（例如，照片、警方报告、威胁）？", HT: "Èske w gen prèv pèsekisyon (pa egzanp, foto, rapò lapolis, menas)?", AR: "هل لديك أدلة على الاضطهاد (مثل الصور وتقارير الشرطة والتهديدات)؟" }, guardianTips: { EN: "This is vital for asylum claims. Keep these documents extremely safe.", ES: "Vital para solicitudes de asilo.", ZH: "这对庇护申请至关重要。请极其安全地保管这些文件。", HT: "Sa a enpòtan anpil pou reklamasyon azil. Kenbe dokiman sa yo trè an sekirite.", AR: "هذا أمر حيوي لمطالبات اللجوء. احتفظ بهذه المستندات في مكان آمن للغاية." } }
  ],
  citizenship: [
    { id: "has_green_card", type: "radio", options: [{value: "yes", labels: {EN: "Yes", ES: "Sí", ZH: "是", HT: "Wi", AR: "نعم"}}, {value: "no", labels: {EN: "No", ES: "No", ZH: "否", HT: "Non", AR: "لا"}}], labels: { EN: "Do you have your Green Card?", ES: "¿Tiene su Tarjeta Verde?", ZH: "您有绿卡吗？", HT: "Èske w gen Kat Vèt ou?", AR: "هل لديك البطاقة الخضراء الخاصة بك؟" }, guardianTips: { EN: "Required for Naturalization.", ES: "Requerido para la Naturalización.", ZH: "入籍所需。", HT: "Obligatwa pou Natiralizasyon.", AR: "مطلوب للتجنس." } },
    { id: "has_tax_transcripts", type: "radio", options: [{value: "yes", labels: {EN: "Yes", ES: "Sí", ZH: "是", HT: "Wi", AR: "نعم"}}, {value: "no", labels: {EN: "No", ES: "No", ZH: "否", HT: "Non", AR: "لا"}}], labels: { EN: "Do you have 3-5 years of IRS Tax Transcripts?", ES: "¿Tiene 3-5 años de transcripciones de impuestos?", ZH: "您有 3-5 年的 IRS 税务记录吗？", HT: "Èske w gen 3-5 ane Relve Taks IRS?", AR: "هل لديك 3-5 سنوات من نصوص ضرائب مصلحة الضرائب؟" }, guardianTips: { EN: "Shows good moral character and continuous residence.", ES: "Muestra buen carácter moral.", ZH: "显示良好的道德品质和连续居住。", HT: "Montre bon karaktè moral ak rezidans kontinyèl.", AR: "يظهر حسن السيرة والسلوك والإقامة المستمرة." } }
  ],
  family: [
    { id: "has_marriage_cert", type: "radio", options: [{value: "yes", labels: {EN: "Yes", ES: "Sí", ZH: "是", HT: "Wi", AR: "نعم"}}, {value: "no", labels: {EN: "No", ES: "No", ZH: "否", HT: "Non", AR: "لا"}}], labels: { EN: "Do you have Marriage/Divorce certificates?", ES: "¿Tiene certificados de matrimonio/divorcio?", ZH: "您有结婚/离婚证书吗？", HT: "Èske w gen sètifika Maryaj/Divòs?", AR: "هل لديك شهادات زواج/طلاق؟" }, guardianTips: { EN: "Establishes the legal relationship.", ES: "Establece la relación legal.", ZH: "建立法律关系。", HT: "Etabli relasyon legal la.", AR: "يؤسس العلاقة القانونية." } },
    { id: "has_proof_of_relationship", type: "radio", options: [{value: "yes", labels: {EN: "Yes", ES: "Sí", ZH: "是", HT: "Wi", AR: "نعم"}}, {value: "no", labels: {EN: "No", ES: "No", ZH: "否", HT: "Non", AR: "لا"}}], labels: { EN: "Do you have proof of relationship (photos, joint bank accounts)?", ES: "¿Tiene prueba de relación?", ZH: "您有关系证明吗（照片、联名银行账户）？", HT: "Èske w gen prèv relasyon (foto, kont labank ansanm)?", AR: "هل لديك دليل على العلاقة (صور، حسابات مصرفية مشتركة)؟" }, guardianTips: { EN: "Proves the relationship is bona fide.", ES: "Prueba que la relación es de buena fe.", ZH: "证明关系是真实的。", HT: "Pwouve relasyon an se bòn fwa.", AR: "يثبت أن العلاقة حقيقية." } }
  ]
};

export const PHASE_3_QUESTIONS = [
  { id: "a_number", type: "text", labels: { EN: "What is your A-Number? (Optional)", ES: "¿Cuál es su Número A? (Opcional)", ZH: "您的 A 号码是多少？（可选）", HT: "Ki Nimewo A ou? (Si ou vle)", AR: "ما هو رقم A الخاص بك؟ (اختياري)" }, placeholders: { EN: "e.g., A123456789", ES: "ej., A123456789", ZH: "例如：A123456789", HT: "egz., A123456789", AR: "مثال: A123456789" }, guardianTips: { EN: "Your Alien Registration Number helps track your file. Leave blank if you don't have one.", ES: "Ayuda a rastrear su archivo.", ZH: "您的外国人注册号码有助于跟踪您的档案。如果您没有，请留空。", HT: "Nimewo Enskripsyon Etranje w la ede swiv dosye w la. Kite vid si w pa gen youn.", AR: "يساعد رقم تسجيل الأجانب الخاص بك في تتبع ملفك. اتركه فارغًا إذا لم يكن لديك واحد." } },
  { id: "has_arrests", type: "radio", options: [{value: "yes", labels: {EN: "Yes", ES: "Sí", ZH: "是", HT: "Wi", AR: "نعم"}}, {value: "no", labels: {EN: "No", ES: "No", ZH: "否", HT: "Non", AR: "لا"}}], labels: { EN: "Do you have any NYC Certificates of Disposition for past arrests?", ES: "¿Tiene certificados de disposición de arrestos pasados?", ZH: "您有过去逮捕的纽约市处置证书吗？", HT: "Èske w gen nenpòt Sètifika Dispozisyon NYC pou arestasyon ki sot pase yo?", AR: "هل لديك أي شهادات تصرف في مدينة نيويورك للاعتقالات السابقة؟" }, guardianTips: { EN: "Crucial for legal screening. Always disclose arrests to your attorney.", ES: "Crucial para la evaluación legal.", ZH: "对法律筛查至关重要。始终向您的律师披露逮捕情况。", HT: "Enpòtan pou tès depistaj legal. Toujou divilge arestasyon bay avoka ou.", AR: "حاسم للفحص القانوني. اكشف دائمًا عن الاعتقالات لمحاميك." } }
];
