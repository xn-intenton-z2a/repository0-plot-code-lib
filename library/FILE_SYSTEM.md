# FILE_SYSTEM

## Crawl Summary
File system module offers promise, callback and sync APIs. Key classes: FileHandle (methods: appendFile, chmod, chown, close, createReadStream, createWriteStream, datasync, read, write, writeFile, writev), fsPromises methods such as access, appendFile, chmod, copyFile, cp, glob, etc. Each method includes clearly defined parameters, defaults (e.g., encoding: 'utf8', autoClose: true) and return types (Promises or direct values). Code examples show promise-based (async/await) deletion, callback error handling, and synchronous usage with try/catch.

## Normalised Extract
Table of Contents:
1. FileHandle API
   - appendFile(data[, options]): data: string|Buffer|TypedArray|DataView|AsyncIterable|Iterable|Stream; options: Object|string (encoding: default 'utf8', signal: AbortSignal)
   - chmod(mode): mode: integer; returns Promise undefined
   - chown(uid, gid): uid, gid: integer; returns Promise undefined
   - close(): returns Promise undefined
   - createReadStream([options]): options include encoding (default null), autoClose (true), emitClose (true), start, end (default Infinity), highWaterMark (64*1024)
   - createWriteStream([options]): options include encoding (default 'utf8'), autoClose (true), emitClose (true), start, highWaterMark (16384), flush (false)
   - Other methods: datasync, read, readFile, write, writeFile, writev, stat, sync, truncate, utimes, readLines, readableWebStream, Symbol.asyncDispose
2. fsPromises API
   - access(path[, mode]): path: string|Buffer|URL; mode: integer (default F_OK); returns Promise undefined
   - appendFile(path, data[, options]): options include encoding (default 'utf8'), mode (default 0o666), flag (default 'a'), flush (false)
   - chmod, chown, copyFile (with mode modifiers), cp (with options: force, mode, recursive, preserveTimestamps, verbatimSymlinks, errorOnExist, filter), glob (pattern with options cwd, exclude, withFileTypes)
   - Additional methods include: lchmod, lchown, lutimes, link, lstat, mkdir, open, opendir, readdir, readFile, readlink, realpath, rename, rmdir, rm, stat, statfs, symlink, truncate, unlink, utimes, watch, writeFile, constants
3. Callback and Sync APIs
   - Each promise method has a callback alternative (e.g. fs.access(path[, mode], callback)) and synchronous variant (e.g. fs.accessSync(path[, mode]))
4. Common Objects
   - fs.Dir, fs.Dirent, fs.FSWatcher, fs.Stat, fs.WriteStream, fs.ReadStream

Each API item includes explicit type signatures, parameter defaults, applicable options and return types. Code examples are provided for promise, callback, and synchronous methods, including proper error handling and resource closure via try/finally.

## Supplementary Details
Exact Parameters and Defaults:
- FileHandle.appendFile: data (string|Buffer|TypedArray|DataView|AsyncIterable|Iterable|Stream), options: { encoding: 'utf8' (default), signal: undefined }.
- FileHandle.createReadStream options: { encoding: null, autoClose: true, emitClose: true, start: integer, end: Infinity, highWaterMark: 65536, signal: undefined }.
- fsPromises.appendFile: options: encoding: 'utf8', mode: 0o666, flag: 'a', flush: false.
- fsPromises.access: mode defaults to fs.constants.F_OK

Implementation Steps:
1. Import the required module: either using require('node:fs') for callback/sync or require('node:fs/promises') for promise-based operations.
2. Use fsPromises.open() to obtain a FileHandle. Always close the FileHandle using its close() method in a finally block.
3. For writing data, choose filehandle.write() for buffers or filehandle.writeFile() for full file replacement. Use filehandle.createWriteStream() for multiple asynchronous writes.
4. For reading, use filehandle.readFile() or createReadStream() with proper options if partial file reads are needed.
5. Handle errors in try/catch (promise and sync) or error-first callback pattern (callback API).
6. Use constants from fs.constants for permission or mode checks.

