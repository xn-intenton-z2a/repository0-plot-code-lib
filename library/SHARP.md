# SHARP

## Crawl Summary
Module: sharp (v libvips-based). Install via npm/ yarn/ pnpm/ bun/ deno. Constructor new Sharp(input, options) with input types Buffer|TypedArray|string|Array and options { failOn, limitInputPixels, unlimited, autoOrient, sequentialRead, density, ignoreIcc, pages, page, subifd, level, pdfBackground, animated, raw, create, text, join }. Core chainable methods: resize, rotate, extract, composite, gamma. Output methods: toFile(file, callback) ⇒ Promise<{format, size, width, height, channels,...}>, toBuffer(options, callback) ⇒ Promise<Buffer|{data,info}>. Metadata: metadata() ⇒ Promise<{format, size, width, height, space, channels, depth, density, chromaSubsampling, isProgressive, isPalette, bitsPerSample,...}>. Stats: stats() ⇒ Promise<{channels:[{min,max,sum,squaresSum,mean,stdev,minX,minY,maxX,maxY}], isOpaque, entropy, sharpness, dominant:{r,g,b}}>. Format-specific: jpeg({quality, progressive, chromaSubsampling, optimiseCoding, mozjpeg, trellisQuantisation, overshootDeringing, optimiseScans, quantisationTable, force}), png({progressive, compressionLevel, adaptiveFiltering, palette, quality, effort, colours, dither, force}), webp({quality, alphaQuality, lossless, nearLossless, smartSubsample, smartDeblock, preset, effort, loop, delay, minSize, mixed, force}), gif({reuse, progressive, colours, effort, dither, interFrameMaxError, interPaletteMaxError, loop, delay, force}), tiff({quality, compression, predictor, pyramid, tile, tileWidth, tileHeight, xres, yres, resolutionUnit, bitdepth, miniswhite}), avif({quality, lossless, effort, chromaSubsampling, bitdepth}), heif({compression, quality, lossless, effort, chromaSubsampling, bitdepth}). Env: cross-platform flags (--cpu, --os, --libc), custom libvips via pkg-config, build-from-source flags (SHARP_IGNORE_GLOBAL_LIBVIPS, SHARP_FORCE_GLOBAL_LIBVIPS), wasm support, bundler externals, electron asarUnpack, AWS Lambda packaging, memory allocator recommendations (jemalloc on glibc), fontconfig path.


## Normalised Extract
Table of Contents:
1. Installation  
2. Constructor & Options  
3. Core Processing Methods  
4. Output Methods  
5. Metadata & Statistics Methods  
6. Format-Specific Output Options  
7. Environment & Build Configuration  
8. Bundler & Deployment Integration  
9. Troubleshooting Procedures  

1. Installation
npm install sharp  
pnpm add sharp  
yarn add sharp  
bun add sharp  
deno run --allow-ffi ...

2. Constructor & Options
Signature: new Sharp(input?, options?) ⇒ Sharp  
input types: Buffer|ArrayBuffer|TypedArray|string|Array  
options:
  failOn: none|truncated|error|warning (default warning)  
  limitInputPixels: number|true|false (default 268402689)  
  unlimited: boolean (default false)  
  autoOrient: boolean (default false)  
  sequentialRead: boolean (default true)  
  density: number  
  ignoreIcc: boolean  
  pages: number (-1 for all)  
  page: number (zero-based)  
  subifd: number  
  level: number  
  pdfBackground: string|Object  
  animated: boolean  
  raw: { width: number, height: number, channels: number, premultiplied?: boolean }  
  create: { width: number, height: number, channels: 3|4, background: ColorObject, noise?: { type: gaussian, mean: number, sigma: number } }  
  text: { text: string, font?: string, fontfile?: string, width?: number, height?: number, align?: left|center|right, justify?: boolean, dpi?: number, rgba?: boolean, spacing?: number, wrap?: word|char|word-char|none }  
  join: { across: number, shim: number, background?: ColorObject, animated?: boolean, halign?: left|center|right, valign?: top|center|bottom }

3. Core Processing Methods
resize(width?: number, height?: number, options?: { fit, position, background, kernel, withoutEnlargement, fastShrinkOnLoad }) ⇒ Sharp
rotate(angle?: number, options?: { background: ColorObject }) ⇒ Sharp
extract({ left: number, top: number, width: number, height: number }) ⇒ Sharp
composite([{ input: Buffer|string|Sharp, blend?: string, gravity?: string, tile?: boolean, top?: number, left?: number }]) ⇒ Sharp
gamma(gamma?: number) ⇒ Sharp

