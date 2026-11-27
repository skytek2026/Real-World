/* ============================================================================
   Skytek Design System — Living Changelog data
   ----------------------------------------------------------------------------
   This file is the single source of truth for the Changelog page.

   APPEND PROTOCOL (read before editing):
   • Whenever ANY part of the design system changes — a component, pattern,
     token, doc, accessibility rule, brand element or asset — add a NEW entry
     object to the TOP of the CHANGELOG_ENTRIES array below.
   • Never edit or delete past entries. The changelog is an immutable record.
   • Fill every field. Use the current date/time in UTC.
   • Version numbers follow semver and increment from the previous entry:
        – Breaking            → bump MAJOR (x.0.0)
        – Minor (new feature) → bump MINOR (1.x.0)
        – Patch / fix         → bump PATCH (1.2.x)
        – Documentation Only  → bump PATCH
   • Category MUST be one of:
        Component | Pattern | Token | Documentation |
        Accessibility | Brand | Asset | Other
   • Impact MUST be one of:
        Breaking | Minor | Patch | Documentation Only

   Entry shape:
   {
     version:   "v1.2.3",
     dateISO:   "2026-06-15T14:32:00Z",   // used for sorting + date filter
     date:      "15/06/2026",             // DD/MM/YYYY (display)
     time:      "14:32 UTC",              // 24-hour (display)
     category:  "Component",
     updatedBy: "Claude",
     impact:    "Minor",
     summary:   "One or two sentence overview.",
     changes:   ["Specific change.", "Another specific change."],
     reason:    "Why the update was made.",
     affected:  ["Button Component", "Forms Pattern"]
   }
   ============================================================================ */

