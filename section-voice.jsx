/* Section: Voice & terminology */

const VoicePrinciples = () => (
  <div className="grid-3">
    {[
      ["Direct", "Operators are scanning under time pressure. One sentence beats two. Lead with the action or the consequence, not with throat-clearing."],
      ["Specific", "\"Failed\" is not enough. \"Couldn't fetch vessel: connection timed out after 30 s\" is. Names beat pronouns; numbers beat adjectives."],
      ["Respectful", "Never blame the user. \"Required\" not \"You forgot…\". Skytek's tone is a calm colleague, not a panicked alert."],
      ["Consistent", "Same noun for the same thing on every screen. \"Vessel\" everywhere, never \"ship\" in one place and \"vessel\" in another."],
      ["Plain", "No marketing copy in product UI. No exclamation points. No \"oops\". No emoji. Jargon is OK when it's the right word."],
      ["Honest", "If we don't know, we say so. If it's slow, we tell the user. Loading more than 3 s shows progress; failing surfaces the cause."],
    ].map(([t, d]) => (
      <div key={t} className="ds-card">
        <div className="ds-card-head"><h3 className="ds-card-title">{t}</h3></div>
        <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.55, color: "var(--text-secondary)" }}>{d}</div>
      </div>
    ))}
  </div>
);

const VerbConventions = () => (
  <div className="panel">
    {[
      ["Save", "Persist current form state. Reversible (Undo within 8 s). Use on long forms where intermediate state matters."],
      ["Apply", "Commit a transient configuration (filters, layout, view). No round-trip to the server implied."],
      ["Update", "Modify an existing record. Use on detail pages where the user is the obvious editor. Prefer over \"Save\" for inline edits."],
      ["Create", "Make a new top-level entity: a portfolio, a rule set, an organization."],
      ["Add", "Insert into a list or selection: \"Add vessel to portfolio\", \"Add filter\". Reciprocal of Remove."],
      ["Remove", "Take out of a list. Reversible. Reciprocal of Add."],
      ["Delete", "Destroy a record. Confirmation required. Never reversible without an audit trail."],
      ["Archive", "Hide from active views. Reversible via Restore."],
      ["Acknowledge", "Mark an alert as seen. Doesn't resolve the underlying issue."],
      ["Resolve", "Close an alert because the situation is over. Pairs with a reason code."],
      ["Cancel", "Abandon the current action. Always destructive of unsaved state. Pair with Close on modals only when both make sense."],
      ["Close", "Dismiss without action. Used on read-only modals and toasts."],
    ].map(([verb, desc]) => (
      <div key={verb} className="ds-verb-card">
        <div className="verb">{verb}</div>
        <div className="desc">{desc.split(/(?<=^|\s)("[^"]+")/).map((p, i) =>
          p.startsWith('"') ? <em key={i}>{p}</em> : <React.Fragment key={i}>{p}</React.Fragment>
        )}</div>
      </div>
    ))}
  </div>
);

const ErrorTemplate = () => (
  <div className="grid-2" style={{ alignItems: "flex-start" }}>
    <div className="ds-card">
      <div className="ds-card-head"><h3 className="ds-card-title">Template</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6 }}>
        <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 8, alignItems: "baseline" }}>
          <strong style={{ color: "var(--text-primary)" }}>What</strong>
          <span style={{ color: "var(--text-secondary)" }}>Name the failed action.</span>
          <strong style={{ color: "var(--text-primary)" }}>Why</strong>
          <span style={{ color: "var(--text-secondary)" }}>The cause, in the user's language. Never an error code as the only detail.</span>
          <strong style={{ color: "var(--text-primary)" }}>How</strong>
          <span style={{ color: "var(--text-secondary)" }}>The next action the user can take. Always present, even if it's "Retry".</span>
        </div>
      </div>
    </div>
    <div className="ds-card">
      <div className="ds-card-head"><h3 className="ds-card-title">In practice</h3></div>
      <div className="ds-card-body">
        <div className="ds-alert ds-alert--danger" style={{ margin: 0 }}>
          <Icon d={I.alert} size={20} className="ds-alert-icon"/>
          <div className="ds-alert-body">
            <div className="ds-alert-title">Couldn't update policy notes</div>
            Save failed because another user updated this policy 12 s ago. Refresh to see the latest version, then re-apply your changes.
          </div>
        </div>
        <p className="t-caption" style={{ marginTop: 12, marginBottom: 0 }}>
          Title = <strong>what</strong>. First sentence = <strong>why</strong>. Last sentence = <strong>how</strong>. Reference code (if needed) goes on a second line, monospace, muted.
        </p>
      </div>
    </div>
  </div>
);

