# EXPRESS_API

## Crawl Summary
Express API detailed technical specifications include methods for initializing the app, middleware functions (json, raw, text, urlencoded), routing (get, post, put, delete, all), static file serving with detailed options, router creation with options for case sensitivity and parameter merging, and application settings management. All options show types, default values, and detailed behavior with complete method signatures and example code.

## Normalised Extract
Table of Contents:
1. Express Initialization
2. Middleware Functions
   - express.json(options)
   - express.raw(options)
   - express.text(options)
   - express.urlencoded(options)
3. Router and Static Serving
   - express.Router(options)
   - express.static(root, options)
4. Application Object and Methods
   - app methods (get, post, put, delete, all, route, render, engine)
5. Configuration and Settings
   - app.locals, app.mountpath, enable/disable settings
6. Event Handling and Parameter Processing
   - app.on('mount', callback)
   - app.param(name, callback)

1. Express Initialization:
 - Use const express = require('express') and call express() to create an app function.

2. Middleware Functions:
 - express.json([options]): Parses JSON with options: inflate (true), limit ('100kb'), reviver (null), strict (true), type ("application/json"), verify (undefined).
 - express.raw([options]): Parses payload into Buffer with options: inflate (true), limit ('100kb'), type ("application/octet-stream"), verify (undefined).
 - express.text([options]): Parses text with defaultCharset ('utf-8'), inflate (true), limit ('100kb'), type ("text/plain"), verify (undefined).
 - express.urlencoded([options]): Parses urlencoded payloads with options: extended (false), inflate (true), limit ('100kb'), parameterLimit (1000), type ("application/x-www-form-urlencoded"), verify (undefined).

3. Router and Static Serving:
 - express.Router([options]): Creates router with options: caseSensitive, mergeParams (false), strict.
 - express.static(root, [options]): Serves files using options: dotfiles ('ignore'), etag (true), extensions (false or array), fallthrough (true), immutable (false), index ('index.html'), lastModified (true), maxAge (0), redirect (true), setHeaders (function callback).

4. Application Object and Methods:
 - app.get(path, callback): For GET requests.
 - app.post, app.put, app.delete similarly defined.
 - app.all(path, callback...): Matches all HTTP verbs.
 - app.route(path): Returns route instance to chain HTTP verb methods.
 - app.render(view, [locals], callback): Renders view as HTML string.
 - app.engine(ext, callback): Registers template engine; callback signature: (path, options, callback).
 - app.set(name, value) and app.get(name) manage settings.

5. Configuration and Settings:
 - app.locals: Persistent locals for views.
 - app.mountpath: Returns mount path or paths of sub-apps.
 - Toggle settings via app.enable('setting') and app.disable('setting').

6. Event Handling and Parameter Processing:
 - app.on('mount', function(parent) {...}) triggers on mounting a sub-app.
 - app.param(name, callback) attaches parameter middleware; called once per request per parameter.

Code Example:
  // Create and configure Express app
  const express = require('express')
  const app = express()
  app.use(express.json({ limit: '200kb', strict: true }))
  app.get('/', (req, res) => { res.send('hello world') })
  app.listen(3000, () => { console.log('Server running on port 3000') })

## Supplementary Details
Technical Specifications:
1. express.json(options):
  - inflate: Boolean = true; Accepts gzip/deflate encoded bodies.
  - limit: Mixed = '100kb'; Can be number (bytes) or string parsed by bytes library.
  - reviver: Function = null; Passed as second parameter to JSON.parse.
  - strict: Boolean = true; Rejects non-array/object payloads.
  - type: Mixed = 'application/json'; Determines content type matching.
  - verify: Function = undefined; Signature: verify(req, res, buf, encoding).

2. express.raw(options):
  - inflate: Boolean = true; 
  - limit: Mixed = '100kb'; 
  - type: Mixed = 'application/octet-stream'; 
  - verify: Function = undefined;

3. express.static(root, options):
  - dotfiles: String = 'ignore'; Values: 'allow', 'deny', 'ignore'.
  - etag: Boolean = true;
  - extensions: Mixed = false or array (e.g., ['html', 'htm']).
  - fallthrough: Boolean = true; If false, errors propagate.
  - immutable: Boolean = false; Use with maxAge option for caching.
  - index: Mixed = 'index.html'; Can disable by setting false.
  - lastModified: Boolean = true; Sets Last-Modified header.
  - maxAge: Number = 0; Sets Cache-Control max-age.
  - redirect: Boolean = true; Redirects to add trailing slash if directory.
  - setHeaders: Function; Signature: setHeaders(res, path, stat) for custom headers.

