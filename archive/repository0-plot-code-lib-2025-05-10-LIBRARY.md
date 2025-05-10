library/SHARP_CONSTRUCTOR.md
# library/SHARP_CONSTRUCTOR.md
# SHARP_CONSTRUCTOR

## Crawl Summary
Signature: new Sharp([input], [options]). Implements stream.Duplex; emits info and warning events. Throws Error on invalid parameters. input accepts Buffer/ArrayBuffer/TypedArray/String or array; options object with 50+ fields: failOn, limitInputPixels, unlimited, autoOrient, sequentialRead, density, ignoreIcc, pages, page, subifd, level, pdfBackground, animated, raw (width,height,channels,premultiplied), create (width,height,channels,background,noise.type,noise.mean,noise.sigma), text (text,font,fontfile,width,height,align,justify,dpi,rgba,spacing,wrap), join (across,animated,shim,background,halign,valign). Examples: resize toFile, stream pipeline, create blank image, clone pipelines.

## Normalised Extract
Table of Contents
1 Constructor Signature and Behavior
2 Input Parameter Types
3 Options Object Fields
4 Events and Errors
5 Usage Patterns with Examples

1 Constructor Signature and Behavior
new Sharp([input], [options])  
Implements stream.Duplex  
Emits: info, warning  
Animated input frames stacked vertically (height = pageHeight × pages)  
Throws: Error Invalid parameters

2 Input Parameter Types
input: Buffer | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array | string | Array<any>  
Accepts image data buffers, raw pixel arrays, file paths, array of inputs, or omitted for stream input.

3 Options Object Fields
failOn: 'none' | 'truncated' | 'error' | 'warning' (default 'warning')
limitInputPixels: number | boolean (default 268402689)  
unlimited: boolean (default false)
autoOrient: boolean (default false)
sequentialRead: boolean (default true)
density: number (1–100000, default 72)
ignoreIcc: boolean (default false)
pages: number (default 1, -1 for all)
page: number (default 0)
subifd: number (default -1)
level: number (default 0)
pdfBackground: string | Object
animated: boolean (default false)
raw.width: number
raw.height: number
raw.channels: number
raw.premultiplied: boolean (default false)
create.width: number
create.height: number
create.channels: number
create.background: string | Object
create.noise.type: 'gaussian'
create.noise.mean: number
create.noise.sigma: number
text.text: string
text.font: string
text.fontfile: string
text.width: number (default 0)
text.height: number (default 0)
text.align: 'left' | 'centre' | 'center' | 'right' (default 'left')
text.justify: boolean (default false)
text.dpi: number (default 72)
text.rgba: boolean (default false)
text.spacing: number (default 0)
text.wrap: 'word' | 'char' | 'word-char' | 'none' (default 'word')
join.across: number (default 1)
join.animated: boolean (default false)
join.shim: number (default 0)
join.background: string | Object
join.halign: 'left' | 'centre' | 'center' | 'right' (default 'left')
join.valign: 'top' | 'centre' | 'center' | 'bottom' (default 'top')

4 Events and Errors
info: Emitted on derived attribute availability in stream output
warning: Emitted on non-critical processing issues
Throws Error Invalid parameters on invalid input or options

5 Usage Patterns with Examples
• Single pipeline: sharp('in.jpg').resize(300,200).toFile('out.jpg')
• Stream pipeline: fetch → Readable.fromWeb → sharp().resize(…) → pipe w/ on('info')
• Blank image: sharp({create:{width, height, channels, background}}).png().toBuffer()
• Clone for parallel outputs: pipeline.clone().resize().toFile(), pipeline.clone().extract().toBuffer()

## Supplementary Details
• Error and Warning Handling: Use options.failOn to control abort sensitivity; listen to 'warning' events for recoverable issues.  
• Memory Safety: limitInputPixels default prevents >268402689 pixels. Set unlimited=true to disable.  
• EXIF Orientation: autoOrient enables rotation/flip in constructor.  
• Raw Input: supply raw.width, raw.height, raw.channels; premultiplied option avoids double premultiplication.  
• PDF Support: pdfBackground requires globally installed libvips with PDFium or Poppler.  
• Animated Input: animated=true or pages=-1 to read all frames.  
• Composite Inputs: array input joined via join object; join.across and join.shim control layout.  
• Multi-output Pipelines: use clone() to create independent transformations from same input stream.  
• Performance: constructor implements Duplex; supports streaming conversion without full buffer decode.  
• Multi-page Images: options.page and options.pages control extraction range for GIF, WebP, TIFF.  
• Node-API Environments: compatible with Node.js ≥18.17.0, Deno, Bun via Node-API v9.  
• Troubleshooting: ensure libvips version ≥ config.libvips in package.json; use SHARP_IGNORE_GLOBAL_LIBVIPS or SHARP_FORCE_GLOBAL_LIBVIPS to override detection.  
• PDF and SVG Rendering: require external libvips support; errors on missing dependencies.  
• Font Rendering: PANGOCAIRO_BACKEND=fontconfig on Homebrew macOS; FONTCONFIG_PATH for custom fonts in serverless.  
• Known Conflicts: Canvas + Sharp on Windows may produce 'specified procedure could not be found'.

## Reference Details
### Constructor API

#### new Sharp([input], [options]) ⇒ Sharp

Parameters:
- input: Buffer|ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|Uint16Array|Int16Array|Uint32Array|Int32Array|Float32Array|Float64Array|string|Array<input>: image data or file path or array of inputs or omitted for streaming.
- options: Object with fields:
  • failOn: 'none'|'truncated'|'error'|'warning' (default 'warning')
  • limitInputPixels: number|boolean (default 268402689)
  • unlimited: boolean (default false)
  • autoOrient: boolean (default false)
  • sequentialRead: boolean (default true)
  • density: number (default 72)
  • ignoreIcc: boolean (default false)
  • pages: number (default 1)
  • page: number (default 0)
  • subifd: number (default -1)
  • level: number (default 0)
  • pdfBackground: string|Object
  • animated: boolean (default false)
  • raw: { width: number, height: number, channels: number, premultiplied: boolean }
  • create: { width: number, height: number, channels: number, background: string|Object, noise: { type: 'gaussian', mean: number, sigma: number } }
  • text: { text: string, font?: string, fontfile?: string, width: number, height: number, align: 'left'|'centre'|'center'|'right', justify: boolean, dpi: number, rgba: boolean, spacing: number, wrap: 'word'|'char'|'word-char'|'none' }
  • join: { across: number, animated: boolean, shim: number, background: string|Object, halign: 'left'|'centre'|'center'|'right', valign: 'top'|'centre'|'center'|'bottom' }

Returns: Sharp instance
Throws: Error on invalid parameters

### Methods

#### clone() ⇒ Sharp
Clone pipeline for branching transformations. Retains same input. Use for parallel outputs.

### Code Examples

1. Basic resize and file output:

```js
sharp('input.jpg')
  .resize(300, 200)
  .toFile('output.jpg', (err, info) => {
    if (err) throw err;
    console.log(info);
  });
```

2. Stream pipeline with info event:

```js
import fetch from 'node-fetch';
const response = await fetch('https://example.com/image.jpg');
const transformer = sharp({ failOn: 'none' })
  .resize({ width: 300 })
  .on('info', info => console.log(info));

Readable.fromWeb(response.body)
  .pipe(transformer)
  .pipe(fs.createWriteStream('resized.jpg'));
```

3. Create and save blank PNG:

```js
await sharp({
  create: {
    width: 300,
    height: 200,
    channels: 4,
    background: { r: 255, g: 0, b: 0, alpha: 0.5 }
  }
})
.png()
.toFile('blank.png');
```

4. Animated GIF → WebP:

```js
await sharp('in.gif', { animated: true })
  .webp({ quality: 80 })
  .toFile('out.webp');
```

5. Raw pixel input:

```js
const pixels = Uint8Array.from([255,255,255, 0,0,0]);
const img = sharp(pixels, { raw: { width: 2, height: 1, channels: 3 } });
await img.png().toFile('two-pixels.png');
```

6. Pipeline cloning for multi-format outputs:

```js
const base = sharp('input.jpg', { failOn: 'none' });
const tasks = [
  base.clone().jpeg({ quality: 100 }).toFile('orig.jpg'),
  base.clone().resize({ width: 500 }).jpeg({ quality: 80 }).toFile('small.jpg'),
  base.clone().resize({ width: 500 }).webp({ quality: 80 }).toFile('small.webp')
];
await Promise.all(tasks);
```

### Best Practices
- Use clone() to branch pipelines without re-reading input stream.
- Control memory via limitInputPixels and unlimited settings.
- Enable autoOrient for correct EXIF alignment.
- For PDF/SVG, ensure libvips compiled with required dependencies.
- Listen to 'info' and 'warning' events for runtime insights.

