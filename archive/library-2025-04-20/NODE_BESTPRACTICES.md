# NODE_BESTPRACTICES

## Crawl Summary
Extracted technical content emphasizes clearly defined modular architecture, robust error handling, consistent code style, and thorough testing strategies. Key specifications include 3-tier component structure, custom error classes, use of async/await with proper promise handling, centralized logging with mature libraries (e.g., Winston), use of ESLint and naming conventions, explicit module entry points, version control with nvm/Volta, and detailed production readiness practices such as process monitoring, lockfile management, multi-core utilization, and external static asset serving.

## Normalised Extract
## Table of Contents
1. Project Architecture Practices
   - Structure by Components
   - Layered Components (3-Tier Architecture)
   - Packaging Common Utilities
   - Hierarchical and Secure Configuration
   - Framework Selection Criteria
   - TypeScript Usage Guidelines

2. Error Handling Practices
   - Async/Await vs Callbacks
   - Custom Error Class Implementation
   - Differentiating Operational vs Catastrophic Errors
   - Centralized Error Handling Mechanism
   - API Error Documentation
   - Graceful Process Exit
   - Mature Logging Usage and Configuration
   - Testing Error Flows & Unhandled Rejections
   - Parameter Validation and Promise Awaiting
   - Event Emitter ‘error’ Subscription

3. Code Patterns And Style Practices
   - ESLint and Node-specific Plugins
   - Curly Brace and Statement Formatting
   - Naming Conventions and Function Naming
   - const vs let vs var
   - Module Import Order and Explicit Entry Points
   - Strict Equality and Arrow Function Use
   - Encapsulation of Effects

4. Testing And Overall Quality Practices
   - API Testing and Test Naming Convention (3-Part Names)
   - AAA Pattern in Tests
   - Unified Node Version and Isolated Test Fixtures
   - Tag Based Test Execution and Code Coverage
   - Production-like E2E Testing Environment
   - Middleware Isolation, Random Port Usage, Outcome Testing

5. Going To Production Practices
   - Comprehensive Monitoring and APM Integration
   - Smart Logging and Delegation to Reverse Proxies
   - Dependency Locking and Process Management
   - Multi-Core Utilization and Maintenance Endpoints
   - Memory Usage Measurement and External Asset Serving

## Detailed Technical Information

### 1. Project Architecture Practices
- **Structure by Components:** Use directory structures that clearly delineate business modules. For example:
  ```
  my-system
  ├─ apps
  │  ├─ orders
  │  ├─ users
  │  ├─ payments
  ├─ libraries
  │  ├─ logger
  │  ├─ authenticator
  ```
- **Layering (3-Tier):** Organize components into entry-points (controllers), domain (business logic), and data-access (database calls). Use a directory tree to enforce separation.
- **Utility Packaging:** Modularize common functionalities and expose a public interface via package.json (using exports/main field).
- **Configuration:** Use libraries like convict or zod to read environment variables and configuration files with default values and validation.

### 2. Error Handling Practices
- **Async/Await:** Standardize error handling with try/catch blocks in async functions.
- **Custom Error Classes:** Extend the built-in Error prototype:
  ```
  class AppError extends Error {
    constructor(message, code, isCatastrophic = false) {
      super(message);
      this.code = code;
      this.isCatastrophic = isCatastrophic;
    }
  }
  ```
- **Centralized Error Logging:** Integrate libraries like Winston with JSON output and attach properties:
  ```
  const winston = require('winston');
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
  });
  ```
- **Unhandled Rejections:** Subscribe to process events:
  ```
  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
  });
  ```
- **Event Emitter Errors:** Always subscribe to the 'error' event for emitters.

### 3. Code Patterns And Style Practices
- **ESLint:** Configure ESLint with node-specific plugins.
- **Naming Conventions:** Use lowerCamelCase for functions and variables, UpperCamelCase for classes, UPPER_SNAKE_CASE for globals.
- **Module Imports:** Place all require statements at the top of the file; define an explicit entry point in package.json.
- **Equality:** Always use === to ensure type-safe comparisons.

### 4. Testing And Overall Quality Practices
- **Test Structure:** Use the AAA pattern: Arrange, Act, Assert.
- **Version Uniformity:** Employ nvm/Volta for consistent Node.js versions across environments.
- **Isolated Test Data:** Seed data within each test to avoid global fixtures.
- **Port Randomization:** Use port 0 in test servers to automatically select an available port.

### 5. Going To Production Practices
- **Monitoring:** Define metrics (uptime, event loop lag) and integrate with APM tools.
- **Smart Logging:** Use robust logging configuration to attach transaction IDs and log to stdout.
- **Dependency Locking:** Commit package-lock.json to ensure identical code across environments.
- **Process Management:** Use Docker/Kubernetes or systemd to manage process uptime and multi-core utilization.
- **Maintenance Endpoints:** Implement a secured API endpoint to expose diagnostic information.


