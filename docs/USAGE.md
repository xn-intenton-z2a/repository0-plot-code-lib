# Comprehensive Usage Guide for repository0-plot-code-lib

## Introduction

**repository0-plot-code-lib** is a versatile JavaScript library and CLI tool designed to transform mathematical expressions into time series data and generate visualizations. The tool supports a variety of expressions, enabling both data generation and visual plotting in multiple formats.

## Supported Mathematical Expressions

- **y=sin(x)**
- **y=cos(x)**
- **y=tan(x)**
- **y=log(x)**   (Note: Only computes log for x > 0; for x <= 0, returns 0)
- **y=exp(x)**
- **y=x^2**
- **y=sqrt(x)**  (Note: For x < 0, returns 0)
- **y=x^3**
- **y=customFunction(x)**  (Custom functions can be registered by the user.)

## Registering Custom Functions

Users can register custom functions to extend the available mathematical operations. This can be done via the CLI using the `--custom-functions` flag or within a YAML configuration file. The value should be a JSON string mapping the function name to its implementation as a string. For example:

### CLI Example

```
node src/lib/main.js --expression "y=double(x)" --range "x=0:10" --file output.csv --custom-functions '{"double": "(x)=>2*x"}'
```

### YAML Configuration Example

Create a YAML file (e.g., `custom_config.yaml`):

```yaml
# custom_config.yaml

title: Custom Plot from YAML
xlabel: YAML X
ylabel: YAML Y
marker-size: 7
marker-color: blue
width: 700
height: 700
custom-functions:
  double: "(x)=>2*x"
```

Then run:

```
node src/lib/main.js --config-yaml custom_config.yaml --expression "y=double(x)" --range "x=0:10" --file output.svg
```

When an expression such as `y=double(x)` is provided, the registered function `double` will be applied to each x value.

## CLI Overview

The CLI functionality is provided by the `src/lib/main.js` script. It accepts several command-line options:

- `--expression`: Specifies the mathematical expression.
- `--range`: Defines the data range in the format `x=start:end` (e.g., "x=0:6.28").
- `--file`: Specifies the output file name and type, determining the output mode:
  - If the file ends with **.csv**, the CLI outputs CSV content to stdout. In this case, the generation message is logged to stderr so that the CSV output remains clean.
  - If it ends with **.svg**, the CLI generates an enhanced SVG file containing axes, a polyline, and data markers.
  - If it ends with **.png**, the tool converts the generated SVG content to a PNG image using `sharp`.
- `--points`: (Optional) Specifies the number of data points to generate. Defaults to 10 if omitted.
- `--title`: (Optional) Specifies a custom plot title. If omitted, defaults to `Plot: <expression>`.
- `--xlabel` (or `--xLabel`): (Optional) Specifies a custom label for the X axis. Defaults to "X Axis" if not provided.
- `--ylabel` (or `--yLabel`): (Optional) Specifies a custom label for the Y axis. Defaults to "Y Axis" if not provided.
- `--marker-size`: (Optional) Specifies the size of the marker. Defaults to 3 if not provided.
- `--marker-color`: (Optional) Specifies the fill color for the marker. Defaults to "red" if not provided.
- `--marker-shape`: (Optional) Specifies the shape of the marker. Accepted value: "square". If set to "square", markers are rendered as squares; otherwise, they default to circles.
- `--bgColor`: (Optional) Specifies a background color for the plot. When provided, a background rectangle will cover the canvas in the SVG/PNG output.
- `--gridColor`: (Optional) Specifies a grid line color to overlay on the plot. Requires `--grid-dasharray` to specify the dash pattern.
- `--grid-dasharray`: (Optional) Specifies a custom dash pattern for the grid lines. Defaults to "4" if not provided.
- `--font-family`: (Optional) Specifies a custom font family for text elements in the plot (title, x-axis label, y-axis label). Defaults to "sans-serif" if not provided.
- `--width`: (Optional) Specifies the width (in pixels) of the output plot. Defaults to 500 if not provided.
- `--height`: (Optional) Specifies the height (in pixels) of the output plot. Defaults to 500 if not provided.

### YAML-Based Configuration

A new option `--config-yaml <filepath>` has been introduced. When provided, the CLI will load and parse the specified YAML file (using `js-yaml`) and merge its settings with the CLI options. **YAML configuration values override the corresponding CLI options.**

## Generation Message Behavior

When all required options (`--expression`, `--range`, and `--file`) are provided:

- For SVG or PNG outputs, the CLI logs the following message to stdout:

  `Generating plot for expression <expression> with range <range> to file <file>.`
  
- For CSV outputs, the CLI logs the generation message to stderr so that stdout contains only the CSV data starting with the header "x,y".

## Example Usages

#### 1. Generating CSV Output

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.csv
```

Expected Output:
- A generation message is logged to stderr.
- The terminal prints a CSV string beginning with a header `x,y` followed by data rows (default 10 or as specified by `--points`).

#### 2. Generating an Enhanced SVG Plot with Custom Functions

Command:
```
node src/lib/main.js --expression "y=double(x)" --range "x=0:10" --file output.svg --custom-functions '{"double": "(x)=>2*x"}'
```

Expected Output:
- A generation message is logged to stdout.
- An SVG file named `output.svg` is generated where each data point's y value is computed using the custom function `double(x)` (i.e., 2*x).

#### 3. Generating a PNG Image

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.png --width 800 --height 600
```

Expected Output:
- A generation message is logged to stdout:

  `Generating plot for expression y=sin(x) with range x=0:6.28 to file output.png.`
  
- The generated SVG is converted to a PNG image using `sharp` with dimensions 800x600 and saved as `output.png`.

#### 4. Specifying a Custom Point Count

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --points 15 --file output.csv
```

Expected Output:
- A generation message is logged to stderr.
- The CSV output contains a header and exactly 15 data rows.

#### 5. Using YAML Configuration to Override Options

Command:
```
node src/lib/main.js --config-yaml custom_config.yaml --expression "y=sin(x)" --range "x=-1:1" --file output.svg
```

Expected Output:
- The settings specified in `custom_config.yaml` (e.g., custom title, axis labels, marker options, dimensions, and custom functions) will override corresponding CLI options.

## Fallback Behavior

If required options are missing, the CLI outputs the provided options in JSON format. For example:

Command:
```
node src/lib/main.js --expression "y=sin(x)"
```

Might output:
```
{"expression":"y=sin(x)","range":undefined,"outputFile":undefined,"points":10}
```

## Conclusion

This guide details how to use **repository0-plot-code-lib** via its CLI to generate time series data and visual plots in CSV, SVG, or PNG formats. The advanced CLI options provide comprehensive customization, including the ability to register custom mathematical functions via CLI or YAML configuration, making the tool flexible and adaptable to various needs.
