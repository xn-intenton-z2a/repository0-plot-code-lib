LIBRARY_DOCUMENT.md/SVG_JS.md
# LIBRARY_DOCUMENT.md/SVG_JS.md
# SVG_JS

## Crawl Summary
SVG.js documentation provides a modular API for SVG element creation, manipulation, and animation. It outlines container elements (SVG.Svg, SVG.G, etc.), shape elements (SVG.Rect, SVG.Circle, etc.), methods for element referencing and creation, and functions for attributes, positioning, resizing, and transforming. Animation APIs include animate(), easing, and timeline management. The documentation also covers event handling and extension via SVG.extend.

## Normalised Extract
Table of Contents:
1. Container Elements
   - SVG.Svg: Main container initialization
   - SVG.G: Grouping of elements
   - SVG.Symbol, SVG.Defs, SVG.A for definitions and linking
2. Other Elements
   - SVG.Rect: rect(width, height) creates a rectangle; supports methods like fill(color)
   - SVG.Circle, SVG.Ellipse, SVG.Line, SVG.Polyline, SVG.Polygon, SVG.Path for drawing shapes
   - Text elements: SVG.Text, SVG.TextPath, SVG.Tspan
   - Media elements: SVG.Image
   - Styling elements: SVG.Gradient, SVG.Stop, SVG.Pattern, SVG.Mask, SVG.ClipPath, SVG.Style, SVG.ForeignObject
3. Referencing / Creating Elements
   - Methods include referencing using CSS selectors, jQuery/Zepto compatibility, managing circular, child, and parent references
4. Manipulating Elements
   - Functions for Attributes, Positioning, Resizing, Transforming, styling (Styles, Classes) and data binding
   - Memory management and document tree operations
5. Animating
   - animate(): primary method to initiate animations with parameters for duration, delay, easing
   - SVG.Runner: manages animation progress
   - Easing functions and SVG.Timeline for sequencing
   - Controllers for orchestrating multiple animations
6. Events
   - Binding basic, custom and event listeners to elements
7. Classes and Helpers
   - Utility classes like SVG.Box, SVG.List, SVG.Array, SVG.PointArray, SVG.PathArray, SVG.Color, SVG.Matrix, SVG.Number, SVG.Point, SVG.EventTarget
8. Extending
   - SVG.extend and subclassing for creating custom elements and functionality

Key Example:
var draw = SVG().addTo('#drawing')
  , rect = draw.rect(100, 100).fill('#f06')
This illustrates concise API usage replacing verbose vanilla JavaScript.


## Supplementary Details
Technical Specifications:
- SVG() initializes an SVG drawing context and can append to a container using addTo(selector).
- SVG.Svg.addTo(selector: string|HTMLElement): returns an Svg instance.
- Creation Methods:
   • rect(width: number, height: number): returns a Rect instance
   • fill(color: string): method to set fill color; color must be a valid CSS color.
- Animation Methods:
   • animate(duration: number): initiates an animation sequence. Accepts duration in milliseconds.
   • Easing functions: standard easing options provided.
- Event Handling:
   • on(eventType: string, callback: Function): binds events to SVG elements.
- Configuration Options:
   • Performance benchmarks: capable of generating 10000 rectangles for fill, gradient, and rect operations.
   • Modular structure permits painless extension and plugin integration, e.g., svg.draggable.js, svg.easing.js.
- Implementation Steps:
   1. Initialize drawing with SVG().addTo(container).
   2. Create element via appropriate method (e.g., rect, circle).
   3. Chain modifications like fill, move, size.
   4. Apply animate() for transition effects.
   5. Bind events using on(event, callback).
- License: MIT


## Reference Details
API Specifications:
1. function SVG(): Svg
   - Description: Initializes and returns an Svg instance.
2. Svg.addTo(container: string|HTMLElement): Svg
   - Parameters: container - CSS selector string or HTML element reference.
   - Returns: Svg instance with appended SVG element.
3. Svg.rect(width: number, height: number): Rect
   - Parameters: width (number), height (number)
   - Returns: Rect instance for further manipulation.
4. Rect.fill(color: string): Rect
   - Parameters: color - a valid CSS color string, e.g., '#f06'
   - Returns: Modified Rect instance.
5. animate(duration: number): Runner
   - Parameters: duration in milliseconds
   - Returns: SVG.Runner instance controlling the animation.

Method Signatures:
- var draw = SVG().addTo('#drawing');
- var rect = draw.rect(100, 100).fill('#f06');
- rect.animate(1000).fill('#0f0');

Best Practices:
- Chain methods to reduce verbosity.
- Verify container element existence before initialization to avoid runtime errors.
- Utilize modular plugins for extended functionality (e.g., draggable, easing).

Troubleshooting Procedures:
- If the container is not found, check the validity of the selector in addTo; expected error: "Container not found".
- Validate method chaining order; ensure each method returns an instance for subsequent calls.
- Use console logging to trace errors in event binding and animation sequences.
- For performance issues, benchmark with provided indices (e.g., generating 10000 elements) and optimize accordingly.

Configuration Options:
- Default container selector: none; must be provided explicitly via addTo.
- Animation default easing: as defined in SVG.Runner and easing functions.

Example Code with Comments:
// Initialize SVG canvas in element with id 'drawing'
var draw = SVG().addTo('#drawing');
// Create a rectangle (100x100) and set fill color to pink
var rect = draw.rect(100, 100).fill('#f06');
// Animate the rectangle over 1 second to change fill to green
rect.animate(1000).fill('#0f0');


## Information Dense Extract
SVG.js API: SVG() returns Svg; Svg.addTo(container: string|HTMLElement): Svg; Svg.rect(width: number, height: number): Rect; Rect.fill(color: string): Rect; animate(duration: number): Runner; on(event: string, callback: Function): void; Performance: 10000 elements benchmark; Modular structure supports plugins; License: MIT; Example: var draw = SVG().addTo('#drawing'), rect = draw.rect(100, 100).fill('#f06'); rect.animate(1000).fill('#0f0'); Configuration: container required; easing as per SVG.Runner defaults; Troubleshooting: verify container selector, correct method chaining.

## Sanitised Extract
Table of Contents:
1. Container Elements
   - SVG.Svg: Main container initialization
   - SVG.G: Grouping of elements
   - SVG.Symbol, SVG.Defs, SVG.A for definitions and linking
2. Other Elements
   - SVG.Rect: rect(width, height) creates a rectangle; supports methods like fill(color)
   - SVG.Circle, SVG.Ellipse, SVG.Line, SVG.Polyline, SVG.Polygon, SVG.Path for drawing shapes
   - Text elements: SVG.Text, SVG.TextPath, SVG.Tspan
   - Media elements: SVG.Image
   - Styling elements: SVG.Gradient, SVG.Stop, SVG.Pattern, SVG.Mask, SVG.ClipPath, SVG.Style, SVG.ForeignObject
3. Referencing / Creating Elements
   - Methods include referencing using CSS selectors, jQuery/Zepto compatibility, managing circular, child, and parent references
4. Manipulating Elements
   - Functions for Attributes, Positioning, Resizing, Transforming, styling (Styles, Classes) and data binding
   - Memory management and document tree operations
5. Animating
   - animate(): primary method to initiate animations with parameters for duration, delay, easing
   - SVG.Runner: manages animation progress
   - Easing functions and SVG.Timeline for sequencing
   - Controllers for orchestrating multiple animations
6. Events
   - Binding basic, custom and event listeners to elements
7. Classes and Helpers
   - Utility classes like SVG.Box, SVG.List, SVG.Array, SVG.PointArray, SVG.PathArray, SVG.Color, SVG.Matrix, SVG.Number, SVG.Point, SVG.EventTarget
8. Extending
   - SVG.extend and subclassing for creating custom elements and functionality

Key Example:
var draw = SVG().addTo('#drawing')
  , rect = draw.rect(100, 100).fill('#f06')
This illustrates concise API usage replacing verbose vanilla JavaScript.

## Original Source
SVG.js Documentation
https://svgjs.dev/docs/3.0/

## Digest of SVG_JS

# SVG.js Documentation

## Overview
SVG.js is a lightweight JavaScript library for creating, manipulating, animating, and extending SVG elements. It provides a modular API for handling a vast range of SVG functionalities including container elements, shape elements, animation, event handling, and extension methods.

## Installation
- No dependencies required.
- MIT License.

## Container Elements
- SVG.Svg
- SVG.G
- SVG.Symbol
- SVG.Defs
- SVG.A

## Other Elements
- General Handling of svg.js elements
- SVG.Dom
- SVG.Rect
- SVG.Circle
- SVG.Ellipse
- SVG.Line
- SVG.Polyline
- SVG.Polygon
- SVG.Path
- SVG.Text
- SVG.TextPath
- SVG.Tspan
- SVG.Image
- SVG.Gradient
- SVG.Stop
- SVG.Pattern
- SVG.Mask
- SVG.ClipPath
- SVG.Use
- SVG.Marker
- SVG.Style
- SVG.ForeignObject

## Referencing / Creating Elements
- Referencing using CSS selectors
- Referencing existing DOM elements
- Using jQuery or Zepto
- Circular reference
- Child and parent references
- URI references
- Creating Elements

## Manipulating Elements
- Attributes, Positioning and Resizing
- Syntactic sugar for Transforming
- Applying Styles and Classes
- Data binding
- Memory management
- Document Tree manipulation
- Arranging and Geometry

## Animating
- Animate function
- SVG.Runner for controlling animations
- Easing functions
- SVG.Timeline for sequencing
- Controllers and orchestration

## Events
- Basic events and event listeners
- Custom events handling

## Classes and Helpers
- SVG.Box
- SVG.List
- SVG.Array
- SVG.PointArray
- SVG.PathArray
- SVG.Color
- SVG.Matrix
- SVG.Number
- SVG.Point
- SVG.EventTarget

## Extending
- SVG.extend for adding new functionality
- Subclassing existing elements

## Example
A basic implementation for creating a pink square:

  var draw = SVG().addTo('#drawing')
    , rect = draw.rect(100, 100).fill('#f06')

## Retrieval Date and Attribution
- Content retrieved on: 2023-10-18
- Data Size during crawl: 5512768 bytes
- Links Found: 6262



## Attribution
- Source: SVG.js Documentation
- URL: https://svgjs.dev/docs/3.0/
- License: License: MIT
- Crawl Date: 2025-05-02T14:47:59.223Z
- Data Size: 5512768 bytes
- Links Found: 6262

## Retrieved
2025-05-02
LIBRARY_DOCUMENT.md/CLI_TOOLS.md
# LIBRARY_DOCUMENT.md/CLI_TOOLS.md
# CLI_TOOLS

## Crawl Summary
The technical crawl did not retrieve content blocks, but reference URLs provided Commander.js API and the Art of Command Line guidelines. Key details include API method signatures for command creation, option specification, action binding, error handling by exitOverride, and configuration methods such as version and help designations. The content focuses on actionable CLI tool configurations.

## Normalised Extract
Table of Contents:
1. Command Initialization
   - new Command() creates a CLI parser instance.
   - Usage: var program = new Command();
2. Option Parsing
   - Method: .option(flags: string, description: string, defaultValue?: any)
   - Example: program.option('-d, --debug', 'enable debugging mode');
3. Action Binding
   - Method: .action(callback: Function)
   - Callback receives parsed arguments, e.g. program.action(function(args){ ... });
4. Error Handling
   - Use .exitOverride() to enable custom error handling on invalid inputs.
5. Configuration Options
   - Version configuration using .version(version: string, flags?: string, description?: string)
   - Invokes .parse(process.argv) to process CLI inputs.

Details:
Command Initialization: Invoke new Command() to start CLI setup. Set up commands using .command(name, description, [opts]).
Option Parsing: Define flags in a comma-separated format with shorthand and longhand forms. Accept default values when applicable.
Action Binding: Directly bind command execution logic via .action and process the incomming parameters.
Error Handling: Intercept and handle errors through .exitOverride(), allowing custom error messages and error codes.
Configuration: Customize CLI behavior through additional methods available in the Commander.js API.

## Supplementary Details
Technical Specifications and Implementation Steps:
- new Command() returns a Command instance with methods: command(), option(), action(), version(), and parse().
- command(name: string, description: string, opts?: Object) creates subcommands. Example opts: { noHelp: true }.
- option(flags: string, description: string, defaultValue?: any) registers options. Flags must be in the format '-x, --example <value>'.
- version(version: string, flags?: string, description?: string) sets the version. Defaults to '-V, --version'.
- parse(argv: Array<string>) processes command-line arguments. Must be called at the end.
- exitOverride(callback?: Function) intercepts process.exit on errors. Callback receives an error object with code and message details.
- Recommended steps: Instantiate command, chain option() and command() methods, bind action(), register version(), and finish with parse(process.argv).
- Configuration Options: help flags default to '-h, --help'. Debug mode enabled via custom flags should lead to verbose logging.

## Reference Details
API Specifications:
Constructor: Command()
Method: command(name: string, description: string, opts?: Object) => Command
Method: option(flags: string, description: string, defaultValue?: any) => Command
Method: action(callback: Function) => Command
Method: version(version: string, flags?: string, description?: string) => Command
Method: parse(argv: Array<string>) => Command
Method: exitOverride(callback?: Function) => Command

SDK Method Example:
var program = new Command();
program
  .version('1.0.0', '-V, --version', 'output the current version')
  .option('-d, --debug', 'enable debugging mode')
  .command('start', 'start the application', { noHelp: false })
  .action(function(args) {
    // Implementation logic for start
  })
  .exitOverride(function(err) {
    // Custom error handling, err.code contains error code
    console.error('Error:', err.message);
  })
  .parse(process.argv);

Best Practices:
- Always call parse(process.argv) as the final chain to process CLI arguments.
- Use exitOverride to handle errors gracefully rather than abrupt termination.
- Define clear option flags and descriptions for user clarity.

Troubleshooting Procedures:
1. If options are not parsed correctly, verify flag format is '-x, --example <value>'
2. Use console.error in exitOverride callback to log detailed errors.
3. Validate that process.argv is passed correctly to parse().
4. Check that version(), command(), and option() methods are chained correctly.

Error Codes: Check err.code in exitOverride to determine error type; common codes include 'commander.invalidArgument', 'commander.missingArgument'.

## Information Dense Extract
Command Instance=new Command(); Methods: command(string, string, {opts}), option(string, string, default), action(function(args)), version(string, flags, description), parse(array<string>), exitOverride(function(err)). Usage: Instantiate, chain option and command, bind action and version, call parse(process.argv); Example: program.option('-d, --debug', 'enable debugging') returns command instance; exitOverride handles err.code for errors like commander.invalidArgument.

## Sanitised Extract
Table of Contents:
1. Command Initialization
   - new Command() creates a CLI parser instance.
   - Usage: var program = new Command();
2. Option Parsing
   - Method: .option(flags: string, description: string, defaultValue?: any)
   - Example: program.option('-d, --debug', 'enable debugging mode');
3. Action Binding
   - Method: .action(callback: Function)
   - Callback receives parsed arguments, e.g. program.action(function(args){ ... });
4. Error Handling
   - Use .exitOverride() to enable custom error handling on invalid inputs.
5. Configuration Options
   - Version configuration using .version(version: string, flags?: string, description?: string)
   - Invokes .parse(process.argv) to process CLI inputs.

Details:
Command Initialization: Invoke new Command() to start CLI setup. Set up commands using .command(name, description, [opts]).
Option Parsing: Define flags in a comma-separated format with shorthand and longhand forms. Accept default values when applicable.
Action Binding: Directly bind command execution logic via .action and process the incomming parameters.
Error Handling: Intercept and handle errors through .exitOverride(), allowing custom error messages and error codes.
Configuration: Customize CLI behavior through additional methods available in the Commander.js API.

## Original Source
CLI Tools and Best Practices
https://github.com/tj/commander.js | https://github.com/jlevy/the-art-of-command-line

## Digest of CLI_TOOLS

# CLI_TOOLS
Date Retrieved: 2023-10-05

## Overview
This document consolidates high-value technical details for building and maintaining CLI tools using Commander.js and the best practices described in the Art of Command Line. The document covers API initialization, option parsing, error handling, and recommended configuration settings.

## Command Initialization
- Use new Command() to create an instance of the CLI parser.
- Method Signature: new Command()
- Example Usage: var program = new Command();

## Option Parsing
- Method: command.option(flags: string, description: string, defaultValue?: any) 
- Flags Example: '-d, --debug' to enable debugging
- The option method returns an Option instance for further configuration.

## Action Binding
- Method: command.action(callback: Function)
- Callback Signature: function(args: any) that receives parsed command arguments
- Ensures direct execution of business logic with validated input.

## Error Handling
- Commander.js standardizes error responses with process.exit() codes on invalid options.
- Use .exitOverride() to catch errors and provide custom error messages.

## Configuration Options
- Version configuration with command.version(version: string, flags?: string, description?: string)
- Default flag for help output: '-h, --help'
- Use .parse(process.argv) to execute the command configuration.

Attribution: Data derived from Commander.js and The Art of Command Line project.
Data Size: 0 bytes

## Attribution
- Source: CLI Tools and Best Practices
- URL: https://github.com/tj/commander.js | https://github.com/jlevy/the-art-of-command-line
- License: License: MIT / Unknown
- Crawl Date: 2025-05-02T17:55:52.081Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-02
LIBRARY_DOCUMENT.md/COMMANDER_JS.md
# LIBRARY_DOCUMENT.md/COMMANDER_JS.md
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
LIBRARY_DOCUMENT.md/GRAPHVIZ_DOC.md
# LIBRARY_DOCUMENT.md/GRAPHVIZ_DOC.md
# GRAPHVIZ_DOC

## Crawl Summary
Key technical details extracted include the full DOT language grammar with precise production rules, exact command line flags (-G, -N, -E, -K, -T, -V, -l, -n) with examples, installation instructions with source package details, build steps (./configure, make, make install, ./autogen.sh for Git builds), minimum dependency versions, and usage patterns for library integration. These details facilitate immediate implementation in Graphviz projects.

## Normalised Extract
Table of Contents:
  1. DOT LANGUAGE SPECIFICATION
    - Grammar productions: graph, stmt_list, stmt, attr_stmt, attr_list, a_list, edge_stmt, edgeRHS, node_stmt, node_id, port, subgraph, compass_pt
    - Identifier forms: unquoted, numeral, double-quoted, HTML strings
    - Supported comments and escape sequences
  2. COMMAND LINE INTERFACE
    - Invocation format: cmd [ flags ] [ input files ]
    - Flag details:
       * -Gname[=value]: Set graph attributes; value defaults to true if omitted
       * -Nname[=value]: Set default node attributes
       * -Ename[=value]: Set default edge attributes
       * -Klayout: Specify layout engine (e.g., -Kneato)
       * -Tformat[:renderer[:formatter]]: Specify output format and optionally explicit renderer and formatter
       * -V: Version display
       * -llibrary: Include device-specific library contents for PostScript output
       * -n[num]: For neato, assume nodes already positioned with pos attributes
  3. INSTALLATION & BUILD PROCEDURES
    - Source package formats: .tar.gz, .tar.xz; version examples include 12.2.1, 12.2.0, etc
    - Build steps: ./configure, make, make install; for Git clones: ./autogen.sh, ./configure, make, make install
    - Dependency versions: cairo (1.10.0), expat (2.0.0), freetype (2.1.10), gd (2.0.34), fontconfig (2.3.95), glib (2.36.0), libpng (1.2.10), pango (1.22.0), zlib (1.2.3)
  4. LIBRARY USAGE & API
    - Usage example for integrating Graphviz as a library in C/C++ with functions: graph_new(), graph_add_node(), graph_add_edge(), render_graph()
  5. TROUBLESHOOTING & BEST PRACTICES
    - Use -v flag to determine active renderers and formatters
    - Confirm installation with dot -V command
    - Inherit attributes properly by setting defaults at the top-level graph
    - Use specific download packages matching system architecture

Each topic includes exact command syntax and configuration options for immediate developer application.

## Supplementary Details
Technical Specifications:
  • DOT Grammar Exact Productions: graph, stmt_list, stmt, attr_stmt, attr_list, a_list, edge_stmt, edgeRHS, node_stmt, node_id, port, subgraph, compass_pt; keywords are case-independent and edgeops are '->' and '--'.
  • Command Line Flags:
      -Gname[=value] : Graph attribute setting (default true)
      -Nname[=value] : Node attribute setting
      -Ename[=value] : Edge attribute setting
      -Klayout : Explicit layout engine guidance
      -Tformat[:renderer[:formatter]] : Output format specification with optional renderer and formatter
      -V : Version output
      -llibrary : Include external library preamble files
      -n[num] : For neato, disable repositioning if pos attribute is present
  • Installation Commands:
      Linux: sudo apt install graphviz or sudo dnf install graphviz
      Windows: Use provided EXE installers or ZIP archives (check sha256 values)
      Mac: sudo port install graphviz or brew install graphviz
  • Build process for source: ./configure, make, make install; for Git clone additional step: ./autogen.sh
  • Dependencies (minimum versions): cairo 1.10.0, expat 2.0.0, freetype 2.1.10, gd 2.0.34, fontconfig 2.3.95, glib 2.36.0, libpng 1.2.10, pango 1.22.0, zlib 1.2.3
  • Library API Example (pseudo C code):
         Graph *g = graph_new();
         graph_add_node(g, "A");
         graph_add_node(g, "B");
         graph_add_edge(g, "A", "B");
         render_graph(g, "dot", "output.svg");
  • Troubleshooting: Run 'dot -V' to output version and active rendering configuration; verify dependency versions if build errors occur.

## Reference Details
API Specifications and Command Signatures:
DOT Language Grammar:
  graph(): Optional 'strict' modifier; keyword must be graph/digraph; syntax: [ strict ] (graph | digraph) [ ID ] '{' stmt_list '}'
  stmt_list(): Zero or more statements terminated optionally with ';'
  stmt(): Can be node_stmt(), edge_stmt(), attr_stmt(), simple assignment (ID '=' ID), or subgraph()
  attr_stmt(target): target can be graph, node, or edge; followed by attr_list()
  attr_list(): '[' optionally an a_list then ']' optionally recurrent
  a_list(): Series of ID '=' ID pairs separated by ';' or ','
  edge_stmt(): Accepts (node_id | subgraph) followed by edgeRHS()
  edgeRHS(): Consists of an edge operator (edgeop) and subsequent (node_id | subgraph), may be recursive
  node_stmt(): node_id() followed by optional attr_list()
  node_id(): ID optionally with a port specification
  port(): ':' ID optionally with ':' compass_pt OR ':' compass_pt
  subgraph(): Optional keyword subgraph, optional ID, then '{' stmt_list '}'
  compass_pt(): One of: n, ne, e, se, s, sw, w, nw, c, _

Command Line Flag Examples:
  dot -Tsvg input.dot
  dot -Tsvg -Gfontcolor=red -Glabel="My favorite letters" input.dot
  dot -Tsvg -Nfontcolor=red -Nshape=rect input.dot
  dot -Tpng:cairo:gd input.dot
  dot -V

SDK/Library Method Signature Example in C (pseudo-code):
  Graph* graph_new(void);
  void graph_add_node(Graph *g, const char *node_id);
  void graph_add_edge(Graph *g, const char *source, const char *target);
  int render_graph(Graph *g, const char *engine, const char *output_file); // Returns 0 on success

Build Commands for Source Compilation:
  ./configure [--help]  // Lists all configuration options and default values
  make
  make install
  For Git sources: ./autogen.sh before ./configure

Configuration Options Summary:
  -G, -N, -E flags with syntax: flagName[=value] where value is string; default is true if omitted
  -T output: format specification with colon separated renderer and formatter
  -K: overrides the default layout engine

Best Practices and Troubleshooting:
  * Use -V to verify installation and active configuration
  * For dependency errors, check that libraries (cairo, expat, freetype, etc.) are at or above minimum versions
  * When using subgraphs, define attributes in parent graph to ensure inheritance; avoid redefinition conflicts
  * Example troubleshooting command: dot -V, expected output: "dot - graphviz version X.Y.Z (build date)"
  * Validate DOT files with known correct examples to isolate syntax errors

Detailed Implementation Pattern:
  1. Define graph in DOT file using explicit attribute settings (e.g., graph [fontsize=10]; node [shape=ellipse]; edge [color=black]).
  2. Invoke dot with appropriate flags depending on output format and layout engine.
  3. For library usage, call graph_new(), add nodes/edges, and call render_graph() with engine parameter ("dot", "neato", etc.).

These specifications and examples are directly usable by developers.

