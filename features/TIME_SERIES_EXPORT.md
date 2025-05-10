# TIME_SERIES_EXPORT

## Value

- Enables users to save generated time series data to disk in standard formats for downstream analysis or sharing.
- Complements existing generation output to stdout by persisting data, meeting the mission of reading and writing data in standard formats.

## Behavior

1. Dependencies
   - Use builtin fs/promises for file I O.

2. CLI Arguments
   - --expression (required): Mathematical expression as before.
   - --range (required): Numeric range definition as before.
   - --outputFile (optional): File system path where the output will be saved.
   - --format (optional): Data export format, either json or csv. Default is json.

3. Generation and Export Logic
   - Reuse TIME_SERIES_GENERATION logic to produce an array of { x, y } data points.
   - If format is json, serialize the array with JSON stringify.
   - If format is csv, build a header line x,y and join each data point as comma separated values.
   - If outputFile is provided, write the serialized data to disk at that location.
   - If outputFile is omitted, print the serialized data to stdout.
   - Validate that the format flag matches the extension of outputFile when provided.

4. Output
   - On success, if data is written to a file, print a confirmation message with the path.
   - If writing fails or format is invalid, print an error and exit with a non zero status.

## Implementation Changes

- src/lib/main.js: Extend argument parsing to include outputFile and format flags; implement file write and serialization logic.
- tests/unit/time-series-export.test.js: Add tests to cover JSON and CSV export, file write behavior, stdout fallback, and error cases using mocks for fs.
- README.md: Update usage section with examples of exporting to a file in JSON and CSV formats.
- package.json: No new dependencies required; fs/promises is builtin.