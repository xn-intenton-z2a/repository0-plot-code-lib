library/SHARP_IMAGE_PROCESSING.md
# library/SHARP_IMAGE_PROCESSING.md
# SHARP_IMAGE_PROCESSING

## Crawl Summary
Installation commands for npm, pnpm, yarn, bun, deno; prebuilt binaries for major platforms; supported input/output formats; constructor signature and options; core input options with defaults and types; primary output methods toFile and toBuffer with parameters and return info; per-format methods (jpeg, png, webp, gif, tiff) with full option sets; memory and concurrency handled by libvips; custom libvips and build-from-source flags; bundler exclusion patterns; environment variables for fontconfig and global libvips; AWS Lambda packaging notes

## Normalised Extract
Table of Contents:
 1 Installation Commands
 2 Prebuilt Binaries and Supported Formats
 3 Constructor and Input Options
 4 Output Methods
 5 Format-specific Methods
 6 Bundler Exclusions and Environment Variables

1 Installation Commands
   npm install sharp
   pnpm add sharp (add to ignoredBuiltDependencies)
   yarn add sharp
   bun add sharp
   deno run --allow-ffi …

2 Prebuilt Binaries and Supported Formats
   Platforms: macOS x64/arm64, Linux x64/arm/arm64/ppc64/s390x, Windows x64/x86
   Read: JPEG, PNG, WebP, GIF, AVIF, TIFF, SVG
   Write: JPEG, PNG, WebP, GIF, AVIF, TIFF, raw pixels

3 Constructor and Input Options
   Signature: new Sharp([input], [options])
   input types: Buffer|TypedArray|string|Array
   options.failOn: none,truncated,error,warning(default warning)
   options.limitInputPixels: number|false|true(default268402689)
   options.unlimited: boolean(default false)
   options.autoOrient: boolean(default false)
   options.sequentialRead: boolean(default true)
   options.density: number-range1–100000(default72)
   options.ignoreIcc: boolean(default false)
   options.pages: number(default1)
   options.animated: boolean(defaultfalse)
   options.raw: width,height,channels,premultiplied
   options.create: width,height,channels,background,noise
   options.text: text,font,fontfile,width,height,align,justify,dpi,rgba,spacing,wrap
   options.join: across,animated,shim,background,halign,valign

4 Output Methods
   .toFile(path,[cb]) → Promise(info)
     info: format,size,width,height,channels,premultiplied, pageHeight,pages,…
   .toBuffer([opts],[cb]) → Promise<Buffer> or {data,info}
     opts.resolveWithObject: boolean

5 Format-specific Methods
   .jpeg(opts) quality1–100(def80),progressive,chrom aSubsampling,optimizeCoding,mozjpeg,trellisQuantisation,overshootDeringing,optimizeScans,quantisationTable0–8,force
   .png(opts) progressive,compressionLevel0–9,adaptiveFiltering,palette,quality1–100,effort1–10,colours2–256,dither0–1,force
   .webp(opts) quality1–100,alphaQuality0–100,lossless,nearLossless,smartSubsample,smartDeblock,preset,effort0–6,loop,delay,minSize,mixed,force
   .gif(opts) reuse,progressive,colours2–256,effort1–10,dither0–1,interFrameMaxError0–32,interPaletteMaxError0–256,loop,delay,force
   .tiff(opts) quality1–100,compression,predictor,pyramid,tile,tileWidth,tileHeight,xres,yres,resolutionUnit,bitdepth,mini swhite,force

6 Bundler Exclusions and Environment Variables
   webpack externals: {'sharp':'commonjs sharp'}
   esbuild --external:sharp
   electron asarUnpack/unpack patterns
   VITE build.rollupOptions.external:['sharp']
   SHARP_IGNORE_GLOBAL_LIBVIPS, SHARP_FORCE_GLOBAL_LIBVIPS
   FONTCONFIG_PATH for custom fontconfig


