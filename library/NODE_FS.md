# NODE_FS

## Crawl Summary
The Node.js File System documentation provides complete API specifications for file operations using promise, callback, and synchronous methods. It covers the FileHandle class with methods like appendFile, chmod, chown, close, createReadStream, createWriteStream, read, write, and more, along with detailed option parameters, return types, and version history. The fsPromises API includes methods such as access, appendFile, chmod, chown, copyFile, cp, and glob, with complete parameter definitions and defaults. Additionally, the Callback and Synchronous APIs are specified with their respective method signatures and error handling patterns.

## Normalised Extract
Table of Contents:
1. FileHandle Class
   - Methods: appendFile(data[, options]), chmod(mode), chown(uid, gid), close(), createReadStream([options]), createWriteStream([options]), datasync(), read(buffer, offset, length, position), read([options]), readFile(options), readLines([options]), readv(buffers[, position]), stat([options]), sync(), truncate(len), utimes(atime, mtime), write(buffer, offset[, length[, position]]), write(buffer[, options]), write(string[, position[, encoding]]), writeFile(data, options), writev(buffers[, position]), [Symbol.asyncDispose]()
2. fsPromises API
   - Methods: access(path[, mode]), appendFile(path, data[, options]), chmod(path, mode), chown(path, uid, gid), copyFile(src, dest[, mode]), cp(src, dest[, options]), glob(pattern[, options]), lchmod(path, mode), lchown(path, uid, gid), lutimes(path, atime, mtime), link(existingPath, newPath), lstat(path[, options]), mkdir(path[, options]), mkdtemp(prefix[, options]), open(path, flags[, mode]), opendir(path[, options]), readdir(path[, options]), readFile(path[, options]), readlink(path[, options]), realpath(path[, options]), rename(oldPath, newPath), rmdir(path[, options]), rm(path[, options]), stat(path[, options]), statfs(path[, options]), symlink(target, path[, type]), truncate(path[, len]), unlink(path), utimes(path, atime, mtime), watch(filename[, options]), writeFile(file, data[, options]), constants
3. Callback API
   - Methods mirror promise APIs with an extra callback parameter for error handling.
4. Synchronous API
   - Methods mirror asynchronous counterparts with Sync suffix (e.g., openSync, readFileSync).

Each method includes exact parameter types, default values (e.g., encoding defaults to 'utf8', mode defaults to 0o666 for new files), and return types (typically Promise for asynchronous methods and direct values for synchronous methods). Code examples include promise-based, callback-based, and synchronous patterns with try/catch error handling.

## Supplementary Details
Detailed Technical Specifications:
- FileHandle Methods:
  - appendFile: data (string | Buffer | TypedArray | DataView | AsyncIterable | Iterable | Stream), options ({ encoding: string | null = 'utf8', signal: AbortSignal = undefined }). Returns Promise<void>.
  - chmod: mode (integer). Returns Promise<void>.
  - chown: uid (integer), gid (integer). Returns Promise<void>.
  - close: No parameters. Returns Promise<void>.
  - createReadStream: options ({ encoding: string = null, autoClose: boolean = true, emitClose: boolean = true, start: integer, end: integer = Infinity, highWaterMark: integer = 64*1024, signal: AbortSignal = undefined }). Returns fs.ReadStream.
  - createWriteStream: options ({ encoding: string = 'utf8', autoClose: boolean = true, emitClose: boolean = true, start: integer, highWaterMark: number = 16384, flush: boolean = false }). Returns fs.WriteStream.
  - read: Supports two overloads. One with (buffer, offset, length, position) and one with options object. Returns Promise<{ bytesRead: number, buffer: Buffer }>.
  - write: Two overloads for Buffer and string inputs. Returns Promise<{ bytesWritten: number, buffer: Buffer|string }>.
  - Other methods follow similar patterns with explicit parameter types and default values.
- fsPromises API:
  - access: path (string|Buffer|URL), mode (integer, default fs.constants.F_OK). Returns Promise<void>.
  - appendFile: path, data, options ({ encoding, mode = 0o666, flag = 'a', flush = false }). Returns Promise<void>.
  - copyFile: src, dest, mode (integer, default 0). Flags available: COPYFILE_EXCL, COPYFILE_FICLONE, COPYFILE_FICLONE_FORCE.
  - Additional methods include asynchronous file operations with identical parameter details to their callback/sync counterparts.
