# Overview
This enhancement consolidates and upgrades core improvements to the CLI tool by fully implementing customizable dimensions for SVG output. In addition to robust multi-expression support and enhanced error logging, the CLI will now fully support the --width and --height flags. Users can specify a custom overall SVG width for single-expression plots and set a custom height for each segment in multi-expression plots.

# Implementation
- Update the parseArgs function in the main source file (src/lib/main.js) to detect the additional optional flags --width and --height. Validate these flags to ensure the provided values are numeric and within a reasonable positive range.
- For single-expression plots, modify the generateSVG function to use the provided width (if any) instead of the default 640. Retain the default height of 400.
- For multi-expression plots, modify the generateMultiSVG function to set the overall SVG width based on the --width flag when provided, and use the --height flag (if provided) for each segment’s height instead of the fixed value of 100. Update the total height accordingly.
- Maintain backward compatibility so that if --width and/or --height are not provided, the default values are used.
- Enhance error logging: if the provided dimensions are not valid numbers or are out of bounds, log an appropriate error message.

# Testing & Quality Assurance
- In the unit test file (tests/unit/plot-generation.test.js), add tests that simulate CLI calls with valid and invalid --width and --height values. Verify that:
  - For a single expression, the generated SVG includes the custom width when the flag is provided.
  - For multiple expressions, the generated segments use the custom height if specified, and the overall SVG width reflects any override.
  - Invalid dimension values trigger proper error logging without crashing the CLI.

# Documentation
- Update the Usage Guide (docs/USAGE.md) and README.md to include examples demonstrating the use of --width and --height.
- Document the default behavior when these flags are omitted and provide guidance on valid numeric ranges.

# Conclusion
This feature significantly enhances the flexibility of the plotting tool by allowing users to customize output dimensions directly from the CLI. The improvements align with the mission of being a versatile and user-friendly plotting library by offering configurable graphic outputs while preserving core functionalities such as multi-expression handling and error reporting.