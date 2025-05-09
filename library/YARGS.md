# YARGS

## Crawl Summary
Stable: npm i yargs; Bleeding edge: npm i yargs@next; hideBin helper: remove node and script args; yargs(argv?): returns Argv; Argv.parse(): returns parsed Arguments object; .command(cmd,desc,builder,handler): define commands; .positional(name,{describe,default}); .option(key,{alias,type,description,default}); .parse(): execute parsing and handlers; .strictCommands(): fail on unknown commands; .demandCommand(1): require one command; TypeScript support via @types/yargs; Deno usage via remote import

## Normalised Extract
Table of Contents
1 Installation
2 hideBin helper
3 Initialization and parse
4 Command API
5 Option API
6 Parse method
7 TypeScript support
8 Deno support

1 Installation
  command: npm i yargs or npm i yargs@next

2 hideBin helper
  signature: hideBin(argv: string[]): string[]
  input: process.argv; output: args array without first two entries

3 Initialization and parse
  signature: yargs(args?: string[]): Argv
  Argv.parse(args?: string[], cb?): Arguments | void

4 Command API
  signature: .command(cmd: string, description: string, builder: (yargs: Argv) => Argv, handler: (argv: Arguments) => void): Argv
  cmd supports positional syntax <req> [opt] ...
  builder: define .positional(name, PositionalDefinition)
  handler: receives parsed argv

5 Option API
  signature: .option(key: string, opt: OptionDefinition): Argv
  OptionDefinition: { alias?: string|string[], type?: 'string'|'number'|'boolean'|'array', description?: string, default?: any, choices?: any[], demandOption?: boolean|string, coerce?: (arg: any) => any }

6 Parse method
  signature: .parse(args?: string[], context?: any, cb?: (err?: Error, argv?: Arguments, output?: string) => void): Arguments | void

7 TypeScript support
  install: npm i @types/yargs --save-dev
  definitions at @types/yargs

8 Deno support
  import yargs from 'https://deno.land/x/yargs@<version>-deno/deno.ts'
  import { Arguments } from 'https://deno.land/x/yargs@<version>-deno/deno-types.ts'
  usage: yargs(Deno.args).strictCommands().demandCommand(1).parse()

## Supplementary Details
Installation and Setup:
1. npm i yargs
2. For TypeScript, npm i @types/yargs --save-dev

Implementation Steps:
1. import yargs and hideBin
2. initialize parser: const parser = yargs(hideBin(process.argv))
3. define commands via .command()
4. define global options via .option()
5. call .parse() at the end to execute parsing and invoke handlers

Command Builder:
- return yargs instance from builder
- define positional args: .positional(name, { describe: string, default?: any, type?: 'string'|'number'|'boolean' })

Core Configuration Options:
- alias: string or string[]
- type: 'string'|'number'|'boolean'|'array'
- description: string
- default: any
- choices: any[]
- demandOption: boolean|string
- coerce: (arg: any) => any

Best Practices:
- Always return builder instance
- Call .parse() only once at the end
- Use .strictCommands() and .demandCommand() for strict command enforcement

Error Handling and Debug:
- Unknown command: enable .strictCommands() to throw an error and display help
- Missing required command: .demandCommand(1) to enforce at least one command


## Reference Details
API Specifications:

hideBin(argv: string[]): string[]
  input: full process.argv array
  output: argument array without first two entries

function yargs(args?: string[] | { _: any[]; $0: string }): Argv
  returns a new Argv instance

interface Argv<T = any> {
  command(cmd: string,
          description: string,
          builder: (yargs: Argv) => Argv,
          handler: (args: Arguments<T>) => void): Argv<T>

  option(key: string,
         opt: { alias?: string|string[]; type?: 'string'|'number'|'boolean'|'array'; description?: string; default?: any; choices?: any[]; demandOption?: boolean|string; coerce?: (arg: any) => any }): Argv<T>

  positional(name: string,
             spec: { describe: string; default?: any; type?: 'string'|'number'|'boolean'|'array'; choices?: any[] }): Argv<T>

  strictCommands(): Argv<T>

  demandCommand(min: number, max?: number, minMsg?: string, maxMsg?: string): Argv<T>

  parse(args?: string[],
        context?: any,
        cb?: (err?: Error, argv?: Arguments<T>, output?: string) => void): Arguments<T> | void

  help(opt?: { alias?: string|string[]; description?: string; global?: boolean }): Argv<T>

  version(opt?: { version?: string; alias?: string|string[]; description?: string; global?: boolean }): Argv<T>
}

Example: Simple CLI
```
#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .option('ships', { alias: 's', type: 'number', demandOption: true, description: 'number of ships' })
  .option('distance', { type: 'number', demandOption: true, description: 'distance to travel' })
  .parse()
```

