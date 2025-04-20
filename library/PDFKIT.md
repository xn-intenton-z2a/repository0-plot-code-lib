# PDFKIT

## Crawl Summary
Installation via npm (`npm install pdfkit`), creating documents using `PDFDocument` with piping to writable streams (files or HTTP responses), browser usage with blob-stream, adding pages with flexible margin configurations (numeric, unit strings, or objects), page buffering and switching using `bufferPages`, switching pages via `switchToPage` followed by `flushPages`, setting default fonts (default Helvetica or via `font` option), document metadata setup using the `info` object, encryption using `userPassword`, `ownerPassword` and a detailed `permissions` object with values for printing, modifying, copying, annotating, form filling, content accessibility, and document assembly, and PDF/A conformance using subset settings and corresponding pdfVersion requirements.

## Normalised Extract
Table of Contents:

1. Installation
   - Command: `npm install pdfkit`

2. Creating a Document
   - Import module: `const PDFDocument = require('pdfkit');`
   - Create instance: `const doc = new PDFDocument();`
   - Pipe output: `doc.pipe(fs.createWriteStream('/path/to/file.pdf'));`
   - Finalize with `doc.end();`

3. Using PDFKit in the Browser
   - Use bundlers (Browserify/Webpack) or standalone script
   - Example: Pipe output to blob-stream: 
     ```javascript
     const blobStream = require('blob-stream');
     const doc = new PDFDocument();
     const stream = doc.pipe(blobStream());
     doc.end();
     stream.on('finish', () => {
       const url = stream.toBlobURL('application/pdf');
       iframe.src = url;
     });
     ```

4. Adding Pages
   - New page: `doc.addPage();`
   - Custom margins:
     * Single value: `{ margin: 50 }` or `{ margin: '2in' }`
     * Font dependent: `{ fontSize: 14, margin: '2em' }`
     * Object: `{ margins: { top: 50, bottom: 50, left: 72, right: 72 } }`
   - Page event: `doc.on('pageAdded', () => doc.text('Page Title'));`

5. Switching Pages
   - Enable buffering: `new PDFDocument({ bufferPages: true });`
   - Retrieve pages: `const range = doc.bufferedPageRange();`
   - Change pages: `doc.switchToPage(i);` then add content
   - Flush pages: `doc.flushPages();`

6. Setting Default Font
   - Set via constructor: `new PDFDocument({ font: 'Courier' });` (_Default is 'Helvetica'._)

7. Setting Document Metadata
   - Define metadata in `info` object with properties: Title, Author, Subject, Keywords, CreationDate, ModDate.

8. Encryption and Access Privileges
   - Options include:
     * `userPassword`: string
     * `ownerPassword`: string
     * `permissions`: { printing: 'lowResolution'|'highResolution', modifying: boolean, copying: boolean, annotating: boolean, fillingForms: boolean, contentAccessibility: boolean, documentAssembly: boolean }
     * `pdfVersion`: string (e.g., '1.3', '1.4', '1.5', '1.6', '1.7', '1.7ext3')

9. PDF/A Conformance
   - Set subset values: 'PDF/A-1', 'PDF/A-1b', 'PDF/A-1a', 'PDF/A-2', 'PDF/A-2b', 'PDF/A-2a', 'PDF/A-3', 'PDF/A-3b', 'PDF/A-3a'
   - Additional options: ensure correct `pdfVersion` and `tagged` flag

10. Adding Content
   - Adding text with `.text()`, images with `.image()`, vector graphics with `.moveTo()`, `.lineTo()`, `.fill()`, and annotations with `.underline()` and `.link()`.

All steps and configurations are directly applicable in development.

## Supplementary Details
Technical Specifications and Implementation Details:

- npm Command: `npm install pdfkit`