Configuration Options:
- flush in appendFile and createWriteStream ensures file descriptor flush before close.
- autoClose controls whether the file descriptor is closed automatically after stream end or error.

Troubleshooting Procedures:
- Use try/catch to capture errors from Promise rejections.
- For file descriptor leaks, ensure filehandle.close() is called in a finally block.
- Verify permissions using fsPromises.access with appropriate mode flags (R_OK, W_OK, X_OK).
- Check fs.constants for file mode flags when using chmod and chown.

Best Practices:
- Always explicitly close file handles to prevent memory leaks.
- Prefer promise-based APIs for ease of error handling with async/await, except when maximum performance is required (then use callback form).
- Validate file existence and permissions before performing operations to avoid race conditions.

Example Code (Promise-based):
import { open, unlink } from 'node:fs/promises';

(async () => {
  let filehandle;
  try {
    filehandle = await open('thefile.txt', 'r+');
    // perform file operations here
    await filehandle.writeFile('data', { encoding: 'utf8' });
  } catch (error) {
    console.error(error);
  } finally {
    await filehandle?.close();
  }
})();

## Reference Details
API Specifications:

FileHandle Methods:
1. appendFile(data: string|Buffer|TypedArray|DataView|AsyncIterable|Iterable|Stream, options?: { encoding?: string, signal?: AbortSignal } | string): Promise<undefined>
2. chmod(mode: number): Promise<undefined>
3. chown(uid: number, gid: number): Promise<undefined>
4. close(): Promise<undefined>
5. createReadStream(options?: { encoding?: string, autoClose?: boolean, emitClose?: boolean, start?: number, end?: number, highWaterMark?: number, signal?: AbortSignal }): fs.ReadStream
6. createWriteStream(options?: { encoding?: string, autoClose?: boolean, emitClose?: boolean, start?: number, highWaterMark?: number, flush?: boolean }): fs.WriteStream
7. datasync(): Promise<undefined>
8. read(buffer: Buffer|TypedArray|DataView, offset?: number, length?: number, position?: number|bigint|null): Promise<{ bytesRead: number, buffer: Buffer|TypedArray|DataView }>
9. readFile(options?: { encoding?: string|null, signal?: AbortSignal } | string): Promise<string|Buffer>
10. write(buffer: Buffer|TypedArray|DataView, offset?: number, length?: number, position?: number|null): Promise<{ bytesWritten: number, buffer: Buffer|TypedArray|DataView }>
11. write(string: string, position?: number|null, encoding?: string): Promise<{ bytesWritten: number, buffer: string }>
12. writeFile(data: string|Buffer|TypedArray|DataView|AsyncIterable|Iterable|Stream, options?: { encoding?: string|null, signal?: AbortSignal } | string): Promise<undefined>
13. writev(buffers: Array<Buffer|TypedArray|DataView>, position?: number|null): Promise<{ bytesWritten: number, buffers: Array<Buffer|TypedArray|DataView> }>
14. stat(options?: { bigint?: boolean }): Promise<fs.Stats>
15. sync(): Promise<undefined>
16. truncate(len?: number): Promise<undefined>
17. utimes(atime: number | string | Date, mtime: number | string | Date): Promise<undefined>
18. readLines(options?: { encoding?: string, autoClose?: boolean, emitClose?: boolean, start?: number, end?: number, highWaterMark?: number }): Promise<readline.Interface>
19. readableWebStream(): ReadableStream
20. [Symbol.asyncDispose](): Promise<undefined>

