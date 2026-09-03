/* Add Region — create a monitored region by drawing on the map or adding HRA / Port / Country / Sea coverage. */
const { useState, useEffect, useRef } = React;
const SC = window.sharedChrome;

const MAP_TILES = {
  satellite:{ label:'Satellite',   url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', attr:'Tiles © Esri', bg:'#0b1220' },
  street:   { label:'Street View', url:'https://tile.openstreetmap.org/{z}/{x}/{y}.png',                    attr:'© OpenStreetMap contributors', bg:'#e8e2d8' },
  dark:     { label:'Dark Mode',   url:'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',         attr:'Tiles © Esri', bg:'#0b1220' },
  light:    { label:'Light Mode',  url:'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',        attr:'Tiles © Esri', bg:'#f3f4f6' },
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

function quotaToneFor(used) {
  const remaining = Math.max(0, REGION_LIMIT - used);
  const atLimit = remaining === 0;
  const nearLimit = !atLimit && remaining <= 4;
  const tone = atLimit ? { fg:'#b91c1c', bg:'#fef2f2', bd:'#fecaca', dot:'#dc2626' }
             : nearLimit ? { fg:'var(--brand-700,#1d4ed8)', bg:'var(--brand-50,#eff6ff)', bd:'var(--brand-200,#bfdbfe)', dot:'var(--brand-600,#2563eb)' }
             : { fg:'#15803d', bg:'#f0fdf4', bd:'#bbf7d0', dot:'#16a34a' };
  return { remaining, atLimit, nearLimit, tone };
}

function QuotaCard({ used }) {
  const { remaining, atLimit, nearLimit, tone } = quotaToneFor(used);
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 flex-wrap rounded-lg" style={{background:tone.bg,border:'1px solid '+tone.bd}}>
      <span style={{width:'30px',height:'30px',borderRadius:'8px',background:'#fff',border:'1px solid '+tone.bd,color:tone.dot,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
        {icon(atLimit ? 'CircleAlert' : nearLimit ? 'TriangleAlert' : 'Map', 16)}
      </span>
      <div className="min-w-0">
        <div className="text-sm font-bold" style={{color:tone.fg}}>
          {atLimit ? 'Custom region limit reached — ' + REGION_LIMIT + ' of ' + REGION_LIMIT + ' used'
                   : used + ' of ' + REGION_LIMIT + ' custom regions used'}
        </div>
        <div className="text-xs" style={{color:tone.fg,opacity:.85}}>
          {atLimit
            ? 'Delete an existing custom region on the Regions page before creating a new one.'
            : 'You can create ' + (remaining === 1 ? '1 more region' : remaining + ' more regions') + ' on this plan. This one will be number ' + (used + 1) + '.'}
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2.5">
        <div className="flex items-center gap-[3px]" title={used + ' of ' + REGION_LIMIT + ' custom regions used'}>
          {Array.from({length:REGION_LIMIT}).map((_,i) => (
            <span key={i} style={{width:'9px',height:'18px',borderRadius:'2px',background:i < used ? tone.dot : '#fff',border:'1px solid '+(i < used ? tone.dot : tone.bd)}}></span>
          ))}
        </div>
        <span className="text-lg font-extrabold whitespace-nowrap" style={{color:tone.fg,fontVariantNumeric:'tabular-nums'}}>{used}<span className="text-sm font-bold" style={{opacity:.6}}>/{REGION_LIMIT}</span></span>
      </div>
    </div>
  );
}

const SKYTEK_REGIONS = [
  { id:'persian-gulf',   name:'Persian Gulf',              cat:'War Risk',   vessels:412, coords:[[30.2,48.0],[29.0,50.5],[26.6,56.4],[24.2,54.2],[24.6,51.0],[27.4,48.6]] },
  { id:'hormuz',         name:'Strait of Hormuz',          cat:'Chokepoint', vessels:186, coords:[[27.2,55.8],[26.9,57.4],[25.5,57.2],[25.9,55.7]] },
  { id:'gulf-of-oman',   name:'Gulf of Oman',              cat:'War Risk',   vessels:231, coords:[[26.6,56.3],[25.6,61.6],[22.6,60.0],[24.0,56.9]] },
  { id:'red-sea',        name:'Red Sea',                   cat:'War Risk',   vessels:298, coords:[[27.9,34.2],[27.5,36.0],[20.0,38.8],[14.0,42.6],[12.6,43.4],[13.4,42.2],[19.0,37.6],[26.0,33.6]] },
  { id:'gulf-of-aden',   name:'Gulf of Aden',              cat:'Piracy',     vessels:174, coords:[[12.9,43.3],[12.6,51.5],[10.9,51.2],[11.6,44.2]] },
  { id:'indian-hra',     name:'Indian Ocean HRA',          cat:'Piracy',     vessels:520, coords:[[15.0,45.0],[15.0,78.0],[-5.0,78.0],[-5.0,45.0]] },
  { id:'gulf-of-guinea', name:'Gulf of Guinea',            cat:'Piracy',     vessels:264, coords:[[6.5,-5.0],[6.5,9.5],[-2.0,9.5],[-2.0,-5.0]] },
  { id:'black-sea',      name:'Black Sea',                 cat:'War Risk',   vessels:143, coords:[[46.6,29.2],[46.6,41.8],[40.9,41.5],[40.9,29.0]] },
  { id:'east-med',       name:'Eastern Mediterranean',     cat:'War Risk',   vessels:337, coords:[[36.9,27.5],[36.9,36.2],[31.2,34.2],[31.5,27.5]] },
  { id:'venezuela',      name:'Venezuela & S. Caribbean',  cat:'Sanctions',  vessels:96,  coords:[[12.8,-72.0],[12.8,-60.0],[9.4,-60.0],[9.4,-72.0]] },
  { id:'malacca',        name:'Strait of Malacca',         cat:'Chokepoint', vessels:389, coords:[[6.0,95.2],[6.0,100.4],[1.2,104.4],[0.6,103.0],[3.4,97.4]] },
  { id:'south-china',    name:'South China Sea',           cat:'War Risk',   vessels:604, coords:[[23.0,108.5],[23.0,120.5],[3.0,112.0],[3.0,105.0]] },
  { id:'gulf-of-mexico', name:'Gulf of Mexico',            cat:'Weather',    vessels:278, coords:[[30.4,-96.8],[30.4,-81.2],[21.5,-84.5],[18.6,-88.0],[18.6,-96.8]] },
  { id:'baltic',         name:'Baltic Sea',                cat:'Sanctions',  vessels:212, coords:[[65.5,20.5],[60.2,28.2],[54.4,19.5],[54.6,11.2],[59.0,17.4]] },
];
const CAT_TONE = {
  'War Risk':   { fg:'#b91c1c', bg:'#fef2f2', bd:'#fecaca' },
  'Piracy':     { fg:'#b45309', bg:'#fffbeb', bd:'#fde68a' },
  'Sanctions':  { fg:'#7c3aed', bg:'#f5f3ff', bd:'#ddd6fe' },
  'Chokepoint': { fg:'#0f766e', bg:'#f0fdfa', bd:'#99f6e4' },
  'Weather':    { fg:'#0369a1', bg:'#f0f9ff', bd:'#bae6fd' },
};

const SHAPE_STYLE = { color:'var(--brand-600,#2563eb)', weight:2, fillColor:'var(--brand-500,#3b82f6)', fillOpacity:.18 };
const DRAFT_STYLE = { color:'var(--brand-600,#2563eb)', weight:2, dashArray:'5 4', fillColor:'var(--brand-500,#3b82f6)', fillOpacity:.1 };

function SkytekPicker({ selected, onToggle, onClear }) {
  const [q, setQ] = useState('');
  const list = SKYTEK_REGIONS.filter(r => !q.trim() || r.name.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <>
      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{background:'var(--brand-50,#eff6ff)',border:'1px solid var(--brand-200,#bfdbfe)'}}>
        <span style={{width:'30px',height:'30px',borderRadius:'8px',background:'#fff',border:'1px solid var(--brand-200,#bfdbfe)',color:'var(--brand-600,#2563eb)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{icon('Globe',16) || icon('Map',16)}</span>
        <div className="min-w-0">
          <div className="text-sm font-bold" style={{color:'var(--brand-700,#1d4ed8)'}}>Skytek maintained regions</div>
          <div className="text-xs" style={{color:'var(--brand-700,#1d4ed8)',opacity:.85}}>Curated risk boundaries kept current by Skytek. They don't count towards your custom region limit.</div>
        </div>
      </div>
      <div className="relative">
        <span style={{position:'absolute',left:'9px',top:'50%',transform:'translateY(-50%)',color:'#94a3b8',display:'flex',pointerEvents:'none'}}>{icon('Search',14)}</span>
        <input className="cnr-input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search regions" style={{paddingLeft:'28px'}} />
      </div>
      <div className="rounded-lg border border-ink-200 overflow-hidden">
        <div className="px-3 py-2 bg-ink-50 border-b border-ink-200 flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wide text-ink-500">{list.length} region{list.length===1?'':'s'}</span>
          {selected.length ? <button onClick={onClear} className="ml-auto text-[11px] font-semibold text-ink-500" style={{border:0,background:'transparent',cursor:'pointer'}}>Clear {selected.length} selected</button> : null}
        </div>
        <div className="flex flex-col divide-y divide-ink-100 overflow-y-auto scroll-thin" style={{maxHeight:'380px'}}>
          {list.map(r => {
            const on = selected.includes(r.id);
            return (
              <label key={r.id} className="flex items-center gap-2.5 px-3 py-2 cursor-pointer" style={{background:on?'var(--brand-50,#eff6ff)':'#fff'}}>
                <input type="checkbox" checked={on} onChange={()=>onToggle(r.id)} style={{width:'15px',height:'15px',accentColor:'var(--brand-600,#2563eb)',flexShrink:0,cursor:'pointer'}} />
                <span className="text-[13px] font-semibold text-ink-900 truncate">{r.name}</span>
              </label>
            );
          })}
          {!list.length ? <div className="px-3 py-6 text-center text-xs text-ink-500">No regions match your search.</div> : null}
        </div>
      </div>
    </>
  );
}

function RegionMap({ mapType, tool, shapes, onAddShape, onEraseShape, onDone, apiRef, overlays }) {
  const ref = useRef(null);
  const mapRef = useRef(null);
  const shapeLayerRef = useRef(null);
  const overlayRef = useRef(null);
  const draftRef = useRef(null);
  const cb = useRef({});
  cb.current = { onAddShape, onEraseShape, onDone, tool };

  useEffect(() => {
    const map = L.map(ref.current, { center:[24,10], zoom:2, zoomControl:true, scrollWheelZoom:true, worldCopyJump:true });
    mapRef.current = map;
    L.tileLayer(MAP_TILES[mapType].url, { attribution:MAP_TILES[mapType].attr, maxZoom:16 }).addTo(map);
    ref.current.style.background = MAP_TILES[mapType].bg;
    shapeLayerRef.current = L.layerGroup().addTo(map);
    overlayRef.current = L.layerGroup().addTo(map);
    draftRef.current = L.layerGroup().addTo(map);
    setTimeout(() => map.invalidateSize(), 120);
    return () => { map.remove(); mapRef.current = null; };
  }, [mapType]);

  /* Render committed shapes */
  useEffect(() => {
    const map = mapRef.current, grp = shapeLayerRef.current;
    if (!map || !grp) return;
    grp.clearLayers();
    shapes.forEach(s => {
      const layer = s.kind === 'rect'
        ? L.rectangle(s.coords, SHAPE_STYLE)
        : L.polygon(s.coords, SHAPE_STYLE);
      layer.bindTooltip(s.label, { sticky:true, className:'airport-tip', opacity:1 });
      layer.on('click', (e) => {
        if (cb.current.tool !== 'erase') return;
        L.DomEvent.stop(e);
        cb.current.onEraseShape(s.id);
      });
      layer.on('mouseover', () => { if (cb.current.tool === 'erase') layer.setStyle({ color:'#dc2626', fillColor:'#ef4444', fillOpacity:.25 }); });
      layer.on('mouseout',  () => layer.setStyle(SHAPE_STYLE));
      grp.addLayer(layer);
    });
  }, [shapes, mapType]);

  /* Selected Skytek regions overlay */
  useEffect(() => {
    const map = mapRef.current, grp = overlayRef.current;
    if (!map || !grp) return;
    grp.clearLayers();
    const list = overlays || [];
    if (!list.length) return;
    list.forEach(r => {
      const tone = CAT_TONE[r.cat] || CAT_TONE['War Risk'];
      const layer = L.polygon(r.coords, { color:tone.fg, weight:2, fillColor:tone.fg, fillOpacity:.16 });
      layer.bindTooltip('<b>' + r.name + '</b><br>' + r.cat, { sticky:true, className:'airport-tip', opacity:1 });
      grp.addLayer(layer);
    });
    const b = L.latLngBounds([].concat(...list.map(r => r.coords)));
    if (b.isValid()) map.fitBounds(b, { padding:[40,40], maxZoom:6, animate:true });
  }, [overlays, mapType]);

  /* Drawing interactions */
  useEffect(() => {
    const map = mapRef.current, draft = draftRef.current;
    if (!map || !draft) return;
    const el = ref.current;
    el.style.cursor = tool && tool !== 'erase' ? 'crosshair' : '';
    draft.clearLayers();
    if (!tool || tool === 'erase') return;

    let dragging = false, origin = null, preview = null, pts = [], moved = 0;
    const toLatLng = (ev) => map.containerPointToLatLng(
      L.point(ev.clientX, ev.clientY).subtract(L.point(el.getBoundingClientRect().left, el.getBoundingClientRect().top)));
    const commit = (kind, coords) => {
      draft.clearLayers();
      preview = null; pts = []; origin = null;
      cb.current.onAddShape({ kind, coords });
      cb.current.onDone();
    };

    const onDown = (ev) => {
      if (ev.button != null && ev.button !== 0) return;
      if (ev.pointerType === 'touch' && ev.isPrimary === false) return;
      dragging = true; moved = 0; origin = toLatLng(ev);
      if (ev.preventDefault) ev.preventDefault();
      map.dragging.disable();
      if (tool === 'rect') {
        preview = L.rectangle([origin, origin], DRAFT_STYLE).addTo(draft);
      } else {
        pts = [origin];
        preview = L.polyline(pts, DRAFT_STYLE).addTo(draft);
      }
    };
    const onMove = (ev) => {
      if (!dragging || !preview) return;
      if (ev.preventDefault && ev.cancelable) ev.preventDefault();
      moved += 1;
      const ll = toLatLng(ev);
      if (tool === 'rect') preview.setBounds(L.latLngBounds(origin, ll));
      else { pts.push(ll); preview.setLatLngs(pts); }
    };
    const onUp = (ev) => {
      if (!dragging) return;
      dragging = false;
      map.dragging.enable();
      const end = moved ? toLatLng(ev) : origin;
      if (tool === 'rect') {
        const b = L.latLngBounds(origin, end);
        if (Math.abs(b.getNorth() - b.getSouth()) < 0.02) { draft.clearLayers(); return; }
        commit('rect', [[b.getSouth(), b.getWest()], [b.getNorth(), b.getEast()]]);
      } else {
        if (pts.length < 3) { draft.clearLayers(); return; }
        commit('freehand', pts.map(p => [p.lat, p.lng]));
      }
    };

    /* Polygon: tap/click to place vertices, double-tap / Enter / Done to close */
    const onClick = (e) => {
      pts.push(e.latlng);
      draft.clearLayers();
      L.polyline(pts.concat(pts.length > 2 ? [pts[0]] : []), DRAFT_STYLE).addTo(draft);
      pts.forEach(p => L.circleMarker(p, { radius:4, color:'#fff', weight:2, fillColor:'var(--brand-600,#2563eb)', fillOpacity:1 }).addTo(draft));
    };
    const finishPoly = () => {
      if (pts.length < 3) return;
      commit('polygon', pts.map(p => [p.lat, p.lng]));
    };
    const onKey = (ev) => { if (ev.key === 'Enter') finishPoly(); if (ev.key === 'Escape') { draft.clearLayers(); pts = []; cb.current.onDone(); } };

    if (tool === 'polygon') {
      map.doubleClickZoom.disable();
      map.on('click', onClick);
      map.on('dblclick', finishPoly);
      window.addEventListener('keydown', onKey);
      cb.current.finishPoly = finishPoly;
      if (apiRef) apiRef.current = { finishPoly };
    } else {
      el.style.touchAction = 'none';
      el.addEventListener('pointerdown', onDown);
      window.addEventListener('pointermove', onMove, { passive:false });
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
      window.addEventListener('keydown', onKey);
    }
    return () => {
      map.off('click', onClick); map.off('dblclick', finishPoly);
      el.style.touchAction = '';
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('keydown', onKey);
      cb.current.finishPoly = null;
      if (apiRef) apiRef.current = {};
      map.dragging.enable(); map.doubleClickZoom.enable();
      draft.clearLayers();
    };
  }, [tool, mapType]);

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
  const [cardTab, setCardTab] = useState('Create Custom Region');
  const [skytekSel, setSkytekSel] = useState([]);
  const skytekTab = cardTab === 'Skytek Regions';
  const toggleSkytek = (id) => setSkytekSel(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const selectedRegions = SKYTEK_REGIONS.filter(r => skytekSel.includes(r.id));
  const saveSkytek = () => { if (skytekSel.length) window.location.href = 'Regions.html'; };
  const [mapType, setMapType] = useState('light');
  const [layersOpen, setLayersOpen] = useState(false);
  const [tool, setTool] = useState(null);
  const [shapes, setShapes] = useState([]);
  const shapeSeq = useRef(0);
  const addShape = (s) => setShapes(list => {
    shapeSeq.current += 1;
    const n = list.filter(x => x.kind === s.kind).length + 1;
    const kindLabel = s.kind === 'rect' ? 'Rectangle' : s.kind === 'polygon' ? 'Polygon' : 'Freehand area';
    return [...list, { ...s, id:shapeSeq.current, label:kindLabel + ' ' + n }];
  });
  const eraseShape = (id) => setShapes(list => list.filter(s => s.id !== id));
  const mapCb = useRef({});
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
        <div className="px-4 py-2.5 border-b border-ink-200 flex items-center gap-3 flex-wrap">
          <div className="ds-tabs" role="tablist">
            {['Skytek Regions','Create Custom Region'].map(t => (
              <button key={t} role="tab" aria-selected={cardTab===t} className="ds-tab" onClick={()=>setCardTab(t)}>{t}</button>
            ))}
          </div>
        </div>
        <div className="cnr-cols grid" style={{gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)'}}>
          {/* Form column */}
          <div className="p-4 flex flex-col gap-3 border-r border-ink-100">
          {cardTab === 'Skytek Regions' ? (
            <SkytekPicker selected={skytekSel} onToggle={toggleSkytek} onClear={()=>setSkytekSel([])} />
          ) : (<>
          <QuotaCard used={3} />
          {/* Reserved for later: near-limit (blue) and at-limit (red) states */}
          {false && <QuotaCard used={used} />}
          {false && <QuotaCard used={REGION_LIMIT} />}
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
          </>)}
          </div>

          {/* Map column */}
          <div className="cnr-map-wrap relative" style={{minHeight:'560px'}}>
            <RegionMap mapType={mapType} tool={tool} shapes={shapes} onAddShape={addShape} onEraseShape={eraseShape} onDone={()=>setTool(null)} apiRef={mapCb} overlays={skytekTab ? selectedRegions : null} />
            {skytekTab ? null : (
            <div className="absolute flex flex-col gap-2" style={{top:'88px',left:'12px',zIndex:400}}>
              <div className="rounded-lg overflow-hidden border border-ink-200 shadow-card flex flex-col divide-y divide-ink-200">
                {DRAW_TOOLS.map(t => (
                  <button key={t.id} className={'cnr-draw' + (tool===t.id?' active':'')} title={t.label} onClick={()=>setTool(tool===t.id?null:t.id)}>
                    {icon(t.icon,15)}
                  </button>
                ))}
              </div>
            </div>
            )}
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
            {skytekTab && !selectedRegions.length ? (
              <div className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-ink-900/85 text-white text-[11.5px] font-medium whitespace-nowrap" style={{bottom:'14px',zIndex:400}}>Select regions to preview them on the map</div>
            ) : null}
            {shapes.length ? (
              <div className="absolute flex flex-col gap-1 items-end" style={{top:'12px',right:'56px',zIndex:400}}>
                {shapes.map(s => (
                  <span key={s.id} className="flex items-center gap-1.5 pl-2 pr-1 py-1 rounded-md bg-white border border-ink-200 shadow-card text-[11px] font-semibold text-ink-700 whitespace-nowrap">
                    <span style={{width:'8px',height:'8px',borderRadius:'2px',background:'var(--brand-500,#3b82f6)',border:'1px solid var(--brand-600,#2563eb)'}}></span>
                    {s.label}
                    <button onClick={()=>eraseShape(s.id)} aria-label={'Remove '+s.label} style={{border:0,background:'transparent',cursor:'pointer',color:'#94a3b8',display:'flex',padding:'2px'}}>{icon('X',11)}</button>
                  </span>
                ))}
                <button onClick={()=>setShapes([])} className="px-2 py-1 rounded-md bg-white border border-ink-200 shadow-card text-[11px] font-semibold text-ink-500" style={{cursor:'pointer'}}>Clear all</button>
              </div>
            ) : null}
            {tool ? (
              <div className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-ink-900/85 text-white text-[11.5px] font-medium whitespace-nowrap" style={{bottom:'14px',zIndex:400}}>
                {tool === 'erase' ? 'Tap a shape to remove it'
                  : tool === 'rect' ? 'Drag on the map to draw a rectangle'
                  : tool === 'polygon' ? 'Tap to place points, then Done'
                  : 'Drag to lasso an area'}
                {tool === 'polygon' ? (
                  <button onClick={()=>{ const f = mapCb.current && mapCb.current.finishPoly; if (f) f(); }} className="ml-2 px-2 py-0.5 rounded-full bg-white text-ink-900 text-[11px] font-bold" style={{border:0,cursor:'pointer'}}>Done</button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="px-4 py-3 border-t border-ink-200 bg-ink-50 flex items-center justify-end gap-2">
          <a href="Regions.html" className="cnr-btn cnr-btn-ghost" style={{textDecoration:'none'}}>Cancel</a>
          {skytekTab ? (<>
            <span className="mr-auto text-xs text-ink-500">{skytekSel.length ? skytekSel.length + ' Skytek region' + (skytekSel.length>1?'s':'') + ' selected' : 'No regions selected'}</span>
            <button className="cnr-btn cnr-btn-primary" onClick={saveSkytek} disabled={!skytekSel.length} title={skytekSel.length ? 'Add selected regions' : 'Select at least one region'} style={!skytekSel.length?{opacity:.45,cursor:'not-allowed'}:null}>Save Selection</button>
          </>) : (<>
            <span className="mr-auto text-xs text-ink-500">{atLimit ? 'No custom regions remaining' : remaining + ' of ' + REGION_LIMIT + ' custom regions remaining'}</span>
            <button className="cnr-btn cnr-btn-primary" onClick={saveRegion} disabled={atLimit} title={atLimit ? 'Custom region limit reached' : 'Save region'} style={atLimit?{opacity:.45,cursor:'not-allowed'}:null}>Save</button>
          </>)}
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
