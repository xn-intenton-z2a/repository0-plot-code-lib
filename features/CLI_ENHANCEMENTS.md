# CLI_ENHANCEMENTS Feature Update

## Overview
This feature consolidates and enhances all CLI related functionality into a single cohesive module. It merges the capabilities of calculating statistics for mathematical expressions, robust command line argument parsing for plotting, and basic SVG plot generation into one updated source file. This unified feature streamlines the CLI interface while preserving all existing functionality and extending it with SVG plot output support.

## CLI Parameter Parsing & Validation
- The CLI now accepts the following parameters:
  - --expression for the mathematical expression to be plotted.
  - --range in the format "x=start:end,y=start:end" for specifying the domain and range.
  - --file to indicate the output file. If the file extension is .svg, the CLI will generate SVG output.
  - --stats, an optional flag that when enabled will compute and display summary statistics (minimum, maximum, average) for y-values derived from the expression.
- Extend the argument schema in the source file using available libraries like zod to validate each parameter.
- Provide clear error messages and a printed usage guide when required inputs are missing or invalid.

## Implementation Details
- Update src/lib/main.js to integrate the following behaviors:
  - Process the --stats flag to compute basic statistics on the computed y-values and print formatted summary labels.
  - Validate and parse the --expression and --range parameters and check for misformats.
  - If a --file parameter is provided ending with .svg, generate a minimal SVG content. Use the SVG namespace and guidelines provided in the library documentation. The generated SVG should include essential elements such as the svg tag with proper attributes, and a basic graphical element (for example a line or path) representing the plotted data.
  - Ensure that all new functionalities remain within the single source file, updating logic without adding new files or modifying file structure.

## Testing Enhancements
- Update tests/unit/main.test.js to verify:
  - When the --stats flag is active, the output includes correctly computed statistics.
  - Successful execution with valid CLI parameters, including cases when the --file parameter is provided as an SVG filename. The test should check that the SVG string output includes the <svg> element.
  - Cases where invalid or incomplete parameters are provided, confirming that error messages and usage guide are correctly printed.

## Documentation Updates
- Update README.md to reflect the enhanced CLI functionality. Include updated examples that show:
  - How to use the --expression, --range, and --file parameters with .svg output.
  - The effect of enabling the --stats flag with corresponding output for statistics.
- Ensure the documentation clarifies the underlying functionality being consolidated from previous STATS and PLOT features.

## Dependency and Compatibility
- Maintain compatibility with Node 20 and ECMAScript modules.
- Rely only on updating contents of the source file, test files, README, and dependencies file if necessary.

This consolidated feature delivers achievable value by combining and extending existing capabilities into one improved CLI module that aligns with the product mission of being the go-to CLI tool for formula visualisations.