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