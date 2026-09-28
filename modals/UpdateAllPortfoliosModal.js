/* UpdateAllPortfoliosModal — download → upload → validate → review flow.
   Usage: UpdateAllPortfoliosModal.open({ portfolios:[names], onUpdated(diff) }) */
(function () {
  const C = () => window.PortfolioUpdateCore, X = () => window.XlsxLite, Y = () => window.PortfolioUpdateSync;
  const ico = (p, s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    download: ico('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>', 14),
    upload: ico('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>', 14),
    uploadLg: ico('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>', 20),
    sheet: ico('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h2"/><path d="M14 13h2"/><path d="M8 17h2"/><path d="M14 17h2"/>', 20),
    ok: ico('<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>', 20),
    okSm: ico('<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>', 14),
    alert: ico('<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>', 20),
    bulb: ico('<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>', 14),
    wand: ico('<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/>', 14),
    clock: ico('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 20),
    users: ico('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', 14),
    tick: ico('<polyline points="20 6 9 17 4 12"/>', 11).replace('stroke-width="2"', 'stroke-width="3"'),
    x: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const plural = (n, w, s = 's') => `${n} ${w}${n === 1 ? '' : s}`;
  let DATA = null, DATA_BEFORE = null, GROUPS = null, S = {}, OPTS = {}, token = 0;

  const today = () => new Date().toISOString().slice(0, 10);
  const fileName = () => `RealWorld_All_Portfolios_${today()}.xlsx`;
  const dShort = iso => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  function rel(iso) {
    const a = new Date(iso), n = new Date(), days = Math.round((new Date(n.toDateString()) - new Date(a.toDateString())) / 864e5);
    return days <= 0 ? 'earlier today' : days === 1 ? 'yesterday' : days < 14 ? days + ' days ago' : 'on ' + a.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  const ageDays = iso => Math.floor((Date.now() - new Date(iso)) / 864e5);
  const kb = n => n < 1024 * 1024 ? Math.max(1, Math.round(n / 1024)) + ' KB' : (n / 1048576).toFixed(1) + ' MB';

  function ensureRoot() { let r = document.getElementById('modal-root'); if (!r) { r = document.createElement('div'); r.id = 'modal-root'; document.body.appendChild(r); } return r; }
  function close() {
    token++;
    const o = document.querySelector('#modal-root .rw-modal-overlay'); if (!o) return;
    o.classList.add('is-closing'); setTimeout(() => o.remove(), 120);
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e) { if (e.key === 'Escape' && S.step !== 'validating' && S.step !== 'applying') close(); }

  const DEMO_EXTRA = ['Adriatic Bulk', 'Andaman Tankers', 'Arabian Gulf Fleet', 'Baltic Feeder', 'Bering Offshore', 'Biscay Coastal', 'Caribbean Cruise', 'Caspian Energy', 'Celtic Sea Ferries', 'Coral Sea LNG', 'East China Box', 'Gulf of Guinea', 'Hudson Bay Ice', 'Indian Ocean Dry', 'Java Sea Supply', 'Kattegat Ro-Ro', 'Labrador Reefers', 'Ligurian Chemical', 'Malacca Strait', 'Nordic Product', 'North Sea Support', 'Red Sea Transit', 'Sargasso Bulk', 'Sea of Japan Car Carriers', 'South Atlantic Crude', 'Tasman Container', 'Tyrrhenian Ferries', 'West Africa Offshore', 'Yellow Sea Bulk', 'Zanzibar Coastal'];
  function open(opts = {}) {
    OPTS = opts = { ...opts, portfolios: [...(opts.portfolios || [])] };
    DEMO_EXTRA.forEach(n => { if (opts.portfolios.length < 38 && !opts.portfolios.includes(n)) opts.portfolios.push(n); });
    if (!DATA) DATA = Y().loadData(opts.portfolios || []) || C().buildDataset(opts.portfolios || []);
    if (!GROUPS) {
      const names = [...new Set(DATA.map(r => r[C().PF]))], saved = Y().loadGroups();
      GROUPS = saved || C().buildGroups(names);
      const have = new Set(GROUPS.map(g => g.pf)); if (names.some(n => !have.has(n))) { GROUPS = GROUPS.concat(C().buildGroups(names).filter(g => !have.has(g.pf))); Y().saveGroups(GROUPS); }
    }
    S = { limit: 50, choices: {}, merge: null, dl: null, idState: null, fileMeta: null, applied: false, names: opts.portfolios || [], step: 'download', downloaded: false, file: null, res: null, filter: 'All', progress: 0, fixes: [], skipped: [], parsed: null, v: null };
    ensureRoot().innerHTML = `<div class="rw-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="uap-title"><div class="rw-modal uap-modal"></div></div>`;
    const o = document.querySelector('#modal-root .rw-modal-overlay');
    o.addEventListener('click', e => { if (e.target === o && S.step !== 'validating' && S.step !== 'applying') close(); });
    document.addEventListener('keydown', onKey);
    render();
  }

  function stepper() {
    const idx = S.applied && S.step !== 'applying' ? 4 : { download: 0, upload: 1, validating: 1, errors: 2, conflicts: 2, review: 2, applying: 3, success: 4 }[S.step];
    return `<div class="uap-steps">${['Download', 'Upload', 'Review changes', 'Update'].map((l, i) => {
      const cls = S.step === 'errors' && i === 2 ? 'is-error' : i < idx ? 'is-done' : i === idx ? 'is-active' : '';
      const n = cls === 'is-done' ? I.tick : cls === 'is-error' ? '!' : i + 1;
      return (i ? '<span class="uap-step-line"></span>' : '') + `<span class="uap-step ${cls}"><span class="uap-step-n">${n}</span>${l}</span>`;
    }).join('')}</div>`;
  }

  function render() {
    const m = document.querySelector('#modal-root .uap-modal'); if (!m) return;
    const prevScroll = m.querySelector('.uap-diff, .uap-table-wrap');
    m.classList.toggle('is-wide', S.step === 'errors' || S.step === 'review' || S.step === 'conflicts');
    m.innerHTML = `
      <div class="rw-modal-header has-close"><div class="rw-modal-title" id="uap-title">Update All Portfolios</div>
        <button class="uap-x" data-uap-close aria-label="Close"${S.step === 'validating' || S.step === 'applying' ? ' disabled' : ''}>${I.x}</button></div>
      ${stepper()}
      <div class="rw-modal-body scroll-thin">${BODY[S.step]()}</div>
      <div class="rw-modal-footer">${FOOT[S.step]()}</div>`;
    bind(m);
  }

  const BODY = {
    download() {
      const pfs = new Set(DATA.map(r => r[C().PF])).size;
      return `${S.downloaded ? '' : `<p class="uap-lede" style="text-align:center;margin-left:auto;margin-right:auto">Download the latest version of all your portfolios, make your changes in Excel, then upload the file. Take as long as you need — nothing is updated until you upload and confirm.</p>`}
        ${S.downloaded ? `<div class="uap-done-note uap-done-stack">${I.ok.replace(/width="20" height="20"/, 'width="28" height="28"')}<span>Downloaded. You can upload your edited file now, or close this window and come back when you’ve finished editing.</span></div>` : ''}`;
    },
    upload() {
      return `<p class="uap-lede">Upload your edited portfolio file. If anything needs correcting, we’ll show you exactly where. Every row is checked for missing values, invalid IMO numbers, and currency, date and choice-field formats before anything is updated.</p>
        <label class="uap-drop" data-uap-drop>
          <input type="file" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" hidden data-uap-input>
          <span class="uap-drop-ico">${I.uploadLg}</span>
          <span class="uap-drop-t">Drag your .xlsx file here or <u>browse</u></span>
          <span class="uap-drop-s">Excel workbook (.xlsx) · up to 10 MB</span>
        </label>
        <div class="uap-demo"><span>Try with an example file:</span>
          <button class="uap-chip" data-uap-sample="valid">Example — passes checks</button>
          <button class="uap-chip" data-uap-sample="errors">Example — has problems</button></div>
        <div class="uap-rules"><div class="uap-rules-t">Editing your file</div><ul>
          <li>The Excel workbook contains two worksheets:<ul class="uap-rules-sub"><li><b>Policies</b> where you enter individual policies,</li><li><b>Portfolios</b> where you map portfolios to portfolio groups.</li></ul></li>
          <li>Click on any cell in the spreadsheet to display a help popup.</li>
          <li>Every row needs <b>Portfolio</b>, <b>Policy Number</b>, <b>IMO</b> and <b>Our Exposure</b>. Amounts are in US dollars.</li>
          <li>Keep the column names as they are - don’t rename or remove columns. Extra columns will be ignored.</li>
          <li>To remove a policy, delete its row. To add a policy, add a new row.</li>
        </ul></div>`;
    },
    validating() {
      return `<div class="uap-file" style="margin-top:0"><div class="uap-file-ico">${I.sheet}</div><div class="uap-file-main"><div class="uap-file-name">${esc(S.file.name)}</div><div class="uap-file-meta">${kb(S.file.size)}</div></div></div>
        <div class="uap-proc" role="status" aria-live="polite"><span class="uap-spinner" aria-hidden="true"></span><div class="uap-proc-t">Checking your file…</div><div class="uap-proc-s">This may take a moment for large files.</div></div>`;
    },
    errors() {
      const errs = S.res.errors, K = C().KINDS, st = errState();
      const bySheet = list => Object.keys(K).map(k => ({ k, list: list.filter(e => e.kind === k) })).filter(g => g.list.length);
      const pol = errs.filter(e => !e.sheet), prt = errs.filter(e => e.sheet), fileLevel = errs.some(e => e.kind === 'file' || e.kind === 'empty');
      const where = e => typeof e.row === 'number'
        ? `<b>${e.row === 1 ? 'Header row' : 'Row ' + e.row}</b><span class="uap-sub">${esc(e.label)}${e.letter ? ' · column ' + e.letter : ''}</span>`
        : `<b>${esc(e.label)}</b>`;
      const who = e => e.pf || e.policy ? `<span class="uap-who">${esc(e.pf || '—')}</span><span class="uap-sub">${esc(e.policy || 'No policy number')}</span>` : '<span class="uap-dim">—</span>';
      const val = e => e.value === '' || e.value == null ? '<span class="uap-dim">Empty</span>' : `<span class="uap-mono">${esc(e.value)}</span>`;
      const det = e => esc(e.issue);
      const grpHtml = list => bySheet(list).map(g => {
          return `<section class="uap-grp"><div class="uap-grp-h"><span class="uap-grp-t">${esc(C().groupTitle(g.k, g.list.length))}</span></div>
            <div class="uap-grp-fix">${I.bulb}<span><b>How to fix:</b> ${esc(K[g.k].fix)}</span></div>
            <div class="uap-grp-table scroll-thin"><table class="uap-table"><thead><tr><th>Where</th><th>In your file</th><th>What’s wrong</th></tr></thead><tbody>
              ${g.list.slice(0, 100).map(e => `<tr><td class="uap-where">${where(e)}</td><td>${val(e)}</td><td>${det(e)}</td></tr>`).join('')}
            </tbody></table></div>${g.list.length > 100 ? `<div class="uap-quiet">Showing the first 100 of ${g.list.length}. Download your file with problems highlighted to see them all.</div>` : ''}</section>`;
        }).join('');
      const hasPrt = !!(S.pparsed || prt.length), tab = hasPrt && (S.errTab === 'portfolios' || (!S.errTab && !pol.length && prt.length)) ? 'portfolios' : 'policies';
      const tabBtn = (k, label, n) => `<button type="button" role="tab" class="ds-tab" aria-selected="${tab === k}" data-uap-etab="${k}"><span class="ds-tab-label">${label}<span class="uap-etab-n${n ? ' is-bad' : ' is-ok'}">${n}</span></span></button>`;
      const cur = tab === 'portfolios' ? prt : pol;
      const tabsHead = `<div class="uap-etabs-row"><div class="ds-tabs uap-etabs" role="tablist" aria-label="Problems by sheet">${tabBtn('policies', 'Policies sheet', pol.length)}${hasPrt ? tabBtn('portfolios', 'Portfolios sheet', prt.length) : ''}</div></div>`;
      const tabsPanel = `<div class="uap-etab-panel" role="tabpanel">${cur.length ? grpHtml(cur) : `<div class="uap-etab-empty">${I.okSm}<span>No problems on the ${tab === 'portfolios' ? 'Portfolios' : 'Policies'} sheet.</span></div>`}</div>`;
      const lead = `We found ${plural(errs.length, 'problem')} in your file`;
      const next = st.fatal ? 'Correct the file in Excel and upload it again.'
        : 'Correct them in Excel and upload the file again. Your portfolios can only be updated once every problem is fixed.';
      return `<div class="uap-sticky"><div class="uap-banner is-err">${I.alert}<div><div class="uap-banner-t">${lead}</div>
          <div class="uap-banner-s">Nothing has been updated yet. ${next}</div></div></div>
        ${fileLevel ? '' : tabsHead}</div>
        ${fileLevel ? grpHtml(errs) : tabsPanel}`;
    },
    conflicts() {
      const m = S.merge, P = S.dl, n = m.conflicts.length, decided = m.conflicts.filter(c => S.choices[c.id]).length, F = C().fmt;
      const who = c => { const w = Y().whoChanged(c.key, c.type === 'field' ? c.col : '*', P.at); return w ? `${esc(w.by)} · ${dShort(w.at)}` : 'Since your download'; };
      const val = (col, v) => empty(v) ? '<span class="uap-dim">Empty</span>' : esc(F(col, v));
      const opt = (c, side, title, body, sub) => `<button type="button" role="radio" aria-checked="${S.choices[c.id] === side}" class="uap-opt${S.choices[c.id] === side ? ' is-on' : ''}" data-uap-choose="${c.id}:${side}">
          <span class="uap-opt-radio"></span><span class="uap-opt-main"><span class="uap-opt-k">${title}</span><span class="uap-opt-v">${body}</span>${sub ? `<span class="uap-opt-s">${sub}</span>` : ''}</span></button>`;
      const card = c => {
        let q, a, b;
        if (c.type === 'field') {
          q = `<b>${esc(C().label(c.col))}</b> was changed in your file <i>and</i> in Real World.${c.base !== '' ? ` When you downloaded, it was <span class="uap-was-v">${val(c.col, c.base)}</span>.` : ''}`;
          a = opt(c, 'mine', 'Use your file', val(c.col, c.mine), 'Your edit');
          b = opt(c, 'theirs', 'Keep Real World', val(c.col, c.theirs), 'Updated by ' + who(c));
        } else if (c.type === 'removed-edited') {
          q = `You deleted this policy from your file, but it was updated in Real World after you downloaded.`;
          a = opt(c, 'mine', 'Remove the policy', 'Delete it from Real World', 'Your edit');
          b = opt(c, 'theirs', 'Keep the policy', 'Keep Real World’s updated version', 'Updated by ' + who(c));
        } else {
          q = `You edited this policy, but it was removed from Real World after you downloaded.`;
          a = opt(c, 'mine', 'Add it back', 'Restore it with your changes', 'Your edit');
          b = opt(c, 'theirs', 'Leave it removed', 'Don’t restore this policy', 'Removed by ' + who(c));
        }
        return `<div class="uap-cf"><div class="uap-rec-head"><span class="uap-rec-pf">${esc(c.pf)}</span><span class="uap-rec-id">${esc(c.policy)} · IMO ${esc(c.imo)}</span></div>
          <div class="uap-cf-q">${q}</div><div class="uap-cf-opts" role="radiogroup">${a}${b}</div></div>`;
      };
      return `<div class="uap-banner is-warn" style="margin-top:0">${I.users.replace(/width="14" height="14"/, 'width="20" height="20"')}<div><div class="uap-banner-t">${n === 1 ? '1 of your edits clashes' : n + ' of your edits clash'} with updates made in Real World</div>
          <div class="uap-banner-s">You downloaded this file ${rel(P.at)}. Since then, colleagues have updated some of the same policies. Choose which version to keep for each one below — everything else in your file will be applied${m.kept.length ? `, and ${plural(m.kept.length, 'other update')} made in Real World will be kept` : ''}.</div></div></div>
        <div class="uap-cf-bar"><span class="uap-cf-count"><b>${decided}</b> of ${n} decided</span>
          <span class="uap-cf-bulk"><button class="uap-chip" data-uap-all="mine">Use all from my file</button><button class="uap-chip" data-uap-all="theirs">Keep all Real World</button></span></div>
        ${m.conflicts.map(card).join('')}`;
    },
    review() {
      const d = S.res.diff, g = S.res.gdiff, total = allNames().length, none = !d.changed.length && !d.added.length && !d.removed.length && !g.added.length && !g.removed.length;
      const summary = summaryHtml();
      if (none) return `<div class="uap-sticky"><div class="uap-banner is-ok">${I.ok}<div><div class="uap-banner-t">File passed all checks — no differences found</div><div class="uap-banner-s">Your current portfolios (left) match <b>${esc(S.file.name)}</b> (right). If you expected changes, check you uploaded the edited file.</div></div></div></div>${staleNote()}${summary}`;
      const ord = allNames(), order = n => ord.indexOf(n);
      const recs = [...d.changed.map(r => ({ ...r, kind: 'changed' })), ...d.added.map(r => ({ ...r, kind: 'added' })), ...d.removed.map(r => ({ ...r, kind: 'removed' }))]
        .sort((a, b) => order(a.portfolio) - order(b.portfolio) || String(a.policy).localeCompare(String(b.policy)));
      const pfs = [...new Set(recs.map(r => r.portfolio))];
      const shown = S.filter === 'All' ? recs : recs.filter(r => r.portfolio === S.filter);
      const F = C().fmt, cell = (v, cls) => `<div class="${cls}">${v === '' ? '<span class="uap-dim">Empty</span>' : esc(v)}</div>`;
      const keyCols = C().COLS.filter(c => c.m || c.k === 'TotalInsuredValue').map(c => c.k);
      const recHtml = r => {
        let tag, rows;
        if (r.kind === 'changed') { tag = `<span class="uap-tag is-changed">${plural(r.fields.length, 'change')}</span>`; rows = r.fields.map(f => `<div class="uap-rec-row"><div class="uap-f">${esc(C().label(f.col))}</div>${cell(F(f.col, f.from), 'uap-o is-hl')}${cell(F(f.col, f.to), 'uap-n is-hl')}</div>`); }
        else if (r.kind === 'added') { tag = '<span class="uap-tag is-added">New policy</span>'; rows = C().COLS.filter(c => F(c.k, r.row[c.k]) !== '').map(c => `<div class="uap-rec-row"><div class="uap-f">${esc(c.l)}</div><div class="uap-o"><span class="uap-dim">Not in previous version</span></div>${cell(F(c.k, r.row[c.k]), 'uap-n is-hl')}</div>`); }
        else { tag = '<span class="uap-tag is-removed">Policy removed</span>'; rows = keyCols.map(k => `<div class="uap-rec-row"><div class="uap-f">${esc(C().label(k))}</div>${cell(F(k, r.row[k]), 'uap-o')}<div class="uap-n is-gone">Removed</div></div>`); }
        return `<div class="uap-rec"><div class="uap-rec-head"><span class="uap-rec-pf">${esc(r.portfolio)}</span><span class="uap-rec-id">${esc(r.policy)} · IMO ${esc(r.imo)}</span>${tag}</div>${rows.join('')}</div>`;
      };
      const unchanged = total - d.touched.length;
      return `<div class="uap-sticky"><div class="uap-banner is-ok">${I.ok}<div><div class="uap-banner-t">${S.applied ? 'Changes applied' : 'File passed all checks — review the changes'}</div>
          <div class="uap-banner-s">Compare your portfolios in Real World now (left) with how they’ll look after this update (right).${S.applied ? '' : ' Nothing is applied until you confirm.'}</div>
          <div class="uap-stats"><span><b>${new Set([...d.touched, ...S.res.gdiff.added.map(x => x.pf), ...S.res.gdiff.removed.map(x => x.pf)]).size}</b> of ${total} portfolios affected</span>${S.res.gdiff.added.length + S.res.gdiff.removed.length ? `<span><b>${S.res.gdiff.added.length + S.res.gdiff.removed.length}</b> group ${S.res.gdiff.added.length + S.res.gdiff.removed.length === 1 ? 'assignment' : 'assignments'} changed</span>` : ''}<span><b>${d.values}</b> ${d.values === 1 ? 'value' : 'values'} changed</span><span><b>${d.added.length}</b> ${d.added.length === 1 ? 'policy' : 'policies'} added</span><span><b>${d.removed.length}</b> ${d.removed.length === 1 ? 'policy' : 'policies'} removed</span></div></div></div>
        </div>
        ${staleNote()}
        ${summary}
        ${d.changed.length || d.added.length || d.removed.length ? `<div class="uap-toolbar"><div class="uap-toolbar-t">What changed</div>
          <select class="rw-modal-select uap-select" data-uap-pf aria-label="Filter by portfolio"><option value="All">All updated portfolios (${pfs.length})</option>${pfs.map(p => `<option value="${esc(p)}"${S.filter === p ? ' selected' : ''}>${esc(p)}</option>`).join('')}</select></div>
        <div class="uap-diff scroll-thin"><div class="uap-diff-head"><div>Field</div><div>In Real World now</div><div>After update</div></div>${shown.slice(((S.chgP = Math.min(S.chgP || 1, Math.max(1, Math.ceil(shown.length / 10)))) - 1) * 10, S.chgP * 10).map(recHtml).join('')}
        ${pager('chg', shown.length, 10, 'policies')}</div>` : ''}
`;
    },
    applying() {
      return `<div class="uap-proc" role="status" aria-live="polite"><span class="uap-spinner" aria-hidden="true"></span><div class="uap-proc-t">Updating your portfolios…</div><div class="uap-proc-s">This may take a moment. Please don’t close this window.</div></div>`;
    },
    success() {
      const d = S.res.diff, total = allNames().length;
      return `<div class="uap-confirm"><div class="uap-confirm-ico">${I.ok.replace(/width="20" height="20"/, 'width="32" height="32"')}</div>
        <div class="uap-confirm-t">All portfolios have been updated</div>
        <div class="uap-confirm-s">Changes from <b>${esc(S.file.name)}</b> are now live across your portfolios.</div>
        <div class="uap-confirm-grid">
          <div><b>${d.touched.length}<span> / ${total}</span></b>Portfolios updated</div>
          <div><b>${d.values}</b>${d.values === 1 ? 'Value' : 'Values'} changed</div>
          <div><b>${d.added.length}</b>${d.added.length === 1 ? 'Policy' : 'Policies'} added</div>
          <div><b>${d.removed.length}</b>${d.removed.length === 1 ? 'Policy' : 'Policies'} removed</div>
        </div></div>`;
    },
  };

  function errState() {
    const errs = S.res.errors, K = C().KINDS, fatal = errs.some(e => K[e.kind].fatal);
    const badRows = new Set(errs.map(e => e.row)).size;
    return { fatal, badRows, fixable: errs.filter(e => e.fixTo !== undefined).length, canSkip: !fatal && !!S.parsed && S.parsed.rows.length > badRows };
  }
  const empty = v => v === '' || v == null;
  function staleNote() {
    if (S.idState === 'matched') {
      const k = S.merge ? S.merge.kept : [], nc = S.merge ? S.merge.conflicts.length : 0;
      if (!k.length && !nc) return '';
      const F = C().fmt, P = S.dl;
      const who = it => { const w = Y().whoChanged(it.key, it.kind === 'field' ? it.col : '*', P.at); return w ? `${esc(w.by)} · ${dShort(w.at)}` : ''; };
      const what = it => it.kind === 'added' ? 'New policy added' : it.kind === 'removed' ? 'Policy removed' : `${esc(C().label(it.col))}: ${esc(F(it.col, it.from)) || '<span class="uap-dim">Empty</span>'} → <b>${esc(F(it.col, it.value)) || 'Empty'}</b>`;
      return `<details class="uap-note is-info"><summary>${I.users}<span>${k.length ? `${plural(k.length, 'update')} made in Real World since your download ${k.length === 1 ? 'is' : 'are'} kept` : 'Updates made in Real World since your download'}${nc ? ` · ${plural(nc, 'clash', 'es')} resolved` : ''}</span></summary>
        ${k.length ? `<div class="uap-note-s">These weren’t in the file you downloaded ${rel(P.at)}, so your upload won’t undo them.</div>
        <div class="uap-grp-table scroll-thin"><table class="uap-table"><thead><tr><th>Portfolio / policy</th><th>Update</th><th>By</th></tr></thead><tbody>
        ${k.map(it => `<tr><td class="uap-where"><span class="uap-who">${esc(it.pf)}</span><span class="uap-sub">${esc(it.policy)}</span></td><td>${what(it)}</td><td class="uap-sub-cell">${who(it)}</td></tr>`).join('')}
        </tbody></table></div>` : ''}</details>`;
    }
    if (S.idState === 'unknown' || S.idState === 'foreign') return `<div class="uap-banner is-warn">${I.alert}<div><div class="uap-banner-t">We couldn’t tell when this file was downloaded</div>
      <div class="uap-banner-s">${S.idState === 'unknown' ? 'The File details sheet is missing, so' : 'This file was downloaded on another device or browser, so'} we’ve compared it with your portfolios as they are now. Anything different in your file will replace what’s in Real World, and policies missing from your file will be removed. Check the changes carefully.</div></div></div>`;
    return '';
  }

  function pager(key, total, per, noun) {
    if (!total) return '';
    const pages = Math.max(1, Math.ceil(total / per)), pg = Math.min(S[key + 'P'] || 1, pages);
    return `<div class="uap-pgr" data-uap-pgr="${key}">${window.dsPagination({ page: pg, totalPages: pages, totalItems: total, perPage: per, label: noun, inWrap: true }).replace(/<label class="ds-page-perpage">[\s\S]*?<\/label>/, '')}</div>`;
  }
  function summaryHtml() {
    const PF = C().PF, cur = DATA_BEFORE || DATA, nxt = S.res.rows, touched = new Set(S.res.diff.touched);
    const agg = rows => { const m = {}; rows.forEach(r => { const a = m[r[PF]] || (m[r[PF]] = { n: 0, exp: 0 }); a.n++; a.exp += +r.OurExposure || 0; }); return m; };
    const gm = list => { const m = {}; list.forEach(g => (m[g.pf] = m[g.pf] || []).push(g.group)); Object.values(m).forEach(v => v.sort((x, y) => x.localeCompare(y))); return m; };
    const ga = gm(GROUPS), gb = gm(S.res.groups), gkey = p => (ga[p] || []).join('\u0000') !== (gb[p] || []).join('\u0000');
    Object.keys({ ...ga, ...gb }).forEach(p => { if (gkey(p)) touched.add(p); });
    const chips = (list, other, side) => list && list.length ? list.map(g => `<span class="uap-gchip${other.includes(g) ? '' : side === 'o' ? ' is-out' : ' is-in'}">${esc(g)}</span>`).join('') : '<span class="uap-dim">No group</span>';
    const a = agg(cur), b = agg(nxt), money = v => '$' + (v >= 1e9 ? (v / 1e9).toFixed(2) + 'B' : (v / 1e6).toFixed(1) + 'M');
    const row = p => { const o = a[p] || { n: 0, exp: 0 }, n = b[p] || { n: 0, exp: 0 }, ch = touched.has(p), gc = gkey(p), go = ga[p] || [], gn = gb[p] || [];
      const cn = o.n !== n.n ? ' is-hl' : '', ce = Math.round(o.exp) !== Math.round(n.exp) ? ' is-hl' : '';
      return `<div class="uap-sum-row"><div class="uap-f"><span class="uap-rec-pf">${esc(p)}</span>${!a[p] && !ga[p] ? '<span class="uap-tag is-added">New portfolio</span>' : !b[p] && !gb[p] ? '<span class="uap-tag is-removed">Removed</span>' : ch ? '<span class="uap-tag is-changed">Changed</span>' : '<span class="uap-tag is-same">No change</span>'}${gc && (a[p] || ga[p]) && (b[p] || gb[p]) ? '<span class="uap-tag is-grp">Groups changed</span>' : ''}</div>
        <div class="uap-o"><div><span class="uap-o${cn ? ' is-hl' : ''}">${plural(o.n, 'policy').replace('policys', 'policies')}</span> · <span class="uap-o${ce ? ' is-hl' : ''}">${money(o.exp)}</span></div><div class="uap-gline">${chips(go, gn, 'o')}</div></div>
        <div class="uap-n"><div><span class="uap-n${cn}">${plural(n.n, 'policy').replace('policys', 'policies')}</span> · <span class="uap-n${ce}">${money(n.exp)}</span></div><div class="uap-gline">${chips(gn, go, 'n')}</div></div></div>`; };
    const all = [...new Set([...allNames(), ...Object.keys(ga), ...Object.keys(gb)])].filter(p => a[p] || b[p] || ga[p] || gb[p]);
    const status = p => !a[p] && !ga[p] ? 'new' : !b[p] && !gb[p] ? 'removed' : touched.has(p) ? 'changed' : 'same';
    const cnt = { all: all.length, changed: 0, new: 0, removed: 0, same: 0 }; all.forEach(p => cnt[status(p)]++);
    const kinds = ['changed', 'new', 'removed'].filter(k => cnt[k]), f = kinds.length === 1 ? kinds[0] : (kinds.includes(S.sumF) ? S.sumF : 'affected');
    const q = (S.sumQ || '').trim().toLowerCase();
    const list = all.filter(p => (f === 'all' || (f === 'affected' ? status(p) !== 'same' : status(p) === f)) && (!q || p.toLowerCase().includes(q)))
      .sort((x, y) => ({ new: 0, removed: 1, changed: 2, same: 3 }[status(x)] - { new: 0, removed: 1, changed: 2, same: 3 }[status(y)]) || x.localeCompare(y));
    const PER = 5, pages = Math.max(1, Math.ceil(list.length / PER)), pg = Math.min(S.sumP || 1, pages), from = (pg - 1) * PER;
    const chip = (k, l, n) => `<button class="uap-chip${f === k ? ' is-on' : ''}" data-uap-sumf="${k}">${l}<span class="uap-chip-n">${n}</span></button>`;
    const affected = cnt.changed + cnt.new + cnt.removed;
    return `<div class="uap-toolbar"><div class="uap-toolbar-t">Portfolio summary</div>
        <input class="rw-modal-input uap-sum-q" type="search" placeholder="Search portfolios" value="${esc(S.sumQ || '')}" data-uap-sumq aria-label="Search portfolios"></div>
      <div class="uap-filters">${[cnt.changed, cnt.new, cnt.removed].filter(Boolean).length > 1 ? chip('affected', 'All changes', affected) : ''}${cnt.changed ? chip('changed', 'Changed', cnt.changed) : ''}${cnt.new ? chip('new', 'New', cnt.new) : ''}${cnt.removed ? chip('removed', 'Removed', cnt.removed) : ''}</div>
      <div class="uap-diff uap-sum scroll-thin"><div class="uap-diff-head"><div>Portfolio</div><div>In Real World now <span class="uap-head-sub">policies · exposure · groups</span></div><div>After update <span class="uap-head-sub">policies · exposure · groups</span></div></div>
        ${list.length ? list.slice(from, from + PER).map(row).join('') : `<div class="uap-sum-empty">${q ? `No portfolios match “${esc(S.sumQ)}”.` : 'No portfolios in this view.'}</div>`}
        ${pager('sum', list.length, PER, 'portfolios')}</div>`;
  }

  const FOOT = {
    download: () => {
      return `<div class="uap-foot-left"><button class="rw-modal-btn rw-modal-btn-cancel" data-uap-close>Cancel</button></div>
      ${S.downloaded
        ? `<button class="rw-modal-btn rw-modal-btn-secondary" data-uap-download><span class="uap-bi">${I.download}Download again</span></button>
           <button class="rw-modal-btn rw-modal-btn-primary" data-uap-goto="upload"><span class="uap-bi">${I.upload}Upload edited file</span></button>`
        : `<button class="rw-modal-btn rw-modal-btn-secondary" data-uap-goto="upload"><span class="uap-bi">${I.upload}I already have an edited file</span></button>
           <button class="rw-modal-btn rw-modal-btn-primary" data-uap-download><span class="uap-bi">${I.download}Download All Portfolios (Excel)</span></button>`}`;
    },
    upload: () => `<div class="uap-foot-left"><button class="uap-link" data-uap-goto="download">Back to download</button></div>
      <button class="rw-modal-btn rw-modal-btn-cancel" data-uap-close>Cancel</button>`,
    validating: () => `<button class="rw-modal-btn rw-modal-btn-cancel" disabled>Checking file…</button>`,
    errors: () => {
      const st = errState();
      return `<div class="uap-foot-left">${S.parsed ? `<button class="uap-link" data-uap-annot>${I.download}Download my file with problems highlighted</button>` : ''}</div>
      <button class="rw-modal-btn rw-modal-btn-cancel" data-uap-close>Cancel</button>
      <button class="rw-modal-btn rw-modal-btn-primary" data-uap-goto="upload"><span class="uap-bi">${I.upload}Upload corrected file</span></button>`;
    },
    conflicts: () => {
      const left = S.merge.conflicts.filter(c => !S.choices[c.id]).length;
      return `<div class="uap-foot-left"><button class="uap-link" data-uap-goto="upload">${I.upload}Upload a different file</button></div>
        <button class="rw-modal-btn rw-modal-btn-cancel" data-uap-close>Cancel</button>
        <button class="rw-modal-btn rw-modal-btn-primary" data-uap-resolve${left ? ' disabled' : ''}>${left ? `${left} left to decide` : 'Continue to review'}</button>`;
    },
    review: () => {
      if (S.applied) return `<button class="rw-modal-btn rw-modal-btn-primary" data-uap-close>Done</button>`;
      const d = S.res.diff, none = !d.changed.length && !d.added.length && !d.removed.length;
      return `<div class="uap-foot-left">${S.merge && S.merge.conflicts.length ? `<button class="uap-link" data-uap-goto="conflicts">Back to clashes</button>` : `<button class="uap-link" data-uap-goto="upload">${I.upload}Upload a different file</button>`}</div>
        <button class="rw-modal-btn rw-modal-btn-cancel" data-uap-close>Cancel</button>
        <button class="rw-modal-btn rw-modal-btn-primary" data-uap-confirm>Confirm &amp; update portfolios</button>`;
    },
    applying: () => `<button class="rw-modal-btn rw-modal-btn-primary" disabled>Updating…</button>`,
    success: () => `<button class="rw-modal-btn rw-modal-btn-primary" data-uap-close>Done</button>`,
  };

  function saveBlob(blob, name) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  function workbook(rows, rec, groups) {
    return X().write([C().templateSheet(rows), C().portfoliosSheet(groups || GROUPS), ...(rec ? [{ ...Y().detailsSheet(rec), hidden: true }] : [])]);
  }

  async function handle(blob, name) {
    const my = ++token;
    Object.assign(S, { errTab: null, file: { name, size: blob.size }, step: 'validating', progress: 0, rowCount: 0, fixes: [], skipped: [], parsed: null, v: null, merge: null, choices: {}, dl: null, idState: null, fileMeta: null });
    render();
    let fileErr = null;
    if (!/\.xlsx$/i.test(name)) fileErr = 'This isn’t an Excel workbook. Upload the .xlsx file you downloaded from Real World.';
    else if (blob.size > 10 * 1048576) fileErr = 'The file is larger than 10 MB.';
    else {
      try {
        const sheets = await X().read(blob), p = C().parseSheet(sheets), id = Y().readFileId(sheets);
        S.pparsed = C().parsePortfolios(sheets);
        S.dl = Y().findDownload(id); S.idState = S.dl ? 'matched' : id ? 'foreign' : 'unknown'; S.fileMeta = S.dl ? { id: S.dl.id, at: S.dl.at } : null;
        if (!p) fileErr = 'We couldn’t find the portfolio sheet. Make sure the column names from the downloaded file are still in the first row.';
        else { S.parsed = p; S.rowCount = p.rows.length; }
      } catch (e) { fileErr = 'This file couldn’t be opened. Upload the .xlsx file you downloaded from Real World.'; }
    }
    await wait(3000); if (my !== token) return;
    if (fileErr) { S.res = { errors: [C().fileError(fileErr, name)] }; S.step = 'errors'; }
    else evaluate();
    render();
  }
  const allNames = () => { const set = new Set(S.names); DATA.forEach(r => set.add(r[C().PF])); ((S.res && S.res.rows) || []).forEach(r => set.add(r[C().PF])); return [...set]; };
  function evaluate() {
    const v1 = C().validate(S.parsed, [...new Set([...S.names, ...DATA.map(r => r[C().PF])])]), v2 = C().validatePortfolios(S.pparsed, [...new Set([...S.names, ...DATA.map(r => r[C().PF]), ...v1.rows.map(r => r[C().PF])])]);
    S.v = { errors: v1.errors.concat(v2.errors), rows: v1.rows }; S.newGroups = v2.rows;
    if (S.v.errors.length) { S.res = { errors: S.v.errors }; S.step = 'errors'; return; }
    S.skipped = [];
    toReview(S.v.rows);
  }
  function toReview(rows) {
    S.fileRows = rows; S.merge = null; S.choices = {};
    if (S.dl) { S.merge = Y().merge(S.dl.base, DATA, rows); if (S.merge.conflicts.length) { S.step = 'conflicts'; return; } }
    finalize();
  }
  function finalize() {
    const rows = S.merge ? Y().resolve(S.merge, S.choices) : S.fileRows;
    S.res = { rows, diff: C().diff(DATA, rows), groups: S.newGroups || GROUPS, gdiff: C().groupDiff(GROUPS, S.newGroups || GROUPS) }; S.step = 'review'; S.filter = 'All'; S.chgP = 1; S.sumF = 'affected'; S.sumP = 1; S.sumQ = ''; S.applied = false; DATA_BEFORE = null;
  }

  function bind(m) {
    m.querySelectorAll('[data-uap-close]').forEach(b => b.addEventListener('click', close));
    m.querySelectorAll('[data-uap-goto]').forEach(b => b.addEventListener('click', () => { S.step = b.dataset.uapGoto; render(); }));
    const dl = m.querySelector('[data-uap-download]');
    if (dl) dl.addEventListener('click', () => { const rec = Y().recordDownload(DATA); saveBlob(workbook(DATA, rec), rec.name); S.downloaded = true; render(); });
    m.querySelectorAll('[data-uap-choose]').forEach(b => b.addEventListener('click', () => { const [id, side] = b.dataset.uapChoose.split(':'); S.choices[id] = side; render(); }));
    m.querySelectorAll('[data-uap-all]').forEach(b => b.addEventListener('click', () => { S.merge.conflicts.forEach(c => { S.choices[c.id] = b.dataset.uapAll; }); render(); }));
    const rs = m.querySelector('[data-uap-resolve]');
    if (rs) rs.addEventListener('click', () => { finalize(); render(); });
    const drop = m.querySelector('[data-uap-drop]'), input = m.querySelector('[data-uap-input]');
    if (drop) {
      input.addEventListener('change', () => { const f = input.files[0]; if (f) handle(f, f.name); });
      ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('is-over'); }));
      ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('is-over'); }));
      drop.addEventListener('drop', e => { const f = e.dataTransfer.files[0]; if (f) handle(f, f.name); });
    }
    m.querySelectorAll('[data-uap-sample]').forEach(b => b.addEventListener('click', () => {
      const kind = b.dataset.uapSample;
      const rec = Y().recordDownload(DATA, { demo: true });
      handle(workbook(kind === 'valid' ? C().sampleValid(DATA) : C().sampleErrors(DATA), rec, kind === 'valid' ? C().sampleGroups(GROUPS) : C().sampleGroupErrors(GROUPS)), fileName().replace('.xlsx', kind === 'valid' ? '_edited.xlsx' : '_edited_draft.xlsx'));
    }));
    m.querySelectorAll('[data-uap-etab]').forEach(b => b.addEventListener('click', () => { S.errTab = b.dataset.uapEtab; render(); const bd = document.querySelector('#modal-root .rw-modal-body'); if (bd) bd.scrollTop = 0; }));
    const cf = m.querySelector('[data-uap-confirm]');
    if (cf) cf.addEventListener('click', () => { DATA_BEFORE = DATA; DATA = S.res.rows; Y().saveData(DATA); GROUPS = S.res.groups; Y().saveGroups(GROUPS); Y().logDiff('You', S.res.diff); if (S.dl) Y().setStatus(S.dl.id, 'used'); S.applied = true; S.step = 'applying'; const my = ++token; setTimeout(() => { if (my !== token) return; S.step = 'success'; render(); }, 2500); if (OPTS.onUpdated) OPTS.onUpdated(S.res.diff); render(); });
    const pf = m.querySelector('[data-uap-pf]');
    if (pf) pf.addEventListener('change', () => { S.filter = pf.value; S.chgP = 1; render(); });
    m.querySelectorAll('[data-uap-sumf]').forEach(b => b.addEventListener('click', () => { S.sumF = b.dataset.uapSumf; S.sumP = 1; render(); }));
    m.querySelectorAll('[data-uap-pgr]').forEach(w => { const k = w.dataset.uapPgr; window.dsWirePagination(w, { onPage: p => { S[k + 'P'] = +p; render(); if (k === 'chg') { const d = document.querySelector('#modal-root .uap-diff:not(.uap-sum)'); const body = document.querySelector('#modal-root .rw-modal-body'); if (d && body) { const st = document.querySelector('#modal-root .uap-sticky'); body.scrollTop = d.offsetTop - body.offsetTop - (st ? st.offsetHeight : 0) - 56; } }  } }); });
    const sq = m.querySelector('[data-uap-sumq]');
    if (sq) sq.addEventListener('input', () => { S.sumQ = sq.value; S.sumP = 1; const pos = sq.selectionStart; render(); const n = document.querySelector('#modal-root [data-uap-sumq]'); if (n) { n.focus(); n.setSelectionRange(pos, pos); } });
    const an = m.querySelector('[data-uap-annot]');
    if (an) an.addEventListener('click', () => saveBlob(X().write([C().annotatedSheet(S.parsed, S.res.errors.filter(e => !e.sheet), S.fixes), ...(S.pparsed ? [C().annotatedPortfolios(S.pparsed, S.res.errors.filter(e => e.sheet))] : [C().portfoliosSheet(GROUPS)]), ...(S.fileMeta ? [{ ...Y().detailsSheet(S.fileMeta), hidden: true }] : [])]), S.file.name.replace(/\.xlsx$/i, '') + '_problems.xlsx'));
  }

  window.UpdateAllPortfoliosModal = { open, close };
})();
