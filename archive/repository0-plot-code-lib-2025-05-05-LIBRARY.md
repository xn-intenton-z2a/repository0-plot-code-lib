library/COMMANDER_JS.md
# library/COMMANDER_JS.md
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
library/SVG_REFERENCE.md
# library/SVG_REFERENCE.md
# SVG_REFERENCE

## Crawl Summary
Extracted core SVG technical specifications: root <svg> element attributes with types and defaults; <rect> element attribute definitions; SVGDOM interface methods and properties; embedding patterns and MIME type; coordinate system control via viewBox and preserveAspectRatio; event APIs.

## Normalised Extract
Table of Contents:
1. <svg> Element Attributes
2. <rect> Element Attributes
3. SVGSVGElement Interface
4. Embedding Patterns
5. Coordinate System (viewBox)
6. Event Handling

1. <svg> Element Attributes
   xmlns: "http://www.w3.org/2000/svg" (required)
   width: length or percentage; default 100%
   height: length or percentage; default 100%
   viewBox: "min-x min-y width height"
   preserveAspectRatio: align (xMinYMin|xMidYMid|xMaxYMax) and meet|slice; default xMidYMid meet
   id: string
   baseProfile: string

2. <rect> Element Attributes
   x, y: number; default 0
   width, height: number; required
   rx, ry: number; default 0
   fill: paint; default black
   stroke: paint; default none
   stroke-width: number; default 1

3. SVGSVGElement Interface
   Methods:
     createSVGRect(): SVGRect
     createSVGPoint(): SVGPoint
     getBBox(): SVGRect
     getScreenCTM(): DOMMatrix
   Properties:
     currentScale: number
     currentTranslate: SVGPoint

4. Embedding Patterns
   MIME type: image/svg+xml
   Inline: <svg> in HTML5
   Image tag: <img src="file.svg"/>
   Object tag: <object data="file.svg" type="image/svg+xml"></object>
   Iframe: <iframe src="file.svg"></iframe>

5. Coordinate System (viewBox)
   viewBox="min-x min-y width height" defines user units
   width/height on <svg> set viewport size
   preserveAspectRatio aligns and scales content

6. Event Handling
   Supported: click, mousemove, load, etc.
   Attach: element.addEventListener('event', handler)


## Supplementary Details
Namespaces and MIME:
- Root must include xmlns="http://www.w3.org/2000/svg"
- Serve .svg files with Content-Type: image/svg+xml
Embedding Steps:
1. Inline: Place <svg> element in HTML body
2. External: Ensure server header, reference via <img>, <object>, or <iframe>
Configuration Options:
- preserveAspectRatio values: xMinYMin meet, xMidYMid slice, none (no scaling)
Implementation Steps:
1. document.createElementNS('http://www.w3.org/2000/svg','svg')
2. setAttribute('viewBox','0 0 100 100')
3. appendChild to container
4. create shapes via createElementNS and set attributes


## Reference Details
SVGSVGElement Interface:
Method Signatures:
  createSVGRect(): SVGRect
  createSVGPoint(): SVGPoint
  getBBox(): SVGRect
  getScreenCTM(): DOMMatrix
Properties:
  currentScale: number
  currentTranslate: SVGPoint

Code Example:
const svgNS = 'http://www.w3.org/2000/svg';
const svg = document.createElementNS(svgNS,'svg');
svg.setAttribute('width','200');
svg.setAttribute('height','100');
svg.setAttribute('viewBox','0 0 200 100');
svg.setAttribute('preserveAspectRatio','xMidYMid meet');

const rect = document.createElementNS(svgNS,'rect');
rect.setAttribute('x','10');
rect.setAttribute('y','10');
rect.setAttribute('width','180');
rect.setAttribute('height','80');
rect.setAttribute('fill','#4CAF50');
rect.setAttribute('stroke','#000000');
rect.setAttribute('stroke-width','2');

svg.appendChild(rect);
document.body.appendChild(svg);

Best Practices:
- Always include viewBox for responsive scaling
- Use defs and symbol for reusable shapes
- Minimize file size: remove metadata, comments

Troubleshooting:
- If SVG not rendering, verify xmlns attribute on <svg>
- Check server MIME: curl -I file.svg | grep Content-Type; should be image/svg+xml
- Inspect parser errors in browser console: SyntaxError: ... at line X
- For cross-origin, add CORS headers or inline SVG


## Information Dense Extract
svg xmlns=http://www.w3.org/2000/svg;width:length|%;height:length|%;viewBox=min-x min-y width height;preserveAspectRatio=xMinYMin|xMidYMid|xMaxYMax meet|slice;id=string;baseProfile=string; rect x=number; y=number; width=number; height=number; rx=number; ry=number; fill=paint; stroke=paint; stroke-width=number; SVGSVGElement.createSVGRect():SVGRect;createSVGPoint():SVGPoint;getBBox():SVGRect;getScreenCTM():DOMMatrix; currentScale:number;currentTranslate:SVGPoint; MIME=image/svg+xml; embed via <img>,<object>,<iframe>,inline; CORS require header Access-Control-Allow-Origin; best: defs+symbol; troubleshooting: check xmlns, MIME, console errors.

## Sanitised Extract
Table of Contents:
1. <svg> Element Attributes
2. <rect> Element Attributes
3. SVGSVGElement Interface
4. Embedding Patterns
5. Coordinate System (viewBox)
6. Event Handling

1. <svg> Element Attributes
   xmlns: 'http://www.w3.org/2000/svg' (required)
   width: length or percentage; default 100%
   height: length or percentage; default 100%
   viewBox: 'min-x min-y width height'
   preserveAspectRatio: align (xMinYMin|xMidYMid|xMaxYMax) and meet|slice; default xMidYMid meet
   id: string
   baseProfile: string

