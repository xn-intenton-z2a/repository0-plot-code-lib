# NODE_ERRORS

## Crawl Summary
Error object properties: message, stack, code, cause. API methods: new Error(message[, options]), Error.captureStackTrace(targetObject[, constructorOpt]), Error.stackTraceLimit. System errors include properties like address, dest, errno, path, port, syscall. OpenSSL errors include opensslErrorStack, function, library, reason. Extensive Node.js error codes provided (ERR_ACCESS_DENIED, ERR_AMBIGUOUS_ARGUMENT, etc.). Detailed examples for synchronous, asynchronous, and EventEmitter based error handling are provided along with debugging best practices and troubleshooting commands.

## Normalised Extract
Table of Contents:
  1. Error Object Basics
     - Constructor: new Error(message[, options])
     - Properties: message (string), stack (string), code (string), cause (any), stackTraceLimit (number).
  2. Error.captureStackTrace
     - Signature: Error.captureStackTrace(targetObject[, constructorOpt])
     - Details: Creates .stack property on target object, omits frames above optional constructorOpt.
  3. Error Handling Patterns
     - Synchronous: try...catch blocks.
     - Asynchronous: Promises with try/catch, callbacks with error-first pattern, EventEmitter error events.
  4. System and OpenSSL Errors
     - System Error Properties: address, dest, errno, info, path, port, syscall.
     - OpenSSL Error Properties: opensslErrorStack, function, library, reason.
  5. Node.js Error Codes
     - Complete list includes: ABORT_ERR, ERR_ACCESS_DENIED, ERR_AMBIGUOUS_ARGUMENT, ERR_ARG_NOT_ITERABLE, ERR_ASSERTION, ERR_ASYNC_CALLBACK, ERR_ASYNC_TYPE, ERR_BUFFER_OUT_OF_BOUNDS, ERR_BUFFER_TOO_LARGE, etc.

Detailed Technical Information:
1. Error Constructor:
   new Error(message[, options])
     - message: string
     - options: { cause: any } (optional)
   Example: err = new Error('Failure occurred', { cause: originalErr })

2. Error.captureStackTrace:
   Error.captureStackTrace(object, [constructorOpt])
     - Captures stack trace and assigns to object.stack
     - Omits frames above constructorOpt if provided.

3. Error.stackTraceLimit:
   Configurable numeric limit for captured frames.
   Default: 10
   Usage: Error.stackTraceLimit = desiredNumber

4. Callback and Promise patterns:
   Synchronous: try { ... } catch (err) { handle(err) }
   Async (Promise): await operation() in try/catch
   Async (callback): function(err, data) { if (err) { handle(err) } }

5. System Error details:
   Included properties: error.address (string), error.dest (string), error.errno (number), error.info (object), error.path (string), error.port (number), error.syscall (string)

6. OpenSSL Error details:
   Included properties: error.opensslErrorStack (array), error.function (string), error.library (string), error.reason (string)

7. Error Code Examples:
   ERR_ACCESS_DENIED, ERR_AMBIGUOUS_ARGUMENT, ERR_ARG_NOT_ITERABLE, etc. are used as constants returned in error.code.

8. Best Practices:
   - Always attach error handlers in EventEmitter based APIs.
   - For fs operations, check error codes such as ENOENT, EISDIR, etc.
   - Increase Error.stackTraceLimit for deeper debugging.

9. Troubleshooting:
   - For EMFILE errors, run "ulimit -n 2048".
   - Use util.getSystemErrorName(error.errno) for decoding system error codes.

## Supplementary Details
Technical Specifications:
- new Error: Accepts a string message and an optional object { cause: any }.
- Error.captureStackTrace: targetObject must be an object; constructorOpt if specified should be a Function to omit frames above it.
- Error.stackTraceLimit: Set as a number, default is 10. Exceeding this may provide more detailed stack traces at the cost of performance.
- System Errors: Provide additional fields: address (string), dest (string), errno (number), info (object), path (string), port (number), syscall (string).
- OpenSSL Error Fields: opensslErrorStack (array of string/error objects), function (string), library (string), reason (string).
- Configuration options: Increase ulimit via shell command "ulimit -n 2048" when encountering file descriptor limitations.
- Implementation steps for using errors:
   1. For standard errors, use new Error() with optional cause.
   2. For tailored error handling, use Error.captureStackTrace to exclude internal functions from stack trace.
   3. In asynchronous code, always use try/catch or error-first callbacks.
