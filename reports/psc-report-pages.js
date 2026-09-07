/* Portfolio Sanctions & Compliance Report — page composition */
(function () {
  const P = window.PSC;
  const RF = window.reportFront;
  const TOTAL = 9;
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    anchor:'<path d="M12 22V8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><circle cx="12" cy="5" r="3"/>',
    radio:'<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>',
    swap:'<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/>',
    chart:'<path d="M13 17V9"/><path d="M18 17V5"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-3"/>',
    print:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    back:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  };
  const flag = cc => `<img class="flagimg" src="https://flagcdn.com/w40/${cc}.png" srcset="https://flagcdn.com/w80/${cc}.png 2x" alt="${cc.toUpperCase()}" width="19" height="13" />`;
  const vStack = (name, imo, type) => `<div class="v-stack"><span class="v-name">${name}</span><span class="v-sub num">IMO ${imo}${type ? ' &middot; ' + type : ''}</span></div>`;
  const confPill = c => `<span class="pill ${c === 'Confirmed' ? 'pill-red' : 'pill-amber'}">${c}</span>`;
  const statusTxt = s => `<span style="font-weight:600;color:${s === 'Escalated' ? '#b91c1c' : '#334155'}">${s}</span>`;

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
      <span>Portfolio Sanctions &amp; Compliance Report &middot; Real World</span>
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
      eyebrow: 'Monthly sanctions &amp; compliance sweep',
      title: 'Portfolio Sanctions<br />&amp; Compliance Report',
      sub: 'A full-book sanctions sweep: what is confirmed, what matched this period, which port calls and declared destinations point to designated ports, and every ship-to-ship transfer that touched a sanctioned vessel.',
      subject: { k:'Portfolio', v:P.meta.portfolio, d:`${s.vesselsScreened.toLocaleString()} vessels screened &middot; ${s.confirmed} confirmed matches &middot; ${s.escalated} items escalated` },
      meta: [['Reporting period', P.meta.period]],
      reportId: P.meta.reportId, owner: P.meta.owner, generatedOn: P.meta.generatedOn,
    });
  }

  function frontToc() {
    return RF.toc({
      head: head('Contents'), foot: foot(2),
      note: `Lists screened: ${P.meta.lists}. Page numbers refer to this document.`,
      rows: [
        { front:true, title:'Executive summary', sub:'Compliance position at a glance, headline findings for the period.', page:3 },
        { n:'01', title:'Confirmed sanctions information', sub:'Confirmed matches, the basis of each and the full list-screening result.', page:4 },
        { n:'02', title:'New sanctions matches', sub:'Matches raised in the period with evidence and escalation status.', page:5 },
        { n:'03', title:'Potential sanctioned port calls', sub:'Calls at designated ports and terminals, with the evidence held.', page:6 },
        { n:'04', title:'AIS-declared sanctioned port visits / destinations', sub:'Declared destinations naming designated ports, and withheld destinations.', page:7 },
        { n:'05', title:'STS activity involving sanctioned vessels', sub:'Ship-to-ship transfers with designated or watchlisted counterparties.', page:8 },
        { n:'06', title:'Actions and next steps', sub:'Open items, cover decisions required and the compliance follow-up.', page:9 },
      ],
    });
  }

  function frontExec() {
    const s = P.summary;
    const maxS = Math.max(...P.screening.map(x => x.matches + x.potential));
    return RF.exec({
      head: head('Executive summary'), foot: foot(3),
      standfirst: `Sanctions position for ${P.meta.portfolio} over ${P.meta.period}, against the ${P.meta.previous} report. All ${s.vesselsScreened.toLocaleString()} vessels were re-screened on ${s.lastFullScreen}.`,
      hero: [
        { cls:'lead', k:'Vessels screened clean', v:`${s.clearedPct}%`, d:`${(s.vesselsScreened - 33).toLocaleString()} of ${s.vesselsScreened.toLocaleString()} vessels &middot; ${s.confirmed} confirmed matches`,
          meter:{ pinPct:s.clearedPct, scale:[{at:0,l:'0% clear'},{at:50,l:'50%'},{at:100,l:'100% clear'}], segments:[{pct:85,color:'#dc2626'},{pct:10,color:'#d97706'},{pct:5,color:'#16a34a'}] } },
        { cls:'warn', k:'Confirmed matches', v:s.confirmed, d:`${s.exposedValue} of insured value affected` },
        { cls:'warn', k:'New matches this period', v:s.newMatches, d:'both escalated to compliance' },
        { cls:'warn', k:'Potential designated port calls', v:s.portCalls, d:'2 confirmed, 4 pending evidence' },
        { cls:'warn', k:'STS with sanctioned vessels', v:s.stsEvents, d:'1 confirmed with a designated vessel' },
        { k:'AIS destination flags', v:s.aisDeclared, d:'declared or withheld destinations' },
        { cls:'warn', k:'Open compliance reviews', v:s.openReviews, d:`${s.escalated} escalated` },
      ],
      left: { title:'Findings by list', rows:P.screening.map(x => ({ n:x.list, pct:Math.round((x.matches + x.potential) / maxS * 100), v:`${x.matches} / ${x.potential}`, color:x.matches ? '#b91c1c' : x.potential ? '#d97706' : '#16a34a' })) },
      right: { title:'Findings by category', rows:[
        { n:'Confirmed matches', pct:Math.round(s.confirmed / s.portCalls * 100), v:s.confirmed, color:'#b91c1c' },
        { n:'New matches', pct:Math.round(s.newMatches / s.portCalls * 100), v:s.newMatches, color:'#dc2626' },
        { n:'Designated port calls', pct:100, v:s.portCalls, color:'#ea580c' },
        { n:'AIS destination flags', pct:100, v:s.aisDeclared, color:'#d97706' },
        { n:'STS events', pct:Math.round(s.stsEvents / s.portCalls * 100), v:s.stsEvents, color:'#c2410c' },
      ] },
      findings: { rows:P.findings },
    });
  }

  /* ── Page 4 — confirmed sanctions information ── */
  function page1() {
    const s = P.summary;
    return `
    <article class="page" data-screen-label="Page 4">
      ${head('01 &middot; Confirmed sanctions information')}
      ${sec(ICO.shield, 'Confirmed matches across the portfolio', `
        <div class="kpi-grid cols-4">
          <div class="kpi accent"><div class="k">Vessels screened</div><div class="v num">${s.vesselsScreened.toLocaleString()}</div><div class="d">re-screened ${s.lastFullScreen}</div></div>
          <div class="kpi"><div class="k">Confirmed matches</div><div class="v num">${s.confirmed}</div><div class="d">${s.exposedValue} affected</div></div>
          <div class="kpi"><div class="k">Escalated items</div><div class="v num">${s.escalated}</div><div class="d">${s.openReviews} open reviews</div></div>
          <div class="kpi"><div class="k">Cleared clean</div><div class="v num">${s.clearedPct}%</div><div class="d">against all five list sets</div></div>
        </div>
        <table class="rt" style="margin-top:11px">
          <thead><tr><th>Vessel</th><th>Flag</th><th>Basis of match</th><th>List</th><th class="r">Confirmed</th><th class="r">Value</th><th>Cover position</th></tr></thead>
          <tbody>
            ${P.confirmed.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo, v.type)}</td>
                <td>${flag(v.flag)}</td>
                <td><div class="v-stack"><span style="font-weight:600;color:#0f172a">${v.basis}</span><span class="v-sub">${v.entity}</span></div></td>
                <td>${v.list}</td>
                <td class="r num">${v.designated}</td>
                <td class="r num">${v.value}</td>
                <td><div class="v-stack"><span style="font-weight:600;color:#b91c1c">${v.cover}</span><span class="v-sub">${v.action}</span></div></td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.confirmedNote)}
      ${sec(ICO.chart, 'Full list-screening result', `
        <table class="rt compact">
          <thead><tr><th>List</th><th class="r">Vessels screened</th><th class="r">Confirmed matches</th><th class="r">Potential</th><th>Outcome</th></tr></thead>
          <tbody>
            ${P.screening.map(x => `
              <tr>
                <td class="vn">${x.list}</td>
                <td class="r num">${x.screened.toLocaleString()}</td>
                <td class="r num" style="font-weight:700;color:${x.matches ? '#b91c1c' : '#15803d'}">${x.matches}</td>
                <td class="r num">${x.potential}</td>
                <td><span class="pill ${x.status === 'Escalated' ? 'pill-red' : x.status === 'Clear' ? 'pill-green' : 'pill-amber'}">${x.status}</span></td>
              </tr>`).join('')}
          </tbody>
        </table>`, `Screening covers every vessel, registered owner, beneficial owner, manager and disclosed charterer. List data as published at ${P.meta.generatedOn}.`)}
      ${foot(4)}
    </article>`;
  }

  /* ── Page 5 — new sanctions matches ── */
  function page2() {
    const t = P.matchTrend, n = t.months.length;
    const x = i => 60 + (i + 0.5) / n * 600;
    const y = v => 130 - v / 5 * 108;
    return `
    <article class="page" data-screen-label="Page 5">
      ${head('02 &middot; New sanctions matches')}
      ${sec(ICO.alert, 'Matches raised in the period', `
        <table class="rt">
          <thead><tr><th>Vessel</th><th class="r">Raised</th><th>List</th><th>Match type</th><th>Confidence</th><th>Evidence</th><th>Status</th></tr></thead>
          <tbody>
            ${P.newMatches.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo)}</td>
                <td class="r num">${v.on}</td>
                <td>${v.list}</td>
                <td style="white-space:nowrap">${v.match}</td>
                <td>${confPill(v.conf)}</td>
                <td>${v.detail}</td>
                <td>${statusTxt(v.status)}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Two matches were confirmed in the period and two remain potential pending evidence. Confirmed matches are escalated to compliance within 24 hours of confirmation.')}
      ${sec(ICO.chart, 'Match volume over six months', `
        <div class="chart-wrap">
          <div class="chart-legend">
            <span class="cl-item"><span class="cl-sw" style="background:#b91c1c"></span>Confirmed matches</span>
            <span class="cl-item"><span class="cl-sw" style="background:#d97706"></span>Potential matches</span>
          </div>
          <svg viewBox="0 0 700 160" class="linechart" role="img" aria-label="Confirmed and potential sanctions matches by month over six months">
            ${[0, 1, 2, 3, 4, 5].map(g => {
              const gy = y(g);
              return `<line x1="60" y1="${gy.toFixed(1)}" x2="660" y2="${gy.toFixed(1)}" stroke="${g === 0 ? '#cbd5e1' : '#f1f5f9'}" stroke-width="1" /><text x="52" y="${(gy + 3.5).toFixed(1)}" text-anchor="end" class="ax-lbl">${g}</text>`;
            }).join('')}
            <line x1="60" y1="14" x2="60" y2="130" stroke="#cbd5e1" stroke-width="1" />
            ${t.months.map((m, i) => {
              const bw = 600 / n * 0.22, cx = x(i);
              const yc = y(t.confirmed[i]), yp = y(t.potential[i]);
              return `
                <rect x="${(cx - bw - 2).toFixed(1)}" y="${yc.toFixed(1)}" width="${bw.toFixed(1)}" height="${(130 - yc).toFixed(1)}" rx="3" fill="#b91c1c" />
                <text x="${(cx - bw / 2 - 2).toFixed(1)}" y="${(yc - 5).toFixed(1)}" text-anchor="middle" class="pt-lbl">${t.confirmed[i]}</text>
                <rect x="${(cx + 2).toFixed(1)}" y="${yp.toFixed(1)}" width="${bw.toFixed(1)}" height="${(130 - yp).toFixed(1)}" rx="3" fill="#d97706" />
                <text x="${(cx + bw / 2 + 2).toFixed(1)}" y="${(yp - 5).toFixed(1)}" text-anchor="middle" class="pt-lbl">${t.potential[i]}</text>`;
            }).join('')}
            ${t.months.map((m, i) => `<text x="${x(i).toFixed(1)}" y="146" text-anchor="middle" class="ax-lbl">${m}</text>`).join('')}
            <text x="14" y="72" text-anchor="middle" class="ax-title" transform="rotate(-90 14 72)">Matches</text>
          </svg>
        </div>`, 'Confirmed matches doubled in the period while potential matches held steady, consistent with faster evidence turnaround rather than a rise in underlying exposure.')}
      ${foot(5)}
    </article>`;
  }

  /* ── Page 6 — potential sanctioned port calls ── */
  function page3() {
    return `
    <article class="page" data-screen-label="Page 6">
      ${head('03 &middot; Potential sanctioned port calls')}
      ${sec(ICO.anchor, 'Calls at designated ports and terminals', `
        <table class="rt">
          <thead><tr><th>Vessel</th><th>Port</th><th class="r">Arrived</th><th class="r">Departed</th><th class="r">Hours</th><th>Basis</th><th>Confidence</th><th>Evidence</th></tr></thead>
          <tbody>
            ${P.portCalls.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo)}</td>
                <td style="white-space:nowrap">${flag(v.country)} <span style="font-weight:600;color:#0f172a">${v.port}</span></td>
                <td class="r num">${v.arrived}</td>
                <td class="r num">${v.dep}</td>
                <td class="r num">${v.hours}</td>
                <td>${v.basis}</td>
                <td>${confPill(v.conf)}</td>
                <td>${v.evidence}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.portNote)}
      ${sec(ICO.chart, 'Evidence standard applied', `
        <div class="ind-grid cols-3">
          <div class="ind" style="background:#fef2f2;border-color:#fecaca">
            <div class="ik">Confirmed</div>
            <div class="iv num" style="color:#b91c1c">2</div>
            <div class="id">Berth-level imagery or a draught change consistent with cargo operations</div>
          </div>
          <div class="ind" style="background:#fffbeb;border-color:#fde68a">
            <div class="ik">Potential</div>
            <div class="iv num" style="color:#b45309">4</div>
            <div class="id">AIS track inside the port limit without corroborating berth evidence</div>
          </div>
          <div class="ind" style="background:#f8fafc">
            <div class="ik">Evidence outstanding</div>
            <div class="iv num">3</div>
            <div class="id">Imagery tasked; port agent records requested from the assured</div>
          </div>
        </div>`, 'Only confirmed calls trigger the sanctions exclusion review. Potential calls are notified to the assured with a request for port documentation.')}
      ${foot(6)}
    </article>`;
  }

  /* ── Page 7 — AIS-declared destinations ── */
  function page4() {
    const a = P.aisDeclared;
    return `
    <article class="page" data-screen-label="Page 7">
      ${head('04 &middot; AIS-declared destinations')}
      ${sec(ICO.radio, 'Declared and withheld destinations', `
        <table class="rt">
          <thead><tr><th>Vessel</th><th>AIS destination</th><th class="r">Declared</th><th>Call made</th><th>Actual port</th><th>Note</th></tr></thead>
          <tbody>
            ${a.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo)}</td>
                <td><span class="pill ${v.declared === 'FOR ORDERS' ? 'pill-amber' : 'pill-red'} num">${v.declared}</span></td>
                <td class="r num">${v.on}</td>
                <td><span class="pill ${v.arrived ? 'pill-red' : 'pill-slate'}">${v.arrived ? 'Yes' : 'No'}</span></td>
                <td>${v.actual}</td>
                <td>${v.note}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.aisNote)}
      ${sec(ICO.chart, 'Why withheld destinations matter', `
        <div class="chg">
          <div class="chg-row">
            <span class="chg-ico" style="background:#fef2f2;color:#b91c1c">${ic(ICO.alert, 12)}</span>
            <div><div class="chg-t">Two vessels withheld their destination immediately before a sanctions event</div><div class="chg-d">CASPIAN DAWN transmitted &ldquo;FOR ORDERS&rdquo; for four days up to the OFAC ship-to-ship transfer, and SIRIUS EXPRESS did the same around its unreported STS. In both cases the withheld period brackets the event.</div></div>
            <div class="chg-m" style="font-weight:700;color:#b91c1c">2 vessels</div>
          </div>
          <div class="chg-row">
            <span class="chg-ico" style="background:#fffbeb;color:#b45309">${ic(ICO.alert, 12)}</span>
            <div><div class="chg-t">One declaration named a designated port but was not followed</div><div class="chg-d">ORION TRADER declared KHARG on 11 Aug then amended to Ras Tanura 31 hours later, with no designated call made. The declaration alone is not a breach but is retained in the vessel record.</div></div>
            <div class="chg-m" style="font-weight:700;color:#b45309">1 vessel</div>
          </div>
          <div class="chg-row">
            <span class="chg-ico" style="background:#f0fdf4;color:#15803d">${ic(ICO.shield, 12)}</span>
            <div><div class="chg-t">Six declarations matched the actual call</div><div class="chg-d">Where the declared destination matched, the call is treated as openly conducted and assessed on the port designation alone rather than as an evasion indicator.</div></div>
            <div class="chg-m" style="font-weight:700;color:#15803d">6 matched</div>
          </div>
        </div>`)}
      ${foot(7)}
    </article>`;
  }

  /* ── Page 8 — STS activity ── */
  function page5() {
    return `
    <article class="page" data-screen-label="Page 8">
      ${head('05 &middot; STS activity involving sanctioned vessels')}
      ${sec(ICO.swap, 'Ship-to-ship transfers with designated or watchlisted counterparties', `
        <table class="rt">
          <thead><tr><th class="r">Date</th><th>Vessel</th><th>Counterparty</th><th>Counterparty status</th><th>Location</th><th class="r">Duration</th><th>Confidence</th></tr></thead>
          <tbody>
            ${P.sts.map(v => `
              <tr>
                <td class="r num">${v.date}</td>
                <td>${vStack(v.name, v.imo)}</td>
                <td>${v.cptyImo === '\u2014' ? `<span style="font-weight:600;color:#0f172a">${v.cpty}</span>` : vStack(v.cpty, v.cptyImo)}</td>
                <td><span class="pill ${v.cptyStatus.includes('designated') ? 'pill-red' : v.cptyStatus === 'Unknown' || v.cptyStatus.includes('watchlist') ? 'pill-amber' : 'pill-green'}">${v.cptyStatus}</span></td>
                <td>${v.loc}</td>
                <td class="r num">${v.dur}</td>
                <td><div class="v-stack">${confPill(v.conf)}<span class="v-sub">${v.evidence}</span></div></td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.stsNote)}
      ${sec(ICO.chart, 'Transfer exposure summary', `
        <div class="ind-grid cols-3">
          <div class="ind" style="background:#fef2f2;border-color:#fecaca">
            <div class="ik">With designated vessels</div>
            <div class="iv num" style="color:#b91c1c">2</div>
            <div class="id">1 confirmed, 1 potential &middot; exclusion review</div>
          </div>
          <div class="ind" style="background:#fffbeb;border-color:#fde68a">
            <div class="ik">Watchlisted or unknown</div>
            <div class="iv num" style="color:#b45309">2</div>
            <div class="id">Counterparty identification outstanding</div>
          </div>
          <div class="ind" style="background:#f0fdf4;border-color:#bbf7d0">
            <div class="ik">Clean counterparty</div>
            <div class="iv num" style="color:#15803d">1</div>
            <div class="id">Both vessels transmitting throughout</div>
          </div>
        </div>`, 'Fujairah accounts for two of the five transfers, including both events where a counterparty could not be identified from AIS alone.')}
      ${foot(8)}
    </article>`;
  }

  /* ── Page 9 — actions ── */
  function page6() {
    return `
    <article class="page" data-screen-label="Page 9">
      ${head('06 &middot; Actions and next steps')}
      ${sec(ICO.shield, 'Open items requiring a decision', `
        <table class="rt">
          <thead><tr><th>Item</th><th>Vessel</th><th>Decision required</th><th>Owner</th><th class="r">Due</th></tr></thead>
          <tbody>
            <tr>
              <td class="vn">EU beneficial-owner match</td>
              <td>${vStack('STELLA MARIS', '9411678')}</td>
              <td>Cancel or continue cover; notice of cancellation drafted</td>
              <td>Compliance / committee</td>
              <td class="r num">12 Sep 2026</td>
            </tr>
            <tr>
              <td class="vn">OFAC STS counterparty</td>
              <td>${vStack('CASPIAN DAWN', '9204338')}</td>
              <td>Apply sanctions exclusion or accept with warranty</td>
              <td>Committee</td>
              <td class="r num">12 Sep 2026</td>
            </tr>
            <tr>
              <td class="vn">Designated port call</td>
              <td>${vStack('MERIDIAN STAR', '9298155')}</td>
              <td>Confirm AP settlement and close the warranty breach</td>
              <td>Underwriter</td>
              <td class="r num">19 Sep 2026</td>
            </tr>
            <tr>
              <td class="vn">Unidentified STS counterparty</td>
              <td>${vStack('SIRIUS EXPRESS', '9366720')}</td>
              <td>Obtain imagery and assured explanation</td>
              <td>Compliance</td>
              <td class="r num">14 Sep 2026</td>
            </tr>
            <tr>
              <td class="vn">Potential port calls (4)</td>
              <td>Various</td>
              <td>Request berth evidence and port agent records</td>
              <td>Compliance</td>
              <td class="r num">21 Sep 2026</td>
            </tr>
          </tbody>
        </table>`, 'Five items are open at the date of this report, two of them with the committee for a cover decision.')}
      ${sec(ICO.chart, 'Screening cadence', `
        <div class="kpi-grid cols-4">
          <div class="kpi accent"><div class="k">Last full screen</div><div class="v num" style="font-size:15px;line-height:1.3">${P.summary.lastFullScreen}</div><div class="d">all ${P.summary.vesselsScreened.toLocaleString()} vessels</div></div>
          <div class="kpi"><div class="k">Screening frequency</div><div class="v num">Daily</div><div class="d">on list publication</div></div>
          <div class="kpi"><div class="k">Next full screen</div><div class="v num" style="font-size:15px;line-height:1.3">30 Sep 2026</div><div class="d">with month-end reporting</div></div>
          <div class="kpi"><div class="k">Mean time to escalate</div><div class="v num">18h</div><div class="d">from confirmation</div></div>
        </div>`)}
      ${foot(9)}
    </article>`;
  }

  window.pscReport = {
    Toolbar() {
      return `
      <div class="doc-toolbar no-print">
        <div style="display:flex;align-items:center;gap:14px;min-width:0">
          <a href="Reports.html" class="tb-btn" style="text-decoration:none" title="Back to Reports" aria-label="Back to Reports">${ic(ICO.back, 14)}<span class="tb-lbl">Reports</span></a>
          <div style="min-width:0">
            <div class="tb-title">Portfolio Sanctions &amp; Compliance Report</div>
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
