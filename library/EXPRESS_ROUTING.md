# EXPRESS_ROUTING

## Crawl Summary
Express routing supports HTTP methods via app.METHOD(path, callback). Routes accept simple strings, patterns, or regular expressions. Route parameters populate req.params. Middleware chaining is enabled by next() in multi-callback routes. express.Router allows modular route definitions. Key response methods include res.send, res.json, and res.sendFile. Configurations include express.static for serving files and app.route for chained handlers.

## Normalised Extract
Table of Contents:
1. Routing Basics
   - API: app.get(path, callback), app.post(path, callback) etc.
   - Callback signature: (req, res, next)
2. Route Paths and Patterns
   - Strings, patterns: /, /about, /ab?cd, /ab+cd, /ab*cd, /ab(cd)?e
   - Regular Expressions: /a/, /.*fly$/
3. Route Parameters
   - Format: /users/:userId/books/:bookId; captured in req.params
   - Combined literals: /flights/:from-:to, /plantae/:genus.:species
   - Regex constraint: /user/:userId(\d+)
4. Multiple Callback Handlers
   - Single function vs multiple functions using next()
   - Arrays of callbacks and mixed function arrays
5. Chained Handlers with app.route()
   - Single location definition for GET, POST, PUT
6. Modular Routing with express.Router
   - Define mini-apps with Router; use middleware specific to router
   - Merge parameters option: express.Router({ mergeParams: true })
7. Response Methods
   - Methods: res.send, res.json, res.download, res.redirect, res.render, res.sendFile, res.sendStatus, res.end

Each topic includes exact method signatures and configuration examples for immediate developer implementation.

## Supplementary Details
Routing API Specifications:
- app.get(path: string | RegExp, callback: (req: Request, res: Response, next?: NextFunction) => void): void
- app.post(path: string | RegExp, callback: ...): void
- app.all(path: string | RegExp, callback: ...): void
- express.Router(options?: { mergeParams?: boolean }): Router

Configuration Options for express.static:
- express.static(root: string, options?: {
    dotfiles?: string (default: 'ignore'), 
    etag?: boolean (default: true), 
    index?: boolean|string|Array (default: 'index.html'),
    maxAge?: number (default: 0), 
    redirect?: boolean (default: true), 
    setHeaders?: function(res, path, stat)})

Implementation Steps:
1. Define routes using app.METHOD and specify exact path patterns.
2. Use middleware by specifying next() in callbacks.
3. For modular routes, create a new Router instance, attach middleware and routes, and mount using app.use.
4. Use app.route(path) to chain HTTP method definitions in a concise manner.

Best Practices:
- Order routes from most specific to generic.
- Escape regex characters in route paths as needed (e.g. \$).
- Avoid use of query strings in route matching; they are not part of the route.
- Test routes using Express Playground Router or by unit tests.

Troubleshooting:
- If 404 errors occur, verify route path and middleware order.
- Use console.log in middleware to debug route matching.
- Validate regular expressions for route parameters and patterns.
- Check Express version differences especially between v4 and v5 for pattern handling.

## Reference Details
API Specifications:
1. app.METHOD(path: string|RegExp, callback: (req: Request, res: Response, next?: NextFunction) => void): void
   - Example: app.get('/', (req, res) => { res.send('hello world'); });
2. app.all(path: string|RegExp, callback: (req: Request, res: Response, next: NextFunction) => void): void
   - Example: app.all('/secret', (req, res, next) => { console.log('Accessing secret'); next(); });
3. express.Router(options?: { mergeParams?: boolean }): Router
   - Method usage:
     const router = express.Router({ mergeParams: true });
     router.get('/', (req, res) => { res.send('Router home'); });
4. express.static(root: string, options?: { dotfiles?: string, etag?: boolean, index?: string|Array<string>, maxAge?: number, redirect?: boolean, setHeaders?: (res: Response, path: string, stat: any) => void }): RequestHandler
   - Example: app.use('/static', express.static(path.join(__dirname, 'public')));

SDK Method Signatures:
- function app.get(path: string|RegExp, ...handlers: (req: Request, res: Response, next?: NextFunction) => void): App;
- function app.post(path: string|RegExp, ...handlers: (req: Request, res: Response, next?: NextFunction) => void): App;

Implementation Pattern (Chained Middleware):
const cb0 = (req, res, next) => { console.log('CB0'); next(); };
const cb1 = (req, res, next) => { console.log('CB1'); next(); };
app.get('/example', [cb0, cb1], (req, res) => { res.send('Final Response'); });

Configuration Options with Values:
- For express.static: root directory, maxAge: 0 by default, redirect: true by default.
- For express.Router: mergeParams default is false.

Best Practices:
- Always call next() in middleware if not ending the response.
- Place error handling middleware after all routes: app.use((err, req, res, next) => { console.error(err.stack); res.status(500).send('Something broke!'); });

Troubleshooting Procedures:
1. Verify route paths are correct. Command: node app.js and check logs for route matching.
2. To test route parameter handling, invoke: curl http://localhost:3000/users/42/books/101 and expect JSON with userId:42, bookId:101.
3. Use debugging logs in middleware to confirm execution order.

Detailed Code Example:
// app.js
const express = require('express');
const path = require('path');
const app = express();

// Basic GET Route
app.get('/', (req, res) => { res.send('Hello World!'); });

// Chained route handling with middleware
const middlewareA = (req, res, next) => { console.log('Middleware A'); next(); };
const middlewareB = (req, res, next) => { console.log('Middleware B'); next(); };
app.get('/chain', [middlewareA, middlewareB], (req, res) => { res.send('Chain complete'); });

