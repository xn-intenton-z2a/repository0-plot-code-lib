# PLOT_METADATA

## Overview
This feature enhances the detailed JSON export functionality by appending runtime metadata to the output. When the jsonExport flag is used in either CLI or HTTP API mode, the JSON response will include a new field "metadata" with information about the generation timestamp and the current software version (read from package.json). This additional data improves traceability and assists in debugging and integration with external systems.

## Implementation
- For the /plot endpoint, update the branch that handles jsonExport === "true". After computing the plot data, read the package version from package.json using a safe try-catch block. If package.json cannot be read, default to a version string (e.g., "0.0.0").
- Append a new property "metadata" to the JSON output. This metadata object should contain:
  - "timestamp": the current date-time in ISO format.
  - "version": the read version value or the default fallback.
- For CLI usage with JSON export, similarly upgrade the output JSON to include the metadata field.
- Update inline comments to indicate the purpose of the metadata addition, ensuring clarity for future maintainers.

## Testing
- Update or add unit tests in tests/unit/http.test.js to verify that when the jsonExport flag is used, the returned JSON includes the "metadata" field with a valid ISO timestamp and a software version string.
- Ensure that tests simulate the scenario of failing to read package.json and validate that the default version string is applied.
- For CLI tests (in tests/unit/main.test.js), verify that the generated JSON file contains the metadata field with correct structure.

## Impact
By providing additional runtime metadata in the JSON export, users and integrators receive enhanced context around when the plot was generated and which version of the software was used. This aligns with the mission of making the library more robust, easier to debug, and more suitable for automated integrations.
