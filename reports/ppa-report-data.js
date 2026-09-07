/* Peer & Prospect Analysis Report — demo data */
window.PPA = {
  meta: {
    subject: 'Anadolu Denizcilik AS',
    subjectType: 'Prospect — owner / operator',
    hq: 'Istanbul, Türkiye',
    imoNo: '5771384',
    period: '01 Sep 2025 – 31 Aug 2026',
    window: 'Rolling 12 months',
    previous: 'Jul 2026',
    preparedFor: 'New Business & Underwriting',
    generatedOn: '07 Sep 2026 14:58 UTC',
    reportId: 'PPA-2026-08-0116',
    owner: 'Paul Kiernan',
    peerName: 'East Mediterranean and Black Sea dry cargo operators',
    peerCount: 14,
  },

  summary: {
    vessels: 42,
    peerMedianVessels: 56,
    avgScore: 46.8, avgScoreDelta: '+1.2',
    peerScore: 41.9,
    globalScore: 39.4,
    percentile: 68,
    avgAge: 15.6, peerAge: 14.1,
    casualties: 5, casRate: 2.38, peerCasRate: 1.64,
    complianceFlags: 2,
    insurableValue: '$684m',
    verdict: 'Acceptable with conditions',
  },

  /* 1 — Real World Risk Score profile */
  scoreProfile: {
    distribution: [
      { band:'Good',      range:'0–25',   n:4,  pct:9.5,  peerPct:19.4, color:'#16a34a' },
      { band:'Average',   range:'26–50',  n:19, pct:45.2, peerPct:48.6, color:'#84cc16' },
      { band:'Below avg', range:'51–60',  n:12, pct:28.6, peerPct:21.2, color:'#d97706' },
      { band:'High',      range:'61–80',  n:6,  pct:14.3, peerPct:9.4,  color:'#ea580c' },
      { band:'Severe',    range:'81–100', n:1,  pct:2.4,  peerPct:1.4,  color:'#b91c1c' },
    ],
    factors: [
      { k:'Vessel condition & class', v:52, peer:46, w:'25%' },
      { k:'Behavioural / AIS',        v:44, peer:38, w:'20%' },
      { k:'Compliance & sanctions',   v:38, peer:34, w:'20%' },
      { k:'Casualty history',         v:58, peer:44, w:'15%' },
      { k:'Ownership & management',   v:41, peer:42, w:'10%' },
      { k:'Flag & registry',          v:47, peer:45, w:'10%' },
    ],
    trend: {
      quarters: ['Q4 24','Q1 25','Q2 25','Q3 25','Q4 25','Q1 26','Q2 26','Q3 26'],
      subject: [43.1, 43.8, 44.2, 44.9, 45.4, 45.8, 46.1, 46.8],
      peer:    [41.2, 41.4, 41.3, 41.6, 41.5, 41.7, 41.8, 41.9],
    },
    note: 'The prospect scores 4.9 points above its peer median and the gap has widened every quarter for two years, driven by casualty history and vessel condition.',
  },

  /* 2 — Fleet size */
  fleetSize: {
    rows: [
      { k:'Vessels owned or operated', subject:'42',     peer:'56',     global:'—' },
      { k:'Total tonnage',             subject:'1.08m GT',peer:'1.62m GT',global:'—' },
      { k:'Insurable value',           subject:'$684m',  peer:'$912m',  global:'—' },
      { k:'Average vessel size',       subject:'25,700 GT',peer:'28,900 GT',global:'32,100 GT' },
      { k:'Fleet growth (12m)',        subject:'+6',     peer:'+2',     global:'+2.6%' },
      { k:'Vessels added / removed',   subject:'8 / 2',  peer:'5 / 3',  global:'—' },
    ],
    growth: {
      quarters: ['Q4 24','Q1 25','Q2 25','Q3 25','Q4 25','Q1 26','Q2 26','Q3 26'],
      n: [34, 35, 36, 36, 38, 39, 41, 42],
    },
    note: 'The prospect is smaller than the peer median but growing three times faster, having added eight vessels in twelve months against two removals.',
  },

  /* 3 — Vessel type */
  byType: [
    { type:'Bulk Carrier',    n:16, pct:38.1, peerPct:34.2, avgScore:44.2, peerScore:40.1 },
    { type:'General Cargo',   n:11, pct:26.2, peerPct:22.8, avgScore:53.6, peerScore:47.4 },
    { type:'Product Tanker',  n:8,  pct:19.0, peerPct:21.6, avgScore:48.1, peerScore:43.8 },
    { type:'Container Ship',  n:5,  pct:11.9, peerPct:16.4, avgScore:36.4, peerScore:35.2 },
    { type:'Chemical Tanker', n:2,  pct:4.8,  peerPct:5.0,  avgScore:41.0, peerScore:41.6 },
  ],
  typeNote: 'The type mix sits close to the peer group, but the prospect scores worse than peers in four of the five segments, with general cargo the widest gap at 6.2 points.',

  /* 4 — Vessel age */
  byAge: [
    { band:'0–5 yrs',   n:3,  pct:7.1,  peerPct:13.6, avgScore:28.4 },
    { band:'6–10 yrs',  n:7,  pct:16.7, peerPct:19.8, avgScore:34.6 },
    { band:'11–15 yrs', n:11, pct:26.2, peerPct:24.4, avgScore:42.8 },
    { band:'16–20 yrs', n:12, pct:28.6, peerPct:23.1, avgScore:52.4 },
    { band:'21–25 yrs', n:7,  pct:16.7, peerPct:14.2, avgScore:61.2 },
    { band:'26+ yrs',   n:2,  pct:4.8,  peerPct:4.9,  avgScore:71.5 },
  ],
  ageNote: 'Average age is 15.6 years against a peer 14.1. The prospect is under-weight in the newest two cohorts and over-weight at 16–25 years, which is where its score deteriorates fastest.',

  /* 5 — Geographic activity */
  geography: {
    regions: [
      { region:'Black Sea',            calls:186, pct:31.2, listed:true,  peerPct:24.6, days:842 },
      { region:'East Mediterranean',   calls:148, pct:24.8, listed:false, peerPct:28.4, days:694 },
      { region:'Sea of Marmara',       calls:96,  pct:16.1, listed:false, peerPct:14.2, days:318 },
      { region:'North Europe',         calls:74,  pct:12.4, listed:false, peerPct:18.8, days:412 },
      { region:'Middle East Gulf',     calls:52,  pct:8.7,  listed:false, peerPct:9.6,  days:286 },
      { region:'Southern Red Sea',     calls:41,  pct:6.9,  listed:true,  peerPct:4.4,  days:174 },
    ],
    ports: [
      { port:'Novorossiysk', country:'ru', calls:64, note:'Sanctions-sensitive; grain and steel liftings.' },
      { port:'Constanta',    country:'ro', calls:48, note:'Principal Black Sea discharge port.' },
      { port:'Istanbul',     country:'tr', calls:41, note:'Bunkering, crew and stores.' },
      { port:'Odesa',        country:'ua', calls:26, note:'Grain corridor calls; war-risk exposed.' },
      { port:'Alexandria',   country:'eg', calls:22, note:'East Mediterranean discharge.' },
    ],
    note: 'Black Sea activity is 6.6 points above the peer group and includes 26 calls at Odesa. Two of the six regions used are Joint War Committee listed, against one for the median peer.',
  },

  /* 6 — Casualty profile */
  casualties: {
    summary: { total:5, serious:2, rate:2.38, peerRate:1.64, globalRate:0.68, reserve:'$5.4m', affectedPct:11.9, peerAffectedPct:9.2 },
    events: [
      { date:'11 Nov 2024', name:'ANATOLIA STAR',   imo:'9498716', type:'Machinery damage', sev:'Moderate', loc:'Black Sea',        reserve:'$0.7m', status:'Closed' },
      { date:'26 Mar 2025', name:'MARMARA TRADER',  imo:'9312874', type:'Contact',          sev:'Minor',    loc:'Istanbul Strait',  reserve:'$0.3m', status:'Closed' },
      { date:'04 Sep 2025', name:'ANADOLU PRIDE',   imo:'9188112', type:'Grounding',        sev:'Serious',  loc:'Sea of Azov',      reserve:'$2.1m', status:'Settled' },
      { date:'19 Feb 2026', name:'BOSPHORUS DAWN',  imo:'9276008', type:'Cargo shift',      sev:'Moderate', loc:'Black Sea',        reserve:'$0.6m', status:'Closed' },
      { date:'23 Jul 2026', name:'ANATOLIA STAR',   imo:'9498716', type:'Fire / explosion', sev:'Serious',  loc:'Constanta',        reserve:'$1.7m', status:'Claim open' },
    ],
    note: 'Five casualties over twelve months gives 2.38 per 100 vessels per year against a peer 1.64. ANATOLIA STAR appears twice, and both serious events occurred in the Black Sea region.',
  },

  /* 7 — Sanctions / compliance profile */
  compliance: {
    indicators: [
      { k:'Confirmed list matches',      subject:0,  peer:0,  tone:'green' },
      { k:'Potential indicators open',   subject:2,  peer:1,  tone:'amber' },
      { k:'Sanctioned port calls (12m)', subject:0,  peer:0,  tone:'green' },
      { k:'AIS gaps over 6h',            subject:18, peer:11, tone:'amber' },
      { k:'STS transfers (12m)',         subject:3,  peer:4,  tone:'green' },
      { k:'Watchlisted-flag vessels',    subject:0,  peer:2,  tone:'green' },
    ],
    events: [
      { on:'19 Jun 2026', subject:'Beneficial owner jurisdiction', list:'Internal', conf:'Potential', detail:'Ultimate holder registered in a jurisdiction under enhanced monitoring since March 2026.', status:'Monitoring' },
      { on:'02 Apr 2026', subject:'Novorossiysk call frequency',   list:'Internal', conf:'Potential', detail:'64 calls in twelve months at a sanctions-sensitive port; cargoes documented as grain and steel.', status:'Monitoring' },
    ],
    note: 'No confirmed list matches anywhere in the fleet or its ownership chain. Two internal indicators are open, both monitoring items rather than findings, and the fleet holds no watchlisted-flag tonnage.',
  },

  findings: [
    { tone:'amber', t:'Scores 4.9 points above the peer median and widening', d:'46.8 against a peer 41.9, placing the prospect in the 68th percentile of its comparison group. The gap has widened every quarter since Q4 2024, driven by casualty history and vessel condition.', m:'68th' },
    { tone:'amber', t:'Casualty rate 45% above peers, concentrated in the Black Sea', d:'2.38 per 100 vessels per year against a peer 1.64, with both serious events and one repeat-offender vessel. $5.4m reserved across five casualties.', m:'+45%' },
    { tone:'amber', t:'Black Sea exposure well above the peer group', d:'31.2% of calls against a peer 24.6%, including 26 Odesa calls. Two of six regions used are JWC listed, against one for the median peer.', m:'31.2%' },
    { tone:'green', t:'Compliance record is clean and better than peers on most measures', d:'No confirmed list matches, no sanctioned port calls and no watchlisted-flag tonnage. Two internal monitoring items are open, both jurisdiction or frequency observations rather than findings.', m:'0 matches' },
  ],
};
