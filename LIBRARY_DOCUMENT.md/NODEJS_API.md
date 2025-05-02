# NODEJS_API

## Crawl Summary
Node.js API documentation provides exact method signatures, such as createServer for HTTP servers and comprehensive details for the assert module. It includes full SDK method signatures like assert.strictEqual(a, b, msg) and new assert.AssertionError(options) with complete options. The documentation covers environment configurations (e.g., NO_COLOR), version stability indexes (0 to 3), and precise troubleshooting practices like tracker.verify() in CallTracker usage.

## Normalised Extract
TABLE OF CONTENTS:
1. HTTP Server
   - createServer(requestListener: function): Server
   - Exact usage: import { createServer } from 'node:http'; server.listen(port, hostname, callback)
2. Assertion Module (Strict and Legacy modes)
   - Strict mode: import { strict as assert } from 'node:assert'; methods: assert(value[, message]), assert.deepStrictEqual(actual, expected[, message]), assert.strictEqual(actual, expected[, message])
   - new assert.AssertionError(options) with options { message: string, actual: any, expected: any, operator: string, stackStartFn: Function }
   - Legacy mode: import assert from 'node:assert'; methods: assert.deepEqual, assert.equal, etc.
3. CallTracker (Deprecated)
   - new assert.CallTracker()
   - tracker.calls(fn, exact) returns wrapped function
   - tracker.getCalls(fn) returns array of { thisArg, arguments }
   - tracker.report() returns call summary
   - tracker.reset([fn]) resets call counts
   - tracker.verify() validates call counts
4. Configuration and CLI options
   - Command usage: node [options] [script.js] [arguments]
   - Environment variables: NO_COLOR, NODE_DISABLE_COLORS
5. Stability Index and Versioning
   - Stability 0: Deprecated, Stability 1: Experimental, Stability 2: Stable, Stability 3: Legacy

Detailed Topics:
HTTP Server: Use to create and listen on a server with detailed error handling and callback upon successful listen.
Assertion Module: Provides robust checks with strict equality and deep strict equality, including detailed diff output on failure. Includes full API for error handling and message customization.
CallTracker: Track function call frequency and verify that functions are called expected number of times; useful in testing scenarios.

## Supplementary Details
HTTP Server:
- import { createServer } from 'node:http';
- Method: createServer((req: IncomingMessage, res: ServerResponse) => void): Server
- server.listen(port: number, hostname: string, callback: Function): void

Assertion Module (Strict):
- import { strict as assert } from 'node:assert';
- Methods:
  - assert(value: any, message?: string): void
  - assert.deepStrictEqual(actual: any, expected: any, message?: string): void
  - assert.strictEqual(actual: any, expected: any, message?: string): void
  - new assert.AssertionError({ message?: string, actual: any, expected: any, operator?: string, stackStartFn?: Function }): AssertionError

CallTracker (Deprecated):
- new assert.CallTracker()
- tracker.calls(fn: Function, exact?: number): Function
- tracker.getCalls(fn: Function): Array<{ thisArg: any, arguments: Array<any> }>
- tracker.report(): Array<{ message: string, actual: number, expected: number, operator: string, stack: Object }>
- tracker.reset(fn?: Function): void
- tracker.verify(): void

Configuration:
- Node CLI: node [options] [script.js]
- Environment Variables: NO_COLOR, NODE_DISABLE_COLORS
- Detailed troubleshooting: On process exit, call tracker.verify() to ensure functions met call expectations.

Best Practices:
- Use strict assertion mode for reliable error diffs.
- Utilize process.on('exit', () => { tracker.verify(); }) to automatically validate call tracker usage.
- Specify full option objects for AssertionError to get complete debug information.

## Reference Details
API Specifications:

HTTP Server API:
- import { createServer } from 'node:http';
- createServer(callback: (req: IncomingMessage, res: ServerResponse) => void): Server
  where Server.listen(port: number, hostname: string, callback?: () => void): void

Assertion Module (Strict Mode):
- import { strict as assert } from 'node:assert';

