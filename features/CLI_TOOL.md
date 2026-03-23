CLI_TOOL

Overview

Provide a command-line interface entrypoint at src/lib/main.js that accepts expression or csv input, a range, and a file output option. Include a --help flag with usage examples.

Behavior

- The CLI supports these flags: --expression (string), --range (start:step:end), --csv (path), --file (output path), and --help.
- When --expression and --range are provided, the CLI uses parseExpression and evaluateRange to compute points and then renders/saves the plot.  
- When --csv is provided, the CLI loads the CSV and renders the series.  
- --help prints concise usage examples and exits with code 0.

Examples (usage lines)

node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg
node src/lib/main.js --csv data.csv --file output.png
node src/lib/main.js --help

Acceptance criteria

- Running the CLI with --help prints usage information and examples.  
- Running the CLI with --expression and --range and --file writes the expected output file.  
- The CLI exits with non-zero exit code on fatal errors and prints helpful error messages.

Testing

- Unit tests should exercise the CLI argument parsing logic and, where appropriate, run the main flow in a temp directory to assert output files are created. Mocking or dependency injection may be used for PNG conversion tests.

Implementation notes

- Use a minimal argument parser (process.argv parsing or a small helper) to avoid adding heavy dependencies. Export the main functions so they are testable.