/* Section 4: Layout, Interaction, Accessibility */

const LayoutSection = () => (
  <>
    <div className="subsection">
      <h3 className="subsection-title">App shell</h3>
      <p className="subsection-desc">A persistent left rail (220px), a top utility bar (48px), and a content region. The shell never scrolls; only the content region scrolls.</p>
      <div className="surface" style={{ padding: 0 }}>
        <div className="surface-toolbar"><span className="dot r"/><span className="dot y"/><span className="dot g"/><span style={{ marginLeft: 8 }}>app shell · 1280px</span></div>
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", height: 420, background: "var(--bg-app)" }}>
          <div className="ds-sidebar" style={{ width: "100%", padding: "12px 0" }}>
            <div style={{ padding: "0 16px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid var(--border-subtle)" }}>
              <div className="app-nav-brand-mark" style={{ width: 22, height: 22, fontSize: 11 }}>S</div>
              <span style={{ fontWeight: 600, fontSize: 13 }}>Skytek</span>
            </div>
            <div style={{ padding: "12px 0 4px 20px", fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Monitor</div>
            <a className="ds-sidebar-item is-active"><Icon d={I.bars} /> Dashboard</a>
            <a className="ds-sidebar-item"><Icon d={I.ship} /> Vessels</a>
            <a className="ds-sidebar-item"><Icon d={I.plane} /> Aircraft</a>
            <a className="ds-sidebar-item"><Icon d={I.globe} /> Regions</a>
            <a className="ds-sidebar-item"><Icon d={I.folder} /> Portfolios</a>
            <div style={{ padding: "12px 0 4px 20px", fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Account</div>
            <a className="ds-sidebar-item"><Icon d={I.settings} /> Settings</a>
          </div>
          <div style={{ display: "grid", gridTemplateRows: "48px 1fr", minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 16px", background: "white", borderBottom: "1px solid var(--border-default)" }}>
              <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
                <input className="ds-input" placeholder="Search vessels, regions…" style={{ paddingLeft: 28 }} />
                <span style={{ position: "absolute", left: 8, top: 9, color: "var(--text-muted)" }}><Icon d={I.search} size={14} /></span>
              </div>
              <div className="spacer-grow" />
              <button className="ds-btn ds-btn--ghost ds-btn--icon ds-btn--sm"><Icon d={I.bell} /></button>
              <span className="ds-avatar">JL</span>
            </div>
            <div style={{ padding: 24, overflow: "hidden" }}>
              <h2 className="t-h1">Dashboard</h2>
              <p className="t-caption">Page content scrolls inside this region only.</p>
              <div className="grid-3" style={{ marginTop: 16 }}>
                {[0,1,2].map(i => <div key={i} className="ds-card" style={{ height: 100 }} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Page header pattern</h3>
      <p className="subsection-desc">Every detail and list page follows the same shape: breadcrumbs → title row → tabs (optional) → content. Action buttons live on the right of the title row.</p>
      <div className="ds-card">
        <div style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--text-muted)" }}>
          <span>Portfolios</span><Icon d={I.chevronRight} size={12} /><span>Atlantic Hull 2026</span>
        </div>
        <div style={{ padding: "0 20px 16px", display: "flex", alignItems: "flex-end", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <h2 className="t-h1" style={{ margin: 0 }}>Atlantic Hull 2026</h2>
            <div className="row" style={{ marginTop: 4 }}>
              <span className="ds-badge ds-badge--success ds-badge--dot">Active</span>
              <span className="t-caption">142 vessels · 12 policies · last updated 4m ago</span>
            </div>
          </div>
          <button className="ds-btn ds-btn--secondary"><Icon d={I.download} /> Export</button>
          <button className="ds-btn ds-btn--primary"><Icon d={I.plus} /> Add policy</button>
        </div>
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Content widths & breakpoints</h3>
      <table className="spec-table">
        <thead><tr><th>Surface</th><th>Max width</th><th>Padding (desktop / mobile)</th></tr></thead>
        <tbody>
          <tr><td>Detail pages (forms, profiles)</td><td><code>880px</code></td><td>32px / 16px</td></tr>
          <tr><td>List & table pages</td><td><code>1280px</code></td><td>24px / 12px</td></tr>
          <tr><td>Dashboards (incl. map)</td><td>fluid (no max)</td><td>24px / 12px</td></tr>
          <tr><td>Modals</td><td><code>480 / 640 / 800px</code></td><td>20px / 16px</td></tr>
          <tr><td>Drawers</td><td><code>400 / 560 / 720px</code></td><td>20px</td></tr>
        </tbody>
      </table>
      <table className="spec-table" style={{ marginTop: 16 }}>
        <thead><tr><th>Breakpoint</th><th>min-width</th><th>Behavior</th></tr></thead>
        <tbody>
          <tr><td><code>sm</code></td><td>640px</td><td>Two-column forms collapse to single column below this.</td></tr>
          <tr><td><code>md</code></td><td>768px</td><td>Sidebar collapses to icon rail.</td></tr>
          <tr><td><code>lg</code></td><td>960px</td><td>Tables become horizontally scrollable below this.</td></tr>
          <tr><td><code>xl</code></td><td>1280px</td><td>Default desktop layout.</td></tr>
          <tr><td><code>2xl</code></td><td>1920px</td><td>Dashboards expand to 4-up card grids.</td></tr>
        </tbody>
      </table>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Form layouts</h3>
      <div className="grid-2">
        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-card-title">Single-column (default)</h3></div>
          <div className="ds-card-body" style={{ display: "grid", gap: 16 }}>
            <div className="ds-field"><label className="ds-field-label">Portfolio name</label><input className="ds-input" defaultValue="Atlantic Hull 2026" /></div>
            <div className="ds-field"><label className="ds-field-label">Underwriter</label><select className="ds-input ds-select"><option>JL Marine Re</option></select></div>
            <div className="ds-field"><label className="ds-field-label">Effective date</label><input className="ds-input" defaultValue="2026-01-01" /></div>
          </div>
          <div className="ds-card-foot"><button className="ds-btn ds-btn--secondary">Cancel</button><button className="ds-btn ds-btn--primary">Save</button></div>
        </div>
        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-card-title">Two-column (long forms)</h3></div>
          <div className="ds-card-body" style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
            <div className="ds-field"><label className="ds-field-label">IMO</label><input className="ds-input" defaultValue="9472183" /></div>
            <div className="ds-field"><label className="ds-field-label">MMSI</label><input className="ds-input" defaultValue="248901000" /></div>
            <div className="ds-field"><label className="ds-field-label">Flag</label><select className="ds-input ds-select"><option>Malta</option></select></div>
            <div className="ds-field"><label className="ds-field-label">Type</label><select className="ds-input ds-select"><option>Bulk carrier</option></select></div>
          </div>
          <div className="ds-card-foot"><button className="ds-btn ds-btn--secondary">Cancel</button><button className="ds-btn ds-btn--primary">Save</button></div>
        </div>
      </div>
      <div className="callout" style={{ marginTop: 12, fontSize: 12 }}><strong>Rule:</strong> Labels above fields. Two-column only when fields are short and naturally paired (codes, dates, currencies). Long fields (descriptions, notes) span full width.</div>
    </div>
  </>
);

const InteractionSection = () => (
  <>
    <table className="spec-table">
      <thead><tr><th>State</th><th>Visual change</th><th>Token</th></tr></thead>
      <tbody>
        <tr><td><strong>Hover</strong></td><td>Background steps one shade up. No size or border-width change.</td><td><code>--motion-fast (140ms)</code></td></tr>
        <tr><td><strong>Active / Pressed</strong></td><td>Background steps one shade darker. Visual stays inside element bounds.</td><td><code>--motion-instant (80ms)</code></td></tr>
        <tr><td><strong>Focus-visible</strong></td><td>3px ring at <code>rgba(46,134,192,0.32)</code>. Always visible on keyboard navigation.</td><td><code>--shadow-focus</code></td></tr>
        <tr><td><strong>Disabled</strong></td><td>Background <code>--slate-050</code>, text <code>--text-disabled</code>, no hover. Cursor not-allowed.</td><td>—</td></tr>
        <tr><td><strong>Loading</strong></td><td>Inline spinner inside button; outer chrome unchanged. For pages: skeleton frames (no spinner).</td><td><code>--motion-base</code></td></tr>
        <tr><td><strong>Error</strong></td><td>Border <code>--danger-500</code>, message below field. No shake.</td><td>—</td></tr>
        <tr><td><strong>Success (transient)</strong></td><td>Toast top-center, 4s. Inline rows tint <code>--success-050</code> for 1.5s.</td><td><code>--motion-slow</code></td></tr>
      </tbody>
    </table>

    <div className="subsection">
      <h3 className="subsection-title">Motion budget</h3>
      <p className="subsection-desc">Motion supports comprehension; it never delays it. All transitions complete in &le; 320ms. Respect <code className="inline">prefers-reduced-motion</code>.</p>
      <table className="spec-table">
        <thead><tr><th>Token</th><th>Duration</th><th>Use</th></tr></thead>
        <tbody>
          <tr><td><code>--motion-instant</code></td><td>80ms</td><td>Pressed states, checkbox toggles</td></tr>
          <tr><td><code>--motion-fast</code></td><td>140ms</td><td>Hover, focus, button color change</td></tr>
          <tr><td><code>--motion-base</code></td><td>200ms</td><td>Tooltips, popovers, expand/collapse</td></tr>
          <tr><td><code>--motion-slow</code></td><td>320ms</td><td>Drawer / modal enter & exit</td></tr>
        </tbody>
      </table>
    </div>
  </>
);

const A11ySection = () => (
  <table className="spec-table">
    <thead><tr><th>Rule</th><th>Standard</th><th>How to verify</th></tr></thead>
    <tbody>
      <tr><td>Body text contrast ≥ 4.5:1; large text ≥ 3:1.</td><td>WCAG 2.2 AA (1.4.3)</td><td>Token contrast verified: see Engineering Handoff &gt; tokens.</td></tr>
      <tr><td>UI control contrast ≥ 3:1 against adjacent surface.</td><td>WCAG 2.2 AA (1.4.11)</td><td>All <code>ds-btn--secondary</code> and <code>ds-input</code> borders verified ≥ 3:1.</td></tr>
      <tr><td>Visible focus on every interactive element.</td><td>WCAG 2.2 AA (2.4.7)</td><td><code>:focus-visible</code> applies <code>--shadow-focus</code>; never override with <code>outline:none</code>.</td></tr>
      <tr><td>Touch targets at least 24 × 24px everywhere; 44 × 44px on touch screens.</td><td>WCAG 2.2 AA (2.5.8, 24px); 2.5.5 (44px) is AAA</td><td><code>ds-btn--lg</code> is 40px: on touch, extend its hit area to 44px with padding or an invisible hit area; row hit areas span the full row.</td></tr>
      <tr><td>Inputs always labeled (visible label or <code>aria-label</code>).</td><td>WCAG 2.2 A (1.3.1)</td><td><code>FormItem</code> generates <code>htmlFor</code>+<code>id</code> automatically.</td></tr>
      <tr><td>Errors announced via <code>aria-invalid</code> + <code>aria-describedby</code>.</td><td>WCAG 2.2 A (3.3.1)</td><td>Inherited from React Hook Form Form primitive.</td></tr>
      <tr><td>Tables use proper <code>&lt;th scope&gt;</code>; not for layout.</td><td>WCAG 2.2 A (1.3.1)</td><td>Replace legacy <code>common/components/table</code> with <code>app/ui/Table</code>.</td></tr>
      <tr><td>Modals trap focus; <code>Esc</code> closes.</td><td>WCAG 2.2 AA (2.1.2)</td><td>Inherited from Radix Dialog.</td></tr>
      <tr><td>Status colors are paired with text or icon, never alone.</td><td>WCAG 2.2 A (1.4.1)</td><td><code>ds-badge--dot</code> + label; <code>ds-rating</code> always shows letter.</td></tr>
      <tr><td>Respect <code>prefers-reduced-motion</code>.</td><td>WCAG 2.2 AAA (2.3.3)</td><td>Global CSS rule disables non-essential transitions.</td></tr>
    </tbody>
  </table>
);

window.LayoutSection = LayoutSection;
window.InteractionSection = InteractionSection;
window.A11ySection = A11ySection;
