# EXPORT_ENGINE

## Overview
This feature introduces an export module that enables users to output plots and formula evaluations in multiple formats including SVG, JSON, CSV, Markdown, ASCII, and HTML. EXPORT_ENGINE will be implemented as a single source file (e.g., `src/lib/exportEngine.js`). The module is designed to work both within the CLI and the web interface, offering a consistent export interface that complements the plotting and diagnostics capabilities of the CORE_ENGINE.

## Motivation
- **Multi-format Support:** Provide users with flexibility in obtaining output in their desired format to facilitate integration with various tools and workflows.
- **Enhanced Usability:** Allow users to quickly generate exports of their plots without manual conversion, aligning with our mission of being the go-to plot library for formula visualisations.
- **Integration:** Seamlessly integrate with the existing CORE_ENGINE and WEB_INTERFACE, reusing data and plot structures while decoupling export logic into a dedicated module.

## Implementation Details
1. **Single Source Module:**
   - Develop a standalone file (`src/lib/exportEngine.js`) that exposes functions to convert plot data into the supported output formats.
   - Use a configuration-driven approach to select the desired output format.

2. **CLI and API Integration:**
   - For CLI: Add a new flag (e.g., `--export`) which accepts parameters for the export type and destination file. Integrate this with the main execution flow in `src/lib/main.js`.
   - For Web: Extend the HTTP API in `src/web/app.js` to accept export commands, returning the plot in the requested format.

3. **Error Handling and Logging:**
   - Ensure robust conversion with clear error messages if unsupported formats are requested or if the conversion fails.
   - Log export operations for auditing and debugging, using environment variables (e.g., `DEBUG_EXPORT`) for detailed logs.

4. **Testing and Documentation:**
   - Include unit tests in `tests/unit/exportEngine.test.js` to verify correct output format conversions for a set of sample plots.
   - Update the README and CONTRIBUTING documentation to provide clear examples, usage instructions, and guidelines for extending export formats.

## Usage Examples

**CLI Export Example:**
```bash
node src/lib/main.js --export svg "path/to/plotData.json" "output/plot.svg"
```

**Web API Export Request Example:**
```bash
curl -X POST http://localhost:3000/export -d "format=csv&plotId=12345"
```

This feature will provide a practical and streamlined way for users to export their plots into various formats, facilitating easier sharing, reporting, and integration with other data processing pipelines.
