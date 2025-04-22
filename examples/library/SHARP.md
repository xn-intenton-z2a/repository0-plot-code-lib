# SHARP

## Crawl Summary
Sharp is a high performance Node.js image processing library using libvips. It supports diverse image formats (JPEG, PNG, WebP, GIF, AVIF, TIFF, SVG) and runtimes (Node.js, Deno, Bun). The library provides detailed configuration options for input parameters (e.g., autoOrient, limitInputPixels), metadata handling, and format conversion commands. Key API methods include the Sharp constructor, clone(), metadata(), stats(), toFile(), toBuffer(), along with format-specific methods (jpeg, png, webp, gif, jp2, tiff, avif, heif, jxl) that accept precise option objects. The documentation outlines installation commands, build-from-source configurations, bundler integration, and AWS Lambda deployment best practices.

## Normalised Extract
## Table of Contents
1. Installation
2. Prebuilt Binaries & Cross-platform Settings
3. Build from Source & Custom libvips
4. API Constructor and Options
5. Common API Methods (clone, metadata, stats)
6. Output Options (toFile, toBuffer)
7. Metadata and Profile Handling
8. Format Conversion Methods (jpeg, png, webp, gif, jp2, tiff, avif, heif, jxl)
9. Bundler & AWS Lambda Integration
10. Troubleshooting & Best Practices

---

### 1. Installation
- npm: `npm install sharp`
- pnpm: `pnpm add sharp`
- yarn: `yarn add sharp`
- bun: `bun add sharp`

### 2. Prebuilt Binaries & Cross-platform Settings
- Prebuilt binaries for macOS (x64 & ARM64), various Linux architectures, and Windows.
- Use installation flags: `--cpu`, `--os`, `--libc` for platform specifics.

### 3. Build from Source & Custom libvips
- Use environment variables: `SHARP_IGNORE_GLOBAL_LIBVIPS` or `SHARP_FORCE_GLOBAL_LIBVIPS`.
- Requirements: C++17, node-addon-api (v7+), node-gyp (v9+).

### 4. API Constructor and Options
- Signature: `new Sharp([input], [options])`
- Input types: Buffer, ArrayBuffer, TypedArray, string, or array.
- Options include: `failOn`, `limitInputPixels`, `unlimited`, `autoOrient`, `sequentialRead`, `density`, `ignoreIcc`, and others for multi-page, raw, create, text, join.

### 5. Common API Methods
- `clone() ⇒ Sharp` to capture the current pipeline state.
- `metadata([callback]) ⇒ Promise.<Object>` returns image dimensions, format, channels, etc.
- `stats([callback]) ⇒ Promise.<Object>` returns channel statistics and image metrics.

### 6. Output Options
- `toFile(fileOut, [callback]) ⇒ Promise.<Object>` writes image to file with inferred format.
- `toBuffer([options], [callback]) ⇒ Promise.<Buffer>` outputs processed image data; supports `{ resolveWithObject: true }`.

### 7. Metadata and Profile Handling
- Methods: `keepExif()`, `withExif(exif)`, `withExifMerge(exif)`, `keepIccProfile()`, `withIccProfile(icc, [options])`, `keepMetadata()`, and `withMetadata([options])`.

### 8. Format Conversion Methods
- **jpeg(options)**: Options such as `quality`, `progressive`, `chromaSubsampling`, etc.
- **png(options)**: Options such as `compressionLevel`, `palette`, and `dither`.
- **webp(options)**: Options include `quality`, `lossless`, `preset`, etc.
- **gif(options)**: Options include `reuse`, `colours`, `dither`, etc.
- Additional methods for `jp2()`, `tiff()`, `avif()`, `heif()`, and `jxl()` with similar patterns.

### 9. Bundler & AWS Lambda Integration
- Exclude sharp from bundling in webpack (using externals) and esbuild (using external).
- For AWS Lambda, include correct binaries and avoid symlinks; configure API Gateway's binary media types.

### 10. Troubleshooting & Best Practices
- Use jemalloc on glibc-based systems to avoid memory fragmentation.
- For cross-compiling, set npm flags (`--platform`, `--arch`, `--libc`).
- Verify installation of node-addon-api and node-gyp if build issues occur.
- In serverless environments, allocate sufficient memory (e.g., 1536 MB) for performance.


