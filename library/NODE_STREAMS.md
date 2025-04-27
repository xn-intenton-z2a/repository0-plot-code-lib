# NODE_STREAMS

## Crawl Summary
Detailed Node.js streams API covering Writable, Readable, Duplex, and Transform streams. Includes method signatures like write(chunk[, encoding][, callback]) returning boolean, end([chunk[, encoding]][, callback]), and pipeline(source[, ...transforms], destination[, options]) returning Promise. Lists events such as 'close', 'drain', 'error', 'finish', using explicit configuration options (highWaterMark, objectMode, emitClose) and includes complete code examples for pipeline, finished, and stream creation with AbortSignal integration.

## Normalised Extract
Table of Contents:
1. Writable Streams
  - Methods: write(chunk[, encoding][, callback]) -> boolean
  - end([chunk[, encoding]][, callback]) -> this
  - cork(), uncork(), destroy([error]) -> this
  - setDefaultEncoding(encoding) -> this
  - Properties: closed, destroyed, writableFinished, writableHighWaterMark, writableLength, writableNeedDrain, writableObjectMode
  - Events: close, drain, error, finish, pipe, unpipe
2. Readable Streams
  - Methods: read([size]) -> chunk, pause(), resume(), pipe(destination[, options]), setEncoding(encoding), unshift(chunk[, encoding]), destroy([error]) -> this, and async iteration via [Symbol.asyncIterator]()
  - Properties: closed, destroyed, readableHighWaterMark, readableLength, readableObjectMode, readableFlowing
  - Events: close, data, end, error, pause, readable, resume
3. Duplex and Transform Streams
  - Duplex streams combine readable and writable interfaces
  - Transform streams implement _transform(chunk, encoding, callback) and _flush(callback)
  - PassThrough stream available
4. Streams Promises API
  - pipeline(source[, ...transforms], destination[, options]) -> Promise
    • Parameters: source (Stream|Iterable|AsyncIterable|Function), transforms (...Stream|Function), destination (Stream|Function), options (object: signal: AbortSignal, end: boolean default true)
    • Returns: Promise that fulfills when pipeline completes
  - finished(stream[, options]) -> Promise
    • Options: signal (AbortSignal), cleanup (boolean, default false)
    • Returns: Promise fulfilled when stream is no longer readable/writable
Detailed Implementation:
- Use new stream.Writable([options]) with custom _write and _final for writing flows.
- Use new stream.Readable([options]) with custom _read and push() calls.
- Backpressure management via return value of write(), and employing drain event.
- Integration of AbortController with pipeline for cancellation of streaming operations.

## Supplementary Details
Configuration Options:
- highWaterMark: Number (bytes for binary streams, objects count for objectMode). Determines internal buffer threshold.
- objectMode: Boolean. True enables non-buffer primitives; default false.
- emitClose: Boolean. When true, 'close' is emitted after destruction.

Implementation Steps for Custom Streams:
1. Writable Stream Implementation:
   • Instantiate: new stream.Writable({ highWaterMark: <number>, objectMode: <boolean> })
   • Override: _write(chunk, encoding, callback) for each chunk processing.
   • Optionally implement _writev(chunks, callback) for batched writes.
   • Ensure calling writable.end() with final chunk if needed.

2. Readable Stream Implementation:
   • Instantiate: new stream.Readable({ highWaterMark: <number>, objectMode: <boolean> })
   • Override: _read(size) to push new data using this.push(data).
   • End stream by pushing null.

3. Duplex/Transform Streams:
   • Instantiate with new stream.Duplex(options) for combined readable and writable.
   • In Transform streams, implement _transform(chunk, encoding, callback) and optionally _flush(callback).

4. Streams Promises API Usage:
   • pipeline example with AbortSignal:
       const ac = new AbortController();
       const { signal } = ac;
       setImmediate(() => ac.abort());
       await pipeline(
         fs.createReadStream('archive.tar'),
         zlib.createGzip(),
         fs.createWriteStream('archive.tar.gz'),
         { signal }
       );

5. Troubleshooting:
   • Check for backpressure: if write() returns false, wait for 'drain' event before further writes.
   • Use finished(stream, { cleanup: true }) to remove lingering event listeners after errors.
   • Use console.error in catch blocks to output AbortError or other stream errors.

