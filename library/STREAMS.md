# STREAMS

## Crawl Summary
Module: node:stream, v23.11.0. Exposes Stream classes and utilities. Core types: Writable, Readable, Duplex, Transform. Constructors accept options: objectMode(boolean), highWaterMark(number), encoding(string, Readable), emitClose(boolean), autoDestroy(boolean). Methods: write, read, pipe, unpipe, pause, resume, destroy, cork, uncork, setDefaultEncoding, push, read, setEncoding, compose, from, toWeb. Promises API: pipeline(streams..., options{signal, end}), finished(stream, options{readable, writable, error, signal, cleanup}). Utility functions: duplexPair, compose, addAbortSignal, getDefaultHighWaterMark. Events: close, drain, error, finish, data, end, readable, pause, resume, pipe, unpipe.

## Normalised Extract
Table of Contents
1 Fundamental Types
2 Constructors
3 Instance Properties
4 Instance Methods
5 Events
6 Streams Promises API
7 Utility Functions

1 Fundamental Types
Writable writes data
Readable reads data
Duplex both read/write
Transform Duplex with transform()

2 Constructors
stream.Writable(options)
  objectMode?: boolean
  highWaterMark?: number
  emitClose?: boolean
  autoDestroy?: boolean
  write(chunk, encoding, callback)
  writev(chunks, callback)
  destroy(error, callback)
  final(callback)

stream.Readable(options)
  objectMode?: boolean
  highWaterMark?: number
  encoding?: string
  autoDestroy?: boolean
  read(size)
  destroy(error, callback)

stream.Duplex(options)
  allowHalfOpen?: boolean
  inherits both Writable and Readable options

stream.Transform(options)
  transform(chunk, encoding, callback)
  flush(callback)
  inherits Writable and Readable options

3 Instance Properties
Writable.closed boolean
Writable.destroyed boolean
Writable.writable boolean
Writable.writableEnded boolean
Writable.writableFinished boolean
Writable.writableNeedDrain boolean
Writable.writableHighWaterMark number
Writable.writableLength number
Writable.writableObjectMode boolean
Writable.writableCorked number
Writable.errored Error|null
Writable.writableAborted boolean

Readable.closed boolean
Readable.destroyed boolean
Readable.readableHighWaterMark number
Readable.readableLength number
Readable.readableObjectMode boolean
Readable.readableEncoding string|null
Readable.readableEnded boolean
Readable.readableFlowing boolean|null
Readable.readableDidRead boolean
Readable.errored Error|null
Readable.readableAborted boolean

4 Instance Methods
Writable.write(chunk, encoding?, callback?): boolean
Writable.end(chunk?, encoding?, callback?)
Writable.destroy(error?)
Writable.cork()
Writable.uncork()
Writable.setDefaultEncoding(encoding)
Readable.read(size?)
Readable.setEncoding(encoding)
Readable.pause()
Readable.resume()
Readable.isPaused(): boolean
Readable.pipe(dest, options?)
Readable.unpipe(dest?)
Readable.destroy(error?)
Readable.push(chunk, encoding?)

5 Events
Writable: close, drain, error, finish, pipe(src), unpipe(src)
Readable: close, data(chunk), end, error(error), pause, readable, resume
Duplex & Transform inherit both

6 Streams Promises API
import { pipeline, finished } from 'node:stream/promises'
pipeline(...streams, { signal?: AbortSignal, end?: boolean }): Promise<void>
finished(stream, { error?: boolean, readable?: boolean, writable?: boolean, signal?: AbortSignal, cleanup?: boolean }): Promise<void>

7 Utility Functions
stream.pipeline
stream.finished
stream.compose(...streams): Duplex
stream.duplexPair(options?): [Duplex, Duplex]
stream.Readable.from(iterable, options)
stream.Readable.fromWeb(webStream, options)
stream.Readable.toWeb(stream, options)
stream.Writable.toWeb(stream)
stream.Writable.fromWeb(webStream, options)
stream.Duplex.toWeb(stream)
stream.Duplex.fromWeb(webPair, options)
stream.addAbortSignal(signal, stream)
stream.getDefaultHighWaterMark(objectMode)
stream.setDefaultHighWaterMark(objectMode, value)


