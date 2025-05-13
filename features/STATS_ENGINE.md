# Overview
Enhance the existing statistics engine to include tests and documentation for raw data export via CLI flags. This ensures end-to-end verification of the export-data and export-format options and provides clear guidance for users.

# CLI Stats Subcommand
Refine flags:
- --export-data <path>    Write raw x,y data points to the specified file or to stdout if path is dash or omitted
- --export-format <csv|json|yaml>    Format for exported raw data (default inferred from file extension or json)

Behavior:
1. If --export-data is provided, bypass summary statistics, regression and histogram features.
2. Load or generate raw points from expression and range or from dataFile input.
3. Serialize based on export-format:
   • csv: header row x,y followed by comma separated values
   • json: array of objects with fields x and y
   • yaml: sequence of mappings via js-yaml.dump
4. Write output to the specified file or stdout and exit with code 0.

# Testing raw data export
Add unit tests in tests/unit/main.test.js or in a dedicated file:
- JSON export to stdout: runStatsCli with arguments --expression y=x --range x=0:1 --samples 2 --export-data - and verify stdout is a JSON array of two points
- CSV export to file: runStatsCli with arguments --expression y=x --range x=0:1 --samples 2 --export-data export.csv --export-format csv, then read export.csv and assert header and rows match expected values
- YAML export to stdout: runStatsCli with arguments --expression y=x --range x=0:1 --samples 2 --export-format yaml --export-data -, verify yaml sequence output
- Default format inference: invoke runStatsCli with arguments --expression y=x --range x=0:1 --export-data data.json and verify JSON output without explicitly passing export-format
- Error case: passing --export-data without expression or dataFile should exit with error code 1 and print an error message
Ensure tests clean up temporary files and restore any spies or mocks after each run.

# Documentation
Update USAGE.md and README.md under the Stats subcommand section:
- Document the --export-data and --export-format flags and their behavior when exporting raw data
- Provide CLI examples for raw export in each supported format:
    repository0-plot-code-lib stats --expression y=x --range x=0:1 --export-data data.csv
    repository0-plot-code-lib stats --dataFile data.json --export-data - --export-format yaml
- Clarify that using export-data causes the tool to emit only raw points and exit immediately with code 0.