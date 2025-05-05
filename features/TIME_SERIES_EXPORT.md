# Overview
Enable the CLI to export sampled time series data to standard CSV or JSON formats

# CLI Options

- --expression, -e  : A valid mathematical formula in terms of x
- --range, -r       : One or two comma-separated axis ranges using colon syntax
- --export, -x      : The export format, either csv or json. Default: csv
- --output, -o      : The path to write the exported data. Default: data.csv or data.json depending on format

# Implementation

1. Extend the existing Zod schema to validate the export option and output path
2. After sampling the expression into an array of (x, y) points, branch on export format
3. For csv: generate a header line and comma separated rows for each point
4. For json: serialize the points as an array of objects with x and y properties
5. Write the serialized data to the specified file or stdout if output is -
6. Ensure backward compatibility: when export option is omitted, default to plot generation
7. Exit with code 0 on success and nonzero on validation or file errors

# Testing and Documentation

- Add unit tests for export option validation, csv serialization, and json serialization
- Stub file writes in tests to verify correct output content and error handling
- Update USAGE.md and README.md with examples of exporting time series data in both formats