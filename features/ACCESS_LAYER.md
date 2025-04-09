# ACCESS_LAYER

## Overview
This update refines the ACCESS_LAYER module by ensuring complete and consistent diagnostics support across the CLI and the web API, and now extends the functionality to enhance the interactive CLI experience. In addition to comprehensive diagnostics (system configuration, dependency information, and runtime metrics) in both human-readable and JSON formats, this update adds a new interactive session enhancement: command history logging and retrieval. This addition empowers users by recording their interactive inputs and allowing retrieval of past commands, thereby streamlining iterative explorations and debugging.

## Key Objectives
- **CLI Diagnostics Integration:**
  - Update the CLI parser (in `src/lib/main.js`) to detect a `--diagnostics` flag early in the argument evaluation.
  - When provided, output detailed system configuration, environment variables, dependency versions (from package.json), and runtime diagnostics, with options for both human-friendly and JSON-formatted outputs.

- **Web API Diagnostics Endpoint:**
  - Extend the Express-based web interface to include a dedicated `GET /diagnostics` endpoint that uses shared diagnostic logic, ensuring consistency across CLI and API outputs.

- **Interactive Session Enhancements:**
  - **Command History Logging:** When the interactive mode (`--interactive`) is activated, capture user input commands along with timestamps and store them in a history file (e.g. `.plot_history`).
  - **History Retrieval:** Introduce a new flag (`--history`) that, when used, reads and displays the recorded interactive session commands, allowing users to review or re-run previous inputs.
  - **Robust File Handling and Security:** Ensure that the history file is managed securely, with proper error handling and file access validations.

- **Consistent Logging and Error Handling:**
  - Integrate robust error handling and logging for both CLI and API components, covering diagnostics and interactive history functionalities. 

## Design & Implementation
### CLI Parser Enhancements (src/lib/main.js)
- Extend the CLI argument parser to handle the new `--history` flag in addition to existing flags (`--diagnostics`, `--interactive`, `--serve`).
- When `--interactive` is invoked, record each user input into a designated history file with proper timestamps.
- When `--history` is detected, read from the history file and output the recorded commands in a user-friendly format.

### HTTP API Updates
- Retain the existing `GET /diagnostics` endpoint in the Express server setup to mirror CLI diagnostics, ensuring unified error handling and logging practices.

### Testing and Documentation
- Update unit tests (e.g. in `tests/unit/main.test.js`) to include scenarios for:
  - Invoking diagnostics via the `--diagnostics` flag.
  - Activating interactive mode and verifying that user inputs are logged.
  - Retrieving history with the `--history` flag and confirming the output.
- Revise both the README.md and CONTRIBUTING.md files to document the new interactive session enhancements, including usage examples:
  - Starting interactive mode and providing inputs will now record commands.
  - Reviewing past commands via `node src/lib/main.js --history`.

## Usage Examples
- **CLI Diagnostics:**
  ```bash
  node src/lib/main.js --diagnostics
  ```

- **Interactive CLI Mode with History Logging:**
  ```bash
  node src/lib/main.js --interactive
  ```
  After using interactive mode, retrieve command history with:
  ```bash
  node src/lib/main.js --history
  ```

- **Web Diagnostics Endpoint:**
  ```bash
  node src/lib/main.js --serve
  ```
  Then access diagnostics at:
  ```bash
  curl http://localhost:3000/diagnostics
  ```

This updated ACCESS_LAYER feature enhances the repository's resilience by coupling robust diagnostics with interactive command history, thereby supporting both immediate troubleshooting and iterative user experimentation.