4. App Settings Examples:
  - app.set('trust proxy', 'loopback, linklocal, uniquelocal') to trust proxies.
  - app.engine('html', require('ejs').renderFile) to register EJS for HTML.

5. Troubleshooting Procedures:
  - If req.body is undefined with express.json(), check Content-Type header.
  - To debug static file serving, log using setHeaders callback.
  - Use app.param() logging to verify parameter middleware execution.
  - Validate user input from req.body after middleware processing to avoid errors in type conversion.
  - For server startup errors, ensure the correct port is provided to app.listen.

6. Full Code Example:
  const express = require('express')
  const app = express()
  
  // Middleware configuration with custom JSON options
  app.use(express.json({
    inflate: true,
    limit: '200kb',
    strict: true,
    type: 'application/json',
    verify: function(req, res, buf, encoding) {
      // Custom verification: throw error to reject if necessary
      if (buf && buf.length > 0 && encoding !== 'utf8') {
        throw new Error('Invalid encoding');
      }
    }
  }))
  
  // Define a route
  app.get('/', (req, res) => {
    res.send('Hello, Express!')
  })
  
  // Start server
  app.listen(3000, () => {
    console.log('Server listening on port 3000')
  })

Troubleshooting Commands:
  - To test JSON parsing error: curl -X POST -H "Content-Type: application/json" -d '{bad json}' http://localhost:3000
  - Check console logs for middleware verification errors.

## Reference Details
API Specifications:
express() -> Application Object (Function)
Usage: const app = express()

express.json([options]) -> Middleware Function
Parameters: options: {
  inflate: Boolean (default true),
  limit: Mixed (default '100kb'),
  reviver: Function (default null),
  strict: Boolean (default true),
  type: Mixed (default 'application/json'),
  verify: Function (default undefined)
}
Returns: function(req, res, next) that populates req.body with JSON data.

express.raw([options]) -> Middleware Function
Parameters: options: {
  inflate: Boolean (default true),
  limit: Mixed (default '100kb'),
  type: Mixed (default 'application/octet-stream'),
  verify: Function (default undefined)
}
Returns: function(req, res, next) that populates req.body as Buffer.

express.text([options]) -> Middleware Function
Parameters: options: {
  defaultCharset: String (default 'utf-8'),
  inflate: Boolean (default true),
  limit: Mixed (default '100kb'),
  type: Mixed (default 'text/plain'),
  verify: Function (default undefined)
}
Returns: function(req, res, next) that parses request body to string.

express.urlencoded([options]) -> Middleware Function
Parameters: options: {
  extended: Boolean (default false),
  inflate: Boolean (default true),
  limit: Mixed (default '100kb'),
  parameterLimit: Number (default 1000),
  type: Mixed (default 'application/x-www-form-urlencoded'),
  verify: Function (default undefined)
}
Returns: function(req, res, next) that populates req.body with parsed urlencoded data.

express.Router([options]) -> Router Object
Parameters: options: {
  caseSensitive: Boolean (default undefined),
  mergeParams: Boolean (default false),
  strict: Boolean (default undefined)
}
Methods: router.get, router.post, etc.

express.static(root, [options]) -> Middleware Function
Parameters: root: String (root directory), options: {
  dotfiles: String (default 'ignore'),
  etag: Boolean (default true),
  extensions: Mixed (default false or array),
  fallthrough: Boolean (default true),
  immutable: Boolean (default false),
  index: Mixed (default 'index.html'),
  lastModified: Boolean (default true),
  maxAge: Number (default 0),
  redirect: Boolean (default true),
  setHeaders: Function (optional)
}
Returns: middleware that serves static files.

app Methods:
- app.all(path, callback...): Matches all HTTP verbs.
- app.get(path, callback...), app.post, app.put, app.delete: Standard HTTP routing.
- app.use(middleware): Registers middleware.
- app.listen([port[, host[, backlog]]], callback): Starts HTTP server.

Full Code Example Provided in Supplementary Details, with inline comments.

Configuration Options and Best Practices:
- Use appropriate body parser middleware with correct Content-Type headers.
- Configure express.static with caching headers (maxAge, immutable) for production.
- Use app.set and app.get for application wide configurations (e.g., trust proxy, view engine).