4. Output Methods
toFile(fileOut: string, callback?: (err, info) => void) ⇒ Promise<{ format, size, width, height, channels, premultiplied, cropOffsetLeft?, cropOffsetTop?, attentionX?, attentionY?, pageHeight?, pages?, textAutofitDpi? }>
toBuffer(options?: { resolveWithObject: boolean }, callback?: (err, data, info) => void) ⇒ Promise<Buffer|{ data: Buffer, info: InfoObject }>

5. Metadata & Statistics Methods
metadata(callback?: (err, metadata) => void) ⇒ Promise<{ format, size?, width, height, space, channels, depth, density?, chromaSubsampling?, isProgressive?, isPalette?, bitsPerSample?, pages?, pageHeight?, loop?, delay?, pagePrimary?, levels?, subifds?, background?, compression?, resolutionUnit?, hasProfile?, hasAlpha?, orientation?, exif?, icc?, iptc?, xmp?, tifftagPhotoshop?, formatMagick?, comments? }>
stats(callback?: (err, stats) => void) ⇒ Promise<{ channels: Array<{ min, max, sum, squaresSum, mean, stdev, minX, minY, maxX, maxY }>, isOpaque, entropy, sharpness, dominant: { r, g, b } }>

6. Format-Specific Output Options
jpeg(options?: { quality:1-100, progressive:boolean, chromaSubsampling:4:2:0|4:4:4, optimiseCoding:boolean, mozjpeg:boolean, trellisQuantisation:boolean, overshootDeringing:boolean, optimiseScans:boolean, quantisationTable:0-8, force:boolean }) ⇒ Sharp
png(options?: { progressive:boolean, compressionLevel:0-9, adaptiveFiltering:boolean, palette:boolean, quality:1-100, effort:1-10, colours:1-256, dither:0-1, force:boolean }) ⇒ Sharp
webp(options?: { quality:1-100, alphaQuality:0-100, lossless:boolean, nearLossless:boolean, smartSubsample:boolean, smartDeblock:boolean, preset:default|photo|picture|drawing|icon|text, effort:0-6, loop:number, delay:number|number[], minSize:boolean, mixed:boolean, force:boolean }) ⇒ Sharp
gif(options?: { reuse:boolean, progressive:boolean, colours:2-256, effort:1-10, dither:0-1, interFrameMaxError:0-32, interPaletteMaxError:0-256, loop:number, delay:number|number[], force:boolean }) ⇒ Sharp
tiff(options?: { quality:1-100, compression:none|jpeg|deflate|packbits|ccittfax4|lzw|webp|zstd|jp2k, predictor:none|horizontal|float, pyramid:boolean, tile:boolean, tileWidth:number, tileHeight:number, xres:number, yres:number, resolutionUnit:inch|cm, bitdepth:1|2|4|8|16, miniswhite:boolean }) ⇒ Sharp
avif(options?: { quality:1-100, lossless:boolean, effort:0-9, chromaSubsampling:4:2:0|4:4:4, bitdepth:8|10|12 }) ⇒ Sharp
heif(options: { compression: av1|hevc, quality:1-100, lossless:boolean, effort:0-9, chromaSubsampling:4:2:0|4:4:4, bitdepth:8|10|12 }) ⇒ Sharp

7. Environment & Build Configuration
Cross-platform install flags: npm install --cpu=<x64|arm64|wasm32> --os=<darwin|linux|win32> [--libc=<glibc|musl>]  
Custom libvips: require version ≥ config.libvips, pkg-config --modversion vips-cpp; unsupported on Windows and macOS Rosetta  
Build from source: npm install --build-from-source or detect global libvips; environment variables SHARP_IGNORE_GLOBAL_LIBVIPS, SHARP_FORCE_GLOBAL_LIBVIPS  
Required: C++17 compiler, node-addon-api ≥7, node-gyp ≥9

8. Bundler & Deployment Integration
webpack: externals: { 'sharp': 'commonjs sharp' }  
esbuild: external: ['sharp']  
electron-builder: asarUnpack: ['**/node_modules/sharp/**/*']  
electron-forge: packagerConfig.asar.unpack: '**/node_modules/{sharp,@img}/**/*'  
vite: build.rollupOptions.external: ['sharp']
AWS Lambda: include linux-x64|arm64 binaries; avoid symlinks; set binary media types in API Gateway; memory ≥1536 MB for performance

