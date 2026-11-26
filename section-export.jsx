/* Section: Export & report design */

const CoverPagePreview = () => (
  <div className="ds-paper ds-paper--cover">
    <span className="classification">CONFIDENTIAL</span>
    <div className="brand">
      <span className="mark">S</span>
      <span>Skytek</span>
    </div>
    <div style={{ marginTop: 16 }}>
      <div className="t-overline" style={{ color: "rgba(255,255,255,.7)", fontSize: 8, marginBottom: 4 }}>QUARTERLY EXPOSURE REPORT</div>
      <h1>Black Sea Portfolio</h1>
      <div style={{ fontSize: 11, opacity: .85, marginTop: 4 }}>Q1 2026 · 12 Jan → 31 Mar</div>
    </div>
    <div className="meta">
      <div><strong>Prepared for</strong></div>
      <div>Maeve Daly · Lead Underwriter</div>
      <div style={{ marginTop: 4 }}><strong>Issued</strong></div>
      <div>28 April 2026 · 14:32 UTC</div>
      <div style={{ marginTop: 4 }}><strong>Reference</strong></div>
      <div>SKY-RPT-2026-Q1-BSP-0142</div>
    </div>
  </div>
);

const BodyPagePreview = ({ watermark }) => (
  <div className="ds-paper ds-paper--body">
    {watermark && <span className="ds-paper-watermark">{watermark}</span>}
    <div className="ds-paper-header">
      <span>Black Sea Portfolio · Q1 2026</span>
      <span>SKY-RPT-2026-Q1-BSP-0142</span>
    </div>
    <div className="ds-paper-body-text">
      <h3>Executive summary</h3>
      <div className="line full"/>
      <div className="line full"/>
      <div className="line med"/>
      <h3>Sanctions exposure</h3>
      <div className="line full"/>
      <div className="line short"/>
      <div className="chart-placeholder"/>
      <h3>High-risk vessels</h3>
      <div className="table-mini">
        <div className="th">Vessel</div><div className="th">Type</div><div className="th">Flag</div><div className="th">Rating</div>
        <div>MV Atlantic</div><div>Tanker</div><div>LR</div><div>D</div>
        <div>MV Nordic Star</div><div>LNG</div><div>NO</div><div>C</div>
        <div>MV Miramar</div><div>Tanker</div><div>PA</div><div>E</div>
      </div>
    </div>
    <div className="ds-paper-footer">
      <span>Confidential · Skytek · 28 Apr 2026</span>
      <span>Page 4 of 18</span>
    </div>
  </div>
);

const PrintTypography = () => (
  <table className="spec-table">
    <thead><tr><th>Role</th><th>Size · pt</th><th>Family</th><th>Weight</th><th>Use</th></tr></thead>
    <tbody>
      <tr><td>Cover title</td><td>28 pt</td><td>Exo</td><td>700</td><td>Single line on cover. Wraps to 2 max.</td></tr>
      <tr><td>Cover eyebrow</td><td>8 pt</td><td>Exo</td><td>600</td><td>Tracking 0.12em · uppercase. Report type label.</td></tr>
      <tr><td>Body h1</td><td>16 pt</td><td>Exo</td><td>700</td><td>Section start. New page or 24 pt of vertical space above.</td></tr>
      <tr><td>Body h2</td><td>13 pt</td><td>Exo</td><td>700</td><td>Subsection. Inline with following paragraph.</td></tr>
      <tr><td>Body h3</td><td>11 pt</td><td>Inter</td><td>600</td><td>Sidebar headings, table caption, named ranges.</td></tr>
      <tr><td>Body paragraph</td><td>10 pt</td><td>Inter</td><td>400</td><td>Default. Leading 1.5. Max line length ≈ 70 chars.</td></tr>
      <tr><td>Caption</td><td>8.5 pt</td><td>Inter</td><td>400</td><td>Table footnotes, figure captions. Color text-muted.</td></tr>
      <tr><td>Table cell</td><td>9 pt</td><td>Inter</td><td>400 / 600 emph</td><td>Tabular numerals. Header in 8 pt uppercase.</td></tr>
      <tr><td>Page header / footer</td><td>8 pt</td><td>Inter</td><td>500</td><td>Color text-muted. Repeats on every page.</td></tr>
    </tbody>
  </table>
);

