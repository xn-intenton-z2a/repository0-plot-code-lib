# NODE_API

## Crawl Summary
Node.js API documentation includes a complete HTTP server example using createServer, detailed usage of the assert module with strict and legacy modes, comprehensive class specifications for assert.AssertionError and assert.CallTracker, and method signatures for various assertion functions such as deepEqual, deepStrictEqual, doesNotMatch, doesNotReject, doesNotThrow, equal, fail, ifError, match, notDeepEqual, notDeepStrictEqual, notEqual, notStrictEqual, ok, rejects, strictEqual, throws, and partialDeepStrictEqual. Each method details parameters, expected types, return types, and code examples for implementation.

## Normalised Extract
TABLE OF CONTENTS:
1. HTTP Server
  - createServer from node:http
  - Method Signature: createServer(requestListener: (req: IncomingMessage, res: ServerResponse) => void): Server
  - Usage: server.listen(port, hostname, callback)
  - Code Example: Setup a server that writes a 200 status and 'Hello World!\n'
2. Assertion Module
  - Modes: Strict (import from 'node:assert/strict') and Legacy (import from 'node:assert')
  - Class: assert.AssertionError
    * Constructor Options: { message?: string, actual: any, expected: any, operator: string, stackStartFn?: Function }
    * Properties: message, actual, expected, operator, generatedMessage (boolean), code ('ERR_ASSERTION')
  - Class: assert.CallTracker (Deprecated)
    * Methods: calls(fn, exact), getCalls(fn), report(), reset(fn), verify()
  - Assertion Functions:
    * assert(value[, message])
    * assert.deepEqual(actual, expected[, message])
    * assert.deepStrictEqual(actual, expected[, message])
    * assert.doesNotMatch(string, regexp[, message])
    * assert.doesNotReject(asyncFn[, error][, message])
    * assert.doesNotThrow(fn[, error][, message])
    * assert.equal(actual, expected[, message])
    * assert.fail([message])
    * assert.ifError(value)
    * assert.match(string, regexp[, message])
    * assert.notDeepEqual(actual, expected[, message])
    * assert.notDeepStrictEqual(actual, expected[, message])
    * assert.notEqual(actual, expected[, message])
    * assert.notStrictEqual(actual, expected[, message])
    * assert.ok(value[, message])
    * assert.rejects(asyncFn[, error][, message])
    * assert.strictEqual(actual, expected[, message])
    * assert.throws(fn[, error][, message])
    * assert.partialDeepStrictEqual(actual, expected[, message])

Each topic includes direct implementation patterns and code samples for immediate application.

## Supplementary Details
HTTP Server Configuration:
  - Port: 3000 (default in example)
  - Hostname: '127.0.0.1'
  - Method: server.listen(port, hostname, callback) where callback logs status message.

Assertion Module Details:
  - Strict Mode: Ensures deepStrictEqual is used for comparing values, treating NaN correctly and checking prototypes.
  - Legacy Mode: Uses == for comparisons, may yield unexpected results.
  - assert.AssertionError options include: message (string), actual (any), expected (any), operator (string), and optional stackStartFn (Function).
  - assert.CallTracker: Allows tracking of function calls with expected call count; reset and verify methods enable checking for discrepancies.

CLI Usage:
  - Command: node [options] [script.js] to execute script with Node.js runtime.
  - Detailed configuration options available via command-line flags as documented in Node.js CLI documentation.

## Reference Details
API SPECIFICATIONS:

HTTP Server API:
  Function: createServer
    - Signature: createServer(requestListener: (req: IncomingMessage, res: ServerResponse) => void): Server
    - Example Usage:
      import { createServer } from 'node:http';
      const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!\n');
      });
      server.listen(3000, '127.0.0.1', () => { console.log('Listening on 127.0.0.1:3000'); });