## Supplementary Details
Prebuilt binary selection at install based on OS, CPU, libc flags (--os, --cpu, --libc). Cross-platform npm install examples: npm install --cpu=x64 --os=darwin sharp; --libc=musl for Alpine. Use supportedArchitectures in yarn v3 and pnpm v8. Custom libvips requires pkg-config --modversion vips-cpp≥config.libvips version. Build-from-source flags: SHARP_IGNORE_GLOBAL_LIBVIPS=true, SHARP_FORCE_GLOBAL_LIBVIPS=true or npm install --build-from-source. Requires C++17 compiler, node-addon-api>=7, node-gyp>=9. For glibc allocator fragmentation, use jemalloc. For AWS Lambda, include linux-x64 or linux-arm64 binaries, avoid symlinks. Bundler externals: webpack externals{'sharp':'commonjs sharp'}, esbuild external sharp. Electron asarUnpack patterns in package.json or forge packagerConfig. Vite rollupOptions external: ['sharp']. TypeScript definitions included since v0.32.0, include @types/node. Font rendering: PANGOCAIRO_BACKEND=fontconfig on macOS Homebrew. In serverless, set FONTCONFIG_PATH. Known conflict: canvas with sharp on Windows can throw "The specified procedure could not be found."

## Reference Details
Constructor
  new Sharp([input], [options]) → Sharp
    input: Buffer|ArrayBuffer|Uint8Array|...|string|Array
    options.failOn: 'none'|'truncated'|'error'|'warning' (default 'warning')
    options.limitInputPixels: number|boolean (default 268402689)
    options.unlimited: boolean (default false)
    options.autoOrient: boolean (default false)
    options.sequentialRead: boolean (default true)
    options.density: number (1–100000, default 72)
    options.ignoreIcc: boolean (default false)
    options.pages: number (default 1, -1 for all)
    options.page: number (default 0)
    options.animated: boolean (default false)
    options.raw: {width:number,height:number,channels:number,premultiplied:boolean}
    options.create: {width:number,height:number,channels:3|4,background:{r,g,b,alpha}|string,noise:{type:'gaussian',mean:number,sigma:number}}
    options.text: {text:string,font:string,fontfile:string,width:number,height:number,align:'left'|'centre'|'center'|'right',justify:boolean,dpi:number,rgba:boolean,spacing:number,wrap:'word'|'char'|'word-char'|'none'}
    options.join: {across:number,animated:boolean,shim:number,background:{r,g,b,alpha}|string,halign:'left'|'centre'|'center'|'right',valign:'top'|'centre'|'center'|'bottom'}
    Throws: Error

Core Methods
  .clone() → Sharp
  .metadata(callback?) → Promise<Object>|Sharp; info:{format,size,width,height,space,channels,depth,density,...,orientation,exif,icc,iptc,xmp,...}
  .stats(callback?) → Promise<Object>; stats:{channels:[{min,max,sum,squaresSum,mean,stdev,minX,minY,maxX,maxY}],isOpaque,entropy,sharpness,dominant:{r,g,b}}
  .toFile(fileOut, callback?) → Promise<Object>; info:{format,size,width,height,channels,premultiplied,cropOffsetLeft,cropOffsetTop,attentionX,attentionY,pageHeight,pages,textAutofitDpi}
  .toBuffer(options?, callback?) → Promise<Buffer>|Promise<{data,info}>; options.resolveWithObject:boolean

Format Methods
  .jpeg(options?) → Sharp; options:{quality:1–100,progressive:boolean,chrom aSubsampling:'4:2:0'|'4:4:4',optimizeCoding:boolean,mozjpeg:boolean,trellisQuantisation:boolean,overshootDeringing:boolean,optimiseScans:boolean,quantizationTable:0–8,force:boolean}
  .png(options?) → Sharp; options:{progressive:boolean,compressionLevel:0–9,adaptiveFiltering:boolean,palette:boolean,quality:1–100,effort:1–10,colours:2–256,dither:0–1,force:boolean}
  .webp(options?) → Sharp; options:{quality:1–100,alphaQuality:0–100,lossless:boolean,nearLossless:boolean,smartSubsample:boolean,smartDeblock:boolean,preset:'default'|'photo'|'picture'|'drawing'|'icon'|'text',effort:0–6,loop:number,delay:number|Array<number>,minSize:boolean,mixed:boolean,force:boolean}
  .gif(options?) → Sharp; options:{reuse:boolean,progressive:boolean,colours:2–256,effort:1–10,dither:0–1,interFrameMaxError:0–32,interPaletteMaxError:0–256,loop:number,delay:number|Array<number>,force:boolean}
  .tiff(options?) → Sharp; options:{quality:1–100,force:boolean,compression:'none'|'jpeg'|'deflate'|'packbits'|'ccittfax4'|'lzw'|'webp'|'zstd'|'jp2k',predictor:'none'|'horizontal'|'float',pyramid:boolean,tile:boolean,tileWidth:number,tileHeight:number,xres:number,yres:number,resolutionUnit:'inch'|'cm',bitdepth:1|2|4|8,mini swhite:boolean}