### Troubleshooting
1. Missing global libvips: set SHARP_FORCE_GLOBAL_LIBVIPS=1 or SHARP_IGNORE_GLOBAL_LIBVIPS=1.
2. PDF background errors: install libvips with poppler or pdfium and rebuild.
3. Fontconfig errors: set FONTCONFIG_PATH to a valid fontconfig directory, or on macOS Homebrew set PANGOCAIRO_BACKEND=fontconfig.
4. Windows canvas conflict: avoid using canvas and sharp in same process; isolate modules.

### Configuration Options
- Environment variables:
  • SHARP_IGNORE_GLOBAL_LIBVIPS: never use global libvips
  • SHARP_FORCE_GLOBAL_LIBVIPS: always use global libvips
  • PANGOCAIRO_BACKEND: fontconfig on macOS Homebrew
  • FONTCONFIG_PATH: custom fonts directory

- Cross-platform binaries via npm flags: --platform, --arch, --libc

### Deployment Notes
- AWS Lambda: include linux-x64 or linux-arm64 binaries in node_modules; avoid symlinks; allocate ≥1536MB memory.
- Bundlers: exclude sharp via externals in webpack, esbuild, vite, electron-builder.

### Return Types
- toFile(): Promise resolving to { format, size, width, height, channels }
- toBuffer(): Promise<Buffer>
- clone(): Sharp

### Events
- 'info': callback(info: { format, size, width, height, channels, ... })
- 'warning': callback(message: string)

### Exceptions
- Error: Invalid parameters



## Information Dense Extract
new Sharp([input], [options]) ⇒ Sharp; stream.Duplex; emits info, warning; throws Error on invalid parameters. input: Buffer|ArrayBuffer|TypedArray|string|Array; options:{failOn:'none'|'truncated'|'error'|'warning',limitInputPixels:number|boolean,unlimited:boolean,autoOrient:boolean,sequentialRead:boolean,density:number,ignoreIcc:boolean,pages:number,page:number,subifd:number,level:number,pdfBackground:string|Object,animated:boolean,raw:{width:number,height:number,channels:number,premultiplied:boolean},create:{width:number,height:number,channels:number,background:string|Object,noise:{type:'gaussian',mean:number,sigma:number}},text:{text:string,font?:string,fontfile?:string,width:number,height:number,align:'left'|'centre'|'center'|'right',justify:boolean,dpi:number,rgba:boolean,spacing:number,wrap:'word'|'char'|'word-char'|'none'},join:{across:number,animated:boolean,shim:number,background:string|Object,halign:'left'|'centre'|'center'|'right',valign:'top'|'centre'|'center'|'bottom'}}. Methods: clone()⇒Sharp. Examples: .resize().toFile(), stream pipeline with on('info'), create blank via create, animated GIF→WebP, raw pixel import, branch pipelines via clone. Best practices: use clone for parallel outputs, control memory via limitInputPixels/unlimited, autoOrient for EXIF. Env: SHARP_IGNORE_GLOBAL_LIBVIPS, SHARP_FORCE_GLOBAL_LIBVIPS, PANGOCAIRO_BACKEND, FONTCONFIG_PATH. Troubleshoot: rebuild libvips PDF support, fontconfig path, avoid canvas conflict. Return types: toFile→Promise<{format,size,width,height,channels,...}>, toBuffer→Promise<Buffer>.

## Sanitised Extract
Table of Contents
1 Constructor Signature and Behavior
2 Input Parameter Types
3 Options Object Fields
4 Events and Errors
5 Usage Patterns with Examples

1 Constructor Signature and Behavior
new Sharp([input], [options])  
Implements stream.Duplex  
Emits: info, warning  
Animated input frames stacked vertically (height = pageHeight  pages)  
Throws: Error Invalid parameters

2 Input Parameter Types
input: Buffer | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array | string | Array<any>  
Accepts image data buffers, raw pixel arrays, file paths, array of inputs, or omitted for stream input.

3 Options Object Fields
failOn: 'none' | 'truncated' | 'error' | 'warning' (default 'warning')
limitInputPixels: number | boolean (default 268402689)  
unlimited: boolean (default false)
autoOrient: boolean (default false)
sequentialRead: boolean (default true)
density: number (1100000, default 72)
ignoreIcc: boolean (default false)
pages: number (default 1, -1 for all)
page: number (default 0)
subifd: number (default -1)
level: number (default 0)
pdfBackground: string | Object
animated: boolean (default false)
raw.width: number
raw.height: number
raw.channels: number
raw.premultiplied: boolean (default false)
create.width: number
create.height: number
create.channels: number
create.background: string | Object
create.noise.type: 'gaussian'
create.noise.mean: number
create.noise.sigma: number
text.text: string
text.font: string
text.fontfile: string
text.width: number (default 0)
text.height: number (default 0)
text.align: 'left' | 'centre' | 'center' | 'right' (default 'left')
text.justify: boolean (default false)
text.dpi: number (default 72)
text.rgba: boolean (default false)
text.spacing: number (default 0)
text.wrap: 'word' | 'char' | 'word-char' | 'none' (default 'word')
join.across: number (default 1)
join.animated: boolean (default false)
join.shim: number (default 0)
join.background: string | Object
join.halign: 'left' | 'centre' | 'center' | 'right' (default 'left')
join.valign: 'top' | 'centre' | 'center' | 'bottom' (default 'top')

4 Events and Errors
info: Emitted on derived attribute availability in stream output
warning: Emitted on non-critical processing issues
Throws Error Invalid parameters on invalid input or options

5 Usage Patterns with Examples
 Single pipeline: sharp('in.jpg').resize(300,200).toFile('out.jpg')
 Stream pipeline: fetch  Readable.fromWeb  sharp().resize()  pipe w/ on('info')
 Blank image: sharp({create:{width, height, channels, background}}).png().toBuffer()
 Clone for parallel outputs: pipeline.clone().resize().toFile(), pipeline.clone().extract().toBuffer()

## Original Source
Sharp Image Processing Library
https://sharp.pixelplumbing.com/api-constructor

## Digest of SHARP_CONSTRUCTOR

# Constructor

## Signature

```
new Sharp([input], [options])
```  
Emits: `info`, `warning`  
Implements: `stream.Duplex`  

## Behavior  
• Streams JPEG, PNG, WebP, GIF, AVIF or TIFF image data.  
• Derived attributes emitted via `info` event on stream-based output.  
• Non-critical problems emitted via `warning` events.  
• Multi-page/frame animated input combined as vertically-stacked image (height = pageHeight × pages).

## Throws  
- `Error` Invalid parameters

## Parameters

| Name     | Type                                                                                                             | Default   | Description                                                                                                                                                                                                                                                                                       |
|----------|------------------------------------------------------------------------------------------------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| input    | Buffer  ArrayBuffer  Uint8Array  Uint8ClampedArray  Int8Array  Uint16Array  Int16Array  Uint32Array  Int32Array  Float32Array  Float64Array  string  Array<any> | —         | Buffer/ArrayBuffer/TypedArray containing JPEG, PNG, WebP, AVIF, GIF, SVG, TIFF data or raw pixel data; string path to image file; array of inputs joined together; or stream when omitted.                                                                                                      |
| options  | Object                                                                                                           | —         | Configuration object. See options fields below.                                                                                                                                                                                                                                                   |

### Options Fields

