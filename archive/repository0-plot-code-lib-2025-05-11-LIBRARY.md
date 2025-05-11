library/COMMANDER.md
# library/COMMANDER.md
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
library/EXPRESSION_PARSING.md
# library/EXPRESSION_PARSING.md
# EXPRESSION_PARSING

## Crawl Summary
Evaluate: math.evaluate(expr: string|string[], scope?: Map|Object|CustomMap) → any. Wraps Object into ObjectWrappingMap, uses PartitionedMap for functions. Compile: math.compile(expr: string|string[]) → CodeObject{ evaluate(scope?: Map|Object) → any }. Parse: math.parse(expr: string|string[]) → Node{ compile(), toString(): string, toTex(): string }. Parser: math.parser() → Parser{ clear(): void, evaluate(expr: string): any, get(name: string): any, getAll(): Object, getAllAsMap(): Map, remove(name: string): void, set(name: string, value: any): void }. Scope: accepts Object, Map, or custom Map interface; Object is wrapped, Map avoids blacklist enforcement.

## Normalised Extract
Table of Contents:
1 Evaluate
2 Compile
3 Parse
4 Parser
5 Scope

1 Evaluate
Signature: math.evaluate(expr: string|string[], scope?: Map|Object|CustomMap) → any
Scope: implements get, set, keys, has
Object scope wrapped by ObjectWrappingMap; custom functions use PartitionedMap

2 Compile
Signature: math.compile(expr: string|string[]) → CodeObject
CodeObject.evaluate(scope?: Map|Object) → any
Compile once, evaluate repeatedly

3 Parse
Signature: math.parse(expr: string|string[]) → Node
Node.compile() → CodeObject; Node.evaluate via code.evaluate
Node.toString() → string; Node.toTex() → string

4 Parser
Creation: const parser = math.parser()
Methods:
 clear(): void
 evaluate(expr: string): any
 get(name: string): any
 getAll(): Object
 getAllAsMap(): Map
 remove(name: string): void
 set(name: string, value: any): void

5 Scope
Allowed types: Plain Object, ES6 Map, CustomMap (get/set/keys/has)
Object scope wrapped automatically; Map avoids blacklist enforcement

## Supplementary Details
• Scope Implementation: ObjectWrappingMap wraps plain objects; PartitionedMap separates function parameters and original scope. • Parameter Types: expr must be UTF-8 string or array of strings. • Return Types: evaluate() returns number, BigNumber, Complex, Fraction, unit, matrix, or string based on expression. • Map Interface: get(key): any; set(key,value): void; keys(): Iterable<string>; has(key): boolean. • Reuse Pattern: const code = math.compile(expr); code.evaluate(scope) inside loops. • CustomMap: any class implementing Map interface can be used for domain-specific storage.

## Reference Details
API Specifications:

math.evaluate(expr: string|string[], scope?: Map<string,any>|object|CustomMap): any
Throws: SyntaxError for invalid expr; PermissionError for blacklisted symbols when using object scope.
Example:
const result = math.evaluate('a*b', new Map([['a',3],['b',4]])) // 12

math.compile(expr: string|string[]): CodeObject
CodeObject.evaluate(scope?: Map<string,any>|object): any
Example:
const code = math.compile('sqrt(2)'); console.log(code.evaluate()) //1.4142...

math.parse(expr: string|string[]): Node
Node.compile(): CodeObject
Node.toString(): string
Node.toTex(): string
Example:
const node = math.parse('x^2+y^2'); const code = node.compile(); console.log(code.evaluate({x:3,y:4})) //25

math.parser(): Parser
Parser.clear(): void
Parser.evaluate(expr: string): any
Parser.get(name: string): any
Parser.getAll(): object
Parser.getAllAsMap(): Map<string,any>
Parser.remove(name: string): void
Parser.set(name: string, value: any): void
Example:
const p = math.parser(); p.set('x',5); console.log(p.evaluate('x+2')) //7

Best Practices:
• Use ES6 Map for full symbol definition and to bypass blacklist.
• Compile expressions outside loops to improve performance.
• Use parser for stateful workflows requiring variable retention.

Troubleshooting:
1. Error: SyntaxError: Parenthesis ) expected at char 5
 Command: node -e "console.log(require('mathjs').evaluate('2+'))"
2. PermissionError: Symbol import is blacklisted
 Workaround: use parser or Map scope:
  node -e "const m=require('mathjs'); console.log(m.evaluate('import', new Map()))"
3. Incorrect result with plain Object scope due to property collision
 Solution: use Map scope to isolate variables.

## Information Dense Extract
math.evaluate(expr: string|string[], scope?: Map|Object|CustomMap)=any; math.compile(expr: string|string[])→{evaluate(scope?:Map|Object):any}; math.parse(expr: string|string[])→Node{compile():CodeObject,toString():string,toTex():string}; math.parser():Parser{clear():void,evaluate(expr:string):any,get(name:string):any,getAll():object,getAllAsMap():Map,remove(name:string):void,set(name:string,value:any):void}; scope types: Plain Object wrapped by ObjectWrappingMap, ES6 Map avoids blacklist, CustomMap allowed (get,set,keys,has).

## Sanitised Extract
Table of Contents:
1 Evaluate
2 Compile
3 Parse
4 Parser
5 Scope

1 Evaluate
Signature: math.evaluate(expr: string|string[], scope?: Map|Object|CustomMap)  any
Scope: implements get, set, keys, has
Object scope wrapped by ObjectWrappingMap; custom functions use PartitionedMap

2 Compile
Signature: math.compile(expr: string|string[])  CodeObject
CodeObject.evaluate(scope?: Map|Object)  any
Compile once, evaluate repeatedly

3 Parse
Signature: math.parse(expr: string|string[])  Node
Node.compile()  CodeObject; Node.evaluate via code.evaluate
Node.toString()  string; Node.toTex()  string

4 Parser
Creation: const parser = math.parser()
Methods:
 clear(): void
 evaluate(expr: string): any
 get(name: string): any
 getAll(): Object
 getAllAsMap(): Map
 remove(name: string): void
 set(name: string, value: any): void

5 Scope
Allowed types: Plain Object, ES6 Map, CustomMap (get/set/keys/has)
Object scope wrapped automatically; Map avoids blacklist enforcement

## Original Source
Math.js Expression Evaluation
https://mathjs.org/docs/expressions/parsing.html

## Digest of EXPRESSION_PARSING

# Expression Parsing and Evaluation (Math.js)
Retrieved: 2024-06-24
Source: https://mathjs.org/docs/expressions/parsing.html

# Evaluate

Signature:
math.evaluate(expr)
math.evaluate(expr, scope)
math.evaluate([expr1, expr2, ...])
math.evaluate([expr1, expr2, ...], scope)

Parameters:
• expr: string or array of strings
• scope (optional): Map | Object | custom Map interface (methods get, set, keys, has)

Behavior:
• Resolves symbols and writes assigned variables/functions into scope
• Wraps plain Object into ObjectWrappingMap
• Uses PartitionedMap for custom functions

# Compile

Signature:
math.compile(expr)
math.compile([expr1, expr2, ...])

Returns:
{ evaluate(scope?) → any }

Parameters:
• expr: string or array of strings
• scope (optional when calling evaluate): Map | Object

Behavior:
• Parses and compiles once, reuses code.evaluate for repeated evaluation

# Parse

Signature:
math.parse(expr)
math.parse([expr1, expr2, ...])

Returns:
Node

Node API:
• node.compile() → { evaluate(scope?) → any }
• node.toString() → string
• node.toTex() → string

Parameters:
• expr: string or array of strings
• scope (optional when evaluating code): Map | Object

# Parser

Creation:
const parser = math.parser()

Parser Methods:
• parser.clear() → void
• parser.evaluate(expr: string) → any
• parser.get(name: string) → any
• parser.getAll() → Object
• parser.getAllAsMap() → Map
• parser.remove(name: string) → void
• parser.set(name: string, value: any) → void

# Scope

Allowed Types:
• Plain JavaScript Object
• ES6 Map
• Custom class implementing Map interface (get, set, keys, has)

Notes:
• evaluate enforces symbol blacklist on Object scope
• Use Map scope to bypass blacklist

## Attribution
- Source: Math.js Expression Evaluation
- URL: https://mathjs.org/docs/expressions/parsing.html
- License: Apache-2.0
- Crawl Date: 2025-05-11T06:06:03.716Z
- Data Size: 27468012 bytes
- Links Found: 40711

## Retrieved
2025-05-11
library/BASIC_SHAPES.md
# library/BASIC_SHAPES.md
# BASIC_SHAPES

## Crawl Summary
SVG uses a user coordinate system with origin at top-left. The <svg> root accepts width, height, viewBox and preserveAspectRatio for scaling. Basic shape elements include <rect>, <circle>, <ellipse>, <line>, <polyline>, and <polygon>, each with specific required attributes (e.g. rect: x,y,width,height; circle: cx,cy,r). Fill, stroke, stroke-width and opacity attributes control rendering. Common pitfalls include missing fill/stroke and undefined viewport. Best practices include defining viewBox for responsiveness, grouping with <g>, and using half-pixel offsets for sharp strokes.

## Normalised Extract
Table of Contents:
1 Coordinate System
2 Rectangle (<rect>)
3 Circle (<circle>)
4 Ellipse (<ellipse>)
5 Line (<line>)
6 Polyline (<polyline>)
7 Polygon (<polygon>)
8 Best Practices & Troubleshooting

1 Coordinate System
 User units default to px. <svg> attributes: width, height, viewBox="minX minY width height", preserveAspectRatio="align meetOrSlice".

2 Rectangle (<rect>)
 Required: x (default 0), y (default 0), width (>0), height (>0). Optional corner radii: rx, ry. Styling: fill, fill-opacity, stroke, stroke-width, stroke-opacity.

3 Circle (<circle>)
 Required: cx (default 0), cy (default 0), r (>0). Styling same as <rect>.

4 Ellipse (<ellipse>)
 Required: cx, cy, rx (>0), ry (>0). Styling same.

5 Line (<line>)
 Required: x1, y1, x2, y2. Must set stroke and stroke-width to render.

