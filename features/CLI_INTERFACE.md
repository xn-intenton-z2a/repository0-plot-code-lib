# CLI_INTERFACE Feature Specification (Enhanced with Interactive Examples, Library API, Version Info, and Wizard Mode)

## Overview
This feature unifies and enhances the command-line interface by consolidating argument parsing, integrated documentation, auto-completion, dry-run simulation capabilities, and interactive wizard mode. In this update, support for displaying version information has been merged from the previous VERSION_INFO feature. The repository now also exposes a robust programmatic API that enables usage as a JavaScript library. The newly added interactive wizard mode guides users through plot configuration step-by-step, lowering the barrier for new users and aligning with our mission to be the go-to plot library for formula visualisations.

## Implementation Details
### CLI Argument Parsing and Auto-Completion
- **Argument Mapping:**
  - Parses full-length flags (e.g., `--plot`, `--version`, `--diagnostics`, `--export`, `--log`, `--json-log`, `--help`, `--dry-run`, `--examples`, and now `--wizard`) along with shorthand aliases (e.g., `-p`, `-v`, `-d`, `-e`, `-l`, `-j`, `-h`, `-r`).
  - Translates aliases into full commands before dispatching them to respective feature handlers.
  - Incorporates robust validation with descriptive error messages for unrecognized or conflicting flags.

### Integrated Documentation, Help, and Version Info
- **Dynamic Help Output:**
  - Consolidates help documentation for all CLI commands and flags, providing descriptions, usage examples, and troubleshooting tips. Activated via `--help` (or `-h`).
  - Synchronizes with repository documentation (README.md, CONTRIBUTING.md) for consistency.
- **Version Information:**
  - Implements the `--version` flag to display repository version and a short description from `package.json`.
  - Reads directly from `package.json` ensuring users can verify installation details.

### Dry Run Simulation and Interactive Examples
- **Simulation Mode:**
  - Integrates the `--dry-run` (or shorthand `-r`) flag to simulate command processing without executing side effects. Provides a detailed preview including file operations, API call simulations, and parameter validations.
- **Interactive Examples:**
  - Introduces the `--examples` flag that prints curated example commands with explanations to help users understand the CLI functionalities.

### Library API
- **Programmatic Access:**
  - Exposes key plotting and CLI functionalities as a library API through the main source file (`src/lib/main.js`).
  - The exported `main(args)` function can be imported into other Node.js projects, enabling plotting operations with consistent CLI behavior.

### Interactive Wizard Mode
- **Wizard Activation:**
  - A new flag `--wizard` (or shorthand `-w`) initiates an interactive wizard, providing a guided setup for constructing plot commands.
- **User Guidance:**
  - Prompts the user with a series of questions to gather required inputs such as formula, interval, step size, output options, and optional flags like tagging or export.
  - Displays a preview of the configured command before execution, allowing confirmation or editing.
- **Technical Implementation:**
  - Implemented as a lightweight interactive module within the CLI, using Node.js standard input/output streams.
  - Ensures consistency with non-interactive CLI operations and seamlessly integrates with core functionalities such as plot generation and history management.

## Testing and Quality Assurance
- **Unit and Integration Tests:**
  - Verify proper parsing of CLI inputs (both full-length and shorthand).
  - Ensure version display, dry-run simulation, and interactive examples function as expected.
  - New tests cover the interactive wizard mode to simulate user input flows and validate output correctness.
- **Documentation Updates:**
  - README.md and CONTRIBUTING.md are updated with usage examples for the interactive wizard mode, including troubleshooting tips for interactive sessions.

## Usage Examples
- **Standard CLI Usage:**
  - Command: `node src/lib/main.js --plot "sin(x)" --log`
  - Shorthand: `node src/lib/main.js -p "sin(x)" -l`
- **Display Version Information:**
  - Command: `node src/lib/main.js --version`
- **Dry Run Simulation:**
  - Command: `node src/lib/main.js --plot "sin(x)" --dry-run`
- **Interactive Examples Display:**
  - Command: `node src/lib/main.js --examples`
- **Interactive Wizard Mode:**
  - Command: `node src/lib/main.js --wizard`
  - Expected Behavior: Initiates an interactive session that guides the user through entering plot parameters step-by-step and confirms the final command before execution.
- **Library API Usage:**
  - In a Node.js project, import the plotting library using:
    ```js
    import { main } from '@xn-intenton-z2a/repository0-plot-code-lib';
    const args = ['--plot', 'cos(x)', '--export', 'output.txt'];
    main(args);
    ```

## Summary
Integrating the interactive wizard mode into the CLI_INTERFACE enriches the user experience by making plot configuration accessible even to beginners. Coupled with comprehensive help, version info, and a unified CLI and library API, this update reinforces our mission of being the go-to plot library for formula visualisations.