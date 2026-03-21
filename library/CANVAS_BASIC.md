NORMALISED EXTRACT

Table of contents
- Creating a canvas and obtaining 2D context
- Drawing and rendering operations relevant to plotting
- Exporting PNG from canvas
- Rendering SVG to canvas (browser and Node approaches)

1. Creating canvas and 2D context
- Browser: create element with document.createElement('canvas'); set canvas.width and canvas.height; const ctx = canvas.getContext('2d')
- Node: use canvas libraries (node-canvas) where Canvas constructor provides similar API and methods like toBuffer

2. Drawing operations
- ctx.beginPath(), ctx.moveTo(x,y), ctx.lineTo(x,y), ctx.stroke() to render paths similar to polyline
- ctx.strokeStyle, ctx.lineWidth control stroke appearance
- ctx.fillStyle and ctx.fill to paint areas

3. Exporting PNG
- Browser: canvas.toDataURL('image/png') returns base64 data URL; toBlob for asynchronous blob output
- Node (node-canvas): canvas.toBuffer('image/png') returns Buffer containing PNG bytes
- Ensure width/height are set to desired pixel dimensions before drawing

4. Rendering SVG to canvas
- Browser approach: create an Image object, set src to an SVG data URL, onload drawImage(image, 0, 0) then export; be mindful of cross-origin tainting if using external resources
- Node approach: use a headless rasteriser (node-canvas can load SVG if built with librsvg) or use sharp to rasterize SVG server-side and then optionally load into canvas if further drawing is needed

SUPPLEMENTARY DETAILS
- DPI/density: when rasterizing SVG to PNG, supply an appropriate density or scale in pixels to match desired output resolution
- Anti-aliasing: canvas implementations apply anti-aliasing by default; control via CSS or library options when available

REFERENCE DETAILS
- canvas.getContext(contextId: '2d') -> CanvasRenderingContext2D
- CanvasRenderingContext2D core calls: moveTo(x:number, y:number), lineTo(x:number, y:number), stroke(), beginPath(), closePath(), strokeStyle, lineWidth
- Export calls: canvas.toDataURL(mimeType?: string) -> string; canvas.toBlob(callback, mimeType?, quality?)

DETAILED DIGEST
Source: MDN Canvas API basic usage
Retrieved: 2026-03-21 (referenced; no automated crawl in this run)
Data obtained: referenced page (no bytes downloaded by this run)

ATTRIBUTION
MDN Web Docs - Canvas API (developer.mozilla.org)
