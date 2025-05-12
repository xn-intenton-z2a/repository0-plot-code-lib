# Overview
Add support for shading the area under a plotted curve to emphasize the integral of a series over its range. When enabled, the plot will include a filled region from the baseline (y=0 or specified axis) up to the data points.

# CLI Flags
- --integral <true|false>  Boolean flag to enable area shading under the primary series.
  Must be true or false; defaults to false when omitted.
  Mutually exclusive with derivative flag only in the sense that shading applies to each series but does not prevent multiple series plots.

# Implementation
1. Schema and Argument Parsing
   In src/lib/main.js update the CLI schema to include:
     integral: z.string().regex(/^(true|false)$/).optional()
   In parseArgs detect --integral and convert the string to a boolean flag showIntegral = parsedArgs.integral === 'true'.
2. GeneratePlot and Main Entry
   Extend the programmatic API schema in generatePlot to accept integral as a boolean optional field.
   After generating data (or data series for multi-series), before rendering call generateSVG with an options object that includes integral: showIntegral.
3. generateSVG Enhancement
   Update generateSVG signature to accept a second parameter options containing integral boolean and baseline (default 0).
   When options.integral is true:
     • For single series, construct a polygon by prepending a point at the first x on baseline, appending a point at the last x on baseline, and filling with a semi-transparent color.
     • For multi-series, apply shading only to the first series or document behavior for multiple series (e.g., shade each series separately).
   Ensure shading is rendered behind polyline elements by inserting the fill path before stroke elements.
4. Baseline Flexibility (Optional)
   Default baseline is y=0. Future iterations may accept a --baseline flag to customize the fill boundary.

# Testing
- Create tests/unit/integral-plotting.test.js:
  • Programmatic API: call generatePlot with integral true and verify returned SVG contains a <polygon> or <path fill= attribute and that the data polyline remains present.
  • CLI mode: run main with --integral true, inspect written SVG and ensure shading appears before polyline and uses correct coordinates.
  • Error cases: invalid integral values (not true or false) should trigger schema validation errors and exit with code 1.

# Documentation
- Update USAGE.md and README.md:
  • Describe the --integral flag with an example:
    repository0-plot-code-lib --expression y=x^2 --range x=0:5 --format svg --output plot.svg --integral true
  • Show a sample SVG snippet including a shaded polygon region under the curve.
