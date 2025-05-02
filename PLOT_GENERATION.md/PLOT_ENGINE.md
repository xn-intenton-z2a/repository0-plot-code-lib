# Overview
This feature consolidates all plot generation functionalities into one unified CLI tool. It merges capabilities for inline SVG rendering, PNG conversion with the sharp library, optional axis labeling, and custom style options. The tool supports both single and multiple mathematical expressions, handling dimension calculations based on provided flags. This update streamlines the plotting workflow, ensuring robust error handling, dynamic SVG construction, and clear usage guidance.

# Functionality
- Parses one or multiple mathematical expressions using a required --expression flag. Multiple expressions are separated by semicolons, with dynamic segment height calculation when a --segmentHeight flag is provided or falling back to --height.
- Accepts dimension flags such as --width and --height to customize the SVG output. For multiple expressions, the total height is computed as the number of expressions multiplied by the segment height.
- Enhances plots with optional axis labeling through --xlabel and --ylabel flags. The x-axis label is centered at the bottom, and the y-axis label is rotated and positioned on the left side of the SVG.
- Offers additional style customization and range display via the --range flag and other style update options.
- Integrates PNG conversion using the sharp library when the --output-format flag is set to png, ensuring that a mandatory --file flag specifies the output file for PNG images.
- Implements robust input validations for required parameters and numerical values, outputting error messages with timestamps when validations fail.

# Implementation
- The main source file is updated to include a unified CLI parser that extracts all relevant flags such as --expression, --width, --height, --segmentHeight, --range, --xlabel, --ylabel, --output-format and --file (for PNG conversion).
- The SVG is dynamically built by rendering text elements for the plot content. For multiple expressions, the function iterates over each expression to calculate positions and include range information if provided.
- The feature cleanly integrates axis labeling by appending text elements into the SVG based on provided labels and computed positions.
- When PNG conversion is requested, the SVG content is passed through the sharp library to generate a PNG buffer and written to the file system.

# Testing & Documentation
- Unit tests cover single and multiple expression scenarios, ensuring that dimensions, axis labels, and range information render correctly in the SVG output.
- Special tests validate that errors are logged appropriately if required flags (such as --expression or --file for PNG conversion) are missing or if axis label values are empty.
- Documentation, including the README and USAGE guides, is updated to reflect the consolidated command-line usage, clearly instructing users on how to specify each flag and view comprehensive usage examples.

# Impact
This consolidated PLOT_ENGINE feature significantly reduces redundancy and improves the usability of the plot tool by merging several discrete functionalities into one cohesive module. It meets the mission of being a go-to tool for generating high-quality mathematical visualizations in both SVG and PNG formats, while simplifying the command structure and maintenance.