| Field              | Type                         | Default    | Description                                                                                                                                                   |
|--------------------|------------------------------|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| failOn             | 'none','truncated','error','warning' | 'warning' | Abort on invalid pixel data at specified sensitivity; invalid metadata always aborts.                                                                       |
| limitInputPixels   | number  boolean        | 268402689  | Maximum pixel count (width × height); 0 or false to disable; true uses default.                                                                               |
| unlimited          | boolean                      | false      | Remove safety limits preventing memory exhaustion.                                                                                                           |
| autoOrient         | boolean                      | false      | Rotate/flip according to EXIF Orientation.                                                                                                                  |
| sequentialRead     | boolean                      | true       | Use sequential rather than random access.                                                                                                                    |
| density            | number                       | 72         | DPI for vector images (1–100000).                                                                                                                           |
| ignoreIcc          | boolean                      | false      | Ignore embedded ICC profile.                                                                                                                                 |
| pages              | number                       | 1          | Number of pages to extract for multi-page input; -1 for all.                                                                                                |
| page               | number                       | 0          | Start page index for multi-page input.                                                                                                                      |
| subifd             | number                       | -1         | SubIFD index for OME-TIFF; defaults to main image.                                                                                                          |
| level              | number                       | 0          | Level index for multi-level input (OpenSlide).                                                                                                             |
| pdfBackground      | string  Object         | —          | Background color for PDF transparency; accepts color module formats; requires libvips PDF support.                                                           |
| animated           | boolean                      | false      | Read all frames/pages of animated image. Equivalent to pages = -1.                                                                                           |
| raw                | Object                       | —          | Describe raw pixel data. See raw() documentation.                                                                                                           |
| raw.width          | number                       | —          | Pixel width for raw input.                                                                                                                                  |
| raw.height         | number                       | —          | Pixel height for raw input.                                                                                                                                 |
| raw.channels       | number                       | —          | Channel count (1–4) for raw input.                                                                                                                         |
| raw.premultiplied  | boolean                      | false      | Input already premultiplied; skip premultiplication.                                                                                                        |
| create             | Object                       | —          | Create blank image.                                                                                                                                         |
| create.width       | number                       | —          | Width for new image.                                                                                                                                        |
| create.height      | number                       | —          | Height for new image.                                                                                                                                       |
| create.channels    | number                       | —          | Channel count (3 or 4) for new image.                                                                                                                       |
| create.background  | string  Object         | —          | Background color for new image.                                                                                                                             |
| create.noise       | Object                       | —          | Generate noise.                                                                                                                                             |
| create.noise.type  | 'gaussian'                   | —          | Noise type.                                                                                                                                                  |
| create.noise.mean  | number                       | —          | Mean pixel value for noise.                                                                                                                                 |
| create.noise.sigma | number                       | —          | Standard deviation for noise.                                                                                                                               |
| text               | Object                       | —          | Render text as image.                                                                                                                                       |
| text.text          | string                       | —          | UTF-8 string or Pango markup.                                                                                                                               |
| text.font          | string                       | —          | Font name.                                                                                                                                                   |
| text.fontfile      | string                       | —          | Absolute path to font file.                                                                                                                                 |
| text.width         | number                       | 0          | Word-wrap width.                                                                                                                                             |
| text.height        | number                       | 0          | Max pixel height; ignores dpi.                                                                                                                              |
| text.align         | 'left','centre','center','right' | 'left'   | Text alignment.                                                                                                                                              |
| text.justify       | boolean                      | false      | Justify text.                                                                                                                                                |
| text.dpi           | number                       | 72         | Render resolution; ignored if height specified.                                                                                                             |
| text.rgba          | boolean                      | false      | Enable RGBA output.                                                                                                                                         |
| text.spacing       | number                       | 0          | Line height in points.                                                                                                                                      |
| text.wrap          | 'word','char','word-char','none' | 'word' | Word wrap style when width set.                                                                                                                             |
| join               | Object                       | —          | Join array of inputs.                                                                                                                                       |
| join.across        | number                       | 1          | Images per row.                                                                                                                                              |
| join.animated      | boolean                      | false      | Output as animated image.                                                                                                                                  |
| join.shim          | number                       | 0          | Pixels between images.                                                                                                                                      |
| join.background    | string  Object         | —          | Background for shim.                                                                                                                                        |
| join.halign        | 'left','centre','center','right' | 'left' | Horizontal alignment.                                                                                                                                       |
| join.valign        | 'top','centre','center','bottom' | 'top' | Vertical alignment.                                                                                                                                         |

## Examples

1. Resize input.jpg to 300×200 and write to output.jpg:

```js
sharp('input.jpg')
  .resize(300, 200)
  .toFile('output.jpg', function(err) {
    if (err) throw err;
  });
```

2. Stream remote image resize and get info event:

```js
const { body } = fetch('https://...');
const transformer = sharp()
  .resize(300)
  .on('info', ({height, width, channels}) => {
    console.log(height, width, channels);
  });
Readable.fromWeb(body)
  .pipe(transformer)
  .pipe(process.stdout);
```

3. Create blank semi-transparent red PNG:

```js
sharp({ create: {
  width: 300,
  height: 200,
  channels: 4,
  background: { r: 255, g: 0, b: 0, alpha: 0.5 }
}})
.png()
.toBuffer()
.then(buffer => { /* use buffer */ });
```

4. Clone pipeline for multiple outputs:

```js
const pipeline = sharp('input.jpg').rotate();
pipeline.clone().resize(800,600).toFile('large.jpg');
pipeline.clone().extract({left:20,top:20,width:100,height:100}).toFile('crop.jpg');
```

---

Retrieved: 2024-07-14  
Data Size: 7780560 bytes  
Attribution: Sharp API Documentation

## Attribution
- Source: Sharp Image Processing Library
- URL: https://sharp.pixelplumbing.com/api-constructor
- License: License: Apache-2.0
- Crawl Date: 2025-05-10T01:30:09.191Z
- Data Size: 7780560 bytes
- Links Found: 19029

## Retrieved
2025-05-10
library/MATHJS_CONFIG.md
# library/MATHJS_CONFIG.md
# MATHJS_CONFIG

## Crawl Summary
npm install mathjs; import/create instances; load via ES modules, CommonJS, browser; configure relTol, absTol, matrix, number, numberFallback, precision, predictable, randomSeed; core functions evaluate, compile, parse, chain, import, replacer/reviver; chaining pattern; JSON serialization with replacer and reviver.

## Normalised Extract
Table of Contents
1 Installation
2 Loading
3 Configuration Options
4 Core APIs
5 Chaining
6 Serialization

1 Installation
- npm install mathjs
- version 14.4.0 CDN URLs unpkg, cdnjs, jsDelivr, PageCDN

2 Loading
ES Modules: import { create, all } from 'mathjs'; const math = create(all, config)
CommonJS: const { create, all } = require('mathjs'); const math = create(all, config)
Browser: <script src="math.js"></script>; use global math

3 Configuration Options
relTol:1e-12 absTol:1e-15 matrix:'Matrix'|'Array' number:'number'|'BigNumber'|'bigint'|'Fraction' numberFallback:'number'|'BigNumber' precision:64 predictable:false randomSeed:null
Use math.config({ ... }) or supply second arg to create(all, config)

4 Core APIs
math.evaluate(expr[,scope]):any
math.compile(expr):{evaluate(scope?):any}
math.parse(expr):Node
type Node: compile(), evaluate()
math.chain(value):Chain; Chain.done():any; Chain.valueOf():any; Chain.toString():string
math.import(funcs[,options]); options.override,silent,wrap
math.replacer: function for JSON.stringify; math.reviver: function for JSON.parse

5 Chaining
math.chain(value).fn1(...).fn2(...).done()
All math.* functions available

6 Serialization
JSON.stringify(obj, math.replacer)
JSON.parse(json, math.reviver)
Pass replacer to retain Infinity as 'Infinity'



## Supplementary Details
Implementation Steps
1. Install: npm install mathjs
2. Import or require: ES modules or CommonJS
3. Create instance: const math = create(all, config)
4. Configure at runtime: math.config({ matrix:'Array', number:'BigNumber', precision:32, predictable:true })
5. Use core APIs: math.evaluate, math.compile, math.parse, math.chain
6. Extend library: math.import({ fn:..., ...}, { override:true, wrap:true, silent:false })
7. Serialize data types: JSON.stringify(x, math.replacer); restore: JSON.parse(str, math.reviver)

Configuration Effects
- Changing matrix affects all matrix-returning functions
- Changing number affects evaluate, parse, range, unit parsing
- predictable:true forces NaN for sqrt(-4)
- Setting randomSeed resets PRNG deterministically on each set

Custom Bundling
- Import subsets: import { sqrt } from 'mathjs/number'
- Build tree-shakable bundles with create and selective import



## Reference Details
API Specifications

math.evaluate(expr: string | string[], scope?: Map|string|Object): any | any[]
  - expr: expression or list of expressions
  - scope: Map with get, set, has, keys or plain object
  - returns evaluated result(s)

math.compile(expr: string | string[]): { evaluate(scope?: Map|string|Object): any | any[] }
  - compile once, evaluate multiple times

math.parse(expr: string | string[]): Node | Node[]
  - Node methods: compile():Compiled, evaluate(scope?): any
  - Node.toString(): string; Node.toTex(): string

math.chain(value: any): Chain
  - Chain methods: .done(): any; .valueOf(): any; .toString(): string
  - All math.* functions available on chain instance

math.config(options: {
    relTol?: number,
    absTol?: number,
    matrix?: 'Matrix'|'Array',
    number?: 'number'|'BigNumber'|'bigint'|'Fraction',
    numberFallback?: 'number'|'BigNumber',
    precision?: number,
    predictable?: boolean,
    randomSeed?: string|null
}): Config
  - Returns current config object

math.import(
    functions: Object|Function[],
    options?: { override?: boolean, silent?: boolean, wrap?: boolean }
): void

math.replacer(key: string, value: any): any
math.reviver(key: string, value: any): any

Code Examples

// Evaluate and parse
const res = math.evaluate('2+3*4') //14
const code = math.compile('sqrt(x^2+y^2)')
console.log(code.evaluate({ x:3, y:4 })) //5

// Chaining
const c = math.chain([1,2,3]).map(x => x*2).sum().done() //12

