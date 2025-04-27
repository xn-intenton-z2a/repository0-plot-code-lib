# PLOT RENDERING

## Overview
This updated feature continues to serve as the unified endpoint for plot rendering and data export while integrating enhanced metadata enrichment. In addition to dynamic SVG axis labeling, customizable styling, and error handling, the JSON export functionality now includes a metadata object. This object provides valuable context such as the plot generation timestamp and the current library version. This enhancement improves integration, traceability, and debugging for both CLI and HTTP API consumers.

## Implementation
- In the /plot endpoint in src/lib/main.js, when the query parameter jsonExport is set to "true", before returning the JSON response, append a new metadata key to the computed plot data. This metadata object should include:
  - a "timestamp" field containing the current ISO timestamp of the plot generation.
  - a "version" field obtained from the package.json file's version field.
- Modify the computePlotData function, or wrap its output, to merge this metadata information when a detailed JSON export is requested.
- Ensure that the CLI branch that exports JSON data also incorporates the metadata object in its output.
- Update error handling to ensure that if fetching the library version fails, a default version string is returned without breaking plot generation.

## Testing
- In tests/unit/http.test.js and tests/unit/main.test.js, add or update tests to verify that when jsonExport is requested, the JSON response includes a metadata key with valid timestamp and version string.
- Validate that the metadata values do not affect other output formats (SVG and PNG) and remain exclusive to JSON export.

## Impact
- The enriched metadata enables consumers to track and verify plot generation recency and compatibility with the library version. This addition simplifies debugging and integration with external systems.
- This change consolidates and enhances the plot rendering capabilities, reducing redundancy and further aligning plot export output across CLI and HTTP interfaces.