const PageRules = () => (
  <table className="spec-table">
    <thead><tr><th>Area</th><th>Rule</th></tr></thead>
    <tbody>
      <tr><td><strong>Page size</strong></td><td>A4 portrait (210 × 297 mm). Letter sized only when explicitly requested by a US-domiciled customer.</td></tr>
      <tr><td><strong>Margins</strong></td><td>22 mm top, 18 mm bottom, 20 mm left/right. Header sits in the top 12 mm; footer in the bottom 10 mm.</td></tr>
      <tr><td><strong>Page header</strong></td><td>Two columns: doc title (left) · reference code (right). Hairline border-bottom. Repeats on every page except the cover.</td></tr>
      <tr><td><strong>Page footer</strong></td><td>Two columns: "Confidential · Skytek · {`{date}`}" (left) · "Page X of Y" (right). Repeats including cover.</td></tr>
      <tr><td><strong>Page numbering</strong></td><td>Roman lowercase on front matter (cover, TOC, exec summary). Arabic from the first body section. "Page X of Y" always.</td></tr>
      <tr><td><strong>Table breaks</strong></td><td>Repeat header row on each page. Never orphan a single body row at the bottom, push to next page if &lt; 3 rows remain.</td></tr>
      <tr><td><strong>Section breaks</strong></td><td>H1 sections start on a new page if they would otherwise begin in the bottom third.</td></tr>
      <tr><td><strong>Widows &amp; orphans</strong></td><td>Min 2 lines at end of page; min 2 lines at top of next page. Enforced via <code>orphans: 2; widows: 2</code>.</td></tr>
      <tr><td><strong>Color</strong></td><td>Same tokens as the app. Brand and rating colors are intentional in print, never desaturate.</td></tr>
    </tbody>
  </table>
);

const ClassificationStrip = () => (
  <div className="row" style={{ gap: 8 }}>
    {[
      ["INTERNAL",     "var(--info-700)",    "var(--info-100)"],
      ["CONFIDENTIAL", "var(--warning-700)", "var(--warning-100)"],
      ["RESTRICTED",   "var(--danger-700)",  "var(--danger-100)"],
      ["DRAFT",        "var(--text-muted)",  "var(--slate-100)"],
    ].map(([label, fg, bg]) => (
      <span key={label} style={{
        display: "inline-flex", alignItems: "center", padding: "4px 12px",
        background: bg, color: fg,
        borderRadius: "var(--radius-sm)",
        fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.12em",
      }}>{label}</span>
    ))}
  </div>
);

const WatermarkRules = () => (
  <div className="grid-2">
    <div className="ds-card">
      <div className="ds-card-head"><h3 className="ds-card-title">Watermarks</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li><strong>DRAFT</strong> · slate-400, 12% opacity, −22° rotation, repeats on every body page</li>
          <li><strong>CONFIDENTIAL</strong> · danger-700, 12% opacity, applied automatically to classification ≥ Confidential</li>
          <li><strong>SAMPLE</strong> · brand-600, 14% opacity, applied to anonymized exports for sales</li>
        </ul>
        <p style={{ marginTop: 12, marginBottom: 0, fontSize: 12 }}>Always behind content, never above. Never on the cover.</p>
      </div>
    </div>
    <div className="ds-card">
      <div className="ds-card-head"><h3 className="ds-card-title">Classification</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        <p style={{ marginTop: 0 }}>Top-right of every page: including cover. Color matches the classification level.</p>
        <ClassificationStrip />
        <p style={{ marginTop: 12, marginBottom: 0, fontSize: 12 }}>
          Default is <strong>CONFIDENTIAL</strong> for portfolio and exposure reports. Toggled by the report builder, not the user.
        </p>
      </div>
    </div>
  </div>
);

const PrintCSS = () => (
  <pre className="code">{`/* app/styles/print.css: loaded for every report surface */
@page {
  size: A4 portrait;
  margin: 22mm 20mm 18mm 20mm;
  @top-left {
    content: string(doc-title);
    font: 500 8pt 'Inter', sans-serif;
    color: var(--text-muted);
    border-bottom: 0.5pt solid var(--border-default);
    padding-bottom: 4pt;
  }
  @top-right {
    content: string(doc-ref);
    font: 500 8pt 'Inter', sans-serif;
    color: var(--text-muted);
  }
  @bottom-left  { content: 'Confidential · Skytek · ' string(doc-date);
                   font: 500 8pt 'Inter', sans-serif; color: var(--text-muted); }
  @bottom-right { content: 'Page ' counter(page) ' of ' counter(pages);
                   font: 500 8pt 'Inter', sans-serif; color: var(--text-muted); }
}
@page :first { @top-left { content: none; } @top-right { content: none; } }

@media print {
  :root { font-size: 10pt; }
  body { background: white; color: black; }
  .no-print { display: none !important; }
  thead { display: table-header-group; }  /* repeat on each page */
  tr, .ds-event, h1, h2, h3 { break-inside: avoid; }
  h1 { break-before: page; }
  p, li { orphans: 2; widows: 2; }
}`}</pre>
);

