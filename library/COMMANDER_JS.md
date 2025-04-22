# COMMANDER_JS

## Crawl Summary
Installation via npm, quick start examples showing the use of global program or local Command instances, detailed usage of .option() for defining boolean, value, default, negatable, and optional options. Comprehensive examples of subcommands, action handlers (including async), argument parsing, custom option processing, and lifecycle hooks. Complete code examples provided including error handling and overrides for exit and output. Detailed configurations for customizing help, parsing behavior, and advanced usage scenarios are included.

## Normalised Extract
## Table of Contents
1. Installation
2. Quick Start & Program Declaration
3. Option Definitions
   - Boolean Options
   - Value Options with Default
   - Negatable and Boolean|Value Options
   - Variadic Options
   - Custom Option Processing
4. Command & Subcommand Implementation
   - Action Handlers (Sync and Async)
   - Stand-alone Executable Commands
5. Parsing Configuration & Legacy Behavior
6. Troubleshooting & Error Handling
7. Custom Help and Lifecycle Hooks

---

### 1. Installation
- Command: `npm install commander`

### 2. Quick Start & Program Declaration
- Global usage:
  ```js
  const { program } = require('commander');
  ```
- Local Command instance:
  ```js
  const { Command } = require('commander');
  const program = new Command();
  ```

### 3. Option Definitions
- Defining an option with a default value:
  ```js
  program.option('-c, --cheese <type>', 'add the specified type of cheese', 'blue');
  ```
- Example for a boolean option and option with value:
  ```js
  program
    .option('--first')
    .option('-s, --separator <char>', 'separator character');
  ```
- Negatable options:
  ```js
  program
    .option('--no-sauce', 'Remove sauce')
    .option('--cheese <flavour>', 'cheese flavour', 'mozzarella')
    .option('--no-cheese', 'plain with no cheese');
  ```
- Custom processing example:
  ```js
  function myParseInt(value, prev) { return parseInt(value, 10); }
  program.option('-i, --integer <number>', 'integer argument', myParseInt);
  ```

### 4. Command & Subcommand Implementation
- Subcommand with action handler:
  ```js
  const { Command } = require('commander');
  const program = new Command();

  program.command('split')
    .description('Split a string into substrings')
    .argument('<string>', 'string to split')
    .option('--first', 'display just the first substring')
    .option('-s, --separator <char>', 'separator character', ',')
    .action((str, options) => {
      const limit = options.first ? 1 : undefined;
      console.log(str.split(options.separator, limit));
    });
  program.parse();
  ```

- Stand-alone executable subcommand:
  ```js
  program.command('install [package-names...]', 'install one or more packages');
  ```

### 5. Parsing Configuration & Legacy Options
- Enable positional options:
  ```js
  program.enablePositionalOptions();
  ```
- Legacy support:
  ```js
  program.storeOptionsAsProperties();
  ```

### 6. Troubleshooting & Error Handling
- Custom error trigger:
  ```js
  program.error('Password must be longer than four characters');
  ```
- Override exit:
  ```js
  program.exitOverride();
  try {
    program.parse(process.argv);
  } catch (err) {
    // Handle error
  }
  ```

### 7. Custom Help & Lifecycle Hooks
- Adding extra help text:
  ```js
  program.addHelpText('after', '\nExample: $ custom-help --help');
  ```
- Lifecycle hook example:
  ```js
  program.hook('preAction', (thisCommand, actionCommand) => {
    if (thisCommand.opts().trace) {
      console.log(`About to call action handler for: ${actionCommand.name()}`);
    }
  });
  ```

## Supplementary Details
### Supplementary Implementation Details

- **Options Method:**
  - Syntax: `.option(flags: string, description: string, [defaultValue | customParser], [defaultValue])`
  - Flags format supports short and long, e.g., `-p, --port <number>`.
  - Default values are provided as the third or fourth argument if a custom parser is used.

- **Command Method:**
  - Syntax: `.command(name: string, [description?: string], [options?: { executableFile?: string, isDefault?: boolean, hidden?: boolean }])`
  - Usage for subcommands can be inline with action handlers or as external executables.

- **Action Handler:**
  - Accepts parameters for declared arguments, options, and the command instance.
  - Supports async functions when using `.parseAsync()`.

- **Parsing Configuration:**
  - Use `.enablePositionalOptions()` to restrict option parsing to before command-arguments.
  - Use `.passThroughOptions()` to forward unspecified options to child processes.
  - Use `.storeOptionsAsProperties()` for legacy behavior.

- **Error Handling:**
  - `program.error(message, { exitCode, code })` allows specifying an exit code and error code.
  - `program.exitOverride()` overrides the default process exit behavior.

- **Output Customization:**
  - `.configureOutput({ writeOut, writeErr, outputError })` customizes console output with specific ANSI formatting.

- **Lifecycle Hooks:**
  - Supported hooks: 'preAction', 'postAction', 'preSubcommand'.
  - Hook callbacks receive `(thisCommand, actionCommand)`.

- **Best Practices:**
  - Always define a version using `.version()` for CLI applications.
  - Validate input using custom parsers for robust error handling.
  - Use aliases with `.alias()` for flexibility in command naming.
  - Leverage help customization to enhance user guidance.

