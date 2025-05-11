# Overview

Add support for advanced CLI flags to allow users to specify a mathematical expression, a range of values, and an output file path. Ensure full coverage tests for each flag and combination.

# CLI Behavior

- --expression <string>
  Accepts a formula in a simple expression syntax (for example "y=sin(x)").
- --range <string>
  Defines numeric ranges for variables in the form "x=min:max,y=min:max". Validate syntax and parse into numeric bounds.
- --output <path>
  Specifies a file path for saving the generated plot. If omitted, output is sent to stdout.

# Implementation Details

1. Add a lightweight argument parser (for example minimist) as a dependency to read flags from process.argv.
2. Update src/lib/main.js:
   - Parse process.argv for the three flags.
   - Validate and coerce types (use zod or manual checks).
   - Pass parsed values to the plot generation logic or stub behavior for now.
   - If --output is provided, write the result to the file, otherwise console.log it.

# Testing Requirements

- Create or update tests in tests/unit/plot-generation.test.js:
  - Test invocation without flags to ensure default behavior.
  - Test parsing of --expression alone, verifying correct argument passed to main.
  - Test parsing of --range alone and combined with --expression.
  - Test writing to an output file when --output is used (use a temporary file fixture).
  - Achieve 100% coverage on the argument parsing branches.

# Documentation

Update README.md to include:

- A section describing the three flags with brief explanations.
- Usage examples:
  - Generating a default plot: repository0-plot-code-lib
  - Using expression and range flags: repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:6.28"
  - Saving output to a file: repository0-plot-code-lib --expression "y=cos(x)" --range "x=0:3.14" --output plot.svg
