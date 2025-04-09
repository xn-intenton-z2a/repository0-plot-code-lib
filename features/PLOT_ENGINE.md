# PLOT_ENGINE

## Overview
The PLOT_ENGINE is the core plotting module of the repository. It is responsible for converting a wide range of mathematical functions into visual plots across multiple modes of operation including command-line, interactive REPL, and a web-based interface. Building upon its comprehensive plotting capabilities, this update introduces enhanced input validation to ensure robust, user-friendly experiences and to provide more detailed diagnostic feedback when formulas or parameters are incorrect.

## Key Objectives
- **Comprehensive Plot Generation:** Support existing plot types (quadratic, linear, sine, cosine, tangent, polar, exponential, logarithmic and more) while ensuring consistent parsing and visualization.
- **Enhanced Input Validation:** Implement advanced parsing and error detection for mathematical formula inputs across all modes. Feedback will be provided in realtime within the interactive CLI and for batch or web requests.
- **Multi-Modal Operation:** Maintain seamless plot generation via CLI commands, an interactive REPL, and an Express-based web interface.
- **Robust Error Handling & Diagnostics:** Augment existing error logging with detailed validation diagnostics to guide the user in correcting formula syntax errors and parameter mistakes.

## Design & Implementation
### Input Validation Enhancements
- **Validation Module:** Integrate a dedicated input validation layer that leverages the mathjs library for syntax checking and safe evaluation of mathematical expressions.
- **Error Messages:** When an input error is detected, provide clear, actionable error messages that explain the issue and suggest corrective measures.
- **Real-time Checks in REPL:** Enhance the interactive REPL to validate user inputs on-the-fly and display immediate feedback before attempting to generate a plot.

### CLI and File-based Plot Generation
- **Command-line Parsing:** Continue to support the usage of command-line arguments for specifying output types and plot formulations. Now integrated with robust checking to intercept invalid inputs early.
- **Diagnostic Logging:** Update logging mechanisms to output specific details when invalid formulas or unsupported parameters are detected.

### Web Interface
- **Endpoint Validation:** The HTTP API endpoint will incorporate input validation logic to handle query parameter errors gracefully, returning JSON descriptions of any input issues.

### Testing & Quality Assurance
- **Unit Tests:** Extend the existing vitest coverage to include tests for the new validation routines, ensuring that both valid and invalid inputs are handled correctly.
- **Integration Tests:** Validate that enhanced error diagnostics work across interactive, CLI, and web interface modes.

## Usage
- **CLI Quickstart:**
  ```bash
  node src/lib/main.js output.svg "quad:1,0,0,-10,10,1"
  ```
- **Interactive Mode:**
  ```bash
  node src/lib/main.js --interactive
  ```
- **Web Interface:**
  ```bash
  node src/lib/main.js --serve
  ```

This updated PLOT_ENGINE ensures that users can rely on clear guidance and robust error handling across all input methods, further solidifying the repository's role as the go-to tool for formula visualisations.
