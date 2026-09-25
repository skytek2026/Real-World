/* PortfolioUpdateSync — remembers downloads, logs changes made in Real World, and three-way merges a file edited over several days. */
(function () {
  const C = () => window.PortfolioUpdateCore;
  const LS = { data: 'rw-uap-portfolios-v1', dl: 'rw-uap-downloads-v1', log: 'rw-uap-changelog-v1' };
  const get = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } };
  const set = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const key = r => r[C().PF] + '|' + r.PolicyNumber;
  const empty = v => v === '' || v == null;
  const eq = (a, b) => (empty(a) && empty(b)) || (!empty(a) && !empty(b) && ((typeof a === 'number' || typeof b === 'number') ? Math.abs(+a - +b) < 1e-6 : String(a) === String(b)));
  const cols = () => C().COLS.map(c => c.k);
  const rowEq = (a, b) => cols().every(k => eq(a[k], b[k]));

  function loadData(names) { const d = get(LS.data, null); if (Array.isArray(d)) d.forEach(r => { if (r.IMO === '9412379') r.IMO = '9412373'; }); return Array.isArray(d) && d.length && d.every(r => r[C().PF] != null) ? d : null; }
  const saveData = d => set(LS.data, d);

  const downloads = () => get(LS.dl, []);
  function recordDownload(rows, opts = {}) {
    const at = opts.at || new Date().toISOString();
    const rec = { id: 'RW-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase(), at, name: `RealWorld_All_Portfolios_${at.slice(0, 10)}.xlsx`, base: rows.map(r => ({ ...r })), status: 'pending', demo: !!opts.demo };
    set(LS.dl, [rec, ...downloads().filter(d => !d.demo)].slice(0, 5).concat(rec.demo ? [] : downloads().filter(d => d.demo).slice(0, 2)));
    return rec;
  }
  const findDownload = id => id ? downloads().find(d => d.id === id) || null : null;
  const pending = () => downloads().filter(d => d.status === 'pending' && !d.demo).sort((a, b) => b.at.localeCompare(a.at))[0] || null;
  const setStatus = (id, status) => set(LS.dl, downloads().map(d => d.id === id ? { ...d, status } : d));

  const log = () => get(LS.log, []);
  function addLog(by, items, at) { if (!items.length) return; set(LS.log, [...log(), { at: at || new Date().toISOString(), by, items }].slice(-40)); }
  function whoChanged(k, col, since) {
    const l = log().filter(e => e.at > since);
    for (let i = l.length - 1; i >= 0; i--) if (l[i].items.some(it => it.key === k && (it.col === col || it.col === '*' || col === '*'))) return { by: l[i].by, at: l[i].at };
    return null;
  }
  function changesSince(since) {
    const l = log().filter(e => e.at > since), pol = new Set(), by = new Set();
    l.forEach(e => { by.add(e.by); e.items.forEach(it => pol.add(it.key)); });
    return { policies: pol.size, by: [...by] };
  }
  function logDiff(by, d) {
    const k = r => r.portfolio + '|' + r.policy;
    addLog(by, [...d.changed.flatMap(r => r.fields.map(f => ({ key: k(r), col: f.col }))), ...d.added.map(r => ({ key: k(r), col: '*' })), ...d.removed.map(r => ({ key: k(r), col: '*' }))]);
  }

  /* base = rows at download, cur = Real World now, file = user's edited rows */
  function merge(base, cur, file) {
    const bm = new Map(base.map(r => [key(r), r])), cm = new Map(cur.map(r => [key(r), r])), fm = new Map(file.map(r => [key(r), r]));
    const keys = [], seen = new Set();
    [...cur, ...file, ...base].forEach(r => { const k = key(r); if (!seen.has(k)) { seen.add(k); keys.push(k); } });
    const items = [], conflicts = [], kept = [], fields = cols().filter(k => k !== C().PF && k !== 'PolicyNumber');
    keys.forEach(k => {
      const b = bm.get(k), c = cm.get(k), f = fm.get(k), ref = f || c || b, info = { key: k, pf: ref[C().PF], policy: ref.PolicyNumber, imo: ref.IMO }, i = items.length;
      if (!b) {
        if (f && !c) return items.push({ row: { ...f } });
        if (c && !f) { items.push({ row: { ...c } }); return kept.push({ ...info, kind: 'added' }); }
        const row = { ...c }; items.push({ row });
        return fields.forEach(col => { if (!eq(f[col], c[col])) conflicts.push({ ...info, i, type: 'field', col, base: '', mine: f[col], theirs: c[col] }); });
      }
      if (!c && !f) return items.push({ row: null });
      if (!c) { items.push({ row: null }); return rowEq(b, f) ? kept.push({ ...info, kind: 'removed' }) : conflicts.push({ ...info, i, type: 'edited-removed', mineRow: f }); }
      if (!f) { if (rowEq(b, c)) return items.push({ row: null }); items.push({ row: { ...c } }); return conflicts.push({ ...info, i, type: 'removed-edited' }); }
      const row = { ...c }; items.push({ row });
      fields.forEach(col => {
        const um = !eq(b[col], f[col]), tm = !eq(b[col], c[col]);
        if (um && !tm) row[col] = f[col];
        else if (um && tm && !eq(f[col], c[col])) conflicts.push({ ...info, i, type: 'field', col, base: b[col], mine: f[col], theirs: c[col] });
        else if (!um && tm) kept.push({ ...info, kind: 'field', col, from: b[col], value: c[col] });
      });
    });
    conflicts.forEach((c, n) => { c.id = n; });
    return { items, conflicts, kept };
  }
  function resolve(m, choices) {
    const rows = m.items.map(it => it.row ? { ...it.row } : null);
    m.conflicts.forEach(c => {
      const mine = choices[c.id] === 'mine';
      if (c.type === 'field' && mine && rows[c.i]) rows[c.i][c.col] = c.mine;
      else if (c.type === 'removed-edited' && mine) rows[c.i] = null;
      else if (c.type === 'edited-removed' && mine) rows[c.i] = { ...c.mineRow };
    });
    return rows.filter(Boolean);
  }

  /* hidden-in-plain-sight sheet that ties an edited file back to its download */
  const human = iso => new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const detailsSheet = rec => ({ name: 'File details', widths: [18, 90], headerStyles: [2, 2], rows: [
    ['About this file', ''], ['Downloaded', human(rec.at)], ['File ID', rec.id],
    ['', 'Keep this sheet in the file. It lets Real World check for anything that changed while you were editing, so nobody’s updates get overwritten.'],
  ] });
  function readFileId(sheets) {
    const s = sheets.find(s => /^file details$/i.test(String(s.name || '').trim())); if (!s) return null;
    const r = s.rows.find(r => /^file id$/i.test(String((r || [])[0] || '').trim()));
    return r ? String(r[1] || '').trim() || null : null;
  }

  /* demo: a colleague updates Real World while the user is editing */
  function simulateColleague(data, at) {
    const PF = C().PF, n = data.length, at_ = i => data[i % n], items = [], mk = r => ({ key: key(r) });
    const rnd = (v, s) => Math.round(v / s) * s;
    const a = at_(0); a.OurExposure = rnd(a.OurExposure * .94, 1e4); items.push({ ...mk(a), col: 'OurExposure' });
    const b = at_(8); b.BrokerDetails = b.BrokerDetails === 'Aon UK Ltd, London' ? 'Marsh Ltd, London' : 'Aon UK Ltd, London'; items.push({ ...mk(b), col: 'BrokerDetails' });
    const c = at_(21); c.PolicyType = c.PolicyType === 'Hull' ? 'War' : 'Hull'; items.push({ ...mk(c), col: 'PolicyType' });
    const d = at_(40); d.PremiumDetails = rnd(d.PremiumDetails * 1.12, 100); items.push({ ...mk(d), col: 'PremiumDetails' });
    const e = at_(27); e.SignedLine = Math.min(100, +(e.SignedLine + 2.5).toFixed(1)); items.push({ ...mk(e), col: 'SignedLine' });
    const src = at_(12), used = new Set(data.map(key));
    let s = 950; while (used.has(src[PF] + '|' + src.PolicyNumber.replace(/\d{4}$/, '0' + s))) s++;
    const added = { ...src, PolicyNumber: src.PolicyNumber.replace(/\d{4}$/, '0' + s), IMO: '9412373', OurExposure: 9800000, TotalInsuredValue: 16660000, ReferenceNumber: 'RW-1' + s + '1', Inception: '2026-09-22', Expiry: '2027-09-22' };
    data.splice(Math.min(13, n), 0, added); items.push({ key: key(added), col: '*' });
    addLog('Sarah Whelan', items, at);
    return data;
  }

  window.PortfolioUpdateSync = { loadData, saveData, recordDownload, findDownload, pending, setStatus, whoChanged, changesSince, logDiff, merge, resolve, detailsSheet, readFileId, simulateColleague, human };
})();
