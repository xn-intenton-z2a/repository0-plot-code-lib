# PDFKIT

## Crawl Summary
PDFKit is installed via npm and used by requiring 'pdfkit'. Create a document with new PDFDocument(), then pipe the output to a file or HTTP response. Key features include adding pages with customizable margins (using numbers, strings with units, or objects for specific sides), switching to previous pages with buffering (bufferPages option and methods like switchToPage and flushPages), setting default fonts, adding document metadata, and applying encryption and access privileges with options such as userPassword, ownerPassword, permissions, and specifying the PDF version for encryption method. PDF/A conformance is supported by specifying 'subset' along with proper PDF versions and tagging. Examples include code for text, images, vector graphics, and browser usage with blob-stream.

## Normalised Extract
## Table of Contents
1. Installation
2. Creating a Document
3. Using PDFKit in the Browser
4. Adding Pages
5. Switching Pages
6. Setting Default Font
7. Setting Document Metadata
8. Encryption and Access Privileges
9. PDF/A Conformance
10. Adding Content

---

### 1. Installation
- Command: `npm install pdfkit`

### 2. Creating a Document
- Method: `const doc = new PDFDocument();`
- Pipe to file: `doc.pipe(fs.createWriteStream('/path/to/file.pdf'));`
- Finalize: `doc.end();`

### 3. Using PDFKit in the Browser
- Require modules: `pdfkit` and `blob-stream`
- Sample:
```javascript
const PDFDocument = require('pdfkit');
const blobStream  = require('blob-stream');
const doc = new PDFDocument();
const stream = doc.pipe(blobStream());
// add content
 doc.end();
 stream.on('finish', () => {
   const blob = stream.toBlob('application/pdf');
   const url = stream.toBlobURL('application/pdf');
   iframe.src = url;
});
```

### 4. Adding Pages
- Default first page auto-added.
- Method: `doc.addPage({ options });`
- Margin options:
  - Single value (number or string): e.g. `doc.addPage({ margin: 50 });`
  - Object for sides: e.g. `{ margins: { top: 50, bottom: 50, left: 72, right: 72 } }`

### 5. Switching Pages
- Enable buffering: `new PDFDocument({ bufferPages: true })`
- Switch: `doc.switchToPage(pageNumber)`
- Flush: `doc.flushPages()`

### 6. Setting Default Font
- Option in constructor: `new PDFDocument({ font: 'Courier' })`

### 7. Setting Document Metadata
- Set `doc.info` or pass `info` on creation.
- Properties: Title, Author, Subject, Keywords, CreationDate, ModDate.

### 8. Encryption and Access Privileges
- Options in constructor:
```javascript
{
  userPassword: 'password',
  ownerPassword: 'password',
  permissions: {
    printing: 'highResolution',
    modifying: true,
    copying: true,
    annotating: true,
    fillingForms: true,
    contentAccessibility: true,
    documentAssembly: true
  },
  pdfVersion: '1.7'
}
```

### 9. PDF/A Conformance
- Set subset option and ensure font embedding:
```javascript
const doc = new PDFDocument({
  subset: 'PDF/A-1a',
  pdfVersion: '1.4',
  tagged: true
});
```

### 10. Adding Content
- Examples include text, images, vector graphics, and annotations.
- Full code sample provided in the detailed digest shows chaining methods:
```javascript
// Text
 doc.font('fonts/PalatinoBold.ttf').fontSize(25).text('Some text with an embedded font!', 100, 100);
// Image
 doc.image('path/to/image.png', { fit: [250, 300], align: 'center', valign: 'center' });
// Vector graphics
 doc.addPage().fontSize(25).text('Here is some vector graphics...', 100, 100);
 doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill('#FF3300');
 // Transforms and SVG path
 doc.scale(0.6).translate(470, -380).path('M 250,75 L 323,301 131,161 369,161 177,301 z').fill('red', 'even-odd').restore();
// Annotations & link
 doc.addPage().fillColor('blue').text('Here is a link!', 100, 100).underline(100, 100, 160, 27, { color: '#0000FF' }).link(100, 100, 160, 27, 'http://google.com/');

 doc.end();
```

## Supplementary Details
### Parameter and Option Details

