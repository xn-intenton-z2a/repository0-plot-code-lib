# CSV_LOADER

## Summary

Load time series data from a CSV file with two columns: time and value, returning an array of numeric points suitable for plotting.

## Motivation

Users commonly provide recorded time series as CSV files; the library must convert those into the library's internal point representation.

## Scope

- Support CSV files with a header row containing exactly the columns time and value (case-insensitive), and subsequent rows with numeric or ISO-8601 timestamps for time.
- Provide loadCsv(filePath, options) which returns Promise<Array<{x:number,y:number}>>.

## Requirements

- Parse the CSV robustly: trim whitespace, ignore empty lines, report parse errors with file/line context.
- For time column values that parse as ISO strings, convert to milliseconds (Date.parse). For numeric time values parseFloat and use as-is.
- Convert the value column to a numeric y using parseFloat; rows where value is NaN should be rejected or skipped according to options.
- Export loadCsv from src/lib/main.js.

## Acceptance Criteria

- Loading a CSV file with header time,value returns an array of objects with numeric x and y.
- The loader accepts time values as ISO timestamps or as numeric epoch-like numbers and converts them to numbers.
- Errors in the CSV format result in a clear, testable exception containing the filename and line number.

## Notes

- A minimal parser can be implemented without external dependencies; Papaparse is an acceptable optional dependency and may be used when additional robustness is required.
