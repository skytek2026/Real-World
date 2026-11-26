/* ============================================================================
   charts-lib.jsx: Skytek composite chart layer (live reference implementation)
   Built from shared primitives: Canvas, Scale, Axis, GridLines, Legend,
   Tooltip, ChartFrame. Token-driven (--chart-*), responsive (ResizeObserver),
   accessible (figure role + hidden data table + roving keyboard focus).
   The .tsx in the spec mirrors these components 1:1.
   ============================================================================ */

/* ── Shared scales / helpers (the "Scale" primitive) ─────────────────── */
const CAT = (i) => `var(--chart-cat-${(i % 8) + 1})`;

function niceStep(raw) {
  const pow = Math.pow(10, Math.floor(Math.log10(raw || 1)));
  const n = (raw || 1) / pow;
  const m = n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10;
  return m * pow;
}
function axisTicks(maxVal, count = 5) {
  const step = niceStep((maxVal || 1) / count);
  const top = Math.max(step, Math.ceil((maxVal || 1) / step) * step);
  const ticks = [];
  for (let v = 0; v <= top + 1e-9; v += step) ticks.push(+v.toFixed(6));
  return { ticks, top };
}
const linear = (d0, d1, r0, r1) => (v) => r0 + ((v - d0) / ((d1 - d0) || 1)) * (r1 - r0);
const truncate = (s, n) => (s && s.length > n ? s.slice(0, n - 1) + "…" : s);

/* ── useMeasure, the responsive backbone of <Canvas> ─────────────────── */
function useMeasure() {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(0);
  React.useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setW(Math.round(e.contentRect.width));
    });
    ro.observe(ref.current);
    setW(Math.round(ref.current.getBoundingClientRect().width));
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

/* ── Roving keyboard focus across data marks (a11y) ──────────────────── */
function onMarksKeyDown(e) {
  const keys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Home", "End"];
  if (!keys.includes(e.key)) return;
  const marks = Array.from(e.currentTarget.querySelectorAll("[data-mark]"));
  const idx = marks.indexOf(document.activeElement);
  if (idx === -1) return;
  e.preventDefault();
  let next = idx;
  if (e.key === "ArrowRight" || e.key === "ArrowDown") next = Math.min(marks.length - 1, idx + 1);
  if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = Math.max(0, idx - 1);
  if (e.key === "Home") next = 0;
  if (e.key === "End") next = marks.length - 1;
  marks[next].focus();
}

/* ── Tooltip primitive ───────────────────────────────────────────────── */
const ChartTooltip = ({ tip }) => {
  if (!tip) return null;
  return (
    <div className="cx-tip" style={{ left: tip.x, top: tip.y }} role="tooltip">
      {tip.title && <div className="cx-tip-title">{tip.title}</div>}
      {tip.rows.map((r, i) => (
        <div key={i} className="cx-tip-row">
          {r.color && <span className="cx-tip-sw" style={{ background: r.color }} />}
          <span className="cx-tip-k">{r.k}</span>
          <span className="cx-tip-v">{r.v}</span>
        </div>
      ))}
    </div>
  );
};

/* ── Legend primitive ────────────────────────────────────────────────── */
const Legend = ({ items, placement = "bottom" }) => (
  <ul className={`cx-legend cx-legend--${placement}`}>
    {items.map((it) => (
      <li key={it.label} className="cx-legend-item">
        <span className="cx-legend-sw" style={{ background: it.color, borderRadius: it.shape === "line" ? 2 : 4, height: it.shape === "line" ? 3 : 10 }} />
        <span className="cx-legend-lbl">{it.label}</span>
        {it.value != null && <span className="cx-legend-val">{it.value}</span>}
      </li>
    ))}
  </ul>
);

/* ── ChartFrame: composite shell: title, state, legend, responsive,
      hidden data table, a11y wrapper. children = (dims) => <svg/> ─────── */
