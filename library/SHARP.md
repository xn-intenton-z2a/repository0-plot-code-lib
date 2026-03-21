SHARP

Table of contents
- Purpose and common use for SVG->PNG
- Core API (signatures)
- Recommended usage pattern for converting SVG to PNG
- Options affecting output quality and size
- Error handling and async behavior
- Supplementary details
- Reference details
- Digest and attribution

Normalized extract
Purpose
- Sharp is an image processing library for Node.js that accepts input buffers, file paths, or streams, and outputs raster formats including PNG. It is commonly used to convert SVG markup to PNG by feeding an SVG string or Buffer to sharp.

Core API (signatures)
- sharp(input: Buffer | string | Stream, options?: object) -> Sharp instance
- sharpInstance.png(options?: object) -> Sharp instance
- sharpInstance.toFile(path: string) -> Promise<SharpInfo>
- SharpInfo (returned by toFile) includes fields such as format (string), size (number of bytes), width (number), height (number), channels (number).

Recommended usage pattern for converting SVG to PNG
- Create an SVG string representing the plot, for example via string concatenation or a minimal template.
- Convert to PNG:
  - ESM: import sharp from 'sharp';
  - const pngBufferPromise = sharp(Buffer.from(svgString), { density: 72 }).png({ compressionLevel: 9 }).toFile('out.png');
- Use the density option in the sharp constructor to influence SVG rasterisation DPI. Higher density produces higher-resolution PNG at the cost of memory and CPU.

Options affecting output quality and size
- Constructor option: density (number) — affects the rasterisation resolution for vector input (SVG). Typical values: 72, 150, 300. Higher values increase pixel dimensions and memory use.
- png(options): options may include compressionLevel (0-9), adaptiveFiltering (boolean), progressive (boolean), and quality (number for palette-based PNGs). These options control trade-offs between file size and quality.

Error handling and async behavior
- toFile returns a Promise; await it or use .then/.catch. Check returned SharpInfo for final file size and dimensions.
- Sharp throws on invalid input or out-of-memory; handle errors and reject gracefully.

Supplementary details
- Sharp is implemented in native code; installing in CI may require libvips dependencies.
- For simple scripts, using sharp(Buffer.from(svgString)).png().toFile('out.png') is a concise and reliable approach.

Reference details
- Source: Sharp documentation (pixelplumbing)
- URL: https://sharp.pixelplumbing.com/

Digest
- Retrieved: 2026-03-21
- Crawl bytes: 52643 bytes

Attribution
- Content extracted and condensed from Sharp documentation. Data retrieved 2026-03-21, 52643 bytes.
