SHARP

Table of contents
- Normalised extract: sharp for SVG to PNG and image pipelines
- Core pipeline methods and signatures
- Converting SVG string to PNG bytes
- Performance characteristics and recommended options
- Error handling and memory considerations
- Detailed digest and attribution

Normalised extract: sharp for SVG-to-PNG and image processing
- sharp is a high-performance image processing library built on libvips. It can rasterize SVG content and emit PNG buffers or files. Use it where native performance and low memory usage are important.

Core pipeline methods and signatures (subset)
- sharp(input: Buffer|string|Readable) -> Sharp instance
- sharpInstance.png(options?) -> Sharp instance
- sharpInstance.resize(width?: number, height?: number, options?: object) -> Sharp instance
- sharpInstance.toBuffer() -> Promise<Buffer>
- sharpInstance.toFile(path: string) -> Promise<{format:string, width:number, height:number, size:number}>
- sharpInstance.metadata() -> Promise<{width:number, height:number, format:string, hasAlpha:boolean}>

Converting SVG string to PNG (pattern)
1. const buffer = Buffer.from(svgString)
2. await sharp(buffer).png({quality:100}).toFile('output.png')  (or .toBuffer() to keep in-memory)
- The pipeline auto-detects input format from the buffer.

Performance and recommended options
- sharp uses libvips and is faster and more memory efficient than many alternatives for large images and batch pipelines.
- For best quality when rasterizing vector content, specify explicit width and height in either the SVG markup or via sharp().resize() to control output resolution.

Error handling and memory considerations
- Always await the Promise returned by toBuffer/toFile and handle rejections.
- For large concurrent conversions, limit concurrency to avoid high memory usage; prefer streaming patterns where possible.

Detailed digest
- Source: Sharp documentation
- URL: https://sharp.pixelplumbing.com/
- Retrieved: 2026-03-21
- Data obtained during crawl: 55432 bytes

Attribution
- Condensed from Sharp docs including exact method names, parameter patterns and recommended usage to convert SVG to PNG for CLI output.