Normalised extract

This document condenses the HTML Canvas 2D API: its object model (HTMLCanvasElement, CanvasRenderingContext2D), common drawing primitives, state stack, pixel manipulation, and performance considerations for high-DPI and compositing.

Table of contents

- Normalised extract
- Overview
- Core interfaces and lifecycle
- Drawing primitives and state
- Image and pixel APIs
- Performance and high-DPI handling
- Supplementary details
- Reference details (API signatures)
- Detailed digest and retrieval
- Attribution

Overview

The Canvas 2D API offers an immediate-mode raster drawing surface exposed via HTMLCanvasElement.getContext('2d'). It is stateful (current transform, fill/stroke style, lineWidth, globalCompositeOperation, etc.) and procedural: drawing commands update the backing bitmap immediately.

Core interfaces and lifecycle

- HTMLCanvasElement: width, height (CSS vs bitmap size), toDataURL(), toBlob()
- CanvasRenderingContext2D: the 2D drawing API instance retrieved via getContext('2d', { alpha, desynchronized, willReadFrequently })
- Lifecycle: create element -> set logical bitmap size (width/height properties) -> getContext -> draw -> present (automatic by browser) -> export via toBlob/toDataURL

Drawing primitives and state

- Paths: beginPath(), moveTo(), lineTo(), bezierCurveTo(), arc(), closePath(), stroke(), fill()
- Rects: fillRect(x,y,w,h), strokeRect(x,y,w,h), clearRect(x,y,w,h)
- Text: fillText(text,x,y[,maxWidth]), strokeText()
- Images: drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
- State: save(), restore(), setTransform(), transform(), translate(), rotate(), scale()
- Compositing & blend: globalAlpha, globalCompositeOperation

Image and pixel APIs

- getImageData(sx,sy,w,h) -> ImageData { data: Uint8ClampedArray }
- putImageData(imageData, dx, dy)
- createImageData(w,h), createPattern(image, repetition)
- createImageBitmap for async image decoding when supported

Performance and high-DPI handling

- For crisp rendering on HiDPI screens, set canvas.width = CSSwidth * devicePixelRatio and scale the context by devicePixelRatio.
- Minimising readbacks: getImageData is expensive — prefer compositing and GPU-backed operations or offscreen canvas for worker threads.

Supplementary details

- Desynchronized contexts reduce latency at the cost of potential tearing.
- willReadFrequently flag hints to the UA about planned readbacks and may alter backing store layout.

Reference details (API signatures)

- HTMLCanvasElement.getContext(contextId: '2d', options?: object) -> CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null
- CanvasRenderingContext2D.fillRect(x: number, y: number, w: number, h: number): void
- CanvasRenderingContext2D.drawImage(image: CanvasImageSource, ...args): void
- CanvasRenderingContext2D.getImageData(sx:number, sy:number, sw:number, sh:number): ImageData

Detailed digest (retrieval)

- Retrieval date: 2026-03-21
- Crawl size: 153.0 KB
- Digest: Extracted from MDN Canvas API docs, WHATWG and W3C notes, and current browser implementation guidance.

Attribution

Sources: MDN Web Docs (Canvas 2D API), WHATWG HTML Living Standard, browser vendor docs (Chromium, Firefox). Condensed and normalised for developer reference.