Code Examples
  const pipeline = sharp().rotate();
  pipeline.clone().resize(800,600).pipe(writeStream);
  pipeline.clone().extract({left:20,top:20,width:100,height:100}).pipe(otherStream);
  files:
    await sharp('in.gif',{animated:true}).webp({effort:6}).toBuffer();
    await sharp(Buffer,data).png({palette:true,quality:90}).toFile('out.png');

Best Practices
  Use sequentialRead=false for random-access operations
  Use mozjpeg:true for reduced JPEG size (slower)
  Disable PNG filtering for diagrams
  Use adaptiveFiltering for photos
  For glibc, preload jemalloc to avoid memory fragmentation
  Unpack sharp from ASAR in Electron
  Exclude sharp from bundlers via externals

Troubleshooting
  npm install errors: run npm install --build-from-source or set SHARP_IGNORE_GLOBAL_LIBVIPS
  FreeBSD: install pkgconf and vips before npm install
  AWS Lambda: include correct platform binaries, avoid symlinks, set function memory ≥1536MB
  Fontconfig error: set FONTCONFIG_PATH to valid fontconfig directory
  Windows canvas conflict: use separate processes or remove one module

## Information Dense Extract
sharp([input]:Buffer|TypedArray|string|Array,options:Object)→Sharp  options.failOn:'none'|'truncated'|'error'|'warning'(default'warning')  limitInputPixels:number|false|true(default268402689)  unlimited:boolean(defaultfalse)  autoOrient:boolean(defaultfalse)  sequentialRead:boolean(defaulttrue)  density:number(1–100000,default72)  ignoreIcc:boolean(defaultfalse)  pages:number(default1,-1∀all)  page:number(default0)  animated:boolean(defaultfalse)  raw:{width,height,channels,premultiplied}  create:{width,height,channels,background,noise:{type:'gaussian',mean,sigma}}  text:{text,font,fontfile,width,height,align,justify,dpi,rgba,spacing,wrap}  join:{across,animated,shim,background,halign,valign}  .clone()→Sharp  .metadata()→Promise<{format,size,width,height,space,channels,depth,density,chromaSubsampling,isProgressive,isPalette,bitsPerSample,pages,pageHeight,loop,delay,pagePrimary,levels,subifds,background,compression,resolutionUnit,hasProfile,hasAlpha,orientation,exif,icc,iptc,xmp,tifftagPhotoshop,formatMagick,comments}>  .stats()→Promise<{channels:[{min,max,sum,squaresSum,mean,stdev,minX,minY,maxX,maxY}],isOpaque,entropy,sharpness,dominant:{r,g,b}}>  .toFile(path,[cb])→Promise<{format,size,width,height,channels,premultiplied,cropOffsetLeft,cropOffsetTop,attentionX,attentionY,pageHeight,pages,textAutofitDpi}>  .toBuffer({resolveWithObject},[cb])→Promise<Buffer>|Promise<{data,info}>  .jpeg({quality:1–100,progressive,chrom aSubsampling:'4:2:0'|'4:4:4',optimizeCoding,mozjpeg,trellisQuantisation,overshootDeringing,optimiseScans,quantisationTable:0–8,force})→Sharp  .png({progressive,compressionLevel:0–9,adaptiveFiltering,palette,quality:1–100,effort:1–10,colours:2–256,dither:0–1,force})→Sharp  .webp({quality:1–100,alphaQuality:0–100,lossless,nearLossless,smartSubsample,smartDeblock,preset,effort:0–6,loop,delay,minSize,mixed,force})→Sharp  .gif({reuse,progressive,colours:2–256,effort:1–10,dither:0–1,interFrameMaxError:0–32,interPaletteMaxError:0–256,loop,delay,force})→Sharp  .tiff({quality:1–100,compression,predictor,pyramid,tile,tileWidth,tileHeight,xres,yres,resolutionUnit: 'inch'|'cm',bitdepth:1|2|4|8,mini swhite,force})→Sharp  Env: SHARP_IGNORE_GLOBAL_LIBVIPS,SHARP_FORCE_GLOBAL_LIBVIPS,PANGOCAIRO_BACKEND=fontconfig,FONTCONFIG_PATH; Bundlers: webpack externals{'sharp':'commonjs sharp'},esbuild--external sharp; Electron asarUnpack; Vite external:['sharp']; AWS Lambda: include linux-x64/arm64 binaries, memory≥1536MB; glibc allocator→use jemalloc; FreeBSD→pkg install vips; build deps C++17,node-addon-api≥7,node-gyp≥9

