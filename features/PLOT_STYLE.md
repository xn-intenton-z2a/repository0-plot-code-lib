# PLOT_STYLE

## Overview
This feature consolidates all styling, annotation, and tooltip customization options into a single, comprehensive feature. It merges the functionalities previously provided by the ANNOTATIONS and CUSTOM_FONT features. In addition, it enhances the plot style customization by introducing support for custom tooltip marker shapes and an SVG minification option.

## Implementation Details
- **Source File Changes:**
  - Update the CLI argument parser in `src/lib/main.js` to merge the options previously in ANNOTATIONS and CUSTOM_FONT:
    - Retain and merge options to customize axis tick labels (`--x-tick-format`, `--y-tick-format`).
    - Retain consistent application of custom font family through a new unified option `--font-family`.
    - Introduce a new option `--tooltip-shape` to allow users to choose between supported shapes (`circle` or `square`) for tooltip markers.
    - Integrate the new `--minify` flag to remove unnecessary whitespaces and newlines from the generated SVG output.
  - Ensure that all text elements (plot title, axis labels, tick labels) apply the provided custom font family for visual consistency.
  - Enhance the tooltip rendering logic so that the marker shape can be dynamically chosen based on the option value.

## Testing
- **Unit Tests:**
  - Extend tests in `tests/unit/main.test.js` to verify that when the new `--font-family` and `--tooltip-shape` options are provided, the generated SVG output includes the correct font families and uses the appropriate SVG elements (`<circle>` for default or `<rect>` for square markers).
  - Add test cases to check the behavior of the `--minify` option, ensuring that whitespace is effectively removed from the final SVG output.
  - Validate that the merged options produce correct behavior for both function-based plots and CSV input plots.

## Documentation
- **README Updates:**
  - Update README.md to describe the unified plotting style customization feature under a new section, explaining that styling options (including axis tick formatting, custom fonts, tooltip marker shape, and SVG minification) are now managed together by the PLOT_STYLE feature.
  - Provide examples to illustrate usage of the new options (e.g., `--font-family "Arial, sans-serif"`, `--tooltip-shape square`, `--minify`).

## Compatibility and Value
This update aligns with the project’s mission by simplifying the user experience and reducing fragmentation of style customization options. Users benefit from a unified, robust customization interface that enhances plot readability and visual consistency. This feature update facilitates easier maintenance and scalability as new style options can be added centrally in future iterations.