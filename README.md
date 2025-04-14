# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## CLI Usage

Generate plots directly from the command line. The tool now supports scaling for both x and y ranges, multiple expressions, as well as custom SVG dimensions, padding, and configurable data point resolution.

Provide the range in the format:

  --range "x=start:end,y=min:max"

You can also customize the SVG output dimensions, padding, and number of data points using the following options:

  --width [number]    Override the default SVG width (default: 500)
  --height [number]   Override the default SVG height (default: 300)
  --padding [number]  Override the default padding used for scaling (default: 20)
  --points [number]   Specify the number of data points computed along the x-range (default: 10)

### Multiple Expressions

You can plot more than one function on a single graph by providing multiple expressions as a comma-separated list to the --expression flag. Each expression will be plotted with a distinct color.

For example, to create an SVG plot with two functions (sine and cosine), run:

> node src/lib/main.js --expression "y=sin(x),y=cos(x)" --range "x=0:9,y=-1:1" --file output.svg

If the --file argument is omitted, the SVG content is directly output to the console.

## License

MIT
