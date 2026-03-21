# CSV_LOADER

Overview

Load time series data from a CSV file with columns time,value and return a numeric series suitable for plotting.

Specification

- Named export: loadCsv(pathOrString)
- Accept RFC4180-style CSV with a header row time,value
- For numeric time values return time as Number; for ISO 8601 strings convert to epoch milliseconds (Number)
- Values are parsed to Number; rows with non-numeric value should be rejected or omitted with a clear error depending on option

Acceptance Criteria

1. loadCsv is exported as a named export from src/lib/main.js
2. Given CSV content with header time,value and rows 0,1 and 1,2 the loader returns an array [{time:0,value:1},{time:1,value:2}]
3. The loader correctly handles quoted fields and escaped quotes per RFC4180
4. The loader signals a clear error when required columns are missing

Implementation Notes

- Implement a small, well-tested CSV parser following RFC4180 rules; do not pull in a heavy CSV dependency unless justified.
- Convert time values that look like ISO dates using Date.parse and fall back to numeric parse otherwise.

Tests

- Unit tests should include simple numeric CSV and a quoted-field example to validate RFC4180 compliance.