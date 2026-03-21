# CSV_LOADER

Overview
This feature specifies loading time series data from CSV files with columns time,value following RFC4180-compatible parsing rules suitable for simple numeric time series.

Specification
- Provide a named export loadCsv(path, options?) that reads a CSV file and returns a Promise resolving to an array of objects [{time: ISO8601|string|number, value: number}, ...].
- Accept files with an optional header line. Header names time and value are case-insensitive. If header is missing, assume first column is time and second column is value.
- Time parsing: if a time value is parseable by Date.parse produce an ISO8601 string; if it parses as a number treat it as a numeric timestamp; otherwise return the raw string under time and let callers decide.
- Value parsing: parse as floating point. Empty or non-numeric values should raise a parsing error unless options.allowMissing is true.
- Handle quoted fields and embedded commas per RFC4180. Ignore blank lines and trim surrounding whitespace.

Rationale
CSV time series input is a primary data source for the library; a reliable loader with predictable time/value output is required for downstream rendering.

Acceptance criteria
- loadCsv on a CSV with header time,value and two rows returns an array of two items with numeric value fields and time fields parseable to Date when ISO timestamps are provided.
- Malformed rows or missing required columns produce descriptive errors.

Implementation notes
- Implement parsing using Node fs and minimal RFC4180-compliant parsing logic in src/lib/main.js or a small helper module under src/lib/.
- Add unit tests in tests/unit/ that cover quoted fields, missing lines, header and headerless inputs.