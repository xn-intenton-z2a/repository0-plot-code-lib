# EXPRESS_API

## Crawl Summary
express() top-level creates app. Built-in body parsers: json, raw, text, urlencoded with models of options: inflate (true), limit ('100kb'), type (content-type match), verify callback. Router options: caseSensitive (false), mergeParams (false), strict (false). static(root, options): dotfiles, etag, extensions, fallthrough, immutable, index, lastModified, maxAge, redirect, setHeaders. app methods: use, METHODS (get, post, put, delete, all, param, engine, listen, set, get, enable, disable). Default settings: case sensitive routing undefined, env 'development', etag 'weak', jsonp callback 'callback', query parser 'extended', strict routing undefined, subdomain offset 2, trust proxy false, views 'cwd/views', view cache prod.

## Normalised Extract
Table of Contents
1. express() Initialization
2. Built-in Middleware
   2.1 json(options)
   2.2 raw(options)
   2.3 text(options)
   2.4 urlencoded(options)
3. Router Creation
4. Static File Serving
5. Application Methods
6. Application Settings

1. express() Initialization
Signature: var express = require('express'); var app = express();
Creates an Express application function that handles requests.

2. Built-in Middleware
2.1 json(options)
Signature: express.json({inflate:boolean=true, limit:number|string='100kb', reviver:Function|null=null, strict:boolean=true, type:string|string[]|Function='application/json', verify:Function|undefined});
- Parses JSON bodies matching Content-Type. Populates req.body Object or {}.
- gzip/deflate inflation enabled. verify(req,res,buf,encoding) may throw to abort.

2.2 raw(options)
Signature: express.raw({inflate:boolean=true, limit:number|string='100kb', type:string|string[]|Function='application/octet-stream', verify:Function|undefined});
- Populates req.body Buffer. validate Buffer before use.

2.3 text(options)
Signature: express.text({defaultCharset:string='utf-8', inflate:boolean=true, limit:number|string='100kb', type:string|string[]|Function='text/plain', verify:Function|undefined});
- Populates req.body string.

2.4 urlencoded(options)
Signature: express.urlencoded({extended:boolean=true, inflate:boolean=true, limit:number|string='100kb', parameterLimit:number=1000, type:string|string[]|Function='application/x-www-form-urlencoded', verify:Function|undefined});
- Populates req.body Object. extended=false uses querystring, true uses qs.

3. Router Creation
Signature: express.Router({caseSensitive:boolean=false, mergeParams:boolean=false, strict:boolean=false});
- Returns router for grouping routes and middleware.

4. Static File Serving
Signature: express.static(root:string, {dotfiles:'allow'|'deny'|'ignore'=undefined, etag:boolean=true, extensions:string[]|false=false, fallthrough:boolean=true, immutable:boolean=false, index:string|string[]|false='index.html', lastModified:boolean=true, maxAge:number|string=0, redirect:boolean=true, setHeaders:function(res,path,stat)});
- Combines req.url with root to locate file. Errors fallthrough or sent.
- dotfiles: allow/deny/ignore. fallthrough: true calls next(); false next(err).
- setHeaders(res,path,stat) sets headers synchronously.

5. Application Methods
app.METHOD(path, ...callbacks)
- path: string|RegExp|Array; callbacks: middleware functions. Returns app.
app.all(path, ...)
app.use([path], middleware)
app.param(name|string[] , callback(req,res,next,value,name))
app.engine(ext, callback(path, options, cb))
app.listen([port[, host[, backlog]]], [callback]) => http.Server
app.set(name, value), app.get(name)
app.enable(name), app.disable(name), app.enabled(name), app.disabled(name)

6. Application Settings
case sensitive routing: undefined
env: process.env.NODE_ENV||'development'
etag: 'weak'
jsonp callback name: 'callback'
json escape: undefined
json replacer: undefined
json spaces: undefined
query parser: 'extended'
strict routing: undefined
subdomain offset: 2
trust proxy: false
views: process.cwd() + '/views'
view cache: NODE_ENV==='production'

