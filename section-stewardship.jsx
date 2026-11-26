/* Section: Stewardship: governance, versioning, testing, performance */

const ComponentStatusTable = () => {
  const rows = [
    ["Button",          "1.0.0", "stable"],
    ["Input / Field",   "1.0.0", "stable"],
    ["Card",            "1.0.0", "stable"],
    ["Table",           "1.0.0", "stable"],
    ["Badge / Rating",  "1.0.0", "stable"],
    ["Alert",           "1.0.0", "stable"],
    ["Tabs",            "1.0.0", "stable"],
    ["Toast",           "0.4.2", "beta"],
    ["Command palette", "0.2.0", "beta"],
    ["Date range picker","0.1.0", "draft"],
    ["DataGrid (legacy)","—",     "deprecated"],
    ["common/Button (legacy)", "—", "deprecated"],
  ];
  return (
    <table className="spec-table">
      <thead><tr><th>Component</th><th>Version</th><th>Status</th><th>Notes</th></tr></thead>
      <tbody>
        {rows.map(([name, ver, status]) => (
          <tr key={name}>
            <td><code>{name}</code></td>
            <td className="t-mono" style={{ fontSize: 12 }}>{ver}</td>
            <td><span className={`steward-status steward-status--${status}`}>{status}</span></td>
            <td style={{ color: "var(--text-secondary)", fontSize: 12.5 }}>
              {status === "stable" && "Safe to use. Breaking changes require a major bump + 1 cycle deprecation."}
              {status === "beta" && "API may change. No version pinning required, but flag in PR if used in critical paths."}
              {status === "draft" && "Spec only: not in app/ui yet. Do not import."}
              {status === "deprecated" && "Migration codemod available. Removed in v2.0."}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Changelog = () => (
  <div className="changelog-rail">
    <div className="changelog-entry">
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span className="ver">1.0.0</span>
        <span className="date">28 Apr 2026 · initial release</span>
      </div>
      <ul>
        <li>Token architecture (primitive · semantic · component) ships.</li>
        <li>17 stable components published from <code>app/ui/*</code>.</li>
        <li>Domain primitives: chart palette, map glyphs, formatting helpers.</li>
        <li><code>common/components/*</code> marked deprecated; codemod added for 12 of 17 patterns.</li>
      </ul>
    </div>
    <div className="changelog-entry">
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span className="ver">0.9.0</span>
        <span className="date">14 Apr 2026 · RC</span>
      </div>
      <ul>
        <li>Token names finalized after eng + design review.</li>
        <li>Tailwind mapping ships in <code>tailwind.config.js</code>.</li>
        <li>Storybook coverage at 92%: Toast + Command palette still beta.</li>
      </ul>
    </div>
    <div className="changelog-entry">
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span className="ver">0.5.0</span>
        <span className="date">3 Mar 2026 · audit complete</span>
      </div>
      <ul>
        <li>97 colors → 28 tokens · 14 button variants → 4 · 4 tables → 1.</li>
        <li>Before/after surfaces approved for dashboard, vessels, vessel detail.</li>
      </ul>
    </div>
  </div>
);

const SemVerCard = ({ kind, title, examples }) => (
  <div className="ds-card">
    <div className="ds-card-head"><h3 className="ds-card-title">{title}</h3></div>
    <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
      <div className="t-label" style={{ marginBottom: 8, color: kind === "major" ? "var(--danger-700)" : kind === "minor" ? "var(--info-700)" : "var(--success-700)" }}>
        {kind === "major" ? "MAJOR · X.0.0" : kind === "minor" ? "MINOR · 1.X.0" : "PATCH · 1.0.X"}
      </div>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        {examples.map((e, i) => <li key={i}>{e}</li>)}
      </ul>
    </div>
  </div>
);

const TestingMatrix = () => (
  <table className="spec-table">
    <thead>
      <tr><th>Layer</th><th>Tool</th><th>Coverage rule</th><th>CI gate</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Unit</strong></td>
        <td>Vitest + Testing Library</td>
        <td>Public props + a11y roles. No snapshot tests on HTML.</td>
        <td>Pull-request blocking</td>
      </tr>
      <tr>
        <td><strong>Accessibility</strong></td>
        <td>axe-core (via Storybook)</td>
        <td>Zero serious / critical violations on every Story.</td>
        <td>Pull-request blocking</td>
      </tr>
      <tr>
        <td><strong>Visual regression</strong></td>
        <td>Chromatic</td>
        <td>Every variant × size × state combo has a Story. Diffs require design sign-off.</td>
        <td>Pull-request advisory</td>
      </tr>
      <tr>
        <td><strong>Keyboard / focus</strong></td>
        <td>Playwright + axe</td>
        <td>Every interactive component completes its happy path with <kbd>Tab</kbd> alone.</td>
        <td>Nightly</td>
      </tr>
      <tr>
        <td><strong>Token drift</strong></td>
        <td>ESLint + Stylelint</td>
        <td>No raw hex, no raw <code>px</code> outside the spacing scale, no <code>Intl</code> calls outside <code>app/lib/format.ts</code>.</td>
        <td>Pull-request blocking</td>
      </tr>
      <tr>
        <td><strong>Bundle size</strong></td>
        <td>size-limit</td>
        <td>Per-component &amp; total. Limits enforced from a baseline file in the repo.</td>
        <td>Pull-request advisory</td>
      </tr>
    </tbody>
  </table>
);

const PerformanceBudgets = () => (
  <div className="panel">
    {[
      ["App shell (initial JS)",   "≤ 220 KB gz",  "Includes React, tokens.css, app/ui core."],
      ["Per-route chunk",          "≤ 80 KB gz",   "Each lazy-loaded module."],
      ["Single component import",  "≤ 8 KB gz",    "Tree-shake-friendly named exports only."],
      ["First contentful paint",   "≤ 1.4 s",      "Median, on a typical operator workstation (Chrome, fiber)."],
      ["Time to interactive",      "≤ 2.6 s",      "Same workstation, with a 25-row table on screen."],
      ["Map tile budget",          "≤ 32 tiles / view", "Above this, pre-cluster server-side."],
      ["Highcharts series cap",    "≤ 250 points / line", "Above this, downsample with LTTB on the server."],
      ["Table virtualization",     "≥ 50 rows",    "Above 50 rows, the DataGrid switches to virtualized mode automatically."],
    ].map(([k, v, d]) => (
      <div key={k} className="token-row" style={{ gridTemplateColumns: "260px 140px 1fr" }}>
        <strong style={{ fontSize: 13 }}>{k}</strong>
        <span className="t-mono" style={{ color: "var(--brand-600)" }}>{v}</span>
        <span className="t-caption">{d}</span>
      </div>
    ))}
  </div>
);

const StewardshipSection = () => (
  <>
    <div className="subsection">
      <h3 className="subsection-title">Why a stewardship chapter</h3>
      <p className="subsection-desc" style={{ maxWidth: 820 }}>
        A design system rots without a steward. This chapter describes how the system stays current, who owns it, how it changes, how engineers can trust each release,
        and what the system promises in return for that trust.
      </p>
    </div>

    {/* Governance */}
    <div className="subsection">
      <h3 className="subsection-title">Ownership &amp; governance</h3>
      <p className="subsection-desc">A small group with a clear contract. The system isn't a side project; it has an owner of record.</p>
      <table className="spec-table">
        <thead><tr><th>Role</th><th>Responsibility</th><th>Cadence</th></tr></thead>
        <tbody>
          <tr><td><strong>System lead</strong></td><td>Final say on token names, public API, breaking changes. One person.</td><td>Always-on</td></tr>
          <tr><td><strong>Design steward</strong></td><td>Reviews every PR that touches visuals or motion. Owns the Storybook canon.</td><td>Daily review queue</td></tr>
          <tr><td><strong>Engineering steward</strong></td><td>Reviews every PR that touches the API surface. Owns the lint &amp; build config.</td><td>Daily review queue</td></tr>
          <tr><td><strong>Contributors</strong></td><td>Any product engineer or designer. Files RFCs, ships features behind review.</td><td>Async</td></tr>
          <tr><td><strong>Office hours</strong></td><td>30-min open slot for any team to ask "do we add a component for this?"</td><td>Wed 14:00 UTC</td></tr>
        </tbody>
      </table>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">RFC process</h3>
      <p className="subsection-desc">
        Anything that adds a token, a component, or a public API change needs an RFC.
        Style tweaks, bug fixes, and Storybook additions don't; those go straight to PR.
      </p>
      <div className="panel">
        {[
          ["1 · Problem",        "What user need or audit finding does this address? Link to the screen / module where it's missing.", "1 paragraph"],
          ["2 · Proposal",       "API sketch (TypeScript types), token additions, visual mock.", "1 page max"],
          ["3 · Prior art",      "What exists in the codebase today? What do other systems do (Polaris, Carbon, Material)?", "Short list"],
          ["4 · Alternatives",   "What did you reject, and why? (Composition vs. new primitive is the most common branch.)", "Bullets"],
          ["5 · Migration",      "If this replaces something: what's the codemod plan? What's the deprecation window?", "Concrete steps"],
          ["6 · Approval",       "System lead + one steward (design OR eng, whichever side the change touches more) approve before code lands.", "≤ 1 week"],
        ].map(([k, d, m]) => (
          <div key={k} className="token-row" style={{ gridTemplateColumns: "170px 1fr 130px" }}>
            <strong style={{ fontSize: 13 }}>{k}</strong>
            <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{d}</span>
            <span className="t-caption">{m}</span>
          </div>
        ))}
      </div>
      <p className="t-caption" style={{ marginTop: 8 }}>
        RFCs live in <code className="inline">docs/rfcs/NNNN-title.md</code> with the template in <code className="inline">docs/rfcs/0000-template.md</code>. Numbered sequentially, never reused.
      </p>
    </div>

    {/* Versioning */}
    <div className="subsection">
      <h3 className="subsection-title">Versioning</h3>
      <p className="subsection-desc">Strict SemVer. The version of <code className="inline">@skytek/design-system</code> is the contract every product module reads from.</p>
      <div className="grid-3">
        <SemVerCard kind="major" title="Breaking" examples={[
          "Remove a token, component, or public prop.",
          "Rename a token (compat alias counts as minor).",
          "Change a default visual that other surfaces rely on.",
          "Change the meaning of an existing prop (e.g. tone='warning' now also darkens border).",
        ]} />
        <SemVerCard kind="minor" title="Additive" examples={[
          "New component, token, or prop.",
          "New variant on an existing component.",
          "Performance improvement with no visual change.",
          "Mark something deprecated (still works, with a console warning).",
        ]} />
        <SemVerCard kind="patch" title="Fix" examples={[
          "Bug fix that matches the documented spec.",
          "A11y fix (color contrast, focus order).",
          "Internal refactor with no external diff.",
          "Type definition correction.",
        ]} />
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Deprecation policy</h3>
      <div className="grid-2">
        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-card-title">Window</h3></div>
          <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>One <strong>minor</strong> cycle of warning (e.g. 1.4 → 1.5).</li>
              <li>Removed in the next <strong>major</strong>. Never sooner.</li>
              <li>Codemod ships in the same release that marks the deprecation.</li>
            </ul>
          </div>
        </div>
        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-card-title">Signaling</h3></div>
          <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li><code>@deprecated</code> JSDoc on the export (TS surfaces it in autocomplete).</li>
              <li>Runtime <code>console.warn</code> on first use in dev, once per session.</li>
              <li>Status pill in Storybook + this spec table flips to <span className="steward-status steward-status--deprecated">deprecated</span>.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Component status</h3>
      <p className="subsection-desc">A single table any engineer can read before reaching for a component. Lives in this spec and is mirrored in Storybook.</p>
      <ComponentStatusTable />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Changelog</h3>
      <p className="subsection-desc">
        Auto-generated from PR labels (<code className="inline">type:breaking</code>, <code className="inline">type:feature</code>, <code className="inline">type:fix</code>) into <code className="inline">CHANGELOG.md</code>.
        The first three entries are pinned to the top of this section.
      </p>
      <Changelog />
    </div>

    {/* Testing */}
    <div className="subsection">
      <h3 className="subsection-title">Testing matrix</h3>
      <p className="subsection-desc">What gets tested where. CI is the source of truth, if a check isn't here, it doesn't gate a release.</p>
      <TestingMatrix />
    </div>

    {/* Performance */}
    <div className="subsection">
      <h3 className="subsection-title">Performance budgets</h3>
      <p className="subsection-desc">
        Numbers, not vibes. A PR that breaks any budget gets an automated comment with the offender and the delta.
        Three budget breaks in a quarter and the steward calls a review.
      </p>
      <PerformanceBudgets />
    </div>

    {/* Contribution */}
    <div className="subsection">
      <h3 className="subsection-title">Contribution checklist</h3>
      <p className="subsection-desc">Required before requesting review on any PR that touches <code className="inline">app/ui</code> or <code className="inline">tokens.css</code>.</p>
      <div className="grid-2">
        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-card-title">"Do we need this?"</h3></div>
          <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6 }}>
            <ul style={{ margin: 0, paddingLeft: 20, color: "var(--text-secondary)" }}>
              <li>Can it be built by composing existing primitives?</li>
              <li>Does it appear in ≥ 2 modules, or is it a one-off?</li>
              <li>Does it duplicate a Highcharts / Leaflet / radix-ui feature?</li>
              <li>Will a designer commit to owning its Story canon?</li>
            </ul>
            <p style={{ marginTop: 12, marginBottom: 0, fontSize: 12, color: "var(--text-muted)" }}>
              All four "no" → it doesn't belong in the system yet.
            </p>
          </div>
        </div>
        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-card-title">PR checklist</h3></div>
          <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6 }}>
            <ul style={{ margin: 0, paddingLeft: 20, color: "var(--text-secondary)" }}>
              <li>RFC merged (if API change).</li>
              <li>Storybook story per variant × size × state.</li>
              <li>axe passes · keyboard happy path works.</li>
              <li>Tokens only: no raw hex, no magic <code>px</code> outside the scale.</li>
              <li>Bundle size delta ≤ budget.</li>
              <li>Changelog label set (<code>type:breaking</code> / <code>feature</code> / <code>fix</code>).</li>
              <li>Codemod added if deprecating anything.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Release cadence</h3>
      <div className="panel">
        {[
          ["Patch",   "On demand",        "Bug fixes. No coordination needed beyond review."],
          ["Minor",   "Every 2 weeks",    "Bundles additive changes. Notes posted to #design-system."],
          ["Major",   "Approx. quarterly", "Coordinated with product roadmap. RFC + migration guide + codemods land together."],
          ["Hotfix",  "≤ 4h SLA",         "Security or production-blocking issue. Direct to main, post-mortem within 48h."],
        ].map(([k, c, d]) => (
          <div key={k} className="token-row" style={{ gridTemplateColumns: "120px 140px 1fr" }}>
            <strong style={{ fontSize: 13 }}>{k}</strong>
            <span className="t-caption" style={{ color: "var(--brand-600)" }}>{c}</span>
            <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{d}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="callout" style={{ marginTop: 24 }}>
      <strong>The system's promise:</strong> if you read this spec and use the tokens, your UI will keep working, through theme swaps, library upgrades, even product rebrands, without a rewrite.
      The system's ask back is exactly this: only what's in the spec, never invented locally.
    </div>
  </>
);

window.StewardshipSection = StewardshipSection;