window.CHANGELOG_ENTRIES = [
  {
    "version": "v4.2.4",
    "dateISO": "2026-11-27T18:00:00Z",
    "date": "27/11/2026",
    "time": "18:00 UTC",
    "updatedBy": "Claude",
    "category": "Documentation",
    "impact": "Patch",
    "summary": "Documentation tidy-up: chapter numbering, links between component overviews and full specs, the local z-index rule, and the last browser-default margins.",
    "changes": [
      "Export & reports is chapter 16 (was 16a, with no 16). [DS9]",
      "Buttons and Inputs overviews (07 · Components) link to their full specifications (07a, 07b); each full spec names its overview, so the pair reads as overview + spec rather than duplication. [DS9]",
      "Z-index: local stacking (−1 to 60) is allowed only inside one component or the documentation chrome, never across components; Leaflet panes keep Leaflet’s own values. Stated in the Token index (--z-base) and on the z-index block in styles.css. [DS10]",
      "Margins: the Layout chapter’s mock ‘Dashboard’ heading and a Filters chapter paragraph no longer use browser em-based margins; Leaflet controls in map demos sit 12px from the edge (was Leaflet’s 10px). [DS12]",
      "Bundle rebuilt from the changed sources."
    ],
    "reason": "Close review items DS9, DS10 and DS12.",
    "affected": [
      "Documentation",
      "Token index",
      "Maps"
    ]
  },
  {
    "version": "v4.2.3",
    "dateISO": "2026-11-27T17:00:00Z",
    "date": "27/11/2026",
    "time": "17:00 UTC",
    "updatedBy": "Claude",
    "category": "Other",
    "impact": "Patch",
    "summary": "Generated copies brought up to date: component bundle rebuilt, manifest regenerated, Figma pages on the current stylesheet.",
    "changes": [
      "_ds_bundle.js rebuilt from the 35 current sources (was built at v4.1.0; changelog-data.js and section-buttons-deep.jsx had changed since). Runs with no errors. [DS4]",
      "_ds_manifest.json regenerated from styles.css: 242 tokens, 0 differences (--shadow-focus now the solid brand-600 ring); 18 components. [DS5]",
      "figma/*.html (7 pages) load styles.css?v=39 (was v=36). [DS6]"
    ],
    "reason": "Close review items DS4, DS5 and DS6.",
    "affected": [
      "Bundle",
      "Manifest",
      "Figma export"
    ]
  },
  {
    "version": "v4.2.2",
    "dateISO": "2026-11-27T16:00:00Z",
    "date": "27/11/2026",
    "time": "16:00 UTC",
    "updatedBy": "Claude",
    "category": "Token",
    "impact": "Patch",
    "summary": "tokens.css regenerated from tokens.json: the old sky brand, the dark-theme block and the pre-v4 type values are gone.",
    "changes": [
      "tokens.css was a pre-v4.0.0 snapshot: sky brand ramp (#2D7FFB …), sky text-link and chart colours, a dark-theme block, Open Sans / Lato stacks and ratio line heights.",
      "Regenerated in the page's own format from tokens.json: 180 tokens (colour, shadow, spacing, radius, z-index), the font families, woff2 @font-face rules and the type classes; one Light theme.",
      "Verified: no sky values; all 139 colour tokens resolve to the same colours as styles.css. Component previews (which load tokens.css) now show the azure brand.",
      "Closes review item DS2."
    ],
    "reason": "The page only rebuilds tokens.css after a token edit in the page; the stale file still carried the retired sky brand.",
    "affected": [
      "Tokens",
      "Component previews"
    ]
  },
  {
    "version": "v4.2.1",
    "dateISO": "2026-11-27T15:00:00Z",
    "date": "27/11/2026",
    "time": "15:00 UTC",
    "updatedBy": "Claude",
    "category": "Component",
    "impact": "Patch",
    "summary": "Modal primary action follows the v4.2.0 primary fill (brand-500, hover brand-600); review items F1 and F2 confirmed closed.",
    "changes": [
      "--rw-modal-primary: brand-700 → brand-500; --rw-modal-primary-hover: brand-800 → brand-600 (same as .ds-btn--primary).",
      "F1 (modal on tokens): title 16 / 600, --scrim 0.38, --card-shadow-modal, --shadow-focus, --radius-lg and --z-modal confirmed; Real World’s product modals (modal-base.css, report builder, side drawers) aligned in commit to follow.",
      "F2 (undefined tokens): 0 references to undefined tokens in styles.css and rw-modal.css."
    ],
    "reason": "Keep the modal’s primary button identical to the system’s primary button after v4.2.0.",
    "affected": [
      "Modal"
    ]
  },
  {
    "version": "v4.2.0",
    "dateISO": "2026-11-27T13:00:00Z",
    "date": "27/11/2026",
    "time": "13:00 UTC",
    "updatedBy": "Claude",
    "category": "Color",
    "impact": "Minor",
    "summary": "Selected and primary fills use brand-500 (#1A92D1) instead of brand-700, by product decision. Known accessibility exception: white text on brand-500 is 3.46:1.",
    "changes": [
      "Primary button: rest brand-500, hover brand-600, pressed brand-700 (was brand-700 / 800 / 800).",
      "Selected fills on brand-500: tab pill, sidebar selected item, pagination current page, vessel-popup header, token filter pill, current step, date-picker range ends.",
      "Unchanged: text links stay brand-700; focus rings and non-text marks stay brand-600.",
      "Known exception, deliberate: white 13–14px labels on brand-500 are 3.46:1, below WCAG AA (4.5:1). This reverses the v4.1.0–v4.1.2 contrast fix for fills; flagged in the brand-500 usage note so it is not 'fixed' back by mistake.",
      "Real World applies the same change (commit 119bb9d)."
    ],
    "reason": "Product decision: a lighter selected and primary blue across tabs, buttons and navigation.",
    "affected": [
      "Buttons",
      "Tabs",
      "Sidebar",
      "Pagination",
      "Date & time pickers",
      "Steps",
      "Color"
    ]
  },
  {
    "version": "v4.1.2",
    "dateISO": "2026-11-27T11:00:00Z",
    "date": "27/11/2026",
    "time": "11:00 UTC",
    "updatedBy": "Claude",
    "category": "Component",
    "impact": "Patch",
    "summary": "Selected states share one fill: the sidebar's selected item now matches the selected tab (brand-700, white text), and every white-on-brand fill uses brand-700.",
    "changes": [
      "Sidebar: `.ds-sidebar-item.is-active` is a filled brand-700 item with white 600 text (was a brand-050 tint with brand-600 text, 3.87:1), the same fill as `.ds-tab-pill`, matching the Real World navigation.",
      "White text on brand fills moved from brand-600 (4.05:1) to brand-700 (5.85:1): pagination current page, vessel-popup header, token filter pill, current step number, date-picker range ends.",
      "Documentation navigation: selected link text brand-700 on its tint (was brand-600).",
      "Non-text brand marks (checked checkbox / radio, switch, pulse and today dots) stay brand-600 (3:1 is enough for non-text)."
    ],
    "reason": "The product's sidebar (brand-600) and the tabs (brand-700) showed two different selected blues; brand-600 behind white text fails WCAG AA.",
    "affected": [
      "Sidebar",
      "Tabs",
      "Pagination",
      "Date & time pickers",
      "Steps",
      "Token index"
    ]
  },
  {
    "version": "v4.1.1",
    "dateISO": "2026-11-27T10:00:00Z",
    "date": "27/11/2026",
    "time": "10:00 UTC",
    "updatedBy": "Claude",
    "category": "Accessibility",
    "impact": "Patch",
    "summary": "Pill tabs: the selected pill uses brand-700 so its white label passes AA (5.85:1; brand-600 was 4.05:1).",
    "changes": [
      "`.ds-tab-pill` background: --brand-600 → --brand-700 (found while checking the Real World dashboards against v4.1.0).",
      "Real World applies the same change through its shared chrome (commit 5533d43)."
    ],
    "reason": "White 14px / 600 labels on brand-600 fail WCAG AA; v4.1.0 fixed primary buttons but missed the tab pill.",
    "affected": [
      "Tabs"
    ]
  },
  {
    "version": "v4.1.0",
    "dateISO": "2026-11-26T22:30:00Z",
    "date": "26/11/2026",
    "time": "22:30 UTC",
    "updatedBy": "Claude",
    "category": "Accessibility",
    "impact": "Minor",
    "summary": "Fixes from the v4.0.3 consistency review: contrast at token level, one stylesheet source for values, a complete Token index, a tokenised modal, map glyph tokens, single woff2 fonts, and regenerated bundle, manifest and Figma export.",
    "changes": [
      "Primary buttons rest on brand-700 (white 5.85:1) and darken to brand-800 on hover / press (was brand-600 → lighter brand-500). [D2]",
      "One solid focus ring, --shadow-focus: 2px white gap + 2px brand-600 (was a 32% wash of the old navy #2E86C0, 1.48:1); --shadow-focus-danger for invalid / destructive; the modal uses both. [D3]",
      "New --border-control (slate-500, 4.83:1) for input, select, checkbox and radio boundaries; --bg-muted → slate-050 (muted text 4.63:1); ratings B and D take dark text; unverif-700 → #57534E (6.31:1); completed steps on success-700. [D4]",
      "Accessibility chapter: 24px minimum (2.5.8, AA), 44px on touch (2.5.5, AAA); ds-btn--lg (40px) extends its hit area on touch. [D5]",
      "Type classes use the documented pixel line heights (display 40, h1 32, h2 28, h3 24, h4 20, body 20, body-sm 18). [B1] 11px is allowed only for uppercase overlines and badges. [B2] Open Sans and Lato removed from the stacks. [B4]",
      "Fonts: one source per family, self-hosted woff2 (2.31 MB → 0.94 MB) with TTF fallback; Google Fonts and the page's base64 Exo removed. [B5]",
      "Shadows: --shadow-xs has its own value; the Foundations table reads live values from styles.css. [C1] Spacing: 401 values now use var(--space-*). [C2] Motion: drawer and toast durations and the modal easing use the motion tokens. [C4]",
      "Layering docs: overlay, popover, toast and tooltip order corrected. [C3] Tokens consolidated into one :root block. [G2] The Token index adds any uncatalogued token from styles.css: 287 of 287. [G1]",
      "Colour chapter intro updated; info sharing the brand's blue family, rating D and chart categories 2–3 documented as deliberate exceptions. [A3, A4, A5] slate-50 renamed slate-050 (old name kept as an alias); event and chart values reference ramp tokens. [A6, A7]",
      "Footer reads the current version from the changelog; the Changelog page shows the logo. [G3] docs/index.html redirect fixed. [H6] --danger-600 / --success-600 references fixed. [F2] Leftover dark rule removed. [N5]",
      "Modal: title 16px / 600 (as H3), shared --scrim (0.38, also used by the filter drawer), --card-shadow-modal, brand-700 / 800 primary. [F1]",
      "Map glyph palette and shadows are tokens (--glyph-amber / cyan / pink / orange, --glyph-shadow*, --glyph-ring, --glyph-cluster-shadow) with the Real World values. [N2] Tab pill shadow tokenised.",
      "Regenerated: _ds_bundle.js from current sources (35 files, 0 errors; dark-mode chapter dropped), _ds_manifest.json (240 tokens, 18 components), the Figma export (type, spacing, radius, shadows from tokens; styles.css?v current). [H1, H2, H5, B3] tokens.json updated to match. [N1]",
      "The two token proposals are recorded in PROPOSALS.md as not adopted, with their conflicts and the v5.0.0 decision. [N3]"
    ],
    "reason": "Close the findings of the 26 Nov consistency review.",
    "affected": [
      "Buttons",
      "Inputs & forms",
      "Focus",
      "Modal",
      "Typography",
      "Fonts",
      "Shadows",
      "Spacing",
      "Motion",
      "Token index",
      "Maps",
      "Figma export",
      "Bundle",
      "Manifest"
    ]
  },
  {
    "version": "v4.0.3",
    "dateISO": "2026-11-26T19:30:00Z",
    "date": "26/11/2026",
    "time": "19:30 UTC",
    "updatedBy": "Claude",
    "category": "Component",
    "impact": "Patch",
    "summary": "Every component and chapter now uses the system's own tokens for colour, type, spacing, radius and fonts. An audit of all 35 chapters went from 9,378 off-token values to only the documented exceptions.",
    "changes": [
      "Spacing: component and chapter padding, margins and gaps snapped to the 4px grid (379 values, incl. React style numbers; ties round up for padding, down for gaps / margins). Browser defaults the components relied on are reset: button padding (date-picker cells, map buttons, chip close, filter-tree toggle) and checkbox / radio margins.",
      "Toast: --toast-pad-x 14px -> 16px (right 16, left 16 + 4px tone bar).",
      "Type: font sizes onto the type scale (82 values: 11.5 -> 12, 10.5 / 10 / 9 -> 11, 13.5 -> 14 …); keyboard keys use --font-mono; map demo buttons inherit Inter (were Arial).",
      "Radii: 3px / 5px / 7px / 10px / 14px onto the radius scale (11 values; checkboxes, legend swatches).",
      "Colour: code-block toolbars and the modal use the system slates (#e5e7eb, #111827, #6b7280; were Tailwind slates); pressed Primary / Destructive in the Buttons spec use brand-800 / danger-800 (were #0B3A5A / #9F1F1F); leftover sky alpha -> azure; unstyled links use text-link (were browser blue); section rules use border-default.",
      "Modal: --rw-modal-radius -> --radius-lg, control radius -> --radius-md, z-index -> --z-modal (were 12px, 6px, 9999); its guideline note updated.",
      "Density chapter: demo and token matrix now match the component CSS (compact rows 8px, sidebar 8 / 4px) and name the right tokens (16px = --space-4, 12px = --space-3).",
      "Documented exceptions (unchanged): map chapter marker colours and shadows (they specify the Real World map glyphs), the macOS window dots in mock-ups, the export chapter's paper miniature, the phone mock-up bezel, and the tab pill shadow (the component's own style)."
    ],
    "reason": "Components must use the design system's own tokens; an audit found widespread off-grid spacing, off-scale type and radii, browser-default styles and a few non-token colours.",
    "affected": [
      "All Components",
      "Buttons",
      "Toast",
      "Modal",
      "Date & time pickers",
      "Filter drawer",
      "Density",
      "Code blocks"
    ]
  },
  {
    "version": "v4.0.2",
    "dateISO": "2026-11-26T17:45:00Z",
    "date": "26/11/2026",
    "time": "17:45 UTC",
    "updatedBy": "Claude",
    "category": "Accessibility",
    "impact": "Patch",
    "summary": "Real World platform layout and type migration: 4px spacing grid, a 12px type floor, the new radius scale, consolidated fonts and touch targets that meet WCAG 2.2 AA. Design-system tokens unchanged.",
    "changes": [
      "Spacing: every padding, margin and gap snapped to the 4px grid (2,559 values and 302 Tailwind half steps; ties round up for padding, down for gaps and margins).",
      "Type: nothing below 12px (1,546 runs, some at 7px); 13px and 12.5px data figures moved to 14px; font weight 800 mapped to 700; text-xs line-height 16px -> 18px (1.5).",
      "Radii: 2px -> 4px and 6px -> 8px; rounded-sm / md / 3xl classes moved onto the scale.",
      "Fonts: one request per page, Exo and Inter at 400-700 (the unused 800 weight dropped).",
      "Touch devices: form fields at 16px (no iOS Safari zoom); controls under 44x44 get an invisible 44x44 tap area without moving the layout; checkboxes and radios at least 24px; selects at least 44px tall.",
      "Measured on 43 pages at 390px touch: tap targets under 24px 253 -> 0, under 44px 1,756 -> 79; form fields under 16px 97 -> 0; text under 12px 1,546 -> 6.",
      "Not yet done (decision pending): raising remaining 12px text to 14px, Exo on all card titles, and renaming the design-system spacing / radius tokens (would be v5.0.0).",
      "Source: skytek2026/Real-World commit 4d81e6a; token package skytek-layout-system (layout-tokens.json, layout.css, layout.ts)."
    ],
    "reason": "Apply the layout and type audit: off-grid spacing, text below legibility, iOS input zoom and undersized touch targets across the platform.",
    "affected": [
      "Real World platform",
      "Spacing",
      "Typography",
      "Radius",
      "Touch targets",
      "Accessibility"
    ]
  },
  {
    "version": "v4.0.1",
    "dateISO": "2026-11-26T15:30:00Z",
    "date": "26/11/2026",
    "time": "15:30 UTC",
    "updatedBy": "Claude",
    "category": "Other",
    "impact": "Patch",
    "summary": "Real World platform aligned to v4.0.0: one theme (Light, azure brand), no theme selector and no dark mode. Design-system tokens unchanged.",
    "changes": [
      "Profile page: the Theme selector (Light / Sky / Dark) is removed; the header's dark-mode toggle is removed.",
      "Every user gets the Light theme with the azure brand ramp (brand-600 #1485c5); a previously stored Dark or Sky choice is reset to Light.",
      "The design-system canvas (bg-canvas #F5F7FA) and Exo headings now apply on every page.",
      "Platform conformance pass: the old sky brand (#2d7ffb and its tints) replaced by the azure ramp on every page; font sizes and corner radii moved onto the design-system scales; Leaflet map controls use Inter.",
      "Fix: the header's profile menu, broken by the toggle removal, restored.",
      "Source: skytek2026/Real-World commits e63ea74 and b4bf7cc."
    ],
    "reason": "Bring the Real World platform in line with design system v4.0.0 (single brand scheme, no dark mode) until themes are introduced.",
    "affected": [
      "Real World platform",
      "Brand",
      "Dark mode",
      "Typography",
      "Radius"
    ]
  },
  {
    "version": "v4.0.0",
    "dateISO": "2026-11-26T12:00:00Z",
    "date": "26/11/2026",
    "time": "12:00 UTC",
    "updatedBy": "Claude",
    "category": "Token",
    "impact": "Breaking",
    "summary": "The azure ramp (formerly 'Brand · Light theme') is now the only brand colour scheme, and the dark theme is removed so developers work with one Light theme.",
    "changes": [
      "Brand: brand-050 … brand-800 are the azure ramp (#eff8fd … #0d5580), adding brand-200 and brand-800; the sky ramp (#2d7ffb …) and the separate --azure-* scale are removed.",
      "text-link now uses brand-700 (#0f6aa0, 5.85:1 on white); brand-500 fails as text on white (3.46:1).",
      "Contrast note: white on brand-600 (#1485c5) is 4.05:1, AA for large text and UI only; noted on brand-600 and text-on-brand.",
      "Chart palette follows the brand: chart-cat-1 = brand-600; the sequential ramp chart-seq-1 … 7 = brand-050, 100, 200, 300, 400, 600, 800.",
      "Dark theme removed: tokens.json has one Light theme (26 colour and the shadow dark values dropped); styles.css loses its [data-theme=\"dark\"] rules and the theme toggle; the Dark mode chapter, its navigation entry and the sidebar toggle are removed.",
      "Docs updated: Color foundations (one Brand scale, semantic table with one value column), Token index, Code view (Token / Value / Note), Elevation usage, Hand-off, Popover, Tooltips, the README and six component guidelines."
    ],
    "reason": "Simplify the design system for developers: one brand scheme (the Real World platform's azure) as the default until other themes are introduced, and no dark theme to maintain.",
    "affected": [
      "Color Foundations",
      "Brand",
      "Tokens",
      "Dark mode",
      "Code view",
      "All Components"
    ]
  },
  {
    version: "v3.6.2",
    dateISO: "2026-11-25T09:48:00Z",
    date: "25/11/2026",
    time: "09:48 UTC",
    updatedBy: "Claude",
    category: "Documentation",
    impact: "Documentation Only",
    summary: "Finished setting up the design system in the standard Design System format: a token file, a brand-book README, a cover and 17 component cards, built from the current styles.css without changing it.",
    changes: [
      "New tokens.json: 131 colours with light and dark values, 12 type styles, spacing, radius, 7 shadows and z-index, each with a usage note; failing contrast pairs are noted on their tokens.",
      "New tokens.css generated from tokens.json; styles.css stays the stylesheet the specification loads, unchanged.",
      "README rewritten as a brand book (principles, voice, colour, type, space, motion, icons, logo, components); the migration notes section was removed and 'Keeping the preview in sync' kept as written.",
      "New component cards with live previews and guidelines: Button, Input, Badge, Alert, Card, MetricStrip, Table, Tabs, Pagination, Skeleton, EmptyState, Modal, Toast, Tooltip, Popover, FilterDrawer, DatePicker; plus a cover.",
      "Removed the migration's records (manifest.json and migration-map.json)."
    ],
    reason: "The migrated system had editing off, no tokens and no component cards, so tools building slides or designs from it could not read its values.",
    affected: ["Design system setup", "README", "Tokens", "Component cards"]
  },
  {
    version: "v3.6.1",
    dateISO: "2026-11-13T16:12:00Z",
    date: "13/11/2026",
    time: "16:12 UTC",
    updatedBy: "Claude",
    category: "Documentation",
    impact: "Documentation Only",
    summary: "Documented how the published preview of the design system is kept in sync with this system.",
    changes: [
      "README: new 'Keeping the preview in sync' section naming this system (X7ZFac…) as the source of truth and the published preview (16mvJy…) that must always match it.",
      "Steps: change here first with a changelog entry, bump ?v= on every page that loads a changed file, save with the index last, rebuild and republish the preview, check its changelog.",
      "Records how the preview is built (pre-compiled JSX, jsDelivr instead of unpkg, built-in styles, flags and changelog) and its known limits on hosted pages."
    ],
    reason: "The preview is a copy of this system and must stay identical to it; writing the procedure into the README means any future session that works on the design system follows it.",
    affected: ["README", "Published preview", "Changelog"]
  },
  {
    version: "v3.6.0",
    dateISO: "2026-11-13T15:37:00Z",
    date: "13/11/2026",
    time: "15:37 UTC",
    updatedBy: "Claude",
    category: "Pattern",
    impact: "Minor",
    summary: "Added Grouped options to the Filter drawer: a section type for two-level vocabularies, with main options and sub-options and tri-state (partly selected) parent checkboxes.",
    changes: [
      "Filter drawer · Section types: new 'Grouped' type; its All row stands in for the Reset / Unselect all toolbar.",
      "New part 06 'Grouped options detail' with a live demo and rules: structure, tri-state parents (input.indeterminate, derived from children), toggling a parent, collapse chevron, selection model, live apply and reset, accessibility.",
      "Selection model: store the excluded sub-options, so nothing excluded means unfiltered and options that appear later arrive checked; keeps the unfiltered / subset / none model.",
      "New .ds-fdrawer-tree-* classes in styles.css (rows, tri-state checkboxes, sunken sub-panel on --bg-muted, sub-option names in --text-link, swatch, collapse toggle), light and dark through existing tokens; reduced motion respected.",
      "Later parts of the chapter renumbered 07–13."
    ],
    reason: "Hierarchical filters (region groups → regions) shipped on the Real World Regions map had no documented pattern; documenting it keeps future grouped filters consistent across products.",
    affected: ["Filter drawer", "Section types", "styles.css"]
  },
  {
    version: "v3.5.0",
    dateISO: "2026-10-30T10:08:00Z",
    date: "30/10/2026",
    time: "10:08 UTC",
    updatedBy: "Claude",
    category: "Documentation",
    impact: "Minor",
    summary: "Added a Developer · Code view chapter so developers can browse and copy the source behind the spec and the design tokens as CSS.",
    changes: [
      "New 'Developer' group in the sidebar with a 'Code view' chapter (17).",
      "Source files tab: filterable file list (page, styles, vanilla JS components, JSX sections, data), syntax-highlighted viewer, Copy file and Open raw.",
      "Tokens as CSS tab: every :root token from styles.css with light and dark values, swatches and notes; copy :root, the dark theme, or both; click a token to copy var(--name).",
      "Files are read live from the page, so the view never drifts from what is shipped."
    ],
    reason: "Give designers and developers one place: the interactive spec for design, plus the code behind it for engineering.",
    affected: ["Code view", "Sidebar navigation", "Engineering handoff"]
  },
  {
    version: "v3.4.0",
    dateISO: "2026-10-09T14:38:00Z",
    date: "09/10/2026",
    time: "14:38 UTC",
    updatedBy: "Claude",
    category: "Token",
    impact: "Minor",
    summary: "Added the Real World platform's Light theme blues (the 'azure' ramp, 050–800) to the Color foundations.",
    changes: [
      "New 'Brand · Light theme (Real World platform)' scale in Foundations › Color with nine swatches: 050 #eff8fd, 100 #dceffb, 200 #b8ddf5, 300 #84c5ec, 400 #43a8df, 500 #1a92d1, 600 #1485c5, 700 #0f6aa0, 800 #0d5580.",
      "Documented as --azure-* primitives; the platform writes these to --brand-* when the Light theme is active.",
      "Caption notes the source (skytek2026/Real-World shared/chrome.js, THEME_ACCENT.light → azure) and step usage."
    ],
    reason: "Bring the Light theme palette used in the Real World platform into the design system so designers can reference it.",
    affected: ["Color foundations", "Brand tokens"]
  },
  {
    version: "v3.3.3",
    dateISO: "2026-10-08T12:00:00Z",
    date: "08/10/2026",
    time: "12:00 UTC",
    updatedBy: "Claude",
    category: "Brand",
    impact: "Patch",
    summary: "Replaced the placeholder 'S' brand mark in the documentation sidebar with the official Skytek landscape logo, with a dedicated dark-mode variant.",
    changes: [
      "Added assets/skytek-logo.png (trimmed, 600px wide) from the supplied landscape colour logo.",
      "Added assets/skytek-logo-dark.png: navy wordmark and tagline recoloured to white for legibility on dark surfaces; blue squares unchanged.",
      "Sidebar brand block now stacks: logo on top, 'Design System' + version and the Light/Dark toggle on the row below.",
      "Logo swaps automatically with [data-theme=\"dark\"]; max width 168px."
    ],
    reason: "Use the official brand logo in the documentation chrome instead of a placeholder mark, legible in both themes.",
    affected: ["Sidebar navigation", "Theme toggle", "Brand assets"]
  },
  {
    version: "v3.3.2",
    dateISO: "2026-09-21T22:10:00Z",
    date: "21/09/2026",
    time: "22:10 UTC",
    category: "Documentation",
    updatedBy: "Claude",
    impact: "Patch",
    summary: "Reconciled the Filter drawer chapter with the shipped Drawer primitive. The filter drawer is a composed story of Drawer, not a standalone component as the spec previously implied.",
    changes: [
      "Replaced the invented standalone FilterDrawer API (sections / value / onChange / title / width props) with the real composition: Drawer, DrawerTrigger, DrawerContent, DrawerClose, DrawerHeader, DrawerBody, DrawerFooter, DrawerTitle, DrawerDescription on @base-ui/react.",
      "Documented the Drawer props the pattern relies on: open / onOpenChange / defaultOpen, modal (backdrop + scroll-lock + focus-trap) and showClose (header ✕), plus the DrawerClose wrapper that gives Done its close behaviour.",
      "Recorded that DrawerFooter is a consumer-provided slot with no default close, so the Reset / Done pair is this pattern's contribution rather than a Drawer default.",
      "Changed the footer from two equal-width flex:1 buttons to justify-between (Reset left, Done right), matching the shipped Filters story.",
      "Added a note on the tension between live apply and modal: the scroll-lock means the filtered table cannot be scrolled while the drawer is open, which is an accepted trade and not a reason to disable modal.",
      "Kept the three-state list model and FilterSection types as the pattern's own state contract, explicitly separate from the presentation-only Drawer.",
      "New 'Spec vs. current build' subsection recording four divergences: footer layout, standalone-vs-composed framing, the 360px token against Drawer's 400/560/720 width scale, and the optional DrawerDescription slot.",
      "Renumbered the subsequent subsections."
    ],
    reason: "The documented API did not match what developers import; it described a component that does not exist. Teams following it would have built a second drawer implementation in parallel with the shared primitive.",
    affected: ["Filter drawer", "styles.css"]
  },
  {
    version: "v3.3.1",
    dateISO: "2026-09-21T21:30:00Z",
    date: "21/09/2026",
    time: "21:30 UTC",
    category: "Documentation",
    updatedBy: "Claude",
    impact: "Patch",
    summary: "Reconciled the Tooltip chapter's developer API with the shipped Base UI component, which uses a compound export pattern and different prop names than the spec previously documented.",
    changes: [
      "Replaced the invented single-element API (label / placement / delayIn / delayOut / kbd / hideArrow) with the real compound API: Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, built on @base-ui/react.",
      "Corrected prop names and defaults to match the build: side (default bottom, was documented as placement defaulting to top), sideOffset (6), delay / closeDelay (0 / 0) on TooltipTrigger, open / onOpenChange on Tooltip.",
      "Documented the align prop (start / center / end), which was missing entirely from the spec.",
      "Added a full prop table listing each prop, which slot it belongs on, its type and default.",
      "Added worked examples for every documented story: basic, placement, rich content, per-trigger delay, controlled mode and the disabled-trigger wrapper.",
      "Noted that Base UI collision handling is enabled by default, so side is a preference rather than a guarantee.",
      "New 'Spec vs. current build' subsection recording four open divergences: no arrow rendered, 6px vs 8px offset, 0/0 vs 400/100 default delay, and fade+zoom vs fade+travel enter motion.",
      "Renumbered the subsequent subsections and updated the placement guidance to lead with bottom."
    ],
    reason: "The documented API did not match what developers actually import. Prop names, defaults and the component shape were all different, so the code samples could not be copied into a real project, and the align prop was undocumented.",
    affected: ["Tooltips"]
  },
  {
    version: "v3.3.0",
    dateISO: "2026-09-21T15:30:00Z",
    date: "21/09/2026",
    time: "15:30 UTC",
    category: "Component",
    updatedBy: "Claude",
    impact: "Minor",
    summary: "Added a Filter drawer chapter documenting the right-edge filtering sheet shipped on Assets Search, and built .ds-fdrawer as a tokenized component with single-open accordion sections and live-apply behaviour.",
    changes: [
      "New 'Filter drawer' section (07h): anatomy, accordion behaviour, live apply, section types (list / range / category), range-slider detail, trigger & responsive behaviour, React API, accessibility, edge cases, do's & don'ts, and a token table.",
      "Live working demo built on the real .ds-fdrawer CSS — accordion, checkbox lists, range section, active dots, disabled Reset states, ESC and scrim dismissal.",
      "New .ds-fdrawer component: -scrim, -panel, -head, -close, -body, -section (+.is-open), -acc-head, -acc-chev, -sec-title, -dot, -acc-body, -acts, -act, -list, -item, -foot.",
      "Added filter-drawer tokens: --fdrawer-width (360px), -max-width, -scrim, -shadow, -pad-x, -head-pad, -slide, -slide-ease, -scrim-motion, -acc-motion, -list-max, plus --z-drawer (1080).",
      "Documented the three-state list model (unfiltered / subset / explicitly-none) that the implementation encodes with an FNONE sentinel — an empty set cannot distinguish 'all' from 'none'.",
      "Documented the live-apply cycle including the scroll-position restore, page-1 reset, and the rule that the dismiss button is 'Done', never 'Apply'.",
      "Recorded the range-slider contract: bounds derived per tab, dual stacked inputs, clamp on input / commit on change, full-range deletes the filter, and repaint-on-expand.",
      "Source colours mapped onto semantic tokens so the drawer themes in dark mode; the source implementation hard-codes #fff, #f1f5f9 and #64748b."
    ],
    reason: "The filter drawer is the canonical filtering surface on Assets Search and the pattern for any dense data view, but existed only as page-local CSS and JS with no spec. Teams rebuilding it were missing the non-obvious rules — single-open accordion, live apply, the three-state selection model and the scroll-restore.",
    affected: ["Filter drawer", "Overlays", "styles.css", "Skytek Design System.html"]
  },
  {
    version: "v3.2.0",
    dateISO: "2026-09-21T14:40:00Z",
    date: "21/09/2026",
    time: "14:40 UTC",
    category: "Component",
    updatedBy: "Claude",
    impact: "Minor",
    summary: "Promoted Popovers out of the shared Overlays block into their own chapter with a full developer specification, and built .ds-popover as a real tokenized component with head/body/foot regions, a menu variant, placements, arrow and enter/exit motion.",
    changes: [
      "New 'Popovers' section (07g): anatomy, variants & sizes, placement & collision, the focus and dismissal model, React API, raw markup/CSS contract, accessibility, surface-selection guidance, edge cases, do's & don'ts, and a token table.",
      "Live click-to-open demos (filter form, row-action menu, info, confirm, four placements) built on the real .ds-popover CSS, with outside-click, ESC, focus-in and focus-return implemented.",
      "New .ds-popover component: --sm/--md/--lg/--auto widths, four placement classes with a border-matched arrow, data-state fade + 4px travel + 0.98 scale, .ds-popover-head/-title/-desc/-close/-body/-foot (+--split), .ds-popover-menu/-item (+--danger)/-sep, and .ds-popover-anchor.",
      "Added popover tokens: --popover-bg/-border/-radius/-shadow/-pad/-gap/-width-sm/-md/-lg/-max-height/-arrow/-offset/-motion/-ease, plus --z-popover (1050, above page, below modal).",
      "Documented the non-modal contract explicitly: aria-modal=\"false\", no focus trap, no inert background, focus returns to trigger — plus the disabled auto-apply rule for form popovers.",
      "Replaced the old inline hard-coded popover mock in Overlays (white background, fixed px offsets) which did not theme in dark mode.",
      "Overlays block retitled 'Modals & Drawers' and now cross-links to both the Tooltip and Popover chapters."
    ],
    reason: "Popovers existed only as a hard-coded inline mock inside Overlays with no API, focus model, placement rules or accessibility guidance — and the mock's hard-coded white background broke in dark mode. Developers needed an implementable contract and a clear boundary against tooltips, modals and drawers.",
    affected: ["Popovers", "Overlays", "Tooltips", "styles.css", "Skytek Design System.html"]
  },
  {
    version: "v3.1.0",
    dateISO: "2026-09-21T11:20:00Z",
    date: "21/09/2026",
    time: "11:20 UTC",
    category: "Component",
    updatedBy: "Claude",
    impact: "Minor",
    summary: "Promoted Tooltips out of the shared Overlays block into their own chapter with a full developer specification, and rebuilt .ds-tooltip as a tokenized component with placements, an arrow, rich/kbd variants and enter/exit motion.",
    changes: [
      "New 'Tooltips' section (07f) covering anatomy, placement & collision behaviour, timing and the delay group, the React API, the raw markup/CSS contract, accessibility, surface-selection guidance, edge cases, do's & don'ts, and a token table.",
      "Live hover/focus demos built on the real .ds-tooltip CSS so docs and component cannot drift.",
      "Rebuilt .ds-tooltip: four placement classes with a rotated-square arrow, data-state driven fade + 4px travel, .ds-tooltip--rich (title + body), .ds-tooltip--no-arrow, .ds-tooltip-kbd shortcut chip and .ds-tooltip-anchor wrapper.",
      "Added tooltip tokens: --tooltip-bg/-fg/-max-width/-radius/-pad-y/-pad-x/-font-size/-arrow/-offset/-shadow/-delay-in/-delay-out/-motion/-ease, plus --z-tooltip (1300, above modal and toast).",
      "Tooltip now themes correctly in dark mode — the inverse surface flips light, so the label flips to --text-inverse; previously it hard-coded slate-900/white.",
      "Documented WCAG 2.2 1.4.13 requirements (dismissible, hoverable, persistent) and the disabled-trigger wrapper pattern.",
      "Overlays block retitled 'Modals, Drawers, Popovers' and now cross-links to the tooltip chapter.",
      "Fixed a stale Toast lead that still described a top-center region; toasts are bottom-right."
    ],
    reason: "Tooltips were a single preview tile inside Overlays with no API, timing, placement or accessibility guidance, and the CSS hard-coded its colours so it broke in dark mode. Developers needed an implementable contract.",
    affected: ["Tooltips", "Overlays", "Toast & snackbar", "styles.css", "Skytek Design System.html"]
  },
  {
    version: "v3.0.0",
    dateISO: "2026-09-11T00:00:00Z",
    date: "11/09/2026",
    time: "00:00 UTC",
    category: "Component",
    updatedBy: "Claude",
    impact: "Breaking",
    summary: "Rebuilt the Toast / Snackbar component to match Sonner (shadcn/ui), the implementation our developers ship, and moved the region from top-center to bottom-right. Visual styling is unchanged; placement, stacking and motion are new.",
    changes: [
      "Anchor moved from fixed top-center to fixed bottom-right (--toast-inset from the bottom and right edges).",
      "Sonner stacking model: toasts are absolutely positioned on a shared anchor and offset by transform. Collapsed by default — newest is the front toast at full scale, older ones peek above it offset by --toast-stack-offset (14px) and scaled down --toast-stack-scale (0.05) per step.",
      "Expand on hover/focus: the stack expands to real measured heights (via ResizeObserver) with --toast-gap between toasts, and pauses every countdown in the stack rather than just the hovered toast.",
      "Swipe to dismiss: drag right or down past --toast-swipe-thresh (45px) to commit; short of it the toast springs back. The 24px × close button is retained so dismissal never depends on the gesture.",
      "Motion replaced keyframe animations with state-driven transitions so interrupted animations retarget instead of restarting. Enter rises from translateY(100%) over --toast-anim (400ms) on Sonner's spring cubic-bezier(.21,1.02,.73,1); exit drops and fades over --toast-anim-exit (200ms) on cubic-bezier(.06,.71,.55,1).",
      "New tokens: --toast-stack-offset, --toast-stack-scale, --toast-swipe-thresh, --toast-anim, --toast-anim-exit, --toast-ease-spring, --toast-ease-exit.",
      "New state contract on each toast: data-mounted, data-removed, data-swiping, data-swipe-out, data-visible, data-front, plus --y / --scale / --sx / --sy offsets.",
      "Added .ds-toast--static for documentation/anatomy figures that render outside the stack.",
      "Docs: new 'Developer setup · Sonner' section with the exact <Toaster> props and class-name map, a new 'Motion' spec table, and rewritten Placement & stacking, Live behavior, Tokens and Accessibility content.",
      "Mobile: below 640px the region spans the bottom gutter-to-gutter instead of the top.",
      "MIGRATION — placement: toasts now appear bottom-right. Any product that reserved space or positioned UI around a top-center toast needs a visual QA pass; views with a fixed bottom action bar should raise --toast-inset above that bar.",
      "MIGRATION — removed the .ds-toast.is-entering / .is-leaving classes and the @keyframes ds-toast-in / ds-toast-out. Style enter/exit via the data-mounted / data-removed attributes instead.",
      "MIGRATION — .ds-toast is now position:absolute within .ds-toast-region. Rendering one outside the region (docs, tests) requires the new .ds-toast--static class.",
      "Not breaking: the toast() / useToast() API, tone names, durations and all existing visual tokens are unchanged."
    ],
    reason: "Developers are building the Toast with Sonner via shadcn/ui, so the design system had to describe the component they actually ship rather than a divergent in-house spec. Bottom-right is the Sonner default and keeps confirmations clear of the top-left primary navigation.",
    affected: ["Toast", "Snackbar", "styles.css", "section-toast.jsx"]
  },
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
      "Breakpoint contract: .ds-table-scroll hides and .ds-table-cards shows at max-width 767px (860px for full-page asset tables via .ds-table-cards--wide); both markups always render so there is no second data path.",
      "Edit Columns (.ds-edit-columns) is hidden on mobile — cards define their own field order, so column toggles carry no meaning there.",
      "Card values wrap rather than truncate (overflow-wrap:anywhere); numeric values stay tabular-nums so stacked cards still align.",
      "Disclosure animates with a 220ms fade-and-rise (dsRcardIn) matching the accordion motion already used by the filter drawer; honours prefers-reduced-motion.",
      "Built entirely on semantic tokens, so the pattern themes correctly in both light and dark; the toggle gets a standard focus ring.",
      "New 'Responsive tables → cards' subsection in the Filters, search & bulk actions chapter with a live card demo, anatomy breakdown, rule table and markup sample.",
      "Applied across the platform: Assets search (Marine, Property, Aviation, Offshore) and the 14-column policies table on Marine Portfolio Details."
    ],
    reason: "Horizontally scrolling a 14-column table on a phone hides most of the data behind a gesture users do not discover, and column-hiding controls just trade one loss for another. Re-projecting each row as a card keeps every field reachable, restores a real visual hierarchy at small sizes, and gives every list surface in the platform one consistent mobile behaviour.",
    affected: ["Data Primitives Pattern", "Assets Search", "Marine Portfolio Details", "Tokens / styles.css"]
  },
  {
    version: "v2.3.0",
    dateISO: "2026-07-06T10:00:00Z",
    date: "06/07/2026",
    time: "10:00 UTC",
    category: "Token",
    updatedBy: "Claude",
    impact: "Minor",
    summary: "Added a full Dark Mode theme built on the existing semantic tokens, a live sidebar Light/Dark toggle that flips the entire spec in place, and a new Dark mode foundations chapter. No components were duplicated — Light and Dark are documented side by side throughout.",
    changes: [
      "New [data-theme=\"dark\"] token layer in styles.css: re-points all semantic surface/border/text tokens, elevation shadows and the focus ring. Primitives (brand/slate/status hues + --white) stay fixed.",
      "Added --white-fixed primitive for true-white foregrounds on colored fills, so surfaces can theme without breaking on-brand text.",
      "Dark surface ramp derived from the slate scale: bg-app #0B1220 → surface #121A2A → raised #1B2536; text primary #F3F4F6, secondary #9CA3AF, muted #828C9C (all ≥ AA).",
      "Large-area status tints (-050) go dark; small status chips (-100) stay light so they pop. Neutral surface primitives (slate-50/100/150/200) re-point in dark so legacy inline previews flip too.",
      "Live theme toggle in the sidebar (role=switch), persisted to localStorage['skytek-theme'] and applied pre-paint to prevent a light flash; first visit follows prefers-color-scheme. Added to the Changelog page too.",
      "New 'Dark mode' foundations chapter: principles, theme architecture, semantic token Light/Dark tables, primitive-vs-semantic, dark elevation, icons & imagery, WCAG AA contrast table, and do's & don'ts.",
      "Color chapter's semantic token table now shows Light and Dark values side by side.",
      "Updated the Handoff dark-mode code sample from a 'future' note to the shipped implementation."
    ],
    reason: "Operators run long, dim-room and night shifts; a first-class dark theme reduces glare while preserving identical information hierarchy, density and meaning. Building on semantic tokens means every current and future component supports both themes with no duplication.",
    affected: ["Foundations / Dark mode", "Foundations / Color", "Handoff", "styles.css", "Skytek Design System.html", "Changelog", "Theme architecture"]
  },
  {
    version: "v2.2.1",
    dateISO: "2026-06-26T13:10:00Z",
    date: "26/06/2026",
    time: "13:10 UTC",
    category: "Documentation",
    updatedBy: "Claude",
    impact: "Patch",
    summary: "Fixed the sidebar version label, which was hardcoded to 'v1.0' and never reflected the actual design system version.",
    changes: [
      "Bound the sidebar 'Design System' label to the latest changelog entry's version instead of a static 'v1.0' string."
    ],
    reason: "The navigation showed a stale 'v1.0' regardless of the real version, making it impossible to tell which version was in view.",
    affected: ["Skytek Design System.html", "Sidebar navigation"]
  },
  {
    version: "v2.2.0",
    dateISO: "2026-06-26T12:50:00Z",
    date: "26/06/2026",
    time: "12:50 UTC",
    category: "Token",
    updatedBy: "Claude",
    impact: "Minor",
    summary: "Added a themed, cross-browser scrollbar treatment — a 6px thin bar with a brand-blue thumb on a light-grey track — applied to the page root and any .ds-scroll / [data-scroll] container, plus a documented Scrollbars subsection under Motion.",
    changes: [
      "New scrollbar tokens: --scrollbar-size (6px), --scrollbar-track (--slate-100), --scrollbar-thumb (--brand-500), --scrollbar-thumb-hover (--brand-600).",
      "Firefox support via scrollbar-width:thin + scrollbar-color; WebKit/Blink support via ::-webkit-scrollbar rules honoring the exact 6px width.",
      "Opt-in .ds-scroll class and [data-scroll] attribute for inner scroll containers (tables, panels, popovers).",
      "Added a Scrollbars subsection to the Motion foundations page with a live demo, token table, code sample, and a 'don't hide scrollbars' rule."
    ],
    reason: "Default OS scrollbars looked foreign inside dense data regions; a consistent themed bar ties scroll affordances to the product and matches the requested visual (theme thumb, light-grey track, 6px).",
    affected: ["Foundations / Motion", "styles.css", "Scrollbars"]
  },
  {
    version: "v2.1.5",
    dateISO: "2026-06-25T00:05:00Z",
    date: "25/06/2026",
    time: "00:05 UTC",
    category: "Documentation",
    updatedBy: "Claude",
    impact: "Documentation Only",
    summary: "Added an Upload icon to the Icon Inventory canonical alias map.",
    changes: [
      "Added the 'upload' alias (Lucide Upload) for import-data / attach-file / upload-report actions, placed alphabetically."
    ],
    reason: "The inventory had a download glyph but no matching upload glyph for import flows.",
    affected: ["Icon Inventory", "Iconography"]
  },
  {
    version: "v2.1.4",
    dateISO: "2026-06-25T00:00:00Z",
    date: "25/06/2026",
    time: "00:00 UTC",
    category: "Documentation",
    updatedBy: "Claude",
    impact: "Documentation Only",
    summary: "Added a Download icon to the Icon Inventory canonical alias map and sorted the entire list alphabetically by alias.",
    changes: [
      "Added the 'download' alias (Lucide Download) for export / save-file / download-report actions.",
      "Reordered all canonical alias entries to be alphabetical by alias for easier scanning."
    ],
    reason: "The inventory lacked a download glyph and its previous arbitrary order made specific aliases hard to find.",
    affected: ["Icon Inventory", "Iconography"]
  },
  {
    version: "v2.1.3",
    dateISO: "2026-06-17T09:30:00Z",
    date: "17/06/2026",
    time: "09:30 UTC",
    category: "Token",
    updatedBy: "Claude",
    impact: "Patch",
    summary: "Replaced the badges' hard-coded rgba border colors with new tokenized status-border tokens.",
    changes: [
      "Introduced --border-info, --border-success, --border-warning and --border-danger, each derived from its status-500 color via color-mix at low alpha.",
      "Repointed the info, success, warning and danger badge borders from raw rgba(...) values to the new tokens.",
      "Documented the four tokens in the Color section and the Token index."
    ],
    reason: "Badge borders used custom rgba literals instead of system colors; tokenizing them keeps the borders consistent and themeable.",
    affected: ["Badges & Status", "Design Tokens", "Token index", "Color"]
  },
  {
    version: "v2.1.2",
    dateISO: "2026-06-15T16:55:00Z",
    date: "15/06/2026",
    time: "16:55 UTC",
    category: "Documentation",
    updatedBy: "Claude",
    impact: "Documentation Only",
    summary: "Synced the Color section with the Token index so every documented color token now has a swatch.",
    changes: [
      "Added missing palette swatches: --brand-700, --slate-150, --success-050, --warning-050, --danger-800, --danger-050 and --info-050.",
      "Added the missing semantic tokens --bg-raised and --text-inverse to the semantic surface/border/text list.",
      "No new tokens were created — all already existed in styles.css; they were simply not shown in the Color section."
    ],
    reason: "The Color section was missing colors that the Token index already documented, leaving the two references inconsistent.",
    affected: ["Color", "Token index"]
  },
  {
    version: "v2.1.1",
    dateISO: "2026-06-15T16:20:00Z",
    date: "15/06/2026",
    time: "16:20 UTC",
    category: "Documentation",
    updatedBy: "Claude",
    impact: "Documentation Only",
    summary: "Added rem values alongside the existing pixel values in the Typography and Spacing sections.",
    changes: [
      "Typography specimens now list size/line-height in both px and rem (e.g. 32px / 40px and 2rem / 2.5rem), assuming a 16px root.",
      "The Spacing scale now shows each step in both px and rem (e.g. 16px · 1rem).",
      "Pixel values are unchanged — rem is shown as an additional reference."
    ],
    reason: "Give engineers the rem equivalents for relative sizing without losing the pixel values the team designs in.",
    affected: ["Typography", "Spacing"]
  },
  {
    version: "v2.1.0",
    dateISO: "2026-06-15T15:40:00Z",
    date: "15/06/2026",
    time: "15:40 UTC",
    category: "Component",
    updatedBy: "Claude",
    impact: "Minor",
    summary: "Flattened secondary and icon-only buttons, removed all hard-coded button colors, and gave every button variant a pressed (active) state.",
    changes: [
      "Removed the drop shadow from .ds-btn--secondary and .ds-btn--icon.",
      "Replaced the hard-coded #1f5fc7 in the primary active state with a new --brand-700 token (also fixed the same literal in the Buttons full-spec demo and token table).",
      "Switched the danger button's text from the `white` keyword to var(--white).",
      "Added :active (pressed) states to the danger and link variants — every variant now has one.",
      "Added --brand-700 (#1f5fc7) and --danger-800 (#991B1B) to the color tokens and the Token index."
    ],
    reason: "Flatten low-emphasis buttons for a calmer surface, keep every button color fully tokenized (no raw hex), and give all variants consistent press feedback.",
    affected: ["Buttons", "Buttons — full spec", "Design Tokens", "Token index"]
  },
  {
    version: "v2.0.0",
    dateISO: "2026-06-15T15:10:00Z",
    date: "15/06/2026",
    time: "15:10 UTC",
    category: "Token",
    updatedBy: "Claude",
    impact: "Breaking",
    summary: "Removed the 2px spacing step (--space-1) and renumbered the entire spacing scale down by one into a contiguous 4-pt scale.",
    changes: [
      "Removed --space-1 (2px) from the spacing scale.",
      "Renumbered every remaining step down by one: --space-2→--space-1, --space-3→--space-2, … --space-10→--space-9, --space-12→--space-10, --space-16→--space-11.",
      "Repointed internal usages so visual spacing is unchanged (the density .gap-density rule now uses --space-4 / --space-3).",
      "Updated the Spacing foundations section and the Token index to match the new numbering."
    ],
    reason: "The 2px step was too fine to be useful and encouraged off-grid hairline spacing; collapsing it yields a cleaner, contiguous scale aligned to the 4-pt grid.",
    affected: ["Spacing", "Design Tokens", "Token index", "Density"]
  },
  {
    version: "v1.3.0",
    dateISO: "2026-06-15T14:32:00Z",
    date: "15/06/2026",
    time: "14:32 UTC",
    category: "Documentation",
    updatedBy: "Claude",
    impact: "Minor",
    summary: "Added a living Changelog page that records every change made to the design system.",
    changes: [
      "Created a dedicated Changelog page with reverse-chronological timeline of entries.",
      "Added search across all fields plus filters for date range, category, version and impact level.",
      "Established an append protocol so every future change auto-records a dated, versioned entry.",
      "Linked the Changelog from the main specification navigation."
    ],
    reason: "Give the team a single, auditable record of how the system evolves over time and make change history discoverable.",
    affected: ["Documentation", "Navigation"]
  },
  {
    version: "v1.2.1",
    dateISO: "2026-06-15T09:05:00Z",
    date: "15/06/2026",
    time: "09:05 UTC",
    category: "Component",
    updatedBy: "Claude",
    impact: "Patch",
    summary: "Fixed the Card footer so its background follows the card's rounded bottom corners.",
    changes: [
      "Rounded the bottom-left and bottom-right corners of .ds-card-foot to match --radius-lg.",
      "Added overflow: hidden to .ds-card so footer fills clip cleanly to the card shape.",
      "Verified box-shadows are unaffected since they render outside the box."
    ],
    reason: "The footer's slate background was poking past the card's rounded corners with small square nubs.",
    affected: ["Cards", "Card Footer"]
  },
  {
    version: "v1.2.0",
    dateISO: "2026-06-14T11:30:00Z",
    date: "14/06/2026",
    time: "11:30 UTC",
    category: "Component",
    updatedBy: "Claude",
    impact: "Minor",
    summary: "Defined Card footers in the design system, including footers with action buttons.",
    changes: [
      "Added .ds-card-foot with --start and --between alignment modifiers.",
      "Locked all card-footer buttons to ghost (tertiary) style in ALL CAPS via CSS.",
      "Documented the rule in the Cards component spec and demonstrated all three footer patterns."
    ],
    reason: "Card footers were used but undocumented; footer actions needed a consistent low-emphasis treatment.",
    affected: ["Cards", "Card Footer", "Buttons"]
  },
  {
    version: "v1.1.4",
    dateISO: "2026-06-13T16:10:00Z",
    date: "13/06/2026",
    time: "16:10 UTC",
    category: "Asset",
    updatedBy: "Claude",
    impact: "Patch",
    summary: "Updated two icon names in the iconography inventory to their canonical Lucide names.",
    changes: [
      "Renamed AlertTriangle to TriangleAlert.",
      "Renamed HelpCircle to CircleHelp."
    ],
    reason: "Lucide deprecated the old names; aligning the inventory with current Lucide avoids confusion in handoff.",
    affected: ["Iconography"]
  },
  {
    version: "v1.1.3",
    dateISO: "2026-06-13T15:45:00Z",
    date: "13/06/2026",
    time: "15:45 UTC",
    category: "Component",
    updatedBy: "Claude",
    impact: "Patch",
    summary: "Iconography inventory now renders icons from the live Lucide library instead of a partial shim.",
    changes: [
      "Loaded lucide@0.469.0 and rendered each inventory entry from its real glyph node.",
      "Removed the generic 'tag' fallback that affected roughly half the inventory.",
      "Updated the caption to reflect that icons render from the live library."
    ],
    reason: "About 22 of 44 icons fell back to an identical generic glyph because the offline shim only defined ~20 icons.",
    affected: ["Iconography"]
  },
  {
    version: "v1.1.2",
    dateISO: "2026-06-12T10:20:00Z",
    date: "12/06/2026",
    time: "10:20 UTC",
    category: "Documentation",
    updatedBy: "Claude",
    impact: "Documentation Only",
    summary: "Corrected typography documentation to show Exo as the display and heading typeface.",
    changes: [
      "Updated Display and H1–H4 specimen labels from Inter to Exo.",
      "Revised the Typography section intro to read: Exo for display & headings, Inter for body & UI, JetBrains Mono for codes."
    ],
    reason: "The specimens use var(--font-display) which resolves to Exo, but were mislabelled as Inter.",
    affected: ["Typography"]
  },
  {
    version: "v1.1.1",
    dateISO: "2026-06-09T11:02:00Z",
    date: "09/06/2026",
    time: "11:02 UTC",
    category: "Brand",
    updatedBy: "Claude",
    impact: "Patch",
    summary: "Self-hosted JetBrains Mono from uploaded font files.",
    changes: [
      "Added @font-face rules for JetBrains Mono (upright + italic, variable weight).",
      "Pointed --font-mono at the self-hosted family."
    ],
    reason: "Replace CDN delivery with self-hosted brand fonts for reliability and offline rendering.",
    affected: ["Typography", "Design Tokens"]
  },
  {
    version: "v1.1.0",
    dateISO: "2026-06-09T09:14:00Z",
    date: "09/06/2026",
    time: "09:14 UTC",
    category: "Brand",
    updatedBy: "Claude",
    impact: "Minor",
    summary: "Self-hosted the Inter typeface from uploaded font files.",
    changes: [
      "Added @font-face rules for Inter (upright + italic, variable weight/optical size).",
      "Switched the --font-sans family over from the CDN stylesheet to the self-hosted files."
    ],
    reason: "Self-host brand fonts to guarantee consistent rendering independent of external CDNs.",
    affected: ["Typography", "Design Tokens"]
  },
  {
    version: "v1.0.0",
    dateISO: "2026-04-28T09:00:00Z",
    date: "28/04/2026",
    time: "09:00 UTC",
    category: "Other",
    updatedBy: "Claude",
    impact: "Minor",
    summary: "Initial release of the Skytek Design System specification.",
    changes: [
      "Published foundations: color, typography, spacing, radius, elevation, iconography, density, motion and the token index.",
      "Published the component system, patterns, domain primitives and engineering handoff chapters."
    ],
    reason: "Establish the canonical reference for everything visual and interactive in the Skytek React app.",
    affected: ["Foundations", "Components", "Patterns", "Domain primitives", "Handoff"]
  }
];
