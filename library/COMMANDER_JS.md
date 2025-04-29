# COMMANDER_JS

## Crawl Summary
Installation via npm; Usage of program and Command for CLI definitions; Methods include .option(), .argument(), .command(), .parse(), .opts(); Option types include boolean, value, negatable, optional; Custom processing using callbacks (e.g., myParseInt); Support for subcommands with action handlers; Variadic and required options; Auto-generated help and customizable help text; Error and exit handling with exitOverride; Lifecycle hooks using .hook() for preAction and postAction; Methods to combine local and global options with .optsWithGlobals().

## Normalised Extract
Table of Contents:
1. Installation and Setup
   - npm install commander
   - Import using require or import
2. Options Implementation
   - Method: .option(flags: string, description: string, defaultValue?: any, customParser?: function)
   - Examples include boolean option (--first), value option (-s, --separator <char>), default value specification for cheese option
3. Command Definitions
   - Using .command(name) with action handlers
   - Example: program.command('split').description('...').argument('<string>', 'string to split').option('--first', '...').option('-s, --separator <char>', '...', ',').action((str, options) => { ... })
4. Custom Option and Argument Processing
   - Use of custom parsing callbacks such as myParseInt
5. Parsing and Execution
   - Methods: .parse(), .parseAsync(), with support for process.argv and custom array inputs
6. Help and Error Handling
   - Auto-help with -h, --help; custom help with .addHelpText(), .helpOption(), .helpCommand()
   - Exit override using program.exitOverride() in try/catch
7. Advanced Features and Lifecycle Hooks
   - Variadic options (.option('-n, --number <numbers...>'))
   - Required options (.requiredOption())
   - Lifecycle hooks using .hook('preAction', callback)

Detailed Technical Information:
Installation and setup is straightforward. .option() is used to define CLI options with flags (short and long), description and optional default values. In multi-command programs, use .command() to define subcommands with separate action handlers. Custom argument processing can be added by passing a callback function that modifies the input value.

Configuration: Default values can be provided, environment variables linked using .env(), and conflicts handled via .conflicts().

Error Handling: program.exitOverride() throws a CommanderError which includes exitCode, code, and message. Custom error messages can be displayed using program.error(message, { exitCode, code }).

Usage Options: .opts() returns options; .getOptionValue() retrieves a single option; .optsWithGlobals() merges local and global options.

For executable subcommands, provide a file name and ensure the executable file has proper mode (e.g., 755) for global installation.

## Supplementary Details
Technical Specifications:
- .option(flag: string, description: string, [defaultValue: any], [customParser: Function]) returns Command instance.
- .argument(name: string, description: string, [defaultValue: any]) adds command arguments; supports notation: <required>, [optional], <...variadic>.
- .command(name: string, [description: string], [options: Object]) creates subcommands. Options can include { executableFile: string, isDefault: boolean, hidden: boolean }.
- .parse(args?: string[], options?: Object) supports parsing process.argv or custom arrays.
- Lifecycle hooks: .hook(eventName: string, callback: Function) supports events 'preAction', 'postAction', 'preSubcommand'.
- Error handling: program.exitOverride() must be used to override process.exit and catch errors. CommanderError includes: { exitCode: number, code: string, message: string }.

Implementation Steps:
1. Import Commander: const { Command } = require('commander');
2. Create a new command: const program = new Command();
3. Define options using .option() with parameter definitions.
4. Define arguments using .argument(); support variadic by appending '...'.
5. Define subcommands with .command() and attach .action() handlers.
6. Call program.parse(process.argv) to execute.
7. Handle errors with try/catch when using exitOverride().

Configuration Options and Defaults:
- Default cheese option: default is 'blue'.
- Separator option: default is ',' for string splitting.
- Verbose option: can be increased with repeated flags; using a callback (e.g., previous+1).

Best Practices:
- Create isolated Command objects for unit testing.
- Use custom parsers to ensure type safety (e.g., parseFloat, myParseInt).
- Leverage .configureOutput() to redirect stdout/stderr for enhanced logging.

