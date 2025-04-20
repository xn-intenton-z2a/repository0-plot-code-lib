# EXPRESS

## Crawl Summary
Express 5.1.0, the default version on npm, includes detailed installation instructions using npm with automatic dependency registration (with npm 5.0+). It provides a minimalist example app that listens on port 3000 and responds to '/' with 'Hello World!'. The documentation covers usage of express-generator for scaffolding full applications, defines routing patterns including basic get/post routes, dynamic route parameters, regular expressions, chained route handling, and using middleware. Details about serving static files via express.static with options for virtual path prefixes and absolute directory paths are also provided along with various troubleshooting and best practices for handling 404 responses and errors.

## Normalised Extract
## Table of Contents
1. Installation
2. Hello World App
3. Express Generator
4. Routing
   - Basic Routes
   - Advanced Routes
   - Chained Routes
   - Route Parameters
5. Serving Static Files
6. Examples
7. FAQ

---

### 1. Installation
- Use `npm install express --save` to add Express to your project.
- Requirements:
  - Express 4.x: Node.js 0.10+
  - Express 5.x: Node.js 18+

### 2. Hello World App

Code Example:
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

### 3. Express Generator

- Use the command:
  ```bash
  npx express-generator
  ```
- To generate app with Pug:
  ```bash
  express --view=pug myapp
  cd myapp
  npm install
  ```
- Run the app using:
  ```bash
  DEBUG=myapp:* npm start
  ```
  or Windows equivalents.

### 4. Routing

#### Basic Routes
```javascript
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.send('Got a POST request');
});
```

#### Advanced Routes & Multiple Handlers
```javascript
const cb0 = (req, res, next) => { console.log('CB0'); next(); };
const cb1 = (req, res, next) => { console.log('CB1'); next(); };
const cb2 = (req, res) => { res.send('Hello from C!'); };

app.get('/example/c', [cb0, cb1, cb2]);
```

#### Chained Routes using app.route()
```javascript
app.route('/book')
  .get((req, res) => res.send('Get a random book'))
  .post((req, res) => res.send('Add a book'))
  .put((req, res) => res.send('Update the book'));
```

#### Route Parameters
```javascript
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params);
});
```

### 5. Serving Static Files

- **Basic Serving:**
  ```javascript
  app.use(express.static('public'));
  ```
- **Virtual Path:**
  ```javascript
  app.use('/static', express.static('public'));
  ```
- **Absolute Path:**
  ```javascript
  const path = require('path');
  app.use('/static', express.static(path.join(__dirname, 'public')));
  ```

### 6. Examples

Reference examples include authentication, content negotiation, session management, and more with complete Express app structures including routers, middleware, and error handlers.

### 7. FAQ

- **404 Handling:**
  ```javascript
  app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
  });
  ```

- **Error Handling:**
  ```javascript
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  ```


## Supplementary Details
### Technical Specifications & Implementation Details

1. **Installation & Environment:**
   - Command: `npm install express --save` adds Express as a dependency in package.json (npm 5.0+ adds automatically; older versions require '--save').
   - Environment: Express 4.x requires Node.js 0.10+; Express 5.x requires Node.js 18+.

2. **Hello World Implementation:**
   - Code snippet provided creates a basic server listening on port 3000. Use `node app.js` to execute.

3. **Express Generator Details:**
   - Use `npx express-generator` to scaffold an app with required directories (app.js, bin/www, routes, views, public).
   - Template engines: options include ejs, hbs, pug, hogan, etc.
   - Command-line options:
     - `-h, --help` for usage info
     - `--version` for version info
     - `--no-view` to generate without view engine
     - `-v, --view <engine>` to specify a view engine (default: jade)
     - `-c, --css <engine>` for stylesheet support (default: plain css)
     - `--git` to add a .gitignore file

4. **Routing Specifications:**
   - Route function signature: `app.METHOD(path, handler)` where METHOD is lowercase HTTP verb.
   - Supports multiple handlers and middleware chaining. Use `next()` to delegate control.
   - Route parameters must be word characters; use regex for more control with pattern like `/user/:userId(\d+)`.

