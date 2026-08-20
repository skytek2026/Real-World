/* Cache version: clears stale localStorage on first load of new version */
try {
  if (localStorage.getItem('rw_cv') !== '3') {
    localStorage.setItem('rw_theme', 'light');
    localStorage.setItem('rw_cv', '3');
  }
} catch {}

/* Inject Exo display font across all pages (per Skytek DS) */
(function injectGlobalFontStyle() {
  if (document.getElementById('rw-font-overrides')) return;
  const s = document.createElement('style');
  s.id = 'rw-font-overrides';
  s.textContent = `
    h1, h2, h3, h4, h5, h6,
    .font-display,
    .topbar-brand-link {
      font-family: 'Exo', 'Inter', system-ui, sans-serif;
      letter-spacing: -0.005em;
    }
  `;
  (document.head || document.documentElement).appendChild(s);
})();

/* Contain Leaflet's internal stacking context so its panes (z-400) and
   controls don't bleed above the sticky topbar (z-30) or the mobile
   sidebar drawer (z-2000). isolation:isolate creates a new stacking
   context that traps every descendant z-index inside the map card. */
(function injectLeafletStackingFix() {
  if (document.getElementById('rw-leaflet-stack')) return;
  const s = document.createElement('style');
  s.id = 'rw-leaflet-stack';
  s.textContent = `
    .leaflet-container{isolation:isolate;z-index:0}
    /* Defensive: in case a parent of the map sets z-index, keep header above */
    header.sticky{z-index:50}
    #sidebar{z-index:60}
    @media(max-width:768px){
      #sidebar{z-index:2000}
      #sidebar-backdrop{z-index:1999}
    }
  `;
  (document.head || document.documentElement).appendChild(s);
})();

/* Apply persisted theme attribute ASAP to reduce flash-of-light on load */
(function applyThemeAttrEarly() {
  try {
    const t = localStorage.getItem('rw_theme') || 'light';
    document.documentElement.setAttribute('data-theme', t);
  } catch {}
})();

/* ------------------ SHARED CHROME (sidebar, topbar, tweaks, icons) ------------------ */
/* Expects: window.PAGE = { id, title, crumb } set before this script loads */

/* ------------------ DS sort indicator (shared) ------------------ */
/* Skytek Design System sortable-header glyph: muted chevrons-up-down by default,
   a solid brand arrow on the active column. Self-contained so any page can use it. */
(function(){
  const SI='m8 9 4-4 4 4M8 15l4 4 4-4', AU='m12 5 7 7m-7-7-7 7m7-7v14', AD='m12 19 7-7m-7 7-7-7m7 7V5';
  const svg=(p,color,op)=>`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-left:4px;flex-shrink:0;color:${color};opacity:${op}">${Array.isArray(p)?p.map(d=>`<path d="${d}"/>`).join(''):`<path d="${p}"/>`}</svg>`;
  window.dsSortInd = function(active, asc){
    if (!active) return svg(SI, 'currentColor', '.4');
    return svg(asc ? AU : AD, 'var(--brand-600,#2563eb)', '1');
  };
})();

/* ------------------ ICONS (Lucide) ------------------ */
const LUCIDE_NAMES = {
  menu:'Menu', grid:'LayoutGrid', shield:'ShieldCheck',
  building:'Building', building2Nav:'Warehouse', gem:'Gem', news:'Newspaper',
  plane:'Plane', bolt:'Zap', briefcase:'Briefcase', doc:'FileText',
  globe:'Globe', wave:'Waves', chart:'BarChart3', book:'BookOpen', earth:'Earth', landplot:'LandPlot',
  anchor:'Anchor', cloud:'Cloud', ship:'Ship', building2:'Building2',
  plane2:'Plane', bolt2:'Zap', bell:'Bell', help:'HelpCircle',
  anchor2:'Anchor', pin:'MapPin', cloudrain:'CloudRain', cloudicon:'Cloud',
  docs2:'FileText', search2:'Search', factory:'Factory', search:'Search',
  chev:'ChevronRight', chevDown:'ChevronDown', plus:'Plus', minus:'Minus', x:'X',
  arrowUp:'ArrowUp', arrowDown:'ArrowDown', filter:'Filter', layers:'Layers',
  compass:'Compass', maximize:'Maximize2', minimize:'Minimize2', alertTri:'AlertTriangle',
  radio:'RadioTower', check:'Check', cargo:'Container', tag:'Tag',
  clipboard:'Clipboard', users:'Users', leaf:'Leaf', fileText:'FileText', clock:'Clock',
  office:'Building2', upload:'Upload', network:'Network',
};
const LUCIDE_SIZES = {
  ship:'h-10 w-10', building2:'h-10 w-10', plane2:'h-10 w-10', bolt2:'h-10 w-10',
  anchor2:'h-8 w-8', pin:'h-8 w-8', cloudrain:'h-8 w-8', cloudicon:'h-8 w-8',
  docs2:'h-8 w-8', search2:'h-8 w-8', factory:'h-8 w-8', cargo:'h-8 w-8',
  search:'h-4 w-4', chev:'h-4 w-4', chevDown:'h-4 w-4', plus:'h-4 w-4', minus:'h-4 w-4', x:'h-4 w-4',
  arrowUp:'h-3 w-3', arrowDown:'h-3 w-3', upload:'h-6 w-6',
};
function lucideIcon(alias) {
  const name = LUCIDE_NAMES[alias];
  const size = LUCIDE_SIZES[alias] || 'h-5 w-5';
  const data = (window.lucide && lucide.icons && lucide.icons[name]);
  if (!data) return `<span class="${size} inline-block"></span>`;
  const [tag, attrs, children] = data;
  const attrStr = Object.entries(attrs).map(([k,v]) => `${k}="${v}"`).join(' ');
  const inner = (children || []).map(([ctag, cattrs]) =>
    `<${ctag} ${Object.entries(cattrs).map(([k,v]) => `${k}="${v}"`).join(' ')}/>`
  ).join('');
  return `<${tag} ${attrStr} class="${size}">${inner}</${tag}>`;
}
const I = new Proxy({}, { get: (_t, prop) => lucideIcon(prop) });

/* ------------------ NAV ------------------ */
const NAV = [
  { id:'dash',       label:'Dashboard',       icon:'grid',         href:'Dashboard.html' },
  { id:'marine',     label:'Marine',          icon:'ship',         href:'MarineDashboard.html' },
  { id:'property',   label:'Property',        icon:'building',     href:'PropertyDashboard.html' },
  { id:'aviation',   label:'Aviation',        icon:'plane',        href:'AviationDashboard.html' },
  { id:'energy',     label:'Offshore/Energy', icon:'bolt',         href:'OffshoreDashboard.html' },
  { id:'cargo',      label:'Cargo',           icon:'cargo',        href:'CargoDashboard.html' },
  { id:'portfolios', label:'Portfolios',      icon:'briefcase',    href:'AllPortfolios.html' },
  { id:'reports',    label:'Reports',         icon:'doc',          href:'Reports.html' },
  { id:'companies',  label:'Companies',       icon:'office',       href:'Companies.html' },
  { id:'regions',    label:'Regions',         icon:'landplot',     href:'Regions.html' },
  { id:'events',     label:'Nat Cat Events',  icon:'earth',        href:'NatCatEvents.html', badge:true },
  { id:'assets',     label:'Assets',          icon:'gem',          href:'AssetsSearch.html' },
  { id:'ports',      label:'Ports',           icon:'anchor',       href:'Ports.html' },
  { id:'weather',    label:'Weather',         icon:'cloud',        href:'Weather.html' },
];