## Supplementary Details
- For json, raw, text, urlencoded: Content-Type matching uses type-is library. type option accepts string, array, or fn(req).
- limit accepts bytes or string parsed by bytes library.
- verify signature: function(req, res, buf:Buffer, encoding:string) => void; throw Error to abort.
- Router mergeParams preserves parent req.params on child.
- static: maxAge sets Cache-Control:max-age in ms or '1d' etc.
- immutable adds Cache-Control: immutable directive; works only if maxAge > 0.
- When static 'redirect' false, directory URLs without slash won't redirect.
- setHeaders called before headers sent.
- app.listen returns http.Server. Accepts any signature https://nodejs.org/api/net.html#serverlisten.
- app.engine mapping: ext and .__express or custom.
- app.param callback ordering: triggers per parameter once per request.


## Reference Details
--- express.json ---
Signature: express.json(options) -> RequestHandler
Options:
  inflate: boolean = true
  limit: number|string = '100kb'
  reviver: Function|null = null
  strict: boolean = true
  type: string|string[]|Function = 'application/json'
  verify: (req:Request, res:Response, buf:Buffer, encoding:string) => void
Returns: function(req, res, next)
Behavior: parse JSON; req.body = parsed object or {}.

Example:
app.use(express.json({limit:'1mb', strict:false, verify:(req,res,buf,enc)=>{if(buf.length>1e6) throw new Error('Payload too large');}}));

Troubleshoot:
command: curl -X POST -H 'Content-Type: application/json' -d '{malformed}' http://localhost:3000/endpoint
expected: HTTP 400 with SyntaxError message.

--- express.static ---
Signature: express.static(root, options) -> RequestHandler
Options:
  dotfiles: 'allow'|'deny'|'ignore'
  etag: boolean = true
  extensions: string[]|false = false
  fallthrough: boolean = true
  immutable: boolean = false
  index: string|string[]|false = 'index.html'
  lastModified: boolean = true
  maxAge: number|string = 0
  redirect: boolean = true
  setHeaders: (res:Response, path:string, stat:fs.Stats) => void
