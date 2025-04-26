# HTTP_MODULE

## Crawl Summary
Agent configuration options with types and defaults for persistent connections; Agent methods for socket pooling; http.request and http.get signatures with options structure; ClientRequest methods for header manipulation, body streaming and lifecycle control; http.createServer signature and server management methods; Core message classes (IncomingMessage, ServerResponse) with their methods and properties; Utility functions validateHeaderName, validateHeaderValue, STATUS_CODES, METHODS.

## Normalised Extract
Table of Contents:
1. Agent Configuration
2. Agent Methods
3. HTTP Client API
4. HTTP Server API
5. Message Classes

1. Agent Configuration:
   keepAlive: boolean = false
   keepAliveMsecs: number = 1000
   maxSockets: number = Infinity
   maxTotalSockets: number = Infinity
   maxFreeSockets: number = 256
   scheduling: 'lifo' | 'fifo' = 'lifo'
   timeout: number (ms)

2. Agent Methods:
   createConnection(options: net.ConnectOpts, callback?: (err, socket) => void): stream.Duplex
   keepSocketAlive(socket: stream.Duplex): boolean
   reuseSocket(socket: stream.Duplex, request: http.ClientRequest): void
   destroy(): void
   freeSockets: Record<string, stream.Duplex[]>; sockets: Record<string, stream.Duplex[]>; requests: Record<string, http.ClientRequest[]>

3. HTTP Client API:
   request(options: HttpRequestOptions, callback?: (res: http.IncomingMessage) => void): http.ClientRequest
   get(options: HttpRequestOptions, callback?: (res: http.IncomingMessage) => void): http.ClientRequest
   HttpRequestOptions fields: protocol, host, hostname, port, method, path, headers, auth, agent, timeout, localAddress, family
   ClientRequest Methods: setHeader, getHeader, getHeaderNames, getHeaders, hasHeader, removeHeader, flushHeaders, write, end, destroy, setTimeout, setNoDelay, setSocketKeepAlive
   ClientRequest Events: response, socket, timeout, error, upgrade, connect, continue, information, finish

4. HTTP Server API:
   createServer(options?: { allowHalfOpen?: boolean }, listener?: (req, http.IncomingMessage, res: http.ServerResponse) => void): http.Server
   server Methods: listen, setTimeout, close, closeAllConnections, closeIdleConnections
   Server Events: request, connection, checkContinue, checkExpectation, upgrade, clientError, close, connect, dropRequest

5. Message Classes:
   IncomingMessage: headers, rawHeaders, method, url, httpVersion, statusCode, statusMessage, socket; setTimeout(ms, cb), destroy(error)
   ServerResponse: statusCode, statusMessage, headersSent, connection; setHeader, getHeader, removeHeader, writeHead, write, end, writeContinue, writeProcessing, addTrailers, flushHeaders, setTimeout, cork, uncork
   OutgoingMessage: base for both, similar methods minus status codes


## Supplementary Details
1. Raw header handling: rawHeaders retains original casing and order as [key, value, ...]. headers normalizes keys to lowercase.
2. Keep‐Alive pooling: pooled sockets unref() when idle; override keepSocketAlive to customize retention.
3. Custom Agent per request: pass {agent: false} to http.request to disable pooling.
4. Timeout handling: agent.timeout sets socket timeout; request.setTimeout sets per-request idle timeout; server.headersTimeout and server.requestTimeout control server-side timeouts.
5. Validation utilities: http.validateHeaderName(name) throws ERR_INVALID_HTTP_TOKEN; http.validateHeaderValue(name, value) throws ERR_INVALID_CHAR.


## Reference Details
// Agent API
interface AgentOptions {
  keepAlive?: boolean;          // default: false
  keepAliveMsecs?: number;      // default: 1000
  maxSockets?: number;          // default: Infinity
  maxTotalSockets?: number;     // default: Infinity
  maxFreeSockets?: number;      // default: 256
  scheduling?: 'fifo'|'lifo';   // default: 'lifo'
  timeout?: number;             // ms
}
class Agent {
  constructor(options?: AgentOptions)
  createConnection(options: net.ConnectOpts, callback?: (err: Error | null, socket: stream.Duplex) => void): stream.Duplex
  keepSocketAlive(socket: stream.Duplex): boolean
  reuseSocket(socket: stream.Duplex, request: http.ClientRequest): void
  destroy(): void
  freeSockets: Record<string, stream.Duplex[]>
  sockets: Record<string, stream.Duplex[]>
  requests: Record<string, http.ClientRequest[]>
  maxFreeSockets: number
  maxSockets: number
  maxTotalSockets: number
}

