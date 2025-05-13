# Overview
Add export-data and export-format flags to the stats command to enable exporting raw x,y data points in CSV, JSON, or YAML formats. Preserve existing summary statistics, histogram, and regression outputs.

# CLI Raw Data Export
Introduce two new flags:
- --export-data <path|->    Path to write raw x,y data points. Use dash or omit path to write to stdout.
- --export-format <csv|json|yaml>    Serialization format for raw data export. Default inferred from file extension or json.

When --export-data is provided:
1. Parse input by expression and range or by dataFile as usual.
2. Generate or load raw points into an array of objects with keys x and y.
3. Serialize only the raw points, skipping summary, histogram, and regression blocks:
   - csv: emit header line x,y followed by comma separated rows
   - json: emit JSON array of point objects with two-space indentation
   - yaml: emit YAML sequence of mappings using js-yaml dump
4. Write serialized output to the specified file or to stdout and exit with code 0.
5. If --export-data is provided without expression or dataFile, exit with code 1 and print an error message.

# Behavior
- Summary, histogram, and regression computations remain available but are suppressed when --export-data is used.
- Bins and trendline flags have no effect on raw export output.

# Testing
Add unit and integration tests to cover raw export behavior:

CLI Unit Tests:
- Export JSON: runStatsCli with --expression y=x --range x=0:1 --samples 5 --export-data - --export-format json and verify JSON array matches generated points.
- Export CSV: runStatsCli with dataFile data.json --export-data out.csv --export-format csv and assert file contents include header and correct rows.
- Export YAML: runStatsCli with expression y=x --range x=0:2 --samples 3 --export-data - --export-format yaml and validate output using js-yaml load.
- Error case: --export-data without expression or dataFile should exit with code 1 and print an error.

# Documentation
Update USAGE.md and README.md under the Stats section:
- Document --export-data and --export-format flags with descriptions and default behaviors.
- Provide examples exporting to stdout and to a file in each supported format.