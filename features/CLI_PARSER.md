# CLI_PARSER Feature

## Overview
This feature enhances the repository by adding robust command-line argument parsing. The main module is updated to accept flags such as --expression, --range, and --file. This functionality directly supports the repository mission by enabling users to generate plots from mathematical expressions with designated ranges and output file specifications.

## Implementation Details
- Update the main source file (src/lib/main.js) to parse incoming arguments.
- Recognize flags: --expression for the mathematical expression, --range for the range values, and --file for the output filename.
- Validate that the mandatory parameter --expression is provided, and provide default values or error messages for missing or invalid values.
- Integrate basic error handling to log meaningful messages and exit with a non-zero status when validation fails.

## Testing
- Update the unit tests in tests/unit/main.test.js to simulate command-line inputs with various combinations of the flags and verify the proper logging or error messages.

## Documentation
- Update the README.md with usage examples including the new CLI options. Example usage:
  node src/lib/main.js --expression "y=sin(x)" --range "x=-3:3,y=-1:1" --file output.svg

## Dependencies
- No new external dependencies are required. The feature will be implemented using native JavaScript parsing and error handling techniques.
