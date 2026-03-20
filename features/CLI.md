# CLI

Summary
Provide a command-line interface entry point at src/lib/main.js that supports plotting from expressions or CSV files and saves output to SVG or PNG.

Behavior and Flags
- --expression EXPR  Evaluate EXPR to produce a series. EXPR may be an assignment (y=Math.sin(x)) or a raw expression.
- --range RANGE      Range in start:step:end format, required when using --expression.
- --csv PATH         Path to a CSV file with time,value columns; when provided CSV input is used instead of expression evaluation.
- --file PATH        Output file path. Extension determines output format (.svg or .png).
- --help             Print usage help and examples and exit.

Usage Examples
node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg
node src/lib/main.js --csv data.csv --file output.png

API
Export a named function cliMain for programmatic invocation and ensure running node src/lib/main.js executes the CLI when invoked directly.

Acceptance Criteria
- The example command with --expression, --range and --file produces the specified output file.
- The example command with --csv and --file produces the specified output file.
- node src/lib/main.js --help prints clear usage information and exits with a success status.
- The named export cliMain exists in src/lib/main.js.