9. Troubleshooting Procedures
npm v10+ monorepo lockfile: use --os, --cpu, --libc flags  
pnpm: add sharp to ignoredBuiltDependencies or onlyBuiltDependencies  
Fontconfig error: set FONTCONFIG_PATH to custom config  
Canvas+sharp conflict on Windows: avoid mixing both modules in same process


## Supplementary Details
Installation Details:
• Ensure Node-API v9 runtime (Node.js ≥18.17.0 or ≥20.3.0).  
• For cross-platform packaging, specify npm_config_{platform,arch,libc} or use flags.  
• To use custom libvips: install globally, verify with pkg-config --modversion vips-cpp; set SHARP_FORCE_GLOBAL_LIBVIPS to override; unsupported on Windows/macOS under Rosetta.

Build Steps:
1. npm install sharp (or pnpm/yarn)  
2. If building from source: npm install --build-from-source sharp  
3. Export SHARP_IGNORE_GLOBAL_LIBVIPS or SHARP_FORCE_GLOBAL_LIBVIPS as needed  
4. Verify node-addon-api and node-gyp installed: npm install --save node-addon-api node-gyp

Memory Allocator Optimization:
• On glibc Linux, pre-load jemalloc: LD_PRELOAD=libjemalloc.so  
• Disable thread-based concurrency via SHARP_CONCURRENCY=1 if fragmentation occurs.

AWS Lambda Packaging:
• Build on Amazon Linux x64/ARM64 or cross compile with --cpu/--os flags  
• Bundle sharp binaries in node_modules rather than symlink  
• Set API Gateway binaryMediaTypes to ['*/*']

Bundler Integration:
• webpack: externals: { sharp: 'commonjs sharp' }  
• esbuild: externals: ['sharp']  
• electron-builder: asarUnpack sharp modules  
• vite: rollupOptions.external: ['sharp']

Font Rendering:
• On Linux, ensure fontconfig installed and fonts available.  
• Set PANGOCAIRO_BACKEND=fontconfig on macOS Homebrew.  
• In serverless, set FONTCONFIG_PATH to font config directory.


## Reference Details
Constructor:

Signature:
new Sharp(
  input?: Buffer|ArrayBuffer|TypedArray|string|Array,
  options?: {
    failOn?: 'none'|'truncated'|'error'|'warning',
    limitInputPixels?: number|boolean,
    unlimited?: boolean,
    autoOrient?: boolean,
    sequentialRead?: boolean,
    density?: number,
    ignoreIcc?: boolean,
    pages?: number,
    page?: number,
    subifd?: number,
    level?: number,
    pdfBackground?: string|{r:number,g:number,b:number,alpha:number},
    animated?: boolean,
    raw?: {width:number,height:number,channels:number,premultiplied?:boolean},
    create?: {width:number,height:number,channels:3|4,background:{r:number,g:number,b:number,alpha:number},noise?:{type:'gaussian',mean:number,sigma:number}},
    text?: {text:string,font?:string,fontfile?:string,width?:number,height?:number,align?:'left'|'center'|'right',justify?:boolean,dpi?:number,rgba?:boolean,spacing?:number,wrap?:'word'|'char'|'word-char'|'none'},
    join?: {across:number,shim:number,background?:{r:number,g:number,b:number,alpha:number},animated?:boolean,halign?:'left'|'center'|'right',valign?:'top'|'center'|'bottom'}
  }
) ⇒ Sharp

Throws: Error Invalid parameters

Events:
on('info', (info) ⇒ void) emitted with {format, size, width, height, channels, ...}
on('warning', (warning) ⇒ void)

Core Methods:
resize(
  width?: number,
  height?: number,
  options?: {
    fit?: 'cover'|'contain'|'fill'|'inside'|'outside',
    position?: string|{left:number,top:number},
    background?: {r:number,g:number,b:number,alpha:number},
    kernel?: 'nearest'|'cubic'|'mitchell'|'lanczos2'|'lanczos3',
    withoutEnlargement?: boolean,
    fastShrinkOnLoad?: boolean
  }
) ⇒ Sharp

rotate(
  angle?: number,
  options?: { background?: {r:number,g:number,b:number,alpha:number} }
) ⇒ Sharp