## Supplementary Details
Configuration details extracted:
- **Input Options**: 'limitInputPixels' (default: 268402689, set to false for no limit), 'autoOrient' (default: false), 'sequentialRead' (default: true), 'density' (default: 72).
- **Creation Options**: Use 'create' object with properties: width, height, channels (3 or 4), background (color object/string), and noise (type: 'gaussian', mean, sigma).
- **Text Options**: 'text' object with properties: text (UTF-8 string, supports Pango markup), font, fontfile, width, height, align, justify, dpi, rgba, spacing, and wrap style.
- **Join Options**: 'join' object with properties: across (number of images horizontally), animated (boolean), shim (pixel gap), background, halign, and valign.
- **Metadata Options**: Methods like withExif (accepts an object keyed by IFD labels), withIccProfile (accepts a file path or built-in names like 'srgb', 'p3', 'cmyk').
- **Format Conversion**: Strict options for each converter:
  - jpeg: quality (default 80), chromaSubsampling ('4:2:0'), progressive flag, optimisation options.
  - png: compressionLevel (default 6), progressive, adaptiveFiltering, quality, and palette settings.
  - webp: quality (default 80), lossless, nearLossless, preset, effort, loop, delay.
  - gif: reuse palette, colours (default 256), dither, inter-frame error thresholds.
- **Build & Deployment**: Use environment variables (SHARP_IGNORE_GLOBAL_LIBVIPS, SHARP_FORCE_GLOBAL_LIBVIPS) and build commands (npm install --build-from-source). Troubleshooting includes checking node-addon-api/node-gyp installations and setting bundler exclusions.


## Reference Details
Complete API Specifications and Implementation Details:

1. Constructor:
   - Signature:
     `new Sharp(input?: Buffer|ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|Uint16Array|Int16Array|Uint32Array|Int32Array|Float32Array|Float64Array|string|Array, options?: Object)`
   - Options Object Properties:
     • failOn: string (default 'warning')
     • limitInputPixels: number | boolean (default 268402689)
     • unlimited: boolean (default false)
     • autoOrient: boolean (default false)
     • sequentialRead: boolean (default true)
     • density: number (default 72)
     • ignoreIcc: boolean (default false)
     • pages: number (default 1)
     • page: number (default 0)
     • subifd: number (default -1)
     • level: number (default 0)
     • pdfBackground: string | Object
     • animated: boolean (default false)
     • raw: Object { width: number, height: number, channels: number, premultiplied?: boolean }
     • create: Object { width: number, height: number, channels: number, background: string|Object, noise?: { type: string, mean: number, sigma: number } }
     • text: Object { text: string, font?: string, fontfile?: string, width?: number, height?: number, align?: string, justify?: boolean, dpi?: number, rgba?: boolean, spacing?: number, wrap?: string }
     • join: Object { across: number, animated?: boolean, shim?: number, background?: string|Object, halign?: string, valign?: string }

2. clone() Method:
   - Signature: `clone() ⇒ Sharp`
   - Example:
     ```
     const pipeline = sharp().rotate();
     const clone1 = pipeline.clone().resize(800, 600);
     const clone2 = pipeline.clone().extract({ left: 20, top: 20, width: 100, height: 100 });
     ```

3. metadata() Method:
   - Signature: `metadata([callback]) ⇒ Promise.<Object>`
   - Returns an object with properties:
     { format, size, width, height, space, channels, depth, density, chromaSubsampling, isProgressive, isPalette, bitsPerSample, pages, pageHeight, loop, delay, orientation, exif, icc, iptc, xmp, tifftagPhotoshop, formatMagick, comments }
   - Example:
     ```
     const metadata = await sharp(input).metadata();
     ```

4. stats() Method:
   - Signature: `stats([callback]) ⇒ Promise.<Object>`
   - Returns an object with:
     { channels: [{ min, max, sum, squaresSum, mean, stdev, minX, minY, maxX, maxY }], isOpaque, entropy, sharpness, dominant }
   - Example:
     ```
     const { dominant } = await sharp(input).stats();
     ```

5. toFile() Method:
   - Signature: `toFile(fileOut: string, [callback: function]) ⇒ Promise.<Object>`
   - Returns output info including: format, size, width, height, channels, premultiplied, cropOffsetLeft, cropOffsetTop, attentionX, attentionY, pageHeight, pages
   - Example:
     ```
     sharp(input).toFile('output.png', (err, info) => { /* use info */ });
     ```

6. toBuffer() Method:
   - Signature: `toBuffer([options], [callback]) ⇒ Promise.<Buffer>`
   - Options: { resolveWithObject?: boolean }
   - Example:
     ```
     sharp(input).toBuffer({ resolveWithObject: true })
       .then(({ data, info }) => { /* data: Buffer, info: output details */ });
     ```

