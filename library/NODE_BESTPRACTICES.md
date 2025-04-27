# NODE_BESTPRACTICES

## Crawl Summary
Condensed technical details emphasize modular architecture with clear business components and layered design, robust error handling via async/await and a centralized error middleware, precise code style rules enforced by ESLint and naming conventions, comprehensive testing strategies using AAA and port randomization, production practices such as dependency locking, Docker multi-stage builds, clustering for CPU utilization, and stringent security measures including secret extraction and payload protection.

## Normalised Extract
Table of Contents:
1. Project Architecture Practices
   - Structure by Components: Use directories like apps/<component> and libraries for reusable modules. Components encapsulate API, business logic, and data access.
   - Three-Tier Layering: Each component should have entry-points (controllers), domain (logic), and data-access (DB operations) folders.
   - Wrapping Utilities: Encapsulate common utilities in separate packages with their own package.json, exposing only public interfaces.
   - Environment Configuration: Utilize configuration libraries (convict, env-var, zod) to load hierarchical, validated settings from environment and file with defaults.
   - Framework Selection: Evaluate frameworks (Nest.js, Fastify, Express, Koa) based on scale and modular needs.
   - TypeScript Considerations: Use TypeScript to define types, but apply advanced features only when needed to avoid over-complexity.
2. Error Handling Practices
   - Asynchronous Handling: Implement async/await to streamline error processing and avoid callback hell.
   - Extend Error: Create a custom AppError class inheriting from Error with properties like code and isCatastrophic.
   - Error Categorization: Distinguish operational errors from catastrophic ones for appropriate handling (retry vs. process exit).
   - Centralized Error Middleware: Implement a middleware to log errors (using Pino/Winston) and send standard HTTP responses.
   - Documentation: Use OpenAPI specifications to detail API error responses.
   - Process Safety: Use process.on('unhandledRejection', handler) and always await promises to preserve complete stack traces.
   - Event Handling: Subscribe to error events on EventEmitters with {captureRejections: true}.
3. Code Patterns and Style
   - Enforce ESLint rules with Node.js plugins to catch anti-patterns and security issues.
   - Maintain consistent formatting: Curly braces on same line, explicit semicolon rules, and clear separation of statements.
   - Naming Conventions: lowerCamelCase for functions/variables, UpperCamelCase for classes, UPPER_SNAKE_CASE for globals.
   - Module Import Best Practices: Require modules at the top of the file and expose a clear public API via package.json main field.
4. Testing and Quality Assurance
   - API Testing: Write tests for components using AAA pattern (Arrange, Act, Assert) and use randomized ports to prevent conflicts.
   - Environment Consistency: Use tools like nvm/Volta to enforce a unified Node version and avoid shared global fixtures in tests.
   - Coverage: Use Istanbul/NYC and set minimum thresholds to catch untested branches.
5. Production Readiness
   - Monitoring: Integrate APM and logging using Pino to monitor uptime, performance metrics, and errors.
   - Deployment Strategies: Use npm ci for installation, lock dependencies via package-lock.json, and deploy using Docker multi-stage builds with defined memory limits.
   - Clustering: Utilize all CPU cores via Node.js clustering or container orchestration to maximize performance.
   - Reverse Proxy: Offload tasks like gzip and SSL termination to Nginx or similar solutions.
6. Security Measures
   - Lint and validate input to enforce security best practices.
   - Manage Secrets: Extract secrets from source files and secure them with encryption; enforce non-root execution.
   - Protect against injections and DOS attacks by limiting payload sizes and validating JSON schemas.

## Supplementary Details
Implementation Specifications:
- Directory Structure: Use 'apps/<component>' for business modules and 'libraries/<utility>' for common utilities. Each package must include its own package.json to explicitly define exported interfaces.
- Environment Configuration: Configure using convict/env-var/zod. Example default: NODE_ENV set to 'development', switch to 'production' in deployment. Validate all required keys at startup.
- Logging: Initialize Pino logger with configuration: level: 'info', prettyPrint: true; direct logs to stdout for aggregation.
- Error Handling: Create an AppError class, e.g.:
  class AppError extends Error {
    constructor(message, code, isCatastrophic) {
      super(message);
      this.code = code;
      this.isCatastrophic = isCatastrophic;
    }
  }
