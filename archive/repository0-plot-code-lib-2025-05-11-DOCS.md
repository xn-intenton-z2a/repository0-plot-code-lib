USAGE.md
# USAGE.md
# Usage

Use the CLI tool to generate time series plot data:

```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=0:3.14" [--points 1000] [--format json|csv] [--output output.json]
```

## Flags

### --expression <expr>

Required. Defines the mathematical expression to evaluate.

Example:
```bash
--expression "y=cos(x)"
```

### --range <spec>

Required. Specifies axis ranges in the format `axis=min:max`. For multiple axes, separate with commas.

Example:
```bash
--range "x=0:3.14,y=-1:1"
```

### --points <number>

Optional. Number of data points to generate per axis. Must be a positive integer. Default: `1000`.

Example:
```bash
--points 500
```

### --format <type>

Optional. Output data format. Allowed values: `json`, `csv`. Default: `json`.

Example:
```bash
--format csv
```

### --output <path>

Optional. File path to write the structured output. If omitted, prints to stdout.

Example:
```bash
--output "data.json"
```

## Examples

Generate JSON data with default settings:
```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28"
```

Generate CSV data, 2000 points, and save to file:
```bash
node src/lib/main.js \
  --expression "y=tan(x)" \
  --range "x=-1:1" \
  --points 2000 \
  --format csv \
  --output "output.csv"
```

## Sample Outputs

### JSON

```bash
$ node src/lib/main.js --expression "y=x*2" --range "x=0:1" --points 3 --format json
```

```json
[
  {
    "x": 0,
    "y": 0
  },
  {
    "x": 0.5,
    "y": 1
  },
  {
    "x": 1,
    "y": 2
  }
]
```

### CSV

```bash
$ node src/lib/main.js --expression "y=x*2" --range "x=0:1" --points 3 --format csv
```

```
x,y
0,0
0.5,1
1,2
```

## Programmatic API

Beyond the CLI, you can also use the core functionality programmatically in your Node.js projects:

```js
import { generateSeries, serializeJson, serializeCsv } from "@xn-intenton-z2a/repository0-plot-code-lib";

// Generate a simple series
const series = generateSeries("y=x*2", { x: [0, 1] }, 3);

// Output as JSON
console.log(serializeJson(series));

// Output as CSV
console.log(serializeCsv(series));
```
