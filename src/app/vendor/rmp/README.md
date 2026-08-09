# Vendored Rail Map Painter renderer

This directory is a reduced copy of [Rail Map Painter](https://github.com/railmapgen/rmp)
(`railmapgen/rmp`), used to render [`RMP.json`](../../lib/RMP.json) with the same code that
produced it. It is not a dependency — RMP ships as an application, not as a consumable
rendering library, so the render path is copied in and the editor is left behind.

## Provenance

| | |
|---|---|
| Upstream | https://github.com/railmapgen/rmp |
| Base release | **`rmp-6.0.12`** (tagged 2026-07-07) |
| Copied in | `c6c9d7d`, 2026-07-12 — a wholesale resync of an older base first vendored in `53e777a`, 2025-03-25 |
| Upstream path | files map 1:1 onto upstream `src/` (e.g. `util/parallel.ts` ⇒ `src/util/parallel.ts`) |
| Licence | GPL-3.0, same as this project — see [`LICENSE`](../../../../LICENSE) |

The base release is recorded as 6.0.12 but is only pinned to the range **6.0.4–6.0.12**.
Content places it at 6.0.4 or later (`util/edge-path-attrs.ts` does not exist upstream before
6.0.4, and `process-elements.ts`, `edge-path-attrs.ts` and `reconcile.ts` all match their
post-6.0.4 form); the resync date caps it at 6.0.12, the newest release available on
2026-07-12. Within that range the only vendored file upstream changed is `svg-layer.tsx`
(at 6.0.10), and the local copy is rewritten far enough that it cannot date the copy.

## What was kept

Only what is needed to turn a saved graph into an SVG:

- `components/svg-layer.tsx`, `svg-wrapper.tsx` — element layering and graph loading
- `components/svgs/` — 2 station types (`tokyo-metro-basic`, `tokyo-metro-int`), the virtual
  and facility nodes, 5 path generators, 3 line styles

  The three surviving line styles are load-bearing, not a leftover preference: `single-color`,
  `bjsubway-tram` and `bjsubway-dotted` carry the timed-LSR / timed-HSR / planned distinction,
  and `rmpDataValidation.test.ts` asserts that each edge uses the style its `networkData`
  connection implies. Other styles were trialled and dropped; don't substitute one on a resync.
- `util/` — path resolution (`process-elements`, `parallel`, `reconcile`, `auto-simple`,
  `bezier-parallel`, `path`, `pathRounding`, `geometry`, `edge-path-attrs`)
- `constants/` — the type/attribute definitions the above need

Everything else upstream — the editor UI, panels, redux store, undo, i18n, save migration,
translation tooling, and the ~40 line styles and dozens of station types this network does not
use — was dropped. `constants/`, `stations.ts` and `misc-nodes.ts` are correspondingly reduced
to just the registered types, which is why they diverge most from upstream.

## Local modifications

Per GPL-3.0 §5(a): the files below are modified from their upstream form. All changes date from
`c6c9d7d` (2026-07-12) onward unless noted, plus a repo-wide Prettier reformat in `14f25e2`
(2026-05-07) and import-path rewrites to `@/app/vendor/rmp/…` throughout.

**Rewritten or heavily reduced** — do not resync these by copying; port changes by hand:

`components/svg-wrapper.tsx` (loads `RMP.json` once at module load, resolves `staticElements`,
renders highlights instead of editor state), `util/save.ts`, `components/svgs/stations/stations.ts`,
`components/svgs/nodes/misc-nodes.ts`, `components/svgs/lines/lines.ts`,
`components/panels/details/{color,interchange}-field.tsx`, `components/svgs/nodes/{facilities,virtual}.tsx`,
`util/fonts.ts`, and all four files under `constants/`.

**Modified** — selection, visibility, interaction handlers and editor-only attributes stripped:

`components/svg-layer.tsx`, the five `components/svgs/lines/paths/*`, the three
`components/svgs/lines/styles/*`, both `components/svgs/stations/tokyo-metro-*.tsx`,
`components/svgs/common/*`, `util/reconcile.ts`, `util/bezier-parallel.ts`, `util/path.ts`.

**Near-verbatim** — logic unchanged, safe to resync directly:

`util/geometry.ts`, `util/parallel.ts`, `util/auto-simple.ts`, `util/process-elements.ts`,
`util/edge-path-attrs.ts`, `util/pathRounding.js`.

## Resyncing

1. `git -C <rmp clone> diff rmp-6.0.12 rmp-<new> -- src/util src/constants src/components/svgs src/components/svg-layer.tsx src/components/svg-wrapper.tsx`
   to see whether anything vendored here changed at all. Most releases touch nothing.
2. Apply changes to the *near-verbatim* files directly; hand-port anything landing in a
   modified or rewritten file.
3. Update **Base release** and **Copied in** above, and re-check the modification lists.
4. Run `npm test` — the RMP/`networkData` cross-validation will catch a render path that
   stops agreeing with the routing graph.
