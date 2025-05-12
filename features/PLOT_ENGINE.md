# Overview
Enhance the existing plot subcommand and HTTP endpoint with comprehensive test coverage and updated documentation so users can verify and understand all plot features.

# CLI Plot Subcommand
Maintain all existing flags and behavior for the plot subcommand:
- expression, range, dataFile, format, output, encoding, width, height, devicePixelRatio, backgroundColor, version, derivative, overlayTrendline, exportData, exportFormat
- Behavior unchanged: parsing flags, generating data, computing overlays, rendering via QuickChart or sharp, encoding, writing output and setting exit codes

# HTTP /plot Endpoint
Preserve GET /plot behavior and Zod schema validation for all query parameters, maintain CORS header, support image and data export responses:
- Validate parameters expression, range, format, encoding, dataFile, width, height, samples, derivative, overlayTrendline, exportData, exportFormat
- Generate or load points, compute overlays
- Return binary image or application/json with base64 data, or raw data exports

# Implementation
No changes to core logic in src/lib/main.js. Focus on test setup and documentation updates.

# Testing
Add and organize tests in tests/unit to cover plot features end to end:
1. CLI tests for plot subcommand:
   - Invoke parseArgs and runPlotCli with sample flags to generate SVG and PNG output files and stdout behavior
   - Verify output file contents match expected SVG or PNG buffer signatures
   - Test base64 encoding JSON response from CLI when encoding=base64
   - Test data export in CSV, JSON, and YAML formats
2. HTTP endpoint tests using supertest:
   - Request GET /plot with expression and range, format=svg and png, verify status 200 and content-type image/svg+xml or image/png
   - Test encoding=base64 returns application/json with data and type fields
   - Test exportData responses return correct serialized data for CSV, JSON, YAML
   - Verify CORS header Access-Control-Allow-Origin is set to '*'
   - Test validation errors return status 400 with error messages
3. Ensure coverage thresholds include plot tests and pass on CI

# Documentation
Update README.md with usage examples for plot functionality:
- CLI examples for generating SVG and PNG plots, overlay derivative and trendline, encoding base64, exporting data
- HTTP examples showing curl commands for GET /plot with query parameters, illustrate image and JSON responses
- Add a new section under "Examples" or "HTTP Server Mode" demonstrating plot endpoint usage