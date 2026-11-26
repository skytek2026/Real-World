/* Compliance / Sanction list mock, focused on the "Unknown" entity bug fix.

   The bug: when a relationship's value is "Unknown" or "Unknown Entity",
   the system runs sanction list checks against the literal string and
   reports green "Ok", falsely implying the entity has been screened.

   The fix: introduce an "Unverifiable" / "Cannot be analysed" state so
   it's visually clear those rows could not be evaluated and may carry
   undisclosed sanctions risk.
*/

const WarnIcon = ({ size = 12, color = "var(--unverif-700)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const InfoIcon = ({ size = 12, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const FolderIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
  </svg>
);

const SANCTION_LISTS = ["OFAC List", "UN List", "EU List", "Australia List", "OFSI List"];

/* Status helpers */
const StatusCell = ({ status, treatment = "default" }) => {
  if (status === "ok") {
    return (
      <span className="s-cell s-cell--ok" aria-label="Ok">
        <span className="s-dot" /> Ok
      </span>
    );
  }
  if (status === "sanctioned") {
    return (
      <span className="s-cell s-cell--sanctioned" aria-label="Sanctioned">
        <span className="s-dot" /> Sanctioned
      </span>
    );
  }
  // unverifiable variants
  if (treatment === "dash") {
    return (
      <span className="s-cell s-cell--unverif-dash" title="Cannot be analysed: subject is unknown.">
        <span className="dash">—</span>
        <span className="warn-glyph"><WarnIcon size={11} color="var(--unverif-500)" /></span>
      </span>
    );
  }
  if (treatment === "stripe") {
    return (
      <span className="s-cell s-cell--unverif-stripe" title="Cannot be analysed: subject is unknown.">
        <span className="s-dot" /> Unverifiable
      </span>
    );
  }
  if (treatment === "na") {
    return (
      <span className="s-cell s-cell--unverif-na" title="Cannot be analysed: subject is unknown.">
        <span className="s-dot" />
        <span className="warn-tag"><WarnIcon size={10} /> Unknown subject</span>
      </span>
    );
  }
  return (
    <span className="s-cell s-cell--unverif" title="Cannot be analysed: subject is unknown.">
      <span className="s-dot" /> Unverifiable
    </span>
  );
};

const REASON_COPY = {
  "no-record": {
    title: "Provider has no record",
    body: <>The data provider returned <em>unknown</em> for this relationship; they hold no record of the underlying entity. Sanctions screening cannot run. <strong>Treat as elevated risk.</strong></>,
  },
  "link-terminated": {
    title: "Active link terminated",
    body: <>A previously-recorded link ended (e.g. Technical Manager 2021–2025). No successor has been registered, so the current holder is unknown. <strong>Verify before clearing.</strong></>,
  },
};

const SubjectName = ({ name, unknown, link, reason }) => {
  if (unknown) {
    const r = REASON_COPY[reason] || REASON_COPY["no-record"];
    return (
      <span className="info-popover-trigger" style={{ position: "relative", display: "inline-block" }}>
        <span className="s-subject-unknown">
          <WarnIcon size={12} />
          {name}
        </span>
        <div className="info-popover" role="tooltip">
          <div className="pop-title"><WarnIcon size={12} color="var(--unverif-300)" /> {r.title}</div>
          {r.body}
        </div>
      </span>
    );
  }
  return link
    ? <a href="#" onClick={(e) => e.preventDefault()}>{name}</a>
    : <span>{name}</span>;
};

/* ============================================================
   "Before", current behaviour as shown in the screenshot.
   Every Unknown subject gets green Ok across all five lists.
   ============================================================ */
const BeforeTable = () => {
  const rows = [
    { rel: "Vessel", name: "HH GLORY", link: true, unknown: false,
      results: ["sanctioned","ok","ok","ok","ok"] },
    { rel: "Vessel's Flag", name: "Panama", link: false, unknown: false,
      results: ["ok","ok","ok","ok","ok"] },
    { rel: "Owner", name: "Skyros Maritime & Trading SA", link: true, unknown: false, folder: true,
      results: ["sanctioned","ok","ok","ok","ok"] },
    { rel: "Owner's Registration Country", name: "Panama", link: false,
      results: ["ok","ok","ok","ok","ok"] },
    { rel: "Owner's Control Country", name: "Panama", link: false,
      results: ["ok","ok","ok","ok","ok"] },
    { rel: "Owner's Domicile Country", name: "Unknown", link: false, unknown: true,
      results: ["ok","ok","ok","ok","ok"] }, // ← bug: should not be Ok
    { rel: "Group Beneficial", name: "Unknown Entity", link: true, unknown: true, folder: true,
      results: ["ok","ok","ok","ok","ok"] }, // ← bug
    { rel: "Operator", name: "Unknown Entity", link: true, unknown: true, folder: true,
      results: ["ok","ok","ok","ok","ok"] }, // ← bug
  ];

  return (
    <table className="compliance-table">
      <thead>
        <tr>
          <th>Relationship</th>
          <th>Name</th>
          {SANCTION_LISTS.map(l => <th key={l} className="center">{l}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td>
              <span className="rel">
                {r.folder && <span className="ico"><FolderIcon /></span>}
                {r.rel}
              </span>
            </td>
            <td className="name">
              {r.link
                ? <a href="#" onClick={(e) => e.preventDefault()}>{r.name}</a>
                : <span>{r.name}</span>}
            </td>
            {r.results.map((s, j) => (
              <td key={j} className="center">
                <StatusCell status={s} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/* ============================================================
   "After", Unverifiable status replaces false Ok.
   ============================================================ */
const AfterTable = ({ treatment }) => {
  const rows = [
    { rel: "Vessel", name: "HH GLORY", link: true, unknown: false,
      results: ["sanctioned","ok","ok","ok","ok"] },
    { rel: "Vessel's Flag", name: "Panama", link: false, unknown: false,
      results: ["ok","ok","ok","ok","ok"] },
    { rel: "Owner", name: "Skyros Maritime & Trading SA", link: true, unknown: false, folder: true,
      results: ["sanctioned","ok","ok","ok","ok"] },
    { rel: "Owner's Registration Country", name: "Panama", link: false,
      results: ["ok","ok","ok","ok","ok"] },
    { rel: "Owner's Control Country", name: "Panama", link: false,
      results: ["ok","ok","ok","ok","ok"] },
    // Unknown rows now resolve to unverifiable across the board
    { rel: "Owner's Domicile Country", name: "Unknown", link: false, unknown: true, reason: "no-record",
      results: ["unverif","unverif","unverif","unverif","unverif"] },
    { rel: "Group Beneficial", name: "Unknown Entity", link: true, unknown: true, folder: true, reason: "no-record",
      results: ["unverif","unverif","unverif","unverif","unverif"] },
    { rel: "Operator", name: "Unknown Entity", link: true, unknown: true, folder: true, reason: "link-terminated",
      results: ["unverif","unverif","unverif","unverif","unverif"] },
  ];

  return (
    <table className="compliance-table">
      <thead>
        <tr>
          <th>Relationship</th>
          <th>Name</th>
          {SANCTION_LISTS.map(l => <th key={l} className="center">{l}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className={r.unknown ? "row--unverif" : ""}>
            <td>
              <span className="rel">
                {r.folder && <span className="ico"><FolderIcon /></span>}
                {r.rel}
              </span>
            </td>
            <td className="name">
              <SubjectName name={r.name} unknown={r.unknown} link={r.link} reason={r.reason} />
            </td>
            {r.results.map((s, j) => (
              <td key={j} className="center">
                <StatusCell status={s} treatment={treatment} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/* ============================================================
   Top-of-tab banner shown when unverifiable rows are present.
   ============================================================ */
const UnverifBanner = () => (
  <div className="ds-alert ds-alert--unverif" style={{ margin: "12px 12px 0" }} role="status">
    <span style={{ marginTop: 1 }}><WarnIcon size={18} color="var(--unverif-700)" /></span>
    <div className="ds-alert-body">
      <div className="ds-alert-title">3 subjects could not be analysed</div>
      <div style={{ color: "var(--unverif-700)", fontSize: 12.5, lineHeight: 1.5 }}>
        <strong>Owner's Domicile Country</strong>, <strong>Group Beneficial</strong> and <strong>Operator</strong> are listed as <em>Unknown</em>.
        Sanctions screening cannot run against an unknown subject; there may be sanctioned implications that have not been surfaced.
        <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--unverif-700)", marginLeft: 4, fontWeight: 600 }}>How is this resolved? →</a>
      </div>
    </div>
  </div>
);

/* ============================================================
   Mock browser frame, vessel detail page chrome
   ============================================================ */
const MockFrame = ({ children }) => (
  <div className="mock-frame">
    <div className="mock-frame__chrome">
      <div className="url">app.realworld.skytek.com/vessel/141461?assetDetailReports=company</div>
    </div>
    <div className="mock-tabs">
      <button className="mock-tab">Inspection Data</button>
      <button className="mock-tab" aria-selected="true">
        Sanction Compliance
        <span className="tab-warn-dot" aria-label="3 unverifiable subjects" />
      </button>
      <button className="mock-tab">Casualty Data</button>
      <button className="mock-tab">Additional Details</button>
      <button className="mock-tab">Historical Details</button>
      <button className="mock-tab">Full Vessel Details</button>
      <button className="mock-tab">Ship-To-Ship</button>
      <button className="mock-tab">Suspicious Activities</button>
    </div>
    {children}
  </div>
);

/* ============================================================
   Side panel: tweakable info card explaining the gauge note.
   Reflects: "With sanctions" risk score is partially blind when
   unverifiable subjects are present.
   ============================================================ */
const SmallScoreCallout = () => (
  <div className="mini-gauge" style={{ width: 280 }}>
    <div className="mini-gauge__head">
      <span className="mini-gauge__title">Risk score · with sanctions</span>
    </div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
      <span style={{ fontSize: 30, fontWeight: 700, fontFamily: "var(--font-display)", letterSpacing: "-0.02em", color: "var(--danger-700)" }}>100</span>
      <span className="ds-badge ds-badge--danger ds-badge--dot">Sanctioned</span>
    </div>
    <div className="gauge-warn">
      <WarnIcon size={14} />
      <div>
        Score reflects screened subjects only.
        <strong style={{ display: "block", color: "var(--unverif-700)" }}>3 unverifiable subjects excluded.</strong>
      </div>
    </div>
  </div>
);

/* ============================================================
   Page composition
   ============================================================ */
const Page = () => {
  const defaults = /*EDITMODE-BEGIN*/{
    "treatment": "default",
    "showBefore": true,
    "showBanner": true,
    "showRowTint": true
  }/*EDITMODE-END*/;

  const [tweaks, setTweak] = useTweaks(defaults);

  // Toggle row-tint by adding/removing a class on the after table wrapper.
  const afterClass = `treatment-${tweaks.treatment}` + (tweaks.showRowTint ? "" : " no-row-tint");

  // Inject a runtime style toggle to optionally remove row tint
  React.useEffect(() => {
    const id = "__row-tint-toggle";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("style");
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = tweaks.showRowTint
      ? ""
      : `tr.row--unverif > td { background: var(--white) !important; }
         tr.row--unverif > td:first-child::before { display: none; }`;
  }, [tweaks.showRowTint]);

  return (
    <div className="page-wrap">
      <div className="page-head">
        <div className="page-eyebrow">Sanctions screening · bug fix</div>
        <h1>"Unknown" subjects must not pass as compliant</h1>
        <p>
          When a relationship resolves to <em>Unknown</em> or <em>Unknown Entity</em>, the platform
          currently runs the literal string against each sanctions list and reports green <strong>Ok</strong>, which reads as "screened and cleared". It hasn't been screened at all. This deck introduces
          an <strong>Unverifiable</strong> state so users see, immediately, that there could be
          sanctions implications that haven't been surfaced.
        </p>
      </div>

      {/*: Section 1: the new state, */}
      <div className="section-block">
        <h2>The new state · Unverifiable</h2>
        <p className="lead">
          A third semantic alongside Ok / Sanctioned. Distinct hue (amber-slate, not the warning
          orange already used for "At risk"), hollow ring with a "?" mark, and a row-level tint
          so the eye lands on these subjects first.
        </p>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", padding: "16px", background: "var(--white)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)" }}>
          <div>
            <div className="t-label" style={{ marginBottom: 4 }}>Ok</div>
            <StatusCell status="ok" />
          </div>
          <div>
            <div className="t-label" style={{ marginBottom: 4 }}>Sanctioned</div>
            <StatusCell status="sanctioned" />
          </div>
          <div>
            <div className="t-label" style={{ marginBottom: 4 }}>Unverifiable <span style={{ color: "var(--unverif-700)" }}>(new)</span></div>
            <StatusCell status="unverif" treatment={tweaks.treatment} />
          </div>
          <div style={{ flex: 1, minWidth: 280, paddingLeft: 24, borderLeft: "1px solid var(--border-subtle)", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55 }}>
            <strong style={{ color: "var(--text-primary)" }}>Sarah / Gabriel asked for a dash.</strong> A bare <code>—</code> stops the false green Ok but doesn't carry the second message; that this could be hiding sanctioned exposure. The <em>— + warn</em> tweak option keeps the dash and adds a small amber glyph; <em>Ring+?</em> is louder. Pick whichever the team prefers.
          </div>
        </div>
      </div>

      {/*: Section 2: Before / After, */}
      <div className="section-block">
        <h2>Before · After</h2>
        <p className="lead">
          The Sanction Compliance tab on the vessel detail page, with the same data shown in the
          attached screenshot.
        </p>

        <div className="audit-section" style={{ display: tweaks.showBefore ? "grid" : "block", gridTemplateColumns: tweaks.showBefore ? "1fr 1fr" : "1fr" }}>
          {tweaks.showBefore && (
            <div className="audit-pane audit-pane--before">
              <div className="audit-pane__head">
                <span className="audit-pane__pill">Before</span>
                Unknown subjects pass as Ok
              </div>
              <MockFrame>
                <div style={{ padding: "0 16px" }}>
                  <BeforeTable />
                </div>
              </MockFrame>
              <div style={{ padding: "12px 16px", background: "var(--danger-050)", borderTop: "1px solid var(--danger-100)", color: "var(--danger-700)", fontSize: 12.5, lineHeight: 1.5 }}>
                <strong>Problem.</strong> The bottom three rows show <em>Unknown</em> / <em>Unknown Entity</em> as the subject,
                yet the system returns green Ok across all five sanctions lists. A reviewer scanning the page sees
                "no flags" and clears the vessel: without realising three of its key relationships were never
                actually screened.
              </div>
            </div>
          )}

          <div className="audit-pane audit-pane--after">
            <div className="audit-pane__head">
              <span className="audit-pane__pill">After</span>
              Unverifiable subjects are surfaced as a distinct state
            </div>
            <MockFrame>
              {tweaks.showBanner && <UnverifBanner />}
              <div className={afterClass} style={{ padding: "0 16px" }}>
                <AfterTable treatment={tweaks.treatment} />
              </div>
            </MockFrame>
            <div style={{ padding: "12px 16px", background: "var(--success-050)", borderTop: "1px solid var(--success-100)", color: "var(--success-700)", fontSize: 12.5, lineHeight: 1.5 }}>
              <strong>What changed.</strong> Three behaviours work together: (1) <strong>row tint &amp; left rail</strong>
              draw the eye to unknown subjects, (2) <strong>cell status</strong> shows Unverifiable instead of Ok,
              and (3) a <strong>tab-level banner</strong> states the count and the implication up front so the
              reviewer can't miss it.
            </div>
          </div>
        </div>
      </div>

      {/*: Section 3: Behaviour spec, */}
      <div className="section-block">
        <h2>Behaviour spec</h2>
        <p className="lead">What triggers Unverifiable, why the subject is unknown, and how it surfaces.</p>

        <table className="spec-table">
          <thead>
            <tr><th style={{ width: 220 }}>Reason</th><th>What the provider returned</th><th>Popover copy</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>No record</strong><div className="t-caption">Provider has nothing on this entity.</div></td>
              <td>Provider returns <code className="inline">unknown</code> with no entity ID and no historical record.</td>
              <td><em>"The data provider returned <strong>unknown</strong> for this relationship; they hold no record of the underlying entity. Sanctions screening cannot run. Treat as elevated risk."</em></td>
            </tr>
            <tr>
              <td><strong>Active link terminated</strong><div className="t-caption">e.g. Tech Manager 2021–2025, no successor.</div></td>
              <td>Provider returns <code className="inline">unknown</code> but has historical records: the prior link ended on a known date and no replacement was filed.</td>
              <td><em>"A previously-recorded link ended (e.g. Technical Manager 2021–2025). No successor has been registered, so the current holder is unknown. Verify before clearing."</em></td>
            </tr>
            <tr>
              <td><strong>Mixed result on a folder</strong><div className="t-caption">e.g. Owner has 5 beneficiaries, 1 unknown.</div></td>
              <td>Folder aggregates child screening results.</td>
              <td>Folder cell shows <em>Partially verifiable</em> with count badge "1 unknown". Children listed individually.</td>
            </tr>
            <tr>
              <td><strong>Risk score gauge</strong></td>
              <td>The score is computed only from screened subjects.</td>
              <td>Footnote chip on the gauge: <em>"Score excludes 3 unverifiable subjects."</em>, keeps the score truthful.</td>
            </tr>
          </tbody>
        </table>

        <div className="callout warn" style={{ marginTop: 16 }}>
          <strong>Where the reason comes from.</strong> The provider response already distinguishes "no record" from "link terminated" (per Stefan). We surface that on hover instead of inventing a single generic message. Reviewers respond differently to the two cases, "no record" usually means escalate; "link terminated" usually means chase the broker for the successor. One pattern, two stories.
        </div>
      </div>

      {/*: Section 4: Where else this surfaces, */}
      <div className="section-block">
        <h2>Where else this surfaces</h2>
        <p className="lead">The pattern propagates beyond the table cell.</p>

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16, alignItems: "flex-start" }}>
          <SmallScoreCallout />
          <div className="ds-card" style={{ padding: 16 }}>
            <div className="t-label" style={{ marginBottom: 8 }}>Tab indicator</div>
            <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border-default)", marginBottom: 12 }}>
              <button className="mock-tab">Inspection Data</button>
              <button className="mock-tab" aria-selected="true">
                Sanction Compliance
                <span className="tab-warn-dot" />
              </button>
              <button className="mock-tab">Casualty Data</button>
            </div>
            <p className="t-caption" style={{ margin: 0 }}>
              When unverifiable subjects exist on a vessel, the Sanction Compliance tab gets a small amber dot, same affordance the team already uses for "Suspicious Activities" but in the unverifiable hue.
              Visible from any tab on the vessel detail page.
            </p>
          </div>
        </div>
      </div>

      {/*: Section 5: What we explicitly did NOT do, */}
      <div className="section-block">
        <h2>What we deliberately didn't do</h2>
        <ul className="diff-list">
          <li>Mark unverifiable subjects as <strong>Sanctioned</strong>, because false positives erode trust in the red dot.</li>
          <li>Hide unverifiable rows from the <em>Compliance</em> table: the reviewer must still see them. (Hiding may make sense for the <em>Ownership</em> table specifically; that's a separate decision.)</li>
          <li>Reuse the existing <strong>orange "At risk"</strong> warning hue; it already means "screened and borderline". Conflating the two would dilute both.</li>
          <li>Block PDF export when unverifiable subjects exist, but the PDF inherits the same banner copy so downstream readers also see the caveat.</li>
        </ul>
      </div>

      <div className="section-block" style={{ marginTop: 48, paddingTop: 24, borderTop: "1px dashed var(--border-default)" }}>
        <p className="t-caption" style={{ margin: 0 }}>
          Toggle the <strong>Tweaks</strong> button (top-right) to compare three visual treatments for the
          Unverifiable cell, hide the Before pane, hide the banner, or remove the row tint. Use it to
          decide which treatment best fits Skytek's compliance surfaces.
        </p>
      </div>

      {/*: Tweaks panel: */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Cell treatment" />
        <TweakRadio
          label="Style"
          value={tweaks.treatment}
          onChange={(v) => setTweak("treatment", v)}
          options={[
            { value: "default", label: "Ring+?" },
            { value: "dash",    label: "— + warn" },
            { value: "stripe",  label: "Striped" },
            { value: "na",      label: "N/A" },
          ]}
        />
        <TweakSection label="Layout" />
        <TweakToggle
          label="Show Before pane"
          value={tweaks.showBefore}
          onChange={(v) => setTweak("showBefore", v)}
        />
        <TweakToggle
          label="Top-of-tab banner"
          value={tweaks.showBanner}
          onChange={(v) => setTweak("showBanner", v)}
        />
        <TweakToggle
          label="Tint unverifiable rows"
          value={tweaks.showRowTint}
          onChange={(v) => setTweak("showRowTint", v)}
        />
      </TweaksPanel>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);
