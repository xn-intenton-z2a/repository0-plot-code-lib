NORMALISED EXTRACT

Table of Contents
1. Core API and object model
2. Creating a canvas and 2D context
3. Drawing primitives and path operations
4. Exporting PNG and signature bytes
5. Installation and platform notes

1. Core API and object model
- Node Canvas exposes a Canvas factory that mirrors the HTML Canvas 2D API for server-side rendering.
- Key factory: createCanvas(width, height) -> Canvas

2. Creating a canvas and 2D context
- Canvas instance method getContext('2d') returns a CanvasRenderingContext2D with standard 2D drawing methods: beginPath, moveTo, lineTo, stroke, fill, arc, rect, fillText, strokeText, setTransform, etc.

3. Drawing primitives and path operations
- Typical plot pipeline: create a canvas sized to desired pixel output, obtain 2D context, translate/scale coordinate system to match plot view, beginPath, moveTo first point, lineTo subsequent points, stroke the path.
- Stylistic attributes: context.strokeStyle (color), context.lineWidth (number), context.fillStyle (color).

4. Exporting PNG and signature bytes
- Canvas provides toBuffer('image/png') which returns a Buffer whose first eight bytes are the PNG magic sequence: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A.
- Typical signature: Buffer returned begins with that PNG header; can be written directly to disk with fs.writeFile.

5. Installation and platform notes
- Node Canvas has native dependencies (cairo, Pango, libjpeg, giflib). Installation on CI or production may require system packages; follow project README for supported platforms and prebuilt binaries.

SUPPLEMENTARY DETAILS
- For simple plots, Canvas offers direct pixel output without SVG intermediate; choose canvas when programmatic drawing or complex compositing is required.
- For converting existing SVG to PNG, using sharp may be simpler, but drawing from raw numeric points is straightforward with canvas paths.

REFERENCE DETAILS (signatures)
- createCanvas(Number width, Number height) -> Canvas
- canvas.getContext('2d') -> CanvasRenderingContext2D
- canvas.toBuffer('image/png') -> Buffer starting with PNG magic bytes

DETAILED DIGEST
- Source: node-canvas GitHub repository and README
- Retrieved: 2026-03-20
- Source URL: https://github.com/Automattic/node-canvas
- Bytes fetched: 574264

ATTRIBUTION
- API and installation guidance condensed from the node-canvas project documentation and README.