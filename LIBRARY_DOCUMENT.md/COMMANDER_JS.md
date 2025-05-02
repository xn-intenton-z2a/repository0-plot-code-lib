# COMMANDER_JS

## Crawl Summary
Commander.js provides a complete solution for building CLI applications in node.js with command, option, and argument parsing capabilities. It supports multiple option types (boolean, value, negatable, variadic), custom processing callbacks for both options and arguments, action handlers with synchronous or asynchronous execution, comprehensive help and error messages, life cycle hooks, and standalone subcommand execution. API methods include .option(), .command(), .argument(), .parse(), .hook(), .error(), and configuration options for defaults, environment variables, and conflicts. Detailed examples include usage in CommonJS, ECMAScript, and TypeScript.

## Normalised Extract
Table of Contents:
  1. Installation and Initialization
  2. Option Types and Custom Processing
  3. Command and Argument Definitions
  4. Action Handlers and Life Cycle Hooks
  5. Help System and Error Handling
  6. Parsing Configuration and Debugging

1. Installation and Initialization:
   - npm install commander
   - Create CLI using: require('commander') for CommonJS; import { Command } from 'commander' for ECMAScript/TypeScript
   - Instantiate with const program = new Command();

2. Option Types and Custom Processing:
   - Define options using: program.option('-p, --port <number>', 'server port number')
   - Boolean option: program.option('--first')
   - Option with default: program.option('-c, --cheese <type>', 'add cheese', 'blue')
   - Custom processing: program.option('-i, --integer <number>', 'integer argument', myParseInt)
     * myParseInt(value, previous): returns integer or throws InvalidArgumentError
   - Aggregate options: .opts(), .optsWithGlobals(), .getOptionValue(), .setOptionValue()

3. Command and Argument Definitions:
   - Create commands: program.command('clone <source> [destination]')
   - Define arguments using .argument('<argName>', 'description') with support for variadic arguments: .argument('<dirs...>')
   - Alias support via .alias('altName')

4. Action Handlers and Life Cycle Hooks:
   - Action handler receives parameters: (arg1, arg2, options, command)
   - Sample synchronous action:
       program.command('serve')
         .argument('<script>')
         .option('-p, --port <number>', 'port number', 80)
         .action(function() {
           console.error('Run script', this.args[0], 'on port', this.opts().port);
         });
   - Life cycle hooks: program.hook('preAction', (thisCommand, actionCommand) => { ... });

5. Help System and Error Handling:
   - Built-in help: triggered with -h or --help
   - Custom help text: program.addHelpText('after', 'Extra information')
   - Display error: program.error('Error message', { exitCode: 2, code: 'custom.error' })
   - Override exit: program.exitOverride()

6. Parsing Configuration and Debugging:
   - Use .parse() or .parseAsync() for argument parsing
   - Options can be positional or pass-through: .enablePositionalOptions(), .passThroughOptions()
   - Debugging stand-alone executable subcommands: adjust inspector port or use --inspect with incremented port
   - Legacy mode: program.storeOptionsAsProperties() for backward compatibility


## Supplementary Details
Technical Specifications:
- program.option(flags: string, description: string, [defaultValueOrFn]): Defines an option. For example:
  '-p, --port <number>' sets a mandatory numeric option. Default signature returns value as string unless processed.

- program.argument(name: string, description: string, [defaultValueOrFn]): Defines command argument. Variadic arguments appended with '...'.

- program.command(nameAndArgs: string, [description: string], [options]): Creates a subcommand with optional description, alias, hidden, and isDefault properties.

- Action Handler Function Signature:
  function(arg1: any, arg2: any, options: object, command: Command): void | Promise<void>

- Custom Option Processing Callback Signature:
  function(value: string, previous: any): any
  Example: myParseInt(value, previous) returns an integer or throws error.

- Help and Error Methods:
  .helpOption(flags: string, description: string): Configures help.
  .error(message: string, { exitCode: number, code: string }): Throws a CommanderError.

- Parsing Methods:
  .parse(argv?: string[]), .parseAsync(argv?: string[]): Parses command-line arguments.

- Hook Registration:
  program.hook(eventName: string, callback: (thisCommand: Command, actionCommand: Command) => void | Promise<void>)

- Configuration Options:
  Default option values, environment variable binding using .env(), conflicts using .conflicts(), choices using .choices(), and presets using .preset().

- Debugging Configuration:
  For stand-alone subcommands, ensure executable permissions (755) and proper inspector port setup for node --inspect.


## Reference Details
API Specifications:

1. Command Options API:
   - program.option(flags: string, description: string, [defaultValue | customProcessingFn], [defaultDescription?])
     Returns: Command
     Example: program.option('-c, --cheese <type>', 'specify cheese type', 'blue')