7. Metadata/Profile Methods:
   - `keepExif() ⇒ Sharp`
   - `withExif(exif: Object) ⇒ Sharp`
   - `withExifMerge(exif: Object) ⇒ Sharp`
   - `keepIccProfile() ⇒ Sharp`
   - `withIccProfile(icc: string, [options: { attach?: boolean }]) ⇒ Sharp`
   - `keepMetadata() ⇒ Sharp`
   - `withMetadata([options: { orientation?: number, density?: number }]) ⇒ Sharp`
   - Example:
     ```
     sharp(input)
       .withExif({ IFD0: { Copyright: 'The National Gallery' } })
       .toBuffer();
     ```

8. Format Conversion Methods (jpeg, png, webp, gif, etc.):
   - **jpeg(options: Object) ⇒ Sharp**
     Options: {
       quality: number (default 80),
       progressive: boolean (default false),
       chromaSubsampling: string (default '4:2:0', use '4:4:4' to disable subsampling),
       optimiseCoding: boolean (default true),
       mozjpeg: boolean (default false),
       trellisQuantisation: boolean,
       overshootDeringing: boolean,
       optimiseScans: boolean,
       quantisationTable: number
     }
     Example:
     ```
     sharp(input)
       .jpeg({ quality: 100, chromaSubsampling: '4:4:4' })
       .toBuffer();
     ```

   - **png(options: Object) ⇒ Sharp**
     Options: {
       progressive: boolean,
       compressionLevel: number (default 6),
       adaptiveFiltering: boolean,
       palette: boolean,
       quality: number,
       effort: number,
       colours: number (default 256),
       dither: number (default 1.0),
       force: boolean (default true)
     }

   - **webp(options: Object) ⇒ Sharp**
     Options: {
       quality: number (default 80),
       alphaQuality: number (default 100),
       lossless: boolean,
       nearLossless: boolean,
       smartSubsample: boolean,
       smartDeblock: boolean,
       preset: string (default 'default'),
       effort: number (default 4),
       loop: number,
       delay: number | Array<number>,
       minSize: boolean,
       mixed: boolean,
       force: boolean
     }

   - **gif(options: Object) ⇒ Sharp**
     Options: {
       reuse: boolean (default true),
       progressive: boolean,
       colours: number (default 256),
       effort: number (default 7),
       dither: number (default 1.0),
       interFrameMaxError: number,
       interPaletteMaxError: number,
       loop: number,
       delay: number | Array<number>,
       force: boolean
     }

   - Other methods (`jp2()`, `tiff()`, `avif()`, `heif()`, `jxl()`) follow similar option patterns with documented defaults.

9. Best Practices & Troubleshooting:
   - Use `npm install --build-from-source` when required by a global libvips.
   - For cross-compiling, configure using npm flags: `--platform`, `--arch`, `--libc`.
   - Exclude sharp from bundling with proper externals settings for webpack/esbuild/electron.
   - For AWS Lambda, deploy with the appropriate binary for the target architecture and avoid symlinks.
   - If encountering build errors, ensure node-addon-api and node-gyp are installed via:
     ```
     npm install --save node-addon-api node-gyp
     ```

Full code examples and configurations are provided in the inline documentation above.


## Original Source
Sharp Image Processing
https://sharp.pixelplumbing.com/

## Digest of SHARP

## Sharp Image Processing

Retrieved: 2023-10-10

### Overview
- High performance Node.js image processing leveraging the libvips library for fast image resizing (4x-5x faster than ImageMagick and GraphicsMagick).
- Supports input and output in multiple formats including JPEG, PNG, WebP, GIF, AVIF, TIFF, and SVG.
- Compatible with Node.js (>= 18.17.0), Deno, and Bun; utilizes Node-API v9.
- Handles colour spaces, embedded ICC profiles, alpha transparency, and uses Lanczos resampling for quality retention.

### Installation

Commands:
```
npm install sharp
pnpm add sharp
yarn add sharp
bun add sharp
```

For pnpm, sharp might need to be added to ignoredBuiltDependencies or onlyBuiltDependencies to silence warnings.

### Prebuilt Binaries & Cross-platform Installation

Prebuilt binaries are available for:
- macOS x64 (>= 10.15) and macOS ARM64
- Linux (ARM, ARM64, ppc64, s390x, x64 with glibc/musl requirements)
- Windows x64 and x86

Cross-platform support is enabled using installation flags such as:
```
npm install --cpu=x64 --os=darwin sharp
npm install --cpu=arm64 --os=darwin sharp
npm install --cpu=x64 --os=linux --libc=glibc sharp
npm install --cpu=x64 --os=linux --libc=musl sharp
```

### Custom libvips and Build-from-Source

