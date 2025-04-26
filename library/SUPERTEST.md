# SUPERTEST

## Crawl Summary
SuperTest provides an abstraction for testing HTTP servers with superagent. Key technical details include installation via npm, flexible usage with HTTP server or function, support for HTTP2 via option {http2:true}, integration with test frameworks (Mocha, promises, async/await), and comprehensive API methods such as .get(), .post(), .auth(), .set(), .send(), .expect(), and .end(). It also supports multipart file uploads, cookie management via agents, and custom assertion functions.

## Normalised Extract
Table of Contents:
1. Installation and Setup
   - npm install supertest --save-dev
   - require('supertest') for inclusion
2. Basic HTTP Testing
   - Passing an http.Server or function into request()
   - Binding to ephemeral port if not already listening
3. HTTP Method Assertions
   - Available methods: .get(), .post(), .send(), .set()
   - Assertion methods: .expect(status[,fn]), .expect(status, body[,fn]), .expect(field, value[,fn]), .expect(customFunction)
4. HTTP2 and Agent Support
   - Option to enable HTTP2 by passing {http2:true}
   - Request agent for persistent sessions and cookie management
5. Integration with Mocha and Async Patterns
   - Usage of callbacks, promises (.then()) and async/await
   - Direct passing of done() to .expect()
6. Advanced Features
   - Multipart file uploads using .field() and .attach()
   - Custom response modifications in .expect() before final assertion

Detailed Technical Information:
1. Installation and Setup:
   - Command: npm install supertest --save-dev
   - Import: const request = require('supertest');
2. Basic HTTP Testing:
   - Example: request(app).get('/user').expect('Content-Type', /json/).expect(200).end(callback)
3. Assertions:
   - .expect(status[,fn]): validates response status
   - .expect(status, body[,fn]): validates both status and response body
   - .expect(body[,fn]): checks response body text against string, regex or object
   - .expect(field, value[,fn]): verifies header field and value
   - .expect(function(res) {}): custom validation; throw error if check fails
4. HTTP2 and Agents:
   - Enable HTTP2: request(app, { http2: true })
   - Persistent agent: request.agent(app, { http2: true })
5. Mocha and Async:
   - Callback style: .expect(200, done)
   - Promises: return request(...).then(...)
   - Async/await: const res = await request(...)
6. Advanced upload and cookie handling:
   - File Upload: use .field() and .attach() for multipart forms
   - Cookie management: store cookies via request.agent(app) and validate with .expect('set-cookie', 'cookie=value; Path=/')

## Supplementary Details
Detailed Technical Specifications:
- Installation:
  Command: npm install supertest --save-dev
  Import: const request = require('supertest');
- HTTP Server Testing:
  Function: request(app)
  Accepts: HTTP server instance or a function (callback to create server)
  Auto-bind: binds to ephemeral port if server is not listening
- Options:
  http2: boolean (true enables HTTP2 protocol support)
- Methods and Assertions:
  .get(url: string): Request object
  .post(url: string): Request object
  .set(field: string, value: string): Request object
  .send(data): Request object
  .auth(username: string, password: string): Request object
  .field(key: string, value: string, options?: { contentType: string }): Request object
  .attach(field: string, filePath: string): Request object
  .expect(status: number[, callback])
  .expect(status: number, body: any[, callback])
  .expect(field: string, value: RegExp | string[, callback])
  .expect(customFunction: (res: any) => void)
  .end(callback: (err: any, res: any) => void)
- Agent Support:
  request.agent(app, options): returns persistent agent supporting cookie management
- Testing Patterns:
  Callback: using .end(callback)
  Promises: using .then()
  Async/await: using await on request
- Best Practices:
  Always validate Content-Type using regex /json/ when expecting JSON responses
  Rethrow errors inside .end() callback to fail tests effectively
- Troubleshooting:
  If assertions fail in .end(), errors are passed as first argument, e.g., if (!err) { done(); } else { done(err); }