## Sanitised Extract
Table of Contents:
 1 Installation Commands
 2 Prebuilt Binaries and Supported Formats
 3 Constructor and Input Options
 4 Output Methods
 5 Format-specific Methods
 6 Bundler Exclusions and Environment Variables

1 Installation Commands
   npm install sharp
   pnpm add sharp (add to ignoredBuiltDependencies)
   yarn add sharp
   bun add sharp
   deno run --allow-ffi 

2 Prebuilt Binaries and Supported Formats
   Platforms: macOS x64/arm64, Linux x64/arm/arm64/ppc64/s390x, Windows x64/x86
   Read: JPEG, PNG, WebP, GIF, AVIF, TIFF, SVG
   Write: JPEG, PNG, WebP, GIF, AVIF, TIFF, raw pixels

3 Constructor and Input Options
   Signature: new Sharp([input], [options])
   input types: Buffer|TypedArray|string|Array
   options.failOn: none,truncated,error,warning(default warning)
   options.limitInputPixels: number|false|true(default268402689)
   options.unlimited: boolean(default false)
   options.autoOrient: boolean(default false)
   options.sequentialRead: boolean(default true)
   options.density: number-range1100000(default72)
   options.ignoreIcc: boolean(default false)
   options.pages: number(default1)
   options.animated: boolean(defaultfalse)
   options.raw: width,height,channels,premultiplied
   options.create: width,height,channels,background,noise
   options.text: text,font,fontfile,width,height,align,justify,dpi,rgba,spacing,wrap
   options.join: across,animated,shim,background,halign,valign

4 Output Methods
   .toFile(path,[cb])  Promise(info)
     info: format,size,width,height,channels,premultiplied, pageHeight,pages,
   .toBuffer([opts],[cb])  Promise<Buffer> or {data,info}
     opts.resolveWithObject: boolean

5 Format-specific Methods
   .jpeg(opts) quality1100(def80),progressive,chrom aSubsampling,optimizeCoding,mozjpeg,trellisQuantisation,overshootDeringing,optimizeScans,quantisationTable08,force
   .png(opts) progressive,compressionLevel09,adaptiveFiltering,palette,quality1100,effort110,colours2256,dither01,force
   .webp(opts) quality1100,alphaQuality0100,lossless,nearLossless,smartSubsample,smartDeblock,preset,effort06,loop,delay,minSize,mixed,force
   .gif(opts) reuse,progressive,colours2256,effort110,dither01,interFrameMaxError032,interPaletteMaxError0256,loop,delay,force
   .tiff(opts) quality1100,compression,predictor,pyramid,tile,tileWidth,tileHeight,xres,yres,resolutionUnit,bitdepth,mini swhite,force

6 Bundler Exclusions and Environment Variables
   webpack externals: {'sharp':'commonjs sharp'}
   esbuild --external:sharp
   electron asarUnpack/unpack patterns
   VITE build.rollupOptions.external:['sharp']
   SHARP_IGNORE_GLOBAL_LIBVIPS, SHARP_FORCE_GLOBAL_LIBVIPS
   FONTCONFIG_PATH for custom fontconfig

## Original Source
Sharp Image Processing Library
https://sharp.pixelplumbing.com/

## Digest of SHARP_IMAGE_PROCESSING

# Installation
Supported package managers and commands:
- npm: npm install sharp
- pnpm: pnpm add sharp (may require adding sharp to ignoredBuiltDependencies)
- yarn: yarn add sharp
- bun: bun add sharp
- deno: deno run --allow-ffi ...

