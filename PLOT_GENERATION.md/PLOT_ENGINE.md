# Overview
This feature consolidates all functionalities required for generating plots from mathematical expressions into a single, unified CLI tool. It provides robust inline SVG rendering, dynamic handling for single and multiple expressions, comprehensive style customizations, and optional PNG conversion using the sharp library. The design ensures clear error reporting and precise dimension calculations, aligning with the mission of delivering reliable and user-friendly plot visualizations.

# Functionality
- Accepts one or multiple mathematical expressions (separated by semicolons) and computes SVG dimensions dynamically based on provided flags.
- For a single expression, uses a fixed height (default 400) or a custom height; for multiple expressions, computes total SVG height using either an explicit segment height or a dynamically computed value with the --autoSegment option.
- Supports detailed customization via flags: --width, --height, --segmentHeight, --autoSegment for dimension control, and --textColor, --lineColor, --backgroundColor for styling.
- Incorporates axis labeling through --xlabel and --ylabel, ensuring proper placement and readability.
- Enables annotation support via --annotation and title support via --title, automatically adjusting layout during multi-expression rendering.
- Implements PNG conversion mode when the --outputFormat flag is set to png; validates that a --file flag is provided for output and uses the sharp library for image conversion.
- Includes robust validations for non-empty string inputs and strictly positive numeric flags, with timestamped error logs to aid debugging.

# Implementation
- Unified CLI parser that converts flags appropriately from kebab-case to camelCase and processes both legacy and new flags.
- Single source file (src/lib/main.js) integrates all aspects of plot generation, including dynamic SVG generation, styling, error handling, and optional PNG conversion.
- Dynamic segmentation for multi-expression plots is computed based on expression length and additional element flags (e.g. labels, range, annotation, title).

# Testing and Documentation
- Comprehensive unit tests cover both CLI and direct function calls, ensuring proper SVG outputs across various scenarios including single and multi-expression modes, custom styles, and validation errors.
- Usage documentation (in USAGE.md and README.md) is updated to reflect the consolidated functionality, offering clear examples and explanations for all supported flags and options.
- This merged feature streamlines the project, consolidating prior separate features into a cohesive plot generation engine that enhances the product's primary functionality.
