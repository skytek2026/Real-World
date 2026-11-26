/* Section: Date, time & range pickers */

/* Static calendar grid generator, pure presentational */
const buildMonth = (year, monthIdx) => {
  const first = new Date(year, monthIdx, 1);
  const start = new Date(first);
  start.setDate(1 - ((first.getDay() + 6) % 7));   // Monday-first
  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
};

const DOW = ["Mo","Tu","We","Th","Fr","Sa","Su"];

const CalendarMonth = ({
  year, monthIdx, today,
  rangeStart, rangeEnd, hoverDate,
  onCellClick, onCellHover, style,
}) => {
  const days = buildMonth(year, monthIdx);
  const monthName = new Date(year, monthIdx, 1).toLocaleString("en-GB", { month: "long", year: "numeric" });
  const isSameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const inRange = (d) => {
    if (!rangeStart) return false;
    const end = rangeEnd || hoverDate;
    if (!end) return false;
    const [a, b] = rangeStart.getTime() <= end.getTime() ? [rangeStart, end] : [end, rangeStart];
    return d.getTime() > a.getTime() && d.getTime() < b.getTime();
  };
  return (
    <div className="ds-datepicker" style={{ border: 0, boxShadow: "none", padding: 0, ...style }}>
      <div className="ds-datepicker-head">
        <span className="ds-datepicker-month">{monthName}</span>
        <div className="ds-datepicker-nav">
          <button aria-label="Previous month"><Icon d={I.chevronLeft || I.chevron} size={14}/></button>
          <button aria-label="Next month"><Icon d={I.chevronRight || I.chevron} size={14}/></button>
        </div>
      </div>
      <div className="ds-datepicker-grid">
        {DOW.map(d => <span key={d} className="dow">{d}</span>)}
        {days.map((d, i) => {
          const otherMonth = d.getMonth() !== monthIdx;
          const isToday = isSameDay(d, today);
          const isStart = isSameDay(d, rangeStart);
          const isEnd = isSameDay(d, rangeEnd);
          const between = inRange(d);
          let cls = "ds-datepicker-cell";
          if (otherMonth) cls += " is-other-month";
          if (isToday) cls += " is-today";
          if (isStart) cls += " is-range-start";
          if (isEnd) cls += " is-range-end";
          if (between) cls += " is-in-range";
          return (
            <button
              key={i}
              className={cls}
              onClick={() => onCellClick?.(d)}
              onMouseEnter={() => onCellHover?.(d)}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const SingleDatePickerDemo = () => {
  const today = new Date();
  const [selected, setSelected] = React.useState(new Date(today.getFullYear(), today.getMonth(), 15));
  return (
    <CalendarMonth
      year={selected.getFullYear()}
      monthIdx={selected.getMonth()}
      today={today}
      rangeStart={selected}
      onCellClick={(d) => setSelected(d)}
      style={{ border: "1px solid var(--border-default)", boxShadow: "var(--shadow-lg)", padding: 12 }}
    />
  );
};

const RangePickerDemo = () => {
  const today = new Date();
  const [activePreset, setActivePreset] = React.useState("7d");
  const [start, setStart] = React.useState(() => {
    const d = new Date(today); d.setDate(d.getDate() - 6); return d;
  });
  const [end, setEnd] = React.useState(today);
  const [hover, setHover] = React.useState(null);
  const [stage, setStage] = React.useState("end");

  const setPreset = (key) => {
    setActivePreset(key);
    const now = new Date();
    let s = new Date(now);
    switch (key) {
      case "today":  s = new Date(now); break;
      case "7d":     s.setDate(now.getDate() - 6); break;
      case "30d":    s.setDate(now.getDate() - 29); break;
      case "90d":    s.setDate(now.getDate() - 89); break;
      case "ytd":    s = new Date(now.getFullYear(), 0, 1); break;
      case "lastQ":  s = new Date(now.getFullYear(), (Math.floor(now.getMonth()/3))*3 - 3, 1); break;
      default: break;
    }
    setStart(s); setEnd(now);
  };

  const onCellClick = (d) => {
    if (stage === "end" || !start) {
      setStart(d); setEnd(null); setStage("range");
    } else {
      if (d.getTime() < start.getTime()) { setEnd(start); setStart(d); }
      else { setEnd(d); }
      setStage("end");
      setActivePreset(null);
    }
  };

  const cur = new Date(today.getFullYear(), today.getMonth(), 1);
  const nxt = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  return (
    <div className="ds-date-range-wrap">
      <div className="ds-date-presets">
        {[
          ["today", "Today"],
          ["7d",    "Last 7 days"],
          ["30d",   "Last 30 days"],
          ["90d",   "Last 90 days"],
          ["ytd",   "Year to date"],
          ["lastQ", "Last quarter"],
        ].map(([k, l]) => (
          <button key={k} className={`ds-date-preset ${activePreset === k ? "is-active" : ""}`} onClick={() => setPreset(k)}>{l}</button>
        ))}
      </div>
      <CalendarMonth
        year={cur.getFullYear()} monthIdx={cur.getMonth()} today={today}
        rangeStart={start} rangeEnd={end} hoverDate={hover}
        onCellClick={onCellClick} onCellHover={setHover}
      />
      <CalendarMonth
        year={nxt.getFullYear()} monthIdx={nxt.getMonth()} today={today}
        rangeStart={start} rangeEnd={end} hoverDate={hover}
        onCellClick={onCellClick} onCellHover={setHover}
      />
    </div>
  );
};

const TimePickerDemo = () => {
  const [focus, setFocus] = React.useState("hh");
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <span className="ds-time-picker">
        <span className={`seg ${focus === "hh" ? "is-focus" : ""}`} tabIndex={0} onFocus={() => setFocus("hh")}>14</span>
        <span className="sep">:</span>
        <span className={`seg ${focus === "mm" ? "is-focus" : ""}`} tabIndex={0} onFocus={() => setFocus("mm")}>32</span>
        <span className="zone">UTC</span>
      </span>
      <span className="ds-time-picker">
        <span className={`seg ${focus === "hh2" ? "is-focus" : ""}`} tabIndex={0} onFocus={() => setFocus("hh2")}>09</span>
        <span className="sep">:</span>
        <span className={`seg ${focus === "mm2" ? "is-focus" : ""}`} tabIndex={0} onFocus={() => setFocus("mm2")}>15</span>
        <span className="sep">:</span>
        <span className={`seg ${focus === "ss2" ? "is-focus" : ""}`} tabIndex={0} onFocus={() => setFocus("ss2")}>42</span>
        <span className="zone">local</span>
      </span>
      <span className="t-caption">Each segment is independently focusable. ↑↓ to increment, ←→ to advance.</span>
    </div>
  );
};

const PresetRules = () => (
  <table className="spec-table">
    <thead>
      <tr><th>Preset</th><th>Range</th><th>When to include</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Today</strong></td><td>00:00 → now (local)</td><td>Always</td></tr>
      <tr><td><strong>Last 7 days</strong></td><td>now − 6d → now</td><td>Always: the operator default</td></tr>
      <tr><td><strong>Last 30 days</strong></td><td>now − 29d → now</td><td>Always</td></tr>
      <tr><td><strong>Last 90 days</strong></td><td>now − 89d → now</td><td>Trend / portfolio surfaces</td></tr>
      <tr><td><strong>Year to date</strong></td><td>1 Jan year → now</td><td>Reporting, compliance</td></tr>
      <tr><td><strong>Last quarter</strong></td><td>Previous calendar quarter</td><td>Reporting, exposure analyses</td></tr>
      <tr><td><strong>This month</strong></td><td>1st → now</td><td>Audit, billing</td></tr>
      <tr><td><strong>All time</strong></td><td>Beginning of record → now</td><td>Search, history; never on dashboards</td></tr>
    </tbody>
  </table>
);

const DatePickerRules = () => (
  <div className="grid-2">
    <div className="ds-card">
      <div className="ds-card-head"><h3 className="ds-card-title">Time zones</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>Dates are stored as <code>UTC</code>. The picker's labels are in the user's zone but the wire value is UTC.</li>
          <li>The "Today" preset uses the user's local midnight, not UTC midnight.</li>
          <li>Picker footer always shows the wire value: <code>2026-04-28T00:00Z → 2026-04-28T23:59Z</code>.</li>
          <li>Time-of-day pickers default to UTC unless the field is explicitly local (vessel ETA at port).</li>
        </ul>
      </div>
    </div>
    <div className="ds-card">
      <div className="ds-card-head"><h3 className="ds-card-title">Constraints</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li><code>minDate</code> / <code>maxDate</code> disable cells; never hide them.</li>
          <li>Disabled cells get a tooltip on hover: "No data before 1 Jan 2024."</li>
          <li>Max range (e.g. 90 days) shows a banner when exceeded, never silently clamps.</li>
          <li>Weekend / holiday styling is opt-in per surface, not a default.</li>
        </ul>
      </div>
    </div>
    <div className="ds-card">
      <div className="ds-card-head"><h3 className="ds-card-title">Keyboard</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li><kbd>↑↓←→</kbd> move by day · <kbd>PgUp/PgDn</kbd> by month · <kbd>Shift+PgUp/PgDn</kbd> by year</li>
          <li><kbd>Home/End</kbd> jump to start/end of week</li>
          <li><kbd>Enter</kbd> commits the focused cell; <kbd>Esc</kbd> closes without committing</li>
          <li><kbd>Tab</kbd> moves focus from grid → presets → footer → close button</li>
        </ul>
      </div>
    </div>
    <div className="ds-card">
      <div className="ds-card-head"><h3 className="ds-card-title">Open behavior</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>Range picker opens at the month containing the current <em>start</em>.</li>
          <li>If no value, open at the current month.</li>
          <li>Two months for range, one for single date. No three-month layouts.</li>
          <li>Presets sit on the left, calendar(s) on the right. Mobile collapses to one column.</li>
        </ul>
      </div>
    </div>
  </div>
);

const DatePickerApi = () => (
  <pre className="code">{`// app/ui/Date: three components, one shape.
type DateValue = string | null;   // ISO 8601 UTC, e.g. "2026-04-28T00:00:00Z"
type DateRange = { start: DateValue; end: DateValue };

// Single
<DatePicker
  value={iso}
  onChange={setIso}
  min="2024-01-01"
  max={new Date().toISOString()}
/>

// Range
<DateRangePicker
  value={range}
  onChange={setRange}
  presets={['today','7d','30d','ytd','lastQ']}
  maxRangeDays={365}
/>

// Time (segmented)
<TimePicker
  value="14:32"          // HH:mm or HH:mm:ss
  onChange={setTime}
  zone="UTC"             // 'UTC' | 'local' | IANA tz string
  step={1}               // minutes
/>

// All three render the same input shell:
<input className="ds-input" placeholder="dd MMM yyyy" value={display}
       onClick={openPicker} readOnly aria-haspopup="dialog" />`}</pre>
);

const DateTimeSection = () => (
  <>
    <div className="subsection" style={{ marginTop: 0 }}>
      <h3 className="subsection-title">Why this primitive</h3>
      <p className="subsection-desc" style={{ maxWidth: 820 }}>
        Skytek's lists, reports and alerts live or die on date selection. The product needs three calendar primitives, single date, date range, and time-of-day, with a consistent set of presets, the same keyboard model, and the same wire format. This is the canonical implementation.
      </p>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Single date</h3>
      <p className="subsection-desc">One month, one selected day. Mondays first, ISO 8601 week numbering. Click any cell to select.</p>
      <div className="panel">
        <div className="panel-body" style={{ display: "flex", justifyContent: "center", padding: 24, background: "var(--bg-canvas)" }}>
          <SingleDatePickerDemo />
        </div>
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Date range</h3>
      <p className="subsection-desc">
        Two months side-by-side, preset shortcuts on the left, hover preview while choosing the end date. Clicking a preset overrides the manual selection
        (and vice versa, manual selection clears the active preset).
      </p>
      <div className="panel">
        <div className="panel-body" style={{ display: "flex", justifyContent: "center", padding: 24, background: "var(--bg-canvas)" }}>
          <RangePickerDemo />
        </div>
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Time picker</h3>
      <p className="subsection-desc">
        Segmented HH · MM · (SS) with explicit zone marker. Keyboard-first: arrow keys increment, tab moves between segments. Never a stepped dropdown.
      </p>
      <div className="panel">
        <div className="panel-body">
          <TimePickerDemo />
        </div>
      </div>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Preset shortcuts</h3>
      <p className="subsection-desc">Eight presets cover the product. Surfaces opt in via the <code className="inline">presets</code> prop: never invent a new one.</p>
      <PresetRules />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Rules of engagement</h3>
      <DatePickerRules />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">React API</h3>
      <DatePickerApi />
    </div>

    <div className="callout">
      <strong>The principle:</strong> a date picker is the most-clicked control in a monitoring product. Slow keyboard, vague time-zone behavior, or one extra click per selection compounds across thousands of operator hours. Optimize accordingly.
    </div>
  </>
);

window.DateTimeSection = DateTimeSection;
