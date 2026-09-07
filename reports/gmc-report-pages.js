/* Global Marine Casualty Intelligence Report — page composition */
(function () {
  const P = window.GMC;
  const RF = window.reportFront;
  const TOTAL = 10;
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    life:'<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    chart:'<path d="M13 17V9"/><path d="M18 17V5"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-3"/>',
    ship:'<path d="M12 10.189V14"/><path d="M12 2v3"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"/><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    flag2:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
    clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    trend:'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
    print:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    back:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  };
  const flag = cc => `<img class="flagimg" src="https://flagcdn.com/w40/${cc}.png" srcset="https://flagcdn.com/w80/${cc}.png 2x" alt="${cc.toUpperCase()}" width="19" height="13" />`;
  const vStack = (name, imo, type) => `<div class="v-stack"><span class="v-name">${name}</span><span class="v-sub num">IMO ${imo}${type ? ' &middot; ' + type : ''}</span></div>`;
  const sevPill = s => `<span class="pill ${s === 'Total loss' ? 'pill-red' : s === 'Serious' ? 'pill-red' : s === 'Moderate' ? 'pill-amber' : 'pill-green'}">${s}</span>`;
  const rateChip = n => `<span class="score ${n > 1 ? 'sc-high' : n > 0.6 ? 'sc-med' : 'sc-low'}">${n.toFixed(2)}</span>`;
  const dChip = d => d === '\u2014' ? '\u2014' : `<span class="${String(d).startsWith('-') || String(d).startsWith('\u2212') ? 'delta-down' : 'delta-up'} num">${d}</span>`;

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
      <span>Global Marine Casualty Intelligence Report &middot; Real World</span>
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
      eyebrow: 'Monthly global casualty intelligence',
      title: 'Global Marine Casualty<br />Intelligence Report',
      sub: 'The month\u2019s casualty record across the world merchant fleet — every new casualty and the incidents that mattered, cut by event type, vessel type, region, flag, age and management, with the patterns beginning to emerge behind the numbers.',
      subject: { k:'Scope', v:P.meta.scope, d:`${P.meta.universe} &middot; ${s.casualties} casualties &middot; ${s.totalLosses} total losses &middot; ${s.fatalities} fatalities` },
      meta: [['Reporting period', P.meta.period]],
      reportId: P.meta.reportId, owner: P.meta.owner, generatedOn: P.meta.generatedOn,
    });
  }

  function frontToc() {
    return RF.toc({
      head: head('Contents'), foot: foot(2),
      note: `Universe: ${P.meta.universe} of 300 GT and above. Rates are casualties per 100 vessels per year. Page numbers refer to this document.`,
      rows: [
        { front:true, title:'Executive summary', sub:'Global casualty position at a glance, headline findings for the period.', page:3 },
        { n:'01', title:'New global casualties', sub:'Volume, severity split and investigation status for the period.', page:4 },
        { n:'02', title:'Significant incidents', sub:'The total losses and serious casualties that defined the month.', page:5 },
        { n:'03', title:'Casualties by type', sub:'Event types with severity share and average loss value.', page:6 },
        { n:'04', title:'Vessel type', sub:'Casualty count and rate per 100 vessels for each vessel type.', page:7 },
        { n:'05', title:'Region', sub:'Regional distribution with rate, hotspot and period movement.', page:7 },
        { n:'06', title:'Flag', sub:'Casualty rate per registry against its Paris MoU standing.', page:8 },
        { n:'07', title:'Vessel age', sub:'Casualty rate by age band across the tracked fleet.', page:8 },
        { n:'08', title:'Owner / technical manager', sub:'Parties recording three or more casualties in the period.', page:9 },
        { n:'09', title:'Emerging casualty patterns', sub:'Clusters and trends worth watching into the next period.', page:10 },
      ],
    });
  }

  function frontExec() {
    const s = P.summary, t = P.byType, r = P.byRegion;
    const maxT = Math.max(...t.map(x => x.n));
    const maxR = Math.max(...r.map(x => x.n));
    return RF.exec({
      head: head('Executive summary'), foot: foot(3),
      standfirst: `Casualty record across ${P.meta.universe} for ${P.meta.period}, against the ${P.meta.previous} report. Rates are per 100 vessels per year.`,
      hero: [
        { cls:'lead', k:'Casualties reported', v:s.casualties, d:`<span class="delta-up">${s.delta}</span> vs previous &middot; 12-month average ${s.twelveMonthAvg}`,
          meter:{ pinPct:Math.round(s.seriousPct / 40 * 100), scale:[{at:0,l:'0% serious'},{at:62,l:'25%'},{at:100,l:'40%'}], segments:[{pct:37,color:'#16a34a'},{pct:25,color:'#d97706'},{pct:38,color:'#dc2626'}] } },
        { cls:'warn', k:'Serious casualties', v:s.serious, d:`${s.seriousPct}% of all casualties` },
        { cls:'warn', k:'Total losses', v:s.totalLosses, d:`<span class="delta-up">${s.totalLossDelta}</span> vs previous &middot; ${s.vesselsLost} hull value` },
        { cls:'warn', k:'Fatalities', v:s.fatalities, d:`<span class="delta-up">${s.fatalitiesDelta}</span> across four events` },
        { k:'Global casualty rate', v:s.rate, d:s.rateNote },
        { cls:'warn', k:'Worst region', v:r[0].n, d:`${s.worstRegion} &middot; rate ${r[0].rate}` },
        { k:'Most common event', v:t[0].n, d:`${s.worstType} &middot; ${t[0].pct}%` },
      ],
      left: { title:'Casualties by event type', rows:t.slice(0,5).map(x => ({ n:x.type, pct:Math.round(x.n / maxT * 100), v:x.n, color:x.color })) },
      right: { title:'Casualties by region', rows:r.slice(0,5).map(x => ({ n:x.region, pct:Math.round(x.n / maxR * 100), v:x.n })) },
      findings: { rows:P.findings },
    });
  }

  /* ── Page 4 — new global casualties ── */
  function page1() {
    const s = P.summary, n = P.newCasualties;
    const maxW = Math.max(...n.byWeek.map(x => x.n));
    const maxS = Math.max(...n.bySeverity.map(x => x.n));
    return `
    <article class="page" data-screen-label="Page 4">
      ${head('01 &middot; New global casualties')}
      ${sec(ICO.life, 'Casualty volume for the period', `
        <div class="kpi-grid cols-4">
          <div class="kpi accent"><div class="k">Casualties reported</div><div class="v num">${s.casualties}</div><div class="d"><span class="delta-up">${s.delta}</span> vs ${P.meta.previous}</div></div>
          <div class="kpi"><div class="k">Serious or worse</div><div class="v num">${s.serious}</div><div class="d">${s.seriousPct}% of the total</div></div>
          <div class="kpi"><div class="k">Total losses</div><div class="v num">${s.totalLosses}</div><div class="d">${s.vesselsLost} hull value</div></div>
          <div class="kpi"><div class="k">Fatalities</div><div class="v num">${s.fatalities}</div><div class="d"><span class="delta-up">${s.fatalitiesDelta}</span> vs previous</div></div>
        </div>
        <div class="chart-wrap" style="margin-top:12px">
          <div class="chart-legend"><span class="cl-item"><span class="cl-sw"></span>Casualties reported per week</span><span class="cl-item"><span class="cl-line dash" style="border-top-color:#d97706"></span>Weekly average ${Math.round(s.casualties / 5)}</span></div>
          <svg viewBox="0 0 700 170" class="linechart" role="img" aria-label="Casualties reported by week during the period">
            ${[0, 30, 60, 90, 120].map(g => {
              const y = 140 - g / 120 * 118;
              return `<line x1="42" y1="${y.toFixed(1)}" x2="666" y2="${y.toFixed(1)}" stroke="${g === 0 ? '#cbd5e1' : '#f1f5f9'}" stroke-width="1" /><text x="34" y="${(y + 3.5).toFixed(1)}" text-anchor="end" class="ax-lbl">${g}</text>`;
            }).join('')}
            <line x1="42" y1="14" x2="42" y2="140" stroke="#cbd5e1" stroke-width="1" />
            ${n.byWeek.map((w, i) => {
              const bw = 624 / n.byWeek.length * 0.56;
              const x = 42 + (i + 0.5) / n.byWeek.length * 624;
              const y = 140 - w.n / 120 * 118;
              return `<rect x="${(x - bw / 2).toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${(140 - y).toFixed(1)}" rx="3" fill="var(--brand-600,#2d7ffb)" opacity="${w.n === maxW ? 1 : .78}" /><text x="${x.toFixed(1)}" y="${(y - 6).toFixed(1)}" text-anchor="middle" class="pt-lbl">${w.n}</text>`;
            }).join('')}
            <line x1="42" y1="${(140 - (s.casualties / 5) / 120 * 118).toFixed(1)}" x2="666" y2="${(140 - (s.casualties / 5) / 120 * 118).toFixed(1)}" stroke="#d97706" stroke-width="2" stroke-dasharray="6 4" />
            ${n.byWeek.map((w, i) => `<text x="${(42 + (i + 0.5) / n.byWeek.length * 624).toFixed(1)}" y="156" text-anchor="middle" class="ax-lbl">${w.w}</text>`).join('')}
          </svg>
        </div>`, `Reported casualties across ${P.meta.universe}. Week 31 covers three days only.`)}
      ${sec(ICO.chart, 'Severity split and investigation status', `
        <div class="dist">
          <div>
            <div class="dist-chart" style="height:150px">
              ${n.bySeverity.map(x => `
                <div class="dist-col">
                  <span class="dist-val num">${x.n}</span>
                  <span class="dist-bar" style="height:${Math.round(x.n / maxS * 118)}px;background:${x.color}"></span>
                </div>`).join('')}
            </div>
            <div class="dist-x">${n.bySeverity.map(x => `<span>${x.sev.replace(/ /g, '<br />')}</span>`).join('')}</div>
          </div>
          <div class="legend">
            ${n.status.map(x => `
              <div class="legend-row">
                <span class="sw" style="background:#cbd5e1"></span>
                <span>${x.k}</span>
                <span class="lv num">${x.v}</span>
              </div>`).join('')}
          </div>
        </div>`, 'Severity follows the IMO casualty classification; status is the current investigation state as reported by flag and class.')}
      ${foot(4)}
    </article>`;
  }

  /* ── Page 5 — significant incidents ── */
  function page2() {
    return `
    <article class="page" data-screen-label="Page 5">
      ${head('02 &middot; Significant incidents')}
      ${sec(ICO.alert, 'Total losses and serious casualties of note', `
        <table class="rt">
          <thead><tr><th>Date</th><th>Vessel</th><th>Flag</th><th>Event</th><th>Region</th><th>Severity</th><th class="r">Fatal</th><th class="r">Est. loss</th></tr></thead>
          <tbody>
            ${P.significant.map(v => `
              <tr>
                <td class="num">${v.date}</td>
                <td>${vStack(v.name, v.imo, v.type)}</td>
                <td>${flag(v.flag)}</td>
                <td><div class="v-stack"><span style="font-weight:600;color:#0f172a">${v.event}</span><span class="v-sub">${v.note}</span></div></td>
                <td>${v.region}</td>
                <td>${sevPill(v.sev)}</td>
                <td class="r num" style="font-weight:700;color:${v.fatal ? '#b91c1c' : '#64748b'}">${v.fatal || '\u2014'}</td>
                <td class="r num">${v.loss}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, `The seven casualties with the largest loss or life-safety consequence in the period. Loss figures are early estimates and will move with survey.`)}
      ${sec(ICO.chart, 'Where the significant losses fell', `
        <div class="ind-grid cols-3">
          <div class="ind"><div class="ik">Total losses</div><div class="iv num">${P.summary.totalLosses}</div><div class="id">${P.summary.vesselsLost} of hull value written off</div></div>
          <div class="ind"><div class="ik">Fatalities in these events</div><div class="iv num">12</div><div class="id">of ${P.summary.fatalities} across all casualties</div></div>
          <div class="ind"><div class="ik">Largest single loss</div><div class="iv num">$68m</div><div class="id">HAI FENG 7 &middot; cargo-hold fire</div></div>
        </div>`)}
      ${foot(5)}
    </article>`;
  }

  /* ── Page 6 — casualties by type ── */
  function page3() {
    const t = P.byType, maxN = Math.max(...t.map(x => x.n));
    return `
    <article class="page" data-screen-label="Page 6">
      ${head('03 &middot; Casualties by type')}
      ${sec(ICO.chart, 'Event type breakdown', `
        <table class="rt">
          <thead><tr><th>Event type</th><th class="r">Casualties</th><th class="r">Share</th><th class="r">Serious</th><th class="r">Avg loss</th><th class="r">vs ${P.meta.previous}</th></tr></thead>
          <tbody>
            ${t.map(x => `
              <tr>
                <td class="vn">${x.type}</td>
                <td class="r num" style="font-weight:700;color:#0f172a">${x.n}</td>
                <td class="r num">${x.pct}%</td>
                <td class="r num">${x.serious}</td>
                <td class="r num">${x.avgLoss}</td>
                <td class="r">${dChip(x.delta)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
        <div class="bar-list" style="margin-top:11px">
          ${t.map(x => `
            <div class="bl-row">
              <span class="bl-name">${x.type}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.n / maxN * 100)}%;background:${x.color}"></span></span>
              <span class="bl-val num">${x.n} &middot; ${x.serious} serious</span>
            </div>`).join('')}
        </div>`, 'Machinery damage dominates by volume but fire and explosion carries by far the highest average loss at $11.4m per event.')}
      ${foot(6)}
    </article>`;
  }

  /* ── Page 7 — vessel type + region ── */
  function page4() {
    const v = P.byVesselType, maxR = Math.max(...v.map(x => x.rate));
    return `
    <article class="page" data-screen-label="Page 7">
      ${head('04\u201305 &middot; Vessel type &amp; region')}
      ${sec(ICO.ship, 'Casualties by vessel type', `
        <table class="rt compact">
          <thead><tr><th>Vessel type</th><th class="r">Tracked fleet</th><th class="r">Casualties</th><th class="r">Rate</th><th class="r">Serious</th><th>Profile</th></tr></thead>
          <tbody>
            ${v.map(x => `
              <tr>
                <td class="vn">${x.type}</td>
                <td class="r num">${x.fleet.toLocaleString()}</td>
                <td class="r num">${x.n}</td>
                <td class="r">${rateChip(x.rate)}</td>
                <td class="r num">${x.serious}</td>
                <td style="min-width:100px"><span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.rate / maxR * 100)}%;background:${x.color}"></span></span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Rate is casualties per 100 vessels per year. Crude tankers and container ships exceed the 0.68 global mean by the widest margin.')}
      ${sec(ICO.globe, 'Casualties by region', `
        <table class="rt compact">
          <thead><tr><th>Region</th><th class="r">Casualties</th><th class="r">Share</th><th class="r">Rate</th><th class="r">Serious</th><th>Principal hotspot</th><th class="r">Move</th></tr></thead>
          <tbody>
            ${P.byRegion.map(x => `
              <tr>
                <td class="vn">${x.region}</td>
                <td class="r num">${x.n}</td>
                <td class="r num">${x.pct}%</td>
                <td class="r">${rateChip(x.rate)}</td>
                <td class="r num">${x.serious}</td>
                <td>${x.hotspot}</td>
                <td class="r">${dChip(x.delta)}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Regions follow the Real World reporting geography; a casualty is attributed to the region containing the vessel position at the time of the event.')}
      ${foot(7)}
    </article>`;
  }

  /* ── Page 8 — flag + age ── */
  function page5() {
    const f = P.byFlag, maxF = Math.max(...f.map(x => x.rate));
    const a = P.byAge, maxA = Math.max(...a.map(x => x.rate));
    return `
    <article class="page" data-screen-label="Page 8">
      ${head('06\u201307 &middot; Flag &amp; vessel age')}
      ${sec(ICO.flag2, 'Casualties by flag', `
        <table class="rt compact">
          <thead><tr><th>Registry</th><th class="r">Tracked fleet</th><th class="r">Casualties</th><th class="r">Rate</th><th>Standing</th><th class="r">Serious</th><th>Profile</th></tr></thead>
          <tbody>
            ${f.map(x => `
              <tr>
                <td style="white-space:nowrap">${flag(x.flag)} <span style="font-weight:600;color:#0f172a">${x.name}</span></td>
                <td class="r num">${x.fleet.toLocaleString()}</td>
                <td class="r num">${x.n}</td>
                <td class="r">${rateChip(x.rate)}</td>
                <td><span class="pill ${x.standing === 'Watchlisted' ? 'pill-red' : x.standing.includes('grey') ? 'pill-amber' : 'pill-green'}">${x.standing}</span></td>
                <td class="r num">${x.serious}</td>
                <td style="min-width:80px"><span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.rate / maxF * 100)}%;background:${x.standing === 'Watchlisted' ? '#b91c1c' : 'var(--brand-600,#2d7ffb)'}"></span></span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'The two watchlisted registries record casualty rates almost four times the global mean of 0.68.')}
      ${sec(ICO.clock, 'Casualties by vessel age', `
        <table class="rt compact">
          <thead><tr><th>Age band</th><th class="r">Tracked fleet</th><th class="r">Casualties</th><th class="r">Rate</th><th class="r">Serious</th><th>Profile</th></tr></thead>
          <tbody>
            ${a.map(x => `
              <tr>
                <td class="vn">${x.band}</td>
                <td class="r num">${x.fleet.toLocaleString()}</td>
                <td class="r num">${x.n}</td>
                <td class="r">${rateChip(x.rate)}</td>
                <td class="r num">${x.serious}</td>
                <td style="min-width:100px"><span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.rate / maxA * 100)}%;background:${x.color}"></span></span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Casualty rate rises steadily with age; vessels over 21 years record more than three times the rate of those under five.')}
      ${foot(8)}
    </article>`;
  }

  /* ── Page 9 — owner / technical manager ── */
  function page6() {
    const m = P.byManager, maxR = Math.max(...m.map(x => x.rate));
    return `
    <article class="page" data-screen-label="Page 9">
      ${head('08 &middot; Owner / technical manager')}
      ${sec(ICO.users, 'Parties with three or more casualties in the period', `
        <table class="rt">
          <thead><tr><th>Party</th><th class="r">Fleet</th><th class="r">Casualties</th><th class="r">Rate</th><th class="r">Serious</th><th>Dominant event</th></tr></thead>
          <tbody>
            ${m.map(x => `
              <tr>
                <td><div class="v-stack"><span class="v-name">${x.name}</span><span class="v-sub">${x.role}</span></div></td>
                <td class="r num">${x.fleet}</td>
                <td class="r num" style="font-weight:700;color:#0f172a">${x.n}</td>
                <td class="r">${rateChip(x.rate)}</td>
                <td class="r num">${x.serious}</td>
                <td>${x.worst}</td>
              </tr>`).join('')}
          </tbody>
        </table>
        <div class="bar-list" style="margin-top:11px">
          ${m.map(x => `
            <div class="bl-row">
              <span class="bl-name">${x.name}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.rate / maxR * 100)}%;background:${x.rate > 4 ? '#b91c1c' : x.rate > 2 ? '#d97706' : '#16a34a'}"></span></span>
              <span class="bl-val num">${x.rate.toFixed(2)}</span>
            </div>`).join('')}
        </div>`, P.managerNote)}
      ${sec(ICO.chart, 'Reading these rates', `
        <div class="ind-grid cols-3">
          <div class="ind"><div class="ik">Global mean rate</div><div class="iv num">${P.summary.rate}</div><div class="id">casualties per 100 vessels per year</div></div>
          <div class="ind"><div class="ik">Worst manager rate</div><div class="iv num">5.93</div><div class="id">Pelagos Tech Services &middot; 8.7\u00d7 mean</div></div>
          <div class="ind"><div class="ik">Best listed rate</div><div class="iv num">0.96</div><div class="id">Northern Marine Tech &middot; 312 vessels</div></div>
        </div>`, 'Fleet size matters: a party with under 150 vessels can post an extreme annualised rate on three events, so treat the smaller fleets as indicative rather than conclusive.')}
      ${foot(9)}
    </article>`;
  }

  /* ── Page 10 — emerging patterns ── */
  function page7() {
    const tone = t => t === 'red' ? '#b91c1c' : t === 'amber' ? '#b45309' : '#15803d';
    const bg = t => t === 'red' ? '#fef2f2' : t === 'amber' ? '#fffbeb' : '#f0fdf4';
    return `
    <article class="page" data-screen-label="Page 10">
      ${head('09 &middot; Emerging casualty patterns')}
      ${sec(ICO.trend, 'Clusters and trends worth watching', `
        <div class="chg">
          ${P.patterns.map(x => `
            <div class="chg-row">
              <span class="chg-ico" style="background:${bg(x.tone)};color:${tone(x.tone)}">${ic(x.tone === 'green' ? ICO.trend : ICO.alert, 12)}</span>
              <div><div class="chg-t">${x.t}</div><div class="chg-d">${x.d}</div></div>
              <div class="chg-m">
                <div style="font-weight:700;color:${tone(x.tone)}">${x.m}</div>
                <div style="font-size:9.5px;color:#94a3b8;margin-top:1px">${x.trend}</div>
              </div>
            </div>`).join('')}
        </div>`, 'Patterns are identified where a cluster exceeds two standard deviations of its trailing twelve-month distribution, or where a new cause category appears.')}
      ${sec(ICO.alert, 'Watch list for the next period', `
        <table class="rt compact">
          <thead><tr><th>Watch item</th><th>Why it matters</th><th>Leading indicator</th></tr></thead>
          <tbody>
            <tr>
              <td class="vn">Battery and EV cargo declarations</td>
              <td>Six fires this period against one a year ago; average loss on fire casualties is $11.4m.</td>
              <td class="num">Container fires on Asia\u2013Europe routes</td>
            </tr>
            <tr>
              <td class="vn">Singapore Strait traffic density</td>
              <td>Collision frequency 83% above its twelve-month average as transit counts hit records.</td>
              <td class="num">Simultaneous transits above 180</td>
            </tr>
            <tr>
              <td class="vn">Ageing bulk carrier structures</td>
              <td>Two North Atlantic founderings in a historically quiet month, both over 22 years.</td>
              <td class="num">Ballast passages, 22+ yrs, North Atlantic</td>
            </tr>
            <tr>
              <td class="vn">Watchlisted-registry tonnage</td>
              <td>Casualty rate 3.9\u00d7 the global mean with 11 of 16 casualties serious.</td>
              <td class="num">Cameroon and Togo registrations</td>
            </tr>
          </tbody>
        </table>`)}
      ${foot(10)}
    </article>`;
  }

  window.gmcReport = {
    Toolbar() {
      return `
      <div class="doc-toolbar no-print">
        <div style="display:flex;align-items:center;gap:14px;min-width:0">
          <a href="Reports.html" class="tb-btn" style="text-decoration:none" title="Back to Reports" aria-label="Back to Reports">${ic(ICO.back, 14)}<span class="tb-lbl">Reports</span></a>
          <div style="min-width:0">
            <div class="tb-title">Global Marine Casualty Intelligence Report</div>
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
      return [frontCover(), frontToc(), frontExec(), page1(), page2(), page3(), page4(), page5(), page6(), page7()].join('');
    },
  };
})();
