# PLOT_METADATA

## Overview
This feature consolidates and enhances the JSON export functionality for plots. When the jsonExport flag is enabled in the CLI or HTTP API, the tool now returns a detailed JSON object that includes a new metadata field. This metadata field contains a current timestamp and the software version (retrieved from package.json, with a fallback to "0.0.0" if needed). By merging improvements from previous PLOT_METADATA and PLOT_RENDERING features, the output becomes more traceable and consistent across all export methods.

## Implementation
- Update the /plot endpoint in src/lib/main.js so that when jsonExport is "true", the response JSON includes a metadata object with two keys:
  - timestamp: The current date-time in ISO format.
  - version: The version read from package.json (or a default value if reading fails).
- Ensure that both CLI and HTTP API export branches (e.g., when writing to a file via --jsonExport) include the metadata enrichment.
- Merge the redundant logic from the previous PLOT_METADATA and PLOT_RENDERING features into one unified implementation. Inline comments in the code should explain the purpose of this metadata enrichment and how it aids debugging and integration.
- Update tests in tests/unit/http.test.js and tests/unit/main.test.js to validate that the metadata field is present in the JSON export and that it contains valid values, including a simulation for package.json read failures.

## Impact
By consolidating metadata output for plot exports, the system provides enhanced context for debugging and integrators. The unified approach reduces code redundancy, simplifies maintenance, and ensures consistency across all output formats that include JSON export data.