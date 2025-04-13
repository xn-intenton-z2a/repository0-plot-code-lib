# CLI_DIAGNOSTICS Feature

## Overview

This feature adds a diagnostics mode to the CLI interface. When the user passes the `--diagnostics` flag, the application will bypass the regular plotting functionality and instead output key system and configuration details. This information includes Node.js version, dependency versions (as declared in package.json), environment variables, and other runtime diagnostic information. This feature supports easier debugging and verification of the installation and runtime environment, aligning with our mission of being a go-to plotting tool by providing transparent insights into the tool’s operation.

## Technical Changes

- **Argument Parsing:**
  - Update the argument parser in `src/lib/main.js` to recognize the `--diagnostics` flag.
  - If `--diagnostics` is detected, skip normal plotting logic and trigger diagnostics output.

- **Diagnostics Output:**
  - Collect and display relevant runtime information such as:
    - Node.js version (via `process.version`)
    - Current platform (via `process.platform`)
    - Versions of major dependencies (read from `package.json` if necessary, or hard code from the running environment)
    - Any other environment details that might assist with debugging
  - Use clear and concise console logging for output.

- **Code Organization:**
  - Encapsulate the diagnostics logic within its own section inside `src/lib/main.js` so that it remains maintainable.
  - Ensure that when diagnostics mode is active, the program exits gracefully after outputting the diagnostics information.

## Testing

- **Unit Tests:**
  - Update `tests/unit/main.test.js` to add tests that simulate the `--diagnostics` flag input and verify that the output contains expected diagnostic information (e.g., Node version, platform information).
  - Ensure tests verify that no plotting or file I/O occurs when diagnostics mode is active.

## Documentation

- **README Update:**
  - Update `README.md` to include a section about the diagnostics mode. Document how to invoke it using `--diagnostics` and describe the kind of information that will be output. 
  - Provide examples demonstrating the use of the diagnostics flag.

