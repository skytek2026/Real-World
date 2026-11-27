/* Section 2: Foundations: Color, Type, Spacing, Radius/Shadow */

const ColorSwatch = ({ name, token, value, fg = "white" }) => (
  <div className="swatch">
    <div className="swatch-color" style={{ background: value, color: fg, padding: "8px 12px", display: "flex", alignItems: "flex-end" }}>
      <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.85 }}>{name}</span>
    </div>
    <div className="swatch-meta">
      <div className="swatch-token">{token}</div>
      <div className="swatch-hex">{value}</div>
    </div>
  </div>
);

const ColorScale = ({ title, items }) => (
  <div className="subsection">
    <div className="t-label" style={{ marginBottom: 8 }}>{title}</div>
    <div className="grid-6">
      {items.map(it => <ColorSwatch key={it.token} {...it} />)}
    </div>
  </div>
);

const ColorSection = () => {
  /* Brand: the azure ramp (Real World platform). Contrast on white: 800 7.99, 700 5.85, 600 4.05,
     500 3.46 (non-text only below 600). */
  const brand = [
    { name: "800", token: "--brand-800", value: "#0d5580" },
    { name: "700", token: "--brand-700", value: "#0f6aa0" },
    { name: "600", token: "--brand-600", value: "#1485c5" },
    { name: "500", token: "--brand-500", value: "#1a92d1" },
    { name: "400", token: "--brand-400", value: "#43a8df", fg: "#0d5580" },
    { name: "300", token: "--brand-300", value: "#84c5ec", fg: "#0d5580" },
    { name: "200", token: "--brand-200", value: "#b8ddf5", fg: "#0d5580" },
    { name: "100", token: "--brand-100", value: "#dceffb", fg: "#0d5580" },
    { name: "050", token: "--brand-050", value: "#eff8fd", fg: "#0d5580" },
  ];
  const slate = [
    { name: "950", token: "--slate-950", value: "#0B1220" },
    { name: "900", token: "--slate-900", value: "#111827" },
    { name: "800", token: "--slate-800", value: "#1F2937" },
    { name: "700", token: "--slate-700", value: "#374151" },
    { name: "600", token: "--slate-600", value: "#4B5563" },
    { name: "500", token: "--slate-500", value: "#6B7280" },
    { name: "400", token: "--slate-400", value: "#9CA3AF" },
    { name: "300", token: "--slate-300", value: "#D1D5DB", fg: "#111827" },
    { name: "200", token: "--slate-200", value: "#E5E7EB", fg: "#111827" },
    { name: "150", token: "--slate-150", value: "#ECEEF2", fg: "#111827" },
    { name: "100", token: "--slate-100", value: "#F3F4F6", fg: "#111827" },
    { name: "50",  token: "--slate-050",  value: "#F9FAFB", fg: "#111827" },
    { name: "white", token: "--white",   value: "#FFFFFF", fg: "#111827" },
  ];
  const status = [
    { name: "Success 700", token: "--success-700", value: "#15803D" },
    { name: "Success 500", token: "--success-500", value: "#16A34A" },
    { name: "Success 100", token: "--success-100", value: "#DCFCE7", fg: "#15803D" },
    { name: "Success 050", token: "--success-050", value: "#F0FDF4", fg: "#15803D" },
    { name: "Warning 700", token: "--warning-700", value: "#B45309" },
    { name: "Warning 500", token: "--warning-500", value: "#D97706" },
    { name: "Warning 100", token: "--warning-100", value: "#FEF3C7", fg: "#B45309" },
    { name: "Warning 050", token: "--warning-050", value: "#FFFBEB", fg: "#B45309" },
    { name: "Danger 800",  token: "--danger-800",  value: "#991B1B" },
    { name: "Danger 700",  token: "--danger-700",  value: "#B91C1C" },
    { name: "Danger 500",  token: "--danger-500",  value: "#DC2626" },
    { name: "Danger 100",  token: "--danger-100",  value: "#FEE2E2", fg: "#B91C1C" },
    { name: "Danger 050",  token: "--danger-050",  value: "#FEF2F2", fg: "#B91C1C" },
    { name: "Info 700",    token: "--info-700",    value: "#1D4ED8" },
    { name: "Info 500",    token: "--info-500",    value: "#2563EB" },
    { name: "Info 100",    token: "--info-100",    value: "#DBEAFE", fg: "#1D4ED8" },
    { name: "Info 050",    token: "--info-050",    value: "#EFF6FF", fg: "#1D4ED8" },
  ];
  const ratings = [
    { name: "Rating A", token: "--rating-a", value: "#2E7D4F" },
    { name: "Rating B", token: "--rating-b", value: "#6FA84A" },
    { name: "Rating C", token: "--rating-c", value: "#C9A227", fg: "#111827" },
    { name: "Rating D", token: "--rating-d", value: "#D97706" },
    { name: "Rating E", token: "--rating-e", value: "#C0392B" },
  ];

  const semantic = [
    // [token, role, value]
    ["--bg-app", "Page background", "#F9FAFB"],
    ["--bg-canvas", "Map / dashboard canvas", "#F5F7FA"],
    ["--bg-surface", "Cards, modals, panels", "#FFFFFF"],
    ["--bg-raised", "Elevated surfaces", "#FFFFFF"],
    ["--bg-sunken", "Form rows, inset blocks", "#F9FAFB"],
    ["--bg-muted", "Disabled, placeholders", "#F3F4F6"],
    ["--bg-inverse", "Dark surfaces, tooltips", "#111827"],
    ["--border-subtle", "Internal dividers", "#ECEEF2"],
    ["--border-default", "Cards, inputs, buttons", "#E5E7EB"],
    ["--border-strong", "Hover, emphasized", "#D1D5DB"],
    ["--border-info", "Info badge / alert border", "color-mix(in srgb, var(--info-500) 18%, transparent)"],
    ["--border-success", "Success badge / alert border", "color-mix(in srgb, var(--success-500) 18%, transparent)"],
    ["--border-warning", "Warning badge / alert border", "color-mix(in srgb, var(--warning-500) 20%, transparent)"],
    ["--border-danger", "Danger badge / alert border", "color-mix(in srgb, var(--danger-500) 18%, transparent)"],
    ["--text-primary", "Body, headings", "#111827"],
    ["--text-secondary", "Supporting copy", "#4B5563"],
    ["--text-muted", "Help, captions, meta", "#6B7280"],
    ["--text-disabled", "Disabled controls", "#9CA3AF"],
    ["--text-inverse", "On inverse (slate-900) surfaces", "#FFFFFF"],
    ["--text-link", "Inline links", "#0f6aa0"],
    ["--text-on-brand", "On primary buttons", "#FFFFFF"],
  ];

  return (
    <>
      <ColorScale title="Brand · azure · for primary actions, links and focus states only" items={brand} />
      <ColorScale title="Slate · neutral UI palette" items={slate} />
      <ColorScale title="Status · semantic only: never decorative" items={status} />

      <div className="subsection">
        <div className="t-label" style={{ marginBottom: 8 }}>Risk rating scale (preserved from product)</div>
        <div className="grid-6">{ratings.map(it => <ColorSwatch key={it.token} {...it} />)}</div>
        <p className="t-caption" style={{ marginTop: 8 }}>
          Locked to A–E values from <code className="inline">colors.ratings</code>. These are domain-specific (PSC compliance grades) and must remain stable across the product.
        </p>
      </div>

      <div className="subsection">
        <div className="t-label" style={{ marginBottom: 8 }}>Semantic surface, border & text tokens</div>
        <div className="panel">
          <div className="token-row" style={{ gridTemplateColumns: "220px 1fr 160px", background: "var(--bg-sunken)" }}>
            <span className="t-label" style={{ color: "var(--text-muted)" }}>Token</span>
            <span className="t-label" style={{ color: "var(--text-muted)" }}>Role</span>
            <span className="t-label" style={{ color: "var(--text-muted)" }}>Value</span>
          </div>
          {semantic.map(([t, role, light]) => (
            <div key={t} className="token-row" style={{ gridTemplateColumns: "220px 1fr 160px" }}>
              <code>{t}</code>
              <span style={{ color: "var(--text-secondary)" }}>{role}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                <span className="swatch-mini" style={{ background: light, flexShrink: 0 }} />
                <span className="t-mono" style={{ color: "var(--text-muted)", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{light.startsWith("#") ? light : "mix"}</span>
              </span>
            </div>
          ))}
        </div>
        <p className="t-caption" style={{ marginTop: 8 }}>
          Components use these semantic aliases, never the primitives above directly, so a future theme only re-points the aliases.
        </p>
      </div>

      <div className="subsection">
        <div className="t-label" style={{ marginBottom: 8 }}>Usage rules</div>
        <table className="spec-table">
          <thead><tr><th>Rule</th><th>Why</th></tr></thead>
          <tbody>
            <tr><td>Info shares the brand's blue family on purpose: it marks neutral system information, never an action. Always pair info with its icon and a word, and never use info for buttons or links.</td><td>Keeps info readable without adding a sixth hue; the icon and label carry the meaning, not the colour.</td></tr>
            <tr><td>Brand color is reserved for primary CTAs, selected nav, links, and focus rings.</td><td>Prevents brand from competing with status colors during incidents.</td></tr>
            <tr><td>Status colors never carry decorative weight (e.g. success-100 is not a "nice green tint"). Two documented exceptions: the locked A–E rating scale (rating D shares warning-500), and chart categories 2–3, which reuse warning-500 and success-500 as categorical hues.</td><td>So users learn that any colored badge / row tint <em>means</em> something.</td></tr>
            <tr><td>Body text is always <code>--text-primary</code> on light surfaces. Never &lt; 4.5:1 contrast.</td><td>WCAG AA on all dense table content.</td></tr>
            <tr><td>Backgrounds use only the four <code>--bg-*</code> tokens. No raw hex in modules.</td><td>Single source of truth; a future theme only re-points the aliases.</td></tr>
            <tr><td>The legacy <code>react-light-blue / react-dark-blue</code> map to <code>--brand-300 / --brand-600</code>.</td><td>Source compatibility during migration.</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

const toRem = (px) => parseFloat((parseFloat(px) / 16).toFixed(4));

const TypeSpecimen = ({ cls, label, family, weight, size, lh, role }) => (
  <div className="token-row" style={{ gridTemplateColumns: "200px 1fr 200px" }}>
    <div>
      <div style={{ fontSize: 12, fontWeight: 600 }}>{label}</div>
      <div className="t-caption">{role}</div>
    </div>
    <div className={cls}>The quick brown fox jumps over the lazy dog</div>
    <div className="t-mono" style={{ color: "var(--text-muted)", fontSize: 11, lineHeight: 1.45 }}>
      <div>{family} · {weight}</div>
      <div>{size}px / {lh}px</div>
      <div style={{ opacity: 0.75 }}>{toRem(size)}rem / {toRem(lh)}rem</div>
    </div>
  </div>
);

const TypeSection = () => (
  <>
    <div className="subsection">
      <div className="t-label" style={{ marginBottom: 8 }}>Type roles</div>
      <div className="panel">
        <TypeSpecimen cls="t-display" label="Display"   role="Page hero on dashboards. Use sparingly."  family="Exo" weight="600" size="32" lh="40" />
        <TypeSpecimen cls="t-h1"      label="H1"        role="Page header title (one per page)."        family="Exo" weight="600" size="24" lh="32" />
        <TypeSpecimen cls="t-h2"      label="H2"        role="Section / card group title."              family="Exo" weight="600" size="20" lh="28" />
        <TypeSpecimen cls="t-h3"      label="H3"        role="Card title, modal title."                 family="Exo" weight="600" size="16" lh="24" />
        <TypeSpecimen cls="t-h4"      label="H4"        role="Subsection within a card."                family="Exo" weight="600" size="14" lh="20" />
        <TypeSpecimen cls="t-body"    label="Body"      role="Default body text."                       family="Inter" weight="400" size="14" lh="20" />
        <TypeSpecimen cls="t-body-sm" label="Body sm"   role="Tables, dense panels, sidebars."          family="Inter" weight="400" size="13" lh="18" />
        <TypeSpecimen cls="t-caption" label="Caption"   role="Help, meta, captions."                    family="Inter" weight="400" size="12" lh="16" />
        <TypeSpecimen cls="t-label"   label="Label"     role="Field labels, table headers."             family="Inter" weight="600" size="12" lh="16" />
        <TypeSpecimen cls="t-overline" label="Overline" role="Section eyebrows, status group titles."   family="Inter" weight="600" size="11" lh="14" />
        <TypeSpecimen cls="t-figure"  label="Figure"    role="KPIs, prices, timers, table figures: tabular (aligned) digits. Add .t-numeric at other sizes." family="Inter" weight="500" size="14" lh="20" />
        <TypeSpecimen cls="t-mono"    label="Mono"      role="IMO, MMSI, codes, IDs, JSON."             family="JetBrains Mono" weight="400" size="12.5" lh="18" />
      </div>
    </div>

    <div className="subsection">
      <div className="t-label" style={{ marginBottom: 8 }}>Rationale</div>
      <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>
        <li>Consolidate Lato + Open Sans → <strong>Inter</strong>: better screen rendering at 12–14px, true tabular-nums, matches B2B SaaS conventions (Linear / Stripe / Vercel).</li>
        <li>Reduce 6 H-styles + 5 body sizes → <strong>5 heading roles + 3 body roles + 2 utility</strong>. Maps cleanly to product usage.</li>
        <li>Always use <code className="inline">tabular-nums</code> on numeric table cells, IMO codes, coordinates, timestamps.</li>
        <li>Never use sizes &lt; 12px for running text. The one exception is 11px uppercase labels: <code className="inline">t-overline</code> and badges, at weight 600 with added letter-spacing. <code className="inline">10px</code> body (legacy <code className="inline">bodyXXsmall</code>) is removed.</li>
      </ul>
    </div>
  </>
);

const SpacingSection = () => {
  const scale = [
    ["--space-1", 4, "Tight pairings (icon + label inside a chip)"],
    ["--space-2", 8, "Default form gap, button gap, badge padding"],
    ["--space-3", 12, "Card inner padding, list row gap"],
    ["--space-4", 16, "Standard section gap, card body padding"],
    ["--space-5", 20, "Comfortable form vertical spacing"],
    ["--space-6", 24, "Card-to-card gap on dashboards"],
    ["--space-7", 32, "Section vertical spacing on detail pages"],
    ["--space-8", 40, "Page header vertical padding"],
    ["--space-9", 48, "Major page section breaks"],
    ["--space-10", 64, "Page top padding (desktop)"],
    ["--space-11", 96, "Empty / error full-page states"],
  ];
  return (
    <div className="panel">
      {scale.map(([t, v, use]) => (
        <div key={t} className="token-row" style={{ gridTemplateColumns: "180px 120px 120px 1fr" }}>
          <code>{t}</code>
          <span className="t-mono" style={{ color: "var(--text-secondary)" }}>{v}px <span style={{ color: "var(--text-muted)" }}>· {toRem(v)}rem</span></span>
          <div className="preview">
            <div style={{ background: "var(--brand-300)", height: 12, width: v, borderRadius: 2 }} />
          </div>
          <span style={{ color: "var(--text-secondary)" }}>{use}</span>
        </div>
      ))}
      <div className="panel-head" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <h4>Semantic spacing and touch targets</h4>
        <span className="meta">v4.3.0 · named uses of the scale</span>
      </div>
      {[["--gutter-page", 24, "Horizontal page padding (space-6)"], ["--padding-card", 16, "Inner padding of cards, panels, sheets (space-4)"], ["--gap-stack", 16, "Vertical gap between blocks in a column (space-4)"], ["--gap-inline", 8, "Gap between items in a row: icon + label, chips, buttons (space-2)"],
        ["--hit-min", 44, "Minimum touch target on touch screens; small controls extend their hit area to it"], ["--hit-comfortable", 48, "Primary actions on touch screens"]].map(([t, v, use]) => (
        <div key={t} className="token-row" style={{ gridTemplateColumns: "180px 120px 120px 1fr" }}>
          <code>{t}</code>
          <span className="t-mono" style={{ color: "var(--text-secondary)" }}>{v}px</span>
          <div className="preview"><div style={{ background: "var(--brand-300)", height: 12, width: v, borderRadius: 2 }} /></div>
          <span style={{ color: "var(--text-secondary)" }}>{use}</span>
        </div>
      ))}
    </div>
  );
};

const RadiusShadowSection = () => {
  const radii = [
    ["--radius-xs", 2, "Inline tags, status dots' inner shapes"],
    ["--radius-sm", 4, "Badges, small chips, table cells"],
    ["--radius-md", 6, "Buttons, inputs, popovers: DEFAULT"],
    ["--radius-lg", 8, "Cards, modals, drawers"],
    ["--radius-xl", 12, "Onboarding & marketing surfaces (rare)"],
    ["--radius-pill", "9999", "Pills, switches, avatars"],
  ];
  const shadows = [
    ["--shadow-xs", "Resting cards, secondary buttons", "0 1px 0 rgba(15, 23, 42, 0.04)"],
    ["--shadow-sm", "Static panels, inline cards", "0 1px 2px rgba(15, 23, 42, 0.06)"],
    ["--shadow-md", "Popovers, dropdowns, tooltips", "0 4px 12px -2px rgba(15, 23, 42, 0.08)"],
    ["--shadow-lg", "Drawers, side panels", "0 12px 24px -8px rgba(15, 23, 42, 0.12)"],
    ["--shadow-xl", "Modals only", "0 24px 48px -12px rgba(15, 23, 42, 0.18)"],
  ];
  return (
    <>
      <div className="subsection">
        <div className="t-label" style={{ marginBottom: 8 }}>Radius scale</div>
        <div className="panel">
          {radii.map(([t, v, use]) => (
            <div key={t} className="token-row" style={{ gridTemplateColumns: "180px 80px 80px 1fr" }}>
              <code>{t}</code>
              <span className="t-mono" style={{ color: "var(--text-muted)" }}>{v}px</span>
              <div style={{ width: 32, height: 32, background: "var(--brand-300)", borderRadius: typeof v === "number" ? v : 9999 }} />
              <span style={{ color: "var(--text-secondary)" }}>{use}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="subsection">
        <div className="t-label" style={{ marginBottom: 8 }}>Elevation</div>
        <div className="panel">
          {shadows.map(([t, use, raw0]) => { const raw = (typeof getComputedStyle !== "undefined" && getComputedStyle(document.documentElement).getPropertyValue(t).trim()) || raw0; return (
            <div key={t} className="token-row" style={{ gridTemplateColumns: "180px 1fr 80px" }}>
              <div>
                <code>{t}</code>
                <div className="t-caption" style={{ marginTop: 2 }}>{use}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: 80, height: 60, background: "white", border: "1px solid var(--border-default)", borderRadius: 6, boxShadow: `var(${t})` }} />
              </div>
              <span className="t-mono" style={{ color: "var(--text-muted)", fontSize: 11 }}>{raw}</span>
            </div>
          ); })}
        </div>
        <div className="callout" style={{ marginTop: 16 }}>
          <strong>Rule:</strong> Borders define structure; shadows define elevation. A surface should rarely use both heavily, choose one. Dashboards default to <em>border + shadow-xs</em>, never <em>shadow-md</em>.
        </div>
      </div>
    </>
  );
};

window.ColorSection = ColorSection;
window.TypeSection = TypeSection;
window.SpacingSection = SpacingSection;
window.RadiusShadowSection = RadiusShadowSection;
