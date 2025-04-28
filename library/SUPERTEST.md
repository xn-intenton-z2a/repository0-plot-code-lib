# SUPERTEST

## Crawl Summary
SuperTest is a Node.js library for HTTP assertions built on superagent. It allows testing of HTTP servers by wrapping an http.Server or function and binding to an ephemeral port if not listening. Key features include support for HTTP/2 via options, integration with testing frameworks like Mocha using callbacks, promises, or async/await, cookie persistence through request.agent, and custom assertion functions. API methods such as .expect(status[, fn]), .expect(body[, fn]), .auth(username, password), and .end(fn) provide versatile testing control. Detailed code examples are provided for basic usage, authentication, and multipart uploads.

## Normalised Extract
Table of Contents:
  1. Introduction
  2. Installation
  3. Basic Usage
  4. HTTP/2 Configuration
  5. Testing Patterns
  6. Authentication & Cookie Handling
  7. API Method Specifications

1. Introduction:
  - Library: SuperTest for testing HTTP servers using superagent.
  - Supports ephemeral port binding if server not listening.

2. Installation:
  - Command: npm install supertest --save-dev

3. Basic Usage:
  - Require module: const request = require('supertest');
  - Example: 
    const express = require('express');
    const app = express();
    app.get('/user', function(req, res) { res.status(200).json({ name: 'john' }); });
    request(app).get('/user').expect('Content-Type', /json/).expect('Content-Length', '15').expect(200).end(function(err, res) { if(err) throw err; });

4. HTTP/2 Configuration:
  - Enable by passing { http2: true } to request or request.agent:
    request(app, { http2: true }).get('/user')...

5. Testing Patterns:
  - Supports callbacks, promises, and async/await.
  - Mocha example with done callback and inline assertion via .expect(200, done).

6. Authentication & Cookie Handling:
  - Use .auth(username, password) for basic auth.
  - Persist cookies via request.agent: agent(app) with cookie-parser middleware.

7. API Method Specifications:
  - .expect(status[, fn]) - assert status code.
  - .expect(status, body[, fn]) - assert status and body.
  - .expect(body[, fn]) - assert response body with string, regex or object.
  - .expect(field, value[, fn]) - assert header field.
  - .expect(function(res){}) - custom assertion function; throw error if assertion fails.
  - .end(fn) - execute HTTP request and callback with error and response.

## Supplementary Details
Installation: npm install supertest --save-dev. Configuration Options:
  - http2: Boolean option to enable HTTP2 protocol when passed to request or request.agent. Example: { http2: true }.
Testing Details:
  - Basic request example: require('supertest') is used with Express app to perform GET/POST requests.
  - Use .auth(username, password) to pass credentials similar to superagent.
  - Cookie persistence via request.agent with cookie-parser middleware requires setting cookies with res.cookie and retrieving via req.cookies.

Implementation Steps:
  1. Require and initialize SuperTest and Express.
  2. Define routes with desired responses (JSON, headers, etc.).
  3. Execute HTTP method call with desired assertions (.expect for headers, status, and custom functions).
  4. End tests with .end(callback) managing error propagation.

Exact Parameter Values:
  - Header Expectations: e.g., 'Content-Type', /json/; 'Content-Length', '15'.
  - Status Codes: e.g., 200 for success.

Troubleshooting:
  - If .end() receives an error, rethrow or call done(err) to fail tests.
  - Check cookie availability when using agent for persistence.

## Reference Details
API Specifications:
1. Function: request(app[, options])
   - Parameters:
     - app: HTTP server instance or function
     - options: Object { http2: Boolean } (optional)
   - Returns: SuperTest instance

2. Method: .get(url)
   - Parameter: url (String)
   - Returns: Test instance

3. Method: .expect(status[, fn])
   - Parameters:
     - status: Number (HTTP status code expected)
     - fn: Optional callback function
   - Behavior: Asserts response status code

4. Method: .expect(status, body[, fn])
   - Parameters:
     - status: Number
     - body: String, RegExp, or Object to match against response body
     - fn: Optional callback

5. Method: .expect(body[, fn])
   - Parameter: body (String, RegExp, or Object)
   - Behavior: Asserts response body

6. Method: .expect(field, value[, fn])
   - Parameters:
     - field: String (HTTP header field)
     - value: String or RegExp
     - fn: Optional callback

7. Method: .expect(callback)
   - Parameter: callback function(res) that performs custom assertions. Throw error if condition fails.

8. Method: .end(fn)
   - Parameter: fn(err, res)
   - Behavior: Finalizes the request, handling errors if any

Complete Code Example:
-------------------------------------------------
const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Middleware setup
app.use(cookieParser());

// Route definition
app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

// Basic test
request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

// HTTP/2 test
request(app, { http2: true })
  .get('/user')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