// Inline SVGs for profile-menu leading icons (14×14, stroke=currentColor)
const SVG_USER   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
const SVG_HELP   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
const SVG_SHIELD = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
const SVG_BLDG   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01M12 6h.01M12 10h.01M12 14h.01"/></svg>`;
const SVG_RULES  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 7 5 9 9 5"/><polyline points="3 17 5 19 9 15"/><line x1="13" y1="7" x2="21" y2="7"/><line x1="13" y1="17" x2="21" y2="17"/></svg>`;
const SVG_EXTRAS = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/></svg>`;
const SVG_NEWS   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/></svg>`;
const SVG_SIGNOUT= `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`;

const PROFILE_LINKS = [
  { label:'Organisations', href:'Organisations.html', icon: SVG_BLDG },
  { label:'Rule Sets',     href:'RuleSets.html',      icon: SVG_RULES },
  { label:'Extras',        href:'Extras.html',        icon: SVG_EXTRAS },
  { label:'News',          href:'News.html',          icon: SVG_NEWS },
];

const NOTIFS = [
  { t:'Hurricane Advisory', sub:'Cat 3 system approaching Gulf — 38 assets in cone', time:'12m', tone:'rose' },
  { t:'Policy Renewal',     sub:'MV Orion hull & machinery renews in 6 days',         time:'1h', tone:'amber' },
  { t:'New Report Ready',   sub:'Q1 Aviation Exposure — 48 pages',                    time:'3h', tone:'brand' },
  { t:'Port Closure',       sub:'Rotterdam — Terminal C closed through 04/24',        time:'1d', tone:'ink' },
];

function toneClasses(tone) {
  const m = {
    indigo:  { bg:'bg-indigo-50',  text:'text-indigo-600',  ring:'ring-indigo-100' },
    emerald: { bg:'bg-emerald-50', text:'text-emerald-600', ring:'ring-emerald-100' },
    amber:   { bg:'bg-amber-50',   text:'text-amber-600',   ring:'ring-amber-100' },
    rose:    { bg:'bg-rose-50',    text:'text-rose-600',    ring:'ring-rose-100' },
    brand:   { bg:'bg-brand-50',   text:'text-brand-600',   ring:'ring-brand-100' },
    ink:     { bg:'bg-ink-100',    text:'text-ink-700',     ring:'ring-ink-200' },
  };
  return m[tone] || m.brand;
}

function Sidebar() {
  const activeId = (window.PAGE && window.PAGE.id) || 'dash';
  return `
  <style>
    #sidebar[data-expanded="true"] .sidebar-logo { opacity:1 !important; pointer-events:auto !important; }
    #sidebar:not([data-expanded="true"]) .sidebar-logo { opacity:0 !important; pointer-events:none !important; width:0 !important; overflow:hidden !important; }
  </style>
  <div id="sidebar-backdrop" class="hidden md:!hidden fixed inset-0 bg-black/40 z-[1999]"></div>
  <aside id="sidebar" class="shrink-0 bg-white border-r border-ink-200 h-screen sticky top-0 flex flex-col transition-[width,transform] duration-200 max-md:fixed max-md:left-0 max-md:top-0 max-md:-translate-x-full" style="width:56px; z-index:2000">
    <div class="h-14 flex items-center border-b border-ink-200 px-2 gap-2">
      <img src="${(window.__resources&&window.__resources.logoLandscape)||'images/skytek-realworld-landscape-color.png'}" alt="Real World" class="sidebar-logo" style="height:28px;object-fit:contain;opacity:0;pointer-events:none;transition:opacity 150ms;flex:1;min-width:0;" />
      <button id="collapse-btn" class="shrink-0 p-2 rounded-lg hover:bg-ink-100 text-ink-700 ring-focus" title="Toggle menu">${I.menu}</button>
    </div>
    <nav class="flex-1 py-3 flex flex-col items-stretch gap-0.5 px-2 overflow-y-auto scroll-thin">
      ${NAV.map(item => {
        const active = item.id === activeId;
        const tag = item.href ? 'a' : 'button';
        const hrefAttr = item.href ? `href="${item.href}"` : '';
        return `
        <${tag} ${hrefAttr} data-nav="${item.id}" class="nav-item group relative flex items-center gap-3 h-10 rounded-lg px-2 text-ink-500 hover:text-ink-800 hover:bg-ink-100 ring-focus no-underline ${active ? 'is-nav-active' : ''}">
          <span class="shrink-0 flex items-center justify-center w-7 h-7 nav-ico">${I[item.icon]}</span>
          <span class="nav-label truncate hidden text-sm font-medium">${item.label}</span>
          ${item.badge?`<span class="absolute top-1.5 left-7 h-1.5 w-1.5 rounded-full bg-rose-500 dot-pulse"></span>`:''}
          <span class="nav-tip pointer-events-none fixed whitespace-nowrap rounded-lg text-white text-[13px] font-semibold px-3.5 py-2 transition-opacity" style="background:#0f172a; box-shadow:0 4px 12px rgba(15,23,42,.25); z-index:99999; opacity:0; pointer-events:none;">
            ${item.label}
            <span aria-hidden="true" class="absolute top-1/2 -translate-y-1/2" style="left:-5px; width:0; height:0; border-top:6px solid transparent; border-bottom:6px solid transparent; border-right:6px solid #0f172a;"></span>
          </span>
        </${tag}>`;
      }).join('')}
    </nav>
    <div class="sidebar-logo sidebar-footer" style="border-top:1px solid var(--slate-200,#e2e8f0);padding:14px 16px;opacity:0;pointer-events:none;transition:opacity 150ms;display:flex;flex-direction:column;align-items:center;gap:8px">
      <a href="https://www.skytek.com" target="_blank" rel="noopener" title="skytek.com" style="display:block">
        <img src="${(window.__resources&&window.__resources.logoStacked)||'images/skytek-logo-stacked.png'}" alt="Skytek" style="width:76px;height:auto;display:block" />
      </a>
      <button type="button" id="sidebar-disclaimer-btn" style="background:none;border:0;color:var(--brand-600,#2563eb);font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;text-decoration:underline;padding:0">Disclaimer</button>
    </div>
  </aside>`;
}

