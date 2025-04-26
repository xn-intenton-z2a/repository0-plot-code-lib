# STREAM_API

## Crawl Summary
stream.pipeline: signature and parameters, options.signal, options.end (default true), returns Promise<void>; stream.finished: parameters error/readable/writable/signal/cleanup (default false); objectMode flag (boolean default false) enables arbitrary object chunks; highWaterMark: bytes default 16384 or object count in objectMode; backpressure when buffer ≥ highWaterMark

## Normalised Extract
Table of contents:
1. stream.promises.pipeline
2. stream.promises.finished
3. objectMode option
4. highWaterMark option

1. stream.promises.pipeline
Signature: pipeline(source[, ...transforms], destination[, options]) -> Promise<void>
Parameters:
  source: Stream | Iterable | AsyncIterable | Function
  ...transforms: Stream | Function
  destination: Stream | Function
  options: { signal?: AbortSignal; end?: boolean }
    • signal: AbortSignal — aborts pipeline when signaled
    • end: boolean — close destination on source end (default true)
Return: Promise<void>

2. stream.promises.finished
Signature: finished(stream[, options]) -> Promise<void>
Parameters:
  stream: Stream | ReadableStream | WritableStream
  options: { error?: boolean; readable?: boolean; writable?: boolean; signal?: AbortSignal; cleanup?: boolean }
    • error: boolean — reject promise on error events
    • readable: boolean — observe readable end
    • writable: boolean — observe writable end
    • signal: AbortSignal — destroy stream on abort
    • cleanup: boolean — remove listeners on settle (default false)
Return: Promise<void>

3. objectMode option
Specification: { objectMode: true | false }
Default: false
Effect: allows writing and reading non-Buffer/String values except null
Set at stream construction only

4. highWaterMark option
Specification: { highWaterMark: number }
Default: 16384 for byte mode, 16 384 code units for string mode, object count in objectMode
Effect: threshold for internal buffer before backpressure or pause

## Supplementary Details
• Module import: const { pipeline, finished } = require('node:stream/promises');
  const stream = require('node:stream');

• Default highWaterMark values:
  – Readable: 16 384 bytes
  – Writable: 16 384 bytes

• Object mode instantiation:
  new stream.Readable({ objectMode: true, highWaterMark: 10 });
  new stream.Writable({ objectMode: true, highWaterMark: 16 });

• AbortSignal integration:
  const ac = new AbortController();
  pipeline(src, transform, dest, { signal: ac.signal });
  finished(src, { signal: ac.signal });

• Backpressure handling:
  if (!writable.write(chunk)) writable.once('drain', () => next());

• listener cleanup:
  finished(rs, { cleanup: true });

## Reference Details
1. Full SDK method signatures:

import { pipeline, finished } from 'node:stream/promises';

async function pipeline(
  source: Stream | Iterable<any> | AsyncIterable<any> | Function,
  ...transforms: Array<Stream | Function>,
  destination: Stream | Function,
  options?: { signal?: AbortSignal; end?: boolean; }
): Promise<void>

async function finished(
  stream: Stream | ReadableStream | WritableStream,
  options?: {
    error?: boolean;
    readable?: boolean;
    writable?: boolean;
    signal?: AbortSignal;
    cleanup?: boolean;
  }
): Promise<void>

2. Code examples and implementation patterns:

// gzip compress pipeline with abort
import fs from 'node:fs';
import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';

async function compress(srcPath: string, destPath: string, signal: AbortSignal) {
  await pipeline(
    fs.createReadStream(srcPath),
    zlib.createGzip(),
    fs.createWriteStream(destPath),
    { signal, end: true }
  );
}

// handling backpressure in writable
import { Writable } from 'node:stream';
const w = new Writable({ highWaterMark: 1024 });
let i = 0;
function writeOne() {
  const ok = w.write(Buffer.alloc(512), 'utf8', () => console.log('flushed'));
  if (!ok) w.once('drain', writeOne);
  else process.nextTick(() => { if (++i<1000) writeOne(); });
}
writeOne();

3. Configuration options and effects:

Option            Type         Default    Effect
signal            AbortSignal  —          aborts and destroys streams on abort
end               boolean      true       close destination automatically
cleanup           boolean      false      remove listeners after finished
objectMode        boolean      false      enable non-buffer object chunks
highWaterMark     number       16384      buffer threshold

4. Concrete troubleshooting procedures:

