# CSV_LOADER

# Description

Add a CSV loader for time series files with columns time,value. The loader accepts a file path or raw CSV content and returns a normalized array of time series points. Time values are preserved as ISO 8601 strings and value fields are parsed as numbers. The loader should be tolerant of extra whitespace and blank lines and should validate the presence of the required header.

# Acceptance Criteria

- Export loadTimeSeriesCsv from src/lib/main.js that accepts a path or CSV string and returns an array of objects with properties time and value.
- Given a CSV with header line "time,value" and rows like "2023-01-01T00:00:00Z,1.23", the loader returns an element { time: "2023-01-01T00:00:00Z", value: 1.23 }.
- The loader skips blank lines and trims whitespace, and throws a descriptive error if the header is missing or the required columns are not present.
- Value fields are parsed as numbers and the loader throws a descriptive error if a value cannot be parsed as a finite number.