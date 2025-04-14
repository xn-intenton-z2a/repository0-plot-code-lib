# CLI_TOOL Enhancement with Interactive Mode

## Overview
This update refines the CLI_TOOL feature by adding a fully integrated interactive mode. When the CLI is executed with the `--interactive` flag, the tool will prompt the user for essential inputs (such as the function expression, range for x and optionally y, and additional configuration parameters) using Node's built-in `readline` module. This guided input mode simplifies execution for users by prompting for missing parameters interactively, while still preserving backward compatibility with flag-based usage.

## Implementation Details
### Source File (`src/lib/main.js`)
- **Interactive Flag Detection**: At the start of the main function, detect the `--interactive` flag among the CLI arguments.
- **Interactive Prompting**: If the flag is present, initialize the `readline` interface to prompt the user for any missing parameters (e.g., expression, range, file output name, and other optional flags).
- **Argument Merging**: Collect the user responses and merge them with the existing CLI arguments so that subsequent processing (function parsing, data generation, and SVG/PNG rendering) works unchanged.
- **Fallback to CLI Arguments**: When the `--interactive` flag is not provided, maintain the existing flag-based usage.

### Test File (`tests/unit/main.test.js`)
- **Interactive Mode Test Cases**: Add tests to simulate interactive mode by mocking the `readline` module. The tests should cover cases where the user is prompted for inputs and ensure that the merged arguments produce the expected SVG/PNG output or JSON data.

### README File (`README.md`)
- **Update Usage Documentation**: Enhance the CLI usage section to include details about the interactive mode. Document the `--interactive` flag and provide an example command that demonstrates how the tool prompts the user for input.

### Dependencies
- **No New Dependencies**: Continue using Node's built-in `readline` module; no external dependencies are introduced.

## Impact and Benefits
- **Improved User Experience**: New users can input plot parameters step-by-step without needing to know all the required CLI flags.
- **Backward Compatibility**: Existing command-line usage remains unaffected, allowing advanced users to continue using flags directly.
- **Consistency with Mission**: This enhancement aligns with our mission to be the "go-to plot library" by lowering the barrier to entry for generating plots interactively.
