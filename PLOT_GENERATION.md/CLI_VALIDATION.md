# CLI_VALIDATION

## Overview
This feature refines the CLI argument parsing by integrating the zod library for schema-based validation. With this change, argument checks are centralized and declarative, reducing manual error handling and making the code more maintainable. The schema ensures that required parameters such as --expression and --range are provided and correctly formatted. It also validates optional parameters like --file to only accept .svg or .png extensions.

## Implementation Details
1. Update the main source file (src/lib/main.js) to import zod and define a schema for CLI arguments. This schema will encapsulate all expected flags and validate the formatting of values like --range using pattern matching and numeric bounds checks.
2. Replace the manual CLI parsing with a two-step process: first, convert the raw CLI arguments into an object; second, use the zod schema to parse and validate these inputs. On validation failure, the tool will produce descriptive error messages and exit appropriately.
3. Retain and integrate the existing help output. If the flag --help is encountered or no arguments are passed, display the usage guide without performing schema validation.
4. Modify error handling to rely on zod's error output where appropriate, ensuring consistency in error messages.

## Testing and Documentation
1. Update unit tests to simulate both valid and invalid CLI inputs as expected by the new schema. Confirm that errors are thrown with meaningful messages when provided with malformed inputs.
2. Document the changes in the USAGE.md file by adding a section on the new validation process. Update examples to reflect that parameters are now strictly enforced by a validation schema.
3. Confirm that the updated behavior is compliant with Node 20 and ESM standards, and that it aligns with the mission of providing a robust, user-friendly CLI tool for plot generation.

## Impact
By implementing schema-based validation, this feature enhances both the reliability and the usability of the CLI tool. It centralizes input validation into a single, maintainable location, reducing bugs and simplifying future extensions. This change directly supports the mission of being a go-to plot library by ensuring users receive clear feedback on input errors and proper guidance on usage.