Method Signatures:
- assert(value: any, message?: string): void
- assert.deepStrictEqual(actual: any, expected: any, message?: string): void
- assert.strictEqual(actual: any, expected: any, message?: string): void

AssertionError Constructor:
- new assert.AssertionError(options: { message?: string, actual: any, expected: any, operator?: string, stackStartFn?: Function }): AssertionError

CallTracker API (Deprecated):
- let tracker = new assert.CallTracker();
- tracker.calls(fn: Function, exact?: number): Function
- tracker.getCalls(fn: Function): Array<{ thisArg: any, arguments: Array<any> }>
- tracker.report(): Array<{ message: string, actual: number, expected: number, operator: string, stack: Object }>
- tracker.reset(fn?: Function): void
- tracker.verify(): void

Code Example (HTTP Server):
----------------------------
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

Code Example (Assertion):
-------------------------
import assert from 'node:assert/strict';

const { message } = new assert.AssertionError({
  actual: 1,
  expected: 2,
  operator: 'strictEqual'
});

try {
  assert.strictEqual(1, 2);
} catch (err) {
  console.error('Assertion failed:', err.message);
}

CallTracker Example:
----------------------
import assert from 'node:assert';
import process from 'node:process';

const tracker = new assert.CallTracker();
function sample() {}
const trackedSample = tracker.calls(sample, 1);
trackedSample();

process.on('exit', () => {
  tracker.verify();
});

CLI and Configuration:
- Run node scripts with: node [options] script.js
- Environment: Set NO_COLOR=1 to disable color output.

Troubleshooting:
- If assert.strictEqual fails, verify both type and value equality.
- Use tracker.report() to get detailed call counts if tracker.verify() throws an error.
- Check full stack traces provided in AssertionError for debugging mismatches.

Configuration Options:
- Node.js command-line flags: --inspect, --max-old-space-size, etc. (Refer to official docs for full list)

Best Practices:
- Always use strict assertion mode for predictable error messages.
- Validate asynchronous code using assert.doesNotReject(asyncFn, error, message).
- Wrap critical server initialization in proper error handling callbacks.

## Information Dense Extract
NODEJS API: createServer((req, res) => void): Server; server.listen(port: number, hostname: string, callback: () => void). Assert module strict: import { strict as assert } from 'node:assert'; methods: assert(value, msg), assert.deepStrictEqual(actual, expected, msg), assert.strictEqual(actual, expected, msg), new assert.AssertionError({ message, actual, expected, operator, stackStartFn }). CallTracker (deprecated): tracker = new assert.CallTracker(); tracker.calls(fn, exact), tracker.getCalls(fn): Array, tracker.report(): Array, tracker.reset(fn?), tracker.verify(). CLI usage: node [options] script.js; env vars: NO_COLOR, NODE_DISABLE_COLORS. Stability indexes: 0 (Deprecated), 1 (Experimental), 2 (Stable), 3 (Legacy). Full API includes exact signatures and detailed code examples for immediate implementation.

## Sanitised Extract
TABLE OF CONTENTS:
1. HTTP Server
   - createServer(requestListener: function): Server
   - Exact usage: import { createServer } from 'node:http'; server.listen(port, hostname, callback)
2. Assertion Module (Strict and Legacy modes)
   - Strict mode: import { strict as assert } from 'node:assert'; methods: assert(value[, message]), assert.deepStrictEqual(actual, expected[, message]), assert.strictEqual(actual, expected[, message])
   - new assert.AssertionError(options) with options { message: string, actual: any, expected: any, operator: string, stackStartFn: Function }
   - Legacy mode: import assert from 'node:assert'; methods: assert.deepEqual, assert.equal, etc.
3. CallTracker (Deprecated)
   - new assert.CallTracker()
   - tracker.calls(fn, exact) returns wrapped function
   - tracker.getCalls(fn) returns array of { thisArg, arguments }
   - tracker.report() returns call summary
   - tracker.reset([fn]) resets call counts
   - tracker.verify() validates call counts
