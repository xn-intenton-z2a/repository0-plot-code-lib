# Overview
Adds plotting capabilities to render generated time series data as visual charts in SVG or PNG formats. Supports both standard time series plots and parametric curve plots derived from two expressions. Leverages ChartJSNodeCanvas to produce line charts and parametric plots from sampled data, fitting within the CLI tool’s workflow.

# CLI Parameters
--plot-format   Specifies output chart format: svg or png; when provided, plot generation is triggered.
--width         Width of the generated chart in pixels; defaults to 800.
--height        Height of the generated chart in pixels; defaults to 600.
--file          Required when --plot-format is used; path to write the generated chart file.
--parametric    Optional: two comma-separated expressions 'x=<expr>,y=<expr>' to generate a parametric curve over a parameter range.
--range         Sampling range in the form t=start:end:step when using parametric; otherwise x=start:end:step.

# Plot Generation
On invocation with --plot-format:
1. Validates --expression and --range for time series or --parametric and --range for parametric mode.
2. Parses range values as positive numeric start, end, and step.
3. Samples data: for time series, computes y at each x; for parametric, computes x(t) and y(t) at each t.
4. Configures ChartJSNodeCanvas with specified dimensions and format.
5. Constructs a chart configuration: standard line chart for time series or parametric scatter/line chart for parametric mode.
6. Renders the chart to a buffer and writes it to the file path provided by --file.

# Error Handling
- Missing --file when --plot-format is provided: descriptive error and exit code 1.
- Unsupported --plot-format values: error and exit code 1.
- Invalid width, height, or range values: descriptive error and exit code 1.
- Invalid expression syntax or parametric expressions: descriptive error and exit code 1.
- Rendering or file I/O failures: error and exit code 1.

# Examples
Render a standard SVG chart:
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28:0.1" --plot-format svg --file chart.svg

Render a parametric curve (circle) in PNG:
node src/lib/main.js --parametric "x=cos(t),y=sin(t)" --range "t=0:6.28:0.01" --plot-format png --file circle.png --width 500 --height 500