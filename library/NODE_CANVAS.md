NODE_CANVAS

Table of contents
- Purpose and limitations
- Installation notes
- Core API: createCanvas, getContext, toBuffer
- Drawing pattern to produce PNG
- Troubleshooting native build issues

Normalised extract
- node-canvas exposes a Canvas API in Node.js compatible with many CanvasRenderingContext2D calls used in browsers.
- Primary entry points: createCanvas(width, height) returns a Canvas; canvas.getContext('2d') returns a 2D drawing context; canvas.toBuffer('image/png') returns a Buffer representing PNG image data.

Reference details (key signatures)
- createCanvas(width:Number, height:Number) -> Canvas
- Canvas.getContext('2d') -> CanvasRenderingContext2D
- Canvas.toBuffer([mimeType:String], [options:Object]) -> Buffer (default mimeType 'image/png')
- loadImage(src:String|Buffer) -> Promise<Image> (for drawing external images)

Exact implementation pattern (PNG export)
1. const { createCanvas } = require('canvas');
2. const canvas = createCanvas(w, h);
3. const ctx = canvas.getContext('2d'); draw using ctx (moveTo, lineTo, stroke, fill, etc.).
4. const buffer = canvas.toBuffer('image/png');
5. fs.writeFileSync('out.png', buffer);

Installation and native dependencies
- node-canvas requires native libraries (Cairo, Pango, libjpeg, giflib, etc.) on many systems; follow platform instructions in the project README for installation.
- If installation fails, ensure system packages for Cairo and related libraries are present.

Troubleshooting
- Canvas build errors usually indicate missing native deps; inspect npm install logs and install system packages (distribution-specific) before retrying.

Detailed digest (source and retrieval)
Source: node-canvas (Automattic) README and docs
Retrieved: 2026-03-21
Crawled bytes: 574621
Attribution: https://github.com/Automattic/node-canvas