- Best Practice: Validate error codes using if (error.code === 'ERR_ACCESS_DENIED') then apply specific recovery steps.
- Troubleshooting: Validate file path existence to avoid ENOENT; check error.errno mapping via util.getSystemErrorName.
- Defaults: Error.stackTraceLimit default is 10, can be updated as needed.
- Command Example: Setting stack trace limit: Error.stackTraceLimit = 50;

## Reference Details
API Specifications:
1. new Error(message: string, options?: { cause?: any }): Error
   - Throws and returns an Error object with properties message, stack, code, and optionally cause.
   - Example:
     const err = new Error('Operation failed', { cause: previousError });
2. Error.captureStackTrace(targetObject: Object, constructorOpt?: Function): void
   - Captures the call stack at the point of invocation and assigns it to targetObject.stack.
   - Example:
     Error.captureStackTrace(myObj, myFunction);
3. Error.stackTraceLimit: number
   - Default value is 10; modify by assignment to capture a larger or smaller number of stack frames.
   - Example:
     Error.stackTraceLimit = 50;

Full Code Example:
--------------------------------------------------
// Synchronous error handling
try {
  throw new Error('Synchronous failure');
} catch (err) {
  console.error('Caught error:', err.message);
  console.error('Stack trace:', err.stack);
}

// Asynchronous error handling using Promises
async function readFileExample() {
  const fs = require('node:fs/promises');
  try {
    const data = await fs.readFile('nonexistent.txt');
  } catch (err) {
    console.error('Async error:', err.message);
  }
}
readFileExample();

// Error.captureStackTrace usage
function internalErrorHandler() {
  const obj = {};
  Error.captureStackTrace(obj, internalErrorHandler);
  return obj;
}

// Configuration Options:
// Increase stack trace limit for debugging
Error.stackTraceLimit = 50;

// Troubleshooting:
// 1. For EMFILE errors: Run command "ulimit -n 2048" to increase file descriptor limits.
// 2. Use util.getSystemErrorName(error.errno) to interpret system error numbers.
--------------------------------------------------

Best Practices:
- Always distinguish synchronous and asynchronous error handling methods.
- Attach error handlers for EventEmitter instances to prevent process crashes.
- Validate parameters to catch TypeError and RangeError before invoking functions.
- Use the 'cause' property to chain errors and maintain original error context.

Detailed Steps:
1. Wrap error prone code in try...catch.
2. For promise based methods, use async/await with error handling.
3. For callback based methods, check if (err) is non-null.
4. For events, attach listener on the 'error' event.

Return Types:
- new Error returns an Error instance.
- Error.captureStackTrace returns void.

Exceptions:
- new Error does not throw additional exceptions by itself; however, improper use of Error.captureStackTrace may omit necessary debugging frames.

All parameters and return values are explicitly defined and documented in the Node.js API.

## Information Dense Extract
Error Constructor: new Error(message: string, options?: { cause?: any }); Properties: message, stack, code, cause, stackTraceLimit (default 10). Capture Stack: Error.captureStackTrace(targetObject: Object, constructorOpt?: Function) omits frames above constructorOpt. Synchronous handling: try { ... } catch (err). Asynchronous: async/await with try/catch, callback with error-first, EventEmitter 'error' event. System Errors include address, dest, errno, info, path, port, syscall; OpenSSL Errors include opensslErrorStack, function, library, reason. Error codes: ABORT_ERR, ERR_ACCESS_DENIED, ERR_AMBIGUOUS_ARGUMENT, ERR_ARG_NOT_ITERABLE, ERR_ASSERTION, ERR_ASYNC_CALLBACK, ERR_BUFFER_OUT_OF_BOUNDS, etc. Best practices: attach error handlers to EventEmitters, use Error.captureStackTrace to hide internals, increase Error.stackTraceLimit for deeper debugging, use util.getSystemErrorName(error.errno) to decode errors, ulimit -n 2048 for file descriptor limitations.

