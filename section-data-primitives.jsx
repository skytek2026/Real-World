/* Section: Data primitives: filters, search, bulk actions, saved views */

const FilterBarDemo = () => (
  <div className="ds-filter-bar">
    <span className="ds-search-input">
      <Icon d={I.search} size={14} />
      <input type="text" placeholder="Search vessels, IMO, flag…" defaultValue="atlantic" />
    </span>
    <span className="ds-chip ds-chip--filter">
      <span className="chip-label">Type:</span>
      <span className="chip-value">Tanker</span>
      <button className="ds-chip-x" aria-label="Remove Type filter"><Icon d={I.x} size={10}/></button>
    </span>
    <span className="ds-chip ds-chip--filter">
      <span className="chip-label">Flag:</span>
      <span className="chip-value">Liberia · Panama · +2</span>
      <button className="ds-chip-x" aria-label="Remove Flag filter"><Icon d={I.x} size={10}/></button>
    </span>
    <span className="ds-chip ds-chip--filter">
      <span className="chip-label">Rating:</span>
      <span className="chip-value">D, E</span>
      <button className="ds-chip-x" aria-label="Remove Rating filter"><Icon d={I.x} size={10}/></button>
    </span>
    <button className="ds-filter-trigger">
      <Icon d={I.plus} size={10}/> Add filter
    </button>
    <span style={{ flex: 1 }} />
    <button className="ds-btn ds-btn--ghost ds-btn--sm">Reset</button>
    <button className="ds-btn ds-btn--secondary ds-btn--sm">
      <Icon d={I.star} size={12} stroke="currentColor"/>  Save view
    </button>
  </div>
);

const FacetDropdownDemo = () => {
  const rows = [
    ["Tanker", 412, true],
    ["Container", 1284, false],
    ["Bulk Carrier", 802, false],
    ["Gas Carrier", 167, true],
    ["LNG Carrier", 119, false],
    ["General Cargo", 433, false],
    ["Refrigerated Cargo", 91, false],
    ["Cruise Passenger", 48, false],
    ["Vehicle Carrier", 73, false],
    ["Yacht", 22, false],
  ];
  return (
    <div className="ds-facet">
      <div className="ds-facet-head">
        <Icon d={I.search} size={14} stroke="var(--text-muted)"/>
        <input type="text" placeholder="Filter types…" />
      </div>
      <div className="ds-facet-body">
        {rows.map(([label, count, checked]) => (
          <label key={label} className="ds-facet-row">
            <input type="checkbox" className="ds-check" defaultChecked={checked} />
            {label}
            <span className="count">{count.toLocaleString()}</span>
          </label>
        ))}
      </div>
      <div className="ds-facet-foot">
        <button className="ds-btn ds-btn--link" style={{ fontSize: 12 }}>Clear (2)</button>
        <button className="ds-btn ds-btn--primary ds-btn--sm">Apply</button>
      </div>
    </div>
  );
};

const SavedViewsDemo = () => (
  <div className="panel">
    <div className="panel-head">
      <h4>Saved views</h4>
      <button className="ds-view-trigger">
        <Icon d={I.star} size={14} stroke="currentColor" className="star"/>
        My high-risk tankers
        <Icon d={I.chevron} size={14}/>
      </button>
    </div>
    <div style={{ padding: 8 }}>
      {[
        ["My high-risk tankers", "tanker · rating D, E · flag Liberia, Panama", "current"],
        ["EU-bound, last 7d", "destination region EU · ATA ≤ 7d", "shared by Maeve"],
        ["Sanctioned watchlist", "flag in sanctions list · AIS gap > 6h", "team"],
        ["Black Sea grain", "type bulk · region Black Sea", ""],
      ].map(([name, descr, badge]) => (
        <div key={name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", borderTop: "1px solid var(--border-subtle)" }}>
          <Icon d={I.eye} size={14} stroke="var(--text-muted)" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{name}</div>
            <div className="t-caption" style={{ fontSize: 12 }}>{descr}</div>
          </div>
          {badge === "current" && <span className="ds-badge ds-badge--info">current</span>}
          {badge === "team" && <span className="ds-badge ds-badge--neutral">team</span>}
          {badge.startsWith("shared") && <span className="ds-badge ds-badge--neutral">{badge}</span>}
        </div>
      ))}
    </div>
    <div className="panel-foot" style={{ display: "flex", justifyContent: "space-between" }}>
      <button className="ds-btn ds-btn--link" style={{ fontSize: 12 }}>+ Save current as new view</button>
      <span className="t-caption">URL-encoded · share by copying the link</span>
    </div>
  </div>
);

const BulkActionBarDemo = () => {
  const [count, setCount] = React.useState(23);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "stretch" }}>
      <div className="ds-bulk-bar">
        <input type="checkbox" className="ds-check" defaultChecked style={{ borderColor: "rgba(255,255,255,.4)" }}/>
        <span className="count">{count}</span>
        <span style={{ fontSize: 12.5, opacity: 0.85 }}>vessels selected</span>
        <span className="divider"/>
        <button><Icon d={I.tag || I.flag} size={12}/> Tag</button>
        <button><Icon d={I.folder} size={12}/> Move to portfolio</button>
        <button><Icon d={I.download} size={12}/> Export</button>
        <button style={{ color: "#fca5a5" }}><Icon d={I.trash} size={12}/> Archive</button>
        <button className="undo">
          <Icon d={I.x} size={12}/> Clear
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        <button className="ds-btn ds-btn--ghost ds-btn--sm" onClick={() => setCount(c => Math.max(0, c - 5))}>−5 selected</button>
        <button className="ds-btn ds-btn--ghost ds-btn--sm" onClick={() => setCount(c => c + 12)}>+12 selected</button>
      </div>
    </div>
  );
};