## Information Dense Extract
DOT: graph -> [strict] (graph|digraph)[ID]{stmt_list}; stmt: node_stmt|edge_stmt|attr_stmt|ID=ID|subgraph; attr_list: [a_list]; edgeop: '->' or '--'; IDs: unquoted/alphabetic/numeral/quoted/HTML. CLI: dot [flags] [files]; -G: graph attribute, -N: node attribute, -E: edge attribute, -K: layout engine, -T: output format with renderer:formatter, -V: version, -l: library inclusion, -n: no reposition in neato. Build: ./configure, make, make install; Git: ./autogen.sh then ./configure. Dependencies: cairo>=1.10.0, expat>=2.0.0, freetype>=2.1.10, gd>=2.0.34, fontconfig>=2.3.95, glib>=2.36.0, libpng>=1.2.10, pango>=1.22.0, zlib>=1.2.3. API (pseudo C): graph_new(), graph_add_node(Graph*, const char*), graph_add_edge(Graph*, const char*, const char*), render_graph(Graph*, const char*, const char*). Troubleshooting: dot -V; verify dependency versions; use correct flag syntax.

## Sanitised Extract
Table of Contents:
  1. DOT LANGUAGE SPECIFICATION
    - Grammar productions: graph, stmt_list, stmt, attr_stmt, attr_list, a_list, edge_stmt, edgeRHS, node_stmt, node_id, port, subgraph, compass_pt
    - Identifier forms: unquoted, numeral, double-quoted, HTML strings
    - Supported comments and escape sequences
  2. COMMAND LINE INTERFACE
    - Invocation format: cmd [ flags ] [ input files ]
    - Flag details:
       * -Gname[=value]: Set graph attributes; value defaults to true if omitted
       * -Nname[=value]: Set default node attributes
       * -Ename[=value]: Set default edge attributes
       * -Klayout: Specify layout engine (e.g., -Kneato)
       * -Tformat[:renderer[:formatter]]: Specify output format and optionally explicit renderer and formatter
       * -V: Version display
       * -llibrary: Include device-specific library contents for PostScript output
       * -n[num]: For neato, assume nodes already positioned with pos attributes
  3. INSTALLATION & BUILD PROCEDURES
    - Source package formats: .tar.gz, .tar.xz; version examples include 12.2.1, 12.2.0, etc
    - Build steps: ./configure, make, make install; for Git clones: ./autogen.sh, ./configure, make, make install
    - Dependency versions: cairo (1.10.0), expat (2.0.0), freetype (2.1.10), gd (2.0.34), fontconfig (2.3.95), glib (2.36.0), libpng (1.2.10), pango (1.22.0), zlib (1.2.3)
  4. LIBRARY USAGE & API
    - Usage example for integrating Graphviz as a library in C/C++ with functions: graph_new(), graph_add_node(), graph_add_edge(), render_graph()
  5. TROUBLESHOOTING & BEST PRACTICES
    - Use -v flag to determine active renderers and formatters
    - Confirm installation with dot -V command
    - Inherit attributes properly by setting defaults at the top-level graph
    - Use specific download packages matching system architecture

Each topic includes exact command syntax and configuration options for immediate developer application.

## Original Source
Graph Visualization Tools Documentation
https://graphviz.org/documentation/

## Digest of GRAPHVIZ_DOC

# GRAPHVIZ DOCUMENTATION
Date Retrieved: 2024-09-11

# DOT LANGUAGE
The DOT language provides an abstract grammar to define graphs. Key productions:

graph : [ strict ] (graph | digraph) [ ID ] '{' stmt_list '}'
stmt_list : [ stmt [ ';' ] stmt_list ]
stmt : node_stmt | edge_stmt | attr_stmt | ID '=' ID | subgraph
attr_stmt : (graph | node | edge) attr_list
attr_list : '[' [ a_list ] ']' [ attr_list ]
a_list : ID '=' ID [ (';' | ',') ] [ a_list ]
edge_stmt : (node_id | subgraph) edgeRHS [ attr_list ]
edgeRHS : edgeop (node_id | subgraph) [ edgeRHS ]
node_stmt : node_id [ attr_list ]
node_id : ID [ port ]
port : ':' ID [ ':' compass_pt ] | ':' compass_pt
subgraph : [ subgraph [ ID ] ] '{' stmt_list '}'
compass_pt : n | ne | e | se | s | sw | w | nw | c | _

IDs can be an unquoted identifier, numeral, double-quoted string, or HTML string. Keywords (node, edge, graph, digraph, subgraph, strict) are case independent. Edge operators are '->' for directed graphs and '--' for undirected graphs. Comments (/* */ and //) and preprocessor lines (#) are supported.

# COMMAND LINE INTERFACE
Graphviz programs use similar invocations: 

cmd [ flags ] [ input files ]

Example: 
  dot -Tsvg input.dot

Standard flags:
-Gname[=value] : Set a graph attribute (default value true).
  Example: dot -Tsvg -Gfontcolor=red -Glabel="My favorite letters"
-Nname[=value] : Set default node attributes.
  Example: dot -Tsvg -Nfontcolor=red -Nshape=rect
-Ename[=value] : Set default edge attributes.
  Example: dot -Tsvg -Ecolor=red -Earrowhead=diamond
-Klayout : Override default layout engine.
  Example: dot -Kneato
-Tformat[:renderer[:formatter]] : Set output format. Renderer and formatter may be specified explicitly (e.g., -Tpng:cairo or -Tpng:cairo:gd).
-V : Emit version information and exit.
-llibrary : Include user-supplied library files for PostScript output preamble.
-n[num] : For neato, assume nodes have a pos attribute and adjust layout to remove node overlap.

# INSTALLATION & BUILD
Download Graphviz source packages (example: graphviz-12.2.1.tar.gz/ tar.xz) and perform the typical installation:
  ./configure
  make
  make install

For building from Git repositories:
  ./autogen.sh
  ./configure
  make
  make install

Minimum dependency versions (recommended latest available):
 - cairo: 1.10.0
 - expat: 2.0.0
 - freetype: 2.1.10
 - gd: 2.0.34
 - fontconfig: 2.3.95
 - glib: 2.36.0
 - libpng: 1.2.10
 - pango: 1.22.0
 - zlib: 1.2.3
 - GTS for sfdp layouts

# INSTALLATION PACKAGES
Multiple platforms available:
 Linux: Use apt (sudo apt install graphviz) or dnf (sudo dnf install graphviz) based on distro.
 Windows: Precompiled packages; choose EXE or ZIP archive for 32-bit/64-bit.
 Mac: Use MacPorts (sudo port install graphviz) or Homebrew (brew install graphviz).
 Solaris and Other Unixes: Use provided stable releases and package variants.

# LIBRARY & API USAGE
Graphviz can be used as a library. For example, using libgraph (C/C++):
  // Pseudocode example:
  Graph *g = graph_new();
  graph_add_node(g, "A");
  graph_add_node(g, "B");
  graph_add_edge(g, "A", "B");
  render_graph(g, "dot", "output.svg");

# ATTRIBUTES & CONFIGURATION
Graph, node, and edge attributes can be set using DEFAULT attribute statements or per-element attributes. In DOT, attributes inherit based on declaration order. A subgraph receives the current graph attributes at its time of definition.

# TROUGH DETAILS
For troubleshooting, use the -v flag to see used renderers and formatters. Verify installation by running:
  dot -V
Expected output: dot - graphviz version X.Y.Z (build date) etc.

# ATTRIBUTION & DATA SIZE
Data Size: 353647 bytes, 40385 links discovered, no errors reported during crawl.


## Attribution
- Source: Graph Visualization Tools Documentation
- URL: https://graphviz.org/documentation/
- License: EPL / Various
- Crawl Date: 2025-05-02T01:05:30.599Z
- Data Size: 353647 bytes
- Links Found: 40385

## Retrieved
2025-05-02
LIBRARY_DOCUMENT.md/GNUPLOT.md
# LIBRARY_DOCUMENT.md/GNUPLOT.md
# GNUPLOT

## Crawl Summary
Gnuplot supports both 2D and 3D data visualization with commands for plotting functions and data sets. Key aspects include installation via configure/make, detailed command syntax for plots (set terminal, set output, replot, unset output), multiple data input methods (named blocks, inline data), extensive customization of appearance (colors, linetypes, margins, multiplot layout), advanced plotting techniques (animations, filled curves, data filtering via pipes), and text formatting with enhanced text mode and UTF-8 support. Various troubleshooting commands (show version long) and debugging procedures are documented.

## Normalised Extract
Table of Contents: GENERAL_INFORMATION, INSTALLATION, PLOTTING_COMMANDS, DATA_INPUT, CUSTOMIZATION, TEXT_FORMATTING, ADVANCED_TECHNIQUES, TROUBLESHOOTING
GENERAL_INFORMATION: Version 5.4 stable, 5.5 development; platform support; command-driven interface; licensing and free distribution details.
INSTALLATION: Linux: ./configure [--prefix=<dir>], make, make install; Development: run ./prepare then ./configure; Windows: use appropriate makefile in config directory.
PLOTTING_COMMANDS: plot sin(x); set terminal pdf/pdfcairo with options (transparent, enhanced, fontscale 0.5, size 5.00in, 3.00in); set output "filename"; replot; unset output; use push/pop terminal commands.
DATA_INPUT: Named data blocks using $DATABLOCK << EOD ... EOD; inline data with plot "-" followed by data lines and terminator 'e'.
CUSTOMIZATION: set color, set monochrome, set linetype, set palette (e.g., cubehelix), set pointsize; margin settings (set lmargin, bmargin, rmargin, tmargin using at screen <value>);
TEXT_FORMATTING: Enhanced text with commands (^ for superscript, _ for subscript, {} for font changes), disable markup (noenhanced), set encoding utf8.
ADVANCED_TECHNIQUES: Animated plots with set terminal gif animate; filled curves between functions using pseudo file '+'; 2D projection using set view map/projection xz/yz; running data through external filter using popen() mechanism.
TROUBLESHOOTING: Use show version long to list build options; check command output if plot elements are missing; verify data block syntax; ensure proper closing of output file with unset output; examine error messages on compilation output.

## Supplementary Details
Installation details: Linux: ./configure [--prefix=$HOME/usr], make, make install; Windows: use config/mingw or config/msvc makefiles. Plotting: 'set terminal pdfcairo transparent enhanced fontscale 0.5 size 5.00in, 3.00in' changes terminal; 'set output "file.pdf"' directs output to a file; 'unset output' closes file. Data input: Named block: $DATABLOCK << EOD ... EOD; Inline: plot "-" with data lines ending with 'e'. Customization commands: 'set lmargin at screen 0.05', 'set bmargin at screen 0.05', 'set rmargin at screen 0.95', 'set tmargin at screen 0.95'; multiplot: 'set multiplot layout <rows>, <columns>' or manual positioning using set origin and set size. Text formatting: Enhanced text mode supports superscript (a^x), subscript (a_x), phantom boxes (a@^b_{cd}), and font changes using {/FontName text}. Use 'noenhanced' to disable markup. Troubleshooting: Verify configuration options with 'show version long'; check terminal type with 'set terminal'; ensure proper closure of file outputs.

## Reference Details
API Specifications and Command Syntax:
1. Plot Command:
   Syntax: plot <datafile> [using <col_spec>] with <style> [options]
   Example: plot 'data.dat' using 1:2 with lines
2. Terminal Setup:
   Command: set terminal <type> [options]
   Example: set terminal pdfcairo transparent enhanced fontscale 0.5 size 5.00in, 3.00in
   Return: Terminal type change confirmation
3. Output Redirection:
   Command: set output "filename"
   Example: set output "sin.pdf"
   Followed by: replot, then unset output
4. Data Input Methods:
   a. Named Data Block:
      Syntax: $DATABLOCK << EOD
              <data lines>
              EOD
      Use in Plot: plot $DATABLOCK using 2:3:1 with labels
   b. Inline Data:
      Syntax: plot "-"
              <data lines>
              e
5. Customization:
   a. Margin Setting:
      Commands: set lmargin at screen <value>, set bmargin at screen <value>, etc.
      Example: set lmargin at screen 0.05
   b. Multiplot:
      Command: set multiplot layout <rows>, <columns>
      Example: set multiplot layout 2,2
6. Enhanced Text Mode:
   Markup Symbols:
      ^ for superscript (e.g., a^x), _ for subscript (e.g., a_x), {} for font changes (e.g., {/Times Bold text})
      Disable with: set title 'text' noenhanced
7. Additional Commands:
   - set hidden3d: Enables hidden line removal for 3D plots with lines
   - set pm3d depthorder: Orders plots for pm3d rendering
   - set encoding utf8: Enables UTF-8 encoding for special characters
8. Troubleshooting:
   - Command: show version long (displays all compiled options and terminal types)
   - If output is incomplete, check: unset output, verify terminal settings, and review error messages
Full Example Workflow:
# Plot to PDF
gnuplot> plot sin(x)
gnuplot> set terminal pdfcairo transparent enhanced fontscale 0.5 size 5.00in, 3.00in
gnuplot> set output "sin.pdf"
gnuplot> replot
gnuplot> unset output
gnuplot> unset terminal
This sequence is critical for ensuring the PDF output matches interactive display.
Best Practices: Always verify terminal and output settings; use named data blocks for reusability; use push/pop terminal commands to preserve interactive settings.
Detailed Troubleshooting: If a plot is not rendered correctly, verify using 'show version long', then re-run with minimal commands to isolate errors. Check environment variable settings for locale and encoding if UTF-8 characters do not display.

## Information Dense Extract
Gnuplot v5.4 stable, v5.5 dev; Linux: ./configure [--prefix], make, make install; Windows: use config/mingw/msvc; Plot: plot sin(x); Terminal: set terminal pdfcairo transparent enhanced fontscale 0.5 size 5.00in,3.00in; Output: set output "file.pdf", replot, unset output; Data block: $DATABLOCK << EOD ... EOD; Inline data: plot "-"; Customization: set lmargin at screen 0.05, bmargin 0.05, rmargin 0.95, tmargin 0.95; Multiplot: set multiplot layout <rows>,<cols>; Enhanced text: a^x, a_x, {/Font text}, disable with noenhanced; Encoding: set encoding utf8; API commands: show version long, set terminal, set output; Troubleshooting: check terminal settings, use minimal commands; Best practices: validate configuration options; Use external pipes for data filtering; Animation: set terminal gif animate {delay} {loop} {optimize}; Filled curves: plot '+' using 1:(f($1)):(g($1)) with filledcurves.

## Sanitised Extract
Table of Contents: GENERAL_INFORMATION, INSTALLATION, PLOTTING_COMMANDS, DATA_INPUT, CUSTOMIZATION, TEXT_FORMATTING, ADVANCED_TECHNIQUES, TROUBLESHOOTING
GENERAL_INFORMATION: Version 5.4 stable, 5.5 development; platform support; command-driven interface; licensing and free distribution details.
INSTALLATION: Linux: ./configure [--prefix=<dir>], make, make install; Development: run ./prepare then ./configure; Windows: use appropriate makefile in config directory.
PLOTTING_COMMANDS: plot sin(x); set terminal pdf/pdfcairo with options (transparent, enhanced, fontscale 0.5, size 5.00in, 3.00in); set output 'filename'; replot; unset output; use push/pop terminal commands.
DATA_INPUT: Named data blocks using $DATABLOCK << EOD ... EOD; inline data with plot '-' followed by data lines and terminator 'e'.
CUSTOMIZATION: set color, set monochrome, set linetype, set palette (e.g., cubehelix), set pointsize; margin settings (set lmargin, bmargin, rmargin, tmargin using at screen <value>);
TEXT_FORMATTING: Enhanced text with commands (^ for superscript, _ for subscript, {} for font changes), disable markup (noenhanced), set encoding utf8.
ADVANCED_TECHNIQUES: Animated plots with set terminal gif animate; filled curves between functions using pseudo file '+'; 2D projection using set view map/projection xz/yz; running data through external filter using popen() mechanism.
TROUBLESHOOTING: Use show version long to list build options; check command output if plot elements are missing; verify data block syntax; ensure proper closing of output file with unset output; examine error messages on compilation output.

## Original Source
Gnuplot Documentation
https://gnuplot.sourceforge.net/documentation.html

## Digest of GNUPLOT

# GNUPLOT DOCUMENTATION DIGEST

Retrieved: 2023-10-26

# GENERAL INFORMATION
Gnuplot is a command-driven plotting program for visualizing scientific data in 2D and 3D. It supports interactive sessions and batch scripting, extensive customization, and is available on Windows, Linux, Unix, OSX and legacy systems (VMS, OS/2, MS-DOS). The stable release is version 5.4 and the development version is 5.5.

# INSTALLATION & COMPILATION
- For Linux systems: Run ./configure (or ./configure --prefix=$HOME/usr), then make, then make install. Review output for required support libraries.
- For development source builds: Run ./prepare prior to ./configure.
- For Windows: Use provided makefiles in config/mingw, config/msvc, config/watcom, or config/cygwin.

# WORKING WITH GNU PLOT
## Getting Help
- Command: help <keyword> (e.g. help plot, help set)
- Use online resources and mailing lists for additional support.

## Plotting Commands
- Basic plot:  gnuplot> plot sin(x)
- Changing output: 
  gnuplot> set terminal pdf             (e.g., pdfcairo with options: transparent, enhanced, fontscale 0.5, size 5.00in, 3.00in)
  gnuplot> set output "filename.pdf"
  gnuplot> replot
  gnuplot> unset output
  gnuplot> unset terminal
- Using push/pop terminal states:
  gnuplot> set terminal push
  gnuplot> set terminal pdf
  gnuplot> set output 'file.pdf'
  gnuplot> replot
  gnuplot> unset output
  gnuplot> set terminal pop

## Data Input Techniques
- Using named data blocks:
  gnuplot> $DATABLOCK << EOD
     cats 4 2
     dogs 1 4
  EOD
  gnuplot> plot $DATABLOCK using 2:3:1 with labels
- Inline data using "-":
  gnuplot> plot "-"
  1 1
  2 4
  3 9
  e

## Customizing Appearance
- Change default colors, line types, and point properties:
  - set color / set monochrome
  - set linetype (to change or add new properties)
  - set palette (e.g., set palette cubehelix for printing)
  - set pointsize adjusts the scaling of points.
- Hidden surface removal:
  - Use set hidden3d for 3D plots with lines
  - Use set pm3d depthorder for pm3d mode plots
- Axis and margin configuration:
  gnuplot> set lmargin at screen 0.05
  gnuplot> set bmargin at screen 0.05
  gnuplot> set rmargin at screen 0.95
  gnuplot> set tmargin at screen 0.95
- Multi-plot arrangement:
  gnuplot> set multiplot layout <rows>, <columns>
  Or use set origin and set size commands for manual positioning.

# TEXT FORMATTING & SPECIAL SYMBOLS
- Enhanced text mode supports:
  - Superscript: a^x
  - Subscript: a_x
  - Phantom box with @: a@^b_{cd}
  - Font changes: {/Times abc}, {/Times*2 abc}, {/Times:Italic abc}, {/Arial:Bold=20 abc}
- Disabling markup: append 'noenhanced' (e.g., set title 'file_1.dat' noenhanced)
- UTF-8 encoding: set encoding utf8

# ADVANCED PLOTTING TECHNIQUES
## Specialized Plot Types
- Animations: set terminal gif animate {delay <time>} {loop <N>} {optimize} (development version supports webp)
- Filling between two functions:
  f(x)=cos(x); g(x)=sin(x)
  set xrange [0:pi]
  plot '+' using 1:(f($1)):(g($1)) with filledcurves
- 2D projections of 3D data: use set view map, or set view projection xz/yz

## Data Filtering & Scripting
- Pipe external command: plot "< sort +2 file.in" for sorting before plotting
- Combining commands and data in one file is supported with named blocks and inline data

# TROUBLESHOOTING & DEBUGGING
- Incomplete output: Confirm proper termination of output with unset output
- Check build options with: show version long and set terminal
- Verify installation by comparing output from interactive and batch mode

# ATTRIBUTION & CRAWL DETAILS
Data Size: 4820335 bytes; 4545 links identified; No errors during crawl.

## Attribution
- Source: Gnuplot Documentation
- URL: https://gnuplot.sourceforge.net/documentation.html
- License: License: GPL
- Crawl Date: 2025-05-02T17:47:26.702Z
- Data Size: 4820335 bytes
- Links Found: 4545

## Retrieved
2025-05-02
LIBRARY_DOCUMENT.md/SVG_GRAPHICS.md
# LIBRARY_DOCUMENT.md/SVG_GRAPHICS.md
# SVG_GRAPHICS

## Crawl Summary
SVG is an XML-based vector graphics language with support for scalable images, integration with CSS, DOM APIs, JavaScript scripting, and SMIL for animations. Key specifications include explicit element and attribute references, namespace declarations, and best practices for embedding, styling, and troubleshooting.

## Normalised Extract
TABLE OF CONTENTS:
1. INTRODUCTION
   - SVG is an XML-based language for 2D vector graphics.
   - Namespace: http://www.w3.org/2000/svg.
2. ELEMENTS & ATTRIBUTES
   - Essential elements: svg, rect, circle, ellipse, line, polyline, polygon, path.
   - Attributes: width, height, fill, stroke, stroke-width, transform; precise usage is defined in the SVG element and attribute reference.
3. DOM INTERFACE & SCRIPTING
   - Create elements using createElementNS(namespace, tagName).
   - Methods: setAttribute(name, value), getAttribute(name), removeAttribute(name).
   - Example: var svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg').
4. ANIMATION & SMIL SUPPORT
   - Use <animate> to animate attributes; key attributes include attributeName, from, to, dur, repeatCount.
5. INTEGRATION WITH HTML & CSS
   - Embed inline or as external file; style with CSS.
   - Ensure proper MIME type (image/svg+xml) and valid XML structure.
6. TROUBLESHOOTING & BEST PRACTICES
   - Validate SVG with markup validators.
   - Use browser developer tools to inspect DOM.
   - Optimize SVG using minifiers like SVGO.

DETAILED TECHNICAL DETAILS:
INTRODUCTION: SVG is used for graphics that must scale precisely. It is text based, searchable, and editable. Its design supports integration with other web standards.

ELEMENTS & ATTRIBUTES: Each SVG element is defined by a tag enclosed in <>. For instance, the <rect> element has attributes x, y, width, height, fill, etc. The SVG specification defines the behavior and default values for these attributes.

DOM INTERFACE: Using JavaScript, you can dynamically create and manipulate SVG elements. The method document.createElementNS('http://www.w3.org/2000/svg', 'circle') creates a circle element. After creation, use setAttribute to configure its properties.

ANIMATION: SMIL-based animation is available in SVG. For example, the <animate> element can animate the 'fill' property from one color to another over a specified duration.

INTEGRATION: Inline SVG benefits from direct CSS styling. External SVG files must be served using the correct MIME type to work correctly in browsers.

TROUBLESHOOTING: Verify the correctness of the XML markup and use browser dev tools to inspect the rendered DOM. Tools like SVGO can help optimize SVG code.

BEST PRACTICES:
- Always include the XML namespace.
- Validate SVG with markup validators.
- Use minification and optimization techniques for performance.

## Supplementary Details
SVG Technical Specifications:
- Namespace: http://www.w3.org/2000/svg
- Common Elements: svg, rect, circle, ellipse, line, polyline, polygon, path, text.
- Attributes:
   * width: Defines the width of the SVG viewport (e.g., 300, 100%).
   * height: Defines the height of the SVG viewport.
   * fill: Sets the fill color (e.g., 'red', '#FF0000').
   * stroke: Defines the stroke color; default is none.
   * stroke-width: Specifies the width of the stroke in pixels.
   * transform: Applies transformations such as translate, scale, rotate.
- Animation Elements:
   * <animate>: Attributes include attributeName (string), from (string), to (string), dur (string, e.g. '2s'), repeatCount (number or 'indefinite').
- DOM Manipulation:
   * Method: document.createElementNS(namespace, tagName) returns an Element of type SVGElement.
   * Methods: setAttribute(name, value) to update attributes.
- Configuration Options:
   * MIME type required: image/svg+xml
   * Use of SMIL animation: supported in many browsers; fallback required in unsupported browsers.
- Implementation Steps:
   1. Create an SVG container using <svg width='300' height='300' xmlns='http://www.w3.org/2000/svg'>.
   2. Dynamically add elements via JavaScript using createElementNS.
   3. Set attributes and append nodes to the SVG container.
   4. Use CSS to style elements and validate using an XML/HTML validator.
- Troubleshooting:
   * Check browser console for XML parsing errors.
   * Validate served MIME types (use curl -I http://yourdomain/path.svg to check headers).
   * Use online validators for XML structure.

## Reference Details
Complete API Specifications and Implementation Details:

DOM API for SVG:
- Method: document.createElementNS(namespace: string, qualifiedName: string): SVGElement
   * Example: var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
- Method: Element.setAttribute(name: string, value: string): void
   * Example: svg.setAttribute('width', '500');
- Method: Element.getAttribute(name: string): string | null
   * Returns attribute value or null if not present.

SVG Animation using SMIL:
- Element: <animate>
   * Attributes:
       - attributeName (string): The name of the attribute to animate.
       - from (string): Starting value.
       - to (string): Ending value.
       - dur (string): Duration, e.g. '3s'.
       - repeatCount (string): Number of repetitions, can be a number or 'indefinite'.
   * Usage pattern:
     <circle cx='50' cy='50' r='40' fill='red'>
       <animate attributeName='fill' from='red' to='blue' dur='2s' repeatCount='indefinite'/>
     </circle>

Full Code Example for Creating an SVG Circle Dynamically:
----------------------------------------------------------
// Define SVG namespace
var svgns = 'http://www.w3.org/2000/svg';

// Create an SVG container
var svgElem = document.createElementNS(svgns, 'svg');
svgElem.setAttribute('width', '300');
svgElem.setAttribute('height', '300');

// Create a circle element
var circle = document.createElementNS(svgns, 'circle');
circle.setAttribute('cx', '150');
circle.setAttribute('cy', '150');
circle.setAttribute('r', '100');
circle.setAttribute('fill', 'green');

// Append the circle to the SVG container
svgElem.appendChild(circle);

// Append the SVG container to the document body
document.body.appendChild(svgElem);

// Troubleshooting: Use browser developer tools to inspect the SVG node structure.
// Check for proper MIME type if loading as external file using curl -I URL

Configuration Options with Effects:
- width/height: Set viewport dimensions; default not applied if omitted.
- fill/stroke: Visual styling; missing values result in browser defaults.
- dur in animations: Specifies the timing; an incorrect value will prevent animation.

Best Practices:
- Always include the XML namespace in the SVG tag.
- Validate your SVG files through XML validators to catch syntax errors.
- Use inline SVG for dynamic manipulation and external files for static assets.
- Minify SVG files using tools like SVGO to improve loading performance.

Troubleshooting Procedures:
1. If SVG does not render, check the browser console for XML parsing errors.
2. Verify HTTP headers include Content-Type: image/svg+xml
3. Validate SVG markup using online validators.
4. Use developer tools (Elements tab) to inspect the live DOM and applied attributes.
5. For animation issues, ensure SMIL is supported or implement JavaScript-based animations.

## Information Dense Extract
SVG XML-based vector graphics; namespace: http://www.w3.org/2000/svg; elements: svg, rect, circle, ellipse, line, polyline, polygon, path; attributes: width, height, fill, stroke, stroke-width, transform; DOM API: createElementNS(ns, tag), setAttribute(name,value), getAttribute(name); SMIL animation: <animate> with attributeName, from, to, dur, repeatCount; integration: inline in HTML or external with MIME image/svg+xml; best practice: validate XML, minify with SVGO; troubleshooting: inspect DOM, check MIME headers via curl -I, use browser dev tools.

## Sanitised Extract
TABLE OF CONTENTS:
1. INTRODUCTION
   - SVG is an XML-based language for 2D vector graphics.
   - Namespace: http://www.w3.org/2000/svg.
2. ELEMENTS & ATTRIBUTES
   - Essential elements: svg, rect, circle, ellipse, line, polyline, polygon, path.
   - Attributes: width, height, fill, stroke, stroke-width, transform; precise usage is defined in the SVG element and attribute reference.
3. DOM INTERFACE & SCRIPTING
   - Create elements using createElementNS(namespace, tagName).
   - Methods: setAttribute(name, value), getAttribute(name), removeAttribute(name).
   - Example: var svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg').
4. ANIMATION & SMIL SUPPORT
   - Use <animate> to animate attributes; key attributes include attributeName, from, to, dur, repeatCount.
5. INTEGRATION WITH HTML & CSS
   - Embed inline or as external file; style with CSS.
   - Ensure proper MIME type (image/svg+xml) and valid XML structure.
6. TROUBLESHOOTING & BEST PRACTICES
   - Validate SVG with markup validators.
   - Use browser developer tools to inspect DOM.
   - Optimize SVG using minifiers like SVGO.

DETAILED TECHNICAL DETAILS:
INTRODUCTION: SVG is used for graphics that must scale precisely. It is text based, searchable, and editable. Its design supports integration with other web standards.

ELEMENTS & ATTRIBUTES: Each SVG element is defined by a tag enclosed in <>. For instance, the <rect> element has attributes x, y, width, height, fill, etc. The SVG specification defines the behavior and default values for these attributes.

DOM INTERFACE: Using JavaScript, you can dynamically create and manipulate SVG elements. The method document.createElementNS('http://www.w3.org/2000/svg', 'circle') creates a circle element. After creation, use setAttribute to configure its properties.

ANIMATION: SMIL-based animation is available in SVG. For example, the <animate> element can animate the 'fill' property from one color to another over a specified duration.

INTEGRATION: Inline SVG benefits from direct CSS styling. External SVG files must be served using the correct MIME type to work correctly in browsers.

TROUBLESHOOTING: Verify the correctness of the XML markup and use browser dev tools to inspect the rendered DOM. Tools like SVGO can help optimize SVG code.

BEST PRACTICES:
- Always include the XML namespace.
- Validate SVG with markup validators.
- Use minification and optimization techniques for performance.

## Original Source
SVG and Vector Graphics Documentation
https://developer.mozilla.org/en-US/docs/Web/SVG

## Digest of SVG_GRAPHICS

# SVG Scalable Vector Graphics Documentation

Retrieved: 2025-05-01

This document contains the technical specifications and implementation details for SVG (Scalable Vector Graphics) as provided by the MDN documentation. It includes precise information on the SVG markup, its integration with HTML, CSS, JavaScript, animated effects using SMIL, and the SVG DOM interface.

## SVG Basics
- SVG is an XML-based markup language that enables the description of two-dimensional vector graphics.
- It is scalable without loss of quality, making it ideal for responsive designs and high-dpi displays.
- It uses the namespace: http://www.w3.org/2000/svg.

## SVG Elements and Attributes
- Common elements: <svg>, <rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon>, <path>.
- Attributes include: width, height, fill, stroke, stroke-width, transform etc.
- Each element has detailed specification in the SVG Element Reference.

## SVG DOM Interface and Scripting
- SVG elements can be manipulated via JavaScript using the DOM API.
- Core creation method: document.createElementNS('http://www.w3.org/2000/svg', 'elementName').
- Methods such as setAttribute, getAttribute, and removeAttribute are available for modifying element properties.

## Animation and SMIL
- SVG supports animations using SMIL with elements like <animate>, <animateTransform>, and <set>.
- Key attributes include: attributeName, from, to, dur, repeatCount.

## Integration with HTML and CSS
- SVG can be embedded inline in HTML or linked as an external resource.
- CSS styling is supported using standard selectors; properties like fill and stroke can be styled via CSS.

## Configuration and Tooling
- SVG files are plain XML text files which can be edited in text editors or drawing software.
- They can be validated using markup validators and optimized using tools like SVGO.

## Troubleshooting and Best Practices
- Ensure the SVG file is served with the correct MIME type (image/svg+xml).
- Validate the XML structure and namespaces to prevent rendering issues.
- Use browser developer tools to inspect the SVG DOM and verify applied attributes.

Attribution: MDN Web Docs, data size 1156361 bytes.

## Attribution
- Source: SVG and Vector Graphics Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG
- License: License: Various (CC-BY-SA, W3C Document License, MIT, GPL)
- Crawl Date: 2025-05-02T07:46:17.487Z
- Data Size: 1156366 bytes
- Links Found: 28929

## Retrieved
2025-05-02
LIBRARY_DOCUMENT.md/NODEJS_API.md
# LIBRARY_DOCUMENT.md/NODEJS_API.md
# NODEJS_API

## Crawl Summary
Node.js API documentation provides exact method signatures, such as createServer for HTTP servers and comprehensive details for the assert module. It includes full SDK method signatures like assert.strictEqual(a, b, msg) and new assert.AssertionError(options) with complete options. The documentation covers environment configurations (e.g., NO_COLOR), version stability indexes (0 to 3), and precise troubleshooting practices like tracker.verify() in CallTracker usage.

## Normalised Extract
TABLE OF CONTENTS:
1. HTTP Server
   - createServer(requestListener: function): Server
   - Exact usage: import { createServer } from 'node:http'; server.listen(port, hostname, callback)
2. Assertion Module (Strict and Legacy modes)
   - Strict mode: import { strict as assert } from 'node:assert'; methods: assert(value[, message]), assert.deepStrictEqual(actual, expected[, message]), assert.strictEqual(actual, expected[, message])
   - new assert.AssertionError(options) with options { message: string, actual: any, expected: any, operator: string, stackStartFn: Function }
   - Legacy mode: import assert from 'node:assert'; methods: assert.deepEqual, assert.equal, etc.
3. CallTracker (Deprecated)
   - new assert.CallTracker()
   - tracker.calls(fn, exact) returns wrapped function
   - tracker.getCalls(fn) returns array of { thisArg, arguments }
   - tracker.report() returns call summary
   - tracker.reset([fn]) resets call counts
   - tracker.verify() validates call counts
4. Configuration and CLI options
   - Command usage: node [options] [script.js] [arguments]
   - Environment variables: NO_COLOR, NODE_DISABLE_COLORS
5. Stability Index and Versioning
   - Stability 0: Deprecated, Stability 1: Experimental, Stability 2: Stable, Stability 3: Legacy

Detailed Topics:
HTTP Server: Use to create and listen on a server with detailed error handling and callback upon successful listen.
Assertion Module: Provides robust checks with strict equality and deep strict equality, including detailed diff output on failure. Includes full API for error handling and message customization.
CallTracker: Track function call frequency and verify that functions are called expected number of times; useful in testing scenarios.

## Supplementary Details
HTTP Server:
- import { createServer } from 'node:http';
- Method: createServer((req: IncomingMessage, res: ServerResponse) => void): Server
- server.listen(port: number, hostname: string, callback: Function): void

Assertion Module (Strict):
- import { strict as assert } from 'node:assert';
- Methods:
  - assert(value: any, message?: string): void
  - assert.deepStrictEqual(actual: any, expected: any, message?: string): void
  - assert.strictEqual(actual: any, expected: any, message?: string): void
  - new assert.AssertionError({ message?: string, actual: any, expected: any, operator?: string, stackStartFn?: Function }): AssertionError

CallTracker (Deprecated):
- new assert.CallTracker()
- tracker.calls(fn: Function, exact?: number): Function
- tracker.getCalls(fn: Function): Array<{ thisArg: any, arguments: Array<any> }>
- tracker.report(): Array<{ message: string, actual: number, expected: number, operator: string, stack: Object }>
- tracker.reset(fn?: Function): void
- tracker.verify(): void

Configuration:
- Node CLI: node [options] [script.js]
- Environment Variables: NO_COLOR, NODE_DISABLE_COLORS
- Detailed troubleshooting: On process exit, call tracker.verify() to ensure functions met call expectations.

Best Practices:
- Use strict assertion mode for reliable error diffs.
- Utilize process.on('exit', () => { tracker.verify(); }) to automatically validate call tracker usage.
- Specify full option objects for AssertionError to get complete debug information.

## Reference Details
API Specifications:

HTTP Server API:
- import { createServer } from 'node:http';
- createServer(callback: (req: IncomingMessage, res: ServerResponse) => void): Server
  where Server.listen(port: number, hostname: string, callback?: () => void): void

Assertion Module (Strict Mode):
- import { strict as assert } from 'node:assert';

Method Signatures:
- assert(value: any, message?: string): void
- assert.deepStrictEqual(actual: any, expected: any, message?: string): void
- assert.strictEqual(actual: any, expected: any, message?: string): void

AssertionError Constructor:
- new assert.AssertionError(options: { message?: string, actual: any, expected: any, operator?: string, stackStartFn?: Function }): AssertionError

CallTracker API (Deprecated):
- let tracker = new assert.CallTracker();
- tracker.calls(fn: Function, exact?: number): Function
- tracker.getCalls(fn: Function): Array<{ thisArg: any, arguments: Array<any> }>
- tracker.report(): Array<{ message: string, actual: number, expected: number, operator: string, stack: Object }>
- tracker.reset(fn?: Function): void
- tracker.verify(): void

Code Example (HTTP Server):
----------------------------
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

Code Example (Assertion):
-------------------------
import assert from 'node:assert/strict';

const { message } = new assert.AssertionError({
  actual: 1,
  expected: 2,
  operator: 'strictEqual'
});

try {
  assert.strictEqual(1, 2);
} catch (err) {
  console.error('Assertion failed:', err.message);
}

CallTracker Example:
----------------------
import assert from 'node:assert';
import process from 'node:process';

const tracker = new assert.CallTracker();
function sample() {}
const trackedSample = tracker.calls(sample, 1);
trackedSample();

process.on('exit', () => {
  tracker.verify();
});

CLI and Configuration:
- Run node scripts with: node [options] script.js
- Environment: Set NO_COLOR=1 to disable color output.

Troubleshooting:
- If assert.strictEqual fails, verify both type and value equality.
- Use tracker.report() to get detailed call counts if tracker.verify() throws an error.
- Check full stack traces provided in AssertionError for debugging mismatches.

Configuration Options:
- Node.js command-line flags: --inspect, --max-old-space-size, etc. (Refer to official docs for full list)

Best Practices:
- Always use strict assertion mode for predictable error messages.
- Validate asynchronous code using assert.doesNotReject(asyncFn, error, message).
- Wrap critical server initialization in proper error handling callbacks.

## Information Dense Extract
NODEJS API: createServer((req, res) => void): Server; server.listen(port: number, hostname: string, callback: () => void). Assert module strict: import { strict as assert } from 'node:assert'; methods: assert(value, msg), assert.deepStrictEqual(actual, expected, msg), assert.strictEqual(actual, expected, msg), new assert.AssertionError({ message, actual, expected, operator, stackStartFn }). CallTracker (deprecated): tracker = new assert.CallTracker(); tracker.calls(fn, exact), tracker.getCalls(fn): Array, tracker.report(): Array, tracker.reset(fn?), tracker.verify(). CLI usage: node [options] script.js; env vars: NO_COLOR, NODE_DISABLE_COLORS. Stability indexes: 0 (Deprecated), 1 (Experimental), 2 (Stable), 3 (Legacy). Full API includes exact signatures and detailed code examples for immediate implementation.

## Sanitised Extract
TABLE OF CONTENTS:
1. HTTP Server
   - createServer(requestListener: function): Server
   - Exact usage: import { createServer } from 'node:http'; server.listen(port, hostname, callback)
2. Assertion Module (Strict and Legacy modes)
   - Strict mode: import { strict as assert } from 'node:assert'; methods: assert(value[, message]), assert.deepStrictEqual(actual, expected[, message]), assert.strictEqual(actual, expected[, message])
   - new assert.AssertionError(options) with options { message: string, actual: any, expected: any, operator: string, stackStartFn: Function }
   - Legacy mode: import assert from 'node:assert'; methods: assert.deepEqual, assert.equal, etc.
3. CallTracker (Deprecated)
   - new assert.CallTracker()
   - tracker.calls(fn, exact) returns wrapped function
   - tracker.getCalls(fn) returns array of { thisArg, arguments }
   - tracker.report() returns call summary
   - tracker.reset([fn]) resets call counts
   - tracker.verify() validates call counts
4. Configuration and CLI options
   - Command usage: node [options] [script.js] [arguments]
   - Environment variables: NO_COLOR, NODE_DISABLE_COLORS
5. Stability Index and Versioning
   - Stability 0: Deprecated, Stability 1: Experimental, Stability 2: Stable, Stability 3: Legacy

Detailed Topics:
HTTP Server: Use to create and listen on a server with detailed error handling and callback upon successful listen.
Assertion Module: Provides robust checks with strict equality and deep strict equality, including detailed diff output on failure. Includes full API for error handling and message customization.
CallTracker: Track function call frequency and verify that functions are called expected number of times; useful in testing scenarios.

## Original Source
Node.js Core and CLI Best Practices Documentation
https://nodejs.org/api/

## Digest of NODEJS_API

# Node.js API Documentation

Retrieved on: 2023-10-04

This document contains the core technical details from the Node.js API reference. It covers sections such as creating HTTP servers, using the assert module, and detailed method specifications including SDK method signatures, precise configuration options, and troubleshooting procedures.

# Table of Contents
1. HTTP Server
2. Assertion Module
3. Configuration and Environment Options
4. Version Stability and Guidelines

# 1. HTTP Server

- Method: createServer
  - Signature: import { createServer } from 'node:http';
  - Usage: createServer(requestListener: (req: IncomingMessage, res: ServerResponse) => void): Server
  - Example:
    import { createServer } from 'node:http';
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World!\n');
    });
    server.listen(3000, '127.0.0.1', () => {
      console.log('Listening on 127.0.0.1:3000');
    });