Troubleshooting Procedures:
1. Verify Content-Type header matches expected type in middleware.
2. Log raw request buffers using the verify function in middleware.
3. Ensure proper error handling: middleware should forward errors using next(err).
4. For routing issues, test with curl commands and check server logs.

Return Types for API methods: All middleware methods return a function with signature (req, res, next).

Exception Handling: Middleware functions automatically call next(err) on synchronous exceptions or rejected promises.


## Information Dense Extract
express() -> creates app; express.json(options): inflate=true, limit='100kb', reviver=null, strict=true, type='application/json', verify=undefined; express.raw(options): inflate=true, limit='100kb', type='application/octet-stream'; express.text(options): defaultCharset='utf-8', inflate=true, limit='100kb', type='text/plain'; express.urlencoded(options): extended=false, inflate=true, limit='100kb', parameterLimit=1000, type='application/x-www-form-urlencoded'; express.Router(options): caseSensitive, mergeParams=false, strict; express.static(root, options): dotfiles='ignore', etag=true, extensions=false/array, fallthrough=true, immutable=false, index='index.html', lastModified=true, maxAge=0, redirect=true, setHeaders(fn); app methods: all, get, post, put, delete, route, render, engine; settings: app.set/get, enable/disable; API functions return middleware function (req, res, next); complete code examples and troubleshooting via header validation and error propagation.

## Sanitised Extract
Table of Contents:
1. Express Initialization
2. Middleware Functions
   - express.json(options)
   - express.raw(options)
   - express.text(options)
   - express.urlencoded(options)
3. Router and Static Serving
   - express.Router(options)
   - express.static(root, options)
4. Application Object and Methods
   - app methods (get, post, put, delete, all, route, render, engine)
5. Configuration and Settings
   - app.locals, app.mountpath, enable/disable settings
6. Event Handling and Parameter Processing
   - app.on('mount', callback)
   - app.param(name, callback)

1. Express Initialization:
 - Use const express = require('express') and call express() to create an app function.

2. Middleware Functions:
 - express.json([options]): Parses JSON with options: inflate (true), limit ('100kb'), reviver (null), strict (true), type ('application/json'), verify (undefined).
 - express.raw([options]): Parses payload into Buffer with options: inflate (true), limit ('100kb'), type ('application/octet-stream'), verify (undefined).
 - express.text([options]): Parses text with defaultCharset ('utf-8'), inflate (true), limit ('100kb'), type ('text/plain'), verify (undefined).
 - express.urlencoded([options]): Parses urlencoded payloads with options: extended (false), inflate (true), limit ('100kb'), parameterLimit (1000), type ('application/x-www-form-urlencoded'), verify (undefined).

3. Router and Static Serving:
 - express.Router([options]): Creates router with options: caseSensitive, mergeParams (false), strict.
 - express.static(root, [options]): Serves files using options: dotfiles ('ignore'), etag (true), extensions (false or array), fallthrough (true), immutable (false), index ('index.html'), lastModified (true), maxAge (0), redirect (true), setHeaders (function callback).

4. Application Object and Methods:
 - app.get(path, callback): For GET requests.
 - app.post, app.put, app.delete similarly defined.
 - app.all(path, callback...): Matches all HTTP verbs.
 - app.route(path): Returns route instance to chain HTTP verb methods.
 - app.render(view, [locals], callback): Renders view as HTML string.
 - app.engine(ext, callback): Registers template engine; callback signature: (path, options, callback).
 - app.set(name, value) and app.get(name) manage settings.

5. Configuration and Settings:
 - app.locals: Persistent locals for views.
 - app.mountpath: Returns mount path or paths of sub-apps.
 - Toggle settings via app.enable('setting') and app.disable('setting').

6. Event Handling and Parameter Processing:
 - app.on('mount', function(parent) {...}) triggers on mounting a sub-app.
 - app.param(name, callback) attaches parameter middleware; called once per request per parameter.

Code Example:
  // Create and configure Express app
  const express = require('express')
  const app = express()
  app.use(express.json({ limit: '200kb', strict: true }))
  app.get('/', (req, res) => { res.send('hello world') })
  app.listen(3000, () => { console.log('Server running on port 3000') })

## Original Source
Express API Reference
https://expressjs.com/en/api.html

## Digest of EXPRESS_API

# express()
Creates an Express application. Usage:
  const express = require('express')
  const app = express()

