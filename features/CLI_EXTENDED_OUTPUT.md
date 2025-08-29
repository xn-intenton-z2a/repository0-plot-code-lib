# Overview

Enhance the existing time series generation CLI to provide structured, discoverable parsing with yargs and support both JSON and CSV export formats. Users can generate numeric series from a mathematical expression and a range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the default command:
- Required flags:
  - --expression, -e: Formula in form y=<expression> or <expression>.
  - --range, -r: Numeric range in form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f: Output format `json` (default) or `csv`.
  - --output, -o: Path to write output; if omitted, prints to stdout.
  - --help, -h: Display usage information and exit code 0.
  - --version, -v: Display the package version and exit code 0.

On execution:
1. Strip optional `y=` prefix and compile the expression using mathjs; invalid expressions exit code 1 with `Error: Invalid expression`.
2. Parse and validate the range string `x=<start>:<end>:<step>` enforcing `step > 0` and `start <= end`; invalid ranges exit code 1 with `Error: Invalid range`.
3. Generate an inclusive series of `{ x, y }` points stepping by the specified value.
4. Serialize the series:
   - JSON: `JSON.stringify(series, null, 2)`.
   - CSV: header `x,y` followed by comma-separated rows.
5. Write to the specified file via `fs.writeFileSync` or print to stdout if omitted; on write errors, exit code 1 with `Error: <message>`.
6. Exit code 0 on success.

# Implementation

- Add dependencies in `package.json`:
  - `yargs` for CLI parsing.
  - `mathjs` for expression compilation.
- In `src/lib/main.js`:
  - Configure yargs with required `--expression`, `--range`, optional `--format`, `--output`, and built-in `.help()` and `.version()` flags.
  - Export programmatic `main({expression, range, format, output})` that returns the data array or throws on invalid input:
    1. Strip `y=` prefix and compile the expression via `mathjs.compile`.
    2. Parse and validate the range string.
    3. Generate an inclusive series of `{ x, y }` points.
    4. Serialize to JSON or CSV.
    5. Write to the specified file or stdout.
  - CLI entrypoint invokes `main()`, catches exceptions, prints `Error: <message>` to stderr, and uses `process.exit(0|1)`.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON stdout and JSON file output via `--output`.
- CSV stdout with `--format csv` and CSV file output via `--output`.
- Unsupported format exit code 1 with choices message.
- Invalid expression or range exit code 1 with descriptive error.
- `--help` and `--version` exit code 0 with expected output.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document `--format` option and show JSON and CSV examples.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version.