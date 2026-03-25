NORMALISED_EXTRACT

Table of contents:
- Purpose and role in PNG rendering
- Core pipeline primitives and method signatures
- Output verification (PNG magic bytes)
- Implementation patterns for SVG->PNG and buffer output
- Installation and runtime notes

Purpose and role in PNG rendering
- sharp is a high-performance Node.js image-processing library (libvips-based) commonly used to convert and encode images into formats such as PNG and to resize or composite images. Use sharp for producing PNG output from SVG or raster buffers.

Core pipeline primitives and method signatures (compact, actionable)
- sharp(input?) -> Sharp pipeline instance
  - input: Buffer | String (file path) | Object with raw pixel data
- pipeline.resize(width?, height?, options?) -> Sharp
  - options: { fit?: 'cover'|'contain'|'fill'|'inside'|'outside', position?: string|number, background?: {r,g,b,alpha} }
- pipeline.png([options]) -> Sharp
  - options are format-specific; profiling options omitted here — call toFile()/toBuffer() finalises.
- pipeline.toBuffer() -> Promise<Buffer>
- pipeline.toFile(outputPath) -> Promise<{ format: string, size: number, width: number, height: number }>
- pipeline.toFormat(format, [options]) -> Sharp

Output verification
- A PNG buffer created by sharp begins with the PNG signature (eight bytes): 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A. Checking buffer.slice(0,8) against these bytes verifies PNG output.

Implementation patterns for SVG->PNG
- Option A: pass SVG source (string or Buffer) directly to sharp: sharp(Buffer.from(svgString)) .resize(w,h) .png() .toFile('out.png')
- Option B: render to an intermediate canvas (browser-style) and feed the raw raster buffer to sharp for PNG encoding and optional resizing.
- Use toBuffer() when the caller needs the PNG bytes in memory; use toFile() for direct disk output.

Installation and runtime notes
- sharp depends on libvips; installation may require native build tooling or prebuilt binaries. Check official sharp documentation for platform-specific installation flags.
- Runtime errors propagate as rejected promises; always await or catch to handle errors.

REFERENCE_DETAILS

- Primary signatures (simplified):
  - sharp(input?: Buffer|string): Sharp
  - Sharp.resize(width?: number, height?: number, options?: object): Sharp
  - Sharp.png(options?: object): Sharp
  - Sharp.toBuffer(): Promise<Buffer>
  - Sharp.toFile(path: string): Promise<{ format: string, size: number, width: number, height: number }>
- Behavior: pipeline methods are chainable; toFile()/toBuffer() execute the pipeline and return a Promise.

DETAILED_DIGEST

Source: https://sharp.pixelplumbing.com/en/stable/  (site front; some pages returned a 404 landing page during capture)
Date retrieved: 2026-03-25
Data captured: ~48 KB (site landing/404 page captured during crawl)

Extracted technical points used above: core pipeline primitives and method behaviour for encoding PNG and obtaining Buffer or writing to file; PNG signature bytes included for output verification.

ATTRIBUTION
sharp (lovell/sharp) documentation and site.