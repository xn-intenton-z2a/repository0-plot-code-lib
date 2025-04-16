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
- `--file`: The output filename for the plot. Note: Only `.svg` and `.png` file formats are supported. If an unsupported format is provided (e.g., `output.txt`), the CLI will output an error message: "Error: Unsupported file format. Supported formats are .svg and .png." 

### Time Series JSON Data Generation

Omit the `--file` option to output JSON time series data from the provided expression and range:
```bash
node src/lib/main.js --expression "Math.sin(x)" --range "x=0:6.28"
```
This prints a JSON array with objects containing `x` and `y` values.

**Note on Non-finite Values:**
If the evaluated mathematical expression produces a non-finite result (such as NaN or Infinity), the tool intentionally replaces the result with `null` to ensure the output is valid JSON. For example, if an invalid or non-finite computation is performed, the corresponding `y` value in the output will be `null`.

#### Under the Hood
The time series generation logic has been refactored for better readability and maintainability. Dedicated helper functions now handle parsing the `--range` option and evaluating the mathematical expression before generating the sample points.

#### Example: NaN Handling

For instance, the command:
```bash
node src/lib/main.js --expression "0/0" --range "x=0:10"
```
will produce an output similar to:
```json
[
  { "x": 0, "y": null },
  { "x": 1, "y": null },
  ...
]
```
(Each sample point's `y` value will be `null` because the expression evaluates to a non-finite value.)

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
3. Without `--file`, the tool uses refactored helper functions to parse the range and evaluate the mathematical expression, then generates a JSON array representing the time series data. Non-finite results are replaced with `null` to maintain valid JSON output.
4. The `--samples` flag allows customization of the number of sample points, and defaults to 100 if an invalid value is provided.
5. The `--maintenance` flag enforces maintenance guidelines by preventing new issues when unresolved ones exist.

## License

MIT
