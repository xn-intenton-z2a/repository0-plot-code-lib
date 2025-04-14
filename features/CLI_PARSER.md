# CLI_PARSER Enhancement - Diagnostics

## Overview
This update extends the current CLI parser to include a new `--diagnostics` flag alongside the existing `--expression`, `--range`, and `--file` validations. When the diagnostics flag is provided, the tool will output system and configuration diagnostic information, such as Node version, environment variables snapshot (if applicable), and current configuration details. This offers developers and users a quick way to troubleshoot and verify their setup, aligning with our mission of reliability and user-friendliness.

## Implementation
- **Source File (src/lib/main.js):**
  - Extend the input validation using the zod library to include a schema for the `--diagnostics` flag.
  - If `--diagnostics` is detected among the CLI arguments, bypass other validations and print detailed diagnostic information (e.g., Node version, current environment variables, and any relevant configuration parameters).
  - Maintain backward compatibility by ensuring that if no CLI flags are provided (or only non-diagnostic flags are given), the parser behaves as previously defined.

- **Test File (tests/unit/main.test.js):**
  - Add test cases to simulate running the CLI with the `--diagnostics` flag.
  - Verify that the output includes key diagnostic details without triggering errors.

- **Documentation Updates (README.md):**
  - Update the CLI usage section to include examples and usage instructions for the new `--diagnostics` flag.
  - Document the expected behavior and output when the flag is used.

## Benefits
- Provides an easy way for developers and users to verify system configuration and environment setup.
- Enhances troubleshooting capabilities by offering immediate diagnostic output when issues arise.
- Strengthens the overall robustness and professionalism of the CLI tool, furthering our mission to be the go-to plot library for formula visualisations.

## Testing and Validation
- Run `npm test` to validate that new tests cover the diagnostics functionality.
- Execute `npm run start -- --diagnostics` to manually observe the diagnostic output in the console.