const ChartFrame = ({
  title, caption, height = 260, legend, legendPlacement = "bottom",
  state = {}, ariaLabel, dataTable, children, minWidth = 120,
}) => {
  const [ref, w] = useMeasure();
  const { loading, error, empty } = state;
  const isRight = legendPlacement === "right";

  const body = () => {
    if (loading) {
      return <div className="cx-skeleton" style={{ height }} aria-hidden="true">
        <span className="ds-skel" style={{ height: "60%", alignSelf: "flex-end", width: "12%" }} />
        <span className="ds-skel" style={{ height: "85%", alignSelf: "flex-end", width: "12%" }} />
        <span className="ds-skel" style={{ height: "45%", alignSelf: "flex-end", width: "12%" }} />
        <span className="ds-skel" style={{ height: "70%", alignSelf: "flex-end", width: "12%" }} />
        <span className="ds-skel" style={{ height: "55%", alignSelf: "flex-end", width: "12%" }} />
      </div>;
    }
    if (error) {
      return <div className="cx-state" style={{ height }}>
        <div className="ds-alert ds-alert--danger" style={{ maxWidth: 360 }}>
          <svg className="ds-alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v5m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" /></svg>
          <div className="ds-alert-body"><div className="ds-alert-title">Couldn't load chart</div>{typeof error === "string" ? error : "Retry or check the data source."}</div>
        </div>
      </div>;
    }
    if (empty) {
      return <div className="cx-state cx-empty" style={{ height }}>
        <div className="cx-empty-dash">—</div>
        <div className="t-caption">No data in range.</div>
      </div>;
    }
    return (
      <div className={`cx-plotwrap ${isRight ? "is-right" : ""}`}>
        <div className="cx-plot" ref={ref} style={{ height }}>
          {w > minWidth && children({ width: w, height })}
        </div>
        {legend && <Legend items={legend} placement={legendPlacement} />}
      </div>
    );
  };

  return (
    <figure className="cx-frame" role="group" aria-label={ariaLabel || title}>
      {title && <figcaption className="cx-frame-title t-label">{title}</figcaption>}
      <div className="cx-frame-body">{body()}</div>
      {caption && <div className="cx-frame-cap t-caption">{caption}</div>}
      {dataTable && (
        <table className="sr-only">
          <caption>{ariaLabel || title}: data table</caption>
          <thead><tr>{dataTable.columns.map((c, i) => <th key={i} scope="col">{c}</th>)}</tr></thead>
          <tbody>{dataTable.rows.map((r, i) => <tr key={i}>{r.map((c, j) => j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>)}</tr>)}</tbody>
        </table>
      )}
    </figure>
  );
};

/* ── Axis + GridLines primitives (rendered inside each chart's <svg>) ── */
const GridLines = ({ ticks, scaleY, x0, x1 }) => (
  <g aria-hidden="true">
    {ticks.map((t) => <line key={t} x1={x0} x2={x1} y1={scaleY(t)} y2={scaleY(t)} stroke="var(--chart-grid)" strokeWidth="1" />)}
  </g>
);
const AxisLeft = ({ ticks, scaleY, x, fmt }) => (
  <g aria-hidden="true">
    {ticks.map((t) => <text key={t} x={x - 6} y={scaleY(t) + 3} textAnchor="end" className="cx-axis-lbl">{fmt ? fmt(t) : t}</text>)}
  </g>
);

/* ════════════════════════════════════════════════════════════════════
   BAR CHART, variants: single | stacked | grouped
   ════════════════════════════════════════════════════════════════════ */