- **Troubleshooting Steps:**
  1. Run the CLI with `--help` to see available options.
  2. Use `program.error()` to simulate and debug error messages.
  3. For subcommand debugging, check the spawned process using node inspector with `node --inspect`.
  4. When using npm scripts, terminate npm parsing with `--`.

Detailed command examples:

- Running a split command:
  ```bash
  $ node split.js -s / --first a/b/c
  [ 'a' ]
  ```

- Using the string-util subcommand:
  ```bash
  $ node string-util.js split --separator=/ a/b/c
  [ 'a', 'b', 'c' ]
  ```

- Handling an unknown option:
  ```bash
  $ node split.js -s / --fits a/b/c
  error: unknown option '--fits'
  (Did you mean --first?)
  ```

## Reference Details
### Complete API Specifications & Code Examples

#### API Methods and Signatures

- **program.option()**
  - Signature: `option(flags: string, description: string, [fn?: (val: string, prev: any) => any], [defaultValue?: any]): Command`
  - Example: 
    ```js
    program.option('-c, --cheese <type>', 'add the specified type of cheese', 'blue');
    ```

- **program.parse()**
  - Signature: `parse(argv?: string[], parseOptions?: { from: 'node' | 'electron' | 'user' }): Command`
  - Behavior: Parses command-line arguments and populates `program.opts()` and `program.args`.

- **program.parseAsync()**
  - Signature: `parseAsync(argv?: string[], parseOptions?: { from: 'node' | 'electron' | 'user' }): Promise<Command>`
  - Use: When action handlers are asynchronous.

- **Command.command()**
  - Signature: `command(name: string, description?: string, options?: { executableFile?: string; isDefault?: boolean; hidden?: boolean }): Command`
  - Example:
    ```js
    program.command('install [package-names...]', 'install one or more packages');
    ```

- **Command.argument()**
  - Signature: `argument(name: string, description?: string, defaultValueOrFn?: any, defaultValue?: any): Command`
  - Example:
    ```js
    program.argument('<username>', 'user to login');
    ```

- **Command.action()**
  - Signature: `action(fn: (...args: any[]) => void | Promise<void>): Command`
  - Example:
    ```js
    program.action((name, options, command) => {
      console.log(`Hello, ${name}`);
    });
    ```

- **program.error()**
  - Signature: `error(message: string, options?: { exitCode?: number, code?: string }): never`
  - Usage:
    ```js
    program.error('Custom error message', { exitCode: 2, code: 'MY_ERROR' });
    ```

- **program.exitOverride()**
  - Signature: `exitOverride(callback?: (err: { exitCode: number, code: string, message: string }) => void): Command`
  - Usage:
    ```js
    program.exitOverride();
    try {
      program.parse(process.argv);
    } catch (err) {
      // Custom error handling
    }
    ```

