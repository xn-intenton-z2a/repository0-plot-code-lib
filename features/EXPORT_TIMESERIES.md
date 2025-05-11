# EXPORT_TIMESERIES Feature

## Purpose
Enable users to export the computed time series data generated from a mathematical expression and numeric range into a standard format (CSV or JSON) for further analysis, sharing, or pipeline integration.

## CLI Interface
Define and validate these options in the main function:
- --expression <expr>      A mathematical expression in terms of x, e.g., "sin(x) + x^2".
- --range <start:end[:step]>  Numeric range for x values, default step of 1 if omitted.
- --export-data <path>     File path for the exported data, default output.csv.
- --data-format <csv|json> Output data format, default csv.

## Data Export
1. Reuse expression parsing and series generation logic to compute x and y pairs.
2. Serialize the series to CSV or JSON according to the selected format:
   - CSV: header row "x,y" followed by one line per data point.
   - JSON: array of objects `{ x: number, y: number }`.
3. Write the serialized data to the export path.

## Library API
Export a function `exportTimeSeries(options)` callable programmatically with the same parameters to produce and save the file.

## Testing
- Add unit tests for CLI argument parsing and validation with zod.
- Test data serialization logic for both CSV and JSON output with sample inputs.
- Mock file writing to verify correct file path, content headers, and format selection.

## Documentation
- Update README.md with usage examples:
  - Inline code example: `import { exportTimeSeries } from "@xn-intenton-z2a/repository0-plot-code-lib";`
  - CLI examples: `repository0-plot-code-lib --expression "x^2" --range "0:10:2" --export-data data.json --data-format json`
- Describe the fields in the exported format and link to generate-plot for visualization workflows.