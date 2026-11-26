/* ──────────────────────────────────────────────────────────────────
   Skytek pagination helper — generates DS-compliant pagination markup.
   The CSS in shared/pagination.css handles responsive behavior
   (numbered → compact → stacked) automatically.

   Usage:
     dsPagination({
       page: 3, totalPages: 34, totalItems: 847, perPage: 25,
       perPageOptions: [25, 50, 100],
       label: 'vessels',          // for "Showing 1–25 of 847 vessels"
       compact: false,            // force compact (prev/label/next only)
       inWrap: true,              // include the .ds-pagination-wrap shell
     })

   Wires interaction:
     dsWirePagination(rootEl, {
       onPage:    (p) => { ... },
       onPerPage: (n) => { ... },
       onJump:    () => { ... },   // mobile "jump to page" link
     });
   ────────────────────────────────────────────────────────────────── */
(function () {
  const CHEV_L = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
  const CHEV_R = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

  function pageNumbers(page, totalPages) {
    // Up to 7 visible buttons; collapse middle with ellipsis beyond that.
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const out = [1];
    if (page > 4) out.push('…');
    const start = Math.max(2, page - 1);
    const end   = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) out.push(i);
    if (page < totalPages - 3) out.push('…');
    out.push(totalPages);
    return out;
  }

  function dsPagination(opts) {
    const {
      page = 1, totalPages = 1,
      totalItems = null, perPage = null,
      perPageOptions = [25, 50, 100],
      label = 'results',
      compact = false,
      inWrap = true,
    } = opts || {};

    const safePage = Math.max(1, Math.min(page, Math.max(1, totalPages)));
    const first = totalItems != null && perPage ? (safePage - 1) * perPage + 1 : null;
    const last  = totalItems != null && perPage ? Math.min(safePage * perPage, totalItems) : null;
    const summary = totalItems != null ? `Showing ${first.toLocaleString()}–${last.toLocaleString()} of ${totalItems.toLocaleString()} ${label}` : '';
    const summaryShort = totalItems != null ? `${first}–${last} of ${totalItems.toLocaleString()}` : '';

    const prevBtn = `<button class="ds-page-btn is-prev" data-page="${safePage - 1}" ${safePage <= 1 ? 'disabled aria-disabled="true"' : ''} aria-label="Previous page">${CHEV_L}<span class="sr-only">Prev</span></button>`;
    const nextBtn = `<button class="ds-page-btn is-next" data-page="${safePage + 1}" ${safePage >= totalPages ? 'disabled aria-disabled="true"' : ''} aria-label="Next page"><span class="sr-only">Next</span>${CHEV_R}</button>`;
    const pageLabel = `<span class="page-label" aria-live="polite">Page <strong>${safePage}</strong> of ${totalPages.toLocaleString()}</span>`;

    let numbered = '';
    if (!compact) {
      numbered = pageNumbers(safePage, totalPages).map(n => {
        if (n === '…') return '<span class="ds-page-ellipsis">…</span>';
        const active = n === safePage;
        return `<button class="ds-page-btn ds-page-btn--keep${active ? ' is-active' : ''}" data-page="${n}"${active ? ' aria-current="page"' : ''}>${n}</button>`;
      }).join('');
    }

    // The visible nav strip — numbered on desktop, prev/label/next on tablet+mobile.
    const nav = compact
      ? `<nav class="ds-pagination--compact" aria-label="Pagination">${prevBtn}${pageLabel}${nextBtn}</nav>`
      : `<nav class="ds-pagination" aria-label="Pagination">${prevBtn}${pageLabel}${numbered}${nextBtn}</nav>`;

    const perPageSel = (perPage != null) ? `
      <label class="ds-page-perpage">Rows per page
        <select class="ds-page-perpage-select" data-perpage>
          ${perPageOptions.map(n => `<option value="${n}" ${n === perPage ? 'selected' : ''}>${n}</option>`).join('')}
        </select>
      </label>` : '';

    if (!inWrap) return nav;

    return `
      <div class="ds-pagination-wrap">
        <div class="ds-pagination-summary">
          <span>${summaryShort || summary}</span>
          ${totalPages > 10 ? `<button class="ds-page-jump-link" data-jump style="background:none;border:0;padding:0;color:var(--brand-600,#2563eb);font-size:12px;font-weight:600;cursor:pointer;">Jump to page…</button>` : ''}
        </div>
        <span class="ds-pagination-desktop-summary" style="font-size:14px;color:#6b7280;">${summary}</span>
        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
          ${perPageSel}
          ${nav}
        </div>
      </div>`;
  }

  function dsWirePagination(root, handlers) {
    if (!root) return;
    handlers = handlers || {};
    root.querySelectorAll('.ds-page-btn[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled || btn.classList.contains('is-active')) return;
        const p = parseInt(btn.dataset.page, 10);
        if (!isNaN(p) && handlers.onPage) handlers.onPage(p);
      });
    });
    const pp = root.querySelector('.ds-page-perpage-select');
    if (pp && handlers.onPerPage) {
      pp.addEventListener('change', () => handlers.onPerPage(parseInt(pp.value, 10)));
    }
    const jump = root.querySelector('[data-jump]');
    if (jump && handlers.onJump) {
      jump.addEventListener('click', () => handlers.onJump());
    }
  }

  // Hide the desktop-only summary on tablet/mobile (where the .ds-pagination-summary handles it)
  const styleId = 'ds-pagination-helper-style';
  if (!document.getElementById(styleId)) {
    const s = document.createElement('style');
    s.id = styleId;
    s.textContent = `
      @media (max-width: 1023px) { .ds-pagination-desktop-summary { display:none; } }
      @media (min-width: 1024px) { .ds-pagination-summary { display:none; } }
      .sr-only { position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0; }
    `;
    document.head.appendChild(s);
  }

  window.dsPagination     = dsPagination;
  window.dsWirePagination = dsWirePagination;
})();
