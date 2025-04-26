# FS_MODULE

## Crawl Summary
Import APIs via require('node:fs') or 'node:fs/promises'. fsPromises.open(path, flags[, mode]) returns Promise<FileHandle>. FileHandle methods include appendFile(data, options), read(buffer, offset, length, position), write(buffer, options), createReadStream, createWriteStream, readFile, stat, chmod, chown, close, datasync, sync, truncate, utimes, readLines, readv, writev. fsPromises provides access, appendFile, chmod, chown, copyFile, cp, glob, mkdir, mkdtemp, readdir, open, opendir, readFile, readlink, realpath, rename, rmdir, rm, stat, statfs, symlink, truncate, unlink, utimes, watch, writeFile and constants. Callback API and Sync API mirror methods with callback or synchronous return. Key flags: open flags (r, r+, w, a), modes (0o666), default encoding utf8, highWaterMark values, AbortSignal support.

## Normalised Extract
Table of Contents
1. Usage
2. FileHandle
3. fsPromises Methods
4. Callback API
5. Sync API
6. Objects & Constants

1. Usage
Import Promises API: import * as fs from 'node:fs/promises'
Import Callback/Sync API: import * as fs from 'node:fs'

2. FileHandle
open(path:string,flags:string,mode?:integer=0o666) -> Promise<FileHandle>

FileHandle:
- fd:number
- appendFile(data,options):Promise<void>  data:(string|Buffer|TypedArray|AsyncIterable|Stream)  options:{encoding:string|null='utf8',mode:integer,flag:string,signal:AbortSignal}
- chmod(mode:integer):Promise<void>
- chown(uid:integer,gid:integer):Promise<void>
- close():Promise<void>
- createReadStream(options):ReadStream  options:{encoding:string|null,autoClose:boolean=true,emitClose:boolean=true,start:integer,end:integer=Infinity,highWaterMark:integer=64*1024,signal:AbortSignal}
- createWriteStream(options):WriteStream  options:{encoding:string='utf8',autoClose:boolean=true,emitClose:boolean=true,start:integer,highWaterMark:number=16384,flush:boolean=false}
- read(buffer:Buffer,offset:integer=0,length:integer=buffer.length-offset,position:integer|bigint|null=null):Promise<{bytesRead:integer,buffer}>
- read(options:{buffer:Buffer,offset:integer=0,length:integer=buffer.length-offset,position:integer|bigint|null=null}):Promise<{bytesRead,buffer}>
- write(buffer:Buffer,offset?:integer,length?:integer,position?:integer|null):Promise<{bytesWritten:integer,buffer}>
- write(string:string,position?:integer|null,encoding?:string='utf8'):Promise<{bytesWritten:integer,buffer:string}>
- writeFile(data,options):Promise<void>
- datasync():Promise<void>
- sync():Promise<void>
- truncate(len:integer=0):Promise<void>
- utimes(atime:number|string|Date,mtime:number|string|Date):Promise<void>
- stat(options?:{bigint?:boolean}):Promise<Stats>
- readFile(options?:string|{encoding?:string|null,signal?:AbortSignal}):Promise<Buffer|string>
- readableWebStream():ReadableStream
- readLines(options?:{encoding?:string|null,autoClose?:boolean=true,emitClose?:boolean=true,start?:integer,end?:integer=Infinity,highWaterMark?:integer=64*1024}):readline.Interface
- readv(buffers:Array<Buffer>,position?:integer|null):Promise<{bytesRead:integer,buffers}>
- writev(buffers:Array<Buffer>,position?:integer|null):Promise<{bytesWritten:integer,buffers}>
- [Symbol.asyncDispose]():Promise<void>

