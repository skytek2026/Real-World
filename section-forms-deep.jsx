/* Section: Forms: full specification */

const FormAnatomyDemo = () => (
  <div className="ds-form-anatomy">
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div className="ds-field">
        <label className="ds-field-label" htmlFor="anatomy-field">
          IMO number <span className="ds-field-required" aria-hidden="true">*</span>
          <span className="sr-only"> required</span>
        </label>
        <input id="anatomy-field" className="ds-input" placeholder="9234567" defaultValue="9234567" aria-describedby="anatomy-help"/>
        <div id="anatomy-help" className="ds-field-help">7 digits, no prefix. We'll validate against the IHS Maritime registry.</div>
      </div>
    </div>
    <ol style={{ margin: 0, paddingLeft: 20, fontSize: 12.5, lineHeight: 1.65, color: "var(--text-secondary)" }}>
      <li><strong style={{ color: "var(--text-primary)" }}>Label</strong>, sentence case, no colon, above the input.</li>
      <li><strong style={{ color: "var(--text-primary)" }}>Required indicator</strong>, danger-500 asterisk, with a screen-reader-only "required".</li>
      <li><strong style={{ color: "var(--text-primary)" }}>Input</strong>, 32 px (md) default, 28 px (sm) in compact density.</li>
      <li><strong style={{ color: "var(--text-primary)" }}>Helper text</strong>, single line below, muted. Replaced by error when error fires.</li>
      <li><strong style={{ color: "var(--text-primary)" }}>aria-describedby</strong>, links input to the help/error id.</li>
    </ol>
  </div>
);

const FieldStatesDemo = () => (
  <div className="ds-field-grid">
    <div className="ds-field">
      <label className="ds-field-label">Default</label>
      <input className="ds-input" defaultValue="Pacific Pioneer"/>
      <div className="ds-field-help">Rest state with helper text.</div>
    </div>
    <div className="ds-field">
      <label className="ds-field-label">Focus</label>
      <input className="ds-input" defaultValue="Pacific Pioneer" autoFocus style={{ borderColor: "var(--brand-400)", boxShadow: "var(--shadow-focus)" }}/>
      <div className="ds-field-help">Brand-400 border + 3 px focus ring.</div>
    </div>
    <div className="ds-field">
      <label className="ds-field-label">Disabled</label>
      <input className="ds-input" defaultValue="Pacific Pioneer" disabled/>
      <div className="ds-field-help">User cannot edit. Won't submit. Use when the field doesn't apply.</div>
    </div>
    <div className="ds-field">
      <label className="ds-field-label">Read-only</label>
      <input className="ds-input" defaultValue="IMO 9234567" readOnly style={{ background: "var(--slate-050)", color: "var(--text-primary)" }}/>
      <div className="ds-field-help">User can copy/select. Will submit. Use for computed or locked values.</div>
    </div>
    <div className="ds-field">
      <label className="ds-field-label">Error</label>
      <input className="ds-input" defaultValue="123" aria-invalid="true"/>
      <div className="ds-field-error">
        <Icon d={I.alert} size={12} stroke="currentColor"/> IMO must be 7 digits.
      </div>
    </div>
    <div className="ds-field">
      <label className="ds-field-label">Async pending</label>
      <span style={{ position: "relative" }}>
        <input className="ds-input" defaultValue="9234567" style={{ paddingRight: 32 }}/>
        <span className="ds-spinner" style={{ position: "absolute", right: 10, top: 9 }}/>
      </span>
      <div className="ds-field-help">Checking registry…</div>
    </div>
    <div className="ds-field">
      <label className="ds-field-label">Async valid</label>
      <span style={{ position: "relative" }}>
        <input className="ds-input" defaultValue="9234567" style={{ paddingRight: 32 }}/>
        <span className="ds-validation-state-icon ds-field-valid" style={{ position: "absolute", right: 10, top: 8 }}>
          <Icon d={I.check} size={14} stroke="currentColor"/>
        </span>
      </span>
      <div className="ds-field-help" style={{ color: "var(--success-700)" }}>Matches MV PACIFIC PIONEER (Liberia).</div>
    </div>
    <div className="ds-field">
      <label className="ds-field-label">Async invalid</label>
      <span style={{ position: "relative" }}>
        <input className="ds-input" defaultValue="0000001" aria-invalid="true" style={{ paddingRight: 32 }}/>
        <span className="ds-validation-state-icon ds-field-invalid" style={{ position: "absolute", right: 10, top: 8 }}>
          <Icon d={I.x} size={14} stroke="currentColor"/>
        </span>
      </span>
      <div className="ds-field-error">
        <Icon d={I.alert} size={12} stroke="currentColor"/> Not found in IHS Maritime registry.
      </div>
    </div>
  </div>
);

