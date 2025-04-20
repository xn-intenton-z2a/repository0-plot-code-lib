# SVG_PLOT Feature Enhancement

This feature enhances the CLI tool by replacing the existing dummy SVG output with a dynamically generated SVG plot. Instead of simply outputting static text, the tool now computes a basic line chart from the time series data (generated via the mathematical expression and range) and renders it as an SVG polyline.

## Overview

- When the CLI is invoked with an output file that does not end with ".csv", the tool will generate an SVG plot rather than a placeholder text SVG.
- The plot is constructed by transforming the time series data to fit within a fixed SVG viewport (e.g., 500x300 pixels with defined margins).
- A polyline is drawn to connect the computed data points, providing a visual representation of the function (e.g., sin(x) or cos(x)).

## Implementation Details

- **Source Code Modifications (src/lib/main.js):**
  - Update the non-CSV output branch. Instead of writing a dummy SVG with text elements, compute the time series data using the existing `generateTimeSeriesData` function.
  - Determine the minimum and maximum values for x and y from the generated data.
  - Define a fixed SVG viewport (e.g., width = 500, height = 300, margin = 20).
  - Transform each data point's x and y values into SVG coordinates using a linear scaling algorithm:
    - Compute scaled x: `plotX = margin + ((x - minX) / (maxX - minX)) * (width - 2 * margin)`
    - Compute scaled y: `plotY = height - margin - ((y - minY) / (maxY - minY)) * (height - 2 * margin)`
  - Generate a polyline element with the computed points and embed it within an `<svg>` container.
  - Write the resulting SVG content to the file specified by the CLI.

- **Testing Enhancements (tests/unit/main.test.js):**
  - Update the test case for SVG file generation. Instead of expecting a static dummy SVG string, the test will now verify that the written content contains an `<svg>` element and a `<polyline>` element.
  - Use string containment checks to ensure that the output includes the dynamically generated polyline and adheres to the expected structure.

- **Documentation Updates (README.md):**
  - Add a new section describing the SVG_PLOT feature. Explain that when a non-.csv file is provided via the `--file` flag, the CLI generates a basic line plot in SVG format from the computed time series data.
  - Provide a sample usage command, such as:
    ```sh
    node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg
    ```
  - Document the scaling and transformation logic used to map data points onto the SVG canvas.

## Conformance with Mission and Guidelines

- The enhancement strictly modifies the source, test, and documentation files without adding new files or altering unrelated functionality.
- It aligns with the mission of becoming a go-to plot library by providing immediate, graphical insights into formula visualisations.
- This feature is distinct and does not overlap with existing features (such as stats, diagnostics, or JSON export), making it a focused improvement in the plot generation capability.

## Summary

The SVG_PLOT feature transforms the output behavior of the CLI tool by converting computed time series data into a scalable SVG line plot using a polyline. This provides users with a visual, immediately interpretable plot of their mathematical expressions.
