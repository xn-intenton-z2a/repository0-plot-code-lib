# ANNOTATIONS Feature Update

## Overview
This update extends the existing annotations functionality. In addition to enabling font size customization for plot title and axis labels, users can now also define custom formatting for axis tick labels using the new CLI options --x-tick-format and --y-tick-format. The tick label formatting allows users to add descriptive text (e.g., units or time indicators) by inserting a placeholder `{value}`, which is replaced with the numerical tick value formatted to two decimals.

## Implementation Details
- **Source File Changes**:
  - Update the CLI parser in `src/lib/main.js` to recognize `--x-tick-format` and `--y-tick-format` options.
  - Modify the SVG generation functions (`generateSVG` and `generateSVGFromCSV`) to incorporate the provided tick format strings when rendering x-axis and y-axis labels. When these options are not provided, default numeric labels are produced.
  - Ensure the new tick formatting features work seamlessly with existing features such as title, axis labels, and grid lines.

- **Testing**:
  - Enhance unit tests in `tests/unit/main.test.js` to verify the correct application of tick formatting in both function-based and CSV-based plots. Tests should inspect that text elements for tick labels include the custom formatted strings.

- **Documentation**:
  - Update `README.md` to document the new usage of `--x-tick-format` and `--y-tick-format` options. Provide examples illustrating how to append units or custom strings to tick values.

## Compatibility and Value
This update reinforces the mission to be the go-to plotting library by offering enhanced customization options. Users can now fine-tune the presentation of axis tick labels, leading to clearer, more professional plots that better suit various data visualization needs.
