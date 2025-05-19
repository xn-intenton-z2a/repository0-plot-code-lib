# NODE_CANVAS

## Crawl Summary
npm install canvas
Supported on macOS x86/64 and aarch64, Linux x86/64, Windows x86/64
Node.js ≥ 18.12.0
Optional build dependencies: Cairo≥1.10.0, Pango, libpng, jpeg, giflib, librsvg
Utility methods: createCanvas, createImageData, loadImage, registerFont, deregisterAllFonts
Core Canvas APIs: toBuffer, createPNGStream, createJPEGStream, createPDFStream, toDataURL
Context properties: patternQuality, quality, textDrawingMode, globalCompositeOperation='saturate', antialias
PDF: createCanvas(...,'pdf'), addPage, beginTag/endTag
SVG: createCanvas(...,'svg'), toBuffer
Experimental pixelFormats via getContext options
Testing commands and benchmarks available

## Normalised Extract
Table of Contents
 1 Installation
 2 Compiling
 3 Utility Methods
 4 Non-standard APIs
 5 Context Properties
 6 PDF Output
 7 SVG Output
 8 Pixel Formats
 9 Testing

1 Installation
 Command: npm install canvas
 Supported platforms: macOS x86/64, macOS aarch64, Linux x86/64, Windows x86/64
 Minimum Node.js: 18.12.0

2 Compiling
 --build-from-source flag
 Dependencies: pkg-config, cairo>=1.10.0, pango, libpng, jpeg, giflib, librsvg
 One-line install examples for macOS, Ubuntu, Fedora, Solaris, OpenBSD

3 Utility Methods
 createCanvas(width:number, height:number, type?:'pdf'|'svg') => Canvas
 createImageData(width:number, height:number) => ImageData
 createImageData(data:Uint8ClampedArray|Uint16Array, width:number, height?:number) => ImageData
 loadImage(src:string|Buffer) => Promise<Image>
 registerFont(path:string, { family:string; weight?:string; style?:string }) => void
 deregisterAllFonts() => void

4 Non-standard APIs
 Image#src:string|Buffer
 Image#dataMode:number (use Image.MODE_MIME, Image.MODE_IMAGE)
 Canvas#toBuffer(callback? (err,buf)=>void, mimeType?:string, config?:object )=>Buffer|void
 Canvas#createPNGStream(config?:{compressionLevel:number;filters:number;palette:Uint8ClampedArray;backgroundIndex:number;resolution:number})=>ReadableStream
 Canvas#createJPEGStream(config?:{quality:number;progressive:boolean;chromaSubsampling:boolean})=>ReadableStream
 Canvas#createPDFStream(config?:{title:string;author:string;subject:string;keywords:string;creator:string;creationDate:Date;modDate:Date})=>ReadableStream
 Canvas#toDataURL(mimeType?:string, qualityOrConfig?:number|object, callback?:function)=>string|void

5 Context Properties
 patternQuality:'fast'|'good'|'best'|'nearest'|'bilinear' default: 'good'
 quality:'fast'|'good'|'best'|'nearest'|'bilinear' default: 'good'
 textDrawingMode:'path'|'glyph' default: 'path'
 globalCompositeOperation additional value: 'saturate'
 antialias:'default'|'none'|'gray'|'subpixel'

6 PDF Output
 createCanvas(w,h,'pdf') => PDF Canvas
 canvas.addPage(width?:number, height?:number)
 canvas.beginTag(name:string, attrs:string)
 canvas.endTag(name:string)
 canvas.toBuffer('application/pdf', { title, author, subject, keywords, creator, creationDate, modDate })

7 SVG Output
 createCanvas(w,h,'svg') => SVG Canvas
 canvas.toBuffer('image/svg+xml')

8 Pixel Formats
 Modes: RGBA32 (default), RGB24, A8, RGB16_565, A1, RGB30
 Usage: canvas.getContext('2d', { pixelFormat:'<mode>' })
 Note: A1, RGB30 incomplete; endianness affects getImageData, putImageData

9 Testing
 Commands: npm install --build-from-source; npm run test-server; npm run test

