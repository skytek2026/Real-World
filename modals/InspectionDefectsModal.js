/* InspectionDefectsModal — PSC inspection summary + defects list.
   Usage: InspectionDefectsModal.open({ vessel, vesselHref, date, followup, authorisation, port, country, detained, defects:[{code,text,cls}] }) */
(function () {
  let S = null, lastFocus = null;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
  const COLS = [['code','Defective item code'],['text','Defect text'],['cls','Class responsible']];

  function ensureStyles() {
    if (document.getElementById('idm-styles')) return;
    const st = document.createElement('style');
    st.id = 'idm-styles';
    st.textContent = `
.idm .rw-modal-header{align-items:center}
.idm-x{width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;background:transparent;border:0;border-radius:8px;color:#6b7280;cursor:pointer;flex-shrink:0;transition:background 120ms,color 120ms}
.idm-x:hover{background:#f3f4f6;color:#111827}
.idm-x:focus-visible{outline:none;box-shadow:0 0 0 2px #FFFFFF, 0 0 0 4px #1485C5}
.idm .rw-modal-body{padding:0;display:flex;flex-direction:column;min-height:0}
.idm-sec{padding:16px 20px}
.idm-sec + .idm-sec{border-top:1px solid #e5e7eb}
.idm-h{font-size:12px;font-weight:700;color:#4b5563;text-transform:uppercase;letter-spacing:.05em;margin:0 0 8px}
.idm-dl{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px 20px;margin:0;font-size:14px}
.idm-dl > div{min-width:0}
.idm-dl dt{color:#6b7280;font-size:12px;margin-bottom:2px}
.idm-dl dd{margin:0;color:#111827;font-weight:500;overflow-wrap:anywhere}
.idm-dl a{color:var(--brand-700,#0f6aa0);text-decoration:underline;text-underline-offset:2px}
.idm-dl a:hover{color:var(--brand-800,#0d5580)}
.idm-tw{border:1px solid #e5e7eb;border-radius:8px;overflow:auto}
.idm-t{width:100%;border-collapse:collapse;font-size:14px;min-width:520px}
.idm-t th{position:sticky;top:0;background:#f9fafb;text-align:left;font-weight:600;color:#4b5563;font-size:12px;text-transform:uppercase;letter-spacing:.04em;padding:0;border-bottom:1px solid #e5e7eb;white-space:nowrap}
.idm-t th button{all:unset;display:flex;align-items:center;gap:4px;width:100%;box-sizing:border-box;padding:8px 12px;cursor:pointer}
.idm-t th button:hover{color:#111827}
.idm-t th button:focus-visible{outline:2px solid var(--brand-400,#60a5fa);outline-offset:-2px}
.idm-t th .ar{color:#d1d5db;display:inline-flex}
.idm-t th[aria-sort="ascending"] .ar,.idm-t th[aria-sort="descending"] .ar{color:var(--brand-700,#0f6aa0)}
.idm-t td{padding:8px 12px;border-bottom:1px solid #f3f4f6;color:#111827;vertical-align:top;text-wrap:pretty}
.idm-t tr:last-child td{border-bottom:0}
.idm-t tbody tr:nth-child(even){background:#f9fafb}
.idm-t td.code{font-variant-numeric:tabular-nums;font-weight:600;white-space:nowrap}
.idm-t td.cls{color:#4b5563;white-space:nowrap}
.idm-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:12px;font-size:14px;color:#4b5563}
.idm-size{display:inline-flex;align-items:center;gap:8px}
.idm-size select{height:30px;padding:0 28px 0 12px;border:1px solid #e5e7eb;border-radius:8px;font:inherit;font-size:14px;color:#111827;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 8px center;appearance:none;cursor:pointer}
.idm-pager{display:flex;align-items:center;gap:4px}
.idm-pager button{min-width:30px;height:30px;padding:0 8px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;font:inherit;font-size:14px;color:#1f2937;cursor:pointer;display:inline-flex;align-items:center;justify-content:center}
.idm-pager button:hover:not(:disabled){background:#f9fafb;border-color:#d1d5db}
.idm-pager button.is-cur{background:var(--brand-600,#1485c5);border-color:var(--brand-600,#1485c5);color:#fff;font-weight:600}
.idm-pager button:disabled{color:#d1d5db;cursor:not-allowed}
.idm-pager button:focus-visible,.idm-size select:focus-visible{outline:none;box-shadow:0 0 0 2px #FFFFFF, 0 0 0 4px #1485C5}
.idm-empty{padding:24px;text-align:center;color:#6b7280;font-size:14px}
@media (max-width:640px){
.rw-modal-overlay:has(.idm){padding:0;align-items:stretch}
.idm.rw-modal{max-width:none;max-height:none;height:100vh;height:100dvh;border-radius:0}
.idm-sec{padding:16px 16px}
.idm-dl{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 16px}
.idm-t{min-width:0}
.idm-t thead{display:none}
.idm-t,.idm-t tbody,.idm-t tr,.idm-t td{display:block;width:100%;box-sizing:border-box}
.idm-t tr{padding:12px 12px;border-bottom:1px solid #e5e7eb}
.idm-t td{padding:2px 0;border:0;display:grid;grid-template-columns:96px minmax(0,1fr);gap:8px;white-space:normal}
.idm-t td::before{content:attr(data-label);font-size:12px;font-weight:600;color:#6b7280}
.idm-foot{justify-content:center}
}`;
    document.head.appendChild(st);
  }
  function ensureRoot() {
    let root = document.getElementById('modal-root');
    if (!root) { root = document.createElement('div'); root.id = 'modal-root'; document.body.appendChild(root); }
    return root;
  }
  function rows() {
    const list = [...S.defects];
    if (S.sort) {
      const { k, dir } = S.sort;
      list.sort((a, b) => { const x = a[k], y = b[k]; const r = (typeof x === 'number' && typeof y === 'number') ? x - y : String(x).localeCompare(String(y), undefined, { numeric:true }); return dir * r; });
    }
    return list;
  }
  function body() {
    const d = S, all = rows(), total = all.length, pages = Math.max(1, Math.ceil(total / d.size));
    d.page = Math.min(d.page, pages);
    const from = total ? (d.page - 1) * d.size : 0, slice = all.slice(from, from + d.size);
    const arrow = k => { const on = d.sort && d.sort.k === k; const up = on && d.sort.dir === 1; return `<span class="ar"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${on ? (up ? '<path d="m18 15-6-6-6 6"/>' : '<path d="m6 9 6 6 6-6"/>') : '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>'}</svg></span>`; };
    const ariaSort = k => d.sort && d.sort.k === k ? (d.sort.dir === 1 ? 'ascending' : 'descending') : 'none';
    const pageBtns = Array.from({ length: pages }, (_, i) => `<button type="button" data-idm-page="${i + 1}" class="${i + 1 === d.page ? 'is-cur' : ''}" ${i + 1 === d.page ? 'aria-current="page"' : ''} aria-label="Page ${i + 1}">${i + 1}</button>`).join('');
    const chev = p => `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="${p}"/></svg>`;
    return `
      <section class="idm-sec" aria-labelledby="idm-h1">
        <h3 class="idm-h" id="idm-h1">Inspection details</h3>
        <dl class="idm-dl">
          <div><dt>Vessel</dt><dd><a href="${esc(d.vesselHref || '#')}">${esc(d.vessel)}</a></dd></div>
          <div><dt>Inspection date</dt><dd>${esc(d.date)}</dd></div>
          <div><dt>Port</dt><dd>${esc(d.port)}</dd></div>
          <div><dt>Country</dt><dd>${esc(d.country)}</dd></div>
          <div><dt>Defects found</dt><dd>${total}</dd></div>
          <div><dt>Days detained</dt><dd>${esc(d.detained)}</dd></div>
          <div><dt>Inspection authorisation</dt><dd>${esc(d.authorisation || '—')}</dd></div>
          <div><dt>Follow-up inspection</dt><dd>${d.followup ? 'Yes' : 'No'}</dd></div>
        </dl>
      </section>
      <section class="idm-sec" aria-labelledby="idm-h2">
        <h3 class="idm-h" id="idm-h2">Defects list</h3>
        <div class="idm-tw scroll-thin">
          <table class="idm-t">
            <thead><tr>${COLS.map(([k, l]) => `<th aria-sort="${ariaSort(k)}"><button type="button" data-idm-sort="${k}">${l}${arrow(k)}</button></th>`).join('')}</tr></thead>
            <tbody>${slice.length ? slice.map(r => `<tr><td class="code" data-label="Code">${esc(r.code)}</td><td data-label="Defect">${esc(r.text)}</td><td class="cls" data-label="Class resp.">${esc(r.cls || 'None')}</td></tr>`).join('') : `<tr><td colspan="3" class="idm-empty">No defects recorded.</td></tr>`}</tbody>
          </table>
        </div>
        <div class="idm-foot">
          <label class="idm-size">Show <select data-idm-size aria-label="Rows per page">${[10, 25, 50].map(n => `<option value="${n}" ${n === d.size ? 'selected' : ''}>${n}</option>`).join('')}</select> entries</label>
          <span aria-live="polite">Showing ${total ? from + 1 : 0} to ${from + slice.length} of ${total} entries</span>
          <nav class="idm-pager" aria-label="Defects pages">
            <button type="button" data-idm-page="${d.page - 1}" ${d.page <= 1 ? 'disabled' : ''} aria-label="Previous page">${chev('m15 18-6-6 6-6')}</button>
            ${pageBtns}
            <button type="button" data-idm-page="${d.page + 1}" ${d.page >= pages ? 'disabled' : ''} aria-label="Next page">${chev('m9 18 6-6-6-6')}</button>
          </nav>
        </div>
      </section>`;
  }
  function draw() {
    const b = document.querySelector('#modal-root .idm .rw-modal-body');
    if (!b) return;
    const focusKey = document.activeElement && (document.activeElement.dataset.idmSort || document.activeElement.dataset.idmPage || (document.activeElement.hasAttribute('data-idm-size') ? 'size' : null));
    b.innerHTML = body();
    b.querySelectorAll('[data-idm-sort]').forEach(btn => btn.onclick = () => {
      const k = btn.dataset.idmSort;
      S.sort = S.sort && S.sort.k === k ? (S.sort.dir === 1 ? { k, dir:-1 } : null) : { k, dir:1 };
      S.page = 1; draw(); b.querySelector(`[data-idm-sort="${k}"]`)?.focus();
    });
    b.querySelectorAll('[data-idm-page]').forEach(btn => btn.onclick = () => { S.page = +btn.dataset.idmPage; draw(); });
    const sz = b.querySelector('[data-idm-size]');
    sz.onchange = () => { S.size = +sz.value; S.page = 1; draw(); b.querySelector('[data-idm-size]')?.focus(); };
    if (focusKey === 'size') b.querySelector('[data-idm-size]')?.focus();
  }
  function onKey(e) {
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    const m = document.querySelector('#modal-root .idm'); if (!m) return;
    const f = [...m.querySelectorAll('a[href],button:not([disabled]),select')];
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  }
  function close() {
    const ov = document.querySelector('#modal-root .rw-modal-overlay');
    document.removeEventListener('keydown', onKey);
    if (!ov) return;
    ov.classList.add('is-closing');
    setTimeout(() => { ov.remove(); lastFocus && lastFocus.focus && lastFocus.focus(); }, 120);
    S = null;
  }
  function open(data) {
    ensureStyles();
    lastFocus = document.activeElement;
    S = { defects:[], ...data, sort:null, page:1, size:10 };
    ensureRoot().innerHTML = `
      <div class="rw-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="idm-title">
        <div class="rw-modal idm" style="max-width:760px;">
          <div class="rw-modal-header has-close">
            <div class="rw-modal-title" id="idm-title">Inspection defects</div>
            <button class="idm-x" data-modal-close aria-label="Close"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>
          <div class="rw-modal-body scroll-thin"></div>
        </div>
      </div>`;
    const ov = document.querySelector('#modal-root .rw-modal-overlay');
    ov.addEventListener('click', e => { if (e.target === ov) close(); });
    ov.querySelector('[data-modal-close]').onclick = close;
    document.addEventListener('keydown', onKey);
    draw();
    ov.querySelector('[data-modal-close]').focus();
  }
  window.InspectionDefectsModal = { open, close };
})();
