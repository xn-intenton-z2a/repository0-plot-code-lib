# Overview
This enhancement consolidates and upgrades core improvements to the CLI plotting tool. It extends support for customizable SVG dimensions by allowing users to specify optional width and height parameters via the command line. In addition to handling single and multiple expression plots, the feature ensures robust error logging, backward compatibility with default dimensions, and improved documentation.

# Implementation
- Update the CLI argument parser in the source file (src/lib/main.js) to validate and parse optional --width and --height flags.
  - Validate that provided values are positive numbers.
  - Ensure that invalid inputs produce descriptive error messages without crashing the tool.
- For single expression plots:
  - Use the custom --width value if provided, defaulting to 640 otherwise.
  - Retain a fixed height of 400.
- For multiple expression plots:
  - Use the custom --width value for overall SVG width and a custom --height value for each segment or default to 100 per segment.
  - Calculate total SVG height as segment height multiplied by the number of expressions.
- Preserve backward compatibility so that if custom dimension flags are omitted, the tool uses hardcoded defaults.
- Update error logging to include detailed messages that reference the specific flag error, and log with timestamp.

# Testing & Quality Assurance
- In the test file (tests/unit/plot-generation.test.js), add tests to simulate CLI calls with both valid and invalid values for --width and --height:
  - Ensure that valid numeric values are correctly applied to the generated SVG output for both single-expression and multi-expression plots.
  - Verify that invalid values (non-numeric or non-positive) trigger appropriate error messages and do not proceed with SVG generation.
  - Confirm that each segment in a multi-expression plot reflects the custom height when provided.

# Documentation
- Update the Usage Guide (docs/USAGE.md) and README.md to include detailed instructions and examples for using the --width and --height flags.
  - Clearly specify default values and valid numeric ranges.
  - Provide sample CLI commands demonstrating single expression plots and multi-expression plots with customized dimensions.

# Conclusion
This updated feature significantly enhances the tool's flexibility by allowing users to tailor the SVG output dimensions to fit their specific needs. The improvements align with the mission to be a versatile, user-friendly plotting library while preserving core functionalities such as multi-expression support and robust error handling.