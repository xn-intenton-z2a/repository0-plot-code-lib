# CLI Enhancement with Help Feature

This update merges the duplicate help flag functionalities into the existing CLI_ENHANCEMENT feature. The feature now robustly handles the `--help` flag by providing a detailed usage guide, in addition to supporting the plot generation and time series generation functionalities.

## Implementation Details

- **Source Code (src/lib/main.js):**
  - Introduce a check at the very beginning of the `main` function to detect if the `--help` flag is provided.
  - When the `--help` flag is detected, print a comprehensive help message that details all available options: `--expression`, `--range`, `--file`, `--stats`, and `--help`.
  - After displaying the help message, the process should exit immediately without processing further options.
  - Ensure that the existing functionalities (plot generation when both `--expression` and `--range` are provided, and time series JSON generation when `--file` is omitted) remain unchanged.

## Testing Enhancements

- **Test File (tests/unit/main.test.js):**
  - Add and update tests to verify that providing the `--help` flag causes the CLI to output the full help message and exit early.
  - Ensure that these tests do not interfere with tests that confirm standard behavior for plot generation and error handling when required options are missing.

## Documentation Updates

- **README (README.md):**
  - Update the CLI Usage section to include a new segment describing the `--help` flag, its purpose, and example usage.
  - Provide example commands demonstrating the help functionality and displaying the expected output.

## Alignment with Mission & Contributing Guidelines

- **Mission Compliance:**
  - Enhancing the CLI with a comprehensive help command further supports the mission of making the tool the go-to library for formulae visualisations by improving accessibility and usability.

- **Contributing Guidelines:**
  - All changes are limited to existing files (source, tests, README, and dependency files).
  - The enhancements follow the repository's coding style, are fully covered by tests, and are documented to guide users and contributors.
