# Overview
This feature consolidates all plotting functionalities into a single, robust CLI tool. It integrates inline SVG rendering, dynamic segment height adjustment via autoSegment, axis labeling, customizable styling, and optional PNG conversion using the sharp library. The unified PLOT_ENGINE replaces legacy modules and streamlines the user experience for generating mathematical plots.

# Functionality
- Parses command-line arguments and converts kebab-case flags to camelCase for internal consistency.
- Supports both single and multiple mathematical expressions (separated by semicolons) with separate treatment for each expression in multi-plot mode.
- For single expressions, uses a fixed or user-specified height; for multiple expressions, calculates total SVG height based on a provided segmentHeight flag or a fallback height.
- Enables dynamic segmentation via the autoSegment flag. The dynamic height is computed based on a base value, the length of each expression, and additional paddings if x-axis labels, y-axis labels, or range information are provided.
- Renders inline SVG plots with an optional background rectangle, text elements displaying expressions and (if specified) range information, and configurable axis labels (x-axis centered at the bottom and y-axis rotated along the left side).
- Supports customizable style attributes including textColor, lineColor, and backgroundColor.
- When the output-format is set to png, the tool converts the SVG to a PNG file, ensuring that required flags (such as --file) are provided.

# Implementation
- All functionalities are implemented in a single source file (src/lib/main.js) to maintain simplicity and ensure easy maintainability.
- The feature merges previous plot generation, SVG rendering, and style customization logic into one unified workflow.
- Robust validations ensure required flags (like --expression and non-empty styling flags) are properly supplied. Specific error messages are logged with detailed timestamps.

# Testing & Documentation
- Unit tests cover key functionalities including SVG generation for single and multiple expressions, dynamic height adjustment, axis label rendering, error handling for empty flags, and successful PNG conversion.
- Documentation in the USAGE.md and README files has been updated to reflect the combined capabilities of the unified PLOT_ENGINE.

# Impact
By merging legacy functionalities into a consolidated PLOT_ENGINE, this feature delivers substantial user impact. It simplifies the plotting process, reduces maintenance overhead, and directly supports the mission by providing a reliable, high-impact tool for generating mathematical visualizations from a CLI.