/* Section 5: Apply the system: 4 product surfaces */

const ApplyHeader = ({ name, what, why }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 12 }}>
    <div className="ds-card" style={{ padding: 12 }}>
      <div className="t-overline" style={{ color: "var(--brand-700)" }}>Surface</div>
      <div className="t-h3" style={{ marginTop: 4 }}>{name}</div>
    </div>
    <div className="ds-card" style={{ padding: 12 }}>
      <div className="t-overline">What changes</div>
      <ul style={{ margin: "4px 0 0", paddingLeft: 20, fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>
        {what.map((w,i) => <li key={i}>{w}</li>)}
      </ul>
    </div>
    <div className="ds-card" style={{ padding: 12 }}>
      <div className="t-overline">Why</div>
      <ul style={{ margin: "4px 0 0", paddingLeft: 20, fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>
        {why.map((w,i) => <li key={i}>{w}</li>)}
      </ul>
    </div>
  </div>
);

const Frame = ({ label, children, h = 520 }) => (
  <div className="surface" style={{ padding: 0 }}>
    <div className="surface-toolbar"><span className="dot r"/><span className="dot y"/><span className="dot g"/><span style={{ marginLeft: 8 }}>{label}</span></div>
    <div style={{ height: h, overflow: "hidden", background: "var(--bg-app)" }}>{children}</div>
  </div>
);

const ProductShell = ({ active, title, children, breadcrumb, actions }) => (
  <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", height: "100%" }}>
    <div className="ds-sidebar" style={{ width: "100%", padding: "12px 0", height: "100%", overflow: "hidden" }}>
      <div style={{ padding: "0 16px 12px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="app-nav-brand-mark" style={{ width: 22, height: 22, fontSize: 11 }}>S</div>
        <span style={{ fontWeight: 600, fontSize: 13 }}>Skytek</span>
      </div>
      <div style={{ padding: "12px 0 4px 20px", fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Monitor</div>
      <a className={`ds-sidebar-item ${active==="dashboard"?"is-active":""}`}><Icon d={I.bars}/> Dashboard</a>
      <a className={`ds-sidebar-item ${active==="vessels"?"is-active":""}`}><Icon d={I.ship}/> Vessels</a>
      <a className={`ds-sidebar-item ${active==="aircraft"?"is-active":""}`}><Icon d={I.plane}/> Aircraft</a>
      <a className={`ds-sidebar-item ${active==="regions"?"is-active":""}`}><Icon d={I.globe}/> Regions</a>
      <a className={`ds-sidebar-item ${active==="portfolios"?"is-active":""}`}><Icon d={I.folder}/> Portfolios</a>
      <a className={`ds-sidebar-item ${active==="reports"?"is-active":""}`}><Icon d={I.trend}/> Reports</a>
    </div>
    <div style={{ display: "grid", gridTemplateRows: "44px 1fr", minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 16px", background: "white", borderBottom: "1px solid var(--border-default)" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 280 }}>
          <input className="ds-input" placeholder="Search…" style={{ paddingLeft: 28, height: 28 }} />
          <span style={{ position: "absolute", left: 8, top: 7, color: "var(--text-muted)" }}><Icon d={I.search} size={14}/></span>
        </div>
        <div className="spacer-grow"/>
        <button className="ds-btn ds-btn--ghost ds-btn--icon ds-btn--sm"><Icon d={I.bell}/></button>
        <span className="ds-avatar" style={{ width: 24, height: 24, fontSize: 11 }}>JL</span>
      </div>
      <div style={{ overflow: "auto" }}>
        <div style={{ padding: "12px 20px 0", display: "flex", gap: 4, fontSize: 12, color: "var(--text-muted)" }}>
          {breadcrumb}
        </div>
        <div style={{ padding: "4px 20px 12px", display: "flex", alignItems: "flex-end", gap: 12 }}>
          <h1 className="t-h1" style={{ flex: 1, margin: 0 }}>{title}</h1>
          {actions}
        </div>
        <div style={{ padding: "0 20px 20px" }}>{children}</div>
      </div>
    </div>
  </div>
);

const ApplyDashboard = () => (
  <>
    <ApplyHeader
      name="Marine dashboard"
      what={[
        "Stat cards unified to one Card primitive (was 3 layouts)",
        "Map canvas uses --bg-canvas; controls use Button primitives",
        "Severity chips replace ad-hoc colored text",
      ]}
      why={[
        "One read of the page tells you risk, count, trend",
        "Chart/legend density preserved without visual noise",
        "Works at 1280–1920px without rework",
      ]}
    />
    <Frame label="dashboard · /dashboard" h={560}>
      <ProductShell active="dashboard" title="Marine Dashboard"
        breadcrumb={<span>Dashboard</span>}
        actions={<>
          <button className="ds-btn ds-btn--secondary ds-btn--sm"><Icon d={I.download}/> Export</button>
          <button className="ds-btn ds-btn--secondary ds-btn--sm"><Icon d={I.calendar}/> Last 7 days</button>
        </>}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {[
            ["Vessels tracked", "1,284", "+12", "info"],
            ["At risk", "23", "+4", "danger"],
            ["Sanctioned", "2", "0", "neutral"],
            ["Compliance", "94%", "+1.2", "success"],
          ].map(([t, v, d, k], i) => (
            <div key={i} className="ds-card" style={{ padding: 12 }}>
              <div className="t-caption">{t}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
                <span className="t-h1 t-numeric" style={{ margin: 0 }}>{v}</span>
                <span className={`ds-badge ds-badge--${k} ds-badge--dot`}>{d}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 12, marginTop: 12 }}>
          <div className="ds-card" style={{ padding: 0, height: 280, position: "relative", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center" }}>
              <h3 className="ds-card-title" style={{ flex: 1 }}>Live fleet · North Atlantic</h3>
              <button className="ds-btn ds-btn--ghost ds-btn--sm"><Icon d={I.filter}/> Filter</button>
            </div>
            <div style={{ height: "100%", background: "linear-gradient(120deg,#dbe7f0 0%,#c5d8e8 50%,#bcd0e0 100%)", position: "relative" }}>
              {[[40,55],[55,60],[70,40],[35,75],[50,30],[80,65],[25,50]].map(([x,y],i)=>(
                <div key={i} style={{ position:"absolute", left:`${x}%`, top:`${y}%`, width:8, height:8, borderRadius:"50%", background: i===4?"var(--danger-500)": i===2?"var(--warning-500)":"var(--brand-600)", boxShadow:"0 0 0 4px rgba(255,255,255,0.7)" }} />
              ))}
            </div>
          </div>
          <div className="ds-card" style={{ padding: 0 }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-subtle)" }}>
              <h3 className="ds-card-title">Recent alerts</h3>
            </div>
            <div>
              {[
                ["danger","Sanctioned vessel","M/V Helios · 2m"],
                ["warning","Severe weather","Voyage 4711 · 8m"],
                ["info","Region updated","NA-04 · 14m"],
                ["success","Policy added","#44721 · 1h"],
              ].map(([k,t,m],i)=>(
                <div key={i} style={{ display:"flex", gap: 8, padding: "12px 16px", borderTop:i?"1px solid var(--border-subtle)":0, alignItems:"flex-start" }}>
                  <span className={`ds-badge ds-badge--${k} ds-badge--dot`} style={{ marginTop: 2 }}/>
                  <div style={{ fontSize: 12.5, lineHeight: 1.4 }}>
                    <div style={{ fontWeight: 600 }}>{t}</div>
                    <div className="t-caption">{m}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ProductShell>
    </Frame>
  </>
);

const ApplyTable = () => (
  <>
    <ApplyHeader
      name="Vessels list"
      what={[
        "Single Table primitive replaces 4 implementations",
        "Sticky header, removed alternating-row backgrounds",
        "Filters consolidated into one popover, badge shows active count",
      ]}
      why={[
        "Engineers stop reinventing tables per module",
        "Hover highlight is enough to track row on dense screens",
        "Filter state is discoverable + resettable in one place",
      ]}
    />
    <Frame label="vessels · /gsin" h={560}>
      <ProductShell active="vessels" title="Vessels"
        breadcrumb={<span>GSIN <Icon d={I.chevronRight} size={11}/> Vessels</span>}
        actions={<>
          <button className="ds-btn ds-btn--secondary ds-btn--sm"><Icon d={I.download}/> Export</button>
          <button className="ds-btn ds-btn--primary ds-btn--sm"><Icon d={I.plus}/> Add vessel</button>
        </>}
      >
        <div className="ds-card" style={{ padding: 0 }}>
          <div style={{ padding: 12, borderBottom: "1px solid var(--border-subtle)", display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ position: "relative", width: 280 }}>
              <input className="ds-input" placeholder="Search vessels…" style={{ paddingLeft: 28, height: 28 }} />
              <span style={{ position:"absolute", left:8, top:7, color:"var(--text-muted)" }}><Icon d={I.search} size={14}/></span>
            </div>
            <button className="ds-btn ds-btn--secondary ds-btn--sm"><Icon d={I.filter}/> Filters <span className="ds-badge ds-badge--info" style={{ marginLeft: 4 }}>3</span></button>
            <span className="ds-badge ds-badge--neutral">Risk: D, E</span>
            <span className="ds-badge ds-badge--neutral">Flag: PA</span>
            <span className="ds-badge ds-badge--neutral">Status: At risk</span>
            <div className="spacer-grow" />
            <span className="t-caption">142 vessels</span>
          </div>
          <table className="ds-table is-compact">
            <thead>
              <tr>
                <th style={{ width: 28 }}><input type="checkbox" className="ds-check"/></th>
                <th>Vessel</th>
                <th style={{ width: 100 }}>IMO</th>
                <th style={{ width: 60 }}>Flag</th>
                <th style={{ width: 70 }}>Risk</th>
                <th style={{ width: 130 }}>Status</th>
                <th style={{ width: 130 }}>Last seen</th>
                <th className="num" style={{ width: 130 }}>Sum insured</th>
                <th style={{ width: 40 }}/>
              </tr>
            </thead>
            <tbody>
              {[
                ["M/V Stratos","9472183","MT","A","Compliant","2m ago",28_400_000],
                ["Aegean Pioneer","9301847","GR","B","In review","11m ago",14_900_000],
                ["Bristol Endeavour","9618742","GB","C","At risk","32m ago",19_500_000],
                ["Norwegian Beacon","9510938","NO","A","Compliant","4m ago",31_200_000],
                ["Helios Carrier","9432751","PA","E","Sanctioned","2h ago",12_700_000],
                ["Lisbon Trader","9388321","PT","B","Compliant","6m ago",17_200_000],
                ["Suez Voyager","9470922","EG","D","At risk","18m ago",22_100_000],
                ["Reykjavík Spirit","9551238","IS","A","Compliant","8m ago",26_400_000],
              ].map((r, i) => (
                <tr key={i}>
                  <td><input type="checkbox" className="ds-check"/></td>
                  <td><strong>{r[0]}</strong></td>
                  <td className="t-mono" style={{ fontSize: 12 }}>{r[1]}</td>
                  <td>{r[2]}</td>
                  <td><span className={`ds-rating ds-rating--${r[3].toLowerCase()}`}>{r[3]}</span></td>
                  <td><span className={`ds-badge ds-badge--${r[4]==="Compliant"?"success":r[4]==="In review"?"info":r[4]==="At risk"?"warning":"danger"} ds-badge--dot`}>{r[4]}</span></td>
                  <td className="t-caption">{r[5]}</td>
                  <td className="num t-numeric">${r[6].toLocaleString()}</td>
                  <td><button className="ds-btn ds-btn--ghost ds-btn--icon ds-btn--xs"><Icon d={I.more}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: 12, borderTop: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: 8 }}>
            <span className="t-caption">1–8 of 142</span>
            <div className="spacer-grow"/>
            <button className="ds-btn ds-btn--ghost ds-btn--sm">Previous</button>
            <button className="ds-btn ds-btn--secondary ds-btn--sm">Next</button>
          </div>
        </div>
      </ProductShell>
    </Frame>
  </>
);

const ApplyDetail = () => (
  <>
    <ApplyHeader
      name="Vessel detail"
      what={[
        "Header consolidates badge + meta + actions in one row",
        "Tabs replace tab-like segmented controls in legacy modules",
        "Definition lists for properties: uniform key/value layout",
      ]}
      why={[
        "Header height is consistent across all detail pages",
        "Property scanning is faster with aligned key columns",
        "Removes 3 different ways the team currently shows vessel meta",
      ]}
    />
    <Frame label="vessel · /vessel/:id" h={580}>
      <ProductShell active="vessels" title="M/V Stratos"
        breadcrumb={<><span>Vessels</span><Icon d={I.chevronRight} size={11}/><span>M/V Stratos</span></>}
        actions={<>
          <span className="ds-badge ds-badge--success ds-badge--dot" style={{ alignSelf:"center" }}>Compliant</span>
          <span className="ds-rating ds-rating--a" style={{ alignSelf:"center" }}>A</span>
          <button className="ds-btn ds-btn--secondary ds-btn--sm"><Icon d={I.download}/> PDF</button>
          <button className="ds-btn ds-btn--primary ds-btn--sm"><Icon d={I.flag}/> Flag</button>
        </>}
      >
        <div className="ds-tabs" role="tablist" style={{ marginBottom: 12 }}>
          <button role="tab" className="ds-tab" aria-selected="true">Overview</button>
          <button role="tab" className="ds-tab">Voyages</button>
          <button role="tab" className="ds-tab">Casualties</button>
          <button role="tab" className="ds-tab">Compliance</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap: 12 }}>
          <div className="ds-card">
            <div className="ds-card-head"><h3 className="ds-card-title">Particulars</h3></div>
            <div className="ds-card-body" style={{ display:"grid", gridTemplateColumns:"160px 1fr 160px 1fr", gap: "8px 16px", fontSize: 13 }}>
              {[
                ["IMO","9472183"],["MMSI","248901000"],
                ["Flag","Malta"],["Type","Bulk carrier"],
                ["Built","2018"],["DWT","82,400 t"],
                ["Operator","Aegean Maritime"],["Class","DNV"],
              ].map(([k,v],i)=>(
                <React.Fragment key={i}>
                  <div className="t-caption">{k}</div>
                  <div className={i===0||i===1?"t-mono":""} style={{ fontWeight: 500 }}>{v}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="ds-card">
            <div className="ds-card-head"><h3 className="ds-card-title">Risk profile</h3></div>
            <div className="ds-card-body" style={{ display: "grid", gap: 8 }}>
              {[["PSC compliance","94%",94],["Sanctions risk","Low",10],["Voyage risk","Medium",55]].map(([k,v,p],i)=>(
                <div key={i}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize: 12, marginBottom: 4 }}>
                    <span className="t-caption">{k}</span>
                    <strong style={{ fontSize: 12.5 }}>{v}</strong>
                  </div>
                  <div className="ds-progress"><span style={{ width: `${p}%`, background: p>70?"var(--success-500)":p>30?"var(--warning-500)":"var(--info-500)" }}/></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ds-card" style={{ marginTop: 12 }}>
          <div className="ds-card-head"><h3 className="ds-card-title">Recent voyages</h3><a className="ds-btn ds-btn--link">All voyages →</a></div>
          <table className="ds-table is-compact">
            <thead><tr><th>From</th><th>To</th><th>Departed</th><th>ETA</th><th>Status</th></tr></thead>
            <tbody>
              {[["Piraeus","Rotterdam","Apr 21","Apr 29","On schedule"],["Tangier","Piraeus","Apr 8","Apr 15","Completed"],["Algeciras","Tangier","Apr 1","Apr 4","Completed"]].map((r,i)=>(
                <tr key={i}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td><span className={`ds-badge ds-badge--${r[4]==="On schedule"?"info":"success"} ds-badge--dot`}>{r[4]}</span></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </ProductShell>
    </Frame>
  </>
);

const ApplyForm = () => (
  <>
    <ApplyHeader
      name="Add policy · form flow"
      what={[
        "Standard form layout with grouped FormItems",
        "Inline validation messages, no toasts for field errors",
        "Sticky footer with one primary CTA",
      ]}
      why={[
        "Engineers drop in <Form>, <FormField>, <FormItem>, no styling",
        "Errors are visible without leaving the field",
        "Save is unambiguous; Cancel is the secondary path",
      ]}
    />
    <Frame label="add policy · /portfolio/:id/policy/add" h={580}>
      <ProductShell active="portfolios" title="Add policy"
        breadcrumb={<><span>Portfolios</span><Icon d={I.chevronRight} size={11}/><span>Atlantic Hull 2026</span><Icon d={I.chevronRight} size={11}/><span>Policies</span><Icon d={I.chevronRight} size={11}/><span>Add</span></>}
        actions={<></>}
      >
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 16 }}>
          <div>
            <div className="t-label" style={{ marginBottom: 8 }}>Sections</div>
            <div className="col" style={{ gap: 2 }}>
              {[["Policy details", true],["Coverage", false],["Vessels", false],["Documents", false]].map(([s,a],i)=>(
                <a key={i} className={`ds-sidebar-item ${a?"is-active":""}`} style={{ margin: 0 }}><span style={{ width: 20, height: 20, borderRadius: "50%", background: a?"var(--brand-600)":"var(--slate-200)", color:a?"white":"var(--text-muted)", display:"grid", placeItems:"center", fontSize: 11, fontWeight: 600 }}>{i+1}</span> {s}</a>
              ))}
            </div>
          </div>
          <div className="ds-card">
            <div className="ds-card-head"><h3 className="ds-card-title">Policy details</h3></div>
            <div className="ds-card-body" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap: 16 }}>
              <div className="ds-field"><label className="ds-field-label">Policy number <span className="ds-field-required">*</span></label><input className="ds-input" defaultValue="44721"/></div>
              <div className="ds-field"><label className="ds-field-label">Underwriter <span className="ds-field-required">*</span></label><select className="ds-input ds-select"><option>JL Marine Re</option></select></div>
              <div className="ds-field"><label className="ds-field-label">Effective date <span className="ds-field-required">*</span></label><input className="ds-input" defaultValue="2026-05-01"/></div>
              <div className="ds-field"><label className="ds-field-label">Expiry date <span className="ds-field-required">*</span></label><input className="ds-input" defaultValue="2027-04-30"/></div>
              <div className="ds-field" style={{ gridColumn: "1 / -1" }}>
                <label className="ds-field-label">Coverage type</label>
                <div className="row" style={{ gap: 16 }}>
                  <label className="row" style={{ gap: 4, fontSize: 13 }}><input type="radio" name="ct" className="ds-radio" defaultChecked/> Hull &amp; Machinery</label>
                  <label className="row" style={{ gap: 4, fontSize: 13 }}><input type="radio" name="ct" className="ds-radio"/> P&amp;I</label>
                  <label className="row" style={{ gap: 4, fontSize: 13 }}><input type="radio" name="ct" className="ds-radio"/> War risk</label>
                </div>
              </div>
              <div className="ds-field"><label className="ds-field-label">Premium (USD)</label><input className="ds-input" defaultValue="−250" aria-invalid="true"/><div className="ds-field-error"><Icon d={I.alert} size={12}/> Must be a positive number.</div></div>
              <div className="ds-field"><label className="ds-field-label">Deductible (USD)</label><input className="ds-input" defaultValue="50,000"/></div>
              <div className="ds-field" style={{ gridColumn: "1 / -1" }}>
                <label className="ds-field-label">Notes</label>
                <textarea className="ds-input" style={{ height: 64, padding: 8 }} placeholder="Optional context for the underwriter…"/>
              </div>
            </div>
            <div className="ds-card-foot">
              <span className="t-caption" style={{ marginRight: "auto" }}>Step 1 of 4</span>
              <button className="ds-btn ds-btn--secondary ds-btn--sm">Cancel</button>
              <button className="ds-btn ds-btn--primary ds-btn--sm">Continue <Icon d={I.chevronRight}/></button>
            </div>
          </div>
        </div>
      </ProductShell>
    </Frame>
  </>
);

const ApplySection = () => (
  <>
    <ApplyDashboard />
    <hr className="section-hr"/>
    <ApplyTable />
    <hr className="section-hr"/>
    <ApplyDetail />
    <hr className="section-hr"/>
    <ApplyForm />
  </>
);

window.ApplySection = ApplySection;
