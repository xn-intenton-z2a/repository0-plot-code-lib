# COMMANDER

## Crawl Summary
npm install commander
Use Command or global program
Option API: option, requiredOption, addOption, flags syntax, default, choices, env, preset, parser, conflicts, implies, hideHelp, makeOptionMandatory
Command API: command, addCommand, alias, copyInheritedSettings
Argument API: argument, arguments, addArgument, default, choices, parser, variadic, optional
Action: action(fn), async via parseAsync
Parsing: parse, parseAsync, enablePositionalOptions, passThroughOptions, allowUnknownOption, allowExcessArguments, storeOptionsAsProperties
Help: version, helpOption, helpCommand, addHelpText, showHelpAfterError, showSuggestionAfterError, help, outputHelp, helpInformation, error, exitOverride, configureOutput
Hooks: preAction, postAction, preSubcommand, option:<name>
Standalone: description indicates executable search, executableDir, chmod 755
TS: extra-typings, createCommand
Errors: unknown option, required missing, invalid choice

## Normalised Extract
Table of Contents:
1 Installation
2 Program Declaration
3 Options API
4 Commands API
5 Arguments API
6 Action Handlers
7 Parsing & Configuration
8 Help & Output
9 Hooks & Events
10 Stand-alone Executables
11 TypeScript Support

1 Installation
npm install commander

2 Program Declaration
CommonJS: const { program } = require('commander');
ESM/TS: import { Command } from 'commander'; const program = new Command();

3 Options API
program.option(flags, description, defaultValue?)
program.requiredOption(flags, description, defaultValue?)
program.addOption(new Option(flags, description)
  .hideHelp()
  .default(value, name)
  .choices([...])
  .env('ENV_VAR')
  .preset(value)
  .argParser(fn)
  .conflicts('other')
  .implies({key:'value'})
  .makeOptionMandatory()
)
Access: program.opts(), .optsWithGlobals(), .getOptionValue(), .setOptionValue(), .getOptionValueSource(), .setOptionValueWithSource()
Flags syntax: '-p, --port <number>', '--no-flag', '<val...>', '[val]'

4 Commands API
program.command(nameAndArgs, description?, {executableFile, isDefault, hidden})
program.addCommand(command, {executableFile, isDefault, hidden})
alias: command.alias(alias)
copy settings: command.copyInheritedSettings(subcmd)

5 Arguments API
program.argument('<name>', 'desc', default?)
program.arguments('<a> [b]')
program.addArgument(new Argument('<x>', 'desc')
  .choices([...])
  .default(value, name)
  .argParser(fn)
)
Variadic: '<dirs...>'
Optional: '[name]'

6 Action Handlers
program.action((args..., options, command) => {})
Async: await program.parseAsync()
'this' bound to command in function expression

7 Parsing & Configuration
program.parse([argv], {from})
program.parseAsync([argv], {from})
.from: 'node'|'electron'|'user'
program.enablePositionalOptions()
program.passThroughOptions()
program.allowUnknownOption([true|false])
program.allowExcessArguments([true|false])
program.storeOptionsAsProperties([true|false])

8 Help & Output
program.version('1.0.0', '-v, --vers', 'desc')
program.helpOption('-h, --help', 'desc')
program.helpCommand('assist [cmd]', 'desc')
program.addHelpText('before'|'after', textOrFn)
program.showHelpAfterError(msg)
program.showSuggestionAfterError(false)
program.help()
program.outputHelp({error: true})
program.helpInformation()
program.error('msg', {exitCode: number, code: 'string'})
program.exitOverride(handler)
program.configureOutput({
  writeOut: str => process.stdout.write(str),
  writeErr: str => process.stderr.write(str),
  outputError: (str, write) => write(color(str))
})

9 Hooks & Events
program.hook('preAction', (thisCmd, actionCmd) => {})
program.hook('postAction', ...)
program.hook('preSubcommand', ...)
program.on('option:verbose', () => {})

10 Stand-alone Executables
program.command('install [pkgs...]', 'desc', {executableFile:'myInstall', isDefault:true})
program.executableDir('commands/')
Make scripts 755
Handle options within subcommand

11 TypeScript Support
import { Command } from '@commander-js/extra-typings'
const program = new Command()
const custom = createCommand()
TS-node: node -r ts-node/register script.ts