## Supplementary Details
Writable options.objectMode: false|true(default false)
highWaterMark: number(default 16KB)
emitClose: boolean(default true)
autoDestroy: boolean(default true)
Readable options.encoding: utf8|ascii|base64|latin1|hex(default null)
highWaterMark: number(default 16KB in bytes or 16 objects if objectMode)
autoDestroy: boolean(default false)
stream.pipeline options.end: boolean(default true) destroys destination on end
stream.pipeline options.signal: AbortSignal, on abort calls destroy with AbortError
stream.finished options.cleanup: boolean(default false) removes listeners
stream.finished options.readable, writable, error: booleans filter events


## Reference Details
// Writable Example
const { Writable } = require('node:stream');
class MyWritable extends Writable {
  constructor() { super({ objectMode: true, highWaterMark: 4 }); }
  _write(chunk, encoding, callback) {
    // chunk: any, encoding: string|null
    process.nextTick(() => callback());
  }
  _writev(chunks, callback) {
    // chunks: Array<{chunk:any,encoding:string}>
    callback();
  }
  _final(callback) { callback(); }
}

// Backpressure handling
function writeData(writer, data) {
  if (!writer.write(data)) writer.once('drain', () => writeData(writer, data));
}

// Readable Example
const { Readable } = require('node:stream');
class MyReadable extends Readable {
  constructor() { super({ encoding: 'utf8', highWaterMark: 8 }); }
  _read(size) {
    // size: number
    this.push('chunk');
    this.push(null);
  }
}

// Duplex Example
const { Duplex } = require('node:stream');
const pair = stream.duplexPair({ highWaterMark: 8 });
pair[0].write('data'); // written to pair[1]

// Transform Example
const { Transform } = require('node:stream');
const upper = new Transform({ transform(chunk, encoding, cb) {
  cb(null, chunk.toString().toUpperCase());
}, highWaterMark: 16 });

// pipeline usage
const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('node:stream/promises');
await pipeline(
  fs.createReadStream('in.txt'),
  zlib.createGzip(),
  fs.createWriteStream('out.txt.gz'),
  { signal, end: false }
);

// Troubleshooting
// ERR_STREAM_DESTROYED: write after destroy(), check writer.destroyed
// Backpressure hang: ensure drain listener or use pipeline


## Information Dense Extract
Type: stream.Writable(options{objectMode:boolean,highWaterMark:number,emitClose:boolean,autoDestroy:boolean,write,writev,destroy,final}); methods: write(chunk,encoding?,cb?),end(chunk?,enc?,cb?),destroy(err?),cork(),uncork(),setDefaultEncoding(enc); props: closed,destroyed,writable*,errored,writableAborted; events: close,drain,error,finish,pipe(src),unpipe(src). stream.Readable(options{objectMode,highWaterMark,encoding,autoDestroy,read,destroy}); methods: read(size?),setEncoding(enc),pause(),resume(),isPaused(),pipe(dest,{end?}),unpipe(dest?),destroy(err?),push(chunk,enc?); props: readable*,errored,readableAborted; events: close,data(chunk),end,error,pause,readable,resume. stream.Duplex(options),stream.Transform(options{transform,flush,decodeStrings,objectMode,highWaterMark}); utilities: pipeline(streams...,{signal, end}),finished(stream,{error,readable,writable,signal,cleanup}),compose(...),duplexPair(opts),Readable.from(iterable,opts),Readable.fromWeb(web,opts),Readable.toWeb(stream,opts),Writable.toWeb(stream),Writable.fromWeb(web,opts),Duplex.toWeb(stream),Duplex.fromWeb(web,opts),addAbortSignal(signal,stream),getDefaultHighWaterMark(objectMode),setDefaultHighWaterMark(objectMode,value). Backpressure: write returns false-> wait for 'drain'. AbortSignal: pipeline abort->AbortError. Defaults: highWaterMark 16KB/16 objects, end true, cleanup false.

## Sanitised Extract
Table of Contents
1 Fundamental Types
2 Constructors
3 Instance Properties
4 Instance Methods
5 Events
6 Streams Promises API
7 Utility Functions

1 Fundamental Types
Writable writes data
Readable reads data
Duplex both read/write
Transform Duplex with transform()

2 Constructors
stream.Writable(options)
  objectMode?: boolean
  highWaterMark?: number
  emitClose?: boolean
  autoDestroy?: boolean
  write(chunk, encoding, callback)
  writev(chunks, callback)
  destroy(error, callback)
  final(callback)

stream.Readable(options)
  objectMode?: boolean
  highWaterMark?: number
  encoding?: string
  autoDestroy?: boolean
  read(size)
  destroy(error, callback)

