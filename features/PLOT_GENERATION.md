# Purpose
Extend the existing plot generation feature to support plotting from existing time series data files in CSV or JSON formats, in addition to inline expression and range generation.

# Behavior
1. Accept new CLI flag --input-file with a path to a CSV or JSON file containing an array of { x, y } points. When provided, skip expression and range flags and use file data.
2. Retain existing flags: --expression, --range, --points, --output-file, --plot-format, --width, --height, and --title. If both --input-file and expression flags are given, input-file takes priority.
3. Detect file extension. For .csv, parse rows into objects with numeric x and y. For .json, parse a JSON array of objects.
4. Validate the parsed data matches the expected schema, then pass the array to the plot renderer.
5. Render the plot in SVG or PNG based on --plot-format and write the output to --output-file or exit with a clear error if writing fails.

# Implementation
- Extend the existing CLI parser in main.js to recognize and validate the --input-file flag and detect its extension.
- Import or add a lightweight CSV parser for .csv files and use the built-in JSON parser for .json files.
- In the main workflow, branch: if --input-file is set, read the file, parse into an array of points, validate schema; otherwise run time series generation as before.
- After obtaining the array of { x, y } points, call the plot renderer to draw axes, labels, and the data polyline, serializing to SVG or PNG.
- Ensure all file I/O and parsing errors are caught and reported with user-friendly messages.

# Testing
- Unit tests for reading and parsing input files:
  - Valid CSV input file produces correct array of points.
  - Valid JSON input file produces correct array of points.
  - Missing or unreadable file yields an error.
  - Unsupported file extension yields an error.
  - Malformed content yields a schema validation error.
- Integration tests to verify:
  - Supplying --input-file and --plot-format svg generates an SVG document with expected elements.
  - Supplying --input-file and --plot-format png generates a valid PNG buffer of non-zero length.
  - When --input-file is provided, expression and range flags have no effect.
  - File write failures produce clear error messages.