- PDFDocument Constructor Options:
  • bufferPages: boolean (default false)
  • font: string (default 'Helvetica'; override e.g., 'Courier')
  • info: { Title: string, Author: string, Subject: string, Keywords: string, CreationDate: Date, ModDate: Date }
  • Encryption Options:
      - userPassword: string
      - ownerPassword: string
      - permissions: object with keys:
          • printing: accepts 'lowResolution' or 'highResolution'
          • modifying: boolean
          • copying: boolean
          • annotating: boolean
          • fillingForms: boolean
          • contentAccessibility: boolean
          • documentAssembly: boolean
      - pdfVersion: string; options:
          • '1.3' (40-bit RC4), '1.4'/'1.5' (128-bit RC4), '1.6'/'1.7' (128-bit AES), '1.7ext3' (256-bit AES)

- Margin Options in doc.addPage():
  • Single value: number (in points) or string with units (em, in, px, cm, mm, etc.)
  • Object: { top: number, bottom: number, left: number, right: number }

- Page Buffering and Switching:
  1. Create document with { bufferPages: true }.
  2. Add pages using doc.addPage().
  3. Retrieve buffered pages with doc.bufferedPageRange().
  4. Switch page: doc.switchToPage(pageNumber).
  5. Update content, then flush using doc.flushPages() (automatically called on doc.end()).

- Browser Usage Implementation:
  • Use Browserify or webpack to require modules:
    ```javascript
    const PDFDocument = require('pdfkit');
    const blobStream = require('blob-stream');
    ```
  • Create document, pipe to blob-stream, end document, and then retrieve Blob or URL.

- Encryption Best Practices:
  • Always specify both userPassword and ownerPassword if limited access is necessary.
  • Set detailed permissions explicitly as per requirements.
  • Choose pdfVersion based on desired encryption strength and compatibility.

- PDF/A Conformance Requirements:
  • Set 'subset' option appropriately.
  • For PDF/A-1a: set tagged to true and pdfVersion at least 1.4; for PDF/A-2/3: set pdfVersion to at least 1.7 and tagged to true.
  • Use embeddable TrueType fonts via registerFont() to meet PDF/A standards.

Implementation Steps are documented in the code examples provided above.

## Reference Details
Complete API Specifications and Code Examples:

1. Creating and Saving a PDF Document (Node):

```javascript
// Import the required modules
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a new PDFDocument with metadata and default font override
const doc = new PDFDocument({
  font: 'Courier',
  info: {
    Title: 'Sample PDF',
    Author: 'Author Name',
    Subject: 'PDFKit Example',
    Keywords: 'PDF, Node, PDFKit',
    CreationDate: new Date(),
    ModDate: new Date()
  }
});

// Pipe the PDF document to a file
doc.pipe(fs.createWriteStream('output.pdf'));

// Add embedded text with custom font
doc.font('fonts/PalatinoBold.ttf')
   .fontSize(25)
   .text('Some text with an embedded font!', 100, 100);

// Add an image with specified dimensions and alignment
doc.image('path/to/image.png', {
  fit: [250, 300],
  align: 'center',
  valign: 'center'
});

// Add a new page with a 2-inch margin
doc.addPage({ margin: '2in' });

// Draw vector graphics (triangle example)
doc.save()
   .moveTo(100, 150)
   .lineTo(100, 250)
   .lineTo(200, 250)
   .fill('#FF3300')
   .restore();

// Add a page with annotations and clickable link
doc.addPage()
   .fillColor('blue')
   .text('Here is a link!', 100, 100)
   .underline(100, 100, 160, 27, { color: '#0000FF' })
   .link(100, 100, 160, 27, 'http://google.com/');

// Finalize PDF file
doc.end();
```

2. Encryption and Access Privileges:

```javascript
const secureDoc = new PDFDocument({
  userPassword: 'userPass',
  ownerPassword: 'ownerPass',
  permissions: {
    printing: 'highResolution', // Choose between 'lowResolution' and 'highResolution'
    modifying: true,
    copying: true,
    annotating: true,
    fillingForms: true,
    contentAccessibility: true,
    documentAssembly: true
  },
  pdfVersion: '1.7ext3' // For 256-bit AES encryption
});
// Pipe and add content as with standard document
secureDoc.pipe(fs.createWriteStream('secure_output.pdf'));
// ... add content ...
secureDoc.end();
```

