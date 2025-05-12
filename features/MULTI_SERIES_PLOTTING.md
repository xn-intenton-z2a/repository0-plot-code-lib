# Overview
Provide the ability to plot multiple mathematical expressions in a single invocation. Users can supply several expressions by repeating the --expression flag or via a comma-separated --expressions option. Each series is drawn in a distinct color and labeled with its expression in the legend.

# CLI Flags
- --expression <expr>        Repeatable flag to specify one expression per usage (e.g., --expression "y=sin(x)").
- --expressions <list>       Comma-separated list of expressions (e.g., --expressions "y=sin(x),y=cos(x),y=x^2").
- Mutually exclusive with --data and --x-expression/--y-expression (parametric) and --data-file modes.
- Preserves existing flags: --range, --format, --output, styling (title, labels, grid, palette, colors), derivative, trendline, export-data.

# Implementation
1. Schema Updates
   • In cliSchema (src/lib/main.js) extend:
     - expressions: z.string().optional().refine(v => v.split(",").length > 0, 'expressions must be a comma-separated list')
     - Modify expression: z.union([z.string(), z.array(z.string())]) or accept array of strings for repeated flags.
2. Argument Parsing
   • In parseArgs(), collect either:
     - multiple keys named expression into an array
     - a single key expressions and split its value on commas
   • Enforce at least one expression or expressions flag present and normalize into parsed.expressions array.
   • Ensure that expression(s) flags are invalid when --data or parametric flags are also set.
3. Main Flow
   • After validation, determine seriesList:
     - Take parsed.expressions array
     - For backward compatibility, if only parsed.expression present (string), treat as single-element list.
   • For each expression in seriesList:
     - Call generateData(expression, rangeObj, samples) to produce points
     - Build series object: { label: expression, points }
   • If derivative, trendlineStats or overlayTrendline flags apply, handle overlays per series as separate series entries.
   • Pass series array into generateSVG() to render multiple polylines and add legend.
4. generateSVG Enhancement
   • Accept an array of series objects: each has label and points
   • Assign distinct colors from palette or colors list
   • Render each polyline with stroke color and include legend group labeling each series swatch
   • Preserve single-series behavior when array length is one.

# Testing
- tests/unit/multi-series-plotting.test.js:
  • parseArgs handles repeated --expression flags and --expressions splitting.
  • CLI main writes an SVG containing multiple <polyline> elements and a <g class="legend"> with matching labels.
  • Programmatic generatePlot({ expressions: [...], range, format }) returns SVG with multiple series.
  • Backward compatibility: single-expression invocation remains unchanged.
  • Error cases: mixing expressions with --data or missing range or expressions triggers validation error.

# Documentation
- Update USAGE.md under **Plotting Multiple Series**:
  • Document usage of --expressions and repeated --expression flags with examples.
  • Show sample SVG snippet with two curves and legend.
- Update README.md to include the new flags in the CLI Usage section and show examples of multi-series plotting.
- Ensure examples illustrate both forms and preserve links to styling and output options.