/* Section: Card Elevation System */

const ElevationScale = () => {
  const grid2 = "grid-2";
  const levels = [
    {
      level: 0,
      name: "Flat",
      token: "--card-shadow-flat",
      tailwind: "shadow-none",
      use: "Backgrounds, disabled states, very subtle containers",
      hex: "none",
    },
    {
      level: 1,
      name: "Rest",
      token: "--card-shadow-rest",
      tailwind: "shadow-sm",
      use: "Default card state, panels at rest, inactive sections",
      hex: "0 1px 3px rgba(15,23,42,0.12), 0 1px 2px rgba(15,23,42,0.08)",
    },
    {
      level: 2,
      name: "Hover",
      token: "--card-shadow-hover",
      tailwind: "shadow-md",
      use: "Cards on hover, interactive row highlight, popovers",
      hex: "0 4px 12px rgba(15,23,42,0.15), 0 2px 4px rgba(15,23,42,0.10)",
    },
    {
      level: 3,
      name: "Active",
      token: "--card-shadow-active",
      tailwind: "shadow-lg",
      use: "Pressed/focused cards, selected rows, dropdowns, tooltips",
      hex: "0 8px 20px rgba(15,23,42,0.18), 0 4px 8px rgba(15,23,42,0.12)",
    },
    {
      level: 4,
      name: "Raised",
      token: "--card-shadow-raised",
      tailwind: "shadow-xl",
      use: "Drawers, side panels, floating action buttons",
      hex: "0 12px 28px rgba(15,23,42,0.22), 0 6px 12px rgba(15,23,42,0.14)",
    },
    {
      level: 5,
      name: "Modal",
      token: "--card-shadow-modal",
      tailwind: "shadow-2xl",
      use: "Modals, fullscreen overlays, maximum emphasis",
      hex: "0 20px 48px rgba(15,23,42,0.28), 0 8px 16px rgba(15,23,42,0.16)",
    },
  ];

  return (
    <>
      <div className="subsection">
        <h3 className="subsection-title">Elevation scale</h3>
        <p className="subsection-desc">Six elevation levels from flat to modal. Each step signals depth and user interaction.</p>
        <div className="grid-3">
          {levels.map(l => (
            <div key={l.level} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  width: "100%",
                  height: 96,
                  background: "white",
                  borderRadius: 8,
                  boxShadow: `var(${l.token})`,
                  transition: "box-shadow var(--motion-base) var(--ease-out)",
                }}
              />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{l.level}. {l.name}</div>
                <div className="t-caption" style={{ marginBottom: 4 }}>{l.use}</div>
                <code className="inline" style={{ fontSize: 11 }}>{l.tailwind}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="subsection">
        <h3 className="subsection-title">Token reference</h3>
        <div className="panel">
          <table className="spec-table" style={{ border: 0 }}>
            <thead>
              <tr>
                <th style={{ width: 60 }}>Level</th>
                <th>Semantic Token</th>
                <th>Tailwind Class</th>
                <th>Shadow Value</th>
                <th>Primary use</th>
              </tr>
            </thead>
            <tbody>
              {levels.map(l => (
                <tr key={l.level}>
                  <td><strong>{l.level}</strong></td>
                  <td><code style={{ fontSize: 11 }}>{l.token}</code></td>
                  <td><code style={{ fontSize: 11 }}>{l.tailwind}</code></td>
                  <td><code className="t-mono" style={{ fontSize: 11, color: "var(--text-muted)" }}>{l.hex === "none" ? "none" : l.hex.substring(0, 30) + "…"}</code></td>
                  <td className="t-caption">{l.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection">
        <h3 className="subsection-title">Interaction pattern</h3>
        <p className="subsection-desc">Elevation responds to user interaction. Never jump more than one level in a single state change.</p>
        <div className="grid-3">
          {[
            {
              state: "Rest",
              level: 1,
              desc: "Default card state. Static content.",
              token: "--card-shadow-rest",
            },
            {
              state: "Hover",
              level: 2,
              desc: "User cursor enters card area. Subtle lift.",
              token: "--card-shadow-hover",
            },
            {
              state: "Active / Focus",
              level: 3,
              desc: "Card is selected, keyboard-focused, or clicked.",
              token: "--card-shadow-active",
            },
          ].map(s => (
            <div key={s.state} className="ds-card">
              <div className="ds-card-head"><h3 className="ds-card-title">{s.state}</h3></div>
              <div
                className="ds-card-body"
                style={{
                  display: "grid",
                  gap: 12,
                  placeItems: "center",
                }}
              >
                <div
                  style={{
                    width: 120,
                    height: 80,
                    background: "white",
                    borderRadius: 8,
                    border: "1px solid var(--border-subtle)",
                    boxShadow: `var(${s.token})`,
                  }}
                />
                <div style={{ fontSize: 12, textAlign: "center", color: "var(--text-secondary)" }}>
                  Level <strong>{s.level}</strong><br />
                  <code className="inline" style={{ marginTop: 4, display: "block" }}>{s.token}</code>
                </div>
              </div>
              <div className="ds-card-foot" style={{ borderTop: 0, background: "transparent", padding: 0 }}>
                <p className="t-caption" style={{ margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="subsection">
        <h3 className="subsection-title">Tailwind config mapping</h3>
        <pre className="code">{`/* tailwind.config.js */
export default {
  theme: {
    extend: {
      boxShadow: {
        'elevation-0': 'var(--card-shadow-flat)',
        'elevation-1': 'var(--card-shadow-rest)',
        'elevation-2': 'var(--card-shadow-hover)',
        'elevation-3': 'var(--card-shadow-active)',
        'elevation-4': 'var(--card-shadow-raised)',
        'elevation-5': 'var(--card-shadow-modal)',
      },
      /* or map directly to Tailwind's standard shadow scale */
      boxShadow: {
        'sm': 'var(--card-shadow-rest)',
        'md': 'var(--card-shadow-hover)',
        'lg': 'var(--card-shadow-active)',
        'xl': 'var(--card-shadow-raised)',
        '2xl': 'var(--card-shadow-modal)',
      },
    },
  },
};`}
        </pre>
      </div>

      </>
    );
};

Object.assign(window, { ElevationScale });