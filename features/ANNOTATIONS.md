# ANNOTATIONS Feature

## Overview
This feature enhances the plot annotation capabilities of the CLI by allowing users to customize the font sizes for the plot title, x-axis label, and y-axis label. With the addition of new CLI options (--title-font-size, --x-label-font-size, and --y-label-font-size), users can now have finer control over the appearance of text elements in both SVG and PNG outputs.

## Implementation Details
- Update the source file (src/lib/main.js) to parse the new CLI options:
  - `--title-font-size` to set the font size of the plot title (default: 16).
  - `--x-label-font-size` to set the font size of the x-axis label (default: 12).
  - `--y-label-font-size` to set the font size of the y-axis label (default: 12).
- Modify the functions `generateSVG` and `generateSVGFromCSV` to incorporate these new parameters when generating the SVG content. The text elements for the title and axis labels will now use these configurable font sizes.
- Ensure that if the new options are not provided, the default font sizes are used.

## Testing
- Update the existing test file (tests/unit/main.test.js) to include tests verifying that when the new CLI options are provided, the generated SVG contains the correct font-size attributes in the title, x-axis label, and y-axis label elements.
- Add test cases for both function-based plots and CSV-based plots.

## Documentation
- Update the README.md with a new section under **Usage** that documents the purpose and usage of the new CLI options (--title-font-size, --x-label-font-size, and --y-label-font-size), including examples.

## Dependencies
- No new dependencies are required; all changes utilize the current stack and existing libraries.
