# EXPRESS_API

## Crawl Summary
Express API 5.x provides built-in middleware (json, raw, text, urlencoded, static), application creation via express(), and router creation via express.Router. Each middleware supports options with precise types and default values. The API includes detailed method signatures for HTTP routing (app.get, app.post, app.all, etc.), app settings configuration (trust proxy, view engine, etag) and usage patterns with complete examples. Technical content includes precise option tables and code snippets for immediate implementation.

## Normalised Extract
Table of Contents:
1. Middleware Functions
    - express.json: Options: inflate (Boolean, true), limit (Mixed, '100kb'), reviver (Function, null), strict (Boolean, true), type (Mixed, 'application/json'), verify (Function, undefined).
    - express.raw: Options: inflate (true), limit ('100kb'), type ('application/octet-stream'), verify (undefined).
    - express.text: Options: defaultCharset ('utf-8'), inflate (true), limit ('100kb'), type ('text/plain'), verify (undefined).
    - express.urlencoded: Options: extended (false), inflate (true), limit ('100kb'), parameterLimit (1000), type ('application/x-www-form-urlencoded'), verify (undefined).
2. Static Middleware
    - express.static: Requires root directory. Options include: dotfiles (String, 'ignore'), etag (Boolean, true), extensions (Mixed, false), fallthrough (Boolean, true), immutable (Boolean, false), index (Mixed, 'index.html'), lastModified (Boolean, true), maxAge (Number, 0), redirect (Boolean, true), setHeaders (Function, custom).
3. Express Application and Routing
    - Create app with express(). Use methods: app.get, app.post, app.put, app.delete, app.all. 
    - app.listen supports multiple signatures matching Node's http.Server.listen.
    - Example: const app = express(); app.get('/', (req, res) => { res.send('hello world'); }); app.listen(3000).
4. Router and Sub-Application
    - express.Router supports options: caseSensitive (Boolean, false), mergeParams (Boolean, false), strict (Boolean, false).
    - Sub-app mounting: app.use('/admin', subApp) and using app.mountpath.
5. Application Settings
    - Use app.set/get for properties like 'trust proxy', 'view engine', 'etag', 'jsonp callback name', 'query parser', etc.
    - Detailed trust proxy configurations support Boolean, String (CSV), Array, Number, or Function.
Each section lists precise parameter types, default values and behavior for immediate use in implementation.

## Supplementary Details
Middleware Specifications:
- express.json(options): Returns middleware function processing JSON request bodies. Options:
  inflate: true; limit: '100kb'; reviver: null; strict: true; type: 'application/json'; verify: undefined.
- express.raw(options): Returns Buffer containing request.body if matching Content-Type 'application/octet-stream'. Same options structure as above with adjusted type default.
- express.text(options): Returns middleware that parses text. Options include defaultCharset: 'utf-8', inflate: true, limit: '100kb', type: 'text/plain', verify: undefined.
- express.urlencoded(options): Parses URL-encoded bodies. Options: extended: false; inflate: true; limit: '100kb'; parameterLimit: 1000; type: 'application/x-www-form-urlencoded'; verify: undefined.

Static Middleware (express.static):
Requires root directory and options. Table:
  dotfiles: 'ignore'; etag: true; extensions: false; fallthrough: true; immutable: false; index: 'index.html'; lastModified: true; maxAge: 0; redirect: true; setHeaders: custom function (signature: (res, path, stat)).

Express Application :
  Create app: const app = express();
  Usage: app.get(path, callback) etc.
  app.listen([port[, host[, backlog]]], callback) returns http.Server.

Router:
  Create using: const router = express.Router({ caseSensitive: false, mergeParams: false, strict: false });

Application Settings Examples:
  app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
  app.set('view engine', 'pug');

This section includes exact parameter values, default settings, and recommended implementation steps (such as validating req.body data, using next() in middleware, and caching views in production).

## Reference Details
API Specifications:
1. express.json(options?) -> Middleware Function
   - Options:
     { inflate?: boolean = true, limit?: number|string = '100kb', reviver?: Function = null, strict?: boolean = true, type?: string|Array|string|Function = 'application/json', verify?: Function = undefined }
   - Returns: function(req, res, next) with parsed JSON in req.body or undefined.