## Reference Details
API Specifications:
- Method Signatures:
  request(app: Express.Application, options?: { http2?: boolean }): Request
  request.agent(app: Express.Application, options?: { http2?: boolean }): Request

- Request Object Methods:
  .get(url: string): Request
  .post(url: string): Request
  .set(field: string, value: string): Request
  .send(data: any): Request
  .auth(username: string, password: string): Request
  .field(key: string, value: string, options?: { contentType: string }): Request
  .attach(field: string, filePath: string): Request
  .expect(status: number, callback?: (err: any, res: any) => void): Request
  .expect(status: number, body: any, callback?: (err: any, res: any) => void): Request
  .expect(body: any, callback?: (err: any, res: any) => void): Request
  .expect(field: string, value: string | RegExp, callback?: (err: any, res: any) => void): Request
  .expect(fn: (res: any) => void): Request
  .end(callback: (err: any, res: any) => void): void

- Code Example with Comments:
// Setup Express app and test endpoint
const express = require('express');
const app = express();
app.get('/user', function(req, res) {
  // Respond with JSON object
  res.status(200).json({ name: 'john' });
});

// Basic test using callback
const request = require('supertest');
request(app)
  .get('/user')
  .set('Accept', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res) {
    if (err) {
      // Rethrow error for failing test
      throw err;
    }
    // Further assertions can be added here
  });

// Enabling HTTP2 and using a persistent agent
const agent = request.agent(app, { http2: true });
agent.get('/user')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

// Using Promises
request(app)
  .get('/users')
  .set('Accept', 'application/json')
  .expect(200)
  .then(response => {
    // Validate response body
    if(response.body.email !== 'foo@bar.com') {
      throw new Error('Email mismatch');
    }
  }).catch(err => {
    console.error(err);
  });

// Configuration Options and Effects:
// Option { http2: true } enables HTTP/2 protocol support for testing.
// Using request.agent(app) enables cookie persistence between requests.

- Best Practices:
// Always chain .expect() calls in defined order because execution order can modify headers/body.
// In .end() callback, always check for error and rethrow to fail tests: if (err) return done(err); else return done();

- Troubleshooting Procedures:
// If test fails without throwing, verify that the correct Content-Type header is expected.
// Run tests with increased logging by adding console.log in the .end() callback.
// Example command: npm test
// Expected output: Successful test run with no errors if assertions are met.

Return Types:
// All request methods return a Request object which supports method chaining.

## Information Dense Extract
npm install supertest --save-dev; require('supertest'); Accepts http.Server or function; auto-binds to ephemeral port; options: {http2:true}; API: .get(url), .post(url), .set(), .send(), .auth(), .field(), .attach(); Assertions: .expect(status[,fn]), .expect(status,body[,fn]), .expect(field,value[,fn]), .expect(customFn); .end(callback) for executing request; supports callbacks, promises, async/await; persistent agents via request.agent(app, {http2:true}) for cookie management; detailed error handling in .end() with rethrow; complete method signatures with parameter types; configuration options and best practices provided.

## Sanitised Extract
Table of Contents:
1. Installation and Setup
   - npm install supertest --save-dev
   - require('supertest') for inclusion
2. Basic HTTP Testing
   - Passing an http.Server or function into request()
   - Binding to ephemeral port if not already listening
3. HTTP Method Assertions
   - Available methods: .get(), .post(), .send(), .set()
   - Assertion methods: .expect(status[,fn]), .expect(status, body[,fn]), .expect(field, value[,fn]), .expect(customFunction)
4. HTTP2 and Agent Support
   - Option to enable HTTP2 by passing {http2:true}
   - Request agent for persistent sessions and cookie management
5. Integration with Mocha and Async Patterns
   - Usage of callbacks, promises (.then()) and async/await
   - Direct passing of done() to .expect()
6. Advanced Features
   - Multipart file uploads using .field() and .attach()
   - Custom response modifications in .expect() before final assertion

Detailed Technical Information:
1. Installation and Setup:
   - Command: npm install supertest --save-dev
   - Import: const request = require('supertest');
