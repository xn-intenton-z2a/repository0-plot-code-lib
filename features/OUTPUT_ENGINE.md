# OUTPUT_ENGINE Feature Enhancement

This feature consolidates various output options into a single, unified output engine. It merges the functionality from the D3PLOT, JSON_OUTPUT, PNG_OUTPUT, DATA_EXPORT, and PLOT features to streamline the user experience for generating plots and exporting data. The output engine supports multiple output formats including SVG, PNG, JSON, and CSV from one central CLI interface.

# CLI Parameter Parsing & Validation

- Update the CLI parser in src/lib/main.js to recognize a set of output-related flags including --d3plot, --json, --export, and --file.
- Detect the file extension from the --file parameter. If the extension is .png, trigger the PNG conversion routine after generating the SVG plot.
- If the --json flag is provided (taking precedence over CSV export), format the computed time series data into JSON using built-in JavaScript methods.
- When the --export flag is used without --json, output data in a CSV format with headers. 
- Ensure that, when multiple output options are provided, the priority is maintained: JSON output overrides CSV, and visual plot outputs (SVG/PNG) are processed separately based on the file extension.

# Implementation Details

- Modify the main evaluation routine in src/lib/main.js to compute the time series data from the provided mathematical expression and range.
- For plot outputs:
  - Generate SVG content using the existing D3-based routines when the --d3plot flag is active.
  - If the user provides a .png file extension, convert the generated SVG to PNG using a conversion routine (adding the sharp dependency if necessary).
- For data exports:
  - If the --json flag is active, format and output the data as a JSON object or array, optionally writing to a file if the --file parameter is provided with a .json extension.
  - If the --export flag is used and no --json flag is present, convert the data to a CSV string with proper header rows and write to the specified file path.
- Update the test suite in tests/unit/main.test.js to add cases that verify:
  - Correct recognition and parsing of output-related flags.
  - Proper file extension detection and correct activation of PNG conversion routines.
  - Valid JSON formatting of output when requested.
  - CSV generation that includes headers and correct data rows.
- Revise the README.md to include clear usage examples and documentation of the unified output engine, illustrating how to use the various output options.

# Dependency and Build Consistency

- Ensure compatibility with Node 20 and ECMAScript module standards. 
- Add the sharp library to package.json dependencies if PNG output conversion is required, keeping the project in line with modern build practices.
- All changes adhere to the guidelines in CONTRIBUTING.md and align with the mission in MISSION.md to become the go-to plot library for formula visualisations.

# Benefits

- Simplifies the CLI by unifying multiple output functions into one maintainable code path.
- Reduces code duplication and increases overall consistency in data export and plot generation.
- Enhances user experience by providing clear, prioritized output options in a single feature.
