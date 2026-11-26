/* ============================================================
   Copy Utilities: zero-touch enhancement layer
   ------------------------------------------------------------
   Auto-decorates existing primitives with copy actions:
     • <pre class="code">     → toolbar with Copy + format switcher
     • .token-row <code>      → inline copy chip on hover
     • [data-copy]            → explicit opt-in for any element
   No JSX changes required. Uses MutationObserver so it works
   with the async React render.
   ============================================================ */
(function () {
  "use strict";

  const COPIED_MS = 1800;

  /* -------- clipboard with fallback -------- */
  async function writeClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) { /* fall through */ }
    // Fallback for non-secure contexts / older browsers
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (_) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  /* -------- ARIA live region for screen-reader feedback -------- */
  let liveRegion;
  function announce(msg) {
    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.setAttribute("role", "status");
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.className = "sr-only";
      document.body.appendChild(liveRegion);
    }
    liveRegion.textContent = "";
    // Re-set on next tick so SRs re-announce identical messages
    setTimeout(() => { liveRegion.textContent = msg; }, 30);
  }

  /* -------- icons (inline SVG strings) -------- */
  const ICON_COPY  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>`;
  const ICON_CHECK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;

  /* -------- flash a button into "copied" state -------- */
  function flashCopied(btn, label) {
    btn.classList.add("is-copied");
    const orig = btn.dataset.origHtml || btn.innerHTML;
    if (!btn.dataset.origHtml) btn.dataset.origHtml = orig;
    btn.innerHTML = `${ICON_CHECK}<span>Copied</span>`;
    btn.setAttribute("aria-label", `${label} copied to clipboard`);
    clearTimeout(btn._copyTimer);
    btn._copyTimer = setTimeout(() => {
      btn.classList.remove("is-copied");
      btn.innerHTML = btn.dataset.origHtml;
      btn.removeAttribute("aria-label");
    }, COPIED_MS);
  }

  /* -------- detect code language from content -------- */
  function detectLang(text) {
    if (/^\s*\/\*|--[a-z-]+\s*:|@(media|font-face|keyframes)/i.test(text)) return "css";
    if (/^\s*(import|export|const|function|=>|<[A-Z])/m.test(text)) return "tsx";
    if (/^\s*</.test(text)) return "html";
    return "code";
  }

  const COPY_LABEL_BY_LANG = { css: "Copy CSS", tsx: "Copy code", html: "Copy HTML", code: "Copy" };

  /* -------- enhance a <pre class="code"> block -------- */
  function enhanceCodeBlock(pre) {
    if (pre.dataset.copyEnhanced) return;
    pre.dataset.copyEnhanced = "1";

    const raw = pre.textContent || "";
    const lang = detectLang(raw);
    const label = COPY_LABEL_BY_LANG[lang] || "Copy";

    // Wrap pre in a positioned container so toolbar can be absolute
    const wrap = document.createElement("div");
    wrap.className = "ds-code-wrap";
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);

    const toolbar = document.createElement("div");
    toolbar.className = "ds-code-toolbar";
    toolbar.innerHTML = `
      <span class="ds-code-lang" aria-hidden="true">${lang}</span>
      <button type="button" class="ds-copy-btn" data-copy-code aria-label="${label}">
        ${ICON_COPY}<span>${label}</span>
      </button>
    `;
    wrap.appendChild(toolbar);

    toolbar.querySelector("[data-copy-code]").addEventListener("click", async (e) => {
      const btn = e.currentTarget;
      const ok = await writeClipboard(raw.replace(/\n+$/, ""));
      if (ok) {
        flashCopied(btn, label);
        announce(`${label}: copied to clipboard`);
      }
    });
  }

  /* -------- enhance a token-row <code> element -------- */
  function enhanceTokenCode(codeEl) {
    if (codeEl.dataset.copyEnhanced) return;
    // only the FIRST <code> child of a token-row: the token name
    const row = codeEl.closest(".token-row");
    if (!row) return;
    if (row.querySelector("code") !== codeEl) return;
    codeEl.dataset.copyEnhanced = "1";

    // Wrap the code in an inline-flex container so we can absolutely place a chip
    const wrap = document.createElement("span");
    wrap.className = "ds-token-copy-wrap";
    codeEl.parentNode.insertBefore(wrap, codeEl);
    wrap.appendChild(codeEl);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ds-token-copy-chip";
    btn.setAttribute("aria-label", `Copy token ${codeEl.textContent.trim()}`);
    btn.innerHTML = ICON_COPY;
    wrap.appendChild(btn);

    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const token = codeEl.textContent.trim();
      const ok = await writeClipboard(token);
      if (ok) {
        flashCopied(btn, `Token ${token}`);
        announce(`${token} copied`);
      }
    });
  }

  /* -------- enhance explicit [data-copy] opt-ins -------- */
  function enhanceDataCopy(el) {
    if (el.dataset.copyEnhanced) return;
    el.dataset.copyEnhanced = "1";
    el.addEventListener("click", async () => {
      const val = el.getAttribute("data-copy");
      const ok = await writeClipboard(val);
      if (ok) {
        flashCopied(el, el.getAttribute("data-copy-label") || "Value");
        announce(`${val} copied`);
      }
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        el.click();
      }
    });
    if (!el.hasAttribute("tabindex") && el.tagName !== "BUTTON") el.setAttribute("tabindex", "0");
    if (!el.hasAttribute("role") && el.tagName !== "BUTTON") el.setAttribute("role", "button");
  }

  /* -------- collect DS class names used inside a node -------- */
  function collectClasses(root) {
    const out = new Set();
    root.querySelectorAll("[class]").forEach((el) => {
      el.classList.forEach((c) => {
        if (/^(ds-|t-|panel|swatch|token-row|grid-|row|col|callout|surface|spec-)/.test(c)) {
          out.add(c);
        }
      });
    });
    return out;
  }

  /* -------- extract CSS rules from the stylesheet matching any of the given classes -------- */
  function extractCss(classes) {
    const wanted = Array.from(classes);
    const lines = [];
    const seen = new Set();
    for (const sheet of Array.from(document.styleSheets)) {
      let rules;
      try { rules = sheet.cssRules; } catch (_) { continue; } // cross-origin guard
      if (!rules) continue;
      for (const rule of Array.from(rules)) {
        if (!rule.selectorText || !rule.cssText) continue;
        // match if selector mentions any of our classes
        const sel = rule.selectorText;
        const hit = wanted.some((c) => sel.indexOf("." + c) !== -1);
        if (hit && !seen.has(rule.cssText)) {
          seen.add(rule.cssText);
          lines.push(rule.cssText);
        }
      }
    }
    return lines.join("\n\n");
  }

  /* -------- collect token names referenced inside a node (from inline class="inline" code + class names) -------- */
  function collectTokens(root) {
    const tokens = new Set();
    // Explicit code.inline references
    root.querySelectorAll("code.inline, code").forEach((c) => {
      const t = (c.textContent || "").trim();
      if (/^--[a-z][a-z0-9-]+$/i.test(t)) tokens.add(t);
    });
    // From class names: ds-btn--primary → references --brand-600 etc.
    // We resolve indirectly: serialize matching CSS, then regex out --vars
    const classes = collectClasses(root);
    const css = extractCss(classes);
    const re = /var\((--[a-z0-9-]+)/gi;
    let m;
    while ((m = re.exec(css)) !== null) tokens.add(m[1]);
    return tokens;
  }

  /* -------- resolve a token to its computed value from :root -------- */
  function resolveToken(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  /* -------- serialize the rendered preview as static HTML -------- */
  function serializePreview(body) {
    // Strip React-injected attributes that aren't useful in copied output
    const clone = body.cloneNode(true);
    clone.querySelectorAll("*").forEach((el) => {
      [...el.attributes].forEach((a) => {
        if (/^(data-react|data-reactroot|data-cc-id|data-dm-ref|data-copy-enhanced)/.test(a.name)) {
          el.removeAttribute(a.name);
        }
      });
      // Drop the injected toolbars/wraps we added
      if (el.classList && (el.classList.contains("ds-code-toolbar") || el.classList.contains("ds-token-copy-chip") || el.classList.contains("ds-panel-copy-toolbar"))) {
        el.remove();
      }
    });
    // Unwrap our injected wrappers
    clone.querySelectorAll(".ds-code-wrap").forEach((w) => {
      const pre = w.querySelector("pre.code");
      if (pre) w.replaceWith(pre);
    });
    clone.querySelectorAll(".ds-token-copy-wrap").forEach((w) => {
      const code = w.querySelector("code");
      if (code) w.replaceWith(code);
    });
    // Pretty-print: 2-space indented
    return formatHtml(clone.innerHTML);
  }

  function formatHtml(html) {
    // very lightweight pretty-printer
    const VOID = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);
    let out = "", indent = 0;
    const tokens = html.replace(/>\s+</g, "><").split(/(<[^>]+>)/g).filter(Boolean);
    for (const t of tokens) {
      if (t.startsWith("</")) {
        indent = Math.max(indent - 1, 0);
        out += "  ".repeat(indent) + t + "\n";
      } else if (t.startsWith("<") && !t.startsWith("<!") ) {
        const tag = t.match(/^<\s*([a-z0-9-]+)/i);
        const selfClose = t.endsWith("/>") || (tag && VOID.has(tag[1].toLowerCase()));
        out += "  ".repeat(indent) + t + "\n";
        if (!selfClose) indent += 1;
      } else {
        const txt = t.trim();
        if (txt) out += "  ".repeat(indent) + txt + "\n";
      }
    }
    return out.trim();
  }

  /* -------- enhance a ComponentBlock panel-head with Copy Code / CSS / Tokens -------- */
  function enhanceComponentPanel(panel) {
    if (panel.dataset.copyEnhanced) return;
    const head = panel.querySelector(":scope > .panel-head");
    const body = panel.querySelector(":scope > .panel-body");
    if (!head || !body) return;
    // Only attach to ComponentBlock-style panels; those inside .subsection
    if (!panel.closest(".subsection")) return;
    // Skip if this panel only contains a single pre.code (it already has its own toolbar)
    if (body.querySelector(":scope > pre.code") && body.children.length === 1) return;

    panel.dataset.copyEnhanced = "1";

    const tokens = collectTokens(body);
    const classes = collectClasses(body);

    const toolbar = document.createElement("div");
    toolbar.className = "ds-panel-copy-toolbar";
    toolbar.setAttribute("role", "group");
    toolbar.setAttribute("aria-label", "Copy implementation");

    const mkBtn = (label, action, ariaLabel) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ds-panel-copy-btn";
      b.setAttribute("aria-label", ariaLabel || label);
      b.innerHTML = `${ICON_COPY}<span>${label}</span>`;
      b.addEventListener("click", async () => {
        const text = action();
        if (!text) {
          announce("Nothing to copy");
          return;
        }
        const ok = await writeClipboard(text);
        if (ok) {
          flashCopied(b, label);
          announce(`${label}: copied to clipboard`);
        }
      });
      return b;
    };

    toolbar.appendChild(mkBtn("Copy code", () => serializePreview(body), "Copy markup for this component"));
    toolbar.appendChild(mkBtn("Copy CSS", () => extractCss(classes), "Copy CSS rules for this component"));
    if (tokens.size > 0) {
      const label = `Copy tokens (${tokens.size})`;
      toolbar.appendChild(mkBtn(label, () => {
        return Array.from(tokens)
          .sort()
          .map((t) => `${t}: ${resolveToken(t)};`)
          .join("\n");
      }, "Copy design tokens used by this component"));
    }

    // Hide the existing "all states · all variants" meta on small screens to make room
    head.appendChild(toolbar);
  }

  /* -------- scan a subtree -------- */
  function scan(root) {
    root.querySelectorAll("pre.code").forEach(enhanceCodeBlock);
    root.querySelectorAll(".token-row > code").forEach(enhanceTokenCode);
    root.querySelectorAll("[data-copy]").forEach(enhanceDataCopy);
    root.querySelectorAll(".subsection > .panel").forEach(enhanceComponentPanel);
  }

  /* -------- boot + observe -------- */
  function boot() {
    scan(document.body);
    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          scan(node);
        });
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
