# Overview
Extend the existing statistics engine to support two distinct modes for both CLI and HTTP: computing summary, regression, and histogram metrics, and exporting raw x,y data points. Users interact via a unified CLI interface or HTTP query parameters to choose between high-level statistical insights and direct data exports.

# CLI Stats Subcommand
Add or refine flags:
- --export-data <path>    Write raw data points to the specified file or stdout if omitted.
- --export-format <csv|json|yaml>    Format for exported raw data (default inferred from file extension or json).

Behavior:
1. Parse and validate flags, including --export-data and --export-format.
2. Load or generate data points:
   - Expression mode: use --expression and --range to generate points.
   - File mode: parse JSON, YAML, or CSV input.
3. If --export-data is provided:
   - Serialize raw points based on export-format:
     • csv: header row (x,y) and comma-separated values.
     • json: array of {x,y} objects.
     • yaml: sequence of mappings via js-yaml.dump.
   - Write to output file or stdout.
   - Exit with code 0.
4. Otherwise compute summary statistics, optional regression (--trendline-stats), and histogram (--histogram, --bins).
5. Serialize metrics in JSON or text and write to file or stdout.

# HTTP /stats Endpoint
Extend the HTTP /stats endpoint to accept raw data export parameters alongside existing metrics options:
- exportData (flag): when present, return raw x,y points instead of statistics.
- exportFormat <csv|json|yaml>: format for raw export (default json).

Behavior:
1. Parse and validate query parameters, including exportData and exportFormat.
2. Load or generate data points as per expression or dataFile parameters.
3. If exportData is present:
   - Serialize raw points based on exportFormat:
     • csv: Content-Type text/csv, header and rows.
     • json: application/json, array of objects.
     • yaml: application/x-yaml, dumped sequence.
   - Respond with status 200 and the serialized data.
4. Otherwise compute statistics, optional regression (trendlineStats=true) and histogram (histogram=true, bins), then respond in JSON or plain text based on json flag.
5. Always include CORS header Access-Control-Allow-Origin: *.

# Testing
- Add unit tests for HTTP export endpoints using supertest:
  • JSON export: GET /stats?expression=y=x&range=x=0:1&exportData=true, expect application/json and array of points.
  • CSV export: GET /stats?expression=y=x&range=x=0:1&exportData=true&exportFormat=csv, expect text/csv with header and rows.
  • YAML export: GET /stats?expression=y=x&range=x=0:1&exportData=true&exportFormat=yaml, expect application/x-yaml sequence.
  • Default exportFormat when missing.
- Ensure existing metrics and CORS tests remain passing.

# Documentation
Update USAGE.md and README.md under the /stats section:
- Document exportData and exportFormat query parameters for HTTP endpoint.
- Provide curl examples for JSON, CSV, and YAML exports:
  • curl "http://localhost:3000/stats?expression=y%3Dx&range=x%3D0:1&exportData=true"
  • curl "http://localhost:3000/stats?expression=y%3Dx&range=x%3D0:1&exportData=true&exportFormat=csv"
  • curl "http://localhost:3000/stats?expression=y%3Dx&range=x%3D0:1&exportData=true&exportFormat=yaml"
- Clarify content types returned for each export mode.