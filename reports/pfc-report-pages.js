/* Portfolio / Fleet Casualty Report — page composition */
(function () {
  const C = window.PFC;
  const TOTAL = 5;
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    life:'<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    layers:'<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12.18a1 1 0 0 0 .6.91l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 .6-.92"/><path d="M2 17.18a1 1 0 0 0 .6.91l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 .6-.92"/>',
    pin:'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    cal:'<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    trend:'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
    repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    ship:'<path d="M12 10.189V14"/><path d="M12 2v3"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"/><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    print:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    back:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  };
  const flag = cc => cc ? `<img class="flagimg" src="https://flagcdn.com/w40/${cc}.png" srcset="https://flagcdn.com/w80/${cc}.png 2x" alt="${cc.toUpperCase()}" width="19" height="13" />` : '';
  const scoreChip = n => `<span class="score ${n >= 80 ? 'sc-high' : n >= 50 ? 'sc-med' : 'sc-low'}">${n}</span>`;
  const sevPill = s => `<span class="pill ${s === 'Serious' ? 'pill-red' : s === 'Moderate' ? 'pill-amber' : 'pill-slate'}">${s}</span>`;
  const head = (title) => `
    <div class="page-head">
      <div>
        <div class="ph-title">${title}</div>
        <div class="ph-meta">${C.meta.scope} &middot; ${C.meta.period}</div>
      </div>
      <div class="ph-meta">${C.meta.reportId}</div>
    </div>`;
  const foot = (n) => `
    <div class="page-foot">
      <span>Portfolio / Fleet Casualty Report &middot; Real World</span>
      <span class="num">Page ${n} of ${TOTAL}</span>
    </div>`;
  const sec = (icon, title, body, note) => `
    <section class="sec">
      <h2 class="sec-title">${ic(icon, 16)}${title}</h2>
      ${note ? `<p class="sec-note">${note}</p>` : ''}
      ${body}
    </section>`;

  /* ── Page 1 — cover, totals, new casualties ── */
  function page1() {
    const s = C.summary;
    return `
    <article class="page" data-screen-label="Page 1">
      ${head('Casualty summary')}
      <div style="display:flex;flex-direction:column;gap:12px">
        <span class="cover-mark">${ic(ICO.shield,15)} Real World Intelligence</span>
        <h1 class="cover-title">Portfolio / Fleet<br />Casualty Report</h1>
        <p class="cover-sub">Casualty record for the book over a rolling 24-month window: what happened, to which vessels, where and when, how it is trending, and which vessels keep coming back.</p>
      </div>
      <div class="cover-meta">
        <div><div class="k">Scope</div><div class="v">${C.meta.scope}</div></div>
        <div><div class="k">Reporting period</div><div class="v num">${C.meta.period}</div></div>
        <div><div class="k">Casualty window</div><div class="v num">${C.meta.window}</div></div>
        <div><div class="k">Generated</div><div class="v num">${C.meta.generatedOn}</div></div>
      </div>
      ${sec(ICO.life, 'Total casualties, new casualties and vessels affected', `
        <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr)">
          <div class="kpi accent"><div class="k">Total casualties (24m)</div><div class="v num">${s.total}</div><div class="d"><span class="delta-up">${s.totalDelta}</span> vs previous</div></div>
          <div class="kpi"><div class="k">New this period</div><div class="v num">${s.newThisPeriod}</div><div class="d"><span class="delta-up">${s.newDelta}</span> vs previous</div></div>
          <div class="kpi"><div class="k">Vessels affected</div><div class="v num">${s.vesselsAffected}</div><div class="d">${s.repeatVessels} with repeat events</div></div>
        </div>
        <div class="kpi-grid" style="margin-top:10px;grid-template-columns:repeat(3,1fr)">
          <div class="kpi"><div class="k">Total reserve (24m)</div><div class="v num">${s.totalReserve}</div><div class="d">indicative</div></div>
          <div class="kpi"><div class="k">Reserve this period</div><div class="v num">${s.periodReserve}</div><div class="d">6 events</div></div>
          <div class="kpi"><div class="k">Average per event</div><div class="v num">${s.avgReserve}</div><div class="d"><span class="delta-up">+18%</span> over 6 months</div></div>
        </div>`)}
      ${sec(ICO.alert, 'New casualties this period', `
        <table class="rt">
          <thead><tr><th>Date</th><th>Vessel</th><th>Flag</th><th class="r">Age</th><th>Event</th><th>Severity</th><th class="r">Reserve</th></tr></thead>
          <tbody>
            ${C.newCasualties.map(r => `
              <tr>
                <td class="num" style="white-space:nowrap">${r.date}</td>
                <td class="vn">${r.name}</td>
                <td>${flag(r.cc)}</td>
                <td class="r num">${r.age}</td>
                <td>${r.type}</td>
                <td>${sevPill(r.sev)}</td>
                <td class="r num" style="font-weight:600;color:#0f172a">${r.est}</td>
              </tr>`).join('')}
          </tbody>
        </table>`)}
      ${foot(1)}
    </article>`;
  }

  /* ── Page 2 — casualty type, date/location ── */
  function page2() {
    return `
    <article class="page" data-screen-label="Page 2">
      ${head('Casualty type, date &amp; location')}
      ${sec(ICO.layers, 'Casualty type', `
        <div class="bar-list">
          ${C.types.map(t => `
            <div class="bl-row">
              <span class="bl-name">${t.type}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${t.pct}%;background:${t.serious >= 4 ? '#b91c1c' : t.serious >= 2 ? '#d97706' : 'var(--brand-600,#2d7ffb)'}"></span></span>
              <span class="bl-val num">${t.count} &middot; ${t.reserve}</span>
            </div>`).join('')}
        </div>
        <table class="rt" style="margin-top:14px">
          <thead><tr><th>Casualty type</th><th class="r">Events</th><th class="r">Share</th><th class="r">Serious</th><th class="r">Reserve</th><th class="r">Avg vessel age</th></tr></thead>
          <tbody>
            ${C.types.map(t => `
              <tr>
                <td class="vn">${t.type}</td>
                <td class="r num">${t.count}</td>
                <td class="r num">${(t.count / C.summary.total * 100).toFixed(1)}%</td>
                <td class="r num">${t.serious}</td>
                <td class="r num" style="font-weight:600;color:#0f172a">${t.reserve}</td>
                <td class="r num">${t.avgAge}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Machinery damage leads on frequency; collision and grounding lead on severity and reserve.')}
      ${foot(2)}
    </article>`;
  }

  /* ── Page 3 — vessel age, trends ── */
  function page3() {
    const maxAge = Math.max(...C.ages.map(a => a.count));
    return `
    <article class="page" data-screen-label="Page 3">
      ${head('Vessel age &amp; casualty trends')}
      ${sec(ICO.cal, 'Vessel age at time of casualty', `
        <div class="dist">
          <div>
            <div class="dist-chart">
              ${C.ages.map(a => `
                <div class="dist-col">
                  <span class="dist-val num">${a.count}</span>
                  <div class="dist-bar" style="height:${Math.round(a.count / maxAge * 150)}px;background:${a.color}"></div>
                </div>`).join('')}
            </div>
            <div class="dist-x">${C.ages.map(a => `<span>${a.band}</span>`).join('')}</div>
          </div>
          <div class="legend">
            ${C.ages.map(a => `<div class="legend-row"><span class="sw" style="background:${a.color}"></span>${a.band}<span class="lv num">${a.pct}%</span></div>`).join('')}
            <div class="legend-row" style="margin-top:5px;padding-top:8px;border-top:1px solid #f1f5f9">Over 15 years<span class="lv num">56.3%</span></div>
            <div class="legend-row">Reserve, 16+ yrs<span class="lv num">$59.9m</span></div>
          </div>
        </div>
        <table class="rt" style="margin-top:12px">
          <thead><tr><th>Age band</th><th class="r">Events</th><th class="r">Share</th><th class="r">Reserve</th><th>Dominant type</th></tr></thead>
          <tbody>
            ${C.ages.map((a, i) => `
              <tr>
                <td class="vn">${a.band}</td>
                <td class="r num">${a.count}</td>
                <td class="r num">${a.pct}%</td>
                <td class="r num" style="font-weight:600;color:#0f172a">${a.reserve}</td>
                <td style="color:#64748b">${['Cargo damage','Collision / contact','Collision / contact','Machinery damage','Grounding'][i]}</td>
              </tr>`).join('')}
          </tbody>
        </table>`)}
      ${sec(ICO.trend, 'Casualty trends — 12 months', `
        <div class="chart-wrap">
          <div class="chart-legend"><span class="cl-item"><span class="cl-sw"></span>Monthly casualties</span><span class="cl-item"><span class="cl-line dash"></span>12-month mean 4.1</span></div>
          <svg viewBox="0 0 700 180" class="linechart" role="img" aria-label="Casualty count by month over twelve months, bar chart">
            ${[0, 2, 4, 6, 8].map(g => {
              const y = 160 - g / 8 * 140;
              return `<line x1="42" y1="${y}" x2="666" y2="${y}" stroke="${g === 0 ? '#cbd5e1' : '#f1f5f9'}" stroke-width="1" /><text x="34" y="${y + 3.5}" text-anchor="end" class="ax-lbl">${g}</text>`;
            }).join('')}
            <line x1="42" y1="20" x2="42" y2="160" stroke="#cbd5e1" stroke-width="1" />
            <line x1="42" y1="${(160 - 4.1 / 8 * 140).toFixed(1)}" x2="666" y2="${(160 - 4.1 / 8 * 140).toFixed(1)}" stroke="#d97706" stroke-width="1.5" stroke-dasharray="6 5" />
            ${C.trend.map((x, i) => {
              const slot = 624 / C.trend.length, bw = Math.min(slot - 8, 30);
              const cx = 42 + slot * i + slot / 2, bh = x.v / 8 * 140;
              return `<rect x="${(cx - bw / 2).toFixed(1)}" y="${(160 - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="var(--brand-600,#2d7ffb)" /><text x="${cx.toFixed(1)}" y="${(160 - bh - 5).toFixed(1)}" text-anchor="middle" class="pt-lbl">${x.v}</text>`;
            }).join('')}
            ${C.trend.map((x, i) => { const slot = 624 / C.trend.length; return `<text x="${(42 + slot * i + slot / 2).toFixed(1)}" y="176" text-anchor="middle" class="ax-lbl">${x.m}</text>`; }).join('')}
            <text x="10" y="90" text-anchor="middle" class="ax-title" transform="rotate(-90 10 90)">Casualties</text>
          </svg>
        </div>
        `, 'Monthly event counts across the book. Twelve-month mean is 4.1 events per month.')}
      ${foot(3)}
    </article>`;
  }

  /* ── Page 4 — repeated involvement ── */
  function page4() {
    return `
    <article class="page" data-screen-label="Page 4">
      ${head('Repeated casualty involvement')}
      ${sec(ICO.repeat, 'Vessels with repeated casualty involvement', `
        <div class="kpi-grid">
          <div class="kpi accent"><div class="k">Repeat vessels</div><div class="v num">${C.summary.repeatVessels}</div><div class="d">2 or more events in 24m</div></div>
          <div class="kpi"><div class="k">Events from repeats</div><div class="v num">22</div><div class="d">34.4% of all events</div></div>
          <div class="kpi"><div class="k">Reserve from repeats</div><div class="v num">$38.7m</div><div class="d">40.1% of reserve</div></div>
          <div class="kpi"><div class="k">Average age</div><div class="v num">16.4</div><div class="d">years, repeat vessels</div></div>
        </div>
        <table class="rt" style="margin-top:12px">
          <thead><tr><th>Vessel</th><th>IMO</th><th>Flag</th><th class="r">Age</th><th class="r">Events</th><th>Event types</th><th>Last event</th><th class="r">Reserve</th><th class="r">Score</th></tr></thead>
          <tbody>
            ${C.repeats.map(r => `
              <tr>
                <td class="vn">${r.name}</td>
                <td class="num">${r.imo}</td>
                <td>${flag(r.cc)}</td>
                <td class="r num">${r.age}</td>
                <td class="r num" style="font-weight:700;color:#0f172a">${r.events}</td>
                <td style="color:#475569">${r.types}</td>
                <td class="num" style="white-space:nowrap">${r.last}</td>
                <td class="r num" style="font-weight:600;color:#0f172a">${r.reserve}</td>
                <td class="r">${scoreChip(r.score)}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Top five of nine repeat vessels by event count. Repeat involvement is a scoring factor and feeds the casualty component of the Real World Risk Score.')}
      ${foot(4)}
    </article>`;
  }

  /* ── Page 5 — underlying vessel details ── */
  function page5() {
    const d = C.detail;
    const half = Math.ceil(d.particulars.length / 2);
    const col = rows => `
      <div class="spec">
        ${rows.map(([k, v]) => `<div class="spec-row"><span class="spec-k">${k}</span><span class="spec-v">${v}</span></div>`).join('')}
      </div>`;
    return `
    <article class="page" data-screen-label="Page 5">
      ${head('Underlying vessel details')}
      ${sec(ICO.ship, `Underlying vessel details — ${d.name}`, `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px">
          ${flag('gr')}
          <span class="font-display" style="font-size:17px;font-weight:800;color:var(--brand-600,#2d7ffb);letter-spacing:.02em">${d.name}</span>
          <span class="pill pill-slate num">IMO ${d.imo}</span>
          <span class="pill pill-slate num">MMSI ${d.mmsi}</span>
          <span class="pill pill-red">4 events in 24 months</span>
        </div>
        <div class="spec-grid">
          ${col(d.particulars.slice(0, half))}
          ${col(d.particulars.slice(half))}
        </div>`, 'Particulars as recorded at period end. Shown for the highest repeat-involvement vessel in the book.')}
      ${sec(ICO.life, 'Casualty record for this vessel', `
        <table class="rt">
          <thead><tr><th>Date</th><th>Event</th><th>Severity</th><th>Location</th><th class="r">Reserve</th></tr></thead>
          <tbody>
            ${d.events.map(e => `
              <tr>
                <td class="num" style="white-space:nowrap">${e.date}</td>
                <td class="vn">${e.type}</td>
                <td>${sevPill(e.sev)}</td>
                <td style="color:#475569">${e.loc}</td>
                <td class="r num" style="font-weight:600;color:#0f172a">${e.est}</td>
              </tr>
              <tr><td></td><td colspan="4" style="padding-top:0;color:#64748b;font-size:10.5px;border-bottom:1px solid #f1f5f9">${e.note}</td></tr>`).join('')}
          </tbody>
        </table>`)}
      <p class="sec-note" style="margin-top:16px;padding-top:10px;border-top:1px solid #f1f5f9;color:#94a3b8">Reserves are indicative and subject to survey and adjustment. Real World Risk Scores are derived from vessel behaviour, compliance screening, casualty record and ownership data, and do not constitute underwriting advice.</p>
      ${foot(5)}
    </article>`;
  }

  window.pfcReport = {
    Toolbar() {
      return `
      <div class="doc-toolbar no-print">
        <div style="display:flex;align-items:center;gap:14px;min-width:0">
          <a href="Reports.html" class="tb-btn" style="text-decoration:none" title="Back to Reports" aria-label="Back to Reports">${ic(ICO.back, 14)}<span class="tb-lbl">Reports</span></a>
          <div style="min-width:0">
            <div class="tb-title">Portfolio / Fleet Casualty Report</div>
            <div class="tb-sub num">${C.meta.scope} &middot; ${C.meta.period} &middot; ${TOTAL} pages (A4)</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <button class="tb-btn" id="rp-print" title="Print" aria-label="Print">${ic(ICO.print, 14)}<span class="tb-lbl">Print</span></button>
          <button class="tb-btn" id="rp-pdf" title="Download PDF" aria-label="Download PDF">${ic(ICO.dl, 14)}<span class="tb-lbl">PDF</span></button>
        </div>
      </div>`;
    },
    Pages() { return [page1(), page2(), page3(), page4(), page5()].join(''); },
  };
})();