extract(
  region: { left:number, top:number, width:number, height:number }
) ⇒ Sharp

composite(
  overlay: Array<{ input: Buffer|string|Sharp, blend?: string, gravity?: string, tile?: boolean, left?: number, top?: number }>
) ⇒ Sharp

gamma(gamma?: number) ⇒ Sharp

clone() ⇒ Sharp

Pipeline example:
const pipeline = sharp('input.jpg').rotate();
pipeline.clone().resize(800,600).toFile('out1.jpg');
pipeline.clone().extract({left:10,top:10,width:100,height:100}).toFile('out2.jpg');

Output:

toFile(
  fileOut: string,
  callback?: (err: Error, info: {format:string,size:number,width:number,height:number,channels:number,premultiplied:boolean,cropOffsetLeft?:number,cropOffsetTop?:number,attentionX?:number,attentionY?:number,pageHeight?:number,pages?:number,textAutofitDpi?:number}) => void
) ⇒ Promise<{...}>  
Throws: Error Invalid parameters


toBuffer(
  options?: { resolveWithObject?: boolean },
  callback?: (err: Error, data: Buffer, info: InfoObject) => void
) ⇒ Promise<Buffer|{data:Buffer,info:InfoObject}>  
Throws: Error Invalid parameters


metadata(
  callback?: (err: Error, metadata: {
    format:string,size?:number,width:number,height:number,space:string,channels:number,depth:string,
    density?:number,chromaSubsampling?:string,isProgressive?:boolean,isPalette?:boolean,
    bitsPerSample?:number,pages?:number,pageHeight?:number,loop?:number,delay?:number[],
    pagePrimary?:number,levels?:any[],subifds?:number,background?:any,compression?:string,
    resolutionUnit?:string,hasProfile?:boolean,hasAlpha?:boolean,orientation?:number,
    exif?:Buffer,icc?:Buffer,iptc?:Buffer,xmp?:Buffer,tifftagPhotoshop?:Buffer,formatMagick?:string,comments?:Array<any>
  }) => void
) ⇒ Promise<Object>

stats(
  callback?: (err: Error, stats: { channels:Array<{min:number,max:number,sum:number,squaresSum:number,mean:number,stdev:number,minX:number,minY:number,maxX:number,maxY:number}>, isOpaque:boolean, entropy:number, sharpness:number, dominant:{r:number,g:number,b:number} }) => void
) ⇒ Promise<Object>

Format Methods:
jpeg(options?: {quality?:number,progressive?:boolean,chromaSubsampling?:string,optimiseCoding?:boolean,mozjpeg?:boolean,trellisQuantisation?:boolean,overshootDeringing?:boolean,optimiseScans?:boolean,quantisationTable?:number,force?:boolean}) ⇒ Sharp
png(options?: {progressive?:boolean,compressionLevel?:number,adaptiveFiltering?:boolean,palette?:boolean,quality?:number,effort?:number,colours?:number,dither?:number,force?:boolean}) ⇒ Sharp
webp(options?: {quality?:number,alphaQuality?:number,lossless?:boolean,nearLossless?:boolean,smartSubsample?:boolean,smartDeblock?:boolean,preset?:string,effort?:number,loop?:number,delay?:number|number[],minSize?:boolean,mixed?:boolean,force?:boolean}) ⇒ Sharp
gif(options?: {reuse?:boolean,progressive?:boolean,colours?:number,effort?:number,dither?:number,interFrameMaxError?:number,interPaletteMaxError?:number,loop?:number,delay?:number|number[],force?:boolean}) ⇒ Sharp
tiff(options?: {quality?:number,compression?:string,predictor?:string,pyramid?:boolean,tile?:boolean,tileWidth?:number,tileHeight?:number,xres?:number,yres?:number,resolutionUnit?:string,bitdepth?:number,miniswhite?:boolean}) ⇒ Sharp
avif(options?: {quality?:number,lossless?:boolean,effort?:number,chromaSubsampling?:string,bitdepth?:number}) ⇒ Sharp
heif(options: {compression:string,quality?:number,lossless?:boolean,effort?:number,chromaSubsampling?:string,bitdepth?:number}) ⇒ Sharp

Best Practices:
• Always specify width and height to avoid default identity transform.  
• Use clone() for multi-output pipelines.  
• Preload jemalloc on glibc systems.  
• Strip metadata with toBuffer({resolveWithObject:true}) then keepMetadata() if needed.  

