# CLI_ASSIST Feature

## Overview
This feature offers an interactive command-line assistant to guide users through plot configuration, dynamic error correction, and visualization of plot setups. It supports both individual command processing and batch mode execution, ensuring a smooth experience for users ranging from beginners to advanced users.

## Interactive Wizard and ASCII Preview
- **Interactive Wizard:**
  - Provides step-by-step guidance using the `--assist` flag to configure plots interactively.
  - Integrates context-sensitive help messages and examples for numeric inputs.
  
- **ASCII Preview Mode:**
  - Option via `--preview` flag renders a quick ASCII art preview of the plot layout.
  - Enables rapid visual checks before full plot generation.

## Enhanced Error Correction and Diagnostics
- **Robust Numeric Validation:**
  - Uses a unified parser with Zod schema for precise numeric conversion.
  - Accepts multiple aliases for Not-a-Number (NaN) values including localized variants.
  - Strictly rejects near-miss tokens (e.g., "n/a") with clear error messages listing accepted tokens.
  
- **Customizable Error Handling:**
  - Allows an optional error handling callback in the numeric parameter parser.
  - Integrates with custom diagnostic tools to provide users with detailed suggestions and recovery options.
  
- **Dynamic Diagnostics:**
  - When enabled (via `DEBUG_NUMERIC`), outputs internal normalization steps and alias resolutions.
  - Offers troubleshooting advice for correcting invalid inputs directly in the CLI.

## Batch Processing Mode
- **Overview:**
  - Processes multiple plot commands read from a text file using the `--batch <filepath>` flag.
  - Each line in the file is treated as a distinct plotting command following the same validation and parsing rules as individual inputs.

- **Command Processing:**
  - Sequentially handles each command, logging errors while allowing subsequent commands to proceed.
  - Integrates with interactive diagnostics to report cumulative issues at the end of batch processing.

## Integration and Testing
- **Backward Compatibility:**
  - Maintains full support for previous CLI operations when batch or interactive modes are not used.

- **Testing:**
  - Extend unit tests to verify both individual and batch mode operations, including error handling callbacks.
  - Integration tests simulate complete workflows with varied numeric scenarios, including localized NaN aliases and JSON-based parameter overrides.

## Future Enhancements
- Consider additional features such as parallel batch processing, in-depth logging levels, and real-time adjustment suggestions for numeric parameter inputs.
- Explore deeper integration with external help frameworks to auto-generate improved documentation for command-line tips and troubleshooting.
