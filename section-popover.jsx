/* Section: Popovers (full specification)
   Own chapter, split out of Overlays. Developer-oriented: anatomy,
   variants, placement, focus & dismissal, API, markup, a11y, edge cases.
   Live demos use the real .ds-popover CSS so docs and component can't drift. */

/* ── Live popover: click to open, outside-click + ESC to close,
      focus moves in and returns to the trigger on close. ── */
const DemoPopover = ({
  placement = "bottom", size, noArrow, render, children, width,
}) => {
  const [state, setState] = React.useState("closed");
  const [mounted, setMounted] = React.useState(false);
  const wrapRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const exitT = React.useRef(null);

  const open = () => {
    clearTimeout(exitT.current);
    setMounted(true);
    requestAnimationFrame(() => setState("open"));
  };
  const close = (returnFocus = true) => {
    setState("closed");
    exitT.current = setTimeout(() => setMounted(false), 200);
    if (returnFocus && triggerRef.current) triggerRef.current.focus();
  };
  const toggle = () => (mounted && state === "open" ? close() : open());

  // Move focus into the panel once it is open
  React.useEffect(() => {
    if (state !== "open" || !panelRef.current) return;
    const first = panelRef.current.querySelector(
      'input, select, textarea, button, [href], [tabindex]:not([tabindex="-1"])'
    );
    (first || panelRef.current).focus({ preventScroll: true });
  }, [state]);

  // Outside click + ESC
  React.useEffect(() => {
    if (!mounted) return;
    const onDown = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) close(false); };
    const onKey = (e) => { if (e.key === "Escape") { e.stopPropagation(); close(); } };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      clearTimeout(exitT.current);
    };
  }, [mounted]);

  const pos = {
    top:    { bottom: "calc(100% + var(--popover-offset))", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + var(--popover-offset))", left: "50%", transform: "translateX(-50%)" },
    left:   { right: "calc(100% + var(--popover-offset))", top: "50%", transform: "translateY(-50%)" },
    right:  { left: "calc(100% + var(--popover-offset))", top: "50%", transform: "translateY(-50%)" },
  }[placement];

  const id = React.useMemo(() => "pop-" + Math.random().toString(36).slice(2, 8), []);
  const isOpen = mounted && state === "open";

  return (
    <span className="ds-popover-anchor" ref={wrapRef}>
      {React.cloneElement(children, {
        ref: triggerRef,
        onClick: toggle,
        "aria-expanded": isOpen,
        "aria-haspopup": "dialog",
        "aria-controls": mounted ? id : undefined,
      })}
      {mounted && (
        <div
          id={id} ref={panelRef} role="dialog" aria-modal="false" tabIndex={-1}
          data-state={state}
          className={`ds-popover ds-popover--${placement}${size ? ` ds-popover--${size}` : ""}${noArrow ? " ds-popover--no-arrow" : ""}`}
          style={{ ...pos, ...(width ? { width } : null), textAlign: "left" }}
        >
          {render(close)}
        </div>
      )}
    </span>
  );
};

const PopRow = ({ children, pad = "40px 24px" }) => (
  <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "center", justifyContent: "center", padding: pad }}>{children}</div>
);

/* Demo bodies */
const FilterPopBody = (close) => (
  <>
    <div className="ds-popover-head">
      <div style={{ flex: 1 }}>
        <h4 className="ds-popover-title">Filter vessels</h4>
        <p className="ds-popover-desc">Applies to the current result set.</p>
      </div>
      <button className="ds-popover-close" aria-label="Close" onClick={() => close()}><Icon d={I.x} size={14} /></button>
    </div>
    <div className="ds-popover-body">
      <div className="ds-field" style={{ gap: 4 }}>
        <label className="ds-field-label" style={{ fontSize: 11 }}>Risk grade</label>
        <select className="ds-input ds-select" style={{ height: 30, fontSize: 12 }}><option>All grades</option><option>A: low</option><option>D: high</option></select>
      </div>
      <div className="ds-field" style={{ gap: 4 }}>
        <label className="ds-field-label" style={{ fontSize: 11 }}>Flag state</label>
        <select className="ds-input ds-select" style={{ height: 30, fontSize: 12 }}><option>Any</option><option>Panama</option><option>Liberia</option></select>
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--text-secondary)" }}>
        <input type="checkbox" defaultChecked /> AIS signal live only
      </label>
    </div>
    <div className="ds-popover-foot ds-popover-foot--split">
      <button className="ds-btn ds-btn--ghost ds-btn--sm" onClick={() => close()}>Reset</button>
      <button className="ds-btn ds-btn--primary ds-btn--sm" onClick={() => close()}>Apply</button>
    </div>
  </>
);

