# Summary

Provide a unified plot subcommand that supports both file-based data input and mathematical expression evaluation. Users can render line, bar, or scatter charts as ASCII art in the console or write rendered output to a file, choosing data from JSON, YAML, CSV, or a custom formula.

# Behavior

When the first argument is "plot" is provided:

- If the --expression flag is present:
  - Evaluate the mathematical expression in x over a domain (xmin to xmax) sampled at a specified number of points.
  - Handle syntax or evaluation errors by printing a descriptive error and exiting with code 1.
- Otherwise, if the --data flag is present:
  - Load and parse data from JSON, YAML, or CSV files; normalize into an array of { x, y } points.
  - On parse or file errors, display a descriptive message and exit with code 1.
- If neither expression nor data is provided, use a built-in default data set.
- After obtaining data points, scale and render the specified chart type in ASCII or write to the given output file.
- On success, print a summary message or output file path and exit with code 0.

# CLI Flags

- --type <chartType>    Chart type: line, bar, scatter (default line)
- --width <number>      Horizontal resolution for ASCII scaling (default 640)
- --height <number>     Vertical resolution for ASCII scaling (default 480)
- --data <filePath>     Path to JSON, YAML, or CSV data file
- --expression <expr>   JavaScript expression in x to generate y values
- --xmin <number>       Minimum x value for expression domain (default -10)
- --xmax <number>       Maximum x value for expression domain (default 10)
- --samples <integer>   Number of sample points when using expression (default 100)
- --output <file>       Path to write rendered output; omit to render to console

# Implementation Details

- Enhance src/lib/main.js to inspect args[0] and route to the plot handler.
- Use zod to validate flags and produce clear errors for missing or malformed inputs.
- For expressions, compile safely via Function constructor or a minimal parser; sample over [xmin, xmax].
- For file input, detect format by extension (.json, .yaml/.yml, .csv), parse with js-yaml or a CSV parser, normalize to { x, y }.
- Reuse existing ASCII chart rendering logic to plot points scaled to width and height.
- Preserve ESM module style and existing shebang invocation.

# Examples

repository0-plot-code-lib plot --expression "sin(x)"
Generate a sine wave sampled from -10 to 10 and render a line chart as ASCII art in the console.

repository0-plot-code-lib plot --expression "x*x" --xmin 0 --xmax 5 --samples 50 --output parabola.txt
Generate 50 samples of x squared between 0 and 5 and write ASCII chart to parabola.txt.

repository0-plot-code-lib plot --data data.csv --type scatter --width 400 --height 200
Read two-column CSV of x,y and render a scatter chart scaled to 400x200 in the console.

# Testing

- Update tests/unit/plot-generation.test.js to cover:
  - Valid expression evaluation: sample count, domain bounds, and correct y values at known points.
  - Error case for invalid expressions with exit code 1.
  - File parsing for JSON, YAML, and CSV: mock fs.readFile and parsers to provide data and capture render output.
  - Chart rendering for each type and output mode: mock console.log or fs.writeFile.
  - Defaults when neither expression nor data is provided.

# Documentation

- Update README.md under "Plot Command Examples" to include expression scenarios and file input examples.
- Ensure examples match actual CLI output by running commands and copying rendered charts.