// Router setup
const router = express.Router({ mergeParams: true });
router.use((req, res, next) => { console.log('Router Middleware'); next(); });
router.get('/info', (req, res) => { res.send('Router Info'); });
app.use('/router', router);

// Serving static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Start server
const port = 3000;
app.listen(port, () => { console.log(`Server running on port ${port}`); });

## Information Dense Extract
Express routing: use app.get/post/put/delete/all with path: string|RegExp and callbacks (req, res, next). Route parameters with :param populate req.params. Supports patterns (/ab?cd, /ab+cd, /ab*cd, /ab(cd)?e) and regex (/a/, /.*fly$/). Middleware chaining: multiple callbacks with next() invocation. Chained routes via app.route('/path'). Modular routing via express.Router({ mergeParams: boolean }). Response methods: res.send, res.json, res.download, res.redirect, res.render, res.sendFile, res.sendStatus, res.end. API specs: function app.get(path, ...handlers): App; express.static(root, options) with options: dotfiles (default 'ignore'), etag (true), index ('index.html'), maxAge (0), redirect (true). Best practices: order routes specifically; use error middleware; test with curl; log middleware execution.

## Sanitised Extract
Table of Contents:
1. Routing Basics
   - API: app.get(path, callback), app.post(path, callback) etc.
   - Callback signature: (req, res, next)
2. Route Paths and Patterns
   - Strings, patterns: /, /about, /ab?cd, /ab+cd, /ab*cd, /ab(cd)?e
   - Regular Expressions: /a/, /.*fly$/
3. Route Parameters
   - Format: /users/:userId/books/:bookId; captured in req.params
   - Combined literals: /flights/:from-:to, /plantae/:genus.:species
   - Regex constraint: /user/:userId('d+)
4. Multiple Callback Handlers
   - Single function vs multiple functions using next()
   - Arrays of callbacks and mixed function arrays
5. Chained Handlers with app.route()
   - Single location definition for GET, POST, PUT
6. Modular Routing with express.Router
   - Define mini-apps with Router; use middleware specific to router
   - Merge parameters option: express.Router({ mergeParams: true })
7. Response Methods
   - Methods: res.send, res.json, res.download, res.redirect, res.render, res.sendFile, res.sendStatus, res.end

Each topic includes exact method signatures and configuration examples for immediate developer implementation.

## Original Source
Express Routing and Middleware Guide
https://expressjs.com/en/guide/routing.html

## Digest of EXPRESS_ROUTING

# EXPRESS ROUTING

## Overview
Express routing defines how an application responds to client requests at specific URIs//endpoints. Using methods such as app.get(), app.post(), and app.all(), routes are established with associated callback functions. Each route can accept one or more handler functions with the signature (req, res, next) and allows middleware chaining using next().

## Route Methods
- app.get(path, callback): Handles GET requests.
- app.post(path, callback): Handles POST requests.
- app.put(path, callback): Handles PUT requests.
- app.delete(path, callback): Handles DELETE requests.
- app.all(path, callback): Handles all HTTP methods.
- app.use(path, middleware): Mounts middleware functions.

Example:

const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});

## Route Paths & Patterns
Routes can be defined with string paths, string patterns, or regular expressions. Special characters (?, +, *, etc.) allow flexible matching:

Examples:
- String: app.get('/', ...)
- Pattern: app.get('/ab?cd', ...), app.get('/ab+cd', ...), app.get('/ab*cd', ...), app.get('/ab(cd)?e', ...)
- RegExp: app.get(/a/, ...), app.get(/.*fly$/, ...)

## Route Parameters
Route parameters are specified using a colon prefix. They are captured in req.params.

Examples:
- app.get('/users/:userId/books/:bookId', (req, res) => { res.send(req.params); });
- With literals combined: /flights/:from-:to and /plantae/:genus.:species
- Restriction with RegExp: app.get('/user/:userId(\d+)', ...)

## Multiple Callback Handlers
Routes can have multiple functions to handle middleware chaining.

Examples:
- Single callback: app.get('/example/a', (req, res) => { res.send('Hello from A!'); });
- Multiple callbacks:
  app.get('/example/b', (req, res, next) => {
    console.log('Processing request');
    next();
  }, (req, res) => { res.send('Hello from B!'); });

## Chained Route Handlers Using app.route()
Routes can be chained:

app.route('/book')
  .get((req, res) => { res.send('Get a random book'); })
  .post((req, res) => { res.send('Add a book'); })
  .put((req, res) => { res.send('Update the book'); });

## Using express.Router
Express.Router provides modular route handling. A Router instance is a complete middleware and routing system.

Example:

// birds.js
const express = require('express');
const router = express.Router();

const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
};

router.use(timeLog);
router.get('/', (req, res) => { res.send('Birds home page'); });
router.get('/about', (req, res) => { res.send('About birds'); });

module.exports = router;

Then mounted in main app:

const birds = require('./birds');
app.use('/birds', birds);

## Response Methods
Response methods terminate the request-response cycle:
- res.send()
- res.json()
- res.sendFile()
- res.redirect()
- res.render()
- res.download()
- res.sendStatus(code)
- res.end()

## Configuration & Best Practices
- Use express.static(path, [options]) for serving static files.
- For multiple directories, mount express.static multiple times.
- To avoid routing conflicts, ensure middleware ordering from specific to general.
- In Express 5, some pattern matching characters and regex usage change; consult migration guides.

Retrieved: 2023-10-05
Attribution: Data Size 7544456 bytes, Links Found: 19186

## Attribution
- Source: Express Routing and Middleware Guide
- URL: https://expressjs.com/en/guide/routing.html
- License: MIT License
- Crawl Date: 2025-04-26T22:47:28.139Z
- Data Size: 7544456 bytes
- Links Found: 19186

## Retrieved
2025-04-26
