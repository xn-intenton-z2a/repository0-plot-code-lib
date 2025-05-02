# SHARP_API

## Crawl Summary
The sharp module offers high-speed image processing using libvips, handling multiple image formats (JPEG, PNG, WebP, GIF, AVIF, TIFF, SVG). Constructors accept diverse inputs with extensive options (failOn, limitInputPixels, autoOrient, raw, create, text, join). Output methods include toFile and toBuffer, with metadata preservation (keepExif, withMetadata) and format-specific options for JPEG, PNG, WebP, etc. It supports stream-based, non-blocking operations, cross-platform installs, and advanced configuration via environment variables and npm flags.

## Normalised Extract
TABLE OF CONTENTS
1. Constructor and Input Options
   - new Sharp([input], [options])
   - Input types: Buffer, ArrayBuffer, Uint8Array, string, Array
   - Options: failOn (string, default 'warning'), limitInputPixels (number, default 268402689), unlimited (boolean, default false), autoOrient (boolean), sequentialRead (boolean, default true), density (number), ignoreIcc (boolean), pages (number), page (number), subifd (number), level (number), pdfBackground (string|Object), animated (boolean), raw (object with width, height, channels, premultiplied), create (object with width, height, channels, background, noise), text (object with parameters: text, font, fontfile, width, height, align, justify, dpi, rgba, spacing, wrap), join (object with across, animated, shim, background, halign, valign).
2. Output Methods
   - toFile(fileOut, [callback]) returns Promise.<Object> (info contains format, size, width, height, channels)
   - toBuffer([options], [callback]) returns Promise.<Buffer> (resolveWithObject returns { data, info })
3. Metadata and Transformation Options
   - keepExif(), withExif(exif), withExifMerge(exif), keepIccProfile(), withIccProfile(icc, [options]), keepMetadata(), withMetadata([options])
4. Format-Specific Methods and Options
   - toFormat(format, options)
   - jpeg([options]): quality (1-100), progressive, chromaSubsampling (default '4:2:0'), optimiseCoding, mozjpeg, trellisQuantisation, overshootDeringing, optimiseScans, quantisationTable
   - png([options]): progressive, compressionLevel (0-9), adaptiveFiltering, palette, quality, effort, colours, dither, force
   - webp([options]): quality, alphaQuality, lossless, nearLossless, smartSubsample, smartDeblock, preset, effort, loop, delay, minSize, mixed, force
   - gif([options]): reuse, progressive, colours, effort, dither, interFrameMaxError, interPaletteMaxError, loop, delay, force
   - jp2([options]), tiff([options]), avif([options]), heif(options), jxl([options]) with respective quality, compression, tile, bitdepth and additional parameters.
5. Implementation Patterns and Best Practices
   - Use clone() to create processing pipelines from a single input stream.
   - Configure environment variables SHARP_IGNORE_GLOBAL_LIBVIPS and SHARP_FORCE_GLOBAL_LIBVIPS for custom libvips handling.
   - Use npm flags (--cpu, --os, --libc) for cross-compiling and multi-platform deployment.
   - Exclude sharp in bundlers (webpack, esbuild, electron) via externals or unpack configurations.
6. Troubleshooting
   - For memory issues on glibc systems, switch to jemalloc.
   - AWS Lambda: include correct binaries; avoid symbolic links; set appropriate memory (e.g., 1536 MB for optimal CPU time).
   - Font errors: set FONTCONFIG_PATH when default fontconfig config is missing.

Detailed Technical Details:
Constructor new Sharp(input, options):
  input: Buffer | ArrayBuffer | Uint8Array | string | Array (joined together)
  options.failOn: string, default 'warning'
  options.limitInputPixels: number | boolean, default 268402689
  options.unlimited: boolean, default false
  options.autoOrient: boolean, default false
  options.sequentialRead: boolean, default true
  options.density: number (default 72)
  options.raw: { width: number, height: number, channels: number, premultiplied?: boolean (default false) }
  options.create: { width: number, height: number, channels: 3|4, background: string|Object, noise?: { type: 'gaussian', mean: number, sigma: number } }
  options.text: { text: string, font?: string, fontfile?: string, width?: number, height?: number, align?: 'left'|'centre'|'center'|'right', justify?: boolean, dpi?: number, rgba?: boolean, spacing?: number, wrap?: 'word'|'char'|'word-char'|'none' }
  options.join: { across: number, animated?: boolean, shim?: number, background?: string|Object, halign?: 'left'|'centre'|'center'|'right', valign?: 'top'|'centre'|'center'|'bottom' }

