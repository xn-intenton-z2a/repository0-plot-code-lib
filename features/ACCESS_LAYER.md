# ACCESS_LAYER

## Overview
This feature consolidates the interactive CLI and web API into a single, unified access layer while providing advanced diagnostics and now enhanced interactive functionality through command history support. This update not only maintains the unified interface for plot generation and analysis but also improves the user experience in interactive mode by storing and retrieving past commands.

## Key Objectives
- **Unified Interface:** Merge interactive CLI and HTTP-based endpoints into one module for plot generation and analysis.
- **Seamless Mode Switching:** Enhance the CLI parser to detect and handle flags: `--interactive`, `--serve`, and `--diagnostics` with robust error handling and shared logging.
- **Diagnostics Mode:** When invoked with `--diagnostics`, output detailed system and configuration information (version info, environment variables, dependency versions, etc.) to aid debugging and health checks.
- **Command History in Interactive Mode:** Introduce command history functionality during interactive sessions:
  - **Persistence:** Save past commands/formulae to a local history file (e.g., `.plot_history` in the user's home directory).
  - **Retrieval:** Allow users to navigate through previous entries using simple key commands.
  - **Extension:** Provide a foundation to add more advanced history search or filtering options in future iterations.
- **Consistent Experience:** Retain shared input validation, error messaging, and logging across all modes (CLI, web API, and diagnostics) for a uniform user experience.
- **Simplified Maintenance:** By centralizing access, diagnostics, and interactive command history into one module, the codebase remains maintainable and extensible.

## Design & Implementation
### Mode Detection and Routing
- **Flag Handling:** Detect flags including `--interactive`, `--serve`, and `--diagnostics` in the main CLI parser.
- **Routing:** Direct commands to the appropriate handler (interactive session, web server, or diagnostics output).

### Enhanced Interactive Mode
- **Command History Storage:** Implement a mechanism to store entered formulas/commands in a history file stored in the user’s home directory.
- **Navigation:** Allow users to recall previous commands easily (for example, using up/down arrow key simulation or simple command prompts).
- **Integration:** Ensure the command history function integrates seamlessly with existing interactive prompt logic.

### Diagnostics Mode
- **Information Display:** When `--diagnostics` is provided, output system configuration, environment details, and version information to aid troubleshooting.
- **Extendability:** The diagnostics branch can be expanded in the future as new system checks become relevant.

### Documentation & Testing
- **User Guides:** Update README and CONTRIBUTING documentation to illustrate usage of the new command history in interactive mode.
- **Unit Testing:** Extend tests to verify that interactive mode correctly reads, writes, and navigates the command history, alongside verifying mode flag operations.

## Usage Examples
- **Interactive Mode with Command History:**
  ```bash
  node src/lib/main.js --interactive
  # Once in interactive mode, previously entered formulas are available via command history.
  ```
- **Web Interface Access:**
  ```bash
  node src/lib/main.js --serve
  ```
- **Diagnostics Mode:**
  ```bash
  node src/lib/main.js --diagnostics
  ```

This update enhances the ACCESS_LAYER to not only unify CLI and web API access but also improve user interaction by retaining command history, making it easier to reuse and refine plotting commands, thus aligning with the repository's mission of being the go-to plotting and formula visualization tool.