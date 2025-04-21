# SVG_ANIMATE Feature Enhancement

This feature introduces an optional animation mode for SVG plots. When the CLI tool is invoked with the new `--animate` flag, the generated SVG output will include basic animation elements to enhance the visual appeal of the plot. This animated SVG can be used for presentations or to provide an interactive preview in browsers.

## Overview

- **Objective:** Add a simple animation to the SVG plot by injecting SVG `<animate>` elements into the polyline that connects data points.
- **Benefit:** Enhances user experience by allowing dynamic visualizations directly from the CLI without additional post-processing.
- **Usage Example:**
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file animated.svg --animate
  ```

## Implementation Details

### Source Code Changes

- **Argument Parsing:**
  - Update the CLI parser in `src/lib/main.js` to detect the `--animate` flag. Set a corresponding variable (e.g., `animate = true`).

- **SVG Generation Enhancement:**
  - In the `generateSvgContent` function, check if the `animate` flag is active.
  - If active, modify the generated `<polyline>` element to include an `<animate>` child element. For example, insert:
    ```xml
    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="2s" repeatCount="indefinite" />
    ```
    so that the polyline animates continuously.

### Test Enhancements

- Add tests in `tests/unit/main.test.js` to simulate invoking the CLI with the `--animate` flag. Verify that:
  - The generated SVG string contains an `<animate` tag within the polyline element
  - Other SVG elements (e.g., axes, markers) are still present.

### Documentation Updates

- Update the `README.md` to include a section documenting the new `--animate` flag, similar to the following example:
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file animated.svg --animate
  ```
- Explain that this flag adds animation to the plotted data, making the visualization more engaging.

## Conformance with Mission and Guidelines

- **Repository Impact:** All changes are confined to modifying existing source files, test files, and the README file.
- **Achievable Scope:** This feature is a small, incremental enhancement that provides immediate user value and distinguishes the library as a dynamic plotting tool.
- **Mission Alignment:** By enabling animated SVG plots, the library further positions itself as the "go-to plot library" with unique, interactive capabilities.