Output Methods:
  toFile(fileOut, [callback]) throws Error if invalid parameters; returns Promise with info { format, size, width, height, channels, ... }
  toBuffer([{ resolveWithObject: boolean }], [callback]) returns Promise<Buffer> or { data, info } if resolved with object.

Metadata Methods:
  keepExif() returns Sharp
  withExif(exif: Object) returns Sharp
  withExifMerge(exif: Object) returns Sharp
  keepIccProfile() returns Sharp
  withIccProfile(icc: string, [options: { attach: boolean }]) returns Sharp
  keepMetadata() returns Sharp
  withMetadata([options: { orientation?: number, density?: number }]) returns Sharp

Format Methods (Examples):
  sharp('input.jpg').jpeg({ quality: 100, chromaSubsampling: '4:4:4' }).toBuffer()
  sharp(input).png({ palette: true }).toBuffer()
  sharp('in.gif', { animated: true }).gif({ interFrameMaxError: 8 }).toFile('optim.gif')

Clone Method:
  clone() returns a new Sharp instance inheriting input for multiple pipelines.

Troubleshooting Tips:
- Use environment variables for custom libvips handling.
- Configure bundlers (externals for webpack, external for esbuild).
- Set npm install flags for cross-compilation.
- AWS Lambda requires proper binary inclusion and memory size configuration.


## Supplementary Details
IMPLEMENTATION DETAILS
- Constructor parameters: input supports various data types, options include failOn='warning', limitInputPixels=268402689, autoOrient=false, sequentialRead=true, density=72. For raw images, provide dimensions and channel count. For creation of images, options.create must specify width, height, channels and background.
- Output via toFile(fileOut, callback) or toBuffer({ resolveWithObject: true }) returns info including output dimensions and format-specific details such as crop offsets for cropping strategies.
- Metadata management: keepExif() preserves all EXIF, withExif() and withExifMerge() allow explicit control over EXIF data. Similar methods exist for ICC profiles and generic metadata via keepMetadata() and withMetadata().
- Format-specific options:
  JPEG: quality (default 80), progressive (false), chromaSubsampling ('4:2:0' default), optimiseCoding (true), mozjpeg (false).
  PNG: compressionLevel (default 6), adaptiveFiltering (false), quality (100), effort (7), palette (false).
  WebP: quality (80), alphaQuality (100), lossless (false), effort (4), loop (0), delay parameters.
- Clone method allows branching processing pipelines.
- Advanced configuration via npm install flags (--cpu, --os, --libc) for cross-platform support.
- Best practices: Exclude sharp from bundling; for AWS Lambda, package appropriate binaries and ensure high memory configuration (e.g., 1536 MB for optimal CPU allocation).
- Troubleshooting: For font issues, set FONTCONFIG_PATH; for globally installed libvips conflicts, use SHARP_IGNORE_GLOBAL_LIBVIPS or SHARP_FORCE_GLOBAL_LIBVIPS.


## Reference Details
API SPECIFICATIONS AND CODE EXAMPLES
Constructor:
  new Sharp([input: Buffer | ArrayBuffer | Uint8Array | string | Array], [options: Object])
    options.failOn: string (default 'warning')
    options.limitInputPixels: number | boolean (default 268402689)
    options.unlimited: boolean (default false)
    options.autoOrient: boolean (default false)
    options.sequentialRead: boolean (default true)
    options.density: number (default 72)
    options.raw: { width: number, height: number, channels: number, premultiplied?: boolean }
    options.create: { width: number, height: number, channels: number, background: string|Object, noise?: { type: string, mean: number, sigma: number } }
    options.text: { text: string, font?: string, fontfile?: string, width?: number, height?: number, align?: string, justify?: boolean, dpi?: number, rgba?: boolean, spacing?: number, wrap?: string }
    options.join: { across: number, animated?: boolean, shim?: number, background?: string|Object, halign?: string, valign?: string }

