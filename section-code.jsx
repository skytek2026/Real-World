/* Section 17: Developer · Code view
   Lets developers browse the source behind this spec page and copy the
   design tokens as CSS. Reads the page's own files at runtime (same origin),
   so it always shows exactly what the page is running. */

const CODE_FILES = [
  { group: "Page", files: [
    { path: "__PAGE__", label: "Spec page (HTML)", lang: "xml", note: "Entry point: loads styles, libraries and every section below." },
  ]},
  { group: "Styles", files: [
    { path: "styles.css", lang: "css", note: "All design tokens (:root) and component CSS." },
    { path: "components/rw-modal.css", lang: "css", note: "Modal component, fully tokenised with --rw-modal-* variables." },
  ]},
  { group: "Components (vanilla JS)", files: [
    { path: "components/rw-modal.js", lang: "javascript", note: "Framework-agnostic modal: RWModal.open / confirm / mount / parts." },
    { path: "components/rw-modal-demos.js", lang: "javascript", note: "Demos used in the Modal chapter." },
    { path: "copy-utilities.js", lang: "javascript", note: "Copy buttons on code blocks and token rows." },
  ]},
  { group: "Spec sections (React JSX)", files: [
    "icons.jsx", "section-foundations-meta.jsx", "section-foundations.jsx", "section-elevation.jsx",
    "section-elevation-usage.jsx", "section-foundations2.jsx", "section-token-index.jsx",
    "section-buttons-deep.jsx", "section-forms-deep.jsx", "section-datetime.jsx", "section-modal.jsx",
    "section-toast.jsx", "section-tooltips.jsx", "section-popover.jsx", "section-filterdrawer.jsx",
    "section-components.jsx", "section-layout-interaction-a11y.jsx", "section-states.jsx",
    "section-data-primitives.jsx", "section-event-log.jsx", "section-voice.jsx", "section-apply.jsx",
    "section-domain.jsx", "section-asset-identity.jsx", "charts-lib.jsx", "section-charts.jsx",
    "section-handoff.jsx", "section-export.jsx", "section-code.jsx",
  ].map(p => ({ path: p, lang: "javascript" }))},
  { group: "Data", files: [
    { path: "changelog-data.js", lang: "javascript", note: "Living changelog entries (newest first)." },
  ]},
];

const CV_COPY_ICON = ["M9 9h11v11H9z", "M5 15H4V4h11v1"];
const CV_LONG_LINE = 1500;     // lines longer than this are folded in the viewer (embedded fonts)
const CV_HL_LIMIT  = 160000;   // skip syntax highlighting above this size

/* Resolve which file is the page itself (index.html in the preview,
   "Skytek Design System.html" in the design system's source). */
async function cvResolvePage() {
  const here = decodeURIComponent((location.pathname.split("/").pop() || "").trim());
  const candidates = [here, "index.html", "Skytek Design System.html"].filter(p => p && /\.html?$/i.test(p));
  for (const p of candidates) {
    try {
      const r = await fetch(encodeURI(p), { cache: "no-store" });
      if (r.ok) {
        const t = await r.text();
        if (t.indexOf("section-foundations.jsx") !== -1) return { path: p, text: t };
      }
    } catch (e) {}
  }
  return null;
}

const cvFileCache = {};
async function cvLoad(path) {
  if (cvFileCache[path]) return cvFileCache[path];
  let res;
  // Built previews embed every source (window.__dsSources), so the Code view never reads stale side files.
  const emb = window.__dsSources;
  if (emb && path === "__PAGE__" && emb["Skytek Design System.html"] != null) { res = { path: "Skytek Design System.html", text: emb["Skytek Design System.html"] }; cvFileCache[path] = res; return res; }
  if (emb && emb[path] != null) { res = { path, text: emb[path] }; cvFileCache[path] = res; return res; }
  if (path === "__PAGE__") {
    const page = await cvResolvePage();
    if (!page) throw new Error("Couldn't load the page source.");
    res = page;
  } else {
    const r = await fetch(encodeURI(path), { cache: "no-store" });
    if (!r.ok) throw new Error(`${path} returned ${r.status}`);
    res = { path, text: await r.text() };
  }
  cvFileCache[path] = res;
  return res;
}

const cvEscape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* Fold very long lines (base64 fonts) for display only. Copy keeps the full text. */
function cvDisplayText(text) {
  return text.split("\n").map(line => line.length > CV_LONG_LINE
    ? line.slice(0, 120) + ` … [${(line.length - 120).toLocaleString()} more characters hidden: embedded data] …`
    : line).join("\n");
}

async function cvCopy(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
  } catch (e) {}
  try {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch (e) { return false; }
}