Best Practices:
- Always handle the 'error' event on streams to avoid unhandled exceptions.
- Prefer using pipeline() for chaining streams to automatically handle errors and cleanup.
- In high-concurrency scenarios, configure highWaterMark appropriately to balance memory usage and throughput.

## Reference Details
API Specifications:

1. stream.Writable:
   - Constructor: new stream.Writable(options?: { highWaterMark?: number, objectMode?: boolean, emitClose?: boolean })
   - Method: write(chunk: string|Buffer|TypedArray|DataView, encoding?: string, callback?: (error?: Error) => void) -> boolean
   - Method: end([chunk: string|Buffer|TypedArray|DataView, encoding?: string, callback?: () => void]) -> this
   - Method: cork() -> void
   - Method: uncork() -> void
   - Method: destroy([error?: Error]) -> this
   - Method: setDefaultEncoding(encoding: string) -> this
   - Properties: closed (boolean), destroyed (boolean), writableFinished (boolean), writableHighWaterMark (number), writableLength (number), writableNeedDrain (boolean), writableObjectMode (boolean)
   - Events: 'close', 'drain', 'error', 'finish', 'pipe', 'unpipe'

2. stream.Readable:
   - Constructor: new stream.Readable(options?: { highWaterMark?: number, objectMode?: boolean, encoding?: string, emitClose?: boolean })
   - Method: read([size?: number]) -> any
   - Method: setEncoding(encoding: string) -> this
   - Method: pause() -> this
   - Method: resume() -> this
   - Method: pipe(destination: stream.Writable, options?: { end?: boolean }) -> stream.Writable
   - Method: unshift(chunk: any, encoding?: string) -> void
   - Method: destroy([error?: Error]) -> this
   - Supports async iteration using [Symbol.asyncIterator]()
   - Properties: closed (boolean), destroyed (boolean), readableHighWaterMark (number), readableLength (number), readableObjectMode (boolean), readableFlowing (boolean|null)
   - Events: 'close', 'data', 'end', 'error', 'pause', 'readable', 'resume'

3. stream.Duplex and stream.Transform:
   - Duplex Constructor: new stream.Duplex(options?: DuplexOptions)
   - Transform Constructor: new stream.Transform(options?: TransformOptions)
   - In Transform: _transform(chunk, encoding, callback: (error?: Error, data?: any) => void), _flush(callback: (error?: Error, data?: any) => void)

4. Streams Promises API:
   - pipeline:
     • Signature: pipeline(source: Stream|Iterable|AsyncIterable|Function, ...transforms: (Stream|Function), destination?: Stream|Function, options?: { signal?: AbortSignal, end?: boolean }) -> Promise
     • Returns: Promise that resolves when pipeline completes
     • Example usage provided above
   - finished:
     • Signature: finished(stream: Stream|ReadableStream|WritableStream, options?: { signal?: AbortSignal, cleanup?: boolean }) -> Promise
     • Returns: Promise fulfilled when stream ends

Code Examples:
// Writable Stream Example
const { Writable } = require('node:stream');
const myWritable = new Writable({ highWaterMark: 1024, objectMode: false });
myWritable._write = function(chunk, encoding, callback) {
  // Process chunk
  callback();
};
myWritable.write('data', 'utf8', (err) => { if(err) console.error(err); });
myWritable.end('final data', 'utf8', () => { console.log('Done writing'); });

// Pipeline with AbortSignal Example
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');
const zlib = require('node:zlib');
(async () => {
  const ac = new AbortController();
  const { signal } = ac;
  setImmediate(() => ac.abort());
  try {
    await pipeline(
      fs.createReadStream('archive.tar'),
      zlib.createGzip(),
      fs.createWriteStream('archive.tar.gz'),
      { signal }
    );
    console.log('Pipeline succeeded.');
  } catch (err) {
    console.error('Pipeline error:', err);
  }
})();

Troubleshooting Steps:
- Verify write() return values for backpressure; wait for 'drain' event if false.
- Use finished() with { cleanup: true } to remove residual listeners after stream errors.
- Check AbortSignal usage in async generators to ensure pipeline completion.
- Log full error objects in catch blocks for detailed diagnostics.

