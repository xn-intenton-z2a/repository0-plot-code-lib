# COMMANDER_JS

## Crawl Summary
- Installation: npm install commander
- Global and local Command creation: require('commander') or import { Command }
- Options: .option(flags, description, [default], [parser]) and .requiredOption
- Advanced options via Option class: default, choices, env, preset, parser, hideHelp, conflicts, implies
- Accessors: .opts(), .optsWithGlobals(), .getOptionValue(), .setOptionValue(), .getOptionValueSource(), .setOptionValueWithSource()
- Commands: .command(name[, desc][, config]), .addCommand, .alias, .copyInheritedSettings
- Arguments: .argument(name[, desc][, default]), .addArgument
- Parsing: .parse([argv], { from }), .parseAsync
- Parsing config: .enablePositionalOptions, .passThroughOptions, .allowUnknownOption, .allowExcessArguments
- Help and output: .help, .outputHelp, .helpInformation, .showHelpAfterError, .showSuggestionAfterError, .helpOption, .helpCommand, .addHelpText, .configureHelp, .createHelp
- Hooks: preAction, postAction, preSubcommand via .hook
- Errors and exit control: .error, .exitOverride, .configureOutput

## Normalised Extract
Table of Contents
1 Installation
2 Program Initialization
3 Option Configuration
4 Command Setup
5 Argument Setup
6 Parsing Control
7 Help Customization
8 Lifecycle Hooks
9 Error Handling
10 Output Configuration

1 Installation
npm install commander

2 Program Initialization
CommonJS global object program from require('commander')
Local Command instance via new Command()
ESM import as import { Command } from 'commander'

3 Option Configuration
.option(flags: string, description?: string, defaultValue?: any, parser?: (value: string, previous: any) => any)
.requiredOption(flags: string, description: string, defaultValue?: any, parser?: (value: string, previous: any) => any)
OPTION CLASS usage:
 new Option(flags, description)
   .default(value, name)
   .choices(array)
   .env(var)
   .preset(value)
   .argParser(fn)
   .hideHelp()
   .conflicts(other)
   .implies(mapping)
Access values:
 opts = program.opts()
 globals = program.optsWithGlobals()
 single = program.getOptionValue(key)
 program.setOptionValue(key, value)
 program.getOptionValueSource(key)
 program.setOptionValueWithSource(key, value, source)

4 Command Setup
.command(nameAndArgs, description?, { executableFile?, isDefault?, hidden? })
.addCommand(commandInstance, { isDefault?, hidden? })
.alias(aliasName)
.copyInheritedSettings(commandInstance)

5 Argument Setup
.argument(name, description?, defaultValue?)
.addArgument(new Argument(name, description).choices(array).default(value, name).argParser(fn))

6 Parsing Control
.parse(argvArray?, { from: 'node'|'electron'|'user' })
.parseAsync(argvArray?, { from: 'node'|'electron'|'user' })
.enablePositionalOptions(deactivate?)
.passThroughOptions()
.allowUnknownOption(allow?)
.allowExcessArguments(allow?)

7 Help Customization
.help()
.outputHelp({ error? })
.helpInformation()
.showHelpAfterError(trueOrMessage)
.showSuggestionAfterError(enable)
.helpOption(flagsOrFalse, description?)
.helpCommand(nameAndArgsOrFalse, description?)
.addHelpText(position, textOrFn)
.configureHelp({ sortSubcommands?, sortOptions?, showGlobalOptions?, ... })
.createHelp(customHelpClass?)

8 Lifecycle Hooks
.hook('preAction'|'postAction'|'preSubcommand', (thisCmd, actionCmd) => { ... })

9 Error Handling
.error(message, { exitCode?, code? })
.exitOverride(callback)

10 Output Configuration
.configureOutput({ writeOut, writeErr, outputError })

## Supplementary Details
1  npm install commander  
2  Require or import  
   - CommonJS global  const { program } = require('commander')  
   - Local Command  const { Command } = require('commander'); const program = new Command()  
   - ESM  import { Command } from 'commander'; const program = new Command()  
3  Define metadata  
   program.name('app')  
   program.description('desc')  
   program.version('1.0.0')  
