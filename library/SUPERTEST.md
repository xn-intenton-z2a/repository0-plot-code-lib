# SUPERTEST

## Crawl Summary
SuperTest provides a fluent API built on superagent for making HTTP assertions. Key details include installation via npm, usage examples with express, support for HTTP2 via { http2:true } options, integration examples with mocha using callbacks, promises, and async/await, and built-in support for cookie persistence using request.agent. API methods include various forms of .expect() for status codes, headers, bodies, and custom assertions.

## Normalised Extract
Table of Contents:
1. Installation & Setup
2. HTTP and HTTP2 Request Handling
3. API Methods and Assertions
4. Mocha, Promise, and Async Testing Patterns
5. Cookie Persistence with request.agent
6. Custom Assertions and Response Modification

1. Installation & Setup:
- Use npm install supertest --save-dev
- Import with require('supertest') in Node.js projects.

2. HTTP and HTTP2 Request Handling:
- Basic usage: request(app).get('/user')
- For HTTP2, pass options: request(app, { http2: true }) or request.agent(app, { http2: true })

3. API Methods and Assertions:
- .expect(status[, fn]) asserts the response status code.
- .expect(status, body[, fn]) asserts both status and response body.
- .expect(body[, fn]) asserts response body using string, regex or object.
- .expect(field, value[, fn]) asserts header field values.
- .expect(function(res){}) for custom assertions.
- .end(fn) finalizes the test and returns errors in callback.

4. Mocha, Promise, and Async Testing Patterns:
- Callback style: pass done to .expect(200, done)
- Promise style: return request(...).then(response => { ... })
- Async/await: const response = await request(...); then validate headers and body.

5. Cookie Persistence with request.agent:
- Use request.agent(app) to persist cookies through subsequent requests.
- Example: agent.get('/').expect('set-cookie', 'cookie=hey; Path=/') then agent.get('/return') to validate cookie transmission.

6. Custom Assertions and Response Modification:
- Modify response body within an .expect() function to set fixed IDs or adjust formats before final assertion.
- Example: res.body.id = 'some fixed id'; res.body.name = res.body.name.toLowerCase(); followed by .expect(200, {id:'some fixed id', name:'john'}, done).

## Supplementary Details
Technical Specifications:
- HTTP2 Enablement: Pass { http2: true } as second parameter to request() or agent().
- Assertion Method Signatures:
   expect(status[, fn]) where status is a number and fn is a callback function.
   expect(status, body[, fn]) where body is an exact object or string for matching.
   expect(body[, fn]) where body can be a string/regex/object.
   expect(field, value[, fn]) to match header fields.
- Error handling: In .end(fn) callback, if error present, call done(err) to fail tests.
- Configuration Options:
   Default port binding: uses ephemeral port if server not listening.
   Cookie persistence via agent: maintains cookies across requests.
   Superagent methods available: .write(), .pipe(), etc, for lower-level HTTP operations.
- Implementation Steps:
   1. Install supertest using npm.
   2. Create express application endpoints.
   3. Use request(app) for testing endpoints.
   4. Apply .expect() assertions in sequence.
   5. Use .end(fn) to complete request and handle errors.
   6. For asynchronous tests, use promise return or async/await.
   7. For HTTP2 testing, include { http2:true } option.
- Best Practices:
   - Ensure correct Content-Type and Content-Length headers are asserted when testing JSON responses.
   - Use agent for stateful tests like cookie persistence.
   - Order .expect() calls to systematically modify the response if needed before final assertion.

## Reference Details
API Specifications:

Method: request(app | url, [options]) -> Returns a SuperTest instance.
Options: { http2: boolean }

Method: .get(path: string) -> SuperTest instance; path is the endpoint string.
Method: .post(path: string) -> SuperTest instance.
Method: .send(data: object|string) -> SuperTest instance; data type based on content-type.
Method: .set(field: string, value: string|RegExp) -> SuperTest instance.
Method: .auth(username: string, password: string) -> SuperTest instance.
Method: .expect(status: number, [callback: (err: Error, res: Response) => void])
Method: .expect(status: number, body: any, [callback])
Method: .expect(body: string|RegExp|object, [callback])
Method: .expect(field: string, value: string|RegExp, [callback])
Method: .expect(fn: (res: Response) => void) -> Custom assertion that throws error if fails.
Method: .end(callback: (err: Error, res: Response) => void)

Full Code Example with Comments:
// Basic usage of SuperTest with Express
const request = require('supertest');
const express = require('express');

// Create an Express app
const app = express();
app.get('/user', function(req, res) {
  // Responds with JSON containing name 'john'
  res.status(200).json({ name: 'john' });
});

// Test the /user endpoint
request(app)
  .get('/user') // HTTP GET request
  .set('Accept', 'application/json') // Set request header
  .expect('Content-Type', /json/) // Expect response Content-Type to match JSON pattern
  .expect('Content-Length', '15') // Expect Content-Length to be '15'
  .expect(200) // Assert HTTP status 200
  .end(function(err, res) {
    // Error handling; if error exists, throw it to fail test
    if (err) throw err;
  });

// HTTP2 Enablement Example
request(app, { http2: true })
  .get('/user')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

// Troubleshooting Procedure:
// 1. If an assertion fails using .end(fn), verify the response headers and body manually by logging res.
// 2. Run the test using npm test and check console output for error details.
// 3. For cookie issues, ensure using request.agent() to persist cookies.
// 4. Check that the server is bound and listening on an ephemeral port if not pre-bound.