// Client API
interface RequestOptions {
  protocol?: string;
  host?: string;
  hostname?: string;
  port?: number|string;
  localAddress?: string;
  socketPath?: string;
  method?: string;
  path?: string;
  headers?: Record<string,string|number|string[]>;
  auth?: string;
  agent?: Agent|false;
  timeout?: number;
  family?: number;
}
function request(opts: RequestOptions, callback?: (res: http.IncomingMessage) => void): http.ClientRequest;
function get(opts: RequestOptions, callback?: (res: http.IncomingMessage) => void): http.ClientRequest;

class ClientRequest extends OutgoingMessage {
  abort(): void; // deprecated
  destroy(error?: Error): this;
  end(data?: string|Buffer|Uint8Array, encoding?: string, callback?: () => void): this;
  flushHeaders(): void;
  getHeader(name: string): number|string|string[]|undefined;
  getHeaderNames(): string[];
  getHeaders(): Record<string,string|string[]>;
  hasHeader(name: string): boolean;
  removeHeader(name: string): void;
  setHeader(name: string, value: number|string|string[]): void;
  setNoDelay(noDelay?: boolean): void;
  setSocketKeepAlive(enable?: boolean, initialDelay?: number): void;
  setTimeout(timeout: number, callback?: () => void): this;
  write(chunk: string|Buffer|Uint8Array, encoding?: string, callback?: () => void): boolean;
  socket: net.Socket;
  reusedSocket: boolean;
  aborted: boolean; // deprecated
}

// Server API
interface ServerOptions { allowHalfOpen?: boolean; }
function createServer(opts?: ServerOptions, listener?: (req: http.IncomingMessage, res: http.ServerResponse) => void): http.Server;
class Server extends net.Server {
  listen(port?: number, hostname?: string, backlog?: number, callback?: () => void): this;
  setTimeout(msecs?: number, callback?: () => void): this;
  close(callback?: (err?: Error) => void): this;
  closeAllConnections(): void;
  closeIdleConnections(): void;
  headersTimeout: number;
  requestTimeout: number;
  maxHeadersCount: number;
  keepAliveTimeout: number;
}

// Message Classes
class IncomingMessage extends stream.Readable {
  headers: Record<string,string>;
  rawHeaders: string[];
  httpVersion: string;
  method?: string;
  url?: string;
  statusCode?: number;
  statusMessage?: string;
  setTimeout(msecs: number, callback?: () => void): this;
  destroy(error?: Error): void;
}

class ServerResponse extends OutgoingMessage {
  statusCode: number;
  statusMessage: string;
  headersSent: boolean;
  writeHead(statusCode: number, statusMessage?: string, headers?: Record<string,string>): void;
  write(chunk: string|Buffer|Uint8Array, encoding?: string, callback?: () => void): boolean;
  addTrailers(headers: Record<string,string>): void;
  writeContinue(): void;
  writeProcessing(): void;
}

class OutgoingMessage extends stream.Writable {
  setHeader(name: string, value: string|string[]): void;
  getHeader(name: string): string|string[]|undefined;
  getHeaderNames(): string[];
  getHeaders(): Record<string,string|string[]>;
  hasHeader(name: string): boolean;
  removeHeader(name: string): void;
  write(chunk: any, encoding?: string, callback?: () => void): boolean;
  end(chunk?: any, encoding?: string, callback?: () => void): void;
}

// Utilities
const METHODS: string[];
const STATUS_CODES: Record<number,string>;
function validateHeaderName(name: string, label?: string): void;
function validateHeaderValue(name: string, value: string|string[]): void;
function setMaxIdleHTTPParsers(max: number): void;

// Best Practices & Troubleshooting
// 1. Destroy unused Agent to free OS resources:
const agent = new http.Agent({keepAlive: true});
// ...
agent.destroy();

// 2. Retry on ECONNRESET on reused socket:
function retriableRequest() {
  const req = http.get('http://localhost:3000', {agent}, res => {/*...*/});
  req.on('error', err => {
    if(req.reusedSocket && err.code==='ECONNRESET') retriableRequest();
  });
}

// 3. Enable HTTP debug logs:
// NODE_DEBUG=http node app.js
// Expected output: HTTP Parser headers, chunks, socket events