3. fsPromises Methods (path-based)
- access(path,mode?:integer=F_OK):Promise<void>
- appendFile(path,data,options?:string|{encoding?:string|null,mode?:integer=0o666,flag?:string='a',flush?:boolean=false}):Promise<void>
- chmod(path,mode:integer|string):Promise<void>
- chown(path,uid:integer,gid:integer):Promise<void>
- copyFile(src,dest,mode?:integer=0):Promise<void>
- cp(src,dest,options?:{dereference?:boolean=false,filter?:Function,errorOnExist?:boolean=false,force?:boolean=true,mode?:integer,preserveTimestamps?:boolean=false,recursive?:boolean=false,verbatimSymlinks?:boolean=false}):Promise<void>
- mkdir(path,options?:{recursive?:boolean,mode?:integer}):Promise<string|void>
- mkdtemp(prefix,options?:{encoding?:string}):Promise<string>
- open(path,flags,mode?:integer):Promise<FileHandle>
- opendir(path,options?:{encoding?:string}):Promise<Dir>
- readdir(path,options?:{encoding?:string,withFileTypes?:boolean}):Promise<string[]|Dirent[]>
- readFile(path,options?:string|{encoding?:string|null,flag?:string,signal?:AbortSignal}):Promise<Buffer|string>
- readlink(path,options?:string|{encoding?:string}):Promise<string>
- realpath(path,options?:string|{encoding?:string}):Promise<string>
- rename(oldPath,newPath):Promise<void>
- rmdir(path,options?:{recursive?:boolean,maxRetries?:integer,retryDelay?:integer}):Promise<void>
- rm(path,options?:{force?:boolean,recursive?:boolean,maxRetries?:integer,retryDelay?:integer}):Promise<void>
- stat(path,options?:{bigint?:boolean}):Promise<Stats>
- statfs(path,options?:{}):Promise<StatFs>
- symlink(target,path,type?:string):Promise<void>
- truncate(path,len?:integer=0):Promise<void>
- unlink(path):Promise<void>
- utimes(path,atime:number|string|Date,mtime:number|string|Date):Promise<void>
- watch(filename,options?:{encoding?:string,recursive?:boolean,persistent?:boolean,signal?:AbortSignal},listener?):FSWatcher
- writeFile(file,data,options?:string|{encoding?:string|null,mode?:integer=0o666,flag?:string='w',signal?:AbortSignal}):Promise<void>
- constants:object

4. Callback API
Mirror of fsPromises with callback(err,result).

5. Sync API
Mirror of callback API without callback, returns result or throws Error.

6. Objects & Constants
- Dir, Dirent, FSWatcher, StatWatcher, ReadStream, WriteStream, Stats, StatFs, fs.constants


## Supplementary Details
File Open Flags:
- 'r'  Open file for reading. An exception occurs if the file does not exist.
- 'r+' Open file for reading and writing. An exception occurs if the file does not exist.
- 'rs+' Open file for reading and writing in synchronous mode.
- 'w'  Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
- 'wx' Like 'w' but fails if the path exists.
- 'w+' Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
- 'wx+' Like 'w+' but fails if the path exists.
- 'a'  Open file for appending. The file is created if it does not exist.
- 'ax' Like 'a' but fails if the path exists.
- 'a+' Open file for reading and appending. The file is created if it does not exist.
- 'ax+' Like 'a+' but fails if the path exists.

Permission Modes:
- 0o666 default mode for new files (read/write for owner, group, others).
- Use fs.constants.S_IRUSR, S_IWUSR, etc. for explicit bits.

AbortSignal Support:
- For readFile, writeFile, appendFile: pass {signal} to abort operations.

Default HighWaterMark:
- ReadStream: 64*1024 bytes
- WriteStream: 16*1024 bytes

Recommended Patterns:
- Always explicitly close FileHandle using try/finally:
  const file = await fs.open('file.txt','r');
  try { /* operations */ } finally { await file.close(); }

- Avoid fsPromises.access before open to prevent race conditions.

- For streaming large files, prefer createReadStream with backpressure.

## Reference Details
Full API Signatures and Examples

<!-- fsPromises.open -->
import { open } from 'node:fs/promises';
/**
 * open(path, flags[, mode]) -> Promise<FileHandle>
 * @param path string|Buffer|URL
 * @param flags string
 * @param mode integer Default=0o666
 * @returns Promise<FileHandle>
 */
const filehandle = await open('input.txt','r+');
await filehandle.close();

<!-- fsPromises.readFile -->
import { readFile } from 'node:fs/promises';
/**
 * readFile(path[, options]) -> Promise<Buffer|string>
 * @param path string|Buffer|URL|FileHandle
 * @param options string|{encoding?:string|null,flag?:string,signal?:AbortSignal}
 * @returns Promise<Buffer|string>
 */
const data = await readFile('input.txt',{encoding:'utf8',flag:'r',signal});

