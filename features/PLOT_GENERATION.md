# PLOT_GENERATION Feature

## Overview
This feature implements the core plotting functionality of the repository. Building on the CLI parser, the new logic processes the mathematical expression and range parameters to generate SVG plots dynamically using the D3 library. This fulfils the key mission goal of transforming mathematical expressions into visual plots that users can save as SVG or PNG files.

## Implementation Details
- Update the main source file (src/lib/main.js) to integrate plotting logic. After parsing CLI arguments, validate the mathematical expression and range values.
- Utilize D3 to create an SVG element with predetermined dimensions (e.g., 640x400) and margins as specified in D3_JS guidelines. Setup x-scale and y-scale functions, axes, and basic plot elements.
- The logic should support generating a plot SVG string based on the given parameters. If the output file parameter (--file) is provided, the plot is written to that file.
- Update error handling to ensure that if the plotting parameters are invalid, a user-friendly error is provided.
- Modify package.json to add d3 as a dependency (e.g. version ^7.8.2) to leverage its plotting capabilities.

## Testing
- Update tests in tests/unit/main.test.js to simulate CLI inputs that include valid mathematical expressions and range parameters. The tests should verify that an SVG string is generated and that the output file (if specified) is created.
- Include tests for invalid inputs to ensure proper error messaging and graceful failure.

## Documentation
- Update the README.md file with instructions and examples demonstrating the use of the new plotting functionality. Provide example CLI commands such as:
  node src/lib/main.js --expression "y=sin(x)" --range "x=-3:3,y=-1:1" --file output.svg
- Describe the role of D3 in creating dynamic SVG plots and how users can modify plot parameters.

## Dependencies
- Add d3 to the dependencies list in package.json under dependencies. This dependency is critical for handling SVG generation and scaling as per the provided D3_JS guidelines.
