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
2025-05-20T01:34:48Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-20T01-34Z

## Maintain Feature at 2025-05-20T01:35:10.176Z

Maintained feature TIME_SERIES_GENERATION.

Feature spec:

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

Git diff:

```diff
\n\n// New [features/TIME_SERIES_GENERATION.md]:\n# Overview

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
```

LLM API Usage:

```json
{"prompt_tokens":3962,"completion_tokens":1951,"total_tokens":5913,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1600,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

