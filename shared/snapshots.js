/* Historical Snapshots card + DS toast + DS single-date picker.
   Self-contained. The host page sets window.SNAP_CFG = { storeKey(), subject(), fileBase(), sheets() }
   and calls CardSnapshots() in its render + wireSnapshots() after mounting. */
(function () {
  const css = `
  .ds-toast-region{position:fixed;right:var(--toast-inset,20px);bottom:var(--toast-inset,20px);z-index:var(--z-toast,1200);width:var(--toast-width,380px);max-width:calc(100vw - 32px);height:0;pointer-events:none}
  .ds-toast{position:absolute;right:0;bottom:0;width:100%;box-sizing:border-box;pointer-events:auto;display:grid;grid-template-columns:18px 1fr auto;align-items:start;column-gap:10px;padding:var(--toast-pad-y,12px) var(--toast-pad-x,14px) var(--toast-pad-y,12px) 18px;background:var(--bg-raised,#fff);border:1px solid var(--border-default,#e5e7eb);border-left:var(--toast-accent,4px) solid var(--slate-400,#94a3b8);border-radius:var(--toast-radius,8px);box-shadow:var(--toast-shadow,0 20px 32px -8px rgb(15 23 42/.2),0 10px 16px -6px rgb(15 23 42/.12));overflow:hidden;font-family:inherit;touch-action:none;user-select:none;transform-origin:bottom center;
    transform:translate(var(--sx,0px),calc(var(--y,0px) + var(--sy,0px))) scale(var(--scale,1));opacity:1;
    transition:transform var(--toast-anim,400ms) var(--toast-ease-spring,cubic-bezier(.21,1.02,.73,1)),opacity var(--toast-anim,400ms) var(--toast-ease-spring,cubic-bezier(.21,1.02,.73,1))}
  .ds-toast:not([data-mounted="true"]){transform:translateY(100%);opacity:0}
  .ds-toast[data-visible="false"]{opacity:0;pointer-events:none}
  .ds-toast[data-swiping="true"]{transition:none}
  .ds-toast[data-removed="true"]{transform:translate(var(--sx,0px),calc(var(--y,0px) + 100%));opacity:0;pointer-events:none;transition:transform var(--toast-anim-exit,200ms) var(--toast-ease-exit,cubic-bezier(.06,.71,.55,1)),opacity var(--toast-anim-exit,200ms) var(--toast-ease-exit,cubic-bezier(.06,.71,.55,1))}
  .ds-toast[data-swipe-out="true"]{transform:translate(calc(var(--sx,0px) * 4),calc(var(--y,0px) + var(--sy,0px) * 4));opacity:0}
  .ds-toast[data-front="false"] .ds-toast-body,.ds-toast[data-front="false"] .ds-toast-icon,.ds-toast[data-front="false"] .ds-toast-spinner,.ds-toast[data-front="false"] .ds-toast-side{transition:opacity var(--toast-anim,400ms)}
  .ds-toast-region:not([data-expanded="true"]) .ds-toast[data-front="false"] > *{opacity:0}
  @media (max-width:639px){.ds-toast-region{left:16px;right:16px;width:auto;max-width:none}}
  .ds-toast-icon{width:18px;height:18px;margin-top:1px;color:var(--text-muted,#64748b)}
  .ds-toast-body{min-width:0;font-size:13px;line-height:1.45}
  .ds-toast-title{font-weight:600;color:var(--text-primary,#0f172a)}
  .ds-toast-desc{font-size:12px;color:var(--text-secondary,#475569);margin-top:1px}
  .ds-toast-dismiss{display:inline-grid;place-content:center;width:24px;height:24px;border:0;background:transparent;border-radius:6px;color:var(--text-muted,#64748b);cursor:pointer;transition:background 140ms,color 140ms}
  .ds-toast-dismiss:hover{background:var(--slate-100,#f1f5f9);color:var(--text-primary,#0f172a)}
  .ds-toast-dismiss:focus-visible{outline:0;box-shadow:var(--shadow-focus,0 0 0 3px rgba(46,134,192,.32))}
  .ds-toast--info{border-left-color:var(--info-500,#2563eb)}.ds-toast--info .ds-toast-icon{color:var(--info-700,#1d4ed8)}
  .ds-toast--success{border-left-color:var(--success-500,#16a34a)}.ds-toast--success .ds-toast-icon{color:var(--success-700,#15803d)}
  .ds-toast--danger{border-left-color:var(--danger-500,#dc2626)}.ds-toast--danger .ds-toast-icon{color:var(--danger-700,#b91c1c)}
  .ds-toast-timer{position:absolute;left:0;bottom:0;height:2px;width:100%;background:var(--slate-300,#cbd5e1);transform-origin:left center;animation:ds-toast-deplete linear forwards}
  .ds-toast--info .ds-toast-timer{background:var(--info-500,#2563eb)}.ds-toast--success .ds-toast-timer{background:var(--success-500,#16a34a)}
  @keyframes ds-toast-deplete{from{transform:scaleX(1)}to{transform:scaleX(0)}}
  .ds-toast-spinner{width:16px;height:16px;margin-top:1px;border:2px solid var(--slate-200,#e2e8f0);border-top-color:var(--info-500,#2563eb);border-radius:50%;animation:ds-spin .8s linear infinite}
  @keyframes ds-spin{to{transform:rotate(360deg)}}
  .ds-toast-region[data-expanded="true"] .ds-toast-timer{animation-play-state:paused}
  @media (prefers-reduced-motion:reduce){.ds-toast,.ds-toast[data-removed="true"]{transition:opacity 1ms}.ds-toast:not([data-mounted="true"]){transform:none}.ds-toast-spinner{animation-duration:2.4s}}

  .snap-card{background:#fff;border:1px solid var(--border-default,#e2e8f0);border-radius:12px;overflow:hidden;box-shadow:0 2px 4px 0 rgb(15 23 42/.08),0 1px 2px 0 rgb(15 23 42/.06);display:flex;flex-direction:column;margin-top:12px}
  .snap-tbl{width:100%;border-collapse:collapse;font-size:12px}
  .snap-tbl th{text-align:left;font-size:11px;font-weight:600;color:var(--text-muted,#6B7280);text-transform:uppercase;letter-spacing:.04em;padding:9px 12px;border-bottom:1px solid var(--border-default,#e5e7eb);background:var(--slate-50,#f9fafb);white-space:nowrap}
  .snap-tbl td{padding:10px 12px;border-bottom:1px solid var(--border-subtle,#f1f5f9);color:#0f172a;font-weight:500;vertical-align:middle;white-space:nowrap}
  .snap-tbl tbody tr:last-child td{border-bottom:0}
  .snap-tbl tbody tr:hover td{background:var(--brand-050,#eff6ff)}
  .snap-tbl .ds-th--sortable{padding:0}
  .snap-tbl .ds-th-sort{width:100%;display:inline-flex;align-items:center;gap:6px;font:inherit;font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--text-muted,#6B7280);padding:9px 12px;background:transparent;border:0;cursor:pointer;text-align:left;white-space:nowrap;transition:color .12s ease,background .12s ease}
  .snap-tbl .ds-th-sort:hover{color:var(--text-secondary,#4B5563);background:var(--slate-100,#F3F4F6)}
  .snap-tbl .ds-th-sort:focus-visible{outline:0;box-shadow:var(--shadow-focus,0 0 0 3px rgba(45,127,251,.32))}
  .snap-tbl .ds-th--active .ds-th-sort{color:var(--text-primary,#0f172a)}
  .snap-search{position:relative;width:220px;max-width:100%}
  .snap-search-ico{position:absolute;left:9px;top:50%;transform:translateY(-50%);color:#94a3b8;display:flex;pointer-events:none}
  .snap-search input{width:100%;height:32px;padding:0 10px 0 28px;border:1px solid var(--border-default,#e2e8f0);border-radius:8px;font:inherit;font-size:12.5px;color:#0f172a;outline:0;background:#fff;transition:border-color 140ms,box-shadow 140ms}
  .snap-search input:focus{border-color:var(--brand-400,#8ec5fd);box-shadow:var(--shadow-focus,0 0 0 3px rgba(46,134,192,.32))}
  @media (max-width:560px){.snap-search{width:100%}}
  .snap-hdr{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 14px;border-bottom:1px solid #e2e8f0}
  .snap-create{display:flex;align-items:flex-start;gap:8px;flex-wrap:wrap;padding:12px 14px;border-bottom:1px solid var(--border-subtle,#f1f5f9);background:var(--slate-50,#f8fafc)}
  .snap-field{display:grid;gap:4px;position:relative;padding-bottom:20px}
  .snap-lbl{font-size:11px;font-weight:600;color:var(--text-secondary,#475569)}
  .snap-date{position:relative;display:flex;align-items:center;width:200px}
  .snap-date input{width:100%;height:34px;padding:0 38px 0 10px;border:1px solid var(--border-default,#e2e8f0);border-radius:8px;background:#fff;font:inherit;font-size:13px;color:var(--text-primary,#0f172a);outline:0;font-variant-numeric:tabular-nums;transition:border-color 140ms cubic-bezier(.16,1,.3,1),box-shadow 140ms cubic-bezier(.16,1,.3,1)}
  .snap-date input::placeholder{color:var(--text-muted,#94a3b8)}
  .snap-date input:hover{border-color:var(--border-strong,#cbd5e1)}
  .snap-date input:focus{border-color:var(--brand-400,#8ec5fd);box-shadow:var(--shadow-focus,0 0 0 3px rgba(46,134,192,.32))}
  .snap-date input[aria-invalid="true"]{border-color:var(--danger-500,#dc2626)}
  .snap-cal-btn{position:absolute;right:3px;top:3px;width:28px;height:28px;display:inline-grid;place-items:center;border:0;border-radius:6px;background:transparent;color:var(--brand-600,#2d7ffb);cursor:pointer;transition:background 140ms}
  .snap-cal-btn:hover,.snap-cal-btn[aria-expanded="true"]{background:var(--brand-050,#eff6ff)}
  .snap-cal-btn:focus-visible{outline:0;box-shadow:var(--shadow-focus,0 0 0 3px rgba(46,134,192,.32))}
  .snap-hint{position:absolute;left:0;top:calc(100% - 16px);font-size:11.5px;line-height:16px;color:var(--text-muted,#64748b);white-space:nowrap}
  .snap-hint.is-err{color:var(--danger-700,#b91c1c)}
  .snap-btn{display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 14px;border:1px solid var(--brand-600,#2d7ffb);border-radius:8px;background:var(--brand-600,#2d7ffb);color:#fff;font:inherit;font-size:13px;font-weight:600;cursor:pointer;margin-top:19px;white-space:nowrap;transition:background 140ms cubic-bezier(.16,1,.3,1),border-color 140ms cubic-bezier(.16,1,.3,1)}
  .snap-btn:hover:not([disabled]){background:var(--brand-500,#51a2fc);border-color:var(--brand-500,#51a2fc)}
  .snap-btn:focus-visible{outline:0;box-shadow:var(--shadow-focus,0 0 0 3px rgba(46,134,192,.32))}
  .snap-btn[disabled]{background:var(--slate-200,#e2e8f0);border-color:var(--slate-200,#e2e8f0);color:var(--slate-400,#94a3b8);cursor:not-allowed}
  .snap-dl{display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 10px;border:1px solid var(--border-default,#e2e8f0);border-radius:8px;background:#fff;color:var(--slate-800,#1e293b);font:inherit;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;box-shadow:0 1px 2px rgb(15 23 42/.05);transition:background 140ms cubic-bezier(.16,1,.3,1),border-color 140ms cubic-bezier(.16,1,.3,1),color 140ms}
  .snap-dl svg{color:var(--brand-600,#2d7ffb)}
  .snap-dl:hover:not([disabled]){background:var(--slate-50,#f8fafc);border-color:var(--border-strong,#cbd5e1)}
  .snap-dl:focus-visible{outline:0;box-shadow:var(--shadow-focus,0 0 0 3px rgba(46,134,192,.32))}
  .snap-dl[disabled]{opacity:.6;cursor:progress}
  .snap-dl-na{color:var(--text-disabled,#94a3b8)}
  .snap-empty{padding:32px 16px;text-align:center;color:var(--text-muted,#64748b);font-size:13px}
  .snap-empty b{display:block;color:var(--text-primary,#0f172a);font-weight:600;margin-bottom:2px}
  .ds-badge{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;line-height:1;padding:4px 8px;border-radius:999px;border:1px solid transparent;white-space:nowrap}
  .ds-badge--dot::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.85}
  .ds-badge--warning{background:var(--warning-100,#fef3c7);color:var(--warning-700,#b45309);border-color:rgba(217,119,6,.2)}
  .ds-badge--success{background:var(--success-100,#dcfce7);color:var(--success-700,#15803d);border-color:rgba(22,163,74,.18)}
  .ds-badge--danger{background:var(--danger-100,#fee2e2);color:var(--danger-700,#b91c1c);border-color:rgba(220,38,38,.18)}
  .snap-row-new td{animation:snap-flash 1.6s cubic-bezier(.16,1,.3,1)}
  @keyframes snap-flash{from{background:var(--brand-050,#eff6ff)}to{background:transparent}}

  .ds-datepicker{position:fixed;z-index:1150;background:#fff;border:1px solid var(--border-default,#e5e7eb);border-radius:12px;box-shadow:var(--card-shadow-raised,0 20px 32px -8px rgb(15 23 42/.2));padding:12px;font-size:12.5px;width:252px}
  .ds-datepicker-head{display:flex;align-items:center;justify-content:space-between;padding:0 4px 8px}
  .ds-datepicker-month{font-weight:600;color:var(--text-primary,#0f172a)}
  .ds-datepicker-nav{display:inline-flex;gap:4px}
  .ds-datepicker-nav button{width:24px;height:24px;display:inline-grid;place-items:center;border:0;border-radius:6px;background:transparent;color:var(--text-secondary,#475569);cursor:pointer}
  .ds-datepicker-nav button:hover:not(:disabled){background:var(--slate-100,#f1f5f9);color:var(--text-primary,#0f172a)}
  .ds-datepicker-nav button:disabled{opacity:.35;cursor:not-allowed}
  .ds-datepicker-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:2px}
  .ds-datepicker-grid .dow{font-size:10.5px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted,#64748b);text-align:center;padding:4px 0}
  .ds-datepicker-cell{position:relative;width:32px;height:32px;display:inline-grid;place-items:center;border:0;border-radius:6px;background:transparent;color:var(--text-primary,#0f172a);cursor:pointer;font:inherit;font-size:12.5px;font-variant-numeric:tabular-nums}
  .ds-datepicker-cell:hover:not(:disabled){background:var(--slate-100,#f1f5f9)}
  .ds-datepicker-cell.is-other-month{color:var(--text-disabled,#94a3b8)}
  .ds-datepicker-cell.is-today{font-weight:700}
  .ds-datepicker-cell.is-today::after{content:"";position:absolute;bottom:4px;left:50%;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--brand-600,#2d7ffb)}
  .ds-datepicker-cell.is-selected{background:var(--brand-600,#2d7ffb);color:#fff;font-weight:600}
  .ds-datepicker-cell.is-selected::after{background:#fff}
  .ds-datepicker-cell.is-taken:not(.is-selected){color:var(--text-muted,#64748b);text-decoration:line-through}
  .ds-datepicker-cell:disabled{color:var(--text-disabled,#cbd5e1);cursor:not-allowed}
  .ds-datepicker-cell:focus-visible{outline:0;box-shadow:var(--shadow-focus,0 0 0 3px rgba(46,134,192,.32))}
  .ds-datepicker-foot{margin-top:10px;padding-top:10px;border-top:1px solid var(--border-subtle,#f1f5f9);display:flex;justify-content:space-between;gap:8px}
  .ds-datepicker-foot button{border:0;background:transparent;font:inherit;font-size:12px;font-weight:600;color:var(--brand-600,#2d7ffb);cursor:pointer;padding:4px 6px;border-radius:6px}
  .ds-datepicker-foot button:hover{background:var(--brand-050,#eff6ff)}
  @media print{.snap-create,.ds-toast-region,.ds-datepicker,#snap-search-wrap{display:none !important}}
  `;
  const st = document.createElement('style'); st.id = 'cd-snapshots-css'; st.textContent = css; document.head.appendChild(st);

  /* ── Toast (DS "Toast / Snackbar") ── */
  const ICO = {
    info:    '<svg class="ds-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4M12 8h.01"></path></svg>',
    success: '<svg class="ds-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>',
    danger:  '<svg class="ds-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4M12 16h.01"></path></svg>',
  };
  const MAX = 3, OFF = 14, SC = 0.05, GAP = 12, SWIPE = 45;
  const live = [];
  let reg = null, expanded = false;
  function region() {
    if (reg && reg.isConnected) return reg;
    reg = document.createElement('section'); reg.id = 'ds-toast-region'; reg.className = 'ds-toast-region';
    reg.setAttribute('aria-label', 'Notifications'); reg.setAttribute('aria-live', 'polite'); reg.setAttribute('aria-relevant', 'additions text'); reg.tabIndex = -1;
    const setX = v => { if (expanded === v) return; expanded = v; reg.dataset.expanded = v; live.forEach(t => v ? t.pause() : t.resume()); layout(); };
    reg.addEventListener('mouseenter', () => setX(true), true);
    reg.addEventListener('mouseleave', e => { if (!reg.contains(e.relatedTarget)) setX(false); });
    reg.addEventListener('focusin', () => setX(true));
    reg.addEventListener('focusout', e => { if (!reg.contains(e.relatedTarget)) setX(false); });
    document.body.appendChild(reg); return reg;
  }
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => layout()) : null;
  function layout() {
    const vis = live.filter(t => !t.removed);
    let acc = 0;
    const frontH = vis.length ? vis[vis.length - 1].el.offsetHeight : 0;
    for (let i = vis.length - 1, n = 0; i >= 0; i--, n++) {
      const t = vis[i], el = t.el, h = el.offsetHeight;
      let y, sc;
      if (expanded) { y = -acc; sc = 1; acc += h + GAP; }
      else { y = -n * OFF - Math.max(0, frontH - h) * 0; sc = 1 - n * SC; }
      el.style.setProperty('--y', y + 'px'); el.style.setProperty('--scale', sc);
      if (!expanded && n > 0) el.style.height = frontH + 'px'; else el.style.height = '';
      el.dataset.front = n === 0; el.dataset.visible = n < MAX;
      el.style.zIndex = 100 - n;
      if (!expanded && n > 0) el.setAttribute('aria-hidden', 'true'); else el.removeAttribute('aria-hidden');
    }
  }
  window.dsToast = function (opts) {
    const el = document.createElement('div');
    el.setAttribute('role', 'status'); el.setAttribute('aria-atomic', 'true');
    el.dataset.mounted = 'false';
    const t = { el, removed: false, timer: null, left: 0, start: 0, dur: 0 };
    t.pause = () => { if (!t.timer) return; clearTimeout(t.timer); t.timer = null; t.left -= Date.now() - t.start; };
    t.resume = () => { if (t.timer || !t.dur || t.removed) return; t.start = Date.now(); t.timer = setTimeout(close, Math.max(0, t.left)); };
    function close() {
      if (t.removed) return; t.removed = true; clearTimeout(t.timer);
      el.dataset.removed = 'true'; ro && ro.unobserve(el);
      setTimeout(() => { el.remove(); const i = live.indexOf(t); if (i > -1) live.splice(i, 1); if (!live.length) { expanded = false; reg && (reg.dataset.expanded = false); } }, 220);
      layout();
    }
    const set = (o) => {
      const tone = o.tone || 'info';
      t.dur = o.loading ? 0 : (o.duration ?? 4000);
      el.className = 'ds-toast ds-toast--' + tone;
      el.innerHTML = `${o.loading ? '<span class="ds-toast-spinner" aria-hidden="true"></span>' : ICO[tone]}<div class="ds-toast-body"><div class="ds-toast-title">${o.title}</div>${o.desc ? `<div class="ds-toast-desc">${o.desc}</div>` : ''}</div><div class="ds-toast-side"><button type="button" class="ds-toast-dismiss" aria-label="Dismiss notification"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg></button></div>${t.dur ? `<span class="ds-toast-timer" style="animation-duration:${t.dur}ms"></span>` : ''}`;
      el.querySelector('.ds-toast-dismiss').onclick = close;
      clearTimeout(t.timer); t.timer = null; t.left = t.dur;
      if (t.dur && !expanded) t.resume();
      layout();
    };
    // swipe right / down to dismiss
    let sx0 = null, sy0 = 0;
    el.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; sx0 = e.clientX; sy0 = e.clientY; el.setPointerCapture(e.pointerId); el.dataset.swiping = 'true'; });
    el.addEventListener('pointermove', e => { if (sx0 === null) return; const dx = Math.max(0, e.clientX - sx0), dy = Math.max(0, e.clientY - sy0); const ax = dx >= dy; el.style.setProperty('--sx', (ax ? dx : 0) + 'px'); el.style.setProperty('--sy', (ax ? 0 : dy) + 'px'); });
    const end = e => { if (sx0 === null) return; const dx = Math.max(0, e.clientX - sx0), dy = Math.max(0, e.clientY - sy0); sx0 = null; el.dataset.swiping = 'false';
      if (Math.max(dx, dy) >= SWIPE) { el.dataset.swipeOut = 'true'; close(); } else { el.style.setProperty('--sx', '0px'); el.style.setProperty('--sy', '0px'); } };
    el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
    region().appendChild(el); live.push(t); ro && ro.observe(el);
    set(opts);
    requestAnimationFrame(() => requestAnimationFrame(() => { el.dataset.mounted = 'true'; layout(); }));
    return { update: set, close };
  };

  /* ── Date helpers (DD/MM/YYYY) ── */
  const pad = n => String(n).padStart(2, '0');
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const fromIso = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const display = s => { const d = fromIso(s); return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`; };
  const pretty = s => fromIso(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  function parse(txt) {
    const t = (txt || '').trim(); if (!t) return { empty: true };
    let m = t.match(/^(\d{1,2})[\/.\-\s](\d{1,2})[\/.\-\s](\d{4})$/), y, mo, d;
    if (m) { d = +m[1]; mo = +m[2]; y = +m[3]; }
    else if ((m = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/))) { y = +m[1]; mo = +m[2]; d = +m[3]; }
    else if ((m = t.match(/^(\d{2})(\d{2})(\d{4})$/))) { d = +m[1]; mo = +m[2]; y = +m[3]; }
    else return { err: 'Use the format DD/MM/YYYY.' };
    const dt = new Date(y, mo - 1, d);
    if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return { err: 'That date doesn\u2019t exist.' };
    if (dt > today()) return { err: 'Snapshots can\u2019t be taken for a future date.' };
    if (y < 2000) return { err: 'Snapshots are available from 01/01/2000.' };
    return { iso: iso(dt) };
  }

  /* ── State (persisted per company) ── */
  const key = () => 'snapshots:' + (cfg().storeKey ? cfg().storeKey() : 'default');
  let SNAPS = null, snapQuery = '', snapPage = 1, snapPerPage = 10, snapText = '', snapNewId = null, snapBusy = false;
  const SEED = [['2026-09-30','2026-10-01T08:14:00'],['2026-06-30','2026-07-01T09:02:00'],['2026-03-31','2026-04-01T08:47:00']];
  const SEED_VER = '2';
  const load = () => {
    if (SNAPS) return SNAPS;
    try { SNAPS = JSON.parse(localStorage.getItem(key()) || '[]'); } catch (e) { SNAPS = []; }
    if (localStorage.getItem(key() + ':seeded') !== SEED_VER) {
      const keep = new Set(SEED.map(x => 'seed-' + x[0]));
      SNAPS = SNAPS.filter(x => !String(x.id).startsWith('seed-') || keep.has(x.id));
      SEED.forEach(([d, c]) => { if (!SNAPS.some(x => x.date === d)) SNAPS.push({ id: 'seed-' + d, date: d, created: new Date(c).toISOString(), status: 'Ready' }); });
      try { localStorage.setItem(key() + ':seeded', SEED_VER); } catch (e) {}
      save();
    }
    return SNAPS;
  };
  const save = () => { try { localStorage.setItem(key(), JSON.stringify(SNAPS)); } catch (e) {} };
  const validate = () => {
    const p = parse(snapText);
    if (p.iso && load().some(s => s.date === p.iso)) return { err: `A snapshot for ${pretty(p.iso)} already exists.` };
    return p;
  };

  const SORT = { key: 'created', dir: -1 };
  const cfg = () => window.SNAP_CFG || {};
  function sortRows(rows) {
    const k = SORT.key; if (!k) return rows;
    const rank = { Ready: 0, Pending: 1, Failed: 2 };
    return [...rows].sort((a, b) => { let x = a[k], y = b[k]; if (k === 'status') { x = rank[x] ?? 9; y = rank[y] ?? 9; } return (x < y ? -1 : x > y ? 1 : 0) * SORT.dir; });
  }
  function th(k, label) {
    const on = SORT.key === k, asc = SORT.dir > 0;
    return `<th scope="col" class="ds-th--sortable${on ? ' ds-th--active' : ''}" aria-sort="${on ? (asc ? 'ascending' : 'descending') : 'none'}"><button type="button" class="ds-th-sort" data-snap-sort="${k}"><span>${label}</span>${window.dsSortInd ? window.dsSortInd(on, asc) : ''}</button></th>`;
  }
  function badge(s) {
    const tone = { Pending: 'warning', Ready: 'success', Failed: 'danger' }[s] || 'warning';
    return `<span class="ds-badge ds-badge--${tone} ds-badge--dot">${s}</span>`;
  }

  function SnapBody() {
    let rows = load().map(s => ({ ...s, dateTxt: display(s.date), createdTxt: new Date(s.created).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }));
    const q = snapQuery.trim().toLowerCase();
    if (q) rows = rows.filter(r => [r.dateTxt, pretty(r.date), r.createdTxt, r.status].some(v => v.toLowerCase().includes(q)));
    rows = sortRows(rows);
    const total = rows.length, totalPages = Math.max(1, Math.ceil(total / snapPerPage));
    if (snapPage > totalPages) snapPage = totalPages;
    const pageRows = rows.slice((snapPage - 1) * snapPerPage, snapPage * snapPerPage);
    const empty = !load().length
      ? `<div class="snap-empty"><b>No snapshots yet</b>Choose a date below to capture ${cfg().subject ? cfg().subject() : 'this'} as it was on that day.</div>`
      : `<div class="snap-empty"><b>No matching snapshots</b>Try a different date or status.</div>`;
    return `
      <div class="overflow-x-auto scroll-thin">
        <table class="snap-tbl">
          <thead><tr>${th('date', 'Snapshot Date')}${th('created', 'Creation Date')}${th('status', 'Status')}<th style="text-align:right;width:1%">Actions</th></tr></thead>
          <tbody>${pageRows.length ? pageRows.map(r => `<tr class="${r.id === snapNewId ? 'snap-row-new' : ''}"><td style="font-variant-numeric:tabular-nums">${r.dateTxt}</td><td style="font-weight:400;color:#334155;font-variant-numeric:tabular-nums">${r.createdTxt}</td><td>${badge(r.status)}</td><td style="text-align:right">${r.status === 'Ready' ? `<button type="button" class="snap-dl" data-snap-dl="${r.id}" aria-label="Download snapshot for ${pretty(r.date)} as Excel"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="M7 10l5 5 5-5"></path><path d="M12 15V3"></path></svg><span>Download</span></button>` : `<span class="snap-dl-na" title="Available once the snapshot is ready">—</span>`}</td></tr>`).join('') : ''}</tbody>
        </table>
        ${pageRows.length ? '' : empty}
      </div>
      ${total > 0 ? `<div id="snap-pg">${dsPagination({ page: snapPage, totalPages, totalItems: total, perPage: snapPerPage, perPageOptions: [10, 25, 50], label: 'snapshots' })}</div>` : ''}`;
  }

  window.CardSnapshots = function () {
    const v = validate(), err = !v.empty && v.err;
    return `
    <div class="snap-card" id="snap-card">
      <div class="snap-hdr">
        <span style="font-size:14px;font-weight:700;color:#0f172a;flex:1">Historical Snapshots</span>
        <div class="snap-search" id="snap-search-wrap">
          <span class="snap-search-ico"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg></span>
          <input id="snap-search" type="text" placeholder="Search snapshots..." aria-label="Search snapshots" value="${snapQuery.replace(/"/g, '&quot;')}" />
        </div>
      </div>
      <form class="snap-create" id="snap-form" novalidate>
        <div class="snap-field">
          <label class="snap-lbl" for="snap-date">Snapshot date</label>
          <div class="snap-date">
            <input id="snap-date" type="text" inputmode="numeric" autocomplete="off" placeholder="DD/MM/YYYY" value="${snapText.replace(/"/g, '&quot;')}" aria-describedby="snap-hint" aria-invalid="${err ? 'true' : 'false'}" />
            <button type="button" class="snap-cal-btn" id="snap-cal" aria-label="Choose date from calendar" aria-haspopup="dialog" aria-expanded="false"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path></svg></button>
          </div>
          <div class="snap-hint${err ? ' is-err' : ''}" id="snap-hint">${err || 'Any past date. Type it or pick from the calendar.'}</div>
        </div>
        <button type="submit" class="snap-btn" id="snap-create" ${v.iso && !snapBusy ? '' : 'disabled'}>Create New Snapshot<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg></button>
      </form>
      <div id="snap-body">${SnapBody()}</div>
    </div>`;
  };

  function refreshCard() {
    const c = document.getElementById('snap-card'); if (!c) return;
    const f = document.activeElement && document.activeElement.id;
    c.outerHTML = window.CardSnapshots(); window.wireSnapshots();
    if (f) document.getElementById(f)?.focus();
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-snap-sort]'); if (!b) return;
    const k = b.dataset.snapSort; if (SORT.key === k) SORT.dir = -SORT.dir; else { SORT.key = k; SORT.dir = 1; }
    snapPage = 1; refreshBody();
    document.querySelector(`[data-snap-sort="${k}"]`)?.focus();
  });
  function refreshBody() {
    const b = document.getElementById('snap-body'); if (!b) return;
    b.innerHTML = SnapBody(); wirePg();
  }
  function wirePg() {
    const pg = document.querySelector('#snap-pg .ds-pagination-wrap') || document.querySelector('#snap-pg > *');
    if (pg) dsWirePagination(pg, { onPage: p => { snapPage = p; refreshBody(); }, onPerPage: n => { snapPerPage = n; snapPage = 1; refreshBody(); } });
  }
  function syncForm(showErr) {
    const v = validate(), inp = document.getElementById('snap-date'), hint = document.getElementById('snap-hint'), btn = document.getElementById('snap-create');
    if (!inp) return v;
    const err = showErr && !v.empty && v.err;
    inp.setAttribute('aria-invalid', err ? 'true' : 'false');
    hint.className = 'snap-hint' + (err ? ' is-err' : '');
    hint.textContent = err || 'Any past date. Type it or pick from the calendar.';
    btn.disabled = !v.iso || snapBusy;
    return v;
  }

  function create() {
    const v = syncForm(true); if (!v.iso || snapBusy) return;
    snapBusy = true; syncForm(true);
    const t = dsToast({ tone: 'info', loading: true, title: 'Creating snapshot\u2026', desc: `${cfg().label ? cfg().label() : 'Snapshot'} as at ${pretty(v.iso)}` });
    setTimeout(() => {
      const s = { id: 's' + Date.now(), date: v.iso, created: new Date().toISOString(), status: 'Pending' };
      load().unshift(s); save();
      snapNewId = s.id; snapText = ''; snapBusy = false; snapQuery = ''; snapPage = 1;
      SORT.key = 'created'; SORT.dir = -1;
      refreshCard();
      t.update({ tone: 'success', title: 'Snapshot requested', desc: `${pretty(v.iso)} is now Pending. Generation can take a while \u2014 you can leave this page.`, duration: 6000 });
      setTimeout(() => { snapNewId = null; }, 1700);
    }, 1200);
  }

  /* ── Excel download ── */
  let xlsxP = null;
  const loadXlsx = () => xlsxP || (xlsxP = new Promise((res, rej) => {
    if (window.XLSX) return res(window.XLSX);
    const sc = document.createElement('script'); sc.src = 'https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js';
    sc.onload = () => res(window.XLSX); sc.onerror = () => { xlsxP = null; rej(new Error('load')); }; document.head.appendChild(sc);
  }));
  async function download(id, btn) {
    const snap = load().find(x => x.id === id); if (!snap) return;
    const name = (((cfg().fileBase && cfg().fileBase()) || 'Snapshot').replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '_')) + '_Snapshot_' + snap.date + '.xlsx';
    if (btn) { btn.disabled = true; btn.querySelector('span').textContent = 'Preparing\u2026'; }
    try {
      const X = await loadXlsx(), wb = X.utils.book_new();
      (cfg().sheets ? cfg().sheets(snap, { display, pretty }) : []).forEach(([n, rows]) => {
        const ws = X.utils.aoa_to_sheet(rows);
        ws['!cols'] = rows.reduce((w, r) => (r.forEach((v, i) => { w[i] = Math.max(w[i] || 8, Math.min(60, String(v ?? '').length + 2)); }), w), []).map(wch => ({ wch }));
        X.utils.book_append_sheet(wb, ws, n);
      });
      X.writeFile(wb, name);
      dsToast({ tone: 'success', title: 'Snapshot downloaded', desc: name });
    } catch (e) {
      dsToast({ tone: 'danger', title: 'Download failed', desc: 'Couldn\u2019t build the Excel file. Check your connection and try again.', duration: 6000 });
    } finally {
      if (btn && btn.isConnected) { btn.disabled = false; btn.querySelector('span').textContent = 'Download'; }
    }
  }
  document.addEventListener('click', e => { const b = e.target.closest('[data-snap-dl]'); if (b && !b.disabled) download(b.dataset.snapDl, b); });

  /* ── Single-date picker (DS datepicker) ── */
  let dp = null;
  function closeDp(focusBtn) {
    if (!dp) return; dp.el.remove(); document.removeEventListener('mousedown', dp.out, true); document.removeEventListener('keydown', dp.key, true); window.removeEventListener('resize', dp.pos); window.removeEventListener('scroll', dp.pos, true);
    const b = document.getElementById('snap-cal'); if (b) { b.setAttribute('aria-expanded', 'false'); if (focusBtn) b.focus(); }
    dp = null;
  }
  function openDp(anchor) {
    if (dp) { closeDp(); return; }
    const p = parse(snapText), sel = p.iso || null, t = today();
    let view = sel ? fromIso(sel) : new Date(t); view.setDate(1);
    let focusIso = sel || iso(t);
    const el = document.createElement('div'); el.className = 'ds-datepicker'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Choose snapshot date');
    const taken = new Set(load().map(s => s.date));
    const render = () => {
      const y = view.getFullYear(), m = view.getMonth(), first = new Date(y, m, 1), start = new Date(first); start.setDate(1 - ((first.getDay() + 6) % 7));
      const nextDisabled = new Date(y, m + 1, 1) > t;
      let cells = '';
      for (let i = 0; i < 42; i++) {
        const d = new Date(start); d.setDate(start.getDate() + i); const s = iso(d);
        const cls = ['ds-datepicker-cell', d.getMonth() !== m && 'is-other-month', s === iso(t) && 'is-today', s === sel && 'is-selected', taken.has(s) && 'is-taken'].filter(Boolean).join(' ');
        cells += `<button type="button" class="${cls}" data-d="${s}" tabindex="${s === focusIso ? 0 : -1}" ${d > t ? 'disabled' : ''} aria-label="${pretty(s)}${taken.has(s) ? ' (snapshot exists)' : ''}" ${s === sel ? 'aria-pressed="true"' : ''}>${d.getDate()}</button>`;
      }
      el.innerHTML = `<div class="ds-datepicker-head"><span class="ds-datepicker-month" aria-live="polite">${first.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span><span class="ds-datepicker-nav"><button type="button" data-nav="-1" aria-label="Previous month"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m15 18-6-6 6-6"></path></svg></button><button type="button" data-nav="1" aria-label="Next month" ${nextDisabled ? 'disabled' : ''}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m9 18 6-6-6-6"></path></svg></button></span></div>
        <div class="ds-datepicker-grid">${['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => `<span class="dow">${d}</span>`).join('')}${cells}</div>
        <div class="ds-datepicker-foot"><button type="button" data-act="today">Today</button><button type="button" data-act="clear">Clear</button></div>`;
    };
    const pick = s => { snapText = display(s); const inp = document.getElementById('snap-date'); if (inp) inp.value = snapText; closeDp(); syncForm(true); document.getElementById('snap-create')?.focus(); };
    el.addEventListener('click', e => {
      const n = e.target.closest('[data-nav]'), c = e.target.closest('[data-d]'), a = e.target.closest('[data-act]');
      if (n && !n.disabled) { view.setMonth(view.getMonth() + +n.dataset.nav); render(); }
      else if (c && !c.disabled) pick(c.dataset.d);
      else if (a) { if (a.dataset.act === 'today') pick(iso(t)); else { snapText = ''; const inp = document.getElementById('snap-date'); if (inp) inp.value = ''; closeDp(); syncForm(false); inp && inp.focus(); } }
    });
    el.addEventListener('keydown', e => {
      const c = e.target.closest('[data-d]'); if (!c) return;
      const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key]; if (!step) return;
      e.preventDefault(); const d = fromIso(c.dataset.d); d.setDate(d.getDate() + step); if (d > t) return;
      focusIso = iso(d); if (d.getMonth() !== view.getMonth() || d.getFullYear() !== view.getFullYear()) { view = new Date(d.getFullYear(), d.getMonth(), 1); }
      render(); el.querySelector(`[data-d="${focusIso}"]`)?.focus();
    });
    document.body.appendChild(el); render();
    const pos = () => { const r = anchor.getBoundingClientRect(), h = el.offsetHeight, w = el.offsetWidth; let top = r.bottom + 6; if (top + h > innerHeight - 8) top = Math.max(8, r.top - h - 6); el.style.top = top + 'px'; el.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.right - w)) + 'px'; };
    const out = e => { if (!el.contains(e.target) && !anchor.contains(e.target)) closeDp(); };
    const key = e => { if (e.key === 'Escape') { e.preventDefault(); closeDp(true); } };
    pos(); dp = { el, out, key, pos };
    document.addEventListener('mousedown', out, true); document.addEventListener('keydown', key, true); window.addEventListener('resize', pos); window.addEventListener('scroll', pos, true);
    anchor.setAttribute('aria-expanded', 'true');
    (el.querySelector('[data-d][tabindex="0"]') || el.querySelector('[data-d]:not(:disabled)'))?.focus();
  }

  window.wireSnapshots = function () {
    if (dp) closeDp();
    const s = document.getElementById('snap-search');
    if (s) s.oninput = () => { snapQuery = s.value; snapPage = 1; refreshBody(); };
    const inp = document.getElementById('snap-date');
    if (inp) {
      inp.oninput = () => { snapText = inp.value; syncForm(false); };
      inp.onblur = () => { const p = parse(inp.value); if (p.iso) { snapText = display(p.iso); inp.value = snapText; } syncForm(true); };
    }
    const cal = document.getElementById('snap-cal');
    if (cal) cal.onclick = e => { e.preventDefault(); openDp(cal); };
    const f = document.getElementById('snap-form');
    if (f) f.onsubmit = e => { e.preventDefault(); const p = parse(snapText); if (p.iso) snapText = display(p.iso); create(); };
    wirePg();
  };
})();
