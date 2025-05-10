library/SHARP_CONSTRUCTOR.md
# library/SHARP_CONSTRUCTOR.md
# SHARP_CONSTRUCTOR

## Crawl Summary
Constructor signature and options defaults: failOn='warning', limitInputPixels=268402689, unlimited=false, autoOrient=false, sequentialRead=true, density=72, ignoreIcc=false, pages=1, page=0, subifd=-1, level=0, animated=false. Methods: clone() returns Sharp, metadata(callback?) returns Promise with fields format,string; size,number; width,number; height,number; space,string; channels,number; depth,string; density,number; chromaSubsampling,string; isProgressive,boolean; isPalette,boolean; bitsPerSample,number; pages,number; pageHeight,number; loop,number; delay,number[]; pagePrimary,number; levels,Object[]; subifds,number; background,Object; compression,string; resolutionUnit,string; hasProfile,boolean; hasAlpha,boolean; orientation,number; exif,Buffer; icc,Buffer; iptc,Buffer; xmp,Buffer; tifftagPhotoshop,Buffer; formatMagick,string; comments,[{keyword:string,text:string}]. stats(callback?) returns channel stats array with min,max,sum,squaresSum,mean,stdev,minX,minY,maxX,maxY; isOpaque,entropy,sharpness,dominant. Examples: pipeline, stream, create, animated, raw, text, join. Installation: npm install sharp; cross-platform flags --cpu, --os, --libc; build-from-source via env SHARP_IGNORE_GLOBAL_LIBVIPS, SHARP_FORCE_GLOBAL_LIBVIPS; prerequisites C++17, node-addon-api@7+, node-gyp@9+; use jemalloc on glibc Linux; AWS Lambda packaging rules; bundler externals for webpack, esbuild, vite, electron; Typescript definitions v0.32.0+; fontconfig env FONTCONFIG_PATH.

## Normalised Extract
Table of Contents:
1. Constructor Signature and Options
2. Events
3. Methods: clone, metadata, stats
4. Common Examples: resize, stream, create, animated, raw, text, join

1. Constructor Signature and Options
Signature: new Sharp(input?,options?) ⇒ Duplex
Options defaults:
  failOn='warning' limitInputPixels=268402689 unlimited=false autoOrient=false sequentialRead=true density=72 ignoreIcc=false pages=1 page=0 subifd=-1 level=0 animated=false
Nested objects:
  raw:{width,height,channels,premultiplied=false}
  create:{width,height,channels(3|4),background:{r,g,b,alpha},noise:{type:'gaussian',mean,sigma}}
  text:{text,font?,fontfile?,width=0,height=0,align='left',justify=false,dpi=72,rgba=false,spacing=0,wrap='word'}
  join:{across=1,animated=false,shim=0,background:{r,g,b,alpha},halign='left',valign='top'}

2. Events
  'info': emits {format,width,height,size,channels,...}
  'warning': emits string message

3. Methods
  clone() ⇒ Sharp
  metadata(callback?) ⇒ Promise<{format:string,size:number,width:number,height:number,space:string,channels:number,depth:string,density:number,...comments:[{keyword,text}]}> or callback(err,metadata)
  stats(callback?) ⇒ Promise<{channels:[{min,max,sum,squaresSum,mean,stdev,minX,minY,maxX,maxY}],isOpaque:boolean,entropy:number,sharpness:number,dominant:{r,g,b}}>

4. Examples
  Resize to file: sharp('in.jpg').resize(300,200).toFile('out.jpg')
  Stream pipeline: fetch->Readable.fromWeb->sharp().resize(300).on('info').pipe()
  Create RGBA image: sharp({create:{...}}).png().toBuffer()
  Animated GIF->WebP: sharp('in.gif',{animated:true}).webp().toFile()
  Raw pixels: sharp(Uint8Array,[raw:{width,height,channels}]).png()
  Text image: sharp({text:{text,width,height,font,fontfile,rgba,dpi}}).png()
  Join images: sharp([i1,i2,...],{join:{across,shim,animated}})


## Supplementary Details
Installation:
  npm install sharp
  pnpm add sharp --ignoreBuiltDependencies
  yarn add sharp
  bun add sharp
