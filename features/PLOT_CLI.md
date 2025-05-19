# Overview

Enhance the existing CLI to fully support parsing and validating mathematical expressions and range specifications before sampling or plotting. Users can now supply an expression flag and a flexible range flag for both x and y axes.

# CLI Arguments

--expression <string>
  A mathematical formula in infix syntax, for example y=sin(x) or x^2 + 3*x + 1
  Must be provided and must reference variable x (for y expressions).
--range <string>
  A comma-delimited specification of numeric ranges: x=start:end,y=start:end
  For example x=-1:1,y=-2:2
  Both x and y sections are required and must parse to two numeric values separated by a colon.
-e, -r
  Short forms for --expression and --range respectively

# Behavior

1. Parse command line flags including expression (-e) and range (-r).
2. Validate that the expression flag is present and follows permitted syntax.
3. Validate that the range flag is present, split into x and y parts, and convert each start and end to numbers.
4. On validation error, display a clear message and exit with non-zero code.
5. On success, pass parsed expression and numeric ranges to downstream sampling and plotting logic (unchanged).

# Implementation Details

- Update src/lib/main.js:
  - Integrate a flag parser (minimist or yargs) to handle --expression, --range, --file, --format and their shorthand.
  - Import mathjs to parse the expression string into an executable function of x.
  - Implement a parseRange helper to split the range string by comma, then colon, coercing to numbers and validating order.
  - Throw or log a user-friendly error if flags are missing or malformed.
  - Preserve existing time series sampling and image output behavior after successful parse.

- Update package.json if adding mathjs or range parsing dependencies (otherwise none).

# Testing

- In tests/unit/plot-generation.test.js and main.test.js:
  - Add tests to verify missing expression or range flags cause process exit with error.
  - Test valid expression and range strings produce a parsed AST and numeric range output without error.

# Documentation

- Update README.md:
  - Document new --expression and --range flags with examples and shorthand usage.
- Update USAGE.md:
  - Show sample commands demonstrating valid and invalid flag usage and expected outputs.