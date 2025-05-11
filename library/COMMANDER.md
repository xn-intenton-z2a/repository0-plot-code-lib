# COMMANDER

## Crawl Summary
version(version: string, flags?: string, description?: string): Command
name(name: string): Command
description(description: string): Command
usage(usage: string): Command
argument(name: string, description?: string, defaultValue?: any, parser?: (val: string) => any): Command
option(flags: string, description?: string, defaultValue?: any, parser?: (val: string) => any): Command
requiredOption(flags: string, description?: string, defaultValue?: any, parser?: (val: string) => any): Command
action(fn: (...args: any[]) => void): Command
parse(argv?: string[], opts?: object): string[]
parseAsync(argv?: string[], opts?: object): Promise<string[]>
addHelpCommand(enabled?: boolean, name?: string, description?: string): Command
exitOverride(fn?: (err: CommanderError) => void): void
showHelpAfterError(display?: boolean | string): Command

## Normalised Extract
Table of Contents
1  Initialization
2  Versioning
3  Command Declaration
4  Option Declaration
5  Argument Declaration
6  Action Handlers
7  Parsing
8  Help System
9  Error Handling

1  Initialization
Require Commander and instantiate
const { Command } = require('commander');
const program = new Command();

2  Versioning
program.version('1.0.0', '-v, --version', 'output the version number');

3  Command Declaration
program.command('install <pkg> [options]')
  .alias('i')
  .description('install a package');

4  Option Declaration
program.option('-p, --port <number>', 'port number', '3000');
program.requiredOption('-u, --username <name>', 'user name');

5  Argument Declaration
program.argument('<path>', 'file path to process');

6  Action Handlers
program.action((options) => {
  console.log(options.port);
});

7  Parsing
program.parse(process.argv);
const args = program.args;

8  Help System
program.addHelpCommand();
program.showHelpAfterError();

9  Error Handling
program.exitOverride();
program.parseAsync()  // throws CommanderError on invalid input

## Supplementary Details
DefaultSettings
helpOption: '-h, --help'
helpDescription: 'display help for command'
helpCommandName: 'help'
helpCommandDescription: 'display help for subcommand'
usagePrefix: '[options]'

ParseOptions Interface
from: boolean  Allow boolean negation
permissive: boolean  Ignore unknown options

CommanderError Structure
Properties:
  exitCode: number
  code: string (commander.<errorIdentifier>)
  message: string

Implementation Steps:
1. Install: npm install commander
2. Require and instantiate: const program = new Command();
3. Chain configuration calls
4. Call parse or parseAsync
5. Handle errors via exitOverride callback

## Reference Details
Class: Command

Constructor(name?: string)
name: string Optional command name

Methods:
version(version: string, flags?: string, description?: string): Command
 name: version string
 flags: string (default '-V, --version')
 description: string
 returns: this

name(name: string): Command
 description: set command name
 returns: this

description(description: string): Command
 description: set summary
 returns: this

usage(usage: string): Command
 description: usage override
 returns: this

argument(name: string, description?: string, defaultValue?: any, parser?: (val: string) => any): Command
 parameters:
  name: argument syntax string
  description: string
  defaultValue: any
  parser: function
 returns: this

option(flags: string, description?: string, defaultValue?: any, parser?: (val: string) => any): Command
 parameters:
  flags: flag definitions
  description: string
  defaultValue: any
  parser: function
 returns: this

requiredOption(flags: string, description?: string, defaultValue?: any, parser?: (val: string) => any): Command
 same as option but throws if missing

addHelpCommand(enabled?: boolean, name?: string, description?: string): Command
 parameters:
  enabled: boolean
  name: string
  description: string
 returns: this

exitOverride(callback?: (err: CommanderError) => void): void
 override default exit behavior

showHelpAfterError(display?: boolean | string): Command
 show help when errors

parse(argv?: string[], opts?: {from?: boolean, permissive?: boolean}): string[]
 returns: leftover arguments

parseAsync(argv?: string[], opts?: {from?: boolean, permissive?: boolean}): Promise<string[]>

help(callback?: (helpText: string) => string): void

Examples:
Full setup example with subcommands, options, arguments, async parsing and error handling:
const { Command } = require('commander');
const program = new Command('mycli');

program
  .name('mycli')
  .version('2.0.0', '-v, --version')
  .description('An example CLI')
  .option('-f, --force', 'force operation')
  .argument('<input>', 'input file')
  .argument('[output]', 'output file', 'dist')
  .action((input, output, options) => {
    if (options.force) console.log('forcing operation');
    console.log(`processing from ${input} to ${output}`);
  });

program
  .addHelpCommand()
  .showHelpAfterError();

