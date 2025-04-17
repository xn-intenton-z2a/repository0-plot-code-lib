# PLOT_STYLE

## Overview
This update refines the unified plot styling feature by consolidating and expanding customization options for SVG plot generation. In addition to merging options from annotations and custom font features, the new changes add support for:
- Custom font family via the `--font-family` option, ensuring that all text elements (titles, axis labels, tick labels) are rendered in the desired style.
- Custom tooltip marker shape via the `--tooltip-shape` option with strict validation. Supported shapes are "circle" (default) and "square". If an invalid shape is provided, the CLI will output a descriptive error and abort.
- Enhanced axis tick label formatting via `--x-tick-format` and `--y-tick-format` options for better annotation and readability.
- SVG output minification using the `--minify` flag, which removes unnecessary whitespace and newlines, optimizing file size.

## Implementation Details
- **Source Code Changes:**
  - The CLI argument parser in `src/lib/main.js` now includes new parameters for `fontFamily` and `tooltipShape`, along with validation logic to ensure only "circle" or "square" are accepted for tooltip markers.
  - The SVG generation functions (`generateSVG` and `generateSVGFromCSV`) have been updated to apply the specified `--font-family` to all text elements and use the correct SVG element (`<circle>` or `<rect>`) based on the `--tooltip-shape` option.
  - Custom dash patterns, grid lines, and log scale handling remain consolidated within this feature.

- **Testing:**
  - Unit tests in `tests/unit/main.test.js` have been extended to confirm that providing custom font families correctly applies the style, and that tooltip markers render as circles by default or as squares when specified.
  - New tests ensure that invalid tooltip shape inputs are rejected with a proper error message.
  - Tests cover both function-based plots and CSV input plots across all supported export formats (SVG, PNG, PDF, JSON, CSV, and XML).

## Documentation & CLI Usage
- The README file now documents all new options:
  - `--font-family` to override the default inherited font.
  - `--tooltip-shape` for marker customization.
  - Detailed usage examples covering custom axis tick formats and SVG minification.
- Help output (invoked via `--help`) reflects these enhancements with clear descriptions.

## Compatibility and Value
This update is fully compatible with the existing mission of making the CLI the go-to tool for formula visualizations by enhancing visual consistency and customization. Users can now better align the plot appearance with application styles and improve the legibility of their plots with customizable tooltips and text formatting.