Assertion Module API:

  1. assert(value: any, message?: string|Error): void
     - Checks truthiness; alias: assert.ok

  2. assert.deepEqual(actual: any, expected: any, message?: string): void
     - Loose deep equality using == for primitives except for NaN

  3. assert.deepStrictEqual(actual: any, expected: any, message?: string): void
     - Strict deep equality using Object.is for primitives; compares prototypes and symbols

  4. assert.doesNotMatch(string: string, regexp: RegExp, message?: string|Error): void
     - Throws if string matches regexp

  5. assert.doesNotReject(asyncFn: Function|Promise<any>, error?: RegExp|Function, message?: string): Promise<void>
     - Awaits asyncFn; expects no rejection

  6. assert.doesNotThrow(fn: Function, error?: RegExp|Function, message?: string): void
     - Executes fn and throws if it throws an error matching error

  7. assert.equal(actual: any, expected: any, message?: string): void
     - Compares using ==

  8. assert.fail([message: string|any]): never
     - Immediately throws an AssertionError

  9. assert.ifError(value: any): void
     - Throws if value is truthy

 10. assert.match(string: string, regexp: RegExp, message?: string|Error): void
     - Throws if string does not match regexp

 11. assert.notDeepEqual(actual: any, expected: any, message?: string): void
     - Verifies deep inequality

 12. assert.notDeepStrictEqual(actual: any, expected: any, message?: string): void
     - Verifies strict deep inequality

 13. assert.notEqual(actual: any, expected: any, message?: string): void
     - Compares using !=

 14. assert.notStrictEqual(actual: any, expected: any, message?: string): void
     - Compares using !==

 15. assert.ok(value: any, message?: string): void
     - Alias for assert(value, message)

 16. assert.rejects(asyncFn: Function|Promise<any>, error?: RegExp|Function, message?: string): Promise<void>
     - Awaits asyncFn and expects a rejection

 17. assert.strictEqual(actual: any, expected: any, message?: string): void
     - Uses === for comparison

 18. assert.throws(fn: Function, error?: RegExp|Function, message?: string): void
     - Expects fn to throw an error matching error

 19. assert.partialDeepStrictEqual(actual: any, expected: any, message?: string): void
     - Checks partial deep strict equality

Example Code for assert.AssertionError:
  const { message } = new assert.AssertionError({ actual: 1, expected: 2, operator: 'strictEqual' });
  try {
    assert.strictEqual(1, 2);
  } catch (err) {
    // Expected error properties:
    // err.message, err.name, err.actual, err.expected, err.code, err.operator, err.generatedMessage
  }

Example Code for assert.CallTracker:
  const tracker = new assert.CallTracker();
  function func() {}
  const callsFunc = tracker.calls(func, 1);
  callsFunc();
  process.on('exit', () => { tracker.verify(); });

Troubleshooting Procedures:
  - If a function tracked by CallTracker does not meet expected call count, tracker.verify() will throw an error with details in tracker.report().
  - Use console.log(tracker.report()) to output the discrepancy details which include expected and actual call counts and stack traces.
  - For HTTP server issues, verify server.listen parameters and check for callback errors.

Configuration Options:
  - Node.js CLI options via node [options] [script] (e.g. --inspect for debugging)
  - Environment variables: NO_COLOR, NODE_DISABLE_COLORS to control terminal output in assert module.


## Information Dense Extract
HTTP Server: createServer((req, res) => { res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('Hello World!\n'); }); server.listen(3000, '127.0.0.1', callback); | assert module: Modes: strict (import { strict as assert }) and legacy (import assert) | assert.AssertionError(options: { message?: string, actual: any, expected: any, operator: string, stackStartFn?: Function }) with properties: message, actual, expected, operator, generatedMessage, code='ERR_ASSERTION' | assert.CallTracker: calls(fn, exact=1) -> Function, getCalls(fn) -> Array, report() -> Array, reset(fn?) -> void, verify() -> void | Methods: assert(value[,message]), deepEqual, deepStrictEqual, doesNotMatch, doesNotReject, doesNotThrow, equal, fail, ifError, match, notDeepEqual, notDeepStrictEqual, notEqual, notStrictEqual, ok, rejects, strictEqual, throws, partialDeepStrictEqual.

## Sanitised Extract
TABLE OF CONTENTS:
1. HTTP Server
  - createServer from node:http
  - Method Signature: createServer(requestListener: (req: IncomingMessage, res: ServerResponse) => void): Server
  - Usage: server.listen(port, hostname, callback)
  - Code Example: Setup a server that writes a 200 status and 'Hello World!'n'