3. Switching Pages with Buffering:

```javascript
const bufferedDoc = new PDFDocument({ bufferPages: true });

bufferedDoc.addPage();
// Add content to first page

bufferedDoc.addPage();
// Add content to second page

// Retrieve buffered page range
const range = bufferedDoc.bufferedPageRange(); // e.g., { start: 0, count: 2 }

// Loop through pages and add a page number
for (let i = range.start; i < range.start + range.count; i++) {
  bufferedDoc.switchToPage(i);
  bufferedDoc.text(`Page ${i + 1} of ${range.count}`, 50, 50);
}

// Flush buffered pages (doc.end() automatically calls flushPages if needed)
bufferedDoc.flushPages();
bufferedDoc.end();
```

4. Using PDFKit in the Browser with blob-stream:

```javascript
const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');

const docBrowser = new PDFDocument();
const stream = docBrowser.pipe(blobStream());

// Add content as required

docBrowser.text('Hello from PDFKit in the browser!', 100, 100);

docBrowser.end();

stream.on('finish', function() {
  // Obtain a Blob URL and assign to an iframe
  const url = stream.toBlobURL('application/pdf');
  document.getElementById('pdfFrame').src = url;
});
```

Troubleshooting Procedures:
- Verify module installation: run `npm install pdfkit blob-stream`
- For browser builds with Browserify, ensure `brfs` is installed: `npm install brfs --save-dev`
- Confirm file paths for fonts and images are correct.
- Check encryption settings if password truncation issues occur (UTF-8 vs. Latin-1 based on pdfVersion).
- Use veraPDF validator to test PDF/A conformance.

Return Types & Exceptions:
- Most PDFDocument methods return the instance for chaining.
- Stream errors can be handled via `.on('error', handler)` on the piped stream.

These API specifications, full code examples, configuration details, and troubleshooting steps provide complete direct technical guidance for using PDFKit without requiring additional references.


## Original Source
PDFKit Documentation
https://pdfkit.org/docs/getting_started.html

## Digest of PDFKIT

```
# PDFKit Documentation

Date Retrieved: 2023-10-05

## Installation

- Command: `npm install pdfkit`

## Creating a Document

Create a PDF document in Node:

```javascript
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a new PDFDocument instance
const doc = new PDFDocument();

// Pipe the PDF into a writable stream
doc.pipe(fs.createWriteStream('/path/to/file.pdf'));

// Add content using methods (e.g., text, image, vector graphics, etc.)

// Finalize the document
doc.end();
```

_Note: PDFDocument instances are readable Node streams. Pre-0.5 methods `write` and `output` are deprecated._

## Using PDFKit in the Browser

Browser usage can be accomplished by bundling with Browserify or Webpack, or using a standalone script. Example using blob-stream:

```javascript
const PDFDocument = require('pdfkit');
const blobStream  = require('blob-stream');

// Create a new document
const doc = new PDFDocument();

// Pipe the document to a blob stream
const stream = doc.pipe(blobStream());

// Add content as usual
// ...

doc.end();
stream.on('finish', function() {
  // Obtain a Blob
  const blob = stream.toBlob('application/pdf');

  // Or get a blob URL for display
  const url = stream.toBlobURL('application/pdf');
  iframe.src = url;
});
```

_For Browserify builds, install the `brfs` module: `npm install brfs --save-dev`_

## Adding Pages

- The first page is automatically added unless `autoFirstPage: false` is specified.
- To add new pages:

```javascript
// Add a new page
doc.addPage();
```

- Example with custom margins:

```javascript
// 50 point margin on all sides
doc.addPage({ margin: 50 });

// 2 inch margin on all sides
doc.addPage({ margin: '2in' });

