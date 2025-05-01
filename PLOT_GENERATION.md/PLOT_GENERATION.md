# Overview
This feature implements core plot generation functionality for the CLI tool. It processes command line arguments to produce SVG or PNG plots from mathematical expressions. The primary focus is on parsing input flags, validating parameters, and generating the output plot as prescribed by the usage documentation.

# Functionality
The CLI now supports the following capabilities:
- Parsing required and optional flags including --expression, --range, --file, --width, --height, and --output-format.
- Validating that --expression is provided and that --file is present when generating PNG plots.
- Generating an SVG plot based on the input expression. For multiple expressions, segments are created according to range and dimension flags.
- Converting SVG to PNG when the output-format flag is set to png. This utilizes existing libraries with minimal dependency changes if necessary.
- Displaying error messages with timestamp and details when required flags are missing or invalid values are provided.

# Integration and Impact
This feature directly addresses the library mission to transform mathematical expressions into visual plots from the command line. The addition of robust argument parsing and error handling greatly improves the overall functionality and user experience. It consolidates core functionality within the single source file and ensures test coverage via updated unit tests.

# Changes Made
- The source file (src/lib/main.js) is updated to include argument parsing logic and error handling routines.
- The test file (tests/unit/main.test.js) is extended to verify parsing functionality and error conditions.
- Relevant sections in the README (README.md) and USAGE documentation (USAGE.md) are updated with examples and flag descriptions.
- Minimal dependency adjustments are performed in package.json to ensure compatibility with tools for converting SVG to PNG if the user chooses that option.
