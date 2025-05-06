library/COMMANDER_JS.md
# library/COMMANDER_JS.md
# COMMANDER_JS

## Crawl Summary
Option method flags, description, default, parser. RequiredOption, parse/parseAsync signatures. Argument(name, desc, default), variadic. Command(name,args,desc,config) returns new or this. addCommand(cmd,config). alias. Hooks events and parsers. Help/version methods with flags and descriptions. Parsing config: enablePositionalOptions, passThroughOptions, allowUnknownOption, allowExcessArguments. Output customization. Option class methods: hideHelp, default, choices, env, preset, argParser, conflicts, implies, makeOptionMandatory. Factory createCommand.

## Normalised Extract
Table of Contents:
1 Options Definition
2 Required Options
3 Arguments
4 Commands & Subcommands
5 Custom Parsers & Processing
6 Lifecycle Hooks
7 Help & Version Handling
8 Parsing Configuration
9 Output & Error Handling
10 Supplementary Option Class

1 Options Definition
.option(flags: string, description: string, defaultValue?: any, parser?: Function): Command
.flag patterns: '-p, --port <number>' | '--trace' | '--ws, --workspace <name>'
opts = program.opts()

2 Required Options
.requiredOption(flags: string, description: string, defaultValue?: any): Command
Throws 'required option not specified' on parse()

3 Arguments
.argument(name: string, description?: string, defaultValue?: any): Command
Variadic when name ends with '...'
program.args array holds unparsed args

4 Commands & Subcommands
.command(nameAndArgs: string, description?: string, config?: object)
Returns new Command when no description; returns this when description present
.addCommand(cmd: Command, config?: object)
.alias(alias: string)
.parse(argv?: string[], opts?: object)
.parseAsync(argv?, opts?)

5 Custom Parsers & Processing
Define parse functions: parseFloat, parseInt, custom error via InvalidArgumentError
.option('-i, --integer <n>', 'integer', myParseInt)
.argument('<first>', 'int', myParseInt, 0)

6 Lifecycle Hooks
.hook(event: 'preAction'|'postAction'|'preSubcommand', listener: Function)
listener(thisCommand, actionCommand)

7 Help & Version Handling
.version(version: string, flags?: string, description?: string)
.helpOption(flags: string, description: string)
.helpCommand(name?: string, description?: string)
.addHelpText(position: 'before'|'after', textOrFn)
.showHelpAfterError(msg?: string)
.showSuggestionAfterError(enable: boolean)
.outputHelp(opts?: object)
.helpInformation(): string

8 Parsing Configuration
.enablePositionalOptions()
.passThroughOptions()
.allowUnknownOption(allow?: boolean)
.allowExcessArguments(allow?: boolean)

9 Output & Error Handling
.exitOverride()
.configureOutput({ writeOut: Function, writeErr: Function, outputError: Function })
.error(message: string, options?: { exitCode?: number, code?: string })

10 Supplementary Option Class
new Option(flags: string, description: string)
.hideHelp(): Option
.default(val: any, description?: string): Option
.choices(array: any[]): Option
.env(varName: string): Option
.preset(val: any): Option
.argParser(fn: Function): Option
.conflicts(name: string): Option
.implies(map: object): Option
.makeOptionMandatory(): Option

## Supplementary Details
Option default values: third parameter or .default() with [valueDescription].
Negatable boolean: flags with --no-prefix.
Optional value: square brackets in name, non-greedy, ignore dash-starting args.
Variadic options: '<name...>' collects until dash-start.
Environment default via .env('VAR').
Choices enforcement via .choices(['small','medium','large']).
. conflicts() disables option combinations.
. implies() sets other options when used.
Use .storeOptionsAsProperties() for legacy property access.
TypeScript: import from '@commander-js/extra-typings'.
Standalone executables: .command('name', 'desc') looks for entry-dir/name-<sub>.js, use .executableDir() to override.
Debug child with node --inspect, inspector port+1.

npm run-script uses '--' to separate npm and CLI args.

Life cycle hook order: preSubcommand, preAction, action, postAction.

Help positions: beforeAll, before, after, afterAll. Text or function context { error, command }.

.parse(['--port','80'],{from:'user'}) treats array as user args.

.error() default throws CommanderError. .exitOverride() to catch.

.configureOutput writeOut/writeErr prefix logs, outputError transforms error colors.


