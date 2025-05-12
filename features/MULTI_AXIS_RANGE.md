# Overview
Enable users to specify explicit numeric ranges for both x and y axes in a single command invocation.  Instead of only a single axis range, users can control zoom and scale on each axis independently.

# CLI Flags
- --range <list>   Comma-separated axis ranges in the form x=min:max or y=min:max.  For example:
  repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:6.28,y=-1:1" --format svg --output plot.svg
- --x-range <min:max>  Alias for specifying only the x-axis range.
- --y-range <min:max>  Alias for specifying only the y-axis range.

# Implementation
1. Schema and Argument Parsing
   • Update cliSchema in src/lib/main.js so that the existing range field accepts a comma-separated list of axis ranges matching /^[xy]=-?\d+(\.\d+)?:-?\d+(\.\d+)?(?:,[xy]=-?\d+(\.\d+)?:-?\d+(\.\d+)?)*$/.  Add optional fields xRange and yRange in mud mutually exclusive with range.
   • In parseArgs, support both the combined --range flag and separate --x-range and --y-range flags.  Normalize into parsed.xRange and parsed.yRange strings.
   • After validation, split on commas and parse each segment with parseRange to return an object like { x: {min,max}, y: {min,max} }.

2. Data Generation and Rendering
   • For expression plotting, continue to generate data points based on the x-axis range.
   • In generateSVG, accept options.yRange in addition to width and height.  When yRange is provided, compute a fixed mapping from data y values into SVG coordinates using the explicit min/max instead of auto-scale.
   • For parametric and data-file modes reuse the same axis scaling logic.

3. Programmatic API
   • Update generatePlot schema to accept either a combined range string or explicit numeric properties xMin, xMax, yMin, yMax.
   • In generatePlot, normalize options into rangeObj = { axis:'x',min:xMin,max:xMax } and yRangeObj = { axis:'y',min:yMin,max:yMax } and pass both into SVG generation.

# Testing
- Add tests in tests/unit/multi-axis-range.test.js:
  • Verify parseArgs handles combined --range x=..,y=.. and separate --x-range and --y-range.
  • Test error cases for invalid formats or missing values.
  • In generateSVG programmatic mode, supply an explicit yRange and assert that the polyline coordinates reflect the forced y scale.
  • Integration: CLI invocation with both axes ranges produces an SVG whose viewBox or coordinates match expected mapping.

# Documentation
- Update USAGE.md:
  • Document combined and separate range flags with examples.
  • Show a sample SVG snippet with y-axis clipped or zoomed to the specified y-range.
- Update README.md under **Usage**:
  • Include a new example with both axes configured:
    repository0-plot-code-lib --expression "y=x^2" --range "x=0:5,y=0:20" --format svg --output zoom.svg