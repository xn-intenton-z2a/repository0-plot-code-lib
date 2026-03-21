SHARP

Table of contents
1. Purpose and overview
2. Core API signatures (exact)
3. SVG -> PNG conversion pattern (step-by-step)
4. Options and performance notes
5. Troubleshooting
6. Detailed digest (retrieved)
7. Attribution and crawl size

1. Purpose and overview
Sharp is a high-performance image processing library (libvips binding) commonly used to convert images and vector markup (SVG) into raster formats such as PNG. It is suitable for converting generated SVG markup into PNG output for the CLI.

2. Core API signatures (exact)
- import sharp from 'sharp'  (ESM)
- sharp(input: Buffer|string): Sharp
- Sharp.png(options?: object): Sharp
- Sharp.toBuffer(): Promise<Buffer>
- Sharp.toFile(path: string): Promise<object>  (resolves with output metadata)
- Options of interest: density (for rasterising SVG at higher resolution), quality (for JPEG), compressionLevel (PNG), width, height.

3. SVG -> PNG conversion pattern (step-by-step)
1. Produce valid SVG 1.1 string with an explicit viewBox attribute.
2. Convert string to Buffer using Buffer.from(svgString).
3. Call await sharp(svgBuffer).png({compressionLevel:9}).toFile('output.png') or .toBuffer() to obtain PNG bytes.
4. Optionally set width/height or density to control output pixel dimensions and raster quality.

4. Options and performance notes
- Sharp uses libvips which is efficient and low-memory compared to many alternatives. For large output sizes or many parallel conversions, monitor memory and consider queueing.
- For SVG input scaling, specify width/height or density; density scales vector content before rasterisation.

5. Troubleshooting
- Ensure libvips is available (npm install sharp will install prebuilt binaries on many platforms; network or platform restrictions may require building from source).
- SVG syntax errors will cause sharp to fail converting; validate SVG first.

6. Detailed digest (retrieved)
Source: Sharp official documentation
Retrieved: 2026-03-21
Crawl bytes downloaded: 52643
Key extracted facts: sharp(input) entrypoint, toBuffer/toFile asynchronous methods, and options for png conversion.

7. Attribution
Source URL: https://sharp.pixelplumbing.com/
Crawl size (bytes): 52643
License / attribution: See sharp documentation.