## Reference Details
Command Class Methods:
option(flags: string, description: string, defaultValue?: any, parser?: (val:string,prev:any)=>any): Command
requiredOption(flags: string, description: string, defaultValue?: any): Command
argument(name: string, description?: string, defaultValue?: any): Command
command(nameAndArgs: string, description?: string, config?: {executableFile?:string,isDefault?:boolean,hidden?:boolean}): Command|this
addCommand(cmd: Command, config?: {isDefault?:boolean,hidden?:boolean}): this
alias(alias: string): Command
version(version: string, flags?: string, description?: string): Command
helpOption(flags: string, description: string): Command
helpCommand(name?: string, description?: string): Command
addHelpText(position: 'beforeAll'|'before'|'after'|'afterAll', textOrFn: string|Function): Command
showHelpAfterError(msg?: string|boolean): Command
showSuggestionAfterError(enable: boolean): Command
configureOutput(opts: { writeOut(str:string):void, writeErr(str:string):void, outputError(str:string, write:(s:string)=>void):void }): Command
parse(argv?: string[], opts?: {from:'node'|'electron'|'user'}): Command
parseAsync(argv?: string[], opts?: object): Promise<Command>
exitOverride(callback?: (err: CommanderError)=>void): Command
error(message: string, options?: {exitCode?:number,code?:string}): never

Option Class Methods:
hideHelp(): Option
default(value:any, description?:string): Option
choices(values:any[]): Option
env(variable:string): Option
preset(value:any): Option
argParser(fn:(val:string,prev:any)=>any): Option
conflicts(optionName:string): Option
implies(map: Record<string,any>): Option
makeOptionMandatory(): Option

Factory:
createCommand(): Command

Usage Examples:
```js
const { Command, Option, createCommand } = require('commander')
const program = createCommand()
program.name('app').usage('[options] <file>')
program.option('-p, --port <n>','port number', parseInt, 3000)
program.addOption(new Option('-c, --color <type>').choices(['red','green','blue']))
program.requiredOption('--input <path>','input file path')
program.command('serve <script>').alias('s').action((script, opts) => console.log(script, opts))
program.parse(process.argv)
``` 

Troubleshooting:
- Unknown option: run with --help or enable .showHelpAfterError()
- Missing required: shows "error: required option '<flag>' not specified"
- Invalid choice: "error: option '<flag>' argument '<value>' is invalid. Allowed choices are ..."
- Capturing errors: program.exitOverride(); try{ program.parse() } catch(err){ if(err.code==='commander.executeSubCommandAsync') ... }
- npm run-script: use `npm run start -- --port 8080`
- Debug subcommands: set "autoAttachChildProcesses": true in VSCode launch.json


## Information Dense Extract
Option: flags string, desc string, default any, parser fn -> Command; requiredOption same; argument(name,desc?,default?) -> Command; variadic by '...'; command(nameAndArgs,desc?,{executableFile?,isDefault?,hidden?}) -> new Command or this; addCommand(cmd,{isDefault?,hidden?}); alias(alias) -> Command; version(ver,flags?,desc?); helpOption(flags,desc); helpCommand(name?,desc?); addHelpText(pos,textOrFn); showHelpAfterError(msg?); showSuggestionAfterError(bool); configureOutput({writeOut,writeErr,outputError}); parse(argv?,{from:'node'|'electron'|'user'}); parseAsync; exitOverride(cb?); error(msg,{exitCode?,code?});
Option class: new Option(flags,desc): .hideHelp(),.default(val,desc?),.choices(arr),.env(var),.preset(val),.argParser(fn),.conflicts(name),.implies(map),.makeOptionMandatory();
Parsing config: enablePositionalOptions(),passThroughOptions(),allowUnknownOption(bool),allowExcessArguments(bool);
Examples: program.option('-p,--port <n>','port',parseInt,3000).requiredOption('--input <p>','in file') .addOption(new Option('-c,--color <t>').choices(['r','g','b'])).hook('preAction',(p,a)=>{}).parse(process.argv);
Best practices: define all flags and args at top, group options via .addOption, enforce defaults and choices, use exitOverride for custom error flows, configureOutput for UI customization. Debug: use --inspect and autoAttachChildProcesses.


## Sanitised Extract
Table of Contents:
1 Options Definition
2 Required Options
3 Arguments
4 Commands & Subcommands
5 Custom Parsers & Processing
6 Lifecycle Hooks
7 Help & Version Handling
8 Parsing Configuration
9 Output & Error Handling
10 Supplementary Option Class

1 Options Definition
.option(flags: string, description: string, defaultValue?: any, parser?: Function): Command
.flag patterns: '-p, --port <number>' | '--trace' | '--ws, --workspace <name>'
opts = program.opts()

2 Required Options
.requiredOption(flags: string, description: string, defaultValue?: any): Command
Throws 'required option not specified' on parse()

3 Arguments
.argument(name: string, description?: string, defaultValue?: any): Command
Variadic when name ends with '...'
program.args array holds unparsed args

4 Commands & Subcommands
.command(nameAndArgs: string, description?: string, config?: object)
Returns new Command when no description; returns this when description present
.addCommand(cmd: Command, config?: object)
.alias(alias: string)
.parse(argv?: string[], opts?: object)
.parseAsync(argv?, opts?)