program.parseAsync()
  .then(() => console.log('done'))
  .catch(err => {
    if (err.code !== 'commander.helpDisplayed') console.error(err.message);
  });

Configuration Options:
  --help shortcut: '-h, --help'
  help description: 'display help'
  automatic help command: enabled by default

Best Practices:
  Chain configuration calls
  Use parseAsync for promise-based workflows
  Override exit to handle errors gracefully

Troubleshooting:
Invalid Option:
 $ node cli.js --unknown
 Error: unknown option '--unknown'
Solution:
  Define option via option() before parse

Missing Argument:
 $ node cli.js install
 Error: missing required argument 'pkg'
Solution:
  Use argument('<pkg>') or requiredOption

## Information Dense Extract
Command(name?)
.version(version,flags,description)
.name(name)
.description(desc)
.usage(str)
.argument(name,desc,default,parser)
.option(flags,desc,default,parser)
.requiredOption(flags,desc,default,parser)
.alias(alias)
.addHelpCommand(enabled?,name?,desc?)
.exitOverride(cb)
.showHelpAfterError(display?)
.parse(argv?,{from,permissive}) -> leftoverArgs
.parseAsync(argv?,{from,permissive}) -> Promise<leftoverArgs>
.help(cb)
.CommanderError { code, exitCode, message }
Defaults: helpOption '-h, --help', versionOption '-V, --version'
Examples: full instantiation, subcommands, options, args, async parse, error override

## Sanitised Extract
Table of Contents
1  Initialization
2  Versioning
3  Command Declaration
4  Option Declaration
5  Argument Declaration
6  Action Handlers
7  Parsing
8  Help System
9  Error Handling

1  Initialization
Require Commander and instantiate
const { Command } = require('commander');
const program = new Command();

2  Versioning
program.version('1.0.0', '-v, --version', 'output the version number');

3  Command Declaration
program.command('install <pkg> [options]')
  .alias('i')
  .description('install a package');

4  Option Declaration
program.option('-p, --port <number>', 'port number', '3000');
program.requiredOption('-u, --username <name>', 'user name');

5  Argument Declaration
program.argument('<path>', 'file path to process');

6  Action Handlers
program.action((options) => {
  console.log(options.port);
});

7  Parsing
program.parse(process.argv);
const args = program.args;

8  Help System
program.addHelpCommand();
program.showHelpAfterError();

9  Error Handling
program.exitOverride();
program.parseAsync()  // throws CommanderError on invalid input

## Original Source
Commander.js CLI Framework
https://github.com/tj/commander/blob/main/Readme.md

## Digest of COMMANDER

# Commander.js CLI Framework
Date Retrieved: 2023-11-29

# Installation

Install via npm:

npm install commander

# Usage

const { Command } = require('commander');
const program = new Command();

program.version('1.0.0', '-v, --version', 'output the version number');

program.command('install <pkg> [options]')
  .alias('i')
  .description('install a package')
  .option('-D, --save-dev', 'save to devDependencies')
  .action((pkg, options) => {
    console.log(`installing ${pkg} to ${options.saveDev ? 'devDependencies' : 'dependencies'}`);
  });

program.parse(process.argv);

# API Reference

## Class: Command

### Constructor

new Command([name: string])

Creates a new command instance.

### Methods

version(version: string, flags?: string, description?: string): Command
Define the --version option.

name(name: string): Command
Command name (defaults to script name).

description(description: string): Command
Set command description.

usage(usage: string): Command
Override automatic usage display.

argument(name: string, description?: string, defaultValue?: any, parser?: (val: string) => any): Command
Define a positional argument.

option(flags: string, description?: string, defaultValue?: any, parser?: (val: string) => any): Command
Add an option.

requiredOption(flags: string, description?: string, defaultValue?: any, parser?: (val: string) => any): Command
Add a required option.

action(fn: (...args: any[]) => void): Command
Register the action callback.

parse(argv?: string[], opts?: object): string[]
Parse arguments synchronously.

parseAsync(argv?: string[], opts?: object): Promise<string[]>
Parse arguments asynchronously.

help(fn?: (helpText: string) => string): void
Display or customize help output.

addHelpCommand(enabled?: boolean, name?: string, description?: string): Command
Add or remove built-in help command.

exitOverride(fn?: (err: CommanderError) => void): void
Override default process.exit behavior.

showHelpAfterError(display?: boolean | string): Command
Show help on error.

# Configuration Defaults

helpOption: '-h, --help'
helpDescription: 'display help for command'
helpCommandName: 'help'
helpCommandDescription: 'display help for subcommand'
usagePrefix: '[options]'


## Attribution
- Source: Commander.js CLI Framework
- URL: https://github.com/tj/commander/blob/main/Readme.md
- License: MIT
- Crawl Date: 2025-05-11T07:01:08.634Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-11
