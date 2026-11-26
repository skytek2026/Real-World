/* Section 6: Engineering Handoff */

const HandoffSection = () => (
  <>
    <div className="subsection">
      <h3 className="subsection-title">Developer copy utilities</h3>
      <p className="subsection-desc">
        Every <code className="inline">&lt;pre class="code"&gt;</code> block and every token row in the docs is auto-decorated with a one-click copy action.
        The enhancement is non-invasive: no JSX changes required. A single <code className="inline">copy-utilities.js</code> module observes the DOM and attaches buttons.
      </p>

      <div className="grid-2" style={{ marginBottom: 16 }}>
        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-card-title">What gets copy actions</h3></div>
          <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.65 }}>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li><strong>Code blocks</strong>, top-right toolbar with language pill + Copy button, on every <code className="inline">pre.code</code></li>
              <li><strong>Token rows</strong>, hover-revealed chip beside every token name in foundations &amp; handoff tables</li>
              <li><strong>Opt-in elements</strong>, add <code className="inline">data-copy="value"</code> to any element (keyboard-activated)</li>
            </ul>
          </div>
        </div>
        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-card-title">Behavior contract</h3></div>
          <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.65 }}>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>Preserves source whitespace &amp; indentation (raw <code className="inline">textContent</code>)</li>
              <li>"Copied" state for 1.8 s, then reverts</li>
              <li>Fires polite ARIA-live announcement for screen readers</li>
              <li>Keyboard: <kbd>Tab</kbd> focus + <kbd>Enter</kbd> / <kbd>Space</kbd> to copy</li>
              <li>Falls back to <code className="inline">execCommand</code> in non-secure contexts</li>
            </ul>
          </div>
        </div>
      </div>

      <p className="t-caption" style={{ marginTop: 16, marginBottom: 4 }}>Try it: hover any token to see the chip:</p>
      <div className="panel">
        <div className="token-row" style={{ gridTemplateColumns: "200px 100px 1fr" }}>
          <code>--brand-600</code>
          <span className="t-mono" style={{ color: "var(--text-muted)" }}>#1485c5</span>
          <span className="t-caption">Primary action / key headings</span>
        </div>
        <div className="token-row" style={{ gridTemplateColumns: "200px 100px 1fr" }}>
          <code>--spacing-md</code>
          <span className="t-mono" style={{ color: "var(--text-muted)" }}>16px</span>
          <span className="t-caption">Default gap between siblings</span>
        </div>
        <div className="token-row" style={{ gridTemplateColumns: "200px 100px 1fr" }}>
          <code>--radius-lg</code>
          <span className="t-mono" style={{ color: "var(--text-muted)" }}>8px</span>
          <span className="t-caption">Cards, panels, surfaces</span>
        </div>
      </div>

      <p className="t-caption" style={{ marginTop: 16, marginBottom: 4 }}>API: opt-in copy for arbitrary nodes:</p>
      <pre className="code">{`<!-- Any element with data-copy becomes a focusable copy trigger -->
<span class="ds-badge ds-badge--info"
      data-copy="role=&quot;status&quot; aria-live=&quot;polite&quot;"
      data-copy-label="ARIA attributes">
  Copy ARIA
</span>

<!-- pre.code blocks are auto-decorated, no markup change needed -->
<pre class="code">npm install @skytek/design-system</pre>`}</pre>

      <p className="t-caption" style={{ marginTop: 16, marginBottom: 4 }}>Integration: single script, zero refactor:</p>
      <pre className="code">{`<!-- In your shell HTML, after the docs render -->
<script src="copy-utilities.js" defer></script>

/* The module:
   1. Scans the DOM on load
   2. MutationObserver picks up async-rendered React content
   3. Wraps pre.code in .ds-code-wrap, injects .ds-code-toolbar
   4. Wraps the first <code> in each .token-row with a copy chip
   5. Adds click + Enter/Space handlers for [data-copy] nodes
*/`}</pre>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Token architecture</h3>
      <p className="subsection-desc">Three layers. Primitive tokens hold raw values; semantic tokens give them roles; component tokens reference semantic tokens. Engineers consume only semantic and component tokens.</p>
      <div className="grid-3">
        {[
          ["1 · Primitive","Raw scales. Never used in components directly.", `--brand-600: #0F4C75
--slate-100: #F3F4F6
--space-5: 16px
--radius-md: 6px`],
          ["2 · Semantic","Role-based aliases. The vocabulary engineers reach for.", `--bg-surface: var(--white)
--text-primary: var(--slate-900)
--border-default: var(--slate-200)
--shadow-md: …`],
          ["3 · Component","Per-component knobs that wire semantic tokens.", `--btn-primary-bg: var(--brand-600)
--btn-primary-fg: var(--white)
--input-border: var(--border-default)`],
        ].map(([t,d,c],i)=>(
          <div key={i} className="ds-card">
            <div className="ds-card-head"><h3 className="ds-card-title">{t}</h3></div>
            <div className="ds-card-body">
              <p className="t-caption" style={{ marginTop: 0 }}>{d}</p>
              <pre className="code" style={{ marginTop: 8 }}>{c}</pre>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">CSS variable strategy</h3>
      <p className="subsection-desc">Tokens are CSS custom properties on <code className="inline">:root</code>, lowercase kebab-case. They live in <code className="inline">src/app/styles/tokens.css</code> and are imported once at the app root.</p>
      <pre className="code">{`/* src/app/styles/tokens.css */
:root {
  /* primitives */
  --brand-600: #0F4C75;
  --slate-200: #E5E7EB;
  --space-5: 16px;
  --radius-md: 6px;
  /* semantics */
  --bg-surface: #FFFFFF;
  --text-primary: var(--slate-900);
  --border-default: var(--slate-200);
}`}</pre>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Tailwind mapping</h3>
      <p className="subsection-desc">Replace <code className="inline">tailwind.config.js</code>'s ad-hoc <code className="inline">react-dark-blue</code> palette with semantic classes that resolve to tokens. Engineers use <code className="inline">bg-surface</code>, <code className="inline">text-primary</code>, <code className="inline">border-default</code>, never raw colors.</p>
      <pre className="code">{`// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        brand: { 50:'var(--brand-050)', 100:'var(--brand-100)', 300:'var(--brand-300)',
                 400:'var(--brand-400)', 500:'var(--brand-500)', 600:'var(--brand-600)' },
        surface: 'var(--bg-surface)',
        canvas:  'var(--bg-canvas)',
        sunken:  'var(--bg-sunken)',
        muted:   'var(--bg-muted)',
        // status
        success: { 100:'var(--success-100)', 500:'var(--success-500)', 700:'var(--success-700)' },
        warning: { 100:'var(--warning-100)', 500:'var(--warning-500)', 700:'var(--warning-700)' },
        danger:  { 100:'var(--danger-100)',  500:'var(--danger-500)',  700:'var(--danger-700)' },
        info:    { 100:'var(--info-100)',    500:'var(--info-500)',    700:'var(--info-700)' },
        // text
        ink: { primary:'var(--text-primary)', secondary:'var(--text-secondary)',
               muted:'var(--text-muted)', disabled:'var(--text-disabled)' },
        line: { subtle:'var(--border-subtle)', DEFAULT:'var(--border-default)', strong:'var(--border-strong)' },
      },
      spacing:    Object.fromEntries(Array.from({length:17},(_,i)=>[i,\`var(--space-\${i})\`])),
      borderRadius:{ xs:'var(--radius-xs)', sm:'var(--radius-sm)', md:'var(--radius-md)',
                     lg:'var(--radius-lg)', xl:'var(--radius-xl)', full:'9999px' },
      boxShadow:  { xs:'var(--shadow-xs)', sm:'var(--shadow-sm)', md:'var(--shadow-md)',
                    lg:'var(--shadow-lg)', xl:'var(--shadow-xl)' },
      fontFamily: { sans:['Inter','system-ui','sans-serif'], mono:['JetBrains Mono','ui-monospace'] },
    },
  },
};`}</pre>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Component naming conventions</h3>
      <table className="spec-table">
        <thead><tr><th>Concept</th><th>Convention</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>Component file</td><td>PascalCase folder + same-name component</td><td><code>app/ui/Button/Button.tsx</code></td></tr>
          <tr><td>Component variants</td><td><code>cva</code> with <code>variant</code>, <code>size</code>, <code>tone</code> props</td><td><code>{`<Button variant="primary" size="md" />`}</code></td></tr>
          <tr><td>Compound components</td><td>Dot-namespace</td><td><code>Card.Header</code>, <code>Form.Field</code>, <code>Table.Row</code></td></tr>
          <tr><td>Data attributes</td><td><code>data-slot</code> for shadcn-style internal slots</td><td><code>data-slot="card-title"</code></td></tr>
          <tr><td>Hooks</td><td><code>use&lt;Capability&gt;</code></td><td><code>useFormField()</code>, <code>useToast()</code></td></tr>
          <tr><td>Storybook</td><td><code>Design System / &lt;Component&gt;</code></td><td>Already in place: keep.</td></tr>
        </tbody>
      </table>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Migration plan</h3>
      <p className="subsection-desc">Five-phase rollout. Each phase lands behind no flag; the system is additive. Old code keeps working until each module is touched.</p>
      <div className="panel">
        {[
          ["Phase 1 · Tokens land","Week 1","Add tokens.css, update tailwind.config.js, ship a compat shim that maps react-dark-blue → --brand-600. Zero visual change.","No regressions"],
          ["Phase 2 · Component standardization","Weeks 2–3","Lock app/ui as canonical. Mark common/components/* as deprecated. Build missing primitives (Toast, Dropdown, Skeleton).","All new code uses app/ui"],
          ["Phase 3 · Surface migration","Weeks 4–7","Migrate the 4 representative surfaces (dashboard, vessels list, vessel detail, add-policy). Use as reference.","Surfaces match the spec"],
          ["Phase 4 · Module sweep","Weeks 8–12","Module-by-module: portfolio, region, aviation, offshore, GSIN, reports. One PR per module. Codemod for raw hex → token.","≤ 5 raw hex left in repo"],
          ["Phase 5 · Cleanup","Week 13","Delete common/components/*. Remove styled-components dependency. Snapshot Storybook for visual regression.","Bundle size −18%"],
        ].map(([t,w,b,o],i)=>(
          <div key={i} className="token-row" style={{ gridTemplateColumns: "200px 90px 1fr 220px" }}>
            <div><strong style={{ fontSize: 13 }}>{t}</strong></div>
            <div className="t-caption">{w}</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{b}</div>
            <div className="t-caption" style={{ color: "var(--success-700)" }}>✓ {o}</div>
          </div>
        ))}
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Standardize first / refactor later</h3>
      <div className="grid-2">
        <div className="ds-card">
          <div className="ds-card-head" style={{ background: "var(--success-050)" }}><h3 className="ds-card-title" style={{ color: "var(--success-700)" }}>First (high ROI, low risk)</h3></div>
          <div className="ds-card-body">
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
              <li>Color &amp; spacing tokens: affect everything, zero behavior change.</li>
              <li>Button (consolidate <code>common/button</code> + <code>app/ui/Button</code>).</li>
              <li>Input / Select / FormField, the cause of most inconsistency reports.</li>
              <li>Table: collapse 4 implementations to 1.</li>
              <li>Page header pattern: visible quick win on every page.</li>
            </ul>
          </div>
        </div>
        <div className="ds-card">
          <div className="ds-card-head" style={{ background: "var(--warning-050)" }}><h3 className="ds-card-title" style={{ color: "var(--warning-700)" }}>Later (slower, scoped)</h3></div>
          <div className="ds-card-body">
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
              <li>Highcharts theme: wrap charts to consume tokens.</li>
              <li>Leaflet map controls: match Button system.</li>
              <li>DataTable virtualization &amp; column-resize ergonomics.</li>
              <li>Removing styled-components entirely (after module sweep).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Linting &amp; guardrails</h3>
      <pre className="code">{`// .eslintrc: forbid raw hex in JSX/CSS-in-JS
"no-restricted-syntax": ["error",
  { selector: "Literal[value=/^#[0-9a-fA-F]{3,8}$/]",
    message: "Use a design token (var(--…)) instead of a raw hex color." }
]

// stylelint-no-restricted-values for CSS files
"declaration-property-value-disallowed-list": {
  "/.*/": ["/^#[0-9a-fA-F]+$/"]
}`}</pre>
      <p className="t-caption" style={{ marginTop: 8 }}>Run as warning for one sprint, then upgrade to error. Codemods take care of the long tail.</p>
    </div>

    <div className="callout" style={{ marginTop: 32 }}>
      <strong>Single source of truth:</strong> <code className="inline">src/app/styles/tokens.css</code> is the only place values live. Storybook reads from it. The product reads from it. This document is generated from it. If a value is not in tokens.css, it does not exist in the system.
    </div>
  </>
);

window.HandoffSection = HandoffSection;
