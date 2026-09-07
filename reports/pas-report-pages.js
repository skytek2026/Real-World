/* Portfolio Audit for Sanctions — page composition */
(function () {
  const P = window.PAS;
  const RF = window.reportFront;
  const TOTAL = 9;
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    trend:'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
    life:'<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
    roll:'<path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3"/><path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/><path d="M12 8v8"/><path d="M8 12h8"/>',
    flag2:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    layers:'<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="M2 12.5a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 .59-.92"/><path d="M2 17.5a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 .59-.92"/>',
    swords:'<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/>',
    arrowIn:'<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>',
    arrowOut:'<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    print:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    back:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  };
  const flag = cc => `<img class="flagimg" src="https://flagcdn.com/w40/${cc}.png" srcset="https://flagcdn.com/w80/${cc}.png 2x" alt="${cc.toUpperCase()}" width="19" height="13" />`;
  const scoreChip = n => `<span class="score ${n > 60 ? 'sc-high' : n > 40 ? 'sc-med' : 'sc-low'}">${n}</span>`;
  const sevPill = s => `<span class="pill ${s === 'Critical' || s === 'Serious' ? 'pill-red' : s === 'High' || s === 'Moderate' || s === 'Elevated' ? 'pill-amber' : s === 'Improved' ? 'pill-green' : 'pill-slate'}">${s}</span>`;
  const vStack = (name, imo, type) => `<div class="v-stack"><span class="v-name">${name}</span><span class="v-sub num">IMO ${imo}${type ? ' &middot; ' + type : ''}</span></div>`;
  const dirPill = d => `<span class="pill ${d === 'in' ? 'pill-blue' : 'pill-slate'}">${ic(d === 'in' ? ICO.arrowIn : ICO.arrowOut, 10)}${d === 'in' ? 'In' : 'Out'}</span>`;

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
      <span>Portfolio Audit for Sanctions &middot; Real World</span>
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
      eyebrow: 'Monthly sanctions audit',
      title: 'Portfolio Audit<br />for Sanctions',
      sub: 'A period audit of everything that changed in the book and what it means for sanctions exposure — score movements, casualties, new indicators, vessels on and off risk, flag, ownership and management changes, regional movement and war-risk exposure.',
      subject: { k:'Portfolio', v:P.meta.portfolio, d:`${s.vesselsAudited.toLocaleString()} vessels audited &middot; ${s.changesLogged} changes logged &middot; ${s.listMatches} list matches` },
      meta: [['Reporting period', P.meta.period]],
      reportId: P.meta.reportId, owner: P.meta.owner, generatedOn: P.meta.generatedOn,
    });
  }

  function frontToc() {
    return RF.toc({
      head: head('Contents'), foot: foot(2),
      note: `Lists screened: ${P.meta.lists}. Page numbers refer to this document.`,
      rows: [
        { front:true, title:'Executive summary', sub:'Audit position at a glance, headline findings for the period.', page:3 },
        { n:'01', title:'Risk Score movements', sub:'Vessels whose Real World Risk Score moved materially, with the cause of each move.', page:4 },
        { n:'02', title:'New casualties', sub:'Casualties first reported in the period and whether any sanctions nexus was found.', page:5 },
        { n:'03', title:'New sanctions indicators', sub:'Indicators raised in the period and the full list-screening result.', page:5 },
        { n:'04', title:'New / removed vessels', sub:'Vessels added to and removed from risk, with screening outcome on entry.', page:6 },
        { n:'05', title:'Flag changes', sub:'Registry changes and their effect on registry-risk weighting.', page:7 },
        { n:'06', title:'Ownership / management changes', sub:'Beneficial owner, manager and charterer changes with screening outcome.', page:7 },
        { n:'07', title:'Vessels entering / leaving selected regions', sub:'Boundary crossings for monitored and listed regions, with dwell time.', page:8 },
        { n:'08', title:'Changes in regional concentration', sub:'Movement in vessel counts and insured value by region against limits.', page:9 },
        { n:'09', title:'New war-risk exposure', sub:'First entries into listed areas, warranty position and additional premium.', page:9 },
      ],
    });
  }

  function frontExec() {
    const s = P.summary, c = P.categories;
    const maxC = Math.max(...c.map(x => x.count));
    const maxK = Math.max(...P.concentration.map(x => x.vNow));
    return RF.exec({
      head: head('Executive summary'), foot: foot(3),
      standfirst: `Audit of ${P.meta.portfolio} for ${P.meta.period}, against the ${P.meta.previous} report. All ${s.vesselsAudited.toLocaleString()} vessels were re-screened on ${s.lastFullScreen}.`,
      hero: [
        { cls:'lead', k:'Changes logged in the period', v:s.changesLogged, d:`<span class="delta-up">${s.changesDelta}</span> vs previous &middot; across ${s.vesselsChanged} vessels`,
          meter:{ pinPct:s.clearedPct, scale:[{at:0,l:'0% cleared'},{at:100,l:'100% cleared'}], segments:[{pct:80,color:'#dc2626'},{pct:15,color:'#d97706'},{pct:5,color:'#16a34a'}] } },
        { cls:'warn', k:'Confirmed list matches', v:s.listMatches, d:`OFAC, EU and OFSI &middot; ${s.escalated} items escalated` },
        { cls:'warn', k:'Open compliance reviews', v:s.openReviews, d:'awaiting evidence or committee decision' },
        { k:'Vessels audited', v:s.vesselsAudited.toLocaleString(), d:`${s.clearedPct}% cleared without a finding` },
        { cls:'warn', k:'Flag &amp; ownership changes', v:P.flagChanges.length + P.ownership.length, d:`${P.flagChanges.length} flag &middot; ${P.ownership.length} ownership or management` },
        { k:'Vessels on / off risk', v:`+${P.rollSummary.added}/\u2212${P.rollSummary.removed}`, d:`net ${P.rollSummary.netVessels} vessels &middot; ${P.rollSummary.netValue} value` },
        { cls:'warn', k:'War-risk exposed value', v:s.warExposedValue, d:`${P.warRisk.reduce((a,w) => a + w.newVessels, 0)} vessels newly exposed` },
      ],
      left: { title:'Changes by audit category', rows:c.map(x => ({ n:x.label, pct:Math.round(x.count / maxC * 100), v:x.count, color:x.color })) },
      right: { title:'Vessels by monitored region', rows:P.concentration.map(x => ({ n:x.region, pct:Math.round(x.vNow / maxK * 100), v:`${x.vNow} (${x.dV})`, color:x.tone })) },
      findings: { rows:P.findings },
    });
  }

  /* ── Page 4 — risk score movements ── */
  function page1() {
    const s = P.summary, b = P.scoreBands, maxB = Math.max(...b.map(x => x.count));
    return `
    <article class="page" data-screen-label="Page 4">
      ${head('01 &middot; Risk Score movements')}
      ${sec(ICO.shield, 'Audit coverage for the period', `
        <div class="kpi-grid cols-4">
          <div class="kpi accent"><div class="k">Vessels audited</div><div class="v num">${s.vesselsAudited.toLocaleString()}</div><div class="d">re-screened ${s.lastFullScreen}</div></div>
          <div class="kpi"><div class="k">Changes logged</div><div class="v num">${s.changesLogged}</div><div class="d"><span class="delta-up">${s.changesDelta}</span> vs ${P.meta.previous}</div></div>
          <div class="kpi"><div class="k">Confirmed list matches</div><div class="v num">${s.listMatches}</div><div class="d">${s.escalated} items escalated</div></div>
          <div class="kpi"><div class="k">Open reviews</div><div class="v num">${s.openReviews}</div><div class="d">${s.clearedPct}% cleared</div></div>
        </div>
        <div class="bar-list" style="margin-top:11px">
          ${b.map(x => `
            <div class="bl-row">
              <span class="bl-name">${x.band}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.count / maxB * 100)}%;background:${x.color}"></span></span>
              <span class="bl-val num">${x.count.toLocaleString()}</span>
            </div>`).join('')}
        </div>`, 'Score movement bands cover the whole portfolio; the table below lists every material move.')}
      ${sec(ICO.trend, 'Material Risk Score movements', `
        <table class="rt">
          <thead><tr><th>Vessel</th><th>Flag</th><th class="r">From</th><th class="r">To</th><th class="r">Change</th><th>Cause of movement</th></tr></thead>
          <tbody>
            ${P.scoreMoves.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo)}</td>
                <td>${flag(v.flag)}</td>
                <td class="r num">${v.from}</td>
                <td class="r">${scoreChip(v.to)}</td>
                <td class="r"><span class="${v.dir === 'up' ? 'delta-up' : 'delta-down'} num">${v.dir === 'up' ? '+' : '\u2212'}${v.delta}</span></td>
                <td>${v.cause}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Movements of nine points or more, plus any move on a vessel already carrying a sanctions indicator.')}
      ${foot(4)}
    </article>`;
  }

  /* ── Page 5 — casualties + sanctions indicators ── */
  function page2() {
    return `
    <article class="page" data-screen-label="Page 5">
      ${head('02\u201303 &middot; Casualties &amp; new indicators')}
      ${sec(ICO.life, 'New casualties reported in the period', `
        <table class="rt">
          <thead><tr><th>Date</th><th>Vessel</th><th>Type</th><th>Severity</th><th>Location</th><th>Sanctions nexus</th><th>Status</th></tr></thead>
          <tbody>
            ${P.casualties.map(c => `
              <tr>
                <td class="num">${c.date}</td>
                <td>${vStack(c.name, c.imo)}</td>
                <td><div class="v-stack"><span style="font-weight:600;color:#0f172a">${c.type}</span><span class="v-sub">${c.detail}</span></div></td>
                <td>${sevPill(c.sev)}</td>
                <td>${c.loc}</td>
                <td><span class="pill ${c.sanctionsRel === 'Yes' ? 'pill-red' : 'pill-green'}">${c.sanctionsRel}</span></td>
                <td>${c.status}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Each casualty is checked for a sanctions nexus in the counterparties, cargo and ports involved.')}
      ${sec(ICO.shield, 'New sanctions indicators', `
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
        </table>`)}
      ${foot(5)}
    </article>`;
  }

  /* ── Page 6 — list screening + vessel roll ── */
  function page3() {
    const r = P.rollSummary;
    return `
    <article class="page" data-screen-label="Page 6">
      ${head('03\u201304 &middot; Screening result &amp; vessel roll')}
      ${sec(ICO.shield, 'Full list-screening result', `
        <table class="rt compact">
          <thead><tr><th>List</th><th class="r">Vessels screened</th><th class="r">Hits</th><th>Outcome</th></tr></thead>
          <tbody>
            ${P.screening.map(s => `
              <tr>
                <td class="vn">${s.list}</td>
                <td class="r num">${s.screened.toLocaleString()}</td>
                <td class="r num" style="font-weight:700;color:${s.hits ? '#b91c1c' : '#15803d'}">${s.hits}</td>
                <td>${sevPill(s.status === 'Clear' ? 'Improved' : s.status === 'Escalated' ? 'Critical' : 'Medium')}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, `Screening reflects list data as published at generation on ${P.meta.generatedOn}. Every vessel, registered owner, beneficial owner and manager is screened against each list.`)}
      ${sec(ICO.roll, 'New and removed vessels', `
        <div class="kpi-grid cols-4">
          <div class="kpi accent"><div class="k">Added to risk</div><div class="v num">${r.added}</div><div class="d">${r.addedValue} insured value</div></div>
          <div class="kpi"><div class="k">Removed from risk</div><div class="v num">${r.removed}</div><div class="d">${r.removedValue} insured value</div></div>
          <div class="kpi"><div class="k">Net vessels</div><div class="v num">${r.netVessels}</div><div class="d">against ${P.summary.vesselsAudited.toLocaleString()} audited</div></div>
          <div class="kpi"><div class="k">Net value</div><div class="v num">${r.netValue}</div><div class="d">movement in the period</div></div>
        </div>
        <table class="rt" style="margin-top:11px">
          <thead><tr><th></th><th>Date</th><th>Vessel</th><th>Flag</th><th class="r">Score</th><th class="r">Value</th><th>Reason</th></tr></thead>
          <tbody>
            ${P.roll.map(v => `
              <tr>
                <td>${dirPill(v.dir)}</td>
                <td class="num">${v.date}</td>
                <td>${vStack(v.name, v.imo, v.type)}</td>
                <td>${flag(v.flag)}</td>
                <td class="r">${scoreChip(v.score)}</td>
                <td class="r num">${v.value}</td>
                <td>${v.why}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Every vessel added to risk is screened against all lists on entry; removals are screened once more at exit.')}
      ${foot(6)}
    </article>`;
  }

  /* ── Page 7 — flag, ownership & management ── */
  function page4() {
    return `
    <article class="page" data-screen-label="Page 7">
      ${head('05\u201306 &middot; Flag, ownership &amp; management')}
      ${sec(ICO.flag2, 'Flag changes', `
        <table class="rt">
          <thead><tr><th>Vessel</th><th>From</th><th>To</th><th>Date</th><th>Registry risk</th><th>Effect</th></tr></thead>
          <tbody>
            ${P.flagChanges.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo)}</td>
                <td style="white-space:nowrap">${flag(v.from)} ${v.fromN}</td>
                <td style="white-space:nowrap">${flag(v.to)} ${v.toN}</td>
                <td class="num">${v.on}</td>
                <td>${sevPill(v.risk)}</td>
                <td>${v.note}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Registry risk compares the outgoing and incoming flag against Paris and Tokyo MoU standing and the internal watchlist.')}
      ${sec(ICO.users, 'Ownership and management changes', `
        <table class="rt">
          <thead><tr><th>Vessel</th><th>Role</th><th>From</th><th>To</th><th>Date</th><th>Screening</th></tr></thead>
          <tbody>
            ${P.ownership.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo)}</td>
                <td style="white-space:nowrap">${v.role}</td>
                <td>${v.from}</td>
                <td><div class="v-stack"><span style="font-weight:600;color:#0f172a">${v.to}</span><span class="v-sub">${v.note}</span></div></td>
                <td class="num">${v.on}</td>
                <td>${sevPill(v.risk)}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Each incoming party is screened against all lists, including indirect holdings through intermediate entities.')}
      ${foot(7)}
    </article>`;
  }

  /* ── Page 8 — region entries and exits ── */
  function page5() {
    const inn = P.regionFlow.filter(r => r.dir === 'in').length;
    const out = P.regionFlow.filter(r => r.dir === 'out').length;
    return `
    <article class="page" data-screen-label="Page 8">
      ${head('07 &middot; Region entries &amp; exits')}
      ${sec(ICO.globe, 'Vessels entering and leaving selected regions', `
        <table class="rt">
          <thead><tr><th></th><th>Timestamp</th><th>Vessel</th><th>Region</th><th>Listing</th><th class="r">Dwell</th></tr></thead>
          <tbody>
            ${P.regionFlow.map(r => `
              <tr>
                <td>${dirPill(r.dir)}</td>
                <td class="num">${r.date}</td>
                <td>${vStack(r.name, r.imo)}</td>
                <td class="vn">${r.region}</td>
                <td><span class="pill ${r.listed ? 'pill-red' : 'pill-slate'}">${r.listed ? 'JWC listed' : 'Monitored'}</span></td>
                <td class="r num">${r.dwell}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, `${inn} entries and ${out} exits recorded across the monitored region set in the period. Dwell time is the continuous period spent inside the region boundary.`)}
      ${foot(8)}
    </article>`;
  }

  /* ── Page 9 — concentration + war risk ── */
  function page6() {
    return `
    <article class="page" data-screen-label="Page 9">
      ${head('08\u201309 &middot; Concentration &amp; war risk')}
      ${sec(ICO.layers, 'Changes in regional concentration', `
        <table class="rt">
          <thead><tr><th>Region</th><th class="r">Vessels now</th><th class="r">Previous</th><th class="r">Change</th><th class="r">Value now</th><th class="r">Value change</th><th class="r">Limit</th></tr></thead>
          <tbody>
            ${P.concentration.map(c => `
              <tr>
                <td class="vn">${c.region}</td>
                <td class="r"><span class="score ${c.vNow > c.limit ? 'sc-high' : 'sc-low'}">${c.vNow}</span></td>
                <td class="r num">${c.vPrev}</td>
                <td class="r"><span class="${c.dV.startsWith('-') ? 'delta-down' : 'delta-up'} num">${c.dV}</span></td>
                <td class="r num">${c.vNowVal}</td>
                <td class="r"><span class="${c.dVal.startsWith('-') ? 'delta-down' : 'delta-up'} num">${c.dVal}</span></td>
                <td class="r num">${c.limit}</td>
              </tr>`).join('')}
          </tbody>
        </table>
        <div class="bar-list" style="margin-top:11px">
          ${P.concentration.map(c => {
            const cap = Math.max(c.vNow, c.limit);
            return `
            <div class="bl-row">
              <span class="bl-name">${c.region}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${Math.round(c.vNow / cap * 100)}%;background:${c.tone}"></span></span>
              <span class="bl-val num">${c.vNow} / ${c.limit}</span>
            </div>`;
          }).join('')}
        </div>`, P.concNote)}
      ${sec(ICO.swords, 'New war-risk exposure', `
        <table class="rt">
          <thead><tr><th>Area</th><th class="r">Newly exposed</th><th class="r">Value</th><th class="r">First entry</th><th class="r">Breaches</th><th>Warranty position</th></tr></thead>
          <tbody>
            ${P.warRisk.map(w => `
              <tr>
                <td><div class="v-stack"><span class="v-name">${w.area}</span><span class="v-sub">${w.listing}</span></div></td>
                <td class="r num">${w.newVessels}</td>
                <td class="r num">${w.value}</td>
                <td class="r num">${w.firstEntry}</td>
                <td class="r num" style="font-weight:700;color:${w.breach ? '#b91c1c' : '#15803d'}">${w.breach}</td>
                <td style="font-weight:600;color:${w.breach ? '#b91c1c' : '#334155'}">${w.ap}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.warNote)}
      ${foot(9)}
    </article>`;
  }

  window.pasReport = {
    Toolbar() {
      return `
      <div class="doc-toolbar no-print">
        <div style="display:flex;align-items:center;gap:14px;min-width:0">
          <a href="Reports.html" class="tb-btn" style="text-decoration:none" title="Back to Reports" aria-label="Back to Reports">${ic(ICO.back, 14)}<span class="tb-lbl">Reports</span></a>
          <div style="min-width:0">
            <div class="tb-title">Portfolio Audit for Sanctions</div>
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
