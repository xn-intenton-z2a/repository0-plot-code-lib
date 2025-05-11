features/EXPRESSION_SERIES.md
# features/EXPRESSION_SERIES.md
# Expression Series Generation

This feature implements core functionality to parse a simple mathematical expression and a numeric range from CLI arguments, generate a time series of points, and output the result in JSON or CSV format.

# CLI Interface

The main script (src/lib/main.js) will be extended to accept the following flags:

- --expression <expr>    The mathematical expression in terms of x, for example y=sin(x) or x^2+3*x+2.
- --range <min:max>      The numeric range for x values, specified as two numbers separated by a colon.
- --points <n>           (Optional) Number of samples in the range, default is 100.
- --format <json|csv>    (Optional) Output format for the series, default is json.
- --output <file>        (Optional) Path to write output; if omitted, prints to stdout.

# Behavior and Output

When invoked, the tool will:

1. Validate CLI arguments using zod.
2. Parse the expression using mathjs.
3. Generate an array of evenly spaced x values from min to max (inclusive) with the given points count.
4. Evaluate y for each x and assemble an array of records with keys x and y.
5. Serialize the array in the requested format:
   - JSON: an array of objects.
   - CSV: header line x,y followed by rows of values.
6. Write the result to the specified file or stdout.

# Implementation Details

- Update package.json to add a dependency on mathjs for expression parsing.
- In src/lib/main.js, import mathjs and zod, define and parse a schema for arguments, implement series generation and formatting functions, and wire them into the main function.

# Testing

- Add new unit tests in tests/unit/series-generation.test.js to cover:
  - Valid and invalid argument combinations.
  - Correct series length and boundary values.
  - JSON and CSV formatting output.
- Update existing test suite to import and invoke the new behavior without breaking current import tests.

# Documentation

- Update USAGE.md and README.md to include usage examples for the new flags, sample output snippets, and guidance on installing the tool and invoking series generation.