- Installation: Uses npm. Command: `npm install pdfkit`.
- PDFDocument Constructor Options:
  - font: string (default 'Helvetica'). Example: `{ font: 'Courier' }`.
  - bufferPages: boolean (enables page buffering). Example: `{ bufferPages: true }`.
  - margin: number or string (e.g., 50 or '2in' or '2em').
  - margins: object with keys top, right, bottom, left.
  - pdfVersion: string (allowed values: '1.3', '1.4', '1.5', '1.6', '1.7', '1.7ext3').
  - userPassword: string (for encryption).
  - ownerPassword: string (for encryption).
  - permissions: object. Keys: printing, modifying, copying, annotating, fillingForms, contentAccessibility, documentAssembly. Values: boolean or specific strings (e.g., 'lowResolution', 'highResolution').
  - subset: string (to enable PDF/A compliance, e.g., 'PDF/A-1', 'PDF/A-1a', 'PDF/A-1b', 'PDF/A-2', etc.).
  - tagged: boolean (for PDF/A accessibility).

### Implementation Steps
1. Create a new PDFDocument with desired options.
2. Pipe the output to a destination (e.g., file stream or blob-stream for browsers).
3. Add content using provided methods (text, image, vector graphics, annotations).
4. For multi-page documents, use `addPage()`, optionally handling margins and layout.
5. If necessary, enable buffering with `bufferPages: true`, and later switch pages using `switchToPage()` and finalize with `flushPages()`.
6. End the document with `doc.end()`, which flushes buffered pages if not already done.

### Configuration Options with Defaults and Effects
- Default font: 'Helvetica'.
- Default page size: letter.
- Default margin: 72 points (1 inch) on all sides if not specified.
- Encryption: Enabled by providing passwords and permissions; defaults to PDF version '1.3' if not set.
- PDF/A: Requires font embedding and tagged content; standard fonts might need replacement via registerFont().

## Reference Details
## API Specifications and Code Examples

### PDFDocument Constructor

Signature:

```javascript
new PDFDocument(options?: {
  size?: string | [number, number],        // e.g. 'letter' or [595.28, 841.89]
  layout?: 'portrait' | 'landscape',         // default: 'portrait'
  margin?: number | string,                  // single margin for all sides
  margins?: { top: number, bottom: number, left: number, right: number },
  font?: string,                             // default font name, e.g., 'Helvetica'
  bufferPages?: boolean,                     // if true, pages are buffered
  pdfVersion?: '1.3' | '1.4' | '1.5' | '1.6' | '1.7' | '1.7ext3',
  userPassword?: string,                     // for file encryption
  ownerPassword?: string,                    // for file encryption
  permissions?: {
    printing?: 'lowResolution' | 'highResolution',
    modifying?: boolean,
    copying?: boolean,
    annotating?: boolean,
    fillingForms?: boolean,
    contentAccessibility?: boolean,
    documentAssembly?: boolean
  },
  subset?: string,                           // PDF/A subset, e.g., 'PDF/A-1a'
  tagged?: boolean                           // for PDF/A compliance
}): PDFDocument
```

### Methods

- pipe(destination: WritableStream): WritableStream
- addPage(options?: { margin?: number | string, margins?: { top: number, right: number, bottom: number, left: number }, fontSize?: number }): PDFDocument
- switchToPage(pageNumber: number): void
- bufferedPageRange(): { start: number, count: number }
- flushPages(): void
- font(fontName: string): PDFDocument
- fontSize(size: number): PDFDocument
- text(text: string, x?: number, y?: number, options?: object): PDFDocument
- image(path: string, options?: { fit?: [number, number], align?: 'center' | 'left' | 'right', valign?: 'center' | 'top' | 'bottom' }): PDFDocument
- moveTo(x: number, y: number): PDFDocument
- lineTo(x: number, y: number): PDFDocument
- fill(color: string, rule?: string): PDFDocument
- save(): PDFDocument
- restore(): PDFDocument
- scale(x: number, y?: number): PDFDocument
- translate(x: number, y: number): PDFDocument
- path(d: string): PDFDocument
- underline(x: number, y: number, width: number, height: number, options?: { color: string }): PDFDocument
- link(x: number, y: number, width: number, height: number, url: string): PDFDocument
- end(): void

### Example Usage (Complete Code Sample)

