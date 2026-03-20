NODE_FS

TABLE OF CONTENTS:
1. fs core APIs used for file output
2. Signatures and parameter details
3. Options and typical values (encoding, mode, flag)
4. Implementation notes and atomic-write pattern
5. Supplementary details and error handling
6. Reference details (precise signatures)
7. Detailed digest and retrieval metadata

NORMALISED EXTRACT:
- Core functions to create and write files:
  - fs.writeFile(path, data[, options], callback) — asynchronous write. "path" accepts string | Buffer | URL | integer (fd). "data" accepts string | Buffer | TypedArray | DataView.
  - fs.writeFileSync(path, data[, options]) — synchronous write; throws on error.
  - fs.promises.writeFile(path, data[, options]) -> Promise<void> — Promise-based asynchronous write suitable for async/await.
- Options object shape: { encoding?: string | null; mode?: number; flag?: string } or a string encoding shorthand.
- Default option values: encoding: 'utf8' (when data is string), mode: 0o666 (subject to umask), flag: 'w'.
- For binary output (PNG buffers) always supply Buffer or Uint8Array; omit encoding or set encoding: null.

SUPPLEMENTARY DETAILS:
- Use fs.promises.writeFile(path, buffer) to write binary image buffers returned by canvas.toBuffer or sharp output.
- Atomic-write pattern: write to a temporary filename in the same directory (unique suffix) then fs.rename(tempPath, finalPath) to avoid partial writes being observed.
- Permissions: when creating files, mode is applied then modified by process.umask(); set explicit mode when necessary.
- File descriptor usage: passing a file descriptor (integer) writes to that descriptor; this avoids extra open/close overhead when performing multiple writes.
- Error handling: always catch and handle EACCES, ENOENT, EPERM; on failure of rename after successful write consider cleaning temp file.

REFERENCE DETAILS (exact signatures and return types):
- fs.writeFile(path: string | Buffer | URL | integer, data: string | Buffer | TypedArray | DataView, options?: string | { encoding?: string | null; mode?: number; flag?: string }, callback: (err: NodeJS.ErrnoException | null) => void): void
- fs.writeFileSync(path: string | Buffer | URL | integer, data: string | Buffer | TypedArray | DataView, options?: string | { encoding?: string | null; mode?: number; flag?: string }): void
- fs.promises.writeFile(path: string | Buffer | URL | integer, data: string | Buffer | TypedArray | DataView, options?: string | { encoding?: string | null; mode?: number; flag?: string }): Promise<void>

IMPLEMENTATION PATTERNS:
- Save PNG buffer synchronously (blocking): fs.writeFileSync('out.png', pngBuffer)
- Save PNG buffer asynchronously (recommended in CLI handlers): await fs.promises.writeFile('out.png', pngBuffer)
- Atomic write example pattern: write to 'out.png.tmp.<pid>' then await fs.promises.rename(tmpPath, outPath).
- When writing to avoid race conditions in concurrent runs, use file locks or unique output paths.

DETAILED DIGEST (extracted/normalised from nodejs.org fs reference, retrieved 2026-03-20):
- Node.js exposes callback, sync, and promise forms of file-writing APIs. The asynchronous form takes a callback(err) and returns undefined; the promise form returns Promise<void>. Options include encoding, mode, and flag. Binary data must be written as Buffer/TypedArray and not as string if exact bytes must be preserved.

ATTRIBUTION:
Source: https://nodejs.org/api/fs.html — retrieved 2026-03-20. Data size fetched during crawl: 935744 bytes.
