CANVAS_API

NORMALISED EXTRACT
Table of contents:
- Overview
- Key APIs used for plotting
- Coordinate system and scaling
- Exporting PNG from canvas

Overview:
The Canvas 2D API provides drawing operations to paint shapes, paths and images onto an HTML canvas element via a CanvasRenderingContext2D.

Key APIs used for plotting lines (essential for rendering plots to PNG via a canvas):
- canvas.getContext('2d') -> CanvasRenderingContext2D
- ctx.beginPath()
- ctx.moveTo(x, y)
- ctx.lineTo(x, y)
- ctx.strokeStyle (string) and ctx.lineWidth (number)
- ctx.stroke()
- ctx.clearRect(x, y, w, h)
- ctx.canvas.width and ctx.canvas.height to set pixel buffer size

Coordinate system and scaling:
- Default coordinate system maps 1 unit to 1 device pixel; for high-DPI output set canvas width/height to width*scale and then call ctx.scale(scale, scale) so drawing commands use logical units.
- Origin (0,0) is at top-left; to draw Cartesian plots with origin at lower-left, transform coordinates accordingly (e.g., y = canvasHeight - y).

Exporting PNG:
- In browsers: canvas.toDataURL('image/png') or canvas.toBlob(callback, 'image/png')
- In Node.js via node-canvas: canvas.toBuffer('image/png') returns a Buffer suitable for fs.writeFileSync

SUPPLEMENTARY DETAILS
- When rendering many points, use a single path: beginPath(); moveTo(firstX, firstY); then for each point lineTo(x,y); stroke(); this is faster than many separate paths.
- Line smoothing and subpixel alignment: set ctx.lineWidth and use integer coordinates to avoid half-pixel anti-aliasing issues if desired.

REFERENCE DETAILS
- CanvasRenderingContext2D methods (signature highlights):
  getContext(contextId: '2d') -> CanvasRenderingContext2D
  beginPath() -> void
  moveTo(x: number, y: number) -> void
  lineTo(x: number, y: number) -> void
  stroke() -> void
  fillStyle: string
  lineWidth: number
  scale(x: number, y: number) -> void
- Export: canvas.toDataURL(type?: string, encoderOptions?: number) -> string (base64 data URL)

DETAILED DIGEST
Source: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
Retrieved: 2026-03-23
Bytes fetched: 151906

ATTRIBUTION
Source origin: MDN Web Docs
