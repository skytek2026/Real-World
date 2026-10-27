(function(){
const st = document.createElement('style'); st.textContent = ".voy-sel{appearance:none;-webkit-appearance:none;height:30px;padding:0 28px 0 10px;border:1px solid #e2e8f0;border-radius:8px;font:inherit;font-size:12px;font-weight:600;color:#334155;background:#fff;cursor:pointer;outline:none}.voy-sel:focus{border-color:var(--brand-500,#3b82f6);box-shadow:0 0 0 3px rgb(59 130 246/.15)}.voy-tip{position:absolute;pointer-events:none;background:#fff;border:1px solid #e2e8f0;border-radius:6px;box-shadow:0 4px 14px rgb(15 23 42/.14);padding:7px 10px;font-size:12px;color:#0f172a;white-space:nowrap;z-index:5}.voy-tip-d{font-weight:600;margin-bottom:3px}.voy-tip-r{display:flex;align-items:center;gap:6px}.voy-tip-r b{font-weight:600}.voy-tip-r span:last-child{margin-left:8px}.voy-tip-dot{width:7px;height:7px;border-radius:50%;background:var(--brand-500,#3b82f6)}.voy-radio{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:#334155;cursor:pointer}.voy-radio input{width:15px;height:15px;accent-color:var(--brand-600,#2563eb);margin:0;cursor:pointer}"; document.head.appendChild(st);
let voyYear = '2026', voyRegion = 'High Risk Areas', voyMetric = 'ships';
const VOY_REGION_GROUPS = [
  ['Country Eez', ['Ireland','Israel EEZ']],
  ['High Risk Areas', ['Gulf of Guinea [JWC]','Persian Gulf, Oman, IO, Aden, S Red Sea [JWC]','Sea of Azov and Black Sea [JWC]','Sudan [JWC]','Syria [JWC]','Venezuela [JWC]']],
  ['Jwla-034', ['Persian Gulf Oman, IO, Aden, S Red Sea [JWC]','Saudi Arabia [JWC]']],
  ['Other', ['Canal - Suez','Istanbul Anchorage','Persian Gulf','Red Sea','Romania_EEZ','Savanah port']],
];
const VOY_METRICS = [['ships','No. of Ships in Region'],['exposure','Exposure'],['total','Total No. of entries in Region'],['max','Max No. of entries in Region']];
function voySeries(year, region, metric) {
  let seed = 0; for (const ch of year + region) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
  const start = new Date(+year, 0, 2), days = 240;
  const v = new Array(days).fill(1);
  const bumps = (year === '2026' && region === 'High Risk Areas')
    ? [[20,4,2],[26,1,2],[49,5,2],[55,1,2],[57,3,2],[64,5,2],[70,1,2],[72,11,2],[85,4,2],[95,4,2],[99,2,3],[103,2,3],[105,1,2],[190,5,2],[196,3,2],[200,3,2]]
    : Array.from({ length: 10 }, () => [Math.floor(rnd() * 225), 1 + Math.floor(rnd() * 8), rnd() < .25 ? 3 : 2]);
  bumps.forEach(([d, len, val]) => { for (let i = d; i < Math.min(days, d + len); i++) v[i] = Math.max(v[i], val); });
  return v.map((n, i) => {
    const date = new Date(start); date.setDate(start.getDate() + i);
    const val = metric === 'ships' ? n : metric === 'exposure' ? Math.round(n * (38 + rnd() * 6)) : metric === 'total' ? n + Math.floor(rnd() * n * 1.5) : n + (n > 1 ? 1 : 0);
    return { date, val };
  });
}
function VoyChart() {
  const pts = voySeries(voyYear, voyRegion, voyMetric);
  const label = VOY_METRICS.find(m => m[0] === voyMetric)[1] + (voyMetric === 'exposure' ? ' ($M)' : '');
  const W = 1000, H = 300, pl = 44, pr = 12, pt = 12, pb = 34;
  const raw = Math.max(...pts.map(p => p.val));
  const step = raw <= 5 ? 1 : Math.ceil(raw / 4 / 10) * 10;
  const ymax = Math.ceil((raw + (raw <= 5 ? 1 : 0)) / step) * step;
  const x = i => pl + (i / (pts.length - 1)) * (W - pl - pr);
  const y = v => pt + (1 - v / ymax) * (H - pt - pb);
  const ticks = []; for (let t = 0; t <= ymax; t += step) ticks.push(t);
  const grid = ticks.map(t => `<line x1="${pl}" x2="${W - pr}" y1="${y(t)}" y2="${y(t)}" stroke="#eef2f6"></line><text x="${pl - 10}" y="${y(t) + 4}" text-anchor="end" font-size="8.5" fill="#64748b">${t}</text>`).join('');
  const xt = pts.map((p, i) => [p, i]).filter(([p, i]) => i % 14 === 10).map(([p, i]) => `<line x1="${x(i)}" x2="${x(i)}" y1="${H - pb}" y2="${H - pb + 5}" stroke="#94a3b8"></line><text x="${x(i)}" y="${H - pb + 16}" text-anchor="middle" font-size="8.5" fill="#334155">${p.date.getDate()} ${p.date.toLocaleString('en-GB', { month: 'short' })}</text>`).join('');
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.val).toFixed(1)}`).join(' ');
  const dots = pts.map((p, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(p.val).toFixed(1)}" r="2.2" fill="var(--brand-500,#3b82f6)"></circle>`).join('');
  window.__voy = { pts, W, H, pl, pr, pt, pb, x, y };
  return `<div style="display:flex;align-items:stretch;gap:4px">
      <div style="writing-mode:vertical-rl;transform:rotate(180deg);font-size:11px;color:#64748b;text-align:center;white-space:nowrap">${label}</div>
      <div id="voy-plot" style="position:relative;flex:1;min-width:0">
      <svg id="voy-svg" viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block" role="img" aria-label="${label} over time">
        ${grid}<line x1="${pl}" x2="${W - pr}" y1="${H - pb}" y2="${H - pb}" stroke="#94a3b8"></line>${xt}
        <path d="${path}" fill="none" stroke="var(--brand-500,#3b82f6)" stroke-width="1.1" stroke-linejoin="round"></path>${dots}
        <line id="voy-guide" x1="0" x2="0" y1="${pt}" y2="${H - pb}" stroke="#94a3b8" stroke-width="1" visibility="hidden"></line>
        <circle id="voy-hover" r="5" fill="var(--brand-500,#3b82f6)" stroke="#fff" stroke-width="2" visibility="hidden"></circle>
        <rect x="${pl}" y="${pt}" width="${W - pl - pr}" height="${H - pt - pb}" fill="transparent" style="cursor:crosshair"></rect>
      </svg>
      <div id="voy-tip" class="voy-tip" hidden></div>
      </div>
    </div>
    <div style="display:flex;justify-content:center;align-items:center;gap:6px;font-size:12px;color:#334155;margin-top:4px"><span style="display:inline-flex;align-items:center"><span style="width:14px;height:2px;background:var(--brand-500,#3b82f6)"></span><span style="width:5px;height:5px;border-radius:50%;background:var(--brand-500,#3b82f6);margin-left:-9.5px"></span></span><span style="margin-left:6px">${voyRegion}</span></div>`;
}
function VoyagesContent() {
  const sel = (id, opts, cur, w) => `<div style="position:relative"><select id="${id}" class="voy-sel" style="width:${w}">${opts.map(o => `<option ${o === cur ? 'selected' : ''}>${o}</option>`).join('')}</select><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);pointer-events:none"><path d="m6 9 6 6 6-6"></path></svg></div>`;
  return `
  <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:8px">
    <div class="text-sm font-semibold text-ink-800">Regions History</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">${sel('voy-year', ['2024','2025','2026'], voyYear, '84px')}<div style="position:relative"><select id="voy-region" class="voy-sel" style="width:300px;max-width:100%">${VOY_REGION_GROUPS.map(([g, items]) => `<option value="${g}" ${g === voyRegion ? 'selected' : ''} style="font-weight:600">${g}</option>` + items.map(i => `<option value="${i}" ${i === voyRegion ? 'selected' : ''}>\u00A0\u00A0\u00A0\u00A0${i}</option>`).join('')).join('')}</select><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);pointer-events:none"><path d="m6 9 6 6 6-6"></path></svg></div></div>
  </div>
  <div id="voy-chart">${VoyChart()}</div>
  <div role="radiogroup" aria-label="Chart metric" style="display:flex;justify-content:center;flex-wrap:wrap;gap:6px 18px;margin-top:12px">
    ${VOY_METRICS.map(([k, l]) => `<label class="voy-radio"><input type="radio" name="voy-metric" value="${k}" ${k === voyMetric ? 'checked' : ''}><span>${l}</span></label>`).join('')}
  </div>`;
}
document.addEventListener('mousemove', e => {
  const svg = e.target.closest && e.target.closest('#voy-svg');
  const tip = document.getElementById('voy-tip');
  if (!tip) return;
  const g = document.getElementById('voy-guide'), hc = document.getElementById('voy-hover');
  if (!svg || !window.__voy) { tip.hidden = true; g && g.setAttribute('visibility', 'hidden'); hc && hc.setAttribute('visibility', 'hidden'); return; }
  const v = window.__voy, r = svg.getBoundingClientRect(), k = r.width / v.W;
  const vx = (e.clientX - r.left) / k;
  const i = Math.max(0, Math.min(v.pts.length - 1, Math.round((vx - v.pl) / (v.W - v.pl - v.pr) * (v.pts.length - 1))));
  const p = v.pts[i], cx = v.x(i), cy = v.y(p.val);
  g.setAttribute('x1', cx); g.setAttribute('x2', cx); g.setAttribute('visibility', 'visible');
  hc.setAttribute('cx', cx); hc.setAttribute('cy', cy); hc.setAttribute('visibility', 'visible');
  const val = voyMetric === 'exposure' ? '$' + p.val + 'M' : p.val;
  tip.innerHTML = `<div class="voy-tip-d">${p.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div><div class="voy-tip-r"><span class="voy-tip-dot"></span><b>${voyRegion}:</b><span>${val}</span></div>`;
  tip.hidden = false;
  const px = cx * k, py = cy * k, tw = tip.offsetWidth, th = tip.offsetHeight;
  let left = px - tw / 2; left = Math.max(0, Math.min(r.width - tw, left));
  let top = py - th - 12; if (top < 0) top = py + 12;
  tip.style.left = left + 'px'; tip.style.top = top + 'px';
});
document.addEventListener('change', e => {
  const t = e.target;
  if (t.id === 'voy-year') voyYear = t.value;
  else if (t.id === 'voy-region') voyRegion = t.value;
  else if (t.name === 'voy-metric') voyMetric = t.value;
  else return;
  const c = document.getElementById('voy-chart'); if (c) c.innerHTML = VoyChart();
});
window.RegionsHistoryContent = VoyagesContent;
})();
