/* Regional Exposure & Aggregation Report — page composition */
(function () {
  const R = window.REA;
  const TOTAL = 5;
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    pin:'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    ship:'<path d="M12 10.189V14"/><path d="M12 2v3"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"/><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    swap:'<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/>',
    peak:'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
    pie:'<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>',
    chart:'<path d="M13 17V9"/><path d="M18 17V5"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-3"/>',
    list:'<path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/>',
    coins:'<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    print:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    back:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  };
  const flag = cc => cc ? `<img class="flagimg" src="https://flagcdn.com/w40/${cc}.png" srcset="https://flagcdn.com/w80/${cc}.png 2x" alt="${cc.toUpperCase()}" width="19" height="13" />` : '';
  const scoreChip = n => `<span class="score ${n >= 80 ? 'sc-high' : n >= 50 ? 'sc-med' : 'sc-low'}">${n}</span>`;
  const head = (title) => `
    <div class="page-head">
      <div>
        <div class="ph-title">${title}</div>
        <div class="ph-meta">${R.meta.region} &middot; ${R.meta.period}</div>
      </div>
      <div class="ph-meta">${R.meta.reportId}</div>
    </div>`;
  const foot = (n) => `
    <div class="page-foot">
      <span>Regional Exposure &amp; Aggregation Report &middot; Real World</span>
      <span>Confidential &mdash; prepared for ${R.meta.preparedFor}</span>
      <span class="num">Page ${n} of ${TOTAL}</span>
    </div>`;
  const sec = (icon, title, body, note) => `
    <section class="sec">
      <h2 class="sec-title">${ic(icon, 16)}${title}</h2>
      ${note ? `<p class="sec-note">${note}</p>` : ''}
      ${body}
    </section>`;

  /* ── Page 1 — cover, vessels currently in region, entering/leaving ── */
  function page1() {
    const c = R.current, f = R.flow;
    const maxW = Math.max(...f.byWeek.map(w => Math.max(w.in, w.out)));
    return `
    <article class="page" data-screen-label="Page 1">
      ${head('Current position &amp; flow')}
      <div style="display:flex;flex-direction:column;gap:12px">
        <span class="cover-mark">${ic(ICO.shield,15)} Real World Intelligence</span>
        <h1 class="cover-title">Regional Exposure &amp;<br />Aggregation Report</h1>
        <div style="display:flex;align-items:center;gap:9px;flex-wrap:wrap">
          <span class="font-display" style="font-size:17px;font-weight:800;color:var(--brand-600,#2d7ffb)">${R.meta.region}</span>
          <span class="pill pill-red">${R.meta.regionType}</span>
          <span class="pill pill-slate num">${R.meta.bounds}</span>
        </div>
        <p class="cover-sub">Who is inside the region right now, who moved through it, when concentration peaked, how much of the portfolio it represents, and the vessel-by-vessel detail behind the aggregate.</p>
      </div>
      <div class="cover-meta">
        <div><div class="k">Portfolio</div><div class="v">${R.meta.portfolio}</div></div>
        <div><div class="k">Reporting period</div><div class="v num">${R.meta.period}</div></div>
        <div><div class="k">Compared with</div><div class="v num">${R.meta.previous}</div></div>
        <div><div class="k">Generated</div><div class="v num">${R.meta.generatedOn}</div></div>
        <div><div class="k">Prepared for</div><div class="v">${R.meta.preparedFor}</div></div>
        <div><div class="k">Report owner</div><div class="v">${R.meta.owner}</div></div>
      </div>
      ${sec(ICO.ship, 'Vessels currently in the selected region', `
        <div class="kpi-grid">
          <div class="kpi accent"><div class="k">Vessels inside now</div><div class="v num">${c.vessels}</div><div class="d"><span class="delta-up">${c.vesselsDelta}</span> vs previous</div></div>
          <div class="kpi"><div class="k">Insured value inside</div><div class="v num">${c.insuredValue}</div><div class="d"><span class="delta-up">${c.insuredValueDelta}</span> vs previous</div></div>
          <div class="kpi"><div class="k">Average risk score</div><div class="v num">${c.avgRisk}</div><div class="d">vs 41.6 portfolio-wide</div></div>
          <div class="kpi"><div class="k">Average dwell</div><div class="v num">${c.avgDwell}</div><div class="d">time inside the region</div></div>
        </div>`)}
      ${sec(ICO.swap, 'Vessels entering and leaving', `
        <div class="kpi-grid">
          <div class="kpi"><div class="k">Entered in period</div><div class="v num">${f.entered}</div><div class="d">crossings inbound</div></div>
          <div class="kpi"><div class="k">Left in period</div><div class="v num">${f.left}</div><div class="d">crossings outbound</div></div>
          <div class="kpi accent"><div class="k">Net change</div><div class="v num">${f.net}</div><div class="d">vessels inside</div></div>
          <div class="kpi"><div class="k">Full transits</div><div class="v num">${f.transits}</div><div class="d">avg ${f.avgTransit}</div></div>
        </div>
        <table class="rt" style="margin-top:12px">
          <thead><tr><th>Week</th><th class="r">Entered</th><th class="r">Left</th><th class="r">Inside at week end</th><th>Flow</th></tr></thead>
          <tbody>
            ${f.byWeek.map(w => `
              <tr>
                <td class="vn">${w.w}</td>
                <td class="r num">${w.in}</td>
                <td class="r num">${w.out}</td>
                <td class="r num" style="font-weight:700;color:#0f172a">${w.end}</td>
                <td style="min-width:130px">
                  <span class="bl-track"><span class="bl-fill" style="width:${Math.round(w.in / maxW * 100)}%"></span></span>
                  <span class="bl-track" style="margin-top:3px"><span class="bl-fill" style="width:${Math.round(w.out / maxW * 100)}%;background:#94a3b8"></span></span>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Blue bar is vessels entering, grey is vessels leaving. A vessel crossing the boundary twice is counted twice.')}
      ${foot(1)}
    </article>`;
  }

  /* ── Page 2 — recent crossings, peak concentration ── */
  function page2() {
    const p = R.peak, f = R.flow;
    const max = Math.max(...p.daily.map(d => d.v));
    const h = 160, w = 660;
    return `
    <article class="page" data-screen-label="Page 2">
      ${head('Crossings &amp; peak concentration')}
      ${sec(ICO.swap, 'Most recent boundary crossings', `
        <table class="rt">
          <thead><tr><th>Direction</th><th>Date / time</th><th>Vessel</th><th>IMO</th><th>Flag</th><th>Adjacent region</th><th class="r">Insured value</th></tr></thead>
          <tbody>
            ${f.recent.map(x => `
              <tr>
                <td>${x.dir === 'in' ? '<span class="pill pill-red">Entered</span>' : '<span class="pill pill-green">Left</span>'}</td>
                <td class="num" style="white-space:nowrap">${x.date}</td>
                <td class="vn">${x.name}</td>
                <td class="num">${x.imo}</td>
                <td>${flag(x.cc)}</td>
                <td style="color:#475569">${x.from}</td>
                <td class="r num" style="font-weight:600;color:#0f172a">${x.value}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, `Six most recent of ${f.entered + f.left} crossings in the period.`)}
      ${sec(ICO.peak, 'Peak vessel concentration', `
        <div class="kpi-grid">
          <div class="kpi accent"><div class="k">Peak vessels</div><div class="v num">${p.vessels}</div><div class="d num">${p.at}</div></div>
          <div class="kpi"><div class="k">Value at peak</div><div class="v num">${p.value}</div><div class="d"><span class="delta-up">${p.vsAverage}</span> vs period average</div></div>
          <div class="kpi"><div class="k">Aggregation threshold</div><div class="v num">${p.threshold}</div><div class="d">vessels, fleet rule</div></div>
          <div class="kpi"><div class="k">Threshold breaches</div><div class="v num">${p.breaches}</div><div class="d">days above limit</div></div>
        </div>
        <div class="spark-wrap" style="margin-top:12px">
          <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" class="spark" style="height:160px">
            <line x1="0" y1="${(h - p.threshold / max * h).toFixed(1)}" x2="${w}" y2="${(h - p.threshold / max * h).toFixed(1)}" stroke="#b91c1c" stroke-width="1.5" stroke-dasharray="6 5" />
            ${p.daily.map((d, i) => {
              const bw = w / p.daily.length, x = i * bw, bh = d.v / max * h;
              return `<rect x="${(x + 3).toFixed(1)}" y="${(h - bh).toFixed(1)}" width="${(bw - 6).toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="${d.v > p.threshold ? '#b91c1c' : 'var(--brand-600,#2d7ffb)'}" />`;
            }).join('')}
          </svg>
          <div class="spark-x">${p.daily.map(d => `<span class="num">${d.d}</span>`).join('')}</div>
        </div>
        <table class="rt" style="margin-top:12px">
          <thead><tr><th>Accumulation window</th><th class="r">Peak vessels</th><th class="r">Value at peak</th><th>Driver</th></tr></thead>
          <tbody>
            ${p.windows.map(x => `
              <tr>
                <td class="num" style="white-space:nowrap">${x.start} → ${x.end}</td>
                <td class="r num" style="font-weight:700;color:${x.peak > p.threshold ? '#b91c1c' : '#0f172a'}">${x.peak}</td>
                <td class="r num" style="font-weight:600;color:#0f172a">${x.value}</td>
                <td style="color:#64748b">${x.note}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Daily simultaneous vessel count at 14:00 UTC. Dashed line is the 40-vessel aggregation threshold; red bars exceed it.')}
      ${foot(2)}
    </article>`;
  }

  /* ── Page 3 — share of portfolio, exposure over time ── */
  function page3() {
    const s = R.share, hs = R.history;
    const h = 150, w = 660;
    const maxV = Math.max(...hs.map(x => x.value));
    const pts = hs.map((x, i) => `${((i / (hs.length - 1)) * w).toFixed(1)},${(h - x.value / maxV * h).toFixed(1)}`);
    const toneBg = { red:'#fef2f2', amber:'#fffbeb', green:'#f0fdf4' };
    const toneFg = { red:'#b91c1c', amber:'#b45309', green:'#15803d' };
    return `
    <article class="page" data-screen-label="Page 3">
      ${head('Share of portfolio &amp; exposure over time')}
      ${sec(ICO.pie, 'Percentage of portfolio exposed', `
        <div class="kpi-grid">
          <div class="kpi"><div class="k">Portfolio vessels</div><div class="v num">${s.portfolioVessels.toLocaleString()}</div><div class="d">total under cover</div></div>
          <div class="kpi accent"><div class="k">Exposed by count</div><div class="v num">${R.current.portfolioSharePct}%</div><div class="d">${s.regionVessels} of ${s.portfolioVessels.toLocaleString()} vessels</div></div>
          <div class="kpi"><div class="k">Portfolio value</div><div class="v num">${s.portfolioValue}</div><div class="d">total insured value</div></div>
          <div class="kpi accent"><div class="k">Exposed by value</div><div class="v num">${R.current.valueSharePct}%</div><div class="d">${s.regionValue} inside region</div></div>
        </div>
        <table class="rt" style="margin-top:12px">
          <thead><tr><th>Vessel type</th><th class="r">Vessels inside</th><th class="r">Insured value</th><th class="r">Share of region value</th><th>Mix</th></tr></thead>
          <tbody>
            ${s.byType.map(t => `
              <tr>
                <td class="vn">${t.type}</td>
                <td class="r num">${t.vessels}</td>
                <td class="r num" style="font-weight:600;color:#0f172a">${t.value}</td>
                <td class="r num">${(parseFloat(t.value.replace(/[^0-9.]/g, '')) / 1.42 * 100).toFixed(1)}%</td>
                <td style="min-width:120px"><span class="bl-track"><span class="bl-fill" style="width:${t.pct}%"></span></span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Value share is disproportionate to count: tankers are 60% of the vessels inside but 67% of the exposed value.')}
      ${sec(ICO.chart, 'Exposure changes over time — 12 months', `
        <div class="spark-wrap">
          <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" class="spark">
            ${[0.4, 0.8, 1.2].map(g => `<line x1="0" y1="${(h - g / maxV * h).toFixed(1)}" x2="${w}" y2="${(h - g / maxV * h).toFixed(1)}" stroke="#f1f5f9" stroke-width="1" />`).join('')}
            <polyline points="${pts.join(' ')}" fill="none" stroke="var(--brand-600,#2d7ffb)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
            ${hs.map((x, i) => `<circle cx="${((i / (hs.length - 1)) * w).toFixed(1)}" cy="${(h - x.value / maxV * h).toFixed(1)}" r="3" fill="#fff" stroke="var(--brand-600,#2d7ffb)" stroke-width="2" />`).join('')}
          </svg>
          <div class="spark-x">${hs.map(x => `<span class="num">${x.m}</span>`).join('')}</div>
        </div>
        <div class="chg" style="margin-top:12px">
          ${R.historyNotes.map(n => `
            <div class="chg-row">
              <span class="chg-ico" style="background:${toneBg[n.tone]};color:${toneFg[n.tone]}">${ic(n.tone === 'green' ? ICO.peak : ICO.alert, 12)}</span>
              <div><div class="chg-t">${n.t}</div><div class="chg-d">${n.d}</div></div>
              <div class="chg-m" style="color:${toneFg[n.tone]};font-weight:700">${n.m}</div>
            </div>`).join('')}
        </div>`, 'Line shows month-end exposed insured value in $bn. Counts are vessels inside the region at month end.')}
      ${foot(3)}
    </article>`;
  }

  /* ── Page 4 — underlying vessel list ── */
  function page4() {
    return `
    <article class="page" data-screen-label="Page 4">
      ${head('Underlying vessel list')}
      ${sec(ICO.list, 'Underlying vessel list', `
        <table class="rt compact">
          <thead><tr>
            <th style="width:20px">#</th><th style="width:118px">Vessel</th><th style="width:56px">IMO</th><th style="width:28px">Flag</th><th style="width:96px">Type</th>
            <th class="r" style="width:30px">Age</th><th class="r" style="width:40px">Score</th><th style="width:88px">Entered</th><th class="r" style="width:44px">Dwell</th><th class="r" style="width:66px">Value</th>
          </tr></thead>
          <tbody>
            ${R.vessels.map((v, i) => `
              <tr>
                <td class="num" style="color:#94a3b8">${i + 1}</td>
                <td class="vn">${v.name}</td>
                <td class="num">${v.imo}</td>
                <td>${flag(v.cc)}</td>
                <td style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${v.type}</td>
                <td class="r num">${v.age}</td>
                <td class="r">${scoreChip(v.score)}</td>
                <td class="num" style="white-space:nowrap">${v.entered.slice(0,10)}<br /><span style="color:#94a3b8">${v.entered.slice(11)}</span></td>
                <td class="r num">${v.dwell}</td>
                <td class="r num" style="font-weight:600;color:${v.src === 'client' ? '#0f172a' : '#94a3b8'}">${v.value}${v.src === 'estimate' ? '<span style="font-weight:500"> est.</span>' : ''}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, `Twelve of ${R.current.vessels} vessels inside the region, ordered by declared value. Full list is available in the regional exposure view.`)}
      ${sec(ICO.alert, 'List notes', `
        <div class="ind-grid">
          <div class="ind"><div class="iv num">4</div><div class="ik">Vessels scoring above 80</div><div class="id">ATLAS TRIDENT, MERIDIAN PEARL, SEA VANGUARD, NORDWIND AURORA — all tankers or bulkers.</div></div>
          <div class="ind"><div class="iv num">2</div><div class="ik">Without declared values</div><div class="id">Shown as estimates and excluded from declared aggregates.</div></div>
          <div class="ind"><div class="iv num">5.1</div><div class="ik">Longest dwell (days)</div><div class="id">MERIDIAN PEARL, still inside at period end.</div></div>
        </div>`)}
      ${foot(4)}
    </article>`;
  }

  /* ── Page 5 — insured values where client data available ── */
  function page5() {
    const v = R.values;
    return `
    <article class="page" data-screen-label="Page 5">
      ${head('Insured values &amp; data coverage')}
      ${sec(ICO.coins, 'Insured values where client data is available', `
        <div class="kpi-grid">
          <div class="kpi accent"><div class="k">Declared aggregate</div><div class="v num">${v.declared}</div><div class="d">${v.withData} vessels with client data</div></div>
          <div class="kpi"><div class="k">Estimated addition</div><div class="v num">${v.estimated}</div><div class="d">${v.withoutData} vessels, modelled</div></div>
          <div class="kpi"><div class="k">Data coverage</div><div class="v num">${v.coveragePct}%</div><div class="d">of vessels inside region</div></div>
          <div class="kpi"><div class="k">Combined view</div><div class="v num">$1.61bn</div><div class="d">declared + estimated</div></div>
        </div>
        <div class="bar-list" style="margin-top:12px">
          ${v.tiers.map(t => `
            <div class="bl-row">
              <span class="bl-name">${t.tier}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${t.pct}%;background:${t.tier === 'No declared value' ? '#94a3b8' : 'var(--brand-600,#2d7ffb)'}"></span></span>
              <span class="bl-val num">${t.vessels} &middot; ${t.value}</span>
            </div>`).join('')}
        </div>
        <table class="rt" style="margin-top:14px">
          <thead><tr><th>Value tier</th><th class="r">Vessels</th><th class="r">Aggregate</th><th>Source</th></tr></thead>
          <tbody>
            ${v.tiers.map(t => `
              <tr>
                <td class="vn">${t.tier}</td>
                <td class="r num">${t.vessels}</td>
                <td class="r num" style="font-weight:600;color:#0f172a">${t.value}</td>
                <td>${t.tier === 'No declared value' ? '<span class="pill pill-slate">Modelled estimate</span>' : '<span class="pill pill-green">Client declared</span>'}</td>
              </tr>`).join('')}
          </tbody>
        </table>`)}
      ${sec(ICO.shield, 'Method and caveats', `
        <div class="status-banner">
          <div><div class="sb-k">Data basis</div><div class="sb-t">${v.coveragePct}% declared coverage</div></div>
          <p class="sb-d">${v.method}</p>
        </div>
        <div class="ind-grid" style="margin-top:10px">
          <div class="ind"><div class="iv num">${v.withoutData}</div><div class="ik">Values outstanding</div><div class="id">Requested from the broker on 04 Aug 2026.</div></div>
          <div class="ind"><div class="iv num">3</div><div class="ik">Values older than 12 months</div><div class="id">Flagged for refresh at renewal.</div></div>
          <div class="ind"><div class="iv num">1</div><div class="ik">Values under endorsement</div><div class="id">KAPPA VOYAGER — increase pending.</div></div>
        </div>`)}
      <p class="sec-note" style="margin-top:16px;padding-top:10px;border-top:1px solid #f1f5f9;color:#94a3b8">Aggregation figures are indicative and depend on the completeness of declared values. Region boundaries follow the Real World definition for ${R.meta.region} (${R.meta.bounds}) as at ${R.meta.generatedOn}.</p>
      ${foot(5)}
    </article>`;
  }

  window.reaReport = {
    Toolbar() {
      return `
      <div class="doc-toolbar no-print">
        <div style="display:flex;align-items:center;gap:14px;min-width:0">
          <a href="Reports.html" class="tb-btn" style="text-decoration:none">${ic(ICO.back, 14)} Reports</a>
          <div style="min-width:0">
            <div class="tb-title">Regional Exposure &amp; Aggregation Report</div>
            <div class="tb-sub num">${R.meta.region} &middot; ${R.meta.period} &middot; ${TOTAL} pages (A4)</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <button class="tb-btn" id="rp-print">${ic(ICO.print, 14)} Print</button>
          <button class="tb-btn" id="rp-pdf">${ic(ICO.dl, 14)} PDF</button>
        </div>
      </div>`;
    },
    Pages() { return [page1(), page2(), page3(), page4(), page5()].join(''); },
  };
})();