const VoiceComparisons = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    {[
      {
        bad:  "Oops! Something went wrong. Please try again later. 😞",
        good: "Couldn't load vessel positions. The AIS feed timed out. Retry."
      },
      {
        bad:  "Are you sure you want to delete this? This action cannot be undone.",
        good: "Delete the Black Sea portfolio? 38 vessels will be moved to Unassigned. This is permanent."
      },
      {
        bad:  "Success! Your changes have been saved successfully.",
        good: "Policy notes updated · 14:32 UTC."
      },
      {
        bad:  "No items match your search criteria. Please modify your search.",
        good: "No vessels match these filters. Try widening the date range or removing the flag filter."
      },
      {
        bad:  "Warning! High-risk vessel detected!!!",
        good: "Sanctioned · Vessel matches OFAC SDN list as of 09:14 UTC."
      },
    ].map((row, i) => (
      <div key={i} className="ds-voice-pair">
        <div className="ds-voice-bubble ds-voice-bubble--bad">
          <div className="lbl">Avoid</div>
          {row.bad}
        </div>
        <div className="ds-voice-bubble ds-voice-bubble--good">
          <div className="lbl">Prefer</div>
          {row.good}
        </div>
      </div>
    ))}
  </div>
);

const Terminology = () => (
  <table className="spec-table">
    <thead>
      <tr><th>Use</th><th>Not</th><th>Notes</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Vessel</strong></td><td>Ship, boat, craft</td><td>Maritime asset across the product. "Ship" only appears in the IMO ship-type taxonomy.</td></tr>
      <tr><td><strong>Aircraft</strong></td><td>Plane, jet</td><td>Aviation asset. "Plane" reserved for icon alias.</td></tr>
      <tr><td><strong>Asset</strong></td><td>Object, entity, thing</td><td>Top-level term covering vessel, aircraft, offshore installation, property.</td></tr>
      <tr><td><strong>Policy</strong></td><td>Cover, contract, insurance</td><td>The insurance instrument. "Cover" only in legacy report templates being phased out.</td></tr>
      <tr><td><strong>Exposure</strong></td><td>Risk amount, sum insured, TSI</td><td>The monetary value at risk. Domain-standard.</td></tr>
      <tr><td><strong>Sanctioned</strong></td><td>Banned, blacklisted, restricted</td><td>Specifically: appears on OFAC / UK / EU / UN sanctions lists. Don't use as a general adjective.</td></tr>
      <tr><td><strong>Watchlist</strong></td><td>Flagged, marked, monitored</td><td>User-curated list of assets under elevated scrutiny.</td></tr>
      <tr><td><strong>Portfolio</strong></td><td>Book, collection, group</td><td>Underwriter-defined grouping of policies.</td></tr>
      <tr><td><strong>Region</strong></td><td>Area, territory, zone</td><td>Geographic grouping. "Area" reserved for sub-region inside a region.</td></tr>
      <tr><td><strong>Alert</strong></td><td>Notification, warning, event</td><td>An actionable signal. "Notification" is the system-wide bell-icon delivery channel.</td></tr>
      <tr><td><strong>Acknowledged</strong></td><td>Seen, viewed, read</td><td>Specifically: a user marked the alert as seen.</td></tr>
      <tr><td><strong>Rating</strong></td><td>Score, grade, rank</td><td>A–E PSC compliance rating. Reserved noun: not generic.</td></tr>
    </tbody>
  </table>
);

