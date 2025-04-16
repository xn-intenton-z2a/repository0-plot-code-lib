# CLI Enhancement with Help Flag

This update refines the unified CLI feature to include a robust `--help` flag. The purpose of this flag is to provide users with a detailed usage guide listing all available commands and options. This enhancement streamlines the user experience and ensures consistency across help documentation, as described in the project's mission.

## Implementation Details

- **Source Code (src/lib/main.js):**
  - Extend the argument parser to check for the `--help` flag. If present, the tool should immediately print a comprehensive usage guide which details all supported flags (`--expression`, `--range`, `--file`, `--stats`, and `--help`) and then exit without further processing.
  - Ensure that the existing functionality for plot generation (when both `--expression` and `--range` are provided with or without the `--file` option) and statistics computation remains intact.
  - Include error handling to cover scenarios where conflicting or insufficient arguments are provided.

## Testing Enhancements

- **Test File (tests/unit/main.test.js):**
  - Add tests verifying that when the `--help` flag is passed, the CLI outputs the full usage guide and does not process further commands.
  - Retain tests for plot generation and time series data computations, ensuring that the introduction of `--help` does not affect those functionalities.

## Documentation Updates

- **README.md:**
  - Update the CLI usage section with a new segment detailing the `--help` flag. Include usage examples to demonstrate how a user can invoke the help feature.
  - Ensure that the documentation clearly outlines the expected output when `--help` is used.

## Alignment with Mission & Contributing Guidelines

- **Mission Compliance:**
  - Enhancing the CLI with a help command aligns with the mission to be a go-to tool for formulae visualisations by improving accessibility and usability.

- **Contributing Guidelines:**
  - All modifications are confined to existing files (source, tests, README, and dependency files). The changes follow the existing coding style and are fully covered by tests.

This update is a targeted and valuable improvement that enhances both usability and clarity of the CLI tool without introducing unnecessary complexity.
