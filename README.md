# CARBONARA

A train router and network map for the P.E.S.T.O. Minecraft server. Pick a start and a
destination — or a whole chain of stops — and it finds the fastest route across the rail
network, then draws it on an interactive map.

**Live:** https://person314159.github.io/Carbonara

The network is worldwide and grows as the server does. Lines are either local or high-speed,
and segments that are mapped but not yet built are drawn dotted.

## Features

- **Routing** between any two stations, optimising for either journey time or number of
  transfers — the other criterion breaks ties, so a route is never needlessly worse on both
- **Multi-stop itineraries** — an ordered list of stops, routed leg by leg
- **Exclusions** — rule out specific lines or stations and re-route around them
- **Shareable links** — a route is fully determined by its search parameters, so the whole
  search round-trips through the URL
- **Interactive map** — pan and zoom, click a station to add or remove it from the journey,
  with an optional real-world satellite underlay

## Getting started

```bash
npm install
npm run dev        # http://localhost:8080/Carbonara
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on port 8080 (Turbopack) |
| `npm run build` | Static production export to `out/` |
| `npm run lint` | ESLint |
| `npm test` | Vitest — unit tests plus the data-validation suites |
| `npm run test:e2e` | Playwright end-to-end tests (starts or reuses the dev server) |

Note the `/Carbonara` path — `basePath` in [`next.config.ts`](next.config.ts) is set for
GitHub Pages, so the bare origin will 404.

A Husky pre-commit hook runs `lint`, `tsc --noEmit` and `npm test`. CI
([`.github/workflows/nextjs.yml`](.github/workflows/nextjs.yml)) runs the same checks and
deploys `main` to Pages. Neither runs the e2e suite — it is too slow for a commit hook, so run
it by hand before anything that touches the UI.

## How it fits together

```
src/app/
  lib/
    networkData.json     the routing graph — lines, stations, connections
    RMP.json             the drawn map — a Rail Map Painter save file
    routing/             Dijkstra (graph.ts) and map highlighting (mapHighlights.ts)
    shareLink.ts         search state <-> URL query
  components/
    map/                 zoom/pan viewport and the lazy-loaded SVG renderer
    routeResult/         the itinerary panel
    stationSelect/       station pickers, metric toggle, exclusions
  vendor/rmp/            reduced copy of the Rail Map Painter renderer — see its README
```

Routing is Dijkstra over a bi-criterion `[primary, secondary]` cost, where the chosen metric is
primary and the other is the tiebreaker. The graph and the map-highlight index are both built
once at module load, not per render.

### Two data files that must agree

[`networkData.json`](src/app/lib/networkData.json) is the logical graph — what connects to
what, and how long each segment takes. [`RMP.json`](src/app/lib/RMP.json) is the picture — a
[Rail Map Painter](https://railmapgen.github.io/rmp/) save holding the drawn geometry. The map
is static and never edited at runtime; station coordinates are read out of it at load.

They describe the same network in two different shapes, so they can drift apart silently: a
station renamed in one file still routes correctly but highlights nothing. `npm test` guards
against that, checking among other things that station names correspond one-to-one, that each
line's topology in the map is isomorphic to its connections in the graph, and that edge styles
match what the data implies (timed local, timed high-speed, or planned).

**Run `npm test` after editing either file.** A segment with no `time` is treated as planned
rather than built, and renders dotted.

## Licence

[GPL-3.0](LICENSE). [`src/app/vendor/rmp/`](src/app/vendor/rmp/) is a reduced copy of
[railmapgen/rmp](https://github.com/railmapgen/rmp) (also GPL-3.0) — see
[its README](src/app/vendor/rmp/README.md) for the base release and the list of local
modifications.