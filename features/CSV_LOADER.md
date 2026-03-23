# CSV_LOADER

Status: Implemented

Overview

Load time series CSV files with columns time,value and return a canonical array of data points. The loader uses Node fs in the current implementation and accepts a strict mode option for malformed rows.

Behavior

- Expose loadCsvTimeSeries(path) that reads a CSV and returns an array of {time, value} objects.
- The loader tolerates different column orders when headers are present and falls back to positional parsing when headers are absent.
- Non-numeric timestamps are attempted to be parsed as ISO-8601 dates; when parsing fails a fallback index or numeric conversion is used.

Acceptance criteria (testable)

- Given a CSV with a header row time,value and N data rows, loadCsvTimeSeries(path) returns an array of length N with numeric value fields.
- Timestamps parse as numbers when numeric or as epoch milliseconds when ISO-8601; otherwise a stable fallback index is used.
- Loader performs without external dependencies and throws descriptive errors in Node environment when the file cannot be read.

Testing notes

- Unit tests should use small fixture CSV files in tests/unit/ and assert correct parsing, strict vs non-strict behaviour, and error messages for unreadable files.

Implementation notes

- Implementation location: src/lib/main.js. Keep parsing deterministic and document edge cases in README.
