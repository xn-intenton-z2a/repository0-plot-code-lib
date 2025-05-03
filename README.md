# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Overview

repository0-plot-code-lib is a JavaScript library and CLI tool that transforms simple mathematical expressions with defined ranges into visual plots. It supports generating a text preview of computed points or saving plots as SVG or PNG images with customizable dimensions.

## Features

- Generate plots for mathematical functions (currently supports "y=sin(x)" and "y=cos(x)").
- Dual output modes: display a text preview or generate plot files (SVG/PNG).
- Custom dimension support (width and height) for output files.
- Robust CLI argument validation using Zod with interactive error guidance.

## Usage

For detailed usage instructions, refer to the [Usage Documentation](./docs/USAGE.md).

Basic command example:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300]

## License

MIT
