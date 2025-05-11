# SUPERTEST

## Crawl Summary
Installation via npm. Initialize request(appOrUrl,options) or agent(appOrUrl,options). Chain HTTP verb methods: .get/.post/.put/.delete/.patch/.head/.options. Chain modifiers: .send, .set, .auth, .field, .attach, .query, .timeout. Use .expect overloads: status, body, header, custom fn. Finalize with .end(callback). Promise, async/await support. HTTP/2 via {http2:true}. Agent persists cookies. Response mutation via custom .expect(fn).

## Normalised Extract
Table of Contents
1 Installation
2 Initialization
3 HTTP Methods
4 Request Modifiers
5 Expectations
6 Completion
7 Promise / Async Support
8 Custom Assertions
9 Cookie Persistence

1 Installation
Install SuperTest as dev dependency: npm install supertest --save-dev

2 Initialization
const request= require('supertest');
const requestH2= request(app,{http2:true});
const agent= request.agent(app);
const agentH2= request.agent(app,{http2:true});

3 HTTP Methods
.get(path)  .post(path)  .put(path)  .delete(path)  .patch(path)  .head(path)  .options(path)
Returns Test object.

4 Request Modifiers
.send(body)      // JSON, form
.set(name,value) // headers
.auth(user,pass,options) // basic, bearer
.field(name,value,opts) // multipart field
.attach(name,fileOrBuffer,opts) // file upload
.query(params)   // URL query
.timeout(value)  // ms or {response,deadline}

5 Expectations
.expect(status[,callback])
.expect(status,body[,callback])
.expect(body[,callback])     // string, regex, object
.expect(field,value[,callback])
.expect(fn)                 // custom transform/assert
Returns Test.

6 Completion
.end(callback(err,res))  // invoke request

7 Promise / Async Support
Any Test supports then(callback) returning Promise.

8 Custom Assertions
Use .expect(fn) to mutate res before other expects.

9 Cookie Persistence
Use agent = request.agent(app) to persist cookies between calls.

## Supplementary Details
Initialization options:
- http2: boolean (default false). Enables HTTP/2 for request or agent.
- agent: persistent cookie jar and header storage.

.send(body)
- Accepts JS Object: sets Content-Type: application/json and JSON stringify.
- Accepts string: sends raw body.

.auth(username,password,options)
- options.type: 'basic' | 'bearer' (default basic).

.multi-part uploads:
.field(name,value,{contentType}) // default text/plain
.attach(field,pathOrBuffer,{filename,contentType})

.timeout(msOrObject)
- number: socket and response timeout.
- object: {response: ms, deadline: ms}


## Reference Details
API Signatures and Return Types

function request(appOrUrl: http.Server|Function|string, options?:{http2?:boolean}): Test
function agent(appOrUrl: http.Server|Function|string, options?:{http2?:boolean}): Agent

Class Test extends superagent.Request:

.get(path: string): Test
.post(path: string): Test
.put(path: string): Test
.delete(path: string): Test
.patch(path: string): Test
.head(path: string): Test
.options(path: string): Test
.send(body: Object|string): Test
.set(field: string, value: string): Test
.query(params: Object|string): Test
.auth(username: string, password: string, options?:{type?:string}): Test
.field(name: string, value: string, options?:{contentType?:string}): Test
.attach(field: string, pathOrBuffer: string|Buffer, options?:{filename?:string, contentType?:string}): Test
.timeout(timeout: number|{response?:number, deadline?:number}): Test
.expect(status: number, fn?: (res: Response)=>void): Test
.expect(status: number, body: any, fn?: (res: Response)=>void): Test
.expect(body: string|RegExp|Object, fn?: (res: Response)=>void): Test
.expect(field: string, value: string|RegExp, fn?: (res: Response)=>void): Test
.expect(fn: (res: Response)=>void): Test
.end(fn: (err: Error|null, res: Response)=>void): void
.then(onFulfilled: (res: Response)=>any, onRejected?: (err:any)=>any): Promise<any>
.catch(onRejected: (err:any)=>any): Promise<any>

Configuration Options and Effects
- {http2:true}: uses HTTP/2 API of superagent.
- agent(): persists cookies and header state per Domain/Path.

Implementation Patterns
1 Standard GET
request(app)
  .get('/user')
  .set('Accept','application/json')
  .expect('Content-Type',/json/)
  .expect(200)
  .end(cb);

2 POST with JSON
request(app)
  .post('/users')
  .send({name:'john'})
  .set('Accept','application/json')
  .expect(200)
  .end((err,res)=>{ if(err) return done(err); done(); });

3 Using promises
return request(app)
  .get('/users')
  .expect(200)
  .then(res=>{ expect(res.body.id).toBeDefined(); });

4 Async/Await
const res = await request(app).get('/users');
expect(res.status).toBe(200);

Best Practices
- Always include status in .expect to catch errors correctly.
- Use agent() for multi-request workflows requiring session/cookies.
- Chain .expect(fn) before status/body assertions for response mutation.

Troubleshooting
Error: AssertionError
- Occurs when .expect fails and .end is used without rethrow.
- Fix: in .end, if(err) return done(err).

Error: socket hang up
- Occurs when server does not respond within default timeout.
- Fix: set .timeout({response:5000,deadline:10000}).

Expected content-type 'application/json' but got 'text/html'
- Ensure .set('Accept','application/json').