Methods:
  clone() ⇒ Sharp
  metadata([callback]) ⇒ Promise.<Object>
    Returns { format, size, width, height, space, channels, depth, density, chromaSubsampling, isProgressive, isPalette, bitsPerSample, pages, pageHeight, loop, delay, pagePrimary, levels, subifds, background, compression, resolutionUnit, hasProfile, hasAlpha, orientation, exif, icc, iptc, xmp, tifftagPhotoshop, formatMagick, comments }
  stats([callback]) ⇒ Promise.<Object>
    Returns channel statistics: { channels: [ { min, max, sum, squaresSum, mean, stdev, minX, minY, maxX, maxY } ], isOpaque, entropy, sharpness, dominant }
  toFile(fileOut: string, [callback]) ⇒ Promise.<Object>
  toBuffer([options: { resolveWithObject?: boolean }], [callback]) ⇒ Promise.<Buffer>

Format Methods:
  toFormat(format: string|Object, options: Object) ⇒ Sharp
  jpeg([options: { quality?: number, progressive?: boolean, chromaSubsampling?: string, optimiseCoding?: boolean, mozjpeg?: boolean, trellisQuantisation?: boolean, overshootDeringing?: boolean, optimiseScans?: boolean, quantisationTable?: number }]) ⇒ Sharp
  png([options: { progressive?: boolean, compressionLevel?: number, adaptiveFiltering?: boolean, palette?: boolean, quality?: number, effort?: number, colours?: number, dither?: number, force?: boolean }]) ⇒ Sharp
  webp([options: { quality?: number, alphaQuality?: number, lossless?: boolean, nearLossless?: boolean, smartSubsample?: boolean, smartDeblock?: boolean, preset?: string, effort?: number, loop?: number, delay?: number|Array<number>, minSize?: boolean, mixed?: boolean, force?: boolean }]) ⇒ Sharp
  gif([options: { reuse?: boolean, progressive?: boolean, colours?: number, effort?: number, dither?: number, interFrameMaxError?: number, interPaletteMaxError?: number, loop?: number, delay?: number|Array<number>, force?: boolean }]) ⇒ Sharp

Code Examples:
  sharp('input.jpg')
    .resize(300, 200)
    .toFile('output.jpg', function(err) {
      // output.jpg is 300x200 with a scaled and cropped version of input.jpg
    });

  const { body } = fetch('https://example.com/image.jpg');
  const readableStream = Readable.fromWeb(body);
  const transformer = sharp()
    .resize(300)
    .on('info', ({ height }) => {
       console.log(`Image height is ${height}`);
    });
  readableStream.pipe(transformer).pipe(writableStream);

  // Creating a blank image
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

Troubleshooting Procedures:
  - For global libvips conflicts, set environment: SHARP_IGNORE_GLOBAL_LIBVIPS=1 or SHARP_FORCE_GLOBAL_LIBVIPS=1
  - For cross-compiling on Linux, run: npm install --cpu=x64 --os=linux --libc=glibc sharp
  - To exclude sharp from webpack bundling, add externals: { 'sharp': 'commonjs sharp' }
  - On AWS Lambda, ensure deployment package includes linux-x64 or linux-arm64 binaries and avoid symbolic links.


