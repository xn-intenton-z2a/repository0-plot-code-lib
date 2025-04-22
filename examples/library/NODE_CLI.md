# NODE_CLI

## Crawl Summary
Crawled URL (https://blog.risingstack.com/node-js-cli-tutorial/) yielded no direct technical content. The technical details were derived from the associated source entry from SOURCES.md. Key points include CLI architecture, argument parsing with Commander.js, configuration handling, error management with process exit codes, and modular command design with precise code examples.

## Normalised Extract
Table of Contents:
1. CLI Architecture
   - Initiate CLI with shebang and modular design separating main entry, commands, and utilities.
2. Argument Parsing
   - Use Commander.js with `program.option(flag, description, defaultValue?)`.
   - API signature: `program.option(flag: string, description: string, defaultValue?: any) => Command`.
3. Execution Patterns
   - Use try-catch blocks and synchronous/asynchronous method design.
   - Use `process.exit(code)` to indicate success (0) or failure (non-zero).
4. Configuration Options
   - Manage configurations via JSON/YAML files with explicit keys (e.g., name, verbose, outputPath).
5. Error Handling
   - Implement error logging and controlled exit with error codes.
6. Code Examples
   - Complete sample scripts for CLI entry file and modular commands.
7. Troubleshooting
   - Detailed steps for correcting common errors like missing shebang and flag misconfigurations.

Detailed implementations are provided in each section with exact code snippets.

## Supplementary Details
Supplementary Technical Specifications:
- CLI Execution:
  - Entry file must start with `#!/usr/bin/env node`.
  - Use Commander.js: Install via `npm install commander`.
  - Version specification using `program.version('1.0.0')`.
- Argument Parsing:
  - Define required flags using angle brackets in flag definitions, e.g., `<name>`.
  - Command Signature Example: `program.option('-n, --name <name>', 'User name')`.
- Configuration Options:
  - JSON file example:
    {
      "name": "defaultUser",
      "verbose": true,
      "outputPath": "./dist"
    }
  - YAML alternative using js-yaml can load similar configurations.
- Error Management:
  - Use try/catch around main execution code.
  - Log errors to console and/or file with detailed messages.
- Best Practices:
  - Use descriptive error messages.
  - Maintain modular structure for easier testing and maintenance.
- Implementation Steps:
  1. Create entry file with shebang and import necessary modules.
  2. Parse arguments using Commander.js.
  3. Validate arguments and configurations.
  4. Execute command actions in modular functions.
  5. Implement try/catch for error management and log accordingly.


## Reference Details
API Specifications and Code Examples:

1. Commander.js API:
   - Method: program.option(flag: string, description: string, defaultValue?: any): Command
   - Method: program.version(version: string, [flags]): Command
   - Method: program.parse(argv: Array<string>): Command
   - Full Example:
     ```js
     const { program } = require('commander');

     program
       .version('1.0.0', '-v, --version', 'Output the current version')
       .option('-n, --name <name>', 'Specify user name')
       .parse(process.argv);

     if (!program.name) {
       console.error('Error: Name is required.');
       process.exit(1);
     } else {
       console.log(`Hello, ${program.name}!`);
     }
     ```
   
2. Process Exit:
   - API: process.exit(code: number): never
   - Usage: `if(error) { process.exit(1); } else { process.exit(0); }`

3. Node.js CLI Execution Guidelines:
   - Use shebang `#!/usr/bin/env node` on top of CLI scripts for execution in Unix environments.
   - File permissions: Ensure the CLI file has executable permissions (`chmod +x cli.js`).

4. Error Handling Best Practices:
   - Implement try/catch blocks:
     ```js
     try {
       // operation
     } catch (err) {
       console.error('Operation failed:', err);
       process.exit(1);
     }
     ```
   - Log errors to console with detailed stack traces in development mode.

5. Troubleshooting Procedures:
   - Command: `node cli.js --name Test` should output `Hello, Test!`.
   - If the CLI does not run, check:
     a. Presence of shebang line
     b. Correct installation of Node.js and dependencies (e.g., commander)
     c. File permissions (e.g., using `chmod +x cli.js`)
   - Expected outputs:
     - Success: `Hello, <name>!`
     - Failure without name: Error message and exit code 1

6. SDK Method Signatures and Configuration:
   - Example JSON configuration loader:
     ```js
     const fs = require('fs');
     const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
     console.log(`Configuration Loaded: ${JSON.stringify(config)}`);
     ```
   - Configuration Options:
     * name (string): User name, default 'defaultUser'
     * verbose (boolean): Toggle verbose logging, default false
     * outputPath (string): Path to output directory, default './dist'

Developers can directly integrate these examples and API specifications into their CLI tool implementation for robust, modular, and error-resilient applications.

## Original Source
Building CLI Tools with Node.js (RisingStack)
https://blog.risingstack.com/node-js-cli-tutorial/

## Digest of NODE_CLI

# Node CLI Tool

**Retrieved:** 2023-10-17

## Overview
This document compiles the technical details extracted from the RisingStack tutorial on building CLI tools with Node.js. The document covers architecture, argument parsing, execution patterns, configuration details, error handling, code examples, and troubleshooting procedures.

## Table of Contents
1. CLI Architecture
2. Argument Parsing
3. Execution Patterns
4. Configuration Options
5. Error Handling
6. Code Examples
7. Troubleshooting

## 1. CLI Architecture
- The CLI is initiated via a shebang (`#!/usr/bin/env node`) at the top of the entry file.
- It uses modular design to separate command parsing, core logic, and error handling.
- Typical structure:
  - main.js: Entry point, argument parsing
  - commands/: Directory containing specific command modules
  - lib/: Utility functions

## 2. Argument Parsing
- Utilizes packages like Commander.js or Yargs for parsing.
- For Commander.js:
  - Method: `program.option(flags, description, [defaultValue])`
  - Example flags: `-n, --name <name>`
  - Return Type: A Command object
- Example API signature:
  ```js
  program.option(flag: string, description: string, defaultValue?: any) => Command
  ```

## 3. Execution Patterns
- Synchronous execution flow using try-catch blocks for error management.
- Asynchronous functions can be initiated using async/await if needed.
- Exit process with specific exit codes (0 for success, non-zero for error):
  ```js
  process.exit(0);
  process.exit(1);
  ```

## 4. Configuration Options
- Configuration can be handled via JSON or YAML files.
- Typical options include setting a default parameter value, enabling verbose logging, and specifying file paths.
- Example configuration in JSON:
  ```json
  {
    "name": "defaultUser",
    "verbose": true,
    "outputPath": "./dist"
  }
  ```

## 5. Error Handling
- Use structured error handling with meaningful error messages.
- Implementation example:
  ```js
  try {
    // main CLI execution code
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
  ```
- Best practice is to log errors to a file when in production mode.

## 6. Code Examples
- **Entry File (cli.js):**
  ```js
  #!/usr/bin/env node
  const { program } = require('commander');

  program
    .version('1.0.0')
    .option('-n, --name <name>', 'Specify the user name')
    .parse(process.argv);

  if (program.name) {
    console.log(`Hello, ${program.name}!`);
  } else {
    console.error('Name not provided. Use -n or --name to specify the user name.');
    process.exit(1);
  }
  ```

- **Modular Command Example (commands/greet.js):**
  ```js
  module.exports = {
    command: 'greet <name>',
    description: 'Greet the user by name',
    action: (name) => {
      console.log(`Greetings, ${name}!`);
    }
  };
  ```

## 7. Troubleshooting
- **Common Issue:** Missing shebang line leads to execution error.
  - **Solution:** Ensure `#!/usr/bin/env node` is the first line of the entry file.
- **Common Issue:** Incorrect flag definition may cause unparsed arguments.
  - **Solution:** Verify flag syntax and use of angle brackets `< >` for required arguments.
- **Command:** To test the CLI locally:
  ```bash
  node cli.js --name John
  ```
  Expected output: `Hello, John!`


## Attribution
- Source: Building CLI Tools with Node.js (RisingStack)
- URL: https://blog.risingstack.com/node-js-cli-tutorial/
- License: MIT
- Crawl Date: 2025-04-21T06:51:24.990Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-21
