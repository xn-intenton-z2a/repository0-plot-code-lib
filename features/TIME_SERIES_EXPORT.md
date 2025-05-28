# Overview

Enhance the existing CLI command to support both JSON and CSV export formats via a single, structured entrypoint. Users will generate numeric data series from a mathematical expression and range, choose their preferred export format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e: A formula in the form y=<expression> or <expression>.
  - --range, -r: A numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f: Output format, json (default) or csv.
  - --output, -o: File path to write the output; if omitted, prints to stdout.
  - --help, -h: Display usage information and exit code 0.
  - --version, -v: Display the package version and exit code 0.

On success, prints or writes the series:
- JSON mode: Pretty-printed array of { x: number, y: number }.
- CSV mode: Header x,y followed by comma-separated lines.

Validation errors (invalid expression, range format, or unsupported format) exit code 1 and print `Error: <message>` to stderr.

# Implementation

- Use yargs to configure the default command in `src/lib/main.js` with:
  - `.option('expression', { alias: 'e', demandOption: true })`
  - `.option('range', { alias: 'r', demandOption: true })`
  - `.option('format', { alias: 'f', choices: ['json','csv'], default: 'json' })`
  - `.option('output', { alias: 'o' })`
  - `.help().alias('h','help').version().alias('v','version')`
- Export a programmatic `main({ expression, range, format, output })` function:  
  1. Strip optional `y=` prefix and compile the expression via `mathjs.compile`.  
  2. Parse and validate the range string (`x=<start>:<end>:<step>`), enforce `step > 0` and `start <= end`.  
  3. Generate an inclusive series of `{ x, y }` points.  
  4. Serialize to JSON or CSV:  
     - JSON: `JSON.stringify(series, null, 2)`  
     - CSV: header `x,y` and lines `<x>,<y>` per point  
  5. Write output to file via `fs.writeFileSync` or log to stdout.  
- CLI entrypoint calls this function, catches errors, prints to stderr, and uses `process.exit(0|1)`.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON to stdout and file via `--output`.  
- CSV to stdout (`--format csv`) and file via `--output`.  
- Error on unsupported `--format xml`: exit 1, stderr informs of valid choices.  
- Error on invalid expression or invalid range: exit 1, stderr `Error: <message>`.  
- `--help` and `--version` flags: exit 0, display usage or version text.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document `--format` option and examples for JSON and CSV.  
- Update `README.md` under `## Time Series Generation` with usage snippets demonstrating JSON, CSV, file output, help, and version commands.