# Usage

This tool generates plots based on mathematical expressions over a numeric range.

## Flags

--help: Show this help message and usage examples.

--version: Show the installed CLI version.

--mission: Show the project mission statement.

--serve <port>: Start an HTTP server exposing the `/plot` endpoint.

## CLI Examples

Generate an SVG plot:
```sh
repository0-plot-code-lib --expression "y=sin(x)+0.5*x" --range "x=0:10" --format svg --output plot.svg
```

Generate a PNG plot:
```sh
repository0-plot-code-lib --expression "y=x" --range "x=0:5" --format png --output plot.png
```

Plot original and derivative curves (SVG):
```sh
repository0-plot-code-lib --expression "y=x^2" --range "x=0:5" --format svg --output plot.svg --derivative true
```

Compute regression stats only:
```sh
repository0-plot-code-lib --expression "y=2*x+1" --range "x=0:2" --trendline-stats true
```

Overlay trendline on plot:
```sh
repository0-plot-code-lib --expression "y=x" --range "x=0:5" --format svg --output plot.svg --overlay-trendline true
```

Show version:
```sh
repository0-plot-code-lib --version
```

Show mission:
```sh
repository0-plot-code-lib --mission
```

Use `--help` to display this message and examples.

## Programmatic API

The library provides a programmatic interface for generating plots in memory without performing file I/O. It exports an asynchronous function `generatePlot(options)`:

```js
import { generatePlot } from '@xn-intenton-z2a/repository0-plot-code-lib';

(async () => {
  const result = await generatePlot({
    expression: 'y=sin(x)',
    range: 'x=0:6.28',
    format: 'svg',
    // optional: width, height, samples, xLog, yLog, grid, title, xLabel, yLabel, palette, colors, derivative,
    // trendlineStats, overlayTrendline
    trendlineStats: true,
    overlayTrendline: true
  });
  console.log(result.type); // 'svg'
  console.log(result.data); // '<svg ...'
  console.log(result.stats); // { slope: ..., intercept: ..., r2: ... }
})();
```

For PNG output, specify `format: 'png'` and the returned data will be a `Buffer` containing PNG image bytes.

## HTTP Server Mode

Use the `--serve <port>` flag to start an HTTP server exposing a `/plot` endpoint:

```sh
repository0-plot-code-lib --serve 3000
```

Request plots via `curl`:

```sh
curl "http://localhost:3000/plot?expression=y=sin(x)&range=x=0:6.28&format=svg"
curl "http://localhost:3000/plot?expression=y=x&range=x=0:5&format=png" --output plot.png
```

## Plot Styling

Enhance your plots with advanced styling options:

--width <number>        SVG width in px (default 500)
--height <number>       SVG height in px (default 500)
--title <string>        Centered plot title
--x-label <string>      X-axis label
--y-label <string>      Y-axis label
--grid <true|false>     Draw dashed gridlines
--palette <name>        Predefined palettes: default, pastel, dark, highContrast
--colors <list>         Comma-separated CSS colors overriding palette

### Plot Styling Example
```sh
repository0-plot-code-lib --expression "y=x" --range "x=0:1" --format svg --output plot.svg \
  --width 600 --height 400 --title "My Plot" \
  --x-label "Time" --y-label "Value" --grid true \
  --palette pastel --colors "red,green"
```

Sample SVG snippet:
```xml
<svg width="600" height="400" ...>
  <line ... stroke-dasharray="4,2" />
  <text x="300" y="20" text-anchor="middle">My Plot</text>
  <polyline ... stroke="red" points="..." />
  <text x="300" y="395" text-anchor="middle">Time</text>
  <text x="15" y="200" transform="rotate(-90,15,200)" text-anchor="middle">Value</text>
</svg>
```

## Automated Examples

Use the `examples` subcommand to generate Markdown-formatted usage examples and outputs for core features:

```sh
repository0-plot-code-lib examples
```

This command prints a series of code blocks with representative CLI commands and their resulting SVG outputs, which can be embedded directly in documentation.

## Export Data

Allow export of the generated or imported raw data without interrupting plot output:

--export-data <path>      Path to write raw data (csv, json, yaml inferred by extension)
--export-format <fmt>     Explicit format when extension is missing or ambiguous (csv, json, yaml)

### Examples
```sh
repository0-plot-code-lib --expression "y=x" --range "x=0:5" --export-data data.csv
repository0-plot-code-lib --expression "y=x" --range "x=0:5" --export-data output --export-format json
```

#### Sample CSV
```
x,y
0,0
1,1
...
5,5
```

#### Sample JSON
```
[
  {"x":0,"y":0},
  {"x":1,"y":1},
  ...
]
```

#### Sample YAML
```
- x: 0
  y: 0
- x: 1
  y: 1
...
```