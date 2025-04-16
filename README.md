# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Overview

`plot-code-lib` is a JavaScript library and CLI tool designed to transform mathematical expressions and time series data into visual plots (SVG/PNG) or serialized JSON data. It enables users to generate plots directly from the command-line using a simple syntax. Additionally, the library can evaluate a mathematical expression over a specified range and output a time series as a JSON array.

## CLI Usage

### Plot Generation

To generate a plot using `plot-code-lib`, run the following command (note: file output is simulated):

```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg
```

Options:
- `--expression`: The mathematical expression to be plotted. (You can prefix with "y=" if desired)
- `--range`: The range values for the plot in the format `x=min:max` (e.g., x=-1:1, x=0:6.28)
- `--file`: The output file name where the plot will be saved (supports SVG/PNG). When provided, a plot generation message is displayed.

Expected Output for Plot Generation:

```
Generating plot for expression 'y=sin(x)' with range 'x=-1:1' and output file 'output.svg'
```

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

### Handling NaN in Time Series Generation

When evaluating a mathematical expression over a specified range, any computed result that is not a valid number (i.e., NaN) is replaced with `null`. This design decision is made to ensure compatibility with JSON standards, as JSON does not support NaN values. By substituting NaN with null, the output remains valid JSON and provides a consistent format for further processing.

### Handling Invalid Numeric Inputs

If you provide non-numeric values in the range option or if the mathematical expression evaluates to `NaN` for given inputs, the tool will output an error message. In particular:

- For a range with non-numeric bounds (e.g., `--range "x=a:b"`), the following error is displayed:

```
Error: Range bounds must be numeric.
```

- Similarly, if the expression evaluation results in `NaN` for any sample point, that particular `y` value is set to `null` in the generated JSON time series.

Example of invalid numeric input scenario:

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

Note: This error indicates that there are currently 5 open maintenance issues in the repository. Please address these open issues before submitting a new maintenance issue.

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

1. The CLI parses command-line arguments to extract options such as `--expression`, `--range`, and optionally `--file` or `--maintenance`.
2. If `--expression` and `--range` are provided along with `--file`, the tool simulates plot generation by printing a message with the input details.
3. If `--expression` and `--range` are provided without `--file`, the tool evaluates the mathematical expression over the given range (expecting the range format `x=min:max`), generates 100 equally spaced sample points, and outputs the resulting time series data as a JSON array. During this process, any mathematical result that is not a valid number (NaN) is automatically replaced with `null` to ensure compatibility with JSON standards and consistent output.
4. If the `--maintenance` flag is provided, the CLI will output an error message indicating that no new maintenance issues can be submitted until existing ones are resolved.
5. If any required options for plot generation or time series creation are missing, the CLI informs the user about the correct usage.

## License

MIT

---

## Note on Issue Handling

Due to repository guidelines and the current limit of open maintenance issues, no new maintenance issues will be accepted until the existing issues are resolved. This is enforced via the CLI when the `--maintenance` flag is used.