// Typed import extension
const custom = {
  negSquare: factory('negSquare', ['multiply','unaryMinus'], ({multiply,unaryMinus}) => x => unaryMinus(multiply(x,x)))
}
math.import(custom)

Best Practices
- Always pass math.replacer to JSON.stringify to handle Infinity and NaN
- Use create(all, config) for isolated instances, avoid mutating default global
- Use tree-shaking via selective imports to reduce bundle size

Troubleshooting
- If math.evaluate throws “UndefinedSymbolError”, ensure scope includes variable: math.evaluate('a+1',{a:2})
- Infinity serializes to null without replacer: JSON.stringify(Infinity) => null; use replacer to get "Infinity"
- Setting predictable:true changes sqrt(-4) from Complex to NaN; revert setting if unexpected NaN



## Information Dense Extract
install:npm install mathjs;import:{create,all}from'mathjs';const math=create(all,{relTol:1e-12,absTol:1e-15,matrix:'Matrix',number:'number',numberFallback:'number',precision:64,predictable:false,randomSeed:null});APIs:evaluate(expr,scope?):any;compile(expr)->{evaluate(scope?):any};parse(expr)->Node;chain(value)->Chain;import(funcs,options?);replacer;reviver;config(options);usage:math.evaluate('sqrt(3^2+4^2)');math.chain(3).add(4).multiply(2).done();serialization:JSON.stringify(x,math.replacer);JSON.parse(str,math.reviver);best:use create() for isolated instance;pass replacer;tree-shake via selective imports;predictable:true→NaN for negative sqrt;randomSeed for deterministic random

## Sanitised Extract
Table of Contents
1 Installation
2 Loading
3 Configuration Options
4 Core APIs
5 Chaining
6 Serialization

1 Installation
- npm install mathjs
- version 14.4.0 CDN URLs unpkg, cdnjs, jsDelivr, PageCDN

2 Loading
ES Modules: import { create, all } from 'mathjs'; const math = create(all, config)
CommonJS: const { create, all } = require('mathjs'); const math = create(all, config)
Browser: <script src='math.js'></script>; use global math

3 Configuration Options
relTol:1e-12 absTol:1e-15 matrix:'Matrix'|'Array' number:'number'|'BigNumber'|'bigint'|'Fraction' numberFallback:'number'|'BigNumber' precision:64 predictable:false randomSeed:null
Use math.config({ ... }) or supply second arg to create(all, config)

4 Core APIs
math.evaluate(expr[,scope]):any
math.compile(expr):{evaluate(scope?):any}
math.parse(expr):Node
type Node: compile(), evaluate()
math.chain(value):Chain; Chain.done():any; Chain.valueOf():any; Chain.toString():string
math.import(funcs[,options]); options.override,silent,wrap
math.replacer: function for JSON.stringify; math.reviver: function for JSON.parse

5 Chaining
math.chain(value).fn1(...).fn2(...).done()
All math.* functions available

6 Serialization
JSON.stringify(obj, math.replacer)
JSON.parse(json, math.reviver)
Pass replacer to retain Infinity as 'Infinity'

## Original Source
Math.js Documentation
https://mathjs.org/docs/

## Digest of MATHJS_CONFIG

# Math.js Technical Digest (retrieved 2024-06-20)

## Installation

- npm install mathjs
- Built-in TypeScript definitions included
- CDN URLs (version 14.4.0):
  - unpkg: https://unpkg.com/mathjs@14.4.0/
  - cdnjs: https://cdnjs.com/libraries/mathjs
  - jsDelivr: https://www.jsdelivr.com/package/npm/mathjs
  - PageCDN: https://pagecdn.com/lib/mathjs

## Loading and Instantiation

### ES Modules

```js
import { create, all } from 'mathjs'
const config = { /* see Configuration below */ }
const math = create(all, config)
```

### CommonJS (Node.js)

```js
const { create, all } = require('mathjs')
const config = { /* see Configuration below */ }
const math = create(all, config)
```

### Browser Global

```html
<script src="math.js"></script>
<script>
  console.log(math.sqrt(-4).toString()) // 2i
</script>
```

## Configuration Options

Call `math.config(options)` or supply `options` to `create(all, options)`.

| Option         | Type                 | Default     | Description                                                                                           |
|----------------|----------------------|-------------|-------------------------------------------------------------------------------------------------------|
| relTol         | number               | 1e-12       | Minimum relative difference for relational functions                                                  |
| absTol         | number               | 1e-15       | Minimum absolute difference for relational functions                                                  |
| matrix         | 'Matrix'  'Array' | 'Matrix'    | Default output type for matrix functions                                                             |
| number         | 'number'|'BigNumber'|'bigint'|'Fraction' | 'number'    | Type used for parsing and internal numeric values                                                     |
| numberFallback | 'number'|'BigNumber'    | 'number'    | Fallback type when value cannot be represented in `number` type                                      |
| precision      | integer              | 64          | Maximum significant digits for BigNumbers                                                            |
| predictable    | boolean              | false       | When true, output type depends only on input types (e.g. sqrt(-4) → NaN when true)                   |
| randomSeed     | string|null          | null        | Seed for pseudo-random generator; resets RNG on setting                                               |

### Examples

```js
// create with BigNumber and custom tolerance
t const math = create(all, { number: 'BigNumber', precision: 32, relTol: 1e-10 })
console.log(math.evaluate('1 / 3')) // BigNumber: 0.333... (32 digits)
math.config({ predictable: true })
console.log(math.sqrt(-4))        // NaN
```

## Core APIs

- `math.evaluate(expr[, scope]) : any`
- `math.compile(expr) -> { evaluate(scope?): any }`
- `math.parse(expr) -> Node`
- `math.chain(value) -> Chain`
- `math.import(functions[, options])`
- `math.replacer` and `math.reviver` for JSON serialization

## Chaining

```js
math.chain(3)
    .add(4)
    .multiply(2)
    .done() // 14
```

## Serialization

```js
const x = math.complex('2+3i')
const json = JSON.stringify(x, math.replacer)
// '{"mathjs":"Complex","re":2,"im":3}'
const restored = JSON.parse(json, math.reviver)
```

---

**Attribution**: Math.js documentation, Data Size: 19021957 bytes, Links Found: 35602

## Attribution
- Source: Math.js Documentation
- URL: https://mathjs.org/docs/
- License: License: Apache-2.0
- Crawl Date: 2025-05-10T03:34:17.993Z
- Data Size: 19021957 bytes
- Links Found: 35602

## Retrieved
2025-05-10
library/JS_YAML.md
# library/JS_YAML.md
# JS_YAML

## Crawl Summary
Installation: npm install js-yaml; CLI: js-yaml <file> with flags -h, -v, -c, -t. API:

load(string, options): returns JS value or throws, options: filename, onWarning, schema, json.

loadAll(string, iterator, options): multi-doc parser.

dump(object, options): serialize object to YAML, options: indent, noArrayIndent, skipInvalid, flowLevel, styles, schema, sortKeys, lineWidth, noRefs, noCompatMode, condenseFlow, quotingType, forceQuotes, replacer.

Supported tags: null, bool, int, float, binary, timestamp, omap, pairs, set, str, seq, map.

Styles mapping per tag with default values.

Caveats: object-as-key stringification, block mapping key limitations.


## Normalised Extract
Table of Contents:
1. Installation Commands
2. CLI Behavior and Flags
3. Programmatic API Usage
   3.1 load()
   3.2 loadAll()
   3.3 dump()
4. Option Parameters and Defaults
5. Supported YAML Types Mapping
6. Tag Style Configuration
7. Usage Caveats

1. Installation Commands
   - npm install js-yaml
   - npm install -g js-yaml

2. CLI Behavior and Flags
   js-yaml <file>
   Flags:
     --help (-h)
     --version (-v)
     --compact (-c)
     --trace (-t)

3. Programmatic API Usage

3.1 load(string, options)
   Signature: load(input: string, options?: {
     filename?: string;
     onWarning?: (warning: YAMLException) => void;
     schema?: Schema;
     json?: boolean;
   }): any
   Errors: throws YAMLException on parse errors or when multi-doc present.

3.2 loadAll(string, iterator?, options?)
   Signature: loadAll(input: string, iterator?: (doc: any) => void, options?: same as load): any[] | void

3.3 dump(object, options)
   Signature: dump(obj: any, options?: {
     indent?: number;
     noArrayIndent?: boolean;
     skipInvalid?: boolean;
     flowLevel?: number;
     styles?: Record<string,string>;
     schema?: Schema;
     sortKeys?: boolean | ((a:string,b:string)=>number);
     lineWidth?: number;
     noRefs?: boolean;
     noCompatMode?: boolean;
     condenseFlow?: boolean;
     quotingType?: '"' | "'";
     forceQuotes?: boolean;
     replacer?: (key: string, value: any) => any;
   }): string

