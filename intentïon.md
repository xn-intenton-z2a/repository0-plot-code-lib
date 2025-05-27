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

## Seed repository activity at 2025-05-27T02:25:06.621Z

When responding to a post on url , the repository was seeded with mission:



and outcome "success"

LLM API Usage:

---


## Maintain Feature at 2025-05-27T02:26:56.094Z

Activity:

Maintained feature TIME_SERIES_GENERATION with

Feature spec:

# Time Series Generation

## Overview
Add a core capability to convert a mathematical expression into numeric time series data over a specified variable range.

## CLI Interface
Users supply the following flags to the main command:

- `--expression`  a formula in terms of x, for example y=sin(x)
- `--range`       a variable range using syntax x=start:end:count, for example x=0:10:100
- `--output`      path to an output file where the series will be saved; if omitted, output is written to stdout in JSON format

Example invocation:
    node src/lib/main.js --expression y=sin(x) --range x=0:6.28:100 --output series.json

## Behavior
1. Parse and validate the expression argument, extracting the right hand side function of x.
2. Parse the range argument to derive numeric values for start, end, and count.
3. Generate an array of x values evenly spaced between start and end with the given count.
4. Evaluate the expression for each x using the expr-eval parser to produce corresponding y values.
5. Assemble the results into an array of objects with shape { x: number, y: number }.
6. Serialize the array to JSON and write it to the specified output file or to stdout if no file is provided.
7. Exit with an error and a nonzero status if required flags are missing or invalid.

## Implementation Details
- Modify src/lib/main.js to import Parser from expr-eval and minimist for argument parsing.
- Use zod to validate the parsed flags against a schema ensuring expression is a nonempty string, range follows expected pattern, and output is an optional string.
- Write file system output using the built-in fs module.

## Tests
- Extend tests/unit/plot-generation.test.js with cases covering:
  - Valid expression and range yielding expected numeric series of the correct length and value at known points.
  - Missing flags producing a nonzero exit code and an error message.
  - Output to stdout when no output file is specified.

## Dependencies
- Add `expr-eval` for parsing and evaluating mathematical expressions.
- Add `minimist` for simple CLI argument parsing if not already present.


LLM API Usage:
```json
{"prompt_tokens":4346,"completion_tokens":1804,"total_tokens":6150,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1280,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---
## Feature to Issue at 2025-05-27T02:28:01.746Z

Activity:

Generated issue 3132 for feature "time-series-generation" with URL https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3132

title:

Implement TIME_SERIES_GENERATION CLI flags, parsing, validation, and JSON output

And description:

We need to add the core TIME_SERIES_GENERATION capability to our CLI, allowing users to supply `--expression`, `--range`, and optional `--output` flags to generate numeric time series data from a mathematical formula.

Changes to make in a single LLM invocation:

1. **src/lib/main.js**
   - Import `minimist` for CLI argument parsing and `Parser` from `expr-eval` for expression evaluation.
   - Use `zod` to validate the parsed flags against a schema that enforces:
     - `expression`: non-empty string matching `y=<rhs>`.
     - `range`: string matching `x=start:end:count`, where start, end, and count are numbers (count an integer ≥2).
     - `output`: optional string.
   - Parse the range into numeric `start`, `end`, and `count`, then generate an array of `x` values evenly spaced over the range.
   - Evaluate the expression RHS for each `x` value to produce `y` values.
   - Assemble an array of objects `{ x: number, y: number }`, serialize to JSON, and write to the provided `--output` file or stdout if omitted.
   - On missing or invalid flags, print an error to stderr and exit with a non-zero status code.

2. **package.json**
   - Add dependencies:
     ```json
     "expr-eval": "^2.0.2",
     "minimist": "^1.2.8"
     ```

3. **tests/unit/plot-generation.test.js**
   - Add unit tests covering:
     - Valid full invocation (mock `process.argv`) with a simple expression (e.g., `y=2*x`) and range (e.g., `x=0:4:5`), verifying JSON output length, first and last entries.
     - Invocation without `--output` writing to stdout (capture stdout stream) and verifying JSON content.
     - Invocation missing required flags or with invalid range format, expecting process exit with code `1` and an error message on stderr.

4. **USAGE.md**
   - Document the CLI usage under a new "Time Series Generation" section with the full example:
     ```bash
     node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28:100" --output series.json
     ```
   - Show JSON schema of the output.

5. **README.md**
   - Add a "CLI Usage" section summarizing the new flags and linking to USAGE.md for details.

**How to verify**:
- Run `npm test` and ensure all new tests pass.
- Manually invoke the CLI in the integration style:
  ```bash
  node src/lib/main.js --expression "y=2*x" --range "x=0:4:5"
  ```
  and confirm valid JSON on stdout.

This implements the TIME_SERIES_GENERATION feature by providing end-to-end parsing, validation, data generation, and output behaviors as specified in `features/TIME_SERIES_GENERATION.md`.

LLM API Usage:
```json
{"prompt_tokens":5324,"completion_tokens":1327,"total_tokens":6651,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":576,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---