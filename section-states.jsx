/* Section: Empty, error & loading states gallery */

const StateCard = ({ icon, iconTone = "default", title, body, actions }) => (
  <div className="ds-state-card">
    <span className={`ds-state-icon ds-state-icon--${iconTone}`}>{icon}</span>
    <div className="ds-state-title">{title}</div>
    <div className="ds-state-body">{body}</div>
    {actions && <div className="ds-state-actions">{actions}</div>}
  </div>
);

const EmptyStatesGallery = () => (
  <div className="ds-state-gallery">
    <StateCard
      icon={<Icon d={I.folder} size={20} stroke="currentColor"/>}
      title="No vessels yet"
      body="This portfolio doesn't have any vessels. Add one to start monitoring."
      actions={
        <button className="ds-btn ds-btn--primary ds-btn--sm">
          <Icon d={I.plus} size={12} stroke="currentColor"/> Add vessel
        </button>
      }
    />
    <StateCard
      icon={<Icon d={I.search} size={20} stroke="currentColor"/>}
      title="No matches"
      body="No vessels match these filters. Try widening the date range or removing the flag filter."
      actions={
        <button className="ds-btn ds-btn--secondary ds-btn--sm">Reset filters</button>
      }
    />
    <StateCard
      icon={<Icon d={I.flag || I.alert} size={20} stroke="currentColor"/>}
      iconTone="info"
      title="Watchlist is empty"
      body="Star a vessel from any list, or import a list of IMOs to follow."
      actions={
        <>
          <button className="ds-btn ds-btn--ghost ds-btn--sm">Import IMOs</button>
          <button className="ds-btn ds-btn--secondary ds-btn--sm">Browse vessels</button>
        </>
      }
    />
  </div>
);

const ErrorStatesGallery = () => (
  <div className="ds-state-gallery">
    <StateCard
      icon={<Icon d={I.alert} size={20} stroke="currentColor"/>}
      iconTone="danger"
      title="Couldn't load vessels"
      body="The AIS feed timed out after 30 s. Retry, or check the status page."
      actions={
        <>
          <button className="ds-btn ds-btn--primary ds-btn--sm">Retry</button>
          <button className="ds-btn ds-btn--link" style={{ fontSize: 12 }}>Status page →</button>
        </>
      }
    />
    <StateCard
      icon={<Icon d={I.eye} size={20} stroke="currentColor"/>}
      iconTone="warn"
      title="You don't have access"
      body="Black Sea portfolio is restricted to its members. Ask Maeve Daly for access or pick a different portfolio."
      actions={
        <button className="ds-btn ds-btn--secondary ds-btn--sm">Request access</button>
      }
    />
    <StateCard
      icon={<Icon d={I.x} size={20} stroke="currentColor"/>}
      iconTone="danger"
      title="Not found"
      body="Vessel IMO 0000001 doesn't exist in the registry. Check the number, or search by name."
      actions={
        <button className="ds-btn ds-btn--secondary ds-btn--sm">Back to search</button>
      }
    />
    <StateCard
      icon={<Icon d={I.globe} size={20} stroke="currentColor"/>}
      iconTone="warn"
      title="You're offline"
      body="No connection to the Skytek backend. Showing the last cached snapshot, last updated 8 min ago."
      actions={
        <button className="ds-btn ds-btn--ghost ds-btn--sm">Try again</button>
      }
    />
  </div>
);