2. <rect> Element Attributes
   x, y: number; default 0
   width, height: number; required
   rx, ry: number; default 0
   fill: paint; default black
   stroke: paint; default none
   stroke-width: number; default 1

3. SVGSVGElement Interface
   Methods:
     createSVGRect(): SVGRect
     createSVGPoint(): SVGPoint
     getBBox(): SVGRect
     getScreenCTM(): DOMMatrix
   Properties:
     currentScale: number
     currentTranslate: SVGPoint

4. Embedding Patterns
   MIME type: image/svg+xml
   Inline: <svg> in HTML5
   Image tag: <img src='file.svg'/>
   Object tag: <object data='file.svg' type='image/svg+xml'></object>
   Iframe: <iframe src='file.svg'></iframe>

5. Coordinate System (viewBox)
   viewBox='min-x min-y width height' defines user units
   width/height on <svg> set viewport size
   preserveAspectRatio aligns and scales content

6. Event Handling
   Supported: click, mousemove, load, etc.
   Attach: element.addEventListener('event', handler)

## Original Source
MDN SVG Documentation
https://developer.mozilla.org/en-US/docs/Web/SVG

## Digest of SVG_REFERENCE

# <svg> Element

Syntax: `<svg xmlns="http://www.w3.org/2000/svg" [width] [height] [viewBox] [preserveAspectRatio]>`  
Attributes:
- xmlns (required): "http://www.w3.org/2000/svg"
- width: `<length>` or `<percentage>`, default 100%
- height: `<length>` or `<percentage>`, default 100%
- viewBox: four numbers "min-x min-y width height"
- preserveAspectRatio: `<align> [meet|slice]`, default xMidYMid meet
- id: string
- baseProfile: string

# <rect> Element

Syntax: `<rect x="<number>" y="<number>" width="<number>" height="<number>" [rx]="<number>" [ry]="<number>" [fill] [stroke] [stroke-width]>`  
Attributes:
- x, y: `<number>`, default 0
- width, height: `<number>`, required
- rx, ry: `<number>`, defaults to 0
- fill: `<paint>`, default black
- stroke: `<paint>`, default none
- stroke-width: `<number>`, default 1

# SVGSVGElement Interface

Methods:
- createSVGRect(): SVGRect
- createSVGPoint(): SVGPoint
- getBBox(): SVGRect
- getScreenCTM(): DOMMatrix

Properties:
- currentScale: number
- currentTranslate: SVGPoint

# Embedding and Namespaces

- MIME type: image/svg+xml
- Embed via `<img src="...">`, `<object data="...">`, `<iframe src="...">`, or inline `<svg>` in HTML5
- Must include `xmlns` attribute on root

# ViewBox and Coordinate System

- viewBox="min-x min-y width height" defines user coordinate system
- Use width/height on `<svg>` for viewport size
- preserveAspectRatio controls scaling alignment

# Event Handling

- Support standard DOM events: click, mousemove, load
- Attach via element.addEventListener('click', handler)


## Attribution
- Source: MDN SVG Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG
- License: License: CC-BY-SA
- Crawl Date: 2025-05-04T00:36:44.293Z
- Data Size: 1199398 bytes
- Links Found: 31574

## Retrieved
2025-05-04
library/COMMANDER.md
# library/COMMANDER.md
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
library/SVG_SPEC.md
# library/SVG_SPEC.md
# SVG_SPEC

## Crawl Summary
SVG root element requires width, height, viewBox and namespaces. Core elements (<rect>, <circle>, <path>) have specific coordinate and style attributes. viewBox defines user coordinate system. preserveAspectRatio controls alignment and scaling. Embed via inline <svg>, <img>, <object> or CSS. SVG elements support presentation attributes and CSS properties. Use createElementNS and setAttribute for dynamic DOM. SMIL animation via <animate> and <animateTransform>. Troubleshoot with W3C validator and correct namespaces.

## Normalised Extract
Table of Contents
1. SVG Root Element
2. Namespaces
3. Embedding Methods
4. Core Graphic Elements
   4.1 Rectangle (<rect>)
   4.2 Circle (<circle>)
   4.3 Path (<path>)
5. viewBox & Coordinate System
6. CSS Styling
7. SVG DOM API
8. SMIL Animation
9. Troubleshooting

1. SVG Root Element
Attributes:
  width: CSSLength | percentage
  height: CSSLength | percentage
  viewBox: "minX minY width height"
  preserveAspectRatio: align [meet|slice]
  xmlns: "http://www.w3.org/2000/svg"
  xmlns:xlink: "http://www.w3.org/1999/xlink"
Example:
<svg width="200px" height="100px" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"></svg>

2. Namespaces
Default: http://www.w3.org/2000/svg
XLink: http://www.w3.org/1999/xlink

3. Embedding Methods
Inline: <svg>Syntax above</svg>
<img src="icon.svg" width="..." height="..." />
<object data="diagram.svg" type="image/svg+xml"></object>
CSS: selector { background-image:url('graphic.svg'); }

4. Core Graphic Elements
4.1 <rect>
  x (number), y (number)
  width (number|percentage), height (number|percentage)
  rx, ry (number)
  fill (color|none), stroke (color|none), stroke-width (number)
Example: <rect x="10" y="20" width="100" height="50" fill="#00f" stroke="#000" stroke-width="2" />

4.2 <circle>
  cx, cy (number)
  r (number)
  fill, stroke, stroke-width
Example: <circle cx="50" cy="50" r="40" fill="red" />

