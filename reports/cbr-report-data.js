/* Casualty Benchmark Report — demo data */
window.CBR = {
  meta: {
    fleet: 'Nordwind Shipping Group',
    period: '01 Sep 2024 – 31 Aug 2026',
    window: 'Rolling 24 months',
    previous: 'Jul 2026',
    preparedFor: 'Marine Underwriting Committee',
    generatedOn: '07 Sep 2026 12:14 UTC',
    reportId: 'CBR-2026-08-0127',
    owner: 'Paul Kiernan',
    basis: 'Casualties per 100 vessels per year, normalised for fleet size and exposure',
  },

  summary: {
    fleetVessels: 64,
    casualties: 19, casualtiesDelta: '+3',
    rate: 1.48, rateDelta: '+0.23',
    peerRate: 1.12,
    globalRate: 0.68,
    vsPeer: '+32%',
    vsGlobal: '+118%',
    affectedPct: 21.9,
    peerAffectedPct: 17.4,
    serious: 6,
    reserve: '$14.8m',
    percentile: 74,
    verdict: 'Above peer group',
  },

  /* 1 — Selected fleet casualty history */
  history: {
    quarters: ['Q4 24','Q1 25','Q2 25','Q3 25','Q4 25','Q1 26','Q2 26','Q3 26'],
    fleet: [2, 1, 3, 2, 3, 2, 3, 3],
    peer:  [1.6, 1.8, 1.7, 2.0, 1.9, 1.8, 2.1, 2.2],
    events: [
      { date:'14 Nov 2024', name:'NORDIC FALCON', imo:'9455102', type:'Machinery damage', sev:'Moderate', loc:'North Sea',          reserve:'$0.8m', status:'Closed' },
      { date:'22 Mar 2025', name:'BALTIC HERON',  imo:'9077431', type:'Contact',          sev:'Minor',    loc:'Kiel Canal',         reserve:'$0.3m', status:'Closed' },
      { date:'08 Jun 2025', name:'NORDIC FALCON', imo:'9455102', type:'Grounding',        sev:'Serious',  loc:'Gulf of Bothnia',    reserve:'$2.4m', status:'Settled' },
      { date:'19 Sep 2025', name:'KESTREL BAY',   imo:'9433870', type:'Cargo incident',   sev:'Moderate', loc:'Port of Santos',     reserve:'$0.6m', status:'Closed' },
      { date:'03 Dec 2025', name:'HELLENIC WIND', imo:'9271044', type:'Machinery damage', sev:'Moderate', loc:'Off Gibraltar',      reserve:'$1.1m', status:'Settled' },
      { date:'27 Feb 2026', name:'ADRIATIC ROSE', imo:'9302188', type:'Fire / explosion', sev:'Serious',  loc:'Piraeus anchorage',  reserve:'$3.2m', status:'Claim open' },
      { date:'11 Aug 2026', name:'NORDIC FALCON', imo:'9455102', type:'Grounding',        sev:'Serious',  loc:'Gulf of Bothnia',    reserve:'$2.8m', status:'Survey held' },
      { date:'27 Aug 2026', name:'KESTREL BAY',   imo:'9433870', type:'Fire / explosion', sev:'Moderate', loc:'Port of Santos',     reserve:'$0.9m', status:'Notified' },
    ],
    note: 'Eight of the nineteen casualties in the window are shown; the remainder were minor events with reserves below $0.25m.',
  },

  /* 2 — Comparable fleet / global population */
  population: {
    peerName: 'North European dry bulk and general cargo managers',
    peerCriteria: [
      { k:'Vessel types',       fleet:'Bulk carrier, general cargo, product tanker', peer:'Same mix ±10% by count' },
      { k:'Average age',        fleet:'13.8 years',       peer:'12.4 – 15.2 years' },
      { k:'Average size',       fleet:'34,200 dwt',       peer:'28,000 – 42,000 dwt' },
      { k:'Trading area',       fleet:'North Europe, Baltic, Atlantic', peer:'Same primary areas' },
      { k:'Flag standing',      fleet:'All Paris MoU white-list', peer:'White-list only' },
      { k:'Managed fleet size', fleet:'64 vessels',       peer:'40 – 120 vessels' },
    ],
    cohorts: [
      { k:'Selected fleet',        vessels:64,     fleets:1,   casualties:19,    rate:1.48, color:'#b91c1c' },
      { k:'Peer group',            vessels:1148,   fleets:17,  casualties:257,   rate:1.12, color:'#d97706' },
      { k:'Wider segment',         vessels:9840,   fleets:'—', casualties:1712,  rate:0.87, color:'#1d4ed8' },
      { k:'Global merchant fleet', vessels:61400,  fleets:'—', casualties:8350,  rate:0.68, color:'#16a34a' },
    ],
  },

  /* 3 — Casualties per vessel */
  perVessel: {
    rows: [
      { k:'Casualties per 100 vessels per year', fleet:'1.48', peer:'1.12', global:'0.68', verdict:'worse' },
      { k:'Casualties per vessel over 24 months',fleet:'0.30', peer:'0.22', global:'0.14', verdict:'worse' },
      { k:'Serious casualties per 100 vessels',  fleet:'0.47', peer:'0.31', global:'0.16', verdict:'worse' },
      { k:'Reserve per vessel',                  fleet:'$231k',peer:'$164k',global:'$98k', verdict:'worse' },
      { k:'Mean days to claim closure',          fleet:'118',  peer:'147',  global:'163',  verdict:'better' },
      { k:'Repeat-event vessels per 100',        fleet:'4.69', peer:'3.22', global:'1.94', verdict:'worse' },
    ],
    repeat: [
      { name:'NORDIC FALCON', imo:'9455102', events:4, reserve:'$6.5m', types:'Grounding ×2, machinery ×2' },
      { name:'KESTREL BAY',   imo:'9433870', events:3, reserve:'$2.1m', types:'Fire, cargo ×2' },
      { name:'BALTIC HERON',  imo:'9077431', events:2, reserve:'$0.7m', types:'Contact ×2' },
    ],
  },

  /* 4 — Percentage of fleet affected */
  affected: {
    fleet:  { affected:14, total:64,    pct:21.9 },
    peer:   { affected:200, total:1148, pct:17.4 },
    global: { affected:6890, total:61400,pct:11.2 },
    bySeverity: [
      { sev:'Serious or worse', fleet:4.7, peer:3.1, global:1.6 },
      { sev:'Moderate',         fleet:12.5,peer:9.4, global:6.1 },
      { sev:'Minor only',       fleet:4.7, peer:4.9, global:3.5 },
    ],
    note: 'Just over one vessel in five in the selected fleet recorded a casualty in the window, against roughly one in six across the peer group and one in nine globally.',
  },

  /* 5 — Casualty types */
  types: [
    { type:'Machinery damage',    fleet:7, fleetPct:36.8, peerPct:31.6, globalPct:31.6, reserve:'$4.1m' },
    { type:'Grounding',           fleet:3, fleetPct:15.8, peerPct:11.2, globalPct:13.9, reserve:'$5.2m' },
    { type:'Fire / explosion',    fleet:3, fleetPct:15.8, peerPct:8.9,  globalPct:9.8,  reserve:'$4.1m' },
    { type:'Contact',             fleet:3, fleetPct:15.8, peerPct:14.8, globalPct:9.4,  reserve:'$0.7m' },
    { type:'Cargo incident',      fleet:2, fleetPct:10.5, peerPct:12.1, globalPct:8.1,  reserve:'$0.6m' },
    { type:'Hull / structural',   fleet:1, fleetPct:5.3,  peerPct:10.9, globalPct:9.3,  reserve:'$0.1m' },
    { type:'Collision',           fleet:0, fleetPct:0,    peerPct:6.6,  globalPct:8.3,  reserve:'\u2014' },
  ],
  typeNote: 'Grounding and fire are the fleet\u2019s clear outliers, running at roughly 1.4× and 1.8× the peer share respectively, and together account for $9.3m of the $14.8m reserved.',

  /* 6 — Vessel age comparison */
  age: [
    { band:'0–5 yrs',   fleetVessels:8,  fleetCas:0, fleetRate:0,    peerRate:0.34, globalRate:0.31 },
    { band:'6–10 yrs',  fleetVessels:14, fleetCas:2, fleetRate:0.71, peerRate:0.46, globalRate:0.39 },
    { band:'11–15 yrs', fleetVessels:19, fleetCas:5, fleetRate:1.32, peerRate:0.94, globalRate:0.57 },
    { band:'16–20 yrs', fleetVessels:13, fleetCas:6, fleetRate:2.31, peerRate:1.42, globalRate:0.81 },
    { band:'21–25 yrs', fleetVessels:8,  fleetCas:4, fleetRate:2.50, peerRate:1.88, globalRate:1.05 },
    { band:'26+ yrs',   fleetVessels:2,  fleetCas:2, fleetRate:5.00, peerRate:2.14, globalRate:1.13 },
  ],
  ageNote: 'The fleet\u2019s age profile is close to the peer average, so age alone does not explain the gap: at every band above ten years the fleet records a higher rate than peers of the same age.',
  ageSummary: {
    fleetAvgAge: 13.8, peerAvgAge: 13.4, globalAvgAge: 14.6,
    ageAdjustedRate: 1.31, ageAdjustedNote: 'fleet rate re-weighted to the peer age profile',
  },

  /* 7 — Relevant peer comparison */
  peers: [
    { name:'Selected fleet \u2014 Nordwind Shipping Group', vessels:64,  rate:1.48, affected:21.9, serious:6, reserve:'$231k', rank:13, self:true },
    { name:'Peer A \u2014 Baltic Carriers AS',              vessels:78,  rate:1.92, affected:24.4, serious:9, reserve:'$288k', rank:16 },
    { name:'Peer B \u2014 Hanseatic Bulk GmbH',             vessels:112, rate:1.79, affected:23.2, serious:11,reserve:'$264k', rank:15 },
    { name:'Peer C \u2014 Northline Marine',                vessels:52,  rate:1.54, affected:19.2, serious:4, reserve:'$208k', rank:14 },
    { name:'Peer group median',                            vessels:68,  rate:1.12, affected:17.4, serious:3, reserve:'$164k', rank:9, median:true },
    { name:'Peer D \u2014 Skagen Shipping',                 vessels:94,  rate:0.96, affected:14.9, serious:3, reserve:'$142k', rank:7 },
    { name:'Peer E \u2014 Meridian Ship Management',        vessels:91,  rate:0.88, affected:13.2, serious:2, reserve:'$121k', rank:5 },
    { name:'Peer F \u2014 Northern Marine Tech',            vessels:312, rate:0.64, affected:9.6,  serious:1, reserve:'$88k',  rank:2 },
  ],
  peerNote: 'Seventeen managers meet the comparability criteria; the six most relevant by fleet size and trading pattern are shown. Rank is out of 17, lowest casualty rate first.',

  findings: [
    { tone:'red',   t:'Fleet casualty rate 32% above the peer group', d:'1.48 casualties per 100 vessels per year against a peer median of 1.12 and a global rate of 0.68, placing the fleet in the 74th percentile of its comparison group.', m:'+32%' },
    { tone:'red',   t:'One vessel drives a fifth of all casualties', d:'NORDIC FALCON records four events and $6.5m of the $14.8m reserved, including two groundings in the same waters 26 months apart.', m:'4 events' },
    { tone:'amber', t:'Grounding and fire are the outlier categories', d:'Grounding runs at 15.8% of fleet casualties against 11.2% for peers, and fire at 15.8% against 8.9% — together $9.3m of reserve.', m:'1.8\u00d7 peer' },
    { tone:'green', t:'Age profile does not explain the gap, and claims close faster', d:'Re-weighted to the peer age profile the fleet rate is 1.31, still above the 1.12 median. Claims close in 118 days against a peer 147.', m:'118 days' },
  ],
};
