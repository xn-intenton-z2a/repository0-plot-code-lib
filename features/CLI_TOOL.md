# CLI_TOOL

# Description

Define the command line interface for the library entry point src/lib/main.js. The CLI supports generating plots from expressions or from CSV files, accepts a range, and writes an output file. It must also support a --help flag that prints usage examples and exits with a success status.

# Acceptance Criteria

- The CLI accepts these flags: --expression, --range, --csv, --file, and --help.
- Running node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg produces the output file and exits with status 0.
- Running node src/lib/main.js --help prints usage examples for expression and CSV workflows and exits with status 0.
- Error conditions such as missing required arguments or invalid range format print a clear message and exit with a non-zero status.