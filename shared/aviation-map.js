/* Aviation map data + popups + map types — shared between Dashboard and Portfolio Details. */
const AIRPORTS_LATLNG = [
  { lat:51.47,   lng:-0.45,   code:'LHR', name:'London Heathrow Airport',              country:'United Kingdom', elev:'83 ft',    runways:2 },
  { lat:40.64,   lng:-73.78,  code:'JFK', name:'John F. Kennedy International',         country:'United States',  elev:'13 ft',    runways:4 },
  { lat:25.25,   lng:55.36,   code:'DXB', name:'Dubai International Airport',           country:'UAE',            elev:'62 ft',    runways:2 },
  { lat:1.35,    lng:103.99,  code:'SIN', name:'Singapore Changi Airport',              country:'Singapore',      elev:'22 ft',    runways:2 },
  { lat:41.98,   lng:-87.90,  code:'ORD', name:"Chicago O'Hare International",          country:'United States',  elev:'680 ft',   runways:8 },
  { lat:48.11,   lng:16.57,   code:'VIE', name:'Vienna International Airport',          country:'Austria',        elev:'600 ft',   runways:2 },
  { lat:50.03,   lng:8.57,    code:'FRA', name:'Frankfurt Airport',                     country:'Germany',        elev:'364 ft',   runways:4 },
  { lat:52.31,   lng:4.77,    code:'AMS', name:'Amsterdam Airport Schiphol',            country:'Netherlands',    elev:'-11 ft',   runways:6 },
  { lat:35.55,   lng:139.78,  code:'HND', name:'Tokyo Haneda Airport',                  country:'Japan',          elev:'11 ft',    runways:4 },
  { lat:37.62,   lng:55.43,   code:'IKA', name:'Imam Khomeini International Airport',   country:'Iran',           elev:'3305 ft',  runways:2 },
  { lat:22.31,   lng:113.92,  code:'SZX', name:"Shenzhen Bao'an International Airport", country:'China',          elev:'13 ft',    runways:2 },
  { lat:39.86,   lng:116.61,  code:'PEK', name:'Beijing Capital International Airport', country:'China',          elev:'116 ft',   runways:3 },
  { lat:31.14,   lng:121.81,  code:'PVG', name:'Shanghai Pudong International Airport', country:'China',          elev:'13 ft',    runways:4 },
  { lat:16.90,   lng:96.13,   code:'RGN', name:'Yangon International Airport',          country:'Myanmar',        elev:'109 ft',   runways:2 },
  { lat:-4.03,   lng:21.76,   code:'FIH', name:"N'Djili International Airport",         country:'DR Congo',       elev:'1027 ft',  runways:1 },
  { lat:18.57,   lng:-72.29,  code:'PAP', name:'Toussaint Louverture International',    country:'Haiti',          elev:'122 ft',   runways:1 },
  { lat:-33.95,  lng:18.60,   code:'CPT', name:'Cape Town International Airport',       country:'South Africa',   elev:'151 ft',   runways:2 },
  { lat:-33.94,  lng:151.18,  code:'SYD', name:'Sydney Kingsford Smith Airport',        country:'Australia',      elev:'21 ft',    runways:3 },
  { lat:-37.67,  lng:144.84,  code:'MEL', name:'Melbourne Airport',                     country:'Australia',      elev:'434 ft',   runways:2 },
  { lat:13.91,   lng:100.61,  code:'BKK', name:'Suvarnabhumi International Airport',    country:'Thailand',       elev:'5 ft',     runways:2 },
  { lat:19.4363, lng:-99.0721,code:'MEX', name:'Mexico City International Airport',     country:'Mexico',         elev:'7316 ft',  runways:2 },
  { lat:49.01,   lng:2.55,    code:'CDG', name:'Charles de Gaulle Airport',             country:'France',         elev:'392 ft',   runways:4 },
  { lat:33.94,   lng:-118.41, code:'LAX', name:'Los Angeles International Airport',     country:'United States',  elev:'125 ft',   runways:4 },
  { lat:-23.43,  lng:-46.47,  code:'GRU', name:'São Paulo Guarulhos International',     country:'Brazil',         elev:'2459 ft',  runways:2 },
];