function Topbar() {
  const id    = (window.PAGE && window.PAGE.id) || 'dash';
  const title = (window.PAGE && window.PAGE.title) || 'Dashboard';
  const crumb = (window.PAGE && window.PAGE.crumb) || 'Overview';
  const navItem = NAV.find(n => n.id === id);
  const titleEl = navItem
    ? `<a href="${navItem.href}" class="topbar-brand-link text-xs font-bold tracking-micro uppercase no-underline">${title}</a>`
    : `<span class="text-xs font-bold tracking-micro text-ink-900 uppercase">${title}</span>`;
  return `
  <header class="h-14 shrink-0 bg-white border-b border-ink-200 flex items-center px-4 gap-3 sticky top-0 z-30">
    <button id="mobile-menu-btn" class="md:hidden h-9 w-9 rounded-lg text-ink-700 hover:bg-ink-100 flex items-center justify-center ring-focus" title="Menu">${I.menu}</button>
    <div class="flex items-center gap-3 min-w-0 flex-1">
      ${titleEl}
      <div class="flex items-center gap-1 text-xs text-ink-400 min-w-0">
        <span class="shrink-0">/</span><span class="truncate">${crumb}</span>
      </div>
    </div>
    <div class="flex items-center gap-1 shrink-0">
      <button id="theme-toggle-btn" class="relative h-9 w-9 rounded-lg text-ink-500 hover:text-ink-800 hover:bg-ink-100 flex items-center justify-center ring-focus" title="Toggle dark mode"></button>
      <button id="notif-btn" class="relative h-9 w-9 rounded-lg text-ink-500 hover:text-ink-800 hover:bg-ink-100 flex items-center justify-center ring-focus" title="Notifications">
        ${I.bell}<span class="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-rose-500 dot-pulse"></span>
      </button>
      <div class="w-px h-6 bg-ink-200 mx-2"></div>
      <button id="user-btn" class="flex items-center gap-2.5 h-9 pr-1.5 pl-2 rounded-lg hover:bg-ink-100 ring-focus">
        <div class="hidden md:block text-right leading-tight">
          <div class="text-xs font-semibold text-ink-900">Paul Kiernan</div>
          <div class="text-[11px] text-ink-500">Risk Manager</div>
        </div>
        <div class="h-8 w-8 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
          <img src="${(window.__resources&&window.__resources.avatarPaul)||'images/avatar-paul-kiernan.avif'}" alt="Paul Kiernan" style="width:100%;height:100%;object-fit:cover" />
        </div>
      </button>
    </div>
    <div id="notif-pop" class="hidden fixed top-14 right-2 sm:right-16 left-2 sm:left-auto sm:w-[360px] max-w-[360px] sm:max-w-none mx-auto sm:mx-0 bg-white border border-ink-200 rounded-xl shadow-card-hover overflow-hidden pop-enter" style="z-index:9999">
      <div class="flex items-center justify-between px-4 py-3 border-b border-ink-100">
        <div class="text-sm font-semibold text-ink-900">Notifications</div>
        <button class="text-xs text-brand-600 hover:underline">Mark all read</button>
      </div>
      <div class="max-h-[60vh] sm:max-h-[360px] overflow-y-auto scroll-thin divide-y divide-ink-100">
        ${NOTIFS.map(n => {
          const t = toneClasses(n.tone);
          return `<div class="flex items-start gap-3 p-3 hover:bg-ink-50 cursor-pointer">
            <div class="mt-0.5 h-8 w-8 rounded-lg ${t.bg} ${t.text} flex items-center justify-center shrink-0">${I.bell}</div>
            <div class="min-w-0 flex-1">
              <div class="text-sm font-medium text-ink-900 truncate">${n.t}</div>
              <div class="text-xs text-ink-500 mt-0.5 line-clamp-2">${n.sub}</div>
            </div>
            <div class="text-[11px] text-ink-400 shrink-0">${n.time}</div>
          </div>`;
        }).join('')}
      </div>
      <div class="px-4 py-2.5 border-t border-ink-100 bg-ink-50/60 text-center">
        <button class="text-xs font-medium text-brand-600 hover:underline">View all activity</button>
      </div>
    </div>
    <div id="user-pop" class="hidden fixed top-14 right-2 w-56 bg-white border border-ink-200 rounded-xl shadow-card-hover overflow-hidden pop-enter" style="z-index:9999">
      <div class="p-3 border-b border-ink-100">
        <div class="text-sm font-semibold text-ink-900">Paul Kiernan</div>
        <div class="text-xs text-ink-500">paul.k@realworld.co</div>
      </div>
      <div class="py-1 text-sm">
        <a href="Profile.html" class="flex items-center gap-2.5 w-full text-left px-3 py-1.5 hover:bg-ink-100 text-ink-700 no-underline"><span class="text-ink-500">${SVG_USER}</span>My profile</a>
        <button class="flex items-center gap-2.5 w-full text-left px-3 py-1.5 hover:bg-ink-100 text-ink-700"><span class="text-ink-500">${SVG_HELP}</span>Support</button>
        <a href="Administration.html" class="flex items-center gap-2.5 w-full text-left px-3 py-1.5 hover:bg-ink-100 text-ink-700 no-underline"><span class="text-ink-500">${SVG_SHIELD}</span>Administration</a>
      </div>
      <div class="py-1 border-t border-ink-100 text-sm">
        ${PROFILE_LINKS.map(l => `<a href="${l.href}" class="flex items-center gap-2.5 w-full text-left px-3 py-1.5 hover:bg-ink-100 text-ink-700 no-underline"><span class="text-ink-500">${l.icon}</span>${l.label}</a>`).join('')}
      </div>
      <div class="py-1 border-t border-ink-100">
        <a href="index.html" class="flex items-center gap-2.5 w-full text-left px-3 py-1.5 hover:bg-ink-100 text-rose-600 text-sm no-underline"><span>${SVG_SIGNOUT}</span>Sign out</a>
      </div>
    </div>
  </header>`;
}

/* Tweaks */
const TWEAK_DEFAULTS_SHARED = { density:'compact', accent:'blue', sidebarExpanded:false, showSparklines:true };
let TWEAKS = { ...TWEAK_DEFAULTS_SHARED, ...(window.TWEAK_DEFAULTS || {}) };
/* Sidebar open/closed is a cross-page runtime preference: a value saved to
   localStorage overrides whatever default is baked into this page's TWEAK_DEFAULTS,
   so collapsing it on one page keeps it collapsed everywhere. */
try {
  const savedSidebar = localStorage.getItem('rw_sidebar');
  if (savedSidebar !== null) TWEAKS.sidebarExpanded = savedSidebar === 'true';
} catch {}
let editMode = false;

function TweaksPanel() {
  if (!editMode) return '';
  return `
  <div class="fixed bottom-4 right-4 w-[280px] bg-white border border-ink-200 rounded-xl shadow-card-hover z-[10000] overflow-hidden">
    <div class="flex items-center justify-between px-3 py-2 border-b border-ink-100 bg-ink-50">
      <div class="text-xs font-bold tracking-micro uppercase text-ink-700">Tweaks</div>
    </div>
    <div class="p-3 space-y-3 text-sm">
      <label class="block">
        <div class="text-[11px] font-semibold text-ink-600 mb-1 uppercase tracking-micro">Density</div>
        <div class="grid grid-cols-2 gap-1 bg-ink-100 p-1 rounded-lg">
          ${['comfortable','compact'].map(v => `
            <button data-tweak-density="${v}" class="text-xs py-1 rounded-md ${TWEAKS.density===v?'bg-white shadow-sm font-semibold text-ink-900':'text-ink-500'}">${v}</button>`).join('')}
        </div>
      </label>
      <label class="block">
        <div class="text-[11px] font-semibold text-ink-600 mb-1 uppercase tracking-micro">Accent</div>
        <div class="grid grid-cols-4 gap-2">
          ${[['blue','#2563eb'],['indigo','#4f46e5'],['teal','#0d9488'],['rose','#e11d48']].map(([n,c]) => `
            <button data-tweak-accent="${n}" class="h-8 rounded-md border ${TWEAKS.accent===n?'ring-2 ring-ink-900':'border-ink-200'}" style="background:${c}"></button>`).join('')}
        </div>
      </label>
      <label class="flex items-center justify-between gap-2">
        <span class="text-xs text-ink-700">Expanded sidebar</span>
        <button data-tweak-toggle="sidebarExpanded" class="relative h-5 w-9 rounded-full ${TWEAKS.sidebarExpanded?'bg-brand-600':'bg-ink-300'}">
          <span class="absolute top-0.5 ${TWEAKS.sidebarExpanded?'left-4':'left-0.5'} h-4 w-4 rounded-full bg-white shadow transition-all"></span>
        </button>
      </label>
    </div>
  </div>`;
}