- Best Practices:
  - Always close FileHandle using close method.
  - Use try/catch around await calls.
  - Avoid race conditions by handling file access errors rather than pre-checking file accessibility.
  - For performance critical operations, consider callback APIs.

Implementation Steps:
1. Import required module (e.g., import { open } from 'node:fs/promises').
2. Open file using fsPromises.open(path, flags).
3. Perform desired file operations (read, write, etc.) with proper options.
4. Close file using filehandle.close() in finally block.

Troubleshooting Procedures:
- Use try/catch to capture error messages.
- Verify file permissions using fsPromises.access with constants.R_OK | constants.W_OK.
- Confirm file descriptor closure to avoid memory leaks.
- Example command: node -e "(async()=>{ try { let fd=await open('file.txt','r+'); await fd.close(); } catch(e){ console.error(e); } })()"

## Reference Details
API Specifications:
FileHandle.appendFile(data, [options]):
  - data: string | Buffer | TypedArray | DataView | AsyncIterable | Iterable | Stream
  - options: { encoding?: string|null = 'utf8', signal?: AbortSignal = undefined }
  - Returns: Promise<void>

FileHandle.chmod(mode: number): Promise<void>

FileHandle.chown(uid: number, gid: number): Promise<void>

FileHandle.close(): Promise<void>

FileHandle.createReadStream([options]):
  - options: { encoding?: string = null, autoClose?: boolean = true, emitClose?: boolean = true, start?: number, end?: number = Infinity, highWaterMark?: number = 65536, signal?: AbortSignal = undefined }
  - Returns: fs.ReadStream

FileHandle.createWriteStream([options]):
  - options: { encoding?: string = 'utf8', autoClose?: boolean = true, emitClose?: boolean = true, start?: number, highWaterMark?: number = 16384, flush?: boolean = false }
  - Returns: fs.WriteStream

FileHandle.read(buffer: Buffer, offset: number, length: number, position: number | bigint | null): Promise<{ bytesRead: number, buffer: Buffer }>

FileHandle.write(buffer: Buffer, offset?: number, length?: number, position?: number | null): Promise<{ bytesWritten: number, buffer: Buffer }>

FileHandle.write(string: string, position?: number | null, encoding?: string): Promise<{ bytesWritten: number, buffer: string }>

fsPromises.access(path: string | Buffer | URL, mode?: number = fs.constants.F_OK): Promise<void>

fsPromises.appendFile(path: string | Buffer | URL, data: string | Buffer, options?: { encoding?: string|null, mode?: number = 0o666, flag?: string = 'a', flush?: boolean = false } | string): Promise<void>

fsPromises.copyFile(src: string | Buffer | URL, dest: string | Buffer | URL, mode?: number = 0): Promise<void>

Full SDK usage examples:
// Promise-based usage
import { open, unlink } from 'node:fs/promises';

(async function() {
  let filehandle;
  try {
    filehandle = await open('sample.txt', 'r+');
    const { bytesRead, buffer } = await filehandle.read(Buffer.alloc(1024), 0, 1024, null);
    console.log(`Read ${bytesRead} bytes`);
    await filehandle.write('New content', null, 'utf8');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    if (filehandle) await filehandle.close();
  }
})();

// Callback-based usage
const fs = require('node:fs');
fs.unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('File deleted');
});

// Synchronous usage
const { unlinkSync } = require('node:fs');
try {
  unlinkSync('/tmp/hello');
  console.log('File deleted');
} catch (err) {
  console.error(err);
}

Troubleshooting:
- For permission errors, run: node -e "(async()=>{ try { await require('node:fs/promises').access('file.txt', require('node:fs').constants.R_OK | require('node:fs').constants.W_OK); console.log('Accessible'); } catch(e){ console.error(e); } })()"

