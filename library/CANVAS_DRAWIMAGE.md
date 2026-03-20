CANVAS_DRAWIMAGE

NORMALISED EXTRACT
- Method: CanvasRenderingContext2D.drawImage
- Overloads:
  - drawImage(image: CanvasImageSource, dx: number, dy: number)
  - drawImage(image: CanvasImageSource, dx: number, dy: number, dWidth: number, dHeight: number)
  - drawImage(image: CanvasImageSource, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number)
- CanvasImageSource types: HTMLImageElement, HTMLCanvasElement, HTMLVideoElement, ImageBitmap, OffscreenCanvas, SVGImageElement (varies by platform). The image parameter must be a valid image-like object; if not ready, drawing may be a no-op or throw depending on implementation.
- Semantics:
  - First form draws the source image at its intrinsic size with top-left at (dx,dy).
  - Second form scales the source image to a destination rectangle (dx,dy,dWidth,dHeight) using the current transformation and image-smoothing settings.
  - Third form copies a source rectangle (sx,sy,sWidth,sHeight) from the image and draws it scaled into the destination rectangle.
  - All drawing is affected by the current transform, globalAlpha, globalCompositeOperation and clipping region; integer pixel coordinates correspond to canvas pixels after transform.

TABLE OF CONTENTS
1. Signatures and overloads
2. Parameter types and valid ranges
3. Source cropping and scaling rules
4. Transform, compositing and clipping effects
5. Image source compatibility
6. Performance and DPI considerations
7. Supplementary notes and best practices

1. Signatures and overloads
- drawImage(image: CanvasImageSource, dx: number, dy: number): void
- drawImage(image: CanvasImageSource, dx: number, dy: number, dWidth: number, dHeight: number): void
- drawImage(image: CanvasImageSource, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number): void

2. Parameter types and valid ranges
- image: CanvasImageSource (see types above)
- Coordinates and sizes: numbers (floating point allowed). Negative values allowed (off-canvas drawing). sWidth and sHeight must be positive to represent a valid source rectangle.

3. Source cropping and scaling rules
- When using the 9-parameter overload, the source rectangle (sx,sy,sWidth,sHeight) is taken from the image in source pixels; browsers/implementations round or interpolate when mapping to the destination rectangle (dx,dy,dWidth,dHeight).
- If dWidth/dHeight are omitted, the image intrinsic width/height are used; if sWidth/sHeight exceed the source bounds, the behavior depends on the implementation (clipping or sanitization).

4. Transform, compositing and clipping effects
- drawImage respects current transform matrix (setTransform/scale/rotate/translate), so coordinates are transformed before rasterization.
- imageSmoothingEnabled (boolean) and imageSmoothingQuality ("low"|"medium"|"high") control interpolation quality when scaling images; set these on the context before drawImage to control resampling.
- globalAlpha and globalCompositeOperation affect how the drawn image blends with existing canvas content.

5. Image source compatibility
- Use ImageBitmap or fully-loaded HTMLImageElement to avoid cross-origin tainting and ensure predictable behavior; for cross-origin images ensure CORS headers are present or use canvas-friendly sources.
- In Node (node-canvas) supply Canvas or Image instances supported by the library (createImage, loadImage); node-canvas exposes compatible drawImage semantics.

6. Performance and DPI considerations
- For high-DPI output, allocate a backing canvas sized to pixel dimensions (width*scale, height*scale) and use context.scale(scale, scale) before drawing.
- Reuse ImageBitmap objects when drawing the same source repeatedly; creating ImageBitmap per-frame has cost.
- Prefer a single batched draw (single drawImage or single path) rather than many per-pixel draws; drawImage is hardware accelerated in many implementations.

7. Supplementary notes and best practices
- Validate source readiness (image.complete for HTMLImageElement) before drawImage to avoid no-op draws.
- Use imageSmoothingEnabled = false to preserve pixel-art sharpness when scaling; use true and imageSmoothingQuality = 'high' for photographic-quality interpolation.

REFERENCE DETAILS (API SPECIFICATIONS)
- CanvasRenderingContext2D.drawImage(image: CanvasImageSource, dx: number, dy: number): void
- CanvasRenderingContext2D.drawImage(image: CanvasImageSource, dx: number, dy: number, dWidth: number, dHeight: number): void
- CanvasRenderingContext2D.drawImage(image: CanvasImageSource, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number): void
- Image interpolation controls: context.imageSmoothingEnabled: boolean; context.imageSmoothingQuality: 'low'|'medium'|'high'

DETAILED DIGEST
- Source: MDN: CanvasRenderingContext2D.drawImage
- Retrieved: 2026-03-20
- Digest: Extracted overloads, parameter semantics, supported image sources, smoothing and transform effects relevant to rendering plots and rasterizing SVG/canvas output.

ATTRIBUTION
- MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage (retrieved 2026-03-20)
- Crawl size: HTML reference pages (MDN) used for extraction

DATA SIZE FETCHED: ~200 KB combined from MDN canvas references
