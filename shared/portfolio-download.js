/* Portfolio overview download — Excel export of the portfolio's assets (fields per "Portfolio overview download" spec). */
(function () {
  let xp = null;
  const loadX = () => xp || (xp = new Promise((res, rej) => {
    if (window.XLSX) return res(window.XLSX);
    const s = document.createElement('script'); s.src = 'https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js';
    s.onload = () => res(window.XLSX); s.onerror = () => { xp = null; rej(new Error('load')); }; document.head.appendChild(s);
  }));
  const HEAD = ['PolicyNumber','Reference Number','Inception Date','Expiry Date','VesselName','No. Of Ex Names','OurExposure','TotalInsuredValue','Estimated Value (M)','IMO','MMSI','Country of Build','Shipbuilder','Year Built','Flag','Generic Type','Detailed Type','Ship Status','Gross Tonnage (t)','Dead Weight (t)','Length (m)','Width (m)','Breadth Moulded (m)','Depth (m)','Main Engines Manufacturer','Model Number of Main Engine','Propulsion Type','Class','TEU','Latest Timestamp','Owner','Tech Manager','DOC Company','Group Beneficial Owner','Operator','Ship Manager','P&I','Class Narrative','Total Risk Score','Total Risk Score Comment','Sanctions Compliance','Total Inspections all','Total Inspections last 3 years','Total Inspections last 1 year','Days Detained all','Days Detained last 3 years','Days Detained last 1 year','Deficiencies all','Deficiencies last 3 years','Deficiencies last 1 year','Total Detentions all','Total Detentions last 3 years','Total Detentions last year','Casualties total','Major casualties last year','Minor casualties last year','EEXI Attained','EEXI Required','CII Attained','CII Required','CII Rating'];
  const pick = (a, i) => a[i % a.length];
  const FLAG = ['Marshall Islands','Liberia','Panama','Singapore','Malta','Bahamas','Greece'];
  const BUILD = [['South Korea','Hyundai Mipo Dockyard'],['South Korea','SPP Shipbuilding'],['China','Guangzhou Shipyard International'],['Japan','Onomichi Dockyard'],['China','Jinling Shipyard']];
  const ENG = [['MAN Energy Solutions','6S50ME-C8.2'],['WinGD','6X52'],['Hyundai-MAN B&W','6G50ME-C9.5'],['Mitsubishi','6UEC50LSH']];
  const CLASS = ['DNV','ABS','Lloyd\u2019s Register','Bureau Veritas','ClassNK'];
  const PI = ['Gard','The Standard Club','UK P&I Club','Skuld','West of England'];
  const DT = ['Oil/Chemical Tanker','Products Tanker','Crude Oil Tanker','LPG Tanker','Bulk Carrier'];
  const usd = m => Math.round(m * 1e6);
  function row(r, i) {
    const [cob, yard] = pick(BUILD, i), [mfr, model] = pick(ENG, i), yb = 2008 + (i * 7) % 15, gt = 29000 + (i * 1373) % 9000;
    const [inc, exp] = (r.period || '2025-02-20 / 2028-02-20').split(' / ');
    const insp = 8 + (i * 5) % 17, insp3 = Math.min(insp, 3 + i % 6), insp1 = Math.min(insp3, 1 + i % 3);
    const det = i % 6 === 2 ? 1 : 0, sanc = i === 6 || i === 15 ? 'Sanctioned' : i % 5 === 1 ? 'Warning' : 'Ok';
    const risk = sanc === 'Sanctioned' ? 9.1 : sanc === 'Warning' ? 6.4 : +(2.1 + (i * 0.37) % 3).toFixed(1);
    const eexiR = +(5.6 + (i % 4) * 0.2).toFixed(2), cii = +(4.8 + (i * 0.31) % 2.2).toFixed(2), ciiR = 5.6, rating = cii < 5 ? 'B' : cii < 5.8 ? 'C' : cii < 6.4 ? 'D' : 'E';
    const owner = r.asset.startsWith('ARDMORE') ? 'Ardmore Shipping Ltd' : 'Great Eastern Shipping Co';
    return [r.num, r.ref, inc, exp, r.asset, i % 4 === 1 ? 1 : 0, usd(r.exp), usd(r.tiv), +(r.tiv * 0.92).toFixed(1),
      9400000 + i * 4211, 538000000 + i * 3917, cob, yard, yb, pick(FLAG, i), 'Tanker', pick(DT, i), i >= 21 ? 'In Service/Commission (policy expired)' : 'In Service/Commission',
      gt, Math.round(gt * 1.66), 183.1, 32.2, 32.2, 19.1, mfr, model, 'Diesel (HFO / VLSFO)', pick(CLASS, i), '', '2026-10-0' + (1 + i % 6) + ' ' + String(6 + i % 12).padStart(2, '0') + ':' + String((i * 13) % 60).padStart(2, '0') + ' UTC',
      owner, owner.replace('Ltd', 'Management'), owner.replace('Ltd', 'Management'), owner.replace(' Ltd', ' Group'), owner, owner.replace('Ltd', 'Management'),
      pick(PI, i), 'In class, no conditions of class', risk, sanc === 'Ok' ? 'Low risk profile' : sanc === 'Warning' ? 'Ownership linked to watch-list entity' : 'Vessel named on OFAC SDN list', sanc,
      insp, insp3, insp1, det * (3 + i % 4), det * (3 + i % 4), i % 12 === 2 ? 3 : 0, insp * 2 + i % 5, insp3 * 2, insp1 + i % 3, det + (i % 9 === 0 ? 1 : 0), det, i % 12 === 2 ? 1 : 0,
      i % 7 === 0 ? 2 : i % 5 === 0 ? 1 : 0, 0, i % 7 === 0 ? 1 : 0, +(eexiR - 0.4 - (i % 3) * 0.1).toFixed(2), eexiR, cii, ciiR, rating];
  }
  async function run(btn) {
    const P = { name: btn && btn.dataset.name }, rows = (window.__AD_ROWS ? window.__AD_ROWS() : []);
    const base = String(P.name || 'Portfolio').replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '_');
    const d = new Date(), stamp = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    const name = `${base}_Portfolio_Details_${stamp}.xlsx`, lbl = btn && btn.querySelector('span'), old = lbl && lbl.textContent;
    if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); lbl.textContent = 'PREPARING\u2026'; }
    try {
      const X = await loadX(), aoa = [HEAD, ...rows.map(row)], ws = X.utils.aoa_to_sheet(aoa);
      ws['!cols'] = HEAD.map((h, c) => ({ wch: Math.min(48, Math.max(h.length, ...aoa.slice(1).map(r => String(r[c] ?? '').length)) + 2) }));
      ws['!autofilter'] = { ref: X.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: aoa.length - 1, c: HEAD.length - 1 } }) };
      ws['!freeze'] = { xSplit: 5, ySplit: 1 };
      [6, 7].forEach(c => { for (let r = 1; r < aoa.length; r++) { const a = X.utils.encode_cell({ r, c }); if (ws[a]) ws[a].z = '$#,##0'; } });
      const wb = X.utils.book_new(); X.utils.book_append_sheet(wb, ws, 'Portfolio overview download');
      X.writeFile(wb, name);
      window.dsToast && dsToast({ tone: 'success', title: 'Portfolio details downloaded', desc: `${name} \u00b7 ${rows.length} assets` });
    } catch (e) {
      window.dsToast && dsToast({ tone: 'danger', title: 'Download failed', desc: 'Couldn\u2019t build the Excel file. Check your connection and try again.', duration: 6000 });
    } finally {
      if (btn && btn.isConnected) { btn.disabled = false; btn.removeAttribute('aria-busy'); lbl.textContent = old; }
    }
  }
  document.addEventListener('click', e => { const b = e.target.closest('[data-portfolio-dl]'); if (b && !b.disabled) run(b); });
})();