## Information Dense Extract
sharp(input, options) where input: Buffer|ArrayBuffer|Uint8Array|string|Array, options:{ failOn:'warning', limitInputPixels:268402689, autoOrient:false, sequentialRead:true, density:72, raw:{width, height, channels, premultiplied:false}, create:{width, height, channels, background, noise:{type:'gaussian', mean, sigma}}, text:{text, font, fontfile, width, height, align, justify, dpi, rgba, spacing, wrap}, join:{across, animated, shim, background, halign, valign} } ; toFile(fileOut, callback) => Promise<{format, size, width, height, channels}>, toBuffer({resolveWithObject}, callback) => Promise<Buffer> or {data, info}; metadata() => Promise<{format, size, width, height, channels,...}>; stats() returns channel stats; methods for keepExif, withExif, withExifMerge, keepIccProfile, withIccProfile, keepMetadata, withMetadata; Format methods: toFormat, jpeg({quality, progressive, chromaSubsampling, optimiseCoding, mozjpeg, trellisQuantisation, overshootDeringing, optimiseScans, quantisationTable}), png({progressive, compressionLevel, adaptiveFiltering, palette, quality, effort, colours, dither, force}), webp({quality, alphaQuality, lossless, nearLossless, smartSubsample, smartDeblock, preset, effort, loop, delay, minSize, mixed, force}), gif({reuse, progressive, colours, effort, dither, interFrameMaxError, interPaletteMaxError, loop, delay, force}); clone() creates new pipeline sharing input; use npm flags --cpu, --os, --libc; set SHARP_IGNORE_GLOBAL_LIBVIPS/SHARP_FORCE_GLOBAL_LIBVIPS; bundlers: externals configuration required.

## Sanitised Extract
TABLE OF CONTENTS
1. Constructor and Input Options
   - new Sharp([input], [options])
   - Input types: Buffer, ArrayBuffer, Uint8Array, string, Array
   - Options: failOn (string, default 'warning'), limitInputPixels (number, default 268402689), unlimited (boolean, default false), autoOrient (boolean), sequentialRead (boolean, default true), density (number), ignoreIcc (boolean), pages (number), page (number), subifd (number), level (number), pdfBackground (string|Object), animated (boolean), raw (object with width, height, channels, premultiplied), create (object with width, height, channels, background, noise), text (object with parameters: text, font, fontfile, width, height, align, justify, dpi, rgba, spacing, wrap), join (object with across, animated, shim, background, halign, valign).
2. Output Methods
   - toFile(fileOut, [callback]) returns Promise.<Object> (info contains format, size, width, height, channels)
   - toBuffer([options], [callback]) returns Promise.<Buffer> (resolveWithObject returns { data, info })
3. Metadata and Transformation Options
   - keepExif(), withExif(exif), withExifMerge(exif), keepIccProfile(), withIccProfile(icc, [options]), keepMetadata(), withMetadata([options])
4. Format-Specific Methods and Options
   - toFormat(format, options)
   - jpeg([options]): quality (1-100), progressive, chromaSubsampling (default '4:2:0'), optimiseCoding, mozjpeg, trellisQuantisation, overshootDeringing, optimiseScans, quantisationTable
   - png([options]): progressive, compressionLevel (0-9), adaptiveFiltering, palette, quality, effort, colours, dither, force
   - webp([options]): quality, alphaQuality, lossless, nearLossless, smartSubsample, smartDeblock, preset, effort, loop, delay, minSize, mixed, force
   - gif([options]): reuse, progressive, colours, effort, dither, interFrameMaxError, interPaletteMaxError, loop, delay, force
   - jp2([options]), tiff([options]), avif([options]), heif(options), jxl([options]) with respective quality, compression, tile, bitdepth and additional parameters.
5. Implementation Patterns and Best Practices
   - Use clone() to create processing pipelines from a single input stream.
   - Configure environment variables SHARP_IGNORE_GLOBAL_LIBVIPS and SHARP_FORCE_GLOBAL_LIBVIPS for custom libvips handling.
   - Use npm flags (--cpu, --os, --libc) for cross-compiling and multi-platform deployment.
   - Exclude sharp in bundlers (webpack, esbuild, electron) via externals or unpack configurations.
6. Troubleshooting
   - For memory issues on glibc systems, switch to jemalloc.
   - AWS Lambda: include correct binaries; avoid symbolic links; set appropriate memory (e.g., 1536 MB for optimal CPU time).
   - Font errors: set FONTCONFIG_PATH when default fontconfig config is missing.

