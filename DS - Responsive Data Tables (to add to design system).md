# Pattern: Responsive data tables → cards

Ready to paste into the **Skytek Design System** project. I can't write to that
project from here — open it and apply the three edits below.

Shipped in: `AssetsSearch.html` (all four asset tabs), `MarinePortfolioDetails.html`
(14-column policies table).

---

## The rule

Wide list tables (5+ columns) do **not** become horizontally scrollable on small
screens. Below the breakpoint the table is replaced by a stacked card list — one
card per row — so every field stays reachable without sideways panning.

- Breakpoint: `767px` for in-page panels, `860px` for full-page asset tables.
- The `<table>` and the card list both render; CSS decides which is visible.
  No JS branch, no second data path.
- **3–5 fields surface at the top of each card.** Everything else goes behind a
  single `Show more` disclosure per card.
- Card anatomy, top to bottom:
  1. **Title** — the row's primary identifier, styled as the link it is in the table.
  2. **Subline** — one line of context (flag + IMO, vessel name, operator).
  3. **Badge** — type/status, right-aligned on the title row.
  4. **Key grid** — 2-column `label over value` pairs; the money/primary metric
     gets `is-strong`. A pair may span both columns with `grid-column:1/-1`.
  5. **`Show more`** — 44px min-height, theme-colored, chevron rotates 180°.
- Column-visibility controls (`Edit Columns`) hide on mobile — cards define their
  own field order, so column toggles are meaningless there.
- Search and the filter drawer stay available and go full-width.
- Never truncate a value in a card; wrap it (`overflow-wrap:anywhere`).

## 1. Add to `styles.css`

```css
/* ── Pattern: responsive table → cards ───────────────────────────────── */
.ds-table-cards { display: none; }
.ds-rcard { padding: 14px 16px; border-bottom: 1px solid var(--border-subtle, #eef2f7); display: flex; flex-direction: column; gap: 12px; }
.ds-rcard:last-child { border-bottom: 0; }
.ds-rcard-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
.ds-rcard-id { min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.ds-rcard-title { font-size: 16px; font-weight: 700; line-height: 1.25; color: var(--brand-600, #2563eb); text-decoration: none; word-break: break-word; }
.ds-rcard-sub { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; font-size: 12.5px; color: var(--text-secondary, #64748b); }
.ds-rcard-key { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 14px; }
.ds-rcard-kv { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.ds-rcard-k { font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: var(--text-muted, #94a3b8); }
.ds-rcard-v { font-size: 13.5px; font-weight: 500; color: var(--text-primary, #334155); font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
.ds-rcard-v.is-strong { font-size: 15px; font-weight: 700; color: var(--text-strong, #0f172a); }
.ds-rcard-v.is-muted { color: var(--text-muted, #94a3b8); }
.ds-rcard-v.is-mono { font-family: var(--font-mono); font-size: 12px; }
.ds-rcard-more { display: none; }
.ds-rcard.open .ds-rcard-more { display: block; padding-top: 12px; border-top: 1px dashed var(--border-default, #e2e8f0); animation: dsRcardIn .22s ease; }
@keyframes dsRcardIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
.ds-rcard-toggle { align-self: flex-start; display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 0 2px; border: 0; background: none; cursor: pointer; font-family: inherit; font-size: 12.5px; font-weight: 600; color: var(--brand-600, #2563eb); }
.ds-rcard-chev { transition: transform .2s ease; }
.ds-rcard.open .ds-rcard-chev { transform: rotate(180deg); }
@media (max-width: 767px) {
  .ds-table-scroll { display: none; }
  .ds-table-cards { display: block; }
  .ds-edit-columns { display: none !important; }
}
```

Wrap the `<table>` in `.ds-table-scroll` and the card list in `.ds-table-cards`.
Put `.ds-edit-columns` on the Edit Columns trigger.

## 2. Add a subsection to `section-data-primitives.jsx`

Insert before the closing `<div className="callout">`:

