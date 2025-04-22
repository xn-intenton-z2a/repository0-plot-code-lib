# YARGS_DOC

## Crawl Summary
Overview: Yargs is a Node.js command line parser offering dynamic help, command grouping, and bash completion. Installation via npm is required. Primary usage involves initializing yargs, setting a script name, usage pattern, and defining commands with positional arguments, defaults, and types. Examples include a basic command ('hello') with a default parameter, dual module support for CommonJS and ESM, and experimental support for Deno. Technical specifics include TypeScript integration with compilation through Rollup to generate both ESM and CommonJS bundles, conditional exports, and removal of deprecated helpers.

## Normalised Extract
# Table of Contents
1. Overview
2. Installation
3. Getting Started
4. Command Execution
5. Dual Module Support
   - CommonJS
   - ESM
6. Deno Support
7. Additional Details

## 1. Overview
- Build interactive CLI tools
- Parse command line arguments
- Dynamic help and bash-completion

## 2. Installation
Command:
```
$ npm install --save yargs
```

## 3. Getting Started
Example file (example.js):
```javascript
#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs()
  .scriptName("pirate-parser")
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (yargs) => {
    return yargs.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    });
  }, (argv) => {
    console.log('hello', argv.name, 'welcome to yargs!');
  })
  .help()
  .parse(hideBin(process.argv));
```

## 4. Command Execution
To test the command:
```
$ node example.js hello --name Parrot
```
Expected Output:
```
hello Parrot welcome to yargs!
```

## 5. Dual Module Support
### CommonJS Example
```javascript
const { argv } = require('yargs');

if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!');
} else {
  console.log('Retreat from the xupptumblers!');
}
```

### ESM Example
```javascript
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
    console.info(argv);
  })
  .demandCommand(1)
  .argv;
```

## 6. Deno Support (Experimental)
```javascript
import yargs from 'https://deno.land/x/yargs/deno.ts';
import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts';

yargs()
  .command('download <files...>', 'download a list of files', (yargs: YargsType) => {
    return yargs.positional('files', {
      describe: 'a list of files to do something with'
    });
  }, (argv: Arguments) => {
    console.info(argv);
  })
  .strictCommands()
  .demandCommand(1)
  .parse(Deno.args);
```

## 7. Additional Details
- **TypeScript**: Written in TypeScript with a dual bundle process (ESM via TypeScript compilation and CommonJS via Rollup).
- **Configuration**: Use `.scriptName()`, `.usage()`, and `.command()` to configure your CLI.
- **Defaults and Types**: Positional parameters define type (e.g., string), default value (e.g., 'Cambi'), and description.
- **Breaking Changes**: Removal of deep import support and deprecated helpers.


## Supplementary Details
## Yargs Supplementary Technical Specifications

- **Installation Command:**
  - npm install --save yargs

- **CLI Initialization:**
  - Method: yargs()
  - Chainable methods include:
    - .scriptName(name: string): Sets the command alias.
    - .usage(usage: string): Defines the usage pattern. e.g., '$0 <cmd> [args]'.
    - .command(command: string, description: string, [builder], [handler]): Defines a command with a builder function to specify options.
    - .help(): Enables the help command.
    - .parse(args: string[]): Parses command line arguments.
    
- **Builder Function Details:**
  - Use yargs.positional(name, { type: 'string', default: 'Cambi', describe: 'the name to say hello to' }) to set parameter details.

- **Conditional Exports:**
  - Yargs now supports both CommonJS and ESM via Node.js conditional exports. No deep file imports permitted.

- **TypeScript & Rollup:**
  - The library is compiled to ESM using TypeScript compiler, and a secondary Rollup step generates the CommonJS bundle.
  - No shipped type declaration files; install @types/yargs separately.

- **Deno Experimental Support:**
  - Usage is similar to Node.js but leverages Deno.args and imports from Deno-hosted URLs.


## Reference Details
## Yargs API and SDK Reference

### 1. Core API Methods:

- yargs()
  - Returns: Yargs instance
  - Chainable methods:
    - scriptName(name: string): Yargs
    - usage(usage: string): Yargs
    - command(command: string, description: string, builder?: (yargs: Yargs.Argv) => Yargs.Argv, handler?: (argv: any) => void): Yargs
    - help(): Yargs
    - parse(args?: string[]): any

### 2. Example Code (ESM):

