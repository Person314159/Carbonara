# Vendored Rail Map Painter renderer

This directory is a reduced copy of [Rail Map Painter](https://github.com/railmapgen/rmp)
(`railmapgen/rmp`), used to render [`RMP.json`](../../lib/RMP.json) with the same code that
produced it. It is not a dependency — RMP ships as an application, not as a consumable
rendering library, so the render path is copied in and the editor is left behind.

## Provenance

| | |
|---|---|
| Upstream | https://github.com/railmapgen/rmp |
| Base release | **`rmp-6.0.15`** (tagged 2026-08-08) for everything under `components/svgs/`; **`rmp-6.0.12`** (tagged 2026-07-07) for the rest |
| Copied in | `c6c9d7d`, 2026-07-12, then a whole-catalogue port of the drawing components on 2026-08-24 — itself following an older base first vendored in `53e777a`, 2025-03-25 |
| Upstream path | files map 1:1 onto upstream `src/` (e.g. `util/parallel.ts` ⇒ `src/util/parallel.ts`) |
| Licence | GPL-3.0, same as this project — see [`LICENSE`](../../../../LICENSE) |

The older base is recorded as 6.0.12 but is only pinned to the range **6.0.4–6.0.12**.
Content places it at 6.0.4 or later (`util/edge-path-attrs.ts` does not exist upstream before
6.0.4, and `process-elements.ts`, `edge-path-attrs.ts` and `reconcile.ts` all match their
post-6.0.4 form); the resync date caps it at 6.0.12, the newest release available on
2026-07-12. Within that range the only vendored file upstream changed is `svg-layer.tsx`
(at 6.0.10), and the local copy is rewritten far enough that it cannot date the copy.

## What was kept

Everything upstream can draw, and nothing it uses to edit:

- `components/svg-layer.tsx`, `svg-wrapper.tsx` — element layering and graph loading
- `components/svgs/` — the whole catalogue: **40 station types, 35 line styles, 27 misc nodes**
  and 5 path generators, each reduced to its render half

  Three types are deliberately absent, because each needs infrastructure that only exists
  inside the editor: **`master`** (user-defined SVG templates, which live in the editor's
  template manager), **`image`** (bitmaps, which live in the editor's IndexedDB store, not in
  the save), and **`i18n-text`** (whose text comes from the i18n runtime). A save using one of
  them falls back to the "unknown node" renderer rather than failing.

  Line style choice is still load-bearing for this project even though every style now
  resolves: `single-color`, `bjsubway-tram` and `bjsubway-dotted` carry the
  timed-LSR / timed-HSR / planned distinction, and `rmpDataValidation.test.ts` asserts that
  each edge uses the style its `networkData` connection implies.
- `util/` — path resolution and geometry, plus `static-graph.ts` (local, see below)
- `constants/` — the type/attribute definitions the above need

Everything else upstream — the editor UI, panels, redux store, undo, i18n, save migration and
translation tooling — was dropped.

## How the drawing components were ported

The 96 files under `components/svgs/` were transformed mechanically rather than by hand, by a
script kept out of the repo (`tmp/port/`). It is worth knowing what it did, because the same
rules have to hold for anything added by hand later:

- imports of `@chakra-ui/react`, `@railmapgen/rmg-components`, `react-i18next`,
  `react-icons/md`, the redux store, the page-header modals, `theme-button`,
  `station-name-translate-button`, `use-draggable-station-name` and `util/hooks` are dropped,
  and named imports left unused afterwards are pruned;
- each file's attribute panel (anything mentioning `AttrsProps` or `RmgFieldsField`) and its
  palette icon (the 24×24 `<svg>`) are removed, along with any declaration left unreferenced
  once they are gone;
- `handlePointerDown/Move/Up`, the `React.useCallback` wrappers around them, the JSX props they
  feed, `cursor: "move"`, and the `useDraggableStationName` drag preview are stripped;
- the registry object at the foot of each file keeps only `component`, `preComponent`,
  `postComponent` and `defaultAttrs` — `icon`, `attrsComponent` and `metadata` describe the
  editor's palette, not the drawing;
- relative imports become `@/app/vendor/rmp/…`, and `NameLayout` is re-pointed at
  `constants/stations.ts`, which now declares it.

Five components needed a repair the rules could not express, each recorded in the script's
patch table: `nodes/fill.tsx` reads the graph from `util/static-graph.ts` instead of
`window.graph` and the editor's refresh counter; `nodes/text.tsx` drops the runtime font load,
which `globals.css` covers here; `stations/gzmtr-int.tsx` takes the light value of what was a
Chakra colour-mode lookup; `nodes/gzmtr-line-badge.tsx` and `stations/osaka-metro.tsx` cast
around this copy's widened `Theme`.

The same table carries one change of appearance rather than of plumbing. Every station in this
save is a `suzhourt-basic` whose primary name is English, and upstream sets that name in the
`zh` stack — SimHei and PingFang, system fonts that render differently on every machine and
that the offline label placement pass has no file to measure. It is set in `jreast_ja`
(M PLUS 2) here instead, the face the Tokyo types use and this project ships, and carries
`rmp-name-outline` so the same `globals.css` rule paints it that gives the Tokyo names their
white. That rule now matches a `text` wearing the class as well as one inside an element that
does, because `MultilineText` spreads a `className` onto each `text` it emits. The secondary
name keeps upstream's `en` and its grey.

## Local modifications

Per GPL-3.0 §5(a): the files here are modified from their upstream form. All changes date from
`c6c9d7d` (2026-07-12) onward unless noted, plus a repo-wide Prettier reformat in `14f25e2`
(2026-05-07) and import-path rewrites to `@/app/vendor/rmp/…` throughout.

**Rewritten or heavily reduced** — do not resync these by copying; port changes by hand:

`components/svg-wrapper.tsx` (renders highlights instead of editor state), `util/save.ts`,
`util/static-graph.ts` (local, has no upstream counterpart: it builds the saved graph once at
module load, where upstream keeps a live one on `window.graph`), `util/fonts.ts` (style table
only — the faces are declared in [`globals.css`](../../globals.css), so the `rmgRuntime` loader
is gone), `components/panels/details/{color,interchange}-field.tsx`,
`components/svgs/nodes/{facilities,virtual}.tsx`, and `constants/{constants,lines,nodes,stations}.ts`
— whose enums and attribute interfaces are generated from upstream minus the three absent
types, while the "core types" half below the marker is this copy's own.

`components/svg-layer.tsx` also carries a behavioural change: it wraps each station and node in
`<g id transform="translate(x, y)">`, which is what upstream does. The earlier copy had the two
Tokyo components translate themselves instead; the catalogue port made the upstream contract
the cheaper one, so the four hand-written components (`tokyo-metro-*`, `london-tube-*`) and
`nodes/{virtual,facilities}.tsx` had their own translate removed to match.

**Modified** — the editor half stripped as described above:

Everything under `components/svgs/`, `components/svgs/common/*`, `util/reconcile.ts`,
`util/bezier-parallel.ts`, `util/path.ts`.

`components/svgs/stations/{tokyo-metro,london-tube}-*.tsx` and the two registries
(`stations.ts`, `misc-nodes.ts`, `lines.ts`) were written by hand before the catalogue port and
kept. In the London pair, beyond the usual stripping: `AccessibleIcon` loses the invisible
`stn_core_` hit target and with it its `id` prop; the interchange circle loses `width`/`height`,
which SVG ignores on a `circle`; and the share track index and line colour are read through
`Number()`/`String()`, because this copy widens `Theme` to `string[]` for saves whose palette
entries are plain strings. Like the Tokyo pair, they ignore `preciseNameOffsets` — nothing in
the save sets it.

**Near-verbatim** — logic unchanged, safe to resync directly:

`util/geometry.ts`, `util/parallel.ts`, `util/auto-simple.ts`, `util/process-elements.ts`,
`util/edge-path-attrs.ts`, `util/pathRounding.js`, `util/color.ts`, `util/open-path-*.ts`,
`util/generate-closed-path.ts`, `util/graph-find-shortest-closed-path.ts`,
`util/bezier-outline-sides.ts`, `constants/path.ts`.

## Fonts and dependencies

The catalogue draws in faces this project did not previously ship. `src/app/fonts/` now also
holds `Railway-PlyE.otf` (Johnston substitute, OFL), `LTAIdentity-Medium.ttf`,
`Roboto-Bold.ttf` and `TaipeiSansTCBeta-Regular.ttf`, each registered by an `@font-face` rule
in `globals.css` and attributed in `util/fonts.ts` as upstream attributes them. The GZMTR and
Foshan station types draw from `@railmapgen/svg-assets`, which is a runtime dependency for
that reason.

## Resyncing

1. `git -C <rmp clone> diff rmp-6.0.15 rmp-<new> -- src/util src/constants src/components/svgs src/components/svg-layer.tsx src/components/svg-wrapper.tsx`
   to see whether anything vendored here changed at all.
2. Apply changes to the *near-verbatim* files directly; hand-port anything landing in a
   modified or rewritten file. For a wide change under `components/svgs/`, re-running the port
   script is cheaper than hand-porting, but check the patch table still applies.
3. Update **Base release** and **Copied in** above, and re-check the modification lists.
4. Run `npm test` — the RMP/`networkData` cross-validation will catch a render path that
   stops agreeing with the routing graph.