const PartialFailureDemo = () => (
  <div className="panel">
    <div className="panel-head"><h4>Partial failure</h4><span className="meta">Some rows OK, some failed</span></div>
    <div className="panel-body">
      <div className="ds-alert ds-alert--warning" style={{ marginBottom: 16 }}>
        <Icon d={I.alert} size={20} className="ds-alert-icon"/>
        <div className="ds-alert-body">
          <div className="ds-alert-title">Loaded 12 of 15 vessels</div>
          3 vessels couldn't be loaded, AIS feed gap for IMO 9234567, 9234568, 9234570.
          <span style={{ marginLeft: 8 }}>
            <button className="ds-btn ds-btn--link" style={{ fontSize: 12 }}>Retry failed →</button>
          </span>
        </div>
      </div>
      <table className="ds-table">
        <thead>
          <tr><th>Vessel</th><th>Type</th><th className="num">Speed</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>MV ATLANTIC PEARL</strong></td><td>Container</td><td className="num">14.2 kn</td><td><span className="ds-badge ds-badge--success ds-badge--dot">Live</span></td></tr>
          <tr><td><strong>MV NORDIC STAR</strong></td><td>LNG</td><td className="num">11.8 kn</td><td><span className="ds-badge ds-badge--success ds-badge--dot">Live</span></td></tr>
          <tr style={{ opacity: 0.6 }}><td><strong style={{ color: "var(--text-muted)" }}>IMO 9234567</strong></td><td colSpan={3} style={{ color: "var(--danger-700)", fontSize: 12 }}>
            <Icon d={I.alert} size={12} stroke="currentColor" className="ico-12"/> AIS feed gap: couldn't load
          </td></tr>
          <tr style={{ opacity: 0.6 }}><td><strong style={{ color: "var(--text-muted)" }}>IMO 9234568</strong></td><td colSpan={3} style={{ color: "var(--danger-700)", fontSize: 12 }}>
            <Icon d={I.alert} size={12} stroke="currentColor" className="ico-12"/> AIS feed gap: couldn't load
          </td></tr>
          <tr><td><strong>MV MIRAMAR</strong></td><td>Tanker</td><td className="num">13.4 kn</td><td><span className="ds-badge ds-badge--success ds-badge--dot">Live</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

const LoadingStatesDemo = () => (
  <div className="grid-3">
    <div>
      <div className="t-label" style={{ marginBottom: 8 }}>Skeleton: list row</div>
      <div className="panel">
        <div className="panel-body" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="ds-skel-block" style={{ width: 32, height: 32, borderRadius: "50%" }}/>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <span className="ds-skel-block" style={{ height: 11, width: "70%" }}/>
                <span className="ds-skel-block" style={{ height: 9, width: "50%" }}/>
              </div>
              <span className="ds-skel-block" style={{ width: 60, height: 11 }}/>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div>
      <div className="t-label" style={{ marginBottom: 8 }}>Skeleton: card</div>
      <div className="ds-card">
        <div className="ds-card-body" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span className="ds-skel-block" style={{ height: 13, width: "60%" }}/>
          <span className="ds-skel-block" style={{ height: 28, width: "40%" }}/>
          <span className="ds-skel-block" style={{ height: 8, width: "100%" }}/>
          <span className="ds-skel-block" style={{ height: 8, width: "80%" }}/>
        </div>
      </div>
    </div>
    <div>
      <div className="t-label" style={{ marginBottom: 8 }}>Inline: loading more</div>
      <div className="panel">
        <div className="panel-body" style={{ textAlign: "center", padding: "20px 12px" }}>
          <span className="ds-spinner" style={{ verticalAlign: "middle" }}/>
          <span style={{ marginLeft: 8, fontSize: 13, color: "var(--text-secondary)" }}>Loading next 50 vessels…</span>
        </div>
      </div>
    </div>
  </div>
);

const StateRules = () => (
  <table className="spec-table">
    <thead>
      <tr><th>State</th><th>Visual</th><th>Copy template</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Empty · no data yet</strong></td>
        <td>Neutral icon, single-line title + body, primary CTA</td>
        <td><em>"No [noun] yet"</em>, body explains how to add the first one. CTA is the action.</td>
      </tr>
      <tr>
        <td><strong>Empty · filtered out</strong></td>
        <td>Search icon, secondary "Reset filters" CTA</td>
        <td><em>"No [noun] match"</em>, suggest which filter to widen.</td>
      </tr>
      <tr>
        <td><strong>Empty · personal scope</strong></td>
        <td>Info-toned icon, dual CTAs (import + browse)</td>
        <td><em>"Your [list] is empty"</em>, explain how to populate it.</td>
      </tr>
      <tr>
        <td><strong>Error · network</strong></td>
        <td>Danger icon, primary Retry</td>
        <td>What failed + why + Retry. Link to status page when available.</td>
      </tr>
      <tr>
        <td><strong>Error · permission</strong></td>
        <td>Warning icon, "Request access" CTA</td>
        <td>Name the owner. Don't say "Access denied", say <em>"Ask [owner] for access."</em></td>
      </tr>
      <tr>
        <td><strong>Error · 404 / not found</strong></td>
        <td>Danger icon, back-to-list CTA</td>
        <td>Name what wasn't found. Suggest the next search.</td>
      </tr>
      <tr>
        <td><strong>Offline</strong></td>
        <td>Warning icon, show cached data with timestamp</td>
        <td><em>"You're offline. Showing snapshot from [time]."</em> Never hide data the user already had.</td>
      </tr>
      <tr>
        <td><strong>Partial failure</strong></td>
        <td>Warning banner above the rendered content; failed rows shown muted</td>
        <td><em>"Loaded N of M"</em>, show what worked. Failed rows keep their slot with retry inline.</td>
      </tr>
      <tr>
        <td><strong>Loading · skeleton</strong></td>
        <td>Match the layout of the real content</td>
        <td>No copy. Skeleton replaces content for &lt; 3 s; longer than that, switch to progress or "Still loading…".</td>
      </tr>
      <tr>
        <td><strong>Loading · spinner</strong></td>
        <td>Inline only: for "load more", form submit, or action confirmation</td>
        <td>Verb + noun ("Saving notes…", "Loading next 50 vessels…").</td>
      </tr>
    </tbody>
  </table>
);

const StateChoiceFlow = () => (
  <div className="callout">
    <strong>Picking the right state: decision flow:</strong>
    <ol style={{ margin: "8px 0 0 16px", padding: 0, lineHeight: 1.7, fontSize: 13 }}>
      <li>Did the request <strong>succeed</strong> with no data? → <em>Empty</em>. Pick subtype by whether the user filtered, scoped, or simply hasn't created anything.</li>
      <li>Did the request <strong>fail</strong>? → <em>Error</em>. Pick subtype by failure cause: network · permission · not-found · offline.</li>
      <li>Did <strong>some</strong> data arrive and some fail? → <em>Partial failure</em>. Render what worked.</li>
      <li>Is data <strong>arriving</strong>? → <em>Loading</em>. Skeleton if &gt; 200 ms is expected, spinner if inline / action-driven.</li>
    </ol>
  </div>
);

const StatesSection = () => (
  <>
    <div className="subsection" style={{ marginTop: 0 }}>
      <h3 className="subsection-title">Why this gallery</h3>
      <p className="subsection-desc" style={{ maxWidth: 820 }}>
        Empty, loading and error states are the easiest part of a UI to skip during a build and the easiest to get wrong. They show up at the worst moments, first-use, partial outages, edge data.
        This chapter pulls every state into one place with the canonical copy from the Voice chapter, so a developer can copy the right pattern in ten seconds.
      </p>
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Empty states</h3>
      <p className="subsection-desc">Three subtypes. Pick by why the result set is empty, not by the screen.</p>
      <EmptyStatesGallery />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Error states</h3>
      <p className="subsection-desc">Four subtypes, each with a clear "what / why / how" per the Voice template. The recovery action is always the primary button.</p>
      <ErrorStatesGallery />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Partial failure</h3>
      <p className="subsection-desc">Render what worked. Mark what didn't. Never blank the page because one row failed.</p>
      <PartialFailureDemo />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Loading</h3>
      <p className="subsection-desc">
        Skeleton replaces content; spinners run inline. Use skeletons for initial loads; use a spinner for "loading more" and form submissions. Never show both on the same surface.
      </p>
      <LoadingStatesDemo />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">State reference</h3>
      <StateRules />
    </div>

    <div className="subsection">
      <h3 className="subsection-title">Pick the right state</h3>
      <StateChoiceFlow />
    </div>

    <div className="callout" style={{ borderLeftColor: "var(--warning-500)", background: "var(--warning-050)" }}>
      <strong>The principle:</strong> the absence of data is not the absence of design. Empty, error, and loading screens are where users decide whether to trust the product. Treat them like first-class surfaces, because they are.
    </div>
  </>
);

window.StatesSection = StatesSection;