Troubleshooting Procedures:
- If an unknown option error occurs, check .allowUnknownOption() usage.
- Use process.exitOverride() to capture errors in try/catch and log CommanderError details.
- Ensure subcommand files are executable with mode 755 when using stand-alone executables.

Exact Commands:
- node split.js -s / --first a/b/c (expected output: [ 'a' ])
- node string-util.js split --separator=/ a/b/c (expected output: [ 'a', 'b', 'c' ])

## Reference Details
API Specifications:
1. program.option(flag: string, description: string, [defaultValue: any], [customParser: Function])
   - Returns: Command
   - Example: program.option('-p, --port <number>', 'server port number');

2. program.requiredOption(flag: string, description: string, [defaultValue: any], [customParser: Function])
   - Throws error if not provided. Example: program.requiredOption('-c, --cheese <type>', 'pizza must have cheese');

3. program.argument(name: string, description: string, [defaultValue: any])
   - Supports: <required>, [optional], <...variadic>
   - Example: program.argument('<username>', 'user to login');

4. program.command(name: string, [description: string], [options: Object])
   - Options: { executableFile?: string, isDefault?: boolean, hidden?: boolean }
   - Example: program.command('clone <source> [destination]').description('clone a repository').action((source, destination) => { /* implementation */ });

5. program.parse(args?: string[], options?: { from?: string })
   - Handles process.argv by default. Use program.parse(process.argv) or program.parseAsync(process.argv) for async actions.

6. program.opts() returns an object containing parsed options.

7. program.hook(event: string, callback: Function)
   - Supported events: 'preAction', 'postAction', 'preSubcommand'
   - Callback receives (thisCommand, actionCommand) or (thisCommand, subcommand) as appropriate.

8. program.exitOverride([callback])
   - Overrides default exit. Callback receives a CommanderError with properties exitCode (number), code (string), message (string).

Complete Code Example:

// file: string-util.js
const { Command } = require('commander');
const program = new Command();

program.name('string-util')
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

try {
  program.parse(process.argv);
} catch (err) {
  console.error('Error encountered:', err.message);
  process.exit(err.exitCode || 1);
}

// Troubleshooting: Use node string-util.js split --separator=/ a/b/c to see expected output.

Configuration Options:
- Default for cheese option: 'blue'
- Default separator: ','
- Verbose option increases count: callback (previous + 1) with default 0

Best Practices:
- Use isolated Command instances for testing
- Validate inputs with custom parsers
- Override exit to manage errors gracefully

Detailed Troubleshooting:
- If unknown option error occurs, check option definitions and use .allowUnknownOption() if needed.
- For subcommand errors, verify executable file naming and permissions (chmod 755).
- Test using: node yourProgram.js --help to verify help text generation.

## Information Dense Extract
npm install commander; import { Command } from 'commander'; program.option('-p, --port <number>', 'server port number'); program.requiredOption('-c, --cheese <type>', 'must have cheese'); program.argument('<username>', 'user to login'); program.command('split').description('split a string').argument('<string>', 'string to split').option('--first', 'first substring').option('-s, --separator <char>', 'separator', ',').action((str, opts) => { const limit = opts.first ? 1 : undefined; console.log(str.split(opts.separator, limit)); }); program.parse(process.argv); use .exitOverride() for error management; lifecycle hooks: .hook('preAction', (cmd, sub) => {}); custom parsing with callbacks (e.g., parseInt); help via -h,--help; troubleshoot by checking unknown option errors and file permissions.

## Sanitised Extract
Table of Contents:
1. Installation and Setup
   - npm install commander
   - Import using require or import
2. Options Implementation
   - Method: .option(flags: string, description: string, defaultValue?: any, customParser?: function)
   - Examples include boolean option (--first), value option (-s, --separator <char>), default value specification for cheese option
3. Command Definitions
   - Using .command(name) with action handlers
   - Example: program.command('split').description('...').argument('<string>', 'string to split').option('--first', '...').option('-s, --separator <char>', '...', ',').action((str, options) => { ... })
4. Custom Option and Argument Processing
   - Use of custom parsing callbacks such as myParseInt
5. Parsing and Execution
   - Methods: .parse(), .parseAsync(), with support for process.argv and custom array inputs
