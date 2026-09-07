/* Owner & Technical Manager Risk Report — demo data */
window.OTM = {
  meta: {
    subject: 'Pelagos Tech Services',
    role: 'Technical manager',
    hq: 'Limassol, Cyprus',
    imoNo: '5824117',
    founded: 2009,
    period: '01 Sep 2024 – 31 Aug 2026',
    window: 'Rolling 24 months',
    previous: 'Jul 2026',
    preparedFor: 'Marine Underwriting Committee',
    generatedOn: '07 Sep 2026 12:52 UTC',
    reportId: 'OTM-2026-08-0074',
    owner: 'Paul Kiernan',
  },

  summary: {
    vessels: 38,
    vesselsDelta: '+6',
    totalGt: '1.24m GT',
    insuredValue: '$1.42bn',
    avgScore: 55.8, avgScoreDelta: '+4.6',
    peerAvg: 41.6,
    highScore: 11,
    casualties: 7, casualtyRate: 5.93,
    peerCasualtyRate: 1.12,
    sanctionsFlags: 4,
    escalated: 2,
    flags: 7,
    owners: 9,
    verdict: 'Elevated — enhanced review',
  },

  /* 1 — Associated vessels */
  vessels: [
    { name:'CASPIAN DAWN',   imo:'9204338', type:'Crude Oil Tanker', flag:'cm', built:2005, gt:'62,410', score:79, value:'$58m', since:'18 Aug 2026', owner:'Levant Maritime Holding' },
    { name:'GULF VENTURE',   imo:'9188674', type:'Chemical Tanker',  flag:'vc', built:2008, gt:'24,180', score:71, value:'$33m', since:'04 Mar 2024', owner:'Oryx Shipping Ltd' },
    { name:'SIRIUS EXPRESS', imo:'9366720', type:'Product Tanker',   flag:'cm', built:2010, gt:'29,640', score:64, value:'$37m', since:'11 Nov 2023', owner:'Levant Maritime Holding' },
    { name:'RED KITE',       imo:'9088217', type:'Product Tanker',   flag:'cm', built:1999, gt:'18,220', score:76, value:'$18m', since:'22 Jun 2022', owner:'Anvil Marine SA' },
    { name:'ADRIATIC MOON',  imo:'9155330', type:'General Cargo',    flag:'pa', built:1997, gt:'9,840',  score:69, value:'$9m',  since:'09 Feb 2023', owner:'Anvil Marine SA' },
    { name:'MERIDIAN STAR',  imo:'9298155', type:'Bulk Carrier',     flag:'pa', built:2004, gt:'41,320', score:62, value:'$24m', since:'30 Sep 2024', owner:'Delta Bulk Operators' },
    { name:'KESTREL BAY',    imo:'9433870', type:'Bulk Carrier',     flag:'mt', built:2011, gt:'36,750', score:56, value:'$31m', since:'18 Aug 2026', owner:'Nordwind Shipping Group' },
    { name:'IONIAN SPIRIT',  imo:'9350988', type:'Product Tanker',   flag:'lr', built:2009, gt:'27,910', score:47, value:'$29m', since:'14 Apr 2025', owner:'Anadolu Denizcilik AS' },
    { name:'LEVANT PEARL',   imo:'9276441', type:'Crude Oil Tanker', flag:'cm', built:2003, gt:'58,120', score:73, value:'$51m', since:'07 Jul 2023', owner:'Levant Maritime Holding' },
    { name:'ANVIL TRADER',   imo:'9121887', type:'General Cargo',    flag:'tg', built:2000, gt:'11,460', score:68, value:'$11m', since:'25 Jan 2024', owner:'Anvil Marine SA' },
  ],
  vesselNote: 'Ten of the 38 managed vessels are shown, ordered by insured value. Two were taken under management in the current period.',

  /* 2 — Fleet composition */
  composition: {
    byType: [
      { type:'Product Tanker',   n:11, gt:'318,400', pct:28.9, avg:58.4, color:'#ea580c' },
      { type:'Crude Oil Tanker', n:7,  gt:'402,180', pct:18.4, avg:71.2, color:'#b91c1c' },
      { type:'Bulk Carrier',     n:8,  gt:'284,660', pct:21.1, avg:51.6, color:'#d97706' },
      { type:'General Cargo',    n:7,  gt:'86,240',  pct:18.4, avg:63.8, color:'#64748b' },
      { type:'Chemical Tanker',  n:5,  gt:'148,520', pct:13.2, avg:49.1, color:'#c2410c' },
    ],
    byAge: [
      { band:'0–10 yrs',  n:6,  pct:15.8, avg:38.2, color:'#16a34a' },
      { band:'11–15 yrs', n:9,  pct:23.7, avg:47.6, color:'#84cc16' },
      { band:'16–20 yrs', n:11, pct:28.9, avg:56.4, color:'#d97706' },
      { band:'21–25 yrs', n:8,  pct:21.1, avg:66.1, color:'#ea580c' },
      { band:'26+ yrs',   n:4,  pct:10.5, avg:74.8, color:'#b91c1c' },
    ],
    byFlag: [
      { flag:'cm', name:'Cameroon',         n:9, avg:71.4, standing:'Watchlisted' },
      { flag:'pa', name:'Panama',           n:8, avg:57.2, standing:'Paris MoU grey' },
      { flag:'lr', name:'Liberia',          n:7, avg:48.6, standing:'Paris MoU white' },
      { flag:'mt', name:'Malta',            n:5, avg:44.1, standing:'Paris MoU white' },
      { flag:'vc', name:'St Vincent & Gren.',n:4, avg:62.8, standing:'Paris MoU grey' },
      { flag:'tg', name:'Togo',             n:3, avg:69.7, standing:'Watchlisted' },
      { flag:'mh', name:'Marshall Islands', n:2, avg:39.4, standing:'Paris MoU white' },
    ],
    avgAge: 17.4, peerAvgAge: 13.4,
    psc: { inspections:64, detentions:5, deficiencyRate:4.8, peerDeficiencyRate:2.1 },
  },

  /* 3 — Risk Score distribution */
  distribution: [
    { band:'Good',      range:'0–25',   n:1,  pct:2.6,  color:'#16a34a', peerPct:24.9 },
    { band:'Average',   range:'26–50',  n:9,  pct:23.7, color:'#84cc16', peerPct:47.4 },
    { band:'Below avg', range:'51–60',  n:17, pct:44.7, color:'#d97706', peerPct:19.1 },
    { band:'High',      range:'61–80',  n:9,  pct:23.7, color:'#ea580c', peerPct:6.9  },
    { band:'Severe',    range:'81–100', n:2,  pct:5.3,  color:'#b91c1c', peerPct:1.7  },
  ],
  distNote: 'The managed fleet is heavily weighted to the below-average and high bands: 29 of 38 vessels score above 50, against a portfolio-wide share of 28%.',

  /* 4 — Highest Risk Score vessels */
  highest: [
    { name:'ORION CREST',    imo:'9042118', type:'Crude Oil Tanker', flag:'cm', score:86, prev:79, driver:'Sanctions link, 4 AIS gaps',   value:'$44m' },
    { name:'LEVANT DAWN',    imo:'9077640', type:'Product Tanker',   flag:'tg', score:82, prev:78, driver:'Registry watchlist, age 26',   value:'$16m' },
    { name:'CASPIAN DAWN',   imo:'9204338', type:'Crude Oil Tanker', flag:'cm', score:79, prev:64, driver:'STS with listed vessel',        value:'$58m' },
    { name:'RED KITE',       imo:'9088217', type:'Product Tanker',   flag:'cm', score:76, prev:74, driver:'PSC detention, age 27',         value:'$18m' },
    { name:'LEVANT PEARL',   imo:'9276441', type:'Crude Oil Tanker', flag:'cm', score:73, prev:70, driver:'Ownership opacity',             value:'$51m' },
    { name:'GULF VENTURE',   imo:'9188674', type:'Chemical Tanker',  flag:'vc', score:71, prev:58, driver:'Loitering, port call risk',     value:'$33m' },
    { name:'ADRIATIC MOON',  imo:'9155330', type:'General Cargo',    flag:'pa', score:69, prev:67, driver:'Age, class conditions',         value:'$9m'  },
    { name:'ANVIL TRADER',   imo:'9121887', type:'General Cargo',    flag:'tg', score:68, prev:66, driver:'Registry watchlist, PSC',       value:'$11m' },
  ],

  /* 5 — Casualty history */
  casualties: {
    summary: { total:7, serious:4, reserve:'$11.6m', rate:5.93, peerRate:1.12, vsPeer:'5.3\u00d7', openClaims:3 },
    events: [
      { date:'19 Oct 2024', name:'RED KITE',      imo:'9088217', type:'Machinery damage', sev:'Moderate', loc:'Gulf of Suez',      reserve:'$0.9m', status:'Closed' },
      { date:'07 Mar 2025', name:'ADRIATIC MOON', imo:'9155330', type:'Hull / structural',sev:'Serious',  loc:'Black Sea',         reserve:'$2.1m', status:'Settled' },
      { date:'22 Jul 2025', name:'ORION CREST',   imo:'9042118', type:'Grounding',        sev:'Serious',  loc:'Suez approaches',   reserve:'$3.4m', status:'Claim open' },
      { date:'14 Dec 2025', name:'GULF VENTURE',  imo:'9188674', type:'Cargo incident',   sev:'Moderate', loc:'Off Fujairah',      reserve:'$0.6m', status:'Closed' },
      { date:'28 Feb 2026', name:'LEVANT DAWN',   imo:'9077640', type:'Fire / explosion', sev:'Serious',  loc:'Lomé anchorage',    reserve:'$2.8m', status:'Claim open' },
      { date:'11 Jun 2026', name:'RED KITE',      imo:'9088217', type:'Machinery damage', sev:'Moderate', loc:'Mediterranean',     reserve:'$1.2m', status:'Survey held' },
      { date:'27 Aug 2026', name:'CASPIAN DAWN',  imo:'9204338', type:'Contact',          sev:'Serious',  loc:'Fujairah anchorage',reserve:'$0.6m', status:'Claim open' },
    ],
  },

  /* 6 — Sanctions / compliance indicators */
  compliance: {
    indicators: [
      { k:'Vessels with list matches',       v:1, tone:'red' },
      { k:'Vessels with STS indicators',     v:3, tone:'red' },
      { k:'AIS gaps over 6h (24m)',          v:29, tone:'amber' },
      { k:'Sanctioned port calls',           v:2, tone:'red' },
      { k:'Watchlisted-flag vessels',        v:12, tone:'amber' },
      { k:'Ownership changes (24m)',         v:11, tone:'amber' },
    ],
    events: [
      { name:'ORION CREST',    imo:'9042118', ind:'Beneficial owner list match', list:'EU Consolidated', on:'12 May 2026', sev:'Critical', status:'Escalated',    note:'Holder linked to an EU-listed entity via a Cyprus intermediary.' },
      { name:'CASPIAN DAWN',   imo:'9204338', ind:'STS with OFAC-listed vessel',  list:'OFAC SDN',        on:'12 Aug 2026', sev:'Critical', status:'Escalated',    note:'Counterparty confirmed from AIS and satellite imagery.' },
      { name:'LEVANT PEARL',   imo:'9276441', ind:'Sanctioned port call',         list:'UK OFSI',         on:'03 Apr 2026', sev:'High',     status:'Under review', note:'Berthed 26 hours at a designated terminal.' },
      { name:'SIRIUS EXPRESS', imo:'9366720', ind:'Unreported STS transfer',      list:'Internal',        on:'27 Aug 2026', sev:'High',     status:'Under review', note:'Counterparty unidentified; imagery requested.' },
    ],
    note: 'Four compliance indicators are open across the managed fleet, two of them escalated to compliance. All four vessels are ultimately held under two owning groups.',
  },

  /* 7 — Relevant fleet associations */
  associations: [
    { name:'Levant Maritime Holding',  role:'Registered / beneficial owner', shared:3, avg:73.7, note:'Also owns two vessels managed elsewhere; group carries an EU list match.', tone:'red' },
    { name:'Anvil Marine SA',          role:'Registered owner',              shared:3, avg:71.0, note:'All three vessels over 25 years and on watchlisted or grey registries.',  tone:'red' },
    { name:'Oryx Shipping Ltd',        role:'Registered owner',              shared:1, avg:71.0, note:'Single vessel; directors overlap with Anvil Marine SA.',                  tone:'amber' },
    { name:'Delta Bulk Operators',     role:'Registered owner',              shared:1, avg:62.0, note:'Separately reported for a 2.82 casualty rate across its own 142 hulls.',  tone:'amber' },
    { name:'Anadolu Denizcilik AS',    role:'Beneficial owner',              shared:1, avg:47.0, note:'Jurisdiction under enhanced monitoring since March 2026.',                tone:'amber' },
    { name:'Nordwind Shipping Group',  role:'Registered owner',              shared:1, avg:56.0, note:'Vessel newly transferred in; owner scores well on its own fleet.',        tone:'green' },
    { name:'Meridian Ship Management', role:'Former technical manager',      shared:4, avg:58.2, note:'Four vessels moved from Meridian to Pelagos over the window.',            tone:'amber' },
  ],
  assocNote: 'Associations are drawn from registered owner, beneficial owner, ISM manager and former-manager records. Two owning groups account for six of the eleven highest-scoring vessels.',

  /* 8 — Geographic activity */
  geography: {
    regions: [
      { region:'Middle East Gulf',                calls:118, vessels:21, days:412, listed:false, tone:'#d97706' },
      { region:'Southern Red Sea & Bab el-Mandeb',calls:64,  vessels:14, days:186, listed:true,  tone:'#b91c1c' },
      { region:'Mediterranean',                   calls:96,  vessels:19, days:298, listed:false, tone:'#1d4ed8' },
      { region:'West Africa',                     calls:47,  vessels:11, days:164, listed:true,  tone:'#dc2626' },
      { region:'Black Sea',                       calls:31,  vessels:7,  days:112, listed:true,  tone:'#ea580c' },
      { region:'South East Asia',                 calls:28,  vessels:9,  days:94,  listed:false, tone:'#0e7490' },
    ],
    ports: [
      { port:'Fujairah',   country:'ae', calls:41, vessels:16, note:'Principal bunkering and STS hub for the fleet.' },
      { port:'Lomé',       country:'tg', calls:26, vessels:8,  note:'Anchorage used for crew and stores; one fire casualty.' },
      { port:'Suez',       country:'eg', calls:24, vessels:13, note:'Canal transits, northbound and southbound.' },
      { port:'Novorossiysk',country:'ru',calls:14, vessels:5,  note:'Crude and product liftings; sanctions-sensitive.' },
      { port:'Piraeus',    country:'gr', calls:12, vessels:7,  note:'Repair and class survey calls.' },
    ],
    note: 'Fleet activity concentrates on the Middle East Gulf and southern Red Sea. Three of the six most-used regions are Joint War Committee listed, and 41% of all port days were spent in or adjacent to a listed area.',
  },

  findings: [
    { tone:'red',   t:'Managed fleet averages 55.8, over fourteen points above the portfolio', d:'Twenty-nine of 38 vessels score above 50 and eleven above 60, against a portfolio average of 41.6. Score has risen 4.6 points in the period as two vessels were taken under management.', m:'+14.2' },
    { tone:'red',   t:'Casualty rate more than five times the peer group', d:'Seven casualties across 38 vessels gives 5.93 per 100 vessels per year against a peer 1.12; four were serious and $11.6m is reserved with three claims open.', m:'5.3\u00d7' },
    { tone:'red',   t:'Two escalated sanctions indicators, both on the same owning group', d:'ORION CREST carries an EU beneficial-owner match and CASPIAN DAWN an OFAC STS indicator; both sit under Levant Maritime Holding, which also holds the fleet\u2019s worst average score.', m:'2 critical' },
    { tone:'amber', t:'Age and registry profile explain part but not all of the gap', d:'Average age is 17.4 years against a peer 13.4, and twelve vessels sit on watchlisted registries. Even within the 11\u201315 year band, however, the fleet averages 47.6 against a peer 40.4.', m:'17.4 yrs' },
  ],
};
