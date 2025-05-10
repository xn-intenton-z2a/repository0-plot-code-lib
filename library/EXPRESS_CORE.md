# EXPRESS_CORE

## Crawl Summary
Node requirements: Express 4.x requires Node>=0.10; 5.x requires Node>=18. Install: npm install express --save (--no-save). Application creation: express() returns app instance. Listen: app.listen(port, callback). Routing: app.METHOD(path, handler), METHODS=get,post,put,delete,all; multiple handlers supported. Static files: express.static(root,[options]); app.use(express.static('public')); mount with prefix and multiple directories. Error handling: 404 middleware uses signature (req,res,next); error middleware uses (err,req,res,next). Router: express.Router({mergeParams:boolean}); define router.use, router.METHOD; mount with app.use('/path',router). Response methods include res.send,res.json,res.jsonp,res.redirect,res.render,res.sendFile,res.download,res.end,res.sendStatus.

## Normalised Extract
Table of Contents
1 Installation Requirements
2 Hello World Setup
3 Routing Methods
4 Static File Serving
5 Error Handling
6 Router Module

1 Installation Requirements
- Express v4 requires Node>=0.10
- Express v5 requires Node>=18
- Commands:
  mkdir myapp; cd myapp
  npm init (entry point: app.js)
  npm install express --save  (--no-save for temp)

2 Hello World Setup
In app.js:
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => { res.send('Hello World!') })
app.listen(port, () => { console.log('Example app listening on port', port) })

Run server:
node app.js

3 Routing Methods
Signature: app.METHOD(path, ...handlers)
Supported METHODS: get, post, put, delete, all
Multiple handlers: app.get(path, fn1, fn2)

4 Static File Serving
Signature: express.static(root, [options])
Serve 'public' directory:
app.use(express.static('public'))
Multiple dirs order:
app.use(express.static('public'))
app.use(express.static('files'))
Virtual prefix:
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

5 Error Handling
404 handler (no err param):
app.use((req, res) => { res.status(404).send('Not Found') })
Error middleware (4 params):
app.use((err, req, res, next) => { res.status(500).send('Error') })

6 Router Module
Create router:
const router = express.Router({ mergeParams: true })
Load middleware: router.use(fn)
Define routes: router.get('/', handler)
Mount: app.use('/prefix', router)

## Supplementary Details
Project setup:
1 mkdir myapp; cd myapp
2 npm init (set entry point to app.js)
3 npm install express --save

Express Generator (Node>=8.2):
npx express-generator [options]
Options:
  -h --help        show help
  --version        show version
  -e --ejs         add ejs engine
  --hbs            add handlebars
  --pug            add pug
  -v --view <eng>  view engine (ejs|hbs|hjs|jade|pug|twig|vash)
  -c --css <eng>   css engine (less|stylus|compass|sass)
  --git            add .gitignore
  -f --force       force on non-empty dir
  --no-view        skip view engine
Example: npx express-generator --view=pug myapp
cd myapp; npm install
Start app:
Mac/Linux: DEBUG=myapp:* npm start
Windows CMD: set DEBUG=myapp:* & npm start
PowerShell: $env:DEBUG='myapp:*'; npm start

Static serving: use absolute paths with path.join(__dirname,'public')
Performance: use reverse proxy cache

## Reference Details
API Specifications

express(): Application instance

express.static(root: string, options?: { dotfiles?: string, etag?: boolean, extensions?: string[], index?: boolean|string|string[], lastModified?: boolean, maxAge?: number|string, redirect?: boolean, setHeaders?: (res, path, stat) => void }): HandlerFunction

express.Router(options?: { mergeParams?: boolean }): Router

app.get(path: string|RegExp, ...handlers: RequestHandler[]): Application
app.post(path: string|RegExp, ...handlers: RequestHandler[]): Application
app.put(path: string|RegExp, ...handlers: RequestHandler[]): Application
app.delete(path: string|RegExp, ...handlers: RequestHandler[]): Application
app.all(path: string|RegExp, ...handlers: RequestHandler[]): Application
app.use(path?: string|Router|RequestHandler, ...handlers: RequestHandler[]): Application
app.listen(port: number|string, hostname?: string, backlog?: number, callback?: () => void): Server

Response methods:
res.send(body: string|object|Buffer): void
res.json(body: any): void
res.jsonp(body: any): void
res.redirect(status: number, path: string): void
res.redirect(path: string): void
res.render(view: string, locals?: object, callback?: (err: Error, html: string) => void): void
res.sendFile(path: string, options?: object, callback?: (err: Error) => void): void
res.download(path: string, filename?: string, options?: object, callback?: (err: Error) => void): void
res.end(data?: any, encoding?: string): void
res.sendStatus(statusCode: number): void

