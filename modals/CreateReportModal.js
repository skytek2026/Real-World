/* ── Create New Report modal ──────────────────────────────────────────────
   Scope config is data-driven: add a REPORT_TYPES entry to support a new
   report type — the modal builds its scope UI from the entry. */
(function () {
  const TYPES = [
    { id:'per', name:'Portfolio Executive Risk Report',
      scopeLabel:'Portfolios', scopeHint:'Select one or more portfolios to aggregate.',
      searchPlaceholder:'Search portfolios…',
      items:[
        { id:'p1', name:'Global Hull & Machinery 2026', meta:'1,284 vessels · $18.4bn' },
        { id:'p2', name:'Tanker Book — Europe',         meta:'412 vessels · $6.9bn' },
        { id:'p3', name:'Dry Bulk Consortium',          meta:'368 vessels · $4.1bn' },
        { id:'p4', name:'Asia Container Programme',     meta:'227 vessels · $5.2bn' },
        { id:'p5', name:'Specialist Energy & Offshore', meta:'96 assets · $3.4bn' },
        { id:'p6', name:'War Risk Facility 2026',       meta:'514 vessels · $8.1bn' },
      ] },
    { id:'pex', name:'Portfolio Exception Report',
      scopeLabel:'Portfolios', scopeHint:'Select the portfolios to scan for exceptions.',
      searchPlaceholder:'Search portfolios…',
      thresholdLabel:'Exception threshold',
      thresholdHint:'Vessels are reported as exceptions at or above this Real World Risk Score.',
      thresholds:[
        { id:'50', label:'Score 50+ — wider net' },
        { id:'61', label:'Score 61+ — standard' },
        { id:'81', label:'Score 81+ — severe only' },
      ],
      thresholdDefault:'61',
      sectionsLabel:'Exception sections',
      sectionsHint:'Choose which exception categories the report should include.',
      sections:[
        { id:'high', label:'High Risk Score vessels' },
        { id:'rise', label:'Material Risk Score increases' },
        { id:'sanc', label:'New sanctions / compliance indicators' },
        { id:'cas',  label:'New casualties' },
        { id:'war',  label:'Entry into selected war / high-risk areas' },
        { id:'agg',  label:'Regional aggregation exceptions' },
        { id:'wx',   label:'Significant weather exposure' },
        { id:'nvp',  label:'New vs previously reported issues' },
      ],
      items:[
        { id:'p1', name:'Global Hull & Machinery 2026', meta:'1,284 vessels · $18.4bn' },
        { id:'p2', name:'Tanker Book — Europe',        meta:'386 vessels · $6.2bn' },
        { id:'p3', name:'Asia Container Programme',     meta:'227 vessels · $9.7bn' },
        { id:'p4', name:'Dry Bulk Facility 2026',       meta:'412 vessels · $4.1bn' },
        { id:'p5', name:'Coastal & Short Sea',          meta:'168 vessels · $0.9bn' },
        { id:'p6', name:'War Risk Facility 2026',       meta:'514 vessels · $8.1bn' },
      ] },
    { id:'pas', name:'Portfolio Audit for Sanctions',
      scopeLabel:'Portfolios', scopeHint:'Select the portfolios to audit.',
      searchPlaceholder:'Search portfolios…',
      thresholdLabel:'Screening lists',
      thresholdHint:'Which list set the audit screens every vessel, owner and manager against.',
      thresholds:[
        { id:'official', label:'Official lists only' },
        { id:'all',      label:'Official + internal watchlist' },
        { id:'enhanced', label:'Enhanced — incl. indirect holdings' },
      ],
      thresholdDefault:'all',
      sectionsLabel:'Audit sections',
      sectionsHint:'Choose which change categories the audit should cover.',
      sections:[
        { id:'score', label:'Risk Score movements' },
        { id:'cas',   label:'New casualties' },
        { id:'sanc',  label:'New sanctions indicators' },
        { id:'roll',  label:'New / removed vessels' },
        { id:'flag',  label:'Flag changes' },
        { id:'own',   label:'Ownership / management changes' },
        { id:'reg',   label:'Vessels entering / leaving selected regions' },
        { id:'conc',  label:'Changes in regional concentration' },
        { id:'war',   label:'New war-risk exposure' },
      ],
      items:[
        { id:'p1', name:'Global Hull & Machinery 2026', meta:'1,284 vessels · $18.4bn' },
        { id:'p2', name:'Tanker Book — Europe',        meta:'386 vessels · $6.2bn' },
        { id:'p3', name:'Asia Container Programme',     meta:'227 vessels · $9.7bn' },
        { id:'p4', name:'Dry Bulk Facility 2026',       meta:'412 vessels · $4.1bn' },
        { id:'p5', name:'Coastal & Short Sea',          meta:'168 vessels · $0.9bn' },
        { id:'p6', name:'War Risk Facility 2026',       meta:'514 vessels · $8.1bn' },
      ] },
    { id:'prs', name:'Portfolio Risk Score Report',
      scopeLabel:'Portfolios', scopeHint:'Select the portfolios to score.',
      searchPlaceholder:'Search portfolios…',
      thresholdLabel:'Score breakdown',
      thresholdHint:'How the averages in the report are calculated.',
      thresholds:[
        { id:'plain',    label:'Unweighted mean' },
        { id:'value',    label:'Weighted by insured value' },
        { id:'both',     label:'Both, side by side' },
      ],
      thresholdDefault:'both',
      sectionsLabel:'Report sections',
      sectionsHint:'Choose which score breakdowns the report should include.',
      sections:[
        { id:'avg',   label:'Average Risk Score' },
        { id:'dist',  label:'Risk Score distribution' },
        { id:'high',  label:'Highest-scoring vessels' },
        { id:'move',  label:'Largest score increases / decreases' },
        { id:'type',  label:'Risk Score by vessel type' },
        { id:'age',   label:'Risk Score by vessel age' },
        { id:'flag',  label:'Risk Score by flag' },
        { id:'owner', label:'Risk Score by owner / technical manager' },
        { id:'trend', label:'Risk Score trends' },
      ],
      items:[
        { id:'p1', name:'Global Hull & Machinery 2026', meta:'1,284 vessels · $18.4bn' },
        { id:'p2', name:'Tanker Book — Europe',        meta:'386 vessels · $6.2bn' },
        { id:'p3', name:'Asia Container Programme',     meta:'227 vessels · $9.7bn' },
        { id:'p4', name:'Dry Bulk Facility 2026',       meta:'412 vessels · $4.1bn' },
        { id:'p5', name:'Coastal & Short Sea',          meta:'168 vessels · $0.9bn' },
        { id:'p6', name:'War Risk Facility 2026',       meta:'514 vessels · $8.1bn' },
      ] },
    { id:'ace', name:'Accumulation & Concentration Exception Report',
      scopeLabel:'Regions', scopeHint:'Select the regions to measure accumulation across.',
      searchPlaceholder:'Search regions…',
      thresholdLabel:'Exception threshold',
      thresholdHint:'How far above its accumulation limit a region must run to be reported as an exception.',
      thresholds:[
        { id:'any', label:'Any breach' },
        { id:'10',  label:'10% over limit' },
        { id:'25',  label:'25% over limit' },
      ],
      thresholdDefault:'any',
      sectionsLabel:'Report sections',
      sectionsHint:'Choose which accumulation breakdowns the report should include.',
      sections:[
        { id:'geo',    label:'Highest geographic concentrations' },
        { id:'breach', label:'Regions exceeding selected thresholds' },
        { id:'type',   label:'Concentration by vessel type' },
        { id:'top10',  label:'Top 10 exposures by region' },
        { id:'vess',   label:'Vessels contributing to the accumulation' },
        { id:'value',  label:'Insured value where available' },
      ],
      items:[
        { id:'r1', name:'Singapore Strait',                 meta:'186 vessels · limit 150' },
        { id:'r2', name:'Strait of Hormuz',                 meta:'104 vessels · limit 90' },
        { id:'r3', name:'Malacca Strait',                   meta:'142 vessels · limit 140' },
        { id:'r4', name:'Suez / Gulf of Suez',              meta:'78 vessels · limit 70' },
        { id:'r5', name:'Southern Red Sea & Bab el-Mandeb', meta:'47 vessels · limit 60' },
        { id:'r6', name:'Gulf of Guinea (Nigeria / Benin)', meta:'31 vessels · limit 40' },
        { id:'r7', name:'Black Sea — north-west',           meta:'19 vessels · limit 25' },
        { id:'r8', name:'Panama Canal approaches',          meta:'64 vessels · limit 80' },
      ] },
    { id:'wjr', name:'War / JWC Risk Portfolio Exposure Report',
      scopeLabel:'Listed areas', scopeHint:'Select the war / JWC listed areas to report exposure across.',
      searchPlaceholder:'Search listed areas…',
      thresholdLabel:'Area listing',
      thresholdHint:'Which area set the report measures exposure against.',
      thresholds:[
        { id:'jwc',   label:'JWC listed areas only' },
        { id:'both',  label:'JWC + internal enhanced areas' },
        { id:'all',   label:'All monitored high-risk areas' },
      ],
      thresholdDefault:'both',
      sectionsLabel:'Report sections',
      sectionsHint:'Choose which war-risk breakdowns the report should include.',
      sections:[
        { id:'inside', label:'Vessels currently within area' },
        { id:'policy', label:'War exposure page / policy details' },
        { id:'dwell',  label:'Duration in region' },
        { id:'pos',    label:'Current positions' },
        { id:'conc',   label:'Regional concentration' },
        { id:'events', label:'Relevant casualties / events' },
        { id:'change', label:'Change in exposure' },
        { id:'bench',  label:'Global fleet vs your fleet' },
      ],
      items:[
        { id:'a1', name:'Southern Red Sea & Bab el-Mandeb', meta:'JWC listed · Band A · 24 vessels' },
        { id:'a2', name:'Strait of Hormuz',                 meta:'JWC listed · Band B · 19 vessels' },
        { id:'a3', name:'Black Sea — north-west',           meta:'JWC listed · Band A · 8 vessels' },
        { id:'a4', name:'Gulf of Guinea (Nigeria / Benin)', meta:'JWC listed · Band B · 7 vessels' },
        { id:'a5', name:'Gulf of Aden',                     meta:'JWC listed · Band B · 3 vessels' },
        { id:'a6', name:'Gulf of Oman',                     meta:'Enhanced · Band C · 2 vessels' },
        { id:'a7', name:'Libyan ports & approaches',        meta:'JWC listed · Band A · 0 vessels' },
        { id:'a8', name:'Venezuelan waters',                meta:'Enhanced · Band C · 0 vessels' },
      ] },
    { id:'gmc', name:'Global Marine Casualty Intelligence Report',
      scopeLabel:'Regions', scopeHint:'Select the regions to include in the global casualty picture.',
      searchPlaceholder:'Search regions…',
      thresholdLabel:'Casualty severity',
      thresholdHint:'The minimum severity a casualty must reach to appear in the report.',
      thresholds:[
        { id:'all',     label:'All casualties' },
        { id:'serious', label:'Serious and above' },
        { id:'loss',    label:'Total losses only' },
      ],
      thresholdDefault:'all',
      sectionsLabel:'Report sections',
      sectionsHint:'Choose which casualty breakdowns the report should include.',
      sections:[
        { id:'new',    label:'New global casualties' },
        { id:'sig',    label:'Significant incidents' },
        { id:'type',   label:'Casualties by type' },
        { id:'vtype',  label:'Vessel type' },
        { id:'region', label:'Region' },
        { id:'flag',   label:'Flag' },
        { id:'age',    label:'Vessel age' },
        { id:'mgr',    label:'Owner / technical manager' },
        { id:'emerg',  label:'Emerging casualty patterns' },
      ],
      items:[
        { id:'g1', name:'South East Asia',  meta:'98 casualties · rate 1.14' },
        { id:'g2', name:'East Asia',        meta:'71 casualties · rate 0.86' },
        { id:'g3', name:'Mediterranean',    meta:'54 casualties · rate 0.71' },
        { id:'g4', name:'North Europe',     meta:'48 casualties · rate 0.62' },
        { id:'g5', name:'Middle East Gulf', meta:'41 casualties · rate 0.94' },
        { id:'g6', name:'West Africa',      meta:'34 casualties · rate 1.02' },
        { id:'g7', name:'North America',    meta:'29 casualties · rate 0.44' },
        { id:'g8', name:'South America',    meta:'24 casualties · rate 0.51' },
        { id:'g9', name:'Rest of world',    meta:'19 casualties · rate 0.28' },
      ] },
    { id:'cbr', name:'Casualty Benchmark Report',
      scopeLabel:'Fleets or portfolios', scopeHint:'Select the fleet whose casualty record should be benchmarked.', single:true,
      searchPlaceholder:'Search fleets and portfolios…',
      thresholdLabel:'Comparison population',
      thresholdHint:'Which population the selected fleet is measured against.',
      thresholds:[
        { id:'peer',   label:'Comparable peer group' },
        { id:'segment',label:'Wider vessel segment' },
        { id:'global', label:'Global merchant fleet' },
      ],
      thresholdDefault:'peer',
      sectionsLabel:'Report sections',
      sectionsHint:'Choose which benchmark comparisons the report should include.',
      sections:[
        { id:'hist',  label:'Selected fleet casualty history' },
        { id:'pop',   label:'Comparable fleet / global population' },
        { id:'per',   label:'Casualties per vessel' },
        { id:'aff',   label:'Percentage of fleet affected' },
        { id:'types', label:'Casualty types' },
        { id:'age',   label:'Vessel age comparison' },
        { id:'peers', label:'Relevant peer comparison' },
      ],
      items:[
        { id:'f1', name:'Nordwind Shipping Group',    meta:'Fleet · 64 vessels · avg age 13.8' },
        { id:'f2', name:'Aegean Dry Bulk',            meta:'Fleet · 48 vessels · avg age 15.1' },
        { id:'f3', name:'Meridian Ship Management',   meta:'Fleet · 91 vessels · avg age 11.4' },
        { id:'f4', name:'Global Hull & Machinery 2026',meta:'Portfolio · 1,284 vessels' },
        { id:'f5', name:'Tanker Book — Europe',       meta:'Portfolio · 386 vessels' },
        { id:'f6', name:'Dry Bulk Facility 2026',     meta:'Portfolio · 412 vessels' },
      ] },
    { id:'otm', name:'Owner & Technical Manager Risk Report',
      scopeLabel:'Owner or manager', scopeHint:'Select the counterparty to assess.', single:true,
      searchPlaceholder:'Search owners and technical managers…',
      thresholdLabel:'Role assessed',
      thresholdHint:'Which relationship the vessel list is built from.',
      thresholds:[
        { id:'tech',  label:'Technical manager' },
        { id:'owner', label:'Registered / beneficial owner' },
        { id:'both',  label:'Any association' },
      ],
      thresholdDefault:'tech',
      sectionsLabel:'Report sections',
      sectionsHint:'Choose which counterparty breakdowns the report should include.',
      sections:[
        { id:'vess',   label:'Associated vessels' },
        { id:'comp',   label:'Fleet composition' },
        { id:'dist',   label:'Risk Score distribution' },
        { id:'high',   label:'Highest Risk Score vessels' },
        { id:'cas',    label:'Casualty history' },
        { id:'sanc',   label:'Sanctions / compliance indicators' },
        { id:'assoc',  label:'Relevant fleet associations' },
        { id:'geo',    label:'Geographic activity' },
      ],
      items:[
        { id:'m1', name:'Pelagos Tech Services',      meta:'Technical manager · 38 vessels · avg score 55.8' },
        { id:'m2', name:'Meridian Ship Management',   meta:'Technical manager · 91 vessels · avg score 37.9' },
        { id:'m3', name:'Oryx Fleet Management',      meta:'Technical manager · 44 vessels · avg score 49.3' },
        { id:'m4', name:'Northern Marine Tech',       meta:'Technical manager · 52 vessels · avg score 31.6' },
        { id:'m5', name:'Levant Maritime Holding',    meta:'Owner · 31 vessels · avg score 61.4' },
        { id:'m6', name:'Nordwind Shipping Group',    meta:'Owner · 64 vessels · avg score 34.2' },
        { id:'m7', name:'Aegean Dry Bulk',            meta:'Owner · 48 vessels · avg score 38.6' },
        { id:'m8', name:'Coral Maritime Pte Ltd',     meta:'Owner · 27 vessels · avg score 30.1' },
      ] },
    { id:'psc', name:'Portfolio Sanctions & Compliance Report',
      scopeLabel:'Portfolios', scopeHint:'Select the portfolios to sweep for sanctions exposure.',
      searchPlaceholder:'Search portfolios…',
      thresholdLabel:'Evidence standard',
      thresholdHint:'How much corroboration a finding needs before it appears in the report.',
      thresholds:[
        { id:'all',       label:'Confirmed and potential' },
        { id:'corrob',    label:'Corroborated only' },
        { id:'confirmed', label:'Confirmed only' },
      ],
      thresholdDefault:'all',
      sectionsLabel:'Report sections',
      sectionsHint:'Choose which sanctions checks the report should include.',
      sections:[
        { id:'conf',  label:'Confirmed sanctions information' },
        { id:'new',   label:'New sanctions matches' },
        { id:'port',  label:'Potential sanctioned port calls' },
        { id:'ais',   label:'AIS-declared sanctioned port visits / destinations' },
        { id:'sts',   label:'STS activity involving sanctioned vessels' },
      ],
      items:[
        { id:'p1', name:'Global Hull & Machinery 2026', meta:'1,284 vessels · $18.4bn' },
        { id:'p2', name:'Tanker Book — Europe',        meta:'386 vessels · $6.2bn' },
        { id:'p3', name:'Asia Container Programme',     meta:'227 vessels · $9.7bn' },
        { id:'p4', name:'Dry Bulk Facility 2026',       meta:'412 vessels · $4.1bn' },
        { id:'p5', name:'Coastal & Short Sea',          meta:'168 vessels · $0.9bn' },
        { id:'p6', name:'War Risk Facility 2026',       meta:'514 vessels · $8.1bn' },
      ] },
    { id:'saa', name:'Sanctions Activity & Association Report',
      scopeLabel:'Counterparty', scopeHint:'Select the owner, manager, charterer or vessel to investigate.', single:true,
      searchPlaceholder:'Search owners, managers and vessels…',
      thresholdLabel:'Association depth',
      thresholdHint:'How far through the ownership and management chain the investigation reaches.',
      thresholds:[
        { id:'direct',   label:'Direct relationships only' },
        { id:'one',      label:'One step removed' },
        { id:'full',     label:'Full chain, incl. former links' },
      ],
      thresholdDefault:'full',
      sectionsLabel:'Report sections',
      sectionsHint:'Choose which sanctions checks the report should include.',
      sections:[
        { id:'conf',  label:'Confirmed sanctions information' },
        { id:'new',   label:'New sanctions matches' },
        { id:'port',  label:'Potential sanctioned port calls' },
        { id:'ais',   label:'AIS-declared sanctioned port visits / destinations' },
        { id:'sts',   label:'STS activity involving sanctioned vessels' },
      ],
      items:[
        { id:'e1', name:'Levant Maritime Holding',      meta:'Owning group · 31 vessels · 3 designated links' },
        { id:'e2', name:'Anvil Marine SA',              meta:'Owner · 8 vessels · director overlap' },
        { id:'e3', name:'Aurora Holdings (MHL)',        meta:'Intermediate holder · 6 vessels · under review' },
        { id:'e4', name:'Pelagos Tech Services',        meta:'Technical manager · 38 vessels · 4 indicators' },
        { id:'e5', name:'Levant Energy Trading DMCC',   meta:'Charterer · 3 vessels · monitored jurisdiction' },
        { id:'e6', name:'STELLA MARIS (IMO 9411678)',   meta:'Vessel · EU beneficial owner match' },
        { id:'e7', name:'CASPIAN DAWN (IMO 9204338)',   meta:'Vessel · OFAC STS counterparty' },
      ] },
    { id:'gfm', name:'Global Fleet & Market Intelligence Report',
      scopeLabel:'Fleet segments', scopeHint:'Select the vessel segments to include in the global picture.',
      searchPlaceholder:'Search vessel segments…',
      thresholdLabel:'Fleet universe',
      thresholdHint:'Which slice of the global fleet the report is built from.',
      thresholds:[
        { id:'300',  label:'300 GT and above' },
        { id:'1000', label:'1,000 GT and above' },
        { id:'5000', label:'5,000 GT and above' },
      ],
      thresholdDefault:'300',
      sectionsLabel:'Report sections',
      sectionsHint:'Choose which global breakdowns the report should include.',
      sections:[
        { id:'comp',  label:'Global fleet composition' },
        { id:'type',  label:'Vessel type' },
        { id:'age',   label:'Vessel age' },
        { id:'flag',  label:'Flag' },
        { id:'mgr',   label:'Owner / Technical Manager' },
        { id:'score', label:'Risk Score distribution' },
        { id:'cas',   label:'Casualty activity' },
        { id:'sanc',  label:'Sanctions / compliance activity' },
        { id:'geo',   label:'Geographic activity' },
        { id:'trend', label:'Selected market trends' },
      ],
      items:[
        { id:'s1', name:'All segments',        meta:'61,400 vessels · 1.62bn GT' },
        { id:'s2', name:'Bulk Carrier',        meta:'12,840 vessels · 482m GT' },
        { id:'s3', name:'Container Ship',      meta:'6,210 vessels · 324m GT' },
        { id:'s4', name:'Crude Oil Tanker',    meta:'2,380 vessels · 184m GT' },
        { id:'s5', name:'Product Tanker',      meta:'6,940 vessels · 218m GT' },
        { id:'s6', name:'Chemical Tanker',     meta:'5,180 vessels · 112m GT' },
        { id:'s7', name:'LNG / LPG Carrier',   meta:'2,410 vessels · 118m GT' },
        { id:'s8', name:'General Cargo',       meta:'14,720 vessels · 188m GT' },
      ] },
    { id:'ppa', name:'Peer & Prospect Analysis Report',
      scopeLabel:'Prospect', scopeHint:'Select the owner or operator to assess against its peers.', single:true,
      searchPlaceholder:'Search owners and operators…',
      thresholdLabel:'Peer group',
      thresholdHint:'How the comparison group is selected.',
      thresholds:[
        { id:'auto',    label:'Auto — matched on type, size and trade' },
        { id:'segment', label:'Same vessel segment' },
        { id:'region',  label:'Same trading region' },
      ],
      thresholdDefault:'auto',
      sectionsLabel:'Report sections',
      sectionsHint:'Choose which comparisons the report should include.',
      sections:[
        { id:'score', label:'Real World Risk Score profile' },
        { id:'size',  label:'Fleet size' },
        { id:'type',  label:'Vessel type' },
        { id:'age',   label:'Vessel age' },
        { id:'geo',   label:'Geographic activity' },
        { id:'cas',   label:'Casualty profile' },
        { id:'sanc',  label:'Sanctions / compliance profile' },
      ],
      items:[
        { id:'q1', name:'Anadolu Denizcilik AS',      meta:'Prospect · 42 vessels · score 46.8' },
        { id:'q2', name:'Baltic Carriers AS',         meta:'Prospect · 78 vessels · score 44.1' },
        { id:'q3', name:'Hanseatic Bulk GmbH',        meta:'Prospect · 112 vessels · score 42.6' },
        { id:'q4', name:'Skagen Shipping',            meta:'Prospect · 94 vessels · score 36.8' },
        { id:'q5', name:'Nordwind Shipping Group',    meta:'Existing assured · 64 vessels · score 34.2' },
        { id:'q6', name:'Aegean Dry Bulk',            meta:'Existing assured · 48 vessels · score 38.6' },
        { id:'q7', name:'Coral Maritime Pte Ltd',     meta:'Existing assured · 27 vessels · score 30.1' },
      ] },
    { id:'ivu', name:'Individual Vessel Underwriting Report',
      scopeLabel:'Vessel', scopeHint:'Select the vessel this submission covers.',
      searchPlaceholder:'Search by vessel name or IMO…', single:true,
      items:[
        { id:'v1', name:'FRESH BREEZE',   meta:'IMO 9438712 · Crude Oil Tanker · Spain' },
        { id:'v2', name:'ATLAS TRIDENT',  meta:'IMO 9483721 · Crude Oil Tanker · Panama' },
        { id:'v3', name:'HEDDA KNUTSEN',  meta:'IMO 9512044 · Product Tanker · Liberia' },
        { id:'v4', name:'MERIDIAN PEARL', meta:'IMO 9377158 · Bulk Carrier · Cameroon' },
        { id:'v5', name:'KAPPA VOYAGER',  meta:'IMO 9720145 · Container Ship · Singapore' },
        { id:'v6', name:'ARCTIC MARINER', meta:'IMO 9188006 · Bulk Carrier · Greece' },
      ] },
    { id:'fir', name:'Fleet Intelligence Report',
      scopeLabel:'Fleets', scopeHint:'Select the managed fleets to profile.',
      searchPlaceholder:'Search fleets…',
      items:[
        { id:'f1', name:'Nordwind Shipping Group', meta:'148 vessels · 11 flags' },
        { id:'f2', name:'Brisa Maritima Naviera',  meta:'62 vessels · 4 flags' },
        { id:'f3', name:'Aegean Dry Bulk',         meta:'54 vessels · 3 flags' },
        { id:'f4', name:'Levant Energy Trading',   meta:'38 vessels · 6 flags' },
        { id:'f5', name:'Meridian Ship Management',meta:'91 vessels · 8 flags' },
      ] },
    { id:'pfc', name:'Portfolio / Fleet Casualty Report',
      scopeLabel:'Portfolios or fleets', scopeHint:'Select the books to include in the casualty record.',
      searchPlaceholder:'Search portfolios and fleets…',
      items:[
        { id:'c1', name:'Global Hull & Machinery 2026', meta:'Portfolio · 1,284 vessels' },
        { id:'c2', name:'Tanker Book — Europe',         meta:'Portfolio · 412 vessels' },
        { id:'c3', name:'Nordwind Shipping Group',      meta:'Fleet · 148 vessels' },
        { id:'c4', name:'Aegean Dry Bulk',              meta:'Fleet · 54 vessels' },
        { id:'c5', name:'Asia Container Programme',     meta:'Portfolio · 227 vessels' },
      ] },
    { id:'rea', name:'Regional Exposure & Aggregation Report',
      scopeLabel:'Regions', scopeHint:'Select the regions to aggregate exposure across.',
      searchPlaceholder:'Search regions…',
      items:[
        { id:'r1', name:'Southern Red Sea & Bab-el-Mandeb', meta:'High-risk area · JWC listed' },
        { id:'r2', name:'Strait of Hormuz',                 meta:'High-risk area · JWC listed' },
        { id:'r3', name:'Singapore Strait',                 meta:'Chokepoint · standard' },
        { id:'r4', name:'Black Sea',                        meta:'High-risk area · JWC listed' },
        { id:'r5', name:'Gulf of Guinea',                   meta:'High-risk area · JWC listed' },
        { id:'r6', name:'North Sea',                        meta:'Standard' },
        { id:'r7', name:'Gulf of Aden',                     meta:'High-risk area · JWC listed' },
      ] },
  ];

  const ICO = {
    x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',
    search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    check:'<path d="M20 6 9 17l-5-5"/>',
    doc:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
    mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  };
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

  const TYPE_BADGE = {
    per:'Portfolio Executive Risk Report',
    pex:'Portfolio Exception Report',
    pas:'Portfolio Audit for Sanctions',
    prs:'Portfolio Risk Score Report',
    ace:'Accumulation & Concentration Exception Report',
    wjr:'War / JWC Risk Portfolio Exposure Report',
    gmc:'Global Marine Casualty Intelligence Report',
    cbr:'Casualty Benchmark Report',
    otm:'Owner & Technical Manager Risk Report',
    psc:'Portfolio Sanctions & Compliance Report',
    saa:'Sanctions Activity & Association Report',
    gfm:'Global Fleet & Market Intelligence Report',
    ppa:'Peer & Prospect Analysis Report',
    ivu:'Individual Vessel Underwriting Report',
    fir:'Fleet Intelligence Report',
    pfc:'Portfolio / Fleet Casualty Report',
    rea:'Regional Exposure & Aggregation Report',
  };
  const TYPE_HREF = {
    per:'reports/PortfolioExecutiveRiskReport.html',
    pex:'reports/PortfolioExceptionReport.html',
    pas:'reports/PortfolioAuditForSanctions.html',
    prs:'reports/PortfolioRiskScoreReport.html',
    ace:'reports/AccumulationConcentrationExceptionReport.html',
    wjr:'reports/WarJWCRiskPortfolioExposureReport.html',
    gmc:'reports/GlobalMarineCasualtyIntelligenceReport.html',
    cbr:'reports/CasualtyBenchmarkReport.html',
    otm:'reports/OwnerTechnicalManagerRiskReport.html',
    psc:'reports/PortfolioSanctionsComplianceReport.html',
    saa:'reports/SanctionsActivityAssociationReport.html',
    gfm:'reports/GlobalFleetMarketIntelligenceReport.html',
    ppa:'reports/PeerProspectAnalysisReport.html',
    ivu:'reports/IndividualVesselUnderwritingReport.html',
    fir:'reports/FleetIntelligenceReport.html',
    pfc:'reports/PortfolioFleetCasualtyReport.html',
    rea:'reports/RegionalExposureAggregationReport.html',
  };
  const PAGE_COUNT = { per:9, pex:8, pas:9, prs:9, ace:9, wjr:10, gmc:10, cbr:9, otm:10, psc:9, saa:10, gfm:11, ppa:9, ivu:8, fir:9, pfc:8, rea:8 };

  const iso = d => d.toISOString().slice(0, 10);
  const TODAY = iso(new Date());
  const monthsBack = n => { const d = new Date(); d.setMonth(d.getMonth() - n); return iso(d); };
  const PRESETS = [
    { id:'m1',  label:'Last month',    from: () => monthsBack(1) },
    { id:'m3',  label:'Last 3 months', from: () => monthsBack(3) },
    { id:'m6',  label:'Last 6 months', from: () => monthsBack(6) },
    { id:'m12', label:'Last 12 months',from: () => monthsBack(12) },
    { id:'ytd', label:'Year to date',  from: () => iso(new Date(new Date().getFullYear(), 0, 1)) },
  ];

  const ACCOUNT_EMAIL = 'p.kiernan@skytek.com';

  const state = { open:false, preset:'', name:'', typeId:'', query:'', picked:[], from:'', to:'', showErrors:false, sections:[], threshold:'' };
  const errors = () => ({
    name: !state.name.trim(),
    type: !state.typeId,
    scope: !!state.typeId && !state.picked.length,
    from: !!state.typeId && !state.from,
    to: !!state.typeId && !state.to,
    order: !!(state.from && state.to && state.from > state.to),
  });
  const errClass = k => (state.showErrors && errors()[k]) ? ' has-err' : '';
  const cfg = () => TYPES.find(t => t.id === state.typeId) || null;
  const valid = () => {
    const c = cfg();
    if (c && c.sections && !state.sections.length) return false;
    return !!(state.name.trim() && state.typeId && state.picked.length && state.from && state.to && state.from <= state.to);
  };

  function scopeBody() {
    const c = cfg();
    if (!c) return `<div class="cnr-empty${state.showErrors && errors().type ? ' has-err' : ''}">${ic(ICO.doc, 22)}<span>Choose a report type to configure its scope.</span></div>`;
    const q = state.query.trim().toLowerCase();
    const list = c.items.filter(i => !q || i.name.toLowerCase().includes(q) || i.meta.toLowerCase().includes(q));
    return `
    <div class="cnr-field">
      <label class="cnr-lbl">${c.scopeLabel}${c.single ? '' : ` <span class="cnr-count">${state.picked.length} selected</span>`}</label>
      <p class="cnr-hint">${c.scopeHint}</p>
      <div class="cnr-search">${ic(ICO.search, 14)}<input type="text" id="cnr-search" placeholder="${c.searchPlaceholder}" value="${state.query.replace(/"/g, '&quot;')}" /></div>
      <div class="cnr-list scroll-thin${errClass('scope')}">
        ${list.length ? list.map(i => {
          const on = state.picked.includes(i.id);
          return `<button type="button" class="cnr-item${on ? ' on' : ''}" data-pick="${i.id}">
            <span class="cnr-box">${on ? ic(ICO.check, 11) : ''}</span>
            <span class="cnr-item-txt"><span class="cnr-item-name">${i.name}</span><span class="cnr-item-meta">${i.meta}</span></span>
          </button>`;
        }).join('') : `<div class="cnr-none">No matches for &ldquo;${state.query}&rdquo;</div>`}
      </div>
      ${state.showErrors && errors().scope ? `<p class="cnr-err">Select at least one ${c.scopeLabel.replace(/s$/, '').toLowerCase()}.</p>` : ''}
    </div>
    ${c.thresholds ? `
    <div class="cnr-field">
      <label class="cnr-lbl">${c.thresholdLabel}</label>
      <p class="cnr-hint">${c.thresholdHint}</p>
      <div class="cnr-presets">
        ${c.thresholds.map(t => `<button type="button" class="cnr-preset${state.threshold === t.id ? ' on' : ''}" data-threshold="${t.id}">${t.label}</button>`).join('')}
      </div>
    </div>` : ''}
    ${c.sections ? `
    <div class="cnr-field">
      <label class="cnr-lbl">${c.sectionsLabel} <span class="cnr-count">${state.sections.length} of ${c.sections.length}</span></label>
      <p class="cnr-hint">${c.sectionsHint}</p>
      <div class="cnr-secgrid">
        ${c.sections.map(s => {
          const on = state.sections.includes(s.id);
          return `<button type="button" class="cnr-sec${on ? ' on' : ''}" data-section="${s.id}">
            <span class="cnr-box">${on ? ic(ICO.check, 11) : ''}</span><span>${s.label}</span>
          </button>`;
        }).join('')}
      </div>
      ${state.showErrors && !state.sections.length ? '<p class="cnr-err">Include at least one exception section.</p>' : ''}
    </div>` : ''}
    <div class="cnr-field">
      <label class="cnr-lbl">Date range</label>
      <p class="cnr-hint">The reporting period the report covers.</p>
      <div class="cnr-presets">
        ${PRESETS.map(p => `<button type="button" class="cnr-preset${state.preset === p.id ? ' on' : ''}" data-preset="${p.id}">${p.label}</button>`).join('')}
      </div>
      <div class="cnr-dates">
        <label class="cnr-date${errClass('from')}"><span>From</span><input type="date" id="cnr-from" max="${TODAY}" value="${state.from}" /></label>
        <label class="cnr-date${errClass('to')}"><span>To</span><input type="date" id="cnr-to" max="${TODAY}" value="${state.to}" /></label>
      </div>
      ${errors().order ? '<p class="cnr-err">The From date must fall before the To date.</p>' : state.showErrors && (errors().from || errors().to) ? '<p class="cnr-err">Set both a From and a To date.</p>' : ''}
    </div>`;
  }

  function markup() {
    return `
    <div class="cnr-scrim" id="cnr-scrim">
      <div class="cnr-modal" role="dialog" aria-modal="true" aria-labelledby="cnr-title">
        <div class="cnr-head">
          <div>
            <div class="cnr-title" id="cnr-title">${state.phase === 'form' ? 'Create New Report' : 'Report generation'}</div>
            <div class="cnr-sub">${state.phase === 'form' ? (cfg() ? 'Name the report, then set its scope and period.' : 'Name the report, pick a type, then set its scope and period.') : 'Your request has been submitted.'}</div>
          </div>
          <button type="button" class="cnr-x" id="cnr-close" aria-label="Close">${ic(ICO.x, 16)}</button>
        </div>
        ${state.phase !== 'form' ? `<div class="cnr-body scroll-thin">${statusBody()}</div>
        <div class="cnr-foot"><button type="button" class="cnr-btn primary" id="cnr-status-btn">Done</button></div>` : `
        <div class="cnr-body scroll-thin">
          <div class="cnr-field">
            <label class="cnr-lbl" for="cnr-name">Report name</label>
            <input type="text" id="cnr-name" class="cnr-input${errClass('name')}" placeholder="e.g. Q3 Portfolio Risk Review" value="${state.name.replace(/"/g, '&quot;')}" />
            ${state.showErrors && errors().name ? '<p class="cnr-err">Give the report a name.</p>' : ''}
          </div>
          <div class="cnr-field">
            <label class="cnr-lbl">Report type</label>
            ${cfg() ? `<div class="cnr-typeval">${ic(ICO.doc, 15)}<span>${cfg().name}</span></div>` : `
              <select id="cnr-type" class="cnr-input${errClass('type')}">
                <option value="" selected>Select a report type…</option>
                ${TYPES.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
              </select>
              ${state.showErrors && errors().type ? '<p class="cnr-err">Choose a report type.</p>' : ''}`}
          </div>
          <div class="cnr-scope">${scopeBody()}</div>
        </div>
        <div class="cnr-foot">
          <button type="button" class="cnr-btn" id="cnr-cancel">Cancel</button>
          <button type="button" class="cnr-btn primary" id="cnr-create">Create Report</button>
        </div>`}
      </div>
    </div>`;
  }

  function host() {
    let el = document.getElementById('cnr-host');
    if (!el) { el = document.createElement('div'); el.id = 'cnr-host'; document.body.appendChild(el); }
    return el;
  }

  function render() {
    const el = host();
    if (!state.open) { el.innerHTML = ''; return; }
    el.innerHTML = markup();
    if (state.phase !== 'form') wireStatus(); else wire();
  }

  function close() { state.open = false; state.phase = 'form'; render(); }

  let job = null;

  function finishJob(j) {
    if (j.added) return;
    j.added = true;
    if (window.markSampleReportReady) window.markSampleReportReady(j.pending.title);
    if (!state.open) {
      if (window.showReportToast) window.showReportToast(`“${j.pending.title}” is ready in My Reports`);
      job = null;
    }
  }

  function startGenerating() {
    const c = cfg();
    const picks = c.items.filter(i => state.picked.includes(i.id));
    const title = state.name.trim();
    const fmt = d => d ? new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) : '';
    job = {
      step: 0, delivered: false, typeName: c.name,
      pending: {
        title, type: TYPE_BADGE[c.id] || c.name, href: TYPE_HREF[c.id],
        desc: `${c.name} covering ${picks.length} ${picks.length === 1 ? c.scopeLabel.replace(/s$/, '').toLowerCase() : c.scopeLabel.toLowerCase()}, ${fmt(state.from)} to ${fmt(state.to)}.`,
        pages: PAGE_COUNT[c.id] || 6, updated: TODAY,
        tags: picks.slice(0, 3).map(i => i.name).concat(picks.length > 3 ? [`+${picks.length - 3} more`] : []),
        status: 'generating',
      },
    };
    state.phase = 'queued';
    render();
    const j = job;
    if (window.addSampleReport) window.addSampleReport(j.pending);
    setTimeout(() => { j.delivered = true; finishJob(j); }, 6000);
  }

  function statusBody() {
    const j = job;
    if (!j) return '';
    return `
    <div class="cnr-status">
      <div class="cnr-status-ico ok">${ic(ICO.check, 22)}</div>
      <div class="cnr-status-t">Report queued for generation</div>
      <div class="cnr-status-d">&ldquo;${j.pending.title}&rdquo; &mdash; ${j.typeName}. We will email you as soon as it has been generated, and it will appear in My Reports.</div>
      <div class="cnr-note">${ic(ICO.mail, 15)}<span>A notification will be sent to <strong>${ACCOUNT_EMAIL}</strong>.</span></div>
    </div>`;
  }

  function wireStatus() {
    const g = id => document.getElementById(id);
    const shut = () => {
      const j = job;
      close();
      if (!j || !window.showReportToast) return;
      if (j.delivered) { window.showReportToast(`“${j.pending.title}” is ready in My Reports`); job = null; }
      else window.showReportToast(`“${j.pending.title}” is generating — we will email you when it is ready`);
    };
    g('cnr-close').onclick = shut;
    g('cnr-scrim').onclick = e => { if (e.target.id === 'cnr-scrim') shut(); };
    const b = g('cnr-status-btn'); if (b) b.onclick = shut;
    state.shut = shut;
  }

  function wire() {
    const g = id => document.getElementById(id);
    g('cnr-close').onclick = close;
    g('cnr-cancel').onclick = close;
    g('cnr-scrim').onclick = e => { if (e.target.id === 'cnr-scrim') close(); };
    const name = g('cnr-name');
    name.oninput = () => { state.name = name.value; if (state.showErrors) { const p = name.nextElementSibling; name.classList.toggle('has-err', !state.name.trim()); if (p && p.classList.contains('cnr-err')) p.style.display = state.name.trim() ? 'none' : ''; } };
    const typeSel = g('cnr-type');
    if (typeSel) typeSel.onchange = e => {
      state.typeId = e.target.value; state.picked = []; state.query = '';
      const c = cfg();
      state.sections = c && c.sections ? c.sections.map(s => s.id) : [];
      state.threshold = c && c.thresholdDefault ? c.thresholdDefault : '';
      render();
    };
    const s = g('cnr-search');
    if (s) { s.oninput = () => { state.query = s.value; const sc = document.querySelector('.cnr-scope'); sc.innerHTML = scopeBody(); wireScope(); s.focus(); }; }
    wireScope();
    g('cnr-create').onclick = () => {
      if (valid()) { startGenerating(); return; }
      state.showErrors = true;
      render();
      const first = document.querySelector('.cnr-body .has-err');
      if (first) { const f = first.matches('input,select') ? first : first.querySelector('input,select'); if (f) f.focus(); }
    };
    setTimeout(() => name.focus(), 30);
  }

  function wireScope() {
    const g = id => document.getElementById(id);
    document.querySelectorAll('[data-pick]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.pick, c = cfg();
        if (c.single) state.picked = state.picked[0] === id ? [] : [id];
        else state.picked = state.picked.includes(id) ? state.picked.filter(x => x !== id) : state.picked.concat(id);
        const sc = document.querySelector('.cnr-scope');
        sc.innerHTML = scopeBody(); wireScope();
        const s = g('cnr-search'); if (s) s.oninput = () => { state.query = s.value; sc.innerHTML = scopeBody(); wireScope(); g('cnr-search').focus(); };
      };
    });
    const redrawScope = keepFocus => {
      const sc = document.querySelector('.cnr-scope');
      if (!sc) return;
      sc.innerHTML = scopeBody();
      wireScope();
      if (keepFocus) { const el = g(keepFocus); if (el) { el.focus(); if (el.setSelectionRange && el.type === 'text') el.setSelectionRange(el.value.length, el.value.length); } }
    };
    document.querySelectorAll('[data-section]').forEach(b => {
      b.onclick = () => {
        const id = b.dataset.section;
        state.sections = state.sections.includes(id) ? state.sections.filter(x => x !== id) : state.sections.concat(id);
        redrawScope();
      };
    });
    document.querySelectorAll('[data-threshold]').forEach(b => {
      b.onclick = () => { state.threshold = b.dataset.threshold; redrawScope(); };
    });
    const setDate = (which, v) => { state[which] = v; state.preset = ''; redrawScope(); };
    const f = g('cnr-from'), t = g('cnr-to');
    if (f) { f.oninput = () => setDate('from', f.value); f.onchange = () => setDate('from', f.value); }
    if (t) { t.oninput = () => setDate('to', t.value); t.onchange = () => setDate('to', t.value); }
    document.querySelectorAll('[data-preset]').forEach(b => {
      b.onclick = () => {
        const p = PRESETS.find(x => x.id === b.dataset.preset);
        state.preset = p.id; state.from = p.from(); state.to = TODAY;
        redrawScope();
      };
    });
    const s = g('cnr-search');
    if (s) s.oninput = () => { state.query = s.value; redrawScope('cnr-search'); };
  }

  document.addEventListener('keydown', e => { if (e.key === 'Escape' && state.open) { if (state.phase !== 'form' && state.shut) state.shut(); else close(); } });

  window.createNewReport = {
    open(typeId, name) {
      Object.assign(state, { open:true, phase:'form', preset:'', name:'', typeId:'', query:'', picked:[], from:'', to:'', showErrors:false, sections:[], threshold:'' });
      if (typeId && TYPES.some(t => t.id === typeId)) {
        state.typeId = typeId;
        const c = TYPES.find(t => t.id === typeId);
        if (c.sections) state.sections = c.sections.map(s => s.id);
        if (c.thresholdDefault) state.threshold = c.thresholdDefault;
      }
      render();
    },
    types: TYPES,
  };
})();
