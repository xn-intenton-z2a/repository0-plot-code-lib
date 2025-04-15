# PLOTTING

## Overview
This feature provides robust plotting capabilities both as a CLI tool and as a library. It supports evaluating mathematical expressions and rendering them to SVG with enhanced styling options including custom color, line style, and line width. In addition, this update extends the plotting functionality to support file format conversion (PNG, JPEG, PDF) and CSV export of computed data points to meet diverse visualization and data analysis requirements.

## CLI Integration & Usage
- **Legacy and New Syntax Support:** Continue supporting both the legacy parameters (`--expr`, `--start`, `--end`, `--step`) and new syntax (`--plot` with parameters like `--xmin`, `--xmax`, `--points`).
- **Styling Flags:** Users may specify `--color`, `--linestyle`, and `--linewidth` to customize plot appearance.
- **Interactive Mode:** With the `--interactive` flag, the generated SVG includes hover tooltips, zoom/pan capabilities, and optional animated transitions (enabled via `--animate`).
- **File Conversion:** Using the `--file` flag with extensions such as `.png`, `.jpg`, or `.pdf`, the tool automatically converts the generated SVG plot to the specified format using libraries like Sharp and Puppeteer.
- **CSV Export:** The new `--export-csv` flag allows users to export the computed data points (with a header of `expression,x,y`) to a CSV file, facilitating further analysis.

## Plot Styling and Export Options
- **Custom Styling:** The plot can be rendered with default or user-specified colors, line styles (solid or dashed), and stroke widths for publication-ready visuals.
- **File Conversion Integration:** The implementation leverages integrated libraries to produce high-quality PNG, JPEG, or PDF outputs directly from the generated SVG content.
- **Data Export:** Exported CSV files include expression details along with the corresponding x and y data points calculated during plot generation, offering an additional layer of utility.

## Implementation
- **CLI Parser Updates:** Enhance the existing CLI parser to validate and pass new file conversion and CSV export parameters to the plotting functions.
- **SVG and Conversion Functions:** Update the plotting functions in `src/lib/main.js` so that the same core SVG rendering logic supports optional conversion to different output formats, while preserving caching for performance.
- **Robust Error Handling:** Validate user inputs for range, file extensions, and CSV export requirements; fallback gracefully to default values if necessary.

## Future Considerations
- Further modularization of export functions could be implemented, allowing additional formats or automated optimizations.
- Enhanced logging and diagnostics may be added to monitor conversion performance and CSV export success.
- Consider expanding the interactive mode with additional tooltips customization or export options directly via the HTTP API.
