# Overview

Implement core functionality to parse a mathematical expression and generate time series data over a specified range of input values, in a standard JSON format.

# CLI Interface

The command-line tool will support the following options:

- --expression, -e  : A required argument specifying a mathematical formula in a familiar open syntax (for example, supported by mathjs).
- --range, -r       : A required argument specifying the input range in the form x=start:end[:steps], where steps is optional (default 100).
- --output-format   : An optional argument to specify output format; currently only 'json' is supported (default).
- --file, -f        : An optional argument specifying the path to write the output; defaults to stdout.

# Implementation Details

- Add mathjs as a runtime dependency to parse expressions into an evaluable function.
- Parse the --range option into start, end, and optional step count.
- Generate an array of points by evaluating the parsed function at uniform intervals.
- Structure output as a JSON array of objects, each with x and y numeric properties.
- Wire this logic into src/lib/main.js, replacing the placeholder console output when invoked from the CLI.

# Testing

- Create unit tests in tests/unit/plot-generation.test.js to verify:
  - Correct parsing of range strings and default step count behavior.
  - Accurate computation of y values for standard expressions like y = sin(x).
  - Proper JSON output structure.

# Documentation

- Update README.md and USAGE.md to include examples of:
  - Generating a simple sine wave series: repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.283" --file output.json
  - Custom step counts and output redirection.

