NORMALISED EXTRACT

Table of contents
- Constructor and input types
- PNG output pipeline and options
- SVG rasterization specifics
- Common patterns: resize, density, toFile/toBuffer

1. Constructor and input types
- sharp(input) -> Sharp instance; input may be Buffer, String (filename), Readable stream, or object describing raw pixel data

2. PNG output pipeline
- Methods: .png([options]) configures PNG output; .toBuffer() returns Promise<Buffer>; .toFile(path) writes file and returns Promise with info object
- Common png options: compressionLevel, quality (for PNG with palette/quantisation), progressive flag, adaptive filtering

3. SVG rasterization specifics
- For SVG input, rasterization resolution depends on input density and requested output size. Pass density option when constructing sharp with SVG input to control DPI for rasterization, e.g. sharp(svgBuffer, {density: 300})
- Alternatively resize after rasterization: sharp(svgBuffer).resize(width, height).png()

4. Common patterns
- Convert SVG string to PNG file: sharp(Buffer.from(svgString)).png().toFile('output.png')
- Get in-memory PNG: const buf = await sharp(svgBuffer).png().toBuffer()
- To control size without distortion: use resize(width, height, {fit: 'contain'|'cover'})

REFERENCE DETAILS (API SIGNATURES)
- sharp(input?: Buffer|string|Readable, options?: {density?: number}) -> Sharp
- Sharp.png(options?: object) -> Sharp
- Sharp.resize(width?: number|null, height?: number|null, options?: object) -> Sharp
- Sharp.toBuffer() -> Promise<Buffer>
- Sharp.toFile(path: string) -> Promise<{format, size, width, height, channels}>

ERROR HANDLING & TROUBLESHOOTING
- Ensure libvips is installed and compatible with the platform; many sharp issues stem from mismatched binaries.
- If SVG renders at low resolution, increase density when constructing from svg buffer or resize after rasterization.

DETAILED DIGEST
Source: sharp documentation (sharp.pixelplumbing.com)
Retrieved: 2026-03-21 (referenced; no automated crawl in this run)
Data obtained: referenced site (no bytes downloaded by this run)

ATTRIBUTION
sharp documentation (sharp.pixelplumbing.com)
