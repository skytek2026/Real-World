/* Portfolio Exception Report — page composition */
(function () {
  const P = window.PEX;
  const RF = window.reportFront;
  const TOTAL = 8;
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    trend:'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
    shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    life:'<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
    swords:'<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/>',
    layers:'<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="M2 12.5a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 .59-.92"/><path d="M2 17.5a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 .59-.92"/>',
    wind:'<path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/>',
    split:'<path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"/><path d="m15 9 6-6"/>',
    check:'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
    print:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    back:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  };
  const flag = cc => `<img class="flagimg" src="https://flagcdn.com/w40/${cc}.png" srcset="https://flagcdn.com/w80/${cc}.png 2x" alt="${cc.toUpperCase()}" width="19" height="13" />`;
  const scoreChip = n => `<span class="score ${n > 60 ? 'sc-high' : n > 40 ? 'sc-med' : 'sc-low'}">${n}</span>`;
  const sevPill = s => `<span class="pill ${s === 'Critical' || s === 'Serious' ? 'pill-red' : s === 'High' || s === 'Moderate' ? 'pill-amber' : 'pill-slate'}">${s}</span>`;
  const vStack = (name, imo, type) => `<div class="v-stack"><span class="v-name">${name}</span><span class="v-sub num">IMO ${imo}${type ? ' &middot; ' + type : ''}</span></div>`;
  const newPill = isNew => `<span class="pill ${isNew ? 'pill-red' : 'pill-slate'}">${isNew ? 'New' : 'Carried fwd'}</span>`;

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
      <span>Portfolio Exception Report &middot; Real World</span>
      <span class="num">Page ${n} of ${TOTAL}</span>
    </div>`;
  const sec = (icon, title, body, note) => `
    <section class="sec">
      <h2 class="sec-title">${ic(icon, 16)}${title}</h2>
      ${note ? `<p class="sec-note">${note}</p>` : ''}
      ${body}
    </section>`;

  /* ── Front matter ── */
  function frontCover() {
    const s = P.summary;
    return RF.cover({
      classLabel: 'Confidential',
      eyebrow: 'Monthly exception report',
      title: 'Portfolio<br />Exception Report',
      sub: 'Every vessel in the book that broke an underwriting rule this period — high scores, sharp score movements, new compliance indicators, casualties, listed-area entries, aggregation breaches and weather exposure, separated into new and carried-forward issues.',
      subject: { k:'Portfolio', v:P.meta.portfolio, d:`${s.total} exceptions across ${s.vesselsFlagged} vessels &middot; ${s.exposedValue} exposed value` },
      meta: [['Reporting period', P.meta.period]],
      reportId: P.meta.reportId, owner: P.meta.owner, generatedOn: P.meta.generatedOn,
    });
  }

  function frontToc() {
    return RF.toc({
      head: head('Contents'), foot: foot(2),
      note: `Exception threshold: ${P.meta.threshold}. Page numbers refer to this document.`,
      rows: [
        { front:true, title:'Executive summary', sub:'Exception position at a glance, headline findings for the period.', page:3 },
        { n:'01', title:'High Risk Score vessels', sub:'Vessels at or above the score threshold, with drivers and recommended action.', page:4 },
        { n:'02', title:'Material Risk Score increases', sub:'Score movements of ten points or more, with the cause of each move.', page:5 },
        { n:'03', title:'New sanctions &amp; compliance indicators', sub:'Indicators raised in the period, their list source and escalation status.', page:5 },
        { n:'04', title:'New casualties', sub:'Casualties first reported in the period, with reserve and claim status.', page:6 },
        { n:'05', title:'Entry into selected war / high-risk areas', sub:'Listed-area entries, dwell time and warranty breaches.', page:6 },
        { n:'06', title:'Regional aggregation exceptions', sub:'Regions where peak accumulation exceeded its limit.', page:7 },
        { n:'07', title:'Significant weather exposure', sub:'Named weather events and the vessels exposed to them.', page:7 },
        { n:'08', title:'New vs previously reported issues', sub:'Category split of new, carried-forward and resolved exceptions.', page:8 },
      ],
    });
  }

  function frontExec() {
    const s = P.summary, c = P.categories;
    const maxC = Math.max(...c.map(x => x.count));
    const maxA = Math.max(...P.warAreas.map(w => w.entries));
    return RF.exec({
      head: head('Executive summary'), foot: foot(3),
      standfirst: `Exceptions raised across ${P.meta.portfolio} for ${P.meta.period}, measured against the ${P.meta.previous} report. Threshold: ${P.meta.threshold.toLowerCase()}.`,
      hero: [
        { cls:'lead', k:'Open exceptions', v:s.total, d:`<span class="delta-up">${s.totalDelta}</span> vs previous &middot; ${s.newIssues} new, ${s.carriedForward} carried forward`,
          meter:{ pinPct:Math.round(s.newIssues / s.total * 100), scale:[{at:0,l:'all carried fwd'},{at:100,l:'all new'}], segments:[{pct:40,color:'#16a34a'},{pct:30,color:'#d97706'},{pct:30,color:'#dc2626'}] } },
        { cls:'warn', k:'Vessels flagged', v:s.vesselsFlagged, d:`<span class="delta-up">${s.vesselsDelta}</span> &middot; ${s.sharePct}% of ${s.portfolioVessels.toLocaleString()} vessels` },
        { cls:'warn', k:'Exposed insured value', v:s.exposedValue, d:`<span class="delta-up">${s.exposedValueDelta}</span> vs previous period` },
        { cls:'warn', k:'Critical, action now', v:s.criticalOpen, d:'referred to committee or compliance' },
        { k:'New this period', v:s.newIssues, d:`against ${s.carriedForward} carried forward` },
        { cls:'good', k:'Resolved in period', v:s.resolvedInPeriod, d:'cleared since the previous report' },
        { cls:'warn', k:'Aggregation breaches', v:P.aggregation.length, d:'regions above their accumulation limit' },
      ],
      left: { title:'Exceptions by category', rows:c.map(x => ({ n:x.label, pct:Math.round(x.count / maxC * 100), v:x.count, color:x.color })) },
      right: { title:'Listed-area entries', rows:P.warAreas.map(w => ({ n:w.area, pct:Math.round(w.entries / maxA * 100), v:w.entries, color:w.tone })) },
      findings: { rows:P.findings },
    });
  }

  /* ── Page 4 — high risk score vessels ── */
  function page1() {
    const s = P.summary, c = P.categories;
    return `
    <article class="page" data-screen-label="Page 4">
      ${head('01 &middot; High Risk Score vessels')}
      ${sec(ICO.alert, 'Exception counts by category', `
        <div class="kpi-grid cols-4">
          <div class="kpi accent"><div class="k">Open exceptions</div><div class="v num">${s.total}</div><div class="d"><span class="delta-up">${s.totalDelta}</span> vs ${P.meta.previous}</div></div>
          <div class="kpi"><div class="k">Vessels flagged</div><div class="v num">${s.vesselsFlagged}</div><div class="d">${s.sharePct}% of the book</div></div>
          <div class="kpi"><div class="k">Exposed value</div><div class="v num">${s.exposedValue}</div><div class="d"><span class="delta-up">${s.exposedValueDelta}</span></div></div>
          <div class="kpi"><div class="k">Critical, action now</div><div class="v num">${s.criticalOpen}</div><div class="d">${s.resolvedInPeriod} resolved in period</div></div>
        </div>
        <div class="bar-list" style="margin-top:11px">
          ${c.map(x => `
            <div class="bl-row">
              <span class="bl-name">${x.label}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.count / Math.max(...c.map(y => y.count)) * 100)}%;background:${x.color}"></span></span>
              <span class="bl-val num">${x.count} &middot; ${x.new} new</span>
            </div>`).join('')}
        </div>`, `Exception threshold: ${P.meta.threshold}.`)}
      ${sec(ICO.alert, 'Vessels at or above the score threshold', `
        <table class="rt">
          <thead><tr>
            <th>Vessel</th><th>Flag</th><th class="r">Score</th><th class="r">Prev</th>
            <th>Band</th><th>Primary drivers</th><th class="r">Value</th><th>Action</th>
          </tr></thead>
          <tbody>
            ${P.highScore.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo, v.type)}</td>
                <td>${flag(v.flag)}</td>
                <td class="r">${scoreChip(v.score)}</td>
                <td class="r num">${v.prev}</td>
                <td>${sevPill(v.band === 'Severe' ? 'Critical' : 'High')}</td>
                <td>${v.drivers}</td>
                <td class="r num">${v.value}</td>
                <td style="font-weight:600;color:#0f172a">${v.action}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, `${P.highScore.length} vessels scoring 61 or above, ordered by current Real World Risk Score.`)}
      ${foot(4)}
    </article>`;
  }

  /* ── Page 5 — score increases + sanctions ── */
  function page2() {
    return `
    <article class="page" data-screen-label="Page 5">
      ${head('02\u201303 &middot; Score increases &amp; compliance')}
      ${sec(ICO.trend, 'Material Risk Score increases', `
        <table class="rt">
          <thead><tr><th>Vessel</th><th class="r">From</th><th class="r">To</th><th class="r">Change</th><th>Status</th><th>Cause of movement</th></tr></thead>
          <tbody>
            ${P.increases.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo)}</td>
                <td class="r num">${v.from}</td>
                <td class="r">${scoreChip(v.to)}</td>
                <td class="r"><span class="delta-up num">+${v.delta}</span></td>
                <td>${newPill(v.first)}</td>
                <td>${v.cause}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Movements of ten points or more are treated as material; smaller moves on vessels already above threshold are listed for completeness.')}
      ${sec(ICO.shield, 'New sanctions &amp; compliance indicators', `
        <table class="rt">
          <thead><tr><th>Vessel</th><th>Indicator</th><th>List</th><th>Raised</th><th>Severity</th><th>Status</th></tr></thead>
          <tbody>
            ${P.sanctions.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo)}</td>
                <td><div class="v-stack"><span style="font-weight:600;color:#0f172a">${v.ind}</span><span class="v-sub">${v.note}</span></div></td>
                <td>${v.list}</td>
                <td class="num">${v.on}</td>
                <td>${sevPill(v.sev)}</td>
                <td style="font-weight:600;color:${v.status === 'Escalated' ? '#b91c1c' : '#334155'}">${v.status}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Screening reflects list data as published at generation. Escalated items are with the compliance team.')}
      ${foot(5)}
    </article>`;
  }

  /* ── Page 6 — casualties + war areas ── */
  function page3() {
    return `
    <article class="page" data-screen-label="Page 6">
      ${head('04\u201305 &middot; Casualties &amp; listed areas')}
      ${sec(ICO.life, 'New casualties reported in the period', `
        <table class="rt">
          <thead><tr><th>Date</th><th>Vessel</th><th>Type</th><th>Severity</th><th>Location</th><th class="r">Reserve</th><th>Status</th></tr></thead>
          <tbody>
            ${P.casualties.map(c => `
              <tr>
                <td class="num">${c.date}</td>
                <td>${vStack(c.name, c.imo)}</td>
                <td><div class="v-stack"><span style="font-weight:600;color:#0f172a">${c.type}</span><span class="v-sub">${c.detail}</span></div></td>
                <td>${sevPill(c.sev)}</td>
                <td>${c.loc}</td>
                <td class="r num">${c.reserve}</td>
                <td>${c.status}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, `${P.casualties.length} casualties first reported this period. Reserves are indicative and move with survey outcomes.`)}
      ${sec(ICO.swords, 'Entry into selected war / high-risk areas', `
        <table class="rt">
          <thead><tr><th>Area</th><th>Listing</th><th class="r">Entries</th><th class="r">Vessels</th><th class="r">Value</th><th class="r">Longest stay</th><th class="r">Breaches</th></tr></thead>
          <tbody>
            ${P.warAreas.map(w => `
              <tr>
                <td class="vn">${w.area}</td>
                <td><span class="pill ${w.listing === 'JWC listed' ? 'pill-red' : 'pill-amber'}">${w.listing}</span></td>
                <td class="r num">${w.entries}</td>
                <td class="r num">${w.vessels}</td>
                <td class="r num">${w.value}</td>
                <td class="r num">${w.longest}</td>
                <td class="r num" style="font-weight:700;color:${w.breach ? '#b91c1c' : '#15803d'}">${w.breach}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.warNote)}
      ${foot(6)}
    </article>`;
  }

  /* ── Page 7 — aggregation + weather ── */
  function page4() {
    return `
    <article class="page" data-screen-label="Page 7">
      ${head('06\u201307 &middot; Aggregation &amp; weather')}
      ${sec(ICO.layers, 'Regional aggregation exceptions', `
        <table class="rt">
          <thead><tr><th>Region</th><th class="r">Limit</th><th class="r">Peak vessels</th><th class="r">Peak date</th><th class="r">Value at peak</th><th class="r">Over limit</th></tr></thead>
          <tbody>
            ${P.aggregation.map(a => `
              <tr>
                <td class="vn">${a.region}</td>
                <td class="r num">${a.limit}</td>
                <td class="r"><span class="score sc-high">${a.peak}</span></td>
                <td class="r num">${a.at}</td>
                <td class="r num">${a.value}</td>
                <td class="r"><span class="delta-up num">${a.over}</span></td>
              </tr>`).join('')}
          </tbody>
        </table>
        <div class="bar-list" style="margin-top:11px">
          ${P.aggregation.map(a => `
            <div class="bl-row">
              <span class="bl-name">${a.region}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${Math.round(a.limit / a.peak * 100)}%;background:#cbd5e1"></span><span class="bl-fill" style="width:${100 - Math.round(a.limit / a.peak * 100)}%;background:${a.tone};margin-top:-8px;margin-left:${Math.round(a.limit / a.peak * 100)}%"></span></span>
              <span class="bl-val num">${a.peak} / ${a.limit}</span>
            </div>`).join('')}
        </div>`, 'Grey shows the accumulation limit, colour the excess above it. Breaches are measured on peak simultaneous presence within the region boundary.')}
      ${sec(ICO.wind, 'Significant weather exposure', `
        <table class="rt">
          <thead><tr><th>Event</th><th>Window</th><th>Area affected</th><th class="r">Vessels</th><th class="r">Value</th><th class="r">In path</th></tr></thead>
          <tbody>
            ${P.weather.map(w => `
              <tr>
                <td><div class="v-stack"><span class="v-name">${w.event}</span><span class="v-sub">${w.cat}</span></div></td>
                <td class="num">${w.window}</td>
                <td><div class="v-stack"><span style="color:#0f172a">${w.area}</span><span class="v-sub">${w.note}</span></div></td>
                <td class="r num">${w.vessels}</td>
                <td class="r num">${w.value}</td>
                <td class="r"><span class="score sc-high">${w.inPath}</span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Exposure is counted where a vessel track intersected the forecast wind field during the event window.')}
      ${foot(7)}
    </article>`;
  }

  /* ── Page 8 — new vs previously reported ── */
  function page5() {
    const n = P.newVsPrev;
    const totalNew = n.reduce((a, x) => a + x.nw, 0);
    const totalCar = n.reduce((a, x) => a + x.carried, 0);
    const totalRes = n.reduce((a, x) => a + x.resolved, 0);
    const maxRow = Math.max(...n.map(x => x.nw + x.carried));
    return `
    <article class="page" data-screen-label="Page 8">
      ${head('08 &middot; New vs previously reported')}
      ${sec(ICO.split, 'Category split of new, carried-forward and resolved', `
        <div class="kpi-grid cols-3">
          <div class="kpi accent"><div class="k">New this period</div><div class="v num">${totalNew}</div><div class="d">first raised in ${P.meta.period.slice(-8)}</div></div>
          <div class="kpi"><div class="k">Carried forward</div><div class="v num">${totalCar}</div><div class="d">open since ${P.meta.previous} or earlier</div></div>
          <div class="kpi"><div class="k">Resolved in period</div><div class="v num">${totalRes}</div><div class="d">cleared and closed</div></div>
        </div>
        <table class="rt" style="margin-top:11px">
          <thead><tr><th>Exception category</th><th class="r">New</th><th class="r">Carried fwd</th><th class="r">Open total</th><th>Split</th><th class="r">Resolved</th></tr></thead>
          <tbody>
            ${n.map(x => {
              const open = x.nw + x.carried;
              const w = Math.round(open / maxRow * 100);
              const np = Math.round(x.nw / open * 100);
              return `
              <tr>
                <td class="vn">${x.cat}</td>
                <td class="r num" style="font-weight:700;color:#b91c1c">${x.nw}</td>
                <td class="r num">${x.carried}</td>
                <td class="r num" style="font-weight:700;color:#0f172a">${open}</td>
                <td style="min-width:120px">
                  <span style="display:flex;height:8px;width:${w}%;min-width:34px;border-radius:999px;overflow:hidden;background:#f1f5f9">
                    <i style="display:block;width:${np}%;background:#dc2626"></i><i style="display:block;width:${100 - np}%;background:#cbd5e1"></i>
                  </span>
                </td>
                <td class="r num" style="color:#15803d;font-weight:600">${x.resolved || '\u2014'}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>`, 'Red shows the newly raised share of each category, grey the portion carried forward from earlier reports.')}
      ${sec(ICO.check, 'Exceptions resolved since the previous report', `
        <table class="rt compact">
          <thead><tr><th>Vessel</th><th>Previously reported as</th><th>Resolution</th><th>Closed</th></tr></thead>
          <tbody>
            ${P.resolved.map(r => `
              <tr>
                <td>${vStack(r.name, r.imo)}</td>
                <td>${r.was}</td>
                <td style="color:#15803d;font-weight:600">${r.now}</td>
                <td class="num">${r.on}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, `${P.resolved.length} of the ${P.summary.resolvedInPeriod} resolved exceptions relate to named vessels; the remainder were portfolio-level aggregation and weather items.`)}
      ${foot(8)}
    </article>`;
  }

  window.pexReport = {
    Toolbar() {
      return `
      <div class="doc-toolbar no-print">
        <div style="display:flex;align-items:center;gap:14px;min-width:0">
          <a href="Reports.html" class="tb-btn" style="text-decoration:none" title="Back to Reports" aria-label="Back to Reports">${ic(ICO.back, 14)}<span class="tb-lbl">Reports</span></a>
          <div style="min-width:0">
            <div class="tb-title">Portfolio Exception Report</div>
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
      return [frontCover(), frontToc(), frontExec(), page1(), page2(), page3(), page4(), page5()].join('');
    },
  };
})();
