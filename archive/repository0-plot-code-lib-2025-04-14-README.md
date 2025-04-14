# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## CLI Usage

Generate plots directly from the command line. The tool now supports scaling for both x and y ranges, multiple expressions, as well as custom SVG dimensions, padding, configurable data point resolution, a custom color palette, custom line styles, gridlines, axis labels, a title, logarithmic y-axis scaling for data spanning multiple orders of magnitude, and adjustable line width for plot lines.

Provide the range in the format:

  --range "x=start:end[,y=min:max]"

You can now omit the y-axis range. If the y range is omitted, the tool will automatically compute the appropriate range from the evaluated data.

You can also customize the SVG output dimensions, padding, number of data points, color palette, line styles, enable gridlines, axis labels, a plot title, logarithmic y-axis scaling, and line width using the following options:

  --width [number]             Override the default SVG width (default: 500)
  --height [number]            Override the default SVG height (default: 300)
  --padding [number]           Override the default padding used for scaling (default: 20)
  --points [number]            Specify the number of data points computed along the x-range (default: 10)
  --colors [color1,color2,...] Provide a custom comma-separated color palette (default: blue, green, red, orange, purple)
  --lineStyles [style1,style2,...] Provide a custom comma-separated list of line styles (e.g., dashed, dotted) for the plotted expressions. If omitted, lines will be solid.
  --lineWidth [number]         Provide a custom stroke width for plot lines (default: 2)
  --grid                     Enable drawing of gridlines in the plot (gridlines are dashed).
  --xlabel [text]              Provide a label for the x-axis.
  --ylabel [text]              Provide a label for the y-axis.
  --title [text]               Provide a title to be displayed at the top center of the plot.
  --logYAxis                 Enable logarithmic scaling for the y-axis. Note: All y values (or y-axis range) must be strictly positive.

### Multiple Expressions

You can plot more than one function on a single graph by providing multiple expressions as a comma-separated list to the --expression flag. Each expression will be plotted with a distinct color and, if specified, a distinct line style.

For example, to create an SVG plot with two functions (sine and cosine) using a custom color palette, line styles, gridlines, axis labels, a title, logarithmic y-axis scaling, and a custom line width, run:

> node src/lib/main.js --expression "y=sin(x),y=cos(x)" --range "x=0:9,y=-1:1" --colors "magenta,cyan" --lineStyles "dashed,dotted" --lineWidth 3.5 --grid --xlabel "Time (s)" --ylabel "Amplitude" --title "My Awesome Plot" --logYAxis

### Auto Y-Axis Range

If you omit the y-axis range in the --range parameter, such as:

> node src/lib/main.js --expression "y=sin(x)" --range "x=0:9" --file output.svg

The tool will automatically determine the y-axis range based on the evaluated data points, ensuring that your plot is scaled appropriately.

If the --file argument is omitted, the SVG content is directly output to the console.

## Limitations

When using the --logYAxis flag, ensure that all computed y values (or the values specified in the y-range) are strictly positive. The tool will refuse to generate a logarithmically scaled plot if any y value is zero or negative.

## License

MIT
