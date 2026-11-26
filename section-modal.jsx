/* Modal: full specification section for the Skytek Design System spec page.
   Renders the live, standardized RWModal component (components/rw-modal.*).
   Demo triggers call window.ModalDemos / window.RWModal (loaded as plain JS). */

const MD = (fn, ...args) => () => { if (window.ModalDemos) window.ModalDemos[fn](...args); };

const ModalSpec = () => (
  <>
    {/* ====== LIVE DEMOS ====== */}
    <div className="subsection">
      <h3 className="subsection-title">Live behavior</h3>
      <p className="subsection-desc">Every dialog below is the production component. Open one and press <kbd className="ms-kbd">Tab</kbd> to feel the focus trap, <kbd className="ms-kbd">Esc</kbd> to dismiss, or click the dimmed backdrop where enabled. Focus returns to the trigger on close.</p>

      <div className="panel" style={{ padding: 20 }}>
        <div className="ms-demo-row">
          <div className="ms-demo-grp">
            <span className="t-overline">Size variants</span>
            <div className="row" style={{ gap: 8 }}>
              <button className="ds-btn ds-btn--secondary ds-btn--sm" onClick={MD("openSize", "sm")}>SM</button>
              <button className="ds-btn ds-btn--secondary ds-btn--sm" onClick={MD("openSize", "md")}>MD</button>
              <button className="ds-btn ds-btn--secondary ds-btn--sm" onClick={MD("openSize", "lg")}>LG</button>
              <button className="ds-btn ds-btn--secondary ds-btn--sm" onClick={MD("openSize", "xl")}>XL</button>
              <button className="ds-btn ds-btn--secondary ds-btn--sm" onClick={MD("openSize", "full")}>Full</button>
            </div>
          </div>
          <div className="ms-demo-grp">
            <span className="t-overline">Behaviors</span>
            <div className="row" style={{ gap: 8 }}>
              <button className="ds-btn ds-btn--secondary ds-btn--sm" onClick={MD("openScrollable")}>Scrollable body</button>
              <button className="ds-btn ds-btn--secondary ds-btn--sm" onClick={MD("openOverlay", true)}>Dismissible</button>
              <button className="ds-btn ds-btn--secondary ds-btn--sm" onClick={MD("openOverlay", false)}>Locked</button>
              <button className="ds-btn ds-btn--secondary ds-btn--sm" onClick={MD("openComposed")}>Composed</button>
            </div>
          </div>
          <div className="ms-demo-grp">
            <span className="t-overline">In context</span>
            <div className="row" style={{ gap: 8 }}>
              <button className="ds-btn ds-btn--danger ds-btn--sm" onClick={MD("openConfirm")}>Delete portfolio…</button>
              <button className="ds-btn ds-btn--primary ds-btn--sm" onClick={MD("openAddPort")}>Add a new Port</button>
            </div>
          </div>
        </div>
      </div>
      <div className="callout" style={{ marginTop: 16 }}>
        <strong>Refactored from <code className="inline">AddPortModal</code>.</strong> The "Add a new Port" demo is the original modal rebuilt on this shell, same form, standardized overlay/header/body/footer and accessibility.
      </div>
    </div>

    {/* ====== ANATOMY ====== */}
    <div className="subsection">
      <h3 className="subsection-title">Anatomy: five slots</h3>
      <p className="subsection-desc">The component decomposes into five independently styleable regions. <code className="inline">RWModal.open()</code> assembles them; <code className="inline">RWModal.parts.*</code> exposes each as a builder.</p>
      <div className="panel" style={{ overflow: "hidden" }}>
        <table className="spec-table" style={{ border: 0 }}>
          <thead><tr><th style={{ width: 28 }}>#</th><th>Slot</th><th>Class</th><th>Responsibility</th></tr></thead>
          <tbody>
            <tr><td>1</td><td><strong>Overlay / Backdrop</strong></td><td><code className="inline">.rw-modal-overlay</code></td><td className="t-caption">Fixed full-bleed scrim (<code className="inline">rgba(15,23,42,.45)</code> + 2px blur). Centers the container; owns dismiss-on-backdrop.</td></tr>
            <tr><td>2</td><td><strong>Container</strong></td><td><code className="inline">.rw-modal</code></td><td className="t-caption">Surface: 12px radius, layered elevation, size-bounded width, viewport-capped flex column.</td></tr>
            <tr><td>3</td><td><strong>Header</strong></td><td><code className="inline">.rw-modal-header</code></td><td className="t-caption">Title (+ optional subtitle) and the standardized circular close button. Pinned.</td></tr>
            <tr><td>4</td><td><strong>Body</strong></td><td><code className="inline">.rw-modal-body</code></td><td className="t-caption">The only scroll region. Consistent 20/24px inner padding; <code className="inline">overscroll-behavior: contain</code>.</td></tr>
            <tr><td>5</td><td><strong>Footer</strong></td><td><code className="inline">.rw-modal-footer</code></td><td className="t-caption">Right-aligned actions, token-driven gap. Primary / secondary / ghost / danger button variants.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* ====== SIZES ====== */}
    <div className="subsection">
      <h3 className="subsection-title">Size variants</h3>
      <p className="subsection-desc">Set with the <code className="inline">size</code> prop. Each maps to one max-width token, widths are the only thing that changes.</p>
      <div className="panel" style={{ overflow: "hidden" }}>
        <table className="spec-table" style={{ border: 0 }}>
          <thead><tr><th>Variant</th><th>Prop</th><th>Token</th><th>Max-width</th><th>Use for</th></tr></thead>
          <tbody>
            <tr><td><strong>Small</strong></td><td><code className="inline">size="sm"</code></td><td><code className="inline">--rw-modal-w-sm</code></td><td>420px</td><td className="t-caption">Confirmations, single-field prompts</td></tr>
            <tr style={{ background: "var(--brand-050)" }}><td><strong>Medium</strong> <span className="t-caption">(default)</span></td><td><code className="inline">size="md"</code></td><td><code className="inline">--rw-modal-w-md</code></td><td>620px</td><td className="t-caption">Standard forms, settings</td></tr>
            <tr><td><strong>Large</strong></td><td><code className="inline">size="lg"</code></td><td><code className="inline">--rw-modal-w-lg</code></td><td>820px</td><td className="t-caption">Multi-section forms</td></tr>
            <tr><td><strong>Extra-large</strong></td><td><code className="inline">size="xl"</code></td><td><code className="inline">--rw-modal-w-xl</code></td><td>1100px</td><td className="t-caption">Form + map / preview (Add Port)</td></tr>
            <tr><td><strong>Full-bleed</strong></td><td><code className="inline">size="full"</code></td><td>—</td><td>viewport − 48px</td><td className="t-caption">Immersive editors, data tables</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* ====== API ====== */}
    <div className="subsection">
      <h3 className="subsection-title">Props</h3>
      <p className="subsection-desc"><code className="inline">RWModal.open(config)</code> returns an instance with <code className="inline">.close()</code>, <code className="inline">.query()</code>, <code className="inline">.el</code>, <code className="inline">.modal</code>.</p>
      <div className="panel" style={{ overflow: "hidden" }}>
        <table className="spec-table" style={{ border: 0 }}>
          <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code className="inline">size</code></td><td className="t-caption">'sm'|'md'|'lg'|'xl'|'full'</td><td><code className="inline">'md'</code></td><td className="t-caption">Container width variant.</td></tr>
            <tr><td><code className="inline">title</code></td><td className="t-caption">string</td><td>—</td><td className="t-caption">Header title; wires <code className="inline">aria-labelledby</code>.</td></tr>
            <tr><td><code className="inline">subtitle</code></td><td className="t-caption">string</td><td>—</td><td className="t-caption">Secondary line under the title.</td></tr>
            <tr><td><code className="inline">body</code></td><td className="t-caption">string | Node | fn</td><td>—</td><td className="t-caption">Content slot. A function receives the body element.</td></tr>
            <tr><td><code className="inline">footer</code></td><td className="t-caption">Button[] | Node | false</td><td>—</td><td className="t-caption">Button configs, custom node, or false to omit.</td></tr>
            <tr><td><code className="inline">closeButton</code></td><td className="t-caption">boolean</td><td><code className="inline">true</code></td><td className="t-caption">Show the × in the header.</td></tr>
            <tr><td><code className="inline">closeOnOverlayClick</code></td><td className="t-caption">boolean</td><td><code className="inline">true</code></td><td className="t-caption">Dismiss on backdrop click.</td></tr>
            <tr><td><code className="inline">closeOnEsc</code></td><td className="t-caption">boolean</td><td><code className="inline">true</code></td><td className="t-caption">Dismiss on Escape.</td></tr>
            <tr><td><code className="inline">align</code></td><td className="t-caption">'center'|'top'</td><td><code className="inline">'center'</code></td><td className="t-caption">Vertical placement.</td></tr>
            <tr><td><code className="inline">initialFocus</code></td><td className="t-caption">selector | Node</td><td className="t-caption">first field</td><td className="t-caption">Element focused on open.</td></tr>
            <tr><td><code className="inline">onOpen / onClose</code></td><td className="t-caption">fn</td><td>—</td><td className="t-caption">Lifecycle hooks.</td></tr>
            <tr><td><code className="inline">ariaLabel</code></td><td className="t-caption">string</td><td>—</td><td className="t-caption">Accessible name when titleless.</td></tr>
          </tbody>
        </table>
      </div>

      <h4 className="t-h4" style={{ margin: "24px 0 8px" }}>Footer button config</h4>
      <div className="panel" style={{ overflow: "hidden" }}>
        <table className="spec-table" style={{ border: 0 }}>
          <thead><tr><th>Key</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code className="inline">label</code></td><td className="t-caption">string</td><td className="t-caption">Button text.</td></tr>
            <tr><td><code className="inline">variant</code></td><td className="t-caption">'primary'|'secondary'|'ghost'|'danger'</td><td className="t-caption">Visual weight / intent.</td></tr>
            <tr><td><code className="inline">onClick</code></td><td className="t-caption">(instance) =&gt; void|false</td><td className="t-caption">Handler. Return <code className="inline">false</code> to keep the dialog open (failed validation).</td></tr>
            <tr><td><code className="inline">closeOnClick</code></td><td className="t-caption">boolean</td><td className="t-caption">Force close after the handler.</td></tr>
            <tr><td><code className="inline">disabled / autoFocus</code></td><td className="t-caption">boolean</td><td className="t-caption">Render disabled / receive initial focus.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* ====== TOKENS ====== */}
    <div className="subsection">
      <h3 className="subsection-title">Design tokens</h3>
      <p className="subsection-desc">Every visual property reads from a <code className="inline">--rw-modal-*</code> variable. Override on <code className="inline">:root</code> (or any ancestor) to re-theme without touching markup.</p>
      <div className="panel" style={{ overflow: "hidden" }}>
        <table className="spec-table" style={{ border: 0 }}>
          <thead><tr><th>Token</th><th>Default</th><th>Controls</th></tr></thead>
          <tbody>
            <tr><td><code className="inline">--rw-modal-scrim</code></td><td className="t-caption">rgba(15,23,42,.45)</td><td className="t-caption">Backdrop color / opacity</td></tr>
            <tr><td><code className="inline">--rw-modal-scrim-blur</code></td><td className="t-caption">2px</td><td className="t-caption">Backdrop blur radius</td></tr>
            <tr><td><code className="inline">--rw-modal-radius</code></td><td className="t-caption">12px</td><td className="t-caption">Container roundness</td></tr>
            <tr><td><code className="inline">--rw-modal-shadow</code></td><td className="t-caption">layered</td><td className="t-caption">Container elevation</td></tr>
            <tr><td><code className="inline">--rw-modal-pad-x / -pad-y</code></td><td className="t-caption">24px / 20px</td><td className="t-caption">Body inner padding</td></tr>
            <tr><td><code className="inline">--rw-modal-action-gap</code></td><td className="t-caption">10px</td><td className="t-caption">Footer button spacing</td></tr>
            <tr><td><code className="inline">--rw-modal-w-&#123;sm…xl&#125;</code></td><td className="t-caption">420–1100px</td><td className="t-caption">Size-variant widths</td></tr>
            <tr><td><code className="inline">--rw-modal-primary</code></td><td className="t-caption">brand-600</td><td className="t-caption">Primary button fill</td></tr>
            <tr><td><code className="inline">--rw-modal-danger</code></td><td className="t-caption">#dc2626</td><td className="t-caption">Destructive button fill</td></tr>
            <tr><td><code className="inline">--rw-modal-focus-ring</code></td><td className="t-caption">3px brand ring</td><td className="t-caption">Keyboard focus indicator</td></tr>
            <tr><td><code className="inline">--rw-modal-motion</code></td><td className="t-caption">140ms</td><td className="t-caption">Open / close duration</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* ====== ACCESSIBILITY ====== */}
    <div className="subsection">
      <h3 className="subsection-title">Built-in accessibility</h3>
      <p className="subsection-desc">WCAG-aligned behavior ships with the component so consumers never re-implement it per modal.</p>
      <div className="grid-2">
        <div className="callout"><strong>Roles &amp; naming.</strong> Overlay carries <code className="inline">role="dialog"</code> + <code className="inline">aria-modal="true"</code>, with <code className="inline">aria-labelledby</code> bound to the title (or <code className="inline">aria-label</code>).</div>
        <div className="callout"><strong>Focus trap.</strong> <kbd className="ms-kbd">Tab</kbd> / <kbd className="ms-kbd">Shift+Tab</kbd> cycle within the dialog; a <code className="inline">focusin</code> guard recovers escaped focus.</div>
        <div className="callout"><strong>Return focus.</strong> The trigger element is refocused on close, keyboard users never lose their place.</div>
        <div className="callout"><strong>Dismissal &amp; lock.</strong> <kbd className="ms-kbd">Esc</kbd> closes; background scroll is locked and nested modals are reference-counted.</div>
        <div className="callout"><strong>Visible focus.</strong> All controls expose a <code className="inline">:focus-visible</code> ring: never <code className="inline">outline:none</code> without a replacement.</div>
        <div className="callout"><strong>Reduced motion.</strong> Rise / fade animations collapse under <code className="inline">prefers-reduced-motion</code>.</div>
      </div>
    </div>

    {/* ====== USAGE ====== */}
    <div className="subsection">
      <h3 className="subsection-title">Usage</h3>
      <p className="subsection-desc">Link the two files, then call the high-level API or compose the slots by hand.</p>

      <h4 className="t-h4" style={{ margin: "8px 0 8px" }}>Install</h4>
      <pre className="code">{`<link rel="stylesheet" href="components/rw-modal.css">
<script src="components/rw-modal.js"></script>`}</pre>

      <h4 className="t-h4" style={{ margin: "24px 0 8px" }}>High-level: open() with slots</h4>
      <pre className="code">{`const modal = RWModal.open({
  size: 'md',
  title: 'Add a new Port',
  closeOnOverlayClick: false,          // form has unsaved input
  initialFocus: '#field-name',
  body: (el) => { el.appendChild(buildPortForm()); },
  footer: [
    { label: 'Cancel', variant: 'secondary', closeOnClick: true },
    { label: 'Save', variant: 'primary', onClick: (m) => {
        if (!m.query('#field-name').value) return false;  // keep open
        save(); m.close();
    }},
  ],
});`}</pre>

      <h4 className="t-h4" style={{ margin: "24px 0 8px" }}>Low-level: compose the sub-components</h4>
      <pre className="code">{`const P = RWModal.parts;
const overlay   = P.Overlay({ labelledby: 'm-title' });
const container = P.Container({ size: 'lg' });
container.appendChild(P.Header({ title: 'Settings', titleId: 'm-title' }));
container.appendChild(P.Body(myContentNode));
container.appendChild(P.Footer([{ label: 'Done', variant: 'primary', onClick: (m) => m.close() }]));
overlay.appendChild(container);
RWModal.mount(overlay, { closeOnOverlayClick: true, closeOnEsc: true });`}</pre>

      <h4 className="t-h4" style={{ margin: "24px 0 8px" }}>Promise-based confirm + re-theme</h4>
      <pre className="code">{`const ok = await RWModal.confirm({ title: 'Delete?', message: 'Cannot be undone.', danger: true });

:root { --rw-modal-radius: 8px; --rw-modal-primary: #0f766e; --rw-modal-w-md: 560px; }`}</pre>
    </div>

    <style>{`
      .ms-kbd { font-family: var(--font-mono); font-size: 11px; line-height: 1; padding: 2px 4px; border-radius: 4px;
        background: var(--slate-100); border: 1px solid var(--border-default); border-bottom-width: 2px; color: var(--text-secondary); }
      .ms-demo-row { display: flex; flex-wrap: wrap; gap: 28px; }
      .ms-demo-grp { display: flex; flex-direction: column; gap: 8px; }
    `}</style>
  </>
);

Object.assign(window, { ModalSpec });