## Supplementary Details
Node.js ≥18.12.0 required. Build from source with npm install --build-from-source. Cairo dependency v1.10.0+; metadata support requires Cairo v1.16.0+. Pango and pkg-config mandatory. Optional libs: libpng, jpeg, giflib, librsvg. MacOS: Homebrew install pkg-config cairo pango libpng jpeg giflib librsvg pixman python-setuptools. Ubuntu: apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev. Fedora: yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel. Solaris: pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto. OpenBSD: pkg_add cairo pango png jpeg giflib. Xcode command line tools: xcode-select --install. NPM ≥6.4.1 for source builds on Xcode10+. Use deregisterAllFonts() in afterEach hooks to clear fonts. Visual tests: npm run test-server at localhost:4000.

## Reference Details
createCanvas(width: number, height: number, type?: 'pdf'|'svg'): Canvas
createImageData(width: number, height: number): ImageData
createImageData(data: Uint8ClampedArray|Uint16Array, width: number, height?: number): ImageData
loadImage(src: string|Buffer): Promise<Image>
registerFont(path: string, options: { family: string; weight?: string; style?: string }): void
deregisterAllFonts(): void

class Image
 src: string|Buffer
 onload: () => void
 onerror: (err: Error) => void
 dataMode: number (constants: Image.MODE_MIME=1, Image.MODE_IMAGE=2)

class Canvas
 toBuffer(callback?: (err: Error|null, buf: Buffer)=>void, mimeType?: string, config?: any): Buffer|void
 toBuffer(mimeType?: string, config?: any): Buffer
 createPNGStream(config?: { compressionLevel?: number; filters?: number; palette?: Uint8ClampedArray; backgroundIndex?: number; resolution?: number }): ReadableStream
 createJPEGStream(config?: { quality?: number; progressive?: boolean; chromaSubsampling?: boolean }): ReadableStream
 createPDFStream(config?: { title?: string; author?: string; subject?: string; keywords?: string; creator?: string; creationDate?: Date; modDate?: Date }): ReadableStream
 toDataURL(mimeType?: string|((err:Error|null,data:string)=>void), qualityOrConfig?: number|object, callback?: (err:Error|null,data:string)=>void): string|void

class CanvasRenderingContext2D
 getContext('2d', options?: { pixelFormat?: 'RGBA32'|'RGB24'|'A8'|'RGB16_565'|'A1'|'RGB30'; alpha?: boolean }): CanvasRenderingContext2D
 patternQuality: 'fast'|'good'|'best'|'nearest'|'bilinear'
 quality: 'fast'|'good'|'best'|'nearest'|'bilinear'
 textDrawingMode: 'path'|'glyph'
 globalCompositeOperation: string (includes 'saturate')
 antialias: 'default'|'none'|'gray'|'subpixel'

PDF Methods
 addPage(width?: number, height?: number): void
 beginTag(tag: string, attrs: string): void
 endTag(tag: string): void

Usage examples
const { createCanvas, loadImage, registerFont, Image } = require('canvas')
registerFont('comicsans.ttf', { family: 'Comic Sans' })
const canvas = createCanvas(600,400)
const ctx = canvas.getContext('2d')
ctx.font = '20px "Comic Sans"'
ctx.fillText('Hello',50,50)
await loadImage('http://example.com/img.png').then(img=>ctx.drawImage(img,0,0))
const buf = canvas.toBuffer('image/png',{compressionLevel:3,filters:0})

Troubleshooting
macOS compile errors: xcode-select --install
Xcode10+ builds: require npm>=6.4.1
Missing cairo: brew install cairo pkg-config or apt-get install libcairo2-dev pkg-config
JPEG support missing: install libjpeg-dev then rebuild
Restore fonts in tests: use deregisterAllFonts() in afterEach