function getTheme() {
  try { return localStorage.getItem('rw_theme') || 'light'; } catch { return 'light'; }
}
const THEME_ACCENT = { sky:'sky', light:'azure', dark:'sky' };
function setTheme(id) {
  try { localStorage.setItem('rw_theme', id); } catch {}
  // Map theme to a distinct accent palette (light→dark blue ramp)
  TWEAKS.accent = THEME_ACCENT[id] || 'sky';
  applyTweaks();
}

/* ── Dark theme: retrofit surface/text/border remap over the whole app ──────
   The app is class-based (Tailwind ink/slate + .bg-white) with inline-hex
   accents on detail pages. We remap both under html[data-theme="dark"]. */
function buildDarkCss() {
  const bg      = '#0d1420';  // app background
  const surf    = '#161f2e';  // cards / bg-white
  const surf2   = '#1e293b';  // raised: bg-ink-50/100, table headers
  const surf3   = '#243044';  // hover raised
  const bd      = '#2a374d';  // borders
  const bdSoft  = '#212d40';  // subtle borders
  const tx      = '#e7ecf4';  // primary text
  const tx2     = '#c0c9d8';  // secondary text
  const tx3     = '#93a0b4';  // muted text
  const tx4     = '#6f7d93';  // faint text
  const D = 'html[data-theme="dark"]';
  return `
  ${D} {
    /* Light slate primitives → dark surfaces/borders (keep --white and dark
       slates 700-900 intact so inverse text + dark tooltips stay correct) */
    --slate-50:#1b2537; --slate-100:#202c40; --slate-150:#243044;
    --slate-200:#2a374d; --slate-300:#34435c;
    --slate-400:#7e8ca3; --slate-500:#93a0b4; --slate-600:#c0c9d8;
    /* Semantic tokens overridden directly (win over their var() defaults) */
    --bg-app:#0d1420; --bg-canvas:#0d1420; --bg-surface:${surf}; --bg-raised:${surf2};
    --bg-sunken:${surf2}; --bg-muted:#202c40;
    --border-subtle:${bdSoft}; --border-default:${bd}; --border-strong:#34435c;
    --text-primary:${tx}; --text-secondary:${tx2}; --text-muted:${tx3}; --text-disabled:${tx4};
    scrollbar-color:#3a4a66 transparent;
  }
  /* DS metric + table components */
  ${D} .ds-metric-value, ${D} .ds-metric-value--neutral { color:${tx} !important; }
  ${D} .ds-metric-label { color:${tx3} !important; }
  ${D} .ds-table th { background-color:${surf2} !important; color:${tx3} !important; border-color:${bd} !important; }
  ${D} .ds-table td { color:${tx2} !important; border-color:${bd} !important; }
  ${D} .porto-table th { background-color:${surf2} !important; }
  ${D} .porto-table th:first-child, ${D} .porto-table td:first-child { background-color:${surf} !important; box-shadow:1px 0 0 ${bd} !important; }
  ${D} .porto-table tr:hover td, ${D} .porto-table tbody tr:hover td:first-child { background-color:${surf3} !important; }

  /* Scrollbars — cover root (html/body), universal descendants, and the
     DS scrollbar classes; pages style these brand-blue in light mode. */
  ${D}::-webkit-scrollbar-thumb, ${D} body::-webkit-scrollbar-thumb, ${D} *::-webkit-scrollbar-thumb,
  ${D} .scroll-thin::-webkit-scrollbar-thumb, ${D} .ds-scroll::-webkit-scrollbar-thumb { background:#3a4a66 !important; border-radius:999px; }
  ${D}::-webkit-scrollbar-thumb:hover, ${D} body::-webkit-scrollbar-thumb:hover, ${D} *::-webkit-scrollbar-thumb:hover,
  ${D} .scroll-thin::-webkit-scrollbar-thumb:hover, ${D} .ds-scroll::-webkit-scrollbar-thumb:hover { background:#4a5d80 !important; }
  ${D}::-webkit-scrollbar-track, ${D} body::-webkit-scrollbar-track, ${D} *::-webkit-scrollbar-track,
  ${D} .scroll-thin::-webkit-scrollbar-track, ${D} .ds-scroll::-webkit-scrollbar-track { background:transparent !important; }
  ${D}, ${D} body, ${D} .scroll-thin, ${D} .ds-scroll { scrollbar-color:#3a4a66 transparent !important; }

  /* Pastel brand/info strips (blue-tinted, not grayscale — scanner skips them) */
  ${D} [style*="background:#eff6ff"], ${D} [style*="background:#EFF6FF"], ${D} [style*="background:#e0f2fe"],
  ${D} [style*="background:#dbeafe"], ${D} [style*="background:#f0f9ff"], ${D} [style*="background:var(--brand-50"],
  ${D} [style*="background:var(--brand-050"] { background-color:#15233c !important; }
  /* Tailwind CDN blue/sky/indigo pastel tints (cross-origin sheet — scanner can't reach) */
  ${D} .bg-blue-50, ${D} .bg-sky-50, ${D} .bg-indigo-50, ${D} .bg-cyan-50 { background-color:#15233c !important; }
  ${D} .bg-blue-100, ${D} .bg-sky-100, ${D} .bg-indigo-100 { background-color:#1a2b47 !important; }
  ${D} .border-blue-100, ${D} .border-sky-100, ${D} .border-indigo-100, ${D} .border-blue-200, ${D} .border-sky-200 { border-color:#2a3d5e !important; }
  ${D} [style*="border:1px solid #dbeafe"], ${D} [style*="border-color:#dbeafe"], ${D} [style*="solid #e0eaff"],
  ${D} [style*="border-color:#e0f2fe"] { border-color:${bd} !important; }

  ${D} body, ${D} .bg-ink-100, ${D} .bg-slate-100, ${D} .bg-slate-50 { background-color:${bg} !important; color:${tx}; }
  ${D} .bg-white { background-color:${surf} !important; }
  ${D} .bg-ink-50, ${D} .bg-ink-50\\/60, ${D} .bg-ink-50\\/40 { background-color:${surf2} !important; }
  ${D} .bg-ink-100 { background-color:${surf2} !important; }

  ${D} .text-ink-900, ${D} .text-ink-800, ${D} .text-slate-900, ${D} .text-slate-800 { color:${tx} !important; }
  ${D} .text-ink-700, ${D} .text-ink-600, ${D} .text-slate-700, ${D} .text-slate-600 { color:${tx2} !important; }
  ${D} .text-ink-500, ${D} .text-ink-400, ${D} .text-slate-500, ${D} .text-slate-400 { color:${tx3} !important; }
  ${D} .text-ink-300, ${D} .text-slate-300 { color:${tx4} !important; }

  ${D} .border-ink-100, ${D} .border-ink-200, ${D} .border-slate-100, ${D} .border-slate-200,
  ${D} .border, ${D} .border-b, ${D} .border-t, ${D} .border-l, ${D} .border-r,
  ${D} .divide-ink-100 > * + *, ${D} .divide-ink-200 > * + * { border-color:${bd} !important; }

  ${D} .shadow-card, ${D} .shadow-card-hover, ${D} .shadow-sm, ${D} .shadow { box-shadow:0 1px 3px rgba(0,0,0,.5), 0 1px 2px rgba(0,0,0,.4) !important; }

  ${D} .hover\\:bg-ink-100:hover, ${D} .hover\\:bg-ink-50:hover, ${D} .hover\\:bg-slate-100:hover, ${D} .hover\\:bg-slate-50:hover { background-color:${surf3} !important; }
  ${D} .hover\\:text-ink-800:hover, ${D} .hover\\:text-ink-900:hover { color:${tx} !important; }
  ${D} .ring-white { --tw-ring-color:${surf2} !important; }
  ${D} .divide-ink-100 { border-color:${bd}; }
  ${D} .text-brand-600 { color:#2d7ffb !important; }

  /* Selected tabs & active nav must stay white (beats the .text-ink-* / autogen remaps) */
  ${D} .ds-tab[aria-selected="true"], ${D} .ds-tab[aria-selected="true"] .ds-tab-label,
  ${D} .cat-tab[aria-selected="true"], ${D} .cat-tab[aria-selected="true"] .cat-tab-label,
  ${D} .seg-tab.active, ${D} .ptab.active, ${D} .stab-btn.active,
  ${D} [role="tab"][aria-selected="true"] { color:#fff !important; }
  /* Segmented-toggle pill containers built on --brand-50 (a class, so the
     var()-skipping scanner can't reach them) */
  ${D} .stab, ${D} .seg, ${D} .segmented, ${D} .ptab-group { background-color:#15233c !important; }

  /* Leaflet popups — wrapper/tip come from cross-origin Leaflet CSS (white),
     while inline text is already remapped light → force a dark surface so the
     popup body reads correctly. Coloured headers use inline var(--brand) → kept. */
  ${D} .leaflet-popup-content-wrapper { background-color:${surf} !important; color:${tx} !important; }
  ${D} .leaflet-popup-tip { background-color:${surf} !important; }
  ${D} .leaflet-popup-content [style*="border-bottom:1px solid #f8fafc"],
  ${D} .leaflet-popup-content [style*="border-bottom:1px solid #e2e8f0"],
  ${D} .leaflet-popup-content [style*="border-top:1px solid #e2e8f0"] { border-color:${bd} !important; }
  ${D} .leaflet-popup-content [style*="border-top:1.5px dashed #cbd5e1"],
  ${D} .leaflet-popup-content [style*="dashed #cbd5e1"] { border-color:#3a4a66 !important; }
  ${D} .leaflet-tooltip { background-color:${surf} !important; color:${tx} !important; border-color:${bd} !important; }
  ${D} .leaflet-tooltip-top:before, ${D} .leaflet-tooltip-bottom:before,
  ${D} .leaflet-tooltip-left:before, ${D} .leaflet-tooltip-right:before { border-top-color:${surf} !important; border-bottom-color:${surf} !important; }
  ${D} .nav-item.is-nav-active, ${D} .nav-item.is-nav-active .nav-label,
  ${D} .nav-item.is-nav-active .nav-ico { color:#fff !important; }

  /* Sidebar + topbar chrome */
  ${D} #sidebar, ${D} header.sticky { background-color:${surf} !important; border-color:${bd} !important; }

  /* Common component classes shared across pages */
  ${D} .form-input, ${D} .form-select, ${D} .form-date-input, ${D} .filt-sel, ${D} .sel,
  ${D} .tab-dd, ${D} .mobile-tab-select, ${D} .map-btn, ${D} .reports-tabs-dd {
    background-color:${surf2} !important; color:${tx} !important; border-color:${bd} !important;
  }
  ${D} .map-btn { color:${tx2} !important; }
  ${D} .analytics-panel, ${D} .ev-card { background-color:${surf} !important; }
  ${D} .ev-card { border-color:${bdSoft} !important; }
  ${D} .ev-card:hover { background-color:${surf2} !important; }
  ${D} .ev-card.active { background-color:${surf3} !important; }
  ${D} .scroll-thin::-webkit-scrollbar-thumb { background:${surf3} !important; }

  /* Inline-hex surfaces → dark. Semicolon/6-digit forms avoid matching #fff7ed etc. */
  ${D} [style*="background:#fff;"], ${D} [style*="background: #fff;"],
  ${D} [style*="background:#ffffff"], ${D} [style*="background: #ffffff"],
  ${D} [style*="background-color:#fff;"], ${D} [style*="background-color:#ffffff"],
  ${D} [style*="background:#fff "], ${D} [style*="background:#FFFFFF"],
  ${D} [style*="background:#fff url"], ${D} [style*="background:white"] { background-color:${surf} !important; }

  ${D} [style*="background:#f9fafb"], ${D} [style*="background:#f8fafc"], ${D} [style*="background:#f1f5f9"],
  ${D} [style*="background:#f3f4f6"], ${D} [style*="background:#fafafa"], ${D} [style*="background:#f5f5f5"],
  ${D} [style*="background:#eef2f6"], ${D} [style*="background:#F9FAFB"], ${D} [style*="background:#eceef2"],
  ${D} [style*="background-color:#f9fafb"], ${D} [style*="background-color:#f1f5f9"] { background-color:${surf2} !important; }

  /* Inline-hex text (dark → light) */
  ${D} [style*="color:#0f172a"], ${D} [style*="color:#111827"], ${D} [style*="color:#1e293b"],
  ${D} [style*="color:#0b1e2e"], ${D} [style*="color:#1f2937"], ${D} [style*="color:#0f1623"],
  ${D} [style*="color: #0f172a"], ${D} [style*="color:#111"] { color:${tx} !important; }
  ${D} [style*="color:#334155"], ${D} [style*="color:#374151"], ${D} [style*="color:#475569"],
  ${D} [style*="color:#4b5563"], ${D} [style*="color: #334155"] { color:${tx2} !important; }
  ${D} [style*="color:#64748b"], ${D} [style*="color:#6b7280"], ${D} [style*="color:#94a3b8"],
  ${D} [style*="color:#9ca3af"], ${D} [style*="color:#cbd5e1"] { color:${tx3} !important; }

  /* Inline-hex borders */
  ${D} [style*="border-color:#e2e8f0"], ${D} [style*="border-color:#e5e7eb"], ${D} [style*="border-color:#f1f5f9"],
  ${D} [style*="border-color:#f3f4f6"], ${D} [style*="border-color:#eceef2"], ${D} [style*="border-color:#eef2f6"],
  ${D} [style*="solid #e2e8f0"], ${D} [style*="solid #e5e7eb"], ${D} [style*="solid #f1f5f9"],
  ${D} [style*="solid #ECEEF2"], ${D} [style*="solid #eceef2"] { border-color:${bd} !important; }
  `;
}

