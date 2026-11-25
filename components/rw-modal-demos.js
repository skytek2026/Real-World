/* ============================================================================
   Demos for the Modal component spec page.
   Shows the high-level open() API, the confirm() helper, and a faithful
   rebuild of the original AddPortModal assembled from the standardized slots.
   ========================================================================== */
(function () {
  'use strict';

  // Inject demo-only styles (form fields + map placeholder used by the
  // AddPort rebuild) so the demos look correct wherever this script loads.
  function ensureDemoStyles() {
    if (document.getElementById('rw-modal-demo-style')) return;
    var s = document.createElement('style');
    s.id = 'rw-modal-demo-style';
    s.textContent =
      '.demo-twocol{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:20px;}' +
      '.demo-formgrid{display:grid;gap:12px;align-content:start;}' +
      '.demo-field{display:grid;grid-template-columns:140px 1fr;gap:14px;align-items:center;}' +
      '.demo-field-label{font-size:13px;color:#374151;}' +
      '.demo-field-control{width:100%;border:1px solid #d1d5db;border-radius:6px;padding:7px 10px;font:inherit;font-size:13px;color:#111827;background:#fff;transition:border-color 120ms,box-shadow 120ms;}' +
      '.demo-field-control:focus{outline:0;border-color:#8ec5fd;box-shadow:0 0 0 3px rgba(37,99,235,.12);}' +
      ".demo-field-select{appearance:none;-webkit-appearance:none;cursor:pointer;padding-right:28px;background:#fff url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\") no-repeat right 10px center;}" +
      '.demo-map{min-height:360px;border:1px solid #e5e7eb;border-radius:8px;display:grid;place-items:center;background:linear-gradient(135deg,rgba(45,127,251,0.05),rgba(45,127,251,0.02)),repeating-linear-gradient(45deg,#eef2f7 0 10px,#e6ecf3 10px 20px);}' +
      '.demo-map-cap{font-family:monospace;font-size:11px;color:#6b7280;background:rgba(255,255,255,0.8);padding:4px 10px;border-radius:6px;}' +
      '@media (max-width:768px){.demo-twocol{grid-template-columns:1fr;}.demo-map{min-height:220px;}.demo-field{grid-template-columns:1fr;gap:4px;}}';
    document.head.appendChild(s);
  }

  function field(label, id, value, opts) {
    opts = opts || {};
    var wrap = document.createElement('div');
    wrap.className = 'demo-field';
    var l = document.createElement('label');
    l.className = 'demo-field-label';
    l.setAttribute('for', id);
    l.textContent = label;
    wrap.appendChild(l);
    var input;
    if (opts.select) {
      input = document.createElement('select');
      input.className = 'demo-field-control demo-field-select';
      opts.options.forEach(function (o) {
        var op = document.createElement('option');
        op.value = o; op.textContent = o || '—';
        if (o === value) op.selected = true;
        input.appendChild(op);
      });
    } else {
      input = document.createElement('input');
      input.type = 'text';
      input.className = 'demo-field-control';
      input.value = value || '';
    }
    input.id = id;
    wrap.appendChild(input);
    return wrap;
  }

  /* ── Size variants ────────────────────────────────────────────────── */
  function openSize(size) {
    var labels = { sm: 'Small', md: 'Medium', lg: 'Large', xl: 'Extra-large', full: 'Full-bleed' };
    RWModal.open({
      size: size,
      title: labels[size] + ' dialog',
      subtitle: 'size="' + size + '"',
      body: function (b) {
        var p = document.createElement('p');
        p.style.cssText = 'margin:0;font-size:13.5px;line-height:1.6;color:#4b5563;';
        p.innerHTML = 'This is the <strong>' + labels[size] + '</strong> container width. The same header, body, and footer slots scale across every size — only <code style="font-family:monospace;">--rw-modal-w-' + size + '</code> changes. Tab through the buttons below: focus is trapped inside this dialog, and Escape closes it.';
        b.appendChild(p);
      },
      footer: [
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Got it', variant: 'primary', onClick: function (m) { m.close(); } }
      ]
    });
  }

  /* ── Scrollable body ──────────────────────────────────────────────── */
  function openScrollable() {
    RWModal.open({
      size: 'md',
      title: 'Terms & coverage',
      subtitle: 'Body scrolls; header and footer stay pinned',
      body: function (b) {
        for (var i = 1; i <= 12; i++) {
          var h = document.createElement('div');
          h.className = 'rw-modal-section-title';
          if (i === 1) { h.style.borderTop = '0'; h.style.marginTop = '0'; h.style.paddingTop = '0'; }
          h.textContent = 'Clause ' + i;
          b.appendChild(h);
          var p = document.createElement('p');
          p.style.cssText = 'margin:8px 0 4px;font-size:13px;line-height:1.6;color:#4b5563;';
          p.textContent = 'The body region uses overflow-y:auto with min-height:0 so it scrolls independently while the header and footer remain fixed. This keeps primary actions reachable no matter how long the content runs.';
          b.appendChild(p);
        }
      },
      footer: [
        { label: 'Decline', variant: 'ghost', closeOnClick: true },
        { label: 'Accept', variant: 'primary', onClick: function (m) { m.close(); } }
      ]
    });
  }

  /* ── closeOnOverlayClick toggle ───────────────────────────────────── */
  function openOverlay(closeOnOverlay) {
    RWModal.open({
      size: 'sm',
      title: closeOnOverlay ? 'Dismissible' : 'Locked to actions',
      subtitle: 'closeOnOverlayClick = ' + closeOnOverlay,
      closeOnOverlayClick: closeOnOverlay,
      body: function (b) {
        var p = document.createElement('p');
        p.style.cssText = 'margin:0;font-size:13.5px;line-height:1.6;color:#4b5563;';
        p.textContent = closeOnOverlay
          ? 'Click anywhere on the dimmed backdrop to dismiss. Good for non-destructive, low-stakes dialogs.'
          : 'Clicking the backdrop does nothing — the user must choose an explicit action. Use this for forms with unsaved input or destructive confirmations.';
        b.appendChild(p);
      },
      footer: [{ label: 'Close', variant: 'primary', onClick: function (m) { m.close(); } }]
    });
  }

  /* ── confirm() helper (destructive) ───────────────────────────────── */
  function openConfirm() {
    RWModal.confirm({
      title: 'Delete portfolio?',
      message: 'This permanently removes “North Sea Fleet” and its 42 tracked vessels. This action cannot be undone.',
      confirmLabel: 'Delete portfolio',
      cancelLabel: 'Keep it',
      danger: true,
      closeOnOverlayClick: false
    }).then(function (ok) {
      if (ok) RWModal.open({ size: 'sm', title: 'Deleted', body: '<p style="margin:0;font-size:13.5px;color:#4b5563;">Portfolio removed.</p>', footer: [{ label: 'OK', variant: 'primary', onClick: function (m) { m.close(); } }] });
    });
  }

  /* ── Faithful AddPort rebuild — assembled from the standardized slots ─ */
  function openAddPort() {
    ensureDemoStyles();
    var COUNTRIES = ['', 'Ireland', 'United Kingdom', 'Netherlands', 'Germany', 'France', 'Spain', 'Norway', 'United States', 'Singapore', 'Other'];

    RWModal.open({
      size: 'xl',
      title: 'Add a new Port',
      subtitle: 'Rebuilt on RWModal — same form, standardized shell',
      closeOnOverlayClick: false,
      initialFocus: '#ap2-name',
      body: function (b) {
        var two = document.createElement('div');
        two.className = 'demo-twocol';

        var grid = document.createElement('div');
        grid.className = 'demo-formgrid';
        grid.appendChild(field('Name', 'ap2-name', 'Dublin Port'));
        grid.appendChild(field('LOCODE', 'ap2-locode', 'IEDUB'));
        grid.appendChild(field('GlobalPortID', 'ap2-gpid', ''));
        grid.appendChild(field('WorldPortNumber', 'ap2-wpn', ''));
        grid.appendChild(field('Country', 'ap2-country', 'Ireland', { select: true, options: COUNTRIES }));
        grid.appendChild(field('Lat', 'ap2-lat', '53.353584'));
        grid.appendChild(field('Lng', 'ap2-lng', '-6.251495'));
        two.appendChild(grid);

        var mapWrap = document.createElement('div');
        mapWrap.className = 'demo-map';
        mapWrap.innerHTML = '<span class="demo-map-cap">Leaflet map mounts into the body slot — unchanged</span>';
        two.appendChild(mapWrap);

        b.appendChild(two);
      },
      footer: [
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Save', variant: 'primary', onClick: function (m) {
          var name = m.query('#ap2-name').value;
          m.close();
          RWModal.open({ size: 'sm', title: 'Port saved', body: '<p style="margin:0;font-size:13.5px;color:#4b5563;">“' + name + '” was added to the registry.</p>', footer: [{ label: 'Done', variant: 'primary', onClick: function (x) { x.close(); } }] });
        } }
      ]
    });
  }

  /* ── Composed-from-parts demo (low-level API) ─────────────────────── */
  function openComposed() {
    var P = RWModal.parts;
    var overlay = P.Overlay({ labelledby: 'composed-title' });
    var container = P.Container({ size: 'md' });
    container.appendChild(P.Header({ title: 'Assembled by hand', titleId: 'composed-title', subtitle: 'Built from RWModal.parts.*' }));
    container.appendChild(P.Body('<p style="margin:0;font-size:13.5px;line-height:1.6;color:#4b5563;">This dialog was composed slot-by-slot with <code style="font-family:monospace;">Overlay → Container → Header → Body → Footer</code>, then wired with <code style="font-family:monospace;">RWModal.mount()</code> for focus-trapping and dismissal. Same primitives the high-level <code style="font-family:monospace;">open()</code> uses internally.</p>'));
    container.appendChild(P.Footer([
      { label: 'Close', variant: 'primary', onClick: function (m) { m.close(); } }
    ]));
    overlay.appendChild(container);
    RWModal.mount(overlay, { closeOnOverlayClick: true, closeOnEsc: true });
  }

  // Expose to the page
  window.ModalDemos = {
    openSize: openSize,
    openScrollable: openScrollable,
    openOverlay: openOverlay,
    openConfirm: openConfirm,
    openAddPort: openAddPort,
    openComposed: openComposed
  };
})();