const ValidationTimingTable = () => (
  <table className="spec-table">
    <thead>
      <tr><th>Trigger</th><th>Fires on</th><th>Use for</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>onSubmit</strong></td>
        <td>Form submission</td>
        <td>The default. Show all errors at once. Scroll to the first one.</td>
      </tr>
      <tr>
        <td><strong>onBlur</strong></td>
        <td>Field loses focus</td>
        <td>Email, URLs, IMO lookups, typeahead values. Don't fire on every keystroke.</td>
      </tr>
      <tr>
        <td><strong>onChange (live)</strong></td>
        <td>Each keystroke</td>
        <td>Strength meters, char counters, format hints. Never errors: only positive feedback.</td>
      </tr>
      <tr>
        <td><strong>Async</strong></td>
        <td>Debounced onBlur or onChange</td>
        <td>Uniqueness checks, registry lookups. Always show pending state before result.</td>
      </tr>
      <tr>
        <td><strong>Cross-field</strong></td>
        <td>onSubmit of dependent field</td>
        <td>"End date must be after start date." Re-run when either changes.</td>
      </tr>
    </tbody>
  </table>
);

const LabelLayoutDemo = () => (
  <div className="grid-2">
    <div className="panel">
      <div className="panel-head"><h4>Top labels · default</h4></div>
      <div className="panel-body" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="ds-field">
          <label className="ds-field-label">Vessel name</label>
          <input className="ds-input" defaultValue="MV Pacific Pioneer"/>
        </div>
        <div className="ds-field">
          <label className="ds-field-label">Flag</label>
          <select className="ds-input ds-select" defaultValue="lr">
            <option value="lr">Liberia</option>
            <option value="pa">Panama</option>
            <option value="mh">Marshall Islands</option>
          </select>
        </div>
      </div>
      <div className="panel-foot">Use for create forms, detail edit pages, anything &gt; 3 fields.</div>
    </div>
    <div className="panel">
      <div className="panel-head"><h4>Inline labels · dense</h4></div>
      <div className="panel-body" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 12, alignItems: "center" }}>
          <label className="ds-field-label" style={{ marginBottom: 0 }}>Vessel name</label>
          <input className="ds-input" defaultValue="MV Pacific Pioneer"/>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 12, alignItems: "center" }}>
          <label className="ds-field-label" style={{ marginBottom: 0 }}>Flag</label>
          <select className="ds-input ds-select" defaultValue="lr">
            <option value="lr">Liberia</option>
            <option value="pa">Panama</option>
          </select>
        </div>
      </div>
      <div className="panel-foot">Use for inline edits, side-panel forms, compact tables.</div>
    </div>
  </div>
);