6. Help and Error Handling
   - Auto-help with -h, --help; custom help with .addHelpText(), .helpOption(), .helpCommand()
   - Exit override using program.exitOverride() in try/catch
7. Advanced Features and Lifecycle Hooks
   - Variadic options (.option('-n, --number <numbers...>'))
   - Required options (.requiredOption())
   - Lifecycle hooks using .hook('preAction', callback)

Detailed Technical Information:
Installation and setup is straightforward. .option() is used to define CLI options with flags (short and long), description and optional default values. In multi-command programs, use .command() to define subcommands with separate action handlers. Custom argument processing can be added by passing a callback function that modifies the input value.

Configuration: Default values can be provided, environment variables linked using .env(), and conflicts handled via .conflicts().

Error Handling: program.exitOverride() throws a CommanderError which includes exitCode, code, and message. Custom error messages can be displayed using program.error(message, { exitCode, code }).

Usage Options: .opts() returns options; .getOptionValue() retrieves a single option; .optsWithGlobals() merges local and global options.

For executable subcommands, provide a file name and ensure the executable file has proper mode (e.g., 755) for global installation.

## Original Source
Commander.js Documentation
https://github.com/tj/commander.js/#readme

## Digest of COMMANDER_JS

# Commander.js Documentation

Date Retrieved: 2023-10-27

## Installation
Install using npm: npm install commander

## Quick Start Example

Use require/import to get the Command object:

CommonJS (.cjs):

const { program } = require('commander');

program
  .option('--first')
  .option('-s, --separator <char>')
  .argument('<string>');

program.parse();

const options = program.opts();
const limit = options.first ? 1 : undefined;
console.log(program.args[0].split(options.separator, limit));

## Options Handling

- Define options using .option() with short flag, long flag and value placeholders.
  Example:
  program.option('-p, --port <number>', 'server port number');

- Boolean options and default values:
  program.option('-c, --cheese <type>', 'add the specified type of cheese', 'blue');

- Negatable options:
  program.option('--no-sauce', 'Remove sauce');

- Option for both boolean and value (optional):
  program.option('-c, --cheese [type]', 'Add cheese with optional type');

## Command Definitions

- Create commands with action handler:
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

## Custom Option Processing

- Use callbacks to process option-arguments:

function myParseInt(value, previous) {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new Error('Not a number.');
  }
  return parsedValue;
}

program
  .option('-i, --integer <number>', 'integer argument', myParseInt);

## Parsing and Configuration

- Parse arguments using program.parse(process.argv) or program.parseAsync(process.argv).
- Use .opts(), .optsWithGlobals(), .getOptionValue(), etc.

## Help System

- Auto-generated help is available with -h, --help.
- Customize using .addHelpText(), .helpOption(), and .helpCommand().

## Advanced Features

- Variadic options:
  program.option('-n, --number <numbers...>', 'specify numbers');

- Required options:
  program.requiredOption('-c, --cheese <type>', 'pizza must have cheese');

- Command life cycle hooks:
  program.hook('preAction', (thisCommand, actionCommand) => {
    if (thisCommand.opts().trace) {
      console.log(`About to call action handler for subcommand: ${actionCommand.name()}`);
    }
  });

## Error Handling and Exit Overrides

- Override exit using program.exitOverride();
  try {
    program.parse(process.argv);
  } catch (err) {
    // Custom error processing can be done here
  }

## Configuration Options and Best Practices

- Use .storeOptionsAsProperties() for legacy support (not recommended for new development).
- Set environment variables with .env() and use .default() to provide defaults along with description.
- For debugging, adjust output using .configureOutput() with custom functions for writeOut, writeErr, and outputError.

Attribution: Commander.js documentation from https://github.com/tj/commander.js/#readme
Data Size: 787287 bytes

## Attribution
- Source: Commander.js Documentation
- URL: https://github.com/tj/commander.js/#readme
- License: MIT License
- Crawl Date: 2025-04-29T07:48:19.754Z
- Data Size: 787287 bytes
- Links Found: 5473

## Retrieved
2025-04-29
