# COMMANDER_JS

## Crawl Summary
Commander.js API: npm install commander; import with `const { program } = require('commander')` or `new Command()`. Define options via program.option(flags, description, default) and variants: requiredOption, negatable (--no-), boolean|value ([arg]), variadic (...), custom via Option class (choices, default, env, conflicts, implies, argParser). Define arguments via program.argument(name, description, default) and addArgument with Argument class. Define subcommands via program.command(nameAndArgs, description, opts) or addCommand; alias; nested commands; life-cycle hooks with .hook(event, fn). Action handlers with .action((...args, options, cmd)=>{}). Parsing with .parse()/.parseAsync(). Version with .version(). Help customization with .helpOption(), .helpCommand(), .addHelpText(), .outputHelp(), .helpInformation(). Error handling with .error(), .exitOverride(), .configureOutput(). Parsing configuration: .enablePositionalOptions(), .passThroughOptions(), .allowUnknownOption(), .allowExcessArguments(). Legacy: .storeOptionsAsProperties(). Factory: createCommand().

## Normalised Extract
Table of Contents:
 1. Installation & Import
 2. Program Initialization
 3. Options Definition
 4. Argument Definition
 5. Command & Subcommand Setup
 6. Action Handlers
 7. Parsing Methods
 8. Help & Version Configuration
 9. Hooks
 10. Error & Exit Handling

1. Installation & Import
 npm install commander
 CommonJS: const { program } = require('commander')
 ESM/TS: import { Command } from 'commander'; const program = new Command()

2. Program Initialization
 program.name('app').description('desc').version('1.0.0')
 create local instances with new Command() or createCommand()

3. Options Definition
 program.option('-f, --flag', 'boolean flag')
 program.option('-v, --value <val>', 'required value')
 program.option('-o, --opt [val]', 'boolean or value')
 program.requiredOption('-r, --req <val>', 'mandatory')
 program.option('-n, --nums <nums...>', 'variadic')
 Custom Option: new Option(flags, desc).default(val).choices([...]).env('VAR').conflicts('other').implies({opt:'val'}).argParser(fn)
 Access options: const opts = program.opts(); opts.flag, opts.value

4. Argument Definition
 program.argument('<req>', 'required')
 program.argument('[opt]', 'optional', default)
 program.argument('<many...>', 'variadic array')
 Adds via .addArgument(new Argument(...).choices([...]).default(val))

5. Command & Subcommand Setup
 Inline: program.command('cmd <arg>').description('desc').option(...).action(fn)
 Stand-alone: program.command('name', 'desc', {executableFile:'file',isDefault:true,hidden:true})
 Add existing: program.addCommand(cmd, {isDefault,hidden})
 Alias: cmd.alias('alias')
 Inheritance: options/arguments copied on command creation

6. Action Handlers
 .action((arg1,...,options,command) => {})
 Async handler: .action(async(...)=>{}); use parseAsync
 Context this: function expression sets this to command

7. Parsing Methods
 program.parse([argv],{from:'node'|'electron'|'user'})
 program.parseAsync([argv],{from})
 Default detects Electron and node flags

8. Help & Version Configuration
 .version(version, flags?, desc?) default -V,--version
 .helpOption(flags|false, desc?)
 .helpCommand(name|false, desc?)
 .addHelpText(position, textOrFn)
 .outputHelp({error?:true})
 .helpInformation()
 .showHelpAfterError(msg?)
 .showSuggestionAfterError(false)

9. Hooks
 .hook('preAction'|'postAction'|'preSubcommand', (thisCmd,actionCmd)=>{})
 Async supported with parseAsync

10. Error & Exit Handling
 .error(message,{exitCode?,code?}) throws CommanderError
 .exitOverride(fn) override default process.exit; fn receives CommanderError
 .configureOutput({writeOut,writeErr,outputError})

Misc: .enablePositionalOptions(), .passThroughOptions(), .allowUnknownOption(), .allowExcessArguments(), .storeOptionsAsProperties(), .createCommand()