const PLANES = [
  { lat:55.8,  lng:-15.2, rot:80,  flight:'BA 234',  reg:'G-ZBKF', type:'Boeing 787-9',     from:{code:'LHR',name:'London Heathrow'}, to:{code:'JFK',name:'New York JFK'},     date:'13 Dec', dep:'08:30', arr:'11:45', duration:'7h 15m',  airline:'British Airways',      status:'Cruising',   alt:'38,000 ft', spd:'490 kts' },
  { lat:52.1,  lng:12.5,  rot:45,  flight:'LH 442',  reg:'D-AIHA', type:'Airbus A340-300',  from:{code:'FRA',name:'Frankfurt'},        to:{code:'AMS',name:'Amsterdam'},        date:'13 Dec', dep:'10:15', arr:'11:30', duration:'1h 15m',  airline:'Lufthansa',           status:'Descending', alt:'12,000 ft', spd:'310 kts' },
  { lat:60.2,  lng:24.8,  rot:200, flight:'AY 831',  reg:'OH-LWG', type:'Airbus A350-900',  from:{code:'HEL',name:'Helsinki'},         to:{code:'SIN',name:'Singapore'},        date:'13 Dec', dep:'06:50', arr:'22:10', duration:'12h 55m', airline:'Finnair',             status:'Cruising',   alt:'40,000 ft', spd:'512 kts' },
  { lat:50.5,  lng:-2.8,  rot:90,  flight:'EZ 8821', reg:'G-EZBY', type:'Airbus A320neo',   from:{code:'LIS',name:'Lisbon'},           to:{code:'LHR',name:'London Heathrow'},  date:'13 Dec', dep:'09:10', arr:'11:20', duration:'2h 10m',  airline:'easyJet',             status:'Cruising',   alt:'35,000 ft', spd:'450 kts' },
  { lat:46.3,  lng:6.1,   rot:130, flight:'LX 1619', reg:'HB-JHP', type:'Airbus A220-300',  from:{code:'ZRH',name:'Zurich'},           to:{code:'VIE',name:'Vienna'},           date:'13 Dec', dep:'11:45', arr:'13:00', duration:'1h 15m',  airline:'SWISS',               status:'Climbing',   alt:'24,000 ft', spd:'380 kts' },
  { lat:40.2,  lng:29.1,  rot:70,  flight:'TK 793',  reg:'TC-LYB', type:'Boeing 787-10',    from:{code:'IST',name:'Istanbul'},         to:{code:'DXB',name:'Dubai'},            date:'13 Dec', dep:'08:00', arr:'12:30', duration:'4h 30m',  airline:'Turkish Airlines',    status:'Cruising',   alt:'37,000 ft', spd:'480 kts' },
  { lat:35.1,  lng:33.4,  rot:250, flight:'QR 1037', reg:'A7-ALN', type:'Airbus A321-200',  from:{code:'DOH',name:'Doha'},             to:{code:'IST',name:'Istanbul'},         date:'13 Dec', dep:'07:30', arr:'11:15', duration:'3h 45m',  airline:'Qatar Airways',       status:'Cruising',   alt:'36,000 ft', spd:'465 kts' },
  { lat:25.8,  lng:50.2,  rot:110, flight:'EK 011',  reg:'A6-ENS', type:'Airbus A380-800',  from:{code:'DXB',name:'Dubai'},            to:{code:'SIN',name:'Singapore'},        date:'13 Dec', dep:'21:45', arr:'09:35', duration:'7h 50m',  airline:'Emirates',            status:'Cruising',   alt:'38,000 ft', spd:'496 kts' },
  { lat:22.3,  lng:114.2, rot:180, flight:'CX 251',  reg:'B-LRA',  type:'Airbus A350-900',  from:{code:'HKG',name:'Hong Kong'},        to:{code:'SYD',name:'Sydney'},           date:'13 Dec', dep:'09:15', arr:'21:00', duration:'9h 45m',  airline:'Cathay Pacific',      status:'Cruising',   alt:'39,000 ft', spd:'502 kts' },
  { lat:31.2,  lng:121.5, rot:200, flight:'MU 591',  reg:'B-8300', type:'Airbus A321neo',   from:{code:'PVG',name:'Shanghai Pudong'},  to:{code:'BKK',name:'Bangkok'},          date:'13 Dec', dep:'10:00', arr:'14:30', duration:'4h 30m',  airline:'China Eastern',       status:'Cruising',   alt:'37,000 ft', spd:'471 kts' },
  { lat:39.9,  lng:116.4, rot:45,  flight:'CA 157',  reg:'B-2411', type:'Boeing 777-300ER', from:{code:'PEK',name:'Beijing Capital'},  to:{code:'FRA',name:'Frankfurt'},        date:'13 Dec', dep:'08:45', arr:'14:30', duration:'11h 45m', airline:'Air China',           status:'Climbing',   alt:'29,000 ft', spd:'422 kts' },
  { lat:35.7,  lng:139.8, rot:90,  flight:'SQ 317',  reg:'9V-SMA', type:'Airbus A350-900',  from:{code:'NRT',name:'Tokyo Narita'},     to:{code:'SIN',name:'Singapore'},        date:'09 Dec', dep:'11:45', arr:'18:20', duration:'6h 35m',  airline:'Singapore Airlines',  status:'Cruising',   alt:'39,000 ft', spd:'507 kts' },
  { lat:1.3,   lng:103.8, rot:270, flight:'SQ 431',  reg:'9V-SMG', type:'Airbus A380-800',  from:{code:'SIN',name:'Singapore'},        to:{code:'SYD',name:'Sydney'},           date:'14 Dec', dep:'23:55', arr:'09:00', duration:'7h 45m',  airline:'Singapore Airlines',  status:'Cruising',   alt:'38,000 ft', spd:'488 kts' },
  { lat:-4.3,  lng:15.3,  rot:240, flight:'ET 402',  reg:'ET-AXF', type:'Boeing 787-8',     from:{code:'ADD',name:'Addis Ababa'},      to:{code:'JNB',name:'Johannesburg'},     date:'13 Dec', dep:'14:00', arr:'18:30', duration:'4h 30m',  airline:'Ethiopian Airlines',  status:'Cruising',   alt:'37,000 ft', spd:'470 kts' },
  { lat:-33.9, lng:151.2, rot:315, flight:'QF 1',    reg:'VH-OQA', type:'Airbus A380-800',  from:{code:'SYD',name:'Sydney'},           to:{code:'DXB',name:'Dubai'},            date:'13 Dec', dep:'16:00', arr:'22:25', duration:'14h 25m', airline:'Qantas',              status:'Descending', alt:'15,000 ft', spd:'340 kts' },
  { lat:-23.5, lng:-46.6, rot:180, flight:'LA 8058', reg:'PR-MBN', type:'Boeing 767-300',   from:{code:'GRU',name:'São Paulo'},        to:{code:'EZE',name:'Buenos Aires'},     date:'14 Dec', dep:'22:00', arr:'00:15', duration:'2h 15m',  airline:'LATAM Brasil',        status:'Cruising',   alt:'31,000 ft', spd:'441 kts' },
  { lat:-33.4, lng:18.4,  rot:90,  flight:'SA 284',  reg:'ZS-SNB', type:'Airbus A340-600',  from:{code:'CPT',name:'Cape Town'},        to:{code:'LHR',name:'London Heathrow'},  date:'13 Dec', dep:'10:15', arr:'21:30', duration:'11h 15m', airline:'South African Airways',status:'Climbing',   alt:'27,000 ft', spd:'398 kts' },
  { lat:13.7,  lng:100.7, rot:45,  flight:'TG 910',  reg:'HS-TGY', type:'Boeing 777-200ER', from:{code:'BKK',name:'Bangkok'},          to:{code:'SYD',name:'Sydney'},           date:'14 Dec', dep:'01:20', arr:'14:35', duration:'9h 15m',  airline:'Thai Airways',        status:'Cruising',   alt:'38,000 ft', spd:'488 kts' },
];

