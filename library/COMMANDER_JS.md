# COMMANDER_JS

## Crawl Summary
Commander.js API highlights: method signatures for program initialization, .option(), .requiredOption(), .addOption(new Option()), .argument(), .command(), .action(), .parse()/parseAsync(), error/output overrides, help customization, hooks. Key option types: boolean, value, optional, negatable, variadic, required, default, choices, env, conflicts, implies. Command structure: name, args, subcommands via .command or addCommand, executableFile, hidden, isDefault. Action handler signature: (...args, options, command). Parsing config: enablePositionalOptions, passThroughOptions, allowUnknownOption, allowExcessArguments. Error handling: .exitOverride, .error(), .showSuggestionAfterError, .showHelpAfterError. Output: configureOutput(writeOut, writeErr, outputError). Help customization: helpOption, helpCommand, addHelpText. Hooks: preAction, postAction, preSubcommand.

## Normalised Extract
Table of Contents:
1  Initialization
2  Options
3  Arguments
4  Commands
5  Action handlers
6  Parsing
7  Error & Output handling
8  Help system
9  Hooks

1 Initialization
- require('commander').program or new Command()
- import createCommand

2 Options
- .option(flags:string, description?:string, default?:any):Command
- .requiredOption(flags, desc, default?)
- Flag syntax: '-s, --sep <char>', '--no-flag', '-c, --cheese [type]', '-n, --list <items...>'
- Access via program.opts(), multi-word camelCased
- .addOption(new Option(fl,desc).default(val).choices(arr).env(var).hideHelp().conflicts(str).implies(obj))

3 Arguments
- .argument('<name>', 'desc', parser?, default?)
- Variadic: '<files...>'
- parser: fn(value, previous)

4 Commands
- .command('name [args...]', 'desc', {executableFile, hidden, isDefault})
- .addCommand(cmd, {hideHelp})
- .alias(alias)
- .copyInheritedSettings(parent)

5 Action handlers
- .action((...args, options, command)=>{})
- async: parseAsync

6 Parsing
- .parse(argv?, {from:'user'|'node'|'electron'})
- .parseAsync
- Config: .enablePositionalOptions(), .passThroughOptions(), .allowUnknownOption(), .allowExcessArguments()

7 Error & Output handling
- .exitOverride(cb)
- program.error(msg,{exitCode,code})
- .showSuggestionAfterError(flag)
- .showHelpAfterError(msgOrFlag)
- .configureOutput({writeOut,writeErr,outputError})

8 Help system
- default -h, --help
- .helpOption(flags,desc)
- .helpCommand(nameOrBool,desc)
- .addHelpText(position, textOrFn)
- .help(), .outputHelp(), .helpInformation()

9 Hooks
- .hook(event, callback)
- events: preAction, postAction, preSubcommand


## Supplementary Details
1  Option class methods
- constructor(flags:string, description?:string)
- hideHelp():Option
- default(value:any,label?:string):Option
- choices(array:string[]):Option
- env(varName:string):Option
- conflicts(optionName:string):Option
- implies(map:Record<string,string>):Option
- argParser(fn:(value:string,prev:any)=>any):Option
- preset(value:any):Option

2  Argument class methods
- new Argument(name:string, description?:string)
- choices(array:string[]):Argument
- default(value:any,label?:string):Argument
- argParser(fn)

3  Command-specific methods
- storeOptionsAsProperties():Command
- name(name:string):Command
- description(desc:string, summary?:string):Command
- usage(usage:string):Command
- alias(alias:string):Command
- version(ver:string, flags?:string, desc?:string):Command


## Reference Details
Class: Command

Constructor: new Command(name?:string)
Properties:
  args: string[]
  processedArgs: any[]