– Detect buffer overflow: console.log(writable.writableLength, writable.writableHighWaterMark)
– Enable stream debug: NODE_DEBUG=stream node app.js (prints internal buffer and flow events)
– Inspect finished listeners: require('events').listenerCount(stream, 'error')
– Reproduce AbortError: 
  const ac = new AbortController(); ac.abort();
  pipeline(src,dest,{signal:ac.signal}).catch(err => console.error(err.name)); // AbortError

5. Best practices:

– Always await pipeline and catch errors
– Use cleanup:true to avoid event listener leaks
– Respect backpressure: never write after write() returns false without drain
– Set appropriate highWaterMark to match memory constraints

## Information Dense Extract
stream.pipeline(source[, ...transforms], destination[, { signal?:AbortSignal; end?:boolean }])→Promise<void>; source: Stream|Iterable|AsyncIterable|Function; transforms: Stream|Function; destination: Stream|Function; end default true. stream.finished(stream[, { error?:boolean; readable?:boolean; writable?:boolean; signal?:AbortSignal; cleanup?:boolean }])→Promise<void>; cleanup default false. objectMode:boolean default false; allows arbitrary objects except null. highWaterMark:number default 16384 bytes (or objects in objectMode, code units in string mode); triggers backpressure when buffer≥highWaterMark. Use AbortSignal for cancellation. Respect writable.write return and drain event. Enable NODE_DEBUG=stream for diagnostics.

## Sanitised Extract
Table of contents:
1. stream.promises.pipeline
2. stream.promises.finished
3. objectMode option
4. highWaterMark option

1. stream.promises.pipeline
Signature: pipeline(source[, ...transforms], destination[, options]) -> Promise<void>
Parameters:
  source: Stream | Iterable | AsyncIterable | Function
  ...transforms: Stream | Function
  destination: Stream | Function
  options: { signal?: AbortSignal; end?: boolean }
     signal: AbortSignal  aborts pipeline when signaled
     end: boolean  close destination on source end (default true)
Return: Promise<void>

2. stream.promises.finished
Signature: finished(stream[, options]) -> Promise<void>
Parameters:
  stream: Stream | ReadableStream | WritableStream
  options: { error?: boolean; readable?: boolean; writable?: boolean; signal?: AbortSignal; cleanup?: boolean }
     error: boolean  reject promise on error events
     readable: boolean  observe readable end
     writable: boolean  observe writable end
     signal: AbortSignal  destroy stream on abort
     cleanup: boolean  remove listeners on settle (default false)
Return: Promise<void>

3. objectMode option
Specification: { objectMode: true | false }
Default: false
Effect: allows writing and reading non-Buffer/String values except null
Set at stream construction only

4. highWaterMark option
Specification: { highWaterMark: number }
Default: 16384 for byte mode, 16 384 code units for string mode, object count in objectMode
Effect: threshold for internal buffer before backpressure or pause

## Original Source
Node.js Streams API
https://nodejs.org/api/stream.html

## Digest of STREAM_API

# Stream Promises API

- stream.pipeline(source[, ...transforms], destination[, options]) -> Promise<void>
  • source: Stream | Iterable | AsyncIterable | Function
  • ...transforms: Stream | Function
  • destination: Stream | Function
  • options: { signal?: AbortSignal; end?: boolean (Default: true) }
  • returns: Promise<void>

- stream.finished(stream[, options]) -> Promise<void>
  • stream: Stream | ReadableStream | WritableStream
  • options: { error?: boolean; readable?: boolean; writable?: boolean; signal?: AbortSignal; cleanup?: boolean (Default: false) }
  • returns: Promise<void>

# Object mode

- objectMode: boolean (Default: false) — operate on arbitrary JS values except null.
- Setting objectMode at construction: new Readable({ objectMode: true }), new Writable({ objectMode: true })

# Buffering

- highWaterMark (Readable): number of bytes (Default: 16 384)
- highWaterMark (Writable): number of bytes (Default: 16 384)
- highWaterMark in object mode: number of objects
- Behavior: internal buffer stored until reaching highWaterMark then backpressure triggers
- writable.write(chunk) returns false when internal buffer size >= highWaterMark


## Attribution
- Source: Node.js Streams API
- URL: https://nodejs.org/api/stream.html
- License: License
- Crawl Date: 2025-04-26T15:48:04.659Z
- Data Size: 3607769 bytes
- Links Found: 1483

## Retrieved
2025-04-26
