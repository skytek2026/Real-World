/* Section 1: Audit summary + Principles */

const AuditSummary = () => {
  const findings = [
    { area: "Color", count: 47, note: "47 raw hex codes used directly across modules; 12 different greys; brand blues defined twice." },
    { area: "Typography", count: 6, note: "6 H-level styles + 5 body sizes, mixed Lato / Open Sans / system; no semantic roles." },
    { area: "Buttons", count: 3, note: "Two competing implementations (legacy styled-components Button.style.ts + new app/ui/Button.tsx). 3 variants × 5 sizes × 2 colors with inconsistent disabled state." },
    { area: "Spacing", count: 0, note: "No spacing scale enforced; padding values range 2px–48px ad-hoc." },
    { area: "Tables", count: 4, note: "Four table implementations: common/table, common/dataTable, app/ui/Table, app/components/Table." },
    { area: "Forms", count: 0, note: "Inconsistent label/help/error patterns; checkboxes use FontAwesome glyph (Unicode F00C)." },
    { area: "Shadows", count: 5, note: "5 distinct shadow recipes inline. No elevation scale." },
    { area: "Radius", count: 6, note: "Border radius values: 3px, 4px, 5px, 6px, 12px, 9999px, all in use without rules." },
  ];

  return (
    <div className="panel" style={{ marginBottom: 32 }}>
      <div className="panel-head">
        <h4>Codebase audit · what we found</h4>
        <span className="meta">8 systemization gaps identified</span>
      </div>
      <table className="spec-table" style={{ border: 0, borderRadius: 0 }}>
        <thead>
          <tr>
            <th style={{ width: 140 }}>Area</th>
            <th style={{ width: 70 }}>Count</th>
            <th>Observation</th>
          </tr>
        </thead>
        <tbody>
          {findings.map(f => (
            <tr key={f.area}>
              <td><strong>{f.area}</strong></td>
              <td><code>{f.count || "—"}</code></td>
              <td style={{ color: "var(--text-secondary)" }}>{f.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Principles = () => {
  const items = [
    { num: "01", title: "Clarity over decoration",
      body: "Information density is high in monitoring software. Every visual flourish must earn its place by aiding scanning, comparison, or decision-making, not by adorning." },
    { num: "02", title: "One primary action per surface",
      body: "Pages, panels, modals and rows have at most one primary CTA. Secondary actions are visually quieter. Destructive actions are always confirmed." },
    { num: "03", title: "Predictable, not novel",
      body: "Reuse existing patterns from the codebase before introducing new ones. Operators should be able to navigate any screen without retraining." },
    { num: "04", title: "Status is semantic, not decorative",
      body: "Color carries meaning: red = danger / non-compliant, amber = warning, green = healthy. Never use brand colors to convey status." },
    { num: "05", title: "Density with hierarchy",
      body: "Tables and dashboards are dense. Hierarchy is achieved through type weight, color contrast and whitespace, not through borders or boxes." },
    { num: "06", title: "Accessible by default",
      body: "WCAG AA contrast on all text and controls. Every interactive element has a visible focus ring. Keyboard support is not optional." },
    { num: "07", title: "Calm under stress",
      body: "Operators see this product during incidents. Motion is short and never distracts; loading states never block; errors are recoverable." },
  ];
  return (
    <div className="grid-2" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
      {items.map(p => (
        <div key={p.num} className="principle">
          <div className="num">PRINCIPLE: {p.num}</div>
          <h4>{p.title}</h4>
          <p>{p.body}</p>
        </div>
      ))}
    </div>
  );
};

window.AuditSummary = AuditSummary;
window.Principles = Principles;
