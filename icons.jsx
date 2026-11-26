/* Shared inline icons (SVG paths) for the spec page demos */

const I = {
  search: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm10 2-4.35-4.35",
  plus:   "M12 5v14M5 12h14",
  filter: "M4 5h16M7 12h10M10 19h4",
  download: "M12 3v12m0 0 4-4m-4 4-4-4M4 21h16",
  chevron: "m6 9 6 6 6-6",
  chevronRight: "m9 6 6 6-6 6",
  chevronLeft:  "m15 6-6 6 6 6",
  check:  "M20 6 9 17l-5-5",
  x:      "M18 6 6 18M6 6l12 12",
  warn:   "M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z",
  info:   "M12 16v-4m0-4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  ship:   "M3 18s2-1 9-1 9 1 9 1M5 14l1.5-7h11L19 14M12 4v3M9 21v-3m6 3v-3",
  plane:  "M21 12 3 18l4-6-4-6 18 6Z",
  globe:  "M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z",
  bell:   "M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9m6 13a3 3 0 0 1-3-3h6a3 3 0 0 1-3 3Z",
  user:   "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.5l2.1-1.6-2-3.5-2.5 1a7.5 7.5 0 0 0-2.6-1.5L13.5 2h-3l-.4 2.4a7.5 7.5 0 0 0-2.6 1.5l-2.5-1-2 3.5 2.1 1.6a7.4 7.4 0 0 0 0 3l-2.1 1.6 2 3.5 2.5-1c.8.6 1.6 1.1 2.6 1.5L10.5 22h3l.4-2.4a7.5 7.5 0 0 0 2.6-1.5l2.5 1 2-3.5-2.1-1.6c.1-.5.1-1 .1-1.5Z",
  folder: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z",
  map:    "M9 5l-6 2v14l6-2 6 2 6-2V5l-6 2-6-2Zm0 0v14m6 0V7",
  bars:   "M3 12h18M3 6h18M3 18h18",
  trash:  "M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  edit:   "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z",
  calendar: "M3 9h18M3 5h18v16H3zM8 3v4m8-4v4",
  star:   "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2L7 14.2 2 9.3l6.9-1L12 2Z",
  trend:  "M3 17l6-6 4 4 8-8M14 7h7v7",
  alert:  "M12 8v5m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  arrowUp: "m12 5 7 7m-7-7-7 7m7-7v14",
  arrowDown: "m12 19 7-7m-7 7-7-7m7 7V5",
  sort: "m8 9 4-4 4 4M8 15l4 4 4-4",
  arrowRight: "M5 12h14m-7-7 7 7-7 7",
  more:   "M5 12h.01M12 12h.01M19 12h.01",
  eye:    "M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  flag:   "M4 21V4m0 0h12l-2 4 2 4H4",
};

const Icon = ({ d, size = 16, stroke = "currentColor", fill = "none", className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size} height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

window.I = I;
window.Icon = Icon;
