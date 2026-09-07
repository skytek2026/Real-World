/* Global Fleet & Market Intelligence Report — demo data */
window.GFM = {
  meta: {
    scope: 'Global merchant fleet — 300 GT and above',
    period: '01 Aug 2026 – 31 Aug 2026',
    previous: 'Jul 2026',
    preparedFor: 'Marine Underwriting & Research',
    generatedOn: '07 Sep 2026 14:22 UTC',
    reportId: 'GFM-2026-08-0411',
    owner: 'Paul Kiernan',
    universe: '61,400 vessels tracked',
  },

  summary: {
    vessels: 61400, vesselsDelta: '+412',
    totalGt: '1.62bn GT',
    insuredValue: '$1.94tn',
    avgAge: 14.6, avgAgeDelta: '-0.1',
    avgScore: 39.4, avgScoreDelta: '+0.6',
    casualties: 418,
    sanctionedVessels: 1284,
    deliveries: 218, demolitions: 96,
    orderbookPct: 11.8,
    newbuildPrice: '+4.2%',
    scrapPrice: '$482/ldt',
  },

  /* 1 — Global fleet composition */
  composition: {
    headline: [
      { k:'Vessels tracked',      v:'61,400',   d:'+412 in period' },
      { k:'Total tonnage',        v:'1.62bn GT',d:'+0.7% in period' },
      { k:'Aggregate value',      v:'$1.94tn',  d:'+1.4% in period' },
      { k:'Average age',          v:'14.6 yrs', d:'-0.1 in period' },
      { k:'Deliveries in period', v:'218',      d:'6.8m GT' },
      { k:'Demolitions in period',v:'96',       d:'1.9m GT' },
    ],
    growth: {
      months: ['Sep 25','Nov 25','Jan 26','Mar 26','May 26','Jul 26','Aug 26'],
      vessels: [59840, 60110, 60420, 60680, 60940, 60988, 61400],
    },
  },

  /* 2 — Vessel type */
  byType: [
    { type:'General Cargo',     n:14720, gt:'188m',  pct:24.0, avgAge:19.4, avgScore:44.6, color:'#64748b' },
    { type:'Bulk Carrier',      n:12840, gt:'482m',  pct:20.9, avgAge:12.1, avgScore:38.2, color:'#d97706' },
    { type:'Other / specialist',n:10720, gt:'96m',   pct:17.5, avgAge:16.8, avgScore:33.4, color:'#84cc16' },
    { type:'Product Tanker',    n:6940,  gt:'218m',  pct:11.3, avgAge:13.6, avgScore:43.8, color:'#ea580c' },
    { type:'Container Ship',    n:6210,  gt:'324m',  pct:10.1, avgAge:12.8, avgScore:36.1, color:'#1d4ed8' },
    { type:'Chemical Tanker',   n:5180,  gt:'112m',  pct:8.4,  avgAge:13.2, avgScore:41.2, color:'#c2410c' },
    { type:'LNG / LPG Carrier', n:2410,  gt:'118m',  pct:3.9,  avgAge:11.4, avgScore:28.6, color:'#0e7490' },
    { type:'Crude Oil Tanker',  n:2380,  gt:'184m',  pct:3.9,  avgAge:14.9, avgScore:48.4, color:'#b91c1c' },
  ],

  /* 3 — Vessel age */
  byAge: [
    { band:'0–5 yrs',   n:9840,  pct:16.0, gt:'368m', avgScore:26.8, color:'#16a34a' },
    { band:'6–10 yrs',  n:11260, pct:18.3, gt:'342m', avgScore:33.1, color:'#84cc16' },
    { band:'11–15 yrs', n:12480, pct:20.3, gt:'318m', avgScore:40.4, color:'#eab308' },
    { band:'16–20 yrs', n:10920, pct:17.8, gt:'264m', avgScore:48.9, color:'#d97706' },
    { band:'21–25 yrs', n:9140,  pct:14.9, gt:'186m', avgScore:56.2, color:'#ea580c' },
    { band:'26+ yrs',   n:7760,  pct:12.6, gt:'142m', avgScore:63.7, color:'#b91c1c' },
  ],
  ageNote: 'The fleet is slowly getting younger as deliveries outpace demolitions two to one, but the 26-plus cohort still holds 12.6% of vessels and carries an average score of 63.7.',

  /* 4 — Flag */
  byFlag: [
    { flag:'pa', name:'Panama',           n:8420, pct:13.7, avgAge:16.2, avgScore:45.2, standing:'Paris MoU grey',  delta:'-38' },
    { flag:'cn', name:'China',            n:6810, pct:11.1, avgAge:12.4, avgScore:38.6, standing:'Paris MoU white', delta:'+114' },
    { flag:'lr', name:'Liberia',          n:5180, pct:8.4,  avgAge:13.1, avgScore:41.7, standing:'Paris MoU white', delta:'+86' },
    { flag:'mh', name:'Marshall Islands', n:4640, pct:7.6,  avgAge:12.8, avgScore:39.4, standing:'Paris MoU white', delta:'+52' },
    { flag:'sg', name:'Singapore',        n:3120, pct:5.1,  avgAge:11.6, avgScore:33.6, standing:'Paris MoU white', delta:'+31' },
    { flag:'hk', name:'Hong Kong',        n:2740, pct:4.5,  avgAge:11.9, avgScore:34.8, standing:'Paris MoU white', delta:'+18' },
    { flag:'mt', name:'Malta',            n:2380, pct:3.9,  avgAge:14.2, avgScore:38.1, standing:'Paris MoU white', delta:'+9'  },
    { flag:'cm', name:'Cameroon',         n:340,  pct:0.6,  avgAge:24.8, avgScore:68.3, standing:'Watchlisted',     delta:'+41' },
    { flag:'tg', name:'Togo',             n:280,  pct:0.5,  avgAge:26.1, avgScore:69.7, standing:'Watchlisted',     delta:'+27' },
  ],
  flagNote: 'Watchlisted registries hold under 1.1% of the fleet but grew faster in percentage terms than any white-list flag, adding 68 vessels between them in the period.',

  /* 5 — Owner / technical manager */
  managers: [
    { name:'Anchor Marine Management',  role:'Technical manager', n:206, avgAge:11.8, avgScore:31.4, casRate:2.91, tone:'green' },
    { name:'Northern Marine Tech',      role:'Technical manager', n:312, avgAge:10.4, avgScore:29.8, casRate:0.96, tone:'green' },
    { name:'Sinotrans Shipping',        role:'Owner',             n:184, avgAge:13.2, avgScore:36.2, casRate:3.26, tone:'amber' },
    { name:'Delta Bulk Operators',      role:'Owner',             n:142, avgAge:15.6, avgScore:42.8, casRate:2.82, tone:'amber' },
    { name:'Oryx Fleet Management',     role:'Technical manager', n:164, avgAge:16.1, avgScore:49.3, casRate:3.05, tone:'amber' },
    { name:'Lianhua Marine Holdings',   role:'Owner',             n:96,  avgAge:19.8, avgScore:58.6, casRate:5.21, tone:'red' },
    { name:'Pelagos Tech Services',     role:'Technical manager', n:118, avgAge:17.4, avgScore:55.8, casRate:5.93, tone:'red' },
  ],
  managerNote: 'The seven largest managers and owners by tracked vessel count where a full record is available. Casualty rate is per 100 vessels per year.',
  concentration: { top10Pct: 8.4, top50Pct: 24.6, singleVesselPct: 41.2 },

  /* 6 — Risk Score distribution */
  distribution: [
    { band:'Good',      range:'0–25',   n:14680, pct:23.9, color:'#16a34a', delta:'-320' },
    { band:'Average',   range:'26–50',  n:28940, pct:47.1, color:'#84cc16', delta:'+180' },
    { band:'Below avg', range:'51–60',  n:11420, pct:18.6, color:'#d97706', delta:'+340' },
    { band:'High',      range:'61–80',  n:5120,  pct:8.3,  color:'#ea580c', delta:'+186' },
    { band:'Severe',    range:'81–100', n:1240,  pct:2.0,  color:'#b91c1c', delta:'+26'  },
  ],
  distNote: 'The global average rose 0.6 points to 39.4 as vessels migrated out of the good band. High and severe bands together now hold 6,360 vessels, up 212 in the period.',

  /* 7 — Casualty activity */
  casualties: {
    summary: { total:418, delta:'+37', serious:96, totalLosses:7, fatalities:23, rate:0.68 },
    byType: [
      { type:'Machinery damage',    n:132, pct:31.6 },
      { type:'Collision / contact', n:74,  pct:17.7 },
      { type:'Grounding',           n:58,  pct:13.9 },
      { type:'Fire / explosion',    n:41,  pct:9.8  },
      { type:'Hull / structural',   n:39,  pct:9.3  },
      { type:'Other',               n:74,  pct:17.7 },
    ],
    trend: {
      months: ['Mar 26','Apr 26','May 26','Jun 26','Jul 26','Aug 26'],
      n: [364, 351, 388, 372, 381, 418],
    },
  },

  /* 8 — Sanctions / compliance activity */
  compliance: {
    indicators: [
      { k:'Vessels with a list match',    v:'1,284', d:'2.1% of the fleet' },
      { k:'Designations added in period', v:'86',    d:'across four list sets' },
      { k:'Designations removed',         v:'14',    d:'delistings and expiries' },
      { k:'Dark-activity vessels',        v:'2,140', d:'AIS gaps over 24h' },
      { k:'Sanctioned port calls',        v:'318',   d:'at designated ports' },
      { k:'STS with designated vessels',  v:'94',    d:'confirmed transfers' },
    ],
    byList: [
      { list:'OFAC SDN',           vessels:684, delta:'+41', color:'#b91c1c' },
      { list:'EU Consolidated',    vessels:412, delta:'+26', color:'#dc2626' },
      { list:'UK OFSI',            vessels:368, delta:'+19', color:'#ea580c' },
      { list:'UN 1718 / 2231',     vessels:96,  delta:'+0',  color:'#d97706' },
    ],
    note: 'Designated tonnage continues to expand, with 86 additions against 14 removals. Dark activity is concentrated in crude and product tankers over 18 years old.',
  },

  /* 9 — Geographic activity */
  geography: [
    { region:'East Asia',         calls:186400, pct:22.4, vessels:18240, casualties:71, tone:'#1d4ed8' },
    { region:'North Europe',      calls:142800, pct:17.2, vessels:14120, casualties:48, tone:'#0e7490' },
    { region:'South East Asia',   calls:128600, pct:15.5, vessels:12840, casualties:98, tone:'#b91c1c' },
    { region:'Mediterranean',     calls:96200,  pct:11.6, vessels:9640,  casualties:54, tone:'#d97706' },
    { region:'Middle East Gulf',  calls:74800,  pct:9.0,  vessels:6420,  casualties:41, tone:'#ea580c' },
    { region:'North America',     calls:68400,  pct:8.2,  vessels:7180,  casualties:29, tone:'#84cc16' },
    { region:'South America',     calls:54200,  pct:6.5,  vessels:5940,  casualties:24, tone:'#16a34a' },
    { region:'West Africa',       calls:42600,  pct:5.1,  vessels:4280,  casualties:34, tone:'#c2410c' },
    { region:'Rest of world',     calls:37000,  pct:4.5,  vessels:3960,  casualties:19, tone:'#64748b' },
  ],
  geoNote: 'East Asia handles nearly a quarter of all port calls but South East Asia carries the highest casualty count relative to traffic, at 76 casualties per 100,000 calls against a global 50.',

  /* 10 — Selected market trends */
  trends: [
    { tone:'red',   t:'Orderbook at 11.8% of fleet, the highest since 2010', d:'Container and LNG tonnage dominate the book. Delivery pressure through 2027\u201328 will accelerate the retirement of 20-plus year tonnage and shift the age profile materially.', m:'11.8%', dir:'up' },
    { tone:'amber', t:'Newbuild prices up 4.2% in the period', d:'Yard capacity remains tight into 2028, holding replacement values high and lifting insured values across the delivered fleet.', m:'+4.2%', dir:'up' },
    { tone:'amber', t:'Demolition price firm at $482 per ldt', d:'Firm scrap values are pulling older general cargo tonnage out of the fleet faster than expected, at 96 demolitions in the period against a twelve-month average of 78.', m:'$482', dir:'flat' },
    { tone:'red',   t:'Watchlisted-registry fleet growing fastest in percentage terms', d:'Cameroon and Togo added 68 vessels between them, a 12.4% expansion in two months, drawn almost entirely from tonnage over 20 years old leaving mainstream registries.', m:'+12.4%', dir:'up' },
    { tone:'amber', t:'Dark activity climbing with sanctioned-trade volume', d:'2,140 vessels recorded an AIS gap over 24 hours, up 8% in the period, concentrated in the crude and product tanker segments serving sanctioned exporters.', m:'+8%', dir:'up' },
    { tone:'green', t:'Average fleet age falling despite the ageing tail', d:'Deliveries outpaced demolitions more than two to one, bringing the mean down 0.1 years. The 0\u201310 year cohort now holds 34.3% of vessels and 43.8% of tonnage.', m:'-0.1 yrs', dir:'down' },
  ],

  findings: [
    { tone:'red',   t:'Global average risk score rises to 39.4', d:'Up 0.6 points as 320 vessels left the good band. High and severe bands grew by 212 vessels, concentrated in tanker tonnage over 18 years old on grey and watchlisted registries.', m:'+0.6' },
    { tone:'red',   t:'Casualties at a twelve-month high of 418', d:'Up 37 on July with seven total losses and 23 fatalities. South East Asia carries the highest casualty count relative to traffic of any region.', m:'+37' },
    { tone:'amber', t:'Designated tonnage expands by 86 vessels', d:'1,284 vessels now carry a list match, 2.1% of the fleet, and 94 confirmed ship-to-ship transfers involved a designated vessel in the period.', m:'+86' },
    { tone:'green', t:'Fleet renewal is running at more than two to one', d:'218 deliveries against 96 demolitions, with the orderbook at 11.8% of the fleet. Average age fell 0.1 years and the 0\u201310 year cohort now holds 43.8% of tonnage.', m:'2.3\u00d7' },
  ],
};
