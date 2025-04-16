# CLI_LOGGING Feature Specification

## Overview
This feature consolidates and enhances the CLI's runtime logging and input validation. It merges the diagnostics and verbose logging functionality into a single, streamlined system. In addition, it introduces robust input validation using the existing Zod library to ensure that required options (such as expression, range, and file) meet the expected formats. This results in more informative error messages and a more reliable tool, fully aligned with our mission of accessibility and transparency.

## Implementation
### Source Code Changes (src/lib/main.js)
- **Argument Parsing and Validation**: 
  - Replace or supplement the existing manual parsing logic with Zod-based validation.
  - Define a Zod schema for CLI options to enforce:
    - `expression`: required string (optionally prefixed with 'y=' but processed accordingly).
    - `range`: required string in the format `x=min:max`.
    - `file`: optional, must end with `.svg` or `.png` if provided.
    - `samples`: optional, must be a number greater than 1 if provided.
  - If validation fails, output a clear error message and display usage instructions.

- **Diagnostics Mode**:
  - Retain the diagnostic output triggered by the `--diagnostics` flag, which prints relevant runtime information (version, Node.js version, and arguments received) as JSON.

- **Verbose Logging**:
  - When the `--verbose` flag is supplied, emit detailed logs at key execution points:
    - Log initial options and validation results.
    - Log before and after expression evaluation and time series generation.
    - Log file-writing operations, if applicable.

- **Integration**:
  - Ensure that all enhanced logging and validation logic are executed before further processing, effectively preventing unclear errors from propagating.

## Testing
### Test File Updates (tests/unit/main.test.js)
- **Validation Tests**:
  - Add tests to check that invalid or malformed inputs trigger the appropriate error messages.
  - Verify that a range value not matching the expected format results in a validation error.
  - Test that providing an invalid file extension returns an error message.

- **Logging Tests**:
  - Update existing tests for diagnostics and verbose modes to assert that enhanced log messages are output correctly.
  - Use spies on `console.log` to capture and verify detailed logs, including those from the validation errors and operational steps.

## Documentation Updates (README.md)
- Revise the CLI Usage section to:
  - Clearly document the new, stricter input requirements (supported formats for `--expression`, `--range`, `--file`, and `--samples`).
  - Explain how the tool will now provide immediate feedback on incorrect inputs through robust validation error messages.
  - Update examples to showcase usage of `--diagnostics` and `--verbose` flags in tandem with the improved validation process.

## Mission Alignment
This enhancement improves the reliability and transparency of the CLI tool by combining critical logging and input validation functions. Users gain early feedback on misconfigurations, and enhanced logs provide deeper insights into internal processing. This streamlined approach reinforces our mission of making plot generation accessible, predictable, and robust.