# Overview
This feature consolidates all plot generation functionalities into a single unified engine. It combines the capabilities of inline SVG rendering, dynamic multi-expression handling, axis labeling, style customization, PNG conversion, and annotation support into one streamlined CLI tool. This integration simplifies usage and maintenance while ensuring high-quality, customizable plots from mathematical expressions in both SVG and PNG formats.

# Functionality
- Parses one or multiple mathematical expressions (separated by semicolons) and dynamically calculates plot dimensions. For multi-expression inputs, the total SVG height is computed by multiplying the segment height (determined by a provided --segmentHeight flag, fallback to --height, or auto-calculated using --autoSegment) by the number of expressions.
- Supports inline SVG generation with customizable attributes such as width, height, text color, line color, background color, and additional styling options.
- Provides robust axis labeling through --xlabel and --ylabel flags, ensuring labels are correctly positioned and styled.
- Features PNG conversion using the sharp library. When the --outputFormat flag is set to png, a mandatory --file flag must be provided to save the PNG image.
- Includes annotation support via the --annotation flag. The annotation is rendered in the top-right corner, with its style tied to the specified text color.
- Integrates comprehensive error handling and validation of numeric flags as well as non-empty values for text-based flags.

# Implementation
- All functionalities are realized in a single source file. The engine parses command-line arguments converting kebab-case flags to camelCase for internal processing.
- The engine dynamically builds SVG content by concatenating elements for expressions, labels, annotations, and optional background rectangles.
- In multi-expression mode, if auto-segmentation is enabled (--autoSegment true), it computes an optimal segment height based on expression length and additional parameters (labels and range).
- PNG conversion is achieved by passing the generated SVG content to the sharp library, and the resulting image is written to disk if a valid --file flag is provided.

# Testing & Documentation
- Extensive unit tests are provided to cover single expression and multi-expression scenarios, ensuring proper handling of dimensions, labels, dynamic segmentation, PNG conversion, and error conditions.
- Documentation and usage guides (in USAGE.md and README.md) have been updated to reflect the comprehensive capabilities of the unified plot engine.

# Impact
By merging legacy plot generation features into a single PLOT_ENGINE, the tool delivers substantial user impact. Users benefit from a more intuitive command-line interface, reduced complexity in command usage, and a robust solution that adheres to our mission of being the go-to plot library for mathematical visualizations.