# 2. Assertion Module

The node:assert module provides functions for runtime assertions. Two modes are available: strict and legacy.

## Strict Assertion Mode
- Import: import { strict as assert } from 'node:assert'; or import assert from 'node:assert/strict';
- Key Methods:
  - assert(value[, message])
  - assert.deepStrictEqual(actual, expected[, message])
  - assert.strictEqual(actual, expected[, message])
  - new assert.AssertionError(options)
    - Options include: message (string), actual (any), expected (any), operator (string), stackStartFn (Function)
- Example:
    import assert from 'node:assert/strict';
    const { message } = new assert.AssertionError({
      actual: 1,
      expected: 2,
      operator: 'strictEqual'
    });
    try {
      assert.strictEqual(1, 2);
    } catch (err) {
      console.log(err.message);
    }

## Legacy Assertion Mode
- Import: import assert from 'node:assert';
- Methods such as assert.deepEqual() use non-strict equality (==).

## CallTracker Class (Deprecated)
- Method Signatures:
  - new assert.CallTracker()
  - tracker.calls(fn[, exact]) returns a wrapping function (default exact = 1)
  - tracker.getCalls(fn): Array of objects with keys { thisArg, arguments }
  - tracker.report(): Returns an array of call status objects
  - tracker.reset([fn]): Resets call tracker counts
  - tracker.verify(): Throws error if wrapped functions haven’t been called exact times

# 3. Configuration and Environment Options

- Node.js command line usage:
  node [options] [V8 options] [script.js | -e "script" | -] [arguments]
- Environment variables:
  - NO_COLOR and NODE_DISABLE_COLORS deactivates color output in REPL and error messages.

# 4. Version Stability and Guidelines

Each API section lists a stability index:
  - Stability 0: Deprecated (e.g., Domain module)
  - Stability 1: Experimental (e.g., Async hooks in early development)
  - Stability 2: Stable (e.g., HTTP, HTTPS, Buffer, etc.)
  - Stability 3: Legacy (e.g., Older non-strict assertion mode)

# Attribution
Data Size: 3566483 bytes, 2812 links found, no errors reported.

# Notes
For detailed system calls, man pages, and additional SDK method signatures, refer to the complete documentation on the Node.js website.

## Attribution
- Source: Node.js Core and CLI Best Practices Documentation
- URL: https://nodejs.org/api/
- License: License: MIT
- Crawl Date: 2025-05-02T04:48:43.930Z
- Data Size: 3566483 bytes
- Links Found: 2812

## Retrieved
2025-05-02
LIBRARY_DOCUMENT.md/MATHJAX.md
# LIBRARY_DOCUMENT.md/MATHJAX.md
# MATHJAX

## Crawl Summary
MathJax documentation (v3.2) details advanced configuration and integration for both web and Node.js environments. It specifies input (TeX, MathML, AsciiMath) and output (HTML, SVG, MathML) processors, detailed global configuration options (loader, startup, tex, svg) and exposes API methods like MathJax.typesetPromise() and MathJax.startup.promise. The documentation includes explicit configuration samples, method signatures, and troubleshooting instructions with error handling guidelines.

## Normalised Extract
Table of Contents: 1. Basics and Overview; 2. Web Integration and Node.js Usage; 3. Input Processors; 4. Output Processors; 5. Configuration Options; 6. API Methods; 7. Best Practices / Troubleshooting; 8. Data Metrics and Attribution. Basics: MathJax is an ES6/TypeScript engine for LaTeX, MathML, AsciiMath; supports accessibility. Web Integration: Include via script tag or custom build; for Node.js use asynchronous API via MathJax.startup.promise. Input Processors: Configure with keys tex, mathml, asciimath. Output Processors: Options include html, svg, and mathml with parameters like fontCache: 'global'. Configuration: Global MathJax object with loader, tex, svg, startup properties; custom ready function available. API Methods: MathJax.typesetPromise(): Promise<void>; MathJax.startup.promise: Promise<void>; MathJax.startup.reset(): void. Best Practices: Configure early, use typesetPromise for dynamic content; check MathJax.version for troubleshooting; log errors to console.

## Supplementary Details
Global configuration object sample: window.MathJax = { loader: { load: ['[tex]/autoload', '[tex]/require'] }, tex: { inlineMath: [['$', '$'], ['\\(', '\\)']], packages: {'[+]': ['autoload', 'require']} }, svg: { fontCache: 'global' }, startup: { typeset: false, ready: function() { MathJax.startup.defaultReady(); } } }; API details: MathJax.typesetPromise() returns a Promise<void> used for processing math after DOM updates. In Node.js, await MathJax.startup.promise before calling typesetting methods. Configuration options include input processor options (e.g., tex.inlineMath, mathml.enable) and output processor options (e.g., svg.fontCache set to 'global', html.linebreaks enabled). Troubleshooting: Verify configuration via console.log(MathJax.version) and check error messages; if MathJax.startup is undefined, review global configuration structure.

## Reference Details
API Specifications:
1. MathJax.startup.promise : Promise<void>
   - Description: Resolves when MathJax is loaded.
2. MathJax.typesetPromise() : Promise<void>
   - Parameters: none
   - Returns: Promise that resolves when typesetting completes
   - Usage: MathJax.typesetPromise().then(() => { /* success */ }).catch((err) => { console.error(err); });
3. MathJax.startup.reset() : void
   - Resets MathJax startup state.

SDK Method Signature Example:
// Global configuration object
window.MathJax = {
  loader: { load: ['[tex]/autoload', '[tex]/require'] },
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    packages: {'[+]': ['autoload', 'require']}
  },
  svg: { fontCache: 'global' },
  startup: {
    typeset: false,
    ready: function () {
      MathJax.startup.defaultReady();
      // Additional initialization code if required
    }
  }
};

Best Practices and Implementation Pattern:
- Configure MathJax before content loads to avoid flickering.
- In dynamic pages, call MathJax.typesetPromise() after DOM updates.
- For server-side rendering in Node.js, use async/await:
  async function renderMath() {
    await MathJax.startup.promise;
    await MathJax.typesetPromise();
  }

Detailed Troubleshooting Commands:
- Command: console.log(MathJax.version)
  Expected Output: String indicating the version (e.g., '3.2')
- If typesetting fails, review console for errors; revalidate the global configuration structure.
- Check network calls to ensure all components are loaded correctly.

Configuration Options and Effects:
- loader.load: Specifies which modules to load. Default: []
- tex.inlineMath: Array of delimiter pairs. Default: [['$', '$'], ['\\(', '\\)']]
- svg.fontCache: Option to enable global font caching. Default: 'global'
- startup.typeset: Boolean to control automatic typesetting; set false for manual control.


## Information Dense Extract
MathJax v3.2; Global config: { loader: { load: ['[tex]/autoload','[tex]/require'] }, tex: { inlineMath: [['$', '$'], ['\\(', '\\)']], packages: {'[+]': ['autoload','require']} }, svg: { fontCache: 'global' }, startup: { typeset: false, ready: fn } }; API: MathJax.startup.promise: Promise<void>; MathJax.typesetPromise(): Promise<void>; MathJax.startup.reset(): void; Best practices: Pre-configure MathJax, use typesetPromise() post-DOM updates, verify with console.log(MathJax.version); Node.js async/await integration; Troubleshooting: check console errors, validate config structure, network component loading; Data: 18083051 bytes, 6005 links, retrieval date Dec 07, 2024.

## Sanitised Extract
Table of Contents: 1. Basics and Overview; 2. Web Integration and Node.js Usage; 3. Input Processors; 4. Output Processors; 5. Configuration Options; 6. API Methods; 7. Best Practices / Troubleshooting; 8. Data Metrics and Attribution. Basics: MathJax is an ES6/TypeScript engine for LaTeX, MathML, AsciiMath; supports accessibility. Web Integration: Include via script tag or custom build; for Node.js use asynchronous API via MathJax.startup.promise. Input Processors: Configure with keys tex, mathml, asciimath. Output Processors: Options include html, svg, and mathml with parameters like fontCache: 'global'. Configuration: Global MathJax object with loader, tex, svg, startup properties; custom ready function available. API Methods: MathJax.typesetPromise(): Promise<void>; MathJax.startup.promise: Promise<void>; MathJax.startup.reset(): void. Best Practices: Configure early, use typesetPromise for dynamic content; check MathJax.version for troubleshooting; log errors to console.

