/* Section: Asset identity & status (Domain primitives)
   How every asset (vessel, offshore installation, aircraft, property) is
   identified and status-coded consistently across lists, tables, detail
   headers, popups, alerts and reports. The Maps chapter governs the asset
   *on a map*; this chapter governs the asset *everywhere else*. */

/* ── Shared data, mirrors the product ─────────────────────────────── */

const FLAG_SRC = (cc, w = 40) => `https://flagcdn.com/w${w}/${cc}.png`;

const Flag = ({ cc, name, size = "sm" }) => {
  const w = size === "md" ? 80 : 40;
  return (
    <img
      className={`ds-flag ds-flag--${size}`}
      src={FLAG_SRC(cc, w === 80 ? 40 : 20)}
      srcSet={`${FLAG_SRC(cc, 80)} 2x`}
      alt={name || cc.toUpperCase()}
      loading="lazy"
    />
  );
};

/* ── Flag chip ────────────────────────────────────────────────────── */

const FlagSection = () => (
  <div className="subsection" style={{ marginTop: 0 }}>
    <h3 className="subsection-title">Flag chip</h3>
    <p className="subsection-desc" style={{ maxWidth: 820 }}>
      Nationality is the single most repeated identity signal in the product, a vessel's flag state, an asset's country
      of jurisdiction, a region row, a sanction subject's domicile, a port's country. One chip renders all of them:
      a <code className="inline">flagcdn.com</code> raster at a fixed aspect, 2&nbsp;px corners, a 1&nbsp;px hairline ring so light flags
      stay legible on white. It is <strong>never the sole identifier</strong>; it always sits beside the country name or asset name.
    </p>

    <div className="grid-2" style={{ alignItems: "flex-start" }}>
      <div className="panel">
        <div className="panel-head"><h4>Two sizes</h4></div>
        <div className="panel-body" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Flag cc="es" name="Spain" size="sm" />
            <span className="t-mono" style={{ fontSize: 11, color: "var(--text-muted)" }}>sm · 20×14</span>
            <span className="t-caption" style={{ fontSize: 11 }}>lists, inline rows</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Flag cc="es" name="Spain" size="md" />
            <span className="t-mono" style={{ fontSize: 11, color: "var(--text-muted)" }}>md · 28×18</span>
            <span className="t-caption" style={{ fontSize: 11 }}>alert rows, headers</span>
          </div>
        </div>
        <div className="panel-foot">Aspect is fixed at ~1.4:1; never stretch a flag to fill a square.</div>
      </div>
      <div className="panel">
        <div className="panel-head"><h4>Always paired with a name</h4></div>
        <div className="panel-body" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span className="flag-pair"><Flag cc="pa" name="Panama" /> Panama</span>
          <span className="flag-pair"><Flag cc="lr" name="Liberia" /> Liberia</span>
          <span className="flag-pair"><Flag cc="mh" name="Marshall Islands" /> Marshall Islands</span>
        </div>
        <div className="panel-foot">The <code>alt</code> carries the country name: a bare flag fails screen readers.</div>
      </div>
    </div>

    <p className="t-caption" style={{ marginTop: 12, marginBottom: 4 }}>One helper, two sizes, retina by default. Modules never hand-build the <code className="inline">&lt;img&gt;</code>:</p>
    <pre className="code">{`// app/ui/Flag.tsx
export function Flag({ cc, name, size = 'sm' }: { cc: string; name: string; size?: 'sm' | 'md' }) {
  return (
    <img
      className={\`ds-flag ds-flag--\${size}\`}
      src={\`https://flagcdn.com/w\${size === 'md' ? 40 : 20}/\${cc}.png\`}
      srcSet={\`https://flagcdn.com/w80/\${cc}.png 2x\`}
      alt={name}          // never empty: nationality is meaning, not decoration
      loading="lazy"
    />
  );
}`}</pre>

    <div className="dodont" style={{ marginTop: 16 }}>
      <div className="do">
        <div className="hd">DO</div>
        <div className="bd"><span className="flag-pair"><Flag cc="gr" name="Greece" /> Greece</span></div>
        <div className="note">Flag + country name. Scannable and accessible.</div>
      </div>
      <div className="dont">
        <div className="hd">DON'T</div>
        <div className="bd"><Flag cc="gr" name="Greece" /></div>
        <div className="note">Flag alone. Ambiguous to most operators, invisible to AT.</div>
      </div>
    </div>
  </div>
);