2. express.raw(options?) -> Middleware Function
   - Options:
     { inflate?: boolean = true, limit?: number|string = '100kb', type?: string|Array|string|Function = 'application/octet-stream', verify?: Function = undefined }
   - Returns: Buffer assigned to req.body.

3. express.text(options?) -> Middleware Function
   - Options:
     { defaultCharset?: string = 'utf-8', inflate?: boolean = true, limit?: number|string = '100kb', type?: string|Array|string|Function = 'text/plain', verify?: Function = undefined }
   - Returns: String assigned to req.body.

4. express.urlencoded(options?) -> Middleware Function
   - Options:
     { extended?: boolean = false, inflate?: boolean = true, limit?: number|string = '100kb', parameterLimit?: number = 1000, type?: string|Array|string|Function = 'application/x-www-form-urlencoded', verify?: Function = undefined }
   - Returns: Object with key-value pairs in req.body.

5. express.static(root, options?) -> Middleware Function
   - Parameters:
     root: string (directory path)
     options: {
       dotfiles: string = 'ignore',
       etag: boolean = true,
       extensions: false|Array<string> = false,
       fallthrough: boolean = true,
       immutable: boolean = false,
       index: string|false = 'index.html',
       lastModified: boolean = true,
       maxAge: number|string = 0,
       redirect: boolean = true,
       setHeaders?: function(res, path, stat): void
     }

6. express.Router(options?) -> Router Object
   - Options:
     { caseSensitive?: boolean = false, mergeParams?: boolean = false, strict?: boolean = false }
   - Returns: Router instance with methods get, post, etc.

7. Application Methods (Example):
   - app.all(path, callback [, callback ...])
   - app.get(path, callback [, callback ...])
   - app.post(path, callback [, callback ...])
   - app.put(path, callback [, callback ...])
   - app.delete(path, callback [, callback ...])
   - app.listen([port[, host[, backlog]]], callback) -> http.Server
   - Example code:
     const express = require('express');
     const app = express();
     app.get('/', (req, res) => { res.send('GET response'); });
     app.listen(3000, () => { console.log('Listening on port 3000'); });

8. Configuration and Settings:
   - app.set('trust proxy', value); where value can be Boolean, string (CSV) or array. Example: 'loopback, linklocal, uniquelocal'
   - app.engine(ext, callback): Example: app.engine('pug', require('pug').__express)
   - Troubleshooting: Check req.body type validations, ensure middleware order is correct, use console.log and error handlers. Use http.Server.listen’s callback to log output.

Best Practices:
   - Always validate req.body data after middleware has parsed it.
   - Use reverse proxy caching with express.static for performance improvements.
   - Use app.param for parameter pre-loading. 
   - Set 'trust proxy' appropriately if behind a proxy.

Step-by-Step Troubleshooting:
   1. Validate Content-Type of incoming requests against middleware type.
   2. If req.body is undefined, check if request body exists and header matches.
   3. Use error handling middleware: app.use((err, req, res, next) => { console.error(err); res.status(500).send(err.message); });
   4. Confirm configuration options by logging app.get('trust proxy'), etc.

Commands:
   - To start the server: node app.js
   - To test middleware: use curl -X POST -H "Content-Type: application/json" -d '{"name":"test"}' http://localhost:3000
Expected output: Parsed JSON in req.body and proper response from defined route.


## Information Dense Extract
express.json({inflate:true,limit:'100kb',reviver:null,strict:true,type:'application/json',verify:undefined}); express.raw({inflate:true,limit:'100kb',type:'application/octet-stream',verify:undefined}); express.text({defaultCharset:'utf-8',inflate:true,limit:'100kb',type:'text/plain',verify:undefined}); express.urlencoded({extended:false,inflate:true,limit:'100kb',parameterLimit:1000,type:'application/x-www-form-urlencoded',verify:undefined}); express.static(root, {dotfiles:'ignore',etag:true,extensions:false,fallthrough:true,immutable:false,index:'index.html',lastModified:true,maxAge:0,redirect:true,setHeaders:function(res,path,stat){/* custom */}}); express.Router({caseSensitive:false,mergeParams:false,strict:false}); app.listen([port,host,backlog],callback); app.all(path,callback,...); app.get(path,callback,...); app.param('name',callback); app.engine(ext,callback); app.set/get for 'trust proxy','view engine','etag','jsonp callback name','query parser'. Validate req.body types, use reverse proxy caching with static middleware, check middleware order, use error handling middleware. Testing via curl POST with proper Content-Type.

