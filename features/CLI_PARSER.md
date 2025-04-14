# CLI_PARSER Enhancement

## Overview
This update implements the robust input validation for the CLI of the plot library using the zod library. The existing CLI parser is extended to validate parameters for `--expression`, `--range`, and `--file` flags, ensuring that users receive clear and immediate feedback upon issuing incorrect or missing parameters. This enhancement reinforces our mission of being the go-to plot library by making the tool more reliable and user-friendly.

## Implementation
- **Source File (src/lib/main.js):**
  - Integrate the zod library to define schemas for each CLI argument.
  - Validate that:
    - `--expression` is a valid mathematical expression.
    - `--range` conforms to the expected range format (e.g. `x=-1:1,y=-1:1`).
    - `--file` has a proper filename with supported extensions like SVG or PNG.
  - On validation failure, print a detailed error message and a help message guiding users to the correct syntax.
  - Maintain backward compatibility by defaulting to simple logging if no CLI flags are provided.

- **Test File (tests/unit/main.test.js):**
  - Add test cases covering both valid and invalid combinations of CLI flags.
  - Validate that the error messages and help instructions are properly output when inputs fail validation.
  - Ensure that valid input proceeds without errors.

- **Documentation Updates (README.md):**
  - Revise the CLI usage section with updated examples demonstrating the new validation behavior. 
  - Document the expected formats for `--expression`, `--range`, and `--file` arguments, and include troubleshooting steps for common error messages.

## Benefits
- Provides robust input validation for improved user experience.
- Reduces runtime errors by preventing invalid input from propagating through the system.
- Reinforces the reliability of the CLI tool, furthering our mission to be a go-to plot library for formula visualizations.

## Testing
- Run `npm test` to ensure all new validation logic is rigorously tested and that no regressions occur with existing functionality.