Methods:
  option(flags:string, description?:string, defaultValue?:any):Command
  requiredOption(flags:string, description?:string, defaultValue?:any):Command
  addOption(option:Option):Command
  argument(name:string, description?:string, parser?:(value:string,prev:any)=>any, defaultValue?:any):Command
  command(nameAndArgs:string, description?:string, opts?:{executableFile?:string,hidden?:boolean,isDefault?:boolean}):Command
  addCommand(cmd:Command, opts?:{hideHelp?:boolean}):Command
  alias(alias:string):Command
  description(desc:string, summary?:string):Command
  name(name:string):Command
  usage(str:string):Command
  version(ver:string, flags?:string, description?:string):Command
  action(handler:Function):Command
  parse(argv?: string[], opts?:{from:'user'|'node'|'electron'}):Command
  parseAsync(argv?: string[], opts?:object):Promise<Command>
  exitOverride(callback?:(err:CommanderError)=>void):Command
  error(message:string, options?:{exitCode?:number,code?:string}):never
  showSuggestionAfterError(enabled:boolean):Command
  showHelpAfterError(msgOrFlag?:boolean|string):Command
  helpOption(flags:string, description?:string):Command
  helpCommand(nameOrDisabled?:boolean|string, description?:string):Command
  addHelpText(position:'beforeAll'|'before'|'after'|'afterAll', text:string|(()=>string)):Command
  help():void
  outputHelp(opts?:{error?:boolean}):void
  helpInformation():string
  configureOutput(opts:{writeOut?:(str:string)=>void,writeErr?:(str:string)=>void,outputError?:(str:string,write:(str:string)=>void)=>void}):Command
  hook(event:'preAction'|'postAction'|'preSubcommand', callback:(thisCommand:Command, actionCommand:Command)=>void):Command
  enablePositionalOptions():Command
  passThroughOptions():Command
  allowUnknownOption():Command
  allowExcessArguments(allow?:boolean):Command
  storeOptionsAsProperties():Command
  opts():Record<string,any>
  optsWithGlobals():Record<string,any>
  getOptionValue(key:string):any
  setOptionValue(key:string,value:any):void
  getOptionValueSource(key:string):string
  setOptionValueWithSource(key:string,value:any,source:string):void

Class: Option
Constructor: new Option(flags:string, description?:string)
Methods: hideHelp(), default(value:any,label?:string), choices(array:string[]), env(varName:string), conflicts(opt:string), implies(map:Record<string,string>), preset(value:any), argParser(fn)

Class: Argument
Constructor: new Argument(name:string, description?:string)
Methods: choices(array:string[]), default(value:any,label?:string), argParser(fn)

Examples:
```js
// split.js
const { program } = require('commander');
program.option('--first').option('-s, --separator <char>').argument('<string>');
program.parse();
const opts = program.opts();
console.log(program.args[0].split(opts.separator, opts.first?1:undefined));
```

```js
// string-util.js
import { Command } from 'commander';
const program = new Command();
program.name('string-util').description('...').version('0.8.0');
program.command('split')
  .description('Split...')
  .argument('<string>','string to split')
  .option('--first','display first')
  .option('-s, --separator <char>','sep',',')
  .action((str,opts)=> console.log(str.split(opts.separator, opts.first?1:undefined)));
program.parse();
```

Troubleshooting:
- Unknown option: returns exit code 1 and message `error: unknown option '<flag>'`
- Missing argument: `error: option '<flags>' argument missing`
- Conflicts: `error: option 'a' cannot be used with option 'b'`
- Use .exitOverride() to catch errors and handle programmatically


## Information Dense Extract
program= new Command(); program.option(flags,desc,default); program.requiredOption(flags,desc,default); program.addOption(new Option(flags,desc).default(val).choices(arr).env(var).conflicts(o).implies(m).hideHelp()); program.argument(name,desc,parser?,default); program.command(nameAndArgs,desc,opts).alias(a).addCommand(cmd); program.action(handler); program.parse(argv?,{from}); await program.parseAsync(...); program.exitOverride(cb); program.error(msg,{exitCode,code}); program.configureOutput({writeOut,writeErr,outputError}); program.showHelpAfterError(msgOrFlag); program.showSuggestionAfterError(flag); program.helpOption(flags,desc); program.helpCommand(nameOrDisable,desc); program.addHelpText(pos,textOrFn); program.hook(event,cb); parse config: enablePositionalOptions(), passThroughOptions(), allowUnknownOption(), allowExcessArguments()

## Sanitised Extract
Table of Contents:
1  Initialization
2  Options
3  Arguments
4  Commands
5  Action handlers
6  Parsing
7  Error & Output handling
8  Help system
9  Hooks

1 Initialization
- require('commander').program or new Command()
- import createCommand

2 Options
- .option(flags:string, description?:string, default?:any):Command
- .requiredOption(flags, desc, default?)
- Flag syntax: '-s, --sep <char>', '--no-flag', '-c, --cheese [type]', '-n, --list <items...>'
- Access via program.opts(), multi-word camelCased
- .addOption(new Option(fl,desc).default(val).choices(arr).env(var).hideHelp().conflicts(str).implies(obj))