## Supplementary Details
Option default values: program.option('-c, --cheese <type>', 'cheese', 'blue') sets default=blue
Negatable boolean: program.option('--no-sauce', 'remove sauce') initial sauce=true, --no-sauce sets false
Boolean or value: program.option('-c, --cheese [type]', 'opt cheese') returns undefined|true|string
Variadic options: program.option('-n, --num <vals...>', 'nums') returns array until dash or --
Required option: program.requiredOption('-c, --cheese <type>', 'desc') throws if missing
Choices: new Option('-d, --drink <size>', 'desc').choices(['small','medium','large']) validates input
Env var: new Option('-p, --port <n>', 'desc').env('PORT') uses process.env.PORT
Preset: new Option('--donate [amt]', 'desc').preset('20') sets default if no arg
Conflicts: new Option('--disable-server','').conflicts('port')
Implies: new Option('--free-drink','').implies({drink:'small'})
Custom parsing: .option('-f, --float <n>', 'float', parseFloat)
Custom list: .option('-l, --list <items>', 'csv', v=>v.split(','))
Argument default: program.argument('[pass]','', 'no pass')
Argument choices: new Argument('<size>', 'desc').choices(['s','m','l'])
Program.parse modes: parse(['--port','80'],{from:'user'})
Enable only program options before subcommands: program.enablePositionalOptions()
Pass through to child: program.passThroughOptions()
Legacy options: program.storeOptionsAsProperties()
Output config: program.configureOutput({writeOut,writeErr,outputError})
Exit Override: program.exitOverride()


## Reference Details
Class Command {
  constructor(name?: string)
  name(name: string): this
  usage(usage: string): this
  description(description: string, summary?: string): this
  summary(summary: string): this
  version(version: string, flags?: string, description?: string): this
  helpOption(flags: string|false, description?: string): this
  helpCommand(name?: string|false, description?: string): this
  addHelpText(position: 'beforeAll'|'before'|'after'|'afterAll', textOrFn: string|((ctx:{error:boolean,command:Command})=>string)): this
  option(flags: string, description?: string, defaultValue?: any): this
  requiredOption(flags: string, description?: string, defaultValue?: any): this
  addOption(option: Option): this
  argument(name: string, description?: string, defaultValue?: any): this
  arguments(args: string): this
  addArgument(argument: Argument): this
  command(nameAndArgs: string, description?: string, config?: {executableFile?:string,isDefault?:boolean,hidden?:boolean}): Command
  addCommand(cmd: Command, config?: {executableFile?:string,isDefault?:boolean,hidden?:boolean}): this
  alias(alias: string): this
  copyInheritedSettings(cmd: Command): this
  action(fn: (...args:any[])=>void): this
  hook(event:'preAction'|'postAction'|'preSubcommand', fn:(thisCmd:Command, actionCmd?:Command)=>any): this
  on(event:string, listener:(...args:any[])=>void): this
  parse(argv?: string[]|{from:'node'|'electron'|'user'}, opts?:{from?:string}): this
  parseAsync(argv?: string[]|{from:'node'|'electron'|'user'}, opts?:{from?:string}): Promise<this>
  enablePositionalOptions(): this
  passThroughOptions(): this
  allowUnknownOption(allow?:boolean): this
  allowExcessArguments(allow?:boolean): this
  storeOptionsAsProperties(store?:boolean): this
  exitOverride(handler?: (err: CommanderError)=>void): this
  configureOutput(config: {writeOut?(str:string):void, writeErr?(str:string):void, outputError?(str:string, write:(str:string)=>void):void}): this
  showHelpAfterError(message?:string|boolean): this
  showSuggestionAfterError(enabled:boolean): this
  help(): never
  outputHelp(opts?:{error?:boolean}): string
  helpInformation(): string
  error(message:string, options?:{exitCode?:number, code?:string}): never
  opts(): Record<string,any>
  optsWithGlobals(): Record<string,any>
  getOptionValue(key:string): any
  setOptionValue(key:string, value:any): this
  getOptionValueSource(key:string): string
  setOptionValueWithSource(key:string, value:any, source:string): this
  args: string[]
  processedArgs: any[]
}

Class Option {
  constructor(flags: string, description?: string)
  hideHelp(): this
  default(value:any, name:string): this
  choices(choices:string[]): this
  env(envVar:string): this
  preset(value:any): this
  argParser(fn:(value:string,prev:any)=>any): this
  conflicts(optionName:string): this
  implies(mapping:Record<string, any>): this
  makeOptionMandatory(): this
}

Class Argument {
  constructor(name:string, description?:string)
  choices(choices:string[]): this
  default(value:any, name?:string): this
  argParser(fn:(value:string,prev:any)=>any): this
}

Type CommanderError = { exitCode: number, code: string, message: string }

Examples:
# split.js
node split.js -s / --fits a/b/c
error: unknown option '--fits' (Did you mean --first?)

# options-required.js
node pizza
error: required option '-c, --cheese <type>' not specified