6 Polyline (<polyline>)
 Required: points="x1,y1 x2,y2…". Default fill="none". Set stroke & stroke-width.

7 Polygon (<polygon>)
 Same as polyline but auto-closed and default fill="black".

8 Best Practices & Troubleshooting
 Always define viewport via width/height or viewBox. Use viewBox+preserveAspectRatio for responsiveness. Missing fill/stroke causes invisibility. Group shapes with <g>. To render crisp lines, offset coordinates by 0.5.

## Supplementary Details
• Units: default user unit = px; append unit identifiers for other units.
• viewBox: defines user coordinate system origin and scale. Syntax: viewBox="minX minY width height".
• preserveAspectRatio values: xMinYMin, xMidYMid, xMaxYMax + meet or slice.
• Grouping: <g transform="translate(tx,ty) scale(s)"> … </g>.
• Sharp 1px strokes: coordinate align on half-pixel (e.g. x="0.5").
• Nested shapes inherit current fill, stroke properties unless overridden.
• When animating shape attributes, use SMIL or CSS animations on attributes (e.g. <animate attributeName="r" from="10" to="50" dur="2s"/>).

## Reference Details
Element: <rect>
 Attributes:
  x: number; defaults 0
  y: number; defaults 0
  width: number; required ≥0
  height: number; required ≥0
  rx: number; defaults 0
  ry: number; defaults 0
  fill: color; defaults black
  fill-opacity: 0.0–1.0; default 1.0
  stroke: color; defaults none
  stroke-width: number; default 1
  stroke-opacity: 0.0–1.0; default 1.0
Example:
<rect x="10" y="20" width="100" height="50" rx="5" ry="5" fill="#0F0" stroke="#060" stroke-width="2"/>

Element: <circle>
 Attributes:
  cx: number; default 0
  cy: number; default 0
  r: number; required >0
  same style attributes as <rect>
Example:
<circle cx="50" cy="50" r="40" fill="red" stroke="black" stroke-width="5"/>

Element: <ellipse>
 Attributes:
  cx, cy as above
  rx: number; required >0
  ry: number; required >0
Example:
<ellipse cx="75" cy="50" rx="70" ry="30" fill="purple"/>

Element: <line>
 Attributes:
  x1, y1, x2, y2: number; required
  stroke: color; required
  stroke-width: number; default 1
Example:
<line x1="10" y1="10" x2="200" y2="10" stroke="#333" stroke-width="2"/>

Element: <polyline>
 Attributes:
  points: coord list; required
  fill: none by default
  stroke: color; required
  stroke-width: number; default 1
Example:
<polyline points="0,0 50,25 50,75 100,100" stroke="blue" fill="none" stroke-width="3"/>

Element: <polygon>
 Same as <polyline> but auto-closed and default fill="black".

Troubleshooting:
 If nothing renders, check that either fill or stroke is set and viewport size is defined. Use browser devtools to inspect computed coordinates. For unexpected scaling, verify viewBox and preserveAspectRatio syntax.


## Information Dense Extract
SVG viewport: width,height,viewBox(minX,minY,w,h),preserveAspectRatio(align meet|slice). Units: default px. Shapes:
rect(x,y, width,height, rx?,ry?)
circle(cx,cy, r)
ellipse(cx,cy, rx,ry)
line(x1,y1, x2,y2)
polyline(points)
polygon(points). Style attrs: fill(color),fill-opacity, stroke(color),stroke-width,stroke-opacity. Defaults: rect fill black, polygon fill black, others fill none. Must set stroke for lines. Use viewBox for responsive. Offset coordinates by 0.5 for crisp strokes.

## Sanitised Extract
Table of Contents:
1 Coordinate System
2 Rectangle (<rect>)
3 Circle (<circle>)
4 Ellipse (<ellipse>)
5 Line (<line>)
6 Polyline (<polyline>)
7 Polygon (<polygon>)
8 Best Practices & Troubleshooting

1 Coordinate System
 User units default to px. <svg> attributes: width, height, viewBox='minX minY width height', preserveAspectRatio='align meetOrSlice'.

2 Rectangle (<rect>)
 Required: x (default 0), y (default 0), width (>0), height (>0). Optional corner radii: rx, ry. Styling: fill, fill-opacity, stroke, stroke-width, stroke-opacity.

3 Circle (<circle>)
 Required: cx (default 0), cy (default 0), r (>0). Styling same as <rect>.

4 Ellipse (<ellipse>)
 Required: cx, cy, rx (>0), ry (>0). Styling same.

5 Line (<line>)
 Required: x1, y1, x2, y2. Must set stroke and stroke-width to render.

6 Polyline (<polyline>)
 Required: points='x1,y1 x2,y2'. Default fill='none'. Set stroke & stroke-width.

7 Polygon (<polygon>)
 Same as polyline but auto-closed and default fill='black'.

8 Best Practices & Troubleshooting
 Always define viewport via width/height or viewBox. Use viewBox+preserveAspectRatio for responsiveness. Missing fill/stroke causes invisibility. Group shapes with <g>. To render crisp lines, offset coordinates by 0.5.

## Original Source
MDN Scalable Vector Graphics Reference
https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial

## Digest of BASIC_SHAPES

# Coordinate System

SVG defines a user coordinate system whose origin (0,0) is the top-left corner of the viewport. Coordinates and lengths default to "px" units unless a unit identifier (e.g. "cm", "em") is appended. The root <svg> element can include:

• width, height: viewport size (required unless inherited)
• viewBox: "minX minY width height" to define user units and scaling
• preserveAspectRatio: "[align] [meetOrSlice]" (default "xMidYMid meet") to control scaling alignment

# Rectangle: <rect>

Syntax:
<rect x="{number}" y="{number}" width="{number}" height="{number}" rx="{number}" ry="{number}" fill="{color}" stroke="{color}" stroke-width="{number}"/>

Attributes:
• x, y (number; default 0): top-left corner of the rectangle in user units
• width, height (number; required ≥0): size of the rectangle
• rx, ry (number; default 0): horizontal and vertical corner radii
• fill, fill-opacity: paint and opacity of interior
• stroke, stroke-width, stroke-opacity: outline paint, width, and opacity

Example:
<svg width="200" height="100" viewBox="0 0 200 100">
  <rect x="10" y="10" width="180" height="80" rx="10" ry="10" fill="#4A90E2" stroke="#004A80" stroke-width="4"/>
</svg>

# Circle: <circle>

Syntax:
<circle cx="{number}" cy="{number}" r="{number}" fill="{color}" stroke="{color}" stroke-width="{number}"/>

Attributes:
• cx, cy (number; default 0): center coordinates
• r (number; required >0): radius
• style attributes for fill, stroke as above

Example:
<svg width="120" height="120">
  <circle cx="60" cy="60" r="50" fill="red" stroke="black" stroke-width="5"/>
</svg>

# Ellipse: <ellipse>

Syntax:
<ellipse cx="{number}" cy="{number}" rx="{number}" ry="{number}"/>

Attributes:
• cx, cy (number; default 0): center
• rx, ry (number; required >0): radii on x and y axes

# Line: <line>

Syntax:
<line x1="{number}" y1="{number}" x2="{number}" y2="{number}"/>

Attributes:
• x1, y1: start point
• x2, y2: end point
• stroke, stroke-width required to make line visible

# Polyline: <polyline>

Syntax:
<polyline points="x1,y1 x2,y2 x3,y3…"/>

Attributes:
• points (list of coordinate pairs; required)
• fill default none; stroke must be set

# Polygon: <polygon>

Same as polyline but interior automatically closed and fill defaults to black.

# Best Practices & Troubleshooting

• Always set width and height or viewBox on the root <svg> to define coordinate system.
• If shape not visible, ensure fill or stroke (with stroke-width>0) is defined.
• Use viewBox + preserveAspectRatio for responsive graphics.
• When combining shapes, group them in <g> and apply transformations collectively.
• For crisp 1px lines, use half-pixel offsets (e.g. x1="0.5", x2="100.5").

Retrieved: 2025-06-01
Data size: 1.1 MB


## Attribution
- Source: MDN Scalable Vector Graphics Reference
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial
- License: CC-BY-SA
- Crawl Date: 2025-05-11T03:21:08.742Z
- Data Size: 1118611 bytes
- Links Found: 29937

## Retrieved
2025-05-11
library/SHARP.md
# library/SHARP.md
# SHARP

## Crawl Summary
Module: sharp (v libvips-based). Install via npm/ yarn/ pnpm/ bun/ deno. Constructor new Sharp(input, options) with input types Buffer|TypedArray|string|Array and options { failOn, limitInputPixels, unlimited, autoOrient, sequentialRead, density, ignoreIcc, pages, page, subifd, level, pdfBackground, animated, raw, create, text, join }. Core chainable methods: resize, rotate, extract, composite, gamma. Output methods: toFile(file, callback) ⇒ Promise<{format, size, width, height, channels,...}>, toBuffer(options, callback) ⇒ Promise<Buffer|{data,info}>. Metadata: metadata() ⇒ Promise<{format, size, width, height, space, channels, depth, density, chromaSubsampling, isProgressive, isPalette, bitsPerSample,...}>. Stats: stats() ⇒ Promise<{channels:[{min,max,sum,squaresSum,mean,stdev,minX,minY,maxX,maxY}], isOpaque, entropy, sharpness, dominant:{r,g,b}}>. Format-specific: jpeg({quality, progressive, chromaSubsampling, optimiseCoding, mozjpeg, trellisQuantisation, overshootDeringing, optimiseScans, quantisationTable, force}), png({progressive, compressionLevel, adaptiveFiltering, palette, quality, effort, colours, dither, force}), webp({quality, alphaQuality, lossless, nearLossless, smartSubsample, smartDeblock, preset, effort, loop, delay, minSize, mixed, force}), gif({reuse, progressive, colours, effort, dither, interFrameMaxError, interPaletteMaxError, loop, delay, force}), tiff({quality, compression, predictor, pyramid, tile, tileWidth, tileHeight, xres, yres, resolutionUnit, bitdepth, miniswhite}), avif({quality, lossless, effort, chromaSubsampling, bitdepth}), heif({compression, quality, lossless, effort, chromaSubsampling, bitdepth}). Env: cross-platform flags (--cpu, --os, --libc), custom libvips via pkg-config, build-from-source flags (SHARP_IGNORE_GLOBAL_LIBVIPS, SHARP_FORCE_GLOBAL_LIBVIPS), wasm support, bundler externals, electron asarUnpack, AWS Lambda packaging, memory allocator recommendations (jemalloc on glibc), fontconfig path.