5. **Static File Serving Options:**
   - Basic signature: `express.static(root, [options])` where root is the directory to serve.
   - Multiple directories can be defined; order of declaration defines precedence.
   - Virtual path prefix allows mounting at a specified URL (e.g., `/static`).
   - Use path.join(__dirname, 'public') to specify an absolute path, ensuring correct file lookup regardless of execution directory.

6. **Best Practices & Troubleshooting:**
   - Always check Node.js version compatibility.
   - Use reverse proxy caching for production serving of static assets.
   - For 404 errors, place a catch-all middleware at the bottom of the middleware stack.
   - For error handling, use middleware with four arguments to capture errors.


## Reference Details
### Complete API Specifications and Code Examples

#### 1. Express Application Setup

- **Method Signature:**
  ```javascript
  const express = require('express');
  const app = express();
  // app.METHOD(path, [callback, ...])
  ```

- **Example: Hello World Application**
  ```javascript
  // app.js
  const express = require('express');
  const app = express();
  const port = 3000;

  // Define GET route at '/'
  app.get('/', (req, res) => {
    // Sends text response
    res.send('Hello World!');
  });

  // Starts the server on port 3000
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  ```

#### 2. Express Generator Command Line Options

- **Usage:**
  ```bash
  express [options] [dir]
  ```

- **Options:**
  - `-h, --help` : Output usage information.
  - `--version` : Output the version number.
  - `-e, --ejs` : Add ejs engine support.
  - `--hbs` : Add handlebars engine support.
  - `--pug` : Add pug engine support.
  - `-H, --hogan` : Add hogan.js engine support.
  - `--no-view` : Generate without a view engine.
  - `-v, --view <engine>` : Add view support (defaults to jade).
  - `-c, --css <engine>` : Add stylesheet support (defaults to plain css).
  - `--git` : Add a .gitignore file.
  - `-f, --force` : Force generation in a non-empty directory.

- **Example Usage:**
  ```bash
  express --view=pug myapp
  cd myapp
  npm install
  ```

#### 3. Routing API

- **Basic Route:**
  ```javascript
  app.get('/', (req, res) => {
    res.send('hello world');
  });
  ```

- **Route with Parameters:**
  ```javascript
  app.get('/users/:userId/books/:bookId', (req, res) => {
    // req.params = { userId: 'value', bookId: 'value' }
    res.send(req.params);
  });
  ```

- **Chained Route Handling:**
  ```javascript
  app.route('/book')
    .get((req, res) => res.send('Get a random book'))
    .post((req, res) => res.send('Add a book'))
    .put((req, res) => res.send('Update the book'));
  ```

- **Middleware Example with next():**
  ```javascript
  const cb0 = (req, res, next) => {
    console.log('CB0');
    next();
  };

  const cb1 = (req, res, next) => {
    console.log('CB1');
    next();
  };

  const cb2 = (req, res) => {
    res.send('Hello from C!');
  };

  app.get('/example/c', [cb0, cb1, cb2]);
  ```

#### 4. Static Files Serving

- **Method Signature:**
  ```javascript
  express.static(root, [options]);
  ```

- **Example with Virtual Path and Absolute Directory:**
  ```javascript
  const path = require('path');
  app.use('/static', express.static(path.join(__dirname, 'public')));
  ```

- **Accessing Files:**
  - URL: http://localhost:3000/static/images/kitten.jpg

#### 5. Troubleshooting Procedures

- **Server Startup:**
  - Run: `node app.js`
  - Expected output: `Example app listening on port 3000`

- **Debugging 404 Errors:**
  - Add middleware at the end of the route definitions:
    ```javascript
    app.use((req, res, next) => {
      res.status(404).send("Sorry can't find that!");
    });
    ```

- **Error Handling:**
  - Add error-handling middleware:
    ```javascript
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });
    ```

This precise documentation provides developers with direct code examples, configuration options, API method signatures, and troubleshooting commands, ensuring an immediately applicable implementation of Express-based applications.