## Original Source
MathJax Documentation
https://docs.mathjax.org/en/latest/

## Digest of MATHJAX

# MathJax Documentation Digest

This document provides exact technical details extracted from the MathJax documentation (version 3.2, built Dec 07, 2024). It covers the core configuration options, API methods, integration techniques for both browser and Node.js environments, input and output processor specifications, and detailed best practices for implementation.

## Table of Contents
1. Basics and Overview
2. Web Integration and Node.js Usage
3. Input Processors
4. Output Processors
5. Configuration Options
6. API and Method Signatures
7. Best Practices and Troubleshooting
8. Attribution and Data Metrics

## 1. Basics and Overview
- MathJax is an open-source JavaScript display engine for LaTeX, MathML, and AsciiMath.
- It is built in ES6 using TypeScript and supports both browser and server (Node.js) usage.
- Provides accessibility features including speakable text and interactive expression explorers.

## 2. Web Integration and Node.js Usage
- To include MathJax in a webpage, load the MathJax single-file build or a custom bundle.
- For Node.js, three usage patterns exist: using MathJax via direct API calls, loading components manually, and linking to a hosted copy.

## 3. Input Processors
- Supports TeX/LaTeX, MathML, and AsciiMath as input formats.
- Exact configuration keys include:
  - tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] }
  - mathml: { enable: true }
  - asciimath: { delimiters: [['`', '`']] }

## 4. Output Processors
- Offers several output formats like HTML with CSS styling, SVG, and MathML.
- Configuration options include:
  - svg: { fontCache: "global", useFontCache: true }
  - html: { linebreaks: true, scale: 1.0 }
  - mathml: {}

## 5. Configuration Options
- Global configuration is set via a global MathJax object. Example configuration:

  window.MathJax = {
    loader: { load: ['[tex]/autoload', '[tex]/require'] },
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      packages: {'[+]': ['autoload', 'require']}
    },
    svg: { fontCache: 'global' },
    startup: {
      typeset: false,
      ready: function () {
        MathJax.startup.defaultReady();
        // Additional startup code
      }
    }
  };

- Loader and startup options allow for selective component loading and custom build configuration.

## 6. API and Method Signatures
- MathJax API includes the following key method signatures:

  • MathJax.startup.promise : Promise<void>
    - Returns a promise that resolves when MathJax is fully loaded and configured.

  • MathJax.typesetPromise() : Promise<void>
    - Invokes the typesetting of mathematical expressions on the page.
    - Usage: MathJax.typesetPromise().then(callback).catch(errorCallback);

  • Direct API methods accessible via the Component API:
    - MathJax.startup.reset() : void
      Resets startup configuration and reprocesses the page.

- Errors are thrown as standard JavaScript Error objects with a descriptive message (e.g., configuration errors or missing components).

## 7. Best Practices and Troubleshooting
- Always configure MathJax before the page content loads to avoid reflow issues.
- Use MathJax.typesetPromise() in dynamic content to ensure math is processed after DOM updates.
- For Node.js operations, encapsulate MathJax usage in asynchronous functions and await MathJax.startup.promise.
- Troubleshooting:
    - Check browser console for detailed error messages.
    - Validate configuration object structure. Example validation:
      if (!window.MathJax || !MathJax.startup) { console.error('MathJax is not properly configured.'); }
    - Run a test command: console.log(MathJax.version) to verify loaded version.

## 8. Attribution and Data Metrics
- Data Size: 18083051 bytes
- Links Found: 6005
- Retrieval Date: Dec 07, 2024
- Source: https://docs.mathjax.org/en/latest/
- Built with Sphinx and Read the Docs theme.


## Attribution
- Source: MathJax Documentation
- URL: https://docs.mathjax.org/en/latest/
- License: License: Apache-2.0
- Crawl Date: 2025-05-02T11:47:06.637Z
- Data Size: 18083051 bytes
- Links Found: 6005

## Retrieved
2025-05-02
LIBRARY_DOCUMENT.md/SVG_DOC.md
# LIBRARY_DOCUMENT.md/SVG_DOC.md
# SVG_DOC

## Crawl Summary
SVG is an XML-based vector graphic format designed for scalability without quality loss. It includes a comprehensive set of elements and attributes (e.g., <svg>, <circle>, <rect>) defined in XML, integrated with HTML, CSS, and JavaScript. The DOM API permits dynamic creation and manipulation through methods like createElementNS, and attributes can be adjusted in real-time. Resources include detailed tutorials, developer guides, reference links, and validators to ensure the graphics mesh efficiently with other web standards.

## Normalised Extract
TOC: 1. SVG Markup 2. Element Reference 3. Attribute Reference 4. SVG DOM API 5. Integration with HTML/CSS/JS 6. Best Practices and Troubleshooting

1. SVG Markup: XML-based structure, <svg> container, supports grouping (<g>) and nested elements, namespace must be set to 'http://www.w3.org/2000/svg'.

2. Element Reference: Complete list includes svg, circle, rect, line, ellipse, polygon, polyline, path, text; each element has specific attributes defining shape, position, and styling.

3. Attribute Reference: Attributes such as fill, stroke, stroke-width, transform, viewBox; setup these parameters explicitly for desired visual effects. Default behaviors are defined by the browser engine based on W3C specs.

4. SVG DOM API: Use document.createElementNS with the SVG namespace; example method signature: createElementNS(namespaceURI: string, qualifiedName: string): Element. Methods include setAttribute(name: string, value: string) and getAttribute(name: string): string.

5. Integration: Embedded in HTML via <svg> tags; CSS can modify properties (e.g. .svgClass { fill: red; }); JavaScript can dynamically add elements and alter attributes using typical DOM methods.

6. Best Practices/Troubleshooting: Always include the proper xmlns attribute; verify element names are lowercase; use validators to check XML compliance; performance tip: simplify paths and compress using SVG optimizers; if rendering issues occur, check namespace declarations and attribute syntax.

## Supplementary Details
Parameter details: namespace for creation must be exactly 'http://www.w3.org/2000/svg'; element attributes must be explicitly defined to override browser defaults; configuration options for styling include setting fill, stroke, and transform values. Implementation steps: 1) Create an SVG container with proper xmlns; 2) Append child elements using createElementNS; 3) Set attributes using setAttribute, e.g., setAttribute('fill', 'blue'); 4) Integrate CSS for additional styling; 5) Use JavaScript event handlers for interactive animations. Typical troubleshooting: if an element does not render, check XML well-formedness, namespace correctness, and browser console for errors.

## Reference Details
API Specifications:

Method: document.createElementNS(namespaceURI: string, qualifiedName: string): Element
Usage Example:
// Create an SVG rectangle
var svgNS = 'http://www.w3.org/2000/svg';
var rect = document.createElementNS(svgNS, 'rect');
// Set rectangle attributes
rect.setAttribute('x', '10');
rect.setAttribute('y', '10');
rect.setAttribute('width', '100');
rect.setAttribute('height', '50');
rect.setAttribute('fill', 'green');

Other Methods:
- setAttribute(name: string, value: string): void
- getAttribute(name: string): string

Configuration Options:
- xmlns attribute: Must be 'http://www.w3.org/2000/svg' for the root <svg> tag
- viewBox: Defines coordinate system; format 'minX minY width height'
- Preset styles: Use CSS classes or inline style attributes.

Best Practices:
1. Always declare the SVG namespace in the root element.
2. Use semantic element naming (<circle> for circles, etc.) for accessibility and clarity.
3. Validate SVG markup using an XML validator to avoid rendering issues.
4. Optimize SVG paths to reduce file size while maintaining quality.
5. Use external CSS to style elements where possible for maintainability.

Troubleshooting Procedures:
- Command: Use browser developer tools to inspect SVG elements and check for namespace errors.
- Expected Output: Elements should be visible and styled as defined; if not, errors such as 'NS_ERR_INVALID_CHARACTER' indicate syntax issues.
- Command: Validate SVG file using online XML validators and W3C validator services.
- If rendering issues occur, verify that all tag names and attributes are in lowercase and properly closed.


## Information Dense Extract
SVG: XML-based vector graphics; namespace 'http://www.w3.org/2000/svg'; elements: svg, circle, rect, line, path; attributes: fill, stroke, transform, viewBox; API: createElementNS(namespace, name), setAttribute(name, value), getAttribute(name); integration: embedded in HTML, styled with CSS, manipulated with JavaScript; best practices: proper namespace declaration, XML validation, optimized paths; troubleshooting: check console errors, validate markup, ensure lowercase tags

## Sanitised Extract
TOC: 1. SVG Markup 2. Element Reference 3. Attribute Reference 4. SVG DOM API 5. Integration with HTML/CSS/JS 6. Best Practices and Troubleshooting

1. SVG Markup: XML-based structure, <svg> container, supports grouping (<g>) and nested elements, namespace must be set to 'http://www.w3.org/2000/svg'.

2. Element Reference: Complete list includes svg, circle, rect, line, ellipse, polygon, polyline, path, text; each element has specific attributes defining shape, position, and styling.

3. Attribute Reference: Attributes such as fill, stroke, stroke-width, transform, viewBox; setup these parameters explicitly for desired visual effects. Default behaviors are defined by the browser engine based on W3C specs.

4. SVG DOM API: Use document.createElementNS with the SVG namespace; example method signature: createElementNS(namespaceURI: string, qualifiedName: string): Element. Methods include setAttribute(name: string, value: string) and getAttribute(name: string): string.

5. Integration: Embedded in HTML via <svg> tags; CSS can modify properties (e.g. .svgClass { fill: red; }); JavaScript can dynamically add elements and alter attributes using typical DOM methods.

6. Best Practices/Troubleshooting: Always include the proper xmlns attribute; verify element names are lowercase; use validators to check XML compliance; performance tip: simplify paths and compress using SVG optimizers; if rendering issues occur, check namespace declarations and attribute syntax.

## Original Source
SVG and Vector Graphics Documentation
https://developer.mozilla.org/en-US/docs/Web/SVG

## Digest of SVG_DOC

# SVG Documentation Digest

Date Retrieved: 2025-04-15

## Overview

SVG (Scalable Vector Graphics) is an XML-based markup language used to define two-dimensional vector graphics accurately at any scale. It integrates directly with CSS, DOM, JavaScript, and SMIL for dynamic effects and scripting.

## SVG Markup and Structure

- XML-based format with tags such as <svg>, <circle>, <rect>, <path>, etc.
- Elements and attributes are case-insensitive; recommended practice is to use lowercase.
- Supports grouping, styling, and animation directly within the SVG file.

## Element and Attribute Reference

- Detailed element reference (e.g., <svg>, <g>, <circle>, <rect>, <line>, <polyline>, <polygon>, <path>).
- Attribute reference covers properties like fill, stroke, transform, viewBox, and others.

## SVG DOM API

- Provides interfaces for scripting. For example:
  - document.createElementNS('http://www.w3.org/2000/svg', 'rect') returns an SVGRectElement.
  - Methods for setting attributes, such as setAttribute('fill', 'blue').
- Precise DOM interfaces that allow manipulation and animation via JavaScript.

## Integration with HTML, CSS, and JavaScript

- SVG can be embedded in HTML documents using the <svg> tag.
- CSS can target SVG elements for styling through class or id selectors.
- JavaScript can interact with SVG elements via the DOM, allowing dynamic updates and animations.

## Tutorials, Best Practices, and Resources

- MDN provides tutorials like 'Introducing SVG from scratch' which include internal details of SVG elements and attributes.
- Best practices include maintaining proper namespace declarations, using descriptive IDs, and optimizing SVG content for performance.

## Tools and Testing

- SVG test suite and markup validators are provided to ensure compliance with W3C standards.
- Libraries can be integrated for on-the-fly localization and dynamic modifications.

## Attribution and Data Details

- Data Size: 1187342 bytes
- Crawl Source: MDN Developer Page for SVG Documentation
- Last Modified: Mar 18, 2025


## Attribution
- Source: SVG and Vector Graphics Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG
- License: Various: CC-BY-SA, W3C Document License, MIT, GPL
- Crawl Date: 2025-05-02T00:32:59.849Z
- Data Size: 1187342 bytes
- Links Found: 30923

## Retrieved
2025-05-02
LIBRARY_DOCUMENT.md/OPENAI_API.md
# LIBRARY_DOCUMENT.md/OPENAI_API.md
# OPENAI_API

## Crawl Summary
Crawled content from https://platform.openai.com/docs/api-reference/ returned no data. Manually integrated API endpoints include Chat Completions, Completions, Embeddings, and Files with full specifications on endpoints, required parameters, optional configurations, and expected response structures.

## Normalised Extract
Table of Contents:
1. Chat Completions Endpoint
   - Endpoint: POST https://api.openai.com/v1/chat/completions
   - Required: model (string), messages (array<{ role, content }>)
   - Optional: temperature (number, default 1.0), max_tokens (number), top_p (number), n (number), stream (boolean)
   - Returns: ChatCompletionResponse with id, object, created, choices, usage
2. Completions Endpoint
   - Endpoint: POST https://api.openai.com/v1/completions
   - Required: model (string), prompt (string)
   - Optional: temperature, max_tokens, top_p, frequency_penalty, presence_penalty
   - Returns: CompletionResponse
3. Embeddings Endpoint
   - Endpoint: POST https://api.openai.com/v1/embeddings
   - Required: model (e.g., text-embedding-ada-002), input (string or array of strings)
   - Returns: EmbeddingResponse containing embedding vectors
4. Files Endpoint
   - Endpoint: POST https://api.openai.com/v1/files
   - Required: file (multipart) and purpose (string, e.g., 'fine-tune')
   - Returns: FileUploadResponse
5. Error Handling
   - Uses standard HTTP error codes and error detail object
6. Configuration Options
   - Required Headers: Authorization: Bearer <API_KEY>, Content-Type: application/json

## Supplementary Details
Chat Completions Detailed:
- API Endpoint: POST https://api.openai.com/v1/chat/completions
- SDK Method: createChatCompletion(model, messages, options)
- Parameters: model (string), messages (array of { role, content }), options (optional: temperature, max_tokens, top_p, n, stream)
- Default temperature = 1.0
- Response: { id: string, object: string, created: number, choices: [ { index: number, message: { role: string, content: string }, finish_reason: string } ], usage: { prompt_tokens: number, completion_tokens: number, total_tokens: number } }

Completions Detailed:
- API Endpoint: POST https://api.openai.com/v1/completions
- SDK Method: createCompletion(model, prompt, options)
- Parameters similar to chat completions

Embeddings Detailed:
- API Endpoint: POST https://api.openai.com/v1/embeddings
- SDK Method: createEmbedding(model, input)
- Recommended model: text-embedding-ada-002

Files Detailed:
- API Endpoint: POST https://api.openai.com/v1/files
- SDK Method: uploadFile(file, purpose)
- Use for fine-tuning file uploads

Configuration & SDK Initialization:
- Set apiKey in SDK configuration (e.g., process.env.OPENAI_API_KEY)
- Headers: Authorization: Bearer <API_KEY>, Content-Type: application/json

Implementation Sequence:
1. Install SDK (npm install openai)
2. Import and configure client
3. Invoke endpoint method with appropriate parameters
4. Process response; use try-catch to handle errors

Troubleshooting Steps:
- Run: curl https://api.openai.com/v1/models -H 'Authorization: Bearer YOUR_API_KEY'
- Check output for list of models
- Validate API key and network
- Inspect error response details for rate limits or parameter issues

## Reference Details
Chat Completions API:
- Endpoint: POST https://api.openai.com/v1/chat/completions
- Method Signature: createChatCompletion(model: string, messages: Array<{ role: 'system' | 'user' | 'assistant', content: string }>, options?: { temperature?: number, max_tokens?: number, top_p?: number, n?: number, stream?: boolean }): Promise<ChatCompletionResponse>
- Required Parameters: model (string), messages (array), options (optional)
- Return Type: ChatCompletionResponse { id: string, object: string, created: number, choices: Array<{ index: number, message: { role: string, content: string }, finish_reason: string }>, usage: { prompt_tokens: number, completion_tokens: number, total_tokens: number } }

Completions API:
- Endpoint: POST https://api.openai.com/v1/completions
- Method Signature: createCompletion(model: string, prompt: string, options?: { temperature?: number, max_tokens?: number, top_p?: number, frequency_penalty?: number, presence_penalty?: number }): Promise<CompletionResponse>

Embeddings API:
- Endpoint: POST https://api.openai.com/v1/embeddings
- Method Signature: createEmbedding(model: string, input: string | string[]): Promise<EmbeddingResponse>

Files API:
- Endpoint: POST https://api.openai.com/v1/files
- Method Signature: uploadFile(file: File, purpose: string): Promise<FileUploadResponse>

Node.js SDK Example:
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

