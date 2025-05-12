# Overview
Extend the existing statistics engine to support flexible export formats alongside summary, regression, and histogram metrics. Users can compute statistics and optionally export results in JSON, CSV, or YAML formats via CLI and HTTP.

# CLI Stats Subcommand
Add two new flags:
- --export-data <path>    Write statistics output to the specified file instead of stdout
- --export-format <csv|json|yaml>    Format for exported data (default inferred from file extension or json)

Behavior:
1. Parse and validate all flags, including --export-data and --export-format
2. Load or generate data points (expression or dataFile)
3. Compute summary statistics, optional regression, and optional histogram
4. Serialize results:
   - json: pretty-printed JSON
   - csv: header row and comma-separated values for each statistic; histogram rows with binStart,binEnd,count
   - yaml: use js-yaml to dump a mapping for statistics and sequence for histogram
5. Write to output file if --export-data is provided, otherwise write to stdout
6. Exit with code 0 on success, code 1 on validation or runtime error

# HTTP Stats Endpoint
Add optional query parameters:
- exportFormat (csv|json|yaml)    Overrides response format
- encoding (base64)                Base64-encode the response body when used with binary formats (not typical for stats)

Behavior:
1. Validate exportFormat and encoding via zod
2. Compute statistics as before
3. Serialize response based on exportFormat or json flag:
   - application/json for json
   - text/csv for csv
   - application/x-yaml for yaml
4. Include CORS header and return 200 on success or 400 on validation errors

# Implementation
- In src/lib/main.js, update runStatsCli to handle new flags, serialize CSV and YAML
- Extend HTTP handler in createServer to parse exportFormat, call serializer, set correct content-type
- Use js-yaml for YAML and simple CSV generation

# Testing
- Add unit tests for CLI:
  - Export JSON, CSV, YAML via --export-data and --export-format
  - Verify file content matches expected structure
- Add tests for HTTP:
  - GET /stats?exportFormat=csv returns text/csv with correct header and rows
  - GET /stats?exportFormat=yaml returns application/x-yaml with valid YAML
  - Invalid exportFormat yields 400

# Documentation
- Update USAGE.md and README.md to document --export-data and --export-format flags
- Add examples for CSV and YAML exports in CLI and HTTP sections