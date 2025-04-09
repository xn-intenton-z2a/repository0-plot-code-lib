# REPL_MODE

## Overview
This feature enhances the interactive experience by replacing the current stub for interactive mode with a full-fledged Read-Eval-Print Loop (REPL). The REPL_MODE will allow users to iteratively input plot specifications, receive immediate feedback with rendered outputs and error messages, and experiment with different formulae in real-time from the command line.

## Key Objectives
- **Interactive Prompt:** Implement a robust command-line REPL that supports continuous input of plot specifications and immediate plotting feedback.
- **Enhanced User Feedback:** Offer detailed error messages and suggestions for correction, leveraging existing validation from PLOT_ENGINE. Users will be able to view computed results and debugging information upon request (using the debug flag).
- **Command History & Session Management:** Include a simple history mechanism to recall previous commands and support session-level context if necessary.
- **Seamless Integration:** Integrate with existing modules (PLOT_ENGINE and TEXT_OUTPUT) to ensure consistency in plot generation and output formatting, aligning with the repository’s mission of providing versatile plotting tools.
- **Testing and Documentation:** Update the documentation in README and CONTRIBUTING files. Add unit tests to validate REPL behavior (e.g., correct command parsing, history functionality, and error handling).

## Design & Implementation
- **Implementation:** Build the REPL functionality in a single source file (or as an extension of the existing CLI module) using Node.js's built-in readline module. This minimizes new dependencies and ensures the feature remains lightweight.
- **Integration:** The REPL_MODE will serve as an alternative entry point triggered by the `--interactive` flag, converting it from a stub to a fully interactive session.
- **Error Handling:** Leverage error messages and diagnostic logging from the PLOT_ENGINE, ensuring users receive actionable feedback when invalid input is encountered.
- **Usage:** Provide clear instructions and examples in the documentation so users know how to activate and utilize the interactive mode.

## Usage Examples
- **Activate REPL Mode:**
  ```bash
  node src/lib/main.js --interactive
  ```
- **Sample REPL Session:**
  Once in REPL mode, the prompt will allow commands such as:
  ```
  > quad:1,0,0,-10,10,1
  Generating plot... [output: SVG]
  > expr:Math.sin(x)*x:-10,10,0.5
  Rendering JSON output...
  ```
- **Debugging:** Use the `--debug` flag within the REPL to view detailed computation and logging if needed.
