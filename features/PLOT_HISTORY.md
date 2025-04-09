# PLOT_HISTORY Feature Specification (Enhanced)

## Overview
This feature persists user plot interactions by recording key parameters and inputs used in plot generation. In addition to listing and clearing history records, this update introduces enhanced search and re-run capabilities. Users can now filter their history via query parameters and re-invoke previous plot commands, further aligning with our mission of making the plotting experience reproducible and user-friendly.

## Implementation Details
### History Logging
- **Automatic Recording:** Every plot command (including parameters like formula, interval, step, and optional flags such as color or export paths) is automatically logged as a JSON entry in a local file (e.g., `history.json`).
- **Robust File I/O:** Ensure non-blocking asynchronous read/write operations with comprehensive error handling for issues such as permission errors or file corruption.

### CLI Commands and Enhancements
- **View History (`--history`):**
  - Lists all previous plot commands along with their timestamps and parameters.
  - **New Enhancement:** Supports an optional `--query` flag (e.g., `--history --query sin`) to filter history entries by matching text within the recorded commands.
- **Clear History (`--clear-history`):**
  - Provides a command to delete all existing history records.
- **Re-run History (`--rerun-history`):**
  - Introduces a new flag to re-execute a previously recorded plot command by specifying its unique identifier (e.g., a timestamp or record index).
  - Validates the identifier and retrieves the corresponding command parameters to trigger a new plotting event.

### File Handling for Extended Features
- **Search Functionality:**
  - Implements file reading and in-memory filtering based on the query parameter provided by the user.
  - Displays matching records in a user-friendly format with clear identifiers for re-run capability.
- **Re-run Mechanism:**
  - Extracts the complete set of parameters from a chosen history record and re-invokes the plotting engine with those settings.
  - Provides feedback on command execution and error messages where appropriate.

## Testing and Documentation
### Unit and Integration Tests
- **History Logging Tests:**
  - Simulate plot command execution and validate that `history.json` is updated correctly.
- **CLI Command Tests:**
  - Test retrieval of history with and without the `--query` filter, ensuring accurate and complete listing.
  - Validate that the `--clear-history` command properly purges all records.
  - Confirm that the `--rerun-history` flag retrieves and successfully re-executes the corresponding command.

### Documentation Updates
- **README and CONTRIBUTING:**
  - Update documentation with examples and usage guidelines for the enhanced history features.
  - Include details on filtering history entries and re-running past commands along with troubleshooting common issues.

## Usage Examples
- **Listing History:**
  - Command: `node src/lib/main.js --history`
  - With search filter: `node src/lib/main.js --history --query sin`
- **Clearing History:**
  - Command: `node src/lib/main.js --clear-history`
- **Re-running a Plot Command:**
  - Command: `node src/lib/main.js --rerun-history <record_id>`, where `<record_id>` is the identifier of the history entry.

This update significantly enhances the usability and reproducibility of the plotting library by allowing users to revisit and repeat previous commands with ease, thereby reinforcing our mission of being the go-to tool for formula visualisations.