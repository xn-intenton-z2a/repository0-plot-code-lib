# CUSTOM_STYLE Feature Enhancement

This feature adds custom styling options for the generated plot output. Users can now supply additional CLI flags to control the appearance of the plot line and the background color of the SVG canvas. This enhancement is useful for personalizing plots without altering the core functionality.

## Overview

- **Objective:** Allow users to customize plot colors via new CLI options `--line-color` and `--bg-color`.
- **Benefit:** Users can immediately tailor the look of their generated SVG or PNG without post-processing, making the CLI tool more flexible and visually appealing.
- **Usage:** When generating plots that are not CSV, users can include extra flags to change the polyline stroke color and the background fill color.

Example usage:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --line-color "green" --bg-color "#f0f0f0"
```

## Implementation Details

### Source Code Modifications

- **Argument Parsing:**
  - Update the CLI argument parser in `src/lib/main.js` to recognize two new optional flags: `--line-color` and `--bg-color`.
  - Store these values in variables (e.g., `lineColor` and `bgColor`). If not provided, default to `blue` for the plot line and no background color (or default white) for the background.

- **SVG Generation Updates:**
  - In the branch that generates the SVG content (when file extension is not `.csv` and not `.png`), prepend an SVG rectangle covering the full canvas to serve as the background and set its fill to the provided `bgColor`.
  - Update the `<polyline>` element to use `stroke="{lineColor}"` instead of the hard-coded blue color.
  - Preserve existing functionality for drawing axes, data points, and text.

### Test Enhancements

- Update `tests/unit/main.test.js` to add tests verifying that when the `--line-color` and `--bg-color` flags are provided, the generated SVG content includes the specified colors.
  - For example, after calling `main` with these flags, check that the resulting SVG string contains the substrings `stroke="green"` and `fill="#f0f0f0"` (or similar based on the provided test colors).

### Documentation Updates

- **README.md:**
  - Add a section to document the new CLI flags with usage examples and descriptions:

    ```sh
    node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --line-color "green" --bg-color "#f0f0f0"
    ```

  - Explain that `--line-color` sets the color of the connecting polyline, and `--bg-color` sets the background color of the SVG canvas.

## Conformance with Guidelines

- All modifications are confined to the source file, test file, and README file as per repository contribution guidelines.
- This feature is distinct from existing ones and provides immediate, achievable value by enhancing visual customization directly in the CLI.
