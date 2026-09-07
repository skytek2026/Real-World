/* Accumulation & Concentration Exception Report — demo data */
window.ACE = {
  meta: {
    portfolio: 'Global Hull & Machinery 2026',
    period: '01 Aug 2026 – 31 Aug 2026',
    previous: 'Jul 2026',
    preparedFor: 'Exposure Management Committee',
    generatedOn: '07 Sep 2026 10:26 UTC',
    reportId: 'ACE-2026-08-0091',
    owner: 'Paul Kiernan',
    basis: 'Peak simultaneous presence inside a region boundary, measured hourly',
  },

  summary: {
    regions: 24,
    breaches: 4, breachDelta: '+1',
    peakValue: '$2.41bn',
    peakRegion: 'Singapore Strait',
    exposedValue: '$9.84bn',
    exposedValueDelta: '+$412m',
    portfolioValue: '$18.4bn',
    sharePct: 53.5,
    vesselsInvolved: 512,
    declaredPct: 78.4,
    worstOver: '+24%',
  },

  /* 1 — Highest geographic concentrations */
  concentrations: [
    { region:'Singapore Strait',                 peak:186, at:'22 Aug 14:00', avg:171, value:'$2.41bn', valueNum:2.41, limit:150, over:'+24%', tone:'#b91c1c' },
    { region:'Strait of Hormuz',                 peak:104, at:'09 Aug 06:00', avg:96,  value:'$1.28bn', valueNum:1.28, limit:90,  over:'+16%', tone:'#dc2626' },
    { region:'Suez / Gulf of Suez',              peak:78,  at:'27 Aug 21:00', avg:71,  value:'$0.94bn', valueNum:0.94, limit:70,  over:'+11%', tone:'#ea580c' },
    { region:'Malacca Strait',                   peak:142, at:'18 Aug 09:00', avg:131, value:'$1.66bn', valueNum:1.66, limit:140, over:'+1%',  tone:'#d97706' },
    { region:'Gulf of Guinea (Nigeria / Benin)', peak:31,  at:'24 Aug 11:00', avg:29,  value:'$0.42bn', valueNum:0.42, limit:40,  over:'\u2014', tone:'#16a34a' },
    { region:'Southern Red Sea & Bab el-Mandeb', peak:47,  at:'03 Aug 18:00', avg:41,  value:'$0.61bn', valueNum:0.61, limit:60,  over:'\u2014', tone:'#16a34a' },
    { region:'Black Sea \u2014 north-west',       peak:19,  at:'20 Aug 04:00', avg:16,  value:'$0.34bn', valueNum:0.34, limit:25,  over:'\u2014', tone:'#16a34a' },
    { region:'Panama Canal approaches',           peak:64,  at:'12 Aug 16:00', avg:58,  value:'$0.88bn', valueNum:0.88, limit:80,  over:'\u2014', tone:'#16a34a' },
  ],

  /* 2 — Regions exceeding selected thresholds */
  breaches: [
    { region:'Singapore Strait',    limit:150, peak:186, over:36, overPct:'+24%', hours:41, first:'19 Aug 08:00', last:'26 Aug 22:00', value:'$2.41bn', excessValue:'$466m', action:'Reduce at renewal',  tone:'#b91c1c' },
    { region:'Strait of Hormuz',    limit:90,  peak:104, over:14, overPct:'+16%', hours:26, first:'07 Aug 12:00', last:'11 Aug 19:00', value:'$1.28bn', excessValue:'$172m', action:'Refer to committee', tone:'#dc2626' },
    { region:'Suez / Gulf of Suez', limit:70,  peak:78,  over:8,  overPct:'+11%', hours:14, first:'26 Aug 03:00', last:'28 Aug 10:00', value:'$0.94bn', excessValue:'$96m',  action:'Monitor',            tone:'#ea580c' },
    { region:'Malacca Strait',      limit:140, peak:142, over:2,  overPct:'+1%',  hours:3,  first:'18 Aug 08:00', last:'18 Aug 11:00', value:'$1.66bn', excessValue:'$23m',  action:'Monitor',            tone:'#d97706' },
  ],
  breachNote: 'Four regions exceeded their accumulation limit in the period, against three in the previous report. Singapore Strait spent 41 hours above limit and accounts for two thirds of the excess value.',

  /* 3 — Concentration by vessel type */
  byType: [
    { type:'Container Ship',    vessels:148, pct:28.9, value:'$3.12bn', valueNum:3.12, worst:'Singapore Strait',  color:'#1d4ed8' },
    { type:'Crude Oil Tanker',  vessels:96,  pct:18.8, value:'$2.28bn', valueNum:2.28, worst:'Strait of Hormuz',  color:'#b91c1c' },
    { type:'Bulk Carrier',      vessels:114, pct:22.3, value:'$1.61bn', valueNum:1.61, worst:'Malacca Strait',    color:'#d97706' },
    { type:'Product Tanker',    vessels:71,  pct:13.9, value:'$1.24bn', valueNum:1.24, worst:'Strait of Hormuz',  color:'#ea580c' },
    { type:'Chemical Tanker',   vessels:38,  pct:7.4,  value:'$0.71bn', valueNum:0.71, worst:'Singapore Strait',  color:'#c2410c' },
    { type:'LNG / LPG Carrier', vessels:27,  pct:5.3,  value:'$0.74bn', valueNum:0.74, worst:'Suez / Gulf of Suez',color:'#0e7490' },
    { type:'General Cargo',     vessels:18,  pct:3.5,  value:'$0.14bn', valueNum:0.14, worst:'Malacca Strait',    color:'#64748b' },
  ],
  typeNote: 'Container tonnage carries the largest share of accumulated value, but crude tankers show the highest value per vessel at $23.8m against $21.1m for containers.',

  /* 4 — Top 10 exposures by region */
  top10: [
    { region:'Singapore Strait',                 vessels:186, value:'$2.41bn', valueNum:2.41, share:24.5, avgRisk:44.8, limit:150, status:'Over limit' },
    { region:'Malacca Strait',                   vessels:142, value:'$1.66bn', valueNum:1.66, share:16.9, avgRisk:41.2, limit:140, status:'Over limit' },
    { region:'Strait of Hormuz',                 vessels:104, value:'$1.28bn', valueNum:1.28, share:13.0, avgRisk:52.1, limit:90,  status:'Over limit' },
    { region:'Suez / Gulf of Suez',              vessels:78,  value:'$0.94bn', valueNum:0.94, share:9.6,  avgRisk:46.7, limit:70,  status:'Over limit' },
    { region:'Panama Canal approaches',          vessels:64,  value:'$0.88bn', valueNum:0.88, share:8.9,  avgRisk:34.6, limit:80,  status:'Within limit' },
    { region:'English Channel / Dover Strait',   vessels:58,  value:'$0.79bn', valueNum:0.79, share:8.0,  avgRisk:31.4, limit:90,  status:'Within limit' },
    { region:'Southern Red Sea & Bab el-Mandeb', vessels:47,  value:'$0.61bn', valueNum:0.61, share:6.2,  avgRisk:58.3, limit:60,  status:'Within limit' },
    { region:'Gulf of Guinea (Nigeria / Benin)', vessels:31,  value:'$0.42bn', valueNum:0.42, share:4.3,  avgRisk:56.9, limit:40,  status:'Within limit' },
    { region:'Black Sea \u2014 north-west',       vessels:19,  value:'$0.34bn', valueNum:0.34, share:3.5,  avgRisk:61.2, limit:25,  status:'Within limit' },
    { region:'Gulf of Aden',                     vessels:26,  value:'$0.31bn', valueNum:0.31, share:3.1,  avgRisk:57.4, limit:45,  status:'Within limit' },
  ],

  /* 5 — Vessels contributing to the accumulation (Singapore Strait, the worst region) */
  contributors: {
    region: 'Singapore Strait',
    at: '22 Aug 2026 14:00',
    vessels: [
      { name:'ATLAS PIONEER',   imo:'9512289', type:'Container Ship',   flag:'sg', score:68, value:'$96m',  basis:'Declared', dwell:'2d 06h' },
      { name:'THAMES ENVOY',    imo:'9544201', type:'Container Ship',   flag:'gb', score:26, value:'$112m', basis:'Declared', dwell:'1d 14h' },
      { name:'NORTHERN AURORA', imo:'9601124', type:'LNG Carrier',      flag:'no', score:22, value:'$188m', basis:'Declared', dwell:'0d 19h' },
      { name:'PACIFIC EMBER',   imo:'9418223', type:'Bulk Carrier',     flag:'sg', score:41, value:'$34m',  basis:'Declared', dwell:'3d 02h' },
      { name:'CORAL SENTINEL',  imo:'9587310', type:'Product Tanker',   flag:'sg', score:31, value:'$46m',  basis:'Declared', dwell:'1d 08h' },
      { name:'GULF VENTURE',    imo:'9188674', type:'Chemical Tanker',  flag:'vc', score:71, value:'$33m',  basis:'Declared', dwell:'0d 21h' },
      { name:'MERIDIAN STAR',   imo:'9298155', type:'Bulk Carrier',     flag:'pa', score:62, value:'$24m',  basis:'Estimated',dwell:'2d 11h' },
      { name:'ANATOLIA STAR',   imo:'9498716', type:'Bulk Carrier',     flag:'mt', score:38, value:'$34m',  basis:'Declared', dwell:'1d 03h' },
      { name:'SIRIUS EXPRESS',  imo:'9366720', type:'Product Tanker',   flag:'cm', score:64, value:'$37m',  basis:'Estimated',dwell:'0d 16h' },
      { name:'BALTIC HERON',    imo:'9077431', type:'General Cargo',    flag:'ru', score:66, value:'$12m',  basis:'Estimated',dwell:'4d 07h' },
    ],
    othersCount: 176,
    othersValue: '$1.79bn',
  },

  /* 6 — Insured value where available */
  valueCoverage: {
    declared: { vessels:401, pct:78.4, value:'$7.94bn' },
    estimated:{ vessels:88,  pct:17.2, value:'$1.63bn' },
    none:     { vessels:23,  pct:4.5,  value:'$0.27bn' },
    method: 'Estimates use vessel type, tonnage and build year against a market value index, refreshed monthly.',
  },
  valueTiers: [
    { tier:'Over $100m',   vessels:34,  value:'$4.21bn', valueNum:4.21, color:'#b91c1c' },
    { tier:'$50m–$100m',   vessels:71,  value:'$2.68bn', valueNum:2.68, color:'#ea580c' },
    { tier:'$20m–$50m',    vessels:164, value:'$2.14bn', valueNum:2.14, color:'#d97706' },
    { tier:'$5m–$20m',     vessels:198, value:'$0.71bn', valueNum:0.71, color:'#84cc16' },
    { tier:'Under $5m',    vessels:45,  value:'$0.10bn', valueNum:0.10, color:'#16a34a' },
  ],
  valueCaveats: [
    { tone:'amber', t:'23 vessels carry no value on file', d:'These sit almost entirely in the Coastal & Short Sea book. Regional totals therefore understate true exposure by an estimated $0.27bn.', m:'4.5%' },
    { tone:'amber', t:'Estimated values used for 88 vessels', d:'Where no client declaration exists the report substitutes an indexed market estimate; these are labelled separately in every table.', m:'17.2%' },
    { tone:'green', t:'Declared coverage improved four points', d:'Client-declared values now cover 78.4% of accumulated vessels, up from 74.1% in the previous report as renewal data landed.', m:'+4.3pts' },
  ],

  findings: [
    { tone:'red',   t:'Four regions breached their accumulation limit', d:'Singapore Strait peaked 24% over at 186 vessels and stayed above limit for 41 hours, carrying $466m of excess insured value. Hormuz, Suez and Malacca also breached.', m:'4 regions' },
    { tone:'red',   t:'Over half the book\u2019s value sits inside monitored regions', d:'$9.84bn of $18.4bn was inside a monitored region at some point in the period \u2014 up $412m \u2014 concentrated in the Asia container lane.', m:'53.5%' },
    { tone:'amber', t:'Container and crude tanker tonnage drive the peaks', d:'Containers hold 28.9% of accumulated value and crude tankers 18.8%; together they account for three of the four limit breaches.', m:'47.7%' },
    { tone:'green', t:'Value coverage now at 78.4% declared', d:'Only 23 vessels lack any value on file. Estimated values are labelled separately so the committee can see which totals rest on modelled figures.', m:'+4.3pts' },
  ],
};
