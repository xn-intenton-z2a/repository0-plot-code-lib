# Mission Statement

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

**plot-code-lib** is a JavaScript library and CLI tool designed to:
- Transform and given range and a simple expression syntax for (pick an existing open standard) to time series data.
- Read and write the time series data in a standard format (pick an existing open standard).
- Make use of libraries for formula parsing, time series generation, plotting, and persistence in image formats.
- Generate SVG and PNG plots from the time series data and save these as files.
- Variations on this example: `node run start -- --expression "y=sin(x)" --range "x=-1:-1,y=-1:-1" --file output.svg` .
- Showcase all the features of the library via a CLI by dry running tp generate example commands and output in the README.md file.

`plot-code-lib` facilitate the creation of plots from mathematical expressions and time series data. It will take a
mathematical expression and a range of values and generate a plot in SVG or PNG format.
## Maintain Feature at 2025-05-22T00:57:42.174Z

Maintained feature TIME_SERIES_GENERATION.

Feature spec:

# Overview
Generates time series data points from a mathematical expression over a specified one-dimensional range. Provides core functionality for sampling expressions and producing structured data suitable for plotting or further analysis.
# CLI Parameters
--expression   Simple formula using x as the independent variable, for example y=sin(x)
--range        Sampling range in the form x=start:end:step where start, end and step are numeric values
--format       Output format, one of json or csv, default json
--file         Optional path to write the output; if omitted, data is printed to stdout
# Output
A sequence of sample points. In json format an array of objects with fields x and y. In csv format a header row x,y followed by numeric pairs.
# Error Handling
Validates both expression syntax and range parameters. On invalid input prints a descriptive message and exits with a non-zero code.
# Examples
node run start -- --expression "y=sin(x)" --range "x=0:6.28:0.1" --format csv --file data.csv

Git diff:

```diff
\n\n// New [features/TIME_SERIES_GENERATION.md]:\n# Overview
Generates time series data points from a mathematical expression over a specified one-dimensional range. Provides core functionality for sampling expressions and producing structured data suitable for plotting or further analysis.
# CLI Parameters
--expression   Simple formula using x as the independent variable, for example y=sin(x)
--range        Sampling range in the form x=start:end:step where start, end and step are numeric values
--format       Output format, one of json or csv, default json
--file         Optional path to write the output; if omitted, data is printed to stdout
# Output
A sequence of sample points. In json format an array of objects with fields x and y. In csv format a header row x,y followed by numeric pairs.
# Error Handling
Validates both expression syntax and range parameters. On invalid input prints a descriptive message and exits with a non-zero code.
# Examples
node run start -- --expression "y=sin(x)" --range "x=0:6.28:0.1" --format csv --file data.csv
```

LLM API Usage:

