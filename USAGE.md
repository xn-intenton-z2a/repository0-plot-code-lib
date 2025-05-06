# Usage

## CLI Examples

### No arguments (placeholder behavior)

```bash
repository0-plot-code-lib
```
Outputs:
```
Run with: []
```

### Display help

```bash
repository0-plot-code-lib --help
```
Outputs the CLI usage information with available options.

### Generate time series data to stdout (JSON)

```bash
repository0-plot-code-lib --expression "x^2" --range "x=0:2:1"
```

Outputs:
```json
[
  { "x": 0, "y": 0 },
  { "x": 1, "y": 1 },
  { "x": 2, "y": 4 }
]
```

### Generate time series data as JSON stream (json-stream)

```bash
repository0-plot-code-lib --expression "x+1" --range "x=0:2:1" --format json-stream
```

Outputs:
```
[{"x":0,"y":1},{"x":1,"y":2},{"x":2,"y":3}]
```

### Generate time series data as NDJSON to stdout

```bash
repository0-plot-code-lib --expression "x+1" --range "x=0:2:1" --format ndjson
```

Outputs:
```
{"x":0,"y":1}
{"x":1,"y":2}
{"x":2,"y":3}
```

### Generate time series data as CSV to stdout

```bash
repository0-plot-code-lib --expression "x" --range "x=0:2:1" --format csv
```

Outputs:
```
0,0
1,1
2,2
```

### Generate time series data as CSV with header row

```bash
repository0-plot-code-lib --expression "x" --range "x=0:2:1" --format csv --csv-header
```

Outputs:
```
x,y
0,0
1,1
2,2
```

### Write CSV output to a file

```bash
repository0-plot-code-lib \
  --expression "x^2" \
  --range "x=0:10:1" \
  --format csv --csv-header --output data.csv
```

### Plot rendering (SVG/PNG)

Generate an SVG file:
```bash
repository0-plot-code-lib \
  --expression "x^2" \
  --range "x=0:10:1" \
  --plot-format svg --output plot.svg
```
This writes an SVG file starting with `<svg` to `plot.svg`.

Generate a PNG file:
```bash
repository0-plot-code-lib \
  --expression "sin(x)" \
  --range "x=0:6.28:0.1" \
  --plot-format png > plot.png
```
This writes binary PNG data (starting with the PNG magic number) to stdout.

## Options

- `--expression <string>` (required): Mathematical expression to evaluate (single variable).
- `--range <var=start:end:step>` (required): Numeric range for the variable.
- `--output <path>`: Path to write output (defaults to stdout).
- `--format <json|json-stream|ndjson|csv>`: Output as pretty JSON array, streaming JSON array, NDJSON stream, or CSV (default: json).
- `--buffer-size <number>`: Buffer size (highWaterMark) for streaming output (default: 16384).
- `--csv-header`: Include header row in CSV output (default: false).
- `--plot-format <svg|png>`: Plot output format (svg or png).
- `--width <number>`: Plot width in pixels (default: 800).
- `--height <number>`: Plot height in pixels (default: 600).
- `--label-x <string>`: Label for the x axis.
- `--label-y <string>`: Label for the y axis.
- `--help`: Show this help message.

## Programmatic Usage

You can also use the library directly in your own Node.js project:

```js
import {
  parseExpression,
  parseRange,
  generateTimeSeries,
  renderPlot,
  serializeDataStream,
  main as cliMain,
} from '@xn-intenton-z2a/repository0-plot-code-lib';

// 1. Parse a mathematical expression into an AST
const exprAst = parseExpression('x^3 + 2');

// 2. Parse a range string into numeric parameters
const { variableName, start, end, step } = parseRange('x=0:10:2');

// 3. Generate the time series data
const data = generateTimeSeries(exprAst, variableName, start, end, step);
console.log('Time series data:', data);

// 4. Serialize data as a JSON stream
(async () => {
  const stream = serializeDataStream(data, { format: 'json-stream', bufferSize: 1024, csvHeader: false });
  for await (const chunk of stream) {
    process.stdout.write(chunk);
  }
})();

// 5. Serialize data as CSV with header
(async () => {
  const stream = serializeDataStream(data, { format: 'csv', bufferSize: 1024, csvHeader: true });
  for await (const chunk of stream) {
    process.stdout.write(chunk);
  }
})();

// 6. Run the CLI programmatically
(async () => {
  const exitCode = await cliMain(['--expression', 'x+1', '--range', 'x=0:5:1', '--plot-format', 'svg']);
  console.log(`CLI exited with code ${exitCode}`);
})();

## Next Steps

- Additional performance and format options for large data streaming.
