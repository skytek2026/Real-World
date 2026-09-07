/* Global Marine Casualty Intelligence Report — demo data */
window.GMC = {
  meta: {
    scope: 'Global merchant fleet — 300 GT and above',
    period: '01 Aug 2026 – 31 Aug 2026',
    previous: 'Jul 2026',
    preparedFor: 'Marine Underwriting & Research',
    generatedOn: '07 Sep 2026 11:38 UTC',
    reportId: 'GMC-2026-08-0342',
    owner: 'Paul Kiernan',
    universe: '61,400 vessels tracked',
  },

  summary: {
    casualties: 418, delta: '+37',
    serious: 96, seriousPct: 23.0,
    totalLosses: 7, totalLossDelta: '+2',
    vesselsLost: '$284m',
    fatalities: 23, fatalitiesDelta: '+9',
    rate: 0.68, rateNote: 'per 100 vessels per year',
    twelveMonthAvg: 381,
    worstRegion: 'South East Asia',
    worstType: 'Machinery damage',
  },

  /* 1 — New global casualties */
  newCasualties: {
    byWeek: [
      { w:'W31 (01–03)', n:38 },
      { w:'W32 (04–10)', n:97 },
      { w:'W33 (11–17)', n:104 },
      { w:'W34 (18–24)', n:112 },
      { w:'W35 (25–31)', n:67 },
    ],
    bySeverity: [
      { sev:'Total loss',   n:7,   pct:1.7,  color:'#7f1d1d' },
      { sev:'Serious',      n:89,  pct:21.3, color:'#b91c1c' },
      { sev:'Moderate',     n:174, pct:41.6, color:'#d97706' },
      { sev:'Minor',        n:148, pct:35.4, color:'#84cc16' },
    ],
    status: [
      { k:'Under investigation', v:186 },
      { k:'Survey completed',    v:141 },
      { k:'Closed',              v:84  },
      { k:'Vessel detained',     v:7   },
    ],
  },

  /* 2 — Significant incidents */
  significant: [
    { date:'04 Aug 2026', name:'HAI FENG 7',      imo:'9331084', type:'Container Ship',   flag:'pa', region:'South East Asia',  event:'Fire / explosion', sev:'Total loss', fatal:3, loss:'$68m', note:'Cargo-hold fire off Batam; abandoned after 14 hours, subsequently sank.' },
    { date:'09 Aug 2026', name:'ATLANTIC SPUR',   imo:'9205077', type:'Bulk Carrier',     flag:'lr', region:'North Atlantic',   event:'Foundering',       sev:'Total loss', fatal:8, loss:'$41m', note:'Structural failure in heavy weather 340 nm west of Ireland.' },
    { date:'13 Aug 2026', name:'TYRRHENIAN BREEZE', imo:'9412219', type:'Container Ship',   flag:'mt', region:'Mediterranean',    event:'Collision',        sev:'Serious',    fatal:0, loss:'$22m', note:'Collision with a fishing vessel in restricted visibility off Sicily.' },
    { date:'17 Aug 2026', name:'GOLDEN CRANE',    imo:'9166318', type:'Crude Oil Tanker', flag:'mh', region:'Middle East Gulf', event:'Grounding',        sev:'Serious',    fatal:0, loss:'$34m', note:'Grounded on departure from Kharg Island; hull breach, cargo transferred.' },
    { date:'21 Aug 2026', name:'NORTH STAR II',   imo:'9088770', type:'General Cargo',    flag:'cm', region:'West Africa',      event:'Machinery damage', sev:'Serious',    fatal:0, loss:'$4m',  note:'Total blackout drifting for 31 hours in the Gulf of Guinea.' },
    { date:'26 Aug 2026', name:'PACIFIC ORCHID',  imo:'9527466', type:'LNG Carrier',      flag:'sg', region:'East Asia',        event:'Contact',          sev:'Serious',    fatal:0, loss:'$19m', note:'Contact with berth structure at Yokohama; manifold damage.' },
    { date:'29 Aug 2026', name:'SEA VENTURE',     imo:'9142177', type:'Product Tanker',   flag:'pa', region:'South East Asia',  event:'Piracy / robbery', sev:'Serious',    fatal:1, loss:'$2m',  note:'Boarded in the Singapore Strait; one crew fatality, cargo intact.' },
  ],

  /* 3 — Casualties by type */
  byType: [
    { type:'Machinery damage',   n:132, pct:31.6, serious:18, avgLoss:'$1.9m', delta:'+14', color:'#1d4ed8' },
    { type:'Collision / contact',n:74,  pct:17.7, serious:21, avgLoss:'$4.6m', delta:'+9',  color:'#b91c1c' },
    { type:'Grounding',          n:58,  pct:13.9, serious:19, avgLoss:'$6.2m', delta:'+6',  color:'#ea580c' },
    { type:'Fire / explosion',   n:41,  pct:9.8,  serious:16, avgLoss:'$11.4m',delta:'+4',  color:'#d97706' },
    { type:'Hull / structural',  n:39,  pct:9.3,  serious:11, avgLoss:'$3.8m', delta:'+2',  color:'#0e7490' },
    { type:'Cargo incident',     n:34,  pct:8.1,  serious:6,  avgLoss:'$2.1m', delta:'+1',  color:'#7c3aed' },
    { type:'Piracy / security',  n:22,  pct:5.3,  serious:4,  avgLoss:'$1.4m', delta:'+3',  color:'#be123c' },
    { type:'Other',              n:18,  pct:4.3,  serious:1,  avgLoss:'$0.7m', delta:'-2',  color:'#64748b' },
  ],

  /* 4 — Vessel type */
  byVesselType: [
    { type:'Bulk Carrier',      fleet:12840, n:96, rate:0.75, serious:24, color:'#d97706' },
    { type:'Container Ship',    fleet:6210,  n:64, rate:1.03, serious:19, color:'#1d4ed8' },
    { type:'General Cargo',     fleet:14720, n:88, rate:0.60, serious:18, color:'#64748b' },
    { type:'Crude Oil Tanker',  fleet:2380,  n:31, rate:1.30, serious:11, color:'#b91c1c' },
    { type:'Product Tanker',    fleet:6940,  n:54, rate:0.78, serious:13, color:'#ea580c' },
    { type:'Chemical Tanker',   fleet:5180,  n:38, rate:0.73, serious:7,  color:'#c2410c' },
    { type:'LNG / LPG Carrier', fleet:2410,  n:14, rate:0.58, serious:3,  color:'#0e7490' },
    { type:'Other / specialist',fleet:10720, n:33, rate:0.31, serious:1,  color:'#84cc16' },
  ],

  /* 5 — Region */
  byRegion: [
    { region:'South East Asia',    n:98, pct:23.4, serious:26, rate:1.14, hotspot:'Singapore & Malacca Straits', delta:'+12' },
    { region:'East Asia',          n:71, pct:17.0, serious:15, rate:0.86, hotspot:'Yellow Sea & Bohai',          delta:'+7'  },
    { region:'Mediterranean',      n:54, pct:12.9, serious:12, rate:0.71, hotspot:'Sicily Channel',              delta:'+4'  },
    { region:'North Europe',       n:48, pct:11.5, serious:9,  rate:0.62, hotspot:'Dover Strait & North Sea',    delta:'+2'  },
    { region:'Middle East Gulf',   n:41, pct:9.8,  serious:11, rate:0.94, hotspot:'Strait of Hormuz',            delta:'+6'  },
    { region:'West Africa',        n:34, pct:8.1,  serious:10, rate:1.02, hotspot:'Gulf of Guinea',              delta:'+3'  },
    { region:'North America',      n:29, pct:6.9,  serious:6,  rate:0.44, hotspot:'US Gulf approaches',          delta:'+1'  },
    { region:'South America',      n:24, pct:5.7,  serious:5,  rate:0.51, hotspot:'Santos & Paranaguá',          delta:'+2'  },
    { region:'Rest of world',      n:19, pct:4.5,  serious:2,  rate:0.28, hotspot:'—',                           delta:'\u2014' },
  ],

  /* 6 — Flag */
  byFlag: [
    { flag:'pa', name:'Panama',           fleet:8420, n:74, rate:0.88, standing:'Paris MoU grey',  serious:21 },
    { flag:'lr', name:'Liberia',          fleet:5180, n:38, rate:0.73, standing:'Paris MoU white', serious:9  },
    { flag:'mh', name:'Marshall Islands', fleet:4640, n:31, rate:0.67, standing:'Paris MoU white', serious:7  },
    { flag:'cn', name:'China',            fleet:6810, n:52, rate:0.76, standing:'Paris MoU white', serious:11 },
    { flag:'mt', name:'Malta',            fleet:2380, n:16, rate:0.67, standing:'Paris MoU white', serious:4  },
    { flag:'sg', name:'Singapore',        fleet:3120, n:19, rate:0.61, standing:'Paris MoU white', serious:4  },
    { flag:'cm', name:'Cameroon',         fleet:340,  n:9,  rate:2.65, standing:'Watchlisted',     serious:6  },
    { flag:'tg', name:'Togo',             fleet:280,  n:7,  rate:2.50, standing:'Watchlisted',     serious:5  },
  ],

  /* 7 — Vessel age */
  byAge: [
    { band:'0–5 yrs',   fleet:9840,  n:31,  rate:0.31, serious:4,  color:'#16a34a' },
    { band:'6–10 yrs',  fleet:11260, n:44,  rate:0.39, serious:7,  color:'#84cc16' },
    { band:'11–15 yrs', fleet:12480, n:71,  rate:0.57, serious:14, color:'#eab308' },
    { band:'16–20 yrs', fleet:10920, n:88,  rate:0.81, serious:21, color:'#d97706' },
    { band:'21–25 yrs', fleet:9140,  n:96,  rate:1.05, serious:26, color:'#ea580c' },
    { band:'26+ yrs',   fleet:7760,  n:88,  rate:1.13, serious:24, color:'#b91c1c' },
  ],

  /* 8 — Owner / technical manager */
  byManager: [
    { name:'Sinotrans Shipping',        role:'Owner',             fleet:184, n:6, rate:3.26, serious:2, worst:'Machinery damage \u00d7 4' },
    { name:'Lianhua Marine Holdings',   role:'Owner',             fleet:96,  n:5, rate:5.21, serious:3, worst:'Fire / explosion \u00d7 2' },
    { name:'Delta Bulk Operators',      role:'Owner',             fleet:142, n:4, rate:2.82, serious:1, worst:'Grounding \u00d7 2' },
    { name:'Pelagos Tech Services',     role:'Technical manager', fleet:118, n:7, rate:5.93, serious:4, worst:'Machinery damage \u00d7 5' },
    { name:'Anchor Marine Management',  role:'Technical manager', fleet:206, n:6, rate:2.91, serious:2, worst:'Collision \u00d7 3' },
    { name:'Oryx Fleet Management',     role:'Technical manager', fleet:164, n:5, rate:3.05, serious:2, worst:'Hull / structural \u00d7 2' },
    { name:'Northern Marine Tech',      role:'Technical manager', fleet:312, n:3, rate:0.96, serious:0, worst:'Cargo incident \u00d7 2' },
  ],
  managerNote: 'Parties with three or more casualties in the period. Rate is casualties per 100 managed vessels annualised, so small fleets show high volatility.',

  /* 9 — Emerging casualty patterns */
  patterns: [
    { tone:'red',   t:'Lithium-battery cargo fires now a distinct cluster', d:'Six of the 41 fire casualties involved declared or suspected lithium-battery cargo, against one in the same period last year. All six were container ships on Asia\u2013Europe routes.', m:'6 events', trend:'+500% y/y' },
    { tone:'red',   t:'Machinery failures concentrating in 16\u201325 year tonnage', d:'That cohort holds 33% of the tracked fleet but 61% of machinery-damage casualties, with auxiliary generator and turbocharger failures dominant.', m:'61% of 132', trend:'+14 vs Jul' },
    { tone:'amber', t:'Singapore Strait collision frequency rising', d:'Eleven collision or contact events in the strait this period against a twelve-month average of six, coinciding with record simultaneous transit counts.', m:'11 events', trend:'+83% vs avg' },
    { tone:'amber', t:'Watchlisted-flag casualty rate now four times the mean', d:'Cameroon and Togo record 2.65 and 2.50 casualties per 100 vessels against a global mean of 0.68, and 11 of their 16 casualties were serious.', m:'3.9\u00d7 mean', trend:'stable' },
    { tone:'amber', t:'Heavy-weather structural failures earlier in the season', d:'Two North Atlantic founderings in August, historically a low month; both were bulk carriers over 22 years old on ballast passages.', m:'2 losses', trend:'season shift' },
    { tone:'green', t:'Piracy fatalities remain historically low despite volume', d:'Twenty-two security events produced one fatality; naval escort coverage in the Gulf of Guinea and Singapore Strait continues to limit boarding outcomes.', m:'1 fatality', trend:'\u221240% 5yr' },
  ],

  findings: [
    { tone:'red',   t:'418 casualties, the highest month in twelve', d:'Up 37 on July and 37 above the twelve-month average of 381. Seven total losses, two more than the previous period, with $284m of hull value lost.', m:'+37' },
    { tone:'red',   t:'Twenty-three fatalities across four events', d:'Eight in the ATLANTIC SPUR foundering and three in the HAI FENG 7 fire account for most of the total, which is up nine on the previous period.', m:'+9' },
    { tone:'amber', t:'South East Asia remains the dominant region', d:'98 casualties at a rate of 1.14 per 100 vessels, concentrated in the Singapore and Malacca Straits where collision frequency is running 83% above its average.', m:'23.4%' },
    { tone:'green', t:'Newer tonnage continues to outperform', d:'The 0\u201310 year cohort records 0.35 casualties per 100 vessels against 1.09 for vessels over 21 years, and only 11 of the 96 serious casualties.', m:'0.35 vs 1.09' },
  ],
};
