# CLI

Summary
Provide a command-line interface entry point at src/lib/main.js that supports plotting from expressions or CSV files and saves output to SVG or PNG.

Behavior and Flags
- --expression EXPR  Evaluate EXPR to produce a series. EXPR may be an assignment (y=Math.sin(x)) or a raw expression that evaluates to y when x is provided.
- --range RANGE      Range in start:step:end format, required when using --expression.
- --csv PATH         Path to a CSV file with time,value columns; when provided CSV input is used instead of expression evaluation.
- --file PATH        Output file path. Extension determines output format (.svg or .png).
- --help             Print usage help and examples and exit with a success status.

Usage Examples
node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg
node src/lib/main.js --csv data.csv --file output.png
node src/lib/main.js --help

API
Export a named function cliMain for programmatic invocation and ensure running node src/lib/main.js executes the CLI when invoked directly.

Acceptance Criteria
- The module src/lib/main.js exports a named function cliMain.
- Running node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file out.svg exits with code 0 and writes out.svg containing the substring <svg and a viewBox attribute on the root svg element.
- Running node src/lib/main.js --csv data.csv --file out.png exits with code 0 and writes out.png whose first bytes match the PNG signature: 89 50 4E 47 0D 0A 1A 0A.
- Running node src/lib/main.js --help prints usage information to stdout and exits with code 0.
- When required flags are missing or invalid, the CLI exits non-zero and prints a clear error message to stderr.
