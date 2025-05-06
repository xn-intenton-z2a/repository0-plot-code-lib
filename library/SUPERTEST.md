# SUPERTEST

## Crawl Summary
Installation: npm install supertest --save-dev. Initialize: const request = require('supertest'); request(app[,options]) returns Test bound to an ephemeral port. Options: {http2:boolean}. Methods: get, post, put, patch, delete, head, options; each returns Test. Configuration: .send(body), .set(field,value), .auth(user,pass,options). Multipart: .field(name,value[,options]), .attach(field,file[,options]). Expectations: .expect(status[,fn]), .expect(status,body[,fn]), .expect(body[,fn]), .expect(field,value[,fn]), .expect(fn). Expectations run in order; failures passed to .end. Finalize: .end(fn) or promise thenable. Response: {status,headers,body,text}. Supports callbacks, promises, async/await. HTTP/2: request(app,{http2:true}), request.agent(app,{http2:true}). Agent: maintain cookies.

## Normalised Extract
Table of Contents:
1. Installation & Setup
2. Initialization
3. HTTP Methods
4. Request Configuration
5. File Upload (Multipart)
6. Expectations API
7. Finalizing Requests
8. Response Structure
9. Promise & Async Support
10. HTTP/2 Option
11. Agent & Cookie Persistence

1. Installation & Setup
npm install supertest --save-dev

2. Initialization
const request = require('supertest');

3. HTTP Methods
request(app,options).get(path) → Test
request(app,options).post(path) → Test
request(app,options).put(path) → Test
request(app,options).patch(path) → Test
request(app,options).delete(path) → Test
request(app,options).head(path) → Test
request(app,options).options(path) → Test

4. Request Configuration
.send(body: any) → Test  // JSON if object, form otherwise
.set(field: string, value: string|RegExp) → Test
.auth(user: string, pass: string, options?: {type?:string}) → Test  // type defaults to basic

5. File Upload (Multipart)
.field(name: string, value: string, options?: {contentType:string}) → Test
.attach(field: string, file: string|Buffer, options?: {filename?:string,contentType?:string}) → Test

6. Expectations API
.expect(status: number[, fn]) → Test
.expect(status: number, body: any[, fn]) → Test
.expect(body: string|RegExp|object[, fn]) → Test
.expect(field: string, value: string|RegExp[, fn]) → Test
.expect(assertFn: (res:Response)=>void) → Test

7. Finalizing Requests
.end(fn?: (err:Error,res:Response)=>void) → void

8. Response Structure
status: number
headers: object
body: any
text: string

9. Promise & Async Support
Test implements Promise<Response>
// Promise
test.then(res=>{})
// Async/Await
const res=await test;

10. HTTP/2 Option
request(app,{http2:true})
request.agent(app,{http2:true})

11. Agent & Cookie Persistence
const agent = request.agent(app[,options]);
agent.get(path)
     .expect('set-cookie',cookieString)
     .end();

## Supplementary Details
- Default port: ephemeral if server not listening
- Error behavior: HTTP errors (non-2xx) passed as err argument if no .expect(status)
- Order of .expect calls determines execution sequence
- JSON payload: .send(obj) sets Content-Type: application/json
- x-www-form-urlencoded payload: .send('key=value') sets Content-Type: application/x-www-form-urlencoded
- Cookie header: .set('Cookie', ['key1=val1;key2=val2'])
- Agent retains cookies set via Set-Cookie across subsequent calls
- HTTP Basic auth: .auth(user,pass,'basic') sets Authorization: Basic base64(user:pass)
- Bearer auth: .auth(token,{type:'bearer'}) sets Authorization: Bearer token
- Custom assertion: .expect(res=>{ if(condition) throw new Error() })


## Reference Details
// Complete Test usage pattern
// 1. Install
npm install supertest --save-dev

// 2. Import
const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());
app.post('/users', (req,res)=>{ res.status(201).json({id:'123',name:req.body.name}); });

// 3. Callback style
request(app)
  .post('/users')                        // method and path
  .send({name:'john'})                   // JSON payload
  .set('Accept','application/json')      // header
  .expect('Content-Type',/json/)         // header assertion
  .expect(201, {id:'123',name:'john'})   // status and body assertion
  .end((err,res)=>{                      // finalize
    if(err) return done(err);
    return done();
  });

// 4. Promise style
return request(app)
  .get('/users')
  .set('Accept','application/json')
  .expect(200)
  .then(res=>{
    expect(res.body).toHaveProperty('email');
  });

// 5. Async/Await
it('should fetch user', async ()=>{
  const res = await request(app)
    .get('/users/123')
    .expect(200);
  expect(res.headers['content-type']).toMatch(/json/);
});

// 6. HTTP/2
const http2Req = request(app,{http2:true}).get('/user');

// 7. Agent & Cookies
const agent = request.agent(app);
agent.get('/login').expect('set-cookie','sid=abc; Path=/; HttpOnly');
agent.get('/profile').expect(200, done);

// 8. File upload
request(app)
  .post('/upload')
  .field('name','avatar')
  .attach('file','./avatar.jpg',{filename:'avatar.jpg',contentType:'image/jpeg'})
  .expect(200, done);

// 9. Custom assertion
request(app)
  .get('/data')
  .expect(res=>{
    if(!res.body.items.length) throw new Error('No items');
  })
  .end(done);

// 10. Troubleshooting
// Test hangs: ensure .end(done) or return promise
// Unexpected JSON parsing: confirm express.json() middleware loaded
// HTTP/2 failed: check Node.js HTTP/2 support version

// Default Config Options
// http2: false


