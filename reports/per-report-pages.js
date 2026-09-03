/* Portfolio Executive Risk Report — page composition */
(function () {
  const P = window.PER;
  const RF = window.reportFront;
  const TOTAL = 9;
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    ship:'<path d="M12 10.189V14"/><path d="M12 2v3"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"/><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    chart:'<path d="M13 17V9"/><path d="M18 17V5"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-3"/>',
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    life:'<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
    globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    swords:'<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/>',
    trend:'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
    flag2:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
    print:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    back:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  };
  const flag = cc => `<img class="flagimg" src="https://flagcdn.com/w40/${cc}.png" srcset="https://flagcdn.com/w80/${cc}.png 2x" alt="${cc.toUpperCase()}" width="19" height="13" />`;
  const scoreChip = n => `<span class="score ${n > 50 ? 'sc-high' : n > 25 ? 'sc-med' : 'sc-low'}">${n}</span>`;
  const head = (title) => `
    <div class="page-head">
      <div>
        <div class="ph-title">${title}</div>
        <div class="ph-meta">${P.meta.portfolio} &middot; ${P.meta.period}</div>
      </div>
      <div class="ph-meta">${P.meta.reportId}</div>
    </div>`;
  const foot = (n) => `
    <div class="page-foot">
      <span>Portfolio Executive Risk Report &middot; Real World</span>
      <span class="num">Page ${n} of ${TOTAL}</span>
    </div>`;
  const sec = (icon, title, body, note) => `
    <section class="sec">
      <h2 class="sec-title">${ic(icon, 16)}${title}</h2>
      ${note ? `<p class="sec-note">${note}</p>` : ''}
      ${body}
    </section>`;

  /* ── Page 1 — cover, asset counts, score distribution ── */
  function page1() {
    const k = P.kpi;
    const max = Math.max(...P.distribution.map(d => d.count));
    return `
    <article class="page" data-screen-label="Page 4">
      ${head('Portfolio composition &amp; risk distribution')}
      ${sec(ICO.ship, 'Vessels &amp; assets under management', `
        <div class="kpi-grid">
          <div class="kpi accent"><div class="k">Vessels</div><div class="v num">${k.vessels.toLocaleString()}</div><div class="d"><span class="delta-up">${k.vesselsDelta}</span> vs previous</div></div>
          <div class="kpi"><div class="k">Other assets</div><div class="v num">${k.otherAssets}</div><div class="d">Rigs, terminals, FPSOs</div></div>
          <div class="kpi"><div class="k">Total insured value</div><div class="v num">${k.insuredValue}</div><div class="d"><span class="delta-up">${k.insuredValueDelta}</span> vs previous</div></div>
          <div class="kpi"><div class="k">Average risk score</div><div class="v num">${k.avgRisk}</div><div class="d"><span class="delta-up">${k.avgRiskDelta}</span> vs previous</div></div>
        </div>`)}
      ${sec(ICO.chart, 'Real World Risk Score distribution', `
        <div class="dist">
          <div>
            <div class="dist-chart">
              ${P.distribution.map(d => `
                <div class="dist-col">
                  <span class="dist-val num">${d.count}</span>
                  <div class="dist-bar" style="height:${Math.round(d.count / max * 150)}px;background:${d.color}"></div>
                </div>`).join('')}
            </div>
            <div class="dist-x">${P.distribution.map(d => `<span>${d.band}<br /><span style="color:#94a3b8;font-weight:500">${d.range}</span></span>`).join('')}</div>
          </div>
          <div class="legend">
            ${P.distribution.map(d => `
              <div class="legend-row"><span class="sw" style="background:${d.color}"></span>${d.band} (${d.range})<span class="lv num">${d.pct}%</span></div>`).join('')}
            <div class="legend-row" style="margin-top:5px;padding-top:8px;border-top:1px solid #f1f5f9">Portfolio average<span class="lv num">${k.avgRisk}</span></div>
            <div class="legend-row">Below average (50+)<span class="lv num">${P.distribution[2].count} vessels</span></div>
          </div>
        </div>`, 'Score bands follow the Real World scale: good 0–25, average 25+–50, below average 50+–100. Counts are vessels holding cover at period end.')}
      ${foot(4)}
    </article>`;
  }

  /* ── Page 2 — highest scores, score movement ── */
  function page2() {
    const c = P.changes;
    const movRow = (r, dir) => `
      <tr>
        <td class="vn">${r.name}</td>
        <td class="r num">${r.from}</td>
        <td class="r num">${r.to}</td>
        <td class="r"><span class="${dir === 'up' ? 'delta-up' : 'delta-down'} num">${dir === 'up' ? '+' : '−'}${Math.abs(r.to - r.from)}</span></td>
      </tr>`;
    return `
    <article class="page" data-screen-label="Page 5">
      ${head('Risk score detail')}
      ${sec(ICO.alert, 'Highest Real World Risk Score vessels', `
        <table class="rt">
          <thead><tr>
            <th style="width:26px">#</th><th>Vessel</th><th>Flag</th>
            <th class="r">Score</th><th class="r">Prev</th>
          </tr></thead>
          <tbody>
            ${P.highest.map((v, i) => `
              <tr>
                <td class="num" style="color:#94a3b8">${i + 1}</td>
                <td class="vn"><span class="v-stack"><span class="v-name">${v.name}</span><span class="v-sub"><span class="num">IMO ${v.imo}</span> &middot; ${v.type}</span></span></td>
                <td>${flag(v.cc)}</td>
                <td class="r">${scoreChip(v.score)}</td>
                <td class="r num" style="color:#64748b">${v.prev}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Ranked by score at period end. Prev is the score carried in the previous report.')}
      ${sec(ICO.trend, 'Risk score changes since previous report', `
        <div class="kpi-grid cols-4">
          <div class="kpi"><div class="k">Scores increased</div><div class="v num">${c.summary.increased}</div><div class="d">vessels</div></div>
          <div class="kpi"><div class="k">Scores decreased</div><div class="v num">${c.summary.decreased}</div><div class="d">vessels</div></div>
          <div class="kpi"><div class="k">Unchanged</div><div class="v num">${c.summary.unchanged.toLocaleString()}</div><div class="d">vessels</div></div>
          <div class="kpi accent"><div class="k">Net average move</div><div class="v num">${c.summary.netAvg}</div><div class="d">portfolio-wide</div></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:12px">
          <div>
            <div style="font-size:11px;font-weight:700;color:#b91c1c;letter-spacing:.05em;text-transform:uppercase;margin-bottom:6px">Largest increases</div>
            <table class="rt"><thead><tr><th>Vessel</th><th class="r">From</th><th class="r">To</th><th class="r">Δ</th></tr></thead>
            <tbody>${c.up.map(r => movRow(r, 'up')).join('')}</tbody></table>
          </div>
          <div>
            <div style="font-size:11px;font-weight:700;color:#15803d;letter-spacing:.05em;text-transform:uppercase;margin-bottom:6px">Largest decreases</div>
            <table class="rt"><thead><tr><th>Vessel</th><th class="r">From</th><th class="r">To</th><th class="r">Δ</th></tr></thead>
            <tbody>${c.down.map(r => movRow(r, 'down')).join('')}</tbody></table>
          </div>
        </div>`)}
      ${foot(5)}
    </article>`;
  }

  /* ── Page 3 — sanctions / compliance, casualties ── */
  function page3() {
    const cm = P.compliance;
    const sevPill = s => `<span class="pill ${s === 'Serious' ? 'pill-red' : s === 'Moderate' ? 'pill-amber' : 'pill-slate'}">${s}</span>`;
    const stPill = s => `<span class="pill ${s === 'Claim open' ? 'pill-amber' : s === 'Surveying' ? 'pill-blue' : 'pill-green'}">${s}</span>`;
    return `
    <article class="page" data-screen-label="Page 6">
      ${head('Compliance &amp; casualties')}
      ${sec(ICO.shield, 'Sanctions and compliance indicators', `
        <div class="ind-grid">
          ${cm.indicators.map(i => `
            <div class="ind"><div class="iv num">${i.v}</div><div class="ik">${i.k}</div><div class="id">${i.d}</div></div>`).join('')}
        </div>
        `)}
      ${sec(ICO.life, 'Recent casualties', `
        <table class="rt">
          <thead><tr><th>Date</th><th>Vessel</th><th>Flag</th><th>Event</th><th>Severity</th><th>Location</th></tr></thead>
          <tbody>
            ${P.casualties.map(c => `
              <tr>
                <td class="num" style="white-space:nowrap">${c.date}</td>
                <td class="vn"><span class="v-stack"><span class="v-name">${c.name}</span><span class="v-sub"><span class="num">IMO ${c.imo}</span> &middot; ${c.vtype}</span></span></td>
                <td>${flag(c.cc)}</td>
                <td>${c.type}</td>
                <td>${sevPill(c.sev)}</td>
                <td style="color:#475569">${c.loc}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Five casualties reported in the period against a trailing twelve-month average of 3.4 per month.')}
      ${foot(6)}
    </article>`;
  }

  /* ── Page 4 — regional concentration, war risk ── */
  function page4() {
    const w = P.war;
    return `
    <article class="page" data-screen-label="Page 7">
      ${head('Concentration &amp; war risk')}
      ${sec(ICO.globe, 'Regional concentrations', `
        <div class="bar-list">
          ${P.regions.map(r => `
            <div class="bl-row">
              <span class="bl-name">${r.name}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${r.pct}%"></span></span>
              <span class="bl-val">${r.vessels} &middot; ${r.value}</span>
            </div>`).join('')}
        </div>
        <table class="rt" style="margin-top:14px">
          <thead><tr><th>Region</th><th class="r">Vessels</th><th class="r">Insured value</th><th class="r">Share of portfolio</th><th>Peak accumulation</th></tr></thead>
          <tbody>
            ${P.regions.map(r => `
              <tr>
                <td class="vn">${r.name}</td>
                <td class="r num">${r.vessels}</td>
                <td class="r num">${r.value}</td>
                <td class="r num">${(r.vessels / P.kpi.vessels * 100).toFixed(1)}%</td>
                <td style="color:#64748b">${r.name === 'Singapore Strait' ? '18 Jul, 41 vessels simultaneously' : r.name === 'Gulf of Aden / BAM' ? '09 Jul, 27 vessels simultaneously' : '—'}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Vessels counted where they entered the region at least once during the period; a vessel may appear in more than one region.')}
      ${sec(ICO.swords, 'War-risk exposure', `
        <div class="kpi-grid">
          <div class="kpi accent"><div class="k">Vessels in listed areas</div><div class="v num">${w.exposedVessels}</div><div class="d">${w.sharePct}% of the portfolio</div></div>
          <div class="kpi"><div class="k">Exposed insured value</div><div class="v num">${w.exposedValue}</div><div class="d"><span class="delta-up">+12.5%</span> vs previous</div></div>
          <div class="kpi"><div class="k">Breach notifications</div><div class="v num">${w.breachCount}</div><div class="d">entered without notice</div></div>
          <div class="kpi"><div class="k">JWC listed zones touched</div><div class="v num">${w.zones.length}</div><div class="d">in the period</div></div>
        </div>
        <div class="bar-list" style="margin-top:12px">
          ${w.zones.map(z => `
            <div class="bl-row">
              <span class="bl-name">${z.name}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${z.pct}%;background:${z.tone}"></span></span>
              <span class="bl-val">${z.vessels} &middot; ${z.value}</span>
            </div>`).join('')}
        </div>`, 'Listed areas follow the current Joint War Committee list. Breach notifications are entries recorded without prior notice under the war-risk warranty.')}
      ${foot(7)}
    </article>`;
  }

  /* ── Page 5 — changes since previous report ── */
  function page5() {
    const toneBg = { red:'#fef2f2', amber:'#fffbeb', green:'#f0fdf4', blue:'#eff6ff' };
    const toneFg = { red:'#b91c1c', amber:'#b45309', green:'#15803d', blue:'#1d4ed8' };
    return `
    <article class="page" data-screen-label="Page 8">
      ${head('Changes since previous report')}
      ${sec(ICO.trend, 'Changes since previous report', `
        <div class="chg">
          ${P.significant.map(s => `
            <div class="chg-row">
              <span class="chg-ico" style="background:${toneBg[s.tone]};color:${toneFg[s.tone]}">${ic(s.tone === 'green' ? ICO.trend : ICO.alert, 12)}</span>
              <div><div class="chg-t">${s.title}</div><div class="chg-d">${s.d}</div></div>
              <div class="chg-m" style="color:${toneFg[s.tone]};font-weight:700">${s.m}</div>
            </div>`).join('')}
        </div>`, `Measured against the ${P.meta.previous} report.`)}
      ${foot(8)}
    </article>`;
  }

  /* ── Page 6 — vessels requiring attention ── */
  function page6() {
    return `
    <article class="page" data-screen-label="Page 9">
      ${head('Vessels requiring attention')}
      ${sec(ICO.flag2, 'Vessels requiring attention', `
        <div class="att">
          ${P.attention.map(a => `
            <div class="att-item ${a.tone === 'amber' ? 'amber' : ''}">
              <div>
                <div class="att-name">${flag(a.cc)} ${a.name}</div>
                <div class="att-meta"><span class="num">IMO ${a.imo}</span> &middot; ${a.country} &middot; <span class="num">Risk score ${a.score}</span></div>
                <div class="att-why">${a.why}</div>
              </div>
              <div class="att-act">
                <span class="att-act-lbl">Risk Score</span>
                ${scoreChip(a.score)}
              </div>
            </div>`).join('')}
        </div>`, 'Ordered by score. Each item carries an owner action and a committee due date; unresolved items roll forward into the next report.')}
      <p class="sec-note" style="margin-top:16px;padding-top:10px;border-top:1px solid #f1f5f9;color:#94a3b8">Real World Risk Scores are indicative and derived from vessel behaviour, compliance screening, casualty record and ownership data. They do not constitute underwriting advice. Sanctions screening reflects list data as published at ${P.meta.generatedOn}.</p>
      ${foot(9)}
    </article>`;
  }

  /* ── Front matter ── */
  function frontCover() {
    return RF.cover({
      classLabel: 'Confidential',
      eyebrow: 'Monthly portfolio report',
      title: 'Portfolio Executive<br />Risk Report',
      sub: 'A month-end view of portfolio composition, Real World Risk Score distribution, compliance exposure and the assets that need underwriting attention before the next committee.',
      subject: { k:'Portfolio', v:P.meta.portfolio, d:`${P.kpi.vessels.toLocaleString()} vessels &middot; ${P.kpi.otherAssets} other assets &middot; ${P.kpi.insuredValue} insured value` },
      meta: [['Reporting period', P.meta.period], ['Compared with', P.meta.previous], ['Prepared for', P.meta.preparedFor], ['Pages', `${TOTAL} (A4)`]],
      reportId: P.meta.reportId, owner: P.meta.owner, generatedOn: P.meta.generatedOn,
    });
  }

  function frontToc() {
    return RF.toc({
      head: head('Contents'), foot: foot(2),
      note: 'Sections follow the underwriting committee running order. Page numbers refer to this document.',
      rows: [
        { front:true, title:'Executive summary', sub:'Portfolio position at a glance, headline findings for the period.', page:3 },
        { n:'01', title:'Portfolio composition &amp; risk distribution', sub:'Vessels and assets under management, insured value, Real World Risk Score bands.', page:4 },
        { n:'02', title:'Risk score detail', sub:'Highest-scoring vessels and the largest score movements since the previous report.', page:5 },
        { n:'03', title:'Compliance &amp; casualties', sub:'Sanctions and compliance indicators, casualties reported in the period.', page:6 },
        { n:'04', title:'Concentration &amp; war risk', sub:'Regional concentrations, peak accumulation and Joint War Committee listed-area exposure.', page:7 },
        { n:'05', title:'Changes since previous report', sub:'Material movements measured against the prior reporting period.', page:8 },
        { n:'06', title:'Vessels requiring attention', sub:'Assets carrying an open action ahead of the next committee.', page:9 },
      ],
    });
  }

  function frontExec() {
    const k = P.kpi, d = P.distribution, w = P.war;
    const maxD = Math.max(...d.map(x => x.count));
    const maxR = Math.max(...P.regions.map(r => r.vessels));
    return RF.exec({
      head: head('Executive summary'), foot: foot(3),
      standfirst: `Position at ${P.meta.period.split('–')[1].trim()} against the ${P.meta.previous} report. Figures cover vessels holding cover at period end.`,
      hero: [
        { cls:'lead', k:'Average Real World Risk Score', v:k.avgRisk, d:`<span class="delta-up">${k.avgRiskDelta}</span> vs previous period`,
          meter:{ pinPct:k.avgRisk, scale:[{at:0,l:'0'},{at:25,l:'25'},{at:50,l:'50'},{at:100,l:'100'}], segments:[{pct:25,color:'#16a34a'},{pct:25,color:'#d97706'},{pct:50,color:'#dc2626'}] } },
        { k:'Vessels', v:k.vessels.toLocaleString(), d:`<span class="delta-up">${k.vesselsDelta}</span> &middot; ${k.otherAssets} other assets` },
        { k:'Insured value', v:k.insuredValue, d:`<span class="delta-up">${k.insuredValueDelta}</span> vs previous` },
        { cls:'warn', k:'Below-average vessels', v:d[2].count, d:`${d[2].pct}% of the portfolio scoring 50+` },
        { k:'War-risk exposed value', v:w.exposedValue, d:`${w.exposedVessels} vessels &middot; ${w.sharePct}% of book` },
        { cls:'warn', k:'Sanctions escalations', v:P.compliance.screening.filter(s => s.status === 'Escalated').reduce((a,s) => a + s.hits, 0), d:`${P.compliance.indicators[0].v} vessels with listed-entity links` },
        { k:'Casualties in period', v:P.casualties.length, d:`${P.casualties.filter(c => c.sev === 'Serious').length} serious &middot; 12-month avg 3.4` },
      ],
      left: { title:'Risk score distribution', rows:d.map(x => ({ n:`${x.band} (${x.range})`, pct:Math.round(x.count / maxD * 100), v:x.count, color:x.color })) },
      right: { title:'Largest regional concentrations', rows:P.regions.slice(0,4).map(r => ({ n:r.name, pct:Math.round(r.vessels / maxR * 100), v:r.vessels })) },
      findings: { rows:P.significant.slice(0,4).map(s => ({ tone:s.tone, t:s.title, d:s.d, m:s.m })) },
    });
  }

  window.perReport = {
    Toolbar() {
      return `
      <div class="doc-toolbar no-print">
        <div style="display:flex;align-items:center;gap:14px;min-width:0">
          <a href="Reports.html" class="tb-btn" style="text-decoration:none" title="Back to Reports" aria-label="Back to Reports">${ic(ICO.back, 14)}<span class="tb-lbl">Reports</span></a>
          <div style="min-width:0">
            <div class="tb-title">Portfolio Executive Risk Report</div>
            <div class="tb-sub num">${P.meta.portfolio} &middot; ${P.meta.period} &middot; ${TOTAL} pages (A4)</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <button class="tb-btn" id="rp-print" title="Print" aria-label="Print">${ic(ICO.print, 14)}<span class="tb-lbl">Print</span></button>
          <button class="tb-btn" id="rp-pdf" title="Download PDF" aria-label="Download PDF">${ic(ICO.dl, 14)}<span class="tb-lbl">PDF</span></button>
        </div>
      </div>`;
    },
    Pages() {
      return [frontCover(), frontToc(), frontExec(), page1(), page2(), page3(), page4(), page5(), page6()].join('');
    },
  };
})();