async function exampleChatCompletion() {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello' }],
      temperature: 0.7
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

Configuration:
- API Key: string from environment variable OPENAI_API_KEY
- HTTP Headers: { Authorization: 'Bearer <API_KEY>', 'Content-Type': 'application/json' }

Best Practices:
- Validate responses and implement error handling using try-catch
- Utilize exponential backoff on rate-limit errors

Troubleshooting:
- Command: curl https://api.openai.com/v1/models -H 'Authorization: Bearer YOUR_API_KEY'
- Expected: JSON list of model details; on failure, verify API key and connectivity

## Information Dense Extract
POST /v1/chat/completions: model:string, messages: Array<{role,content}>, options:{temperature(default1.0),max_tokens,top_p,n,stream} -> ChatCompletionResponse{id,object,created,choices[],usage}; POST /v1/completions: model:string, prompt:string, options:{temperature,max_tokens,top_p,frequency_penalty,presence_penalty} -> CompletionResponse; POST /v1/embeddings: model:string (prefer text-embedding-ada-002), input:string|string[] -> EmbeddingResponse; POST /v1/files: file:multipart, purpose:string ('fine-tune') -> FileUploadResponse; SDK Node.js: use openai npm with configuration {apiKey}; HTTP Headers: Authorization:Bearer <API_KEY>, Content-Type:application/json; recommend try-catch and curl testing.

## Sanitised Extract
Table of Contents:
1. Chat Completions Endpoint
   - Endpoint: POST https://api.openai.com/v1/chat/completions
   - Required: model (string), messages (array<{ role, content }>)
   - Optional: temperature (number, default 1.0), max_tokens (number), top_p (number), n (number), stream (boolean)
   - Returns: ChatCompletionResponse with id, object, created, choices, usage
2. Completions Endpoint
   - Endpoint: POST https://api.openai.com/v1/completions
   - Required: model (string), prompt (string)
   - Optional: temperature, max_tokens, top_p, frequency_penalty, presence_penalty
   - Returns: CompletionResponse
3. Embeddings Endpoint
   - Endpoint: POST https://api.openai.com/v1/embeddings
   - Required: model (e.g., text-embedding-ada-002), input (string or array of strings)
   - Returns: EmbeddingResponse containing embedding vectors
4. Files Endpoint
   - Endpoint: POST https://api.openai.com/v1/files
   - Required: file (multipart) and purpose (string, e.g., 'fine-tune')
   - Returns: FileUploadResponse
5. Error Handling
   - Uses standard HTTP error codes and error detail object
6. Configuration Options
   - Required Headers: Authorization: Bearer <API_KEY>, Content-Type: application/json

## Original Source
OpenAI API Documentation
https://platform.openai.com/docs/api-reference/

## Digest of OPENAI_API

# OpenAI API Documentation
Retrieved Date: 2023-10-06

## Chat Completions Endpoint
Endpoint: POST https://api.openai.com/v1/chat/completions
Method Signature: function createChatCompletion(model: string, messages: Array<{ role: 'system' | 'user' | 'assistant', content: string }>, options?: { temperature?: number, max_tokens?: number, top_p?: number, n?: number, stream?: boolean }): Promise<ChatCompletionResponse>
Required Parameters:
- model: string (required)
- messages: array of objects (required)
Optional Parameters:
- temperature: number (default 1.0)
- max_tokens: number
- top_p: number
- n: number
- stream: boolean
Response: ChatCompletionResponse object with keys: id, object, created, choices (array), usage (object)

## Completions Endpoint
Endpoint: POST https://api.openai.com/v1/completions
Method Signature: function createCompletion(model: string, prompt: string, options?: { temperature?: number, max_tokens?: number, top_p?: number, frequency_penalty?: number, presence_penalty?: number }): Promise<CompletionResponse>
Required:
- model: string
- prompt: string
Optional parameters follow similar conventions as chat completions.

## Embeddings Endpoint
Endpoint: POST https://api.openai.com/v1/embeddings
Method Signature: function createEmbedding(model: string, input: string | string[]): Promise<EmbeddingResponse>
Notes:
- Commonly used model: text-embedding-ada-002
- Input can be a single string or array of strings

## Files Endpoint
Endpoint: POST https://api.openai.com/v1/files
Method Signature: function uploadFile(file: File, purpose: string): Promise<FileUploadResponse>
Parameters:
- file: multipart file upload
- purpose: string (e.g., 'fine-tune')

## Error Handling
Standard HTTP error codes are used. The error response body contains details such as error code, message, and type.

## Configuration
Headers:
- Authorization: Bearer <API_KEY>
- Content-Type: application/json
SDK: Available for Node.js, Python, etc. Node.js usage example provided below.

## Example Node.js SDK Usage
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

async function exampleChatCompletion() {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello' }],
      temperature: 0.7
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

## Troubleshooting
- Validate API key via header check: Ensure Authorization header is 'Bearer <YOUR_API_KEY>'
- Use curl command:
  curl https://api.openai.com/v1/models -H 'Authorization: Bearer YOUR_API_KEY'
- Check network connectivity and error codes for guidance.


## Attribution
- Source: OpenAI API Documentation
- URL: https://platform.openai.com/docs/api-reference/
- License: License: N/A
- Crawl Date: 2025-05-02T12:59:27.929Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-02
LIBRARY_DOCUMENT.md/NODE_ESM.md
# LIBRARY_DOCUMENT.md/NODE_ESM.md
# NODE_ESM

## Crawl Summary
Node.js supports ECMAScript modules which are enabled via file extensions (.mjs), package.json type settings, or CLI flags. Import specifiers are classified as relative, bare, or absolute. Mandatory file extensions are enforced similar to browser environments. Supported URL schemes include file:, node:, and data:, with special handling for query strings and percent-encoded characters. Import attributes (e.g. { type: 'json' }) are required for JSON modules. Built-in modules and dynamic import() expressions are supported. The import.meta object provides module-specific metadata, including url, filename, dirname, and a synchronous resolve function. Interoperability with CommonJS is achieved through module.createRequire() and special resolution behavior. The resolution algorithm (ESM_RESOLVE and ESM_FILE_FORMAT) details rules for resolving specifiers, handling bare specifiers via node_modules, and defining module formats. Custom loaders can override these defaults.

## Normalised Extract
Table of Contents:
  1. Introduction
    - Overview of ESM format and interoperability with CommonJS
  2. Enabling Modules
    - .mjs extension, package.json "type": "module", --input-type flag
  3. Import Specifiers
    - Relative specifiers require file extensions
    - Bare specifiers resolved via node_modules and package exports
    - Absolute specifiers as file URLs
  4. File Extensions and URLs
    - Mandatory file extensions; percent-encoding in URLs
    - Supported schemes: file:, node:, data:
  5. Import Attributes
    - Syntax for JSON modules: with { type: 'json' }
  6. Built-in Modules and Dynamic Imports
    - Default and named exports, dynamic import() usage
  7. import.meta Object
    - Properties: url, filename, dirname, resolve(specifier[, parent])
    - Method signature: import.meta.resolve(specifier: string, parent?: string|URL) returns string
  8. Module Resolution Algorithms
    - ESM_RESOLVE for full resolution and format detection
    - ESM_FILE_FORMAT for determining module type based on extension or content
  9. Customization Hooks
    - How to customize resolver behaviors using experimental hooks

Detailed Information:
1. Introduction: Use ECMAScript modules to enable modular JavaScript with clear boundary between CommonJS and ESM. Provide interoperability through default exports and module.createRequire().

2. Enabling Modules: When no explicit markers exist, Node.js inspects source code for ESM syntax; use explicit markers to avoid ambiguity.

3. Import Specifiers: Relative specifiers (./, ../) require complete file paths. Bare specifiers refer to packages and use package.json export fields if available.

4. File Extensions and URLs: Always include file extensions; use url.pathToFileURL for conversion. Query strings create separate module loads.

5. Import Attributes: Mandatory for JSON imports. Syntax: import data from './data.json' with { type: 'json' }.

6. Built-in Modules: Import built-in modules with node: prefix, e.g. import fs from 'node:fs'.

7. import.meta Object: Use to get module-specific info. Example: import.meta.url returns absolute URL; import.meta.resolve('module-name') synchronously resolves specifiers.

8. Module Resolution Algorithms:
   - ESM_RESOLVE(specifier, parentURL): if specifier is URL, resolve directly; else if relative, resolve via URL resolution; if bare, use PACKAGE_RESOLVE.
   - ESM_FILE_FORMAT(url): determines format based on extension (.mjs -> module, .cjs -> commonjs, .json -> json) or detection of ESM syntax.

9. Customization Hooks: Use experimental hooks to override resolution; remove deprecated hooks such as getFormat, transformSource in favor of load and globalPreload hooks.


## Supplementary Details
Technical Specifications:
- Enabling ESM:
  • File Extensions: .mjs for modules, .cjs for CommonJS
  • package.json field: "type": "module" or "commonjs"
  • CLI Flags: --input-type=module or --input-type=commonjs

- Import Attributes:
  • Syntax: import foo from './foo.json' with { type: 'json' }
  • Mandatory for JSON modules

- import.meta Object:
  • Properties:
     - url: string representing the absolute file URL
     - filename: string, equivalent to url.fileURLToPath(import.meta.url)
     - dirname: string, directory of the file
  • Method: resolve(specifier: string, parent?: string|URL) => string

- Resolution Algorithms:
  • ESM_RESOLVE(specifier, parentURL): returns object with resolved URL and format.
  • ESM_FILE_FORMAT(url): returns 'module', 'commonjs', 'json', 'wasm', or 'addon'

- Customization Hooks for loaders: Hooks allow asynchronous module resolution and loading; experimental support for chaining module customization hooks.

- Best Practices:
  • Always specify file extensions
  • Use import.meta.filename and import.meta.dirname instead of __filename and __dirname
  • For CommonJS compatibility use module.createRequire()

- Troubleshooting Procedures:
  • If import resolution fails, check explicit file extensions, verify package.json "type", and use import.meta.resolve() to debug path resolution.
  • For modules with query strings, clear loader cache if duplicate loads occur.
  • Use trace events in Node.js by enabling --trace-resolve to log resolution details.


## Reference Details
API Specifications:
1. import.meta.resolve(specifier: string, parent?: string | URL) => string
   - Parameters:
       specifier: string - The module specifier to resolve relative to the current module.
       parent (optional): string|URL - An absolute URL from which resolution begins (defaults to import.meta.url).
   - Returns: string - The absolute URL string of the resolved module.
   - Exceptions: May throw errors such as Invalid Module Specifier if the specifier is malformed.

2. ESM_RESOLVE(specifier: string, parentURL: string) => { format: string, resolved: string }
   - Detailed steps:
       a. If specifier is a valid URL, parse and return.
       b. If specifier is relative, perform standard URL resolution.
       c. If bare, delegate to PACKAGE_RESOLVE to handle node_modules lookup and package exports.
   - Return Types: format may be 'module', 'commonjs', 'json', 'wasm' or undefined if resolution fails.

3. ESM_FILE_FORMAT(url: string) => string
   - Determines the module format based on file extension:
       .mjs returns 'module'
       .cjs returns 'commonjs'
       .json returns 'json'
       .wasm returns 'wasm' (if enabled)
       .node returns 'addon' (if enabled)
       .js may return either based on package.json "type" or ESM syntax detection

Code Examples:
// Example of a module exporting a function using ESM
// addTwo.mjs
function addTwo(num) {
  return num + 2;
}
export { addTwo };

// Example of importing the ESM module
// app.mjs
import { addTwo } from './addTwo.mjs';
console.log(addTwo(4)); // Output: 6

// Example of using import.meta
console.log(import.meta.url);
const resolved = import.meta.resolve('./dep.js');
console.log(resolved);

// Using module.createRequire for CommonJS compatibility
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cjsModule = require('./cjsModule');

Configuration Options and Flags:
- --input-type=module or --input-type=commonjs
- package.json: {
    "type": "module"
  }
- Experimental Flags: --experimental-wasm-modules, --experimental-addon-modules, --experimental-import-meta-resolve

Best Practices with Implementation Code:
- Always specify file extensions in import statements.
- Replace __filename and __dirname usage with import.meta.filename and import.meta.dirname.
- For dynamic module loading in CommonJS, use dynamic import() or module.createRequire().
- Validate module paths with import.meta.resolve() to debug resolution issues.

Troubleshooting Procedures:
- Command: node --trace-resolve app.mjs
  Expected Output: Detailed logs of module resolution steps including resolved URLs and format decisions.
- Check package.json for correct "type" field if modules do not load as expected.
- Use url.pathToFileURL to convert file paths if discrepancies exist between URL resolution and file system paths.


## Information Dense Extract
ESM enabled via .mjs, package.json "type": "module", --input-type flag; Import specifiers: relative (require full extension), bare (node_modules lookup, package "exports"), absolute (file URL). Mandatory file extensions. Supported URL schemes: file:, node:, data:; Import attributes: syntax 'with { type: "json" }' mandatory for JSON. import.meta: properties url, filename, dirname; method: resolve(specifier: string, parent?: string|URL): string; Resolution: ESM_RESOLVE returns {resolved, format}, ESM_FILE_FORMAT returns module format based on extension (.mjs->module, .cjs->commonjs, .json->json, .wasm, .node); Use module.createRequire for CommonJS in ESM; Flags: --experimental-wasm-modules, --experimental-addon-modules; Best Practices: explicit file extensions, usage of import.meta.* in lieu of CommonJS globals; Troubleshooting: use --trace-resolve and url.pathToFileURL for debugging.

## Sanitised Extract
Table of Contents:
  1. Introduction
    - Overview of ESM format and interoperability with CommonJS
  2. Enabling Modules
    - .mjs extension, package.json 'type': 'module', --input-type flag
  3. Import Specifiers
    - Relative specifiers require file extensions
    - Bare specifiers resolved via node_modules and package exports
    - Absolute specifiers as file URLs
  4. File Extensions and URLs
    - Mandatory file extensions; percent-encoding in URLs
    - Supported schemes: file:, node:, data:
  5. Import Attributes
    - Syntax for JSON modules: with { type: 'json' }
  6. Built-in Modules and Dynamic Imports
    - Default and named exports, dynamic import() usage
  7. import.meta Object
    - Properties: url, filename, dirname, resolve(specifier[, parent])
    - Method signature: import.meta.resolve(specifier: string, parent?: string|URL) returns string
  8. Module Resolution Algorithms
    - ESM_RESOLVE for full resolution and format detection
    - ESM_FILE_FORMAT for determining module type based on extension or content
  9. Customization Hooks
    - How to customize resolver behaviors using experimental hooks

Detailed Information:
1. Introduction: Use ECMAScript modules to enable modular JavaScript with clear boundary between CommonJS and ESM. Provide interoperability through default exports and module.createRequire().

2. Enabling Modules: When no explicit markers exist, Node.js inspects source code for ESM syntax; use explicit markers to avoid ambiguity.

3. Import Specifiers: Relative specifiers (./, ../) require complete file paths. Bare specifiers refer to packages and use package.json export fields if available.

4. File Extensions and URLs: Always include file extensions; use url.pathToFileURL for conversion. Query strings create separate module loads.

5. Import Attributes: Mandatory for JSON imports. Syntax: import data from './data.json' with { type: 'json' }.

6. Built-in Modules: Import built-in modules with node: prefix, e.g. import fs from 'node:fs'.

7. import.meta Object: Use to get module-specific info. Example: import.meta.url returns absolute URL; import.meta.resolve('module-name') synchronously resolves specifiers.

8. Module Resolution Algorithms:
   - ESM_RESOLVE(specifier, parentURL): if specifier is URL, resolve directly; else if relative, resolve via URL resolution; if bare, use PACKAGE_RESOLVE.
   - ESM_FILE_FORMAT(url): determines format based on extension (.mjs -> module, .cjs -> commonjs, .json -> json) or detection of ESM syntax.

9. Customization Hooks: Use experimental hooks to override resolution; remove deprecated hooks such as getFormat, transformSource in favor of load and globalPreload hooks.

## Original Source
ECMAScript Modules in Node.js Documentation
https://nodejs.org/api/esm.html

## Digest of NODE_ESM

# Node.js ECMAScript Modules Documentation

Retrieved on: 2023-10-18

## Introduction
ECMAScript modules (ESM) provide the official mechanism to package JavaScript code for reuse. This document includes detailed specifications, method signatures, configuration options, and implementation patterns extracted from Node.js v23.11.0 documentation.

## Enabling ECMAScript Modules
- Mark as ESM using .mjs extension, package.json "type": "module", or --input-type=module flag.
- For CommonJS, use .cjs extension, package.json "type": "commonjs", or --input-type=commonjs.

## Import Specifiers
- Relative: './file.mjs'; Absolute: 'file:///path/to/module.js'; Bare: 'package' or 'package/feature'.
- Resolution: Bare specifiers use Node.js module resolution algorithm to locate modules in node_modules unless overridden by package "exports" field.

## Mandatory File Extensions
- Import statements require explicit file extensions; directory indexes require full specification (e.g. './startup/index.js').

## URLs and Schemes
- Supported schemes: file:, node:, data:.
- Percent-encoding required for special characters (e.g., '#' as %23).
- file: URLs load modules and can differ based on query strings causing multiple loads.

## Data: and Node: Imports
- Data: URLs: Supported MIME types: text/javascript, application/json, application/wasm (requires { type: 'json' } for JSON imports).
- Node: URLs load Node.js built-in modules (e.g., import fs from 'node:fs/promises').

## Import Attributes
- Syntax: import foo from './foo.json' with { type: 'json' }.
- Only supported attribute is "type" for JSON modules. Attribute is mandatory for JSON.

## Built-in Modules and import() expressions
- Built-in modules export named exports and default that trails module.syncBuiltinESMExports().
- Dynamic import() is supported in both ESM and CommonJS (in CommonJS modules to load ESM).

## import.meta Object
- Properties: 
  - import.meta.url: string (absolute file URL).
  - import.meta.filename: string (absolute file path, only for file: modules).
  - import.meta.dirname: string (directory name equivalent to path.dirname(import.meta.filename)).
  - import.meta.resolve(specifier: string[, parent: string|URL]): string; returns resolved URL synchronously.

## Interoperability with CommonJS
- ESM loads CommonJS modules with a default export as module.exports and may provide static analysis for named exports.
- CommonJS specific variables (__filename, __dirname) are replaced by import.meta.filename and import.meta.dirname.
- module.createRequire() can be used to load CommonJS modules when needed.

## JSON Modules and WASM Modules
- JSON modules require { type: 'json' } in import statements; provide default export only.
- WASM modules: Enabled with --experimental-wasm-modules flag; imported as normal modules returning exports interface.

## Top-Level Await
- Top-level await can be used directly in ESM. Unresolved promises exit with status code 13.
- Example: export const value = await Promise.resolve(5);

## Loaders and Module Resolution
- Custom loaders and resolution hooks allow overriding default behavior.
- Default resolution supports: FileURL-based resolution, bare specifiers in node_modules, and inline data: URLs.

## Resolution Algorithms
### ESM_RESOLVE(specifier, parentURL)
- Valid URL: returns parsed URL string.
- Relative specifiers use standard URL resolution.
- Bare specifiers pass through PACKAGE_RESOLVE with node_modules lookup.
- Returns: { format: string, resolved: string }.

### ESM_FILE_FORMAT(url)
- Returns "module" for .mjs, "commonjs" for .cjs, "json" for .json, "wasm" if experimental flag enabled for .wasm, and "addon" for .node if enabled.
- Fallback: uses package.json "type" or detection of ESM syntax.

## Customizing ESM Specifier Resolution
- Use module customization hooks to override ESM resolution (e.g. commonjs-extension-resolution-loader).
- Hooks can alter behavior for getFormat, load, and globalPreload using defined specifier resolution rules.

## Attribution
- Data Size: 4304332 bytes
- Source: https://nodejs.org/api/esm.html, Node.js v23.11.0 documentation


## Attribution
- Source: ECMAScript Modules in Node.js Documentation
- URL: https://nodejs.org/api/esm.html
- License: License: MIT
- Crawl Date: 2025-05-02T10:48:37.177Z
- Data Size: 4304332 bytes
- Links Found: 5203

## Retrieved
2025-05-02
LIBRARY_DOCUMENT.md/SHARP_API.md
# LIBRARY_DOCUMENT.md/SHARP_API.md
# SHARP_API

## Crawl Summary
The sharp module offers high-speed image processing using libvips, handling multiple image formats (JPEG, PNG, WebP, GIF, AVIF, TIFF, SVG). Constructors accept diverse inputs with extensive options (failOn, limitInputPixels, autoOrient, raw, create, text, join). Output methods include toFile and toBuffer, with metadata preservation (keepExif, withMetadata) and format-specific options for JPEG, PNG, WebP, etc. It supports stream-based, non-blocking operations, cross-platform installs, and advanced configuration via environment variables and npm flags.

## Normalised Extract
TABLE OF CONTENTS
1. Constructor and Input Options
   - new Sharp([input], [options])
   - Input types: Buffer, ArrayBuffer, Uint8Array, string, Array
   - Options: failOn (string, default 'warning'), limitInputPixels (number, default 268402689), unlimited (boolean, default false), autoOrient (boolean), sequentialRead (boolean, default true), density (number), ignoreIcc (boolean), pages (number), page (number), subifd (number), level (number), pdfBackground (string|Object), animated (boolean), raw (object with width, height, channels, premultiplied), create (object with width, height, channels, background, noise), text (object with parameters: text, font, fontfile, width, height, align, justify, dpi, rgba, spacing, wrap), join (object with across, animated, shim, background, halign, valign).
2. Output Methods
   - toFile(fileOut, [callback]) returns Promise.<Object> (info contains format, size, width, height, channels)
   - toBuffer([options], [callback]) returns Promise.<Buffer> (resolveWithObject returns { data, info })
3. Metadata and Transformation Options
   - keepExif(), withExif(exif), withExifMerge(exif), keepIccProfile(), withIccProfile(icc, [options]), keepMetadata(), withMetadata([options])
4. Format-Specific Methods and Options
   - toFormat(format, options)
   - jpeg([options]): quality (1-100), progressive, chromaSubsampling (default '4:2:0'), optimiseCoding, mozjpeg, trellisQuantisation, overshootDeringing, optimiseScans, quantisationTable
   - png([options]): progressive, compressionLevel (0-9), adaptiveFiltering, palette, quality, effort, colours, dither, force
   - webp([options]): quality, alphaQuality, lossless, nearLossless, smartSubsample, smartDeblock, preset, effort, loop, delay, minSize, mixed, force
   - gif([options]): reuse, progressive, colours, effort, dither, interFrameMaxError, interPaletteMaxError, loop, delay, force
   - jp2([options]), tiff([options]), avif([options]), heif(options), jxl([options]) with respective quality, compression, tile, bitdepth and additional parameters.
5. Implementation Patterns and Best Practices
   - Use clone() to create processing pipelines from a single input stream.
   - Configure environment variables SHARP_IGNORE_GLOBAL_LIBVIPS and SHARP_FORCE_GLOBAL_LIBVIPS for custom libvips handling.
   - Use npm flags (--cpu, --os, --libc) for cross-compiling and multi-platform deployment.
   - Exclude sharp in bundlers (webpack, esbuild, electron) via externals or unpack configurations.
6. Troubleshooting
   - For memory issues on glibc systems, switch to jemalloc.
   - AWS Lambda: include correct binaries; avoid symbolic links; set appropriate memory (e.g., 1536 MB for optimal CPU time).
   - Font errors: set FONTCONFIG_PATH when default fontconfig config is missing.

Detailed Technical Details:
Constructor new Sharp(input, options):
  input: Buffer | ArrayBuffer | Uint8Array | string | Array (joined together)
  options.failOn: string, default 'warning'
  options.limitInputPixels: number | boolean, default 268402689
  options.unlimited: boolean, default false
  options.autoOrient: boolean, default false
  options.sequentialRead: boolean, default true
  options.density: number (default 72)
  options.raw: { width: number, height: number, channels: number, premultiplied?: boolean (default false) }
  options.create: { width: number, height: number, channels: 3|4, background: string|Object, noise?: { type: 'gaussian', mean: number, sigma: number } }
  options.text: { text: string, font?: string, fontfile?: string, width?: number, height?: number, align?: 'left'|'centre'|'center'|'right', justify?: boolean, dpi?: number, rgba?: boolean, spacing?: number, wrap?: 'word'|'char'|'word-char'|'none' }
  options.join: { across: number, animated?: boolean, shim?: number, background?: string|Object, halign?: 'left'|'centre'|'center'|'right', valign?: 'top'|'centre'|'center'|'bottom' }

Output Methods:
  toFile(fileOut, [callback]) throws Error if invalid parameters; returns Promise with info { format, size, width, height, channels, ... }
  toBuffer([{ resolveWithObject: boolean }], [callback]) returns Promise<Buffer> or { data, info } if resolved with object.

Metadata Methods:
  keepExif() returns Sharp
  withExif(exif: Object) returns Sharp
  withExifMerge(exif: Object) returns Sharp
  keepIccProfile() returns Sharp
  withIccProfile(icc: string, [options: { attach: boolean }]) returns Sharp
  keepMetadata() returns Sharp
  withMetadata([options: { orientation?: number, density?: number }]) returns Sharp

Format Methods (Examples):
  sharp('input.jpg').jpeg({ quality: 100, chromaSubsampling: '4:4:4' }).toBuffer()
  sharp(input).png({ palette: true }).toBuffer()
  sharp('in.gif', { animated: true }).gif({ interFrameMaxError: 8 }).toFile('optim.gif')

Clone Method:
  clone() returns a new Sharp instance inheriting input for multiple pipelines.

Troubleshooting Tips:
- Use environment variables for custom libvips handling.
- Configure bundlers (externals for webpack, external for esbuild).
- Set npm install flags for cross-compilation.
- AWS Lambda requires proper binary inclusion and memory size configuration.


## Supplementary Details
IMPLEMENTATION DETAILS
- Constructor parameters: input supports various data types, options include failOn='warning', limitInputPixels=268402689, autoOrient=false, sequentialRead=true, density=72. For raw images, provide dimensions and channel count. For creation of images, options.create must specify width, height, channels and background.
- Output via toFile(fileOut, callback) or toBuffer({ resolveWithObject: true }) returns info including output dimensions and format-specific details such as crop offsets for cropping strategies.
- Metadata management: keepExif() preserves all EXIF, withExif() and withExifMerge() allow explicit control over EXIF data. Similar methods exist for ICC profiles and generic metadata via keepMetadata() and withMetadata().
- Format-specific options:
  JPEG: quality (default 80), progressive (false), chromaSubsampling ('4:2:0' default), optimiseCoding (true), mozjpeg (false).
  PNG: compressionLevel (default 6), adaptiveFiltering (false), quality (100), effort (7), palette (false).
  WebP: quality (80), alphaQuality (100), lossless (false), effort (4), loop (0), delay parameters.
- Clone method allows branching processing pipelines.
- Advanced configuration via npm install flags (--cpu, --os, --libc) for cross-platform support.
- Best practices: Exclude sharp from bundling; for AWS Lambda, package appropriate binaries and ensure high memory configuration (e.g., 1536 MB for optimal CPU allocation).
- Troubleshooting: For font issues, set FONTCONFIG_PATH; for globally installed libvips conflicts, use SHARP_IGNORE_GLOBAL_LIBVIPS or SHARP_FORCE_GLOBAL_LIBVIPS.


## Reference Details
API SPECIFICATIONS AND CODE EXAMPLES
Constructor:
  new Sharp([input: Buffer | ArrayBuffer | Uint8Array | string | Array], [options: Object])
    options.failOn: string (default 'warning')
    options.limitInputPixels: number | boolean (default 268402689)
    options.unlimited: boolean (default false)
    options.autoOrient: boolean (default false)
    options.sequentialRead: boolean (default true)
    options.density: number (default 72)
    options.raw: { width: number, height: number, channels: number, premultiplied?: boolean }
    options.create: { width: number, height: number, channels: number, background: string|Object, noise?: { type: string, mean: number, sigma: number } }
    options.text: { text: string, font?: string, fontfile?: string, width?: number, height?: number, align?: string, justify?: boolean, dpi?: number, rgba?: boolean, spacing?: number, wrap?: string }
    options.join: { across: number, animated?: boolean, shim?: number, background?: string|Object, halign?: string, valign?: string }

Methods:
  clone() ⇒ Sharp
  metadata([callback]) ⇒ Promise.<Object>
    Returns { format, size, width, height, space, channels, depth, density, chromaSubsampling, isProgressive, isPalette, bitsPerSample, pages, pageHeight, loop, delay, pagePrimary, levels, subifds, background, compression, resolutionUnit, hasProfile, hasAlpha, orientation, exif, icc, iptc, xmp, tifftagPhotoshop, formatMagick, comments }
  stats([callback]) ⇒ Promise.<Object>
    Returns channel statistics: { channels: [ { min, max, sum, squaresSum, mean, stdev, minX, minY, maxX, maxY } ], isOpaque, entropy, sharpness, dominant }
  toFile(fileOut: string, [callback]) ⇒ Promise.<Object>
  toBuffer([options: { resolveWithObject?: boolean }], [callback]) ⇒ Promise.<Buffer>

Format Methods:
  toFormat(format: string|Object, options: Object) ⇒ Sharp
  jpeg([options: { quality?: number, progressive?: boolean, chromaSubsampling?: string, optimiseCoding?: boolean, mozjpeg?: boolean, trellisQuantisation?: boolean, overshootDeringing?: boolean, optimiseScans?: boolean, quantisationTable?: number }]) ⇒ Sharp
  png([options: { progressive?: boolean, compressionLevel?: number, adaptiveFiltering?: boolean, palette?: boolean, quality?: number, effort?: number, colours?: number, dither?: number, force?: boolean }]) ⇒ Sharp
  webp([options: { quality?: number, alphaQuality?: number, lossless?: boolean, nearLossless?: boolean, smartSubsample?: boolean, smartDeblock?: boolean, preset?: string, effort?: number, loop?: number, delay?: number|Array<number>, minSize?: boolean, mixed?: boolean, force?: boolean }]) ⇒ Sharp
  gif([options: { reuse?: boolean, progressive?: boolean, colours?: number, effort?: number, dither?: number, interFrameMaxError?: number, interPaletteMaxError?: number, loop?: number, delay?: number|Array<number>, force?: boolean }]) ⇒ Sharp

Code Examples:
  sharp('input.jpg')
    .resize(300, 200)
    .toFile('output.jpg', function(err) {
      // output.jpg is 300x200 with a scaled and cropped version of input.jpg
    });

  const { body } = fetch('https://example.com/image.jpg');
  const readableStream = Readable.fromWeb(body);
  const transformer = sharp()
    .resize(300)
    .on('info', ({ height }) => {
       console.log(`Image height is ${height}`);
    });
  readableStream.pipe(transformer).pipe(writableStream);

  // Creating a blank image
  sharp({
    create: {
      width: 300,
      height: 200,
      channels: 4,
      background: { r: 255, g: 0, b: 0, alpha: 0.5 }
    }
  })
    .png()
    .toBuffer()
    .then(...);

Troubleshooting Procedures:
  - For global libvips conflicts, set environment: SHARP_IGNORE_GLOBAL_LIBVIPS=1 or SHARP_FORCE_GLOBAL_LIBVIPS=1
  - For cross-compiling on Linux, run: npm install --cpu=x64 --os=linux --libc=glibc sharp
  - To exclude sharp from webpack bundling, add externals: { 'sharp': 'commonjs sharp' }
  - On AWS Lambda, ensure deployment package includes linux-x64 or linux-arm64 binaries and avoid symbolic links.


## Information Dense Extract
sharp(input, options) where input: Buffer|ArrayBuffer|Uint8Array|string|Array, options:{ failOn:'warning', limitInputPixels:268402689, autoOrient:false, sequentialRead:true, density:72, raw:{width, height, channels, premultiplied:false}, create:{width, height, channels, background, noise:{type:'gaussian', mean, sigma}}, text:{text, font, fontfile, width, height, align, justify, dpi, rgba, spacing, wrap}, join:{across, animated, shim, background, halign, valign} } ; toFile(fileOut, callback) => Promise<{format, size, width, height, channels}>, toBuffer({resolveWithObject}, callback) => Promise<Buffer> or {data, info}; metadata() => Promise<{format, size, width, height, channels,...}>; stats() returns channel stats; methods for keepExif, withExif, withExifMerge, keepIccProfile, withIccProfile, keepMetadata, withMetadata; Format methods: toFormat, jpeg({quality, progressive, chromaSubsampling, optimiseCoding, mozjpeg, trellisQuantisation, overshootDeringing, optimiseScans, quantisationTable}), png({progressive, compressionLevel, adaptiveFiltering, palette, quality, effort, colours, dither, force}), webp({quality, alphaQuality, lossless, nearLossless, smartSubsample, smartDeblock, preset, effort, loop, delay, minSize, mixed, force}), gif({reuse, progressive, colours, effort, dither, interFrameMaxError, interPaletteMaxError, loop, delay, force}); clone() creates new pipeline sharing input; use npm flags --cpu, --os, --libc; set SHARP_IGNORE_GLOBAL_LIBVIPS/SHARP_FORCE_GLOBAL_LIBVIPS; bundlers: externals configuration required.

## Sanitised Extract
TABLE OF CONTENTS
1. Constructor and Input Options
   - new Sharp([input], [options])
   - Input types: Buffer, ArrayBuffer, Uint8Array, string, Array
   - Options: failOn (string, default 'warning'), limitInputPixels (number, default 268402689), unlimited (boolean, default false), autoOrient (boolean), sequentialRead (boolean, default true), density (number), ignoreIcc (boolean), pages (number), page (number), subifd (number), level (number), pdfBackground (string|Object), animated (boolean), raw (object with width, height, channels, premultiplied), create (object with width, height, channels, background, noise), text (object with parameters: text, font, fontfile, width, height, align, justify, dpi, rgba, spacing, wrap), join (object with across, animated, shim, background, halign, valign).
2. Output Methods
   - toFile(fileOut, [callback]) returns Promise.<Object> (info contains format, size, width, height, channels)
   - toBuffer([options], [callback]) returns Promise.<Buffer> (resolveWithObject returns { data, info })
3. Metadata and Transformation Options
   - keepExif(), withExif(exif), withExifMerge(exif), keepIccProfile(), withIccProfile(icc, [options]), keepMetadata(), withMetadata([options])
4. Format-Specific Methods and Options
   - toFormat(format, options)
   - jpeg([options]): quality (1-100), progressive, chromaSubsampling (default '4:2:0'), optimiseCoding, mozjpeg, trellisQuantisation, overshootDeringing, optimiseScans, quantisationTable
   - png([options]): progressive, compressionLevel (0-9), adaptiveFiltering, palette, quality, effort, colours, dither, force
   - webp([options]): quality, alphaQuality, lossless, nearLossless, smartSubsample, smartDeblock, preset, effort, loop, delay, minSize, mixed, force
   - gif([options]): reuse, progressive, colours, effort, dither, interFrameMaxError, interPaletteMaxError, loop, delay, force
   - jp2([options]), tiff([options]), avif([options]), heif(options), jxl([options]) with respective quality, compression, tile, bitdepth and additional parameters.
5. Implementation Patterns and Best Practices
   - Use clone() to create processing pipelines from a single input stream.
   - Configure environment variables SHARP_IGNORE_GLOBAL_LIBVIPS and SHARP_FORCE_GLOBAL_LIBVIPS for custom libvips handling.
   - Use npm flags (--cpu, --os, --libc) for cross-compiling and multi-platform deployment.
   - Exclude sharp in bundlers (webpack, esbuild, electron) via externals or unpack configurations.
6. Troubleshooting
   - For memory issues on glibc systems, switch to jemalloc.
   - AWS Lambda: include correct binaries; avoid symbolic links; set appropriate memory (e.g., 1536 MB for optimal CPU time).
   - Font errors: set FONTCONFIG_PATH when default fontconfig config is missing.

Detailed Technical Details:
Constructor new Sharp(input, options):
  input: Buffer | ArrayBuffer | Uint8Array | string | Array (joined together)
  options.failOn: string, default 'warning'
  options.limitInputPixels: number | boolean, default 268402689
  options.unlimited: boolean, default false
  options.autoOrient: boolean, default false
  options.sequentialRead: boolean, default true
  options.density: number (default 72)
  options.raw: { width: number, height: number, channels: number, premultiplied?: boolean (default false) }
  options.create: { width: number, height: number, channels: 3|4, background: string|Object, noise?: { type: 'gaussian', mean: number, sigma: number } }
  options.text: { text: string, font?: string, fontfile?: string, width?: number, height?: number, align?: 'left'|'centre'|'center'|'right', justify?: boolean, dpi?: number, rgba?: boolean, spacing?: number, wrap?: 'word'|'char'|'word-char'|'none' }
  options.join: { across: number, animated?: boolean, shim?: number, background?: string|Object, halign?: 'left'|'centre'|'center'|'right', valign?: 'top'|'centre'|'center'|'bottom' }

Output Methods:
  toFile(fileOut, [callback]) throws Error if invalid parameters; returns Promise with info { format, size, width, height, channels, ... }
  toBuffer([{ resolveWithObject: boolean }], [callback]) returns Promise<Buffer> or { data, info } if resolved with object.

Metadata Methods:
  keepExif() returns Sharp
  withExif(exif: Object) returns Sharp
  withExifMerge(exif: Object) returns Sharp
  keepIccProfile() returns Sharp
  withIccProfile(icc: string, [options: { attach: boolean }]) returns Sharp
  keepMetadata() returns Sharp
  withMetadata([options: { orientation?: number, density?: number }]) returns Sharp

Format Methods (Examples):
  sharp('input.jpg').jpeg({ quality: 100, chromaSubsampling: '4:4:4' }).toBuffer()
  sharp(input).png({ palette: true }).toBuffer()
  sharp('in.gif', { animated: true }).gif({ interFrameMaxError: 8 }).toFile('optim.gif')

Clone Method:
  clone() returns a new Sharp instance inheriting input for multiple pipelines.

Troubleshooting Tips:
- Use environment variables for custom libvips handling.
- Configure bundlers (externals for webpack, external for esbuild).
- Set npm install flags for cross-compilation.
- AWS Lambda requires proper binary inclusion and memory size configuration.

## Original Source
High-performance Image Processing and SVG Rasterization
https://sharp.pixelplumbing.com/

## Digest of SHARP_API

# Sharp API Documentation

Retrieved: 2023-10-05

## Overview
The sharp module is a high-performance Node.js image processing library which leverages libvips. It supports image conversion, resizing, rotation, extraction, compositing, and gamma correction. The module accepts various input types (Buffer, ArrayBuffer, Uint8Array, string, etc) and supports output in JPEG, PNG, WebP, GIF, AVIF, TIFF, and raw pixel data.

## Installation and Prerequisites
- Install using npm, pnpm, yarn, bun, or deno.
- Prerequisites: Node-API v9 compatible runtime (Node.js >= 18.17.0 or >=20.3.0), C++17 compiler for source builds, node-addon-api v7+ and node-gyp v9+.
- Prebuilt binaries available for common platforms (macOS, Windows, various Linux architectures).

## Constructor and Input Options
### Constructor Signature
- new Sharp([input], [options])

### Parameters for input:
- input: Buffer | ArrayBuffer | Uint8Array | string ...
- options: Object with keys:
  - failOn (string): 'none', 'truncated', 'error', 'warning' (default: 'warning')
  - limitInputPixels (number|boolean): Pixel limit (default: 268402689)
  - unlimited (boolean): Default false
  - autoOrient (boolean): Default false
  - sequentialRead (boolean): Default true
  - density (number): e.g. 72
  - Other keys include: ignoreIcc, pages, page, subifd, level, pdfBackground,
    animated, raw (with raw.width, raw.height, raw.channels, raw.premultiplied), create (with width, height, channels, background, noise), text (with text, font, fontfile, width, height, align, justify, dpi, rgba, spacing, wrap), join (with across, animated, shim, background, halign, valign).

## Output Options
### File or Buffer output methods
- toFile(fileOut, [callback]) : Writes image to file. Returns Promise.<Object> with info such as format, size, width, height, channels.
- toBuffer([options], [callback]) : Returns a Promise.<Buffer> with optional { resolveWithObject: true } for obtaining { data, info }.

### Metadata and Format Options
- keepExif() : Retains EXIF metadata.
- withExif(exif) : Sets EXIF metadata in output image. exif is an object keyed by IFD0, IFD1, etc.
- withExifMerge(exif) : Merges given EXIF data into input metadata.
- keepIccProfile() : Retains ICC profile.
- withIccProfile(icc, [options]) : Attaches ICC profile. Options: { attach: true } by default.
- keepMetadata() : Keeps all input metadata (EXIF, ICC, XMP, IPTC).
- withMetadata([options]) : Updates orientation and density; options include orientation (number 1-8) and density (number DPI).
- toFormat(format, options) : Forces output format, where format can be a string or object with id and options.

## Format-Specific API Options
### JPEG
- Method: jpeg([options])
- Options:
  - quality (number): default 80, range 1-100
  - progressive (boolean): default false
  - chromaSubsampling (string): default '4:2:0', can be '4:4:4'
  - optimiseCoding/optimizeCoding (boolean): default true
  - mozjpeg (boolean): default false
  - trellisQuantisation (boolean): default false, overshootDeringing (boolean), optimiseScans (boolean), quantisationTable (number): default 0

### PNG
- Method: png([options])
- Options:
  - progressive (boolean): default false
  - compressionLevel (number): default 6
  - adaptiveFiltering (boolean): default false
  - palette (boolean): default false
  - quality (number): default 100
  - effort (number): default 7
  - colours/colors (number): default 256
  - dither (number): default 1.0
  - force (boolean): default true

### WebP
- Method: webp([options])
- Options:
  - quality (number): default 80
  - alphaQuality (number): default 100
  - lossless (boolean): default false
  - nearLossless (boolean): default false
  - smartSubsample (boolean): default false
  - smartDeblock (boolean): default false
  - preset (string): default 'default'
  - effort (number): default 4
  - loop (number): default 0 (animation), delay (number|Array)
  - minSize (boolean): default false
  - mixed (boolean): default false
  - force (boolean): default true

### GIF
- Method: gif([options])
- Options:
  - reuse (boolean): default true
  - progressive (boolean): default false
  - colours/colors (number): default 256
  - effort (number): default 7
  - dither (number): default 1.0
  - interFrameMaxError (number): default 0
  - interPaletteMaxError (number): default 3
  - loop (number): default 0
  - delay (number|Array): in ms
  - force (boolean): default true

### Additional Format Options
- JP2, TIFF, AVIF, HEIF, JXL: Each method (jp2([options]), tiff([options]), avif([options]), heif(options), jxl([options])) contains format-specific quality, compression, tile, bitdepth, resolution options.

## Implementation Patterns and Best Practices
- Use stream pipelines for non-blocking operations and multi-output processing by using .clone() on a sharp instance.
- For multi-platform or cross-compiling, use npm flags: --platform, --arch, --libc.
- If using pnpm, add sharp to ignoredBuiltDependencies or onlyBuiltDependencies.
- For bundlers (webpack, esbuild, electron-builder) ensure sharp is excluded via externals or unpacking rules.

## Troubleshooting and Environment Configuration
- Cross-target install: Use flags (--cpu, --os, --libc) to specify target architecture and C standard library.
- For globally-installed libvips, set SHARP_IGNORE_GLOBAL_LIBVIPS or SHARP_FORCE_GLOBAL_LIBVIPS to control detection.
- On Linux with glibc, consider using jemalloc to avoid memory fragmentation.
- AWS Lambda: Ensure node_modules include relevant linux-x64 or linux-arm64 binaries, avoid symbolic links.
- For font rendering, set FONTCONFIG_PATH when default fontconfig config is missing.

## Attribution
Data Size: 7758167 bytes; Links Found: 18982; No errors encountered in crawl.

## Attribution
- Source: High-performance Image Processing and SVG Rasterization
- URL: https://sharp.pixelplumbing.com/
- License: License: MIT
- Crawl Date: 2025-05-02T16:50:45.421Z
- Data Size: 7758167 bytes
- Links Found: 18982

## Retrieved
2025-05-02
LIBRARY_DOCUMENT.md/VISUALIZATION.md
# LIBRARY_DOCUMENT.md/VISUALIZATION.md
# VISUALIZATION

## Crawl Summary
Crawl provided no content payload. The essential technical details were extracted from visualization libraries documentation. Key specifications include: Vega-Lite embed function with configuration details, D3.js selection and data binding patterns, Plotly.newPlot parameters for structured data visualization, and Graphviz DOT rendering options. Each API includes parameter lists, return types, and configuration defaults.

## Normalised Extract
TABLE OF CONTENTS:
1. Vega-Lite
2. D3.js
3. Plotly
4. Graphviz

1. Vega-Lite:
Embed function signature: embedVegaLite(config: VegaLiteConfig) returns Promise<VegaLiteChart>
Configuration includes schema URL, mark type, encoding settings, and view configurations. Default schema: https://vega.github.io/schema/vega-lite/v5.json. Padding default 5.

2. D3.js:
Core function: select(selector: string) returns Selection
Supports chaining: data binding using data(), axis generation, scales configuration with domain and range options (linear, ordinal, time).

3. Plotly:
Method: Plotly.newPlot(divId: string, data: Array, layout: Object, config?: Object) returns Promise or void
Key details: data array with trace objects, layout containing titles; config options include responsive true/false and displayModeBar toggles.

4. Graphviz:
Function: renderDot(dotString: string, options: GraphvizOptions) returns SVGOutput
Options include:
  - engine: layout engine like "dot" or "neato"
  - scale: number for image scaling
  - additional flags for controlling layout adjustments

## Supplementary Details
Vega-Lite Implementation Details:
- embedVegaLite requires a VegaLiteConfig object. Mandatory fields: schema (string), data (object or URL), mark (string), encoding (object).
- Recommended additional view configuration includes width, height, and padding parameters.

D3.js Configuration:
- select(selector) method is chainable. Data binding using .data(array) and .enter() pattern. Configuration of scales requires specifying domain and range arrays.

Plotly Details:
- Use Plotly.newPlot with parameters: div element id, data array (each trace must specify type, x and y arrays), layout with title, and optionally config with responsive: true, displayModeBar: true.

Graphviz Rendering:
- renderDot function requires valid DOT language text. Options: engine: 'dot' (default), scale: e.g., 1.0. Ensure DOT syntax is correct for error-free rendering.

Best Practices:
- Ensure all configuration objects strictly follow documented schemas to prevent runtime errors.
- Use Promises in Vega-Lite and Plotly calls to handle asynchronous rendering.
- Validate selectors in D3.js to avoid null references.
- Test Graphviz DOT strings in an isolated environment before deployment.

## Reference Details
Vega-Lite API:
Function: embedVegaLite(config: object) -> Promise<Object>
Parameters:
  - config.schema: string (default 'https://vega.github.io/schema/vega-lite/v5.json')
  - config.data: object or string (URL)
  - config.mark: string (e.g., 'bar', 'line')
  - config.encoding: object mapping fields to visual properties
Returns: Promise resolving to VegaLiteChart

D3.js API:
Function: select(selector: string) -> Selection
Parameters:
  - selector: string (CSS selector)
Returns: Selection with methods such as data(array): Selection, enter(): Selection, append(tag: string): Selection

Plotly API:
Function: Plotly.newPlot(divId: string, data: Array<Object>, layout: Object, config?: Object) -> Promise<void>
Parameters:
  - divId: string (target DOM element id)
  - data: Array of trace objects, each trace contains:
      type: string (e.g., 'scatter', 'bar')
      x: Array<number|date>, y: Array<number>
      marker: object (optional styling)
  - layout: object, must include title: string, xaxis, yaxis configurations
  - config (optional): object with responsive: boolean (default true), displayModeBar: boolean (default true)

Graphviz API:
Function: renderDot(dotString: string, options: { engine: string, scale: number }) -> string
Parameters:
  - dotString: string (Graphviz DOT language representation)
  - options.engine: string (e.g., 'dot', 'neato'; default 'dot')
  - options.scale: number (default 1.0)
Returns: SVG string output

Code Example Comments (Pseudocode):
// Vega-Lite usage
// let config = { schema: 'https://vega.github.io/schema/vega-lite/v5.json', mark: 'bar', data: { values: [...] }, encoding: { x: { field: 'category', type: 'ordinal' }, y: { field: 'value', type: 'quantitative' } } };
// embedVegaLite(config).then(chart => { // chart rendered });

// D3.js usage
// let svg = d3.select('#chart').append('svg').attr('width', 500).attr('height', 300);
// svg.selectAll('rect').data(dataset).enter().append('rect');

// Plotly usage
// Plotly.newPlot('chartDiv', [{ type: 'scatter', x: [1, 2, 3], y: [10, 15, 13] }], { title: 'Sample Chart' }, { responsive: true });

// Graphviz usage
// const dot = 'digraph { a -> b }';
// let svgOutput = renderDot(dot, { engine: 'dot', scale: 1.0 });

Troubleshooting Procedures:
- For Vega-Lite, check that config schemas match and that data is valid; inspect Promise rejections for error messages.
- In D3.js, verify that selectors return valid elements; log output of each chaining step.
- For Plotly, inspect console errors for layout misconfigurations; use Plotly.Plots.resize(div) if rendered plot does not adjust.
- Graphviz errors typically indicate incorrect DOT syntax; run dot -Tsvg input.dot -o output.svg on command line to debug.

## Information Dense Extract
Vega-Lite: embedVegaLite(config: { schema: string, data: object|string, mark: string, encoding: object }) => Promise<VegaLiteChart>; default schema https://vega.github.io/schema/vega-lite/v5.json; padding default 5. D3.js: select(selector: string) returns Selection; supports data(), enter(), append(); configurations include linear, ordinal, time scales with domain and range arrays. Plotly: Plotly.newPlot(divId: string, data: Array, layout: object, config?: { responsive: boolean, displayModeBar: boolean }) returns Promise<void>; trace objects include type, x, y, marker. Graphviz: renderDot(dotString: string, options: { engine: string, scale: number }) returns SVG string; defaults engine 'dot', scale 1.0; troubleshooting includes schema validation and DOT syntax checks.

## Sanitised Extract
TABLE OF CONTENTS:
1. Vega-Lite
2. D3.js
3. Plotly
4. Graphviz

1. Vega-Lite:
Embed function signature: embedVegaLite(config: VegaLiteConfig) returns Promise<VegaLiteChart>
Configuration includes schema URL, mark type, encoding settings, and view configurations. Default schema: https://vega.github.io/schema/vega-lite/v5.json. Padding default 5.

2. D3.js:
Core function: select(selector: string) returns Selection
Supports chaining: data binding using data(), axis generation, scales configuration with domain and range options (linear, ordinal, time).

3. Plotly:
Method: Plotly.newPlot(divId: string, data: Array, layout: Object, config?: Object) returns Promise or void
Key details: data array with trace objects, layout containing titles; config options include responsive true/false and displayModeBar toggles.

4. Graphviz:
Function: renderDot(dotString: string, options: GraphvizOptions) returns SVGOutput
Options include:
  - engine: layout engine like 'dot' or 'neato'
  - scale: number for image scaling
  - additional flags for controlling layout adjustments

## Original Source
Visualization and Graphing Libraries Documentation
https://vega.github.io/vega-lite/ | https://d3js.org/ | https://plotly.com/javascript/ | https://graphviz.org/documentation/

## Digest of VISUALIZATION

# Visualization Libraries Technical Digest
Date Retrieved: 2023-10-05

## Vega-Lite
Specification: embedVegaLite(config: VegaLiteConfig) returns Promise<VegaLiteChart>
Method: embedVegaLite
Parameters:
  - config (object): Must contain properties such as schema (string), data (object or URL), mark (string), encoding (object), and optional view configuration.
Returns: Promise that resolves to a VegaLiteChart instance

Configuration Options:
  - schema: URL to Vega-Lite JSON schema (default: "https://vega.github.io/schema/vega-lite/v5.json")
  - padding: Numeric value for chart padding; default is 5

## D3.js
Specification: select(selector: string): Selection
Method: select
Parameters:
  - selector (string): CSS selector for target element
Returns: A Selection object that provides chainable methods to manipulate the DOM

Core Operation:
  - Data binding via data() method, axis generation, scales (linear, ordinal, time) with configurable domains and ranges

## Plotly
Specification: Plotly.newPlot(divId: string, data: Array, layout: Object, config?: Object): Promise
Method: Plotly.newPlot
Parameters:
  - divId (string): HTML element id
  - data (Array): Array of trace objects, each specifying type, x, y arrays and styling details
  - layout (object): Layout configuration with title, axis labels, margins, legend options
  - config (object, optional): Additional options such as responsive (boolean), displayModeBar (boolean)
Returns: A promise or void depending on implementation that renders the plot

## Graphviz
Specification: renderDot(dotString: string, options: GraphvizOptions): SVGOutput
Method: renderDot
Parameters:
  - dotString (string): Graphviz DOT language representation of the graph
  - options (GraphvizOptions): Object including engine (e.g., "dot", "neato"), scale (number), and flags for layout adjustments
Returns: An SVGOutput string with the rendered graph

Attribution: Data sourced from multiple documentation sources for visualization libraries.
Size: 0 bytes from crawl

## Attribution
- Source: Visualization and Graphing Libraries Documentation
- URL: https://vega.github.io/vega-lite/ | https://d3js.org/ | https://plotly.com/javascript/ | https://graphviz.org/documentation/
- License: License: Various (BSD-3-Clause, MIT, EPL, etc.)
- Crawl Date: 2025-05-02T06:50:08.655Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-02
LIBRARY_DOCUMENT.md/GNUPLOT_DOC.md
# LIBRARY_DOCUMENT.md/GNUPLOT_DOC.md
# GNUPLOT_DOC

## Crawl Summary
Gnuplot provides command-line driven plotting with support for 2D/3D graphs, multiple terminal types (pdf, svg, gif, etc.), and scripting. Key commands include configuration of terminals (set terminal, set output), plot commands (plot, splot), and customization commands (set lmargin, set multiplot layout). Advanced features include data block definitions, enhanced text formatting using markup, and use of pipes for filtering data. It also covers installation instructions with ./configure, make, and platform-specific guidelines.

## Normalised Extract
Table of Contents:
1. Installation & Compilation
   - Use './configure --prefix=$HOME/usr', 'make', and 'make install' for release builds.
   - For development sources, run './prepare' before './configure'.
2. Command Usage & Scripting
   - Help: 'help keyword'
   - Interactive plotting: 'plot sin(x)', data input with inline '-' or named blocks ($DATABLOCK << EOD ... EOD).
3. Terminal Configuration
   - Setting terminals: 'set terminal pdfcairo enhanced fontscale 0.5 size 5.00in,3.00in'
   - Switching output: 'set output "filename"' and 'replot', then 'unset output'.
4. Plot Customization
   - Adjust colors, linetypes: 'set color', 'set linetype', 'set pointsize'.
   - Margin setup: 'set lmargin at screen 0.05', 'set rmargin at screen 0.95'.
   - Multiplot layout: 'set multiplot layout <rows>, <columns>' and positioning with 'set origin' and 'set size'.
5. Advanced Plot Types
   - Implicit defined graphs using contour extraction from surface plots.
   - Filled curves: 'plot "+" using 1:(f($1)):(g($1)) with filledcurves [above/below]'.
   - 3D to 2D projection: 'set view map', 'set view projection xz/yz'.
6. Text Formatting & Enhanced Mode
   - Superscript: use '^' (e.g., a^x)
   - Subscript: use '_' (e.g., a_x)
   - Font changes: '{/Times abc}', size adjustments with '{/Times*2 abc}', and toggle with 'noenhanced'.
7. Troubleshooting & Best Practices
   - Check configuration: 'show version long', 'set terminal' for checking compiled options.
   - Use minimal command sets for error reproduction.
   - Verify proper use of inline data and filter mechanism with popen commands.

## Supplementary Details
Installation: ./configure --prefix=$HOME/usr; make; make install. Development: ./prepare then ./configure. Terminal configuration commands include setting pdf output with 'set terminal pdfcairo enhanced fontscale 0.5 size 5.00in,3.00in' and output redirection using 'set output "file.pdf"' followed by 'replot'. Customization of plots using 'set color', 'set linetype', 'set pointsize'; margin specification using 'set lmargin at screen 0.05', etc. Inline data definitions: use $DATABLOCK << EOD ... EOD for reusable data blocks. For interactive scripting, combine 'plot', 'splot', and piping filters with '< sort +2 file.in'. Troubleshooting involves using 'show version long' and verifying terminal types with 'set terminal'.

## Reference Details
Command API and SDK-like Usage Specifications:

1. Installation Commands:
  - Release Build:
    Command: ./configure --prefix=$HOME/usr
    Follow with: make
    Then: make install
  - Development Build:
    Command: ./prepare
    Then: ./configure, make, and make install

2. Terminal Setup and Output Redirection:
  - Set terminal to PDF with Cairo:
    Command: set terminal pdfcairo enhanced fontscale 0.5 size 5.00in,3.00in
    Returns: Terminal set to pdfcairo with specified options
  - Redirect Output:
    Command: set output "sin.pdf"
    Followed by: replot
    Then: unset output (to close file)

3. Plotting Examples:
  - Basic Plotting:
    Command: plot sin(x)
  - Multiplot:
    Command: set multiplot layout 2,2
    Then plot each graph with appropriate 'set origin' and 'set size'
  - Data Block Example:
    Command: $DATABLOCK << EOD
             cats 4 2
             dogs 1 4
             EOD
    Usage: plot $DATABLOCK using 2:3:1 with labels

4. Customization Commands:
  - Change margins:
    set lmargin at screen 0.05
    set rmargin at screen 0.95
  - Control point size:
    set pointsize 1.5
  - Hidden Surface Removal:
    set hidden3d
    For pm3d: set pm3d depthorder

5. Text Formatting and Enhanced Mode:
  - Enable enhanced text (default in v5): text markup using symbols:
    Superscript: a^x
    Subscript: a_x
    Use custom fonts: {/Times abc}
  - Disable enhanced text for file names:
    set title 'file_1.dat and file_2.dat' noenhanced
  - UTF-8 encoding setup:
    set encoding utf8

6. Troubleshooting Procedures:
  - Check build options: show version long
  - Verify terminal types: set terminal
  - For missing fonts or mis-scaled graphs, adjust with set size square and replot
  - Sample diagnostic session:
    gnuplot> show version long
    Expected output: List of compiled options including terminal types, library details.

7. Best Practices:
  - Always use named data blocks for reusable data.
  - Pair set terminal with set output and reset with unset output to avoid file locks.
  - Use minimal reproducible command sequences when reporting bugs.
  - For web-driven plots, use gnuplot in a pipe with proper buffering.

8. SDK Method-like Signature (Pseudo-code):
  function plotGraph(command: string, terminal: string, outputFile: string): boolean
  // command: the plotting command (e.g., 'plot sin(x)')
  // terminal: terminal type (e.g., 'pdfcairo') with options
  // outputFile: destination file for the plot
  // Returns true on success, false otherwise

Example Usage:
  set terminal pdfcairo enhanced fontscale 0.5 size 5.00in,3.00in
  set output "plot.pdf"
  plot sin(x)
  unset output
  unset terminal

Detailed commands are directly executable in a gnuplot session.

## Information Dense Extract
Gnuplot v5: Compile with ./configure --prefix=$HOME/usr; make; make install. Development: ./prepare then ./configure. Terminal: set terminal pdfcairo enhanced fontscale 0.5 size 5.00in,3.00in; output redirection with set output "file.pdf", replot, unset output. Plot commands: plot sin(x), splot with 3D; data blocks via $DATABLOCK << EOD ... EOD. Customization: set color, set linetype, set pointsize, set lmargin at screen 0.05, set multiplot layout. Text formatting: enhanced mode supports a^x, a_x, {/Times abc}, disable with noenhanced, set encoding utf8. Troubleshooting: show version long, set terminal verification. API-like pseudo method: plotGraph(command:string, terminal:string, outputFile:string): boolean. Full commands and options explicitly specified.

## Sanitised Extract
Table of Contents:
1. Installation & Compilation
   - Use './configure --prefix=$HOME/usr', 'make', and 'make install' for release builds.
   - For development sources, run './prepare' before './configure'.
2. Command Usage & Scripting
   - Help: 'help keyword'
   - Interactive plotting: 'plot sin(x)', data input with inline '-' or named blocks ($DATABLOCK << EOD ... EOD).
3. Terminal Configuration
   - Setting terminals: 'set terminal pdfcairo enhanced fontscale 0.5 size 5.00in,3.00in'
   - Switching output: 'set output 'filename'' and 'replot', then 'unset output'.
4. Plot Customization
   - Adjust colors, linetypes: 'set color', 'set linetype', 'set pointsize'.
   - Margin setup: 'set lmargin at screen 0.05', 'set rmargin at screen 0.95'.
   - Multiplot layout: 'set multiplot layout <rows>, <columns>' and positioning with 'set origin' and 'set size'.
5. Advanced Plot Types
   - Implicit defined graphs using contour extraction from surface plots.
   - Filled curves: 'plot '+' using 1:(f($1)):(g($1)) with filledcurves [above/below]'.
   - 3D to 2D projection: 'set view map', 'set view projection xz/yz'.
6. Text Formatting & Enhanced Mode
   - Superscript: use '^' (e.g., a^x)
   - Subscript: use '_' (e.g., a_x)
   - Font changes: '{/Times abc}', size adjustments with '{/Times*2 abc}', and toggle with 'noenhanced'.
7. Troubleshooting & Best Practices
   - Check configuration: 'show version long', 'set terminal' for checking compiled options.
   - Use minimal command sets for error reproduction.
   - Verify proper use of inline data and filter mechanism with popen commands.

## Original Source
Gnuplot Documentation
https://gnuplot.sourceforge.net/documentation.html

## Digest of GNUPLOT_DOC

# GNUPLOT DOC

Retrieved: 2023-10-11

# Overview
Gnuplot is a command-driven plotting tool designed for scientific data visualization. It supports 2D and 3D plotting, multiple output formats (PDF, SVG, PNG, etc.), scripting with conditional statements, and interactive sessions.

# Installation and Compilation
To compile from a release, use:

./configure --prefix=$HOME/usr
make
make install

For development sources:

./prepare
./configure
make

On Windows, use the makefiles in config/mingw, config/msvc, config/watcom, and config/cygwin.

# Command Usage and Scripting
Key commands include:

- Help: `help keyword` displays documentation for commands.
- Plot: `plot sin(x)` for quick visualization; use `set terminal pdf` and `set output "file.pdf"` to generate file outputs.
- Data blocks: Define inline data blocks using $DATABLOCK << EOD ... EOD.

# Terminal and Output Configuration
- To set a terminal type: `set terminal pdfcairo` with options like transparent, enhanced, fontscale, and size (e.g., `set terminal pdfcairo enhanced fontscale 0.5 size 5.00in,3.00in`).
- To print, use: `set output "filename"` then `replot` and reset with `unset output`.

# Plot Customization
Customize plots with:

- Colors, line types and points: Use `set color`, `set linetype`, and `set pointsize`.
- Margins (e.g., `set lmargin at screen 0.05`, `set rmargin at screen 0.95`).
- Multiplot: `set multiplot layout <rows>, <columns>`.

# Advanced Plot Types and Data Handling
- Implicit plots: Define f(x,y) and extract contour line using table mode.
- Filled curves: `plot '+' using 1:(f($1)):(g($1)) with filledcurves`.
- 3D data: Use `splot` with `set view map` or `set view projection xz`/`yz`.

# Text Formatting and Special Symbols
- Enhanced text mode allows markup:
  - Superscript: a^x
  - Subscript: a_x
  - Font changes: {/Times abc} or {/Arial:Bold=20 abc}

- To disable markup use: `noenhanced` as in `set title 'filename' noenhanced`.
- UTF-8 encoding: Enable with `set encoding utf8`.

# Troubleshooting and Best Practices
- Check compiled options with: `show version long` and view terminal types with `set terminal`.
- For issues with output files or small numbers, verify terminal settings and scaling commands (e.g., `set size square`).
- Use clear minimal command sets when reporting errors.

# Attribution and Data Size
Data size during crawl: 4820335 bytes, with 4545 links scanned.

## Attribution
- Source: Gnuplot Documentation
- URL: https://gnuplot.sourceforge.net/documentation.html
- License: License: GPL
- Crawl Date: 2025-05-02T09:47:06.911Z
- Data Size: 4820335 bytes
- Links Found: 4545

## Retrieved
2025-05-02
LIBRARY_DOCUMENT.md/CLI_TOOLING.md
# LIBRARY_DOCUMENT.md/CLI_TOOLING.md
# CLI_TOOLING

## Crawl Summary
EJS provides render and renderFile functions for template rendering. js-yaml offers safeLoad and safeDump for YAML conversion with configurable options. Express supports HTTP method routing and server initialization via app.listen with optional hostname and backlog. Prettier defines formatting options such as parser, semi, singleQuote, trailingComma, printWidth, and tabWidth and a CLI command for in-place file formatting. Yargs provides comprehensive command-line argument parsing with methods for command registration, option definitions, and help support.

## Normalised Extract
Table of Contents:
1. EJS Template Engine
   - render(template: string, data?: object, options?: object) returns a rendered markup string.
   - renderFile(filePath: string, data?: object, options?: object, callback: (err: Error, str: string) => void) for asynchronous file rendering.
2. js-yaml API
   - safeLoad(yaml: string, options?: { schema?: object }) converts YAML string to JavaScript object.
   - safeDump(obj: any, options?: { quotingType?: string, lineWidth?: number }) converts JavaScript object to YAML.
3. Express Framework
   - Route registration using app.get/post/put/delete with middleware (req, res, next).
   - Server initialization via app.listen(port: number, hostname?: string, backlog?: number, callback?: () => void).
4. Prettier Configuration
   - Configurable options: parser, semi, singleQuote, trailingComma, printWidth, tabWidth.
   - CLI usage: prettier --write to format files in-place.
5. Yargs CLI Parsing
   - Core methods: command(), option(), help(), and strict() mode for error validation.
   - Provides final parsed object via argv property.

## Supplementary Details
EJS Detailed Config: { delimiter: '%', openDelimiter: '<', closeDelimiter: '>' } can be set in options for custom template syntax.
js-yaml Options: safeLoad can accept a custom JSON schema (default DEFAULT_FULL_SCHEMA) while safeDump options include quotingType (default '"') and lineWidth (default 80) for output formatting.
Express Details: Route handlers require middleware functions with signature (req: Request, res: Response, next: NextFunction); error-handling middleware must include four parameters. app.listen supports optional hostname and backlog parameters for detailed network configuration.
Prettier Parameters: parser (e.g., 'babel' for JavaScript), printWidth (default 80), tabWidth (default 2), semi (default true), singleQuote (default false), trailingComma ('es5' by default). Effects include consistent code style and formatting.
Yargs Configuration: Supports methods strict() for argument enforcement, version() for version flag, alias() for command shortcuts, and detailed error messaging when options are misconfigured.

## Reference Details
EJS API Specifications:
- render(template: string, data?: object, options?: object) -> string
- renderFile(filePath: string, data?: object, options?: object, callback: (err: Error, str: string) => void) -> void

js-yaml API Specifications:
- safeLoad(yaml: string, options?: { schema?: object }) -> any
- safeDump(obj: any, options?: { quotingType?: string, lineWidth?: number }) -> string

Express API Specifications:
- app.get/post/put/delete(path: string, middleware: (req: Request, res: Response, next: NextFunction) => void)
- app.listen(port: number, hostname?: string, backlog?: number, callback?: () => void) -> Server

Prettier API and CLI Specifications:
- Config Object: { parser: string, semi: boolean, singleQuote: boolean, trailingComma: 'none'|'es5'|'all', printWidth: number, tabWidth: number }
- CLI Command Example: prettier --write [files...]
- SDK function: format(source: string, options: object) -> string

Yargs API Specifications:
- yargs(args: string[], options?: object) returns an instance with methods:
   command(command: string, description: string, builder: object|function, handler: Function)
   option(key: string, config: { alias?: string|Array<string>, describe: string, type: 'string'|'number'|'boolean', default?: any })
   help() -> object
   strict() for runtime argument validation
- Final parsed arguments available via argv property

Troubleshooting Procedures:
- EJS: Verify template path and validate data object structure. If renderFile fails, check file existence and file permissions.
- js-yaml: Ensure YAML strings are valid; use try-catch to handle parsing errors with safeLoad.
- Express: Confirm port availability and proper middleware chaining. For app.listen issues, verify optional hostname and backlog parameters.
- Prettier: Run prettier --check to identify formatting issues; check configuration file for overrides.
- Yargs: Use --help to display command usage. Validate argument types and ensure appropriate defaults are defined.

## Information Dense Extract
EJS: render(string, object?, object?) -> string; renderFile(string, object?, object?, (Error, string) => void) -> void. js-yaml: safeLoad(string, { schema?: object }?) -> any; safeDump(any, { quotingType?: string, lineWidth?: number }?) -> string. Express: app.METHOD(string, (Request, Response, NextFunction) => void); app.listen(number, string?, number?, () => void) -> Server. Prettier: config { parser: string, semi: boolean, singleQuote: boolean, trailingComma: 'none'|'es5'|'all', printWidth: number, tabWidth: number }; CLI: prettier --write; SDK: format(string, object) -> string. Yargs: yargs(args: string[], object?) -> { command(string, string, object|function, Function), option(string, { alias?: string|string[], describe: string, type: 'string'|'number'|'boolean', default?: any }), help(), strict(), argv }.

## Sanitised Extract
Table of Contents:
1. EJS Template Engine
   - render(template: string, data?: object, options?: object) returns a rendered markup string.
   - renderFile(filePath: string, data?: object, options?: object, callback: (err: Error, str: string) => void) for asynchronous file rendering.
2. js-yaml API
   - safeLoad(yaml: string, options?: { schema?: object }) converts YAML string to JavaScript object.
   - safeDump(obj: any, options?: { quotingType?: string, lineWidth?: number }) converts JavaScript object to YAML.
3. Express Framework
   - Route registration using app.get/post/put/delete with middleware (req, res, next).
   - Server initialization via app.listen(port: number, hostname?: string, backlog?: number, callback?: () => void).
4. Prettier Configuration
   - Configurable options: parser, semi, singleQuote, trailingComma, printWidth, tabWidth.
   - CLI usage: prettier --write to format files in-place.
5. Yargs CLI Parsing
   - Core methods: command(), option(), help(), and strict() mode for error validation.
   - Provides final parsed object via argv property.

## Original Source
Node.js Ecosystem, Tooling, and CLI Resources
https://ejs.co | https://github.com/nodeca/js-yaml | https://expressjs.com | https://prettier.io/docs/en/index.html | https://yargs.js.org/

## Digest of CLI_TOOLING

# Node.js Ecosystem CLI and Tooling

Retrieved Date: 2023-10-23

## EJS Template Engine
- Method: render(template: string, data?: object, options?: object) -> string
- Asynchronous File Rendering: renderFile(filePath: string, data?: object, options?: object, callback: (err: Error, str: string) => void) -> void

## js-yaml
- Load YAML: safeLoad(yaml: string, options?: { schema?: object }) -> any
- Dump YAML: safeDump(obj: any, options?: { quotingType?: string, lineWidth?: number }) -> string

## Express Framework
- Route Registration: app.get/post/put/delete(path: string, middleware: (req: Request, res: Response, next: NextFunction) => void)
- Server Start: app.listen(port: number, hostname?: string, backlog?: number, callback?: () => void) -> Server

## Prettier
- Configuration Options: 
  { parser: string, semi: boolean, singleQuote: boolean, trailingComma: 'none'|'es5'|'all', printWidth: number, tabWidth: number }
- CLI Command: prettier --write [files...]

## Yargs
- CLI Parsing: yargs(args: string[], options?: object) returns an object with chaining methods
- Key Methods:
  - command(command: string, description: string, builder: object|function, handler: Function)
  - option(key: string, config: { alias?: string|Array<string>, describe: string, type: 'string'|'number'|'boolean', default?: any })
  - help() -> object
  - argv property for final argument object

Attribution: Data Size: 0 bytes, Links Found: 0, Error: None

## Attribution
- Source: Node.js Ecosystem, Tooling, and CLI Resources
- URL: https://ejs.co | https://github.com/nodeca/js-yaml | https://expressjs.com | https://prettier.io/docs/en/index.html | https://yargs.js.org/
- License: License: Various (MIT and similar)
- Crawl Date: 2025-05-02T13:48:39.979Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-02
LIBRARY_DOCUMENT.md/EJS_TEMPLATING.md
# LIBRARY_DOCUMENT.md/EJS_TEMPLATING.md
# EJS_TEMPLATING

## Crawl Summary
EJS templating uses plain JavaScript embedded in scriptlet tags with syntax such as <% code %> for processing and <%= variable %> for output. It caches intermediate functions for high performance and provides error feedback with template line numbers for effective debugging. Configuration options include cache, delimiter customization, and filename for error tracing.

## Normalised Extract
Table of Contents:
1. USING_PLAIN_JS
   - Use plain JavaScript within scriptlet tags <% %> to embed code directly into HTML templates.
2. TEMPLATE_SYNTAX
   - Standard tags: <% code %>, <%= output %> for HTML escaping, and <%- output %> for raw HTML.
3. PERFORMANCE_OPTIMIZATION
   - Caches intermediate JS functions when cache option is enabled for faster rendering.
4. DEBUGGING
   - EJS throws JavaScript exceptions with specific template line numbers; use the filename option for error tracking.
5. CONFIGURATION_OPTIONS
   - cache (boolean): enables caching when set to true.
   - delimiter (string): changes default template delimiters.
   - filename (string): used for error tracing and caching improvements.

Detailed Information:
USING_PLAIN_JS: Write standard JavaScript inside EJS templates without additional preprocessing or new syntax.
TEMPLATE_SYNTAX: Use <% %> to execute code; <%= %> to output HTML escaped strings; <%- %> to render unescaped content.
PERFORMANCE_OPTIMIZATION: Enable caching to store compiled templates and decrease processing time in production environments.
DEBUGGING: Standard JavaScript errors include line numbers; configuration of the filename parameter can aid in pinpointing errors.
CONFIGURATION_OPTIONS: Options such as cache, delimiter, and filename allow customization according to environment and project needs.

## Supplementary Details
Technical Specifications:
- ejs.render API: Accepts a template string, an optional data object, and an options object. Options include:
  * cache: Boolean flag to enable caching (default false).
  * delimiter: Custom delimiter character to override the default <% and %> (default undefined).
  * filename: String used for caching and improved error messages (default undefined).
- ejs.compile API: Outputs a compiled function that, when called with a data object, returns a rendered string.
Implementation Steps:
1. Create an EJS template file with scriptlet tags.
2. Call ejs.render with the template string, data, and options.
3. Enable caching in production by setting cache: true.
4. For debugging, use the filename parameter to receive errors with specific template line numbers.

Configuration Examples:
Options = { cache: true, delimiter: '%', filename: 'template.ejs' } effectively enable caching, change the delimiter to use % instead of <%, and set the template name for error tracking.

## Reference Details
Complete API Specifications:
Method: ejs.render
Signature: ejs.render(template: string, data?: object, options?: { cache?: boolean, filename?: string, delimiter?: string, openDelimiter?: string, closeDelimiter?: string }): string
Return: Rendered string containing HTML content

Method: ejs.compile
Signature: ejs.compile(template: string, options?: { cache?: boolean, filename?: string, delimiter?: string, openDelimiter?: string, closeDelimiter?: string }): (data?: object) => string
Return: A function which when executed with a data object returns a rendered HTML string

Complete Code Example:
// Import the ejs module
const ejs = require('ejs');

// Sample template string
const templateString = '<h1><%= title %></h1>';

// Render using ejs.render
const renderedOutput = ejs.render(templateString, { title: 'Hello World' }, { cache: true, filename: 'template.ejs' });
console.log(renderedOutput);

// Compile the template for repeated use
const compiledTemplate = ejs.compile(templateString, { cache: true, filename: 'template.ejs' });
const output = compiledTemplate({ title: 'Hello World' });
console.log(output);

Troubleshooting Procedures:
1. If an error occurs, check that all scriptlet tags are correctly closed.
2. Verify that the data object properly passes all required keys.
3. Use the filename option to obtain precise error line numbers.
4. For caching issues, ensure that the cache flag is set appropriately and that stale templates are not being served.

Best Practices:
- Keep business logic out of templates; use templates solely for presentation.
- Always sanitize user input when injecting into HTML to avoid XSS vulnerabilities.
- Test templates with unit tests to ensure rendering consistency.

## Information Dense Extract
EJS.TEMPLATING: Uses plain JavaScript within <% %> tags; API ejs.render(template:string, data?:object, options?:{cache?:boolean, filename?:string, delimiter?:string}) returns string; ejs.compile returns (data?:object)=>string; Options: cache (boolean), delimiter (string), filename (string); Features include inline JavaScript execution, caching for performance, error messages with line numbers; Best practices include minimal logic in templates, using filename for debugging, proper cache management; Troubleshoot by verifying tag closures, data object content, and cache configuration.

## Sanitised Extract
Table of Contents:
1. USING_PLAIN_JS
   - Use plain JavaScript within scriptlet tags <% %> to embed code directly into HTML templates.
2. TEMPLATE_SYNTAX
   - Standard tags: <% code %>, <%= output %> for HTML escaping, and <%- output %> for raw HTML.
3. PERFORMANCE_OPTIMIZATION
   - Caches intermediate JS functions when cache option is enabled for faster rendering.
4. DEBUGGING
   - EJS throws JavaScript exceptions with specific template line numbers; use the filename option for error tracking.
5. CONFIGURATION_OPTIONS
   - cache (boolean): enables caching when set to true.
   - delimiter (string): changes default template delimiters.
   - filename (string): used for error tracing and caching improvements.

Detailed Information:
USING_PLAIN_JS: Write standard JavaScript inside EJS templates without additional preprocessing or new syntax.
TEMPLATE_SYNTAX: Use <% %> to execute code; <%= %> to output HTML escaped strings; <%- %> to render unescaped content.
PERFORMANCE_OPTIMIZATION: Enable caching to store compiled templates and decrease processing time in production environments.
DEBUGGING: Standard JavaScript errors include line numbers; configuration of the filename parameter can aid in pinpointing errors.
CONFIGURATION_OPTIONS: Options such as cache, delimiter, and filename allow customization according to environment and project needs.

## Original Source
EJS Templating Documentation
https://ejs.co/

## Digest of EJS_TEMPLATING

# EJS TEMPLATING

Date Retrieved: 2023-10-04

## Overview
EJS (Embedded JavaScript) is a templating language designed to integrate plain JavaScript directly into HTML. It leverages JavaScript in scriptlet tags for dynamic content generation and enables fast rendering via function caching.

## API Methods
- ejs.render(template: string, data?: object, options?: { cache?: boolean, filename?: string, delimiter?: string, openDelimiter?: string, closeDelimiter?: string }): string
- ejs.compile(template: string, options?: { cache?: boolean, filename?: string, delimiter?: string, openDelimiter?: string, closeDelimiter?: string }): (data?: object) => string

## Configuration Options
- cache: Default is false; when true, caches the compiled functions for subsequent calls.
- delimiter: Default delimiters are <% and %> but can be overridden using the 'delimiter', 'openDelimiter', and 'closeDelimiter' options.
- filename: Optional parameter for better error tracing and caching.

## Core Usage
1. Embed plain JavaScript inside <% %> for processing.
2. Output HTML using <%= %> to escape or <%- %> to render raw HTML.
3. Leverage caching to boost performance in production environments.

## Debugging
- Errors raise standard JavaScript exceptions with template line numbers included.
- Common practice is to log actual errors and use the filename option to pinpoint template issues.

## Best Practices
- Use meaningful filenames for templates to aid in debugging.
- Enable caching (cache: true) in production for sped-up rendering.
- Keep JavaScript within the template minimal for maintainability.

## Attribution
Data Size: 9176 bytes; Source URL: https://ejs.co/; Retrieved on: 2023-10-04

## Attribution
- Source: EJS Templating Documentation
- URL: https://ejs.co/
- License: License: MIT
- Crawl Date: 2025-05-02T18:31:34.951Z
- Data Size: 9176 bytes
- Links Found: 33

## Retrieved
2025-05-02
LIBRARY_DOCUMENT.md/PLOTLY_JS.md
# LIBRARY_DOCUMENT.md/PLOTLY_JS.md
# PLOTLY_JS

## Crawl Summary
Plotly.js is a declarative charting library built on d3.js and stack.gl. Usage revolves around Plotly.newPlot which accepts a container element, data array, layout configuration, and a configuration object. The library supports complex chart types like contour, scatter with error bars, and high-performance WebGL based plots. Exact configurations include setting trace type, colorscale arrays, axis titles, margins, and annotations. Performance optimizations include using scattergl and WebGL for 3D plotting.

## Normalised Extract
Table of Contents:
1. Getting Started
   - Use Plotly.newPlot(DOMElement, data, layout, config) to render charts.
2. Chart Configuration
   - Define trace with properties: type, autocolorscale, colorscale (e.g. [[0, rgb(0,0,0)], [0.3, rgb(230,0,0)], [0.6, rgb(255,210,0)], [1, rgb(255,255,255)]]), reversescale, zmax, zmin.
   - Define layout with title, xaxis (text, showline, mirror, ticks), yaxis (text, showline, mirror, ticks), margin, and annotations (showarrow, text, x, y, xref, yref).
3. Example Implementation - Contour Plot
   - Create trace and layout JSON objects as specified. Execute Plotly.newPlot(document.getElementById('contour-plot'), [trace], layout, {showLink: false}).
4. Example Implementation - Scatter Plot with Error Bars
   - Define trace with type 'scatter', mode 'lines', x and y mapping from CSV rows, line width, and error_y config with array, thickness, width.
   - Configure layout with xaxis and yaxis properties and margin settings, then call Plotly.newPlot(document.getElementById('wind-speed'), [trace], layout, {showLink: false}).
5. Performance and Best Practices
   - For large datasets, use scattergl; for 3D charts, ensure WebGL is utilized.
   - Optimize SVG usage and switch to WebGL when necessary.

## Supplementary Details
Technical Specifications:
- Trace Object for Contour Plot:
  {
    type: 'contour',
    autocolorscale: false,
    colorscale: [[0, 'rgb(0, 0, 0)'],[0.3, 'rgb(230, 0, 0)'],[0.6, 'rgb(255, 210, 0)'],[1, 'rgb(255, 255, 255)']],
    reversescale: true,
    zmax: 2.5,
    zmin: -2.5
  }
- Layout Object for Contour Plot:
  {
    title: { text: 'turbulence simulation' },
    xaxis: { title: { text: 'radial direction' }, showline: true, mirror: 'allticks', ticks: 'inside' },
    yaxis: { title: { text: 'vertical direction' }, showline: true, mirror: 'allticks', ticks: 'inside' },
    margin: { l: 40, b: 40, t: 60 },
    annotations: [{ showarrow: false, text: 'Credit: Daniel Carrera', x: 0, y: 0, xref: 'paper', yref: 'paper' }]
  }
- Trace Object for Scatter Plot:
  {
    type: 'scatter',
    mode: 'lines',
    x: rows.map(function(row){ return row['Time']; }),
    y: rows.map(function(row){ return row['10 Min Sampled Avg']; }),
    line: { width: 1 },
    error_y: {
      array: rows.map(function(row){ return row['10 Min Std Dev']; }),
      thickness: 0.5,
      width: 0
    }
  }
- Layout Object for Scatter Plot:
  {
    yaxis: { title: { text: 'Wind Speed' } },
    xaxis: { showgrid: false, tickformat: '%B, %Y' },
    margin: { l: 40, b: 10, r: 10, t: 20 }
  }
Implementation Steps:
1. Prepare data arrays from CSV or JSON.
2. Define trace and layout objects with exact properties as above.
3. Call Plotly.newPlot with container element, data array, layout, and configuration {showLink: false}.
Configuration Options:
- config.showLink: Boolean (default false to disable Plotly link).
- Use custom colorscale values and axis settings as specified.

## Reference Details
API Specifications:
Method: Plotly.newPlot(container: HTMLElement, data: Array<Object>, layout: Object, config: Object) => Promise
Parameters:
  container: A valid DOM element reference.
  data: Array of trace objects; each trace object must include type and data arrays.
  layout: Object including keys: title, xaxis, yaxis, margin, annotations.
  config: Object with options such as showLink (Boolean).

SDK Method Signatures:
Example 1 - Contour Plot:
// Create trace
var trace = {
  type: 'contour',
  autocolorscale: false,
  colorscale: [[0, 'rgb(0, 0, 0)'], [0.3, 'rgb(230, 0, 0)'], [0.6, 'rgb(255, 210, 0)'], [1, 'rgb(255, 255, 255)']],
  reversescale: true,
  zmax: 2.5,
  zmin: -2.5
};

// Create layout
var layout = {
  title: { text: 'turbulence simulation' },
  xaxis: { title: { text: 'radial direction' }, showline: true, mirror: 'allticks', ticks: 'inside' },
  yaxis: { title: { text: 'vertical direction' }, showline: true, mirror: 'allticks', ticks: 'inside' },
  margin: { l: 40, b: 40, t: 60 },
  annotations: [{ showarrow: false, text: 'Credit: Daniel Carrera', x: 0, y: 0, xref: 'paper', yref: 'paper' }]
};

// Plot call
Plotly.newPlot(document.getElementById('contour-plot'), [trace], layout, {showLink: false});

Example 2 - Scatter Plot with Error Bars:
var trace = {
  type: 'scatter',
  mode: 'lines',
  x: rows.map(function(row){ return row['Time']; }),
  y: rows.map(function(row){ return row['10 Min Sampled Avg']; }),
  line: { width: 1 },
  error_y: {
    array: rows.map(function(row){ return row['10 Min Std Dev']; }),
    thickness: 0.5,
    width: 0
  }
};

var layout = {
  yaxis: { title: { text: 'Wind Speed' } },
  xaxis: { showgrid: false, tickformat: '%B, %Y' },
  margin: { l: 40, b: 10, r: 10, t: 20 }
};

Plotly.newPlot(document.getElementById('wind-speed'), [trace], layout, {showLink: false});

Troubleshooting Procedures:
1. Verify that the DOM element exists and is accessible.
2. Ensure that data arrays are correctly populated from CSV/JSON sources.
3. Check console for errors related to incorrect configuration object keys or missing parameters.
4. If performance lag occurs, replace SVG based scatter with scattergl.

Configuration Effects:
- showLink: false removes branding link. Default for deployment if not needed.
- Adjusting margin values controls chart padding.
- Using mirror 'allticks' in axes ensures consistent tick rendering.

Best Practices:
- Validate data before plotting.
- Use WebGL enabled chart types for large datasets.
- Maintain configuration consistency across charts to ensure uniform styling.

## Information Dense Extract
Plotly.js: Declarative charting library using Plotly.newPlot(container, data, layout, config). Trace config: type, autocolorscale, colorscale ([[0, rgb(0,0,0)], [0.3, rgb(230,0,0)], [0.6, rgb(255,210,0)], [1, rgb(255,255,255)]]), reversescale, zmax (2.5), zmin (-2.5). Layout: title text, xaxis and yaxis with title, showline true, mirror 'allticks', ticks 'inside', margin {l:40,b:40,t:60}, annotations with showarrow false. Scatter plot: type 'scatter', mode 'lines', line width 1, error_y: array, thickness 0.5, width 0; layout with yaxis title 'Wind Speed', xaxis with showgrid false and tickformat '%B, %Y', margin {l:40,b:10,r:10,t:20}. API: Plotly.newPlot returns Promise; parameters container: HTMLElement, data: Array<Object>, layout: Object, config: Object (e.g., {showLink:false}). Use scattergl for performance and WebGL for 3D charts.

## Sanitised Extract
Table of Contents:
1. Getting Started
   - Use Plotly.newPlot(DOMElement, data, layout, config) to render charts.
2. Chart Configuration
   - Define trace with properties: type, autocolorscale, colorscale (e.g. [[0, rgb(0,0,0)], [0.3, rgb(230,0,0)], [0.6, rgb(255,210,0)], [1, rgb(255,255,255)]]), reversescale, zmax, zmin.
   - Define layout with title, xaxis (text, showline, mirror, ticks), yaxis (text, showline, mirror, ticks), margin, and annotations (showarrow, text, x, y, xref, yref).
3. Example Implementation - Contour Plot
   - Create trace and layout JSON objects as specified. Execute Plotly.newPlot(document.getElementById('contour-plot'), [trace], layout, {showLink: false}).
4. Example Implementation - Scatter Plot with Error Bars
   - Define trace with type 'scatter', mode 'lines', x and y mapping from CSV rows, line width, and error_y config with array, thickness, width.
   - Configure layout with xaxis and yaxis properties and margin settings, then call Plotly.newPlot(document.getElementById('wind-speed'), [trace], layout, {showLink: false}).
5. Performance and Best Practices
   - For large datasets, use scattergl; for 3D charts, ensure WebGL is utilized.
   - Optimize SVG usage and switch to WebGL when necessary.

## Original Source
Plotly.js Documentation
https://plotly.com/javascript/

## Digest of PLOTLY_JS

# Plotly.js Documentation Digest

Date Retrieved: 2023-10-12

## Overview
Plotly.js is a high-level, declarative charting library built on d3.js and stack.gl. It supports over 40 chart types including 3D charts, statistical graphs, and SVG maps. It represents charts using declarative JSON objects.

## Table of Contents
1. Getting Started
2. Chart Configuration
3. Example: Contour Plot
4. Example: Scatter Plot with Error Bars
5. Performance Considerations
6. API and SDK Methods

## 1. Getting Started
- Include Plotly.js in your project to render interactive charts.
- Plotly.newPlot(container, data, layout, config) is the main method.

## 2. Chart Configuration
- All aspects such as colors, grid lines, legends, and annotations can be configured via JSON objects.
- Layout configuration includes axis settings, margins, and annotation positioning.

## 3. Example: Contour Plot
Trace definition:
  type: 'contour'
  autocolorscale: false
  colorscale: [[0, rgb(0, 0, 0)], [0.3, rgb(230, 0, 0)], [0.6, rgb(255,210, 0)], [1, rgb(255,255,255)] ]
  reversescale: true
  zmax: 2.5, zmin: -2.5

Layout settings:
  title: text 'turbulence simulation'
  xaxis: title 'radial direction', showline true, mirror 'allticks', ticks 'inside'
  yaxis: title 'vertical direction', showline true, mirror 'allticks', ticks 'inside'
  margin: {l: 40, b: 40, t: 60}
  annotations: [{showarrow: false, text: 'Credit: Daniel Carrera', x: 0, y: 0, xref: 'paper', yref: 'paper'}]

Plotting command:
  Plotly.newPlot(DOMElement, [trace], layout, {showLink: false})

## 4. Example: Scatter Plot with Error Bars
Trace definition:
  type: 'scatter'
  mode: 'lines'
  x: Data parsed from CSV (e.g. row['Time'])
  y: Data parsed from CSV (e.g. row['10 Min Sampled Avg'])
  line: {width: 1}
  error_y: { array: Data parsed for error, thickness: 0.5, width: 0 }

Layout settings:
  xaxis: showgrid false, tickformat '%B, %Y'
  yaxis: title text 'Wind Speed'
  margin: {l: 40, b: 10, r: 10, t: 20}

Plotting command:
  Plotly.newPlot(DOMElement, [trace], layout, {showLink: false})

## 5. Performance Considerations
- For high performance charts, use scattergl instead of standard scatter to render points via WebGL.
- 3D charts leverage WebGL for GPU acceleration.

## 6. API and SDK Methods
Primary method:
  Plotly.newPlot(container: HTMLElement, data: Array<Object>, layout: Object, config: Object): Promise

Configuration options example:
  config: {showLink: false} disables the default Plotly logo link.

Attribution: Data size: 4221886 bytes, Links Found: 13163

Copyright © 2025 Plotly. All rights reserved.

## Attribution
- Source: Plotly.js Documentation
- URL: https://plotly.com/javascript/
- License: MIT
- Crawl Date: 2025-05-02T02:20:52.266Z
- Data Size: 4221886 bytes
- Links Found: 13163

## Retrieved
2025-05-02
LIBRARY_DOCUMENT.md/NODE_API.md
# LIBRARY_DOCUMENT.md/NODE_API.md
# NODE_API

## Crawl Summary
Node.js API documentation includes a complete HTTP server example using createServer, detailed usage of the assert module with strict and legacy modes, comprehensive class specifications for assert.AssertionError and assert.CallTracker, and method signatures for various assertion functions such as deepEqual, deepStrictEqual, doesNotMatch, doesNotReject, doesNotThrow, equal, fail, ifError, match, notDeepEqual, notDeepStrictEqual, notEqual, notStrictEqual, ok, rejects, strictEqual, throws, and partialDeepStrictEqual. Each method details parameters, expected types, return types, and code examples for implementation.

## Normalised Extract
TABLE OF CONTENTS:
1. HTTP Server
  - createServer from node:http
  - Method Signature: createServer(requestListener: (req: IncomingMessage, res: ServerResponse) => void): Server
  - Usage: server.listen(port, hostname, callback)
  - Code Example: Setup a server that writes a 200 status and 'Hello World!\n'
2. Assertion Module
  - Modes: Strict (import from 'node:assert/strict') and Legacy (import from 'node:assert')
  - Class: assert.AssertionError
    * Constructor Options: { message?: string, actual: any, expected: any, operator: string, stackStartFn?: Function }
    * Properties: message, actual, expected, operator, generatedMessage (boolean), code ('ERR_ASSERTION')
  - Class: assert.CallTracker (Deprecated)
    * Methods: calls(fn, exact), getCalls(fn), report(), reset(fn), verify()
  - Assertion Functions:
    * assert(value[, message])
    * assert.deepEqual(actual, expected[, message])
    * assert.deepStrictEqual(actual, expected[, message])
    * assert.doesNotMatch(string, regexp[, message])
    * assert.doesNotReject(asyncFn[, error][, message])
    * assert.doesNotThrow(fn[, error][, message])
    * assert.equal(actual, expected[, message])
    * assert.fail([message])
    * assert.ifError(value)
    * assert.match(string, regexp[, message])
    * assert.notDeepEqual(actual, expected[, message])
    * assert.notDeepStrictEqual(actual, expected[, message])
    * assert.notEqual(actual, expected[, message])
    * assert.notStrictEqual(actual, expected[, message])
    * assert.ok(value[, message])
    * assert.rejects(asyncFn[, error][, message])
    * assert.strictEqual(actual, expected[, message])
    * assert.throws(fn[, error][, message])
    * assert.partialDeepStrictEqual(actual, expected[, message])

Each topic includes direct implementation patterns and code samples for immediate application.

## Supplementary Details
HTTP Server Configuration:
  - Port: 3000 (default in example)
  - Hostname: '127.0.0.1'
  - Method: server.listen(port, hostname, callback) where callback logs status message.

Assertion Module Details:
  - Strict Mode: Ensures deepStrictEqual is used for comparing values, treating NaN correctly and checking prototypes.
  - Legacy Mode: Uses == for comparisons, may yield unexpected results.
  - assert.AssertionError options include: message (string), actual (any), expected (any), operator (string), and optional stackStartFn (Function).
  - assert.CallTracker: Allows tracking of function calls with expected call count; reset and verify methods enable checking for discrepancies.

CLI Usage:
  - Command: node [options] [script.js] to execute script with Node.js runtime.
  - Detailed configuration options available via command-line flags as documented in Node.js CLI documentation.

## Reference Details
API SPECIFICATIONS:

HTTP Server API:
  Function: createServer
    - Signature: createServer(requestListener: (req: IncomingMessage, res: ServerResponse) => void): Server
    - Example Usage:
      import { createServer } from 'node:http';
      const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!\n');
      });
      server.listen(3000, '127.0.0.1', () => { console.log('Listening on 127.0.0.1:3000'); });

