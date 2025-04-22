# JSON_OUTPUT Feature Enhancement

This feature adds the option to output computed time series data in JSON format via a new CLI flag `--json`. While the tool already supports CSV export through the `--export` flag, JSON output provides an alternative, structured data format that is widely used and easily integrated with web applications and further data processing pipelines.

## CLI Parameter Parsing & Validation

- Extend the CLI schema in `src/lib/main.js` to include a new optional boolean flag `json`.
- Validate that if `--json` is provided, it does not conflict with other export options (like `--export`) that expect CSV output. When both are provided, the JSON format takes precedence, and the output is sent to stdout or to a file if an appropriate filename with a `.json` extension is specified using the `--file` flag.

### Example CLI Usage:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --json
node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --json --file output.json
```

## Implementation Details

- **Source Modifications (`src/lib/main.js`):**
  - Parse the `--json` flag along with existing parameters.
  - After evaluating the expression over the specified range, if the `json` flag is active, format the time series data into a JSON object/array. For example, output an object with keys for `expression`, `range`, and a `data` array with entries `{ x: <number>, y: <number> }`.
  - If a `--file` option is provided and the file ends with `.json`, write the JSON string to the file. Otherwise, output the JSON to the console.

- **Testing Enhancements (`tests/unit/main.test.js`):**
  - Update the test suite to include cases where the `--json` flag is used, both with and without the `--file` flag.
  - Verify that the JSON output correctly formats the computed time series data and that the output structure meets the expected schema.

- **Documentation Updates (`README.md`):**
  - Update the README to document the new `--json` flag. Explain the benefits of JSON output and include usage examples as shown above.

- **Dependency and Build Consistency:**
  - No new external dependencies are required as JSON conversion is handled with built-in JavaScript methods. Ensure that modifications remain compatible with Node 20 and ECMAScript module standards.

## Summary

The JSON_OUTPUT enhancement provides users with a flexible and modern data export option, complementing the existing CSV export feature. This change aligns with our mission to be a go-to plot library and enhances the tool's applicability for integrations with modern web and data processing workflows.