## Sanitised Extract
Table of Contents:
1. Middleware Functions
    - express.json: Options: inflate (Boolean, true), limit (Mixed, '100kb'), reviver (Function, null), strict (Boolean, true), type (Mixed, 'application/json'), verify (Function, undefined).
    - express.raw: Options: inflate (true), limit ('100kb'), type ('application/octet-stream'), verify (undefined).
    - express.text: Options: defaultCharset ('utf-8'), inflate (true), limit ('100kb'), type ('text/plain'), verify (undefined).
    - express.urlencoded: Options: extended (false), inflate (true), limit ('100kb'), parameterLimit (1000), type ('application/x-www-form-urlencoded'), verify (undefined).
2. Static Middleware
    - express.static: Requires root directory. Options include: dotfiles (String, 'ignore'), etag (Boolean, true), extensions (Mixed, false), fallthrough (Boolean, true), immutable (Boolean, false), index (Mixed, 'index.html'), lastModified (Boolean, true), maxAge (Number, 0), redirect (Boolean, true), setHeaders (Function, custom).
3. Express Application and Routing
    - Create app with express(). Use methods: app.get, app.post, app.put, app.delete, app.all. 
    - app.listen supports multiple signatures matching Node's http.Server.listen.
    - Example: const app = express(); app.get('/', (req, res) => { res.send('hello world'); }); app.listen(3000).
4. Router and Sub-Application
    - express.Router supports options: caseSensitive (Boolean, false), mergeParams (Boolean, false), strict (Boolean, false).
    - Sub-app mounting: app.use('/admin', subApp) and using app.mountpath.
5. Application Settings
    - Use app.set/get for properties like 'trust proxy', 'view engine', 'etag', 'jsonp callback name', 'query parser', etc.
    - Detailed trust proxy configurations support Boolean, String (CSV), Array, Number, or Function.
Each section lists precise parameter types, default values and behavior for immediate use in implementation.

## Original Source
Express.js API Documentation
https://expressjs.com/en/api.html

## Digest of EXPRESS_API

# Express API Documentation

Date Retrieved: 2023-10-04

This document contains the exact specifications for Express.js 5.x including middleware functions, application methods, router options, and configuration settings. It provides complete method signatures, configuration option tables, and code examples.

## Middleware Functions

1. express.json([options])
   - Signature: express.json([options]) returns middleware function with signature (req, res, next)
   - Options Object Properties:
     - inflate: Boolean, default true. Enables/Disables gzip/deflate inflation.
     - limit: Mixed, default "100kb". Maximum request body size (bytes or string parsed by bytes library).
     - reviver: Function, default null. Passed to JSON.parse as the reviver argument.
     - strict: Boolean, default true. Only accepts arrays and objects.
     - type: Mixed, default "application/json". Specifies media type to match.
     - verify: Function, default undefined. Called as verify(req, res, buf, encoding) to validate raw body.

2. express.raw([options])
   - Signature: express.raw([options]) returns middleware function.
   - Options:
     - inflate: Boolean, default true
     - limit: Mixed, default "100kb"
     - type: Mixed, default "application/octet-stream"
     - verify: Function, default undefined.

3. express.text([options])
   - Signature: express.text([options]) returns middleware function.
   - Options:
     - defaultCharset: String, default "utf-8"
     - inflate: Boolean, default true
     - limit: Mixed, default "100kb"
     - type: Mixed, default "text/plain"
     - verify: Function, default undefined.

4. express.urlencoded([options])
   - Signature: express.urlencoded([options]) returns middleware function.
   - Options:
     - extended: Boolean, default false (use querystring) or true (use qs library)
     - inflate: Boolean, default true
     - limit: Mixed, default "100kb"
     - parameterLimit: Number, default 1000
     - type: Mixed, default "application/x-www-form-urlencoded"
     - verify: Function, default undefined.

