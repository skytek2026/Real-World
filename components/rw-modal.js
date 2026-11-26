/* ============================================================================
   RW Modal — Design System Component (framework-agnostic, vanilla JS)
   ----------------------------------------------------------------------------
   Standardizes the platform's dialogs into one accessible, configurable
   primitive. Drop in alongside components/rw-modal.css.

   HIGH-LEVEL API
   ──────────────
     const modal = RWModal.open({
       size: 'md',                  // 'sm' | 'md' | 'lg' | 'xl' | 'full'
       title: 'Add a new Port',
       subtitle: 'Define location and metadata',
       closeButton: true,           // show the standardized × button
       closeOnOverlayClick: true,   // click scrim to dismiss
       closeOnEsc: true,            // Escape to dismiss
       align: 'center',             // 'center' | 'top'
       body: el => { ... },         // string | Node | (bodyEl) => void
       footer: [                    // array of button configs (or Node/string/false)
         { label: 'Cancel', variant: 'secondary', closeOnClick: true },
         { label: 'Save',   variant: 'primary',   onClick: m => {...} },
       ],
       initialFocus: '#field-name', // selector or Node; defaults to first field
       onOpen:  m => {},
       onClose: () => {},
     });
     modal.close();

   LOW-LEVEL SLOTS (assemble by hand — see RWModal.parts)
   ──────────────
     RWModal.parts.Overlay / Container / Header / Body / Footer / Button
     RWModal.mount(overlayEl, opts)   // wires a11y + behavior onto a built tree

   ACCESSIBILITY
   ──────────────
     • role="dialog", aria-modal="true", aria-labelledby → title (or aria-label)
     • Focus is trapped within the dialog (Tab / Shift+Tab cycle)
     • Escape closes (when closeOnEsc); focus returns to the trigger on close
     • Background scroll is locked; nested modals are reference-counted
   ========================================================================== */