Detailed Technical Details:
Constructor new Sharp(input, options):
  input: Buffer | ArrayBuffer | Uint8Array | string | Array (joined together)
  options.failOn: string, default 'warning'
  options.limitInputPixels: number | boolean, default 268402689
  options.unlimited: boolean, default false
  options.autoOrient: boolean, default false
  options.sequentialRead: boolean, default true
  options.density: number (default 72)
  options.raw: { width: number, height: number, channels: number, premultiplied?: boolean (default false) }
  options.create: { width: number, height: number, channels: 3|4, background: string|Object, noise?: { type: 'gaussian', mean: number, sigma: number } }
  options.text: { text: string, font?: string, fontfile?: string, width?: number, height?: number, align?: 'left'|'centre'|'center'|'right', justify?: boolean, dpi?: number, rgba?: boolean, spacing?: number, wrap?: 'word'|'char'|'word-char'|'none' }
  options.join: { across: number, animated?: boolean, shim?: number, background?: string|Object, halign?: 'left'|'centre'|'center'|'right', valign?: 'top'|'centre'|'center'|'bottom' }

Output Methods:
  toFile(fileOut, [callback]) throws Error if invalid parameters; returns Promise with info { format, size, width, height, channels, ... }
  toBuffer([{ resolveWithObject: boolean }], [callback]) returns Promise<Buffer> or { data, info } if resolved with object.

Metadata Methods:
  keepExif() returns Sharp
  withExif(exif: Object) returns Sharp
  withExifMerge(exif: Object) returns Sharp
  keepIccProfile() returns Sharp
  withIccProfile(icc: string, [options: { attach: boolean }]) returns Sharp
  keepMetadata() returns Sharp
  withMetadata([options: { orientation?: number, density?: number }]) returns Sharp

Format Methods (Examples):
  sharp('input.jpg').jpeg({ quality: 100, chromaSubsampling: '4:4:4' }).toBuffer()
  sharp(input).png({ palette: true }).toBuffer()
  sharp('in.gif', { animated: true }).gif({ interFrameMaxError: 8 }).toFile('optim.gif')

Clone Method:
  clone() returns a new Sharp instance inheriting input for multiple pipelines.

Troubleshooting Tips:
- Use environment variables for custom libvips handling.
- Configure bundlers (externals for webpack, external for esbuild).
- Set npm install flags for cross-compilation.
- AWS Lambda requires proper binary inclusion and memory size configuration.

## Original Source
High-performance Image Processing and SVG Rasterization
https://sharp.pixelplumbing.com/

## Digest of SHARP_API

# Sharp API Documentation

Retrieved: 2023-10-05

## Overview
The sharp module is a high-performance Node.js image processing library which leverages libvips. It supports image conversion, resizing, rotation, extraction, compositing, and gamma correction. The module accepts various input types (Buffer, ArrayBuffer, Uint8Array, string, etc) and supports output in JPEG, PNG, WebP, GIF, AVIF, TIFF, and raw pixel data.

## Installation and Prerequisites
- Install using npm, pnpm, yarn, bun, or deno.
- Prerequisites: Node-API v9 compatible runtime (Node.js >= 18.17.0 or >=20.3.0), C++17 compiler for source builds, node-addon-api v7+ and node-gyp v9+.
- Prebuilt binaries available for common platforms (macOS, Windows, various Linux architectures).

## Constructor and Input Options
### Constructor Signature
- new Sharp([input], [options])

### Parameters for input:
- input: Buffer | ArrayBuffer | Uint8Array | string ...
- options: Object with keys:
  - failOn (string): 'none', 'truncated', 'error', 'warning' (default: 'warning')
  - limitInputPixels (number|boolean): Pixel limit (default: 268402689)
  - unlimited (boolean): Default false
  - autoOrient (boolean): Default false
  - sequentialRead (boolean): Default true
  - density (number): e.g. 72
  - Other keys include: ignoreIcc, pages, page, subifd, level, pdfBackground,
    animated, raw (with raw.width, raw.height, raw.channels, raw.premultiplied), create (with width, height, channels, background, noise), text (with text, font, fontfile, width, height, align, justify, dpi, rgba, spacing, wrap), join (with across, animated, shim, background, halign, valign).

## Output Options
### File or Buffer output methods
- toFile(fileOut, [callback]) : Writes image to file. Returns Promise.<Object> with info such as format, size, width, height, channels.
- toBuffer([options], [callback]) : Returns a Promise.<Buffer> with optional { resolveWithObject: true } for obtaining { data, info }.

