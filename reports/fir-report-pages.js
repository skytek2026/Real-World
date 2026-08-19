/* Fleet Intelligence Report — page composition */
(function () {
  const F = window.FIR;
  const TOTAL = 6;
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    ship:'<path d="M12 10.189V14"/><path d="M12 2v3"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"/><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    layers:'<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12.18a1 1 0 0 0 .6.91l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 .6-.92"/><path d="M2 17.18a1 1 0 0 0 .6.91l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 .6-.92"/>',
    cal:'<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    flag2:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
    chart:'<path d="M13 17V9"/><path d="M18 17V5"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-3"/>',
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    life:'<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
    shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    pin:'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    list:'<path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/>',
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
        <div class="ph-meta">${F.meta.fleet} &middot; ${F.meta.period}</div>
      </div>
      <div class="ph-meta">${F.meta.reportId}</div>
    </div>`;
  const foot = (n) => `
    <div class="page-foot">
      <span>Fleet Intelligence Report &middot; Real World</span>
      <span class="num">Page ${n} of ${TOTAL}</span>
    </div>`;
  const sec = (icon, title, body, note) => `
    <section class="sec">
      <h2 class="sec-title">${ic(icon, 16)}${title}</h2>
      ${note ? `<p class="sec-note">${note}</p>` : ''}
      ${body}
    </section>`;
  const tonePill = t => t === 'Whitelist' ? '<span class="pill pill-green">Whitelist</span>'
    : t === 'Greylist' ? '<span class="pill pill-amber">Greylist</span>'
    : t === 'Monitored' ? '<span class="pill pill-red">Monitored</span>'
    : '<span class="pill pill-slate">Mixed</span>';

  /* ── Page 1 — cover + fleet composition ── */
  function page1() {
    const c = F.composition;
    return `
    <article class="page" data-screen-label="Page 1">
      ${head('Executive summary')}
      <div style="display:flex;flex-direction:column;gap:12px">
        <span class="cover-mark">${ic(ICO.shield,15)} Real World Intelligence</span>
        <h1 class="cover-title">Fleet Intelligence<br />Report</h1>
        <p class="cover-sub">A month-end intelligence picture of the managed fleet: what it is made of, how it scores, where it trades, and which vessels sit outside fleet rules.</p>
      </div>
      <div class="cover-meta">
        <div><div class="k">Fleet</div><div class="v">${F.meta.fleet}</div></div>
        <div><div class="k">Reporting period</div><div class="v num">${F.meta.period}</div></div>
        <div><div class="k">Compared with</div><div class="v num">${F.meta.previous}</div></div>
        <div><div class="k">Generated</div><div class="v num">${F.meta.generatedOn}</div></div>
      </div>
      ${sec(ICO.ship, 'Fleet composition', `
        <div class="kpi-grid">
          <div class="kpi accent"><div class="k">Vessels in fleet</div><div class="v num">${c.vessels}</div><div class="d"><span class="delta-up">${c.vesselsDelta}</span> vs previous</div></div>
          <div class="kpi"><div class="k">Total tonnage</div><div class="v num">${c.totalGt}</div><div class="d">${c.totalDwt}</div></div>
          <div class="kpi"><div class="k">Average age</div><div class="v num">${c.avgAge}</div><div class="d"><span class="delta-down">${c.avgAgeDelta}</span> years vs previous</div></div>
          <div class="kpi"><div class="k">Insured value</div><div class="v num">${c.insuredValue}</div><div class="d">${c.flags} flags &middot; ${c.managers} managers</div></div>
        </div>`)}
      ${foot(1)}
    </article>`;
  }

  /* ── Page 2 — age profile, flags ── */
  function page2() {
    const maxAge = Math.max(...F.ages.map(a => a.count));
    return `
    <article class="page" data-screen-label="Page 2">
      ${head('Vessel type &amp; age')}
      ${sec(ICO.layers, 'Vessel type', `
        <div class="bar-list">
          ${F.types.map(t => `
            <div class="bl-row">
              <span class="bl-name">${t.type}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${t.pct}%"></span></span>
              <span class="bl-val num">${t.count} &middot; ${t.gt} GT</span>
            </div>`).join('')}
        </div>
        <table class="rt" style="margin-top:14px">
          <thead><tr><th>Vessel type</th><th class="r">Vessels</th><th class="r">Share</th><th class="r">Tonnage</th><th class="r">Avg age</th><th class="r">Avg risk score</th></tr></thead>
          <tbody>
            ${F.types.map(t => `
              <tr>
                <td class="vn">${t.type}</td>
                <td class="r num">${t.count}</td>
                <td class="r num">${(t.count / F.composition.vessels * 100).toFixed(1)}%</td>
                <td class="r num">${t.gt} GT</td>
                <td class="r num">${t.avgAge}</td>
                <td class="r">${scoreChip(t.avgScore)}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Tonnage is gross tonnage at period end. Average risk score is the unweighted mean across vessels of that type.')}
      ${sec(ICO.cal, 'Vessel age', `
        <div class="dist">
          <div>
            <div class="dist-chart">
              ${F.ages.map(a => `
                <div class="dist-col">
                  <span class="dist-val num">${a.count}</span>
                  <div class="dist-bar" style="height:${Math.round(a.count / maxAge * 150)}px;background:${a.color}"></div>
                </div>`).join('')}
            </div>
            <div class="dist-x">${F.ages.map(a => `<span>${a.band}</span>`).join('')}</div>
          </div>
          <div class="legend">
            ${F.ages.map(a => `<div class="legend-row"><span class="sw" style="background:${a.color}"></span>${a.band}<span class="lv num">${a.pct}%</span></div>`).join('')}
            <div class="legend-row" style="margin-top:5px;padding-top:8px;border-top:1px solid #f1f5f9">Fleet average age<span class="lv num">${F.composition.avgAge} yrs</span></div>
            <div class="legend-row">Over 20 years<span class="lv num">${F.ages[4].count} vessels</span></div>
          </div>
        </div>`, 'Vessels over 20 years old carry an age exception requirement under fleet rules; 14 vessels currently qualify.')}
      ${foot(2)}
    </article>`;
  }

  /* ── Page 3 — score distribution, highest scores ── */
  function page3() {
    const max = Math.max(...F.distribution.map(d => d.count));
    return `
    <article class="page" data-screen-label="Page 3">
      ${head('Flags &amp; risk score profile')}
      ${sec(ICO.flag2, 'Flags', `
        <table class="rt">
          <thead><tr><th>Flag</th><th class="r">Vessels</th><th class="r">Share</th><th>Paris MoU standing</th><th class="r">Avg risk score</th><th>Distribution</th></tr></thead>
          <tbody>
            ${F.flags.map(f => `
              <tr>
                <td class="vn">${flag(f.cc)} ${f.name}</td>
                <td class="r num">${f.count}</td>
                <td class="r num">${(f.count / F.composition.vessels * 100).toFixed(1)}%</td>
                <td>${tonePill(f.tone)}</td>
                <td class="r">${scoreChip(f.avgScore)}</td>
                <td style="min-width:120px"><span class="bl-track"><span class="bl-fill" style="width:${f.pct}%;background:${f.tone === 'Monitored' ? '#b91c1c' : f.tone === 'Greylist' ? '#d97706' : 'var(--brand-600,#2d7ffb)'}"></span></span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Nine vessels fly a monitored flag (Cameroon). Two of those changed flag within the last twelve months and appear in fleet exceptions.')}
      ${sec(ICO.chart, 'Real World Risk Score distribution', `
        <div class="dist">
          <div>
            <div class="dist-chart">
              ${F.distribution.map(d => `
                <div class="dist-col">
                  <span class="dist-val num">${d.count}</span>
                  <div class="dist-bar" style="height:${Math.round(d.count / max * 150)}px;background:${d.color}"></div>
                </div>`).join('')}
            </div>
            <div class="dist-x">${F.distribution.map(d => `<span>${d.band}<br /><span style="color:#94a3b8;font-weight:500">${d.range}</span></span>`).join('')}</div>
          </div>
          <div class="legend">
            ${F.distribution.map(d => `<div class="legend-row"><span class="sw" style="background:${d.color}"></span>${d.band} (${d.range})<span class="lv num">${d.pct}%</span></div>`).join('')}
            <div class="legend-row" style="margin-top:5px;padding-top:8px;border-top:1px solid #f1f5f9">Fleet average<span class="lv num">${F.avgScore}</span></div>
            <div class="legend-row">Move vs previous<span class="lv num delta-up">${F.avgScoreDelta}</span></div>
          </div>
        </div>`)}
      ${foot(3)}
    </article>`;
  }

  /* ── Page 4 — casualties, compliance, geographic activity ── */
  function page4() {
    const cs = F.casualties;
    const sevPill = s => `<span class="pill ${s === 'Serious' ? 'pill-red' : s === 'Moderate' ? 'pill-amber' : 'pill-slate'}">${s}</span>`;
    return `
    <article class="page" data-screen-label="Page 4">
      ${head('Highest scores &amp; casualties')}
      ${sec(ICO.alert, 'Highest Real World Risk Score vessels', `
        <table class="rt">
          <thead><tr>
            <th style="width:24px">#</th><th>Vessel</th><th>IMO</th><th>Flag</th><th>Type</th>
            <th class="r">Age</th><th class="r">Score</th><th class="r">Prev</th><th>Primary drivers</th>
          </tr></thead>
          <tbody>
            ${F.highest.map((v, i) => `
              <tr>
                <td class="num" style="color:#94a3b8">${i + 1}</td>
                <td class="vn">${v.name}</td>
                <td class="num">${v.imo}</td>
                <td>${flag(v.cc)}</td>
                <td style="white-space:nowrap">${v.type}</td>
                <td class="r num">${v.age}</td>
                <td class="r">${scoreChip(v.score)}</td>
                <td class="r num" style="color:#64748b">${v.prev}</td>
                <td style="color:#475569">${v.drivers}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Top eight of nine vessels scoring above 70. All appear in the exceptions list on page 6 unless already cleared.')}
      ${sec(ICO.life, 'Casualties', `
        <div class="kpi-grid cols-5">
          <div class="kpi"><div class="k">Casualties</div><div class="v num">${cs.summary.total}</div><div class="d"><span class="delta-up">${cs.summary.vs12m}</span> vs 12m avg</div></div>
          <div class="kpi"><div class="k">Serious</div><div class="v num">${cs.summary.serious}</div><div class="d">of ${cs.summary.total}</div></div>
          <div class="kpi"><div class="k">Open claims</div><div class="v num">${cs.summary.openClaims}</div><div class="d">at period end</div></div>
          <div class="kpi accent"><div class="k">Total reserve</div><div class="v num">${cs.summary.reserve}</div><div class="d">indicative</div></div>
          <div class="kpi"><div class="k">Vessels involved</div><div class="v num">6</div><div class="d">no repeats</div></div>
        </div>
        <table class="rt" style="margin-top:12px">
          <thead><tr><th>Date</th><th>Vessel</th><th>Event</th><th>Severity</th><th>Location</th><th>Status</th><th class="r">Reserve</th></tr></thead>
          <tbody>
            ${cs.rows.map(r => `
              <tr>
                <td class="num" style="white-space:nowrap">${r.date}</td>
                <td class="vn">${r.name}</td>
                <td>${r.type}</td>
                <td>${sevPill(r.sev)}</td>
                <td style="color:#475569">${r.loc}</td>
                <td><span class="pill ${r.status === 'Claim open' ? 'pill-amber' : r.status === 'Surveying' ? 'pill-blue' : 'pill-green'}">${r.status}</span></td>
                <td class="r num" style="font-weight:600;color:#0f172a">${r.est}</td>
              </tr>`).join('')}
          </tbody>
        </table>`)}
      ${foot(4)}
    </article>`;
  }

  /* ── Page 5 — compliance, geographic activity ── */
  function page5() {
    return `
    <article class="page" data-screen-label="Page 5">
      ${head('Compliance &amp; geographic activity')}
      ${sec(ICO.shield, 'Sanctions and compliance indicators', `
        <div class="ind-grid">
          ${F.compliance.map(i => `<div class="ind"><div class="iv num">${i.v}</div><div class="ik">${i.k}</div><div class="id">${i.d}</div></div>`).join('')}
        </div>
        <table class="rt" style="margin-top:12px">
          <thead><tr><th>Screening list</th><th class="r">Matches</th><th>Status</th><th>Note</th></tr></thead>
          <tbody>
            ${F.screening.map(s => `
              <tr>
                <td class="vn">${s.list}</td>
                <td class="r num">${s.hits}</td>
                <td><span class="pill pill-${s.tone}">${s.status}</span></td>
                <td style="color:#64748b">${s.status === 'Escalated' ? 'Referred to compliance for confirmation' : s.status === 'Monitored' ? 'Flag standing reviewed monthly' : 'No action required this period'}</td>
              </tr>`).join('')}
          </tbody>
        </table>`)}
      ${sec(ICO.globe, 'Geographic activity', `
        <div class="ind-grid cols-6">
          ${F.geographic.stats.map(s => `<div class="ind" style="padding:10px"><div class="iv num" style="font-size:18px">${s.v}</div><div class="ik" style="font-size:9px">${s.k}</div></div>`).join('')}
        </div>
        <div class="bar-list" style="margin-top:12px">
          ${F.geographic.trades.map(t => `
            <div class="bl-row">
              <span class="bl-name">${t.name}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${t.pct}%"></span></span>
              <span class="bl-val num">${t.vessels} vessels &middot; ${t.calls} calls</span>
            </div>`).join('')}
        </div>`, 'Trade lanes derived from voyage patterns in the period; a vessel may appear in more than one lane.')}
      ${foot(5)}
    </article>`;
  }

  /* ── Page 6 — regional exposure, fleet exceptions ── */
  function page6() {
    return `
    <article class="page" data-screen-label="Page 6">
      ${head('Regional exposure &amp; exceptions')}
      ${sec(ICO.pin, 'Regional exposure', `
        <div class="bar-list">
          ${F.regions.map(r => `
            <div class="bl-row">
              <span class="bl-name">${r.name}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${r.pct}%;background:${r.hra ? '#b91c1c' : 'var(--brand-600,#2d7ffb)'}"></span></span>
              <span class="bl-val num">${r.vessels} &middot; ${r.value}</span>
            </div>`).join('')}
        </div>
        `, 'Vessels counted where they entered the region at least once in the period. High-risk areas follow the current Joint War Committee list.')}
      ${sec(ICO.list, 'Fleet exceptions', `
        <div class="att">
          ${F.exceptions.map(e => `
            <div class="att-item ${e.tone === 'amber' ? 'amber' : ''}">
              <div>
                <div class="att-name">${flag(e.cc)} ${e.name} <span class="pill ${e.tone === 'red' ? 'pill-red' : 'pill-amber'}">${e.rule}</span></div>
                <div class="att-meta"><span class="num">IMO ${e.imo}</span> &middot; ${e.country}</div>
                <div class="att-why">${e.d}</div>
              </div>
              <div class="att-act">
                <span class="pill pill-slate">${e.owner}</span>
                <span style="font-size:10px;color:#94a3b8" class="num">Due ${e.due}</span>
              </div>
            </div>`).join('')}
        </div>`, 'Exceptions are vessels breaching a fleet rule at period end. Each carries an owning team and a due date; unresolved items roll forward.')}
      <p class="sec-note" style="margin-top:16px;padding-top:10px;border-top:1px solid #f1f5f9;color:#94a3b8">Real World Risk Scores are indicative and derived from vessel behaviour, compliance screening, casualty record and ownership data. They do not constitute underwriting advice. Sanctions screening reflects list data as published at ${F.meta.generatedOn}.</p>
      ${foot(6)}
    </article>`;
  }

  window.firReport = {
    Toolbar() {
      return `
      <div class="doc-toolbar no-print">
        <div style="display:flex;align-items:center;gap:14px;min-width:0">
          <a href="Reports.html" class="tb-btn" style="text-decoration:none" title="Back to Reports" aria-label="Back to Reports">${ic(ICO.back, 14)}<span class="tb-lbl">Reports</span></a>
          <div style="min-width:0">
            <div class="tb-title">Fleet Intelligence Report</div>
            <div class="tb-sub num">${F.meta.fleet} &middot; ${F.meta.period} &middot; ${TOTAL} pages (A4)</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <button class="tb-btn" id="rp-print" title="Print" aria-label="Print">${ic(ICO.print, 14)}<span class="tb-lbl">Print</span></button>
          <button class="tb-btn" id="rp-pdf" title="Download PDF" aria-label="Download PDF">${ic(ICO.dl, 14)}<span class="tb-lbl">PDF</span></button>
        </div>
      </div>`;
    },
    Pages() { return [page1(), page2(), page3(), page4(), page5(), page6()].join(''); },
  };
})();