# options-extra.js
PORT=80 extra --donate --free-drink
Options: { timeout: 60, donate: 20, port: '80', freeDrink: true, drink: 'small' }

# configure-output.js
program.configureOutput({
  writeOut: str=>process.stdout.write(`[OUT] ${str}`),
  writeErr: str=>process.stdout.write(`[ERR] ${str}`),
  outputError: (str,write)=>write(`\x1b[31m${str}\x1b[0m`)
})

## Information Dense Extract
install: npm install commander; import: {program}|Command; option(flags,desc,default); requiredOption(flags,desc,default); addOption(new Option(flags,desc).hideHelp().default(v,n).choices([...]).env(v).preset(v).argParser(f).conflicts(o).implies(map).makeOptionMandatory()); argument(name,desc,default); addArgument(new Argument(name,desc).choices([...]).default(v,n).argParser(f)); command(nameAndArgs,desc,{executableFile,isDefault,hidden}); addCommand(cmd,{config}); action(fn(args...,opts,cmd)), async via parseAsync; parse(argv?,{from}); enablePositionalOptions(); passThroughOptions(); allowUnknownOption(bool); allowExcessArguments(bool); storeOptionsAsProperties(bool); version(v,flags,desc); helpOption(flags,desc); helpCommand(name,desc); addHelpText(pos,textOrFn); showHelpAfterError(msg); showSuggestionAfterError(bool); help()/outputHelp()/helpInformation(); error(msg,{exitCode,code}); exitOverride(handler); configureOutput({writeOut,writeErr,outputError}); hook('preAction'|'postAction'|'preSubcommand',fn); on('option:name',fn); executableDir(path); TypeScript: import from '@commander-js/extra-typings'; createCommand(); troubleshooting: unknown option, missing required, invalid choice errors.

## Sanitised Extract
Table of Contents:
1 Installation
2 Program Declaration
3 Options API
4 Commands API
5 Arguments API
6 Action Handlers
7 Parsing & Configuration
8 Help & Output
9 Hooks & Events
10 Stand-alone Executables
11 TypeScript Support

1 Installation
npm install commander

2 Program Declaration
CommonJS: const { program } = require('commander');
ESM/TS: import { Command } from 'commander'; const program = new Command();

3 Options API
program.option(flags, description, defaultValue?)
program.requiredOption(flags, description, defaultValue?)
program.addOption(new Option(flags, description)
  .hideHelp()
  .default(value, name)
  .choices([...])
  .env('ENV_VAR')
  .preset(value)
  .argParser(fn)
  .conflicts('other')
  .implies({key:'value'})
  .makeOptionMandatory()
)
Access: program.opts(), .optsWithGlobals(), .getOptionValue(), .setOptionValue(), .getOptionValueSource(), .setOptionValueWithSource()
Flags syntax: '-p, --port <number>', '--no-flag', '<val...>', '[val]'

4 Commands API
program.command(nameAndArgs, description?, {executableFile, isDefault, hidden})
program.addCommand(command, {executableFile, isDefault, hidden})
alias: command.alias(alias)
copy settings: command.copyInheritedSettings(subcmd)

5 Arguments API
program.argument('<name>', 'desc', default?)
program.arguments('<a> [b]')
program.addArgument(new Argument('<x>', 'desc')
  .choices([...])
  .default(value, name)
  .argParser(fn)
)
Variadic: '<dirs...>'
Optional: '[name]'

6 Action Handlers
program.action((args..., options, command) => {})
Async: await program.parseAsync()
'this' bound to command in function expression

7 Parsing & Configuration
program.parse([argv], {from})
program.parseAsync([argv], {from})
.from: 'node'|'electron'|'user'
program.enablePositionalOptions()
program.passThroughOptions()
program.allowUnknownOption([true|false])
program.allowExcessArguments([true|false])
program.storeOptionsAsProperties([true|false])

8 Help & Output
program.version('1.0.0', '-v, --vers', 'desc')
program.helpOption('-h, --help', 'desc')
program.helpCommand('assist [cmd]', 'desc')
program.addHelpText('before'|'after', textOrFn)
program.showHelpAfterError(msg)
program.showSuggestionAfterError(false)
program.help()
program.outputHelp({error: true})
program.helpInformation()
program.error('msg', {exitCode: number, code: 'string'})
program.exitOverride(handler)
program.configureOutput({
  writeOut: str => process.stdout.write(str),
  writeErr: str => process.stderr.write(str),
  outputError: (str, write) => write(color(str))
})

9 Hooks & Events
program.hook('preAction', (thisCmd, actionCmd) => {})
program.hook('postAction', ...)
program.hook('preSubcommand', ...)
program.on('option:verbose', () => {})