4. Option Parameters and Defaults
   indent=2, noArrayIndent=false, skipInvalid=false, flowLevel=-1, schema=DEFAULT_SCHEMA, sortKeys=false, lineWidth=80, noRefs=false, noCompatMode=false, condenseFlow=false, quotingType='\'', forceQuotes=false

5. Supported YAML Types Mapping
   !!null=>null; !!bool=>boolean; !!int=>number; !!float=>number; !!binary=>Buffer; !!timestamp=>Date; !!omap/!!pairs=>Array<[k,v]>; !!set=>Array<string>; !!str=>string; !!seq=>Array<any>; !!map=>Object

6. Tag Style Configuration
   Map tag to style string. E.g. styles['!!null']='canonical' to emit '~'.

7. Usage Caveats
   Objects/arrays as keys get stringified. Block mapping key properties on non-string keys unsupported.


## Supplementary Details
Installation steps:
1. npm install js-yaml locally
2. require('js-yaml') in code

Basic code example:
const yaml = require('js-yaml');
const fs = require('fs');
try {
  const input = fs.readFileSync('example.yml','utf8');
  const data = yaml.load(input, {filename:'example.yml', json:true});
  console.log(data);
} catch(err) {
  console.error(err.message);
}

Multi-document parsing:
const docs = yaml.loadAll(input,(doc)=> console.log(doc), {schema:yaml.JSON_SCHEMA});

Dumping with custom styles:
const out = yaml.dump(obj, {
  skipInvalid:true,
  styles:{'!!null':'canonical'},
  sortKeys:(a,b)=>a.localeCompare(b)
});

Caveat workaround:
Use only string keys or pre-serialize complex keys to avoid unexpected toString() results.


## Reference Details
### CLI Examples
$ js-yaml sample.yml
$ js-yaml -c sample.yml
$ js-yaml -t sample.yml

### load()
Signature: load(input: string, options?: LoadOptions): any
LoadOptions:
  filename: string | null
  onWarning: (e: YAMLException)=>void
  schema: Schema (FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA)
  json: boolean
Returns: any
Throws: YAMLException

Example:
const data = yaml.load(fs.readFileSync('config.yml','utf8'), {
  filename:'config.yml',
  onWarning:(w)=>console.warn(w.message),
  schema:yaml.CORE_SCHEMA,
  json:false
});

### loadAll()
Signature: loadAll(input: string, iterator?: (doc:any)=>void, options?: LoadOptions): any[] | void
Returns array if iterator omitted, otherwise void

Example:
const all = yaml.loadAll(input, undefined, {schema:yaml.DEFAULT_SCHEMA});

### dump()
Signature: dump(obj:any, options?: DumpOptions): string
DumpOptions:
  indent:2
  noArrayIndent:false
  skipInvalid:false
  flowLevel:-1
  styles:Record<string,string>
  schema:Schema
  sortKeys:boolean|func
  lineWidth:80
  noRefs:false
  noCompatMode:false
  condenseFlow:false
  quotingType:'|' or '"'
  forceQuotes:false
  replacer:(key,value)=>any
Returns: string

Example:
const out = yaml.dump({a:1,b:2}, {
  flowLevel:0,
  noRefs:true,
  quotingType:'"',
  forceQuotes:true
});

### Best Practices
- Use DEFAULT_SCHEMA for full YAML feature support
- Set json:true on load() for JSON-compat behavior
- Use skipInvalid:true on dump() to drop functions and undefined without error
- Sort keys via sortKeys:true or custom comparator for deterministic output

### Troubleshooting
1. Unexpected multi-document error on load(): use loadAll() instead
2. Regex/function types error on dump(): set skipInvalid:true
3. Duplicate key error: set json:true to override rather than throw
4. CLI silent failure: add -c for compact errors or -t for full stack trace

Commands:
$ js-yaml -c bad.yml
Error: duplicated mapping key at line 3, column 5
$ js-yaml -t bad.yml
YAMLException: duplicated mapping key
    at ...stack trace...


## Information Dense Extract
install:npm i js-yaml; CLI:js-yaml file.yml [-h|--help][-v|--version][-c|--compact][-t|--trace];
load(input:string,opts?:{filename?:string,onWarning?:(YAMLException)=>void,schema?:Schema,json?:boolean}):any throws YAMLException;
loadAll(input:string,iterator?:(any)=>void,opts?:LoadOptions):any[]|void;
dump(obj:any,opts?:{indent?:number,noArrayIndent?:boolean,skipInvalid?:boolean,flowLevel?:number,styles?:Map<string,string>,schema?:Schema,sortKeys?:boolean|func,lineWidth?:number,noRefs?:boolean,noCompatMode?:boolean,condenseFlow?:boolean,quotingType?:"'"|"\"",forceQuotes?:boolean,replacer?:(k,v)=>any}):string;
Supported tags:!!null,!!bool,!!int,!!float,!!binary,!!timestamp,!!omap,!!pairs,!!set,!!str,!!seq,!!map;
Default schema:DEFAULT_SCHEMA;FAILSAFE_SCHEMA for safe;JSON_SCHEMA for JSON-only;CORE_SCHEMA same as JSON_SCHEMA;
json:true=>override duplicate keys;skipInvalid:true=>ignore invalid types;
sortKeys:true|func for stable dumps;
caveat:object/array keys stringified via toString();block mapping non-string keys unsupported.

## Sanitised Extract
Table of Contents:
1. Installation Commands
2. CLI Behavior and Flags
3. Programmatic API Usage
   3.1 load()
   3.2 loadAll()
   3.3 dump()
4. Option Parameters and Defaults
5. Supported YAML Types Mapping
6. Tag Style Configuration
7. Usage Caveats

1. Installation Commands
   - npm install js-yaml
   - npm install -g js-yaml

2. CLI Behavior and Flags
   js-yaml <file>
   Flags:
     --help (-h)
     --version (-v)
     --compact (-c)
     --trace (-t)

3. Programmatic API Usage

3.1 load(string, options)
   Signature: load(input: string, options?: {
     filename?: string;
     onWarning?: (warning: YAMLException) => void;
     schema?: Schema;
     json?: boolean;
   }): any
   Errors: throws YAMLException on parse errors or when multi-doc present.

3.2 loadAll(string, iterator?, options?)
   Signature: loadAll(input: string, iterator?: (doc: any) => void, options?: same as load): any[] | void

3.3 dump(object, options)
   Signature: dump(obj: any, options?: {
     indent?: number;
     noArrayIndent?: boolean;
     skipInvalid?: boolean;
     flowLevel?: number;
     styles?: Record<string,string>;
     schema?: Schema;
     sortKeys?: boolean | ((a:string,b:string)=>number);
     lineWidth?: number;
     noRefs?: boolean;
     noCompatMode?: boolean;
     condenseFlow?: boolean;
     quotingType?: ''' | ''';
     forceQuotes?: boolean;
     replacer?: (key: string, value: any) => any;
   }): string