/* ── Asset identity block ─────────────────────────────────────────── */

const VesselGlyph = ({ color = "#2563eb", heading = 45, size = 28 }) => (
  <span style={{ display: "inline-flex", width: size, height: size, alignItems: "center", justifyContent: "center" }}>
    <span style={{ display: "inline-block", transform: `rotate(${heading + 45}deg)`, transformOrigin: "center" }}>
      <svg viewBox="0 0 24 24" width={size} height={size} style={{ color, display: "block" }}
           fill="currentColor" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M12 2 L19 20 L12 16 L5 20 Z" />
      </svg>
    </span>
  </span>
);

const OffshoreGlyph = ({ color = "#ea580c", size = 16 }) => (
  <span style={{ display: "inline-flex", width: 28, height: 28, alignItems: "center", justifyContent: "center" }}>
    <span style={{ width: 14, height: 14, borderRadius: "50%", background: color, border: "2px solid #fff", boxShadow: "var(--glyph-shadow-sm)" }} />
  </span>
);

const IdentityBlock = ({ glyph, name, type, flagCc, flagName, ids, status }) => (
  <div className="asset-identity">
    <div className="asset-identity-glyph">{glyph}</div>
    <div className="asset-identity-main">
      <div className="asset-identity-name">{name}{status}</div>
      <div className="asset-identity-sub">
        <Flag cc={flagCc} name={flagName} /> {flagName}
        <span style={{ color: "var(--border-strong)" }}>·</span>
        <span>{type}</span>
      </div>
      <div className="asset-identity-ids">
        {ids.map(([k, v]) => (
          <div className="asset-id" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
        ))}
      </div>
    </div>
  </div>
);

const IdentitySection = () => (
  <div className="subsection">
    <h3 className="subsection-title">Asset identity block</h3>
    <p className="subsection-desc" style={{ maxWidth: 820 }}>
      Every asset answers the same four questions, in the same order, wherever it appears: <strong>what is it</strong> (type glyph),
      <strong> what is it called</strong> (name), <strong>whose is it / where is it flagged</strong> (flag + country), and
      <strong> how do we key it</strong> (the canonical ID). Compliance status rides at the end of the name line as a badge, never as a recolor.
      This block is the heading of every detail page, the header of every map popup, and the lead cell of every asset list.
    </p>

    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <IdentityBlock
        glyph={<VesselGlyph color="#ef4444" heading={120} />}
        name="FRESH BREEZE"
        type="Tanker"
        flagCc="es" flagName="Spain"
        status={<span className="ds-badge ds-badge--danger ds-badge--dot">Sanctioned</span>}
        ids={[["IMO", "9374045"], ["MMSI", "224128610"], ["Call sign", "EAFB"]]}
      />
      <IdentityBlock
        glyph={<OffshoreGlyph color="#ea580c" />}
        name="Teora Lopes Elevator"
        type="Mobile Production (MOPU)"
        flagCc="no" flagName="Norway"
        status={<span className="ds-badge ds-badge--success ds-badge--dot">Operational</span>}
        ids={[["IMO", "9374045"], ["Unit ID / CVN", "HSE-2016-NOR"], ["Field", "Santos Basin"]]}
      />
    </div>

    <h4 style={{ fontSize: 13, fontWeight: 700, margin: "20px 0 8px" }}>Identifier conventions</h4>
    <table className="spec-table">
      <thead>
        <tr><th>Identifier</th><th>Applies to</th><th>Format</th><th>Rendering</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Name</strong></td><td>All assets</td><td>Free text</td><td>Display font, <strong>UPPERCASE</strong> for vessels (matches AIS); title-case for offshore/property.</td></tr>
        <tr><td><strong>IMO number</strong></td><td>Vessels, offshore (where assigned)</td><td>7 digits</td><td>Mono, tabular, never grouped. The durable key: survives name &amp; flag changes.</td></tr>
        <tr><td><strong>MMSI</strong></td><td>Vessels</td><td>9 digits</td><td>Mono, tabular. Transient: can change with flag; never the primary key.</td></tr>
        <tr><td><strong>Call sign</strong></td><td>Vessels, aircraft</td><td>Alphanumeric</td><td>Mono, uppercase.</td></tr>
        <tr><td><strong>Unit ID / CVN</strong></td><td>Offshore installations</td><td>Registry-specific</td><td>Mono. Shown beside IMO when both exist.</td></tr>
        <tr><td><strong>Flag</strong></td><td>All assets</td><td>ISO 3166-1 α-2</td><td>Flag chip + country name (see above).</td></tr>
      </tbody>
    </table>
    <div className="callout" style={{ marginTop: 12 }}>
      <strong>IMO is the key, not the name.</strong> Vessel names and flags change, sometimes to evade screening (see the Historical Details
      and Name/Flag Change patterns). Lists, dedupe and cross-references key on <code className="inline">imo</code>; the name is a label on top of it.
    </div>
  </div>
);

