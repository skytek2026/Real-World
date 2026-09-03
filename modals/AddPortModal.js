/* ──────────────────────────────────────────────────────────────────
   AddPortModal — modal to add a new port.
   Usage:
     AddPortModal.open({ onSave: ({ name, locode, ...flags }) => {...} });
     AddPortModal.close();
   ────────────────────────────────────────────────────────────────── */
(function () {
  function ensureRoot() {
    let root = document.getElementById('modal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'modal-root';
      document.body.appendChild(root);
    }
    return root;
  }

  function ensureExtraStyles() {
    if (document.getElementById('rw-modal-addport-style')) return;
    const s = document.createElement('style');
    s.id = 'rw-modal-addport-style';
    s.textContent = `
      .rw-ap-grid { display:grid; grid-template-columns:140px 1fr; gap:8px 16px; align-items:center; padding:4px 0; }
      .rw-ap-label { font-size:13px; color:#334155; }
      .rw-ap-input,
      .rw-ap-select {
        width:100%; border:1px solid #d1d5db; border-radius:4px; padding:6px 10px;
        font:inherit; font-size:13px; color:#0f172a; background:#fff;
        transition:border-color 120ms, box-shadow 120ms;
      }
      .rw-ap-input:focus,
      .rw-ap-select:focus { outline:none; border-color:var(--brand-400,#60a5fa); box-shadow:0 0 0 3px rgba(37,99,235,.10); }
      .rw-ap-input.with-handle { padding-right:32px; background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 20h9'/%3E%3Cpath d='M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z'/%3E%3C/svg%3E") no-repeat right 9px center; }
      .rw-ap-select {
        appearance:none; -webkit-appearance:none; cursor:pointer; padding-right:32px;
        background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 10px center;
        border-radius:9999px;
      }
      .rw-ap-check {
        appearance:none; -webkit-appearance:none;
        width:18px; height:18px; border:1px solid #cbd5e1; border-radius:3px; background:#fff;
        cursor:pointer; position:relative; flex-shrink:0; transition:background 120ms, border-color 120ms;
      }
      .rw-ap-check:checked { background:var(--brand-500,#3b82f6); border-color:var(--brand-500,#3b82f6); }
      .rw-ap-check:checked::after {
        content:''; position:absolute; left:5px; top:1px; width:5px; height:10px;
        border:solid #fff; border-width:0 2px 2px 0; transform:rotate(45deg);
      }
      .rw-ap-multi { position:relative; }
      .rw-ap-multi-trigger {
        width:100%; display:flex; align-items:center; justify-content:space-between; gap:8px;
        border:1px solid #d1d5db; border-radius:9999px; background:#fff;
        padding:6px 12px 6px 14px; font:inherit; font-size:13px; color:#0f172a; cursor:pointer;
        transition:border-color 120ms, box-shadow 120ms; min-height:34px;
      }
      .rw-ap-multi-trigger:focus { outline:none; border-color:var(--brand-400,#60a5fa); box-shadow:0 0 0 3px rgba(37,99,235,.10); }
      .rw-ap-multi-summary { flex:1; min-width:0; text-align:left; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
      .rw-ap-multi-summary.is-placeholder { color:#94a3b8; }
      .rw-ap-multi-menu {
        position:absolute; top:calc(100% + 4px); left:0; right:0; z-index:5;
        background:#fff; border:1px solid #e2e8f0; border-radius:8px;
        box-shadow:0 8px 24px rgba(15,23,42,.12); padding:4px 0; max-height:260px; overflow-y:auto;
      }
      .rw-ap-multi-row {
        display:flex; align-items:center; gap:10px;
        padding:8px 12px; cursor:pointer; font-size:13px; color:#334155;
      }
      .rw-ap-multi-row:hover { background:#f1f5f9; }
      .rw-ap-twocol { display:grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap:20px; }
      .rw-ap-map { width:100%; min-height:420px; height:100%; border:1px solid #e2e8f0; border-radius:8px; background:#e0ebe9; overflow:hidden; }
      .rw-ap-map .leaflet-top.leaflet-left { top:6px !important; left:6px !important; }
      .rw-ap-map-wrap { position:relative; width:100%; height:100%; min-height:420px; }
      .rw-ap-layers-btn { position:absolute; top:6px; right:6px; z-index:500; width:32px; height:32px; display:flex; align-items:center; justify-content:center; background:#fff; border:1px solid #e2e8f0; border-radius:6px; color:#334155; box-shadow:0 1px 2px rgba(15,23,42,.08); cursor:pointer; }
      .rw-ap-layers-btn:hover { background:#f1f5f9; }
      .rw-ap-layers-menu { position:absolute; top:6px; right:44px; z-index:500; width:160px; background:#fff; border:1px solid #e2e8f0; border-radius:8px; box-shadow:0 8px 24px rgba(15,23,42,.12); padding:4px 0; }
      .rw-ap-layers-menu.hidden { display:none; }
      .rw-ap-layer-opt { width:100%; display:flex; align-items:center; justify-content:space-between; padding:8px 12px; font-size:13px; color:#334155; background:transparent; border:0; cursor:pointer; text-align:left; }
      .rw-ap-layer-opt:hover { background:#f1f5f9; }
      .rw-ap-layer-opt[aria-selected="true"] { color:var(--brand-600,#2563eb); font-weight:600; }
      .rw-ap-map .leaflet-bar { margin:0 !important; border:1px solid #e2e8f0 !important; box-shadow:0 1px 2px rgba(15,23,42,.08) !important; border-radius:6px !important; overflow:hidden; }
      @media (max-width: 768px) {
        .rw-ap-twocol { grid-template-columns: 1fr; }
        .rw-ap-map { min-height:280px; }
      }
      @media (max-width: 640px) {
        .rw-ap-grid { grid-template-columns: 1fr; gap: 4px 0; }
      }
    `;
    document.head.appendChild(s);
  }

  function close() {
    const overlay = document.querySelector('#modal-root .rw-modal-overlay');
    if (!overlay) return;
    overlay.classList.add('is-closing');
    setTimeout(() => { overlay.remove(); }, 120);
  }

  const COUNTRIES = ['','Ireland','United Kingdom','Netherlands','Germany','France','Spain','Portugal','Italy','Greece','Norway','Denmark','Sweden','Finland','United States','Canada','Mexico','Brazil','Argentina','China','Japan','Singapore','India','Saudi Arabia','United Arab Emirates','Egypt','South Africa','Australia','Other'];

  const PORT_TYPES = ['Breakbulk','Container','DryBulk','DryDock','Gas','Liquid','Multipurpose','Passenger','RoRo'];

  function open(data = {}) {
    ensureExtraStyles();
    const root = ensureRoot();

    const init = {
      name:           data.name           ?? '',
      locode:         data.locode         ?? '',
      globalPortID:   data.globalPortID   ?? '',
      worldPortNumber:data.worldPortNumber?? '',
      country:        data.country        ?? '',
      lat:            data.lat            ?? '53.353584',
      lng:            data.lng            ?? '-6.251495',
      cargo:          Array.isArray(data.cargo) ? data.cargo : [],
    };

    root.innerHTML = `
      <div class="rw-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="rw-ap-title">
        <div class="rw-modal" style="max-width:1100px;">
          <div class="rw-modal-header has-close">
            <div class="rw-modal-title" id="rw-ap-title">Add a new Port</div>
            <button class="rw-modal-close-btn" data-modal-close aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="rw-modal-body">
            <div class="rw-ap-twocol">
              <div class="rw-ap-grid">
              <label class="rw-ap-label" for="ap-name">Name:</label>
              <input id="ap-name" type="text" class="rw-ap-input with-handle" value="${escapeAttr(init.name)}" />

              <label class="rw-ap-label" for="ap-locode">LOCODE:</label>
              <input id="ap-locode" type="text" class="rw-ap-input" value="${escapeAttr(init.locode)}" />

              <label class="rw-ap-label" for="ap-gpid">GlobalPortID:</label>
              <input id="ap-gpid" type="text" class="rw-ap-input" value="${escapeAttr(init.globalPortID)}" />

              <label class="rw-ap-label" for="ap-wpn">WorldPortNumber:</label>
              <input id="ap-wpn" type="text" class="rw-ap-input with-handle" value="${escapeAttr(init.worldPortNumber)}" />

              <label class="rw-ap-label" for="ap-country">Country:</label>
              <select id="ap-country" class="rw-ap-select">
                ${COUNTRIES.map(c => `<option value="${escapeAttr(c)}" ${c===init.country?'selected':''}>${c || '---------'}</option>`).join('')}
              </select>

              <label class="rw-ap-label" for="ap-lat">Lat:</label>
              <input id="ap-lat" type="text" class="rw-ap-input" value="${escapeAttr(init.lat)}" />

              <label class="rw-ap-label" for="ap-lng">Lng:</label>
              <input id="ap-lng" type="text" class="rw-ap-input" value="${escapeAttr(init.lng)}" />

                <label class="rw-ap-label" for="ap-cargo-trigger">Cargo Type:</label>
                <div class="rw-ap-multi" id="ap-cargo-wrap">
                  <button type="button" id="ap-cargo-trigger" class="rw-ap-multi-trigger" aria-haspopup="listbox" aria-expanded="false">
                    <span id="ap-cargo-summary" class="rw-ap-multi-summary"></span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2.5" stroke-linecap="round" style="flex-shrink:0;"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div id="ap-cargo-menu" class="rw-ap-multi-menu hidden" role="listbox">
                    ${PORT_TYPES.map(k => `
                      <label class="rw-ap-multi-row">
                        <input type="checkbox" class="rw-ap-check rw-ap-multi-cb" data-cargo="${escapeAttr(k)}" ${init.cargo.includes(k) ? 'checked' : ''} />
                        <span>${k}</span>
                      </label>`).join('')}
                  </div>
                </div>
              </div>
              <div class="rw-ap-map-wrap">
                <div id="ap-map" class="rw-ap-map"></div>
                <button type="button" id="ap-layers-btn" class="rw-ap-layers-btn" title="Map type">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                </button>
                <div id="ap-layers-menu" class="rw-ap-layers-menu hidden">
                  <button class="rw-ap-layer-opt" data-layer="satellite" aria-selected="true">Satellite</button>
                  <button class="rw-ap-layer-opt" data-layer="street">Street View</button>
                  <button class="rw-ap-layer-opt" data-layer="dark">Dark Mode</button>
                  <button class="rw-ap-layer-opt" data-layer="light">Light Mode</button>
                </div>
              </div>
            </div>
          </div>
          <div class="rw-modal-footer">
            <button class="rw-modal-btn rw-modal-btn-cancel" data-modal-cancel>Cancel</button>
            <button class="rw-modal-btn rw-modal-btn-primary" data-modal-save>Save</button>
          </div>
        </div>
      </div>
    `;

    const overlay = root.querySelector('.rw-modal-overlay');
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('[data-modal-cancel]').addEventListener('click', close);
    overlay.querySelector('[data-modal-close]').addEventListener('click', close);
    overlay.querySelector('[data-modal-save]').addEventListener('click', () => {
      const cargoCbs = [...overlay.querySelectorAll('.rw-ap-multi-cb')];
      const result = {
        name:            document.getElementById('ap-name').value,
        locode:          document.getElementById('ap-locode').value,
        globalPortID:    document.getElementById('ap-gpid').value,
        worldPortNumber: document.getElementById('ap-wpn').value,
        country:         document.getElementById('ap-country').value,
        lat:             document.getElementById('ap-lat').value,
        lng:             document.getElementById('ap-lng').value,
        cargo:           cargoCbs.filter(c => c.checked).map(c => c.dataset.cargo),
      };
      if (typeof data.onSave === 'function') data.onSave(result);
      close();
    });

    /* Cargo multi-select dropdown */
    const cargoWrap    = overlay.querySelector('#ap-cargo-wrap');
    const cargoTrigger = overlay.querySelector('#ap-cargo-trigger');
    const cargoMenu    = overlay.querySelector('#ap-cargo-menu');
    const cargoSummary = overlay.querySelector('#ap-cargo-summary');
    function syncCargoSummary() {
      const checked = [...overlay.querySelectorAll('.rw-ap-multi-cb')].filter(c => c.checked).map(c => c.dataset.cargo);
      if (!checked.length) {
        cargoSummary.textContent = '--------- (None)';
        cargoSummary.classList.add('is-placeholder');
      } else {
        cargoSummary.textContent = checked.join(', ');
        cargoSummary.classList.remove('is-placeholder');
      }
    }
    syncCargoSummary();
    cargoTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = cargoMenu.classList.toggle('hidden');
      cargoTrigger.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
    cargoMenu.addEventListener('click', (e) => e.stopPropagation());
    overlay.querySelectorAll('.rw-ap-multi-cb').forEach(cb => {
      cb.addEventListener('change', syncCargoSummary);
    });
    document.addEventListener('click', (e) => {
      if (!cargoWrap.contains(e.target)) {
        cargoMenu.classList.add('hidden');
        cargoTrigger.setAttribute('aria-expanded', 'false');
      }
    });

    const escHandler = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); } };
    document.addEventListener('keydown', escHandler);

    setTimeout(() => document.getElementById('ap-name')?.focus(), 50);

    /* Leaflet map with draggable marker */
    if (typeof L !== 'undefined') {
      const latInp = document.getElementById('ap-lat');
      const lngInp = document.getElementById('ap-lng');
      const parseLat = () => { const v = parseFloat(latInp.value); return isFinite(v) ? v : 53.353584; };
      const parseLng = () => { const v = parseFloat(lngInp.value); return isFinite(v) ? v : -6.251495; };
      const mapEl = document.getElementById('ap-map');
      if (mapEl) {
        // Defer to next frame so the container has its real dimensions
        setTimeout(() => {
          const map = L.map(mapEl, { center:[parseLat(), parseLng()], zoom:6, zoomControl:true, attributionControl:false });

          const TILES = {
            satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            street:    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            dark:      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            light:     'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          };
          let tile = L.tileLayer(TILES.satellite, { maxZoom:19, subdomains:'abcd' }).addTo(map);
          function setMapType(t) {
            if (!TILES[t]) return;
            if (tile) map.removeLayer(tile);
            tile = L.tileLayer(TILES[t], { maxZoom:19, subdomains:'abcd' }).addTo(map);
            overlay.querySelectorAll('.rw-ap-layer-opt').forEach(b => b.setAttribute('aria-selected', String(b.dataset.layer === t)));
          }

          /* Layers menu */
          const layersBtn  = overlay.querySelector('#ap-layers-btn');
          const layersMenu = overlay.querySelector('#ap-layers-menu');
          if (layersBtn && layersMenu) {
            layersBtn.onclick = (e) => { e.stopPropagation(); layersMenu.classList.toggle('hidden'); };
            layersMenu.onclick = (e) => e.stopPropagation();
            layersMenu.querySelectorAll('[data-layer]').forEach(opt => {
              opt.onclick = (e) => { e.stopPropagation(); setMapType(opt.dataset.layer); layersMenu.classList.add('hidden'); };
            });
            document.addEventListener('click', () => layersMenu.classList.add('hidden'));
          }

          const pinHtml = `
            <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 2px 4px rgba(0,0,0,.35));">
              <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 24 16 24s16-12 16-24C32 7.16 24.84 0 16 0z" fill="var(--brand-600,#2563eb)"/>
              <circle cx="16" cy="16" r="6" fill="#fff"/>
            </svg>`;
          const icon = L.divIcon({ html:pinHtml, className:'', iconSize:[32,40], iconAnchor:[16,40] });
          const marker = L.marker([parseLat(), parseLng()], { icon, draggable:true }).addTo(map);

          // Updating inputs from marker drag
          marker.on('dragend', () => {
            const ll = marker.getLatLng();
            latInp.value = ll.lat.toFixed(6);
            lngInp.value = ll.lng.toFixed(6);
          });
          // Click on map → move marker + update inputs
          map.on('click', (e) => {
            marker.setLatLng(e.latlng);
            latInp.value = e.latlng.lat.toFixed(6);
            lngInp.value = e.latlng.lng.toFixed(6);
          });
          // Updating marker when inputs change
          const updateFromInputs = () => {
            const lat = parseLat(); const lng = parseLng();
            marker.setLatLng([lat, lng]);
            map.panTo([lat, lng], { animate:true });
          };
          latInp.addEventListener('change', updateFromInputs);
          latInp.addEventListener('input',  updateFromInputs);
          lngInp.addEventListener('change', updateFromInputs);
          lngInp.addEventListener('input',  updateFromInputs);

          setTimeout(() => map.invalidateSize(), 60);
        }, 60);
      }
    }
  }

  function escapeAttr(s) {
    return String(s ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  window.AddPortModal = { open, close };
})();