2. Command Arguments API:
   - program.argument(name: string, description: string, [defaultValue | customProcessingFn], [defaultDescription?])
     Returns: Command
     Example: program.argument('<username>', 'username for login')

3. Command Creation API:
   - program.command(name: string, [description?: string], [options?])
     Options include: { executableFile?: string, isDefault?: boolean, hidden?: boolean }
     Returns: Command
     Example: program.command('clone <source> [destination]')
              .description('clone a repository into a new directory')
              .action((source: string, destination?: string) => { ... });

4. Parsing Methods:
   - program.parse(argv?: string[]): void
   - program.parseAsync(argv?: string[]): Promise<void>

5. Hooks:
   - program.hook(event: 'preAction' | 'postAction' | 'preSubcommand', callback: (thisCommand: Command, actionCommand: Command) => void | Promise<void>): void

6. Error Handling:
   - program.error(message: string, options?: { exitCode?: number, code?: string }): never
   - program.exitOverride([callback?: (err: any) => void]): Command

7. Help Methods:
   - program.helpOption(flags?: string, description?: string): Command
   - program.addHelpText(position: 'before' | 'after' | 'beforeAll' | 'afterAll', text: string | (() => string)): Command
   - program.helpCommand(name?: string, description?: string): Command
   - program.outputHelp([writeCallback?: (str: string) => void]): void

Code Example with Comments:
------------------------------------------------
// Example: CLI for splitting a string
const { program } = require('commander');

// Define global options
program
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .argument('<string>', 'string to split');

// Parse command-line arguments
program.parse(process.argv);

// Retrieve options and arguments
const options = program.opts();
const inputString = program.args[0];
const limit = options.first ? 1 : undefined;
console.log(inputString.split(options.separator, limit));
------------------------------------------------

Troubleshooting Procedures:
- Unknown Option Error:
   Command: node app.js --unknown
   Expected Output: error: unknown option '--unknown' (Did you mean --first?)

- Missing Required Option:
   Declare required option using .requiredOption('-c, --cheese <type>', 'pizza must have cheese');
   If missing, error message: error: required option '-c, --cheese <type>' not specified

- Debugging Subcommands:
   For stand-alone executables, if debugging, run with node --inspect and ensure child process inspector port increments by 1.

- Environment Variable Override:
   Use .option('-p, --port <number>').env('PORT') to bind option value to environment variable PORT.

- Custom Processing Error:
   In custom processors, throw new commander.InvalidArgumentError('Not a number.') for invalid input.

Configuration Options and Effects:
- defaultValue: sets fallback value if option is not provided.
- choices: restricts allowed values (e.g., .choices(['small', 'medium', 'large'])).
- conflicts: prevent usage together (e.g., .conflicts('port')).
- preset: predefined value if option is used without argument.


## Information Dense Extract
npm install commander; require/import Command from 'commander'; instantiate with new Command(); define options with .option(flags, description, [default or fn]); define arguments with .argument(name, description, [default]); create commands with .command(name, [desc], [options]); use .alias() for alternate names; parse with .parse()/.parseAsync(); use .opts() for option retrieval; set custom processors for options and arguments; override error handling with .error() and .exitOverride(); register hooks via .hook(event, callback); support help customization with .helpOption() and .addHelpText(); ensure executable subcommands use proper permissions (755) and correct node inspector settings; detailed API specs include method signatures for .option, .command, .argument, .parse, .hook, and error methods with parameter types and return types; troubleshooting commands include handling unknown option errors, missing required options, and debugging stand-alone subcommands.

## Sanitised Extract
Table of Contents:
  1. Installation and Initialization
  2. Option Types and Custom Processing
  3. Command and Argument Definitions
  4. Action Handlers and Life Cycle Hooks
  5. Help System and Error Handling
  6. Parsing Configuration and Debugging

1. Installation and Initialization:
   - npm install commander
   - Create CLI using: require('commander') for CommonJS; import { Command } from 'commander' for ECMAScript/TypeScript
   - Instantiate with const program = new Command();

2. Option Types and Custom Processing:
   - Define options using: program.option('-p, --port <number>', 'server port number')
   - Boolean option: program.option('--first')
   - Option with default: program.option('-c, --cheese <type>', 'add cheese', 'blue')
   - Custom processing: program.option('-i, --integer <number>', 'integer argument', myParseInt)
     * myParseInt(value, previous): returns integer or throws InvalidArgumentError
   - Aggregate options: .opts(), .optsWithGlobals(), .getOptionValue(), .setOptionValue()