function buildFlightPopupHTML(p) {
  const statusColor = p.status==='Cruising' ? '#2563eb' : p.status==='Climbing' ? '#10b981' : p.status==='Descending' ? '#f59e0b' : '#64748b';
  const row = (lbl, val, extra) => `
    <div style="display:flex;justify-content:space-between;align-items:baseline;padding:4px 0;border-bottom:1px solid #f8fafc;">
      <span style="font-size:12px;color:#64748b;">${lbl}:</span>
      <span style="font-size:13px;font-weight:700;color:#0f172a;${extra||''}">${val}</span>
    </div>`;
  return `
    <div style="background:var(--brand-600,#2563eb);padding:11px 36px 11px 14px;">
      <div style="color:#fff;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
        <span style="font-weight:700;font-size:14px;">${p.flight}</span>
        <span style="font-weight:400;opacity:.85;font-size:12px;"> &middot; ${p.reg} &middot; ${p.type}</span>
      </div>
    </div>
    <div style="padding:14px 16px 12px;border-bottom:1px solid #e2e8f0;">
      <div style="display:flex;align-items:flex-start;gap:4px;">
        <div style="flex:0 0 82px;">
          <div style="font-size:10px;color:#94a3b8;margin-bottom:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p.from.name}</div>
          <div style="font-size:24px;font-weight:800;color:#0f172a;line-height:1.1;">${p.from.code}</div>
          <div style="font-size:10px;color:#94a3b8;margin-top:2px;">${p.date}, ${p.dep}</div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding-top:11px;">
          <div style="display:flex;align-items:center;width:100%;gap:3px;">
            <div style="flex:1;border-top:1.5px dashed #cbd5e1;"></div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#94a3b8" stroke="none"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>
            <div style="flex:1;border-top:1.5px dashed #cbd5e1;"></div>
          </div>
          <div style="font-size:10px;color:#64748b;white-space:nowrap;">${p.duration}</div>
        </div>
        <div style="flex:0 0 82px;text-align:right;">
          <div style="font-size:10px;color:#94a3b8;margin-bottom:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;direction:rtl;">${p.to.name}</div>
          <div style="font-size:24px;font-weight:800;color:#0f172a;line-height:1.1;">${p.to.code}</div>
          <div style="font-size:10px;color:#94a3b8;margin-top:2px;">${p.date}, ${p.arr}</div>
        </div>
      </div>
    </div>
    <div style="padding:8px 16px 2px;">
      ${row('Airline', p.airline)}
      ${row('Status', p.status, 'color:' + statusColor + ';')}
      ${row('Altitude', p.alt)}
      ${row('Speed', p.spd)}
    </div>
    <div style="padding:10px 16px 14px;display:flex;justify-content:center;">
      <button style="padding:0 16px;height:32px;border:1px solid transparent;color:var(--brand-600,#2563eb);border-radius:var(--radius-md,8px);font-size:13px;font-weight:500;background:transparent;cursor:pointer;" onmouseover="this.style.background='var(--brand-50,#eff6ff)'" onmouseout="this.style.background='transparent'" onclick="window.location.href='AircraftDetails.html'">View Details</button>
    </div>`;
}

