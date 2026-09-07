/* Sanctions Activity & Association Report — page composition */
(function () {
  const P = window.SAA;
  const RF = window.reportFront;
  const TOTAL = 10;
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    anchor:'<path d="M12 22V8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><circle cx="12" cy="5" r="3"/>',
    radio:'<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>',
    swap:'<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/>',
    network:'<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>',
    ship:'<path d="M12 10.189V14"/><path d="M12 2v3"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"/><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    chart:'<path d="M13 17V9"/><path d="M18 17V5"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-3"/>',
    print:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    back:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  };
  const flag = cc => `<img class="flagimg" src="https://flagcdn.com/w40/${cc}.png" srcset="https://flagcdn.com/w80/${cc}.png 2x" alt="${cc.toUpperCase()}" width="19" height="13" />`;
  const scoreChip = n => `<span class="score ${n > 60 ? 'sc-high' : n > 40 ? 'sc-med' : 'sc-low'}">${n}</span>`;
  const vStack = (name, imo, type) => `<div class="v-stack"><span class="v-name">${name}</span><span class="v-sub num">IMO ${imo}${type ? ' &middot; ' + type : ''}</span></div>`;
  const confPill = c => `<span class="pill ${c === 'Confirmed' ? 'pill-red' : 'pill-amber'}">${c}</span>`;
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
      <span>Sanctions Activity &amp; Association Report &middot; Real World</span>
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
      eyebrow: 'Counterparty sanctions investigation',
      title: 'Sanctions Activity<br />&amp; Association Report',
      sub: 'A single counterparty traced through its sanctions exposure — what is confirmed against the group and its people, what matched this period, the designated ports its vessels called at, the destinations they declared or withheld, and every ship-to-ship transfer that touched a sanctioned vessel.',
      subject: { k:P.meta.subjectType, v:P.meta.subject, d:`${s.vessels} vessels &middot; ${s.inPortfolio} on our books ($${183}m) &middot; ${s.designatedLinks} designated links &middot; ${s.verdict}` },
      meta: [['Reporting period', P.meta.period]],
      reportId: P.meta.reportId, owner: P.meta.owner, generatedOn: P.meta.generatedOn,
    });
  }

  function frontToc() {
    return RF.toc({
      head: head('Contents'), foot: foot(2),
      note: `Lists screened: ${P.meta.lists}. Page numbers refer to this document.`,
      rows: [
        { front:true, title:'Executive summary', sub:'Counterparty sanctions position at a glance, headline findings.', page:3 },
        { n:'01', title:'Confirmed sanctions information', sub:'Confirmed designations attaching to the group, its people and its counterparties.', page:4 },
        { n:'02', title:'New sanctions matches', sub:'Matches raised in the period, with the evidence and escalation status.', page:5 },
        { n:'03', title:'Potential sanctioned port calls', sub:'Group calls at designated ports and terminals over the window.', page:6 },
        { n:'04', title:'AIS-declared sanctioned port visits / destinations', sub:'Declared and withheld destinations, and the pattern behind them.', page:7 },
        { n:'05', title:'STS activity involving sanctioned vessels', sub:'Every transfer with a designated, watchlisted or unidentified counterparty.', page:8 },
        { n:'06', title:'Association network', sub:'Entities linked to the group by ownership, directorship, management or charter.', page:9 },
        { n:'07', title:'Recommendation', sub:'Underwriting and compliance actions arising from the investigation.', page:10 },
      ],
    });
  }

  function frontExec() {
    const s = P.summary;
    const maxA = Math.max(...P.associations.map(x => x.vessels));
    return RF.exec({
      head: head('Executive summary'), foot: foot(3),
      standfirst: `${P.meta.subject} (${P.meta.subjectType.toLowerCase()}, ${P.meta.hq}, IMO company ${P.meta.imoNo}) investigated over ${P.meta.window.toLowerCase()} to ${P.meta.period.split('\u2013')[1].trim()}.`,
      hero: [
        { cls:'lead', k:'Designated links to the group', v:s.designatedLinks, d:`of ${s.linkedEntities} linked entities &middot; ${s.verdict} &middot; ${s.exposedValue} insured value affected`,
          meter:{ pinPct:Math.round(s.designatedLinks / s.linkedEntities * 100 * 3), scale:[{at:0,l:'no links'},{at:50,l:'some'},{at:100,l:'pervasive'}], segments:[{pct:20,color:'#16a34a'},{pct:20,color:'#d97706'},{pct:60,color:'#dc2626'}] } },
        { cls:'warn', k:'Confirmed designations', v:s.confirmed, d:'beneficial owner and former director' },
        { cls:'warn', k:'New matches this period', v:s.newMatches, d:'2 confirmed, 1 potential' },
        { cls:'warn', k:'Designated port calls', v:s.portCalls, d:'4 confirmed on imagery or draught' },
        { cls:'warn', k:'STS with sanctioned vessels', v:s.stsEvents, d:'3 with an OFAC-designated vessel' },
        { k:'Group vessels', v:s.vessels, d:`${s.inPortfolio} on our books` },
        { cls:'warn', k:'AIS destination events', v:s.aisDeclared, d:'5 with a withheld destination' },
      ],
      left: { title:'Linked entities by reach', rows:P.associations.map(x => ({ n:x.name, pct:Math.round(x.vessels / maxA * 100), v:`${x.vessels} vsl`, color:x.tone === 'red' ? '#b91c1c' : x.tone === 'amber' ? '#d97706' : '#16a34a' })) },
      right: { title:'Activity by category', rows:[
        { n:'Designated port calls', pct:100, v:s.portCalls, color:'#b91c1c' },
        { n:'STS events', pct:Math.round(s.stsEvents / s.portCalls * 100), v:s.stsEvents, color:'#dc2626' },
        { n:'AIS destination events', pct:100, v:s.aisDeclared, color:'#ea580c' },
        { n:'New matches', pct:Math.round(s.newMatches / s.portCalls * 100), v:s.newMatches, color:'#d97706' },
        { n:'Confirmed designations', pct:Math.round(s.confirmed / s.portCalls * 100), v:s.confirmed, color:'#7f1d1d' },
      ] },
      findings: { rows:P.findings },
    });
  }

  /* ── Page 4 — confirmed sanctions information ── */
  function page1() {
    const s = P.summary, m = P.meta;
    return `
    <article class="page" data-screen-label="Page 4">
      ${head('01 &middot; Confirmed sanctions information')}
      ${sec(ICO.shield, 'Counterparty particulars and confirmed designations', `
        <table class="rt compact">
          <tbody>
            <tr><td class="vn" style="width:170px">Subject</td><td style="font-weight:600;color:#0f172a">${m.subject}</td><td class="vn" style="width:150px">Type</td><td>${m.subjectType}</td></tr>
            <tr><td class="vn">Head office</td><td>${m.hq}</td><td class="vn">IMO company number</td><td class="num">${m.imoNo}</td></tr>
            <tr><td class="vn">Vessels in group</td><td class="num">${s.vessels} (${s.inPortfolio} on our books)</td><td class="vn">Assessment</td><td>${tonePill('red', s.verdict)}</td></tr>
          </tbody>
        </table>
        <table class="rt" style="margin-top:11px">
          <thead><tr><th>Designated subject</th><th>Relationship</th><th>List</th><th class="r">Designated</th><th class="r">Vessels reached</th><th>Basis of link</th></tr></thead>
          <tbody>
            ${P.confirmed.map(c => `
              <tr>
                <td class="vn">${c.subject}</td>
                <td style="white-space:nowrap">${c.kind}</td>
                <td>${c.list}</td>
                <td class="r num">${c.designated}</td>
                <td class="r num" style="font-weight:700;color:#b91c1c">${c.vessels}</td>
                <td>${c.link}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.confirmedNote)}
      ${sec(ICO.ship, 'Group vessels and their indicators', `
        <table class="rt compact">
          <thead><tr><th>Vessel</th><th>Flag</th><th class="r">Score</th><th>On our books</th><th class="r">Insured value</th><th>Principal indicator</th></tr></thead>
          <tbody>
            ${P.groupVessels.map(v => `
              <tr${v.inBook ? ' style="background:#fef2f2"' : ''}>
                <td>${vStack(v.name, v.imo, v.type)}</td>
                <td>${flag(v.flag)}</td>
                <td class="r">${scoreChip(v.score)}</td>
                <td><span class="pill ${v.inBook ? 'pill-red' : 'pill-slate'}">${v.inBook ? 'Yes' : 'No'}</span></td>
                <td class="r num">${v.value}</td>
                <td>${v.ind}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Seven of the 31 group vessels are shown, ordered by risk score. Rows shaded in red are on our books.')}
      ${foot(4)}
    </article>`;
  }

  /* ── Page 5 — new sanctions matches ── */
  function page2() {
    return `
    <article class="page" data-screen-label="Page 5">
      ${head('02 &middot; New sanctions matches')}
      ${sec(ICO.alert, 'Matches raised in the period', `
        <table class="rt">
          <thead><tr><th class="r">Raised</th><th>Subject</th><th>Match type</th><th>List</th><th>Confidence</th><th>Evidence</th><th>Status</th></tr></thead>
          <tbody>
            ${P.newMatches.map(v => `
              <tr>
                <td class="r num">${v.on}</td>
                <td class="vn">${v.subject}</td>
                <td style="white-space:nowrap">${v.kind}</td>
                <td>${v.list}</td>
                <td>${confPill(v.conf)}</td>
                <td>${v.detail}</td>
                <td style="font-weight:600;color:${v.status === 'Escalated' ? '#b91c1c' : '#334155'}">${v.status}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Two matches were confirmed in the period, both reaching vessels on our books. The Aurora Holdings review dates from June and remains open.')}
      ${sec(ICO.chart, 'How the designations reach our exposure', `
        <div class="chg">
          <div class="chg-row">
            <span class="chg-ico" style="background:#fef2f2;color:#b91c1c">${ic(ICO.alert, 12)}</span>
            <div><div class="chg-t">Meridian Trust (BVI) \u2192 Aurora Holdings (MHL) \u2192 the group \u2192 four insured vessels</div><div class="chg-d">The EU designation of 05 Aug 2026 attaches to the ultimate beneficial owner. The holding runs through one Marshall Islands intermediary, so the designation reaches ORION CREST, CASPIAN DAWN, LEVANT PEARL and SIRIUS EXPRESS on our books.</div></div>
            <div class="chg-m" style="font-weight:700;color:#b91c1c">$190m</div>
          </div>
          <div class="chg-row">
            <span class="chg-ico" style="background:#fef2f2;color:#b91c1c">${ic(ICO.swap, 12)}</span>
            <div><div class="chg-t">M/T ZARIA designation reaches us through a repeat STS relationship</div><div class="chg-d">CASPIAN DAWN transferred cargo with M/T ZARIA in November 2025 and again in August 2026, the second occasion after the vessel was designated. The August transfer is an exclusion event.</div></div>
            <div class="chg-m" style="font-weight:700;color:#b91c1c">2 transfers</div>
          </div>
          <div class="chg-row">
            <span class="chg-ico" style="background:#fffbeb;color:#b45309">${ic(ICO.network, 12)}</span>
            <div><div class="chg-t">A designated former director remains a live association</div><div class="chg-d">A. Farsani was designated by OFAC on 21 Mar 2026 and resigned two weeks later. The resignation post-dates the designation, so the association is retained for a twelve-month look-back.</div></div>
            <div class="chg-m" style="font-weight:700;color:#b45309">3 vessels</div>
          </div>
        </div>`)}
      ${foot(5)}
    </article>`;
  }

  /* ── Page 6 — designated port calls ── */
  function page3() {
    return `
    <article class="page" data-screen-label="Page 6">
      ${head('03 &middot; Potential sanctioned port calls')}
      ${sec(ICO.anchor, 'Group calls at designated ports and terminals', `
        <table class="rt">
          <thead><tr><th>Vessel</th><th>Port</th><th class="r">Arrived</th><th class="r">Hours</th><th>Basis</th><th>Confidence</th><th>Evidence</th></tr></thead>
          <tbody>
            ${P.portCalls.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo)}</td>
                <td style="white-space:nowrap">${flag(v.country)} <span style="font-weight:600;color:#0f172a">${v.port}</span></td>
                <td class="r num">${v.arrived}</td>
                <td class="r num">${v.hours}</td>
                <td>${v.basis}</td>
                <td>${confPill(v.conf)}</td>
                <td>${v.evidence}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.portNote)}
      ${sec(ICO.chart, 'Call pattern', `
        <div class="ind-grid cols-3">
          <div class="ind" style="background:#fef2f2;border-color:#fecaca">
            <div class="ik">Confirmed calls</div>
            <div class="iv num" style="color:#b91c1c">4</div>
            <div class="id">Berth imagery, draught change or agent record</div>
          </div>
          <div class="ind" style="background:#fffbeb;border-color:#fde68a">
            <div class="ik">Potential calls</div>
            <div class="iv num" style="color:#b45309">4</div>
            <div class="id">AIS track inside the port limit only</div>
          </div>
          <div class="ind" style="background:#f8fafc">
            <div class="ik">Most-used designated port</div>
            <div class="iv num">4</div>
            <div class="id">Kharg Island &middot; 3 different vessels</div>
          </div>
        </div>`, 'The pattern is consistent across the group rather than confined to one vessel, which points to a trading policy rather than isolated master decisions.')}
      ${foot(6)}
    </article>`;
  }

  /* ── Page 7 — AIS declared destinations ── */
  function page4() {
    const p = P.aisPatterns, maxP = Math.max(...p.map(x => x.n));
    return `
    <article class="page" data-screen-label="Page 7">
      ${head('04 &middot; AIS-declared destinations')}
      ${sec(ICO.radio, 'Declared and withheld destinations', `
        <table class="rt compact">
          <thead><tr><th>Vessel</th><th>AIS destination</th><th class="r">Declared</th><th>Call made</th><th>Pattern</th></tr></thead>
          <tbody>
            ${P.aisDeclared.map(v => `
              <tr>
                <td>${vStack(v.name, v.imo)}</td>
                <td><span class="pill ${v.declared === 'FOR ORDERS' ? 'pill-amber' : 'pill-red'} num">${v.declared}</span></td>
                <td class="r num">${v.on}</td>
                <td><span class="pill ${v.arrived ? 'pill-red' : 'pill-slate'}">${v.arrived ? 'Yes' : 'No'}</span></td>
                <td>${v.pattern}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.aisNote)}
      ${sec(ICO.chart, 'Destination behaviour', `
        <div class="bar-list">
          ${p.map(x => `
            <div class="bl-row">
              <span class="bl-name">${x.k}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.n / maxP * 100)}%;background:${x.tone === 'red' ? '#b91c1c' : '#d97706'}"></span></span>
              <span class="bl-val num">${x.n} events</span>
            </div>`).join('')}
        </div>`, 'Five of eleven events involved a withheld destination. In each case the withheld window brackets a designated call or a ship-to-ship transfer, which is the pattern the internal watchlist is designed to catch.')}
      ${foot(7)}
    </article>`;
  }

  /* ── Page 8 — STS activity ── */
  function page5() {
    return `
    <article class="page" data-screen-label="Page 8">
      ${head('05 &middot; STS activity involving sanctioned vessels')}
      ${sec(ICO.swap, 'Transfers over the window', `
        <table class="rt">
          <thead><tr><th class="r">Date</th><th>Vessel</th><th>Counterparty</th><th>Counterparty status</th><th>Location</th><th class="r">Duration</th><th>Confidence</th></tr></thead>
          <tbody>
            ${P.sts.map(v => `
              <tr>
                <td class="r num">${v.date}</td>
                <td>${vStack(v.name, v.imo)}</td>
                <td class="vn">${v.cpty}</td>
                <td><span class="pill ${v.cptyStatus.includes('designated') ? 'pill-red' : v.cptyStatus === 'Unknown' || v.cptyStatus.includes('watchlist') ? 'pill-amber' : 'pill-green'}">${v.cptyStatus}</span></td>
                <td>${v.loc}</td>
                <td class="r num">${v.dur}</td>
                <td>${confPill(v.conf)}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, P.stsNote)}
      ${sec(ICO.chart, 'Counterparty exposure', `
        <div class="ind-grid cols-3">
          <div class="ind" style="background:#fef2f2;border-color:#fecaca">
            <div class="ik">OFAC-designated counterparty</div>
            <div class="iv num" style="color:#b91c1c">3</div>
            <div class="id">M/T ZARIA \u00d7 2, M/T KAVIR \u00d7 1</div>
          </div>
          <div class="ind" style="background:#fffbeb;border-color:#fde68a">
            <div class="ik">Unidentified or watchlisted</div>
            <div class="iv num" style="color:#b45309">3</div>
            <div class="id">Both sides dark in two of the three</div>
          </div>
          <div class="ind" style="background:#f0fdf4;border-color:#bbf7d0">
            <div class="ik">Clean counterparty</div>
            <div class="iv num" style="color:#15803d">1</div>
            <div class="id">Both vessels transmitting throughout</div>
          </div>
        </div>`, 'Fujairah and the Gulf of Oman account for six of the seven transfers, and both unidentified counterparties occurred off Fujairah.')}
      ${foot(8)}
    </article>`;
  }

  /* ── Page 9 — association network ── */
  function page6() {
    const a = P.associations, maxV = Math.max(...a.map(x => x.vessels));
    return `
    <article class="page" data-screen-label="Page 9">
      ${head('06 &middot; Association network')}
      ${sec(ICO.network, 'Entities linked to the group', `
        <table class="rt">
          <thead><tr><th>Entity</th><th>Relationship</th><th class="r">Vessels reached</th><th>Status</th><th>Basis</th></tr></thead>
          <tbody>
            ${a.map(x => `
              <tr>
                <td class="vn">${x.name}</td>
                <td style="white-space:nowrap">${x.role}</td>
                <td class="r num">${x.vessels}</td>
                <td>${tonePill(x.tone, x.status)}</td>
                <td>${x.note}</td>
              </tr>`).join('')}
          </tbody>
        </table>
        <div class="bar-list" style="margin-top:11px">
          ${a.map(x => `
            <div class="bl-row">
              <span class="bl-name">${x.name}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${Math.round(x.vessels / maxV * 100)}%;background:${x.tone === 'red' ? '#b91c1c' : x.tone === 'amber' ? '#d97706' : '#16a34a'}"></span></span>
              <span class="bl-val num">${x.vessels} vessels</span>
            </div>`).join('')}
        </div>`, P.assocNote)}
      ${foot(9)}
    </article>`;
  }

  /* ── Page 10 — recommendation ── */
  function page7() {
    return `
    <article class="page" data-screen-label="Page 10">
      ${head('07 &middot; Recommendation')}
      ${sec(ICO.shield, 'Underwriting and compliance actions', `
        <div class="att">
          <div class="att-item">
            <div>
              <div class="att-name">${ic(ICO.alert, 14)} Restrict new business and review existing cover</div>
              <div class="att-meta">${P.summary.inPortfolio} vessels on our books &middot; ${P.summary.exposedValue} insured value</div>
              <div class="att-why">A designated ultimate beneficial owner reaching four insured vessels, three confirmed transfers with OFAC-designated tonnage and a consistent designated-port trading pattern together place this counterparty beyond the appetite set for the facility. Recommend no new business, and a cover decision on the four insured vessels at the September committee.</div>
            </div>
            <div class="att-act">
              <span class="att-act-lbl">Action</span>
              <span class="pill pill-red">Restrict</span>
            </div>
          </div>
          <div class="att-item amber">
            <div>
              <div class="att-name">${ic(ICO.network, 14)} Extend screening to the wider association network</div>
              <div class="att-meta">14 linked entities &middot; 4 under review</div>
              <div class="att-why">Aurora Holdings and Anvil Marine SA share directors with the group and hold vessels elsewhere in the market. Recommend a directed screen of both, and of Pelagos Tech Services as technical manager, before the next reporting cycle.</div>
            </div>
            <div class="att-act">
              <span class="att-act-lbl">Action</span>
              <span class="pill pill-amber">Screen</span>
            </div>
          </div>
        </div>`)}
      ${foot(10)}
    </article>`;
  }

  window.saaReport = {
    Toolbar() {
      return `
      <div class="doc-toolbar no-print">
        <div style="display:flex;align-items:center;gap:14px;min-width:0">
          <a href="Reports.html" class="tb-btn" style="text-decoration:none" title="Back to Reports" aria-label="Back to Reports">${ic(ICO.back, 14)}<span class="tb-lbl">Reports</span></a>
          <div style="min-width:0">
            <div class="tb-title">Sanctions Activity &amp; Association Report</div>
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
