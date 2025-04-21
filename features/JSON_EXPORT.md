# JSON_EXPORT Feature Enhancement

This update refines the JSON_EXPORT feature by adding support for exporting time series data in JSON format. When users specify an output file with a `.json` extension via the `--file` flag, the CLI tool will serialize the computed time series data into a formatted JSON string. This update complements existing CSV, SVG, and PNG export options and ensures that all supported export formats are available via the CLI.

## Overview

- **Objective:** Allow users to export the generated time series data in JSON format for programmatic consumption or further processing.
- **Benefit:** Provides an additional data export option that is especially useful for users who wish to integrate the generated data with other tools or systems.
- **Usage Example:**
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.json
  ```

## Implementation Details

- **CLI Parameter Parsing:**
  - Extend the argument parsing in `src/lib/main.js` to check if the output file name ends with `.json`.
  - When the file extension is `.json`, the tool should generate the time series data using the existing `generateTimeSeriesData` function.

- **Data Serialization:**
  - Instead of generating CSV or graphical plots, serialize the data to JSON using `JSON.stringify(data, null, 2)` to produce a human-readable format.
  - Write the resulting JSON string to the specified output file using `fs.writeFileSync`.

- **Branching Logic in Main Function:**
  - If `outputFile.endsWith(".csv")`, maintain the current CSV generation workflow.
  - Else if `outputFile.endsWith(".json")`, generate the JSON output.
  - Else, continue with generating enhanced SVG/PNG plots as implemented.

## Testing Enhancements

- **Unit Tests:**
  - Update tests in `tests/unit/main.test.js` to include a scenario where the `--file` flag ends with `.json`.
  - Verify that the output file contains valid JSON starting with `{` and that all expected key-value pairings are present.

## Documentation Updates

- **README.md:**
  - Document the new `--file output.json` behavior and provide a usage example.
  - Explain that when a `.json` file is specified, the CLI tool writes a formatted JSON representation of the computed time series data.

## Conformance with Mission and Guidelines

- This enhancement provides additional export flexibility to the CLI tool, aligning with the mission of being the "jq of formulae visualisations." All changes are confined to the source, test, and README files, in full compliance with repository contribution guidelines.