## Sanitised Extract
Table of Contents:
  1. Error Object Basics
     - Constructor: new Error(message[, options])
     - Properties: message (string), stack (string), code (string), cause (any), stackTraceLimit (number).
  2. Error.captureStackTrace
     - Signature: Error.captureStackTrace(targetObject[, constructorOpt])
     - Details: Creates .stack property on target object, omits frames above optional constructorOpt.
  3. Error Handling Patterns
     - Synchronous: try...catch blocks.
     - Asynchronous: Promises with try/catch, callbacks with error-first pattern, EventEmitter error events.
  4. System and OpenSSL Errors
     - System Error Properties: address, dest, errno, info, path, port, syscall.
     - OpenSSL Error Properties: opensslErrorStack, function, library, reason.
  5. Node.js Error Codes
     - Complete list includes: ABORT_ERR, ERR_ACCESS_DENIED, ERR_AMBIGUOUS_ARGUMENT, ERR_ARG_NOT_ITERABLE, ERR_ASSERTION, ERR_ASYNC_CALLBACK, ERR_ASYNC_TYPE, ERR_BUFFER_OUT_OF_BOUNDS, ERR_BUFFER_TOO_LARGE, etc.

Detailed Technical Information:
1. Error Constructor:
   new Error(message[, options])
     - message: string
     - options: { cause: any } (optional)
   Example: err = new Error('Failure occurred', { cause: originalErr })

2. Error.captureStackTrace:
   Error.captureStackTrace(object, [constructorOpt])
     - Captures stack trace and assigns to object.stack
     - Omits frames above constructorOpt if provided.

3. Error.stackTraceLimit:
   Configurable numeric limit for captured frames.
   Default: 10
   Usage: Error.stackTraceLimit = desiredNumber

4. Callback and Promise patterns:
   Synchronous: try { ... } catch (err) { handle(err) }
   Async (Promise): await operation() in try/catch
   Async (callback): function(err, data) { if (err) { handle(err) } }

5. System Error details:
   Included properties: error.address (string), error.dest (string), error.errno (number), error.info (object), error.path (string), error.port (number), error.syscall (string)

6. OpenSSL Error details:
   Included properties: error.opensslErrorStack (array), error.function (string), error.library (string), error.reason (string)

7. Error Code Examples:
   ERR_ACCESS_DENIED, ERR_AMBIGUOUS_ARGUMENT, ERR_ARG_NOT_ITERABLE, etc. are used as constants returned in error.code.

8. Best Practices:
   - Always attach error handlers in EventEmitter based APIs.
   - For fs operations, check error codes such as ENOENT, EISDIR, etc.
   - Increase Error.stackTraceLimit for deeper debugging.

9. Troubleshooting:
   - For EMFILE errors, run 'ulimit -n 2048'.
   - Use util.getSystemErrorName(error.errno) for decoding system error codes.

## Original Source
Node.js Error Handling
https://nodejs.org/api/errors.html

## Digest of NODE_ERRORS

# Node.js Errors Documentation

This document presents the full technical details extracted from the Node.js Error Handling API. It includes complete method signatures, parameter types, properties and detailed code examples.

## Error Object and Properties

- **Constructor**: new Error(message[, options])
  - Parameters:
    - message: string
    - options: Object (optional) with property 'cause' (any type)
  - Returns: An Error instance with a captured stack trace.

- **Properties**:
  - error.message: string, the error description.
  - error.stack: string, stack trace starting with "Error: <message>" followed by call frames.
  - error.code: string, identifier used to identify the error type.
  - error.cause: any, the underlying error provided via options.
  - Error.stackTraceLimit: number, sets the maximum number of stack frames to capture (default 10, can be updated to any number). 

## Error.captureStackTrace Method

