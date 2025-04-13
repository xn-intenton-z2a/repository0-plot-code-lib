# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## CLI Usage

Generate plots directly from the command line. The tool now supports scaling for both x and y ranges. Provide the range in the format:

  --range "x=start:end,y=min:max"

For example, to create a PNG plot with dynamically scaled y coordinates, run:

> node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.png

This command computes time series data based on the specified expression and both x and y ranges, renders an SVG plot with y-axis scaling (mapping yMin to the bottom and yMax to the top of the plot), converts it to PNG using sharp, and writes the resulting image to the specified file.

If the --file argument is omitted, the SVG content is directly output to the console.

## License

MIT

---
