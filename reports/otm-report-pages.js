/* Owner & Technical Manager Risk Report — page composition */
(function () {
  const P = window.OTM;
  const RF = window.reportFront;
  const TOTAL = 10;
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    ship:'<path d="M12 10.189V14"/><path d="M12 2v3"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"/><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    chart:'<path d="M13 17V9"/><path d="M18 17V5"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-3"/>',
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    life:'<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
    shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    network:'<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>',
    globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    flag2:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
    clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    pin:'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    print:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    back:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  };
  const flag = cc => `<img class="flagimg" src="https://flagcdn.com/w40/${cc}.png" srcset="https://flagcdn.com/w80/${cc}.png 2x" alt="${cc.toUpperCase()}" width="19" height="13" />`;
  const scoreChip = n => `<span class="score ${n > 60 ? 'sc-high' : n > 40 ? 'sc-med' : 'sc-low'}">${n}</span>`;
  const vStack = (name, imo, type) => `<div class="v-stack"><span class="v-name">${name}</span><span class="v-sub num">IMO ${imo}${type ? ' &middot; ' + type : ''}</span></div>`;
  const sevPill = s => `<span class="pill ${s === 'Critical' || s === 'Serious' ? 'pill-red' : s === 'High' || s === 'Moderate' ? 'pill-amber' : 'pill-green'}">${s}</span>`;
  const tonePill = (t, label) => `<span class="pill ${t === 'red' ? 'pill-red' : t === 'amber' ? 'pill-amber' : 'pill-green'}">${label}</span>`;

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
      <span>Owner &amp; Technical Manager Risk Report &middot; Real World</span>
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
      eyebrow: 'Counterparty risk assessment',
      title: 'Owner &amp; Technical<br />Manager Risk Report',
      sub: 'A counterparty view of the vessels a manager or owner controls — what the fleet is made of, how it scores, its casualty and compliance record, the corporate associations behind it, and where it trades.',
      subject: { k:P.meta.role, v:P.meta.subject, d:`${s.vessels} vessels &middot; ${s.totalGt} &middot; ${s.insuredValue} insured &middot; average score ${s.avgScore} (${s.verdict})` },
      meta: [['Reporting period', P.meta.period]],
      reportId: P.meta.reportId, owner: P.meta.owner, generatedOn: P.meta.generatedOn,
    });
  }

  function frontToc() {
    return RF.toc({
      head: head('Contents'), foot: foot(2),
      note: 'Scores are Real World Risk Scores on a 0–100 scale. Peer comparisons use managers of similar fleet size and vessel mix. Page numbers refer to this document.',
      rows: [
        { front:true, title:'Executive summary', sub:'Counterparty position at a glance, headline findings for the window.', page:3 },
        { n:'01', title:'Associated vessels', sub:'Vessels currently under the counterparty\u2019s management or ownership.', page:4 },
        { n:'02', title:'Fleet composition', sub:'Type, age and flag profile with inspection record.', page:5 },
        { n:'03', title:'Risk Score distribution', sub:'Score bands across the managed fleet against the portfolio distribution.', page:6 },
        { n:'04', title:'Highest Risk Score vessels', sub:'The worst-scoring vessels under management and their drivers.', page:6 },
        { n:'05', title:'Casualty history', sub:'Casualty record over the window with rate against the peer group.', page:7 },
        { n:'06', title:'Sanctions / compliance indicators', sub:'Open indicators, list matches and screening outcomes.', page:8 },
        { n:'07', title:'Relevant fleet associations', sub:'Owners, managers and former managers connected to this fleet.', page:9 },
        { n:'08', title:'Geographic activity', sub:'Regions and ports used, with listed-area exposure.', page:10 },
      ],
    });
  }

  function frontExec() {
    const s = P.summary, d = P.distribution, c = P.composition;
    const maxD = Math.max(...d.map(x => x.n));
    const maxT = Math.max(...c.byType.map(x => x.avg));
    return RF.exec({
      head: head('Executive summary'), foot: foot(3),
      standfirst: `${P.meta.subject} (${P.meta.role.toLowerCase()}, ${P.meta.hq}) assessed over ${P.meta.window.toLowerCase()} to ${P.meta.period.split('\u2013')[1].trim()}. Scores are Real World Risk Scores, 0\u2013100, lower is better.`,
      hero: [
        { cls:'lead', k:'Average fleet Risk Score', v:s.avgScore, d:`<span class="delta-up">${s.avgScoreDelta}</span> in period &middot; portfolio average ${s.peerAvg} &middot; ${s.verdict}`,
          meter:{ pinPct:s.avgScore, scale:[{at:0,l:'0'},{at:25,l:'25'},{at:50,l:'50'},{at:100,l:'100'}], segments:[{pct:25,color:'#16a34a'},{pct:25,color:'#84cc16'},{pct:10,color:'#d97706'},{pct:20,color:'#ea580c'},{pct:20,color:'#b91c1c'}] } },
        { cls:'warn', k:'Vessels under management', v:s.vessels, d:`<span class="delta-up">${s.vesselsDelta}</span> in period &middot; ${s.totalGt}` },
        { cls:'warn', k:'Vessels scoring 61+', v:s.highScore, d:`${(s.highScore / s.vessels * 100).toFixed(1)}% of the fleet` },
        { cls:'warn', k:'Casualty rate', v:s.casualtyRate, d:`per 100 vessels/yr &middot; peer ${s.peerCasualtyRate} (${P.casualties.summary.vsPeer})` },
        { cls:'warn', k:'Open compliance indicators', v:s.sanctionsFlags, d:`${s.escalated} escalated to compliance` },
        { k:'Insured value', v:s.insuredValue, d:`${s.flags} flags &middot; ${s.owners} owning groups` },
        { cls:'warn', k:'Average fleet age', v:c.avgAge, d:`years &middot; peer average ${c.peerAvgAge}` },
      ],
      left: { title:'Score distribution', rows:d.map(x => ({ n:`${x.band} (${x.range})`, pct:Math.round(x.n / maxD * 100), v:x.n, color:x.color })) },
      right: { title:'Average score by vessel type', rows:c.byType.map(x => ({ n:x.type, pct:Math.round(x.avg / maxT * 100), v:x.avg, color:x.color })) },
      findings: { rows:P.findings },
    });
  }

  /* ── Page 4 — associated vessels ── */
  function page1() {
    const s = P.summary, m = P.meta;
    return `
    <article class="page" data-screen-label="Page 4">
      ${head('01 &middot; Associated vessels')}
      ${sec(ICO.users, 'Counterparty particulars', `
        <table class="rt compact">
          <tbody>
            <tr><td class="vn" style="width:180px">Name</td><td style="font-weight:600;color:#0f172a">${m.subject}</td><td class="vn" style="width:150px">Role assessed</td><td>${m.role}</td></tr>
            <tr><td class="vn">Head office</td><td>${m.hq}</td><td class="vn">IMO company number</td><td class="num">${m.imoNo}</td></tr>
            <tr><td class="vn">Operating since</td><td class="num">${m.founded}</td><td class="vn">Assessment verdict</td><td>${tonePill('red', s.verdict)}</td></tr>
          </tbody>
        </table>
        <div class="kpi-grid cols-4" style="margin-top:11px">
          <div class="kpi accent"><div class="k">Vessels associated</div><div class="v num">${s.vessels}</div><div class="d"><span class="delta-up">${s.vesselsDelta}</span> in period</div></div>
          <div class="kpi"><div class="k">Total tonnage</div><div class="v num">${s.totalGt}</div><div class="d">${s.insuredValue} insured value</div></div>
          <div class="kpi"><div class="k">Owning groups</div><div class="v num">${s.owners}</div><div class="d">${s.flags} flag registries</div></div>
          <div class="kpi"><div class="k">Average score</div><div class="v num">${s.avgScore}</div><div class="d">portfolio average ${s.peerAvg}</div></div>
        </div>`)}
      ${sec(ICO.ship, 'Vessels under management', `
        <table class="rt">
          <thead><tr><th>Vessel</th><th>Flag</th><th class="r">Built</th><th class="r">GT</th><th class="r">Score</th><th class="r">Value</th><th>Registered owner</th></tr></thead>
          <tbody>
            ${P.vessels.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo, v.type)}</td>
                <td>${flag(v.flag)}</td>
                <td class="r num">${v.built}</td>
                <td class="r num">${v.gt}</td>
                <td class="r">${scoreChip(v.score)}</td>
                <td class="r num">${v.value}</td>
                <td><div class="v-stack"><span style="color:#0f172a">${v.owner}</span><span class="v-sub num">since ${v.since}</span></div></td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.vesselNote)}
      ${foot(4)}
    </article>`;
  }

  /* ── Page 5 — fleet composition ── */
  function page2() {
    const c = P.composition;
    const maxT = Math.max(...c.byType.map(x => x.n));
    const maxA = Math.max(...c.byAge.map(x => x.n));
    const maxF = Math.max(...c.byFlag.map(x => x.n));
    return `
    <article class="page" data-screen-label="Page 5">
      ${head('02 &middot; Fleet composition')}
      ${sec(ICO.ship, 'Vessel type and age profile', `
        <table class="rt compact">
          <thead><tr><th>Vessel type</th><th class="r">Vessels</th><th class="r">Share</th><th class="r">Tonnage</th><th class="r">Avg score</th><th>Profile</th></tr></thead>
          <tbody>
            ${c.byType.map(x => `
              <tr>
                <td class="vn">${x.type}</td>
                <td class="r num">${x.n}</td>
                <td class="r num">${x.pct}%</td>
                <td class="r num">${x.gt}</td>
                <td class="r">${scoreChip(x.avg)}</td>
                <td style="min-width:90px"><span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.n / maxT * 100)}%;background:${x.color}"></span></span></td>
              </tr>`).join('')}
          </tbody>
        </table>
        <table class="rt compact" style="margin-top:7px">
          <thead><tr><th>Age band</th><th class="r">Vessels</th><th class="r">Share</th><th class="r">Avg score</th><th>Profile</th></tr></thead>
          <tbody>
            ${c.byAge.map(x => `
              <tr>
                <td class="vn">${x.band}</td>
                <td class="r num">${x.n}</td>
                <td class="r num">${x.pct}%</td>
                <td class="r">${scoreChip(x.avg)}</td>
                <td style="min-width:110px"><span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.n / maxA * 100)}%;background:${x.color}"></span></span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, `Average fleet age ${c.avgAge} years against a peer ${c.peerAvgAge}; score rises with age at every band.`)}
      ${sec(ICO.flag2, 'Flag profile and inspection record', `
        <table class="rt compact">
          <thead><tr><th>Registry</th><th class="r">Vessels</th><th class="r">Avg score</th><th>Standing</th><th>Profile</th></tr></thead>
          <tbody>
            ${c.byFlag.map(x => `
              <tr>
                <td style="white-space:nowrap">${flag(x.flag)} <span style="font-weight:600;color:#0f172a">${x.name}</span></td>
                <td class="r num">${x.n}</td>
                <td class="r">${scoreChip(x.avg)}</td>
                <td><span class="pill ${x.standing === 'Watchlisted' ? 'pill-red' : x.standing.includes('grey') ? 'pill-amber' : 'pill-green'}">${x.standing}</span></td>
                <td style="min-width:80px"><span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.n / maxF * 100)}%;background:${x.standing === 'Watchlisted' ? '#b91c1c' : 'var(--brand-600,#2d7ffb)'}"></span></span></td>
              </tr>`).join('')}
          </tbody>
        </table>
        <div class="kpi-grid cols-4" style="margin-top:8px">
          <div class="kpi"><div class="k">PSC inspections</div><div class="v num">${c.psc.inspections}</div><div class="d">over the window</div></div>
          <div class="kpi"><div class="k">Detentions</div><div class="v num">${c.psc.detentions}</div><div class="d">across 4 vessels</div></div>
          <div class="kpi"><div class="k">Deficiencies per inspection</div><div class="v num">${c.psc.deficiencyRate}</div><div class="d">peer average ${c.psc.peerDeficiencyRate}</div></div>
          <div class="kpi accent"><div class="k">Watchlisted-flag vessels</div><div class="v num">12</div><div class="d">of ${P.summary.vessels} under management</div></div>
        </div>`)}
      ${foot(5)}
    </article>`;
  }

  /* ── Page 6 — score distribution + highest scores ── */
  function page3() {
    const d = P.distribution, maxN = Math.max(...d.map(x => x.n));
    return `
    <article class="page" data-screen-label="Page 6">
      ${head('03\u201304 &middot; Score distribution &amp; worst vessels')}
      ${sec(ICO.chart, 'Risk Score distribution', `
        <div class="dist">
          <div>
            <div class="dist-chart" style="height:160px">
              ${d.map(x => `
                <div class="dist-col">
                  <span class="dist-val num">${x.n}</span>
                  <span class="dist-bar" style="height:${Math.round(x.n / maxN * 128)}px;background:${x.color}"></span>
                </div>`).join('')}
            </div>
            <div class="dist-x">${d.map(x => `<span>${x.band}<br />${x.range}</span>`).join('')}</div>
          </div>
          <div class="legend">
            ${d.map(x => `
              <div class="legend-row">
                <span class="sw" style="background:${x.color}"></span>
                <span>${x.pct}% &middot; portfolio ${x.peerPct}%</span>
                <span class="lv num" style="color:${x.pct > x.peerPct ? '#b91c1c' : '#15803d'}">${x.pct > x.peerPct ? '+' : ''}${(x.pct - x.peerPct).toFixed(1)}</span>
              </div>`).join('')}
          </div>
        </div>`, P.distNote)}
      ${sec(ICO.alert, 'Highest Risk Score vessels', `
        <table class="rt compact">
          <thead><tr><th>Vessel</th><th>Flag</th><th class="r">Score</th><th class="r">Prev</th><th class="r">Move</th><th>Primary driver</th><th class="r">Value</th></tr></thead>
          <tbody>
            ${P.highest.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo, v.type)}</td>
                <td>${flag(v.flag)}</td>
                <td class="r">${scoreChip(v.score)}</td>
                <td class="r num">${v.prev}</td>
                <td class="r"><span class="delta-up num">+${v.score - v.prev}</span></td>
                <td>${v.driver}</td>
                <td class="r num">${v.value}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, `Eight of the eleven vessels scoring 61 or above. Every one has risen since the previous report.`)}
      ${foot(6)}
    </article>`;
  }

  /* ── Page 7 — casualty history ── */
  function page4() {
    const c = P.casualties, s = c.summary;
    return `
    <article class="page" data-screen-label="Page 7">
      ${head('05 &middot; Casualty history')}
      ${sec(ICO.life, 'Casualty record over the window', `
        <div class="kpi-grid cols-4">
          <div class="kpi accent"><div class="k">Casualties</div><div class="v num">${s.total}</div><div class="d">${s.serious} serious</div></div>
          <div class="kpi"><div class="k">Casualty rate</div><div class="v num">${s.rate}</div><div class="d">per 100 vessels/yr</div></div>
          <div class="kpi"><div class="k">vs peer group</div><div class="v num">${s.vsPeer}</div><div class="d">peer rate ${s.peerRate}</div></div>
          <div class="kpi"><div class="k">Total reserve</div><div class="v num">${s.reserve}</div><div class="d">${s.openClaims} claims open</div></div>
        </div>
        <table class="rt" style="margin-top:11px">
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
        </table>`, 'RED KITE appears twice, both machinery failures 20 months apart on a vessel of 27 years. Four casualties fall on vessels held by two owning groups.')}
      ${sec(ICO.chart, 'Reading the rate', `
        <div class="ind-grid cols-3">
          <div class="ind"><div class="ik">This counterparty</div><div class="iv num" style="color:#b91c1c">${s.rate}</div><div class="id">casualties per 100 vessels/yr</div></div>
          <div class="ind"><div class="ik">Peer group median</div><div class="iv num" style="color:#b45309">${s.peerRate}</div><div class="id">comparable managers</div></div>
          <div class="ind"><div class="ik">Global fleet</div><div class="iv num" style="color:#15803d">0.68</div><div class="id">all tracked vessels</div></div>
        </div>`, 'A 38-vessel fleet is small enough that a single repeat-offender vessel moves the rate materially; even excluding RED KITE the rate is 4.24, still well above peers.')}
      ${foot(7)}
    </article>`;
  }

  /* ── Page 8 — sanctions / compliance ── */
  function page5() {
    const c = P.compliance;
    return `
    <article class="page" data-screen-label="Page 8">
      ${head('06 &middot; Sanctions / compliance indicators')}
      ${sec(ICO.shield, 'Compliance indicators across the managed fleet', `
        <div class="ind-grid cols-3">
          ${c.indicators.map(i => `
            <div class="ind" style="background:${i.tone === 'red' ? '#fef2f2' : '#fffbeb'};border-color:${i.tone === 'red' ? '#fecaca' : '#fde68a'}">
              <div class="ik">${i.k}</div>
              <div class="iv num" style="color:${i.tone === 'red' ? '#b91c1c' : '#b45309'}">${i.v}</div>
            </div>`).join('')}
        </div>`, 'Indicators are counted across all vessels under management at any point in the window.')}
      ${sec(ICO.alert, 'Open indicators', `
        <table class="rt">
          <thead><tr><th>Vessel</th><th>Indicator</th><th>List</th><th>Raised</th><th>Severity</th><th>Status</th></tr></thead>
          <tbody>
            ${c.events.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo)}</td>
                <td><div class="v-stack"><span style="font-weight:600;color:#0f172a">${v.ind}</span><span class="v-sub">${v.note}</span></div></td>
                <td>${v.list}</td>
                <td class="num">${v.on}</td>
                <td>${sevPill(v.sev)}</td>
                <td style="font-weight:600;color:${v.status === 'Escalated' ? '#b91c1c' : '#334155'}">${v.status}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, c.note)}
      ${foot(8)}
    </article>`;
  }

  /* ── Page 9 — fleet associations ── */
  function page6() {
    const a = P.associations, maxA = Math.max(...a.map(x => x.avg));
    return `
    <article class="page" data-screen-label="Page 9">
      ${head('07 &middot; Relevant fleet associations')}
      ${sec(ICO.network, 'Parties connected to this fleet', `
        <table class="rt">
          <thead><tr><th>Party</th><th>Relationship</th><th class="r">Shared vessels</th><th class="r">Avg score</th><th>Assessment</th></tr></thead>
          <tbody>
            ${a.map(x => `
              <tr>
                <td class="vn">${x.name}</td>
                <td style="white-space:nowrap">${x.role}</td>
                <td class="r num">${x.shared}</td>
                <td class="r">${scoreChip(x.avg)}</td>
                <td><div class="v-stack">${tonePill(x.tone, x.tone === 'red' ? 'Adverse' : x.tone === 'amber' ? 'Monitor' : 'Clear')}<span class="v-sub">${x.note}</span></div></td>
              </tr>`).join('')}
          </tbody>
        </table>
        <div class="bar-list" style="margin-top:11px">
          ${a.map(x => `
            <div class="bl-row">
              <span class="bl-name">${x.name}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.avg / maxA * 100)}%;background:${x.tone === 'red' ? '#b91c1c' : x.tone === 'amber' ? '#d97706' : '#16a34a'}"></span></span>
              <span class="bl-val num">${x.avg} avg</span>
            </div>`).join('')}
        </div>`, P.assocNote)}
      ${foot(9)}
    </article>`;
  }

  /* ── Page 10 — geographic activity ── */
  function page7() {
    const g = P.geography, maxC = Math.max(...g.regions.map(x => x.calls));
    return `
    <article class="page" data-screen-label="Page 10">
      ${head('08 &middot; Geographic activity')}
      ${sec(ICO.globe, 'Regions used over the window', `
        <table class="rt">
          <thead><tr><th>Region</th><th class="r">Port calls</th><th class="r">Vessels</th><th class="r">Vessel days</th><th>Listing</th><th>Profile</th></tr></thead>
          <tbody>
            ${g.regions.map(x => `
              <tr>
                <td class="vn">${x.region}</td>
                <td class="r num">${x.calls}</td>
                <td class="r num">${x.vessels}</td>
                <td class="r num">${x.days}</td>
                <td><span class="pill ${x.listed ? 'pill-red' : 'pill-slate'}">${x.listed ? 'JWC listed' : 'Not listed'}</span></td>
                <td style="min-width:100px"><span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.calls / maxC * 100)}%;background:${x.tone}"></span></span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, g.note)}
      ${sec(ICO.pin, 'Most-used ports', `
        <table class="rt compact">
          <thead><tr><th>Port</th><th class="r">Calls</th><th class="r">Vessels</th><th>Note</th></tr></thead>
          <tbody>
            ${g.ports.map(p => `
              <tr>
                <td style="white-space:nowrap">${flag(p.country)} <span style="font-weight:600;color:#0f172a">${p.port}</span></td>
                <td class="r num">${p.calls}</td>
                <td class="r num">${p.vessels}</td>
                <td>${p.note}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Fujairah accounts for one call in seven across the fleet, and is where both open ship-to-ship indicators arose.')}
      ${foot(10)}
    </article>`;
  }

  window.otmReport = {
    Toolbar() {
      return `
      <div class="doc-toolbar no-print">
        <div style="display:flex;align-items:center;gap:14px;min-width:0">
          <a href="Reports.html" class="tb-btn" style="text-decoration:none" title="Back to Reports" aria-label="Back to Reports">${ic(ICO.back, 14)}<span class="tb-lbl">Reports</span></a>
          <div style="min-width:0">
            <div class="tb-title">Owner &amp; Technical Manager Risk Report</div>
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
      return [frontCover(), frontToc(), frontExec(), page1(), page2(), page3(), page4(), page5(), page6(), page7()].join('');
    },
  };
})();