stream.Duplex(options)
  allowHalfOpen?: boolean
  inherits both Writable and Readable options

stream.Transform(options)
  transform(chunk, encoding, callback)
  flush(callback)
  inherits Writable and Readable options

3 Instance Properties
Writable.closed boolean
Writable.destroyed boolean
Writable.writable boolean
Writable.writableEnded boolean
Writable.writableFinished boolean
Writable.writableNeedDrain boolean
Writable.writableHighWaterMark number
Writable.writableLength number
Writable.writableObjectMode boolean
Writable.writableCorked number
Writable.errored Error|null
Writable.writableAborted boolean

Readable.closed boolean
Readable.destroyed boolean
Readable.readableHighWaterMark number
Readable.readableLength number
Readable.readableObjectMode boolean
Readable.readableEncoding string|null
Readable.readableEnded boolean
Readable.readableFlowing boolean|null
Readable.readableDidRead boolean
Readable.errored Error|null
Readable.readableAborted boolean

4 Instance Methods
Writable.write(chunk, encoding?, callback?): boolean
Writable.end(chunk?, encoding?, callback?)
Writable.destroy(error?)
Writable.cork()
Writable.uncork()
Writable.setDefaultEncoding(encoding)
Readable.read(size?)
Readable.setEncoding(encoding)
Readable.pause()
Readable.resume()
Readable.isPaused(): boolean
Readable.pipe(dest, options?)
Readable.unpipe(dest?)
Readable.destroy(error?)
Readable.push(chunk, encoding?)

5 Events
Writable: close, drain, error, finish, pipe(src), unpipe(src)
Readable: close, data(chunk), end, error(error), pause, readable, resume
Duplex & Transform inherit both

6 Streams Promises API
import { pipeline, finished } from 'node:stream/promises'
pipeline(...streams, { signal?: AbortSignal, end?: boolean }): Promise<void>
finished(stream, { error?: boolean, readable?: boolean, writable?: boolean, signal?: AbortSignal, cleanup?: boolean }): Promise<void>

7 Utility Functions
stream.pipeline
stream.finished
stream.compose(...streams): Duplex
stream.duplexPair(options?): [Duplex, Duplex]
stream.Readable.from(iterable, options)
stream.Readable.fromWeb(webStream, options)
stream.Readable.toWeb(stream, options)
stream.Writable.toWeb(stream)
stream.Writable.fromWeb(webStream, options)
stream.Duplex.toWeb(stream)
stream.Duplex.fromWeb(webPair, options)
stream.addAbortSignal(signal, stream)
stream.getDefaultHighWaterMark(objectMode)
stream.setDefaultHighWaterMark(objectMode, value)

## Original Source
Node.js Streams API
https://nodejs.org/api/stream.html

## Digest of STREAMS

# Retrieve node:stream Module

## Importing

const stream = require('node:stream');

## Fundamental Stream Types

- Writable
- Readable
- Duplex
- Transform

# Streams Promises API

## Methods

### pipeline(source[, ...transforms], destination[, options])
Signature: pipeline(...streams: Array<Stream|Iterable|AsyncIterable|Function>, options?: { signal?: AbortSignal; end?: boolean; }): Promise<void>
- signal: AbortSignal triggers AbortError & destroy
- end (default true): auto-close destination

### finished(stream, options)
Signature: finished(stream: Stream|ReadableStream|WritableStream, options?: { error?: boolean; readable?: boolean; writable?: boolean; signal?: AbortSignal; cleanup?: boolean; }): Promise<void>
- error: include 'error' event (default undefined)
- readable: wait for readable end
- writable: wait for writable finish
- cleanup (default false): remove listeners

# Object Mode & Buffering

- objectMode: boolean in constructor
- highWaterMark: bytes (normal), objects (objectMode), UTF-16 code units (strings)

# stream.Writable

## Constructor
new stream.Writable(options?: {
  write?(chunk: Buffer|string|TypedArray|DataView|any, encoding: string|null, callback: (err?: Error)=>void): void;
  writev?(chunks: Array<{ chunk: any; encoding: string }>, callback: (err?: Error)=>void): void;
  destroy?(error: Error|null, callback: (err?: Error)=>void): void;
  final?(callback: (err?: Error)=>void): void;
  objectMode?: boolean;
  highWaterMark?: number;
  emitClose?: boolean;
  autoDestroy?: boolean;
})

