NODE_STREAM

Normalised extract

Table of contents
1. Core stream classes and roles
2. Readable stream semantics and methods
3. Writable, Duplex, Transform and object mode
4. Pipeline and error handling patterns (signatures)
5. Practical patterns for CSV and binary processing

1. Core stream classes and roles
- stream.Readable: sources of data (file, network).
- stream.Writable: sinks for data (files, sockets).
- stream.Duplex: combined readable + writable.
- stream.Transform: duplex stream that modifies data chunks.
- stream.pipeline: helper for composing streams with automatic error propagation and cleanup.

2. Readable stream semantics and methods
- Construction options: highWaterMark (buffer threshold), encoding, objectMode (boolean).
- Modes: flowing mode (data events emitted) vs paused/readable mode (use read()).
- Important methods and events:
  - readable.read([size]) -> chunk | null
  - readable.on('data', chunk)
  - readable.on('readable', () => { let chunk; while (null !== (chunk = readable.read())) { ... } })
  - readable.on('end') (no more data)
  - readable.on('error', err)

3. Writable, Duplex, Transform and object mode
- writable.write(chunk, [encoding], [callback]) -> boolean (backpressure)
- writable.end([chunk], [encoding], [callback]) to finish
- Transform._transform(chunk, encoding, callback) implementors must call callback(err, outputChunk)
- Use objectMode for non-buffer/string chunks (e.g., parsed CSV rows as objects) with separate highWaterMark tuning.

4. Pipeline and error handling patterns (signatures)
- stream.pipeline(...streams, callback(err)) — handles errors and closes streams automatically.
- await stream.finished(stream) or use once(stream, 'finish') for completion detection.
- Always attach 'error' handlers when piping streams or use pipeline to centralize error handling.

5. Practical patterns for CSV and binary processing
- For CSV files: use fs.createReadStream(path, { encoding: 'utf8' }) piped into a transform that accumulates and splits lines or use readline.createInterface for line events; beware of quoted CSV fields spanning multiple lines — use a proper RFC4180-aware parser if quoting present.
- For PNG or image output: use a stream pipeline from an SVG->PNG converter (sharp or canvas) into a writable file stream. For example, sharp(svgBuffer).png().toBuffer() or toFile() integrated into pipeline.
- Backpressure: check writable.write return value and pause/resume readable streams accordingly or rely on pipeline for flow control.

Supplementary details
- Streams are the recommended I/O abstraction for large files; avoid loading whole file into memory for big datasets.
- Transform streams are convenient for incremental parsing and mapping (e.g., CSV row -> numeric array).

Reference details
- Common APIs:
  - const { pipeline } = require('node:stream');
  - pipeline(streamA, streamB, (err) => { /* handle */ })
  - stream.Readable.from(iterable) -> Readable for async iterables
  - stream.finished(stream, (err) => {})
- Key constructor options: highWaterMark, objectMode, encoding

Detailed digest
- Source: Node.js Streams documentation (retrieved 2026-03-21)
- Crawl size: 805.3 KB (HTML response saved during fetch)
- Extracted facts: Readable/Writable/Duplex/Transform semantics, pipeline signature, backpressure rules, objectMode guidance, recommended patterns for CSV and binary output.

Attribution
- Source URL: https://nodejs.org/api/stream.html
- Retrieved: 2026-03-21
- Data size (fetched): 805.3 KB