## Normalised Extract
Table of Contents:
1. Installation  
2. Constructor & Options  
3. Core Processing Methods  
4. Output Methods  
5. Metadata & Statistics Methods  
6. Format-Specific Output Options  
7. Environment & Build Configuration  
8. Bundler & Deployment Integration  
9. Troubleshooting Procedures  

1. Installation
npm install sharp  
pnpm add sharp  
yarn add sharp  
bun add sharp  
deno run --allow-ffi ...

2. Constructor & Options
Signature: new Sharp(input?, options?) ⇒ Sharp  
input types: Buffer|ArrayBuffer|TypedArray|string|Array  
options:
  failOn: none|truncated|error|warning (default warning)  
  limitInputPixels: number|true|false (default 268402689)  
  unlimited: boolean (default false)  
  autoOrient: boolean (default false)  
  sequentialRead: boolean (default true)  
  density: number  
  ignoreIcc: boolean  
  pages: number (-1 for all)  
  page: number (zero-based)  
  subifd: number  
  level: number  
  pdfBackground: string|Object  
  animated: boolean  
  raw: { width: number, height: number, channels: number, premultiplied?: boolean }  
  create: { width: number, height: number, channels: 3|4, background: ColorObject, noise?: { type: gaussian, mean: number, sigma: number } }  
  text: { text: string, font?: string, fontfile?: string, width?: number, height?: number, align?: left|center|right, justify?: boolean, dpi?: number, rgba?: boolean, spacing?: number, wrap?: word|char|word-char|none }  
  join: { across: number, shim: number, background?: ColorObject, animated?: boolean, halign?: left|center|right, valign?: top|center|bottom }

3. Core Processing Methods
resize(width?: number, height?: number, options?: { fit, position, background, kernel, withoutEnlargement, fastShrinkOnLoad }) ⇒ Sharp
rotate(angle?: number, options?: { background: ColorObject }) ⇒ Sharp
extract({ left: number, top: number, width: number, height: number }) ⇒ Sharp
composite([{ input: Buffer|string|Sharp, blend?: string, gravity?: string, tile?: boolean, top?: number, left?: number }]) ⇒ Sharp
gamma(gamma?: number) ⇒ Sharp

4. Output Methods
toFile(fileOut: string, callback?: (err, info) => void) ⇒ Promise<{ format, size, width, height, channels, premultiplied, cropOffsetLeft?, cropOffsetTop?, attentionX?, attentionY?, pageHeight?, pages?, textAutofitDpi? }>
toBuffer(options?: { resolveWithObject: boolean }, callback?: (err, data, info) => void) ⇒ Promise<Buffer|{ data: Buffer, info: InfoObject }>

5. Metadata & Statistics Methods
metadata(callback?: (err, metadata) => void) ⇒ Promise<{ format, size?, width, height, space, channels, depth, density?, chromaSubsampling?, isProgressive?, isPalette?, bitsPerSample?, pages?, pageHeight?, loop?, delay?, pagePrimary?, levels?, subifds?, background?, compression?, resolutionUnit?, hasProfile?, hasAlpha?, orientation?, exif?, icc?, iptc?, xmp?, tifftagPhotoshop?, formatMagick?, comments? }>
stats(callback?: (err, stats) => void) ⇒ Promise<{ channels: Array<{ min, max, sum, squaresSum, mean, stdev, minX, minY, maxX, maxY }>, isOpaque, entropy, sharpness, dominant: { r, g, b } }>

6. Format-Specific Output Options
jpeg(options?: { quality:1-100, progressive:boolean, chromaSubsampling:4:2:0|4:4:4, optimiseCoding:boolean, mozjpeg:boolean, trellisQuantisation:boolean, overshootDeringing:boolean, optimiseScans:boolean, quantisationTable:0-8, force:boolean }) ⇒ Sharp
png(options?: { progressive:boolean, compressionLevel:0-9, adaptiveFiltering:boolean, palette:boolean, quality:1-100, effort:1-10, colours:1-256, dither:0-1, force:boolean }) ⇒ Sharp
webp(options?: { quality:1-100, alphaQuality:0-100, lossless:boolean, nearLossless:boolean, smartSubsample:boolean, smartDeblock:boolean, preset:default|photo|picture|drawing|icon|text, effort:0-6, loop:number, delay:number|number[], minSize:boolean, mixed:boolean, force:boolean }) ⇒ Sharp
gif(options?: { reuse:boolean, progressive:boolean, colours:2-256, effort:1-10, dither:0-1, interFrameMaxError:0-32, interPaletteMaxError:0-256, loop:number, delay:number|number[], force:boolean }) ⇒ Sharp
tiff(options?: { quality:1-100, compression:none|jpeg|deflate|packbits|ccittfax4|lzw|webp|zstd|jp2k, predictor:none|horizontal|float, pyramid:boolean, tile:boolean, tileWidth:number, tileHeight:number, xres:number, yres:number, resolutionUnit:inch|cm, bitdepth:1|2|4|8|16, miniswhite:boolean }) ⇒ Sharp
avif(options?: { quality:1-100, lossless:boolean, effort:0-9, chromaSubsampling:4:2:0|4:4:4, bitdepth:8|10|12 }) ⇒ Sharp
heif(options: { compression: av1|hevc, quality:1-100, lossless:boolean, effort:0-9, chromaSubsampling:4:2:0|4:4:4, bitdepth:8|10|12 }) ⇒ Sharp

7. Environment & Build Configuration
Cross-platform install flags: npm install --cpu=<x64|arm64|wasm32> --os=<darwin|linux|win32> [--libc=<glibc|musl>]  
Custom libvips: require version ≥ config.libvips, pkg-config --modversion vips-cpp; unsupported on Windows and macOS Rosetta  
Build from source: npm install --build-from-source or detect global libvips; environment variables SHARP_IGNORE_GLOBAL_LIBVIPS, SHARP_FORCE_GLOBAL_LIBVIPS  
Required: C++17 compiler, node-addon-api ≥7, node-gyp ≥9

8. Bundler & Deployment Integration
webpack: externals: { 'sharp': 'commonjs sharp' }  
esbuild: external: ['sharp']  
electron-builder: asarUnpack: ['**/node_modules/sharp/**/*']  
electron-forge: packagerConfig.asar.unpack: '**/node_modules/{sharp,@img}/**/*'  
vite: build.rollupOptions.external: ['sharp']
AWS Lambda: include linux-x64|arm64 binaries; avoid symlinks; set binary media types in API Gateway; memory ≥1536 MB for performance

9. Troubleshooting Procedures
npm v10+ monorepo lockfile: use --os, --cpu, --libc flags  
pnpm: add sharp to ignoredBuiltDependencies or onlyBuiltDependencies  
Fontconfig error: set FONTCONFIG_PATH to custom config  
Canvas+sharp conflict on Windows: avoid mixing both modules in same process


## Supplementary Details
Installation Details:
• Ensure Node-API v9 runtime (Node.js ≥18.17.0 or ≥20.3.0).  
• For cross-platform packaging, specify npm_config_{platform,arch,libc} or use flags.  
• To use custom libvips: install globally, verify with pkg-config --modversion vips-cpp; set SHARP_FORCE_GLOBAL_LIBVIPS to override; unsupported on Windows/macOS under Rosetta.

Build Steps:
1. npm install sharp (or pnpm/yarn)  
2. If building from source: npm install --build-from-source sharp  
3. Export SHARP_IGNORE_GLOBAL_LIBVIPS or SHARP_FORCE_GLOBAL_LIBVIPS as needed  
4. Verify node-addon-api and node-gyp installed: npm install --save node-addon-api node-gyp

Memory Allocator Optimization:
• On glibc Linux, pre-load jemalloc: LD_PRELOAD=libjemalloc.so  
• Disable thread-based concurrency via SHARP_CONCURRENCY=1 if fragmentation occurs.

AWS Lambda Packaging:
• Build on Amazon Linux x64/ARM64 or cross compile with --cpu/--os flags  
• Bundle sharp binaries in node_modules rather than symlink  
• Set API Gateway binaryMediaTypes to ['*/*']

Bundler Integration:
• webpack: externals: { sharp: 'commonjs sharp' }  
• esbuild: externals: ['sharp']  
• electron-builder: asarUnpack sharp modules  
• vite: rollupOptions.external: ['sharp']

Font Rendering:
• On Linux, ensure fontconfig installed and fonts available.  
• Set PANGOCAIRO_BACKEND=fontconfig on macOS Homebrew.  
• In serverless, set FONTCONFIG_PATH to font config directory.


## Reference Details
Constructor:

Signature:
new Sharp(
  input?: Buffer|ArrayBuffer|TypedArray|string|Array,
  options?: {
    failOn?: 'none'|'truncated'|'error'|'warning',
    limitInputPixels?: number|boolean,
    unlimited?: boolean,
    autoOrient?: boolean,
    sequentialRead?: boolean,
    density?: number,
    ignoreIcc?: boolean,
    pages?: number,
    page?: number,
    subifd?: number,
    level?: number,
    pdfBackground?: string|{r:number,g:number,b:number,alpha:number},
    animated?: boolean,
    raw?: {width:number,height:number,channels:number,premultiplied?:boolean},
    create?: {width:number,height:number,channels:3|4,background:{r:number,g:number,b:number,alpha:number},noise?:{type:'gaussian',mean:number,sigma:number}},
    text?: {text:string,font?:string,fontfile?:string,width?:number,height?:number,align?:'left'|'center'|'right',justify?:boolean,dpi?:number,rgba?:boolean,spacing?:number,wrap?:'word'|'char'|'word-char'|'none'},
    join?: {across:number,shim:number,background?:{r:number,g:number,b:number,alpha:number},animated?:boolean,halign?:'left'|'center'|'right',valign?:'top'|'center'|'bottom'}
  }
) ⇒ Sharp