## Information Dense Extract
NODE_FS; FileHandle: appendFile(data, [options]) Promise<void>; chmod(mode: number) Promise<void>; chown(uid: number, gid: number) Promise<void>; close() Promise<void>; createReadStream([options]) returns fs.ReadStream with options { encoding: null, autoClose: true, emitClose: true, start, end: Infinity, highWaterMark: 65536, signal }; createWriteStream([options]) returns fs.WriteStream with options { encoding: 'utf8', autoClose: true, emitClose: true, start, highWaterMark: 16384, flush: false }; read(buffer, offset, length, position): Promise<{bytesRead, buffer}>; write(buffer, offset, length, position): Promise<{bytesWritten, buffer}>; write(string, position, encoding): Promise<{bytesWritten, buffer}>; fsPromises API: access(path, mode=F_OK) Promise<void>, appendFile(path, data, options), copyFile(src, dest, mode=0) with flags COPYFILE_EXCL, COPYFILE_FICLONE, etc.; Callback and Sync APIs mirror these with callback and Sync suffix; Best practices: explicit close, try/catch handling, proper option defaults; Code examples provided for promise, callback, sync usage; Troubleshooting via fsPromises.access with R_OK|W_OK; Command usage examples provided.

## Sanitised Extract
Table of Contents:
1. FileHandle Class
   - Methods: appendFile(data[, options]), chmod(mode), chown(uid, gid), close(), createReadStream([options]), createWriteStream([options]), datasync(), read(buffer, offset, length, position), read([options]), readFile(options), readLines([options]), readv(buffers[, position]), stat([options]), sync(), truncate(len), utimes(atime, mtime), write(buffer, offset[, length[, position]]), write(buffer[, options]), write(string[, position[, encoding]]), writeFile(data, options), writev(buffers[, position]), [Symbol.asyncDispose]()
2. fsPromises API
   - Methods: access(path[, mode]), appendFile(path, data[, options]), chmod(path, mode), chown(path, uid, gid), copyFile(src, dest[, mode]), cp(src, dest[, options]), glob(pattern[, options]), lchmod(path, mode), lchown(path, uid, gid), lutimes(path, atime, mtime), link(existingPath, newPath), lstat(path[, options]), mkdir(path[, options]), mkdtemp(prefix[, options]), open(path, flags[, mode]), opendir(path[, options]), readdir(path[, options]), readFile(path[, options]), readlink(path[, options]), realpath(path[, options]), rename(oldPath, newPath), rmdir(path[, options]), rm(path[, options]), stat(path[, options]), statfs(path[, options]), symlink(target, path[, type]), truncate(path[, len]), unlink(path), utimes(path, atime, mtime), watch(filename[, options]), writeFile(file, data[, options]), constants
3. Callback API
   - Methods mirror promise APIs with an extra callback parameter for error handling.
4. Synchronous API
   - Methods mirror asynchronous counterparts with Sync suffix (e.g., openSync, readFileSync).

Each method includes exact parameter types, default values (e.g., encoding defaults to 'utf8', mode defaults to 0o666 for new files), and return types (typically Promise for asynchronous methods and direct values for synchronous methods). Code examples include promise-based, callback-based, and synchronous patterns with try/catch error handling.

## Original Source
Node.js File System Documentation
https://nodejs.org/api/fs.html

## Digest of NODE_FS

# Node.js File System Documentation
Retrieved: 2023-10-27

# Table of Contents
1. FileHandle Class
2. fsPromises API
3. Callback API
4. Synchronous API
5. Common Objects
6. Code Examples
7. Configuration & Best Practices
8. Troubleshooting

# 1. FileHandle Class
- filehandle.appendFile(data[, options])
  - Parameters:
    - data: string | Buffer | TypedArray | DataView | AsyncIterable | Iterable | Stream
    - options: Object | string, where options may include:
      - encoding: string | null (Default: 'utf8')
      - signal: AbortSignal | undefined (Default: undefined)
  - Returns: Promise that fulfills with undefined
  - Alias: filehandle.writeFile()

- filehandle.chmod(mode)
  - Parameters:
    - mode: integer (file mode bit mask)
  - Returns: Promise that fulfills with undefined

- filehandle.chown(uid, gid)
  - Parameters:
    - uid: integer (new owner user id)
    - gid: integer (new group id)
  - Returns: Promise that fulfills with undefined

- filehandle.close()
  - Returns: Promise that fulfills with undefined