(function () {
  'use strict';

  var SIZES = { sm: 'rw-modal--sm', md: 'rw-modal--md', lg: 'rw-modal--lg', xl: 'rw-modal--xl', full: 'rw-modal--full' };
  var FOCUSABLE = [
    'a[href]', 'button:not([disabled])', 'textarea:not([disabled])',
    'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  var uid = 0;
  var openCount = 0;

  var CLOSE_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">' +
    '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  /* ── tiny DOM helpers ───────────────────────────────────────────────── */
  function el(tag, cls, attrs) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) for (var k in attrs) { if (attrs[k] != null) n.setAttribute(k, attrs[k]); }
    return n;
  }
  function fill(node, content) {
    if (content == null || content === false) return;
    if (typeof content === 'string') node.innerHTML = content;
    else if (content instanceof Node) node.appendChild(content);
    else if (typeof content === 'function') {
      var r = content(node);
      if (r != null && r !== node) fill(node, r);
    }
  }
  function ensureRoot() {
    var root = document.getElementById('rw-modal-root');
    if (!root) { root = el('div', null, { id: 'rw-modal-root' }); document.body.appendChild(root); }
    return root;
  }
  function lockScroll(lock) {
    if (lock) { openCount++; document.documentElement.classList.add('rw-modal-open'); }
    else { openCount = Math.max(0, openCount - 1); if (!openCount) document.documentElement.classList.remove('rw-modal-open'); }
  }

  /* ── sub-component builders (the five slots) ────────────────────────── */
  var parts = {
    Overlay: function (opts) {
      opts = opts || {};
      var o = el('div', 'rw-modal-overlay' + (opts.align === 'top' ? ' rw-modal-overlay--top' : ''),
        { role: 'dialog', 'aria-modal': 'true' });
      if (opts.labelledby) o.setAttribute('aria-labelledby', opts.labelledby);
      else if (opts.ariaLabel) o.setAttribute('aria-label', opts.ariaLabel);
      return o;
    },
    Container: function (opts) {
      opts = opts || {};
      var sizeCls = SIZES[opts.size] || SIZES.md;
      return el('div', 'rw-modal ' + sizeCls + (opts.className ? ' ' + opts.className : ''));
    },
    Header: function (opts) {
      opts = opts || {};
      var hasClose = opts.closeButton !== false;
      var h = el('div', 'rw-modal-header' + (hasClose ? '' : ' rw-modal-header--plain'));
      var titles = el('div', 'rw-modal-titles');
      if (opts.title) {
        var t = el('h2', 'rw-modal-title', { id: opts.titleId });
        t.textContent = opts.title;
        titles.appendChild(t);
      }
      if (opts.subtitle) {
        var s = el('p', 'rw-modal-subtitle');
        s.textContent = opts.subtitle;
        titles.appendChild(s);
      }
      h.appendChild(titles);
      if (hasClose) {
        var btn = el('button', 'rw-modal-close-btn', { type: 'button', 'aria-label': opts.closeLabel || 'Close dialog', 'data-rw-close': '' });
        btn.innerHTML = CLOSE_SVG;
        h.appendChild(btn);
      }
      return h;
    },
    Body: function (content, opts) {
      opts = opts || {};
      var b = el('div', 'rw-modal-body' + (opts.className ? ' ' + opts.className : ''));
      fill(b, content);
      return b;
    },
    Footer: function (items, opts) {
      opts = opts || {};
      var f = el('div', 'rw-modal-footer' + (opts.layout ? ' rw-modal-footer--' + opts.layout : ''));
      if (Array.isArray(items)) items.forEach(function (cfg) { f.appendChild(parts.Button(cfg)); });
      else fill(f, items);
      return f;
    },
    Button: function (cfg) {
      cfg = cfg || {};
      var variant = cfg.variant || 'secondary';
      var b = el('button', 'rw-modal-btn rw-modal-btn--' + variant, { type: 'button' });
      if (cfg.id) b.id = cfg.id;
      if (cfg.disabled) b.disabled = true;
      if (cfg.autoFocus) b.setAttribute('data-rw-autofocus', '');
      b.textContent = cfg.label || '';
      b._rwCfg = cfg;   // consumed by mount() for click wiring
      return b;
    }
  };

  /* ── mount(): wire accessibility + behavior onto an assembled tree ──── */
  function mount(overlay, opts) {
    opts = opts || {};
    var root = ensureRoot();
    var previouslyFocused = document.activeElement;
    var modal = overlay.querySelector('.rw-modal') || overlay;
    var closed = false;

    var instance = {
      el: overlay,
      modal: modal,
      query: function (sel) { return overlay.querySelector(sel); },
      queryAll: function (sel) { return Array.prototype.slice.call(overlay.querySelectorAll(sel)); },
      close: doClose
    };

    function focusables() {
      return Array.prototype.slice.call(modal.querySelectorAll(FOCUSABLE))
        .filter(function (n) { return n.offsetParent !== null || n === document.activeElement; });
    }

    function onKeydown(e) {
      if (e.key === 'Escape' && opts.closeOnEsc !== false) { e.stopPropagation(); doClose(); return; }
      if (e.key !== 'Tab') return;
      var f = focusables();
      if (!f.length) { e.preventDefault(); return; }
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    // If focus somehow escapes the dialog, pull it back in (true trap).
    function onFocusIn(e) {
      if (!overlay.contains(e.target)) {
        var f = focusables();
        if (f.length) f[0].focus();
      }
    }

    function onOverlayClick(e) {
      if (e.target === overlay && opts.closeOnOverlayClick !== false) doClose();
    }

    function doClose() {
      if (closed) return;
      closed = true;
      document.removeEventListener('keydown', onKeydown, true);
      document.removeEventListener('focusin', onFocusIn, true);
      overlay.classList.add('is-closing');
      lockScroll(false);
      var ms = prefersReducedMotion() ? 0 : 140;
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus();
        if (typeof opts.onClose === 'function') opts.onClose();
      }, ms);
    }

    // Wire close affordances
    overlay.addEventListener('mousedown', function (e) { instance._downTarget = e.target; });
    overlay.addEventListener('click', function (e) {
      // Only dismiss when both press and release happen on the scrim (prevents
      // accidental close when a drag starts inside the modal and ends on scrim).
      if (instance._downTarget === overlay) onOverlayClick(e);
    });
    instance.queryAll('[data-rw-close]').forEach(function (b) { b.addEventListener('click', doClose); });

    // Wire footer button configs
    instance.queryAll('.rw-modal-btn').forEach(function (b) {
      var cfg = b._rwCfg;
      if (!cfg) return;
      b.addEventListener('click', function () {
        // Run the handler; if it returns false, keep the modal open
        // (e.g. validation failed). Otherwise close unless closeOnClick:false.
        var keepOpen = false;
        if (typeof cfg.onClick === 'function') keepOpen = (cfg.onClick(instance) === false);
        if (!keepOpen && cfg.closeOnClick !== false) doClose();
      });
    });

    document.addEventListener('keydown', onKeydown, true);
    document.addEventListener('focusin', onFocusIn, true);

    root.appendChild(overlay);
    lockScroll(true);

    // Initial focus — setTimeout (not rAF) so it fires even if the tab is
    // backgrounded at open time; rAF is paused while the document is hidden.
    setTimeout(function () {
      var target = null;
      if (opts.initialFocus) {
        target = typeof opts.initialFocus === 'string' ? overlay.querySelector(opts.initialFocus) : opts.initialFocus;
      }
      if (!target) target = overlay.querySelector('[data-rw-autofocus]');
      if (!target) {
        var f = focusables().filter(function (n) { return !n.hasAttribute('data-rw-close'); });
        target = f[0] || overlay.querySelector('.rw-modal-close-btn') || modal;
      }
      if (target && typeof target.focus === 'function') target.focus();
      if (typeof opts.onOpen === 'function') opts.onOpen(instance);
    }, 30);

    return instance;
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ── open(): the high-level convenience that assembles the slots ────── */
  function open(config) {
    config = config || {};
    var id = 'rw-modal-' + (++uid);
    var titleId = id + '-title';

    var overlay = parts.Overlay({
      align: config.align,
      labelledby: config.title ? titleId : null,
      ariaLabel: config.ariaLabel
    });
    var container = parts.Container({ size: config.size, className: config.className });

    // Header (skip entirely if no title and explicitly no close button)
    if (config.title || config.subtitle || config.closeButton !== false) {
      container.appendChild(parts.Header({
        title: config.title,
        titleId: titleId,
        subtitle: config.subtitle,
        closeButton: config.closeButton,
        closeLabel: config.closeLabel
      }));
    }

    container.appendChild(parts.Body(config.body, { className: config.bodyClassName }));

    if (config.footer !== false && config.footer != null) {
      container.appendChild(parts.Footer(config.footer, { layout: config.footerLayout }));
    }

    overlay.appendChild(container);

    return mount(overlay, {
      closeOnOverlayClick: config.closeOnOverlayClick,
      closeOnEsc: config.closeOnEsc,
      initialFocus: config.initialFocus,
      onOpen: config.onOpen,
      onClose: config.onClose
    });
  }

  /* ── confirm(): higher-order helper for destructive / yes-no dialogs ── */
  function confirm(config) {
    config = config || {};
    return new Promise(function (resolve) {
      var body = el('div');
      var p = el('p', null);
      p.style.cssText = 'margin:0;font-size:13px;line-height:1.55;color:var(--rw-modal-text-muted);';
      p.textContent = config.message || '';
      body.appendChild(p);
      var m = open({
        size: config.size || 'sm',
        title: config.title || 'Are you sure?',
        body: body,
        closeOnOverlayClick: config.closeOnOverlayClick !== false,
        footer: [
          { label: config.cancelLabel || 'Cancel', variant: 'secondary', onClick: function () { resolve(false); }, closeOnClick: true },
          { label: config.confirmLabel || 'Confirm', variant: config.danger ? 'danger' : 'primary',
            onClick: function (inst) { resolve(true); inst.close(); } }
        ],
        onClose: function () { resolve(false); }
      });
      return m;
    });
  }

  function closeAll() {
    Array.prototype.slice.call(document.querySelectorAll('#rw-modal-root .rw-modal-overlay'))
      .forEach(function (o) { o.classList.add('is-closing'); setTimeout(function () { o.remove(); }, 140); });
    openCount = 0; document.documentElement.classList.remove('rw-modal-open');
  }

  window.RWModal = { open: open, confirm: confirm, mount: mount, parts: parts, closeAll: closeAll };
})();