const ExportWorkflow = () => (
  <div className="panel">
    {[
      ["1 · Build",   "Operator configures a report surface (portfolio, date range, classification). Surface renders at A4 width in a preview pane.", "Same components as the app, DS-table, charts, timelines."],
      ["2 · Preview", "Print preview shows pagination, headers, footers, watermarks. Operator can flip pages and verify breaks.",                       "Browser print preview is the source of truth."],
      ["3 · Export",  "One click triggers browser PDF print at A4. Headless render for unattended generation uses the same CSS.",                       "PDF is byte-identical between operator + scheduled run."],
      ["4 · Distribute","Generated PDF is logged in the audit log with reference code, classification, recipient, and SHA-256.",                       "Audit log appears in this spec's Event log chapter."],
    ].map(([k, d, n]) => (
      <div key={k} className="token-row" style={{ gridTemplateColumns: "100px 1fr 280px" }}>
        <strong style={{ fontSize: 13 }}>{k}</strong>
        <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{d}</span>
        <span className="t-caption">{n}</span>
      </div>
    ))}
  </div>
);

const ChartsInReports = () => (
  <table className="spec-table">
    <thead><tr><th>Concern</th><th>App</th><th>Report</th></tr></thead>
    <tbody>
      <tr><td>Background</td><td>Surface tokens, can be elevated</td><td>Transparent: page is white</td></tr>
      <tr><td>Interaction</td><td>Hover tooltips, click drilldown</td><td>None: value labels rendered inline</td></tr>
      <tr><td>Animation</td><td>200 ms enter</td><td>None: first render is final</td></tr>
      <tr><td>Legend position</td><td>Top-left, inline</td><td>Bottom of figure, centered, with figure number</td></tr>
      <tr><td>Caption</td><td>Optional eyebrow above</td><td>Required: "Fig. 3: Sanctioned exposure by region" below</td></tr>
      <tr><td>Resolution</td><td>SVG</td><td>SVG (vector): never raster, never canvas</td></tr>
      <tr><td>Data limit</td><td>250 points / series</td><td>Same: downsample upstream, not in the report</td></tr>
    </tbody>
  </table>
);

const ExportSection = () => (
  <>
    <div className="subsection" style={{ marginTop: 0 }}>
      <h3 className="subsection-title">Why this chapter</h3>
      <p className="subsection-desc" style={{ maxWidth: 820 }}>
        Compliance work produces PDFs. Underwriters share them with reinsurers. Auditors archive them. Print is not a fallback; it's a first-class output of the product.
        This chapter defines the report system: page rules, typography for paper, classification &amp; watermarks, and the export workflow.
      </p>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Anatomy</h3>
      <p className="subsection-desc">Every report has two page archetypes. The cover establishes brand and classification; body pages carry content under a consistent header/footer rhythm.</p>
      <div className="ds-paper-stack">
        <div>
          <div className="t-label" style={{ marginBottom: 8 }}>Cover · always page 1</div>
          <CoverPagePreview />
        </div>
        <div>
          <div className="t-label" style={{ marginBottom: 8 }}>Body · all subsequent pages</div>
          <BodyPagePreview watermark="DRAFT" />
        </div>
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Page rules</h3>
      <PageRules />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Print typography</h3>
      <p className="subsection-desc">Same families as the app (Exo + Inter), shifted to point sizes. 10 pt body is the floor, anything below 8.5 pt is for footnotes only.</p>
      <PrintTypography />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Classification &amp; watermarks</h3>
      <WatermarkRules />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Charts &amp; visuals in reports</h3>
      <p className="subsection-desc">
        Same tokens, same chart library, different defaults. Reports are static surfaces; everything that helps interaction in the app (hover, animation, dynamic legends) becomes noise on paper.
      </p>
      <ChartsInReports />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Export workflow</h3>
      <p className="subsection-desc">
        Four steps from "I need to send this to the reinsurer" to a logged, classified PDF in the recipient's inbox. The operator's view and the scheduled-job view share the same rendering path.
      </p>
      <ExportWorkflow />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Print stylesheet</h3>
      <p className="subsection-desc">The whole print system fits in one CSS file. CSS Paged Media (<code className="inline">@page</code>) handles headers, footers, page numbering, and breaks.</p>
      <PrintCSS />
    </div>

    <div className="callout">
      <strong>The principle:</strong> a Skytek report is the same product, rendered for paper. Same tokens, same typography family, same chart palette, same classification rules. The medium changes; the system doesn't.
    </div>
  </>
);

window.ExportSection = ExportSection;