const BarChart = ({
  data, series, variant = "single", height = 260,
  colors, formatValue = (v) => v, maxLabel = 10,
  legend: showLegend = true, legendPlacement = "bottom",
  title, caption, state, ariaLabel, setTip,
}) => {
  const palette = colors || series.map((_, i) => CAT(i));

  // Totals per category drive the value scale
  const totals = data.map((d) =>
    variant === "stacked" ? series.reduce((s, k) => s + (d[k] || 0), 0)
      : Math.max(...series.map((k) => d[k] || 0)));
  const maxVal = Math.max(1, ...totals);
  const { ticks, top } = axisTicks(maxVal);

  const legendItems = showLegend && series.length > 1
    ? series.map((k, i) => ({ label: k, color: palette[i] })) : null;

  const dataTable = {
    columns: ["Category", ...series],
    rows: data.map((d) => [d.label, ...series.map((k) => formatValue(d[k] || 0))]),
  };

  return (
    <ChartFrame title={title} caption={caption} height={height} state={state}
      legend={legendItems} legendPlacement={legendPlacement}
      ariaLabel={ariaLabel || title} dataTable={dataTable}>
      {({ width, height: h }) => {
        const m = { t: 14, r: 12, b: 34, l: 40 };
        const iw = width - m.l - m.r, ih = h - m.t - m.b;
        const sy = linear(0, top, m.t + ih, m.t);
        const band = iw / data.length;
        const rotate = band < 48;           // responsive: rotate tight labels
        const grp = series.length > 1 && variant === "grouped";
        const barPad = 0.28;
        const groupW = band * (1 - barPad);
        const sub = grp ? groupW / series.length : groupW;

        const show = (e, d, k, val, color) => {
          const r = e.currentTarget.getBoundingClientRect();
          const host = e.currentTarget.closest(".cx-host");
          const p = host.getBoundingClientRect();
          setTip({ x: r.left - p.left + r.width / 2, y: r.top - p.top - 8, title: d.label,
            rows: [{ k: series.length > 1 ? k : "Value", v: formatValue(val), color }] });
        };

        return (
          <svg viewBox={`0 0 ${width} ${h}`} width={width} height={h} className="cx-svg"
            role="application" aria-label={`${ariaLabel || title}. ${data.length} categories. Use arrow keys to move between bars.`}
            onKeyDown={onMarksKeyDown} onMouseLeave={() => setTip(null)}>
            <GridLines ticks={ticks} scaleY={sy} x0={m.l} x1={width - m.r} />
            <AxisLeft ticks={ticks} scaleY={sy} x={m.l} fmt={formatValue} />
            <line x1={m.l} x2={m.l} y1={m.t} y2={m.t + ih} stroke="var(--chart-axis)" />
            {data.map((d, ci) => {
              const bx = m.l + band * ci;
              return (
                <g key={d.label}>
                  {variant === "stacked" ? (() => {
                    let acc = 0;
                    return series.map((k, si) => {
                      const val = d[k] || 0; const bh = (val / top) * ih;
                      const y = sy(acc + val); acc += val;
                      return <rect key={k} data-mark tabIndex={0} role="img"
                        aria-label={`${d.label}, ${k}: ${formatValue(val)}`}
                        x={bx + band * barPad / 2} y={y} width={groupW} height={Math.max(0, bh)}
                        fill={palette[si]} rx="1.5" className="cx-bar"
                        onMouseEnter={(e) => show(e, d, k, val, palette[si])}
                        onFocus={(e) => show(e, d, k, val, palette[si])} />;
                    });
                  })() : (grp ? series.map((k, si) => {
                    const val = d[k] || 0; const bh = (val / top) * ih;
                    return <rect key={k} data-mark tabIndex={0} role="img"
                      aria-label={`${d.label}, ${k}: ${formatValue(val)}`}
                      x={bx + band * barPad / 2 + sub * si} y={sy(val)} width={Math.max(1, sub - 2)} height={Math.max(0, bh)}
                      fill={palette[si]} rx="1.5" className="cx-bar"
                      onMouseEnter={(e) => show(e, d, k, val, palette[si])}
                      onFocus={(e) => show(e, d, k, val, palette[si])} />;
                  }) : (() => {
                    const k = series[0]; const val = d[k] || 0; const bh = (val / top) * ih;
                    return <rect data-mark tabIndex={0} role="img"
                      aria-label={`${d.label}: ${formatValue(val)}`}
                      x={bx + band * barPad / 2} y={sy(val)} width={groupW} height={Math.max(0, bh)}
                      fill={palette[0]} rx="1.5" className="cx-bar"
                      onMouseEnter={(e) => show(e, d, k, val, palette[0])}
                      onFocus={(e) => show(e, d, k, val, palette[0])} />;
                  })())}
                  <text x={bx + band / 2} y={m.t + ih + (rotate ? 10 : 16)} textAnchor={rotate ? "end" : "middle"}
                    className="cx-cat-lbl" transform={rotate ? `rotate(-35 ${bx + band / 2} ${m.t + ih + 10})` : undefined}>
                    {truncate(d.label, rotate ? maxLabel : Math.max(6, Math.floor(band / 7)))}
                  </text>
                </g>
              );
            })}
          </svg>
        );
      }}
    </ChartFrame>
  );
};

/* ════════════════════════════════════════════════════════════════════
   LINE CHART, variants: single | multi | area
   ════════════════════════════════════════════════════════════════════ */