Configuration Details:
- highWaterMark default: typically 16KB for non-object mode streams.
- objectMode default: false unless explicitly set.
- end option in pipeline defaults to true but can be set to false to prevent auto-closing of destination streams.

## Information Dense Extract
NODE_STREAMS: Writable (write(chunk[, encoding][,cb]) -> boolean, end([chunk, encoding, cb]) -> this, cork(), uncork(), destroy([err]) -> this; props: closed, destroyed, writableFinished, writableHighWaterMark, writableLength, writableNeedDrain; events: close, drain, error, finish, pipe, unpipe), Readable (read([size]) -> any, setEncoding(encoding), pause(), resume(), pipe(dest[, {end}]), unshift(chunk), destroy([err]) -> this; async iteration via Symbol.asyncIterator; props: closed, destroyed, readableHighWaterMark, readableLength, readableObjectMode, readableFlowing; events: close, data, end, error, pause, readable, resume), Duplex/Transform (combine read/write; Transform implements _transform(chunk, encoding, cb), _flush(cb)), Streams Promises API: pipeline(source[, ...transforms], destination[, {signal, end}]) -> Promise, finished(stream[, {signal, cleanup}]) -> Promise; code examples, configuration: highWaterMark, objectMode, emitClose; detailed best practices on backpressure handling, error events, AbortSignal integration, and cleanup procedures.

## Sanitised Extract
Table of Contents:
1. Writable Streams
  - Methods: write(chunk[, encoding][, callback]) -> boolean
  - end([chunk[, encoding]][, callback]) -> this
  - cork(), uncork(), destroy([error]) -> this
  - setDefaultEncoding(encoding) -> this
  - Properties: closed, destroyed, writableFinished, writableHighWaterMark, writableLength, writableNeedDrain, writableObjectMode
  - Events: close, drain, error, finish, pipe, unpipe
2. Readable Streams
  - Methods: read([size]) -> chunk, pause(), resume(), pipe(destination[, options]), setEncoding(encoding), unshift(chunk[, encoding]), destroy([error]) -> this, and async iteration via [Symbol.asyncIterator]()
  - Properties: closed, destroyed, readableHighWaterMark, readableLength, readableObjectMode, readableFlowing
  - Events: close, data, end, error, pause, readable, resume
3. Duplex and Transform Streams
  - Duplex streams combine readable and writable interfaces
  - Transform streams implement _transform(chunk, encoding, callback) and _flush(callback)
  - PassThrough stream available
4. Streams Promises API
  - pipeline(source[, ...transforms], destination[, options]) -> Promise
     Parameters: source (Stream|Iterable|AsyncIterable|Function), transforms (...Stream|Function), destination (Stream|Function), options (object: signal: AbortSignal, end: boolean default true)
     Returns: Promise that fulfills when pipeline completes
  - finished(stream[, options]) -> Promise
     Options: signal (AbortSignal), cleanup (boolean, default false)
     Returns: Promise fulfilled when stream is no longer readable/writable
Detailed Implementation:
- Use new stream.Writable([options]) with custom _write and _final for writing flows.
- Use new stream.Readable([options]) with custom _read and push() calls.
- Backpressure management via return value of write(), and employing drain event.
- Integration of AbortController with pipeline for cancellation of streaming operations.

## Original Source
New Source: Node.js Streams Documentation
https://nodejs.org/api/stream.html

## Digest of NODE_STREAMS

# Node Streams Documentation

Retrieved: 2023-10-04

## Overview
A stream in Node.js is an abstract interface for working with streaming data. Streams can be readable, writable, duplex (both readable and writable) or transform (a type of duplex that can modify data).

## Stream Types and Core APIs

### Writable Streams (Class: stream.Writable)
- Methods: 
  - writable.write(chunk[, encoding][, callback]) -> boolean
  - writable.end([chunk[, encoding]][, callback]) -> this
  - writable.cork() and writable.uncork()
  - writable.destroy([error]) -> this
  - writable.setDefaultEncoding(encoding) -> this
- Properties and Events: 
  - writable.closed, writable.destroyed, writable.writableFinished, writable.writableHighWaterMark, writable.writableLength, writable.writableNeedDrain, writable.writableObjectMode
  - Events: 'close', 'drain', 'error', 'finish', 'pipe', 'unpipe'