- To use a custom, globally-installed libvips, ensure its version matches the version in config.libvips of package.json and is detectable via `pkg-config --modversion vips-cpp`.
- Build from source is triggered if a global libvips is detected or if `npm install --build-from-source` is used.
- Use environment variables: `SHARP_IGNORE_GLOBAL_LIBVIPS` (to never use global libvips) or `SHARP_FORCE_GLOBAL_LIBVIPS` (to force its use).
- Prerequisites include a C++17 compiler, node-addon-api (v7+), and node-gyp (v9+).

### WebAssembly

Experimental support for multi-threaded Wasm environments via Workers. Use:
```
npm install --cpu=wasm32 sharp
```

### AWS Lambda & Bundler Integration

- AWS Lambda: Ensure the deployment package's node_modules includes binaries for linux-x64 or linux-arm64. Avoid symbolic links.
- Bundlers:
  - Webpack: Exclude sharp via the externals configuration:
    ```
    externals: { 'sharp': 'commonjs sharp' }
    ```
  - esbuild: Use the external configuration:
    ```
    buildSync({ entryPoints: ['app.js'], bundle: true, platform: 'node', external: ['sharp'] });
    ```
  - Electron: Configure asarUnpack/unpack options to exclude sharp from the ASAR archive.
  - Vite: Exclude sharp via rollupOptions in the build configuration.

### API: Constructor

**Signature:**
```
new Sharp([input], [options])
```

**Parameters:**
- **input**: `Buffer | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array | string | Array`
  - If provided, it can be a Buffer/ArrayBuffer/TypedArray containing image data in JPEG, PNG, WebP, AVIF, GIF, SVG, TIFF, or raw pixel data, or a string path to an image file. Arrays of inputs are concatenated.
- **options**: `Object` (optional) with possible properties:
  - **failOn**: `string` (default: 'warning') - Determines when to abort on invalid pixel data.
  - **limitInputPixels**: `number | boolean` (default: 268402689) - Maximum pixel count allowed.
  - **unlimited**: `boolean` (default: false) - Removes safety limits if true.
  - **autoOrient**: `boolean` (default: false) - Automatically rotates/flips based on EXIF Orientation.
  - **sequentialRead**: `boolean` (default: true) - Use sequential read (can be set false for random access).
  - **density**: `number` (default: 72) - DPI for vector images.
  - **ignoreIcc**: `boolean` (default: false) - Ignores embedded ICC profiles.
  - **pages**, **page**, **subifd**, **level**, **pdfBackground**, **animated**, **raw**, **create**, **text**, **join**: Additional options for multi-page images, raw pixel data, newly created images, text rendering, image joining, etc.

**Example:**
```
sharp('input.jpg')
  .resize(300, 200)
  .toFile('output.jpg', function(err) {
    // output.jpg is 300x200 resized from input.jpg
  });
```

### API: clone()

**Signature:**
```
clone() ⇒ Sharp
```
Creates a snapshot of the current Sharp instance to allow multiple processing pipelines.

**Example:**
```
const pipeline = sharp().rotate();
pipeline.clone().resize(800, 600).pipe(firstWritableStream);
pipeline.clone().extract({ left: 20, top: 20, width: 100, height: 100 }).pipe(secondWritableStream);
```

### API: Metadata Extraction

**Signature:**
```
metadata([callback]) ⇒ Promise.<Object>
```
Returns an object containing properties such as:
- `format`, `size`, `width`, `height`, `space`, `channels`, `depth`, `density`,
- `chromaSubsampling`, `isProgressive`, `isPalette`, `bitsPerSample`,
- `pages`, `pageHeight`, `loop`, `delay`, `orientation`, and more.

**Example:**
```
const metadata = await sharp(input).metadata();
```

### API: Stats

**Signature:**
```
stats([callback]) ⇒ Promise.<Object>
```
Returns:
- `channels`: Array of statistics for each channel (min, max, sum, squaresSum, mean, stdev, minX, minY, maxX, maxY).
- `isOpaque`: Boolean, true if fully opaque.
- `entropy`: Greyscale entropy estimation.
- `sharpness`: Estimation based on Laplacian convolution.
- `dominant`: Dominant sRGB color based on a 4096-bin histogram.

**Example:**
```
const { dominant } = await sharp(input).stats();
```

### Output Options

#### toFile

**Signature:**
```
toFile(fileOut, [callback]) ⇒ Promise.<Object>
```
Writes the processed image to a file. The output format is inferred from the file extension, supporting JPEG, PNG, WebP, AVIF, TIFF, GIF, DZI, or raw pixel data.

**Example:**
```
sharp(input)
  .toFile('output.png', (err, info) => { /* info contains format, size, dimensions, etc. */ });
```

#### toBuffer