const LineChart = ({
  data, series, variant = "single", height = 260,
  colors, formatValue = (v) => v, formatX = (v) => v,
  legend: showLegend = true, legendPlacement = "bottom",
  title, caption, state, ariaLabel, setTip,
}) => {
  const palette = colors || series.map((_, i) => CAT(i));
  const maxVal = Math.max(1, ...data.flatMap((d) => series.map((k) => d[k] || 0)));
  const { ticks, top } = axisTicks(maxVal);
  const legendItems = showLegend && series.length > 1
    ? series.map((k, i) => ({ label: k, color: palette[i], shape: "line" })) : null;
  const dataTable = {
    columns: ["X", ...series],
    rows: data.map((d) => [formatX(d.x), ...series.map((k) => formatValue(d[k] || 0))]),
  };

  return (
    <ChartFrame title={title} caption={caption} height={height} state={state}
      legend={legendItems} legendPlacement={legendPlacement}
      ariaLabel={ariaLabel || title} dataTable={dataTable}>
      {({ width, height: h }) => {
        const m = { t: 14, r: 14, b: 30, l: 40 };
        const iw = width - m.l - m.r, ih = h - m.t - m.b;
        const sy = linear(0, top, m.t + ih, m.t);
        const sx = linear(0, data.length - 1, m.l, width - m.r);
        const xTickEvery = Math.ceil(data.length / Math.max(2, Math.floor(iw / 64)));

        const lineFor = (k) => data.map((d, i) => `${i ? "L" : "M"}${sx(i).toFixed(1)} ${sy(d[k] || 0).toFixed(1)}`).join(" ");

        const show = (e, d, i) => {
          const host = e.currentTarget.closest(".cx-host");
          const p = host.getBoundingClientRect();
          const r = e.currentTarget.getBoundingClientRect();
          setTip({ x: r.left - p.left + r.width / 2, y: r.top - p.top - 8, title: formatX(d.x),
            rows: series.map((k, si) => ({ k, v: formatValue(d[k] || 0), color: palette[si] })) });
        };

        return (
          <svg viewBox={`0 0 ${width} ${h}`} width={width} height={h} className="cx-svg"
            role="application" aria-label={`${ariaLabel || title}. ${series.length} series, ${data.length} points. Arrow keys to move between points.`}
            onKeyDown={onMarksKeyDown} onMouseLeave={() => setTip(null)}>
            <GridLines ticks={ticks} scaleY={sy} x0={m.l} x1={width - m.r} />
            <AxisLeft ticks={ticks} scaleY={sy} x={m.l} fmt={formatValue} />
            {series.map((k, si) => (
              <g key={k}>
                {variant === "area" && <path d={`${lineFor(k)} L${sx(data.length - 1)} ${sy(0)} L${sx(0)} ${sy(0)} Z`} fill={palette[si]} fillOpacity="0.12" aria-hidden="true" />}
                <path d={lineFor(k)} fill="none" stroke={palette[si]} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true" />
              </g>
            ))}
            {/* focusable point markers on the first/active series for keyboard nav */}
            {data.map((d, i) => (
              <g key={i}>
                {series.map((k, si) => (
                  <circle key={k} data-mark tabIndex={si === 0 ? 0 : -1} role="img"
                    aria-label={`${formatX(d.x)}${series.length > 1 ? ", " + k : ""}: ${formatValue(d[k] || 0)}`}
                    cx={sx(i)} cy={sy(d[k] || 0)} r="3.5" fill="var(--bg-surface)" stroke={palette[si]} strokeWidth="2"
                    className="cx-dot" onMouseEnter={(e) => show(e, d, i)} onFocus={(e) => show(e, d, i)} />
                ))}
                {i % xTickEvery === 0 && <text x={sx(i)} y={m.t + ih + 16} textAnchor="middle" className="cx-cat-lbl">{formatX(d.x)}</text>}
              </g>
            ))}
          </svg>
        );
      }}
    </ChartFrame>
  );
};

/* ════════════════════════════════════════════════════════════════════
   DONUT CHART, variants: donut | pie  (+ center-label slot)
   ════════════════════════════════════════════════════════════════════ */