Configuration Options:
- npm install command: npm install supertest --save-dev
- Options for HTTP2: { http2: true } enables HTTP2 protocol support.
- Default callback error: Errors are passed as first argument in .end() method; handle with if(err) { done(err) }.

Return Types:
- All request methods return a SuperTest instance for chaining.
- .end() returns a callback with (err: Error|null, res: Response object).

Exceptions:
- If non-2XX status returned without .expect() status, error passed to callback.
- Custom assertion functions must throw an Error on failure.

Best Practices:
- Chain .expect() calls in the desired order.
- Use agent() for tests requiring cookie state.
- Leverage async/await for clean asynchronous tests.


## Information Dense Extract
Install: npm install supertest --save-dev; Import: require('supertest'); API: request(app|url, {http2:boolean}); Methods: .get(path:string), .post(path:string), .set(field:string,value:string|RegExp), .send(data:object|string), .auth(username, password); Assertions: .expect(status[,fn]), .expect(status,body[,fn]), .expect(body[,fn]), .expect(field,value[,fn]), .expect(fn); End: .end(callback(err,res)); HTTP2: use {http2:true}; Mocha usage: callback style, promise chain, async/await; Cookie Persistence: request.agent(app); Custom assertion: function(res){ if(!cond) throw Error } ; Troubleshoot: Check .end() errors, validate response headers/body; Code pattern: chain .expect() then .end();

## Sanitised Extract
Table of Contents:
1. Installation & Setup
2. HTTP and HTTP2 Request Handling
3. API Methods and Assertions
4. Mocha, Promise, and Async Testing Patterns
5. Cookie Persistence with request.agent
6. Custom Assertions and Response Modification

1. Installation & Setup:
- Use npm install supertest --save-dev
- Import with require('supertest') in Node.js projects.

2. HTTP and HTTP2 Request Handling:
- Basic usage: request(app).get('/user')
- For HTTP2, pass options: request(app, { http2: true }) or request.agent(app, { http2: true })

3. API Methods and Assertions:
- .expect(status[, fn]) asserts the response status code.
- .expect(status, body[, fn]) asserts both status and response body.
- .expect(body[, fn]) asserts response body using string, regex or object.
- .expect(field, value[, fn]) asserts header field values.
- .expect(function(res){}) for custom assertions.
- .end(fn) finalizes the test and returns errors in callback.

4. Mocha, Promise, and Async Testing Patterns:
- Callback style: pass done to .expect(200, done)
- Promise style: return request(...).then(response => { ... })
- Async/await: const response = await request(...); then validate headers and body.

5. Cookie Persistence with request.agent:
- Use request.agent(app) to persist cookies through subsequent requests.
- Example: agent.get('/').expect('set-cookie', 'cookie=hey; Path=/') then agent.get('/return') to validate cookie transmission.

6. Custom Assertions and Response Modification:
- Modify response body within an .expect() function to set fixed IDs or adjust formats before final assertion.
- Example: res.body.id = 'some fixed id'; res.body.name = res.body.name.toLowerCase(); followed by .expect(200, {id:'some fixed id', name:'john'}, done).

## Original Source
Supertest Documentation
https://github.com/visionmedia/supertest

## Digest of SUPERTEST

# SuperTest Documentation Digest

Date Retrieved: 2023-10-11

## Overview
SuperTest is a high-level abstraction for testing HTTP servers via the superagent library. It allows the user to test HTTP endpoints with various methods and assertions including custom checks, cookie handling, and HTTP2 protocol support.

## Installation
- Command: npm install supertest --save-dev
- Import: require('supertest')

## Usage Examples

### Basic HTTP Test Setup

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

### Enabling HTTP2

const request = require('supertest');
const express = require('express');

const app = express();
app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

request(app, { http2: true })
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

// Using agent for HTTP2
request.agent(app, { http2: true })
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

### Mocha Integration and Async Testing

describe('GET /user', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /users', function() {
  it('responds with json using promises', function() {
    return request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
         expect(response.body.email).toEqual('foo@bar.com');
      });
  });
});

describe('GET /users', function() {
  it('responds with json using async/await', async function() {
    const response = await request(app)
      .get('/users')
      .set('Accept', 'application/json');
    expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.email).toEqual('foo@bar.com');
  });
});

### Custom Assertions and Response Modification

describe('POST /user', function() {
  it('user.name should be case-insensitive match for "john"', function(done) {
    request(app)
      .post('/user')
      .send('name=john')
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.body.id = 'some fixed id';
        res.body.name = res.body.name.toLowerCase();
      })
      .expect(200, {
        id: 'some fixed id',
        name: 'john'
      }, done);
  });
});

### Cookie Persistence Example using agent

const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');

describe('request.agent(app)', function() {
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

  it('should save cookies', function(done) {
    agent
      .get('/')
      .expect('set-cookie', 'cookie=hey; Path=/', done);
  });

  it('should send cookies', function(done) {
    agent
      .get('/return')
      .expect('hey', done);
  });
});

## API Methods Overview

- .expect(status[, fn])
- .expect(status, body[, fn])
- .expect(body[, fn])
- .expect(field, value[, fn])
- .expect(function(res) { ... })
- .end(fn)

## Troubleshooting
- When .end() is used, failed assertions provide an error as a callback parameter; use if (err) return done(err); to handle errors.

## Attribution
Crawled content data size: 589780 bytes, retrieved 4781 links.

## Attribution
- Source: Supertest Documentation
- URL: https://github.com/visionmedia/supertest
- License: MIT License
- Crawl Date: 2025-04-27T01:08:23.412Z
- Data Size: 589780 bytes
- Links Found: 4781

## Retrieved
2025-04-27
