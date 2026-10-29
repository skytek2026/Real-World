#!/usr/bin/env python3
"""
Builds system_map.html: a one-page map of every file in the Real World prototype.

Run from the repo root after adding, removing or renaming files:

    python3 tools/build_system_map.py

It reads the files tracked by git, works out each page's area (from the
window.PAGE id and the sidebar NAV in shared/chrome.js), its on-screen name and
breadcrumb, which pages use each shared file, and when each file last changed.
The output embeds that data into tools/system_map.template.html.
"""
import json, os, re, subprocess, sys
from collections import defaultdict
from datetime import datetime, timezone

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
os.chdir(ROOT)

def git(*args):
    return subprocess.run(['git', *args], capture_output=True, text=True, check=True).stdout

FILES = sorted(f for f in git('ls-files', '-z').split('\0') if f)
if 'system_map.html' not in FILES:
    FILES.append('system_map.html')
    FILES.sort()

# ---- last-changed date per file (one pass over history) ----
last_changed = {}
log = git('log', '--format=@@%cs', '--name-only', '--no-renames')
date = None
for line in log.splitlines():
    if line.startswith('@@'):
        date = line[2:]
    elif line and line not in last_changed:
        last_changed[line] = date

# Files changed but not yet committed (the map is normally rebuilt just before committing) count as changed today
today = datetime.now(timezone.utc).strftime('%Y-%m-%d')
for line in git('status', '--porcelain', '--no-renames').splitlines():
    path = line[3:].strip().strip('"')
    if path:
        last_changed[path] = today
last_changed['system_map.html'] = today

# ---- sidebar areas ----
chrome = open('shared/chrome.js', encoding='utf-8').read()
nav = re.findall(r"\{\s*id:'([a-z]+)',\s*label:'([^']+)'.*?href:'([^']+)'", chrome[chrome.index('const NAV'):chrome.index('];', chrome.index('const NAV'))])
AREA_ORDER = [label for _, label, _ in nav]
AREA_BY_ID = {pid: label for pid, label, _ in nav}
AREA_HOME = {label: href for _, label, href in nav}
EXTRA_AREAS = {  # page ids that aren't in the sidebar
    'admin': 'Admin & account', 'profile': 'Admin & account', 'support': 'Admin & account',
    'rulesets': 'Admin & account', 'orgs': 'Admin & account', 'extras': 'Admin & account',
}
AREA_ORDER += ['Admin & account', 'Sign-in & landing', 'Error pages', 'Design system & docs', 'Standalone & legacy']

# Pages whose window.PAGE doesn't say where they belong
AREA_OVERRIDE = {
    'index.html': 'Sign-in & landing', 'Login.html': 'Sign-in & landing', 'Landing Page.html': 'Sign-in & landing',
    'error_404.html': 'Error pages',
    'Skytek Design System.html': 'Design system & docs', 'Skytek Design System-print.html': 'Design system & docs',
    'Changelog.html': 'Design system & docs', 'Modal - Component Spec.html': 'Design system & docs',
    'system_map.html': 'Design system & docs',
    'VesselDetails-standalone.html': 'Standalone & legacy', 'Organisations Standalone.html': 'Standalone & legacy',
    'Sanction Compliance - Unverifiable.html': 'Standalone & legacy',
}
# On-screen names where the page title isn't descriptive enough
NAME_OVERRIDE = {
    'AssetOffshoreDetails.html': 'Offshore Energy Details',
    'VesselDetails.html': 'Vessel Details', 'VesselDetails-standalone.html': 'Vessel Details (standalone copy)',
    'VoyageHistory.html': 'Voyage History', 'VesselAffiliations.html': 'Vessel Affiliations',
    'MarinePortfolioDetails.html': 'Marine Portfolio Details', 'MarinePortfolioAffiliations.html': 'Marine Portfolio Affiliations',
    'Landing Page.html': 'Landing Page', 'index.html': 'Sign in (start page)', 'Login.html': 'Sign in',
    'MarineDashboard.html': 'Marine Dashboard', 'PropertyDashboard.html': 'Property Dashboard',
    'AviationDashboard.html': 'Aviation Dashboard', 'OffshoreDashboard.html': 'Offshore/Energy Dashboard',
    'Dashboard.html': 'Dashboard', 'AllPortfolios.html': 'All Portfolios', 'Regions.html': 'Regions',
    'CreateNewMarineRegion.html': 'Add Region (marine)', 'CreateNewRegion.html': 'Add Region',
    'Organisations Standalone.html': 'Organisations (standalone copy)',
    'WeeklyFleetReport.html': 'Weekly Fleet Monitoring Report (root copy)',
    'error_404.html': 'Page not found (404)', 'system_map.html': 'System map (this page)',
    'Skytek Design System-print.html': 'Skytek Design System (print)',
    'Modal - Component Spec.html': 'Modal component spec',
    'Sanction Compliance - Unverifiable.html': 'Sanction Compliance: Unverifiable subjects',
}

