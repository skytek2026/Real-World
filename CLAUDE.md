# Skytek Design System — project notes

## Living Changelog (always keep current)

This project has a **living Changelog** (`Changelog.html`, data in `changelog-data.js`).

**Whenever you change ANY part of the design system in a turn — a component, pattern, token, documentation, accessibility rule, brand element, or asset — you MUST append a matching changelog entry** by adding a new object to the **top** of the `window.CHANGELOG_ENTRIES` array in `changelog-data.js`.

Rules:
- Use the **current date and time in UTC**. `date` is `DD/MM/YYYY`, `time` is 24-hour `HH:MM UTC`, `dateISO` is full ISO 8601 (used for sorting + the date filter).
- **Increment the version** from the previous (top) entry using semver: Breaking → MAJOR, Minor/new feature → MINOR, Patch/fix or Documentation Only → PATCH.
- `updatedBy` is `"Claude"`.
- `category` ∈ Component | Pattern | Token | Documentation | Accessibility | Brand | Asset | Other.
- `impact` ∈ Breaking | Minor | Patch | Documentation Only.
- Fill every field: `summary` (1–2 sentences), `changes` (array of specifics), `reason`, `affected` (array of component/page names).
- **Never edit or delete past entries** — the changelog is an immutable record. Only prepend.

The header comment in `changelog-data.js` documents the exact entry shape.

## Fonts
`--font-sans` → Inter (self-hosted), `--font-display` → Exo (self-hosted), `--font-mono` → JetBrains Mono (self-hosted). Keep tokens pointed at these families.

## Cache-busting
The main page loads `styles.css?v=N` and per-section `*.jsx?v=N`. When you edit a cached file, bump its `?v=` number in `Skytek Design System.html` so the user's browser refetches it.

## Prototype pages (Real World app) — always use the Skytek Design System

Every Real World page, and anything built to preview or present it, uses the **Skytek Design System**.
The source of truth is the organisation's **Skytek Design System** artifact (the default design system).
This repo's `styles.css` is an older copy of the tokens (e.g. brand `#0F4C75`, display font Inter) — where it
differs from the artifact, follow the artifact.

- **Brand ramp:** 050 `#eff6ff` · 100 `#dbeafe` · 300 `#bfdbfe` · 400 `#8ec5fd` · 500 `#51a2fc` · **600 `#2d7ffb`** (primary) · 700 `#1f5fc7`.
  Pages get this through the shared chrome's `sky` accent (`--brand-*`); don't hard-code other blues.
- **Neutrals:** the slate scale (`#F9FAFB` … `#111827`). **Status:** success `#16A34A`, warning `#D97706`, danger `#DC2626`, info `#2563EB`.
- **Type:** Inter (body), Exo (headings/display), JetBrains Mono (codes/IDs). Don't load or name other families.
- **Charts:** categorical palette `--chart-cat-1…8` = `#2d7ffb #D97706 #16A34A #9333EA #DB2777 #0891B2 #65A30D #475569`,
  in legend order; use cat-8 (neutral) for "Other/Unknown".
- **Dark mode:** follow the app's dark tokens (cards `#161f2e`, raised `#1e293b`, borders `#2a374d`, text `#e7ecf4`,
  metric strips `#15233c`). Style dark mode with classes/CSS, never by writing `element.style` (it re-serialises the
  inline style and breaks the shared chrome's `[style*=…]` dark remaps).
- **Tables on phones (≤767px):** show rows as cards that keep every column heading.
- After adding, removing or renaming files, rebuild the file map: `python3 tools/build_system_map.py`.

