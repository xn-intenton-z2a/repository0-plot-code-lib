# SHARP_CONSTRUCTOR

## Crawl Summary
Signature: new Sharp([input], [options]) -> Sharp
Input: Buffer|ArrayBuffer|TypedArray|string path; supports JPEG, PNG, WebP, GIF, AVIF, SVG, TIFF, raw pixel data.
Options:
 failOn: 'none'|'truncated'|'error'|'warning' (default 'warning')
 limitInputPixels: number|boolean (default 268402689)
 unlimited: boolean (default false)
 autoOrient: boolean (default false)
 sequentialRead: boolean (default true)
 density: number (1-100000, default 72)
 ignoreIcc: boolean (default false)
 pages: number (default 1), page: number (default 0)
 subifd: number (default -1), level: number (default 0)
 pdfBackground: string|Object, animated: boolean (default false)
 raw: { width, height, channels, premultiplied }
 create: { width, height, channels, background, noise:{ type:'gaussian', mean, sigma }}
 text: { text, font, fontfile, width, height, align, justify, dpi, rgba, spacing, wrap }
 join: { across, animated, shim, background, halign, valign }
Examples: chaining, stream transform, blank image, animated conversion, raw pixel input, noise generation, text rendering, join grid.

## Normalised Extract
Table of Contents:
1. Constructor Signature
2. Input Types
3. Option Parameters
4. Create Option
5. Text Option
6. Join Option
7. Raw Option
8. Examples

1. Constructor Signature:
new Sharp(input?, options?) => Sharp instance
 Implements stream.Duplex; emits 'info','warning'; throws Error on invalid parameters

2. Input Types:
Buffer | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array | string file path | Array of inputs
 Supported formats: JPEG, PNG, WebP, AVIF, GIF, SVG, TIFF, raw pixel data

3. Option Parameters:
 failOn (string): 'none'|'truncated'|'error'|'warning' default 'warning'
 limitInputPixels (number|boolean): pixel limit default 268402689; false/0 disable; true use default
 unlimited (boolean): default false; disable memory safeguards
 autoOrient (boolean): default false; apply EXIF orientation
 sequentialRead (boolean): default true; false for random access
 density (number): 1-100000 default 72
 ignoreIcc (boolean): default false; ignore ICC profile
 pages (number): default 1; -1 all pages
 page (number): default 0; start page index
 subifd (number): default -1; OME-TIFF subIFD index
 level (number): default 0; multi-level input level
 pdfBackground (string|Object): PDF transparency background
 animated (boolean): default false; read all frames

4. Create Option:
 create.width (number)
 create.height (number)
 create.channels (3|4)
 create.background (string|Object)
 create.noise.type ('gaussian')
 create.noise.mean (number)
 create.noise.sigma (number)

5. Text Option:
 text.text (string)
 text.font (string)
 text.fontfile (string)
 text.width (number)
 text.height (number)
 text.align ('left','centre','center','right')
 text.justify (boolean)
 text.dpi (number)
 text.rgba (boolean)
 text.spacing (number)
 text.wrap ('word','char','word-char','none')

6. Join Option:
 join.across (number)
 join.animated (boolean)
 join.shim (number)
 join.background (string|Object)
 join.halign ('left','centre','center','right')
 join.valign ('top','centre','center','bottom')

7. Raw Option:
 raw.width (number)
 raw.height (number)
 raw.channels (number)
 raw.premultiplied (boolean)

8. Examples:
 sharp('in.jpg').resize(w,h).toFile(path)
 sharp().resize(w).on('info',cb).pipe()
 sharp({ create:{...}}).png().toBuffer()
 await sharp('in.gif',{animated:true}).toFile('out.webp')
 await sharp(input,{ raw:{ width,height,channels }}).toFile()
 await sharp({ text:{...}}).toFile()
 await sharp([img1,img2],{ join:{ across,shim }}).toFile()

