# PLOTTING

## Overview
This feature provides robust plotting capabilities via a CLI and as a library. In addition to evaluating mathematical expressions and rendering them to SVG, this update introduces customizable styling options to allow users more control over the visual output from the plots.

## CLI Integration
- **Legacy and New Syntax:** Continue supporting both legacy (--expr, --start, --end, --step) and new syntax (--plot with expression, --xmin, --xmax, --points).
- **New Styling Flags:**
  - `--color`: Specify the line color (e.g., `blue`, `#FF0000`).
  - `--linestyle`: Specify the line style (e.g., `solid`, `dashed`).
  - `--linewidth`: Specify the line width (e.g., `2`).
- These flags can be used with single or multiple expression plotting modes.

## Plot Styling Options
This update allows users to override default styling provided in the plot generation:

- **Color Selection:** By default, single plots are rendered in blue and multi-plots use a sequence of preset colors. The `--color` flag will allow users to specify a custom color for a specific plot, overriding the default palette.

- **Line Style and Width:** The `--linestyle` flag can be used to determine if the line appears as a solid or dashed line. The `--linewidth` flag allows fine-tuning of the stroke thickness.

These enhancements not only improve the aesthetic control but also help in generating publication-ready plots, aligning with our mission to be the go-to plot library.

## Implementation
- **CLI Changes:** Update the CLI parser in `src/lib/main.js` to recognize and handle the additional styling flags. Validate and pass these parameters to the plot generation functions.

- **SVG Generation Enhancements:**
  - Modify the `generatePlot`, `generateSVGPlot`, and `generateMultiPlot` functions to incorporate the new styling options. 
  - For dashed lines, add SVG styling (e.g., `stroke-dasharray`).

- **Error Handling:** Ensure that invalid styling parameters are caught and that fallback defaults are used when necessary.

## Usage Examples

**Single Plot with Custom Styling:**
```bash
node src/lib/main.js --plot "sin(x)" --xmin -10 --xmax 10 --points 100 --color "#FF5733" --linestyle dashed --linewidth 3
```

**Multi-Plot with Styling Options:**
```bash
node src/lib/main.js --plots "sin(x),cos(x)" --xmin 0 --xmax 6.28 --points 100 --color "red,green" --linestyle solid,dashed --linewidth 2,3
```

## Testing & Documentation
- **Tests:** Add unit tests in `tests/unit/main.test.js` to evaluate the new styling parameters. Ensure that SVG outputs correctly reflect custom colors, line styles, and widths.

- **Documentation:** Update the README.md and CONTRIBUTING.md files to include examples and usage details for the new styling options.

## Future Considerations
- Further enhancements may include more advanced styling such as marker shapes, grid lines, and even export formats beyond SVG.
- Modularize styling options into a separate component if the feature set grows further.