Throws: Error Invalid parameters

Events:
on('info', (info) ⇒ void) emitted with {format, size, width, height, channels, ...}
on('warning', (warning) ⇒ void)

Core Methods:
resize(
  width?: number,
  height?: number,
  options?: {
    fit?: 'cover'|'contain'|'fill'|'inside'|'outside',
    position?: string|{left:number,top:number},
    background?: {r:number,g:number,b:number,alpha:number},
    kernel?: 'nearest'|'cubic'|'mitchell'|'lanczos2'|'lanczos3',
    withoutEnlargement?: boolean,
    fastShrinkOnLoad?: boolean
  }
) ⇒ Sharp

rotate(
  angle?: number,
  options?: { background?: {r:number,g:number,b:number,alpha:number} }
) ⇒ Sharp

extract(
  region: { left:number, top:number, width:number, height:number }
) ⇒ Sharp

composite(
  overlay: Array<{ input: Buffer|string|Sharp, blend?: string, gravity?: string, tile?: boolean, left?: number, top?: number }>
) ⇒ Sharp

gamma(gamma?: number) ⇒ Sharp

clone() ⇒ Sharp

Pipeline example:
const pipeline = sharp('input.jpg').rotate();
pipeline.clone().resize(800,600).toFile('out1.jpg');
pipeline.clone().extract({left:10,top:10,width:100,height:100}).toFile('out2.jpg');

Output:

toFile(
  fileOut: string,
  callback?: (err: Error, info: {format:string,size:number,width:number,height:number,channels:number,premultiplied:boolean,cropOffsetLeft?:number,cropOffsetTop?:number,attentionX?:number,attentionY?:number,pageHeight?:number,pages?:number,textAutofitDpi?:number}) => void
) ⇒ Promise<{...}>  
Throws: Error Invalid parameters


toBuffer(
  options?: { resolveWithObject?: boolean },
  callback?: (err: Error, data: Buffer, info: InfoObject) => void
) ⇒ Promise<Buffer|{data:Buffer,info:InfoObject}>  
Throws: Error Invalid parameters


metadata(
  callback?: (err: Error, metadata: {
    format:string,size?:number,width:number,height:number,space:string,channels:number,depth:string,
    density?:number,chromaSubsampling?:string,isProgressive?:boolean,isPalette?:boolean,
    bitsPerSample?:number,pages?:number,pageHeight?:number,loop?:number,delay?:number[],
    pagePrimary?:number,levels?:any[],subifds?:number,background?:any,compression?:string,
    resolutionUnit?:string,hasProfile?:boolean,hasAlpha?:boolean,orientation?:number,
    exif?:Buffer,icc?:Buffer,iptc?:Buffer,xmp?:Buffer,tifftagPhotoshop?:Buffer,formatMagick?:string,comments?:Array<any>
  }) => void
) ⇒ Promise<Object>

stats(
  callback?: (err: Error, stats: { channels:Array<{min:number,max:number,sum:number,squaresSum:number,mean:number,stdev:number,minX:number,minY:number,maxX:number,maxY:number}>, isOpaque:boolean, entropy:number, sharpness:number, dominant:{r:number,g:number,b:number} }) => void
) ⇒ Promise<Object>

Format Methods:
jpeg(options?: {quality?:number,progressive?:boolean,chromaSubsampling?:string,optimiseCoding?:boolean,mozjpeg?:boolean,trellisQuantisation?:boolean,overshootDeringing?:boolean,optimiseScans?:boolean,quantisationTable?:number,force?:boolean}) ⇒ Sharp
png(options?: {progressive?:boolean,compressionLevel?:number,adaptiveFiltering?:boolean,palette?:boolean,quality?:number,effort?:number,colours?:number,dither?:number,force?:boolean}) ⇒ Sharp
webp(options?: {quality?:number,alphaQuality?:number,lossless?:boolean,nearLossless?:boolean,smartSubsample?:boolean,smartDeblock?:boolean,preset?:string,effort?:number,loop?:number,delay?:number|number[],minSize?:boolean,mixed?:boolean,force?:boolean}) ⇒ Sharp
gif(options?: {reuse?:boolean,progressive?:boolean,colours?:number,effort?:number,dither?:number,interFrameMaxError?:number,interPaletteMaxError?:number,loop?:number,delay?:number|number[],force?:boolean}) ⇒ Sharp
tiff(options?: {quality?:number,compression?:string,predictor?:string,pyramid?:boolean,tile?:boolean,tileWidth?:number,tileHeight?:number,xres?:number,yres?:number,resolutionUnit?:string,bitdepth?:number,miniswhite?:boolean}) ⇒ Sharp
avif(options?: {quality?:number,lossless?:boolean,effort?:number,chromaSubsampling?:string,bitdepth?:number}) ⇒ Sharp
heif(options: {compression:string,quality?:number,lossless?:boolean,effort?:number,chromaSubsampling?:string,bitdepth?:number}) ⇒ Sharp

Best Practices:
• Always specify width and height to avoid default identity transform.  
• Use clone() for multi-output pipelines.  
• Preload jemalloc on glibc systems.  
• Strip metadata with toBuffer({resolveWithObject:true}) then keepMetadata() if needed.  

Troubleshooting:
• npm install errors: run npm cache clean --force; remove node_modules; install with --build-from-source.  
• FONTCONFIG error: set FONTCONFIG_PATH=/path/to/fontconfig  
• Electron packaging: ensure asarUnpack includes sharp; rebuild native modules with electron-rebuild.


## Information Dense Extract
sharp: high-speed libvips-based Node.js image processing. Install: npm/yarn/pnpm/bun/deno. Construct: new Sharp(input?,options?) with input types Buffer|TypedArray|string|Array; options {failOn:(none|truncated|error|warning),limitInputPixels:number|boolean,unlimited:boolean,autoOrient:boolean,sequentialRead:boolean,density:number,ignoreIcc:boolean,pages:number,page:number,subifd:number,level:number,pdfBackground:Color,animated:boolean,raw:{width,height,channels,premultiplied},create:{width,height,channels,background,noise},text:{text,font,fontfile,width,height,align,justify,dpi,rgba,spacing,wrap},join:{across,shim,background,animated,halign,valign}}. Core: resize(w,h,{fit,position,background,kernel,withoutEnlargement,fastShrinkOnLoad}), rotate(angle,{background}), extract({left,top,width,height}), composite([{input,blend,gravity,tile,left,top}]), gamma(g), clone(). Output: toFile(path,cb) ⇒ Promise<{format,size,width,height,channels,premultiplied,cropOffsetLeft,cropOffsetTop,attentionX,attentionY,pageHeight,pages,textAutofitDpi}>, toBuffer({resolveWithObject},cb) ⇒ Promise<Buffer|{data,info}>. Metadata: metadata() ⇒ Promise<{format,size?,width,height,space,channels,depth,density?,chromaSubsampling?,isProgressive?,isPalette?,bitsPerSample?,pages?,pageHeight?,loop?,delay?,pagePrimary?,levels?,subifds?,background?,compression?,resolutionUnit?,hasProfile?,hasAlpha?,orientation?,exif?,icc?,iptc?,xmp?,tifftagPhotoshop?,formatMagick?,comments?}>. Stats: stats() ⇒ Promise<{channels:[{min,max,sum,squaresSum,mean,stdev,minX,minY,maxX,maxY}],isOpaque,entropy,sharpness,dominant:{r,g,b}}>. Formats: jpeg({quality,progressive,chromaSubsampling,optimiseCoding,mozjpeg,trellisQuantisation,overshootDeringing,optimiseScans,quantisationTable,force}), png({progressive,compressionLevel,adaptiveFiltering,palette,quality,effort,colours,dither,force}), webp({quality,alphaQuality,lossless,nearLossless,smartSubsample,smartDeblock,preset,effort,loop,delay,minSize,mixed,force}), gif({reuse,progressive,colours,effort,dither,interFrameMaxError,interPaletteMaxError,loop,delay,force}), tiff({quality,compression,predictor,pyramid,tile,tileWidth,tileHeight,xres,yres,resolutionUnit,bitdepth,miniswhite}), avif({quality,lossless,effort,chromaSubsampling,bitdepth}), heif({compression,quality,lossless,effort,chromaSubsampling,bitdepth}). Env: flags (--cpu,--os,--libc), SHARP_IGNORE_GLOBAL_LIBVIPS, SHARP_FORCE_GLOBAL_LIBVIPS, build-from-source, C++17,node-addon-api≥7,node-gyp≥9. Bundlers: externals/asarUnpack configurations. AWS Lambda: include correct binaries, avoid symlinks, binaryMediaTypes. Memory: use jemalloc on glibc. Fonts: fontconfig, FONTCONFIG_PATH. Troubleshoot: npm cache clean, electron-rebuild, set env vars.


## Sanitised Extract
Table of Contents:
1. Installation  
2. Constructor & Options  
3. Core Processing Methods  
4. Output Methods  
5. Metadata & Statistics Methods  
6. Format-Specific Output Options  
7. Environment & Build Configuration  
8. Bundler & Deployment Integration  
9. Troubleshooting Procedures  

1. Installation
npm install sharp  
pnpm add sharp  
yarn add sharp  
bun add sharp  
deno run --allow-ffi ...

2. Constructor & Options
Signature: new Sharp(input?, options?)  Sharp  
input types: Buffer|ArrayBuffer|TypedArray|string|Array  
options:
  failOn: none|truncated|error|warning (default warning)  
  limitInputPixels: number|true|false (default 268402689)  
  unlimited: boolean (default false)  
  autoOrient: boolean (default false)  
  sequentialRead: boolean (default true)  
  density: number  
  ignoreIcc: boolean  
  pages: number (-1 for all)  
  page: number (zero-based)  
  subifd: number  
  level: number  
  pdfBackground: string|Object  
  animated: boolean  
  raw: { width: number, height: number, channels: number, premultiplied?: boolean }  
  create: { width: number, height: number, channels: 3|4, background: ColorObject, noise?: { type: gaussian, mean: number, sigma: number } }  
  text: { text: string, font?: string, fontfile?: string, width?: number, height?: number, align?: left|center|right, justify?: boolean, dpi?: number, rgba?: boolean, spacing?: number, wrap?: word|char|word-char|none }  
  join: { across: number, shim: number, background?: ColorObject, animated?: boolean, halign?: left|center|right, valign?: top|center|bottom }

