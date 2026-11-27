/* ============================================================================
   section-charts.jsx: "Charts: composite components" spec section.
   Live demos render the real charts-lib.jsx components; the .tsx in the code
   blocks mirrors them. Depends on charts-lib.jsx (window.Bar/Line/Donut).
   ============================================================================ */

const nf = (v) => new Intl.NumberFormat("en-GB").format(v);

const BAR_DATA = [
  { label: "Maritime", High: 420, Medium: 560, Low: 267 },
  { label: "Aviation", High: 210, Medium: 380, Low: 242 },
  { label: "Offshore", High: 160, Medium: 300, Low: 154 },
  { label: "GSIN",      High: 90,  Medium: 180, Low: 121 },
  { label: "Portfolio", High: 40,  Medium: 120, Low: 88 },
].map((d) => ({ ...d, Alerts: d.High + d.Medium + d.Low }));

const LINE_DATA = ["Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"]
  .map((mo, i) => ({
    x: mo,
    Maritime: Math.round(380 + 180 * Math.sin(i / 2) + i * 14),
    Aviation: Math.round(240 + 90 * Math.cos(i / 1.7) + i * 8),
    Offshore: Math.round(150 + 60 * Math.sin(i / 2.3 + 1)),
  }));

const DONUT_DATA = [
  { label: "Container", value: 96 },
  { label: "Tanker",    value: 71 },
  { label: "Bulk",      value: 48 },
  { label: "LNG",       value: 29 },
  { label: "Other",     value: 19 },
];
const DONUT_TOTAL = DONUT_DATA.reduce((s, d) => s + d.value, 0);

/* ── Segmented control for variant toggles ───────────────────────────── */
const Seg = ({ value, onChange, options }) => (
  <div className="cx-seg" role="tablist">
    {options.map((o) => (
      <button key={o.v} role="tab" aria-selected={value === o.v}
        className={`cx-seg-btn ${value === o.v ? "is-active" : ""}`}
        onClick={() => onChange(o.v)}>{o.label}</button>
    ))}
  </div>
);

/* ── Live demos ──────────────────────────────────────────────────────── */
const BarDemo = () => {
  const { Bar } = window;
  const [v, setV] = React.useState("grouped");
  const series = v === "single" ? ["Alerts"] : ["High", "Medium", "Low"];
  return (
    <div>
      <div className="cx-demo-head">
        <Seg value={v} onChange={setV} options={[{ v: "single", label: "Single" }, { v: "stacked", label: "Stacked" }, { v: "grouped", label: "Grouped" }]} />
        <code className="inline" style={{ fontSize: 11 }}>variant="{v}"</code>
      </div>
      <div className="panel" style={{ padding: 20 }}>
        <Bar variant={v} data={BAR_DATA} series={series} formatValue={nf}
          title={`Active alerts by domain · ${v}`} caption="Hover or Tab into the plot, then use ← → to move between bars." height={264} />
      </div>
    </div>
  );
};

const LineDemo = () => {
  const { Line } = window;
  const [v, setV] = React.useState("multi");
  const series = v === "multi" ? ["Maritime", "Aviation", "Offshore"] : ["Maritime"];
  return (
    <div>
      <div className="cx-demo-head">
        <Seg value={v} onChange={setV} options={[{ v: "single", label: "Single" }, { v: "multi", label: "Multi-line" }, { v: "area", label: "Area" }]} />
        <code className="inline" style={{ fontSize: 11 }}>variant="{v}"</code>
      </div>
      <div className="panel" style={{ padding: 20 }}>
        <Line variant={v} data={LINE_DATA} series={series} formatValue={nf} formatX={(x) => x}
          title={`Alert volume · trailing 12 months · ${v}`} caption="Tab into the plot, then ← → between points." height={264} />
      </div>
    </div>
  );
};