## Information Dense Extract
Node≥18.12.0; npm install canvas; prebuilt macOS x86_64,aarch64; Linux x86_64; Windows x86_64; --build-from-source flag; Cairo≥1.10.0,Pango,pkg-config; optional libpng,jpeg,giflib,librsvg; createCanvas(w,h,type?); createImageData(width,height)/createImageData(data,width,height?); loadImage(src)→Promise; registerFont(path,{family,weight?,style?}); deregisterAllFonts(); Image.src:string|Buffer; Image.dataMode:MODE_MIME=1,MODE_IMAGE=2; Canvas.toBuffer(cb?,mimeType?,config?)→Buffer; createPNGStream({compressionLevel?,filters?,palette?,backgroundIndex?,resolution?}); createJPEGStream({quality?,progressive?,chromaSubsampling?}); createPDFStream({title?,author?,subject?,keywords?,creator?,creationDate?,modDate?}); toDataURL(mimeType?,qualityOrConfig?,cb?); Context: patternQuality,quality,textDrawingMode,globalCompositeOperation='saturate',antialias; PDF: addPage(w?,h?),beginTag(tag,attrs),endTag(tag); SVG: createCanvas(...,'svg'),toBuffer(); pixelFormat via getContext('2d',{pixelFormat}); testing: npm run test-server,test; troubleshooting: xcode-select --install, npm>=6.4.1, reinstall cairo libs then rebuild.

## Sanitised Extract
Table of Contents
 1 Installation
 2 Compiling
 3 Utility Methods
 4 Non-standard APIs
 5 Context Properties
 6 PDF Output
 7 SVG Output
 8 Pixel Formats
 9 Testing

1 Installation
 Command: npm install canvas
 Supported platforms: macOS x86/64, macOS aarch64, Linux x86/64, Windows x86/64
 Minimum Node.js: 18.12.0

2 Compiling
 --build-from-source flag
 Dependencies: pkg-config, cairo>=1.10.0, pango, libpng, jpeg, giflib, librsvg
 One-line install examples for macOS, Ubuntu, Fedora, Solaris, OpenBSD

3 Utility Methods
 createCanvas(width:number, height:number, type?:'pdf'|'svg') => Canvas
 createImageData(width:number, height:number) => ImageData
 createImageData(data:Uint8ClampedArray|Uint16Array, width:number, height?:number) => ImageData
 loadImage(src:string|Buffer) => Promise<Image>
 registerFont(path:string, { family:string; weight?:string; style?:string }) => void
 deregisterAllFonts() => void

4 Non-standard APIs
 Image#src:string|Buffer
 Image#dataMode:number (use Image.MODE_MIME, Image.MODE_IMAGE)
 Canvas#toBuffer(callback? (err,buf)=>void, mimeType?:string, config?:object )=>Buffer|void
 Canvas#createPNGStream(config?:{compressionLevel:number;filters:number;palette:Uint8ClampedArray;backgroundIndex:number;resolution:number})=>ReadableStream
 Canvas#createJPEGStream(config?:{quality:number;progressive:boolean;chromaSubsampling:boolean})=>ReadableStream
 Canvas#createPDFStream(config?:{title:string;author:string;subject:string;keywords:string;creator:string;creationDate:Date;modDate:Date})=>ReadableStream
 Canvas#toDataURL(mimeType?:string, qualityOrConfig?:number|object, callback?:function)=>string|void

5 Context Properties
 patternQuality:'fast'|'good'|'best'|'nearest'|'bilinear' default: 'good'
 quality:'fast'|'good'|'best'|'nearest'|'bilinear' default: 'good'
 textDrawingMode:'path'|'glyph' default: 'path'
 globalCompositeOperation additional value: 'saturate'
 antialias:'default'|'none'|'gray'|'subpixel'

6 PDF Output
 createCanvas(w,h,'pdf') => PDF Canvas
 canvas.addPage(width?:number, height?:number)
 canvas.beginTag(name:string, attrs:string)
 canvas.endTag(name:string)
 canvas.toBuffer('application/pdf', { title, author, subject, keywords, creator, creationDate, modDate })

7 SVG Output
 createCanvas(w,h,'svg') => SVG Canvas
 canvas.toBuffer('image/svg+xml')

8 Pixel Formats
 Modes: RGBA32 (default), RGB24, A8, RGB16_565, A1, RGB30
 Usage: canvas.getContext('2d', { pixelFormat:'<mode>' })
 Note: A1, RGB30 incomplete; endianness affects getImageData, putImageData