// Mocha test pattern
describe('GET /user', function() {
  it('should respond with json', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// Cookie persistence test
app.get('/', function(req, res) {
  res.cookie('cookie', 'hey');
  res.send();
});

app.get('/return', function(req, res) {
  if (req.cookies.cookie) res.send(req.cookies.cookie);
  else res.send(':(');
});

const agent = request.agent(app);

agent
  .get('/')
  .expect('set-cookie', 'cookie=hey; Path=/', function(err) {
    if (err) throw err;
  });

agent
  .get('/return')
  .expect('hey', function(err) {
    if (err) throw err;
  });
-------------------------------------------------

Configuration Options:
  - { http2: true } enables HTTP/2 support.

Best Practices:
  - Chain assertions in the order of expected response alterations.
  - Utilize custom assertion functions for advanced validations.
  - Ensure error handling in the .end() callback to properly fail test cases.

Troubleshooting Procedures:
  - Run individual tests with verbose logging using console.log(err) in .end() to track assertion failures.
  - Verify that the Express app is correctly configured to handle cookies when using agent.
  - Ensure that HTTP header expectations match the exact output from the server.

Return Types: All callback functions follow Node.js error-first callback conventions.

## Information Dense Extract
Library: SuperTest; Installation: npm install supertest --save-dev; Usage: require('supertest'), bind to Express app; HTTP/2: enable via { http2: true }; API: .get(url), .expect(status[, fn]), .expect(status, body[, fn]), .expect(body[, fn]), .expect(field, value[, fn]), .expect(function(res){}) and .end(fn); Patterns: supports callbacks, Promises, async/await; Authentication: .auth(username, password); Cookie Handling: request.agent with cookie-parser; Complete API details provided with parameters, return types, and error handling; Best practices include chaining assertions and robust error propagation.

## Sanitised Extract
Table of Contents:
  1. Introduction
  2. Installation
  3. Basic Usage
  4. HTTP/2 Configuration
  5. Testing Patterns
  6. Authentication & Cookie Handling
  7. API Method Specifications

1. Introduction:
  - Library: SuperTest for testing HTTP servers using superagent.
  - Supports ephemeral port binding if server not listening.

2. Installation:
  - Command: npm install supertest --save-dev

3. Basic Usage:
  - Require module: const request = require('supertest');
  - Example: 
    const express = require('express');
    const app = express();
    app.get('/user', function(req, res) { res.status(200).json({ name: 'john' }); });
    request(app).get('/user').expect('Content-Type', /json/).expect('Content-Length', '15').expect(200).end(function(err, res) { if(err) throw err; });

4. HTTP/2 Configuration:
  - Enable by passing { http2: true } to request or request.agent:
    request(app, { http2: true }).get('/user')...

5. Testing Patterns:
  - Supports callbacks, promises, and async/await.
  - Mocha example with done callback and inline assertion via .expect(200, done).

6. Authentication & Cookie Handling:
  - Use .auth(username, password) for basic auth.
  - Persist cookies via request.agent: agent(app) with cookie-parser middleware.

7. API Method Specifications:
  - .expect(status[, fn]) - assert status code.
  - .expect(status, body[, fn]) - assert status and body.
  - .expect(body[, fn]) - assert response body with string, regex or object.
  - .expect(field, value[, fn]) - assert header field.
  - .expect(function(res){}) - custom assertion function; throw error if assertion fails.
  - .end(fn) - execute HTTP request and callback with error and response.

## Original Source
Supertest Documentation
https://github.com/visionmedia/supertest

## Digest of SUPERTEST

# SuperTest Documentation

Retrieved Date: 2023-10-30
Data Size: 661880 bytes

# Overview
SuperTest offers a high-level abstraction for HTTP testing built on top of superagent. It supports basic HTTP requests, HTTP/2 configuration, cookie handling, and multiple testing paradigms (callbacks, promises, async/await).

# Installation
To install, add supertest as a development dependency:

npm install supertest --save-dev

# Basic Usage
Include the module by requiring it:

const request = require('supertest');
const express = require('express');
const app = express();

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

# HTTP2 Support
To enable HTTP2, pass an options object with { http2: true } to request or request.agent:

const request = require('supertest');

request(app, { http2: true })
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

request.agent(app, { http2: true })
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

# Mocha Integration & Asynchronous Patterns
Examples for Mocha with callback, promise and async/await patterns:

// Using callbacks:
describe('GET /user', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// Using promises:
describe('GET /users', function() {
  it('responds with json', function() {
    return request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
         // Assertion: response.body.email equals expected email
      });
  });
});

// Using async/await:
describe('GET /users', function() {
  it('responds with json', async function() {
    const response = await request(app)
      .get('/users')
      .set('Accept', 'application/json');
    // Assertions
  });
});

# Authentication
Pass HTTP credentials using the auth method as in superagent:

describe('GET /user', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/user')
      .auth('username', 'password')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

# Cookie Handling
Persist cookies using request.agent:

const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
app.use(cookieParser());

app.get('/', function(req, res) {
  res.cookie('cookie', 'hey');
  res.send();
});

app.get('/return', function(req, res) {
  if (req.cookies.cookie) res.send(req.cookies.cookie);
  else res.send(':(');
});

const agent = request.agent(app);

// Save cookies:
agent
  .get('/')
  .expect('set-cookie', 'cookie=hey; Path=/', function(err) {
    if (err) throw err;
  });

// Use cookies:
agent
  .get('/return')
  .expect('hey', function(err) {
    if (err) throw err;
  });

# API Details
SuperTest supports all superagent methods. Key API methods include:

.expect(status[, fn])
.expect(status, body[, fn])
.expect(body[, fn])
.expect(field, value[, fn])
.expect(function(res) {})
.end(fn)

Custom assertion example:

function hasPreviousAndNextKeys(res) {
  if (!('next' in res.body)) throw new Error('missing next key');
  if (!('prev' in res.body)) throw new Error('missing prev key');
}

request(app)
  .get('/')
  .expect(hasPreviousAndNextKeys)
  .end(function(err, res) {
    if (err) throw err;
  });

# Troubleshooting
If .expect() fails in .end(), the error is provided as the first argument. To fail the test case, rethrow the error or pass it to the done callback:

if (err) return done(err);
return done();

Attribution: Crawled from https://github.com/visionmedia/supertest
License: MIT

## Attribution
- Source: Supertest Documentation
- URL: https://github.com/visionmedia/supertest
- License: MIT License
- Crawl Date: 2025-04-28T16:51:30.456Z
- Data Size: 661880 bytes
- Links Found: 5442

## Retrieved
2025-04-28
