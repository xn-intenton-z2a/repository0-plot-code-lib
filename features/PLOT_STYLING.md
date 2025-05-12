# Overview
Enhance plot appearance by combining dimensions, titles, axis labels, gridlines, background color, color palettes, custom series colors, axis tick configuration, and point markers. This unified styling feature lets users fully customize the look of both single-series and multi-series plots, including the option to display markers at each data point.

# CLI Flags
- `--width <number>`       Specify SVG width in pixels (default 500).
- `--height <number>`      Specify SVG height in pixels (default 500).
- `--title <string>`       Add a centered title at the top of the plot.
- `--x-label <string>`     Label the x-axis, rendered below the horizontal axis.
- `--y-label <string>`     Label the y-axis, rendered rotated alongside the vertical axis.
- `--grid <true|false>`    Include dashed gridlines at major intervals.
- `--background <CSS color>`  Set a background fill color for the plot (default transparent).
- `--palette <name>`       Choose a predefined series color palette: default, pastel, dark, highContrast.
- `--colors <list>`        Comma-separated list of CSS colors overriding the palette in sequence.
- `--x-ticks <number|list>`  Set the number of evenly spaced ticks on the x-axis or comma-separated tick values.
- `--y-ticks <number|list>`  Set the number of evenly spaced ticks on the y-axis or comma-separated tick values.
- `--markers <true|false>`  Display circle markers at each data point (default false).
- `--marker-size <number>`  Set the radius of point markers in pixels (default 3).

# Implementation

## Schema Updates
• In cliSchema (src/lib/main.js) add optional fields:
  - markers: z.string().regex(/^(true|false)$/, 'markers must be true or false').optional()
  - markerSize: z.string().regex(/^\d+$/, 'markerSize must be a positive integer').optional()
• In programmatic API schema for generatePlot add:
  - markers: z.boolean().optional()
  - markerSize: z.number().int().positive().optional()

## Argument Parsing
• parseArgs captures `--markers` and `--marker-size` into parsed.markers and parsed.markerSize.
• After schema validation:
  - Convert parsed.markers to boolean showMarkers = parsed.markers === 'true'.
  - Convert parsed.markerSize to number size = Number(parsed.markerSize) or default 3.

## generateSVG Enhancement
• Extend the function signature to accept options.markers and options.markerSize alongside existing style options.
• If options.markers is true:
  - After drawing the polyline(s), for each data point in each series (or single-series data):
    • Compute cx and cy via the same scaling applied to polyline points.
    • Append a `<circle>` element with attributes cx, cy, r set to options.markerSize, fill set to the series stroke color, and stroke none.
  - Ensure markers render above the polyline strokes but below the legend and axis labels.

# Testing
- Create tests/unit/plot-styling.test.js:
  • Test parseArgs handles `--markers` and `--marker-size` flags and errors on invalid values.
  • Test programmatic generatePlot schema parses markers and markerSize and passes them into generateSVG.
  • Test generateSVG with markers adds `<circle>` elements at correct coordinates with correct radius and color.
  • Integration: CLI main() with `--markers true --marker-size 5` produces an SVG containing circle elements of radius 5 at each data point.

# Documentation
- Update USAGE.md and README.md under **Plot Styling** to include:
  • Description of the `--markers` and `--marker-size` flags with usage examples.
  • Sample SVG snippet showing circles at data points around the polyline.