(function(){
const STS_CSS = "  .sts-dash-l{border-left-style:dashed;}\n  .sts-top-red,.sts-top-orange{border-bottom-color:transparent !important;}\n  tr:has(+ .sts-top-red),tr:has(+ .sts-top-orange){border-bottom-color:transparent !important;}\n  .sts-top-red>td{box-shadow:inset 0 1px 0 #f87171,inset 0 -1px 0 #f87171;}\n  .sts-top-red:has(+ .sts-top-red)>td,.sts-top-red:has(+ .sts-top-orange)>td{box-shadow:inset 0 1px 0 #f87171;}\n  .sts-top-orange:has(+ .sts-top-red)>td,.sts-top-orange:has(+ .sts-top-orange)>td{background-position:left 0;}\n  .sts-top-orange>td{background-image:linear-gradient(to right,#fb923c 0,#fb923c 4px,transparent 4px,transparent 8px),linear-gradient(to right,#fb923c 0,#fb923c 4px,transparent 4px,transparent 8px);background-size:8px 1px,8px 1px;background-repeat:repeat-x,repeat-x;background-position:left 0,left 100%;}\n  .sts-tipwrap{position:relative;display:inline-flex;align-items:center;cursor:default;}\n  .sts-tip{position:absolute;bottom:calc(100% + 7px);left:50%;transform:translateX(-50%);white-space:nowrap;background:#0f172a;color:#fff;font-size:11px;font-weight:600;padding:5px 9px;border-radius:7px;box-shadow:0 8px 20px rgba(15,23,42,.22);opacity:0;visibility:hidden;transition:opacity .12s ease;pointer-events:none;z-index:60;}\n  .sts-tipwrap:hover .sts-tip{opacity:1;visibility:visible;}\n  .sc-link { color:var(--brand-600,#2d7ffb); font-weight:500; }\n  .sc-link:hover { color:var(--brand-700,#1d6ae5); text-decoration:underline; text-underline-offset:2px; }\n  .sts-bar { position:sticky; left:0; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:8px 16px; padding:10px 14px; border-bottom:1px solid #e2e8f0; background:#fff; }\n  .sts-legend { display:flex; flex-wrap:wrap; align-items:center; gap:6px 16px; margin:0; padding:0; list-style:none; font-size:12px; color:#475569; }\n  .sts-legend li { display:inline-flex; align-items:center; gap:8px; }\n  .sts-sw { width:18px; height:0; flex-shrink:0; }\n  .sts-sw--red { border-top:2px solid #f87171; }\n  .sts-sw--orange { border-top:2px dashed #fb923c; }\n  .sts-ctrls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin-left:auto; }\n  .sts-btn { position:relative; display:inline-flex; align-items:center; gap:6px; height:32px; padding:0 12px; font:inherit; font-size:13px; font-weight:500; color:#1e293b; background:#fff; border:1px solid #e2e8f0; border-radius:8px; box-shadow:0 1px 2px rgb(15 23 42/.05); cursor:pointer; white-space:nowrap; }\n  .sts-btn:hover:not(:disabled) { background:#f8fafc; border-color:#cbd5e1; }\n  .sts-btn:focus-visible { outline:none; border-color:#60a5fa; box-shadow:0 0 0 3px rgb(45 127 251/.18); }\n  .sts-btn:disabled { color:#94a3b8; background:#fff; box-shadow:none; cursor:not-allowed; }\n  .sts-btn .sts-chev { color:#64748b; transition:transform .15s; }\n  .sts-btn.is-open .sts-chev { transform:rotate(180deg); }\n  .sts-btn.is-active::after { content:''; position:absolute; top:-1px; right:-1px; width:10px; height:10px; background:#ef4444; border-top-right-radius:8px; clip-path:polygon(0 0,100% 0,100% 100%); }\n  .sts-facet { position:absolute; top:calc(100% + 6px); right:0; z-index:60; width:220px; background:#fff; border:1px solid #e2e8f0; border-radius:12px; box-shadow:0 10px 24px rgb(15 23 42/.12); overflow:hidden; padding-bottom:4px; }\n  .sts-facet-head { padding:8px 12px; border-bottom:1px solid #f1f5f9; font-size:11.5px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:.04em; margin-bottom:4px; }\n  .sts-facet-row { display:flex; align-items:center; gap:8px; padding:6px 12px; font-size:12.5px; color:#0f172a; cursor:pointer; }\n  .sts-facet-row:hover { background:#f8fafc; }\n  .ds-fdrawer{--z-drawer:1080;--bg-surface:#fff;--bg-muted:#f1f5f9;--bg-sunken:#f8fafc;--border-subtle:#eef2f7;--border-default:#e2e8f0;--text-primary:#0f172a;--text-secondary:#334155;--text-muted:#64748b;--danger-500:#ef4444;--radius-sm:6px;--radius-pill:999px;--shadow-focus:0 0 0 3px rgb(45 127 251/.32);--motion-fast:140ms;--motion-base:200ms;--ease-out:cubic-bezier(.2,.8,.2,1);--font-display:inherit;--fdrawer-width:        360px;--fdrawer-max-width:    92vw;--fdrawer-scrim:        rgba(15, 23, 42, 0.38);--fdrawer-shadow:       -10px 0 30px rgba(15, 23, 42, 0.16);--fdrawer-pad-x:        18px;--fdrawer-head-pad:     16px 20px;--fdrawer-slide:        300ms;--fdrawer-slide-ease:   cubic-bezier(0.4, 0, 0.2, 1);--fdrawer-scrim-motion: 250ms;--fdrawer-acc-motion:   220ms;--fdrawer-list-max:     210px;}\n  .ds-fdrawer { position: fixed; inset: 0; z-index: var(--z-drawer); visibility: hidden; } .ds-fdrawer.is-open { visibility: visible; } .ds-fdrawer-scrim { position: absolute; inset: 0; background: var(--fdrawer-scrim); opacity: 0; transition: opacity var(--fdrawer-scrim-motion) var(--ease-out); } .ds-fdrawer.is-open .ds-fdrawer-scrim { opacity: 1; } .ds-fdrawer-panel { position: absolute; top: 0; right: 0; height: 100%; width: var(--fdrawer-width); max-width: var(--fdrawer-max-width); background: var(--bg-surface); box-shadow: var(--fdrawer-shadow); display: flex; flex-direction: column; transform: translateX(100%); transition: transform var(--fdrawer-slide) var(--fdrawer-slide-ease); } .ds-fdrawer.is-open .ds-fdrawer-panel { transform: translateX(0); } .ds-fdrawer-head { display: flex; align-items: center; justify-content: space-between; padding: var(--fdrawer-head-pad); border-bottom: 1px solid var(--border-subtle); font-family: var(--font-display); font-size: 15px; font-weight: 700; color: var(--text-primary); flex: 0 0 auto; } .ds-fdrawer-close { border: 0; background: none; cursor: pointer; color: var(--text-muted); padding: 5px; border-radius: 7px; display: inline-flex; transition: background var(--motion-fast) var(--ease-out), color var(--motion-fast) var(--ease-out); } .ds-fdrawer-close:hover { background: var(--bg-muted); color: var(--text-primary); } .ds-fdrawer-close:focus-visible { outline: 0; box-shadow: var(--shadow-focus); } .ds-fdrawer-body { flex: 1 1 auto; min-height: 0; overflow-y: auto; padding: 4px var(--fdrawer-pad-x) 12px; display: flex; flex-direction: column; } .ds-fdrawer-section { padding: 16px 0; border-bottom: 1px solid var(--border-subtle); flex: 0 0 auto; transition: padding var(--motion-base) var(--ease-out); } .ds-fdrawer-section:not(.is-open) { padding: 11px 0; } .ds-fdrawer-section.is-open { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; } .ds-fdrawer-section:last-child { border-bottom: 0; } .ds-fdrawer-acc-head { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px; background: none; border: 0; padding: 0; cursor: pointer; } .ds-fdrawer-acc-head:focus-visible { outline: 0; box-shadow: var(--shadow-focus); border-radius: var(--radius-sm); } .ds-fdrawer-sec-title { font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin: 0; display: flex; align-items: center; gap: 7px; } .ds-fdrawer-section:not(.is-open) .ds-fdrawer-sec-title { color: var(--brand-600); } .ds-fdrawer-acc-chev { color: var(--brand-600); transition: transform var(--motion-base) var(--ease-out); flex-shrink: 0; } .ds-fdrawer-section.is-open .ds-fdrawer-acc-chev { transform: rotate(180deg); } .ds-fdrawer-dot { width: 6px; height: 6px; border-radius: var(--radius-pill); background: var(--danger-500); display: inline-block; } .ds-fdrawer-acc-body { display: none; padding-top: 12px; } .ds-fdrawer-section.is-open .ds-fdrawer-acc-body { display: flex; flex-direction: column; flex: 1; min-height: 0; animation: ds-fdrawer-acc-in var(--fdrawer-acc-motion) var(--ease-out); } @keyframes ds-fdrawer-acc-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } } .ds-fdrawer-acts { display: flex; gap: 4px; padding: 0 0 8px; } .ds-fdrawer-act { flex: 1; padding: 5px 8px; border: 1px solid var(--border-default); border-radius: var(--radius-sm); background: var(--bg-surface); font: inherit; font-size: 11.5px; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: background var(--motion-fast) var(--ease-out), border-color var(--motion-fast) var(--ease-out), color var(--motion-fast) var(--ease-out); } .ds-fdrawer-act:hover { background: var(--bg-sunken); border-color: var(--brand-300); color: var(--brand-700); } .ds-fdrawer-act:disabled { opacity: 0.45; cursor: default; pointer-events: none; } .ds-fdrawer-list { display: flex; flex-direction: column; max-height: var(--fdrawer-list-max); overflow-y: auto; } .ds-fdrawer-section.is-open .ds-fdrawer-list { max-height: none; flex: 1 1 0; min-height: 0; } .ds-fdrawer-item { display: flex; align-items: center; gap: 8px; width: 100%; text-align: left; padding: 7px 10px; border: 0; border-radius: var(--radius-sm); background: transparent; font-size: 12.5px; font-weight: 500; color: var(--text-secondary); cursor: pointer; white-space: nowrap; } .ds-fdrawer-item:hover { background: var(--bg-muted); color: var(--text-primary); } .ds-fdrawer-item input[type=\"checkbox\"] { width: 15px; height: 15px; accent-color: var(--brand-600); cursor: pointer; margin: 0; flex-shrink: 0; } .ds-fdrawer-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 14px var(--fdrawer-pad-x); border-top: 1px solid var(--border-subtle); flex: 0 0 auto; } .ds-fdrawer-foot > * { justify-content: center; height: 40px; padding: 0 16px; } .ds-fdrawer-foot > *:disabled { opacity: 0.45; cursor: default; pointer-events: none; } @media (prefers-reduced-motion: reduce) { .ds-fdrawer-panel, .ds-fdrawer-scrim { transition-duration: 1ms; } .ds-fdrawer-section.is-open .ds-fdrawer-acc-body { animation-duration: 1ms; } }\n  .ds-fdrawer-item input[type=\"radio\"]{width:15px;height:15px;accent-color:var(--brand-600);cursor:pointer;margin:0;flex-shrink:0}\n  .sts-ibtn{width:32px;padding:0;justify-content:center;color:#475569}\n  .sts-ibtn.has-active::after{display:none}\n  .sts-ibtn .ds-fdrawer-dot{position:absolute;top:5px;right:5px}\n  .sts-btn--primary{background:var(--brand-600,#2d7ffb);border-color:var(--brand-600,#2d7ffb);color:#fff}\n  .sts-btn--primary:hover:not(:disabled){background:var(--brand-700,#1d6ae5)!important;border-color:var(--brand-700,#1d6ae5)!important}";
const st = document.createElement('style'); st.textContent = STS_CSS + '.sts-topbar{display:flex;flex-wrap:wrap;justify-content:flex-end;align-items:center;gap:6px;padding:10px 12px;border-bottom:1px solid #e2e8f0;background:#fff;}'; document.head.appendChild(st);
const state = { stsF: { ports:true, clusters:true, chains:false, dist:'' }, stsOpen: null };
let render = () => {};
const STS_DATA = [
  { id:1, highlight:'orange',
    v1:{ name:'FRESH BREEZE',   compliance:'ok',         stsCompliance:'ok',         draught:'↑ 0.5', dest:'FUJAIRAH' },
    v2:{ name:'HUNTER ODIN',    compliance:'sanctioned', stsCompliance:'ok',         draught:'-',     dest:'BR ADRI' },
    region:'South Atlantic Ocean', ports:'-', start:'2025-08-17 08:02:0…', end:'2025-08-17 21:57:5…', duration:'13h 55m' },
  { id:2, highlight:'',
    v1:{ name:'FRESH BREEZE',   compliance:'ok',         stsCompliance:'ok',         draught:'↑ 8.7', dest:'ROTTERDAM' },
    v2:{ name:'NORDIC BREEZE',  compliance:'ok',         stsCompliance:'ok',         draught:'-',     dest:'ANTWERP' },
    region:'North Sea', ports:'-', start:'2025-09-15 06:45:2…', end:'2025-09-15 19:30:1…', duration:'12h 44m' },
  { id:3, highlight:'orange',
    v1:{ name:'FRESH BREEZE',   compliance:'ok',         stsCompliance:'ok',         draught:'-',     dest:'BR ADRI' },
    mid:{ name:'CORAL MERIDIAN', compliance:'ok',        stsCompliance:'ok',         draught:'↑ 4.1', dest:'BR ADRI',
      region:'South Atlantic Ocean', ports:'-', start:'2025-06-27 11:15:1…', end:'2025-06-27 22:40:0…', duration:'11h 25m' },
    v2:{ name:'HEDDA KNUTSEN',  compliance:'sanctioned', stsCompliance:'ok',         draught:'-',     dest:'BR ADRI' },
    region:'South Atlantic Ocean', ports:'-', start:'2025-06-27 11:15:1…', end:'2025-06-28 17:13:4…', duration:'1d 5h 58m' },
  { id:4, highlight:'',
    v1:{ name:'FRESH BREEZE',   compliance:'ok',         stsCompliance:'ok',         draught:'-',     dest:'SINGAPORE' },
    v2:{ name:'VANDA ADVENTURE',compliance:'ok',         stsCompliance:'ok',         draught:'-',     dest:'ALEPRI8' },
    region:'Singapore Strait', ports:'-', start:'2025-05-22 08:10:4…', end:'2025-05-22 21:11:0…', duration:'13h' },
  { id:5, highlight:'',
    v1:{ name:'FRESH BREEZE',   compliance:'ok',         stsCompliance:'ok',         draught:'↑ 9.2', dest:'HAMBURG' },
    v2:{ name:'ATLANTIC STAR',  compliance:'ok',         stsCompliance:'ok',         draught:'-',     dest:'LONDON' },
    region:'English Channel', ports:'-', start:'2025-04-10 14:20:3…', end:'2025-04-11 02:15:4…', duration:'11h 55m' },
  { id:6, highlight:'red',
    v1:{ name:'FRESH BREEZE',   compliance:'ok',         stsCompliance:'ok',         draught:'↑ 2.4', dest:'GIBRALTAR' },
    v2:{ name:'MERIDIAN PEARL', compliance:'ok',         stsCompliance:'sanctioned', draught:'-',     dest:'BR ADRI' },
    region:'Gulf of Oman', ports:'-', start:'2025-03-18 09:05:2…', end:'2025-03-18 23:48:1…', duration:'14h 43m' },
  { id:7, highlight:'red',
    v1:{ name:'FRESH BREEZE',   compliance:'ok',         stsCompliance:'ok',         draught:'↑ 1.8', dest:'PIRAEUS' },
    v2:{ name:'SEA VANGUARD',   compliance:'sanctioned', stsCompliance:'sanctioned', draught:'-',     dest:'BR ADRI' },
    region:'Eastern Mediterranean', ports:'-', start:'2025-02-06 05:40:1…', end:'2025-02-06 18:22:3…', duration:'12h 42m' },
];
const STS_DEFAULTS = { ports:true, clusters:true, chains:false, dist:'' };
const STS_EXCL = [['ports','Ports'],['clusters','Clusters'],['chains','STS Chains']];
const STS_DIST = [['','Any distance'],['12','> 12 nm'],['24','> 24 nm'],['50','> 50 nm'],['100','> 100 nm'],['200','> 200 nm']];
function StsFilters() {
  const f = state.stsF, open = state.stsOpen;
  const dirty = f.ports || f.clusters || f.chains || !!f.dist;
  const chev = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sts-chev"><path d="m6 9 6 6 6-6"/></svg>';
  const trig = (id, label, active) => `<button type="button" class="sts-btn ${active ? 'is-active' : ''} ${open === id ? 'is-open' : ''}" data-sts-open="${id}" aria-haspopup="true" aria-expanded="${open === id}">${label}${chev}</button>`;
  return `
  <div class="sts-bar">
    <ul class="sts-legend" aria-label="Row highlight legend">
      <li><span class="sts-sw sts-sw--red" aria-hidden="true"></span>An entity is currently sanctioned</li>
      <li><span class="sts-sw sts-sw--orange" aria-hidden="true"></span>An entity was or is currently sanctioned</li>
    </ul>
  </div>`;
}
let stsAcc = 0;
function stsDrawerBody() {
  const f = state.stsF, dirty = f.ports || f.clusters || f.chains || !!f.dist;
  const chev = '<svg class="ds-fdrawer-acc-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  const sec = (i, title, active, acts, items) => `<div class="ds-fdrawer-section${stsAcc === i ? ' is-open' : ''}">
    <button type="button" class="ds-fdrawer-acc-head" data-sts-acc="${i}" aria-expanded="${stsAcc === i}"><span class="ds-fdrawer-sec-title">${title}${active ? '<span class="ds-fdrawer-dot"></span>' : ''}</span>${chev}</button>
    <div class="ds-fdrawer-acc-body"><div class="ds-fdrawer-acts">${acts}</div><div class="ds-fdrawer-list scroll-thin">${items}</div></div></div>`;
  const exAny = STS_EXCL.some(([k]) => f[k]);
  return `<div class="ds-fdrawer-body">
    ${sec(0, 'Exclude from results', exAny,
      `<button type="button" class="ds-fdrawer-act" data-sts-act="ex-all" ${STS_EXCL.every(([k]) => f[k]) ? 'disabled' : ''}>Select all</button><button type="button" class="ds-fdrawer-act" data-sts-act="ex-none" ${exAny ? '' : 'disabled'}>Unselect all</button>`,
      STS_EXCL.map(([k, l]) => `<label class="ds-fdrawer-item"><input type="checkbox" data-sts-f="${k}" ${f[k] ? 'checked' : ''}>${l}</label>`).join(''))}
    ${sec(1, 'Distance to coast', !!f.dist,
      `<button type="button" class="ds-fdrawer-act" data-sts-act="dist-reset" ${f.dist ? '' : 'disabled'}>Reset</button>`,
      STS_DIST.map(([v, l]) => `<label class="ds-fdrawer-item"><input type="radio" name="sts-dist" data-sts-dist="${v}" ${v === f.dist ? 'checked' : ''}>${l}</label>`).join(''))}
  </div>
  <div class="ds-fdrawer-foot"><button type="button" class="sts-btn" data-sts-act="clear" ${dirty ? '' : 'disabled'}>Clear all</button><button type="button" class="sts-btn sts-btn--primary" data-sts-act="done">Done</button></div>`;
}
function stsDrawerEl() {
  let el = document.getElementById('sts-fdrawer');
  if (el) return el;
  el = document.createElement('div');
  el.id = 'sts-fdrawer'; el.className = 'ds-fdrawer'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<div class="ds-fdrawer-scrim" data-sts-act="done"></div><div class="ds-fdrawer-panel" role="dialog" aria-modal="true" aria-label="Ship-To-Ship filters"><div class="ds-fdrawer-head">Filters<button type="button" class="ds-fdrawer-close" data-sts-act="done" aria-label="Close filters"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div><div id="sts-fdrawer-inner" style="display:flex;flex-direction:column;flex:1;min-height:0"></div></div>`;
  document.body.appendChild(el);
  const upd = () => { render(); document.getElementById('sts-fdrawer-inner').innerHTML = stsDrawerBody(); };
  el.addEventListener('click', e => {
    const acc = e.target.closest('[data-sts-acc]');
    if (acc) { const i = +acc.dataset.stsAcc; stsAcc = stsAcc === i ? -1 : i; document.getElementById('sts-fdrawer-inner').innerHTML = stsDrawerBody(); return; }
    const b = e.target.closest('[data-sts-act]'); if (!b) return;
    const k = b.dataset.stsAct, f = state.stsF;
    if (k === 'done') return stsDrawerClose();
    if (k === 'ex-all') state.stsF = { ...f, ports:true, clusters:true, chains:true };
    if (k === 'ex-none') state.stsF = { ...f, ports:false, clusters:false, chains:false };
    if (k === 'dist-reset') state.stsF = { ...f, dist:'' };
    if (k === 'clear') state.stsF = { ports:false, clusters:false, chains:false, dist:'' };
    upd();
  });
  el.addEventListener('change', e => {
    const c = e.target;
    if (c.dataset.stsF) state.stsF = { ...state.stsF, [c.dataset.stsF]: c.checked };
    else if (c.dataset.stsDist !== undefined) state.stsF = { ...state.stsF, dist: c.dataset.stsDist };
    else return;
    upd();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && el.classList.contains('is-open')) stsDrawerClose(); });
  return el;
}
function stsDrawerOpen() {
  const el = stsDrawerEl();
  document.getElementById('sts-fdrawer-inner').innerHTML = stsDrawerBody();
  void el.offsetWidth;
  el.classList.add('is-open'); el.setAttribute('aria-hidden', 'false');
  setTimeout(() => el.querySelector('.ds-fdrawer-close').focus(), 50);
}
function stsDrawerClose() {
  const el = document.getElementById('sts-fdrawer'); if (!el) return;
  el.classList.remove('is-open'); el.setAttribute('aria-hidden', 'true');
  const t = document.getElementById('sts-filter-btn'); if (t) t.focus();
}

const sortHead = (label) => `<button class="inline-flex items-start gap-1 text-left text-[11px] font-semibold tracking-wider uppercase text-ink-500 hover:text-ink-700"><span class="text-left">${label}</span><svg viewBox="0 0 24 24" class="h-3 w-3 shrink-0 mt-px text-ink-400" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 9l4-4 4 4M8 15l4 4 4-4"/></svg></button>`;
const STS_VESSELS = [
  { name:'Karachi',    imo:'9903413', pick:[0,2,4] },
  { name:'SEA HEART',  imo:'9240706', pick:[1,2] },
  { name:'Aliki',      imo:'9460136', pick:[1,3] },
  { name:'Neon',       imo:'9672478', pick:[0,1] },
  { name:'Lahore',     imo:'9913511', pick:[2,5] },
];
const vRows = v => v.pick.map(i => STS_DATA[i % STS_DATA.length]).map(r => ({ ...r, v1:{ ...r.v1, name:v.name.toUpperCase() } }));
const hasSanc = r => [r.v2, r.mid].some(x => x && (x.compliance === 'sanctioned' || x.stsCompliance === 'sanctioned'));
state.open = null;
function StsTopFilters() {
  const f = state.stsF, D = STS_DEFAULTS, open = state.stsOpen === 'dist';
  const chk = (k, label) => `<label class="sts-btn ${f[k] !== D[k] ? 'is-active' : ''}" style="cursor:pointer;"><input type="checkbox" data-sts-top="${k}" ${f[k] ? 'checked' : ''} style="width:15px;height:15px;accent-color:var(--brand-600,#2d7ffb);margin:0;cursor:pointer;">${label}</label>`;
  const distLbl = (STS_DIST.find(([v]) => v === f.dist) || [, 'Distance To Coast'])[1];
  return `<div class="sts-topbar">
    <button type="button" class="sts-btn" data-sts-reset><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055"/><path d="m22 3-5 5"/><path d="m17 3 5 5"/></svg>Reset Filters</button>
    ${chk('ports', 'Exclude Ports')}${chk('clusters', 'Exclude Clusters')}${chk('chains', 'Exclude STS Chains')}
    <div style="position:relative;">
      <button type="button" class="sts-btn ${f.dist ? 'is-active' : ''} ${open ? 'is-open' : ''}" data-sts-dd aria-haspopup="true" aria-expanded="${open}">${f.dist ? distLbl : 'Distance To Coast'}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sts-chev"><path d="m6 9 6 6 6-6"/></svg></button>
      ${open ? `<div class="sts-facet" data-sts-facet role="menu"><div class="sts-facet-head">Distance to coast</div>${STS_DIST.map(([v, l]) => `<label class="sts-facet-row"><input type="radio" name="sts-top-dist" data-sts-top-dist="${v}" ${v === f.dist ? 'checked' : ''} style="accent-color:var(--brand-600,#2d7ffb);margin:0;">${l}</label>`).join('')}</div>` : ''}
    </div>
  </div>`;
}
function StsContent() {
  const chev = o => `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform .15s;${o?'transform:rotate(90deg)':''}" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`;
  const ext = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>';
  return StsTopFilters() + `<table class="w-full text-xs" style="table-layout:fixed;width:100%;">
    <thead class="bg-ink-50"><tr>
      <th class="px-3 py-2 text-left" style="width:42%">${sortHead('Vessel')}</th>
      <th class="px-3 py-2 text-left">${sortHead('IMO')}</th>
      <th class="px-3 py-2 text-left">${sortHead('STS with Sanctioned')}</th>
      <th class="px-3 py-2 text-left">${sortHead('Chained STS')}</th>
    </tr></thead>
    <tbody>${STS_VESSELS.map((v, i) => { const rows = vRows(v), o = state.open === v.name;
      return `<tr class="border-b border-ink-100 ${i%2?'bg-ink-50':'bg-white'} hover:bg-brand-50 cursor-pointer" data-sts-vessel="${v.name}" aria-expanded="${o}">
        <td class="px-3 py-2.5"><span class="inline-flex items-center gap-1.5 text-brand-600 font-medium">${chev(o)}${v.name}<a href="VesselDetails.html" class="sc-link inline-flex" title="Open vessel details" aria-label="Open ${v.name} details" onclick="event.stopPropagation()">${ext}</a></span></td>
        <td class="px-3 py-2.5 text-ink-700">${v.imo}</td>
        <td class="px-3 py-2.5 text-ink-700">${rows.filter(hasSanc).length}</td>
        <td class="px-3 py-2.5 text-ink-700">${rows.filter(r => r.mid).length}</td>
      </tr>${o ? `<tr class="border-b border-ink-200"><td colspan="4" style="padding:0;background:#fff;max-width:0;"><div>${stsTable(rows)}
        <div class="flex items-center justify-between gap-3 px-3 py-2 border-t border-ink-100 text-xs text-ink-600"><label class="flex items-center gap-2">Items per page: <select class="sel"><option>25</option><option>50</option><option>100</option></select></label><span>Page 1 of 1 (${rows.length} total items)</span></div></div></td></tr>` : ''}`; }).join('')}
    </tbody></table>`;
}
function stsTable(rows) {
  return `<div class="scroll-thin" style="overflow-x:auto;">
      ${StsFilters()}
      <table class="w-full text-xs min-w-[1100px]">
        <thead class="bg-ink-50">
          <tr>
            <th class="px-3 py-2 text-left">${sortHead('Vessel(s)')}</th>
            <th class="px-3 py-2 text-left">${sortHead('Compliance at Time of STS')}</th>
            <th class="px-3 py-2 text-left">${sortHead('Current Compliance')}</th>
            <th class="px-3 py-2 text-left">${sortHead('Draught')}</th>
            <th class="px-3 py-2 text-left">${sortHead('Destination')}</th>
            <th class="px-3 py-2 text-left">${sortHead('STS Region')}</th>
            <th class="px-3 py-2 text-center">${sortHead('Ports')}</th>
            <th class="px-3 py-2 text-left">${sortHead('STS Start')}</th>
            <th class="px-3 py-2 text-left">${sortHead('STS End')}</th>
            <th class="px-3 py-2 text-left">${sortHead('STS Duration')}</th>
            <th class="px-3 py-2 text-left">${sortHead('Actions')}</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(r => {
            const border = r.highlight === 'red' ? 'border-l-4 border-l-red-400 bg-red-50 sts-top-red' : r.highlight === 'orange' ? 'border-l-4 border-l-orange-400 bg-orange-50 sts-dash-l sts-top-orange' : '';
            const okBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>Ok</span>`;
            const sanctionBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>Sanctioned <svg class="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15" stroke="currentColor" stroke-width="2"/></svg></span>`;
            const warnBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>Ok <span class="sts-tipwrap" tabindex="0" aria-label="Vessel was previously sanctioned"><svg class="w-3 h-3 text-amber-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg><span class="sts-tip">Vessel was previously sanctioned</span></span></span>`;
            const compBadge = (c) => c === 'sanctioned' ? sanctionBadge : c === 'ok-warn' ? warnBadge : okBadge;
            const vesselIcon = `<svg class="w-3.5 h-3.5 text-brand-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 10.189V14"/><path d="M12 2v3"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"/><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`;
            const arrowIcon = `<svg class="w-3 h-3 text-ink-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg>`;
            return `
            <tr class="border-b border-ink-100 last:border-b-0 ${border}">
              <td class="px-3 py-2">
                <div class="flex flex-col gap-0.5">
                  <div class="flex items-center min-h-8 gap-1.5 whitespace-nowrap font-semibold text-brand-600">${vesselIcon}${r.v1.name}</div>
                  <div class="h-2 flex items-center pl-0.5">${arrowIcon}</div>
                  ${r.mid ? `<div class="flex items-center min-h-8 gap-1.5 whitespace-nowrap font-semibold text-brand-600">${vesselIcon}${r.mid.name}</div><div class="h-2 flex items-center pl-0.5">${arrowIcon}</div>` : ''}
                  <div class="flex items-center min-h-8 gap-1.5 whitespace-nowrap font-semibold text-brand-600">${vesselIcon}${r.v2.name}</div>
                </div>
              </td>
              <td class="px-3 py-2">
                <div class="flex flex-col gap-0.5">
                  <div class="flex items-center min-h-8">${compBadge(r.v1.stsCompliance)}</div>
                  <div class="h-2"></div>
                  ${r.mid ? `<div class="flex items-center min-h-8">${compBadge(r.mid.stsCompliance)}</div><div class="h-2"></div>` : ''}
                  <div class="flex items-center min-h-8">${compBadge(r.v2.stsCompliance)}</div>
                </div>
              </td>
              <td class="px-3 py-2">
                <div class="flex flex-col gap-0.5">
                  <div class="flex items-center min-h-8">${compBadge(r.v1.compliance)}</div>
                  <div class="h-2"></div>
                  ${r.mid ? `<div class="flex items-center min-h-8">${compBadge(r.mid.compliance)}</div><div class="h-2"></div>` : ''}
                  <div class="flex items-center min-h-8">${compBadge(r.v2.compliance)}</div>
                </div>
              </td>
              <td class="px-3 py-2">
                <div class="flex flex-col gap-0.5 text-ink-700">
                  <div class="flex items-center min-h-8">${r.v1.draught}</div>
                  <div class="h-2"></div>
                  ${r.mid ? `<div class="flex items-center min-h-8">${r.mid.draught}</div><div class="h-2"></div>` : ''}
                  <div class="flex items-center min-h-8">${r.v2.draught}</div>
                </div>
              </td>
              <td class="px-3 py-2">
                <div class="flex flex-col gap-0.5 text-ink-700">
                  <div class="flex items-center min-h-8">${r.v1.dest}</div>
                  <div class="h-2"></div>
                  ${r.mid ? `<div class="flex items-center min-h-8">${r.mid.dest}</div><div class="h-2"></div>` : ''}
                  <div class="flex items-center min-h-8">${r.v2.dest}</div>
                </div>
              </td>
              <td class="px-3 py-2 text-ink-700 ${r.mid?'align-top':'align-middle'}">${r.mid ? `<div class="flex flex-col gap-0.5"><div class="flex items-center min-h-8 text-transparent select-none">—</div><div class="h-2"></div><div class="flex items-center min-h-8 whitespace-nowrap">${r.mid.region}</div><div class="h-2"></div><div class="flex items-center min-h-8 whitespace-nowrap">${r.region}</div></div>` : r.region}</td>
              <td class="px-3 py-2 text-center text-ink-500 ${r.mid?'align-top':'align-middle'}">${r.mid ? `<div class="flex flex-col gap-0.5"><div class="flex items-center min-h-8 text-transparent select-none">—</div><div class="h-2"></div><div class="flex items-center min-h-8 whitespace-nowrap">${r.mid.ports}</div><div class="h-2"></div><div class="flex items-center min-h-8 whitespace-nowrap">${r.ports}</div></div>` : r.ports}</td>
              <td class="px-3 py-2 text-ink-700 ${r.mid?'align-top':'align-middle'}">${r.mid ? `<div class="flex flex-col gap-0.5"><div class="flex items-center min-h-8 text-transparent select-none">—</div><div class="h-2"></div><div class="flex items-center min-h-8 whitespace-nowrap">${r.mid.start}</div><div class="h-2"></div><div class="flex items-center min-h-8 whitespace-nowrap">${r.start}</div></div>` : r.start}</td>
              <td class="px-3 py-2 text-ink-700 ${r.mid?'align-top':'align-middle'}">${r.mid ? `<div class="flex flex-col gap-0.5"><div class="flex items-center min-h-8 text-transparent select-none">—</div><div class="h-2"></div><div class="flex items-center min-h-8 whitespace-nowrap">${r.mid.end}</div><div class="h-2"></div><div class="flex items-center min-h-8 whitespace-nowrap">${r.end}</div></div>` : r.end}</td>
              <td class="px-3 py-2 font-medium text-ink-900 ${r.mid?'align-top':'align-middle'}">${r.mid ? `<div class="flex flex-col gap-0.5"><div class="flex items-center min-h-8 text-transparent select-none">—</div><div class="h-2"></div><div class="flex items-center min-h-8 whitespace-nowrap">${r.mid.duration}</div><div class="h-2"></div><div class="flex items-center min-h-8 whitespace-nowrap">${r.duration}</div></div>` : r.duration}</td>
              <td class="px-3 py-2 align-middle">
                <button class="inline-flex items-center gap-1 px-3 py-1.5 border border-brand-600 text-brand-600 text-[11px] font-semibold rounded-lg hover:bg-brand-50 transition-colors">
                  Create Analysis <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 18l6-6-6-6"/></svg>
                </button>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
  </div>`;
}
function wireSts(rerender) {
  render = rerender;
  document.querySelectorAll('[data-sts-top]').forEach(c => c.onchange = () => { state.stsF = { ...state.stsF, [c.dataset.stsTop]: c.checked }; render(); });
  document.querySelectorAll('[data-sts-top-dist]').forEach(c => c.onchange = () => { state.stsF = { ...state.stsF, dist: c.dataset.stsTopDist }; state.stsOpen = null; render(); });
  document.querySelectorAll('[data-sts-reset]').forEach(b => b.onclick = () => { state.stsF = { ...STS_DEFAULTS }; state.stsOpen = null; render(); });
  document.querySelectorAll('[data-sts-dd]').forEach(b => b.onclick = ev => { ev.stopPropagation(); state.stsOpen = state.stsOpen === 'dist' ? null : 'dist'; render(); });
  document.querySelectorAll('[data-sts-facet]').forEach(m => m.onclick = ev => ev.stopPropagation());
  if (!window.__stsTopDoc) { window.__stsTopDoc = true;
    document.addEventListener('click', () => { if (state.stsOpen) { state.stsOpen = null; render(); } });
    document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && state.stsOpen) { state.stsOpen = null; render(); } });
  }
  document.querySelectorAll('[data-sts-vessel]').forEach(tr => tr.onclick = () => { const n = tr.dataset.stsVessel; state.open = state.open === n ? null : n; render(); });
  const b = document.getElementById('sts-filter-btn');
  if (b) b.onclick = ev => { ev.stopPropagation(); stsDrawerOpen(); };
}
window.STS = { StsContent, wireSts, state };
})();