- Async Handling: Always use return await in async functions to maintain full stack traces. Use process.on('unhandledRejection', handler) for orphan rejections.
- Testing: Structure tests in AAA format. When starting HTTP servers, pass port 0 to auto-select a free port. Use tools like Vitest or Mocha with Istanbul for coverage.
- Docker Configuration: Use multi-stage builds. Sample Dockerfile configuration:
  FROM node:14-alpine
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci
  COPY . .
  EXPOSE 3000
  CMD ["npm", "run", "start"]
- Deployment: Use npm ci to lock dependencies, set NODE_ENV=production, and run using process managers like pm2 or Docker orchestrators.
- Security: Configure ESLint with security plugins, extract and encrypt secrets, and limit request payloads via reverse-proxy or middleware.

## Reference Details
API and SDK Specifications:

Error Handling API:
- Method Signature: async function fetchData(url: string): Promise<any>
- Throws: AppError (extends Error with properties { code: string, isCatastrophic: boolean })
- Example Implementation:
  async function fetchData(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new AppError('FetchError', 'Failed to fetch data', true);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

Validation API:
- Method Signature: function validateInput(input: any): { valid: boolean, errors?: string[] }
- Use libraries such as ajv or zod for schema validation.

Configuration Options:
- NODE_ENV: Accepts 'development' or 'production'. Default is 'development'.
- Docker Build Parameters: Use --memory flag for setting memory limits, e.g., docker run --memory=512m.

Best Practices Code Example:
// index.js
const express = require('express');
const pino = require('pino');
const app = express();
const logger = pino({ level: 'info', prettyPrint: true });
app.use(express.json());

app.get('/api/data', async (req, res, next) => {
  try {
    const data = await fetchData('https://api.example.com');
    res.json(data);
  } catch (e) {
    next(e);
  }
});

// Centralized Error Middleware
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => {
  logger.info('Server running on port 3000');
});

Troubleshooting Procedures:
- To capture unhandled promise rejections, run: node --trace-warnings index.js
- To install dependencies deterministically, run: npm ci
- For production deployments, use: pm2 start ecosystem.config.js
- Verify test coverage with NYC: nyc npm run test (expect coverage above threshold, e.g., 90%).

## Information Dense Extract
NODE_BESTPRACTICES: Components - apps/<component> with entry-points, domain, data-access; Config - use convict/env-var/zod, NODE_ENV defaults to development, switch production; Logging - Pino with level 'info', prettyPrint true, stdout; Error Handling - async/await, custom AppError extends Error {code, isCatastrophic}, centralized middleware, process.on('unhandledRejection'); ESLint enforced with node-security plugins; Testing - AAA pattern, API tests with randomized port (app.listen(0)), coverage with NYC; Production - npm ci, package-lock.json enforced, Docker multi-stage builds, explicit EXPOSE and CMD, reverse proxy for gzip/SSL; Security - secret extraction, payload size limits, ORM/ODM for injection protection; API specs and SDK method signatures provided with full code examples and troubleshooting commands.

## Sanitised Extract
Table of Contents:
1. Project Architecture Practices
   - Structure by Components: Use directories like apps/<component> and libraries for reusable modules. Components encapsulate API, business logic, and data access.
   - Three-Tier Layering: Each component should have entry-points (controllers), domain (logic), and data-access (DB operations) folders.
   - Wrapping Utilities: Encapsulate common utilities in separate packages with their own package.json, exposing only public interfaces.
   - Environment Configuration: Utilize configuration libraries (convict, env-var, zod) to load hierarchical, validated settings from environment and file with defaults.
   - Framework Selection: Evaluate frameworks (Nest.js, Fastify, Express, Koa) based on scale and modular needs.
   - TypeScript Considerations: Use TypeScript to define types, but apply advanced features only when needed to avoid over-complexity.
2. Error Handling Practices
   - Asynchronous Handling: Implement async/await to streamline error processing and avoid callback hell.
   - Extend Error: Create a custom AppError class inheriting from Error with properties like code and isCatastrophic.
   - Error Categorization: Distinguish operational errors from catastrophic ones for appropriate handling (retry vs. process exit).
   - Centralized Error Middleware: Implement a middleware to log errors (using Pino/Winston) and send standard HTTP responses.
   - Documentation: Use OpenAPI specifications to detail API error responses.
   - Process Safety: Use process.on('unhandledRejection', handler) and always await promises to preserve complete stack traces.
   - Event Handling: Subscribe to error events on EventEmitters with {captureRejections: true}.
