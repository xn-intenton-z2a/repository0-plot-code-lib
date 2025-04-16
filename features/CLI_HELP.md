# CLI_HELP Feature Specification

## Overview
This feature introduces a dedicated help mode to the CLI tool. When a user supplies the `--help` flag, the tool will output a detailed usage guide, explaining all available options and flags. This enhancement improves usability and aligns with the mission of making the tool user-friendly and accessible.

## Implementation
### Source Code Changes (src/lib/main.js)
- Add a check for the `--help` flag at the beginning of the CLI argument parsing.
- When `--help` is detected, output a usage message that details:
  - The purpose of the tool
  - Descriptions of all flags: `--expression`, `--range`, `--file`, `--samples`, `--maintenance`, `--diagnostics`, `--verbose`, and `--help` itself.
- Ensure that when the help message is shown, no further processing occurs.

### Test File Updates (tests/unit/main.test.js)
- Add a test case to verify that passing the `--help` flag outputs the appropriate help message.
- The test should confirm that the help message contains sections explaining each available CLI option.

### Documentation Updates (README.md)
- Update the CLI Usage section to add a new subsection for the `--help` flag.
- Provide clear examples demonstrating how to invoke the help mode.

## Compatibility and Mission Alignment
- This enhancement is fully backward compatible; existing functionalities are not affected.
- It improves user assistance and reduces potential command misuse, supporting the mission of providing a go-to, user-friendly CLI tool for formula visualizations.