function applyDarkTheme(on) {
  document.documentElement.setAttribute('data-theme', on ? 'dark' : 'light');
  let s = document.getElementById('rw-dark-theme');
  if (!s) { s = document.createElement('style'); s.id = 'rw-dark-theme'; document.head.appendChild(s); }
  s.textContent = on ? buildDarkCss() : '';

  // Auto-generated overrides for PAGE-LOCAL classes (e.g. .pcard{background:#fff})
  // that neither .bg-white nor an inline style would catch. We scan every
  // same-origin stylesheet for rules that set a light grayscale background or a
  // dark grayscale text/border colour and emit a dark-scoped override with the
  // same selector, so no light-on-light or dark-on-dark can survive.
  let a = document.getElementById('rw-dark-autogen');
  if (!a) { a = document.createElement('style'); a.id = 'rw-dark-autogen'; document.head.appendChild(a); }
  a.textContent = on ? buildDarkAutogen() : '';
}

// --- colour helpers ---------------------------------------------------------
function _dtParseColor(str) {
  if (!str) return null;
  str = str.trim();
  if (str.indexOf('var(') !== -1 || str.indexOf('gradient') !== -1) return null;
  let m = str.match(/^#([0-9a-f]{3})$/i);
  if (m) { const h = m[1]; return { r:parseInt(h[0]+h[0],16), g:parseInt(h[1]+h[1],16), b:parseInt(h[2]+h[2],16) }; }
  m = str.match(/^#([0-9a-f]{6})$/i);
  if (m) { const h = m[1]; return { r:parseInt(h.slice(0,2),16), g:parseInt(h.slice(2,4),16), b:parseInt(h.slice(4,6),16) }; }
  m = str.match(/^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  if (m) return { r:+m[1], g:+m[2], b:+m[3] };
  return null;
}
function _dtLum(c) { return 0.299*c.r + 0.587*c.g + 0.114*c.b; }
// "Neutral" = pure grey OR a cool slate tint (the slate ramp spans a spread of
// up to ~40 between channels, e.g. #334155). We accept low-spread colours, and
// slightly-higher-spread ones only when they lean cool (blue >= red), which
// keeps warm accents (amber/red) and saturated blues out.
function _dtGray(c) {
  const spread = Math.max(c.r,c.g,c.b) - Math.min(c.r,c.g,c.b);
  if (spread <= 26) return true;
  if (spread <= 48 && c.b >= c.r - 4 && c.g >= c.r - 4) return true; // cool slate
  return false;
}

function buildDarkAutogen() {
  const surf   = '#161f2e', surf2 = '#1e293b';
  const tx = '#e7ecf4', tx2 = '#c0c9d8', tx3 = '#93a0b4';
  const bd = '#2a374d';
  const DP = 'html[data-theme="dark"] ';
  const out = [];
  const skipIds = new Set(['rw-dark-theme','rw-dark-autogen','tweak-accent-style','rw-leaflet-stack','rw-font-overrides','chrome-ico-style']);

  const scopeSel = (selText) => selText.split(',').map(p => {
    p = p.trim();
    if (!p) return '';
    // Prefix each selector with the dark scope for specificity + gating.
    return DP + p;
  }).filter(Boolean).join(', ');

  const handleRule = (rule) => {
    const st = rule.style; if (!st) return '';
    const decls = [];
    // Background
    const bgC = _dtParseColor(st.backgroundColor || (st.background && st.background.split(/\s+url|\s+linear|\s+radial/)[0]));
    if (bgC && _dtGray(bgC)) {
      const L = _dtLum(bgC);
      if (L >= 251) decls.push(`background-color:${surf} !important`);
      else if (L >= 205) decls.push(`background-color:${surf2} !important`);
    }
    // Text
    const txC = _dtParseColor(st.color);
    if (txC && _dtGray(txC)) {
      const L = _dtLum(txC);
      if (L <= 60) decls.push(`color:${tx} !important`);
      else if (L <= 115) decls.push(`color:${tx2} !important`);
      else if (L <= 150) decls.push(`color:${tx3} !important`);
    }
    // Borders
    const bC = _dtParseColor(st.borderColor || st.borderTopColor || st.borderBottomColor || st.borderLeftColor || st.borderRightColor);
    if (bC && _dtGray(bC) && _dtLum(bC) >= 200) decls.push(`border-color:${bd} !important`);
    if (!decls.length) return '';
    const sel = scopeSel(rule.selectorText || '');
    if (!sel) return '';
    return `${sel}{${decls.join(';')}}`;
  };

  const walk = (rules) => {
    for (const rule of rules) {
      if (rule.type === 1 /* STYLE_RULE */) {
        const css = handleRule(rule);
        if (css) out.push(css);
      } else if (rule.type === 4 /* MEDIA_RULE */ && rule.cssRules) {
        const inner = [];
        for (const r2 of rule.cssRules) { if (r2.type === 1) { const c = handleRule(r2); if (c) inner.push(c); } }
        if (inner.length) out.push(`@media ${rule.conditionText || (rule.media && rule.media.mediaText) || 'all'}{${inner.join('')}}`);
      }
    }
  };

  for (const sheet of document.styleSheets) {
    try {
      if (sheet.ownerNode && skipIds.has(sheet.ownerNode.id)) continue;
      const rules = sheet.cssRules; // throws for cross-origin (Tailwind CDN) — skipped
      if (rules) walk(rules);
    } catch (e) { /* cross-origin or inaccessible — skip */ }
  }
  return out.join('\n');
}

function applyTweaks() {
  // Apply global theme from localStorage before resolving accent
  const storedTheme = getTheme();
  if (storedTheme in THEME_ACCENT) TWEAKS.accent = THEME_ACCENT[storedTheme];

  document.body.dataset.density = TWEAKS.density;
  document.body.dataset.sparklines = TWEAKS.showSparklines ? 'on' : 'off';
  const accentMap = {
    blue:   {50:'#eff6ff',100:'#dbeafe',200:'#bfdbfe',300:'#93c5fd',400:'#60a5fa',500:'#3b82f6',600:'#2563eb',700:'#1d4ed8',800:'#1e40af'},
    indigo: {50:'#eef2ff',100:'#e0e7ff',200:'#c7d2fe',300:'#a5b4fc',400:'#818cf8',500:'#6366f1',600:'#4f46e5',700:'#4338ca',800:'#3730a3'},
    teal:   {50:'#f0fdfa',100:'#ccfbf1',200:'#99f6e4',300:'#5eead4',400:'#2dd4bf',500:'#14b8a6',600:'#0d9488',700:'#0f766e',800:'#115e59'},
    rose:   {50:'#fff1f2',100:'#ffe4e6',200:'#fecdd3',300:'#fda4af',400:'#fb7185',500:'#f43f5e',600:'#e11d48',700:'#be123c',800:'#9f1239'},
    sky:    {50:'#eff6ff',100:'#dbeafe',200:'#c3dafd',300:'#bfdbfe',400:'#8ec5fd',500:'#51a2fc',600:'#2d7ffb',700:'#1f5fc7',800:'#1a4fa0'},
    azure:  {50:'#eff8fd',100:'#dceffb',200:'#b8ddf5',300:'#84c5ec',400:'#43a8df',500:'#1a92d1',600:'#1485c5',700:'#0f6aa0',800:'#0d5580'},
    navy:   {50:'#eef2ff',100:'#dbe2f5',200:'#b6c4e8',300:'#8197cf',400:'#4f6bb0',500:'#2e4a8f',600:'#1e3a8a',700:'#172e6e',800:'#11224f'},
  };
  const c = accentMap[TWEAKS.accent] || accentMap.sky;
  let style = document.getElementById('tweak-accent-style');
  if (!style) { style = document.createElement('style'); style.id='tweak-accent-style'; document.head.appendChild(style); }
  style.textContent = `
    :root{--brand-50:${c[50]};--brand-100:${c[100]};--brand-200:${c[200]};--brand-300:${c[300]};--brand-400:${c[400]};--brand-500:${c[500]};--brand-600:${c[600]};--brand-700:${c[700]};--brand-800:${c[800]}}
    .bg-brand-50{background-color:${c[50]}!important}.bg-brand-100{background-color:${c[100]}!important}
    .bg-brand-500{background-color:${c[500]}!important}.bg-brand-600{background-color:${c[600]}!important}
    .bg-brand-700{background-color:${c[700]}!important}
    .text-brand-500{color:${c[500]}!important}.text-brand-600{color:${c[600]}!important}.text-brand-700{color:${c[700]}!important}
    .border-brand-300{border-color:${c[300]}!important}.border-brand-500{border-color:${c[500]}!important}
    .ring-brand-100{--tw-ring-color:${c[100]}!important}
    .hover\\:bg-brand-600:hover{background-color:${c[600]}!important}.hover\\:border-brand-300:hover{border-color:${c[300]}!important}
    .hover\\:text-brand-700:hover{color:${c[700]}!important}
    .via-brand-400{--tw-gradient-stops:var(--tw-gradient-from),${c[400]},var(--tw-gradient-to,transparent)!important}
    .from-brand-400{--tw-gradient-from:${c[400]}!important}.to-brand-600{--tw-gradient-to:${c[600]}!important}
    .nav-item.is-nav-active,.nav-item.is-nav-active:hover{background:${c[600]}!important;color:#fff!important}
    .nav-item.is-nav-active .nav-ico{color:#fff!important}
    .ds-tab-pill{background:${c[600]}!important}
    .asset-pill{background:${c[600]}!important}
    .cat-pill{background:${c[600]}!important}
    .ds-page-btn.is-active{background:${c[600]}!important;border-color:${c[600]}!important}
    .topbar-brand-link{color:${c[600]};transition:color 120ms}
    .topbar-brand-link:hover{color:${c[700]}}
  `;

  // ── Global dark theme ─────────────────────────────────────────────────────
  applyDarkTheme(storedTheme === 'dark');

  // Swap the sidebar Real World logo for the white variant in dark mode
  const logoImg = document.querySelector('img.sidebar-logo');
  if (logoImg) logoImg.src = storedTheme === 'dark'
    ? 'images/skytek-realworld-landscape-white.png'
    : 'images/skytek-realworld-landscape-color.png';
  // Swap the footer Skytek stacked logo too
  const footImg = document.querySelector('.sidebar-footer img');
  if (footImg) footImg.src = storedTheme === 'dark'
    ? 'images/skytek-logo-stacked-white.png'
    : 'images/skytek-logo-stacked.png';

  const sb = document.getElementById('sidebar');
  if (sb) {
    sb.style.width = TWEAKS.sidebarExpanded ? '212px' : '56px';
    sb.dataset.expanded = TWEAKS.sidebarExpanded ? 'true' : 'false';
    document.querySelectorAll('.nav-label').forEach(el => el.classList.toggle('hidden', !TWEAKS.sidebarExpanded));
    // Dismiss any open tooltips when sidebar state changes (avoids flash)
    if (typeof window._dismissNavTips === 'function') window._dismissNavTips();
  }
}

function wireChrome() {
  // Inject a small style block to normalize sidebar icon sizes (some Lucide aliases have
  // h-10 w-10 built in because they're reused as giant category glyphs on the home dashboard).
  if (!document.getElementById('chrome-ico-style')) {
    const s = document.createElement('style');
    s.id = 'chrome-ico-style';
    s.textContent = `.nav-ico svg { width:20px !important; height:20px !important; }
      .nav-item { transition: background-color .15s ease, color .15s ease, transform .18s cubic-bezier(.2,.8,.2,1); }
      .nav-ico { transition: transform .2s cubic-bezier(.2,.8,.2,1); }
      #sidebar[data-expanded="true"] .nav-item:not(.is-nav-active):hover { transform: translateX(3px); }
      .nav-item:not(.is-nav-active):hover .nav-ico { transform: scale(1.15); }
      .nav-item:not(.is-nav-active):active .nav-ico { transform: scale(.95); }
      @media (prefers-reduced-motion: reduce) { .nav-item, .nav-ico { transition: none !important; } .nav-item:hover, .nav-item:hover .nav-ico { transform: none !important; } }
      #sidebar:not([data-expanded="true"]) .nav-item { justify-content:center; padding-left:0; padding-right:0; }
      #sidebar[data-expanded="true"] .nav-item { justify-content:flex-start; }
      #sidebar:not([data-expanded="true"]) .sidebar-logo { display:none !important; }
      #sidebar:not([data-expanded="true"]) > div:first-child { justify-content:center; padding-left:0; padding-right:0; gap:0; }`;
    document.head.appendChild(s);
  }
  // Portal nav tooltips to <body> so they escape sidebar overflow + all stacking contexts.
  // Collect hide fns so applyTweaks can dismiss any open tip on sidebar toggle.
  const _tipHideFns = [];
  document.querySelectorAll('.nav-item').forEach(item => {
    const tip = item.querySelector('.nav-tip');
    if (!tip) return;
    const originalParent = tip.parentNode;
    const show = () => {
      if (TWEAKS.sidebarExpanded) return; // never show tooltips when sidebar is open
      const r = item.getBoundingClientRect();
      document.body.appendChild(tip);
      tip.style.top  = (r.top + r.height/2 - tip.offsetHeight/2) + 'px';
      tip.style.left = (r.right + 10) + 'px';
      tip.style.opacity = '1';
    };
    const hide = () => {
      tip.style.opacity = '0';
      if (tip.parentNode === document.body) originalParent.appendChild(tip);
    };
    _tipHideFns.push(hide);
    item.addEventListener('mouseenter', show);
    item.addEventListener('mouseleave', hide);
  });
  // Expose so applyTweaks can dismiss open tips on sidebar toggle
  window._dismissNavTips = () => _tipHideFns.forEach(fn => fn());
  const collapseBtn = document.getElementById('collapse-btn');
  if (collapseBtn) collapseBtn.onclick = (e) => {
    e.preventDefault();
    TWEAKS.sidebarExpanded = !TWEAKS.sidebarExpanded;
    applyTweaks(); persistTweaks();
  };
  // Disclaimer modal (link under the sidebar logo) — loads modals/DisclaimerModal.js on demand.
  // Wire every time wireChrome runs so a re-rendered button stays functional.
  const discBtn = document.getElementById('sidebar-disclaimer-btn');
  if (discBtn) {
    discBtn.onclick = () => {
      if (window.DisclaimerModal) { window.DisclaimerModal.open(); return; }
      let s = document.getElementById('disclaimer-modal-script');
      if (!s) {
        s = document.createElement('script');
        s.id = 'disclaimer-modal-script';
        s.src = 'modals/DisclaimerModal.js';
        s.onload = () => { if (window.DisclaimerModal) window.DisclaimerModal.open(); };
        document.body.appendChild(s);
      }
    };
  }

  // Mobile drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebarEl = document.getElementById('sidebar');
  const backdropEl = document.getElementById('sidebar-backdrop');
  const openMobile = () => {
    if (!sidebarEl) return;
    sidebarEl.classList.remove('max-md:-translate-x-full');
    sidebarEl.classList.add('max-md:translate-x-0');
    sidebarEl.style.width = '212px';
    sidebarEl.dataset.expanded = 'true';
    // Explicitly enforce left-aligned nav + logo (overrides any CSS that may still target collapsed state)
    const logoEl = sidebarEl.querySelector('.sidebar-logo');
    if (logoEl) { logoEl.style.opacity = '1'; logoEl.style.pointerEvents = 'auto'; logoEl.style.width = ''; logoEl.style.overflow = ''; }
    const headerDiv = sidebarEl.querySelector(':scope>div:first-child');
    if (headerDiv) { headerDiv.style.justifyContent = 'space-between'; headerDiv.style.paddingLeft = '8px'; headerDiv.style.paddingRight = '8px'; headerDiv.style.gap = '8px'; }
    sidebarEl.querySelectorAll('.nav-item').forEach(el => { el.style.justifyContent = 'flex-start'; el.style.paddingLeft = '8px'; el.style.paddingRight = '8px'; });
    document.querySelectorAll('.nav-label').forEach(el => el.classList.remove('hidden'));
    if (backdropEl) backdropEl.classList.remove('hidden');
  };
  const closeMobile = () => {
    if (!sidebarEl) return;
    sidebarEl.classList.add('max-md:-translate-x-full');
    sidebarEl.classList.remove('max-md:translate-x-0');
    if (backdropEl) backdropEl.classList.add('hidden');
    // Clear inline style overrides so applyTweaks re-applies correct state
    const logoEl = sidebarEl.querySelector('.sidebar-logo');
    if (logoEl) { logoEl.style.opacity = ''; logoEl.style.pointerEvents = ''; logoEl.style.width = ''; logoEl.style.overflow = ''; }
    const headerDiv = sidebarEl.querySelector(':scope>div:first-child');
    if (headerDiv) { headerDiv.style.justifyContent = ''; headerDiv.style.paddingLeft = ''; headerDiv.style.paddingRight = ''; headerDiv.style.gap = ''; }
    sidebarEl.querySelectorAll('.nav-item').forEach(el => { el.style.justifyContent = ''; el.style.paddingLeft = ''; el.style.paddingRight = ''; });
    applyTweaks();
  };
  if (mobileMenuBtn) mobileMenuBtn.onclick = (e) => { e.stopPropagation(); openMobile(); };
  if (backdropEl) backdropEl.onclick = closeMobile;
  const notifBtn = document.getElementById('notif-btn');
  const notifPop = document.getElementById('notif-pop');
  const userBtn  = document.getElementById('user-btn');
  const userPop  = document.getElementById('user-pop');
  // Move popups out of the sticky <header> (z-30 stacking context) and into <body>
  // so position:fixed + z-index:9999 actually wins against map controls (z-400+) and
  // Leaflet panes (z-1000). Without this, the header traps both popups beneath maps.
  if (notifPop && notifPop.parentElement !== document.body) document.body.appendChild(notifPop);
  if (userPop  && userPop.parentElement  !== document.body) document.body.appendChild(userPop);
  function closeAll(except) {
    if (notifPop && except!==notifPop) notifPop.classList.add('hidden');
    if (userPop  && except!==userPop)  userPop.classList.add('hidden');
  }
  if (notifBtn) notifBtn.onclick = (e) => { e.stopPropagation(); closeAll(notifPop); notifPop.classList.toggle('hidden'); };

  // Theme toggle (moon in light mode → dark; sun in dark mode → light)
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    const MOON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    const SUN  = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const syncIcon = () => {
      const dark = getTheme() === 'dark';
      themeBtn.innerHTML = dark ? SUN : MOON;
      themeBtn.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    };
    syncIcon();
    themeBtn.onclick = (e) => {
      e.stopPropagation();
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
      syncIcon();
    };
  }
  if (userBtn)  userBtn.onclick  = (e) => { e.stopPropagation(); closeAll(userPop);  userPop.classList.toggle('hidden'); };
  document.addEventListener('click', () => closeAll());

  document.querySelectorAll('[data-tweak-density]').forEach(b => b.onclick = () => {
    TWEAKS.density = b.dataset.tweakDensity; if (window.render) window.render(); applyTweaks(); persistTweaks();
  });
  document.querySelectorAll('[data-tweak-accent]').forEach(b => b.onclick = () => {
    TWEAKS.accent = b.dataset.tweakAccent; if (window.render) window.render(); applyTweaks(); persistTweaks();
  });
  document.querySelectorAll('[data-tweak-toggle]').forEach(b => b.onclick = () => {
    const k = b.dataset.tweakToggle;
    TWEAKS[k] = !TWEAKS[k]; if (window.render) window.render(); applyTweaks(); persistTweaks();
  });

  applyTweaks();
}

function persistTweaks() {
  try { localStorage.setItem('rw_sidebar', TWEAKS.sidebarExpanded ? 'true' : 'false'); } catch {}
  try { window.parent.postMessage({ type:'__edit_mode_set_keys', edits: TWEAKS }, '*'); } catch {}
}

window.addEventListener('message', (e) => {
  const d = e.data || {};
  if (d.type === '__activate_edit_mode')   { editMode = true;  if (window.render) window.render(); }
  if (d.type === '__deactivate_edit_mode') { editMode = false; if (window.render) window.render(); }
});
try { window.parent.postMessage({ type:'__edit_mode_available' }, '*'); } catch {}

/* helpers */
function sparkline(series, { w=120, h=28, color='currentColor', fill=true } = {}) {
  const min = Math.min(...series), max = Math.max(...series);
  const span = max - min || 1;
  const step = w / (series.length - 1);
  const pts = series.map((v,i) => [i*step, h - ((v-min)/span) * (h-4) - 2]);
  const line = pts.map((p,i) => (i===0?'M':'L') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = line + ` L ${w} ${h} L 0 ${h} Z`;
  return `<svg viewBox="0 0 ${w} ${h}" class="overflow-visible" preserveAspectRatio="none" width="${w}" height="${h}">
    ${fill?`<path d="${area}" fill="${color}" opacity=".08"/>`:''}
    <path d="${line}" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}
window.sharedChrome = { Sidebar, Topbar, TweaksPanel, wireChrome, applyTweaks, setTheme, getTheme, I, sparkline, toneClasses, NAV };
