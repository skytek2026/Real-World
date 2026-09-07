/* Sanctions Activity & Association Report — demo data */
window.SAA = {
  meta: {
    subject: 'Levant Maritime Holding',
    subjectType: 'Owning group',
    hq: 'Nicosia, Cyprus',
    imoNo: '6114208',
    period: '01 Sep 2025 – 31 Aug 2026',
    window: 'Rolling 12 months',
    previous: 'Jul 2026',
    preparedFor: 'Compliance & Sanctions Committee',
    generatedOn: '07 Sep 2026 13:51 UTC',
    reportId: 'SAA-2026-08-0093',
    owner: 'Paul Kiernan',
    lists: 'OFAC SDN, EU Consolidated, UK OFSI, UN 1718/2231, Internal watchlist',
  },

  summary: {
    vessels: 31,
    inPortfolio: 4,
    confirmed: 2,
    newMatches: 3,
    portCalls: 8,
    aisDeclared: 11,
    stsEvents: 7,
    linkedEntities: 14,
    designatedLinks: 3,
    exposedValue: '$183m',
    verdict: 'Adverse — restrict',
  },

  /* 1 — Confirmed sanctions information */
  confirmed: [
    { subject:'Meridian Trust (BVI)', kind:'Beneficial owner', list:'EU Consolidated', designated:'05 Aug 2026', link:'Holds 62% of the group through a Marshall Islands intermediary', vessels:6, status:'Confirmed' },
    { subject:'A. Farsani',           kind:'Director',         list:'OFAC SDN',        designated:'21 Mar 2026', link:'Director of two group subsidiaries; resigned 04 Apr 2026',      vessels:3, status:'Confirmed' },
    { subject:'M/T ZARIA',            kind:'Counterparty vessel', list:'OFAC SDN',     designated:'14 Jul 2026', link:'STS counterparty to CASPIAN DAWN on 12 Aug 2026',               vessels:1, status:'Confirmed' },
  ],
  groupVessels: [
    { name:'CASPIAN DAWN',  imo:'9204338', flag:'cm', type:'Crude Oil Tanker', score:79, inBook:true,  value:'$58m', ind:'OFAC STS counterparty' },
    { name:'LEVANT PEARL',  imo:'9276441', flag:'cm', type:'Crude Oil Tanker', score:73, inBook:true,  value:'$51m', ind:'Designated port call' },
    { name:'SIRIUS EXPRESS',imo:'9366720', flag:'cm', type:'Product Tanker',   score:64, inBook:true,  value:'$37m', ind:'Unreported STS' },
    { name:'ORION CREST',   imo:'9042118', flag:'cm', type:'Crude Oil Tanker', score:86, inBook:true,  value:'$44m', ind:'EU beneficial owner match' },
    { name:'LEVANT DAWN',   imo:'9077640', flag:'tg', type:'Product Tanker',   score:82, inBook:false, value:'\u2014', ind:'Registry watchlist' },
    { name:'ZAGROS STAR',   imo:'9188445', flag:'cm', type:'Product Tanker',   score:78, inBook:false, value:'\u2014', ind:'AIS gaps, 6 in 12m' },
    { name:'LEVANT VOYAGER',imo:'9221876', flag:'vc', type:'Crude Oil Tanker', score:74, inBook:false, value:'\u2014', ind:'Designated port call' },
  ],
  confirmedNote: 'Two confirmed list matches attach to the group itself \u2014 its majority beneficial owner and a former director \u2014 and a third to a counterparty vessel. Four of the 31 group vessels are on our books, carrying $190m of insured value.',

  /* 2 — New sanctions matches */
  newMatches: [
    { on:'05 Aug 2026', subject:'Meridian Trust (BVI)', kind:'Beneficial owner',    list:'EU Consolidated', conf:'Confirmed', detail:'Added to the EU consolidated list; holding traced through Aurora Holdings (MHL).', status:'Escalated' },
    { on:'12 Aug 2026', subject:'M/T ZARIA',            kind:'Counterparty vessel', list:'OFAC SDN',        conf:'Confirmed', detail:'STS with CASPIAN DAWN off Fujairah, seven hours alongside with imagery.', status:'Escalated' },
    { on:'27 Aug 2026', subject:'Unidentified vessel',  kind:'Counterparty vessel', list:'Internal',        conf:'Potential', detail:'STS with SIRIUS EXPRESS; both sides dark, imagery tasked.', status:'Under review' },
    { on:'19 Jun 2026', subject:'Aurora Holdings (MHL)',kind:'Intermediate holder', list:'Internal',        conf:'Potential', detail:'Jurisdiction and directorship overlap with a designated entity.', status:'Monitoring' },
  ],

  /* 3 — Potential sanctioned port calls */
  portCalls: [
    { name:'LEVANT PEARL',   imo:'9276441', port:'Kharg Island', country:'ir', arrived:'08 Aug 2026', hours:31, basis:'Designated terminal', conf:'Confirmed', evidence:'AIS + draught change' },
    { name:'LEVANT VOYAGER',imo:'9221876', port:'Kharg Island', country:'ir', arrived:'22 Jun 2026', hours:28, basis:'Designated terminal', conf:'Confirmed', evidence:'AIS + berth imagery' },
    { name:'ZAGROS STAR',    imo:'9188445', port:'Bandar Abbas',country:'ir', arrived:'14 May 2026', hours:22, basis:'Designated port',     conf:'Confirmed', evidence:'AIS + port agent record' },
    { name:'CASPIAN DAWN',   imo:'9204338', port:'Assaluyeh',   country:'ir', arrived:'03 Mar 2026', hours:19, basis:'Designated terminal', conf:'Potential', evidence:'AIS only' },
    { name:'LEVANT DAWN',    imo:'9077640', port:'Latakia',     country:'sy', arrived:'27 Jan 2026', hours:26, basis:'Designated port',     conf:'Potential', evidence:'AIS, gap on departure' },
    { name:'SIRIUS EXPRESS', imo:'9366720', port:'Novorossiysk',country:'ru', arrived:'11 Dec 2025', hours:41, basis:'Restricted cargo',    conf:'Potential', evidence:'AIS only' },
    { name:'ORION CREST',    imo:'9042118', port:'Kharg Island',country:'ir', arrived:'09 Nov 2025', hours:33, basis:'Designated terminal', conf:'Confirmed', evidence:'AIS + draught change' },
    { name:'LEVANT PEARL',   imo:'9276441', port:'Sevastopol',  country:'ru', arrived:'18 Oct 2025', hours:24, basis:'Designated port',     conf:'Potential', evidence:'AIS, one-sided' },
  ],
  portNote: 'Eight calls at designated ports or terminals across the group in twelve months, four of them confirmed on imagery or draught change. Kharg Island alone accounts for four calls by three different vessels.',

  /* 4 — AIS-declared sanctioned port visits / destinations */
  aisDeclared: [
    { name:'LEVANT PEARL',   imo:'9276441', declared:'KHARG',        on:'06 Aug 2026', arrived:true,  pattern:'Declared openly, call followed' },
    { name:'LEVANT VOYAGER',imo:'9221876', declared:'KHARG',        on:'20 Jun 2026', arrived:true,  pattern:'Declared openly, call followed' },
    { name:'CASPIAN DAWN',   imo:'9204338', declared:'FOR ORDERS',   on:'10 Aug 2026', arrived:false, pattern:'Withheld around an OFAC STS event' },
    { name:'SIRIUS EXPRESS', imo:'9366720', declared:'FOR ORDERS',   on:'25 Aug 2026', arrived:false, pattern:'Withheld around an unreported STS' },
    { name:'ZAGROS STAR',    imo:'9188445', declared:'BND ABBAS',    on:'12 May 2026', arrived:true,  pattern:'Abbreviated declaration, AIS gap on approach' },
    { name:'ORION CREST',    imo:'9042118', declared:'FOR ORDERS',   on:'06 Nov 2025', arrived:true,  pattern:'Withheld, then designated call made' },
    { name:'LEVANT DAWN',    imo:'9077640', declared:'LATAKIA',      on:'25 Jan 2026', arrived:true,  pattern:'Declared openly, call followed' },
    { name:'CASPIAN DAWN',   imo:'9204338', declared:'ASSALUYEH',    on:'01 Mar 2026', arrived:true,  pattern:'Declared openly, call followed' },
    { name:'LEVANT PEARL',   imo:'9276441', declared:'FOR ORDERS',   on:'15 Oct 2025', arrived:true,  pattern:'Withheld, then designated call made' },
    { name:'SIRIUS EXPRESS', imo:'9366720', declared:'NOVOROSSIYSK', on:'09 Dec 2025', arrived:true,  pattern:'Declared openly, call followed' },
    { name:'ZAGROS STAR',    imo:'9188445', declared:'FOR ORDERS',   on:'18 Feb 2026', arrived:false, pattern:'Withheld for six days, no call identified' },
  ],
  aisPatterns: [
    { k:'Declared openly, call followed', n:6, tone:'amber' },
    { k:'Withheld, then designated call', n:3, tone:'red' },
    { k:'Withheld around an STS event',   n:2, tone:'red' },
  ],
  aisNote: 'Five of the eleven destination events involved a withheld destination, and in every case the withheld window brackets either a designated call or a ship-to-ship transfer.',

  /* 5 — STS activity involving sanctioned vessels */
  sts: [
    { date:'12 Aug 2026', name:'CASPIAN DAWN',   imo:'9204338', cpty:'M/T ZARIA',        cptyStatus:'OFAC SDN designated', loc:'Off Fujairah',      dur:'7h 20m', conf:'Confirmed' },
    { date:'27 Aug 2026', name:'SIRIUS EXPRESS', imo:'9366720', cpty:'Unidentified',     cptyStatus:'Unknown',             loc:'Off Fujairah',      dur:'5h 40m', conf:'Potential' },
    { date:'18 Aug 2026', name:'LEVANT PEARL',   imo:'9276441', cpty:'M/T BLUE HORIZON', cptyStatus:'Not designated',       loc:'Gulf of Oman',      dur:'9h 10m', conf:'Confirmed' },
    { date:'04 Jul 2026', name:'ZAGROS STAR',    imo:'9188445', cpty:'M/T ARAS 3',       cptyStatus:'Internal watchlist',   loc:'Southern Red Sea', dur:'6h 05m', conf:'Confirmed' },
    { date:'23 Apr 2026', name:'ORION CREST',    imo:'9042118', cpty:'M/T KAVIR',        cptyStatus:'OFAC SDN designated',  loc:'Gulf of Oman',      dur:'8h 45m', conf:'Confirmed' },
    { date:'16 Jan 2026', name:'LEVANT VOYAGER',imo:'9221876', cpty:'Unidentified',     cptyStatus:'Unknown',              loc:'Off Fujairah',      dur:'4h 30m', conf:'Potential' },
    { date:'02 Nov 2025', name:'CASPIAN DAWN',   imo:'9204338', cpty:'M/T ZARIA',        cptyStatus:'OFAC SDN designated',  loc:'Gulf of Oman',      dur:'6h 55m', conf:'Confirmed' },
  ],
  stsNote: 'Seven transfers in twelve months, three of them with a vessel now designated by OFAC and two with an unidentified counterparty. CASPIAN DAWN transferred with M/T ZARIA twice, nine months apart.',

  /* Association network */
  associations: [
    { name:'Meridian Trust (BVI)',      role:'Ultimate beneficial owner', vessels:6,  status:'EU designated',       tone:'red',   note:'Designated 05 Aug 2026; holds 62% through Aurora Holdings.' },
    { name:'Aurora Holdings (MHL)',     role:'Intermediate holder',       vessels:6,  status:'Under review',        tone:'amber', note:'Directorship overlap with a designated entity.' },
    { name:'A. Farsani',                role:'Former director',           vessels:3,  status:'OFAC designated',     tone:'red',   note:'Designated 21 Mar 2026; resigned 04 Apr 2026.' },
    { name:'Pelagos Tech Services',     role:'Technical manager',         vessels:4,  status:'Adverse record',      tone:'red',   note:'Separately reported: 5.93 casualty rate, 4 open indicators.' },
    { name:'Levant Energy Trading DMCC',role:'Disclosed charterer',       vessels:3,  status:'Monitored jurisdiction',tone:'amber',note:'Registered in a jurisdiction under enhanced monitoring.' },
    { name:'Anvil Marine SA',           role:'Co-owner, two vessels',     vessels:2,  status:'Director overlap',    tone:'amber', note:'Shares two directors with the group.' },
    { name:'M/T ZARIA',                 role:'Repeat STS counterparty',   vessels:1,  status:'OFAC designated',     tone:'red',   note:'Two transfers with CASPIAN DAWN in the window.' },
  ],
  assocNote: 'Fourteen entities are linked to the group through ownership, directorship, management or charter. Three carry a current designation and four more are under review.',

  findings: [
    { tone:'red',   t:'The group\u2019s majority beneficial owner is EU-designated', d:'Meridian Trust (BVI) was added to the EU consolidated list on 05 Aug 2026 and holds 62% of the group through a Marshall Islands intermediary, reaching six vessels including four on our books.', m:'62% held' },
    { tone:'red',   t:'Three ship-to-ship transfers with an OFAC-designated vessel', d:'CASPIAN DAWN transferred with M/T ZARIA twice and ORION CREST with M/T KAVIR once. Two further transfers were with counterparties that could not be identified from AIS.', m:'3 confirmed' },
    { tone:'red',   t:'Eight designated port calls, four confirmed on imagery', d:'Kharg Island accounts for four calls by three vessels. In three cases the vessel withheld its AIS destination immediately beforehand.', m:'8 calls' },
    { tone:'amber', t:'Fourteen linked entities, three currently designated', d:'The association network includes a designated former director and a technical manager separately reported for an adverse casualty and compliance record.', m:'3 designated' },
  ],
};