## Original Source
Express Documentation
https://expressjs.com/

## Digest of EXPRESS

# Express Documentation Extract

**Retrieved on:** 2023-10-07

## Overview

This document compiles the core technical details extracted from the Express.js website. The content includes installation instructions, example applications (Hello World), usage of the Express generator, routing definitions, static file serving, and FAQs.

## Installation

- **Install Express:**

  npm command:
  ```bash
  npm install express --save
  ```

- **Node.js Requirements:**
  - Express 4.x: Node.js 0.10 or higher
  - Express 5.x: Node.js 18 or higher

- **Creating a New App:**
  ```bash
  mkdir myapp
  cd myapp
  npm init
  npm install express
  ```

## Hello World App

A minimal Express application example:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

To run the app:
```
node app.js
```

## Express Generator

- **Installation and usage with npx:**
  ```bash
  npx express-generator
  ```

- **Global installation for earlier Node versions:**
  ```bash
  npm install -g express-generator
  express
  ```

- **Command Help:**
  ```bash
  express -h
  ```

- **Example to create app with Pug view engine:**
  ```bash
  express --view=pug myapp
  cd myapp
  npm install
  ```

- **Run app commands:**
  - On MacOS/Linux:
    ```bash
    DEBUG=myapp:* npm start
    ```
  - On Windows Command Prompt:
    ```bash
    set DEBUG=myapp:* & npm start
    ```
  - On Windows PowerShell:
    ```powershell
    $env:DEBUG='myapp:*'; npm start
    ```

## Routing

### 1. Basic Route Definition

All routes follow the structure: `app.METHOD(PATH, HANDLER)`.

Example GET and POST route:

```javascript
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.send('Got a POST request');
});
```

### 2. Advanced Routing Patterns

- **Route with multiple handlers:**

  ```javascript
  app.get('/example/d', [cb0, cb1], (req, res, next) => {
    console.log('Passing control...');
    next();
  }, (req, res) => {
    res.send('Hello from D!');
  });
  ```

- **Route parameters:**

  ```javascript
  // Example: /users/34/books/8989
  app.get('/users/:userId/books/:bookId', (req, res) => {
    res.send(req.params);
  });
  ```

- **Regular expressions in routes:**

  ```javascript
  app.get(/a/, (req, res) => {
    res.send('/a/');
  });
  ```

### 3. Chained Route Handlers using app.route()

```javascript
app.route('/book')
  .get((req, res) => {
    res.send('Get a random book');
  })
  .post((req, res) => {
    res.send('Add a book');
  })
  .put((req, res) => {
    res.send('Update the book');
  });
```

## Serving Static Files

- **Basic usage:**
  ```javascript
  app.use(express.static('public'));
  ```
  Files available at URL without including "public" in the path.

- **Multiple directories:**
  ```javascript
  app.use(express.static('public'));
  app.use(express.static('files'));
  ```

- **Virtual path prefix:**
  ```javascript
  app.use('/static', express.static('public'));
  ```

- **Using absolute paths:**
  ```javascript
  const path = require('path');
  app.use('/static', express.static(path.join(__dirname, 'public')));
  ```

## Express Examples

A collection of example applications including auth, content negotiation, cookie sessions, error handling, and more. For instance:

- **Cookie-based sessions example**
- **Multi-router example**
- **MVC style controllers**

## FAQ

- **404 Handling:**
  ```javascript
  app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
  });
  ```

- **Error Handler:**
  ```javascript
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  ```

- **Sending Files and HTML:**
  Use `res.sendFile()` to send files. Render dynamic templates with supported view engines.

---

**Attribution:** Express.js documentation, Data Size: 9326355 bytes, Links Found: 20935

## Attribution
- Source: Express Documentation
- URL: https://expressjs.com/
- License: MIT
- Crawl Date: 2025-04-20T21:40:56.394Z
- Data Size: 9326355 bytes
- Links Found: 20935

## Retrieved
2025-04-20
