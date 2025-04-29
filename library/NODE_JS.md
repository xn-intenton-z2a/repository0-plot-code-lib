# NODE_JS

## Crawl Summary
Condensed technical details include the Node.js assert module API, HTTP server creation, CLI usage, and configuration options. Key aspects cover method signatures for assert functions (assert, deepEqual, deepStrictEqual, doesNotMatch, doesNotReject, doesNotThrow), class definitions for AssertionError and CallTracker with all parameters, return types, and detailed code examples.

## Normalised Extract
Table of Contents:
 1. Usage and Example
    - Node.js command-line syntax: node [options] [script.js]
    - HTTP server creation using createServer from node:http
 2. Assert Module
    - assert(value[, message]) : void
    - assert.deepEqual(actual, expected[, message]) : void
    - assert.deepStrictEqual(actual, expected[, message]) : void
    - assert.doesNotMatch(string, regexp[, message]) : void
    - assert.doesNotReject(asyncFn[, error][, message]) : Promise<void>
    - assert.doesNotThrow(fn[, error][, message]) : void
 3. Assertion Error Handling
    - Class: assert.AssertionError(options)
      * Parameters: message (string), actual (any), expected (any), operator (string), stackStartFn (Function)
    - Class: assert.CallTracker
      * Method: calls(fn[, exact]): Function
      * Method: getCalls(fn): Array of call details
      * Method: report(): Array of error details
      * Method: reset([fn]): void
      * Method: verify(): void
Detailed Technical Information:
- For assert methods, parameter types are strictly enforced. deepStrictEqual uses Object.is() and prototype comparisons.
- HTTP server example demonstrates listening on port 3000 at 127.0.0.1 with appropriate header setup.
- Environment configurations like NO_COLOR can be set to disable terminal colors.
- The CallTracker class is used to ensure functions are called an exact number of times; failures are reported with call counts and stack traces.

## Supplementary Details
Technical Specifications:
- assert(value[, message]): Checks truthiness. Throws AssertionError if value is falsy.
- assert.deepEqual(actual, expected[, message]): Uses loose equality (==) for primitive comparisons, allowing type conversion.
- assert.deepStrictEqual(actual, expected[, message]): Uses Object.is() for primitives, compares prototypes and enumerable own properties, ensuring strict equality.
- assert.doesNotMatch(string, regexp[, message]): Verifies that the provided string does not match the provided regular expression.
- assert.doesNotReject(asyncFn[, error][, message]): Awaits the async function or promise; returns a rejected promise if the function throws or returns a non-promise.
- assert.doesNotThrow(fn[, error][, message]): Immediately invokes fn and throws if an error is encountered matching the provided error type.
- assert.AssertionError requires an options object with properties: message, actual, expected, operator, and optionally stackStartFn.
- assert.CallTracker: Use calls(fn, exact) to wrap functions. getCalls returns details as an array with {thisArg, arguments}. report provides an array of call summary objects. reset and verify for clearing and validating call counts.
- HTTP Server: createServer(callback) returns a server instance; listen(port, hostname, callback) starts the server. 
Configuration Option Details:
- NO_COLOR: When defined, disables colored output in terminal applications.
- NODE_DISABLE_COLORS: Same effect as NO_COLOR.
Exact Implementation Steps:
1. To use strict assertion mode, import assert from 'node:assert/strict'.
2. Instantiate HTTP server with createServer and use listen to bind to a port.
3. For CallTracker usage, create a new tracker; wrap functions using tracker.calls, invoke them, and call tracker.verify on process exit.
4. Use environment variables to control terminal output settings.

## Reference Details
API Specifications:

1. assert(value: any, message?: string): void
   - Throws: AssertionError if value is falsy.

2. assert.deepEqual(actual: any, expected: any, message?: string): void
   - Comparison: Uses == operator for primitives and recursively compares enumerable properties.

3. assert.deepStrictEqual(actual: any, expected: any, message?: string): void
   - Comparison: Uses Object.is(), compares prototypes, own properties, including symbols; strict equality enforced.

