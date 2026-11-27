/* Section: Domain primitives: Data viz, Maps, Formatting */

/* ============================================================
   Data visualization
   ============================================================ */

const CategoricalPalette = () => {
  const cats = [
    ["--chart-cat-1", "#1485c5", "Series 1"],
    ["--chart-cat-2", "#D97706", "Series 2"],
    ["--chart-cat-3", "#16A34A", "Series 3"],
    ["--chart-cat-4", "#9333EA", "Series 4"],
    ["--chart-cat-5", "#DB2777", "Series 5"],
    ["--chart-cat-6", "#0891B2", "Series 6"],
    ["--chart-cat-7", "#65A30D", "Series 7"],
    ["--chart-cat-8", "#475569", "Series 8"],
  ];
  return (
    <div>
      <div className="chart-palette">
        {cats.map(([t, v]) => (
          <div key={t}>
            <div className="sw" style={{ background: v }} />
            <div className="lbl">{t.replace("--chart-cat-", "cat-")}</div>
          </div>
        ))}
      </div>
      <p className="t-caption" style={{ marginTop: 0 }}>
        Use in declared order: series 1 is always the primary or first series in legend order.
        Tested for protanopia, deuteranopia and tritanopia with adjacent-pair contrast ≥ 3:1.
      </p>
    </div>
  );
};

const SequentialRamp = ({ title, vars, labels, desc }) => (
  <div>
    <div className="t-label" style={{ marginBottom: 4 }}>{title}</div>
    <div className="chart-ramp">
      {vars.map(v => <div key={v} style={{ background: `var(${v})` }} />)}
    </div>
    <div className="ramp-labels">
      {labels.map((l, i) => <span key={i}>{l}</span>)}
    </div>
    <p className="t-caption" style={{ marginTop: 8 }}>{desc}</p>
  </div>
);

