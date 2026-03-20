NORMALISED EXTRACT

Purpose: concise API reference for sharp output generation and PNG rendering.

TABLE OF CONTENTS
- Core behaviours (format inference, metadata)
- Primary methods (toFile, toBuffer, toFormat)
- PNG-specific notes
- Error and callback/Promise behaviour

1) Core behaviours
- sharp(input) constructs a pipeline from Buffer|TypedArray|String|ReadableStream|Object.
- Output format: if not explicitly set, format is inferred from the file extension when using toFile; supported inferred formats include jpeg, png, webp, tiff, avif, gif and others supported by libvips.
- By default metadata (including EXIF orientation) is removed; use withMetadata/keepExif options to preserve or attach metadata.

2) Primary methods (signatures)
- toFile(fileOut, [callback]) ⇒ Promise<Object> when callback omitted. Writes output image to fileOut; format inferred from fileOut extension when no explicit format is selected.
- toBuffer([options]) ⇒ Promise<Buffer>. Returns raw output bytes suitable for writing or piping.
- toFormat(format, [options]) ⇒ Sharp. Force output format irrespective of extension.
- png([options]) ⇒ Sharp. Sets PNG-specific options on the pipeline.

3) PNG-specific notes (implementation-critical)
- Call pattern: await sharp(input).png({ compressionLevel, palette, quality, adaptiveFiltering }).toBuffer(); or use .toFile('out.png').
- toFile('out.png') will write a PNG file with standard PNG header (89 50 4E 47 0D 0A 1A 0A) when PNG output is selected.
- PNG options: compressionLevel integer (commonly 0-9), palette boolean to quantize; check sharp docs for full option set.

4) Error and callback/Promise behaviour
- Both toFile and toBuffer accept an optional node-style callback(err, info); if omitted they return a Promise.
- Ensure directories and permissions exist when using toFile; errors propagate via Promise rejection or callback err.

SUPPLEMENTARY DETAILS
- Use toBuffer when you need the bytes in memory (e.g., to pipe to HTTP responses or to pass into other libraries).
- Use toFile for direct file writes; format inference simplifies CLI where file extension defines output format.
- For streaming pipelines, pass sharp() output to stream-based consumers and handle backpressure.

REFERENCE DETAILS
- Exact signatures (as observed):
  - toFile(fileOut, [callback]) ⇒ Promise.<Object> when callback omitted.
  - toBuffer([options]) ⇒ Promise.<Buffer>.
  - png([options]) ⇒ Sharp instance; options documented on sharp site.
- Example patterns:
  - await sharp(input).png().toFile('out.png');
  - const buf = await sharp(input).png({palette:true}).toBuffer();

DETAILED DIGEST
- Source: sharp docs "Output options" (sharp.pixelplumbing.com/api-output), retrieved 2026-03-20.
- Retrieved bytes: 186424 bytes.

ATTRIBUTION
- URL: https://sharp.pixelplumbing.com/api-output
- Retrieved: 2026-03-20
- Bytes crawled: 186424