3. Core Processing Methods
resize(width?: number, height?: number, options?: { fit, position, background, kernel, withoutEnlargement, fastShrinkOnLoad })  Sharp
rotate(angle?: number, options?: { background: ColorObject })  Sharp
extract({ left: number, top: number, width: number, height: number })  Sharp
composite([{ input: Buffer|string|Sharp, blend?: string, gravity?: string, tile?: boolean, top?: number, left?: number }])  Sharp
gamma(gamma?: number)  Sharp

4. Output Methods
toFile(fileOut: string, callback?: (err, info) => void)  Promise<{ format, size, width, height, channels, premultiplied, cropOffsetLeft?, cropOffsetTop?, attentionX?, attentionY?, pageHeight?, pages?, textAutofitDpi? }>
toBuffer(options?: { resolveWithObject: boolean }, callback?: (err, data, info) => void)  Promise<Buffer|{ data: Buffer, info: InfoObject }>

5. Metadata & Statistics Methods
metadata(callback?: (err, metadata) => void)  Promise<{ format, size?, width, height, space, channels, depth, density?, chromaSubsampling?, isProgressive?, isPalette?, bitsPerSample?, pages?, pageHeight?, loop?, delay?, pagePrimary?, levels?, subifds?, background?, compression?, resolutionUnit?, hasProfile?, hasAlpha?, orientation?, exif?, icc?, iptc?, xmp?, tifftagPhotoshop?, formatMagick?, comments? }>
stats(callback?: (err, stats) => void)  Promise<{ channels: Array<{ min, max, sum, squaresSum, mean, stdev, minX, minY, maxX, maxY }>, isOpaque, entropy, sharpness, dominant: { r, g, b } }>

6. Format-Specific Output Options
jpeg(options?: { quality:1-100, progressive:boolean, chromaSubsampling:4:2:0|4:4:4, optimiseCoding:boolean, mozjpeg:boolean, trellisQuantisation:boolean, overshootDeringing:boolean, optimiseScans:boolean, quantisationTable:0-8, force:boolean })  Sharp
png(options?: { progressive:boolean, compressionLevel:0-9, adaptiveFiltering:boolean, palette:boolean, quality:1-100, effort:1-10, colours:1-256, dither:0-1, force:boolean })  Sharp
webp(options?: { quality:1-100, alphaQuality:0-100, lossless:boolean, nearLossless:boolean, smartSubsample:boolean, smartDeblock:boolean, preset:default|photo|picture|drawing|icon|text, effort:0-6, loop:number, delay:number|number[], minSize:boolean, mixed:boolean, force:boolean })  Sharp
gif(options?: { reuse:boolean, progressive:boolean, colours:2-256, effort:1-10, dither:0-1, interFrameMaxError:0-32, interPaletteMaxError:0-256, loop:number, delay:number|number[], force:boolean })  Sharp
tiff(options?: { quality:1-100, compression:none|jpeg|deflate|packbits|ccittfax4|lzw|webp|zstd|jp2k, predictor:none|horizontal|float, pyramid:boolean, tile:boolean, tileWidth:number, tileHeight:number, xres:number, yres:number, resolutionUnit:inch|cm, bitdepth:1|2|4|8|16, miniswhite:boolean })  Sharp
avif(options?: { quality:1-100, lossless:boolean, effort:0-9, chromaSubsampling:4:2:0|4:4:4, bitdepth:8|10|12 })  Sharp
heif(options: { compression: av1|hevc, quality:1-100, lossless:boolean, effort:0-9, chromaSubsampling:4:2:0|4:4:4, bitdepth:8|10|12 })  Sharp

7. Environment & Build Configuration
Cross-platform install flags: npm install --cpu=<x64|arm64|wasm32> --os=<darwin|linux|win32> [--libc=<glibc|musl>]  
Custom libvips: require version  config.libvips, pkg-config --modversion vips-cpp; unsupported on Windows and macOS Rosetta  
Build from source: npm install --build-from-source or detect global libvips; environment variables SHARP_IGNORE_GLOBAL_LIBVIPS, SHARP_FORCE_GLOBAL_LIBVIPS  
Required: C++17 compiler, node-addon-api 7, node-gyp 9

8. Bundler & Deployment Integration
webpack: externals: { 'sharp': 'commonjs sharp' }  
esbuild: external: ['sharp']  
electron-builder: asarUnpack: ['**/node_modules/sharp/**/*']  
electron-forge: packagerConfig.asar.unpack: '**/node_modules/{sharp,@img}/**/*'  
vite: build.rollupOptions.external: ['sharp']
AWS Lambda: include linux-x64|arm64 binaries; avoid symlinks; set binary media types in API Gateway; memory 1536 MB for performance

9. Troubleshooting Procedures
npm v10+ monorepo lockfile: use --os, --cpu, --libc flags  
pnpm: add sharp to ignoredBuiltDependencies or onlyBuiltDependencies  
Fontconfig error: set FONTCONFIG_PATH to custom config  
Canvas+sharp conflict on Windows: avoid mixing both modules in same process

## Original Source
Sharp Image Processing Library
https://sharp.pixelplumbing.com/

## Digest of SHARP

# Sharp Image Processing Library Detailed Digest

Date Retrieved: 2024-06-<CURRENT_DATE>
Data Size: 7807087 bytes
Links Found: 19174

# Introduction
High-performance Node.js module powered by libvips for image conversion and processing in JavaScript runtimes supporting Node-API v9 (Node.js ≥18.17.0, Deno, Bun).

# Supported Formats
Input: JPEG, PNG, WebP, GIF, AVIF, TIFF, SVG
Output: JPEG, PNG, WebP, GIF, AVIF, TIFF, raw pixel data

# Installation
npm install sharp
pnpm add sharp (add to ignoredBuiltDependencies)
yarn add sharp
bun add sharp
deno run --allow-ffi ...

# Prebuilt Binaries
macOS x64/ARM64, Linux x64/ARM/ARM64/ppc64/s390x, Windows x64

# Constructor
new Sharp([input], [options]) ⇒ Sharp

# Core Methods
resize(width, height, [options]) ⇒ Sharp
rotate(angle, [options]) ⇒ Sharp
extract({ left, top, width, height }) ⇒ Sharp
composite([{ input, blend, gravity, ... }]) ⇒ Sharp
gamma(g) ⇒ Sharp

# Output
toFile(fileOut, [callback]) ⇒ Promise<Object>
toBuffer([options], [callback]) ⇒ Promise<Buffer>

# Metadata & Statistics
metadata([callback]) ⇒ Promise<Object>
stats([callback]) ⇒ Promise<Object>

# Format-Specific Methods
jpeg(options) ⇒ Sharp
png(options) ⇒ Sharp
webp(options) ⇒ Sharp
gif(options) ⇒ Sharp
tiff(options) ⇒ Sharp
avif(options) ⇒ Sharp
heif(options) ⇒ Sharp

# Environment & Advanced
Cross-platform installs (--cpu, --os, --libc)
Custom libvips (SHARP_IGNORE_GLOBAL_LIBVIPS, SHARP_FORCE_GLOBAL_LIBVIPS)
Building from source (C++17, node-addon-api ≥7, node-gyp ≥9)
Wasm support (--cpu=wasm32)
Bundler exclusions (webpack externals, esbuild external, electron unpack)
AWS Lambda packaging

# Troubleshooting
npm install errors (lockfile flags)
Fontconfig errors (FONTCONFIG_PATH)
Canvas conflict on Windows



## Attribution
- Source: Sharp Image Processing Library
- URL: https://sharp.pixelplumbing.com/
- License: MIT
- Crawl Date: 2025-05-11T05:01:51.100Z
- Data Size: 7807087 bytes
- Links Found: 19174

## Retrieved
2025-05-11
library/DOTENV.md
# library/DOTENV.md
# DOTENV

## Crawl Summary
Dotenv zero dependency loader reads .env files into process.env. Install via npm install dotenv. Create .env in project root with KEY=VALUE pairs. Load at application start with require('dotenv').config(options) or ES6 import 'dotenv/config'. Options: path (string or array, default cwd/.env), encoding (utf8), debug (false), override (false), processEnv (process.env). parse(input, options) returns parsed object. populate(target,source,options) writes key value pairs. Preload via node -r dotenv/config. Supports multiline values, inline comments, backtick quoting. Parsing rules: skip empty and comment lines, trim unquoted, preserve quoted whitespace, expand newlines, support backticks. CLI configuration via DOTENV_CONFIG_PATH and DOTENV_CONFIG_DEBUG. Turn on debug for troubleshooting.

## Normalised Extract
Table of Contents:
1 Installation
2 Usage
3 Multiline Values
4 Comments
5 Parsing API
6 CLI Preload
7 Functions and Options
8 Parsing Rules
9 Troubleshooting

1 Installation
Install with npm install dotenv --save, yarn add dotenv or bun add dotenv

2 Usage
Create .env in project root:
S3_BUCKET=YOURS3BUCKET
SECRET_KEY=YOURSECRETKEY
Import before other modules:
require('dotenv').config()
Access via process.env.VAR

3 Multiline Values
Define variables across lines between BEGIN and END markers
Or use \n escapes inside double quotes

4 Comments
Lines starting with # ignored
Inline comments allowed if value is quoted containing #

5 Parsing API
parse(input, options): input is string or Buffer, options.debug boolean, returns Record<string,string>

6 CLI Preload
node -r dotenv/config script.js
Use DOTENV_CONFIG_PATH and DOTENV_CONFIG_DEBUG environment variables or dotenv_config_path and dotenv_config_debug CLI params

7 Functions and Options
config(options): path string or array, encoding string, debug boolean, override boolean, processEnv object
Returns { parsed: Record<string,string>, error?: Error }

