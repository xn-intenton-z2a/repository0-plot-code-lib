# Overview
Add advanced customization for plot appearance including dimensions, title, axis labels, gridlines, series color control, and axis tick configuration. Users can adjust the number or specific values of ticks on the x and y axes to fine-tune the scale and presentation.

# CLI Flags
- --width <number>: Specify the width of the output SVG in pixels (default 500).
- --height <number>: Specify the height of the output SVG in pixels (default 500).
- --title <string>: Add a centered title at the top of the plot.
- --x-label <string>: Label the x-axis, rendered below the horizontal axis.
- --y-label <string>: Label the y-axis, rendered rotated alongside the vertical axis.
- --grid <true|false>: Include gridlines at major tick intervals based on the data range.
- --palette <name>: Choose a predefined color palette for series strokes. Supported names: default, pastel, dark, highContrast.
- --colors <list>: Comma-separated list of CSS color values overriding palette. Applies in sequence to series.
- --x-ticks <number|list>: Specify the number of evenly spaced ticks on the x-axis or a comma-separated list of exact numeric x-values for tick positions.
- --y-ticks <number|list>: Specify the number of evenly spaced ticks on the y-axis or a comma-separated list of exact numeric y-values for tick positions.

# Implementation
1. Schema Updates
   • In cliSchema (src/lib/main.js) add optional fields:
     - xTicks: z.string().optional()
     - yTicks: z.string().optional()
   • In programmatic API schema for generatePlot, add matching xTicks and yTicks fields as z.string().optional().

2. Argument Parsing
   • In parseArgs, detect --x-ticks and --y-ticks flags and store raw values.
   • After schema validation, normalize:
     - If xTicks is a number string, treat as tickCountX. If comma list, parse into tickValuesX array of numbers.
     - Likewise for yTicks into tickCountY or tickValuesY.

3. generateSVG Enhancement
   • Extend generateSVG signature to accept options.xTicks and options.yTicks alongside existing styling options.
   • Determine x-axis range from series data or supplied yRange/xRange. Compute SVG coordinates for each tick:
     - If tickCountX provided, divide axis interval into equal segments.
     - If tickValuesX provided, map each value via scaling function.
   • For each x-tick:
     - Append a short <line> element at (xPos, height) to (xPos, height - tickLength) with stroke="black".
     - Append a <text> element below the axis at (xPos, height + labelOffset) showing the numeric tick value.
   • Repeat for y-ticks: draw vertical ticks along left axis and rotate tick labels.
   • Ensure tick elements render above grid but behind data series.

# Testing
- Create tests/unit/plot-ticks.test.js:
  • parseArgs should capture --x-ticks and --y-ticks flags and correctly parse counts and lists.
  • generateSVG should render <line> and <text> elements at correct positions for tickCount and tickValues modes.
  • Integration: main() or generatePlot() with styling and tick flags returns an SVG containing tick markers and labels.

# Documentation
- Update USAGE.md and README.md under Plot Styling:
  • Document --x-ticks and --y-ticks flags with examples:
    repository0-plot-code-lib --expression "y=x" --range "x=0:10" --format svg --output plot.svg --x-ticks 5 --y-ticks "0,2,4,6"
  • Provide a sample SVG snippet showing tick lines and numeric labels along both axes.
