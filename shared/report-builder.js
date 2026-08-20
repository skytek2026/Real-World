/* Report Builder — Reports page, "Report Builder" tab.
   Exposes: window.reportBuilder = { content(), wire() } and is driven by
   Reports.html's tabContent()/switchTab() plumbing. Vanilla template strings,
   same visual vocabulary as the Weekly Fleet Reports / Competitor tabs. */
(function () {

/* ── Icons ──────────────────────────────────────────────────────────────── */
const ic = (name, size = 14, color = 'currentColor', sw = 2) => {
  const d = window.lucide && window.lucide.icons && window.lucide.icons[name];
  if (!d) return '';
  const kids = (d[2] || []).map(([t, a]) => `<${t} ${Object.entries(a).map(([k, v]) => `${k}="${v}"`).join(' ')} />`).join('');
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">${kids}</svg>`;
};

/* ── Reference data ─────────────────────────────────────────────────────── */
// exposure values in € millions
const REGIONS = [
  { id:'me',   name:'Middle East',   countries:[
    { name:'UAE', assets:1240, exp:620 }, { name:'Qatar', assets:480, exp:310 },
    { name:'Saudi Arabia', assets:980, exp:540 }, { name:'Oman', assets:320, exp:150 },
    { name:'Bahrain', assets:210, exp:95 }, { name:'Kuwait', assets:410, exp:230 } ] },
  { id:'eu',   name:'Europe',        countries:[
    { name:'United Kingdom', assets:1420, exp:710 }, { name:'Norway', assets:660, exp:480 },
    { name:'Netherlands', assets:540, exp:265 }, { name:'Greece', assets:735, exp:300 },
    { name:'Malta', assets:290, exp:120 } ] },
  { id:'apac', name:'Asia Pacific',  countries:[
    { name:'Singapore', assets:980, exp:520 }, { name:'China', assets:1180, exp:610 },
    { name:'Japan', assets:520, exp:280 }, { name:'Australia', assets:430, exp:245 } ] },
  { id:'waf',  name:'West Africa',   countries:[
    { name:'Nigeria', assets:610, exp:360 }, { name:'Ghana', assets:180, exp:85 },
    { name:'Angola', assets:295, exp:190 } ] },
  { id:'am',   name:'Americas',      countries:[
    { name:'United States', assets:1180, exp:640 }, { name:'Brazil', assets:390, exp:210 },
    { name:'Mexico', assets:260, exp:130 }, { name:'Panama', assets:194, exp:78 } ] },
];
const ALL_COUNTRIES = REGIONS.flatMap(r => r.countries.map(c => ({ ...c, region:r.name, regionId:r.id })));

const RB_PORTFOLIOS = [
  { id:'gep',  name:'Global Energy Programme', assets:1860, exp:1240 },
  { id:'mfp',  name:'Marine Fleet Portfolio',  assets:1450, exp:760 },
  { id:'apv',  name:'Asia Pacific Vessels',    assets:920,  exp:410 },
  { id:'euf',  name:'European Fleet',          assets:1105, exp:585 },
  { id:'avi',  name:'Aviation Assets',         assets:480,  exp:690 },
  { id:'cpr',  name:'Commercial Properties',   assets:2240, exp:520 },
  { id:'nse',  name:'North Sea Energy',        assets:640,  exp:615 },
];
const ASSET_TYPES = [
  { id:'vessel', name:'Vessel', assets:5240, exp:1980 },
  { id:'plat',   name:'Offshore Platform', assets:410, exp:1120 },
  { id:'air',    name:'Aircraft', assets:480, exp:690 },
  { id:'ref',    name:'Refinery', assets:96, exp:410 },
  { id:'term',   name:'Port Terminal', assets:238, exp:275 },
  { id:'prop',   name:'Commercial Property', assets:5680, exp:290 },
  { id:'pipe',   name:'Pipeline', assets:339, exp:55 },
];
const ASSETS = [
  { name:'MV Atlantic Star', type:'Vessel', country:'United Kingdom', exp:82 },
  { name:'MV Pacific Queen', type:'Vessel', country:'Singapore', exp:74 },
  { name:'Ras Laffan Terminal', type:'Port Terminal', country:'Qatar', exp:210 },
  { name:'Zakum Platform C', type:'Offshore Platform', country:'UAE', exp:340 },
  { name:'Jebel Ali Refinery', type:'Refinery', country:'UAE', exp:288 },
  { name:'Ekofisk Complex', type:'Offshore Platform', country:'Norway', exp:412 },
  { name:'MV Nordic Explorer', type:'Vessel', country:'Norway', exp:66 },
  { name:'Bonny Export Terminal', type:'Port Terminal', country:'Nigeria', exp:154 },
  { name:'A6-CFA Boeing 777F', type:'Aircraft', country:'UAE', exp:118 },
  { name:'Marina Towers Complex', type:'Commercial Property', country:'UAE', exp:96 },
];
const POLICIES = ['GEP-2026-0114 — Energy All Risks','MFP-2026-0088 — Hull & Machinery','AVI-2026-0031 — Aviation Hull','CPR-2026-0217 — Property Damage','NSE-2025-0904 — Offshore Construction'];
const INSUREDS = ['Orion Energy Holdings','Meridian Shipping Group','Levant Petrochemical','Northern Star Aviation','Gulf Terminal Partners','Adriatic Property Trust'];

const REPORT_TYPES = [
  { id:'region',    name:'Region',     icon:'Globe2',      desc:'Exposure across a geographic region and its countries' },
  { id:'portfolio', name:'Portfolio',  icon:'Layers',      desc:'Aggregation for one or more insured portfolios' },
  { id:'asset',     name:'Asset',      icon:'Ship',        desc:'Deep dive on individually selected assets' },
  { id:'assetType', name:'Asset Type', icon:'Boxes',       desc:'Compare exposure by asset classification' },
  { id:'exposure',  name:'Exposure',   icon:'TrendingUp',  desc:'Aggregate exposure, limits and accumulation' },
  { id:'risk',      name:'Risk',       icon:'ShieldAlert', desc:'Risk scoring, concentration and perils' },
  { id:'custom',    name:'Custom',     icon:'SlidersHorizontal', desc:'Start blank and choose every section yourself' },
];
const SCOPE_FIELDS = {
  region:    ['region','country','assetType','policy','dates'],
  portfolio: ['portfolio','assetType','insured','policy','dates'],
  asset:     ['asset','policy','insured','dates'],
  assetType: ['assetType','region','portfolio','dates'],
  exposure:  ['portfolio','region','assetType','policy','insured','dates'],
  risk:      ['region','portfolio','assetType','dates'],
  custom:    ['region','country','portfolio','asset','assetType','policy','insured','dates'],
};

const METRICS = [
  { id:'totalExp',  name:'Total Exposure' },
  { id:'tiv',       name:'Total Insured Value' },
  { id:'assetCnt',  name:'Asset Count' },
  { id:'pfCnt',     name:'Portfolio Count' },
  { id:'avgExp',    name:'Average Exposure' },
  { id:'maxExp',    name:'Maximum Exposure' },
  { id:'expRegion', name:'Exposure by Region' },
  { id:'expType',   name:'Exposure by Asset Type' },
  { id:'topExp',    name:'Top Exposures' },
  { id:'riskScore', name:'Risk Score' },
  { id:'geoConc',   name:'Geographic Concentration' },
];

const SECTION_DEFS = {
  exec:   { name:'Executive Summary', icon:'FileText', opts:[ { k:'length', label:'Length', values:['Short','Standard','Detailed'] }, { k:'highlights', label:'Include highlights', values:['Yes','No'] } ] },
  key:    { name:'Key Metrics', icon:'Gauge', opts:[ { k:'display', label:'Display', values:['Tiles','Table'] }, { k:'columns', label:'Columns', values:['2','3','4'] } ] },
  expBrk: { name:'Exposure Breakdown', icon:'BarChart3', opts:[ { k:'display', label:'Display', values:['Chart','Table','Both'] }, { k:'group', label:'Group by', values:['Asset Type','Portfolio','Country'] } ] },
  geo:    { name:'Geographic Exposure', icon:'Globe2', opts:[ { k:'display', label:'Display', values:['Map','Chart','Table','Metric'] }, { k:'group', label:'Group by', values:['Country','Region'] } ] },
  pfBrk:  { name:'Portfolio Breakdown', icon:'Layers', opts:[ { k:'display', label:'Display', values:['Chart','Table'] } ] },
  asBrk:  { name:'Asset Breakdown', icon:'Boxes', opts:[ { k:'display', label:'Display', values:['Chart','Table'] } ] },
  risk:   { name:'Risk Analysis', icon:'ShieldAlert', opts:[ { k:'display', label:'Display', values:['Chart','Table','Metric'] } ] },
  top:    { name:'Top Exposures', icon:'TrendingUp', opts:[ { k:'count', label:'Rows', values:['5','10','20'] } ] },
  table:  { name:'Detailed Asset Table', icon:'Table2', opts:[ { k:'rows', label:'Rows per page', values:['10','25','50'] } ] },
  map:    { name:'Map', icon:'Map', opts:[ { k:'basemap', label:'Basemap', values:['Light','Street','Dark'] }, { k:'clusters', label:'Cluster assets', values:['Yes','No'] } ] },
};
const defaultOpts = (id) => Object.fromEntries((SECTION_DEFS[id].opts).map(o => [o.k, o.values[0]]));
const mkSection = (id) => ({ id, uid: id + '-' + Math.random().toString(36).slice(2, 7), opts: defaultOpts(id) });

const TEMPLATES = [
  { id:'t-regional', name:'Regional Exposure',        type:'region',    icon:'Globe2',      desc:'Region + country breakdown with map',      metrics:['totalExp','assetCnt','expRegion','geoConc'], sections:['exec','key','geo','expBrk','top'] },
  { id:'t-pf',       name:'Portfolio Exposure',       type:'portfolio', icon:'Layers',      desc:'Portfolio aggregation and accumulation',   metrics:['totalExp','tiv','pfCnt','avgExp'],           sections:['exec','key','pfBrk','expBrk','table'] },
  { id:'t-hv',       name:'High Value Assets',        type:'asset',     icon:'Gem',         desc:'Largest single-asset exposures',           metrics:['maxExp','topExp','tiv'],                     sections:['exec','key','top','table','map'] },
  { id:'t-conc',     name:'Risk Concentration',       type:'risk',      icon:'ShieldAlert', desc:'Concentration and risk scoring',           metrics:['riskScore','geoConc','totalExp'],            sections:['exec','key','risk','geo','top'] },
  { id:'t-qtr',      name:'Quarterly Exposure Review',type:'exposure',  icon:'CalendarRange',desc:'Period-over-period exposure review',      metrics:['totalExp','tiv','assetCnt','avgExp','expType'], sections:['exec','key','expBrk','pfBrk','geo','top'] },
];

const FILTER_DEFS = [
  { k:'riskCat',  label:'Risk Category',  values:['All','Critical','High','Medium','Low'] },
  { k:'expRange', label:'Exposure Range', values:['All','> €10M','> €50M','> €100M','> €250M'] },
  { k:'status',   label:'Asset Status',   values:['All','Active','Laid up','In transit','Under repair'] },
];

/* ── Saved reports ──────────────────────────────────────────────────────── */
const STORE = 'rw_report_builder_v1';
const SEED = [
  { id:'r1', name:'Global Portfolio Exposure',      type:'exposure',  scope:'All portfolios · Worldwide',         owner:'A. Whelan',  created:'2026-04-02', modified:'2026-08-14', generated:'2026-08-14', status:'Generated' },
  { id:'r2', name:'Middle East Regional Exposure',  type:'region',    scope:'Middle East · 6 countries',          owner:'A. Whelan',  created:'2026-05-11', modified:'2026-08-11', generated:'2026-08-11', status:'Generated' },
  { id:'r3', name:'Energy Asset Aggregation',       type:'assetType', scope:'Platforms, Refineries · Worldwide',  owner:'M. Doyle',   created:'2026-06-01', modified:'2026-08-09', generated:'—',          status:'Draft' },
  { id:'r4', name:'High Value Asset Report',        type:'asset',     scope:'24 assets · > €100M',                owner:'S. Okafor',  created:'2026-06-22', modified:'2026-08-05', generated:'2026-08-05', status:'Generated' },
  { id:'r5', name:'Quarterly Portfolio Review',     type:'portfolio', scope:'Global Energy Programme · Q2 2026',  owner:'M. Doyle',   created:'2026-07-04', modified:'2026-08-01', generated:'2026-07-31', status:'Scheduled' },
];
function loadReports() { try { const s = JSON.parse(localStorage.getItem(STORE)); if (Array.isArray(s) && s.length) return s; } catch (e) {} return SEED.slice(); }
function saveReports() { try { localStorage.setItem(STORE, JSON.stringify(S.reports)); } catch (e) {} }

/* ── State ──────────────────────────────────────────────────────────────── */
const blankDraft = () => ({
  id:null, name:'Untitled report', type:null,
  scope:{ region:[], country:[], portfolio:[], asset:[], assetType:[], policy:[], insured:[], from:'2026-01-01', to:'2026-08-18' },
  filters:{ riskCat:'All', expRange:'All', status:'All' },
  metrics:['totalExp','assetCnt','avgExp'],
  sections:[mkSection('exec'), mkSection('key'), mkSection('expBrk')],
});
const S = {
  view:'list', reports:loadReports(), draft:blankDraft(), bgJob:null,
  q:'', fType:'All', fStatus:'All',
  panel:{ scope:true, filters:false, metrics:true, sections:true },
  openSection:null, gen:null, addOpen:false,
};

/* ── Derived figures ───────────────────────────────────────────────────── */
function tallies() {
  const d = S.draft, sc = d.scope;
  let assets = 12483, exp = 4820, source = 'Whole book';
  if (sc.asset.length) {
    const rows = ASSETS.filter(a => sc.asset.includes(a.name));
    assets = rows.length; exp = rows.reduce((s, a) => s + a.exp, 0); source = 'Selected assets';
  } else if (sc.country.length) {
    const rows = ALL_COUNTRIES.filter(c => sc.country.includes(c.name));
    assets = rows.reduce((s, c) => s + c.assets, 0); exp = rows.reduce((s, c) => s + c.exp, 0); source = 'Selected countries';
  } else if (sc.region.length) {
    const rows = ALL_COUNTRIES.filter(c => sc.region.includes(c.regionId));
    assets = rows.reduce((s, c) => s + c.assets, 0); exp = rows.reduce((s, c) => s + c.exp, 0); source = 'Selected regions';
  } else if (sc.portfolio.length) {
    const rows = RB_PORTFOLIOS.filter(p => sc.portfolio.includes(p.id));
    assets = rows.reduce((s, p) => s + p.assets, 0); exp = rows.reduce((s, p) => s + p.exp, 0); source = 'Selected portfolios';
  } else if (sc.assetType.length) {
    const rows = ASSET_TYPES.filter(t => sc.assetType.includes(t.id));
    assets = rows.reduce((s, t) => s + t.assets, 0); exp = rows.reduce((s, t) => s + t.exp, 0); source = 'Selected asset types';
  }
  const fr = { All:1, 'Critical':0.14, 'High':0.32, 'Medium':0.41, 'Low':0.63 }[d.filters.riskCat] || 1;
  const er = { All:1, '> €10M':0.78, '> €50M':0.42, '> €100M':0.23, '> €250M':0.09 }[d.filters.expRange] || 1;
  const sr = { All:1, 'Active':0.88, 'Laid up':0.06, 'In transit':0.31, 'Under repair':0.04 }[d.filters.status] || 1;
  const k = fr * er * sr;
  assets = Math.round(assets * k); exp = Math.round(exp * (er === 1 ? fr * sr : k * 1.4));
  const pfCnt = sc.portfolio.length || (sc.region.length || sc.country.length ? Math.max(4, Math.round(42 * k)) : Math.round(42 * (k === 1 ? 1 : Math.max(0.15, k))));
  return { assets, exp, pfCnt, source };
}
const fmtM = (m) => m >= 1000 ? '€' + (m / 1000).toFixed(2) + 'B' : '€' + Math.round(m) + 'M';
const fmtN = (n) => n.toLocaleString('en-US');
function metricValue(id, t) {
  switch (id) {
    case 'totalExp':  return fmtM(t.exp);
    case 'tiv':       return fmtM(Math.round(t.exp * 1.31));
    case 'assetCnt':  return fmtN(t.assets);
    case 'pfCnt':     return fmtN(t.pfCnt);
    case 'avgExp':    return t.assets ? '€' + (t.exp * 1e6 / t.assets / 1e3).toFixed(0) + 'k' : '—';
    case 'maxExp':    return fmtM(Math.round(t.exp * 0.086));
    case 'expRegion': return REGIONS.length + ' regions';
    case 'expType':   return ASSET_TYPES.length + ' types';
    case 'topExp':    return 'Top 10 listed';
    case 'riskScore': return (Math.min(96, 38 + Math.round(t.exp / 90))) + ' / 100';
    case 'geoConc':   return (Math.min(92, 34 + Math.round(t.assets / 260))) + '%';
    default: return '—';
  }
}
function scopeSummary(d = S.draft) {
  const sc = d.scope, bits = [];
  if (sc.region.length)    bits.push(sc.region.map(r => (REGIONS.find(x => x.id === r) || {}).name).join(', '));
  if (sc.country.length)   bits.push(sc.country.length + ' countries');
  if (sc.portfolio.length) bits.push(sc.portfolio.map(p => (RB_PORTFOLIOS.find(x => x.id === p) || {}).name).join(', '));
  if (sc.assetType.length) bits.push(sc.assetType.map(t => (ASSET_TYPES.find(x => x.id === t) || {}).name).join(', '));
  if (sc.asset.length)     bits.push(sc.asset.length + ' assets');
  if (sc.policy.length)    bits.push(sc.policy.length + ' policies');
  if (sc.insured.length)   bits.push(sc.insured.length + ' insureds');
  return bits.length ? bits.join(' · ') : 'Whole book · Worldwide';
}
const typeName = (id) => (REPORT_TYPES.find(t => t.id === id) || { name:'Custom' }).name;

/* ── Shared bits ───────────────────────────────────────────────────────── */
const STATUS_STYLE = { Generated:'background:#dcfce7;color:#15803d', Draft:'background:#f1f5f9;color:#475569', Scheduled:'background:#e0f2fe;color:#0369a1', Generating:'background:#fef3c7;color:#b45309' };
const GEN_STEPS = ['Resolving scope and filters', 'Aggregating exposure across assets', 'Building metrics and charts', 'Rendering sections', 'Finalising document'];
let genTimer = null;
function stopJob() { if (genTimer) { clearInterval(genTimer); genTimer = null; } }
function runJob() {
  stopJob();
  S.gen = { stage:'running', step:0 };
  const rec = persistDraft('Generating');
  rerender();
  genTimer = setInterval(() => {
    if (!S.gen || S.gen.stage !== 'running') {
      // job continues in the background
      if (S.bgJob) {
        S.bgJob.step++;
        if (S.bgJob.step >= GEN_STEPS.length) { stopJob(); const r = S.reports.find(x => x.id === S.bgJob.id); if (r) { r.status = 'Generated'; r.generated = nowISO(); saveReports(); } S.bgJob = null; rerender(); }
      }
      return;
    }
    S.gen.step++;
    if (S.gen.step >= GEN_STEPS.length) { stopJob(); S.gen = { stage:'done' }; persistDraft('Generated'); }
    rerender();
  }, 900);
  return rec;
}
const btn = (label, icon, act, kind = 'ghost', extra = '') =>
  `<button class="rb-btn rb-btn-${kind}" data-act="${act}" ${extra}>${icon ? ic(icon, 14) : ''}${label}</button>`;
const chk = (on) => `<span class="rb-cb${on ? ' on' : ''}">${on ? ic('Check', 11, '#fff', 3.5) : ''}</span>`;
const segmented = (name, values, current, dataAttrs) =>
  `<div class="rb-seg">${values.map(v => `<button class="rb-seg-b${v === current ? ' on' : ''}" ${dataAttrs} data-val="${v}">${v}</button>`).join('')}</div>`;

/* ── View: landing ─────────────────────────────────────────────────────── */
function listView() {
  const q = S.q.toLowerCase();
  const rows = S.reports.filter(r =>
    (!q || r.name.toLowerCase().includes(q) || r.scope.toLowerCase().includes(q) || r.owner.toLowerCase().includes(q)) &&
    (S.fType === 'All' || typeName(r.type) === S.fType) &&
    (S.fStatus === 'All' || r.status === S.fStatus));
  const th = (label, align = 'left') => `<th style="text-align:${align};padding:12px 16px;font-size:11px;font-weight:600;color:#6B7280;text-transform:uppercase;letter-spacing:.04em;background:#F9FAFB;white-space:nowrap">${label}</th>`;
  return `
  <div class="rb-root scroll-thin" style="flex:1;min-height:0;overflow:auto;background:#f8fafc">
    <div style="padding:16px 20px;background:#fff;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
      <div style="position:relative;flex:1;min-width:220px;max-width:420px">
        <span style="position:absolute;left:13px;top:50%;transform:translateY(-50%);display:flex;pointer-events:none">${ic('Search', 13, '#94a3b8')}</span>
        <input id="rb-q" class="rb-search" type="text" placeholder="Search reports, scope or owner…" value="${S.q.replace(/"/g, '&quot;')}" />
      </div>
      <select id="rb-ftype" class="rb-select" style="width:158px" aria-label="Report type">
        ${['All'].concat(REPORT_TYPES.map(t => t.name)).map(t => `<option ${S.fType === t ? 'selected' : ''}>${t}</option>`).join('')}
      </select>
      <select id="rb-fstatus" class="rb-select" style="width:140px" aria-label="Status">
        ${['All', 'Generated', 'Draft', 'Scheduled'].map(t => `<option ${S.fStatus === t ? 'selected' : ''}>${t}</option>`).join('')}
      </select>
      <div style="margin-left:auto;display:flex;align-items:center;gap:8px">
        ${S.bgJob ? `<button class="rb-job" data-act="jobopen">${ic('Loader', 12)}Generating ${GEN_STEPS[Math.min(S.bgJob.step, GEN_STEPS.length - 1)]}…</button>` : ''}
        ${btn('New Report', 'Plus', 'new', 'primary')}
      </div>
    </div>

    <div style="padding:16px 20px 4px">
      <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:10px">
        <div style="font-size:13px;font-weight:700;color:#0f172a">Start from a template</div>
        <div style="font-size:12px;color:#94a3b8">Pre-configured for common insurance use cases</div>
      </div>
      <div class="rb-tpl-grid">
        ${TEMPLATES.map(t => `
          <button class="rb-tpl" data-tpl="${t.id}">
            <span style="display:flex;align-items:center;gap:8px;color:var(--brand-600,#2563eb)">${ic(t.icon, 15)}<span style="font-size:13px;font-weight:700;color:#0f172a">${t.name}</span></span>
            <span style="font-size:11.5px;color:#64748b;line-height:1.45">${t.desc}</span>
            <span style="font-size:11px;font-weight:600;color:#94a3b8">${t.sections.length} sections · ${t.metrics.length} metrics</span>
          </button>`).join('')}
      </div>
    </div>

    <div style="padding:16px 20px 20px">
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden">
        <div style="padding:12px 16px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px">
          <div style="font-size:13px;font-weight:700;color:#0f172a">Saved reports</div>
          <div style="font-size:12px;color:#94a3b8">${rows.length} of ${S.reports.length}</div>
        </div>
        <div style="overflow:auto" class="scroll-thin">
          <table style="width:100%;border-collapse:collapse;font-size:13px;min-width:940px">
            <thead><tr style="border-bottom:1px solid #e2e8f0">
              ${th('Report Name')}${th('Type')}${th('Scope')}${th('Owner')}${th('Last Modified')}${th('Last Generated')}${th('Status')}${th('Actions', 'right')}
            </tr></thead>
            <tbody>
              ${rows.length === 0 ? `<tr><td colspan="8" style="padding:44px;text-align:center;color:#94a3b8">No reports match your filters.</td></tr>` : rows.map(r => `
                <tr style="border-bottom:1px solid #f1f5f9">
                  <td style="padding:13px 16px"><button class="rb-link" data-open="${r.id}">${ic('FileText', 14, 'var(--brand-600,#2563eb)')}<span>${r.name}</span></button></td>
                  <td style="padding:13px 16px;color:#475569;white-space:nowrap">${typeName(r.type)}</td>
                  <td style="padding:13px 16px;color:#475569">${r.scope}</td>
                  <td style="padding:13px 16px;color:#475569;white-space:nowrap">${r.owner}</td>
                  <td style="padding:13px 16px;color:#475569;white-space:nowrap">${r.modified}</td>
                  <td style="padding:13px 16px;color:#475569;white-space:nowrap">${r.generated}</td>
                  <td style="padding:13px 16px"><span style="font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;white-space:nowrap;${STATUS_STYLE[r.status] || STATUS_STYLE.Draft}">${r.status}</span></td>
                  <td style="padding:13px 16px;text-align:right;white-space:nowrap">
                    <span style="display:inline-flex;gap:6px">
                      ${btn('Open', 'PenLine', 'open', 'ghost', `data-id="${r.id}"`)}
                      ${btn('Generate', 'Play', 'quickgen', 'ghost', `data-id="${r.id}"`)}
                      <button class="rb-icon-btn" data-act="dup" data-id="${r.id}" title="Duplicate">${ic('Copy', 14)}</button>
                      <button class="rb-icon-btn rb-danger" data-act="del" data-id="${r.id}" title="Delete">${ic('Trash2', 14)}</button>
                    </span>
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>`;
}

/* ── View: type picker ─────────────────────────────────────────────────── */
function typeView() {
  return `
  <div class="rb-root scroll-thin" style="flex:1;min-height:0;overflow:auto;background:#f8fafc">
    <div style="padding:14px 20px;background:#fff;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:12px">
      ${btn('Back', 'ArrowLeft', 'back')}
      <div><div style="font-size:14px;font-weight:700;color:#0f172a">Create report</div>
      <div style="font-size:12px;color:#64748b">Step 1 of 2 — choose what the report is about</div></div>
    </div>
    <div style="padding:20px;max-width:1080px">
      <div class="rb-type-grid">
        ${REPORT_TYPES.map(t => `
          <button class="rb-type" data-type="${t.id}">
            <span class="rb-type-ico">${ic(t.icon, 17, 'var(--brand-600,#2563eb)')}</span>
            <span style="font-size:13.5px;font-weight:700;color:#0f172a">${t.name}</span>
            <span style="font-size:12px;color:#64748b;line-height:1.45">${t.desc}</span>
          </button>`).join('')}
      </div>
    </div>
  </div>`;
}

/* ── Builder: scope controls ───────────────────────────────────────────── */
function multiRow(label, items, selected, kind) {
  return `
  <div class="rb-field">
    <div class="rb-field-label">${label}</div>
    <div class="rb-list scroll-thin">
      ${items.map(i => `<button class="rb-opt" data-multi="${kind}" data-val="${i.v}">${chk(selected.includes(i.v))}<span>${i.l}</span>${i.meta ? `<span class="rb-opt-meta">${i.meta}</span>` : ''}</button>`).join('')}
    </div>
  </div>`;
}
function scopePanel() {
  const d = S.draft, fields = SCOPE_FIELDS[d.type] || SCOPE_FIELDS.custom, out = [];
  if (fields.includes('region'))    out.push(multiRow('Region', REGIONS.map(r => ({ v:r.id, l:r.name, meta:r.countries.length + ' countries' })), d.scope.region, 'region'));
  if (fields.includes('country')) {
    const pool = d.scope.region.length ? ALL_COUNTRIES.filter(c => d.scope.region.includes(c.regionId)) : ALL_COUNTRIES;
    out.push(multiRow('Country', pool.map(c => ({ v:c.name, l:c.name, meta:fmtM(c.exp) })), d.scope.country, 'country'));
  }
  if (fields.includes('portfolio')) out.push(multiRow('Portfolio', RB_PORTFOLIOS.map(p => ({ v:p.id, l:p.name, meta:fmtM(p.exp) })), d.scope.portfolio, 'portfolio'));
  if (fields.includes('asset'))     out.push(multiRow('Asset', ASSETS.map(a => ({ v:a.name, l:a.name, meta:fmtM(a.exp) })), d.scope.asset, 'asset'));
  if (fields.includes('assetType')) out.push(multiRow('Asset Type', ASSET_TYPES.map(t => ({ v:t.id, l:t.name, meta:fmtN(t.assets) })), d.scope.assetType, 'assetType'));
  if (fields.includes('policy'))    out.push(multiRow('Policy', POLICIES.map(p => ({ v:p, l:p })), d.scope.policy, 'policy'));
  if (fields.includes('insured'))   out.push(multiRow('Insured', INSUREDS.map(p => ({ v:p, l:p })), d.scope.insured, 'insured'));
  out.push(`
    <div class="rb-field">
      <div class="rb-field-label">Date range</div>
      <div style="display:flex;gap:8px">
        <input type="date" class="rb-input" id="rb-from" value="${d.scope.from}" />
        <input type="date" class="rb-input" id="rb-to" value="${d.scope.to}" />
      </div>
    </div>`);
  return out.join('');
}
function filtersPanel() {
  const d = S.draft;
  return `
    <div class="rb-field"><div class="rb-field-label">Geography</div>
      <div style="font-size:12px;color:#64748b">${d.scope.region.length || d.scope.country.length ? scopeSummary() : 'Worldwide — narrow it in Scope'}</div></div>
    ${FILTER_DEFS.map(f => `<div class="rb-field"><div class="rb-field-label">${f.label}</div>${segmented(f.k, f.values, d.filters[f.k], `data-filter="${f.k}"`)}</div>`).join('')}`;
}
function metricsPanel() {
  const d = S.draft, t = tallies();
  return `
    <div class="rb-field">
      <div class="rb-field-label">Selected — drag order with the arrows</div>
      <div class="rb-order">
        ${d.metrics.length === 0 ? `<div class="rb-empty">No metrics selected yet.</div>` : d.metrics.map((m, i) => `
          <div class="rb-order-row">
            <span style="color:#cbd5e1">${ic('GripVertical', 14)}</span>
            <span style="flex:1;font-size:12.5px;font-weight:600;color:#0f172a">${(METRICS.find(x => x.id === m) || {}).name}</span>
            <span style="font-size:12px;font-weight:700;color:var(--brand-600,#2563eb);font-variant-numeric:tabular-nums">${metricValue(m, t)}</span>
            <button class="rb-mini" data-mup="${i}" ${i === 0 ? 'disabled' : ''} title="Move up">${ic('ChevronUp', 13)}</button>
            <button class="rb-mini" data-mdn="${i}" ${i === d.metrics.length - 1 ? 'disabled' : ''} title="Move down">${ic('ChevronDown', 13)}</button>
            <button class="rb-mini rb-danger" data-mrm="${m}" title="Remove">${ic('X', 13)}</button>
          </div>`).join('')}
      </div>
    </div>
    <div class="rb-field">
      <div class="rb-field-label">Available</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${METRICS.filter(m => !d.metrics.includes(m.id)).map(m => `<button class="rb-chip-add" data-madd="${m.id}">${ic('Plus', 12)}${m.name}</button>`).join('') || `<span class="rb-empty">All metrics added.</span>`}
      </div>
    </div>`;
}
function sectionsPanel() {
  const d = S.draft;
  const remaining = Object.keys(SECTION_DEFS).filter(k => !d.sections.some(s => s.id === k));
  return `
    <div class="rb-field">
      <div class="rb-order">
        ${d.sections.length === 0 ? `<div class="rb-empty">No sections — add one below.</div>` : d.sections.map((s, i) => {
          const def = SECTION_DEFS[s.id], open = S.openSection === s.uid;
          return `
          <div class="rb-sec${open ? ' open' : ''}">
            <div class="rb-order-row">
              <span style="color:#cbd5e1">${ic('GripVertical', 14)}</span>
              <span style="color:var(--brand-600,#2563eb);display:flex">${ic(def.icon, 14)}</span>
              <span style="flex:1;font-size:12.5px;font-weight:600;color:#0f172a">${def.name}</span>
              <button class="rb-mini" data-sup="${i}" ${i === 0 ? 'disabled' : ''} title="Move up">${ic('ChevronUp', 13)}</button>
              <button class="rb-mini" data-sdn="${i}" ${i === d.sections.length - 1 ? 'disabled' : ''} title="Move down">${ic('ChevronDown', 13)}</button>
              <button class="rb-mini${open ? ' on' : ''}" data-scfg="${s.uid}" title="Configure">${ic('Settings2', 13)}</button>
              <button class="rb-mini rb-danger" data-srm="${s.uid}" title="Remove">${ic('X', 13)}</button>
            </div>
            ${open ? `<div class="rb-sec-cfg">${def.opts.map(o => `
              <div class="rb-cfg-row"><span class="rb-cfg-label">${o.label}</span>${segmented(o.k, o.values, s.opts[o.k], `data-sopt="${s.uid}" data-key="${o.k}"`)}</div>`).join('')}</div>` : ''}
          </div>`;
        }).join('')}
      </div>
    </div>
    <div class="rb-field">
      <div class="rb-field-label">Add section</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${remaining.map(k => `<button class="rb-chip-add" data-sadd="${k}">${ic('Plus', 12)}${SECTION_DEFS[k].name}</button>`).join('') || `<span class="rb-empty">All sections added.</span>`}
      </div>
    </div>`;
}

/* ── Builder: report outline (structure only — no live rendering) ───────── */
const SKEL = {
  text:  '<div class="rb-sk"><span style="width:100%"></span><span style="width:96%"></span><span style="width:72%"></span></div>',
  tiles: '<div class="rb-sk-tiles"><span></span><span></span><span></span></div>',
  chart: '<div class="rb-sk-chart">' + [58,84,42,70,34,52].map(h => '<span style="height:' + h + '%"></span>').join('') + '</div>',
  table: '<div class="rb-sk"><span style="width:100%;height:12px"></span><span style="width:100%"></span><span style="width:100%"></span><span style="width:88%"></span></div>',
  map:   '<div class="rb-sk-map"></div>',
  metric:'<div class="rb-sk-tiles"><span></span><span></span></div>',
};
function skelFor(s) {
  const o = s.opts;
  if (s.id === 'exec') return SKEL.text;
  if (s.id === 'map') return SKEL.map;
  if (s.id === 'top' || s.id === 'table') return SKEL.table;
  if (s.id === 'key') return o.display === 'Table' ? SKEL.table : SKEL.tiles;
  const disp = o.display || 'Chart';
  if (disp === 'Map') return SKEL.map;
  if (disp === 'Table') return SKEL.table;
  if (disp === 'Metric') return SKEL.metric;
  if (disp === 'Both') return SKEL.chart + SKEL.table;
  return SKEL.chart;
}
function outlineWhat(s) {
  const o = s.opts, d = S.draft;
  switch (s.id) {
    case 'exec':   return o.length + ' narrative summary of scope, exposure and concentration' + (o.highlights === 'Yes' ? ', with highlights' : '');
    case 'key':    return (d.metrics.length || 3) + ' selected metrics as ' + o.display.toLowerCase() + (o.display === 'Tiles' ? ' in ' + o.columns + ' columns' : '');
    case 'expBrk': return 'Exposure ' + o.display.toLowerCase() + ' grouped by ' + o.group.toLowerCase();
    case 'geo':    return o.display + ' of exposure grouped by ' + o.group.toLowerCase();
    case 'pfBrk':  return 'Per-portfolio exposure as ' + o.display.toLowerCase();
    case 'asBrk':  return 'Per-asset-type exposure as ' + o.display.toLowerCase();
    case 'risk':   return 'Risk bands and scoring as ' + o.display.toLowerCase();
    case 'top':    return 'Top ' + o.count + ' exposures ranked by value';
    case 'table':  return 'Full asset schedule, ' + o.rows + ' rows per page';
    case 'map':    return o.basemap + ' basemap' + (o.clusters === 'Yes' ? ', clustered assets' : ', individual assets');
    default:       return '';
  }
}
function sectionOutline(s, i) {
  const def = SECTION_DEFS[s.id];
  return `
  <div class="rb-ol">
    <div class="rb-ol-num">${i + 1}</div>
    <div class="rb-ol-main">
      <div class="rb-ol-t">${ic(def.icon, 14, 'var(--brand-600,#2563eb)')}${def.name}</div>
      <div class="rb-ol-d">${outlineWhat(s)}</div>
      <div class="rb-ol-chips">${def.opts.map(o => `<span class="rb-ol-chip">${o.label}: <strong>${s.opts[o.k]}</strong></span>`).join('')}</div>
    </div>
    <div class="rb-ol-skel">${skelFor(s)}</div>
  </div>`;
}

function builderView() {
  const d = S.draft, t = tallies();
  const panel = (key, label, icon, body) => `
    <div class="rb-panel${S.panel[key] ? ' open' : ''}">
      <button class="rb-panel-h" data-panel="${key}">${ic(icon, 14, 'var(--brand-600,#2563eb)')}<span>${label}</span>${ic(S.panel[key] ? 'ChevronUp' : 'ChevronDown', 14, '#94a3b8')}</button>
      ${S.panel[key] ? `<div class="rb-panel-b">${body}</div>` : ''}
    </div>`;
  return `
  <div class="rb-root" style="flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden;background:#f8fafc">
    <div style="padding:11px 20px;background:#fff;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:12px;flex-wrap:wrap;flex-shrink:0">
      ${btn('Back', 'ArrowLeft', 'back')}
      <input id="rb-name" class="rb-title-input" value="${d.name.replace(/"/g, '&quot;')}" aria-label="Report name" />
      <span class="rb-type-pill">${ic((REPORT_TYPES.find(x => x.id === d.type) || {}).icon || 'SlidersHorizontal', 13)}${typeName(d.type)}</span>
      <div style="margin-left:auto;display:flex;gap:8px">
        ${btn('Save', 'Save', 'save')}
        ${btn('Generate Report', 'Play', 'gensummary', 'primary')}
      </div>
    </div>
    <div class="rb-body scroll-thin">
      <div class="rb-rail scroll-thin">
        ${panel('scope', 'Scope', 'Target', scopePanel())}
        ${panel('filters', 'Filters', 'Filter', filtersPanel())}
        ${panel('metrics', 'Metrics', 'Gauge', metricsPanel())}
        ${panel('sections', 'Report Sections', 'LayoutList', sectionsPanel())}
      </div>
      <div class="rb-canvas-wrap scroll-thin">
        <div class="rb-livebar">
          ${[['Matching assets', fmtN(t.assets)], ['Total exposure', fmtM(t.exp)], ['Portfolios', fmtN(t.pfCnt)], ['Sections', String(d.sections.length)]].map(([l, v]) => `
            <div class="rb-live"><span>${l}</span><strong>${v}</strong></div>`).join('')}
          <span style="margin-left:auto;font-size:11.5px;color:#94a3b8">${t.source} · matching this configuration</span>
        </div>
        <div class="rb-page">
          <div class="rb-page-head">
            <div>
              <div style="font-size:17px;font-weight:800;color:#0f172a;letter-spacing:-.01em">${d.name}</div>
              <div style="font-size:11.5px;color:#64748b;margin-top:3px">${typeName(d.type)} report · ${scopeSummary()} · ${d.scope.from} → ${d.scope.to}</div>
            </div>
            <div style="font-size:10.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em">Skytek RealWorld</div>
          </div>
          <div class="rb-note">${ic('Info', 14, '#64748b')}<span><strong>Structure only.</strong> Charts, tables and maps are populated when the report is generated — aggregation across ${fmtN(t.assets)} assets runs as a background job.</span></div>
          ${d.sections.length === 0
            ? `<div class="rb-empty" style="padding:34px;text-align:center">Add sections in the left rail to build the report structure.</div>`
            : d.sections.map((s, i) => sectionOutline(s, i)).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

/* ── Generate overlay ──────────────────────────────────────────────────── */
function genOverlay() {
  const d = S.draft, t = tallies(), g = S.gen;
  if (!g) return '';
  const rowsSummary = [
    ['Report type', typeName(d.type)],
    ['Scope', scopeSummary()],
    ['Date range', d.scope.from + ' → ' + d.scope.to],
    ['Filters', FILTER_DEFS.map(f => d.filters[f.k]).every(v => v === 'All') ? 'None applied' : FILTER_DEFS.filter(f => d.filters[f.k] !== 'All').map(f => f.label + ': ' + d.filters[f.k]).join(' · ')],
    ['Assets', fmtN(t.assets)],
    ['Total exposure', fmtM(t.exp)],
    ['Sections', d.sections.map(s => SECTION_DEFS[s.id].name).join(', ') || '—'],
  ];
  const body = g.stage === 'summary' ? `
    <div class="rb-modal-b">
      <table style="width:100%;border-collapse:collapse;font-size:12.5px">
        ${rowsSummary.map(([k, v]) => `<tr><td style="padding:9px 0;width:150px;color:#64748b;vertical-align:top">${k}</td><td style="padding:9px 0;color:#0f172a;font-weight:600">${v}</td></tr>`).join('')}
      </table>
    </div>
    <div class="rb-modal-f">${btn('Cancel', '', 'genclose')}${btn('Generate', 'Play', 'genrun', 'primary')}</div>`
  : g.stage === 'running' ? `
    <div class="rb-modal-b">
      <div style="display:flex;align-items:center;gap:11px">
        <div class="rb-spin"></div>
        <div><div style="font-size:13px;font-weight:700;color:#0f172a">Generating ${d.name}</div>
        <div style="font-size:12px;color:#64748b">Aggregating ${fmtN(t.assets)} assets across ${d.sections.length} sections — this can take a few minutes.</div></div>
      </div>
      <div class="rb-prog"><span style="width:${Math.round((g.step + 1) / GEN_STEPS.length * 100)}%"></span></div>
      <div class="rb-steps">
        ${GEN_STEPS.map((s, i) => `<div class="rb-step${i < g.step ? ' done' : i === g.step ? ' now' : ''}">${i < g.step ? ic('Check', 12, '#16a34a', 3) : i === g.step ? ic('Loader', 12, 'var(--brand-600,#2563eb)') : ic('Circle', 12, '#cbd5e1')}<span>${s}</span></div>`).join('')}
      </div>
      <div style="margin-top:12px;font-size:11.5px;color:#94a3b8">You can leave this running — the report appears in Saved reports when it completes.</div>
    </div>
    <div class="rb-modal-f">${btn('Run in background', 'Minimize2', 'genbg')}${btn('Cancel job', '', 'gencancel')}</div>` : `
    <div class="rb-modal-b">
      <div style="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px">
        ${ic('CircleCheck', 18, '#16a34a')}
        <div><div style="font-size:13px;font-weight:700;color:#15803d">Report generated</div>
        <div style="font-size:12px;color:#166534">${d.sections.length} sections · ${fmtN(t.assets)} assets · ${fmtM(t.exp)} exposure · finished ${new Date().toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' })}</div></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:14px">
        ${[['View Report', 'Eye', 'view'], ['Download PDF', 'Download', 'pdf'], ['Export Excel', 'Sheet', 'xls'], ['Share', 'Share2', 'share']].map(([l, i, a]) => `<button class="rb-btn rb-btn-ghost" data-act="post-${a}" style="justify-content:center">${ic(i, 14)}${l}</button>`).join('')}
      </div>
      ${g.toast ? `<div style="margin-top:10px;font-size:12px;color:#64748b">${g.toast}</div>` : ''}
    </div>
    <div class="rb-modal-f">${btn('Close', '', 'genclose')}${btn('Save Report', 'Save', 'savedone', 'primary')}</div>`;
  return `
  <div class="rb-overlay" data-act="overlay">
    <div class="rb-modal" data-stop="1">
      <div class="rb-modal-h">
        <span style="display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:#0f172a">${ic('FileText', 15, 'var(--brand-600,#2563eb)')}${g.stage === 'done' ? 'Report ready' : 'Generate report'}</span>
        <button class="rb-icon-btn" data-act="genclose" title="Close">${ic('X', 14)}</button>
      </div>
      ${body}
    </div>
  </div>`;
}

/* ── Styles ────────────────────────────────────────────────────────────── */
const CSS = `
.rb-root{font-size:13px;color:#0f172a}
.rb-btn{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 12px;border-radius:8px;font-family:inherit;font-size:12.5px;font-weight:600;cursor:pointer;transition:background .15s,border-color .15s,opacity .15s;white-space:nowrap}
.rb-btn-ghost{background:#fff;border:1px solid #e2e8f0;color:#334155}
.rb-btn-ghost:hover{background:#f8fafc;border-color:#cbd5e1}
.rb-btn-primary{background:var(--brand-600,#2563eb);border:1px solid var(--brand-600,#2563eb);color:#fff}
.rb-btn-primary:hover{background:var(--brand-700,#1d4ed8)}
.rb-icon-btn{width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;background:#fff;border:1px solid #e2e8f0;border-radius:8px;color:#475569;cursor:pointer}
.rb-icon-btn:hover{background:#f8fafc;border-color:#cbd5e1}
.rb-icon-btn.rb-danger:hover{background:#fef2f2;border-color:#fecaca;color:#dc2626}
.rb-link{display:inline-flex;align-items:center;gap:8px;background:0;border:0;padding:0;font:inherit;font-size:13px;font-weight:600;color:var(--brand-600,#2563eb);cursor:pointer}
.rb-link:hover span{text-decoration:underline}
.rb-search{width:100%;height:34px;padding:0 12px 0 34px;border:1px solid #e2e8f0;border-radius:9999px;font-family:inherit;font-size:13px;color:#334155;background:#f8fafc;outline:none;transition:border-color .15s,box-shadow .15s,background .15s}
.rb-search:focus{border-color:var(--brand-300,#93c5fd);box-shadow:0 0 0 3px rgba(37,99,235,.12);background:#fff}
.rb-select{height:34px;border:1px solid #e2e8f0;border-radius:8px;padding:0 28px 0 10px;font-family:inherit;font-size:12.5px;font-weight:600;color:#334155;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 10px center;appearance:none;-webkit-appearance:none;cursor:pointer;outline:none}
.rb-tpl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(215px,1fr));gap:10px}
.rb-tpl{display:flex;flex-direction:column;gap:6px;align-items:flex-start;text-align:left;padding:13px 14px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;cursor:pointer;font-family:inherit;transition:border-color .15s,box-shadow .15s}
.rb-tpl:hover{border-color:var(--brand-300,#93c5fd);box-shadow:0 2px 10px rgba(37,99,235,.1)}
.rb-type-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
.rb-type{display:flex;flex-direction:column;gap:8px;align-items:flex-start;text-align:left;padding:16px;background:#fff;border:1px solid #e2e8f0;border-radius:14px;cursor:pointer;font-family:inherit;transition:border-color .15s,box-shadow .15s,transform .15s}
.rb-type:hover{border-color:var(--brand-300,#93c5fd);box-shadow:0 4px 14px rgba(37,99,235,.1)}
.rb-type-ico{width:34px;height:34px;border-radius:10px;background:var(--brand-50,#eff6ff);display:flex;align-items:center;justify-content:center}
.rb-body{flex:1;min-height:0;display:grid;grid-template-columns:352px minmax(0,1fr)}
@supports (-moz-appearance:none){.rb-body,.rb-rail,.rb-canvas-wrap,.rb-list{scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent}}
.rb-rail{border-right:1px solid #e2e8f0;background:#fff;overflow:auto;min-height:0}
.rb-panel{border-bottom:1px solid #f1f5f9}
.rb-panel-h{width:100%;display:flex;align-items:center;gap:8px;padding:12px 16px;background:0;border:0;font-family:inherit;font-size:12.5px;font-weight:700;color:#0f172a;cursor:pointer;text-align:left}
.rb-panel-h span{flex:1}
.rb-panel-h:hover{background:#f8fafc}
.rb-panel-b{padding:2px 16px 14px;display:flex;flex-direction:column;gap:12px}
.rb-field-label{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px}
.rb-list{max-height:172px;overflow:auto;border:1px solid #e2e8f0;border-radius:10px}
.rb-opt{width:100%;display:flex;align-items:center;gap:9px;padding:8px 10px;background:0;border:0;border-bottom:1px solid #f1f5f9;font-family:inherit;font-size:12.5px;color:#334155;cursor:pointer;text-align:left}
.rb-opt:last-child{border-bottom:0}
.rb-opt:hover{background:#f8fafc}
.rb-opt span:nth-child(2){flex:1}
.rb-opt-meta{font-size:11px;font-weight:600;color:#94a3b8;font-variant-numeric:tabular-nums}
.rb-cb{width:16px;height:16px;border-radius:4px;border:1.5px solid #cbd5e1;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.rb-cb.on{background:var(--brand-600,#2563eb);border-color:var(--brand-600,#2563eb)}
.rb-input{flex:1;min-width:0;height:32px;border:1px solid #e2e8f0;border-radius:8px;padding:0 8px;font-family:inherit;font-size:12.5px;color:#334155;background:#f8fafc;outline:none}
.rb-input:focus{border-color:var(--brand-300,#93c5fd);box-shadow:0 0 0 2px rgba(37,99,235,.1);background:#fff}
.rb-seg{display:inline-flex;flex-wrap:wrap;gap:4px;padding:3px;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:9999px}
.rb-seg-b{height:24px;padding:0 10px;border:0;border-radius:9999px;background:0;font-family:inherit;font-size:11.5px;font-weight:600;color:#64748b;cursor:pointer;transition:background .15s,color .15s}
.rb-seg-b:hover{color:#0f172a}
.rb-seg-b.on{background:var(--brand-600,#2563eb);color:#fff}
.rb-order{display:flex;flex-direction:column;gap:6px}
.rb-order-row{display:flex;align-items:center;gap:7px;padding:7px 9px;background:#fff;border:1px solid #e2e8f0;border-radius:9px}
.rb-mini{width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;border:1px solid #e2e8f0;border-radius:6px;background:#fff;color:#475569;cursor:pointer;flex-shrink:0}
.rb-mini:hover{background:#f1f5f9}
.rb-mini.on{background:var(--brand-50,#eff6ff);border-color:var(--brand-200,#bfdbfe);color:var(--brand-600,#2563eb)}
.rb-mini:disabled{opacity:.35;cursor:not-allowed}
.rb-mini.rb-danger:hover{background:#fef2f2;border-color:#fecaca;color:#dc2626}
.rb-sec{border-radius:9px}
.rb-sec.open{border:1px solid var(--brand-200,#bfdbfe);background:var(--brand-50,#eff6ff)}
.rb-sec.open .rb-order-row{border-color:transparent;background:transparent}
.rb-sec-cfg{padding:0 10px 10px;display:flex;flex-direction:column;gap:8px}
.rb-cfg-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.rb-cfg-label{font-size:11.5px;font-weight:600;color:#475569;min-width:88px}
.rb-chip-add{display:inline-flex;align-items:center;gap:5px;height:26px;padding:0 10px;border:1px dashed #cbd5e1;border-radius:9999px;background:#fff;font-family:inherit;font-size:11.5px;font-weight:600;color:#475569;cursor:pointer}
.rb-chip-add:hover{border-color:var(--brand-400,#60a5fa);color:var(--brand-700,#1d4ed8);background:var(--brand-50,#eff6ff)}
.rb-empty{font-size:12px;color:#94a3b8}
.rb-title-input{height:32px;min-width:200px;max-width:340px;border:1px solid transparent;border-radius:8px;padding:0 8px;font-family:inherit;font-size:14px;font-weight:700;color:#0f172a;background:0;outline:none}
.rb-title-input:hover{background:#f8fafc}
.rb-title-input:focus{background:#fff;border-color:var(--brand-300,#93c5fd);box-shadow:0 0 0 3px rgba(37,99,235,.12)}
.rb-type-pill{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;border-radius:9999px;background:var(--brand-50,#eff6ff);color:var(--brand-700,#1d4ed8);font-size:11.5px;font-weight:700}
.rb-canvas-wrap{overflow:auto;min-height:0;padding:14px 18px 24px}
.rb-livebar{display:flex;align-items:center;gap:18px;flex-wrap:wrap;padding:10px 14px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:14px}
.rb-live{display:flex;flex-direction:column;gap:1px}
.rb-live span{font-size:10.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em}
.rb-live strong{font-size:15px;font-weight:800;color:#0f172a;font-variant-numeric:tabular-nums}
.rb-page{max-width:820px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:14px;box-shadow:0 1px 3px rgba(15,23,42,.06);padding:22px 26px 26px}
.rb-page-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding-bottom:14px;border-bottom:2px solid #0f172a;margin-bottom:6px}
.rb-pv-sec{padding:16px 0;border-bottom:1px solid #f1f5f9}
.rb-pv-sec:last-child{border-bottom:0;padding-bottom:0}
.rb-pv-h{display:flex;align-items:center;gap:7px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px}
.rb-pv-p{font-size:12.5px;line-height:1.6;color:#334155;margin-bottom:8px;text-wrap:pretty}
.rb-pv-p strong{color:#0f172a;font-weight:700}
.rb-pv-hl{display:flex;flex-direction:column;gap:3px;padding:10px 12px;background:#f8fafc;border-radius:9px}
.rb-pv-hl span{display:flex;align-items:center;gap:2px;font-size:12px;color:#475569}
.rb-pv-tile{display:flex;flex-direction:column;gap:3px;padding:11px 12px;background:#f8fafc;border:1px solid #eef2f6;border-radius:10px}
.rb-pv-tile span{font-size:10.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.04em}
.rb-pv-tile strong{font-size:16px;font-weight:800;color:#0f172a;font-variant-numeric:tabular-nums}
.rb-note{display:flex;align-items:flex-start;gap:8px;padding:10px 12px;margin:12px 0 4px;background:#f8fafc;border:1px solid #eef2f6;border-radius:10px;font-size:11.5px;line-height:1.5;color:#64748b}
.rb-note strong{color:#334155;font-weight:700}
.rb-ol{display:flex;align-items:flex-start;gap:12px;padding:14px 0;border-bottom:1px solid #f1f5f9}
.rb-ol:last-child{border-bottom:0;padding-bottom:2px}
.rb-ol-num{width:22px;height:22px;flex-shrink:0;border-radius:6px;background:#f1f5f9;color:#64748b;font-size:11.5px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-top:1px}
.rb-ol-main{flex:1;min-width:0}
.rb-ol-t{display:flex;align-items:center;gap:7px;font-size:13px;font-weight:700;color:#0f172a}
.rb-ol-d{font-size:11.5px;color:#64748b;margin-top:3px;line-height:1.45;text-wrap:pretty}
.rb-ol-chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}
.rb-ol-chip{font-size:10.5px;color:#64748b;background:#f8fafc;border:1px solid #eef2f6;border-radius:999px;padding:2px 8px}
.rb-ol-chip strong{color:#334155;font-weight:700}
.rb-ol-skel{width:172px;flex-shrink:0;display:flex;flex-direction:column;gap:6px}
.rb-sk{display:flex;flex-direction:column;gap:5px}
.rb-sk span{display:block;height:7px;border-radius:999px;background:#eef2f6}
.rb-sk-tiles{display:flex;gap:6px}
.rb-sk-tiles span{flex:1;height:34px;border-radius:8px;background:#eef2f6}
.rb-sk-chart{display:flex;align-items:flex-end;gap:5px;height:44px}
.rb-sk-chart span{flex:1;border-radius:3px 3px 0 0;background:#eef2f6}
.rb-sk-map{height:52px;border-radius:8px;background:#f8fafc;background-image:linear-gradient(rgba(15,23,42,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,.05) 1px,transparent 1px);background-size:14px 14px;border:1px solid #eef2f6}
.rb-prog{height:6px;border-radius:999px;background:#f1f5f9;overflow:hidden;margin:14px 0 12px}
.rb-prog span{display:block;height:100%;border-radius:999px;background:var(--brand-600,#2563eb);transition:width .5s ease}
.rb-steps{display:flex;flex-direction:column;gap:7px}
.rb-step{display:flex;align-items:center;gap:8px;font-size:12px;color:#94a3b8}
.rb-step.done{color:#475569}
.rb-step.now{color:#0f172a;font-weight:600}
.rb-job{display:inline-flex;align-items:center;gap:7px;height:26px;padding:0 10px;border-radius:999px;background:#fef3c7;border:1px solid #fde68a;color:#b45309;font-size:11.5px;font-weight:700;cursor:pointer;font-family:inherit}
.rb-overlay{position:fixed;inset:0;background:rgba(15,23,42,.42);display:flex;align-items:center;justify-content:center;padding:20px;z-index:900}
.rb-modal{width:100%;max-width:520px;background:#fff;border-radius:16px;box-shadow:0 18px 50px rgba(15,23,42,.25);overflow:hidden}
.rb-modal-h{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;border-bottom:1px solid #f1f5f9}
.rb-modal-b{padding:16px}
.rb-modal-f{display:flex;justify-content:flex-end;gap:8px;padding:12px 16px;background:#f8fafc;border-top:1px solid #f1f5f9}
.rb-spin{width:30px;height:30px;margin:0 auto;border-radius:50%;border:3px solid #e2e8f0;border-top-color:var(--brand-600,#2563eb);animation:rb-rot .8s linear infinite}
@keyframes rb-rot{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){.rb-spin{animation-duration:2.4s}}
@media (max-width:1080px){
.rb-body{display:block;overflow:auto}
.rb-rail,.rb-canvas-wrap{overflow:visible;height:auto;min-height:auto;max-height:none}
.rb-rail{border-right:0;border-bottom:1px solid #e2e8f0}
.rb-list{max-height:none}
}
`;
function ensureCSS() {
  if (document.getElementById('rb-css')) return;
  const st = document.createElement('style');
  st.id = 'rb-css'; st.textContent = CSS;
  document.head.appendChild(st);
}

/* ── Render / wire ─────────────────────────────────────────────────────── */
function content() {
  ensureCSS();
  const v = S.view === 'list' ? listView() : S.view === 'type' ? typeView() : builderView();
  return v + genOverlay();
}
function rerender(focusId) {
  const el = document.getElementById('reports-content');
  if (!el) return;
  el.innerHTML = content();
  wire();
  if (focusId) { const f = document.getElementById(focusId); if (f) { f.focus(); if (f.setSelectionRange) f.setSelectionRange(f.value.length, f.value.length); } }
}
const nowISO = () => new Date().toISOString().slice(0, 10);
const toggle = (arr, v) => arr.includes(v) ? arr.filter(x => x !== v) : arr.concat([v]);

function draftFromTemplate(t) {
  const d = blankDraft();
  d.type = t.type; d.name = t.name; d.metrics = t.metrics.slice();
  d.sections = t.sections.map(mkSection);
  if (t.type === 'region') d.scope.region = ['me'];
  if (t.type === 'portfolio') d.scope.portfolio = ['gep'];
  if (t.type === 'risk') d.scope.region = ['me', 'waf'];
  if (t.id === 't-hv') { d.filters.expRange = '> €100M'; d.scope.asset = ASSETS.slice().sort((a, b) => b.exp - a.exp).slice(0, 5).map(a => a.name); }
  return d;
}
function draftFromReport(r) {
  const d = blankDraft();
  Object.assign(d, { id:r.id, name:r.name, type:r.type });
  if (r.cfg) { d.scope = r.cfg.scope; d.filters = r.cfg.filters; d.metrics = r.cfg.metrics; d.sections = r.cfg.sections; }
  else if (r.type === 'region') d.scope.region = ['me'];
  else if (r.type === 'portfolio') d.scope.portfolio = ['gep'];
  return d;
}
function persistDraft(status) {
  const d = S.draft, t = tallies();
  const rec = { id:d.id || 'r' + Date.now(), name:d.name, type:d.type || 'custom', scope:scopeSummary(), owner:'A. Whelan',
    created:d.id ? (S.reports.find(r => r.id === d.id) || {}).created || nowISO() : nowISO(),
    modified:nowISO(), generated:status === 'Generated' ? nowISO() : ((S.reports.find(r => r.id === d.id) || {}).generated || '—'),
    status:status || 'Draft', cfg:{ scope:d.scope, filters:d.filters, metrics:d.metrics, sections:d.sections } };
  const i = S.reports.findIndex(r => r.id === rec.id);
  if (i >= 0) S.reports[i] = rec; else S.reports.unshift(rec);
  S.draft.id = rec.id; saveReports();
  return rec;
}

function wire() {
  const root = document.getElementById('reports-content');
  if (!root) return;

  /* Landing controls */
  const q = document.getElementById('rb-q');
  if (q) q.oninput = (e) => { S.q = e.target.value; rerender('rb-q'); };
  const ft = document.getElementById('rb-ftype');
  if (ft) ft.onchange = () => { S.fType = ft.value; rerender(); };
  const fs = document.getElementById('rb-fstatus');
  if (fs) fs.onchange = () => { S.fStatus = fs.value; rerender(); };

  /* Builder header */
  const nm = document.getElementById('rb-name');
  if (nm) nm.oninput = (e) => { S.draft.name = e.target.value || 'Untitled report';
    const h = root.querySelector('.rb-page-head div div'); if (h) h.textContent = S.draft.name; };
  const from = document.getElementById('rb-from');
  if (from) from.onchange = () => { S.draft.scope.from = from.value; rerender(); };
  const to = document.getElementById('rb-to');
  if (to) to.onchange = () => { S.draft.scope.to = to.value; rerender(); };

  root.querySelectorAll('[data-tpl]').forEach(b => b.onclick = () => {
    const t = TEMPLATES.find(x => x.id === b.dataset.tpl);
    S.draft = draftFromTemplate(t); S.view = 'builder'; S.openSection = null; rerender();
  });
  root.querySelectorAll('[data-type]').forEach(b => b.onclick = () => {
    S.draft.type = b.dataset.type;
    if (b.dataset.type === 'custom') S.draft.sections = [mkSection('exec')];
    S.view = 'builder'; rerender();
  });
  root.querySelectorAll('[data-open]').forEach(b => b.onclick = () => {
    S.draft = draftFromReport(S.reports.find(r => r.id === b.dataset.open)); S.view = 'builder'; rerender();
  });
  root.querySelectorAll('[data-panel]').forEach(b => b.onclick = () => { const k = b.dataset.panel; S.panel[k] = !S.panel[k]; rerender(); });

  /* Scope multiselects */
  root.querySelectorAll('[data-multi]').forEach(b => b.onclick = () => {
    const k = b.dataset.multi, v = b.dataset.val;
    S.draft.scope[k] = toggle(S.draft.scope[k], v);
    if (k === 'region') S.draft.scope.country = S.draft.scope.country.filter(c => {
      const row = ALL_COUNTRIES.find(x => x.name === c);
      return !S.draft.scope.region.length || (row && S.draft.scope.region.includes(row.regionId));
    });
    rerender();
  });
  root.querySelectorAll('[data-filter]').forEach(b => b.onclick = () => { S.draft.filters[b.dataset.filter] = b.dataset.val; rerender(); });
  root.querySelectorAll('[data-sopt]').forEach(b => b.onclick = () => {
    const s = S.draft.sections.find(x => x.uid === b.dataset.sopt);
    if (s) { s.opts[b.dataset.key] = b.dataset.val; rerender(); }
  });

  /* Metric ordering */
  root.querySelectorAll('[data-madd]').forEach(b => b.onclick = () => { S.draft.metrics.push(b.dataset.madd); rerender(); });
  root.querySelectorAll('[data-mrm]').forEach(b => b.onclick = () => { S.draft.metrics = S.draft.metrics.filter(m => m !== b.dataset.mrm); rerender(); });
  const move = (arr, i, j) => { const [x] = arr.splice(i, 1); arr.splice(j, 0, x); };
  root.querySelectorAll('[data-mup]').forEach(b => b.onclick = () => { const i = +b.dataset.mup; move(S.draft.metrics, i, i - 1); rerender(); });
  root.querySelectorAll('[data-mdn]').forEach(b => b.onclick = () => { const i = +b.dataset.mdn; move(S.draft.metrics, i, i + 1); rerender(); });

  /* Section ordering */
  root.querySelectorAll('[data-sadd]').forEach(b => b.onclick = () => { const s = mkSection(b.dataset.sadd); S.draft.sections.push(s); S.openSection = s.uid; rerender(); });
  root.querySelectorAll('[data-srm]').forEach(b => b.onclick = () => { S.draft.sections = S.draft.sections.filter(s => s.uid !== b.dataset.srm); rerender(); });
  root.querySelectorAll('[data-scfg]').forEach(b => b.onclick = () => { S.openSection = S.openSection === b.dataset.scfg ? null : b.dataset.scfg; rerender(); });
  root.querySelectorAll('[data-sup]').forEach(b => b.onclick = () => { const i = +b.dataset.sup; move(S.draft.sections, i, i - 1); rerender(); });
  root.querySelectorAll('[data-sdn]').forEach(b => b.onclick = () => { const i = +b.dataset.sdn; move(S.draft.sections, i, i + 1); rerender(); });

  /* Actions */
  root.querySelectorAll('[data-act]').forEach(b => b.onclick = (ev) => {
    const act = b.dataset.act, id = b.dataset.id;
    if (act === 'overlay' && ev.target !== b) return;
    switch (act) {
      case 'new':       S.draft = blankDraft(); S.view = 'type'; rerender(); break;
      case 'back':      if (S.view === 'builder' && S.draft.type) { S.view = 'list'; } else { S.view = 'list'; } S.gen = null; rerender(); break;
      case 'open':      S.draft = draftFromReport(S.reports.find(r => r.id === id)); S.view = 'builder'; rerender(); break;
      case 'dup': {
        const r = S.reports.find(x => x.id === id);
        S.reports.unshift({ ...r, id:'r' + Date.now(), name:r.name + ' (copy)', created:nowISO(), modified:nowISO(), generated:'—', status:'Draft' });
        saveReports(); rerender(); break;
      }
      case 'del':       S.reports = S.reports.filter(r => r.id !== id); saveReports(); rerender(); break;
      case 'quickgen':  S.draft = draftFromReport(S.reports.find(r => r.id === id)); S.view = 'builder'; S.gen = { stage:'summary' }; rerender(); break;
      case 'jobopen':   S.gen = { stage:'running', step:(S.bgJob || {}).step || 0 }; rerender(); break;
      case 'save':      persistDraft('Draft'); S.view = 'list'; rerender(); break;
      case 'gensummary':S.gen = { stage:'summary' }; rerender(); break;
      case 'genrun':    runJob(); break;
      case 'genbg':     S.bgJob = { id:S.draft.id, step:S.gen.step }; S.gen = null; S.view = 'list'; rerender(); break;
      case 'gencancel': stopJob(); { const r = S.reports.find(x => x.id === S.draft.id); if (r && r.status === 'Generating') { r.status = 'Draft'; saveReports(); } } S.gen = null; rerender(); break;
      case 'genclose':  if (S.gen && S.gen.stage === 'running') { S.bgJob = { id:S.draft.id, step:S.gen.step }; } S.gen = null; rerender(); break;
      case 'overlay':   if (S.gen && S.gen.stage === 'running') { S.bgJob = { id:S.draft.id, step:S.gen.step }; } S.gen = null; rerender(); break;
      case 'savedone':  persistDraft('Generated'); S.gen = null; S.view = 'list'; rerender(); break;
      case 'post-view': S.gen = { stage:'done', toast:'Opening ' + S.draft.name + ' in the report viewer — generated ' + nowISO() + '.' }; rerender(); break;
      case 'post-pdf':  S.gen = { stage:'done', toast:'PDF queued — ' + S.draft.name + '.pdf will download when the render completes.' }; rerender(); break;
      case 'post-xls':  S.gen = { stage:'done', toast:'Excel export queued — one sheet per report section.' }; rerender(); break;
      case 'post-share':S.gen = { stage:'done', toast:'Share link copied for underwriting reviewers with RealWorld access.' }; rerender(); break;
    }
  });
  const modal = root.querySelector('[data-stop]');
  if (modal) modal.onclick = (e) => e.stopPropagation();
}

window.reportBuilder = { content, wire };
})();
