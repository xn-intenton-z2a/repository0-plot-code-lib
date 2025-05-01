# SHARP_IMAGE

## Crawl Summary
Sharp library provides high speed image processing using libvips. Key specifications include handling multiple image formats for input and output, advanced metadata and ICC profile management, and specialized API methods (metadata, stats, toFile, toBuffer). Installation supports multiple package managers and cross-platform prebuilt binaries. Detailed configuration options exist for each output format (jpeg, png, webp, gif, jp2, tiff, avif, heif, jxl) including quality, compression, progressive scanning, and more.

## Normalised Extract
Table of Contents:
1. Installation & Prerequisites
   - npm install sharp | pnpm add sharp | yarn add sharp
   - Node-API v9 compatible runtime, C++17 compiler, node-addon-api, node-gyp
2. Supported Formats
   - Input: JPEG, PNG, WebP, GIF, AVIF, TIFF, SVG, Raw Pixel Data
   - Output: JPEG, PNG, WebP, GIF, AVIF, TIFF, Raw Pixel Data
3. Performance Details
   - libvips based, non-blocking operations, multi-core usage, Lanczos resampling
4. Constructor and Options
   - Constructor signature: new Sharp([input], [options])
   - Input types: Buffer, ArrayBuffer, Uint8Array, string (file path), or array of these
   - Options include: failOn (values: none, truncated, error, warning), limitInputPixels (default 268402689), autoOrient (false), sequentialRead (true), density (72), pages, page, raw, create, text, join
5. API Methods
   - metadata(callback): Returns Promise with properties: format, size, width, height, channels, etc.
   - stats(callback): Returns Promise with per-channel statistics and image properties
   - toFile(fileOut, [callback]): Writes image to file, returns Promise with info object
   - toBuffer([options], [callback]): Writes image to a Buffer; options include resolveWithObject
6. Metadata and Profile Management
   - keepExif, withExif, withExifMerge for EXIF data
   - keepIccProfile, withIccProfile for ICC profiles
   - keepMetadata, withMetadata for overall metadata retention
7. Output Format Methods
   - toFormat(format, options)
   - jpeg(options): quality (1-100, default 80), progressive (false), chromaSubsampling (4:2:0 defaults; use '4:4:4' to disable)
   - png(options): compressionLevel (0-9, default 6), progressive (false), adaptiveFiltering, palette, quality, effort, dither
   - webp(options): quality, alphaQuality, lossless, nearLossless, smartSubsample, smartDeblock, preset, effort, loop, delay
   - gif(options): reuse palette, progressive, colours, effort, dither, interFrameMaxError, interPaletteMaxError, loop, delay
   - Additional methods: jp2, tiff, avif, heif, jxl with specific parameters
8. Code Examples
   - Provided examples for resizing, streaming input, creating blank images, converting animated images
9. Environment and Troubleshooting
   - Use SHARP_IGNORE_GLOBAL_LIBVIPS / SHARP_FORCE_GLOBAL_LIBVIPS
   - Bundler configurations for webpack, esbuild, electron
   - Fontconfig errors and AWS Lambda deployment notes

## Supplementary Details
Installation: npm install sharp; Options: { failOn: 'warning', limitInputPixels: 268402689, autoOrient: false, sequentialRead: true, density: 72, pages: 1, page: 0, raw: { width, height, channels, premultiplied: false }, create: { width, height, channels, background }, text: { text, font, width, height, align, justify, dpi, rgba, spacing, wrap }, join: { across, animated, shim, background, halign, valign } }.

For cross-platform installs: npm install --cpu=x64 --os=linux --libc=glibc sharp

Troubleshooting Steps: 
1. Verify prebuilt binaries match OS and CPU.
2. If using a global libvips, set SHARP_FORCE_GLOBAL_LIBVIPS or SHARP_IGNORE_GLOBAL_LIBVIPS.
3. For font errors, set FONTCONFIG_PATH.
4. AWS Lambda: Ensure deployment package includes correct linux-x64 or linux-arm64 binaries without symbolic links.

Code example for animated image conversion:
sharp('in.gif', { animated: true })
  .toFile('out.webp')
  .then(info => console.log(info))
  .catch(err => console.error(err));

