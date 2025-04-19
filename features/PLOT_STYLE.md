# PLOT_STYLE

## Overview
This update refines the unified plot styling feature by consolidating a wide range of customization options for generating SVG plots. The improvements focus on enhanced visual consistency and user configurability, and include several new options such as custom font family, tooltip marker shape, axis tick label formatting, and SVG minification. These enhancements improve the aesthetic integration of plots into varied applications while keeping the CLI simple and powerful.

## Implementation Details
- **Custom Font Family:**
  - New `--font-family` option applies a user-defined font to all text elements (titles, axis labels, tick labels) in the generated SVG. This helps in matching application styles.

- **Tooltip Marker Shape:**
  - New `--tooltip-shape` option allows users to choose between a "circle" (default) and "square" marker for tooltip data points. Strict validation ensures only these two values are accepted, and the CLI outputs a descriptive error if an invalid shape is provided.

- **Axis Tick Label Formatting:**
  - Enhanced formatting via `--x-tick-format` and `--y-tick-format` options lets users customize tick labels using a template string with a `{value}` placeholder.

- **Dash Pattern Customization:**
  - The `--dash-array` option allows users to specify dash patterns (e.g., "5,5") for the plotted polyline, offering additional styling control.

- **SVG Minification:**
  - The new `--minify` flag removes unnecessary whitespace and newlines from the SVG output to optimize file size without affecting rendering.

- **Additional Enhancements:**
  - Support for tooltips with custom formatting (`--tooltip-format`) and styling (`--tooltip-style`) is maintained.
  - Error handling improvements ensure that cases such as invalid range formats or non-positive values for log scaling produce informative SVG error messages.
  - Integration of CSV input mode continues, offering an alternative means to supply data while using the same styling options.

## Testing
- **Unit Tests:**
  - Existing tests in `tests/unit/main.test.js` are extended to verify behavior for custom font, tooltip shape validation, axis tick formatting, and SVG minification.
  - New tests check that providing an invalid tooltip shape outputs the appropriate error and halts execution.
- **CLI Help:**
  - Running the CLI with the `--help` flag displays detailed usage information including the new styling options.

This update is fully backward compatible and reinforces the repository's mission of becoming the go-to tool for formula visualizations by empowering users with high-value, customizable plot styling options.