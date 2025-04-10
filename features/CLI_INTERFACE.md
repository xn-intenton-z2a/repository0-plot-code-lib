# CLI_INTERFACE Feature Specification (Enhanced with Interactive Examples)

## Overview
This feature unifies and enhances our command-line interface by consolidating argument parsing, integrated documentation, auto-completion, and simulation (dry-run) capabilities. In this update, an interactive examples mode is added to aid users in exploring usage scenarios without referring to external documentation. This consolidation simplifies maintenance, improves usability, and fully aligns with our mission to provide a go-to plot library for formula visualisations.

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
  - Activated via `--help` (or `-h`), the help command covers argument parsing, auto-completion installation, and usage instructions for integrated features such as HTTP_API, PLOT_ENGINE, SYSTEM_MONITORING, and others.
  - Synchronizes with repository documentation (README.md, CONTRIBUTING.md) for consistency.

### Dry Run Simulation Integration and Enhancements
- **Simulation Mode:**
  - Integrates the `--dry-run` (or shorthand `-r`) flag to enable a simulation mode where commands are parsed and validated without triggering side effects (e.g., file writes, network calls, or state changes).
  - Outputs a detailed, non-invasive report of the actions that would be performed including a preview of plotting parameters, diagnostic checks, API calls, and potential warnings about malformed inputs.
- **Verbose Reporting:**
  - Enhances simulation mode by providing a verbose summary. This summary includes:
    - A step-by-step outline of CLI command processing.
    - Validation results for each parameter.
    - An action preview that details file operations, API endpoints to be called, and configuration changes that would have occurred.
  - This detailed preview aids in debugging and ensures users can confidently verify command behavior before actual execution.

### Interactive Examples
- **Overview:**
  - Introduces a new CLI flag `--examples` which, when invoked, displays a curated set of usage examples directly in the terminal. This helps new users quickly understand the range of CLI functionalities without needing to search external documentation.
- **Implementation:**
  - When the `--examples` flag is detected, the CLI prints out a series of example commands along with brief explanations. These examples cover common tasks such as plotting functions, using dry-run mode, and combining multiple flags for advanced operations.
  - The examples are maintained as part of the source code and updated in tandem with other documentation, ensuring consistency.
- **Integration with Help:**
  - The output from `--examples` is linked to the dynamic help system, allowing users to see a reference section within the full help documentation when `--help` is invoked.

## Testing and Quality Assurance
- **Unit and Integration Tests:**
  - Simulate a wide range of CLI inputs (both full-length and shorthand) to verify accurate argument mapping and parsing.
  - Automatically generate and validate auto-completion scripts for different shells.
  - Test dynamic help output for consistency with repository documentation.
  - Validate that simulation mode (`--dry-run`) outputs a comprehensive summary report without triggering actual actions.
  - New tests ensure that the `--examples` flag outputs the expected series of example commands with accurate descriptions.

## Usage Examples
- **Standard CLI Usage:**
  - Run: `node src/lib/main.js --plot "sin(x)" --log`
  - Shorthand: `node src/lib/main.js -p "sin(x)" -l`

- **Dry Run Simulation with Verbose Reporting:**
  - Run: `node src/lib/main.js --plot "sin(x)" --dry-run`
  - Expected output: A detailed report summarizing the steps of generating a plot of "sin(x)", detailing parameter validation, simulation of file and network operations, and any warnings for incorrect inputs.

- **Auto-Completion Generation:**
  - Run: `node src/lib/main.js --generate-completion`

- **Help Display:**
  - Run: `node src/lib/main.js --help`

- **Interactive Examples Display:**
  - Run: `node src/lib/main.js --examples`
  - Expected output: A curated list of example commands along with explanations, demonstrating various CLI functionalities.
