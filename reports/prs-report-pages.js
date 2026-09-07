/* Portfolio Risk Score Report — page composition */
(function () {
  const P = window.PRS;
  const RF = window.reportFront;
  const TOTAL = 9;
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    gauge:'<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    chart:'<path d="M13 17V9"/><path d="M18 17V5"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-3"/>',
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    swap:'<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/>',
    ship:'<path d="M12 10.189V14"/><path d="M12 2v3"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"/><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    flag2:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    trend:'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
    print:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    back:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  };
  const flag = cc => `<img class="flagimg" src="https://flagcdn.com/w40/${cc}.png" srcset="https://flagcdn.com/w80/${cc}.png 2x" alt="${cc.toUpperCase()}" width="19" height="13" />`;
  const scoreChip = n => `<span class="score ${n > 60 ? 'sc-high' : n > 40 ? 'sc-med' : 'sc-low'}">${n}</span>`;
  const vStack = (name, imo, type) => `<div class="v-stack"><span class="v-name">${name}</span><span class="v-sub num">IMO ${imo}${type ? ' &middot; ' + type : ''}</span></div>`;
  const dChip = d => `<span class="${d.startsWith('-') ? 'delta-down' : 'delta-up'} num">${d}</span>`;

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
      <span>Portfolio Risk Score Report &middot; Real World</span>
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
    const a = P.average;
    return RF.cover({
      classLabel: 'Confidential',
      eyebrow: 'Monthly risk score report',
      title: 'Portfolio Risk<br />Score Report',
      sub: 'How the book scores and why — the portfolio average and its distribution, the vessels at each end of the scale, and the score cut by vessel type, age, flag and management, with the twelve-month trend behind it.',
      subject: { k:'Portfolio', v:P.meta.portfolio, d:`${a.vessels.toLocaleString()} vessels &middot; average ${a.score} (${a.band}) &middot; ${a.weighted} weighted by value` },
      meta: [['Reporting period', P.meta.period]],
      reportId: P.meta.reportId, owner: P.meta.owner, generatedOn: P.meta.generatedOn,
    });
  }

  function frontToc() {
    return RF.toc({
      head: head('Contents'), foot: foot(2),
      note: `Score basis: ${P.meta.basis}. Page numbers refer to this document.`,
      rows: [
        { front:true, title:'Executive summary', sub:'Score position at a glance, headline findings for the period.', page:3 },
        { n:'01', title:'Average Risk Score', sub:'Portfolio mean, median and value-weighted average with period movement.', page:4 },
        { n:'02', title:'Risk Score distribution', sub:'Vessel counts by score band and how each band moved in the period.', page:4 },
        { n:'03', title:'Highest-scoring vessels', sub:'The ten worst scores in the book with their primary drivers.', page:5 },
        { n:'04', title:'Largest score increases / decreases', sub:'The biggest movements in both directions and the cause of each.', page:6 },
        { n:'05', title:'Risk Score by vessel type', sub:'Average score, movement and high-score count per vessel type.', page:7 },
        { n:'06', title:'Risk Score by vessel age', sub:'Average score by age band with high-score concentration.', page:7 },
        { n:'07', title:'Risk Score by flag', sub:'Average score per registry against its Paris MoU standing.', page:8 },
        { n:'08', title:'Risk Score by owner / technical manager', sub:'Average score per owner and manager, with their worst vessel.', page:8 },
        { n:'09', title:'Risk Score trends', sub:'Twelve-month trend for the portfolio and its tanker and dry cargo segments.', page:9 },
      ],
    });
  }

  function frontExec() {
    const a = P.average, d = P.distribution;
    const maxD = Math.max(...d.map(x => x.count));
    const maxT = Math.max(...P.byType.map(x => x.avg));
    const high = d[3].count + d[4].count;
    return RF.exec({
      head: head('Executive summary'), foot: foot(3),
      standfirst: `Score position for ${P.meta.portfolio} at ${P.meta.period.split('\u2013')[1].trim()}, against the ${P.meta.previous} report. ${P.meta.basis}.`,
      hero: [
        { cls:'lead', k:'Average Real World Risk Score', v:a.score, d:`<span class="delta-up">${a.delta}</span> vs previous &middot; ${a.band} band &middot; 12m range ${a.twelveMonthLow}\u2013${a.twelveMonthHigh}`,
          meter:{ pinPct:a.score, scale:[{at:0,l:'0'},{at:25,l:'25'},{at:50,l:'50'},{at:100,l:'100'}], segments:[{pct:25,color:'#16a34a'},{pct:25,color:'#84cc16'},{pct:10,color:'#d97706'},{pct:20,color:'#ea580c'},{pct:20,color:'#b91c1c'}] } },
        { k:'Value-weighted average', v:a.weighted, d:'higher than the unweighted mean' },
        { k:'Median score', v:a.median, d:`across ${a.scored.toLocaleString()} scored vessels` },
        { cls:'warn', k:'Vessels scoring 61+', v:high, d:`${(high / a.scored * 100).toFixed(1)}% of the book &middot; ${d[4].count} severe` },
        { cls:'good', k:'Vessels scoring 0\u201325', v:d[0].count, d:`${d[0].pct}% in the good band (${d[0].delta})` },
        { cls:'warn', k:'Worst-scoring segment', v:P.byType[0].avg, d:`${P.byType[0].type} &middot; ${dChip(P.byType[0].delta)}` },
        { cls:'warn', k:'Worst-scoring registry', v:P.byFlag[6].avg, d:`${P.byFlag[6].name} &middot; ${P.byFlag[6].vessels} vessels` },
      ],
      left: { title:'Score distribution', rows:d.map(x => ({ n:`${x.band} (${x.range})`, pct:Math.round(x.count / maxD * 100), v:x.count, color:x.color })) },
      right: { title:'Average score by vessel type', rows:P.byType.slice(0,5).map(x => ({ n:x.type, pct:Math.round(x.avg / maxT * 100), v:x.avg })) },
      findings: { rows:P.findings },
    });
  }

  /* ── Page 4 — average + distribution ── */
  function page1() {
    const a = P.average, d = P.distribution;
    const maxD = Math.max(...d.map(x => x.count));
    return `
    <article class="page" data-screen-label="Page 4">
      ${head('01\u201302 &middot; Average score &amp; distribution')}
      ${sec(ICO.gauge, 'Average Risk Score', `
        <div class="kpi-grid cols-4">
          <div class="kpi accent"><div class="k">Portfolio average</div><div class="v num">${a.score}</div><div class="d"><span class="delta-up">${a.delta}</span> vs ${P.meta.previous}</div></div>
          <div class="kpi"><div class="k">Value-weighted</div><div class="v num">${a.weighted}</div><div class="d">${a.weightedNote}</div></div>
          <div class="kpi"><div class="k">Median</div><div class="v num">${a.median}</div><div class="d">${a.scored.toLocaleString()} scored vessels</div></div>
          <div class="kpi"><div class="k">12-month range</div><div class="v num">${a.twelveMonthLow}\u2013${a.twelveMonthHigh}</div><div class="d">current is the 12m high</div></div>
        </div>
        <table class="rt compact" style="margin-top:11px">
          <tbody>
            <tr><td class="vn">Best-scoring book</td><td>${a.best}</td><td class="vn">Worst-scoring book</td><td>${a.worst}</td></tr>
            <tr><td class="vn">Vessels in scope</td><td class="num">${a.vessels.toLocaleString()}</td><td class="vn">Score coverage</td><td class="num">${a.coveragePct}% (${a.scored.toLocaleString()} scored)</td></tr>
          </tbody>
        </table>`, `${P.meta.basis}. The value-weighted average sits above the unweighted mean, meaning the larger exposures carry the worse scores.`)}
      ${sec(ICO.chart, 'Risk Score distribution', `
        <div class="dist">
          <div>
            <div class="dist-chart">
              ${d.map(x => `
                <div class="dist-col">
                  <span class="dist-val num">${x.count}</span>
                  <span class="dist-bar" style="height:${Math.round(x.count / maxD * 160)}px;background:${x.color}"></span>
                </div>`).join('')}
            </div>
            <div class="dist-x">${d.map(x => `<span>${x.band}<br />${x.range}</span>`).join('')}</div>
          </div>
          <div class="legend">
            ${d.map(x => `
              <div class="legend-row">
                <span class="sw" style="background:${x.color}"></span>
                <span>${x.band} &middot; ${x.pct}%</span>
                <span class="lv">${dChip(x.delta)}</span>
              </div>`).join('')}
          </div>
        </div>`, 'Change column shows the movement in vessel count for each band since the previous report.')}
      ${foot(4)}
    </article>`;
  }

  /* ── Page 5 — highest scoring vessels ── */
  function page2() {
    return `
    <article class="page" data-screen-label="Page 5">
      ${head('03 &middot; Highest-scoring vessels')}
      ${sec(ICO.alert, 'The ten highest scores in the portfolio', `
        <table class="rt">
          <thead><tr>
            <th>Vessel</th><th>Flag</th><th class="r">Age</th><th class="r">Score</th><th class="r">Prev</th><th class="r">Move</th><th>Primary driver</th><th class="r">Value</th>
          </tr></thead>
          <tbody>
            ${P.highest.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo, v.type)}</td>
                <td>${flag(v.flag)}</td>
                <td class="r num">${v.age}</td>
                <td class="r">${scoreChip(v.score)}</td>
                <td class="r num">${v.prev}</td>
                <td class="r">${dChip('+' + (v.score - v.prev))}</td>
                <td>${v.driver}</td>
                <td class="r num">${v.value}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Ordered by current score. Age is years since build; the driver column names the largest single contributor to the score.')}
      ${sec(ICO.chart, 'Where the high scores sit', `
        <div class="ind-grid cols-3">
          <div class="ind"><div class="ik">Tanker segments</div><div class="iv num">${P.byType[0].high + P.byType[1].high + P.byType[2].high}</div><div class="id">of ${P.distribution[3].count + P.distribution[4].count} vessels scoring 61+</div></div>
          <div class="ind"><div class="ik">Aged 21 years or more</div><div class="iv num">${P.byAge[4].high + P.byAge[5].high}</div><div class="id">from just ${P.byAge[4].vessels + P.byAge[5].vessels} hulls</div></div>
          <div class="ind"><div class="ik">Watchlisted registries</div><div class="iv num">${P.byFlag[6].high + P.byFlag[7].high}</div><div class="id">from ${P.byFlag[6].vessels + P.byFlag[7].vessels} vessels on two flags</div></div>
        </div>`)}
      ${foot(5)}
    </article>`;
  }

  /* ── Page 6 — increases and decreases ── */
  function page3() {
    const moveTable = (rows, dir) => `
      <table class="rt">
        <thead><tr><th>Vessel</th><th class="r">From</th><th class="r">To</th><th class="r">Change</th><th>Cause of movement</th></tr></thead>
        <tbody>
          ${rows.map(v => `
            <tr>
              <td>${vStack(v.name, v.imo)}</td>
              <td class="r num">${v.from}</td>
              <td class="r">${scoreChip(v.to)}</td>
              <td class="r"><span class="${dir === 'up' ? 'delta-up' : 'delta-down'} num">${dir === 'up' ? '+' : '\u2212'}${v.delta}</span></td>
              <td>${v.cause}</td>
            </tr>`).join('')}
        </tbody>
      </table>`;
    return `
    <article class="page" data-screen-label="Page 6">
      ${head('04 &middot; Largest score movements')}
      ${sec(ICO.swap, 'Largest score increases', moveTable(P.increases, 'up'),
        'The five biggest deteriorations in the period. Movements of ten points or more are treated as material.')}
      ${sec(ICO.swap, 'Largest score decreases', moveTable(P.decreases, 'down'),
        'The five biggest improvements. The score responds within the period once the underlying behaviour is corrected.')}
      ${sec(ICO.chart, 'Net effect on the portfolio', `
        <div class="kpi-grid cols-4">
          <div class="kpi"><div class="k">Vessels worsening</div><div class="v num">46</div><div class="d">5 by ten points or more</div></div>
          <div class="kpi"><div class="k">Vessels improving</div><div class="v num">5</div><div class="d">all by seven points or more</div></div>
          <div class="kpi"><div class="k">Unchanged</div><div class="v num">1,220</div><div class="d">no material movement</div></div>
          <div class="kpi accent"><div class="k">Net portfolio move</div><div class="v num">${P.average.delta}</div><div class="d">to ${P.average.score}</div></div>
        </div>`)}
      ${foot(6)}
    </article>`;
  }

  /* ── Page 7 — by type + by age ── */
  function page4() {
    const maxTv = Math.max(...P.byType.map(x => x.avg));
    const maxAv = Math.max(...P.byAge.map(x => x.avg));
    return `
    <article class="page" data-screen-label="Page 7">
      ${head('05\u201306 &middot; Score by type &amp; age')}
      ${sec(ICO.ship, 'Risk Score by vessel type', `
        <table class="rt">
          <thead><tr><th>Vessel type</th><th class="r">Vessels</th><th class="r">Average score</th><th class="r">Move</th><th class="r">Scoring 61+</th><th class="r">Insured value</th></tr></thead>
          <tbody>
            ${P.byType.map(x => `
              <tr>
                <td class="vn">${x.type}</td>
                <td class="r num">${x.vessels}</td>
                <td class="r">${scoreChip(x.avg)}</td>
                <td class="r">${dChip(x.delta)}</td>
                <td class="r num">${x.high}</td>
                <td class="r num">${x.value}</td>
              </tr>`).join('')}
          </tbody>
        </table>
        <div class="bar-list" style="margin-top:11px">
          ${P.byType.map(x => `
            <div class="bl-row">
              <span class="bl-name">${x.type}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.avg / maxTv * 100)}%;background:${x.avg > 50 ? '#b91c1c' : x.avg > 40 ? '#d97706' : '#16a34a'}"></span></span>
              <span class="bl-val num">${x.avg}</span>
            </div>`).join('')}
        </div>`, 'Tanker tonnage scores worst on every measure and has risen fastest in the period.')}
      ${sec(ICO.clock, 'Risk Score by vessel age', `
        <table class="rt compact">
          <thead><tr><th>Age band</th><th class="r">Vessels</th><th class="r">Average score</th><th class="r">Scoring 61+</th><th>Profile</th></tr></thead>
          <tbody>
            ${P.byAge.map(x => `
              <tr>
                <td class="vn">${x.band}</td>
                <td class="r num">${x.vessels}</td>
                <td class="r">${scoreChip(x.avg)}</td>
                <td class="r num">${x.high}</td>
                <td style="min-width:110px"><span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.avg / maxAv * 100)}%;background:${x.color}"></span></span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Score rises steadily with age; the 26-plus cohort averages more than double the youngest band.')}
      ${foot(7)}
    </article>`;
  }

  /* ── Page 8 — by flag + by owner/manager ── */
  function page5() {
    return `
    <article class="page" data-screen-label="Page 8">
      ${head('07\u201308 &middot; Score by flag &amp; management')}
      ${sec(ICO.flag2, 'Risk Score by flag', `
        <table class="rt">
          <thead><tr><th>Registry</th><th class="r">Vessels</th><th class="r">Average score</th><th class="r">Move</th><th>Standing</th><th class="r">Scoring 61+</th></tr></thead>
          <tbody>
            ${P.byFlag.map(x => `
              <tr>
                <td style="white-space:nowrap">${flag(x.flag)} <span style="font-weight:600;color:#0f172a">${x.name}</span></td>
                <td class="r num">${x.vessels}</td>
                <td class="r">${scoreChip(x.avg)}</td>
                <td class="r">${dChip(x.delta)}</td>
                <td><span class="pill ${x.standing === 'Watchlisted' ? 'pill-red' : x.standing.includes('grey') ? 'pill-amber' : 'pill-green'}">${x.standing}</span></td>
                <td class="r num">${x.high}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Standing is the registry\u2019s Paris MoU classification, or watchlisted where the internal list applies.')}
      ${sec(ICO.users, 'Risk Score by owner and technical manager', `
        <table class="rt">
          <thead><tr><th>Party</th><th>Role</th><th class="r">Vessels</th><th class="r">Average score</th><th class="r">Move</th><th class="r">61+</th><th>Worst vessel</th></tr></thead>
          <tbody>
            ${P.byOwner.map(x => `
              <tr>
                <td class="vn">${x.name}</td>
                <td style="white-space:nowrap">${x.role}</td>
                <td class="r num">${x.vessels}</td>
                <td class="r">${scoreChip(x.avg)}</td>
                <td class="r">${dChip(x.delta)}</td>
                <td class="r num">${x.high}</td>
                <td class="num">${x.worst}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Parties holding five or more vessels in the portfolio. Score is the unweighted mean across their vessels.')}
      ${foot(8)}
    </article>`;
  }

  /* ── Page 9 — trends ── */
  function page6() {
    const t = P.trend, n = t.months.length;
    const x = i => 42 + i / (n - 1) * 624;
    const y = v => 160 - (v - 20) / 45 * 140;
    const series = (vals, color, dash) =>
      `<polyline points="${vals.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''} />`;
    return `
    <article class="page" data-screen-label="Page 9">
      ${head('09 &middot; Risk Score trends')}
      ${sec(ICO.trend, 'Average Risk Score \u2014 12 months', `
        <div class="chart-wrap">
          <div class="chart-legend">
            <span class="cl-item"><span class="cl-line"></span>Portfolio average</span>
            <span class="cl-item"><span class="cl-line" style="border-top-color:#b91c1c"></span>Tanker segments</span>
            <span class="cl-item"><span class="cl-line dash" style="border-top-color:#16a34a"></span>Dry cargo segments</span>
          </div>
          <svg viewBox="0 0 700 200" class="linechart" role="img" aria-label="Average risk score by month over twelve months for the portfolio, tanker and dry cargo segments">
            ${[20, 30, 40, 50, 60].map(g => {
              const gy = y(g);
              return `<line x1="42" y1="${gy.toFixed(1)}" x2="666" y2="${gy.toFixed(1)}" stroke="${g === 20 ? '#cbd5e1' : '#f1f5f9'}" stroke-width="1" /><text x="34" y="${(gy + 3.5).toFixed(1)}" text-anchor="end" class="ax-lbl">${g}</text>`;
            }).join('')}
            <line x1="42" y1="20" x2="42" y2="160" stroke="#cbd5e1" stroke-width="1" />
            ${series(t.dry, '#16a34a', '5 4')}
            ${series(t.tankers, '#b91c1c')}
            ${series(t.portfolio, 'var(--brand-600,#2d7ffb)')}
            ${t.portfolio.map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3.2" fill="#fff" stroke="var(--brand-600,#2d7ffb)" stroke-width="2" />${i % 2 === 1 || i === n - 1 ? `<text x="${x(i).toFixed(1)}" y="${(y(v) - 9).toFixed(1)}" text-anchor="middle" class="pt-lbl">${v}</text>` : ''}`).join('')}
            ${t.months.map((m, i) => `<text x="${x(i).toFixed(1)}" y="176" text-anchor="middle" class="ax-lbl">${m}</text>`).join('')}
            <text x="10" y="94" text-anchor="middle" class="ax-title" transform="rotate(-90 10 94)">Average score</text>
            <text x="366" y="194" text-anchor="middle" class="ax-title">Month end</text>
          </svg>
        </div>
        <div class="kpi-grid cols-4" style="margin-top:12px">
          <div class="kpi accent"><div class="k">Current</div><div class="v num">${P.average.score}</div><div class="d">${P.average.band} band</div></div>
          <div class="kpi"><div class="k">12-month low</div><div class="v num">${P.average.twelveMonthLow}</div><div class="d">Sep 2025</div></div>
          <div class="kpi"><div class="k">12-month high</div><div class="v num">${P.average.twelveMonthHigh}</div><div class="d">Aug 2026</div></div>
          <div class="kpi"><div class="k">Net 12-month move</div><div class="v num">+2.7</div><div class="d">from ${P.average.twelveMonthLow}</div></div>
        </div>`, 'Segment lines show the two largest groupings in the book; the portfolio line is the unweighted mean across all scored vessels.')}
      ${sec(ICO.chart, 'What is driving the trend', `
        <div class="chg">
          ${P.trendNotes.map(x => `
            <div class="chg-row">
              <span class="chg-ico" style="background:${x.tone === 'red' ? '#fef2f2' : x.tone === 'amber' ? '#fffbeb' : '#f0fdf4'};color:${x.tone === 'red' ? '#b91c1c' : x.tone === 'amber' ? '#b45309' : '#15803d'}">${ic(x.tone === 'green' ? ICO.trend : ICO.alert, 12)}</span>
              <div><div class="chg-t">${x.t}</div><div class="chg-d">${x.d}</div></div>
              <div class="chg-m" style="font-weight:700;color:${x.tone === 'red' ? '#b91c1c' : x.tone === 'amber' ? '#b45309' : '#15803d'}">${x.m}</div>
            </div>`).join('')}
        </div>`)}
      ${foot(9)}
    </article>`;
  }

  window.prsReport = {
    Toolbar() {
      return `
      <div class="doc-toolbar no-print">
        <div style="display:flex;align-items:center;gap:14px;min-width:0">
          <a href="Reports.html" class="tb-btn" style="text-decoration:none" title="Back to Reports" aria-label="Back to Reports">${ic(ICO.back, 14)}<span class="tb-lbl">Reports</span></a>
          <div style="min-width:0">
            <div class="tb-title">Portfolio Risk Score Report</div>
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
