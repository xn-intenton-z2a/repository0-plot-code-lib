CANVAS_API

NORMALISED EXTRACT
- Canvas is an immediate-mode bitmap drawing surface exposed in browsers via HTMLCanvasElement and in Node via node-canvas (createCanvas).
- Acquire a 2D drawing context with getContext('2d'); the context implements the CanvasRenderingContext2D interface with path, painting, compositing, transformations and pixel-level APIs.
- Pixel data is represented by ImageData objects whose data property is a Uint8ClampedArray in RGBA order (4 bytes per pixel).
- Export options: the browser API exposes HTMLCanvasElement.toDataURL(type, encoderOptions) returning a base64-encoded string; node-canvas and other Node libs expose a canvas.toBuffer(format) returning raw image bytes (PNG recommended for lossless output).
- DPI/scaling: to render crisp output on high-density displays, set canvas.width/height to target pixel dimensions and scale the 2D context by devicePixelRatio.

TABLE OF CONTENTS
1. Overview
2. Acquiring a 2D context
3. Core drawing operations (paths, shapes, fills, strokes)
4. Pixel-level operations (getImageData, putImageData, createImageData)
5. Exporting to PNG (toDataURL / toBuffer)
6. Node integration (node-canvas notes)

DETAILS
1. Overview
- The Canvas API is a bitmap drawing surface. The visible size (CSS) and backing store size (pixel width/height) are separate properties; the backing store determines the raster resolution.

2. Acquiring a 2D context
- Signature: HTMLCanvasElement.getContext(contextId, options?) -> CanvasRenderingContext2D | ImageBitmapRenderingContext | null
- Typical usage: context = canvas.getContext('2d')
- The optional options object may include alpha: boolean and desynchronized: boolean in some implementations.

3. Core drawing operations
- Path lifecycle: beginPath() -> moveTo(x,y) -> lineTo(x,y) -> arc(...) -> closePath() -> stroke() / fill()
- Shapes: rect(x,y,w,h) appends a rectangle to current path; fillRect(x,y,w,h) and strokeRect(x,y,w,h) are convenience immediate methods.
- Paint state properties: fillStyle (string|CanvasGradient|CanvasPattern), strokeStyle (string|CanvasGradient|CanvasPattern), lineWidth (number), lineCap, lineJoin, globalAlpha (0..1), globalCompositeOperation (string).
- Transformations: translate(dx,dy), rotate(angle), scale(sx,sy), transform(a,b,c,d,e,f), setTransform(a,b,c,d,e,f), resetTransform().

4. Pixel-level operations
- getImageData(sx,sy,sw,sh) -> ImageData; ImageData.width: number; ImageData.height: number; ImageData.data: Uint8ClampedArray (length = width*height*4) in RGBA byte order (0..255).
- putImageData(imageData, dx, dy[, dirtyX, dirtyY, dirtyWidth, dirtyHeight]) -> void.
- createImageData(width, height) or createImageData(imageData) -> ImageData.

5. Exporting to PNG
- Browser: canvas.toDataURL(type='image/png', encoderOptions?) -> string (data URL). Also canvas.toBlob(callback, type, encoderOptions).
- Node (node-canvas/sharp): canvas.toBuffer('image/png') or using sharp for conversion; prefer binary buffer output for direct file writes.

6. Node integration (node-canvas)
- Node-canvas exposes createCanvas(width, height) -> Canvas which implements getContext('2d').
- Export: canvas.toBuffer('image/png') returns a Buffer with PNG bytes; write Buffer to file with fs.writeFile.

SUPPLEMENTARY DETAILS
- Pixel coordinate system: integer coordinates refer to pixel boundaries; half-pixel and subpixel coordinates rasterize according to the renderer. Antialiasing and line width affect exact pixel coverage.
- Color formats: CSS colors accepted as strings; gradients and patterns created via createLinearGradient, createPattern.
- Performance: batch draw calls inside a single path and minimize state changes; re-use ImageData buffers when performing repeated pixel operations.

