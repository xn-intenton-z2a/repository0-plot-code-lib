# CSV_LOADER

Summary
Load time series data from CSV files with header columns time and value and return a typed array suitable for plotting.

Goals
- Provide a loader that reads CSV files following RFC4180 conventions and returns an array of { time: Number|String, value: Number }.
- Accept files with a header row time,value and also tolerate common whitespace and line ending differences.

API Contract
- loadCsv(pathOrStream) -> Promise<Array<{ time, value }>>
  - The function reads the CSV, validates the presence of time and value columns, and parses value as Number.
  - time may be left as the original string or converted to a numeric timestamp depending on options; tests should cover both behaviours.

Behavior and constraints
- Badly formatted rows, missing headers, or non-numeric values should either be skipped with a warning or cause a descriptive Error depending on an options flag. Default behaviour should be strict (throw on invalid rows).

Acceptance Criteria
- A CSV file with header line time,value and two data rows is parsed into an array of length 2 with numeric value fields.
- Missing header or missing value cells cause a descriptive Error in strict mode.

Deliverables
- Named export loadCsv from src/lib/main.js and unit tests covering header detection, numeric parsing, and error handling.

Notes
- Use Node filesystem streams and a small CSV parser implementation; avoid pulling a large CSV dependency when possible.