## Supplementary Details
Essential specifications:
- Default pixel limit 268402689 (0x3FFF x 0x3FFF); set limitInputPixels to 0 to disable; true uses default.
- failOn levels: 'none' ignores invalid pixels; 'truncated' aborts on partial data; 'error' aborts on errors; 'warning' logs and continues.
- unlimited:true disables safety checks; risk memory exhaustion.
- To auto-rotate EXIF: autoOrient:true.
- For random access decoding: sequentialRead:false.
- DPI for vector input: density:72-100000.
- Extract all pages: pages:-1; start at page index: page.
- OME-TIFF subIFD selection: subifd index.
- Multi-level inputs (OpenSlide): level index.
- PDF rendering requires libvips with support; set pdfBackground as CSS color or object {r,g,b,alpha}.
- Raw pixel input requires width,height,channels, optional premultiplied flag.
- Create blank image: specify create.width,height,channels,background components; add noise with gaussian type, mean, sigma.
- Text generation uses Pango; text.font or fontfile; rgba:true for alpha.
- Join arrays: across count, shim pixels, halign, valign, animated for output format.

Implementation steps:
1. require('sharp')
2. const image = sharp(input, options)
3. chain operations (resize, rotate, extract)
4. output via toFile, toBuffer, pipe
5. listen to 'info' for metadata
6. handle warnings via 'warning' event

Memory allocator best practice: on glibc Linux, use jemalloc via LD_PRELOAD or alternative allocator to avoid fragmentation.


## Reference Details
API Specification:

constructor Sharp(input?: Buffer|ArrayBuffer|TypedArray|string|Array, options?: {
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
  pdfBackground?: string|{ r:number,g:number,b:number,alpha:number },
  animated?: boolean,
  raw?: { width:number,height:number,channels:number,premultiplied?:boolean },
  create?: { width:number,height:number,channels:3|4,background:string|{r:number,g:number,b:number,alpha:number},noise?:{ type:'gaussian',mean:number,sigma:number } },
  text?: { text:string,font?:string,fontfile?:string,width?:number,height?:number,align?:'left'|'centre'|'center'|'right',justify?:boolean,dpi?:number,rgba?:boolean,spacing?:number,wrap?:'word'|'char'|'word-char'|'none' },
  join?: { across?:number,animated?:boolean,shim?:number,background?:string|{r:number,g:number,b:number,alpha:number},halign?:'left'|'centre'|'center'|'right',valign?:'top'|'centre'|'center'|'bottom' }
}): Sharp

Events: 'info' with metadata object; 'warning' with warning details.

Sharp methods inherit input pipeline; use clone() to snapshot.

Code Examples:

// Multiple pipelines from one input
const pipeline = sharp({ failOn:'none' });
pipeline.clone().jpeg({ quality:100 }).toFile('orig.jpg');
pipeline.clone().resize({ width:500 }).jpeg({ quality:80 }).toFile('opt-500.jpg');
pipeline.clone().resize({ width:500 }).webp({ quality:80 }).toFile('opt-500.webp');
got.stream('https://...').pipe(pipeline);

// Memory allocator workaround on Linux
yarn add jemalloc; LD_PRELOAD=libjemalloc.so node app.js

// AWS Lambda bundling
npm install --cpu=x64 --os=linux sharp
Ensure node_modules includes linux-x64 binaries. Increase function memory to 1536MB.

// Bundler exclusion
esbuild app.js --bundle --platform=node --external:sharp
webpack.config.js externals: { sharp:'commonjs sharp' }

Troubleshooting:
- Invalid pixel data abort: adjust failOn
- Out-of-memory: set unlimited:true or use alternative allocator
- Missing fonts on Linux: set FONTCONFIG_PATH to directory with fontconfig files
- PDF rendering errors: install libvips with PDF support

Detailed Steps:
1. Install sharp: npm install sharp
2. require and invoke constructor with desired options
3. Chain transform methods
4. Choose output: .toFile(path, callback) or .toBuffer().then()
5. Use .metadata() before operations for dimensions
6. Handle events: .on('info',cb) and .on('warning',cb)


