/* Section: Event log / timeline */

const TimelineEvent = ({ tone = "default", icon, actor, verb, object, time, detail, payload }) => (
  <div className="ds-event">
    <span className={`ds-event-glyph ds-event-glyph--${tone}`}>{icon}</span>
    <div className="ds-event-head">
      <span className="ds-event-actor">{actor}</span>
      <span className="ds-event-verb">{verb}</span>
      <span className="ds-event-object">{object}</span>
      <span className="ds-event-time">{time}</span>
    </div>
    {detail && <div className="ds-event-detail">{detail}</div>}
    {payload && <pre className="ds-event-payload">{payload}</pre>}
  </div>
);

const VesselAuditDemo = () => (
  <div style={{ background: "var(--bg-app)", padding: "16px 20px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)" }}>
    <div className="ds-timeline">
      <div className="ds-timeline-day">Today · 28 Apr 2026</div>
      <TimelineEvent
        tone="danger"
        icon={<Icon d={I.alert} size={12} stroke="currentColor"/>}
        actor="System"
        verb="raised"
        object="SANCTIONED alert"
        time="14:32 UTC"
        detail="Flag changed from Marshall Islands → Russia. Vessel matches OFAC SDN list."
      />
      <TimelineEvent
        tone="warning"
        icon={<Icon d={I.eye} size={12} stroke="currentColor"/>}
        actor="System"
        verb="detected"
        object="AIS gap"
        time="09:14 UTC"
        detail="No AIS position received in the last 6h 14m. Last known: 43.8°N 37.2°E."
      />
      <TimelineEvent
        tone="brand"
        icon={<Icon d={I.edit} size={12} stroke="currentColor"/>}
        actor="maeve.daly@skytek.com"
        verb="updated"
        object="policy notes"
        time="08:47 UTC"
        payload={`- High-watch flagged\n+ High-watch flagged\n+ Confirm exposure with reinsurer`}
      />
      <div className="ds-timeline-day">Yesterday · 27 Apr 2026</div>
      <TimelineEvent
        tone="success"
        icon={<Icon d={I.check} size={12} stroke="currentColor"/>}
        actor="System"
        verb="cleared"
        object="ROUTE DEVIATION"
        time="22:03 UTC"
        detail="Vessel returned to filed route after 4h 22m off-course."
      />
      <TimelineEvent
        tone="default"
        icon={<Icon d={I.ship} size={12} stroke="currentColor"/>}
        actor="System"
        verb="recorded"
        object="port call"
        time="14:11 UTC"
        detail="Departed Singapore (SG·SIN) en route to Rotterdam (NL·RTM). ETA 19 May 14:00 UTC."
      />
      <TimelineEvent
        tone="brand"
        icon={<Icon d={I.user} size={12} stroke="currentColor"/>}
        actor="ronan.kelly@skytek.com"
        verb="assigned"
        object="this vessel to Tom Walsh"
        time="11:25 UTC"
      />
    </div>
  </div>
);

const EventAnatomy = () => (
  <div className="panel">
    <div className="panel-head"><h4>Event row anatomy</h4></div>
    <div className="panel-body" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "center" }}>
      <div style={{ background: "var(--bg-app)", padding: 16, borderRadius: "var(--radius-md)" }}>
        <div className="ds-timeline" style={{ padding: 0 }}>
          <TimelineEvent
            tone="brand"
            icon={<Icon d={I.edit} size={12} stroke="currentColor"/>}
            actor="maeve.daly@skytek.com"
            verb="updated"
            object="policy notes"
            time="14:32 UTC"
            detail="Notes were modified after the most recent inspection cycle."
          />
        </div>
      </div>
      <ol style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        <li><strong>Glyph</strong>, 24 px circle, tone matches event class (brand / success / warning / danger / neutral). Lucide icon at 12 px.</li>
        <li><strong>Actor</strong>, person email or "System". Bold.</li>
        <li><strong>Verb</strong>, past tense, lowercase. "created", "updated", "raised", "cleared".</li>
        <li><strong>Object</strong>, what was acted on. Bold-ish.</li>
        <li><strong>Time</strong>, right-aligned, mono, absolute time with zone.</li>
        <li><strong>Detail</strong>, one optional line of context.</li>
        <li><strong>Payload</strong>, diff or code block, only when the change is data-shaped.</li>
      </ol>
    </div>
  </div>
);

const EventClassesTable = () => (
  <table className="spec-table">
    <thead>
      <tr><th>Class</th><th>Glyph tone</th><th>Examples</th><th>When</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>System alert</strong></td>
        <td><span className="ds-event-glyph ds-event-glyph--danger" style={{ position: "static" }}><Icon d={I.alert} size={12}/></span></td>
        <td>Sanctioned hit, AIS silence, route deviation, weather hazard</td>
        <td>Automated trigger from monitoring rules. Always has a clear/ack path.</td>
      </tr>
      <tr>
        <td><strong>Warning</strong></td>
        <td><span className="ds-event-glyph ds-event-glyph--warning" style={{ position: "static" }}><Icon d={I.eye} size={12}/></span></td>
        <td>Watchlist match, speed anomaly, policy expiring</td>
        <td>Soft signals; no immediate action required.</td>
      </tr>
      <tr>
        <td><strong>State change</strong></td>
        <td><span className="ds-event-glyph ds-event-glyph--success" style={{ position: "static" }}><Icon d={I.check} size={12}/></span></td>
        <td>Alert cleared, port arrival, AIS resumed, policy renewed</td>
        <td>Resolution of a previous warning or system event.</td>
      </tr>
      <tr>
        <td><strong>User action</strong></td>
        <td><span className="ds-event-glyph ds-event-glyph--brand" style={{ position: "static" }}><Icon d={I.edit} size={12}/></span></td>
        <td>Notes edited, assignment changed, watch flag toggled</td>
        <td>Anything a human did. Always includes the actor email.</td>
      </tr>
      <tr>
        <td><strong>Record</strong></td>
        <td><span className="ds-event-glyph" style={{ position: "static" }}><Icon d={I.ship} size={12}/></span></td>
        <td>Port call, voyage start, AIS position snapshot</td>
        <td>Passive observation. Background tone, no decoration.</td>
      </tr>
    </tbody>
  </table>
);

