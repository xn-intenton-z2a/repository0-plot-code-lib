# CLI_INTERFACE Feature Specification (Enhanced with Interactive Examples, Library API, and Version Info)

## Overview
This feature unifies and enhances our command-line interface by consolidating argument parsing, integrated documentation, auto-completion, and dry-run simulation capabilities. In this update, support for displaying version information has been merged from the previous VERSION_INFO feature. The repository now also exposes a robust programmatic API that enables usage as a JavaScript library. This dual interface ensures that users can both run plotting commands from the CLI and integrate plotting functionalities directly into their Node.js projects, maintaining our mission of being the go-to plot library for formula visualisations.

## Implementation Details
### CLI Argument Parsing and Auto-Completion
- **Argument Mapping:**
  - Parses full-length flags (e.g., `--plot`, `--version`, `--diagnostics`, `--export`, `--log`, `--json-log`, `--help`, `--dry-run`, `--examples`) along with shorthand aliases (e.g., `-p`, `-v`, `-d`, `-e`, `-l`, `-j`, `-h`, `-r`).
  - Uses a configuration object to translate aliases into full commands before dispatching them to respective feature handlers such as PLOT_ENGINE, HTTP_API, SYSTEM_MONITORING, etc.
  - Incorporates robust validation with descriptive error messages for unrecognized or conflicting flags.

### Integrated Documentation, Help, and Version Info
- **Dynamic Help Output:**
  - Consolidates help documentation for all CLI commands and flags, including descriptions, usage examples, and troubleshooting tips. Activated via `--help` (or `-h`).
  - Synchronizes with repository documentation (README.md, CONTRIBUTING.md) for consistency.
- **Version Information:**
  - Implements the `--version` flag to display the current repository version and a short description from `package.json`.
  - The flag reads directly from `package.json` and presents version and metadata, ensuring users can verify installation details easily.

### Dry Run Simulation and Interactive Examples
- **Simulation Mode:**
  - Integrates the `--dry-run` (or shorthand `-r`) flag to simulate command processing without executing side effects. This mode outputs a detailed preview including file operations, API call simulations, and parameter validations.
- **Interactive Examples:**
  - Introduces the `--examples` flag that prints a curated set of example commands along with explanations to help new users quickly understand the CLI functionalities.

### Library API
- **Programmatic Access:**
  - Exposes key plotting and CLI functionalities as a library API through the main source file (`src/lib/main.js`).
  - The exported `main(args)` function can be imported into other Node.js projects, allowing plotting operations to be easily integrated with consistent CLI behavior.

## Testing and Quality Assurance
- **Unit and Integration Tests:**
  - Ensure that CLI inputs (full-length and shorthand) are correctly parsed, including tests for version display and interactive example outputs.
  - Validate that the library API functions identically to its CLI counterpart, ensuring consistent error handling and output formats.
- **Documentation Updates:**
  - README.md and CONTRIBUTING.md are updated to include usage examples for the new version info flag and other enhancements provided in this unified CLI feature.

## Usage Examples
- **Standard CLI Usage:**
  - Run: `node src/lib/main.js --plot "sin(x)" --log`
  - Shorthand: `node src/lib/main.js -p "sin(x)" -l`
- **Display Version Information:**
  - Command: `node src/lib/main.js --version`
  - Expected output: Displays repository version as read from `package.json` along with a brief description.
- **Dry Run Simulation:**
  - Run: `node src/lib/main.js --plot "sin(x)" --dry-run`
  - Expected output: Detailed simulation of command processing without executing side effects.
- **Interactive Examples Display:**
  - Run: `node src/lib/main.js --examples`
  - Expected output: A curated list of example commands and explanations.
- **Library API Usage:**
  - In a Node.js project, import the plotting library using:
    ```js
    import { main } from '@xn-intenton-z2a/repository0-plot-code-lib';
    const args = ['--plot', 'cos(x)', '--export', 'output.txt'];
    main(args);
    ```

## Summary
Integrating version information directly into the CLI_INTERFACE streamlines the user experience by reducing feature fragmentation. This unification supports both quick CLI interactions and robust programmatic usage, aligning with our mission to provide a simple yet powerful plotting library.