const FilterTypesTable = () => (
  <table className="spec-table">
    <thead>
      <tr><th>Type</th><th>Trigger</th><th>Surface</th><th>When to use</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Quick filter</strong></td>
        <td><code>ds-filter-trigger</code> "+ Add filter"</td>
        <td>Popover dropdown</td>
        <td>1–10 enumerable values per category. The default.</td>
      </tr>
      <tr>
        <td><strong>Facet</strong></td>
        <td>Field name in chip → opens dropdown with search + checklist</td>
        <td>Searchable dropdown</td>
        <td>10–1000 values: flags, ports, organizations. Multi-select with counts.</td>
      </tr>
      <tr>
        <td><strong>Range</strong></td>
        <td>"Speed ≥ 10 kn" chip → opens slider</td>
        <td>Inline slider</td>
        <td>Continuous numeric: speed, draught, exposure. Min, max, or both.</td>
      </tr>
      <tr>
        <td><strong>Date range</strong></td>
        <td>"Last 7d" preset chip → opens calendar</td>
        <td>Date range picker</td>
        <td>ATA, ETA, AIS-last-seen. Always with presets: 1d, 7d, 30d, YTD.</td>
      </tr>
      <tr>
        <td><strong>Advanced</strong></td>
        <td>"Advanced filters" button</td>
        <td>Side panel</td>
        <td>Boolean combinations across &gt; 3 categories. Power-user surface.</td>
      </tr>
    </tbody>
  </table>
);

const URLStateExample = () => (
  <pre className="code">{`// Filter state lives in the URL, always. Sharing = copy + paste.
//   /vessels?type=tanker&flag=lr,pa&rating=d,e&q=atlantic&view=my-hr-tankers

// app/ui/Filters/useFilterState.ts
export function useFilterState(): [FilterState, (next: FilterState) => void] {
  const [state, setRaw] = React.useState(() => parseFilters(location.search));
  React.useEffect(() => {
    const handler = () => setRaw(parseFilters(location.search));
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);
  const set = (next: FilterState) => {
    const search = serializeFilters(next);
    history.replaceState(null, '', \`?\${search}\`);  // replace, not push, while typing
    setRaw(next);
  };
  return [state, set];
}

// Saved views are just named URL strings persisted server-side
type SavedView = {
  id: string; name: string;
  query: string;          // the URL search string
  ownerId: string;
  scope: 'private' | 'team';
};`}</pre>
);

const FilterRulesDoDont = () => (
  <div className="grid-2">
    <div className="ds-card">
      <div className="ds-card-head" style={{ background: "var(--success-050)" }}><h3 className="ds-card-title" style={{ color: "var(--success-700)" }}>DO</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>Show <strong>active filter counts</strong>, "412 of 5,983 vessels".</li>
          <li>Persist state in the URL. The back button works.</li>
          <li>Reset is a single click, never bury it in a menu.</li>
          <li>Show <strong>option counts</strong> on facets so users see "Tanker (412)" not just "Tanker".</li>
          <li>Default sort is stable across filter changes.</li>
        </ul>
      </div>
    </div>
    <div className="ds-card">
      <div className="ds-card-head" style={{ background: "var(--danger-050)" }}><h3 className="ds-card-title" style={{ color: "var(--danger-700)" }}>DON'T</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>Auto-apply filters as the user types in the facet search, debounce or wait for Apply.</li>
          <li>Hide the active filters in a panel. Chips are always visible.</li>
          <li>Reset selection on filter change. A user filtering down their selection expects it to persist.</li>
          <li>Show empty facets ("Gas Carrier (0)"): collapse to "no matches".</li>
          <li>Mix AND/OR semantics without telling the user. Within a facet = OR; across facets = AND.</li>
        </ul>
      </div>
    </div>
  </div>
);

