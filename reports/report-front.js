/* Shared report front matter — cover, contents, executive summary builders */
(function () {
  const ic = (d, s) => `<svg width="${s || 15}" height="${s || 15}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICO = {
    shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    list:'<path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/>',
    gauge:'<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    trend:'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
    layers:'<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="M2 12.5a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 .59-.92"/><path d="M2 17.5a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 .59-.92"/>',
  };
  const TONE = { red:'#b91c1c', amber:'#b45309', green:'#15803d', blue:'#1d4ed8', slate:'#64748b' };

  /* ── Cover ───────────────────────────────────────────────── */
  function cover(o) {
    return `
    <article class="page cover-pg" data-screen-label="Cover">
      <img class="cv-bg" src="../images/anchorage-aerial-cover.jpg" alt="" />
      <div class="cv-scrim"></div>
      <div class="cv-layer">
        <div class="cv-band">
          <img class="cv-logo" src="../images/skytek-realworld-stacked-white.png" alt="Skytek Real World" />
          <span class="cv-class">${o.classLabel || 'Confidential'}</span>
        </div>
        <div class="cv-body">
          <div class="cv-eyebrow">${o.eyebrow}</div>
          <h1 class="cv-title">${o.title}</h1>
          <div class="cv-rule"></div>
          <p class="cv-sub">${o.sub}</p>
          <div class="cv-subject">
            <div class="k">${o.subject.k}</div>
            <div class="v">${o.subject.v}</div>
            ${o.subject.d ? `<div class="d">${o.subject.d}</div>` : ''}
          </div>
        </div>
        <div class="cv-foot">
          <div class="cv-meta">
            ${o.meta.map(([k, v]) => `<div><div class="k">${k}</div><div class="v num">${v}</div></div>`).join('')}
          </div>
          <div class="cv-idline">
            <span>Report <b class="num">${o.reportId}</b> &middot; prepared by <b>${o.owner}</b></span>
            <span>Generated <b class="num">${o.generatedOn}</b></span>
          </div>
        </div>
      </div>
    </article>`;
  }

  /* ── Contents ────────────────────────────────────────────── */
  function toc(o) {
    return `
    <article class="page" data-screen-label="Contents">
      ${o.head}
      <section class="sec">
        <h2 class="sec-title">${ic(ICO.list, 16)}Contents</h2>
        ${o.note ? `<p class="sec-note">${o.note}</p>` : ''}
        <ol class="toc">
          ${o.rows.map(r => `
            <li class="toc-row${r.front ? ' is-front' : ''}">
              <span class="toc-n">${r.front ? '&mdash;' : r.n}</span>
              <span class="toc-t"><a class="toc-link" href="#page-${r.page}">${r.title}</a>${r.sub ? `<span class="ts">${r.sub}</span>` : ''}</span>
              <a class="toc-p" href="#page-${r.page}"><span>page</span>${r.page}</a>
            </li>`).join('')}
        </ol>
      </section>
      ${o.foot}
    </article>`;
  }

  /* ── Executive summary ───────────────────────────────────── */
  function meterBlock(m) {
    if (!m) return '';
    return `
    <div class="meter">
      <div class="meter-track">${m.segments.map(s => `<i style="width:${s.pct}%;background:${s.color}"></i>`).join('')}</div>
      <div class="meter-pin"><i style="left:${m.pinPct}%"></i></div>
      <div class="meter-scale">${m.scale.map(s => {
        const at = typeof s === 'object' ? s.at : 0;
        const l = typeof s === 'object' ? s.l : s;
        const align = at <= 2 ? 'translateX(0)' : at >= 98 ? 'translateX(-100%)' : 'translateX(-50%)';
        return `<span style="left:${at}%;transform:${align}">${l}</span>`;
      }).join('')}</div>
    </div>`;
  }

  function exec(o) {
    const hero = `
      <div class="xs-hero">
        ${o.hero.map(t => `
          <div class="xst ${t.cls || ''}">
            <div class="k">${t.k}</div>
            <div class="v num">${t.v}</div>
            ${t.d ? `<div class="d">${t.d}</div>` : ''}
            ${t.meter ? meterBlock(t.meter) : ''}
          </div>`).join('')}
      </div>`;
    const barList = b => `
      <div>
        <div class="xs-sub">${b.title}</div>
        <div class="mini">
          ${b.rows.map(r => `
            <div class="mini-row">
              <span class="mini-n">${r.n}</span>
              <span class="mini-track"><span class="mini-fill" style="width:${r.pct}%${r.color ? ';background:' + r.color : ''}"></span></span>
              <span class="mini-v">${r.v}</span>
            </div>`).join('')}
        </div>
      </div>`;
    const split = (o.left || o.right) ? `
      <div class="xs-split">
        ${o.left ? barList(o.left) : ''}
        ${o.right ? barList(o.right) : ''}
      </div>` : '';
    const findings = o.findings ? `
      <section class="sec">
        <h2 class="sec-title">${ic(ICO.trend, 16)}${o.findings.title || 'Headline findings'}</h2>
        <div class="find">
          ${o.findings.rows.map(r => `
            <div class="find-row">
              <span class="find-dot" style="background:${TONE[r.tone] || TONE.slate}"></span>
              <div><div class="find-t">${r.t}</div>${r.d ? `<div class="find-d">${r.d}</div>` : ''}</div>
              <div class="find-m" style="color:${TONE[r.tone] || TONE.slate}">${r.m || ''}</div>
            </div>`).join('')}
        </div>
      </section>` : '';
    return `
    <article class="page" data-screen-label="Executive summary">
      ${o.head}
      <section class="sec">
        <h2 class="sec-title">${ic(ICO.gauge, 16)}${o.title || 'At a glance'}</h2>
        ${o.standfirst ? `<p class="sec-note">${o.standfirst}</p>` : ''}
        ${hero}
        ${split}
      </section>
      ${findings}
      ${o.foot}
    </article>`;
  }

  window.reportFront = { cover, toc, exec, ic, ICO, TONE, PageNav, wirePageNav };

  /* ── Floating page navigation (screen only) ──────────────── */
  function PageNav() {
    return `
    <div id="rp-pagenav" class="page-fnav no-print" role="navigation" aria-label="Page navigation" aria-hidden="true">
      <button class="fnav-btn" data-pnav="up" type="button" title="Previous page" aria-label="Previous page">${ic('<path d="m18 15-6-6-6 6"/>', 20)}</button>
      <span class="fnav-sep"></span>
      <span class="fnav-count num" data-pnav="count">1</span>
      <span class="fnav-sep"></span>
      <button class="fnav-btn fnav-list" data-pnav="toc" type="button" title="Back to contents" aria-label="Back to contents">${ic(ICO.list, 20)}</button>
      <span class="fnav-sep"></span>
      <button class="fnav-btn" data-pnav="down" type="button" title="Next page" aria-label="Next page">${ic('<path d="m6 9 6 6 6-6"/>', 20)}</button>
    </div>`;
  }

  function wirePageNav() {
    const main = document.querySelector('main');
    const nav = document.getElementById('rp-pagenav');
    if (!main || !nav) return;
    const pages = Array.from(document.querySelectorAll('.desk .page'));
    if (!pages.length) return;
    const THRESHOLD = 140;
    const scrollToEl = el => {
      const tb = document.querySelector('.doc-toolbar');
      const offset = (tb ? tb.getBoundingClientRect().height : 0) + 6;
      const top = main.scrollTop + (el.getBoundingClientRect().top - main.getBoundingClientRect().top) - offset;
      main.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    };
    const currentIndex = () => {
      const mt = main.getBoundingClientRect().top;
      let idx = 0;
      pages.forEach((p, i) => { if (p.getBoundingClientRect().top - mt <= THRESHOLD) idx = i; });
      return idx;
    };
    const up = nav.querySelector('[data-pnav="up"]');
    const down = nav.querySelector('[data-pnav="down"]');
    const toc = nav.querySelector('[data-pnav="toc"]');
    const count = nav.querySelector('[data-pnav="count"]');
    up.onclick = () => scrollToEl(pages[Math.max(0, currentIndex() - 1)]);
    down.onclick = () => scrollToEl(pages[Math.min(pages.length - 1, currentIndex() + 1)]);
    toc.onclick = () => scrollToEl(pages[1] || pages[0]);
    const update = () => {
      const mt = main.getBoundingClientRect().top;
      const visible = (pages[0].getBoundingClientRect().bottom - mt) <= THRESHOLD;
      nav.classList.toggle('is-visible', visible);
      nav.setAttribute('aria-hidden', visible ? 'false' : 'true');
      const i = currentIndex();
      up.disabled = i <= 0;
      down.disabled = i >= pages.length - 1;
      if (count) count.textContent = (i + 1) + '/' + pages.length;
    };
    main.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
})();