5. express.static(root, [options])
   - Signature: express.static(root, [options]) returns middleware function for serving static files.
   - Options:
     - dotfiles: String, default "ignore". Values: "allow", "deny", "ignore".
     - etag: Boolean, default true.
     - extensions: Mixed, default false. Array of extension fallbacks (e.g. ['html', 'htm']).
     - fallthrough: Boolean, default true.
     - immutable: Boolean, default false.
     - index: Mixed, default "index.html".
     - lastModified: Boolean, default true.
     - maxAge: Number, default 0 (can also be string in ms format).
     - redirect: Boolean, default true.
     - setHeaders: Function, used as setHeaders(res, path, stat).

6. express.Router([options])
   - Signature: const router = express.Router([options])
   - Options:
     - caseSensitive: Boolean, default false. (When true, '/Foo' != '/foo')
     - mergeParams: Boolean, default false. (Inherit parent req.params)
     - strict: Boolean, default false. (Strict routing: '/foo' vs '/foo/')

## Express Application

Creating an Express application:

  const express = require('express');
  const app = express();

Methods include:
  - app.get(path, callback [, callback ...])
  - app.post(path, callback [, callback ...])
  - app.put(path, callback [, callback ...])
  - app.delete(path, callback [, callback ...])
  - app.all(path, callback [, callback ...])
  - app.listen([port[, host[, backlog]]][, callback])

Example:

  const app = express();
  app.get('/', (req, res) => {
    res.send('hello world');
  });
  app.listen(3000);

Other Application properties:
  - app.locals: Local variables persist for application lifetime.
  - app.mountpath: Base mount path of sub-applications.

## Router and Sub-App Mounting

Creating routers:
  const router = express.Router();
  router.get('/', (req, res) => {
    res.send('hello world');
  });
  app.use('/admin', router);

Sub-app mounting:
  const admin = express();
  admin.on('mount', (parent) => {
    // triggered when admin is mounted
  });
  app.use('/admin', admin);

## Application Settings

Settings can be configured using app.set and app.get:
  - case sensitive routing: Boolean
  - env: string ('production' or 'development')
  - etag: varied, with options weak or strong
  - jsonp callback name: default "callback"
  - query parser: 'simple' or 'extended' or custom function
  - strict routing: Boolean
  - subdomain offset: Number, default 2
  - trust proxy: varied (Boolean, String list, Array, Number, Function)
  - views: directory path, default process.cwd() + '/views'
  - view cache: Boolean, true in production
  - view engine: String extension
  - x-powered-by: Boolean, default true

Example configuration:
  app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
  app.set('view engine', 'pug');

## HTTP Methods and Routing

Standard routing methods include:
  - app.all(path, callback [, callback ...])
    * Matches all HTTP methods and can be used for pre-condition middleware.
  - app.METHOD, e.g. app.get, app.post, etc.
  - Special routing for HTTP DELETE, PUT, etc., with multiple callback functions allowed.

Full example using multiple callbacks:

  app.all('/secret', (req, res, next) => {
    console.log('Accessing secret section');
    next();
  });

## Additional API Details

- app.engine(ext, callback): Registers a template engine. Example:
  app.engine('html', require('ejs').renderFile);

- app.param(name, callback): Used to define param middleware for route parameters. Example:
  app.param('user', (req, res, next, id) => {
    User.find(id, (err, user) => {
      if (err) return next(err);
      if (user) {
        req.user = user;
        next();
      } else {
        next(new Error('failed to load user'));
      }
    });
  });

- app.render(view, [locals], callback): Renders a view template to a string.

- app.listen: Returns an http.Server object. Overloaded to support various argument formats similar to Node's http.Server.listen().


## Attribution
- Source: Express.js API Documentation
- URL: https://expressjs.com/en/api.html
- License: MIT License
- Crawl Date: 2025-04-28T15:48:40.918Z
- Data Size: 27592178 bytes
- Links Found: 23015

## Retrieved
2025-04-28
