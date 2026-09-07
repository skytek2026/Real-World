/* Portfolio Audit for Sanctions — demo data */
window.PAS = {
  meta: {
    portfolio: 'Global Hull & Machinery 2026',
    period: '01 Aug 2026 – 31 Aug 2026',
    previous: 'Jul 2026',
    preparedFor: 'Compliance & Sanctions Committee',
    generatedOn: '07 Sep 2026 09:41 UTC',
    reportId: 'PAS-2026-08-0207',
    owner: 'Paul Kiernan',
    lists: 'OFAC SDN, EU Consolidated, UK OFSI, UN 1718/2231, Internal watchlist',
  },

  summary: {
    vesselsAudited: 1284,
    changesLogged: 62, changesDelta: '+14',
    vesselsChanged: 51,
    listMatches: 3,
    escalated: 5,
    openReviews: 9,
    clearedPct: 97.7,
    lastFullScreen: '31 Aug 2026',
    warExposedValue: '$1.34bn',
  },

  /* Change volume by audit category */
  categories: [
    { key:'score', label:'Risk Score movements',            count:14, color:'#dc2626' },
    { key:'cas',   label:'New casualties',                  count:4,  color:'#d97706' },
    { key:'sanc',  label:'New sanctions indicators',        count:6,  color:'#b91c1c' },
    { key:'roll',  label:'New / removed vessels',           count:13, color:'#1d4ed8' },
    { key:'flag',  label:'Flag changes',                    count:5,  color:'#c2410c' },
    { key:'own',   label:'Ownership / management changes',  count:7,  color:'#7c3aed' },
    { key:'reg',   label:'Region entries / exits',          count:9,  color:'#0e7490' },
    { key:'conc',  label:'Regional concentration shifts',   count:3,  color:'#15803d' },
    { key:'war',   label:'New war-risk exposure',           count:4,  color:'#be123c' },
  ],

  /* 1 — Risk Score movements */
  scoreMoves: [
    { name:'CASPIAN DAWN',   imo:'9204338', flag:'cm', from:64, to:79, delta:15, dir:'up',   cause:'Ship-to-ship transfer with an OFAC-listed vessel off Fujairah.' },
    { name:'GULF VENTURE',   imo:'9188674', flag:'vc', from:58, to:71, delta:13, dir:'up',   cause:'Two loitering events in the southern Red Sea plus a 19-hour AIS gap.' },
    { name:'KESTREL BAY',    imo:'9433870', flag:'pa', from:44, to:56, delta:12, dir:'up',   cause:'Technical manager changed to an entity with an adverse record.' },
    { name:'STELLA MARIS',   imo:'9411678', flag:'pa', from:81, to:88, delta:7,  dir:'up',   cause:'Beneficial-owner list match confirmed against the EU consolidated list.' },
    { name:'IONIAN SPIRIT',  imo:'9350988', flag:'lr', from:37, to:47, delta:10, dir:'up',   cause:'Beneficial owner moved into a jurisdiction under enhanced monitoring.' },
    { name:'ADRIATIC ROSE',  imo:'9302188', flag:'gr', from:63, to:48, delta:15, dir:'down', cause:'Ninety days of clean AIS record; dark-activity weighting released.' },
    { name:'PACIFIC EMBER',  imo:'9418223', flag:'sg', from:52, to:41, delta:11, dir:'down', cause:'Repositioned out of a monitored region; port-call profile normalised.' },
    { name:'LUSITANIA BAY',  imo:'9265470', flag:'pt', from:49, to:40, delta:9,  dir:'down', cause:'Casualty claim settled and class conditions lifted.' },
  ],
  scoreBands: [
    { band:'Improved 10+',  count:3, color:'#15803d' },
    { band:'Improved 1–9',  count:2, color:'#4ade80' },
    { band:'No change',     count:1233, color:'#cbd5e1' },
    { band:'Worsened 1–9',  count:41, color:'#f59e0b' },
    { band:'Worsened 10+',  count:5, color:'#b91c1c' },
  ],

  /* 2 — New casualties */
  casualties: [
    { date:'04 Aug 2026', name:'ATLAS PIONEER', imo:'9512289', type:'Machinery damage', sev:'Serious',  loc:'Singapore Strait',    sanctionsRel:'No',  status:'Claim open',  detail:'Turbocharger failure; towed to Jurong. No sanctions nexus found.' },
    { date:'11 Aug 2026', name:'NORDIC FALCON', imo:'9455102', type:'Grounding',        sev:'Serious',  loc:'Gulf of Bothnia',     sanctionsRel:'No',  status:'Survey held', detail:'Refloated after 14 hours; bottom damage under survey.' },
    { date:'18 Aug 2026', name:'HELLENIC WIND', imo:'9271044', type:'Collision',        sev:'Moderate', loc:'Strait of Gibraltar', sanctionsRel:'No',  status:'Claim open',  detail:'Contact with a berthed barge during departure.' },
    { date:'27 Aug 2026', name:'SIRIUS EXPRESS',imo:'9366720', type:'Cargo incident',   sev:'Moderate', loc:'Off Fujairah',        sanctionsRel:'Yes', status:'Under review',detail:'Cargo discrepancy during an unreported STS; referred to compliance.' },
  ],

  /* 3 — New sanctions indicators */
  sanctions: [
    { name:'CASPIAN DAWN',   imo:'9204338', ind:'STS with OFAC-listed vessel',   list:'OFAC SDN',       on:'12 Aug 2026', sev:'Critical', status:'Escalated',    note:'Counterparty confirmed from AIS and satellite imagery.' },
    { name:'STELLA MARIS',   imo:'9411678', ind:'Beneficial owner list match',   list:'EU Consolidated',on:'05 Aug 2026', sev:'Critical', status:'Escalated',    note:'Indirect holding via a Marshall Islands intermediary.' },
    { name:'MERIDIAN STAR',  imo:'9298155', ind:'Sanctioned port call',          list:'UK OFSI',        on:'19 Aug 2026', sev:'High',     status:'Escalated',    note:'Berthed 31 hours at a designated terminal.' },
    { name:'SIRIUS EXPRESS', imo:'9366720', ind:'Unreported STS transfer',       list:'Internal',       on:'27 Aug 2026', sev:'High',     status:'Under review', note:'Counterparty unidentified; imagery requested.' },
    { name:'BALTIC HERON',   imo:'9077431', ind:'Flag registry watchlisted',     list:'Internal',       on:'02 Aug 2026', sev:'Medium',   status:'Monitoring',   note:'Carried forward from the Jul 2026 audit.' },
    { name:'ORION TRADER',   imo:'9327451', ind:'Charterer jurisdiction flag',   list:'Internal',       on:'23 Aug 2026', sev:'Medium',   status:'Under review', note:'Disclosed charterer registered in a monitored jurisdiction.' },
  ],
  screening: [
    { list:'OFAC SDN',            screened:1284, hits:1, status:'Escalated' },
    { list:'EU Consolidated',     screened:1284, hits:1, status:'Escalated' },
    { list:'UK OFSI',             screened:1284, hits:1, status:'Escalated' },
    { list:'UN 1718 / 2231',      screened:1284, hits:0, status:'Clear' },
    { list:'Internal watchlist',  screened:1284, hits:3, status:'Monitoring' },
  ],

  /* 4 — New / removed vessels */
  roll: [
    { dir:'in',  date:'03 Aug 2026', name:'NORTHERN AURORA', imo:'9601124', type:'LNG Carrier',      flag:'no', score:22, value:'$188m', why:'Added on binder — new build delivered.' },
    { dir:'in',  date:'08 Aug 2026', name:'CORAL SENTINEL',  imo:'9587310', type:'Product Tanker',   flag:'sg', score:31, value:'$46m',  why:'Added on renewal of the Asia programme.' },
    { dir:'in',  date:'14 Aug 2026', name:'THAMES ENVOY',    imo:'9544201', type:'Container Ship',   flag:'gb', score:26, value:'$112m', why:'Fleet acquisition by an existing assured.' },
    { dir:'in',  date:'21 Aug 2026', name:'ANATOLIA STAR',   imo:'9498716', type:'Bulk Carrier',     flag:'mt', score:38, value:'$34m',  why:'Added mid-term at assured request.' },
    { dir:'out', date:'06 Aug 2026', name:'ADRIATIC MOON',   imo:'9155330', type:'General Cargo',    flag:'pa', score:69, value:'$9m',   why:'Removed — sold outside the assured group.' },
    { dir:'out', date:'13 Aug 2026', name:'RED KITE',        imo:'9088217', type:'Product Tanker',   flag:'cm', score:76, value:'$18m',  why:'Removed — cover declined at renewal on sanctions grounds.' },
    { dir:'out', date:'25 Aug 2026', name:'VEGA CARRIER',    imo:'9110564', type:'Bulk Carrier',     flag:'lr', score:58, value:'$21m',  why:'Removed — scrapped at Alang.' },
  ],
  rollSummary: { added:8, removed:5, netVessels:'+3', addedValue:'$512m', removedValue:'$74m', netValue:'+$438m' },

  /* 5 — Flag changes */
  flagChanges: [
    { name:'CASPIAN DAWN',   imo:'9204338', from:'lr', fromN:'Liberia',           to:'cm', toN:'Cameroon',          on:'09 Aug 2026', risk:'Elevated', note:'Registry under enhanced monitoring; score weighting increased.' },
    { name:'SIRIUS EXPRESS', imo:'9366720', from:'pa', fromN:'Panama',            to:'cm', toN:'Cameroon',          on:'16 Aug 2026', risk:'Elevated', note:'Second registry change within 12 months.' },
    { name:'BALTIC HERON',   imo:'9077431', from:'ru', fromN:'Russia',            to:'ru', toN:'Russia (re-reg)',   on:'20 Aug 2026', risk:'Elevated', note:'Re-registration within the same watchlisted registry.' },
    { name:'IONIAN SPIRIT',  imo:'9350988', from:'mt', fromN:'Malta',             to:'lr', toN:'Liberia',           on:'11 Aug 2026', risk:'Neutral',  note:'Both registries in good standing.' },
    { name:'THAMES ENVOY',   imo:'9544201', from:'mh', fromN:'Marshall Islands',  to:'gb', toN:'United Kingdom',    on:'14 Aug 2026', risk:'Improved', note:'Moved to a Paris MoU white-list registry.' },
  ],

  /* 6 — Ownership / management changes */
  ownership: [
    { name:'STELLA MARIS',  imo:'9411678', role:'Beneficial owner',   from:'Larkspur Holdings Ltd',   to:'Meridian Trust (BVI)',        on:'05 Aug 2026', risk:'Critical', note:'New holder matches an EU-listed entity; escalated to compliance.' },
    { name:'IONIAN SPIRIT', imo:'9350988', role:'Beneficial owner',   from:'Hellenic Sea Partners',   to:'Anadolu Denizcilik AS',       on:'11 Aug 2026', risk:'Elevated', note:'Jurisdiction placed under enhanced monitoring.' },
    { name:'KESTREL BAY',   imo:'9433870', role:'Technical manager',  from:'Meridian Ship Management',to:'Pelagos Tech Services',       on:'18 Aug 2026', risk:'Elevated', note:'Incoming manager carries an adverse casualty record.' },
    { name:'ORION TRADER',  imo:'9327451', role:'Disclosed charterer',from:'Aegean Energy Trading',   to:'Levant Energy Trading DMCC',  on:'23 Aug 2026', risk:'Elevated', note:'Charterer jurisdiction on the internal watchlist.' },
    { name:'GULF VENTURE',  imo:'9188674', role:'ISM manager',        from:'Gulf Marine Services',    to:'Oryx Fleet Management',        on:'15 Aug 2026', risk:'Neutral',  note:'No adverse findings against the incoming manager.' },
    { name:'CORAL SENTINEL',imo:'9587310', role:'Registered owner',   from:'\u2014 (newly added)',    to:'Coral Maritime Pte Ltd',      on:'08 Aug 2026', risk:'Neutral',  note:'Screened clean on entry to the portfolio.' },
    { name:'NORDIC FALCON', imo:'9455102', role:'Commercial manager', from:'Nordwind Chartering',     to:'Nordwind Shipping Group',      on:'27 Aug 2026', risk:'Improved', note:'Brought in-house under the group parent.' },
  ],

  /* 7 — Vessels entering / leaving selected regions */
  regionFlow: [
    { dir:'in',  date:'02 Aug 2026 06:14', name:'STELLA MARIS',  imo:'9411678', region:'Southern Red Sea & Bab el-Mandeb', dwell:'3d 04h', listed:true },
    { dir:'in',  date:'07 Aug 2026 22:40', name:'ORION TRADER',  imo:'9327451', region:'Strait of Hormuz',                  dwell:'0d 22h', listed:false },
    { dir:'in',  date:'12 Aug 2026 09:05', name:'CASPIAN DAWN',  imo:'9204338', region:'Gulf of Oman',                      dwell:'1d 11h', listed:false },
    { dir:'in',  date:'19 Aug 2026 15:32', name:'MERIDIAN STAR', imo:'9298155', region:'Black Sea — north-west',            dwell:'2d 06h', listed:true },
    { dir:'in',  date:'24 Aug 2026 04:18', name:'GULF VENTURE',  imo:'9188674', region:'Gulf of Guinea (Nigeria / Benin)',  dwell:'1d 18h', listed:true },
    { dir:'out', date:'05 Aug 2026 11:20', name:'PACIFIC EMBER', imo:'9418223', region:'Malacca Strait',                    dwell:'0d 16h', listed:false },
    { dir:'out', date:'16 Aug 2026 08:55', name:'ADRIATIC ROSE', imo:'9302188', region:'Southern Red Sea & Bab el-Mandeb',  dwell:'2d 02h', listed:true },
    { dir:'out', date:'23 Aug 2026 19:44', name:'BALTIC HERON',  imo:'9077431', region:'Black Sea — north-west',            dwell:'4d 09h', listed:true },
    { dir:'out', date:'29 Aug 2026 13:07', name:'HELLENIC WIND', imo:'9271044', region:'Strait of Hormuz',                  dwell:'0d 19h', listed:false },
  ],

  /* 8 — Changes in regional concentration */
  concentration: [
    { region:'Singapore Strait',                vNow:186, vPrev:171, dV:'+15', vNowVal:'$2.41bn', dVal:'+$180m', limit:150, tone:'#b91c1c' },
    { region:'Strait of Hormuz',                vNow:104, vPrev:96,  dV:'+8',  vNowVal:'$1.28bn', dVal:'+$96m',  limit:90,  tone:'#dc2626' },
    { region:'Southern Red Sea & Bab el-Mandeb',vNow:47,  vPrev:58,  dV:'-11', vNowVal:'$0.61bn', dVal:'-$142m', limit:60,  tone:'#15803d' },
    { region:'Black Sea — north-west',          vNow:19,  vPrev:14,  dV:'+5',  vNowVal:'$0.34bn', dVal:'+$71m',  limit:25,  tone:'#d97706' },
    { region:'Gulf of Guinea (Nigeria / Benin)',vNow:31,  vPrev:29,  dV:'+2',  vNowVal:'$0.42bn', dVal:'+$18m',  limit:40,  tone:'#d97706' },
  ],
  concNote: 'Two regions now sit above their accumulation limit. Singapore Strait is 24% over on peak simultaneous presence, driven by the four vessels added to the Asia programme in the period.',

  /* 9 — New war-risk exposure */
  warRisk: [
    { area:'Southern Red Sea & Bab el-Mandeb', listing:'JWC listed', newVessels:2, value:'$168m', firstEntry:'02 Aug 2026', breach:1, ap:'AP raised', tone:'#b91c1c' },
    { area:'Black Sea — north-west',           listing:'JWC listed', newVessels:2, value:'$77m',  firstEntry:'19 Aug 2026', breach:1, ap:'AP raised', tone:'#dc2626' },
    { area:'Gulf of Guinea (Nigeria / Benin)', listing:'JWC listed', newVessels:1, value:'$33m',  firstEntry:'24 Aug 2026', breach:0, ap:'Within warranty', tone:'#c2410c' },
    { area:'Strait of Hormuz',                 listing:'Enhanced',   newVessels:3, value:'$284m', firstEntry:'07 Aug 2026', breach:0, ap:'Notice on file', tone:'#d97706' },
  ],
  warNote: 'Two vessels entered listed areas without an approved breach notice on file; additional premium has been raised in both cases and the assured notified.',

  findings: [
    { tone:'red',   t:'Three confirmed list matches across the portfolio', d:'CASPIAN DAWN (OFAC, via STS), STELLA MARIS (EU, beneficial owner) and MERIDIAN STAR (OFSI, sanctioned port call). All three are escalated to compliance with cover under review.', m:'3 matches' },
    { tone:'red',   t:'Ownership and flag changes cluster on the same hulls', d:'Four of the seven ownership changes and three of the five flag changes affect vessels already carrying a sanctions indicator — a pattern consistent with restructuring ahead of designation.', m:'7 changes' },
    { tone:'amber', t:'Two regions moved above their accumulation limit', d:'Singapore Strait rose to 186 vessels against a 150 limit and Hormuz to 104 against 90, together adding $276m of exposed value in the period.', m:'2 over limit' },
    { tone:'green', t:'Red Sea exposure reduced by eleven vessels', d:'Southern Red Sea presence fell from 58 to 47 vessels and $142m of insured value left the area, bringing the region back below its limit for the first time since March.', m:'-$142m' },
  ],
};