// 2em (28pt) margin with specified font size
doc.addPage({ fontSize: 14, margin: '2em' });

// Different margins per side
doc.addPage({
  margins: {
    top: 50,
    bottom: 50,
    left: 72,
    right: 72
  }
});
```

- You can set a page event:

```javascript
doc.on('pageAdded', () => doc.text('Page Title'));
```

## Switching Pages

Enable page buffering to modify content on previous pages:

```javascript
// Create document with buffering enabled
const doc = new PDFDocument({ bufferPages: true });

// Add multiple pages
doc.addPage();
// ... add content ...
doc.addPage();

// Retrieve buffered pages range
const range = doc.bufferedPageRange(); // returns { start, count }

// Switch to a specific page and add content
for (let i = range.start; i < range.start + range.count; i++) {
  doc.switchToPage(i);
  doc.text(`Page ${i + 1} of ${range.count}`);
}

// Flush buffered pages
doc.flushPages();

doc.end();
```

## Setting Default Font

Default font is 'Helvetica'. To change it:

```javascript
const doc = new PDFDocument({ font: 'Courier' });
```

## Setting Document Metadata

You can set metadata via the `info` object (first letter capitalized):

```javascript
const doc = new PDFDocument({
  info: {
    Title: 'Document Title',
    Author: 'Author Name',
    Subject: 'Document Subject',
    Keywords: 'keyword1, keyword2',
    CreationDate: new Date(), // auto-added by PDFKit normally
    ModDate: new Date()
  }
});
```

## Encryption and Access Privileges

Enable encryption by providing passwords and permissions in the constructor options:

```javascript
const secureDoc = new PDFDocument({
  userPassword: 'userPass',
  ownerPassword: 'ownerPass',
  permissions: {
    printing: 'highResolution',    // or 'lowResolution'
    modifying: true,
    copying: true,
    annotating: true,
    fillingForms: true,
    contentAccessibility: true,
    documentAssembly: true
  },
  pdfVersion: '1.7ext3' // Determines encryption method (256-bit AES for 1.7ext3)
});
```

_Behavior based on provided passwords:_
- Only userPassword: full access for user
- Only ownerPassword: opens without password but limited to permissions
- Both provided: user gets limited access as per permissions

## PDF/A Conformance

Set PDF/A subsets by specifying the `subset` option in PDFDocument constructor along with other necessary flags:

- For PDF/A-1b (Level B):
  - `subset: 'PDF/A-1'` or `'PDF/A-1b'`, with pdfVersion at least 1.4
- For PDF/A-1a (Level A):
  - `subset: 'PDF/A-1a'` and tagged set to true
- Similarly for PDF/A-2 and PDF/A-3 with pdfVersion set to at least 1.7

_Note: Embedded fonts are required; use registerFont() with TrueType fonts (ttf) instead of built-in AFM fonts._

## Adding Content

Add text, images, and vector graphics using built-in methods:

```javascript
// Add text with a specific font and font size
doc.font('fonts/PalatinoBold.ttf')
   .fontSize(25)
   .text('Some text with an embedded font!', 100, 100);

// Add an image with constraints
doc.image('path/to/image.png', {
  fit: [250, 300],
  align: 'center',
  valign: 'center'
});

// Draw vector graphics (e.g., a triangle)
doc.save()
   .moveTo(100, 150)
   .lineTo(100, 250)
   .lineTo(200, 250)
   .fill('#FF3300')
   .restore();

// Add page with annotations and links
doc.addPage()
   .fillColor('blue')
   .text('Here is a link!', 100, 100)
   .underline(100, 100, 160, 27, { color: '#0000FF' })
   .link(100, 100, 160, 27, 'http://google.com/');
```
```

## Attribution
- Source: PDFKit Documentation
- URL: https://pdfkit.org/docs/getting_started.html
- License: MIT
- Crawl Date: 2025-04-20T19:06:20.627Z
- Data Size: 922356 bytes
- Links Found: 954

## Retrieved
2025-04-20
