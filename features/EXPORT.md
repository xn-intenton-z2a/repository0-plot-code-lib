# EXPORT Feature Update

## Overview
This update expands the EXPORT feature to provide a unified export solution for various output formats. In addition to the existing PDF (and SVG minification) during export, users can now export computed plot data in JSON and CSV formats. This functionality enables seamless integration into data-processing pipelines, facilitating further analysis and visual customizations.

## Implementation Details
- **Source File Changes**:
  - Update the CLI argument parser in `src/lib/main.js` to detect output file extensions: `.json` and `.csv` in addition to `.svg` and `.png`.
  - For JSON export, generate an array of data points where each point contains the original x and y values (applying logarithmic transformation if necessary) alongside SVG coordinates (`svgX` and `svgY`).
  - For CSV export, produce a header row (`x,y,svgX,svgY`) followed by computed data points.
  - Ensure that these export branches reuse the common plotting logic for consistency with other formats.

## Testing
- **Unit Tests**:
  - Enhance `tests/unit/main.test.js` with new cases verifying that JSON exports contain valid JSON arrays with the required properties (`x`, `y`, `svgX`, `svgY`).
  - Add tests for CSV export that check the header row and correct formatting of data rows for both function-based plots and CSV input plots.

## Documentation
- **README Updates**:
  - Revise the usage section in `README.md` to include examples for exporting to JSON and CSV.
  - Clearly document the expected data structure for JSON and CSV outputs, including information on how headers are handled.

## Compatibility and Value
This update aligns with our mission to be the go-to plot library by providing versatile export options. It extends the library’s usability beyond visual rendering, allowing users to integrate computed plot data directly into other systems and workflows. The expanded export functionality is implemented solely via modifications to existing source files, tests, and documentation, ensuring a lean, maintainable feature set.