const MenuPopBody = (close) => (
  <div className="ds-popover-menu">
    <button className="ds-popover-item" onClick={() => close()}><Icon d={I.eye} size={14} /> Open report</button>
    <button className="ds-popover-item" onClick={() => close()}><Icon d={I.download} size={14} /> Export CSV</button>
    <button className="ds-popover-item" onClick={() => close()}><Icon d={I.edit} size={14} /> Copy IMO</button>
    <div className="ds-popover-sep" />
    <button className="ds-popover-item ds-popover-item--danger" onClick={() => close()}><Icon d={I.trash} size={14} /> Remove from portfolio</button>
  </div>
);

const InfoPopBody = (close) => (
  <>
    <div className="ds-popover-head">
      <div style={{ flex: 1 }}>
        <h4 className="ds-popover-title">How risk grade is calculated</h4>
      </div>
    </div>
    <div className="ds-popover-body" style={{ paddingTop: 8 }}>
      <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        A weighted blend of casualty history, detention record, flag performance and ownership sanctions exposure,
        refreshed nightly.
      </p>
      <a href="#c-popover" className="t-caption" style={{ fontWeight: 600 }} onClick={() => close()}>Read the methodology →</a>
    </div>
  </>
);

const ConfirmPopBody = (close) => (
  <>
    <div className="ds-popover-body">
      <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55 }}>
        <strong>Remove 3 vessels</strong> from “North Sea Hull 2026”? They stay in other portfolios.
      </p>
    </div>
    <div className="ds-popover-foot">
      <button className="ds-btn ds-btn--ghost ds-btn--sm" onClick={() => close()}>Cancel</button>
      <button className="ds-btn ds-btn--danger ds-btn--sm" onClick={() => close()}>Remove</button>
    </div>
  </>
);