const CopyButton = ({ getText, label = "Copy", size = "sm" }) => {
  const [state, setState] = React.useState("idle");
  const onClick = async () => {
    const ok = await cvCopy(typeof getText === "function" ? getText() : getText);
    setState(ok ? "done" : "fail");
    setTimeout(() => setState("idle"), 1600);
  };
  return (
    <button type="button" className={`ds-btn ds-btn--secondary ds-btn--${size}`} onClick={onClick} aria-live="polite">
      <Icon d={state === "done" ? I.check : CV_COPY_ICON} size={14} />
      {state === "done" ? "Copied" : state === "fail" ? "Copy failed" : label}
    </button>
  );
};

const fmtBytes = (n) => n < 1024 ? `${n} B` : `${(n / 1024).toFixed(n < 10240 ? 1 : 0)} KB`;

/* ── Source browser ─────────────────────────────────────────────── */
const SourceBrowser = () => {
  const all = React.useMemo(() => CODE_FILES.flatMap(g => g.files.map(f => ({ ...f, group: g.group }))), []);
  const [sel, setSel] = React.useState(all[1].path);     // styles.css first: most useful to devs
  const [q, setQ] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [err, setErr] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const codeRef = React.useRef(null);

  React.useEffect(() => {
    let live = true;
    setLoading(true); setErr(null);
    cvLoad(sel).then(f => { if (live) { setFile(f); setLoading(false); } })
               .catch(e => { if (live) { setErr(e.message); setFile(null); setLoading(false); } });
    return () => { live = false; };
  }, [sel]);

  React.useEffect(() => {
    const el = codeRef.current;
    if (!el || !file) return;
    const meta = all.find(f => f.path === sel) || {};
    const shown = cvDisplayText(file.text);
    if (window.hljs && file.text.length <= CV_HL_LIMIT) {
      try {
        el.innerHTML = window.hljs.highlight(shown, { language: meta.lang || "plaintext", ignoreIllegals: true }).value;
        return;
      } catch (e) {}
    }
    el.innerHTML = cvEscape(shown);
  }, [file, sel]);

  const meta = all.find(f => f.path === sel) || {};
  const shownName = sel === "__PAGE__" ? (file ? file.path : "page") : sel;
  const lines = file ? file.text.split("\n").length : 0;
  const filtered = q.trim()
    ? all.filter(f => (f.label || f.path).toLowerCase().includes(q.trim().toLowerCase()))
    : all;
  const groups = CODE_FILES.map(g => ({ group: g.group, files: filtered.filter(f => f.group === g.group) })).filter(g => g.files.length);

  return (
    <div className="cv-browser panel">
      <aside className="cv-files" aria-label="Source files">
        <div className="ds-search-input cv-search">
          <span className="cv-search-icon"><Icon d={I.search} size={14} /></span>
          <input type="search" placeholder="Filter files" value={q} onChange={e => setQ(e.target.value)} aria-label="Filter files" />
        </div>
        <div className="cv-file-list">
          {groups.map(g => (
            <div key={g.group}>
              <div className="cv-group">{g.group}</div>
              {g.files.map(f => (
                <button key={f.path} type="button"
                  className={`cv-file ${sel === f.path ? "is-active" : ""}`}
                  aria-current={sel === f.path ? "true" : undefined}
                  onClick={() => setSel(f.path)}>
                  {f.label || f.path}
                </button>
              ))}
            </div>
          ))}
          {!groups.length && <div className="t-caption" style={{ padding: "8px 12px" }}>No files match “{q}”.</div>}
        </div>
      </aside>
      <div className="cv-viewer">
        <div className="cv-toolbar">
          <div style={{ minWidth: 0 }}>
            <div className="cv-filename">{shownName}</div>
            <div className="t-caption">
              {file ? `${lines.toLocaleString()} lines · ${fmtBytes(new Blob([file.text]).size)}` : loading ? "Loading…" : ""}
              {meta.note ? ` · ${meta.note}` : ""}
            </div>
          </div>
          <div className="cv-actions">
            {file && <CopyButton getText={() => file.text} label="Copy file" />}
            {file && <a className="ds-btn ds-btn--ghost ds-btn--sm" href={encodeURI(file.path)} target="_blank" rel="noopener">Open raw</a>}
          </div>
        </div>
        {err
          ? <div className="ds-alert ds-alert--danger" style={{ margin: 16 }}><div className="ds-alert-body">{err}</div></div>
          : <pre className="cv-code" tabIndex={0} aria-label={`Source of ${shownName}`}><code ref={codeRef} className="hljs" /></pre>}
      </div>
    </div>
  );
};

