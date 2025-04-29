# COMMANDER_JS

## Crawl Summary
Commander.js offers a complete API for building Node.js CLI apps with explicit methods for option parsing, subcommand handling, custom processing, error management, and help generation. Key functions include .option(), .command(), .argument(), .parse(), with support for default values, variadic, negatable and optional parameters, and lifecycle hooks. Configuration for output and exit behavior is also provided.

## Normalised Extract
Table of Contents:
1. Installation
   - npm install commander
2. Quick Start
   - Use require/import to get program or Command
   - Example: program.option('--first').option('-s, --separator <char>').argument('<string>')
3. Options
   - Defining options with .option(flags, description, [defaultValue], [customProcessor])
   - Boolean, value, negatable (--no-option), and optional argument (using square brackets)
   - Access with program.opts(); camelCase conversion for multi-word names
4. Commands and Arguments
   - Creating commands with .command(name, [description], [options])
   - Defining arguments with .argument(placeholder, description, [defaultValue])
   - Variadic arguments with '...'
5. Action Handlers
   - Attaching actions with .action(handler)
   - Parameters: command arguments, options, command object
6. Parsing and Lifecycle Hooks
   - Use .parse(args) or .parseAsync(args) for async actions
   - Lifecycle hooks: .hook(event, callback) for preAction, postAction
7. Error and Output Handling
   - program.error(message, { exitCode, code }) for errors
   - Override exit behavior with program.exitOverride()
   - Configure output with .configureOutput({ writeOut, writeErr, outputError })
8. TypeScript and Node Options
   - Usage with TypeScript via import { Command } from 'commander'
   - Node flags (--harmony) support in subcommands

Each section includes direct code examples and precise method signatures:
.option(flags: string, description: string, [defaultValue: any], [customProcessor: function]) returns Command instance.
.command(name: string, [description: string], [options: object]) returns Command instance.
.argument(name: string, description: string, [defaultValue: any]) adds command line argument specification.
.parse([args: Array<string>], [options: { from: 'node'|'electron'|'user' }]) initiates parsing.

Example Code:
  const { program } = require('commander');
  program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');
  program.parse(process.argv);
  const opts = program.opts();
  console.log(opts);

Critical Implementation Patterns:
- Always validate required options using .requiredOption()
- Use custom processors to enforce type checking (e.g. myParseInt for integers)
- Combine positional and named options by enabling positional options if needed
- Deploy lifecycle hooks for logging or pre-processing before actions are executed.

## Supplementary Details
Technical Specifications and Implementation Details:
- .option(flag: string, description: string, [defaultValue], [customProcessor]):
    Flags must include short and long forms, value placeholder if applicable.
    Example: '-c, --cheese <type>' with default 'blue'.
- .requiredOption(flag, description, [defaultValue]) enforces presence of a value.
- Variadic option: append '...' to placeholder (e.g., '<numbers...>') leading to array value.
- .command(name, description?, [options]) supports stand-alone executables and inline action handlers.
- .argument(name, description, [defaultValue]) enforces argument requirements; variadic if '...' is appended.
- Lifecycle hooks: .hook('preAction', (thisCommand, actionCommand) => { ... }) to inject behavior before command action.
- Parsing: .parse(args?) and .parseAsync(args?) process supplied arguments; use { from: 'user' } for user-only arrays.
- Error Handling: program.error(message, { exitCode, code }) and program.exitOverride() to handle error flow without process exit.
- Output Handling: .configureOutput with keys: writeOut (string) function, writeErr (string) function, outputError to format error messages (e.g. using ANSI codes for color).

Configuration Options:
- Default Values: provided as third parameter in .option() and .argument() methods.
- Environment Variables: Use .env('PORT') on an Option object.
- Choice Validation: Using .choices([ ... ]) on an Option instance.

Implementation Steps:
1. Import Commander and declare program instance.
2. Define options and command arguments using .option() and .argument().
3. Add custom processing functions if type conversion is needed.
4. Attach action handlers to commands via .action().
5. Parse process.argv with .parse() or .parseAsync() depending on async requirements.
6. Use lifecycle hooks to monitor command execution.
7. Override default error and output behavior if necessary.

