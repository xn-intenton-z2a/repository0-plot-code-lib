NORMALISED EXTRACT

Purpose: concise implementer-facing extract of minimist argument parser usage and options.

TABLE OF CONTENTS
- Core usage and return shape
- Options object (alias, boolean, string, default)
- Positional args handling and '--' behaviour
- Example patterns

1) Core usage and return shape
- Call: argv = minimist(argsArray, opts) where argsArray is typically process.argv.slice(2).
- Returned object contains parsed flags as named properties and positional arguments in the '_' array: argv._.

2) Options object
- alias: { short: 'long' } maps short to long names.
- boolean: array or object listing flags that are booleans.
- string: list of flags that are strings.
- default: object of default values for flags.
- Unknown flags are returned as properties on the object; minimist does not throw for unknown flags.

3) Positional args and '--'
- Arguments after a standalone "--" are not parsed as flags and are placed into argv._ unchanged.

4) Example pattern
- var argv = require('minimist')(process.argv.slice(2), { alias: { h: 'help' }, boolean: ['help'], string: ['file','expression'], default: { file: 'out.svg' } });
- Result: argv.help boolean, argv.file string, argv.expression string, argv._ positional array.

SUPPLEMENTARY DETAILS
- Minimally invasive: no external runtime side effects; simple dependency for CLI convenience. For small CLIs, built-in process.argv parsing is also viable.

REFERENCE DETAILS
- Function signature: minimist(args: string[], opts?: Object) => Object.
- Common opts fields: alias, boolean, string, default.

DETAILED DIGEST
- Source: minimist README via unpkg (raw), retrieved 2026-03-20.
- Retrieved bytes: 3609 bytes.

ATTRIBUTION
- URL: https://unpkg.com/minimist@1.2.8/README.md (mirror of upstream README)
- Retrieved: 2026-03-20
- Bytes crawled: 3609
