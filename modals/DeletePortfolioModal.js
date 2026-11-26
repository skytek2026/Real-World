/* ──────────────────────────────────────────────────────────────────
   DeletePortfolioModal — confirmation modal for deleting a portfolio.
   Usage:
     DeletePortfolioModal.open({ name: 'Portfolio Name', onDelete: () => {...} });
     DeletePortfolioModal.close();
   Relies on the shared modal styles injected by EditPortfolioModal.js
   (or any modal loaded earlier); falls back to re-injecting them.
   ────────────────────────────────────────────────────────────────── */
(function () {
  function ensureRoot() {
    let root = document.getElementById('modal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'modal-root';
      document.body.appendChild(root);
    }
    return root;
  }

  function close() {
    const overlay = document.querySelector('#modal-root .rw-modal-overlay');
    if (!overlay) return;
    overlay.classList.add('is-closing');
    setTimeout(() => { overlay.remove(); }, 120);
  }

  function open(data = {}) {
    const root = ensureRoot();
    const name = data.name || 'this portfolio';

    root.innerHTML = `
      <div class="rw-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="rw-del-title">
        <div class="rw-modal" style="max-width:640px;">
          <div class="rw-modal-header has-close">
            <div class="rw-modal-title" id="rw-del-title">Delete Portfolio</div>
            <button class="rw-modal-close-btn" data-modal-close aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="rw-modal-body" style="min-height:140px;">
            <div style="font-size:14px;color:#374151;">
              Are you sure you want to delete portfolio: <strong style="color:#111827;">${escapeHtml(name)}</strong>?
            </div>
          </div>
          <div class="rw-modal-footer">
            <button class="rw-modal-btn rw-modal-btn-cancel" data-modal-cancel>Cancel</button>
            <button class="rw-modal-btn rw-modal-btn-primary" data-modal-delete>
              <span style="display:inline-flex;align-items:center;gap:4px;">
                Delete
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    `;

    const overlay = root.querySelector('.rw-modal-overlay');
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('[data-modal-cancel]').addEventListener('click', close);
    overlay.querySelector('[data-modal-close]').addEventListener('click', close);
    overlay.querySelector('[data-modal-delete]').addEventListener('click', () => {
      if (typeof data.onDelete === 'function') data.onDelete();
      close();
    });

    const escHandler = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); } };
    document.addEventListener('keydown', escHandler);
  }

  function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  window.DeletePortfolioModal = { open, close };
})();
