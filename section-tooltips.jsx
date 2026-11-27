/* Section: Tooltips (full specification)
   Own chapter, split out of Overlays. Developer-oriented: anatomy,
   placement, timing, API, a11y, edge cases. Live demos use the real
   .ds-tooltip CSS so the docs and the component cannot drift. */

/* ── Live tooltip: hover + focus, delay group, ESC, collision-free ── */
const DemoTooltip = ({
  label, placement = "top", rich, kbd, children,
  delayIn = 400, delayOut = 100, disabled,
}) => {
  const [state, setState] = React.useState("closed");
  const [mounted, setMounted] = React.useState(false);
  const inT = React.useRef(null), outT = React.useRef(null);

  const clear = () => { clearTimeout(inT.current); clearTimeout(outT.current); };
  const open = () => {
    if (disabled) return;
    clear();
    inT.current = setTimeout(() => { setMounted(true); requestAnimationFrame(() => setState("open")); }, delayIn);
  };
  const close = () => {
    clear();
    setState("closed");
    outT.current = setTimeout(() => setMounted(false), delayOut + 120);
  };
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); clear(); };
  }, []);

  const pos = {
    top:    { bottom: "calc(100% + var(--tooltip-offset))", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + var(--tooltip-offset))", left: "50%", transform: "translateX(-50%)" },
    left:   { right: "calc(100% + var(--tooltip-offset))", top: "50%", transform: "translateY(-50%)" },
    right:  { left: "calc(100% + var(--tooltip-offset))", top: "50%", transform: "translateY(-50%)" },
  }[placement];

  const id = React.useMemo(() => "tip-" + Math.random().toString(36).slice(2, 8), []);

  return (
    <span
      className="ds-tooltip-anchor"
      onMouseEnter={open} onMouseLeave={close}
      onFocus={open} onBlur={close}
    >
      {React.cloneElement(children, { "aria-describedby": mounted ? id : undefined })}
      {mounted && (
        <span
          id={id} role="tooltip" data-state={state}
          className={`ds-tooltip ds-tooltip--${placement}${rich ? " ds-tooltip--rich" : ""}`}
          style={pos}
        >
          {rich ? <><span className="ds-tooltip-title">{rich}</span>{label}</> : label}
          {kbd && <kbd className="ds-tooltip-kbd">{kbd}</kbd>}
        </span>
      )}
    </span>
  );
};

const TipRow = ({ children }) => (
  <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "center", justifyContent: "center", padding: "36px 24px" }}>{children}</div>
);