## Supplementary Details
### Detailed Implementation Steps and Configuration Options

1. For layered architecture, ensure each module has the following structure:
   - entry-points: contains controller logic (e.g., Express router handlers).
   - domain: includes service layer, DTOs, business validations.
   - data-access: encapsulates raw database queries (without ORM).

2. Configuration Example using convict:
   ```js
   const convict = require('convict');
   const config = convict({
     env: {
       doc: 'The application environment.',
       format: ['production', 'development', 'test'],
       default: 'development',
       env: 'NODE_ENV'
     },
     port: {
       doc: 'The port to bind.',
       format: 'port',
       default: 3000,
       env: 'PORT'
     }
   });
   config.validate({allowed: 'strict'});
   module.exports = config;
   ```

3. Logger Configuration with Winston:
   - Level: 'error', 'warn', 'info' etc.
   - Format: JSON for machine-readability
   - Transport: Console and file transports as needed.

4. Testing Best Practices:
   - Use Mocha/Jest as test runners.
   - Structure tests as follows:
     ```js
     describe('Component X', () => {
       it('should return expected result under condition Y', async () => {
         // Arrange
         const input = {...};
         // Act
         const result = await componentX(input);
         // Assert
         expect(result).toEqual(expectedOutput);
       });
     });
     ```
   - Simulate errors using stubs and mocks (e.g., sinon, nock for HTTP mocks).

5. Production Deployment:
   - Use npm ci for clean installs (cf. npm ci breakdown in production practices).
   - Set NODE_ENV=production in deployment scripts.
   - Automate deployment pipelines with zero-downtime strategies (blue-green or rolling deployments).


## Reference Details
### Complete API Specifications and SDK Method Signatures

1. **Custom Error Class**
   ```js
   /**
    * Class representing an application specific error.
    * @extends Error
    * @param {string} message - Error message
    * @param {number|string} code - Error code
    * @param {boolean} [isCatastrophic=false] - Flag for catastrophic errors
    */
   class AppError extends Error {
     constructor(message, code, isCatastrophic = false) {
       super(message);
       this.code = code;
       this.isCatastrophic = isCatastrophic;
     }
   }
   module.exports = AppError;
   ```

2. **Async Function with Full Error Handling and Awaiting**
   ```js
   /**
    * Fetch data asynchronously with proper error handling.
    * @async
    * @function fetchData
    * @returns {Promise<Object>} The result object
    * @throws {AppError} Throws an AppError on failure
    */
   async function fetchData() {
     try {
       const result = await getData(); // getData must be a function returning a Promise
       return result;
     } catch (err) {
       throw new AppError('Data fetch failed', 500, true);
     }
   }
   ```

3. **Configuration with Convict (Example SDK-like Setup)**
   ```js
   const convict = require('convict');
   const config = convict({
     env: {
       doc: 'Application environment',
       format: ['production', 'development', 'test'],
       default: 'development',
       env: 'NODE_ENV'
     },
     port: {
       doc: 'Port number',
       format: 'port',
       default: 3000,
       env: 'PORT'
     },
     db: {
       host: {
         doc: 'Database host name/IP',
         format: String,
         default: 'localhost',
         env: 'DB_HOST'
       },
       port: {
         doc: 'Database port',
         format: 'port',
         default: 5432,
         env: 'DB_PORT'
       }
     }
   });
   config.validate({allowed: 'strict'});
   module.exports = config;
   ```

4. **Logger (Winston) Setup**
   ```js
   const winston = require('winston');
   const logger = winston.createLogger({
     level: 'info',
     format: winston.format.combine(
       winston.format.timestamp(),
       winston.format.json()
     ),
     transports: [
       new winston.transports.Console(),
       // Additional transport, e.g., file transport
       new winston.transports.File({ filename: 'error.log', level: 'error' })
     ]
   });
   module.exports = logger;
   ```

5. **Testing Middleware Isolation**
   ```js
   // Using express and supertest
   const request = require('supertest');
   const express = require('express');
   const app = express();
   // Middleware under test
   const sampleMiddleware = require('./middleware/sample');
   app.use(sampleMiddleware);
   app.get('/test', (req, res) => res.send('ok'));

   describe('Middleware Test', () => {
     it('should process request correctly', (done) => {
       request(app)
         .get('/test')
         .expect(200, 'ok', done);
     });
   });
   ```

6. **Troubleshooting Procedures**
   - Verify Node.js version: `node -v`
   - Check running processes: `ps aux | grep node`
   - Inspect log files: `tail -f /var/log/app.log`
   - Test configuration: `node -e "console.log(require('./config').getProperties())"`
   - Debug using Node Inspector: Start with `node --inspect-brk app.js` and connect via Chrome DevTools.