## Information Dense Extract
new Sharp(input?,options?)=>Sharp stream.Duplex; input: Buffer|TypedArray|string path|Array; options: {
 failOn:'none'|'truncated'|'error'|'warning' (warning);
 limitInputPixels:number|boolean (268402689);
 unlimited:boolean (false);
 autoOrient:boolean (false);
 sequentialRead:boolean (true);
 density:number (1-100000,72);
 ignoreIcc:boolean (false);
 pages:number (1|-1);
 page:number (0);
 subifd:number (-1);
 level:number (0);
 pdfBackground:string|{r,g,b,alpha};
 animated:boolean (false);
 raw:{width,height,channels,premultiplied?};
 create:{width,height,channels(3|4),background,noise:{type:'gaussian',mean,sigma}};
 text:{text,font,fontfile?,width?,height?,align,justify?,dpi?,rgba?,spacing?,wrap?};
 join:{across,animated?,shim,background,halign,valign};
}
Examples: .resize(w,h).toFile(); .on('info',cb); .clone(); .toBuffer(); await .metadata(); Troubleshooting: failOn adjust; unlimited or jemalloc for memory; FONTCONFIG_PATH for fonts; ensure PDF libvips; bundler externals; AWS Lambda binaries.

## Sanitised Extract
Table of Contents:
1. Constructor Signature
2. Input Types
3. Option Parameters
4. Create Option
5. Text Option
6. Join Option
7. Raw Option
8. Examples

1. Constructor Signature:
new Sharp(input?, options?) => Sharp instance
 Implements stream.Duplex; emits 'info','warning'; throws Error on invalid parameters

2. Input Types:
Buffer | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array | string file path | Array of inputs
 Supported formats: JPEG, PNG, WebP, AVIF, GIF, SVG, TIFF, raw pixel data

3. Option Parameters:
 failOn (string): 'none'|'truncated'|'error'|'warning' default 'warning'
 limitInputPixels (number|boolean): pixel limit default 268402689; false/0 disable; true use default
 unlimited (boolean): default false; disable memory safeguards
 autoOrient (boolean): default false; apply EXIF orientation
 sequentialRead (boolean): default true; false for random access
 density (number): 1-100000 default 72
 ignoreIcc (boolean): default false; ignore ICC profile
 pages (number): default 1; -1 all pages
 page (number): default 0; start page index
 subifd (number): default -1; OME-TIFF subIFD index
 level (number): default 0; multi-level input level
 pdfBackground (string|Object): PDF transparency background
 animated (boolean): default false; read all frames

4. Create Option:
 create.width (number)
 create.height (number)
 create.channels (3|4)
 create.background (string|Object)
 create.noise.type ('gaussian')
 create.noise.mean (number)
 create.noise.sigma (number)

5. Text Option:
 text.text (string)
 text.font (string)
 text.fontfile (string)
 text.width (number)
 text.height (number)
 text.align ('left','centre','center','right')
 text.justify (boolean)
 text.dpi (number)
 text.rgba (boolean)
 text.spacing (number)
 text.wrap ('word','char','word-char','none')

6. Join Option:
 join.across (number)
 join.animated (boolean)
 join.shim (number)
 join.background (string|Object)
 join.halign ('left','centre','center','right')
 join.valign ('top','centre','center','bottom')

7. Raw Option:
 raw.width (number)
 raw.height (number)
 raw.channels (number)
 raw.premultiplied (boolean)

8. Examples:
 sharp('in.jpg').resize(w,h).toFile(path)
 sharp().resize(w).on('info',cb).pipe()
 sharp({ create:{...}}).png().toBuffer()
 await sharp('in.gif',{animated:true}).toFile('out.webp')
 await sharp(input,{ raw:{ width,height,channels }}).toFile()
 await sharp({ text:{...}}).toFile()
 await sharp([img1,img2],{ join:{ across,shim }}).toFile()

## Original Source
Sharp Image Processing Library
https://sharp.pixelplumbing.com/api-constructor