4. assert.doesNotMatch(string: string, regexp: RegExp, message?: string): void
   - Throws AssertionError if string matches regexp.

5. assert.doesNotReject(asyncFn: (() => Promise<any>) | Promise<any>, error?: RegExp | Function, message?: string): Promise<void>
   - Usage: await assert.doesNotReject(asyncFn, [error], [message]).

6. assert.doesNotThrow(fn: Function, error?: RegExp | Function, message?: string): void
   - Immediately executes fn and validates that no error is thrown.

7. class assert.AssertionError extends Error
   - Constructor: new assert.AssertionError(options: { message?: string, actual: any, expected: any, operator: string, stackStartFn?: Function })
   - Properties: message, actual, expected, operator, generatedMessage (boolean), code (== 'ERR_ASSERTION')

8. class assert.CallTracker
   - Constructor: new assert.CallTracker()
   - Method: calls(fn: Function, exact?: number = 1): Function
       Example:
         const tracker = new assert.CallTracker();
         const wrappedFn = tracker.calls(myFunction, 2);
   - Method: getCalls(fn: Function): Array<{ thisArg: any, arguments: any[] }>
   - Method: report(): Array<{ message: string, actual: number, expected: number, operator: string, stack: any }>
   - Method: reset(fn?: Function): void
   - Method: verify(): void (throws error if call counts do not match)

HTTP Server Example:

    import { createServer } from 'node:http';
    
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World!\n');
    });
    
    server.listen(3000, '127.0.0.1', () => {
      console.log('Server running at http://127.0.0.1:3000/');
    });

Best Practices and Troubleshooting:
- Always use assert.deepStrictEqual over assert.deepEqual in production to avoid unexpected type coercions.
- Use strict mode by importing from 'node:assert/strict'.
- For CallTracker, ensure tracker.verify() is called on process exit to catch missed function calls:

    process.on('exit', () => {
      tracker.verify();
    });

- To deactivate color output in logs, set environment variable NO_COLOR or NODE_DISABLE_COLORS:

    export NO_COLOR=1

Expected Outputs:
- When an assertion fails, an AssertionError is thrown with properties set (message, actual, expected, operator) and a diff may be shown in strict mode.
- HTTP server logs confirmation message with the listening address.


## Information Dense Extract
NODE_JS API: assert(value[,message]), deepEqual(actual,expected[,message]), deepStrictEqual(actual,expected[,message]), doesNotMatch(string,regexp[,message]), doesNotReject(asyncFn[,error][,message])=>Promise, doesNotThrow(fn[,error][,message]); Class assert.AssertionError(options:{message?,actual,expected,operator,stackStartFn?}); Class assert.CallTracker with methods: calls(fn,exact=1):Function, getCalls(fn):Array<{thisArg, arguments}>, report():Array, reset([fn]):void, verify():void; HTTP server via createServer(callback) with listen(port,hostname,callback); CLI: node [options] [script]; Env: NO_COLOR, NODE_DISABLE_COLORS disable terminal colors; Retrieved 2023-10-10, Data Size=3340473 bytes.

## Sanitised Extract
Table of Contents:
 1. Usage and Example
    - Node.js command-line syntax: node [options] [script.js]
    - HTTP server creation using createServer from node:http
 2. Assert Module
    - assert(value[, message]) : void
    - assert.deepEqual(actual, expected[, message]) : void
    - assert.deepStrictEqual(actual, expected[, message]) : void
    - assert.doesNotMatch(string, regexp[, message]) : void
    - assert.doesNotReject(asyncFn[, error][, message]) : Promise<void>
    - assert.doesNotThrow(fn[, error][, message]) : void
 3. Assertion Error Handling
    - Class: assert.AssertionError(options)
      * Parameters: message (string), actual (any), expected (any), operator (string), stackStartFn (Function)
    - Class: assert.CallTracker
      * Method: calls(fn[, exact]): Function
      * Method: getCalls(fn): Array of call details
      * Method: report(): Array of error details
      * Method: reset([fn]): void
      * Method: verify(): void
