# TIME SERIES GENERATION

Generate numerical time series data from a mathematical expression over a specified range of values.

# CLI USAGE

The command-line interface will support the following options:

- --expression <expr>  Defines the formula for y in terms of x, e.g. "sin(x) + 2*x".
- --range <start>:<step>:<end>  Specifies the x values from start to end, inclusive, with the given step. Step defaults to 1 if omitted.
- --output [format]  Optional. Defines output format: json (default) or csv.

# IMPLEMENTATION DETAILS

1. Add mathjs as a dependency to parse and evaluate mathematical expressions safely.
2. In main.js, parse process.argv for expression, range, and output options.
3. Parse the range string into numeric start, step, and end values.
4. Generate an array of x values and compute y for each x using mathjs.
5. Format the results as JSON or CSV and print to stdout.
6. Validate inputs and report clear error messages for invalid expressions or ranges.

# TESTING

- Add unit tests in tests/unit/plot-generation.test.js to verify:
  - Correct parsing of various range strings, including omitted step.
  - Accurate computation of y values for known expressions and ranges.
  - Proper formatting in JSON and CSV formats.

Ensure that existing import and execution tests remain passing and that new tests cover the core time series generation logic.