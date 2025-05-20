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
2025-05-20T01:34:48Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-20T01-34Z

## Maintain Feature at 2025-05-20T01:35:10.176Z

Maintained feature TIME_SERIES_GENERATION.

Feature spec:

# Overview

Generate a numerical time series from a mathematical expression and value range directly via the CLI, producing a JSON array of (x, y) pairs.

# CLI Interface

- --expression <expr>
  Required. A mathematical expression in the form y = <function of x>.
- --range <var>=<start>:<end>
  Required. Specifies the variable name, start value, and end value.
- --points <number>
  Optional. Number of sample points to compute. Defaults to 100.

# Behavior

1. Parse and validate CLI arguments.
2. Generate an array of evenly spaced values between start and end.
3. Evaluate the expression at each sample value.
4. Output a JSON-formatted array of objects with keys x and y to stdout.

# Implementation Details

- Use mathjs to parse and evaluate the expression safely.
- Use zod to validate and coerce CLI inputs.
- All logic lives in src/lib/main.js. 
- Ensure the CLI prints errors and exits with non-zero codes on invalid input.

# Testing

- Extend tests in tests/unit/plot-generation.test.js to cover:
  • Correct number of points.
  • Accurate results for known functions (e.g., sin, linear).
  • Error handling on missing or malformed flags.

# Documentation

- Update README.md and USAGE.md with usage examples and sample output.

Git diff:

```diff
\n\n// New [features/TIME_SERIES_GENERATION.md]:\n# Overview

Generate a numerical time series from a mathematical expression and value range directly via the CLI, producing a JSON array of (x, y) pairs.

# CLI Interface

- --expression <expr>
  Required. A mathematical expression in the form y = <function of x>.
- --range <var>=<start>:<end>
  Required. Specifies the variable name, start value, and end value.
- --points <number>
  Optional. Number of sample points to compute. Defaults to 100.

# Behavior

1. Parse and validate CLI arguments.
2. Generate an array of evenly spaced values between start and end.
3. Evaluate the expression at each sample value.
4. Output a JSON-formatted array of objects with keys x and y to stdout.

# Implementation Details

- Use mathjs to parse and evaluate the expression safely.
- Use zod to validate and coerce CLI inputs.
- All logic lives in src/lib/main.js. 
- Ensure the CLI prints errors and exits with non-zero codes on invalid input.

# Testing

- Extend tests in tests/unit/plot-generation.test.js to cover:
  • Correct number of points.
  • Accurate results for known functions (e.g., sin, linear).
  • Error handling on missing or malformed flags.

# Documentation

- Update README.md and USAGE.md with usage examples and sample output.
```

LLM API Usage:

