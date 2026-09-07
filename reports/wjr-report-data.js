/* War / JWC Risk Portfolio Exposure Report — demo data */
window.WJR = {
  meta: {
    portfolio: 'War Risk Facility 2026',
    period: '01 Aug 2026 – 31 Aug 2026',
    previous: 'Jul 2026',
    preparedFor: 'War Risk Underwriting Committee',
    generatedOn: '07 Sep 2026 11:02 UTC',
    reportId: 'WJR-2026-08-0058',
    owner: 'Paul Kiernan',
    listing: 'Joint War Committee listed areas, revision of 12 Jun 2026',
  },

  summary: {
    areas: 9,
    vesselsInside: 63, vesselsDelta: '+9',
    exposedValue: '$1.34bn', exposedValueDelta: '+$186m',
    portfolioValue: '$8.1bn',
    sharePct: 16.5,
    transits: 41,
    breaches: 4,
    apRaised: '$2.84m',
    apRaisedDelta: '+$0.61m',
    avgDwell: '1d 22h',
    longestDwell: '4d 09h',
    events: 6,
  },

  /* 1 — Vessels currently within area */
  inside: [
    { name:'STELLA MARIS',   imo:'9411678', type:'Crude Oil Tanker', flag:'pa', area:'Southern Red Sea & Bab el-Mandeb', since:'02 Aug 06:14', dwell:'3d 04h', score:88, value:'$74m',  warranty:'Breach', notice:'AP raised' },
    { name:'ORION TRADER',   imo:'9327451', type:'Product Tanker',   flag:'lr', area:'Strait of Hormuz',                  since:'07 Aug 22:40', dwell:'0d 22h', score:82, value:'$41m',  warranty:'Within',  notice:'Notice on file' },
    { name:'MERIDIAN STAR',  imo:'9298155', type:'Bulk Carrier',     flag:'pa', area:'Black Sea — north-west',            since:'19 Aug 15:32', dwell:'2d 06h', score:62, value:'$24m',  warranty:'Breach', notice:'AP raised' },
    { name:'GULF VENTURE',   imo:'9188674', type:'Chemical Tanker',  flag:'vc', area:'Gulf of Guinea (Nigeria / Benin)',  since:'24 Aug 04:18', dwell:'1d 18h', score:71, value:'$33m',  warranty:'Within',  notice:'Notice on file' },
    { name:'CASPIAN DAWN',   imo:'9204338', type:'Crude Oil Tanker', flag:'cm', area:'Gulf of Oman',                      since:'12 Aug 09:05', dwell:'1d 11h', score:79, value:'$58m',  warranty:'Within',  notice:'Notice on file' },
    { name:'BALTIC HERON',   imo:'9077431', type:'General Cargo',    flag:'ru', area:'Black Sea — north-west',            since:'19 Aug 10:07', dwell:'4d 09h', score:66, value:'$12m',  warranty:'Breach', notice:'AP raised' },
    { name:'SIRIUS EXPRESS', imo:'9366720', type:'Product Tanker',   flag:'cm', area:'Southern Red Sea & Bab el-Mandeb', since:'27 Aug 16:44', dwell:'0d 16h', score:64, value:'$37m',  warranty:'Breach', notice:'AP pending' },
    { name:'ATLAS PIONEER',  imo:'9512289', type:'Container Ship',   flag:'sg', area:'Strait of Hormuz',                  since:'29 Aug 03:22', dwell:'0d 19h', score:68, value:'$96m',  warranty:'Within',  notice:'Notice on file' },
  ],
  insideNote: 'Eight vessels were inside a listed area at period end. Four are in warranty breach, of which three have additional premium raised and one is pending assured response.',

  /* 2 — War exposure page / policy details */
  policy: {
    facility: 'War Risk Facility 2026',
    policyNo: 'WR/2026/0114',
    inception: '01 Jan 2026',
    expiry: '31 Dec 2026',
    basis: 'Institute War and Strikes Clauses (Hulls — Time) 1/10/83 as amended',
    limit: '$250m any one vessel',
    aggregate: '$1.5bn any one event',
    deductible: '$0.5m each occurrence',
    warrantyClause: 'Notice required 48 hours before entry into any JWC listed area',
    apBasis: 'Additional premium per entry, rated by area band and days inside',
    apRate: '0.045% – 0.180% of insured value per 7-day period',
    breachRemedy: 'Cover held subject to prompt notice and payment of AP',
    notes: [
      { k:'Vessels declared to the facility', v:'514' },
      { k:'Aggregate insured value',          v:'$8.1bn' },
      { k:'Listed-area entries YTD',          v:'287' },
      { k:'AP earned YTD',                    v:'$18.4m' },
      { k:'Claims notified YTD',              v:'2 ($1.9m reserved)' },
      { k:'Current listing revision',         v:'12 Jun 2026' },
    ],
  },

  /* 3 — Duration in region */
  duration: [
    { band:'Under 12 hours', transits:11, pct:26.8, apBand:'Minimum AP',  color:'#16a34a' },
    { band:'12–24 hours',    transits:9,  pct:22.0, apBand:'1 × 7-day',   color:'#84cc16' },
    { band:'1–2 days',       transits:12, pct:29.3, apBand:'1 × 7-day',   color:'#d97706' },
    { band:'2–4 days',       transits:6,  pct:14.6, apBand:'1 × 7-day',   color:'#ea580c' },
    { band:'Over 4 days',    transits:3,  pct:7.3,  apBand:'2 × 7-day',   color:'#b91c1c' },
  ],
  durationByArea: [
    { area:'Southern Red Sea & Bab el-Mandeb', transits:14, avg:'2d 06h', longest:'3d 04h', apBand:'Band A' },
    { area:'Strait of Hormuz',                 transits:12, avg:'0d 21h', longest:'1d 04h', apBand:'Band B' },
    { area:'Black Sea — north-west',           transits:6,  avg:'3d 02h', longest:'4d 09h', apBand:'Band A' },
    { area:'Gulf of Guinea (Nigeria / Benin)', transits:5,  avg:'1d 14h', longest:'2d 02h', apBand:'Band B' },
    { area:'Gulf of Aden',                     transits:4,  avg:'0d 18h', longest:'1d 01h', apBand:'Band B' },
  ],

  /* 4 — Current positions */
  positions: [
    { name:'STELLA MARIS',   imo:'9411678', lat:'12°48.2\'N', lon:'043°21.7\'E', area:'Southern Red Sea', speed:'11.4 kn', course:'168°', dest:'Jebel Ali', eta:'09 Sep 2026', ais:'Live' },
    { name:'ORION TRADER',   imo:'9327451', lat:'26°32.9\'N', lon:'056°14.3\'E', area:'Strait of Hormuz', speed:'9.8 kn',  course:'312°', dest:'Ras Tanura', eta:'08 Sep 2026', ais:'Live' },
    { name:'MERIDIAN STAR',  imo:'9298155', lat:'45°11.6\'N', lon:'030°42.1\'E', area:'Black Sea NW',     speed:'0.2 kn',  course:'—',    dest:'Constanta',  eta:'10 Sep 2026', ais:'Live' },
    { name:'GULF VENTURE',   imo:'9188674', lat:'04°16.8\'N', lon:'006°02.4\'E', area:'Gulf of Guinea',   speed:'6.1 kn',  course:'094°', dest:'Lagos',      eta:'08 Sep 2026', ais:'Gap 4h' },
    { name:'CASPIAN DAWN',   imo:'9204338', lat:'24°58.1\'N', lon:'058°47.9\'E', area:'Gulf of Oman',     speed:'12.7 kn', course:'081°', dest:'Fujairah',   eta:'08 Sep 2026', ais:'Live' },
    { name:'BALTIC HERON',   imo:'9077431', lat:'46°02.3\'N', lon:'031°18.5\'E', area:'Black Sea NW',     speed:'0.0 kn',  course:'—',    dest:'Odesa',      eta:'—',           ais:'Gap 11h' },
    { name:'SIRIUS EXPRESS', imo:'9366720', lat:'13°22.7\'N', lon:'042°55.1\'E', area:'Southern Red Sea', speed:'10.9 kn', course:'341°', dest:'Suez',       eta:'11 Sep 2026', ais:'Live' },
    { name:'ATLAS PIONEER',  imo:'9512289', lat:'26°44.2\'N', lon:'056°38.8\'E', area:'Strait of Hormuz', speed:'14.2 kn', course:'128°', dest:'Khor Fakkan',eta:'08 Sep 2026', ais:'Live' },
  ],
  positionNote: 'Positions as at generation. Two vessels report an open AIS gap and one is stationary in the north-west Black Sea pending berth availability.',

  /* 5 — Regional concentration */
  concentration: [
    { area:'Southern Red Sea & Bab el-Mandeb', band:'Band A', vessels:24, value:'$412m', valueNum:412, limit:30, peak:27, at:'03 Aug', tone:'#b91c1c' },
    { area:'Strait of Hormuz',                 band:'Band B', vessels:19, value:'$486m', valueNum:486, limit:25, peak:22, at:'09 Aug', tone:'#dc2626' },
    { area:'Black Sea — north-west',           band:'Band A', vessels:8,  value:'$174m', valueNum:174, limit:10, peak:11, at:'20 Aug', tone:'#ea580c' },
    { area:'Gulf of Guinea (Nigeria / Benin)', band:'Band B', vessels:7,  value:'$142m', valueNum:142, limit:12, peak:8,  at:'24 Aug', tone:'#d97706' },
    { area:'Gulf of Aden',                     band:'Band B', vessels:3,  value:'$68m',  valueNum:68,  limit:15, peak:5,  at:'14 Aug', tone:'#16a34a' },
    { area:'Gulf of Oman',                     band:'Band C', vessels:2,  value:'$58m',  valueNum:58,  limit:20, peak:4,  at:'12 Aug', tone:'#16a34a' },
  ],
  concNote: 'One area exceeded its aggregation limit: north-west Black Sea peaked at 11 vessels against a limit of 10 on 20 Aug, carrying $174m of insured value.',

  /* 6 — Relevant casualties / events */
  events: [
    { date:'05 Aug 2026', area:'Southern Red Sea',  type:'Missile / UAV attack',  target:'Third-party bulk carrier',  ourVessels:4, dist:'18 nm', sev:'Serious',  note:'No portfolio vessel damaged; four were within 25 nm at the time.' },
    { date:'11 Aug 2026', area:'Strait of Hormuz',  type:'Vessel detention',      target:'Third-party product tanker',ourVessels:2, dist:'32 nm', sev:'Serious',  note:'Detention by state forces; transit advisories re-issued.' },
    { date:'16 Aug 2026', area:'Gulf of Guinea',    type:'Boarding / robbery',    target:'Third-party container ship',ourVessels:1, dist:'46 nm', sev:'Moderate', note:'Crew unharmed; portfolio vessel altered course northward.' },
    { date:'20 Aug 2026', area:'Black Sea NW',      type:'Drone strike on port',  target:'Port infrastructure',       ourVessels:2, dist:'9 nm',  sev:'Serious',  note:'MERIDIAN STAR and BALTIC HERON alongside; no damage reported.' },
    { date:'23 Aug 2026', area:'Southern Red Sea',  type:'GNSS interference',     target:'Area-wide',                 ourVessels:6, dist:'—',     sev:'Moderate', note:'Position reporting degraded for up to 9 hours across six vessels.' },
    { date:'28 Aug 2026', area:'Gulf of Aden',      type:'Suspicious approach',   target:'Portfolio vessel',          ourVessels:1, dist:'0 nm',  sev:'Moderate', note:'Two skiffs approached; deterred by naval escort, no boarding.' },
  ],

  /* 7 — Change in exposure */
  change: {
    months: ['Sep 25','Oct 25','Nov 25','Dec 25','Jan 26','Feb 26','Mar 26','Apr 26','May 26','Jun 26','Jul 26','Aug 26'],
    vessels: [38, 41, 44, 42, 47, 51, 49, 54, 58, 56, 54, 63],
    value:   [0.71, 0.78, 0.84, 0.79, 0.92, 1.01, 0.98, 1.09, 1.18, 1.14, 1.15, 1.34],
  },
  changeRows: [
    { k:'Vessels inside listed areas', now:'63',      prev:'54',      d:'+9',       tone:'red' },
    { k:'Exposed insured value',       now:'$1.34bn', prev:'$1.15bn', d:'+$186m',   tone:'red' },
    { k:'Share of facility value',     now:'16.5%',   prev:'14.2%',   d:'+2.3pts',  tone:'red' },
    { k:'Transits in period',          now:'41',      prev:'36',      d:'+5',       tone:'red' },
    { k:'Warranty breaches',           now:'4',       prev:'2',       d:'+2',       tone:'red' },
    { k:'Additional premium raised',   now:'$2.84m',  prev:'$2.23m',  d:'+$0.61m',  tone:'amber' },
    { k:'Average time in area',        now:'1d 22h',  prev:'2d 04h',  d:'-6h',      tone:'green' },
  ],

  /* 8 — Global fleet vs your fleet */
  benchmark: [
    { k:'Vessels in JWC listed areas',      ours:'63 of 514',  oursPct:12.3, global:'4,180 of 61,400', globalPct:6.8,  verdict:'worse' },
    { k:'Average time inside per transit',  ours:'1d 22h',     oursPct:46,   global:'1d 08h',          globalPct:32,   verdict:'worse' },
    { k:'Transits per vessel per year',     ours:'0.67',       oursPct:67,   global:'0.41',            globalPct:41,   verdict:'worse' },
    { k:'Share of value in Band A areas',   ours:'43.7%',      oursPct:43.7, global:'28.1%',           globalPct:28.1, verdict:'worse' },
    { k:'Warranty notice compliance',       ours:'90.2%',      oursPct:90.2, global:'82.6%',           globalPct:82.6, verdict:'better' },
    { k:'Loss frequency in listed areas',   ours:'0.39%',      oursPct:39,   global:'0.51%',           globalPct:51,   verdict:'better' },
  ],
  benchmarkNote: 'Global figures are drawn from the Real World global fleet database for the same period, restricted to vessels of comparable type and tonnage. Percentages are normalised for chart comparison.',

  findings: [
    { tone:'red',   t:'Listed-area exposure at a twelve-month high', d:'63 vessels and $1.34bn of insured value were inside a JWC listed area at period end, up nine vessels and $186m on July — the highest of the facility year.', m:'+$186m' },
    { tone:'red',   t:'Four warranty breaches, double the previous period', d:'STELLA MARIS, MERIDIAN STAR, BALTIC HERON and SIRIUS EXPRESS entered without a 48-hour notice on file. AP is raised on three; one remains pending.', m:'4 breaches' },
    { tone:'amber', t:'North-west Black Sea over its aggregation limit', d:'Peaked at 11 vessels against a limit of 10 on 20 Aug, coinciding with a drone strike on port infrastructure nine miles from two portfolio vessels.', m:'11 of 10' },
    { tone:'green', t:'Notice compliance ahead of the global fleet', d:'90.2% of entries carried a valid notice against 82.6% globally, and loss frequency inside listed areas remains below the global rate at 0.39%.', m:'90.2%' },
  ],
};