8 Parsing Rules
Empty lines skipped
Comment lines skipped
Empty values become ''
Unquoted values trimmed
Quoted values preserve whitespace
Newlines expanded in double quotes
Backtick quoting supported

9 Troubleshooting
Enable debug in config to show parsing errors
Ensure .env file path is correct
For browser builds use dotenv-webpack or DefinePlugin

## Supplementary Details
Implementation Steps:
1 Install module: npm install dotenv --save
2 Create .env file at application root with key values
3 In main entry file, add require('dotenv').config({ path, encoding, debug, override, processEnv }) before any other imports
4 Use process.env.VAR to read variables
5 For parsing custom content, use const parsed = dotenv.parse(buffer, { debug })
6 To programmatically populate custom object, call dotenv.populate(targetObj, parsedEnv, { override, debug })
7 To decrypt encrypted .env files, use dotenvx plugin decrypt method with private key

Configuration Options:
path: string or string[], default path.resolve(process.cwd(), '.env')
encoding: string, default utf8
debug: boolean, default false
override: boolean, default false
processEnv: object, default process.env

Supported file features:
Multiline values between markers
Line breaks via \n
Comments and inline comments
Backtick quoted values

CLI Integration:
Use node -r dotenv/config, pass dotenv_config_path and dotenv_config_debug via CLI or DOTENV_CONFIG_PATH/ DEBUG via env vars

Best Practice:
Load dotenv at the very start of application to ensure all modules see env
Wrap require config in try catch to handle missing files
Use override true only when necessary to replace system env
Use dotenv-expand for variable expansion
Use dotenvx for multi env and encryption needs

## Reference Details
Function Signatures and Details:

1 config(options?): { parsed?: Record<string,string>; error?: Error }
Parameters:
  options.path: string or string[]; defaults to process.cwd()/.env
  options.encoding: string; default utf8
  options.debug: boolean; default false
  options.override: boolean; default false
  options.processEnv: object; default process.env
Returns:
  parsed: object mapping keys to string values
  error: Error if parsing or file access fails
Example:
  const result = dotenv.config({ path: ['.env.local', '.env'], encoding: 'latin1', debug: true, override: true })
  if (result.error) throw result.error
  console.log(result.parsed.DB_HOST)

2 parse(input: string | Buffer, options?): Record<string,string>
Parameters:
  input: string or Buffer containing KEY=VAL lines
  options.debug: boolean; default false
Returns:
  object with parsed keys and values
Example:
  const buffer = Buffer.from('API_KEY=abc123')
  const env = dotenv.parse(buffer, { debug: true })
  console.log(env.API_KEY)

3 populate(target: object, source: object, options?): void
Parameters:
  target: object to receive keys
  source: object of parsed env
  options.override: boolean; default false
  options.debug: boolean; default false
Behavior:
  Writes each key from source into target if override true or target key undefined
Example:
  const parsed = { FOO: 'bar' }
  dotenv.populate(process.env, parsed, { override: false })

4 decrypt(encryptedData: object|string, options: { key: string }): Record<string,string>
Parameters:
  encryptedData: object or encrypted file content
  options.key: private key string for decryption
Returns:
  decrypted key value pairs

CLI Usage Patterns:
  node -r dotenv/config app.js
  node -r dotenv/config app.js dotenv_config_path=/custom/.env dotenv_config_debug=true
  DOTENV_CONFIG_PATH=/custom/.env DOTENV_CONFIG_DEBUG=true node -r dotenv/config app.js

Webpack Integration:
Method 1: polyfill crypto os path via node-polyfill-webpack-plugin
  npm install node-polyfill-webpack-plugin
  In webpack.config.js add NodePolyfillPlugin and DefinePlugin mapping process.env values
Method 2: use dotenv-webpack plugin
  npm install dotenv-webpack
  Add new DotenvWebpack() to plugins

Best Practices:
- Always load config at the top of entry file
- Use ES6 import 'dotenv/config' in ESM modules
- For variable expansion, integrate dotenv-expand immediately after config
- For multi env, adopt dotenvx with --env-file flags

Troubleshooting Steps:
1 If env not loaded, enable debug: require('dotenv').config({ debug: true })
2 Confirm .env existence and correct working directory
3 In CI, explicitly set DOTENV_CONFIG_PATH to .env file
4 For client builds, ensure env keys prefixed with REACT_APP_ or use DefinePlugin
5 If module not found errors, install missing polyfills with node-polyfill-webpack-plugin or use dotenv-webpack

## Information Dense Extract
dotenv load .env into process.env. Install npm install dotenv. Create .env: KEY=VAL. require('dotenv').config({ path, encoding, debug, override, processEnv }). path default cwd/.env; encoding utf8; debug false; override false; processEnv process.env. parse(string|Buffer, { debug }): Record<string,string>. populate(target, source, { override, debug }) writes vars. CLI preload via node -r dotenv/config with DOTENV_CONFIG_PATH and DOTENV_CONFIG_DEBUG. Supports multiline values, inline comments, backtick quoting. Parsing rules: skip empty/comment lines, trim unquoted, preserve quoted whitespace, expand \n. Webpack: use node-polyfill-webpack-plugin or dotenv-webpack. Best practice load first, use dotenv-expand for var expansion, use dotenvx for multi env and encryption. Troubleshoot with debug mode.

## Sanitised Extract
Table of Contents:
1 Installation
2 Usage
3 Multiline Values
4 Comments
5 Parsing API
6 CLI Preload
7 Functions and Options
8 Parsing Rules
9 Troubleshooting

1 Installation
Install with npm install dotenv --save, yarn add dotenv or bun add dotenv

2 Usage
Create .env in project root:
S3_BUCKET=YOURS3BUCKET
SECRET_KEY=YOURSECRETKEY
Import before other modules:
require('dotenv').config()
Access via process.env.VAR

3 Multiline Values
Define variables across lines between BEGIN and END markers
Or use 'n escapes inside double quotes

4 Comments
Lines starting with # ignored
Inline comments allowed if value is quoted containing #

5 Parsing API
parse(input, options): input is string or Buffer, options.debug boolean, returns Record<string,string>

6 CLI Preload
node -r dotenv/config script.js
Use DOTENV_CONFIG_PATH and DOTENV_CONFIG_DEBUG environment variables or dotenv_config_path and dotenv_config_debug CLI params

7 Functions and Options
config(options): path string or array, encoding string, debug boolean, override boolean, processEnv object
Returns { parsed: Record<string,string>, error?: Error }

8 Parsing Rules
Empty lines skipped
Comment lines skipped
Empty values become ''
Unquoted values trimmed
Quoted values preserve whitespace
Newlines expanded in double quotes
Backtick quoting supported

9 Troubleshooting
Enable debug in config to show parsing errors
Ensure .env file path is correct
For browser builds use dotenv-webpack or DefinePlugin

## Original Source
dotenv Environment Variable Loader
https://github.com/motdotla/dotenv#readme

## Digest of DOTENV

# Dotenv Module

## Installation

Install via npm, yarn or bun:

  npm install dotenv --save
  yarn add dotenv
  bun add dotenv

## Usage

1. Create a .env file in project root with key value pairs:

   S3_BUCKET=YOURS3BUCKET
   SECRET_KEY=YOURSECRETKEYGOESHERE

2. Import and configure before other modules:

   require('dotenv').config()
   // or ES6
   import 'dotenv/config'

3. Access loaded variables in process.env:

   console.log(process.env.S3_BUCKET)

## Multiline Values (>= v15.0.0)

Private keys spanning multiple lines are supported:

   PRIVATE_KEY=-----BEGIN RSA PRIVATE KEY-----
   ...
   -----END RSA PRIVATE KEY-----

Or escape newlines:

   PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"

## Comments

- Lines starting with # are comments.
- Inline comments allowed if value is quoted and contains #.

## API Functions

### config(options)

Loads and parses .env files into target object.

Signature

  config(options?: {
    path?: string | string[]
    encoding?: string
    debug?: boolean
    override?: boolean
    processEnv?: object
  }): { parsed?: Record<string,string>; error?: Error }

Defaults

  path        process.cwd()/.env
  encoding    utf8
  debug       false
  override    false
  processEnv  process.env

Behavior

- Multiple paths combined in order; first value wins unless override true.
- Existing processEnv values are not overwritten unless override true.

### parse(input, options)

Parses string or buffer into object.

Signature

  parse(input: string | Buffer, options?: { debug?: boolean }): Record<string,string>

### populate(target, source, options)

Populates target object with source key value pairs.

Signature

  populate(target: object, source: object, options?: { override?: boolean; debug?: boolean }): void

### decrypt(encryptedData, options)

Decrypts encrypted env file content. (dotenvx plugin)

Signature

  decrypt(target: object, options: { key: string }): Record<string,string>

## Preload via CLI

Use node require option:

  node -r dotenv/config your_script.js

Configure via env vars or CLI args:

  DOTENV_CONFIG_PATH=/custom/path/.env DOTENV_CONFIG_DEBUG=true node -r dotenv/config app.js

## Parsing Rules

- Skip empty lines
- Skip lines starting with # unless inside quoted value
- Empty values become empty string
- Trim whitespace on unquoted values
- Preserve whitespace on quoted values
- Expand \n in double quotes
- Support backticks for values containing quotes

## Troubleshooting

- Turn on debug logging:

  require('dotenv').config({ debug: true })

- Ensure .env file is in the working directory
- For front end, use webpack DefinePlugin or dotenv-webpack plugin


## Attribution
- Source: dotenv Environment Variable Loader
- URL: https://github.com/motdotla/dotenv#readme
- License: BSD-2-Clause
- Crawl Date: 2025-05-11T09:01:29.596Z
- Data Size: 655248 bytes
- Links Found: 5161

## Retrieved
2025-05-11
library/CHART_INITIALIZATION.md
# library/CHART_INITIALIZATION.md
# CHART_INITIALIZATION

## Crawl Summary
Install via npm or CDN. Chart constructor accepts element or context and a configuration object. Configuration requires chart type, data with labels and datasets, optional options and plugins. Core options include responsive, scales, plugins.legend, plugins.title, plugins.tooltip. Data parsing bypass and decimation reduce rendering overhead. Must register desired controllers and plugins in ESM builds. Default responsive true, maintainAspectRatio true. Time scales require adapter. Decimation supports lttb and min-max algorithms.

