NODE_CANVAS

Table of contents
- Normalised extract: canvas API for server-side PNG rendering
- Core API signatures and return types
- Drawing a polyline to PNG: step-by-step
- Installation and native dependency notes
- Performance and high-DPI output recommendations
- Troubleshooting and common build errors
- Detailed digest and attribution

Normalised extract: canvas API for server-side PNG rendering
- node-canvas implements the HTML Canvas API on Node.js. Use createCanvas(width, height) to obtain a Canvas instance and then call canvas.getContext('2d') to access the 2D drawing API. After drawing, export image bytes via canvas.toBuffer() or canvas.createPNGStream().

Core API signatures (relevant subset)
- createCanvas(width:number, height:number) -> Canvas
- Canvas.getContext(type:'2d') -> CanvasRenderingContext2D
- Canvas.toBuffer(mimeType?:string, options?:object) -> Buffer
- Canvas.createPNGStream() -> ReadableStream
- loadImage(src:string|Buffer) -> Promise<Image>

2D context drawing primitives (important methods)
- ctx.beginPath()
- ctx.moveTo(x:number, y:number)
- ctx.lineTo(x:number, y:number)
- ctx.strokeStyle = colorString
- ctx.lineWidth = number
- ctx.stroke()
- ctx.fillStyle = colorString
- ctx.fill()
- ctx.clearRect(x,y,w,h)

Drawing a polyline to PNG: step-by-step
1. const canvas = createCanvas(width, height)
2. const ctx = canvas.getContext('2d')
3. ctx.beginPath(); ctx.moveTo(px0, py0); for each subsequent point: ctx.lineTo(pxN, pyN); ctx.strokeStyle = '#000'; ctx.lineWidth = 1; ctx.stroke();
4. const buffer = canvas.toBuffer('image/png'); fs.writeFileSync('output.png', buffer);

Installation and native dependency notes
- node-canvas depends on native libraries such as cairo, pango, libjpeg, giflib on many platforms. On Linux, these must be available prior to npm install or installed via package manager. Prebuilt binaries may exist for some Node versions/platforms.
- See node-canvas installation docs for platform-specific instructions if npm install fails.

Performance and high-DPI output recommendations
- To produce higher-resolution PNGs for print or retina displays, scale the drawing context: use canvas.scale(devicePixelRatio, devicePixelRatio) and create a canvas with width*ratio and height*ratio.
- Reuse canvas instances where possible to avoid repeated native allocations.

Troubleshooting
- Common failure: missing cairo headers -> ensure system packages libcairo2-dev (or equivalent) are installed.
- If toBuffer() returns data not recognized as PNG, check that the MIME type or options are correct and that the drawing operations actually wrote pixels before export.

Detailed digest
- Source: node-canvas (Automattic) repository and README
- URL: https://github.com/Automattic/node-canvas
- Retrieved: 2026-03-21
- Data obtained during crawl: 612504 bytes

Attribution
- Extracted API signatures and usage patterns from node-canvas documentation and README to provide a compact server-side PNG rendering reference.