## Supplementary Details
Program.name(String) sets the program name used in help and executable lookup. Program.description(String) sets multi-line description. Version defaults: flags '-V, --version'. Option flags syntax: short and long separated by comma or space or '|'. Angle brackets '<>' denote required argument; square brackets '[]' optional. Multiple flags: '-s, --separator <char>'. Default values apply when option not passed. Boolean options default to undefined; negatable '--no-flag' sets false. Variadic reads until dash or '--'. RequiredOption raises error if missing: exitCode 1, message 'required option ... not specified'. Choice validation: Option.choices([...]) restricts and errors on invalid. Env binding: Option.env('ENV_VAR') sets default from process.env. Implication: Option.implies({opt:'val'}) sets opt if this option present. ArgParser functions signature: fn(value, previous) => newValue; throw InvalidArgumentError for validation failure.
Argument defaults: defaultValue used when optional missing. Argument.choices([...]) restricts values. Variadic argument must be last.
Command.executableFile: custom executable path. Command.executableDir(path) overrides subcommand search dir.
Help formatting: configure via Help class methods sortOptions(Boolean), sortSubcommands(Boolean), showGlobalOptions(Boolean), styleTitle(ColorFn).
Debugging: node --inspect increments port for child. VSCode autoAttachChildProcesses:true.
npm run-script: use '--' to pass args to program.
Legacy storeOptionsAsProperties(): program.opts() maps to command[prop] assignments.
createCommand(): factory identical to new Command(), overrideable.
Parsing options scope: .enablePositionalOptions() restricts global options before subcommand. .passThroughOptions() stops option processing after args.


## Reference Details
### program.option(flags: string, description?: string, defaultValue?: any): Command
- flags: '-s, --separator <char>'
- description: 'separator character'
- defaultValue: any literal or function return
- returns: this Command instance

### program.requiredOption(flags: string, description: string, defaultValue?: any): Command
- throws error if value missing post-parse

### Option class
new Option(flags: string, description: string)
  .default(value: any, description?: string)
  .choices(values: string[])
  .env(envVar: string)
  .conflicts(optionName: string)
  .implies(keyValue: Object)
  .argParser(fn: (input: string, previous: any) => any): Option

### program.argument(name: string, description?: string, defaultValue?: any): Command

### Argument class
new Argument(name: string, description: string)
  .choices(values: string[])
  .default(value: any, description?: string)

### program.command(nameAndArgs: string, description?: string|Object, opts?: {executableFile?:string,isDefault?:boolean,hidden?:boolean}): Command | this

### program.addCommand(cmd: Command, opts?: {isDefault?:boolean, hidden?:boolean}): this

### program.action(handler: (...args: any[]) => void|Promise<void>): Command
- handler args: declared args..., options:Object, command:Command

### program.parse(argv?: string[], opts?: {from?: 'node'|'electron'|'user'}): Command
### program.parseAsync(argv?: string[], opts?: {from?: 'node'|'electron'|'user'}): Promise<Command>

### program.version(version: string, flags?: string, description?: string): Command

### program.helpOption(flags: string|false, description?: string): Command
### program.helpCommand(name?: string|false, description?: string): Command
### program.addHelpText(position: 'beforeAll'|'before'|'after'|'afterAll', textOrFn: string|((ctx)=>string)): Command
### program.outputHelp(opts?: {error?:boolean}): string
### program.helpInformation(): string

### program.hook(event: 'preAction'|'postAction'|'preSubcommand', fn: (thisCmd: Command, actionCmd: Command) => void|Promise<void>): Command

### program.error(message: string, options?: {exitCode?: number, code?: string}): never
### program.exitOverride(handler?: (err: CommanderError) => never): Command
### program.configureOutput({writeOut?: (str:string)=>void, writeErr?: (str:string)=>void, outputError?: (str:string,write:(s:string)=>void)=>void}): Command

### program.enablePositionalOptions(): Command
### program.passThroughOptions(): Command
### program.allowUnknownOption(): Command
### program.allowExcessArguments(allow?: boolean): Command
### program.storeOptionsAsProperties(): Command

### Utility
import { createCommand } from 'commander';
const cmd = createCommand();

### Code Example: Custom processing and error override
```js
function myParseInt(val){ const v=parseInt(val,10); if(isNaN(v)) throw new Error('Not number'); return v; }
program
  .option('-i, --int <n>', 'integer', myParseInt)
  .exitOverride(err => { console.error('Error:',err.message); process.exit(err.exitCode); });
program.parse();
```

### Troubleshooting
- unknown option: program.showSuggestionAfterError(false)
- display full help on error: program.showHelpAfterError()
- debug child: node --inspect main.js then child on port+1
- npm args: npm run myscript -- --port=80

