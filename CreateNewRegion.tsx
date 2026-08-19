/* Add Region — create a monitored region by drawing on the map or adding HRA / Port / Country / Sea coverage. */
const { useState, useEffect, useRef } = React;
const SC = window.sharedChrome;

const MAP_TILES = {
  satellite:{ label:'Satellite',   url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', attr:'Tiles © Esri', bg:'#0b1220' },
  street:   { label:'Street View', url:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',                    attr:'© OpenStreetMap contributors', bg:'#e8e2d8' },
  dark:     { label:'Dark Mode',   url:'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',         attr:'© OpenStreetMap contributors © CARTO', bg:'#0b1220' },
  light:    { label:'Light Mode',  url:'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',        attr:'© OpenStreetMap contributors © CARTO', bg:'#f3f4f6' },
};
const MAP_TYPE_ORDER = ['satellite','street','dark','light'];
const REGION_TYPES = ['Monitored Region','Exclusion Region','Trading Area','War Risk Area','Sanctioned Area'];
const REGION_GROUPS = ['Other','Oil Fields','Ports','War Zones','Piracy','Trade Lanes'];
const COUNTRIES = ['Panama','Liberia','Marshall Islands','Singapore','Nigeria','Yemen','Somalia','Libya','Iran','Venezuela','Russia','Ukraine','Malta','Cyprus','Greece','Turkey'];
const COVERAGE_TABS = ['HRA','Port','Country','Sea'];
const HRAS = ['Gulf of Aden HRA','Indian Ocean HRA','Gulf of Guinea HRA','Southern Red Sea HRA','Strait of Hormuz HRA'];
const PORTS = ['Rotterdam','Singapore','Houston','Lagos','Novorossiysk','Fujairah','Santos','Shanghai'];
const SEAS = ['Black Sea','Red Sea','Baltic Sea','South China Sea','Sea of Azov','Persian Gulf','Mediterranean Sea'];
const COUNTRY_INCLUDES = ['Border','Internal Waters','Territorial Waters','EEZ','Border, Internal and Territorial Waters'];
const REGION_LIMIT = 10;
const QUOTA_KEY = 'rw_custom_regions_used';
function loadUsed() { try { const v = parseInt(localStorage.getItem(QUOTA_KEY), 10); if (!isNaN(v)) return Math.min(v, REGION_LIMIT); } catch (e) {} return 7; }
const DRAW_TOOLS = [
  { id:'rect',    label:'Draw rectangle',  icon:'Square' },
  { id:'polygon', label:'Draw polygon',    icon:'Pentagon' },
  { id:'freehand',label:'Freehand select', icon:'Lasso' },
  { id:'erase',   label:'Clear selection', icon:'Eraser' },
];
const REACT_SVG_ATTRS = { 'stroke-width':'strokeWidth','stroke-linecap':'strokeLinecap','stroke-linejoin':'strokeLinejoin','stroke-dasharray':'strokeDasharray','stroke-dashoffset':'strokeDashoffset','fill-rule':'fillRule','clip-rule':'clipRule','stroke-miterlimit':'strokeMiterlimit' };
const camelAttrs = (o) => Object.fromEntries(Object.entries(o||{}).map(([k,v]) => [REACT_SVG_ATTRS[k] || k, v]));

function icon(name, size) {
  const d = window.lucide && window.lucide.icons && window.lucide.icons[name];
  if (!d) return null;
  const [tag, attrs, ch] = d;
  return React.createElement(tag, { ...camelAttrs(attrs), width:size||14, height:size||14, key:name },
    (ch||[]).map(([t,ca],i)=>React.createElement(t,{...camelAttrs(ca),key:i})));
}

function Field({ label, children, hint }) {
  return (
    <div className="grid items-center gap-3" style={{gridTemplateColumns:'190px minmax(0,1fr)'}}>
      <label className="cnr-label">{label}{hint ? <span className="block text-[11px] font-normal text-ink-400 mt-0.5">{hint}</span> : null}</label>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function RegionMap({ mapType, tool }) {
  const ref = useRef(null);
  const mapRef = useRef(null);
  useEffect(() => {
    const map = L.map(ref.current, { center:[24,10], zoom:2, zoomControl:true, scrollWheelZoom:true, worldCopyJump:true });
    mapRef.current = map;
    L.tileLayer(MAP_TILES[mapType].url, { attribution:MAP_TILES[mapType].attr, maxZoom:16 }).addTo(map);
    ref.current.style.background = MAP_TILES[mapType].bg;
    setTimeout(() => map.invalidateSize(), 120);
    return () => map.remove();
  }, [mapType]);
  useEffect(() => {
    const el = ref.current;
    if (el) el.style.cursor = tool && tool !== 'erase' ? 'crosshair' : '';
  }, [tool]);
  return <div ref={ref} className="absolute inset-0" style={{zIndex:0}}></div>;
}

function AddRegion() {
  const [name, setName] = useState('');
  const [valueThreshold, setValueThreshold] = useState('0');
  const [vesselThreshold, setVesselThreshold] = useState('0');
  const [regionType, setRegionType] = useState(REGION_TYPES[0]);
  const [regionGroup, setRegionGroup] = useState(REGION_GROUPS[0]);
  const [historyValuations, setHistoryValuations] = useState(false);
  const [tab, setTab] = useState('Country');
  const [country, setCountry] = useState('');
  const [includes, setIncludes] = useState(['Border']);
  const [hra, setHra] = useState('');
  const [port, setPort] = useState('');
  const [sea, setSea] = useState('');
  const [added, setAdded] = useState([]);
  const [mapType, setMapType] = useState('light');
  const [layersOpen, setLayersOpen] = useState(false);
  const [tool, setTool] = useState(null);
  const [used] = useState(loadUsed);
  const remaining = Math.max(0, REGION_LIMIT - used);
  const atLimit = remaining === 0;
  const nearLimit = !atLimit && remaining <= 2;
  const quotaTone = atLimit ? { fg:'#b91c1c', bg:'#fef2f2', bd:'#fecaca', dot:'#dc2626' }
                  : nearLimit ? { fg:'#b45309', bg:'#fffbeb', bd:'#fde68a', dot:'#f59e0b' }
                  : { fg:'var(--brand-700,#1d4ed8)', bg:'var(--brand-50,#eff6ff)', bd:'var(--brand-200,#bfdbfe)', dot:'var(--brand-600,#2563eb)' };
  const saveRegion = () => {
    if (atLimit) return;
    try { localStorage.setItem(QUOTA_KEY, String(used + 1)); } catch (e) {}
    window.location.href = 'Regions.html';
  };

  const toggleInclude = (v) => setIncludes(s => s.includes(v) ? s.filter(x => x !== v) : [...s, v]);
  const pending = { HRA:hra, Port:port, Country:country, Sea:sea }[tab];
  const addCoverage = () => {
    if (!pending) return;
    const detail = tab === 'Country' ? (includes.join(', ') || '—') : null;
    setAdded(a => [...a, { kind:tab, value:pending, detail }]);
    if (tab === 'Country') setCountry(''); else if (tab === 'HRA') setHra(''); else if (tab === 'Port') setPort(''); else setSea('');
  };

  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="bg-white rounded-lg border border-ink-200 shadow-card overflow-hidden">
        <div className="px-4 py-3 border-b border-ink-200 flex items-center gap-2">
          <span className="text-brand-600 flex">{icon('MapPlus',16) || icon('Map',16)}</span>
          <h1 className="text-sm font-semibold text-ink-900">Add Region</h1>
        </div>
        <div className="cnr-cols grid" style={{gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)'}}>
          {/* Form column */}
          <div className="p-4 flex flex-col gap-3 border-r border-ink-100">
          <div className="flex items-center gap-3 px-3 py-2.5 flex-wrap rounded-lg" style={{background:quotaTone.bg,border:'1px solid '+quotaTone.bd}}>
            <span style={{width:'30px',height:'30px',borderRadius:'8px',background:'#fff',border:'1px solid '+quotaTone.bd,color:quotaTone.dot,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              {icon(atLimit ? 'CircleAlert' : nearLimit ? 'TriangleAlert' : 'Map', 16)}
            </span>
            <div className="min-w-0">
              <div className="text-sm font-bold" style={{color:quotaTone.fg}}>
                {atLimit ? 'Custom region limit reached — ' + REGION_LIMIT + ' of ' + REGION_LIMIT + ' used'
                         : used + ' of ' + REGION_LIMIT + ' custom regions used'}
              </div>
              <div className="text-xs" style={{color:quotaTone.fg,opacity:.85}}>
                {atLimit
                  ? 'Delete an existing custom region on the Regions page before creating a new one.'
                  : 'You can create ' + (remaining === 1 ? '1 more region' : remaining + ' more regions') + ' on this plan. This one will be number ' + (used + 1) + '.'}
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2.5">
              <div className="flex items-center gap-[3px]" title={used + ' of ' + REGION_LIMIT + ' custom regions used'}>
                {Array.from({length:REGION_LIMIT}).map((_,i) => (
                  <span key={i} style={{width:'9px',height:'18px',borderRadius:'2px',background:i < used ? quotaTone.dot : '#fff',border:'1px solid '+(i < used ? quotaTone.dot : quotaTone.bd)}}></span>
                ))}
              </div>
              <span className="text-lg font-extrabold whitespace-nowrap" style={{color:quotaTone.fg,fontVariantNumeric:'tabular-nums'}}>{used}<span className="text-sm font-bold" style={{opacity:.6}}>/{REGION_LIMIT}</span></span>
            </div>
          </div>
            <Field label="Name:">
              <input className="cnr-input" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. North Sea Block A" list="cnr-name-suggestions" />
              <datalist id="cnr-name-suggestions"><option>North Sea Block A</option><option>Gulf of Guinea Watch</option><option>Black Sea Exclusion</option></datalist>
            </Field>
            <Field label="Value Threshold ($):">
              <input className="cnr-input" type="number" min="0" value={valueThreshold} onChange={e=>setValueThreshold(e.target.value)} style={{fontVariantNumeric:'tabular-nums'}} />
            </Field>
            <Field label="Vessel Count Threshold:">
              <input className="cnr-input" type="number" min="0" value={vesselThreshold} onChange={e=>setVesselThreshold(e.target.value)} style={{fontVariantNumeric:'tabular-nums'}} />
            </Field>
            <Field label="Region Type:">
              <select className="cnr-input" value={regionType} onChange={e=>setRegionType(e.target.value)}>{REGION_TYPES.map(t=><option key={t}>{t}</option>)}</select>
            </Field>
            <Field label="Region Group:">
              <select className="cnr-input" value={regionGroup} onChange={e=>setRegionGroup(e.target.value)}>{REGION_GROUPS.map(t=><option key={t}>{t}</option>)}</select>
            </Field>
            <Field label="Region History Valuations:">
              <label className="cnr-check"><input type="checkbox" checked={historyValuations} onChange={e=>setHistoryValuations(e.target.checked)} /><span className="text-ink-500 text-xs">Backfill exposure history for this region</span></label>
            </Field>

            {/* Coverage builder */}
            <div className="mt-1 rounded-lg border border-ink-200 overflow-hidden">
              <div className="px-3 py-2.5 border-b border-ink-200 bg-ink-50 flex items-center gap-2 flex-wrap">
                <div className="inline-flex gap-1 p-1 rounded-full bg-white border border-ink-200">
                  {COVERAGE_TABS.map(t => (
                    <button key={t} className={'cnr-tab' + (tab===t?' active':'')} onClick={()=>setTab(t)}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="p-3 flex flex-col gap-3">
                {tab === 'Country' ? (
                  <>
                    <Field label="Add Country:">
                      <input className="cnr-input" value={country} onChange={e=>setCountry(e.target.value)} placeholder="Search countries" list="cnr-countries" />
                      <datalist id="cnr-countries">{COUNTRIES.map(c=><option key={c}>{c}</option>)}</datalist>
                    </Field>
                    <div>
                      <div className="cnr-label mb-1">Include:</div>
                      <div className="flex flex-col">
                        {COUNTRY_INCLUDES.map(v => (
                          <label key={v} className="cnr-check"><input type="checkbox" checked={includes.includes(v)} onChange={()=>toggleInclude(v)} />{v}</label>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Field label={`Add ${tab}:`}>
                    <select className="cnr-input" value={{HRA:hra,Port:port,Sea:sea}[tab]} onChange={e=>{const v=e.target.value; tab==='HRA'?setHra(v):tab==='Port'?setPort(v):setSea(v);}}>
                      <option value="">Select {tab.toLowerCase()}…</option>
                      {(tab==='HRA'?HRAS:tab==='Port'?PORTS:SEAS).map(o=><option key={o}>{o}</option>)}
                    </select>
                  </Field>
                )}
                <div className="flex items-center gap-2">
                  <button className="cnr-btn cnr-btn-primary" onClick={addCoverage} disabled={!pending} style={!pending?{opacity:.45,cursor:'not-allowed'}:null}>{icon('Plus',14)}Add</button>
                  {added.length ? <span className="text-xs text-ink-500">{added.length} area{added.length>1?'s':''} added</span> : null}
                </div>
                {added.length ? (
                  <div className="flex flex-wrap gap-1.5 pt-1 border-t border-ink-100">
                    {added.map((a,i) => (
                      <span key={i} className="cnr-chip" title={a.detail || a.kind}>
                        <span className="text-[10px] font-bold uppercase tracking-wide text-brand-400">{a.kind}</span>{a.value}
                        <button onClick={()=>setAdded(list=>list.filter((_,j)=>j!==i))} aria-label={'Remove '+a.value}>{icon('X',12)}</button>
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Map column */}
          <div className="cnr-map-wrap relative" style={{minHeight:'560px'}}>
            <RegionMap mapType={mapType} tool={tool} />
            <div className="absolute flex flex-col gap-2" style={{top:'12px',left:'52px',zIndex:400}}>
              <div className="rounded-lg overflow-hidden border border-ink-200 shadow-card flex flex-col divide-y divide-ink-200">
                {DRAW_TOOLS.map(t => (
                  <button key={t.id} className={'cnr-draw' + (tool===t.id?' active':'')} title={t.label} onClick={()=>setTool(tool===t.id?null:t.id)}>
                    {icon(t.icon,15)}
                  </button>
                ))}
              </div>
            </div>
            <div className="absolute" style={{top:'12px',right:'12px',zIndex:400}}>
              <div className="relative">
                <button className="cnr-map-btn" title="Layers" aria-expanded={layersOpen} onClick={()=>setLayersOpen(o=>!o)}>{icon('Layers',16)}</button>
                {layersOpen ? (
                  <div className="absolute bg-white border border-ink-200 rounded-xl shadow-card overflow-hidden py-1" style={{top:0,right:'calc(100% + 8px)',width:'160px'}}>
                    {MAP_TYPE_ORDER.map(k => (
                      <button key={k} onClick={()=>{setMapType(k);setLayersOpen(false);}}
                        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-ink-50"
                        style={{border:0,background:'transparent',cursor:'pointer',fontFamily:'inherit',color:'#334155',fontWeight:mapType===k?700:400}}>
                        <span>{MAP_TILES[k].label}</span>
                        <span style={{color:'var(--brand-600,#2563eb)',opacity:mapType===k?1:0,display:'flex'}}>{icon('Check',15)}</span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            {tool ? (
              <div className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-ink-900/85 text-white text-[11.5px] font-medium" style={{bottom:'14px',zIndex:400}}>
                {tool === 'erase' ? 'Click a shape to remove it' : 'Click the map to place points'}
              </div>
            ) : null}
          </div>
        </div>

        <div className="px-4 py-3 border-t border-ink-200 bg-ink-50 flex items-center justify-end gap-2">
          <a href="Regions.html" className="cnr-btn cnr-btn-ghost" style={{textDecoration:'none'}}>Cancel</a>
          <span className="mr-auto text-xs text-ink-500">{atLimit ? 'No custom regions remaining' : remaining + ' of ' + REGION_LIMIT + ' custom regions remaining'}</span>
          <button className="cnr-btn cnr-btn-primary" onClick={saveRegion} disabled={atLimit} title={atLimit ? 'Custom region limit reached' : 'Save region'} style={atLimit?{opacity:.45,cursor:'not-allowed'}:null}>Save</button>
        </div>
      </div>
    </div>
  );
}

document.getElementById('app').innerHTML = `
  ${SC.Sidebar()}
  <div class="flex-1 min-w-0 flex flex-col overflow-hidden">
    ${SC.Topbar()}
    <main id="cnr-main" class="flex-1 min-h-0 overflow-y-auto scroll-thin bg-slate-100"></main>
  </div>
  ${SC.TweaksPanel()}
`;
SC.wireChrome();
ReactDOM.createRoot(document.getElementById('cnr-main')).render(<AddRegion />);
