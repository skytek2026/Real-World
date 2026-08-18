/* Add Region — create a monitored region by drawing on the map or adding HRA / Port / Country / Sea coverage. */
const { useState, useEffect, useRef } = React;
const SC = window.sharedChrome;

const MAP_TILES = {
  light:'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  street:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  dark:'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
};
const REGION_TYPES = ['Monitored Region','Exclusion Region','Trading Area','War Risk Area','Sanctioned Area'];
const REGION_GROUPS = ['Other','Oil Fields','Ports','War Zones','Piracy','Trade Lanes'];
const COUNTRIES = ['Panama','Liberia','Marshall Islands','Singapore','Nigeria','Yemen','Somalia','Libya','Iran','Venezuela','Russia','Ukraine','Malta','Cyprus','Greece','Turkey'];
const COVERAGE_TABS = ['HRA','Port','Country','Sea'];
const HRAS = ['Gulf of Aden HRA','Indian Ocean HRA','Gulf of Guinea HRA','Southern Red Sea HRA','Strait of Hormuz HRA'];
const PORTS = ['Rotterdam','Singapore','Houston','Lagos','Novorossiysk','Fujairah','Santos','Shanghai'];
const SEAS = ['Black Sea','Red Sea','Baltic Sea','South China Sea','Sea of Azov','Persian Gulf','Mediterranean Sea'];
const COUNTRY_INCLUDES = ['Border','Internal Waters','Territorial Waters','EEZ','Border, Internal and Territorial Waters'];
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
    L.tileLayer(MAP_TILES[mapType], { attribution:'', maxZoom:12 }).addTo(map);
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
  const [tool, setTool] = useState(null);

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
              <div className="rounded-lg overflow-hidden border border-ink-200 shadow-card flex">
                {Object.keys(MAP_TILES).map(k => (
                  <button key={k} onClick={()=>setMapType(k)} className="px-2.5 h-8 text-[11px] font-semibold capitalize" style={{border:0,cursor:'pointer',fontFamily:'inherit',background:mapType===k?'#eff6ff':'#fff',color:mapType===k?'#2563eb':'#64748b'}}>{k}</button>
                ))}
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
          <button className="cnr-btn cnr-btn-primary" onClick={()=>{window.location.href='Regions.html';}}>Save</button>
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
