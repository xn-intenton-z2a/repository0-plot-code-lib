# CSV_IMPORT

Summary
Describe loadCsvTimeSeries which loads time,value CSVs in Node.js and returns rows for plotting.

Specification
- Function: loadCsvTimeSeries(csvPath) -> Array of { time: String, value: Number }.
- Behavior: Node-only. Accepts CSV files with a header containing time and value (case-insensitive). Tolerates BOM, CRLF, and blank lines.
- Fallback semantics: if a header is missing or names not present, columns are interpreted by position (time from column 0, value from column 1). Non-numeric values are represented as NaN.
- Errors: throws on file read errors.

Acceptance criteria
- Given a CSV file with header time,value and one valid data row, loadCsvTimeSeries returns an array with one element whose value is a finite Number.
- Given a CSV missing a header row, function returns rows using column positions for time and value.
- The function throws when the file is unreadable and is only available in Node.js execution.

Test plan
- tests/unit/csv.test.js should create temporary CSV fixtures and assert parsed rows, NaN handling, and error cases.