### Readable Streams (Class: stream.Readable)
- Methods:
  - readable.read([size]) -> chunk
  - readable.pause(), readable.resume()
  - readable.pipe(destination[, options])
  - readable.setEncoding(encoding)
  - readable.unshift(chunk[, encoding])
  - readable.destroy([error])
  - Symbol.asyncIterator() for async iteration
- Properties and Events:
  - readable.closed, readable.destroyed, readable.readableHighWaterMark, readable.readableLength, readable.readableObjectMode, readable.readableFlowing
  - Events: 'close', 'data', 'end', 'error', 'pause', 'readable', 'resume'

### Duplex and Transform Streams
- Duplex streams combine Readable and Writable; examples include net.Socket.
- Transform streams inherit Duplex and include:
  - Methods: _transform(chunk, encoding, callback) and _flush(callback)
  - Class: stream.Transform, stream.PassThrough

### Streams Promises API
Provides asynchronous utility functions that return Promises instead of using callbacks. Additional methods include:

- stream.pipeline(source[, ...transforms], destination[, options])
  - Signature:
    • pipeline(source: Stream | Iterable | AsyncIterable | Function, ...transforms: (Stream | Function), destination?: Stream | Function, options?: {signal?: AbortSignal, end?: boolean}) -> Promise
  - Description: Chains multiple streams and returns a Promise fulfilled when pipeline is complete. Option end option (default true) controls closing of the destination.
  - Code Example:
    const { pipeline } = require('node:stream/promises');
    const fs = require('node:fs');
    const zlib = require('node:zlib');
    async function run() {
      await pipeline(
        fs.createReadStream('archive.tar'),
        zlib.createGzip(),
        fs.createWriteStream('archive.tar.gz')
      );
      console.log('Pipeline succeeded.');
    }
    run().catch(console.error);

- stream.finished(stream[, options]) -> Promise
  - Options: { signal?: AbortSignal, cleanup?: boolean (default false) }
  - Description: Returns a Promise fulfilled when the stream is no longer readable or writable.
  - Code Example:
    const { finished } = require('node:stream/promises');
    const fs = require('node:fs');
    const rs = fs.createReadStream('archive.tar');
    async function run() {
      await finished(rs);
      console.log('Stream is done reading.');
    }
    run().catch(console.error);
    rs.resume();

## Implementation Guidelines

### Creating a Writable Stream
- Instantiate with new stream.Writable([options]).
- Implement _construct(callback), _write(chunk, encoding, callback), _writev(chunks, callback), _final(callback), _destroy(err, callback) for custom behavior.

### Creating a Readable Stream
- Instantiate with new stream.Readable([options]).
- Implement _construct(callback), _read(size), _destroy(err, callback)
- Use push(chunk[, encoding]) to supply data to the internal buffer.

### Creating a Duplex or Transform Stream
- Instantiate with new stream.Duplex(options) or new stream.Transform([options]).
- Duplex streams handle independent read and write buffering.

### Object Mode and Buffering
- Object mode is enabled via options: { objectMode: true }.
- The highWaterMark option controls the amount of data buffered (bytes for binary, objects for object mode).

## Configuration Options and Effects

- highWaterMark: For Writable and Readable streams; defines buffer threshold.
- objectMode: When true, streams accept arbitrary JavaScript values except null.
- emitClose (Writable/Readable): When true, emits 'close' event after stream destruction.

## Attributes for Advanced Usage

- For backpressure handling, writable.write() returns false when internal buffer exceeds highWaterMark. Use drain event to continue writing.
- Use writable.cork() and writable.uncork() to batch small writes.
- Async iterators and generators may be used with streams (Symbol.asyncIterator()).
- Advanced pipeline usage supports AbortSignals for cancellation.

## Attribution
Data Size: 3596314 bytes, 1262 links available. Crawled from Node.js v23.11.0 stream documentation.

## Attribution
- Source: New Source: Node.js Streams Documentation
- URL: https://nodejs.org/api/stream.html
- License: MIT License
- Crawl Date: 2025-04-27T09:47:51.203Z
- Data Size: 3596314 bytes
- Links Found: 1262

## Retrieved
2025-04-27
