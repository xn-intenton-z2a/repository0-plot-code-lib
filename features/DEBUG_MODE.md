# DEBUG_MODE

## Overview
The DEBUG_MODE feature introduces a debug logging facility into the repository. This feature provides detailed insights into the internal processing of mathematical formulas and plotting computations. When enabled via a command-line flag (e.g., `--debug`), it will output intermediate states, parsed data, and step-by-step computation details that are especially useful for troubleshooting and verifying the computation pipeline. This mode is designed primarily for developers and advanced users who need to understand the inner workings of the system.

## Key Objectives
- **Detailed Logging:** Capture and log intermediate processing steps, including formula parsing, expression evaluation, and data generation used by both the PLOT_ENGINE and CALC_ENGINE.
- **Seamless Integration:** Ensure that debug output can be enabled or disabled easily from the CLI without impacting the normal output or performance of standard operations.
- **Multi-Mode Support:** Extend debug logging across all operation modes including CLI commands, interactive REPL sessions, and the Express-based web interface.
- **Non-Invasive Implementation:** Use conditional logging so that performance in production mode remains unaffected. Debug information should not be exposed in standard output unless explicitly requested.

## Design & Implementation
### CLI & Mode Integration
- **Flag Handling:** Update the main command-line argument parser (in `src/lib/main.js`) to recognize a `--debug` flag. When set, the system will activate enhanced logging.
- **Modular Logging:** Implement a dedicated debug logger that wraps existing console log functionality. This logger can be imported and used by the PLOT_ENGINE, CALC_ENGINE, and TEXT_OUTPUT modules without interfering with their logic.

### Logging Details
- **Input and Parsing:** Log the raw input formula, intermediate parsing results, and validation outcomes.
- **Computation Steps:** Capture data processed at key computation steps such as numerical evaluation and derivative or area calculations.
- **Output Preparation:** Log the steps taken during the conversion of data into the chosen output format (SVG, Markdown, ASCII, CSV, etc.).

### Testing & Quality Assurance
- **Unit Tests:** Extend the current vitest suite to include tests for the `DEBUG_MODE` flag. Tests should ensure that enabling debug mode produces the expected verbose output without altering the primary functionality.
- **Documentation:** Update the README and CONTRIBUTING guidelines with examples on how to enable and utilize the debug mode for troubleshooting.

## Usage Examples
- **Standard Operation:**
  ```bash
  node src/lib/main.js output.svg "quad:1,0,0,-10,10,1"
  ```
- **Debug Mode Activated:**
  ```bash
  node src/lib/main.js output.svg "quad:1,0,0,-10,10,1" --debug
  ```
- **Interactive Debug:**
  ```bash
  node src/lib/main.js --interactive --debug
  ```

This enhancement provides deep insights into internal operations while ensuring that production usage remains clean and efficient.