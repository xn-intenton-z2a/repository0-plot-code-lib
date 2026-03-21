NORMALISED EXTRACT

Table of contents
- Core methods for file IO
- Promises API signatures
- Stream-based IO for large files
- Practical examples for CSV and plot output

1. Core methods
- fs.promises.readFile(path[, options]) -> Promise<Buffer|string>
- fs.promises.writeFile(file, data[, options]) -> Promise<void>
- fs.createReadStream(path[, options]) -> ReadableStream
- fs.createWriteStream(path[, options]) -> WriteableStream

2. Promises API details
- readFile: options may be encoding string (utf8) or an object {encoding, flag}
- writeFile: data may be Buffer, TypedArray, DataView, string; options include encoding and mode and flag; returns a Promise that resolves when write completes

3. Stream-based IO
- Use createReadStream and createWriteStream for large files to avoid loading entire file into memory
- Example pattern for parsing CSV line by line: createReadStream | readline.createInterface({input: stream}) | on('line', handler)
- Use pipeline utility (stream/promises pipeline) to handle errors and backpressure

4. Practical notes for saving plots
- For SVG: write File with utf8 encoding directly (fs.promises.writeFile(filePath, svgString, 'utf8'))
- For PNG via library: receive Buffer from converter and fs.promises.writeFile(filePath, pngBuffer)

REFERENCE DETAILS (SIGNATURES)
- readFile(path: string | Buffer | URL | integer, options?: {encoding?: string|null, flag?: string}) -> Promise<Buffer|string>
- writeFile(file: string | Buffer | URL | integer, data: string | Buffer | TypedArray, options?: {encoding?: string | null, mode?: number, flag?: string}) -> Promise<void>
- createReadStream(path, options?) -> Readable
- createWriteStream(path, options?) -> Writable

DETAILED DIGEST
Source: Node.js fs module documentation
Retrieved: 2026-03-21 (referenced; no automated crawl in this run)
Data obtained: referenced page (no bytes downloaded by this run)

ATTRIBUTION
Node.js Documentation - fs (nodejs.org)
