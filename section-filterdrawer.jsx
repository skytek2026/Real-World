/* Section: Filter drawer (full specification)
   Documents the drawer shipped on Assets Search: right-edge sheet,
   single-open accordion sections, live-apply filtering.
   Demo uses the real .ds-fdrawer CSS so docs and component can't drift. */

const FD_SECTIONS = [
  { name: "Asset Type", kind: "list", options: ["Container", "Bulk Carrier", "Tanker", "Gas Carrier", "LNG Carrier", "General Cargo", "Vehicle Carrier", "Yacht"] },
  { name: "Flag", kind: "list", options: ["Cyprus", "China", "Germany", "Liberia", "Marshall Islands", "Panama", "Singapore"] },
  { name: "Length", kind: "range", lo: 33, hi: 399, unit: "m" },
  { name: "Gross Tonnage", kind: "range", lo: 3660, hi: 219079, unit: "GT" },
  { name: "YOB", kind: "range", lo: 2004, hi: 2018, unit: "" },
];

const FilterDrawerDemo = ({ triggerForm = "labelled", initialSel }) => {
  const [open, setOpen] = React.useState(false);
  const [acc, setAcc] = React.useState(0);
  const [sel, setSel] = React.useState(() => initialSel || {});      // name → Set of unchecked-off values
  const [ranges, setRanges] = React.useState({}); // name → [min,max]
  const panelRef = React.useRef(null);
  const triggerRef = React.useRef(null);

  const isActive = (s) =>
    s.kind === "range" ? !!ranges[s.name] : !!(sel[s.name] && sel[s.name].size);
  const anyActive = FD_SECTIONS.some(isActive);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); triggerRef.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus({ preventScroll: true });
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleVal = (name, v) => setSel(p => {
    const next = new Set(p[name] || []);
    next.has(v) ? next.delete(v) : next.add(v);
    return { ...p, [name]: next };
  });

  const resetAll = () => { setSel({}); setRanges({}); };

  return (
    <>
      {triggerForm === "labelled" ? (
        <button ref={triggerRef} className="ds-btn ds-btn--secondary" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>
          <Icon d={I.filter} /> Filters{anyActive && <span className="ds-fdrawer-dot" style={{ marginLeft: 2 }} />}
        </button>
      ) : (
        <span style={{ position: "relative", display: "inline-flex" }}>
          <button
            ref={triggerRef} className="ds-btn ds-btn--secondary ds-btn--icon"
            onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}
            aria-label={anyActive ? `Filters, ${FD_SECTIONS.filter(isActive).length} active` : "Filters"}
          >
            <Icon d={I.filter} />
          </button>
          {anyActive && <span className="ds-fdrawer-dot" style={{ position: "absolute", top: -2, right: -2, outline: "2px solid var(--bg-app)" }} />}
        </span>
      )}

      <div className={`ds-fdrawer${open ? " is-open" : ""}`} style={{ position: "absolute" }} aria-hidden={!open}>
        <div className="ds-fdrawer-scrim" onClick={() => setOpen(false)} />
        <div className="ds-fdrawer-panel" role="dialog" aria-modal="true" aria-label="Filters" tabIndex={-1} ref={panelRef}>
          <div className="ds-fdrawer-head">
            Filters
            <button className="ds-fdrawer-close" aria-label="Close filters" onClick={() => setOpen(false)}><Icon d={I.x} size={16} /></button>
          </div>

          <div className="ds-fdrawer-body">
            {FD_SECTIONS.map((s, i) => {
              const isOpen = i === acc;
              const active = isActive(s);
              const off = sel[s.name] || new Set();
              const r = ranges[s.name] || [s.lo, s.hi];
              return (
                <div key={s.name} className={`ds-fdrawer-section${isOpen ? " is-open" : ""}`}>
                  <button type="button" className="ds-fdrawer-acc-head" aria-expanded={isOpen} onClick={() => setAcc(isOpen ? -1 : i)}>
                    <span className="ds-fdrawer-sec-title">{s.name}{active && <span className="ds-fdrawer-dot" />}</span>
                    <svg className="ds-fdrawer-acc-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="ds-fdrawer-acc-body">
                    {s.kind === "range" ? (
                      <>
                        <div className="ds-fdrawer-acts">
                          <button className="ds-fdrawer-act" disabled={!active} onClick={() => setRanges(p => { const n = { ...p }; delete n[s.name]; return n; })}>Reset</button>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
                          {r[0].toLocaleString()} <span style={{ color: "var(--text-muted)" }}>–</span> {r[1].toLocaleString()}{s.unit && ` ${s.unit}`}
                        </div>
                        <input type="range" min={s.lo} max={s.hi} value={r[1]} style={{ width: "100%", accentColor: "var(--brand-600)" }}
                          onChange={(e) => setRanges(p => ({ ...p, [s.name]: [s.lo, +e.target.value] }))} />
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                          <span>{s.lo.toLocaleString()}</span><span>{s.hi.toLocaleString()}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="ds-fdrawer-acts">
                          <button className="ds-fdrawer-act" disabled={!active} onClick={() => setSel(p => ({ ...p, [s.name]: new Set() }))}>Reset</button>
                          <button className="ds-fdrawer-act" disabled={off.size === s.options.length} onClick={() => setSel(p => ({ ...p, [s.name]: new Set(s.options) }))}>Unselect all</button>
                        </div>
                        <div className="ds-fdrawer-list ds-scroll">
                          {s.options.map(o => (
                            <label key={o} className="ds-fdrawer-item">
                              <input type="checkbox" checked={!off.has(o)} onChange={() => toggleVal(s.name, o)} />{o}
                            </label>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ds-fdrawer-foot">
            <button className="ds-btn ds-btn--secondary" disabled={!anyActive} onClick={resetAll}>Reset all</button>
            <button className="ds-btn ds-btn--primary" onClick={() => setOpen(false)}>Done</button>
          </div>
        </div>
      </div>
    </>
  );
};

/* Grouped options (main / sub) demo — uses the real .ds-fdrawer-tree CSS. Selection is stored as the
   UNchecked leaves, so "nothing excluded" = unfiltered and new leaves arrive checked. */
const FD_TREE_GROUPS = [
  { name: "Country EEZ",     items: [["Ireland", "#1485c5"], ["Israel EEZ", "#0d9488"], ["Singapore", "#7c3aed"]] },
  { name: "High Risk Areas", items: [["Gulf of Guinea [JWC]", "#f97316"], ["Lebanon [JWC]", "#dc2626"], ["Libya [JWC]", "#dc2626"], ["Syria [JWC]", "#dc2626"], ["Venezuela [JWC]", "#f97316"]] },
];
const FdTriBox = ({ checked, mixed, onChange, label }) => (
  <input type="checkbox" checked={checked} aria-label={label}
    ref={(el) => { if (el) el.indeterminate = mixed; }} onChange={onChange} />
);
const FilterDrawerTreeDemo = () => {
  const [excluded, setExcluded] = React.useState(() => new Set(["Libya [JWC]", "Syria [JWC]"]));
  const [collapsed, setCollapsed] = React.useState(() => new Set());
  const leaves = (g) => g.items.map(([n]) => n);
  const all = FD_TREE_GROUPS.flatMap(leaves);
  const tri = (keys) => { const on = keys.filter((k) => !excluded.has(k)).length; return { checked: on === keys.length, mixed: on > 0 && on < keys.length }; };
  const setKeys = (keys, on) => setExcluded((prev) => { const n = new Set(prev); keys.forEach((k) => (on ? n.delete(k) : n.add(k))); return n; });
  const shown = all.filter((k) => !excluded.has(k)).length;
  const sAll = tri(all);
  return (
    <div className="fd-tree-demo">
      <div className="fd-tree-demo-result" aria-live="polite">Showing {shown} of {all.length} regions</div>
      <div className="ds-fdrawer-tree" role="group" aria-label="Regions">
        <label className="ds-fdrawer-tree-row ds-fdrawer-tree-row--all">
          <FdTriBox {...sAll} label="All" onChange={(e) => setKeys(all, e.target.checked)} /><span className="ds-fdrawer-tree-name">All</span>
        </label>
        {FD_TREE_GROUPS.map((g, gi) => {
          const open = !collapsed.has(g.name), s = tri(leaves(g));
          return (
            <div key={g.name} className={"ds-fdrawer-tree-group" + (open ? " is-open" : "")}>
              <div className="ds-fdrawer-tree-row ds-fdrawer-tree-row--group">
                <label className="ds-fdrawer-tree-check">
                  <FdTriBox {...s} label={g.name} onChange={(e) => setKeys(leaves(g), e.target.checked)} />
                  <span className="ds-fdrawer-tree-name">{g.name}</span><span className="ds-fdrawer-tree-n">{g.items.length}</span>
                </label>
                <button type="button" className="ds-fdrawer-tree-toggle" aria-expanded={open} aria-controls={"fd-tree-sub-" + gi}
                  aria-label={(open ? "Collapse " : "Expand ") + g.name}
                  onClick={() => setCollapsed((prev) => { const n = new Set(prev); n.has(g.name) ? n.delete(g.name) : n.add(g.name); return n; })}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                </button>
              </div>
              <div className="ds-fdrawer-tree-sub" id={"fd-tree-sub-" + gi} role="group" aria-label={g.name} hidden={!open}>
                {g.items.map(([n, c]) => (
                  <label key={n} className="ds-fdrawer-tree-row ds-fdrawer-tree-row--sub">
                    <input type="checkbox" checked={!excluded.has(n)} onChange={(e) => setKeys([n], e.target.checked)} />
                    <span className="ds-fdrawer-tree-swatch" style={{ background: c }} aria-hidden="true"></span>
                    <span className="ds-fdrawer-tree-name">{n}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilterDrawerSpec = () => (
  <>
    {/* Anatomy */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Anatomy</span><span className="ord">01</span></h3>
      <p className="subsection-desc">
        The filter drawer holds the <strong>complete filter set for a data view</strong> in one right-edge sheet. It is the
        canonical filtering surface on Assets Search and the pattern for any table dense enough that inline filter chips
        stop fitting. It differs from the generic <a href="#c-overlays">Drawer</a> in three ways: it is narrower, its
        sections are a <strong>single-open accordion</strong>, and it applies <strong>live</strong>; there is no Apply button.
      </p>
      <div className="panel">
        <div className="panel-head"><h4>Live: open the drawer</h4><span className="meta">real .ds-fdrawer · ESC and scrim close</span></div>
        <div className="panel-body" style={{ background: "var(--bg-app)", position: "relative", height: 460, overflow: "hidden", padding: 20 }}>
          <FilterDrawerDemo />
          <p className="t-caption" style={{ marginTop: 12, maxWidth: 380 }}>
            Scoped to this panel for the demo; in production the drawer is <code className="inline">position: fixed</code> over the viewport.
            Open a section; it expands to fill the body and its option list scrolls, rather than the whole drawer scrolling.
          </p>
        </div>
        <table className="spec-table" style={{ border: 0, borderRadius: 0, borderTop: "1px solid var(--border-subtle)" }}>
          <thead><tr><th style={{ width: 200 }}>Region</th><th>Spec</th></tr></thead>
          <tbody>
            <tr><td><code className="inline">.ds-fdrawer</code></td><td className="t-caption"><code className="inline">position: fixed; inset: 0</code> at <code className="inline">--z-drawer: 1080</code>. Toggles <code className="inline">visibility</code>, not <code className="inline">display</code>, so the panel can transition.</td></tr>
            <tr><td><code className="inline">-scrim</code></td><td className="t-caption"><code className="inline">rgba(15,23,42,.38)</code>, fades over 250ms. Click closes.</td></tr>
            <tr><td><code className="inline">-panel</code></td><td className="t-caption">Right-anchored, <strong>360px</strong> wide, <code className="inline">max-width: 92vw</code>, full height. Slides from <code className="inline">translateX(100%)</code> over 300ms <code className="inline">cubic-bezier(.4,0,.2,1)</code>.</td></tr>
            <tr><td><code className="inline">-head</code></td><td className="t-caption">16/20px padding, 15px/700 display font, bottom hairline, close button on the right.</td></tr>
            <tr><td><code className="inline">-body</code></td><td className="t-caption">Scrolling flex column, 18px side padding. Hosts the accordion.</td></tr>
            <tr><td><code className="inline">-section</code></td><td className="t-caption">16px vertical padding open, 11px collapsed (transitioned). The open one takes <code className="inline">flex: 1</code>.</td></tr>
            <tr><td><code className="inline">-foot</code></td><td className="t-caption">14/18px padding, top hairline, <code className="inline">justify-content: space-between</code>: <em>Reset all</em> on the left (disabled when nothing is active), <em>Done</em> on the right.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Accordion behaviour */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Accordion behaviour</span><span className="ord">02</span></h3>
      <p className="subsection-desc">
        Only one section is open at a time. This is deliberate: filter lists run to dozens of options, and letting several
        expand at once turns the drawer into an unnavigable scroll. The open section <em>grows to fill the body</em>, so
        its option list gets the available height and scrolls internally.
      </p>
      <table className="spec-table">
        <thead><tr><th style={{ width: 200 }}>Rule</th><th>Behaviour</th></tr></thead>
        <tbody>
          <tr><td><strong>Single-open</strong></td><td className="t-caption">Opening a section closes the others. Clicking the open section's header collapses it, leaving all closed.</td></tr>
          <tr><td><strong>Default open</strong></td><td className="t-caption">The first section, every time the drawer opens. Accordion state is not persisted between openings; filter values are.</td></tr>
          <tr><td><strong>Fill &amp; scroll</strong></td><td className="t-caption">Open section is <code className="inline">flex: 1 1 auto; min-height: 0</code>; its list drops the 210px cap and takes <code className="inline">flex: 1 1 0</code>.</td></tr>
          <tr><td><strong>Collapsed affordance</strong></td><td className="t-caption">Collapsed titles render <code className="inline">--brand-600</code> to read as tappable; the open title goes quiet at <code className="inline">--text-muted</code>. The chevron is always brand and rotates 180°.</td></tr>
          <tr><td><strong>Active marker</strong></td><td className="t-caption">A 6px <code className="inline">--danger-500</code> dot sits after the section title whenever that filter is narrowing results, visible while collapsed, which is the point.</td></tr>
          <tr><td><strong>Enter animation</strong></td><td className="t-caption">Body fades in from <code className="inline">translateY(-4px)</code> over 220ms. The section's padding change transitions over 200ms.</td></tr>
        </tbody>
      </table>
    </div>

    {/* Live apply */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Live apply</span><span className="ord">03</span></h3>
      <p className="subsection-desc">
        Every change re-queries immediately and repaints the table behind the scrim. This is the opposite of the
        <a href="#c-popover"> form popover</a> rule, and it is correct here for one reason: the drawer is a side sheet,
        so the result set stays visible beside it. The user sees the row count move as they tick boxes.
      </p>
      <div className="grid-2" style={{ gap: 16 }}>
        <div className="panel">
          <div className="panel-head"><h4>The apply cycle</h4></div>
          <div style={{ padding: 16, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>
            <ol style={{ margin: 0, paddingLeft: 20 }}>
              <li>Mutate the filter state.</li>
              <li>Reset to page 1: the old page number is meaningless against a new result set.</li>
              <li>Re-render the table.</li>
              <li>Re-render the drawer body so counts, dots and disabled states refresh.</li>
              <li><strong>Restore the body's scroll position</strong>, the re-render would otherwise jump the user to the top mid-interaction.</li>
            </ol>
          </div>
        </div>
        <div className="panel">
          <div className="panel-head"><h4>Footer actions</h4></div>
          <table className="spec-table" style={{ border: 0, borderRadius: 0 }}>
            <tbody>
              <tr><td style={{ width: 110 }}><strong>Reset all</strong></td><td className="t-caption">Clears every filter across all sections. Disabled while none is active, so it never looks available with nothing to do.</td></tr>
              <tr><td><strong>Done</strong></td><td className="t-caption">Closes the drawer. It does <em>not</em> commit anything: the filters are already applied. It is a dismiss affordance, not a submit.</td></tr>
            </tbody>
          </table>
          <div className="callout" style={{ margin: 16, marginTop: 0 }}>
            Never label this button <em>Apply</em>. It implies pending changes that do not exist, and users will hunt for a Cancel that cannot exist either.
          </div>
        </div>
      </div>
    </div>

    {/* Filter types */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Section types</span><span className="ord">04</span></h3>
      <table className="spec-table">
        <thead><tr><th style={{ width: 140 }}>Type</th><th style={{ width: 180 }}>Toolbar</th><th>Control</th></tr></thead>
        <tbody>
          <tr><td><strong>List</strong></td><td className="t-caption"><em>Reset</em> · <em>Unselect all</em></td><td className="t-caption">Checkbox rows, 7/10px, 12.5px text, <code className="inline">accent-color: --brand-600</code>. Rows may carry a leading glyph (type teardrop) or flag image. List caps at 210px and scrolls with the 6px themed scrollbar.</td></tr>
          <tr><td><strong>Range</strong></td><td className="t-caption"><em>Reset</em></td><td className="t-caption">Dual-thumb slider over a 4px track, brand fill between thumbs, 16px white thumbs with a 2px brand ring. Current values above, absolute bounds below.</td></tr>
          <tr><td><strong>Category</strong></td><td className="t-caption"><em>Reset</em> · <em>Unselect all</em></td><td className="t-caption">Same as List, but options are derived from the data (Owner, Operator, Manufacturer) rather than a fixed vocabulary.</td></tr>
          <tr><td><strong>Grouped</strong></td><td className="t-caption">An <em>All</em> row (replaces the toolbar)</td><td className="t-caption">Main options, each with a tri-state checkbox, a count and a collapse chevron, over their sub-options on a sunken panel. For hierarchical vocabularies (region groups → regions). See <em>Grouped options detail</em>.</td></tr>
        </tbody>
      </table>
      <div className="callout warn" style={{ marginTop: 12 }}>
        <strong>The empty-selection state.</strong> "All options checked" and "no options checked" are different intents that a
        plain set cannot distinguish, an empty set normally means "no filter". The implementation reserves a sentinel value
        (<code className="inline">FNONE</code>) so <em>Unselect all</em> yields zero rows rather than silently meaning
        "everything". Any reimplementation needs the same three-state model: <em>unfiltered</em>, <em>subset</em>, <em>none</em>.
      </div>
    </div>

    {/* Range slider */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Range slider detail</span><span className="ord">05</span></h3>
      <table className="spec-table">
        <thead><tr><th style={{ width: 180 }}>Aspect</th><th>Behaviour</th></tr></thead>
        <tbody>
          <tr><td><strong>Bounds</strong></td><td className="t-caption">Computed from the data per tab, <code className="inline">floor(min)</code> / <code className="inline">ceil(max)</code> of the column. Bounds change when the tab changes.</td></tr>
          <tr><td><strong>Two inputs</strong></td><td className="t-caption">Two stacked <code className="inline">input[type=range]</code> with <code className="inline">pointer-events: none</code> on the track and <code className="inline">auto</code> on the thumbs, so both remain grabbable.</td></tr>
          <tr><td><strong>Crossing</strong></td><td className="t-caption">Each thumb clamps against the other on <code className="inline">input</code>; values are swapped defensively on commit.</td></tr>
          <tr><td><strong>Live vs commit</strong></td><td className="t-caption"><code className="inline">input</code> repaints the fill and the value labels only. <code className="inline">change</code> (pointer release) commits and re-queries, so dragging does not fire a query per pixel.</td></tr>
          <tr><td><strong>Full range = no filter</strong></td><td className="t-caption">If the committed range equals the bounds, the filter is deleted rather than stored, so the active dot clears.</td></tr>
          <tr><td><strong>Formatting</strong></td><td className="t-caption">Three modes: thousands-separated integers, currency (<code className="inline">$1.2B</code> / <code className="inline">$48.5M</code>), and raw (years, never <code className="inline">2,018</code>).</td></tr>
          <tr><td><strong>Repaint on open</strong></td><td className="t-caption">The fill is measured in px from track width, so it must be repainted when its section expands; a slider painted while hidden measures zero.</td></tr>
        </tbody>
      </table>
    </div>

    {/* Grouped options */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Grouped options detail</span><span className="ord">06</span></h3>
      <p className="subsection-desc">
        A section whose options form a two-level hierarchy: <em>main options</em> (groups) with <em>sub-options</em>.
        Use it when the vocabulary is naturally grouped and people filter at both levels, for example region groups and
        their regions. Keep it to two levels; a flat <em>List</em> stays the default.
      </p>
      <div className="fd-tree-demo-wrap"><FilterDrawerTreeDemo /></div>
      <table className="spec-table" style={{ marginTop: 16 }}>
        <thead><tr><th style={{ width: 180 }}>Aspect</th><th>Behaviour</th></tr></thead>
        <tbody>
          <tr><td><strong>Structure</strong></td><td className="t-caption">An <em>All</em> row, then each main option as a row (checkbox, name, sub-option count, chevron) above its sub-options on a sunken panel (<code className="inline">--bg-muted</code>, 8px radius, 4px inset). Sub-option rows may carry a leading swatch (the item's map colour) and use the link colour.</td></tr>
          <tr><td><strong>Tri-state parents</strong></td><td className="t-caption"><em>All</em> and each main option are <em>checked</em> when every sub-option below is, <em>unchecked</em> when none are, and <em>partly selected</em> otherwise: <code className="inline">input.indeterminate = true</code>, shown as a dash. Parents are always derived from their children, never stored.</td></tr>
          <tr><td><strong>Toggling a parent</strong></td><td className="t-caption">Checking a parent (including from partly selected) checks all its sub-options; unchecking it unchecks them all. <em>All</em> does the same for every option.</td></tr>
          <tr><td><strong>Collapse</strong></td><td className="t-caption">The chevron collapses or expands one main option's list (<code className="inline">aria-expanded</code>, rotated -90° when collapsed); all start expanded. Collapsing never changes the selection.</td></tr>
          <tr><td><strong>Selection model</strong></td><td className="t-caption">Store the <em>excluded</em> sub-options, not the included ones. Nothing excluded = unfiltered (no active dot); options that appear later (another tab's data) arrive checked; <em>none</em> is every option excluded, so the three-state model above still holds.</td></tr>
          <tr><td><strong>Live apply &amp; reset</strong></td><td className="t-caption">As for every section: each change applies immediately and the result line updates. The footer <em>Reset</em> clears all exclusions; the <em>All</em> row stands in for the section toolbar (<em>Reset</em> / <em>Unselect all</em>), so don't show both.</td></tr>
          <tr><td><strong>Accessibility</strong></td><td className="t-caption">Native checkboxes (the indeterminate state is announced as "mixed"), each sub-list a <code className="inline">role="group"</code> labelled by its main option, the chevron a real button with <code className="inline">aria-controls</code> and an <em>Expand / Collapse &lt;name&gt;</em> label, 34px rows.</td></tr>
          <tr><td><strong>Shipped on</strong></td><td className="t-caption">Real World · Regions map filter (main options: <em>My Monitored Regions</em>, <em>Skytek Regions</em>; sub-options: each region drawn on the map), November 2026.</td></tr>
        </tbody>
      </table>
    </div>

    {/* Trigger & responsive */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Trigger &amp; responsive behaviour</span><span className="ord">07</span></h3>
      <p className="subsection-desc">
        On wide viewports the filters live inline in the toolbar as individual dropdown buttons; the drawer is the
        <strong> compact-viewport form of the same filter set</strong>, opened from a single icon button. Both write to
        the same state.
      </p>
      <table className="spec-table">
        <thead><tr><th style={{ width: 170 }}>Breakpoint</th><th>Filter presentation</th></tr></thead>
        <tbody>
          <tr><td><strong>&gt; 720px</strong></td><td className="t-caption">Inline filter buttons, each opening its own dropdown menu. A red corner notch on a button marks an active filter.</td></tr>
          <tr><td><strong>≤ 720px</strong></td><td className="t-caption">Inline controls collapse to a single icon button carrying a brand dot when any filter is active; it opens the drawer.</td></tr>
          <tr><td><strong>≤ 480px</strong></td><td className="t-caption">Panel is <code className="inline">92vw</code>, the remaining 8% keeps the scrim visible so the sheet still reads as an overlay, not a page.</td></tr>
        </tbody>
      </table>

      <div className="panel" style={{ marginTop: 16 }}>
        <div className="panel-head"><h4>Trigger forms</h4><span className="meta">all three open the same drawer</span></div>
        <div className="panel-body" style={{ background: "var(--bg-app)", position: "relative", height: 430, overflow: "hidden", padding: "24px 24px" }}>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
              <FilterDrawerDemo triggerForm="labelled" />
              <span className="t-caption">Labelled · default</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
              <FilterDrawerDemo triggerForm="icon" />
              <span className="t-caption">Icon-only · aria-label required</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
              <FilterDrawerDemo triggerForm="icon" initialSel={{ Flag: new Set(["Panama"]), "Asset Type": new Set(["Yacht"]) }} />
              <span className="t-caption">Icon-only, 2 filters active</span>
            </div>
          </div>
          <p className="t-caption" style={{ marginTop: 12, maxWidth: 420 }}>
            Each trigger opens the same drawer. The third starts with two filters applied, so it shows the corner dot and
            announces <code className="inline">“Filters, 2 active”</code>; clear them with <em>Reset all</em> and the dot disappears.
          </p>
        </div>
      </div>

      <p className="subsection-desc" style={{ marginTop: 16 }}>
        <strong>The trigger may be icon-only.</strong> The filter glyph is well understood and the drawer titles itself
        “Filters” the moment it opens, so the visible label is not carrying the meaning on its own. Drop the text whenever
        the toolbar is tight — it is the required form below 720px, and it is equally acceptable on a wide but crowded
        toolbar sitting beside search, sort, density and export controls.
      </p>
      <table className="spec-table">
        <thead><tr><th style={{ width: 180 }}>Rule</th><th>Requirement</th></tr></thead>
        <tbody>
          <tr><td><strong>Accessible name</strong></td><td className="t-caption">An icon-only trigger <em>must</em> carry <code className="inline">aria-label="Filters"</code>. Without the visible text it is the only name a screen reader has.</td></tr>
          <tr><td><strong>Tooltip</strong></td><td className="t-caption">Pair it with a <a href="#c-tooltip">Tooltip</a> reading “Filters”. This is the canonical icon-button case: the tip names the control for sighted users, the <code className="inline">aria-label</code> names it for everyone else.</td></tr>
          <tr><td><strong>Active state</strong></td><td className="t-caption">The active-filter dot matters more without a label, since there is no text for a count to sit beside. Render it at the top-right corner with a 2px outline in the toolbar background so it reads against the button edge.</td></tr>
          <tr><td><strong>Announce the count</strong></td><td className="t-caption">Extend the label when filters are applied — <code className="inline">aria-label="Filters, 2 active"</code>. Colour alone must never be the only signal.</td></tr>
          <tr><td><strong>Target size</strong></td><td className="t-caption">Use the standard <code className="inline">ds-btn--icon</code> at its default <strong>32px</strong>; do not drop to the <code className="inline">--sm</code> (28px) or <code className="inline">--xs</code> (24px) variants for a drawer trigger. 32px clears the WCAG 2.2 <em>2.5.8</em> minimum of 24px. On coarse pointers, expand the hit area to 44px with a centred <code className="inline">::before</code> overlay rather than growing the button, so the toolbar rhythm is preserved.</td></tr>
          <tr><td><strong>Consistency</strong></td><td className="t-caption">Pick one form per toolbar. Do not mix a labelled Filters button with icon-only siblings that carry equal weight.</td></tr>
        </tbody>
      </table>
      <div className="callout" style={{ marginTop: 12 }}>
        Because the drawer and the inline dropdowns share one state object, a filter set on a wide screen is still applied, and still shows its dot, after a resize into drawer territory.
      </div>
    </div>

    {/* API */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Developer API</span><span className="ord">08</span></h3>
      <p className="subsection-desc">
        The filter drawer is <strong>not its own component</strong>. It is the <em>Filters</em> story of the shared
        <code className="inline">Drawer</code> primitive (built on <code className="inline">@base-ui/react</code>):
        a scrollable <code className="inline">DrawerBody</code> of filter sections, plus a Reset / Done
        <code className="inline">DrawerFooter</code>. Build it by composing Drawer slots; do not fork a parallel component.
      </p>
      <pre className="code">{`import {
  Drawer, DrawerTrigger, DrawerContent, DrawerClose,
  DrawerHeader, DrawerBody, DrawerFooter, DrawerTitle, DrawerDescription,
} from '@skytek/ui';

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerTrigger>
    <Button variant="secondary" icon={<FilterIcon />}>Filters</Button>
  </DrawerTrigger>

  <DrawerContent modal showClose>
    <DrawerHeader>
      <DrawerTitle>Filters</DrawerTitle>
      {/* Optional. Omit rather than restating what the sections already say. */}
      <DrawerDescription>Applied to the current result set.</DrawerDescription>
    </DrawerHeader>

    {/* Scrollable. Holds the single-open accordion. */}
    <DrawerBody>
      {sections.map((s) => (
        <FilterSection
          key={s.name}
          section={s}
          open={openSection === s.name}
          onToggle={() => setOpenSection(o => o === s.name ? null : s.name)}
          value={filters[s.name]}
          onChange={(next) => {
            setFilters(f => ({ ...f, [s.name]: next }));
            setPage(1);            // always reset paging
          }}
        />
      ))}
    </DrawerBody>

    {/* justify-between: Reset left, Done right. */}
    <DrawerFooter className="justify-between">
      <Button variant="secondary" disabled={!anyActive} onClick={resetAll}>
        Reset all
      </Button>
      <DrawerClose>
        <Button variant="primary">Done</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}</pre>
      <table className="spec-table" style={{ marginTop: 16 }}>
        <thead><tr><th style={{ width: 155 }}>Prop / slot</th><th style={{ width: 125 }}>On</th><th style={{ width: 105 }}>Type</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td><code className="inline">open</code> / <code className="inline">onOpenChange</code></td><td className="t-caption">Drawer</td><td className="t-caption">boolean / fn</td><td className="t-caption">Controlled mode. Use this so the toolbar's inline filter buttons and the drawer share one state.</td></tr>
          <tr><td><code className="inline">defaultOpen</code></td><td className="t-caption">Drawer</td><td className="t-caption">boolean</td><td className="t-caption">Uncontrolled alternative. Rarely right for filters, which are parent-owned.</td></tr>
          <tr><td><code className="inline">modal</code></td><td className="t-caption">DrawerContent</td><td className="t-caption">boolean</td><td className="t-caption">Backdrop + scroll-lock + focus-trap. Keep it on for filters; see the note below.</td></tr>
          <tr><td><code className="inline">showClose</code></td><td className="t-caption">DrawerContent</td><td className="t-caption">boolean</td><td className="t-caption">Renders the header ✕. On for filters, so the sheet is dismissible without reaching the footer.</td></tr>
          <tr><td><code className="inline">DrawerClose</code></td><td className="t-caption">slot</td><td className="t-caption">wrapper</td><td className="t-caption">Wrap any control to make it close the drawer. This is how <em>Done</em> closes; it carries no handler of its own.</td></tr>
          <tr><td><code className="inline">DrawerFooter</code></td><td className="t-caption">slot</td><td className="t-caption">optional</td><td className="t-caption">Consumer-provided, with no default close action. The Reset / Done pair is this pattern's contribution, not a Drawer default.</td></tr>
        </tbody>
      </table>
      <div className="callout warn" style={{ marginTop: 12 }}>
        <strong>Live apply and <code className="inline">modal</code> are in tension.</strong> A modal drawer scroll-locks the
        page behind it, so the user sees the filtered table change but cannot scroll it until the drawer closes. That is the
        accepted trade: the row count and the top of the result set stay visible, which is enough feedback while narrowing.
        Do not switch <code className="inline">modal</code> off to "fix" it; a non-modal filter drawer loses the focus trap and
        the scrim, and the sheet stops reading as an overlay.
      </div>
      <p className="subsection-desc" style={{ marginTop: 12 }}>
        The state contract below belongs to this pattern. <code className="inline">Drawer</code> is presentation only and
        holds none of it.
      </p>
      <pre className="code">{`/** Three-state list model:
 *  undefined        → unfiltered (all rows pass)
 *  Set(['a','b'])   → subset
 *  Set([FNONE])     → explicitly none (zero rows)  */
type FilterState = Record<
  string,
  Set<string> | { min: number; max: number } | undefined
>;

type FilterSection =
  | { name: string; kind: 'list';  options: FilterOption[] }
  | { name: string; kind: 'range'; key: string; unit?: string;
      step?: number; format?: 'number' | 'currency' | 'raw' };

interface FilterOption {
  value: string;
  label: string;
  /** Leading glyph: vessel-type teardrop, flag image, status dot. */
  icon?: React.ReactNode;
}`}</pre>
    </div>

    {/* Spec vs build */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Spec vs. current build</span><span className="ord">09</span></h3>
      <p className="subsection-desc">
        Where this specification and the shipped <code className="inline">Drawer</code> currently differ. The spec column is
        the target; these are open reconciliation items.
      </p>
      <table className="spec-table">
        <thead><tr><th style={{ width: 140 }}>Point</th><th style={{ width: 185 }}>Design spec</th><th style={{ width: 170 }}>Current build</th><th>Action</th></tr></thead>
        <tbody>
          <tr><td><strong>Footer layout</strong></td><td className="t-caption">Two equal-width buttons, each <code className="inline">flex: 1</code></td><td className="t-caption"><code className="inline">justify-between</code>: Reset left, Done right</td><td className="t-caption">Adopt <code className="inline">justify-between</code>. It reads better at this width and separates the clearing action from the affirmative one, which equal halves do not.</td></tr>
          <tr><td><strong>Component</strong></td><td className="t-caption">A standalone <code className="inline">FilterDrawer</code></td><td className="t-caption">A story composed from Drawer slots</td><td className="t-caption">Corrected above. Compose the primitive; do not ship a second drawer implementation.</td></tr>
          <tr><td><strong>Width</strong></td><td className="t-caption"><code className="inline">--fdrawer-width: 360px</code></td><td className="t-caption">Drawer's own scale (400 / 560 / 720)</td><td className="t-caption">Filters wants the narrow end. Either add 360 to the Drawer scale or accept 400 and retire the token; do not maintain two scales.</td></tr>
          <tr><td><strong>Description</strong></td><td className="t-caption">Not specified</td><td className="t-caption"><code className="inline">DrawerDescription</code> slot available</td><td className="t-caption">Optional. Use it only for scope that is not otherwise obvious; skip it rather than restating the section names.</td></tr>
        </tbody>
      </table>
    </div>

    {/* Accessibility */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Accessibility</span><span className="ord">10</span></h3>
      <table className="spec-table">
        <thead><tr><th style={{ width: 190 }}>Requirement</th><th>Implementation</th></tr></thead>
        <tbody>
          <tr><td><strong>Dialog semantics</strong></td><td className="t-caption"><code className="inline">role="dialog"</code>, <code className="inline">aria-modal="true"</code>, <code className="inline">aria-label="Filters"</code>. The scrim makes this genuinely modal, unlike a popover, claiming modality here is correct.</td></tr>
          <tr><td><strong>aria-hidden</strong></td><td className="t-caption">The root carries <code className="inline">aria-hidden</code> mirroring open state, so the closed panel is not reachable while still in the DOM for its transition.</td></tr>
          <tr><td><strong>Focus</strong></td><td className="t-caption">Focus moves to the panel on open, is trapped while open, and returns to the trigger on close.</td></tr>
          <tr><td><strong>Dismissal</strong></td><td className="t-caption"><kbd className="ms-kbd">Esc</kbd>, scrim click, close button, and <em>Done</em>, WCAG 2.2 <em>1.4.13</em>.</td></tr>
          <tr><td><strong>Accordion headers</strong></td><td className="t-caption">Real <code className="inline">&lt;button&gt;</code> elements with <code className="inline">aria-expanded</code>, reachable by Tab and operable with Enter/Space.</td></tr>
          <tr><td><strong>Active dot</strong></td><td className="t-caption">Colour alone is not the signal, pair it with <code className="inline">aria-label="Asset Type, filtered"</code> or a visually-hidden "filtered" string.</td></tr>
          <tr><td><strong>Live results</strong></td><td className="t-caption">Announce the new row count through a polite live region; a sighted user sees the table change, a screen-reader user otherwise gets nothing.</td></tr>
          <tr><td><strong>Target size</strong></td><td className="t-caption">Checkbox rows are full-width and ≥ 30px tall; footer buttons are 40px. Icon-only triggers stay 32px visually and gain a 44px hit area on coarse pointers.</td></tr>
          <tr><td><strong>Reduced motion</strong></td><td className="t-caption">Slide, scrim fade and accordion animation all collapse to 1ms.</td></tr>
        </tbody>
      </table>
    </div>

    {/* Edge cases */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Edge cases</span><span className="ord">11</span></h3>
      <table className="spec-table">
        <thead><tr><th style={{ width: 230 }}>Case</th><th>Expected behaviour</th></tr></thead>
        <tbody>
          <tr><td>Tab switch while filters set</td><td className="t-caption">Filter state and section list are per-tab. Switching tabs rebuilds the sections from that tab's config; range bounds recompute.</td></tr>
          <tr><td>Filter yields zero rows</td><td className="t-caption">Table shows the empty state with a <em>Clear filters</em> action. The drawer stays open and usable, because the user is mid-narrowing.</td></tr>
          <tr><td>Re-render steals scroll</td><td className="t-caption">Capture <code className="inline">scrollTop</code> before replacing the body and restore it after. This is the most common bug in live-apply drawers.</td></tr>
          <tr><td>Slider in a collapsed section</td><td className="t-caption">Repaint the fill on expand; a track measured at zero width paints an invisible fill.</td></tr>
          <tr><td>Every option unselected</td><td className="t-caption">Zero rows, section dot active, <em>Unselect all</em> disabled, <em>Reset</em> enabled.</td></tr>
          <tr><td>Long option labels</td><td className="t-caption">Rows are <code className="inline">white-space: nowrap</code> and the list scrolls horizontally rather than wrapping, filter lists stay scannable as one column of left-aligned text.</td></tr>
          <tr><td>Drawer open on resize to wide</td><td className="t-caption">Leave it open; closing under the user is more disorienting than a wide drawer. Inline controls reappear behind it.</td></tr>
        </tbody>
      </table>
    </div>

    {/* Do / Don't */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Do &amp; don't</span><span className="ord">12</span></h3>
      <div className="grid-2" style={{ gap: 16 }}>
        <div className="panel" style={{ borderTop: "3px solid var(--success-500)" }}>
          <div className="panel-head"><h4 style={{ color: "var(--success-700)" }}>✓ Do</h4></div>
          <div style={{ padding: 16 }}>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>
              <li>Apply live and reset to page 1 on every change.</li>
              <li>Mark active sections with a dot visible while collapsed.</li>
              <li>Restore body scroll position after a re-render.</li>
              <li>Disable <em>Reset all</em> when nothing is active.</li>
              <li>Commit range sliders on release, not on drag.</li>
            </ul>
          </div>
        </div>
        <div className="panel" style={{ borderTop: "3px solid var(--danger-500)" }}>
          <div className="panel-head"><h4 style={{ color: "var(--danger-700)" }}>✗ Don't</h4></div>
          <div style={{ padding: 16 }}>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>
              <li>Label the dismiss button <em>Apply</em>, nothing is pending.</li>
              <li>Let several sections expand at once.</li>
              <li>Treat "none selected" as "no filter".</li>
              <li>Re-query on every slider <code className="inline">input</code> event.</li>
              <li>Scroll the whole drawer instead of the open section's list.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* Tokens */}
    <div className="subsection">
      <h3 className="subsection-title"><span>Tokens</span><span className="ord">13</span></h3>
      <div className="panel">
        {[
          ["--fdrawer-width", "360px", "Panel width"],
          ["--fdrawer-max-width", "92vw", "Compact-viewport cap"],
          ["--fdrawer-scrim", "rgba(15,23,42,.38)", "Backdrop"],
          ["--fdrawer-shadow", "-10px 0 30px rgba(15,23,42,.16)", "Panel edge shadow"],
          ["--fdrawer-pad-x", "18px", "Body / footer side padding"],
          ["--fdrawer-head-pad", "16px 20px", "Header padding"],
          ["--fdrawer-slide", "300ms", "Panel slide duration"],
          ["--fdrawer-slide-ease", "cubic-bezier(.4,0,.2,1)", "Panel slide easing"],
          ["--fdrawer-scrim-motion", "250ms", "Scrim fade"],
          ["--fdrawer-acc-motion", "220ms", "Accordion body enter"],
          ["--fdrawer-list-max", "210px", "Option-list cap when not filling"],
          ["--z-drawer", "1080", "Below modal, above popover"],
        ].map(([t, v, r]) => (
          <div key={t} className="token-row" style={{ gridTemplateColumns: "230px 240px 1fr" }}>
            <code>{t}</code>
            <span className="t-mono" style={{ color: "var(--brand-700)", fontSize: 11 }}>{v}</span>
            <span className="t-caption">{r}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="callout">
      <strong>The filter drawer test:</strong> tick one box and watch the table. If the row count does not move until you press
      something, it is not this component; it is a form popover wearing a drawer's clothes.
    </div>
  </>
);

window.FilterDrawerSpec = FilterDrawerSpec;