3. Code Patterns and Style
   - Enforce ESLint rules with Node.js plugins to catch anti-patterns and security issues.
   - Maintain consistent formatting: Curly braces on same line, explicit semicolon rules, and clear separation of statements.
   - Naming Conventions: lowerCamelCase for functions/variables, UpperCamelCase for classes, UPPER_SNAKE_CASE for globals.
   - Module Import Best Practices: Require modules at the top of the file and expose a clear public API via package.json main field.
4. Testing and Quality Assurance
   - API Testing: Write tests for components using AAA pattern (Arrange, Act, Assert) and use randomized ports to prevent conflicts.
   - Environment Consistency: Use tools like nvm/Volta to enforce a unified Node version and avoid shared global fixtures in tests.
   - Coverage: Use Istanbul/NYC and set minimum thresholds to catch untested branches.
5. Production Readiness
   - Monitoring: Integrate APM and logging using Pino to monitor uptime, performance metrics, and errors.
   - Deployment Strategies: Use npm ci for installation, lock dependencies via package-lock.json, and deploy using Docker multi-stage builds with defined memory limits.
   - Clustering: Utilize all CPU cores via Node.js clustering or container orchestration to maximize performance.
   - Reverse Proxy: Offload tasks like gzip and SSL termination to Nginx or similar solutions.
6. Security Measures
   - Lint and validate input to enforce security best practices.
   - Manage Secrets: Extract secrets from source files and secure them with encryption; enforce non-root execution.
   - Protect against injections and DOS attacks by limiting payload sizes and validating JSON schemas.

## Original Source
Node.js Best Practices
https://github.com/goldbergyoni/nodebestpractices

## Digest of NODE_BESTPRACTICES

# Node.js Best Practices
Date Retrieved: 2023-10-05

This document provides a collection of actionable technical details extracted from the Node.js Best Practices repository. It covers implementation patterns, API method signatures, precise configuration details, and provides complete code examples to support quick application and troubleshooting.

# Project Architecture Practices
1.1 Structure by Business Components: 
  - Organize the repository into folders representing business domains (e.g., 'users', 'orders').
  - Each component must include its own API, business logic, and database logic. Example directory layout:
    my-system
    ├─ apps
    │  ├─ orders
    │  ├─ users
    │  └─ payments
    └─ libraries
       ├─ logger
       └─ authenticator

1.2 Three-Tier Layering of Components:
  - Each component must include dedicated folders:
    • entry-points: contains controllers and any network interface code.
    • domain: houses business logic, DTOs, and service functions.
    • data-access: includes direct database calls and raw query executions.
  - Enforces separation of concerns ensuring the web layer does not leak into business logic.

1.3 Wrap Common Utilities as Packages:
  - Place reusable utilities in dedicated folders (e.g., libraries/logger) with their own package.json.
  - Define an explicit public interface using package.json’s main or exports field to decouple internal implementation.

1.4 Environment-Aware and Hierarchical Configuration:
  - Use configuration libraries (convict, env-var, or zod) to load keys from both files and environment variables.
  - Ensure secrets remain external, define hierarchical structures, provide default values, and enforce validation on startup.

1.5 Framework Selection Guidelines:
  - Evaluate frameworks like Nest.js for large scale OOP or Fastify for simpler, microservice style apps.
  - Consider tradeoffs in modular architecture and feature scope before finalizing the main framework.

1.6 TypeScript Usage Considerations:
  - Use TypeScript primarily for variable and function type definitions to catch 20% of potential bugs early.
  - Use advanced type features sparingly to avoid unnecessary complex code that may increase bug fix times.

# Error Handling Practices
2.1 Asynchronous Error Handling:
  - Implement async/await rather than callbacks to simplify error handling and avoid pyramid of doom.

2.2 Extend the Built-in Error Object:
  - Create an AppError class extending Error with additional properties such as code (string) and isCatastrophic (boolean).

2.3 Operational vs. Catastrophic Errors:
  - Distinguish known operational errors (recoverable) and programmer errors (require process restart) to decide on error handling strategy.

