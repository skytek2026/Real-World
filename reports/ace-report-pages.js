/* Accumulation & Concentration Exception Report — page composition */
(function () {
  const P = window.ACE;
  const RF = window.reportFront;
  const TOTAL = 9;
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    layers:'<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="M2 12.5a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 .59-.92"/><path d="M2 17.5a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 .59-.92"/>',
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    ship:'<path d="M12 10.189V14"/><path d="M12 2v3"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"/><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    list:'<path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/>',
    coin:'<circle cx="12" cy="12" r="10"/><path d="M14.5 9.5a2.5 2.5 0 0 0-2.5-2 2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1-2.5-2"/><path d="M12 6v12"/>',
    chart:'<path d="M13 17V9"/><path d="M18 17V5"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-3"/>',
    print:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    back:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  };
  const flag = cc => `<img class="flagimg" src="https://flagcdn.com/w40/${cc}.png" srcset="https://flagcdn.com/w80/${cc}.png 2x" alt="${cc.toUpperCase()}" width="19" height="13" />`;
  const scoreChip = n => `<span class="score ${n > 60 ? 'sc-high' : n > 40 ? 'sc-med' : 'sc-low'}">${n}</span>`;
  const vStack = (name, imo, type) => `<div class="v-stack"><span class="v-name">${name}</span><span class="v-sub num">IMO ${imo}${type ? ' &middot; ' + type : ''}</span></div>`;

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
      <span>Accumulation &amp; Concentration Exception Report &middot; Real World</span>
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
      eyebrow: 'Monthly accumulation report',
      title: 'Accumulation &amp;<br />Concentration Report',
      sub: 'Where the book piles up and by how much — the highest geographic concentrations, every region that broke its accumulation limit, the vessel types driving the peaks, the ten largest regional exposures and the vessels behind the worst of them.',
      subject: { k:'Portfolio', v:P.meta.portfolio, d:`${s.regions} regions monitored &middot; ${s.breaches} limit breaches &middot; ${s.exposedValue} exposed value` },
      meta: [['Reporting period', P.meta.period]],
      reportId: P.meta.reportId, owner: P.meta.owner, generatedOn: P.meta.generatedOn,
    });
  }

  function frontToc() {
    return RF.toc({
      head: head('Contents'), foot: foot(2),
      note: `Measurement basis: ${P.meta.basis}. Page numbers refer to this document.`,
      rows: [
        { front:true, title:'Executive summary', sub:'Accumulation position at a glance, headline findings for the period.', page:3 },
        { n:'01', title:'Highest geographic concentrations', sub:'Peak and average simultaneous presence per monitored region against its limit.', page:4 },
        { n:'02', title:'Regions exceeding selected thresholds', sub:'Every limit breach with duration, excess value and recommended action.', page:5 },
        { n:'03', title:'Concentration by vessel type', sub:'Accumulated value and vessel share per type, and where each peaks.', page:6 },
        { n:'04', title:'Top 10 exposures by region', sub:'The ten largest regional exposures ranked by accumulated insured value.', page:7 },
        { n:'05', title:'Vessels contributing to the accumulation', sub:`Vessel-by-vessel detail behind the peak in ${P.contributors.region}.`, page:8 },
        { n:'06', title:'Insured value where available', sub:'Declared against estimated values, value tiers and coverage caveats.', page:9 },
      ],
    });
  }

  function frontExec() {
    const s = P.summary, c = P.concentrations;
    const maxV = Math.max(...c.map(x => x.valueNum));
    const maxT = Math.max(...P.byType.map(x => x.valueNum));
    return RF.exec({
      head: head('Executive summary'), foot: foot(3),
      standfirst: `Accumulation position for ${P.meta.portfolio} over ${P.meta.period}, against the ${P.meta.previous} report. ${P.meta.basis}.`,
      hero: [
        { cls:'lead', k:'Accumulated value in monitored regions', v:s.exposedValue, d:`<span class="delta-up">${s.exposedValueDelta}</span> vs previous &middot; ${s.sharePct}% of the ${s.portfolioValue} book`,
          meter:{ pinPct:s.sharePct, scale:[{at:0,l:'0% of book'},{at:50,l:'50%'},{at:100,l:'100%'}], segments:[{pct:35,color:'#16a34a'},{pct:15,color:'#d97706'},{pct:50,color:'#dc2626'}] } },
        { cls:'warn', k:'Regions over limit', v:s.breaches, d:`<span class="delta-up">${s.breachDelta}</span> vs previous &middot; of ${s.regions} monitored` },
        { cls:'warn', k:'Largest single peak', v:s.peakValue, d:`${s.peakRegion} &middot; ${s.worstOver} over limit` },
        { k:'Vessels involved', v:s.vesselsInvolved, d:'inside a monitored region in the period' },
        { cls:'warn', k:'Worst-scoring concentration', v:P.top10[8].avgRisk, d:`${P.top10[8].region} &middot; ${P.top10[8].vessels} vessels` },
        { k:'Declared-value coverage', v:`${s.declaredPct}%`, d:`${P.valueCoverage.declared.vessels} of ${s.vesselsInvolved} vessels` },
        { cls:'warn', k:'Top vessel-type share', v:`${P.byType[0].pct}%`, d:`${P.byType[0].type} &middot; ${P.byType[0].value}` },
      ],
      left: { title:'Accumulated value by region', rows:c.slice(0,5).map(x => ({ n:x.region, pct:Math.round(x.valueNum / maxV * 100), v:x.value, color:x.tone })) },
      right: { title:'Accumulated value by vessel type', rows:P.byType.slice(0,5).map(x => ({ n:x.type, pct:Math.round(x.valueNum / maxT * 100), v:x.value, color:x.color })) },
      findings: { rows:P.findings },
    });
  }

  /* ── Page 4 — highest geographic concentrations ── */
  function page1() {
    const c = P.concentrations, maxP = Math.max(...c.map(x => Math.max(x.peak, x.limit)));
    return `
    <article class="page" data-screen-label="Page 4">
      ${head('01 &middot; Highest geographic concentrations')}
      ${sec(ICO.layers, 'Peak and average presence by region', `
        <table class="rt">
          <thead><tr><th>Region</th><th class="r">Peak vessels</th><th class="r">Peak at</th><th class="r">Average</th><th class="r">Limit</th><th class="r">Over limit</th><th class="r">Value at peak</th></tr></thead>
          <tbody>
            ${c.map(x => `
              <tr>
                <td class="vn">${x.region}</td>
                <td class="r"><span class="score ${x.peak > x.limit ? 'sc-high' : 'sc-low'}">${x.peak}</span></td>
                <td class="r num">${x.at}</td>
                <td class="r num">${x.avg}</td>
                <td class="r num">${x.limit}</td>
                <td class="r"><span class="${x.over === '\u2014' ? '' : 'delta-up'} num">${x.over}</span></td>
                <td class="r num">${x.value}</td>
              </tr>`).join('')}
          </tbody>
        </table>
        <div class="bar-list" style="margin-top:11px">
          ${c.map(x => `
            <div class="bl-row">
              <span class="bl-name">${x.region}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.peak / maxP * 100)}%;background:${x.tone}"></span></span>
              <span class="bl-val num">${x.peak} / ${x.limit}</span>
            </div>`).join('')}
        </div>`, `Ordered by accumulated insured value at peak. ${P.meta.basis}; the average column is the mean hourly count across the period.`)}
      ${foot(4)}
    </article>`;
  }

  /* ── Page 5 — threshold breaches ── */
  function page2() {
    const s = P.summary, b = P.breaches;
    return `
    <article class="page" data-screen-label="Page 5">
      ${head('02 &middot; Regions exceeding thresholds')}
      ${sec(ICO.alert, 'Limit breaches in the period', `
        <div class="kpi-grid cols-4">
          <div class="kpi accent"><div class="k">Regions over limit</div><div class="v num">${s.breaches}</div><div class="d"><span class="delta-up">${s.breachDelta}</span> vs ${P.meta.previous}</div></div>
          <div class="kpi"><div class="k">Hours above limit</div><div class="v num">${b.reduce((a, x) => a + x.hours, 0)}</div><div class="d">across all breaches</div></div>
          <div class="kpi"><div class="k">Excess vessels at peak</div><div class="v num">${b.reduce((a, x) => a + x.over, 0)}</div><div class="d">above the limits combined</div></div>
          <div class="kpi"><div class="k">Excess insured value</div><div class="v num">$757m</div><div class="d">value above the limits</div></div>
        </div>
        <table class="rt" style="margin-top:11px">
          <thead><tr><th>Region</th><th class="r">Limit</th><th class="r">Peak</th><th class="r">Excess</th><th class="r">Hrs over</th><th class="r">Excess val.</th><th>Action</th></tr></thead>
          <tbody>
            ${b.map(x => `
              <tr>
                <td><div class="v-stack"><span class="v-name">${x.region}</span><span class="v-sub num">${x.first} \u2192 ${x.last}</span></div></td>
                <td class="r num">${x.limit}</td>
                <td class="r"><span class="score sc-high">${x.peak}</span></td>
                <td class="r"><span class="delta-up num">+${x.over} (${x.overPct})</span></td>
                <td class="r num">${x.hours}</td>
                <td class="r num">${x.excessValue}</td>
                <td style="font-weight:600;color:#0f172a">${x.action}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.breachNote)}
      ${sec(ICO.chart, 'How far each region ran over', `
        <div class="bar-list">
          ${b.map(x => {
            const w = Math.round(x.limit / x.peak * 100);
            return `
            <div class="bl-row">
              <span class="bl-name">${x.region}</span>
              <span class="bl-track" style="position:relative">
                <span class="bl-fill" style="width:${w}%;background:#cbd5e1"></span>
                <span class="bl-fill" style="position:absolute;top:0;left:${w}%;width:${100 - w}%;background:${x.tone}"></span>
              </span>
              <span class="bl-val num">${x.overPct} over</span>
            </div>`;
          }).join('')}
        </div>`, 'Grey shows the accumulation limit, colour the excess above it.')}
      ${foot(5)}
    </article>`;
  }

  /* ── Page 6 — concentration by vessel type ── */
  function page3() {
    const t = P.byType, maxV = Math.max(...t.map(x => x.valueNum)), maxN = Math.max(...t.map(x => x.vessels));
    return `
    <article class="page" data-screen-label="Page 6">
      ${head('03 &middot; Concentration by vessel type')}
      ${sec(ICO.ship, 'Accumulated exposure by vessel type', `
        <table class="rt">
          <thead><tr><th>Vessel type</th><th class="r">Vessels</th><th class="r">Share of value</th><th class="r">Accumulated value</th><th class="r">Value per vessel</th><th>Peaks in</th></tr></thead>
          <tbody>
            ${t.map(x => `
              <tr>
                <td class="vn">${x.type}</td>
                <td class="r num">${x.vessels}</td>
                <td class="r num">${x.pct}%</td>
                <td class="r num">${x.value}</td>
                <td class="r num">$${(x.valueNum * 1000 / x.vessels).toFixed(1)}m</td>
                <td>${x.worst}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.typeNote)}
      ${sec(ICO.chart, 'Value against vessel count', `
        <div class="dist">
          <div>
            <div class="dist-chart">
              ${t.map(x => `
                <div class="dist-col">
                  <span class="dist-val num">${x.value.replace('$', '').replace('bn', '')}</span>
                  <span class="dist-bar" style="height:${Math.round(x.valueNum / maxV * 155)}px;background:${x.color}"></span>
                </div>`).join('')}
            </div>
            <div class="dist-x">${t.map(x => `<span>${x.type.replace(' / ', '/ ').replace(/ /g, '<br />')}</span>`).join('')}</div>
          </div>
          <div class="legend">
            ${t.map(x => `
              <div class="legend-row">
                <span class="sw" style="background:${x.color}"></span>
                <span>${x.vessels} vessels</span>
                <span class="lv num">${x.pct}%</span>
              </div>`).join('')}
          </div>
        </div>`, 'Bars show accumulated insured value in $bn; the legend gives the vessel count and share of accumulated value.')}
      ${foot(6)}
    </article>`;
  }

  /* ── Page 7 — top 10 exposures by region ── */
  function page4() {
    const t = P.top10, maxV = Math.max(...t.map(x => x.valueNum));
    return `
    <article class="page" data-screen-label="Page 7">
      ${head('04 &middot; Top 10 exposures by region')}
      ${sec(ICO.list, 'The ten largest regional exposures', `
        <table class="rt">
          <thead><tr><th class="r">#</th><th>Region</th><th class="r">Vessels</th><th class="r">Value</th><th class="r">Share</th><th class="r">Avg score</th><th>Limit status</th></tr></thead>
          <tbody>
            ${t.map((x, i) => `
              <tr>
                <td class="r num" style="font-weight:700;color:var(--brand-600,#2d7ffb)">${i + 1}</td>
                <td class="vn">${x.region}</td>
                <td class="r num">${x.vessels} / ${x.limit}</td>
                <td class="r num" style="font-weight:700;color:#0f172a">${x.value}</td>
                <td class="r num">${x.share}%</td>
                <td class="r">${scoreChip(x.avgRisk)}</td>
                <td><span class="pill ${x.status === 'Over limit' ? 'pill-red' : 'pill-green'}">${x.status}</span></td>
              </tr>`).join('')}
          </tbody>
        </table>
        <div class="bar-list" style="margin-top:11px">
          ${t.slice(0, 6).map(x => `
            <div class="bl-row">
              <span class="bl-name">${x.region}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.valueNum / maxV * 100)}%;background:${x.status === 'Over limit' ? '#b91c1c' : 'var(--brand-600,#2d7ffb)'}"></span></span>
              <span class="bl-val num">${x.value}</span>
            </div>`).join('')}
        </div>`, `Ranked by accumulated insured value at peak. Share is of the ${P.summary.exposedValue} total across all monitored regions; a vessel present in two regions is counted in both.`)}
      ${foot(7)}
    </article>`;
  }

  /* ── Page 8 — contributing vessels ── */
  function page5() {
    const c = P.contributors;
    const declared = c.vessels.filter(v => v.basis === 'Declared').length;
    return `
    <article class="page" data-screen-label="Page 8">
      ${head('05 &middot; Vessels contributing to the accumulation')}
      ${sec(ICO.globe, `Largest contributors \u2014 ${c.region}`, `
        <div class="kpi-grid cols-4">
          <div class="kpi accent"><div class="k">Peak measured at</div><div class="v num" style="font-size:15px;line-height:1.3">${c.at}</div><div class="d">${P.concentrations[0].peak} vessels present</div></div>
          <div class="kpi"><div class="k">Top ten value</div><div class="v num">$616m</div><div class="d">of ${P.concentrations[0].value} at peak</div></div>
          <div class="kpi"><div class="k">Remaining vessels</div><div class="v num">${c.othersCount}</div><div class="d">${c.othersValue} combined</div></div>
          <div class="kpi"><div class="k">Declared values</div><div class="v num">${declared} / ${c.vessels.length}</div><div class="d">remainder estimated</div></div>
        </div>
        <table class="rt" style="margin-top:11px">
          <thead><tr><th>Vessel</th><th>Flag</th><th class="r">Risk score</th><th class="r">Insured value</th><th>Value basis</th><th class="r">Time in region</th></tr></thead>
          <tbody>
            ${c.vessels.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo, v.type)}</td>
                <td>${flag(v.flag)}</td>
                <td class="r">${scoreChip(v.score)}</td>
                <td class="r num" style="font-weight:600;color:#0f172a">${v.value}</td>
                <td><span class="pill ${v.basis === 'Declared' ? 'pill-green' : 'pill-amber'}">${v.basis}</span></td>
                <td class="r num">${v.dwell}</td>
              </tr>`).join('')}
            <tr>
              <td class="vn" style="color:#64748b">${c.othersCount} further vessels</td>
              <td></td><td class="r"></td>
              <td class="r num" style="color:#64748b">${c.othersValue}</td>
              <td></td><td class="r"></td>
            </tr>
          </tbody>
        </table>`, `The ten largest contributors by insured value at the peak in ${c.region}. Time in region is the continuous period spent inside the boundary.`)}
      ${foot(8)}
    </article>`;
  }

  /* ── Page 9 — insured value coverage ── */
  function page6() {
    const v = P.valueCoverage, t = P.valueTiers, maxT = Math.max(...t.map(x => x.valueNum));
    return `
    <article class="page" data-screen-label="Page 9">
      ${head('06 &middot; Insured value where available')}
      ${sec(ICO.coin, 'Value basis across accumulated vessels', `
        <div class="ind-grid cols-3">
          <div class="ind" style="background:#f0fdf4;border-color:#bbf7d0">
            <div class="ik">Client-declared values</div>
            <div class="iv num" style="color:#15803d">${v.declared.pct}%</div>
            <div class="id">${v.declared.vessels} vessels &middot; ${v.declared.value}</div>
          </div>
          <div class="ind" style="background:#fffbeb;border-color:#fde68a">
            <div class="ik">Estimated values</div>
            <div class="iv num" style="color:#b45309">${v.estimated.pct}%</div>
            <div class="id">${v.estimated.vessels} vessels &middot; ${v.estimated.value}</div>
          </div>
          <div class="ind" style="background:#fef2f2;border-color:#fecaca">
            <div class="ik">No value on file</div>
            <div class="iv num" style="color:#b91c1c">${v.none.pct}%</div>
            <div class="id">${v.none.vessels} vessels &middot; est. ${v.none.value}</div>
          </div>
        </div>`, v.method)}
      ${sec(ICO.chart, 'Accumulated value by value tier', `
        <table class="rt compact">
          <thead><tr><th>Value tier</th><th class="r">Vessels</th><th class="r">Accumulated value</th><th class="r">Share</th><th>Profile</th></tr></thead>
          <tbody>
            ${t.map(x => `
              <tr>
                <td class="vn">${x.tier}</td>
                <td class="r num">${x.vessels}</td>
                <td class="r num">${x.value}</td>
                <td class="r num">${(x.valueNum / 9.84 * 100).toFixed(1)}%</td>
                <td style="min-width:110px"><span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.valueNum / maxT * 100)}%;background:${x.color}"></span></span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Thirty-four vessels over $100m carry 43% of all accumulated value, so a single region peak can move the total sharply.')}
      ${sec(ICO.alert, 'Data coverage caveats', `
        <div class="chg">
          ${P.valueCaveats.map(x => `
            <div class="chg-row">
              <span class="chg-ico" style="background:${x.tone === 'amber' ? '#fffbeb' : '#f0fdf4'};color:${x.tone === 'amber' ? '#b45309' : '#15803d'}">${ic(ICO.alert, 12)}</span>
              <div><div class="chg-t">${x.t}</div><div class="chg-d">${x.d}</div></div>
              <div class="chg-m" style="font-weight:700;color:${x.tone === 'amber' ? '#b45309' : '#15803d'}">${x.m}</div>
            </div>`).join('')}
        </div>`)}
      ${foot(9)}
    </article>`;
  }

  window.aceReport = {
    Toolbar() {
      return `
      <div class="doc-toolbar no-print">
        <div style="display:flex;align-items:center;gap:14px;min-width:0">
          <a href="Reports.html" class="tb-btn" style="text-decoration:none" title="Back to Reports" aria-label="Back to Reports">${ic(ICO.back, 14)}<span class="tb-lbl">Reports</span></a>
          <div style="min-width:0">
            <div class="tb-title">Accumulation &amp; Concentration Exception Report</div>
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
