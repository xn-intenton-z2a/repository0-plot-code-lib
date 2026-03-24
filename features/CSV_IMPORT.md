# CSV_IMPORT

Summary
Load time series data from a CSV file with columns time,value and return a typed array of points.

Specification
- Accept CSV files with a header row that must contain time and value columns (case-insensitive).
- API: loadCSV(filePath, options?) -> Array of {time: String, value: Number}. The parser should trim whitespace, accept ISO-8601 timestamps or plain strings for time, and parse value as Number.
- Robustness: tolerate extra blank lines and Windows CRLF line endings; throw an informative error for missing required columns or unparsable numeric values.

Acceptance criteria
- Given a CSV file with header time,value and one data row, loadCSV returns an array with one element where value is numeric.
- Missing columns or non-numeric values result in a thrown Error.

Test plan
- Add tests/unit/csv.test.js using small CSV fixtures to verify correct parsing and error conditions.

Files to change
- src/lib/main.js: export loadCSV implementation.
- tests/unit/csv.test.js: unit tests described above.
