# ACCESS_LAYER

## Overview
This feature consolidates diagnostics, interactive session enhancements, and an integrated tutorial mode into a unified CLI and API experience. It centralizes interactive user guidance including command history logging and a step-by-step walkthrough for new users, while maintaining robust diagnostics for both CLI and web endpoints.

## Key Objectives
- **Unified CLI Experience:** Enhance the CLI to support multiple modes including diagnostics (--diagnostics), interactive session (--interactive), and an onboarding tutorial (--tutorial).
- **Robust Diagnostics:** Continue to provide detailed system configuration, runtime metrics, and dependency information in both human-readable and JSON formats via CLI and a dedicated web API endpoint (/diagnostics).
- **Interactive Session Enhancements:** Implement command history logging with secure file handling, along with a command retrieval feature (--history), enabling users to review past interactions.
- **Onboarding Tutorial Mode:** Integrate a guided tutorial that activates with the --tutorial flag. This mode will present a welcome message, step-by-step instructions on plot generation, usage of diagnostics, interactive mode, and text output options, ensuring a smooth onboarding process.

## Design & Implementation
### CLI Parser Enhancements (src/lib/main.js)
- **Diagnostics Flag:** Process the --diagnostics flag to display detailed system and runtime diagnostics in both formatted text and JSON.
- **Interactive Mode:** When --interactive is passed, activate the interactive session with logging of user commands, including timestamping and secure storage in a history file.
- **Tutorial Mode:** Detect the --tutorial flag to launch an interactive onboarding guide that walks the user through various functionalities, including generating plots, using diagnostics, and understanding CLI flags. The tutorial will prompt for confirmations and provide sample command executions.

### Web API Integration
- **GET /diagnostics Endpoint:** Maintain the existing diagnostics endpoint to serve the same data as the CLI diagnostics output, ensuring consistency.

### Testing and Documentation
- **Testing:** Expand unit tests to cover scenarios for diagnostics, interactive session logging (including history retrieval), and the new tutorial mode. This includes tests for correct flag parsing and guided interactions.
- **Documentation:** Update README.md and CONTRIBUTING.md to include detailed instructions and examples for using the tutorial mode alongside diagnostics and interactive features.

## Usage Examples
- **Diagnostics:**
  ```bash
  node src/lib/main.js --diagnostics
  ```
- **Interactive Session:**
  ```bash
  node src/lib/main.js --interactive
  ```
  To retrieve command history:
  ```bash
  node src/lib/main.js --history
  ```
- **Tutorial Mode:**
  ```bash
  node src/lib/main.js --tutorial
  ```
- **Web Diagnostics Endpoint:**
  ```bash
  node src/lib/main.js --serve
  ```
  Then access via:
  ```bash
  curl http://localhost:3000/diagnostics
  ```