4. Configuration and CLI options
   - Command usage: node [options] [script.js] [arguments]
   - Environment variables: NO_COLOR, NODE_DISABLE_COLORS
5. Stability Index and Versioning
   - Stability 0: Deprecated, Stability 1: Experimental, Stability 2: Stable, Stability 3: Legacy

Detailed Topics:
HTTP Server: Use to create and listen on a server with detailed error handling and callback upon successful listen.
Assertion Module: Provides robust checks with strict equality and deep strict equality, including detailed diff output on failure. Includes full API for error handling and message customization.
CallTracker: Track function call frequency and verify that functions are called expected number of times; useful in testing scenarios.

## Original Source
Node.js Core and CLI Best Practices Documentation
https://nodejs.org/api/

## Digest of NODEJS_API

# Node.js API Documentation

Retrieved on: 2023-10-04

This document contains the core technical details from the Node.js API reference. It covers sections such as creating HTTP servers, using the assert module, and detailed method specifications including SDK method signatures, precise configuration options, and troubleshooting procedures.

# Table of Contents
1. HTTP Server
2. Assertion Module
3. Configuration and Environment Options
4. Version Stability and Guidelines

# 1. HTTP Server

- Method: createServer
  - Signature: import { createServer } from 'node:http';
  - Usage: createServer(requestListener: (req: IncomingMessage, res: ServerResponse) => void): Server
  - Example:
    import { createServer } from 'node:http';
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World!\n');
    });
    server.listen(3000, '127.0.0.1', () => {
      console.log('Listening on 127.0.0.1:3000');
    });

# 2. Assertion Module

The node:assert module provides functions for runtime assertions. Two modes are available: strict and legacy.

## Strict Assertion Mode
- Import: import { strict as assert } from 'node:assert'; or import assert from 'node:assert/strict';
- Key Methods:
  - assert(value[, message])
  - assert.deepStrictEqual(actual, expected[, message])
  - assert.strictEqual(actual, expected[, message])
  - new assert.AssertionError(options)
    - Options include: message (string), actual (any), expected (any), operator (string), stackStartFn (Function)
- Example:
    import assert from 'node:assert/strict';
    const { message } = new assert.AssertionError({
      actual: 1,
      expected: 2,
      operator: 'strictEqual'
    });
    try {
      assert.strictEqual(1, 2);
    } catch (err) {
      console.log(err.message);
    }

## Legacy Assertion Mode
- Import: import assert from 'node:assert';
- Methods such as assert.deepEqual() use non-strict equality (==).

## CallTracker Class (Deprecated)
- Method Signatures:
  - new assert.CallTracker()
  - tracker.calls(fn[, exact]) returns a wrapping function (default exact = 1)
  - tracker.getCalls(fn): Array of objects with keys { thisArg, arguments }
  - tracker.report(): Returns an array of call status objects
  - tracker.reset([fn]): Resets call tracker counts
  - tracker.verify(): Throws error if wrapped functions haven’t been called exact times

# 3. Configuration and Environment Options

- Node.js command line usage:
  node [options] [V8 options] [script.js | -e "script" | -] [arguments]
- Environment variables:
  - NO_COLOR and NODE_DISABLE_COLORS deactivates color output in REPL and error messages.

# 4. Version Stability and Guidelines

Each API section lists a stability index:
  - Stability 0: Deprecated (e.g., Domain module)
  - Stability 1: Experimental (e.g., Async hooks in early development)
  - Stability 2: Stable (e.g., HTTP, HTTPS, Buffer, etc.)
  - Stability 3: Legacy (e.g., Older non-strict assertion mode)

# Attribution
Data Size: 3566483 bytes, 2812 links found, no errors reported.

# Notes
For detailed system calls, man pages, and additional SDK method signatures, refer to the complete documentation on the Node.js website.

## Attribution
- Source: Node.js Core and CLI Best Practices Documentation
- URL: https://nodejs.org/api/
- License: License: MIT
- Crawl Date: 2025-05-02T04:48:43.930Z
- Data Size: 3566483 bytes
- Links Found: 2812

## Retrieved
2025-05-02
