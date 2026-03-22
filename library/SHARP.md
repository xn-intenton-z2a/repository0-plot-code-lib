SHARP

Table of Contents:
1. Core constructor and chaining
2. Converting SVG to PNG (exact call patterns)
3. Key options affecting rasterization
4. Installation and runtime notes

1. Core constructor and return types (exact signatures)
- sharp(input: Buffer | String /* path */ | Object, options?: Object) -> Sharp instance
- Methods: .png([options]) -> Sharp, .jpeg([options]) -> Sharp, .resize(width[, height], [options]) -> Sharp, .toFile(path) -> Promise<{format, size, width, height}>

2. Converting SVG to PNG (concrete patterns)
- In-memory SVG string to PNG file with explicit density for DPI control:
  const svgBuffer = Buffer.from(svgString);
  await sharp(svgBuffer, { density: 300 }).png({ quality: 90 }).toFile('output.png');
- Alternative: sharp(svgBuffer).png().toBuffer() returns Promise<Buffer>
- For scaling: await sharp(svgBuffer, { density: 72 }).resize(800).png().toFile('out.png')

3. Key options affecting rasterization (exact names and effects)
- constructor option: density (number) -> controls SVG rasterization DPI; higher density yields higher-resolution raster before scaling
- png options: { quality?: number (0-100), compressionLevel?: 0-9, progressive?: boolean, adaptiveFiltering?: boolean }
- resize options: { width?: number, height?: number, fit?: 'cover'|'contain'|'fill'|'inside'|'outside' }
- toFile returns a Promise resolved with output metadata: { format: 'png', size: <bytes>, width: <px>, height: <px> }

4. Installation and runtime notes
- sharp is a native module built on libvips. Installation requires native build or prebuilt binaries; ensure Node version compatibility.
- Use sharp for PNG output conversion from SVG; this meets the mission allowance for external dependencies limited to PNG rendering.

Detailed digest
Content retrieved from https://www.npmjs.com/package/sharp on 2026-03-22.
sharp exposes a chainable API for raster conversions; for SVG->PNG convert by providing an SVG buffer and optionally a density option to control raster resolution before PNG encoding. The exact method names and option keys above are taken from the package documentation and are the actionable API for producing PNG output that starts with PNG magic bytes.

Attribution
Source: https://www.npmjs.com/package/sharp
Bytes retrieved: 7104
