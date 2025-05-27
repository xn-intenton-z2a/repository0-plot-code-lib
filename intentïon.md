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

## Seed repository activity at 2025-05-27T02:43:27.939Z

When responding to a post on url , the repository was seeded with mission:



and outcome "success"

LLM API Usage:

---


## Maintain Feature at 2025-05-27T02:45:13.594Z

Activity:

Maintained feature TIME_SERIES_GENERATION with

Feature spec:

# Overview

Introduce a core command that parses a simple mathematical expression and a numeric range from CLI flags, generates a time series of data points, and writes the result as JSON to stdout or to a file. This feature covers argument parsing, expression evaluation, range expansion, and JSON serialization.

# Behavior

When invoked via the CLI with an expression and range:
- The CLI accepts --expression or -e for a formula in terms of x (e.g. y=sin(x)).
- The CLI accepts --range or -r using a syntax x=<start>:<end>:<step> (e.g. x=0:3.14:0.1).
- The range is expanded into an ordered list of x values.
- The expression is parsed and evaluated for each x to produce y values.
- The output is a JSON array of objects [{ x: number, y: number }, ...].
- By default, the JSON is printed to stdout. A --output or -o flag may specify a file path to write the JSON.

# Implementation

- Use a parsing library (e.g. mathjs) to parse and evaluate the expression in a sandboxed context.
- Expand the range string by splitting on colon and mapping to start, end, step as numbers. Ensure step > 0 and start<=end.
- Generate the series by looping from start to end inclusive in increments of step.
- Serialize the series array to JSON and either print to console or write to the specified file.
- Errors in parsing or invalid ranges should terminate with a non-zero exit code and an error message on stderr.

# CLI Interface

- repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:6.28:0.1" 
- Additional optional flag --output <path> to write JSON to file.

# Tests

- Verify expression parsing and evaluation for common functions (sin, cos, polynomial).
- Verify range string parsing, including fractional and integer steps.
- Confirm correct JSON output structure and content.
- Confirm file writing when --output is provided and stdout behavior when not.



LLM API Usage:
```json
{"prompt_tokens":4346,"completion_tokens":1205,"total_tokens":5551,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":704,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T02:46:39.495Z

Activity:

Generated issue 3133 for feature "time-series-generation" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3133

title:

Implement core TIME_SERIES_GENERATION CLI functionality

And description:

Objective:
Implement the TIME_SERIES_GENERATION feature in the CLI to parse a mathematical expression and numeric range, generate a time series of data points, and output the result as JSON to stdout or to a file.

Changes required:

1. Dependencies (package.json):
   - Add `mathjs` for safe expression parsing and evaluation.
   - Add `yargs` for robust CLI flag parsing.

2. Source (src/lib/main.js):
   - Import `yargs` and `mathjs`.
   - Define CLI options:
     • `--expression, -e` (string, required): formula in terms of `x`, e.g. `y=sin(x)` or `sin(x)`.
     • `--range, -r` (string, required): range syntax `x=<start>:<end>:<step>`, e.g. `x=0:3.14:0.1`.
     • `--output, -o` (string, optional): file path to write JSON; defaults to stdout.
   - Parse and validate:
     • Ensure range flag starts with `x=` and has three numeric parts with step>0 and start<=end.
     • Strip `y=` prefix in expression if present, and compile using `mathjs.parse(expr).compile()`.
   - Expand range into an inclusive list of `x` values.
   - Evaluate the expression for each `x` to yield `y` values.
   - Assemble an array of objects: `[{ x: number, y: number }, ...]`.
   - Serialize the array to JSON (formatted with 2-space indentation).
   - Write to the output file if `--output` is set (using `fs.writeFileSync`); otherwise print to stdout.
   - On any error (parsing, invalid range, evaluation), exit with code 1 and write a descriptive message to stderr.

3. Tests (tests/unit/plot-generation.test.js):
   - Add unit tests to:
     • Verify range parsing for integer and fractional steps (`0:0.5:2.0`).
     • Evaluate simple expressions (`y=x`, `sin(x)`, `2*x + 1`).
     • Confirm JSON structure and numeric values.
     • Confirm writing to a temporary file when `--output` is passed.
   - Use Vitest’s `spawnSync` or `execa` to invoke the CLI as a child process.

4. Documentation (USAGE.md & README.md):
   - Update `USAGE.md` with a section “Time Series Generation”:
     • Show example commands and expected JSON output.
   - In `README.md`, under a new header `## Time Series Generation`, include:
     • Installation snippet (already in package).
     • CLI example: `repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:6.28:0.1"`.
     • Note `--output` option.