### Best Practices
- Use createCommand() for isolated instances
- Explicitly set program.name() to avoid script name variability
- Use Option.env() for environment defaults
- Validate input with choices() and custom argParser
- Use requiredOption for mandatory flags


## Information Dense Extract
commander@^x.x.x: import via require('commander') or new Command(); program.option(flags,desc[,default]), .requiredOption, .addOption(new Option(flags,desc).default(...).choices([...]).env('VAR').conflicts('other').implies({opt:'v'}).argParser(fn)); program.argument(name,desc[,default]), .addArgument(new Argument(name,desc).choices([...]).default(...)); commands: program.command(nameAndArgs,desc[,opts]), .addCommand(cmd,opts), .alias(); .action((...args,options,cmd)=>{}) sync or async; parse([argv],{from:'node'|'electron'|'user'}), parseAsync; .version(ver[,flags][,desc]); help: .helpOption(flags|false,desc), .helpCommand(name|false,desc), .addHelpText(position,textOrFn), .outputHelp({error}), .helpInformation(), .showHelpAfterError(msg), .showSuggestionAfterError(false); hooks: .hook('preAction'|'postAction'|'preSubcommand',fn); error: .error(msg,{exitCode,code}), .exitOverride(fn), .configureOutput({writeOut,writeErr,outputError}); parsingConfig: .enablePositionalOptions(), .passThroughOptions(), .allowUnknownOption(), .allowExcessArguments(bool); legacy: .storeOptionsAsProperties(); factory: createCommand(); best practice: explicit program.name(), Option.env(), requiredOption(), custom validation via choices()/argParser(), use exitOverride() for custom error flow; troubleshooting: use showHelpAfterError(), inspect child with node --inspect autoAttachChildProcesses; npm pass-through: npm run-script <cmd> -- <args>.

## Sanitised Extract
Table of Contents:
 1. Installation & Import
 2. Program Initialization
 3. Options Definition
 4. Argument Definition
 5. Command & Subcommand Setup
 6. Action Handlers
 7. Parsing Methods
 8. Help & Version Configuration
 9. Hooks
 10. Error & Exit Handling

1. Installation & Import
 npm install commander
 CommonJS: const { program } = require('commander')
 ESM/TS: import { Command } from 'commander'; const program = new Command()

2. Program Initialization
 program.name('app').description('desc').version('1.0.0')
 create local instances with new Command() or createCommand()

3. Options Definition
 program.option('-f, --flag', 'boolean flag')
 program.option('-v, --value <val>', 'required value')
 program.option('-o, --opt [val]', 'boolean or value')
 program.requiredOption('-r, --req <val>', 'mandatory')
 program.option('-n, --nums <nums...>', 'variadic')
 Custom Option: new Option(flags, desc).default(val).choices([...]).env('VAR').conflicts('other').implies({opt:'val'}).argParser(fn)
 Access options: const opts = program.opts(); opts.flag, opts.value

4. Argument Definition
 program.argument('<req>', 'required')
 program.argument('[opt]', 'optional', default)
 program.argument('<many...>', 'variadic array')
 Adds via .addArgument(new Argument(...).choices([...]).default(val))

5. Command & Subcommand Setup
 Inline: program.command('cmd <arg>').description('desc').option(...).action(fn)
 Stand-alone: program.command('name', 'desc', {executableFile:'file',isDefault:true,hidden:true})
 Add existing: program.addCommand(cmd, {isDefault,hidden})
 Alias: cmd.alias('alias')
 Inheritance: options/arguments copied on command creation

6. Action Handlers
 .action((arg1,...,options,command) => {})
 Async handler: .action(async(...)=>{}); use parseAsync
 Context this: function expression sets this to command

7. Parsing Methods
 program.parse([argv],{from:'node'|'electron'|'user'})
 program.parseAsync([argv],{from})
 Default detects Electron and node flags

8. Help & Version Configuration
 .version(version, flags?, desc?) default -V,--version
 .helpOption(flags|false, desc?)
 .helpCommand(name|false, desc?)
 .addHelpText(position, textOrFn)
 .outputHelp({error?:true})
 .helpInformation()
 .showHelpAfterError(msg?)
 .showSuggestionAfterError(false)

9. Hooks
 .hook('preAction'|'postAction'|'preSubcommand', (thisCmd,actionCmd)=>{})
 Async supported with parseAsync

