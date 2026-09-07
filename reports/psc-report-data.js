/* Portfolio Sanctions & Compliance Report — demo data */
window.PSC = {
  meta: {
    portfolio: 'Global Hull & Machinery 2026',
    period: '01 Aug 2026 – 31 Aug 2026',
    previous: 'Jul 2026',
    preparedFor: 'Compliance & Sanctions Committee',
    generatedOn: '07 Sep 2026 13:24 UTC',
    reportId: 'PSC-2026-08-0188',
    owner: 'Paul Kiernan',
    lists: 'OFAC SDN, EU Consolidated, UK OFSI, UN 1718/2231, Internal watchlist',
  },

  summary: {
    vesselsScreened: 1284,
    confirmed: 3,
    newMatches: 2,
    portCalls: 6,
    aisDeclared: 9,
    stsEvents: 5,
    escalated: 5,
    openReviews: 9,
    clearedPct: 97.4,
    exposedValue: '$168m',
    lastFullScreen: '31 Aug 2026',
  },

  /* 1 — Confirmed sanctions information */
  confirmed: [
    { name:'STELLA MARIS', imo:'9411678', flag:'pa', type:'Crude Oil Tanker', basis:'Beneficial owner list match', list:'EU Consolidated', designated:'05 Aug 2026', entity:'Meridian Trust (BVI)', value:'$74m', cover:'Under review', action:'Notice of cancellation drafted' },
    { name:'CASPIAN DAWN', imo:'9204338', flag:'cm', type:'Crude Oil Tanker', basis:'STS with designated vessel',  list:'OFAC SDN',        designated:'12 Aug 2026', entity:'M/T ZARIA (SDN)',        value:'$58m', cover:'Under review', action:'Referred to committee' },
    { name:'MERIDIAN STAR',imo:'9298155', flag:'pa', type:'Bulk Carrier',     basis:'Designated port call',        list:'UK OFSI',         designated:'19 Aug 2026', entity:'Port of Sevastopol',     value:'$24m', cover:'Held with AP',  action:'AP raised, warranty served' },
  ],
  screening: [
    { list:'OFAC SDN',           screened:1284, matches:1, potential:2, status:'Escalated' },
    { list:'EU Consolidated',    screened:1284, matches:1, potential:1, status:'Escalated' },
    { list:'UK OFSI',            screened:1284, matches:1, potential:2, status:'Escalated' },
    { list:'UN 1718 / 2231',     screened:1284, matches:0, potential:0, status:'Clear' },
    { list:'Internal watchlist', screened:1284, matches:0, potential:4, status:'Monitoring' },
  ],
  confirmedNote: 'Three confirmed matches across the portfolio, representing $156m of insured value. Two are with the committee for a cover decision; the third is held subject to additional premium.',

  /* 2 — New sanctions matches */
  newMatches: [
    { name:'STELLA MARIS', imo:'9411678', on:'05 Aug 2026', list:'EU Consolidated', match:'Beneficial owner', conf:'Confirmed', detail:'Meridian Trust (BVI) added to the EU consolidated list; holding identified through a Marshall Islands intermediary.', status:'Escalated' },
    { name:'CASPIAN DAWN', imo:'9204338', on:'12 Aug 2026', list:'OFAC SDN',        match:'Counterparty',    conf:'Confirmed', detail:'Ship-to-ship transfer with M/T ZARIA, designated 14 Jul 2026, off Fujairah.', status:'Escalated' },
    { name:'ORION TRADER', imo:'9327451', on:'23 Aug 2026', list:'Internal',        match:'Charterer',       conf:'Potential', detail:'Disclosed charterer Levant Energy Trading DMCC registered in a monitored jurisdiction; no list match.', status:'Under review' },
    { name:'SIRIUS EXPRESS',imo:'9366720',on:'27 Aug 2026', list:'Internal',        match:'Counterparty',    conf:'Potential', detail:'Unreported STS with an unidentified counterparty; satellite imagery requested.', status:'Under review' },
  ],
  matchTrend: {
    months: ['Mar 26','Apr 26','May 26','Jun 26','Jul 26','Aug 26'],
    confirmed: [1, 0, 1, 1, 1, 2],
    potential: [3, 2, 4, 3, 3, 4],
  },

  /* 3 — Potential sanctioned port calls */
  portCalls: [
    { name:'MERIDIAN STAR', imo:'9298155', port:'Sevastopol',     country:'ru', arrived:'19 Aug 2026 15:32', dep:'20 Aug 2026 22:10', hours:31, basis:'Designated port', conf:'Confirmed', evidence:'AIS + berth imagery' },
    { name:'LEVANT PEARL',  imo:'9276441', port:'Kharg Island',   country:'ir', arrived:'08 Aug 2026 04:18', dep:'09 Aug 2026 11:44', hours:31, basis:'Designated terminal', conf:'Confirmed', evidence:'AIS + draught change' },
    { name:'BALTIC HERON',  imo:'9077431', port:'Novorossiysk',   country:'ru', arrived:'23 Aug 2026 19:44', dep:'26 Aug 2026 06:02', hours:58, basis:'Restricted cargo', conf:'Potential', evidence:'AIS only' },
    { name:'RED KITE',      imo:'9088217', port:'Bandar Abbas',   country:'ir', arrived:'14 Aug 2026 09:11', dep:'15 Aug 2026 03:26', hours:18, basis:'Designated port', conf:'Potential', evidence:'AIS gap on approach' },
    { name:'ANVIL TRADER',  imo:'9121887', port:'Latakia',        country:'sy', arrived:'02 Aug 2026 12:40', dep:'03 Aug 2026 08:15', hours:20, basis:'Designated port', conf:'Potential', evidence:'AIS + port agent record' },
    { name:'GULF VENTURE',  imo:'9188674', port:'Assaluyeh',      country:'ir', arrived:'29 Aug 2026 22:03', dep:'\u2014',            hours:14, basis:'Designated terminal', conf:'Potential', evidence:'AIS, in port at generation' },
  ],
  portNote: 'Two calls are confirmed against designated ports or terminals; four remain potential pending berth-level evidence. Confirmed calls trigger the sanctions exclusion review under the facility wording.',

  /* 4 — AIS-declared sanctioned port visits / destinations */
  aisDeclared: [
    { name:'MERIDIAN STAR',  imo:'9298155', declared:'SEVASTOPOL',   on:'17 Aug 2026', arrived:true,  actual:'Sevastopol',   note:'Declared destination matched the actual call.' },
    { name:'LEVANT PEARL',   imo:'9276441', declared:'KHARG',        on:'06 Aug 2026', arrived:true,  actual:'Kharg Island', note:'Declared two days before arrival.' },
    { name:'RED KITE',       imo:'9088217', declared:'BND ABBAS',    on:'12 Aug 2026', arrived:true,  actual:'Bandar Abbas', note:'Abbreviated declaration; AIS gap on final approach.' },
    { name:'ANVIL TRADER',   imo:'9121887', declared:'LATAKIA',      on:'31 Jul 2026', arrived:true,  actual:'Latakia',      note:'Declared before the reporting period opened.' },
    { name:'GULF VENTURE',   imo:'9188674', declared:'ASSALUYEH',    on:'27 Aug 2026', arrived:true,  actual:'Assaluyeh',    note:'Currently in port at generation.' },
    { name:'SIRIUS EXPRESS', imo:'9366720', declared:'FOR ORDERS',   on:'25 Aug 2026', arrived:false, actual:'\u2014',        note:'Destination withheld for four days around an STS event.' },
    { name:'ORION TRADER',   imo:'9327451', declared:'KHARG',        on:'11 Aug 2026', arrived:false, actual:'Ras Tanura',   note:'Declaration changed 31 hours later; no designated call made.' },
    { name:'BALTIC HERON',   imo:'9077431', declared:'NOVOROSSIYSK', on:'21 Aug 2026', arrived:true,  actual:'Novorossiysk', note:'Declared destination matched the actual call.' },
    { name:'CASPIAN DAWN',   imo:'9204338', declared:'FOR ORDERS',   on:'10 Aug 2026', arrived:false, actual:'Fujairah',     note:'Withheld destination immediately before the OFAC STS event.' },
  ],
  aisNote: 'Nine vessels transmitted a destination naming a designated port, or withheld their destination in circumstances suggesting a designated call. Six were followed by an actual call; three were not.',

  /* 5 — STS activity involving sanctioned vessels */
  sts: [
    { date:'12 Aug 2026', name:'CASPIAN DAWN',   imo:'9204338', cpty:'M/T ZARIA',        cptyImo:'9455890', cptyStatus:'OFAC SDN designated', loc:'Off Fujairah',      dur:'7h 20m', conf:'Confirmed', evidence:'AIS pairing + satellite imagery' },
    { date:'27 Aug 2026', name:'SIRIUS EXPRESS', imo:'9366720', cpty:'Unidentified',     cptyImo:'\u2014',   cptyStatus:'Unknown',             loc:'Off Fujairah',      dur:'5h 40m', conf:'Potential', evidence:'AIS gap on both sides, imagery requested' },
    { date:'18 Aug 2026', name:'LEVANT PEARL',   imo:'9276441', cpty:'M/T BLUE HORIZON', cptyImo:'9188221', cptyStatus:'Not designated',       loc:'Gulf of Oman',      dur:'9h 10m', conf:'Confirmed', evidence:'AIS pairing, both vessels transmitting' },
    { date:'05 Aug 2026', name:'RED KITE',       imo:'9088217', cpty:'M/T ARAS 3',       cptyImo:'9077108', cptyStatus:'Internal watchlist',   loc:'Southern Red Sea', dur:'6h 05m', conf:'Potential', evidence:'AIS pairing, one-sided reporting' },
    { date:'30 Aug 2026', name:'ORION TRADER',   imo:'9327451', cpty:'M/T KAVIR',        cptyImo:'9302446', cptyStatus:'OFAC SDN designated',  loc:'Gulf of Oman',      dur:'4h 15m', conf:'Potential', evidence:'Proximity only, no draught change' },
  ],
  stsNote: 'One STS transfer with a designated vessel is confirmed and two more are potential, including one with a designated counterparty on proximity evidence alone. Confirmed transfers with a designated vessel are a sanctions exclusion event.',

  findings: [
    { tone:'red',   t:'Three confirmed sanctions matches, two new this period', d:'STELLA MARIS (EU beneficial owner) and CASPIAN DAWN (OFAC STS counterparty) were confirmed in the period, joining MERIDIAN STAR\u2019s designated port call. Together $156m of insured value is under review.', m:'3 confirmed' },
    { tone:'red',   t:'One confirmed STS transfer with a designated vessel', d:'CASPIAN DAWN transferred cargo with M/T ZARIA off Fujairah on 12 Aug, seven hours alongside with imagery confirmation. This is an exclusion event under the facility wording.', m:'12 Aug' },
    { tone:'amber', t:'Six potential designated port calls await berth-level evidence', d:'Two are confirmed on imagery or draught change; the remaining four rest on AIS alone. Three vessels withheld their destination immediately beforehand.', m:'6 calls' },
    { tone:'green', t:'97.4% of the portfolio cleared without a finding', d:'1,251 of 1,284 vessels screened clean against all five list sets, re-screened in full on 31 Aug. No UN 1718 or 2231 matches anywhere in the book.', m:'1,251 clear' },
  ],
};