4.3 <path>
  d: move/line/curve commands
  fill-rule: nonzero|evenodd
Example: <path d="M10 10 H 90 V 90 H 10 Z" fill="none" stroke="black" />

5. viewBox
Defines user coordinate system. Syntax: minX minY width height. Allows scaling without loss.

6. CSS Styling
Properties: fill, stroke, stroke-width, opacity, display, visibility. Use inline or external stylesheets.

7. SVG DOM API
createElementNS(ns, name)
setAttribute(name, value)
getBBox(): returns {x,y,width,height}
addEventListener(type, listener, options)
Example:
const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
svg.setAttribute('viewBox','0 0 100 100');

8. SMIL Animation
<animate attributeName="fill" from="red" to="blue" dur="2s" repeatCount="indefinite" />
<animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="5s" repeatCount="indefinite" />

9. Troubleshooting
Use xmllint --noout file.svg to validate. Ensure correct MIME (image/svg+xml). Confirm namespaces. Check browser console for warnings.

## Supplementary Details
Default Values:
  width: auto (if missing)
  height: auto
  viewBox: none (defaults to width/height units)
  preserveAspectRatio: xMidYMid meet
Implementation Steps:
 1. Create root <svg> element with createElementNS
 2. Set mandatory attributes: width, height, viewBox, xmlns
 3. Append shape elements (<rect>,<circle>,<path>) with attributes
 4. Attach to DOM
Configuration Options:
  - preserveAspectRatio values: xMinYMin|xMidYMin|xMaxYMin|xMinYMid|xMidYMid|xMaxYMid|xMinYMax|xMidYMax|xMaxYMax + meet/slice
  - fill-rule: nonzero or evenodd
  - stroke-linecap: butt|round|square
Best Practices:
  - Use viewBox for responsive scaling
  - Minify SVG with SVGO
  - Group reusable shapes with <g> and symbols
  - Use external CSS for styling multiple SVGs


## Reference Details
SVGDOM methods:
createElementNS(namespaceURI: string, qualifiedName: string): SVGElement
setAttribute(name: string, value: string): void
getBBox(): SVGRect { x:number; y:number; width:number; height:number }
addEventListener(type: string, listener: (evt: Event) => any, options?: boolean | AddEventListenerOptions): void

Core element interfaces:
interface SVGRectElement extends SVGGeometryElement {
  x: SVGAnimatedLength;
  y: SVGAnimatedLength;
  width: SVGAnimatedLength;
  height: SVGAnimatedLength;
  rx: SVGAnimatedLength;
  ry: SVGAnimatedLength;
}

interface SVGCircleElement extends SVGGeometryElement {
  cx: SVGAnimatedLength;
  cy: SVGAnimatedLength;
  r: SVGAnimatedLength;
}

interface SVGPathElement extends SVGGeometryElement {
  pathSegList: SVGPathSegList;
  getTotalLength(): number;
  getPointAtLength(distance: number): DOMPoint;
}

Code Example: Dynamic SVG Creation
const SVG_NS='http://www.w3.org/2000/svg';
function createCircle(cx,cy,r,fill){
  const c=document.createElementNS(SVG_NS,'circle');
  c.setAttribute('cx',cx);
  c.setAttribute('cy',cy);
  c.setAttribute('r',r);
  c.setAttribute('fill',fill);
  return c;
}
const svg=document.createElementNS(SVG_NS,'svg');
svg.setAttribute('viewBox','0 0 100 100');
svg.appendChild(createCircle(50,50,40,'green'));
document.body.appendChild(svg);

Troubleshooting Commands:
xmllint --noout --schema http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd file.svg
Expected no errors

SVGO CLI:
npx svgo --multipass input.svg -o output.min.svg
Expected file size reduction

## Information Dense Extract
svg root attributes: width CSSLength|%, height CSSLength|%, viewBox=minX minY width height, preserveAspectRatio=align[ meet|slice], xmlns=http://www.w3.org/2000/svg, xmlns:xlink=http://www.w3.org/1999/xlink. embedding: inline <svg>, <img src>, <object data>, CSS background-image. rect: x,y,width,height,rx,ry,fill,stroke,stroke-width. circle: cx,cy,r,fill,stroke,stroke-width. path: d commands, fill-rule. CSS: fill,stroke,opacity,font-size. DOM API: createElementNS(ns,name), setAttribute(name,value), getBBox(), addEventListener(). SMIL: <animate attributeName,from,to,dur,repeatCount>, <animateTransform type,values,dur,repeatCount>. troubleshoot: xmllint, SVGO, validate namespaces and MIME.

## Sanitised Extract
Table of Contents
1. SVG Root Element
2. Namespaces
3. Embedding Methods
4. Core Graphic Elements
   4.1 Rectangle (<rect>)
   4.2 Circle (<circle>)
   4.3 Path (<path>)
5. viewBox & Coordinate System
6. CSS Styling
7. SVG DOM API
8. SMIL Animation
9. Troubleshooting

1. SVG Root Element
Attributes:
  width: CSSLength | percentage
  height: CSSLength | percentage
  viewBox: 'minX minY width height'
  preserveAspectRatio: align [meet|slice]
  xmlns: 'http://www.w3.org/2000/svg'
  xmlns:xlink: 'http://www.w3.org/1999/xlink'
Example:
<svg width='200px' height='100px' viewBox='0 0 200 100' preserveAspectRatio='xMidYMid meet' xmlns='http://www.w3.org/2000/svg'></svg>

2. Namespaces
Default: http://www.w3.org/2000/svg
XLink: http://www.w3.org/1999/xlink