/* ── Status taxonomy ──────────────────────────────────────────────── */

const StatusSection = () => (
  <div className="subsection">
    <h3 className="subsection-title">Status taxonomy</h3>
    <p className="subsection-desc" style={{ maxWidth: 820 }}>
      An asset carries up to three <em>independent</em> status dimensions, and they must never be collapsed into one swatch.
      <strong> Operational state</strong> (is it running), <strong>compliance state</strong> (has it been screened), and
      <strong> risk severity</strong> (how bad is the current finding) each map to their own semantic tokens. All three use the badge primitive, tint + ink + optional leading dot, so the product reads one status language.
    </p>

    <div className="grid-2" style={{ alignItems: "flex-start" }}>
      <div className="panel">
        <div className="panel-head"><h4>Operational state</h4><span className="meta">offshore · property</span></div>
        <div className="panel-body" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="status-row"><span className="ds-badge ds-badge--success ds-badge--dot">Operational</span><span>running / on-station · <code className="inline">--success</code></span></div>
          <div className="status-row"><span className="ds-badge ds-badge--warning ds-badge--dot">Under Maintenance</span><span>degraded / in service · <code className="inline">--warning</code></span></div>
          <div className="status-row"><span className="ds-badge ds-badge--neutral ds-badge--dot">Decommissioned</span><span>cold-stacked / retired · <code className="inline">--slate</code></span></div>
        </div>
        <div className="panel-foot">On a map this is the marker's status overlay, not its fill.</div>
      </div>
      <div className="panel">
        <div className="panel-head"><h4>Compliance state</h4><span className="meta">vessels · subjects</span></div>
        <div className="panel-body" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="status-row"><span className="s-cell s-cell--ok"><span className="s-dot" /> Clear</span><span>screened, no hit · <code className="inline">--success</code></span></div>
          <div className="status-row"><span className="s-cell s-cell--sanctioned"><span className="s-dot" /> Sanctioned</span><span>positive match · <code className="inline">--danger</code></span></div>
          <div className="status-row"><span className="s-cell s-cell--unverif">?</span><span style={{ marginLeft: 4 }}>Unverifiable · <code className="inline">--unverif</code></span></div>
        </div>
        <div className="panel-foot">Unverifiable ≠ Clear. A subject that couldn't be screened must look different from one that passed.</div>
      </div>
    </div>

    <div className="callout warn" style={{ marginTop: 12 }}>
      <strong>One dimension, one channel.</strong> A sanctioned vessel that is also operational shows <em>both</em> a danger compliance
      badge and a success operational badge; it is never rendered in a single blended color. Operators must be able to read each question separately.
    </div>
  </div>
);

/* ── Severity ─────────────────────────────────────────────────────── */

const SeveritySection = () => (
  <div className="subsection">
    <h3 className="subsection-title">Severity scale</h3>
    <p className="subsection-desc" style={{ maxWidth: 820 }}>
      Findings: casualties, deficiencies, weather impact, carry a three-step severity. It is an <em>ordered</em> scale (unlike the
      categorical event types below), so it maps to the semantic ramp: danger → warning → neutral. This replaces the ad-hoc colored text that
      drifted across casualty, inspection and weather surfaces.
    </p>
    <div className="panel">
      <div className="panel-body" style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <span className="severity-chip severity-chip--severe"><span className="sd" /> Severe</span>
        <span className="severity-chip severity-chip--moderate"><span className="sd" /> Moderate</span>
        <span className="severity-chip severity-chip--minor"><span className="sd" /> Minor</span>
      </div>
      <div className="panel-foot">Pair with a count where it aids triage (e.g. a tab badge), but the chip alone must read severity at a glance.</div>
    </div>
  </div>
);