```json
{"prompt_tokens":4297,"completion_tokens":1862,"total_tokens":6159,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1600,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

## Feature to Issue at 2025-05-22T00:58:56.505Z

Generated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3116 with title:

Implement TIME_SERIES_GENERATION CLI: parse expressions, sample range, and format output

And description:

Objective

Fully implement the TIME_SERIES_GENERATION feature in `src/lib/main.js`, enabling users to generate time series data from a mathematical expression over a specified one-dimensional range, and output it in JSON or CSV format to stdout or a file.

Tasks

1. Add `mathjs` (or equivalent) to dependencies in `package.json`.

2. Update `src/lib/main.js`:
   - Use a CLI argument parser (e.g., `minimist`) to support:
     • `--expression` (required): formula like `y=sin(x)`
     • `--range` (required): in form `x=start:end:step`
     • `--format` (optional): `json` or `csv` (default `json`)
     • `--file` (optional): output file path; if omitted, print to stdout
   - Parse and validate the input:
     • Validate that expression matches `y=<math>` and can be compiled by `mathjs`.
     • Parse `start`, `end`, and `step` as numbers; ensure `step > 0` and `start <= end`.
     • Validate `format` is either `json` or `csv`.
   - Generate sample points from `start` to `end` inclusive, stepping by `step`:
     • For each `x` value compute `y` using the compiled expression.
     • Collect points as objects `{ x: Number, y: Number }`.
   - Format output:
     • JSON: print `JSON.stringify(array, null, 2)`.
     • CSV: print header `x,y` then rows `x,y`.
   - If `--file` is provided, write output to the specified file; otherwise, write to stdout.
   - On any validation or runtime error, print an error message to stderr and call `process.exit(1)`.

3. Extend `tests/unit/plot-generation.test.js`:
   - Test successful JSON output for a simple formula and range by capturing stdout.
   - Test CSV output by specifying `--format csv` and verifying header and rows.
   - Test file writing by mocking or writing to a temporary file and reading its contents.
   - Test invalid inputs (malformed expression, bad range, unsupported format) exit with code `1` and error message.

4. Update `README.md`:
   - Add a new "CLI Usage" section that describes the `--expression`, `--range`, `--format`, and `--file` flags.
   - Provide two concrete examples (one JSON, one CSV) showing commands and expected output.

Verification

- Run `npm install` to include `mathjs`.
- Execute `npm test` and confirm all new and existing tests pass.
- Manually test the CLI:
  • `node src/lib/main.js --expression "y=sin(x)" --range "x=0:3.14:1"` should print JSON array to stdout.
  • `node src/lib/main.js --expression "y=2*x" --range "x=0:5:2" --format csv --file data.csv` should create `data.csv` with header and rows.

This single LLM invocation should update the source, tests, `README.md`, and `package.json` to deliver full TIME_SERIES_GENERATION functionality.

LLM API Usage:

```json
{"prompt_tokens":5408,"completion_tokens":1483,"total_tokens":6891,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":704,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

## Issue to enhanced Issue at 2025-05-22T00:59:52.687Z

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:

Title: Implement TIME_SERIES_GENERATION CLI: parse expressions, sample range, and format output

### Objective

Fully implement the TIME_SERIES_GENERATION feature in `src/lib/main.js`, enabling users to generate time series data from a mathematical expression over a specified one-dimensional range and output it in JSON or CSV format to stdout or a file.

### Acceptance Criteria (Testable)

1. Argument Parsing:
   - `--expression` is required and must follow the pattern `y=<math>`.
   - `--range` is required in the form `x=start:end:step` where `start`, `end`, and `step` are numbers.
   - `--format` is optional; valid values are `json` (default) or `csv`.
   - `--file` is optional; if provided, output is written to the given filepath.
   - Invalid or missing required flags should cause the CLI to print a descriptive error to stderr and exit with code `1`.

2. Expression Validation & Compilation:
   - The expression after `y=` must compile successfully with `mathjs` (or equivalent).
   - Test case: `--expression "y=sin(x)"` compiles without errors.

3. Range Parsing & Validation:
   - `start`, `end`, and `step` are parsed as numbers.
   - `step > 0` and `start <= end`; violations cause exit code `1` with error.
   - Test case: `--range "x=0:10:2"` produces x values [0,2,4,6,8,10].

4. Data Generation:
   - Sample x values from `start` to `end` inclusive by `step`.
   - Compute y for each x using the compiled expression.
   - Result is an array of objects: `{ x: Number, y: Number }`.

5. Output Formatting:
   - JSON mode: prints pretty-printed JSON via `JSON.stringify(data, null, 2)`.
   - CSV mode: prints header `x,y` and rows of numeric values.
   - Test case: running with `--format csv` produces a header and correct rows.

6. File Writing:
   - If `--file path/to/output` is specified, write the formatted output to the file.
   - On success, exit with code `0`. If writing fails, print error and exit with code `1`.
   - Test case: mock or use a temporary file and verify the contents match expected JSON/CSV output.

7. Error Handling & Exit Codes:
   - On any validation or runtime error (parsing, compilation, file I/O), print an error message to stderr and exit with code `1`.
   - All success flows exit with code `0`.

### Testing Tasks

- Extend `tests/unit/plot-generation.test.js` to cover:
  - Successful JSON output with sample expression and range.
  - Successful CSV output with tests for header and row content.
  - File writing behavior (using temp file mocks or stubs).
  - Error cases: missing flags, malformed expression, invalid range, unsupported format.

### Documentation Tasks

- Update `README.md`:
  - Add a "CLI Usage" section documenting `--expression`, `--range`, `--format`, and `--file` flags.
  - Provide two concrete examples (one JSON, one CSV) showing commands and expected output.

### Verification

- Install dependencies (`npm install mathjs minimist`).
- Run tests (`npm test`) and ensure all tests (new and existing) pass.
- Manually verify:
  - `node src/lib/main.js --expression "y=sin(x)" --range "x=0:3.14:1"` prints JSON.
  - `node src/lib/main.js --expression "y=2*x" --range "x=0:5:2" --format csv --file data.csv` creates `data.csv` with correct content.


LLM API Usage:

```json
{"prompt_tokens":5146,"completion_tokens":1259,"total_tokens":6405,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":320,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

