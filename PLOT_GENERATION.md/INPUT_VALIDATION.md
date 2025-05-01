# INPUT_VALIDATION

## Overview
This feature introduces comprehensive input validation using the Zod library to ensure that user-supplied command line arguments meet the required criteria before generating any plots. The validation logic confirms that all necessary flags are provided and that they abide by predefined constraints. This enhancement will help prevent runtime errors and provide clear, actionable feedback to the user.

## Implementation
The parseArgs function in src/lib/main.js will be updated to integrate a Zod schema for input validation. The schema will enforce:
- The presence of a non-empty expression value for the plot formula.
- Valid outputFormat values (only 'svg' or 'png').
- That when the output format is png, the file flag must be provided.

Error messages will be standardized to clearly indicate input issues. The source file will be modified accordingly to use the Zod schema for parsing and validating inputs.

## Testing
Test cases in tests/unit/main.test.js will be extended to cover scenarios for invalid inputs. These tests will ensure that missing or malformed parameters result in appropriate error messages, and that valid inputs are processed successfully.

## Documentation
The USAGE.md and README.md files will be updated to reflect the new input validation behavior. Usage examples will now indicate the necessary preconditions for command line arguments and provide guidance for users to correct any input errors.
