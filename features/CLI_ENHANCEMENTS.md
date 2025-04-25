# CLI_ENHANCEMENTS Feature Update

## Overview
This update refines the CLI module to consolidate and enhance all existing functionality related to formula parsing, SVG plot generation, and statistics calculation. The update focuses on robust parameter validation, error handling, and usage guidance all within a single source file, updates to unit tests for these behaviors, and documentation enhancements in the README.

## Source File Improvements
- Enhance src/lib/main.js to include parameter parsing for --expression, --range, --file, and --stats using validation with zod.
- Implement error messages for missing or invalid parameters. A usage guide is printed when errors occur.
- When the --file parameter ends with .svg, generate compliant SVG output using the correct namespace and required attributes. The SVG should include minimal graphical representation such as a basic line or path element.
- Process the --stats flag to compute summary statistics of computed y-values including minimum, maximum, and average, and print these values in a formatted manner.

## Testing Enhancements
- Update tests/unit/main.test.js to assert that:
  - Execution with valid CLI parameters returns a correct SVG output when an SVG file is specified, ensuring the output contains the <svg> element.
  - The --stats flag results in the output containing correctly computed summary statistics.
  - Invalid or incomplete parameters trigger proper error messages and usage instructions.

## Documentation Updates
- In README.md, detail the enhanced CLI usage examples. Illustrate examples that cover:
  - The use of --expression and --range, including correctly formatted inputs.
  - How to invoke SVG output with --file parameter ending in .svg.
  - Enabling --stats and observing printed summary statistics.

## Dependencies and Compatibility
- Continue using Node 20 and adhere to ECMAScript module standards.
- Rely on the zod library for parameter validation. No new libraries are introduced.
- Keep all changes confined to a single source file, associated test files, the README, and the dependency file if necessary for minor version adjustments.
