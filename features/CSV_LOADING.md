# CSV_LOADING

Summary
Load time series data from a CSV file with columns time and value and return a sorted array of numeric records for plotting.

Specification
- Provide a named export loadCsv(filePath) which reads a CSV file on disk and returns an array of objects with numeric time and value fields.
- The CSV reader must accept a header row with columns named time and value, tolerate trailing blank lines and CRLF or LF line endings, and reject rows with non-numeric fields.
- This function is explicitly node-only and may use Node file APIs for reading local files.

Acceptance Criteria
- loadCsv is exported as a named export from src/lib/main.js and reads files using Node file I/O.
- Given a CSV file with header time,value and three well-formed rows, loadCsv returns an array of three numeric records sorted by time.
- loadCsv ignores empty lines and handles both CRLF and LF line endings.

Testing notes
- Unit tests should use small temporary CSV fixtures and verify numeric conversion and ordering.