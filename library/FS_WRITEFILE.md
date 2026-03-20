FS_WRITEFILE

Table of contents
- Function signature
- Parameters and accepted types
- Options object keys and defaults
- Behavior and return value
- File descriptor handling and flags
- Errors and common failure modes
- Examples
- Supplementary details and best practices
- Reference details (exact signatures and types)
- Detailed digest and attribution

Normalised extract
Function signature
fs.promises.writeFile(path, data[, options])

Parameters
- path: string | Buffer | URL | integer (file descriptor). When an integer is provided it is treated as an open file descriptor and Node will not close it automatically.
- data: string | Buffer | TypedArray | DataView. Data argument is written to the file; string data is encoded using the provided encoding option.
- options (optional): Can be a string specifying encoding or an object with keys described below.

Options and defaults
- encoding: string | null. Default: 'utf8' when data is string and no explicit encoding provided.
- mode: integer (file mode bits). Default: 0o666, masked by process.umask().
- flag: string. Default: 'w' (open file for writing, creating or truncating). To append use 'a'.

Behavior
- Returns a Promise that resolves with undefined when the write completes successfully or rejects with an Error on failure.
- If path is a file descriptor, the descriptor is used as-is and not closed by writeFile.
- The operation will truncate the file when using default flag 'w' before writing; use flag 'a' to append.
- When options.encoding is provided and data is a string, the string is encoded accordingly; when data is a Buffer, encoding is ignored.

Errors and failure modes
- Permission errors (EACCES), ENOENT for missing parent directories (unless using recursive mkdir prior), EBADF for invalid file descriptors, and ENOSPC when disk space runs out.
- For very large writes, consider streaming via fs.createWriteStream for lower memory footprint.

Examples (inline)
- Using string: await fs.promises.writeFile('out.txt', 'hello', { encoding: 'utf8' })
- Using buffer: await fs.promises.writeFile(fd, Buffer.from([0x01,0x02]), { flag: 'w' })
- Append example: await fs.promises.writeFile(path, data, { flag: 'a' })

Supplementary details and best practices
- Atomicity: fs.promises.writeFile is not atomic; for atomic replacements write to a temporary file then rename.
- Directories: Ensure parent directories exist; use fs.promises.mkdir(path, { recursive: true }) where needed.
- Concurrency: Writes to same file from multiple processes/threads may interleave; use file locks or single-writer patterns when required.
- File descriptors: When using file descriptor numbers, be careful to manage lifecycle (open/close) outside writeFile.

Reference details (exact signatures and types)
- Signature: fs.promises.writeFile(path: string|Buffer|URL|integer, data: string|Buffer|TypedArray|DataView, options?: string|{ encoding?: string|null, mode?: number, flag?: string }) -> Promise<void>
- Throws: Error with code property (e.g., ENOENT, EACCES, EBADF, ENOSPC) on failure; rejects the returned Promise.
- Default option values: encoding 'utf8' for string writes unless specified, mode 0o666, flag 'w'.

Detailed digest
- Source URL: https://nodejs.org/api/fs.html#fspromiseswritefile
- Retrieved: 2026-03-20
- Crawl data size: 937321 bytes (HTML content saved during fetch)
- Extract: Extracted exact Promise-based signature, parameter types, options keys and defaults, behavior for file descriptors and flags, and common usage patterns from the Node.js fs documentation page.

Attribution
Content derived from Node.js documentation: fs.promises.writeFile (https://nodejs.org). Retrieved 2026-03-20. HTML snapshot size 937,321 bytes obtained via curl.
