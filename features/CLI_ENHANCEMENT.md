# CLI_ENHANCEMENT Update

## Overview
This update enhances the CLI functionality to include two additional flags: `--stats` and `--diagnostics`. In addition to its existing capabilities for generating SVG and PNG plots from mathematical expressions and CSV data, the CLI will now be able to provide basic statistical summaries and diagnostic information. The `--stats` flag will trigger a calculation of summary metrics (minimum, maximum, and average) for computed y-values, while the `--diagnostics` flag will output useful environment and configuration details for troubleshooting.

## Implementation Details
### Source File Updates (src/lib/main.js)
- **Argument Parsing**: Extend the `parseArgs` function to detect the new flags `--stats` and `--diagnostics` and include them in the options object.
- **Main Function Logic**:
  - If `--diagnostics` is present, log diagnostic information including:
    - Node.js version using `process.version`.
    - The parsed CLI options.
    - Any relevant environment or configuration details.
  - If `--stats` is provided (and both `--expression` and `--range` are supplied), compute and display statistical results (minimum, maximum, average) for the set of computed y-values. An initial dummy implementation is acceptable.
- **Fallback Behavior**: Ensure that the new flags do not interfere with the existing SVG and PNG file generation functionality.

### Test File Enhancements (tests/unit/main.test.js)
- Add tests to verify that:
  - When `--diagnostics` is used, the CLI outputs diagnostic information (using spies on `console.log` or `console.error`).
  - The `--stats` flag triggers statistical computations and outputs the expected summary when valid inputs are provided.

### README Updates (README.md)
- Update the CLI usage examples to include the new flags. For instance:
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.svg --stats
  node src/lib/main.js --diagnostics
  ```
- Document the purpose of `--stats` (to provide statistical analysis) and `--diagnostics` (to output environment and debug information).

### Dependencies File (package.json)
- No additional dependencies are required. The current modules (including Node.js built-in modules) suffice to implement these features.

## Rationale
Integrating diagnostic and statistical features into the CLI enhances the tool’s utility and robustness. By providing quick insights and troubleshooting information, this update aligns with the mission to be the go-to plot library, making it easier for users and developers to validate and debug their plotting commands without external tools.