Assertion Module API:

  1. assert(value: any, message?: string|Error): void
     - Checks truthiness; alias: assert.ok

  2. assert.deepEqual(actual: any, expected: any, message?: string): void
     - Loose deep equality using == for primitives except for NaN

  3. assert.deepStrictEqual(actual: any, expected: any, message?: string): void
     - Strict deep equality using Object.is for primitives; compares prototypes and symbols

  4. assert.doesNotMatch(string: string, regexp: RegExp, message?: string|Error): void
     - Throws if string matches regexp

  5. assert.doesNotReject(asyncFn: Function|Promise<any>, error?: RegExp|Function, message?: string): Promise<void>
     - Awaits asyncFn; expects no rejection

  6. assert.doesNotThrow(fn: Function, error?: RegExp|Function, message?: string): void
     - Executes fn and throws if it throws an error matching error

  7. assert.equal(actual: any, expected: any, message?: string): void
     - Compares using ==

  8. assert.fail([message: string|any]): never
     - Immediately throws an AssertionError

  9. assert.ifError(value: any): void
     - Throws if value is truthy

 10. assert.match(string: string, regexp: RegExp, message?: string|Error): void
     - Throws if string does not match regexp

 11. assert.notDeepEqual(actual: any, expected: any, message?: string): void
     - Verifies deep inequality

 12. assert.notDeepStrictEqual(actual: any, expected: any, message?: string): void
     - Verifies strict deep inequality

 13. assert.notEqual(actual: any, expected: any, message?: string): void
     - Compares using !=

 14. assert.notStrictEqual(actual: any, expected: any, message?: string): void
     - Compares using !==

 15. assert.ok(value: any, message?: string): void
     - Alias for assert(value, message)

 16. assert.rejects(asyncFn: Function|Promise<any>, error?: RegExp|Function, message?: string): Promise<void>
     - Awaits asyncFn and expects a rejection

 17. assert.strictEqual(actual: any, expected: any, message?: string): void
     - Uses === for comparison

 18. assert.throws(fn: Function, error?: RegExp|Function, message?: string): void
     - Expects fn to throw an error matching error

 19. assert.partialDeepStrictEqual(actual: any, expected: any, message?: string): void
     - Checks partial deep strict equality

