SHARP_OUTPUT

NORMALISED EXTRACT
Table of contents:
- Overview
- Converting SVG to PNG with sharp
- Key options that affect rasterisation
- Output methods and signatures

Overview:
Sharp is an image processing library using libvips. It accepts various inputs (Buffer, filename, Readable stream) and exposes a fluent API to transform and save images.

Converting SVG to PNG (common for CLI plotting):
- Input can be an SVG string or Buffer: sharp(svgBuffer, { density: <dpi> })
- Rasterisation density controls DPI; higher density increases output pixel dimensions and raster quality
- Typical flow: sharp(svgBuffer, {density:300}).png({quality:100}).toFile('out.png') or .toBuffer()

Key options that affect rasterisation:
- density (number) in input options for SVG: default 72; set to 150-300 for higher resolution
- png() options: { compressionLevel: 9, quality: 100 } (quality affects libpng zlib compression and color quantisation only in certain contexts)
- resize(width, height) can be used after input to set exact target pixel size

Output methods and signatures (canonical):
- sharp(input?: Buffer|string|Readable, options?: object) -> Sharp
- sharpInstance.png(options?: object) -> Sharp
- sharpInstance.toFile(path: string) -> Promise<{format, size, width, height}>
- sharpInstance.toBuffer() -> Promise<Buffer>

SUPPLEMENTARY DETAILS
- For deterministic PNG output from SVG generate a viewBox in the SVG and pass the SVG directly as Buffer; if SVG contains external references ensure they are embedded or removed.
- When producing thumbnails or lower-resolution PNGs, use resize() before png() for best results.

DETAILED DIGEST
Source: https://sharp.pixelplumbing.com/api-output
Retrieved: 2026-03-23
Bytes fetched: 186368

ATTRIBUTION
Source origin: sharp (pixelplumbing)
