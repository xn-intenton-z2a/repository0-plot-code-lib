# EXPORT FEATURE UPDATE

## Overview
This feature provides a unified export solution for various output formats, allowing users to export computed plot data and generated plots in multiple formats. In addition to PDF export (with SVG to PNG conversion), and the already supported JSON and CSV exports, this update expands functionality to include XML export. By adding support for exporting plot data as XML, the library becomes even more versatile for integration into data-processing pipelines.

## Implementation Details
- **Source File Changes:**
  - Update the CLI argument parser in `src/lib/main.js` to detect output file extensions: `.svg`, `.png`, `.pdf`, `.json`, `.csv`, and now `.xml`.
  - For JSON export, generate an array of data points. Each point contains the original x and y values (transformed if logarithmic scaling is enabled) along with the corresponding SVG coordinates (`svgX` and `svgY`).
  - For CSV export, produce a header row (`x,y,svgX,svgY`) followed by computed data points for both function-based plots and CSV input plots.
  - For XML export, create an XML document with a `<plotData>` root element and child `<point>` elements. Each `<point>` element includes attributes for `x`, `y`, `svgX`, and `svgY`.
  - For PDF export, first convert the SVG content to a PNG image using `sharp`, and then embed this image into a PDF document using PDFKit.
  - Reuse common plot data computation logic across all export branches to ensure consistency in the exported data.

## Testing
- **Unit Tests:**
  - Extend unit tests (in `tests/unit/main.test.js`) to validate that exporting with file extensions `.json`, `.csv`, and `.xml` produces data with the expected structure and properties. 
  - For the PDF export branch, add tests to confirm that generated files begin with `%PDF-` and are valid PDF documents.

## Documentation
- **README Updates:**
  - Update `README.md` to include examples and usage instructions for exporting to XML in addition to the existing JSON, CSV, PDF, and SVG exports.
  - Clearly document the expected data structure for each export format.

## Compatibility and Value
This update enhances the library's interoperability by providing multiple export options. Users can integrate the exported plot data directly into reporting pipelines or further data analysis workflows. The addition of XML export meets the growing demand for standardized data interchange formats.
