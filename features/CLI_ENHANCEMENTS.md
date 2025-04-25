# CLI_ENHANCEMENTS Feature Update

## Overview
This update further refines the CLI module by adding robust parameter validation and usage instructions using the zod library. In addition to supporting the --file flag for SVG and PNG outputs, the CLI now strictly requires and validates the --expression and --range parameters. The improvement also validates the --stats flag and produces informative error messages when parameters are missing or malformed. This update ensures that users receive clear guidance and compliant output whether they are generating SVG plots or converting to PNG using the sharp library.

## Source File Improvements
- Update src/lib/main.js to parse additional CLI parameters using zod validation. The parameters --expression and --range are now mandatory.
- Validate that --expression follows a basic formula pattern and that --range follows an expected format (for example, "x=-1:1,y=-1:1").
- If validation fails or required parameters are missing, the CLI will output a detailed usage guide with examples and exit with an error code.
- Maintain existing functionality for handling the --file flag: when ending in .svg, output compliant SVG content; when ending in .png, convert SVG output to PNG using the sharp library.
- Integrate handling of the --stats flag so that, when provided, the CLI computes and displays summary statistics (minimum, maximum, and average) for computed y-values.

## Testing Enhancements
- Update tests/unit/main.test.js to add new test cases that simulate CLI calls with missing or invalid --expression and --range values. These tests will assert that error messages are produced and a usage guide is printed as needed.
- Ensure that existing tests for PNG and SVG file generation continue to pass.
- Add tests for the proper handling of the --stats flag, checking that output includes correctly formatted summary statistics when enabled.

## Documentation Updates
- Update README.md to include clear usage examples illustrating the mandatory use of --expression and --range parameters.
- Document the error messages and usage guide that appears when validation fails.
- Provide real-world examples that cover both SVG and PNG output scenarios, including usage of the --stats flag for statistical output.

## Dependencies and Compatibility
- Continue using Node 20 and the ECMAScript module standard.
- Rely on the zod library for parameter validation without introducing any new dependencies.
- Ensure compatibility with the existing CLI functionality as described in previous updates.
