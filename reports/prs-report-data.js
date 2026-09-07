/* Portfolio Risk Score Report — demo data */
window.PRS = {
  meta: {
    portfolio: 'Global Hull & Machinery 2026',
    period: '01 Aug 2026 – 31 Aug 2026',
    previous: 'Jul 2026',
    preparedFor: 'Marine Underwriting Committee',
    generatedOn: '07 Sep 2026 10:04 UTC',
    reportId: 'PRS-2026-08-0163',
    owner: 'Paul Kiernan',
    basis: 'Real World Risk Score, 0–100 scale, lower is better',
  },

  average: {
    score: 41.6, delta: '+1.4',
    median: 38, weighted: 44.9, weightedNote: 'weighted by insured value',
    vessels: 1284, scored: 1271, coveragePct: 99.0,
    best: 'Coastal & Short Sea (32.1)',
    worst: 'Tanker Book — Europe (52.8)',
    band: 'Average',
    twelveMonthLow: 38.9, twelveMonthHigh: 43.2,
  },

  distribution: [
    { band:'Good',     range:'0–25',   count:317, pct:24.9, color:'#16a34a', delta:'-14' },
    { band:'Average',  range:'26–50',  count:602, pct:47.4, color:'#84cc16', delta:'-6' },
    { band:'Below avg',range:'51–60',  count:243, pct:19.1, color:'#d97706', delta:'+9' },
    { band:'High',     range:'61–80',  count:88,  pct:6.9,  color:'#ea580c', delta:'+8' },
    { band:'Severe',   range:'81–100', count:21,  pct:1.7,  color:'#b91c1c', delta:'+3' },
  ],

  highest: [
    { name:'STELLA MARIS',   imo:'9411678', type:'Crude Oil Tanker', flag:'pa', age:14, score:88, prev:81, driver:'Sanctions link, 3 AIS gaps',  value:'$74m' },
    { name:'ORION TRADER',   imo:'9327451', type:'Product Tanker',   flag:'lr', age:19, score:82, prev:79, driver:'Dark activity, flag watch',   value:'$41m' },
    { name:'CASPIAN DAWN',   imo:'9204338', type:'Crude Oil Tanker', flag:'cm', age:21, score:79, prev:64, driver:'STS with listed vessel',      value:'$58m' },
    { name:'RED KITE',       imo:'9088217', type:'Product Tanker',   flag:'cm', age:27, score:76, prev:74, driver:'Registry watchlist, age',      value:'$18m' },
    { name:'NORDIC FALCON',  imo:'9455102', type:'Bulk Carrier',     flag:'mh', age:22, score:74, prev:72, driver:'PSC detention, casualty',     value:'$29m' },
    { name:'GULF VENTURE',   imo:'9188674', type:'Chemical Tanker',  flag:'vc', age:18, score:71, prev:58, driver:'Loitering, port call risk',   value:'$33m' },
    { name:'ADRIATIC MOON',  imo:'9155330', type:'General Cargo',    flag:'pa', age:29, score:69, prev:67, driver:'Age, class conditions',       value:'$9m'  },
    { name:'ATLAS PIONEER',  imo:'9512289', type:'Container Ship',   flag:'sg', age:11, score:68, prev:66, driver:'Manager risk, 2 casualties',  value:'$96m' },
    { name:'BALTIC HERON',   imo:'9077431', type:'General Cargo',    flag:'ru', age:26, score:66, prev:63, driver:'Flag watch, age',              value:'$12m' },
    { name:'SIRIUS EXPRESS', imo:'9366720', type:'Product Tanker',   flag:'cm', age:16, score:64, prev:61, driver:'Ownership opacity',            value:'$37m' },
  ],

  increases: [
    { name:'CASPIAN DAWN',  imo:'9204338', from:64, to:79, delta:15, cause:'Ship-to-ship transfer with a listed vessel off Fujairah.' },
    { name:'GULF VENTURE',  imo:'9188674', from:58, to:71, delta:13, cause:'Two loitering events and a 19-hour AIS gap in the Red Sea.' },
    { name:'KESTREL BAY',   imo:'9433870', from:44, to:56, delta:12, cause:'Technical manager changed to an entity with an adverse record.' },
    { name:'HELLENIC WIND', imo:'9271044', from:39, to:50, delta:11, cause:'Port state control detention at Algeciras, four deficiencies.' },
    { name:'IONIAN SPIRIT', imo:'9350988', from:37, to:47, delta:10, cause:'Beneficial owner moved into a monitored jurisdiction.' },
  ],
  decreases: [
    { name:'ADRIATIC ROSE', imo:'9302188', from:63, to:48, delta:15, cause:'Ninety days of clean AIS record; dark-activity weighting released.' },
    { name:'PACIFIC EMBER', imo:'9418223', from:52, to:41, delta:11, cause:'Repositioned out of a monitored region; port profile normalised.' },
    { name:'LUSITANIA BAY', imo:'9265470', from:49, to:40, delta:9,  cause:'Casualty claim settled and class conditions lifted.' },
    { name:'THAMES ENVOY',  imo:'9544201', from:34, to:26, delta:8,  cause:'Re-flagged to a Paris MoU white-list registry.' },
    { name:'CORAL SENTINEL',imo:'9587310', from:38, to:31, delta:7,  cause:'New technical manager with a clean inspection history.' },
  ],

  byType: [
    { type:'Crude Oil Tanker', vessels:186, avg:52.4, delta:'+2.8', high:12, value:'$4.9bn' },
    { type:'Product Tanker',   vessels:204, avg:48.1, delta:'+1.9', high:14, value:'$3.1bn' },
    { type:'Chemical Tanker',  vessels:118, avg:44.6, delta:'+1.1', high:6,  value:'$1.7bn' },
    { type:'Bulk Carrier',     vessels:318, avg:39.8, delta:'+0.7', high:9,  value:'$3.4bn' },
    { type:'Container Ship',   vessels:241, avg:36.2, delta:'+0.4', high:5,  value:'$4.2bn' },
    { type:'General Cargo',    vessels:142, avg:47.9, delta:'+2.2', high:8,  value:'$0.8bn' },
    { type:'LNG / LPG Carrier',vessels:75,  avg:28.4, delta:'-0.6', high:1,  value:'$2.1bn' },
  ],

  byAge: [
    { band:'0–5 yrs',   vessels:214, avg:26.8, high:2,  color:'#16a34a' },
    { band:'6–10 yrs',  vessels:287, avg:33.1, high:7,  color:'#84cc16' },
    { band:'11–15 yrs', vessels:326, avg:40.4, high:18, color:'#eab308' },
    { band:'16–20 yrs', vessels:249, avg:48.9, high:31, color:'#d97706' },
    { band:'21–25 yrs', vessels:141, avg:56.2, high:29, color:'#ea580c' },
    { band:'26+ yrs',   vessels:67,  avg:63.7, high:22, color:'#b91c1c' },
  ],

  byFlag: [
    { flag:'pa', name:'Panama',           vessels:227, avg:45.2, delta:'+1.6', standing:'Paris MoU grey',  high:19 },
    { flag:'lr', name:'Liberia',          vessels:198, avg:41.7, delta:'+1.2', standing:'Paris MoU white', high:13 },
    { flag:'mh', name:'Marshall Islands', vessels:174, avg:39.4, delta:'+0.8', standing:'Paris MoU white', high:9  },
    { flag:'sg', name:'Singapore',        vessels:121, avg:33.6, delta:'+0.3', standing:'Paris MoU white', high:4  },
    { flag:'mt', name:'Malta',            vessels:108, avg:38.1, delta:'+0.9', standing:'Paris MoU white', high:6  },
    { flag:'gr', name:'Greece',           vessels:86,  avg:36.9, delta:'+0.5', standing:'Paris MoU white', high:3  },
    { flag:'cm', name:'Cameroon',         vessels:24,  avg:68.3, delta:'+4.1', standing:'Watchlisted',     high:17 },
    { flag:'ru', name:'Russia',           vessels:19,  avg:64.8, delta:'+2.7', standing:'Watchlisted',     high:12 },
  ],

  byOwner: [
    { name:'Nordwind Shipping Group', role:'Owner',             vessels:64, avg:34.2, delta:'-0.8', high:2,  worst:'NORDIC FALCON (74)' },
    { name:'Aegean Dry Bulk',         role:'Owner',             vessels:48, avg:38.6, delta:'+0.6', high:3,  worst:'IONIAN SPIRIT (47)' },
    { name:'Levant Maritime Holding', role:'Owner',             vessels:31, avg:61.4, delta:'+3.9', high:14, worst:'STELLA MARIS (88)' },
    { name:'Coral Maritime Pte Ltd',  role:'Owner',             vessels:27, avg:30.1, delta:'-1.2', high:0,  worst:'CORAL SENTINEL (31)' },
    { name:'Meridian Ship Management',role:'Technical manager', vessels:91, avg:37.9, delta:'+0.4', high:5,  worst:'MERIDIAN STAR (62)' },
    { name:'Pelagos Tech Services',   role:'Technical manager', vessels:38, avg:55.8, delta:'+4.6', high:11, worst:'CASPIAN DAWN (79)' },
    { name:'Oryx Fleet Management',   role:'Technical manager', vessels:44, avg:49.3, delta:'+1.8', high:7,  worst:'GULF VENTURE (71)' },
    { name:'Northern Marine Tech',    role:'Technical manager', vessels:52, avg:31.6, delta:'-0.5', high:1,  worst:'ANATOLIA STAR (38)' },
  ],

  trend: {
    months: ['Sep 25','Oct 25','Nov 25','Dec 25','Jan 26','Feb 26','Mar 26','Apr 26','May 26','Jun 26','Jul 26','Aug 26'],
    portfolio: [38.9, 39.4, 39.1, 39.8, 40.2, 39.6, 40.1, 40.8, 41.0, 40.4, 40.2, 41.6],
    tankers:   [47.1, 47.8, 47.4, 48.2, 48.9, 48.4, 49.1, 50.2, 50.6, 49.8, 49.6, 52.4],
    dry:       [33.4, 33.9, 33.6, 34.1, 34.4, 34.0, 34.2, 34.8, 34.9, 34.5, 34.4, 35.8],
  },
  trendNotes: [
    { tone:'red',   t:'Portfolio average up 2.7 points over twelve months', d:'The book has drifted from 38.9 to 41.6 since Sep 2025, with the sharpest single move in the current period. Tanker tonnage accounts for roughly two thirds of the rise.', m:'+2.7' },
    { tone:'red',   t:'Crude and product tankers now average 52.4 and 48.1', d:'Tanker segments carry 26 of the 109 vessels scoring 61 or above and have risen faster than every other type in the period.', m:'+2.8' },
    { tone:'amber', t:'Watchlisted registries dominate the worst scores', d:'Cameroon and Russia hold only 43 vessels between them but 29 of the high-score exceptions, averaging 68.3 and 64.8 respectively.', m:'29 of 109' },
    { tone:'green', t:'Newer tonnage continues to score well', d:'The 0–10 year cohort averages 30.4 across 501 vessels with just 9 high scores, and LNG/LPG carriers improved 0.6 points in the period.', m:'avg 30.4' },
  ],

  findings: [
    { tone:'red',   t:'Portfolio average rises to 41.6, the highest in twelve months', d:'Up 1.4 points in the period and 2.7 over the year. The value-weighted average of 44.9 sits higher still, meaning the larger exposures carry the worse scores.', m:'+1.4' },
    { tone:'red',   t:'109 vessels now score 61 or above', d:'The high and severe bands grew by 11 vessels while the good band shrank by 14 — a clear migration up the scale rather than a few isolated outliers.', m:'109 vessels' },
    { tone:'amber', t:'Score correlates strongly with age and registry', d:'Vessels over 26 years average 63.7 against 26.8 for those under five, and the two watchlisted registries average above 64 while every white-list flag sits below 46.', m:'63.7 vs 26.8' },
    { tone:'green', t:'Five vessels improved by nine points or more', d:'ADRIATIC ROSE fell 15 points on a clean AIS record and PACIFIC EMBER 11 on repositioning, showing the score responds quickly to corrected behaviour.', m:'5 improved' },
  ],
};
