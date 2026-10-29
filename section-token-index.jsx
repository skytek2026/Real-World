/* Section — Token index: every CSS variable, searchable */

const TOKEN_CATALOG = [
  // [name, type, value, where]
  // Color · Brand
  ["--brand-600", "color", "#2d7ffb",  "Primary action, key headings, link hover"],
  ["--brand-500", "color", "#51a2fc",  "Hover/highlight, default link"],
  ["--brand-400", "color", "#8ec5fd",  "Accent, focus rings"],
  ["--brand-300", "color", "#bfdbfe",  "Decorative, subtle accent"],
  ["--brand-100", "color", "#dbeafe",  "Tint backgrounds"],
  ["--brand-050", "color", "#eff6ff",  "Lightest brand tint"],
  // Color · Slate
  ["--slate-950", "color", "#0B1220",  "Deepest text, dark surface base"],
  ["--slate-900", "color", "#111827",  "Primary text"],
  ["--slate-800", "color", "#1F2937",  "Dark surface variant"],
  ["--slate-700", "color", "#374151",  "Secondary text on white"],
  ["--slate-600", "color", "#4B5563",  "Secondary text mapping"],
  ["--slate-500", "color", "#6B7280",  "Muted text"],
  ["--slate-400", "color", "#9CA3AF",  "Disabled text, placeholders"],
  ["--slate-300", "color", "#D1D5DB",  "Strong borders"],
  ["--slate-200", "color", "#E5E7EB",  "Default borders"],
  ["--slate-150", "color", "#ECEEF2",  "Subtle borders"],
  ["--slate-100", "color", "#F3F4F6",  "Muted surfaces"],
  ["--slate-50",  "color", "#F9FAFB",  "App background, sunken rows"],
  ["--white",     "color", "#FFFFFF",  "Cards, modals, raised surfaces"],
  // Color · Status
  ["--success-700", "color", "#15803D",  "Success text, success badges"],
  ["--success-500", "color", "#16A34A",  "Success fill, OK glyph border"],
  ["--success-100", "color", "#DCFCE7",  "Success badge bg"],
  ["--success-050", "color", "#F0FDF4",  "Success alert bg"],
  ["--warning-700", "color", "#B45309",  "Warning text, warning badges"],
  ["--warning-500", "color", "#D97706",  "Warning fill, alert glyph border"],
  ["--warning-100", "color", "#FEF3C7",  "Warning badge bg"],
  ["--warning-050", "color", "#FFFBEB",  "Warning alert bg"],
  ["--danger-700",  "color", "#B91C1C",  "Danger text, danger badges"],
  ["--danger-500",  "color", "#DC2626",  "Danger fill, danger glyph border"],
  ["--danger-100",  "color", "#FEE2E2",  "Danger badge bg"],
  ["--danger-050",  "color", "#FEF2F2",  "Danger alert bg"],
  ["--info-700",    "color", "#1D4ED8",  "Info text, info badges"],
  ["--info-500",    "color", "#2563EB",  "Info fill"],
  ["--info-100",    "color", "#DBEAFE",  "Info badge bg"],
  ["--info-050",    "color", "#EFF6FF",  "Info alert bg"],
  // Color · Rating (locked)
  ["--rating-a", "color", "#2E7D4F", "Risk rating A (best). Locked — domain semantic."],
  ["--rating-b", "color", "#6FA84A", "Risk rating B"],
  ["--rating-c", "color", "#C9A227", "Risk rating C"],
  ["--rating-d", "color", "#D97706", "Risk rating D"],
  ["--rating-e", "color", "#C0392B", "Risk rating E (worst)"],
  // Semantic · surfaces
  ["--bg-app",      "semantic", "var(--slate-50)",  "Default page background"],
  ["--bg-canvas",   "semantic", "#F5F7FA",          "Map / dashboard canvas"],
  ["--bg-surface",  "semantic", "var(--white)",     "Cards, modals, panels"],
  ["--bg-raised",   "semantic", "var(--white)",     "Elevated surfaces"],
  ["--bg-sunken",   "semantic", "var(--slate-50)",  "Form rows, inset blocks"],
  ["--bg-muted",    "semantic", "var(--slate-100)", "Disabled, placeholders"],
  ["--bg-inverse",  "semantic", "var(--slate-900)", "Dark surfaces, tooltips"],
  ["--border-subtle",  "semantic", "var(--slate-150)", "Internal dividers"],
  ["--border-default", "semantic", "var(--slate-200)", "Cards, inputs, buttons"],
  ["--border-strong",  "semantic", "var(--slate-300)", "Hover, emphasized"],
  // Semantic · text
  ["--text-primary",   "semantic", "var(--slate-900)", "Body, headings"],
  ["--text-secondary", "semantic", "var(--slate-600)", "Supporting copy"],
  ["--text-muted",     "semantic", "var(--slate-500)", "Help, captions, meta"],
  ["--text-disabled",  "semantic", "var(--slate-400)", "Disabled controls"],
  ["--text-inverse",   "semantic", "var(--white)",     "On dark surfaces"],
  ["--text-link",      "semantic", "var(--brand-500)", "Inline links"],
  ["--text-on-brand",  "semantic", "var(--white)",     "On primary buttons"],
  // Type
  ["--font-sans",    "type", "Inter · system-ui",  "Default body family"],
  ["--font-display", "type", "Exo · Inter · Lato · system-ui",  "Headings, titles"],
  ["--font-mono",    "type", "JetBrains Mono · SF Mono",        "Code, numbers, tokens"],
  // Spacing
  ["--space-0",  "spacing", "0",     "Zero rail"],
  ["--space-1",  "spacing", "4px",   "Tight inline gap"],
  ["--space-2",  "spacing", "8px",   "Default inline gap"],
  ["--space-3",  "spacing", "12px",  "Compact group gap"],
  ["--space-4",  "spacing", "16px",  "Default group gap (sibling default)"],
  ["--space-5",  "spacing", "20px",  "Section interior"],
  ["--space-6",  "spacing", "24px",  "Card / panel padding"],
  ["--space-7",  "spacing", "32px",  "Major break between content blocks"],
  ["--space-8",  "spacing", "40px",  "Hero / module padding"],
  ["--space-9",  "spacing", "48px",  "Page section padding (small viewport)"],
  ["--space-10", "spacing", "64px",  "Page section padding (default)"],
  ["--space-11", "spacing", "96px",  "Empty-state padding, marketing hero"],
  // Radius
  ["--radius-xs",   "radius", "2px",     "Code chips, tiny pills"],
  ["--radius-sm",   "radius", "4px",     "Buttons (sm), badges, inputs (sm)"],
  ["--radius-md",   "radius", "6px",     "Buttons, inputs, panels, alerts (default)"],
  ["--radius-lg",   "radius", "8px",     "Cards, panels, surfaces"],
  ["--radius-xl",   "radius", "12px",    "Modals, popovers, large cards"],
  ["--radius-pill", "radius", "9999px",  "Pills, tabs, chips"],
  // Shadow
  ["--card-shadow-flat",   "shadow", "0 0 #0000", "No elevation"],
  ["--card-shadow-rest",   "shadow", "2-layer, soft", "Resting cards, inputs at rest"],
  ["--card-shadow-hover",  "shadow", "2-layer, lifted", "Hovered cards, popovers"],
  ["--card-shadow-active", "shadow", "2-layer, deeper", "Pressed / dragged elements"],
  ["--card-shadow-raised", "shadow", "2-layer, lifted further", "Drawers, sticky cards, map toolbar"],
  ["--card-shadow-modal",  "shadow", "2-layer, dramatic", "Modals, command palette, popups"],
  // Motion
  ["--motion-instant", "motion", "80ms",  "Microinteraction: button press, switch tick"],
  ["--motion-fast",    "motion", "140ms", "Hover, focus, color transitions"],
  ["--motion-base",    "motion", "200ms", "Component-level: dropdown, popover, tab"],
  ["--motion-slow",    "motion", "320ms", "Layout: modal mount, drawer, page reveal"],
  ["--ease-out",       "motion", "cubic-bezier(0.16, 1, 0.3, 1)",     "Default — enters, reveals"],
  ["--ease-in-out",    "motion", "cubic-bezier(0.4, 0, 0.2, 1)",      "Reversible transitions"],
  ["--ease-emphasis",  "motion", "cubic-bezier(0.34, 1.2, 0.64, 1)",  "Tab pill, selection — overshoots slightly"],
  // Z-index
  ["--z-base",    "z-index", "1",    "Default stacking"],
  ["--z-sticky",  "z-index", "100",  "Sticky headers, scrolling chrome"],
  ["--z-overlay", "z-index", "1000", "Popovers, dropdowns"],
  ["--z-modal",   "z-index", "1100", "Modals"],
  ["--z-toast",   "z-index", "1200", "Toasts (always on top)"],
  // Chart palette · categorical
  ["--chart-cat-1", "chart", "#2d7ffb", "Series 1 — primary blue"],
  ["--chart-cat-2", "chart", "#D97706", "Series 2 — amber"],
  ["--chart-cat-3", "chart", "#16A34A", "Series 3 — green"],
  ["--chart-cat-4", "chart", "#9333EA", "Series 4 — purple"],
  ["--chart-cat-5", "chart", "#DB2777", "Series 5 — pink"],
  ["--chart-cat-6", "chart", "#0891B2", "Series 6 — cyan"],
  ["--chart-cat-7", "chart", "#65A30D", "Series 7 — lime"],
  ["--chart-cat-8", "chart", "#475569", "Series 8 — slate"],
  // Chart · sequential
  ["--chart-seq-1", "chart", "#eff6ff", "Sequential ramp · low"],
  ["--chart-seq-2", "chart", "#dbeafe", "Sequential ramp"],
  ["--chart-seq-3", "chart", "#bfdbfe", "Sequential ramp"],
  ["--chart-seq-4", "chart", "#8ec5fd", "Sequential ramp"],
  ["--chart-seq-5", "chart", "#51a2fc", "Sequential ramp"],
  ["--chart-seq-6", "chart", "#2d7ffb", "Sequential ramp"],
  ["--chart-seq-7", "chart", "#1d4ed8", "Sequential ramp · high"],
  // Chart · divergent
  ["--chart-div-neg-3", "chart", "#B91C1C", "Divergent · −high"],
  ["--chart-div-neg-2", "chart", "#DC2626", "Divergent · −med"],
  ["--chart-div-neg-1", "chart", "#FCA5A5", "Divergent · −low"],
  ["--chart-div-zero",  "chart", "#F3F4F6", "Divergent · zero"],
  ["--chart-div-pos-1", "chart", "#86EFAC", "Divergent · +low"],
  ["--chart-div-pos-2", "chart", "#16A34A", "Divergent · +med"],
  ["--chart-div-pos-3", "chart", "#15803D", "Divergent · +high"],
  // Chart · structure
  ["--chart-threshold-warn",   "chart", "var(--warning-500)", "Warning threshold line"],
  ["--chart-threshold-danger", "chart", "var(--danger-500)",  "Danger threshold line"],
  ["--chart-grid",             "chart", "var(--slate-150)",   "Horizontal gridlines"],
  ["--chart-axis",             "chart", "var(--slate-400)",   "Axis line"],
  ["--chart-axis-label",       "chart", "var(--slate-500)",   "Axis label color"],
  // Map · basemap + glyph
  ["--map-water",       "map", "#DCE7F2",         "Sea / water fill (override basemap fallback)"],
  ["--map-land",        "map", "#F5F5F2",         "Land fill (light basemap fallback)"],
  ["--map-border",      "map", "#C7D2DD",         "Country / region outlines"],
  ["--map-label",       "map", "var(--slate-700)", "Place names"],
  ["--map-label-light", "map", "var(--slate-500)", "Minor labels"],
  ["--glyph-ok",        "map", "var(--success-500)", "OK glyph border on map markers"],
  ["--glyph-alert",     "map", "var(--warning-500)", "Alert glyph border"],
  ["--glyph-danger",    "map", "var(--danger-500)",  "Danger glyph border"],
  ["--glyph-muted",     "map", "var(--slate-400)",   "Stale / muted glyph border"],
];

