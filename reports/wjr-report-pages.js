/* War / JWC Risk Portfolio Exposure Report — page composition */
(function () {
  const P = window.WJR;
  const RF = window.reportFront;
  const TOTAL = 10;
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    swords:'<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/>',
    doc:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 13h6"/><path d="M9 17h4"/>',
    clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    pin:'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    layers:'<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="M2 12.5a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 .59-.92"/><path d="M2 17.5a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 .59-.92"/>',
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    trend:'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
    globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    chart:'<path d="M13 17V9"/><path d="M18 17V5"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-3"/>',
    print:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    back:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  };
  const flag = cc => `<img class="flagimg" src="https://flagcdn.com/w40/${cc}.png" srcset="https://flagcdn.com/w80/${cc}.png 2x" alt="${cc.toUpperCase()}" width="19" height="13" />`;
  const scoreChip = n => `<span class="score ${n > 60 ? 'sc-high' : n > 40 ? 'sc-med' : 'sc-low'}">${n}</span>`;
  const vStack = (name, imo, type) => `<div class="v-stack"><span class="v-name">${name}</span><span class="v-sub num">IMO ${imo}${type ? ' &middot; ' + type : ''}</span></div>`;
  const sevPill = s => `<span class="pill ${s === 'Serious' || s === 'Breach' ? 'pill-red' : s === 'Moderate' ? 'pill-amber' : 'pill-green'}">${s}</span>`;

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
      <span>War / JWC Risk Portfolio Exposure Report &middot; Real World</span>
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
      eyebrow: 'Monthly war risk report',
      title: 'War / JWC Risk<br />Portfolio Exposure',
      sub: 'Where the facility is exposed to war and Joint War Committee listed areas — who is inside right now, under which policy terms, for how long, where they sit, how the exposure concentrates, what has happened around them, and how the book compares with the global fleet.',
      subject: { k:'Facility', v:P.meta.portfolio, d:`${s.vesselsInside} vessels inside listed areas &middot; ${s.exposedValue} exposed &middot; ${s.breaches} warranty breaches` },
      meta: [['Reporting period', P.meta.period]],
      reportId: P.meta.reportId, owner: P.meta.owner, generatedOn: P.meta.generatedOn,
    });
  }

  function frontToc() {
    return RF.toc({
      head: head('Contents'), foot: foot(2),
      note: `Area definitions follow the ${P.meta.listing}. Page numbers refer to this document.`,
      rows: [
        { front:true, title:'Executive summary', sub:'War-risk position at a glance, headline findings for the period.', page:3 },
        { n:'01', title:'Vessels currently within area', sub:'Every vessel inside a listed area at period end, with warranty position.', page:4 },
        { n:'02', title:'War exposure page / policy details', sub:'Facility terms, limits, warranty clause and additional-premium basis.', page:5 },
        { n:'03', title:'Duration in region', sub:'Time spent inside listed areas by band and by area, with AP banding.', page:6 },
        { n:'04', title:'Current positions', sub:'Last reported position, course, speed and destination for each vessel inside.', page:7 },
        { n:'05', title:'Regional concentration', sub:'Vessels and insured value per listed area against its aggregation limit.', page:8 },
        { n:'06', title:'Relevant casualties / events', sub:'Security and casualty events in listed areas and portfolio proximity.', page:8 },
        { n:'07', title:'Change in exposure', sub:'Twelve-month movement in vessels and value inside listed areas.', page:9 },
        { n:'08', title:'Global fleet vs your fleet', sub:'Facility behaviour benchmarked against the global fleet for the period.', page:10 },
      ],
    });
  }

  function frontExec() {
    const s = P.summary, c = P.concentration;
    const maxV = Math.max(...c.map(x => x.valueNum));
    const maxD = Math.max(...P.durationByArea.map(x => x.transits));
    return RF.exec({
      head: head('Executive summary'), foot: foot(3),
      standfirst: `War-risk position for ${P.meta.portfolio} over ${P.meta.period}, against the ${P.meta.previous} report. Areas per the ${P.meta.listing}.`,
      hero: [
        { cls:'lead', k:'Insured value inside listed areas', v:s.exposedValue, d:`<span class="delta-up">${s.exposedValueDelta}</span> vs previous &middot; ${s.sharePct}% of the ${s.portfolioValue} facility`,
          meter:{ pinPct:s.sharePct, scale:[{at:0,l:'0% of facility'},{at:50,l:'50%'},{at:100,l:'100%'}], segments:[{pct:10,color:'#16a34a'},{pct:15,color:'#d97706'},{pct:75,color:'#dc2626'}] } },
        { cls:'warn', k:'Vessels inside now', v:s.vesselsInside, d:`<span class="delta-up">${s.vesselsDelta}</span> vs previous &middot; ${s.areas} areas monitored` },
        { cls:'warn', k:'Warranty breaches', v:s.breaches, d:`of ${s.transits} transits in the period` },
        { k:'Additional premium raised', v:s.apRaised, d:`<span class="delta-up">${s.apRaisedDelta}</span> vs previous` },
        { k:'Average time inside', v:s.avgDwell, d:`longest ${s.longestDwell}` },
        { cls:'warn', k:'Events in listed areas', v:s.events, d:'3 serious, 3 moderate' },
        { cls:'warn', k:'Transits in period', v:s.transits, d:'across all listed areas' },
      ],
      left: { title:'Exposed value by area', rows:c.map(x => ({ n:x.area, pct:Math.round(x.valueNum / maxV * 100), v:x.value, color:x.tone })) },
      right: { title:'Transits by area', rows:P.durationByArea.map(x => ({ n:x.area, pct:Math.round(x.transits / maxD * 100), v:x.transits })) },
      findings: { rows:P.findings },
    });
  }

  /* ── Page 4 — vessels currently within area ── */
  function page1() {
    const s = P.summary;
    return `
    <article class="page" data-screen-label="Page 4">
      ${head('01 &middot; Vessels currently within area')}
      ${sec(ICO.swords, 'Inside a listed area at period end', `
        <div class="kpi-grid cols-4">
          <div class="kpi accent"><div class="k">Vessels inside</div><div class="v num">${s.vesselsInside}</div><div class="d"><span class="delta-up">${s.vesselsDelta}</span> vs ${P.meta.previous}</div></div>
          <div class="kpi"><div class="k">Exposed value</div><div class="v num">${s.exposedValue}</div><div class="d"><span class="delta-up">${s.exposedValueDelta}</span></div></div>
          <div class="kpi"><div class="k">Warranty breaches</div><div class="v num">${s.breaches}</div><div class="d">3 with AP raised</div></div>
          <div class="kpi"><div class="k">AP raised</div><div class="v num">${s.apRaised}</div><div class="d">in the period</div></div>
        </div>
        <table class="rt" style="margin-top:11px">
          <thead><tr><th>Vessel</th><th>Flag</th><th>Listed area</th><th class="r">Entered</th><th class="r">Dwell</th><th class="r">Score</th><th class="r">Value</th><th>Warranty</th></tr></thead>
          <tbody>
            ${P.inside.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo, v.type)}</td>
                <td>${flag(v.flag)}</td>
                <td class="vn">${v.area}</td>
                <td class="r num">${v.since}</td>
                <td class="r num">${v.dwell}</td>
                <td class="r">${scoreChip(v.score)}</td>
                <td class="r num">${v.value}</td>
                <td><div class="v-stack">${sevPill(v.warranty)}<span class="v-sub">${v.notice}</span></div></td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.insideNote)}
      ${foot(4)}
    </article>`;
  }

  /* ── Page 5 — policy details ── */
  function page2() {
    const p = P.policy;
    const row = (k, v) => `<tr><td class="vn" style="width:210px">${k}</td><td>${v}</td></tr>`;
    return `
    <article class="page" data-screen-label="Page 5">
      ${head('02 &middot; War exposure page / policy details')}
      ${sec(ICO.doc, 'Policy terms', `
        <table class="rt">
          <tbody>
            ${row('Facility', p.facility)}
            ${row('Policy number', `<span class="num">${p.policyNo}</span>`)}
            ${row('Period of cover', `<span class="num">${p.inception} \u2013 ${p.expiry}</span>`)}
            ${row('Clause basis', p.basis)}
            ${row('Limit any one vessel', `<span class="num" style="font-weight:600;color:#0f172a">${p.limit}</span>`)}
            ${row('Aggregate any one event', `<span class="num" style="font-weight:600;color:#0f172a">${p.aggregate}</span>`)}
            ${row('Deductible', `<span class="num">${p.deductible}</span>`)}
          </tbody>
        </table>`, 'Extract from the war exposure page of the facility slip; the full wording governs in the event of a discrepancy.')}
      ${sec(ICO.alert, 'Warranty and additional premium', `
        <table class="rt">
          <tbody>
            ${row('Warranty clause', `<span style="font-weight:600;color:#b91c1c">${p.warrantyClause}</span>`)}
            ${row('AP basis', p.apBasis)}
            ${row('AP rate range', `<span class="num">${p.apRate}</span>`)}
            ${row('Remedy on breach', p.breachRemedy)}
          </tbody>
        </table>`, 'Entry without notice is a breach of warranty; cover is held only where notice is given promptly and the additional premium is paid.')}
      ${sec(ICO.chart, 'Facility position', `
        <div class="ind-grid cols-3">
          ${p.notes.map(n => `<div class="ind"><div class="ik">${n.k}</div><div class="iv num">${n.v}</div></div>`).join('')}
        </div>`)}
      ${foot(5)}
    </article>`;
  }

  /* ── Page 6 — duration in region ── */
  function page3() {
    const d = P.duration, maxT = Math.max(...d.map(x => x.transits));
    return `
    <article class="page" data-screen-label="Page 6">
      ${head('03 &middot; Duration in region')}
      ${sec(ICO.clock, 'Time spent inside listed areas', `
        <div class="dist">
          <div>
            <div class="dist-chart">
              ${d.map(x => `
                <div class="dist-col">
                  <span class="dist-val num">${x.transits}</span>
                  <span class="dist-bar" style="height:${Math.round(x.transits / maxT * 155)}px;background:${x.color}"></span>
                </div>`).join('')}
            </div>
            <div class="dist-x">${d.map(x => `<span>${x.band.replace(/ /g, '<br />')}</span>`).join('')}</div>
          </div>
          <div class="legend">
            ${d.map(x => `
              <div class="legend-row">
                <span class="sw" style="background:${x.color}"></span>
                <span>${x.pct}% &middot; ${x.apBand}</span>
                <span class="lv num">${x.transits}</span>
              </div>`).join('')}
          </div>
        </div>`, `${P.summary.transits} transits in the period. Additional premium is charged per seven-day period inside the area, so the two longest bands attract a second charge.`)}
      ${sec(ICO.swords, 'Duration by listed area', `
        <table class="rt">
          <thead><tr><th>Listed area</th><th class="r">Transits</th><th class="r">Average time</th><th class="r">Longest stay</th><th>AP band</th></tr></thead>
          <tbody>
            ${P.durationByArea.map(x => `
              <tr>
                <td class="vn">${x.area}</td>
                <td class="r num">${x.transits}</td>
                <td class="r num">${x.avg}</td>
                <td class="r num">${x.longest}</td>
                <td><span class="pill ${x.apBand === 'Band A' ? 'pill-red' : 'pill-amber'}">${x.apBand}</span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Band A areas attract the highest additional premium rate; Band C is the lowest. Average time is measured per transit, not per vessel.')}
      ${foot(6)}
    </article>`;
  }

  /* ── Page 7 — current positions ── */
  function page4() {
    return `
    <article class="page" data-screen-label="Page 7">
      ${head('04 &middot; Current positions')}
      ${sec(ICO.pin, 'Last reported position of each vessel inside a listed area', `
        <table class="rt">
          <thead><tr><th>Vessel</th><th class="r">Latitude</th><th class="r">Longitude</th><th>Area</th><th class="r">Speed</th><th class="r">Course</th><th>Destination</th><th>AIS</th></tr></thead>
          <tbody>
            ${P.positions.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo)}</td>
                <td class="r num">${v.lat}</td>
                <td class="r num">${v.lon}</td>
                <td>${v.area}</td>
                <td class="r num">${v.speed}</td>
                <td class="r num">${v.course}</td>
                <td><div class="v-stack"><span style="color:#0f172a">${v.dest}</span><span class="v-sub num">ETA ${v.eta}</span></div></td>
                <td><span class="pill ${v.ais === 'Live' ? 'pill-green' : 'pill-amber'}">${v.ais}</span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.positionNote)}
      ${foot(7)}
    </article>`;
  }

  /* ── Page 8 — concentration + events ── */
  function page5() {
    const c = P.concentration, maxV = Math.max(...c.map(x => x.valueNum));
    return `
    <article class="page" data-screen-label="Page 8">
      ${head('05\u201306 &middot; Concentration &amp; events')}
      ${sec(ICO.layers, 'Regional concentration', `
        <table class="rt">
          <thead><tr><th>Listed area</th><th>Band</th><th class="r">Vessels</th><th class="r">Value</th><th class="r">Peak</th><th class="r">Peak at</th><th class="r">Limit</th></tr></thead>
          <tbody>
            ${c.map(x => `
              <tr>
                <td class="vn">${x.area}</td>
                <td><span class="pill ${x.band === 'Band A' ? 'pill-red' : x.band === 'Band B' ? 'pill-amber' : 'pill-slate'}">${x.band}</span></td>
                <td class="r num">${x.vessels}</td>
                <td class="r num">${x.value}</td>
                <td class="r"><span class="score ${x.peak > x.limit ? 'sc-high' : 'sc-low'}">${x.peak}</span></td>
                <td class="r num">${x.at}</td>
                <td class="r num">${x.limit}</td>
              </tr>`).join('')}
          </tbody>
        </table>
        <div class="bar-list" style="margin-top:10px">
          ${c.slice(0, 4).map(x => `
            <div class="bl-row">
              <span class="bl-name">${x.area}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.valueNum / maxV * 100)}%;background:${x.tone}"></span></span>
              <span class="bl-val num">${x.value}</span>
            </div>`).join('')}
        </div>`, P.concNote)}
      ${sec(ICO.alert, 'Relevant casualties and events', `
        <table class="rt compact">
          <thead><tr><th>Date</th><th>Area</th><th>Event</th><th class="r">Our vessels</th><th class="r">Nearest</th><th>Severity</th></tr></thead>
          <tbody>
            ${P.events.map(e => `
              <tr>
                <td class="num">${e.date}</td>
                <td>${e.area}</td>
                <td><div class="v-stack"><span style="font-weight:600;color:#0f172a">${e.type}</span><span class="v-sub">${e.note}</span></div></td>
                <td class="r num">${e.ourVessels}</td>
                <td class="r num">${e.dist}</td>
                <td>${sevPill(e.sev)}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Events include third-party incidents; the proximity column gives the distance from the nearest portfolio vessel at the time.')}
      ${foot(8)}
    </article>`;
  }

  /* ── Page 9 — change in exposure ── */
  function page6() {
    const c = P.change, n = c.months.length;
    const x = i => 42 + i / (n - 1) * 624;
    const yV = v => 160 - v / 70 * 140;
    return `
    <article class="page" data-screen-label="Page 9">
      ${head('07 &middot; Change in exposure')}
      ${sec(ICO.trend, 'Vessels inside listed areas \u2014 12 months', `
        <div class="chart-wrap">
          <div class="chart-legend">
            <span class="cl-item"><span class="cl-sw"></span>Vessels inside at month end</span>
            <span class="cl-item"><span class="cl-line" style="border-top-color:#b91c1c"></span>Exposed value ($bn)</span>
          </div>
          <svg viewBox="0 0 700 200" class="linechart" role="img" aria-label="Vessels inside listed areas and exposed insured value by month over twelve months">
            ${[0, 20, 40, 60].map(g => {
              const gy = yV(g);
              return `<line x1="42" y1="${gy.toFixed(1)}" x2="666" y2="${gy.toFixed(1)}" stroke="${g === 0 ? '#cbd5e1' : '#f1f5f9'}" stroke-width="1" /><text x="34" y="${(gy + 3.5).toFixed(1)}" text-anchor="end" class="ax-lbl">${g}</text>`;
            }).join('')}
            <line x1="42" y1="20" x2="42" y2="160" stroke="#cbd5e1" stroke-width="1" />
            ${c.vessels.map((v, i) => {
              const bw = 624 / n * 0.52, bx = x(i) - bw / 2, by = yV(v);
              return `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${(160 - by).toFixed(1)}" rx="3" fill="var(--brand-600,#2d7ffb)" opacity="${i === n - 1 ? 1 : 0.72}" /><text x="${x(i).toFixed(1)}" y="${(by - 6).toFixed(1)}" text-anchor="middle" class="pt-lbl">${v}</text>`;
            }).join('')}
            <polyline points="${c.value.map((v, i) => `${x(i).toFixed(1)},${yV(v / 1.4 * 70 * 0.92).toFixed(1)}`).join(' ')}" fill="none" stroke="#b91c1c" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
            ${c.months.map((m, i) => `<text x="${x(i).toFixed(1)}" y="176" text-anchor="middle" class="ax-lbl">${m}</text>`).join('')}
            <text x="10" y="94" text-anchor="middle" class="ax-title" transform="rotate(-90 10 94)">Vessels inside</text>
            <text x="366" y="194" text-anchor="middle" class="ax-title">Month end</text>
          </svg>
        </div>`, 'Bars give the vessel count inside listed areas at each month end; the line tracks exposed insured value on the same axis, scaled to fit.')}
      ${sec(ICO.chart, 'Movement against the previous report', `
        <table class="rt">
          <thead><tr><th>Measure</th><th class="r">This period</th><th class="r">${P.meta.previous}</th><th class="r">Change</th><th>Direction</th></tr></thead>
          <tbody>
            ${P.changeRows.map(r => `
              <tr>
                <td class="vn">${r.k}</td>
                <td class="r num" style="font-weight:700;color:#0f172a">${r.now}</td>
                <td class="r num">${r.prev}</td>
                <td class="r"><span class="${r.tone === 'green' ? 'delta-down' : 'delta-up'} num">${r.d}</span></td>
                <td>${sevPill(r.tone === 'red' ? 'Serious' : r.tone === 'amber' ? 'Moderate' : 'Within')}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Direction reflects the underwriting effect of the movement rather than the arithmetic sign.')}
      ${foot(9)}
    </article>`;
  }

  /* ── Page 10 — global fleet vs your fleet ── */
  function page7() {
    return `
    <article class="page" data-screen-label="Page 10">
      ${head('08 &middot; Global fleet vs your fleet')}
      ${sec(ICO.globe, 'Facility benchmarked against the global fleet', `
        <table class="rt">
          <thead><tr><th>Measure</th><th class="r">Your fleet</th><th class="r">Global fleet</th><th>Comparison</th><th>Verdict</th></tr></thead>
          <tbody>
            ${P.benchmark.map(b => `
              <tr>
                <td class="vn">${b.k}</td>
                <td class="r num" style="font-weight:700;color:#0f172a">${b.ours}</td>
                <td class="r num">${b.global}</td>
                <td style="min-width:150px">
                  <div style="display:flex;flex-direction:column;gap:3px">
                    <span class="bl-track"><span class="bl-fill" style="width:${b.oursPct}%;background:${b.verdict === 'worse' ? '#b91c1c' : '#16a34a'}"></span></span>
                    <span class="bl-track"><span class="bl-fill" style="width:${b.globalPct}%;background:#cbd5e1"></span></span>
                  </div>
                </td>
                <td><span class="pill ${b.verdict === 'worse' ? 'pill-red' : 'pill-green'}">${b.verdict === 'worse' ? 'Above global' : 'Better than global'}</span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.benchmarkNote)}
      ${sec(ICO.chart, 'What the comparison means', `
        <div class="chg">
          <div class="chg-row">
            <span class="chg-ico" style="background:#fef2f2;color:#b91c1c">${ic(ICO.alert, 12)}</span>
            <div><div class="chg-t">The facility trades listed areas roughly twice as often as the global fleet</div><div class="chg-d">0.67 transits per vessel per year against 0.41 globally, and 12.3% of vessels were inside a listed area against 6.8% globally. This is a function of the trading pattern rather than of individual vessel behaviour.</div></div>
            <div class="chg-m" style="font-weight:700;color:#b91c1c">1.6\u00d7</div>
          </div>
          <div class="chg-row">
            <span class="chg-ico" style="background:#fffbeb;color:#b45309">${ic(ICO.clock, 12)}</span>
            <div><div class="chg-t">Vessels also stay inside longer than the global average</div><div class="chg-d">1d 22h per transit against 1d 08h globally, driven by Black Sea port waiting times and southern Red Sea convoy scheduling. Longer stays push more transits into a second AP period.</div></div>
            <div class="chg-m" style="font-weight:700;color:#b45309">+14h</div>
          </div>
          <div class="chg-row">
            <span class="chg-ico" style="background:#f0fdf4;color:#15803d">${ic(ICO.trend, 12)}</span>
            <div><div class="chg-t">Compliance and loss experience are both better than global</div><div class="chg-d">Notice compliance is 90.2% against 82.6%, and loss frequency inside listed areas is 0.39% against 0.51%. The exposure is higher in volume but better managed per transit.</div></div>
            <div class="chg-m" style="font-weight:700;color:#15803d">\u22120.12pts</div>
          </div>
        </div>`)}
      ${foot(10)}
    </article>`;
  }

  window.wjrReport = {
    Toolbar() {
      return `
      <div class="doc-toolbar no-print">
        <div style="display:flex;align-items:center;gap:14px;min-width:0">
          <a href="Reports.html" class="tb-btn" style="text-decoration:none" title="Back to Reports" aria-label="Back to Reports">${ic(ICO.back, 14)}<span class="tb-lbl">Reports</span></a>
          <div style="min-width:0">
            <div class="tb-title">War / JWC Risk Portfolio Exposure Report</div>
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
      return [frontCover(), frontToc(), frontExec(), page1(), page2(), page3(), page4(), page5(), page6(), page7()].join('');
    },
  };
})();
