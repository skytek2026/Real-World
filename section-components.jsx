/* Section 3: Components: buttons, forms, badges, alerts, cards, tables, tabs, etc. */

const ComponentBlock = ({ id, name, purpose, variants, states, rules, children }) => (
  <div id={id} className="subsection" style={{ marginTop: 48 }}>
    <h3 className="subsection-title">
      <span>{name}</span>
      <span className="ord">component</span>
    </h3>
    <p className="subsection-desc">{purpose}</p>
    <div className="panel">
      <div className="panel-head">
        <h4>Preview</h4>
        <span className="meta">all states · all variants</span>
      </div>
      <div className="panel-body" style={{ background: "var(--bg-app)" }}>{children}</div>
      {(variants || states || rules) && (
        <table className="spec-table" style={{ border: 0, borderRadius: 0, borderTop: "1px solid var(--border-subtle)" }}>
          <tbody>
            {variants && <tr><td style={{ width: 120, color: "var(--text-muted)", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.04em" }}>Variants</td><td>{variants}</td></tr>}
            {states && <tr><td style={{ width: 120, color: "var(--text-muted)", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.04em" }}>States</td><td>{states}</td></tr>}
            {rules && <tr><td style={{ width: 120, color: "var(--text-muted)", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.04em" }}>Rules</td><td>{rules}</td></tr>}
          </tbody>
        </table>
      )}
    </div>
  </div>
);

const ButtonsBlock = () => (
  <ComponentBlock
    id="c-buttons"
    name="Buttons"
    purpose="Trigger actions. One primary per surface; secondary actions are quieter; destructive actions use the danger variant only when the action cannot be undone safely."
    variants={<><code className="inline">primary</code> · <code className="inline">secondary</code> · <code className="inline">ghost</code> · <code className="inline">danger</code> · <code className="inline">link</code></>}
    states={<>default · hover · active · disabled · loading · focus-visible</>}
    rules={<>Heights snap to <code className="inline">24 / 28 / 32 / 40px</code>. Icon-only buttons are square. Never stack &gt; 3 buttons in a row, collapse into a menu.</>}
  >
    <div className="col" style={{ gap: 24 }}>
      <div className="row">
        <button className="ds-btn ds-btn--primary"><Icon d={I.plus} /> New portfolio</button>
        <button className="ds-btn ds-btn--secondary">Cancel</button>
        <button className="ds-btn ds-btn--ghost">More</button>
        <button className="ds-btn ds-btn--danger"><Icon d={I.trash} /> Delete</button>
        <button className="ds-btn ds-btn--link">View report →</button>
      </div>
      <div className="row">
        <button className="ds-btn ds-btn--primary ds-btn--xs">xs</button>
        <button className="ds-btn ds-btn--primary ds-btn--sm">sm</button>
        <button className="ds-btn ds-btn--primary ds-btn--md">md (default)</button>
        <button className="ds-btn ds-btn--primary ds-btn--lg">lg</button>
        <button className="ds-btn ds-btn--secondary ds-btn--icon"><Icon d={I.edit} /></button>
        <button className="ds-btn ds-btn--secondary ds-btn--icon ds-btn--sm"><Icon d={I.more} /></button>
      </div>
      <div className="row">
        <button className="ds-btn ds-btn--primary" disabled>Disabled</button>
        <button className="ds-btn ds-btn--secondary" disabled>Disabled</button>
        <button className="ds-btn ds-btn--primary"><span className="ds-skel" style={{ width: 14, height: 14, borderRadius: "50%" }} /> Saving…</button>
      </div>
      <div className="callout" style={{ fontSize: 12 }}>
        <strong>Hierarchy rule:</strong> Primary on the right of a row, Secondary to its left, destructive at the far left or in an overflow menu.
        Cancel is always Secondary, never a separate variant.
      </div>
    </div>
  </ComponentBlock>
);

const FormsBlock = () => (
  <ComponentBlock
    id="c-forms"
    name="Inputs, Selects, Textareas"
    purpose="All text input controls share one shell so they can be combined inside FormField groups."
    variants={<>text · select · textarea · search · number · password</>}
    states={<>default · hover · focus · disabled · readonly · invalid · with prefix / suffix</>}
    rules={<>Height <code className="inline">32px</code> default; <code className="inline">40px</code> for primary forms. Always paired with a Label and optional Help text. Errors appear below the field, never as a tooltip.</>}
  >
    <div className="grid-2" style={{ gap: 24 }}>
      <div className="ds-field">
        <label className="ds-field-label">IMO number <span className="ds-field-required">*</span></label>
        <input className="ds-input" placeholder="e.g. 9123456" defaultValue="9123456" />
        <div className="ds-field-help">7-digit International Maritime Organization number.</div>
      </div>
      <div className="ds-field">
        <label className="ds-field-label">Vessel type</label>
        <select className="ds-input ds-select" defaultValue="bulk">
          <option value="bulk">Bulk carrier</option>
          <option value="tanker">Tanker</option>
          <option value="container">Container</option>
        </select>
      </div>
      <div className="ds-field">
        <label className="ds-field-label">Search</label>
        <div style={{ position: "relative" }}>
          <Icon d={I.search} size={14} stroke="var(--text-muted)" className="ico-14" />
          <input className="ds-input" placeholder="Search vessels, regions, policies…" style={{ paddingLeft: 32 }} />
          <span style={{ position: "absolute", left: 10, top: 9, color: "var(--text-muted)", pointerEvents: "none" }}>
            <Icon d={I.search} size={14} stroke="currentColor" />
          </span>
        </div>
      </div>
      <div className="ds-field">
        <label className="ds-field-label">Effective date</label>
        <input className="ds-input" type="text" defaultValue="2026-04-29" />
      </div>
      <div className="ds-field">
        <label className="ds-field-label">Notes</label>
        <textarea className="ds-input" style={{ height: 72, padding: 8, resize: "vertical" }} placeholder="Optional context for the underwriter…" />
      </div>
      <div className="ds-field">
        <label className="ds-field-label">Premium (USD)</label>
        <input className="ds-input" defaultValue="−250" aria-invalid="true" />
        <div className="ds-field-error"><Icon d={I.alert} size={12} /> Must be a positive number.</div>
      </div>
      <div className="ds-field">
        <label className="ds-field-label">Disabled</label>
        <input className="ds-input" defaultValue="Read only" disabled />
      </div>
      <div className="ds-field">
        <label className="ds-field-label">Toggles & checks</label>
        <div className="row" style={{ gap: 16 }}>
          <label className="row" style={{ gap: 4, fontSize: 13 }}><input type="checkbox" className="ds-check" defaultChecked /> Active</label>
          <label className="row" style={{ gap: 4, fontSize: 13 }}><input type="checkbox" className="ds-check" /> Archived</label>
          <label className="row" style={{ gap: 4, fontSize: 13 }}><input type="radio" name="r" className="ds-radio" defaultChecked /> Daily</label>
          <label className="row" style={{ gap: 4, fontSize: 13 }}><input type="radio" name="r" className="ds-radio" /> Weekly</label>
          <button role="switch" aria-checked="true" className="ds-switch" />
          <button role="switch" aria-checked="false" className="ds-switch" />
        </div>
      </div>
    </div>
  </ComponentBlock>
);

const BadgesBlock = () => (
  <ComponentBlock
    id="c-badges"
    name="Badges & Status"
    purpose="Inline labels for status, count and category. Risk ratings (A–E) are a distinct, locked-down primitive."
    variants={<>neutral · info · success · warning · danger · with dot · risk-rating</>}
    rules={<>Tone is semantic, not decorative. Use neutral for counts; reserve color tones for genuine status.</>}
  >
    <div className="col" style={{ gap: 16 }}>
      <div className="row">
        <span className="ds-badge ds-badge--neutral">Draft</span>
        <span className="ds-badge ds-badge--info ds-badge--dot">In review</span>
        <span className="ds-badge ds-badge--success ds-badge--dot">Compliant</span>
        <span className="ds-badge ds-badge--warning ds-badge--dot">At risk</span>
        <span className="ds-badge ds-badge--danger ds-badge--dot">Sanctioned</span>
        <span className="ds-badge ds-badge--neutral">42 vessels</span>
      </div>
      <div className="row">
        <span className="ds-rating ds-rating--a">A</span>
        <span className="ds-rating ds-rating--b">B</span>
        <span className="ds-rating ds-rating--c">C</span>
        <span className="ds-rating ds-rating--d">D</span>
        <span className="ds-rating ds-rating--e">E</span>
        <span className="t-caption">PSC compliance grades: tied to <code className="inline">--rating-*</code></span>
      </div>
    </div>
  </ComponentBlock>
);

const AlertsBlock = () => (
  <ComponentBlock
    id="c-alerts"
    name="Alerts & Banners"
    purpose="Persistent feedback for the current surface. Toasts (transient) are a separate component."
    variants={<>info · success · warning · danger</>}
    rules={<>Always lead with a short <em>title</em>, then a sentence of context. Include a primary action when one exists; never two CTAs.</>}
  >
    <div className="col" style={{ gap: 12 }}>
      <div className="ds-alert ds-alert--info">
        <Icon d={I.info} className="ds-alert-icon" stroke="var(--info-700)" />
        <div className="ds-alert-body"><div className="ds-alert-title">Region data refreshed</div>13 new vessels matched your North Atlantic filter set.</div>
      </div>
      <div className="ds-alert ds-alert--success">
        <Icon d={I.check} className="ds-alert-icon" stroke="var(--success-700)" />
        <div className="ds-alert-body"><div className="ds-alert-title">Policy saved</div>Policy #44721 was added to <em>Atlantic Hull Programme 2026</em>.</div>
      </div>
      <div className="ds-alert ds-alert--warning">
        <Icon d={I.warn} className="ds-alert-icon" stroke="var(--warning-700)" />
        <div className="ds-alert-body"><div className="ds-alert-title">Severe weather along voyage</div>Force 9 conditions forecast crossing the planned route within 24h.</div>
      </div>
      <div className="ds-alert ds-alert--danger">
        <Icon d={I.alert} className="ds-alert-icon" stroke="var(--danger-700)" />
        <div className="ds-alert-body"><div className="ds-alert-title">Sanctioned vessel detected</div>1 vessel in this portfolio matches the OFAC SDN list. Action required.</div>
      </div>
    </div>
  </ComponentBlock>
);

const CardsBlock = () => (
  <ComponentBlock
    id="c-cards"
    name="Cards"
    purpose="Group related content on dashboards and detail pages. Cards never nest more than one level deep."
    variants={<>plain · stat · list · with footer actions</>}
    rules={<>Single border + <code className="inline">shadow-xs</code>. Card title is H3 / 16px. Internal padding 16px (or 24px on dashboards). Footer actions are <strong>ghost (tertiary) buttons only, in ALL CAPS</strong>, never a filled primary inside a card foot.</>}
  >
    <div className="col" style={{ gap: 24 }}>
      <div className="grid-3">
        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-card-title">Vessels at risk</h3><span className="t-caption">Today</span></div>
          <div className="ds-card-body">
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="t-display">23</span>
              <span className="ds-badge ds-badge--danger ds-badge--dot">+4</span>
            </div>
            <p className="t-caption" style={{ marginTop: 8 }}>across 6 portfolios</p>
          </div>
        </div>
        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-card-title">Compliance score</h3></div>
          <div className="ds-card-body">
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="t-display">94<span style={{ fontSize: 20, color: "var(--text-muted)" }}>%</span></span>
              <span className="ds-badge ds-badge--success ds-badge--dot">+1.2</span>
            </div>
            <div className="ds-progress" style={{ marginTop: 12 }}><span style={{ width: "94%" }} /></div>
          </div>
        </div>
        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-card-title">Recent activity</h3><a className="ds-btn ds-btn--link">View all</a></div>
          <div className="ds-card-body" style={{ padding: 0 }}>
            {["Policy #44721 added", "Region NA-04 updated", "M/V Stratos flagged"].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderTop: i ? "1px solid var(--border-subtle)" : 0, fontSize: 13 }}>
                <span className="ds-avatar" style={{ width: 22, height: 22, fontSize: 11 }}>JL</span>
                <span style={{ flex: 1 }}>{t}</span>
                <span className="t-caption">2m</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card footers: ghost buttons, ALL CAPS */}
      <div className="col" style={{ gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>Card footers: ghost (tertiary) buttons, ALL CAPS</div>
        <div className="grid-3">
          {/* Right-aligned dual action (default) */}
          <div className="ds-card">
            <div className="ds-card-head"><h3 className="ds-card-title">Sanctions review</h3></div>
            <div className="ds-card-body" style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55 }}>M/V Stratos matched a watchlist entry. Confirm before the policy can bind.</div>
            <div className="ds-card-foot">
              <button className="ds-btn ds-btn--ghost ds-btn--sm">Dismiss</button>
              <button className="ds-btn ds-btn--ghost ds-btn--sm">Review</button>
            </div>
          </div>
          {/* Space-between: meta + single action */}
          <div className="ds-card">
            <div className="ds-card-head"><h3 className="ds-card-title">Voyage export</h3></div>
            <div className="ds-card-body" style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55 }}>42 voyages in the current filter. Export a CSV for the underwriting committee.</div>
            <div className="ds-card-foot ds-card-foot--between">
              <span className="t-caption" style={{ textTransform: "none" }}>Updated 2m ago</span>
              <button className="ds-btn ds-btn--ghost ds-btn--sm"><Icon d={I.download} /> Export</button>
            </div>
          </div>
          {/* Left-aligned single action */}
          <div className="ds-card">
            <div className="ds-card-head"><h3 className="ds-card-title">Region NA-04</h3></div>
            <div className="ds-card-body" style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55 }}>3 vessels added since your last visit. Open the region to review the updated roster.</div>
            <div className="ds-card-foot ds-card-foot--start">
              <button className="ds-btn ds-btn--ghost ds-btn--sm">Open region</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ComponentBlock>
);

const MetricCardsBlock = () => (
  <ComponentBlock
    id="c-metrics"
    name="Metric cards & stat strips"
    purpose="Surface key numbers at the top of a view. One glance should tell the underwriter what's happening, value, unit and direction."
    variants={<><code className="inline">metric strip</code> · <code className="inline">single stat card</code> · <code className="inline">stat + delta</code></>}
    rules={<>
      Always abbreviate at scale: <code className="inline">4,932</code> stays as-is; <code className="inline">$605,200,000</code> becomes <code className="inline">$605.2M</code>.
      Use 1 decimal place for abbreviated values. Currency: prefix <code className="inline">$</code>, right-align in tables, brand-colored in strips.
      Counts: no symbol, neutral <code className="inline">text-primary</code> unless the number signals risk (then use danger color).
      Label is 11–12 px muted, always above the value, never below.
      Strip background: <code className="inline">brand-050</code> with <code className="inline">brand-100</code> borders. Max 4 metrics per strip before it wraps to a 2×2 grid.
      Delta badges show change vs. prior period; up = danger (risk increasing), down = success (risk decreasing).
    </>}
  >
    <div className="col" style={{ gap: 32 }}>

      {/* Metric strip: matches reference */}
      <div className="col" style={{ gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>Metric strip: 2-up</div>
        <div className="ds-metric-strip">
          <div className="ds-metric">
            <span className="ds-metric-label">Total Policies</span>
            <span className="ds-metric-value ds-metric-value--neutral">4,932</span>
          </div>
          <div className="ds-metric">
            <span className="ds-metric-label">Total Exposure</span>
            <span className="ds-metric-value">$605.2B</span>
          </div>
        </div>
      </div>

      {/* Metric strip: 4-up */}
      <div className="col" style={{ gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>Metric strip: 4-up with deltas</div>
        <div className="ds-metric-strip">
          <div className="ds-metric">
            <span className="ds-metric-label">Active Vessels</span>
            <span className="ds-metric-value ds-metric-value--neutral">1,204</span>
            <span className="ds-metric-delta up">
              <Icon d={I.arrowUp} size={11} />+23 this week
            </span>
          </div>
          <div className="ds-metric">
            <span className="ds-metric-label">High Risk</span>
            <span className="ds-metric-value ds-metric-value--danger">87</span>
            <span className="ds-metric-delta up">
              <Icon d={I.arrowUp} size={11} />+4 today
            </span>
          </div>
          <div className="ds-metric">
            <span className="ds-metric-label">Compliance Score</span>
            <span className="ds-metric-value ds-metric-value--success">94%</span>
            <span className="ds-metric-delta down">
              <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14m7-7-7 7-7-7"/></svg>
              −0.4 vs last month
            </span>
          </div>
          <div className="ds-metric">
            <span className="ds-metric-label">Total Exposure</span>
            <span className="ds-metric-value">$2.1T</span>
            <span className="ds-metric-delta" style={{ color: "var(--text-muted)" }}>— unchanged</span>
          </div>
        </div>
      </div>

      {/* Individual stat cards */}
      <div className="col" style={{ gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>Individual stat cards</div>
        <div className="grid-3">
          <div className="ds-card">
            <div className="ds-card-head"><h3 className="ds-card-title">Vessels at risk</h3><span className="t-caption">Live</span></div>
            <div className="ds-card-body">
              <span className="ds-metric-value ds-metric-value--danger" style={{ fontSize: 32 }}>23</span>
              <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                <span className="ds-badge ds-badge--danger">+4 today</span>
                <span className="t-caption">across 6 portfolios</span>
              </div>
            </div>
          </div>
          <div className="ds-card">
            <div className="ds-card-head"><h3 className="ds-card-title">Total Exposure</h3><span className="t-caption">All portfolios</span></div>
            <div className="ds-card-body">
              <span className="ds-metric-value" style={{ fontSize: 32 }}>$605.2B</span>
              <div style={{ marginTop: 4 }}>
                <span className="t-caption">$360.8B marine hull · $244.4B other</span>
              </div>
            </div>
          </div>
          <div className="ds-card">
            <div className="ds-card-head"><h3 className="ds-card-title">Compliance score</h3><span className="t-caption">This quarter</span></div>
            <div className="ds-card-body">
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span className="ds-metric-value ds-metric-value--success" style={{ fontSize: 32 }}>94<span style={{ fontSize: 20, fontWeight: 500 }}>%</span></span>
                <span className="ds-badge ds-badge--success">↑ +1.2</span>
              </div>
              <div className="ds-progress" style={{ marginTop: 12 }}><span style={{ width: "94%" }} /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Number formatting rules */}
      <div className="col" style={{ gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>Number formatting reference</div>
        <div className="ds-card" style={{ overflow: "hidden", padding: 0 }}>
          <table className="ds-table">
            <thead>
              <tr><th>Raw value</th><th>Display as</th><th>Notes</th></tr>
            </thead>
            <tbody>
              {[
                ["4,932", "4,932", "Under 10K: show exact with comma separator"],
                ["$605,200,000", "$605.2M", "Abbreviate ≥ 1M; 1 decimal place"],
                ["$2,100,000,000,000", "$2.1T", "Abbreviate ≥ 1B → B; ≥ 1T → T"],
                ["0.9412", "94%", "Percentages: 0 decimal places unless < 10%"],
                ["−0.004 change", "−0.4%", "Deltas: always show sign + 1 decimal"],
                ["87 (risk count)", "87", "Counts: no abbreviation under 10K"],
              ].map(([raw, display, note]) => (
                <tr key={raw}>
                  <td><code style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>{raw}</code></td>
                  <td><strong style={{ fontVariantNumeric: "tabular-nums" }}>{display}</strong></td>
                  <td style={{ color: "var(--text-secondary)", fontSize: 12 }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </ComponentBlock>
);

const TablesBlock = () => {
  const cols = [
    { key: "name",   label: "Vessel",      num: false, width: undefined },
    { key: "imo",    label: "IMO",         num: false, width: 120 },
    { key: "flag",   label: "Flag",        num: false, width: 90 },
    { key: "risk",   label: "Risk",        num: false, width: 90 },
    { key: "status", label: "Status",      num: false, width: 140 },
    { key: "sum",    label: "Sum insured", num: true,  width: 130 },
  ];
  const baseRows = [
    { name: "M/V Stratos",       imo: "9472183", flag: "MT", risk: "A", status: "Compliant",  sum: 28_400_000 },
    { name: "Aegean Pioneer",    imo: "9301847", flag: "GR", risk: "B", status: "In review",  sum: 14_900_000 },
    { name: "Bristol Endeavour", imo: "9618742", flag: "GB", risk: "C", status: "At risk",    sum: 19_500_000 },
    { name: "Norwegian Beacon",  imo: "9510938", flag: "NO", risk: "A", status: "Compliant",  sum: 31_200_000 },
    { name: "Helios Carrier",    imo: "9432751", flag: "PA", risk: "E", status: "Sanctioned", sum: 12_700_000 },
  ];
  // null → ascending → descending → null. Numeric columns open descending.
  const [sort, setSort] = React.useState({ key: "sum", dir: "desc" });

  const cycle = (key, num) =>
    setSort((s) => {
      const first = num ? "desc" : "asc";
      const second = num ? "asc" : "desc";
      if (s.key !== key) return { key, dir: first };
      if (s.dir === first) return { key, dir: second };
      return { key: null, dir: null };
    });

  const rows = React.useMemo(() => {
    if (!sort.key) return baseRows;
    return [...baseRows].sort((a, b) => {
      const av = a[sort.key], bv = b[sort.key];
      const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [sort]);

  const ariaFor = (key) => (sort.key !== key ? "none" : sort.dir === "asc" ? "ascending" : "descending");

  return (
  <ComponentBlock
    id="c-tables"
    name="Tables"
    purpose="The most-used surface in this product. Density is critical: an underwriter scans 200+ rows per session."
    variants={<>default · compact · comfy · with selection · sortable header</>}
    rules={<>One implementation only: replaces the four current variants. Sticky header, alternating-row backgrounds removed in favor of subtle hover highlight. Numeric columns right-aligned with <code className="inline">tabular-nums</code>. Every column header is a sort control, click to cycle <em>ascending → descending → unsorted</em>; the <Icon d={I.sort} size={11} className="inline-ico" /> glyph is always visible so columns read as sortable, and turns into a solid <Icon d={I.arrowDown} size={11} className="inline-ico" /> on the active column. Headers carry <code className="inline">aria-sort</code> for screen readers.</>}
  >
    <div className="ds-card" style={{ overflow: "hidden", padding: 0 }}>
      <div style={{ padding: 12, borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: 8 }}>
        <h3 className="ds-card-title" style={{ flex: 1 }}>Portfolio · Atlantic Hull Programme 2026</h3>
        <button className="ds-btn ds-btn--ghost ds-btn--sm"><Icon d={I.filter} /> Filter</button>
        <button className="ds-btn ds-btn--secondary ds-btn--sm"><Icon d={I.download} /> Export</button>
      </div>
      <table className="ds-table">
        <thead>
          <tr>
            <th style={{ width: 28 }}><input type="checkbox" className="ds-check" /></th>
            {cols.map((c) => {
              const active = sort.key === c.key;
              return (
                <th
                  key={c.key}
                  scope="col"
                  style={c.width ? { width: c.width } : undefined}
                  className={`ds-th--sortable${active ? " ds-th--active" : ""}`}
                  aria-sort={ariaFor(c.key)}
                >
                  <button
                    type="button"
                    className={`ds-th-sort${c.num ? " num" : ""}`}
                    onClick={() => cycle(c.key, c.num)}
                    title={`Sort by ${c.label}`}
                  >
                    {c.label}
                    <span className="ds-sort-ind">
                      <Icon d={active ? (sort.dir === "asc" ? I.arrowUp : I.arrowDown) : I.sort} size={12} />
                    </span>
                  </button>
                </th>
              );
            })}
            <th style={{ width: 60 }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.imo}>
              <td><input type="checkbox" className="ds-check" /></td>
              <td><strong>{r.name}</strong></td>
              <td className="t-mono" style={{ fontSize: 12 }}>{r.imo}</td>
              <td>{r.flag}</td>
              <td><span className={`ds-rating ds-rating--${r.risk.toLowerCase()}`}>{r.risk}</span></td>
              <td><span className={`ds-badge ds-badge--${r.status==="Compliant"?"success":r.status==="In review"?"info":r.status==="At risk"?"warning":"danger"} ds-badge--dot`}>{r.status}</span></td>
              <td className="num">${r.sum.toLocaleString()}</td>
              <td><button className="ds-btn ds-btn--ghost ds-btn--icon ds-btn--sm"><Icon d={I.more} /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ padding: "8px 12px", borderTop: "1px solid var(--border-subtle)", background: "var(--slate-050)" }}>
        <span className="t-caption">Live: click any header to sort. First click sorts (numeric columns open descending), a second reverses, a third returns to the default order.</span>
      </div>
    </div>
  </ComponentBlock>
  );
};

const NavTabsBlock = () => {
  const [activeTab, setActiveTab] = React.useState("Overview");
  const tabs = ["Overview", "Voyages", "Casualties", "Compliance", "Documents"];
  const motion = window.Motion || window.framerMotion || window.FramerMotion;
  const M = motion ? motion.motion : null;
  return (
  <ComponentBlock
    id="c-tabs"
    name="Tabs, Breadcrumbs & Page header"
    purpose="Top-of-page navigation primitives. Tabs switch views within a single resource; breadcrumbs show hierarchy."
  >
    <div className="ds-card">
      <div style={{ padding: "16px 20px 0", display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--text-muted)" }}>
        <a className="ds-btn ds-btn--link" style={{ fontSize: 12 }}>Portfolios</a>
        <Icon d={I.chevronRight} size={12} />
        <a className="ds-btn ds-btn--link" style={{ fontSize: 12 }}>Atlantic Hull 2026</a>
        <Icon d={I.chevronRight} size={12} />
        <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>M/V Stratos</span>
      </div>
      <div style={{ padding: "8px 20px 16px", display: "flex", alignItems: "center", gap: 16 }}>
        <h2 className="t-h1" style={{ flex: 1, margin: 0 }}>M/V Stratos</h2>
        <button className="ds-btn ds-btn--secondary"><Icon d={I.download} /> Export PDF</button>
        <button className="ds-btn ds-btn--primary"><Icon d={I.flag} /> Flag for review</button>
      </div>
      <div className="ds-tabs" style={{ margin: "0 20px 16px" }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              className="ds-tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab)}
            >
              {isActive && M && (
                <M.span
                  key="pill"
                  layoutId="ds-tab-pill"
                  className="ds-tab-pill"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span key="label" className="ds-tab-label">{tab}</span>
            </button>
          );
        })}
      </div>
    </div>
  </ComponentBlock>
  );
};

const OverlayBlock = () => (
  <ComponentBlock
    id="c-overlays"
    name="Modals &amp; Drawers"
    purpose="Surfaces that overlay the page. Modals block; drawers don't."
    rules={<>Modal width <code className="inline">480 / 640 / 800px</code>. Drawer width <code className="inline">400 / 560 / 720px</code> from right. <a href="#c-tooltip">Tooltips</a> and <a href="#c-popover">Popovers</a> have their own full specifications.</>}
  >
    <div className="grid-2">
      <div className="surface" style={{ padding: 0 }}>
        <div className="surface-toolbar"><span className="dot r" /><span className="dot y" /><span className="dot g" /><span style={{ marginLeft: 8 }}>modal · 480px</span></div>
        <div style={{ background: "rgba(15,23,42,0.4)", padding: "20px 24px", display: "grid", placeItems: "center", minHeight: 240 }}>
          <div style={{ background: "white", width: 380, borderRadius: 8, boxShadow: "var(--shadow-xl)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center" }}>
              <h3 className="ds-card-title" style={{ flex: 1 }}>Delete portfolio?</h3>
              <button className="ds-btn ds-btn--ghost ds-btn--icon ds-btn--sm"><Icon d={I.x} /></button>
            </div>
            <div style={{ padding: "16px 20px", fontSize: 13, color: "var(--text-secondary)" }}>This will permanently remove <strong style={{ color: "var(--text-primary)" }}>Atlantic Hull 2026</strong>, its 142 policies, and all associated voyage data. This cannot be undone.</div>
            <div style={{ padding: "12px 20px", borderTop: "1px solid var(--border-subtle)", background: "var(--slate-050)", display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button className="ds-btn ds-btn--secondary">Cancel</button>
              <button className="ds-btn ds-btn--danger">Delete portfolio</button>
            </div>
          </div>
        </div>
      </div>
      <div className="surface" style={{ padding: 0 }}>
        <div className="surface-toolbar"><span className="dot r" /><span className="dot y" /><span className="dot g" /><span style={{ marginLeft: 8 }}>empty state</span></div>
        <div style={{ padding: 24, display: "grid", gap: 16 }}>
          <div className="ds-empty">
            <div className="ds-empty-icon"><Icon d={I.folder} size={20} /></div>
            <h4>No vessels match these filters</h4>
            <p>Try widening the risk range or removing the flag filter.</p>
            <button className="ds-btn ds-btn--secondary ds-btn--sm">Reset filters</button>
          </div>
        </div>
      </div>
    </div>
    <div className="callout" style={{ marginTop: 16 }}>
      <strong>Modals are a standardized component.</strong> See the live, tokenized <a href="#c-modal" style={{ color: "var(--brand-600)", fontWeight: 600 }}>Modal: full specification</a> for the production API, slots, sizes and accessibility.
    </div>
  </ComponentBlock>
);

const LoadingBlock = () => (
  <ComponentBlock
    id="c-loading"
    name="Loading & Skeleton states"
    purpose="Never block the user with a full-page spinner. Skeleton frames mirror final layout so perceived load time is short."
    rules={<>Tables and cards have skeleton variants. Use a thin top progress bar for navigation. Spinners only appear inside buttons / row actions.</>}
  >
    <div className="grid-2">
      <div className="ds-card">
        <div className="ds-card-head"><span className="ds-skel" style={{ width: 120 }} /></div>
        <div className="ds-card-body" style={{ display: "grid", gap: 8 }}>
          <span className="ds-skel" style={{ width: "70%" }} />
          <span className="ds-skel" style={{ width: "90%" }} />
          <span className="ds-skel" style={{ width: "50%" }} />
        </div>
      </div>
      <div className="ds-card">
        <table className="ds-table">
          <thead><tr><th>Vessel</th><th>IMO</th><th>Risk</th></tr></thead>
          <tbody>{[0,1,2,3].map(i => (
            <tr key={i}><td><span className="ds-skel" style={{ width: 140 }}/></td><td><span className="ds-skel" style={{ width: 80 }}/></td><td><span className="ds-skel" style={{ width: 24, height: 16 }}/></td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  </ComponentBlock>
);

const PaginationBlock = () => (
  <ComponentBlock
    id="c-pagination"
    name="Pagination"
    purpose="Navigates large datasets across pages. Always paired with a results summary so the user knows their position in the set."
    variants={<><code className="inline">default</code> · <code className="inline">compact</code> · <code className="inline">table-footer</code></>}
    states={<>default · hover · active (current page) · disabled (prev on page 1 / next on last page)</>}
    rules={<>Show page numbers when total pages ≤ 7; collapse middle pages with an ellipsis beyond that. Minimum hit target <code className="inline">32×32px</code>. Always show a results count (<em>"1–25 of 847 results"</em>). Never use pagination for infinite-scroll surfaces, use a "Load more" button instead.</>}
  >
    <div className="col" style={{ gap: 32 }}>

      {/* Default: numbered */}
      <div className="col" style={{ gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Default</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>1–25 of 847 results</span>
          <nav className="ds-pagination" aria-label="Pagination">
            <button className="ds-page-btn" disabled aria-label="Previous page">
              <Icon d={I.chevronLeft} size={14} />
            </button>
            <button className="ds-page-btn is-active" aria-current="page">1</button>
            <button className="ds-page-btn">2</button>
            <button className="ds-page-btn">3</button>
            <button className="ds-page-btn">4</button>
            <button className="ds-page-btn">5</button>
            <span className="ds-page-ellipsis">…</span>
            <button className="ds-page-btn">34</button>
            <button className="ds-page-btn" aria-label="Next page">
              <Icon d={I.chevronRight} size={14} />
            </button>
          </nav>
        </div>
      </div>

      <hr className="section-hr" style={{ margin: "0" }} />

      {/* Compact: prev/next only */}
      <div className="col" style={{ gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Compact</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>26–50 of 847 results</span>
          <div className="ds-pagination--compact">
            <button className="ds-page-btn" aria-label="Previous page"><Icon d={I.chevronLeft} size={14} /></button>
            <span className="page-label">Page <strong style={{ color: "var(--text-primary)" }}>2</strong> of 34</span>
            <button className="ds-page-btn" aria-label="Next page"><Icon d={I.chevronRight} size={14} /></button>
          </div>
        </div>
      </div>

      <hr className="section-hr" style={{ margin: "0" }} />

      {/* Table footer: full strip */}
      <div className="col" style={{ gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Table footer</div>
        <div className="ds-card" style={{ overflow: "hidden", padding: 0 }}>
          <table className="ds-table">
            <thead>
              <tr>
                <th>Vessel</th>
                <th>IMO</th>
                <th>Flag</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["M/V Stratos",   "9801234", "Panama",  "medium"],
                ["M/V Oceanus",   "9712345", "Liberia", "high"],
                ["M/V Nereid",    "9623456", "Malta",   "low"],
                ["M/V Tethys",    "9534567", "Bahamas", "medium"],
              ].map(([vessel, imo, flag, risk]) => (
                <tr key={imo}>
                  <td style={{ fontWeight: 500 }}>{vessel}</td>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{imo}</td>
                  <td>{flag}</td>
                  <td>
                    <span className={`ds-badge ds-badge--${risk === "high" ? "danger" : risk === "medium" ? "warning" : "success"}`}>
                      {risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="ds-pagination-wrap">
            <span>Showing 1–4 of 847 vessels</span>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
                Rows per page
                <select className="ds-input" style={{ height: 28, width: "auto", padding: "0 8px", fontSize: 13 }}>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </label>
              <nav className="ds-pagination" aria-label="Table pagination">
                <button className="ds-page-btn" disabled aria-label="Previous"><Icon d={I.chevronLeft} size={14} /></button>
                <button className="ds-page-btn is-active">1</button>
                <button className="ds-page-btn">2</button>
                <button className="ds-page-btn">3</button>
                <span className="ds-page-ellipsis">…</span>
                <button className="ds-page-btn">34</button>
                <button className="ds-page-btn" aria-label="Next"><Icon d={I.chevronRight} size={14} /></button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <hr className="section-hr" style={{ margin: "0" }} />

      {/* Mobile / small screen */}
      <div className="col" style={{ gap: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>Mobile · &lt; 640px</div>
        <p style={{ margin: 0, fontSize: 13, color: "var(--text-secondary)", maxWidth: 720 }}>
          Numbered page lists don't fit and the hit targets are too small. Collapse to a stacked layout with prev / next as the primary controls,
          a page-of-total label, and an optional "jump to page" sheet for deep result sets. Hit targets are <strong>44×44 px</strong> minimum.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>

          {/* DO: recommended mobile layout */}
          <div className="col" style={{ gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--success-700)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Do: stacked controls</div>
            <div style={{ width: 360, maxWidth: "100%", margin: "0 auto", border: "8px solid #1F2937", borderRadius: 28, overflow: "hidden", background: "var(--white)" }}>
              {/* status bar */}
              <div style={{ height: 28, background: "var(--white)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", fontSize: 11, fontWeight: 600 }}>
                <span>9:41</span>
                <span style={{ display: "flex", gap: 4, alignItems: "center", color: "var(--text-primary)" }}>● ● ●</span>
              </div>
              {/* fake list rows */}
              <div style={{ background: "var(--bg-app)", padding: "12px 16px", display: "grid", gap: 8 }}>
                {[
                  ["M/V Stratos", "Panama · medium"],
                  ["M/V Oceanus", "Liberia · high"],
                  ["M/V Nereid",  "Malta · low"],
                ].map(([v, m]) => (
                  <div key={v} className="ds-card" style={{ padding: "12px 12px" }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{v}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{m}</div>
                  </div>
                ))}
              </div>
              {/* mobile pagination strip */}
              <div style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--slate-050)", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "var(--text-muted)" }}>
                  <span>1–25 of 847</span>
                  <button className="ds-btn ds-btn--link" style={{ fontSize: 12 }}>Jump to page…</button>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="ds-btn ds-btn--secondary" style={{ flex: 1, height: 44, justifyContent: "center" }}>
                    <Icon d={I.chevronLeft} size={16} /> Prev
                  </button>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px", minWidth: 86, background: "var(--white)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", fontSize: 13, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                    1 / 34
                  </div>
                  <button className="ds-btn ds-btn--primary" style={{ flex: 1, height: 44, justifyContent: "center" }}>
                    Next <Icon d={I.chevronRight} size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* DON'T: desktop pagination crammed onto mobile */}
          <div className="col" style={{ gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--danger-700)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Don't: desktop pattern on phone</div>
            <div style={{ width: 360, maxWidth: "100%", margin: "0 auto", border: "8px solid #1F2937", borderRadius: 28, overflow: "hidden", background: "var(--white)" }}>
              <div style={{ height: 28, background: "var(--white)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", fontSize: 11, fontWeight: 600 }}>
                <span>9:41</span>
                <span style={{ display: "flex", gap: 4, alignItems: "center", color: "var(--text-primary)" }}>● ● ●</span>
              </div>
              <div style={{ background: "var(--bg-app)", padding: "12px 16px", display: "grid", gap: 8 }}>
                {[["M/V Stratos","Panama · medium"],["M/V Oceanus","Liberia · high"],["M/V Nereid","Malta · low"]].map(([v, m]) => (
                  <div key={v} className="ds-card" style={{ padding: "12px 12px" }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{v}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{m}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--slate-050)", padding: "12px 8px", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center" }}>Showing 1–25 of 847 results</div>
                {/* cramped numbered row: intentionally bad */}
                <nav className="ds-pagination" aria-label="bad" style={{ justifyContent: "center", overflowX: "auto" }}>
                  <button className="ds-page-btn" disabled style={{ minWidth: 26, height: 26, padding: 0 }}><Icon d={I.chevronLeft} size={12} /></button>
                  <button className="ds-page-btn is-active" style={{ minWidth: 26, height: 26, padding: 0, fontSize: 11 }}>1</button>
                  <button className="ds-page-btn" style={{ minWidth: 26, height: 26, padding: 0, fontSize: 11 }}>2</button>
                  <button className="ds-page-btn" style={{ minWidth: 26, height: 26, padding: 0, fontSize: 11 }}>3</button>
                  <button className="ds-page-btn" style={{ minWidth: 26, height: 26, padding: 0, fontSize: 11 }}>4</button>
                  <button className="ds-page-btn" style={{ minWidth: 26, height: 26, padding: 0, fontSize: 11 }}>5</button>
                  <span className="ds-page-ellipsis" style={{ minWidth: 14, height: 26, fontSize: 11 }}>…</span>
                  <button className="ds-page-btn" style={{ minWidth: 26, height: 26, padding: 0, fontSize: 11 }}>34</button>
                  <button className="ds-page-btn" style={{ minWidth: 26, height: 26, padding: 0 }}><Icon d={I.chevronRight} size={12} /></button>
                </nav>
                <div style={{ fontSize: 11, color: "var(--danger-600)", textAlign: "center", marginTop: 2 }}>26px hit targets · fails WCAG 2.5.5</div>
              </div>
            </div>
          </div>
        </div>

        {/* Include / Drop table */}
        <div className="grid-2" style={{ gap: 16, marginTop: 8 }}>
          <div style={{ background: "var(--success-050)", border: "1px solid var(--success-100)", borderRadius: "var(--radius-md)", padding: "16px 16px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--success-700)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Include on mobile</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.65, color: "var(--text-primary)" }}>
              <li><strong>Prev / Next buttons</strong>, full-width, min 44×44 px, labelled with icon + text</li>
              <li><strong>Current page indicator</strong>, "1 / 34" pill between the buttons</li>
              <li><strong>Result count</strong>, condensed: <code className="inline">"1–25 of 847"</code></li>
              <li><strong>Jump to page</strong>, link that opens a bottom sheet with a numeric input (only when total pages &gt; 10)</li>
              <li><strong>Disabled state</strong>, prev on page 1, next on last page</li>
            </ul>
          </div>
          <div style={{ background: "var(--danger-050)", border: "1px solid var(--danger-100)", borderRadius: "var(--radius-md)", padding: "16px 16px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--danger-700)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Drop on mobile</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.65, color: "var(--text-primary)" }}>
              <li><strong>Numbered page list</strong>, hit targets fall below 44 px and the row overflows</li>
              <li><strong>Ellipsis collapsing</strong>, irrelevant once the number strip is gone</li>
              <li><strong>"Rows per page" selector</strong>, move to the filter / settings sheet; default to 25</li>
              <li><strong>Word "results"</strong>, abbreviate aggressively; screen real estate is the constraint</li>
              <li><strong>First / Last buttons</strong>, replaced by the jump-to-page sheet</li>
            </ul>
          </div>
        </div>

        {/* Breakpoint specs */}
        <div className="ds-card" style={{ overflow: "hidden", padding: 0, marginTop: 8 }}>
          <table className="ds-table">
            <thead>
              <tr><th>Breakpoint</th><th>Layout</th><th>Hit target</th><th>Page numbers shown</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>&lt; 640px</strong><br /><span className="t-caption">phone</span></td>
                <td>Stacked: count + jump link on row 1, full-width Prev / page-of-total / Next on row 2</td>
                <td>44 × 44 px</td>
                <td>Current only (e.g. "1 / 34")</td>
              </tr>
              <tr>
                <td><strong>640 – 1024px</strong><br /><span className="t-caption">tablet</span></td>
                <td>Single row, compact: count on left, prev / page-of-total / next on right</td>
                <td>36 × 36 px</td>
                <td>Current only</td>
              </tr>
              <tr>
                <td><strong>≥ 1024px</strong><br /><span className="t-caption">desktop</span></td>
                <td>Full numbered list with ellipsis + rows-per-page selector</td>
                <td>32 × 32 px</td>
                <td>Up to 7 + ellipsis</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </ComponentBlock>
);

const ComponentsSection = () => (
  <>
    <ButtonsBlock />
    <FormsBlock />
    <BadgesBlock />
    <AlertsBlock />
    <CardsBlock />
    <MetricCardsBlock />
    <TablesBlock />
    <NavTabsBlock />
    <OverlayBlock />
    <LoadingBlock />
    <PaginationBlock />
  </>
);

window.ComponentsSection = ComponentsSection;
