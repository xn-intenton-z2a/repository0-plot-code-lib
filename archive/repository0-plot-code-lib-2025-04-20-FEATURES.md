features/PLOT_STYLE.md
# features/PLOT_STYLE.md
# PLOT_STYLE

## Overview
This update refines and extends the visual styling options available in the plot library. In addition to the traditional styling parameters (such as stroke color, stroke width, and background color), several new customizable enhancements have been introduced:

- **Custom Font Family:** Specify a custom font family for all text elements (plot title, axis labels, tick labels) using the `--font-family` CLI option. This allows users to better tailor the plot’s appearance to match their application styles.

- **Tooltip Marker Shape:** Choose the shape of data point markers for tooltips with the new `--tooltip-shape` option. Supported values include "circle" (default), "square", and "triangle". Invalid values are caught by validation logic which outputs an error and halts processing.

- **Axis Tick Label Formatting:** Enhance plot readability by customizing axis tick labels using the `--x-tick-format` and `--y-tick-format` options. These accept a format string containing a `{value}` placeholder that is replaced with the computed tick value.

- **SVG Minification:** Optimize the output SVG file size with the `--minify` flag. When enabled, extraneous whitespace and newlines are removed from the SVG content without altering its visual rendering.

## Implementation Details
- **Parameter Parsing & Validation:** The CLI argument parser has been updated to capture new options for font family, tooltip marker shape, axis tick label formatting, and minification. Validation logic ensures that only the accepted tooltip shapes (circle, square, triangle) are allowed, and appropriate error messages are displayed if an invalid value is provided.

- **SVG Generation:** The main source file computes sample points from either a mathematical expression or CSV data. The computed points are then mapped to SVG coordinates. Custom styling is applied during the SVG element generation including:
  - Rendering text elements (title, labels, tick labels) with the specified font family.
  - Formatting tick labels according to user-provided templates.
  - Rendering tooltip markers in the shape specified by the `--tooltip-shape` option.
  - Optionally minifying the SVG output if the `--minify` flag is set.

## Testing & Compatibility
- **Unit Tests:** The test suite has been extended to verify that new text attributes, such as custom font family and axis tick label formatting, appear correctly in the SVG output. Further tests confirm that tooltip markers render in the specified shape, that errors are thrown for invalid tooltip shapes, and that minification reduces extraneous whitespace in the SVG content.

- **Backward Compatibility:** Existing behavior is preserved. When new options are not provided, default values are used (e.g., fontFamily defaults to "inherit" and tooltipShape defaults to "circle").

## Value
This update provides users with a higher degree of customization over plot appearance. With options for custom font families, tooltip marker shapes, formatted tick labels, and optimized SVG output, the library reinforces its mission to be the go-to tool for formula visualization, allowing users to easily create publication-ready plots with minimal effort.features/EXPORT.md
# features/EXPORT.md
# EXPORT

## Overview
This feature consolidates all export-related functionalities into a single unified module. In addition to exporting plot data and plots in various formats (SVG, PNG, PDF, JSON, CSV, and XML), the export functionality now integrates a diagnostics mode. By using the `--diagnostics` flag, users can obtain critical runtime and environment details (Node.js version, dependency versions, configuration options, etc.) without triggering regular export operations. This merged functionality streamlines the CLI and keeps the repository feature set within the allowed maximum.

## Implementation Details
- **Unified CLI Parsing:**
  - The CLI argument parser now handles both export file formats and a new `--diagnostics` flag.
  - When `--diagnostics` is detected, the export-related processing (plot generation and file output) is bypassed. Instead, diagnostic information is gathered and output to the console.

- **Export Functionality:**
  - Detects the output file type via its extension (.svg, .png, .pdf, .json, .csv, .xml).
  - For data exports:
    - **JSON Export:** Generates an array of data points, each containing original x and y values (after log scaling if enabled) along with computed SVG coordinates.
    - **CSV Export:** Produces a CSV with a header row (x,y,svgX,svgY) and subsequent data rows.
    - **XML Export:** Builds an XML document with a `<plotData>` root and child `<point>` elements for each data point.
  - For plot generation:
    - **SVG Generation:** Renders the plot with support for customizable styles as defined in the PLOT_STYLE feature.
    - **PNG Conversion:** Uses the SVG output and converts it to PNG via Sharp.
    - **PDF Generation:** Converts the SVG output to a PNG image and embeds it in a PDF file using PDFKit.

- **Diagnostics Mode:**
  - When invoked with `--diagnostics`, all export and plot generation steps are skipped.
  - Diagnostic details include Node.js runtime version, key dependency versions (such as sharp, pdfkit), and relevant environment variables.
  - This information helps users verify that the environment is properly set up for using the library.

## Testing & Compatibility
- **Unit Tests:** Updated unit tests simulate CLI input for both exports in various file formats and the diagnostics mode. Tests confirm that when diagnostics is active, no file generation occurs and the appropriate information is output.
- **Backward Compatibility:** Regular export functionality remains unaffected when the `--diagnostics` flag is not provided.

## Value
By merging export functionalities with diagnostics, this feature enhances usability and troubleshooting whilst reducing the overall feature footprint. The unified EXPORT module aligns with the mission to be the go-to plot library for formula visualisations, providing users with a single, streamlined interface for both plot export and environment diagnostics.