3. Embedding Methods
Inline: <svg>Syntax above</svg>
<img src='icon.svg' width='...' height='...' />
<object data='diagram.svg' type='image/svg+xml'></object>
CSS: selector { background-image:url('graphic.svg'); }

4. Core Graphic Elements
4.1 <rect>
  x (number), y (number)
  width (number|percentage), height (number|percentage)
  rx, ry (number)
  fill (color|none), stroke (color|none), stroke-width (number)
Example: <rect x='10' y='20' width='100' height='50' fill='#00f' stroke='#000' stroke-width='2' />

4.2 <circle>
  cx, cy (number)
  r (number)
  fill, stroke, stroke-width
Example: <circle cx='50' cy='50' r='40' fill='red' />

4.3 <path>
  d: move/line/curve commands
  fill-rule: nonzero|evenodd
Example: <path d='M10 10 H 90 V 90 H 10 Z' fill='none' stroke='black' />

5. viewBox
Defines user coordinate system. Syntax: minX minY width height. Allows scaling without loss.

6. CSS Styling
Properties: fill, stroke, stroke-width, opacity, display, visibility. Use inline or external stylesheets.

7. SVG DOM API
createElementNS(ns, name)
setAttribute(name, value)
getBBox(): returns {x,y,width,height}
addEventListener(type, listener, options)
Example:
const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
svg.setAttribute('viewBox','0 0 100 100');

8. SMIL Animation
<animate attributeName='fill' from='red' to='blue' dur='2s' repeatCount='indefinite' />
<animateTransform attributeName='transform' type='rotate' from='0 50 50' to='360 50 50' dur='5s' repeatCount='indefinite' />

9. Troubleshooting
Use xmllint --noout file.svg to validate. Ensure correct MIME (image/svg+xml). Confirm namespaces. Check browser console for warnings.

## Original Source
MDN SVG Documentation
https://developer.mozilla.org/en-US/docs/Web/SVG

## Digest of SVG_SPEC

# SVG Root Element

<svg
  width: CSSLength | percentage (e.g., "200px", "50%"),
  height: CSSLength | percentage,
  viewBox: four numbers "min-x min-y width height" defining internal coordinate system,
  preserveAspectRatio: <align> [meet|slice] (default xMidYMid meet),
  xmlns: "http://www.w3.org/2000/svg",
  xmlns:xlink: "http://www.w3.org/1999/xlink"
>

# Namespaces

- Default namespace URI: http://www.w3.org/2000/svg
- XLink namespace URI: http://www.w3.org/1999/xlink

# Embedding SVG in HTML

Inline: <svg> ... </svg>

Object: <object data="file.svg" type="image/svg+xml"></object>

Image: <img src="file.svg" width="..." height="..." />

CSS: background-image: url("file.svg");

# Core Graphic Elements & Attributes

## Rectangle (<rect>)
- x, y: coordinate of top-left corner (number, default 0)
- width, height: CSSLength (required)
- rx, ry: corner radii (number)
- fill: paint (color|none)
- stroke: paint
- stroke-width: number

## Circle (<circle>)
- cx, cy: center coordinates (number, default 0)
- r: radius (number, required)
- fill, stroke, stroke-width as above

## Path (<path>)
- d: path data string (commands M, L, C, Z, etc.)
- fill-rule: nonzero|evenodd (default nonzero)
- stroke, stroke-width

# viewBox & Coordinate Systems

viewBox="minX minY width height"

Coord space transforms to viewport via preserveAspectRatio.

# CSS & External Styling

SVG elements accept presentation attributes and CSS properties: fill, stroke, stroke-opacity, font-size, display, visibility

# SVG DOM API

document.createElementNS(namespaceURI: string, qualifiedName: string): Element

element.setAttribute(name: string, value: string)
element.getBBox(): SVGRect

element.addEventListener(type: string, listener: EventListener, options?: boolean|AddEventListenerOptions)

# SMIL Animation Elements

<animate>
  attributeName: string,
  from: number|string,
  to: number|string,
  dur: time (e.g., "2s"),
  repeatCount: number | "indefinite"
</animate>

<animateTransform>
  type: rotate|scale|translate|skewX|skewY,
  values: semicolon-separated list,
  dur, repeatCount
</animateTransform>

# Troubleshooting

- Validate XML namespaces and correct MIME type
- Use W3C validator: xmllint --noout file.svg
- Check console for unsupported features in target browsers

## Attribution
- Source: MDN SVG Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG
- License: License: CC-BY-SA
- Crawl Date: 2025-05-04T01:08:19.026Z
- Data Size: 1365385 bytes
- Links Found: 37438

## Retrieved
2025-05-04
library/ZOD_API.md
# library/ZOD_API.md
# ZOD_API

## Crawl Summary
Zod core consists of schema builders (string, number, boolean, object, array, tuple, union, intersection, enum, nativeEnum), validation methods (parse, safeParse, parseAsync, safeParseAsync), type inference via z.infer, transformation (transform), refinement (refine, superRefine), schema utilities (partial, required, extend, omit, pick, strict), and error handling (ZodError.errors, ZodError.format)

## Normalised Extract
Table of Contents:
1. Schema Builders
2. Validation Methods
3. Type Inference
4. Transformation & Refinement
5. Schema Utilities
6. Error Handling

1. Schema Builders
 z.string(): ZodString
 z.number(): ZodNumber
 z.boolean(): ZodBoolean
 z.object(shape: Record<string, ZodType>): ZodObject<Shape>
 z.array(type: ZodType): ZodArray<T>
 z.tuple(types: ZodType[]): ZodTuple
 z.union(schemas: ZodType[]): ZodUnion
 z.intersection(a: ZodType, b: ZodType): ZodIntersection
 z.enum(values: [string, ...string[]]): ZodEnum
 z.nativeEnum(E: object): ZodNativeEnum

