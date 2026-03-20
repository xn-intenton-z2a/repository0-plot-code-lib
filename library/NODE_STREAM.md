NODE_STREAM

NORMALISED EXTRACT
- The Node.js 'stream' module defines the core primitives for streaming I/O: Readable, Writable, Duplex, Transform and utility functions such as pipeline and finished.
- Streams support both flowing and paused modes; use pipe/pipeline for safe composition with backpressure handling and robust error propagation.

TABLE OF CONTENTS
1. Stream types and purposes
2. Readable interface and events
3. Writable interface and backpressure
4. Pipeline and error handling
5. Practical patterns for CSV input

DETAILS
1. Stream types
- Readable: source of data (fs.createReadStream returns a Readable)
- Writable: destination of data (fs.createWriteStream), implement write(chunk, encoding, callback)
- Duplex: readable + writable
- Transform: Duplex with synchronous/asynchronous transform(chunk, encoding, callback) semantics

2. Readable interface and events
- Event: 'data' (chunk: Buffer|string) — emitted in flowing mode.
- Event: 'readable' — emitted when data can be read with stream.read([size]).
- Event: 'end' — emitted when no more data.
- Event: 'error' — emitted on error.
- Methods: readable.pause(), readable.resume(), readable.pipe(destination, options?)
- Property: readable.readableHighWaterMark controls buffering/backpressure threshold.

3. Writable interface and backpressure
- write(chunk, encoding?, callback?) -> boolean — returns false when the internal buffer is full; caller should wait for 'drain' event before resuming writes.
- end([chunk], [encoding], [callback]) — signal end of writes.

4. Pipeline and error handling
- pipeline(...streams, callback(err?)) is the recommended pattern to connect streams and propagate errors; it closes streams on error automatically.
- finished(stream, callback) can be used to detect completion.

5. Practical patterns for CSV input
- Use fs.createReadStream(filePath, { encoding: 'utf8' }) to stream the file.
- Wrap the Readable with readline.createInterface({ input: readable }) for line-by-line extraction, or pipe through a Transform stream that implements RFC4180 parsing (accumulate quoted fields, emit parsed record objects).
- For high-performance numeric series, accumulate in typed arrays (Float64Array) and pre-allocate based on expected row counts when possible.

REFERENCE DETAILS (SIGNATURES)
- stream.Readable extends EventEmitter: on('data', (chunk: Buffer|string) => void), on('end', () => void), on('error', (err: Error) => void)
- stream.Writable.write(chunk: Buffer|string, encoding?: string, callback?: () => void) -> boolean
- stream.pipeline(...streams: Readable|Writable|Duplex|Transform[], callback?: (err?: Error) => void) -> void
- stream.finished(stream: Stream, callback: (err?: Error) => void) -> void

BEST PRACTICES
- Use pipeline() to connect streams and ensure proper cleanup on errors.
- Respect backpressure: check write() return value and await 'drain' if false.
- Prefer UTF-8 decoding at the stream boundary (set encoding on read stream or use setEncoding) rather than converting per-chunk.

DETAILED DIGEST (source: https://nodejs.org/api/stream.html)
- Retrieved: 2026-03-20
- Crawl size: 822762 bytes
- Content digested: Node.js stream module reference including Readable/Writable/Transform semantics, events, pipeline utility and recommended patterns for composing streaming I/O.

ATTRIBUTION
- Source: https://nodejs.org/api/stream.html
- Retrieved: 2026-03-20
- Bytes downloaded during crawl: 822762