const TimelineVariants = () => (
  <table className="spec-table">
    <thead>
      <tr><th>Surface</th><th>Filters</th><th>Default grouping</th><th>Load pattern</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Vessel detail · Activity</strong></td>
        <td>Class (alert/user/system/record), actor</td>
        <td>By day</td>
        <td>Paginated · "Load older"</td>
      </tr>
      <tr>
        <td><strong>Alert detail · Trail</strong></td>
        <td>None: single alert's lineage</td>
        <td>Reverse chronological, flat</td>
        <td>Complete: typically &lt; 20 entries</td>
      </tr>
      <tr>
        <td><strong>Compliance · Audit log</strong></td>
        <td>User, action type, date range, IP</td>
        <td>By day</td>
        <td>Virtualized · infinite scroll</td>
      </tr>
      <tr>
        <td><strong>Portfolio · Recent activity</strong></td>
        <td>Class, vessel</td>
        <td>By day</td>
        <td>Last 30d default · "Show all"</td>
      </tr>
      <tr>
        <td><strong>NatCat event · Updates</strong></td>
        <td>None</td>
        <td>Reverse chronological, no grouping</td>
        <td>Live · polled every 60 s</td>
      </tr>
    </tbody>
  </table>
);

const TimelineRules = () => (
  <div className="grid-2">
    <div className="ds-card">
      <div className="ds-card-head"><h3 className="ds-card-title">Time display</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>Absolute UTC time on every event row.</li>
          <li>Day header is local-to-user (e.g. "Today", "Yesterday", "27 Apr 2026").</li>
          <li>Relative time ("2 min ago") only appears on the top-of-feed item or in a hover tooltip, never as the only timestamp.</li>
          <li>Live feeds show a tick indicator next to the day header that updates every 60 s.</li>
        </ul>
      </div>
    </div>
    <div className="ds-card">
      <div className="ds-card-head"><h3 className="ds-card-title">Empty &amp; loading</h3></div>
      <div className="ds-card-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>Empty state: "No activity in this range." Single line, no illustration.</li>
          <li>Loading: 3 skeleton rows; never a centered spinner over an existing feed.</li>
          <li>Error: a danger banner above the rail, "Couldn't load activity. Retry." Don't blank the existing rows.</li>
          <li>End-of-feed: a muted "Beginning of history" line with the earliest known date.</li>
        </ul>
      </div>
    </div>
  </div>
);

const EventApiSpec = () => (
  <pre className="code">{`// One Event shape powers every timeline surface.
type EventClass = 'alert' | 'warning' | 'state' | 'user' | 'record';

type Event = {
  id: string;
  ts: string;              // ISO 8601 UTC
  class: EventClass;
  actor: { kind: 'user' | 'system'; id: string; label: string };
  verb: string;            // "raised" | "updated" | "cleared" | …
  object: { kind: string; id: string; label: string };
  detail?: string;         // single-line context
  payload?: {
    kind: 'diff' | 'json' | 'text';
    body: string;
  };
  acknowledged?: { by: string; ts: string };
};

// Standard component
<EventTimeline
  events={events}
  groupBy="day"
  loadOlder={fetchOlder}
  filters={['class', 'actor']}
  onAck={ackEvent}
/>`}</pre>
);

const EventLogSection = () => (
  <>
    <div className="subsection" style={{ marginTop: 0 }}>
      <h3 className="subsection-title">Why this chapter</h3>
      <p className="subsection-desc" style={{ maxWidth: 820 }}>
        Vessel history, alert trails, audit logs, NatCat updates, portfolio activity, every Skytek surface needs to show "what happened, when, who did it."
        Today these timelines live in five modules with five different row designs. One component, one event shape, one set of rules.
      </p>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Anatomy</h3>
      <EventAnatomy />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Event classes</h3>
      <p className="subsection-desc">Five glyph tones cover every event in the product. Modules don't introduce new tones.</p>
      <EventClassesTable />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">In context: vessel activity</h3>
      <p className="subsection-desc">
        A live composition: system alerts, user actions, state changes, and records, all in one rail, grouped by day with sticky day headers.
      </p>
      <VesselAuditDemo />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Surface variants</h3>
      <p className="subsection-desc">
        The component is the same; defaults differ per surface. Don't author a custom variant, configure props.
      </p>
      <TimelineVariants />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Time, empty, error</h3>
      <TimelineRules />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Event shape</h3>
      <p className="subsection-desc">One Event type powers every surface. The API contract is owned by the system, not by individual modules.</p>
      <EventApiSpec />
    </div>

    <div className="callout">
      <strong>The principle:</strong> a timeline tells one story per row, who did what, to what, when. Two stories means two rows. If you can't fit it on a single line + one detail, it's a card, not an event.
    </div>
  </>
);

window.EventLogSection = EventLogSection;
