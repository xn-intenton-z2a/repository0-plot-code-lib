# STATIC_FILES

## Crawl Summary
express.static middleware signature, parameters: root, options; usage patterns: single directory, multiple directories resolution order; virtual path mounting; absolute path resolution; reverse proxy recommendation for performance

## Normalised Extract
Table of Contents
1. express.static Signature and Parameters
2. Single Directory Serving
3. Multiple Directory Serving and Precedence
4. Virtual Path Prefix Mounting
5. Absolute Path Resolution
6. Performance Best Practice

1. express.static Signature and Parameters
   express.static(root, [options])
   root: path to directory serving assets
   options: serve-static configuration object

2. Single Directory Serving
   Use express.static with app.use to serve files from a single folder
   Example:
   app.use(express.static('public'))
   URLs map directly to public/<file>

3. Multiple Directory Serving and Precedence
   Call express.static multiple times
   app.use(express.static('public'))
   app.use(express.static('files'))
   Resolution order: public first, then files

4. Virtual Path Prefix Mounting
   Prefix URLs without altering directory structure
   app.use('/static', express.static('public'))
   URLs: /static/<file> maps to public/<file>

5. Absolute Path Resolution
   Prevent relative path issues when running from different cwd
   Example:
   const path = require('path')
   app.use('/static', express.static(path.join(__dirname, 'public')))

6. Performance Best Practice
   Deploy reverse proxy cache (nginx, Varnish) in front of Express to cache and serve static assets

## Supplementary Details
serve-static options object properties:
- dotfiles: 'allow' | 'deny' | 'ignore'. Default: 'ignore'.
- etag: boolean. Enable ETag header. Default: true.
- extensions: string array. Fallback file extensions. Default: undefined.
- index: boolean or string or string array. Default: 'index.html'.
- lastModified: boolean. Enable Last-Modified header. Default: true.
- maxAge: number or string. Sets Cache-Control max-age in ms. Default: 0.
- redirect: boolean. Redirect to trailing slash. Default: true.
- setHeaders: function(res, path, stat). Custom headers per file.

Implementation Steps:
1. require express and path modules.
2. Create app instance.
3. Configure static middleware using absolute paths.
4. Chain calls for multiple folders.
5. Mount on virtual path if needed.
6. Configure serve-static options for caching.
7. Deploy behind reverse proxy.


## Reference Details
// express.static API specification
express.static(root: string, options?: {
  dotfiles?: 'allow' | 'deny' | 'ignore',
  etag?: boolean,
  extensions?: string[],
  index?: boolean | string | string[],
  lastModified?: boolean,
  maxAge?: number | string,
  redirect?: boolean,
  setHeaders?: (res: import('express').Response, filePath: string, stat: import('fs').Stats) => void
}): import('express').RequestHandler

// Example code
const express = require('express')
const path = require('path')
const app = express()

// Serve public with caching
app.use(
  express.static(
    path.join(__dirname, 'public'),
    {
      dotfiles: 'ignore',
      etag: true,
      lastModified: true,
      maxAge: '1d',
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'public, max-age=0')
        }
      }
    }
  )
)

// Multiple dirs
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'files')))

// Virtual prefix
app.use('/static', express.static(path.join(__dirname, 'public')))

// Start server
app.listen(3000, () => console.log('Server on port 3000'))

// Troubleshooting Procedures
// 1. 404 errors: verify file exists under root and URL path matches
//    $ curl -I http://localhost:3000/js/app.js
//    Expected: HTTP/1.1 200 OK; Content-Type: application/javascript
// 2. Check headers for caching
//    $ curl -I http://localhost:3000/css/style.css
//    Expect: Cache-Control, ETag, Last-Modified
// 3. Debug logging
//    $ DEBUG=express:static node app.js
//    Observe static middleware logs

## Information Dense Extract
express.static(root:string,options?):RequestHandler; options:dotfiles('allow'|'deny'|'ignore'),etag(bool),lastModified(bool),maxAge(ms|string),index(bool|string|string[]),extensions(string[]),redirect(bool),setHeaders(fn). Usage: app.use(express.static('public')); multi-dir precedence: order of app.use calls; virtual mount: app.use('/static',express.static(...)); use path.join(__dirname,'dir') for absolute; serve-static headers: Cache-Control:max-age, ETag, Last-Modified; best practice: reverse proxy cache; troubleshooting: curl -I for 200, headers; DEBUG=express:static for logs.

## Sanitised Extract
Table of Contents
1. express.static Signature and Parameters
2. Single Directory Serving
3. Multiple Directory Serving and Precedence
4. Virtual Path Prefix Mounting
5. Absolute Path Resolution
6. Performance Best Practice

1. express.static Signature and Parameters
   express.static(root, [options])
   root: path to directory serving assets
   options: serve-static configuration object

2. Single Directory Serving
   Use express.static with app.use to serve files from a single folder
   Example:
   app.use(express.static('public'))
   URLs map directly to public/<file>

3. Multiple Directory Serving and Precedence
   Call express.static multiple times
   app.use(express.static('public'))
   app.use(express.static('files'))
   Resolution order: public first, then files

4. Virtual Path Prefix Mounting
   Prefix URLs without altering directory structure
   app.use('/static', express.static('public'))
   URLs: /static/<file> maps to public/<file>

5. Absolute Path Resolution
   Prevent relative path issues when running from different cwd
   Example:
   const path = require('path')
   app.use('/static', express.static(path.join(__dirname, 'public')))

6. Performance Best Practice
   Deploy reverse proxy cache (nginx, Varnish) in front of Express to cache and serve static assets

## Original Source
Express Official Documentation
https://expressjs.com/

## Digest of STATIC_FILES

# Serving Static Files in Express

Express built-in middleware express.static serves static assets.

## Signature

```javascript
express.static(root, [options])
```
- root: string. Root directory for static files.
- options: object. Configuration for serve-static.

## Basic Usage

```javascript
const express = require('express')
const app = express()

// Serve from public directory
app.use(express.static('public'))

// Serve multiple directories in order
two
app.use(express.static('public'))
app.use(express.static('files'))
```

## Virtual Path Prefix

```javascript
app.use('/static', express.static('public'))
```
Access assets under /static path.

## Absolute Path Resolution

```javascript
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```

## Best Practice

- Use a reverse proxy cache (e.g., nginx) for improved performance of static assets.

## Retrieved

Date: 2024-07-07
Data Size: 1250266 bytes
Links Found: 8230

## Attribution
- Source: Express Official Documentation
- URL: https://expressjs.com/
- License: License: MIT
- Crawl Date: 2025-05-10T06:02:24.460Z
- Data Size: 1250266 bytes
- Links Found: 8230

## Retrieved
2025-05-10