Troubleshooting:
• npm install errors: run npm cache clean --force; remove node_modules; install with --build-from-source.  
• FONTCONFIG error: set FONTCONFIG_PATH=/path/to/fontconfig  
• Electron packaging: ensure asarUnpack includes sharp; rebuild native modules with electron-rebuild.


## Information Dense Extract
sharp: high-speed libvips-based Node.js image processing. Install: npm/yarn/pnpm/bun/deno. Construct: new Sharp(input?,options?) with input types Buffer|TypedArray|string|Array; options {failOn:(none|truncated|error|warning),limitInputPixels:number|boolean,unlimited:boolean,autoOrient:boolean,sequentialRead:boolean,density:number,ignoreIcc:boolean,pages:number,page:number,subifd:number,level:number,pdfBackground:Color,animated:boolean,raw:{width,height,channels,premultiplied},create:{width,height,channels,background,noise},text:{text,font,fontfile,width,height,align,justify,dpi,rgba,spacing,wrap},join:{across,shim,background,animated,halign,valign}}. Core: resize(w,h,{fit,position,background,kernel,withoutEnlargement,fastShrinkOnLoad}), rotate(angle,{background}), extract({left,top,width,height}), composite([{input,blend,gravity,tile,left,top}]), gamma(g), clone(). Output: toFile(path,cb) ⇒ Promise<{format,size,width,height,channels,premultiplied,cropOffsetLeft,cropOffsetTop,attentionX,attentionY,pageHeight,pages,textAutofitDpi}>, toBuffer({resolveWithObject},cb) ⇒ Promise<Buffer|{data,info}>. Metadata: metadata() ⇒ Promise<{format,size?,width,height,space,channels,depth,density?,chromaSubsampling?,isProgressive?,isPalette?,bitsPerSample?,pages?,pageHeight?,loop?,delay?,pagePrimary?,levels?,subifds?,background?,compression?,resolutionUnit?,hasProfile?,hasAlpha?,orientation?,exif?,icc?,iptc?,xmp?,tifftagPhotoshop?,formatMagick?,comments?}>. Stats: stats() ⇒ Promise<{channels:[{min,max,sum,squaresSum,mean,stdev,minX,minY,maxX,maxY}],isOpaque,entropy,sharpness,dominant:{r,g,b}}>. Formats: jpeg({quality,progressive,chromaSubsampling,optimiseCoding,mozjpeg,trellisQuantisation,overshootDeringing,optimiseScans,quantisationTable,force}), png({progressive,compressionLevel,adaptiveFiltering,palette,quality,effort,colours,dither,force}), webp({quality,alphaQuality,lossless,nearLossless,smartSubsample,smartDeblock,preset,effort,loop,delay,minSize,mixed,force}), gif({reuse,progressive,colours,effort,dither,interFrameMaxError,interPaletteMaxError,loop,delay,force}), tiff({quality,compression,predictor,pyramid,tile,tileWidth,tileHeight,xres,yres,resolutionUnit,bitdepth,miniswhite}), avif({quality,lossless,effort,chromaSubsampling,bitdepth}), heif({compression,quality,lossless,effort,chromaSubsampling,bitdepth}). Env: flags (--cpu,--os,--libc), SHARP_IGNORE_GLOBAL_LIBVIPS, SHARP_FORCE_GLOBAL_LIBVIPS, build-from-source, C++17,node-addon-api≥7,node-gyp≥9. Bundlers: externals/asarUnpack configurations. AWS Lambda: include correct binaries, avoid symlinks, binaryMediaTypes. Memory: use jemalloc on glibc. Fonts: fontconfig, FONTCONFIG_PATH. Troubleshoot: npm cache clean, electron-rebuild, set env vars.


## Sanitised Extract
Table of Contents:
1. Installation  
2. Constructor & Options  
3. Core Processing Methods  
4. Output Methods  
5. Metadata & Statistics Methods  
6. Format-Specific Output Options  
7. Environment & Build Configuration  
8. Bundler & Deployment Integration  
9. Troubleshooting Procedures  

1. Installation
npm install sharp  
pnpm add sharp  
yarn add sharp  
bun add sharp  
deno run --allow-ffi ...