## Instance Methods & Properties
- write(chunk: Buffer|string|TypedArray|DataView|any, encoding?: string|null, callback?: (err?: Error)=>void): boolean
- end(chunk?: Buffer|string|TypedArray|DataView|any, encoding?: string, callback?: ()=>void): this
- destroy(error?: Error): this
- cork(): void
- uncork(): void
- setDefaultEncoding(encoding: string): this
- closed: boolean
- destroyed: boolean
- writable: boolean
- writableEnded: boolean
- writableFinished: boolean
- writableNeedDrain: boolean
- writableHighWaterMark: number
- writableLength: number
- writableObjectMode: boolean
- writableCorked: number
- errored: Error|null
- writableAborted: boolean
- [Symbol.asyncDispose](): Promise<void>

## Events
- 'close'
- 'drain'
- 'error'
- 'finish'
- 'pipe'(src: stream.Readable)
- 'unpipe'(src: stream.Readable)

# stream.Readable

## Constructor
new stream.Readable(options?: {
  read?(size: number): void;
  destroy?(error: Error|null, callback: (err?: Error)=>void): void;
  objectMode?: boolean;
  highWaterMark?: number;
  encoding?: string;
  autoDestroy?: boolean;
})

## Instance Methods & Properties
- read(size?: number): Buffer|string|null
- setEncoding(encoding: string): this
- pause(): this
- resume(): this
- isPaused(): boolean
- pipe(dest: stream.Writable, options?: { end?: boolean }): dest
- unpipe(dest?: stream.Writable): this
- destroy(error?: Error): this
- push(chunk: any, encoding?: string): boolean
- closed: boolean
- destroyed: boolean
- readableHighWaterMark: number
- readableLength: number
- readableObjectMode: boolean
- readableEncoding: string|null
- readableEnded: boolean
- readableFlowing: boolean|null
- readableDidRead: boolean
- errored: Error|null
- readableAborted: boolean
- [Symbol.asyncIterator](): AsyncIterator<any>
- [Symbol.asyncDispose](): Promise<void>

## Events
- 'close'
- 'data'(chunk: Buffer|string|any)
- 'end'
- 'error'(err: Error)
- 'pause'
- 'readable'
- 'resume'

# stream.Duplex & Transform

## stream.Duplex
new stream.Duplex(options: WritableOptions & ReadableOptions & { allowHalfOpen?: boolean })
- allowHalfOpen: boolean (default true)

## stream.Transform
new stream.Transform(options?: {
  transform?(chunk: any, encoding: string, callback: (err?: Error, data?: any)=>void): void;
  flush?(callback: (err?: Error, data?: any)=>void): void;
  objectMode?: boolean;
  highWaterMark?: number;
  decodeStrings?: boolean;
})
- destroy(error?: Error): this

# Utility Functions

- stream.pipeline(...)
- stream.finished(...)
- stream.compose(...streams: Stream[]): Duplex
- stream.duplexPair(options?: { highWaterMark?: number; objectMode?: boolean }): [Duplex, Duplex]
- stream.Readable.from(iterable: Iterable|AsyncIterable, options?: ReadableOptions): Readable
- stream.Readable.fromWeb(readableStream: ReadableStream, options?: ReadableOptions): Readable
- stream.Readable.toWeb(stream: Readable, options?: { preventCancel?: boolean; preventClose?: boolean; preventAbort?: boolean }): ReadableStream
- stream.Writable.toWeb(stream: Writable): WritableStream
- stream.Writable.fromWeb(writableStream: WritableStream, options?: { highWaterMark?: number; objectMode?: boolean }): Writable
- stream.Duplex.toWeb(stream: Duplex): { readable: ReadableStream; writable: WritableStream }
- stream.Duplex.fromWeb(pair: ReadableStreamDefaultReader|WritableStreamDefaultWriter|{ readable: ReadableStream; writable: WritableStream }, options?: DuplexOptions): Duplex
- stream.addAbortSignal(signal: AbortSignal, stream: Stream): void
- stream.getDefaultHighWaterMark(objectMode: boolean): number
- stream.setDefaultHighWaterMark(objectMode: boolean, value: number): void



## Attribution
- Source: Node.js Streams API
- URL: https://nodejs.org/api/stream.html
- License: License
- Crawl Date: 2025-04-26T17:48:11.247Z
- Data Size: 3647472 bytes
- Links Found: 2200

## Retrieved
2025-04-26
