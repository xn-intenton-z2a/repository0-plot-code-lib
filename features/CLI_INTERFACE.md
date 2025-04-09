# CLI_INTERFACE Feature Specification

## Overview
This feature unifies and enhances our command-line interface by consolidating argument parsing, integrated documentation, auto-completion, and simulation (dry-run) capabilities. It now supports not only detailed parsing and help but also a simulation mode that previews actions without execution. This consolidation simplifies maintenance, improves usability, and fully aligns with our mission to provide a go-to plot library for formula visualisations.

## Implementation Details
### CLI Argument Parsing and Auto-Completion
- **Argument Mapping:**
  - Parses full-length flags (e.g., `--plot`, `--diagnostics`, `--export`, `--log`, `--json-log`, `--help`, `--dry-run`) along with shorthand aliases (e.g., `-p`, `-d`, `-e`, `-l`, `-j`, `-h`, `-r`).
  - Utilizes a configuration object to translate aliases into full commands before dispatching them to the respective feature handlers (such as PLOT_ENGINE, DIAGNOSTICS, HTTP_API, and LOGGING).
  - Ensures robust validation with descriptive error messages for unrecognized or conflicting flags.

- **Auto-Completion Subsystem:**
  - Generates shell-specific scripts (bash, zsh, fish) to enable auto-completion of CLI commands and flags.
  - Provides suggestions for both full and shorthand flags, streamlining command usage.

### Integrated Documentation and Help
- **Dynamic Help Output:**
  - Consolidates help documentation for all CLI commands and flags, including descriptions, usage examples, and troubleshooting tips.
  - Activated via `--help` (or `-h`), the help command covers argument parsing, auto-completion installation, and usage instructions for integrated features such as HTTP_API, PLOT_ENGINE, DIAGNOSTICS, and LOGGING.
  - Synchronizes with repository documentation (README.md, CONTRIBUTING.md) for consistency.

### Dry Run Simulation Integration
- **Simulation Mode:**
  - Incorporates the `--dry-run` (or shorthand `-r`) flag into the CLI, enabling a simulation mode where commands are parsed and validated without triggering any side effects such as file, network, or state changes.
  - Outputs a detailed, non-invasive report of the actions that would be performed (e.g., plotting parameters, diagnostics checks, API calls), including any potential warnings for malformed inputs.
  - Supports combined usage with other flags (e.g., `--plot`, `--diagnostics`) and respects the overall command flow while ensuring that no external operations are executed.

### Error Handling and Defaults
- Validates and parses all incoming arguments with clear error reporting.
- Ensures that simulation mode coexists with standard operations in a reversible and non-invasive manner.

## Testing and Quality Assurance
- **Unit and Integration Tests:**
  - Simulate a variety of CLI inputs (both full-length and shorthand) to verify accurate argument mapping and parsing.
  - Automatically generate and validate auto-completion scripts for different shells.
  - Test dynamic help output for accuracy and consistency with repository documentation.
  - Verify that the `--dry-run` mode successfully outputs a detailed summary report without performing any external operations.

## Usage Examples
- **Standard CLI Usage:**
  - Run: `node src/lib/main.js --plot "sin(x)" --log`
  - Shorthand: `node src/lib/main.js -p "sin(x)" -l`

- **Dry Run Simulation:**
  - Run: `node src/lib/main.js --plot "sin(x)" --dry-run`
  - Expected output: A report summarizing that a plot of "sin(x)" would be generated along with parameter details, without actual execution.

- **Auto-Completion Generation:**
  - Run: `node src/lib/main.js --generate-completion`

- **Help Display:**
  - Run: `node src/lib/main.js --help`

This consolidated CLI interface enhances both developer and user experiences by streamlining command processing and providing a safe simulation mode for testing purposes.