```javascript
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a document with encryption and custom font
const doc = new PDFDocument({
  font: 'Courier',
  bufferPages: true,
  pdfVersion: '1.7',
  userPassword: 'userpass',
  ownerPassword: 'ownerpass',
  permissions: {
    printing: 'highResolution',
    modifying: true,
    copying: true,
    annotating: true,
    fillingForms: true,
    contentAccessibility: true,
    documentAssembly: true
  }
});

// Stream to a file
const stream = fs.createWriteStream('output.pdf');
doc.pipe(stream);

// Add text with an embedded font
 doc.font('fonts/PalatinoBold.ttf')
    .fontSize(25)
    .text('Some text with an embedded font!', 100, 100);

// Insert an image with constraints
 doc.image('path/to/image.png', {
    fit: [250, 300],
    align: 'center',
    valign: 'center'
 });

// Add a new page with vector graphics
 doc.addPage()
    .fontSize(25)
    .text('Here is some vector graphics...', 100, 100);

// Draw a triangle
 doc.save()
    .moveTo(100, 150)
    .lineTo(100, 250)
    .lineTo(200, 250)
    .fill('#FF3300');

// Apply transforms and render an SVG path
 doc.scale(0.6)
    .translate(470, -380)
    .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
    .fill('red', 'even-odd')
    .restore();

// Add annotations and link
 doc.addPage()
    .fillColor('blue')
    .text('Here is a link!', 100, 100)
    .underline(100, 100, 160, 27, { color: '#0000FF' })
    .link(100, 100, 160, 27, 'http://google.com/');

// Finalize the PDF file
 doc.end();
```

### Troubleshooting Procedures

1. If Browserify fails to load built-in font data:
   - Ensure `brfs` is installed as a devDependency: `npm install brfs --save-dev`
   - Check the Browserify error message for misconfigured transforms.

2. If PDF output is not generated:
   - Confirm that the stream destination (file or blob) is correctly set up.
   - Verify that `doc.end()` is called to flush all buffers.
   - For buffered pages, confirm that `doc.flushPages()` or `doc.end()` triggers flushing.

3. Debugging encryption issues:
   - Test by providing only a userPassword and verify full access.
   - If using ownerPassword, confirm permissions are explicitly defined.
   - Use a PDF viewer that respects encryption settings.

This specification provides developers with complete and ready-to-use technical details for implementing PDFKit in Node or the browser.


## Original Source
PDFKit Documentation
https://pdfkit.org/docs/getting_started.html

## Digest of PDFKIT

# PDFKit Documentation Digest (Retrieved on 2023-10-05)

## Installation

To install PDFKit using npm:

```
npm install pdfkit
```

## Creating a Document

Include the PDFKit module and create an instance of PDFDocument:

```javascript
const PDFDocument = require('pdfkit');
const doc = new PDFDocument();
```

PDFDocument instances are readable Node streams. You can pipe them to writable streams (e.g., file or HTTP response) and call the `end()` method to finalize the PDF:

```javascript
doc.pipe(fs.createWriteStream('/path/to/file.pdf')); // write to PDF
// For HTTP response:
doc.pipe(res);
// Add content to PDF using the methods below

// finalize the PDF and end the stream
doc.end();
```

## Using PDFKit in the Browser

In the browser you have two main methods:

1. Using Browserify/Webpack
2. Using a standalone script

To generate a Blob from a PDFDocument, pipe the document to a blob-stream:

```javascript
const PDFDocument = require('pdfkit');
const blobStream  = require('blob-stream');

const doc = new PDFDocument();
const stream = doc.pipe(blobStream());

// Add content

// Finalize document
 doc.end();
 stream.on('finish', function() {
   const blob = stream.toBlob('application/pdf');
   const url = stream.toBlobURL('application/pdf');
   iframe.src = url;
 });
```

**Note:** When using Browserify, you must install the `brfs` module to load built-in font data.

## Adding Pages

A new PDFDocument comes with a first page automatically (unless `autoFirstPage: false` is supplied). Subsequent pages can be added:

```javascript
doc.addPage();
```

You can add content on every new page using the `pageAdded` event:

```javascript
doc.on('pageAdded', () => doc.text("Page Title"));
```

Options for pages include setting the size as an array (in points) or a predefined size (default is letter), orientation (portrait or landscape), and margins. Margins can be set as a single number, string with units (e.g. '2in', '2em') or as an object:

```javascript
// 50 point margin on all sides
 doc.addPage({ margin: 50 });

// 2 inch margin on all sides
 doc.addPage({ margin: '2in' });

// 2em margin using the font size
 doc.addPage({ fontSize: 14, margin: '2em' });

// Different margins on each side
 doc.addPage({
   margins: { top: 50, bottom: 50, left: 72, right: 72 }
 });
```

## Switching to Previous Pages

