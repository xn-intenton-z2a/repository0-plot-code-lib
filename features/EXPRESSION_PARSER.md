# EXPRESSION PARSER Feature

This feature implements core functionality to parse and evaluate mathematical expressions over a given numeric range, producing a time series of (x, y) points for plotting or export.

# CLI Parameter Parsing & Validation

- Add required flags:
  - --expression: a string representing a function of x, for example y=sin(x) or x^2+3*x-5.  If missing or invalid, report a clear error.
  - --range: a string defining min and max for x and an optional step, using syntax x=min:max[:step], for example x=-10:10:0.5.  Validate that min < max and step > 0.
- Ensure parsing supports basic arithmetic operators (+, -, *, /, ^), parentheses, and standard math functions (sin, cos, tan, exp, log).

# Implementation Details

- In src/lib/main.js, extend argument parsing to extract expression and range flags.  Use zod to validate flag presence and format.
- Build a lightweight parser or leverage a library (such as a minimal expression evaluator) to convert the expression string into an AST or evaluation function.
- Generate an array of x values from min to max using the specified step (default step computed as (max-min)/100 if not provided).
- For each x, evaluate the expression to compute y, capturing numerical errors and ensuring y is a finite number.
- Return or pipe the resulting series (array of objects with numeric x and y properties) into the existing export or plotting routines.

# Testing Enhancements

- In tests/unit/main.test.js, add cases for:
  - Valid expression strings producing correct sample values for simple functions (e.g. y=x^2 at x=0,1,2).
  - Range parsing with and without explicit step, verifying count of samples and boundary values.
  - Invalid expressions or range formats causing main to exit with an error and printing a descriptive message.

# Documentation Updates

- Update README.md to include usage examples:
  node src/lib/main.js --expression "y=sin(x)" --range "x=-3.14:3.14:0.1" --file output.svg
  node src/lib/main.js --expression "y=x^3-2*x+1" --range "x=0:10" --format json
- Document the supported expression syntax, operators, functions, and default sampling behavior.