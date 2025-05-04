# Purpose
Enable the CLI tool to parse a mathematical expression and a numeric range from user input and generate a sequence of (x, y) points representing a time series.

# Behavior
1. Accept CLI flags:
   - --expression: a single-variable formula over x, e.g. y=sin(x) or sin(x)
   - --range: numeric range in the form start:end[:step], e.g. 0:10 or -1:1:0.1
   - --points: optional override of default point count when step is not provided, default 100
   - --output-file: path to write the result; if omitted, print to stdout
   - --format: output format, either csv or json, default csv
2. Parse the range string to derive an array of x values.
3. Use a math parser library (e.g. mathjs) to evaluate y for each x.
4. Build an array of objects { x: number, y: number }.
5. Serialize the array to CSV or JSON based on --format and write to the file or stdout.
6. Exit with non-zero status if parsing fails or output file cannot be written.

# Implementation
- Add dependency on mathjs for secure expression evaluation.
- In main.js, replace the argument echo with:
  1. A lightweight CLI parser (e.g. zod or manual) to extract and validate flags.
  2. A range parser to split start, end, and optional step or compute step from --points.
  3. A loop that computes y for each x via mathjs.evaluate.
  4. Serialization logic for CSV and JSON.
- Ensure all warnings and errors are user-friendly.

# Testing
- Unit tests for:
  - Valid and invalid expression syntax.
  - Range parsing edge cases: missing start, end, non-numeric, zero step.
  - Correct number of points when step and points flags are used.
  - Output format switching: valid CSV and JSON content.
  - File writing behavior and stdout fallback.