const BulkActionRules = () => (
  <table className="spec-table">
    <thead>
      <tr><th>Concern</th><th>Rule</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Selection scope</strong></td>
        <td>The header checkbox is a <strong>tristate</strong>: empty, partial (— icon), all on current page. "Select all 5,983" is an explicit second action.</td>
      </tr>
      <tr>
        <td><strong>Action bar position</strong></td>
        <td>Sticky to the bottom of the selection scope (usually the table card), not the viewport. Slides up from the bottom on first select, fades out on clear.</td>
      </tr>
      <tr>
        <td><strong>Destructive actions</strong></td>
        <td>Confirmation modal when count ≥ 10 OR action is irreversible. Confirmation modal types the count: "Archive 23 vessels?", not just "Are you sure?".</td>
      </tr>
      <tr>
        <td><strong>Undo</strong></td>
        <td>Reversible actions show an undo toast for 8 s after completion. Time-bombed undo links to a permanent audit log entry.</td>
      </tr>
      <tr>
        <td><strong>Optimistic UI</strong></td>
        <td>Rows visually transition (fade + collapse) before the server confirms. Failure reverts with a danger toast.</td>
      </tr>
      <tr>
        <td><strong>Bulk-action result</strong></td>
        <td>Always summarize: "Archived 21 of 23 (2 failed, permission denied)". Never leave the user guessing.</td>
      </tr>
    </tbody>
  </table>
);