const TOKEN_GROUPS = [
  { key: "all",      label: "All" },
  { key: "color",    label: "Color" },
  { key: "semantic", label: "Semantic" },
  { key: "type",     label: "Type" },
  { key: "spacing",  label: "Spacing" },
  { key: "radius",   label: "Radius" },
  { key: "shadow",   label: "Shadow" },
  { key: "motion",   label: "Motion" },
  { key: "z-index",  label: "Z-index" },
  { key: "chart",    label: "Chart" },
  { key: "map",      label: "Map" },
];

const TokenPreview = ({ type, value }) => {
  if (type === "color" || type === "semantic" || type === "chart" || type === "map") {
    if (value.startsWith("#") || value.startsWith("var(")) {
      return <span className="ds-token-swatch-bar" style={{ background: value }} />;
    }
    if (value === "0 0 #0000") {
      return <span className="ds-token-swatch-bar" style={{ background: "transparent" }} />;
    }
    return <span className="ds-token-swatch-bar" style={{ background: "var(--slate-100)" }} />;
  }
  if (type === "spacing") {
    const px = parseInt(value, 10);
    return <span className="ds-token-spacing-bar" style={{ width: Math.max(2, Math.min(64, px)) + "px", height: 14 }} />;
  }
  if (type === "radius") {
    return <span className="ds-token-radius-box" style={{ borderRadius: value === "9999px" ? "9999px" : value }} />;
  }
  if (type === "shadow") {
    return <span className="ds-token-shadow-box" style={{ boxShadow: `var(${value === "0 0 #0000" ? "--card-shadow-flat" : ""}, 0 2px 4px rgba(0,0,0,0.06))` }} />;
  }
  if (type === "motion") {
    if (value.endsWith("ms") || value.endsWith("s")) {
      return (
        <span style={{ display: "inline-block", width: 48, height: 8, background: "var(--slate-150)", borderRadius: 4, position: "relative", overflow: "hidden" }}>
          <span style={{
            position: "absolute", top: 0, left: 0, width: 8, height: "100%",
            background: "var(--brand-600)", borderRadius: 4,
            animation: `motion-token-pulse ${value} var(--ease-out) infinite alternate`,
          }}/>
        </span>
      );
    }
    return <span className="t-mono" style={{ fontSize: 10, color: "var(--brand-600)" }}>ƒ</span>;
  }
  if (type === "z-index") {
    return <span className="t-mono" style={{ fontSize: 11, color: "var(--brand-600)" }}>{value}</span>;
  }
  if (type === "type") {
    return <span style={{ fontFamily: value.split(" ")[0], fontSize: 13, fontWeight: 600 }}>Aa</span>;
  }
  return <span />;
};

