NODE_FS

Table of contents
- API overview
- Asynchronous write: fs.writeFile and fs.promises.writeFile
- Streaming write: fs.createWriteStream and write streams
- Reading files: fs.readFile and fs.promises.readFile
- Options and encodings (encoding, mode, flag)
- Binary vs text handling (Buffer usage)
- Implementation notes for saving SVG and PNG
- Reference signatures
- Detailed digest and retrieval metadata
- Attribution

Normalised extract (key technical points)
- fs provides callback and Promise-based APIs. For new code prefer the promise API under fs.promises which returns native Promises.
- Asynchronous file write with callback: fs.writeFile(path, data[, options], callback) writes data to path and invokes callback(err).
- Promise-based write: fs.promises.writeFile(path, data[, options]) returns a Promise that resolves to undefined when write completes or rejects with an Error.
- Stream-based writes use const s = fs.createWriteStream(path[, options]); s.write(chunk); s.end(); useful for large or streamed binary output.
- For binary outputs (PNG buffers), use Buffer objects and omit encoding or pass null; options.encoding defaults to 'utf8' for text.
- Options accepted by writeFile and createWriteStream include encoding (string|null|undefined), mode (integer file permission, e.g. 0o666), and flag (e.g. 'w', 'wx', 'a').
- Use fs.promises.mkdir(path, { recursive: true }) before writing when directories may not exist.

Supplementary details (implementation specifics)
- Use fs.promises.writeFile(filePath, bufferOrString, { mode?: number, flag?: string }) for simple writes. When writing PNG buffers produce a Buffer from the renderer and pass directly; do not supply an encoding.
- For large PNGs or pipe-based producers use createWriteStream and pipe: canvas.createPNGStream() or sharp(...).png().toBuffer() and stream into fs.createWriteStream.
- When writing SVG text, use 'utf8' encoding; ensure string output is valid UTF-8 and include XML declaration if needed.
- To atomically replace files, write to a temporary filename and fs.rename(temp, final) after successful write.

Reference details (API signatures and options)
- fs.writeFile(path: string | Buffer | URL, data: string | Buffer | TypedArray | DataView, options?: { encoding?: string | null; mode?: number; flag?: string }, callback: (err: NodeJS.ErrnoException | null) => void): void
- fs.promises.writeFile(path: string | Buffer | URL, data: string | Buffer | TypedArray | DataView, options?: { encoding?: string | null; mode?: number; flag?: string }): Promise<void>
- fs.createWriteStream(path: string | Buffer | URL, options?: { flags?: string; encoding?: string; mode?: number; autoClose?: boolean; fd?: number }): fs.WriteStream
- fs.readFile(path: string | Buffer | URL, options: { encoding?: string | null } | undefined, callback: (err, data) => void): void
- fs.promises.readFile(path: string | Buffer | URL, options?: { encoding?: string | null }): Promise<Buffer | string>

Concrete best practices
- For PNG: obtain a Buffer from the renderer and write with fs.promises.writeFile(outputPath, buffer) to preserve binary integrity.
- For SVG: write the SVG string with fs.promises.writeFile(outputPath, svgString, { encoding: 'utf8' }).
- For CLI tools, always ensure parent directory exists: await fs.promises.mkdir(path.dirname(outputPath), { recursive: true }).
- For streaming large datasets prefer pipeline(streamSource, fs.createWriteStream(outputPath)) to manage backpressure and errors.

Detailed digest (content retrieved)
Source: https://nodejs.org/api/fs.html
Retrieved: 2026-03-21
Downloaded bytes: 935744
Extract: Node.js File System documentation describes the callback and Promise-based APIs for file operations, signatures for writeFile/readFile/createWriteStream, options and flags, and examples for binary and text file handling. Emphasis on fs.promises for modern usage and on streams for large data.

Attribution
- Source URL: https://nodejs.org/api/fs.html
- Data size (bytes) fetched during crawl: 935744