Troubleshooting Procedures:
- Unknown Options: Error message 'unknown option' is thrown; verify the flag syntax.
- Missing Required Options: Error 'required option not specified' triggers; use .requiredOption to enforce presence.
- Invalid Argument Processing: Custom processors like myParseInt must throw an error if conversion fails; check error output.
- If using stand-alone executable subcommands, ensure file permissions (e.g. mode 755) and correct interpreter directives (#!/usr/bin/env node --harmony).
- For debugging subcommands: in VSCode set "autoAttachChildProcesses": true and use node --inspect.

Exact Command-Line Examples:
  $ node split.js -s / --fits a/b/c
  error: unknown option '--fits'
  $ node string-util.js split --separator=/ a/b/c
  [ 'a', 'b', 'c' ]

SDK Method Signatures:
  program.option(flag: string, description: string, [defaultValue: any], [customProcessor: function]) => Command
  program.requiredOption(flag: string, description: string, [defaultValue: any]) => Command
  program.argument(name: string, description: string, [defaultValue: any]) => Command
  program.command(name: string, [description: string], [options: object]) => Command
  program.parse(args?: Array<string>, options?: { from: 'node'|'electron'|'user' }) => Command
  program.parseAsync(args?: Array<string>, options?: { from: 'node'|'electron'|'user' }) => Promise<Command>


## Reference Details
API Specifications:
1. program.option(flag: string, description: string, [defaultValue: any], [customProcessor: (value: string, previous: any) => any]) -> Command
   - flag: e.g. '-c, --cheese <type>'
   - description: text for help output
   - defaultValue: default value if not provided
   - customProcessor: function to transform the string input

2. program.requiredOption(flag: string, description: string, [defaultValue: any]) -> Command
   - Throws error if value is not provided

3. program.argument(name: string, description: string, [defaultValue: any]) -> Command
   - name: e.g. '<username>' or '[password]'

4. program.command(name: string, description?: string, options?: { executableFile?: string, isDefault?: boolean, hidden?: boolean }) -> Command
   - Supports stand-alone executable subcommands
   - description: used as help text
   - options: custom properties for subcommand behavior

5. program.parse(args?: string[], options?: { from: 'node' | 'electron' | 'user' }) -> Command
   - Processes command-line arguments, returns the Command instance

6. program.parseAsync(args?: string[], options?: { from: 'node' | 'electron' | 'user' }) -> Promise<Command>
   - Supports asynchronous action handlers

Example Code with Comments:
----------------------------------
// Import Commander and set up program
const { Command } = require('commander');
const program = new Command();

// Define options with default values and custom processing
program
  .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue')
  .option('-d, --debug', 'output extra debugging')
  .option('-i, --integer <number>', 'integer argument', (value, previous) => {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      throw new Error('Invalid number provided');
    }
    return parsed;
  });

// Define a required option
program.requiredOption('-r, --required <value>', 'this option is required');

// Define a command with arguments and an action handler
program.command('clone <source> [destination]')
  .description('clone a repository into a directory')
  .action((source, destination) => {
    console.log(`Cloning from ${source} to ${destination || 'default directory'}`);
  });

// Add a lifecycle hook to log before action execution
program.hook('preAction', (thisCommand, actionCommand) => {
  if (thisCommand.opts().debug) {
    console.log(`Executing command: ${actionCommand.name()}`);
  }
});

