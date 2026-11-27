/* ──────────────────────────────────────────────────────────────────
   EditPortfolioGroupsModal — edit a portfolio group's title & members.
   Usage:
     EditPortfolioGroupsModal.open({
       title: 'Marine Hull',
       portfolios: ['Ardmore MR Pool LLC', ...],   // available
       selected:   ['Ardmore MR Pool LLC', ...],   // pre-checked
       onSave: ({ title, selected }) => {...}
     });
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

  function ensureExtraStyles() {
    if (document.getElementById('rw-modal-group-style')) return;
    const s = document.createElement('style');
    s.id = 'rw-modal-group-style';
    s.textContent = `
      .rw-grp-search {
        width:100%; border:1px solid #d1d5db; border-radius:4px; padding:8px 12px;
        font:inherit; font-size:14px; color:#111827; background:#fff;
        transition:border-color 120ms, box-shadow 120ms;
      }
      .rw-grp-search:focus { outline:none; border-color:var(--brand-400,#60a5fa); box-shadow:0 0 0 3px rgba(37,99,235,.10); }
      .rw-grp-list {
        margin-top:8px; max-height:280px; overflow-y:auto;
        border:1px solid #e5e7eb; border-radius:4px; background:#fff;
      }
      .rw-grp-list::-webkit-scrollbar { width:8px; }
      .rw-grp-list::-webkit-scrollbar-thumb { background:var(--brand-300,#93c5fd); border-radius:4px; }
      .rw-grp-row {
        display:flex; align-items:center; gap:8px;
        padding:12px 12px; border-bottom:1px solid #f3f4f6;
        cursor:pointer; transition:background 100ms;
      }
      .rw-grp-row:last-child { border-bottom:0; }
      .rw-grp-row:nth-child(even) { background:#f9fafb; }
      .rw-grp-row:hover { background:#eff6ff; }
      .rw-grp-row input[type="checkbox"] {
        appearance:none; -webkit-appearance:none;
        width:18px; height:18px; border:1px solid #d1d5db; border-radius:4px; background:#fff;
        cursor:pointer; position:relative; flex-shrink:0;
        transition:background 120ms, border-color 120ms;
      }
      .rw-grp-row input[type="checkbox"]:checked { background:var(--brand-500,#1a92d1); border-color:var(--brand-500,#1a92d1); }
      .rw-grp-row input[type="checkbox"]:checked::after {
        content:''; position:absolute; left:5px; top:1px; width:5px; height:10px;
        border:solid #fff; border-width:0 2px 2px 0; transform:rotate(45deg);
      }
      .rw-grp-row label { font-size:14px; color:var(--brand-700,#0f6aa0); cursor:pointer; flex:1; }
      .rw-grp-empty   { padding:20px; text-align:center; font-size:14px; color:#9ca3af; }
    `;
    document.head.appendChild(s);
  }

  function close() {
    const overlay = document.querySelector('#modal-root .rw-modal-overlay');
    if (!overlay) return;
    overlay.classList.add('is-closing');
    setTimeout(() => { overlay.remove(); }, 120);
  }

  function open(data = {}) {
    ensureExtraStyles();
    const root = ensureRoot();

    const title       = data.title ?? '';
    const portfolios  = Array.isArray(data.portfolios) ? data.portfolios.slice() : [];
    const initialSel  = new Set(Array.isArray(data.selected) ? data.selected : []);
    const selected    = new Set(initialSel);
    let searchTerm    = '';

    root.innerHTML = `
      <div class="rw-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="rw-grp-title">
        <div class="rw-modal" style="max-width:620px;">
          <div class="rw-modal-header has-close">
            <div class="rw-modal-title" id="rw-grp-title">Edit Portfolio Group</div>
            <button class="rw-modal-close-btn" data-modal-close aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="rw-modal-body">
            <div class="rw-modal-row">
              <label class="rw-modal-label" for="epg-title"><strong>Group</strong> Title:</label>
              <input id="epg-title" type="text" class="rw-modal-input" value="${escapeHtml(title)}" />
            </div>
            <div style="font-size:14px;color:#4b5563;margin:12px 0 4px;">Select Portfolios to add to group:</div>
            <input id="epg-search" type="text" class="rw-grp-search" placeholder="Search" />
            <div class="rw-grp-list" id="epg-list"></div>
          </div>
          <div class="rw-modal-footer">
            <button class="rw-modal-btn rw-modal-btn-cancel" data-modal-cancel>Cancel</button>
            <button class="rw-modal-btn rw-modal-btn-primary" data-modal-save>Save</button>
          </div>
        </div>
      </div>
    `;

    const overlay = root.querySelector('.rw-modal-overlay');
    const listEl  = overlay.querySelector('#epg-list');

    function renderList() {
      const q = searchTerm.trim().toLowerCase();
      const filtered = portfolios.filter(p => !q || p.toLowerCase().includes(q));
      if (!filtered.length) {
        listEl.innerHTML = `<div class="rw-grp-empty">No portfolios match "${escapeHtml(searchTerm)}".</div>`;
        return;
      }
      listEl.innerHTML = filtered.map((p, i) => `
        <div class="rw-grp-row">
          <input type="checkbox" id="epg-pf-${i}" data-pf-name="${escapeAttr(p)}" ${selected.has(p) ? 'checked' : ''} />
          <label for="epg-pf-${i}">${escapeHtml(p)}</label>
        </div>
      `).join('');
      listEl.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => {
          const name = cb.dataset.pfName;
          if (cb.checked) selected.add(name); else selected.delete(name);
        });
      });
    }
    renderList();

    overlay.querySelector('#epg-search').addEventListener('input', e => {
      searchTerm = e.target.value;
      renderList();
    });

    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('[data-modal-cancel]').addEventListener('click', close);
    overlay.querySelector('[data-modal-close]').addEventListener('click', close);
    overlay.querySelector('[data-modal-save]').addEventListener('click', () => {
      const result = {
        title:    overlay.querySelector('#epg-title').value,
        selected: [...selected],
      };
      if (typeof data.onSave === 'function') data.onSave(result);
      close();
    });

    const escHandler = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); } };
    document.addEventListener('keydown', escHandler);

    setTimeout(() => overlay.querySelector('#epg-title')?.focus(), 50);
  }

  function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function escapeAttr(s) { return escapeHtml(s); }

  window.EditPortfolioGroupsModal = { open, close };
})();
