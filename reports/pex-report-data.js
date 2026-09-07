/* Portfolio Exception Report — demo data */
window.PEX = {
  meta: {
    portfolio: 'Global Hull & Machinery 2026',
    period: '01 Aug 2026 – 31 Aug 2026',
    previous: 'Jul 2026',
    preparedFor: 'Marine Underwriting Committee',
    generatedOn: '07 Sep 2026 09:12 UTC',
    reportId: 'PEX-2026-08-0114',
    owner: 'Paul Kiernan',
    threshold: 'Risk score ≥ 61, or a rise of ≥ 10 points in the period',
  },

  /* Headline exception counts */
  summary: {
    total: 34, totalDelta: '+7',
    vesselsFlagged: 29, vesselsDelta: '+5',
    newIssues: 21, carriedForward: 13,
    resolvedInPeriod: 6,
    exposedValue: '$1.86bn',
    exposedValueDelta: '+$240m',
    portfolioVessels: 1284,
    sharePct: 2.3,
    criticalOpen: 8,
  },

  /* Exception counts by category — drives the summary chart */
  categories: [
    { key:'high',    label:'High Risk Score vessels',        count:9, new:5, color:'#b91c1c' },
    { key:'rise',    label:'Material Risk Score increases',  count:7, new:4, color:'#dc2626' },
    { key:'sanc',    label:'New sanctions / compliance',     count:5, new:4, color:'#c2410c' },
    { key:'cas',     label:'New casualties',                 count:4, new:4, color:'#d97706' },
    { key:'war',     label:'War / high-risk area entries',   count:4, new:2, color:'#b45309' },
    { key:'agg',     label:'Regional aggregation breaches',  count:3, new:1, color:'#7c3aed' },
    { key:'wx',      label:'Significant weather exposure',   count:2, new:1, color:'#1d4ed8' },
  ],

  /* 1 — High Risk Score vessels */
  highScore: [
    { name:'STELLA MARIS',    imo:'9411678', type:'Crude Oil Tanker',   flag:'pa', score:88, prev:81, band:'Severe', drivers:'Sanctions link, 3 AIS gaps', value:'$74m',  action:'Refer to committee' },
    { name:'ORION TRADER',    imo:'9327451', type:'Product Tanker',     flag:'lr', score:82, prev:79, band:'Severe', drivers:'Dark activity, flag watch',  value:'$41m',  action:'Refer to committee' },
    { name:'CASPIAN DAWN',    imo:'9204338', type:'Crude Oil Tanker',   flag:'cm', score:79, prev:64, band:'High',   drivers:'STS with listed vessel',      value:'$58m',  action:'Suspend renewal' },
    { name:'NORDIC FALCON',   imo:'9455102', type:'Bulk Carrier',       flag:'mh', score:74, prev:72, band:'High',   drivers:'PSC detention, age 22',       value:'$29m',  action:'Survey required' },
    { name:'GULF VENTURE',    imo:'9188674', type:'Chemical Tanker',    flag:'vc', score:71, prev:58, band:'High',   drivers:'Loitering, port call risk',   value:'$33m',  action:'Underwriter review' },
    { name:'ATLAS PIONEER',   imo:'9512289', type:'Container Ship',     flag:'sg', score:68, prev:66, band:'High',   drivers:'Manager risk, 2 casualties',  value:'$96m',  action:'Underwriter review' },
    { name:'BALTIC HERON',    imo:'9077431', type:'General Cargo',      flag:'ru', score:66, prev:63, band:'High',   drivers:'Flag watch, age 26',          value:'$12m',  action:'Underwriter review' },
    { name:'SIRIUS EXPRESS',  imo:'9366720', type:'Product Tanker',     flag:'cm', score:64, prev:61, band:'High',   drivers:'Ownership opacity',           value:'$37m',  action:'Monitor' },
    { name:'MERIDIAN STAR',   imo:'9298155', type:'Bulk Carrier',       flag:'pa', score:62, prev:60, band:'High',   drivers:'Sanctioned port call',        value:'$24m',  action:'Monitor' },
  ],

  /* 2 — Material Risk Score increases */
  increases: [
    { name:'CASPIAN DAWN',   imo:'9204338', from:64, to:79, delta:15, cause:'Ship-to-ship transfer with a listed vessel off Fujairah on 12 Aug.', first:true },
    { name:'GULF VENTURE',   imo:'9188674', from:58, to:71, delta:13, cause:'Two loitering events in the southern Red Sea and a 19-hour AIS gap.', first:true },
    { name:'KESTREL BAY',    imo:'9433870', from:44, to:56, delta:12, cause:'Technical manager changed to an entity with an adverse casualty record.', first:true },
    { name:'HELLENIC WIND',  imo:'9271044', from:39, to:50, delta:11, cause:'Port state control detention at Algeciras, four deficiencies logged.', first:true },
    { name:'IONIAN SPIRIT',  imo:'9350988', from:37, to:47, delta:10, cause:'Beneficial-owner change into a jurisdiction under enhanced monitoring.', first:false },
    { name:'STELLA MARIS',   imo:'9411678', from:81, to:88, delta:7,  cause:'Third AIS gap in the rolling window; already on the committee list.', first:false },
    { name:'ORION TRADER',   imo:'9327451', from:79, to:82, delta:3,  cause:'Dark-activity score raised after a 26-hour gap west of Malta.', first:false },
  ],

  /* 3 — New sanctions / compliance indicators */
  sanctions: [
    { name:'CASPIAN DAWN',  imo:'9204338', ind:'STS with OFAC-listed vessel', list:'OFAC SDN', on:'12 Aug 2026', sev:'Critical', status:'Escalated', note:'Counterparty identified from AIS and satellite imagery.' },
    { name:'STELLA MARIS',  imo:'9411678', ind:'Beneficial owner list match', list:'EU Consolidated', on:'05 Aug 2026', sev:'Critical', status:'Escalated', note:'Indirect holding via a Marshall Islands intermediary.' },
    { name:'MERIDIAN STAR', imo:'9298155', ind:'Sanctioned port call',        list:'UK OFSI',   on:'19 Aug 2026', sev:'High',     status:'Under review', note:'Berthed 31 hours at a designated terminal.' },
    { name:'SIRIUS EXPRESS',imo:'9366720', ind:'Ownership opacity flag',      list:'Internal',  on:'22 Aug 2026', sev:'Medium',   status:'Under review', note:'Two ownership changes within 90 days.' },
    { name:'BALTIC HERON',  imo:'9077431', ind:'Flag registry watchlisted',   list:'Internal',  on:'02 Aug 2026', sev:'Medium',   status:'Monitoring',   note:'Carried forward from the Jul 2026 report.' },
  ],

  /* 4 — New casualties */
  casualties: [
    { date:'04 Aug 2026', name:'ATLAS PIONEER', imo:'9512289', type:'Machinery damage', sev:'Serious', loc:'Singapore Strait',   reserve:'$4.2m', status:'Claim open',  detail:'Main engine turbocharger failure; towed to Jurong.' },
    { date:'11 Aug 2026', name:'NORDIC FALCON', imo:'9455102', type:'Grounding',        sev:'Serious', loc:'Gulf of Bothnia',    reserve:'$2.8m', status:'Survey held', detail:'Refloated after 14 hours; bottom damage under survey.' },
    { date:'18 Aug 2026', name:'HELLENIC WIND', imo:'9271044', type:'Collision',        sev:'Moderate',loc:'Strait of Gibraltar',reserve:'$1.1m', status:'Claim open',  detail:'Contact with a berthed barge during departure.' },
    { date:'27 Aug 2026', name:'KESTREL BAY',   imo:'9433870', type:'Fire / explosion', sev:'Moderate',loc:'Port of Santos',     reserve:'$0.9m', status:'Notified',    detail:'Engine-room fire extinguished by fixed system.' },
  ],

  /* 5 — Entry into selected war / high-risk areas */
  warAreas: [
    { area:'Southern Red Sea & Bab el-Mandeb', listing:'JWC listed', entries:6, vessels:4, value:'$168m', longest:'3d 04h', breach:2, tone:'#b91c1c' },
    { area:'Gulf of Guinea (Nigeria / Benin)', listing:'JWC listed', entries:3, vessels:3, value:'$96m',  longest:'1d 18h', breach:1, tone:'#dc2626' },
    { area:'Black Sea — north-west',           listing:'JWC listed', entries:2, vessels:2, value:'$77m',  longest:'2d 06h', breach:1, tone:'#c2410c' },
    { area:'Strait of Hormuz',                 listing:'Enhanced',   entries:9, vessels:7, value:'$284m', longest:'0d 22h', breach:0, tone:'#d97706' },
  ],
  warNote: 'Four exceptions arise where a vessel entered a listed area without an approved breach notice on file. Two remain unresolved and carry an additional premium recommendation.',

  /* 6 — Regional aggregation exceptions */
  aggregation: [
    { region:'Singapore Strait', limit:150, peak:186, at:'22 Aug', value:'$2.41bn', over:'+24%', tone:'#b91c1c' },
    { region:'Strait of Hormuz', limit:90,  peak:104, at:'09 Aug', value:'$1.28bn', over:'+16%', tone:'#dc2626' },
    { region:'Suez / Gulf of Suez', limit:70, peak:78, at:'27 Aug', value:'$0.94bn', over:'+11%', tone:'#d97706' },
  ],

  /* 7 — Significant weather exposure */
  weather: [
    { event:'Typhoon Nari', cat:'Cat 3 equivalent', window:'08–13 Aug 2026', area:'East China Sea / Kyushu', vessels:23, value:'$612m', inPath:4, note:'Two vessels remained within the 64-kt wind field for over 9 hours.' },
    { event:'Hurricane Ida-II', cat:'Cat 2 equivalent', window:'21–25 Aug 2026', area:'Gulf of Mexico', vessels:11, value:'$318m', inPath:2, note:'One vessel sheltered at Galveston anchorage; no damage reported.' },
  ],

  /* 8 — New vs previously reported */
  newVsPrev: [
    { cat:'High Risk Score vessels',       nw:5, carried:4, resolved:1 },
    { cat:'Material Risk Score increases', nw:4, carried:3, resolved:2 },
    { cat:'New sanctions / compliance',    nw:4, carried:1, resolved:0 },
    { cat:'New casualties',                nw:4, carried:0, resolved:1 },
    { cat:'War / high-risk area entries',  nw:2, carried:2, resolved:1 },
    { cat:'Regional aggregation breaches', nw:1, carried:2, resolved:1 },
    { cat:'Significant weather exposure',  nw:1, carried:1, resolved:0 },
  ],
  resolved: [
    { name:'ADRIATIC ROSE', imo:'9302188', was:'High Risk Score (63)', now:'Score 48 — AIS record clean for 90 days', on:'14 Aug 2026' },
    { name:'PACIFIC EMBER', imo:'9418223', was:'Aggregation breach — Malacca', now:'Repositioned; region back under limit', on:'19 Aug 2026' },
    { name:'LUSITANIA BAY', imo:'9265470', was:'Casualty — machinery damage', now:'Claim settled at $0.6m', on:'25 Aug 2026' },
  ],

  findings: [
    { tone:'red',   t:'Nine vessels breach the high-score threshold, five of them newly', d:'Sanctions linkage and dark activity drive eight of the nine. Combined insured value of $404m, with two vessels referred to committee for immediate action.', m:'9 vessels' },
    { tone:'red',   t:'Two critical sanctions indicators raised in the period', d:'CASPIAN DAWN transferred cargo with an OFAC-listed vessel, and a beneficial-owner match was confirmed on STELLA MARIS. Both are escalated to compliance.', m:'2 critical' },
    { tone:'amber', t:'Aggregation limits exceeded in three regions', d:'Singapore Strait peaked 24% above its 150-vessel limit on 22 Aug. Hormuz and Suez also breached, together representing $4.63bn of accumulated value.', m:'3 regions' },
    { tone:'green', t:'Six exceptions cleared since the previous report', d:'Three vessels fell back below threshold and one aggregation breach resolved on repositioning, against seven new exceptions raised — a net increase of one.', m:'6 resolved' },
  ],
};