### Metadata and Format Options
- keepExif() : Retains EXIF metadata.
- withExif(exif) : Sets EXIF metadata in output image. exif is an object keyed by IFD0, IFD1, etc.
- withExifMerge(exif) : Merges given EXIF data into input metadata.
- keepIccProfile() : Retains ICC profile.
- withIccProfile(icc, [options]) : Attaches ICC profile. Options: { attach: true } by default.
- keepMetadata() : Keeps all input metadata (EXIF, ICC, XMP, IPTC).
- withMetadata([options]) : Updates orientation and density; options include orientation (number 1-8) and density (number DPI).
- toFormat(format, options) : Forces output format, where format can be a string or object with id and options.

## Format-Specific API Options
### JPEG
- Method: jpeg([options])
- Options:
  - quality (number): default 80, range 1-100
  - progressive (boolean): default false
  - chromaSubsampling (string): default '4:2:0', can be '4:4:4'
  - optimiseCoding/optimizeCoding (boolean): default true
  - mozjpeg (boolean): default false
  - trellisQuantisation (boolean): default false, overshootDeringing (boolean), optimiseScans (boolean), quantisationTable (number): default 0

### PNG
- Method: png([options])
- Options:
  - progressive (boolean): default false
  - compressionLevel (number): default 6
  - adaptiveFiltering (boolean): default false
  - palette (boolean): default false
  - quality (number): default 100
  - effort (number): default 7
  - colours/colors (number): default 256
  - dither (number): default 1.0
  - force (boolean): default true

### WebP
- Method: webp([options])
- Options:
  - quality (number): default 80
  - alphaQuality (number): default 100
  - lossless (boolean): default false
  - nearLossless (boolean): default false
  - smartSubsample (boolean): default false
  - smartDeblock (boolean): default false
  - preset (string): default 'default'
  - effort (number): default 4
  - loop (number): default 0 (animation), delay (number|Array)
  - minSize (boolean): default false
  - mixed (boolean): default false
  - force (boolean): default true

### GIF
- Method: gif([options])
- Options:
  - reuse (boolean): default true
  - progressive (boolean): default false
  - colours/colors (number): default 256
  - effort (number): default 7
  - dither (number): default 1.0
  - interFrameMaxError (number): default 0
  - interPaletteMaxError (number): default 3
  - loop (number): default 0
  - delay (number|Array): in ms
  - force (boolean): default true

### Additional Format Options
- JP2, TIFF, AVIF, HEIF, JXL: Each method (jp2([options]), tiff([options]), avif([options]), heif(options), jxl([options])) contains format-specific quality, compression, tile, bitdepth, resolution options.

## Implementation Patterns and Best Practices
- Use stream pipelines for non-blocking operations and multi-output processing by using .clone() on a sharp instance.
- For multi-platform or cross-compiling, use npm flags: --platform, --arch, --libc.
- If using pnpm, add sharp to ignoredBuiltDependencies or onlyBuiltDependencies.
- For bundlers (webpack, esbuild, electron-builder) ensure sharp is excluded via externals or unpacking rules.

## Troubleshooting and Environment Configuration
- Cross-target install: Use flags (--cpu, --os, --libc) to specify target architecture and C standard library.
- For globally-installed libvips, set SHARP_IGNORE_GLOBAL_LIBVIPS or SHARP_FORCE_GLOBAL_LIBVIPS to control detection.
- On Linux with glibc, consider using jemalloc to avoid memory fragmentation.
- AWS Lambda: Ensure node_modules include relevant linux-x64 or linux-arm64 binaries, avoid symbolic links.
- For font rendering, set FONTCONFIG_PATH when default fontconfig config is missing.

## Attribution
Data Size: 7758167 bytes; Links Found: 18982; No errors encountered in crawl.

## Attribution
- Source: High-performance Image Processing and SVG Rasterization
- URL: https://sharp.pixelplumbing.com/
- License: License: MIT
- Crawl Date: 2025-05-02T16:50:45.421Z
- Data Size: 7758167 bytes
- Links Found: 18982

## Retrieved
2025-05-02
