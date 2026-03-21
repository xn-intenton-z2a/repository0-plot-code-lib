# CSV_LOADER

Purpose
Load time series CSV files with columns time and value and return an array of time-value points suitable for plotting.

Scope
- Accept RFC4180-style CSV with an optional header row
- Parse the first two columns as time and value; if a header exists it should be time,value
- Convert the value column to a numeric type and surface parse errors clearly

Implementation Notes
- Use Node fs to read files and implement a small RFC4180-compatible parser to handle quoted fields and commas
- If the CSV has a header row detect it by name; otherwise use column position
- Expose a simple API parseCsvToSeries(path) returning an array of objects {time, value}
- Reference RFC4180.md for parsing edge cases

Acceptance Criteria
- Parsing a CSV with header time,value returns an array of objects where value is a number
- Rows with non-numeric values are either skipped or reported with a clear error per implementation choice
- Unit tests cover header and no-header CSV fixtures and quoted fields
