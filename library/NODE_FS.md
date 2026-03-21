NODE_FS

Table of contents
- Common APIs used for CSV and file IO
- Synchronous APIs (readFileSync, writeFileSync)
- Asynchronous/streaming APIs (createReadStream, promises)
- Patterns for large files and streaming CSV

Normalised extract
- Core functions: fs.readFileSync(path[, options]) -> Buffer|string; fs.writeFileSync(path, data[, options]); fs.createReadStream(path[, options]) -> ReadStream; fs.promises.readFile(path[, options]) -> Promise<Buffer|string>.
- For large CSVs prefer streaming with fs.createReadStream and line-by-line parsing using readline.createInterface({input: stream}).

Reference details (signatures)
- fs.readFileSync(path[, options]) -> Buffer|string
- fs.writeFileSync(path, data[, options]) -> undefined
- fs.createReadStream(path[, options]) -> ReadStream
- fs.promises.readFile(path[, options]) -> Promise<Buffer|string>
- Typical options: encoding: 'utf8' to return string; flag: 'r' or 'w' for mode.

Implementation pattern (CSV)
- Small files: const text = fs.readFileSync(csvPath, 'utf8'); parse text.
- Large files: const stream = fs.createReadStream(csvPath, {encoding:'utf8'}); const rl = require('readline').createInterface({input: stream}); for await (const line of rl) parseLine(line).

Troubleshooting
- Mixed newline styles: normalize with text.replace(/\r\n?/g, '\n') before splitting if using readFileSync.
- Encoding: ensure correct encoding (utf8) to avoid malformed characters.

Detailed digest (source and retrieval)
Source: Node.js fs module documentation
Retrieved: 2026-03-21
Crawled bytes: 935744
Attribution: https://nodejs.org/api/fs.html