## Reference Details
Constructor: new Sharp([input: Buffer|ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|Uint16Array|Int16Array|Uint32Array|Int32Array|Float32Array|Float64Array|string|Array], [options: Object])
Options Object Parameters:
  failOn: string (default 'warning')
  limitInputPixels: number|boolean (default 268402689)
  unlimited: boolean (default false)
  autoOrient: boolean (default false)
  sequentialRead: boolean (default true)
  density: number (default 72)
  ignoreIcc: boolean (default false)
  pages: number (default 1)
  page: number (default 0)
  subifd: number (default -1)
  level: number (default 0)
  pdfBackground: string|Object
  animated: boolean (default false)
  raw: { width: number, height: number, channels: number, premultiplied?: boolean }
  create: { width: number, height: number, channels: number, background: string|Object, noise?: { type: string, mean: number, sigma: number } }
  text: { text: string, font?: string, fontfile?: string, width?: number, height?: number, align?: string, justify?: boolean, dpi?: number, rgba?: boolean, spacing?: number, wrap?: string }
  join: { across: number, animated?: boolean, shim?: number, background?: string|Object, halign?: string, valign?: string }

Method: metadata([callback]) returns Promise<Object>
Method: stats([callback]) returns Promise<Object>
Method: toFile(fileOut: string, [callback]) returns Promise<Object>
Method: toBuffer([options: {resolveWithObject?: boolean}], [callback]) returns Promise<Buffer>

Example Code:
  // Resize and output file
  sharp('input.jpg')
    .resize(300, 200)
    .toFile('output.jpg', (err, info) => {
      if (err) throw err;
      // info: { format, size, width, height, channels, premultiplied }
    });

  // Stream processing with info event
  const { body } = fetch('https://...');
  const readableStream = Readable.fromWeb(body);
  const transformer = sharp()
    .resize(300)
    .on('info', ({ height }) => {
      console.log('Image height is', height);
    });
  readableStream.pipe(transformer).pipe(writableStream);

Configuration for bundlers:
  webpack externals: { 'sharp': 'commonjs sharp' }
  esbuild: external: ['sharp']
  electron-builder: { asarUnpack: ['**/node_modules/sharp/**/*', '**/node_modules/@img/**/*'] }

Troubleshooting Commands:
  - To force build from source: npm install --build-from-source sharp
  - To install custom libvips: set pkg-config path via pkg-config --modversion vips-cpp
  - On FreeBSD: pkg install -y pkgconf vips

Best Practices:
  - Use clone() method to branch processing pipelines for single input streams.
  - Always check metadata with .metadata() before processing multi-page images.


## Information Dense Extract
Sharp: new Sharp([input], [options]); options: failOn ('warning'), limitInputPixels 268402689, autoOrient false, sequentialRead true, density 72, pages default 1; API: metadata() => Promise<{format,size,width,height,channels,...}>; stats() => Promise<{channels[],isOpaque,entropy,sharpness,dominant}>; toFile(file, cb) => Promise; toBuffer(opts) => Promise<Buffer>; Methods for ICC/EXIF: keepExif(), withExif(exif), withExifMerge(exif), keepIccProfile(), withIccProfile(icc, opts), keepMetadata(), withMetadata(opts); Format methods: jpeg({quality, progressive, chromaSubsampling, mozjpeg,...}), png({compressionLevel, progressive, adaptiveFiltering, palette}), webp({quality, alphaQuality, lossless}), gif({reuse, progressive, colours, effort, dither, loop, delay}), jp2, tiff, avif, heif, jxl; Bundler config: webpack externals, esbuild external, electron asarUnpack; Troubleshooting: use SHARP_FORCE_GLOBAL_LIBVIPS, FONTCONFIG_PATH; Code patterns: clone(), stream pipelines, Promise handling

## Sanitised Extract
Table of Contents:
1. Installation & Prerequisites
   - npm install sharp | pnpm add sharp | yarn add sharp
   - Node-API v9 compatible runtime, C++17 compiler, node-addon-api, node-gyp
2. Supported Formats
   - Input: JPEG, PNG, WebP, GIF, AVIF, TIFF, SVG, Raw Pixel Data
   - Output: JPEG, PNG, WebP, GIF, AVIF, TIFF, Raw Pixel Data
3. Performance Details
   - libvips based, non-blocking operations, multi-core usage, Lanczos resampling
