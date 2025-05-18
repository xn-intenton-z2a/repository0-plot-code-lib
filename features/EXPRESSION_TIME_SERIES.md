# Overview
This feature extends the CLI entry point to accept a mathematical expression and a numeric range, generate a time series of (x,y) data points by evaluating the expression over the specified range, and output the result as JSON to standard output.

# CLI Arguments
- Support a new flag --expression that takes a string defining y as a function of x, for example sin(x) or y=sin(x).
- Support a new flag --range that takes a string in the format x=start:end:step, for example x=-1:1:0.1.
- Validate the presence and format of both flags and report user-friendly errors if missing or malformed.

# Time Series Generation
- Parse the range parameter into numeric start, end, and step values.
- Use a math parser library (for example mathjs) to parse and compile the expression.
- Iterate x from start to end in increments of step, evaluate the expression for each x, and collect an array of objects { x, y }.
- Print the resulting array as a JSON string to stdout.

# Testing
- Add unit tests for the time series generator function to cover simple expressions such as x, sin(x), and polynomial functions over a known range.
- Test CLI integration by simulating process.argv, invoking main(), and capturing stdout to verify valid JSON output and correct values.

# Documentation
- Update README.md to include usage examples of the CLI with --expression and --range, and show sample JSON output.
- Document the new behavioral contract in USAGE.md or README.md.

# Dependencies
- Add a dependency on mathjs in package.json to enable robust expression parsing and evaluation.