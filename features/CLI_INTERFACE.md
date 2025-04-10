# CLI_INTERFACE Feature Specification (Enhanced with Interactive Examples and Library API)

## Overview
This feature unifies and enhances our command-line interface by consolidating argument parsing, integrated documentation, auto-completion, and simulation (dry-run) capabilities. In this update, not only are interactive examples provided, but the repository now also exposes a robust programmatic API that enables usage as a JavaScript library. This dual interface ensures that users can both run plotting commands from the CLI and integrate plotting capabilities directly into their Node.js projects, fully aligning with our mission to be the go-to plot library for formula visualisations.

## Implementation Details
### CLI Argument Parsing and Auto-Completion
- **Argument Mapping:**
  - Parses full-length flags (e.g., `--plot`, `--diagnostics`, `--export`, `--log`, `--json-log`, `--help`, `--dry-run`, and the new `--examples`) along with shorthand aliases (e.g., `-p`, `-d`, `-e`, `-l`, `-j`, `-h`, `-r`).
  - Uses a configuration object to translate aliases into full commands before dispatching them to the respective feature handlers (such as PLOT_ENGINE, HTTP_API, SYSTEM_MONITORING, etc.).
  - Incorporates robust validation with descriptive error messages for unrecognized or conflicting flags.
- **Auto-Completion Subsystem:**
  - Generates shell-specific scripts (bash, zsh, fish) to enable auto-completion of CLI commands and flags.
  - Provides suggestions for both full and shorthand flags, streamlining command usage.

### Integrated Documentation and Help
- **Dynamic Help Output:**
  - Consolidates help documentation for all CLI commands and flags, including descriptions, usage examples, and troubleshooting tips.
  - Activated via `--help` (or `-h`), the help command covers argument parsing, auto-completion installation, and usage instructions for integrated features such as HTTP_API, PLOT_ENGINE, SYSTEM_MONITORING, and the new Library API.
  - Synchronizes with repository documentation (README.md, CONTRIBUTING.md) for consistency.

### Dry Run Simulation Integration and Enhancements
- **Simulation Mode:**
  - Integrates the `--dry-run` (or shorthand `-r`) flag to enable a simulation mode where commands are parsed and validated without triggering side effects (e.g., file writes, network calls, or state changes).
  - Outputs a detailed, non-invasive report of the actions that would be performed including a preview of plotting parameters, diagnostic checks, API calls, and potential warnings about malformed inputs.
- **Verbose Reporting:**
  - Provides a detailed summary including a step-by-step outline of CLI command processing, validation outcomes, and a preview of file operations, API endpoints, and configuration changes.

### Interactive Examples
- **Overview:**
  - Introduces a new CLI flag `--examples` that, when invoked, displays a curated set of example commands directly in the terminal. This aids new users in quickly understanding the range of CLI functionalities without needing to refer to external documentation.
- **Implementation:**
  - When the flag is detected, the CLI prints a series of command examples along with brief explanations covering common tasks such as plotting functions, using dry-run mode, and combining multiple flags for advanced operations.
  - Example outputs are maintained as part of the source code and automatically updated to remain consistent with feature updates.

### Library API
- **Overview:**
  - In addition to CLI support, the repository now functions as a JavaScript library. The core plotting functionality is exposed as a programmatic API.
- **Implementation Details:**
  - The main source file (`src/lib/main.js`) exports a well-documented function (`main(args)`) that can be invoked from other Node.js projects.
  - This API is designed to be simple yet versatile, allowing developers to pass command-line argument arrays or custom configurations directly into the plotting engine.
  - Comprehensive unit tests ensure that the library interface behaves identically to its CLI counterpart, reinforcing consistency in error handling and output generation.

## Testing and Quality Assurance
- **Unit and Integration Tests:**
  - Test coverage includes a wide range of CLI inputs (both full-length and shorthand) to verify accurate argument parsing and auto-completion script generation.
  - Additional tests are included to ensure that the Library API behaves as expected when imported into external projects.
  - Simulation and interactive example outputs are validated for consistency with repository documentation.

## Usage Examples
- **Standard CLI Usage:**
  - Run: `node src/lib/main.js --plot "sin(x)" --log`
  - Shorthand: `node src/lib/main.js -p "sin(x)" -l`
- **Dry Run Simulation with Verbose Reporting:**
  - Run: `node src/lib/main.js --plot "sin(x)" --dry-run`
  - Expected output: A detailed report summarizing the command processing, parameter validation, and simulated file or network operations.
- **Interactive Examples Display:**
  - Run: `node src/lib/main.js --examples`
  - Expected output: A curated list of example commands and their explanations.
- **Library API Usage:**
  - In a Node.js project, import the plotting library using:
    ```js
    import { main } from '@xn-intenton-z2a/repository0-plot-code-lib';
    
    // Example usage
    const args = ['--plot', 'cos(x)', '--export', 'output.txt'];
    main(args);
    ```
  - This enables developers to integrate plotting functionality directly into their codebase with consistent behavior as the CLI tool.
