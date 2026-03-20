NORMALISED EXTRACT

Table of Contents
1. Overview
2. Creating a Canvas and 2D Context
3. Drawing a polyline (plot pipeline)
4. Exporting PNG (toBuffer / createPNGStream)
5. Installation and runtime requirements
6. Best practices and troubleshooting

1. Overview
- node-canvas exposes a server-side implementation of the HTML Canvas 2D API. It mirrors the browser Canvas API surface so code that uses the 2D drawing context can be reused on Node.js for programmatic image generation.

2. Creating a Canvas and 2D Context
- Factory: createCanvas(width: Number, height: Number) -> Canvas
- Canvas.getContext('2d') -> CanvasRenderingContext2D
- The returned 2D context supports the standard 2D drawing API: beginPath, moveTo, lineTo, arc, rect, stroke, fill, strokeStyle, fillStyle, lineWidth, translate, scale, rotate, setTransform, fillText, measureText, drawImage, putImageData, getImageData.

3. Drawing a polyline (plot pipeline)
- Create a canvas sized to target pixel output (width, height).
- Obtain context: ctx = canvas.getContext('2d').
- Map data coordinates to pixel coordinates: compute scaleX, scaleY and apply ctx.translate/ctx.scale to align mathematical coordinate system to canvas pixels.
- Begin path: ctx.beginPath(); ctx.moveTo(x0, y0); then for each subsequent point ctx.lineTo(xn, yn); finally ctx.stroke() to render a single polyline element. Use ctx.lineWidth and ctx.strokeStyle to style the line.
- For high-density outputs, render at device pixel ratio scaled canvas size and then downscale when embedding or converting.

4. Exporting PNG (toBuffer / createPNGStream)
- canvas.toBuffer([format]) -> Buffer
  - Common call: canvas.toBuffer('image/png') returns a Node Buffer containing the PNG file bytes. The first 8 bytes are the PNG signature: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A.
- canvas.createPNGStream() -> ReadableStream
  - Returns a Node Readable stream that emits PNG data; use when streaming directly to disk or an HTTP response to avoid buffering the entire image in memory.
- context.createPNGStream() may be provided as alias (library versions vary); prefer canvas.createPNGStream where available.

5. Installation and runtime requirements
- node-canvas links against native graphics libraries: cairo, Pango, libjpeg, giflib, libpng. On Linux/CI environments the following system packages are commonly required (Debian/Ubuntu example):
  - sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
- macOS (Homebrew) example:
  - brew install pkg-config cairo pango libpng jpeg giflib librsvg
- Windows: follow the node-canvas README and use appropriate build tools; prebuilt binaries may be available for some Node versions and platforms.
- npm install canvas may trigger native build steps if prebuilt binaries are unavailable; ensure the above system packages are present for successful compilation.

6. Best practices and troubleshooting
- Prefer streaming (createPNGStream) for large images to avoid large memory allocations.
- If the PNG magic bytes are required for assertions in tests, assert Buffer.slice(0,8) equals the bytes: 89 50 4E 47 0D 0A 1A 0A.
- Common install failures: missing cairo/pango or incompatible system headers; consult the node-canvas README for distribution-specific install commands and Docker images.
- If fonts are missing or text renders incorrectly, register fonts or ensure system fonts are installed; node-canvas reads system fonts used by Pango.

SUPPLEMENTARY DETAILS
- When converting from SVG to PNG: either render the SVG inside a canvas (canvg, jsdom + canvg) and then toBuffer, or pass the SVG data to sharp for direct svg input conversion. Using sharp to convert SVG is often simpler and faster for static SVGs. For plotted numeric series drawn via canvas paths, node-canvas is direct and efficient.
- OffscreenCanvas (browser API) enables worker-thread rendering in the browser; this is not a drop-in replacement in Node.js but is relevant for WebWorker/server-side architectures where OffscreenCanvas is supported.

REFERENCE DETAILS (API signatures and return types)
- createCanvas(width: Number, height: Number) -> Canvas
- Canvas.getContext(kind: '2d') -> CanvasRenderingContext2D
- Canvas.toBuffer([format: String]) -> Buffer
  - format examples: 'image/png' or 'image/jpeg' depending on library support
- Canvas.createPNGStream() -> ReadableStream (emits Buffer chunks of PNG data)
- CanvasRenderingContext2D methods used in plotting:
  - beginPath() -> void
  - moveTo(x: Number, y: Number) -> void
  - lineTo(x: Number, y: Number) -> void
  - stroke() -> void
  - set strokeStyle: String
  - set lineWidth: Number
  - drawImage(image, dx, dy [, dw, dh]) -> void

CONCRETE BEST PRACTICE SNIPPETS (plain text)
- Create, draw, export PNG to disk (conceptual sequence):
  1. const canvas = createCanvas(width, height)
  2. const ctx = canvas.getContext('2d')
  3. ctx.beginPath(); ctx.moveTo(...); ctx.lineTo(...); ctx.stroke()
  4. const buf = canvas.toBuffer('image/png')
  5. fs.writeFileSync('plot.png', buf)
- Stream to file to avoid buffering entire image:
  1. const out = fs.createWriteStream('plot.png')
  2. const stream = canvas.createPNGStream()
  3. stream.pipe(out)

TROUBLESHOOTING
- Build errors: install system packages for cairo, pango, libpng, libjpeg and rerun npm install.
- PNG output not valid: verify first 8 bytes are the PNG signature and that the Buffer length > 8.
- Text rendering blank: ensure fonts are available to Pango or register custom fonts per node-canvas instructions.

DETAILED DIGEST
- Sources used for update:
  - https://github.com/Automattic/node-canvas (GitHub README retrieved 2026-03-20)
  - https://www.npmjs.com/package/canvas (npm package page retrieved 2026-03-20)
- Retrieval date: 2026-03-20
- Approx HTML size retrieved: 600 KB

ATTRIBUTION
- Condensed and normalised from the node-canvas project documentation and the node-canvas README (listed above).