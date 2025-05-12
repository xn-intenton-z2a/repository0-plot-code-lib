# Overview
Enhance the existing plot subcommand and HTTP /plot endpoint to support exporting raw time series data points alongside or instead of image outputs. Users can optionally save or retrieve generated x,y pairs in CSV, JSON, or YAML formats to facilitate analysis, pipelines, or storage.

# CLI Plot Subcommand
Extend the plot CLI to include export options:
- --export-data <path>           File path to write raw data points (required when exporting)
- --export-format <csv|json|yaml> Format for exported data (inferred from extension if omitted)

Behavior:
1. Parse and validate all plot flags and new export flags.  If --export-data is provided without a valid path, error.
2. Generate or load point list via generateData or data-file parsing as before.
3. If --export-data is provided:
   a. Serialize points in the specified or inferred format:
      - JSON: pretty-printed JSON array of {x,y} objects.
      - CSV: header "x,y" followed by rows of numeric values.
      - YAML: standard YAML sequence of mappings.
   b. Write serialized data to the export path.
   c. If no image flags requested (format), exit with code 0 after export.
4. If image output is also requested (--format, --output), generate SVG or PNG using generatePlot and write as before.
5. Exit with code 0 on success, or code 1 on any error, printing to stderr.

# HTTP /plot Endpoint
Allow clients to request raw data export via query parameters:
- exportData (true|false)          Include raw data export response
- exportFormat (csv|json|yaml)     Format of exported data

Behavior:
1. Validate exportData and exportFormat along with existing parameters via Zod schema.
2. Generate or load points as in CLI mode.
3. If exportData=true:
   a. Serialize points to the requested format.
   b. Respond with appropriate content-type:
      - application/json for JSON
      - text/csv for CSV
      - application/x-yaml for YAML
   c. Send serialized body and status 200, skipping image generation.
4. Otherwise behave as existing plot endpoint: generate and return image or JSON-encoded image.
5. Include Access-Control-Allow-Origin header for CORS as configured.

# Implementation
- In src/lib/main.js, extend parseArgs and runPlotCli to consume new flags and implement export logic before or alongside generatePlot.
- In setupHttp/createServer, update Zod schema for GET /plot to include exportData and exportFormat, and handle export branch in handler.
- Add utility functions serializeDataPoints(points, format) to centralize CSV/JSON/YAML serialization.
- Ensure error handling aligns with existing CLI and HTTP patterns.

# Testing
- Add unit tests for CLI:
  • Export JSON, CSV, and YAML output files with matching content.
  • Combined export and image generation scenarios.
  • Error on invalid format or path missing.
- Add HTTP tests via Supertest:
  • GET /plot?expression=y%3Dx&range=x%3D0:5&exportData=true&exportFormat=csv returns CSV content.
  • JSON and YAML export endpoints return correct Content-Type and body.
  • Errors on invalid exportFormat values.
- Ensure existing plot image tests remain passing.

# Documentation
- Update USAGE.md and README.md to document new --export-data and --export-format flags in CLI examples.
- Document exportData and exportFormat query parameters and response content types in /plot section.