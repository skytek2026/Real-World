/* Section: Foundations II: Iconography (Lucide), Density modes, Motion */

/* ============================================================
   Iconography, Lucide
   ============================================================ */

const ICON_SIZE_RULES = [
  ["12 px", "h-3 w-3",   "Inline meta, tiny badges, dense table cells, sparkline endcaps."],
  ["14 px", "h-3.5 w-3.5","Menu glyphs, breadcrumb separators, inline-with-12-px-caption pairings."],
  ["16 px", "h-4 w-4",    "Default UI size. Buttons (xs/sm), inputs, chevrons, kebabs, table actions."],
  ["20 px", "h-5 w-5",    "Lucide default. Toolbar actions, app-shell nav items, card header actions."],
  ["24 px", "h-6 w-6",    "Standalone affordances, alert / banner leading glyphs, empty-state guidance."],
  ["32 px", "h-8 w-8",    "Empty-state hero, category landing tiles, large badge inside a circle."],
  ["40 px", "h-10 w-10",  "Dashboard module tiles, marketing-style category headers. Sparingly."],
];

const LUCIDE_INVENTORY = [
  // [alias, lucideName, usage], kept alphabetical by alias
  ["alertTri",  "TriangleAlert", "Warning state, alert badge"],
  ["anchor",    "Anchor",        "Ports nav, port detail"],
  ["arrowDown", "ArrowDown",     "Sort desc, negative delta"],
  ["arrowUp",   "ArrowUp",       "Sort asc, positive delta"],
  ["bell",      "Bell",          "Notifications"],
  ["bolt",      "Zap",           "Offshore/Energy nav"],
  ["briefcase", "Briefcase",     "Portfolios nav"],
  ["building",  "Building",      "Property nav"],
  ["cargo",     "Container",     "Cargo nav, container metrics"],
  ["check",     "Check",         "Confirm, selected state, completed"],
  ["chev",      "ChevronRight",  "Disclosure, drill-in, breadcrumbs"],
  ["chevDown",  "ChevronDown",   "Dropdown trigger, accordion"],
  ["clipboard", "Clipboard",     "Copy action, audit"],
  ["clock",     "Clock",         "Time-range filters, history"],
  ["cloud",     "Cloud",         "Weather nav"],
  ["cloudrain", "CloudRain",     "Weather event glyph"],
  ["compass",   "Compass",       "Map orient, heading"],
  ["doc",       "FileText",      "Reports nav, document rows"],
  ["download",  "Download",      "Export, save file, download report"],
  ["factory",   "Factory",       "Industry classifications"],
  ["filter",    "Filter",        "Filter buttons, map filter menu"],
  ["gem",       "Gem",           "Assets search nav"],
  ["globe",     "Globe",         "Regions nav, world view toggle"],
  ["grid",      "LayoutGrid",    "Dashboard nav"],
  ["help",      "CircleHelp",    "Inline help, tooltips trigger"],
  ["layers",    "Layers",        "Map layer switcher"],
  ["leaf",      "Leaf",          "ESG / sustainability filters"],
  ["maximize",  "Maximize2",     "Map fullscreen enter"],
  ["menu",      "Menu",          "Sidebar trigger"],
  ["minimize",  "Minimize2",     "Map fullscreen exit"],
  ["minus",     "Minus",         "Zoom out, decrement"],
  ["news",      "Newspaper",     "News nav"],
  ["office",    "Building2",     "Companies nav"],
  ["pin",       "MapPin",        "Location refs in popovers and lists"],
  ["plane",     "Plane",         "Aviation nav, aircraft detail"],
  ["plus",      "Plus",          "Create actions"],
  ["radio",     "RadioTower",    "AIS / signal status"],
  ["search",    "Search",        "Toolbar, command palette"],
  ["shield",    "ShieldCheck",   "Permissions, security indicators"],
  ["ship",      "Ship",          "Marine nav, vessel detail"],
  ["tag",       "Tag",           "Labels menu, badge editor"],
  ["upload",    "Upload",        "Import data, attach file, upload report"],
  ["users",     "Users",         "Organizations, teams"],
  ["wave",      "Waves",         "NatCat nav, marine events"],
  ["x",         "X",             "Close, dismiss, remove chip"],
];

// Inline replicas (a few of the most common), for the spec page itself,
// which doesn't load Lucide. Strokes match Lucide's default (stroke-width=2,
// linecap/linejoin=round).
const LucideShim = {
  search:    "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm10 2-4.35-4.35",
  filter:    "M4 5h16M7 12h10M10 19h4",
  bell:      "M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9m6 13a3 3 0 0 1-3-3h6a3 3 0 0 1-3 3Z",
  ship:      "M3 18s2-1 9-1 9 1 9 1M5 14l1.5-7h11L19 14M12 4v3M9 21v-3m6 3v-3",
  plane:     "M21 12 3 18l4-6-4-6 18 6Z",
  anchor:    "M12 22V8M5 12H2a10 10 0 0 0 20 0h-3M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  layers:    "M12 2 2 7l10 5 10-5-10-5Zm-10 15 10 5 10-5M2 12l10 5 10-5",
  globe:     "M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z",
  plus:      "M12 5v14M5 12h14",
  check:     "M20 6 9 17l-5-5",
  x:         "M18 6 6 18M6 6l12 12",
  chev:      "m9 6 6 6-6 6",
  chevDown:  "m6 9 6 6 6-6",
  arrowUp:   "m5 12 7-7 7 7M12 19V5",
  arrowDown: "M12 5v14M5 12l7 7 7-7",
  maximize:  "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",
  alertTri:  "M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z",
  clock:     "M12 6v6l4 2M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z",
  pin:       "M12 22s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12ZM12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  tag:       "M20 13.41 11.42 22a2 2 0 0 1-2.84 0L2 15.42a2 2 0 0 1 0-2.84L10.59 4a2 2 0 0 1 1.41-.59H19a2 2 0 0 1 2 2v7.41a2 2 0 0 1-.59 1.41ZM7 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  users:     "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
};