<!-- fsPromises.writeFile -->
import { writeFile } from 'node:fs/promises';
/**
 * writeFile(file,data[, options]) -> Promise<void>
 * @param file string|Buffer|URL|FileHandle
 * @param data string|Buffer|TypedArray|DataView|AsyncIterable|Iterable|Stream
 * @param options string|{encoding?:string|null,mode?:integer,flag?:string,signal?:AbortSignal}
 */
await writeFile('output.txt','Hello World',{mode:0o644,flag:'w',signal});

<!-- fsPromises.copyFile -->
import { copyFile,constants } from 'node:fs/promises';
/**
 * copyFile(src,dest[, mode]) -> Promise<void>
 * @param src string|Buffer|URL
 * @param dest string|Buffer|URL
 * @param mode integer mask of COPYFILE_* flags
 */
await copyFile('a.txt','b.txt',constants.COPYFILE_EXCL);

<!-- createReadStream example -->
import { open } from 'node:fs/promises';
const fd = await open('large.bin','r');
const stream = fd.createReadStream({start:0,end:1023,highWaterMark:65536});
stream.on('data',chunk=>console.log(chunk.length));
stream.on('end',()=>fd.close());

<!-- createWriteStream example -->
import { open } from 'node:fs/promises';
const fd2 = await open('log.txt','a');
const writeStream = fd2.createWriteStream({encoding:'utf8',start:null,flush:true});
writeStream.write('Entry 1');
writeStream.end();
writeStream.on('finish',()=>fd2.close());


## Information Dense Extract
fsPromises.open(path:string,flags:string,mode:integer=0o666)->Promise<FileHandle>; FileHandle methods: appendFile(data,options)->Promise<void>; read(buffer,offset=0,length=buffer.length-offset,position=null)->Promise<{bytesRead,buffer}>; read({buffer,offset=0,length,position=null})->Promise<{bytesRead,buffer}>; write(buffer,offset?,length?,position?)->Promise<{bytesWritten,buffer}>; write(string,position?,encoding='utf8')->Promise<{bytesWritten,buffer}>; writeFile(data,options)->Promise<void>; createReadStream({encoding=null,autoClose=true,emitClose=true,start?,end=Infinity,highWaterMark=64*1024,signal?})->ReadStream; createWriteStream({encoding='utf8',autoClose=true,emitClose=true,start?,highWaterMark=16384,flush=false})->WriteStream; stat({bigint=false})->Promise<Stats>; chmod(mode:integer)->Promise<void>; chown(uid:integer,gid:integer)->Promise<void>; close()->Promise<void>; datasync()->Promise<void>; sync()->Promise<void>; truncate(len=0)->Promise<void>; utimes(atime,mtime)->Promise<void>; readableWebStream()->ReadableStream; readLines({encoding=null,autoClose=true,emitClose=true,start?,end=Infinity,highWaterMark=64*1024})->readline.Interface; readv(buffers,position=null)->Promise<{bytesRead,buffers}>; writev(buffers,position=null)->Promise<{bytesWritten,buffers}>; [Symbol.asyncDispose]()->Promise<void>. fsPromises: access(path,mode=F_OK)->Promise<void>; appendFile(path,data,{encoding='utf8',mode=0o666,flag='a',flush=false})->Promise<void>; chmod(path,mode)->Promise<void>; chown(path,uid,gid)->Promise<void>; copyFile(src,dest,mode=0)->Promise<void>; cp(src,dest,{dereference=false,filter?,errorOnExist=false,force=true,mode=0,preserveTimestamps=false,recursive=false,verbatimSymlinks=false})->Promise<void>; glob(pattern,{cwd,exclude?,withFileTypes=false})->AsyncIterator<string|Dirent>; mkdir(path,{recursive?,mode?})->Promise<string|void>; mkdtemp(prefix,{encoding?})->Promise<string>; readdir(path,{encoding?,withFileTypes=false})->Promise<string[]|Dirent[]>; readFile(path,{encoding=null,flag?,signal?})->Promise<Buffer|string>; readlink(path,{encoding?})->Promise<string>; realpath(path,{encoding?})->Promise<string>; rename(oldPath,newPath)->Promise<void>; rmdir(path,{recursive=false,maxRetries?,retryDelay?})->Promise<void>; rm(path,{force=false,recursive=false,maxRetries?,retryDelay?})->Promise<void>; stat(path,{bigint=false})->Promise<Stats>; statfs(path)->Promise<StatFs>; symlink(target,path,type?)->Promise<void>; truncate(path,len=0)->Promise<void>; unlink(path)->Promise<void>; utimes(path,atime,mtime)->Promise<void>; watch(filename,{encoding?,persistent?,recursive?,signal?},listener?)->FSWatcher; writeFile(file,data,{encoding='utf8',mode=0o666,flag='w',signal?})->Promise<void>; constants:object.

