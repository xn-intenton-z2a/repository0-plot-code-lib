# NODE_CONFIG

## Crawl Summary
Zod is used to define a configuration schema for Node.js applications. The schema validates environment variables, assigns default values, and performs type coercion. Critical elements include port conversion to a number, environment variable enumeration, and mandatory string requirements for database URLs. Errors during parsing are handled via ZodError.

## Normalised Extract
Table of Contents:
1. Schema Definition
   - Use z.object to create a configuration schema.
   - Define PORT as z.coerce.number().default(3000).
   - Define NODE_ENV as z.enum(['development','production','test']).default('development').
   - Define DATABASE_URL as z.string() (required).
2. Parsing and Error Handling
   - Parse environment variables using ConfigSchema.parse(process.env).
   - Catch and inspect ZodError to identify configuration issues.
3. Environment Variable Management
   - Ensure critical variables like DATABASE_URL are provided in production.

Technical Details:
- Schema Definition: The configuration schema uses zod's z.object method to enforce type safety. Coercion is applied to numeric values with z.coerce.number() and default values are set using .default().
- Parsing: The .parse() method returns a fully typed configuration object upon success. If validation fails, ZodError contains an array of issues, each detailing the path and error message.
- Error Handling: Use try-catch blocks around parsing to log the specific errors and terminate the process if misconfigured.

## Supplementary Details
Configuration Specifications:
- PORT: z.coerce.number(), default = 3000; ensures that the port is a number even if provided as a string.
- NODE_ENV: z.enum with values ['development', 'production', 'test'], default = 'development'; validates environment modes.
- DATABASE_URL: z.string(), no default; must be set in the environment.

Implementation Steps:
1. Install zod via npm.
2. Import { z } from 'zod'.
3. Define the ConfigSchema with required fields, coercion, and defaults.
4. Parse process.env using ConfigSchema.parse(process.env).
5. Implement error catching using try-catch and handle ZodError to provide precise diagnostics.

## Reference Details
API Specifications:
- z.object(schema: object): ZodObject; creates a schema object.
- z.coerce.number(): ZodNumber; converts input to number and validates.
- .default(value: any): returns a new schema that defaults to value if undefined.
- z.enum(values: string[]): ZodEnum; ensures value is one of the specified enumerations.
- parse(input: any): Returns validated and parsed configuration or throws ZodError.

SDK Method Signature Example:
function parseConfig(env: object): Config {
  const ConfigSchema = z.object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    DATABASE_URL: z.string()
  });
  return ConfigSchema.parse(env);
}

Error Handling Pattern:
try {
  const config = parseConfig(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('Configuration Error:', error.errors);
    process.exit(1);
  }
}

Configuration Options:
- PORT: Defaults to 3000. Effect: Ensures application listens on the specified port.
- NODE_ENV: Allowed values: 'development', 'production', 'test'. Effect: Enables environment-specific behavior.
- DATABASE_URL: Must be provided. Effect: Connects to the database.

Best Practices:
- Validate configuration on startup.
- Log detailed error messages during misconfiguration.
- Use .safeParse for non-fatal configuration checks during development.

Troubleshooting Procedures:
- Command: node app.js
Expected Output on misconfiguration: Logs error with details such as missing DATABASE_URL or type mismatch for PORT.
- Command: npm run start
Expected Output: Application starts on default port if process.env.PORT is invalid.

## Information Dense Extract
z.object({ PORT: z.coerce.number().default(3000), NODE_ENV: z.enum(['development','production','test']).default('development'), DATABASE_URL: z.string() }) parse(process.env) throws ZodError { errors: [{ path, message }] } Use try { Config = schema.parse(process.env) } catch(ZodError) { log error; process.exit(1) } API: z.coerce.number(), .default(value), z.enum([...]) Implementation strictly validates env, enforces type coercion, sets defaults.

## Sanitised Extract
Table of Contents:
1. Schema Definition
   - Use z.object to create a configuration schema.
   - Define PORT as z.coerce.number().default(3000).
   - Define NODE_ENV as z.enum(['development','production','test']).default('development').
   - Define DATABASE_URL as z.string() (required).
2. Parsing and Error Handling
   - Parse environment variables using ConfigSchema.parse(process.env).
   - Catch and inspect ZodError to identify configuration issues.
3. Environment Variable Management
   - Ensure critical variables like DATABASE_URL are provided in production.

Technical Details:
- Schema Definition: The configuration schema uses zod's z.object method to enforce type safety. Coercion is applied to numeric values with z.coerce.number() and default values are set using .default().
- Parsing: The .parse() method returns a fully typed configuration object upon success. If validation fails, ZodError contains an array of issues, each detailing the path and error message.
- Error Handling: Use try-catch blocks around parsing to log the specific errors and terminate the process if misconfigured.

## Original Source
Optimizing Node.js Configuration with Zod
https://blog.logrocket.com/how-to-manage-configuration-in-nodejs-with-zod/

## Digest of NODE_CONFIG

# Optimizing Node.js Configuration with Zod
Retrieved: 2023-10-26

## Overview
This document details a high-impact implementation of Node.js configuration management using the Zod library. The configuration schema is defined to validate and parse environment variables, ensuring type-safety, default values, and coercion of types.

## Schema Definition
Define a configuration schema using Zod's object constructor. Example signature:

  const ConfigSchema = z.object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    DATABASE_URL: z.string()
  });

## Parsing and Error Handling
Configuration is loaded by parsing process.env:

  const config = ConfigSchema.parse(process.env);

On failure, Zod raises a ZodError which includes details about invalid fields. Developers should catch errors to log detailed status:

  try {
    const config = ConfigSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Configuration Error:', error.errors);
      process.exit(1);
    }
  }

## Configuration Options
- PORT: Must be a number; defaults to 3000 if not provided.
- NODE_ENV: Specifies the running environment; allowed values include 'development', 'production', and 'test'; defaults to 'development'.
- DATABASE_URL: A required string value and must be provided in the environment.

## Attribution & Crawl Data
Data Size: 0 bytes. Source technical content extracted from the LogRocket blog entry "Optimizing Node.js Configuration with Zod".

## Attribution
- Source: Optimizing Node.js Configuration with Zod
- URL: https://blog.logrocket.com/how-to-manage-configuration-in-nodejs-with-zod/
- License: Free to Use with Attribution
- Crawl Date: 2025-05-01T04:51:28.986Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-01
