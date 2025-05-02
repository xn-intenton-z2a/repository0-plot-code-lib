# Overview
This feature consolidates all plot generation functionalities into a single unified CLI tool. It covers inline SVG rendering for both single and multiple mathematical expressions, optional axis labelling, configurable style properties, and PNG conversion using the sharp library. The CLI now accepts a range of flags to specify dimensions, appearance, and output formats, ensuring that users can generate high-quality, customizable plots in one consistent command.

# Functionality
- Parses a mathematical expression (or multiple separated by semicolons) to generate an SVG image.
- For a single expression, uses a fixed height (default 400) and for multiple expressions, calculates total SVG height based on the provided segment height or fallback height.
- Supports optional axis labels via --xlabel and --ylabel flags. When provided, the x-axis label is centered at the bottom and the y-axis label is rotated and placed along the left side.
- Provides additional style customization options via --textColor, --lineColor, and --backgroundColor. These flags apply color styling to text, plot lines, and the SVG canvas background respectively.
- Includes a range flag (--range) to display additional context information directly within the plot.
- Implements PNG conversion when the --output-format flag is set to png. In this case, a mandatory --file flag is required to write the PNG image, with the conversion handled by the sharp library.
- Performs robust validations on all input flags, including checks for required flags, ensuring non-empty values for axis labels, and validating positive numerical values for width, height, and segment height.

# Implementation
- The main source file (src/lib/main.js) has been updated to merge existing plot generation, axis labelling, style customization, and SVG rendering functionalities into a single coherent workflow.
- The CLI parser has been maintained and extended to support both legacy and new flags. The renderSVG function dynamically builds the SVG output by combining text elements, style attributes, and range information.
- PNG conversion is integrated within the main execution flow and utilizes the sharp library to convert the dynamically generated SVG to a PNG image when requested.

# Testing & Documentation
- Unit tests in tests/unit/plot-generation.test.js and tests/unit/main.test.js cover all aspects of the functionality: single and multiple expressions, custom dimensions, axis labels, style options, range display, and PNG conversion error handling and success conditions.
- The usage guide (USAGE.md) and README.md have been updated with comprehensive examples and detailed instructions for all supported flags and options.

# Impact
This merged feature ensures that all key plotting functionalities are available in one consolidated CLI tool. By combining SVG rendering, axis labelling, style customization, and PNG conversion, the tool now offers a robust, user-friendly solution for generating reliable mathematical visualizations in line with our mission.