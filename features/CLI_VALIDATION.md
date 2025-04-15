# CLI_VALIDATION Feature Update

## Overview
This update refines the CLI validation functionality to incorporate an explicit `--validate` flag. When a user supplies the `--validate` flag along with the required options (`--expression`, `--range`, and `--file`), the CLI tool will solely perform input validation using the existing `zod` library. If all inputs are valid, it will output a "Validation successful" message and exit without generating a plot. This update ensures a clear separation between the validation step and plot generation, enhancing user feedback and error handling.

## Implementation
- **Source File (`src/lib/main.js`):**
  - Detect the presence of the `--validate` flag among CLI arguments.
  - If `--validate` is provided, perform the input validation against the zod schema:
    - `--expression`: Must be a non-empty string.
    - `--range`: Must be in the format `x=min:max,y=min:max`.
    - `--file`: Must end with a valid extension (.svg or .png).
  - On successful validation, print a success message ("Validation successful") to the console and exit without proceeding to plot generation.
  - Maintain existing behavior for plot generation if `--validate` is not present.

- **Test File (`tests/unit/main.test.js`):**
  - Add and update test cases to simulate invocation with the `--validate` flag.
  - Tests should confirm that, when valid inputs are provided with `--validate`, the output is "Validation successful" and no plot file is written.
  - Ensure that tests for invalid inputs still yield clear, descriptive error messages.
  - Confirm that invoking the CLI without `--validate` retains the existing plot generation behavior.

- **Documentation (`README.md`):**
  - Update the CLI usage section to describe the new behavior of the `--validate` flag.
  - Provide an example invocation demonstrating the standalone validation mode:
    ```bash
    node src/lib/main.js --validate --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg
    ```

- **Dependencies:**
  - Continue leveraging the integrated `zod` library; no new dependency is needed.

## Benefits
- Provides a dedicated validation mode that allows users to verify CLI argument correctness without triggering plot generation.
- Improves user experience by offering immediate feedback on input errors or success.
- Ensures that the validation functionality remains decoupled from other operations, facilitating troubleshooting and usability.

## Testing and Validation
- Run `npm test` to ensure that validations work as expected in both modes (with and without `--validate`).
- Manually test by invoking the CLI with the `--validate` flag to ensure that it only performs input checks and outputs the success message when inputs are valid.