- **program.configureOutput()**
  - Signature: `configureOutput(options: { writeOut?: (str: string) => void, writeErr?: (str: string) => void, outputError?: (str: string, write: (msg: string) => void) => void }): Command`
  - Example:
    ```js
    program.configureOutput({
      writeOut: (str) => process.stdout.write(`[OUT] ${str}`),
      writeErr: (str) => process.stderr.write(`[ERR] ${str}`),
      outputError: (str, write) => write(`\x1b[31m${str}\x1b[0m`)
    });
    ```

#### Full Code Example: string-util.js

```js
const { Command } = require('commander');
const program = new Command();

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program.command('split')
  .description('Split a string into substrings and display as an array')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });

program.parse();
```

#### Troubleshooting Procedures

1. **Unknown Option Error**
   - Command: `node split.js -s / --fits a/b/c`
   - Expected Output: 
     ```bash
     error: unknown option '--fits'
     (Did you mean --first?)
     ```

2. **Missing Required Option**
   - Define using `.requiredOption('-c, --cheese <type>', 'pizza must have cheese')`
   - Run without option: 
     ```bash
     $ node pizza.js
     error: required option '-c, --cheese <type>' not specified
     ```

3. **Async Action Handler Error Debugging**
   - Use `program.parseAsync(process.argv)` and wrap in try/catch.

4. **Overriding Exit**
   - Incorporate `program.exitOverride();` and catch errors:
     ```js
     try {
       program.parse(process.argv);
     } catch (err) {
       console.error('Custom error handling:', err.message);
     }
     ```

All methods return the Command instance for chaining. The above API specifications, full method signatures, code examples, and troubleshooting procedures provide a complete reference for immediate developer use.

## Original Source
Commander.js Documentation
https://github.com/tj/commander.js/#readme

## Digest of COMMANDER_JS

# Commander.js Documentation

**Retrieved:** 2023-10-27

## Installation

- Install via npm: `npm install commander`

## Quick Start

- Importing via CommonJS:

  ```js
  const { program } = require('commander');
  program
    .option('--first')
    .option('-s, --separator <char>')
    .argument('<string>');

  program.parse();

  const options = program.opts();
  const limit = options.first ? 1 : undefined;
  console.log(program.args[0].split(options.separator, limit));
  ```

- Example error handling for unrecognized options:

  ```bash
  $ node split.js -s / --fits a/b/c
  error: unknown option '--fits'
  (Did you mean --first?)
  ```

## Declaring Program Variable

- Global object usage for quick scripts:

  ```js
  // CommonJS (.cjs)
  const { program } = require('commander');
  ```

- Create local Command instance for larger apps:

  ```js
  const { Command } = require('commander');
  const program = new Command();
  ```

## Options

### Defining Options

- Use `.option()` to define options:

  ```js
  program
    .option('-p, --port <number>', 'server port number')
    .option('--trace', 'add extra debugging output')
    .option('--ws, --workspace <name>', 'use a custom workspace');
  ```

### Handling Parsed Options

- Access options via `program.opts()`:

  ```js
  const options = program.opts();
  console.log(options.port);
  ```

### Option Variants

- Boolean option & value option
- Default value:

  ```js
  program.option('-c, --cheese <type>', 'add the specified type of cheese', 'blue');
  ```

- Negatable options and boolean with optional value:

  ```js
  program
    .option('--no-sauce', 'Remove sauce')
    .option('--cheese <flavour>', 'cheese flavour', 'mozzarella')
    .option('--no-cheese', 'plain with no cheese');
  ```

- Option with optional argument:

  ```js
  program.option('-c, --cheese [type]', 'Add cheese with optional type');
  ```

### Custom Option Processing

- Custom parsers examples:

  ```js
  function myParseInt(value, dummyPrevious) {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new Error('Not a number.');
    }
    return parsedValue;
  }

  function increaseVerbosity(dummyValue, previous) {
    return previous + 1;
  }

  program
    .option('-i, --integer <number>', 'integer argument', myParseInt)
    .option('-v, --verbose', 'verbosity that can be increased', increaseVerbosity, 0);
  ```

## Commands

### Defining Subcommands

- With action handler:

  ```js
  const { Command } = require('commander');
  const program = new Command();

  program
    .name('string-util')
    .description('CLI to some JavaScript string utilities')
    .version('0.8.0');

  program.command('split')
    .description('Split a string into substrings and display as an array')
    .argument('<string>', 'string to split')
    .option('--first', 'display just the first substring')
    .option('-s, --separator <char>', 'separator character', ',')
    .action((str, options) => {
      const limit = options.first ? 1 : undefined;
      console.log(str.split(options.separator, limit));
    });

  program.parse();
  ```

- Stand-alone executable subcommands usage:

  ```js
  program
    .command('install [package-names...]', 'install one or more packages')
    .command('search [query]', 'search with optional query')
    .command('update', 'update installed packages', { executableFile: 'myUpdateSubCommand' })
    .command('list', 'list packages installed', { isDefault: true });
  ```

## Action Handler

- Defining an action handler with parameters:

  ```js
  program
    .argument('<name>')
    .option('-t, --title <honorific>', 'title to use before name')
    .option('-d, --debug', 'display some debugging')
    .action((name, options, command) => {
      if (options.debug) {
        console.error('Called %s with options %o', command.name(), options);
      }
      const title = options.title ? `${options.title} ` : '';
      console.log(`Thank-you ${title}${name}`);
    });
  ```

- Async action example:

  ```js
  async function run() { /* async code */ }

  async function main() {
    program
      .command('run')
      .action(run);
    await program.parseAsync(process.argv);
  }

  main();
  ```

## Parsing Configuration

- Example: Only process options before command-arguments

  ```js
  program.enablePositionalOptions();
  program.passThroughOptions();
  ```

- Legacy options as properties:

  ```js
  program.storeOptionsAsProperties();
  ```

## Troubleshooting & Error Handling

### Displaying Errors

- Use `program.error()` to trigger a custom error:

  ```js
  program.error('Password must be longer than four characters');
  ```

### Overriding Exit & Output Handling

- Override exit with:

  ```js
  program.exitOverride();
  try {
    program.parse(process.argv);
  } catch (err) {
    // Custom error processing
  }
  ```

- Customize output using `configureOutput()`:

  ```js
  function errorColor(str) {
    return `\x1b[31m${str}\x1b[0m`;
  }

  program.configureOutput({
    writeOut: (str) => process.stdout.write(`[OUT] ${str}`),
    writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
    outputError: (str, write) => write(errorColor(str))
  });
  ```

## Additional Features

- Custom help text:

  ```js
  program.addHelpText('after', '\nExample call:\n  $ custom-help --help');
  ```

- Life cycle hooks:

  ```js
  program.hook('preAction', (thisCommand, actionCommand) => {
    if (thisCommand.opts().trace) {
      console.log(`About to call action handler for subcommand: ${actionCommand.name()}`);
      console.log('arguments: %O', actionCommand.args);
      console.log('options: %o', actionCommand.opts());
    }
  });
  ```

## Attribution
- Source: Commander.js Documentation
- URL: https://github.com/tj/commander.js/#readme
- License: License: MIT
- Crawl Date: 2025-04-22T00:33:24.791Z
- Data Size: 802248 bytes
- Links Found: 5824

## Retrieved
2025-04-22
