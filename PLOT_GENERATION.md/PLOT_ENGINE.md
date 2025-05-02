# Overview
This unified PLOT_ENGINE consolidates all plotting functionalities into one robust CLI tool. It integrates inline SVG rendering and PNG conversion (via the sharp library) while leveraging dynamic segmentation for multiple expressions, comprehensive axis labeling, and customizable styling. This single feature replaces multiple legacy plotting modules, improving maintainability and user experience.

# Functionality
- Parses command-line arguments, converting kebab-case to camelCase for consistent internal processing.
- Supports both single and multiple expressions (separated by semicolons).
- For single expressions, uses a configurable fixed height (default 400) via the --height flag. For multiple expressions, computes total SVG height using either a specified segment height (--segmentHeight) or dynamically via the --autoSegment flag.
- Dynamically calculates segment height when --autoSegment is enabled by starting with a base height and adding extra pixels based on expression length, presence of axis labels (--xlabel, --ylabel), and range (--range) information.
- Renders inline SVG plots that may include a background rectangle (using --backgroundColor) and a plot line (using --lineColor).
- Adds axis labels positioned appropriately (x-axis label centered at the bottom and y-axis label rotated along the left side) with customizable text colors (--textColor).
- When the --output-format flag is set to png, converts the generated SVG to a PNG file, requiring the --file flag for output. Incorporates error handling with detailed logging, ensuring mandatory flags are provided and valid.

# Implementation
- All functionalities are implemented in a single source file (src/lib/main.js), consolidating features from previous modules.
- Helper functions are used to render text elements, axis labels, and optional range details within the SVG.
- Uses the sharp library for converting SVG to PNG while managing file writing errors gracefully.
- Ensures robust input validation for required flags and non-empty values for styling parameters, in line with the guidelines in CONTRIBUTING.md.

# Testing & Documentation
- Unit tests check for proper SVG output, dynamic height calculation for both single and multiple expressions, error logging for missing or empty parameters, and successful PNG conversion.
- The usage guide (USAGE.md) and README have been updated with comprehensive examples that reflect the unified functionality.

# Impact
By merging previous plot generation and SVG rendering functionalities into a single, unified PLOT_ENGINE, this feature streamlines the usage and development of repository0-plot-code-lib. It directly supports the mission of becoming the go-to plot library for formulae visualizations by offering a simplified, high-impact user experience with enhanced configurability and reliability.