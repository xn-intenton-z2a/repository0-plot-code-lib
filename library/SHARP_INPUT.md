NORMALISED EXTRACT

Table of Contents
1. Input options and accepted types
2. SVG to PNG conversion pattern
3. Key methods and signatures
4. Density and resizing options for SVG input
5. Error handling and platform notes

1. Input options and accepted types
- sharp(input, options) constructs a Sharp instance where input may be a Buffer, string path, ReadableStream, or an object describing raw pixel data.
- When input is an SVG string or Buffer, sharp recognizes the SVG input and can rasterize it to PNG, JPEG, or other formats.

2. SVG to PNG conversion pattern
- Common pipeline: sharp(svgBuffer).png().toFile(outputPath) which rasterizes the SVG to PNG and writes to disk.
- Alternatively, use sharp(svgBuffer).resize(width, height).png().toBuffer() to obtain a PNG buffer.

3. Key methods and signatures
- sharp(input[, options]) -> Sharp instance
- .png([options]) -> Sharp instance; .toFile(path) -> Promise<{format, size, channels, ...}>; .toBuffer([options]) -> Promise<Buffer>
- Options: input option 'density' for SVG controls rasterization resolution (dots per inch equivalent). Example: sharp(svgBuffer, { density: 300 }).png()

4. Density and resizing options for SVG input
- density increases the raster output resolution prior to pixel resizing. Use density when SVG contains strokes or fonts that require higher DPI.
- After setting density, call .resize(width, height) to produce specific pixel dimensions.

5. Error handling and platform notes
- sharp is a native binding using libvips; installation requires libvips present or prebuilt binaries available for the target platform. Installation and runtime errors may occur if dependencies are missing.
- API methods return Promises; handle rejections for IO or rasterization errors.

SUPPLEMENTARY DETAILS
- For simple CLI workflows where only conversion of SVG to PNG is required, sharp is an efficient and small-disk-footprint option compared with headless browser approaches.

REFERENCE DETAILS
- Signature: sharp(input, options?)
  - input: Buffer|string|ReadableStream
  - options: density: Number (for SVG), raw descriptors for pixel data
- Common pipelines: sharp(svgBuffer, {density:72}).png().toFile('out.png') and sharp(svgBuffer).resize(800,600).png().toBuffer()

DETAILED DIGEST
- Source: sharp input documentation
- Retrieved: 2026-03-20
- Source URL: https://sharp.pixelplumbing.com/api-input
- Bytes fetched: 65731

ATTRIBUTION
- API details and recommended usage condensed from the official sharp documentation.