const SortableHeaderDemo = () => {
  const cols = [
    { key: "name", label: "Vessel", num: false },
    { key: "flag", label: "Flag", num: false },
    { key: "type", label: "Type", num: false },
    { key: "speed", label: "Speed (kn)", num: true },
    { key: "seen", label: "AIS last seen", num: true },
  ];
  const baseRows = [
    { name: "Atlantic Crown", flag: "Liberia", type: "Tanker", speed: 12.4, seen: 2 },
    { name: "Nordic Aurora", flag: "Panama", type: "Bulk Carrier", speed: 8.1, seen: 41 },
    { name: "Pacific Venture", flag: "Marshall Is.", type: "Container", speed: 18.9, seen: 0 },
    { name: "Sea Meridian", flag: "Malta", type: "Gas Carrier", speed: 0.0, seen: 376 },
    { name: "Orion Trader", flag: "Liberia", type: "Tanker", speed: 14.2, seen: 6 },
    { name: "Baltic Spirit", flag: "Cyprus", type: "General Cargo", speed: 9.6, seen: 18 },
  ];
  // null → ascending → descending → null
  const [sort, setSort] = React.useState({ key: "speed", dir: "desc" });

  const cycle = (key) =>
    setSort((s) => {
      if (s.key !== key) return { key, dir: "asc" };
      if (s.dir === "asc") return { key, dir: "desc" };
      if (s.dir === "desc") return { key: null, dir: null };
      return { key, dir: "asc" };
    });

  const rows = React.useMemo(() => {
    if (!sort.key) return baseRows;
    const sorted = [...baseRows].sort((a, b) => {
      const av = a[sort.key], bv = b[sort.key];
      const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [sort]);

  const ariaFor = (key) =>
    sort.key !== key ? "none" : sort.dir === "asc" ? "ascending" : "descending";

  return (
    <div className="surface" style={{ overflow: "hidden" }}>
      <table className="ds-table">
        <thead>
          <tr>
            {cols.map((c) => {
              const active = sort.key === c.key;
              return (
                <th
                  key={c.key}
                  scope="col"
                  className={`ds-th--sortable${active ? " ds-th--active" : ""}`}
                  aria-sort={ariaFor(c.key)}
                >
                  <button
                    type="button"
                    className={`ds-th-sort${c.num ? " num" : ""}`}
                    onClick={() => cycle(c.key)}
                    title={`Sort by ${c.label}`}
                  >
                    {c.label}
                    <span className="ds-sort-ind">
                      <Icon
                        d={active ? (sort.dir === "asc" ? I.arrowUp : I.arrowDown) : I.sort}
                        size={12}
                      />
                    </span>
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td style={{ fontWeight: 600 }}>{r.name}</td>
              <td>{r.flag}</td>
              <td>{r.type}</td>
              <td className="num">{r.speed.toFixed(1)}</td>
              <td className="num">{r.seen === 0 ? "live" : `${r.seen}h ago`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SortRulesTable = () => (
  <table className="spec-table">
    <thead>
      <tr><th>Concern</th><th>Rule</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Affordance</strong></td>
        <td>Sortable headers are <code>&lt;button&gt;</code>s inside the <code>&lt;th&gt;</code>, focusable, Enter/Space activate. A faint up/down glyph (<code>I.sort</code>) is <strong>always visible</strong> at 40% rest opacity so users know a column is sortable before they hover; it darkens to 70% on hover and turns into a solid directional arrow when active.</td>
      </tr>
      <tr>
        <td><strong>Click cycle</strong></td>
        <td>First click → <strong>ascending</strong>, second → <strong>descending</strong>, third → <strong>unsorted</strong> (returns to default order). Don't trap users in a two-state toggle with no way back to default.</td>
      </tr>
      <tr>
        <td><strong>Active indicator</strong></td>
        <td>The active column shows a solid arrow in <code>--brand-600</code>; its label darkens to <code>--text-primary</code>. Only one column is visibly active at a time (unless multi-sort is on, see below).</td>
      </tr>
      <tr>
        <td><strong>Direction glyph</strong></td>
        <td><Icon d={I.arrowUp} size={11} className="inline-ico"/> ascending = A→Z, 0→9, oldest→newest. <Icon d={I.arrowDown} size={11} className="inline-ico"/> descending = the reverse. Numeric and date columns default to <strong>descending</strong> on first click (most users want "highest / most recent first").</td>
      </tr>
      <tr>
        <td><strong>Accessibility</strong></td>
        <td>The <code>&lt;th&gt;</code> carries <code>aria-sort="ascending | descending | none"</code> and <code>scope="col"</code>. Screen readers announce the sort state on focus, the glyph alone is never the only signal.</td>
      </tr>
      <tr>
        <td><strong>Alignment</strong></td>
        <td>Numeric columns right-align both header and cells (<code>.num</code>), with the glyph trailing the label so the column reads as a single right-aligned unit.</td>
      </tr>
      <tr>
        <td><strong>Multi-sort</strong></td>
        <td>Shift-click adds a secondary sort key; a small superscript rank (<span className="ds-sort-rank" style={{ position: "static" }}>1</span> <span className="ds-sort-rank" style={{ position: "static" }}>2</span>) appears beside each active glyph. Reserve for power surfaces: most lists are single-column.</td>
      </tr>
      <tr>
        <td><strong>Persistence</strong></td>
        <td>Sort key + direction serialize into the URL (<code>?sort=speed:desc</code>) alongside filters. Refresh and permalinks restore the exact order. Default sort is stable across filter changes.</td>
      </tr>
    </tbody>
  </table>
);

const ResponsiveTableCardDemo = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="ds-card" style={{ maxWidth: 380, overflow: "hidden" }}>
      <article className={"ds-rcard" + (open ? " open" : "")}>
        <div className="ds-rcard-top">
          <div className="ds-rcard-id">
            <a className="ds-rcard-title" href="#data-primitives">ATLANTIC PIONEER</a>
            <div className="ds-rcard-sub">Liberia · IMO 9432187</div>
          </div>
          <span className="ds-badge ds-badge--info">Tanker</span>
        </div>
        <div className="ds-rcard-key">
          <div className="ds-rcard-kv"><span className="ds-rcard-k">Est. Value</span><span className="ds-rcard-v is-strong">$48.2M</span></div>
          <div className="ds-rcard-kv"><span className="ds-rcard-k">Length</span><span className="ds-rcard-v">183 m</span></div>
          <div className="ds-rcard-kv"><span className="ds-rcard-k">Gross Tonnage</span><span className="ds-rcard-v">29,650</span></div>
          <div className="ds-rcard-kv"><span className="ds-rcard-k">YOB</span><span className="ds-rcard-v">2011</span></div>
        </div>
        <div className="ds-rcard-more">
          <div className="ds-rcard-key">
            <div className="ds-rcard-kv"><span className="ds-rcard-k">Callsign</span><span className="ds-rcard-v is-mono">A8XY4</span></div>
            <div className="ds-rcard-kv"><span className="ds-rcard-k">MMSI</span><span className="ds-rcard-v is-mono">636019215</span></div>
            <div className="ds-rcard-kv"><span className="ds-rcard-k">DWT</span><span className="ds-rcard-v">49,999</span></div>
            <div className="ds-rcard-kv"><span className="ds-rcard-k">Last Seen</span><span className="ds-rcard-v is-muted">2 h ago</span></div>
          </div>
        </div>
        <button className="ds-rcard-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "Show less" : "Show more"}
          <span className="ds-rcard-chev" style={{ display: "inline-flex" }}><Icon d={I.chevron} size={13}/></span>
        </button>
      </article>
    </div>
  );
};

const ResponsiveTableSection = () => (
  <div className="subsection">
    <h3 className="subsection-title">Responsive tables &rarr; cards</h3>
    <p className="subsection-desc">
      A wide list table never becomes a horizontal scroller on a phone. Below 767&nbsp;px the table is
      swapped for a stacked card list, one card per row, with the 3–5 fields that drive decisions
      surfaced up front and the long tail behind a single <em>Show more</em> disclosure. Both markups
      ship; CSS picks the one to show, so there is no JS branch and no second data path.
    </p>
    <div className="grid-2" style={{ gap: 24, alignItems: "start" }}>
      <div>
        <div className="t-label" style={{ marginBottom: 8 }}>Live: one row as a card</div>
        <ResponsiveTableCardDemo />
        <p className="t-caption" style={{ marginTop: 8 }}>Toggle the disclosure. It uses the semantic tokens, so it follows the theme automatically.</p>
      </div>
      <div>
        <div className="t-label" style={{ marginBottom: 8 }}>Card anatomy</div>
        <div className="panel">
          {[
            ["Title", "The row's primary identifier, styled as the link it is in the table."],
            ["Subline", "One line of context: flag + IMO, vessel name, operator."],
            ["Badge", "Type or status, right-aligned on the title row."],
            ["Key grid", "2-column label-over-value pairs. The money / primary metric takes is-strong; a pair may span both columns with .is-full."],
            ["Show more", "44px min-height, theme-coloured, chevron rotates 180°."],
          ].map(([k, v], i) => (
            <div key={k} className="token-row" style={{ gridTemplateColumns: "104px 1fr" }}>
              <span style={{ fontWeight: 600, fontSize: 12.5 }}>{i + 1}. {k}</span>
              <span className="t-caption" style={{ fontSize: 12 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <table className="spec-table" style={{ marginTop: 16 }}>
      <thead><tr><th>Rule</th><th>Behaviour</th></tr></thead>
      <tbody>
        <tr><td><strong>Breakpoint</strong></td><td><code>767px</code> for in-page panels, <code>860px</code> for full-page asset tables (<code>.ds-table-cards--wide</code>).</td></tr>
        <tr><td><strong>Applies to</strong></td><td>Wide list tables: 5+ columns. Narrow tables stay tables.</td></tr>
        <tr><td><strong>Edit Columns</strong></td><td>Hidden on mobile (<code>.ds-edit-columns</code>): cards define their own field order, so column toggles carry no meaning there.</td></tr>
        <tr><td><strong>Search &amp; filters</strong></td><td>Stay available and go full-width.</td></tr>
        <tr><td><strong>Truncation</strong></td><td>Never truncate a card value, wrap it (<code>overflow-wrap: anywhere</code>). Numerics stay <code>tabular-nums</code> so stacked cards still align.</td></tr>
        <tr><td><strong>Motion</strong></td><td>Disclosure fades and rises over 220ms, matching the filter-drawer accordion. Respects <code>prefers-reduced-motion</code>.</td></tr>
      </tbody>
    </table>
    <pre className="code" style={{ marginTop: 16 }}>{`<!-- both render; CSS decides which is visible -->
<div class="ds-table-scroll">
  <table class="ds-table">…</table>
</div>
<div class="ds-table-cards">
  <article class="ds-rcard">
    <div class="ds-rcard-top">
      <div class="ds-rcard-id">
        <a class="ds-rcard-title" href="…">ATLANTIC PIONEER</a>
        <div class="ds-rcard-sub">Liberia · IMO 9432187</div>
      </div>
      <span class="ds-badge ds-badge--info">Tanker</span>
    </div>
    <div class="ds-rcard-key">
      <div class="ds-rcard-kv">
        <span class="ds-rcard-k">Est. Value</span>
        <span class="ds-rcard-v is-strong">$48.2M</span>
      </div>
      <!-- 3–5 key pairs -->
    </div>
    <div class="ds-rcard-more"><!-- the long tail --></div>
    <button class="ds-rcard-toggle" aria-expanded="false">
      Show more <span class="ds-rcard-chev">▾</span>
    </button>
  </article>
</div>`}</pre>
    <div className="callout" style={{ marginTop: 12 }}>
      <strong>Shipped in:</strong> Assets Search (Marine, Property, Aviation, Offshore) and the
      14-column policies table on Marine Portfolio Details.
    </div>
  </div>
);

const DataPrimitivesSection = () => (
  <>
    <div className="subsection" style={{ marginTop: 0 }}>
      <h3 className="subsection-title">Why this chapter</h3>
      <p className="subsection-desc" style={{ maxWidth: 820 }}>
        Search, filter, select, act; that's the loop on most Skytek surfaces. Today each module reinvents it: AssetsSearch, Companies, Ports and the vessel/aircraft lists all carry similar
        but subtly different patterns. This chapter is the canonical version every list page snaps to.
      </p>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Filter bar</h3>
      <p className="subsection-desc">
        One row above the table. Left → right: search box, active filter chips, <em>+ Add filter</em>, spacer, <em>Reset</em>, <em>Save view</em>.
        Chips are always visible; they ARE the state of the page.
      </p>
      <FilterBarDemo />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Filter types</h3>
      <p className="subsection-desc">Five filter modes. Pick by the cardinality and shape of the underlying field, not by the screen's available space.</p>
      <FilterTypesTable />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Faceted dropdown</h3>
      <p className="subsection-desc">
        Multi-select facets with counts. Local search at the top, scrollable list, footer with Apply and Clear. Apply is the commit: selecting checkboxes doesn't fire the filter.
      </p>
      <div className="grid-2" style={{ alignItems: "flex-start" }}>
        <FacetDropdownDemo />
        <div>
          <h4 style={{ fontSize: 13, marginTop: 0 }}>Counts &amp; ordering</h4>
          <p className="t-body-sm" style={{ color: "var(--text-secondary)", margin: "12px 0" }}>
            <strong>Counts</strong> reflect the result set after <em>all other filters</em> are applied, so a user filtering by Liberia sees the number of Tankers under the Liberia filter, not the global count.
            <br/><br/>
            <strong>Ordering</strong>: checked items first (stable order), then unchecked sorted by count descending. New facet sessions reset to count order.
          </p>
        </div>
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Saved views</h3>
      <p className="subsection-desc">
        A saved view is a named URL string. Sharing = copy the link. Personal vs team scope; team views are governed by the parent surface's roles.
      </p>
      <SavedViewsDemo />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">URL as source of truth</h3>
      <p className="subsection-desc">
        Filter state, sort, selected facets, search query, pagination, all serialized into the URL. Refresh restores the view. Back/forward navigate filter history. Permalinks are the system's sharing primitive.
      </p>
      <URLStateExample />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Selection &amp; bulk actions</h3>
      <p className="subsection-desc">
        Row checkboxes appear on hover; persist when any row is selected. The bulk-action bar slides in from the bottom of the table card, never the viewport edge.
      </p>
      <BulkActionBarDemo />
      <p className="t-caption" style={{ marginTop: 8 }}>Buttons above are live; they change the count to show the bar's responsive behavior.</p>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Sortable headers</h3>
      <p className="subsection-desc">
        Every column header on a list table is a sort control. Click to cycle <em>ascending → descending → unsorted</em>.
        Try the columns below: the glyph hints sortability on hover and turns solid on the active column.
      </p>
      <SortableHeaderDemo />
      <p className="t-caption" style={{ marginTop: 8 }}>Live: click any header. Third click on the same column returns to the default order.</p>
      <div style={{ marginTop: 20 }}>
        <SortRulesTable />
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Bulk-action rules</h3>
      <BulkActionRules />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Do &amp; don't</h3>
      <FilterRulesDoDont />
    </div>

    <ResponsiveTableSection />

    <div className="callout">
      <strong>The principle:</strong> the filter bar tells you what you're looking at, the URL tells you how you got here, and the bulk bar tells you what you can do about it. Three primitives, on every list page, in the same place.
    </div>
  </>
);

window.DataPrimitivesSection = DataPrimitivesSection;