fsPromises Methods:
1. access(path: string|Buffer|URL, mode?: number): Promise<undefined>
2. appendFile(path: string|Buffer|URL, data: string|Buffer, options?: { encoding?: string|null, mode?: number, flag?: string, flush?: boolean } | string): Promise<undefined>
3. chmod(path: string|Buffer|URL, mode: number|string): Promise<undefined>
4. chown(path: string|Buffer|URL, uid: number, gid: number): Promise<undefined>
5. copyFile(src: string|Buffer|URL, dest: string|Buffer|URL, mode?: number): Promise<undefined>
6. cp(src: string|URL, dest: string|URL, options?: { force?: boolean, mode?: number, recursive?: boolean, preserveTimestamps?: boolean, verbatimSymlinks?: boolean, errorOnExist?: boolean, filter?: Function }): Promise<undefined>
7. glob(pattern: string|string[], options?: { cwd?: string, exclude?: Function|string[], withFileTypes?: boolean }): AsyncIterator<string|fs.Dirent>
... (other methods follow similar pattern)

Code Example (Callback):
import { unlink } from 'node:fs';

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});

Troubleshooting Commands:
- To test file permissions: 
  node -e "require('fs').accessSync('/path/to/file', require('fs').constants.R_OK | require('fs').constants.W_OK)" 
  Expected: No output if successful; error thrown if access fails.
- To check file descriptor leaks, run process monitor and check for unclosed descriptors.
- Use try/catch around async operations to log full error messages.

Best Practice:
Always use try/finally for FileHandle operations:

(async () => {
  let fh;
  try {
    fh = await open('file.txt', 'r+');
    // ... perform operations
  } catch (err) {
    console.error(err);
  } finally {
    if (fh) await fh.close();
  }
})();

## Information Dense Extract
FS API: FileHandle.appendFile(data, options?: { encoding?: string ('utf8'), signal?: AbortSignal } | string) -> Promise<undefined>; FileHandle.chmod(mode: number) -> Promise<undefined>; FileHandle.chown(uid: number, gid: number) -> Promise<undefined>; FileHandle.close() -> Promise<undefined>; createReadStream(options?: { encoding?: string (null), autoClose?: boolean (true), emitClose?: boolean (true), start?: number, end?: number (Infinity), highWaterMark?: number (65536), signal?: AbortSignal }) -> fs.ReadStream; createWriteStream(options?: { encoding?: string ('utf8'), autoClose?: boolean (true), emitClose?: boolean (true), start?: number, highWaterMark?: number (16384), flush?: boolean (false) }) -> fs.WriteStream; fsPromises.access(path: string|Buffer|URL, mode?: number (F_OK)) -> Promise<undefined>; fsPromises.appendFile(path, data, options?: { encoding?: string ('utf8'), mode?: number (0o666), flag?: string ('a'), flush?: boolean (false) } | string) -> Promise<undefined>; fsPromises.copyFile(src, dest, mode?: number) -> Promise<undefined>; fsPromises.cp(src, dest, options: { force?: boolean (true), mode?: number (0), recursive?: boolean (false), preserveTimestamps?: boolean (false), verbatimSymlinks?: boolean (false) }) -> Promise<undefined>; Callback and Sync versions available; Common Objects: fs.Dir, fs.Dirent, fs.FSWatcher, fs.Stats; Exact signatures included above.

## Sanitised Extract
Table of Contents:
1. FileHandle API
   - appendFile(data[, options]): data: string|Buffer|TypedArray|DataView|AsyncIterable|Iterable|Stream; options: Object|string (encoding: default 'utf8', signal: AbortSignal)
   - chmod(mode): mode: integer; returns Promise undefined
   - chown(uid, gid): uid, gid: integer; returns Promise undefined
   - close(): returns Promise undefined
   - createReadStream([options]): options include encoding (default null), autoClose (true), emitClose (true), start, end (default Infinity), highWaterMark (64*1024)
   - createWriteStream([options]): options include encoding (default 'utf8'), autoClose (true), emitClose (true), start, highWaterMark (16384), flush (false)
   - Other methods: datasync, read, readFile, write, writeFile, writev, stat, sync, truncate, utimes, readLines, readableWebStream, Symbol.asyncDispose
