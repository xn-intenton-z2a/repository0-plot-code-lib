PNG_RENDERER

TABLE OF CONTENTS:
1. Normalised extract: two approaches (sharp and canvas)
2. Sharp usage: SVG->PNG conversion details and API
3. Canvas usage: node-canvas approach and caveats
4. Implementation signatures and options
5. Troubleshooting and best practices
6. References and digest

NORMALISED EXTRACT:
- Two practical approaches to produce PNG output from generated SVG:
  A. Use sharp to rasterize SVG to PNG server-side (recommended for headless, production use).
  B. Use node-canvas (canvas package) to draw SVG onto a canvas and export PNG (requires native Cairo libs on host).

SHARP USAGE (actionable):
- Node API: sharp(input[, options]) where input may be a Buffer or string. For SVG input provide a Buffer of the SVG source.
- To render SVG to PNG and write to file:
  - const image = sharp(Buffer.from(svgString));
  - Optionally set density for resolution: sharp(Buffer.from(svgString), { density: 300 }) sets vector rasterization DPI.
  - image.png().toFile(outputPath) returns a Promise resolving when file written.
- Important options: density (higher yields larger, sharper PNG), resize({width,height}) to control pixel output size, and PNG output options: compressionLevel (0-9), quality (where applicable for PNG palette conversions).
- Example signatures: renderPngFromSvg(svgString:string, outPath:string, opts?:{density?:number,width?:number,height?:number}): Promise<void>

CANVAS (node-canvas) USAGE:
- node-canvas provides a Canvas implementation for Node; typical flow:
  - const { createCanvas, loadImage } = require('canvas')
  - const canvas = createCanvas(width, height); const ctx = canvas.getContext('2d');
  - Load SVG as image: const img = await loadImage('data:image/svg+xml;base64,' + Buffer.from(svgString).toString('base64'))
  - ctx.drawImage(img, 0, 0, width, height)
  - const buffer = canvas.toBuffer('image/png') and write buffer to disk.
- Caveat: node-canvas requires native Cairo and other system-level libraries; see node-canvas docs for installation instructions.

IMPLEMENTATION SIGNATURES & RETURN TYPES:
- renderPngWithSharp(svgString: string, outPath: string, options?: {density?: number, width?: number, height?: number}): Promise<void>
- renderPngWithCanvas(svgString: string, outPath: string, options?: {width:number,height:number}): Promise<void>

TROUBLESHOOTING:
- If output is blank or missing text: ensure fonts referenced in SVG are either web-safe or embedded; otherwise provide fallback fonts.
- If artwork is blurry: increase density (DPI) when using sharp or increase canvas pixel dimensions when using node-canvas and then scale down.
- For headless servers, prefer sharp due to easier deployment; node-canvas needs native deps.

REFERENCES & DIGEST:
- sharp docs: https://sharp.pixelplumbing.com/ retrieved 2026-03-24, bytes: 52643
- node-canvas (GitHub): https://github.com/Automattic/node-canvas retrieved 2026-03-24, bytes: 574597
- MDN Canvas basic usage: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage retrieved 2026-03-24, bytes: 151921

IMPLEMENTATION NOTES:
- If using sharp, no additional system dependencies required other than sharp native binaries; include sharp as an optional dependency in package.json.
- For predictable PNG output sizes, compute an explicit pixel width/height before rasterization and pass to resize or canvas creation.
