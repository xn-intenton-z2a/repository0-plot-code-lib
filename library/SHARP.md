# SHARP

## Crawl Summary
The crawled content provides detailed technical specifications for the Sharp Node.js module. It specifies installation commands, supported image formats (both input and output), performance optimizations using libvips, and a comprehensive API covering constructor parameters, metadata extraction, pixel statistics, various output methods (toFile, toBuffer) and multiple image format conversion options (jpeg, png, webp, gif, jp2, tiff, avif, heif, jxl). It includes exact parameter names, default values and complete code examples to guide developers directly.

## Normalised Extract
## Table of Contents

1. Installation
   - Package manager commands
   - Prerequisites and prebuilt binaries
2. Supported Formats
   - Input and output formats
3. Constructor
   - Signature: `new Sharp([input], [options])`
   - Parameter Types and defaults (failOn, limitInputPixels, autoOrient, sequentialRead, density, raw, create, text, join)
4. Input and Metadata Methods
   - `metadata([callback]) ⇒ Promise<Object>` with full return object keys
   - `stats([callback]) ⇒ Promise<Object>`
5. Output Options
   - Methods: `toFile(fileOut, [callback])`, `toBuffer([options], [callback])`
   - Configuration: Removing/keeping metadata via `keepExif`, `withExif`, `keepIccProfile`, `withIccProfile`, `keepMetadata`, and `withMetadata`
6. Format Conversion Methods
   - `jpeg([options])`, `png([options])`, `webp([options])`, `gif([options])`, `jp2([options])`, `tiff([options])`, `avif([options])`, `heif([options])`, and `jxl([options])`
7. Advanced Methods
   - `clone()` method for snapshot instances
   - Complex processing pipelines with multiple clones

---

### Installation

Commands:
```bash
npm install sharp
pnpm add sharp
yarn add sharp
bun add sharp
```

### Constructor & Options

```js
// Constructor signature
new Sharp(input, options);

// Valid input types: Buffer, ArrayBuffer, TypedArray, string (filepath)
// Example options:
{
  failOn: 'warning',
  limitInputPixels: 268402689,
  autoOrient: false,
  sequentialRead: true,
  density: 72,
  raw: { width: 2, height: 1, channels: 3 },
  create: { width: 300, height: 200, channels: 4, background: { r: 255, g: 0, b: 0, alpha: 0.5 } },
  text: { text: 'Hello, world!', font: 'sans', width: 400, height: 300, rgba: true },
  join: { across: 2, shim: 4 }
}
```

### Input Metadata and Stats

```js
// Retrieve metadata
const metadata = await sharp(input).metadata();

// Retrieve channel stats
const stats = await sharp(input).stats();
```

### Output Options

```js
// Write to file
sharp(input).toFile('output.png')
  .then(info => console.log(info))
  .catch(err => console.error(err));

// Write to buffer
sharp(input).png().toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => { /* use data and info */ });
```

### Metadata Preservation

```js
// Keep EXIF
sharp(input).keepExif().toBuffer();

// Set EXIF explicitly
sharp(input).withExif({ IFD0: { Copyright: 'The National Gallery' } }).toBuffer();
```

### Format Conversions

```js
// JPEG conversion
sharp(input).jpeg({ quality: 100, chromaSubsampling: '4:4:4' }).toBuffer();

// PNG conversion with indexed palette
sharp(input).png({ palette: true }).toBuffer();

// WebP conversion
sharp(input).webp({ lossless: true }).toBuffer();

// Animated GIF conversion
sharp('in.gif', { animated: true }).gif().toFile('animated.gif');
```

### Advanced Usage: clone() and Pipelines

```js
const pipeline = sharp().rotate();
pipeline.clone().resize(800, 600).pipe(firstWritableStream);
pipeline.clone().extract({ left: 20, top: 20, width: 100, height: 100 }).pipe(secondWritableStream);
```

### Complex Pipeline Example

Refer to the code example in the Digest section for processing an image stream from a remote URL, cloning pipelines, and handling output file operations.