# express.json([options])
Middleware to parse JSON payloads.
Returns a middleware function that populates req.body with parsed JSON if Content-Type matches.
Options object properties:
  inflate: Boolean, default true, handles gzip/deflate.
  limit: Mixed, default '100kb', controls max body size (number or string parsed by bytes library).
  reviver: Function, default null, passed to JSON.parse.
  strict: Boolean, default true, only accepts arrays and objects.
  type: Mixed, default 'application/json', can be string, array, or function.
  verify: Function, default undefined, signature verify(req, res, buf, encoding).

# express.raw([options])
Middleware to parse request payloads into a Buffer. Returns middleware that sets req.body as Buffer if Content-Type matches.
Options:
  inflate: Boolean, true
  limit: Mixed, '100kb'
  type: Mixed, default 'application/octet-stream'
  verify: Function, default undefined.

# express.Router([options])
Creates a new router object. Options:
  caseSensitive: (Boolean) enable case sensitivity.
  mergeParams: (Boolean) default false, preserves parent req.params.
  strict: (Boolean) routing strict flags, distinguishing '/foo' vs '/foo/'.

# express.static(root, [options])
Serves static files from the specified root directory.
Options include:
  dotfiles: String, default 'ignore' (values: 'allow', 'deny', 'ignore').
  etag: Boolean, default true.
  extensions: Mixed, default false (array for fallbacks, e.g. ['html', 'htm']).
  fallthrough: Boolean, default true.
  immutable: Boolean, default false.
  index: Mixed, default 'index.html'.
  lastModified: Boolean, default true.
  maxAge: Number, default 0 (milliseconds or string format).
  redirect: Boolean, default true.
  setHeaders: Function, no default; signature: setHeaders(res, path, stat).

# express.text([options])
Parses payloads into a string. Options:
  defaultCharset: String, 'utf-8'
  inflate: Boolean, true
  limit: Mixed, '100kb'
  type: Mixed, default 'text/plain'
  verify: Function, default undefined.

# express.urlencoded([options])
Parses URL-encoded payloads. Options:
  extended: Boolean, default false, decides between querystring (false) or qs (true) parser.
  inflate: Boolean, true
  limit: Mixed, '100kb'
  parameterLimit: Number, default 1000
  type: Mixed, default 'application/x-www-form-urlencoded'
  verify: Function, default undefined.

# Application Object and Methods
- Created using express(); acts as a callback for HTTP servers.
- Methods include routing (app.get, app.post, etc.), middleware configuration, view rendering (app.render), and template engine registration (app.engine).
- Example:
  const app = express()
  app.get('/', (req, res) => { res.send('hello world') })
  app.listen(3000)

# App Properties
app.locals: Persistent variables for templates.
app.mountpath: Contains the mount path(s) of sub-apps.
app.router: Lazily created internal router instance.

# Event Handling
app.on('mount', callback): Triggered when a sub-app is mounted with parent as argument.

# Core Routing Methods
app.all(path, callback...): Applies to all HTTP verbs. Example:
  app.all('/secret', (req, res, next) => {
    console.log('Accessing secret section')
    next()
  })

app.delete(path, callback...): Routes DELETE requests. Example:
  app.delete('/', (req, res) => { res.send('DELETE request to homepage') })

app.get(path, callback...): Routes GET requests. Example:
  app.get('/', (req, res) => { res.send('GET request to homepage') })

app.post(path, callback...): Routes POST requests. Example:
  app.post('/', (req, res) => { res.send('POST request to homepage') })

app.put(path, callback...): Routes PUT requests. Example:
  app.put('/', (req, res) => { res.send('PUT request to homepage') })

# Utility Methods
app.disable(name), app.enable(name): Toggle Boolean settings.
app.disabled(name), app.enabled(name): Check status of settings.
app.engine(ext, callback): Register a template engine. E.g.,
  app.engine('pug', require('pug').__express)
app.get(name): Get setting value; app.set(name, value): Set a configuration.

# Additional API Details
Methods also include app.render(view, [locals], callback) for rendering views as strings
and app.route(path) to streamline multiple HTTP method attachments for a route.

# Date Retrieved: 2023-10-xx
Attribution: Express API documentation crawled from expressjs.com; Data Size: 14956746 bytes; Links: 16382.

## Attribution
- Source: Express API Reference
- URL: https://expressjs.com/en/api.html
- License: MIT License
- Crawl Date: 2025-04-28T23:47:32.190Z
- Data Size: 14956746 bytes
- Links Found: 16382

## Retrieved
2025-04-28
