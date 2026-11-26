/* Storm track for Leaflet maps (Weather page, Weather Event details).
   drawStormTrack(map, storm) draws, bottom to top:
     - forecast cone: area of uncertainty around the forecast track, widening with lead time (dashed outline)
     - past track: solid line through the past positions
     - forecast track: dashed line from the current position through the forecast positions
     - past / forecast position dots, each with a tooltip: Past or Forecast position, date, time (UTC), wind speed
   The current position is the storm's own marker, drawn by the page.
   Track points: { lat, lng, kind:'past'|'forecast', t?:'YYYY-MM-DDTHH:MMZ', wind?:km/h }.
   Missing times default to 6-hourly (past) / 12-hourly (forecast) from storm.updated; missing winds to storm.wind.
   Returns the Leaflet layers it added. */
(function () {
  const STYLE_ID = 'storm-track-style';
  if (!document.getElementById(STYLE_ID)) {
    const st = document.createElement('style');
    st.id = STYLE_ID;
    st.textContent = `
      .leaflet-tooltip.storm-tip { background:#111827; color:#f9fafb; border:0; border-radius:8px; padding:7px 10px; box-shadow:0 4px 14px rgba(0,0,0,.35); font:12px/1.45 Inter,system-ui,sans-serif; }
      .leaflet-tooltip.storm-tip::before { border-top-color:#111827; }
      .storm-tip .st-k { font-size:11px; font-weight:700; letter-spacing:.04em; text-transform:uppercase; color:#93c5fd; margin-bottom:2px; }
      .storm-tip .st-k.is-past { color:#d1d5db; }
      .storm-tip .st-r { display:flex; justify-content:space-between; gap:14px; font-variant-numeric:tabular-nums; }
      .storm-tip .st-r span:first-child { color:#9ca3af; }
      .storm-legend { background:rgba(255,255,255,.92); backdrop-filter:blur(4px); border:1px solid #e5e7eb; border-radius:8px; padding:10px 14px; box-shadow:0 2px 8px rgba(15,23,42,.1); font-family:Inter,system-ui,sans-serif; }
      .storm-legend .sl-h { font-size:11px; font-weight:700; color:#6b7280; text-transform:uppercase; letter-spacing:.05em; margin-bottom:8px; }
      .storm-legend .sl-rows { display:flex; flex-direction:column; gap:6px; }
      .storm-legend .sl-r { display:flex; align-items:center; gap:8px; font-size:12px; color:#4b5563; white-space:nowrap; }
      .storm-legend .sl-r svg, .storm-legend .sl-cur { flex-shrink:0; }
      .storm-legend .sl-cur { width:12px; height:12px; margin:0 5px; border-radius:50%; background:#ef4444; border:2px solid #fff; box-shadow:0 0 0 3px rgba(239,68,68,.3); display:inline-block; }
      html[data-theme="dark"] .storm-legend { background:rgba(15,23,42,.9); border-color:#374151; }
      html[data-theme="dark"] .storm-legend .sl-r { color:#d1d5db; }
    `;
    document.head.appendChild(st);
  }

  const H = 3600e3;
  const parseUpdated = s => {
    if (!s) return Date.UTC(2025, 6, 4, 18, 0);                        // 2025-07-04 18:00 UTC
    const m = String(s).match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/);
    return m ? Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]) : Date.UTC(2025, 6, 4, 18, 0);
  };
  const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'], MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const fmtDate = ms => { const d = new Date(ms); return `${DAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`; };
  const fmtTime = ms => { const d = new Date(ms); return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')} UTC`; };

  function points(storm) {
    const now = parseUpdated(storm.updated);
    const track = storm.track || [];
    const past = track.filter(p => p.kind === 'past'), fore = track.filter(p => p.kind === 'forecast');
    const withTime = (p, fallbackMs) => ({ ...p, ms: p.t ? Date.parse(p.t) : fallbackMs, wind: p.wind != null ? p.wind : storm.wind });
    return {
      now,
      past: past.map((p, i) => withTime(p, now - (past.length - i) * 6 * H)),
      fore: fore.map((p, i) => withTime(p, now + (i + 1) * 12 * H)),
    };
  }

  /* Cone of uncertainty: circles along the forecast track whose radius grows with lead time, joined by their
     outer tangents, with a round cap ahead of the last point. Worked in km on a local flat projection. */
  function conePolygon(curLat, curLng, fore, nowMs) {
    const lat0 = curLat * Math.PI / 180, KM = 111.32, kx = KM * Math.cos(lat0);
    const toXY = (lat, lng) => [(lng - curLng) * kx, (lat - curLat) * KM];
    const toLL = ([x, y]) => [curLat + y / KM, curLng + x / kx];
    const radiusKm = hrs => 25 + hrs * 4.2;                               // ~25 km now, ~175 km at +36 h, ~225 km at +48 h
    const P = [{ xy: toXY(curLat, curLng), r: radiusKm(0) }].concat(fore.map(p => ({ xy: toXY(p.lat, p.lng), r: radiusKm(Math.max(0, (p.ms - nowMs) / H)) })));
    if (P.length < 2) return null;
    const left = [], right = [];
    for (let i = 0; i < P.length; i++) {
      const a = P[Math.max(0, i - 1)].xy, b = P[Math.min(P.length - 1, i + 1)].xy;
      let dx = b[0] - a[0], dy = b[1] - a[1]; const len = Math.hypot(dx, dy) || 1; dx /= len; dy /= len;
      const nx = -dy, ny = dx, [x, y] = P[i].xy, r = P[i].r;
      left.push([x + nx * r, y + ny * r]); right.push([x - nx * r, y - ny * r]);
    }
    const arc = (c, r, from, to, steps) => { const out = []; for (let s = 0; s <= steps; s++) { const t = from + (to - from) * s / steps; out.push([c[0] + Math.cos(t) * r, c[1] + Math.sin(t) * r]); } return out; };
    const last = P[P.length - 1], prev = P[P.length - 2];
    const head = Math.atan2(last.xy[1] - prev.xy[1], last.xy[0] - prev.xy[0]);
    const endCap = arc(last.xy, last.r, head + Math.PI / 2, head - Math.PI / 2, 18);   // round front, left -> right
    const first = P[0], second = P[1];
    const tail = Math.atan2(second.xy[1] - first.xy[1], second.xy[0] - first.xy[0]);
    const startCap = arc(first.xy, first.r, tail - Math.PI / 2, tail - 3 * Math.PI / 2, 10); // round back, right -> left
    const ring = left.concat(endCap, right.slice().reverse(), startCap);
    return ring.map(toLL);
  }

  function tip(kind, p) {
    return `<div class="st-k ${kind === 'past' ? 'is-past' : ''}">${kind === 'past' ? 'Past position' : 'Forecast position'}</div>`
      + `<div class="st-r"><span>Date</span><b>${fmtDate(p.ms)}</b></div>`
      + `<div class="st-r"><span>Time</span><b>${fmtTime(p.ms)}</b></div>`
      + `<div class="st-r"><span>Wind speed</span><b>${Math.round(p.wind)} km/h</b></div>`;
  }

  function dot(map, p, kind) {
    const base = kind === 'past'
      ? { radius:4, color:'#374151', weight:1.5, fillColor:'#e5e7eb', fillOpacity:1 }
      : { radius:4.5, color:'#4b5563', weight:1.5, fillColor:'#9ca3af', fillOpacity:1 };
    const m = L.circleMarker([p.lat, p.lng], { ...base, bubblingMouseEvents:false })
      .bindTooltip(tip(kind, p), { className:'storm-tip', direction:'top', offset:[0, -6], opacity:1 })
      .addTo(map);
    m.on('mouseover', () => m.setStyle({ radius: base.radius + 2 }));
    m.on('mouseout', () => m.setStyle({ radius: base.radius }));
    return m;
  }

  window.drawStormTrack = function (map, storm) {
    if (!map || !storm || !window.L) return [];
    const layers = [], { now, past, fore } = points(storm), cur = [storm.lat, storm.lng];
    if (fore.length) {
      const ring = conePolygon(storm.lat, storm.lng, fore, now);
      if (ring) layers.push(L.polygon(ring, { color:'#60a5fa', weight:2, dashArray:'6 6', fillColor:'#3b82f6', fillOpacity:.22, interactive:false }).addTo(map));
    }
    if (past.length) layers.push(L.polyline([...past.map(p => [p.lat, p.lng]), cur], { color:'#e5e7eb', weight:2, opacity:.95, interactive:false }).addTo(map));
    if (fore.length) layers.push(L.polyline([cur, ...fore.map(p => [p.lat, p.lng])], { color:'#d1d5db', weight:2, dashArray:'5 6', opacity:.95, interactive:false }).addTo(map));
    past.forEach(p => layers.push(dot(map, p, 'past')));
    fore.forEach(p => layers.push(dot(map, p, 'forecast')));
    return layers;
  };

  /* Track legend: the same rows on every map (current, past, forecast, cone). */
  const sw = (dash, fill, stroke) => `<svg width="22" height="10" viewBox="0 0 22 10" aria-hidden="true"><line x1="1" y1="5" x2="21" y2="5" stroke="#9ca3af" stroke-width="2"${dash ? ' stroke-dasharray="3 3"' : ''}/><circle cx="11" cy="5" r="3.2" fill="${fill}" stroke="${stroke}" stroke-width="1.4"/></svg>`;
  window.stormTrackLegendHTML = function (withCone) {
    return `<div class="sl-h">Track Legend</div><div class="sl-rows">
      <div class="sl-r"><span class="sl-cur"></span>Current position</div>
      <div class="sl-r">${sw(false, '#e5e7eb', '#374151')}Past track</div>
      <div class="sl-r">${sw(true, '#9ca3af', '#4b5563')}Forecast track</div>
      ${withCone === false ? '' : `<div class="sl-r"><svg width="22" height="12" viewBox="0 0 22 12" aria-hidden="true"><rect x="1" y="1" width="20" height="10" rx="3" fill="rgba(59,130,246,.28)" stroke="#60a5fa" stroke-width="1.4" stroke-dasharray="3 2"/></svg>Forecast cone</div>`}
    </div>`;
  };
  /* As a Leaflet control, for maps that don't have a legend of their own. */
  window.addStormTrackLegend = function (map, position) {
    if (!map || !window.L) return null;
    const c = L.control({ position: position || 'bottomleft' });
    c.onAdd = () => { const d = L.DomUtil.create('div', 'storm-legend'); d.innerHTML = stormTrackLegendHTML(true); L.DomEvent.disableClickPropagation(d); return d; };
    return c.addTo(map);
  };
})();
