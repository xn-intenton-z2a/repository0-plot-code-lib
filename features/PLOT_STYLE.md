# PLOT_STYLE

## Overview
This feature consolidates and refines the visual styling of the generated plots. It supports both function-based and CSV-based plots with a unified set of CLI options. In addition to traditional styling parameters such as stroke color, stroke width, and background color, this update introduces several customizable enhancements:

- **Custom Font Family:** Set a custom font (e.g. "Arial, sans-serif") for all text elements including plot titles, axis labels, and tick labels.
- **Tooltip Marker Shape:** Choose the shape of tooltip markers using the new `--tooltip-shape` option. Supported shapes include "circle" (default), "square", and "triangle". Invalid values will produce an error and halt processing.
- **Axis Tick Label Formatting:** Customize the display format of the x and y-axis tick labels via `--x-tick-format` and `--y-tick-format` options. These accept a format string with a `{value}` placeholder to enhance readability.
- **SVG Minification:** When the `--minify` flag is enabled, extraneous whitespace and newlines are removed from the SVG output to reduce file size without affecting rendering.

## Implementation Details
- **Parameter Parsing & Validation:** The CLI parses new input options and validates each. Mutual exclusion is enforced between CSV input and expression-based input. The new parameters (fontFamily, tooltipShape, xTickFormat, yTickFormat, minify) are integrated with existing parsing logic.
- **SVG Generation:** The source file computes sample points for the plot from either the mathematical expression or CSV data. The computed points are then mapped to SVG coordinates. In addition to drawing the polyline, grid lines may be drawn if requested. Custom text elements for titles and axis labels are rendered with the specified font family.
- **Tooltip Integration:** Depending on the `--tooltip` flag and the validated `--tooltip-shape` option, small markers (circle, square, or triangle) with an embedded `<title>` element are added to each data point. Custom tooltip formatting and styling are supported via `--tooltip-format` and `--tooltip-style`.
- **Axis Tick Labels & Grid:** The feature allows custom formatting of tick labels on both axes. If grid lines are enabled, they are drawn with a light gray stroke. Custom tick labels are rendered using the provided format strings.
- **SVG Minification Process:** After the SVG content is generated, if the `--minify` flag is provided, the content is post-processed to collapse extra whitespace and newlines.

## Testing & Compatibility
- **Unit Tests:** Added unit tests validate that the generated SVG/PNG outputs include the new attributes (such as custom font-family, tooltip shape markers, and formatted tick labels) and that errors are thrown for invalid tooltip shape values.
- **Backward Compatibility:** Existing plots continue to work without the new options. When new options are omitted, default values (e.g. fontFamily "inherit", tooltipShape "circle") are used.
- **CLI Documentation:** The README and help messages have been updated to reflect these new options, ensuring that users understand how to use the additional styling capabilities.

## Value
By streamlining and enhancing the plot styling process, this feature further reinforces the mission of making the library the go-to tool for formula visualization. It allows users to produce publication-ready plots with minimal effort while offering a high degree of customization.