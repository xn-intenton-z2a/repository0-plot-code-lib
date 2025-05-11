# Overview
Add support for drawing user-defined horizontal and vertical reference lines on plots. Users can highlight specific x or y values with lines extending across the chart to emphasize thresholds or key levels.

# CLI Flags

- --hline <list>  Comma-separated list of y-values at which to draw horizontal reference lines (e.g., "1,2.5,5").
- --vline <list>  Comma-separated list of x-values at which to draw vertical reference lines (e.g., "0,3.14,6.28").
- Flags may be used independently or together. Values must parse as numbers.

# Implementation

1. Schema and Argument Parsing
   - In cliSchema (src/lib/main.js), add optional fields:
     • hline: z.string().optional()
     • vline: z.string().optional()
   - In parseArgs, detect --hline and --vline flags and store raw comma-separated strings.
   - After schema validation, parse hline and vline strings into arrays of numbers, validating that each entry is a finite number.

2. Data Generation and Rendering
   - In main() and generatePlot(), pass parsed hLines and vLines values into generateSVG.
   - Update generateSVG signature to accept an options object including hLines and vLines arrays.
   - Inside generateSVG:
     • For each y in hLines, render a <line> element spanning x=0 to width at the mapped Y position.
     • For each x in vLines, render a <line> element spanning y=0 to height at the mapped X position.
     • Apply stroke="red" and stroke-dasharray="4,2" for reference lines by default.
     • Render reference lines behind polylines by inserting lines before the data path.

# Testing

- Create tests/unit/reference-lines.test.js:
  • Test parseArgs captures hline and vline flags and throws on invalid values.
  • Test generateSVG receives hLines and vLines options and outputs <line> elements at correct positions with expected attributes.
  • Test main() and generatePlot() integrate reference lines for both svg and png outputs.

# Documentation

- Update USAGE.md and README.md:
  • Document --hline and --vline flags with examples:
    repository0-plot-code-lib --expression "y=x" --range "x=0:5" --hline 2 --vline "1,4" --format svg --output plot.svg
  • Show sample SVG snippet with horizontal and vertical dashed red lines.