2. Validation Methods
 schema.parse(data: unknown): T
 schema.safeParse(data: unknown): { success: boolean; data?: T; error?: ZodError }
 schema.parseAsync(data: unknown): Promise<T>
 schema.safeParseAsync(data: unknown): Promise<{ success: boolean; data?: T; error?: ZodError }>

3. Type Inference
 type T = z.infer<typeof schema>

4. Transformation & Refinement
 schema.transform<U>(fn: (val: T) => U): ZodEffects<T, U>
 schema.refine(predicate: (val: T) => boolean, message?: string): this
 schema.superRefine((val: T, ctx: RefinementCtx) => void): this

5. Schema Utilities
 objectSchema.partial(): ZodObject<Partial<Shape>>
 objectSchema.required(): ZodObject<Shape>
 objectSchema.extend<NewShape>(shape: NewShape): ZodObject<Shape & NewShape>
 objectSchema.omit<Keys extends keyof Shape>(keys: Keys[]): ZodObject<Omit<Shape, Keys>>
 objectSchema.pick<Keys extends keyof Shape>(keys: Keys[]): ZodObject<Pick<Shape, Keys>>
 objectSchema.strict(strip?: boolean): ZodObject<Shape>

6. Error Handling
 error.errors: { path: (string | number)[]; message: string; code: string }[]
 error.format(): Record<string, { _errors: string[] }>

## Supplementary Details
String Schema Methods: min(min: number, message?: string), max(max: number, message?: string), length(exact: number, message?: string), email(message?: string), url(message?: string), regex(pattern: RegExp, message?: string), uuid(message?: string), optional(), nullable(), default(def: string), transform(fn: (val: string) => U).

Number Schema Methods: min(min: number, message?: string), max(max: number, message?: string), int(message?: string), positive(message?: string), negative(message?: string), nonnegative(message?: string), nonpositive(message?: string), finite(message?: string).

Refinement Options: second argument refine(predicate, { message: string; params?: Record<string, any> }).

Default Behaviors: parse throws ZodError; safeParse returns success flag; parseAsync and safeParseAsync async support for asynchronous refinements.

Schema Composition: z.object.requires exact shape; strict(true) removes unknown keys; default values via default().

Type Utilities: z.infer<Type>; z.input<Type> to extract input type.


## Reference Details
Function z.string(): ZodString
Class ZodString extends ZodType<string, ZodStringDef, string> {
  min(min: number, message?: string): this;
  max(max: number, message?: string): this;
  length(exact: number, message?: string): this;
  email(message?: string): this;
  url(message?: string): this;
  regex(pattern: RegExp, message?: string): this;
  uuid(message?: string): this;
  optional(): ZodOptional<this>;
  nullable(): ZodNullable<this>;
  default(def: string): ZodDefault<this>;
  transform<U>(fn: (val: string) => U): ZodEffects<string, U>;
  safeParse(data: unknown): { success: boolean; data?: string; error?: ZodError };
  parse(data: unknown): string;
}

Function z.number(): ZodNumber
Class ZodNumber extends ZodType<number, ZodNumberDef, number> {
  min(min: number, message?: string): this;
  max(max: number, message?: string): this;
  int(message?: string): this;
  positive(message?: string): this;
  negative(message?: string): this;
  nonnegative(message?: string): this;
  nonpositive(message?: string): this;
  finite(message?: string): this;
  safeParse(data: unknown): { success: boolean; data?: number; error?: ZodError };
  parse(data: unknown): number;
}

Function z.object<Shape>(shape: Shape): ZodObject<Shape>
Class ZodObject<Shape> extends ZodType<{ [K in keyof Shape]: Infer<Shape[K]> }, ZodObjectDef, unknown> {
  parse(data: unknown): { [K in keyof Shape]: Infer<Shape[K]> };
  safeParse(data: unknown): { success: boolean; data?: { [K in keyof Shape]: Infer<Shape[K]> }; error?: ZodError };
  partial(): ZodObject<Partial<Shape>>;
  required(): ZodObject<Shape>;
  extend<NewShape>(shape: NewShape): ZodObject<Shape & NewShape>;
  omit<Keys extends keyof Shape>(keys: Keys[]): ZodObject<Omit<Shape, Keys>>;
  pick<Keys extends keyof Shape>(keys: Keys[]): ZodObject<Pick<Shape, Keys>>;
  strict(strip?: boolean): ZodObject<Shape>;
}

Full Code Example:
import { z } from 'zod';

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(30),
  email: z.string().email(),
  age: z.number().int().min(0).max(120).optional(),
  preferences: z.record(z.string(), z.any()).default({}),
});

const result = userSchema.safeParse(input);
if (!result.success) {
  console.error(result.error.format());
} else {
  const user: unknown = result.data;
}

Best Practices:
Pin select rules early. Chain validations for clarity. Use safeParse for error handling. Leverage default() for fallback values.

Troubleshooting:
Command: node validate.js
Expected: parsed object or uncaught ZodError
If error, call error.format() to inspect field-level messages.

## Information Dense Extract
z.string():ZodString[min(number,msg),max, length, email, url, regex, uuid, optional, nullable, default, transform] safeParse(data):{success,data?,error?},parse(data):string; z.number():ZodNumber[min,max,int,positive,negative,nonnegative,nonpositive,finite]; z.object(shape):ZodObject[parse, safeParse, partial, required, extend, omit, pick, strict]; z.array(type):ZodArray[min,max,length]; z.union, z.intersection, z.tuple, z.enum, z.nativeEnum; transform<U>(fn):ZodEffects; refine(fn,msg), superRefine(fn); z.infer<Type>; ZodError.errors[{path,message,code}], error.format();

