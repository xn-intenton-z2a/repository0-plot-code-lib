# Overview
This updated feature continues to serve as the unified endpoint for plot rendering and data export. In addition to dynamic SVG axis labeling, customizable styling, adaptive resolution, and curve smoothing, the feature now enriches JSON exports with metadata. This metadata includes a timestamp for when the plot was generated and the current library version from the package configuration. This enhancement improves traceability, debugging, and integration with external systems.

# Implementation
- In the /plot endpoint in src/lib/main.js, if the query parameter jsonExport is set to "true", modify the JSON response to include a new key, "metadata".
- The metadata object must include:
  - a "timestamp" field with the current ISO timestamp (generated via new Date().toISOString()).
  - a "version" field obtained by reading the version field from package.json (e.g., using fs.readFileSync and JSON.parse or an import).
- Ensure that this metadata enrichment is only applied to JSON export responses and does not affect SVG or PNG outputs.
- Retain the existing functionality for configuration management, adaptive resolution, and SVG/PNG generation. CLI mode should also output this metadata information in JSON export mode.
- Update error handling to ensure that if fetching the library version fails, a default version string is provided without breaking plot generation.

# Testing
- Update or add tests in tests/unit/http.test.js and tests/unit/main.test.js to verify that when jsonExport is requested, the returned JSON contains a metadata object with valid timestamp and version string.
- Verify that non-JSON outputs (SVG/PNG) remain unaffected by this change.
- Add tests to check that if reading package.json fails, the metadata version defaults to a predefined string.

# Impact
- The enriched metadata streamlines integration with external systems and enhances debugging by providing context on when the plot was generated and the library version in use.
- This change aligns with the mission to be a go-to plot library by increasing output reliability and traceability.