/* ── Risk score bands (v4.5.0) ───────────────────────────────────── */
const RiskBandSection = () => (
  <div className="subsection">
    <h3 className="subsection-title">Risk score bands</h3>
    <p className="subsection-desc" style={{ maxWidth: 820 }}>
      The 0–100 risk score uses <strong>one scale on every surface</strong>: tables, rings, cards, reports and exports. The bands are the ones users already see in the score legend.
      Score text uses the 700 shades (4.5:1 on white); rings, bars and dots use the 500 fills.
    </p>
    <table className="spec-table">
      <thead><tr><th>Band</th><th>Score</th><th>Text</th><th>Fill</th><th>Legend label</th></tr></thead>
      <tbody>
        <tr><td><strong className="ds-score--good">Good</strong></td><td>0–25</td><td><code className="inline">.ds-score--good</code> · success-700</td><td>success-500</td><td>Good [0 → 25]</td></tr>
        <tr><td><strong className="ds-score--average">Average</strong></td><td>26–50</td><td><code className="inline">.ds-score--average</code> · warning-700</td><td>warning-500</td><td>Average [25+ → 50]</td></tr>
        <tr><td><strong className="ds-score--poor">Below average</strong></td><td>51–100</td><td><code className="inline">.ds-score--poor</code> · danger-700</td><td>danger-500</td><td>Below average [50+ → 100]</td></tr>
      </tbody>
    </table>
    <h4 style={{ fontSize: 13, fontWeight: 700, margin: "20px 0 8px" }}>Risk level (regions and ports)</h4>
    <p className="subsection-desc" style={{ maxWidth: 820 }}>
      Regions and ports carry a categorical risk level, not a score. It is an ordered scale, so it uses the status ramp; <strong>Critical is dark red, never purple</strong> (purple is the AIS Spoofing event colour).
    </p>
    <div className="panel">
      <div className="panel-body" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span className="ds-badge ds-badge--success ds-badge--dot">Low</span>
        <span className="ds-badge ds-badge--warning ds-badge--dot">Medium</span>
        <span className="ds-badge ds-badge--danger ds-badge--dot">High</span>
        <span className="ds-badge ds-badge--critical ds-badge--dot">Critical</span>
      </div>
      <div className="panel-foot">
        Product aligned 28 Nov 2026 (Real World commit 163578f): All Portfolios, Weekly Fleet Report and Company Details now use these bands (Reports already did);
        Regions, Marine Region Details and Offshore Region Details show Critical in danger-800 instead of purple.
      </div>
    </div>
  </div>
);

/* ── Event / alert-type color coding ──────────────────────────────── */

const ALERT_TYPES = [
  ["Sanctioned",       "event-chip--sanctioned",  "Positive sanctions match on the asset or a related subject.", "danger token"],
  ["AIS Silence",      "event-chip--ais-silence", "AIS transponder signal lost for a sustained period.",          "blue"],
  ["AIS Spoofing",     "event-chip--ais-spoofing","Reported position contradicts satellite tracking.",            "purple"],
  ["Route Deviation",  "event-chip--route-dev",   "Vessel departs its filed route.",                              "warning token"],
  ["Drifting",         "event-chip--drifting",    "Stationary or near-zero power for an extended window.",         "cyan"],
  ["Loitering",        "event-chip--loitering",   "Extended dwell in a sensitive area.",                          "orange"],
  ["Name/Flag Change", "event-chip--name-flag",   "Identity changed: a classic evasion signal.",                 "pink"],
  ["Unusual Movement", "event-chip--unusual",     "Erratic course or speed pattern.",                             "warning token"],
  ["STS Transfer",     "event-chip--sts",         "Ship-to-ship transfer detected.",                              "orange"],
];

