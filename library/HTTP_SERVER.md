# HTTP_SERVER

## Crawl Summary
createServer(options, listener) returns Server; core options allowHalfOpen/pauseOnConnect; server.listen(port, hostname, backlog, callback) binding patterns; http.request/get signature and defaults; ClientRequest write/end/abort/setHeader/removeHeader; IncomingMessage properties and read methods; ServerResponse writeHead/setHeader/getHeader/removeHeader/write/end

## Normalised Extract
Table of Contents
1 HTTP.createServer
2 server.listen
3 HTTP.request
4 HTTP.get
5 ClientRequest API
6 IncomingMessage API
7 ServerResponse API

1 HTTP.createServer
Signature: createServer(options?: Object, requestListener: Function) -> Server
defaults: options.allowHalfOpen=false, options.pauseOnConnect=false

2 server.listen
Signature: listen(port: string|number, hostname?: string, backlog?: number, callback?: Function) -> Server
default binding: hostname=all interfaces, backlog=511

3 HTTP.request
Signature: request(options: Object|string, callback?: Function) -> ClientRequest
defaults: hostname=localhost, port=80, path='/', method=GET, headers={}, agent=Agent.default

4 HTTP.get
Alias of HTTP.request with method='GET'
Signature: get(options: Object|string, callback?: Function) -> ClientRequest

5 ClientRequest API
Methods
data transmission: write(chunk, encoding?, callback?), end(data?, encoding?, callback?)
control: abort()
headers: setHeader(name, value), removeHeader(name)
Events: 'response'(IncomingMessage), 'error'(Error), 'socket'

6 IncomingMessage API
Properties: httpVersion, headers, rawHeaders, trailers, socket
Methods: setTimeout(timeout, callback?)
Stream.Readable methods: on('data'), on('end'), read(), pipe()

7 ServerResponse API
Methods: writeHead(statusCode, statusMessage?, headers?), setHeader(name,value), getHeader(name), removeHeader(name), write(chunk, encoding?, callback?), end(data?, encoding?, callback?)
Events: 'finish', 'close'


## Supplementary Details
Default Agent configuration: keepAlive=false, maxSockets=Infinity, maxFreeSockets=256, timeout=60000ms
Default server maxHeadersCount=2000
Automatic TCP keep-alive disabled by default
Sockets are unpaused before 'response' event emitted
ServerResponse .writeHead sets statusCode, statusMessage, and adds headers
setTimeout on sockets via request.setTimeout or response.setTimeout defines socket timeout and emits timeout event
backlog default computed by OS if omitted


## Reference Details
Code Example: Create HTTP Server
```js
import http from 'node:http';
const server = http.createServer({ allowHalfOpen: true }, (req, res) => {
  res.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});
server.listen(3000, '127.0.0.1', 100, () => console.log('Listening'));``` 

HTTP.request Pattern
```js
import http from 'node:http';
const options = { hostname: 'example.com', port: 80, path: '/data', method: 'POST', headers: { 'Content-Type': 'application/json' } };
const req = http.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Response:', body));
});
req.on('error', err => console.error('Request error:', err));
req.write(JSON.stringify({ key: 'value' }));
req.end();``` 

Best Practices
- Reuse http.Agent for connection pooling
- Add error handler on ClientRequest to avoid uncaught exceptions
- Call server.close() to stop server, handle 'close' event

Troubleshooting
Command: netstat -plnt | grep 3000
Expected: LISTEN on 127.0.0.1:3000
Error EADDRINUSE: address already in use, run `lsof -i :3000` to find process and kill via `kill -9 <pid>`

Configuration Options
- allowHalfOpen: controls socket half-open state when server ends
- pauseOnConnect: if true pause socket until 'connection' listener resumes
- keepAliveTimeout: server.keepAliveTimeout default 5000ms

## Information Dense Extract
createServer(options?:Object{allowHalfOpen:false,pauseOnConnect:false},listener(req, res))->Server; listen(port:string|number,hostname?:string,backlog?:number,callback?)->Server default hostname=all,backlog=OS; request(options:{hostname:string='localhost',port:number=80,path:string='/',method:string='GET',headers:Object,agent:Agent.default},callback?(res:IncomingMessage))->ClientRequest; get(...) alias with method='GET'; ClientRequest: write(chunk,encoding?,cb?),end(data?,encoding?,cb?),abort(),setHeader(name,value),removeHeader(name), events:response, error, socket; IncomingMessage: properties httpVersion,headers,rawHeaders,trailers,socket; methods setTimeout(timeout,cb?), Readable interface; ServerResponse: writeHead(statusCode:number,statusMessage?:string,headers?:Object), setHeader(name,value),getHeader(name),removeHeader(name), write(chunk,encoding?,cb?), end(data?,encoding?,cb?), events finish,close; defaults agent.keepAlive=false,maxSockets=Infinity,maxFreeSockets=256,timeout=60000ms; maxHeadersCount=2000; EOF

