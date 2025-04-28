# PLOT_RENDERING

## Overview
This update enriches the existing plot rendering functionality by augmenting the JSON export with runtime metadata. When users request a detailed JSON output using the jsonExport flag, the response will now include an additional "metadata" field that provides a timestamp of generation and the software version read from package.json. This enhancement improves traceability, debugging, and integration with external systems, while the other output formats (SVG and PNG) remain unaffected.

## Implementation
- In the /plot endpoint in src/lib/main.js, update the branch that handles jsonExport === "true". After computing the plot data using computePlotData(), read the package version from package.json. Use a try-catch to safely read the version; if reading fails, set a default version string (e.g., "0.0.0").
- Append a metadata object to the response that includes:
  - a "timestamp" field with the current date-time in ISO format.
  - a "version" field holding the version string from package.json or the default value.
- Ensure that the merging of configuration and error handling remains unchanged. The metadata enrichment should be applied only to the JSON export branch.
- Update comments in the code to reflect the changes and to guide future maintainers on how this enhancement integrates with the existing dynamic plot generation.

## Testing
- Enhance test cases in tests/unit/http.test.js and tests/unit/main.test.js to verify that when jsonExport is requested, the JSON response now contains a "metadata" object with both "timestamp" and "version" keys.
- Add tests to simulate a failure in reading package.json (if possible) and ensure the default version string is used.
- Verify that non-JSON exports (SVG and PNG) are not modified by this update.

## Impact
By including runtime metadata in the JSON export, users benefit from improved debugging, version tracking, and integration capabilities. This aligns with the mission of making the library a go-to tool by providing enhanced output reliability and traceability.