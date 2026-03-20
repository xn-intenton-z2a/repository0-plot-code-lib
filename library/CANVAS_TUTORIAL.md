NORMALISED EXTRACT

Purpose: actionable notes from MDN Canvas basic usage focused on drawing polylines and saving PNG output.

TABLE OF CONTENTS
- Canvas creation and sizing
- 2D context acquisition
- Drawing primitives for polylines
- Saving output (browser and Node)

1) Canvas creation and sizing
- Create a canvas element and set width and height attributes to define pixel resolution (CSS size differs from pixel buffer).
- Example properties: canvas.width (number), canvas.height (number).

2) 2D context acquisition
- ctx = canvas.getContext('2d') returns CanvasRenderingContext2D.
- The rendering coordinate system origin is top-left; y increases downward.

3) Drawing primitives for polylines (implementation-ready)
- ctx.beginPath()
- ctx.moveTo(x0, y0)
- for each subsequent point: ctx.lineTo(xN, yN)
- ctx.stroke() to render the path outline
- Properties influencing rendering: ctx.strokeStyle (color string), ctx.lineWidth (number), ctx.lineJoin, ctx.lineCap

4) Saving output
- Browser: canvas.toDataURL('image/png') or canvas.toBlob(callback,'image/png').
- Node (node-canvas): canvas.toBuffer('image/png') returns PNG bytes which begin with PNG magic bytes (89 50 4E 47 0D 0A 1A 0A). Use buffer to write files via fs.writeFileSync or pass to sharp for further processing.

SUPPLEMENTARY DETAILS
- Coordinate mapping: to convert mathematical y-up functions to canvas y-down, apply y' = height - y or perform ctx.translate(0, height) and ctx.scale(1, -1).
- For crisp thin lines, consider devicePixelRatio scaling and setting canvas.width/height accordingly.

REFERENCE DETAILS (method signatures)
- HTMLCanvasElement.width: number, height: number.
- HTMLCanvasElement.getContext(contextId) => CanvasRenderingContext2D | null.
- CanvasRenderingContext2D methods: beginPath(), moveTo(x,y), lineTo(x,y), stroke(), fill(), closePath().
- Node-canvas specific: canvas.toBuffer([format]) => Buffer.

DETAILED DIGEST
- Source: MDN Canvas tutorial "Basic usage" (developer.mozilla.org), retrieved 2026-03-20.
- Retrieved bytes (cached): 152013 bytes.

ATTRIBUTION
- URL: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage
- Retrieved: 2026-03-20
- Bytes crawled: 152013