## Supplementary Details
## Supplementary Technical Specifications

- **Constructor Options:** Detailed parameter types including buffer, array types, raw, create, and text creation. Each has precise keys such as width, height, channels, background, noise, text properties (font, fontfile, align, justify, dpi, rgba, spacing, wrap).

- **Output Methods:** `toFile` and `toBuffer` remove metadata by default. To preserve metadata use `keepExif`, `withMetadata`. Options control formatting like quality, progressive scanning for JPEG; compression level, adaptive filtering for PNG; quality, alphaQuality, lossless and nearLossless for WebP; palette reuse and dithering for GIF.

- **Advanced Configuration:** Cross-platform installation details using npm flags (`--cpu`, `--os`, `--libc`). Custom libvips integration via environment variables such as `SHARP_IGNORE_GLOBAL_LIBVIPS` and `SHARP_FORCE_GLOBAL_LIBVIPS`.

- **Troubleshooting:**
  - For cross-compilation: use `npm_config_platform`, `npm_config_arch`, `npm_config_libc`.
  - On Linux, consider switching to jemalloc to avoid memory fragmentation.
  - For AWS Lambda, ensure correct binaries (linux-x64 or linux-arm64) are bundled without symbolic links.
  - For electron packaging, use `asarUnpack` or `unpack` configuration in electron-builder and electron-forge.


## Reference Details
## Complete API Specifications and Code Examples

### Sharp Constructor

**Signature:**
```js
new Sharp(input: Buffer | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array | string | Array, options?: {
  failOn?: 'none' | 'truncated' | 'error' | 'warning',
  limitInputPixels?: number | boolean,
  unlimited?: boolean,
  autoOrient?: boolean,
  sequentialRead?: boolean,
  density?: number,
  ignoreIcc?: boolean,
  pages?: number,
  page?: number,
  subifd?: number,
  level?: number,
  pdfBackground?: string | Object,
  animated?: boolean,
  raw?: { width: number, height: number, channels: number, premultiplied?: boolean },
  create?: { width: number, height: number, channels: number, background: string | Object, noise?: { type: 'gaussian', mean: number, sigma: number } },
  text?: { text: string, font?: string, fontfile?: string, width?: number, height?: number, align?: 'left' | 'centre' | 'center' | 'right', justify?: boolean, dpi?: number, rgba?: boolean, spacing?: number, wrap?: 'word' | 'char' | 'word-char' | 'none' },
  join?: { across?: number, animated?: boolean, shim?: number, background?: string | Object, halign?: 'left' | 'centre' | 'center' | 'right', valign?: 'top' | 'centre' | 'center' | 'bottom' }
})
```

**Throws:**
- Error for invalid parameters.

### Metadata and Stats Methods

**metadata(callback?: function): Promise<Object>**

Returns an Object with keys:
- format, size, width, height, space, channels, depth, density, chromaSubsampling,
  isProgressive, isPalette, bitsPerSample, pages, pageHeight, loop, delay, pagePrimary,
  levels, subifds, background, compression, resolutionUnit, hasProfile, hasAlpha, orientation,
  exif, icc, iptc, xmp, tifftagPhotoshop, formatMagick, comments.

**stats(callback?: function): Promise<Object>**

Returns an Object:
```js
{
  channels: [{ min, max, sum, squaresSum, mean, stdev, minX, minY, maxX, maxY }],
  isOpaque: boolean,
  entropy: number,
  sharpness: number,
  dominant: { r: number, g: number, b: number }
}
```

### Output Methods

#### toFile

**Signature:**
```js
toFile(fileOut: string, callback?: (err: Error, info: Object) => void): Promise<Object>
```

- **info Object:** Contains output format, size, width, height, channels, premultiplied, cropOffsetLeft, cropOffsetTop, attentionX, attentionY, pageHeight, pages, textAutofitDpi.

**Example:**
```js
sharp('input.jpg').toFile('output.png', (err, info) => { /* ... */ });
```

#### toBuffer

