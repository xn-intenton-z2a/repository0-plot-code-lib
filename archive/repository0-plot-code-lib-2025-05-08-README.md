# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

A JavaScript library and command-line tool for generating time series data from mathematical expressions and rendering SVG or PNG plots.

## Installation

Install globally to use the CLI:

```
npm install -g @xn-intenton-z2a/repository0-plot-code-lib
```

Or install locally in your project:

```
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## CLI Usage

Generate JSON time series data:

```
repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.283 --points 50
```

Render plots as SVG or PNG:

```
repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.28 --format svg --output plot.svg
repository0-plot-code-lib --expression "y=cos(x)" --range 0:6.28 --format png --output plot.png
```

Display help or default invocation:

```
repository0-plot-code-lib --help
repository0-plot-code-lib
```

This prints usage information and exits with code 0.

## JavaScript API

Import and use in your code:

```js
import { renderPlot } from "@xn-intenton-z2a/repository0-plot-code-lib";
const data = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 4 },
];
// Generate an SVG string for the plot:
const svg = renderPlot(data, { width: 800, height: 600, margin: 40 });
console.log(svg);
```

## Examples

Generate data and render in one command:

```
# JSON output
repository0-plot-code-lib --expression "y=x^2" --range -5:5 --points 100

# SVG plot
repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.28 --format svg --output sin.svg

# PNG plot
repository0-plot-code-lib --expression "y=tan(x)" --range -1.5:1.5 --format png --output tan.png
```

## Dependencies

- mathjs for safe expression parsing and evaluation.
- sharp for converting SVG to PNG.

## License

MIT
