# Overview

Extend the core time series generation CLI to support both JSON and CSV export formats via a single structured entrypoint. Users can generate numeric series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

- Required flags:
  - `--expression, -e`: Formula in the form y=<expression> or <expression>.
  - `--range, -r`: Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - `--format, -f`: Output format, json (default) or csv.
  - `--output, -o`: Path to write the output; if omitted, prints to stdout.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display the package version and exit code 0.

On invocation:
1. Strip optional y= prefix and compile the expression via mathjs; invalid expressions exit code 1 with “Error: Invalid expression.”
2. Parse and validate the range string in the form x=start:end:step, enforce step > 0 and start ≤ end; invalid ranges exit code 1 with “Error: Invalid range.”
3. Generate an inclusive series of objects `{ x: number, y: number }` by stepping from start to end.
4. Serialize:
   - JSON: `JSON.stringify(series, null, 2)`.
   - CSV: header `x,y` followed by comma-separated rows of each point.
5. Write to the specified file via fs.writeFileSync or print to stdout.
6. Exit code 0 on success; code 1 on failure.

# Implementation

- Add dependencies in package.json: `yargs` for CLI parsing and `mathjs` for expression evaluation.
- In `src/lib/main.js`: 
  - Configure yargs with required options (`expression`, `range`), optional (`format`, `output`), and built-in `.help()` and `.version()`.
  - Export programmatic `main({ expression, range, format, output })` that returns the data array or throws:
    1. Strip `y=` prefix and compile expression via mathjs.compile.
    2. Parse and validate range string.
    3. Generate series points.
    4. Serialize to JSON or CSV.
    5. Write to file or stdout.
  - CLI entrypoint calls `main()`, catches exceptions, prints `Error: <message>` to stderr, and uses `process.exit(0|1)`.

# Tests

Extend tests in `tests/unit/plot-generation.test.js` to verify:
- Default JSON stdout and file output.
- CSV stdout and file output.
- Error on unsupported formats.
- Error on invalid expression and range.
- Help and version flags exit code 0 and display expected output.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document `--format` option with examples for JSON and CSV.
- Update `README.md` under `## Time Series Generation` with usage snippets demonstrating JSON, CSV, file output, help, and version commands.