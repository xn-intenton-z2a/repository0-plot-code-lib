# JSON_EXPORT Feature Enhancement

This feature introduces a new output option for the CLI tool that allows users to export the generated time series data in JSON format. When a user specifies an output file with a .json extension via the `--file` flag, the tool will output the raw JSON representation of the computed data.

## Overview

- **New CLI Behavior:** Detect when the `--file` parameter ends with `.json`.
- **JSON Output:** Instead of generating CSV or dummy SVG content, the tool will serialize the time series data as JSON.
- **User Benefit:** This allows programmatic consumption of the generated data for further processing or integration with other tools.

## Source Code Changes (src/lib/main.js)

- **Argument Parsing Update:** In the main function, extend the conditional check to determine if the output file ends with `.json`.

- **Implementation Details:**
  - If the output file ends with `.csv`, generate CSV content as before.
  - Else if the output file ends with `.json`, call `generateTimeSeriesData(expression, range)` and then output the result using `JSON.stringify(data, null, 2)` to provide a formatted JSON output.
  - Else, default to the existing dummy SVG generation for other file extensions.

## Testing Enhancements (tests/unit/main.test.js)

- **New Test Case:** Add a test scenario that passes an output file name ending with `.json`.
  - Verify that the CLI prints a valid JSON string starting with `{` and containing the key-value pairs for the generated time series.

## Documentation Updates (README.md)

- Update the README to include the new `--file` behavior for JSON export. Example usage:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.json
```

Explain that when using a `.json` output, the tool writes the full JSON serialization of the time series data.

## Dependency and Build Consistency

- No new dependencies are required. All modifications are confined to the source file, test file, and README updates.
- The changes remain compatible with Node 20 and adhere to ECMAScript module standards.

## Conformance with Mission and Guidelines

This enhancement supports the mission of being a go-to plot library by providing an additional export format that can be directly consumed by other tools. The JSON export option adds flexibility and complements the existing CSV and SVG functionalities without altering the current workflow.
