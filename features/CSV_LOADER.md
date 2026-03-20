# CSV_LOADER

Status: Implemented

Summary
Load time series data from a CSV file containing columns time and value and produce a normalized array suitable for plotting.

Behavior
Implement loadCsvTimeSeries(pathOrContent) that accepts either a file path or a CSV string and returns a Promise resolving to an array of records { time: string, value: number }. The loader must follow RFC4180 rules for commas, quoted fields and newlines, accept an optional header, skip empty lines, trim whitespace, parse value as a floating point number, and parse time using ISO parsing when possible.

API
Export a named async function loadCsvTimeSeries from src/lib/main.js.

Acceptance Criteria
- loadCsvTimeSeries when given the CSV string "time,value\n2020-01-01T00:00:00Z,1.23" resolves to an array with one entry { time: "2020-01-01T00:00:00Z", value: 1.23 }.
- Non-numeric value fields cause a descriptive error to be thrown; the behavior must be documented in the implementation and tests.
- Empty lines and whitespace are ignored and trimmed.
- The module src/lib/main.js exports a named function loadCsvTimeSeries.