Cross-platform flags:
  npm install --cpu=x64 --os=darwin sharp
  npm install --cpu=arm64 --os=darwin sharp
  npm install --cpu=x64 --os=linux --libc=glibc sharp
  npm install --cpu=x64 --os=linux --libc=musl sharp
Custom libvips:
  Ensure version matches config.libvips in package.json
  pkg-config --modversion vips-cpp
  SHARP_IGNORE_GLOBAL_LIBVIPS=1 or SHARP_FORCE_GLOBAL_LIBVIPS=1
Build from source:
  Requires C++17, node-addon-api@7+, node-gyp@9+
  npm install --save node-addon-api node-gyp
Memory allocator:
  Use jemalloc on glibc-based Linux
AWS Lambda:
  Include linux-x64 or linux-arm64 binaries
  No symbolic links
  Configure AWS API Gateway binaryMediaTypes
Bundlers:
  webpack externals:{sharp:'commonjs sharp'}
  esbuild build({external:['sharp']})
  vite build.rollupOptions.external:['sharp']
  electron-builder asarUnpack '**/node_modules/sharp/**/*'
  electron-forge unpack '**/node_modules/{sharp,@img}/**/*'
Typescript:
  Types in package v0.32.0+; add @types/node devDependency
Fonts:
  Set FONTCONFIG_PATH or PANGOCAIRO_BACKEND=fontconfig
  Embedded SVG fonts unsupported

## Reference Details
API Specifications:

new Sharp(input?: Buffer|ArrayBuffer|TypedArray|string|Array<Buffer|TypedArray|string>, options?: {
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
  raw?:{width:number,height:number,channels:number,premultiplied?:boolean},
  create?:{width:number,height:number,channels:3|4,background?:string|{r:number,g:number,b:number,alpha:number},noise?:{type:'gaussian',mean:number,sigma:number}},
  text?:{text:string,font?:string,fontfile?:string,width?:number,height?:number,align?:'left'|'centre'|'center'|'right',justify?:boolean,dpi?:number,rgba?:boolean,spacing?:number,wrap?:'word'|'char'|'word-char'|'none'},
  join?:{across:number,animated?:boolean,shim?:number,background?:string|{r:number,g:number,b:number,alpha:number},halign?:'left'|'centre'|'center'|'right',valign?:'top'|'centre'|'center'|'bottom'}
}) ⇒ Duplex

clone() ⇒ Sharp

metadata(callback?: (err: Error, info: Metadata) => void) ⇒ Promise<Metadata>

interface Metadata {
  format: string;
  size?: number;
  width: number;
  height: number;
  space: string;
  channels: number;
  depth: string;
  density?: number;
  chromaSubsampling?: string;
  isProgressive?: boolean;
  isPalette?: boolean;
  bitsPerSample?: number;
  pages?: number;
  pageHeight?: number;
  loop?: number;
  delay?: number[];
  pagePrimary?: number;
  levels?: object[];
  subifds?: number;
  background?: { r:number,g:number,b:number,alpha:number };
  compression?: string;
  resolutionUnit?: string;
  hasProfile?: boolean;
  hasAlpha?: boolean;
  orientation?: number;
  exif?: Buffer;
  icc?: Buffer;
  iptc?: Buffer;
  xmp?: Buffer;
  tifftagPhotoshop?: Buffer;
  formatMagick?: string;
  comments?: { keyword:string, text:string }[];
}

stats(callback?: (err: Error, stats: Stats) => void) ⇒ Promise<Stats>

interface Stats {
  channels: { min:number, max:number, sum:number, squaresSum:number, mean:number, stdev:number, minX:number, minY:number, maxX:number, maxY:number }[];
  isOpaque: boolean;
  entropy: number;
  sharpness: number;
  dominant: { r:number, g:number, b:number };
}

Code Examples:

// Pipeline cloning best practice
const pipeline = sharp({ failOn:'none' }).rotate();
pipeline.clone().jpeg({ quality:100 }).toFile('orig.jpg');
pipeline.clone().resize({ width:500 }).jpeg({ quality:80 }).toFile('opt-500.jpg');
pipeline.clone().resize({ width:500 }).webp({ quality:80 }).toFile('opt-500.webp');

