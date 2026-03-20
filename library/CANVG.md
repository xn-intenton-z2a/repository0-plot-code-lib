CANVG

Table of contents

- Quick summary
- Technical extract (core API and usage patterns)
- Node integration (canvas + raster export)
- Options and runtime behaviour (animations, event handling)
- Supplementary details (implementation notes and constraints)
- Reference details (API signatures, parameter lists, return types)
- Troubleshooting and best practices
- Detailed digest (source excerpt + retrieval date)
- Attribution and crawl data

Quick summary

canvg is a JavaScript SVG parser and renderer that draws SVG content to an HTML5 Canvas. It can be used in browsers and in Node (when a Canvas implementation such as node-canvas is available) to rasterize SVG to PNG or to animate SVG on a canvas.

Technical extract (core API and usage patterns)

- Import: "import { Canvg } from 'canvg'".
- Create instance from a CanvasRenderingContext2D and an SVG source using an asynchronous factory.
  - Typical flow: obtain a 2D context, call Canvg.from(ctx, source) which returns a Canvg instance, then use the instance methods to render.
- Two common render modes:
  - Static render: await the instance render method to rasterize current SVG state to the canvas and stop.
  - Interactive/animated: call start() to begin animation loop and stop() to end it; start is used when the SVG contains animations or requires event handling.
- Source forms supported: URL string (remote or local), SVG string, or DOM/SVG elements (see API docs).

Node integration (canvas + raster export)

- Use a Node Canvas implementation (node-canvas) to create a canvas and 2D context in Node.
- Flow for raster export to PNG (high-level):
  - Create a canvas sized to desired output (e.g., using node-canvas createCanvas(width, height)).
  - const ctx = canvas.getContext('2d').
  - const v = await Canvg.from(ctx, svgStringOrUrl).
  - await v.render()  // for static rasterization
  - const pngBuffer = canvas.toBuffer('image/png')  // Node Canvas API
  - Save pngBuffer to disk (fs.writeFileSync).
- For animated SVGs, use v.start() to run animations; capture frames from the canvas at intervals if needed.

Options and runtime behaviour (animations, event handling)

- Canvg supports animation and some event handling when used in a browser; calling start() begins rendering frames.
- When using in Node for static rasterization, use render() to complete the draw synchronously/asynchronously, then export the canvas.
- API exposes options via factory call to control features (see API docs); default behaviour is to attempt best-effort SVG rendering per spec.

Supplementary details (implementation notes and constraints)

- Limitations: not every SVG feature from the spec is fully implemented; check the API docs and examples for coverage and migration notes (v4 migration guidance exists).
- Performance: large or complex SVGs use significant CPU and memory; when rasterizing many images, reuse canvas instances where possible and limit canvas size to minimize memory overhead.
- Security: when loading remote SVG URLs, ensure content is trusted (SVG may contain scripts and external resources). Consider sanitization or use static-only rendering.

Reference details (API signatures and parameter/return descriptions)

- Canvg.from(ctx, source, options?) -> Promise<Canvg>
  - ctx: CanvasRenderingContext2D (browser or node-canvas 2D context)
  - source: string | URL | Document | SVGElement | Readable (SVG text or URL)
  - options: optional object controlling parsing and rendering flags
  - Returns: Promise resolving to a Canvg instance

- Canvg.render() -> Promise<void>
  - Performs a one-off render of the SVG content to the provided context and resolves when drawing is complete.

- Canvg.start() -> void
  - Begins animation/render loop for animated SVGs; useful in browser environments where continuous updates are required.

- Canvg.stop() -> void
  - Stops animation/render loop and any running timers.

Notes on exact option keys: see official API docs at https://canvg.js.org/api for the complete list; the above signatures are the canonical usage patterns derived from the library README and API docs.

Troubleshooting and best practices

- If output is blank: confirm canvas size matches SVG viewport or set explicit width/height on the canvas.
- For node-canvas integration ensure native build dependencies for node-canvas are installed and available in the runtime image.
- If external resources fail to load (images, fonts), fetch and inline them before calling Canvg.from or provide appropriate resource-loading hooks.
- Prefer static render (render()) for deterministic PNG output and start()/stop() only for animation workflows.

Detailed digest (source excerpt and retrieval date)

- Excerpt (selected lines from README):
  - "JavaScript SVG parser and renderer on Canvas. It takes the URL to the SVG file or the text of the SVG file, parses it in JavaScript and renders the result on Canvas. It also can be used to rasterize SVG images."
  - Quickstart example shows: import { Canvg } from 'canvg'; v = await Canvg.from(ctx, './svgs/1.svg'); v.start(); v.stop();
- Retrieval date: 2026-03-20
- Crawl size: 2218 bytes (raw README fetched)

Attribution and crawl data

- Source: https://raw.githubusercontent.com/canvg/canvg/master/README.md and https://canvg.github.io/
- Retrieved: 2026-03-20
- Raw bytes fetched: 2218 bytes