const EventTypeSection = () => (
  <div className="subsection">
    <h3 className="subsection-title">Event &amp; alert types</h3>
    <p className="subsection-desc" style={{ maxWidth: 820 }}>
      Suspicious-activity and alert classes are a <em>categorical</em> vocabulary; there is no "worse" hue, only a different kind of event.
      Each type owns one color so an operator learns the palette once and reads it across the dashboard alert feed, the vessel
      Suspicious Activity tab, and the map. These are tokens (<code className="inline">--event-*</code>), reconciling the per-page colors
      that had drifted apart. Severity (above) answers "how bad"; the event type answers "what kind".
    </p>

    <div className="panel" style={{ marginBottom: 12 }}>
      <div className="panel-body" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {ALERT_TYPES.map(([label, cls]) => (
          <span key={label} className={`event-chip ${cls}`}>{label}</span>
        ))}
      </div>
    </div>

    <table className="spec-table">
      <thead>
        <tr><th>Type</th><th>Token hue</th><th>Means</th></tr>
      </thead>
      <tbody>
        {ALERT_TYPES.map(([label, cls, desc, hue]) => (
          <tr key={label}>
            <td><span className={`event-chip ${cls}`}>{label}</span></td>
            <td className="t-caption">{hue}</td>
            <td style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>{desc}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="callout" style={{ marginTop: 12 }}>
      <strong>Type colour vs. severity.</strong> The same event can be high or low severity (an AIS Silence in a storm vs. in a sanctions
      corridor). Keep the type chip and the severity chip side by side; do not tint the type chip by severity or you lose both signals.
    </div>
  </div>
);

/* ── Sanction compliance matrix ───────────────────────────────────── */

const SANCTION_LISTS = ["OFAC", "UN", "EU", "Australia", "OFSI"];

const SCell = ({ status }) => {
  if (status === "ok") return <span className="s-cell s-cell--ok"><span className="s-dot" /> Ok</span>;
  if (status === "sanctioned") return <span className="s-cell s-cell--sanctioned"><span className="s-dot" /> Sanctioned</span>;
  return <span className="s-cell s-cell--unverif" aria-label="Unverifiable">?</span>;
};

const SANCTION_ROWS = [
  { rel: "Vessel", name: "FRESH BREEZE", cc: "es", res: ["sanctioned", "ok", "ok", "ok", "ok"] },
  { rel: "Vessel's Flag", name: "Spain", cc: "es", res: ["ok", "ok", "ok", "ok", "ok"] },
  { rel: "Registered Owner", name: "Ametrine Navigation Inc.", cc: null, res: ["ok", "ok", "ok", "ok", "ok"] },
  { rel: "Operator", name: "Unknown Entity", cc: null, unverif: true, res: ["unverif", "unverif", "unverif", "unverif", "unverif"] },
  { rel: "Group Owner", name: "Unknown Entity", cc: null, unverif: true, res: ["unverif", "unverif", "unverif", "unverif", "unverif"] },
];

const SanctionSection = () => (
  <div className="subsection">
    <h3 className="subsection-title">Sanction compliance matrix</h3>
    <p className="subsection-desc" style={{ maxWidth: 820 }}>
      The vessel's Sanction Compliance tab screens every <strong>related subject</strong>, the vessel, its flag, owner, operator and managers, against five lists (OFAC, UN, EU, Australia, OFSI). The matrix is the canonical layout: relationship rows down, lists across, one cell state per check.
    </p>

    <div className="panel">
      <div className="panel-body" style={{ padding: 0 }}>
        <table className="sanction-matrix">
          <thead>
            <tr>
              <th>Relationship</th>
              <th>Subject</th>
              {SANCTION_LISTS.map(l => <th key={l}>{l}</th>)}
            </tr>
          </thead>
          <tbody>
            {SANCTION_ROWS.map((r, i) => (
              <tr key={i} className={r.unverif ? "is-unverif" : ""}>
                <td className="rel">{r.rel}</td>
                <td className="subj">
                  <span className="flag-pair">{r.cc && <Flag cc={r.cc} name={r.name} />} {r.name}</span>
                </td>
                {r.res.map((s, j) => <td key={j} className="center"><SCell status={s} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel-foot">Tinted rows are <em>Unverifiable</em>, the subject resolved to "Unknown", so screening could not run.</div>
    </div>

    <h4 style={{ fontSize: 13, fontWeight: 700, margin: "20px 0 8px" }}>Cell states</h4>
    <table className="spec-table">
      <thead>
        <tr><th>State</th><th>When</th><th>Meaning</th></tr>
      </thead>
      <tbody>
        <tr><td><SCell status="ok" /></td><td>Subject screened, no list match.</td><td>Cleared against this list.</td></tr>
        <tr><td><SCell status="sanctioned" /></td><td>Subject matches a list entry.</td><td>Positive hit: drives the asset's overall compliance to <em>Sanctioned</em>.</td></tr>
        <tr><td><span className="s-cell s-cell--unverif">?</span></td><td>Subject is <em>Unknown</em> / has no provider record.</td><td>Screening could not run. <strong>Treat as elevated risk</strong>, must not show as Ok.</td></tr>
      </tbody>
    </table>

    <div className="callout danger" style={{ marginTop: 12 }}>
      <strong>"Unknown" must never pass as compliant.</strong> When a relationship resolves to <em>Unknown</em>, the platform must render the
      Unverifiable state, not a green Ok. A reviewer scanning all-green clears the vessel; the Unverifiable cell, row tint, and a small amber dot
      on the tab keep unscreened subjects visible. Do not reuse the warning "At risk" orange (that means "screened and borderline") and do not
      mark unverifiable subjects as Sanctioned (false positives erode trust in the red dot).
    </div>
  </div>
);

/* ── Section export ───────────────────────────────────────────────── */


/* ── Status vocabulary (v4.5.0) ──────────────────────────────────── */
const STATUS_WORDS = [
  ["Clear (shown as OK)", "success", "Compliance", "Screened, no hit."],
  ["Warning", "warning", "Compliance", "Watch-list or partial match; needs review."],
  ["Sanctioned", "danger", "Compliance", "Positive match."],
  ["Active", "success", "Account · organisation · user", "Enabled and in use. Not used for hazards."],
  ["Pending", "warning", "Account · invitation", "Waiting on an action."],
  ["Inactive", "neutral", "Account · organisation", "Switched off. Not a problem state, so never danger."],
  ["Completed", "success", "Voyage · process", "Finished."],
  ["Started", "info", "Voyage · process", "In progress."],
  ["BREACH", "danger", "Voyage flag", "Always paired with the voyage status; never shown alone."],
  ["Ongoing", "danger", "Hazard event", "Storm, quake or fire still in progress. Replaces \"Active\" on hazards."],
  ["Monitoring", "warning", "Hazard event · risk area", "Being watched; no current impact."],
  ["Past", "neutral", "Hazard event", "Over."],
  ["Level 1 / Level 2–3", "danger / warning", "Advisory (NOTAM)", "Level 1 is the most severe."],
  ["CAT 1–3 / CAT 4–5", "warning / danger", "Hurricane category", "No orange: the category is a severity, so it uses the status ramp."],
];
const StatusVocabSection = () => (
  <div className="subsection">
    <h3 className="subsection-title">Status vocabulary</h3>
    <p className="subsection-desc" style={{ maxWidth: 820 }}>
      Every status word in the product, with its one tone. A word means one thing: if two surfaces need different tones, they need different words.
      Labels that name a <em>type or category</em> (company type, access module, weather type) are not status: they use the <strong>neutral</strong> badge, never success, warning or danger.
    </p>
    <table className="spec-table">
      <thead><tr><th>Word</th><th>Tone</th><th>Used for</th><th>Meaning</th></tr></thead>
      <tbody>
        {STATUS_WORDS.map(([w, t, u, m]) => (
          <tr key={w}><td><span className={`ds-badge ds-badge--${t.split(" ")[0]}`}>{w}</span></td><td><code className="inline">{t}</code></td><td>{u}</td><td>{m}</td></tr>
        ))}
      </tbody>
    </table>
    <div className="panel" style={{ marginTop: 12 }}>
      <div className="panel-foot">
        Product aligned 28 Nov 2026 (Real World commit 163578f): hazards say <em>Ongoing</em> (Offshore, Property, Weather, Weather Event Details); <em>Inactive</em> is neutral;
        hurricane categories follow CAT 1–3 warning / CAT 4–5 danger with storm types neutral; company-type and access badges are neutral.
      </div>
    </div>
  </div>
);

const AssetIdentitySection = () => (
  <>
    <FlagSection />
    <IdentitySection />
    <StatusSection />
    <SeveritySection />
    <RiskBandSection />
    <EventTypeSection />
    <SanctionSection />
    <StatusVocabSection />
  </>
);

window.AssetIdentitySection = AssetIdentitySection;