4. Constructor and Options
   - Constructor signature: new Sharp([input], [options])
   - Input types: Buffer, ArrayBuffer, Uint8Array, string (file path), or array of these
   - Options include: failOn (values: none, truncated, error, warning), limitInputPixels (default 268402689), autoOrient (false), sequentialRead (true), density (72), pages, page, raw, create, text, join
5. API Methods
   - metadata(callback): Returns Promise with properties: format, size, width, height, channels, etc.
   - stats(callback): Returns Promise with per-channel statistics and image properties
   - toFile(fileOut, [callback]): Writes image to file, returns Promise with info object
   - toBuffer([options], [callback]): Writes image to a Buffer; options include resolveWithObject
6. Metadata and Profile Management
   - keepExif, withExif, withExifMerge for EXIF data
   - keepIccProfile, withIccProfile for ICC profiles
   - keepMetadata, withMetadata for overall metadata retention
7. Output Format Methods
   - toFormat(format, options)
   - jpeg(options): quality (1-100, default 80), progressive (false), chromaSubsampling (4:2:0 defaults; use '4:4:4' to disable)
   - png(options): compressionLevel (0-9, default 6), progressive (false), adaptiveFiltering, palette, quality, effort, dither
   - webp(options): quality, alphaQuality, lossless, nearLossless, smartSubsample, smartDeblock, preset, effort, loop, delay
   - gif(options): reuse palette, progressive, colours, effort, dither, interFrameMaxError, interPaletteMaxError, loop, delay
   - Additional methods: jp2, tiff, avif, heif, jxl with specific parameters
8. Code Examples
   - Provided examples for resizing, streaming input, creating blank images, converting animated images
9. Environment and Troubleshooting
   - Use SHARP_IGNORE_GLOBAL_LIBVIPS / SHARP_FORCE_GLOBAL_LIBVIPS
   - Bundler configurations for webpack, esbuild, electron
   - Fontconfig errors and AWS Lambda deployment notes

## Original Source
Sharp Image Processing Library Documentation
https://sharp.pixelplumbing.com/

## Digest of SHARP_IMAGE

# Sharp Image Processing Library Documentation

Date Retrieved: 2023-10-06

## Overview
The Sharp library is a high performance Node.js image processing module which utilizes libvips for fast, efficient image operations. It supports various image formats (JPEG, PNG, WebP, GIF, AVIF, TIFF, SVG) and operations such as resizing, rotation, extraction, compositing, and gamma correction.

## Installation & Prerequisites
- Installation via npm, pnpm, yarn, bun, or deno.
- Requires Node-API v9 compatible runtime (e.g. Node.js >= 18.17.0 or >= 20.3.0).
- Prebuilt binaries provided for macOS, Linux, Windows with support for different architectures and dependencies.

Examples:
  npm install sharp
  pnpm add sharp
  yarn add sharp

Prerequisites include a C++17 compiler, node-addon-api (v7+), and node-gyp (v9+). Use npm install --build-from-source flag when needed.

## Supported Formats
- Input: JPEG, PNG, WebP, GIF, AVIF, TIFF, SVG, raw pixel arrays
- Output: JPEG, PNG, WebP, GIF, AVIF, TIFF, raw pixel data

## Performance and Processing
- Uses libvips for high speed image processing; typically 4x-5x faster than alternatives.
- Only processes small regions in memory and leverages multi-core, non-blocking I/O (libuv, async/await support).
- Optimizations include: mozjpeg, pngquant, Huffman table optimization, and PNG filtering adjustments.

## Constructor and Basic Usage
- Constructor: new Sharp([input], [options])
- Input parameter types include Buffer, ArrayBuffer, Uint8Array, string (file path), or arrays of these types.
- Options include parameters such as failOn, limitInputPixels, autoOrient, sequentialRead, density, ignoreIcc, pages, page, subifd, level, pdfBackground, animated, raw (with width, height, channels, premultiplied), create, text, and join.

## API Methods
### metadata(callback?)
Returns Promise<Object> with properties:
  format, size, width, height, space, channels, depth, density, chromaSubsampling, isProgressive, isPalette, bitsPerSample, pages, pageHeight, loop, delay, pagePrimary, levels, subifds, background, compression, resolutionUnit, hasProfile, hasAlpha, orientation, exif, icc, iptc, xmp, tifftagPhotoshop, formatMagick, comments

