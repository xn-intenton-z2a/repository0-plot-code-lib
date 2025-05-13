# Overview
Extend the existing Stats engine feature to support exporting raw data via the CLI and to produce CSV output in the HTTP /stats endpoint. This ensures users can retrieve source points for downstream processing or integration alongside summary statistics.

# CLI Raw Data Export
Introduce two new flags:
- `--export-data <path>`    Path to write raw x,y data points. Use dash or omit path to write to stdout.
- `--export-format <csv|json|yaml>`    Serialization format for exported data. Default inferred from file extension or json.

Behavior when `--export-data` is provided:
1. Parse input by expression and range or by dataFile as usual.
2. Generate or load raw points into an array of objects `{x, y}`.
3. Serialize points only, skipping summary, histogram, and regression blocks:
   - csv: emit header x,y followed by comma separated rows
   - json: emit JSON array of point objects
   - yaml: emit YAML sequence of mappings via js-yaml.dump
4. Write serialized output to the specified file or to stdout and exit with code 0.
5. If `--export-data` appears without `expression` or `dataFile`, exit with code 1 and print an error message.

# HTTP /stats CSV Output
Allow clients to request raw CSV output via the query parameter `format=csv`:
1. After generating or loading points, when format equals csv:
   - Construct CSV payload with header line x,y and comma separated rows for each point.
   - Set response content type to text/csv.
   - Return CSV text and skip summary statistics block.
2. Preserve CORS header `Access-Control-Allow-Origin: *`.
3. On missing parameters or invalid range, return 400 with JSON error body.

# Testing
Add unit and integration tests to cover all new behaviors.

## CLI Unit Tests
- JSON export to stdout: runStatsCli with `--expression y=x --range x=0:1 --samples 2 --export-data -` and verify JSON array output from stdout.
- CSV export to file: runStatsCli with `--expression y=x --range x=0:1 --samples 2 --export-data export.csv --export-format csv`, read export.csv and assert header and rows.
- YAML export to stdout: runStatsCli with `--dataFile data.json --export-data - --export-format yaml` and verify YAML sequence output.
- Default format inference: runStatsCli with `--expression y=x --range x=0:1 --export-data data.json` and verify JSON output without explicit format.
- Error case: `--export-data` without `--expression` or `--dataFile` should exit code 1 and print error.

## HTTP Integration Tests
- GET /stats?expression=y%3Dx&range=x%3D0:1&format=csv: expect 200, content-type text/csv, body with header and two rows.
- CORS header presence on CSV responses.
- GET /stats?format=csv without expression or dataFile: expect 400 with JSON error.

# Documentation
Update USAGE.md and README.md under the Stats section:
- Document `--export-data` and `--export-format` flags, their interaction with summary flags, and examples for csv, json, yaml exports.
- Add HTTP example for CSV endpoint: curl "http://localhost:3000/stats?expression=y%3Dx&range=x%3D0:1&format=csv".
- Clarify that CSV output emits only raw points and exits immediately.