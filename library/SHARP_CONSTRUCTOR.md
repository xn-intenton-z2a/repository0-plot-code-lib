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