const DonutDemo = () => {
  const { Donut } = window;
  const [v, setV] = React.useState("donut");
  return (
    <div>
      <div className="cx-demo-head">
        <Seg value={v} onChange={setV} options={[{ v: "donut", label: "Donut" }, { v: "pie", label: "Pie" }]} />
        <code className="inline" style={{ fontSize: 11 }}>variant="{v}"</code>
      </div>
      <div className="grid-2" style={{ gap: 16 }}>
        <div className="panel" style={{ padding: 20 }}>
          <Donut variant={v} data={DONUT_DATA} formatValue={nf}
            centerLabel={{ value: nf(DONUT_TOTAL), label: "vessels" }}
            title={`Fleet by cargo type · ${v}`} caption="Right-side legend with share %." height={240} />
        </div>
        <div className="panel" style={{ padding: 20 }}>
          <Donut variant="donut" data={DONUT_DATA} formatValue={nf} legendPlacement="right" legend={false}
            centerSlot={
              <div style={{ display: "grid", gap: 2 }}>
                <span style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--brand-700)" }}>72%</span>
                <span className="t-caption" style={{ fontSize: 11 }}>monitored</span>
              </div>
            }
            title="Center-label slot" caption="centerSlot renders arbitrary JSX in the hole." height={240} />
        </div>
      </div>
    </div>
  );
};

const StateDemo = () => {
  const { Bar } = window;
  const [s, setS] = React.useState("loading");
  const stateProp = s === "data" ? undefined : { loading: s === "loading", empty: s === "empty", error: s === "error" };
  return (
    <div>
      <div className="cx-demo-head">
        <Seg value={s} onChange={setS} options={[{ v: "data", label: "Data" }, { v: "loading", label: "Loading" }, { v: "empty", label: "Empty" }, { v: "error", label: "Error" }]} />
      </div>
      <div className="panel" style={{ padding: 20 }}>
        <Bar variant="single" data={BAR_DATA} series={["Alerts"]} formatValue={nf} state={stateProp}
          title="Active alerts by domain" caption="Same component: every state is a prop, never a separate render path." height={220} />
      </div>
    </div>
  );
};

