NODE_FS

Table of contents
- Overview
- Callback API signatures
- Promise API signatures (recommended)
- Common options and their effects
- Examples (pattern) for saving files
- Error handling
- Reference details
- Digest and attribution

Normalized extract
Overview
- The Node.js fs module provides file system operations. For modern code use fs.promises which exposes Promise-based variants of common functions.

Callback API signatures
- fs.writeFile(path, data[, options], callback)
  - path: string | Buffer | URL
  - data: string | Buffer | TypedArray | DataView
  - options: string | Object (encoding, mode, flag)
  - callback: function(err)

Promise API signatures
- fs.promises.writeFile(path, data[, options]) -> Promise<void>
  - path: string | Buffer | URL
  - data: string | Buffer | TypedArray | DataView
  - options: string | Object (encoding, mode, flag)
  - Returns a Promise that resolves when the write completes.

Common options and effects
- encoding: default 'utf8' when data is a string; use 'binary' or omit when writing Buffers.
- mode: file permissions (e.g. 0o666). Default typical POSIX permissions apply.
- flag: file system flags like 'w' (truncate/write), 'a' (append).

Examples (pattern) for saving plot files
- ESM pattern (promises): import { promises as fs } from 'fs'; await fs.writeFile(outputPath, svgString, 'utf8');
- For PNG binary output use Buffer and write without encoding: await fs.writeFile(outputPath, pngBuffer);

Error handling
- Catch and handle errors such as ENOENT, EACCES; for CLI tools return non-zero exit codes on failures.

Reference details
- Source: Node.js fs API
- URL: https://nodejs.org/api/fs.html

Digest
- Retrieved: 2026-03-21
- Crawl bytes: 935744 bytes

Attribution
- Content extracted and condensed from Node.js API documentation (fs). Data retrieved 2026-03-21, 935744 bytes.