2. Assertion Module
  - Modes: Strict (import from 'node:assert/strict') and Legacy (import from 'node:assert')
  - Class: assert.AssertionError
    * Constructor Options: { message?: string, actual: any, expected: any, operator: string, stackStartFn?: Function }
    * Properties: message, actual, expected, operator, generatedMessage (boolean), code ('ERR_ASSERTION')
  - Class: assert.CallTracker (Deprecated)
    * Methods: calls(fn, exact), getCalls(fn), report(), reset(fn), verify()
  - Assertion Functions:
    * assert(value[, message])
    * assert.deepEqual(actual, expected[, message])
    * assert.deepStrictEqual(actual, expected[, message])
    * assert.doesNotMatch(string, regexp[, message])
    * assert.doesNotReject(asyncFn[, error][, message])
    * assert.doesNotThrow(fn[, error][, message])
    * assert.equal(actual, expected[, message])
    * assert.fail([message])
    * assert.ifError(value)
    * assert.match(string, regexp[, message])
    * assert.notDeepEqual(actual, expected[, message])
    * assert.notDeepStrictEqual(actual, expected[, message])
    * assert.notEqual(actual, expected[, message])
    * assert.notStrictEqual(actual, expected[, message])
    * assert.ok(value[, message])
    * assert.rejects(asyncFn[, error][, message])
    * assert.strictEqual(actual, expected[, message])
    * assert.throws(fn[, error][, message])
    * assert.partialDeepStrictEqual(actual, expected[, message])

Each topic includes direct implementation patterns and code samples for immediate application.

## Original Source
Node.js Core and CLI Best Practices Documentation
https://nodejs.org/api/

## Digest of NODE_API

# Node.js API Documentation

Retrieved: 2023-10-31

## HTTP Server Example

Method: createServer from module node:http

Signature:
  createServer(requestListener: function(req: IncomingMessage, res: ServerResponse)): Server

Example:
  import { createServer } from 'node:http';

  const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
  });

  // Listening on port 3000 and host 127.0.0.1
  server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
  });

## Assertion Module

Module: node:assert

### Strict and Legacy Modes

Strict Mode Usage:
  import { strict as assert } from 'node:assert';
  const assert = require('node:assert').strict;

Legacy Mode Usage:
  import assert from 'node:assert';
  const assert = require('node:assert');

### Class: assert.AssertionError

Constructor:
  new assert.AssertionError(options: {
    message?: string,
    actual: any,
    expected: any,
    operator: string,
    stackStartFn?: Function
  })

Properties:
  - message: string
  - actual: any
  - expected: any
  - operator: string
  - generatedMessage: boolean
  - code: string (always 'ERR_ASSERTION')

Usage Example:
  const { message } = new assert.AssertionError({ actual: 1, expected: 2, operator: 'strictEqual' });
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

### Class: assert.CallTracker (Deprecated)

Constructor:
  new assert.CallTracker()

Methods:
  tracker.calls(fn: Function, exact?: number = 1) -> Function
  tracker.getCalls(fn: Function) -> Array<{ thisArg: any, arguments: Array<any> }>
  tracker.report() -> Array<{ message: string, actual: number, expected: number, operator: string, stack: Object }>
  tracker.reset(fn?: Function) -> void
  tracker.verify() -> void (throws error if call count mismatches)

Example:
  const tracker = new assert.CallTracker();
  function sampleFunc() {}
  const trackedFunc = tracker.calls(sampleFunc, 1);
  trackedFunc();
  process.on('exit', () => {
    tracker.verify();
  });

### Assertion Methods

assert(value: any, message?: string|Error): void
assert.deepEqual(actual: any, expected: any, message?: string): void
assert.deepStrictEqual(actual: any, expected: any, message?: string): void
assert.doesNotMatch(string: string, regexp: RegExp, message?: string|Error): void
assert.doesNotReject(asyncFn: Function|Promise<any>, error?: RegExp|Function, message?: string): Promise<void>
assert.doesNotThrow(fn: Function, error?: RegExp|Function, message?: string): void
assert.equal(actual: any, expected: any, message?: string): void
assert.fail(message?: string): never
assert.ifError(value: any): void
assert.match(string: string, regexp: RegExp, message?: string|Error): void
assert.notDeepEqual(actual: any, expected: any, message?: string): void
assert.notDeepStrictEqual(actual: any, expected: any, message?: string): void
assert.notEqual(actual: any, expected: any, message?: string): void
assert.notStrictEqual(actual: any, expected: any, message?: string): void
assert.ok(value: any, message?: string): void
assert.rejects(asyncFn: Function|Promise<any>, error?: RegExp|Function, message?: string): Promise<void>
assert.strictEqual(actual: any, expected: any, message?: string): void
assert.throws(fn: Function, error?: RegExp|Function, message?: string): void
assert.partialDeepStrictEqual(actual: any, expected: any, message?: string): void


## Attribution
- Source: Node.js Core and CLI Best Practices Documentation
- URL: https://nodejs.org/api/
- License: License: MIT
- Crawl Date: 2025-05-02T03:06:28.651Z
- Data Size: 4280549 bytes
- Links Found: 5392

## Retrieved
2025-05-02