```json
{"prompt_tokens":3962,"completion_tokens":1951,"total_tokens":5913,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1600,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

## Feature to Issue at 2025-05-20T01:36:19.245Z

Generated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3112 with title:

Implement TIME_SERIES_GENERATION CLI: generate JSON time series from expression

And description:

This issue will fully realize the TIME_SERIES_GENERATION feature by extending the CLI to parse a mathematical expression and a value range, generate evenly spaced sample points, evaluate the expression at each point, and emit a JSON array of {x, y} objects. It includes updates to source code, tests, documentation (README.md and USAGE.md), and package.json dependencies.\n\nScope of work:\n1. src/lib/main.js:\n   - Add CLI argument parsing (using minimist).\n   - Validate --expression, --range, and optional --points flags with zod.\n   - Generate an array of `points` evenly spaced values between the specified start and end of the range.\n   - Use mathjs to parse and safely evaluate the expression at each x value.\n   - Print a JSON-formatted array of objects [{ x: number, y: number }, ...] to stdout.\n   - Exit with code >0 and a user-friendly error message on missing or malformed flags.\n\n2. package.json:\n   - Add `mathjs` and `minimist` to dependencies.\n   - Ensure the CLI entry point remains `src/lib/main.js`.\n\n3. tests/unit/plot-generation.test.js:\n   - Write unit tests for TIME_SERIES_GENERATION logic:\n     • Given a linear expression (e.g., `y=x`) and known range, confirm correct number of output points and values.\n     • Test a trigonometric function (e.g., `y=sin(x)`) over a small range with a fixed point count and assert expected JSON values.\n     • Validate error handling for missing or malformed flags.\n   - Stub or capture console.log to verify JSON shape and exit codes.\n\n4. Documentation (README.md & USAGE.md):\n   - Add a `TIME_SERIES_GENERATION` section to README with CLI synopsis and usage examples.\n   - In USAGE.md, include sample commands and outputs demonstrating JSON output for a simple expression.\n\nVerification steps after implementation:\n- Run `npm install`; confirm `mathjs` and `minimist` are added.\n- Execute `npm test` and verify all new and existing tests pass.\n- Try sample commands, e.g.:\n  ```bash\n  repo0-plot-code-lib --expression "y=sin(x)" --range "x=0:3.1416" --points 5\n  ```\n  and confirm JSON array of 5 x/y pairs is printed.\n\nThis change directly completes the core functionality of TIME_SERIES_GENERATION and ensures users can generate raw time series data from CLI formula inputs. A single LLM invocation should produce the complete updated source, tests, dependencies, and docs in one response.

LLM API Usage:

```json
{"prompt_tokens":4568,"completion_tokens":1478,"total_tokens":6046,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":832,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

## Issue to enhanced Issue at 2025-05-20T01:37:00.726Z

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/ with enhanced description:

This issue will fully implement the TIME_SERIES_GENERATION CLI feature, enabling users to generate a JSON-formatted time series from a mathematical expression and numeric range.

Scope of Work:
1. CLI Argument Parsing and Validation
   - Parse --expression (required, format `y=<function of x>`), --range (required, format `<var>=<start>:<end>`), and --points (optional, integer > 1, default 100).
   - Validate inputs using zod: ensure expression is non-empty, range has valid start/end numbers, and points is a positive integer.
   - On validation failure or missing flags, output a clear error message to stderr and exit with code > 0.

2. Time Series Generation
   - Generate an array of `points` evenly spaced x values between start and end (inclusive).
   - Use mathjs to safely parse and evaluate the expression at each x value.
   - Collect results into an array of objects: `[{ x: number, y: number }, ...]`.
   - Output the JSON array to stdout.

3. Tests (tests/unit/plot-generation.test.js)
   - Accept valid inputs and produce the correct number of points and expected y values for known functions:
     • Linear (e.g., `y=x` over range 0:10 with 11 points yields x and y arrays that match exactly).
     • Trigonometric (e.g., `y=sin(x)` over 0:π with 5 points yields y values approximating [0, 0.707, 1, 0.707, 0]).
   - Capture stdout and exit code for valid runs (exit code 0) and error runs (exit code > 0).
   - Verify JSON structure: array length matches `points`, each element has numeric `x` and `y` properties.

4. Documentation Updates
   - README.md: Add a **TIME_SERIES_GENERATION** section with CLI synopsis, example commands, and sample JSON output.
   - USAGE.md: Provide detailed usage examples showing both successful runs and error cases.

Acceptance Criteria:
- [ ] `npm install` includes `mathjs` and `minimist` in dependencies without affecting existing ones.
- [ ] Running `repo0-plot-code-lib --expression "y=x" --range "x=0:10" --points 11` prints a JSON array of 11 points with `y` equal to `x`.
- [ ] Running `repo0-plot-code-lib --expression "y=sin(x)" --range "x=0:3.1416" --points 5` prints a JSON array approximating sine values at the 5 sampled points.
- [ ] Invalid or missing flags produce a descriptive error message and exit code > 0.
- [ ] All new and existing tests pass via `npm test`.
- [ ] README.md and USAGE.md reflect the new CLI feature and usage examples.

This completes the TIME_SERIES_GENERATION core functionality and ensures measurable, testable user value by allowing formula-based time series output via the CLI.

LLM API Usage:

```json
{"prompt_tokens":5101,"completion_tokens":981,"total_tokens":6082,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":256,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