Detailed Technical Information:
- For assert methods, parameter types are strictly enforced. deepStrictEqual uses Object.is() and prototype comparisons.
- HTTP server example demonstrates listening on port 3000 at 127.0.0.1 with appropriate header setup.
- Environment configurations like NO_COLOR can be set to disable terminal colors.
- The CallTracker class is used to ensure functions are called an exact number of times; failures are reported with call counts and stack traces.

## Original Source
Node.js Official Documentation
https://nodejs.org/api/

## Digest of NODE_JS

# Node.js Documentation Overview

Date Retrieved: 2023-10-10
Data Size: 3340473 bytes
Links Found: 1956

# Assert Module

## Overview
The Node.js assert module provides a set of assertion functions for verifying invariants. It includes both strict methods and legacy methods. 

## Method Signatures and Specifications

- assert(value[, message])
  - Parameters: value (any), message (optional string)
  - Description: Tests for truthiness.

- assert.deepEqual(actual, expected[, message])
  - Parameters: actual (any), expected (any), message (optional string)
  - Note: Uses == for comparison (legacy mode).

- assert.deepStrictEqual(actual, expected[, message])
  - Parameters: actual (any), expected (any), message (optional string)
  - Description: Uses Object.is() and strict checks for deep equality.

- assert.doesNotMatch(string, regexp[, message])
  - Parameters: string (string), regexp (RegExp), message (optional string or Error)
  - Throws an AssertionError if the string matches the regexp.

- assert.doesNotReject(asyncFn[, error][, message])
  - Parameters: asyncFn (Function or Promise), error (optional RegExp or Function), message (optional string)
  - Returns: Promise that resolves if no rejection occurs.

- assert.doesNotThrow(fn[, error][, message])
  - Parameters: fn (Function), error (optional RegExp or Function), message (optional string)

## Classes

### assert.AssertionError
- Constructor: new assert.AssertionError(options)
  - Options Object:
    - message: string (optional)
    - actual: any
    - expected: any
    - operator: string
    - stackStartFn: Function (optional)
- Properties: message, actual, expected, operator, generatedMessage (boolean), code: 'ERR_ASSERTION'

### assert.CallTracker
- Constructor: new assert.CallTracker()
- Methods:
  - tracker.calls(fn[, exact])
    - Parameters: fn (Function), exact (number, default = 1)
    - Returns: A wrapped function that must be called exactly the specified number of times.

  - tracker.getCalls(fn)
    - Parameters: fn (Function)
    - Returns: Array of call details [{ thisArg, arguments }]

  - tracker.report()
    - Returns: Array of objects with details: message, actual, expected, operator, stack

  - tracker.reset([fn])
    - Parameters: fn (optional Function)
    - Description: Resets call counts for the specified function or all if omitted.

  - tracker.verify()
    - Description: Throws an error if any tracked function has not been called the expected number of times.

# HTTP Server and CLI Usage

## HTTP Server Example

A basic HTTP server using node:http module:

    import { createServer } from 'node:http';
    
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World!\n');
    });
    
    server.listen(3000, '127.0.0.1', () => {
      console.log('Listening on 127.0.0.1:3000');
    });

## Command-Line Usage

Usage: node [options] [V8 options] [script.js | -e "script" | - ] [arguments]

Refer to the command-line options documentation for further details.

# Configuration Options

- NO_COLOR or NODE_DISABLE_COLORS: Disable terminal color output (applies to REPL as well).

# Attribution

Content extracted from Node.js official documentation (v23.11.0) retrieved on 2023-10-10.


## Attribution
- Source: Node.js Official Documentation
- URL: https://nodejs.org/api/
- License: Node.js Documentation License
- Crawl Date: 2025-04-29T03:08:14.038Z
- Data Size: 3340473 bytes
- Links Found: 1956

## Retrieved
2025-04-29