4. Option Parameters and Defaults
   indent=2, noArrayIndent=false, skipInvalid=false, flowLevel=-1, schema=DEFAULT_SCHEMA, sortKeys=false, lineWidth=80, noRefs=false, noCompatMode=false, condenseFlow=false, quotingType='''', forceQuotes=false

5. Supported YAML Types Mapping
   !!null=>null; !!bool=>boolean; !!int=>number; !!float=>number; !!binary=>Buffer; !!timestamp=>Date; !!omap/!!pairs=>Array<[k,v]>; !!set=>Array<string>; !!str=>string; !!seq=>Array<any>; !!map=>Object

6. Tag Style Configuration
   Map tag to style string. E.g. styles['!!null']='canonical' to emit '~'.

7. Usage Caveats
   Objects/arrays as keys get stringified. Block mapping key properties on non-string keys unsupported.

## Original Source
dotenv & YAML Specification & js-yaml Parsing (merged)
https://github.com/nodeca/js-yaml#readme

## Digest of JS_YAML

# JS-YAML Installation and Setup

Date Retrieved: 2024-06-05
Data Size: 958290 bytes

## Installation

Run in project folder:
```
npm install js-yaml
```
For CLI globally:
```
npm install -g js-yaml
```

## CLI Usage

Command:
```
js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] <file>
```
Flags:
- `-h, --help`: display usage
- `-v, --version`: display js-yaml version
- `-c, --compact`: show compact error messages
- `-t, --trace`: include stack trace

## API Methods

### load(string[, options])
Parses a single-document YAML string.
- Returns: Object | string | number | null | undefined
- Throws: YAMLException on parse error or if multi-document source
- Options:
  - `filename` (string, default: null)
  - `onWarning` (function, default: null)
  - `schema` (FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA)
  - `json` (boolean, default: false)

### loadAll(string[, iterator][, options])
Parses multi-document YAML string.
- Returns: Array of documents if no iterator
- Calls `iterator(doc)` for each document
- Options same as load()

### dump(object[, options])
Serializes JS object to YAML string.
- Returns: YAML string
- Throws: on unsupported types unless `skipInvalid: true`
- Options:
  - `indent` (number, default: 2)
  - `noArrayIndent` (boolean, default: false)
  - `skipInvalid` (boolean, default: false)
  - `flowLevel` (number, default: -1)
  - `styles` (map of tag->style)
  - `schema` (DEFAULT_SCHEMA etc.)
  - `sortKeys` (boolean|function, default: false)
  - `lineWidth` (number, default: 80)
  - `noRefs` (boolean, default: false)
  - `noCompatMode` (boolean, default: false)
  - `condenseFlow` (boolean, default: false)
  - `quotingType` ("'"|"\"", default: "'")
  - `forceQuotes` (boolean, default: false)
  - `replacer` (function, default: none)

## Supported YAML Types and JavaScript Mappings

| Tag          | JS Type             |
|--------------|---------------------|
| !!null       | null                |
| !!bool       | boolean             |
| !!int        | number              |
| !!float      | number              |
| !!binary     | Buffer              |
| !!timestamp  | Date                |
| !!omap       | Array<[key,value]>  |
| !!pairs      | Array<[key,value]>  |
| !!set        | Array<string>       |
| !!str        | string              |
| !!seq        | Array<any>          |
| !!map        | Object              |

## Styles Per Tag

- !!null: canonical(~), lowercase(null), uppercase(NULL), camelcase(Null), empty("")
- !!int: binary(0b...), octal(0o...), decimal, hexadecimal(0x...)
- !!bool: lowercase, uppercase, camelcase
- !!float: lowercase(.nan/.inf), uppercase(.NAN/.INF), camelcase(.NaN/.Inf)

## Caveats

- Objects/arrays as keys are stringified via toString().
- Implicit block mapping keys cannot be read if they are objects/arrays.


## Attribution
- Source: dotenv & YAML Specification & js-yaml Parsing (merged)
- URL: https://github.com/nodeca/js-yaml#readme
- License: License: MIT / OASIS (public domain)
- Crawl Date: 2025-05-10T02:28:22.874Z
- Data Size: 958290 bytes
- Links Found: 5530

## Retrieved
2025-05-10
library/SVG_PATHS.md
# library/SVG_PATHS.md
# SVG_PATHS

## Crawl Summary
path element: <path> tag with required d attribute (path-data string) and optional numeric pathLength (default 0) for explicit length normalization. Path data syntax: commands [M,m,L,l,H,h,V,v,C,c,S,s,Q,q,T,t,A,a,Z,z] with precise parameter counts. Number grammar: optional sign, integer, optional fraction, optional exponent. EBNF grammar defines sequence structure. Elliptical arcs: rx, ry clamped to positive, skip zero-length. Smooth commands infer control points. Zero-length segments ignored. Invalid commands skip segment. pathLength normalization factor = pathLength/computedLength if >0, else 1. SVGPathElement interface: getTotalLength(), getPointAtLength(), isPointInFill(), isPointInStroke(); attribute pathLength.

## Normalised Extract
Table of Contents:
1 Path Element
2 Path Data Syntax and Commands
3 Number Grammar
4 Path Data Grammar
5 Implementation Notes
6 Distance Along Path
7 DOM Interfaces

1 Path Element
 Tag: path
 Attributes:
  d: string (path-data, mandatory)
  pathLength: number (optional, default 0)

2 Path Data Syntax and Commands
 Commands and parameter counts:
  M x y        moveto absolute
  m dx dy      moveto relative
  L x y        lineto absolute
  l dx dy      lineto relative
  H x          horizontal lineto absolute
  h dx         horizontal lineto relative
  V y          vertical lineto absolute
  v dy         vertical lineto relative
  C x1 y1 x2 y2 x y  cubic Bézier absolute
  c dx1 dy1 dx2 dy2 dx dy  cubic Bézier relative
  S x2 y2 x y  smooth cubic Bézier absolute
  s dx2 dy2 dx dy  smooth cubic Bézier relative
  Q x1 y1 x y  quadratic Bézier absolute
  q dx1 dy1 dx dy  quadratic Bézier relative
  T x y        smooth quadratic Bézier absolute
  t dx dy      smooth quadratic Bézier relative
  A rx ry x-axis-rotation large-arc-flag sweep-flag x y  arc absolute
  a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy  arc relative
  Z or z       closepath

3 Number Grammar
 sign?: '+' or '-'
 integer: digit-sequence
 fraction?: '.' digit-sequence
 exponent?: ('e'|'E') sign? digit-sequence

4 Path Data Grammar
 EBNF:
  path ::= wsp* moveto-drawto-groups wsp*
  moveto-drawto-groups ::= moveto drawto-commands?
  drawto-commands ::= drawto-command drawto-commands?
  drawto-command ::= one of the path commands in section 2

5 Implementation Notes
 - Elliptical arcs: if rx or ry ≤0, clamp or skip
 - Smooth commands: control point inferred by reflection
 - Zero-length segments ignored
 - Parse errors skip invalid segments

6 Distance Along Path
 pathLength attribute (SVGAnimatedNumber)
 ComputedLength = sum of segment lengths
 scale factor = pathLength>0 ? pathLength/ComputedLength : 1
 API distances use scale factor

7 DOM Interfaces
 Interface SVGPathElement:
  Attributes:
   readonly pathLength: float
  Methods:
   getTotalLength(): float
   getPointAtLength(distance: float): DOMPoint
   isPointInFill(point: DOMPoint): boolean
   isPointInStroke(point: DOMPoint): boolean

## Supplementary Details
• Default attribute values: pathLength default is 0 ⇒ no normalization
• Number parsing: accept leading decimal (".5"), exponent ("1e-3"), sign
• Serialization: d attribute string must adhere to grammar exactly; use commas or whitespace
• Step-by-step: 1. parse d into command sequence 2. compute each segment length (line, cubic, quadratic, arc) 3. sum lengths 4. if pathLength>0, compute scale factor 5. apply scale factor to distances passed to APIs or CSS properties (stroke-dasharray)
• Path length computation formulas: line = √((x2-x1)^2+(y2-y1)^2); cubic and quadratic use recursive subdivision or analytical length approx; arc uses elliptical integrals per SVG2 §8.13
• Animations along path: use getPointAtLength(distance) inside requestAnimationFrame loop or <animateMotion> element with path attribute


## Reference Details
<path> attributes:
 d: DOMString — path data string
 pathLength: SVGAnimatedNumber — normalization factor (default 0)

Interface SVGPathElement : SVGGraphicsElement {
  readonly attribute float pathLength;
  float getTotalLength();
  DOMPoint getPointAtLength(float distance);
  boolean isPointInFill(DOMPoint point);
  boolean isPointInStroke(DOMPoint point);
}

Usage example:
 const svgNS = 'http://www.w3.org/2000/svg';
 const path = document.createElementNS(svgNS,'path');
 path.setAttribute('d','M0 0 L100 0 L100 100 Z');
 path.setAttribute('stroke','black');
 document.querySelector('svg').appendChild(path);
 const len = path.getTotalLength(); // float
 const p = path.getPointAtLength(len*0.5); // DOMPoint { x:50, y:0 }

Configuration options and effects:
 pathLength=200 ⇒ all distances from getPointAtLength(distance) scaled by factor=200/ComputedLength
 stroke-dasharray: numbers interpreted in user units; combine with pathLength for normalized dash animations

Best practices:
 • Specify pathLength when animating dashes or motion to standardize across paths of different shapes
 • Use absolute commands (uppercase) for clarity and fewer relative errors
 • Combine <defs> and <use> to reuse complex path definitions

Troubleshooting procedures:
 • Error: getPointAtLength returns (NaN,NaN) ⇒ check distance parameter range [0,getTotalLength()]
 • Arc not rendered ⇒ verify rx, ry >0 and large-arc-flag/sweep-flag values (0 or 1)
 • Unexpected parse breakpoints ⇒ validate d string against EBNF; run console.assert(/^M[ ,\d]/.test(d))
 • CSS dasharray not applying ⇒ ensure stroke-dasharray attribute present and pathLength set if needed


## Information Dense Extract
path: tag=path, attrs=d(string, mandatory), pathLength(number, default 0); commands: M/m(2), L/l(2), H/h(1), V/v(1), C/c(6), S/s(4), Q/q(4), T/t(2), A/a(7), Z/z(0); numbers: [+-]?\d+(\.\d+)?([eE][+-]?\d+)?; grammar per EBNF; arcs: rx,ry>0; clamp or skip zero/neg; smooth cmds reflect previous control pt; zero-length segments ignored; parse errors skip; computedLength=sum(segment lengths); scale=pathLength>0?pathLength/computedLength:1; DOM: SVGPathElement pathLength:float; getTotalLength():float; getPointAtLength(float):DOMPoint; isPointInFill(DOMPoint):boolean; isPointInStroke(DOMPoint):boolean; example: len=path.getTotalLength(); pt=path.getPointAtLength(len*0.5); use pathLength for normalization; dasharray animations normalized by scale; troubleshoot NaN from getPointAtLength(distance) out-of-range; validate d syntax.

## Sanitised Extract
Table of Contents:
1 Path Element
2 Path Data Syntax and Commands
3 Number Grammar
4 Path Data Grammar
5 Implementation Notes
6 Distance Along Path
7 DOM Interfaces

1 Path Element
 Tag: path
 Attributes:
  d: string (path-data, mandatory)
  pathLength: number (optional, default 0)

2 Path Data Syntax and Commands
 Commands and parameter counts:
  M x y        moveto absolute
  m dx dy      moveto relative
  L x y        lineto absolute
  l dx dy      lineto relative
  H x          horizontal lineto absolute
  h dx         horizontal lineto relative
  V y          vertical lineto absolute
  v dy         vertical lineto relative
  C x1 y1 x2 y2 x y  cubic Bzier absolute
  c dx1 dy1 dx2 dy2 dx dy  cubic Bzier relative
  S x2 y2 x y  smooth cubic Bzier absolute
  s dx2 dy2 dx dy  smooth cubic Bzier relative
  Q x1 y1 x y  quadratic Bzier absolute
  q dx1 dy1 dx dy  quadratic Bzier relative
  T x y        smooth quadratic Bzier absolute
  t dx dy      smooth quadratic Bzier relative
  A rx ry x-axis-rotation large-arc-flag sweep-flag x y  arc absolute
  a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy  arc relative
  Z or z       closepath

3 Number Grammar
 sign?: '+' or '-'
 integer: digit-sequence
 fraction?: '.' digit-sequence
 exponent?: ('e'|'E') sign? digit-sequence

4 Path Data Grammar
 EBNF:
  path ::= wsp* moveto-drawto-groups wsp*
  moveto-drawto-groups ::= moveto drawto-commands?
  drawto-commands ::= drawto-command drawto-commands?
  drawto-command ::= one of the path commands in section 2

5 Implementation Notes
 - Elliptical arcs: if rx or ry 0, clamp or skip
 - Smooth commands: control point inferred by reflection
 - Zero-length segments ignored
 - Parse errors skip invalid segments

6 Distance Along Path
 pathLength attribute (SVGAnimatedNumber)
 ComputedLength = sum of segment lengths
 scale factor = pathLength>0 ? pathLength/ComputedLength : 1
 API distances use scale factor

7 DOM Interfaces
 Interface SVGPathElement:
  Attributes:
   readonly pathLength: float
  Methods:
   getTotalLength(): float
   getPointAtLength(distance: float): DOMPoint
   isPointInFill(point: DOMPoint): boolean
   isPointInStroke(point: DOMPoint): boolean

## Original Source
SVG Technical Documentation (MDN & W3C)
https://www.w3.org/TR/SVG2/

## Digest of SVG_PATHS

# Paths (Section 9, Retrieved 2024-06-17)
Data Size: 7040132 bytes

# Path Element
Element: <path>
Attributes:
  • d: path-data (string, mandatory)
  • pathLength: number (normalization factor, default 0)

# Path Data
Syntax: sequence of commands and parameters separated by whitespace or comma

## Commands and Parameter Lists
M    x y              moveto (absolute)
m    dx dy            moveto (relative)
L    x y              lineto (absolute)
l    dx dy            lineto (relative)
H    x                horizontal lineto (absolute)
h    dx               horizontal lineto (relative)
V    y                vertical lineto (absolute)
v    dy               vertical lineto (relative)
C    x1 y1 x2 y2 x y  cubic Bézier curveto (absolute)
c    dx1 dy1 dx2 dy2 dx dy  cubic Bézier curveto (relative)
S    x2 y2 x y        smooth cubic Bézier curveto (absolute)
s    dx2 dy2 dx dy    smooth cubic Bézier curveto (relative)
Q    x1 y1 x y        quadratic Bézier curveto (absolute)
q    dx1 dy1 dx dy    quadratic Bézier curveto (relative)
T    x y              smooth quadratic Bézier curveto (absolute)
t    dx dy            smooth quadratic Bézier curveto (relative)
A    rx ry x-axis-rotation large-arc-flag sweep-flag x y  arc (absolute)
a    rx ry x-axis-rotation large-arc-flag sweep-flag dx dy arc (relative)
Z or z                closepath (no parameters)

## Number Grammar
number ::= sign? integer fraction? exponent?
sign   ::= '+' | '-'
integer ::= digit-sequence
fraction ::= '.' digit-sequence
exponent ::= ('e'|'E') sign? digit-sequence

# Path Data Grammar (EBNF)
path                            ::= wsp* moveto-drawto-command-groups wsp*
drawto-command                  ::= moveto | lineto | horizontal-lineto | vertical-lineto | curveto | smooth-curveto | quadratic-curveto | smooth-quadratic-curveto | arc | closepath
moveto-drawto-command-groups   ::= moveto drawto-commands?
drawto-commands                 ::= drawto-command drawto-commands?

# Implementation Notes
• Elliptical arc parameters rx, ry ≤ 0 ⇒ clamp to abs(rx), abs(ry); if zero, skip arc segment
• Smooth commands (S, s, T, t): first control point inferred by reflecting previous control point
• Zero-length segments: silently ignored
• Parse errors: invalid commands or wrong parameter count ⇒ skip that segment and continue

# Distance Along a Path
Attribute: pathLength (SVGAnimatedNumber)
ComputedLength = sum(segment lengths)
Normalization factor = pathLength>0 ? (pathLength / ComputedLength) : 1
Distance for APIs = rawDistance × normalization factor

# DOM Interfaces
Interface SVGPathElement extends SVGGraphicsElement
Attributes:
  readonly pathLength: float  (animatable)
Methods:
  getTotalLength(): float
  getPointAtLength(distance: float): DOMPoint
  isPointInFill(point: DOMPoint): boolean
  isPointInStroke(point: DOMPoint): boolean

## Attribution
- Source: SVG Technical Documentation (MDN & W3C)
- URL: https://www.w3.org/TR/SVG2/
- License: License: CC-BY-SA / W3C Software and Document License
- Crawl Date: 2025-05-10T03:24:39.226Z
- Data Size: 7040132 bytes
- Links Found: 48616

## Retrieved
2025-05-10
library/GITHUB_CLI.md
# library/GITHUB_CLI.md
# GITHUB_CLI

## Crawl Summary
Authentication: gh auth login uses OAuth or token, flags: --hostname. Stores tokens in OS credential store. Configuration: gh config set <key> <value> writes to config file; keys include editor, git_protocol, pager; environment overrides with GH_HOST, GITHUB_TOKEN, GH_ENTERPRISE_TOKEN. Aliases: gh alias set defines shortcuts, flags --shell, --clobber; supports positional placeholders. API: gh api <endpoint> supports GET/POST, flags: --method, --header, --raw-field, --field, --input, --paginate, --slurp, --jq, --template, --cache; endpoint placeholder substitution for {owner}, {repo}, {branch}; JSON and GraphQL support.

## Normalised Extract
Table of Contents:
1. Authentication Setup
2. Configuration Management
3. Aliases Definition
4. API Requests

1. Authentication Setup
Command: gh auth login [--hostname <hostname>]
  - Default target: github.com
  - Flags:
      --hostname <hostname> : specify Enterprise server
  - Environment variables:
      GITHUB_TOKEN        : PAT fallback
      GH_ENTERPRISE_TOKEN : enterprise automation token
  - Behavior:
      Initiate OAuth flow; store token in OS credential store; non-interactive if GITHUB_TOKEN set.

2. Configuration Management
Command: gh config set <key> <value>
  - Storage: ~/.config/gh/config.yml or hosts.yml
  - Keys and value types:
      editor       : string, default from $EDITOR
      git_protocol : string, allowed [https, ssh], default https
      pager        : boolean, default true
  - Overrides:
      GH_HOST, GITHUB_TOKEN, GH_ENTERPRISE_TOKEN

3. Aliases Definition
Command: gh alias set <alias> <expansion> [--shell] [--clobber]
  - Define alias stored in ~/.config/gh/aliases.yml
  - Flags:
      --shell, -s   : evaluate via sh interpreter
      --clobber     : overwrite existing alias
  - Placeholders:
      $1, $2, …     : positional argument substitution

4. API Requests
Command: gh api <endpoint> [flags]
  - Endpoint: v3 path or 'graphql' for v4
  - Placeholder substitution: {owner}, {repo}, {branch}
  - Flags:
      --method <method>         : override HTTP method (default GET or POST when fields present)
      --header <key:value>      : add HTTP header
      --raw-field <k=v>         : add string parameter (switches to POST)
      --field <k=v>             : add typed parameter: true|false|null|number|@file|{owner}
      --input <file>            : request body from file or stdin
      --paginate                : fetch all pages
      --slurp                   : wrap pages in array
      --jq <expr>               : filter response with jq
      --template <tmpl>         : Go template formatting
      --cache <duration>        : cache duration
      --include                 : include HTTP response status and headers
      --silent                  : suppress body output
      --preview <names>         : API preview names
      --verbose                 : include request/response details


## Supplementary Details
Authentication Steps:
1. Run gh auth login
   - Prompts: Select GitHub.com or Enterprise
   - If Enterprise: specify --hostname <hostname>
   - Complete OAuth in browser or paste token
2. Non-interactive:
   export GITHUB_TOKEN=<token>
   gh auth status  # verify

Configuration Steps:
1. gh config set editor vim
2. gh config set git_protocol ssh
3. gh config set pager false
4. Verify: gh config list

Alias Examples:
1. gh alias set bugs 'issue list --label=bug'
2. gh alias set pv 'pr view'
3. gh alias set --shell igrep 'gh issue list --label="$1" | grep "$2"'
4. List: gh alias list

API Usage Patterns:
1. GET request with query: gh api -X GET search/issues -f q='repo:cli/cli is:open'
2. POST with body fields: gh api repos/{owner}/{repo}/issues -F title='My Issue' -F body='Details'
3. GraphQL query: gh api graphql -f query='query { viewer { login }}'
4. Pagination: gh api --paginate repos/{owner}/{repo}/issues --jq '.[].number'
5. Cache: gh api --cache 1h repos/{owner}/{repo}/releases


## Reference Details
1. gh auth login [--hostname <hostname>]
  Flags:
    --hostname <string>    Hostname for Enterprise
  Env:
    GITHUB_TOKEN (string)
    GH_ENTERPRISE_TOKEN (string)
  Exit codes:
    0 on success
    non-zero on error

2. gh config set <key> <value>
  key:string editor, git_protocol, pager
  value:string or boolean
  File: ~/.config/gh/config.yml

3. gh alias set <alias> <expansion> [--shell] [--clobber]
  alias:string
  expansion:string
  Flags:
    --shell, -s
    --clobber
  File: ~/.config/gh/aliases.yml

4. gh api <endpoint> [flags]
  endpoint:string     e.g. repos/{owner}/{repo}/issues or graphql
  Flags:
    -X, --method <string>           Default GET or POST
    -H, --header <key:value>
    -f, --raw-field <key=value>
    -F, --field <key=value>
    --input <file>
    --paginate
    --slurp
    -q, --jq <string>
    -t, --template <string>
    --cache <duration>
    -i, --include
    --silent
    -p, --preview <names>
    --verbose
  Returns: JSON to stdout; non-zero on HTTP error

Troubleshooting:
1. Authentication failure: gh auth status  # check token
2. Alias not found: gh alias list; verify aliases.yml permissions
3. API 404: verify endpoint path and {owner}/{repo} substitution
4. Pagination timeout: add --cache or --paginate to manage rate limits

Best Practices:
- Use gh api for custom scripting instead of curl
- Define reusable GraphQL queries via --input file
- Cache frequent reads with --cache


## Information Dense Extract
Commands: gh auth login [--hostname]; gh config set key value; gh alias set name expansion [--shell][--clobber]; gh api endpoint [--method][--header][--raw-field][--field][--input][--paginate][--slurp][--jq][--template][--cache][--include][--silent][--preview][--verbose]. Config keys: editor(string), git_protocol(https|ssh), pager(true|false). Auth env: GITHUB_TOKEN, GH_ENTERPRISE_TOKEN, GH_HOST. Aliases file: ~/.config/gh/aliases.yml. API placeholders: {owner},{repo},{branch}. Default HTTP method: GET, POST if fields. Field type coercion: true,false,null,number,@file. GraphQL exact usage: gh api graphql -f query='...'. Pagination: --paginate,+--slurp. Caching: --cache duration. Output filter: --jq expr, --template tmpl. Include headers: --include. Use --verbose for debugging.

## Sanitised Extract
Table of Contents:
1. Authentication Setup
2. Configuration Management
3. Aliases Definition
4. API Requests

1. Authentication Setup
Command: gh auth login [--hostname <hostname>]
  - Default target: github.com
  - Flags:
      --hostname <hostname> : specify Enterprise server
  - Environment variables:
      GITHUB_TOKEN        : PAT fallback
      GH_ENTERPRISE_TOKEN : enterprise automation token
  - Behavior:
      Initiate OAuth flow; store token in OS credential store; non-interactive if GITHUB_TOKEN set.

2. Configuration Management
Command: gh config set <key> <value>
  - Storage: ~/.config/gh/config.yml or hosts.yml
  - Keys and value types:
      editor       : string, default from $EDITOR
      git_protocol : string, allowed [https, ssh], default https
      pager        : boolean, default true
  - Overrides:
      GH_HOST, GITHUB_TOKEN, GH_ENTERPRISE_TOKEN

3. Aliases Definition
Command: gh alias set <alias> <expansion> [--shell] [--clobber]
  - Define alias stored in ~/.config/gh/aliases.yml
  - Flags:
      --shell, -s   : evaluate via sh interpreter
      --clobber     : overwrite existing alias
  - Placeholders:
      $1, $2,      : positional argument substitution

4. API Requests
Command: gh api <endpoint> [flags]
  - Endpoint: v3 path or 'graphql' for v4
  - Placeholder substitution: {owner}, {repo}, {branch}
  - Flags:
      --method <method>         : override HTTP method (default GET or POST when fields present)
      --header <key:value>      : add HTTP header
      --raw-field <k=v>         : add string parameter (switches to POST)
      --field <k=v>             : add typed parameter: true|false|null|number|@file|{owner}
      --input <file>            : request body from file or stdin
      --paginate                : fetch all pages
      --slurp                   : wrap pages in array
      --jq <expr>               : filter response with jq
      --template <tmpl>         : Go template formatting
      --cache <duration>        : cache duration
      --include                 : include HTTP response status and headers
      --silent                  : suppress body output
      --preview <names>         : API preview names
      --verbose                 : include request/response details

## Original Source
GitHub CLI Manual
https://cli.github.com/manual/

## Digest of GITHUB_CLI

# GitHub CLI Manual (Retrieved 2024-06-01)

Data Size: 1231234 bytes
Links Found: 45187
Error: None

## Authentication

### gh auth login [--hostname <hostname>]

Authenticate with GitHub.com or GitHub Enterprise Server.

Parameters:
  --hostname <hostname>    Hostname for GitHub Enterprise (Server ≥2.20)

Environment:
  GITHUB_TOKEN            Personal access token fallback
  GH_ENTERPRISE_TOKEN     Token for scripting/automation

Behavior:
  Prompts for OAuth flow or uses existing token.
  Persists credentials to keychain or OS credential store.


## Configuration

### gh config set <key> <value>

Set persistent configuration in ~/.config/gh/hosts.yml or ~/.config/gh/config.yml.

Configuration keys:
  editor: string           Preferred editor (default: system $EDITOR)
  git_protocol: string     git vs ssh (default: https)
  pager: true|false        Paging output (default: true)

Environment variables:
  GH_HOST                 Default hostname override
  GITHUB_TOKEN            Token-based auth
  GH_ENTERPRISE_TOKEN     Enterprise automation token


## Aliases

### gh alias set <alias> <expansion> [--shell] [--clobber]
Define custom shortcuts for commands.

Options:
  --shell, -s             Evaluate expansion in shell
  --clobber               Overwrite existing alias

Placeholders:
  $1, $2, …               Positional arguments insertion

Storage:
  ~/.config/gh/aliases.yml


## API Requests

### gh api <endpoint> [flags]

Make authenticated HTTP requests to GitHub APIs.

Endpoint:
  Path to v3 endpoint (e.g. repos/{owner}/{repo}/issues)
  graphql for v4

Flags:
  -X, --method <string>           HTTP method (default: GET or POST when fields used)
  -H, --header <key:value>        Add HTTP header
  -f, --raw-field <key=value>     Add string parameter
  -F, --field <key=value>         Typed parameter (true|false|null|number|@file)
  --input <file>                  Request body file (- for stdin)
  --paginate                      Fetch all pages sequentially
  --slurp                         Wrap paginated output in one array
  --jq <string>                   Filter output via jq
  --template <string>             Format JSON output via Go template
  --cache <duration>              Cache response (e.g. "60m")

JSON output:
  Prints response body by default; use --include to show headers/status.


## Attribution
- Source: GitHub CLI Manual
- URL: https://cli.github.com/manual/
- License: License: MIT
- Crawl Date: 2025-05-10T05:03:30.581Z
- Data Size: 1231234 bytes
- Links Found: 45187

## Retrieved
2025-05-10