3. Command and Argument Definitions:
   - Create commands: program.command('clone <source> [destination]')
   - Define arguments using .argument('<argName>', 'description') with support for variadic arguments: .argument('<dirs...>')
   - Alias support via .alias('altName')

4. Action Handlers and Life Cycle Hooks:
   - Action handler receives parameters: (arg1, arg2, options, command)
   - Sample synchronous action:
       program.command('serve')
         .argument('<script>')
         .option('-p, --port <number>', 'port number', 80)
         .action(function() {
           console.error('Run script', this.args[0], 'on port', this.opts().port);
         });
   - Life cycle hooks: program.hook('preAction', (thisCommand, actionCommand) => { ... });

5. Help System and Error Handling:
   - Built-in help: triggered with -h or --help
   - Custom help text: program.addHelpText('after', 'Extra information')
   - Display error: program.error('Error message', { exitCode: 2, code: 'custom.error' })
   - Override exit: program.exitOverride()

6. Parsing Configuration and Debugging:
   - Use .parse() or .parseAsync() for argument parsing
   - Options can be positional or pass-through: .enablePositionalOptions(), .passThroughOptions()
   - Debugging stand-alone executable subcommands: adjust inspector port or use --inspect with incremented port
   - Legacy mode: program.storeOptionsAsProperties() for backward compatibility

## Original Source
Commander.js Documentation
https://github.com/tj/commander.js

## Digest of COMMANDER_JS

# Commander.js

Retrieved Date: 2023-10-14

## Installation

Command: npm install commander

## Quick Start

Create a CLI by requiring the module:

CommonJS:
  const { program } = require('commander');

ECMAScript:
  import { Command } from 'commander';
  const program = new Command();

TypeScript:
  import { Command } from 'commander';
  const program = new Command();

## Declaring Program Variable

There are two patterns:
1. Using the global exported object: program
2. Creating a new instance with new Command() for larger apps and testing.

## Options

Options are defined using the .option() method. They support:
- Boolean options (e.g., .option('--first'))
- Options with attached value arguments (e.g., .option('-s, --separator <char>'))
- Default values: .option('-c, --cheese <type>', 'add cheese', 'blue')

Multiple flags can be given using comma delimiters, short flags combined, and option arguments provided either inline or separately.

Example:
  program.option('-p, --port <number>', 'server port number');

Methods:
  - opts() returns parsed options.
  - optsWithGlobals() returns merged values from local and global options.

## Custom Option Processing

Options can include a custom processing callback:

Example:
  program.option('-i, --integer <number>', 'integer argument', myParseInt)

Functions such as myParseInt should parse and validate the value, throwing an InvalidArgumentError on failure.

## Commands

Commands are defined via .command() or .addCommand().

Examples:
  program.command('clone <source> [destination]')
    .description('clone a repository')
    .action((source, destination) => {
       // Implementation
    });

Use .alias() to add alternate names. Use the description parameter in .command() for stand-alone executable subcommands.

## Action Handler & Custom Argument Processing

The action handler receives parameters corresponding to command arguments plus the options and command object. It can be synchronous or asynchronous (using .parseAsync).

Example:
  program.command('serve')
      .argument('<script>')
      .option('-p, --port <number>', 'port number', 80)
      .action(function() {
         // 'this' is bound to the command
         console.error('Run script', this.args[0], 'on port', this.opts().port);
      });

Custom argument processing functions can be provided to .argument() as well.

## Help System & Error Handling

Built-in help automatically displays usage details. It can be customized by:
  - .helpOption(flags, description)
  - .addHelpText(position, text)

Error handling: Use program.error() to display custom error messages. You can override the default exit using .exitOverride().

## Parsing Configuration

Options and arguments are processed with .parse() or .parseAsync(), supporting modes such as positional options and pass-through options. Use:
  - .allowUnknownOption()
  - .allowExcessArguments()

## Life Cycle Hooks

Hooks such as 'preAction' and 'postAction' allow code to run before and after command execution. Example:
  program.hook('preAction', (thisCommand, actionCommand) => { ... });

## Debugging & Stand-alone Executable Subcommands

Subcommands can be implemented as separate executables by adding a description in .command() and specifying executableFile or executableDir. Debugging may require special node inspector settings.

## Legacy Options & TypeScript Support

Legacy behavior can be restored via .storeOptionsAsProperties(). Extra typings support is available through the @commander-js/extra-typings package.


## Attribution
- Source: Commander.js Documentation
- URL: https://github.com/tj/commander.js
- License: License: MIT
- Crawl Date: 2025-05-02T03:53:34.256Z
- Data Size: 657435 bytes
- Links Found: 4792

## Retrieved
2025-05-02
