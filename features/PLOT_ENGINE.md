# PLOT_ENGINE

## Overview
This feature is the core plotting and debugging engine of the repository. It merges the original PLOT_ENGINE functionalities with enhanced debug logging originally provided by the DEBUG_MODE feature. The updated module supports robust plot generation, enhanced input validation, and comprehensive debug diagnostics across all modes of operation (CLI, interactive REPL, and web interface).

## Key Objectives
- **Comprehensive Plot Generation:** Continue to support various plot types (quadratic, linear, sine, cosine, tangent, polar, exponential, logarithmic, etc.) with consistent parsing and visualization.
- **Enhanced Input Validation:** Integrate an advanced parsing layer using mathjs to verify mathematical expressions and provide clear, actionable error messages.
- **Integrated Debug Logging:** Enable detailed logging of intermediate computation steps when the `--debug` flag is provided. This includes logging during formula parsing, data generation, computation operations, and error handling. The debug mode is non-invasive and activated only on demand.
- **Multi-Modal Support:** Seamlessly handle plotting and debugging across CLI commands, interactive REPL sessions, and the Express-based web interface.
- **Robust Error Diagnostics:** Augment error handling with detailed diagnostic feedback to help users identify and resolve issues efficiently.

## Design & Implementation
### CLI Integration
- **Flag Handling:** Update the main argument parser to recognize the `--debug` flag along with standard plot and output arguments. When enabled, all operations (plot generation, calculations, and text output) emit additional logging.
- **Unified Logger:** Develop a modular logging component that wraps standard console logging, ensuring that debug information is output only when requested.

### Core Plotting & Debug Operations
- **Plot Generation:** Leverage the existing PLOT_ENGINE logic to process plot specifications and generate visual outputs. Validate inputs early and generate detailed logs for each step of the plotting process when in debug mode.
- **Debug Logging Details:** Log raw input, intermediate parsing results, computed numerical data, and output preparation steps. Ensure performance is not impacted during normal operations.

### Testing & Quality Assurance
- **Unit Tests:** Extend the vitest suite to verify both regular and debug modes. Tests should confirm that enabling the debug flag produces the expected detailed logging while standard operation remains unaffected.
- **Documentation Update:** Revise README and CONTRIBUTING documents to include usage examples for debug mode.

## Usage Examples
- **Standard Plot Generation:**
  ```bash
  node src/lib/main.js output.svg "quad:1,0,0,-10,10,1"
  ```
- **Debug Mode Activation:**
  ```bash
  node src/lib/main.js output.svg "quad:1,0,0,-10,10,1" --debug
  ```
- **Interactive Debug:**
  ```bash
  node src/lib/main.js --interactive --debug
  ```

This consolidated feature leverages the robustness of the PLOT_ENGINE while incorporating critical debug diagnostics, ensuring both high-quality visualizations and effective troubleshooting capabilities.