const TooltipSpec = () => (
  <>
    {/* Anatomy + live */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Anatomy</span><span className="ord">01</span></h3>
      <p className="subsection-desc">
        A tooltip is a <strong>label-only, non-interactive overlay</strong> that names or clarifies the element under the
        pointer or keyboard focus. It never contains controls, links or anything the user must click; that is a
        <a href="#c-overlays"> Popover</a>. It is never the only place critical information lives.
      </p>
      <div className="panel">
        <div className="panel-head"><h4>Live: hover or <kbd className="ms-kbd">Tab</kbd> to the triggers</h4><span className="meta">real .ds-tooltip · 400 ms open delay</span></div>
        <div className="panel-body" style={{ background: "var(--bg-app)" }}>
          <TipRow>
            <DemoTooltip label="Risk score updated 4m ago">
              <button className="ds-btn ds-btn--secondary"><Icon d={I.info} /> Label tip</button>
            </DemoTooltip>
            <DemoTooltip label="Search vessels, ports and policies" kbd="⌘K">
              <button className="ds-btn ds-btn--secondary ds-btn--icon" aria-label="Search"><Icon d={I.search} /></button>
            </DemoTooltip>
            <DemoTooltip rich="Sanctions unverified" label="The registry did not return an owner record. Re-run the check before issuing cover." placement="bottom">
              <button className="ds-btn ds-btn--ghost"><Icon d={I.warn} /> Rich tip</button>
            </DemoTooltip>
            <DemoTooltip label="You do not have permission to delete portfolios" placement="right">
              <span><button className="ds-btn ds-btn--danger" disabled>Delete</button></span>
            </DemoTooltip>
          </TipRow>
        </div>
        <table className="spec-table" style={{ border: 0, borderRadius: 0, borderTop: "1px solid var(--border-subtle)" }}>
          <thead><tr><th style={{ width: 150 }}>Part</th><th>Spec</th></tr></thead>
          <tbody>
            <tr><td><strong>Container</strong></td><td className="t-caption"><code className="inline">--bg-inverse</code> fill, <code className="inline">--radius-sm</code>, <code className="inline">--shadow-md</code>, <code className="inline">6px 8px</code> padding, <code className="inline">max-width 240px</code>.</td></tr>
            <tr><td><strong>Label</strong></td><td className="t-caption">12px / 1.45, weight 500, white on inverse. Sentence case, no terminal period on fragments.</td></tr>
            <tr><td><strong>Arrow</strong></td><td className="t-caption">10px rotated square inheriting the container fill. Centered on the trigger edge. Suppressed with <code className="inline">.ds-tooltip--no-arrow</code> when the anchor is a dense icon row.</td></tr>
            <tr><td><strong>Offset</strong></td><td className="t-caption"><code className="inline">--tooltip-offset: 8px</code> between trigger edge and tip body.</td></tr>
            <tr><td><strong>Kbd chip</strong></td><td className="t-caption">Optional <code className="inline">.ds-tooltip-kbd</code> for the shortcut that fires the same action.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Placement */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Placement &amp; collision</span><span className="ord">02</span></h3>
      <p className="subsection-desc">
        Four sides, set with <code className="inline">side</code>, plus three cross-axis alignments set with
        <code className="inline">align</code>. <code className="inline">bottom</code> is the default; it follows the reading
        direction and rarely covers the next control. The positioning engine flips to the opposite side when the tip would
        cross the viewport edge, then shifts along the cross-axis to stay in view; the arrow follows the trigger.
      </p>
      <div className="panel">
        <div className="panel-body" style={{ background: "var(--bg-app)" }}>
          <TipRow>
            {["top", "bottom", "left", "right"].map(p => (
              <DemoTooltip key={p} label={`Placement: ${p}`} placement={p} delayIn={120}>
                <button className="ds-btn ds-btn--secondary" style={{ minWidth: 92 }}>{p}</button>
              </DemoTooltip>
            ))}
          </TipRow>
        </div>
      </div>
      <table className="spec-table" style={{ marginTop: 16 }}>
        <thead><tr><th style={{ width: 170 }}>Rule</th><th>Behaviour</th></tr></thead>
        <tbody>
          <tr><td><strong>Default</strong></td><td className="t-caption"><code className="inline">side="bottom"</code>, <code className="inline">align="center"</code>. Use <code className="inline">right</code> for items in a left sidebar, <code className="inline">left</code> for right-aligned toolbars, <code className="inline">top</code> where a dropdown already occupies the space below.</td></tr>
          <tr><td><strong>Alignment</strong></td><td className="t-caption"><code className="inline">align</code> takes <code className="inline">start</code> / <code className="inline">center</code> / <code className="inline">end</code> along the chosen side. Use <code className="inline">start</code> when the trigger sits at the edge of a toolbar, so the tip does not overhang its container.</td></tr>
          <tr><td><strong>Flip</strong></td><td className="t-caption">If the preferred side has insufficient room, flip to the opposite side. Never shrink the tip to fit.</td></tr>
          <tr><td><strong>Shift</strong></td><td className="t-caption">After flipping, translate along the cross-axis so the tip stays fully inside the viewport with an 8px padding. The arrow stays pinned to the trigger centre until it reaches 12px from the tip corner.</td></tr>
          <tr><td><strong>Overflow containers</strong></td><td className="t-caption">Render into a portal at <code className="inline">document.body</code> so the tip is never clipped by <code className="inline">overflow: hidden</code> or a scrolling table cell.</td></tr>
          <tr><td><strong>Stacking</strong></td><td className="t-caption"><code className="inline">--z-tooltip: 1300</code>, above modal (1100) and toast (1200), so a tip on a toast action or dialog control stays readable.</td></tr>
        </tbody>
      </table>
    </div>

    {/* Timing */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Timing &amp; the delay group</span><span className="ord">03</span></h3>
      <p className="subsection-desc">
        Tooltips open on a delay so that sweeping the pointer across a toolbar does not flash a row of tips; once one is
        open, neighbours open instantly until the group goes cold. Keyboard focus always opens immediately, a keyboard
        user has already committed to that element.
      </p>
      <div className="grid-2" style={{ gap: 16 }}>
        <table className="spec-table">
          <thead><tr><th>Token</th><th>Value</th><th>Applies to</th></tr></thead>
          <tbody>
            <tr><td><code className="inline">--tooltip-delay-in</code></td><td>400ms</td><td className="t-caption">Pointer rest before opening</td></tr>
            <tr><td><code className="inline">--tooltip-delay-out</code></td><td>100ms</td><td className="t-caption">Grace period after leaving</td></tr>
            <tr><td><code className="inline">--tooltip-motion</code></td><td>140ms</td><td className="t-caption">Fade + 4px travel</td></tr>
            <tr><td>Group window</td><td>300ms</td><td className="t-caption">Skip-delay between siblings</td></tr>
            <tr><td>Focus open</td><td>0ms</td><td className="t-caption">Keyboard is immediate</td></tr>
            <tr><td>Build default</td><td>0 / 0</td><td className="t-caption">Base UI ships no delay until the provider sets one</td></tr>
          </tbody>
        </table>
        <div className="panel">
          <div className="panel-head"><h4>Open &amp; close triggers</h4></div>
          <div style={{ padding: 16, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li><strong>Opens</strong> on <code className="inline">pointerenter</code> (after delay) and <code className="inline">focus-visible</code> (immediately).</li>
              <li><strong>Closes</strong> on <code className="inline">pointerleave</code>, <code className="inline">blur</code>, <kbd className="ms-kbd">Esc</kbd>, scroll of the nearest scroll container, and on any click of the trigger.</li>
              <li><strong>Click always closes.</strong> The tip has served its purpose the moment the user acts.</li>
              <li><strong>Never opens</strong> on a pointer that is already dragging, or while a modal is animating in.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="callout" style={{ marginTop: 12 }}>
        <strong>Touch devices have no hover.</strong> Tooltips do not open on tap. If the information matters on mobile,
        it belongs in visible help text, a field description, or a Popover opened by an explicit info button.
      </div>
    </div>

    {/* API */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Developer API</span><span className="ord">04</span></h3>
      <p className="subsection-desc">
        The shipped component is a <strong>compound (slot-based) API</strong> built on <code className="inline">@base-ui/react</code>
        (the shadcn Base UI variant), not a single prop-driven element. Four exports:
        <code className="inline">Tooltip</code> · <code className="inline">TooltipTrigger</code> ·
        <code className="inline">TooltipContent</code> · <code className="inline">TooltipProvider</code>.
        Content is arbitrary React: a string, or any node.
      </p>
      <pre className="code">{`import {
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
} from '@skytek/ui';

// Provider wraps the app once and owns the shared delay group.
<TooltipProvider>
  <App />
</TooltipProvider>

// Basic
<Tooltip>
  <TooltipTrigger>
    <IconButton aria-label="Search" icon={<SearchIcon />} />
  </TooltipTrigger>
  <TooltipContent>Search vessels, ports and policies</TooltipContent>
</Tooltip>

// Placement: side + align + sideOffset live on TooltipContent
<Tooltip>
  <TooltipTrigger>Details</TooltipTrigger>
  <TooltipContent side="right" align="start" sideOffset={6}>
    Risk score updated 4m ago
  </TooltipContent>
</Tooltip>

// Rich content: any node, not just a string
<Tooltip>
  <TooltipTrigger>Details</TooltipTrigger>
  <TooltipContent>
    <strong>Vessel status</strong>
    <div>Underway using engine · 12.4 kn</div>
  </TooltipContent>
</Tooltip>

// Delay: per-trigger show/hide timing
<Tooltip>
  <TooltipTrigger delay={700} closeDelay={300}>Slow</TooltipTrigger>
  <TooltipContent>Opens after 700ms, closes after 300ms</TooltipContent>
</Tooltip>

// Controlled: parent owns open state, independent of hover
<Tooltip open={open} onOpenChange={setOpen}>
  <TooltipTrigger>Anchor</TooltipTrigger>
  <TooltipContent>Driven by the parent</TooltipContent>
</Tooltip>

// Disabled trigger: wrap in a span; disabled elements fire no pointer events
<Tooltip>
  <TooltipTrigger>
    <span tabIndex={0}><Button variant="danger" disabled>Delete</Button></span>
  </TooltipTrigger>
  <TooltipContent side="right">
    You do not have permission to delete portfolios
  </TooltipContent>
</Tooltip>`}</pre>
      <table className="spec-table" style={{ marginTop: 16 }}>
        <thead><tr><th style={{ width: 130 }}>Prop</th><th style={{ width: 128 }}>On</th><th style={{ width: 150 }}>Type</th><th style={{ width: 80 }}>Default</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td><code className="inline">side</code></td><td className="t-caption">TooltipContent</td><td className="t-caption">top | right | bottom | left</td><td><code className="inline">bottom</code></td><td className="t-caption">Placement relative to the trigger. A preference, not a guarantee: it flips on collision.</td></tr>
          <tr><td><code className="inline">align</code></td><td className="t-caption">TooltipContent</td><td className="t-caption">start | center | end</td><td><code className="inline">center</code></td><td className="t-caption">Alignment along the chosen side. Use <code className="inline">start</code> for edge-aligned toolbar items.</td></tr>
          <tr><td><code className="inline">sideOffset</code></td><td className="t-caption">TooltipContent</td><td className="t-caption">number (px)</td><td><code className="inline">6</code></td><td className="t-caption">Gap from the trigger.</td></tr>
          <tr><td><code className="inline">delay</code></td><td className="t-caption">TooltipTrigger</td><td className="t-caption">number (ms)</td><td><code className="inline">0</code></td><td className="t-caption">Show delay, per trigger. The provider supplies the group default.</td></tr>
          <tr><td><code className="inline">closeDelay</code></td><td className="t-caption">TooltipTrigger</td><td className="t-caption">number (ms)</td><td><code className="inline">0</code></td><td className="t-caption">Hide delay, also the pointer-travel grace period.</td></tr>
          <tr><td><code className="inline">open</code></td><td className="t-caption">Tooltip</td><td className="t-caption">boolean</td><td className="t-caption">—</td><td className="t-caption">Controlled mode. Opens independently of hover.</td></tr>
          <tr><td><code className="inline">onOpenChange</code></td><td className="t-caption">Tooltip</td><td className="t-caption">(open) =&gt; void</td><td className="t-caption">—</td><td className="t-caption">Pairs with <code className="inline">open</code>.</td></tr>
          <tr><td><code className="inline">children</code></td><td className="t-caption">TooltipContent</td><td className="t-caption">ReactNode</td><td className="t-caption">—</td><td className="t-caption">String or any node, including a bold title line plus body.</td></tr>
        </tbody>
      </table>
      <div className="callout" style={{ marginTop: 12 }}>
        <strong>Collision handling is on by default.</strong> Base UI flips and shifts the tip to keep it on screen, so you
        do not wire that yourself. Set <code className="inline">side</code> as the preferred edge and let the engine override it.
      </div>
      <div className="callout warn" style={{ marginTop: 12 }}>
        <strong>Disabled triggers need a focusable wrapper.</strong> A <code className="inline">disabled</code> button emits
        no pointer or focus events, so the tip would never open, and "why is this disabled?" is exactly when the user needs it.
        Wrap it in a <code className="inline">&lt;span tabIndex={0}&gt;</code>, or use <code className="inline">aria-disabled</code>
        instead of the native attribute.
      </div>
    </div>

    {/* Spec vs build */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Spec vs. current build</span><span className="ord">05</span></h3>
      <p className="subsection-desc">
        Four points where the shipped Base UI component and this specification currently differ. The spec column is the
        target; these are open reconciliation items, not licence to diverge further.
      </p>
      <table className="spec-table">
        <thead><tr><th style={{ width: 130 }}>Point</th><th style={{ width: 185 }}>Design spec</th><th style={{ width: 175 }}>Current build</th><th>Action</th></tr></thead>
        <tbody>
          <tr><td><strong>Arrow</strong></td><td className="t-caption">10px arrow pointing at the trigger</td><td className="t-caption">None rendered</td><td className="t-caption">Add it to <code className="inline">TooltipContent</code>. Until then a 6px gap is doing all the anchoring work, which is weak in a dense toolbar where several triggers sit close together.</td></tr>
          <tr><td><strong>Offset</strong></td><td className="t-caption"><code className="inline">--tooltip-offset: 8px</code></td><td className="t-caption"><code className="inline">sideOffset={6}</code></td><td className="t-caption">Move the default to 8 when the arrow lands; 6 is too tight to clear one.</td></tr>
          <tr><td><strong>Default delay</strong></td><td className="t-caption">400ms open / 100ms close, group-shared</td><td className="t-caption">0 / 0 unless set per trigger</td><td className="t-caption">Set the group default on <code className="inline">TooltipProvider</code> so tips stop flashing when the pointer sweeps a toolbar.</td></tr>
          <tr><td><strong>Enter motion</strong></td><td className="t-caption">Fade + 4px travel from the trigger edge</td><td className="t-caption">Fade + zoom</td><td className="t-caption">Either works; pick one and apply it to Popover too so the overlays feel related. Both are reduced-motion aware.</td></tr>
        </tbody>
      </table>
    </div>

    {/* Markup / CSS contract */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Markup &amp; CSS contract</span><span className="ord">06</span></h3>
      <p className="subsection-desc">
        If you are not using the React package, mapping the design onto another framework, or building a one-off; this is
        the exact contract <code className="inline">.ds-tooltip</code> expects.
      </p>
      <pre className="code">{`<!-- Trigger is described by the tip, not labelled by it -->
<button aria-describedby="tip-flag">…</button>

<!-- data-state drives the enter/exit transition; placement class sets the arrow -->
<span id="tip-flag" role="tooltip"
      class="ds-tooltip ds-tooltip--top"
      data-state="open">
  Flag state: Panama
</span>`}</pre>
      <table className="spec-table" style={{ marginTop: 16 }}>
        <thead><tr><th style={{ width: 210 }}>Class / attribute</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td><code className="inline">.ds-tooltip</code></td><td className="t-caption">Base. <code className="inline">position: absolute</code> + <code className="inline">pointer-events: none</code>; you supply the coordinates.</td></tr>
          <tr><td><code className="inline">--top / --bottom / --left / --right</code></td><td className="t-caption">Arrow edge and the direction of the 4px enter travel.</td></tr>
          <tr><td><code className="inline">--rich</code></td><td className="t-caption">Multi-line variant: roomier padding, enables <code className="inline">.ds-tooltip-title</code>.</td></tr>
          <tr><td><code className="inline">--no-arrow</code></td><td className="t-caption">Removes the arrow pseudo-element.</td></tr>
          <tr><td><code className="inline">data-state="open|closed"</code></td><td className="t-caption">Drives opacity + transform. Set <code className="inline">closed</code> on mount, then <code className="inline">open</code> on the next frame so the transition runs.</td></tr>
          <tr><td><code className="inline">.ds-tooltip-anchor</code></td><td className="t-caption">Optional <code className="inline">position: relative</code> inline-flex wrapper for simple, non-portalled cases.</td></tr>
          <tr><td><code className="inline">role="tooltip"</code></td><td className="t-caption">Required on the tip element.</td></tr>
        </tbody>
      </table>
    </div>

    {/* Accessibility */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Accessibility</span><span className="ord">07</span></h3>
      <table className="spec-table">
        <thead><tr><th style={{ width: 190 }}>Requirement</th><th>Implementation</th></tr></thead>
        <tbody>
          <tr><td><strong>Describe, don't label</strong></td><td className="t-caption">The trigger keeps its own accessible name (<code className="inline">aria-label</code> on icon buttons) and points at the tip with <code className="inline">aria-describedby</code>. Using the tip as the name means a screen reader announces it twice or not at all.</td></tr>
          <tr><td><strong>Never focusable</strong></td><td className="t-caption">The tip has <code className="inline">pointer-events: none</code> and is not in the tab order. Tab moves from trigger to the next control, never "into" the tip.</td></tr>
          <tr><td><strong>Dismissible</strong></td><td className="t-caption"><kbd className="ms-kbd">Esc</kbd> closes the open tip without moving focus, WCAG 2.2 <em>1.4.13 Content on Hover or Focus</em>.</td></tr>
          <tr><td><strong>Hoverable</strong></td><td className="t-caption">1.4.13 also requires the content stay visible while the pointer travels toward it; the 100ms close grace plus the 8px offset satisfy this. Never place the tip further than the grace period allows.</td></tr>
          <tr><td><strong>Persistent</strong></td><td className="t-caption">The tip stays until blur, Esc, scroll or click; it never auto-hides on a timer.</td></tr>
          <tr><td><strong>Contrast</strong></td><td className="t-caption">White on <code className="inline">--bg-inverse</code> ≈ 16.1:1.</td></tr>
          <tr><td><strong>Reduced motion</strong></td><td className="t-caption"><code className="inline">prefers-reduced-motion</code> drops the transition to 1ms and removes the travel; the tip still fades in place.</td></tr>
          <tr><td><strong>Not for critical info</strong></td><td className="t-caption">Anything required to complete a task must be visible without hover. Tooltips are progressive enhancement only.</td></tr>
        </tbody>
      </table>
    </div>

    {/* Choosing the right surface */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Tooltip, or something else?</span><span className="ord">08</span></h3>
      <table className="spec-table">
        <thead><tr><th style={{ width: 150 }}>Use</th><th style={{ width: 230 }}>When</th><th>Instead of a tooltip because…</th></tr></thead>
        <tbody>
          <tr><td><strong>Tooltip</strong></td><td className="t-caption">Naming an icon button, expanding a truncated cell, explaining a disabled control.</td><td className="t-caption">Short, non-essential, no interaction.</td></tr>
          <tr><td><strong>Popover</strong></td><td className="t-caption">Content with links, buttons, or form controls.</td><td className="t-caption">Tooltips are <code className="inline">pointer-events: none</code>, a user can never reach a control inside one.</td></tr>
          <tr><td><strong>Help text</strong></td><td className="t-caption">Guidance a user needs <em>while filling a field</em>.</td><td className="t-caption">Hidden-until-hover guidance is missed, and is unreachable on touch.</td></tr>
          <tr><td><strong>Inline alert</strong></td><td className="t-caption">Validation errors, warnings that must be acted on.</td><td className="t-caption">Errors must persist and be announced, not vanish on pointer-out.</td></tr>
          <tr><td><strong>Toast</strong></td><td className="t-caption">Confirming something that already happened.</td><td className="t-caption">Tooltips are anchored to an element, not to an event.</td></tr>
        </tbody>
      </table>
    </div>

    {/* Edge cases */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Edge cases</span><span className="ord">09</span></h3>
      <table className="spec-table">
        <thead><tr><th style={{ width: 230 }}>Case</th><th>Expected behaviour</th></tr></thead>
        <tbody>
          <tr><td>Truncated table cell</td><td className="t-caption">Attach only when the text is actually clipped (<code className="inline">scrollWidth &gt; clientWidth</code>). A tip that repeats fully-visible text is noise.</td></tr>
          <tr><td>Trigger unmounts while open</td><td className="t-caption">Tip is removed immediately, no exit animation, an orphaned tip pointing at nothing is worse than a hard cut.</td></tr>
          <tr><td>Trigger scrolls out of view</td><td className="t-caption">Close on the nearest scroll container's <code className="inline">scroll</code> event rather than repositioning.</td></tr>
          <tr><td>Label longer than 240px</td><td className="t-caption">Wraps to a maximum of 3 lines with <code className="inline">text-wrap: pretty</code>. Longer than that means it is not a tooltip, use a Popover.</td></tr>
          <tr><td>Nested inside a modal</td><td className="t-caption">Portals to body but sits at <code className="inline">--z-tooltip</code>, above the dialog. Focus trap is unaffected: the tip is never focusable.</td></tr>
          <tr><td>Two tips open at once</td><td className="t-caption">Impossible by design. The provider keeps a single open tip; opening one closes the other.</td></tr>
          <tr><td>RTL</td><td className="t-caption"><code className="inline">left</code>/<code className="inline">right</code> placements swap with direction; <code className="inline">top</code>/<code className="inline">bottom</code> are unchanged.</td></tr>
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
              <li>Name every icon-only button with a tip <em>and</em> an <code className="inline">aria-label</code>.</li>
              <li>Explain <em>why</em> a control is disabled.</li>
              <li>Keep labels under ~12 words, sentence case.</li>
              <li>Show the keyboard shortcut for the same action.</li>
              <li>Portal out of scrolling or clipped containers.</li>
            </ul>
          </div>
        </div>
        <div className="panel" style={{ borderTop: "3px solid var(--danger-500)" }}>
          <div className="panel-head"><h4 style={{ color: "var(--danger-700)" }}>✗ Don't</h4></div>
          <div style={{ padding: 16 }}>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>
              <li>Put links, buttons or inputs inside a tip.</li>
              <li>Hide validation errors or required instructions in one.</li>
              <li>Repeat text that is already visible on screen.</li>
              <li>Attach one to a plain block of body copy.</li>
              <li>Auto-dismiss on a timer, or open on tap.</li>
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
          ["--tooltip-bg", "var(--bg-inverse)", "Container fill: flips with theme"],
          ["--tooltip-fg", "var(--white-fixed)", "Label colour"],
          ["--tooltip-max-width", "240px", "Wrap boundary"],
          ["--tooltip-pad-y / -x", "6px / 8px", "Container padding"],
          ["--tooltip-font-size", "12px", "Label size"],
          ["--tooltip-radius", "var(--radius-sm)", "Corner radius"],
          ["--tooltip-arrow", "5px", "Half the arrow square"],
          ["--tooltip-offset", "8px", "Gap from trigger"],
          ["--tooltip-shadow", "var(--shadow-md)", "Elevation"],
          ["--tooltip-delay-in", "400ms", "Pointer rest before open"],
          ["--tooltip-delay-out", "100ms", "Close grace period"],
          ["--tooltip-motion", "var(--motion-fast)", "Transition duration"],
          ["--z-tooltip", "1300", "Above modal and toast"],
        ].map(([t, v, r]) => (
          <div key={t} className="token-row" style={{ gridTemplateColumns: "230px 190px 1fr" }}>
            <code>{t}</code>
            <span className="t-mono" style={{ color: "var(--brand-700)", fontSize: 11 }}>{v}</span>
            <span className="t-caption">{r}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="callout">
      <strong>The tooltip test:</strong> hide every tooltip in the build and try to complete the task. If anything becomes
      impossible or ambiguous, that content was never tooltip content, promote it to a visible label, help text or an alert.
    </div>
  </>
);

window.TooltipSpec = TooltipSpec;