const PopoverSpec = () => (
  <>
    {/* Anatomy */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Anatomy</span><span className="ord">01</span></h3>
      <p className="subsection-desc">
        A popover is an <strong>interactive, non-modal overlay</strong> anchored to the control that opened it. It holds
        real content: fields, actions, links, and the page behind it stays live. It is opened by <strong>click, never
        hover</strong>, which is the line between it and a <a href="#c-tooltip">Tooltip</a>. If the user must resolve it
        before continuing, it is a <a href="#c-modal">Modal</a> instead.
      </p>
      <div className="panel">
        <div className="panel-head"><h4>Live: click a trigger</h4><span className="meta">real .ds-popover · ESC and outside-click close</span></div>
        <div className="panel-body" style={{ background: "var(--bg-app)" }}>
          <PopRow>
            <DemoPopover render={FilterPopBody}>
              <button className="ds-btn ds-btn--secondary"><Icon d={I.filter} /> Filters</button>
            </DemoPopover>
            <DemoPopover size="sm" render={MenuPopBody} noArrow>
              <button className="ds-btn ds-btn--secondary ds-btn--icon" aria-label="Row actions"><Icon d={I.more} /></button>
            </DemoPopover>
            <DemoPopover size="sm" placement="right" render={InfoPopBody}>
              <button className="ds-btn ds-btn--ghost ds-btn--icon" aria-label="About risk grade"><Icon d={I.info} /></button>
            </DemoPopover>
            <DemoPopover size="sm" placement="top" render={ConfirmPopBody}>
              <button className="ds-btn ds-btn--danger ds-btn--sm">Remove selected</button>
            </DemoPopover>
          </PopRow>
        </div>
        <table className="spec-table" style={{ border: 0, borderRadius: 0, borderTop: "1px solid var(--border-subtle)" }}>
          <thead><tr><th style={{ width: 170 }}>Region</th><th>Spec</th></tr></thead>
          <tbody>
            <tr><td><code className="inline">.ds-popover</code></td><td className="t-caption"><code className="inline">--bg-raised</code> fill, 1px <code className="inline">--border-default</code>, <code className="inline">--radius-lg</code>, <code className="inline">--card-shadow-raised</code>. Border <em>and</em> shadow: the border separates it from the page, the shadow lifts it.</td></tr>
            <tr><td><code className="inline">-head</code></td><td className="t-caption">Optional. 13.5px display-font title, optional 12px description, optional close button. Omit for menus and single-purpose panels.</td></tr>
            <tr><td><code className="inline">-body</code></td><td className="t-caption">Required. 14px padding, 10px flex gap, scrolls at <code className="inline">--popover-max-height: 420px</code> with <code className="inline">overscroll-behavior: contain</code>.</td></tr>
            <tr><td><code className="inline">-foot</code></td><td className="t-caption">Optional. Sunken bar, right-aligned actions; <code className="inline">--split</code> pushes a tertiary action (Reset) to the left.</td></tr>
            <tr><td><code className="inline">-menu / -item</code></td><td className="t-caption">Action-list variant: 6px padding, 7×9px rows, <code className="inline">--danger</code> modifier, <code className="inline">-sep</code> divider.</td></tr>
            <tr><td>Arrow</td><td className="t-caption">12px rotated square, border-matched on the two exposed edges so it reads as part of the panel outline. Suppressed via <code className="inline">--no-arrow</code> for menus.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Variants */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Variants &amp; sizes</span><span className="ord">02</span></h3>
      <table className="spec-table">
        <thead><tr><th style={{ width: 150 }}>Variant</th><th style={{ width: 110 }}>Width</th><th>Use</th></tr></thead>
        <tbody>
          <tr><td><strong>Form</strong></td><td><code className="inline">--md</code> 300px</td><td className="t-caption">Filters, quick-edit, column settings. Always has a footer with an explicit Apply, never auto-apply on change, the user cannot see the result behind the panel.</td></tr>
          <tr><td><strong>Menu</strong></td><td><code className="inline">--sm</code> 240px</td><td className="t-caption">Row actions, overflow menus. No header, no footer, no arrow. Closes on selection.</td></tr>
          <tr><td><strong>Info</strong></td><td><code className="inline">--sm</code> 240px</td><td className="t-caption">Definitions and methodology that are too long or too interactive for a tooltip. Contains links.</td></tr>
          <tr><td><strong>Confirm</strong></td><td><code className="inline">--sm</code> 240px</td><td className="t-caption">Low-stakes, reversible confirmation next to the trigger. Destructive <em>and</em> irreversible belongs in a Modal.</td></tr>
          <tr><td><strong>Rich</strong></td><td><code className="inline">--lg</code> 380px</td><td className="t-caption">Entity preview cards (vessel, port, company) on hover-intent or click from a table cell.</td></tr>
          <tr><td><strong>Auto</strong></td><td><code className="inline">--auto</code></td><td className="t-caption">Width hugs content. Only for short menus; never for anything with wrapping text.</td></tr>
        </tbody>
      </table>
    </div>

    {/* Placement */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Placement &amp; collision</span><span className="ord">03</span></h3>
      <p className="subsection-desc">
        <code className="inline">bottom</code> is the default; it follows the reading direction and keeps the trigger
        visible. The engine flips to the opposite side when there is not enough room, then shifts along the cross-axis to
        stay in the viewport with 16px padding.
      </p>
      <div className="panel">
        <div className="panel-body" style={{ background: "var(--bg-app)" }}>
          <PopRow pad="56px 24px">
            {["top", "bottom", "left", "right"].map(p => (
              <DemoPopover key={p} placement={p} size="sm" render={(close) => (
                <div className="ds-popover-body">
                  <p style={{ margin: 0, fontSize: 12.5 }}>Placement: <strong>{p}</strong></p>
                  <button className="ds-btn ds-btn--secondary ds-btn--sm" onClick={() => close()}>Close</button>
                </div>
              )}>
                <button className="ds-btn ds-btn--secondary" style={{ minWidth: 92 }}>{p}</button>
              </DemoPopover>
            ))}
          </PopRow>
        </div>
      </div>
      <table className="spec-table" style={{ marginTop: 16 }}>
        <thead><tr><th style={{ width: 170 }}>Rule</th><th>Behaviour</th></tr></thead>
        <tbody>
          <tr><td><strong>Default</strong></td><td className="t-caption"><code className="inline">bottom</code>, centre-aligned. Use <code className="inline">bottom-start</code> alignment for menus so the panel edge lines up with the trigger edge.</td></tr>
          <tr><td><strong>Flip</strong></td><td className="t-caption">Flip to the opposite side before shrinking. A popover never resizes to fit; it repositions.</td></tr>
          <tr><td><strong>Shift &amp; arrow</strong></td><td className="t-caption">After shifting, the arrow tracks the trigger centre until 14px from the panel corner, then stops.</td></tr>
          <tr><td><strong>Reposition</strong></td><td className="t-caption">Recompute on scroll and resize while open (rAF-throttled). Unlike a tooltip, a popover follows its trigger rather than closing.</td></tr>
          <tr><td><strong>Detached trigger</strong></td><td className="t-caption">If the trigger scrolls fully out of its scroll container, close the popover, an anchored panel pointing off-screen is disorienting.</td></tr>
          <tr><td><strong>Stacking</strong></td><td className="t-caption"><code className="inline">--z-popover: 1050</code>. Above the page and sticky chrome, below modal (1100) so a modal launched from a popover covers it.</td></tr>
          <tr><td><strong>Portal</strong></td><td className="t-caption">Render into <code className="inline">document.body</code> so table cells and cards with <code className="inline">overflow: hidden</code> cannot clip the panel.</td></tr>
        </tbody>
      </table>
    </div>

    {/* Focus & dismissal */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Focus &amp; dismissal</span><span className="ord">04</span></h3>
      <p className="subsection-desc">
        This is the part teams get wrong most often. A popover is <strong>non-modal</strong>: focus moves into it, but it
        is not trapped, and the page behind remains interactive.
      </p>
      <div className="grid-2" style={{ gap: 16 }}>
        <div className="panel">
          <div className="panel-head"><h4>Focus model</h4></div>
          <div style={{ padding: 16, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>On open, focus moves to the <strong>first focusable element</strong>, or the panel itself (<code className="inline">tabIndex={-1}</code>) if it has none.</li>
              <li>Focus is <strong>not trapped</strong>. Tabbing past the last element moves to the next element after the trigger in DOM order, and closes the panel.</li>
              <li>On close, focus <strong>returns to the trigger</strong>, except when the panel was dismissed by an outside click, where the user has already moved elsewhere.</li>
              <li>Menus support <kbd className="ms-kbd">↑</kbd><kbd className="ms-kbd">↓</kbd> roving focus, <kbd className="ms-kbd">Home</kbd>/<kbd className="ms-kbd">End</kbd>, and type-ahead.</li>
            </ul>
          </div>
        </div>
        <div className="panel">
          <div className="panel-head"><h4>Close triggers</h4></div>
          <table className="spec-table" style={{ border: 0, borderRadius: 0 }}>
            <tbody>
              <tr><td style={{ width: 130 }}><kbd className="ms-kbd">Esc</kbd></td><td className="t-caption">Closes, returns focus. Stops propagation so a parent modal stays open.</td></tr>
              <tr><td>Outside click</td><td className="t-caption">Closes on <code className="inline">mousedown</code>, not click, so a drag that starts inside and ends outside doesn't dismiss.</td></tr>
              <tr><td>Trigger click</td><td className="t-caption">Toggles closed.</td></tr>
              <tr><td>Selection</td><td className="t-caption">Menu items close on activate; form fields do not.</td></tr>
              <tr><td>Submit / Cancel</td><td className="t-caption">Footer actions close explicitly.</td></tr>
              <tr><td>Route change</td><td className="t-caption">Always close on navigation.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="callout warn" style={{ marginTop: 12 }}>
        <strong>Never auto-apply a form popover on change.</strong> The panel covers the very result the change affects.
        Stage the changes and commit on <em>Apply</em>, and keep <em>Reset</em> visible so the user can always get back.
      </div>
    </div>

    {/* API */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Developer API</span><span className="ord">05</span></h3>
      <pre className="code">{`import { Popover } from '@skytek/ui';

interface PopoverProps {
  /** Panel content. Receives close() so actions can dismiss. */
  children: React.ReactNode | ((close: () => void) => React.ReactNode);
  /** The anchor. Must forward a ref and spread props. */
  trigger: React.ReactElement;

  /** Preferred side; flips on collision. @default 'bottom' */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Cross-axis alignment against the trigger. @default 'center' */
  align?: 'start' | 'center' | 'end';
  /** @default 'md' (300px) */
  size?: 'sm' | 'md' | 'lg' | 'auto';
  /** Gap between trigger and panel, px. @default 8 */
  offset?: number;
  hideArrow?: boolean;

  /** Controlled mode, omit both for uncontrolled. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  /** Dismissal escape hatches. Both default true. */
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  /** Return focus to the trigger on close. @default true */
  returnFocus?: boolean;
  /** Where to portal. @default document.body */
  container?: HTMLElement;
  /** Fires after the exit transition completes. */
  onCloseComplete?: () => void;
}

// Uncontrolled: the common case
<Popover
  trigger={<Button variant="secondary" icon={<FilterIcon />}>Filters</Button>}
>
  {(close) => (
    <>
      <Popover.Header title="Filter vessels" description="Applies to the current result set." />
      <Popover.Body>
        <Select label="Risk grade" options={grades} />
      </Popover.Body>
      <Popover.Footer split>
        <Button variant="ghost" size="sm" onClick={reset}>Reset</Button>
        <Button variant="primary" size="sm" onClick={() => { apply(); close(); }}>Apply</Button>
      </Popover.Footer>
    </>
  )}
</Popover>

// Menu variant: no header/footer/arrow, closes on select
<Popover size="sm" hideArrow align="end"
         trigger={<IconButton aria-label="Row actions" icon={<MoreIcon />} />}>
  <Popover.Menu>
    <Popover.Item icon={<EyeIcon />} onSelect={openReport}>Open report</Popover.Item>
    <Popover.Item icon={<DownloadIcon />} onSelect={exportCsv}>Export CSV</Popover.Item>
    <Popover.Separator />
    <Popover.Item danger icon={<TrashIcon />} onSelect={remove}>Remove</Popover.Item>
  </Popover.Menu>
</Popover>`}</pre>
    </div>

    {/* Markup contract */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Markup &amp; CSS contract</span><span className="ord">06</span></h3>
      <pre className="code">{`<!-- Trigger: aria-expanded reflects state, aria-controls points at the panel -->
<button aria-haspopup="dialog" aria-expanded="true" aria-controls="pop-filters">
  Filters
</button>

<!-- aria-modal="false", the page behind is NOT inert -->
<div id="pop-filters" role="dialog" aria-modal="false"
     aria-labelledby="pop-filters-title" tabindex="-1"
     class="ds-popover ds-popover--bottom" data-state="open">

  <div class="ds-popover-head">
    <h4 class="ds-popover-title" id="pop-filters-title">Filter vessels</h4>
    <button class="ds-popover-close" aria-label="Close">…</button>
  </div>
  <div class="ds-popover-body">…</div>
  <div class="ds-popover-foot ds-popover-foot--split">…</div>
</div>`}</pre>
      <table className="spec-table" style={{ marginTop: 16 }}>
        <thead><tr><th style={{ width: 230 }}>Class / attribute</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td><code className="inline">.ds-popover</code></td><td className="t-caption">Base panel. <code className="inline">position: absolute</code>; you supply coordinates.</td></tr>
          <tr><td><code className="inline">--sm / --md / --lg / --auto</code></td><td className="t-caption">Width. Default is <code className="inline">md</code>.</td></tr>
          <tr><td><code className="inline">--top / --bottom / --left / --right</code></td><td className="t-caption">Arrow edge and enter-travel direction.</td></tr>
          <tr><td><code className="inline">--no-arrow</code></td><td className="t-caption">Removes the arrow: menus and edge-aligned panels.</td></tr>
          <tr><td><code className="inline">data-state="open|closed"</code></td><td className="t-caption">Drives opacity + 4px travel + 0.98 scale. Mount <code className="inline">closed</code>, flip to <code className="inline">open</code> next frame.</td></tr>
          <tr><td><code className="inline">role="dialog"</code> + <code className="inline">aria-modal="false"</code></td><td className="t-caption">Required. Use <code className="inline">role="menu"</code> with <code className="inline">menuitem</code> children for the menu variant instead.</td></tr>
          <tr><td><code className="inline">.ds-popover-anchor</code></td><td className="t-caption">Optional relative wrapper for simple, non-portalled cases.</td></tr>
        </tbody>
      </table>
    </div>

    {/* Accessibility */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Accessibility</span><span className="ord">07</span></h3>
      <table className="spec-table">
        <thead><tr><th style={{ width: 190 }}>Requirement</th><th>Implementation</th></tr></thead>
        <tbody>
          <tr><td><strong>Trigger state</strong></td><td className="t-caption"><code className="inline">aria-expanded</code> must reflect open state, and <code className="inline">aria-haspopup="dialog"</code> (or <code className="inline">"menu"</code>) announces what will open.</td></tr>
          <tr><td><strong>Labelled panel</strong></td><td className="t-caption"><code className="inline">aria-labelledby</code> pointing at the title, or <code className="inline">aria-label</code> when there is no visible header.</td></tr>
          <tr><td><strong>Not modal</strong></td><td className="t-caption"><code className="inline">aria-modal="false"</code> and no <code className="inline">inert</code> on the background. Falsely claiming modality makes screen readers hide the rest of the page.</td></tr>
          <tr><td><strong>Dismissible</strong></td><td className="t-caption"><kbd className="ms-kbd">Esc</kbd> closes from anywhere inside: WCAG 2.2 <em>1.4.13</em>.</td></tr>
          <tr><td><strong>Focus return</strong></td><td className="t-caption">Returning focus to the trigger keeps keyboard users in place, WCAG <em>2.4.3 Focus Order</em>.</td></tr>
          <tr><td><strong>Target size</strong></td><td className="t-caption">Menu rows are ≥ 32px tall; the close button is 24px visually with a 44px touch target via padding, WCAG 2.2 <em>2.5.8</em>.</td></tr>
          <tr><td><strong>Scroll containment</strong></td><td className="t-caption"><code className="inline">overscroll-behavior: contain</code> stops a scrolled panel from chaining into the page.</td></tr>
          <tr><td><strong>Reduced motion</strong></td><td className="t-caption">Transition drops to 1ms and the travel/scale is removed.</td></tr>
          <tr><td><strong>Contrast</strong></td><td className="t-caption">The panel border carries the edge; the shadow adds lift.</td></tr>
        </tbody>
      </table>
    </div>

    {/* Choosing */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Popover, or something else?</span><span className="ord">08</span></h3>
      <table className="spec-table">
        <thead><tr><th style={{ width: 150 }}>Use</th><th style={{ width: 240 }}>When</th><th>Why not a popover</th></tr></thead>
        <tbody>
          <tr><td><strong>Popover</strong></td><td className="t-caption">Optional, contextual, interactive content anchored to a control.</td><td className="t-caption">—</td></tr>
          <tr><td><strong>Tooltip</strong></td><td className="t-caption">A short label for an icon or truncated text.</td><td className="t-caption">A popover needs a click; a label should cost nothing.</td></tr>
          <tr><td><strong>Modal</strong></td><td className="t-caption">A decision that must be resolved, or a destructive irreversible action.</td><td className="t-caption">Popovers are dismissible by clicking anywhere, too easy to lose.</td></tr>
          <tr><td><strong>Drawer</strong></td><td className="t-caption">Long forms, detail panels, anything needing sustained work.</td><td className="t-caption">Above ~420px of content the popover scrolls and feels cramped.</td></tr>
          <tr><td><strong>Inline expand</strong></td><td className="t-caption">Content that should stay open while the user works elsewhere.</td><td className="t-caption">Popovers close on outside interaction by design.</td></tr>
          <tr><td><strong>Select / Combobox</strong></td><td className="t-caption">Choosing one value from a list.</td><td className="t-caption">Use the native-semantics component; it has correct listbox roles.</td></tr>
        </tbody>
      </table>
    </div>

    {/* Edge cases */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Edge cases</span><span className="ord">09</span></h3>
      <table className="spec-table">
        <thead><tr><th style={{ width: 230 }}>Case</th><th>Expected behaviour</th></tr></thead>
        <tbody>
          <tr><td>Nested popovers</td><td className="t-caption">Allowed one level. <kbd className="ms-kbd">Esc</kbd> closes only the innermost; outside-click closes the whole chain.</td></tr>
          <tr><td>Popover inside a modal</td><td className="t-caption">Portals to the modal's container, not body, so the focus trap still contains it. Sits above the modal's own content.</td></tr>
          <tr><td>Opens a modal</td><td className="t-caption">Close the popover first, then open the modal, so focus return does not fight the trap.</td></tr>
          <tr><td>Tooltip on a trigger</td><td className="t-caption">The tooltip closes as soon as the popover opens; do not show both.</td></tr>
          <tr><td>Content taller than 420px</td><td className="t-caption">Body scrolls with the header and footer pinned. Past two screens of scrolling, use a Drawer.</td></tr>
          <tr><td>Trigger unmounts while open</td><td className="t-caption">Close immediately with no exit animation and return focus to the nearest stable ancestor.</td></tr>
          <tr><td>Narrow viewport (&lt; 480px)</td><td className="t-caption">Form and rich popovers promote to a bottom sheet; menus stay anchored.</td></tr>
          <tr><td>Unsaved changes</td><td className="t-caption">Outside-click on a dirty form popover keeps it open and flashes the footer rather than silently discarding.</td></tr>
        </tbody>
      </table>
    </div>

    {/* Do / Don't */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Do &amp; don't</span><span className="ord">10</span></h3>
      <div className="grid-2" style={{ gap: 16 }}>
        <div className="panel" style={{ borderTop: "3px solid var(--success-500)" }}>
          <div className="panel-head"><h4 style={{ color: "var(--success-700)" }}>✓ Do</h4></div>
          <div style={{ padding: 16 }}>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>
              <li>Open on click, and toggle closed on the same trigger.</li>
              <li>Commit form popovers with an explicit <em>Apply</em>.</li>
              <li>Portal out of clipped or scrolling containers.</li>
              <li>Return focus to the trigger on Esc and on Cancel.</li>
              <li>Keep content to one task, one panel, one job.</li>
            </ul>
          </div>
        </div>
        <div className="panel" style={{ borderTop: "3px solid var(--danger-500)" }}>
          <div className="panel-head"><h4 style={{ color: "var(--danger-700)" }}>✗ Don't</h4></div>
          <div style={{ padding: 16 }}>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>
              <li>Open on hover, or trap focus inside.</li>
              <li>Use one for an irreversible destructive action.</li>
              <li>Set <code className="inline">aria-modal="true"</code> on a non-modal panel.</li>
              <li>Nest more than one level deep.</li>
              <li>Put a multi-step flow or long form in one, use a Drawer.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* Tokens */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Tokens</span><span className="ord">11</span></h3>
      <div className="panel">
        {[
          ["--popover-bg", "var(--bg-raised)", "Panel fill: one step above the page"],
          ["--popover-border", "var(--border-default)", "Edge; carries separation from the page"],
          ["--popover-radius", "var(--radius-lg)", "Corner radius"],
          ["--popover-shadow", "var(--card-shadow-raised)", "Elevation"],
          ["--popover-pad", "14px", "Head / body / foot padding"],
          ["--popover-gap", "10px", "Body flex gap"],
          ["--popover-width-sm", "240px", "Menu, info, confirm"],
          ["--popover-width-md", "300px", "Default: forms"],
          ["--popover-width-lg", "380px", "Rich preview cards"],
          ["--popover-max-height", "420px", "Body scroll threshold"],
          ["--popover-arrow", "6px", "Half the arrow square"],
          ["--popover-offset", "8px", "Gap from trigger"],
          ["--popover-motion", "var(--motion-fast)", "Transition duration"],
          ["--popover-ease", "var(--ease-emphasis)", "Enter easing"],
          ["--z-popover", "1050", "Above page, below modal"],
        ].map(([t, v, r]) => (
          <div key={t} className="token-row" style={{ gridTemplateColumns: "230px 210px 1fr" }}>
            <code>{t}</code>
            <span className="t-mono" style={{ color: "var(--brand-600)", fontSize: 11 }}>{v}</span>
            <span className="t-caption">{r}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="callout">
      <strong>The popover test:</strong> if the user could reasonably want to see the page <em>while</em> the panel is open,
      a popover is right. If they must answer it first, it is a modal. If they need to keep it open while working, it is
      not an overlay at all.
    </div>
  </>
);

window.PopoverSpec = PopoverSpec;