2.4 Centralized Error Handling:
  - Create a global error handler middleware to log errors and decide on response statuses.

2.5 Document API Errors:
  - Use OpenAPI or GraphQL to document potential API error responses, ensuring clients can handle error conditions gracefully.

2.6 Process Exit on Critical Failures:
  - Use graceful shutdown procedures when unrecoverable errors occur.

2.7 Mature Logging Mechanisms:
  - Integrate loggers like Pino or Winston with features such as log levels, pretty printing, and output to stdout.

2.8 Testing Error Flows:
  - Simulate error scenarios including unhandled rejections and exceptions to ensure the centralized error handler works correctly.

2.9 Unhandled Promise Rejections:
  - Register a handler on process.on('unhandledRejection', handler) to catch errors from undealt promises.

2.10 Argument Validation:
  - Validate function arguments using libraries like ajv, zod, or typebox to fail fast and avoid downstream errors.

2.11 Await Promises for Full Stack Traces:
  - Always use return await in async functions so that error stack traces are complete.

2.12 Error Events in Streams and Event Emitters:
  - Subscribe to events using emitter.on('error', handler) and initialize EventEmitters with {captureRejections: true}.

# Code Patterns and Style Practices
3.1 ESLint and Node.js Plugins:
  - Use ESLint with node-specific plugins, for example eslint-plugin-node-security, to catch potential security issues and enforce coding style.

3.2 Curly Brace and Statement Guidelines:
  - Place opening curly braces on the same line as the statement and clearly separate statements to avoid syntax pitfalls.

3.3 Function Naming and Variable Conventions:
  - Use lowerCamelCase for functions and variables, UpperCamelCase for classes, and UPPER_SNAKE_CASE for global constants.

3.4 Module Import Best Practices:
  - Always require modules at the top of the file to detect dependency issues early and improve clarity.

3.5 Explicit Module Entry Points:
  - Define package.json’s main field or use an index.js to expose only the public API of a module.

# Testing and Overall Quality Practices
4.1 API Testing Essentials:
  - Start by writing API/component tests using frameworks like Vitest or Mocha, ensuring adequate coverage for both happy and error paths.

4.2 AAA Pattern in Testing:
  - Structure tests in three clear sections: Arrange, Act, and Assert.

4.3 Test Environment Consistency:
  - Ensure the same Node.js version using nvm or Volta and avoid global test fixtures by creating fresh data per test.

4.4 Port Randomization for Testing:
  - When initializing the web server in tests, pass port 0 to let the system assign an available port.

# Production and Deployment Practices
5.1 Monitoring and Observability:
  - Integrate monitoring (APM) tools to watch uptime, performance metrics, and error rates.

5.2 Delegating Heavy Tasks:
  - Delegate CPU-intensive tasks such as gzip compression and SSL termination to reverse proxies like Nginx.

5.3 Dependency Lock and Process Management:
  - Use package-lock.json and npm ci to ensure consistent dependency trees across environments. Manage process uptime with Docker, pm2, or systemd.

5.4 Clustering and Multi-Core Utilization:
  - Scale Node processes to utilize all CPU cores, either by using cluster modules or container orchestration.

5.5 Docker Best Practices:
  - Use multi-stage builds, clean build caches, set explicit image references, and define memory limits and caching strategies in your Dockerfiles.

# Security Practices
6.1 Linter Security Rules:
  - Enforce rules to prevent unsafe code patterns and configure middleware to validate inputs.

6.2 Secret Management:
  - Extract secrets from config files and use encryption where needed; utilize npm or Yarn 2FA for package publishing.

6.3 Payload and Injection Protections:
  - Prevent query injections using ORM/ODM libraries and configure reverse proxies to limit payload sizes.

6.4 Additional Measures:
  - Avoid usage of eval, package secrets securely to avoid disclosure, and run Node.js processes as non-root users.

# Attribution
Extracted from Goldbergyoni/nodebestpractices repository. Data Size: 1286702 bytes, 7767 links found.

## Attribution
- Source: Node.js Best Practices
- URL: https://github.com/goldbergyoni/nodebestpractices
- License: MIT License
- Crawl Date: 2025-04-27T06:50:58.937Z
- Data Size: 1286702 bytes
- Links Found: 7767

## Retrieved
2025-04-27