const Lu = ({ name, size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className} aria-hidden="true"
    style={{ display: "block" }}
  >
    {(LucideShim[name] || "").split(/(?=M)/).filter(Boolean).map((d, i) => <path key={i} d={d} />)}
  </svg>
);

// Real Lucide glyphs from the live library (window.lucide, UMD). Each icon is an
// IconNode: an array of [tag, attrs] tuples. Falls back to the offline shim's
// generic glyph only if the library hasn't loaded.
const LuReal = ({ name, size = 20, className = "" }) => {
  const icon = (typeof window !== "undefined" && window.lucide)
    ? (window.lucide[name] || (window.lucide.icons && window.lucide.icons[name]))
    : null;
  // Lucide icon node: ["svg", svgAttrs, children]. We supply our own <svg> wrapper
  // and render only the children (paths/circles/etc.) at index [2].
  const children = Array.isArray(icon) && Array.isArray(icon[2]) ? icon[2] : null;
  if (!children) return <Lu name="tag" size={size} className={className} />;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
      style={{ display: "block" }}
    >
      {children.map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
};

const IconSizesPanel = () => (
  <table className="spec-table">
    <thead><tr><th>Size</th><th>Tailwind</th><th>Sample</th><th>Where to use it</th></tr></thead>
    <tbody>
      {ICON_SIZE_RULES.map(([px, tw, where]) => {
        const sz = parseInt(px, 10);
        return (
          <tr key={px}>
            <td><strong>{px}</strong></td>
            <td><code>{tw}</code></td>
            <td><span style={{ display: "inline-flex", color: "var(--slate-700)" }}><Lu name="bell" size={sz}/></span></td>
            <td style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>{where}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

const StrokeRules = () => (
  <div className="grid-3">
    <div className="ds-card">
      <div className="ds-card-head"><h3 className="ds-card-title">Stroke weight</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        Lucide default: <strong style={{ color: "var(--text-primary)" }}>2 px</strong>. Never thin Lucide icons below 1.5; they're designed for 2 and the optical balance breaks. Custom icons in the system follow the same weight.
      </div>
    </div>
    <div className="ds-card">
      <div className="ds-card-head"><h3 className="ds-card-title">Color</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        Always <code>currentColor</code>, icons inherit from their text or button context. Status-toned icons get their color from the parent (<code>.ds-alert--warning</code> etc.), never hardcoded.
      </div>
    </div>
    <div className="ds-card">
      <div className="ds-card-head"><h3 className="ds-card-title">Alignment</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        Icons inside a label use <code>display: inline-flex</code> + <code>gap: 4px</code> with the parent: never margins. Vertically centered to the cap-height, not the baseline.
      </div>
    </div>
  </div>
);

const A11yIconRules = () => (
  <div className="grid-2">
    <div className="ds-card">
      <div className="ds-card-head" style={{ background: "var(--success-050)" }}><h3 className="ds-card-title" style={{ color: "var(--success-700)" }}>DO</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6 }}>
        <div className="row" style={{ marginBottom: 12 }}>
          <button className="ds-btn ds-btn--secondary ds-btn--icon" aria-label="Filter vessels">
            <Lu name="filter" size={14}/>
          </button>
          <code style={{ fontSize: 11 }}>aria-label="Filter vessels"</code>
        </div>
        <div className="row">
          <button className="ds-btn ds-btn--primary"><Lu name="plus" size={14}/> Add policy</button>
          <code style={{ fontSize: 11 }}>icon + visible text · icon is <code>aria-hidden</code></code>
        </div>
      </div>
    </div>
    <div className="ds-card">
      <div className="ds-card-head" style={{ background: "var(--danger-050)" }}><h3 className="ds-card-title" style={{ color: "var(--danger-700)" }}>DON'T</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6 }}>
        <div className="row" style={{ marginBottom: 12 }}>
          <button className="ds-btn ds-btn--secondary ds-btn--icon">
            <Lu name="filter" size={14}/>
          </button>
          <code style={{ fontSize: 11, color: "var(--danger-700)" }}>icon-only · no aria-label</code>
        </div>
        <div className="row">
          <button className="ds-btn ds-btn--primary" aria-label="Add policy"><Lu name="plus" size={14}/> Add policy</button>
          <code style={{ fontSize: 11, color: "var(--danger-700)" }}>aria-label duplicates the visible text</code>
        </div>
      </div>
    </div>
  </div>
);

const IconographySection = () => (
  <>
    <div className="subsection" style={{ marginTop: 0 }}>
      <h3 className="subsection-title">Library: Lucide</h3>
      <p className="subsection-desc" style={{ maxWidth: 820 }}>
        Skytek uses <code className="inline">lucide@0.469.0</code> as its canonical icon library. Pinned, loaded as the UMD bundle, and resolved through a thin alias map.
        No second icon library ships with the product. New icons either come from Lucide or go through an RFC.
      </p>
      <pre className="code">{`<!-- Load order: before chrome.js, after Tailwind -->
<script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js"></script>

// app/ui/icons/lucide.ts: single source of truth for aliases + sizes
export const LUCIDE_NAMES = {
  menu:  'Menu',         grid:    'LayoutGrid',
  ship:  'Ship',         plane:   'Plane',
  bolt:  'Zap',          anchor:  'Anchor',
  cargo: 'Container',    pin:     'MapPin',
  // … see full inventory below
} as const;

export const LUCIDE_SIZES: Partial<Record<keyof typeof LUCIDE_NAMES, string>> = {
  search:    'h-4 w-4',   chev:      'h-4 w-4',
  arrowUp:   'h-3 w-3',   arrowDown: 'h-3 w-3',
  ship:      'h-10 w-10', plane:     'h-10 w-10',
};

export const I = new Proxy({} as Record<keyof typeof LUCIDE_NAMES, string>, {
  get: (_t, alias: string) => lucideIcon(alias),  // returns SVG string
});`}</pre>
      <p className="t-caption" style={{ marginTop: 8 }}>
        Use <code className="inline">{`${'$'}{I.alias}`}</code> in chrome / shell strings; use <code className="inline">&lt;Icon name="alias" /&gt;</code> in React.
        Modules never reach for <code className="inline">lucide.icons.ShipFront</code> directly: always through the alias map.
      </p>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Sizes</h3>
      <p className="subsection-desc">Seven discrete sizes. The Lucide grid is 24, anything between rasterizes poorly. Pick from the table; don't interpolate.</p>
      <IconSizesPanel />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Stroke, color &amp; alignment</h3>
      <StrokeRules />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Accessible icon buttons</h3>
      <p className="subsection-desc">
        Icon-only buttons need an <code className="inline">aria-label</code>. Icon+label buttons must not: the label IS the accessible name, and a redundant <code className="inline">aria-label</code> overrides it.
      </p>
      <A11yIconRules />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Inventory</h3>
      <p className="subsection-desc">
        The canonical alias map. Aliases are stable across product surfaces, when "ship" is added to a new module, every module already knows what it means.
        Adding to this list requires an RFC + entry in <code className="inline">LUCIDE_NAMES</code>.
      </p>
      <div className="panel">
        <div className="panel-head"><h4>{LUCIDE_INVENTORY.length} canonical aliases</h4><span className="meta">v1.0 · sync with chrome.js</span></div>
        <div style={{ padding: 8, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 0 }}>
          {LUCIDE_INVENTORY.map(([alias, lucide, use]) => (
            <div key={alias} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderTop: "1px solid var(--border-subtle)" }}>
              <span style={{ width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--slate-700)", background: "var(--slate-050)", borderRadius: "var(--radius-sm)", flexShrink: 0 }}>
                <LuReal name={lucide} size={16}/>
              </span>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600 }}><code style={{ color: "var(--brand-700)" }}>{alias}</code></div>
                <div className="t-caption" style={{ fontSize: 11 }}>{lucide} · {use}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="t-caption" style={{ marginTop: 8 }}>
        Icons above render from the live Lucide library (<code className="inline">lucide@0.469.0</code>): the same source the product uses.
      </p>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Custom icons</h3>
      <p className="subsection-desc">
        Almost everything is in Lucide. The few exceptions: brand glyphs (the Skytek "S" mark), domain shapes (the vessel teardrop on maps), and rating pills (A–E).
        Custom icons live in <code className="inline">app/ui/icons/custom/*.svg</code>, exported the same way as Lucide aliases, and follow the same 24-grid, 2-px stroke conventions.
      </p>
      <div className="callout warn">
        <strong>Before adding a custom icon, check Lucide first.</strong> The library has ~1,500 glyphs; most "we need a new icon" requests are actually solved by a less-obvious Lucide name.
      </div>
    </div>
  </>
);


/* ============================================================
   Density modes
   ============================================================ */

const DensityComparison = () => {
  const rows = [
    ["MV ATLANTIC PEARL",  "Container",    "Liberia",    "14.2 kn", "075°", "Underway"],
    ["MV NORDIC STAR",     "LNG Carrier",  "Norway",     "11.8 kn", "220°", "Underway"],
    ["MV MIRAMAR",         "Tanker",       "Panama",     "13.4 kn", "160°", "Underway"],
    ["MV SOUTHERN CROSS",  "Bulk Carrier", "Greece",     "10.9 kn", "320°", "At Anchor"],
    ["MV GULF VOYAGER",    "Tanker",       "Marshall I.","12.6 kn", "090°", "Underway"],
  ];
  const renderTable = (density) => (
    <div data-density={density} style={{ background: "var(--white)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
      <div className="ds-density-head" style={{ padding: density === "compact" ? "12px 16px" : "16px 16px" }}>
        <strong style={{ fontSize: 13 }}>Vessels</strong>
        <span className="t-caption" style={{ marginLeft: 8 }}>{rows.length} of 412 · <code style={{ fontSize: 11 }}>data-density="{density}"</code></span>
      </div>
      <table className="ds-table" style={{ tableLayout: "auto" }}>
        <thead>
          <tr><th>Vessel</th><th>Type</th><th>Flag</th><th className="num">Speed</th><th>Heading</th><th>Status</th></tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r[0]} style={{
              "--row-pad": density === "compact" ? "8px 12px" : "12px 12px",
            }}>
              {r.map((c, i) => (
                <td key={i} style={{
                  padding: density === "compact" ? "8px 12px" : "12px 12px",
                  fontSize: density === "compact" ? 12 : 13,
                }} className={i === 3 ? "num" : ""}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="grid-2" style={{ gap: 24 }}>
      <div>
        <div className="t-label" style={{ marginBottom: 8 }}>Comfortable · default for dashboards &amp; detail</div>
        {renderTable("comfortable")}
      </div>
      <div>
        <div className="t-label" style={{ marginBottom: 8 }}>Compact · default for data-heavy lists</div>
        {renderTable("compact")}
      </div>
    </div>
  );
};

const DensityTokenMatrix = () => (
  <table className="spec-table">
    <thead>
      <tr><th>Element</th><th>Comfortable</th><th>Compact</th><th>How it's wired</th></tr>
    </thead>
    <tbody>
      <tr><td>Row padding (table, list)</td><td>12 px y</td><td>8 px y</td><td><code>.ds-table.is-comfy</code> / <code>.ds-table.is-compact</code></td></tr>
      <tr><td>Body font size</td><td>13 px</td><td>12.5 px</td><td>Inherited via row class</td></tr>
      <tr><td>Card padding</td><td>16 px</td><td>12 px</td><td><code>[data-density="compact"] .ds-card-body</code></td></tr>
      <tr><td>Gap between siblings</td><td>16 px (<code>--space-4</code>)</td><td>12 px (<code>--space-3</code>)</td><td>Utility <code>.gap-density</code></td></tr>
      <tr><td>Section vertical padding</td><td>20 px</td><td>12 px</td><td>Utility <code>.py-density</code></td></tr>
      <tr><td>Sidebar nav item</td><td>8 px y</td><td>4 px y</td><td><code>[data-density] .ds-sidebar-item</code></td></tr>
      <tr><td>Form field height</td><td>32 px (md)</td><td>28 px (sm)</td><td><code>ds-input</code> + size class</td></tr>
      <tr><td>Button default size</td><td>md (32 px)</td><td>sm (28 px)</td><td>Component sets default from density context</td></tr>
    </tbody>
  </table>
);

const DensityDefaults = () => (
  <div className="panel">
    {[
      ["Surface",                            "Default density", "Why"],
    ].map(() => null)}
    {[
      ["Dashboards (Marine, Aviation, etc.)", "comfortable", "Information-light tiles; visual hierarchy comes from whitespace."],
      ["Detail pages (Vessel, Aircraft, Port)","comfortable", "Reading mode: operators dwell on individual records."],
      ["List + search (Assets, Companies)",   "compact",     "Operator scans 50+ rows; row count beats whitespace."],
      ["Tables inside cards (alerts, history)","compact",    "Local density: table compresses without affecting outer card."],
      ["Map popovers",                        "compact",     "Constrained 300 px width; every line counts."],
      ["Reports & exports",                   "comfortable", "Print medium; whitespace reads as quality."],
      ["Modals & overlays",                   "comfortable", "Single task focus."],
    ].map(([s, d, w]) => (
      <div key={s} className="token-row" style={{ gridTemplateColumns: "260px 130px 1fr" }}>
        <strong style={{ fontSize: 13 }}>{s}</strong>
        <span className={`ds-badge ds-badge--${d === "compact" ? "info" : "neutral"}`}>{d}</span>
        <span className="t-caption">{w}</span>
      </div>
    ))}
  </div>
);

const DensitySection = () => (
  <>
    <div className="subsection" style={{ marginTop: 0 }}>
      <h3 className="subsection-title">One attribute, two modes</h3>
      <p className="subsection-desc" style={{ maxWidth: 820 }}>
        Density is a single attribute on the <code className="inline">&lt;body&gt;</code>, <code className="inline">data-density="comfortable"</code> or <code className="inline">data-density="compact"</code>.
        Every density-aware component reads from it. Operators can switch globally via the Tweaks panel; individual surfaces can override locally on a parent element.
      </p>
      <pre className="code">{`<!-- Global, on <body> -->
<body data-density="compact">

<!-- Local override: affects only this subtree -->
<section data-density="compact">
  <table class="ds-table">…</table>
</section>

// Programmatic switch (from Tweaks)
document.body.dataset.density = 'compact';`}</pre>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Side by side</h3>
      <p className="subsection-desc">Same content, two densities. Same tokens. The diff is mechanical: no per-table styling, no inline padding.</p>
      <DensityComparison />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Token mapping</h3>
      <p className="subsection-desc">What density actually changes. Anything not listed here is density-invariant, colors, radii, type families, icon sizes don't move with density.</p>
      <DensityTokenMatrix />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Defaults by surface</h3>
      <p className="subsection-desc">The product picks an opinionated default per surface. Users can override; the spec records the starting point.</p>
      <DensityDefaults />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Density utilities</h3>
      <p className="subsection-desc">
        Two helpers for density-aware spacing in module code. They make density propagate to one-off sections without authoring a custom variant.
      </p>
      <pre className="code">{`/* In tokens.css */
[data-density="comfortable"] .py-density { padding-top: 20px;  padding-bottom: 20px;  }
[data-density="compact"]     .py-density { padding-top: 12px;  padding-bottom: 12px;  }
[data-density="comfortable"] .gap-density { gap: var(--space-4); }
[data-density="compact"]     .gap-density { gap: var(--space-3); }`}</pre>
      <p className="t-caption" style={{ marginTop: 8 }}>
        Reserved for cases where component-level density isn't enough. Don't reach for <code className="inline">.gap-density</code> if a stock <code className="inline">.ds-card</code> would do.
      </p>
    </div>

    <div className="callout">
      <strong>Density is presentation, not data.</strong> Switching modes never changes what's on screen, just how tightly it's packed. Don't gate features behind a density state.
    </div>
  </>
);


/* ============================================================
   Motion
   ============================================================ */

const DURATION_TOKENS = [
  ["--motion-instant",  "80 ms",  "Microinteractions: button press, checkbox tick, switch flip. Below the threshold of feeling 'animated'."],
  ["--motion-fast",     "140 ms", "Hover states, focus rings, color transitions, tooltip appear. Default for any single-property tween."],
  ["--motion-base",     "200 ms", "Component-level transitions: dropdown open, popover, expand/collapse, tab switch."],
  ["--motion-slow",     "320 ms", "Layout transitions, page-level reveals, modal mount, sidebar collapse. The ceiling."],
];

const EASING_TOKENS = [
  ["--ease-out",     "cubic-bezier(0.16, 1, 0.3, 1)", "Default for 'enters' and one-way transitions (open, reveal, slide-in). Decelerates fast then settles."],
  ["--ease-in-out",  "cubic-bezier(0.4, 0, 0.2, 1)",  "For reversible transitions where motion happens both directions (drawer open/close, tab pill)."],
  ["--ease-emphasis","cubic-bezier(0.34, 1.2, 0.64, 1)", "Reserved for tab pill, segmented control selection, micro-bounce on confirm. Overshoots ~5% then settles."],
];

const EasingCurve = ({ name, cp, color = "var(--brand-600)" }) => {
  // cp = "cubic-bezier(a, b, c, d)"
  const m = cp.match(/cubic-bezier\(([^)]+)\)/);
  const [a, b, c, d] = m ? m[1].split(",").map(s => parseFloat(s.trim())) : [0,0,1,1];
  const W = 120, H = 80;
  // y is inverted in SVG. progress goes from (0,1) bottom-left to (1,0) top-right.
  const x1 = a * W, y1 = (1 - b) * H;
  const x2 = c * W, y2 = (1 - d) * H;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} aria-hidden="true" style={{ display: "block" }}>
      <rect width={W} height={H} fill="var(--bg-canvas)" rx="4"/>
      <line x1="0" y1={H} x2={W} y2="0" stroke="var(--border-default)" strokeDasharray="2 3"/>
      <path d={`M 0 ${H} C ${x1} ${y1}, ${x2} ${y2}, ${W} 0`} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      {/* control points */}
      <circle cx={x1} cy={y1} r="2" fill={color} opacity="0.5"/>
      <circle cx={x2} cy={y2} r="2" fill={color} opacity="0.5"/>
    </svg>
  );
};

const MotionDurationDemo = () => {
  const [tick, setTick] = React.useState(0);
  return (
    <div className="panel">
      <div className="panel-head">
        <h4>Hover any token to feel its duration</h4>
        <button className="ds-btn ds-btn--ghost ds-btn--sm" onClick={() => setTick(t => t + 1)}>Replay all</button>
      </div>
      <div className="panel-body" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {DURATION_TOKENS.map(([token, ms]) => {
          const dur = parseInt(ms, 10);
          return (
            <div key={token} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div key={tick} className="motion-demo-card" style={{
                background: "var(--brand-050)",
                border: "1px solid var(--brand-100)",
                borderRadius: "var(--radius-md)",
                height: 64,
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
              }}>
                <div style={{
                  position: "absolute",
                  inset: 4,
                  background: "var(--brand-600)",
                  borderRadius: "var(--radius-sm)",
                  transform: "translateX(-100%)",
                  animation: `motion-slide-${dur} ${dur}ms var(--ease-out) forwards`,
                }}/>
                <style>{`@keyframes motion-slide-${dur} { to { transform: translateX(0); } }`}</style>
              </div>
              <div>
                <code style={{ fontSize: 11, color: "var(--brand-700)" }}>{token}</code>
                <div className="t-mono" style={{ fontSize: 11, color: "var(--text-muted)" }}>{ms}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SystemAnimations = () => (
  <table className="spec-table">
    <thead><tr><th>Animation</th><th>Where</th><th>Duration</th><th>Easing</th><th>Notes</th></tr></thead>
    <tbody>
      <tr>
        <td><code>pop</code></td>
        <td>Dropdowns, popovers, menus on open</td>
        <td>160 ms</td>
        <td><code>cubic-bezier(.2,.8,.2,1)</code></td>
        <td>Opacity 0→1 + translate-Y 4px + scale .98→1. <code>transform-origin: top right</code> for top-right anchored menus.</td>
      </tr>
      <tr>
        <td><code>pulse</code></td>
        <td>Live alert dots (sanctioned, AIS silence)</td>
        <td>1.8 s infinite</td>
        <td>linear</td>
        <td>Box-shadow ring fades from 50% opacity to 0. Pause via <code>prefers-reduced-motion</code>.</td>
      </tr>
      <tr>
        <td><code>skel</code></td>
        <td>Skeleton loaders</td>
        <td>1.4 s linear infinite</td>
        <td>linear</td>
        <td>Background-position sweep across a 3-stop gradient. Stop on focus, on tab change.</td>
      </tr>
      <tr>
        <td><code>anchor-pulse</code></td>
        <td>Section jump target (URL hash)</td>
        <td>1.4 s once</td>
        <td><code>var(--ease-out)</code></td>
        <td>Background flashes <code>--brand-100</code> → transparent. Confirms "I landed at the right place".</td>
      </tr>
    </tbody>
  </table>
);

const MotionRules = () => (
  <div className="grid-2">
    <div className="ds-card">
      <div className="ds-card-head"><h3 className="ds-card-title">Reduced motion</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        <p style={{ marginTop: 0 }}>Every transition above <code>--motion-fast</code> respects the OS preference:</p>
        <pre className="code" style={{ marginTop: 8 }}>{`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}</pre>
        <p style={{ marginBottom: 0 }}>Microinteractions at <code>--motion-instant</code> stay; they're the system's way of saying "I heard you".</p>
      </div>
    </div>
    <div className="ds-card">
      <div className="ds-card-head"><h3 className="ds-card-title">What never moves</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>Data values. A KPI counter never animates from 0 to the real number.</li>
          <li>Map basemap. Tile fade is the library default; we don't add to it.</li>
          <li>Page-level layout (sidebar collapse is the only exception).</li>
          <li>Alert glyphs. A live alert pulses; it doesn't slide into view.</li>
          <li>Anything during a print or PDF export.</li>
        </ul>
      </div>
    </div>
  </div>
);

const MotionSection = () => (
  <>
    <div className="subsection" style={{ marginTop: 0 }}>
      <h3 className="subsection-title">Why motion matters here</h3>
      <p className="subsection-desc" style={{ maxWidth: 820 }}>
        Skytek is a monitoring product. Motion has one job: confirm that the system heard the operator, or signal that something on screen changed.
        Anything beyond that is decoration, and decoration costs reading time during an incident. The rules below are deliberately conservative.
      </p>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Duration tokens</h3>
      <p className="subsection-desc">Four durations. Pick from the list: no in-between values, no per-component overrides.</p>
      <div className="panel">
        {DURATION_TOKENS.map(([token, ms, where]) => (
          <div key={token} className="token-row" style={{ gridTemplateColumns: "180px 90px 1fr" }}>
            <code>{token}</code>
            <span className="t-mono" style={{ color: "var(--brand-700)" }}>{ms}</span>
            <span className="t-caption">{where}</span>
          </div>
        ))}
      </div>
      <MotionDurationDemo />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Easing tokens</h3>
      <p className="subsection-desc">Two everyday easings and one reserved easing for selection feedback. Linear is for repeating animations only (pulse, skeleton).</p>
      <div className="grid-3">
        {EASING_TOKENS.map(([token, cp, where]) => (
          <div key={token} className="ds-card">
            <div className="ds-card-head"><h3 className="ds-card-title"><code style={{ color: "var(--brand-700)" }}>{token}</code></h3></div>
            <div className="ds-card-body">
              <EasingCurve name={token} cp={cp} color={token.includes("emphasis") ? "var(--chart-cat-2)" : "var(--brand-600)"} />
              <div className="t-mono" style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 8 }}>{cp}</div>
              <p className="t-caption" style={{ marginTop: 4, marginBottom: 0 }}>{where}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">System animations</h3>
      <p className="subsection-desc">Named keyframes that ship with the system. Modules consume by class: never duplicate the keyframes locally.</p>
      <SystemAnimations />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Reduced motion &amp; restraint</h3>
      <MotionRules />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Composing transitions</h3>
      <pre className="code">{`/* Default: single-property tween at fast duration */
.ds-btn { transition: background var(--motion-fast) var(--ease-out),
                      border-color var(--motion-fast) var(--ease-out),
                      box-shadow var(--motion-fast) var(--ease-out); }

/* Component-level: a popover */
.ds-popover { transition: opacity var(--motion-base) var(--ease-out),
                          transform var(--motion-base) var(--ease-out); }

/* Reversible: drawer */
.ds-drawer { transition: transform var(--motion-slow) var(--ease-in-out); }

/* Selection: tab pill, the only place ease-emphasis is allowed */
.ds-tab-pill { transition: transform var(--motion-slow) var(--ease-emphasis),
                           width     var(--motion-slow) var(--ease-emphasis); }`}</pre>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Scrollbars</h3>
      <p className="subsection-desc" style={{ maxWidth: 820 }}>
        One scrollbar treatment everywhere: a <strong>6&nbsp;px</strong> thin bar with a brand-blue thumb on a light-grey track.
        It replaces the OS default so dense tables, map popovers and side panels read as part of the product rather than the operating system.
        The page root gets it automatically; for any inner scroll container, add the <code className="inline">.ds-scroll</code> class (or <code className="inline">data-scroll</code> attribute).
      </p>

      <div className="grid-2" style={{ gap: 24, alignItems: "start" }}>
        <div>
          <div className="t-label" style={{ marginBottom: 8 }}>Live: vertical <code style={{ fontSize: 11 }}>.ds-scroll</code></div>
          <div className="ds-scroll" style={{ height: 200, overflowY: "auto", background: "var(--white)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: "8px 16px" }}>
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} style={{ padding: "8px 0", borderBottom: i < 23 ? "1px solid var(--border-subtle)" : "none", fontSize: 13, color: "var(--text-secondary)", display: "flex", justifyContent: "space-between" }}>
                <span>Vessel record {String(i + 1).padStart(2, "0")}</span>
                <span className="t-mono" style={{ color: "var(--text-muted)", fontSize: 11 }}>{(12 + i * 0.3).toFixed(1)} kn</span>
              </div>
            ))}
          </div>
          <p className="t-caption" style={{ marginTop: 4 }}>Scroll the panel: thumb is <code style={{ fontSize: 11 }}>--brand-500</code>, track is <code style={{ fontSize: 11 }}>--slate-100</code>.</p>
        </div>

        <div>
          <div className="t-label" style={{ marginBottom: 8 }}>Tokens</div>
          <div className="panel">
            {[
              ["--scrollbar-size",        "6px",          "Bar thickness (width & height)"],
              ["--scrollbar-track",       "--slate-100",  "Track: light grey"],
              ["--scrollbar-thumb",       "--brand-500",  "Thumb: theme color"],
              ["--scrollbar-thumb-hover", "--brand-600",  "Thumb on hover"],
            ].map(([token, val, where]) => (
              <div key={token} className="token-row" style={{ gridTemplateColumns: "200px 110px 1fr" }}>
                <code>{token}</code>
                <span className="t-mono" style={{ color: "var(--brand-700)" }}>{val}</span>
                <span className="t-caption">{where}</span>
              </div>
            ))}
          </div>
          <div className="callout" style={{ marginTop: 12 }}>
            <strong>Firefox note:</strong> <code>scrollbar-width</code> only supports <code>thin</code>/<code>auto</code>, so Firefox renders a system-thin bar (≈ 8–11 px) rather than an exact 6 px, but the brand thumb &amp; grey track colors match. WebKit/Blink honour the precise 6 px.
          </div>
        </div>
      </div>

      <pre className="code" style={{ marginTop: 16 }}>{`:root {
  --scrollbar-size:        6px;
  --scrollbar-track:       var(--slate-100);   /* light grey */
  --scrollbar-thumb:       var(--brand-500);   /* theme color */
  --scrollbar-thumb-hover: var(--brand-600);
}

/* Firefox */
html, .ds-scroll, [data-scroll] {
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
}

/* WebKit / Blink, Chrome, Safari, Edge, Opera */
.ds-scroll::-webkit-scrollbar       { width: var(--scrollbar-size); height: var(--scrollbar-size); }
.ds-scroll::-webkit-scrollbar-track { background: var(--scrollbar-track); border-radius: 9999px; }
.ds-scroll::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 9999px; }
.ds-scroll::-webkit-scrollbar-thumb:hover { background: var(--scrollbar-thumb-hover); }`}</pre>

      <div className="callout warn" style={{ marginTop: 12 }}>
        <strong>Don't hide scrollbars.</strong> Operators need to know how much more is below the fold during an incident. Style the bar: never set <code>scrollbar-width: none</code> or <code>::-webkit-scrollbar &#123; display:none &#125;</code> on data regions.
      </div>
    </div>

    <div className="subsection" id="scrolling">
      <h3 className="subsection-title">Scrolling &amp; overflow</h3>
      <p className="subsection-desc" style={{ maxWidth: 820 }}>
        How content scrolls, which element scrolls, and when overflow may be hidden (v4.4.0).
        <code className="inline">.ds-scroll</code> is the scrollbar skin only; scroll <strong>regions</strong> use <code className="inline">.ds-scroll-y</code> or
        <code className="inline">.ds-scroll-x</code>, which include the skin and add the behaviour below.
      </p>
      <div className="grid-2" style={{ gap: 24, alignItems: "start" }}>
        <div>
          <div className="t-label" style={{ marginBottom: 8 }}>Live: <code style={{ fontSize: 11 }}>.ds-scroll-x .ds-scroll-fade-x</code></div>
          <div className="ds-scroll-x ds-scroll-fade-x" tabIndex={0} role="region" aria-label="Example wide table" style={{ border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", background: "var(--white)" }}>
            <table className="spec-table" style={{ minWidth: 960, border: 0 }}>
              <thead><tr>{["Vessel","IMO","Flag","Type","Built","GT","DWT","Status"].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>{[0,1,2].map(r => <tr key={r}>{["Atlantic Star","9307243","Cyprus","Container","2006","54,214","66,940","Active"].map((v,i) => <td key={i}>{v}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p className="t-caption" style={{ marginTop: 4 }}>Tab to the table and use the arrow keys; the edges fade while more content sits off-screen.</p>
        </div>
        <div>
          <div className="t-label" style={{ marginBottom: 8 }}>Tokens</div>
          <div className="panel">
            {[["--scrollbar-size","6px","Bar thickness"],["--scroll-offset","72px","Top bar (56) + 16: scroll-padding for anchors and focus"],["--popover-max-height","—","Menus and popovers scroll inside this height"]].map(([t, v, w]) => (
              <div key={t} className="token-row" style={{ gridTemplateColumns: "200px 80px 1fr" }}><code>{t}</code><span className="t-mono" style={{ color: "var(--brand-700)" }}>{v}</span><span className="t-caption">{w}</span></div>
            ))}
          </div>
        </div>
      </div>
      <table className="spec-table" style={{ marginTop: 16 }}>
        <thead><tr><th style={{ width: 190 }}>Rule</th><th>Do</th><th style={{ width: 230 }}>Why</th></tr></thead>
        <tbody>
          <tr><td><strong>One scroller per view</strong></td><td>The app shell never scrolls; the content region does. Nest a scroll region only for a list, table or panel with its own fixed height.</td><td>Predictable wheel and touch behaviour.</td></tr>
          <tr><td><strong>overflow: auto</strong></td><td>Use <code className="inline">auto</code>, never <code className="inline">scroll</code> (permanent empty bars).</td><td>Bars appear only when needed.</td></tr>
          <tr><td><strong>overflow: hidden</strong></td><td>Only to clip decoration (rounded corners, images, animations) or truncated text with an ellipsis and a full-text tooltip. Never to hide content a user needs.</td><td>Hidden content is lost content.</td></tr>
          <tr><td><strong>No sideways page scroll</strong></td><td>The page never scrolls horizontally down to 320px wide. Wide tables, code and charts scroll inside <code className="inline">.ds-scroll-x</code>, with a <code className="inline">min-width</code> on the table and the first column sticky where it helps.</td><td>WCAG 1.4.10 Reflow.</td></tr>
          <tr><td><strong>Contain nested scrolling</strong></td><td>Modals, drawers, popovers, menus and side panels use <code className="inline">overscroll-behavior: contain</code> (built into <code className="inline">.ds-scroll-y</code>).</td><td>Reaching the end of a list never scrolls the page behind it.</td></tr>
          <tr><td><strong>Lock the page under overlays</strong></td><td>While a modal or full drawer is open, add <code className="inline">.ds-scroll-lock</code> to the page scroll root; remove it on close and restore the scroll position.</td><td>The background stays put; no layout shift.</td></tr>
          <tr><td><strong>Stable gutters</strong></td><td>Scroll regions reserve the bar’s space (<code className="inline">scrollbar-gutter: stable</code>).</td><td>Content does not jump when the list grows.</td></tr>
          <tr><td><strong>Maximum heights</strong></td><td>Menus, dropdowns and popovers scroll inside <code className="inline">--popover-max-height</code>; modal bodies scroll between a fixed header and footer; drawers keep a sticky header and action bar.</td><td>Actions stay reachable.</td></tr>
          <tr><td><strong>Keyboard access</strong></td><td>A scroll region without focusable content gets <code className="inline">tabindex="0"</code>, <code className="inline">role="region"</code> and an <code className="inline">aria-label</code>; it shows the focus ring.</td><td>WCAG 2.1.1 Keyboard.</td></tr>
          <tr><td><strong>Clear the sticky header</strong></td><td>The page root has <code className="inline">scroll-padding-top: var(--scroll-offset)</code>; anchors and focused fields land below the top bar.</td><td>Nothing hides under the header.</td></tr>
          <tr><td><strong>Show there is more</strong></td><td>Horizontal tab strips and tables that overflow use <code className="inline">.ds-scroll-fade-x</code> (or arrows). Never hide a scrollbar without such a hint.</td><td>Off-screen content is discoverable.</td></tr>
          <tr><td><strong>Smooth scrolling</strong></td><td>Only for in-page jumps (back to top, anchor links), and never under <code className="inline">prefers-reduced-motion</code>.</td><td>Motion budget.</td></tr>
          <tr><td><strong>Touch</strong></td><td>Use the platform’s momentum scrolling; do not restyle or hide touch scrollbars.</td><td>Native feel on mobile.</td></tr>
        </tbody>
      </table>
    </div>

    <div className="callout">
      <strong>The motion test:</strong> if removing an animation makes the UI <em>worse</em>, keep it. If removing it makes the UI <em>faster</em>, it was decoration. Default to the second.
    </div>
  </>
);

window.IconographySection = IconographySection;
window.DensitySection = DensitySection;
window.MotionSection = MotionSection;