3 Arguments
- .argument('<name>', 'desc', parser?, default?)
- Variadic: '<files...>'
- parser: fn(value, previous)

4 Commands
- .command('name [args...]', 'desc', {executableFile, hidden, isDefault})
- .addCommand(cmd, {hideHelp})
- .alias(alias)
- .copyInheritedSettings(parent)

5 Action handlers
- .action((...args, options, command)=>{})
- async: parseAsync

6 Parsing
- .parse(argv?, {from:'user'|'node'|'electron'})
- .parseAsync
- Config: .enablePositionalOptions(), .passThroughOptions(), .allowUnknownOption(), .allowExcessArguments()

7 Error & Output handling
- .exitOverride(cb)
- program.error(msg,{exitCode,code})
- .showSuggestionAfterError(flag)
- .showHelpAfterError(msgOrFlag)
- .configureOutput({writeOut,writeErr,outputError})

8 Help system
- default -h, --help
- .helpOption(flags,desc)
- .helpCommand(nameOrBool,desc)
- .addHelpText(position, textOrFn)
- .help(), .outputHelp(), .helpInformation()

9 Hooks
- .hook(event, callback)
- events: preAction, postAction, preSubcommand

## Original Source
Commander.js Guide
https://github.com/tj/commander.js#readme

## Digest of COMMANDER_JS

# Commander.js Technical Reference (Retrieved: 2024-06-10)

## Installation

npm install commander

## Program Initialization

### CommonJS
```js
const { program } = require('commander');
```

### ES Module
```js
import { Command } from 'commander';
const program = new Command();
```

## Defining Options

### program.option(flags: string, description?: string, defaultValue?: any)

- flags: '-s, --separator <char>'
- description: 'separator character'
- defaultValue: ','
- returns: Command

### program.requiredOption(flags: string, description?: string, defaultValue?: any)

Throws error if option undefined after parse.

### Variants

- Boolean: .option('-d, --debug', 'enable debug')
- Negatable: .option('--no-cheese', 'remove cheese')
- Optional-argument: .option('-c, --cheese [type]', 'add cheese')
- Variadic: .option('-n, --number <numbers...>', 'specify numbers')

### Advanced

```js
program.addOption(
  new Option('-t, --timeout <sec>', 'timeout in seconds')
    .default(60)
    .choices(['30','60','120'])
);
```  
Option methods: hideHelp(), env(var), conflicts(other), implies(map).

## Defining Arguments

### program.argument(name: string, description?: string, parser?: Function, defaultValue?: any)

- name: '<src>' or '[dest]'
- parser: custom function(value, previous)
- defaultValue: any
- supports variadic: '<files...>'

## Commands and Subcommands

### program.command(nameAndArgs: string, description?: string, opts?: {executableFile?: string, hidden?: boolean, isDefault?: boolean})

- nameAndArgs: 'split <string>'
- description: 'split a string'
- opts: { executableFile: 'mycmd', hidden: true }
- returns: Command

### program.addCommand(cmd: Command, opts?: {hideHelp?:boolean})

Inherit settings: use cmd.copyInheritedSettings(parent).

## Action Handlers

### program.action(handler: Function)

- handler args: declared arguments, options object, command object
- async handler: use program.parseAsync()

## Parsing

### program.parse(argv?: string[], opts?: {from?: 'user'|'node'|'electron'})

### program.parseAsync(argv?: string[], opts?: object)

## Error and Output Handling

- program.exitOverride([callback])
- program.configureOutput({ writeOut, writeErr, outputError })
- Error: program.error(message, {exitCode, code})
- Suggestion: program.showSuggestionAfterError(false)
- Help on error: program.showHelpAfterError()

## Help System

- Flags: default '-h, --help'
- program.helpOption(flags:string, desc:string)
- program.helpCommand(name:string, desc:string)
- program.addHelpText(position:string, textOrFn)

## Lifecycle Hooks

- program.hook('preAction'|'postAction'|'preSubcommand', callback)



## Attribution
- Source: Commander.js Guide
- URL: https://github.com/tj/commander.js#readme
- License: License: MIT
- Crawl Date: 2025-05-05T04:48:18.779Z
- Data Size: 786733 bytes
- Links Found: 5478

## Retrieved
2025-05-05