## Sanitised Extract
Table of Contents
1 HTTP.createServer
2 server.listen
3 HTTP.request
4 HTTP.get
5 ClientRequest API
6 IncomingMessage API
7 ServerResponse API

1 HTTP.createServer
Signature: createServer(options?: Object, requestListener: Function) -> Server
defaults: options.allowHalfOpen=false, options.pauseOnConnect=false

2 server.listen
Signature: listen(port: string|number, hostname?: string, backlog?: number, callback?: Function) -> Server
default binding: hostname=all interfaces, backlog=511

3 HTTP.request
Signature: request(options: Object|string, callback?: Function) -> ClientRequest
defaults: hostname=localhost, port=80, path='/', method=GET, headers={}, agent=Agent.default

4 HTTP.get
Alias of HTTP.request with method='GET'
Signature: get(options: Object|string, callback?: Function) -> ClientRequest

5 ClientRequest API
Methods
data transmission: write(chunk, encoding?, callback?), end(data?, encoding?, callback?)
control: abort()
headers: setHeader(name, value), removeHeader(name)
Events: 'response'(IncomingMessage), 'error'(Error), 'socket'

6 IncomingMessage API
Properties: httpVersion, headers, rawHeaders, trailers, socket
Methods: setTimeout(timeout, callback?)
Stream.Readable methods: on('data'), on('end'), read(), pipe()

7 ServerResponse API
Methods: writeHead(statusCode, statusMessage?, headers?), setHeader(name,value), getHeader(name), removeHeader(name), write(chunk, encoding?, callback?), end(data?, encoding?, callback?)
Events: 'finish', 'close'

## Original Source
Node.js Official API Reference
https://nodejs.org/docs/latest/api/

## Digest of HTTP_SERVER

# HTTP Module

## HTTP.createServer([options], requestListener)
* Signature: createServer(options?: Object, requestListener: Function) -> Server
* options.allowHalfOpen: boolean default false
* options.pauseOnConnect: boolean default false
* requestListener: function(req: IncomingMessage, res: ServerResponse)
* Returns an instance of http.Server

## server.listen(port, [hostname], [backlog], [callback])
* Signature: server.listen(port: string|number, hostname?: string, backlog?: number, callback?: Function) -> Server
* port: Port identifier (Number or String)
* hostname: IP or hostname to bind defaults to undefined (all interfaces)
* backlog: maximum length of pending connections
* callback: Called when server is bound

## HTTP.request(options, [callback])
* Signature: request(options: Object | string, callback?: Function) -> ClientRequest
* options.hostname: string default 'localhost'
* options.port: number default 80
* options.path: string default '/'
* options.method: string default 'GET'
* options.headers: Object default {}
* options.agent: boolean|Agent default Agent.default
* callback: function(res: IncomingMessage)
* Returns ClientRequest object

## HTTP.get(options, [callback])
* Signature: get(options: Object | string, callback?: Function) -> ClientRequest
* Acts as http.request with method set to GET
* Returns ClientRequest

## ClientRequest
* Methods: write(chunk: string|Buffer, encoding?: string, callback?: Function)
*          end([data], [encoding], [callback])
*          abort()
*          setHeader(name: string, value: string|Array<string>)
*          removeHeader(name: string)
* Properties: method:string, path:string, host:string, port:number
* Events: 'response': (res: IncomingMessage), 'error': (err: Error), 'socket'

## IncomingMessage
* Properties: httpVersion:string, headers:Object, rawHeaders:Array<string>, trailers:Object
* Methods: setTimeout(timeout: number, callback?: Function)
* Streams: inherits from Stream.Readable, methods read(), pipe(), etc.

## ServerResponse
* Methods: writeHead(statusCode: number, statusMessage?: string, headers?: Object)
*          setHeader(name: string, value: string|Array<string>)
*          getHeader(name: string) -> string|undefined
*          removeHeader(name: string)
*          write(chunk: string|Buffer, encoding?: string, callback?: Function)
*          end([data], [encoding], [callback])
* Events: 'finish', 'close'


## Attribution
- Source: Node.js Official API Reference
- URL: https://nodejs.org/docs/latest/api/
- License: CC-BY-SA
- Crawl Date: 2025-05-11T04:03:15.840Z
- Data Size: 3628998 bytes
- Links Found: 3102

## Retrieved
2025-05-11
