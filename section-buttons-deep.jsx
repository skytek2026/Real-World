/* Comprehensive Buttons documentation: variants, sizes, states, anatomy, tokens, matrix, guidelines */

/* ——— Redesigned interaction-states data ——— */
const SIZE_DEFS = [
  { key: "sm", label: "Small",  cls: "ds-btn--sm", h: "28px" },
  { key: "md", label: "Medium", cls: "",           h: "32px", def: true },
  { key: "lg", label: "Large",  cls: "ds-btn--lg", h: "40px" },
];

const STATE_DEFS = [
  { key: "default",  label: "Default",  trigger: "rest",            style: {} },
  { key: "hover",    label: "Hover",    trigger: ":hover",          style: { background: "var(--brand-600)", borderColor: "var(--brand-600)" } },
  { key: "focus",    label: "Focus",    trigger: ":focus-visible",  style: { boxShadow: "var(--shadow-focus)" }, focus: true },
  { key: "active",   label: "Active",   trigger: ":active",         style: { background: "var(--brand-700)", borderColor: "var(--brand-700)" } },
  { key: "disabled", label: "Disabled", trigger: "[disabled]",      disabled: true },
];

const BS_STATES_CSS = `
.bs-states kbd.bs-kbd {
  font-family: var(--font-mono); font-size: 11px; line-height: 1;
  padding: 2px 4px; border-radius: 4px;
  background: var(--slate-100); border: 1px solid var(--border-default);
  border-bottom-width: 2px; color: var(--text-secondary);
}

/* Live specimen */
.bs-live {
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
  padding: 20px 24px; margin-top: 4px;
  border: 1px solid var(--border-default); border-radius: var(--radius-lg);
  background:
    radial-gradient(120% 140% at 100% 0%, var(--brand-050) 0%, transparent 55%),
    var(--bg-surface);
}
.bs-live-copy { max-width: 560px; }
.bs-live-stage { flex-shrink: 0; }

/* Matrix */
.bs-panel { overflow: hidden; }
.bs-matrix-wrap { padding: 20px; background: var(--bg-canvas); overflow-x: auto; }
.bs-matrix {
  min-width: 640px;
  display: grid;
  grid-template-columns: 148px repeat(5, minmax(108px, 1fr));
  gap: 1px;
  background: var(--border-default);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.bs-corner, .bs-colhead, .bs-rowhead, .bs-cell { background: var(--bg-surface); }
.bs-corner {
  display: flex; align-items: flex-end; padding: 12px 16px;
  background: var(--slate-050);
}
.bs-colhead {
  padding: 12px 16px; background: var(--slate-050);
  display: flex; flex-direction: column; gap: 4px;
}
.bs-colhead.is-focus, .bs-cell.is-focus { background: var(--brand-050); }
.bs-colhead-name {
  font-size: 12px; font-weight: 700; color: var(--text-primary);
  letter-spacing: 0.01em; display: flex; align-items: center; gap: 4px;
}
.bs-wcag {
  font-family: var(--font-mono); font-size: 11px; font-weight: 700;
  letter-spacing: 0.06em; color: var(--brand-600);
  background: var(--white); border: 1px solid var(--brand-100);
  padding: 1px 4px; border-radius: 4px;
}
.bs-trigger { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }
.bs-rowhead {
  display: flex; flex-direction: column; gap: 4px; justify-content: center;
  padding: 0 16px; background: var(--slate-050);
}
.bs-size-name { font-size: 13px; font-weight: 600; color: var(--text-primary); display: flex; align-items: center; gap: 8px; }
.bs-def {
  font-size: 11px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
  color: var(--brand-600); background: var(--brand-050);
  border: 1px solid var(--brand-100); padding: 1px 4px; border-radius: 4px;
}
.bs-size-h { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }
.bs-cell { display: flex; align-items: center; justify-content: center; padding: 28px 16px; }

/* Loading strip */
.bs-loading-strip {
  display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap;
  margin-top: 16px; padding: 20px 24px;
  border: 1px solid var(--border-default); border-radius: var(--radius-lg);
  background: var(--bg-surface);
}
.bs-loading-copy { display: flex; align-items: flex-start; gap: 12px; }
.bs-loading-stage { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.bs-spinner {
  display: inline-block; width: 12px; height: 12px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff;
  animation: bs-spin 0.7s linear infinite;
}
@keyframes bs-spin { to { transform: rotate(360deg); } }

/* Spec table focus-row tint */
.bs-row-focus td { background: var(--brand-050); }

/* Focus spotlight */
.bs-focus-spot {
  display: grid; grid-template-columns: minmax(280px, 1fr) 1.2fr; gap: 16px;
  margin-top: 16px;
}
.bs-focus-demo {
  display: flex; flex-direction: column; gap: 12px;
  padding: 24px; border: 1px solid var(--border-default); border-radius: var(--radius-lg);
  background: var(--bg-surface);
}
.bs-focus-stage {
  display: grid; place-items: center; padding: 28px 16px;
  border-radius: var(--radius-md);
  background:
    linear-gradient(var(--bg-canvas), var(--bg-canvas)),
    repeating-conic-gradient(#fff 0 25%, transparent 0 50%) 50% / 14px 14px;
}
.bs-focus-spec {
  border: 1px solid var(--border-default); border-radius: var(--radius-lg);
  background: var(--bg-surface); overflow: hidden;
}
.bs-focus-row {
  display: grid; grid-template-columns: 116px 1fr; gap: 16px; align-items: center;
  padding: 12px 20px; border-top: 1px solid var(--border-subtle);
}
.bs-focus-row:first-child { border-top: 0; }
.bs-focus-k { font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; }
.bs-focus-v { font-size: 13px; color: var(--text-primary); }

@media (max-width: 860px) {
  .bs-focus-spot { grid-template-columns: 1fr; }
  .bs-live { flex-direction: column; align-items: flex-start; }
}
`;

