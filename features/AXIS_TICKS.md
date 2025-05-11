# Overview
Add axis lines with tick marks and numeric labels on both x and y axes to improve readability and scale reference.

# CLI Flags
- --x-ticks <count or list>  Number of major tick marks on the x-axis or comma-separated specific values (e.g., 5 or 0,2,4,6,8).
- --y-ticks <count or list>  Number of major tick marks on the y-axis or comma-separated specific values.
Flags are optional with default tick count of 5 for each axis.

# Implementation
1. Schema and Argument Parsing
   In src/lib/main.js, extend cliSchema and programmatic API schema to include optional xTicks and yTicks fields. Update parseArgs and generatePlot schema to accept numeric counts or comma-separated string lists, parse into arrays of numbers, and validate positive integer counts or numeric entries.
2. SVG Rendering
   Extend generateSVG signature to accept options including xTicks and yTicks. Determine axis line positions: at zero if within data range, otherwise at data minimum. Compute tick values by count or using provided list. For each x tick draw a small vertical line at the axis and render a text label below. For each y tick draw a small horizontal line and render a text label beside the axis. Render main axis lines at computed positions. Ensure consistent styling and positioning relative to plot dimensions.
3. Programmatic and HTTP API
   Extend generatePlot options to include xTicks and yTicks. Propagate the parsed tick arrays into generateSVG so CLI, HTTP, and programmatic interfaces support custom ticks.

# Testing
Add tests in tests/unit/axis-ticks.test.js. Verify parseArgs and generatePlot accept count and list forms for xTicks and yTicks. Test that generateSVG outputs axis line, tick line, and label elements at correct coordinate positions when using tick options and default behavior yields five ticks per axis.

# Documentation
Update USAGE.md and README.md with examples for custom tick settings and include sample SVG snippets showing axis ticks and labels.