4  Add options and arguments  
   program.option('-p, --port <number>', 'port number', 8080)  
   program.requiredOption('-c, --cheese <type>', 'must have cheese')  
   program.argument('<input>', 'input file')  
5  Add commands  
   const build = program.command('build').description('build project')  
   build.option('-d, --debug', 'enable debug')  
6  Custom processing  
   program.option('-i, --int <n>', 'integer', myParseInt, 0)  
7  Help and error behavior  
   program.showHelpAfterError()  
   program.showSuggestionAfterError(false)  
8  Parse and run  
   program.parse(process.argv)  
   or await program.parseAsync(process.argv)

## Reference Details
API Signatures
program.option(flags: string, description?: string, defaultValue?: any, parser?: (value: string, prev: any) => any): Command
program.requiredOption(flags: string, description: string, defaultValue?: any, parser?: (value: string, prev: any) => any): Command
program.addOption(option: Option): Command
Option(flags: string, description?: string)
Option.default(value: any, name?: string): this
Option.choices(values: any[]): this
Option.env(envVar: string): this
Option.preset(value: any): this
Option.argParser(fn: (value: string, prev: any) => any): this
Option.hideHelp(): this
Option.conflicts(name: string): this
Option.implies(mapping: Record<string, any>): this
program.command(cmd: string, description?: string, config?: { executableFile?: string; isDefault?: boolean; hidden?: boolean }): Command | this
program.addCommand(cmd: Command, config?: { isDefault?: boolean; hidden?: boolean }): this
program.alias(alias: string): Command
program.copyInheritedSettings(cmd: Command): Command
program.argument(name: string, description?: string, defaultValue?: any): Command
program.addArgument(arg: Argument): Command
Argument(name: string, description?: string)
Argument.choices(values: any[]): this
Argument.default(value: any, name?: string): this
Argument.argParser(fn: (value: string, prev: any) => any): this
program.parse(argv?: string[], options?: { from?: 'node'|'electron'|'user' }): Command
program.parseAsync(argv?: string[], options?: { from?: 'node'|'electron'|'user' }): Promise<Command>
program.enablePositionalOptions(value?: boolean): Command
program.passThroughOptions(): Command
program.allowUnknownOption(allow?: boolean): Command
program.allowExcessArguments(allow?: boolean): Command
program.hook(event: 'preAction'|'postAction'|'preSubcommand', listener: (cmd: Command, sub?: Command) => void | Promise<void>): Command
program.help(): void
program.outputHelp(options?: { error?: boolean }): void
program.helpInformation(): string
program.showHelpAfterError(arg?: boolean | string): Command
program.showSuggestionAfterError(enable?: boolean): Command
program.helpOption(flags: string|false, description?: string): Command
program.helpCommand(nameAndArgs?: string|false, description?: string): Command
program.addHelpText(pos: 'beforeAll'|'before'|'after'|'afterAll', textOrFn: string | (() => string)): Command
program.configureHelp(opts: { sortSubcommands?: boolean; sortOptions?: boolean; showGlobalOptions?: boolean; styleOptions?: any }): Command
program.createHelp(helpClass?: typeof Help): Help
program.error(message: string, options?: { exitCode?: number; code?: string }): never
program.exitOverride(callback?: (err: CommanderError) => any): Command
program.configureOutput(opts: { writeOut?: (str: string) => void; writeErr?: (str: string) => void; outputError?: (str: string, write: (s: string) => void) => void }): Command

Code Examples
Split command:
const { program } = require('commander');
program.option('--first');
program.option('-s, --separator <char>');
program.argument('<string>');
program.parse();
const opts = program.opts();
const limit = opts.first ? 1 : undefined;
console.log(program.args[0].split(opts.separator, limit));

Subcommand pattern:
const { Command } = require('commander');
const program = new Command();
program.name('string-util').version('0.8.0');
program.command('split')
  .argument('<string>', 'string to split')
  .option('--first', 'first only')
  .option('-s, --separator <char>', 'separator', ',')
  .action((str, opts) => console.log(str.split(opts.separator, opts.first?1:undefined)));
program.parse();

