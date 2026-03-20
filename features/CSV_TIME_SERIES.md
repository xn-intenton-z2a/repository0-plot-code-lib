# CSV_TIME_SERIES

Summary

Add a small CSV loader focused on time series CSV files with columns time and value. It should parse CSV content into a normalized array of records suitable for plotting and downstream rendering.

Scope

- Accept CSV files with header columns named time and value (case-insensitive). Lines with missing values should be rejected unless a permissive mode is specified.
- Support common time formats including ISO 8601 and numeric epoch seconds or milliseconds; provide an option to return time as Date objects or as numeric epoch milliseconds.
- Expose a named export loadTimeSeries from src/lib/main.js that accepts a file path or CSV string and returns an array of {time, value} where value is a number.

Acceptance criteria

- Given a CSV containing lines with time and value columns, loadTimeSeries returns an array with the correct number of records and numeric values.
- Timestamps in ISO 8601 are parsed into valid Date objects (or epoch numbers when requested).
- Malformed value fields produce parse errors in strict mode and are documented as configurable behavior.

Implementation notes

- Keep implementation minimal and dependency-free; use String.split and simple parsing logic rather than a full CSV library to keep the surface area small.
- Provide a test fixture CSV in tests/unit/ for deterministic assertions.

Tests

- Unit test that a small CSV string with three rows produces an array of length three with numeric values and parsed times.
- Unit test that epoch timestamps are accepted and converted correctly.

# END
