# Interactive Mode Enhancement

## Overview
This feature introduces an interactive mode for the CLI tool. When users provide the `--interactive` flag, the CLI will launch a guided prompt to collect any missing parameters, such as the mathematical expression, range, file output name, and additional configurations. This mode improves usability by allowing users to input parameters step-by-step rather than specifying all CLI flags manually.

## Implementation Details
- **Source File (`src/lib/main.js`):**
  - Detect the presence of the `--interactive` flag early in the argument parsing.
  - When the flag is detected, initialize Node's built-in `readline` module to sequentially prompt the user for any required inputs (e.g., expression, range, output file name, etc.).
  - Merge the collected input responses with any provided CLI arguments, ensuring that subsequent processing (expression compilation, data plotting, etc.) remains unaffected.
  - Maintain backward compatibility by bypassing interactive prompts if the flag is not provided.

- **Test File (`tests/unit/main.test.js`):**
  - Add tests to simulate the interactive mode behavior by mocking the `readline` module. These tests should verify that the CLI correctly launches interactive prompts and that merged arguments produce the expected SVG/PNG output or JSON data.
  
- **README File (`README.md`):**
  - Update the CLI usage documentation to include details about the new interactive mode. Explain how to use the `--interactive` flag and provide example commands.

- **Dependencies:**
  - This feature uses Node's built-in `readline` module, and no additional external dependencies are introduced.

## Impact and Benefits
- **Enhanced User Experience:** New users can be guided through parameter entry, lowering the barrier to generating plots using the CLI tool.
- **Backward Compatibility:** Advanced users who prefer CLI flags can continue using the existing interface without interaction.
- **Alignment with Mission:** By making plotting more accessible, this feature reinforces our mission to be the "go-to plot library".
