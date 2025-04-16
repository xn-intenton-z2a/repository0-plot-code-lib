# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Overview

`plot-code-lib` is a JavaScript library and CLI tool designed to transform mathematical expressions and time series data into visual plots (SVG/PNG) or serialized JSON data. It enables users to generate plots directly from the command-line using a simple syntax. Additionally, the library can evaluate a mathematical expression over a specified range and output a time series as a JSON array.

## CLI Usage

### Plot Generation

To generate a plot using `plot-code-lib`, run the following command. When the `--file` option is provided, the tool will generate an actual plot file with dummy content based on the file extension:

For SVG:

```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg
```

For PNG:

```bash
node src/lib/main.js --expression "Math.cos(x)" --range "x=0:3.14" --file output.png
```

Options:
- `--expression`: The mathematical expression to be plotted. (You can prefix with "y=" if desired)
- `--range`: The range values for the plot in the format `x=min:max` (e.g., x=-1:1, x=0:6.28)
- `--file`: The output file name where the plot will be saved (supports SVG/PNG). When provided, a file is actually generated with dummy content.

### Time Series JSON Data Generation

If you want to generate time series data from an expression and range, simply omit the `--file` option:

```bash
node src/lib/main.js --expression "Math.sin(x)" --range "x=0:6.28"
```

This will output a JSON array representing the time series data. Each element of the array is an object with numeric `x` and `y` properties. For example:

```json
[
  { "x": 0, "y": 0 },
  { "x": 0.063, "y": 0.063 },
  ..., 
  { "x": 6.28, "y": -0.001 }
]
```

#### Custom Sample Count

A new `--samples` flag has been added to allow you to customize the number of sample points in the time series data generation. By default, 100 sample points are generated. You can override this by specifying a valid integer greater than 1. For example, to generate 50 sample points:

```bash
node src/lib/main.js --expression "Math.sin(x)" --range "x=0:6.28" --samples 50
```

If an invalid value is provided for `--samples`, the default of 100 sample points will be used.

### Handling Non-Numeric Results in Time Series Generation

When evaluating a mathematical expression over a specified range, any computed result that is not a valid number (i.e., NaN) or does not yield a numeric value is automatically replaced with `null`. This substitution is intentional:

- JSON does not support the NaN value, so substituting with `null` ensures that the output is valid JSON.
- This behavior applies whether the result is from an invalid computation (like `Math.sqrt(-1)`) or any other non-numeric evaluation.

For example:

```bash
node src/lib/main.js --expression "Math.sqrt(-1)" --range "x=0:10"
```

Resulting JSON output:

```json
[
  { "x": 0, "y": null },
  { "x": 0.101, "y": null },
  ...
]
```

### Handling Invalid Numeric Inputs

If you provide non-numeric values in the range option or if the mathematical expression evaluates to a non-numeric result, the tool will output an error message. For example:

```bash
node src/lib/main.js --expression "Math.sin(x)" --range "x=a:b"
```

Expected Output:

```
Error: Range bounds must be numeric.
```

### Incomplete Options

If any of the required options are missing (and no time series generation is possible), the CLI will display an error message:

```
Error: Missing required options. Usage: node src/lib/main.js --expression <expression> --range <range> --file <file>
```

### Maintenance Issues Handling

In compliance with the repository guidelines, new maintenance issues cannot be submitted when there are already open maintenance issues. If you attempt to submit a new maintenance issue via the CLI using the `--maintenance` flag, the tool will output the following error message:

```
Error: Maximum Open Maintenance Issues Reached. Please resolve the existing issues before submitting new maintenance issues.
```

#### Dry-Run Mode

Running the CLI without any arguments shows the received arguments:

```bash
node src/lib/main.js
```

Expected Output:

```
Run with: []
```

## How It Works

1. The CLI parses command-line arguments to extract options such as `--expression`, `--range`, and optionally `--file`, `--samples`, or `--maintenance`.
2. If `--expression` and `--range` are provided along with `--file`, the tool generates an actual file with dummy plot content based on the file extension. For SVG files, a minimal SVG is generated; for PNG files, a dummy text placeholder is written.
3. If the `--expression` and `--range` options are provided without `--file`, the tool evaluates the mathematical expression over the given range (expecting the range format `x=min:max`), generates a specified number of equally spaced sample points (default is 100, or the value provided by `--samples`), and outputs the resulting time series data as a JSON array. Any computed result that is not a valid number (or non-numeric) is intentionally replaced with `null` to remain compliant with JSON standards.
4. If the `--maintenance` flag is provided, the CLI will output an error message indicating that no new maintenance issues can be submitted until existing ones are resolved.
5. If any required options for plot generation or time series creation are missing, the CLI informs the user about the correct usage.

## License

MIT

---

## Note on Issue Handling

Due to repository guidelines and the current limit of open maintenance issues, no new maintenance issues will be accepted until the existing issues are resolved. This is enforced via the CLI when the `--maintenance` flag is used.