## Normalised Extract
Table of Contents
1. Installation
2. Chart Constructor Signature
3. Configuration Object
4. Data Structure
5. Core Options
6. Performance Plugins
7. Best Practices
8. Troubleshooting

1 Installation
• npm install chart.js installs package
• CDN URL https://cdn.jsdelivr.net/npm/chart.js

2 Chart Constructor Signature
Parameters
 item: string server selector | HTMLCanvasElement reference | CanvasRenderingContext2D context
 config: ChartConfiguration<TType,TData,TLabel>
Returns
 Chart instance

3 Configuration Object
Properties
 type: ChartType enum (e.g. "bar","line","pie") required
 data: ChartData<TType,TData,TLabel> required
 options: ChartOptions<TType> optional
 plugins: Plugin<TType>[] optional

4 Data Structure
 ChartData
  labels?: array of labels matching dataset length
  datasets: array of ChartDataset objects
 ChartDataset fields
  label: string
  data: array of numbers | objects
  borderWidth: number default 3
  backgroundColor: Color | array default rgba(0,0,0,0.1)

5 Core Options
 ChartOptions
  responsive: boolean default true
  maintainAspectRatio: boolean default true
  animation: false | {
    delay?: number default 0
    duration?: number default 1000
    easing?: EasingFunction default easeOutQuart
  }
  scales: map scaleId to ScaleOptions
  plugins.legend.display: boolean default true
  plugins.title.text: string
  plugins.tooltip.mode: string default nearest

6 Performance Plugins
Decimation
  enabled: boolean
  algorithm: "lttb" | "min-max"
  samples: number default 100
Data parsing bypass internal format when data array of primitives

7 Best Practices
• Use ESM imports and register controllers:
  import {Chart,LineController,LineElement,PointElement,LinearScale,Title} from chart.js
  Chart.register(LineController,LineElement,PointElement,LinearScale,Title)
• Enable decimation for large datasets in options.plugins.decimation

8 Troubleshooting
Error Canvas already in use
  Ensure new canvas element per Chart
Missing time scale adapter
  npm install chartjs-adapter-date-fns
  import and register adapter prior to chart creation

## Supplementary Details
Installation Steps
1 npm install chart.js --save
2 Import in codebase
  import {Chart,registerables} from chart.js
  Chart.register(...registerables)
3 Optional adapters installation
  npm install chartjs-adapter-date-fns --save
  import 'chartjs-adapter-date-fns'

Configuration Steps
1 Create HTML container:
  <div style width100% height400px>
    <canvas id salesChart></canvas>
  </div>
2 Acquire context
  const ctx=document getElementById salesChart getContext2D()
3 Define data and options objects
4 Instantiate chart
  new Chart(ctx,config)

Key Configuration Options
responsive true enables resizing on window resize
maintainAspectRatio true constrains canvas aspect ratio
animation.delay number ms before animation start default 0
animation.duration number ms for all property transitions default 1000
scales.id.beginAtZero boolean default false
plugins.legend.position top | left | right | bottom default top
plugins.title.display boolean default false
plugins.title.text string
plugins.tooltip.enabled boolean default true
plugins.decimation.enabled boolean default false
plugins.decimation.algorithm "lttb" | "min-max" default lttb
plugins.decimation.samples number default 100


## Reference Details
Chart Constructor Method Signature
new Chart(item:string|HTMLCanvasElement|CanvasRenderingContext2D,config:ChartConfiguration<TType,TData,TLabel>) : Chart<TType,TData,TLabel>

Complete ChartConfiguration Interface
interface ChartConfiguration<TType extends ChartType=ChartType,TData=DefaultDataPoint<TType>,TLabel=unknown> {
  type:TType
  data:ChartData<TType,TData,TLabel>
  options?:ChartOptions<TType>
  plugins?:Plugin<TType>[]
  pluginsData?:AnyObject
}

Full ChartOptions Signature
interface ChartOptions<TType extends ChartType=ChartType> {
  responsive?:boolean
  maintainAspectRatio?:boolean
  locale?:string
  animation?:false|AnimationSpec<TType>&{onComplete?(this:Chart,event:AnimationEvent):void;onProgress?(this:Chart,event:AnimationEvent):void}
  animations?:AnimationsSpec<TType>
  devicesPixelRatio?:number
  scales?:{
    [scaleId:string]:ScaleOptionsByType<ChartTypeRegistry[TType]['scales']>
  }
  plugins?:{
    legend?:LegendOptions
    title?:TitleOptions
    tooltip?:TooltipOptions<TType>
    decimation?:{
      enabled:boolean
      algorithm:"lttb"|"min-max"
      samples:number
    }
  }
  onHover?(event:ChartEvent,active:ActiveElement[],chart:Chart):void
  onClick?(event:ChartEvent,active:ActiveElement[],chart:Chart):void
  maintainAspectRatio?:boolean
  aspectRatio?:number
}

Code Example with Comments
const ctx=document.getElementById 'myChart' getContext '2d'
const config={
  type:'line',
  data:{
    labels:['Jan','Feb','Mar'],
    datasets:[{
      label:'Sales',
      data:[65,59,80],
      borderColor:'#42A5F5',
      backgroundColor:'rgba(66,165,245,0.4)',
      borderWidth:2
    }]
  },
  options:{
    responsive:true,
    plugins:{
      title:{display:true,text:'Monthly Sales'},
      tooltip:{mode:'index',intersect:false},
      decimation:{enabled:true,algorithm:'lttb',samples:50}
    },
    scales:{
      x:{type:'category',title:{display:true,text:'Month'}},
      y:{beginAtZero:true,title:{display:true,text:'Value'}}
    }
  }
}
new Chart(ctx,config)

Best Practices
Register minimised set of components to reduce bundle size
import {Chart,LineController,LineElement,PointElement,LinearScale,Title,Tooltip,Legend} from 'chart.js'
Chart.register(LineController,LineElement,PointElement,LinearScale,Title,Tooltip,Legend)

Troubleshooting Procedures
Command npm ls chart.js shows installed version
If chart fails to render check browser console for errors
Expected output new Chart instance logged
If time scale unlabeled install and register adapter
npm install chartjs-adapter-date-fns
import 'chartjs-adapter-date-fns'

## Information Dense Extract
install chart.js via npm or CDN; import Chart and register components; new Chart(element,config) requires type,label,data,datasets; ChartOptions: responsive true,maintainAspectRatio true,scales{id:options},plugins{legend,title,tooltip,decimation}; enable decimation: enabled true,algorithm lttb|min-max,samples N; time scales require adapter; use ESM imports for tree-shaking; data: labels array,datasets array with label,data,borderColor,backgroundColor,borderWidth; debug by checking console errors and version via npm ls chart.js

## Sanitised Extract
Table of Contents
1. Installation
2. Chart Constructor Signature
3. Configuration Object
4. Data Structure
5. Core Options
6. Performance Plugins
7. Best Practices
8. Troubleshooting

1 Installation
 npm install chart.js installs package
 CDN URL https://cdn.jsdelivr.net/npm/chart.js

2 Chart Constructor Signature
Parameters
 item: string server selector | HTMLCanvasElement reference | CanvasRenderingContext2D context
 config: ChartConfiguration<TType,TData,TLabel>
Returns
 Chart instance

3 Configuration Object
Properties
 type: ChartType enum (e.g. 'bar','line','pie') required
 data: ChartData<TType,TData,TLabel> required
 options: ChartOptions<TType> optional
 plugins: Plugin<TType>[] optional

4 Data Structure
 ChartData
  labels?: array of labels matching dataset length
  datasets: array of ChartDataset objects
 ChartDataset fields
  label: string
  data: array of numbers | objects
  borderWidth: number default 3
  backgroundColor: Color | array default rgba(0,0,0,0.1)

5 Core Options
 ChartOptions
  responsive: boolean default true
  maintainAspectRatio: boolean default true
  animation: false | {
    delay?: number default 0
    duration?: number default 1000
    easing?: EasingFunction default easeOutQuart
  }
  scales: map scaleId to ScaleOptions
  plugins.legend.display: boolean default true
  plugins.title.text: string
  plugins.tooltip.mode: string default nearest

6 Performance Plugins
Decimation
  enabled: boolean
  algorithm: 'lttb' | 'min-max'
  samples: number default 100
Data parsing bypass internal format when data array of primitives

7 Best Practices
 Use ESM imports and register controllers:
  import {Chart,LineController,LineElement,PointElement,LinearScale,Title} from chart.js
  Chart.register(LineController,LineElement,PointElement,LinearScale,Title)
 Enable decimation for large datasets in options.plugins.decimation

8 Troubleshooting
Error Canvas already in use
  Ensure new canvas element per Chart
Missing time scale adapter
  npm install chartjs-adapter-date-fns
  import and register adapter prior to chart creation

## Original Source
Chart.js Core Documentation
https://www.chartjs.org/docs/latest/

## Digest of CHART_INITIALIZATION

# Installation
Install from npm
```shell
npm install chart.js
```
Include via CDN
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

# Chart Constructor Signature
```ts
new Chart(item: string | HTMLCanvasElement | CanvasRenderingContext2D, config: ChartConfiguration<TType, TData, TLabel>)
```

# ChartConfiguration Interface
```ts
interface ChartConfiguration<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown> {
  type: TType
  data: ChartData<TType, TData, TLabel>
  options?: ChartOptions<TType>
  plugins?: Plugin<TType>[]
  pluginsData?: AnyObject
}
```

# ChartData Structure
```ts
interface ChartData<TType extends ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown> {
  labels?: TLabel[]
  datasets: ChartDataset<TType, TData>[]
}
```

# Core Options
```ts
interface ChartOptions<TType extends ChartType = ChartType> {
  responsive?: boolean         // default true
  maintainAspectRatio?: boolean // default true
  animation?: false | AnimationSpec<TType>
  scales?: {
    [scaleId: string]: ScaleOptionsByType<ChartTypeRegistry[TType]['scales']>
  }
  plugins?: {
    legend?: LegendOptions
    title?: TitleOptions
    tooltip?: TooltipOptions<TType>
  }
}
```

