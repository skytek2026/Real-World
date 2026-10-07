/* Marine Portfolio Details — "Asset Details" tab (3rd row card).
   Exposes window.AssetDetailsSection(tabsHtml). Re-renders only #ad-body / toolbar bits so
   the search field keeps focus. Relies on dsPagination / dsWirePagination / dsSortInd / dsToast. */
(function () {
  const css = `
  .ad-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:10px 12px;border-bottom:1px solid var(--border-subtle,#f1f5f9)}
  .ad-search{position:relative;flex:1 1 260px;min-width:0}
  .ad-search svg{position:absolute;left:9px;top:50%;transform:translateY(-50%);color:var(--text-muted,#94a3b8);pointer-events:none}
  .ad-search input{width:100%;height:32px;padding:0 10px 0 28px;border:1px solid var(--border-default,#e2e8f0);border-radius:8px;font:inherit;font-size:12.5px;color:var(--text-primary,#0f172a);background:#fff;outline:0;transition:border-color 140ms,box-shadow 140ms}
  .ad-search input:focus{border-color:var(--brand-400,#8ec5fd);box-shadow:var(--shadow-focus,0 0 0 3px rgba(46,134,192,.32))}
  .ad-ctrls{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
  .ad-btn{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 12px;border:1px solid var(--border-default,#e2e8f0);border-radius:8px;background:#fff;color:var(--slate-800,#1e293b);font:inherit;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;transition:background 140ms,border-color 140ms,color 140ms}
  .ad-btn:hover:not(:disabled){background:var(--slate-50,#f8fafc);border-color:var(--border-strong,#cbd5e1)}
  .ad-btn:disabled{color:var(--text-disabled,#94a3b8);cursor:not-allowed}
  .ad-btn:focus-visible,.ad-sel:focus-visible{outline:0;box-shadow:var(--shadow-focus,0 0 0 3px rgba(46,134,192,.32))}
  .ad-sel-wrap{position:relative}
  .ad-sel{appearance:none;-webkit-appearance:none;height:32px;padding:0 28px 0 10px;border:1px solid var(--border-default,#e2e8f0);border-radius:8px;background:#fff;font:inherit;font-size:12px;font-weight:600;color:var(--slate-800,#1e293b);cursor:pointer;outline:0}
  .ad-sel-wrap svg{position:absolute;right:8px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--text-muted,#64748b)}
  .ad-selbar{display:flex;align-items:center;gap:10px;padding:8px 12px;border-bottom:1px solid var(--border-subtle,#f1f5f9);background:var(--brand-050,#eff6ff);font-size:12px;color:var(--text-secondary,#475569)}
  .ad-selbar b{color:var(--text-primary,#0f172a);font-weight:600}
  .ad-link{border:0;background:none;padding:0;font:inherit;color:var(--brand-600,#2d7ffb);font-weight:600;cursor:pointer}
  .ad-link:hover{text-decoration:underline}
  .ad-tbl th{white-space:normal;vertical-align:bottom;background:var(--slate-50,#f9fafb)}
  .ad-tbl .ds-th--sortable{padding:0}
  .ad-tbl .ds-th-sort{width:100%;min-width:84px;display:flex;align-items:center;justify-content:space-between;gap:6px;font:inherit;font-size:11px;font-weight:600;color:var(--text-muted,#6B7280);padding:9px 12px;background:transparent;border:0;cursor:pointer;text-align:left;line-height:1.25;transition:color .12s ease,background .12s ease}
  .ad-tbl .ds-th-sort span{max-width:120px}
  .ad-tbl .ds-th-sort:hover{color:var(--text-secondary,#4B5563);background:var(--slate-100,#F3F4F6)}
  .ad-tbl .ds-th-sort:focus-visible{outline:0;box-shadow:var(--shadow-focus,0 0 0 3px rgba(45,127,251,.32))}
  .ad-tbl .ds-th--active .ds-th-sort{color:var(--text-primary,#0f172a)}
  .ad-tbl td{font-variant-numeric:tabular-nums}
  .ad-tbl td.ad-asset{max-width:150px;overflow:hidden;text-overflow:ellipsis}
  .ad-tbl td.ad-na{color:var(--text-disabled,#94a3b8)}
  .ad-tbl tr.is-sel td{background:var(--brand-050,#eff6ff)}
  .ad-tbl input[type=checkbox],.ad-card input[type=checkbox]{width:14px;height:14px;accent-color:var(--brand-600,#2d7ffb);cursor:pointer;margin:0}
  .ad-empty{padding:40px 16px;text-align:center;font-size:13px;color:var(--text-muted,#64748b)}
  .ad-empty b{display:block;color:var(--text-primary,#0f172a);font-weight:600;margin-bottom:2px}
  .ad-cols{position:fixed;z-index:1050;width:240px;max-height:360px;overflow:auto;background:var(--bg-raised,#fff);border:1px solid var(--border-default,#e5e7eb);border-radius:8px;box-shadow:var(--card-shadow-raised,0 20px 32px -8px rgb(15 23 42/.2));padding:6px}
  .ad-cols label{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;font-size:12.5px;color:var(--text-primary,#0f172a);cursor:pointer}
  .ad-cols label:hover{background:var(--slate-100,#f1f5f9)}
  .ad-cols input{accent-color:var(--brand-600,#2d7ffb)}
  .ad-cols-foot{display:flex;justify-content:space-between;padding:6px 8px 2px;border-top:1px solid var(--border-subtle,#f1f5f9);margin-top:4px}
  .ad-cards{display:none}
  .ad-card{padding:14px 16px;border-bottom:1px solid #eef2f7;display:grid;gap:10px}
  .ad-card-top{display:flex;align-items:flex-start;gap:10px}
  .ad-card-id{flex:1;min-width:0}
  .ad-card-id a{display:block;color:var(--brand-600,#2d7ffb);font-weight:600;font-size:13px;text-decoration:none;overflow-wrap:anywhere}
  .ad-card-id span{font-size:12px;color:var(--text-secondary,#475569)}
  .ad-card-kv{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 12px}
  .ad-card-kv div{display:grid;gap:2px}
  .ad-card-kv small{font-size:10.5px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:var(--text-muted,#64748b)}
  .ad-card-kv span{font-size:12.5px;color:var(--text-primary,#0f172a);font-variant-numeric:tabular-nums}
  .pol-fixed{display:flex;flex-direction:column}
  .pol-fixed > *{flex-shrink:0}
  #ad-card.pol-fixed #ad-body{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;overflow:hidden}
  #ad-card.pol-fixed #ad-body > *{flex-shrink:0}
  #ad-card.pol-fixed #ad-body > .ad-scroll{flex:1 1 0;min-height:0;overflow:auto}
  #ad-card.pol-fixed .ad-empty{flex:1}
  .ad-tbl thead th{position:sticky;top:0;z-index:3}
  .ad-tbl thead th:nth-child(-n+2){z-index:4}
  #pm-card.pol-fixed .pm-wrap{flex:1 1 auto;height:auto;min-height:0}
  #pm-card.pol-fixed .pm-wrap.is-fs{height:100vh}
  @media (max-width:860px){.ad-scroll{display:none}.ad-cards{display:block}.ad-search{flex-basis:100%}}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const NAMES = ['ARDMORE CHEROKEE','ARDMORE CHEYENNE','ARDMORE CHINOOK','ARDMORE CHIPPEWA','ARDMORE DAUNTLESS','ARDMORE DEFENDER','ARDMORE ENCOUNTER','ARDMORE ENDEAVOUR','ARDMORE ENDURANCE','Jag Prabhu','ARDMORE ENTERPRISE','ARDMORE EXPLORER','ARDMORE EXPORTER','ARDMORE SEAFARER','ARDMORE SEAHAWK','ARDMORE SEALEADER','ARDMORE SEALIFTER','ARDMORE SEAVANGUARD','ARDMORE SEAVALOUR','ARDMORE SEAVENTURE','ARDMORE SEATRADER','ARDMORE SHORE','ARDMORE CENTURION','ARDMORE CALYPSO'];
  const EXP = [3.6,4.0,4.0,5.9,4.5,4.9,4.0,4.0,4.0,3.6,4.5,4.2,4.0,5.1,4.8,3.9,4.6,4.3,5.5,4.1,3.8,3.2,3.4,3.7];
  const TYPES = { 9:'Cargo', 10:'War', 15:'War', 19:'Cargo' };
  const m = v => '$' + (v >= 1 ? v.toFixed(1) + 'M' : (v * 1000).toFixed(1) + 'K');
  const ROWS = NAMES.map((name, i) => {
    const n = String(i + 1).padStart(2, '0'), e = EXP[i], type = TYPES[i] || 'Hull', expired = i >= 21;
    return {
      id: i, num: `Policy 2025_Ardm_${n}`, asset: name, ref: `2025_MR_Pool_${n}`, contract: `2025_MR_Pool_${n}`, signed: 0.15,
      exp: e, warExp: +(e * 4.97).toFixed(1), warTiv: +(e * 1.25).toFixed(1), tiv: +(e * 6.61).toFixed(1), prem: +(e * 0.00297).toFixed(4),
      hm: type === 'Hull' && i % 4 === 2 ? +(e * 5.2).toFixed(1) : null, iv: type === 'Hull' && i % 5 === 3 ? +(e * 1.3).toFixed(1) : null, fdd: null,
      period: i === 0 ? null : expired ? `202${i - 19}-02-20 / 202${i - 18}-02-20` : '2025-02-20 / 2028-02-20',
      status: expired ? 'Expired' : 'Active', type, placement: type === 'Cargo' ? null : type === 'War' ? 'Binder' : 'Open Market',
      insurer: `Insurer_${String(Math.min(i + 1, 3) === 3 ? i - 1 : i < 3 ? 1 : i - 1).padStart(2, '0')}`.replace('Insurer_-1', 'Insurer_01').replace('Insurer_00', 'Insurer_01'),
      broker: `Broker_${String(Math.max(1, i - 1)).padStart(2, '0')}`,
    };
  });
  ROWS.forEach((r, i) => { const k = i < 3 ? 1 : i - 1; r.insurer = `Insurer_${String(k).padStart(2, '0')}`; r.broker = `Broker_${String(k).padStart(2, '0')}`; });

  window.__AD_ROWS = () => ROWS.filter(r => !S.deleted.has(r.id));
  const COLS = [
    { k:'num', l:'Number', link:'policy' }, { k:'asset', l:'Asset', link:'vessel' }, { k:'ref', l:'Policy Ref' }, { k:'contract', l:'Contract Details Ref' },
    { k:'signed', l:'Signed Line', f:v => v.toFixed(4) + '%' }, { k:'exp', l:'Exposure', f:m }, { k:'warExp', l:'War Exposure', f:m },
    { k:'warTiv', l:'War Total Insured Value', f:m }, { k:'tiv', l:'Total Insured Value', f:m }, { k:'prem', l:'Premium Details', f:m },
    { k:'hm', l:'Hull & Machinery', f:m }, { k:'iv', l:'Increased Value', f:m }, { k:'fdd', l:'Freight, Demurrage & Defence', f:m },
    { k:'period', l:'Coverage Period' }, { k:'type', l:'Policy Type' }, { k:'placement', l:'Placement Type' },
    { k:'insurer', l:'Insurer Details' }, { k:'broker', l:'Broker Details' },
  ];
  const DEF = { q:'', status:'Active', type:'all' };
  const S = { ...DEF, sort:{ key:'num', dir:1 }, page:1, per:25, sel:new Set(), hidden:new Set(), deleted:new Set() };

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  function filtered() {
    const q = S.q.trim().toLowerCase();
    let r = ROWS.filter(x => !S.deleted.has(x.id));
    if (S.status !== 'all') r = r.filter(x => x.status === S.status);
    if (S.type !== 'all') r = r.filter(x => x.type === S.type);
    if (q) r = r.filter(x => [x.num, x.asset, x.ref, x.contract, x.insurer, x.broker, x.type, x.placement || ''].some(v => v.toLowerCase().includes(q)));
    const { key, dir } = S.sort;
    return [...r].sort((a, b) => { const x = a[key], y = b[key]; if (x == null && y == null) return 0; if (x == null) return 1; if (y == null) return -1; return (typeof x === 'number' ? x - y : String(x).localeCompare(String(y), undefined, { numeric:true })) * dir; });
  }
  const vis = () => COLS.filter(c => !S.hidden.has(c.k));
  const cell = (c, r) => {
    const v = r[c.k];
    if (v == null) return `<td class="ad-na">-</td>`;
    const t = c.f ? c.f(v) : v;
    if (c.link === 'policy') return `<td class="lnk">${esc(t)}</td>`;
    if (c.link === 'vessel') return `<td class="lnk ad-asset" title="${esc(t)}"><a href="VesselDetails.html">${esc(t)}</a></td>`;
    return `<td>${esc(t)}</td>`;
  };
  const th = c => {
    const on = S.sort.key === c.k, asc = S.sort.dir > 0;
    return `<th scope="col" class="ds-th--sortable${on ? ' ds-th--active' : ''}" aria-sort="${on ? (asc ? 'ascending' : 'descending') : 'none'}"><button type="button" class="ds-th-sort" data-ad-sort="${c.k}"><span>${esc(c.l)}</span>${window.dsSortInd ? dsSortInd(on, asc) : ''}</button></th>`;
  };

  function body() {
    const rows = filtered(), total = rows.length, pages = Math.max(1, Math.ceil(total / S.per));
    if (S.page > pages) S.page = pages;
    const pr = rows.slice((S.page - 1) * S.per, S.page * S.per), cols = vis();
    S.sel.forEach(id => { if (!rows.some(r => r.id === id)) S.sel.delete(id); });
    const pageAll = pr.length && pr.every(r => S.sel.has(r.id)), pageSome = pr.some(r => S.sel.has(r.id));
    const n = S.sel.size;
    const selbar = `<div class="ad-selbar"><button type="button" class="ad-btn" data-ad-del ${n ? '' : 'disabled'} style="height:28px;padding:0 10px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>Delete</button>
      <span><b>${n} of ${total}</b> selected${total && n < total ? ` or <button type="button" class="ad-link" data-ad-selall>Select all ${total} policies</button>` : n ? ` · <button type="button" class="ad-link" data-ad-clear>Clear selection</button>` : ''}</span></div>`;
    const empty = `<div class="ad-empty"><b>No policies match</b>Try a different search, or reset the filters.</div>`;
    return `${selbar}
      <div class="overflow-x-auto scroll-thin pol-table-scroll ad-scroll">
        <table class="pol-table ad-tbl">
          <thead><tr><th style="vertical-align:middle"><input type="checkbox" data-ad-page aria-label="Select all on this page" ${pageAll ? 'checked' : ''} ${!pageAll && pageSome ? 'data-ind="1"' : ''}></th>${cols.map(th).join('')}</tr></thead>
          <tbody>${pr.map(r => `<tr class="${S.sel.has(r.id) ? 'is-sel' : ''}"><td><input type="checkbox" data-ad-row="${r.id}" aria-label="Select ${esc(r.num)}" ${S.sel.has(r.id) ? 'checked' : ''}></td>${cols.map(c => cell(c, r)).join('')}</tr>`).join('')}</tbody>
        </table>
        ${pr.length ? '' : empty}
      </div>
      <div class="ad-cards">${pr.length ? pr.map(r => `<article class="ad-card">
        <div class="ad-card-top"><input type="checkbox" data-ad-row="${r.id}" aria-label="Select ${esc(r.num)}" ${S.sel.has(r.id) ? 'checked' : ''} style="margin-top:3px"><div class="ad-card-id"><a href="VesselDetails.html">${esc(r.asset)}</a><span>${esc(r.num)} · ${esc(r.type)}</span></div></div>
        <div class="ad-card-kv"><div><small>Exposure</small><span>${m(r.exp)}</span></div><div><small>Total Insured Value</small><span>${m(r.tiv)}</span></div><div><small>War Exposure</small><span>${m(r.warExp)}</span></div><div><small>Premium</small><span>${m(r.prem)}</span></div><div style="grid-column:1/-1"><small>Coverage Period</small><span>${r.period || '-'}</span></div></div>
      </article>`).join('') : empty}</div>
      <div id="ad-pg">${dsPagination({ page:S.page, totalPages:pages, totalItems:total, perPage:S.per, perPageOptions:[10, 25, 50], label:'results' })}</div>`;
  }
  const dirty = () => S.q !== DEF.q || S.status !== DEF.status || S.type !== DEF.type;
  const chev = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m6 9 6 6 6-6"></path></svg>';
  const sel = (id, label, opts, cur) => `<div class="ad-sel-wrap"><select class="ad-sel" id="${id}" aria-label="${label}">${opts.map(([v, l]) => `<option value="${v}" ${v === cur ? 'selected' : ''}>${l}</option>`).join('')}</select>${chev}</div>`;

  window.AssetDetailsSection = function (tabsHtml) {
    return `<div class="bg-white rounded-xl border border-ink-200 shadow-card overflow-hidden" id="ad-card">
      <div class="pol-toolbar flex items-center gap-2 px-3 py-2.5 border-b border-ink-100 flex-wrap">${tabsHtml}<div class="flex-1"></div></div>
      <div class="ad-toolbar">
        <div class="ad-search"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg><input type="text" id="ad-q" placeholder="Search by policy, asset, reference, insurer or broker" aria-label="Search policies" value="${esc(S.q)}"></div>
        <div class="ad-ctrls">
          <button type="button" class="ad-btn" id="ad-reset" ${dirty() ? '' : 'disabled'}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"></path><path d="M3 3v5h5"></path></svg>Reset Filters</button>
          ${sel('ad-status', 'Policy status', [['all', 'All Statuses'], ['Active', 'Active'], ['Expired', 'Expired']], S.status)}
          ${sel('ad-type', 'Policy type', [['all', 'All Policy Types'], ['Hull', 'Hull'], ['Cargo', 'Cargo'], ['War', 'War']], S.type)}
          <button type="button" class="ad-btn" id="ad-cols-btn" aria-haspopup="true" aria-expanded="false">Edit Columns${chev}</button>
        </div>
      </div>
      <div id="ad-body">${body()}</div>
    </div>`;
  };

  function refresh() {
    const b = document.getElementById('ad-body'); if (!b) return;
    b.innerHTML = body();
    const r = document.getElementById('ad-reset'); if (r) r.disabled = !dirty();
    wire();
  }
  function wire() {
    const pc = document.querySelector('[data-ad-page]'); if (pc && pc.dataset.ind) pc.indeterminate = true;
    const pg = document.querySelector('#ad-pg .ds-pagination-wrap') || document.querySelector('#ad-pg > *');
    if (pg) dsWirePagination(pg, { onPage:p => { S.page = p; refresh(); }, onPerPage:n => { S.per = n; S.page = 1; refresh(); } });
  }
  window.wireAssetDetails = function () {
    const q = document.getElementById('ad-q'); if (!q) return;
    q.oninput = () => { S.q = q.value; S.page = 1; refresh(); };
    document.getElementById('ad-status').onchange = e => { S.status = e.target.value; S.page = 1; refresh(); };
    document.getElementById('ad-type').onchange = e => { S.type = e.target.value; S.page = 1; refresh(); };
    document.getElementById('ad-reset').onclick = () => { Object.assign(S, DEF, { page:1 }); q.value = ''; document.getElementById('ad-status').value = DEF.status; document.getElementById('ad-type').value = DEF.type; refresh(); };
    document.getElementById('ad-cols-btn').onclick = e => { e.stopPropagation(); toggleCols(e.currentTarget); };
    wire();
  };

  /* ── Map view — mirrors the Marine Dashboard map (controls, menus, markers, popups) ── */
  const POS = [[26.2,56.4,312,'Under way using engine'],[25.3,55.2,0,'At Anchor'],[12.6,44.9,128,'Under way using engine'],[29.9,32.6,340,'Under way using engine'],[36.0,-5.6,272,'Under way using engine'],[51.9,3.9,0,'Moored'],[1.2,103.9,48,'Under way using engine'],[22.3,114.2,0,'At Anchor'],[29.4,-94.7,0,'Moored'],[-33.9,18.4,96,'Under way using engine'],[13.2,51.1,250,'Under way using engine'],[5.6,-0.2,0,'At Anchor'],[-23.9,-46.3,190,'Under way using engine'],[35.4,139.7,0,'Moored'],[19.0,72.8,0,'At Anchor'],[38.0,23.6,75,'Under way using engine'],[43.3,5.3,0,'Moored'],[9.0,-79.5,162,'Under way using engine'],[31.2,121.5,0,'At Anchor'],[-6.1,106.8,300,'Under way using engine'],[57.7,11.9,0,'Moored'],[40.6,-74.0,0,'At Anchor'],[-34.6,-58.3,0,'Moored'],[24.5,54.4,0,'Moored']];
  const VTYPES = [{k:'Container',color:'#2d7ffb'},{k:'Bulk Carrier',color:'#51a2fc'},{k:'Tanker',color:'#dc2626'},{k:'Gas Carrier',color:'#d97706'},{k:'LNG Carrier',color:'#65a30d'},{k:'General Cargo',color:'#16a34a'},{k:'Refrigerated Cargo',color:'#0891b2'},{k:'Cruise Passenger',color:'#db2777'},{k:'Vehicle Carrier',color:'#9333ea'},{k:'Yacht',color:'#d97706'}];
  const VT_OF = i => i % 7 === 3 ? 'Gas Carrier' : i % 9 === 4 ? 'LNG Carrier' : i === 9 ? 'General Cargo' : i === 19 ? 'Bulk Carrier' : 'Tanker';
  const COMPL = [{k:'Ok',color:'#16a34a'},{k:'Warning',color:'#d97706'},{k:'Sanctioned',color:'#dc2626'}];
  const CO_OF = i => i === 6 || i === 15 ? 'Sanctioned' : i % 5 === 1 ? 'Warning' : 'Ok';
  const PTYPES = ['Hull','Cargo','War'];
  const FLAGS = [['mh','Marshall Islands'],['lr','Liberia'],['pa','Panama'],['sg','Singapore'],['mt','Malta'],['bs','Bahamas'],['gr','Greece']];
  const PORTS = [['AEFJR','Fujairah','ae'],['NLRTM','Rotterdam','nl'],['SGSIN','Singapore','sg'],['USHOU','Houston','us'],['INBOM','Mumbai','in'],['CNSHA','Shanghai','cn'],['BRSSZ','Santos','br'],['ZACPT','Cape Town','za'],['GRPIR','Piraeus','gr'],['JPYOK','Yokohama','jp']];
  const TILES = {
    satellite:{ l:'Satellite',   url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', bg:'#0b1220' },
    street:   { l:'Street View', url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', bg:'#e5e7eb' },
    dark:     { l:'Dark Mode',   url:'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', bg:'#0b1220' },
    light:    { l:'Light Mode',  url:'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', bg:'#f3f4f6' },
  };
  const MS = { base:'satellite', vt:new Set(VTYPES.map(t => t.k)), co:new Set(COMPL.map(c => c.k)), pt:new Set(PTYPES), labels:false, open:null };
  let map = null, markers = [], labels = [], tiles = null;
  const I = () => (window.sharedChrome && window.sharedChrome.I) || {};
  const pad = n => String(n).padStart(2, '0');
  function vessel(r) {
    const [lat, lng, hdg, nav] = POS[r.id % POS.length], i = r.id, f = FLAGS[i % FLAGS.length], from = PORTS[i % PORTS.length], to = PORTS[(i * 3 + 4) % PORTS.length];
    const moving = nav.startsWith('Under way'), dur = 40 + (i * 37) % 300;
    return { r, lat, lng, hdg, nav, type:VT_OF(i), compliance:CO_OF(i), flag:{ cc:f[0], name:f[1] }, from:{ code:from[0], name:from[1], cc:from[2] }, to:{ code:to[0], name:to[1], cc:to[2] },
      adt:`2026-10-0${1 + i % 6} ${pad(i % 24)}:${pad((i * 17) % 60)}`, eta:`2026-10-${pad(8 + i % 14)} ${pad((i * 5) % 24)}:${pad((i * 23) % 60)}`,
      durH:Math.floor(dur / 6), durM:(dur * 7) % 60, dist:600 + (i * 211) % 5400, speed:moving ? (10.5 + (i * 0.7) % 4).toFixed(1) : '0.0', course:moving ? hdg : 0,
      draught:9.2 + (i * 0.37) % 4, maxD:13.3, ts:`2026-10-07 ${pad(8 + i % 3)}:${pad((i * 13) % 60)} UTC` };
  }
  const mcss = document.createElement('style'); mcss.textContent = `
  .pm-wrap{position:relative;height:620px}
  #pm-map{position:absolute;inset:0;background:#0b1220}
  #pm-map .leaflet-top.leaflet-left{top:56px;left:2px}
  #pm-map .leaflet-top.leaflet-left .leaflet-bar{margin-left:10px!important}
  .pm-wrap .leaflet-control-zoom,.pm-wrap .leaflet-bar{border:1px solid #e5e7eb!important;box-shadow:0 1px 2px rgb(15 23 42/.08)!important;border-radius:8px!important;overflow:hidden}
  .pm-wrap .leaflet-bar a{background:#fff!important;color:#374151!important}
  .pm-wrap .leaflet-bar a:hover{background:#f3f4f6!important}
  .pm-wrap .leaflet-control-zoom a{display:flex!important;align-items:center;justify-content:center;padding:0!important}
  .pm-wrap .leaflet-control-zoom a svg{width:16px;height:16px}
  .pm-wrap .map-btn{width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid #e5e7eb;border-radius:8px;color:#374151;box-shadow:0 1px 2px rgb(15 23 42/.08);cursor:pointer}
  .pm-wrap .map-btn:hover{background:#f3f4f6}.pm-wrap .map-btn:active{background:#e5e7eb}
  .pm-wrap .map-btn[aria-expanded="true"]{background:#f3f4f6}
  .pm-wrap .map-btn:focus-visible{outline:0;box-shadow:var(--shadow-focus,0 0 0 3px rgba(46,134,192,.32))}
  .pm-fs{position:absolute;top:12px;left:12px;z-index:400}
  .pm-right{position:absolute;top:12px;right:12px;z-index:400;display:flex;flex-direction:column;gap:4px;align-items:flex-end}
  .pm-menu{position:absolute;top:0;right:calc(100% + 8px);background:#fff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 6px 12px -2px rgb(15 23 42/.12),0 3px 6px -3px rgb(15 23 42/.10);overflow:hidden;display:flex;flex-direction:column;max-height:420px}
  .pm-menu[hidden]{display:none}
  .pm-mh{padding:10px 12px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between}
  .pm-mh b{font-size:14px;font-weight:700;color:#1e293b}
  .pm-mh span{display:flex;gap:4px}
  .pm-mh button{height:24px;padding:0 8px;border-radius:6px;border:1px solid #e2e8f0;background:#fff;font:inherit;font-size:11px;font-weight:600;color:#334155;cursor:pointer}
  .pm-mh button:hover{background:#f8fafc}
  .pm-msub{padding:8px 12px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#475569}
  .pm-mlist{overflow-y:auto;padding:4px 0}
  .pm-row{display:flex;align-items:center;gap:10px;padding:6px 12px;cursor:pointer;font-size:13px;color:#334155}
  .pm-row:hover{background:#f8fafc}
  .pm-row input{width:16px;height:16px;accent-color:var(--brand-600,#2d7ffb);margin:0}
  .pm-row .pm-n{margin-left:auto;font-size:11.5px;color:#94a3b8;font-variant-numeric:tabular-nums}
  .pm-opt{width:100%;display:flex;align-items:center;justify-content:space-between;padding:8px 12px;font:inherit;font-size:14px;color:#374151;background:transparent;border:0;cursor:pointer;text-align:left}
  .pm-opt:hover{background:#f8fafc}
  .pm-opt[aria-checked="true"]{color:#2d7ffb;font-weight:600}
  .pm-opt span:last-child{color:#2d7ffb;opacity:0;display:flex}.pm-opt[aria-checked="true"] span:last-child{opacity:1}
  .pm-sw{position:relative;display:inline-flex;height:24px;width:44px;align-items:center;border-radius:999px;background:#d1d5db;border:0;cursor:pointer;transition:background-color .15s}
  .pm-sw span{display:inline-block;height:20px;width:20px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgb(0 0 0/.2);transform:translateX(2px);transition:transform .15s}
  .pm-sw[aria-checked="true"]{background:#2d7ffb}.pm-sw[aria-checked="true"] span{transform:translateX(22px)}
  .pm-count{position:absolute;left:12px;bottom:12px;z-index:400;background:rgba(15,23,42,.82);color:#fff;font-size:11.5px;font-weight:600;padding:4px 9px;border-radius:6px}
  .pm-wrap.is-fs{position:fixed;inset:0;z-index:9999;height:100vh!important}
  .pm-wrap .vessel-label-wrap{background:transparent!important;border:0!important}
  .pm-wrap .vessel-label{display:inline-block;white-space:nowrap;background:rgba(15,23,42,.88);color:#fff;font-family:'Exo','Open Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:.01em;padding:3px 7px;border-radius:5px;box-shadow:0 1px 3px rgba(0,0,0,.25);text-shadow:0 1px 1px rgba(0,0,0,.5);pointer-events:none}
  .pm-wrap .vessel-marker{position:relative;cursor:pointer}
  .pm-wrap .vessel-marker svg{filter:drop-shadow(0 1px 2px rgba(0,0,0,.5))}
  .pm-wrap .vessel-marker::after{content:'';position:absolute;left:50%;top:50%;width:24px;height:24px;transform:translate(-50%,-50%);border-radius:50%;border:2px solid #fff;box-shadow:0 0 5px rgba(0,0,0,.45);opacity:0;transition:opacity .14s ease;pointer-events:none}
  .pm-wrap .leaflet-marker-icon:hover .vessel-marker::after,.pm-wrap .leaflet-marker-icon.is-selected .vessel-marker::after{opacity:1}
  .pm-wrap .leaflet-marker-icon:hover,.pm-wrap .leaflet-marker-icon.is-selected{z-index:1000!important}
  .vessel-tip.leaflet-tooltip{background:rgba(15,23,42,.93);border:0;border-radius:7px;box-shadow:0 3px 10px rgba(0,0,0,.4);padding:6px 9px;color:#fff;font-family:'Open Sans',system-ui,sans-serif}
  .vessel-tip.leaflet-tooltip-top::before{border-top-color:rgba(15,23,42,.93)}
  .vessel-tip .vtip-row{display:flex;align-items:center;gap:6px}
  .vessel-tip .vtip-flag{border-radius:2px;box-shadow:0 0 0 1px rgba(255,255,255,.25);flex-shrink:0}
  .vessel-tip .vtip-name{font-family:'Exo','Open Sans',sans-serif;font-weight:700;font-size:12px}
  .vessel-tip .vtip-type{display:block;font-size:11px;color:#d1d5db;margin-top:2px}
  .vessel-popup .leaflet-popup-content-wrapper{padding:0;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,.25)}
  .vessel-popup .leaflet-popup-content{margin:0;width:300px!important;font-family:'Open Sans',system-ui,sans-serif}
  .vessel-popup .leaflet-popup-tip{background:#fff}
  .vp{background:#fff;color:#111827}
  .vp-header{background:var(--brand-600,#2d7ffb);color:#fff;padding:12px 14px 10px}
  .vp-title{font-family:'Exo','Open Sans',sans-serif;font-weight:800;font-size:15px;letter-spacing:.02em;display:flex;align-items:center;padding-right:24px}
  .vp-subtitle{font-size:11.5px;color:rgba(255,255,255,.85);margin-top:2px}
  .vp-route{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:center;padding:12px 14px;border-bottom:1px solid #e5e7eb}
  .vp-port{text-align:center}
  .vp-port-code{font-family:'Exo','Open Sans',sans-serif;font-weight:800;font-size:15px;color:#111827}
  .vp-port-name{font-size:11.5px;color:#374151;margin-top:1px}
  .vp-port-time{font-size:10px;color:#6b7280;margin-top:3px;letter-spacing:.02em}
  .vp-arrow{color:#6b7280;font-size:16px}
  .vp-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px 16px;padding:12px 14px}
  .vp-grid>div{min-width:0}.vp-span{grid-column:1/-1}
  .vp-k{font-size:10.5px;color:#6b7280}
  .vp-v{font-size:12.5px;color:#111827;margin-top:1px;font-weight:600}
  .vp-strong{font-weight:700;color:#111827}.vp-muted{color:#6b7280;font-weight:500;font-size:11px}
  .vp-nav{color:#16a34a;font-weight:700}
  .vp-cta{display:block;width:calc(100% - 28px);margin:4px 14px 14px;color:var(--brand-600,#2d7ffb)!important;border-radius:8px;height:32px;line-height:32px;font-weight:500;font-size:13px;text-align:center;text-decoration:none;transition:background .15s}
  .vp-cta:hover{background:var(--brand-50,#eff6ff)}
  .vessel-popup .leaflet-popup-close-button{color:#fff!important;top:8px!important;right:10px!important;font-size:22px!important;font-weight:400!important;width:24px!important;height:24px!important;line-height:22px!important;padding:0!important;border-radius:6px;opacity:.9}
  .vessel-popup .leaflet-popup-close-button:hover{background:rgba(255,255,255,.18);opacity:1}
  @media (max-width:640px){.pm-wrap{height:440px}}`; document.head.appendChild(mcss);

  const color = t => (VTYPES.find(v => v.k === t) || VTYPES[2]).color;
  function icon(v) {
    const stat = v.nav === 'Moored' || v.nav === 'At Anchor', c = color(v.type);
    const shape = stat ? `<svg viewBox="0 0 24 24" width="16" height="16" style="color:${c}" fill="currentColor" stroke="#fff" stroke-width="1.5"><circle cx="12" cy="12" r="7.5"></circle></svg>`
      : `<svg viewBox="0 0 24 24" width="16" height="16" style="color:${c}" fill="currentColor" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"><path d="M12 2 L19 20 L12 16 L5 20 Z"></path></svg>`;
    return L.divIcon({ html:`<div class="vessel-marker" style="${stat ? '' : `transform:rotate(${v.hdg + 45}deg);transform-origin:center;`}">${shape}</div>`, className:'', iconSize:[16, 16], iconAnchor:[8, 8] });
  }
  const flagImg = (cc, n, w = 18, h = 13) => `<img src="https://flagcdn.com/w40/${cc}.png" srcset="https://flagcdn.com/w80/${cc}.png 2x" width="${w}" height="${h}" alt="${n}" style="display:inline-block;border-radius:2px;vertical-align:middle;margin-right:4px;">`;
  const tipHTML = v => `<span class="vtip-row"><img class="vtip-flag" src="https://flagcdn.com/w40/${v.flag.cc}.png" width="18" height="13" alt="${v.flag.name}"><span class="vtip-name">${esc(v.r.asset)}</span></span><span class="vtip-type">${v.type} · ${v.flag.name}</span>`;
  function popupHTML(v) {
    const lat = `${Math.abs(v.lat).toFixed(2)}${v.lat >= 0 ? 'N' : 'S'}`, lng = `${Math.abs(v.lng).toFixed(2)}${v.lng >= 0 ? 'E' : 'W'}`;
    return `<div class="vp">
      <div class="vp-header"><div class="vp-title">${flagImg(v.flag.cc, v.flag.name, 16, 12)}${esc(v.r.asset)}</div><div class="vp-subtitle">${v.type}</div></div>
      <div class="vp-route"><div class="vp-port"><div class="vp-port-code">${v.from.code}</div><div class="vp-port-name">${v.from.name}</div><div class="vp-port-time">ADT: ${v.adt}</div></div><div class="vp-arrow">→</div><div class="vp-port"><div class="vp-port-code">${v.to.code}</div><div class="vp-port-name">${v.to.name}</div><div class="vp-port-time">ETA (UTC): ${v.eta}</div></div></div>
      <div class="vp-grid">
        <div><div class="vp-k">Estimated Duration:</div><div class="vp-v">${v.durH}h ${v.durM}m</div></div>
        <div><div class="vp-k">Distance:</div><div class="vp-v">${v.dist.toLocaleString()} nm</div></div>
        <div><div class="vp-k">Lat/Lng:</div><div class="vp-v vp-strong">${lat} /<br>${lng}</div></div>
        <div><div class="vp-k">Flag:</div><div class="vp-v">${flagImg(v.flag.cc, v.flag.name)}${v.flag.name}</div></div>
        <div class="vp-span"><div class="vp-k">Nav status:</div><div class="vp-v vp-nav">${v.nav}</div></div>
        <div><div class="vp-k">Speed (Knots):</div><div class="vp-v"><span class="vp-strong">${v.speed}</span> Knots</div></div>
        <div><div class="vp-k">Course over ground:</div><div class="vp-v">${v.course}</div></div>
        <div><div class="vp-k">Draught (m):</div><div class="vp-v"><span class="vp-strong">${v.draught.toFixed(2)}</span><br><span class="vp-muted">(max ${v.maxD.toFixed(2)})</span></div></div>
        <div><div class="vp-k">Heading (deg):</div><div class="vp-v">${Math.round(v.course)}</div></div>
        <div class="vp-span"><div class="vp-k">Timestamp:</div><div class="vp-v">${v.ts}</div></div>
        <div><div class="vp-k">Policy:</div><div class="vp-v">${esc(v.r.num)}</div></div>
        <div><div class="vp-k">Policy Type:</div><div class="vp-v vp-strong">${v.r.type}</div></div>
        <div><div class="vp-k">Exposure:</div><div class="vp-v">${m(v.r.exp)}</div></div>
        <div><div class="vp-k">Compliance:</div><div class="vp-v" style="color:${COMPL.find(c => c.k === v.compliance).color}">${v.compliance}</div></div>
      </div>
      <a href="VesselDetails.html" class="vp-cta">View Full Vessel Details</a>
    </div>`;
  }

  const menuHead = (title, key) => `<div class="pm-mh"><b>${title}</b><span><button type="button" data-pm-all="${key}">All</button><button type="button" data-pm-none="${key}">None</button></span></div>`;
  const tear = c => `<svg viewBox="0 0 24 24" width="16" height="16" style="transform:rotate(45deg);color:${c}" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round"><path d="M12 2 L19 20 L12 16 L5 20 Z"></path></svg>`;
  const btn = (id, title, ico, menu) => `<div style="position:relative"><button type="button" class="map-btn" data-pm-btn="${id}" title="${title}" aria-label="${title}" aria-haspopup="true" aria-expanded="false">${ico}</button>${menu}</div>`;
  const svgI = d => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

  window.PortfolioMapSection = function (tabsHtml) {
    const vs = window.__AD_ROWS().map(vessel), cnt = (k, v) => vs.filter(x => x[k] === v).length, ic = I();
    return `<div class="bg-white rounded-xl border border-ink-200 shadow-card overflow-hidden" id="pm-card">
      <div class="pol-toolbar flex items-center gap-2 px-3 py-2.5 border-b border-ink-100 flex-wrap">${tabsHtml}<div class="flex-1"></div></div>
      <div class="pm-wrap" id="pm-wrap">
        <div id="pm-map" role="region" aria-label="Map of portfolio vessels"></div>
        <button type="button" class="map-btn pm-fs" id="pm-fs" title="Toggle fullscreen" aria-label="Toggle fullscreen">${ic.maximize || svgI('<path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"></path>')}</button>
        <div class="pm-right">
          ${btn('layers', 'Layers', ic.layers || svgI('<path d="m12 2 10 5-10 5L2 7z"></path><path d="m2 17 10 5 10-5M2 12l10 5 10-5"></path>'), `<div class="pm-menu" data-pm-menu="layers" hidden style="width:160px;padding:4px 0" role="menu">${Object.entries(TILES).map(([k, t]) => `<button type="button" class="pm-opt" role="menuitemradio" data-pm-base="${k}" aria-checked="${MS.base === k}"><span>${t.l}</span><span>${ic.check || '✓'}</span></button>`).join('')}</div>`)}
          ${btn('vt', 'Filter vessels', ic.filter || svgI('<path d="M22 3H2l8 9.46V19l4 2v-8.54z"></path>'), `<div class="pm-menu" data-pm-menu="vt" hidden style="width:240px">${menuHead('Filter Vessels', 'vt')}<div class="pm-msub">Vessel Type</div><div class="pm-mlist scroll-thin">${VTYPES.map(t => `<label class="pm-row"><input type="checkbox" data-pm-f="vt" value="${t.k}" ${MS.vt.has(t.k) ? 'checked' : ''}>${tear(t.color)}<span>${t.k}</span><span class="pm-n">${cnt('type', t.k)}</span></label>`).join('')}</div></div>`)}
          ${btn('co', 'Filter by compliance status', svgI('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path>'), `<div class="pm-menu" data-pm-menu="co" hidden style="width:220px">${menuHead('Compliance Status', 'co')}<div class="pm-mlist">${COMPL.map(c => `<label class="pm-row"><input type="checkbox" data-pm-f="co" value="${c.k}" ${MS.co.has(c.k) ? 'checked' : ''}><span style="width:10px;height:10px;border-radius:50%;background:${c.color}"></span><span>${c.k}</span><span class="pm-n">${cnt('compliance', c.k)}</span></label>`).join('')}</div></div>`)}
          ${btn('pt', 'Filter by policy type', svgI('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M9 13h6"></path><path d="M9 17h4"></path>'), `<div class="pm-menu" data-pm-menu="pt" hidden style="width:220px">${menuHead('Policy Type', 'pt')}<div class="pm-mlist">${PTYPES.map(p => `<label class="pm-row"><input type="checkbox" data-pm-f="pt" value="${p}" ${MS.pt.has(p) ? 'checked' : ''}><span>${p}</span><span class="pm-n">${vs.filter(x => x.r.type === p).length}</span></label>`).join('')}</div></div>`)}
          ${btn('lb', 'Vessel labels', ic.tag || svgI('<path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"></path><circle cx="7.5" cy="7.5" r=".5"></circle>'), `<div class="pm-menu" data-pm-menu="lb" hidden style="width:260px;padding:12px"><div style="display:flex;align-items:center;justify-content:space-between;gap:12px"><b style="font-size:14px;color:#0f172a">Show Labels</b><button type="button" class="pm-sw" id="pm-labels" role="switch" aria-checked="${MS.labels}" aria-label="Show vessel labels"><span></span></button></div><p style="margin:6px 0 0;font-size:12px;line-height:1.4;color:#64748b">Display vessel names directly on the map next to icons. Labels appear when zoomed in.</p></div>`)}
        </div>
        <div class="pm-count" id="pm-count" aria-live="polite"></div>
      </div>
    </div>`;
  };

  const LABEL_MIN_ZOOM = 5;
  function apply() {
    if (!map) return;
    let n = 0;
    const zoomOK = map.getZoom() >= LABEL_MIN_ZOOM, showL = MS.labels && zoomOK;
    markers.forEach((mk, i) => {
      const v = mk._v, show = MS.vt.has(v.type) && MS.co.has(v.compliance) && MS.pt.has(v.r.type);
      if (show) n++;
      if (show && !map.hasLayer(mk)) mk.addTo(map); if (!show && map.hasLayer(mk)) map.removeLayer(mk);
      const lb = labels[i]; if (show && showL) { if (!map.hasLayer(lb)) lb.addTo(map); } else if (map.hasLayer(lb)) map.removeLayer(lb);
      if (showL) { if (mk.getTooltip()) mk.unbindTooltip(); } else if (!mk.getTooltip()) mk.bindTooltip(tipHTML(v), { className:'vessel-tip', direction:'top', offset:[0, -12], opacity:1 });
    });
    const c = document.getElementById('pm-count'); if (c) c.textContent = `${n} of ${markers.length} vessels shown`;
  }
  function setBase(k) {
    if (!TILES[k]) return; if (tiles) map.removeLayer(tiles);
    tiles = L.tileLayer(TILES[k].url, { attribution:'Tiles © Esri', maxZoom:19 }).addTo(map); MS.base = k;
    document.getElementById('pm-map').style.background = TILES[k].bg;
    document.querySelectorAll('[data-pm-base]').forEach(b => b.setAttribute('aria-checked', b.dataset.pmBase === k));
  }
  function closeMenus(except) {
    document.querySelectorAll('[data-pm-menu]').forEach(mn => { if (mn.dataset.pmMenu !== except) mn.hidden = true; });
    document.querySelectorAll('[data-pm-btn]').forEach(b => b.setAttribute('aria-expanded', b.dataset.pmBtn === except && !document.querySelector(`[data-pm-menu="${except}"]`).hidden));
  }
  window.wirePortfolioMap = function () {
    const el = document.getElementById('pm-map');
    if (map) { map.remove(); map = null; }
    markers = []; labels = [];
    if (!el || !window.L) return;
    map = L.map(el, { center:[20, 40], zoom:2, minZoom:2, maxZoom:7, worldCopyJump:true, scrollWheelZoom:false });
    el.addEventListener('click', () => map && map.scrollWheelZoom.enable(), { once:true });
    setBase(MS.base);
    const ic = I(), zin = el.querySelector('.leaflet-control-zoom-in'), zout = el.querySelector('.leaflet-control-zoom-out');
    if (zin && ic.plus) zin.innerHTML = `<span style="display:inline-flex;align-items:center;justify-content:center;width:100%;height:100%">${ic.plus}</span>`;
    if (zout && ic.minus) zout.innerHTML = `<span style="display:inline-flex;align-items:center;justify-content:center;width:100%;height:100%">${ic.minus}</span>`;
    L.control.scale({ imperial:false, position:'bottomright' }).addTo(map);
    const pts = [];
    window.__AD_ROWS().map(vessel).forEach(v => {
      pts.push([v.lat, v.lng]);
      const mk = L.marker([v.lat, v.lng], { icon:icon(v), title:v.r.asset, alt:v.r.asset })
        .bindPopup(popupHTML(v), { className:'vessel-popup', maxWidth:320, minWidth:300, autoPanPadding:[30, 30] });
      mk._v = v; markers.push(mk);
      labels.push(L.marker([v.lat, v.lng], { icon:L.divIcon({ html:`<div class="vessel-label">${esc(v.r.asset)}</div>`, className:'vessel-label-wrap', iconSize:[0, 0], iconAnchor:[-10, 7] }), interactive:false, keyboard:false }));
    });
    map.on('popupopen', e => e.popup._source && e.popup._source._icon && e.popup._source._icon.classList.add('is-selected'));
    map.on('popupclose', e => e.popup._source && e.popup._source._icon && e.popup._source._icon.classList.remove('is-selected'));
    map.on('zoomend', apply);
    apply();
    if (pts.length) map.fitBounds(pts, { padding:[50, 50], maxZoom:4 });
    setTimeout(() => map && map.invalidateSize(), 60);

    const wrap = document.getElementById('pm-wrap');
    document.querySelectorAll('[data-pm-btn]').forEach(b => b.onclick = e => { e.stopPropagation(); const k = b.dataset.pmBtn, mn = document.querySelector(`[data-pm-menu="${k}"]`); const willOpen = mn.hidden; closeMenus(); mn.hidden = !willOpen; b.setAttribute('aria-expanded', willOpen); });
    wrap.querySelectorAll('.pm-menu').forEach(mn => mn.addEventListener('click', e => e.stopPropagation()));
    document.querySelectorAll('[data-pm-base]').forEach(b => b.onclick = () => { setBase(b.dataset.pmBase); closeMenus(); });
    document.querySelectorAll('[data-pm-f]').forEach(i => i.onchange = () => { const set = MS[i.dataset.pmF]; i.checked ? set.add(i.value) : set.delete(i.value); apply(); });
    const all = { vt:VTYPES.map(t => t.k), co:COMPL.map(c => c.k), pt:PTYPES };
    document.querySelectorAll('[data-pm-all],[data-pm-none]').forEach(b => b.onclick = () => { const k = b.dataset.pmAll || b.dataset.pmNone, on = !!b.dataset.pmAll; MS[k] = new Set(on ? all[k] : []); document.querySelectorAll(`[data-pm-f="${k}"]`).forEach(i => i.checked = on); apply(); });
    const sw = document.getElementById('pm-labels'); sw.onclick = () => { MS.labels = !MS.labels; sw.setAttribute('aria-checked', MS.labels); apply(); };
    const fs = document.getElementById('pm-fs');
    fs.onclick = () => { const on = wrap.classList.toggle('is-fs'); fs.innerHTML = on ? (ic.minimize || '×') : (ic.maximize || fs.innerHTML); fs.title = on ? 'Exit fullscreen' : 'Toggle fullscreen'; document.body.style.overflow = on ? 'hidden' : ''; setTimeout(() => map && map.invalidateSize(), 260); };
  };
  document.addEventListener('click', () => { if (document.querySelector('[data-pm-menu]:not([hidden])')) closeMenus(); });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const open = document.querySelector('[data-pm-menu]:not([hidden])');
    if (open) { const k = open.dataset.pmMenu; closeMenus(); document.querySelector(`[data-pm-btn="${k}"]`)?.focus(); return; }
    const w = document.getElementById('pm-wrap'); if (w && w.classList.contains('is-fs')) document.getElementById('pm-fs').click();
  });

  let colsEl = null;
  function closeCols() { if (!colsEl) return; colsEl.remove(); colsEl = null; document.getElementById('ad-cols-btn')?.setAttribute('aria-expanded', 'false'); }
  function toggleCols(btn) {
    if (colsEl) return closeCols();
    colsEl = document.createElement('div'); colsEl.className = 'ad-cols'; colsEl.setAttribute('role', 'dialog'); colsEl.setAttribute('aria-label', 'Edit columns');
    const draw = () => { colsEl.innerHTML = COLS.map(c => `<label><input type="checkbox" data-ad-col="${c.k}" ${S.hidden.has(c.k) ? '' : 'checked'} ${c.k === 'num' ? 'disabled' : ''}>${esc(c.l)}</label>`).join('') + `<div class="ad-cols-foot"><button type="button" class="ad-link" data-ad-cols-all>Show all</button><button type="button" class="ad-link" data-ad-cols-done>Done</button></div>`; };
    draw(); document.body.appendChild(colsEl);
    const r = btn.getBoundingClientRect(); colsEl.style.top = Math.min(r.bottom + 6, innerHeight - colsEl.offsetHeight - 8) + 'px'; colsEl.style.left = Math.max(8, Math.min(innerWidth - 248, r.right - 240)) + 'px';
    btn.setAttribute('aria-expanded', 'true');
    colsEl.addEventListener('change', e => { const k = e.target.dataset.adCol; if (!k) return; e.target.checked ? S.hidden.delete(k) : S.hidden.add(k); refresh(); });
    colsEl.addEventListener('click', e => { if (e.target.closest('[data-ad-cols-all]')) { S.hidden.clear(); draw(); refresh(); } if (e.target.closest('[data-ad-cols-done]')) closeCols(); });
  }
  document.addEventListener('mousedown', e => { if (colsEl && !colsEl.contains(e.target) && !e.target.closest('#ad-cols-btn')) closeCols(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && colsEl) { closeCols(); document.getElementById('ad-cols-btn')?.focus(); } });
  window.addEventListener('scroll', () => closeCols(), true);

  document.addEventListener('click', e => {
    const s = e.target.closest('[data-ad-sort]');
    if (s) { const k = s.dataset.adSort; S.sort = S.sort.key === k ? { key:k, dir:-S.sort.dir } : { key:k, dir:1 }; S.page = 1; refresh(); document.querySelector(`[data-ad-sort="${k}"]`)?.focus(); return; }
    if (e.target.closest('[data-ad-selall]')) { filtered().forEach(r => S.sel.add(r.id)); refresh(); return; }
    if (e.target.closest('[data-ad-clear]')) { S.sel.clear(); refresh(); return; }
    if (e.target.closest('[data-ad-del]')) {
      const n = S.sel.size; if (!n) return;
      const ids = [...S.sel]; ids.forEach(id => S.deleted.add(id)); S.sel.clear(); refresh();
      if (window.dsToast) dsToast({ tone:'success', title:`${n} polic${n === 1 ? 'y' : 'ies'} deleted`, desc:'Removed from this portfolio.', duration:6000 });
    }
  });
  document.addEventListener('change', e => {
    const r = e.target.closest('[data-ad-row]');
    if (r) { const id = +r.dataset.adRow; r.checked ? S.sel.add(id) : S.sel.delete(id); refresh(); return; }
    const p = e.target.closest('[data-ad-page]');
    if (p) {
      const rows = filtered(), pr = rows.slice((S.page - 1) * S.per, S.page * S.per);
      pr.forEach(x => p.checked ? S.sel.add(x.id) : S.sel.delete(x.id)); refresh();
    }
  });
})();
