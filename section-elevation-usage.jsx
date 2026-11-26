/* Elevation System Usage & Examples */

const ElevationUsage = () => (
  <>
    <div className="subsection">
      <h3 className="subsection-title">When to use elevation vs. borders</h3>
      <div className="grid-2">
        <div className="ds-card">
          <div className="ds-card-head" style={{ background: "var(--success-050)" }}>
            <h3 className="ds-card-title" style={{ color: "var(--success-700)" }}>Use elevation (shadow)</h3>
          </div>
          <div className="ds-card-body">
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
              <li>Interactive cards that respond to hover/focus</li>
              <li>Floating panels, drawers, popovers</li>
              <li>Content that overlays other content (modals)</li>
              <li>When you want depth without visual separation</li>
              <li>High-interaction surfaces (tables with row selection)</li>
            </ul>
          </div>
        </div>
        <div className="ds-card">
          <div className="ds-card-head" style={{ background: "var(--warning-050)" }}>
            <h3 className="ds-card-title" style={{ color: "var(--warning-700)" }}>Use borders instead</h3>
          </div>
          <div className="ds-card-body">
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
              <li>Static containers (cards in a grid with no hover)</li>
              <li>Form input fields and controls</li>
              <li>Section dividers and navigation</li>
              <li>When you want to define structure, not depth</li>
              <li>Low-motion or minimal-interaction surfaces</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="callout" style={{ marginTop: 16 }}>
        <strong>Rule:</strong> A card uses either a border OR a shadow, rarely both. If a card has a border, use elevation-0 (no shadow). If it floats, remove the border and use appropriate elevation.
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Component examples</h3>
      <p className="subsection-desc">How elevation integrates into real components.</p>
      
      <div style={{ display: "grid", gap: 24 }}>
        {/* Card example */}
        <div>
          <div className="t-h4" style={{ marginBottom: 8 }}>Card (rest state)</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div
              style={{
                background: "white",
                border: "1px solid var(--border-default)",
                borderRadius: 8,
                padding: 16,
                boxShadow: "var(--card-shadow-rest)",
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Vessel summary</div>
              <div className="t-caption">23 vessels tracked</div>
            </div>
            <div className="t-caption" style={{ display: "grid", placeItems: "center" }}>
              <code style={{ fontSize: 11 }}>shadow-sm</code><br />
              <code style={{ fontSize: 11 }}>or elevation-1</code>
            </div>
          </div>
        </div>

        {/* Table row on hover */}
        <div>
          <div className="t-h4" style={{ marginBottom: 8 }}>Table row (hover state)</div>
          <div style={{ display: "grid", gap: 8 }}>
            <table className="ds-table is-compact">
              <thead>
                <tr>
                  <th>Vessel</th>
                  <th>IMO</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>M/V Stratos</strong></td>
                  <td>9472183</td>
                  <td><span className="ds-badge ds-badge--success ds-badge--dot">Compliant</span></td>
                </tr>
                <tr style={{ background: "var(--brand-050)", boxShadow: "var(--card-shadow-hover) inset" }}>
                  <td><strong>Aegean Pioneer</strong></td>
                  <td>9301847</td>
                  <td><span className="ds-badge ds-badge--info ds-badge--dot">In review</span></td>
                </tr>
              </tbody>
            </table>
            <div className="t-caption">Row lifts on hover with <code className="inline">shadow-md</code> (elevation-2)</div>
          </div>
        </div>

        {/* Popover */}
        <div>
          <div className="t-h4" style={{ marginBottom: 8 }}>Popover (floating, active)</div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <button className="ds-btn ds-btn--secondary">Filter options</button>
            <div
              style={{
                position: "absolute",
                top: 40,
                left: 0,
                width: 240,
                background: "white",
                border: "1px solid var(--border-default)",
                borderRadius: 8,
                padding: 12,
                boxShadow: "var(--card-shadow-active)",
                zIndex: 10,
              }}
            >
              <div className="t-label" style={{ marginBottom: 4 }}>Risk grade</div>
              <select className="ds-input ds-select" style={{ height: 28, fontSize: 12 }}>
                <option>All</option>
              </select>
            </div>
            <div className="t-caption" style={{ marginTop: 8 }}>Uses <code className="inline">shadow-lg</code> (elevation-3)</div>
          </div>
        </div>

        {/* Modal */}
        <div>
          <div className="t-h4" style={{ marginBottom: 8 }}>Modal (maximum elevation)</div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <div
              style={{
                width: 300,
                background: "white",
                border: "1px solid var(--border-default)",
                borderRadius: 8,
                boxShadow: "var(--card-shadow-modal)",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-subtle)" }}>
                <h3 className="ds-card-title">Confirm action</h3>
              </div>
              <div style={{ padding: 16, fontSize: 13, color: "var(--text-secondary)" }}>
                Are you sure you want to delete this policy? This cannot be undone.
              </div>
              <div style={{ padding: "8px 16px", borderTop: "1px solid var(--border-subtle)", background: "var(--slate-050)", display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button className="ds-btn ds-btn--secondary ds-btn--sm">Cancel</button>
                <button className="ds-btn ds-btn--danger ds-btn--sm">Delete</button>
              </div>
            </div>
            <div className="t-caption" style={{ marginTop: 8 }}>Uses <code className="inline">shadow-2xl</code> (elevation-5)</div>
          </div>
        </div>
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Anti-patterns</h3>
      <div className="dodont">
        <div className="do">
          <div className="hd">✓ Do</div>
          <div className="bd">
            <div style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
              <strong style={{ display: "block", marginBottom: 4, color: "var(--text-primary)" }}>Progressive elevation on interaction</strong>
              Rest (level 1) → Hover (level 2) → Active (level 3)
              <br /><br />
              <strong style={{ display: "block", marginBottom: 4, color: "var(--text-primary)" }}>Consistent within component families</strong>
              All cards at rest use level 1; all hovers use level 2.
            </div>
          </div>
        </div>
        <div className="dont">
          <div className="hd">✗ Don't</div>
          <div className="bd">
            <div style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
              <strong style={{ display: "block", marginBottom: 4, color: "var(--text-primary)" }}>Jump elevation levels</strong>
              Rest → Active should not skip level 2.
              <br /><br />
              <strong style={{ display: "block", marginBottom: 4, color: "var(--text-primary)" }}>Use only high elevation everywhere</strong>
              Level 5 should be modal-only, not your default card shadow.
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

Object.assign(window, { ElevationUsage });