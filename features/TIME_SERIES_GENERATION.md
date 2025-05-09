# Overview
Add CLI support to generate time series data from a mathematical expression over a specified range.

# CLI Options
- --expression EXPR    A mathematical expression where y is defined as a function of x.
- --range x=START:END  Range of x values to sample, expressed as start:end.
- --points N           Number of samples in the range (default: 100).
- --output FORMAT      Output format, json or csv (default: json).

# Implementation
Update src/lib/main.js to:
- Parse CLI flags using a lightweight parser and validate them with zod.
- Add expr-eval as a dependency and use it to compile and evaluate the expression.
- Generate an array of N evenly spaced x values between START and END.
- Evaluate y for each x and collect an array of data points { x, y }.
- Serialize the array in the requested format and print to stdout.

# Testing
- Extend tests/unit/plot-generation.test.js to cover:
  - Default behavior for a simple expression like y=x or y=2*x+1.
  - Custom points count and output formats.
  - Invalid expression or range inputs produce clear error messages.

# Documentation
- Update USAGE.md and README.md with examples and API reference.
- Example invocation:
  node repository0-plot-code-lib --expression y=sin(x) --range x=0:6.28 --points 50 --output json