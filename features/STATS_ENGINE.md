# Overview
Extend the existing Stats engine feature to implement export-data and export-format flags in the CLI for raw x,y data export in CSV, JSON, and YAML formats while retaining summary, histogram, and regression capabilities.

# CLI Raw Data Export
Introduce two new flags:
- --export-data <path>    Path to write raw x,y data points. Use dash or omit path to write to stdout.
- --export-format <csv|json|yaml>    Serialization format for raw data export. Default inferred from file extension or json.

Behavior when --export-data is provided:
1. Parse input by expression and range or by dataFile as usual.
2. Generate or load raw points into an array of objects with keys x and y.
3. Serialize points only, skipping summary, histogram, and regression blocks:
   - csv: emit header line x,y followed by comma separated rows
   - json: emit JSON array of point objects
   - yaml: emit YAML sequence of mappings using js-yaml dump
4. Write serialized output to the specified file or to stdout and exit with code 0.
5. If --export-data is provided without expression or dataFile, exit with code 1 and print an error message.

# HTTP /stats CSV Output
Retain existing HTTP endpoint behavior to allow clients to request raw CSV output via query parameter format=csv:
1. After generating or loading points, when format equals csv:
   - Construct CSV payload with header x,y and comma separated rows for each point.
   - Set response content type to text/csv.
   - Return CSV text and skip summary statistics block.
2. Preserve CORS header Access-Control-Allow-Origin: *.
3. On missing parameters or invalid range, return status 400 with JSON error body.

# Testing
Add unit and integration tests to cover all new behaviors.

CLI Unit Tests
- JSON export to stdout: invoke runStatsCli with arguments --expression y=x --range x=0:1 --samples 2 --export-data - and verify JSON array output to stdout.
- CSV export to file: invoke runStatsCli with arguments --expression y=x --range x=0:1 --samples 2 --export-data export.csv --export-format csv, read export.csv and assert header and rows.
- YAML export to stdout: invoke runStatsCli with arguments --dataFile data.json --export-data - --export-format yaml and verify YAML sequence output.
- Default format inference: invoke runStatsCli with arguments --expression y=x --range x=0:1 --export-data data.json and verify JSON output without explicit format flag.
- Error case: --export-data without expression or dataFile should result in exit code 1 and an appropriate error message on stderr.

HTTP Integration Tests
- GET /stats?expression=y=x&range=x=0:1&format=csv expect status 200, content-type text/csv, and body with header and data rows.
- Ensure Access-Control-Allow-Origin header is present on CSV responses.
- GET /stats?format=csv without expression or dataFile expect status 400 with JSON error body.

# Documentation
Update usage documentation and README under the Stats section:
- Document --export-data and --export-format flags, their interaction with summary flags, and examples for csv, json and yaml exports.
- Clarify default format inference behavior when --export-format is omitted.
- Add an HTTP example for CSV endpoint: curl http://localhost:3000/stats?expression=y=x&range=x=0:1&format=csv