const DonutChart = ({
  data, variant = "donut", height = 260, colors,
  formatValue = (v) => v, innerRatio = 0.62,
  centerLabel, centerSlot,
  legend: showLegend = true, legendPlacement = "right",
  title, caption, state, ariaLabel, setTip,
}) => {
  const palette = colors || data.map((_, i) => CAT(i));
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const legendItems = showLegend ? data.map((d, i) => ({ label: d.label, color: palette[i], value: `${Math.round((d.value / total) * 100)}%` })) : null;
  const dataTable = { columns: ["Segment", "Value", "Share"], rows: data.map((d) => [d.label, formatValue(d.value), `${((d.value / total) * 100).toFixed(1)}%`]) };

  const arc = (cx, cy, rO, rI, a0, a1) => {
    const p = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const [x0, y0] = p(rO, a0), [x1, y1] = p(rO, a1);
    const [xi1, yi1] = p(rI, a1), [xi0, yi0] = p(rI, a0);
    if (variant === "pie") return `M${cx} ${cy} L${x0} ${y0} A${rO} ${rO} 0 ${large} 1 ${x1} ${y1} Z`;
    return `M${x0} ${y0} A${rO} ${rO} 0 ${large} 1 ${x1} ${y1} L${xi1} ${yi1} A${rI} ${rI} 0 ${large} 0 ${xi0} ${yi0} Z`;
  };

  return (
    <ChartFrame title={title} caption={caption} height={height} state={state}
      legend={legendItems} legendPlacement={legendPlacement}
      ariaLabel={ariaLabel || title} dataTable={dataTable} minWidth={80}>
      {({ width, height: h }) => {
        const size = Math.min(width, h);
        const cx = width / 2, cy = h / 2, rO = size / 2 - 6, rI = variant === "pie" ? 0 : rO * innerRatio;
        let a = -Math.PI / 2;
        const show = (e, d) => {
          const host = e.currentTarget.closest(".cx-host");
          const p = host.getBoundingClientRect();
          const r = e.currentTarget.getBoundingClientRect();
          setTip({ x: r.left - p.left + r.width / 2, y: r.top - p.top, title: d.label,
            rows: [{ k: "Value", v: formatValue(d.value) }, { k: "Share", v: `${((d.value / total) * 100).toFixed(1)}%` }] });
        };
        return (
          <svg viewBox={`0 0 ${width} ${h}`} width={width} height={h} className="cx-svg"
            role="application" aria-label={`${ariaLabel || title}. ${data.length} segments. Arrow keys to move between segments.`}
            onKeyDown={onMarksKeyDown} onMouseLeave={() => setTip(null)}>
            {data.map((d, i) => {
              const a0 = a, a1 = a + (d.value / total) * Math.PI * 2; a = a1;
              return <path key={d.label} data-mark tabIndex={0} role="img"
                aria-label={`${d.label}: ${formatValue(d.value)}, ${((d.value / total) * 100).toFixed(1)}%`}
                d={arc(cx, cy, rO, rI, a0, a1)} fill={palette[i]} className="cx-arc"
                stroke="var(--bg-surface)" strokeWidth="2"
                onMouseEnter={(e) => show(e, d)} onFocus={(e) => show(e, d)} />;
            })}
            {variant === "donut" && (centerSlot ? (
              <foreignObject x={cx - rI} y={cy - rI} width={rI * 2} height={rI * 2}>
                <div className="cx-center">{centerSlot}</div>
              </foreignObject>
            ) : centerLabel && (
              <>
                <text x={cx} y={cy - 2} textAnchor="middle" className="cx-center-val">{centerLabel.value}</text>
                <text x={cx} y={cy + 14} textAnchor="middle" className="cx-center-lbl">{centerLabel.label}</text>
              </>
            ))}
          </svg>
        );
      }}
    </ChartFrame>
  );
};

/* ── WithTip, hosts tooltip state + renders the absolute tooltip div ── */
const WithTip = ({ Chart, ...props }) => {
  const [tip, setTip] = React.useState(null);
  return (
    <div className="cx-host"
      onMouseLeave={() => setTip(null)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setTip(null); }}>
      <Chart {...props} setTip={setTip} />
      <ChartTooltip tip={tip} />
    </div>
  );
};

/* Public composite components (tooltip-hosted) */
const Bar = (p) => <WithTip Chart={BarChart} {...p} />;
const Line = (p) => <WithTip Chart={LineChart} {...p} />;
const Donut = (p) => <WithTip Chart={DonutChart} {...p} />;

Object.assign(window, { ChartFrame, Legend, ChartTooltip, Bar, Line, Donut, CAT });
