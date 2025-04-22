# NODEJS_API

## Crawl Summary
The Node.js API documentation provides detailed technical specifications including a complete HTTP server example and extensive assertion testing APIs. Key topics include HTTP server setup with createServer, detailed usage of the assert module in both strict and legacy modes, the construction and use of assert.AssertionError, and the deprecated assert.CallTracker with its methods (calls, getCalls, report, reset, verify). It also documents full method signatures, parameter types, default values, and code snippets demonstrating their usage.

## Normalised Extract
## Table of Contents

1. HTTP Server Example
   - Code example for creating a server using node:http
   - Listening configuration: port 3000, host 127.0.0.1
2. Assertion Testing
   - Strict assertion mode: import from 'node:assert/strict' and usage of assert.deepStrictEqual
   - Legacy assertion mode: import from 'node:assert'
3. Assert API Specifications
   - Detailed method signatures including: assert(), assert.deepEqual(), assert.strictEqual(), etc.
4. assert.AssertionError
   - Constructor and options (message, actual, expected, operator, stackStartFn)
5. assert.CallTracker (Deprecated)
   - Methods: calls(fn, exact), getCalls(fn), report(), reset(fn), verify()

## 1. HTTP Server Example

- **Import:** `import { createServer } from 'node:http';`
- **Usage:** Create a server, set response headers and status, and listen on a specified host and port.
- **Code:**

```js
import { createServer } from 'node:http';
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
```

## 2. Assertion Testing

### Strict Mode
- **Import:** `import { strict as assert } from 'node:assert';`
- **Method Example:** `assert.deepStrictEqual(actual, expected, [message])`

### Legacy Mode
- **Import:** `import assert from 'node:assert';`

## 3. Assert API Specifications

- `assert(value[, message])`: Tests truthiness.
- `assert.deepEqual(actual, expected[, message])`: Compares using loose equality rules.
- `assert.deepStrictEqual(actual, expected[, message])`: Compares using strict equality including Object.is and prototype checking.
- `assert.doesNotMatch(string, regexp[, message])`: Asserts string does not match regexp.
- `assert.doesNotReject(asyncFn[, error][, message])`: Returns a promise that ensures no rejection.
- `assert.doesNotThrow(fn[, error][, message])`: Asserts function does not throw.

## 4. assert.AssertionError

- **Constructor:** `new assert.AssertionError(options)`
  - Options:
    - message: string
    - actual: any
    - expected: any
    - operator: string
    - stackStartFn: Function

## 5. assert.CallTracker

- **Constructor:** `new assert.CallTracker()`
- **Methods:**
  - `calls(fn, [exact])`: Wraps a function to be called exactly `exact` times (default 1).
  - `getCalls(fn)`: Returns an array of objects `{ thisArg, arguments }`.
  - `report()`: Provides detailed call count mismatch reports.
  - `reset([fn])`: Resets call tracking.
  - `verify()`: Validates that functions were invoked the expected number of times.


## Supplementary Details
### HTTP Server Configuration
- **Port:** 3000
- **Host:** 127.0.0.1
- **Response Header:** Content-Type set to 'text/plain'
- **Default Logging:** Console outputs listening status.

### Assertion Module Detailed Specs
- **Strict Mode:** Automatically uses deep strict equality comparisons (e.g., Object.is for NaN, compares prototypes).
- **Legacy Mode:** Uses non-strict type coercion (==) which can lead to unintended pass conditions.

### assert.AssertionError Options
- **message:** Custom error message string.
- **actual & expected:** Values being compared (any type).
- **operator:** Comparison operator string (e.g., 'strictEqual').
- **stackStartFn:** Function reference to omit stack trace frames.

### assert.CallTracker Methods
- **calls(fn, exact=1):** 
  - **Parameter:** Function to monitor, exact call count (default 1).
  - **Return:** Wrapped function that records each call with parameters and context.
- **getCalls(fn):** 
  - **Return:** Array of call records with keys `thisArg` and `arguments`.
- **report():** 
  - **Return:** Array of mismatch reports detailing expected vs actual call counts, including stack traces.
- **reset([fn]):** Resets call counts for a specific function or all if none provided.
- **verify():** 
  - **Behavior:** Throws an error if any tracked function has not met the expected call count.


## Reference Details
### Complete API Specifications and Code Examples

#### HTTP Server API

- **Method:** createServer(callback: (req: IncomingMessage, res: ServerResponse) => void): Server
  - **Example:**
    ```js
    import { createServer } from 'node:http';
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World!\n');
    });
    server.listen(3000, '127.0.0.1', () => {
      console.log('Listening on 127.0.0.1:3000');
    });
    ```

