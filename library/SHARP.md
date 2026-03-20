SHARP

Normalized extract (key technical points)

Table of Contents
- Overview and purpose
- Core constructor and chaining model
- Common transform methods and signatures
- Output formats and options (PNG example)
- Installation and runtime requirements
- Performance characteristics and internals (libvips)
- Troubleshooting and CI notes

Overview and purpose
- sharp is a high-performance Node API for image processing that uses libvips under the hood. It converts and resizes images quickly and with low memory usage compared to ImageMagick/GraphicsMagick.

Core constructor and chaining model (signatures)
- sharp(input) -> Sharp instance. input may be a filename (string), Buffer, ReadableStream, or an options object (create: { width, height, channels, background }).
- Methods return the Sharp instance (chainable) and most terminal methods return Promises.
- Terminal methods include toBuffer([options]) -> Promise<Buffer>, toFile(path[, callback]) -> Promise resolving with info object or callback form.

Common transform methods (essential signatures)
- resize(width?: number, height?: number, options?: object) -> Sharp. options can include fit, position, kernel, background, withoutEnlargement. When only width is provided and height omitted, aspect ratio is preserved.
- rotate(angle?: number, options?: object) -> Sharp
- extract(region: { left, top, width, height }) -> Sharp
- composite([{ input: Buffer|string|Object, blend?: string, left?: number, top?: number }]) -> Sharp
- png([options]) -> Sharp; jpeg([options]) -> Sharp; webp([options]) -> Sharp

Output formats and options (PNG)
- png(options) sets PNG output. Common options include compressionLevel (0-9) and palette/quality settings for other formats. Use toFile('out.png') or toBuffer() to retrieve PNG data.
- Example usage pattern (inline): sharp('in.svg').png().toFile('out.png') -> Promise resolves with { format, size, width, height, channels }.

Installation and runtime requirements
- Install with npm install sharp. Prebuilt binaries are available for many platforms; on systems without prebuilt support sharp will build against libvips.
- sharp requires Node.js versions aligned with Node-API support; consult sharp README for exact supported Node versions. The README indicates support for Node.js ^18.17.0 or >=20.3.0 at the time of retrieval.
- If native build fails, install libvips system packages: on Debian/Ubuntu install libvips-dev and related dependencies; on macOS use brew install vips.

Performance characteristics and internals
- sharp delegates heavy lifting to libvips which is demand-driven and low-memory. Typical resizing is substantially faster and lower-memory than ImageMagick for large images.

Troubleshooting and CI notes
- If npm install fails in CI due to missing binaries, ensure the runner has libvips available or allow sharp to download prebuilt binaries; GitHub Actions virtual environments often include libvips or allow apt-get installs.
- For PNG rasterization of SVG inputs, convert SVG to PNG by piping through sharp using .png() or use an intermediate canvas approach in environments without sharp.

Detailed digest and retrieval
- Source: https://raw.githubusercontent.com/lovell/sharp/main/README.md
- Retrieved: 2026-03-20
- Bytes fetched: 3160
- Extracted: overview, example usage, chaining model, reliance on libvips, installation notes and examples for resizing and output.

Attribution
- Content crawled from sharp README (GitHub) on 2026-03-20, 3160 bytes.