```jsx
const ResponsiveTableCardDemo = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="ds-card" style={{ maxWidth: 380, overflow: "hidden" }}>
      <article className="ds-rcard">
        <div className="ds-rcard-top">
          <div className="ds-rcard-id">
            <a className="ds-rcard-title" href="#">ATLANTIC PIONEER</a>
            <div className="ds-rcard-sub">Liberia · IMO 9432187</div>
          </div>
          <span className="ds-badge ds-badge--info">Tanker</span>
        </div>
        <div className="ds-rcard-key">
          <div className="ds-rcard-kv"><span className="ds-rcard-k">Est. Value</span><span className="ds-rcard-v is-strong">$48.2M</span></div>
          <div className="ds-rcard-kv"><span className="ds-rcard-k">Length</span><span className="ds-rcard-v">183 m</span></div>
          <div className="ds-rcard-kv"><span className="ds-rcard-k">Gross Tonnage</span><span className="ds-rcard-v">29,650</span></div>
          <div className="ds-rcard-kv"><span className="ds-rcard-k">YOB</span><span className="ds-rcard-v">2011</span></div>
        </div>
        <div className={"ds-rcard-more"} style={{ display: open ? "block" : "none", paddingTop: open ? 12 : 0, borderTop: open ? "1px dashed var(--border-default,#e2e8f0)" : "none" }}>
          <div className="ds-rcard-key">
            <div className="ds-rcard-kv"><span className="ds-rcard-k">Callsign</span><span className="ds-rcard-v">A8XY4</span></div>
            <div className="ds-rcard-kv"><span className="ds-rcard-k">MMSI</span><span className="ds-rcard-v">636019215</span></div>
            <div className="ds-rcard-kv"><span className="ds-rcard-k">DWT</span><span className="ds-rcard-v">49,999</span></div>
            <div className="ds-rcard-kv"><span className="ds-rcard-k">Last Seen</span><span className="ds-rcard-v">2 h ago</span></div>
          </div>
        </div>
        <button className="ds-rcard-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "Show less" : "Show more"}
          <span style={{ display: "inline-flex", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s ease" }}>
            <Icon d={I.chevronDown} size={13} />
          </span>
        </button>
      </article>
    </div>
  );
};
```

```jsx
<div className="subsection">
  <h3 className="subsection-title">Responsive tables &rarr; cards</h3>
  <p className="subsection-desc">
    A wide list table never becomes a horizontal scroller on a phone. Below 767px the
    table is swapped for a stacked card list — one card per row — with the 3–5 fields
    that drive decisions surfaced up front and the long tail behind a single
    <em> Show more</em> disclosure. Both markups ship; CSS picks the one to show.
  </p>
  <ResponsiveTableCardDemo />
  <p className="t-caption" style={{ marginTop: 8 }}>Live — toggle the disclosure.</p>
</div>
```

Bump `section-data-primitives.jsx?v=` and `styles.css?v=` in
`Skytek Design System.html`.

## 3. Prepend to `changelog-data.js`

```js
{
  version: "v2.4.0",
  dateISO: "2026-07-26T00:00:00Z",
  date: "26/07/2026",
  time: "00:00 UTC",
  category: "Pattern",
  updatedBy: "Claude",
  impact: "Minor",
  summary: "Added a Responsive data tables → cards pattern: wide list tables now collapse into a stacked card list on small screens instead of becoming horizontal scrollers, with the 3–5 decision-driving fields surfaced and the remainder behind a per-row Show more disclosure.",
  changes: [
    "New .ds-table-cards / .ds-rcard* CSS layer in styles.css: card shell, title + subline + badge header, 2-column label-over-value key grid, is-strong / is-muted / is-mono value tones, dashed-rule disclosure region and a 44px Show more toggle with rotating chevron.",
    "Breakpoint contract: .ds-table-scroll hides and .ds-table-cards shows at max-width 767px (860px for full-page asset tables); both markups always render so there is no second data path.",
    "Edit Columns (.ds-edit-columns) is hidden on mobile — cards define their own field order, so column toggles carry no meaning there.",
    "Card values wrap rather than truncate (overflow-wrap:anywhere); numeric values stay tabular-nums so stacked cards still align.",
    "Disclosure animates with a 220ms fade-and-rise (dsRcardIn) matching the accordion motion already used by the filter drawer.",
    "New 'Responsive tables → cards' subsection in the Data primitives chapter with a live card demo.",
    "Applied across the platform: Assets search (Marine, Property, Aviation, Offshore) and the 14-column policies table on Marine Portfolio Details."
  ],
  reason: "Horizontally scrolling a 14-column table on a phone hides most of the data behind a gesture users do not discover, and column-hiding controls just trade one loss for another. Re-projecting each row as a card keeps every field reachable, restores a real visual hierarchy at small sizes, and gives every list surface in the platform one consistent mobile behaviour.",
  affected: ["Data Primitives Pattern", "Assets Search", "Marine Portfolio Details", "Tokens / styles.css"]
},
```