2. fsPromises API
   - access(path[, mode]): path: string|Buffer|URL; mode: integer (default F_OK); returns Promise undefined
   - appendFile(path, data[, options]): options include encoding (default 'utf8'), mode (default 0o666), flag (default 'a'), flush (false)
   - chmod, chown, copyFile (with mode modifiers), cp (with options: force, mode, recursive, preserveTimestamps, verbatimSymlinks, errorOnExist, filter), glob (pattern with options cwd, exclude, withFileTypes)
   - Additional methods include: lchmod, lchown, lutimes, link, lstat, mkdir, open, opendir, readdir, readFile, readlink, realpath, rename, rmdir, rm, stat, statfs, symlink, truncate, unlink, utimes, watch, writeFile, constants
3. Callback and Sync APIs
   - Each promise method has a callback alternative (e.g. fs.access(path[, mode], callback)) and synchronous variant (e.g. fs.accessSync(path[, mode]))
4. Common Objects
   - fs.Dir, fs.Dirent, fs.FSWatcher, fs.Stat, fs.WriteStream, fs.ReadStream

Each API item includes explicit type signatures, parameter defaults, applicable options and return types. Code examples are provided for promise, callback, and synchronous methods, including proper error handling and resource closure via try/finally.

## Original Source
Node.js File System (fs) Documentation
https://nodejs.org/api/fs.html

## Digest of FILE_SYSTEM

# Node.js File System API (fs)

This document details the Node.js file system API, including promise, callback and synchronous methods. It covers classes like FileHandle, common objects such as fs.Dir, fs.Dirent, fs.FSWatcher, and the detailed technical method signatures, parameters, and return types for each API.

# FileHandle API

FileHandle objects are created using fsPromises.open() and contain the following key methods:

- filehandle.appendFile(data[, options])
  - Parameters: data (string | Buffer | TypedArray | DataView | AsyncIterable | Iterable | Stream), options (Object | string) with sub-properties encoding (string, default 'utf8') and signal (AbortSignal).
  - Returns: Promise that fulfills with undefined.
  - Alias: filehandle.writeFile()

- filehandle.chmod(mode)
  - Parameter: mode (integer, file mode bit mask).
  - Returns: Promise that fulfills with undefined.

- filehandle.chown(uid, gid)
  - Parameters: uid (integer), gid (integer).
  - Returns: Promise that fulfills with undefined.

- filehandle.close()
  - Returns: Promise that fulfills with undefined after pending operations complete.

- filehandle.createReadStream([options])
  - Options: object with encoding (default null), autoClose (default true), emitClose (default true), start (integer), end (integer, default Infinity), highWaterMark (default 64*1024), signal.
  - Returns: fs.ReadStream.

- filehandle.createWriteStream([options])
  - Options: object with encoding (default 'utf8'), autoClose (default true), emitClose (default true), start (position), highWaterMark (default 16384), flush (boolean, default false).
  - Returns: fs.WriteStream.

- filehandle.datasync()
  - Returns: Promise that fulfills with undefined. Forces data to OS sync state.

- filehandle.read(buffer, offset, length, position) and variations
  - Parameters: buffer (Buffer/TYPED Array), offset (integer, default 0), length (bytes count), position (integer or bigint or null).
  - Returns: Promise that yields an object with bytesRead (integer) and buffer reference.

- filehandle.readFile(options)
  - Options: Object or string (encoding). If no encoding, returns Buffer; otherwise string.
  - Returns: Promise with file contents.

- filehandle.write(buffer, offset[, length[, position]])
  - Parameters: buffer (Buffer/TypedArray), offset (integer), length (optional), position (optional).
  - Returns: Promise that fulfills with an object containing bytesWritten and buffer reference.

- filehandle.write(string[, position[, encoding]])
  - Parameters: string (string), position (integer or null), encoding (default 'utf8').
  - Returns: Promise with bytesWritten and string reference.

- filehandle.writeFile(data, options)
  - Parameters: data (string | Buffer | Iterable types), options (Object or string specifying encoding, default 'utf8', signal).
  - Returns: Promise that fulfills with undefined.

