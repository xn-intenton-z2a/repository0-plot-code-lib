YARGS

NORMALISED EXTRACT

Table of contents
- Overview
- Install and import
- Core API and common methods
- Building CLI for the plot tool (options and examples)
- Parsing behavior and return value

Overview
- yargs is a feature-rich command-line arguments parser for Node.js. It supports typed options, aliases, commands, generated help text, and middleware. Use it when the CLI needs richer behaviour than minimist.

Install and import
- Install: npm install yargs
- ES module usage: import yargs from 'yargs'; import { hideBin } from 'yargs/helpers'
- CommonJS: const yargs = require('yargs')

Core API and common methods (practical)
- yargs() -> returns a YargsInstance
- .option(name, opts) -> YargsInstance
  - opts.type: 'string' | 'number' | 'boolean'
  - opts.alias: string | string[]
  - opts.describe: string
  - opts.demandOption: boolean
  - opts.default: any
  - opts.coerce: function(value) -> transformedValue
- .command(cmd, desc, builder?, handler?) -> registers a command
- .help() -> adds automatic help generation
- .parse(argv?) -> returns parsed argv object (or use .argv getter)

Building a CLI for this project (recommended options)
- expression: option 'expression' (alias 'e'), type 'string', describe 'mathematical expression y=...' ; demandOption false
- range: option 'range' (alias 'r'), type 'string', describe 'start:step:end'
- csv: option 'csv' (alias 'c'), type 'string', describe 'input CSV file path'
- file: option 'file' (alias 'f'), type 'string', describe 'output file path (.svg or .png)'
- help: yargs().help()

Parsing behaviour and return value
- .parse returns a plain object with keys for each option; numeric values are parsed when type: 'number' is set; otherwise values are strings. Unknown options are included unless strict parsing is enabled with .strict().
- Example (conceptual): const argv = yargs(hideBin(process.argv)).option('expression', {type:'string'}).parse()

SUPPLEMENTARY DETAILS
- yargs supports command-specific builders and nested subcommands; for this project a single-command flat option layout is sufficient.
- Use coerce to parse the range string into a normalized object {start, step, end} during parsing so downstream code receives a ready numeric range.

REFERENCE DETAILS
- yargs().option(name: string, opts: object) -> YargsInstance
- yargs().command(cmd: string, desc: string, builder?: object|function, handler?: function) -> YargsInstance
- yargs().parse(argv?: string[]) -> object (parsed argv)

DETAILED DIGEST
- Source: https://yargs.js.org/
- Retrieval date: 2026-03-20
- Bytes downloaded during crawl: 6176 bytes
- Extracted technical points: option definitions, parse return semantics, helpers hideBin, and recommended coerce usage for parsing custom range strings.

ATTRIBUTION
- Original source: yargs documentation site
- Retrieved: 2026-03-20