#### assert Module API

1. assert(value: any, message?: string | Error): void
2. assert.deepEqual(actual: any, expected: any, message?: string | Error): void
3. assert.deepStrictEqual(actual: any, expected: any, message?: string | Error): void
4. assert.strictEqual(actual: any, expected: any, message?: string | Error): void
5. assert.doesNotMatch(string: string, regexp: RegExp, message?: string | Error): void
6. assert.doesNotReject(asyncFn: Function | Promise<any>, error?: RegExp | Function, message?: string): Promise<void>
7. assert.doesNotThrow(fn: Function, error?: RegExp | Function, message?: string): void
8. assert.ifError(value: any): void
9. assert.match(string: string, regexp: RegExp, message?: string | Error): void
10. assert.notDeepEqual(actual: any, expected: any, message?: string | Error): void
11. assert.notDeepStrictEqual(actual: any, expected: any, message?: string | Error): void
12. assert.notEqual(actual: any, expected: any, message?: string | Error): void
13. assert.notStrictEqual(actual: any, expected: any, message?: string | Error): void
14. assert.ok(value: any, message?: string | Error): void
15. assert.rejects(asyncFn: Function | Promise<any>, error?: RegExp | Function, message?: string): Promise<void>
16. assert.throws(fn: Function, error?: RegExp | Function, message?: string): void
17. assert.partialDeepStrictEqual(actual: any, expected: any, message?: string | Error): void

#### assert.AssertionError

- **Signature:**
  ```js
  new assert.AssertionError({ message?: string, actual: any, expected: any, operator: string, stackStartFn?: Function })
  ```

- **Properties:**
  - message: string
  - actual: any
  - expected: any
  - operator: string
  - generatedMessage: boolean (true if auto-generated)
  - code: string ('ERR_ASSERTION')

- **Example:**
  ```js
  import assert from 'node:assert/strict';
  const { message } = new assert.AssertionError({ actual: 1, expected: 2, operator: 'strictEqual' });
  try {
    assert.strictEqual(1, 2);
  } catch (err) {
    console.error(err.message);
  }
  ```

#### assert.CallTracker (Deprecated)

- **Constructor:**
  ```js
  const tracker = new assert.CallTracker();
  ```

- **Methods:**
  - `calls(fn: Function, exact?: number): Function`
    - **Usage:**
      ```js
      const trackedFn = tracker.calls(myFunction, 2);
      trackedFn();
      trackedFn();
      ```
  - `getCalls(fn: Function): Array<{ thisArg: any, arguments: any[] }>`
  - `report(): Array<{ message: string, actual: number, expected: number, operator: string, stack: Object }>`
  - `reset(fn?: Function): void`
  - `verify(): void`
    - **Behavior:** Throws error if tracked functions have not been called the exact expected number of times.

- **Full Example:**
  ```js
  import assert from 'node:assert';
  import process from 'node:process';

  const tracker = new assert.CallTracker();
  function func() { /* implementation */ }
  const callsFunc = tracker.calls(func, 1);
  callsFunc();
  // Verification should be done at program exit
  process.on('exit', () => {
    tracker.verify();
  });
  ```

#### Best Practices and Troubleshooting

- **HTTP Server:** Use version managers to install Node.js. Ensure port and host are correctly configured to avoid binding errors.
- **Assertion Testing:** Prefer strict assertions to catch subtle errors. When using CallTracker, always call verify() to enforce call count constraints.
- **Troubleshooting Assertions:** Check for type mismatches especially when comparing objects and primitives; use deepStrictEqual for best results.
- **Environment Variables:** Use NO_COLOR or NODE_DISABLE_COLORS to disable colorized output in error messages if needed.

**Commands for Troubleshooting:**

- Run server with detailed logging:
  ```bash
  node server.mjs
  ```
- For assertion failures, re-run tests with increased verbosity or log the error's stack trace to identify mismatches.

This complete reference is intended to be directly integrated into development environments without requiring further external lookup.

## Original Source
Node.js API Documentation
https://nodejs.org/api/

## Digest of NODEJS_API

# Node.js API Documentation

**Retrieved Date:** 2023-10-07

## Table of Contents

1. HTTP Server Example
2. Assertion Testing
   - Strict Assertion Mode
   - Legacy Assertion Mode
   - assert.AssertionError Class
   - assert.CallTracker Class
3. API Method Signatures and Code Examples

## 1. HTTP Server Example

**Code Example:**

```js
// server.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  // Setting HTTP headers
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Ending response with plain text
  res.end('Hello World!\n');
});

// Start server on 127.0.0.1:3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// Run with `node server.mjs`
```

## 2. Assertion Testing