## Digest of SHARP_CONSTRUCTOR

# Constructor Sharp

new Sharp([input], [options])

Constructor factory to create an instance of sharp, to which further methods are chained. Emits 'info' and 'warning' events. Implements stream.Duplex. Throws Error on invalid parameters.

Parameters:

[input] Buffer | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array | string | Array
  If present, may be a Buffer/ArrayBuffer/Uint8Array/Uint8ClampedArray containing JPEG, PNG, WebP, AVIF, GIF, SVG or TIFF image data; a TypedArray of raw pixel data; or a String path to an image file. Can be an array of such inputs to join.

[options] Object (optional) with attributes:

  failOn         string   default 'warning'
                 one of 'none','truncated','error','warning' to abort processing of invalid pixel data. Invalid metadata always aborts.
  limitInputPixels number|boolean  default 268402689
                 maximum pixels (width x height) allowed. false or 0 to disable; true to use default limit.
  unlimited      boolean  default false
                 disable safety features to prevent memory exhaustion.
  autoOrient     boolean  default false
                 rotate/flip image based on EXIF Orientation.
  sequentialRead boolean  default true
                 false to use random access rather than sequential read.
  density        number   default 72
                 DPI for vector images (1 to 100000).
  ignoreIcc      boolean  default false
                 ignore embedded ICC profile.
  pages          number   default 1
                 number of pages/frames to extract (-1 for all).
  page           number   default 0
                 zero-based start page for multi-page input.
  subifd         number   default -1
                 subIFD index for OME-TIFF, defaults to main image.
  level          number   default 0
                 multi-level input level for OpenSlide.
  pdfBackground  string|Object
                 background colour for PDF rendering.
  animated       boolean  default false
                 read all frames/pages (equivalent pages=-1).
  raw            Object describes raw pixel input:
                   width        number
                   height       number
                   channels     number (1 to 4)
                   premultiplied boolean (default false)
  create         Object describes new image creation:
                   width        number
                   height       number
                   channels     number (3 or 4)
                   background   string|Object
                   noise        Object:
                     type      'gaussian'
                     mean      number
                     sigma     number
  text           Object describes new text image:
                   text         string UTF-8 with optional Pango markup
                   font         string
                   fontfile     string path
                   width        number
                   height       number
                   align        'left','centre','center','right'
                   justify      boolean
                   dpi          number default 72
                   rgba         boolean
                   spacing      number
                   wrap         'word','char','word-char','none'
  join           Object describes joining array of inputs:
                   across       number
                   animated     boolean
                   shim         number
                   background   string|Object
                   halign       'left','centre','center','right'
                   valign       'top','centre','center','bottom'

Examples:

sharp('input.jpg')  .resize(300, 200)  .toFile('output.jpg', function(err) { /* callback */ });

const { body } = fetch('https://...');
const transformer = sharp().resize(300).on('info', ({ height }) => console.log(height));
Readable.fromWeb(body).pipe(transformer).pipe(writableStream);

sharp({ create: { width:300, height:200, channels:4, background:{ r:255, g:0, b:0, alpha:0.5 }}}).png().toBuffer();

await sharp('in.gif', { animated:true }).toFile('out.webp');

const input = Uint8Array.from([255,255,255,0,0,0]);
await sharp(input, { raw:{ width:2, height:1, channels:3 }}).toFile('two.png');

await sharp({ create:{ width:300, height:200, channels:3, noise:{ type:'gaussian', mean:128, sigma:30 }}}).toFile('noise.png');

await sharp({ text:{ text:'Hello', width:400, height:300 } }).toFile('text.png');

await sharp([img1, img2, img3, img4], { join:{ across:2, shim:4 }}).toFile('grid.png');

## Attribution
- Source: Sharp Image Processing Library
- URL: https://sharp.pixelplumbing.com/api-constructor
- License: License: Apache-2.0
- Crawl Date: 2025-05-06T14:30:11.578Z
- Data Size: 6407230 bytes
- Links Found: 18125

## Retrieved
2025-05-06