2. Constructor & Options
Signature: new Sharp(input?, options?)  Sharp  
input types: Buffer|ArrayBuffer|TypedArray|string|Array  
options:
  failOn: none|truncated|error|warning (default warning)  
  limitInputPixels: number|true|false (default 268402689)  
  unlimited: boolean (default false)  
  autoOrient: boolean (default false)  
  sequentialRead: boolean (default true)  
  density: number  
  ignoreIcc: boolean  
  pages: number (-1 for all)  
  page: number (zero-based)  
  subifd: number  
  level: number  
  pdfBackground: string|Object  
  animated: boolean  
  raw: { width: number, height: number, channels: number, premultiplied?: boolean }  
  create: { width: number, height: number, channels: 3|4, background: ColorObject, noise?: { type: gaussian, mean: number, sigma: number } }  
  text: { text: string, font?: string, fontfile?: string, width?: number, height?: number, align?: left|center|right, justify?: boolean, dpi?: number, rgba?: boolean, spacing?: number, wrap?: word|char|word-char|none }  
  join: { across: number, shim: number, background?: ColorObject, animated?: boolean, halign?: left|center|right, valign?: top|center|bottom }

3. Core Processing Methods
resize(width?: number, height?: number, options?: { fit, position, background, kernel, withoutEnlargement, fastShrinkOnLoad })  Sharp
rotate(angle?: number, options?: { background: ColorObject })  Sharp
extract({ left: number, top: number, width: number, height: number })  Sharp
composite([{ input: Buffer|string|Sharp, blend?: string, gravity?: string, tile?: boolean, top?: number, left?: number }])  Sharp
gamma(gamma?: number)  Sharp

4. Output Methods
toFile(fileOut: string, callback?: (err, info) => void)  Promise<{ format, size, width, height, channels, premultiplied, cropOffsetLeft?, cropOffsetTop?, attentionX?, attentionY?, pageHeight?, pages?, textAutofitDpi? }>
toBuffer(options?: { resolveWithObject: boolean }, callback?: (err, data, info) => void)  Promise<Buffer|{ data: Buffer, info: InfoObject }>

5. Metadata & Statistics Methods
metadata(callback?: (err, metadata) => void)  Promise<{ format, size?, width, height, space, channels, depth, density?, chromaSubsampling?, isProgressive?, isPalette?, bitsPerSample?, pages?, pageHeight?, loop?, delay?, pagePrimary?, levels?, subifds?, background?, compression?, resolutionUnit?, hasProfile?, hasAlpha?, orientation?, exif?, icc?, iptc?, xmp?, tifftagPhotoshop?, formatMagick?, comments? }>
stats(callback?: (err, stats) => void)  Promise<{ channels: Array<{ min, max, sum, squaresSum, mean, stdev, minX, minY, maxX, maxY }>, isOpaque, entropy, sharpness, dominant: { r, g, b } }>

6. Format-Specific Output Options
jpeg(options?: { quality:1-100, progressive:boolean, chromaSubsampling:4:2:0|4:4:4, optimiseCoding:boolean, mozjpeg:boolean, trellisQuantisation:boolean, overshootDeringing:boolean, optimiseScans:boolean, quantisationTable:0-8, force:boolean })  Sharp
png(options?: { progressive:boolean, compressionLevel:0-9, adaptiveFiltering:boolean, palette:boolean, quality:1-100, effort:1-10, colours:1-256, dither:0-1, force:boolean })  Sharp
webp(options?: { quality:1-100, alphaQuality:0-100, lossless:boolean, nearLossless:boolean, smartSubsample:boolean, smartDeblock:boolean, preset:default|photo|picture|drawing|icon|text, effort:0-6, loop:number, delay:number|number[], minSize:boolean, mixed:boolean, force:boolean })  Sharp
gif(options?: { reuse:boolean, progressive:boolean, colours:2-256, effort:1-10, dither:0-1, interFrameMaxError:0-32, interPaletteMaxError:0-256, loop:number, delay:number|number[], force:boolean })  Sharp
tiff(options?: { quality:1-100, compression:none|jpeg|deflate|packbits|ccittfax4|lzw|webp|zstd|jp2k, predictor:none|horizontal|float, pyramid:boolean, tile:boolean, tileWidth:number, tileHeight:number, xres:number, yres:number, resolutionUnit:inch|cm, bitdepth:1|2|4|8|16, miniswhite:boolean })  Sharp
avif(options?: { quality:1-100, lossless:boolean, effort:0-9, chromaSubsampling:4:2:0|4:4:4, bitdepth:8|10|12 })  Sharp
heif(options: { compression: av1|hevc, quality:1-100, lossless:boolean, effort:0-9, chromaSubsampling:4:2:0|4:4:4, bitdepth:8|10|12 })  Sharp