# Prebuilt Binaries
Platforms with provided binaries:
• macOS x64 (>= 10.15), macOS ARM64
• Linux x64, ARM, ARM64, ppc64, s390x
• Windows x64, x86
Supported input formats: JPEG, PNG, WebP, GIF, AVIF, TIFF, SVG
Supported output formats: JPEG, PNG, WebP, GIF, AVIF, TIFF, raw pixel data

# Constructor
new Sharp([input], [options])
Parameters
• input: Buffer|ArrayBuffer|TypedArray|string (file path)|Array of inputs
• options: Object with attributes
Throws: Error on invalid parameters

# Input Options
• failOn: 'none'|'truncated'|'error'|'warning' (default 'warning')
• limitInputPixels: number|boolean (default 268402689)
• unlimited: boolean (default false)
• autoOrient: boolean (default false)
• sequentialRead: boolean (default true)
• density: number (1–100000, default 72)
• ignoreIcc: boolean (default false)
• pages: number (default 1, -1 for all)
• page: number (default 0)
• animated: boolean (default false)
• raw: {width:number,height:number,channels:number,premultiplied:boolean}
• create: {width:number,height:number,channels:3|4,background:string|Object,noise:{type:'gaussian',mean:number,sigma:number}}
• text: {text:string,font:string,fontfile:string,width:number,height:number,align:'left'|'center'|'right',justify:boolean,dpi:number,rgba:boolean,spacing:number,wrap:'word'|'char'|'word-char'|'none'}
• join: {across:number,animated:boolean,shim:number,background:string|Object,halign:'left'|'center'|'right',valign:'top'|'center'|'bottom'}

# Output Methods
.toFile(fileOut, [callback]) ⇒ Promise<Object>
• fileOut: string, output path
• callback(err, info) where info: {format, size, width, height, channels, premultiplied, cropOffsetLeft, cropOffsetTop, attentionX, attentionY, pageHeight, pages, textAutofitDpi}

.toBuffer([options],[callback]) ⇒ Promise<Buffer> or Promise<{data:Buffer,info:Object}>
• options.resolveWithObject: boolean
• callback(err, data, info)

# Format-specific Methods
.jpeg([options]) ⇒ Sharp
• options: {quality:number(1–100, default 80),progressive:boolean,chrom aSubsampling:'4:2:0'|'4:4:4',optimizeCoding:boolean,mоzjpeg:boolean,trellisQuantisation:boolean,overshootDeringing:boolean,optimizeScans:boolean,quantisationTable:0–8,force:boolean}

.png([options]) ⇒ Sharp
• options: {progressive:boolean,compressionLevel:0–9,adaptiveFiltering:boolean,palette:boolean,quality:1–100,effort:1–10,colours:2–256,dither:0–1,force:boolean}

.webp([options]) ⇒ Sharp
• options: {quality:1–100,alphaQuality:0–100,lossless:boolean,nearLossless:boolean,smartSubsample:boolean,smartDeblock:boolean,preset:'default'|'photo'|'picture'|'drawing'|'icon'|'text',effort:0–6,loop:number,delay:number|number[],minSize:boolean,mixed:boolean,force:boolean}

.gif([options]) ⇒ Sharp
• options: {reuse:boolean,progressive:boolean,colours:2–256,effort:1–10,dither:0–1,interFrameMaxError:0–32,interPaletteMaxError:0–256,loop:number,delay:number|number[],force:boolean}

.tiff([options]) ⇒ Sharp
• options: {quality:1–100,compression:'none'|'jpeg'|'deflate'|'packbits'|'ccittfax4'|'lzw'|'webp'|'zstd'|'jp2k',predictor:'none'|'horizontal'|'float',pyramid:boolean,tile:boolean,tileWidth:number,tileHeight:number,xres:number,yres:number,resolutionUnit:'inch'|'cm',bitdepth:1|2|4|8,mini swhite:boolean,force:boolean}

# Retrieval
Content retrieved 2024-06-06
Data Size: 7721590 bytes
Attribution: Sharp by Lovell Fuller et al., Apache License 2.0

## Attribution
- Source: Sharp Image Processing Library
- URL: https://sharp.pixelplumbing.com/
- License: MIT
- Crawl Date: 2025-05-11T02:32:10.692Z
- Data Size: 7721590 bytes
- Links Found: 18966

## Retrieved
2025-05-11