Troubleshooting
Execute with missing argument:
$ pizza-options -p
error: option '-p, --pizza-type <type>' argument missing

Unknown option suggestion disabled:
program.showSuggestionAfterError(false)
$ pizza --hepl
error: unknown option '--hepl'

Excess arguments error:
program.allowExcessArguments(false)
$ cmd a b c
error: too many arguments


## Information Dense Extract
.option(flags:string,desc?:string,default?:any,parser?:(v:string,p:any)=>any):Command;.requiredOption(flags:string,desc:string,default?:any,parser?:(v:string,p:any)=>any):Command;.addOption(opt:Option):Command;Option(flags:string,desc?:string).default(val:any,name?:string).choices(arr:any[]).env(var:string).preset(val:any).argParser(fn).hideHelp().conflicts(key:string).implies(map:Record<string,any>);.command(str:string,desc?:string,config?:{executableFile?:string,isDefault?:boolean,hidden?:boolean}):Command|this;.addCommand(cmd:Command,config?:{isDefault?:boolean,hidden?:boolean}):this;.argument(name:string,desc?:string,default?:any):Command;.addArgument(arg:Argument):Command;.parse(argv?:string[],{from?:'node'|'electron'|'user'}?):Command;.parseAsync(argv?:string[],{from?:'node'|'electron'|'user'}?):Promise<Command>;.enablePositionalOptions(b?:boolean):Command;.passThroughOptions():Command;.allowUnknownOption(b?:boolean):Command;.allowExcessArguments(b?:boolean):Command;.help():void;.outputHelp({error?:boolean}?):void;.helpInformation():string;.showHelpAfterError(arg?:boolean|string):Command;.showSuggestionAfterError(b?:boolean):Command;.helpOption(flags:string|false,desc?:string):Command;.helpCommand(name?:string|false,desc?:string):Command;.addHelpText(pos:'beforeAll'|'before'|'after'|'afterAll',txt:string|()=>string):Command;.configureHelp(opts:Record<string,any>):Command;.hook('preAction'|'postAction'|'preSubcommand',(cmd,sub?)=>void|Promise<void>):Command;.error(msg:string,{exitCode?:number,code?:string}?):never;.exitOverride(cb?:(err:CommanderError)=>any):Command;.configureOutput({writeOut?:(s:string)=>void,writeErr?:(s:string)=>void,outputError?:(s:string,write:(s:string)=>void)=>void}):Command

## Sanitised Extract
Table of Contents
1 Installation
2 Program Initialization
3 Option Configuration
4 Command Setup
5 Argument Setup
6 Parsing Control
7 Help Customization
8 Lifecycle Hooks
9 Error Handling
10 Output Configuration

1 Installation
npm install commander

2 Program Initialization
CommonJS global object program from require('commander')
Local Command instance via new Command()
ESM import as import { Command } from 'commander'

3 Option Configuration
.option(flags: string, description?: string, defaultValue?: any, parser?: (value: string, previous: any) => any)
.requiredOption(flags: string, description: string, defaultValue?: any, parser?: (value: string, previous: any) => any)
OPTION CLASS usage:
 new Option(flags, description)
   .default(value, name)
   .choices(array)
   .env(var)
   .preset(value)
   .argParser(fn)
   .hideHelp()
   .conflicts(other)
   .implies(mapping)
Access values:
 opts = program.opts()
 globals = program.optsWithGlobals()
 single = program.getOptionValue(key)
 program.setOptionValue(key, value)
 program.getOptionValueSource(key)
 program.setOptionValueWithSource(key, value, source)

4 Command Setup
.command(nameAndArgs, description?, { executableFile?, isDefault?, hidden? })
.addCommand(commandInstance, { isDefault?, hidden? })
.alias(aliasName)
.copyInheritedSettings(commandInstance)

5 Argument Setup
.argument(name, description?, defaultValue?)
.addArgument(new Argument(name, description).choices(array).default(value, name).argParser(fn))

6 Parsing Control
.parse(argvArray?, { from: 'node'|'electron'|'user' })
.parseAsync(argvArray?, { from: 'node'|'electron'|'user' })
.enablePositionalOptions(deactivate?)
.passThroughOptions()
.allowUnknownOption(allow?)
.allowExcessArguments(allow?)

