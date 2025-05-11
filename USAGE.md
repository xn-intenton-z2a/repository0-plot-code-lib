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