## Information Dense Extract
npm install supertest --save-dev; const request=require('supertest'); request(app[, {http2:boolean}]) → Test; request.agent(app[, {http2}]) → Test; HTTP methods: .get(path), .post(path), .put(path), .patch(path), .delete(path), .head(path), .options(path); config: .send(body), .set(field,value), .auth(user,pass[,options]); multipart: .field(name,value[,options]), .attach(field,file[,options]); expectations: .expect(status[,fn]), .expect(status,body[,fn]), .expect(body[,fn]), .expect(field,value[,fn]), .expect(fn); finalize: .end(fn) or promise thenable; Response: {status,headers,body,text}; errors: non-2xx → err if no .expect(status); agent retains Set-Cookie; order of expects enforced; async/await supported; http2 opt; custom assertions; troubleshooting: missing .end or return; JSON payload via express.json().

## Sanitised Extract
Table of Contents:
1. Installation & Setup
2. Initialization
3. HTTP Methods
4. Request Configuration
5. File Upload (Multipart)
6. Expectations API
7. Finalizing Requests
8. Response Structure
9. Promise & Async Support
10. HTTP/2 Option
11. Agent & Cookie Persistence

1. Installation & Setup
npm install supertest --save-dev

2. Initialization
const request = require('supertest');

3. HTTP Methods
request(app,options).get(path)  Test
request(app,options).post(path)  Test
request(app,options).put(path)  Test
request(app,options).patch(path)  Test
request(app,options).delete(path)  Test
request(app,options).head(path)  Test
request(app,options).options(path)  Test

4. Request Configuration
.send(body: any)  Test  // JSON if object, form otherwise
.set(field: string, value: string|RegExp)  Test
.auth(user: string, pass: string, options?: {type?:string})  Test  // type defaults to basic

5. File Upload (Multipart)
.field(name: string, value: string, options?: {contentType:string})  Test
.attach(field: string, file: string|Buffer, options?: {filename?:string,contentType?:string})  Test

6. Expectations API
.expect(status: number[, fn])  Test
.expect(status: number, body: any[, fn])  Test
.expect(body: string|RegExp|object[, fn])  Test
.expect(field: string, value: string|RegExp[, fn])  Test
.expect(assertFn: (res:Response)=>void)  Test

7. Finalizing Requests
.end(fn?: (err:Error,res:Response)=>void)  void

8. Response Structure
status: number
headers: object
body: any
text: string

9. Promise & Async Support
Test implements Promise<Response>
// Promise
test.then(res=>{})
// Async/Await
const res=await test;

10. HTTP/2 Option
request(app,{http2:true})
request.agent(app,{http2:true})

11. Agent & Cookie Persistence
const agent = request.agent(app[,options]);
agent.get(path)
     .expect('set-cookie',cookieString)
     .end();

## Original Source
Supertest HTTP Assertions Library
https://github.com/visionmedia/supertest#readme

## Digest of SUPERTEST

# Installation

npm install supertest --save-dev

# Initialization

Import SuperTest and create a Test function:

```js
const request = require('supertest');
// or
import request from 'supertest';
```

# request(app[, options])

- **app**: http.Server|Function
- **options**: { http2?: boolean }
  - http2: enable HTTP/2 protocol (default: false)

Returns a Test instance bound to app on an ephemeral port if not listening.

# request.agent(app[, options])

Creates a persistent Test instance that maintains cookies across requests.

# HTTP Methods

Test.VERB(path)

- **path**: string URL or route
- VERB ∈ {get, post, put, patch, delete, head, options}

Each method returns a Test instance.

# Request Configuration

- .send(body: any): Test     – sets JSON or form payload based on type
- .set(field: string, value: string|RegExp): Test  – set HTTP header
- .auth(user: string, pass: string, options?: { type?: string }): Test – HTTP Basic or Bearer auth

# File Uploads (Multipart Form)

- .field(name: string, value: string, options?: { contentType: string }): Test
- .attach(field: string, file: string|Buffer, options?: { filename?: string, contentType?: string }): Test

# Expectations

- .expect(status: number[, fn]): Test
- .expect(status: number, body: any[, fn]): Test
- .expect(body: string|RegExp|object[, fn]): Test
- .expect(field: string, value: string|RegExp[, fn]): Test
- .expect(assertFn: (res: Response) => void): Test

Expectations are executed in definition order. Assertion failure returns error to .end callback unless thrown manually.

# Finalizing the Test

- .end(fn?: (err: Error, res: Response) => void): void

If no callback is provided, Test instance is a thenable Promise resolving with Response.

# Response Object

- **status**: number
- **headers**: object
- **body**: any (parsed JSON or text)
- **text**: string (raw response body)

# Callbacks, Promises, Async/Await

```js
// Callback
request(app).get('/user').expect(200).end((err,res)=>{ if(err) throw err });

// Promise
return request(app).get('/users').expect(200).then(res=>{ /* assertions */ });

// Async/Await
const res = await request(app).get('/users').expect(200);
```

# HTTP2 Support

Enable HTTP/2 with options:
```js
request(app,{http2:true})
request.agent(app,{http2:true})
```

# Agent (Cookie Persistence)

```js
const agent = request.agent(app);
agent.get('/').expect('set-cookie','cookie=hey; Path=/');
agent.get('/return').expect('hey');
```


## Attribution
- Source: Supertest HTTP Assertions Library
- URL: https://github.com/visionmedia/supertest#readme
- License: License: MIT
- Crawl Date: 2025-05-06T22:28:57.624Z
- Data Size: 658264 bytes
- Links Found: 5412

## Retrieved
2025-05-06