## Information Dense Extract
install supertest via npm. const request=require('supertest'); request(app[,{http2:true}]); agent(app[,{http2:true}]). Test methods: .get/.post/.put/.delete/.patch/.head/.options(path):Test. Modifiers: .send(body:Object|String)->JSON, .set(header,value), .auth(user,pass,{type:'basic'|'bearer'}), .field/attach for multipart, .query(params), .timeout(ms|{response,deadline}). Expectations overloads: .expect(status[,fn]), .expect(status,body[,fn]), .expect(body[,fn]), .expect(field,value[,fn]), .expect(fn). Finalize: .end(callback(err,res)). Promises: .then/.catch. Async/await. Options: http2 enables HTTP/2. Agent persists cookies. Custom assert via .expect(fn). Common patterns: GET, POST JSON, file upload, cookie tests. Troubleshooting: use .timeout(), include status in .expect, handle errors in .end callback.

## Sanitised Extract
Table of Contents
1 Installation
2 Initialization
3 HTTP Methods
4 Request Modifiers
5 Expectations
6 Completion
7 Promise / Async Support
8 Custom Assertions
9 Cookie Persistence

1 Installation
Install SuperTest as dev dependency: npm install supertest --save-dev

2 Initialization
const request= require('supertest');
const requestH2= request(app,{http2:true});
const agent= request.agent(app);
const agentH2= request.agent(app,{http2:true});

3 HTTP Methods
.get(path)  .post(path)  .put(path)  .delete(path)  .patch(path)  .head(path)  .options(path)
Returns Test object.

4 Request Modifiers
.send(body)      // JSON, form
.set(name,value) // headers
.auth(user,pass,options) // basic, bearer
.field(name,value,opts) // multipart field
.attach(name,fileOrBuffer,opts) // file upload
.query(params)   // URL query
.timeout(value)  // ms or {response,deadline}

5 Expectations
.expect(status[,callback])
.expect(status,body[,callback])
.expect(body[,callback])     // string, regex, object
.expect(field,value[,callback])
.expect(fn)                 // custom transform/assert
Returns Test.

6 Completion
.end(callback(err,res))  // invoke request

7 Promise / Async Support
Any Test supports then(callback) returning Promise.

8 Custom Assertions
Use .expect(fn) to mutate res before other expects.

9 Cookie Persistence
Use agent = request.agent(app) to persist cookies between calls.

## Original Source
SuperTest HTTP Assertions
https://github.com/visionmedia/supertest

## Digest of SUPERTEST

# SuperTest HTTP Assertions
Date Retrieved: 2024-06-22
Data Size: 661757 bytes

## Installation

Install via npm as a development dependency:

```
npm install supertest --save-dev
```

## Initialization

Require and initialize SuperTest with an HTTP server instance, Express app, or URL string. Optionally enable HTTP/2:

```js
const request = require('supertest');              // default HTTP/1.x
const requestH2 = require('supertest')(app, {http2:true});
const agent = require('supertest').agent(app);      // persistent cookies
const agentH2 = require('supertest').agent(app, {http2:true});
``` 

## Core Test Methods and Signatures

### request(appOrUrl: Server|Function|string, options?: {http2?: boolean}): Test
Binds server to an ephemeral port if not already listening.

### agent(appOrUrl: Server|Function|string, options?: {http2?: boolean}): Agent
Persists cookies and headers across multiple requests.

### HTTP verb methods inherited from superagent
```
.get(path: string): Test
.post(path: string): Test
.put(path: string): Test
.delete(path: string): Test
.patch(path: string): Test
.head(path: string): Test
.options(path: string): Test
``` 

### Chainable request modifiers
```
.send(body: Object|string): Test            // JSON or form data
.set(field: string, value: string): Test      // request headers
.auth(username: string, password: string, options?: {type?:string}): Test
.field(name: string, value: string, options?:{contentType?:string}): Test  // multipart
.attach(field: string, pathOrBuffer: string|Buffer, options?:{filename?:string, contentType?:string}): Test
.query(params: Object|string): Test
.timeout(ms: number|Object): Test
``` 

### Expectations
```
.expect(status: number, fn?: (res: Response)=>void): Test
.expect(status: number, body: any, fn?: (res: Response)=>void): Test
.expect(body: string|RegExp|Object, fn?: (res: Response)=>void): Test
.expect(field: string, value: string|RegExp, fn?: (res: Response)=>void): Test
.expect(fn: (res: Response)=>void): Test
``` 

### Finalizing request
```
.end(fn: (err: Error|null, res: Response)=>void): void  // callback style
``` 

## Promises and Async/Await

Promise support:
```js
return request(app)
  .get('/users')
  .expect(200)
  .then(response => {
    expect(response.body).toMatchObject({email:'foo@bar.com'});
  });
```

Async/await support:
```js
const response = await request(app)
  .get('/users')
  .set('Accept','application/json');
expect(response.status).toBe(200);
expect(response.body.email).toBe('foo@bar.com');
```

## Custom Assertions and Response Mutations

Use function assertion to transform response before comparing:
```js
.expect(res=>{
  res.body.id = 'fixed';
  res.body.name = res.body.name.toLowerCase();
})
.expect(200, {id:'fixed',name:'john'}, done);
```

## Cookie Persistence with Agent
```js
const agent = request.agent(app);
agent.get('/')
  .expect('set-cookie','session=abc; Path=/')
  .end(err=>{});
agent.get('/profile')
  .expect(200, done);
```


## Attribution
- Source: SuperTest HTTP Assertions
- URL: https://github.com/visionmedia/supertest
- License: MIT
- Crawl Date: 2025-05-11T00:01:01.169Z
- Data Size: 661757 bytes
- Links Found: 5354

## Retrieved
2025-05-11
