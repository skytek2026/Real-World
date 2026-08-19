/* Individual Vessel Underwriting Report — page composition */
(function () {
  const V = window.IVU;
  const TOTAL = 5;
  const ic = (d, s) => `<svg width="${s||15}" height="${s||15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    ship:'<path d="M12 10.189V14"/><path d="M12 2v3"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"/><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    building:'<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
    gauge:'<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    trend:'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
    route:'<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    life:'<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
    shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    swap:'<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/>',
    swords:'<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/>',
    pin:'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    print:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    back:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  };
  const flag = cc => `<img class="flagimg" src="https://flagcdn.com/w40/${cc}.png" srcset="https://flagcdn.com/w80/${cc}.png 2x" alt="${cc.toUpperCase()}" width="19" height="13" />`;
  const scoreChip = n => `<span class="score ${n >= 80 ? 'sc-high' : n >= 50 ? 'sc-med' : 'sc-low'}">${n}</span>`;
  const head = (title) => `
    <div class="page-head">
      <div>
        <div class="ph-title">${title}</div>
        <div class="ph-meta">${V.meta.vessel} &middot; IMO ${V.meta.imo} &middot; ${V.meta.period}</div>
      </div>
      <div class="ph-meta">${V.meta.reportId}</div>
    </div>`;
  const foot = (n) => `
    <div class="page-foot">
      <span>Individual Vessel Underwriting Report &middot; Real World</span>
      <span class="num">Page ${n} of ${TOTAL}</span>
    </div>`;
  const sec = (icon, title, body, note) => `
    <section class="sec">
      <h2 class="sec-title">${ic(icon, 16)}${title}</h2>
      ${note ? `<p class="sec-note">${note}</p>` : ''}
      ${body}
    </section>`;

  /* ── Page 1 — cover, particulars, ownership ── */
  function page1() {
    const half = Math.ceil(V.particulars.length / 2);
    const col = rows => `
      <div class="spec">
        ${rows.map(([k, v]) => `<div class="spec-row"><span class="spec-k">${k}</span><span class="spec-v">${v}</span></div>`).join('')}
      </div>`;
    return `
    <article class="page" data-screen-label="Page 1">
      ${head('Vessel particulars &amp; ownership')}
      <div style="display:flex;flex-direction:column;gap:12px">
        <span class="cover-mark">${ic(ICO.shield,15)} Real World Intelligence</span>
        <h1 class="cover-title">Individual Vessel<br />Underwriting Report</h1>
        <div style="display:flex;align-items:center;gap:10px">
          ${flag('es')}
          <span class="font-display" style="font-size:19px;font-weight:800;color:var(--brand-600,#2d7ffb);letter-spacing:.02em">${V.meta.vessel}</span>
          <span class="pill pill-slate num">IMO ${V.meta.imo}</span>
          <span class="pill pill-slate num">MMSI ${V.meta.mmsi}</span>
        </div>
        <p class="cover-sub">Submission pack for ${V.meta.submission}: particulars, ownership chain, Real World Risk Score and its history, trading and port activity, casualty record, sanctions position and current location.</p>
      </div>
      <div class="cover-meta">
        <div><div class="k">Reporting period</div><div class="v num">${V.meta.period}</div></div>
        <div><div class="k">Generated</div><div class="v num">${V.meta.generatedOn}</div></div>
      </div>
      ${sec(ICO.ship, 'Vessel particulars', `
        <div class="spec-grid">
          ${col(V.particulars.slice(0, half))}
          ${col(V.particulars.slice(half))}
        </div>`)}
      ${sec(ICO.building, 'Owner, managers and charterers', `
        <table class="rt">
          <thead><tr><th>Role</th><th>Company</th><th>Country</th><th>In place since</th><th>Screening flags</th></tr></thead>
          <tbody>
            ${V.ownership.map(o => `
              <tr>
                <td style="color:#64748b;white-space:nowrap">${o.role}</td>
                <td class="vn">${o.name}</td>
                <td style="white-space:nowrap">${flag(o.cc)} ${o.country}</td>
                <td class="num">${o.since}</td>
                <td>${o.flags === 'None' ? '<span class="pill pill-green">None</span>' : `<span class="pill pill-amber">${o.flags}</span>`}</td>
              </tr>`).join('')}
          </tbody>
        </table>`)}
      ${foot(1)}
    </article>`;
  }

  /* ── Page 2 — current score, factors, history ── */
  function page2() {
    const s = V.score;
    const max = 100, h = 150;
    const pts = s.history.map((p, i) => {
      const x = (i / (s.history.length - 1)) * 660;
      const y = h - (p.v / max) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return `
    <article class="page" data-screen-label="Page 2">
      ${head('Real World Risk Score')}
      ${sec(ICO.gauge, 'Current Real World Risk Score', `
        <div class="score-hero">
          <div class="score-big">
            <div class="sb-num num">${s.current}</div>
            <div class="sb-band">${s.band}</div>
          </div>
          <div class="factor-list">
            ${s.factors.map(f => `
              <div class="factor">
                <div class="f-top"><span class="f-k">${f.k}</span><span class="f-w num">${f.w}</span><span class="f-v num">${f.v}</span></div>
                <div class="bl-track"><span class="bl-fill" style="width:${f.v}%;background:${f.v >= 70 ? '#b91c1c' : f.v >= 50 ? '#d97706' : '#65a30d'}"></span></div>
                <div class="f-note">${f.note}</div>
              </div>`).join('')}
          </div>
        </div>`, 'The score is a weighted composite on a 0–100 scale; higher values indicate greater risk. Factor scores are shown with their contribution weight.')}
      ${sec(ICO.trend, 'Risk score history — 12 months', `
        <div class="chart-wrap">
          <svg viewBox="0 0 700 200" class="linechart" role="img" aria-label="Risk score history over twelve months">
            ${[0, 20, 40, 60, 80, 100].map(g => {
              const y = 160 - g / 100 * 140;
              return `<line x1="42" y1="${y}" x2="666" y2="${y}" stroke="${g === 0 ? '#cbd5e1' : '#f1f5f9'}" stroke-width="1" /><text x="34" y="${y + 3.5}" text-anchor="end" class="ax-lbl">${g}</text>`;
            }).join('')}
            <line x1="42" y1="20" x2="42" y2="160" stroke="#cbd5e1" stroke-width="1" />
            <polyline points="${s.history.map((p, i) => `${(42 + i / (s.history.length - 1) * 624).toFixed(1)},${(160 - p.v / 100 * 140).toFixed(1)}`).join(' ')}" fill="none" stroke="var(--brand-600,#2d7ffb)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
            ${s.history.map((p, i) => {
              const x = 42 + i / (s.history.length - 1) * 624, y = 160 - p.v / 100 * 140;
              return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2" fill="#fff" stroke="var(--brand-600,#2d7ffb)" stroke-width="2" /><text x="${x.toFixed(1)}" y="${(y - 9).toFixed(1)}" text-anchor="middle" class="pt-lbl">${p.v}</text>`;
            }).join('')}
            ${s.history.map((p, i) => `<text x="${(42 + i / (s.history.length - 1) * 624).toFixed(1)}" y="176" text-anchor="middle" class="ax-lbl">${p.m}</text>`).join('')}
            <text x="10" y="94" text-anchor="middle" class="ax-title" transform="rotate(-90 10 94)">Risk score</text>
            <text x="366" y="194" text-anchor="middle" class="ax-title">Month end</text>
          </svg>
        </div>
        <div class="kpi-grid" style="margin-top:12px">
          <div class="kpi accent"><div class="k">Current</div><div class="v num">${s.current}</div><div class="d">${s.band} band</div></div>
          <div class="kpi"><div class="k">12-month peak</div><div class="v num">${s.peak}</div><div class="d">Mar 2026</div></div>
          <div class="kpi"><div class="k">12-month low</div><div class="v num">${s.low}</div><div class="d">Aug 2025</div></div>
          <div class="kpi"><div class="k">Net 12-month move</div><div class="v num">+16</div><div class="d">from 42</div></div>
        </div>
        `)}
      ${foot(2)}
    </article>`;
  }

  /* ── Page 3 — voyage & port activity, casualties ── */
  function page3() {
    const c = V.voyage.current;
    const sevPill = s => `<span class="pill ${s === 'Serious' ? 'pill-red' : s === 'Moderate' ? 'pill-amber' : 'pill-slate'}">${s}</span>`;
    return `
    <article class="page" data-screen-label="Page 3">
      ${head('Trading activity &amp; casualty record')}
      ${sec(ICO.route, 'Recent voyage and port activity', `
        <div class="voy-card">
          <div class="voy-end">
            <div class="voy-lbl">Departure</div>
            <div class="voy-port">${c.from}</div>
            <div class="voy-meta num">${c.departed}</div>
          </div>
          <div class="voy-mid"><div class="voy-mid-meta" style="justify-content:center"><span>${c.laden} &middot; ${c.cargo}</span></div></div>
          <div class="voy-end r">
            <div class="voy-lbl">Destination</div>
            <div class="voy-port">${c.to}</div>
            <div class="voy-meta num">ETA ${c.eta}</div>
          </div>
        </div>
        <div class="ind-grid" style="grid-template-columns:repeat(6,1fr);margin-top:12px">
          ${V.voyage.stats.map(s => `<div class="ind" style="padding:10px"><div class="iv num" style="font-size:18px">${s.v}</div><div class="ik" style="font-size:9px">${s.k}</div></div>`).join('')}
        </div>
        <table class="rt" style="margin-top:12px">
          <thead><tr><th>Port</th><th>Country</th><th>Arrival</th><th>Departure</th><th class="r">Days</th></tr></thead>
          <tbody>
            ${V.voyage.ports.map(p => `
              <tr>
                <td class="vn">${p.port}</td>
                <td style="white-space:nowrap">${flag(p.cc)} ${p.country}</td>
                <td class="num" style="white-space:nowrap">${p.arr}</td>
                <td class="num" style="white-space:nowrap">${p.dep}</td>
                <td class="r num">${p.days}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Six most recent port calls of 26 in the period. Full call history is available in the vessel voyage history.')}
      ${sec(ICO.life, 'Casualty history', `
        <table class="rt">
          <thead><tr><th>Date</th><th>Event</th><th>Severity</th><th>Location</th><th class="r">Reserve</th></tr></thead>
          <tbody>
            ${V.casualties.map(x => `
              <tr>
                <td class="num" style="white-space:nowrap">${x.date}</td>
                <td class="vn">${x.type}</td>
                <td>${sevPill(x.sev)}</td>
                <td style="color:#475569">${x.loc}</td>
                <td class="r num" style="font-weight:600;color:#0f172a">${x.est}</td>
              </tr>
              <tr><td></td><td colspan="4" style="padding-top:0;color:#64748b;font-size:10.5px;border-bottom:1px solid #f1f5f9">${x.note}</td></tr>`).join('')}
          </tbody>
        </table>`, 'Five-year record. One claim remains open with a $2.2m reserve.')}
      ${foot(3)}
    </article>`;
  }

  /* ── Page 4 — sanctions status & activity, STS ── */
  function page4() {
    const sa = V.sanctions;
    return `
    <article class="page" data-screen-label="Page 4">
      ${head('Sanctions &amp; ship-to-ship activity')}
      ${sec(ICO.shield, 'Sanctions status', `
        <div class="status-banner ${sa.tone}">
          <div>
            <div class="sb-k">Overall position</div>
            <div class="sb-t">${sa.status}</div>
          </div>
          <p class="sb-d">The vessel and its ownership chain return no list matches. Monitoring is in place because the disclosed charterer operates from a jurisdiction under enhanced review, and one port call in the period was in a sanctioned jurisdiction.</p>
        </div>
        <table class="rt" style="margin-top:12px">
          <thead><tr><th>Screening list</th><th>Result</th><th>Scope</th><th>Date imposed</th></tr></thead>
          <tbody>
            ${sa.checks.map(c => `
              <tr>
                <td class="vn">${c.list}</td>
                <td><span class="pill pill-${c.tone}">${c.result}</span></td>
                <td style="color:#64748b">Vessel, owner, manager, charterer</td>
                <td class="num">${V.meta.generatedOn.slice(0, 11)}</td>
              </tr>`).join('')}
          </tbody>
        </table>`)}
      ${sec(ICO.alert, 'Sanctions-related activity', `
        <div class="chg">
          ${sa.activity.map(a => `
            <div class="chg-row">
              <span class="chg-ico" style="background:${a.tone === 'red' ? '#fef2f2' : a.tone === 'amber' ? '#fffbeb' : '#f0fdf4'};color:${a.tone === 'red' ? '#b91c1c' : a.tone === 'amber' ? '#b45309' : '#15803d'}">${ic(ICO.alert, 12)}</span>
              <div><div class="chg-t">${a.event}</div><div class="chg-d">${a.detail}</div></div>
              <div class="chg-m num" style="color:#64748b">${a.date}</div>
            </div>`).join('')}
        </div>`)}
      ${sec(ICO.swap, 'Ship-to-ship activity', `
        <table class="rt">
          <thead><tr><th>Date</th><th>Counterparty</th><th>Compliance</th><th>Region</th><th class="r">Duration</th></tr></thead>
          <tbody>
            ${V.sts.map(t => `
              <tr>
                <td class="num" style="white-space:nowrap">${t.date}</td>
                <td class="vn">${flag(t.cc)} ${t.counterparty}</td>
                <td><span class="pill ${t.status === 'Ok' ? 'pill-green' : 'pill-amber'}">${t.status}</span></td>
                <td style="color:#475569;white-space:nowrap">${t.region}</td>
                <td class="r num">${t.duration}</td>
              </tr>`).join('')}
          </tbody>
        </table>`, 'Three transfers detected in the period. None involved a currently listed counterparty.')}
      ${foot(4)}
    </article>`;
  }

  /* ── Page 5 — war/high-risk region activity, position ── */
  function page5() {
    const w = V.warRisk, p = V.position;
    return `
    <article class="page" data-screen-label="Page 5">
      ${head('War risk &amp; current position')}
      ${sec(ICO.swords, 'War and high-risk region activity', `
        <div class="kpi-grid">
          <div class="kpi accent"><div class="k">Listed-area transits</div><div class="v num">${w.transits}</div><div class="d">in the period</div></div>
          <div class="kpi"><div class="k">Days inside listed areas</div><div class="v num">${w.daysInside}</div><div class="d">cumulative</div></div>
          <div class="kpi"><div class="k">Warranty breaches</div><div class="v num">${w.breaches}</div><div class="d">entry without notice</div></div>
          <div class="kpi"><div class="k">Zones touched</div><div class="v num">${w.zones.length}</div><div class="d">JWC listed</div></div>
        </div>
        <div class="bar-list" style="margin-top:12px">
          ${w.zones.map(z => `
            <div class="bl-row">
              <span class="bl-name">${z.name}</span>
              <span class="bl-track"><span class="bl-fill" style="width:${z.pct}%;background:${z.tone}"></span></span>
              <span class="bl-val num">${z.transits} transits &middot; ${z.days}d</span>
            </div>`).join('')}
        </div>
        <table class="rt" style="margin-top:12px">
          <thead><tr><th>Listed area</th><th class="r">Transits</th><th class="r">Days inside</th><th>Last entry</th></tr></thead>
          <tbody>
            ${w.zones.map((z, i) => `
              <tr>
                <td class="vn">${z.name}</td>
                <td class="r num">${z.transits}</td>
                <td class="r num">${z.days}</td>
                <td class="num">${z.last}</td>
              </tr>`).join('')}
          </tbody>
        </table>
        <p class="sec-note" style="margin-top:9px">${w.note}</p>`)}
      ${sec(ICO.pin, 'Current geographic position', `
        <div class="pos">
          <div class="pos-main">
            <div class="pos-coords num">${p.lat} &nbsp; ${p.lon}</div>
            <div class="pos-area">${p.area}</div>
            <div class="pos-status"><span class="pill pill-blue">${p.status}</span><span class="num" style="font-size:10.5px;color:#94a3b8">Last signal ${p.lastSignal}</span></div>
          </div>
          <div class="spec" style="flex:1">
            <div class="spec-row"><span class="spec-k">Speed</span><span class="spec-v num">${p.speed}</span></div>
            <div class="spec-row"><span class="spec-k">Course</span><span class="spec-v num">${p.course}</span></div>
            <div class="spec-row"><span class="spec-k">Draught</span><span class="spec-v num">${p.draught}</span></div>
            <div class="spec-row"><span class="spec-k">Destination</span><span class="spec-v">${p.destination}</span></div>
            <div class="spec-row"><span class="spec-k">ETA</span><span class="spec-v num">${p.eta}</span></div>
          </div>
        </div>`, 'Position derived from the latest terrestrial and satellite AIS fix at the generation timestamp.')}
      <p class="sec-note" style="margin-top:16px;padding-top:10px;border-top:1px solid #f1f5f9;color:#94a3b8">Real World Risk Scores are indicative and derived from vessel behaviour, compliance screening, casualty record and ownership data. They do not constitute underwriting advice. Sanctions screening reflects list data as published at ${V.meta.generatedOn}.</p>
      ${foot(5)}
    </article>`;
  }

  window.ivuReport = {
    Toolbar() {
      return `
      <div class="doc-toolbar no-print">
        <div style="display:flex;align-items:center;gap:14px;min-width:0">
          <a href="Reports.html" class="tb-btn" style="text-decoration:none" title="Back to Reports" aria-label="Back to Reports">${ic(ICO.back, 14)}<span class="tb-lbl">Reports</span></a>
          <div style="min-width:0">
            <div class="tb-title">Individual Vessel Underwriting Report</div>
            <div class="tb-sub num">${V.meta.vessel} &middot; IMO ${V.meta.imo} &middot; ${TOTAL} pages (A4)</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <button class="tb-btn" id="rp-print" title="Print" aria-label="Print">${ic(ICO.print, 14)}<span class="tb-lbl">Print</span></button>
          <button class="tb-btn" id="rp-pdf" title="Download PDF" aria-label="Download PDF">${ic(ICO.dl, 14)}<span class="tb-lbl">PDF</span></button>
        </div>
      </div>`;
    },
    Pages() { return [page1(), page2(), page3(), page4(), page5()].join(''); },
  };
})();