/* ── Tokens as CSS ──────────────────────────────────────────────── */
function cvParseBlock(css, selectorRe) {
  const m = css.match(selectorRe);
  if (!m) return { body: "", tokens: [] };
  let i = m.index + m[0].length, depth = 1;
  const start = i;
  while (i < css.length && depth) { if (css[i] === "{") depth++; else if (css[i] === "}") depth--; i++; }
  const body = css.slice(start, i - 1);
  const tokens = [];
  let group = "General";
  body.split("\n").forEach(line => {
    const g = line.match(/^\s*\/\*\s*[—\-–\s]*([^*]+?)[—\-–\s]*\*\/\s*$/);
    if (g) { group = g[1].trim(); return; }
    const t = line.match(/^\s*(--[A-Za-z0-9_-]+)\s*:\s*([^;]+);\s*(?:\/\*\s*(.*?)\s*\*\/)?/);
    if (t) tokens.push({ name: t[1], value: t[2].trim(), note: t[3] || "", group });
  });
  return { body, tokens };
}

const isColor = (v) => /^(#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(|oklch\(|color-mix\()/i.test(v.trim());

const TokensCss = () => {
  const [data, setData] = React.useState(null);
  const [err, setErr] = React.useState(null);
  const [q, setQ] = React.useState("");

  React.useEffect(() => {
    cvLoad("styles.css").then(f => {
      const root = cvParseBlock(f.text, /:root\s*\{/);
      setData({ root });
    }).catch(e => setErr(e.message));
  }, []);

  if (err) return <div className="ds-alert ds-alert--danger"><div className="ds-alert-body">{err}</div></div>;
  if (!data) return <div className="t-caption">Loading tokens…</div>;

  const rootCss = `:root {${data.root.body}}`;
  const qq = q.trim().toLowerCase();
  const rows = data.root.tokens.filter(t => !qq || t.name.toLowerCase().includes(qq) || t.value.toLowerCase().includes(qq) || t.group.toLowerCase().includes(qq));
  const grouped = [];
  rows.forEach(t => {
    const last = grouped[grouped.length - 1];
    if (last && last.group === t.group) last.items.push(t); else grouped.push({ group: t.group, items: [t] });
  });

  return (
    <>
      <div className="cv-token-actions">
        <div className="ds-search-input cv-search" style={{ maxWidth: 320 }}>
          <span className="cv-search-icon"><Icon d={I.search} size={14} /></span>
          <input type="search" placeholder="Filter tokens, e.g. brand, radius, #1485c5" value={q} onChange={e => setQ(e.target.value)} aria-label="Filter tokens" />
        </div>
        <div className="cv-actions">
          <CopyButton getText={rootCss} label="Copy :root tokens" />
        </div>
      </div>
      <p className="t-caption" style={{ margin: "0 0 12px" }}>
        {data.root.tokens.length} tokens in <code className="inline">:root</code>. Read live from <code className="inline">styles.css</code>, so this always matches what the page uses. Click a token name to copy <code className="inline">var(--name)</code>.
      </p>
      <div className="panel cv-tokens">
        <div className="token-row cv-token-row cv-token-head">
          <span className="t-label">Token</span><span className="t-label">Value</span><span className="t-label">Note</span>
        </div>
        {grouped.map(g => (
          <React.Fragment key={g.group + g.items[0].name}>
            <div className="cv-token-group">{g.group}</div>
            {g.items.map(t => {
              return (
                <div key={t.name} className="token-row cv-token-row">
                  <button type="button" className="cv-token-name" title={`Copy var(${t.name})`} onClick={() => cvCopy(`var(${t.name})`)}>
                    <code>{t.name}</code>
                  </button>
                  <span className="cv-val">{isColor(t.value) && <span className="swatch-mini" style={{ background: t.value }} />}<span className="t-mono">{t.value}</span></span>
                  <span className="t-caption">{t.note}</span>
                </div>
              );
            })}
          </React.Fragment>
        ))}
        {!grouped.length && <div className="t-caption" style={{ padding: 16 }}>No tokens match “{q}”.</div>}
      </div>
    </>
  );
};

/* ── Section ────────────────────────────────────────────────────── */
const CodeViewSection = () => {
  const [tab, setTab] = React.useState("source");
  const tabs = [["source", "Source files"], ["tokens", "Tokens as CSS"]];
  return (
    <>
      <div className="ds-tabs" role="tablist" aria-label="Code view" style={{ marginBottom: 16 }}>
        {tabs.map(([id, label]) => (
          <button key={id} type="button" role="tab" className="ds-tab" aria-selected={tab === id} onClick={() => setTab(id)}>
            {tab === id && <span className="ds-tab-pill" />}
            <span className="ds-tab-label">{label}</span>
          </button>
        ))}
      </div>
      {tab === "source" ? <SourceBrowser /> : <TokensCss />}
    </>
  );
};

/* Scoped styles: built only from the system's own tokens. */
(function injectCodeViewStyles() {
  if (document.getElementById("cv-styles")) return;
  const s = document.createElement("style");
  s.id = "cv-styles";
  s.textContent = `
    .cv-browser { display: grid; grid-template-columns: 260px minmax(0, 1fr); min-height: 560px; height: 72vh; overflow: hidden; padding: 0; }
    .cv-files { border-right: 1px solid var(--border-subtle); display: flex; flex-direction: column; min-height: 0; background: var(--bg-sunken); }
    .cv-search { max-width: none; min-width: 0; margin: 12px; flex: none; }
    .cv-search-icon { position: absolute; left: 9px; top: 50%; transform: translateY(-50%); color: var(--text-muted); display: inline-flex; pointer-events: none; }
    .cv-file-list { overflow-y: auto; padding: 0 8px 12px; min-height: 0; }
    .cv-group { font-size: 11px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; color: var(--text-muted); padding: 12px 8px 4px; }
    .cv-file { display: block; width: 100%; text-align: left; font: inherit; font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary);
               background: transparent; border: 0; border-radius: var(--radius-sm); padding: 8px 8px; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .cv-file:hover { background: var(--bg-muted); color: var(--text-primary); }
    .cv-file.is-active { background: var(--brand-050); color: var(--brand-700); font-weight: 600; }
    .cv-file:focus-visible, .cv-token-name:focus-visible { outline: 2px solid var(--brand-400); outline-offset: 1px; }
    .cv-viewer { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
    .cv-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--border-subtle); }
    .cv-filename { font-family: var(--font-mono); font-size: 13px; font-weight: 600; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .cv-actions { display: flex; gap: 8px; flex-wrap: wrap; flex: none; }
    .cv-code { margin: 0; flex: 1; overflow: auto; min-height: 0; font-family: var(--font-mono); font-size: 12px; line-height: 1.55;
               background: var(--slate-950); color: #E5E7EB; padding: 16px; }
    .cv-code:focus-visible { outline: 2px solid var(--brand-400); outline-offset: -2px; }
    .cv-search input { padding-left: 32px !important; }
    .cv-code code { white-space: pre; display: block; }
    .cv-token-actions { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; }
    .cv-token-actions .cv-search { margin: 0; }
    .cv-token-row { grid-template-columns: minmax(180px, 1.1fr) minmax(140px, 1fr) minmax(0, 1.6fr); align-items: center; }
    .cv-token-head { background: var(--bg-sunken); }
    .cv-token-head .t-label { color: var(--text-muted); }
    .cv-token-group { padding: 12px 16px 8px; font-size: 11px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; color: var(--text-muted); background: var(--bg-sunken); border-top: 1px solid var(--border-subtle); }
    .cv-token-name { background: none; border: 0; padding: 0; text-align: left; cursor: pointer; font: inherit; min-width: 0; }
    .cv-token-name:hover code { color: var(--brand-600); }
    .cv-val { display: flex; align-items: center; gap: 8px; min-width: 0; }
    .cv-val .t-mono { font-size: 11px; color: var(--text-secondary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .cv-val .swatch-mini { flex-shrink: 0; }
    /* Syntax colours, matching the spec's existing pre.code palette */
    .cv-code .hljs-keyword, .cv-code .hljs-selector-tag, .cv-code .hljs-built_in, .cv-code .hljs-tag .hljs-name { color: #93C5FD; }
    .cv-code .hljs-string, .cv-code .hljs-attr, .cv-code .hljs-selector-class, .cv-code .hljs-selector-id { color: #BEF264; }
    .cv-code .hljs-comment { color: #94A3B8; font-style: italic; }
    .cv-code .hljs-number, .cv-code .hljs-literal, .cv-code .hljs-variable, .cv-code .hljs-attribute { color: #FDA4AF; }
    .cv-code .hljs-title, .cv-code .hljs-property { color: #FDE68A; }
    @media (max-width: 860px) {
      .cv-browser { grid-template-columns: minmax(0, 1fr); height: auto; }
      .cv-toolbar { flex-direction: column; align-items: stretch; }
      .cv-token-actions .cv-search { max-width: none !important; width: 100%; }
      .cv-files { border-right: 0; border-bottom: 1px solid var(--border-subtle); max-height: 240px; }
      .cv-code { max-height: 70vh; }
      .cv-token-row { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
      .cv-token-row > :nth-child(3), .cv-token-row > :nth-child(4) { display: none; }
    }
  `;
  document.head.appendChild(s);
})();

window.CodeViewSection = CodeViewSection;
