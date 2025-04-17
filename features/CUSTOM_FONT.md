# CUSTOM_FONT

## Overview
This update introduces the Custom Font Family feature which allows users to specify a custom font for all text elements in the generated SVG plots. Through the CLI, users can now pass the `--font-family` option (e.g., "Arial, sans-serif") to override the default font setting (which is "inherit"). This ensures that the plot title, axis labels, tick labels, and any additional annotation texts can be styled consistently in line with the overall design of the application.

## Implementation Details
- **Source File Changes:**
  - Update the CLI argument parser in `src/lib/main.js` to recognize the new `--font-family` option. The parsed value is passed to both the `generateSVG` and `generateSVGFromCSV` functions.
  - Modify SVG generation logic in both functions to apply the provided font family to all `<text>` elements (plot title, axis labels, tick labels, etc.) via the `style` attribute (e.g., `style="font-family: {fontFamily};"`).

- **Testing:**
  - In `tests/unit/main.test.js`, add tests to verify that when the `--font-family` option is provided, the generated SVG contains the correct font family in its styling. Validate both function-based and CSV-based plot outputs.

- **Documentation:**
  - Update the `README.md` file to include a new bullet under the "New Feature: Custom Font Family Option" section, describing how to use the `--font-family` option for customizing the appearance of text elements in plots.
  - Mention that the new option enhances visual consistency and integration with external styles.

## Compatibility and Value
This feature aligns with the project’s mission of becoming a go-to plot library by providing greater customization in visual outputs. By enabling custom font styling, users can integrate plots more seamlessly into reports and presentations where specific branding or styling is required.

