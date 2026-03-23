CSV_LOADER

Overview

Load time series CSV files with columns time,value and return a canonical array of data points. This loader is intentionally small and dependency-free; it uses Node's fs and simple line parsing.

Behavior

- Expose a named export loadCsv(path) that reads the file at path and returns an array of objects {time: string|number, value: number}.
- The loader expects the first line to be a header containing time and value (order tolerant). Rows with parse errors should be rejected or omitted depending on a strict mode flag.

API

- loadCsv(filePath, options?) -> Array<{time, value}>
  - options.strict (boolean, default true) — when true, malformed rows throw; when false, malformed rows are skipped with a warning.

Acceptance criteria

- Given a CSV with header time,value and N rows, loadCsv returns an array length N with numeric value fields.  
- Timestamps are preserved as strings if not parseable, or converted to numbers (Unix epoch) when they are numeric/ISO-8601 parsable.  
- Loader operates without external dependencies.

Testing

- Unit tests should exercise a small fixture CSV file and assert correct parsing and error behavior for strict vs non-strict modes.

Implementation notes

- Keep parsing straightforward: split lines, trim fields, and parse numbers with Number(value). Document behavior for timestamp parsing in the README.