## Sanitised Extract
Table of Contents:
1. Schema Builders
2. Validation Methods
3. Type Inference
4. Transformation & Refinement
5. Schema Utilities
6. Error Handling

1. Schema Builders
 z.string(): ZodString
 z.number(): ZodNumber
 z.boolean(): ZodBoolean
 z.object(shape: Record<string, ZodType>): ZodObject<Shape>
 z.array(type: ZodType): ZodArray<T>
 z.tuple(types: ZodType[]): ZodTuple
 z.union(schemas: ZodType[]): ZodUnion
 z.intersection(a: ZodType, b: ZodType): ZodIntersection
 z.enum(values: [string, ...string[]]): ZodEnum
 z.nativeEnum(E: object): ZodNativeEnum

2. Validation Methods
 schema.parse(data: unknown): T
 schema.safeParse(data: unknown): { success: boolean; data?: T; error?: ZodError }
 schema.parseAsync(data: unknown): Promise<T>
 schema.safeParseAsync(data: unknown): Promise<{ success: boolean; data?: T; error?: ZodError }>

3. Type Inference
 type T = z.infer<typeof schema>

4. Transformation & Refinement
 schema.transform<U>(fn: (val: T) => U): ZodEffects<T, U>
 schema.refine(predicate: (val: T) => boolean, message?: string): this
 schema.superRefine((val: T, ctx: RefinementCtx) => void): this

5. Schema Utilities
 objectSchema.partial(): ZodObject<Partial<Shape>>
 objectSchema.required(): ZodObject<Shape>
 objectSchema.extend<NewShape>(shape: NewShape): ZodObject<Shape & NewShape>
 objectSchema.omit<Keys extends keyof Shape>(keys: Keys[]): ZodObject<Omit<Shape, Keys>>
 objectSchema.pick<Keys extends keyof Shape>(keys: Keys[]): ZodObject<Pick<Shape, Keys>>
 objectSchema.strict(strip?: boolean): ZodObject<Shape>

6. Error Handling
 error.errors: { path: (string | number)[]; message: string; code: string }[]
 error.format(): Record<string, { _errors: string[] }>

## Original Source
Zod Official Documentation
https://zod.dev

## Digest of ZOD_API

# Zod API Reference

## Schema Builders

z.string(): Returns ZodString
z.number(): Returns ZodNumber
z.boolean(): Returns ZodBoolean
z.object(shape: Record<string, ZodType>): Returns ZodObject
z.array(type: ZodType): Returns ZodArray
z.tuple(types: ZodType[]): Returns ZodTuple
z.union(schemas: ZodType[]): Returns ZodUnion
z.intersection(a: ZodType, b: ZodType): Returns ZodIntersection
z.enum(values: [string, ...string[]]): Returns ZodEnum
z.nativeEnum(E: object): Returns ZodNativeEnum

## Validation Methods

parse(data: unknown): T  
safeParse(data: unknown): { success: boolean; data?: T; error?: ZodError }  
parseAsync(data: unknown): Promise<T>  
safeParseAsync(data: unknown): Promise<{ success: boolean; data?: T; error?: ZodError }>

## Type Inference

type Output = z.infer<typeof schema>

## Transformation & Refinement

transform<U>(fn: (val: T) => U): ZodEffects<T, U>  
refine(predicate: (val: T) => boolean, message?: string): this  
superRefine((val: T, ctx: RefinementCtx) => void): this

## Schema Utilities

partial(): ZodObject<Partial<Shape>>  
required(): ZodObject<Shape>  
extend<NewShape>(shape: NewShape): ZodObject<Shape & NewShape>  
omit<Keys extends keyof Shape>(keys: Keys[]): ZodObject<Omit<Shape, Keys>>  
pick<Keys extends keyof Shape>(keys: Keys[]): ZodObject<Pick<Shape, Keys>>  
strict(strip?: boolean): ZodObject<Shape>

## Error Handling

ZodError.errors: Array<{ path: (string | number)[]; message: string; code: string }>  
ZodError.format(): Record<string, { _errors: string[] }>

Date Retrieved: 2024-06-13
Attribution: Zod Official Documentation
Data Size: 0 bytes

## Attribution
- Source: Zod Official Documentation
- URL: https://zod.dev
- License: License: MIT
- Crawl Date: 2025-05-04T08:49:23.075Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-04
library/ZOD.md
# library/ZOD.md
# ZOD

## Crawl Summary
Exact Zod core schema constructors and their methods. String, number, boolean, object, array. Parsing and validation functions with signatures. Error object structure. Type inference utilities.

## Normalised Extract
Contents
 1 Schema Definitions
 2 Parsing and Validation
 3 Error Handling
 4 Type Inference

1 Schema Definitions
 z.string() returns ZodString. Methods min length, max length, email, url, uuid, regex
 z.number() returns ZodNumber. Methods min, max, int, positive, negative, nonnegative, nonpositive
 z.boolean() returns ZodBoolean
 z.object(shape) returns ZodObject. Methods strict, passtrough, partial, deepPartial, required, extend
 z.array(itemSchema) returns ZodArray. Methods min, max
 z.union([schemas]) returns ZodUnion
 z.intersection(schemaA, schemaB) returns ZodIntersection
 z.literal(value) returns ZodLiteral
 z.enum([values]) returns ZodEnum
 z.record(keySchema,valueSchema) returns ZodRecord
 z.tuple([schemas]) returns ZodTuple
 z.map(keySchema,valueSchema) returns ZodMap
 z.set(itemSchema) returns ZodSet
 z.promise(schema) returns ZodPromise
 z.lazy(fn) returns ZodLazy
 z.unknown() returns ZodUnknown
 z.any() returns ZodAny
 z.never() returns ZodNever
 z.null() returns ZodNull
 z.undefined() returns ZodUndefined
 z.optional(schema) wraps schema in ZodOptional
 z.nullable(schema) wraps schema in ZodNullable
 z.default(defaultValue) wraps schema in ZodDefault

