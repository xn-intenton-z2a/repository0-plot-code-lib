SHARP

Table of contents
- Normalised extract: core usage and behaviors
- Input types and accepted formats
- Converting SVG to PNG: patterns
- Important png() options and effects
- Resizing and density when rasterizing vector input
- Reference details: API signatures and return types
- Supplementary implementation notes
- Troubleshooting and best practices
- Digest and retrieval details
- Attribution

Normalised extract: core usage and behaviors
Sharp is a high-performance image processing library for Node that accepts Buffers, file paths, and readable streams as input and exposes a fluent API to chain transformations and produce output formats including PNG, JPEG, WebP, and AVIF. For SVG input, Sharp rasterizes vector content and can be configured via input density or by resizing the output; the common pattern to produce PNG is sharp(input).png(options).toFile(path) or toBuffer(). The constructor signature is sharp(input[, options]) where options may include an input density for SVG rasterization.

Input types and accepted formats
- Input may be Buffer, string (filename), Readable stream, or a raw object for raw pixel data.
- Supported input formats: JPEG, PNG, WebP, TIFF, GIF, SVG, PDF, HEIF (per libvips compilation).

Converting SVG to PNG: patterns
- Minimal pattern: provide an SVG string as a Buffer and call png to produce raster output. Example flow: create svgBuffer from SVG source; call sharp(svgBuffer, { density: 300 }) to control raster density; chain .resize(width, height) if a specific pixel size is required; call .png({ compressionLevel: 9 }) and .toFile(outputPath) or .toBuffer().
- If SVG contains no explicit width/height, specify desired pixel dimensions using .resize or pass density so the vector is rasterized at higher resolution before downscaling.

Important png() options and effects
- compressionLevel: integer 0..9 controlling deflate compression (higher => smaller files, slower encode).
- progressive: boolean for interlaced/progressive PNG output.
- palette: boolean to force palette-based PNG which can reduce size; when palette is true, quality (0..100) may be applied for quantization.
- adaptiveFiltering: boolean (true/false) to enable adaptive filtering optimization.
- force: boolean to force output as PNG even if input already PNG.

Resizing and density when rasterizing vector input
- Use sharp(input, { density: N }) to control the DPI used when rasterizing SVG (higher density increases raster detail prior to any resize).
- Use .resize(width, height, options) to set target pixel dimensions after rasterization.
- Order matters: passing density in the constructor affects the rasterization; resizing after controls final pixel output.

Reference details: API signatures and return types
- sharp(input: Buffer | string | Readable | {raw}) -> Sharp instance
- sharp(input, options?: { density?: number, limitInputPixels?: boolean }) -> Sharp
- sharpInstance.png(options?: { compressionLevel?: number, progressive?: boolean, palette?: boolean, quality?: number, adaptiveFiltering?: boolean, force?: boolean }) -> Sharp
- sharpInstance.toFile(path: string) -> Promise<{format: string, size: number, width: number, height: number}>
- sharpInstance.toBuffer() -> Promise<Buffer>
- sharpInstance.metadata() -> Promise<{format?: string, width?: number, height?: number, density?: number, channels?: number}>

Supplementary implementation notes
- For reliable SVG-to-PNG rasterization, ensure the source SVG has a viewBox attribute and that any units are consistent; otherwise specify density or resize explicitly.
- When running in CI, ensure libvips is available for the Node runtime (sharp installation may fetch prebuilt binaries or build from source).
- Use toBuffer when the PNG data must be consumed in-process (e.g., returned from an API) and toFile when writing to disk.

Troubleshooting and best practices
- If PNG output is very small or blank, ensure the SVG viewBox and coordinate system are correct; try increasing density to 300 and then resizing down.
- If sharp throws missing libvips errors in CI, install appropriate build dependencies or use prebuilt sharp binaries for the environment.
- When using palette quantization (palette: true), tune quality (0..100) to trade visual fidelity for size.

Digest and retrieval details
- Source URL: https://sharp.pixelplumbing.com/
- Retrieval date: 2026-03-20
- Crawled HTML size (approx): 54.1 KB
- Digest: documentation confirms core patterns: sharp(input) constructor, png(options) transformer, toBuffer/toFile outputs, input density for SVG rasterization, and configuration knobs for PNG compression and palette quantization. The site includes full API reference and examples for input types and format-specific options.

Attribution
- Source: Sharp official documentation — https://sharp.pixelplumbing.com/
- Data retrieved: 2026-03-20, approx 54.1 KB HTML