/* ── The section ─────────────────────────────────────────────────────── */
const ChartsSpec = () => (
  <>
    {/* ===== ARCHITECTURE ===== */}
    <div className="subsection" style={{ marginTop: 0 }}>
      <h3 className="subsection-title">Architecture &amp; shared foundation</h3>
      <p className="subsection-desc">
        Composite charts are thin assemblies over the domain primitives. They own <em>data shape, scales, layout and state</em>, never colors, fonts, or axis styling, which come from tokens.
        Every chart is wrapped in one <code className="inline">&lt;ChartFrame&gt;</code> that standardizes the title, legend, responsive measurement, the four states, the hidden data table and the accessibility shell.
      </p>

      <div className="panel" style={{ overflow: "hidden", marginBottom: 16 }}>
        <table className="spec-table" style={{ border: 0 }}>
          <thead><tr><th>Primitive</th><th>Role in a composite chart</th></tr></thead>
          <tbody>
            <tr><td><code className="inline">Canvas</code></td><td className="t-caption">Owns width/height + margins; exposes the inner plot rect. Responsive width via <code className="inline">ResizeObserver</code> (<code className="inline">useMeasure</code>).</td></tr>
            <tr><td><code className="inline">Scale</code></td><td className="t-caption"><code className="inline">scaleLinear</code> (value axis), <code className="inline">scaleBand</code> (categories), <code className="inline">scaleArc</code> (donut/pie angles).</td></tr>
            <tr><td><code className="inline">GridLines</code> / <code className="inline">Axis</code></td><td className="t-caption">Horizontal gridlines + value/category ticks. 4–6 nice ticks; 11px mono labels; value-axis line only.</td></tr>
            <tr><td><code className="inline">Marks.Bar / .Line / .Area / .Arc</code></td><td className="t-caption">The data geometry. Each mark is focusable (<code className="inline">tabIndex</code>) and carries its own <code className="inline">aria-label</code>.</td></tr>
            <tr><td><code className="inline">Tooltip</code></td><td className="t-caption">Single inverse-surface tooltip, positioned from mark <code className="inline">hover</code>/<code className="inline">focus</code>. One per chart, hosted by the frame.</td></tr>
            <tr><td><code className="inline">Legend</code></td><td className="t-caption">Bottom (bar/line) or right (donut). Swatch shape follows the mark, square for bars/arcs, line for series.</td></tr>
          </tbody>
        </table>
      </div>

      <h4 className="t-h4" style={{ margin: "8px 0 8px" }}>Shared props: <code className="inline">ChartBaseProps&lt;T&gt;</code></h4>
      <pre className="code">{`// app/ui/charts/types.ts
export type Token = string;                         // e.g. 'var(--chart-cat-1)'
export type Formatter<V = number> = (v: V) => string;

export interface ChartDimensions {
  width?: number;        // omit → fills container (responsive)
  height?: number;       // px; default 260
  aspectRatio?: number;  // used when height is omitted (w / ratio)
  margin?: Partial<{ t: number; r: number; b: number; l: number }>;
}

export interface ChartState {
  loading?: boolean;
  error?: boolean | string;
  empty?: boolean;       // derive from data.length === 0 if omitted
}

export interface LegendConfig {
  show?: boolean;                       // default true when series > 1
  placement?: 'bottom' | 'right';       // default per chart type
}

export interface ChartA11y {
  label: string;                        // accessible name (required)
  description?: string;                 // longer summary for SR
  dataTable?: boolean;                  // render hidden <table>, default true
}

export interface ChartBaseProps<T> {
  data: T[];
  dimensions?: ChartDimensions;
  responsive?: boolean;                 // default true
  colors?: Token[];                     // default = categorical palette by index
  formatValue?: Formatter;              // y / value formatting
  formatLabel?: Formatter<string>;      // category / tick formatting
  formatTooltip?: (datum: T) => React.ReactNode;
  legend?: LegendConfig;
  state?: ChartState;
  a11y: ChartA11y;
  onPointHover?: (datum: T | null) => void;
  onPointClick?: (datum: T) => void;
}`}</pre>

      <p className="subsection-desc" style={{ marginTop: 16, marginBottom: 8 }}>A composite chart, live and responsive, drag the window or collapse the panel to watch it reflow, rotate tight labels, and re-tick:</p>
      <div className="panel" style={{ padding: 20 }}>
        {React.createElement(window.Bar, { variant: "grouped", data: BAR_DATA, series: ["High", "Medium", "Low"], formatValue: nf, title: "Alerts by domain & severity", caption: "Grouped bar · responsive · keyboard-navigable", height: 264 })}
      </div>
    </div>

    {/* ===== BAR ===== */}
    <div className="subsection">
      <h3 className="subsection-title">Bar chart</h3>
      <p className="subsection-desc">Categorical comparison. Three variants share one component and one value scale; only the mark layout changes.</p>
      <BarDemo />

      <h4 className="t-h4" style={{ margin: "24px 0 8px" }}>API</h4>
      <div className="panel" style={{ overflow: "hidden" }}>
        <table className="spec-table" style={{ border: 0 }}>
          <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td><code className="inline">data</code></td><td className="t-caption">{`{ label: string; [series]: number }[]`}</td><td>—</td><td className="t-caption">One row per category.</td></tr>
            <tr><td><code className="inline">series</code></td><td className="t-caption">string[]</td><td>—</td><td className="t-caption">Keys to plot. Length 1 → single; &gt;1 → stacked/grouped.</td></tr>
            <tr><td><code className="inline">variant</code></td><td className="t-caption">'single'|'stacked'|'grouped'</td><td><code className="inline">'single'</code></td><td className="t-caption">Mark layout.</td></tr>
            <tr><td><code className="inline">orientation</code></td><td className="t-caption">'vertical'|'horizontal'</td><td><code className="inline">'vertical'</code></td><td className="t-caption">Switch to horizontal when categories &gt; ~12 or labels are long.</td></tr>
            <tr><td><code className="inline">formatValue</code></td><td className="t-caption">Formatter</td><td>identity</td><td className="t-caption">Value-axis + tooltip number formatting.</td></tr>
            <tr><td colSpan={4} className="t-caption"><strong>+ all <code className="inline">ChartBaseProps</code></strong> (dimensions, colors, legend, state, a11y, callbacks).</td></tr>
          </tbody>
        </table>
      </div>

      <h4 className="t-h4" style={{ margin: "24px 0 8px" }}>Primitive assembly blueprint</h4>
      <ol className="cx-steps">
        <li><strong>Measure</strong>, <code className="inline">Canvas</code> reads container width via <code className="inline">useMeasure</code>; derive <code className="inline">innerW/innerH</code> from margins.</li>
        <li><strong>Scales</strong>, <code className="inline">scaleBand</code> over <code className="inline">data.label</code> for x; <code className="inline">scaleLinear([0, niceMax], [innerH, 0])</code> for y. Stacked uses the per-row <em>sum</em> for the y-domain; grouped subdivides the band by <code className="inline">series.length</code>.</li>
        <li><strong>Guides</strong>, <code className="inline">GridLines</code> on y-ticks, <code className="inline">Axis</code> left (values) + bottom (categories). No vertical gridlines.</li>
        <li><strong>Marks</strong>, map rows → <code className="inline">Marks.Bar</code>. Stacked accumulates an offset; grouped offsets by sub-band index. Fill = <code className="inline">colors[i]</code>.</li>
        <li><strong>Interaction</strong>, each bar wires <code className="inline">onMouseEnter/onFocus → Tooltip</code> and is <code className="inline">tabIndex=0</code> with an <code className="inline">aria-label</code>.</li>
        <li><strong>Frame</strong>, wrap in <code className="inline">ChartFrame</code> for title, legend (when series&gt;1), state and the hidden table.</li>
      </ol>

      <h4 className="t-h4" style={{ margin: "24px 0 8px" }}>Implementation (excerpt)</h4>
      <pre className="code">{`// app/ui/charts/BarChart.tsx
export interface BarChartProps extends ChartBaseProps<BarDatum> {
  series: string[];
  variant?: 'single' | 'stacked' | 'grouped';
  orientation?: 'vertical' | 'horizontal';
}

export function BarChart({ data, series, variant = 'single', colors, formatValue = String, ...base }: BarChartProps) {
  const palette = colors ?? series.map((_, i) => catToken(i));
  const totals  = data.map(d => variant === 'stacked'
    ? series.reduce((s, k) => s + (d[k] ?? 0), 0)
    : Math.max(...series.map(k => d[k] ?? 0)));
  const { ticks, top } = niceTicks(Math.max(...totals));

  return (
    <ChartFrame {...base} legend={series.length > 1 ? toLegend(series, palette) : undefined}
                dataTable={toTable(data, series, formatValue)}>
      {({ width, height }) => {
        const { innerW, innerH, m } = useCanvas(width, height);
        const x = scaleBand(data.map(d => d.label), [m.l, width - m.r], 0.28);
        const y = scaleLinear([0, top], [m.t + innerH, m.t]);
        return (
          <Canvas width={width} height={height} onKeyDown={rovingFocus}>
            <GridLines ticks={ticks} y={y} x0={m.l} x1={width - m.r} />
            <Axis.Left ticks={ticks} y={y} format={formatValue} />
            {data.map((d, ci) => <BarGroup key={d.label} datum={d} series={series}
              variant={variant} band={x(d.label)} palette={palette} y={y} top={top} />)}
          </Canvas>
        );
      }}
    </ChartFrame>
  );
}`}</pre>
    </div>

    {/* ===== LINE ===== */}
    <div className="subsection">
      <h3 className="subsection-title">Line chart</h3>
      <p className="subsection-desc">Trends over an ordered axis. Single, multi-line, and filled area share one path generator.</p>
      <LineDemo />

      <h4 className="t-h4" style={{ margin: "24px 0 8px" }}>API</h4>
      <div className="panel" style={{ overflow: "hidden" }}>
        <table className="spec-table" style={{ border: 0 }}>
          <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td><code className="inline">data</code></td><td className="t-caption">{`{ x: string|number; [series]: number }[]`}</td><td>—</td><td className="t-caption">Ordered by x.</td></tr>
            <tr><td><code className="inline">series</code></td><td className="t-caption">string[]</td><td>—</td><td className="t-caption">One path per key.</td></tr>
            <tr><td><code className="inline">variant</code></td><td className="t-caption">'single'|'multi'|'area'</td><td><code className="inline">'single'</code></td><td className="t-caption">Area fills under the line at 12% opacity.</td></tr>
            <tr><td><code className="inline">xScaleType</code></td><td className="t-caption">'point'|'time'|'linear'</td><td><code className="inline">'point'</code></td><td className="t-caption">Time snaps ticks to natural breaks.</td></tr>
            <tr><td><code className="inline">curve</code></td><td className="t-caption">'linear'|'monotone'</td><td><code className="inline">'linear'</code></td><td className="t-caption">Monotone for smoothed metrics only.</td></tr>
            <tr><td><code className="inline">formatX / formatValue</code></td><td className="t-caption">Formatter</td><td>identity</td><td className="t-caption">Axis + tooltip formatting.</td></tr>
            <tr><td colSpan={4} className="t-caption"><strong>+ all <code className="inline">ChartBaseProps</code></strong>.</td></tr>
          </tbody>
        </table>
      </div>

      <h4 className="t-h4" style={{ margin: "24px 0 8px" }}>Primitive assembly blueprint</h4>
      <ol className="cx-steps">
        <li><strong>Measure</strong> &amp; derive inner rect (as bar).</li>
        <li><strong>Scales</strong>, x = <code className="inline">scalePoint/scaleTime</code> over the domain; y = <code className="inline">scaleLinear</code> over <code className="inline">[0, niceMax]</code> across <em>all</em> series so they share one axis.</li>
        <li><strong>Guides</strong>, y <code className="inline">GridLines</code> + left axis. X ticks thinned to fit (label width budget).</li>
        <li><strong>Marks</strong>, one <code className="inline">Marks.Line</code> path per series (<code className="inline">Marks.Area</code> adds a closed fill below). Point markers sit on each vertex for hit-testing + keyboard stops.</li>
        <li><strong>Interaction</strong>, a shared crosshair + the single Tooltip listing every series value at the hovered x. Points are the focusable marks for keyboard.</li>
        <li><strong>Frame</strong>, legend bottom when series&gt;1.</li>
      </ol>

      <pre className="code">{`// app/ui/charts/LineChart.tsx
export interface LineChartProps extends ChartBaseProps<LinePoint> {
  series: string[];
  variant?: 'single' | 'multi' | 'area';
  xScaleType?: 'point' | 'time' | 'linear';
  curve?: 'linear' | 'monotone';
}

export function LineChart({ data, series, variant = 'single', colors, curve = 'linear', ...base }: LineChartProps) {
  const palette = colors ?? series.map((_, i) => catToken(i));
  const yMax = Math.max(...data.flatMap(d => series.map(k => d[k] ?? 0)));
  const { ticks, top } = niceTicks(yMax);
  return (
    <ChartFrame {...base} legend={series.length > 1 ? toLegend(series, palette, 'line') : undefined}>
      {({ width, height }) => {
        const { innerW, innerH, m } = useCanvas(width, height);
        const x = scalePoint(data.map(d => d.x), [m.l, width - m.r]);
        const y = scaleLinear([0, top], [m.t + innerH, m.t]);
        const path = makePath(curve);
        return (
          <Canvas width={width} height={height} onKeyDown={rovingFocus}>
            <GridLines ticks={ticks} y={y} x0={m.l} x1={width - m.r} />
            <Axis.Left ticks={ticks} y={y} /> <Axis.Bottom scale={x} thin />
            {series.map((k, i) => <React.Fragment key={k}>
              {variant === 'area' && <Marks.Area data={data} x={x} y={y} k={k} fill={palette[i]} />}
              <Marks.Line data={data} x={x} y={y} k={k} stroke={palette[i]} path={path} />
            </React.Fragment>)}
          </Canvas>
        );
      }}
    </ChartFrame>
  );
}`}</pre>
    </div>

    {/* ===== DONUT ===== */}
    <div className="subsection">
      <h3 className="subsection-title">Donut chart</h3>
      <p className="subsection-desc">Part-to-whole. Donut and pie share one arc generator; the donut hole is a slot for a summary metric or arbitrary JSX.</p>
      <DonutDemo />

      <h4 className="t-h4" style={{ margin: "24px 0 8px" }}>API</h4>
      <div className="panel" style={{ overflow: "hidden" }}>
        <table className="spec-table" style={{ border: 0 }}>
          <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td><code className="inline">data</code></td><td className="t-caption">{`{ label: string; value: number }[]`}</td><td>—</td><td className="t-caption">Shares computed automatically.</td></tr>
            <tr><td><code className="inline">variant</code></td><td className="t-caption">'donut'|'pie'</td><td><code className="inline">'donut'</code></td><td className="t-caption">Pie sets innerRadius 0.</td></tr>
            <tr><td><code className="inline">innerRatio</code></td><td className="t-caption">number</td><td><code className="inline">0.62</code></td><td className="t-caption">Donut hole as a fraction of outer radius.</td></tr>
            <tr><td><code className="inline">centerLabel</code></td><td className="t-caption">{`{ value: string; label: string }`}</td><td>—</td><td className="t-caption">Convenience two-line center metric (donut only).</td></tr>
            <tr><td><code className="inline">centerSlot</code></td><td className="t-caption">ReactNode</td><td>—</td><td className="t-caption">Full control of the hole, overrides centerLabel.</td></tr>
            <tr><td colSpan={4} className="t-caption"><strong>+ all <code className="inline">ChartBaseProps</code></strong>. Legend defaults to <code className="inline">'right'</code>.</td></tr>
          </tbody>
        </table>
      </div>

      <h4 className="t-h4" style={{ margin: "24px 0 8px" }}>Primitive assembly blueprint</h4>
      <ol className="cx-steps">
        <li><strong>Measure</strong>, take <code className="inline">min(width, height)</code>; the plot is square and centered.</li>
        <li><strong>Scale</strong>, <code className="inline">scaleArc</code> maps each value to an angular span proportional to the total (start at −90°).</li>
        <li><strong>Marks</strong>, one <code className="inline">Marks.Arc</code> per segment between <code className="inline">outerR</code> and <code className="inline">innerR</code> (innerR = 0 for pie). 2px surface-colored stroke separates slices.</li>
        <li><strong>Center</strong>, render <code className="inline">centerSlot</code> (or <code className="inline">centerLabel</code>) into the hole via <code className="inline">&lt;foreignObject&gt;</code>.</li>
        <li><strong>Interaction</strong>, arcs are focusable; hover/focus emits the segment + share to the Tooltip.</li>
        <li><strong>Frame</strong>, right-side legend with per-segment share %; wrap in <code className="inline">ChartFrame</code>.</li>
      </ol>

      <pre className="code">{`// app/ui/charts/DonutChart.tsx
export interface DonutChartProps extends ChartBaseProps<ArcDatum> {
  variant?: 'donut' | 'pie';
  innerRatio?: number;                 // 0..1, donut hole
  centerLabel?: { value: string; label: string };
  centerSlot?: React.ReactNode;        // overrides centerLabel
}

export function DonutChart({ data, variant = 'donut', innerRatio = 0.62, centerLabel, centerSlot, colors, ...base }: DonutChartProps) {
  const palette = colors ?? data.map((_, i) => catToken(i));
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <ChartFrame {...base} legend={toShareLegend(data, palette, total)} legendPlacement="right">
      {({ width, height }) => {
        const size = Math.min(width, height), cx = width / 2, cy = height / 2;
        const rO = size / 2 - 6, rI = variant === 'pie' ? 0 : rO * innerRatio;
        const arcs = scaleArc(data, total, -Math.PI / 2);
        return (
          <Canvas width={width} height={height} onKeyDown={rovingFocus}>
            {arcs.map((a, i) => <Marks.Arc key={a.label} {...a} cx={cx} cy={cy}
              rO={rO} rI={rI} fill={palette[i]} />)}
            {variant === 'donut' && (centerSlot ?? (centerLabel &&
              <CenterLabel cx={cx} cy={cy} {...centerLabel} />))}
          </Canvas>
        );
      }}
    </ChartFrame>
  );
}`}</pre>
    </div>

    {/* ===== STATES ===== */}
    <div className="subsection">
      <h3 className="subsection-title">State architecture</h3>
      <p className="subsection-desc">Loading, empty, error and the data state are <strong>props on one component</strong>, resolved by <code className="inline">ChartFrame</code>, modules never branch into a separate "no data" component.</p>
      <StateDemo />
      <div className="panel" style={{ overflow: "hidden", marginTop: 16 }}>
        <table className="spec-table" style={{ border: 0 }}>
          <thead><tr><th>State</th><th>Trigger</th><th>Render</th><th>Rule</th></tr></thead>
          <tbody>
            <tr><td><strong>Loading</strong></td><td><code className="inline">state.loading</code></td><td className="t-caption">Skeleton bars matching the chart's aspect ratio.</td><td className="t-caption">Never a centered spinner inside a chart frame.</td></tr>
            <tr><td><strong>Empty</strong></td><td><code className="inline">data.length === 0</code></td><td className="t-caption">Em-dash + "No data in range."</td><td className="t-caption">Never render an empty axis frame.</td></tr>
            <tr><td><strong>Error</strong></td><td><code className="inline">state.error</code></td><td className="t-caption">Inline danger alert + retry affordance.</td><td className="t-caption">Don't show stale data behind an error.</td></tr>
            <tr><td><strong>Hover / active</strong></td><td><code className="inline">:hover / :focus-visible</code></td><td className="t-caption">Mark emphasis + single Tooltip; <code className="inline">onPointHover</code> fires.</td><td className="t-caption">Hover is never the only way to read a value (see a11y table).</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* ===== A11Y ===== */}
    <div className="subsection">
      <h3 className="subsection-title">Accessibility</h3>
      <p className="subsection-desc">Charts are <code className="inline">&lt;figure&gt;</code>s with a programmatic data path. Three layers: a hidden data table (canonical SR path), per-mark labels, and roving keyboard focus.</p>
      <div className="panel" style={{ overflow: "hidden" }}>
        <table className="spec-table" style={{ border: 0 }}>
          <thead><tr><th>Concern</th><th>Implementation</th></tr></thead>
          <tbody>
            <tr><td><strong>Roles</strong></td><td className="t-caption"><code className="inline">&lt;figure role="group" aria-label&gt;</code> wraps the chart; the SVG is <code className="inline">role="application"</code> for arrow-key nav; each mark is <code className="inline">role="img"</code> with an <code className="inline">aria-label</code>.</td></tr>
            <tr><td><strong>Hidden data table</strong></td><td className="t-caption">A visually-hidden <code className="inline">&lt;table&gt;</code> (<code className="inline">.sr-only</code>) mirrors the series: the reliable, verbose path for screen readers. Always present unless <code className="inline">a11y.dataTable=false</code>.</td></tr>
            <tr><td><strong>Keyboard nav</strong></td><td className="t-caption"><kbd className="ms-kbd">Tab</kbd> enters the plot; <kbd className="ms-kbd">←</kbd><kbd className="ms-kbd">→</kbd> (and <kbd className="ms-kbd">Home</kbd>/<kbd className="ms-kbd">End</kbd>) rove between marks; focus drives the same Tooltip as hover.</td></tr>
            <tr><td><strong>Color independence</strong></td><td className="t-caption">Palette is color-blind safe (≥3:1 adjacent pairs); series are also separated by legend order + tooltip labels, never color alone.</td></tr>
            <tr><td><strong>Motion</strong></td><td className="t-caption">Enter/transition animations honor <code className="inline">prefers-reduced-motion</code>.</td></tr>
          </tbody>
        </table>
      </div>
      <div className="callout" style={{ marginTop: 16 }}>
        <strong>The hidden table is the contract.</strong> Sighted users get the SVG; assistive tech gets the table. If a chart can't produce a sensible table, it isn't ready to ship.
      </div>
    </div>

    <style>{CHART_CSS}</style>
  </>
);

