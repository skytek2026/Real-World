/* PortfolioUpdateCore — column schema, export dataset, validation (with auto-fix suggestions), skip + diff for "Update All Portfolios". */
(function () {
  const PF = 'Fleet / Portfolio';
  const COLS = [
    { k: PF, l: 'Fleet / Portfolio', t: 'pf', m: 1, w: 30, d: 'Identifies the specific fleet or collection of vessels.', ft: 'Text (must match an existing portfolio)' },
    { k: 'Group', l: 'Group', t: 'text', m: 1, w: 16, h: 'e.g. Hull, War or Cargo', d: 'Group of fleets/portfolios (e.g. War, Hull, Cargo).', ft: 'Text' },
    { k: 'PolicyNumber', l: 'Policy number', t: 'text', m: 1, w: 18, h: 'Letters and numbers · once per portfolio', d: 'Policy reference number — cannot be duplicated within the same portfolio.', ft: 'Text & Number' },
    { k: 'IMO', l: 'IMO number', t: 'imo', m: 1, w: 16, d: "Ship's valid seven-digit IMO number.", ft: '7 digits' },
    { k: 'OurExposure', l: 'Our exposure ($)', t: 'usd', m: 1, w: 20, d: 'Financial risk or liability on the policies issued (in $).', ft: 'Numerical (in $)' },
    { k: 'TotalInsuredValue', l: 'Total insured value ($)', t: 'usd', w: 22, d: 'Maximum amount payable in the event of total loss.', ft: 'Numerical (in $)' },
    { k: 'ReferenceNumber', l: 'Reference number', t: 'text', w: 18, d: 'Unique code assigned to each insurance policy.', ft: 'Text & Number' },
    { k: 'Inception', l: 'Inception date', t: 'date', w: 18, d: 'Start date of the insurance policy.', ft: 'Date (YYYY-MM-DD)' },
    { k: 'Expiry', l: 'Expiry date', t: 'date', w: 18, h: 'Date as YYYY-MM-DD · after inception', d: 'End date of the insurance policy.', ft: 'Date (YYYY-MM-DD)' },
    { k: 'ContractDetailsReference', l: 'Contract reference', t: 'text', w: 20, d: 'Identifier for the formal agreement document.', ft: 'Text & Number' },
    { k: 'SignedLine', l: 'Signed line (%)', t: 'pct', w: 18, d: 'Final agreed percentage of risk the underwriter commits to cover.', ft: 'Numerical (%)' },
    { k: 'WarExposure', l: 'War exposure ($)', t: 'usd', w: 20, d: 'Declared value of the insured asset(s) for war risk cover.', ft: 'Numerical (in $)' },
    { k: 'WarTotalInsuredValue', l: 'War total insured value ($)', t: 'usd', w: 24, d: 'Total value of the assets covered under the war policy.', ft: 'Numerical (in $)' },
    { k: 'HullAndMachinery', l: 'Hull & machinery ($)', t: 'usd', w: 20, d: 'Hull & Machinery insurance.', ft: 'Numerical (in $)' },
    { k: 'IncreasedValue', l: 'Increased value ($)', t: 'usd', w: 20, d: 'Increased Value (Hull Interest) insurance.', ft: 'Numerical (in $)' },
    { k: 'FreightDemurrageDefence', l: 'Freight, demurrage & defence ($)', t: 'usd', w: 30, d: 'Freight, Demurrage & Defence insurance.', ft: 'Numerical (in $)' },
    { k: 'PremiumDetails', l: 'Premium ($)', t: 'usd', w: 20, d: 'Insurance cost including total amount and adjustments.', ft: 'Numerical (in $)' },
    { k: 'UniqueMarketReference', l: 'Unique market reference (UMR)', t: 'text', w: 28, d: "Lloyd's / London market contract identifier.", ft: 'Text & Number' },
    { k: 'PolicyType', l: 'Policy type', t: 'choice', ch: ['Hull', 'Cargo', 'Liability', 'War', 'Cyber', 'Hull & War'], w: 22, d: 'Categorisation of the marine insurance policy.', ft: 'Choice (Hull, Cargo, Liability, War, Cyber, Hull & War)' },
    { k: 'PlacementType', l: 'Placement type', t: 'choice', ch: ['Open Market', 'Line Slip', 'Binder'], w: 22, d: 'How the insurance was arranged.', ft: 'Choice (Open Market, Line Slip, Binder)' },
    { k: 'InsurerDetails', l: 'Insurer', t: 'text', w: 34, d: 'Contact information for the insurance provider.', ft: 'Text' },
    { k: 'DelegateDetails', l: 'Delegate', t: 'text', w: 28, d: 'Individual or entity authorised to act on behalf of the insurer or insured.', ft: 'Text' },
    { k: 'BrokerDetails', l: 'Broker', t: 'text', w: 28, d: 'Intermediary who facilitated the placement.', ft: 'Text' },
    { k: 'AssuredDetails', l: 'Assured', t: 'text', w: 28, d: 'Legal name of the owner of the insured assets.', ft: 'Text' },
    { k: 'UnderwriterDetails', l: 'Underwriter', t: 'text', w: 24, d: 'Underwriter responsible for the risk.', ft: 'Text' },
  ];
  const colOf = k => COLS.find(c => c.k === k);
  const label = k => (colOf(k) || {}).l || k;
  const colName = i => i >= 0 ? window.XlsxLite.colName(i) : '';
  const norm = s => String(s ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const HMAP = {}; COLS.forEach(c => { HMAP[norm(c.k)] = c.k; HMAP[norm(c.l)] = c.k; });
  const HINT = { pf: 'Must match an existing portfolio name', text: 'Text', imo: '7 digits, e.g. 9321483', usd: 'US dollars, numbers only, e.g. 2450000', pct: 'Number from 0 to 100, e.g. 12.5', date: 'Date as YYYY-MM-DD, e.g. 2026-09-24' };
  const hint = c => (c.m ? 'Required · ' : 'Optional · ') + (c.h || (c.t === 'choice' ? 'One of: ' + c.ch.join(', ') : HINT[c.t]));

  function imoCheck(six) { const d = six.split('').map(Number); return six + (d.reduce((a, x, i) => a + x * (7 - i), 0) % 10); }
  const imoOk = s => imoCheck(s.slice(0, 6)) === s;

  /* ── sample dataset ── */
  const PER = 6, GROUPS = ['Hull', 'War', 'Cargo', 'Hull', 'Hull', 'War'];
  const PLACE = ['Open Market', 'Line Slip', 'Binder'], INS = ['Skytek Mutual Ltd, London', 'Northshore Marine Insurance, Oslo', 'Harbourline Syndicate 2041, London'];
  const DEL = ['Atlas Delegated Authority Ltd', 'Meridian MGA, Hamburg', ''], BRK = ['Marsh Ltd, London', 'Aon UK Ltd, London', 'Willis Towers Watson, London', 'Gallagher Specialty, London'];
  const ASS = ['Aegean Bulk Carriers SA', 'Baltic Crest Shipping AS', 'Coral Bay Maritime Pte', 'Delta Horizon Tankers Inc', 'Eastwind Container Lines', 'Fjordline Offshore AS', 'Golden Reef Navigation', 'Harbour Star Holdings'];
  const UW = ['Paul Kiernan, London', 'Sarah Whelan, London', 'Tomás Duarte, Lisbon'];
  function rng(seed) { return () => { seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const rnd = (v, s) => Math.round(v / s) * s;
  function buildDataset(names) {
    const R = rng(20260924), r = (a, b) => a + R() * (b - a), pick = a => a[Math.floor(R() * a.length)], rows = [];
    names.forEach((pf, pi) => {
      const pre = pf.replace(/[^A-Za-z ]/g, '').split(/\s+/).filter(Boolean).map(w => w[0].toUpperCase()).join('').slice(0, 3).padEnd(3, 'X');
      for (let j = 0; j < PER; j++) {
        const g = GROUPS[j], war = g === 'War' || R() < .25, exp = rnd(r(2e6, 6e7), 1e4), tiv = rnd(exp * r(1.3, 2.4), 1e4), mm = String(1 + Math.floor(R() * 12)).padStart(2, '0');
        rows.push({
          [PF]: pf, Group: g, PolicyNumber: `${pre}-26-${String(101 + j * 7 + pi * 3).padStart(4, '0')}`, IMO: imoCheck(String(900000 + Math.floor(R() * 99999))),
          OurExposure: exp, TotalInsuredValue: tiv, ReferenceNumber: `RW-${100200 + pi * 50 + j * 7}`, Inception: `2026-${mm}-01`, Expiry: `2027-${mm}-01`,
          ContractDetailsReference: `CDR-2026-${String(pi * 10 + j + 11).padStart(4, '0')}`, SignedLine: Math.round(r(5, 40) * 10) / 10,
          WarExposure: war ? rnd(exp * r(.3, .8), 1e4) : '', WarTotalInsuredValue: war ? rnd(tiv * .9, 1e4) : '',
          HullAndMachinery: rnd(tiv * r(.6, .8), 1e4), IncreasedValue: rnd(tiv * r(.1, .25), 1e4), FreightDemurrageDefence: rnd(r(2.5e5, 1.5e6), 1e4), PremiumDetails: rnd(exp * r(.004, .012), 100),
          UniqueMarketReference: `B0999${pre}2026${String(pi * PER + j + 1).padStart(3, '0')}`, PolicyType: g === 'Cargo' ? 'Cargo' : (war && g !== 'War' ? 'Hull & War' : g),
          PlacementType: pick(PLACE), InsurerDetails: pick(INS), DelegateDetails: pick(DEL), BrokerDetails: pick(BRK), AssuredDetails: pick(ASS), UnderwriterDetails: pick(UW),
        });
      }
    });
    return rows;
  }

  /* ── workbook sheets ── */
  const prompts = () => COLS.map((c, i) => ({ sqref: `${colName(i)}3:${colName(i)}2000`, title: c.l.slice(0, 32), text: (hint(c) + '. ' + c.d).slice(0, 255) }));
  const templateSheet = data => ({
    name: 'Portfolios', rows: [COLS.map(c => c.l), COLS.map(hint), ...data.map(r => COLS.map(c => r[c.k] ?? ''))],
    widths: COLS.map(c => c.w), headerStyles: COLS.map(c => c.m ? 1 : 2), hintRow: true, freeze: 2, rowHeights: { 1: 48 }, prompts: prompts(),
  });
  const infoRows = () => [['Column', 'Description', 'What to enter'], ...COLS.map(c => [c.l + (c.m ? ' (required)' : ''), c.d, hint(c).replace(/^(Required|Optional) · /, '')])];
  const infoSheet = () => ({ name: 'Info', rows: infoRows(), widths: [34, 80, 48], headerStyles: [2, 2, 2] });

  function annotatedSheet(parsed, errors, fixes) {
    const rows = parsed.sheetRows.map(r => (r || []).slice());
    const issueCol = Math.max(parsed.header.length, ...rows.map(r => r.length));
    const styles = {}, byRow = {};
    rows[0][issueCol] = 'Problems to fix';
    errors.forEach(e => {
      if (typeof e.row !== 'number') return;
      if (e.ci >= 0) styles[`${e.row - 1},${e.ci}`] = 3;
      if (e.row > 1) (byRow[e.row] = byRow[e.row] || []).push(e);
    });
    (fixes || []).forEach(f => { if (f.ci >= 0) styles[`${f.row - 1},${f.ci}`] = 5; });
    Object.entries(byRow).forEach(([r, list]) => { const ri = r - 1; rows[ri][issueCol] = list.map(e => `${e.label}: ${e.issue}`).join('  •  '); styles[`${ri},${issueCol}`] = 6; });
    const widths = parsed.keys.map(k => k ? colOf(k).w : 18); widths[issueCol] = 70;
    const headerStyles = parsed.keys.map(k => k && colOf(k).m ? 1 : 2); headerStyles[issueCol] = 7;
    return { name: parsed.sheet || 'Portfolios', rows, widths, headerStyles, cellStyle: styles, hintRow: parsed.hintRow, freeze: parsed.hintRow ? 2 : 1, rowHeights: parsed.hintRow ? { 1: 48 } : {}, prompts: prompts() };
  }

  function parseSheet(sheets) {
    const s = sheets.find(s => (s.rows[0] || []).some(h => HMAP[norm(h)] === 'IMO'));
    if (!s) return null;
    const header = s.rows[0].map(h => String(h ?? '').trim());
    const keys = header.map(h => h ? (HMAP[norm(h)] || null) : null);
    const hr = s.rows[1] || [];
    const hintRow = hr.some(v => /^(required|optional)\s*·/i.test(String(v ?? '').trim()));
    const rows = [];
    for (let i = hintRow ? 2 : 1; i < s.rows.length; i++) {
      const cells = s.rows[i] || [];
      if (!cells.some(v => String(v ?? '').trim() !== '')) continue;
      const raw = {}; keys.forEach((k, ci) => { if (k && !(k in raw)) raw[k] = cells[ci] ?? ''; });
      rows.push({ __row: i + 1, raw });
    }
    return { sheet: s.name, header, keys, rows, hintRow, sheetRows: s.rows.map(r => (r || []).slice()) };
  }

  /* ── problem kinds (plain language) ── */
  const KINDS = {
    file: { one: 'We couldn’t use this file', fix: 'Upload the Excel workbook (.xlsx) you downloaded in step 1.', fatal: 1 },
    'hdr-missing': { one: 'A column is missing', many: '{n} columns are missing', fix: 'Don’t delete or rename columns. Put the header back exactly as it was, or download a fresh copy and paste your changes into it.', fatal: 1 },
    'hdr-unknown': { one: 'A column name isn’t recognised', many: '{n} column names aren’t recognised', fix: 'Change the column name back to the one in the downloaded file, or delete the extra column.', fatal: 1 },
    empty: { one: 'The sheet has no policies', fix: 'Add at least one policy row under the header, or upload the file you downloaded and edited.', fatal: 1 },
    missing: { one: 'A required cell is empty', many: '{n} required cells are empty', fix: 'Fill in these cells. Fleet / Portfolio, Group, Policy number, IMO number and Our exposure can’t be left blank.' },
    pf: { one: 'A portfolio name doesn’t match', many: '{n} portfolio names don’t match', fix: 'Type the portfolio name exactly as it appears in Real World.' },
    'imo-len': { one: 'An IMO number isn’t 7 digits', many: '{n} IMO numbers aren’t 7 digits', fix: 'IMO numbers are always 7 digits, e.g. 9321483. Check for missing or extra digits.' },
    'imo-bad': { one: 'An IMO number doesn’t exist', many: '{n} IMO numbers don’t exist', fix: 'One digit is probably mistyped. Check the number against the vessel’s record.' },
    currency: { one: 'An amount isn’t in US dollars', many: '{n} amounts aren’t in US dollars', fix: 'Convert these to US dollars and enter just the number, e.g. 2450000. We can’t convert currencies for you.' },
    amount: { one: 'An amount isn’t written as a number', many: '{n} amounts aren’t written as numbers', fix: 'Enter the full number using digits only, e.g. 14500000 instead of 14.5M.' },
    negative: { one: 'An amount is below zero', many: '{n} amounts are below zero', fix: 'Amounts must be zero or more. Remove the minus sign.' },
    pct: { one: 'A signed line isn’t between 0 and 100', many: '{n} signed lines aren’t between 0 and 100', fix: 'Enter a percentage from 0 to 100, e.g. 12.5.' },
    date: { one: 'A date is in the wrong format', many: '{n} dates are in the wrong format', fix: 'Write dates as year-month-day, e.g. 2026-09-24.' },
    'date-order': { one: 'An expiry date is before the inception date', many: '{n} expiry dates are before the inception date', fix: 'A policy must end after it starts. Check both dates on these rows.' },
    choice: { one: 'A value isn’t one of the allowed options', many: '{n} values aren’t one of the allowed options', fix: 'Use one of the options listed under the column header in the file.' },
    dup: { one: 'A policy number is used twice', many: '{n} policy numbers are used twice', fix: 'Each policy number can appear only once per portfolio. Change one of them, or delete the duplicate row.' },
  };
  const groupTitle = (k, n) => n > 1 && KINDS[k].many ? KINDS[k].many.replace('{n}', n) : KINDS[k].one;
  const fileError = (issue, name) => ({ kind: 'file', row: '—', ci: -1, letter: '', label: 'File', issue, value: name });

  /* ── auto-fix helpers ── */
  const isIso = d => /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(Date.parse(d)) && new Date(d).toISOString().slice(0, 10) === d;
  const iso = (y, mo, d) => { const s = `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`; return isIso(s) ? s : null; };
  const MON = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  function fixDate(s) {
    let m = s.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/); if (m) return iso(m[3], m[2], m[1]);
    m = s.match(/^(\d{4})[\/.](\d{1,2})[\/.](\d{1,2})$/); if (m) return iso(m[1], m[2], m[3]);
    m = s.match(/^(\d{1,2})\s+([a-z]{3,})\.?,?\s+(\d{4})$/i); if (m) { const i = MON.indexOf(m[2].slice(0, 3).toLowerCase()); if (i >= 0) return iso(m[3], i + 1, m[1]); }
    return null;
  }
  const serial = n => new Date(Date.UTC(1899, 11, 30) + Math.round(n) * 864e5).toISOString().slice(0, 10);
  function shorthand(s) {
    const m = s.replace(/,/g, '').match(/^(?:usd|us\$|\$)?\s*(\d+(?:\.\d+)?)\s*(k|thousand|m|mn|mm|mil|million|b|bn|billion)$/i);
    if (!m) return null;
    const mult = /^(k|th)/i.test(m[2]) ? 1e3 : /^b/i.test(m[2]) ? 1e9 : 1e6;
    return Math.round(+m[1] * mult * 100) / 100;
  }
  const loose = s => String(s).toLowerCase().replace(/&/g, 'and').replace(/[^a-z]/g, '');
  function lev(a, b) {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  function closest(s, names) {
    const scored = names.map(n => ({ n, d: lev(s.toLowerCase(), n.toLowerCase()) })).sort((a, b) => a.d - b.d);
    return scored.length && scored[0].d <= 2 && (scored.length < 2 || scored[1].d > scored[0].d) ? scored[0].n : null;
  }

  function validate(parsed, names) {
    const errs = [], hIdx = {}, keys = parsed.keys;
    keys.forEach((k, i) => { if (k && !(k in hIdx)) hIdx[k] = i; });
    const H = (kind, ci, lbl, issue, value = '') => errs.push({ kind, row: 1, ci, letter: colName(ci), col: null, label: lbl, issue, value });
    COLS.forEach(c => { if (!(c.k in hIdx)) H('hdr-missing', -1, c.l, c.m ? 'This required column is missing from the header row.' : 'This column is missing from the header row.'); });
    parsed.header.forEach((h, i) => { if (h && !keys[i]) H('hdr-unknown', i, h, `“${h}” isn’t one of the column names in the downloaded file.`, h); });
    if (errs.length) return { errors: errs, rows: [] };
    if (!parsed.rows.length) return { errors: [{ kind: 'empty', row: '—', ci: -1, letter: '', label: 'Sheet', issue: 'There are no policy rows under the header.', value: '' }], rows: [] };
    const out = [], seen = {};
    parsed.rows.forEach(r => {
      const n = {}, pf = String(r.raw[PF] ?? '').trim(), policy = String(r.raw.PolicyNumber ?? '').trim();
      const E = (kind, k, issue, value, fixTo) => { const ci = hIdx[k], e = { kind, row: r.__row, ci, letter: colName(ci), col: k, label: label(k), issue, value, pf, policy }; if (fixTo !== undefined && fixTo !== null) e.fixTo = fixTo; errs.push(e); };
      COLS.forEach(c => {
        const raw = r.raw[c.k], s = raw == null ? '' : String(raw).trim(), err = (kind, issue, fixTo) => E(kind, c.k, issue, s, fixTo);
        n[c.k] = '';
        if (s === '') { if (c.m) err('missing', `${c.l} is required.`); return; }
        switch (c.t) {
          case 'pf': { if (!names.includes(s)) { const m = closest(s, names); err('pf', `There’s no portfolio called “${s}”.${m ? ` Did you mean “${m}”?` : ''}`, m); } n[c.k] = s; break; }
          case 'imo': {
            if (/^\d{7}$/.test(s)) { if (!imoOk(s)) err('imo-bad', `${s} isn’t a real IMO number — a digit may be mistyped.`); n[c.k] = s; break; }
            const t = s.replace(/^imo/i, '').replace(/[\s.\-]/g, '');
            if (/^\d{7}$/.test(t) && imoOk(t)) { err('imo-len', 'Has extra characters — an IMO number is just the 7 digits.', t); break; }
            const dl = t.replace(/\D/g, '').length;
            err('imo-len', `Has ${dl} digit${dl === 1 ? '' : 's'} — it needs exactly 7.`); break;
          }
          case 'usd': {
            if (typeof raw === 'number') { if (raw < 0) err('negative', 'Amounts can’t be below zero.'); n[c.k] = raw; break; }
            if (/[£€¥₹]|\b(GBP|EUR|JPY|CHF|NOK)\b/i.test(s)) { err('currency', 'This amount isn’t in US dollars.'); break; }
            const t = s.replace(/^(USD|US\$)/i, '').replace(/[$,\s]/g, '');
            if (/^-?\d+(\.\d+)?$/.test(t)) { if (+t < 0) err('negative', 'Amounts can’t be below zero.'); n[c.k] = +t; break; }
            const sh = shorthand(s);
            if (sh != null) { err('amount', `“${s}” is shorthand — enter the full number.`, sh); break; }
            err('amount', 'This isn’t a number. Enter the amount using digits only.'); break;
          }
          case 'pct': {
            const t = typeof raw === 'number' ? raw : +s.replace('%', '');
            if (isNaN(t)) { err('pct', 'This isn’t a number.'); break; }
            if (t < 0 || t > 100) err('pct', `${t}% is outside 0–100.`); n[c.k] = t; break;
          }
          case 'date': {
            const d = typeof raw === 'number' ? serial(raw) : s;
            if (isIso(d)) { n[c.k] = d; break; }
            const f = fixDate(s);
            err('date', f ? `“${s}” needs to be written year-month-day.` : `“${s}” isn’t a date we recognise.`, f); break;
          }
          case 'choice': {
            const m = c.ch.find(x => x.toLowerCase() === s.toLowerCase()); if (m) { n[c.k] = m; break; }
            err('choice', `“${s}” isn’t a ${c.l.toLowerCase()} option. Use ${c.ch.join(', ')}.`, c.ch.find(x => loose(x) === loose(s))); break;
          }
          default: n[c.k] = s;
        }
      });
      const key = n[PF] && n.PolicyNumber ? n[PF] + '|' + n.PolicyNumber : null;
      if (key) { if (seen[key]) E('dup', 'PolicyNumber', `Also used on row ${seen[key]} in the same portfolio.`, n.PolicyNumber); else seen[key] = r.__row; }
      if (n.Inception && n.Expiry && n.Expiry <= n.Inception) E('date-order', 'Expiry', `Expiry (${n.Expiry}) isn’t after inception (${n.Inception}).`, n.Expiry);
      out.push(n);
    });
    errs.sort((a, b) => (a.row - b.row) || (a.ci - b.ci));
    return { errors: errs, rows: out };
  }

  function applyFixes(parsed, errors) {
    const done = [];
    errors.forEach(e => {
      if (e.fixTo === undefined) return;
      const r = parsed.rows.find(x => x.__row === e.row); if (!r) return;
      r.raw[e.col] = e.fixTo;
      const sr = parsed.sheetRows[e.row - 1]; if (sr && e.ci >= 0) sr[e.ci] = e.fixTo;
      done.push({ row: e.row, ci: e.ci, letter: e.letter, col: e.col, label: e.label, from: e.value, to: e.fixTo, pf: e.pf, policy: e.policy });
    });
    return done;
  }

  function skipRows(parsed, v, orig) {
    const bad = new Set(v.errors.map(e => e.row)), keyOf = r => r[PF] + '|' + r.PolicyNumber;
    const keep = v.rows.filter((n, i) => !bad.has(parsed.rows[i].__row));
    const have = new Set(keep.map(keyOf)), pk = new Set(), pImo = new Set(), pPol = new Set(), skipped = [];
    parsed.rows.forEach(r => {
      if (!bad.has(r.__row)) return;
      const pf = String(r.raw[PF] ?? '').trim(), pol = String(r.raw.PolicyNumber ?? '').trim(), imo = String(r.raw.IMO ?? '').replace(/\D/g, '');
      pk.add(pf + '|' + pol); if (imo) pImo.add(pf + '|' + imo); if (pol) pPol.add(pol);
      skipped.push({ row: r.__row, pf, policy: pol, n: v.errors.filter(e => e.row === r.__row).length });
    });
    orig.forEach(o => { const k = keyOf(o); if (!have.has(k) && (pk.has(k) || pImo.has(o[PF] + '|' + o.IMO) || pPol.has(o.PolicyNumber))) { keep.push({ ...o }); have.add(k); } });
    return { rows: keep, skipped };
  }

  const empty = v => v === '' || v == null;
  function eq(a, b) { if (empty(a) && empty(b)) return true; if (empty(a) || empty(b)) return false; if (typeof a === 'number' || typeof b === 'number') return Math.abs(+a - +b) < 1e-6; return String(a) === String(b); }
  function diff(orig, next) {
    const key = r => r[PF] + '|' + r.PolicyNumber, om = new Map(orig.map(r => [key(r), r])), nm = new Map(next.map(r => [key(r), r]));
    const changed = [], added = [], removed = [], touched = new Set(); let values = 0;
    next.forEach(r => {
      const o = om.get(key(r)), base = { portfolio: r[PF], policy: r.PolicyNumber, imo: r.IMO };
      if (!o) { added.push({ ...base, row: r }); touched.add(r[PF]); return; }
      const fields = COLS.filter(c => c.k !== PF && c.k !== 'PolicyNumber' && !eq(o[c.k], r[c.k])).map(c => ({ col: c.k, from: o[c.k], to: r[c.k] }));
      if (fields.length) { changed.push({ ...base, fields }); values += fields.length; touched.add(r[PF]); }
    });
    orig.forEach(o => { if (!nm.has(key(o))) { removed.push({ portfolio: o[PF], policy: o.PolicyNumber, imo: o.IMO, row: o }); touched.add(o[PF]); } });
    return { changed, added, removed, touched: [...touched], values };
  }
  function fmt(k, v) {
    if (empty(v)) return '';
    const c = colOf(k);
    if (c && c.t === 'usd' && typeof v === 'number') return '$' + v.toLocaleString('en-US', { maximumFractionDigits: 2 });
    if (c && c.t === 'pct' && typeof v === 'number') return v + '%';
    return String(v);
  }

  /* ── example files ── */
  const clone = d => d.map(r => ({ ...r }));
  function sampleValid(d) {
    const a = clone(d), at = i => a[i % a.length];
    at(0).OurExposure = rnd(at(0).OurExposure * 1.15, 1e4); at(0).SignedLine = Math.min(100, +(at(0).SignedLine + 5).toFixed(1));
    at(8).Expiry = at(8).Expiry.replace(/^(\d{4})/, y => +y + 1); at(8).PremiumDetails = rnd(at(8).PremiumDetails * 1.08, 100);
    at(15).BrokerDetails = 'Howden Group, London';
    at(21).PolicyType = at(21).PolicyType === 'Hull & War' ? 'Hull' : 'Hull & War'; at(21).WarExposure = rnd(at(21).OurExposure * .5, 1e4);
    at(33).TotalInsuredValue = rnd(at(33).TotalInsuredValue * .92, 1e4);
    at(47).UnderwriterDetails = at(47).UnderwriterDetails === 'Sarah Whelan, London' ? 'Tomás Duarte, Lisbon' : 'Sarah Whelan, London';
    const mk = (src, suffix, six, exp) => ({ ...src, PolicyNumber: src.PolicyNumber.replace(/\d{4}$/, suffix), IMO: imoCheck(six), OurExposure: exp, TotalInsuredValue: rnd(exp * 1.7, 1e4), ReferenceNumber: 'RW-1' + suffix + '9', Inception: '2026-10-01', Expiry: '2027-10-01', UniqueMarketReference: src.UniqueMarketReference.slice(0, -3) + suffix.slice(1) });
    const used = new Set(a.map(r => r[PF] + '|' + r.PolicyNumber));
    const uniq = (src, start) => { let n = start; while (used.has(src[PF] + '|' + src.PolicyNumber.replace(/\d{4}$/, String(n).padStart(4, '0')))) n++; const s = String(n).padStart(4, '0'); used.add(src[PF] + '|' + src.PolicyNumber.replace(/\d{4}$/, s)); return s; };
    const n2 = mk(at(50), uniq(at(50), 902), '957318', 7250000), n1 = mk(at(3), uniq(at(3), 901), '941275', 18500000);
    a.splice(Math.min(40, a.length - 1), 1);
    a.splice(Math.min(49, a.length), 0, n2);
    a.splice(Math.min(PER, a.length), 0, n1);
    return a;
  }
  function sampleErrors(d) {
    const a = clone(d), at = i => a[i % a.length];
    at(0).OurExposure = rnd(at(0).OurExposure * 1.1, 1e4);
    at(2).IMO = '';
    at(5).IMO = '93245';
    at(9).OurExposure = '£2,450,000';
    at(12).TotalInsuredValue = '14.5M';
    at(17).SignedLine = 125;
    at(20).Inception = '24/09/2026';
    at(26).PolicyType = 'Marine';
    at(31).PolicyNumber = at(30).PolicyNumber;
    at(35).Group = '';
    at(44)[PF] = at(44)[PF].slice(0, -1);
    { const s = at(50).IMO; at(50).IMO = s.slice(0, 6) + ((+s[6] + 3) % 10); }
    at(53).Expiry = at(53).Inception.replace(/^2026/, '2025');
    at(57).HullAndMachinery = '-1500000';
    return a;
  }

  window.PortfolioUpdateCore = { COLS, PF, KINDS, label, hint, groupTitle, fileError, buildDataset, templateSheet, infoSheet, annotatedSheet, parseSheet, validate, applyFixes, skipRows, diff, fmt, sampleValid, sampleErrors };
})();
