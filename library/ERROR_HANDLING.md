# ERROR_HANDLING

## Crawl Summary
Node.js error handling implementation includes process-level handlers (process.on('uncaughtException') and process.on('unhandledRejection')), Express error middleware with signature (err, req, res, next), custom error constructors for detailed error information, and configuration for logging (using Winston). Troubleshooting involves tracing warnings with node flags.

## Normalised Extract
Table of Contents:
1. Process-level Error Handling
   - process.on('uncaughtException', callback) for synchronous error capture
   - process.on('unhandledRejection', callback) for promise rejections
   Implementation Details:
   - Callback receives error object or rejection reason and promise
   - Recommended to exit process on fatal errors using process.exit(1) for uncaught exceptions
2. Express Error Middleware
   - Signature: errorHandler(err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction)
   Implementation Details:
   - Respond with status code 500 and JSON containing error message
   - Must be registered after all routes
3. Custom Error Creation API
   - Constructor: class CustomError extends Error with additional property code
   - Signature: new CustomError(message: string, code: string)
   Implementation Details:
   - Use to tag errors like 'ERR_INVALID_INPUT'
4. Configuration Options and Best Practices
   - Logging setup using Winston: level set to 'error', JSON format, Console transport
   - Use robust validation (e.g., Zod) to pre-check data
   - Run Node with --trace-warnings for detailed output


## Supplementary Details
Process-level Handlers:
- process.on('uncaughtException', (err: Error): void) { log error; process.exit(1); }
- process.on('unhandledRejection', (reason: any, promise: Promise<any>): void) { log error details to console; }

Express Error Middleware:
- function errorHandler(err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction): void {
    res.status(500).json({ error: err.message });
}

Custom Error API:
- class CustomError extends Error {
    public code: string;
    constructor(message: string, code: string) {
      super(message);
      this.code = code;
    }
}

Configuration Options for Logging (Winston):
- level: 'error'
- format: JSON
- transports: [ Console transport ]

Best Practices:
- Always validate inputs, register error middleware at the end, use process-level handlers for uncaught exceptions, and configure logging properly.

Troubleshooting Procedures:
- Execute with node --trace-warnings
- Monitor console output for detailed stack traces and error messages

## Reference Details
API Specifications:
1. Process Error Handlers:
   - process.on('uncaughtException', (err: Error): void) -> Logs error and calls process.exit(1)
   - process.on('unhandledRejection', (reason: any, promise: Promise<any>): void) -> Logs rejection details

2. Express Error Middleware:
   - Function Signature: function errorHandler(err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction): void
   - Implementation: res.status(500).json({ error: err.message });

3. Custom Error Constructor:
   - Class Definition: class CustomError extends Error
       Constructor Parameters: message: string, code: string
       Returns instance with property code
   - Usage Example: new CustomError('Invalid input provided', 'ERR_INVALID_INPUT')

4. Logger Configuration using Winston:
   - Code: const logger = winston.createLogger({ level: 'error', format: winston.format.json(), transports: [ new winston.transports.Console() ] });

5. Troubleshooting Commands:
   - Command: node --trace-warnings app.js
   - Expected Output: Detailed error stack traces and warning messages

6. Best Practices:
   - Validate all external inputs using schema validators
   - Register error middleware after all route definitions
   - Log errors with sufficient detail for debugging


## Information Dense Extract
process.on('uncaughtException')(err:Error)=>{console.error(err);process.exit(1)}; process.on('unhandledRejection')(reason:any, promise:Promise<any>)=>{console.error(reason,promise)}; Express middleware: errorHandler(err:Error, req, res, next):void => res.status(500).json({error: err.message}); CustomError: class CustomError extends Error { constructor(message:string, code:string){super(message); this.code=code}}; Logger: winston.createLogger({level:'error', format:winston.format.json(), transports:[new winston.transports.Console()]}); node --trace-warnings for debugging

## Sanitised Extract
Table of Contents:
1. Process-level Error Handling
   - process.on('uncaughtException', callback) for synchronous error capture
   - process.on('unhandledRejection', callback) for promise rejections
   Implementation Details:
   - Callback receives error object or rejection reason and promise
   - Recommended to exit process on fatal errors using process.exit(1) for uncaught exceptions
2. Express Error Middleware
   - Signature: errorHandler(err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction)
   Implementation Details:
   - Respond with status code 500 and JSON containing error message
   - Must be registered after all routes
3. Custom Error Creation API
   - Constructor: class CustomError extends Error with additional property code
   - Signature: new CustomError(message: string, code: string)
   Implementation Details:
   - Use to tag errors like 'ERR_INVALID_INPUT'
4. Configuration Options and Best Practices
   - Logging setup using Winston: level set to 'error', JSON format, Console transport
   - Use robust validation (e.g., Zod) to pre-check data
   - Run Node with --trace-warnings for detailed output

## Original Source
Handling Errors in Node.js: A Comprehensive Guide
https://blog.risingstack.com/node-js-error-handling-tutorial/

## Digest of ERROR_HANDLING

# ERROR_HANDLING

## Overview
This document details the technical implementation of error handling in Node.js. It covers both process-level and route-specific practices, including complete API specifications, SDK method signatures, and configuration options necessary for robust error management.

Date Retrieved: 2023-10-05
Attribution: Crawled from https://blog.risingstack.com/node-js-error-handling-tutorial/ (Entry 28 in SOURCES.md). Data Size: 0 bytes

## Process-level Error Handling
- Use process.on('uncaughtException', callback) to handle synchronous exceptions that are not caught. 

  Example:
  ```js
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
  });
  ```
- Use process.on('unhandledRejection', callback) to catch unhandled promise rejections.

  Example:
  ```js
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  ```

## Express Error Middleware
- Implement a centralized error handler middleware with the signature:

  Signature: function errorHandler(err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction): void

  Example:
  ```js
  function errorHandler(err, req, res, next) {
    res.status(500).json({ error: err.message });
  }
  module.exports = errorHandler;
  ```

## Custom Error Creation API
- Create custom errors using a dedicated constructor to include additional properties like error codes.

  Example:
  ```js
  class CustomError extends Error {
    constructor(message, code) {
      super(message);
      this.code = code; // e.g., 'ERR_INVALID_INPUT'
    }
  }
  
  // Usage:
  const myError = new CustomError('Invalid input provided', 'ERR_INVALID_INPUT');
  ```

## Configuration Options and Best Practices
- Logging: Configure error logging using libraries such as Winston.

  Example:
  ```js
  const winston = require('winston');
  const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [ new winston.transports.Console() ]
  });
  ```
- Always validate input using robust validation (e.g., via Zod) prior to processing.
- In Express, place error middleware after all route declarations to ensure all errors are caught.

## Troubleshooting Procedures
- Run Node.js with the --trace-warnings flag to get detailed stack traces:

  Command: node --trace-warnings app.js

- Monitor logs for uncaught exceptions and unhandled rejections.
- Verify middleware registration if errors are not being intercepted.


## Attribution
- Source: Handling Errors in Node.js: A Comprehensive Guide
- URL: https://blog.risingstack.com/node-js-error-handling-tutorial/
- License: MIT License
- Crawl Date: 2025-04-27T07:47:12.034Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-27
