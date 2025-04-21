# SVG_TOOLTIP Feature Enhancement

This feature introduces an optional CLI flag, `--tooltip`, to add hover tooltips to the plotted data points in generated SVG outputs. When enabled, each marker in the SVG plot will include a `<title>` element that displays relevant information (typically the numerical value or data point coordinates). This provides an unobtrusive way for users to obtain exact data values by simply hovering over markers in a standard SVG viewer.

## Overview

- **Objective:** Enhance the SVG output by embedding tooltips for markers without cluttering the visual display. When the `--tooltip` flag is active, each marker (such as a circle, square, triangle, or star) will have a `<title>` tag added immediately inside its SVG element. This allows users to see the underlying data (e.g., the x and y values) when they hover the mouse cursor over a marker.
- **Benefit:** Makes data exploration easier and improves usability by providing immediate feedback on the values represented by individual markers, all while keeping the plot clean.

## Implementation Details

### Source Code Changes (src/lib/main.js)

- **Argument Parsing:**
  - Update the CLI parsing logic to detect a new boolean flag `--tooltip`.
  - Store this flag in a variable (e.g., `tooltipEnabled`) and merge it with YAML configuration if provided.

- **SVG Generation Enhancements:**
  - In the `generateSvgContent` function, after drawing each marker (e.g., `<circle>`, `<rect>`, `<polygon>`), check if the tooltip option is active.
  - For each marker, insert a `<title>` element as a child. For example, for a circle marker:
    ```xml
    <circle cx="{tx}" cy="{ty}" r="{markerRadius}" fill="{markerColor}">
      <title>{x: {xValue}, y: {yValue}}</title>
    </circle>
    ```
  - Ensure that the tooltip text is formatted properly, showing at least the x and y coordinates or the computed y value.

### Test Enhancements (tests/unit/main.test.js)

- **Unit Tests:**
  - Add test cases to simulate invoking the CLI with the `--tooltip` flag.
  - Verify that in the generated SVG, marker elements include a `<title>` element that contains the expected text (for example, the string representation of the data point).
  - Ensure that when the `--tooltip` flag is not provided, no `<title>` elements are present.

### Documentation Updates (README.md)

- **Usage Documentation:**
  - Update the README file to document the new `--tooltip` flag with an example command:
    ```sh
    node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --tooltip
    ```
  - Explain that when the flag is enabled, the SVG plot will embed hover tooltips for each data point marker, showing the corresponding x and y values.

## Conformance with Mission and Guidelines

- **Repository Impact:** All modifications are confined to existing source files, test files, and the README. No new files are created or deleted.
- **Mission Alignment:** This enhancement supports the aim to be the go-to tool for formula visualisations by improving data interpretability directly within the SVG output, providing precise, on-demand information akin to the reliability of tools like jq.