// Troubleshooting:
// Verify libvips version
pcg --modversion vips-cpp
// Force ignore global libvips
export SHARP_IGNORE_GLOBAL_LIBVIPS=1
npm rebuild sharp --verbose

// AWS Lambda packaging:
npm install --arch=x64 --platform=linux sharp
zip -r deploy.zip node_modules index.js

// Electron unpacking:
// electron-builder config in package.json
{
  "build":{
    "asar":true,
    "asarUnpack":["**/node_modules/sharp/**/*"]
  }
}


## Information Dense Extract
new Sharp(input?:Buffer|ArrayBuffer|Uint8Array|...|string|Array<...>,options?:{failOn:'none'|'truncated'|'error'|'warning',limitInputPixels:number|boolean=268402689,unlimited:boolean=false,autoOrient:boolean=false,sequentialRead:boolean=true,density:number=72,ignoreIcc:boolean=false,pages:number=1,page:number=0,subifd:number=-1,level:number=0,pdfBackground:string|{r,g,b,alpha},animated:boolean=false,raw:{width:number,height:number,channels:1-4,premultiplied:boolean},create:{width:number,height:number,channels:3|4,background:{r,g,b,alpha},noise:{type:'gaussian',mean:number,sigma:number}},text:{text:string,font?:string,fontfile?:string,width?:number,height?:number,align:'left'|'centre'|'center'|'right',justify:boolean,dpi:number=72,rgba:boolean,spacing:number,wrap:'word'|'char'|'word-char'|'none'},join:{across:number,animated:boolean,shim:number,background:{r,g,b,alpha},halign:'left'|'centre'|'center'|'right',valign:'top'|'centre'|'center'|'bottom'}})⇒Duplex; clone()⇒Sharp; metadata(callback?)⇒Promise<{format:string,size?:number,width:number,height:number,space:string,channels:number,depth:string,density?:number,chromaSubsampling?:string,isProgressive?:boolean,isPalette?:boolean,bitsPerSample?:number,pages?:number,pageHeight?:number,loop?:number,delay?:number[],pagePrimary?:number,levels?:object[],subifds?:number,background?:{r,g,b,alpha},compression?:string,resolutionUnit?:string,hasProfile?:boolean,hasAlpha?:boolean,orientation?:number,exif?:Buffer,icc?:Buffer,iptc?:Buffer,xmp?:Buffer,tifftagPhotoshop?:Buffer,formatMagick?:string,comments?:{keyword:string,text:string}[]}>; stats(callback?)⇒Promise<{channels:[{min,max,sum,squaresSum,mean,stdev,minX,minY,maxX,maxY}],isOpaque:boolean,entropy:number,sharpness:number,dominant:{r,g,b}}>; Installation: npm install sharp; cross: --cpu, --os, --libc; build-from-source: SHARP_IGNORE_GLOBAL_LIBVIPS, SHARP_FORCE_GLOBAL_LIBVIPS; bundlers externals; AWS Lambda packaging; memory allocator: jemalloc; fonts: FONTCONFIG_PATH.

## Sanitised Extract
Table of Contents:
1. Constructor Signature and Options
2. Events
3. Methods: clone, metadata, stats
4. Common Examples: resize, stream, create, animated, raw, text, join

1. Constructor Signature and Options
Signature: new Sharp(input?,options?)  Duplex
Options defaults:
  failOn='warning' limitInputPixels=268402689 unlimited=false autoOrient=false sequentialRead=true density=72 ignoreIcc=false pages=1 page=0 subifd=-1 level=0 animated=false
Nested objects:
  raw:{width,height,channels,premultiplied=false}
  create:{width,height,channels(3|4),background:{r,g,b,alpha},noise:{type:'gaussian',mean,sigma}}
  text:{text,font?,fontfile?,width=0,height=0,align='left',justify=false,dpi=72,rgba=false,spacing=0,wrap='word'}
  join:{across=1,animated=false,shim=0,background:{r,g,b,alpha},halign='left',valign='top'}

2. Events
  'info': emits {format,width,height,size,channels,...}
  'warning': emits string message

