# Overview
The PLOT_ENGINE feature consolidates all plot generation capabilities into a single, robust CLI tool. It integrates inline SVG rendering, dynamic multi-expression segmentation, axis labeling, annotations, title support, and PNG conversion using the sharp library. This unified approach simplifies the process of generating high-quality visualizations from mathematical expressions while ensuring all input flags are validated with informative, timestamped error messages.

# Functionality
- Accepts one or multiple mathematical expressions (separated by semicolons) and determines SVG dimensions dynamically.
- For a single expression, uses a fixed height (default 400) or the provided --height flag. For multiple expressions, calculates total SVG height using the segment height (explicit with --segmentHeight, dynamically computed with --autoSegment, or fallback to --height).
- Supports customizable styling options: --width for the overall SVG width, --textColor for text elements, --lineColor for plot lines, and --backgroundColor for the canvas.
- Offers axis labeling through --xlabel and --ylabel, with positions adjusted for clarity.
- Provides annotation support via --annotation and title support via --title, with positioning logic that adapts in multi-expression mode to avoid conflicts.
- When --outputFormat is set to png, converts the generated SVG to a PNG using the sharp library. In this case, a --file flag is mandatory for output.
- Implements rigorous validation of numeric flags and non-empty string validations for style and labeling flags, logging errors with timestamps when validation fails.

# Implementation
- The main source file is updated to integrate all functionalities into one coherent workflow. The tool leverages a CLI parser to process command-line arguments and dynamically builds an SVG based on flags provided.
- Dynamically computes the segment height for multi-expression plots using a base value adjusted for additional elements (i.e., axis labels, range, annotation, title) when --autoSegment is enabled.
- PNG conversion is implemented as an optional mode that utilizes the sharp library to generate a PNG image from the rendered SVG.

# Testing and Documentation
- Comprehensive unit tests ensure that all modes (single and multi-expression, with and without additional flags) produce valid SVG output and correctly handle error messages.
- The usage documentation (USAGE.md) and README are updated to reflect the unified features, providing clear examples and usage instructions.
- This consolidation aligns with the mission to be a reliable, user-focused visualization tool that easily transforms mathematical expressions into customizable visual plots.