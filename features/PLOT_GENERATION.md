# Overview

This update extends the plotting functionality to support both SVG and PNG outputs. In addition to generating a standard SVG plot from a mathematical expression, the tool now accepts an optional CLI flag to convert the output to a PNG file. This enhancement directly aligns with the mission of providing versatile output formats, giving users the flexibility to choose the format that best fits their needs.

# Implementation Details

- Extend the CLI parser in the main source file (src/lib/main.js) to recognize a new flag: --output-format. This flag accepts a value of either 'svg' or 'png'. The default output is 'svg'.
- If the --output-format flag is set to 'png', after generating the SVG string the code should pass the SVG content to a PNG conversion function.
- Leverage the sharp library for converting SVG content to PNG format. Update the package.json file to include sharp as a dependency (e.g. version ^0.32.1).
- The conversion process involves creating a Sharp instance from the SVG string and writing the resulting PNG data to a file specified by the --file flag. If the conversion fails, provide a user-friendly error message.
- Ensure that error handling covers cases where an invalid output format is provided, or when file writing fails.
- Update the README.md documentation to include instructions and usage examples for the new --output-format flag. For example:
  node src/lib/main.js --expression "y=sin(x)" --range "x=-3:3,y=-1:1" --output-format png --file output.png

# Testing

- In tests/unit/main.test.js, add tests that simulate CLI inputs with the --output-format flag. Verify that when png is specified:
  - The SVG is successfully converted to PNG using the sharp library.
  - The output file is correctly written as a PNG file (e.g., checking for PNG header bytes if possible).
- Maintain existing tests for SVG output and error handling for missing/invalid parameters.
- Include test cases for error handling when an unsupported output format is specified.

# Documentation & Dependencies

- Update the README.md file to document the new functionality and show usage examples with the --output-format flag.
- Modify package.json to add a dependency on the sharp library, ensuring the deployment process installs sharp along with existing dependencies.
- This update maintains integration with the existing CLI parser and plotting logic, providing a seamless enhancement for users in line with the overall mission of the repository.