**Signature:**
```
toBuffer([options], [callback]) ⇒ Promise.<Buffer>
```
Options can include `{ resolveWithObject: true }` to return an object with `data` and `info`.

**Example:**
```
sharp(input)
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => { /* use data and info */ });
```

### Metadata and Profile Handling

Methods to manage image metadata:
- `keepExif()`: Retain all EXIF metadata.
- `withExif(exif)`: Set EXIF metadata (object keyed by IFD names).
- `withExifMerge(exif)`: Merge provided EXIF data with existing metadata.
- `keepIccProfile()`: Retain the input ICC profile.
- `withIccProfile(icc, [options])`: Attach a specified ICC profile (filesystem path or built-in name such as 'srgb', 'p3', 'cmyk'); option `attach` (default true).
- `keepMetadata()`: Retain all metadata elements (EXIF, ICC, XMP, IPTC).
- `withMetadata([options])`: Keep most metadata and optionally update orientation and density.

**Example:**
```
sharp(input)
  .withExif({ IFD0: { Copyright: 'The National Gallery' } })
  .toBuffer();
```

### Format Conversion Methods

#### jpeg([options]) ⇒ Sharp
Options:
- `quality`: number (default 80, range 1-100)
- `progressive`: boolean (default false)
- `chromaSubsampling`: string (default '4:2:0'; use '4:4:4' to prevent subsampling)
- `optimiseCoding`/`optimizeCoding`: boolean (default true)
- `mozjpeg`: boolean (default false)
- `trellisQuantisation`: boolean
- `overshootDeringing`: boolean
- `optimiseScans`/`optimizeScans`: boolean
- `quantisationTable`/`quantizationTable`: number

**Example:**
```
sharp(input)
  .jpeg({ quality: 100, chromaSubsampling: '4:4:4' })
  .toBuffer();
```

#### png([options]) ⇒ Sharp
Options:
- `progressive`: boolean (default false)
- `compressionLevel`: number (default 6)
- `adaptiveFiltering`: boolean (default false)
- `palette`: boolean (when true, produces indexed PNG output)
- `quality`: number
- `effort`: number
- `colours`/`colors`: number (default 256)
- `dither`: number (default 1.0)
- `force`: boolean (default true)

**Example:**
```
sharp(input)
  .png({ palette: true })
  .toBuffer();
```

#### webp([options]) ⇒ Sharp
Options include:
- `quality`: number (default 80)
- `alphaQuality`: number (default 100)
- `lossless`: boolean (default false)
- `nearLossless`: boolean (default false)
- `smartSubsample`: boolean (default false)
- `smartDeblock`: boolean (default false)
- `preset`: string (default 'default')
- `effort`: number (default 4)
- `loop`: number
- `delay`: number or array of numbers
- `minSize`: boolean (default false)
- `mixed`: boolean (default false)
- `force`: boolean (default true)

**Example:**
```
sharp(input)
  .webp({ lossless: true })
  .toBuffer();
```

#### gif([options]) ⇒ Sharp
Options include:
- `reuse`: boolean (default true)
- `progressive`: boolean (default false)
- `colours`/`colors`: number (default 256)
- `effort`: number (default 7)
- `dither`: number (default 1.0)
- `interFrameMaxError`: number
- `interPaletteMaxError`: number
- `loop`: number
- `delay`: number or array of numbers
- `force`: boolean (default true)

**Example:**
```
sharp(pngBuffer)
  .gif()
  .toBuffer();
```

Similar detailed options exist for `jp2()`, `tiff()`, `avif()`, `heif()`, and `jxl()`, each with their own defined parameters and defaults.

### Troubleshooting & Best Practices

- When using glibc-based Linux, consider employing jemalloc to avoid memory fragmentation.
- For cross-compiling, use npm flags `--platform`, `--arch`, and `--libc` to configure the target environment.
- If node-addon-api or node-gyp are missing, install via:
  ```
npm install --save node-addon-api node-gyp
  ```
- In bundlers, ensure sharp is excluded from bundling to prevent packaging issues (see webpack externals, esbuild external, electron asar unpacking).
- For AWS Lambda, ensure the deployment package contains the correct binary for the target platform and avoid the use of symbolic links.

## Attribution

- Data Size: 7630234 bytes
- Links Found: 18948
- Crawled from: https://sharp.pixelplumbing.com/


## Attribution
- Source: Sharp Image Processing
- URL: https://sharp.pixelplumbing.com/
- License: MIT
- Crawl Date: 2025-04-21T04:50:54.200Z
- Data Size: 7630234 bytes
- Links Found: 18948

## Retrieved
2025-04-21