/* Live demo: bar chart using tokens */
const DemoBarChart = () => {
  const data = [
    { label: "Maritime", value: 1247, color: "var(--chart-cat-1)" },
    { label: "Aviation", value: 832,  color: "var(--chart-cat-2)" },
    { label: "Offshore", value: 614,  color: "var(--chart-cat-3)" },
    { label: "GSIN",     value: 391,  color: "var(--chart-cat-4)" },
    { label: "Portfolio",value: 248,  color: "var(--chart-cat-5)" },
  ];
  const max = 1400, threshold = 1000;
  const w = 480, h = 200, pad = { t: 12, r: 8, b: 28, l: 36 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const bw = innerW / data.length;
  const yTicks = [0, 350, 700, 1050, 1400];
  return (
    <div className="chart-demo">
      <div className="t-label" style={{ marginBottom: 8 }}>Active alerts by domain · last 7 days</div>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Active alerts by domain">
        {/* gridlines */}
        {yTicks.map(t => {
          const y = pad.t + innerH - (t / max) * innerH;
          return <line key={t} x1={pad.l} x2={w - pad.r} y1={y} y2={y} stroke="var(--chart-grid)" strokeWidth="1" />;
        })}
        {/* y labels */}
        {yTicks.map(t => {
          const y = pad.t + innerH - (t / max) * innerH;
          return <text key={t} x={pad.l - 6} y={y + 3} textAnchor="end" fontSize="10" fill="var(--chart-axis-label)" fontFamily="var(--font-mono)">{t}</text>;
        })}
        {/* threshold */}
        <line x1={pad.l} x2={w - pad.r} y1={pad.t + innerH - (threshold / max) * innerH} y2={pad.t + innerH - (threshold / max) * innerH}
              stroke="var(--chart-threshold-warn)" strokeWidth="1.25" strokeDasharray="4 3" />
        <text x={w - pad.r} y={pad.t + innerH - (threshold / max) * innerH - 4} textAnchor="end"
              fontSize="10" fill="var(--warning-700)" fontFamily="var(--font-mono)">
          warn ≥ {threshold}
        </text>
        {/* bars */}
        {data.map((d, i) => {
          const bh = (d.value / max) * innerH;
          const x = pad.l + bw * i + 6;
          const y = pad.t + innerH - bh;
          return (
            <g key={d.label}>
              <rect x={x} y={y} width={bw - 12} height={bh} fill={d.color} rx="2" />
              <text x={x + (bw - 12) / 2} y={pad.t + innerH + 14} textAnchor="middle"
                    fontSize="10.5" fill="var(--chart-axis-label)" fontFamily="var(--font-sans)">{d.label}</text>
              <text x={x + (bw - 12) / 2} y={y - 4} textAnchor="middle"
                    fontSize="10" fontWeight="600" fill="var(--text-primary)" fontFamily="var(--font-mono)">{d.value}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* Live demo: sparklines */
const Sparkline = ({ values, color, height = 28, width = 96, fill = false }) => {
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);
  const pts = values.map((v, i) => [i * stepX, height - ((v - min) / range) * height]);
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden="true" style={{ display: "block" }}>
      {fill && (
        <path d={`${d} L${width} ${height} L0 ${height} Z`} fill={color} fillOpacity="0.12" />
      )}
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2" fill={color} />
    </svg>
  );
};

const DemoSparklines = () => {
  const rows = [
    { label: "High-risk vessels",  value: "412",     delta: "+8.2%", up: true,  color: "var(--chart-cat-1)", values: [320,328,335,344,360,372,389,402,408,412] },
    { label: "Sanction hits",      value: "27",      delta: "+12.5%", up: true, color: "var(--danger-500)",  values: [12,14,18,15,19,21,24,22,25,27] },
    { label: "Avg. dwell time",    value: "3.4d",    delta: "-4.1%", up: false, color: "var(--success-500)", values: [4.2,4.0,3.9,4.1,3.8,3.7,3.6,3.5,3.5,3.4] },
    { label: "Policies expiring",  value: "61",      delta: "—",     up: null,  color: "var(--chart-cat-4)", values: [55,58,60,62,58,60,61,59,60,61] },
  ];
  return (
    <div className="chart-demo">
      <div className="t-label" style={{ marginBottom: 8 }}>Sparkline KPI strip</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {rows.map(r => (
          <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderTop: "1px solid var(--border-subtle)" }}>
            <div style={{ flex: 1 }}>
              <div className="t-caption" style={{ marginBottom: 2 }}>{r.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span className="t-numeric" style={{ fontSize: 20, fontWeight: 700 }}>{r.value}</span>
                <span style={{ fontSize: 11, fontWeight: 600,
                               color: r.up === true ? "var(--danger-700)" : r.up === false ? "var(--success-700)" : "var(--text-muted)" }}>
                  {r.delta}
                </span>
              </div>
            </div>
            <Sparkline values={r.values} color={r.color} fill />
          </div>
        ))}
      </div>
    </div>
  );
};

const ChartAxisRules = () => (
  <table className="spec-table">
    <thead>
      <tr><th>Element</th><th>Token</th><th>Rule</th></tr>
    </thead>
    <tbody>
      <tr><td>Gridlines</td><td><code>--chart-grid</code></td><td>Horizontal only. Never vertical gridlines on a time x-axis.</td></tr>
      <tr><td>Axis line</td><td><code>--chart-axis</code></td><td>1px, only on the value axis. Category axis line is omitted.</td></tr>
      <tr><td>Axis labels</td><td><code>--chart-axis-label</code> · 11px mono</td><td>Tabular numerals. No trailing zeros on whole values.</td></tr>
      <tr><td>Tick density</td><td>—</td><td>4–6 ticks on a value axis. Time axis ticks snap to natural breaks (5m, 1h, 1d).</td></tr>
      <tr><td>Threshold</td><td><code>--chart-threshold-warn</code> / <code>--chart-threshold-danger</code></td><td>Dashed 4–3, labelled at right edge.</td></tr>
      <tr><td>Legend</td><td>Inline 12px, top-left</td><td>Omit when ≤ 1 series. Wrap to multi-line before truncating series names.</td></tr>
      <tr><td>Empty state</td><td>—</td><td>Show <code>—</code> placeholder + caption "No data in range." Never render an empty chart frame.</td></tr>
      <tr><td>Loading</td><td>Skeleton</td><td>Skeleton matches chart aspect ratio. No spinning loaders inside chart frames.</td></tr>
    </tbody>
  </table>
);

const DataVizSection = () => (
  <>
    <div className="subsection">
      <h3 className="subsection-title">Categorical palette</h3>
      <p className="subsection-desc">
        Eight ordered hues for qualitative series, pie slices, multi-line charts, stacked bars.
        Engineers select by index, never by hex. The palette is fixed so charts read the same across modules.
      </p>
      <CategoricalPalette />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Sequential &amp; divergent ramps</h3>
      <p className="subsection-desc">
        For heatmaps, choropleths, and risk gradients. Use sequential for one-direction quantities (volume, exposure);
        use divergent for signed values where zero is meaningful (P&amp;L delta, change vs. baseline).
      </p>
      <div className="grid-2">
        <SequentialRamp
          title="Sequential · brand single-hue"
          vars={["--chart-seq-1","--chart-seq-2","--chart-seq-3","--chart-seq-4","--chart-seq-5","--chart-seq-6","--chart-seq-7"]}
          labels={["low", "", "", "", "", "", "high"]}
          desc="Perceptually-uniform ramp built from --brand-050 → --brand-700."
        />
        <SequentialRamp
          title="Divergent · danger ↔ neutral ↔ success"
          vars={["--chart-div-neg-3","--chart-div-neg-2","--chart-div-neg-1","--chart-div-zero","--chart-div-pos-1","--chart-div-pos-2","--chart-div-pos-3"]}
          labels={["−high", "", "", "0", "", "", "+high"]}
          desc="Always center on neutral. Asymmetric ranges should not stretch the ramp, clip and label instead."
        />
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Patterns in context</h3>
      <p className="subsection-desc">Live, token-driven examples. Bars + sparklines render directly in this page; the same tokens feed the Highcharts theme below.</p>
      <div className="grid-2">
        <DemoBarChart />
        <DemoSparklines />
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Axis, grid &amp; legend rules</h3>
      <ChartAxisRules />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">A–E rating in charts</h3>
      <p className="subsection-desc">
        The product's A–E risk grade is its own scale. Never substitute it with the categorical palette, and never blend it into a sequential ramp.
        Use the rating tokens as discrete fills, ordered A → E, with the same swatch shape as the <code className="inline">.ds-rating</code> pill.
      </p>
      <div className="panel">
        <div className="panel-body">
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 120 }}>
            {[
              { r: "a", n: 38, label: "A" },
              { r: "b", n: 92, label: "B" },
              { r: "c", n: 71, label: "C" },
              { r: "d", n: 44, label: "D" },
              { r: "e", n: 18, label: "E" },
            ].map(x => (
              <div key={x.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: "100%",
                  height: `${x.n}%`,
                  background: `var(--rating-${x.r})`,
                  borderRadius: 4,
                }}/>
                <span className="t-mono" style={{ fontSize: 11 }}>{x.label} · {x.n}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel-foot">Distribution of fleet by current rating · n=263</div>
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Highcharts theme</h3>
      <p className="subsection-desc">
        Skytek's chart library is Highcharts. Wrap it in <code className="inline">app/ui/Chart</code> so every chart reads from tokens, not from the global Highcharts theme.
      </p>
      <pre className="code">{`// app/ui/Chart/theme.ts
import Highcharts from 'highcharts';

const css = (v: string) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();

export const skytekChartTheme: Highcharts.Options = {
  colors: [
    css('--chart-cat-1'), css('--chart-cat-2'), css('--chart-cat-3'), css('--chart-cat-4'),
    css('--chart-cat-5'), css('--chart-cat-6'), css('--chart-cat-7'), css('--chart-cat-8'),
  ],
  chart: { backgroundColor: 'transparent', style: { fontFamily: css('--font-sans') } },
  title: { style: { fontSize: '14px', fontWeight: '600', color: css('--text-primary') } },
  xAxis: {
    lineColor: 'transparent',
    tickColor: css('--chart-axis'),
    labels: { style: { color: css('--chart-axis-label'), fontFamily: css('--font-mono'), fontSize: '11px' } },
  },
  yAxis: {
    gridLineColor: css('--chart-grid'),
    lineColor: css('--chart-axis'),
    labels: { style: { color: css('--chart-axis-label'), fontFamily: css('--font-mono'), fontSize: '11px' } },
  },
  legend: { itemStyle: { fontSize: '12px', color: css('--text-secondary') } },
  tooltip: {
    backgroundColor: css('--bg-inverse'),
    borderWidth: 0, borderRadius: 6, shadow: false,
    style: { color: css('--text-inverse'), fontSize: '12px' },
  },
  plotOptions: { series: { animation: { duration: 200 }, marker: { radius: 3 } } },
};

Highcharts.setOptions(skytekChartTheme);`}</pre>
    </div>

    <div className="callout">
      <strong>Rule:</strong> charts in modules never set <code className="inline">colors</code>, <code className="inline">fontFamily</code>, or axis colors directly. If a chart needs a non-default color, lift the value into a token first.
    </div>

    <div className="callout" style={{ marginTop: 12 }}>
      <strong>Composite charts →</strong> the ready-made <a href="#charts" style={{ color: "var(--brand-700)", fontWeight: 600 }}>Bar, Line &amp; Donut components</a> assemble these tokens and primitives into product-ready charts with built-in states and accessibility.
    </div>
  </>
);


/* ============================================================
   Maps & geospatial
   ============================================================ */

/* Canonical vessel type palette, matches MarineDashboard VESSEL_TYPES */
const VESSEL_TYPE_PALETTE = [
  { k: "Container",          color: "#2563eb" },
  { k: "Bulk Carrier",       color: "#3b82f6" },
  { k: "Tanker",             color: "#ef4444" },
  { k: "Gas Carrier",        color: "#f97316" },
  { k: "LNG Carrier",        color: "#eab308" },
  { k: "General Cargo",      color: "#22c55e" },
  { k: "Refrigerated Cargo", color: "#06b6d4" },
  { k: "Cruise Passenger",   color: "#ec4899" },
  { k: "Vehicle Carrier",    color: "#8b5cf6" },
  { k: "Yacht",              color: "#f59e0b" },
];

const TileProviders = () => {
  const rows = [
    ["Satellite",   "default", "Esri World Imagery",       "server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", "#0b1e2e"],
    ["Street View", "",        "OpenStreetMap",            "{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",                                              "#e5e7eb"],
    ["Dark Mode",   "",        "CartoDB Dark Matter",      "{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",                                   "#0b0f1a"],
    ["Light Mode",  "",        "CartoDB Positron",         "{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",                                  "#f1f5f9"],
  ];
  return (
    <table className="spec-table">
      <thead>
        <tr><th>Layer</th><th></th><th>Provider</th><th>Tile URL template</th><th>Fallback bg</th></tr>
      </thead>
      <tbody>
        {rows.map(([name, def, prov, url, bg]) => (
          <tr key={name}>
            <td><strong>{name}</strong></td>
            <td>{def && <span className="ds-badge ds-badge--info">default</span>}</td>
            <td style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>{prov}</td>
            <td><code style={{ fontSize: 11 }}>{url}</code></td>
            <td>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span className="swatch-mini" style={{ background: bg, width: 18, height: 18 }} />
                <span className="t-mono" style={{ fontSize: 11, color: "var(--text-muted)" }}>{bg}</span>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const VesselTeardropGlyph = ({ color, heading = 0, size = 16 }) => (
  <span style={{ display: "inline-flex", width: size, height: size, alignItems: "center", justifyContent: "center" }}>
    <span className="ds-vessel-marker" style={{ display: "inline-block", transform: `rotate(${heading + 45}deg)`, transformOrigin: "center" }}>
      <svg viewBox="0 0 24 24" width={size} height={size} style={{ color, display: "block" }}
           fill="currentColor" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M12 2 L19 20 L12 16 L5 20 Z" />
      </svg>
    </span>
  </span>
);

const VesselTypeLegend = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
    {VESSEL_TYPE_PALETTE.map(t => (
      <span key={t.k} className="vessel-type-swatch">
        <span className="glyph" style={{
          background: "transparent",
          width: 0, height: 0,
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderBottom: `12px solid ${t.color}`,
          transform: "rotate(0deg)",
        }} />
        {t.k}
      </span>
    ))}
  </div>
);

/* Live Leaflet map embedded directly in the spec */
const LiveLeafletMap = () => {
  const ref = React.useRef(null);
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    if (!window.L || !ref.current || mapRef.current) return;

    const L = window.L;
    const map = L.map(ref.current, {
      center: [30, 0], zoom: 2, minZoom: 2, maxZoom: 6,
      worldCopyJump: true, zoomControl: true, attributionControl: true,
    });
    mapRef.current = map;

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      { attribution: "© OpenStreetMap contributors © CARTO", maxZoom: 19 }
    ).addTo(map);

    const sample = [
      { name: "ATLANTIC PEARL",   type: "Container",    color: "#2563eb", lat: 45, lng: -30, heading: 75 },
      { name: "NORDIC STAR",      type: "LNG Carrier",  color: "#eab308", lat: 58, lng: 5,   heading: 220 },
      { name: "MIRAMAR",          type: "Tanker",       color: "#ef4444", lat: 25, lng: 55,  heading: 160 },
      { name: "SOUTHERN CROSS",   type: "Bulk Carrier", color: "#3b82f6", lat: -25, lng: 30, heading: 320 },
      { name: "GULF VOYAGER",     type: "Tanker",       color: "#ef4444", lat: 28, lng: -90, heading: 90  },
      { name: "PACIFIC DAWN",     type: "Container",    color: "#2563eb", lat: 10, lng: 130, heading: 45  },
      { name: "ARCTIC WIND",      type: "Gas Carrier",  color: "#f97316", lat: 62, lng: -160, heading: 200 },
      { name: "BLUE HORIZON",     type: "General Cargo",color: "#22c55e", lat: -10, lng: 100, heading: 270 },
      { name: "CORAL EXPLORER",   type: "Cruise Passenger", color: "#ec4899", lat: 17, lng: -75, heading: 30 },
      { name: "SEASPRITE",        type: "Yacht",        color: "#f59e0b", lat: 38, lng: 18, heading: 120 },
    ];

    const mkIcon = (v) => L.divIcon({
      className: "",
      html: `<div class="ds-vessel-marker" style="transform: rotate(${v.heading + 45}deg); transform-origin: center;">
        <svg viewBox="0 0 24 24" width="16" height="16" style="color:${v.color};" fill="currentColor" stroke="#fff" stroke-width="1.2" stroke-linejoin="round">
          <path d="M12 2 L19 20 L12 16 L5 20 Z"/>
        </svg></div>`,
      iconSize: [16, 16], iconAnchor: [8, 8],
    });

    const mkPopup = (v) => `
      <div class="vp">
        <div class="vp-header">
          <div>
            <div class="vp-title">${v.name}</div>
            <div class="vp-subtitle">${v.type}</div>
          </div>
        </div>
        <div class="vp-route">
          <div class="vp-port">
            <div class="vp-port-code">SG</div>
            <div class="vp-port-name">Singapore</div>
            <div class="vp-port-time">ADT: 04 Apr, 08:00</div>
          </div>
          <div class="vp-arrow">→</div>
          <div class="vp-port">
            <div class="vp-port-code">NL</div>
            <div class="vp-port-name">Rotterdam</div>
            <div class="vp-port-time">ETA: 19 Apr, 14:00</div>
          </div>
        </div>
        <div class="vp-grid">
          <div><div class="vp-k">Speed</div><div class="vp-v"><span class="vp-strong">14.2</span> kn</div></div>
          <div><div class="vp-k">Heading</div><div class="vp-v">${String(v.heading).padStart(3, "0")}°</div></div>
          <div><div class="vp-k">Draught</div><div class="vp-v"><span class="vp-strong">12.40</span> <span class="vp-muted">m</span></div></div>
          <div><div class="vp-k">Flag</div><div class="vp-v">Liberia</div></div>
          <div class="vp-span"><div class="vp-k">Nav status</div><div class="vp-v vp-nav">Underway Using Engine</div></div>
          <div class="vp-span"><div class="vp-k">Policy</div><div class="vp-v vp-strong">Hull & Machinery</div></div>
        </div>
        <a href="#" class="vp-cta" onclick="event.preventDefault()">View Full Vessel Details</a>
      </div>`;

    sample.forEach(v => {
      L.marker([v.lat, v.lng], { icon: mkIcon(v) })
        .bindPopup(mkPopup(v), { className: "ds-vessel-popup", maxWidth: 320, minWidth: 300, closeButton: true, autoPanPadding: [30, 30] })
        .addTo(map);
    });

    return () => { map.remove(); mapRef.current = null; };
  }, []);

  return (
    <div className="ds-leaflet" ref={ref} role="region" aria-label="Live vessel map demo" />
  );
};

const PopupTemplatePreview = () => (
  <div style={{ display: "flex", justifyContent: "center", padding: "24px", background: "var(--bg-canvas)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)" }}>
    <div style={{ width: 300, borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--card-shadow-modal)" }}>
      <div className="vp">
        <div className="vp-header">
          <div>
            <div className="vp-title">ATLANTIC PEARL</div>
            <div className="vp-subtitle">Container Ship</div>
          </div>
        </div>
        <div className="vp-route">
          <div className="vp-port">
            <div className="vp-port-code">SG</div>
            <div className="vp-port-name">Singapore</div>
            <div className="vp-port-time">ADT: 04 Apr, 08:00</div>
          </div>
          <div className="vp-arrow">→</div>
          <div className="vp-port">
            <div className="vp-port-code">NL</div>
            <div className="vp-port-name">Rotterdam</div>
            <div className="vp-port-time">ETA: 19 Apr, 14:00</div>
          </div>
        </div>
        <div className="vp-grid">
          <div><div className="vp-k">Speed</div><div className="vp-v"><span className="vp-strong">14.2</span> kn</div></div>
          <div><div className="vp-k">Heading</div><div className="vp-v">075°</div></div>
          <div><div className="vp-k">Draught</div><div className="vp-v"><span className="vp-strong">12.40</span> <span className="vp-muted">m</span></div></div>
          <div><div className="vp-k">Flag</div><div className="vp-v">Liberia</div></div>
          <div className="vp-span"><div className="vp-k">Nav status</div><div className="vp-v vp-nav">Underway Using Engine</div></div>
          <div className="vp-span"><div className="vp-k">Policy</div><div className="vp-v vp-strong">Hull & Machinery</div></div>
        </div>
        <a href="#" className="vp-cta" onClick={e => e.preventDefault()}>View Full Vessel Details</a>
      </div>
    </div>
  </div>
);

const MapToolbarPreview = () => (
  <div style={{ position: "relative", height: 200, background: "var(--bg-canvas)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 4 }}>
      <button className="ds-map-btn" title="Zoom in">+</button>
      <button className="ds-map-btn" title="Zoom out">−</button>
    </div>
    <button className="ds-map-btn" style={{ position: "absolute", top: 12, left: 84 }} title="Fullscreen">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>
    </button>
    <div className="ds-map-toolbar">
      <button className="ds-map-btn" title="Layers">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
      </button>
      <button className="ds-map-btn" title="Filter vessels">
        <Icon d={I.filter} size={16} />
      </button>
      <button className="ds-map-btn" title="Vessel labels">
        <Icon d={I.flag} size={16} />
      </button>
    </div>
    <div style={{ position: "absolute", bottom: 12, left: 12, fontSize: 11, color: "var(--text-muted)", background: "rgba(255,255,255,0.9)", padding: "4px 8px", borderRadius: 4 }}>
      Controls only (basemap omitted)
    </div>
  </div>
);

/* Filter menu: vessel/asset type toggle popover (mirrors map-filters-menu) */
const FilterMenuPreview = () => {
  const [on, setOn] = React.useState(() => new Set(VESSEL_TYPE_PALETTE.map(t => t.k)));
  const toggle = (k) => setOn(prev => {
    const next = new Set(prev);
    next.has(k) ? next.delete(k) : next.add(k);
    return next;
  });
  const rows = VESSEL_TYPE_PALETTE.slice(0, 7);
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 24, background: "var(--bg-canvas)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)" }}>
      <div className="asset-filter">
        <div className="asset-filter-head">
          <span className="asset-filter-title">Filter Vessels</span>
          <div className="asset-filter-actions">
            <button className="asset-filter-btn" onClick={() => setOn(new Set(VESSEL_TYPE_PALETTE.map(t => t.k)))}>All</button>
            <button className="asset-filter-btn" onClick={() => setOn(new Set())}>None</button>
          </div>
        </div>
        <div className="asset-filter-sub">Vessel Type</div>
        <div className="asset-filter-list">
          {rows.map(t => (
            <label key={t.k} className="asset-filter-row" onClick={(e) => { e.preventDefault(); toggle(t.k); }}>
              <input type="checkbox" checked={on.has(t.k)} readOnly />
              <span className="asset-filter-glyph">
                <svg viewBox="0 0 24 24" width="16" height="16" style={{ transform: "rotate(45deg)", color: t.color }} fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"><path d="M12 2 L19 20 L12 16 L5 20 Z" /></svg>
              </span>
              <span className="lbl">{t.k}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

/* Selection & hover states, the white ring around a marker */
const SelectionStates = () => (
  <div className="grid-3" style={{ alignItems: "stretch" }}>
    {[
      { label: "Rest", ring: false, z: "auto" },
      { label: "Hover", ring: true, z: "lifted" },
      { label: "Selected (popup open)", ring: true, z: "lifted" },
    ].map((s) => (
      <div key={s.label} className="panel">
        <div className="panel-body" style={{ justifyContent: "center" }}>
          <span className="sel-demo">
            {s.ring && <span className="sel-ring" />}
            <VesselTeardropGlyph color="#2563eb" heading={45} size={20} />
          </span>
        </div>
        <div className="panel-foot">{s.label} · z-index <code>{s.z}</code></div>
      </div>
    ))}
  </div>
);

/* ── Cross-domain marker glyphs (mirror the live product markers) ───── */
const AircraftGlyph = ({ heading = 0, size = 26, color = "#eab308" }) => (
  <span style={{ display: "inline-flex", width: size, height: size, alignItems: "center", justifyContent: "center" }}>
    <span style={{ display: "inline-block", transform: `rotate(${heading}deg)`, color, filter: "drop-shadow(0 1px 2px rgba(0,0,0,.4))" }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" stroke="none" style={{ display: "block" }}>
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
      </svg>
    </span>
  </span>
);

const AirportPin = ({ size = 30 }) => (
  <span style={{ width: size, height: size, borderRadius: 8, background: "var(--brand-600)", border: "2px solid #fff", boxShadow: "var(--glyph-shadow)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
    <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" /></svg>
  </span>
);

const OffshoreDot = ({ color, label }) => (
  <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
    <span style={{ width: 12, height: 12, borderRadius: "50%", background: color, border: "2px solid #fff", boxShadow: "var(--glyph-shadow-sm)" }} />
    {label && <span style={{ background: "#1e293b", color: "#fff", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>{label}</span>}
  </span>
);

const PropertyPin = ({ color, ico, alert, size = 34 }) => (
  <span style={{ position: "relative", width: size, height: size, borderRadius: 8, background: color, border: "2px solid #fff", boxShadow: "var(--glyph-shadow)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
    <span style={{ display: "inline-flex" }} dangerouslySetInnerHTML={{ __html: ico }} />
    {alert && <span style={{ position: "absolute", top: -4, right: -4, width: 11, height: 11, borderRadius: "50%", background: "#dc2626", border: "2px solid #fff", boxShadow: "0 0 0 0 rgba(220,38,38,.55)", animation: "anchor-pulse 1.6s infinite" }} />}
  </span>
);

const OFFSHORE_ASSETS = [
  { k: "Oil Rig", color: "#ef4444" },
  { k: "Platform", color: "#06b6d4" },
  { k: "Windfarm", color: "#10b981" },
  { k: "Floating Storage (FSO)", color: "#8b5cf6" },
  { k: "Fixed Platform", color: "#ec4899" },
  { k: "Jack-Up Drilling Unit", color: "#f59e0b" },
  { k: "Mobile Drilling (MODU)", color: "#3b82f6" },
  { k: "Mobile Production (MOPU)", color: "#ea580c" },
  { k: "Single Point Mooring (SPM)", color: "#0ea5e9" },
  { k: "Subsea", color: "#14b8a6" },
  { k: "Well", color: "#a855f7" },
  { k: "Other", color: "#64748b" },
];

const PROPERTY_CATS = [
  { k: "Corporate & Office", color: "#2563eb", ico: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M12 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/></svg>` },
  { k: "Industrial & Logistics", color: "#ea580c", ico: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>` },
  { k: "Infrastructure & Energy", color: "#16a34a", ico: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>` },
  { k: "Retail & Hospitality", color: "#ec4899", ico: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><line x1="2" y1="7" x2="22" y2="7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v4"/></svg>` },
];

const MapsSection = () => (
  <>
    <div className="subsection" style={{ marginTop: 0 }}>
      <h3 className="subsection-title">Library: Leaflet</h3>
      <p className="subsection-desc" style={{ maxWidth: 820 }}>
        Skytek uses <code className="inline">leaflet@1.9.4</code> as its canonical map library across Marine, Aviation, Offshore, NatCat and Ports.
        No second mapping library ships with the product. Choose Leaflet primitives (<code className="inline">L.tileLayer</code>, <code className="inline">L.marker</code>, <code className="inline">L.divIcon</code>, <code className="inline">L.popup</code>): never roll a new map runtime.
      </p>
      <pre className="code">{`<!-- Load order: pin to 1.9.4 across all surfaces -->
<link rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      crossorigin="" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""></script>`}</pre>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Basemaps: four tile providers</h3>
      <p className="subsection-desc">
        Every Skytek map ships with the same four basemap options behind the <strong>Layers</strong> button. Satellite is the default in operator-facing surfaces;
        Light is the default in printable reports. Engineers don't pick custom providers; these four are the contract.
      </p>
      <TileProviders />
      <div className="callout warn" style={{ marginTop: 12 }}>
        <strong>Attribution is non-negotiable.</strong> Every tile layer must keep its <code className="inline">attribution</code> string. Removing the OSM / Carto / Esri credit violates their license.
      </div>
      <p className="t-caption" style={{ marginTop: 12, marginBottom: 4 }}>The <code className="inline">setMapType</code> helper switches layers and syncs the gap-fill background color so transitions don't flash white:</p>
      <pre className="code">{`// app/ui/Map/tiles.ts
export const TILES = {
  satellite: { url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
               attr: 'Tiles © Esri', bg: '#0b1e2e' },
  street:    { url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
               attr: '© OpenStreetMap contributors', bg: '#e5e7eb' },
  dark:      { url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
               attr: '© OpenStreetMap contributors © CARTO', bg: '#0b0f1a' },
  light:     { url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
               attr: '© OpenStreetMap contributors © CARTO', bg: '#f1f5f9' },
} as const;`}</pre>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Live map</h3>
      <p className="subsection-desc">
        A real Leaflet instance, the same configuration used by Marine Dashboard. Click a vessel to see the canonical popup. Drag to pan, scroll to zoom.
      </p>
      <LiveLeafletMap />
      <p className="t-caption" style={{ marginTop: 8 }}>
        Embedded with CartoDB Positron for the spec; the product defaults to Esri World Imagery.
      </p>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Vessel marker: teardrop divIcon</h3>
      <p className="subsection-desc">
        One canonical marker shape: a 16 × 16 teardrop SVG inside a Leaflet <code className="inline">L.divIcon</code>.
        <strong> Rotation</strong> encodes heading (degrees true). <strong>Fill color</strong> encodes vessel type: sourced from the locked type palette below.
      </p>
      <div className="grid-2" style={{ alignItems: "flex-start" }}>
        <div className="panel">
          <div className="panel-head"><h4>Heading rotation</h4></div>
          <div className="panel-body" style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: "space-around" }}>
            {[0, 45, 90, 180, 270].map(h => (
              <div key={h} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <VesselTeardropGlyph color="#2563eb" heading={h} size={28} />
                <span className="t-mono" style={{ fontSize: 11, color: "var(--text-muted)" }}>{String(h).padStart(3, "0")}°</span>
              </div>
            ))}
          </div>
          <div className="panel-foot">SVG rotation = <code>heading + 45°</code> (teardrop tip points east at 0).</div>
        </div>
        <div className="panel">
          <div className="panel-head"><h4>Type palette</h4></div>
          <div className="panel-body">
            <VesselTypeLegend />
          </div>
          <div className="panel-foot">Locked. Adding a vessel type requires an RFC and an update to <code>VESSEL_TYPES</code>.</div>
        </div>
      </div>

      <p className="t-caption" style={{ marginTop: 12, marginBottom: 4 }}>Canonical factory: every vessel marker in the product is built this way:</p>
      <pre className="code">{`// app/ui/Map/vesselIcon.ts
import L from 'leaflet';

export function vesselIcon(color: string, heading: number) {
  // Heading 0 (north) points the teardrop "up". The SVG path's tip naturally
  // points NE, so we add 45° to align it to compass north.
  const html = \`
    <div class="ds-vessel-marker"
         style="transform: rotate(\${heading + 45}deg); transform-origin: center;">
      <svg viewBox="0 0 24 24" width="16" height="16" style="color:\${color};"
           fill="currentColor" stroke="#fff" stroke-width="1.2" stroke-linejoin="round">
        <path d="M12 2 L19 20 L12 16 L5 20 Z"/>
      </svg>
    </div>\`;
  return L.divIcon({ html, className: '', iconSize: [16, 16], iconAnchor: [8, 8] });
}

export function vesselLabelIcon(name: string) {
  return L.divIcon({
    html: \`<div class="ds-vessel-label">\${name}</div>\`,
    className: 'ds-vessel-label-wrap',
    iconSize: [0, 0], iconAnchor: [-10, 7],
  });
}`}</pre>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Markers across domains</h3>
      <p className="subsection-desc">
        The vessel teardrop is one instance of a single cross-domain system. Every asset class: vessel, aircraft, airport, offshore installation, property, gets <strong>one canonical marker</strong>, and all of them encode information on the same four channels.
        This is what lets an operator read any Skytek map the same way, whether they're in Marine, Aviation, Offshore or Property.
      </p>

      <table className="spec-table" style={{ marginBottom: 16 }}>
        <thead>
          <tr><th>Channel</th><th>Encodes</th><th>Applies to</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Shape</strong></td><td>Asset class</td><td className="t-caption">teardrop = vessel · aircraft glyph = flight · square pin = property · brand pin = airport · dot = offshore installation</td></tr>
          <tr><td><strong>Fill color</strong></td><td>Type / category <em>within</em> the class</td><td className="t-caption">vessel type · asset type · property category (airport &amp; aircraft fills are fixed)</td></tr>
          <tr><td><strong>Rotation</strong></td><td>Heading (degrees true)</td><td className="t-caption">moving assets only: vessels &amp; aircraft. Static installations never rotate.</td></tr>
          <tr><td><strong>Overlay</strong> <span className="t-caption">(pulse / badge)</span></td><td>Status &amp; alerts</td><td className="t-caption">sanctioned vessel, property risk pulse, never a recolor of the glyph</td></tr>
        </tbody>
      </table>

      <div className="panel" style={{ marginBottom: 16 }}>
        <div className="panel-head"><h4>One shape per asset class</h4><span className="meta">Leaflet <code style={{ fontSize: 11 }}>L.divIcon</code></span></div>
        <div className="panel-body" style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "flex-start" }}>
          {[
            { comp: <VesselTeardropGlyph color="#2563eb" heading={45} size={30} />, name: "Vessel", sub: "teardrop · type + heading", domain: "Marine" },
            { comp: <AircraftGlyph heading={45} size={28} />, name: "Aircraft", sub: "amber glyph · heading", domain: "Aviation" },
            { comp: <AirportPin size={30} />, name: "Airport", sub: "brand pin · static", domain: "Aviation" },
            { comp: <OffshoreDot color="#06b6d4" />, name: "Installation", sub: "dot + label · asset type", domain: "Offshore" },
            { comp: <PropertyPin color="#2563eb" ico={PROPERTY_CATS[0].ico} size={32} />, name: "Property", sub: "square pin · category", domain: "Property" },
          ].map((g) => (
            <div key={g.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 96, textAlign: "center" }}>
              <div style={{ height: 40, display: "flex", alignItems: "center" }}>{g.comp}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{g.name}</div>
              <div className="t-caption" style={{ fontSize: 11 }}>{g.sub}</div>
              <span className="ds-badge ds-badge--neutral" style={{ fontSize: 11 }}>{g.domain}</span>
            </div>
          ))}
        </div>
        <div className="panel-foot">All markers share the canonical close behavior, popup template family, and the four-channel encoding above.</div>
      </div>

      <div className="grid-2" style={{ alignItems: "flex-start" }}>
        <div className="panel">
          <div className="panel-head"><h4>Aviation</h4></div>
          <div className="panel-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "space-around" }}>
              {[0, 90, 180, 270].map((h) => (
                <div key={h} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <AircraftGlyph heading={h} size={26} />
                  <span className="t-mono" style={{ fontSize: 11, color: "var(--text-muted)" }}>{String(h).padStart(3, "0")}°</span>
                </div>
              ))}
            </div>
            <p className="t-caption" style={{ margin: 0 }}>Aircraft are a single class, fill is fixed amber (<code className="inline">#eab308</code>), <strong>rotation encodes heading</strong>. Airports are static infrastructure: a brand-blue pin with a white glyph, no rotation.</p>
          </div>
          <div className="panel-foot">Status (cruising / climbing / descending) lives in the popup, not the glyph color.</div>
        </div>

        <div className="panel">
          <div className="panel-head"><h4>Offshore / Energy</h4><span className="meta">fill = asset type</span></div>
          <div className="panel-body">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {OFFSHORE_ASSETS.map((a) => (
                <span key={a.k} className="vessel-type-swatch">
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: a.color, border: "1.5px solid #fff", boxShadow: "var(--glyph-shadow-xs)", flexShrink: 0 }} />
                  {a.k}
                </span>
              ))}
            </div>
          </div>
          <div className="panel-foot">Static dot + optional name label. Filterable by type; no rotation.</div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 16 }}>
        <div className="panel-head"><h4>Property</h4><span className="meta">fill = category · pulse = active risk</span></div>
        <div className="panel-body" style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
          {PROPERTY_CATS.map((c) => (
            <div key={c.k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <PropertyPin color={c.color} ico={c.ico} size={32} />
              <span style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>{c.k}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
            <PropertyPin color="#2563eb" ico={PROPERTY_CATS[0].ico} alert size={32} />
            <span style={{ fontSize: 12.5, color: "var(--danger-700)", fontWeight: 600 }}>+ active risk pulse</span>
          </div>
        </div>
        <div className="panel-foot">Rounded-square pin with a white category glyph. The pulsing red corner dot is the <em>status overlay</em>, same rule as a sanctioned vessel.</div>
      </div>

      <p className="t-caption" style={{ marginTop: 12, marginBottom: 4 }}>Each domain ships one <code className="inline">divIcon</code> factory: same structure as <code className="inline">vesselIcon</code>, differing only in shape and what each channel encodes:</p>
      <pre className="code">{`// app/ui/Map/markers/aircraft.ts: fill fixed, rotation = heading
export const aircraftIcon = (heading: number) => L.divIcon({
  className: '', iconSize: [24, 24], iconAnchor: [12, 12],
  html: \`<div style="transform:rotate(\${heading}deg);color:var(--aviation-aircraft,#eab308)">\${PLANE_SVG}</div>\`,
});

// app/ui/Map/markers/airport.ts: static infrastructure pin
export const airportIcon = () => L.divIcon({
  className: '', iconSize: [32, 32], iconAnchor: [16, 16],
  html: \`<div class="rw-pin rw-pin--brand">\${PLANE_WHITE_SVG}</div>\`,
});

// app/ui/Map/markers/offshore.ts: fill = asset type, optional label
export const offshoreIcon = (color: string, label?: string) => L.divIcon({
  className: '', iconSize: [120, 40], iconAnchor: [60, 20],
  html: \`<div class="rw-offshore"><span class="rw-offshore-dot" style="background:\${color}"></span>\${label ? \`<span class="rw-offshore-label">\${label}</span>\` : ''}</div>\`,
});

// app/ui/Map/markers/property.ts: fill = category, alert = status overlay
export const propertyIcon = (color: string, glyph: string, alert = false) => L.divIcon({
  className: '', iconSize: [34, 34], iconAnchor: [17, 17],
  html: \`<div class="rw-pin" style="background:\${color}">\${glyph}\${alert ? '<span class="rw-pin-pulse"></span>' : ''}</div>\`,
});`}</pre>
      <div className="callout" style={{ marginTop: 12 }}>
        <strong>Open question for the team:</strong> aircraft currently use a single fixed fill. If aviation needs type/operator differentiation on the glyph (as Marine does for vessel type), that's an RFC to add an aircraft-class palette, keeping fill = type consistent across every domain.
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Status overlays</h3>
      <p className="subsection-desc">
        Vessel <em>type</em> owns the fill. Status (sanctioned, AIS silence, route deviation) is layered on as an overlay, a pulsing ring, an alert badge, or a tag in the popup, never as a color change to the glyph itself. This is the rule that lets operators read "what is this asset" and "what's wrong with it" as two separate questions.
      </p>
      <div className="dodont">
        <div className="do">
          <div className="hd">DO</div>
          <div className="bd" style={{ flexDirection: "column", gap: 12, padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ position: "relative", display: "inline-flex" }}>
                <VesselTeardropGlyph color="#ef4444" heading={0} size={28} />
                <span style={{ position: "absolute", top: -3, right: -6, width: 10, height: 10, borderRadius: "50%", background: "var(--danger-500)", border: "2px solid #fff", boxShadow: "0 0 0 0 rgba(220,38,38,.55)", animation: "anchor-pulse 1.8s infinite" }} />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Tanker · <span className="ds-badge ds-badge--danger">SANCTIONED</span></div>
                <div className="t-caption">Type = color. Status = overlay badge or pulse.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="dont">
          <div className="hd">DON'T</div>
          <div className="bd" style={{ flexDirection: "column", gap: 12, padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <VesselTeardropGlyph color="#7c2d12" heading={0} size={28} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Tanker recolored to "sanctioned brown"</div>
                <div className="t-caption">Overloads one channel with two meanings. Operators can no longer scan by type.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Popup template: <code>.vp</code></h3>
      <p className="subsection-desc">
        One template, four parts: <strong>header</strong> (brand fill, vessel name, type subtitle) · <strong>route</strong> (origin → destination ports with ADT/ETA) ·
        <strong>grid</strong> (vessel data in 2-column key/value pairs) · <strong>CTA</strong> (link to the full vessel detail page).
        300 px wide, brand-blue header, 12.5 px body, tabular numerals for numbers.
      </p>
      <PopupTemplatePreview />
      <p className="t-caption" style={{ marginTop: 12, marginBottom: 4 }}>Render with <code className="inline">bindPopup</code> + the <code className="inline">ds-vessel-popup</code> wrapper class:</p>
      <pre className="code">{`marker.bindPopup(vesselPopupHTML(v), {
  className: 'ds-vessel-popup',
  maxWidth: 320, minWidth: 300,
  closeButton: true,
  autoPanPadding: [30, 30],
});`}</pre>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Map control toolbar</h3>
      <p className="subsection-desc">
        Four canonical controls, in fixed positions: <strong>zoom</strong> (top-left, Leaflet default) · <strong>fullscreen</strong> (top-left, beside zoom) ·
        <strong> layers / filters / labels</strong> (top-right, vertical stack). Buttons are 32 × 32, white surface, <code className="inline">--radius-lg</code>, <code className="inline">--card-shadow-rest</code>.
      </p>
      <MapToolbarPreview />
      <p className="t-caption" style={{ marginTop: 8 }}>
        Menus open <em>left-of</em> their trigger (top-right controls open inward), 240 px wide, white surface, <code className="inline">--card-shadow-hover</code>, and dismiss on outside-click or <kbd>Esc</kbd>.
      </p>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Filter menu</h3>
      <p className="subsection-desc">
        The <strong>filter</strong> control opens a type toggle: a header with <strong>All / None</strong> shortcuts, a section label, and one row per
        type, a checkbox, the type's marker glyph in its locked color, and the label. Toggling a type hides or shows its markers (and their labels) in place;
        the selection persists in page state, so it survives basemap switches and re-renders. Marine filters by <code className="inline">VESSEL_TYPES</code>; Offshore filters by <code className="inline">ASSET_TYPES</code>, same component, different list.
      </p>
      <FilterMenuPreview />
      <p className="t-caption" style={{ marginTop: 8 }}>The glyph in each row is the same marker drawn on the map, so the legend and the filter are one and the same, no separate key to learn.</p>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Selection &amp; hover states</h3>
      <p className="subsection-desc">
        Markers are interactive. On <strong>hover</strong>, a 24 px white ring with a soft shadow appears around the glyph and the marker lifts above its
        neighbours (<code className="inline">z-index</code> raised). Opening a marker's popup adds <code className="inline">.is-selected</code>, which keeps the
        ring on while the popup is open. The ring is the one selection affordance across every domain; it never recolors or resizes the glyph itself.
      </p>
      <SelectionStates />
      <div className="grid-2" style={{ marginTop: 12, alignItems: "flex-start" }}>
        <div className="callout">
          <strong>Hover tooltip vs. label.</strong> Hovering a marker shows a dark tooltip (flag + name + type). When the <strong>Labels</strong> toggle is on,
          names render permanently beside every marker and the hover tooltip is suppressed, because the name is already on the map and a tooltip would just repeat it.
        </div>
        <div className="callout">
          <strong>One close model.</strong> Popups close on the × button, on outside-click, or on opening another marker. Only one popup is open at a time; selecting a new marker deselects the previous.
        </div>
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Clustering</h3>
      <p className="subsection-desc">
        Below ~30 px separation, aggregate vessels into a cluster bubble. Bubble color follows the dominant vessel type;
        if any clustered vessel is flagged sanctioned or AIS-silent, the bubble gets a pulsing danger ring overlay (same overlay rule as a single marker).
      </p>
      <div className="panel">
        <div className="panel-body" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span className="map-cluster map-cluster--sm">7</span>
            <span className="t-caption">small · &lt; 10</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span className="map-cluster map-cluster--md">42</span>
            <span className="t-caption">medium · 10–99</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span className="map-cluster map-cluster--lg">218</span>
            <span className="t-caption">large · 100+</span>
          </div>
          <div style={{ flex: 1, color: "var(--text-secondary)", fontSize: 13 }}>
            Use <code>leaflet.markercluster</code> when a layer exceeds 200 markers. Below that, render individually: clustering at low density hides real positions.
          </div>
        </div>
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Performance</h3>
      <table className="spec-table">
        <thead><tr><th>Constraint</th><th>Rule</th><th>Why</th></tr></thead>
        <tbody>
          <tr><td>Max markers per layer</td><td>≤ 5,000 without clustering</td><td>Above this, Leaflet's DOM marker layer hits frame-rate cliffs.</td></tr>
          <tr><td>Tile prefetch</td><td>Disabled</td><td>Esri / Carto rate-limit anonymous tiles. Don't pre-warm tiles the user can't see.</td></tr>
          <tr><td>Marker rotation</td><td>CSS transform on inner div, not SVG <code>transform</code></td><td>Composited rotation is GPU-accelerated; SVG attribute rotation re-rasterizes.</td></tr>
          <tr><td>Popup content</td><td>HTML string, not React</td><td>Leaflet popups are mounted outside React's tree, keep them framework-free.</td></tr>
          <tr><td>Fullscreen</td><td>CSS class swap, not native Fullscreen API</td><td>Avoids permission prompt; map can render alongside other UI in inspect tools.</td></tr>
        </tbody>
      </table>
    </div>

    <div className="callout" style={{ marginTop: 24 }}>
      <strong>Single source of truth:</strong> the tile providers, the teardrop divIcon, the type palette, and the <code className="inline">.vp</code> popup template all live in <code className="inline">app/ui/Map/*</code>.
      Marine, Aviation, Offshore and NatCat surfaces import from there, never copy-paste the marker factory or popup HTML into a module.
    </div>
  </>
);



/* ============================================================
   Formatting: time, date, number, units
   ============================================================ */

const FormatTimeTable = () => (
  <div className="panel">
    <div className="panel-head"><h4>Time &amp; date</h4><span className="meta">UTC is the canonical wire format</span></div>
    <div style={{ padding: "8px 0" }}>
      <div className="format-example">
        <span className="label">Relative</span>
        <span className="out">2 min ago</span>
        <span className="desc">Within 60 min. Live-updating. Pair with absolute on hover.</span>
      </div>
      <div className="format-example">
        <span className="label">Time-of-day</span>
        <span className="out">14:32 UTC</span>
        <span className="desc">Always include the zone. 24h clock everywhere: no AM/PM.</span>
      </div>
      <div className="format-example">
        <span className="label">Date · short</span>
        <span className="out">28 Apr 2026</span>
        <span className="desc">For lists and tables. Month abbreviated, year always shown.</span>
      </div>
      <div className="format-example">
        <span className="label">Date · long</span>
        <span className="out">Tuesday, 28 April 2026</span>
        <span className="desc">For report headers and confirmation modals.</span>
      </div>
      <div className="format-example">
        <span className="label">Date + time</span>
        <span className="out">28 Apr 2026 · 14:32 UTC</span>
        <span className="desc">Audit logs, event timelines.</span>
      </div>
      <div className="format-example">
        <span className="label">ISO 8601</span>
        <span className="out">2026-04-28T14:32:00Z</span>
        <span className="desc">Only in raw data exports, API payload displays, and CSV.</span>
      </div>
      <div className="format-example">
        <span className="label">Duration</span>
        <span className="out">3d 4h · 14m 02s</span>
        <span className="desc">Two largest units. Drop seconds above 1h.</span>
      </div>
      <div className="format-example">
        <span className="label">Range</span>
        <span className="out">21–28 Apr 2026</span>
        <span className="desc">Collapse repeated month/year. Use en-dash, not hyphen.</span>
      </div>
    </div>
  </div>
);

const FormatNumberTable = () => (
  <div className="panel">
    <div className="panel-head"><h4>Numbers</h4><span className="meta">Tabular numerals · en-IE / en-GB grouping</span></div>
    <div style={{ padding: "8px 0" }}>
      <div className="format-example">
        <span className="label">Integer</span>
        <span className="out">1,247,832</span>
        <span className="desc">Group with comma. No grouping below 10,000? always group.</span>
      </div>
      <div className="format-example">
        <span className="label">Decimal</span>
        <span className="out">12.45</span>
        <span className="desc">Two places by default. Three for coordinates, ratios &lt; 0.1.</span>
      </div>
      <div className="format-example">
        <span className="label">Compact</span>
        <span className="out">1.2M · 248K · 14.7B</span>
        <span className="desc">Tile values, sparkline labels, dense tables. Never in legal/compliance copy.</span>
      </div>
      <div className="format-example">
        <span className="label">Percent</span>
        <span className="out">84.2%</span>
        <span className="desc">One decimal. Zero decimals on dashboards if precision &lt; 1% is meaningless.</span>
      </div>
      <div className="format-example">
        <span className="label">Signed delta</span>
        <span className="out">+8.2% · −4.1%</span>
        <span className="desc">Always include the sign (use Unicode "−", not hyphen). Pair with up/down arrow.</span>
      </div>
      <div className="format-example">
        <span className="label">Currency</span>
        <span className="out">$2.4M · €1.18bn · £842K</span>
        <span className="desc">Currency symbol leads. Use 3-letter ISO in tables: USD 2,400,000.</span>
      </div>
      <div className="format-example">
        <span className="label">Coordinates</span>
        <span className="out">51.5074° N, 0.1278° W</span>
        <span className="desc">Degrees + cardinal. Four decimals (≈ 11 m). Never sign-prefix.</span>
      </div>
      <div className="format-example">
        <span className="label">Empty / null</span>
        <span className="out">—</span>
        <span className="desc">An em-dash. Never "N/A", "null", "0", or a blank cell.</span>
      </div>
    </div>
  </div>
);

const DomainUnits = () => (
  <table className="spec-table">
    <thead>
      <tr><th>Quantity</th><th>Unit</th><th>Symbol</th><th>Example</th><th>Notes</th></tr>
    </thead>
    <tbody>
      <tr><td>Vessel speed</td><td>Knot</td><td><code>kn</code></td><td>12.4 kn</td><td>Never "knots" in UI. Space before symbol.</td></tr>
      <tr><td>Distance · maritime</td><td>Nautical mile</td><td><code>nm</code></td><td>248 nm</td><td>Lowercase. Disambiguate from nanometer by context only.</td></tr>
      <tr><td>Distance · land</td><td>Kilometre</td><td><code>km</code></td><td>1,420 km</td><td>SI default everywhere except maritime.</td></tr>
      <tr><td>Aviation altitude</td><td>Flight level</td><td><code>FL</code></td><td>FL 380</td><td>Always uppercase, no decimal.</td></tr>
      <tr><td>Cargo · liquid</td><td>Barrel</td><td><code>bbl</code></td><td>1.4M bbl</td><td>Compact form OK on tiles.</td></tr>
      <tr><td>Cargo · dry</td><td>Tonne</td><td><code>t</code></td><td>82,400 t</td><td>Lowercase. Metric tonne implied.</td></tr>
      <tr><td>Bearing / heading</td><td>Degrees</td><td><code>°</code></td><td>087°</td><td>Three-digit pad. Always degrees true.</td></tr>
      <tr><td>Temperature</td><td>Celsius</td><td><code>°C</code></td><td>4.2 °C</td><td>Space before symbol. Fahrenheit only in US-locale toggle.</td></tr>
      <tr><td>Time interval</td><td>Minutes / hours</td><td><code>m</code> / <code>h</code></td><td>14m · 3h 20m</td><td>Compact, no spaces. See Duration above.</td></tr>
    </tbody>
  </table>
);

const FormatHelperAPI = () => (
  <pre className="code">{`// app/lib/format.ts: the only correct place these live.
// Modules must NOT call Intl directly; everything routes through here so locale,
// timezone, and product conventions stay consistent.

import { format as fmt } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const formatDate = (d: Date, variant: 'short' | 'long' | 'iso' = 'short') => {
  switch (variant) {
    case 'short': return fmt(d, 'd MMM yyyy');           // 28 Apr 2026
    case 'long':  return fmt(d, 'EEEE, d MMMM yyyy');    // Tuesday, 28 April 2026
    case 'iso':   return d.toISOString();
  }
};

export const formatTime = (d: Date, opts: { zone?: string } = {}) => {
  const zone = opts.zone ?? 'UTC';
  const zoned = utcToZonedTime(d, zone);
  return \`\${fmt(zoned, 'HH:mm')} \${zone === 'UTC' ? 'UTC' : zone}\`;
};

export const formatRelative = (d: Date, now = new Date()) => {
  const sec = Math.round((now.getTime() - d.getTime()) / 1000);
  if (sec < 60)   return \`\${sec}s ago\`;
  if (sec < 3600) return \`\${Math.round(sec / 60)} min ago\`;
  if (sec < 86400) return \`\${Math.round(sec / 3600)}h ago\`;
  return formatDate(d, 'short');
};

export const formatNumber = (n: number, opts: { decimals?: number; compact?: boolean } = {}) => {
  if (n == null || Number.isNaN(n)) return '—';
  if (opts.compact) {
    return new Intl.NumberFormat('en-GB', { notation: 'compact', maximumFractionDigits: 1 }).format(n);
  }
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: opts.decimals ?? 2 }).format(n);
};

export const formatDelta = (pct: number) => {
  if (pct == null) return '—';
  const sign = pct > 0 ? '+' : pct < 0 ? '−' : '';
  return \`\${sign}\${formatNumber(Math.abs(pct), { decimals: 1 })}%\`;
};

export const formatUnit = (value: number, unit: 'kn' | 'nm' | 'km' | 'bbl' | 't' | '°C') => {
  return \`\${formatNumber(value, { decimals: unit === 'bbl' ? 0 : 1 })} \${unit}\`;
};

export const NULL_DISPLAY = '—';`}</pre>
);

const FormattingSection = () => (
  <>
    <div className="subsection">
      <h3 className="subsection-title">Time &amp; date</h3>
      <p className="subsection-desc">
        Skytek is a global product, operators in Dublin, Houston and Singapore look at the same alert. UTC is the canonical wire format;
        the local-time toggle is a presentation concern. The rules below close the gap between API payloads and what an operator reads.
      </p>
      <FormatTimeTable />
      <div className="grid-2" style={{ marginTop: 16 }}>
        <div className="callout">
          <strong>UTC by default.</strong> Every absolute time renders with its zone. A bare "14:32" is a bug: operators read it as their own.
        </div>
        <div className="callout warn">
          <strong>Relative needs absolute.</strong> "2 min ago" is a hover-tooltip pair with the absolute timestamp. Audit logs show both inline.
        </div>
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Numbers</h3>
      <p className="subsection-desc">
        Tabular numerals everywhere. Grouping is comma-thousand, period-decimal (en-GB). Tables use right-aligned numerics so digits stack.
      </p>
      <FormatNumberTable />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Domain units</h3>
      <p className="subsection-desc">
        Maritime, aviation and offshore each carry their own unit conventions. The product never silently converts; it shows the native unit and lets the user toggle.
      </p>
      <DomainUnits />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Format helper API</h3>
      <p className="subsection-desc">
        One module, one set of functions. The rule: <strong>no module calls <code className="inline">Intl</code>, <code className="inline">toLocaleString</code> or <code className="inline">date-fns</code> directly</strong>, everything routes through <code className="inline">app/lib/format.ts</code>.
      </p>
      <FormatHelperAPI />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Locale &amp; i18n</h3>
      <div className="grid-3">
        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-card-title">Translation budget</h3></div>
          <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.55, color: "var(--text-secondary)" }}>
            Reserve <strong>+30%</strong> width on buttons, badges and column headers (DE/FR expansion). Never set <code className="inline">white-space: nowrap</code> on UI copy without a max-width.
          </div>
        </div>
        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-card-title">Pluralization</h3></div>
          <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.55, color: "var(--text-secondary)" }}>
            ICU MessageFormat: never <code className="inline">{`\${n === 1 ? 'item' : 'items'}`}</code> in source. The format helper consumes ICU keys, not concatenations.
          </div>
        </div>
        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-card-title">RTL readiness</h3></div>
          <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.55, color: "var(--text-secondary)" }}>
            Use logical properties (<code className="inline">padding-inline-start</code>, <code className="inline">margin-inline-end</code>) in new components. The tokens are direction-agnostic.
          </div>
        </div>
      </div>
    </div>
  </>
);


/* ============================================================
   Combined section export
   ============================================================ */

const DomainSection = () => (
  <>
    <div className="subsection" style={{ marginTop: 0 }}>
      <h3 className="subsection-title">Why this chapter exists</h3>
      <p className="subsection-desc" style={{ maxWidth: 820 }}>
        Skytek is a monitoring product; its job is to put the right number, the right time, and the right asset in front of an operator at a glance.
        Generic web components don't cover charts, maps, or domain-specific formatting. Without rules here, every module reinvents them and consistency leaks.
        These primitives are the shared vocabulary that connects the dashboard, vessel detail, alerts, and reports.
      </p>
    </div>
  </>
);

window.DomainSection = DomainSection;
window.DataVizSection = DataVizSection;
window.MapsSection = MapsSection;
window.FormattingSection = FormattingSection;
