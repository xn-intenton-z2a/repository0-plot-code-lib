# Purpose

Add command-line functionality to parse mathematical formulas and generate data points for plot visualizations in ASCII, JSON, SVG, or CSV formats.

# Behavior

When invoked as repository0-plot-code-lib plot "<formula>" [--output <file>] [--format ascii|json|svg|csv] [--width <n>] [--height <n>] [--range "<min>,<max>"] the CLI will:

- Parse the formula and sample default 50 points over the specified range.
- Support four output formats:
  - ascii: render an ASCII chart with axes and data points.
  - json: output a JSON array of objects {x, y}.
  - svg: generate an SVG polyline graph with optional axes and labels.
  - csv: produce comma-separated values with a header line `x,y` and one line per data point.
- Write results to stdout by default or to the file specified by --output.
- Exit with a non-zero status and a clear error message for invalid formulas or option values.

# Implementation

- In src/lib/main.js:
  - Import mathjs to parse and evaluate the formula for each x sample.
  - Use zod to validate and coerce CLI options, extending the format schema to include csv.
  - Generate N equidistant x values over the requested range, evaluate y = f(x).
  - Branch on format:
    - ascii: reuse existing ASCII chart logic.
    - json: JSON.stringify the array of {x, y}.
    - svg: produce an SVG polyline wrapped in an <svg> element.
    - csv: build a string starting with "x,y" header and one line per point, escaping values per RFC 4180.
  - Determine output destination: write to stdout or to the file path from --output.

# Testing

- In tests/unit/plot-generation.test.js:
  - Add tests for format=csv:
    - Mock mathjs to return predictable values and verify the CSV header and data lines.
    - Confirm that specifying --output writes a .csv file with correct contents.
  - Ensure tests for ascii, json, and svg still pass unchanged.
  - Test error handling for unsupported formats and invalid formulas.

# Documentation

- Update README.md:
  - Under the "Plot Command" section, note the csv format alongside ascii, json, and svg.
  - Show example invocation for csv and sample output.
- Update USAGE.md:
  - Document the --format csv option, including default behavior and how to use --output for a .csv file.
