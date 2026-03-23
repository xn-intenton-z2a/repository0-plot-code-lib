SHARP_API

Normalised extract

Table of contents
1. Input types and density for SVG rasterization
2. Core method signatures
3. PNG output options and behaviour
4. Implementation pattern for SVG->PNG conversion

Details

1. Input types and density for SVG rasterization
- sharp(input[, options]) accepts Buffer, string file path, Uint8Array, or Readable stream. When input is SVG source, the input options object may include density: number which controls the rasterization DPI for vector inputs.
- Recommended pattern for high-resolution PNGs: supply SVG as a Buffer and pass a density value (e.g., 150-300) when creating the Sharp instance to increase raster resolution.

2. Core method signatures
sharp(input: Buffer | string | Uint8Array | Readable, options?: object): SharpInstance
SharpInstance.png([options]): SharpInstance
SharpInstance.toFile(outputPath: string): Promise<{ format: string, size: number, width: number, height: number, channels: number }>
SharpInstance.toBuffer([options]): Promise<Buffer>

3. PNG output options and behaviour
- png options include compressionLevel (0-9), quality (for palette-based) and progressive boolean. Exact option names vary by format; consult API for version-specific knobs.
- toFile returns a Promise resolving with metadata about the written image (size bytes, dimensions, format).

4. Implementation pattern for SVG->PNG conversion
- Build SVG string (valid SVG 1.1) and include viewBox attribute.
- Create Sharp with svgBuffer and density option: sharp(Buffer.from(svgString), { density: 300 })
- Call .png({ compressionLevel: 9 }) or desired options and then .toFile('out.png') or .toBuffer() to get binary PNG data.
- Check returned metadata to confirm width/height and file size.

Reference details (signatures)
sharp(input: Buffer | string | Uint8Array | Readable, options?: object): Sharp
Sharp.png(options?: object): Sharp
Sharp.toFile(path: string): Promise<{ format: string, size: number, width: number, height: number, channels: number }>
Sharp.toBuffer(options?: object): Promise<Buffer>

Digest
Source: https://sharp.pixelplumbing.com/api-input
Retrieved: 2026-03-23
Downloaded bytes: 65731

Attribution
Content originated from Sharp documentation (sharp.pixelplumbing.com). See source URL above.