**Signature:**
```js
toBuffer(options?: { resolveWithObject?: boolean }, callback?: (err: Error, data: Buffer, info: Object) => void): Promise<Buffer>
```

**Example:**
```js
sharp('input.jpg').png().toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => { /* process data */ });
```

#### Metadata Preservation Methods

- **keepExif(): Sharp**
- **withExif(exif: Object): Sharp**
- **withExifMerge(exif: Object): Sharp**
- **keepIccProfile(): Sharp**
- **withIccProfile(icc: string, options?: { attach?: boolean }): Sharp**
- **keepMetadata(): Sharp**
- **withMetadata(options?: { orientation?: number, density?: number }): Sharp**

**Example:**
```js
sharp('input.jpg').withExif({ IFD0: { Copyright: "The National Gallery" } })
  .toBuffer();
```

### Format Conversion Methods

#### jpeg([options])

**Options:**
```js
{
  quality?: number,              // default: 80
  progressive?: boolean,         // default: false
  chromaSubsampling?: string,    // default: '4:2:0'
  optimiseCoding?: boolean,      // default: true
  mozjpeg?: boolean,             // default: false
  trellisQuantisation?: boolean, // default: false
  overshootDeringing?: boolean,  // default: false
  quantisationTable?: number,    // default: 0,
  force?: boolean                // default: true
}
```

#### png([options])

**Options:**
```js
{
  progressive?: boolean,         // default: false
  compressionLevel?: number,     // default: 6
  adaptiveFiltering?: boolean,   // default: false
  palette?: boolean,             // default: false
  quality?: number,              // default: 100
  effort?: number,               // default: 7
  colours?: number,              // default: 256
  dither?: number,               // default: 1.0
  force?: boolean                // default: true
}
```

#### webp([options])

**Options:**
```js
{
  quality?: number,         // default: 80
  alphaQuality?: number,    // default: 100
  lossless?: boolean,       // default: false
  nearLossless?: boolean,   // default: false
  smartSubsample?: boolean, // default: false
  smartDeblock?: boolean,   // default: false
  preset?: string,          // default: 'default'
  effort?: number,          // default: 4
  loop?: number,            // default: 0
  delay?: number | number[],
  minSize?: boolean,        // default: false
  mixed?: boolean,          // default: false
  force?: boolean           // default: true
}
```

#### gif([options])

**Options:**
```js
{
  reuse?: boolean,            // default: true
  progressive?: boolean,      // default: false
  colours?: number,           // default: 256
  effort?: number,            // default: 7
  dither?: number,            // default: 1.0
  interFrameMaxError?: number, // default: 0
  interPaletteMaxError?: number,// default: 3
  loop?: number,              // default: 0
  delay?: number | number[],
  force?: boolean             // default: true
}
```

#### Other Formats (jp2, tiff, avif, heif, jxl)

Each method accepts options with parameters such as quality, lossless flag, tile sizes, compression type, bitdepth, chromaSubsampling, and additional format specific settings.

**Example (avif):**
```js
sharp('input.jpg').avif({ quality: 50, lossless: false, effort: 2, chromaSubsampling: '4:4:4', bitdepth: 8 })
  .toBuffer();
```

### Advanced Methods

#### clone()

**Signature:**
```js
clone() ⇒ Sharp
```

**Example:**
```js
const pipeline = sharp().rotate();
pipeline.clone().resize(800, 600).pipe(firstWritableStream);
pipeline.clone().extract({ left: 20, top: 20, width: 100, height: 100 }).pipe(secondWritableStream);
```

## Best Practices & Troubleshooting

- For cross-platform installations, configure package manager flags appropriately (e.g. `npm install --cpu=x64 --os=linux --libc=glibc sharp`).
- When using custom libvips, ensure it meets the minimum version requirements specified in the package.json.
- In serverless environments (AWS Lambda), bundle required binaries for linux-x64 or linux-arm64 and avoid symbolic links.
- Use debugging logs (e.g. event listeners on `info` and `warning` events) to troubleshoot processing errors.
- For Electron applications, ensure sharp is excluded from bundling or unpacked using `asarUnpack`/`unpack` options in your configuration.