def page_meta(path):
    h = open(path, encoding='utf-8', errors='ignore').read()
    m = re.search(r"window\.PAGE\s*=\s*\{([^}]*)\}", h)
    pid = title = crumb = None
    if m:
        body = m.group(1)
        g = lambda k: (re.search(k + r"\s*:\s*'([^']*)'", body) or [None, None])[1]
        pid, title, crumb = g('id'), g('title'), g('crumb')
    t = re.search(r"<title>(.*?)</title>", h, re.S)
    tt = re.sub(r'\s+', ' ', t.group(1)).replace('&amp;', '&').strip() if t else ''
    base = re.split(r' — | · ', tt)[0].strip() if tt else os.path.basename(path)
    name = NAME_OVERRIDE.get(path, base or os.path.basename(path))
    area = AREA_OVERRIDE.get(path) or AREA_BY_ID.get(pid) or EXTRA_AREAS.get(pid)
    if path.startswith('reports/'):
        area = 'Reports'
    shown = ' / '.join(x for x in [title, crumb] if x) if title else None
    return dict(name=name, area=area or 'Other pages', shown=shown)

# ---- which pages reference each non-page file ----
PAGE_FILES = [f for f in FILES if f.endswith('.html') and ('/' not in f or f.startswith('reports/')) and os.path.exists(f)]
page_text = {f: open(f, encoding='utf-8', errors='ignore').read() for f in PAGE_FILES}
script_text = {f: open(f, encoding='utf-8', errors='ignore').read() for f in FILES
               if f.endswith(('.js', '.css', '.jsx', '.tsx')) and os.path.exists(f) and os.path.getsize(f) < 3_000_000}

def used_by(path):
    """Pages that load this file, directly or through a shared script that loads it."""
    base = os.path.basename(path)
    if path.startswith('flags/') or base in ('',):
        return []
    pat = re.compile(r'(?<![\w.-])' + re.escape(base) + r'(?![\w-])')
    direct = [p for p, t in page_text.items() if p != path and pat.search(t)]
    via = set()
    for s, t in script_text.items():
        if s != path and pat.search(t):
            sb = re.compile(r'(?<![\w.-])' + re.escape(os.path.basename(s)) + r'(?![\w-])')
            via.update(p for p, pt in page_text.items() if p != path and sb.search(pt))
    return sorted(set(direct) | via)

# ---- groups for non-page files ----
def file_group(path):
    top = path.split('/')[0] if '/' in path else ''
    ext = os.path.splitext(path)[1].lower()
    if top == 'shared': return 'Shared code'
    if top == 'modals': return 'Popups (modals)'
    if top == 'components': return 'Components'
    if top in ('_ds', 'design-ref') or path in ('styles.css',) or path.startswith('changelog'): return 'Design system files'
    if not top and (ext == '.jsx' or path.startswith('_')): return 'Design system files'   # Skytek Design System sections
    if top == 'vendor': return 'Third-party libraries'
    if top == 'reports': return 'Report styles & scripts'
    if top == 'data': return 'Data files'
    if top == 'tools': return 'Tools'
    if top == 'flags': return 'Flags'
    if top == 'images': return 'Images'
    if top == 'fonts': return 'Fonts'
    if top == 'uploads': return 'Uploads'
    if top == 'screenshots': return 'Screenshots'
    if ext in ('.md', '.txt'): return 'Notes & docs'
    if ext in ('.js', '.jsx', '.tsx', '.css'): return 'Shared code'
    return 'Other files'

GROUP_ORDER = ['Shared code', 'Popups (modals)', 'Components', 'Report styles & scripts', 'Design system files',
               'Third-party libraries', 'Data files', 'Images', 'Flags', 'Fonts', 'Uploads', 'Screenshots',
               'Notes & docs', 'Tools', 'Other files']
COLLAPSED = {'Third-party libraries', 'Images', 'Flags', 'Fonts', 'Uploads', 'Screenshots'}
WITH_USAGE = {'Shared code', 'Popups (modals)', 'Components', 'Report styles & scripts', 'Design system files',
              'Third-party libraries', 'Data files', 'Images', 'Fonts'}

pages, others = [], defaultdict(list)
for f in FILES:
    size = os.path.getsize(f) if os.path.exists(f) else 0
    rec = dict(path=f, changed=last_changed.get(f), size=size)
    is_page = f.endswith('.html') and ('/' not in f or f.startswith('reports/'))
    if is_page:
        rec.update(page_meta(f) if os.path.exists(f) else dict(name='System map (this page)', area='Design system & docs', shown=None))
        pages.append(rec)
    else:
        g = file_group(f)
        if g in WITH_USAGE:
            rec['usedBy'] = used_by(f)
        others[g].append(rec)

areas = []
for a in AREA_ORDER + sorted({p['area'] for p in pages} - set(AREA_ORDER)):
    items = sorted([p for p in pages if p['area'] == a], key=lambda p: (p['path'] != AREA_HOME.get(a), p['name'].lower()))
    if items:
        areas.append(dict(title=a, home=AREA_HOME.get(a), items=items))
groups = [dict(title=g, collapsed=g in COLLAPSED, items=others[g]) for g in GROUP_ORDER if others.get(g)]

head = git('rev-parse', '--short', 'HEAD').strip()
data = dict(
    generated=datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC'),
    commit=head, repo='skytek2026/Real-World', branch='main',
    live='https://skytek2026.github.io/Real-World/',
    total=len(FILES), pageCount=len(pages), areas=areas, groups=groups,
    allPaths=FILES,
)
tpl = open('tools/system_map.template.html', encoding='utf-8').read()
out = tpl.replace('/*__SYSTEM_MAP_DATA__*/null', json.dumps(data, ensure_ascii=False).replace('</', '<\\/'))
open('system_map.html', 'w', encoding='utf-8').write(out)
print(f"system_map.html: {len(FILES)} files, {len(pages)} pages, {len(areas)} areas, {len(groups)} file groups")
