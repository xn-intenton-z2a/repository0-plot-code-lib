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