## Sanitised Extract
Table of Contents
1. Usage
2. FileHandle
3. fsPromises Methods
4. Callback API
5. Sync API
6. Objects & Constants

1. Usage
Import Promises API: import * as fs from 'node:fs/promises'
Import Callback/Sync API: import * as fs from 'node:fs'

2. FileHandle
open(path:string,flags:string,mode?:integer=0o666) -> Promise<FileHandle>

FileHandle:
- fd:number
- appendFile(data,options):Promise<void>  data:(string|Buffer|TypedArray|AsyncIterable|Stream)  options:{encoding:string|null='utf8',mode:integer,flag:string,signal:AbortSignal}
- chmod(mode:integer):Promise<void>
- chown(uid:integer,gid:integer):Promise<void>
- close():Promise<void>
- createReadStream(options):ReadStream  options:{encoding:string|null,autoClose:boolean=true,emitClose:boolean=true,start:integer,end:integer=Infinity,highWaterMark:integer=64*1024,signal:AbortSignal}
- createWriteStream(options):WriteStream  options:{encoding:string='utf8',autoClose:boolean=true,emitClose:boolean=true,start:integer,highWaterMark:number=16384,flush:boolean=false}
- read(buffer:Buffer,offset:integer=0,length:integer=buffer.length-offset,position:integer|bigint|null=null):Promise<{bytesRead:integer,buffer}>
- read(options:{buffer:Buffer,offset:integer=0,length:integer=buffer.length-offset,position:integer|bigint|null=null}):Promise<{bytesRead,buffer}>
- write(buffer:Buffer,offset?:integer,length?:integer,position?:integer|null):Promise<{bytesWritten:integer,buffer}>
- write(string:string,position?:integer|null,encoding?:string='utf8'):Promise<{bytesWritten:integer,buffer:string}>
- writeFile(data,options):Promise<void>
- datasync():Promise<void>
- sync():Promise<void>
- truncate(len:integer=0):Promise<void>
- utimes(atime:number|string|Date,mtime:number|string|Date):Promise<void>
- stat(options?:{bigint?:boolean}):Promise<Stats>
- readFile(options?:string|{encoding?:string|null,signal?:AbortSignal}):Promise<Buffer|string>
- readableWebStream():ReadableStream
- readLines(options?:{encoding?:string|null,autoClose?:boolean=true,emitClose?:boolean=true,start?:integer,end?:integer=Infinity,highWaterMark?:integer=64*1024}):readline.Interface
- readv(buffers:Array<Buffer>,position?:integer|null):Promise<{bytesRead:integer,buffers}>
- writev(buffers:Array<Buffer>,position?:integer|null):Promise<{bytesWritten:integer,buffers}>
- [Symbol.asyncDispose]():Promise<void>

3. fsPromises Methods (path-based)
- access(path,mode?:integer=F_OK):Promise<void>
- appendFile(path,data,options?:string|{encoding?:string|null,mode?:integer=0o666,flag?:string='a',flush?:boolean=false}):Promise<void>
- chmod(path,mode:integer|string):Promise<void>
- chown(path,uid:integer,gid:integer):Promise<void>
- copyFile(src,dest,mode?:integer=0):Promise<void>
- cp(src,dest,options?:{dereference?:boolean=false,filter?:Function,errorOnExist?:boolean=false,force?:boolean=true,mode?:integer,preserveTimestamps?:boolean=false,recursive?:boolean=false,verbatimSymlinks?:boolean=false}):Promise<void>
- mkdir(path,options?:{recursive?:boolean,mode?:integer}):Promise<string|void>
- mkdtemp(prefix,options?:{encoding?:string}):Promise<string>
- open(path,flags,mode?:integer):Promise<FileHandle>
- opendir(path,options?:{encoding?:string}):Promise<Dir>
- readdir(path,options?:{encoding?:string,withFileTypes?:boolean}):Promise<string[]|Dirent[]>
- readFile(path,options?:string|{encoding?:string|null,flag?:string,signal?:AbortSignal}):Promise<Buffer|string>
- readlink(path,options?:string|{encoding?:string}):Promise<string>
- realpath(path,options?:string|{encoding?:string}):Promise<string>
- rename(oldPath,newPath):Promise<void>
- rmdir(path,options?:{recursive?:boolean,maxRetries?:integer,retryDelay?:integer}):Promise<void>
- rm(path,options?:{force?:boolean,recursive?:boolean,maxRetries?:integer,retryDelay?:integer}):Promise<void>
- stat(path,options?:{bigint?:boolean}):Promise<Stats>
- statfs(path,options?:{}):Promise<StatFs>
- symlink(target,path,type?:string):Promise<void>
- truncate(path,len?:integer=0):Promise<void>
- unlink(path):Promise<void>
- utimes(path,atime:number|string|Date,mtime:number|string|Date):Promise<void>
- watch(filename,options?:{encoding?:string,recursive?:boolean,persistent?:boolean,signal?:AbortSignal},listener?):FSWatcher
- writeFile(file,data,options?:string|{encoding?:string|null,mode?:integer=0o666,flag?:string='w',signal?:AbortSignal}):Promise<void>
- constants:object

