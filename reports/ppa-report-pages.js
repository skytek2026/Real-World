/* Peer & Prospect Analysis Report — page composition */
(function () {
  const P = window.PPA;
  const RF = window.reportFront;
  const TOTAL = 9;
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    scale:'<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    gauge:'<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    chart:'<path d="M13 17V9"/><path d="M18 17V5"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-3"/>',
    ship:'<path d="M12 10.189V14"/><path d="M12 2v3"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"/><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    pin:'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    life:'<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
    shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    print:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    back:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  };
  const flag = cc => `<img class="flagimg" src="https://flagcdn.com/w40/${cc}.png" srcset="https://flagcdn.com/w80/${cc}.png 2x" alt="${cc.toUpperCase()}" width="19" height="13" />`;
  const scoreChip = n => `<span class="score ${n > 55 ? 'sc-high' : n > 42 ? 'sc-med' : 'sc-low'}">${n}</span>`;
  const vStack = (name, imo) => `<div class="v-stack"><span class="v-name">${name}</span><span class="v-sub num">IMO ${imo}</span></div>`;
  const sevPill = s => `<span class="pill ${s === 'Serious' ? 'pill-red' : s === 'Moderate' ? 'pill-amber' : 'pill-green'}">${s}</span>`;
  /* subject vs peer paired bars */
  const duoBar = (a, b, max) => `
    <div style="display:flex;flex-direction:column;gap:3px;min-width:100px">
      <span class="bl-track"><span class="bl-fill" style="width:${Math.round(a / max * 100)}%;background:var(--brand-600,#2d7ffb)"></span></span>
      <span class="bl-track"><span class="bl-fill" style="width:${Math.round(b / max * 100)}%;background:#cbd5e1"></span></span>
    </div>`;
  const duoLegend = `
    <div class="chart-legend" style="padding-bottom:2px">
      <span class="cl-item"><span class="cl-sw"></span>${P.meta.subject}</span>
      <span class="cl-item"><span class="cl-sw" style="background:#cbd5e1"></span>Peer group median</span>
    </div>`;

  const head = (title) => `
    <div class="page-head">
      <div>
        <div class="ph-title">${title}</div>
        <div class="ph-meta">${P.meta.subject} &middot; ${P.meta.window}</div>
      </div>
      <div class="ph-meta">${P.meta.reportId}</div>
    </div>`;
  const foot = (n) => `
    <div class="page-foot">
      <span>Peer &amp; Prospect Analysis Report &middot; Real World</span>
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
      eyebrow: 'New business assessment',
      title: 'Peer &amp; Prospect<br />Analysis Report',
      sub: 'A prospect measured against the peers it competes with — its Real World Risk Score profile, fleet size and mix, vessel age, where it trades, and its casualty and compliance record, each set against the peer median and the global fleet.',
      subject: { k:P.meta.subjectType, v:P.meta.subject, d:`${s.vessels} vessels &middot; ${s.insurableValue} insurable value &middot; score ${s.avgScore} vs peer ${s.peerScore} &middot; ${s.verdict}` },
      meta: [['Reporting period', P.meta.period]],
      reportId: P.meta.reportId, owner: P.meta.owner, generatedOn: P.meta.generatedOn,
    });
  }

  function frontToc() {
    return RF.toc({
      head: head('Contents'), foot: foot(2),
      note: `Peer group: ${P.meta.peerName} (${P.meta.peerCount} operators). Page numbers refer to this document.`,
      rows: [
        { front:true, title:'Executive summary', sub:'Prospect position at a glance, headline findings for the window.', page:3 },
        { n:'01', title:'Real World Risk Score profile', sub:'Score distribution, contributing factors and the two-year trend against peers.', page:4 },
        { n:'02', title:'Fleet size', sub:'Vessels, tonnage and value against the peer median, with the growth path.', page:5 },
        { n:'03', title:'Vessel type', sub:'Type mix and per-segment score against the peer group.', page:6 },
        { n:'04', title:'Vessel age', sub:'Age band profile and where the score deteriorates.', page:6 },
        { n:'05', title:'Geographic activity', sub:'Regions and ports used, with listed-area exposure against peers.', page:7 },
        { n:'06', title:'Casualty profile', sub:'Casualty record and rate against the peer group and global fleet.', page:8 },
        { n:'07', title:'Sanctions / compliance profile', sub:'Indicators, screening outcome and open monitoring items.', page:9 },
      ],
    });
  }

  function frontExec() {
    const s = P.summary, d = P.scoreProfile.distribution;
    const maxD = Math.max(...d.map(x => x.n));
    const f = P.scoreProfile.factors, maxF = Math.max(...f.map(x => x.v));
    return RF.exec({
      head: head('Executive summary'), foot: foot(3),
      standfirst: `${P.meta.subject} (${P.meta.hq}, IMO company ${P.meta.imoNo}) assessed over ${P.meta.window.toLowerCase()} against ${P.meta.peerCount} ${P.meta.peerName.toLowerCase()}.`,
      hero: [
        { cls:'lead', k:'Real World Risk Score', v:s.avgScore, d:`<span class="delta-up">${s.avgScoreDelta}</span> in period &middot; peer median ${s.peerScore} &middot; global ${s.globalScore} &middot; ${s.verdict}`,
          meter:{ pinPct:s.percentile, scale:[{at:0,l:'best in peer group'},{at:50,l:'median'},{at:100,l:'worst'}], segments:[{pct:40,color:'#16a34a'},{pct:20,color:'#d97706'},{pct:40,color:'#dc2626'}] } },
        { cls:'warn', k:'Percentile in peer group', v:`${s.percentile}th`, d:`of ${P.meta.peerCount} comparable operators` },
        { k:'Fleet size', v:s.vessels, d:`peer median ${s.peerMedianVessels} &middot; ${s.insurableValue} value` },
        { cls:'warn', k:'Casualty rate', v:s.casRate, d:`per 100 vsl/yr &middot; peer ${s.peerCasRate} (+45%)` },
        { cls:'warn', k:'Average fleet age', v:s.avgAge, d:`years &middot; peer ${s.peerAge}` },
        { cls:'good', k:'Confirmed list matches', v:0, d:`${s.complianceFlags} internal monitoring items` },
        { cls:'warn', k:'Vessels scoring 61+', v:d[3].n + d[4].n, d:`${(d[3].pct + d[4].pct).toFixed(1)}% vs peer ${(d[3].peerPct + d[4].peerPct).toFixed(1)}%` },
      ],
      left: { title:'Score distribution vs peer share', rows:d.map(x => ({ n:`${x.band} (${x.range})`, pct:Math.round(x.n / maxD * 100), v:`${x.pct}% / ${x.peerPct}%`, color:x.color })) },
      right: { title:'Score contribution by factor', rows:f.map(x => ({ n:`${x.k} (${x.w})`, pct:Math.round(x.v / maxF * 100), v:`${x.v} / ${x.peer}`, color:x.v > x.peer ? '#b91c1c' : '#16a34a' })) },
      findings: { rows:P.findings },
    });
  }

  /* ── Page 4 — risk score profile ── */
  function page1() {
    const sp = P.scoreProfile, d = sp.distribution, maxD = Math.max(...d.map(x => x.n));
    const f = sp.factors, maxF = Math.max(...f.map(x => Math.max(x.v, x.peer)));
    const t = sp.trend, n = t.quarters.length;
    const x = i => 56 + (i + 0.5) / n * 604;
    const y = v => 124 - (v - 38) / 12 * 104;
    return `
    <article class="page" data-screen-label="Page 4">
      ${head('01 &middot; Real World Risk Score profile')}
      ${sec(ICO.gauge, 'Score distribution and contributing factors', `
        <div class="dist">
          <div>
            <div class="dist-chart" style="height:150px">
              ${d.map(v => `
                <div class="dist-col">
                  <span class="dist-val num">${v.n}</span>
                  <span class="dist-bar" style="height:${Math.round(v.n / maxD * 118)}px;background:${v.color}"></span>
                </div>`).join('')}
            </div>
            <div class="dist-x">${d.map(v => `<span>${v.band}<br />${v.range}</span>`).join('')}</div>
          </div>
          <div class="legend">
            ${d.map(v => `
              <div class="legend-row">
                <span class="sw" style="background:${v.color}"></span>
                <span>${v.pct}% &middot; peer ${v.peerPct}%</span>
                <span class="lv num" style="color:${v.pct > v.peerPct ? '#b91c1c' : '#15803d'}">${v.pct > v.peerPct ? '+' : ''}${(v.pct - v.peerPct).toFixed(1)}</span>
              </div>`).join('')}
          </div>
        </div>
        ${duoLegend}
        <table class="rt compact">
          <thead><tr><th>Contributing factor</th><th class="r">Weight</th><th class="r">Prospect</th><th class="r">Peer median</th><th>Comparison</th></tr></thead>
          <tbody>
            ${f.map(v => `
              <tr>
                <td class="vn">${v.k}</td>
                <td class="r num">${v.w}</td>
                <td class="r">${scoreChip(v.v)}</td>
                <td class="r num">${v.peer}</td>
                <td>${duoBar(v.v, v.peer, maxF)}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, sp.note)}
      ${sec(ICO.chart, 'Score trend against the peer median', `
        <div class="chart-wrap">
          <div class="chart-legend">
            <span class="cl-item"><span class="cl-line"></span>${P.meta.subject}</span>
            <span class="cl-item"><span class="cl-line dash" style="border-top-color:#64748b"></span>Peer group median</span>
          </div>
          <svg viewBox="0 0 700 150" class="linechart" role="img" aria-label="Risk score by quarter against the peer group median">
            ${[38, 42, 46, 50].map(g => {
              const gy = y(g);
              return `<line x1="56" y1="${gy.toFixed(1)}" x2="660" y2="${gy.toFixed(1)}" stroke="${g === 38 ? '#cbd5e1' : '#f1f5f9'}" stroke-width="1" /><text x="48" y="${(gy + 3.5).toFixed(1)}" text-anchor="end" class="ax-lbl">${g}</text>`;
            }).join('')}
            <line x1="56" y1="14" x2="56" y2="124" stroke="#cbd5e1" stroke-width="1" />
            <polyline points="${t.peer.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')}" fill="none" stroke="#64748b" stroke-width="2.5" stroke-dasharray="6 4" stroke-linejoin="round" />
            <polyline points="${t.subject.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')}" fill="none" stroke="var(--brand-600,#2d7ffb)" stroke-width="2.5" stroke-linejoin="round" />
            ${t.subject.map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3" fill="#fff" stroke="var(--brand-600,#2d7ffb)" stroke-width="2" />${i % 2 === 1 ? `<text x="${x(i).toFixed(1)}" y="${(y(v) - 8).toFixed(1)}" text-anchor="middle" class="pt-lbl">${v}</text>` : ''}`).join('')}
            ${t.quarters.map((q, i) => `<text x="${x(i).toFixed(1)}" y="140" text-anchor="middle" class="ax-lbl">${q}</text>`).join('')}
            <text x="12" y="68" text-anchor="middle" class="ax-title" transform="rotate(-90 12 68)">Score</text>
          </svg>
        </div>`, 'The prospect has risen 3.7 points over two years while the peer median moved 0.7, so the gap is widening rather than tracking a market-wide shift.')}
      ${foot(4)}
    </article>`;
  }

  /* ── Page 5 — fleet size ── */
  function page2() {
    const f = P.fleetSize, g = f.growth, n = g.quarters.length;
    const x = i => 56 + (i + 0.5) / n * 604;
    const y = v => 124 - (v - 30) / 20 * 104;
    return `
    <article class="page" data-screen-label="Page 5">
      ${head('02 &middot; Fleet size')}
      ${sec(ICO.scale, 'Scale against the peer group', `
        ${duoLegend}
        <table class="rt">
          <thead><tr><th>Measure</th><th class="r">Prospect</th><th class="r">Peer median</th><th class="r">Global fleet</th></tr></thead>
          <tbody>
            ${f.rows.map(r => `
              <tr>
                <td class="vn">${r.k}</td>
                <td class="r num" style="font-weight:700;color:#0f172a">${r.subject}</td>
                <td class="r num">${r.peer}</td>
                <td class="r num">${r.global}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, f.note)}
      ${sec(ICO.chart, 'Fleet growth \u2014 two years', `
        <div class="chart-wrap">
          <div class="chart-legend"><span class="cl-item"><span class="cl-sw"></span>Vessels owned or operated at quarter end</span></div>
          <svg viewBox="0 0 700 150" class="linechart" role="img" aria-label="Vessels owned or operated by quarter over two years">
            ${[30, 35, 40, 45].map(gv => {
              const gy = y(gv);
              return `<line x1="56" y1="${gy.toFixed(1)}" x2="660" y2="${gy.toFixed(1)}" stroke="${gv === 30 ? '#cbd5e1' : '#f1f5f9'}" stroke-width="1" /><text x="48" y="${(gy + 3.5).toFixed(1)}" text-anchor="end" class="ax-lbl">${gv}</text>`;
            }).join('')}
            <line x1="56" y1="14" x2="56" y2="124" stroke="#cbd5e1" stroke-width="1" />
            ${g.n.map((v, i) => {
              const bw = 604 / n * 0.5, bx = x(i) - bw / 2, by = y(v);
              return `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${(124 - by).toFixed(1)}" rx="3" fill="var(--brand-600,#2d7ffb)" opacity="${i === n - 1 ? 1 : .78}" /><text x="${x(i).toFixed(1)}" y="${(by - 6).toFixed(1)}" text-anchor="middle" class="pt-lbl">${v}</text>`;
            }).join('')}
            ${g.quarters.map((q, i) => `<text x="${x(i).toFixed(1)}" y="140" text-anchor="middle" class="ax-lbl">${q}</text>`).join('')}
            <text x="12" y="68" text-anchor="middle" class="ax-title" transform="rotate(-90 12 68)">Vessels</text>
          </svg>
        </div>`, 'The fleet has grown from 34 to 42 vessels in eight quarters, a 23.5% expansion against 3.6% for the peer median.')}
      ${foot(5)}
    </article>`;
  }

  /* ── Page 6 — vessel type + age ── */
  function page3() {
    const t = P.byType, maxT = Math.max(...t.map(x => Math.max(x.avgScore, x.peerScore)));
    const a = P.byAge, maxA = Math.max(...a.map(x => Math.max(x.pct, x.peerPct)));
    return `
    <article class="page" data-screen-label="Page 6">
      ${head('03\u201304 &middot; Vessel type &amp; age')}
      ${sec(ICO.ship, 'Type mix and per-segment score', `
        ${duoLegend}
        <table class="rt compact">
          <thead><tr><th>Vessel type</th><th class="r">Vessels</th><th class="r">Share</th><th class="r">Peer share</th><th class="r">Score</th><th class="r">Peer score</th><th>Comparison</th></tr></thead>
          <tbody>
            ${t.map(x => `
              <tr>
                <td class="vn">${x.type}</td>
                <td class="r num">${x.n}</td>
                <td class="r num">${x.pct}%</td>
                <td class="r num">${x.peerPct}%</td>
                <td class="r">${scoreChip(x.avgScore)}</td>
                <td class="r num">${x.peerScore}</td>
                <td>${duoBar(x.avgScore, x.peerScore, maxT)}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.typeNote)}
      ${sec(ICO.clock, 'Age band profile', `
        <table class="rt compact">
          <thead><tr><th>Age band</th><th class="r">Vessels</th><th class="r">Share</th><th class="r">Peer share</th><th class="r">Score</th><th>Comparison</th></tr></thead>
          <tbody>
            ${a.map(x => `
              <tr>
                <td class="vn">${x.band}</td>
                <td class="r num">${x.n}</td>
                <td class="r num" style="font-weight:700;color:${x.pct > x.peerPct ? '#b91c1c' : '#15803d'}">${x.pct}%</td>
                <td class="r num">${x.peerPct}%</td>
                <td class="r">${scoreChip(x.avgScore)}</td>
                <td>${duoBar(x.pct, x.peerPct, maxA)}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.ageNote)}
      ${foot(6)}
    </article>`;
  }

  /* ── Page 7 — geographic activity ── */
  function page4() {
    const g = P.geography, maxP = Math.max(...g.regions.map(x => Math.max(x.pct, x.peerPct)));
    return `
    <article class="page" data-screen-label="Page 7">
      ${head('05 &middot; Geographic activity')}
      ${sec(ICO.globe, 'Regions used against the peer group', `
        ${duoLegend}
        <table class="rt">
          <thead><tr><th>Region</th><th class="r">Port calls</th><th class="r">Share</th><th class="r">Peer share</th><th class="r">Vessel days</th><th>Listing</th><th>Comparison</th></tr></thead>
          <tbody>
            ${g.regions.map(x => `
              <tr>
                <td class="vn">${x.region}</td>
                <td class="r num">${x.calls}</td>
                <td class="r num" style="font-weight:700;color:${x.pct > x.peerPct ? '#b91c1c' : '#15803d'}">${x.pct}%</td>
                <td class="r num">${x.peerPct}%</td>
                <td class="r num">${x.days}</td>
                <td><span class="pill ${x.listed ? 'pill-red' : 'pill-slate'}">${x.listed ? 'JWC listed' : 'Not listed'}</span></td>
                <td>${duoBar(x.pct, x.peerPct, maxP)}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, g.note)}
      ${sec(ICO.pin, 'Most-used ports', `
        <table class="rt compact">
          <thead><tr><th>Port</th><th class="r">Calls</th><th>Note</th></tr></thead>
          <tbody>
            ${g.ports.map(p => `
              <tr>
                <td style="white-space:nowrap">${flag(p.country)} <span style="font-weight:600;color:#0f172a">${p.port}</span></td>
                <td class="r num">${p.calls}</td>
                <td>${p.note}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Novorossiysk is the single most-used port at 64 calls; cargoes are documented as grain and steel, and no sanctioned cargo has been identified.')}
      ${foot(7)}
    </article>`;
  }

  /* ── Page 8 — casualty profile ── */
  function page5() {
    const c = P.casualties, s = c.summary;
    return `
    <article class="page" data-screen-label="Page 8">
      ${head('06 &middot; Casualty profile')}
      ${sec(ICO.life, 'Casualty record and rate', `
        <div class="ind-grid cols-3">
          <div class="ind" style="background:#fef2f2;border-color:#fecaca">
            <div class="ik">Prospect rate</div>
            <div class="iv num" style="color:#b91c1c">${s.rate}</div>
            <div class="id">per 100 vessels/yr &middot; ${s.total} casualties</div>
          </div>
          <div class="ind" style="background:#fffbeb;border-color:#fde68a">
            <div class="ik">Peer median rate</div>
            <div class="iv num" style="color:#b45309">${s.peerRate}</div>
            <div class="id">${P.meta.peerCount} comparable operators</div>
          </div>
          <div class="ind" style="background:#f0fdf4;border-color:#bbf7d0">
            <div class="ik">Global fleet rate</div>
            <div class="iv num" style="color:#15803d">${s.globalRate}</div>
            <div class="id">all tracked vessels</div>
          </div>
        </div>
        <div class="kpi-grid cols-4" style="margin-top:10px">
          <div class="kpi accent"><div class="k">Casualties</div><div class="v num">${s.total}</div><div class="d">${s.serious} serious</div></div>
          <div class="kpi"><div class="k">Total reserve</div><div class="v num">${s.reserve}</div><div class="d">1 claim open</div></div>
          <div class="kpi"><div class="k">Fleet affected</div><div class="v num">${s.affectedPct}%</div><div class="d">peer ${s.peerAffectedPct}%</div></div>
          <div class="kpi"><div class="k">vs peer rate</div><div class="v num">+45%</div><div class="d">above the median</div></div>
        </div>
        <table class="rt compact" style="margin-top:10px">
          <thead><tr><th>Date</th><th>Vessel</th><th>Type</th><th>Severity</th><th>Location</th><th class="r">Reserve</th><th>Status</th></tr></thead>
          <tbody>
            ${c.events.map(e => `
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
        </table>`, c.note)}
      ${foot(8)}
    </article>`;
  }

  /* ── Page 9 — sanctions / compliance profile ── */
  function page6() {
    const c = P.compliance;
    const maxI = Math.max(...c.indicators.map(x => Math.max(x.subject, x.peer)), 1);
    return `
    <article class="page" data-screen-label="Page 9">
      ${head('07 &middot; Sanctions / compliance profile')}
      ${sec(ICO.shield, 'Compliance indicators against the peer group', `
        ${duoLegend}
        <table class="rt">
          <thead><tr><th>Indicator</th><th class="r">Prospect</th><th class="r">Peer median</th><th>Comparison</th><th>Verdict</th></tr></thead>
          <tbody>
            ${c.indicators.map(x => `
              <tr>
                <td class="vn">${x.k}</td>
                <td class="r num" style="font-weight:700;color:${x.tone === 'green' ? '#15803d' : '#b45309'}">${x.subject}</td>
                <td class="r num">${x.peer}</td>
                <td>${duoBar(x.subject, x.peer, maxI)}</td>
                <td><span class="pill ${x.tone === 'green' ? 'pill-green' : 'pill-amber'}">${x.tone === 'green' ? 'At or better' : 'Above peers'}</span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, c.note)}
      ${sec(ICO.alert, 'Open monitoring items', `
        <table class="rt compact">
          <thead><tr><th class="r">Raised</th><th>Item</th><th>Source</th><th>Confidence</th><th>Detail</th><th>Status</th></tr></thead>
          <tbody>
            ${c.events.map(e => `
              <tr>
                <td class="r num">${e.on}</td>
                <td class="vn">${e.subject}</td>
                <td>${e.list}</td>
                <td><span class="pill pill-amber">${e.conf}</span></td>
                <td>${e.detail}</td>
                <td>${e.status}</td>
              </tr>`).join('')}
          </tbody>
        </table>`)}
      ${sec(ICO.scale, 'Underwriting recommendation', `
        <div class="att">
          <div class="att-item amber">
            <div>
              <div class="att-name">${ic(ICO.alert, 14)} ${P.summary.verdict}</div>
              <div class="att-meta">${P.summary.vessels} vessels &middot; ${P.summary.insurableValue} insurable value &middot; ${P.summary.percentile}th percentile of peer group</div>
              <div class="att-why">The compliance record is clean and better than peers on four of six measures, but the score gap is widening and the casualty rate runs 45% above the peer median with both serious events in the Black Sea. Recommend writing with a Black Sea trading warranty, a survey condition on the two vessels over 26 years, and exclusion of the repeat-casualty vessel ANATOLIA STAR pending its open claim.</div>
            </div>
            <div class="att-act">
              <span class="att-act-lbl">Action</span>
              <span class="pill pill-amber">Quote with conditions</span>
            </div>
          </div>
        </div>`)}
      ${foot(9)}
    </article>`;
  }

  window.ppaReport = {
    Toolbar() {
      return `
      <div class="doc-toolbar no-print">
        <div style="display:flex;align-items:center;gap:14px;min-width:0">
          <a href="Reports.html" class="tb-btn" style="text-decoration:none" title="Back to Reports" aria-label="Back to Reports">${ic(ICO.back, 14)}<span class="tb-lbl">Reports</span></a>
          <div style="min-width:0">
            <div class="tb-title">Peer &amp; Prospect Analysis Report</div>
            <div class="tb-sub num">${P.meta.subject} &middot; ${P.meta.window} &middot; ${TOTAL} pages (A4)</div>
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