Code Examples included above

Best Practices
- Use absolute paths for static dirs
- Order middleware declarations explicitly
- Place 404 handler after all routes
- Use error-handling middleware with 4 args

Troubleshooting
- Node version mismatch: node -v (should be>=18 for Express5)
- Port in use: lsof -i :3000; kill <pid>
- Reset deps: rm -rf node_modules package-lock.json; npm install
- Syntax check: node --check app.js

## Information Dense Extract
Node>=0.10 (Express4), Node>=18 (Express5); npm install express --save; express(): Application; app.METHOD(path,...handlers): get,post,put,delete,all; app.all, app.use; express.static(root,[options]) returns Handler; options={dotfiles,etag,extensions,index,lastModified,maxAge,redirect,setHeaders}; Router({mergeParams}) returns Router; response methods: send, json, jsonp, redirect, render, sendFile, download, end, sendStatus; HelloWorld, routing, static, error, router patterns; express-generator CLI options; start via DEBUG=name:* npm start; troubleshooting commands node -v, lsof, kill, reinstall modules

## Sanitised Extract
Table of Contents
1 Installation Requirements
2 Hello World Setup
3 Routing Methods
4 Static File Serving
5 Error Handling
6 Router Module

1 Installation Requirements
- Express v4 requires Node>=0.10
- Express v5 requires Node>=18
- Commands:
  mkdir myapp; cd myapp
  npm init (entry point: app.js)
  npm install express --save  (--no-save for temp)

2 Hello World Setup
In app.js:
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => { res.send('Hello World!') })
app.listen(port, () => { console.log('Example app listening on port', port) })

Run server:
node app.js

3 Routing Methods
Signature: app.METHOD(path, ...handlers)
Supported METHODS: get, post, put, delete, all
Multiple handlers: app.get(path, fn1, fn2)

4 Static File Serving
Signature: express.static(root, [options])
Serve 'public' directory:
app.use(express.static('public'))
Multiple dirs order:
app.use(express.static('public'))
app.use(express.static('files'))
Virtual prefix:
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

5 Error Handling
404 handler (no err param):
app.use((req, res) => { res.status(404).send('Not Found') })
Error middleware (4 params):
app.use((err, req, res, next) => { res.status(500).send('Error') })

6 Router Module
Create router:
const router = express.Router({ mergeParams: true })
Load middleware: router.use(fn)
Define routes: router.get('/', handler)
Mount: app.use('/prefix', router)

## Original Source
Express Official Documentation
https://expressjs.com/

## Digest of EXPRESS_CORE

# Installation
Express 4.x requires Node.js 0.10 or higher
Express 5.x requires Node.js 18 or higher

Install Express and save in dependencies:
$ npm install express --save
Temporary install (no save):
$ npm install express --no-save

# Hello World Example
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log('Example app listening on port', port)
})

# Basic Routing
Route definition: app.METHOD(PATH, HANDLER)
Supported METHODS: get, post, put, delete, all

Examples:
app.get('/', (req, res) => { res.send('Hello World!') })
app.post('/', (req, res) => { res.send('Got a POST request') })
app.put('/user', (req, res) => { res.send('Got a PUT request at /user') })
app.delete('/user', (req, res) => { res.send('Got a DELETE request at /user') })
app.all('/secret', (req, res, next) => { next() })

# Serving Static Files
Function signature: express.static(root, [options])
  root: directory path to serve static assets

Basic usage:
app.use(express.static('public'))

Multiple directories:
app.use(express.static('public'))
app.use(express.static('files'))

Virtual path prefix:
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

# Error Handling
404 response handler (no error object):
app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!')
})

Error-handling middleware signature (with four args):
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

# Router Module
Create router with optional mergeParams:
const express = require('express')
const router = express.Router({ mergeParams: true })

Load router-specific middleware:
router.use((req, res, next) => { /* ... */ next() })

Define routes:
router.get('/', (req, res) => { res.send('Home') })
router.get('/about', (req, res) => { res.send('About') })

Mount router in main app:
const birds = require('./birds')
app.use('/birds', birds)

## Attribution
- Source: Express Official Documentation
- URL: https://expressjs.com/
- License: License: MIT
- Crawl Date: 2025-05-10T11:03:05.682Z
- Data Size: 6952885 bytes
- Links Found: 16342

## Retrieved
2025-05-10
