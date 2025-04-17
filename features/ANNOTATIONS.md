# ANNOTATIONS Feature Update

## Overview
This update refines the existing annotations functionality by not only providing customization for plot titles and axis labels but also by introducing a new capability for custom axis tick label formatting. Users can now specify the display of tick labels on both the x and y axes using the CLI options `--x-tick-format` and `--y-tick-format`. These options accept a format string with the `{value}` placeholder which is replaced with the numerical tick value (formatted to two decimals), allowing, for example, the addition of units or descriptive text.

## Implementation Details
- **Source File Changes**:
  - Update the CLI parser (in `src/lib/main.js`) to recognize the new options `--x-tick-format` and `--y-tick-format` alongside the existing parameters.
  - In the SVG generation functions (`generateSVG` and `generateSVGFromCSV`), incorporate logic to render axis tick labels with the supplied custom formats. When these options are provided, the placeholder `{value}` is replaced appropriately in the label text; if they are not provided, default numeric labels are shown.
  - Ensure compatibility so that custom tick formatting works seamlessly with existing features such as grid lines, tooltips, and labels.

## Testing
- **Unit Tests**:
  - Add new cases in `tests/unit/main.test.js` to verify that when the `--x-tick-format` and `--y-tick-format` options are used, the generated SVG includes correctly formatted tick label text on both axes.
  - Validate that the custom format correctly replaces the `{value}` placeholder in a variety of scenarios, for both function-based and CSV-based plot generations.

## Documentation
- **README Updates**:
  - Update the usage section in the README to document the new custom axis tick formatting options. Provide examples such as: `--x-tick-format "{value} ms"` and `--y-tick-format "{value} units"`.
  - Explain that these options enhance readability and allow users to append units or descriptors to numerical tick values.

## Compatibility and Value
This refined ANNOTATIONS feature supports our mission to be the go-to plotting library by enhancing the clarity and professionalism of generated plots. By enabling custom tick label formatting, users gain more control over how their data is presented, making it easier to integrate the plots into tailored reports or presentations.
