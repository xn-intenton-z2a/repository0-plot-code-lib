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
  ...
  { "x": 6.28, "y": -0.001 }
]
```

### Incomplete Options

If any of the required options are missing (and no time series generation is possible), the CLI will display an error message:

```
Error: Missing required options. Usage: node src/lib/main.js --expression <expression> --range <range> --file <file>
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

1. The CLI parses command-line arguments to extract options such as `--expression`, `--range`, and optionally `--file`.
2. If `--expression` and `--range` are provided along with `--file`, the tool simulates plot generation by printing a message with the input details.
3. If `--expression` and `--range` are provided without `--file`, the tool evaluates the mathematical expression over the given range (expecting the range format `x=min:max`), generates 100 equally spaced sample points, and outputs the resulting time series data as a JSON array.
4. If any options are missing, the CLI informs the user about the correct usage.

## License

MIT

---

## Note on Issue Handling

Please note: Issues or prompts that consist solely of non-actionable tokens are not intended to trigger changes in the code. Additionally, the repository currently has the maximum number of open maintenance issues. Please resolve or close existing non-essential issues before submitting new ones.
