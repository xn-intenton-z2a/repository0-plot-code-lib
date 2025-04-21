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
- **y=sinh(x)**  (Hyperbolic sine function)
- **y=cosh(x)**  (Hyperbolic cosine function)
- **y=tanh(x)**  (Hyperbolic tangent function)
- **y=abs(x)**   (Computes the absolute value using Math.abs(x))
- **y=floor(x)** (Computes the greatest integer less than or equal to x using Math.floor(x))
- **y=ceil(x)**  (Computes the smallest integer greater than or equal to x using Math.ceil(x))
- **y=customFunction(x)**  (Custom functions can be registered by the user.)

### Piecewise Expressions

In addition to the standard expressions above, you can now define piecewise expressions using the following syntax:

```
piecewise: if <condition> then <expression>; if <condition> then <expression>; ...
```

For example:

```
piecewise: if x < 0 then sin(x); if x >= 0 then cos(x)
```

For each generated x value, the conditions are evaluated in order. The y value is determined by the expression associated with the first condition that is true. If none of the conditions are met, y defaults to 0.

Note: In piecewise expressions, common math functions such as sin, cos, tan, etc., are available and are automatically mapped to their corresponding JavaScript Math functions.

## Registering Custom Functions

Users can register custom functions to extend the available mathematical operations. Custom functions can now be provided either as native JavaScript function objects or as strings (evaluated using eval for backward compatibility).

### Using Custom Functions as Native Functions

You can provide a native function directly without resorting to eval. For example:

#### CLI Example

```
node src/lib/main.js --expression "y=double(x)" --range "x=0:10" --file output.csv --custom-functions '{ "double": "(x)=>2*x" }'
```

To use a native function, supply the function in your code as an object, for example when invoking the API:

```js
import { generateTimeSeriesData } from 'repository0-plot-code-lib';
const data = generateTimeSeriesData('y=double(x)', 'x=0:10', 11, { double: (x) => 2 * x });
```

#### YAML Configuration Example (String-based, remains supported)

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

### Using Custom Functions as Strings

For backward compatibility, you can still provide custom functions as strings:

```
node src/lib/main.js --expression "y=double(x)" --range "x=0:10" --file output.csv --custom-functions '{ "double": "(x)=>2*x" }'
```

## CLI Usage Examples

Below are some testable CLI usage examples that demonstrate how to use various options to customize your plot output:

### 1. Custom Marker Options

To generate an SVG with custom marker settings, run:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --marker-size 5 --marker-color green --marker-shape square
```

This command produces an SVG where square markers are rendered with a size of 10x10 (centered on the data point) and a fill color of green.

### 2. Background and Grid Customization

To include a background rectangle and custom grid lines in your plot, run:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --bgColor "#f0f0f0" --gridColor "#cccccc" --grid-dasharray "2,2"
```

This produces an SVG that includes a background filled with #f0f0f0 and grid lines styled with a stroke color of #cccccc and a dash pattern of "2,2".

### 3. Custom Titles and Axis Labels

Override the default plot title and axis labels by running:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --title "Custom Plot" --xlabel "X Axis" --ylabel "Y Axis"
```

The generated SVG will display "Custom Plot" as the title, "X Axis" as the X-axis label, and "Y Axis" as the Y-axis label.

### 4. Custom Dimensions

Specify custom dimensions for your plot output with the following command:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --width 800 --height 600
```

This ensures that the SVG has a width of 800 pixels and a height of 600 pixels.

### 5. YAML Configuration Overrides

You can use a YAML configuration file to override CLI options. For example, create a file named `config.yaml` with the following content:

```yaml
title: "Custom Plot from YAML"
xlabel: "YAML X"
ylabel: "YAML Y"
marker-size: 7
marker-color: blue
width: 700
height: 700
```

Then, run the command:

```sh
node src/lib/main.js --config-yaml config.yaml --expression "y=sin(x)" --range "x=-1:1" --file output.svg
```

The generated SVG will use the settings from the YAML file, overriding any conflicting CLI options.

## CLI Overview

The CLI functionality is provided by the `src/lib/main.js` script. It accepts several command-line options:

- `--expression`: Specifies the mathematical expression or a piecewise expression prefixed with `piecewise:`.
- `--range`: Defines the data range in the format `x=start:end` (e.g., "x=0:6.28").
- `--file`: Specifies the output file name and type. The file extension determines the output mode:
  - **.csv**: Outputs CSV data to stdout (with generation message to stderr).
  - **.svg**: Generates an SVG plot with axes, polyline, and markers.
  - **.png**: Converts the SVG to a PNG image using `sharp`.
  - **.pdf**: Generates a PDF file using `pdfkit` and `svg-to-pdfkit`.
- `--points`: (Optional) Number of data points (default is 10).
- `--title`: (Optional) Custom plot title. Defaults to `Plot: <expression>`.
- `--xlabel` or `--xLabel`: (Optional) Label for the X-axis. Defaults to "X Axis".
- `--ylabel` or `--yLabel`: (Optional) Label for the Y-axis. Defaults to "Y Axis".
- `--marker-size`: (Optional) Size of the marker (default is 3).
- `--marker-color`: (Optional) Color of the marker (default is "red").
- `--marker-shape`: (Optional) Shape of the marker. Set to "square" for square markers; otherwise, circles are used.
- `--bgColor`: (Optional) Background color for the plot.
- `--gridColor`: (Optional) Color for the grid lines; works with `--grid-dasharray` to style grid lines.
- `--grid-dasharray`: (Optional) Dash pattern for grid lines (default is "4").
- `--font-family`: (Optional) Font family for text elements (default is "sans-serif").
- `--width`: (Optional) Width of the output plot in pixels (default is 500).
- `--height`: (Optional) Height of the output plot in pixels (default is 500).
- `--config-yaml <filepath>`: Loads configuration options from a YAML file. Options in the YAML file override corresponding CLI options.

## PDF Output Support

When the output file ends with `.pdf`, the tool uses `pdfkit` and `svg-to-pdfkit` to create a PDF document from the generated SVG. The PDF will have the specified dimensions, and a success message is logged upon completion.

## Generation Message Behavior

Based on the output file type, the CLI displays a generation message:

- **CSV Output:** The generation message is logged to stderr, while stdout outputs only the CSV data.
- **SVG/PNG/PDF Output:** The generation message is logged to stdout, followed by the file generation confirmation.

## Conclusion

This guide provides detailed instructions on using **repository0-plot-code-lib**, including how to customize visual plots via various CLI options. Experiment with the examples above to generate CSV, SVG, PNG, or PDF outputs tailored to your requirements.
