# repository0-plot-code-lib

_"Be a go-to plot library with a CLI – the jq of formula visualizations."_

---

## Overview

`plot-code-lib` is a modern JavaScript library and CLI tool that transforms mathematical expressions into visual plots (SVG/PNG) and generates time series data. With a simple command-line interface, you can easily produce plots or JSON arrays of computed values over a specified range.

## CLI Usage

### Plot Generation

To generate a plot, provide the options `--expression`, `--range`, and `--file`. The file extension determines the output format:

For SVG:
```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg
```

For PNG:
```bash
node src/lib/main.js --expression "Math.cos(x)" --range "x=0:3.14" --file output.png
```

Options:
- `--expression`: The mathematical expression to plot (optionally prefixed with "y=").
- `--range`: The range in the format `x=min:max` (e.g., `x=-1:1`, `x=0:6.28`).
- `--file`: The output filename for the plot (supports SVG and PNG formats).

### Time Series JSON Data Generation

Omit the `--file` option to output JSON time series data from the provided expression and range:
```bash
node src/lib/main.js --expression "Math.sin(x)" --range "x=0:6.28"
```
This prints a JSON array with objects containing `x` and `y` values. If the evaluated expression does not return a valid number, it is replaced with `null` to ensure valid JSON output.

#### Custom Sample Count

Use the `--samples` flag to specify the number of sample points (default is 100). For example, to generate 50 samples:
```bash
node src/lib/main.js --expression "Math.sin(x)" --range "x=0:6.28" --samples 50
```
If an invalid sample count is provided, the tool defaults to generating 100 samples.

### Maintenance Issues Handling

In accordance with repository guidelines, the CLI prevents the submission of new maintenance issues if there are unresolved ones. When the `--maintenance` flag is used, it outputs an error:
```bash
node src/lib/main.js --maintenance
```
Output:
```
Error: Maximum Open Maintenance Issues Reached. Please resolve the existing issues before submitting new maintenance issues.
```

### Incomplete Options

If not all required options for plot generation or time series creation are provided, the CLI displays a detailed error message guiding you to provide the missing parameters. For example:
```
Error: Missing required options. Provide --expression and --range to generate time series data, or include --file to generate a plot file. Example: node src/lib/main.js --expression 'y=sin(x)' --range 'x=-1:1' --file output.svg
```
This guidance helps you troubleshoot and correct the command usage.

#### Dry-Run Mode

Running the CLI without arguments will display the received arguments, which can be useful for debugging:
```bash
node src/lib/main.js
```
Output:
```
Run with: []
```

## How It Works

1. The CLI parses command-line arguments to extract options.
2. Providing `--file` triggers plot generation with dummy content (SVG or PNG based on the file extension).
3. Without `--file`, the tool evaluates the mathematical expression over the specified range and outputs a JSON array representing the time series data.
4. The `--samples` flag allows customization of the number of sample points, and if the expression does not return a valid number, the corresponding value is replaced with `null` to ensure the output adheres to JSON standards.
5. The `--maintenance` flag enforces maintenance guidelines by preventing new issues when unresolved ones exist.

## License

MIT
