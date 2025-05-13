# Overview
Extend the existing statistics engine to support exporting raw time series data via CLI flags alongside existing summary and regression capabilities.

# CLI Stats Subcommand
Add or refine flags:
- --export-data <path>    Write raw x,y data points to the specified file or stdout if omitted
- --export-format <csv|json|yaml>    Format for exported raw data (default inferred from file extension or json)

Behavior:
1. Parse and validate flags, including --export-data and --export-format.
2. Load or generate data points:
   - Expression mode: use --expression and --range to generate points.
   - File mode: parse JSON, YAML, or CSV input.
3. If --export-data is provided:
   - Serialize raw points based on export-format:
     • csv: header row x,y and comma-separated lines
     • json: array of {x,y} objects
     • yaml: sequence of mappings via js-yaml.dump
   - Write to the output file or stdout and exit with code 0.
4. Otherwise compute summary statistics, optional regression (--trendline-stats) and histogram (--histogram, --bins) as before, then output.

# Testing
Add unit tests for CLI raw export functionality:
- JSON export: runStatsCli with --expression, --range, --export-data - (stdout) and check JSON array of points
- CSV export: runStatsCli with --export-data data.csv and --export-format csv, verify file content has header and rows
- YAML export: runStatsCli with --export-format yaml and --export-data -, verify yaml dump sequence
- Default format inference when --export-format is omitted
Ensure existing stats and error handling tests remain passing.

# Documentation
Update USAGE.md and README.md under the Stats Subcommand section:
- Document --export-data and --export-format flags and their behaviors
- Provide CLI examples for raw export in JSON, CSV, and YAML:
  repository0-plot-code-lib stats --expression "y=x" --range "x=0:1" --export-data data.csv
  repository0-plot-code-lib stats --dataFile data.json --export-data - --export-format yaml
- Clarify exit codes and data formats returned.