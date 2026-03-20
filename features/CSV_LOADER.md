# CSV_LOADER

Summary
Load time series data from a CSV file containing columns time and value and produce a normalized array suitable for plotting.

Behavior
Implement a loadCsvTimeSeries(pathOrContent) function that accepts a file path or CSV string and returns a promise resolving to an array of records { time: string, value: number }. The loader should follow RFC4180 rules for commas, quoted fields and newlines, accept an optional header, skip empty lines, trim whitespace, parse value as a floating point number, and parse time using standard ISO parsing when possible.

API
Export a named async function loadCsvTimeSeries from src/lib/main.js.

Acceptance Criteria
- A CSV with header time,value and numeric lines is parsed into an array where each entry has a parsable time string and a numeric value.
- Malformed numeric values cause a descriptive error or are rejected according to a documented behavior in the implementation.
- The named export loadCsvTimeSeries exists in src/lib/main.js.