Each of these specifications includes exact method signatures, parameter types, default values, and code examples that can be directly integrated into Node.js projects to enforce best practices and robust, production-ready code.

## Original Source
Node.js Best Practices
https://github.com/goldbergyoni/nodebestpractices

## Digest of NODE_BESTPRACTICES

# Node.js Best Practices (Retrieved: 2023-10-30)

## 1. Project Architecture Practices

### 1.1 Structure your solution by business components

* Use separate folders or repositories for business modules (e.g., user-component, order-component).
* Each component has its own API, business logic, and data store.

Code Example:
```
my-system
├─ apps (components)
│  ├─ orders
│  ├─ users
│  ├─ payments
├─ libraries (shared functionality)
│  ├─ logger
│  ├─ authenticator
```

### 1.2 Layer your components with 3-tiers

* Organize each component into three layers: entry-point, domain, and data-access.
* Keep infrastructural code (HTTP, DB) separate from business logic.

Code Example:
```
my-system
├─ apps (components)
│  ├─ component-a
│     ├─ entry-points
│     │   ├─ api    // controllers
│     │   ├─ message-queue  // consumers
│     ├─ domain    // business logic, DTOs, services
│     ├─ data-access  // direct DB calls
```

### 1.3 Wrap common utilities as packages

* Place reusable modules in a dedicated folder (e.g., libraries/logger) with their own package.json.
* This enables encapsulation and potential future publishing.

Code Example:
```
my-system
├─ apps (components)
│  ├─ component-a
├─ libraries
│  ├─ logger
│     ├─ package.json
│     ├─ src
│         ├─ index.js
```

### 1.4 Use environment aware, secure and hierarchical config

* Configuration must support reading from both files and environment variables, with secured secret storage.
* Include hierarchical structure, default values and validation (using packages such as convict, env-var, zod).

Configuration Requirements:
- Keys read from file and env
- Secrets kept outside committed code
- Hierarchical config structure
- Default values for each key

### 1.5 Consider consequences when choosing the main framework

* Evaluate frameworks such as Nest.js, Fastify, Express, and Koa with pros and cons.
* Nest.js especially suits large-scale, OOP based applications; Fastify is preferable for microservice architectures.

### 1.6 Use TypeScript sparingly and thoughtfully

* Employ TypeScript to define variable and function return types.
* Use simple types and advanced features only when necessary to avoid complexity.

## 2. Error Handling Practices

### 2.1 Use Async-Await or Promises

* Replace callback style with async/await for clearer error handling.

Example:
```
async function fetchData() {
  try {
    const result = await getData();
    return result;
  } catch (err) {
    // handle error
    throw err;
  }
}
```

### 2.2 Extend the built-in Error object

* Create a custom error class extending Error to include properties such as error name/code and isCatastrophic.

Example:
```
class AppError extends Error {
  constructor(message, code, isCatastrophic = false) {
    super(message);
    this.code = code;
    this.isCatastrophic = isCatastrophic;
  }
}
```

### 2.3 Distinguish catastrophic from operational errors

* Operational errors (e.g., invalid inputs) are handled differently from programmer (catastrophic) errors.

### 2.4 Handle errors centrally

* Centralize error handling logic (logging, metrics, process exit) instead of scattering inside middleware.

### 2.5 Document API errors using OpenAPI or GraphQL

* Explicitly document response errors to improve API consumer reliability.

### 2.6 Exit the process gracefully on unknown errors

* For catastrophic errors, gracefully shut down connections and exit the process so that the infrastructure can restart the service.

### 2.7 Use a mature logger

* Use mature logging frameworks (e.g., Pino, Winston) rather than console.log to attach custom properties, apply log levels, and output in JSON.

Example using Winston:
```
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});
```

### 2.8 Test error flows

* Validate error handling using test frameworks covering both happy and error paths.

### 2.9 Discover errors using APM products

* Implement APM to discover downtime and errors automatically.

### 2.10 Catch unhandled promise rejections

* Register to `process.unhandledRejection` to log and handle promise rejections.

Example:
```
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});
```

### 2.11 Validate arguments and fail fast

* Use libraries (ajv, zod, typebox) for input validation at the API boundary.

### 2.12 Always await promises before returning

* To ensure full stacktrace is captured, always use `return await promise` in async functions.

### 2.13 Subscribe to event emitter 'error' events

* Instead of try/catch, listen to the 'error' event for events or streams.

Example:
```
const emitter = getSomeEmitter();
emitter.on('error', (err) => {
  // handle emitter error
});
```

## 3. Code Patterns And Style Practices

### 3.1 Use ESLint

* Use ESLint to detect errors and enforce code style.

### 3.2 Use Node.js ESLint extension plugins

* Install plugins like eslint-plugin-node, eslint-plugin-mocha, etc. to catch Node-specific issues.

