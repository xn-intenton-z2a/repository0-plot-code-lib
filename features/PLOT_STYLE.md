# PLOT_STYLE

## Overview
This update refines and extends the visual styling options available in the plot library. In addition to the traditional styling parameters (such as stroke color, stroke width, and background color), several new customizable enhancements have been introduced:

- **Custom Font Family:** Specify a custom font family for all text elements (plot title, axis labels, tick labels) using the `--font-family` CLI option. This allows users to better tailor the plot’s appearance to match their application styles.

- **Tooltip Marker Shape:** Choose the shape of data point markers for tooltips with the new `--tooltip-shape` option. Supported values include "circle" (default), "square", and "triangle". Invalid values are caught by validation logic which outputs an error and halts processing.

- **Axis Tick Label Formatting:** Enhance plot readability by customizing axis tick labels using the `--x-tick-format` and `--y-tick-format` options. These accept a format string containing a `{value}` placeholder that is replaced with the computed tick value.

- **SVG Minification:** Optimize the output SVG file size with the `--minify` flag. When enabled, extraneous whitespace and newlines are removed from the SVG content without altering its visual rendering.

## Implementation Details
- **Parameter Parsing & Validation:** The CLI argument parser has been updated to capture new options for font family, tooltip marker shape, axis tick label formatting, and minification. Validation logic ensures that only the accepted tooltip shapes (circle, square, triangle) are allowed, and appropriate error messages are displayed if an invalid value is provided.

- **SVG Generation:** The main source file computes sample points from either a mathematical expression or CSV data. The computed points are then mapped to SVG coordinates. Custom styling is applied during the SVG element generation including:
  - Rendering text elements (title, labels, tick labels) with the specified font family.
  - Formatting tick labels according to user-provided templates.
  - Rendering tooltip markers in the shape specified by the `--tooltip-shape` option.
  - Optionally minifying the SVG output if the `--minify` flag is set.

## Testing & Compatibility
- **Unit Tests:** The test suite has been extended to verify that new text attributes, such as custom font family and axis tick label formatting, appear correctly in the SVG output. Further tests confirm that tooltip markers render in the specified shape, that errors are thrown for invalid tooltip shapes, and that minification reduces extraneous whitespace in the SVG content.

- **Backward Compatibility:** Existing behavior is preserved. When new options are not provided, default values are used (e.g., fontFamily defaults to "inherit" and tooltipShape defaults to "circle").

## Value
This update provides users with a higher degree of customization over plot appearance. With options for custom font families, tooltip marker shapes, formatted tick labels, and optimized SVG output, the library reinforces its mission to be the go-to tool for formula visualization, allowing users to easily create publication-ready plots with minimal effort.