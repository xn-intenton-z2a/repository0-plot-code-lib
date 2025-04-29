# Overview
This feature consolidates CLI help, version information, and runtime configuration into one unified runtime interface. In this update, both the HTTP API endpoint and the CLI interactions (including help and version commands) share a common configuration management logic. This streamlines user experience by reducing configuration discrepancies and offering a consistent paradigm whether the tool is accessed via the CLI or HTTP.

# Implementation
- Merge the CLI help and version flag processing from the CLI_HELP feature into the existing runtime interface. The updated runtime interface now recognizes "--help" and "--version" flags in addition to the existing HTTP serving mode when the "--serve" flag is provided.
- Improve the CLI parsing logic to display a detailed help text when the "--help" flag is invoked. This help output also includes examples of using the HTTP interface for generating plots.
- Ensure that the version flag prints the version number from the dependencies (e.g., from package.json) and then exits.
- Update the HTTP /plot endpoint (from the previous RUNTIME_INTERFACE feature) to support content negotiation (SVG, PNG, JSON) and share the same configuration and validation routines used for CLI operations. Both modes now utilize the enhanced environment variable interpolation and error handling logic.
- Adjust the configuration merging logic so that CLI flags can override internal defaults, including those inherited from configuration files and environment variables.
- Update and add unit tests in tests/unit/configManagement.test.js and tests/unit/http.test.js to verify that both CLI and HTTP modes display help/version text correctly and that the runtime reload via signals (SIGHUP) functions as expected.

# Impact
- This consolidation simplifies maintenance by unifying CLI and HTTP runtime behaviors under one feature.
- Users receive clear, immediate help and version information directly from the command line, while also enjoying a robust HTTP API with consistent error reporting and configuration validation.
- The overall user experience is enhanced by a unified and predictable runtime interface, fulfilling the mission of providing a go-to plot library for formula visualizations.