7. Environment & Build Configuration
Cross-platform install flags: npm install --cpu=<x64|arm64|wasm32> --os=<darwin|linux|win32> [--libc=<glibc|musl>]  
Custom libvips: require version  config.libvips, pkg-config --modversion vips-cpp; unsupported on Windows and macOS Rosetta  
Build from source: npm install --build-from-source or detect global libvips; environment variables SHARP_IGNORE_GLOBAL_LIBVIPS, SHARP_FORCE_GLOBAL_LIBVIPS  
Required: C++17 compiler, node-addon-api 7, node-gyp 9

8. Bundler & Deployment Integration
webpack: externals: { 'sharp': 'commonjs sharp' }  
esbuild: external: ['sharp']  
electron-builder: asarUnpack: ['**/node_modules/sharp/**/*']  
electron-forge: packagerConfig.asar.unpack: '**/node_modules/{sharp,@img}/**/*'  
vite: build.rollupOptions.external: ['sharp']
AWS Lambda: include linux-x64|arm64 binaries; avoid symlinks; set binary media types in API Gateway; memory 1536 MB for performance

9. Troubleshooting Procedures
npm v10+ monorepo lockfile: use --os, --cpu, --libc flags  
pnpm: add sharp to ignoredBuiltDependencies or onlyBuiltDependencies  
Fontconfig error: set FONTCONFIG_PATH to custom config  
Canvas+sharp conflict on Windows: avoid mixing both modules in same process

## Original Source
Sharp Image Processing Library
https://sharp.pixelplumbing.com/

## Digest of SHARP

# Sharp Image Processing Library Detailed Digest

Date Retrieved: 2024-06-<CURRENT_DATE>
Data Size: 7807087 bytes
Links Found: 19174

# Introduction
High-performance Node.js module powered by libvips for image conversion and processing in JavaScript runtimes supporting Node-API v9 (Node.js ≥18.17.0, Deno, Bun).

# Supported Formats
Input: JPEG, PNG, WebP, GIF, AVIF, TIFF, SVG
Output: JPEG, PNG, WebP, GIF, AVIF, TIFF, raw pixel data

# Installation
npm install sharp
pnpm add sharp (add to ignoredBuiltDependencies)
yarn add sharp
bun add sharp
deno run --allow-ffi ...

# Prebuilt Binaries
macOS x64/ARM64, Linux x64/ARM/ARM64/ppc64/s390x, Windows x64

# Constructor
new Sharp([input], [options]) ⇒ Sharp

# Core Methods
resize(width, height, [options]) ⇒ Sharp
rotate(angle, [options]) ⇒ Sharp
extract({ left, top, width, height }) ⇒ Sharp
composite([{ input, blend, gravity, ... }]) ⇒ Sharp
gamma(g) ⇒ Sharp

# Output
toFile(fileOut, [callback]) ⇒ Promise<Object>
toBuffer([options], [callback]) ⇒ Promise<Buffer>

# Metadata & Statistics
metadata([callback]) ⇒ Promise<Object>
stats([callback]) ⇒ Promise<Object>

# Format-Specific Methods
jpeg(options) ⇒ Sharp
png(options) ⇒ Sharp
webp(options) ⇒ Sharp
gif(options) ⇒ Sharp
tiff(options) ⇒ Sharp
avif(options) ⇒ Sharp
heif(options) ⇒ Sharp

# Environment & Advanced
Cross-platform installs (--cpu, --os, --libc)
Custom libvips (SHARP_IGNORE_GLOBAL_LIBVIPS, SHARP_FORCE_GLOBAL_LIBVIPS)
Building from source (C++17, node-addon-api ≥7, node-gyp ≥9)
Wasm support (--cpu=wasm32)
Bundler exclusions (webpack externals, esbuild external, electron unpack)
AWS Lambda packaging

# Troubleshooting
npm install errors (lockfile flags)
Fontconfig errors (FONTCONFIG_PATH)
Canvas conflict on Windows



## Attribution
- Source: Sharp Image Processing Library
- URL: https://sharp.pixelplumbing.com/
- License: MIT
- Crawl Date: 2025-05-11T05:01:51.100Z
- Data Size: 7807087 bytes
- Links Found: 19174

## Retrieved
2025-05-11
