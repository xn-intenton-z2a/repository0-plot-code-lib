# Usage

This tool generates plots based on mathematical expressions over a numeric range.

## Flags

--help: Show this help message and usage examples.

--version: Show the installed CLI version.

--mission: Show the project mission statement.

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
    // optional: width, height, samples, xLog, yLog, grid, title, xLabel, yLabel
    derivative: true,
  });
  console.log(result.type); // 'svg'
  console.log(result.data); // '<svg ...'
})();
```

For PNG output, specify `format: 'png'` and the returned data will be a `Buffer` containing PNG image bytes.

## HTTP Server Mode

Use the `--serve <port>` flag to start an HTTP server exposing a `/plot` endpoint.

```sh
repository0-plot-code-lib --serve 3000
```

Request plots via `curl`:

```sh
curl "http://localhost:3000/plot?expression=y=sin(x)&range=x=0:6.28&format=svg"
curl "http://localhost:3000/plot?expression=y=x&range=x=0:5&format=png" --output plot.png
```

## Discovery Flags

--help: Print the contents of `USAGE.md` to stdout and exit with code 0.
```sh
repository0-plot-code-lib --help
```

--version: Print the version string from `package.json` to stdout and exit with code 0.
```sh
repository0-plot-code-lib --version
```

--mission: Print the contents of `MISSION.md` to stdout and exit with code 0.
```sh
repository0-plot-code-lib --mission
```