Example: Server Command
```
#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command('serve [port]', 'start the server', (y) =>
    y.positional('port', { describe: 'port to bind on', default: 5000 })
  , (argv) => {
    if (argv.verbose) console.info(`listening on :${argv.port}`)
    serve(argv.port)
  })
  .option('verbose', { alias: 'v', type: 'boolean', default: false, description: 'verbose output' })
  .strictCommands()
  .demandCommand(1,1)
  .parse()
```

Troubleshooting:
1. Unknown command
   Command: node app.js foo
   Behavior: with .strictCommands() outputs 'Unknown command: foo' and exit code 1
2. Missing required command
   Use .demandCommand(1) to enforce at least one command; missing yields error and help
3. No parse invoked
   Issue: handlers not executed; ensure .parse() is called at end


## Information Dense Extract
npm i yargs | npm i yargs@next; import yargs from 'yargs', hideBin from 'yargs/helpers';
yargs(hideBin(process.argv)) returns Argv; Argv.parse(): Arguments; 
.command(cmd: string,desc:string,builder:(Argv)=>Argv,handler:(Arguments)=>void);
.option(key, { alias, type, description, default, choices, demandOption, coerce });
.positional(name, { describe, default, type, choices });
.strictCommands(); .demandCommand(1); .help(); .version(); .parse();
TypeScript: npm i @types/yargs; Deno: import from 'deno.land/x/yargs@vX-deno';
Example patterns: simple CLI, server command; Troubleshoot with strictCommands and demandCommand enforcement.

## Sanitised Extract
Table of Contents
1 Installation
2 hideBin helper
3 Initialization and parse
4 Command API
5 Option API
6 Parse method
7 TypeScript support
8 Deno support

1 Installation
  command: npm i yargs or npm i yargs@next

2 hideBin helper
  signature: hideBin(argv: string[]): string[]
  input: process.argv; output: args array without first two entries

3 Initialization and parse
  signature: yargs(args?: string[]): Argv
  Argv.parse(args?: string[], cb?): Arguments | void

4 Command API
  signature: .command(cmd: string, description: string, builder: (yargs: Argv) => Argv, handler: (argv: Arguments) => void): Argv
  cmd supports positional syntax <req> [opt] ...
  builder: define .positional(name, PositionalDefinition)
  handler: receives parsed argv

5 Option API
  signature: .option(key: string, opt: OptionDefinition): Argv
  OptionDefinition: { alias?: string|string[], type?: 'string'|'number'|'boolean'|'array', description?: string, default?: any, choices?: any[], demandOption?: boolean|string, coerce?: (arg: any) => any }

6 Parse method
  signature: .parse(args?: string[], context?: any, cb?: (err?: Error, argv?: Arguments, output?: string) => void): Arguments | void

7 TypeScript support
  install: npm i @types/yargs --save-dev
  definitions at @types/yargs

8 Deno support
  import yargs from 'https://deno.land/x/yargs@<version>-deno/deno.ts'
  import { Arguments } from 'https://deno.land/x/yargs@<version>-deno/deno-types.ts'
  usage: yargs(Deno.args).strictCommands().demandCommand(1).parse()

## Original Source
Yargs Command-Line Parser Guide
https://github.com/yargs/yargs#readme

## Digest of YARGS

# Yargs Command-Line Parser Digest
Retrieved: 2024-06-19
Data Size: 581535 bytes

# Installation
Stable version:
npm i yargs
Bleeding edge version:
npm i yargs@next

# Simple Usage Example
#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
const argv = yargs(hideBin(process.argv)).parse()
if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!')
} else {
  console.log('Retreat from the xupptumblers!')
}

# Complex Usage Example
#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
yargs(hideBin(process.argv))
  .command('serve [port]', 'start the server', (yargs) => {
    return yargs.positional('port', { describe: 'port to bind on', default: 5000 })
  }, (argv) => {
    if (argv.verbose) console.info(`start server on :${argv.port}`)
    serve(argv.port)
  })
  .option('verbose', { alias: 'v', type: 'boolean', description: 'Run with verbose logging' })
  .parse()

# Supported Platforms
TypeScript: npm i @types/yargs --save-dev
Deno (v16+): import yargs from 'https://deno.land/x/yargs@v17.7.2-deno/deno.ts'
import { Arguments } from 'https://deno.land/x/yargs@v17.7.2-deno/deno-types.ts'
Browser: see documentation at yargs.js.org

## Attribution
- Source: Yargs Command-Line Parser Guide
- URL: https://github.com/yargs/yargs#readme
- License: License: MIT
- Crawl Date: 2025-05-09T03:35:53.574Z
- Data Size: 581535 bytes
- Links Found: 5026

## Retrieved
2025-05-09
