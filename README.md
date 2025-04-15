# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Overview

`plot-code-lib` is a JavaScript library and CLI tool designed to transform mathematical expressions and time series data into visual plots (SVG/PNG). It enables users to generate plots directly from the command-line using a simple syntax. Additionally, the library simulates the process of transforming a mathematical expression and a specified range into time series data, which is then used to generate plots in the desired format.

## CLI Usage

To generate a plot using `plot-code-lib`, run the following command:

```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg
```

Options:
- `--expression`: The mathematical expression to be plotted.
- `--range`: The range values for the plot (e.g., x and y boundaries).
- `--file`: The output file name where the plot will be saved (supports SVG/PNG).

When all options are provided, the CLI will simulate plot generation by printing a message detailing the input. For example, executing the command above would output:

```
Generating plot for expression 'y=sin(x)' with range 'x=-1:1,y=-1:1' and output file 'output.svg'
```

If any of the required options are missing, the CLI will display a usage message:

```
Usage: node src/lib/main.js --expression <expression> --range <range> --file <file>
```

## Detailed CLI Usage Examples

### Example 1: Complete Options

Command:

```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file plot.svg
```

Expected Output:

```
Generating plot for expression 'y=sin(x)' with range 'x=-1:1,y=-1:1' and output file 'plot.svg'
```

### Example 2: Incomplete Options

Command:

```bash
node src/lib/main.js --expression "y=sin(x)"
```

Expected Output:

```
Usage: node src/lib/main.js --expression <expression> --range <range> --file <file>
```

### Dry-Run Mode

If you run the CLI without any arguments, it will perform a dry-run and display the list of arguments received, for example:

```bash
node src/lib/main.js
```

Expected Output:

```
Run with: []
```

## How It Works

1. The CLI parses the command-line arguments to extract options such as `--expression`, `--range`, and `--file`.
2. If all required options are provided, the tool simulates transforming the mathematical expression and range into time series data (this simulation is indicated by the generated log message) and then produces a plot output in the specified format.
3. If any options are missing, it informs the user of the correct usage.

This streamlined process allows users to quickly generate visualizations of mathematical expressions from the command-line.

## License

MIT

---
