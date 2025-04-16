# CLI Enhancement Update

This update refines the unified CLI feature to include a new `--help` flag in addition to the existing functionality for plot generation and statistics computation. The goal is to simplify the user experience by offering comprehensive guidance directly from the CLI, while consolidating the separate STATS and PLOT features into one.

## Implementation Details

- **CLI Arguments Update:**
  - Extend the argument parser in `src/lib/main.js` to recognize a new `--help` flag. When this flag is present, the tool should immediately print a detailed usage guide that includes information about all supported flags (`--expression`, `--range`, `--file`, `--stats`, and `--help`) and exit without processing further commands.
  - Preserve the existing logic for handling plot generation (`--expression`, `--range`, `--file`) and statistics computation (`--stats`), ensuring that both functionalities work seamlessly when their flags are provided.

## Testing Enhancements

- **Source & Test Updates:**
  - Update `tests/unit/main.test.js` to include tests that verify the correct output when the `--help` flag is used, ensuring that the CLI prints the comprehensive usage guide.
  - Retain and update tests for existing plot generation and statistics output to confirm that they properly function under merged logic.

## Documentation Updates

- **README.md:**
  - Update the CLI usage documentation to include details on the new `--help` flag. Provide clear examples and output expectations. This should include a section on how to invoke help to assist users in correctly using all available commands.

## Mission & Contributing Alignment

- **Mission Compliance:**
  - Enhancing the CLI to offer a robust help function aligns with the mission to be the go-to plot library for formulae visualisations by improving user accessibility and clarity.

- **Contributing Guidelines:**
  - All modifications are confined to existing files (source code, tests, README, and dependency files) ensuring that the changes adhere to the guidelines in `CONTRIBUTING.md`. No new files are added and no deletions occur apart from merging overlapping features.
