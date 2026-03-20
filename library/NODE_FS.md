NODE_FS

TABLE OF CONTENTS:
1. fs core APIs used for file output and input
2. Signatures and parameter details
3. Promise-based APIs (fs.promises) — exact shapes
4. Options and typical values (encoding, mode, flag)
5. Implementation notes and atomic-write pattern
6. Supplementary details and error handling
7. Reference details (precise signatures)
8. Detailed digest and retrieval metadata

NORMALISED EXTRACT:
- Core functions used for file I/O in Node.js: callback-style, synchronous, and promise-based variants exist for reading and writing files, opening file descriptors, listing directories, and manipulating filesystem entries.
- For CLI tools producing binary output (PNG), the promise-based APIs are recommended for straightforward async/await usage and clearer error handling.

PROMISE-BASED API (fs.promises) — exact shapes and return types:
- fs.promises.readFile(path: string | Buffer | URL | integer, options?: { encoding?: string | null } | string | null) -> Promise<Buffer | string>
- fs.promises.writeFile(path: string | Buffer | URL | integer, data: string | Buffer | TypedArray | DataView, options?: string | { encoding?: string | null; mode?: number; flag?: string }) -> Promise<void>
- fs.promises.appendFile(path: string | Buffer | URL | integer, data: string | Buffer | TypedArray | DataView, options?: string | { encoding?: string | null; mode?: number; flag?: string }) -> Promise<void>
- fs.promises.open(path: string | Buffer | URL, flags?: string, mode?: number) -> Promise<FileHandle>
- fs.promises.readdir(path: string | Buffer | URL, options?: { encoding?: string; withFileTypes?: boolean } | string) -> Promise<string[] | Dirent[]>
- fs.promises.stat(path: string | Buffer | URL) -> Promise<Stats>
- fs.promises.mkdir(path: string | Buffer | URL, options?: { recursive?: boolean; mode?: number } | number) -> Promise<string | void>
- fs.promises.unlink(path: string | Buffer | URL) -> Promise<void>

OPTIONS AND TYPICAL VALUES:
- encoding: when reading or writing text, common encodings are 'utf8' or 'utf-8'; for binary data (PNG) use Buffer and set encoding: null or omit encoding.
- mode: file permission bits (e.g., 0o666 default then masked by process.umask()).
- flag: file system flag string (e.g., 'w' for write, 'wx' to fail if exists, 'a' to append).

IMPLEMENTATION NOTES AND PATTERNS:
- Writing binary PNG buffers: await fs.promises.writeFile(path, pngBuffer) where pngBuffer is a Buffer returned by canvas.toBuffer() or sharp().toBuffer().
- Atomic write pattern: write to a temp file in the same directory then await fs.promises.rename(tempPath, finalPath) to ensure consumers never see a partially-written filename.
- Use fs.promises.open(...) with a FileHandle when multiple writes to the same file are necessary; remember to call filehandle.close() or use the FileHandle in a try/finally.
- For CLI utilities that must detect file existence first, use fs.promises.stat() and handle ENOENT to decide whether to create files.

ERROR HANDLING AND EDGE CASES:
- Catch and handle common errno codes: ENOENT (no such file or directory), EACCES/EPERM (permission issues), EEXIST (file exists when using 'wx'), ENOTDIR when path components are not directories.
- When rename fails after writing temp file, attempt cleanup of the temp file to avoid disk litter.

REFERENCE DETAILS (precise signatures):
- fs.promises.readFile(path: string | Buffer | URL | integer, options?: { encoding?: string | null } | string | null): Promise<Buffer | string>
- fs.promises.writeFile(path: string | Buffer | URL | integer, data: string | Buffer | TypedArray | DataView, options?: string | { encoding?: string | null; mode?: number; flag?: string }): Promise<void>
- fs.promises.appendFile(path: string | Buffer | URL | integer, data: string | Buffer | TypedArray | DataView, options?: string | { encoding?: string | null; mode?: number; flag?: string }): Promise<void>
- fs.promises.open(path: string | Buffer | URL, flags?: string, mode?: number): Promise<FileHandle>
- fs.promises.readdir(path: string | Buffer | URL, options?: { encoding?: string; withFileTypes?: boolean } | string): Promise<string[] | Dirent[]>
- fs.promises.stat(path: string | Buffer | URL): Promise<Stats>
- fs.promises.mkdir(path: string | Buffer | URL, options?: { recursive?: boolean; mode?: number } | number): Promise<string | void>
- fs.promises.unlink(path: string | Buffer | URL): Promise<void>

DETAILED DIGEST (extracted/normalised from nodejs.org fs reference):
- The Node.js fs documentation provides the canonical method signatures and details for the callback, sync and promises variants. The promise forms return standard Promises and are the recommended approach in modern async/await code.

ATTRIBUTION:
- Source: https://nodejs.org/api/fs.html (fs.promises section) — retrieved 2026-03-20. Data size fetched during crawl: ~915400 bytes.
