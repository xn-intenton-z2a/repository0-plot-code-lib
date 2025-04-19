# PLOT_STYLE

## Overview
This feature refines the unified plot styling for both function based and CSV-based plots. It consolidates customization of visual options for generated plots including stroke properties, grid lines, axis labeling, and annotation. It supports both traditional function plotting as well as CSV time series data. The feature reinforces our mission of making our CLI the go-to tool for formula visualisations.

## New Enhancements
- **Custom Font Family:** A new `--font-family` option to set a custom font (e.g., "Arial, sans-serif") that applies to the title, axis labels, and tick labels.
- **Tooltip Marker Shape:** The new `--tooltip-shape` option lets users choose between "circle" (default), "square", or "triangle" marker shapes for tooltip markers. Strict validation ensures that an invalid shape triggers an error.
- **Custom Axis Tick Label Formatting:** New `--x-tick-format` and `--y-tick-format` options accept a format string with a `{value}` placeholder to enhance tick readability.
- **SVG Minification:** With the `--minify` flag enabled, unnecessary whitespace and newlines are removed from the SVG output, optimizing file size.
- **Additional Customizations:** Options like `--stroke-color`, `--stroke-width`, `--dash-array`, and `--grid` further enhance visual styling. The feature also handles logarithmic scaling on the y-axis with necessary validation of positive values.

## Implementation Details
- **Parameter Handling:** The feature parses CLI arguments for both function-based plots (using `--expression` and `--range`) and CSV-based plots (`--csv`). Mutually exclusive input modes are enforced.
- **Validation:** Robust error handling ensures that when using logarithmic scaling, non-positive y values are caught, and an invalid `--tooltip-shape` value halts execution with an error message.
- **SVG Generation:** Sample points are computed from the provided mathematical function or CSV data. Custom mappings apply the user-specified styling (stroke, dash pattern, grid lines, tick labels) along with new features like custom font and tooltip shape.
- **Minification:** When the `--minify` flag is provided, the generated SVG content is processed to remove extraneous whitespace.
- **Testing:** Unit tests verify that the correct SVG/PNG/PDF/JSON/XML outputs are generated, validate custom styling options, and ensure error messaging is correct for invalid configurations.

## Value and Compatibility
This update consolidates a wide range of user-configurable visual options for plot generation in a single cohesive feature. It adheres to our mission of becoming the go-to tool for formula visualisations by offering high flexibility and precise control over the plot appearance, while keeping the CLI simple and robust.

## Backward Compatibility
All enhancements are fully backward compatible. Existing functionality remains intact, and the new CLI options augment the current behavior without introducing breaking changes.
