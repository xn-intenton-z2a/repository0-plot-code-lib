# EXPRESS_ROUTING

## Crawl Summary
Application methods app.METHOD(path, ...handlers) signature returns Application. Supported methods: get, post, put, delete, patch, options, head, all, use. Route path can be string, array, RegExp, array. Named parameters :name with optional (regex). Handler signature (req, res, next). express.Router(options) options: caseSensitive false, mergeParams false, strict false. app.route(path) chainable methods. Response methods and signatures as listed.

## Normalised Extract
Table of Contents
1 Route Definition
2 Route Methods
3 Route Paths
4 Route Parameters
5 Route Handlers
6 Response Methods
7 app.route
8 express.Router

1 Route Definition
app.METHOD(path, ...handlers)    METHOD from get, post, put, delete, patch, options, head, all, use    returns Application instance

2 Route Methods
Signature
Application.METHOD(path: string|string[]|RegExp|RegExp[], ...handlers: RequestHandler[]): Application

3 Route Paths
Types
string exact match
string pattern (?, +, *, parentheses)
RegExp literal
Examples
app.get('/about', handler)
app.get('/ab?cd', handler)
app.get(/.*fly$/, handler)

4 Route Parameters
Syntax
:/paramName
With regex constraint
:(\w+)(regex)
Example
app.get('/users/:userId(\d+)', (req, res) => res.send(req.params))
Access req.params.userId

5 Route Handlers
Signature
RequestHandler = (req: Request, res: Response, next: NextFunction) => void
Forms
single function
array of functions
combination of functions and arrays
Examples
app.get('/example/a', handlerA)
app.get('/example/b', preflight, handlerB)
app.get('/example/c', [cb0, cb1, cb2])

6 Response Methods
res.download(path[, filename][, options][, fn])
res.end([data][, encoding])
res.json(body)
res.jsonp(body)
res.redirect([status,] path)
res.render(view[, locals][, callback])
res.send(body)
res.sendFile(path[, options][, fn])
res.sendStatus(statusCode)

7 app.route
Chainable handlers on a single path
app.route('/book')
  .get(getHandler)
  .post(postHandler)
  .put(putHandler)

8 express.Router
Signature
express.Router([options]) -> Router
Options
type RouterOptions = {
  caseSensitive?: boolean  default false
  mergeParams?: boolean    default false
  strict?: boolean         default false
}
Example
const router = express.Router({ mergeParams: true })
router.use(timeLog)
router.get('/', homeHandler)
router.get('/about', aboutHandler)
module.exports = router
app.use('/birds', router)

## Supplementary Details
RouterOptions default values: caseSensitive false, mergeParams false, strict false. When nesting routers under paths with parameters, set mergeParams true to preserve req.params from parent. Mounting order: app.use(middleware) before routes. Multiple static directories: app.use(express.static('public')); app.use(express.static('files')). Virtual path prefix: app.use('/static', express.static(path.join(__dirname, 'public'))).
Use reverse proxy cache for static assets performance.
Error-handling middleware signature: (err, req, res, next) with four arguments.
404 handler placement: app.use((req, res) => res.status(404).send("Not found")) at bottom.


## Reference Details
Application Methods
app.get(path, ...handlers)
app.post(path, ...handlers)
app.put(path, ...handlers)
app.delete(path, ...handlers)
app.patch(path, ...handlers)
app.options(path, ...handlers)
app.head(path, ...handlers)
app.all(path, ...handlers)
app.use([path], ...handlers)
Signature
(path: string|string[]|RegExp|RegExp[], ...handlers: RequestHandler[]) => Application

RequestHandler and NextFunction
type RequestHandler = (req: Request, res: Response, next: NextFunction) => void
type NextFunction = (err?: any) => void

Response methods
res.download(path: string, filename?: string, options?: object, callback?: (err: any) => void): void
res.end(data?: any, encoding?: string): void
res.json(body: any): void
res.jsonp(body: any): void
res.redirect(statusOrPath: number|string, path?: string): void
res.render(view: string, locals?: object, callback?: (err: any, html: string) => void): void
res.send(body: any): void
res.sendFile(path: string, options?: { root?: string; headers?: object; dotfiles?: string; maxAge?: number|string }, callback?: (err: any) => void): void
res.sendStatus(statusCode: number): void

express.Router
Signature
express.Router(options?: { caseSensitive?: boolean; mergeParams?: boolean; strict?: boolean }): Router
Router.METHOD same as app.METHOD on Router instance

Example Implementation Pattern
1 mkdir myapp && cd myapp
2 npm init -y
3 npm install express
4 Create app.js with:
   const express = require('express')
   const app = express()
   app.use(express.json())
   const birdsRouter = require('./birds')
   app.use('/birds', birdsRouter)
   app.listen(3000)
5 Create birds.js:
   const express = require('express')
   const router = express.Router({ mergeParams: true })
   router.use((req, res, next) => { console.log(Date.now()); next() })
   router.get('/', (req, res) => res.send('Home'))
   router.get('/:id', (req, res) => res.json({ id: req.params.id }))
   module.exports = router

Best Practices
Place error-handling middleware after all routes. Use caseSensitive and strict routing when exact matching required. Use express.json() before routes for JSON parsing. Use next('route') to skip to next matching route.