const ButtonsDeep = () => (
  <>
    {/* ====== VARIANTS ====== */}
    <div className="subsection">
      <h3 className="subsection-title">Variants</h3>
      <p className="subsection-desc">Six variants cover the full hierarchy of action priority. One primary per surface: secondary/tertiary support, destructive carries weight, link sits in copy.</p>
      
      <div style={{ display: "grid", gap: 12 }}>
        {[
          { name: "Primary", cls: "ds-btn--primary", purpose: "Most important action on the surface. One per view.", token: "--brand-500 → --brand-600" },
          { name: "Secondary", cls: "ds-btn--secondary", purpose: "Supporting actions. Cancel, alternative paths, secondary CTAs.", token: "--white + --border-default" },
          { name: "Tertiary / Ghost", cls: "ds-btn--ghost", purpose: "Lowest emphasis. Toolbars, table row actions, dense surfaces.", token: "transparent + hover --slate-100" },
          { name: "Destructive", cls: "ds-btn--danger", purpose: "Irreversible or data-loss actions. Always confirmed via modal.", token: "--danger-500 → --danger-700" },
          { name: "Link", cls: "ds-btn--link", purpose: "Inline navigational action that reads as text but behaves as a button.", token: "--text-link" },
          { name: "Icon-only", cls: "ds-btn--secondary ds-btn--icon", purpose: "Square buttons with no label. Always paired with aria-label and tooltip.", token: "Variant-dependent + width=height" },
        ].map((v, i) => (
          <div key={v.name} className="panel" style={{ display: "grid", gridTemplateColumns: "180px 1fr 240px", gap: 16, alignItems: "center", padding: 16 }}>
            <div>
              {v.name === "Icon-only" ? (
                <button className={`ds-btn ${v.cls}`}><Icon d={I.edit} /></button>
              ) : (
                <button className={`ds-btn ${v.cls}`}>{v.name}</button>
              )}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{v.name}</div>
              <div className="t-caption">{v.purpose}</div>
            </div>
            <code className="inline" style={{ fontSize: 11 }}>{v.token}</code>
          </div>
        ))}
      </div>
    </div>

    {/* ====== SIZES ====== */}
    <div className="subsection">
      <h3 className="subsection-title">Sizes</h3>
      <p className="subsection-desc">Four sizes. Heights snap to a fixed scale to align with form inputs and table rows.</p>

      <div className="panel" style={{ padding: 24 }}>
        <div className="row" style={{ gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 24 }}>
          <button className="ds-btn ds-btn--primary ds-btn--xs"><Icon d={I.plus} /> XS · 24px</button>
          <button className="ds-btn ds-btn--primary ds-btn--sm"><Icon d={I.plus} /> SM · 28px</button>
          <button className="ds-btn ds-btn--primary"><Icon d={I.plus} /> MD · 32px (default)</button>
          <button className="ds-btn ds-btn--primary ds-btn--lg"><Icon d={I.plus} /> LG · 40px</button>
        </div>

        <table className="spec-table" style={{ border: 0, marginTop: 16 }}>
          <thead>
            <tr>
              <th>Size</th>
              <th>Height</th>
              <th>Padding (X)</th>
              <th>Font size</th>
              <th>Icon size</th>
              <th>Icon-label gap</th>
              <th>Use for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code className="inline">xs</code></td>
              <td>24px</td>
              <td>8px</td>
              <td>12px</td>
              <td>12×12</td>
              <td>4px</td>
              <td className="t-caption">Inline table actions, compact toolbars</td>
            </tr>
            <tr>
              <td><code className="inline">sm</code></td>
              <td>28px</td>
              <td>10px</td>
              <td>12px</td>
              <td>14×14</td>
              <td>6px</td>
              <td className="t-caption">Dense forms, side panels, secondary actions</td>
            </tr>
            <tr style={{ background: "var(--brand-050)" }}>
              <td><strong>md</strong> <span className="t-caption">(default)</span></td>
              <td>32px</td>
              <td>12px</td>
              <td>13px</td>
              <td>14×14</td>
              <td>6px</td>
              <td className="t-caption">Standard application controls</td>
            </tr>
            <tr>
              <td><code className="inline">lg</code></td>
              <td>40px</td>
              <td>16px</td>
              <td>14px</td>
              <td>16×16</td>
              <td>8px</td>
              <td className="t-caption">Primary CTAs, marketing surfaces, mobile</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* ====== STATES (redesigned) ====== */}
    <div className="subsection bs-states">
      <h3 className="subsection-title">Interaction states</h3>
      <p className="subsection-desc">Every button resolves to five interaction states across three sizes. States are driven by native pseudo-classes, never toggled with JavaScript, so they stay in lock-step with the browser's real hover, focus, and pointer behavior. Transitions run at <code className="inline">var(--motion-fast)</code> (140ms ease-out).</p>

      {/* Live specimen: the real component, not a mockup */}
      <div className="bs-live">
        <div className="bs-live-copy">
          <div className="t-overline" style={{ color: "var(--brand-700)" }}>Live specimen</div>
          <p className="t-caption" style={{ margin: "4px 0 0" }}>Hover, press, or press <kbd className="bs-kbd">Tab</kbd> to focus; this is the production component reacting in real time, not a static example.</p>
        </div>
        <div className="bs-live-stage">
          <button className="ds-btn ds-btn--primary ds-btn--lg"><Icon d={I.check} /> Save changes</button>
        </div>
      </div>

      {/* States × Sizes matrix, the canonical reference grid */}
      <div className="panel bs-panel" style={{ marginTop: 20 }}>
        <div className="panel-head">
          <h4>Primary · States × Sizes</h4>
          <span className="meta">Figma: <code className="inline" style={{ fontSize: 11 }}>Button / Primary / [Size] / [State]</code></span>
        </div>
        <div className="bs-matrix-wrap">
          <div className="bs-matrix" role="group" aria-label="Button states by size">
            {/* Header row */}
            <div className="bs-corner">
              <span className="t-overline" style={{ color: "var(--text-muted)" }}>Size ╲ State</span>
            </div>
            {STATE_DEFS.map(st => (
              <div key={st.key} className={`bs-colhead${st.focus ? " is-focus" : ""}`}>
                <div className="bs-colhead-name">
                  {st.label}
                  {st.focus && <span className="bs-wcag">WCAG</span>}
                </div>
                <code className="bs-trigger">{st.trigger}</code>
              </div>
            ))}

            {/* Size rows */}
            {SIZE_DEFS.map(sz => (
              <React.Fragment key={sz.key}>
                <div className="bs-rowhead">
                  <span className="bs-size-name">{sz.label}{sz.def && <span className="bs-def">default</span>}</span>
                  <code className="bs-size-h">{sz.h}</code>
                </div>
                {STATE_DEFS.map(st => (
                  <div key={st.key} className={`bs-cell${st.focus ? " is-focus" : ""}`}>
                    <button
                      className={`ds-btn ds-btn--primary ${sz.cls}`}
                      style={st.style}
                      disabled={st.disabled}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <Icon d={I.check} /> Save
                    </button>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="panel-foot">
          Same recipe applies to Secondary, Ghost, and Destructive, only the fill/border tokens swap. Focus, active, and disabled behavior is identical across variants.
        </div>
      </div>

      {/* Async loading: the sixth, behavioral state */}
      <div className="bs-loading-strip">
        <div className="bs-loading-copy">
          <span className="ds-badge ds-badge--info ds-badge--dot">Async</span>
          <div>
            <div className="t-h4" style={{ marginBottom: 2 }}>Loading</div>
            <p className="t-caption" style={{ margin: 0, maxWidth: 380 }}>A behavioral overlay on any state. Spinner replaces the leading icon, <code className="inline">aria-busy="true"</code> is set, and <code className="inline">pointer-events</code> are suppressed, but the button stays focusable.</p>
          </div>
        </div>
        <div className="bs-loading-stage">
          {[
            { cls: "ds-btn--sm" }, { cls: "" }, { cls: "ds-btn--lg" },
          ].map((s, i) => (
            <button key={i} className={`ds-btn ds-btn--primary ${s.cls}`} aria-busy="true" tabIndex={-1} aria-hidden="true">
              <span className="bs-spinner" />
              Saving…
            </button>
          ))}
        </div>
      </div>

      {/* State reference: trigger, change, token, a11y */}
      <h4 className="t-h4" style={{ margin: "28px 0 8px" }}>State specification</h4>
      <div className="panel" style={{ overflow: "hidden" }}>
        <table className="spec-table" style={{ border: 0 }}>
          <thead>
            <tr>
              <th style={{ width: "14%" }}>State</th>
              <th style={{ width: "16%" }}>Trigger</th>
              <th style={{ width: "26%" }}>Visual change</th>
              <th style={{ width: "20%" }}>Token</th>
              <th>Accessibility</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Default</strong></td>
              <td className="t-caption">Resting</td>
              <td className="t-caption">Solid brand fill, white label.</td>
              <td><code className="inline">--brand-600</code></td>
              <td className="t-caption">Label contrast 4.5:1 on fill (AA).</td>
            </tr>
            <tr>
              <td><strong>Hover</strong></td>
              <td><code className="inline">:hover</code></td>
              <td className="t-caption">Fill darkens one step; cursor → pointer.</td>
              <td><code className="inline">--brand-600</code></td>
              <td className="t-caption">Never the sole signal: paired with focus + active.</td>
            </tr>
            <tr className="bs-row-focus">
              <td><strong>Focus</strong></td>
              <td><code className="inline">:focus-visible</code></td>
              <td className="t-caption">3px ring, 0 offset, fill unchanged.</td>
              <td><code className="inline">--shadow-focus</code></td>
              <td className="t-caption">Ring ≥ 3:1 contrast. Keyboard-only; never <code className="inline">outline: none</code> without a replacement.</td>
            </tr>
            <tr>
              <td><strong>Active</strong></td>
              <td><code className="inline">:active</code></td>
              <td className="t-caption">Fill darkens one step (pressed).</td>
              <td><code className="inline">--brand-700</code></td>
              <td className="t-caption">Instant: no transition delay on press-down.</td>
            </tr>
            <tr>
              <td><strong>Disabled</strong></td>
              <td><code className="inline">[disabled]</code></td>
              <td className="t-caption">Muted slate fill, slate label, no shadow.</td>
              <td><code className="inline">--slate-200</code> / <code className="inline">--slate-400</code></td>
              <td className="t-caption">Not focusable. Pair with tooltip explaining why.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Focus accessibility spotlight */}
      <div className="bs-focus-spot">
        <div className="bs-focus-demo">
          <span className="t-overline" style={{ color: "var(--brand-700)" }}>Keyboard focus</span>
          <div className="bs-focus-stage">
            <button className="ds-btn ds-btn--primary ds-btn--lg" style={{ boxShadow: "var(--shadow-focus)" }} tabIndex={-1} aria-hidden="true"><Icon d={I.check} /> Save changes</button>
          </div>
          <p className="t-caption" style={{ margin: 0 }}>The focus ring is the single most important accessibility affordance. It must survive design reviews untouched.</p>
        </div>
        <div className="bs-focus-spec">
          {[
            ["Ring width", "3px solid offset"],
            ["Ring color", "rgba(46,134,192,0.32)"],
            ["Contrast", "≥ 3:1 vs. adjacent surface (WCAG 2.4.11)"],
            ["Visibility", "Keyboard only: suppressed on mouse via :focus-visible"],
            ["Activation", <span><kbd className="bs-kbd">Enter</kbd> and <kbd className="bs-kbd">Space</kbd> both fire onClick</span>],
            ["Never", "outline: none without a visible replacement"],
          ].map(([k, v], i) => (
            <div key={i} className="bs-focus-row">
              <span className="bs-focus-k">{k}</span>
              <span className="bs-focus-v">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{BS_STATES_CSS}</style>
    </div>

    {/* ====== ANATOMY ====== */}
    <div className="subsection">
      <h3 className="subsection-title">Anatomy</h3>
      <p className="subsection-desc">Buttons compose from up to four parts. The container is a flex row; gap controls icon-to-label spacing.</p>

      <div className="panel" style={{ padding: 32, display: "grid", placeItems: "center", background: "var(--bg-canvas)" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <button className="ds-btn ds-btn--primary ds-btn--lg" style={{ padding: "0 16px" }}>
            <Icon d={I.plus} />
            <span>Create policy</span>
            <Icon d={I.chevronRight} />
          </button>
          {/* Annotations */}
          <div style={{ position: "absolute", top: -28, left: -8, right: -8, height: 1, borderTop: "1px dashed var(--brand-500)" }} />
          <div style={{ position: "absolute", top: -44, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "var(--brand-700)", whiteSpace: "nowrap" }}>① Container</div>
          <div style={{ position: "absolute", bottom: -22, left: 14, fontSize: 11, color: "var(--brand-700)" }}>② Leading icon</div>
          <div style={{ position: "absolute", bottom: -22, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "var(--brand-700)" }}>③ Label</div>
          <div style={{ position: "absolute", bottom: -22, right: 14, fontSize: 11, color: "var(--brand-700)" }}>④ Trailing icon</div>
        </div>
      </div>

      <table className="spec-table" style={{ border: 0, marginTop: 24 }}>
        <thead>
          <tr><th style={{ width: 28 }}>#</th><th>Part</th><th>Rules</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>①</td>
            <td><strong>Container</strong></td>
            <td className="t-caption">Flex row, <code className="inline">align-items: center</code>, fixed height, full border-radius var(--radius-md). All sides equal padding.</td>
          </tr>
          <tr>
            <td>②</td>
            <td><strong>Leading icon</strong> <span className="t-caption">(optional)</span></td>
            <td className="t-caption">Pre-label icon. Conveys action category (plus = create, edit = modify). Icon-label gap = 6px (md), 4px (xs/sm), 8px (lg).</td>
          </tr>
          <tr>
            <td>③</td>
            <td><strong>Label</strong></td>
            <td className="t-caption">Always present except in icon-only buttons. Verb-first ("Save changes", not "Changes save"). Sentence case. Avoid two words when one will do.</td>
          </tr>
          <tr>
            <td>④</td>
            <td><strong>Trailing icon</strong> <span className="t-caption">(optional)</span></td>
            <td className="t-caption">Indicates direction or further options. Common: chevron-right (next), chevron-down (menu), external-link.</td>
          </tr>
          <tr>
            <td>⑤</td>
            <td><strong>Loading indicator</strong> <span className="t-caption">(replaces ②)</span></td>
            <td className="t-caption">12-14px circular spinner. Replaces leading icon during async work. Label can change to gerund ("Save" → "Saving…").</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* ====== ICON USAGE ====== */}
    <div className="subsection">
      <h3 className="subsection-title">Icon usage</h3>
      <div className="grid-2">
        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-card-title">Icon + label</h3></div>
          <div className="ds-card-body" style={{ display: "grid", gap: 12 }}>
            <div className="row" style={{ gap: 8 }}>
              <button className="ds-btn ds-btn--primary"><Icon d={I.plus} /> New vessel</button>
              <button className="ds-btn ds-btn--secondary"><Icon d={I.download} /> Export</button>
              <button className="ds-btn ds-btn--ghost">Continue <Icon d={I.chevronRight} /></button>
            </div>
            <p className="t-caption" style={{ margin: 0 }}>Icon clarifies the action. Always pair with a verb-first label. Icon goes left for actions, right for navigation.</p>
          </div>
        </div>

        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-card-title">Icon-only</h3></div>
          <div className="ds-card-body" style={{ display: "grid", gap: 12 }}>
            <div className="row" style={{ gap: 8 }}>
              <button className="ds-btn ds-btn--secondary ds-btn--icon" aria-label="Edit"><Icon d={I.edit} /></button>
              <button className="ds-btn ds-btn--secondary ds-btn--icon" aria-label="Delete"><Icon d={I.trash} /></button>
              <button className="ds-btn ds-btn--secondary ds-btn--icon" aria-label="More options"><Icon d={I.more} /></button>
            </div>
            <p className="t-caption" style={{ margin: 0 }}>Square (width = height). <strong>Required:</strong> <code className="inline">aria-label</code> describing the action. Pair with tooltip on hover/focus for sighted users.</p>
          </div>
        </div>
      </div>

      <div className="callout" style={{ marginTop: 16 }}>
        <strong>Accessibility floor:</strong> Every icon-only button needs <code className="inline">aria-label</code>. Decorative icons inside labeled buttons get <code className="inline">aria-hidden="true"</code>. Tooltip text must match aria-label.
      </div>
    </div>

    {/* ====== TOKENS ====== */}
    <div className="subsection">
      <h3 className="subsection-title">Token mapping</h3>
      <p className="subsection-desc">Every visual property maps to a design token. No raw hex values in component code.</p>

      <div className="panel" style={{ overflow: "hidden" }}>
        <table className="spec-table" style={{ border: 0 }}>
          <thead>
            <tr>
              <th>Variant</th>
              <th>Background</th>
              <th>Text</th>
              <th>Border</th>
              <th>Hover bg</th>
              <th>Focus ring</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Primary</strong></td>
              <td><code className="inline">--brand-500</code></td>
              <td><code className="inline">--white</code></td>
              <td><code className="inline">--brand-500</code></td>
              <td><code className="inline">--brand-600</code></td>
              <td><code className="inline">--shadow-focus</code></td>
            </tr>
            <tr>
              <td><strong>Secondary</strong></td>
              <td><code className="inline">--white</code></td>
              <td><code className="inline">--slate-800</code></td>
              <td><code className="inline">--border-default</code></td>
              <td><code className="inline">--slate-050</code></td>
              <td><code className="inline">--shadow-focus</code></td>
            </tr>
            <tr>
              <td><strong>Ghost</strong></td>
              <td>transparent</td>
              <td><code className="inline">--text-link</code></td>
              <td>transparent</td>
              <td><code className="inline">--slate-100</code></td>
              <td><code className="inline">--shadow-focus</code></td>
            </tr>
            <tr>
              <td><strong>Destructive</strong></td>
              <td><code className="inline">--danger-500</code></td>
              <td><code className="inline">--white</code></td>
              <td><code className="inline">--danger-500</code></td>
              <td><code className="inline">--danger-700</code></td>
              <td><code className="inline">--shadow-focus-danger</code></td>
            </tr>
            <tr>
              <td><strong>Link</strong></td>
              <td>transparent</td>
              <td><code className="inline">--text-link</code></td>
              <td>transparent</td>
              <td>underline only</td>
              <td><code className="inline">--shadow-focus</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <table className="spec-table" style={{ border: 0, marginTop: 16 }}>
        <thead>
          <tr><th>Property</th><th>Token</th><th>Value</th></tr>
        </thead>
        <tbody>
          <tr><td>Border radius</td><td><code className="inline">--radius-md</code></td><td>6px</td></tr>
          <tr><td>Padding (md)</td><td><code className="inline">--space-4</code></td><td>12px</td></tr>
          <tr><td>Icon-label gap</td><td><code className="inline">--space-3</code></td><td>8px</td></tr>
          <tr><td>Transition</td><td><code className="inline">--motion-fast</code></td><td>140ms ease-out</td></tr>
          <tr><td>Elevation (secondary)</td><td><code className="inline">--card-shadow-rest</code></td><td>0 1px 2px / 0.05</td></tr>
        </tbody>
      </table>
    </div>

    {/* ====== MATRIX ====== */}
    <div className="subsection">
      <h3 className="subsection-title">Variants × Sizes × States matrix</h3>
      <p className="subsection-desc">Figma naming convention: <code className="inline">Button/[Variant]/[Size]/[State]</code>, e.g. <code className="inline">Button/Primary/Large/Hover</code>.</p>

      {[
        { variant: "Primary", cls: "ds-btn--primary" },
        { variant: "Secondary", cls: "ds-btn--secondary" },
        { variant: "Ghost", cls: "ds-btn--ghost" },
        { variant: "Destructive", cls: "ds-btn--danger" },
      ].map(v => (
        <div key={v.variant} className="panel" style={{ padding: 16, marginBottom: 12 }}>
          <div className="t-h4" style={{ marginBottom: 12 }}>Button / {v.variant}</div>
          <div style={{ display: "grid", gridTemplateColumns: "80px repeat(5, 1fr)", gap: 8, alignItems: "center", fontSize: 11 }}>
            <div></div>
            <div className="t-caption" style={{ textAlign: "center" }}>Default</div>
            <div className="t-caption" style={{ textAlign: "center" }}>Hover</div>
            <div className="t-caption" style={{ textAlign: "center" }}>Focus</div>
            <div className="t-caption" style={{ textAlign: "center" }}>Active</div>
            <div className="t-caption" style={{ textAlign: "center" }}>Disabled</div>

            {[
              { sz: "sm", cls: "ds-btn--sm" },
              { sz: "md", cls: "" },
              { sz: "lg", cls: "ds-btn--lg" },
            ].map(s => (
              <React.Fragment key={s.sz}>
                <div className="t-caption" style={{ textAlign: "right", paddingRight: 4 }}>{s.sz}</div>
                <div style={{ display: "grid", placeItems: "center" }}><button className={`ds-btn ${v.cls} ${s.cls}`}>Action</button></div>
                <div style={{ display: "grid", placeItems: "center" }}>
                  <button className={`ds-btn ${v.cls} ${s.cls}`} style={
                    v.variant === "Primary" ? { background: "var(--brand-500)", borderColor: "var(--brand-500)" } :
                    v.variant === "Secondary" ? { background: "var(--slate-050)", borderColor: "var(--border-strong)" } :
                    v.variant === "Ghost" ? { background: "var(--slate-100)" } :
                    { background: "var(--danger-700)", borderColor: "var(--danger-700)" }
                  }>Action</button>
                </div>
                <div style={{ display: "grid", placeItems: "center" }}><button className={`ds-btn ${v.cls} ${s.cls}`} style={{ boxShadow: "var(--shadow-focus)" }}>Action</button></div>
                <div style={{ display: "grid", placeItems: "center" }}>
                  <button className={`ds-btn ${v.cls} ${s.cls}`} style={
                    v.variant === "Primary" ? { background: "#0D5580", borderColor: "#0D5580" } :
                    v.variant === "Secondary" ? { background: "var(--slate-100)" } :
                    v.variant === "Ghost" ? { background: "var(--slate-150)" } :
                    { background: "#991B1B", borderColor: "#991B1B" }
                  }>Action</button>
                </div>
                <div style={{ display: "grid", placeItems: "center" }}><button className={`ds-btn ${v.cls} ${s.cls}`} disabled>Action</button></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* ====== USAGE ====== */}
    <div className="subsection">
      <h3 className="subsection-title">Usage guidelines</h3>
      <div className="dodont">
        <div className="do">
          <div className="hd">✓ Do</div>
          <div className="bd">
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)" }}>
              <li><strong>One primary per surface.</strong> Form footers, dialogs, page headers, each gets exactly one.</li>
              <li><strong>Order matters.</strong> Primary on the right, secondary to its left, destructive at far left or in overflow.</li>
              <li><strong>Verb-first labels.</strong> "Save changes", "Delete vessel", "Export report".</li>
              <li><strong>Match button size to context.</strong> Dense tables → sm. Form footers → md. Hero CTAs → lg.</li>
              <li><strong>Confirm destructive actions.</strong> Always trigger a confirmation modal before data loss.</li>
            </ul>
          </div>
        </div>
        <div className="dont">
          <div className="hd">✗ Don't</div>
          <div className="bd">
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)" }}>
              <li><strong>Stack two primaries.</strong> Confuses hierarchy. Demote one to secondary.</li>
              <li><strong>Use buttons for navigation.</strong> Use links (<code className="inline">{`<a>`}</code>) when the destination is a URL. Buttons trigger actions.</li>
              <li><strong>Use destructive for "Cancel".</strong> Cancel is always secondary.</li>
              <li><strong>Stack {`>`} 3 buttons in a row.</strong> Collapse extras into a kebab/overflow menu.</li>
              <li><strong>Label with two words when one suffices.</strong> "Save changes" → "Save" if context is unambiguous.</li>
              <li><strong>Disable without explanation.</strong> Pair disabled buttons with tooltip or inline help text.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* ====== HANDOFF ====== */}
    <div className="subsection">
      <h3 className="subsection-title">Engineering handoff</h3>
      <p className="subsection-desc">Suggested component API. Names align with shadcn/ui and Material conventions for predictability.</p>

      <pre className="code">{`type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg';            // default 'md'
  iconLeft?: ReactNode;                         // optional leading icon
  iconRight?: ReactNode;                        // optional trailing icon
  iconOnly?: boolean;                           // square button; requires aria-label
  loading?: boolean;                            // shows spinner, sets aria-busy
  disabled?: boolean;
  fullWidth?: boolean;                          // stretches to container
  type?: 'button' | 'submit' | 'reset';         // default 'button'
  onClick?: (e: MouseEvent) => void;
  children: ReactNode;                          // label
  'aria-label'?: string;                        // required when iconOnly
};

// Usage
<Button variant="primary" size="lg" iconLeft={<PlusIcon />} loading={isSaving}>
  Create policy
</Button>

<Button variant="secondary" iconOnly aria-label="Edit row">
  <EditIcon />
</Button>`}</pre>

      <h4 className="t-h4" style={{ marginTop: 24, marginBottom: 8 }}>Behavior expectations</h4>
      <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)" }}>
        <li><strong>Loading state:</strong> Sets <code className="inline">aria-busy="true"</code>, sets <code className="inline">pointer-events: none</code>, replaces <code className="inline">iconLeft</code> with spinner. Stays focusable for keyboard users.</li>
        <li><strong>Disabled + loading:</strong> Mutually exclusive; if both pass, loading wins (action is in-progress, not unavailable).</li>
        <li><strong>Long text:</strong> Truncates with ellipsis on single line; never wraps. Tooltip surfaces full text on hover.</li>
        <li><strong>Form submit:</strong> Default <code className="inline">type="button"</code> to prevent accidental submits. Set <code className="inline">type="submit"</code> explicitly inside forms.</li>
        <li><strong>Icon-only:</strong> Throws TypeScript error in dev if <code className="inline">aria-label</code> is missing.</li>
        <li><strong>Keyboard:</strong> <kbd>Space</kbd> and <kbd>Enter</kbd> both activate. Focus ring suppressed via <code className="inline">:focus-visible</code> for mouse users.</li>
      </ul>

      <h4 className="t-h4" style={{ marginTop: 24, marginBottom: 8 }}>Edge cases</h4>
      <table className="spec-table" style={{ border: 0 }}>
        <thead>
          <tr><th>Case</th><th>Behavior</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Long label exceeds container</td>
            <td className="t-caption">Truncate with ellipsis. Use tooltip or move action to a menu item.</td>
          </tr>
          <tr>
            <td><code className="inline">loading</code> + <code className="inline">disabled</code> both true</td>
            <td className="t-caption">Loading takes precedence. Spinner shows; aria-busy true; aria-disabled false.</td>
          </tr>
          <tr>
            <td>Async action fails</td>
            <td className="t-caption">Reset to default state. Surface error via Toast or inline alert; don't show error inside button.</td>
          </tr>
          <tr>
            <td>Multiple clicks during loading</td>
            <td className="t-caption">Pointer-events: none prevents click handler. Don't debounce in the component, handle in caller.</td>
          </tr>
          <tr>
            <td>Icon-only button on touch device</td>
            <td className="t-caption">Increase hit area to 44×44px minimum via padding while keeping visual size.</td>
          </tr>
          <tr>
            <td>Right-to-left languages</td>
            <td className="t-caption">Mirror iconLeft/iconRight automatically when <code className="inline">dir="rtl"</code>.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
);

Object.assign(window, { ButtonsDeep });