4. Callback API
Mirror of fsPromises with callback(err,result).

5. Sync API
Mirror of callback API without callback, returns result or throws Error.

6. Objects & Constants
- Dir, Dirent, FSWatcher, StatWatcher, ReadStream, WriteStream, Stats, StatFs, fs.constants

## Original Source
Node.js File System API
https://nodejs.org/api/fs.html

## Digest of FS_MODULE

# node:fs Module (Retrieved 2023-11-27)

## Usage

**Import Promises API**
```js
import * as fs from 'node:fs/promises';
const fs = require('node:fs/promises');
```

**Import Callback/Sync API**
```js
import * as fs from 'node:fs';
const fs = require('node:fs');
```

---

# API Specification

## 1. fsPromises.open(path, flags[, mode])
- path <string|Buffer|URL>
- flags <string>
- mode <integer> Default: 0o666
- Returns: Promise<FileHandle>

## 2. FileHandle Class
EventEmitter, created by fsPromises.open()

### Methods
- appendFile(data[, options]) → Promise<void>
  - data: string|Buffer|TypedArray|DataView|AsyncIterable|Iterable|Stream
  - options:
    - encoding <string|null> Default: 'utf8'
    - mode <integer>
    - flag <string>
    - signal <AbortSignal>

- chmod(mode) → Promise<void>
  - mode <integer>

- chown(uid, gid) → Promise<void>
  - uid <integer>
  - gid <integer>

- close() → Promise<void>

- createReadStream([options]) → fs.ReadStream
  - options:
    - encoding <string|null> Default: null
    - autoClose <boolean> Default: true
    - emitClose <boolean> Default: true
    - start <integer>
    - end <integer> Default: Infinity
    - highWaterMark <integer> Default: 64*1024
    - signal <AbortSignal>

- createWriteStream([options]) → fs.WriteStream
  - options:
    - encoding <string> Default: 'utf8'
    - autoClose <boolean> Default: true
    - emitClose <boolean> Default: true
    - start <integer>
    - highWaterMark <number> Default: 16384
    - flush <boolean> Default: false

- datasync() → Promise<void>

- fd <number>

- read(buffer, offset, length, position) → Promise<{bytesRead, buffer}>

- read([options]) → Promise<{bytesRead, buffer}>

- readableWebStream() → ReadableStream

- readFile(options) → Promise<Buffer|string>

- readLines([options]) → readline.Interface

- readv(buffers[, position]) → Promise<{bytesRead, buffers}>

- stat([options]) → Promise<fs.Stats>

- sync() → Promise<void>

- truncate(len) → Promise<void>

- utimes(atime, mtime) → Promise<void>

- write(buffer, offset[, length[, position]]) → Promise<{bytesWritten, buffer}>

- write(buffer[, options]) → Promise<{bytesWritten, buffer}>

- write(string[, position[, encoding]]) → Promise<{bytesWritten, buffer}>

- writeFile(data, options) → Promise<void>

- writev(buffers[, position]) → Promise<{bytesWritten, buffers}>

- [Symbol.asyncDispose]() → Promise<void>

## 3. fsPromises Methods

Signature: fsPromises.METHOD(path, ...args) → Promise<...>

