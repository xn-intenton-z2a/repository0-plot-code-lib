NODE_CANVAS

NORMALISED EXTRACT
Table of contents:
- Overview
- Minimal usage pattern
- Important runtime dependencies
- Buffer export and file writing

Overview:
The npm package 'canvas' (node-canvas) implements the HTML Canvas API for Node.js and exposes createCanvas and a Canvas object compatible with CanvasRenderingContext2D.

Minimal usage pattern:
- Create a canvas: createCanvas(width, height)
- Obtain 2D context: const ctx = canvas.getContext('2d')
- Use CanvasRenderingContext2D drawing methods to draw paths or shapes
- Export to PNG: canvas.toBuffer('image/png') returns a Buffer suitable for fs.writeFileSync

Important runtime dependencies and notes:
- node-canvas depends on native libraries (Cairo, Pango, libjpeg, giflib) on the host system; installation may require build tools and system packages.
- On many Linux distributions apt/yum install "libcairo2-dev libjpeg-dev libpango1.0-dev" (package names vary) before npm install.
- Node versions: ensure compatibility by choosing a node-canvas release matching Node.js version.

Buffer export and writing:
- canvas.toBuffer([mimeType], [options]) -> Buffer
- Example flow: const buf = canvas.toBuffer('image/png'); fs.writeFileSync('out.png', buf)

REFERENCE DETAILS
- createCanvas(width: number, height: number, type?: string) -> Canvas
- Canvas.prototype.getContext('2d') -> CanvasRenderingContext2D
- Canvas.prototype.toBuffer(mimeType?: string, options?: object) -> Buffer

DETAILED DIGEST
Source: https://www.npmjs.com/package/canvas
Retrieved: 2026-03-23
Bytes fetched: 7150

ATTRIBUTION
Source origin: npm package registry (node-canvas)
