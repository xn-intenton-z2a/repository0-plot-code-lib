# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## CLI Usage

Generate plots directly from the command line. The tool now supports scaling for both x and y ranges as well as custom SVG dimensions and padding.

Provide the range in the format:

  --range "x=start:end,y=min:max"

You can also customize the SVG output dimensions and padding using the following options:

  --width [number]    Override the default SVG width (default: 500)
  --height [number]   Override the default SVG height (default: 300)
  --padding [number]  Override the default padding used for scaling (default: 20)

For example, to create an SVG plot with dynamically scaled y coordinates and custom dimensions, run:

> node src/lib/main.js --expression "y=sin(x)" --range "x=-3:3,y=-1:1" --file output.svg

This command computes time series data based on the specified expression and both x and y ranges, renders an SVG plot featuring a polyline connecting the data points (with circles marking each point), and writes the resulting SVG to the specified file.

If the --file argument is omitted, the SVG content is directly output to the console.

## License

MIT

---
