# PLOT_ENGINE

## Overview
This feature consolidates all existing plot generation capabilities into a single unified engine. It merges functionalities from inline SVG rendering, multi-expression handling, dynamic segmentation, axis labeling, annotation placement, and PNG conversion. The result is a robust CLI tool that transforms mathematical expressions into customizable SVG or PNG plots in one coherent workflow, in line with our mission of delivering reliable, user-focused visualizations.

## Functionality
- Parses single or multiple mathematical expressions (separated by semicolons) and determines dimensions dynamically.
- In multi-expression mode, calculates total SVG height as the product of a computed segment height and the number of expressions. The segment height is dynamically computed if the --autoSegment flag is enabled, or can be explicitly set with --segmentHeight. If neither is provided, the --height flag serves as a fallback.
- Supports inline SVG generation with customizable width, height, text color, line color, and background color. Includes options for axis labeling using --xlabel and --ylabel with appropriate placements.
- Adds support for annotations and titles. The annotation appears in the upper right (or adjusted to avoid title overlap) while the title is centered at the top of the plot.
- Implements robust input validation (ensuring non-empty values for text based flags and positive numeric values for width, height, and segment height) and provides clear error messages with timestamps.
- Incorporates PNG conversion using the sharp library when the user specifies --outputFormat as png. In this mode, the --file flag becomes mandatory to save the output image.

## Impact
This consolidated engine simplifies usage by reducing command complexity while providing flexible, dynamic plotting capabilities. Users benefit from a streamlined interface for generating high-quality, customizable plots from mathematical expressions in both SVG and PNG formats, all within a single, maintainable source file.
