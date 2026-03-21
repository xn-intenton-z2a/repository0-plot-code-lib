NODE_CANVAS

Table of contents
1. Purpose and overview
2. Installation notes (native deps)
3. Core API signatures (exact)
4. Typical pattern to render PNG from drawing commands
5. Troubleshooting and common build/runtime errors
6. Detailed digest (retrieved)
7. Attribution and crawl size

1. Purpose and overview
The canvas package (node-canvas) provides a Canvas implementation for Node.js with a 2D rendering context compatible with the HTML Canvas 2D API. It is suitable for drawing lines, shapes and exporting PNG buffers, enabling server-side PNG output from SVG or direct drawing commands.

2. Installation notes (native deps)
- node-canvas depends on native libraries (cairo, pango, libjpeg, giflib) on many platforms. Ensure the target environment has these installed before npm install completes. On Debian/Ubuntu that typically means installing: libcairo2-dev, libpango1.0-dev, libjpeg-dev, libgif-dev, pkg-config, and build tools.

3. Core API signatures (exact)
- import { createCanvas, Canvas } from 'canvas'  (ESM)
- createCanvas(width: number, height: number): Canvas
- Canvas.getContext('2d'): CanvasRenderingContext2D
- Canvas.prototype.toBuffer(mime?: string, options?: object): Buffer
- Canvas.prototype.toDataURL(mime?: string, options?: object): string
- CanvasRenderingContext2D: methods include beginPath(), moveTo(x,y), lineTo(x,y), stroke(), fill(), strokeStyle, fillStyle, lineWidth, clearRect(x,y,w,h), translate/scale/transform.

4. Typical pattern to render PNG from drawing commands
1. Create canvas with desired pixel width and height via createCanvas(width, height).
2. Obtain 2D context: ctx = canvas.getContext('2d').
3. Draw polyline by ctx.beginPath(), ctx.moveTo(firstX, firstY), ctx.lineTo(nextX, nextY) for each point, then ctx.stroke().
4. Export PNG: const buf = canvas.toBuffer('image/png'); write buffer to file or return it from API.

5. Troubleshooting and common build/runtime errors
- Build failures during npm install usually indicate missing system-level dependencies; consult canvas docs for platform-specific instructions.
- Runtime: if PNG output is invalid or blank, verify drawing coordinates and device pixel sizes; ensure strokeStyle and strokeWidth are set.

6. Detailed digest (retrieved)
Source: npm package page for canvas (node-canvas)
Retrieved: 2026-03-21
Crawl bytes downloaded: 7150
Key extracted facts: API entry points (createCanvas), toBuffer usage for PNG export, and native dependency requirements.

7. Attribution
Source URL: https://www.npmjs.com/package/canvas
Crawl size (bytes): 7150
License / attribution: See package page.