10 Stand-alone Executables
program.command('install [pkgs...]', 'desc', {executableFile:'myInstall', isDefault:true})
program.executableDir('commands/')
Make scripts 755
Handle options within subcommand

11 TypeScript Support
import { Command } from '@commander-js/extra-typings'
const program = new Command()
const custom = createCommand()
TS-node: node -r ts-node/register script.ts

## Original Source
Commander.js Guide
https://github.com/tj/commander.js#readme

## Digest of COMMANDER

# Installation

npm install commander

# Quick Start

Example split.js
const { program } = require('commander');

program
  .option('--first')
  .option('-s, --separator <char>')
  .argument('<string>');

program.parse();

const options = program.opts();
const limit = options.first ? 1 : undefined;
console.log(program.args[0].split(options.separator, limit));

# Program Declaration

CommonJS global:
const { program } = require('commander');

Local Command object:
const { Command } = require('commander');
const program = new Command();

ESM / TypeScript:
import { Command } from 'commander';
const program = new Command();

# Options API

program.option(flags: string, description?: string, defaultValue?: any)
program.requiredOption(flags: string, description?: string, defaultValue?: any)
program.addOption(new Option(flags: string, description?: string))

Common flags:
-p, --port <number>
--trace
--ws, --workspace <name>
--no-<flag>
<name...> variadic
[name] optional

Option methods:
.hideHelp()
.default(value: any, name: string)
.choices(array: string[])
.env(envVar: string)
.preset(value: any)
.argParser(fn: (value: string, previous: any) => any)
.conflicts(optionName: string)
.implies(mapping: Record<string, any>)
.makeOptionMandatory()

Access:
program.opts()
program.optsWithGlobals()
program.getOptionValue(key)
program.setOptionValue(key, value)
program.getOptionValueSource(key)
program.setOptionValueWithSource(key, value, source)

# Commands API

program.command(nameAndArgs: string, description?: string, config?: {executableFile?:string, isDefault?:boolean, hidden?:boolean})
program.addCommand(cmd: Command, config?: {executableFile?:string, isDefault?:boolean, hidden?:boolean})
.alias(alias: string)
.copyInheritedSettings(cmd: Command)

# Arguments API

program.argument(name: string, description?: string, defaultValue?: any)
program.arguments(signatures: string)
program.addArgument(new Argument(name: string, description?: string))

Argument methods:
.choices(array: string[])
.default(value: any, name?: string)
.argParser(fn: (value: string, previous: any) => any)

# Action Handlers

program.action(callback: (...args: any[]) => void)
Async handlers: call program.parseAsync()
Handler signature: (args..., options: Record<string, any>, command: Command)
or use this in function expression

# Parsing and Configuration

program.parse([argv], opts?) => Command
program.parseAsync([argv], opts?) => Promise<Command>
program.enablePositionalOptions()
program.passThroughOptions()
program.allowUnknownOption(allow?: boolean)
program.allowExcessArguments(allow?: boolean)
program.storeOptionsAsProperties(store?: boolean)

# Help and Output

program.version(version: string, flags?: string, description?: string)
program.helpOption(flags: string|false, description?: string)
program.helpCommand(name?: string|false, description?: string)
program.addHelpText(position: 'beforeAll'|'before'|'after'|'afterAll', textOrFn)
program.showHelpAfterError(message?: string|boolean)
program.showSuggestionAfterError(enabled: boolean)
program.help() // exits
program.outputHelp(opts?: {error?: boolean}) // returns string
program.helpInformation() // returns string
program.error(message: string, options?: {exitCode?: number, code?: string}) // throws
program.exitOverride(handler?)
program.configureOutput({writeOut?(str), writeErr?(str), outputError?(str, write)})

# Hooks and Events

program.hook('preAction'|'postAction'|'preSubcommand', (thisCmd, actionCmd?) => void)
program.on('option:<name>', (...args) => void)

# Stand-alone Executables

program.command('name [args...]', 'description', {executableFile:'file', isDefault:true})
program.executableDir(path: string)
Make scripts chmod 755

# TypeScript Support

import { Command } from '@commander-js/extra-typings'
createCommand() => Command

# Troubleshooting

Unknown option:
error: unknown option '--xyz' (Did you mean --x?)
Required option missing:
error: required option '-c, --cheese <type>' not specified
Invalid argument for choice:
error: option '-d, --drink <size>' argument 'huge' is invalid. Allowed choices are small, medium, large


## Attribution
- Source: Commander.js Guide
- URL: https://github.com/tj/commander.js#readme
- License: License: MIT
- Crawl Date: 2025-05-04T12:58:34.361Z
- Data Size: 794140 bytes
- Links Found: 5504

## Retrieved
2025-05-04