**Example Troubleshooting Command:**
```bash
node -e "require('sharp')('input.jpg').toBuffer().then(data => console.log('Success')).catch(err => console.error(err))"
```

This command verifies if sharp processes the image without errors.


## Original Source
Sharp Documentation
https://sharp.pixelplumbing.com/

## Digest of SHARP

# Sharp Documentation Digest

**Retrieved:** 2023-10-27

## Overview

This document provides the exact technical content extracted from the Sharp library documentation. It includes installation commands, supported formats, constructor and method API details, parameter specifications, complete SDK method signatures, detailed configuration options, and full code examples.

## Installation

- **Command Examples:**
  - npm: `npm install sharp`
  - pnpm: `pnpm add sharp`
  - yarn: `yarn add sharp`
  - bun: `bun add sharp`
  - deno: `deno run --allow-ffi ...`

- **Prerequisites:**
  - Node-API v9 compatible runtime (e.g., Node.js ^18.17.0 or >=20.3.0)
  - Prebuilt binaries available for various platforms (macOS, Windows, Linux, etc.)
  - Optional configuration for package manager lockfiles and cross-platform installs using `--cpu`, `--os`, and `--libc` flags.

## Supported Formats

- **Input:** JPEG, PNG, WebP, GIF, AVIF, TIFF, SVG
- **Output:** JPEG, PNG, WebP, GIF, AVIF, TIFF, and raw pixel data

## Constructor

- **Syntax:** `new Sharp([input], [options])`

  - **Parameters:**
    - `input`: Accepts Buffer, ArrayBuffer, TypedArray, or string (file path).
    - `options`: Object with attributes:
      - `failOn` (string, default: 'warning')
      - `limitInputPixels` (number|boolean, default: 268402689)
      - `unlimited` (boolean, default: false)
      - `autoOrient` (boolean, default: false)
      - `sequentialRead` (boolean, default: true)
      - `density` (number, default: 72)
      - Additional keys for raw image data, image creation, text, joined images, etc.

- **Exceptions:** Throws Error on invalid parameters.

## Input Metadata

- **Method:** `metadata([callback]) ⇒ Promise.<Object> | Sharp`

- **Return:** Object containing:
  - `format`, `size`, `width`, `height`, `space`, `channels`, `depth`, `density`, `chromaSubsampling`, `isProgressive`, `isPalette`, `bitsPerSample`, `pages`, `pageHeight`, `loop`, `delay`, `pagePrimary`, `levels`, `subifds`, `background`, `compression`, `resolutionUnit`, `hasProfile`, `hasAlpha`, `orientation`, `exif`, `icc`, `iptc`, `xmp`, `tifftagPhotoshop`, `formatMagick`, `comments`

- **Examples:**
  ```js
  const metadata = await sharp(input).metadata();
  ```

## Stats Method

- **Method:** `stats([callback]) ⇒ Promise.<Object>`

- **Return:** Object including `channels` (min, max, sum, squaredSum, mean, stdev, minX, minY, maxX, maxY), `isOpaque`, `entropy`, `sharpness`, `dominant` color.

- **Examples:**
  ```js
  const { entropy, sharpness, dominant } = await sharp(input).stats();
  ```

## Output Options

### toFile

- **Method:** `toFile(fileOut, [callback]) ⇒ Promise.<Object>`

- **Description:** Write output image data to a file. Infers output format from file extension. Metadata is removed by default.

- **Parameters:**
  - `fileOut`: string path to output file.
  - `callback`: optional callback with (err, info).

- **Example:**
  ```js
  sharp(input).toFile('output.png', (err, info) => { /* ... */ });
  ```

### toBuffer

- **Method:** `toBuffer([options], [callback]) ⇒ Promise.<Buffer>`

- **Parameters:**
  - `options`: Object (e.g., `{ resolveWithObject: true }`).
  - `callback`: function (err, data, info).