3. Methods
  clone()  Sharp
  metadata(callback?)  Promise<{format:string,size:number,width:number,height:number,space:string,channels:number,depth:string,density:number,...comments:[{keyword,text}]}> or callback(err,metadata)
  stats(callback?)  Promise<{channels:[{min,max,sum,squaresSum,mean,stdev,minX,minY,maxX,maxY}],isOpaque:boolean,entropy:number,sharpness:number,dominant:{r,g,b}}>

4. Examples
  Resize to file: sharp('in.jpg').resize(300,200).toFile('out.jpg')
  Stream pipeline: fetch->Readable.fromWeb->sharp().resize(300).on('info').pipe()
  Create RGBA image: sharp({create:{...}}).png().toBuffer()
  Animated GIF->WebP: sharp('in.gif',{animated:true}).webp().toFile()
  Raw pixels: sharp(Uint8Array,[raw:{width,height,channels}]).png()
  Text image: sharp({text:{text,width,height,font,fontfile,rgba,dpi}}).png()
  Join images: sharp([i1,i2,...],{join:{across,shim,animated}})

## Original Source
Sharp Image Processing Library
https://sharp.pixelplumbing.com/api-constructor

## Digest of SHARP_CONSTRUCTOR

# Constructor: new Sharp([input], [options])

Exact signature:

new Sharp(
  input?: Buffer | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array | string | Array<Buffer|TypedArray|string>,
  options?: {
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
    pdfBackground?: string | { r: number, g: number, b: number, alpha: number },
    animated?: boolean,
    raw?: { width: number, height: number, channels: number, premultiplied?: boolean },
    create?: { width: number, height: number, channels: 3 | 4, background?: string | { r: number, g: number, b: number, alpha: number }, noise?: { type: 'gaussian', mean: number, sigma: number } },
    text?: { text: string, font?: string, fontfile?: string, width?: number, height?: number, align?: 'left' | 'centre' | 'center' | 'right', justify?: boolean, dpi?: number, rgba?: boolean, spacing?: number, wrap?: 'word' | 'char' | 'word-char' | 'none' },
    join?: { across: number, animated?: boolean, shim?: number, background?: string | { r: number, g: number, b: number, alpha: number }, halign?: 'left' | 'centre' | 'center' | 'right', valign?: 'top' | 'centre' | 'center' | 'bottom' }
  }
) ⇒ Duplex

Emits events: 'info' with callback ({ width: number, height: number, channels: number, size: number }) and 'warning' with string message.
Throws: Error on invalid parameters.

# Method: clone()

Signature:

clone() ⇒ Sharp

Creates a snapshot of the pipeline, inheriting input, allowing multiple outputs from same stream.

# Method: metadata([callback]) ⇒ Promise<Object> | Sharp

Returns header-only image metadata without decoding pixels. Callback signature (err, metadata).

# Method: stats([callback]) ⇒ Promise<Object>

Computes pixel statistics per channel. Callback signature (err, statsResult).

# Examples

1. Basic resize to file:

sharp('input.jpg')
  .resize(300, 200)
  .toFile('output.jpg', function(err) {
    // output.jpg is 300x200 cropped image
  });

2. Stream pipeline with info event:

const { body } = fetch('https://...');
const transformer = sharp()
  .resize(300)
  .on('info', ({ width, height }) => {
    console.log(width, height);
  });
Readable.fromWeb(body).pipe(transformer).pipe(writableStream);

3. Create blank RGBA image:

sharp({ create: { width: 300, height: 200, channels: 4, background: { r: 255, g: 0, b: 0, alpha: 0.5 } } })
  .png()
  .toBuffer();

4. Animated conversion:

await sharp('in.gif', { animated: true }).webp().toFile('out.webp');

5. Raw pixel input:

const input = Uint8Array.from([255,255,255,0,0,0]);
const image = sharp(input, { raw: { width: 2, height: 1, channels: 3 } });
await image.png().toFile('two-pixels.png');

## Attribution
- Source: Sharp Image Processing Library
- URL: https://sharp.pixelplumbing.com/api-constructor
- License: License: Apache-2.0
- Crawl Date: 2025-05-10T10:01:31.034Z
- Data Size: 7606056 bytes
- Links Found: 18947

## Retrieved
2025-05-10
