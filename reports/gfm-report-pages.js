/* Global Fleet & Market Intelligence Report — page composition */
(function () {
  const P = window.GFM;
  const RF = window.reportFront;
  const TOTAL = 11;
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    ship:'<path d="M12 10.189V14"/><path d="M12 2v3"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"/><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    flag2:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    chart:'<path d="M13 17V9"/><path d="M18 17V5"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-3"/>',
    life:'<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
    shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    trend:'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    down:'<path d="M8 17h6v-6"/><path d="m2 7 8.5 8.5 5-5L22 17"/>',
    print:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    back:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  };
  const flag = cc => `<img class="flagimg" src="https://flagcdn.com/w40/${cc}.png" srcset="https://flagcdn.com/w80/${cc}.png 2x" alt="${cc.toUpperCase()}" width="19" height="13" />`;
  const scoreChip = n => `<span class="score ${n > 50 ? 'sc-high' : n > 38 ? 'sc-med' : 'sc-low'}">${n}</span>`;
  const dChip = d => `<span class="${String(d).startsWith('-') ? 'delta-down' : 'delta-up'} num">${d}</span>`;

  const head = (title) => `
    <div class="page-head">
      <div>
        <div class="ph-title">${title}</div>
        <div class="ph-meta">${P.meta.scope} &middot; ${P.meta.period}</div>
      </div>
      <div class="ph-meta">${P.meta.reportId}</div>
    </div>`;
  const foot = (n) => `
    <div class="page-foot">
      <span>Global Fleet &amp; Market Intelligence Report &middot; Real World</span>
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
      eyebrow: 'Monthly market intelligence',
      title: 'Global Fleet &amp; Market<br />Intelligence Report',
      sub: 'The state of the world merchant fleet — what it is made of by type, age, flag and management, how it scores, its casualty and compliance record, where it trades, and the market trends reshaping it.',
      subject: { k:'Scope', v:P.meta.scope, d:`${s.vessels.toLocaleString()} vessels &middot; ${s.totalGt} &middot; ${s.insuredValue} aggregate value &middot; average score ${s.avgScore}` },
      meta: [['Reporting period', P.meta.period]],
      reportId: P.meta.reportId, owner: P.meta.owner, generatedOn: P.meta.generatedOn,
    });
  }

  function frontToc() {
    return RF.toc({
      head: head('Contents'), foot: foot(2),
      note: `Universe: ${P.meta.universe} of 300 GT and above. Scores are Real World Risk Scores on a 0\u2013100 scale. Page numbers refer to this document.`,
      rows: [
        { front:true, title:'Executive summary', sub:'Global fleet position at a glance, headline findings for the period.', page:3 },
        { n:'01', title:'Global fleet composition', sub:'Vessel count, tonnage, value and the twelve-month growth path.', page:4 },
        { n:'02', title:'Vessel type', sub:'Fleet share, tonnage, age and score by vessel type.', page:5 },
        { n:'03', title:'Vessel age', sub:'Age band profile with tonnage and score.', page:5 },
        { n:'04', title:'Flag', sub:'Largest registries with standing, growth and score.', page:6 },
        { n:'05', title:'Owner / technical manager', sub:'Largest managers and owners, and how concentrated the market is.', page:7 },
        { n:'06', title:'Risk Score distribution', sub:'Score bands across the tracked fleet and how each moved.', page:8 },
        { n:'07', title:'Casualty activity', sub:'Casualty volume, type mix and the six-month trend.', page:9 },
        { n:'08', title:'Sanctions / compliance activity', sub:'Designated tonnage, dark activity and list-level movement.', page:9 },
        { n:'09', title:'Geographic activity', sub:'Port calls, vessels and casualties by region.', page:10 },
        { n:'10', title:'Selected market trends', sub:'Orderbook, pricing, registry shift and renewal dynamics.', page:11 },
      ],
    });
  }

  function frontExec() {
    const s = P.summary, d = P.distribution;
    const maxD = Math.max(...d.map(x => x.n));
    const maxT = Math.max(...P.byType.map(x => x.n));
    return RF.exec({
      head: head('Executive summary'), foot: foot(3),
      standfirst: `State of ${P.meta.universe} for ${P.meta.period}, against the ${P.meta.previous} report. Scores are Real World Risk Scores; casualty rates are per 100 vessels per year.`,
      hero: [
        { cls:'lead', k:'Vessels tracked', v:s.vessels.toLocaleString(), d:`<span class="delta-up">${s.vesselsDelta}</span> in period &middot; ${s.totalGt} &middot; ${s.insuredValue} aggregate value`,
          meter:{ pinPct:s.avgScore, scale:[{at:0,l:'score 0'},{at:39,l:'global 39.4'},{at:100,l:'100'}], segments:[{pct:25,color:'#16a34a'},{pct:25,color:'#84cc16'},{pct:10,color:'#d97706'},{pct:20,color:'#ea580c'},{pct:20,color:'#b91c1c'}] } },
        { cls:'warn', k:'Average risk score', v:s.avgScore, d:`<span class="delta-up">${s.avgScoreDelta}</span> in period` },
        { k:'Average fleet age', v:s.avgAge, d:`years &middot; <span class="delta-down">${s.avgAgeDelta}</span> in period` },
        { cls:'warn', k:'Casualties in period', v:s.casualties, d:'twelve-month high' },
        { cls:'warn', k:'Vessels with a list match', v:s.sanctionedVessels.toLocaleString(), d:'2.1% of the tracked fleet' },
        { cls:'good', k:'Deliveries / demolitions', v:`${s.deliveries}/${s.demolitions}`, d:`orderbook ${s.orderbookPct}% of fleet` },
        { k:'Newbuild price move', v:s.newbuildPrice, d:`scrap ${s.scrapPrice}` },
      ],
      left: { title:'Risk score distribution', rows:d.map(x => ({ n:`${x.band} (${x.range})`, pct:Math.round(x.n / maxD * 100), v:x.n.toLocaleString(), color:x.color })) },
      right: { title:'Fleet by vessel type', rows:P.byType.slice(0,5).map(x => ({ n:x.type, pct:Math.round(x.n / maxT * 100), v:x.n.toLocaleString(), color:x.color })) },
      findings: { rows:P.findings },
    });
  }

  /* ── Page 4 — global fleet composition ── */
  function page1() {
    const c = P.composition, g = c.growth, n = g.months.length;
    const x = i => 60 + (i + 0.5) / n * 600;
    const y = v => 132 - (v - 59000) / 2800 * 112;
    return `
    <article class="page" data-screen-label="Page 4">
      ${head('01 &middot; Global fleet composition')}
      ${sec(ICO.globe, 'The tracked fleet at period end', `
        <div class="ind-grid cols-3">
          ${c.headline.map(h => `<div class="ind"><div class="ik">${h.k}</div><div class="iv num">${h.v}</div><div class="id">${h.d}</div></div>`).join('')}
        </div>`, `Universe: ${P.meta.universe} of 300 GT and above, refreshed daily from AIS, class and registry sources.`)}
      ${sec(ICO.chart, 'Fleet growth \u2014 12 months', `
        <div class="chart-wrap">
          <div class="chart-legend"><span class="cl-item"><span class="cl-sw"></span>Vessels tracked at month end</span></div>
          <svg viewBox="0 0 700 160" class="linechart" role="img" aria-label="Vessels tracked at month end over twelve months">
            ${[59000, 59700, 60400, 61100, 61800].map(gv => {
              const gy = y(gv);
              return `<line x1="60" y1="${gy.toFixed(1)}" x2="660" y2="${gy.toFixed(1)}" stroke="${gv === 59000 ? '#cbd5e1' : '#f1f5f9'}" stroke-width="1" /><text x="52" y="${(gy + 3.5).toFixed(1)}" text-anchor="end" class="ax-lbl">${(gv / 1000).toFixed(1)}k</text>`;
            }).join('')}
            <line x1="60" y1="14" x2="60" y2="132" stroke="#cbd5e1" stroke-width="1" />
            <polyline points="${g.vessels.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')}" fill="none" stroke="var(--brand-600,#2d7ffb)" stroke-width="2.5" stroke-linejoin="round" />
            ${g.vessels.map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3.2" fill="#fff" stroke="var(--brand-600,#2d7ffb)" stroke-width="2" /><text x="${x(i).toFixed(1)}" y="${(y(v) - 9).toFixed(1)}" text-anchor="middle" class="pt-lbl">${(v / 1000).toFixed(1)}k</text>`).join('')}
            ${g.months.map((m, i) => `<text x="${x(i).toFixed(1)}" y="148" text-anchor="middle" class="ax-lbl">${m}</text>`).join('')}
            <text x="14" y="72" text-anchor="middle" class="ax-title" transform="rotate(-90 14 72)">Vessels</text>
          </svg>
        </div>`, 'The fleet grew 2.6% over twelve months, with the largest single-period addition in August as a delivery cluster landed.')}
      ${foot(4)}
    </article>`;
  }

  /* ── Page 5 — vessel type + age ── */
  function page2() {
    const t = P.byType, maxT = Math.max(...t.map(x => x.n));
    const a = P.byAge, maxA = Math.max(...a.map(x => x.n));
    return `
    <article class="page" data-screen-label="Page 5">
      ${head('02\u201303 &middot; Vessel type &amp; age')}
      ${sec(ICO.ship, 'Fleet by vessel type', `
        <table class="rt compact">
          <thead><tr><th>Vessel type</th><th class="r">Vessels</th><th class="r">Share</th><th class="r">Tonnage</th><th class="r">Avg age</th><th class="r">Avg score</th><th>Profile</th></tr></thead>
          <tbody>
            ${t.map(x => `
              <tr>
                <td class="vn">${x.type}</td>
                <td class="r num">${x.n.toLocaleString()}</td>
                <td class="r num">${x.pct}%</td>
                <td class="r num">${x.gt}</td>
                <td class="r num">${x.avgAge}</td>
                <td class="r">${scoreChip(x.avgScore)}</td>
                <td style="min-width:90px"><span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.n / maxT * 100)}%;background:${x.color}"></span></span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'General cargo tonnage dominates by count but holds only 11.6% of tonnage; crude tankers are the smallest segment by count and the worst-scoring.')}
      ${sec(ICO.clock, 'Fleet by vessel age', `
        <table class="rt compact">
          <thead><tr><th>Age band</th><th class="r">Vessels</th><th class="r">Share</th><th class="r">Tonnage</th><th class="r">Avg score</th><th>Profile</th></tr></thead>
          <tbody>
            ${a.map(x => `
              <tr>
                <td class="vn">${x.band}</td>
                <td class="r num">${x.n.toLocaleString()}</td>
                <td class="r num">${x.pct}%</td>
                <td class="r num">${x.gt}</td>
                <td class="r">${scoreChip(x.avgScore)}</td>
                <td style="min-width:110px"><span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.n / maxA * 100)}%;background:${x.color}"></span></span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.ageNote)}
      ${foot(5)}
    </article>`;
  }

  /* ── Page 6 — flag ── */
  function page3() {
    const f = P.byFlag, maxN = Math.max(...f.map(x => x.n));
    return `
    <article class="page" data-screen-label="Page 6">
      ${head('04 &middot; Flag')}
      ${sec(ICO.flag2, 'Largest registries and watchlisted flags', `
        <table class="rt">
          <thead><tr><th>Registry</th><th class="r">Vessels</th><th class="r">Share</th><th class="r">Avg age</th><th class="r">Avg score</th><th>Standing</th><th class="r">Net change</th></tr></thead>
          <tbody>
            ${f.map(x => `
              <tr>
                <td style="white-space:nowrap">${flag(x.flag)} <span style="font-weight:600;color:#0f172a">${x.name}</span></td>
                <td class="r num">${x.n.toLocaleString()}</td>
                <td class="r num">${x.pct}%</td>
                <td class="r num">${x.avgAge}</td>
                <td class="r">${scoreChip(x.avgScore)}</td>
                <td><span class="pill ${x.standing === 'Watchlisted' ? 'pill-red' : x.standing.includes('grey') ? 'pill-amber' : 'pill-green'}">${x.standing}</span></td>
                <td class="r">${dChip(x.delta)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
        <div class="bar-list" style="margin-top:11px">
          ${f.map(x => `
            <div class="bl-row">
              <span class="bl-name">${x.name}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.n / maxN * 100)}%;background:${x.standing === 'Watchlisted' ? '#b91c1c' : x.standing.includes('grey') ? '#d97706' : 'var(--brand-600,#2d7ffb)'}"></span></span>
              <span class="bl-val num">${x.n.toLocaleString()}</span>
            </div>`).join('')}
        </div>`, P.flagNote)}
      ${foot(6)}
    </article>`;
  }

  /* ── Page 7 — owner / technical manager ── */
  function page4() {
    const m = P.managers, maxN = Math.max(...m.map(x => x.n));
    const c = P.concentration;
    return `
    <article class="page" data-screen-label="Page 7">
      ${head('05 &middot; Owner / technical manager')}
      ${sec(ICO.users, 'Largest managers and owners by tracked vessels', `
        <table class="rt">
          <thead><tr><th>Party</th><th>Role</th><th class="r">Vessels</th><th class="r">Avg age</th><th class="r">Avg score</th><th class="r">Casualty rate</th><th>Profile</th></tr></thead>
          <tbody>
            ${m.map(x => `
              <tr>
                <td class="vn">${x.name}</td>
                <td style="white-space:nowrap">${x.role}</td>
                <td class="r num">${x.n}</td>
                <td class="r num">${x.avgAge}</td>
                <td class="r">${scoreChip(x.avgScore)}</td>
                <td class="r num" style="font-weight:700;color:${x.tone === 'red' ? '#b91c1c' : x.tone === 'amber' ? '#b45309' : '#15803d'}">${x.casRate.toFixed(2)}</td>
                <td style="min-width:80px"><span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.n / maxN * 100)}%;background:${x.tone === 'red' ? '#b91c1c' : x.tone === 'amber' ? '#d97706' : '#16a34a'}"></span></span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.managerNote)}
      ${sec(ICO.chart, 'How concentrated the market is', `
        <div class="ind-grid cols-3">
          <div class="ind"><div class="ik">Top 10 managers</div><div class="iv num">${c.top10Pct}%</div><div class="id">of tracked vessels</div></div>
          <div class="ind"><div class="ik">Top 50 managers</div><div class="iv num">${c.top50Pct}%</div><div class="id">of tracked vessels</div></div>
          <div class="ind"><div class="ik">Single-vessel owners</div><div class="iv num">${c.singleVesselPct}%</div><div class="id">of tracked vessels</div></div>
        </div>`, 'The market remains highly fragmented: four vessels in ten sit with an owner holding just one hull, which is where score and casualty data are thinnest.')}
      ${foot(7)}
    </article>`;
  }

  /* ── Page 8 — risk score distribution ── */
  function page5() {
    const d = P.distribution, maxN = Math.max(...d.map(x => x.n));
    return `
    <article class="page" data-screen-label="Page 8">
      ${head('06 &middot; Risk Score distribution')}
      ${sec(ICO.chart, 'Score bands across the tracked fleet', `
        <div class="dist">
          <div>
            <div class="dist-chart">
              ${d.map(x => `
                <div class="dist-col">
                  <span class="dist-val num">${(x.n / 1000).toFixed(1)}k</span>
                  <span class="dist-bar" style="height:${Math.round(x.n / maxN * 160)}px;background:${x.color}"></span>
                </div>`).join('')}
            </div>
            <div class="dist-x">${d.map(x => `<span>${x.band}<br />${x.range}</span>`).join('')}</div>
          </div>
          <div class="legend">
            ${d.map(x => `
              <div class="legend-row">
                <span class="sw" style="background:${x.color}"></span>
                <span>${x.pct}% of fleet</span>
                <span class="lv">${dChip(x.delta)}</span>
              </div>`).join('')}
          </div>
        </div>`, P.distNote)}
      ${sec(ICO.alert, 'Where the worst scores sit', `
        <div class="ind-grid cols-3">
          <div class="ind" style="background:#fef2f2;border-color:#fecaca">
            <div class="ik">Worst-scoring type</div>
            <div class="iv num" style="color:#b91c1c">${P.byType[7].avgScore}</div>
            <div class="id">${P.byType[7].type} &middot; ${P.byType[7].n.toLocaleString()} vessels</div>
          </div>
          <div class="ind" style="background:#fef2f2;border-color:#fecaca">
            <div class="ik">Worst-scoring age band</div>
            <div class="iv num" style="color:#b91c1c">${P.byAge[5].avgScore}</div>
            <div class="id">${P.byAge[5].band} &middot; ${P.byAge[5].n.toLocaleString()} vessels</div>
          </div>
          <div class="ind" style="background:#fef2f2;border-color:#fecaca">
            <div class="ik">Worst-scoring registry</div>
            <div class="iv num" style="color:#b91c1c">${P.byFlag[8].avgScore}</div>
            <div class="id">${P.byFlag[8].name} &middot; ${P.byFlag[8].n} vessels</div>
          </div>
        </div>`, 'The three worst cuts intersect heavily: most severe-band vessels are tankers over 21 years old on a grey or watchlisted registry.')}
      ${foot(8)}
    </article>`;
  }

  /* ── Page 9 — casualty + compliance activity ── */
  function page6() {
    const c = P.casualties, s = c.summary, t = c.trend, n = t.months.length;
    const maxT = Math.max(...c.byType.map(x => x.n));
    const comp = P.compliance, maxL = Math.max(...comp.byList.map(x => x.vessels));
    const x = i => 34 + (i + 0.5) / n * 258;
    const y = v => 104 - (v - 340) / 100 * 84;
    return `
    <article class="page" data-screen-label="Page 9">
      ${head('07\u201308 &middot; Casualty &amp; compliance activity')}
      ${sec(ICO.life, 'Casualty activity', `
        <div class="kpi-grid cols-5">
          <div class="kpi accent"><div class="k">Casualties</div><div class="v num">${s.total}</div><div class="d"><span class="delta-up">${s.delta}</span></div></div>
          <div class="kpi"><div class="k">Serious</div><div class="v num">${s.serious}</div><div class="d">23% of total</div></div>
          <div class="kpi"><div class="k">Total losses</div><div class="v num">${s.totalLosses}</div><div class="d">in the period</div></div>
          <div class="kpi"><div class="k">Fatalities</div><div class="v num">${s.fatalities}</div><div class="d">four events</div></div>
          <div class="kpi"><div class="k">Global rate</div><div class="v num">${s.rate}</div><div class="d">per 100 vsl/yr</div></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 300px;gap:16px;align-items:start;margin-top:10px">
          <div class="bar-list">
            ${c.byType.map(v => `
              <div class="bl-row">
                <span class="bl-name">${v.type}</span>
                <span class="bl-track"><span class="bl-fill" style="width:${Math.round(v.n / maxT * 100)}%"></span></span>
                <span class="bl-val num">${v.n} &middot; ${v.pct}%</span>
              </div>`).join('')}
          </div>
          <svg viewBox="0 0 300 124" class="linechart" role="img" aria-label="Casualties by month over six months" style="width:100%">
            ${[340, 380, 420].map(g => {
              const gy = y(g);
              return `<line x1="34" y1="${gy.toFixed(1)}" x2="292" y2="${gy.toFixed(1)}" stroke="${g === 340 ? '#cbd5e1' : '#f1f5f9'}" stroke-width="1" /><text x="30" y="${(gy + 3).toFixed(1)}" text-anchor="end" class="ax-lbl">${g}</text>`;
            }).join('')}
            <line x1="34" y1="14" x2="34" y2="104" stroke="#cbd5e1" stroke-width="1" />
            <polyline points="${t.n.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')}" fill="none" stroke="#b91c1c" stroke-width="2" stroke-linejoin="round" />
            ${t.n.map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="2.6" fill="#fff" stroke="#b91c1c" stroke-width="1.8" />${i % 2 === 1 ? `<text x="${x(i).toFixed(1)}" y="${(y(v) - 7).toFixed(1)}" text-anchor="middle" class="pt-lbl">${v}</text>` : ''}`).join('')}
            ${t.months.map((m, i) => `<text x="${x(i).toFixed(1)}" y="118" text-anchor="middle" class="ax-lbl">${m.replace(' ', '')}</text>`).join('')}
          </svg>
        </div>`, 'Machinery damage accounts for just under a third of all casualties; the six-month trend shows August as the clear high.')}
      ${sec(ICO.shield, 'Sanctions / compliance activity', `
        <div class="ind-grid cols-3">
          ${comp.indicators.map(i => `<div class="ind"><div class="ik">${i.k}</div><div class="iv num">${i.v}</div><div class="id">${i.d}</div></div>`).join('')}
        </div>
        <table class="rt compact" style="margin-top:10px">
          <thead><tr><th>List</th><th class="r">Vessels designated</th><th class="r">Net change</th><th>Profile</th></tr></thead>
          <tbody>
            ${comp.byList.map(l => `
              <tr>
                <td class="vn">${l.list}</td>
                <td class="r num">${l.vessels}</td>
                <td class="r">${dChip(l.delta)}</td>
                <td style="min-width:130px"><span class="bl-track"><span class="bl-fill" style="width:${Math.round(l.vessels / maxL * 100)}%;background:${l.color}"></span></span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, comp.note)}
      ${foot(9)}
    </article>`;
  }

  /* ── Page 10 — geographic activity ── */
  function page7() {
    const g = P.geography, maxC = Math.max(...g.map(x => x.calls));
    return `
    <article class="page" data-screen-label="Page 10">
      ${head('09 &middot; Geographic activity')}
      ${sec(ICO.globe, 'Port calls, vessels and casualties by region', `
        <table class="rt">
          <thead><tr><th>Region</th><th class="r">Port calls</th><th class="r">Share</th><th class="r">Vessels</th><th class="r">Casualties</th><th class="r">Cas / 100k calls</th><th>Profile</th></tr></thead>
          <tbody>
            ${g.map(x => `
              <tr>
                <td class="vn">${x.region}</td>
                <td class="r num">${x.calls.toLocaleString()}</td>
                <td class="r num">${x.pct}%</td>
                <td class="r num">${x.vessels.toLocaleString()}</td>
                <td class="r num">${x.casualties}</td>
                <td class="r num" style="font-weight:700;color:${(x.casualties / x.calls * 100000) > 60 ? '#b91c1c' : '#334155'}">${(x.casualties / x.calls * 100000).toFixed(0)}</td>
                <td style="min-width:90px"><span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.calls / maxC * 100)}%;background:${x.tone}"></span></span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.geoNote)}
      ${foot(10)}
    </article>`;
  }

  /* ── Page 11 — market trends ── */
  function page8() {
    const tone = t => t === 'red' ? '#b91c1c' : t === 'amber' ? '#b45309' : '#15803d';
    const bg = t => t === 'red' ? '#fef2f2' : t === 'amber' ? '#fffbeb' : '#f0fdf4';
    return `
    <article class="page" data-screen-label="Page 11">
      ${head('10 &middot; Selected market trends')}
      ${sec(ICO.trend, 'Trends reshaping the fleet', `
        <div class="chg">
          ${P.trends.map(x => `
            <div class="chg-row">
              <span class="chg-ico" style="background:${bg(x.tone)};color:${tone(x.tone)}">${ic(x.dir === 'down' ? ICO.down : x.dir === 'up' ? ICO.trend : ICO.chart, 12)}</span>
              <div><div class="chg-t">${x.t}</div><div class="chg-d">${x.d}</div></div>
              <div class="chg-m" style="font-weight:700;color:${tone(x.tone)}">${x.m}</div>
            </div>`).join('')}
        </div>`, 'Trends are drawn from the tracked fleet, published orderbook data and broker-reported pricing for the period.')}
      ${sec(ICO.chart, 'What this means for the book', `
        <table class="rt compact">
          <thead><tr><th>Development</th><th>Underwriting implication</th><th class="r">Horizon</th></tr></thead>
          <tbody>
            <tr><td class="vn">Orderbook at 11.8% of fleet</td><td>Replacement of 20-plus year tonnage accelerates; expect the severe band to shrink from 2027 as older hulls exit.</td><td class="r num">2027\u201328</td></tr>
            <tr><td class="vn">Newbuild prices up 4.2%</td><td>Insured values on delivered tonnage rise; review sums insured at renewal to avoid under-insurance.</td><td class="r num">Immediate</td></tr>
            <tr><td class="vn">Watchlisted registries growing</td><td>Older tonnage migrating out of mainstream flags concentrates sanctions and casualty risk in a small, identifiable cohort.</td><td class="r num">Ongoing</td></tr>
            <tr><td class="vn">Dark activity up 8%</td><td>Screening cadence and AIS-gap thresholds should be reviewed for tanker tonnage over 18 years.</td><td class="r num">Immediate</td></tr>
            <tr><td class="vn">Firm scrap prices</td><td>Demolition running above trend pulls the worst-scoring general cargo tonnage out of the market faster than modelled.</td><td class="r num">6\u201312 months</td></tr>
          </tbody>
        </table>`)}
      ${foot(11)}
    </article>`;
  }

  window.gfmReport = {
    Toolbar() {
      return `
      <div class="doc-toolbar no-print">
        <div style="display:flex;align-items:center;gap:14px;min-width:0">
          <a href="Reports.html" class="tb-btn" style="text-decoration:none" title="Back to Reports" aria-label="Back to Reports">${ic(ICO.back, 14)}<span class="tb-lbl">Reports</span></a>
          <div style="min-width:0">
            <div class="tb-title">Global Fleet &amp; Market Intelligence Report</div>
            <div class="tb-sub num">${P.meta.scope} &middot; ${P.meta.period} &middot; ${TOTAL} pages (A4)</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <button class="tb-btn" id="rp-print" title="Print" aria-label="Print">${ic(ICO.print, 14)}<span class="tb-lbl">Print</span></button>
          <button class="tb-btn" id="rp-pdf" title="Download PDF" aria-label="Download PDF">${ic(ICO.dl, 14)}<span class="tb-lbl">PDF</span></button>
        </div>
      </div>`;
    },
    Pages() {
      return [frontCover(), frontToc(), frontExec(), page1(), page2(), page3(), page4(), page5(), page6(), page7(), page8()].join('');
    },
  };
})();