2 Parsing and Validation
 parse(data) throws ZodError or returns parsed value
 safeParse(data) returns object shape { success: Boolean, data?, error? }
 parseAsync(data) async parse
 safeParseAsync(data) async safe parse
 refine(fn, { message }) add custom check
 transform(fn) apply mapping
 superRefine(fn) push issues manually
 catch(mapper) transform errors

o Effects mode
  strict mode drops unknown keys when object.strict()
 passtrough keeps unknown keys
 partial and deepPartial make all properties optional recursively

3 Error Handling
 ZodError.errors Array of issues with path and message and code
 setErrorMap(customMap) override global messages
 format() normalize into nested object of messages

4 Type Inference
 z.infer<typeof schema> extracts output type
 z.input<typeof schema> extracts input type

## Supplementary Details
Default parse options no config
 Safe parsing does type conversion by default only when using z.coerce variants
 Strict object strips unknown keys only after strict()
 Default error messages per code
 setErrorMap to override codes parsing to HTTP status mapping
 Use transform on z.preprocess for input coercion
 Support async refinements via refine returning Promise<boolean>
 ZodType<any,any,any> base generic with params Output, Def, Input
 ZodOptional Omit undefined in output, ZodNullable adds null to output type
 ZodDefault takes defaultValue and marks output type nonoptional

Common Patterns
 Validate request body express middleware
  const bodySchema = z.object({ name z.string(), age z.number().optional() })
  type BodyInput = z.infer<typeof bodySchema>
  app.post('/', (req,res) => { const result = bodySchema.safeParse(req.body) if(!result.success) return res.status(400).json(result.error.format()) else handle(result.data) })

Use zodResolver for react-hook-form integration

## Reference Details
API Constructors
 z.string() -> ZodString
 z.number() -> ZodNumber
 z.boolean() -> ZodBoolean
 z.object<Shape>(shape: Shape) -> ZodObject<Shape>
 z.array<T>(schema: ZodType<T>) -> ZodArray<ZodType<T>>
 z.union<T extends [ZodTypeAny, ...ZodTypeAny[]]>(types: T) -> ZodUnion<T>
 z.intersection<A extends ZodTypeAny,B extends ZodTypeAny>(a A, b B) -> ZodIntersection<A,B>
 z.literal<T extends string|number|boolean>(value: T) -> ZodLiteral<T>
 z.enum<T extends [string,...string[]]>(values: readonly T) -> ZodEnum<T>
 z.record<K extends ZodTypeAny,V extends ZodTypeAny>(key K, value V) -> ZodRecord<K,V>
 z.tuple<T extends [ZodTypeAny,...ZodTypeAny[]]>(schemas T) -> ZodTuple<T>
 z.map<K extends ZodTypeAny,V extends ZodTypeAny>(key K, value V) -> ZodMap<K,V>
 z.set<T extends ZodTypeAny>(schema T) -> ZodSet<T>
 z.promise<T>(schema ZodType<T>) -> ZodPromise<ZodType<T>>
 z.lazy<T>(getter: () -> ZodType<T>) -> ZodLazy<T>
 z.any() -> ZodAny
 z.unknown() -> ZodUnknown
 z.never() -> ZodNever
 z.null() -> ZodNull
 z.undefined() -> ZodUndefined
 z.optional<T>(schema ZodType<T>) -> ZodOptional<ZodType<T>>
 z.nullable<T>(schema ZodType<T>) -> ZodNullable<ZodType<T>>
 z.default<T>(schema ZodType<T>, defaultValue T) -> ZodDefault<ZodType<T>>

Instance Methods
 .min(n Number, message String?) returns this
 .max(n Number, message String?) returns this
 .int(message String?) returns this
 .positive(message String?) returns this
 .email(message String?) returns this
 .strict() returns extended object schema
 .passthrough() returns extended object schema
 .partial() returns extended object schema
 .deepPartial() returns extended object schema
 .refine(check: Value->Boolean|Promise<Boolean>, options {message String, path Array<String>}) returns this
 .transform(transformer: Value->Any|Promise<Any>) returns ZodType<Any>
 .superRefine((val,ctx)->void) returns this
 .nullable() returns ZodNullable
 .optional() returns ZodOptional
 .default(def) returns ZodDefault
 .catch(mapper: (err ZodError)->Any) returns ZodType

Parsing Methods
 parse(data Any) throws ZodError
 safeParse(data Any) -> { success Boolean, data Any, error ZodError }
 parseAsync(data Any) -> Promise<Type>
 safeParseAsync(data Any) -> Promise<{ success Boolean, data Any, error ZodError }>

Error Type
 ZodError extends Error
  properties:
   issues Array<{ path Array<string|number>, message string, code string, fatal boolean }>
  methods:
   format() -> Record<string,any>
   toString() -> string

Code Examples
 const userSchema = z.object({ id z.string().uuid(), name z.string().min(1), age z.number().int().nonnegative(), email z.string().email() })
 type User = z.infer<typeof userSchema>
 const parsed = await userSchema.parseAsync(input)