### stats(callback?)
Returns Promise<Object> with statistics:
  channels (min, max, sum, squaresSum, mean, stdev, minX, minY, maxX, maxY), isOpaque, entropy, sharpness, dominant

### toFile(fileOut, callback?)
Writes output image to file and returns Promise<Object> containing image info (format, size, dimensions, channels, premultiplied and crop or animated details).

### toBuffer(options?, callback?)
Writes output image to a Buffer. Options include resolveWithObject to return both data and info.

### Metadata and ICC Handling
- keepExif(): Retains original EXIF metadata.
- withExif(exif): Sets EXIF metadata to given object.
- withExifMerge(exif): Merges EXIF metadata from input with provided values.
- keepIccProfile(): Retains ICC profile from input.
- withIccProfile(icc, options?): Changes ICC profile (built-in names: srgb, p3, cmyk) and attaches it to the output.
- keepMetadata(): Retains all metadata (EXIF, ICC, XMP, IPTC).
- withMetadata(options?): Keeps metadata and can update orientation and density.

### Format Conversion Methods
- toFormat(format, options?): Force output to provided format.
- jpeg(options?): JPEG options include quality, progressive, chromaSubsampling, optimiseCoding/optimizeCoding, mozjpeg, trellisQuantisation, overshootDeringing, optimiseScans/optimizeScans, quantisationTable.
- png(options?): PNG options include progressive, compressionLevel, adaptiveFiltering, palette, quality, effort, colours/colors, dither, force.
- webp(options?): WebP options include quality, alphaQuality, lossless, nearLossless, smartSubsample, smartDeblock, preset, effort, loop, delay, minSize, mixed, force.
- gif(options?): GIF options include reuse, progressive, colours/colors, effort, dither, interFrameMaxError, interPaletteMaxError, loop, delay, force.
- jp2(options?): JP2 options include quality, lossless, tileWidth, tileHeight, chromaSubsampling.
- tiff(options?): TIFF options include quality, force, compression, predictor, pyramid, tile, tileWidth, tileHeight, xres, yres, resolutionUnit, bitdepth, miniswhite.
- avif(options?): AVIF options include quality, lossless, effort, chromaSubsampling, bitdepth.
- heif(options?): HEIF options include compression (av1, hevc), quality, lossless, effort, chromaSubsampling, bitdepth.
- jxl(options?): Experimental JPEG-XL options include distance, quality, and additional parameters.

## Code Examples
Example: Resizing an image
  sharp('input.jpg')
    .resize(300, 200)
    .toFile('output.jpg', function(err) {
      // output.jpg is 300x200 pixels
    });

Example: Reading image from stream with info event
  const { body } = fetch('https://...');
  const readableStream = Readable.fromWeb(body);
  const transformer = sharp()
    .resize(300)
    .on('info', ({ height }) => {
      console.log(`Image height is ${height}`);
    });
  readableStream.pipe(transformer).pipe(writableStream);

Example: Creating a blank image
  sharp({
    create: {
      width: 300,
      height: 200,
      channels: 4,
      background: { r: 255, g: 0, b: 0, alpha: 0.5 }
    }
  })
  .png()
  .toBuffer()
  .then(...);

## Environmental Configuration
- Custom binaries: Use environment variables SHARP_IGNORE_GLOBAL_LIBVIPS and SHARP_FORCE_GLOBAL_LIBVIPS.
- Cross compiling: Use flags --platform, --arch, --libc during installation.
- Bundler Integration: For webpack, esbuild, electron-builder, electron-forge, and vite, exclude sharp from bundling via configuration options.

## Troubleshooting
- Fontconfig errors: Set FONTCONFIG_PATH if default config missing.
- AWS Lambda: Ensure package includes correct binaries and avoid symbolic links in deployment package.
- Memory allocator issues: Consider using jemalloc on glibc systems for improved performance.

## Attribution & Data Size
Data Size Crawled: 7538466 bytes, Links Found: 18912, No errors detected.

## Attribution
- Source: Sharp Image Processing Library Documentation
- URL: https://sharp.pixelplumbing.com/
- License: MIT
- Crawl Date: 2025-05-01T14:47:34.218Z
- Data Size: 7538466 bytes
- Links Found: 18912

## Retrieved
2025-05-01
