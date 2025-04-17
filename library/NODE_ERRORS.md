# NODE_ERRORS

## Crawl Summary
Error handling in Node.js can be implemented using synchronous try/catch blocks, process event handlers (process.on('uncaughtException') and process.on('unhandledRejection')), and specific middleware in frameworks such as Express. For asynchronous operations using promises or async/await, errors should be caught using try/catch or promise chain catch methods. Best practices include using custom error classes, detailed logging, and graceful process shutdown procedures.

## Normalised Extract
## Table of Contents

1. Try/Catch Error Handling
   - Code snippet using try/catch with detailed error logging

2. Process Event Handlers
   - Implementation of process.on('uncaughtException', callback) with mandatory process exit
   - Implementation of process.on('unhandledRejection', callback) logging promise details

3. Express Error Middleware
   - Full code example of setting up an Express error-handling middleware with status 500 response

4. Asynchronous Error Handling
   - Code examples using async/await with try/catch blocks
   - Code examples using promise.catch chaining

5. Best Practices and Advanced Configurations
   - Definition and usage of custom error classes
   - Guidance on logging errors with libraries
   - Steps to ensure sensitive error information is not exposed
   - Guidelines for process diagnostics and monitoring

### Detailed Implementations:

**Try/Catch Error Handling:**
```js
try {
  performCriticalOperation();
} catch (err) {
  console.error("Error caught:", err);
}
```

**Process Event Handlers:**
```js
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
```

**Express Error Middleware:**
```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

**Asynchronous Error Handling:**
```js
async function fetchData() {
  try {
    const data = await performAsyncOperation();
    return data;
  } catch (err) {
    console.error('Async error caught:', err);
    throw err;
  }
}

performAsyncOperation()
  .then(data => console.log(data))
  .catch(err => console.error('Promise rejected with error:', err));
```

**Custom Error Class Example:**
```js
class MyCustomError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.name = 'MyCustomError';
    this.errorCode = errorCode;
  }
}

