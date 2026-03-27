NODE_FS

Table of contents
1. Overview
2. Key APIs and signatures
3. Recommended usage patterns for CSV loading
4. Streaming vs synchronous reads
5. Error handling and encodings
6. Supplementary details
7. Reference details
8. Detailed digest
9. Attribution

Normalised extract
Overview
- Node.js 'fs' module exposes synchronous, callback, and promise-based APIs for filesystem access.

Key APIs and exact signatures
- fs.readFileSync(path[, options]) -> returns Buffer or string
  - path: string | Buffer | URL
  - options: { encoding?: string | null, flag?: string } | string (encoding)
  - Return: Buffer if no encoding, otherwise string
  - Throws: Error (e.g., ENOENT) on failure
- fs.readFile(path[, options], callback)
  - callback signature: function(err, data)
- fs.promises.readFile(path[, options]) -> Promise<Buffer|string>
- fs.createReadStream(path[, options]) -> Readable stream
  - options: { encoding?, highWaterMark?, start?, end?, flags? }

Recommended usage patterns for CSV loading
- For small CSV files: use fs.readFileSync(filePath, 'utf8') or await fs.promises.readFile(filePath, 'utf8') then split on line breaks and parse.
- For large CSV files: use fs.createReadStream and a streaming CSV parser (e.g., csv-parse in streaming mode) to avoid loading entire file into memory.

Streaming vs synchronous reads
- Synchronous reads block the event loop; acceptable in CLI utilities for one-off runs but prefer asynchronous APIs in servers.
- createReadStream returns a Node.js readable stream that can be piped into parsers.

Error handling and encodings
- Common errors: ENOENT (file not found), EACCES (permission denied). Always handle errors and provide user-friendly messages in CLI tools.
- Use 'utf8' encoding for text CSV files.

Supplementary details
- When reading CSV text, normalize line endings (split on /\r?\n/), trim BOM if present (UTF-8 BOM: 0xEF,0xBB,0xBF), and handle trailing newline gracefully.

Reference details
- Full docs: Node.js fs module (methods, options, exact parameter names and return behaviours).

Detailed digest
- Source: Node.js FS documentation
- URL: https://nodejs.org/api/fs.html
- Retrieved: 2026-03-27
- Data size obtained during crawl: approximately 915 KB

Attribution
- Source: Node.js official documentation.