Troubleshooting
Problem: Route not matched
Command: curl -i http://localhost:3000/unknown
Expected: HTTP/1.1 404 Not Found
Actual: hangs
Check: 404 handler placement, missing next()

Problem: req.params empty
Check mergeParams option if nested router under params path.


## Information Dense Extract
app.METHOD(path: string|string[]|RegExp|RegExp[], ...handlers: RequestHandler[]) => Application Supported METHODS get post put delete patch options head all use. RequestHandler(req: Request,res: Response,next: NextFunction). Route path types string exact, string pattern (?,+,*,()), RegExp. Params :name or :name(regex). Access req.params.name. express.Router(options:{caseSensitive?:boolean,mergeParams?:boolean,strict?:boolean}) returns Router. Response methods download(path,filename?,options?,cb?),end(data?,enc?),json(body),jsonp(body),redirect(statusOrPath,path?),render(view,locals?,cb?),send(body),sendFile(path,options?,cb?),sendStatus(statusCode). app.route(path).get(...).post(...).put(...). Error handler signature(err,req,res,next). 404 handler: placement at bottom. Best practices: mergeParams for nested, express.json() before routes, next('route') skip handlers. Troubleshooting: verify handler order and path matching.

## Sanitised Extract
Table of Contents
1 Route Definition
2 Route Methods
3 Route Paths
4 Route Parameters
5 Route Handlers
6 Response Methods
7 app.route
8 express.Router

1 Route Definition
app.METHOD(path, ...handlers)    METHOD from get, post, put, delete, patch, options, head, all, use    returns Application instance

2 Route Methods
Signature
Application.METHOD(path: string|string[]|RegExp|RegExp[], ...handlers: RequestHandler[]): Application

3 Route Paths
Types
string exact match
string pattern (?, +, *, parentheses)
RegExp literal
Examples
app.get('/about', handler)
app.get('/ab?cd', handler)
app.get(/.*fly$/, handler)

4 Route Parameters
Syntax
:/paramName
With regex constraint
:('w+)(regex)
Example
app.get('/users/:userId('d+)', (req, res) => res.send(req.params))
Access req.params.userId

5 Route Handlers
Signature
RequestHandler = (req: Request, res: Response, next: NextFunction) => void
Forms
single function
array of functions
combination of functions and arrays
Examples
app.get('/example/a', handlerA)
app.get('/example/b', preflight, handlerB)
app.get('/example/c', [cb0, cb1, cb2])

6 Response Methods
res.download(path[, filename][, options][, fn])
res.end([data][, encoding])
res.json(body)
res.jsonp(body)
res.redirect([status,] path)
res.render(view[, locals][, callback])
res.send(body)
res.sendFile(path[, options][, fn])
res.sendStatus(statusCode)

7 app.route
Chainable handlers on a single path
app.route('/book')
  .get(getHandler)
  .post(postHandler)
  .put(putHandler)

8 express.Router
Signature
express.Router([options]) -> Router
Options
type RouterOptions = {
  caseSensitive?: boolean  default false
  mergeParams?: boolean    default false
  strict?: boolean         default false
}
Example
const router = express.Router({ mergeParams: true })
router.use(timeLog)
router.get('/', homeHandler)
router.get('/about', aboutHandler)
module.exports = router
app.use('/birds', router)

## Original Source
Express Official Documentation
https://expressjs.com/

## Digest of EXPRESS_ROUTING

# Routing
Content retrieved on 2024-06-20
Source: https://expressjs.com/
Data Size: 7337000 bytes, Links Found: 17570

Define application endpoints and HTTP methods with express Application methods.

## Route Methods

Signature:

Application.METHOD(path, ...handlers) -> Application

Supported METHODS: get, post, put, delete, patch, options, head, all, use

## Route Paths

Accepts string, array of strings, RegExp, array of RegExp.

Examples:

app.get('/about', handler)
app.get('/ab?cd', handler)
app.get(/.*fly$/, handler)

## Route Parameters

Syntax: named segments :paramName, optional regex constraint in parentheses.

Example:

app.get('/users/:userId(\d+)', handler)
Values accessed via req.params.userId

## Route Handlers

Signature of each handler:

(req: Request, res: Response, next: NextFunction) => void

Accepts single function, array of functions, or combination.

## Response Methods

res.download(path[, filename][, options][, callback])
res.end([data][, encoding])
res.json(body)
res.jsonp(body)
res.redirect([status,] path)
res.render(view[, locals][, callback])
res.send(body)
res.sendFile(path[, options][, callback])
res.sendStatus(statusCode)

## app.route()

Chainable route handlers for a single path:

app.route('/book')
  .get(getHandler)
  .post(postHandler)
  .put(putHandler)

## express.Router

Signature:

express.Router([options]) -> Router instance

Options:
  caseSensitive: boolean (default false)
  mergeParams: boolean (default false)
  strict: boolean (default false)

Usage:

const router = express.Router({ mergeParams: true })
router.use(middleware)
router.get('/', handler)
module.exports = router

app.use('/path', router)


## Attribution
- Source: Express Official Documentation
- URL: https://expressjs.com/
- License: License: MIT
- Crawl Date: 2025-05-10T12:01:30.750Z
- Data Size: 7337000 bytes
- Links Found: 17570

## Retrieved
2025-05-10
