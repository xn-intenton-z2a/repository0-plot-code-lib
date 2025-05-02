# Overview
This merged feature integrates robust plot generation and inline SVG rendering into a single coherent CLI tool. It enhances argument parsing, supports dynamic dimension calculations for both single and multiple mathematical expressions, and provides consistent error handling and logging for better user feedback. Enhancements cover both SVG output for instant visualisation and PNG conversion when specified.

# Functionality
The feature updates the core CLI tool (src/lib/main.js) to:
- Parse multiple flags including --expression, --range, --file, --width, --height, and --output-format.
- Validate that required flags are provided. For example, the --expression flag is mandatory, and when output format is PNG, the --file flag must be present.
- Dynamically calculate SVG dimensions based on the number of expressions provided. For single expression plots, width defaults to 640 and height to 400 (or overridden by --width). For multiple expressions, --height specifies the segment height and overall SVG height is calculated as the segment height multiplied by the number of expressions.
- Convert SVG to PNG using minimal dependency updates when PNG output is requested.
- Provide detailed error messages with timestamps for missing or invalid parameters.

# Testing and Documentation
- Update unit tests in tests/unit/plot-generation.test.js and tests/unit/main.test.js to validate flag parsing, dynamic SVG/PNG conversion, and proper error conditions.
- Revise usage examples in README.md and USAGE.md to reflect enhanced functionality and clear guidelines for both SVG and PNG outputs.
- Align updates with the mission to deliver a reliable and intuitive plotting CLI tool that transforms mathematical expressions into accurate visual representations.

# Integration
- All source changes are limited to src/lib/main.js and associated tests and documentation files. No new files are created or removed, ensuring a focused and achievable enhancement in this single repository.