- filehandle.writev(buffers[, position])
  - Parameters: buffers (array of Buffer or ArrayBufferViews), position (optional integer).
  - Returns: Promise with bytesWritten and buffers reference.

Additional methods: filehandle.stat, filehandle.sync, filehandle.truncate, filehandle.utimes, filehandle.readLines, filehandle.readv, filehandle.readableWebStream, and the Symbol.asyncDispose alias.

# fsPromises API

The fsPromises API includes asynchronous methods returning promises:

- fsPromises.access(path[, mode])
  - Parameters: path (string | Buffer | URL), mode (integer, default fs.constants.F_OK).
  - Returns: Promise that fulfills with undefined.

- fsPromises.appendFile(path, data[, options])
  - Parameters: path (string | Buffer | URL), data, options (Object/string with encoding, mode default 0o666, flag default 'a', flush option).
  - Returns: Promise that fulfills with undefined.

- fsPromises.chmod(path, mode)
  - Parameters: path, mode (string or integer).
  - Returns: Promise with undefined.

- fsPromises.copyFile(src, dest[, mode])
  - Parameters: src, dest (string | Buffer | URL), mode (integer, default 0). Supports constants: COPYFILE_EXCL, COPYFILE_FICLONE, COPYFILE_FICLONE_FORCE.
  - Returns: Promise that fulfills with undefined.

- fsPromises.cp(src, dest[, options])
  - Options include: force (boolean, default true), mode (integer, default 0), recursive (boolean, default false), preserveTimestamps (boolean, default false), verbatimSymlinks (boolean, default false), errorOnExist, filter.
  - Returns: Promise that fulfills with undefined.

- fsPromises.glob(pattern[, options])
  - Options: cwd (default process.cwd()), exclude (function or list), withFileTypes (boolean, default false).
  - Returns: AsyncIterator yielding matching file paths or Dirents.

Additional methods: fsPromises.chown, fsPromises.lchmod (deprecated), fsPromises.lchown, fsPromises.lutimes, fsPromises.link, fsPromises.lstat, fsPromises.mkdir, fsPromises.open, fsPromises.opendir, fsPromises.readdir, fsPromises.readFile, fsPromises.readlink, fsPromises.realpath, fsPromises.rename, fsPromises.rmdir, fsPromises.rm, fsPromises.stat, fsPromises.statfs, fsPromises.symlink, fsPromises.truncate, fsPromises.unlink, fsPromises.utimes, fsPromises.watch, and fsPromises.writeFile.

# Callback and Synchronous APIs

Each fs method is available in callback form and synchronous form. Example callback:

fs.access(path[, mode], callback)

Example synchronous method:

fs.accessSync(path[, mode])

# Common Objects

- fs.Dir: methods include close(), read(), readSync(), and iteration via Symbol.asyncIterator.
- fs.Dirent: methods like isFile(), isDirectory(), isSymbolicLink(), and properties like name, path.
- fs.FSWatcher: supports events 'change', 'close', 'error', and methods close(), ref(), unref().
- fs.Stats: properties include size, mode, dev, ino, atime, mtime, ctime, birthtime, and methods such as isFile(), isDirectory(), etc.
- fs.WriteStream, fs.ReadStream: Event-driven streams with events such as 'open', 'close', 'error'.

# Code Examples

Promise-based operation:

import { unlink } from 'node:fs/promises';

(async function(path) {
  try {
    await unlink(path);
    console.log(`successfully deleted ${path}`);
  } catch (error) {
    console.error('error:', error.message);
  }
})('/tmp/hello');

Callback-based operation:

import { unlink } from 'node:fs';

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});

Synchronous operation:

import { unlinkSync } from 'node:fs';

try {
  unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle error
}

Retrieved on: 

## Attribution
- Source: Node.js File System (fs) Documentation
- URL: https://nodejs.org/api/fs.html
- License: MIT License
- Crawl Date: 2025-04-26T21:47:14.505Z
- Data Size: 3304278 bytes
- Links Found: 1237

## Retrieved
2025-04-26
