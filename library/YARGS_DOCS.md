# YARGS_DOCS

## Crawl Summary
The crawled content provides detailed information on installing and using yargs for CLI applications. It includes explicit code examples for both CommonJS and ESM modules, as well as experimental support for Deno. Key API methods such as .command() and .parse() are documented with their exact parameters and callback signatures. The content also details installation via npm, usage instructions, output examples, and lists significant breaking changes like the removal of deep requires and the dropped Node 8 support.

## Normalised Extract
## Table of Contents
1. Introduction
2. Installation
3. Getting Started
4. CLI Usage
5. Dual Module Support
   - CommonJS Example
   - ESM Example
6. Deno Support
7. Breaking Changes
8. Contributing Guidelines

---

### 1. Introduction
- Yargs is used to build interactive CLI tools, parse command line arguments, and generate help menus automatically.

### 2. Installation
- Command: `npm install --save yargs`

### 3. Getting Started
- Starter Code:

```js
#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs()
  .scriptName("pirate-parser")
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    });
  }, function (argv) {
    console.log('hello', argv.name, 'welcome to yargs!');
  })
  .help()
  .parse(hideBin(process.argv));
```

### 4. CLI Usage
- Help command: `$ node example.js --help`
- Expected output includes usage pattern, command list, and options.

### 5. Dual Module Support
#### CommonJS

```js
const { argv } = require('yargs');

if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!');
} else {
  console.log('Retreat from the xupptumblers!');
}
```

#### ESM

```js
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
    console.info(argv);
  })
  .demandCommand(1)
  .argv;
```

### 6. Deno Support

```ts
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

### 7. Breaking Changes
- Removal of deep requires; only explicitly exported helpers are available.
- Removed `rebase` function.
- Dropped Node 8 support.

### 8. Contributing Guidelines
- Fork and clone the repository, follow coding styles, write unit tests, and adhere to the Contributor Code of Conduct.

## Supplementary Details
### Supplementary Technical Specifications

1. Installation Options:
   - Command: `npm install --save yargs`
   - No additional configuration parameters.

2. API Methods & Configuration:
   - yargs().command(cmd: string, desc: string, builder?: Function, handler?: Function)
     * Example for a command named 'hello' with a positional 'name' parameter:
       - Parameter 'name': type: string, default: 'Cambi', description: 'the name to say hello to'.
   - yargs().usage(format: string) sets the usage string.
   - yargs().help() automatically adds a help command with `--help` flag.
   - yargs().parse(args: string | string[]) processes the provided arguments.

3. Dual Module Support:
   - For ESM, use: `import yargs from 'yargs'` and `import { hideBin } from 'yargs/helpers'`.
   - For CommonJS, require yargs using: `const { argv } = require('yargs');`.

4. Deno Support (Experimental):
   - Import yargs using: `import yargs from 'https://deno.land/x/yargs/deno.ts';`
   - Use provided types via: `import { Arguments, YargsType } from 'https://deno.land/x/yargs/types.ts';`

5. Build Process (for Dual Mode Library):
   - Compile TypeScript targeting ESM; then use Rollup to create a CommonJS bundle.

6. Breaking Changes Impact:
   - Deep require paths are disabled. Users must use documented API methods.
   - Removed `rebase` method which previously wrapped `path.relative`.
   - Node 8 is no longer supported, so features are tailored for higher Node versions.

## Reference Details
### Complete API Specifications and Code Examples

#### 1. Command Registration API

Method Signature:

```ts
command(command: string, description: string, builder?: (yargs: any) => any, handler?: (argv: any) => void): any
```

**Example Usage:**

```js
// Registering a command 'hello' with a positional parameter
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs()
  .scriptName('pirate-parser')
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

#### 2. Module Imports for Dual Environment

**CommonJS Import Example:**

```js
const { argv } = require('yargs');

if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!');
} else {
  console.log('Retreat from the xupptumblers!');
}
```

**ESM Import Example:**

```js
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
    console.info(argv);
  })
  .demandCommand(1)
  .argv;
```

#### 3. Deno Specific Usage (Experimental)

```ts
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

#### 4. Configuration Options and Best Practices

- **Usage String:** Set with `.usage('$0 <cmd> [args]')` to define the command structure.
- **Help:** Always attach `.help()` to auto-generate a help menu.
- **Command Builder:** Use builder function to define positional parameters with type, default values, and description.

#### 5. Troubleshooting Procedures

- **Issue:** Command not recognized
  **Command:** Ensure usage of `.demandCommand(1)` to enforce at least one subcommand.
  **Expected Output:** Error message prompting for a valid command.

- **Issue:** Incorrect parameter types
  **Command:** Verify parameter configuration inside `.positional()` ensuring the correct `type` (e.g., 'string').
  **Expected Output:** Help message showing defaults and type info.

- **Build Errors in Dual Mode:**
  **Command:** For ESM build, run TypeScript compilation followed by Rollup bundling.
  **Expected Output:** A CommonJS bundle is generated without deep require errors.

## Original Source
Yargs Documentation
https://yargs.js.org/docs/

## Digest of YARGS_DOCS

# YARGS Documentation Digest

**Retrieved Date:** 2023-10-05

## Introduction
Yargs is a Node.js library that helps build interactive command line tools by parsing arguments and automatically generating an elegant help interface. It supports commands, grouped options, bash-completion, and more.

## Installation
To install yargs, run:

```
npm install --save yargs
```

## Getting Started
Create an `example.js` file with the following code to get started:

```js
#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs()
  .scriptName("pirate-parser")
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    });
  }, function (argv) {
    console.log('hello', argv.name, 'welcome to yargs!');
  })
  .help()
  .parse(hideBin(process.argv));
```

Run the help command:

```
$ node example.js --help
```

Expected output:

```
pirate-parser <cmd> [args]

Commands:
  pirate-parser hello [name]  welcome ter yargs!

Options:
  --help  Show help  [boolean]
```

Run the hello command:

```
$ node example.js hello --name Parrot
```

Output:

```
hello Parrot welcome to yargs!
```

## Dual Module Support (ESM and CommonJS)

### CommonJS Example:

```js
const { argv } = require('yargs');

if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!');
} else {
  console.log('Retreat from the xupptumblers!');
}
```

### ESM Example:

```js
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

```ts
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

## Significant Breaking Changes

- **Conditional Exports:** Deep file requires (e.g., `lib/utils/obj-filter.js`) are no longer supported as only explicitly defined helpers are exported.
- **Removed Methods:** The `rebase` helper method (wrapping `path.relative`) has been removed.
- **Node 8 Support Dropped.**

## Contributing Guidelines

Contributors are encouraged to:
- Fork the repository and clone the project.
- Write unit tests conforming to the standard coding style as enforced in the test suite.
- Follow the Contributor Code of Conduct which prohibits harassment and unethical behavior.

**Attribution:** Retrieved from https://yargs.js.org/docs/

**Data Size:** 348060 bytes

## Attribution
- Source: Yargs Documentation
- URL: https://yargs.js.org/docs/
- License: MIT
- Crawl Date: 2025-04-21T01:07:33.169Z
- Data Size: 348060 bytes
- Links Found: 34

## Retrieved
2025-04-21
