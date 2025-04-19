# Overview
This update extends the existing EXPORT feature by adding a new diagnostics mode to the CLI. In addition to exporting plot data to several formats (JSON, CSV, XML, PDF), the CLI now supports a `--diagnostics` flag. When this flag is provided, the application will output important system and environment diagnostic information (such as Node.js version, dependency versions, and relevant configuration options) to help users and developers verify that the environment is properly set up. This integration merges diagnostics functionality with export features, keeping the total feature set within the allowed maximum.

# Implementation Details
- **CLI Flag Addition:**
  - The `--diagnostics` flag is parsed in the CLI argument parser. When present, all export and plot generation steps are bypassed.
  - The diagnostics routine gathers information including:
    - Node.js version (using `process.version`)
    - Versions of key dependencies such as `sharp`, `pdfkit`, and others from the package.json.
    - Environment variables (if any are relevant), and the current working directory.
    - A summary of the CLI options received (for debugging purposes).
- **Source File Changes:**
  - In `src/lib/main.js`, add a new branch in the main function that checks for `--diagnostics`. If present, output diagnostic information to the console and exit immediately.
  - Ensure proper error handling and logging so that any issues in the diagnostics routine are clearly reported.
- **Documentation Updates:**
  - Update the README to include a section on Diagnostics explaining how to run the diagnostics mode and interpret its output.
  - Update the CLI help message (triggered by `--help`) to list the new `--diagnostics` flag and its purpose.
- **Testing:**
  - Update unit tests in `tests/unit/main.test.js` to verify that when `--diagnostics` is provided, the CLI outputs the expected diagnostic information and does not attempt to generate any plot files.

# Testing & Compatibility
- **Unit Tests:**
  - Add tests to simulate CLI invocation with `--diagnostics` and verify that the output contains key diagnostics information such as the Node version and dependency versions.
  - Ensure that no file I/O is performed when diagnostics mode is activated.
- **Backward Compatibility:**
  - Regular export functionality remains unchanged when `--diagnostics` is not provided.

# Value
This merged feature enhances the EXPORT functionality by providing built-in diagnostics. This improvement helps users verify their runtime environment, facilitates debugging of deployment issues and ensures that the tool is operating as expected. Integrating diagnostics with export capabilities ensures a streamlined and efficient CLI, aligning with the mission to become the go-to plot library for formula visualisations.