try {
  throw new MyCustomError('Something went wrong', 500);
} catch (err) {
  console.error(err.name, err.message, err.errorCode);
}
```

## Supplementary Details
### Supplementary Specifications

- **Parameter Values:**
  - In process events, the error parameter is of type Error, and for promise rejections, the reason is of any type and the promise is the rejected Promise.
  - In Express error middleware, the parameters are (err: Error, req: Request, res: Response, next: NextFunction).

- **Configuration Options:**
  - For process exit upon fatal error: `process.exit(1)` ensures the process terminates.
  - Logging configurations can be set using libraries (e.g., Winston configuration with transport options, log levels, format options).

- **Implementation Steps:**
  1. Wrap synchronous code in try/catch blocks.
  2. Attach process-level event handlers at the start of the application.
  3. In web frameworks, use a dedicated error-handling middleware placed after all routes.
  4. For asynchronous operations, ensure proper error propagation using async/await try/catch or promise catch.
  5. Define custom error classes to handle specific error scenarios.

- **Troubleshooting Procedures:**
  - Use `node --trace-warnings app.js` for detailed warning traces.
  - Monitor log outputs using a logging framework and redirect them to a file for persistent records.
  - Validate error handling by intentionally throwing errors and verifying that logs capture detailed stack traces.

## Reference Details
### Complete API Specifications and Code Examples

#### Process Event Handlers API

- Method: process.on
  - Signature for uncaught exception:
    ```js
    process.on('uncaughtException', (err: Error) => void): void;
    ```
    - Parameters:
      - err: instance of Error
    - Behavior: callback is invoked when an uncaught exception occurs; typically followed by a process exit.

  - Signature for unhandled rejection:
    ```js
    process.on('unhandledRejection', (reason: any, promise: Promise<any>) => void): void;
    ```
    - Parameters:
      - reason: the reason for rejection (any type)
      - promise: the promise that was rejected

#### Express Error Middleware API

- Middleware function signature:
  ```js
  function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void;
  ```
  - Example usage:
    ```js
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });
    ```

#### Async/Await Error Handling

- Standard usage in async functions:
  ```js
  async function yourFunction(): Promise<ReturnType> {
    try {
      // Await some promise
      const result = await someAsyncOperation();
      return result;
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      throw error; // or handle gracefully
    }
  }
  ```

#### Custom Error Class

- Example custom error class with additional properties:
  ```js
  class MyCustomError extends Error {
    public errorCode: number;
    constructor(message: string, errorCode: number) {
      super(message);
      this.name = 'MyCustomError';
      this.errorCode = errorCode;
    }
  }
  ```

#### Configuration Options for Logging (Example using Winston)

- Install winston via npm: `npm install winston`

- Code example:
  ```js
  const winston = require('winston');
  
  const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
  });

  // Usage
  try {
    performRiskyOperation();
  } catch (error) {
    logger.error('Operation failed', { error });
  }
  ```

#### Troubleshooting Procedures

- **Command to run with trace warnings:**
  ```sh
  node --trace-warnings app.js
  ```
- **Verifying error logs:**
  - Check the contents of `error.log` (if using Winston file transport) to verify that errors are logged with timestamp and JSON structure.
- **Expected Output:**
  - Detailed stack trace in the console and/or log file output demonstrating the full error object and custom properties (if any).


## Original Source
Effective Error Handling in Node.js
https://www.digitalocean.com/community/tutorials/how-to-handle-errors-in-node-js

## Digest of NODE_ERRORS

# NODE ERRORS DOCUMENTATION

**Retrieved Date:** 2023-10-04

**Source:** https://www.digitalocean.com/community/tutorials/how-to-handle-errors-in-node-js (Entry 48 from SOURCES.md)

## Table of Contents

1. Try/Catch Error Handling
2. Process Event Handlers
3. Express Error Middleware
4. Asynchronous Error Handling
5. Best Practices and Advanced Configurations

## 1. Try/Catch Error Handling

Direct implementation using synchronous code:

```js
try {
  // Code that might throw an error
  performCriticalOperation();
} catch (err) {
  console.error("Error caught:", err);
  // Additional error recovery steps
}
```

## 2. Process Event Handlers

Handling uncaught exceptions and unhandled rejections.

**Uncaught Exception:**

```js
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Optional: Cleanup and process exit
  process.exit(1);
});
```

**Unhandled Promise Rejection:**

```js
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Optional: Graceful shutdown logic
});
```

## 3. Express Error Middleware

Integrate error handling within an Express application using a dedicated error-handling middleware.

```js
const express = require('express');
const app = express();

// Application routes
app.get('/', (req, res) => {
  throw new Error('Synchronous error!');
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## 4. Asynchronous Error Handling

Using async/await requires try/catch blocks or promise.catch chaining:

```js
// Using async/await with try/catch
async function fetchData() {
  try {
    const data = await performAsyncOperation();
    return data;
  } catch (err) {
    console.error('Async error caught:', err);
    throw err;
  }
}

// Using promise.catch
performAsyncOperation()
  .then(data => console.log(data))
  .catch(err => console.error('Promise rejected with error:', err));
```

## 5. Best Practices and Advanced Configurations

- Use specific error types: Create custom error classes to provide more contextual errors.
- Log errors with full stack traces using logging libraries (e.g., Winston, Bunyan).
- In production, avoid exposing sensitive error details to end users.
- Monitor the process using diagnostic tools (e.g., Node.js Diagnostic Report, Clinic.js).

**Custom Error Example:**

```js
class MyCustomError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.name = 'MyCustomError';
    this.errorCode = errorCode;
  }
}

// Usage
try {
  throw new MyCustomError('Something went wrong', 500);
} catch (err) {
  console.error(err.name, err.message, err.errorCode);
}
```


## Attribution
- Source: Effective Error Handling in Node.js
- URL: https://www.digitalocean.com/community/tutorials/how-to-handle-errors-in-node-js
- License: DigitalOcean Community
- Crawl Date: 2025-04-17T18:27:02.608Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-17
