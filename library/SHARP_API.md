# SHARP_API

## Crawl Summary
The crawled content returned no data (Data Size: 0 bytes), but the source is referenced from the Sharp API documentation. This document includes detailed API method signatures such as `sharp(input, options)`, `resize(width, height, options)`, and `toFile(outputPath, [callback])`, alongside code examples and configuration details.

## Normalised Extract
## Table of Contents
1. Installation
2. API Methods
   - sharp(input, options)
   - resize(width, height, options)
   - toFile(outputPath, [callback])
3. Implementation Patterns
4. Troubleshooting
5. Configuration Options

### 1. Installation
- Command: `npm install sharp`

### 2. API Methods

**sharp(input, options?)**
- Signature: `sharp(input: Buffer | string, options?: {limitInputPixels?: number}): Sharp`
- Details: Accepts a file path or Buffer and optional options.

**resize(width, height?, options?)**
- Signature: `resize(width: number, height?: number, options?: {
    kernel?: 'nearest' | 'cubic' | 'mitchell' | 'lanczos2' | 'lanczos3',
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside',
    position?: 'centre' | 'center' | 'entropy' | 'attention' | number,
    withoutEnlargement?: boolean
}): Sharp`
- Details: Resizes images with explicit kernel, fit mode, cropping position and enlargement restrictions.

**toFile(outputPath, [callback])**
- Signatures:
  - Promise: `toFile(outputPath: string): Promise<{format: string, width: number, height: number, size: number}>`
  - Callback: `toFile(outputPath: string, callback: (err: Error, info: {format: string, width: number, height: number, size: number}) => void): void`
- Details: Saves processed image and returns file info.

### 3. Implementation Patterns
- **Chain Processing:** Configure input, apply resize transformations, and output to file.
- **Error Management:** Use catch blocks with Promises or error callbacks.

### 4. Troubleshooting
- Increase `limitInputPixels` for large images.
- Verify file system permissions for output.
- Update to the latest Sharp version if methods are missing.

### 5. Configuration Options
- `limitInputPixels`: number, controls the maximum pixel count.
- Resize options include `kernel`, `fit`, `position`, and `withoutEnlargement` with defined accepted values.


## Supplementary Details
### Supplementary Technical Specifications

- **sharp(input, options) Details:**
  - Parameters:
    - input: string | Buffer
    - options: { limitInputPixels?: number }
  - Returns: A Sharp instance with methods for image transformation.

- **resize(width, height?, options) Details:**
  - Parameters:
    - width: number
    - height (optional): number
    - options: {
         kernel?: 'nearest' | 'cubic' | 'mitchell' | 'lanczos2' | 'lanczos3',
         fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside',
         position?: 'centre' | 'center' | 'entropy' | 'attention' | number,
         withoutEnlargement?: boolean
      }
  - Operation: Resizes the image accordingly, chaining is supported.

- **toFile(outputPath, callback?) Details:**
  - Parameters:
    - outputPath: string
    - callback (optional): function handling error and info
  - Returns: Promise resolving with object { format: string, width: number, height: number, size: number } if no callback is provided.

- **Implementation Steps:**
  1. Import sharp.
  2. Instantiate sharp with input file or buffer and optional options.
  3. Chain .resize() with desired dimensions and options.
  4. Chain .toFile() to write output, handle error/success via callback or then/catch.

- **Configuration Options Detailed:**
  - Kernel Options: 'nearest', 'cubic', 'mitchell', 'lanczos2', 'lanczos3'.
  - Fit Modes: 'cover' (default crop), 'contain' (letterbox), 'fill' (force fill), 'inside', 'outside'.
  - withoutEnlargement: Defaults to false unless specified, preventing enlarging of images.


## Reference Details
### Complete API Specifications and Code Examples

#### Function: sharp(input, options?)
- **Signature:** `sharp(input: Buffer | string, options?: { limitInputPixels?: number }): Sharp`
- **Parameters:**
  - input: Path to image file or Buffer
  - options: Optional object. Example: `{ limitInputPixels: 100000000 }`
- **Return Type:** Sharp instance

#### Method: resize(width, height?, options?)
- **Signature:** 
```javascript
resize(
  width: number,
  height?: number,
  options?: {
    kernel?: 'nearest' | 'cubic' | 'mitchell' | 'lanczos2' | 'lanczos3',
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside',
    position?: 'centre' | 'center' | 'entropy' | 'attention' | number,
    withoutEnlargement?: boolean
  }
): Sharp
```
- **Parameters Details:**
  - width: Desired image width in pixels
  - height: Desired image height in pixels (optional)
  - options:
    - kernel: Defines the interpolation algorithm
    - fit: Defines the resizing mode
    - position: Specifies cropping position
    - withoutEnlargement: Prevents upscaling if true

#### Method: toFile(outputPath, callback?)
- **Promise Signature:**
```javascript
toFile(outputPath: string): Promise<{ format: string, width: number, height: number, size: number }>
```
- **Callback Signature:**
```javascript
toFile(outputPath: string, callback: (err: Error, info: { format: string, width: number, height: number, size: number }) => void): void
```
- **Parameters:**
  - outputPath: File system path to save the image
  - callback: Optional function with error and info parameters

