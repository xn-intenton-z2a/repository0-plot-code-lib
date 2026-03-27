# CSV_IMPORT

Overview

Load time series data from a CSV file with header columns time,value and return a normalized array suitable for plotting. The loader must be forgiving about whitespace and line endings and must validate numeric conversion.

Behavior

- Read CSV files that begin with a header row containing time and value columns.
- Parse time as an ISO 8601 timestamp string (implementers may convert to Date objects where helpful) and value as a number.
- Ignore empty lines and trim whitespace. Invalid numeric values should cause a descriptive error or be reported as NaN depending on API options.

Acceptance Criteria

- Given a CSV with header time,value and N data rows, the loader returns an array of length N with parsed time and numeric value entries.
- The loader rejects files missing the required header columns.
- The loader is exported as a named function from src/lib/main.js and used by the CLI when --csv is provided.