In buffered pages mode (enabled with `bufferPages: true` in the constructor), you can switch to previous pages using `doc.switchToPage(pageNumber)` and flush them with `doc.flushPages()`:

```javascript
const doc = new PDFDocument({ bufferPages: true });
// ... add pages
const range = doc.bufferedPageRange(); // returns { start: 0, count: n }

for (let i = range.start; i < range.start + range.count; i++) {
  doc.switchToPage(i);
  doc.text(`Page ${i + 1} of ${range.count}`);
}

doc.flushPages();
// Alternatively, calling doc.end() will flush pages automatically
 doc.end();
```

## Setting Default Font

The default font is Helvetica. To use a different font (e.g. Courier):

```javascript
const doc = new PDFDocument({ font: 'Courier' });
```

## Setting Document Metadata

Metadata properties can be set in the `doc.info` object or passed as an `info` option during instantiation. Allowed properties include:

- Title
- Author
- Subject
- Keywords
- CreationDate (auto-set by PDFKit)
- ModDate

Example:

```javascript
doc.info = {
  Title: 'My Document',
  Author: 'Author Name',
  Subject: 'PDFKit Guide',
  Keywords: 'pdf, javascript, pdfkit'
};
```

## Encryption and Access Privileges

Encryption can be enabled by providing a `userPassword` and/or `ownerPassword` as well as permission options during the PDFDocument creation. Allowed permission settings include:

- printing: 'lowResolution' or 'highResolution'
- modifying: true
- copying: true
- annotating: true
- fillingForms: true
- contentAccessibility: true
- documentAssembly: true

Specify the PDF version to choose the desired encryption method. Available versions and their encryption methods:

- '1.3' (default) - 40-bit RC4
- '1.4' - 128-bit RC4
- '1.5' - 128-bit RC4
- '1.6' - 128-bit AES
- '1.7' - 128-bit AES
- '1.7ext3' - 256-bit AES

Example:

```javascript
const doc = new PDFDocument({
  userPassword: 'userpass',
  ownerPassword: 'ownerpass',
  permissions: {
    printing: 'highResolution',
    modifying: true,
    copying: true,
    annotating: true,
    fillingForms: true,
    contentAccessibility: true,
    documentAssembly: true
  },
  pdfVersion: '1.7'
});
```

## PDF/A Conformance

To create PDF/A documents, pass the `subset` option to the PDFDocument constructor. For example:

- PDF/A-1b: use `subset: 'PDF/A-1'` or `'PDF/A-1b'` (requires at least PDF version 1.4 and embedding fonts)
- PDF/A-1a: use `subset: 'PDF/A-1a'` (tagged set to true is required)
- PDF/A-2 and PDF/A-3 variants require at least PDF version 1.7

Example for PDF/A-1a:

```javascript
const doc = new PDFDocument({
  subset: 'PDF/A-1a',
  pdfVersion: '1.4',
  tagged: true
});
```

**Important:** For PDF/A, fonts must be embedded using `registerFont()` with embeddable font files (e.g. .ttf).

## Adding Content

After creating a PDFDocument instance, various types of content can be added including text, images, and vector graphics. For example:

```javascript
// Text with embedded font
 doc.font('fonts/PalatinoBold.ttf')
   .fontSize(25)
   .text('Some text with an embedded font!', 100, 100);

// Image with constraints
 doc.image('path/to/image.png', {
   fit: [250, 300],
   align: 'center',
   valign: 'center'
 });

// Adding a new page and vector graphics
 doc.addPage()
   .fontSize(25)
   .text('Here is some vector graphics...', 100, 100);

// Draw a triangle
 doc.save()
   .moveTo(100, 150)
   .lineTo(100, 250)
   .lineTo(200, 250)
   .fill('#FF3300');

// Apply transforms and render an SVG path
 doc.scale(0.6)
   .translate(470, -380)
   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
   .fill('red', 'even-odd')
   .restore();

// Adding text with annotations and links
 doc.addPage()
   .fillColor('blue')
   .text('Here is a link!', 100, 100)
   .underline(100, 100, 160, 27, { color: '#0000FF' })
   .link(100, 100, 160, 27, 'http://google.com/');

// Finalize the document
 doc.end();
```


## Attribution
- Source: PDFKit Documentation
- URL: https://pdfkit.org/docs/getting_started.html
- License: MIT
- Crawl Date: 2025-04-20T19:46:10.474Z
- Data Size: 922356 bytes
- Links Found: 954

## Retrieved
2025-04-20
