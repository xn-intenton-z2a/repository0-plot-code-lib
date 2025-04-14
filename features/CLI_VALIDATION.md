# CLI_VALIDATION Feature

## Overview
This feature introduces a new CLI flag, `--validate`, that performs input validation on the CLI arguments using the existing `zod` library. By activating this flag, users can verify that their provided options (--expression, --range, and --file) meet the expected format and constraints before any further processing is undertaken.

## Implementation
- **Source File (`src/lib/main.js`):**
  - Detect the presence of the `--validate` flag among the CLI arguments.
  - Define a Zod schema to validate the following:
    - --expression: Must be a non-empty string.
    - --range: Must follow the format `x=min:max,y=min:max` (e.g., `x=-1:1,y=-1:1`).
    - --file: Must be provided and end with a valid extension (.svg or .png).
  - If validation passes, output a success message (e.g., "Validation successful"). If validation fails, print detailed error messages.
  - Ensure this validation step does not interfere with the existing plot generation or diagnostics functionalities.

- **Test File (`tests/unit/main.test.js`):**
  - Add new test cases simulating CLI invocation with the `--validate` flag.
  - Test that valid arguments yield a success message.
  - Test that invalid arguments yield clear, descriptive error messages.
  - Ensure that existing tests for plot generation remain unaffected.

- **Documentation (`README.md`):**
  - Update the CLI usage section to include a description of the `--validate` flag.
  - Provide an example invocation:
    ```bash
    node src/lib/main.js --validate --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg
    ```

- **Dependencies:**
  - Leverage the already integrated `zod` library for argument validation. No additional dependencies are needed.

## Benefits
- Catches malformed or incorrect inputs early in the process.
- Enhances the overall user experience by providing clear feedback on input errors.
- Complements the existing diagnostics functionality by ensuring input integrity.

## Testing and Validation
- Run `npm test` to verify that the validation mode works as expected alongside other features.
- Manually test the `--validate` flag to observe both success and error outputs.