function buildAirportPopupHTML(a) {
  const lat = a.lat.toFixed(4) + '\u00b0';
  const lng = a.lng.toFixed(4) + '\u00b0';
  const row = (lbl, val) => `
    <div style="display:flex;justify-content:space-between;align-items:baseline;padding:5px 0;border-bottom:1px solid #f8fafc;">
      <span style="font-size:12px;color:#64748b;">${lbl}:</span>
      <span style="font-size:13px;font-weight:700;color:#0f172a;">${val}</span>
    </div>`;
  return `
    <div style="background:var(--brand-600,#2563eb);padding:11px 36px 11px 14px;">
      <div style="color:#fff;line-height:1.35;">
        <span style="font-weight:700;font-size:13px;">${a.name}</span>
        <span style="font-weight:400;opacity:.85;font-size:11px;"> &middot; ${a.code} &middot; ${a.country}</span>
      </div>
    </div>
    <div style="padding:10px 16px 4px;">
      ${row('Latitude', lat)}
      ${row('Longitude', lng)}
      ${row('Elevation', a.elev)}
      ${row('Runways', a.runways + ' runway' + (a.runways !== 1 ? 's' : ''))}
    </div>
    <div style="padding:8px 16px 14px;display:flex;justify-content:center;">
      <button style="background:transparent;border:1px solid transparent;border-radius:var(--radius-md,8px);padding:0 16px;height:32px;font-size:13px;font-weight:500;color:var(--brand-600,#2563eb);cursor:pointer;" onmouseover="this.style.background='var(--brand-50,#eff6ff)'" onmouseout="this.style.background='transparent'" onclick="window.location.href='AirportDetails.html'">View Details</button>
    </div>`;
}

let map = null;
let currentMapType = 'satellite';
let tileLayer = null;

const MAP_TYPES = {
  satellite: { url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', bg: '#0b1e2e' },
  street:    { url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', bg: '#f8fafc' },
  dark:      { url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', bg: '#0b1e2e' },
  light:     { url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', bg: '#e0ebe9' },
};

function setMapType(type) {
  if (!map || !MAP_TYPES[type]) return;
  currentMapType = type;
  if (tileLayer) map.removeLayer(tileLayer);
  tileLayer = L.tileLayer(MAP_TYPES[type].url, { attribution: '', subdomains: 'abcd', maxZoom: 19 }).addTo(map);
  const mapEl = document.getElementById('avia-map') || document.getElementById('avia-detail-map');
  if (mapEl) mapEl.style.background = MAP_TYPES[type].bg;
  document.querySelectorAll('[data-map-type]').forEach(b => {
    const isOn = b.dataset.mapType === type;
    const lbl = b.querySelector('[data-label]');
    const chk = b.querySelector('[data-check]');
    if (lbl) lbl.style.fontWeight = isOn ? '700' : '400';
    if (chk) chk.style.opacity = isOn ? '1' : '0';
  });
}