- **Signature**: Error.captureStackTrace(targetObject[, constructorOpt])
  - Parameters:
    - targetObject: Object on which the stack property will be defined.
    - constructorOpt: Function (optional), if provided, frames above this function (including it) are omitted from the stack trace.
  - Usage: Helps hide internal implementation frames from the final error output.

## Error Propagation and Handling Patterns

- **Synchronous Error Handling**: Uses try...catch blocks. Example:
  try {
    // code that may throw an error
  } catch (err) {
    // process error: err.message, err.stack
  }

- **Asynchronous Error Handling**:
  - For Promise-based APIs, use async/await with try...catch.
  - For callback-based APIs, check if the first argument is non-null.
  - For EventEmitter APIs, attach a listener to the 'error' event.

## System Errors and OpenSSL Errors

- **System Errors**: Inherit from Error. Common properties include:
  - error.address (string), error.dest (string), error.errno (number), error.info (Object), error.path (string), error.port (number), error.syscall (string).
  - Standard system error examples: EACCES, EADDRINUSE, ECONNREFUSED, ECONNRESET, EEXIST, EISDIR, EMFILE, ENOENT, ENOTDIR, ENOTEMPTY, EPERM, EPIPE, ETIMEDOUT.

- **OpenSSL Errors**:
  Additional properties specific to OpenSSL:
  - error.opensslErrorStack: array (of error details)
  - error.function: string (OpenSSL function name)
  - error.library: string (OpenSSL library name)
  - error.reason: string (description of error cause)

## Node.js Specific Error Codes

The documentation enumerates many Node.js error codes including but not limited to:

- ABORT_ERR
- ERR_ACCESS_DENIED
- ERR_AMBIGUOUS_ARGUMENT
- ERR_ARG_NOT_ITERABLE
- ERR_ASSERTION
- ERR_ASYNC_CALLBACK
- ERR_ASYNC_TYPE
- ERR_BUFFER_OUT_OF_BOUNDS
- ERR_BUFFER_TOO_LARGE
- ERR_CHILD_CLOSED_BEFORE_REPLY
- ERR_CHILD_PROCESS_IPC_REQUIRED
- ERR_CONSTRUCT_CALL_INVALID
- ERR_CONSTRUCT_CALL_REQUIRED
- ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED
- ... (full list available in documentation)

## Detailed Code Example: Synchronous, Asynchronous, and EventEmitter Error Handling

// Synchronous Exception Handling
try {
  const a = 1;
  const b = a + undefinedVariable;
} catch (err) {
  console.error('Synchronous error caught:', err.message);
}

// Asynchronous handling using async/await
const fsPromises = require('node:fs/promises');
(async () => {
  try {
    let data = await fsPromises.readFile('nonexistent.txt');
  } catch (err) {
    console.error('Async error caught:', err.message);
  }
})();

// EventEmitter error handling
const net = require('node:net');
const connection = net.connect({ port: 80, host: 'localhost' });
connection.on('error', (err) => {
  console.error('Error event caught:', err.message);
});

## Best Practices and Troubleshooting

1. Always check function signatures for synchronous vs asynchronous error reporting.
2. For asynchronous APIs, always provide error handling logic either via try/catch with async/await or checking error in callbacks.
3. Use Error.captureStackTrace to hide internal frames and reduce noise in production.
4. Increase Error.stackTraceLimit for debugging complex errors: Example - Error.stackTraceLimit = 50

### Troubleshooting Commands

- To increase file descriptor limits (for EMFILE errors):
  ulimit -n 2048
- For diagnostic information of system errors, use util.getSystemErrorName(error.errno) to resolve the error code.

## Documentation Attribution and Data Size

- URL: https://nodejs.org/api/errors.html
- Data Size: 3318159 bytes
- Date retrieved: 

## Attribution
- Source: Node.js Error Handling
- URL: https://nodejs.org/api/errors.html
- License: MIT License
- Crawl Date: 2025-04-26T20:47:27.697Z
- Data Size: 3318159 bytes
- Links Found: 1512

## Retrieved
2025-04-26