#### Full Code Example:
```javascript
const sharp = require('sharp');

// Create a Sharp instance with input image and pixel limit
const image = sharp('input.jpg', { limitInputPixels: 50000000 });

// Resize the image with specific options
image.resize(800, 600, {
  kernel: 'lanczos3',
  fit: 'inside',
  withoutEnlargement: true
})

// Save the processed image to output file using Promise
.toFile('output.jpg')
  .then(info => {
    console.log('Image info:', info);
  })
  .catch(err => {
    console.error('Error:', err);
  });
```

#### Best Practices
- Always set `limitInputPixels` to mitigate risk on processing large images.
- Chain API calls to process images efficiently.
- Use Promises or async/await for better error handling.

#### Troubleshooting Procedures
- **Command:** `node yourScript.js` to run the image processing script.
- **Issue:** Memory or pixel limit error
  - **Fix:** Increase `limitInputPixels` or reduce image size
- **Issue:** Output file not generated
  - **Fix:** Check directory permissions and path validity; use `fs.access` to verify write permissions.
- **Expected Output:** On successful processing, the console logs an object with keys: `format`, `width`, `height`, `size`.


## Original Source
Sharp Documentation
https://sharp.pixelplumbing.com/api

## Digest of SHARP_API

# SHARP_API Documentation

**Retrieved Date:** 2023-10-10

## Overview
This document provides the technical API specifications, method signatures, code examples, configuration options, and troubleshooting procedures for the Sharp image processing library.

## Installation

To install Sharp, run:

```bash
npm install sharp
```

## API Methods and Specifications

### 1. sharp(input, [options])
- **Signature:** `sharp(input: Buffer | string, options?: {limitInputPixels?: number}): Sharp`
- **Description:** Creates a Sharp instance for processing an image. The `input` can be a file path or a Buffer. The optional `options` object allows configuration such as `limitInputPixels` for memory safety.
- **Example:**

```javascript
const sharp = require('sharp');
// Create a Sharp instance from a JPEG file
const image = sharp('input.jpg', { limitInputPixels: 100000000 });
```

### 2. resize(width, [height], [options])
- **Signature:** `resize(width: number, height?: number, options?: {
    kernel?: 'nearest' | 'cubic' | 'mitchell' | 'lanczos2' | 'lanczos3',
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside',
    position?: 'centre' | 'center' | 'entropy' | 'attention' | number,
    withoutEnlargement?: boolean
}): Sharp`
- **Description:** Resizes the image to the specified width and optional height. Options allow control of interpolation kernel, fitting method, position for cropping, and prevention of enlargement.
- **Example:**

```javascript
image.resize(200, 300, { fit: 'cover', position: 'centre', withoutEnlargement: true });
```

### 3. toFile(outputPath, [callback])
- **Signature:**
  - Promise: `toFile(outputPath: string): Promise<{ format: string, width: number, height: number, size: number }>`
  - Callback: `toFile(outputPath: string, callback: (err: Error, info: { format: string, width: number, height: number, size: number }) => void): void`
- **Description:** Writes the processed image to the specified `outputPath`. Returns image metadata on success.
- **Example (Promise):**

```javascript
image.toFile('output.jpg')
  .then(info => console.log(info))
  .catch(err => { throw err; });
```

## Detailed Implementation Patterns

### Chain Processing
Sharp allows method chaining. Example of a typical image processing pipeline:

```javascript
const sharp = require('sharp');
sharp('input.jpg', { limitInputPixels: 50000000 })
  .resize(800, 600, { fit: 'inside' })
  .toFile('output.jpg', (err, info) => {
    if (err) {
      console.error('Error processing image:', err);
      return;
    }
    console.log('Image processed:', info);
  });
```

### Handling Input Types and Errors
- Pass input as either a Buffer (for in-memory images) or a file path.
- Ensure error handling is implemented either via callbacks or Promise rejection.

## Troubleshooting

- **Memory Limit Errors:** Increase `limitInputPixels` in the sharp options if processing very large images.
- **Output Issues:** Confirm the file paths have correct permissions and directory existence.
- **Method Not Found:** Ensure using the latest version of Sharp if API methods are missing.

## Configuration Options

- `limitInputPixels`:
  - **Type:** number
  - **Default:** Not set (depends on image size)
  - **Effect:** Limits the number of pixels processed to prevent potential denial-of-service attacks.

- Resize Options:
  - `kernel`: Determines the interpolation algorithm with options such as `nearest`, `cubic`, `mitchell`, `lanczos2`, `lanczos3`.
  - `fit`: How the image should be resized ('cover', 'contain', 'fill', 'inside', 'outside').
  - `position`: Defines the gravity or focal point for cropping. Accepted values include strings or numbers.
  - `withoutEnlargement`: Boolean to prevent enlarging the image beyond its original dimensions.


## Attribution
- Source: Sharp Documentation
- URL: https://sharp.pixelplumbing.com/api
- License: Apache-2.0
- Crawl Date: 2025-04-19T04:25:21.299Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-19
