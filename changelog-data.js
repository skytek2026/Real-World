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
    version: "v2.0.1",
    dateISO: "2026-10-29T11:49:00Z",
    date: "29/10/2026",
    time: "11:49 UTC",
    category: "Token",
    updatedBy: "Claude",
    impact: "Patch",
    summary: "Removed the unused Open Sans fallback from --font-sans; the body stack is now Inter with system fallbacks.",
    changes: [
      "--font-sans: \"Inter\", \"Open Sans\", system-ui, … → \"Inter\", system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif (styles.css, design-ref/styles.css and the _ds export).",
      "Token Index: --font-sans value updated to \"Inter · system-ui\".",
      "Design system manifests (_ds_manifest.json) updated to the new --font-sans value.",
      "Cache-busting: styles.css?v=17 and section-token-index.jsx?v=3 in Skytek Design System.html; styles.css?v=15 in the print view; styles.css?v=16 and changelog-data.js?v=3 in Changelog.html."
    ],
    reason: "Open Sans is no longer loaded anywhere in the product, so the fallback could never be used. Removing it keeps the token aligned with the type system (Exo / Inter / JetBrains Mono).",
    affected: ["Typography tokens (--font-sans)", "Token Index", "Skytek Design System", "Changelog"]
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