const CHART_CSS = `
.cx-host { position: relative; }
.cx-frame { margin: 0; }
.cx-frame-title { display: block; margin-bottom: 8px; }
.cx-frame-cap { margin-top: 8px; }
.cx-plotwrap { display: flex; flex-direction: column; }
.cx-plotwrap.is-right { flex-direction: row; align-items: center; gap: 20px; }
.cx-plot { position: relative; width: 100%; }
.cx-plotwrap.is-right .cx-plot { flex: 1; min-width: 0; }
.cx-svg { display: block; overflow: visible; }
.cx-axis-lbl { font-size: 11px; fill: var(--chart-axis-label); font-family: var(--font-mono); }
.cx-cat-lbl { font-size: 11px; fill: var(--chart-axis-label); font-family: var(--font-sans); }
.cx-bar { transition: opacity 120ms; outline: none; cursor: pointer; }
.cx-bar:hover, .cx-bar:focus-visible { opacity: .82; }
.cx-bar:focus-visible { stroke: var(--text-primary); stroke-width: 2; }
.cx-dot { transition: r 120ms; outline: none; cursor: pointer; }
.cx-dot:hover, .cx-dot:focus-visible { r: 5.5; }
.cx-dot:focus-visible { stroke-width: 3; }
.cx-arc { outline: none; cursor: pointer; transition: opacity 120ms; }
.cx-arc:hover, .cx-arc:focus-visible { opacity: .85; }
.cx-arc:focus-visible { stroke: var(--text-primary); stroke-width: 2.5; }
.cx-center { display: flex; align-items: center; justify-content: center; height: 100%; text-align: center; }
.cx-center-val { font-size: 24px; font-weight: 700; fill: var(--text-primary); font-family: var(--font-display); }
.cx-center-lbl { font-size: 11px; fill: var(--text-muted); font-family: var(--font-sans); text-transform: uppercase; letter-spacing: .06em; }
/* legend */
.cx-legend { list-style: none; margin: 12px 0 0; padding: 0; display: flex; gap: 8px 16px; flex-wrap: wrap; }
.cx-legend--right { flex-direction: column; margin: 0; gap: 8px; min-width: 130px; flex-shrink: 0; }
.cx-legend-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-secondary); }
.cx-legend-sw { width: 10px; flex-shrink: 0; display: inline-block; }
.cx-legend--right .cx-legend-lbl { flex: 1; }
.cx-legend-val { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); font-variant-numeric: tabular-nums; }
/* tooltip */
.cx-tip { position: absolute; transform: translate(-50%, -100%); background: var(--bg-inverse); color: var(--text-inverse); border-radius: 6px; padding: 8px 12px; font-size: 12px; box-shadow: var(--card-shadow-hover); pointer-events: none; z-index: 6; white-space: nowrap; min-width: 120px; }
.cx-tip-title { font-weight: 600; margin-bottom: 4px; }
.cx-tip-row { display: flex; align-items: center; gap: 8px; line-height: 1.6; }
.cx-tip-sw { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }
.cx-tip-k { color: rgba(255,255,255,.72); }
.cx-tip-v { margin-left: auto; font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
/* states */
.cx-skeleton { display: flex; gap: 5%; align-items: flex-end; padding: 0 4px; }
.cx-state { display: flex; align-items: center; justify-content: center; }
.cx-empty { flex-direction: column; gap: 4px; }
.cx-empty-dash { font-size: 40px; color: var(--text-disabled); line-height: 1; }
/* segmented control + demo head + steps */
.cx-demo-head { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.cx-seg { display: inline-flex; gap: 2px; padding: 4px; background: var(--slate-100); border: 1px solid var(--border-subtle); border-radius: 8px; }
.cx-seg-btn { font: inherit; font-size: 12px; font-weight: 600; padding: 4px 12px; border: 0; background: transparent; border-radius: 6px; color: var(--text-secondary); cursor: pointer; transition: background 120ms, color 120ms; }
.cx-seg-btn:hover { color: var(--text-primary); }
.cx-seg-btn.is-active { background: var(--bg-surface); color: var(--brand-600); box-shadow: var(--card-shadow-rest); }
.cx-seg-btn:focus-visible { outline: 0; box-shadow: var(--shadow-focus); }
.cx-steps { margin: 0; padding-left: 20px; display: grid; gap: 8px; font-size: 14px; line-height: 1.55; color: var(--text-secondary); }
.cx-steps strong { color: var(--text-primary); }
.ms-kbd { font-family: var(--font-mono); font-size: 11px; line-height: 1; padding: 2px 4px; border-radius: 4px; background: var(--slate-100); border: 1px solid var(--border-default); border-bottom-width: 2px; color: var(--text-secondary); }
@media (max-width: 720px) {
  .cx-plotwrap.is-right { flex-direction: column; align-items: stretch; }
  .cx-legend--right { flex-direction: row; flex-wrap: wrap; }
}
`;

Object.assign(window, { ChartsSpec });