5 Custom Parsers & Processing
Define parse functions: parseFloat, parseInt, custom error via InvalidArgumentError
.option('-i, --integer <n>', 'integer', myParseInt)
.argument('<first>', 'int', myParseInt, 0)

6 Lifecycle Hooks
.hook(event: 'preAction'|'postAction'|'preSubcommand', listener: Function)
listener(thisCommand, actionCommand)

7 Help & Version Handling
.version(version: string, flags?: string, description?: string)
.helpOption(flags: string, description: string)
.helpCommand(name?: string, description?: string)
.addHelpText(position: 'before'|'after', textOrFn)
.showHelpAfterError(msg?: string)
.showSuggestionAfterError(enable: boolean)
.outputHelp(opts?: object)
.helpInformation(): string

8 Parsing Configuration
.enablePositionalOptions()
.passThroughOptions()
.allowUnknownOption(allow?: boolean)
.allowExcessArguments(allow?: boolean)

9 Output & Error Handling
.exitOverride()
.configureOutput({ writeOut: Function, writeErr: Function, outputError: Function })
.error(message: string, options?: { exitCode?: number, code?: string })

10 Supplementary Option Class
new Option(flags: string, description: string)
.hideHelp(): Option
.default(val: any, description?: string): Option
.choices(array: any[]): Option
.env(varName: string): Option
.preset(val: any): Option
.argParser(fn: Function): Option
.conflicts(name: string): Option
.implies(map: object): Option
.makeOptionMandatory(): Option

## Original Source
Commander.js Guide
https://github.com/tj/commander.js#readme

## Digest of COMMANDER_JS

# Commander.js Core API and Configuration (Retrieved 2024-06-07)

# Option Definition

## Command.option(flags: string, description: string, defaultValue?: any, parser?: (val: string, prev: any) => any)
- flags: "-s, --separator <char>"
- description: "separator character"
- defaultValue: any literal or function return
- parser: custom parse function
- Returns: Command

## Command.requiredOption(flags: string, description: string, defaultValue?: any)
- Same signature as .option, but enforces presence after parse()
- Throws error on missing

## Command.parse(argv?: string[], options?: { from: string }): Command
- argv defaults to process.argv
- options.from: 'node' | 'electron' | 'user'
- Populates .opts() and .args

# Argument Definition

## Command.argument(name: string, description?: string, defaultValue?: any)
- name: "<string>" | "[files...]"
- description: help text
- defaultValue: used if optional
- Variadic if name ends with "..."

# Command and Subcommand Definition

## Command.command(nameAndArgs: string, description?: string, config?: { executableFile?: string, isDefault?: boolean, hidden?: boolean }): Command|this
- If description present: returns this
- Without description: returns new Command

## Command.addCommand(cmd: Command, config?: { isDefault?: boolean, hidden?: boolean }): this
- Attaches preconfigured Command

## Command.alias(alias: string): Command

# Custom Processing and Hooks

## Option custom parser example
function myParseInt(val, prev) { return parseInt(val, 10); }
program.option('-i, --integer <n>', 'integer', myParseInt, 0);

## Hooks
program.hook('preAction', (parent, action) => { /* tracing */ });
Supported events: 'preAction', 'postAction', 'preSubcommand'.

# Help and Output

## program.version(version: string, flags?: string, description?: string)
- Default flags: "-V, --version"

## program.helpOption(flags: string, description: string)

## program.helpCommand(name?: string, description?: string)

## program.addHelpText(position: 'beforeAll'|'before'|'after'|'afterAll', textOrFn: string|(() => string))

## program.showHelpAfterError(msg?: string)
## program.showSuggestionAfterError(enable: boolean)

## program.configureOutput({ writeOut, writeErr, outputError })
- writeOut(str: string)
- writeErr(str: string)
- outputError(str: string, write: (s:string)=>void)

# Parsing Modes

## program.enablePositionalOptions(): Command
## program.passThroughOptions(): Command
## program.allowUnknownOption(allow?: boolean): Command
## program.allowExcessArguments(allow?: boolean): Command

# Supplementary Classes

## new Option(flags: string, description: string)
- Methods: .hideHelp(), .default(val, desc), .choices(array), .env(varName), .preset(val), .argParser(fn), .conflicts(name), .implies(map), .makeOptionMandatory()

# Export and Factory

## import { Command, Option, createCommand } from 'commander';

# TypeScript Support

- install '@commander-js/extra-typings'
- run via ts-node with "node -r ts-node/register script.ts"


## Attribution
- Source: Commander.js Guide
- URL: https://github.com/tj/commander.js#readme
- License: License: MIT
- Crawl Date: 2025-05-05T20:48:35.361Z
- Data Size: 799998 bytes
- Links Found: 5521

## Retrieved
2025-05-05