7 Help Customization
.help()
.outputHelp({ error? })
.helpInformation()
.showHelpAfterError(trueOrMessage)
.showSuggestionAfterError(enable)
.helpOption(flagsOrFalse, description?)
.helpCommand(nameAndArgsOrFalse, description?)
.addHelpText(position, textOrFn)
.configureHelp({ sortSubcommands?, sortOptions?, showGlobalOptions?, ... })
.createHelp(customHelpClass?)

8 Lifecycle Hooks
.hook('preAction'|'postAction'|'preSubcommand', (thisCmd, actionCmd) => { ... })

9 Error Handling
.error(message, { exitCode?, code? })
.exitOverride(callback)

10 Output Configuration
.configureOutput({ writeOut, writeErr, outputError })

## Original Source
commander.js CLI Framework
https://github.com/tj/commander.js

## Digest of COMMANDER_JS

# Installation

npm install commander

# Program Variable

CommonJS global import
const { program } = require('commander')

Local Command instance
const { Command } = require('commander')
const program = new Command()

ESM import
import { Command } from 'commander'
const program = new Command()

# Option Definitions

.option(flags: string, description?: string, defaultValue?: any, parser?: (value: string, previous: any) => any): Command
.requiredOption(flags: string, description: string, defaultValue?: any, parser?: (value: string, previous: any) => any): Command
.addOption(option: Option): Command

Option chains
Option.default(value: any, name?: string): this
Option.choices(values: any[]): this
Option.env(envVar: string): this
Option.preset(value: any): this
Option.argParser(fn: (value: string, previous: any) => any): this
Option.hideHelp(): this
Option.conflicts(optionName: string): this
Option.implies(mapping: Record<string, any>): this

# Command Definitions

.command(command: string, description?: string, config?: { executableFile?: string, isDefault?: boolean, hidden?: boolean }): Command | this
.addCommand(cmd: Command, config?: { isDefault?: boolean, hidden?: boolean }): this
.alias(alias: string): Command
.copyInheritedSettings(cmd: Command): Command

# Argument Definitions

.argument(name: string, description?: string, defaultValue?: any): Command
.addArgument(argument: Argument): Command

# Parsing

.parse(argv?: string[], options?: { from?: 'node'|'electron'|'user' }): Command
.parseAsync(argv?: string[], options?: { from?: 'node'|'electron'|'user' }): Promise<Command>

# Parsing Configuration

.enablePositionalOptions(deactivate?: boolean): Command
.passThroughOptions(): Command
.allowUnknownOption(allow?: boolean): Command
.allowExcessArguments(allow?: boolean): Command

# Help and Output

.help(): void
.outputHelp(options?: { error?: boolean }): void
.helpInformation(): string
.showHelpAfterError(messageOrEnable?: boolean|string): Command
.showSuggestionAfterError(enable?: boolean): Command
.helpOption(flags: string|false, description?: string): Command
.helpCommand(nameAndArgs?: string|false, description?: string): Command
.addHelpText(position: 'beforeAll'|'before'|'after'|'afterAll', text: string|(() => string)): Command
.configureHelp(options: Record<string, any>): Command
.createHelp(customHelpClass?: typeof Help): Help

# Hooks

.hook(event: 'preAction'|'postAction'|'preSubcommand', listener: (thisCommand: Command, actionCommand?: Command) => void|Promise<void>): Command

# Errors and Exit

.error(message: string, options?: { exitCode?: number, code?: string }): never
.exitOverride(callback?: (err: CommanderError) => any): Command
.configureOutput(options: { writeOut?: (str: string) => void, writeErr?: (str: string) => void, outputError?: (str: string, write: (str: string) => void) => void }): Command

# Metadata

Retrieved: 2024-06-14
Data Size: 713498 bytes

## Attribution
- Source: commander.js CLI Framework
- URL: https://github.com/tj/commander.js
- License: MIT
- Crawl Date: 2025-05-10T20:02:25.863Z
- Data Size: 713498 bytes
- Links Found: 5200

## Retrieved
2025-05-10