- filehandle.createReadStream([options])
  - Options:
    - encoding: string (Default: null)
    - autoClose: boolean (Default: true)
    - emitClose: boolean (Default: true)
    - start: integer
    - end: integer (Default: Infinity)
    - highWaterMark: integer (Default: 64*1024)
    - signal: AbortSignal | undefined (Default: undefined)
  - Returns: fs.ReadStream

- filehandle.createWriteStream([options])
  - Options:
    - encoding: string (Default: 'utf8')
    - autoClose: boolean (Default: true)
    - emitClose: boolean (Default: true)
    - start: integer
    - highWaterMark: number (Default: 16384)
    - flush: boolean (Default: false)
  - Returns: fs.WriteStream

- filehandle.datasync()
  - Returns: Promise that fulfills with undefined

- filehandle.read(buffer, offset, length, position)
  - Parameters:
    - buffer: Buffer | TypedArray | DataView
    - offset: integer (Default: 0)
    - length: integer (Default: buffer.byteLength - offset)
    - position: integer | bigint | null (if null or -1, read from current position)
  - Returns: Promise that fulfills with { bytesRead: integer, buffer: Buffer }

- filehandle.read([options])
  - Options: { buffer: Buffer (Default: Buffer.alloc(16384)), offset: integer (Default: 0), length: integer, position: integer | bigint | null (Default: null) }
  - Returns: Promise that fulfills with { bytesRead: integer, buffer: Buffer }

- filehandle.readFile(options)
  - Options: Object | string
    - encoding: string | null (Default: null)
    - signal: AbortSignal
  - Returns: Promise that fulfills with file contents (Buffer if no encoding, string if encoding provided)

- filehandle.readLines([options])
  - Options: { encoding: string (Default: null), autoClose: boolean (Default: true), emitClose: boolean (Default: true), start: integer, end: integer (Default: Infinity), highWaterMark: integer (Default: 64*1024) }
  - Returns: readline.Interface for iterating lines

- filehandle.readv(buffers[, position])
  - Parameters:
    - buffers: Array of Buffers / TypedArrays / DataViews
    - position: integer | null (Default: null)
  - Returns: Promise that fulfills with { bytesRead: integer, buffers: Array }

- filehandle.stat([options])
  - Options: { bigint: boolean (Default: false) }
  - Returns: Promise that fulfills with fs.Stats

- filehandle.sync()
  - Returns: Promise that fulfills with undefined

- filehandle.truncate(len)
  - Parameters: len (integer, Default 0; if negative, treated as 0)
  - Returns: Promise that fulfills with undefined

- filehandle.utimes(atime, mtime)
  - Parameters:
    - atime: number | string | Date
    - mtime: number | string | Date
  - Returns: Promise that fulfills with undefined

- filehandle.write(buffer, offset[, length[, position]])
  - Parameters:
    - buffer: Buffer | TypedArray | DataView
    - offset: integer (start position in buffer)
    - length: integer (Default: buffer.byteLength - offset)
    - position: integer | null (Default: null)
  - Returns: Promise that fulfills with { bytesWritten: integer, buffer: Buffer }

- filehandle.write(buffer[, options])
  - Parameters:
    - buffer: Buffer | TypedArray | DataView
    - options: { offset: integer (Default: 0), length: integer (Default: buffer.byteLength - offset), position: integer (Default: null) }
  - Returns: Promise that fulfills with { bytesWritten: integer, buffer: Buffer }

- filehandle.write(string[, position[, encoding]])
  - Parameters:
    - string: string
    - position: integer | null (Default: null)
    - encoding: string (Default: 'utf8')
  - Returns: Promise that fulfills with { bytesWritten: integer, buffer: string }

- filehandle.writeFile(data, options)
  - Parameters:
    - data: string | Buffer | TypedArray | DataView | AsyncIterable | Iterable | Stream
    - options: Object | string, where if string, then it specifies encoding (Default: 'utf8')
      - signal: AbortSignal (Default: undefined)
  - Returns: Promise that fulfills with undefined

- filehandle.writev(buffers[, position])
  - Parameters:
    - buffers: Array of Buffers / TypedArrays / DataViews
    - position: integer | null (Default: null)
  - Returns: Promise that fulfills with { bytesWritten: integer, buffers: Array }