9 Testing
 Commands: npm install --build-from-source; npm run test-server; npm run test

## Original Source
node-canvas – Canvas API for Node.js
https://github.com/Automattic/node-canvas

## Digest of NODE_CANVAS

# Node-Canvas

Date retrieved: 2024-06-01
Source: https://github.com/Automattic/node-canvas
Data size: 688005 bytes

# Installation

Command
  npm install canvas

Supported platforms (prebuilt binaries)
  macOS x86/64
  macOS aarch64
  Linux x86/64 (glibc only)
  Windows x86/64

Minimum Node.js version
  18.12.0

# Compiling

Flags
  --build-from-source: force local compilation

Required system libraries
  Cairo v1.10.0 or later
  Pango
  pkg-config

Optional libraries (for extra image formats)
  libpng
  jpeg
  giflib
  librsvg

One-line install commands
  macOS: brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman python-setuptools
  Ubuntu: sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
  Fedora: sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
  Solaris: pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
  OpenBSD: doas pkg_add cairo pango png jpeg giflib
  Windows/Others: see wiki

# Utility Methods

createCanvas(width: number, height: number, type?: 'pdf'|'svg') => Canvas
createImageData(width: number, height: number) => ImageData
createImageData(data: Uint8ClampedArray|Uint16Array, width: number, height?: number) => ImageData
loadImage(src: string|Buffer) => Promise<Image>
registerFont(path: string, options: { family: string; weight?: string; style?: string }) => void
deregisterAllFonts() => void

# Non-standard Canvas APIs

Image#src: string|Buffer
Image#dataMode: number (use Image.MODE_MIME, Image.MODE_IMAGE)
Canvas#toBuffer(callback?: (err: Error|null, buf: Buffer) => void, mimeType?: string, config?: any) => Buffer|void
Canvas#createPNGStream(config?: { compressionLevel?: number; filters?: number; palette?: Uint8ClampedArray; backgroundIndex?: number; resolution?: number }) => ReadableStream
Canvas#createJPEGStream(config?: { quality?: number; progressive?: boolean; chromaSubsampling?: boolean }) => ReadableStream
Canvas#createPDFStream(config?: { title?: string; author?: string; subject?: string; keywords?: string; creator?: string; creationDate?: Date; modDate?: Date }) => ReadableStream
Canvas#toDataURL(mimeType?: string, qualityOrConfig?: number|object, callback?: (err: Error|null, data: string) => void) => string|void

# Context Properties

patternQuality: 'fast'|'good'|'best'|'nearest'|'bilinear' (default 'good')
quality: 'fast'|'good'|'best'|'nearest'|'bilinear' (default 'good')
textDrawingMode: 'path'|'glyph' (default 'path')
globalCompositeOperation includes 'saturate'
antialias: 'default'|'none'|'gray'|'subpixel'

# PDF Support

createCanvas(...,'pdf') => Canvas with PDF mode
Canvas.addPage(width?: number, height?: number) => void
Canvas.beginTag(name: string, attrs: string) => void
Canvas.endTag(name: string) => void

# SVG Support

createCanvas(...,'svg') => Canvas with SVG mode
canvas.toBuffer() => Buffer containing SVG

# Pixel Formats (experimental)

Available modes
  RGBA32 (default)
  RGB24 (alpha always opaque)
  A8 (8-bit per pixel)
  RGB16_565 (16-bit color)
  A1 (1-bit per pixel)
  RGB30 (30-bit color)

Context attribute for pixelFormat: canvas.getContext('2d', { pixelFormat: '<mode>' })

# Testing & Benchmarks

npm install --build-from-source
npm run test-server (visual tests at http://localhost:4000)
npm run test (unit tests)

# License
MIT License


## Attribution
- Source: node-canvas – Canvas API for Node.js
- URL: https://github.com/Automattic/node-canvas
- License: License MIT
- Crawl Date: 2025-05-19T18:31:55.668Z
- Data Size: 688005 bytes
- Links Found: 5316

## Retrieved
2025-05-19