// Parse the arguments; process.exit is overridden if needed
try {
  program.parse(process.argv);
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
----------------------------------

Configuration Options:
- Custom Output: program.configureOutput({ writeOut: fn, writeErr: fn, outputError: fn })
- Exit Override: program.exitOverride();

Troubleshooting Commands:
- To test option parsing: node yourScript.js -c cheddar -r test
- For unknown option error, check flag names in .option()
- For debugging subcommands in VSCode, ensure launch.json contains: "autoAttachChildProcesses": true


## Information Dense Extract
npm install commander; global require: { program } or new Command(); methods: .option('-flag, --long <value>', 'desc', default, processor), .requiredOption(), .command('name <args>', 'desc', options), .argument('<arg>', 'desc', default), .parse(args) and .parseAsync(args); supports boolean, negatable, variadic options; lifecycle hooks: .hook('preAction', callback); error handling: program.error(msg, { exitCode, code }); output customization: .configureOutput({ writeOut, writeErr, outputError }); examples include cloning, pizza options, custom processors; API signatures provided; debugging via node --inspect and VSCode autoAttachChildProcesses; configuration settings include environment variable binding and explicit default values.

## Sanitised Extract
Table of Contents:
1. Installation
   - npm install commander
2. Quick Start
   - Use require/import to get program or Command
   - Example: program.option('--first').option('-s, --separator <char>').argument('<string>')
3. Options
   - Defining options with .option(flags, description, [defaultValue], [customProcessor])
   - Boolean, value, negatable (--no-option), and optional argument (using square brackets)
   - Access with program.opts(); camelCase conversion for multi-word names
4. Commands and Arguments
   - Creating commands with .command(name, [description], [options])
   - Defining arguments with .argument(placeholder, description, [defaultValue])
   - Variadic arguments with '...'
5. Action Handlers
   - Attaching actions with .action(handler)
   - Parameters: command arguments, options, command object
6. Parsing and Lifecycle Hooks
   - Use .parse(args) or .parseAsync(args) for async actions
   - Lifecycle hooks: .hook(event, callback) for preAction, postAction
7. Error and Output Handling
   - program.error(message, { exitCode, code }) for errors
   - Override exit behavior with program.exitOverride()
   - Configure output with .configureOutput({ writeOut, writeErr, outputError })
8. TypeScript and Node Options
   - Usage with TypeScript via import { Command } from 'commander'
   - Node flags (--harmony) support in subcommands

Each section includes direct code examples and precise method signatures:
.option(flags: string, description: string, [defaultValue: any], [customProcessor: function]) returns Command instance.
.command(name: string, [description: string], [options: object]) returns Command instance.
.argument(name: string, description: string, [defaultValue: any]) adds command line argument specification.
.parse([args: Array<string>], [options: { from: 'node'|'electron'|'user' }]) initiates parsing.

Example Code:
  const { program } = require('commander');
  program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');
  program.parse(process.argv);
  const opts = program.opts();
  console.log(opts);

Critical Implementation Patterns:
- Always validate required options using .requiredOption()
- Use custom processors to enforce type checking (e.g. myParseInt for integers)
- Combine positional and named options by enabling positional options if needed
- Deploy lifecycle hooks for logging or pre-processing before actions are executed.

## Original Source
Commander.js Documentation
https://github.com/tj/commander.js/#readme

## Digest of COMMANDER_JS

# Commander.js Documentation

# Installation

npm install commander

# Quick Start

Use the Commander.js API to build Node.js command-line interfaces. Example code:

  const { program } = require('commander');
  program
    .option('--first')
    .option('-s, --separator <char>')
    .argument('<string>');
  program.parse();
  const options = program.opts();
  const limit = options.first ? 1 : undefined;
  console.log(program.args[0].split(options.separator, limit));

# Declaring Program Variable

For small scripts, use the global object:

  const { program } = require('commander');

For larger apps, instantiate a new Command:

  const { Command } = require('commander');
  const program = new Command();

# Options

Define options using .option() with short and long flags. Several examples include:

  program
    .option('-p, --port <number>', 'server port number')
    .option('--trace', 'add extra debugging output')
    .option('--ws, --workspace <name>', 'use a custom workspace');

Access options using program.opts(); multi-word options are camel-cased (e.g. templateEngine).

An option can be given in forms such as:
  serve -p 80
  serve -p80
  serve --port 80
  serve --port=80

# Common Option Types

- Boolean options: "--first" returns true if specified.
- Value options: e.g. "--separator <char>" expects a value.

Example usage for a pizza ordering CLI:

  program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');

# Default Option Value

Specify a default value directly:

  program
    .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue');

# Negatable and Optional Options

- Negatable boolean using --no-sauce
- Boolean or value option: Use square brackets to allow an optional value e.g. "--cheese [type]".

Example:

  program
    .option('--no-sauce', 'Remove sauce')
    .option('--cheese <flavour>', 'cheese flavour', 'mozzarella')
    .option('--no-cheese', 'plain with no cheese')
    .parse();

# Required and Variadic Options

- Use .requiredOption() for required options.
- Append ... to the value placeholder for variadic options.

Example:

  program
    .option('-n, --number <numbers...>', 'specify numbers')
    .option('-l, --letter [letters...]', 'specify letters')
    .parse();

# Version Option

Specify version with:

  program.version('0.0.1');

or customize flags:

  program.version('0.0.1', '-v, --vers', 'output the current version');

# Custom Option Processing

Provide a callback function to process option arguments. Example:

  function myParseInt(value, dummyPrevious) {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new commander.InvalidArgumentError('Not a number.');
    }
    return parsedValue;
  }

  program
    .option('-i, --integer <number>', 'integer argument', myParseInt);