// 4. Increase maxHeaderCount:
server.maxHeadersCount = 0; // disable limit


## Information Dense Extract
Agent(options:keepAlive=false,keepAliveMsecs=1000,maxSockets=∞,maxTotalSockets=∞,maxFreeSockets=256,scheduling='lifo',timeout?):createConnection(opts,cb)->Duplex;keepSocketAlive(socket)->bool;reuseSocket(socket,req);destroy();properties:sockets,freeSockets,requests;
http.request(opts,cb)->ClientRequest;http.get->alias(req+end);
ClientRequest:setHeader(name,value);getHeader(name)->any;removeHeader(name);flushHeaders();write(chunk)->bool;end(data)->this;destroy(err?)->this;setTimeout(ms,cb)->this;setNoDelay(bool);setSocketKeepAlive(bool,delay);
Events:response,timeout,error,socket,upgrade,connect,continue,information,finish;
http.createServer(opts,listener)->Server;Server.listen(port,host,backlog,cb);setTimeout(ms,cb);close(cb);closeAllConnections();closeIdleConnections();props:headersTimeout,requestTimeout,maxHeadersCount,keepAliveTimeout;
ServerResponse:setHeader(name,val);getHeader(name)->any;removeHeader(name);writeHead(code[,msg],headers);write(chunk)->bool;end(data);writeContinue();writeProcessing();addTrailers(headers);flushHeaders();setTimeout(ms,cb);cork()/uncork();statusCode;statusMessage;headersSent;
IncomingMessage:headers:Obj;rawHeaders:string[];method,url,httpVersion,statusCode?,statusMessage?;setTimeout(ms,cb);destroy(err?);
validateHeaderName(name,label?)->void;validateHeaderValue(name,value)->void;
METH: string[];STATUS_CODES:Record<number,string>

## Sanitised Extract
Table of Contents:
1. Agent Configuration
2. Agent Methods
3. HTTP Client API
4. HTTP Server API
5. Message Classes

1. Agent Configuration:
   keepAlive: boolean = false
   keepAliveMsecs: number = 1000
   maxSockets: number = Infinity
   maxTotalSockets: number = Infinity
   maxFreeSockets: number = 256
   scheduling: 'lifo' | 'fifo' = 'lifo'
   timeout: number (ms)

2. Agent Methods:
   createConnection(options: net.ConnectOpts, callback?: (err, socket) => void): stream.Duplex
   keepSocketAlive(socket: stream.Duplex): boolean
   reuseSocket(socket: stream.Duplex, request: http.ClientRequest): void
   destroy(): void
   freeSockets: Record<string, stream.Duplex[]>; sockets: Record<string, stream.Duplex[]>; requests: Record<string, http.ClientRequest[]>

3. HTTP Client API:
   request(options: HttpRequestOptions, callback?: (res: http.IncomingMessage) => void): http.ClientRequest
   get(options: HttpRequestOptions, callback?: (res: http.IncomingMessage) => void): http.ClientRequest
   HttpRequestOptions fields: protocol, host, hostname, port, method, path, headers, auth, agent, timeout, localAddress, family
   ClientRequest Methods: setHeader, getHeader, getHeaderNames, getHeaders, hasHeader, removeHeader, flushHeaders, write, end, destroy, setTimeout, setNoDelay, setSocketKeepAlive
   ClientRequest Events: response, socket, timeout, error, upgrade, connect, continue, information, finish

4. HTTP Server API:
   createServer(options?: { allowHalfOpen?: boolean }, listener?: (req, http.IncomingMessage, res: http.ServerResponse) => void): http.Server
   server Methods: listen, setTimeout, close, closeAllConnections, closeIdleConnections
   Server Events: request, connection, checkContinue, checkExpectation, upgrade, clientError, close, connect, dropRequest

5. Message Classes:
   IncomingMessage: headers, rawHeaders, method, url, httpVersion, statusCode, statusMessage, socket; setTimeout(ms, cb), destroy(error)
   ServerResponse: statusCode, statusMessage, headersSent, connection; setHeader, getHeader, removeHeader, writeHead, write, end, writeContinue, writeProcessing, addTrailers, flushHeaders, setTimeout, cork, uncork
   OutgoingMessage: base for both, similar methods minus status codes

## Original Source
Node.js HTTP Module
https://nodejs.org/api/http.html

## Digest of HTTP_MODULE

