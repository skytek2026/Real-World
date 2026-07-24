/* News page — renders filter rail + cards grid. */
(() => {
  const SC = window.sharedChrome;
  const ARTICLES = window.NEWS_ARTICLES;
  const SOURCES  = window.NEWS_SOURCES;
  const CATS     = window.NEWS_CATEGORIES;

  // ── State ──────────────────────────────────────────────────────────────
  const STORAGE_KEY = 'news.filters.v1';
  const saved = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }})();
  const state = {
    cat:       saved.cat        || 'all',
    sources:   new Set(saved.sources || SOURCES.map(s => s.id)),
    search:    '',
    sourcesOpen: false,
    catOpen:   false,
  };
  const persist = () => localStorage.setItem(STORAGE_KEY, JSON.stringify({
    cat: state.cat, sources: [...state.sources],
  }));

  // ── Icons ──────────────────────────────────────────────────────────────
  const CAT_GLYPH = {
    marine:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="M12 7v15"/><path d="M5 12h14"/><path d="M3 18a8 8 0 0 0 9 4 8 8 0 0 0 9-4"/></svg>`,
    property:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V8l6-4 6 4v14"/><path d="M9 22v-6h6v6"/><path d="M9 12h.01M15 12h.01"/></svg>`,
    aviation:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>`,
    offshore:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22h18"/><path d="M5 22V11l7-7 7 7v11"/><path d="M9 22v-6h6v6"/><path d="M12 4v3"/><path d="M8 9l4-2 4 2"/></svg>`,
    regulatory: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M5 9h14"/><path d="M5 9l-3 6a4 4 0 0 0 8 0z"/><path d="M19 9l-3 6a4 4 0 0 0 8 0z"/><path d="M8 21h8"/></svg>`,
  };
  const CAT_TAB_ICO = {
    all:        `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M4 22h16"/><path d="M4 18h16"/><path d="M4 14h10"/><rect x="4" y="2" width="16" height="8" rx="1"/></svg>`,
    marine:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="12" cy="5" r="2"/><path d="M12 7v15"/><path d="M5 12h14"/><path d="M3 18a8 8 0 0 0 9 4 8 8 0 0 0 9-4"/></svg>`,
    property:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M6 22V8l6-4 6 4v14"/><path d="M9 22v-6h6v6"/></svg>`,
    aviation:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>`,
    offshore:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M3 22h18"/><path d="M5 22V11l7-7 7 7v11"/></svg>`,
    regulatory: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M12 3v18"/><path d="M5 9h14"/><path d="M5 9l-3 6a4 4 0 0 0 8 0z"/><path d="M19 9l-3 6a4 4 0 0 0 8 0z"/></svg>`,
  };
  const PATTERN_BG = `<svg class="bg-pattern" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="white"/></pattern></defs><rect width="200" height="120" fill="url(#dots)"/></svg>`;

  // ── Helpers ─────────────────────────────────────────────────────────────
  const sourceById = id => SOURCES.find(s => s.id === id);
  const catLabel   = id => (CATS.find(c => c.id === id) || {label:id}).label;

  function relTime(hours) {
    if (hours < 1)   return 'Just now';
    if (hours < 24)  return `${hours}h ago`;
    const d = Math.floor(hours / 24);
    if (d < 7)       return `${d}d ago`;
    if (d < 30)      return `${Math.floor(d/7)}w ago`;
    return `${Math.floor(d/30)}mo ago`;
  }

  function filtered() {
    const q = state.search.trim().toLowerCase();
    return ARTICLES.filter(a =>
      (state.cat === 'all' || a.cat === state.cat) &&
      state.sources.has(a.source) &&
      (!q || (a.title + ' ' + a.snippet).toLowerCase().includes(q))
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────
  function ArticleCard(a, isFeatured) {
    const src = sourceById(a.source);
    return `
      <a href="${a.url}" target="_blank" rel="noopener noreferrer" class="news-card cat-${a.cat} ${isFeatured ? 'featured' : ''}" data-cat="${a.cat}">
        <div class="news-thumb ${a.image ? 'has-photo' : ''}">
          ${PATTERN_BG}
          ${a.image ? `<img class="news-photo" src="${a.image}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove();this.parentElement.classList.remove('has-photo')">` : ''}
          <div class="glyph">${CAT_GLYPH[a.cat] || ''}</div>
          <span class="news-cat">${catLabel(a.cat)}</span>
          <div class="news-hover" aria-hidden="true">
            <span class="news-hover-arrow">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </div>
        </div>
        <div class="news-body">
          <h3 class="news-title">${a.title}</h3>
          <p class="news-snippet">${a.snippet}</p>
          <div class="news-meta">
            <span class="news-source">
              <span class="src-dot" style="background:${src.color}">${src.short}</span>
              ${src.name}
            </span>
            <span style="display:flex;align-items:center;gap:8px">
              <span>${relTime(a.hoursAgo)}</span>
              <svg class="ext-ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
            </span>
          </div>
        </div>
      </a>`;
  }

  function CategoryDropdown() {
    const cur = CATS.find(c => c.id === state.cat) || CATS[0];
    return `
      <div class="cat-dd" id="cat-wrap">
        <button class="cat-btn" id="cat-btn" aria-expanded="${state.catOpen}" aria-haspopup="listbox">
          <span class="cat-cur-ico">${CAT_TAB_ICO[cur.id]}</span>
          <span class="cat-cur-label">${cur.label}</span>
          <svg class="cat-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        ${state.catOpen ? `
          <div class="cat-pop" id="cat-pop" role="listbox">
            ${CATS.map(c => `
              <button class="cat-opt" data-cat="${c.id}" aria-selected="${state.cat === c.id}" role="option">
                <span class="cat-opt-ico">${CAT_TAB_ICO[c.id]}</span>
                <span>${c.label}</span>
                <svg class="cat-opt-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </button>`).join('')}
          </div>` : ''}
      </div>`;
  }

  function SourcePicker() {
    const total = SOURCES.length;
    const sel   = state.sources.size;
    const label = sel === total ? 'All sources' : sel === 0 ? 'No sources' : `${sel} of ${total} sources`;
    return `
      <div style="position:relative" id="src-wrap">
        <button class="src-btn" id="src-btn" aria-expanded="${state.sourcesOpen}" aria-haspopup="listbox">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16"/><path d="M7 12h10"/><path d="M10 18h4"/></svg>
          <span>${label}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:.6;transform:${state.sourcesOpen?'rotate(180deg)':'none'};transition:transform .15s"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        ${state.sourcesOpen ? `
          <div class="src-pop scroll-thin" id="src-pop" role="listbox">
            ${SOURCES.map(s => `
              <label class="src-row">
                <input type="checkbox" data-src="${s.id}" ${state.sources.has(s.id) ? 'checked' : ''}>
                <span class="src-dot" style="background:${s.color}">${s.short}</span>
                <span style="flex:1">${s.name}</span>
              </label>`).join('')}
            <div class="src-foot">
              <button class="src-mini" data-src-action="all">Select all</button>
              <button class="src-mini" data-src-action="none">Clear all</button>
            </div>
          </div>` : ''}
      </div>`;
  }

  function ActiveFilters() {
    if (state.cat === 'all' && state.sources.size === SOURCES.length && !state.search) return '';
    const chips = [];
    if (state.cat !== 'all') {
      chips.push(`<span class="chip-tag">${catLabel(state.cat)}<span class="chip-x" data-clear="cat">×</span></span>`);
    }
    if (state.sources.size !== SOURCES.length) {
      chips.push(`<span class="chip-tag">${state.sources.size} source${state.sources.size===1?'':'s'}<span class="chip-x" data-clear="sources">×</span></span>`);
    }
    if (state.search) {
      chips.push(`<span class="chip-tag">"${state.search}"<span class="chip-x" data-clear="search">×</span></span>`);
    }
    return `
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:14px">
        <span style="font-size:11.5px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:.04em">Filtering by</span>
        ${chips.join('')}
        <button data-clear="all" style="font-size:12px;color:#2563eb;background:none;border:0;cursor:pointer;font-weight:600;font-family:inherit;padding:0 4px">Clear all</button>
      </div>`;
  }

  function Grid() {
    const list = filtered();
    if (list.length === 0) {
      return `
        <div class="empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <h3>No articles match your filters</h3>
          <p>Try clearing the search, picking a different category, or enabling more sources.</p>
        </div>`;
    }
    return `<div class="news-grid">${list.map((a,i) => ArticleCard(a, i === 0 && state.cat === 'all' && !state.search)).join('')}</div>`;
  }

  // ── Wire ────────────────────────────────────────────────────────────────
  function wire() {
    // Category dropdown
    const catBtn = document.getElementById('cat-btn');
    if (catBtn) catBtn.addEventListener('click', e => {
      e.stopPropagation();
      state.catOpen = !state.catOpen;
      const wrap = document.getElementById('cat-wrap');
      wrap.outerHTML = CategoryDropdown();
      wireCat();
    });
    wireCat();

    // Search
    const search = document.getElementById('news-search');
    if (search) {
      search.addEventListener('input', e => {
        state.search = e.target.value;
        // partial: only re-render results panel
        document.getElementById('news-results').innerHTML = Grid();
        document.getElementById('news-meta').innerHTML = MetaBar();
        document.getElementById('news-active').innerHTML = ActiveFilters();
        wireActiveChips();
      });
    }

    // Source dropdown
    const srcBtn = document.getElementById('src-btn');
    if (srcBtn) srcBtn.addEventListener('click', e => {
      e.stopPropagation();
      state.sourcesOpen = !state.sourcesOpen;
      document.getElementById('src-wrap').outerHTML = SourcePicker();
      wireSources();
    });
    wireSources();

    // Click outside to close popovers
    document.addEventListener('click', e => {
      if (state.sourcesOpen) {
        const wrap = document.getElementById('src-wrap');
        if (wrap && !wrap.contains(e.target)) {
          state.sourcesOpen = false;
          document.getElementById('src-wrap').outerHTML = SourcePicker();
          wireSources();
        }
      }
      if (state.catOpen) {
        const wrap = document.getElementById('cat-wrap');
        if (wrap && !wrap.contains(e.target)) {
          state.catOpen = false;
          document.getElementById('cat-wrap').outerHTML = CategoryDropdown();
          wireCat();
        }
      }
    });

    wireActiveChips();
  }

  function wireCat() {
    document.querySelectorAll('#cat-pop .cat-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        state.cat = btn.dataset.cat;
        state.catOpen = false;
        persist();
        rerender();
      });
    });
  }

  function wireSources() {
    document.querySelectorAll('#src-pop input[data-src]').forEach(input => {
      input.addEventListener('change', () => {
        if (input.checked) state.sources.add(input.dataset.src);
        else state.sources.delete(input.dataset.src);
        persist();
        // refresh count label and result grid in place
        const btnLabel = document.querySelector('#src-btn span');
        const total = SOURCES.length, sel = state.sources.size;
        if (btnLabel) btnLabel.textContent = sel === total ? 'All sources' : sel === 0 ? 'No sources' : `${sel} of ${total} sources`;
        document.getElementById('news-results').innerHTML = Grid();
        document.getElementById('news-meta').innerHTML = MetaBar();
        document.getElementById('news-active').innerHTML = ActiveFilters();
        wireActiveChips();
      });
    });
    document.querySelectorAll('[data-src-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.srcAction === 'all') state.sources = new Set(SOURCES.map(s => s.id));
        else state.sources = new Set();
        persist();
        document.getElementById('src-wrap').outerHTML = SourcePicker();
        wireSources();
        document.getElementById('news-results').innerHTML = Grid();
        document.getElementById('news-meta').innerHTML = MetaBar();
        document.getElementById('news-active').innerHTML = ActiveFilters();
        wireActiveChips();
      });
    });
  }

  function wireActiveChips() {
    document.querySelectorAll('[data-clear]').forEach(el => {
      el.addEventListener('click', () => {
        const k = el.dataset.clear;
        if (k === 'cat')     state.cat = 'all';
        if (k === 'sources') state.sources = new Set(SOURCES.map(s => s.id));
        if (k === 'search')  { state.search = ''; const s = document.getElementById('news-search'); if (s) s.value = ''; }
        if (k === 'all')     { state.cat = 'all'; state.sources = new Set(SOURCES.map(s => s.id)); state.search = ''; }
        persist(); rerender();
      });
    });
  }

  function MetaBar() {
    const list = filtered();
    return `
      <span style="font-size:13px;color:#475569"><strong style="color:#0f172a;font-weight:700">${list.length}</strong> ${list.length === 1 ? 'article' : 'articles'}${state.cat !== 'all' ? ` in <strong style="color:#0f172a;font-weight:600">${catLabel(state.cat)}</strong>` : ''}</span>
      <span style="font-size:12px;color:#94a3b8">Updated just now</span>`;
  }

  function rerender() {
    document.getElementById('news-main').innerHTML = MainContent();
    wire();
  }

  function MainContent() {
    return `
      <!-- Toolbar -->
      <div class="news-toolbar">
        <div style="display:flex;flex-direction:column;gap:2px;min-width:0">
          <h1>Industry News</h1>
          <p>Marine, property, aviation &amp; offshore insurance — curated from leading trade press</p>
        </div>
        <div class="news-controls">
          <div class="search-wrap">
            <svg class="search-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
            <input id="news-search" class="search-input" placeholder="Search articles…" value="${state.search.replace(/"/g,'&quot;')}">
          </div>
          ${SourcePicker()}
        </div>
      </div>

      <!-- Category dropdown row -->
      <div class="filter-row">
        <span style="font-size:11.5px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:.04em;flex-shrink:0">Category</span>
        ${CategoryDropdown()}
      </div>

      <div id="news-active">${ActiveFilters()}</div>

      <div id="news-meta" style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin:18px 0 12px">${MetaBar()}</div>

      <div id="news-results">${Grid()}</div>`;
  }

  // ── Boot ────────────────────────────────────────────────────────────────
  window.render = function() {
    document.getElementById('app').innerHTML = `
      ${SC.Sidebar()}
      <div class="flex-1 min-w-0 flex flex-col overflow-hidden">
        ${SC.Topbar()}
        <main class="flex-1 overflow-y-auto scroll-thin bg-slate-100">
          <div id="news-main" class="news-shell">
            ${MainContent()}
          </div>
        </main>
      </div>
      ${SC.TweaksPanel()}
    `;
    SC.wireChrome();
    wire();
  };

  window.render();
})();