# Commands and Subcommands

Create subcommands using .command(). Examples:

  program.command('clone <source> [destination]')
    .description('clone a repository into a newly created directory')
    .action((source, destination) => {
      console.log('clone command called');
    });

For stand-alone executable subcommands, pass a description as the second parameter:

  program.command('start <service>', 'start named service');

# Command Arguments

Define command arguments using .argument(). Example:

  program
    .argument('<username>', 'user to login')
    .argument('[password]', 'password for user, if required', 'no password given')
    .action((username, password) => {
      console.log('username:', username);
      console.log('password:', password);
    });

# Action Handlers

The action handler receives parameters for each argument and a final options object. Example:

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

# Parsing and Execution

- Use .parse() for synchronous parsing or .parseAsync() for async action handlers.
- Access remaining arguments via program.args.

# Configuration and Hooks

Customize parsing by enabling positional options or pass through options:

  program.enablePositionalOptions();
  program.passThroughOptions();

Add lifecycle hooks:

  program.hook('preAction', (thisCommand, actionCommand) => {
    if (thisCommand.opts().trace) {
      console.log(`About to call action handler for subcommand: ${actionCommand.name()}`);
      console.log('arguments: %O', actionCommand.args);
      console.log('options: %o', actionCommand.opts());
    }
  });

# Automated Help and Customization

Automatic help generation is built-in. Customize using:

  program.addHelpText('after', '\nExample call:\n  $ custom-help --help');

Override help option, help command, and customize usage text with .helpOption(), .helpCommand(), .usage(), .description() and .summary().

# Error Handling

Use program.error() to display errors. Override exit behavior with program.exitOverride(). Example:

  try {
    program.parse(process.argv);
  } catch (err) {
    // custom error processing
  }

# Output Configuration

Configure output handling with .configureOutput():

  program.configureOutput({
    writeOut: (str) => process.stdout.write(`[OUT] ${str}`),
    writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
    outputError: (str, write) => write(`\x1b[31m${str}\x1b[0m`)
  });

# TypeScript and Other Integrations

For TypeScript, the usage is similar with strong typing provided by extra-typings or direct import. Example:

  import { Command } from 'commander';
  const program = new Command();

# Additional Features

Support for custom events, legacy options (via .storeOptionsAsProperties()), and node-specific options is available.

*Content retrieved on 2023-10-05. Data Size: 805381 bytes. Attribution: tj/commander.js repository.

## Attribution
- Source: Commander.js Documentation
- URL: https://github.com/tj/commander.js/#readme
- License: MIT License
- Crawl Date: 2025-04-29T05:49:10.055Z
- Data Size: 805381 bytes
- Links Found: 5806

## Retrieved
2025-04-29