const FieldGroupDemo = () => (
  <fieldset style={{ border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: 16, background: "var(--white)" }}>
    <legend style={{ padding: "0 8px", fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Vessel identification</legend>
    <div className="ds-field-grid">
      <div className="ds-field">
        <label className="ds-field-label">IMO number <span className="ds-field-required">*</span></label>
        <input className="ds-input" defaultValue="9234567"/>
      </div>
      <div className="ds-field">
        <label className="ds-field-label">MMSI</label>
        <input className="ds-input" defaultValue="636019825"/>
      </div>
      <div className="ds-field">
        <label className="ds-field-label">Call sign</label>
        <input className="ds-input" defaultValue="D5AB7"/>
      </div>
      <div className="ds-field">
        <label className="ds-field-label">Vessel name <span className="ds-field-required">*</span></label>
        <input className="ds-input" defaultValue="MV Pacific Pioneer"/>
      </div>
    </div>
  </fieldset>
);

const StepperDemo = () => (
  <div className="ds-stepper">
    <div className="ds-step is-done">
      <span className="ds-step-dot"><Icon d={I.check} size={12} stroke="currentColor"/></span>
      <span className="label">Identification</span>
    </div>
    <div className="ds-step-line"/>
    <div className="ds-step is-current">
      <span className="ds-step-dot">2</span>
      <span className="label">Policy &amp; coverage</span>
    </div>
    <div className="ds-step-line"/>
    <div className="ds-step">
      <span className="ds-step-dot">3</span>
      <span className="label">Portfolio</span>
    </div>
    <div className="ds-step-line"/>
    <div className="ds-step">
      <span className="ds-step-dot">4</span>
      <span className="label">Review</span>
    </div>
  </div>
);

const FormsRules = () => (
  <table className="spec-table">
    <thead>
      <tr><th>Concern</th><th>Rule</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Required indicator</strong></td><td>Danger-500 asterisk after the label. Plus an SR-only "required" so screen readers don't say "asterisk".</td></tr>
      <tr><td><strong>Optional indicator</strong></td><td>Show "(optional)" in muted text when most fields are required. Don't double-mark.</td></tr>
      <tr><td><strong>Placeholder vs label</strong></td><td>Placeholder is example data ("9234567"). It's never a substitute for a label.</td></tr>
      <tr><td><strong>Helper vs error</strong></td><td>Helper shows by default. Error replaces it. Both share the same DOM slot, so the layout doesn't jump when validation fires.</td></tr>
      <tr><td><strong>Error placement</strong></td><td>Below the input, never above. <code>aria-describedby</code> wires the error id to the input.</td></tr>
      <tr><td><strong>aria-invalid</strong></td><td>Set when an error fires. Cleared on next input change. Drives the red border styling.</td></tr>
      <tr><td><strong>Submission</strong></td><td>Disable Submit only while a request is in flight. Don't disable for invalid fields, let the submission show the errors at once.</td></tr>
      <tr><td><strong>Focus on error</strong></td><td>On submit with errors, focus moves to the first invalid field. Page scrolls to bring it into view.</td></tr>
      <tr><td><strong>Autofill</strong></td><td>Use semantic <code>autocomplete</code> attributes (<code>email</code>, <code>given-name</code>, <code>organization</code>). Browsers do the right thing.</td></tr>
      <tr><td><strong>Prevent data loss</strong></td><td><code>beforeunload</code> warning when the form is dirty. Suppressed during programmatic navigation.</td></tr>
    </tbody>
  </table>
);

const FormsApi = () => (
  <pre className="code">{`// app/ui/Form/types.ts
type FieldStatus = 'idle' | 'pending' | 'valid' | 'invalid';

type FieldProps<T> = {
  name: string;
  label: string;
  required?: boolean;
  help?: string;
  error?: string;          // present = aria-invalid
  status?: FieldStatus;    // drives icon + helper coloring
  // standard input forwarding
  value?: T;
  onChange?: (next: T) => void;
  onBlur?: () => void;
};

// React API, same surface for every input type
<Field name="imo" label="IMO number" required help="7 digits"
       status={imoStatus} error={imoError} {...register('imo')} />

// Async validator
useAsyncValidator('imo', async (value, signal) => {
  if (!/^\\d{7}$/.test(value)) return { error: 'IMO must be 7 digits.' };
  const res = await fetch(\`/api/imo/\${value}\`, { signal });
  if (!res.ok) return { error: 'Not found in IHS Maritime registry.' };
  return { valid: true, note: \`Matches \${(await res.json()).name}.\` };
}, { debounce: 300 });

// Form
<Form onSubmit={handle} validate={schema}
      onError={(errors) => focusFirstError(errors)}>
  …
</Form>`}</pre>
);

const FormsLayoutMatrix = () => (
  <table className="spec-table">
    <thead>
      <tr><th>Form</th><th>Layout</th><th>Submit pattern</th><th>Cancel destination</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Create</strong> (vessel, portfolio, rule)</td>
        <td>Full page, top labels, 2-col grid for paired fields</td>
        <td>Sticky footer · "Create vessel" (primary) + "Cancel" (ghost)</td>
        <td>List page the user came from</td>
      </tr>
      <tr>
        <td><strong>Edit / detail</strong></td>
        <td>Inline on detail page, edit-in-place per section</td>
        <td>Per-section "Save" (primary) + "Discard"; disabled when clean</td>
        <td>Stay on page; revert form to clean</td>
      </tr>
      <tr>
        <td><strong>Quick add</strong> (assign, tag)</td>
        <td>Side panel, inline labels, single column</td>
        <td>Footer · "Apply" (primary)</td>
        <td>Close panel</td>
      </tr>
      <tr>
        <td><strong>Multi-step</strong></td>
        <td>Centered card with stepper above</td>
        <td>"Next" / "Back" per step; "Create" on review step</td>
        <td>Exit confirmation if dirty</td>
      </tr>
      <tr>
        <td><strong>Filters / config</strong></td>
        <td>Popover or panel, inline labels</td>
        <td>"Apply" + "Reset"</td>
        <td>Close without applying</td>
      </tr>
    </tbody>
  </table>
);

const FormsDeepSection = () => (
  <>
    <div className="subsection" style={{ marginTop: 0 }}>
      <h3 className="subsection-title">Field anatomy</h3>
      <p className="subsection-desc" style={{ maxWidth: 820 }}>
        One field, five parts. The label is above; the input is the default size for its density; helper text occupies the same slot that errors will, so layout doesn't jump when validation fires.
      </p>
      <div className="panel">
        <div className="panel-body">
          <FormAnatomyDemo />
        </div>
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Field states</h3>
      <p className="subsection-desc">Every input renders in eight states. Async validation is a first-class state, never blank during a registry lookup.</p>
      <FieldStatesDemo />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Validation timing</h3>
      <p className="subsection-desc">Five triggers. Pick by the cost of being wrong and the speed of the feedback loop.</p>
      <ValidationTimingTable />
      <div className="callout warn" style={{ marginTop: 12 }}>
        <strong>Never fire errors on every keystroke.</strong> A user typing is not making a mistake; they're not done. Errors fire on blur or submit.
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Label layouts</h3>
      <p className="subsection-desc">Top labels by default; inline labels for dense surfaces (side panels, inline edits, compact rows). Never mix within the same form.</p>
      <LabelLayoutDemo />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Field grouping</h3>
      <p className="subsection-desc">
        Use semantic <code className="inline">&lt;fieldset&gt;</code> + <code className="inline">&lt;legend&gt;</code> when fields belong together: screen readers announce the group on each field, and the visual chrome reinforces it.
      </p>
      <FieldGroupDemo />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Multi-step forms</h3>
      <p className="subsection-desc">
        Stepper above the form, one step in view at a time. Steps validate independently; Next is disabled until the current step is valid. Back never validates.
      </p>
      <div className="panel">
        <div className="panel-body">
          <StepperDemo />
        </div>
      </div>
      <p className="t-caption" style={{ marginTop: 8 }}>
        Completed steps show a check glyph in success-500. The current step uses brand-600 with the step number. Future steps are muted.
      </p>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Form layouts by purpose</h3>
      <FormsLayoutMatrix />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Rules of engagement</h3>
      <FormsRules />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">React API</h3>
      <FormsApi />
    </div>

    <div className="callout">
      <strong>The principle:</strong> a form is a conversation. The user is talking; the form is listening. Don't interrupt mid-sentence (no per-keystroke errors), don't disable the submit button to make a point, and when the user makes a mistake, make the fix obvious, not a punishment.
    </div>
  </>
);

window.FormsDeepSection = FormsDeepSection;