- filehandle[Symbol.asyncDispose]()
  - Alias for filehandle.close(), added in v20.4.0 / v18.18.0

# 2. fsPromises API (Promise Based)
Example method signatures:

- fsPromises.access(path[, mode])
  - Parameters:
    - path: string | Buffer | URL
    - mode: integer (Default: fs.constants.F_OK)
  - Returns: Promise that fulfills with undefined on success

- fsPromises.appendFile(path, data[, options])
  - Parameters:
    - path: string | Buffer | URL | FileHandle
    - data: string | Buffer
    - options: Object | string
      - encoding: string | null (Default: 'utf8')
      - mode: integer (Default: 0o666)
      - flag: string (Default: 'a')
      - flush: boolean (Default: false)
  - Returns: Promise that fulfills with undefined

- fsPromises.chmod(path, mode)
  - Parameters:
    - path: string | Buffer | URL
    - mode: string | integer
  - Returns: Promise that fulfills with undefined

- fsPromises.copyFile(src, dest[, mode])
  - Parameters:
    - src: string | Buffer | URL
    - dest: string | Buffer | URL
    - mode: integer (Default: 0)
      - Supports: fs.constants.COPYFILE_EXCL, fs.constants.COPYFILE_FICLONE, fs.constants.COPYFILE_FICLONE_FORCE
  - Returns: Promise that fulfills with undefined

... (Additional methods such as cp, glob, lchmod, lchown, lutimes, link, lstat, mkdir, mkdtemp, open, opendir, readdir, readFile, readlink, realpath, rename, rmdir, rm, stat, statfs, symlink, truncate, unlink, utimes, watch, writeFile, and constants are defined similarly with full parameter and return type details.)

# 3. Callback API
Example signatures:

- fs.access(path[, mode], callback)
- fs.appendFile(path, data[, options], callback)
- fs.chmod(path, mode, callback)
- fs.chown(path, uid, gid, callback)
- fs.close(fd[, callback])

Each callback receives (err, ...) with the first argument reserved for exceptions.

# 4. Synchronous API
Example signatures:

- fs.accessSync(path[, mode])
- fs.appendFileSync(path, data[, options])
- fs.chmodSync(path, mode)
- fs.chownSync(path, uid, gid)
- fs.closeSync(fd)
- fs.copyFileSync(src, dest[, mode])
- fs.openSync(path[, flags[, mode]])
- fs.readFileSync(path[, options])
... and others matching asynchronous counterparts.

# 5. Common Objects
Classes such as fs.Dir, fs.Dirent, fs.FSWatcher, fs.StatWatcher, fs.ReadStream, fs.Stats, fs.StatFs, fs.WriteStream with full method details and event definitions (e.g. 'close', 'open', 'error') are provided.

# 6. Code Examples

// Promise example
import { unlink } from 'node:fs/promises';

try {
  await unlink('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (error) {
  console.error('error:', error.message);
}

// Callback example
import { unlink } from 'node:fs';

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});

// Synchronous example
import { unlinkSync } from 'node:fs';

try {
  unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle error
}

# 7. Configuration & Best Practices
- Use promise-based APIs for modern asynchronous control; callback versions offer performance benefits but require careful error handling.
- Always explicitly close FileHandle objects using filehandle.close() to avoid memory leaks.
- When using streams, set autoClose to true (default) to ensure resources are freed on error/end.
- For file copying, consider the mode flags (e.g., COPYFILE_EXCL) to prevent accidental overwrites.

# 8. Troubleshooting
- For permission errors, use fsPromises.access with constants (R_OK, W_OK, X_OK).
- In concurrent file modifications, verify proper synchronization to avoid data corruption.
- Utilize try/catch blocks around await calls to capture and log error messages.
- Check file descriptor leaks by ensuring every open FileHandle is closed properly.

# Attribution & Data Metrics
- Source URL: https://nodejs.org/api/fs.html
- Data Size: 4180337 bytes
- Links Found: 4648


## Attribution
- Source: Node.js File System Documentation
- URL: https://nodejs.org/api/fs.html
- License: MIT License
- Crawl Date: 2025-04-26T18:49:19.326Z
- Data Size: 4180337 bytes
- Links Found: 4648

## Retrieved
2025-04-26