- **Example:**
  ```js
  sharp(input).png().toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => { /* ... */ });
  ```

### Metadata and Profile Preservation

- **keepExif():** Keeps EXIF metadata.
- **withExif(exif):** Sets EXIF metadata explicitly.
- **withExifMerge(exif):** Merges EXIF metadata.
- **keepIccProfile():** Retains ICC profile.
- **withIccProfile(icc, [options]):** Applies ICC profile.
- **keepMetadata() / withMetadata([options]):** Configure metadata (orientation, density, etc.).

## Format Conversion Methods

### jpeg([options])

- **Options Include:** quality (default 80), progressive (default false), chromaSubsampling (default '4:2:0'), optimiseCoding, mozjpeg, trellisQuantisation, overshootDeringing, quantisationTable, force.

- **Example:**
  ```js
  sharp(input).jpeg({ quality: 100, chromaSubsampling: '4:4:4' })
    .toBuffer();
  ```

### png([options])

- **Options Include:** progressive, compressionLevel (default 6), adaptiveFiltering, palette, quality, effort, colours, dither, force.

- **Example:**
  ```js
  sharp(input).png({ palette: true }).toBuffer();
  ```

### webp([options])

- **Options Include:** quality (default 80), alphaQuality, lossless, nearLossless, smartSubsample, smartDeblock, preset, effort, loop, delay, minSize, mixed, force.

- **Example:**
  ```js
  sharp(input).webp({ lossless: true }).toBuffer();
  ```

### gif([options])

- **Options Include:** reuse (default true), progressive, colours, effort, dither, interFrameMaxError, interPaletteMaxError, loop, delay, force.

- **Example:**
  ```js
  sharp(inputGif, { animated: true }).gif().toFile('animated.gif');
  ```

### jp2, tiff, avif, heif, jxl

- **Options:** Detailed options for each format such as quality, lossless, tile sizes, compression types, bitdepth and others.

- **Example (avif):**
  ```js
  sharp(input).avif({ effort: 2 }).toBuffer();
  ```

## Additional Methods and Use Cases

### clone()

- **Method:** `clone() ⇒ Sharp`
- **Description:** Creates a snapshot of a Sharp instance for parallel processing pipelines.

- **Example:**
  ```js
  const pipeline = sharp().rotate();
  pipeline.clone().resize(800, 600).pipe(firstWritableStream);
  pipeline.clone().extract({ left: 20, top: 20, width: 100, height: 100 }).pipe(secondWritableStream);
  ```

### Complex Pipeline Example

- **Example (Multiple Resizes):**
  ```js
  const fs = require('fs');
  const got = require('got');
  const sharpStream = sharp({ failOn: 'none' });
  const promises = [];

  promises.push(sharpStream.clone().jpeg({ quality: 100 }).toFile('originalFile.jpg'));
  promises.push(sharpStream.clone().resize({ width: 500 }).jpeg({ quality: 80 }).toFile('optimized-500.jpg'));
  promises.push(sharpStream.clone().resize({ width: 500 }).webp({ quality: 80 }).toFile('optimized-500.webp'));

  got.stream('https://www.example.com/some-file.jpg').pipe(sharpStream);
  Promise.all(promises)
    .then(res => { console.log('Done!', res); })
    .catch(err => { console.error('Error processing files', err); 
      try {
        fs.unlinkSync('originalFile.jpg');
        fs.unlinkSync('optimized-500.jpg');
        fs.unlinkSync('optimized-500.webp');
      } catch (e) {}
    });
  ```

## Attribution

- Source: https://sharp.pixelplumbing.com/
- Data Size: 7309046 bytes
- Links Found: 18652
- No errors detected.


## Attribution
- Source: Sharp Documentation
- URL: https://sharp.pixelplumbing.com/
- License: Apache-2.0
- Crawl Date: 2025-04-17T21:25:31.574Z
- Data Size: 7309046 bytes
- Links Found: 18652

## Retrieved
2025-04-17
