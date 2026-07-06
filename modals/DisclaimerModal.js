/* ──────────────────────────────────────────────────────────────────
   DisclaimerModal — informational disclaimer popup.
   Usage:
     DisclaimerModal.open();
     DisclaimerModal.close();
   Uses the shared rw-modal styles (modals/modal-base.css); ensures the
   stylesheet is present, injecting it if a page hasn't linked it.
   ────────────────────────────────────────────────────────────────── */
(function () {
  function ensureStyles() {
    if (document.getElementById('rw-modal-base-css')) return;
    if ([...document.styleSheets].some(s => (s.href || '').includes('modal-base.css'))) return;
    const link = document.createElement('link');
    link.id = 'rw-modal-base-css';
    link.rel = 'stylesheet';
    link.href = 'modals/modal-base.css';
    document.head.appendChild(link);
  }

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

  function open() {
    ensureStyles();
    const root = ensureRoot();
    root.innerHTML = `
      <div class="rw-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="rw-disc-title">
        <div class="rw-modal" style="max-width:600px;">
          <div class="rw-modal-header has-close">
            <div class="rw-modal-title" id="rw-disc-title">Disclaimer</div>
            <button class="rw-modal-close-btn" data-modal-close aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="rw-modal-body" style="max-height:60vh;overflow-y:auto;font-size:13px;line-height:1.6;color:#334155;">
            <p style="margin:0 0 12px;">The content on this platform is provided for general information only and may be provided by third party licensors. The content is not intended to amount to advice on which any reliance should be placed. Skytek advises that professional or specialist advice is obtained before taking, or refraining from, any action on the basis of this content.</p>
            <p style="margin:0 0 12px;">The content on this platform is provided in good faith but Skytek make no representations, warranties or guarantees, whether express or implied, that the content on this platform is accurate, complete or up to date.</p>
            <p style="margin:0;">To the extent permitted by law, Skytek and any third party licensor, will not be liable for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, even if foreseeable, arising under or in connection with use or reliance on any content on this platform. In particular, Skytek and any third party licensor will not be liable for any loss of profits, sales, business or revenue, business interruption, loss of anticipated savings, loss of business opportunity, goodwill or reputation or any indirect or consequential loss or damage whatsoever or howsoever caused.</p>
          </div>
          <div class="rw-modal-footer">
            <button class="rw-modal-btn rw-modal-btn-primary" data-modal-close>Close</button>
          </div>
        </div>
      </div>
    `;
    const overlay = root.querySelector('.rw-modal-overlay');
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelectorAll('[data-modal-close]').forEach(b => b.addEventListener('click', close));
    const escHandler = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); } };
    document.addEventListener('keydown', escHandler);
  }

  window.DisclaimerModal = { open, close };
})();