### 3.3 Curly Brace Placement

* Place opening curly braces on the same line as the statement.

Example (Correct):
```
function someFunction() {
  // code block
}
```

### 3.4 Separate statements properly

* Avoid pitfalls with automatic semicolon insertion; enforce statement separation via linters like Prettier.

### 3.5 Name your functions

* Always name functions, including callbacks and closures, to enable effective debugging.

### 3.6 Naming Conventions

* Use lowerCamelCase for variables and functions, UpperCamelCase for classes, and UPPER_SNAKE_CASE for globals.

Code Example:
```
const GLOBAL_CONSTANT = 'value';
class SomeClassExample {
  static STATIC_PROPERTY = 'value';
}
```

### 3.7 Prefer const over let; avoid var

* Use const when a variable is immutable and let when reassignment is needed.

### 3.8 Require modules at the top

* All requires/imports should be at the start of the file to avoid performance issues.

### 3.9 Set an explicit entry point

* For modules, export a public interface using an index.js or package.json "main"/"exports".

Example:
```
// index.js
module.exports = {
  SMSWithMedia: require('./SMSProvider/providers/media/media-provider.js')
};
```

### 3.10 Use the === operator

* Always use strict equality (===) to avoid type coercion issues.

### 3.11 Use Async/Await and avoid callbacks

* Preferred pattern for asynchronous operations.

### 3.12 Use arrow functions

* Arrow functions maintain lexical this and tend to have a more compact syntax.

### 3.13 Avoid effects outside functions

* Encapsulate network or DB calls within explicit functions to prevent unexpected early executions.

## 4. Testing And Overall Quality Practices

### 4.1 Write API (component) tests as a minimum

* Focus on API testing before unit testing to ensure maximum coverage.

### 4.2 Include three parts in each test name

* Test names should clarify the unit being tested, the conditions, and the expected outcome.

### 4.3 Structure tests using the AAA pattern (Arrange, Act, Assert)

* Clearly separate test setup, execution, and verification.

### 4.4 Ensure Node version is unified

* Use version management tools (nvm, Volta) to enforce consistent Node.js versions across environments.

### 4.5 Avoid global test fixtures; use per-test data seeds

* Each test should set up its own data to prevent inter-dependencies.

### 4.6 Tag your tests for selective execution

* Use tags (e.g., #sanity, #api) to run subsets of tests when needed.

### 4.7 Check test coverage

* Utilize tools like Istanbul/NYC to enforce minimum coverage thresholds.

### 4.8 Use production-like environment for E2E tests

* Run end-to-end tests in an environment mimicking production (Docker Compose recommended).

### 4.9 Refactor code using static analysis tools

* Integrate tools like SonarQube or Code Climate for regular code inspection and to detect duplication or complexity issues.

### 4.10 Mock external HTTP responses

* Use nock or Mock-Server to simulate external API responses, including error conditions.

### 4.11 Test middleware in isolation

* Stub/spies for {req, res, next} objects to test middleware independently.

### 4.12 Use random ports in testing

* When running tests, start servers on port 0 to assign random available ports.

### 4.13 Test all five possible outcomes

* Ensure tests cover responses, state changes, external API calls, messaging events, and observability logs.

## 5. Going To Production Practices

### 5.1 Monitoring

* Define key metrics (uptime, event loop lag, etc.) and use observability tools.

### 5.2 Increase observability through smart logging

* Plan log collection, aggregation, and analysis from day one.

### 5.3 Delegate tasks (gzip, SSL) to reverse proxies

* Offload CPU intensive tasks to tools like nginx or HAProxy.

### 5.4 Lock dependencies

* Always commit lockfiles (e.g., package-lock.json) to ensure environment consistency.

### 5.5 Guard process uptime

* Use managed platforms (Docker, Kubernetes) or process managers (systemd) to monitor and restart processes.

### 5.6 Utilize all CPU cores

* Replicate Node.js processes to fully utilize available CPU cores.

### 5.7 Create a maintenance endpoint

* Expose system information (memory usage, REPL access) via a secured API endpoint.

### 5.8 Discover unknowns with APM products

* Integrate Application Performance Monitoring to capture latency and error contexts.

### 5.9 Make your code production-ready

* Follow development guidelines that support easy production debugging and maintenance.

### 5.10 Measure and guard memory usage

* Monitor Node.js process memory usage (v8 limits ~1.4GB) and implement safeguards against leaks.

### 5.11 Serve frontend assets outside Node

* Use specialized static file servers (nginx, S3, CDN) to serve frontend assets.


## Attribution
- Source: Node.js Best Practices
- URL: https://github.com/goldbergyoni/nodebestpractices
- License: MIT
- Crawl Date: 2025-04-17T14:19:37.041Z
- Data Size: 950161 bytes
- Links Found: 6669

## Retrieved
2025-04-17
