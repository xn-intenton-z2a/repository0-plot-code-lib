# Overview
This feature consolidates all plot generation capabilities into a single unified CLI tool. It combines SVG rendering, dynamic dimension calculation, axis labeling, and PNG conversion into one coherent flow. The tool now supports multiple expressions with customizable segment heights, optional axis labels via --xlabel and --ylabel, and consistent error handling to ensure a smooth user experience aligned with our mission of reliable mathematical visualisations.

# Functionality
- Parses mathematical expressions separated by semicolons and adjusts SVG output based on whether a single or multiple expressions are provided.
- Supports dynamic dimension settings; a fixed height for a single expression and computed total height for multiple expressions based on a segment height parameter.
- Implements optional axis labels that can be added to the SVG when --xlabel and --ylabel flags are provided.
- Integrates PNG conversion using the sharp library when --output-format is set to png and --file is provided. Ensures that missing flags trigger clear error messages with timestamps.
- Maintains robust input validation for numerical dimensions and required flags, and provides informative console logs.

# Implementation
- Updates are centralized in the src/lib/main.js file to handle command-line parsing for all new and legacy flags.
- The renderSVG function has been extended to include axis label positioning and range display if provided.
- Error handling is improved to give timestamped error messages for missing --expression or --file flags in case of PNG conversion.
- Unit tests in tests/unit/plot-generation.test.js and tests/unit/main.test.js have been updated to cover all new functionalities including axis labels and PNG conversion.
- Documentation in USAGE.md and the main README.md is updated with detailed usage examples covering all scenarios (single expression, multiple expressions, axis labels, and PNG output).

# Testing & Documentation
- Comprehensive unit tests ensure correct SVG structure, proper axis label integration, and successful PNG file creation when appropriate flags are set.
- Documentation is enhanced to reflect the unified design, providing clear instructions and examples that support the tool’s mission of delivering high-quality, trusted plotting capabilities.