const CaseRules = () => (
  <div className="grid-2">
    <div className="ds-card">
      <div className="ds-card-head"><h3 className="ds-card-title">Sentence case · UI</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        <p style={{ marginTop: 0 }}>Everything operator-facing: buttons, menu items, page titles, section headings, form labels, empty states, error copy.</p>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>"Add vessel to portfolio", not "Add Vessel To Portfolio"</li>
          <li>"Sanctioned vessels", proper-noun "Sanctioned" stays cap</li>
          <li>"Last seen", not "Last Seen"</li>
        </ul>
      </div>
    </div>
    <div className="ds-card">
      <div className="ds-card-head"><h3 className="ds-card-title">Title case · proper nouns &amp; reports</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        <p style={{ marginTop: 0 }}>Product names, module names, exported reports, formal documents.</p>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>"Skytek Real World", "Marine Dashboard"</li>
          <li>"Q1 2026 Sanctions Exposure Report"</li>
          <li>"OFAC SDN List", "Marshall Islands Flag Authority"</li>
        </ul>
      </div>
    </div>
  </div>
);

const NumberStyle = () => (
  <table className="spec-table">
    <thead><tr><th>Case</th><th>Style</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td>In prose, &lt; 10</td><td>Spell out</td><td>"Three vessels were updated."</td></tr>
      <tr><td>In prose, ≥ 10</td><td>Numerals</td><td>"23 vessels were updated."</td></tr>
      <tr><td>In UI labels, any value</td><td>Numerals</td><td>"7 active alerts"</td></tr>
      <tr><td>Start of sentence</td><td>Spell out OR rewrite</td><td>"Twelve vessels…" OR "We updated 12 vessels…"</td></tr>
      <tr><td>Units &amp; measurements</td><td>Numerals + non-breaking space</td><td>"12.4 kn", "248 nm", see Formatting chapter</td></tr>
      <tr><td>Money</td><td>Numerals + symbol</td><td>"$2.4M" tile, "$2,400,000" table</td></tr>
      <tr><td>Time</td><td>Numerals + zone</td><td>"14:32 UTC", never "two thirty"</td></tr>
    </tbody>
  </table>
);

const VoiceSection = () => (
  <>
    <div className="subsection" style={{ marginTop: 0 }}>
      <h3 className="subsection-title">Why this chapter</h3>
      <p className="subsection-desc" style={{ maxWidth: 820 }}>
        Words are the smallest tokens in the system, and the most often duplicated. A "Save" button on one screen and an "Update" button on another are the same UI inconsistency as two button shades of blue.
        This chapter is the vocabulary, verbs, nouns, tone, and the rules that hold them together.
      </p>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Tone: six principles</h3>
      <VoicePrinciples />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Voice in practice</h3>
      <p className="subsection-desc">Same situation, two voices. The right side is the one we ship.</p>
      <VoiceComparisons />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Button verbs</h3>
      <p className="subsection-desc">Twelve verbs cover the product. If you reach for a thirteenth, propose it via RFC, most "new verb" needs map to one of these.</p>
      <VerbConventions />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Error message template</h3>
      <p className="subsection-desc">Every user-facing error answers three questions, in this order: <strong>what</strong> failed, <strong>why</strong>, and <strong>how</strong> to proceed.</p>
      <ErrorTemplate />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Terminology glossary</h3>
      <p className="subsection-desc">
        The canonical noun for every recurring domain concept. PRs that introduce a synonym are blocked at review.
      </p>
      <Terminology />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Capitalization</h3>
      <CaseRules />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Numbers in copy</h3>
      <NumberStyle />
    </div>

    <div className="callout">
      <strong>The principle:</strong> if a designer and an engineer write the same string for the same situation, the system worked. Vocabulary is part of the API.
    </div>
  </>
);

window.VoiceSection = VoiceSection;
