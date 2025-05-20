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