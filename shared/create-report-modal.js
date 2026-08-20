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
  };
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

  const TYPE_BADGE = {
    per:'Portfolio Executive Risk Report',
    ivu:'Individual Vessel Underwriting Report',
    fir:'Fleet Intelligence Report',
    pfc:'Portfolio / Fleet Casualty Report',
    rea:'Regional Exposure & Aggregation Report',
  };
  const TYPE_HREF = {
    per:'reports/PortfolioExecutiveRiskReport.html',
    ivu:'reports/IndividualVesselUnderwritingReport.html',
    fir:'reports/FleetIntelligenceReport.html',
    pfc:'reports/PortfolioFleetCasualtyReport.html',
    rea:'reports/RegionalExposureAggregationReport.html',
  };
  const PAGE_COUNT = { per:6, ivu:5, fir:6, pfc:5, rea:5 };

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

  const state = { open:false, preset:'', name:'', typeId:'', query:'', picked:[], from:'', to:'', showErrors:false };
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
  const valid = () => !!(state.name.trim() && state.typeId && state.picked.length && state.from && state.to && state.from <= state.to);

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
            <div class="cnr-sub">${state.phase === 'form' ? 'Name the report, pick a type, then set its scope and period.' : 'You can close this window at any time.'}</div>
          </div>
          <button type="button" class="cnr-x" id="cnr-close" aria-label="Close">${ic(ICO.x, 16)}</button>
        </div>
        ${state.phase !== 'form' ? `<div class="cnr-body scroll-thin">${statusBody()}</div>
        <div class="cnr-foot"><button type="button" class="cnr-btn primary" id="cnr-status-btn">${state.phase === 'done' ? 'View in My Reports' : 'Run in background'}</button></div>` : `
        <div class="cnr-body scroll-thin">
          <div class="cnr-field">
            <label class="cnr-lbl" for="cnr-name">Report name</label>
            <input type="text" id="cnr-name" class="cnr-input${errClass('name')}" placeholder="e.g. Q3 Portfolio Risk Review" value="${state.name.replace(/"/g, '&quot;')}" />
            ${state.showErrors && errors().name ? '<p class="cnr-err">Give the report a name.</p>' : ''}
          </div>
          <div class="cnr-field">
            <label class="cnr-lbl" for="cnr-type">Report type</label>
            <select id="cnr-type" class="cnr-input${errClass('type')}">
              <option value="" ${state.typeId ? '' : 'selected'}>Select a report type…</option>
              ${TYPES.map(t => `<option value="${t.id}" ${state.typeId === t.id ? 'selected' : ''}>${t.name}</option>`).join('')}
            </select>
            ${state.showErrors && errors().type ? '<p class="cnr-err">Choose a report type.</p>' : ''}
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

  const STEPS = ['Resolving scope', 'Gathering vessel data', 'Scoring and aggregating', 'Composing pages'];

  let job = null;

  function finishJob(j) {
    if (j.added) return;
    j.added = true;
    if (window.addSampleReport) window.addSampleReport(j.pending);
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
      },
    };
    state.phase = 'generating';
    render();
    const j = job;
    const tick = () => {
      if (job !== j) return;
      j.step += 1;
      if (j.step >= STEPS.length) {
        j.delivered = true;
        if (state.open) { state.phase = 'done'; render(); }
        finishJob(j);
        return;
      }
      if (state.open) render();
      setTimeout(tick, 700);
    };
    setTimeout(tick, 700);
  }

  function statusBody() {
    const j = job;
    if (!j) return '';
    const done = state.phase === 'done';
    return `
    <div class="cnr-status">
      <div class="cnr-status-ico ${done ? 'ok' : ''}">${done ? ic(ICO.check, 22) : '<span class="cnr-spinner"></span>'}</div>
      <div class="cnr-status-t">${done ? 'Report generated' : 'Generating your report'}</div>
      <div class="cnr-status-d">${done
        ? `“${j.pending.title}” is ready and has been added to My Reports.`
        : `“${j.pending.title}” — ${j.typeName}. This usually takes a few moments; you can close this window and it will keep running.`}</div>
      <div class="cnr-steps">
        ${STEPS.map((s, i) => {
          const st = done || i < j.step ? 'ok' : i === j.step ? 'now' : '';
          return `<div class="cnr-step ${st}"><span class="cnr-step-dot">${done || i < j.step ? ic(ICO.check, 10) : ''}</span>${s}</div>`;
        }).join('')}
      </div>
    </div>`;
  }

  function wireStatus() {
    const g = id => document.getElementById(id);
    const shut = () => {
      const j = job;
      close();
      if (!j) return;
      if (j.delivered) {
        if (window.showReportToast) window.showReportToast(`“${j.pending.title}” is ready in My Reports`);
        job = null;
      } else if (window.showReportToast) {
        window.showReportToast(`“${j.pending.title}” is still generating — it will appear in My Reports when done`);
      }
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
    g('cnr-type').onchange = e => { state.typeId = e.target.value; state.picked = []; state.query = ''; render(); };
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
    open() { Object.assign(state, { open:true, phase:'form', preset:'', name:'', typeId:'', query:'', picked:[], from:'', to:'', showErrors:false }); render(); },
    types: TYPES,
  };
})();
