# Overview
Add advanced customization for plot appearance including dimensions, title, axis labels, gridlines, and series color control. Users can select predefined palettes or specify exact CSS colors for each data series to ensure consistent styling in multi-series or derivative plots.

# CLI Flags
- `--width <number>`: Specify the width of the output SVG in pixels (default 500).
- `--height <number>`: Specify the height of the output SVG in pixels (default 500).
- `--title <string>`: Add a centered title at the top of the plot.
- `--x-label <string>`: Label the x-axis, rendered below the horizontal axis.
- `--y-label <string>`: Label the y-axis, rendered rotated alongside the vertical axis.
- `--grid`: Include gridlines at major tick intervals based on the data range.
- `--palette <name>`: Choose a predefined color palette for series strokes. Supported names: default, pastel, dark, highContrast. Applies when plotting one or more series.
- `--colors <list>`: Comma-separated list of CSS color values (e.g., "red,#00ff00,rgba(0,0,255,0.5)"). When provided, overrides palette and assigns each color in sequence to each series. If fewer colors than series, remaining series use default palette colors.

# Implementation
1. Schema Updates
   • In `cliSchema` (src/lib/main.js), add optional fields:
     - `palette`: z.enum(["default","pastel","dark","highContrast"]).optional()
     - `colors`: z.string().optional()
   • In programmatic API schema for `generatePlot`, add matching `palette` and `colors` fields (palette as z.enum, colors as z.string).
2. Argument Parsing
   • In `parseArgs`, detect `--palette` and `--colors`, store raw values.
   • After schema validation, normalize:
     - `selectedPalette` as string or undefined.
     - `colorList` by splitting `colors` string on commas into an array of CSS strings.
3. GenerateSVG Enhancement
   • Extend `generateSVG` signature to accept an options object including palette and colorList alongside width, height, grid, labels.
   • Determine series stroke colors in priority:
     1. If `colorList` provided, use its entries in series order.
     2. Else if `palette` provided, map palette name to a color array:
        - default: ["black","red","blue","green","orange","purple"]
        - pastel: ["#FFB3BA","#BFFCC6","#BBD2FF","#FFFFBA","#FFDFBA","#DFBAFF"]
        - dark: ["#222222","#444444","#666666","#888888","#AAAAAA","#CCCCCC"]
        - highContrast: ["#000000","#FFFFFF"]
     3. Otherwise, use existing default color array.
   • Apply determined colors to each `<polyline>` stroke attribute.
   • Preserve existing rendering order and legend generation.
4. Programmatic and HTTP API
   • Propagate palette and colorList into calls to `generatePlot` and HTTP `/plot` endpoint handlers.

# Testing
- Update `tests/unit/plot-styling.test.js` to cover:
  • Parsing of `--palette` and `--colors` flags and conversion to options.
  • In `generateSVG`, when options.colors is provided, verify `<polyline>` strokes match provided list.
  • When `--palette pastel` is used, verify SVG strokes cycle through pastel colors.
  • Backward compatibility: absence of palette and colors yields original behavior and default colors.

# Documentation
- Update `USAGE.md` and `README.md`:
  • Document `--palette` and `--colors` flags with examples:
    repository0-plot-code-lib --expressions "y=sin(x),y=cos(x)" --range "x=0:6.28" --format svg --output dual.svg --palette pastel
    repository0-plot-code-lib --expression "y=x" --range "x=0:5" --format svg --output custom.svg --colors "#ff0000,blue"
  • Show sample SVG snippets illustrating customized series colors and legend entries.