# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## CLI Usage

Generate plots directly from the command line. The tool now supports scaling for both x and y ranges, multiple expressions, configurable SVG dimensions, padding, adjustable data point resolution, a custom color palette, custom line styles, gridlines, axis labels, a title, logarithmic y-axis and x-axis scaling, adjustable line width, configurable legend placement, an option to disable data point markers, a custom background color, tooltips for data points, and raw JSON output of plot data.

### Expression Based Plotting

Provide the range in the format:

  --range "x=start:end[,y=min:max]"

If you provide an expression using --expression, the tool will evaluate the function over the specified x-range and compute y values accordingly. You can also customize the SVG output using the following options:

  --width [number]             Override the default SVG width (default: 500)
  --height [number]            Override the default SVG height (default: 300)
  --padding [number]           Override the default padding used for scaling (default: 20)
  --points [number]            Specify the number of data points computed along the x-range (default: 10)
  --colors [color1,color2,...] Provide a custom comma-separated color palette (default: blue, green, red, orange, purple)
  --lineStyles [style1,style2,...] Provide a custom comma-separated list of line styles (e.g., dashed, dotted) for the plotted expressions. If omitted, lines will be solid.
  --lineWidth [number]         Provide a custom stroke width for plot lines (default: 2)
  --legendPosition [top|bottom|left|right]  Specify the legend placement (default: top)
  --grid                     Enable drawing of gridlines in the plot (gridlines are dashed).
  --xlabel [text]              Provide a label for the x-axis.
  --ylabel [text]              Provide a label for the y-axis.
  --title [text]               Provide a title to be displayed at the top center of the plot.
  --logYAxis                 Enable logarithmic scaling for the y-axis (all y values must be strictly positive).
  --logXAxis                 Enable logarithmic scaling for the x-axis (all x values must be strictly positive).
  --noMarkers                Disable rendering of data point markers in the SVG output.
  --bgColor [color]          Set a custom background color for the SVG plot (default: white)
  --tooltip                  Enable tooltips on data points. When used, each data point marker in the SVG will contain a tooltip (shown on hover) displaying its (x, y) coordinate.

### JSON Output Option

Use the --json flag to output the computed plot data in JSON format instead of generating an SVG or PNG file. This option returns raw JSON data representing the evaluated expressions, including x and y values and computed positions, which can be used for further processing or debugging.

Example:

  node src/lib/main.js --expression "y=sin(x)" --range "x=0:9,y=-1:1" --json

When --json is provided, the tool bypasses SVG/PNG generation and writes the JSON string to the console.

### CSV Data Input Option

In addition to expression-based plotting, you can supply a CSV file containing data using the --dataFile flag. The CSV file should have two columns (x and y) and may include a header row. For example:

contents of data.csv:

  x,y
  0,0
  1,1
  2,4
  3,9

To generate a plot from CSV data, run:

  node src/lib/main.js --dataFile data.csv

You can also pipe CSV data via standard input using the --stdin flag (when --dataFile is not provided). For example:

  cat data.csv | node src/lib/main.js --stdin

In this mode, the tool reads CSV-formatted data from STDIN and processes it similar to the --dataFile option.

### Multiple Expressions

Plot more than one function by providing multiple expressions as a comma-separated list to the --expression flag. Each expression will be plotted with a distinct color and, if specified, a distinct line style.

Example:

  node src/lib/main.js --expression "y=sin(x),y=cos(x)" --range "x=0:9,y=-1:1" --colors "magenta,cyan" --lineStyles "dashed,dotted" --lineWidth 3.5 --legendPosition bottom --grid --xlabel "Time (s)" --ylabel "Amplitude" --title "My Awesome Plot" --logYAxis --logXAxis --noMarkers --bgColor lightyellow --tooltip

### Auto Y-Axis Range

If you omit the y-axis range (e.g., --range "x=0:9"), the tool automatically determines the appropriate y-range based on the computed data points.

If the --file argument is omitted, the SVG content is output to the console.

## Limitations

When using the --logYAxis or --logXAxis flag, ensure that all corresponding axis values (or range boundaries) are strictly positive. The tool will not generate a logarithmically scaled plot if any value is zero or negative.

## Legend Placement

The --legendPosition option allows specifying where the legend text appears in the SVG. Valid options are:

- top: Places the legend in the top-left (default).
- bottom: Positions the legend near the bottom.
- left: Aligns the legend along the left side.
- right: Aligns the legend along the right side.

## License

MIT