const TokenIndexToolbar = ({ query, setQuery, group, setGroup, counts, total }) => (
  <div className="ds-token-toolbar">
    <span className="ds-search-input" style={{ minWidth: 240 }}>
      <Icon d={I.search} size={14}/>
      <input
        type="text"
        placeholder={`Search ${total} tokens…`}
        value={query}
        onChange={e => setQuery(e.target.value)}
        aria-label="Search tokens"
      />
    </span>
    <div className="ds-token-pill-row" role="tablist" aria-label="Token category">
      {TOKEN_GROUPS.map(g => (
        <button
          key={g.key}
          role="tab"
          aria-selected={group === g.key}
          className={`ds-token-pill ${group === g.key ? "is-active" : ""}`}
          onClick={() => setGroup(g.key)}
        >
          {g.label}
          <span className="count">{counts[g.key] || 0}</span>
        </button>
      ))}
    </div>
  </div>
);

const TokenIndexSection = () => {
  const [query, setQuery] = React.useState("");
  const [group, setGroup] = React.useState("all");

  const matches = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOKEN_CATALOG.filter(([name, type, value, where]) => {
      if (group !== "all" && type !== group) return false;
      if (!q) return true;
      return name.toLowerCase().includes(q)
        || value.toLowerCase().includes(q)
        || where.toLowerCase().includes(q);
    });
  }, [query, group]);

  const counts = React.useMemo(() => {
    const c = { all: TOKEN_CATALOG.length };
    TOKEN_CATALOG.forEach(([, type]) => { c[type] = (c[type] || 0) + 1; });
    return c;
  }, []);

  // Group matches by type for display
  const grouped = React.useMemo(() => {
    const m = {};
    matches.forEach(t => {
      const type = t[1];
      if (!m[type]) m[type] = [];
      m[type].push(t);
    });
    return m;
  }, [matches]);

  const orderedTypes = ["color", "semantic", "type", "spacing", "radius", "shadow", "motion", "z-index", "chart", "map"];

  return (
    <>
      <style>{`@keyframes motion-token-pulse { from { transform: translateX(0); } to { transform: translateX(40px); } }`}</style>

      <div className="subsection" style={{ marginTop: 0 }}>
        <h3 className="subsection-title">Why this exists</h3>
        <p className="subsection-desc" style={{ maxWidth: 820 }}>
          One searchable list of every CSS variable in the system — what it is, what it's worth, and where it's used.
          The fastest answer to "what's the token for X" without flipping between Foundations chapters. The whole inventory below renders directly from
          the token catalog; filter by category or search by name, value, or use-case.
        </p>
      </div>

      <TokenIndexToolbar query={query} setQuery={setQuery} group={group} setGroup={setGroup} counts={counts} total={TOKEN_CATALOG.length}/>

      {matches.length === 0 && (
        <div className="ds-token-empty">
          No tokens match <strong>{query}</strong>. Try the category pills above or clear the search.
        </div>
      )}

      {orderedTypes.map(type => {
        const rows = grouped[type];
        if (!rows || rows.length === 0) return null;
        const groupLabel = TOKEN_GROUPS.find(g => g.key === type)?.label ?? type;
        return (
          <div key={type} className="ds-token-group">
            <div className="ds-token-group-head">
              <h4>{groupLabel}</h4>
              <span className="count">{rows.length} {rows.length === 1 ? "token" : "tokens"}</span>
            </div>
            <div>
              {rows.map(([name, t, value, where]) => (
                <div key={name} className="ds-token-list-row" data-copy={name} data-copy-label={`Copy ${name}`}>
                  <div className="preview"><TokenPreview type={t} value={value}/></div>
                  <code>{name}</code>
                  <span className="value">{value}</span>
                  <span className="where">{where}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="callout" style={{ marginTop: 32 }}>
        <strong>This index is the contract.</strong> If a token is in here, it ships in the system and engineers can rely on it. If it's not in here, it doesn't exist — module-local values get rejected at lint.
      </div>
    </>
  );
};

window.TokenIndexSection = TokenIndexSection;
