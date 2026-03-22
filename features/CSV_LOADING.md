# CSV_LOADING

Summary
Load time series CSV files with header columns time and value and convert them into numeric data series suitable for plotting.

Specification
- Accept CSV files where the first line contains headers including time and value (case-insensitive).
- Parse time values: when ISO 8601 strings are present, convert to numeric timestamps (milliseconds since epoch); when numeric, parse as numbers.
- Parse value column as floating point numbers; by default skip rows with missing or non-numeric values, or fail when the strict option is set.
- Export loadCsv(path, options) from src/lib/main.js; options may include {strict: boolean}.

Files to change
- Implement loadCsv in src/lib/main.js.
- Add unit tests tests/unit/csv.test.js and include a small example CSV in examples/data.csv.
- Document CSV behavior in README.md.

Acceptance Criteria
- Given a CSV with header time,value and rows of ISO times and numeric values, loadCsv returns an array of numeric time and value pairs.
- Malformed numeric values are either skipped or cause an error depending on the strict option.
- The function is exported and covered by unit tests.
