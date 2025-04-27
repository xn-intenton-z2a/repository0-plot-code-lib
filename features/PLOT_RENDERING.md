# PLOT RENDERING

## Overview
This feature consolidates enhancements to plotting into a single, unified endpoint. It merges the improvements from dynamic SVG axis labeling with robust response handling that supports SVG, PNG, and JSON outputs. The unified endpoint delivers enhanced plot rendering with detailed validations, customizable styling through query parameters, and now enriched metadata in JSON export responses to facilitate traceability and integration with consuming applications.

## Implementation
- Integrate dynamic SVG enhancements: add clearly labeled X and Y axes with customizable options (font size, color, rotation, offset, and locale-aware formatting).
- Merge JSON export and SVG/PNG rendering by unifying the /plot endpoint. When a JSON response is requested, the endpoint will compute and return an array of plot data points along with the input expression, range details, and additional metadata.
- Extend the JSON export and CLI JSON output to include a metadata object that contains details such as the plot generation timestamp and the library version (fetched from package.json). This metadata facilitates version tracking and recency verification of plot outputs.
- Ensure that all input validations for mathematical expressions, numeric ranges, and custom label parameters are consolidated. Provide comprehensive aggregated error feedback when multiple validations fail.
- Update documentation (README.md, docs/USAGE.md) with examples illustrating how plot rendering and detailed JSON export now include metadata alongside standard plot details.

## Metadata Enrichment
- When detailed JSON export is requested using the jsonExport flag, the response will now include a new "metadata" key.
- The "metadata" key will include:
  - A timestamp of when the plot was generated.
  - The current library version as specified in package.json.
- This enrichment aids consumers in verifying the recency and compatibility of the plot data, enhancing integration workflows and debugging.

## Testing
- Extend existing unit tests in tests/unit/http.test.js and tests/unit/main.test.js to verify that JSON export responses (both for HTTP API and CLI) include a metadata object with the expected keys.
- Validate that the SVG and PNG outputs remain unchanged and that content negotiation is properly handled.
- Confirm that dynamic axis labels and styling are still rendered correctly, and that error handling provides clear aggregated feedback when inputs are invalid.

## Impact
This merged feature enhances the library's core capability by providing a single authoritative endpoint for plot rendering and data export. The addition of metadata enriches JSON responses with valuable contextual information, aiding in integration, traceability, and debugging. Overall, this update simplifies maintenance, reduces redundancy, and improves the user experience in both CLI and HTTP API modes.