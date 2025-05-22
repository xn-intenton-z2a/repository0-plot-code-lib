# Overview
Adds plotting capabilities to render generated time series data as visual charts in SVG or PNG formats. Leverages ChartJSNodeCanvas to produce line charts from sampled data, fitting within the CLI tool’s workflow.

# CLI Parameters
--plot-format   Specifies output chart format: svg or png; when provided, plot generation is triggered.  
--width         Width of the generated chart in pixels; defaults to 800.  
--height        Height of the generated chart in pixels; defaults to 600.  
--file          Required when --plot-format is used; path to write the generated chart file.

# Plot Generation
On invocation with --plot-format:
1. Validates that --expression and --range flags are present and correct.  
2. Parses width and height as positive integers.  
3. Samples expression over the specified range to produce an array of (x, y) points.  
4. Configures ChartJSNodeCanvas with provided dimensions and format.  
5. Constructs a line chart configuration mapping x values to horizontal axis and y values to vertical axis, with minimal styling for a clear, single-series chart.
6. Renders the chart to a buffer and writes it to the file path provided by --file.

# Error Handling
- Missing --file when --plot-format is provided: print descriptive error and exit code 1.  
- Unsupported --plot-format values: error and exit code 1.  
- Invalid width or height (non-positive or non-numeric): error and exit code 1.  
- Rendering or file I/O failures: error message and exit code 1.

# Examples
Render an SVG chart:
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28:0.1" --plot-format svg --file chart.svg

Render a PNG chart with custom dimensions:
node src/lib/main.js --expression "y=2*x" --range "x=0:10:1" --plot-format png --width 1024 --height 768 --file chart.png