# Overview
Enhance plot appearance by combining dimensions, titles, axis labels, gridlines, background color, color palettes, custom series colors, and axis tick configuration. This unified styling feature lets users fully customize the look of both single-series and multi-series plots in one cohesive setup.

# CLI Flags
- --width <number>       Specify SVG width in pixels (default 500).
- --height <number>      Specify SVG height in pixels (default 500).
- --title <string>       Add a centered title at the top of the plot.
- --x-label <string>     Label the x-axis, rendered below the horizontal axis.
- --y-label <string>     Label the y-axis, rendered rotated alongside the vertical axis.
- --grid <true|false>    Include dashed gridlines at major intervals.
- --background <CSS color>  Set a background fill color for the plot (default transparent).
- --palette <name>       Choose a predefined series color palette: default, pastel, dark, highContrast.
- --colors <list>        Comma-separated list of CSS colors overriding the palette in sequence.
- --x-ticks <number|list>  Set the number of evenly spaced ticks on the x-axis or comma-separated tick values.
- --y-ticks <number|list>  Set the number of evenly spaced ticks on the y-axis or comma-separated tick values.

# Implementation
1. Schema Updates
   • In cliSchema (src/lib/main.js) add optional fields:
     - background: z.string().optional()
     - xTicks: z.string().optional()
     - yTicks: z.string().optional()
   • In programmatic API schema for generatePlot, add matching background, xTicks, and yTicks fields.

2. Argument Parsing
   • parseArgs captures --background, --x-ticks, and --y-ticks flags into parsed.background, parsed.xTicks, parsed.yTicks.
   • After schema validation:
     - Parse parsed.background as a CSS color string.
     - For xTicks/yTicks: if value is a single number string, treat as tickCount; if comma list, parse into tickValues array of numbers.

3. generateSVG Enhancement (src/lib/main.js)
   • Extend the function signature to accept options.background, options.xTicks, options.yTicks alongside existing style options.
   • If options.background is provided:
     - Prepend a <rect> element as the first child under the SVG root with attributes width, height, and fill set to the background color.
   • Compute tick positions:
     - For tickCount: divide axis into equal intervals; for tickValues: map each value via the scaling function.
     - For each x-tick, append a <line> element at the axis baseline and a <text> label beneath; for y-ticks, draw ticks along left axis and rotated labels.
     - Ensure tick elements render above gridlines but behind data series.

4. Plot Elements Order
   • Background rect first, then gridlines, then axis ticks, then title, then plot series (polylines and legend), then axis labels.

# Testing
- Create tests/unit/plot-styling.test.js:
  • Test generateSVG with background option adds correct <rect> attributes.
  • Test parseArgs and programmatic API schema for background, xTicks, yTicks parsing.
  • Test ticks rendering for both count and value-list modes, verifying correct <line> and <text> elements.
  • Integration: CLI main() with styling flags produces an SVG containing the background, grid, ticks, series, legend, and labels in correct order.

# Documentation
- Update USAGE.md and README.md under **Plot Styling** to include:
  • Description of the --background flag with examples.
  • Demonstration of --x-ticks and --y-ticks usage.
  • Sample SVG snippet showing background <rect>, gridlines, ticks, title, and axis labels.