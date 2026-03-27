SHARP

Table of contents
1. Overview and role in mission
2. Key APIs and signatures
3. Converting SVG to PNG (recommended patterns)
4. PNG output options and their effects
5. Implementation notes and examples
6. Troubleshooting
7. Supplementary details
8. Reference details
9. Detailed digest
10. Attribution

Normalised extract
Overview and role in mission
- sharp is a high-performance image processing library for Node.js. For this mission it converts SVG output to PNG or can render images from buffers.

Key APIs and signatures
- sharp(input)
  - input: Buffer | string (file path) | Readable stream
  - Returns: Sharp instance with chainable methods
- .png([options]) -> configures PNG output; returns Sharp instance
- .toFile(filePath) -> Promise resolving with an info object
- .toBuffer([options]) -> Promise<Buffer>

Converting SVG to PNG (recommended pattern)
- Render SVG text to a Buffer or pass SVG string directly to sharp as input: sharp(Buffer.from(svgString)) or sharp(svgString) then call .png(options).toFile('out.png') or .toBuffer().
- For higher-resolution PNG rendering from vector SVG, set the desired output dimensions via .resize(width, height) or the density (SVG raster density) via input options where applicable.

PNG output options and their effects (common options)
- compressionLevel (integer 0-9): trade-off between compression effort and file size; higher values use more CPU for smaller files.
- quality (integer 0-100): controls output quality for PNG when palette/quantization used; higher = better quality.
- progressive (boolean): enable progressive/interlaced PNGs.
- force (boolean): force output format even if input matches.

Implementation notes and examples
- Typical chain: sharp(svgBuffer).png({ compressionLevel: 9, progressive: false }).toFile('plot.png') - returns a Promise.
- Use .resize(width, height) before .png(...) to specify pixel dimensions. For SVG inputs, setting resize scales the rendered raster output.

Troubleshooting
- If PNG looks pixelated, increase resize dimensions or raster density before rendering.
- If toFile throws, verify the input is valid SVG XML and includes xmlns attribute. Catch and log sharp errors; sharp returns descriptive error messages.

Supplementary details
- sharp runs native code and must be installed with matching platform binaries; test on target environment.

Reference details
- Source API: sharp(input) -> Sharp instance; .png([options]), .toFile(path), .toBuffer(). Exact option names documented by sharp project.

Detailed digest
- Source: sharp documentation
- URL: https://sharp.pixelplumbing.com/
- Retrieved: 2026-03-27
- Data size obtained during crawl: approximately 54 KB

Attribution
- Source: sharp (Pixelplumbing). Use documented APIs for SVG-to-PNG conversion.