# Data Parsing & Decimation
- Decimation plugin enabled via options.plugins.decimation
- Algorithm: lttb or min-max
- Configure options.plugins.decimation.algorithm ("lttb" | "min-max") and samples

# Responsive Canvas Setup
Wrap canvas in container with width and height styling for responsiveness

# Best Practices
- Register only needed controllers, elements, scales, plugins with Chart.register
- Use tree-shaking imports in ESM builds
- Enable decimation for large datasets

# Troubleshooting
- Error if canvas/context reused across charts: supply new HTMLCanvasElement or context
- Missing adapter for time scales: install date-fns adapter and register


## Attribution
- Source: Chart.js Core Documentation
- URL: https://www.chartjs.org/docs/latest/
- License: MIT
- Crawl Date: 2025-05-11T03:36:25.092Z
- Data Size: 1547153 bytes
- Links Found: 27193

## Retrieved
2025-05-11
library/HTTP_SERVER.md
# library/HTTP_SERVER.md
# HTTP_SERVER

## Crawl Summary
createServer(options, listener) returns Server; core options allowHalfOpen/pauseOnConnect; server.listen(port, hostname, backlog, callback) binding patterns; http.request/get signature and defaults; ClientRequest write/end/abort/setHeader/removeHeader; IncomingMessage properties and read methods; ServerResponse writeHead/setHeader/getHeader/removeHeader/write/end

## Normalised Extract
Table of Contents
1 HTTP.createServer
2 server.listen
3 HTTP.request
4 HTTP.get
5 ClientRequest API
6 IncomingMessage API
7 ServerResponse API

1 HTTP.createServer
Signature: createServer(options?: Object, requestListener: Function) -> Server
defaults: options.allowHalfOpen=false, options.pauseOnConnect=false

2 server.listen
Signature: listen(port: string|number, hostname?: string, backlog?: number, callback?: Function) -> Server
default binding: hostname=all interfaces, backlog=511

3 HTTP.request
Signature: request(options: Object|string, callback?: Function) -> ClientRequest
defaults: hostname=localhost, port=80, path='/', method=GET, headers={}, agent=Agent.default

4 HTTP.get
Alias of HTTP.request with method='GET'
Signature: get(options: Object|string, callback?: Function) -> ClientRequest

5 ClientRequest API
Methods
data transmission: write(chunk, encoding?, callback?), end(data?, encoding?, callback?)
control: abort()
headers: setHeader(name, value), removeHeader(name)
Events: 'response'(IncomingMessage), 'error'(Error), 'socket'

6 IncomingMessage API
Properties: httpVersion, headers, rawHeaders, trailers, socket
Methods: setTimeout(timeout, callback?)
Stream.Readable methods: on('data'), on('end'), read(), pipe()

7 ServerResponse API
Methods: writeHead(statusCode, statusMessage?, headers?), setHeader(name,value), getHeader(name), removeHeader(name), write(chunk, encoding?, callback?), end(data?, encoding?, callback?)
Events: 'finish', 'close'


## Supplementary Details
Default Agent configuration: keepAlive=false, maxSockets=Infinity, maxFreeSockets=256, timeout=60000ms
Default server maxHeadersCount=2000
Automatic TCP keep-alive disabled by default
Sockets are unpaused before 'response' event emitted
ServerResponse .writeHead sets statusCode, statusMessage, and adds headers
setTimeout on sockets via request.setTimeout or response.setTimeout defines socket timeout and emits timeout event
backlog default computed by OS if omitted


## Reference Details
Code Example: Create HTTP Server
```js
import http from 'node:http';
const server = http.createServer({ allowHalfOpen: true }, (req, res) => {
  res.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});
server.listen(3000, '127.0.0.1', 100, () => console.log('Listening'));``` 

HTTP.request Pattern
```js
import http from 'node:http';
const options = { hostname: 'example.com', port: 80, path: '/data', method: 'POST', headers: { 'Content-Type': 'application/json' } };
const req = http.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Response:', body));
});
req.on('error', err => console.error('Request error:', err));
req.write(JSON.stringify({ key: 'value' }));
req.end();``` 

Best Practices
- Reuse http.Agent for connection pooling
- Add error handler on ClientRequest to avoid uncaught exceptions
- Call server.close() to stop server, handle 'close' event

Troubleshooting
Command: netstat -plnt | grep 3000
Expected: LISTEN on 127.0.0.1:3000
Error EADDRINUSE: address already in use, run `lsof -i :3000` to find process and kill via `kill -9 <pid>`

Configuration Options
- allowHalfOpen: controls socket half-open state when server ends
- pauseOnConnect: if true pause socket until 'connection' listener resumes
- keepAliveTimeout: server.keepAliveTimeout default 5000ms

## Information Dense Extract
createServer(options?:Object{allowHalfOpen:false,pauseOnConnect:false},listener(req, res))->Server; listen(port:string|number,hostname?:string,backlog?:number,callback?)->Server default hostname=all,backlog=OS; request(options:{hostname:string='localhost',port:number=80,path:string='/',method:string='GET',headers:Object,agent:Agent.default},callback?(res:IncomingMessage))->ClientRequest; get(...) alias with method='GET'; ClientRequest: write(chunk,encoding?,cb?),end(data?,encoding?,cb?),abort(),setHeader(name,value),removeHeader(name), events:response, error, socket; IncomingMessage: properties httpVersion,headers,rawHeaders,trailers,socket; methods setTimeout(timeout,cb?), Readable interface; ServerResponse: writeHead(statusCode:number,statusMessage?:string,headers?:Object), setHeader(name,value),getHeader(name),removeHeader(name), write(chunk,encoding?,cb?), end(data?,encoding?,cb?), events finish,close; defaults agent.keepAlive=false,maxSockets=Infinity,maxFreeSockets=256,timeout=60000ms; maxHeadersCount=2000; EOF

## Sanitised Extract
Table of Contents
1 HTTP.createServer
2 server.listen
3 HTTP.request
4 HTTP.get
5 ClientRequest API
6 IncomingMessage API
7 ServerResponse API

1 HTTP.createServer
Signature: createServer(options?: Object, requestListener: Function) -> Server
defaults: options.allowHalfOpen=false, options.pauseOnConnect=false

2 server.listen
Signature: listen(port: string|number, hostname?: string, backlog?: number, callback?: Function) -> Server
default binding: hostname=all interfaces, backlog=511

3 HTTP.request
Signature: request(options: Object|string, callback?: Function) -> ClientRequest
defaults: hostname=localhost, port=80, path='/', method=GET, headers={}, agent=Agent.default

4 HTTP.get
Alias of HTTP.request with method='GET'
Signature: get(options: Object|string, callback?: Function) -> ClientRequest

5 ClientRequest API
Methods
data transmission: write(chunk, encoding?, callback?), end(data?, encoding?, callback?)
control: abort()
headers: setHeader(name, value), removeHeader(name)
Events: 'response'(IncomingMessage), 'error'(Error), 'socket'

6 IncomingMessage API
Properties: httpVersion, headers, rawHeaders, trailers, socket
Methods: setTimeout(timeout, callback?)
Stream.Readable methods: on('data'), on('end'), read(), pipe()

7 ServerResponse API
Methods: writeHead(statusCode, statusMessage?, headers?), setHeader(name,value), getHeader(name), removeHeader(name), write(chunk, encoding?, callback?), end(data?, encoding?, callback?)
Events: 'finish', 'close'

## Original Source
Node.js Official API Reference
https://nodejs.org/docs/latest/api/

## Digest of HTTP_SERVER

# HTTP Module

## HTTP.createServer([options], requestListener)
* Signature: createServer(options?: Object, requestListener: Function) -> Server
* options.allowHalfOpen: boolean default false
* options.pauseOnConnect: boolean default false
* requestListener: function(req: IncomingMessage, res: ServerResponse)
* Returns an instance of http.Server

## server.listen(port, [hostname], [backlog], [callback])
* Signature: server.listen(port: string|number, hostname?: string, backlog?: number, callback?: Function) -> Server
* port: Port identifier (Number or String)
* hostname: IP or hostname to bind defaults to undefined (all interfaces)
* backlog: maximum length of pending connections
* callback: Called when server is bound

## HTTP.request(options, [callback])
* Signature: request(options: Object | string, callback?: Function) -> ClientRequest
* options.hostname: string default 'localhost'
* options.port: number default 80
* options.path: string default '/'
* options.method: string default 'GET'
* options.headers: Object default {}
* options.agent: boolean|Agent default Agent.default
* callback: function(res: IncomingMessage)
* Returns ClientRequest object

## HTTP.get(options, [callback])
* Signature: get(options: Object | string, callback?: Function) -> ClientRequest
* Acts as http.request with method set to GET
* Returns ClientRequest

## ClientRequest
* Methods: write(chunk: string|Buffer, encoding?: string, callback?: Function)
*          end([data], [encoding], [callback])
*          abort()
*          setHeader(name: string, value: string|Array<string>)
*          removeHeader(name: string)
* Properties: method:string, path:string, host:string, port:number
* Events: 'response': (res: IncomingMessage), 'error': (err: Error), 'socket'

## IncomingMessage
* Properties: httpVersion:string, headers:Object, rawHeaders:Array<string>, trailers:Object
* Methods: setTimeout(timeout: number, callback?: Function)
* Streams: inherits from Stream.Readable, methods read(), pipe(), etc.

## ServerResponse
* Methods: writeHead(statusCode: number, statusMessage?: string, headers?: Object)
*          setHeader(name: string, value: string|Array<string>)
*          getHeader(name: string) -> string|undefined
*          removeHeader(name: string)
*          write(chunk: string|Buffer, encoding?: string, callback?: Function)
*          end([data], [encoding], [callback])
* Events: 'finish', 'close'


## Attribution
- Source: Node.js Official API Reference
- URL: https://nodejs.org/docs/latest/api/
- License: CC-BY-SA
- Crawl Date: 2025-05-11T04:03:15.840Z
- Data Size: 3628998 bytes
- Links Found: 3102

## Retrieved
2025-05-11
