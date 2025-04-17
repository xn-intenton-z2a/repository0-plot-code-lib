# ANNOTATIONS Feature Update

## Overview
This update enhances the existing annotations feature by enabling font size customization for plot titles and axis labels. Users can now adjust the text size for the plot title, x-axis label, and y-axis label using three new CLI options: `--title-font-size`, `--x-label-font-size`, and `--y-label-font-size`.

## Implementation Details
- **Source File Changes**: 
  - Update the CLI argument parser in `src/lib/main.js` to handle the new options (`--title-font-size`, `--x-label-font-size`, and `--y-label-font-size`).
  - Modify the SVG generation functions (`generateSVG` and `generateSVGFromCSV`) to use the provided font size values when rendering the title and labels. If any of these options are not provided, default font sizes will be used (default values: title - 16, x-axis and y-axis - 12).
  
## Testing
- **Unit Tests**: 
  - Update `tests/unit/main.test.js` to include test cases that verify font size customization. For both function-based plots and CSV-based plots, tests will confirm that when the new CLI options are provided, the generated SVG contains text elements with the correct `font-size` attributes.

## Documentation
- **README Updates**:
  - Revise the Usage section in `README.md` to document the new CLI options. Provide examples illustrating how to set custom font sizes for the plot title and axis labels.

This update aligns with the mission to provide a flexible and customizable plotting tool that empowers users to tailor the visual presentation of their plots through simple CLI modifications.