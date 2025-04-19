# PLOT_STYLE

## Overview
This feature consolidates and refines the visual styling options of the plot outputs generated from mathematical expressions and CSV time series data. It unifies the customization for function-based and CSV-based plots by providing a robust set of CLI options which configure element styles in SVG outputs. These options range from stroke properties, grid lines, and background colors, to detailed customizations like font family, custom tooltip markers, and axis tick label formatting.

## New Enhancements
- **Custom Font Family:** A new `--font-family` option allows setting a custom font (e.g., "Arial, sans-serif") for the title, axis labels and tick labels, ensuring that the plot integrates well with user application styles.
- **Tooltip Marker Shape:** The `--tooltip-shape` option enables users to choose the shape of tooltip markers. Supported shapes include "circle" (default), "square", and "triangle". Strict validation ensures that invalid values produce an error and halt processing.
- **Custom Axis Tick Label Formatting:** New options `--x-tick-format` and `--y-tick-format` accept a format string with a `{value}` placeholder. This lets users customize tick labels (e.g., appending units like "ms" or "units") to improve readability.
- **SVG Minification:** When the `--minify` flag is provided, the generated SVG output is optimized by removing extra whitespace and newlines, resulting in smaller file sizes without compromising visual fidelity.
- **Additional Customizations:** The existing styling parameters like `--stroke-color`, `--stroke-width`, `--dash-array`, `--grid`, and `--background-color` remain available. This feature uniformly applies these options across both function-based and CSV-based plots.

## Implementation Details
- **Parameter Parsing and Validation:** The CLI parses input options and ensures mutually exclusive modes between CSV input (`--csv`) and expression-based input (`--expression` plus `--range`). Tooltip shape values are validated against allowed values.
- **SVG Generation:** The source file computes sample points from the provided mathematical function or parses CSV data, maps these into SVG coordinates, and draws a polyline. It then adds additional SVG elements for grid lines, axis tick labels (using user-defined formats), and text elements styled with the custom font family.
- **Tooltip Integration:** Conditional logic adds tooltip markers at each data point. Their style and shape are configurable via `--tooltip`, `--tooltip-format`, `--tooltip-style`, and `--tooltip-shape` options.
- **Minification Process:** If the `--minify` flag is enabled, the SVG content is post-processed to remove extraneous white space and newline characters before file output.

## Value and Compatibility
This updated plot styling feature enhances over the original by allowing deep customization of textual elements, tooltip markers, and axis labels which are essential for accurately conveying data scale and context. It reinforces the library’s mission of being the go-to formula visualization tool with a straightforward CLI interface, enabling precise control over plot appearance.

## Backward Compatibility
All modifications are fully backward compatible. Existing functionality remains intact, while new CLI options augment the design. Existing plots generated without new options function as before, ensuring a seamless experience for current users.