# TWELVE_FACTOR

## Crawl Summary
Config is implemented via environment variables to separate deploy-specific values (resource handles, credentials, hostnames) from code. Backing services are attached resources accessible via URLs or config handles. The recommended practice is to use granular, independent env vars instead of grouped configuration files, ensuring that the code can be open-sourced without credential exposure.

## Normalised Extract
Table of Contents:
1. Environment Variables as Config
   - Use export commands; set key-value pairs in OS environment
   - Example: export DATABASE_URL='postgres://user:pass@host/db'
2. Backing Services
   - Treat databases, caching systems, messaging services as attached resources
   - Swap resource handles without code changes
3. Codebase and Deploys
   - One codebase; multiple deploys each with independent config
   - Ensure credentials and deployment-specific values are maintained externally
4. Best Practices and Verification
   - Do not hard-code constants; use environment variables to avoid accidental exposure
   - Use system commands (env, printenv) to verify configuration

Details:
Environment Variables must be set externally. For example, in Node.js, use process.env.KEY to access configuration. Configuration files (like config/database.yml) must not be version controlled to avoid accidental commits.
Backing services are identified by their endpoint URLs and credentials stored as env vars. Changing a resource only requires updating the env variable.
Multiple deploys share the same codebase but load different environment settings for development, staging, or production.
Best practices include verifying that no sensitive data is in the source and using orthogonal env vars rather than grouped configurations.

## Supplementary Details
Technical Specifications:
- Config Parameter: Use environment variables (e.g., DATABASE_URL, API_KEY) with string values.
- Environment: OS-agnostic, used via export command on Unix or set command on Windows.
- Implementation Steps:
   1. Remove all configuration constants from code.
   2. Define each config item as an independent environment variable.
   3. In deployment scripts, load the environment variables either manually or via tools like dotenv.
   4. Validate configuration at startup (e.g., using a validation library).
- Configuration Options:
   • export VARIABLE=value
   • Dotenv fallback in development: load .env file (do not commit .env to VCS).
- Effects:
   • Changing deploy config requires only updating env vars; no code change necessary.

## Reference Details
API Specifications and Implementation Details:
- Function: setEnvVar
  Signature: function setEnvVar(key: string, value: string): void
  Description: Sets an environment variable in the application runtime. Throws error if invalid key provided.

- Function: getEnvVar
  Signature: function getEnvVar(key: string): string | undefined
  Description: Retrieves the value of an environment variable. Returns undefined if not set.

- Sample Code (Node.js):
--------------------------------------------------
// Set an environment variable
function setEnvVar(key, value) {
  if (!key || typeof key !== 'string') {
    throw new Error('Invalid environment variable key');
  }
  process.env[key] = value;
}

// Get an environment variable with fallback
function getEnvVar(key, defaultValue) {
  const value = process.env[key];
  if (value === undefined && defaultValue !== undefined) {
    return defaultValue;
  }
  return value;
}

// Example usage:
setEnvVar('DATABASE_URL', 'postgres://user:pass@host/db');
console.log('DB URL:', getEnvVar('DATABASE_URL'));
--------------------------------------------------

Configuration Options and Defaults:
- DOTENV: Use configuration file named '.env' in development; do not commit this file.
   • Default: Not loaded in production; manually set environment variables.
- Troubleshooting Commands:
   • Linux/Mac: run 'env | grep DATABASE_URL' to check the variable
   • Windows: run 'set DATABASE_URL' in CMD

Best Practices:
1. Validate all required environment variables at application start-up, e.g., using a schema validator (e.g., Zod in Node.js).
2. Separate deployment-specific configuration from internal app configuration.
3. Use documented keys and consistent naming conventions (UPPERCASE, underscore separated).
4. Regularly audit and verify that no secret keys are embedded in the application source.
5. In CI/CD pipelines, load environment variables securely using secret managers.

Troubleshooting Procedures:
- Command: node app.js
  Expected Output: The application logs the successful loading of all required env vars or throws clear error messages if any are missing.
- Verification: Run diagnostic script that lists all critical env variables and their sources.


## Information Dense Extract
Config must use environment variables; each key-value pair set externally. Backing services accessed via URL. Codebase remains constant across deploys. Recommendations: export VARIABLE=value, do not store constants. API: setEnvVar(key:string,value:string):void; getEnvVar(key:string):string|undefined. Use .env file for development; production requires manual env setup. Validate at start-up with schema (e.g., Zod). Troubleshoot using env|grep and diagnostic scripts. Best practice: independent, orthogonal env vars, no grouped config.

## Sanitised Extract
Table of Contents:
1. Environment Variables as Config
   - Use export commands; set key-value pairs in OS environment
   - Example: export DATABASE_URL='postgres://user:pass@host/db'
2. Backing Services
   - Treat databases, caching systems, messaging services as attached resources
   - Swap resource handles without code changes
3. Codebase and Deploys
   - One codebase; multiple deploys each with independent config
   - Ensure credentials and deployment-specific values are maintained externally
4. Best Practices and Verification
   - Do not hard-code constants; use environment variables to avoid accidental exposure
   - Use system commands (env, printenv) to verify configuration

Details:
Environment Variables must be set externally. For example, in Node.js, use process.env.KEY to access configuration. Configuration files (like config/database.yml) must not be version controlled to avoid accidental commits.
Backing services are identified by their endpoint URLs and credentials stored as env vars. Changing a resource only requires updating the env variable.
Multiple deploys share the same codebase but load different environment settings for development, staging, or production.
Best practices include verifying that no sensitive data is in the source and using orthogonal env vars rather than grouped configurations.

## Original Source
12 Factor App - Config
https://12factor.net/config

## Digest of TWELVE_FACTOR

# CONFIGURATION
Retrieved on 2023-10-12

# Overview
An application’s configuration includes everything that can vary between deploys (staging, production, development, etc.). This document emphasizes storing configuration in environment variables rather than constants or config files checked into source control.

# Environment Variables as Config
- Store resource handles (e.g., database URLs, Memcached addresses) and external service credentials (e.g., Amazon S3, Twitter) in environment variables.
- Avoid embedding configuration in code to allow the codebase to be open source without credential leaks.
- Use the operating system environment (OS agnostic) to set config values, e.g.: export DATABASE_URL='postgres://user:pass@host/db'

# Backing Services
- Treat backing services (databases, caching systems, message queues, SMTP servers) as attached resources.
- Swap local services with third-party providers by changing the resource handle in the environment without modifying application code.

# Codebase and Deploys
- One codebase per app; multiple deploys share the same codebase with different config via environment variables.
- Each deploy (local, staging, production) uses its own set of environment variables.

# Best Practices
- Do not group environment variables by deploy (avoid “environments” grouping) to prevent combinatorial configuration complexity.
- Ensure that changing an environment variable does not require a code change.

# Troubleshooting and Verification
- Verify proper config separation by checking that no sensitive information exists in the code repository.
- Use commands such as env | grep -i <VARIABLE_NAME> to inspect runtime environment variables.

# Attribution and Data Size
- Crawled data size: 448684 bytes
- Retrieved from https://12factor.net/config
- Multiple language examples provided (English, Czech, German, Greek, Spanish, French, Italian, Japanese, Korean, Polish, Portuguese, Russian)


## Attribution
- Source: 12 Factor App - Config
- URL: https://12factor.net/config
- License: Unknown License
- Crawl Date: 2025-04-28T05:53:44.843Z
- Data Size: 448684 bytes
- Links Found: 3106

## Retrieved
2025-04-28