Example Code for assert.AssertionError:
  const { message } = new assert.AssertionError({ actual: 1, expected: 2, operator: 'strictEqual' });
  try {
    assert.strictEqual(1, 2);
  } catch (err) {
    // Expected error properties:
    // err.message, err.name, err.actual, err.expected, err.code, err.operator, err.generatedMessage
  }

Example Code for assert.CallTracker:
  const tracker = new assert.CallTracker();
  function func() {}
  const callsFunc = tracker.calls(func, 1);
  callsFunc();
  process.on('exit', () => { tracker.verify(); });

Troubleshooting Procedures:
  - If a function tracked by CallTracker does not meet expected call count, tracker.verify() will throw an error with details in tracker.report().
  - Use console.log(tracker.report()) to output the discrepancy details which include expected and actual call counts and stack traces.
  - For HTTP server issues, verify server.listen parameters and check for callback errors.

Configuration Options:
  - Node.js CLI options via node [options] [script] (e.g. --inspect for debugging)
  - Environment variables: NO_COLOR, NODE_DISABLE_COLORS to control terminal output in assert module.


## Information Dense Extract
HTTP Server: createServer((req, res) => { res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('Hello World!\n'); }); server.listen(3000, '127.0.0.1', callback); | assert module: Modes: strict (import { strict as assert }) and legacy (import assert) | assert.AssertionError(options: { message?: string, actual: any, expected: any, operator: string, stackStartFn?: Function }) with properties: message, actual, expected, operator, generatedMessage, code='ERR_ASSERTION' | assert.CallTracker: calls(fn, exact=1) -> Function, getCalls(fn) -> Array, report() -> Array, reset(fn?) -> void, verify() -> void | Methods: assert(value[,message]), deepEqual, deepStrictEqual, doesNotMatch, doesNotReject, doesNotThrow, equal, fail, ifError, match, notDeepEqual, notDeepStrictEqual, notEqual, notStrictEqual, ok, rejects, strictEqual, throws, partialDeepStrictEqual.

