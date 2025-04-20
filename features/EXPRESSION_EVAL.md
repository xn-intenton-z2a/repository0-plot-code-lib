# EXPRESSION_EVAL Feature Enhancement

This feature enhances the CLI tool by adding support for evaluating mathematical expressions provided through a new `--expression` flag. Along with an optional `--range` flag, the tool computes a series of y-values based on the provided function, offering users a preview of the data before plotting.

## Overview

- **Expression Parsing:** Parse the value from the `--expression` flag (e.g., "y=sin(x)") to determine the mathematical function.
- **Range Processing:** Optionally parse the `--range` flag (formatted as `x=start:end`) to set the domain over which x values will be generated. If absent, a default range is applied.
- **Evaluation:** Evaluate the mathematical expression using JavaScript's native Math functions. For example, if the expression is "y=sin(x)", compute y-values using `Math.sin(x)` over the determined range.
- **Integration:** The computed y-values are output to the console as a preview before proceeding with any plotting or exporting routines.

## Source Code Changes

- **Modify src/lib/main.js:**
  - Update the argument parsing logic to detect the `--expression` flag and optionally the `--range` flag.
  - Implement a simple parser that extracts the mathematical function from an expression starting with "y=". For instance, for "y=sin(x)", isolate the function body "sin(x)".
  - Generate a set of x values over a defined range (either provided via `--range` or using a default such as x in [-10, 10]).
  - Use JavaScript's `Math` functions to compute y-values for each x, and log the computed values along with basic statistics (min, max, average) if applicable.
  - Ensure the new logic does not interfere with existing flags like `--stats`, `--diagnostics`, and `--help`.

## Testing Enhancements

- **Update tests/unit/main.test.js:**
  - Add or extend tests to simulate CLI calls with the `--expression` flag (and optionally `--range`).
  - Verify that the console output includes the computed y-values for known expressions (e.g., validate that `Math.sin` applied over the given range yields correct results).
  - Check for proper handling and error messaging when the expression or range format is invalid.

## Documentation Updates

- **Update README.md:**
  - Include a dedicated section documenting the new `--expression` and `--range` flags.
  - Provide usage examples, such as:
    ```sh
    node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10"
    ```
  - Outline expected outputs and potential error messages for invalid inputs.

## Dependency and Build Consistency

- No new dependencies are introduced. This feature solely utilizes JavaScript's built-in functionalities.
- All changes comply with Node 20, ECMAScript module standards, and adhere to the repository guidelines detailed in CONTRIBUTING.md and MISSION.md.