Behavior: serve files; errors or next().
Example:
var options = {
  dotfiles: 'deny',
  etag: false,
  extensions: ['htm','html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function(res,path,stat){ res.set('x-timestamp',Date.now()); }
};
app.use('/static', express.static('public', options));

Troubleshoot:
command: curl -I http://localhost:3000/static/file.txt
expected headers: Cache-Control: public, max-age=86400

--- Routing Methods ---
Signature: app.get(path, ...callbacks)
path: string|RegExp|Array
callbacks: (req, res, next) => void
Example:
app.all('/api/*', requireAuth, loadUser);

--- app.listen ---
Signature: app.listen(port?:number, host?:string, backlog?:number, callback?:() => void) -> http.Server
Example:
var server = app.listen(0, '127.0.0.1', undefined, () => { console.log('Listening'); });
server.address(); // { port: ..., family:'IPv4', address:'127.0.0.1' }

--- Best Practices ---
- Validate req.body before use.
- Use helmet middleware for security.
- Enable production settings: app.set('view cache', true); app.enable('trust proxy');

--- Troubleshooting ---
- Check Content-Type header.
- Use debug('express:router')=true env var for routing logs.
- Trace static middleware with morgan logging.


## Information Dense Extract
express(): app function; use with http.createServer.
json(options): inflate=true,limit='100kb',reviver,null,strict=true,type='application/json',verify fn; parses JSON into req.body.
raw(options): inflate=true,limit='100kb',type='application/octet-stream',verify fn; populates Buffer.
text(options): defaultCharset='utf-8',inflate=true,limit='100kb',type='text/plain',verify fn; populates String.
urlencoded(options): extended=true,inflate=true,limit='100kb',parameterLimit=1000,type='application/x-www-form-urlencoded',verify fn; populates Object.
Router(opts): caseSensitive=false,mergeParams=false,strict=false.
static(root,opts): dotfiles='ignore',etag=true,extensions=false,fallthrough=true,immutable=false,index='index.html',lastModified=true,maxAge=0,redirect=true,setHeaders fn.
app.VERB(path,callbacks): path: string|RegExp|Array; callbacks: middleware.
app.use(path?,middleware)
app.param(name|[],fn(req,res,next,val,name))
app.engine(ext,(path,opts,cb))
app.listen(port?,host?,backlog?,cb)->http.Server
app.set/get(name),app.enable/disable(name),app.enabled/disabled(name)
Settings defaults: case sensitive routing undefined; env 'development'; etag 'weak'; jsonp cb 'callback'; query parser 'extended'; strict routing undefined; subdomain offset=2; trust proxy=false; views cwd+'/views'; view cache true in production.

## Sanitised Extract
Table of Contents
1. express() Initialization
2. Built-in Middleware
   2.1 json(options)
   2.2 raw(options)
   2.3 text(options)
   2.4 urlencoded(options)
3. Router Creation
4. Static File Serving
5. Application Methods
6. Application Settings

1. express() Initialization
Signature: var express = require('express'); var app = express();
Creates an Express application function that handles requests.

2. Built-in Middleware
2.1 json(options)
Signature: express.json({inflate:boolean=true, limit:number|string='100kb', reviver:Function|null=null, strict:boolean=true, type:string|string[]|Function='application/json', verify:Function|undefined});
- Parses JSON bodies matching Content-Type. Populates req.body Object or {}.
- gzip/deflate inflation enabled. verify(req,res,buf,encoding) may throw to abort.

2.2 raw(options)
Signature: express.raw({inflate:boolean=true, limit:number|string='100kb', type:string|string[]|Function='application/octet-stream', verify:Function|undefined});
- Populates req.body Buffer. validate Buffer before use.

2.3 text(options)
Signature: express.text({defaultCharset:string='utf-8', inflate:boolean=true, limit:number|string='100kb', type:string|string[]|Function='text/plain', verify:Function|undefined});
- Populates req.body string.

2.4 urlencoded(options)
Signature: express.urlencoded({extended:boolean=true, inflate:boolean=true, limit:number|string='100kb', parameterLimit:number=1000, type:string|string[]|Function='application/x-www-form-urlencoded', verify:Function|undefined});
- Populates req.body Object. extended=false uses querystring, true uses qs.

3. Router Creation
Signature: express.Router({caseSensitive:boolean=false, mergeParams:boolean=false, strict:boolean=false});
- Returns router for grouping routes and middleware.

4. Static File Serving
Signature: express.static(root:string, {dotfiles:'allow'|'deny'|'ignore'=undefined, etag:boolean=true, extensions:string[]|false=false, fallthrough:boolean=true, immutable:boolean=false, index:string|string[]|false='index.html', lastModified:boolean=true, maxAge:number|string=0, redirect:boolean=true, setHeaders:function(res,path,stat)});
- Combines req.url with root to locate file. Errors fallthrough or sent.
- dotfiles: allow/deny/ignore. fallthrough: true calls next(); false next(err).
- setHeaders(res,path,stat) sets headers synchronously.

5. Application Methods
app.METHOD(path, ...callbacks)
- path: string|RegExp|Array; callbacks: middleware functions. Returns app.
app.all(path, ...)
app.use([path], middleware)
app.param(name|string[] , callback(req,res,next,value,name))
app.engine(ext, callback(path, options, cb))
app.listen([port[, host[, backlog]]], [callback]) => http.Server
app.set(name, value), app.get(name)
app.enable(name), app.disable(name), app.enabled(name), app.disabled(name)

6. Application Settings
case sensitive routing: undefined
env: process.env.NODE_ENV||'development'
etag: 'weak'
jsonp callback name: 'callback'
json escape: undefined
json replacer: undefined
json spaces: undefined
query parser: 'extended'
strict routing: undefined
subdomain offset: 2
trust proxy: false
views: process.cwd() + '/views'
view cache: NODE_ENV==='production'

## Original Source
Express.js Web Framework
https://expressjs.com/en/4x/api.html

## Digest of EXPRESS_API

# Express 4.x API Reference (Retrieved: 2023-11-24)

## express()

Signature:

```javascript
var express = require('express');
var app = express();
```

Creates an Express application.

## Built-in Middleware:

### express.json([options])

Availability: v4.16.0+

Parses JSON payloads into req.body (Object). Based on body-parser.

Signature:

```javascript
express.json(options?: {
  inflate?: boolean;          // default true
  limit?: number|string;      // default '100kb'
  reviver?: Function|null;    // passed to JSON.parse
  strict?: boolean;           // default true
  type?: string|string[]|Function;  // default 'application/json'
  verify?: (req, res, buf, encoding) => void; // optional
}): RequestHandler
```

Behavior:

- Only parses requests where Content-Type matches `type`.
- Populates req.body with parsed object or {}.
- Supports gzip/deflate.
- Throws on invalid JSON.

### express.raw([options])

Availability: v4.17.0+

Parses bodies into Buffer on req.body.

Signature:

```javascript
express.raw(options?: {
  inflate?: boolean;        // default true
  limit?: number|string;    // default '100kb'
  type?: string|string[]|Function;  // default 'application/octet-stream'
  verify?: (req, res, buf, encoding) => void; // optional
}): RequestHandler
```

### express.text([options])

Availability: v4.17.0+

Parses bodies into string on req.body.

Signature:

```javascript
express.text(options?: {
  defaultCharset?: string;  // default 'utf-8'
  inflate?: boolean;        // default true
  limit?: number|string;    // default '100kb'
  type?: string|string[]|Function;  // default 'text/plain'
  verify?: (req, res, buf, encoding) => void; // optional
}): RequestHandler
```

### express.urlencoded([options])

Availability: v4.16.0+

Parses urlencoded bodies into req.body (Object).

Signature:

```javascript
express.urlencoded(options?: {
  extended?: boolean;       // default true
  inflate?: boolean;        // default true
  limit?: number|string;    // default '100kb'
  parameterLimit?: number;  // default 1000
  type?: string|string[]|Function;  // default 'application/x-www-form-urlencoded'
  verify?: (req, res, buf, encoding) => void; // optional
}): RequestHandler
```

### express.Router([options])

Creates a router.

Signature:

```javascript
var router = express.Router(options?: {
  caseSensitive?: boolean;  // default false
  mergeParams?: boolean;     // default false  (v4.5.0+)
  strict?: boolean;          // default false
});
```

### express.static(root, [options])

Serves static assets.

Signature:

```javascript
express.static(root: string, options?: {
  dotfiles?: 'allow'|'deny'|'ignore';  // default undefined
  etag?: boolean;          // default true (weak ETag)
  extensions?: string[]|false;  // default false
  fallthrough?: boolean;    // default true
  immutable?: boolean;      // default false
  index?: string|string[]|false;  // default 'index.html'
  lastModified?: boolean;   // default true
  maxAge?: number|string;   // default 0
  redirect?: boolean;       // default true
  setHeaders?: (res, path, stat) => void; // optional
}): RequestHandler
```

## Routing & Application Methods

### app.METHOD(path, ...callbacks)

Registers route handlers for HTTP METHOD (lowercase).

Signature:

```javascript
app.get(path: string|RegExp|Array, ...callbacks: Function[]): Application;
app.post(...)
app.put(...)
app.delete(...)
app.all(path, ...callbacks);
```

### app.param(name|names, callback)

Registers parameter middleware.

Signature:

```javascript
app.param(name: string, fn: (req, res, next, value, name) => void);
app.param(names: string[], fn);
```

### app.use([path], middleware)
Registers middleware or sub-apps.

### app.listen([port[, host[, backlog]]], [callback])
Starts HTTP server. Returns http.Server.

### app.engine(ext, callback)
Registers template engine.

Signature:

```javascript
app.engine(ext: string, fn: (path: string, options: object, callback: (err, rendered) => void) => void);
```

### app.set(name, value) / app.get(name)
Configures application settings.

### app.enable(name) / app.disable(name)
Sets Boolean settings.

## Application Settings (defaults)

case sensitive routing: undefined
env: process.env.NODE_ENV || 'development'
etag: 'weak'
jsonp callback name: 'callback'
query parser: 'extended'
strict routing: undefined
subdomain offset: 2
trust proxy: false
views: process.cwd() + '/views'
view cache: NODE_ENV === 'production'

## Static Options: dotfiles, fallthrough, immutable behavior, setHeaders signature

## JSON middleware options table (inflate, limit, reviver, strict, type, verify)



## Attribution
- Source: Express.js Web Framework
- URL: https://expressjs.com/en/4x/api.html
- License: License
- Crawl Date: 2025-05-18T06:31:30.527Z
- Data Size: 29716450 bytes
- Links Found: 22980

## Retrieved
2025-05-18
