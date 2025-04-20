# INTERACTIVE Feature Enhancement

This feature introduces an interactive mode in the CLI tool. When the user provides the `--interactive` flag, the tool will prompt for any missing parameters (such as mathematical expression, range, and output file type) via the command line.

## Overview

- **Interactive Mode Trigger:** When the `--interactive` flag is provided, the tool will check if all required parameters (`--expression`, `--range`, `--file`) are present. If not, it will prompt the user to enter them interactively.
- **Seamless Fallback:** If the user provides all parameters explicitly, the interactive mode will not interfere. It only activates when necessary.
- **User Convenience:** This mode provides a more friendly experience for users who are less comfortable with supplying command-line arguments or want to experiment with different inputs quickly.
- **Integration:** Changes remain confined to the source file, test file, and README file content without adding new files, keeping the repository compact and focused.

## Implementation Details

### Source Code Changes (src/lib/main.js)

- **Argument Parsing:** Update the argument parser to check if the `--interactive` flag is present. 
- **Interactive Prompt:** If `--interactive` is active and any of `--expression`, `--range`, or `--file` are missing, use Node’s `readline` module to prompt the user for input.
- **Input Validation:** Validate the received input similarly as in the non-interactive mode. 
- **Processing Flow:** Once all required parameters are available (either from command-line or interactive input), proceed with the usual processing (CSV, PNG, or SVG generation).

### Test Enhancements (tests/unit/main.test.js)

- **Simulating Interactive Mode:** Add tests that simulate the interactive mode by mocking `readline` and its input/output to ensure prompts are displayed and that the provided user inputs are processed correctly.
- **Non-blocking Behavior:** Ensure that when `--interactive` is provided along with complete parameters, the behavior remains unchanged.

### Documentation Updates (README.md)

- **Usage Instructions:** Update the README to document the new `--interactive` flag. Include examples such as:
  ```sh
  node src/lib/main.js --interactive
  ```
- **Interactive Flow Description:** Explain that if certain parameters are omitted, the CLI will prompt the user to input them, and it will validate the responses using the same logic as direct CLI parameters.

## Conformance with Mission and Guidelines

- **Mission Alignment:** This feature helps make the CLI more user-friendly, lowering the barrier for new users to generate plots from mathematical expressions.
- **Repository Guidelines:** All changes are confined to modifying existing files (source, tests, README), ensuring compliance with repository standards.

By merging interactive input capabilities into the CLI, users gain a more accessible and exploratory workflow, enhancing overall usability without compromising on the minimalistic approach.