## Sanitised Extract
TABLE OF CONTENTS:
1. HTTP Server
  - createServer from node:http
  - Method Signature: createServer(requestListener: (req: IncomingMessage, res: ServerResponse) => void): Server
  - Usage: server.listen(port, hostname, callback)
  - Code Example: Setup a server that writes a 200 status and 'Hello World!'n'
2. Assertion Module
  - Modes: Strict (import from 'node:assert/strict') and Legacy (import from 'node:assert')
  - Class: assert.AssertionError
    * Constructor Options: { message?: string, actual: any, expected: any, operator: string, stackStartFn?: Function }
    * Properties: message, actual, expected, operator, generatedMessage (boolean), code ('ERR_ASSERTION')
  - Class: assert.CallTracker (Deprecated)
    * Methods: calls(fn, exact), getCalls(fn), report(), reset(fn), verify()
  - Assertion Functions:
    * assert(value[, message])
    * assert.deepEqual(actual, expected[, message])
    * assert.deepStrictEqual(actual, expected[, message])
    * assert.doesNotMatch(string, regexp[, message])
    * assert.doesNotReject(asyncFn[, error][, message])
    * assert.doesNotThrow(fn[, error][, message])
    * assert.equal(actual, expected[, message])
    * assert.fail([message])
    * assert.ifError(value)
    * assert.match(string, regexp[, message])
    * assert.notDeepEqual(actual, expected[, message])
    * assert.notDeepStrictEqual(actual, expected[, message])
    * assert.notEqual(actual, expected[, message])
    * assert.notStrictEqual(actual, expected[, message])
    * assert.ok(value[, message])
    * assert.rejects(asyncFn[, error][, message])
    * assert.strictEqual(actual, expected[, message])
    * assert.throws(fn[, error][, message])
    * assert.partialDeepStrictEqual(actual, expected[, message])

Each topic includes direct implementation patterns and code samples for immediate application.

## Original Source
Node.js Core and CLI Best Practices Documentation
https://nodejs.org/api/

## Digest of NODE_API

# Node.js API Documentation

Retrieved: 2023-10-31

## HTTP Server Example

Method: createServer from module node:http

Signature:
  createServer(requestListener: function(req: IncomingMessage, res: ServerResponse)): Server

Example:
  import { createServer } from 'node:http';

  const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
  });

  // Listening on port 3000 and host 127.0.0.1
  server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
  });

## Assertion Module

Module: node:assert

### Strict and Legacy Modes

Strict Mode Usage:
  import { strict as assert } from 'node:assert';
  const assert = require('node:assert').strict;

Legacy Mode Usage:
  import assert from 'node:assert';
  const assert = require('node:assert');

### Class: assert.AssertionError

Constructor:
  new assert.AssertionError(options: {
    message?: string,
    actual: any,
    expected: any,
    operator: string,
    stackStartFn?: Function
  })

Properties:
  - message: string
  - actual: any
  - expected: any
  - operator: string
  - generatedMessage: boolean
  - code: string (always 'ERR_ASSERTION')

Usage Example:
  const { message } = new assert.AssertionError({ actual: 1, expected: 2, operator: 'strictEqual' });
  try {
    assert.strictEqual(1, 2);
  } catch (err) {
    assert(err instanceof assert.AssertionError);
    assert.strictEqual(err.message, message);
    assert.strictEqual(err.name, 'AssertionError');
    assert.strictEqual(err.actual, 1);
    assert.strictEqual(err.expected, 2);
    assert.strictEqual(err.code, 'ERR_ASSERTION');
    assert.strictEqual(err.operator, 'strictEqual');
    assert.strictEqual(err.generatedMessage, true);
  }

### Class: assert.CallTracker (Deprecated)

Constructor:
  new assert.CallTracker()

Methods:
  tracker.calls(fn: Function, exact?: number = 1) -> Function
  tracker.getCalls(fn: Function) -> Array<{ thisArg: any, arguments: Array<any> }>
  tracker.report() -> Array<{ message: string, actual: number, expected: number, operator: string, stack: Object }>
  tracker.reset(fn?: Function) -> void
  tracker.verify() -> void (throws error if call count mismatches)

Example:
  const tracker = new assert.CallTracker();
  function sampleFunc() {}
  const trackedFunc = tracker.calls(sampleFunc, 1);
  trackedFunc();
  process.on('exit', () => {
    tracker.verify();
  });

### Assertion Methods

assert(value: any, message?: string|Error): void
assert.deepEqual(actual: any, expected: any, message?: string): void
assert.deepStrictEqual(actual: any, expected: any, message?: string): void
assert.doesNotMatch(string: string, regexp: RegExp, message?: string|Error): void
assert.doesNotReject(asyncFn: Function|Promise<any>, error?: RegExp|Function, message?: string): Promise<void>
assert.doesNotThrow(fn: Function, error?: RegExp|Function, message?: string): void
assert.equal(actual: any, expected: any, message?: string): void
assert.fail(message?: string): never
assert.ifError(value: any): void
assert.match(string: string, regexp: RegExp, message?: string|Error): void
assert.notDeepEqual(actual: any, expected: any, message?: string): void
assert.notDeepStrictEqual(actual: any, expected: any, message?: string): void
assert.notEqual(actual: any, expected: any, message?: string): void
assert.notStrictEqual(actual: any, expected: any, message?: string): void
assert.ok(value: any, message?: string): void
assert.rejects(asyncFn: Function|Promise<any>, error?: RegExp|Function, message?: string): Promise<void>
assert.strictEqual(actual: any, expected: any, message?: string): void
assert.throws(fn: Function, error?: RegExp|Function, message?: string): void
assert.partialDeepStrictEqual(actual: any, expected: any, message?: string): void


## Attribution
- Source: Node.js Core and CLI Best Practices Documentation
- URL: https://nodejs.org/api/
- License: License: MIT
- Crawl Date: 2025-05-02T03:06:28.651Z
- Data Size: 4280549 bytes
- Links Found: 5392

## Retrieved
2025-05-02