Best Practices
 Use safeParse in HTTP endpoints to avoid exceptions
 Use z.coerce.number() for string input that needs conversion
 Chain .refine for business logic checks
 Preprocess inputs with z.preprocess(castFn, schema)

Troubleshooting
 If parse throws unknown error inspect error.issues
 Format errors for clients with error.format()
 For missing properties ensure .strict() or .passthrough() called correctly
 For async refinements await parseAsync


## Information Dense Extract
z.string, z.number, z.boolean, z.object(shape), z.array(item), z.union, z.intersection, z.literal, z.enum, z.record, z.tuple, z.map, z.set, z.promise, z.lazy. Methods: min, max, email, url, uuid, regex, int, positive, negative, nonnegative, nonpositive, strict, passtrough, partial, deepPartial, required, extend, refine(check,options), transform(fn), superRefine, nullable, optional, default, catch. Parsing: parse, safeParse, parseAsync, safeParseAsync. Error: ZodError.issues array. Type inference via z.infer. Common patterns: Express middleware, react-hook-form resolver. Defaults: strict drops unknown, passtrough keeps, safeParse returns success flag. Coercion via z.coerce variants or preprocess. Set global errorMap via setErrorMap.

## Sanitised Extract
Contents
 1 Schema Definitions
 2 Parsing and Validation
 3 Error Handling
 4 Type Inference

1 Schema Definitions
 z.string() returns ZodString. Methods min length, max length, email, url, uuid, regex
 z.number() returns ZodNumber. Methods min, max, int, positive, negative, nonnegative, nonpositive
 z.boolean() returns ZodBoolean
 z.object(shape) returns ZodObject. Methods strict, passtrough, partial, deepPartial, required, extend
 z.array(itemSchema) returns ZodArray. Methods min, max
 z.union([schemas]) returns ZodUnion
 z.intersection(schemaA, schemaB) returns ZodIntersection
 z.literal(value) returns ZodLiteral
 z.enum([values]) returns ZodEnum
 z.record(keySchema,valueSchema) returns ZodRecord
 z.tuple([schemas]) returns ZodTuple
 z.map(keySchema,valueSchema) returns ZodMap
 z.set(itemSchema) returns ZodSet
 z.promise(schema) returns ZodPromise
 z.lazy(fn) returns ZodLazy
 z.unknown() returns ZodUnknown
 z.any() returns ZodAny
 z.never() returns ZodNever
 z.null() returns ZodNull
 z.undefined() returns ZodUndefined
 z.optional(schema) wraps schema in ZodOptional
 z.nullable(schema) wraps schema in ZodNullable
 z.default(defaultValue) wraps schema in ZodDefault

2 Parsing and Validation
 parse(data) throws ZodError or returns parsed value
 safeParse(data) returns object shape { success: Boolean, data?, error? }
 parseAsync(data) async parse
 safeParseAsync(data) async safe parse
 refine(fn, { message }) add custom check
 transform(fn) apply mapping
 superRefine(fn) push issues manually
 catch(mapper) transform errors

o Effects mode
  strict mode drops unknown keys when object.strict()
 passtrough keeps unknown keys
 partial and deepPartial make all properties optional recursively

3 Error Handling
 ZodError.errors Array of issues with path and message and code
 setErrorMap(customMap) override global messages
 format() normalize into nested object of messages

4 Type Inference
 z.infer<typeof schema> extracts output type
 z.input<typeof schema> extracts input type

## Original Source
Zod Official Documentation
https://zod.dev

## Digest of ZOD

# Zod Core Schema API

## z.string()
  Signature  z.string() -> ZodString
  Description  String schema, supports min max length checks
  Methods
    min(minLength Number, message String?) -> ZodString
    max(maxLength Number, message String?) -> ZodString
    email(message String?) -> ZodString
    url(message String?) -> ZodString
    uuid(message String?) -> ZodString
    regex(pattern RegExp, message String?) -> ZodString

## z.number()
  Signature  z.number() -> ZodNumber
  Description  Number schema, supports int checks and bounds
  Methods
    min(minValue Number, message String?) -> ZodNumber
    max(maxValue Number, message String?) -> ZodNumber
    int(message String?) -> ZodNumber
    positive(message String?) -> ZodNumber
    negative(message String?) -> ZodNumber
    nonnegative(message String?) -> ZodNumber
    nonpositive(message String?) -> ZodNumber

## z.boolean()
  Signature  z.boolean() -> ZodBoolean

## z.object()
  Signature  z.object(shape Object<Schema>) -> ZodObject
  Methods
    strict() -> ZodObject
    passtrough() -> ZodObject
    partial() -> ZodObject
    deepPartial() -> ZodObject
    required() -> ZodObject
    extend(shape Object<Schema>) -> ZodObject

## z.array()
  Signature  z.array(item Schema) -> ZodArray
  Methods
    min(minLength Number, message String?) -> ZodArray
    max(maxLength Number, message String?) -> ZodArray

## Parsing and Validation
  parse(data Any) -> Type
  safeParse(data Any) -> { success Boolean, data Any, error ZodError }
  parseAsync(data Any) -> Promise<Type>
  safeParseAsync(data Any) -> Promise<{ success Boolean, data Any, error ZodError }>

## Error Handling
  ZodError
    .errors  Array< { path Array<String|Number>, message String, code String } >
    .format() -> Record<String,Any>

## Type Inference
  type Input = z.infer<typeof schema>
  type Output = z.infer<typeof schema>

Date Retrieved 2024-06-15
Attribution  Zod Official Documentation
Data Size 25kb

## Attribution
- Source: Zod Official Documentation
- URL: https://zod.dev
- License: License: MIT
- Crawl Date: 2025-05-04T04:49:19.872Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-04