### 2.1 Strict Assertion Mode

To use strict mode, import as follows:

```js
import { strict as assert } from 'node:assert';
// or
import assert from 'node:assert/strict';
```

The strict methods automatically compare values using deep strict equality. Example:

```js
assert.deepStrictEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);
```

### 2.2 Legacy Assertion Mode

Legacy mode uses non-strict comparisons (== for equality). Import as:

```js
import assert from 'node:assert';
```

*Note:* Legacy mode may produce surprising results (e.g. comparing regex and dates).

### 2.3 Class: assert.AssertionError

**Usage:**

Constructor signature:

```js
new assert.AssertionError(options)
```

**Options Object Properties:**
- message: string (error message if provided)
- actual: any (actual value)
- expected: any (expected value)
- operator: string (e.g., 'strictEqual')
- stackStartFn: Function (to omit stack frames before this function)

**Example:**

```js
import assert from 'node:assert/strict';

const { message } = new assert.AssertionError({
  actual: 1,
  expected: 2,
  operator: 'strictEqual'
});

try {
  assert.strictEqual(1, 2);
} catch (err) {
  assert(err instanceof assert.AssertionError);
  assert.strictEqual(err.message, message);
  assert.strictEqual(err.name, 'AssertionError');
  assert.strictEqual(err.actual, 1);
  assert.strictEqual(err.expected, 2);
  assert.strictEqual(err.code, 'ERR_ASSERTION');
  assert.strictEqual(err.operator, 'strictEqual');
  assert.strictEqual(err.generatedMessage, true);
}
```

### 2.4 Class: assert.CallTracker (Deprecated)

**Usage:**

Constructor:

```js
new assert.CallTracker()
```

**Method Signatures:**

- `tracker.calls(fn, exact?)`
  - fn: Function (the function to wrap)
  - exact: number (default 1) 
  - **Returns:** Wrapped Function that must be called exactly `exact` times

- `tracker.getCalls(fn)`
  - **Returns:** Array of call records `{ thisArg, arguments }`

- `tracker.report()`
  - **Returns:** Array of objects with details: `{ message, actual, expected, operator, stack }`

- `tracker.reset(fn?)`
  - Resets the call count; if fn is provided, only resets that function.

- `tracker.verify()`
  - Throws an error if any tracked function is not called exact times.

**Example:**

```js
import assert from 'node:assert';
import process from 'node:process';

const tracker = new assert.CallTracker();

function func() {}

// Wrap function to be called exactly 1 time
const callsFunc = tracker.calls(func, 1);

callsFunc();

process.on('exit', () => {
  tracker.verify();
});
```

## 3. API Method Signatures and Code Examples

### assert API Methods

- `assert(value, [message])`
  - **Description:** Tests if a value is truthy.

- `assert.deepEqual(actual, expected, [message])`
  - **Description:** Tests for deep equality using loose equality rules (Legacy mode).

- `assert.deepStrictEqual(actual, expected, [message])`
  - **Description:** Tests for deep equality using strict rules (uses Object.is, compares prototypes, etc.).

- `assert.doesNotMatch(string, regexp, [message])`
  - **Parameters:**
    - string: string
    - regexp: RegExp
    - message: string | Error

- `assert.doesNotReject(asyncFn, [error], [message]) => Promise`
  - **Description:** Awaits async function and asserts it does not reject.

- `assert.doesNotThrow(fn, [error], [message])`
  - **Description:** Asserts that a function does not throw.

Other assertion methods include:

- `assert.equal(actual, expected, [message])`
- `assert.fail([message])`
- `assert.ifError(value)`
- `assert.match(string, regexp, [message])`
- `assert.notDeepEqual(actual, expected, [message])`
- `assert.notDeepStrictEqual(actual, expected, [message])`
- `assert.notEqual(actual, expected, [message])`
- `assert.notStrictEqual(actual, expected, [message])`
- `assert.ok(value, [message])`
- `assert.rejects(asyncFn, [error], [message])`
- `assert.strictEqual(actual, expected, [message])`
- `assert.throws(fn, [error], [message])`
- `assert.partialDeepStrictEqual(actual, expected, [message])`

### Example: Running a Hello World HTTP Server and Assertion Test

```js
// hello-world.js
const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// Test using assert
const assert = require('node:assert/strict');
assert.strictEqual(typeof server.listen, 'function');
```


## Attribution
- Source: Node.js API Documentation
- URL: https://nodejs.org/api/
- License: Public Documentation (various licenses)
- Crawl Date: 2025-04-21T22:47:26.926Z
- Data Size: 4089407 bytes
- Links Found: 3186

## Retrieved
2025-04-21
