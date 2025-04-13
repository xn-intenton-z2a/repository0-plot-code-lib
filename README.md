# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## CLI Usage

Generate plots directly from the command line. For example, to create a PNG plot output, run:

> node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.png

This command computes time series data based on the specified expression and range, renders an SVG plot, converts it to PNG using sharp, and writes the image to the specified file.

## License

MIT

---
