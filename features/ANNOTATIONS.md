# ANNOTATIONS FEATURE UPDATE

## Overview
This update further refines the annotations functionality by enhancing the customization capabilities for generated plots. In addition to the existing support for custom titles, axis labels, tooltips, and grid lines, this update introduces **Custom Axis Tick Label Formatting**. Users can now specify formatting templates for both the x and y axis tick labels using the CLI options `--x-tick-format` and `--y-tick-format`. These templates include a `{value}` placeholder, which is replaced with the numerical tick value (formatted to two decimals), allowing annotations such as units or descriptive text to be appended to the tick labels.

## Implementation Details
- **Source File Changes:**
  - Update the CLI argument parser in `src/lib/main.js` to recognize the new options `--x-tick-format` and `--y-tick-format` alongside existing options.
  - Enhance the SVG generation functions (`generateSVG` and `generateSVGFromCSV`) to compute tick positions and generate `<text>` elements for axis tick labels using the provided format strings. The label should replace the `{value}` placeholder with the actual tick value.
  - Apply the custom font family from the `--font-family` option to ensure consistent styling in all text elements including the custom tick labels.

## Testing
- **Unit Tests:**
  - Extend tests in `tests/unit/main.test.js` to cover cases where `--x-tick-format` and `--y-tick-format` options are provided. Verify that SVG output contains correctly formatted tick label elements with the expected text (e.g., "X: 10.00 ms") for both function-based and CSV-based plots.
  - Include error handling cases to ensure that if the formatting options are provided without a valid numeric replacement, the default tick labels are used.

## Documentation
- **README Updates:**
  - Update the CLI usage documentation to include examples for the new `--x-tick-format` and `--y-tick-format` options, e.g., `--x-tick-format "{value} ms"` and `--y-tick-format "{value} units"`.
  - Emphasize that these options improve the clarity of axis annotations when integrating plots into reports and presentations.

## Compatibility and Value
This enhancement aligns with the project’s mission of becoming the go-to plotting library by offering detailed and customizable visual output. Custom axis tick formatting makes the plots more informative and adaptable to various domains, delivering clear, publication-quality visualizations without increasing complexity or file bloat.