```javascript
#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Setup the CLI with a custom script name, usage, and a command

yargs(hideBin(process.argv))
  .scriptName("pirate-parser")
  .usage('$0 <cmd> [args]')
  .command(
    'hello [name]', 
    'welcome ter yargs!', 
    (yargs) => {
      return yargs.positional('name', {
        type: 'string',
        default: 'Cambi',
        describe: 'the name to say hello to'
      });
    }, 
    (argv) => {
      // Handler: Print a greeting message
      console.log('hello', argv.name, 'welcome to yargs!');
    }
  )
  .help()
  .parse();
```

### 3. CommonJS Example:

```javascript
const { argv } = require('yargs');

if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!');
} else {
  console.log('Retreat from the xupptumblers!');
}
```

### 4. Deno Example (Experimental):

```javascript
import yargs from 'https://deno.land/x/yargs/deno.ts';
import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts';

yargs()
  .command(
    'download <files...>', 
    'download a list of files', 
    (yargs: YargsType) => {
      return yargs.positional('files', {
        describe: 'a list of files to do something with'
      });
    }, 
    (argv: Arguments) => {
      console.info(argv);
    }
  )
  .strictCommands()
  .demandCommand(1)
  .parse(Deno.args);
```

### 5. Configuration Options and Best Practices

- Always set a script name and usage for clarity.
- Use builder functions to enforce type safety on arguments.
- For TypeScript projects, install `@types/yargs` and configure your build to handle both ESM and CommonJS outputs.
- In troubleshooting, run the CLI with `--help` to verify expected command definitions:

Command:
```
$ node example.js --help
```
Expected Output:
```
pirate-parser <cmd> [args]
Commands:
  pirate-parser hello [name]  welcome ter yargs!
Options:
  --help  Show help  [boolean]
```

### 6. Troubleshooting Procedures

- If commands do not display correctly, verify the builder function syntax and positional configuration.
- Ensure you use `hideBin(process.argv)` in ESM setups.
- For module resolution issues, check if the Node.js version supports conditional exports (Node 10+ recommended).
- For Deno, verify that the Deno runtime has network access to load modules.


## Original Source
Yargs Documentation
https://yargs.js.org/docs/

## Digest of YARGS_DOC

# YARGS DOCUMENTATION

Retrieved on: 2023-10-11

## Overview

Yargs is a Node.js library that helps in building interactive command line tools by parsing arguments and generating an elegant user interface. It provides commands, grouped options, dynamically generated help menus, and bash-completion shortcuts.

## Installation

To install yargs, run the following command in your terminal:

```
$ npm install --save yargs
```

## Getting Started

Create a file (e.g., example.js) with the following code:

```javascript
#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Initialize yargs and configure the command line interface

yargs()
  .scriptName("pirate-parser")
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (yargs) => {
    return yargs.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    });
  }, (argv) => {
    console.log('hello', argv.name, 'welcome to yargs!');
  })
  .help()
  .parse(hideBin(process.argv));
```

Run the following command to view help:

```
$ node example.js --help
```

This will output:

```
pirate-parser <cmd> [args]

Commands:
  pirate-parser hello [name]  welcome ter yargs!

Options:
  --help  Show help  [boolean]
```

## Command Execution

Example of running the hello command:

```
$ node example.js hello --name Parrot
```

Expected output:

```
hello Parrot welcome to yargs!
```

## Dual Module Support

### CommonJS Example:

```javascript
const { argv } = require('yargs');

if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!');
} else {
  console.log('Retreat from the xupptumblers!');
}
```

### ESM Example:

```javascript
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
    console.info(argv);
  })
  .demandCommand(1)
  .argv;
```

## Deno Support (Experimental)

```javascript
import yargs from 'https://deno.land/x/yargs/deno.ts';
import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts';

yargs()
  .command('download <files...>', 'download a list of files', (yargs: YargsType) => {
    return yargs.positional('files', {
      describe: 'a list of files to do something with'
    });
  }, (argv: Arguments) => {
    console.info(argv);
  })
  .strictCommands()
  .demandCommand(1)
  .parse(Deno.args);
```

## Additional Technical Details

- **TypeScript Conversion**: yargs is written in TypeScript and supports both ESM and CommonJS modules using Node.js conditional exports. Type declaration files are not shipped, so TypeScript users need to install `@types/yargs` separately.
- **Conditional Exports**: The exported files are explicitly defined; deep file imports (e.g., `lib/utils/obj-filter.js`) are not allowed.
- **Breaking Changes**: Removal of the `rebase` helper and dropping support for Node 8.

## Attribution

Data Size: 348060 bytes
Links Found: 34
No errors detected.


## Attribution
- Source: Yargs Documentation
- URL: https://yargs.js.org/docs/
- License: MIT
- Crawl Date: 2025-04-20T20:46:49.922Z
- Data Size: 348060 bytes
- Links Found: 34

## Retrieved
2025-04-20