REFERENCE DETAILS (API SIGNATURES)
- HTMLCanvasElement.getContext(contextId: string, options?: Object) -> CanvasRenderingContext2D | null
- CanvasRenderingContext2D.beginPath(): void
- CanvasRenderingContext2D.moveTo(x: number, y: number): void
- CanvasRenderingContext2D.lineTo(x: number, y: number): void
- CanvasRenderingContext2D.arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void
- CanvasRenderingContext2D.fill(): void
- CanvasRenderingContext2D.stroke(): void
- CanvasRenderingContext2D.fillRect(x: number, y: number, w: number, h: number): void
- CanvasRenderingContext2D.getImageData(sx: number, sy: number, sw: number, sh: number) -> ImageData
- CanvasRenderingContext2D.putImageData(imageData: ImageData, dx: number, dy: number, dirtyX?: number, dirtyY?: number, dirtyWidth?: number, dirtyHeight?: number): void
- ImageData: { width: number, height: number, data: Uint8ClampedArray }
- HTMLCanvasElement.toDataURL(type?: string, encoderOptions?: any) -> string
- node-canvas: createCanvas(width: number, height: number) -> Canvas; Canvas.toBuffer(format?: string) -> Buffer

BEST PRACTICES & IMPLEMENTATION NOTES
- For PNG output in Node, use node-canvas.toBuffer('image/png') or render to SVG then convert with sharp if preferred.
- To ensure correct output size for plots, set canvas.width = pixelWidth and canvas.height = pixelHeight, then use context.scale(devicePixelRatio, devicePixelRatio) if mapping from CSS units.
- When constructing polylines from numeric series, map x,y values to pixel coordinates once, store as Float64Array, and draw using a single path for performance.

DETAILED DIGEST (source: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- Retrieved: 2026-03-20
- Crawl size: 151904 bytes

ATTRIBUTION
- Source: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- Retrieved: 2026-03-20
- Bytes downloaded during crawl: 151904

EXPORT METHODS (toDataURL / toBlob / node-canvas toBuffer)

NORMALISED EXTRACT
- HTMLCanvasElement.toDataURL(type = 'image/png', encoderOptions?) -> string (data URL)
  - type: optional MIME type string; default 'image/png'.
  - encoderOptions: for lossy encodings (image/jpeg, image/webp) a number between 0 and 1 indicating image quality; ignored for PNG.
  - Returned value is a data URL with prefix 'data:[type];base64,' followed by base64-encoded bytes. To obtain raw bytes, remove the prefix and base64-decode the remainder.
- HTMLCanvasElement.toBlob(callback, type = 'image/png', encoderOptions?) -> void
  - callback: function invoked with a Blob or null on failure. The Blob can be converted to an ArrayBuffer via blob.arrayBuffer() or read with FileReader in browser environments.
  - toBlob is asynchronous and should be preferred for large canvases to avoid blocking.
- node-canvas: Canvas.toBuffer([mimeType='image/png', options?]) -> Buffer
  - Returns a Node.js Buffer containing encoded image bytes for the requested mimeType. Use fs.writeFile to persist the buffer to disk.
- PNG magic bytes: PNG files start with the 8-byte signature: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A

SUPPLEMENTARY DETAILS
- Data URL overhead: base64 increases size by approximately 33%; transmitting or storing large images as data URLs is inefficient compared to binary Buffers.
- Asynchronous vs synchronous: toDataURL is synchronous and may block on large canvases in the browser; toBlob is asynchronous; node-canvas toBuffer returns a Buffer synchronously (subject to implementation), check node-canvas docs for async variants.
- Recommended server-side flow: createCanvas -> draw -> canvas.toBuffer('image/png') -> fs.writeFile(outputPath, buffer).

REFERENCE DETAILS (API SIGNATURES)
- HTMLCanvasElement.toDataURL(type?: string = 'image/png', encoderOptions?: any) -> string
- HTMLCanvasElement.toBlob(callback: (blob: Blob | null) => void, type?: string = 'image/png', encoderOptions?: any) -> void
- node-canvas: Canvas.toBuffer(mimeType?: string = 'image/png', options?: object) -> Buffer

DETAILED DIGEST (sources + retrieval)
- Source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
- Retrieved: 2026-03-20
- Bytes downloaded during crawl: 153244
- Source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
- Retrieved: 2026-03-20
- Bytes downloaded during crawl: 149563

ADDITIONAL ATTRIBUTION
- Sources: MDN HTMLCanvasElement.toDataURL, MDN HTMLCanvasElement.toBlob, node-canvas README
- Retrieved: 2026-03-20