2. Basic HTTP Testing:
   - Example: request(app).get('/user').expect('Content-Type', /json/).expect(200).end(callback)
3. Assertions:
   - .expect(status[,fn]): validates response status
   - .expect(status, body[,fn]): validates both status and response body
   - .expect(body[,fn]): checks response body text against string, regex or object
   - .expect(field, value[,fn]): verifies header field and value
   - .expect(function(res) {}): custom validation; throw error if check fails
4. HTTP2 and Agents:
   - Enable HTTP2: request(app, { http2: true })
   - Persistent agent: request.agent(app, { http2: true })
5. Mocha and Async:
   - Callback style: .expect(200, done)
   - Promises: return request(...).then(...)
   - Async/await: const res = await request(...)
6. Advanced upload and cookie handling:
   - File Upload: use .field() and .attach() for multipart forms
   - Cookie management: store cookies via request.agent(app) and validate with .expect('set-cookie', 'cookie=value; Path=/')

## Original Source
Supertest Documentation
https://github.com/visionmedia/supertest

## Digest of SUPERTEST

# SuperTest Documentation

## Overview
SuperTest is a high-level abstraction for testing HTTP servers based on superagent. It supports both callback and promise styles, HTTP/1.1 and HTTP/2 protocols, and integrates with various test frameworks such as Mocha.

## Installation

To install SuperTest, run:

npm install supertest --save-dev

Then require it in your code:

const request = require('supertest');

## Basic Usage and Examples

### Passing an HTTP Server or a Function

You can pass an instance of http.Server or a Function. If the server is not listening, SuperTest binds it to an ephemeral port.

Example:

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

Pass an options object with http2 set to true either to request or request.agent:

const request = require('supertest');

request(app, { http2: true })
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

// Or using a persistent agent:

const agent = request.agent(app, { http2: true });
agent.get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

### Mocha Integration and Async Patterns

Using Mocha with callback:

describe('GET /user', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

Using promises:

describe('GET /users', function() {
  it('responds with json', function() {
    return request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
         // Example assertion
         expect(response.body.email).toEqual('foo@bar.com');
      });
  });
});

Or async/await:

describe('GET /users', function() {
  it('responds with json', async function() {
    const response = await request(app)
      .get('/users')
      .set('Accept', 'application/json');
    expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.email).toEqual('foo@bar.com');
  });
});

### Authentication and Custom Assertions

You can use the auth method to pass HTTP username and password:

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

Custom function assertions can be passed to modify the response before final verification:

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
  }, function(err) {
    if (err) throw err;
  });

### Multipart File Uploads

SuperTest can handle multipart file uploads using superagent methods:

request(app)
  .post('/')
  .field('name', 'my awesome avatar')
  .field('complex_object', '{"attribute": "value"}', { contentType: 'application/json' })
  .attach('avatar', 'test/fixtures/avatar.jpg')
  .end(function(err, res) {
    if (err) throw err;
  });

## API Methods

SuperTest supports all superagent methods including .write(), .pipe(), etc. Common assertions include:

.expect(status[, fn])                 // Assert response status code
.expect(status, body[, fn])           // Assert status and body
.expect(body[, fn])                   // Assert response body
.expect(field, value[, fn])           // Assert header field value
.expect(function(res){})              // Custom assertion function
.end(fn)                              // Finalize the request

## Cookie and Agent Management

Persistent sessions and cookie management can be achieved using request.agent:

const agent = request.agent(app);

// Example: saving and sending cookies
agent.get('/')
  .expect('set-cookie', 'cookie=hey; Path=/')
  .end(function(err) {
    if (err) throw err;
    agent.get('/return')
      .expect('hey', function(err) {
         if (err) throw err;
      });
  });

## License

Licensed under the MIT License.

## Attribution
- Source: Supertest Documentation
- URL: https://github.com/visionmedia/supertest
- License: MIT License
- Crawl Date: 2025-04-26T23:47:26.179Z
- Data Size: 600776 bytes
- Links Found: 4862

## Retrieved
2025-04-26
