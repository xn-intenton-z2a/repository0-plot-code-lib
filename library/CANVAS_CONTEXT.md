CANVAS_CONTEXT

NORMALISED EXTRACT
- The CanvasRenderingContext2D interface exposes a rich set of drawing operations for 2D rendering: path construction, shapes, text, transformations, compositing and pixel manipulation.
- ImageData is the canonical pixel container: width, height and a Uint8ClampedArray with RGBA bytes ordered per pixel.

TABLE OF CONTENTS
1. Interface overview
2. Path and paint methods
3. State and styles
4. Transformations
5. Pixel operations and ImageData
6. Export and encoding

DETAILS
1. Interface overview
- The CanvasRenderingContext2D is obtained via canvas.getContext('2d') and provides both immediate drawing commands and stateful APIs (current transform, styles).

2. Path and paint methods
- beginPath(): void — start new path.
- moveTo(x:number, y:number), lineTo(x:number, y:number), bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y), quadraticCurveTo(cpx, cpy, x, y), arc(x,y,r,start,end,anticlockwise?).
- stroke(): void — stroke current path with current strokeStyle and lineWidth.
- fill(rule?: string): void — fill current path.
- closePath(): void.

3. State and styles
- Properties: fillStyle (string|CanvasGradient|CanvasPattern), strokeStyle (string|CanvasGradient|CanvasPattern), lineWidth (number), lineCap ("butt"|"round"|"square"), lineJoin ("miter"|"round"|"bevel"), miterLimit (number), globalAlpha (number 0..1), globalCompositeOperation (string).
- save(): void and restore(): void manage a stack of drawing states.

4. Transformations
- context.setTransform(a,b,c,d,e,f): void sets transform matrix directly.
- translate(dx,dy), rotate(angle), scale(sx,sy) modify current transform.
- resetTransform(): void resets to identity.

5. Pixel operations and ImageData
- getImageData(sx, sy, sw, sh) -> ImageData.
- putImageData(imageData, dx, dy[, dirtyX, dirtyY, dirtyWidth, dirtyHeight]) -> void.
- ImageData.data is a Uint8ClampedArray of length width*height*4; bytes are in RGBA order where each byte is 0..255.
- createImageData(width,height) -> ImageData allocates a zeroed buffer.

6. Export and encoding
- toDataURL(type='image/png', encoderOptions?) -> string (base64 data URL).
- toBlob(callback, type?, quality?) for asynchronous binary extraction in browsers.
- Node-canvas: canvas.toBuffer('image/png') -> Buffer.

REFERENCE DETAILS (SIGNATURES)
- CanvasRenderingContext2D.beginPath(): void
- CanvasRenderingContext2D.moveTo(x: number, y: number): void
- CanvasRenderingContext2D.lineTo(x: number, y: number): void
- CanvasRenderingContext2D.arc(x:number, y:number, radius:number, startAngle:number, endAngle:number, anticlockwise?: boolean): void
- CanvasRenderingContext2D.fill(): void
- CanvasRenderingContext2D.stroke(): void
- CanvasRenderingContext2D.getImageData(sx:number, sy:number, sw:number, sh:number) -> ImageData
- CanvasRenderingContext2D.putImageData(imageData: ImageData, dx:number, dy:number, dirtyX?:number, dirtyY?:number, dirtyWidth?:number, dirtyHeight?:number) -> void
- ImageData: { width: number, height: number, data: Uint8ClampedArray }

BEST PRACTICES
- Use a single path and one stroke/fill call for large polylines rather than per-segment drawing.
- When manipulating raw pixels, reuse ImageData buffers to avoid repeated GC pressure; work with Uint8ClampedArray views and set pixel bytes directly (RGBA per index).
- For Node, prefer canvas.toBuffer for PNG output and write the Buffer directly with fs.writeFile.

DETAILED DIGEST (source: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
- Retrieved: 2026-03-20
- Crawl size: 182852 bytes
- Content digested: MDN reference for CanvasRenderingContext2D including method signatures, properties, ImageData model and export functions suitable for rendering programmatic plots.

ATTRIBUTION
- Source: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
- Retrieved: 2026-03-20
- Bytes downloaded during crawl: 182852
