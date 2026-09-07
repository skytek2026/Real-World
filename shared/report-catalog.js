/* Create New Report — report catalogue grouped into six families.
   Reports with a built template open the Create Report modal; the rest show "coming soon". */
(function () {
  const ic = (d, s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    briefcase:'<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    ship:'<path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10v4"/><path d="M12 2v3"/>',
    shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    chart:'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><rect x="7" y="13" width="3" height="5" rx="1"/><rect x="12" y="9" width="3" height="9" rx="1"/><rect x="17" y="5" width="3" height="13" rx="1"/>',
    doc:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 13h6"/><path d="M9 17h4"/>',
    chevron:'<path d="m9 18 6-6-6-6"/>',
    check:'<path d="M20 6 9 17l-5-5"/>',
    clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    arrow:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.638-2.438a2.123 2.123 0 0 0-1.973 0L6.355 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.12 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
  };

  /* typeId — matches window.createNewReport.types ids; null = no template yet */
  const GROUPS = [
    { n:1, name:'Portfolio &amp; Underwriting', icon:ICO.briefcase, tone:'violet',
      desc:'Overarching portfolio views and risk scoring to support underwriting and management decisions.',
      reports:[
        { name:'Portfolio Executive Risk Report', typeId:'per' , dev:true },
        { name:'Portfolio Exception Report', typeId:'pex' },
        { name:'Portfolio Audit for Sanctions', typeId:'pas' },
        { name:'Portfolio Risk Score Report', typeId:'prs' },
      ] },
    { n:2, name:'Regional Monitoring', icon:ICO.globe, tone:'blue',
      desc:'Monitor exposure and risk across regions, areas and conflict zones.',
      reports:[
        { name:'Regional Exposure &amp; Aggregation Report', typeId:'rea' , dev:true },
        { name:'Accumulation &amp; Concentration Exception Report', typeId:'ace' },
        { name:'War / JWC Risk Portfolio Exposure Report', typeId:'wjr' },
      ] },
    { n:3, name:'Casualty Intelligence', icon:ICO.alert, tone:'amber',
      desc:'Track casualties and incidents and analyse trends and impacts.',
      reports:[
        { name:'Portfolio / Fleet Casualty Report', typeId:'pfc' , dev:true },
        { name:'Global Marine Casualty Intelligence Report', typeId:'gmc' },
        { name:'Casualty Benchmark Report', typeId:'cbr' },
      ] },
    { n:4, name:'Vessel, Fleet &amp; Management', icon:ICO.ship, tone:'cyan',
      desc:'Deep dive into individual vessels, fleets and management quality.',
      reports:[
        { name:'Individual Vessel Underwriting Report', typeId:'ivu' , dev:true },
        { name:'Fleet Intelligence Report', typeId:'fir' , dev:true },
        { name:'Owner &amp; Technical Manager Risk Report', typeId:'otm' },
      ] },
    { n:5, name:'Sanctions &amp; Compliance', icon:ICO.shield, tone:'rose',
      desc:'Stay compliant with sanctions screening and monitor risk activities and associations.',
      reports:[
        { name:'Portfolio Sanctions &amp; Compliance Report', typeId:'psc' },
        { name:'Sanctions Activity &amp; Association Report', typeId:'saa' },
      ] },
    { n:6, name:'Market Intelligence', icon:ICO.chart, tone:'green',
      desc:'Market outlook, benchmarking and insights to inform strategic decisions.',
      reports:[
        { name:'Global Fleet &amp; Market Intelligence Report', typeId:'gfm' },
        { name:'Peer &amp; Prospect Analysis Report', typeId:'ppa' },
      ] },
  ];

  const state = { selected: null };
  const key = (g, i) => g.n + '-' + i;
  const find = k => {
    if (!k) return null;
    const [gn, i] = k.split('-');
    const g = GROUPS.find(x => String(x.n) === gn);
    return g ? { group:g, report:g.reports[+i], key:k } : null;
  };
  const strip = s => s.replace(/&amp;/g, '&').replace(/&middot;/g, '·');
  const starIc = () => `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${ICO.star}</svg>`;

  function content() {
    const sel = find(state.selected);
    return `
    <div class="rcat-wrap scroll-thin">
      <div class="rcat-grid">
        ${GROUPS.map(g => `
          <section class="rcat-card tone-${g.tone}">
            <header class="rcat-head">
              <span class="rcat-ico">${ic(g.icon, 24)}</span>
              <div class="rcat-headtext">
                <h3 class="rcat-title"><span class="rcat-n num">${g.n}.</span> ${g.name}</h3>
                <p class="rcat-desc">${g.desc}</p>
              </div>
              <span class="rcat-count num">${g.reports.length}</span>
            </header>
            <div class="rcat-list">
              ${g.reports.map((r, i) => {
                const k = key(g, i), on = state.selected === k, soon = !r.typeId;
                return `
                <button type="button" class="rcat-row${on ? ' is-sel' : ''}${soon ? ' is-soon' : ''}${r.dev ? ' is-dev' : ''}" data-rcat="${k}" aria-pressed="${on}">
                  <span class="rcat-row-ico">${ic(ICO.doc, 17)}</span>
                  <span class="rcat-row-name">${r.name}${r.dev ? `<span class="rcat-star" title="Selected for development" aria-label="Selected for development">${starIc()}</span>` : ''}</span>
                  ${soon ? `<span class="rcat-soon">${ic(ICO.clock, 12)} Coming soon</span>` : ''}
                  <span class="rcat-row-end">${on ? `<span class="rcat-tick">${ic(ICO.check, 13)}</span>` : ic(ICO.chevron, 15)}</span>
                </button>`;
              }).join('')}
            </div>
          </section>`).join('')}
      </div>
    </div>
    <div class="rcat-bar">
      <div class="rcat-bar-l">
        <span class="rcat-bar-ico">${ic(ICO.info, 20)}</span>
        <div class="rcat-bar-text">
          ${sel ? `
            <span class="rcat-bar-k">Selected report:</span>
            <span class="rcat-bar-v">${sel.report.name}</span>
            ${!sel.report.typeId ? `<span class="rcat-bar-note">This template is in development — we'll let you know when it's available.</span>` : ''}
          ` : `
            <span class="rcat-bar-k">No report selected</span>
            <span class="rcat-bar-v rcat-bar-v--muted">Choose a report from one of the six groups above</span>
          `}
        </div>
      </div>
      <button type="button" id="rcat-next" class="rcat-next" ${sel && sel.report.typeId ? '' : 'disabled'}>
        ${sel && !sel.report.typeId ? `${ic(ICO.clock, 15)} Coming soon` : `Next: Configure Report ${ic(ICO.arrow, 15)}`}
      </button>
    </div>`;
  }

  function wire(rerender) {
    document.querySelectorAll('[data-rcat]').forEach(b => b.addEventListener('click', () => {
      state.selected = state.selected === b.dataset.rcat ? null : b.dataset.rcat;
      rerender();
    }));
    const next = document.getElementById('rcat-next');
    if (next) next.addEventListener('click', () => {
      const sel = find(state.selected);
      if (!sel || !sel.report.typeId) return;
      window.createNewReport.open(sel.report.typeId);
    });
  }

  window.reportCatalog = { content, wire, GROUPS, state, starIc };
})();
