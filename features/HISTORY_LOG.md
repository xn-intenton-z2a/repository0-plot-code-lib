# HISTORY_LOG Feature Enhancement

This feature introduces a new CLI flag `--history` that enables persistent logging of every CLI invocation. When users run the tool with the `--history` flag, all the command-line arguments (along with a timestamp) are appended to a history log file (e.g. `plot_history.log`) in the current working directory. This addition allows users to track previous commands, review their inputs, and easily reproduce plots.

## Overview

- **Objective:** Automatically record CLI invocation details when the `--history` flag is provided.
- **Benefit:** Users can review and reuse previous commands. This enhances reproducibility and debugging by keeping a historical record of generated plots.
- **Usage Example:**
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.svg --history
  ```

## Implementation Details

- **Source Code Changes (src/lib/main.js):**
  - Parse a new flag `--history` in the argument loop.
  - After a successful plot/data generation, if the flag is active, append a log entry to a file (e.g. `plot_history.log`).
  - The log entry should include a timestamp and a serialized string of the arguments or a summary of the action performed.
  - Ensure that logging does not interfere with the existing output of CSV, SVG, PNG, etc.

- **Test Enhancements (tests/unit/main.test.js):**
  - Add tests to simulate invoking the CLI with the `--history` flag.
  - Verify that after execution, the history log file exists and contains an entry with the expected content (timestamp and command-line parameters).
  - Clean up the history file in test setup/teardown if necessary.

- **Documentation Updates (README.md):**
  - Update the README to include a section on history logging.
  - Provide examples and instructions indicating that using `--history` will log the command for later reference. For example:
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.svg --history
  ```
  - Explain that the log file (named `plot_history.log`) is created in the working directory and can be reviewed to see previous CLI invocations.

## Conformance with Mission and Guidelines

- All changes remain confined to existing source files, test files, and the README.
- This feature is distinct and achievable in the repository; it provides additional user value and aids reproducibility without requiring a grandiose modification of the codebase.