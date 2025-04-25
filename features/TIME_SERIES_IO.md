# TIME SERIES IO Feature

This feature adds import and export capabilities for time series data in CSV and JSON formats, enabling users to integrate external datasets and save computed series for further analysis.

# CLI Parameter Parsing & Validation

- Introduce optional flags:
  - --input-file: path to a file containing time series data
  - --input-format: csv or json, default csv
  - --output-file: path to save the processed or generated time series
  - --output-format: csv or json, default csv
- Validate that format values are either csv or json and report clear errors on invalid values.

# Implementation Details

- When an input file is specified, read its contents using fs. For csv format, parse lines splitting on commas into x and y values. For json format, parse a JSON array of objects with numeric x and y properties.
- Feed parsed data into the existing processing pipeline alongside generated series from expressions.
- After processing, serialize the resulting time series data. For csv, write a header line x,y and subsequent lines. For json, output an array of objects.
- If output-file is provided, write to disk with appropriate extension; otherwise print formatted data to stdout.

# Testing Enhancements

- Extend tests in tests/unit/main.test.js to cover:
  - Reading valid csv and json input files and processing without errors
  - Writing csv and json outputs to a temporary file and validating content formatting
  - Default behavior when no input or output flags are provided

# Documentation Updates

- Update README.md with usage examples demonstrating import from csv and json, and export to csv and json formats.