10. Error & Exit Handling
 .error(message,{exitCode?,code?}) throws CommanderError
 .exitOverride(fn) override default process.exit; fn receives CommanderError
 .configureOutput({writeOut,writeErr,outputError})

Misc: .enablePositionalOptions(), .passThroughOptions(), .allowUnknownOption(), .allowExcessArguments(), .storeOptionsAsProperties(), .createCommand()

## Original Source
Commander.js Guide
https://github.com/tj/commander.js#readme

## Digest of COMMANDER_JS

# Installation

```bash
npm install commander
```

# Quick Start

```js
const { program } = require('commander');
program
  .option('--first')
  .option('-s, --separator <char>')
  .argument('<string>')
  .parse();
const options = program.opts();
const limit = options.first ? 1 : undefined;
console.log(program.args[0].split(options.separator, limit));
```

# Declaring Program Variable

- CommonJS: `const { program } = require('commander');`
- ESM/TypeScript: `import { Command } from 'commander'; const program = new Command();`

# Options API

### Signature

```ts
option(flags: string, description?: string, defaultValue?: any): Command
requiredOption(flags: string, description: string, defaultValue?: any): Command
```

### Common

```js
program.option('-d, --debug', 'output extra debugging');
program.option('-s, --small', 'small pizza size');
program.option('-p, --pizza-type <type>', 'flavour of pizza');
```

### Default Value

```js
program.option('-c, --cheese <type>', 'cheese type', 'blue');
```

### Negatable Boolean

```js
program.option('--no-sauce', 'Remove sauce');
```

### Boolean or Value

```js
program.option('-c, --cheese [type]', 'optional cheese type');
```

### Variadic

```js
program.option('-n, --number <numbers...>', 'specify numbers');
```

# Advanced Option Configuration

```js
const { Option } = require('commander');
program
  .addOption(new Option('-t, --timeout <delay>', 'timeout in seconds').default(60, 'one minute'))
  .addOption(new Option('-d, --drink <size>', 'cup size').choices(['small','medium','large']))
  .addOption(new Option('--donate [amount]', 'donation').preset('20').argParser(parseFloat))
  .addOption(new Option('--disable-server', 'disable server').conflicts('port'))
  .addOption(new Option('--free-drink', 'free drink').implies({ drink: 'small' }));
```

# Arguments API

### Signature

```ts
argument(name: string, description?: string, defaultValue?: any): Command
addArgument(arg: Argument): Command
```

### Variadic Arguments

```js
program.argument('<dirs...>', 'directories to remove');
```

# Commands API

```ts
command(nameAndArgs: string, description?: string|{executableFile?:string,isDefault?:boolean,hidden?:boolean}): Command | this
addCommand(cmd: Command, opts?: { isDefault?: boolean, hidden?: boolean }): this
alias(aliasName: string): Command
```

# Action Handlers

```ts
action(handler: (...args: any[]) => void | Promise<void>): Command
```

Parameters passed: declared arguments, options object, command object.

# Parsing

```ts
parse(argv?: string[], opts?: { from?: 'node'|'electron'|'user' }): Command
parseAsync(argv?: string[], opts?: { from?: 'node'|'electron'|'user' }): Promise<Command>
```

# Help and Version

```ts
version(version: string, flags?: string, description?: string): Command
helpOption(flags: string|false, description?: string): Command
helpCommand(name?: string|false, description?: string): Command
addHelpText(position: 'beforeAll'|'before'|'after'|'afterAll', textOrFn: string|((ctx) => string)): Command
outputHelp(opts?: { error?: boolean }): string
helpInformation(): string
```

# Hooks

```ts
hook(event: 'preAction'|'postAction'|'preSubcommand', fn: (thisCmd: Command, actionCmd: Command) => void|Promise<void>): Command
```

# Error and Exit Handling

```ts
error(message: string, options?: { exitCode?: number, code?: string }): never
exitOverride(callback?: (err: CommanderError) => never): Command
configureOutput(opts: { writeOut?: (str:string)=>void, writeErr?: (str:string)=>void, outputError?: (str:string, write:(s:string)=>void)=>void }): Command
```

## Attribution
- Source: Commander.js Guide
- URL: https://github.com/tj/commander.js#readme
- License: License: MIT
- Crawl Date: 2025-05-05T16:50:41.371Z
- Data Size: 794677 bytes
- Links Found: 5502

## Retrieved
2025-05-05