List of key methods:
- access(path[, mode]) → Promise<void>
- appendFile(path, data[, options]) → Promise<void>
- chmod(path, mode) → Promise<void>
- chown(path, uid, gid) → Promise<void>
- copyFile(src, dest[, mode]) → Promise<void>
- cp(src, dest[, options]) → Promise<void>
- glob(pattern[, options]) → AsyncIterator<string>
- mkdir(path[, options]) → Promise<string|void>
- mkdtemp(prefix[, options]) → Promise<string>
- open(path, flags[, mode]) → Promise<FileHandle>
- opendir(path[, options]) → Promise<fs.Dir>
- readdir(path[, options]) → Promise<string[]|fs.Dirent[]>
- readFile(path[, options]) → Promise<Buffer|string>
- readlink(path[, options]) → Promise<string>
- realpath(path[, options]) → Promise<string>
- rename(oldPath, newPath) → Promise<void>
- rmdir(path[, options]) → Promise<void>
- rm(path[, options]) → Promise<void>
- stat(path[, options]) → Promise<fs.Stats>
- statfs(path[, options]) → Promise<fs.StatFs>
- symlink(target, path[, type]) → Promise<void>
- truncate(path[, len]) → Promise<void>
- unlink(path) → Promise<void>
- utimes(path, atime, mtime) → Promise<void>
- watch(filename[, options]) → fs.FSWatcher
- writeFile(file, data[, options]) → Promise<void>
- constants → Object of FS constants

## 4. Callback API

fs.METHOD(path[, ...], callback)
- access(path[, mode], callback)
- appendFile(path, data[, options], callback)
- chmod(path, mode, callback)
- chown(path, uid, gid, callback)
- close(fd[, callback])
- copyFile(src, dest[, mode], callback)
- cp(src, dest[, options], callback)
- createReadStream(path[, options]) → fs.ReadStream
- createWriteStream(path[, options]) → fs.WriteStream
- exists(path, callback)
- fchmod(fd, mode, callback)
- fchown(fd, uid, gid, callback)
- fdatasync(fd, callback)
- fstat(fd[, options], callback)
- fsync(fd, callback)
- ftruncate(fd[, len], callback)
- futimes(fd, atime, mtime, callback)
- glob(pattern[, options], callback)
- link(existingPath, newPath, callback)
- lstat(path[, options], callback)
- mkdir(path[, options], callback)
- mkdtemp(prefix[, options], callback)
- open(path[, flags[, mode]], callback)
- opendir(path[, options], callback)
- read(fd, buffer, offset, length, position, callback)
- readdir(path[, options], callback)
- readFile(path[, options], callback)
- readlink(path[, options], callback)
- realpath(path[, options], callback)
- rename(oldPath, newPath, callback)
- rmdir(path[, options], callback)
- rm(path[, options], callback)
- stat(path[, options], callback)
- statfs(path[, options], callback)
- symlink(target, path[, type], callback)
- truncate(path[, len], callback)
- unlink(path, callback)
- utimes(path, atime, mtime, callback)
- watch(filename[, options][, listener]) → fs.FSWatcher
- write(fd, buffer, offset[, length[, position]], callback)
- writeFile(file, data[, options], callback)
- writev(fd, buffers[, position], callback)

## 5. Synchronous API

fs.METHODSync(...)
Same as callback API without callback, returns result or throws.

## 6. Common Objects & Constants

- fs.Dir: close()/closeSync(), path, read()/readSync(), Symbol.asyncIterator
- fs.Dirent: isFile()/isDirectory()/..., name
- fs.FSWatcher: events: 'change','close','error'; methods: close(), ref(), unref()
- fs.StatWatcher: ref(), unref()
- fs.ReadStream/WriteStream: properties: bytesRead, bytesWritten, path; events: 'open','close','ready'; methods: close()
- fs.Stats: properties: size,inode,timestamps; methods: isFile(), isDirectory(), ...
- fs.StatFs: bavail,bfree,blocks,bsize,ffree,files,type
- fs.constants: file access, copy, open, type, mode constants


## Attribution
- Source: Node.js File System API
- URL: https://nodejs.org/api/fs.html
- License: License
- Crawl Date: 2025-04-26T16:50:22.656Z
- Data Size: 3287422 bytes
- Links Found: 901

## Retrieved
2025-04-26
