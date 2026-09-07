/* Casualty Benchmark Report — page composition */
(function () {
  const P = window.CBR;
  const RF = window.reportFront;
  const TOTAL = 9;
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    scale:'<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    life:'<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    divide:'<circle cx="12" cy="6" r="1"/><line x1="5" x2="19" y1="12" y2="12"/><circle cx="12" cy="18" r="1"/>',
    pie:'<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>',
    chart:'<path d="M13 17V9"/><path d="M18 17V5"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-3"/>',
    clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    trend:'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    print:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    back:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  };
  const vStack = (name, imo, type) => `<div class="v-stack"><span class="v-name">${name}</span><span class="v-sub num">IMO ${imo}${type ? ' &middot; ' + type : ''}</span></div>`;
  const sevPill = s => `<span class="pill ${s === 'Serious' ? 'pill-red' : s === 'Moderate' ? 'pill-amber' : 'pill-green'}">${s}</span>`;
  const verdictPill = v => `<span class="pill ${v === 'worse' ? 'pill-red' : 'pill-green'}">${v === 'worse' ? 'Above peers' : 'Better than peers'}</span>`;
  const rateChip = n => `<span class="score ${n > 1.3 ? 'sc-high' : n > 0.9 ? 'sc-med' : 'sc-low'}">${n.toFixed(2)}</span>`;

  const head = (title) => `
    <div class="page-head">
      <div>
        <div class="ph-title">${title}</div>
        <div class="ph-meta">${P.meta.fleet} &middot; ${P.meta.window}</div>
      </div>
      <div class="ph-meta">${P.meta.reportId}</div>
    </div>`;
  const foot = (n) => `
    <div class="page-foot">
      <span>Casualty Benchmark Report &middot; Real World</span>
      <span class="num">Page ${n} of ${TOTAL}</span>
    </div>`;
  const sec = (icon, title, body, note) => `
    <section class="sec">
      <h2 class="sec-title">${ic(icon, 16)}${title}</h2>
      ${note ? `<p class="sec-note">${note}</p>` : ''}
      ${body}
    </section>`;
  /* three-way comparison bar: fleet / peer / global */
  const triBar = (f, p, g, max, unit) => `
    <div style="display:flex;flex-direction:column;gap:3px;min-width:120px">
      <span class="bl-track" title="Fleet"><span class="bl-fill" style="width:${Math.round(f / max * 100)}%;background:#b91c1c"></span></span>
      <span class="bl-track" title="Peer"><span class="bl-fill" style="width:${Math.round(p / max * 100)}%;background:#d97706"></span></span>
      <span class="bl-track" title="Global"><span class="bl-fill" style="width:${Math.round(g / max * 100)}%;background:#cbd5e1"></span></span>
    </div>`;
  const triLegend = `
    <div class="chart-legend" style="padding-bottom:2px">
      <span class="cl-item"><span class="cl-sw" style="background:#b91c1c"></span>Selected fleet</span>
      <span class="cl-item"><span class="cl-sw" style="background:#d97706"></span>Peer group</span>
      <span class="cl-item"><span class="cl-sw" style="background:#cbd5e1"></span>Global fleet</span>
    </div>`;

  /* ── Front matter ── */
  function frontCover() {
    const s = P.summary;
    return RF.cover({
      classLabel: 'Confidential',
      eyebrow: 'Casualty benchmark',
      title: 'Casualty<br />Benchmark Report',
      sub: 'How the fleet\u2019s casualty record compares with the population it should be measured against — its own history, a comparable peer group and the global fleet, cut by casualties per vessel, share of fleet affected, event type and vessel age.',
      subject: { k:'Selected fleet', v:P.meta.fleet, d:`${s.fleetVessels} vessels &middot; ${s.casualties} casualties &middot; rate ${s.rate} vs peer ${s.peerRate} &middot; ${s.verdict}` },
      meta: [['Reporting period', P.meta.period]],
      reportId: P.meta.reportId, owner: P.meta.owner, generatedOn: P.meta.generatedOn,
    });
  }

  function frontToc() {
    return RF.toc({
      head: head('Contents'), foot: foot(2),
      note: `Benchmark basis: ${P.meta.basis}. Page numbers refer to this document.`,
      rows: [
        { front:true, title:'Executive summary', sub:'Benchmark position at a glance, headline findings for the window.', page:3 },
        { n:'01', title:'Selected fleet casualty history', sub:'The fleet\u2019s own casualty record over the rolling window, quarter by quarter.', page:4 },
        { n:'02', title:'Comparable fleet / global population', sub:'How the peer group was selected and how each comparison population is sized.', page:5 },
        { n:'03', title:'Casualties per vessel', sub:'Normalised frequency measures against peer and global rates.', page:6 },
        { n:'04', title:'Percentage of fleet affected', sub:'Share of vessels recording a casualty, split by severity.', page:7 },
        { n:'05', title:'Casualty types', sub:'Event-type mix compared with the peer and global distributions.', page:7 },
        { n:'06', title:'Vessel age comparison', sub:'Casualty rate by age band against peers of the same age.', page:8 },
        { n:'07', title:'Relevant peer comparison', sub:'Named peer managers ranked by casualty rate, with the fleet in position.', page:9 },
      ],
    });
  }

  function frontExec() {
    const s = P.summary, t = P.types;
    const maxT = Math.max(...t.map(x => x.fleetPct));
    const a = P.age, maxA = Math.max(...a.map(x => x.fleetRate));
    return RF.exec({
      head: head('Executive summary'), foot: foot(3),
      standfirst: `${P.meta.fleet} benchmarked over ${P.meta.window.toLowerCase()} to ${P.meta.period.split('\u2013')[1].trim()}, against ${P.population.cohorts[1].fleets} comparable managers and the global fleet. ${P.meta.basis}.`,
      hero: [
        { cls:'lead', k:'Casualty rate per 100 vessels / year', v:s.rate, d:`<span class="delta-up">${s.vsPeer}</span> vs peer median ${s.peerRate} &middot; <span class="delta-up">${s.vsGlobal}</span> vs global ${s.globalRate}`,
          meter:{ pinPct:s.percentile, scale:[{at:0,l:'best in group'},{at:50,l:'median'},{at:100,l:'worst'}], segments:[{pct:40,color:'#16a34a'},{pct:20,color:'#d97706'},{pct:40,color:'#dc2626'}] } },
        { cls:'warn', k:'Casualties in window', v:s.casualties, d:`<span class="delta-up">${s.casualtiesDelta}</span> vs previous report &middot; ${s.serious} serious` },
        { cls:'warn', k:'Percentile in peer group', v:`${s.percentile}th`, d:`${s.verdict} &middot; rank ${P.peers[0].rank} of ${P.population.cohorts[1].fleets}` },
        { cls:'warn', k:'Fleet affected', v:`${s.affectedPct}%`, d:`${P.affected.fleet.affected} of ${s.fleetVessels} vessels &middot; peers ${s.peerAffectedPct}%` },
        { k:'Total reserve', v:s.reserve, d:`$231k per vessel &middot; peers $164k` },
        { cls:'warn', k:'Repeat-event vessels', v:P.perVessel.repeat.length, d:'one vessel accounts for four events' },
        { cls:'good', k:'Mean days to closure', v:'118', d:'against a peer 147 and global 163' },
      ],
      left: { title:'Casualty mix vs peer share', rows:t.slice(0,5).map(x => ({ n:x.type, pct:Math.round(x.fleetPct / maxT * 100), v:`${x.fleetPct}% / ${x.peerPct}%`, color:x.fleetPct > x.peerPct ? '#b91c1c' : '#16a34a' })) },
      right: { title:'Fleet casualty rate by age band', rows:a.slice(1).map(x => ({ n:x.band, pct:Math.round(x.fleetRate / maxA * 100), v:x.fleetRate.toFixed(2) })) },
      findings: { rows:P.findings },
    });
  }

  /* ── Page 4 — fleet casualty history ── */
  function page1() {
    const h = P.history, s = P.summary, n = h.quarters.length;
    const x = i => 42 + (i + 0.5) / n * 624;
    const y = v => 140 - v / 4 * 118;
    return `
    <article class="page" data-screen-label="Page 4">
      ${head('01 &middot; Selected fleet casualty history')}
      ${sec(ICO.life, 'Casualties by quarter against the peer average', `
        <div class="kpi-grid cols-4">
          <div class="kpi accent"><div class="k">Casualties in window</div><div class="v num">${s.casualties}</div><div class="d"><span class="delta-up">${s.casualtiesDelta}</span> vs ${P.meta.previous}</div></div>
          <div class="kpi"><div class="k">Serious or worse</div><div class="v num">${s.serious}</div><div class="d">${(s.serious / s.casualties * 100).toFixed(0)}% of the total</div></div>
          <div class="kpi"><div class="k">Total reserve</div><div class="v num">${s.reserve}</div><div class="d">$231k per vessel</div></div>
          <div class="kpi"><div class="k">Fleet size</div><div class="v num">${s.fleetVessels}</div><div class="d">average age ${P.ageSummary.fleetAvgAge} years</div></div>
        </div>
        <div class="chart-wrap" style="margin-top:12px">
          <div class="chart-legend">
            <span class="cl-item"><span class="cl-sw" style="background:#b91c1c"></span>Fleet casualties per quarter</span>
            <span class="cl-item"><span class="cl-line dash" style="border-top-color:#d97706"></span>Peer average, size-adjusted</span>
          </div>
          <svg viewBox="0 0 700 170" class="linechart" role="img" aria-label="Fleet casualties by quarter against the size-adjusted peer average">
            ${[0, 1, 2, 3, 4].map(g => {
              const gy = y(g);
              return `<line x1="42" y1="${gy.toFixed(1)}" x2="666" y2="${gy.toFixed(1)}" stroke="${g === 0 ? '#cbd5e1' : '#f1f5f9'}" stroke-width="1" /><text x="34" y="${(gy + 3.5).toFixed(1)}" text-anchor="end" class="ax-lbl">${g}</text>`;
            }).join('')}
            <line x1="42" y1="14" x2="42" y2="140" stroke="#cbd5e1" stroke-width="1" />
            ${h.fleet.map((v, i) => {
              const bw = 624 / n * 0.5, bx = x(i) - bw / 2, by = y(v);
              return `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${(140 - by).toFixed(1)}" rx="3" fill="#b91c1c" opacity="${i === n - 1 ? 1 : .8}" /><text x="${x(i).toFixed(1)}" y="${(by - 6).toFixed(1)}" text-anchor="middle" class="pt-lbl">${v}</text>`;
            }).join('')}
            <polyline points="${h.peer.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')}" fill="none" stroke="#d97706" stroke-width="2.5" stroke-dasharray="6 4" stroke-linejoin="round" />
            ${h.quarters.map((q, i) => `<text x="${x(i).toFixed(1)}" y="156" text-anchor="middle" class="ax-lbl">${q}</text>`).join('')}
            <text x="10" y="80" text-anchor="middle" class="ax-title" transform="rotate(-90 10 80)">Casualties</text>
          </svg>
        </div>`, 'The peer line is the peer-group casualty count scaled to a 64-vessel fleet, so the two series are directly comparable.')}
      ${sec(ICO.alert, 'Casualty record', `
        <table class="rt compact">
          <thead><tr><th>Date</th><th>Vessel</th><th>Type</th><th>Severity</th><th>Location</th><th class="r">Reserve</th><th>Status</th></tr></thead>
          <tbody>
            ${h.events.map(e => `
              <tr>
                <td class="num">${e.date}</td>
                <td>${vStack(e.name, e.imo)}</td>
                <td>${e.type}</td>
                <td>${sevPill(e.sev)}</td>
                <td>${e.loc}</td>
                <td class="r num">${e.reserve}</td>
                <td>${e.status}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, h.note)}
      ${foot(4)}
    </article>`;
  }

  /* ── Page 5 — comparable population ── */
  function page2() {
    const p = P.population, maxV = Math.max(...p.cohorts.map(x => x.rate));
    return `
    <article class="page" data-screen-label="Page 5">
      ${head('02 &middot; Comparable fleet / global population')}
      ${sec(ICO.users, `Peer group definition \u2014 ${p.peerName}`, `
        <table class="rt">
          <thead><tr><th>Criterion</th><th>Selected fleet</th><th>Peer inclusion rule</th></tr></thead>
          <tbody>
            ${p.peerCriteria.map(c => `
              <tr>
                <td class="vn">${c.k}</td>
                <td style="font-weight:600;color:#0f172a">${c.fleet}</td>
                <td>${c.peer}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'A manager must satisfy every criterion to enter the peer group; seventeen of 214 candidate managers qualified for this benchmark.')}
      ${sec(ICO.scale, 'Comparison populations', `
        <table class="rt">
          <thead><tr><th>Population</th><th class="r">Vessels</th><th class="r">Fleets</th><th class="r">Casualties</th><th class="r">Rate</th><th>Profile</th></tr></thead>
          <tbody>
            ${p.cohorts.map(c => `
              <tr${c.k === 'Selected fleet' ? ' style="background:#fef2f2"' : ''}>
                <td class="vn">${c.k}</td>
                <td class="r num">${c.vessels.toLocaleString()}</td>
                <td class="r num">${c.fleets}</td>
                <td class="r num">${c.casualties.toLocaleString()}</td>
                <td class="r">${rateChip(c.rate)}</td>
                <td style="min-width:120px"><span class="bl-track"><span class="bl-fill" style="width:${Math.round(c.rate / maxV * 100)}%;background:${c.color}"></span></span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Rate is casualties per 100 vessels per year across the same 24-month window, so each population is measured on identical terms.')}
      ${foot(5)}
    </article>`;
  }

  /* ── Page 6 — casualties per vessel ── */
  function page3() {
    const r = P.perVessel;
    return `
    <article class="page" data-screen-label="Page 6">
      ${head('03 &middot; Casualties per vessel')}
      ${sec(ICO.divide, 'Normalised frequency measures', `
        ${triLegend}
        <table class="rt">
          <thead><tr><th>Measure</th><th class="r">Fleet</th><th class="r">Peer</th><th class="r">Global</th><th>Comparison</th></tr></thead>
          <tbody>
            ${r.rows.map(x => {
              const nums = [x.fleet, x.peer, x.global].map(v => parseFloat(String(v).replace(/[^0-9.]/g, '')));
              const max = Math.max(...nums);
              return `
              <tr>
                <td class="vn">${x.k}</td>
                <td class="r num" style="font-weight:700;color:#0f172a">${x.fleet}</td>
                <td class="r num">${x.peer}</td>
                <td class="r num">${x.global}</td>
                <td><div style="display:flex;align-items:center;gap:8px">${triBar(nums[0], nums[1], nums[2], max)}${verdictPill(x.verdict)}</div></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>`, 'Every measure is normalised for fleet size and the same exposure window. Days to closure is the one measure where a lower fleet figure is favourable.')}
      ${sec(ICO.alert, 'Vessels with more than one casualty', `
        <table class="rt compact">
          <thead><tr><th>Vessel</th><th class="r">Events</th><th class="r">Reserve</th><th>Event types</th></tr></thead>
          <tbody>
            ${r.repeat.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo)}</td>
                <td class="r"><span class="score ${v.events > 3 ? 'sc-high' : 'sc-med'}">${v.events}</span></td>
                <td class="r num">${v.reserve}</td>
                <td>${v.types}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Three vessels account for nine of the nineteen casualties and $9.3m of the $14.8m reserved. Removing them would bring the fleet rate to 0.78, below the peer median.')}
      ${foot(6)}
    </article>`;
  }

  /* ── Page 7 — fleet affected + casualty types ── */
  function page4() {
    const a = P.affected, t = P.types;
    const maxS = Math.max(...a.bySeverity.map(x => x.fleet));
    const maxT = Math.max(...t.map(x => Math.max(x.fleetPct, x.peerPct, x.globalPct)));
    return `
    <article class="page" data-screen-label="Page 7">
      ${head('04\u201305 &middot; Fleet affected &amp; casualty types')}
      ${sec(ICO.pie, 'Percentage of fleet affected', `
        <div class="ind-grid cols-3">
          <div class="ind" style="background:#fef2f2;border-color:#fecaca">
            <div class="ik">Selected fleet</div>
            <div class="iv num" style="color:#b91c1c">${a.fleet.pct}%</div>
            <div class="id">${a.fleet.affected} of ${a.fleet.total} vessels</div>
          </div>
          <div class="ind" style="background:#fffbeb;border-color:#fde68a">
            <div class="ik">Peer group</div>
            <div class="iv num" style="color:#b45309">${a.peer.pct}%</div>
            <div class="id">${a.peer.affected} of ${a.peer.total.toLocaleString()} vessels</div>
          </div>
          <div class="ind" style="background:#f0fdf4;border-color:#bbf7d0">
            <div class="ik">Global fleet</div>
            <div class="iv num" style="color:#15803d">${a.global.pct}%</div>
            <div class="id">${a.global.affected.toLocaleString()} of ${a.global.total.toLocaleString()} vessels</div>
          </div>
        </div>
        ${triLegend}
        <table class="rt compact">
          <thead><tr><th>Worst severity recorded</th><th class="r">Fleet</th><th class="r">Peer</th><th class="r">Global</th><th>Comparison</th></tr></thead>
          <tbody>
            ${a.bySeverity.map(x => `
              <tr>
                <td class="vn">${x.sev}</td>
                <td class="r num" style="font-weight:700;color:#0f172a">${x.fleet}%</td>
                <td class="r num">${x.peer}%</td>
                <td class="r num">${x.global}%</td>
                <td>${triBar(x.fleet, x.peer, x.global, maxS)}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, a.note)}
      ${sec(ICO.chart, 'Casualty types against peer and global mix', `
        <table class="rt compact">
          <thead><tr><th>Event type</th><th class="r">Fleet</th><th class="r">Fleet share</th><th class="r">Peer share</th><th class="r">Global share</th><th class="r">Reserve</th><th>Comparison</th></tr></thead>
          <tbody>
            ${t.map(x => `
              <tr>
                <td class="vn">${x.type}</td>
                <td class="r num">${x.fleet}</td>
                <td class="r num" style="font-weight:700;color:${x.fleetPct > x.peerPct ? '#b91c1c' : '#15803d'}">${x.fleetPct}%</td>
                <td class="r num">${x.peerPct}%</td>
                <td class="r num">${x.globalPct}%</td>
                <td class="r num">${x.reserve}</td>
                <td>${triBar(x.fleetPct, x.peerPct, x.globalPct, maxT)}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.typeNote)}
      ${foot(7)}
    </article>`;
  }

  /* ── Page 8 — vessel age comparison ── */
  function page5() {
    const a = P.age, s = P.ageSummary;
    const maxR = Math.max(...a.map(x => Math.max(x.fleetRate, x.peerRate, x.globalRate)));
    return `
    <article class="page" data-screen-label="Page 8">
      ${head('06 &middot; Vessel age comparison')}
      ${sec(ICO.clock, 'Casualty rate by age band', `
        ${triLegend}
        <table class="rt">
          <thead><tr><th>Age band</th><th class="r">Fleet vessels</th><th class="r">Casualties</th><th class="r">Fleet rate</th><th class="r">Peer rate</th><th class="r">Global rate</th><th>Comparison</th></tr></thead>
          <tbody>
            ${a.map(x => `
              <tr>
                <td class="vn">${x.band}</td>
                <td class="r num">${x.fleetVessels}</td>
                <td class="r num">${x.fleetCas}</td>
                <td class="r">${rateChip(x.fleetRate)}</td>
                <td class="r num">${x.peerRate.toFixed(2)}</td>
                <td class="r num">${x.globalRate.toFixed(2)}</td>
                <td>${triBar(x.fleetRate, x.peerRate, x.globalRate, maxR)}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.ageNote)}
      ${sec(ICO.scale, 'Age-adjusted comparison', `
        <div class="kpi-grid cols-4">
          <div class="kpi"><div class="k">Fleet average age</div><div class="v num">${s.fleetAvgAge}</div><div class="d">years</div></div>
          <div class="kpi"><div class="k">Peer average age</div><div class="v num">${s.peerAvgAge}</div><div class="d">years</div></div>
          <div class="kpi"><div class="k">Global average age</div><div class="v num">${s.globalAvgAge}</div><div class="d">years</div></div>
          <div class="kpi accent"><div class="k">Age-adjusted fleet rate</div><div class="v num">${s.ageAdjustedRate}</div><div class="d">vs peer median ${P.summary.peerRate}</div></div>
        </div>
        <p class="sec-note" style="margin-top:9px">Re-weighting the fleet\u2019s casualty experience onto the peer age profile gives ${s.ageAdjustedRate} \u2014 ${s.ageAdjustedNote}. That is 17% above the peer median of ${P.summary.peerRate}, against 32% on the unadjusted figure, so roughly half the gap is explained by age and half is not.</p>`)}
      ${foot(8)}
    </article>`;
  }

  /* ── Page 9 — peer comparison ── */
  function page6() {
    const p = P.peers, maxR = Math.max(...p.map(x => x.rate));
    return `
    <article class="page" data-screen-label="Page 9">
      ${head('07 &middot; Relevant peer comparison')}
      ${sec(ICO.users, 'Named peer managers ranked by casualty rate', `
        <table class="rt">
          <thead><tr><th>Manager</th><th class="r">Vessels</th><th class="r">Rate</th><th class="r">Affected</th><th class="r">Serious</th><th class="r">Reserve / vsl</th></tr></thead>
          <tbody>
            ${p.map(x => `
              <tr${x.self ? ' style="background:#fef2f2"' : x.median ? ' style="background:#f8fafc"' : ''}>
                <td><div class="v-stack"><span style="font-weight:600;color:#0f172a;${x.self ? 'font-weight:700;color:#b91c1c' : x.median ? 'font-style:italic;color:#475569' : ''}">${x.name}</span><span class="v-sub num">Rank ${x.rank} of 17</span></div></td>
                <td class="r num">${x.vessels}</td>
                <td class="r">${rateChip(x.rate)}</td>
                <td class="r num">${x.affected}%</td>
                <td class="r num">${x.serious}</td>
                <td class="r num">${x.reserve}</td>
              </tr>`).join('')}
          </tbody>
        </table>
        <div class="bar-list" style="margin-top:11px">
          ${p.map(x => `
            <div class="bl-row">
              <span class="bl-name" style="${x.self ? 'font-weight:700;color:#b91c1c' : ''}">${x.name.split(' \u2014 ')[1] || x.name}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.rate / maxR * 100)}%;background:${x.self ? '#b91c1c' : x.median ? '#d97706' : '#cbd5e1'}"></span></span>
              <span class="bl-val num">${x.rate.toFixed(2)}</span>
            </div>`).join('')}
        </div>`, P.peerNote)}
      ${sec(ICO.trend, 'Where this leaves the fleet', `
        <div class="chg">
          <div class="chg-row">
            <span class="chg-ico" style="background:#fef2f2;color:#b91c1c">${ic(ICO.alert, 12)}</span>
            <div><div class="chg-t">Fourth-worst of the six named peers, 13th of 17 overall</div><div class="chg-d">The fleet sits in the 74th percentile of its comparison group. Three peers of similar size and trading pattern record materially lower rates, so the gap is not explained by the peer set being unrepresentative.</div></div>
            <div class="chg-m" style="font-weight:700;color:#b91c1c">74th</div>
          </div>
          <div class="chg-row">
            <span class="chg-ico" style="background:#fffbeb;color:#b45309">${ic(ICO.alert, 12)}</span>
            <div><div class="chg-t">Three vessels carry the gap</div><div class="chg-d">Excluding NORDIC FALCON, KESTREL BAY and BALTIC HERON the fleet rate falls to 0.78, which would rank 4th of 17. Targeted intervention on three hulls closes almost the whole differential.</div></div>
            <div class="chg-m" style="font-weight:700;color:#b45309">0.78</div>
          </div>
          <div class="chg-row">
            <span class="chg-ico" style="background:#f0fdf4;color:#15803d">${ic(ICO.trend, 12)}</span>
            <div><div class="chg-t">Claims handling is the fleet\u2019s clear strength</div><div class="chg-d">Mean closure in 118 days against a peer 147 and global 163, and no casualty in the window has remained open beyond twelve months.</div></div>
            <div class="chg-m" style="font-weight:700;color:#15803d">\u221229 days</div>
          </div>
        </div>`)}
      ${foot(9)}
    </article>`;
  }

  window.cbrReport = {
    Toolbar() {
      return `
      <div class="doc-toolbar no-print">
        <div style="display:flex;align-items:center;gap:14px;min-width:0">
          <a href="Reports.html" class="tb-btn" style="text-decoration:none" title="Back to Reports" aria-label="Back to Reports">${ic(ICO.back, 14)}<span class="tb-lbl">Reports</span></a>
          <div style="min-width:0">
            <div class="tb-title">Casualty Benchmark Report</div>
            <div class="tb-sub num">${P.meta.fleet} &middot; ${P.meta.window} &middot; ${TOTAL} pages (A4)</div>
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