# Node.js HTTP Module

**Stability**: 2 - Stable
**Retrieved on**: 2024-06-07

## Import

CommonJS: require('node:http')
ESM: import * as http from 'node:http'

## 1. Agent

### Signature
```js
new http.Agent([options])
```

### Options
| Name             | Type    | Default   | Description                                                                                       |
|------------------|---------|-----------|---------------------------------------------------------------------------------------------------|
| keepAlive        | boolean | false     | Enable TCP Keep-Alive on pooled sockets.                                                          |
| keepAliveMsecs   | number  | 1000      | Initial delay for TCP Keep-Alive when keepAlive=true.                                             |
| maxSockets       | number  | Infinity  | Max concurrent sockets per origin.                                                                |
| maxTotalSockets  | number  | Infinity  | Max concurrent sockets across all origins.                                                        |
| maxFreeSockets   | number  | 256       | Max idle sockets to keep per origin when keepAlive=true.                                          |
| scheduling       | string  | 'lifo'    | 'lifo' or 'fifo' scheduling for free sockets.                                                    |
| timeout          | number  | undefined | Socket timeout in ms. Sets socket.setTimeout() on new sockets.                                    |

### Methods
- agent.createConnection(options[, callback]) → stream.Duplex
- agent.keepSocketAlive(socket) → boolean
- agent.reuseSocket(socket, request) → void
- agent.destroy() → void
- Properties: agent.freeSockets, agent.sockets, agent.requests, agent.maxFreeSockets, agent.maxSockets, agent.maxTotalSockets


## 2. HTTP Client API

### http.request(options[, callback]) → http.ClientRequest
- options: { protocol?, host?, hostname?, port?, path?, method?, headers?, auth?, agent?, timeout?, localAddress?, family? }
- callback(res: http.IncomingMessage)

### http.get(options[, callback]) → http.ClientRequest  
Alias of http.request with automatic req.end().

### ClientRequest Methods
- setHeader(name, value)
- getHeader(name) → any
- hasHeader(name) → boolean
- removeHeader(name)
- flushHeaders() → void
- write(chunk[, encoding][, callback]) → boolean
- end([data[, encoding]][, callback]) → this
- abort()/destroy([error]) → this
- setTimeout(ms[, callback]) → this
- setNoDelay([noDelay])
- setSocketKeepAlive([enable], [initialDelay])

### ClientRequest Events
'response', 'socket', 'timeout', 'error', 'upgrade', 'connect', 'continue', 'information', 'finish'

## 3. HTTP Server API

### http.createServer([options][, requestListener]) → http.Server
- options: { allowHalfOpen? }
- requestListener: (req: http.IncomingMessage, res: http.ServerResponse)

### server.listen(port[, hostname][, backlog][, callback])
### server.setTimeout(msecs[, callback])
### server.close([callback])
### server.closeAllConnections()  
### server.closeIdleConnections()

### Server Events
'request', 'connection', 'checkContinue', 'checkExpectation', 'upgrade', 'clientError', 'close', 'connect', 'dropRequest'

## 4. Message Classes

### http.IncomingMessage
Properties: headers: Object, rawHeaders: string[], method: string, url: string, httpVersion: string, statusCode?: number
Methods: setTimeout(ms[, callback]) → this, destroy([error]) → void

### http.ServerResponse
Methods: setHeader(name, value), getHeader(name) → any, removeHeader(name), writeHead(statusCode[, statusMessage][, headers]), write(chunk[, encoding][, callback]), end([data[, encoding]][, callback]), writeContinue(), writeProcessing(), addTrailers(headers), flushHeaders(), setTimeout(ms[, callback]), cork(), uncork()
Properties: statusCode, statusMessage, headersSent, connection

### http.OutgoingMessage
Base class for ClientRequest and ServerResponse. Methods: similar to ServerResponse minus status codes.

## 5. Utilities

- http.METHODS: string[] of valid methods.
- http.STATUS_CODES: { [code: number]: string }
- http.validateHeaderName(name[, label]) → void throws
- http.validateHeaderValue(name, value) → void throws
- http.setMaxIdleHTTPParsers(max: number) → void


## Attribution
- Source: Node.js HTTP Module
- URL: https://nodejs.org/api/http.html
- License: License
- Crawl Date: 2025-04-26T12:56:10.159Z
- Data Size: 3590328 bytes
- Links Found: 2252

## Retrieved
2025-04-26
