# Overview
Extend the existing statistics engine to support two distinct modes: computing summary, regression, and histogram metrics, and exporting raw x,y data points. Users interact via a unified CLI interface that determines behavior based on flags, enabling both high-level statistical insights and direct data exports.

# CLI Stats Subcommand
Add or refine three new flags:
- --export-data <path>    Write raw data points to the specified file (or stdout if omitted).
- --export-format <csv|json|yaml>    Format for exported raw data (default inferred from file extension or json).
- --output <path>      Write statistics output to the specified file instead of stdout (existing flag).  

Behavior:
1. Parse and validate flags, including the new --export-data and --export-format options.
2. Load or generate data points:
   - Expression mode: use --expression and --range to generate points.
   - File mode: parse JSON, YAML, or CSV file input.
3. If --export-data is provided:
   - Serialize raw points based on export-format:
     • csv: header row (x,y) and comma-separated x,y for each point.
     • json: array of {x,y} objects.
     • yaml: dump sequence of mappings via js-yaml.
   - Write to the output file or stdout.
   - Exit with code 0 on success.
4. Otherwise, compute summary statistics with optional regression and histogram:
   - --histogram and --bins produce histogram bins.
   - --trendline-stats computes regression slope, intercept, and r2.
   - Serialize metrics in JSON or text (existing --format or default).  
5. Write metrics output to file (--output) or stdout, exit code 0 on success.

# Implementation
In src/lib/main.js, update runStatsCli:
- Detect args.exportData and args['export-format'] early.
- Branch: if exportData present, skip stats computations and call a serializer for raw points.
- Use js-yaml.dump for YAML and simple CSV generation for CSV.
- Preserve existing logic for metrics mode when exportData is absent.

# Testing
- Add unit tests for raw data export via CLI:
  • JSON export: runStatsCli with expression, range, --export-data and --export-format json, assert output matches expected array.
  • CSV export: assert header and rows for a small sample.
  • YAML export: valid YAML sequence of mappings.
  • Missing export-format defaults based on file extension or json.
- Ensure statistics tests remain passing.

# Documentation
- Update USAGE.md and README.md under the stats section:
  • Document --export-data and --export-format flags for raw data.
  • Provide examples for JSON, CSV, YAML exports via CLI.