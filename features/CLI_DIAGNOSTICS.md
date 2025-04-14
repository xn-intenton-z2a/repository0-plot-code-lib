# CLI_DIAGNOSTICS (Consolidated)

## Overview
This feature consolidates the diagnostics enhancements from both the CLI_PARSER and CLI_DIAGNOSTICS features into a single, robust implementation. The unified feature provides a `--diagnostics` flag that, when activated, outputs detailed diagnostic information for troubleshooting and configuration validation. This includes Node.js version, key environment variables, and current configuration parameters. Backward compatibility is maintained for existing CLI functionalities.

## Implementation
- **Source File (`src/lib/main.js`):**
  - Update the CLI arguments parsing to include and validate the `--diagnostics` flag using the `zod` library.
  - When `--diagnostics` is detected, bypass normal plot generation and print detailed diagnostic information (e.g., Node version, environment variables snapshot, configuration details).
  - Ensure that when non-diagnostic flags are provided (such as `--expression`, `--range`, and `--file`), the tool behaves as before.

- **Test File (`tests/unit/main.test.js`):**
  - Add test cases to simulate CLI invocation with the `--diagnostics` flag, verifying that the output includes diagnostic details and does not trigger errors.
  - Maintain existing tests for plot generation, ensuring no regression in functionality.

- **Documentation Updates (`README.md`):**
  - Update the CLI usage section to include a section for the `--diagnostics` flag.
  - Provide examples and expected output for diagnostic mode.

- **Dependencies:**
  - Ensure the `zod` library is used correctly for CLI argument validation and that dependency versions remain compatible.

## Benefits
- Offers an easy method for users to verify their system configuration and environment setup, aiding in troubleshooting and debugging.
- Consolidates overlapping diagnostics functionality into a single, coherent feature, simplifying maintenance.
- Supports our mission by enhancing the reliability and user-friendliness of the CLI tool.

## Testing and Validation
- Run `npm test` to verify that both the diagnostics and plot generation functionalities work as expected.
- Execute `npm run diagnostics` (or `node src/lib/main.js --diagnostics`) to manually observe the diagnostic output.