Verification steps:

- Run `npm install` to pull in `mathjs` and `yargs`.
- Execute `npm test` and ensure all new and existing tests pass.
- Manual check:
  • `node src/lib/main.js -e "y=x*2" -r "x=0:2:1"` should print:
    ```json
    [ { "x": 0, "y": 0 }, { "x": 1, "y": 2 }, { "x": 2, "y": 4 } ]
    ```
  • `node src/lib/main.js -e "sin(x)" -r "x=0:3.14:1.57" -o series.json` writes the same array to `series.json`.

No other files beyond `src/lib/main.js`, `tests/unit/plot-generation.test.js`, `USAGE.md`, `README.md`, and `package.json` should be modified.

LLM API Usage:
```json
{"prompt_tokens":5296,"completion_tokens":2068,"total_tokens":7364,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1152,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Issue to enhanced Issue at 2025-05-27T02:47:32.164Z

Activity:

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:

Title: Implement Core TIME_SERIES_GENERATION CLI Functionality

Objective:
Implement the TIME_SERIES_GENERATION feature in the CLI to parse a mathematical expression and numeric range, generate a time series of data points, and output the result as JSON to stdout or to a file.

Testable Acceptance Criteria:
1. CLI Flags
   - `--expression, -e`: required string formula in terms of `x` (e.g., `y=sin(x)` or `sin(x)`).
   - `--range, -r`: required string range syntax `x=<start>:<end>:<step>` (e.g., `x=0:3.14:0.1`).
   - `--output, -o`: optional file path; when provided, JSON is written to this file; otherwise printed to stdout.

2. Validation
   - Range must start with `x=` and split into three numeric segments: start, end, and step; enforce `step > 0` and `start <= end`.
   - Expression may include an optional `y=` prefix; strip prefix and compile with `mathjs.parse(expr).compile()`.
   - Invalid range or expression should terminate with exit code 1 and a descriptive error on stderr.

3. Range Expansion
   - Expand the numeric range inclusively from start to end, incrementing by step. Example: `x=0:2:1` expands to `[0, 1, 2]`.

4. Expression Evaluation
   - Evaluate the parsed expression for each `x` value, producing corresponding numeric `y` values.

5. JSON Output
   - Assemble results into an array of objects: `[{ "x": number, "y": number }, ...]`.
   - Serialize with 2-space indentation.
   - Correctly write to file when `--output` is used, using `fs.writeFileSync`; otherwise print to stdout.
   - Process exits with code 0 on success.

6. Unit Tests (Vitest)
   - Verify integer and fractional range parsing (e.g., `0:0.5:2.0`).
   - Test expression evaluation for `y=x`, `sin(x)`, `2*x + 1` at known points.
   - Confirm JSON structure and numeric values.
   - Confirm file creation and content when `--output` is provided using a temporary file and `spawnSync` or `execa`.

7. Documentation Updates
   - USAGE.md: Add a “Time Series Generation” section with example commands and expected JSON output.
   - README.md: Add `## Time Series Generation` with installation snippet, CLI examples, and `--output` flag description.

8. Scope Constraint
   - Only modify: `src/lib/main.js`, `tests/unit/plot-generation.test.js`, `USAGE.md`, `README.md`, and `package.json`.

LLM API Usage:
```json
{"prompt_tokens":5475,"completion_tokens":1312,"total_tokens":6787,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":640,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---