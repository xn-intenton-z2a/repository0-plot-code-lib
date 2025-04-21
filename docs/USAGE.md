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

## CLI Overview

The CLI functionality is provided by the `src/lib/main.js` script. It accepts several command-line options:

- `--expression`: Specifies the mathematical expression or a piecewise expression prefixed with `piecewise:`.
- `--range`: Defines the data range in the format `x=start:end` (e.g., "x=0:6.28").
- `--file`: Specifies the output file name and type, determining the output mode:
  - If the file ends with **.csv**, the CLI outputs CSV content to stdout. In this case, the generation message is logged to stderr so that the CSV output remains clean.
  - If it ends with **.svg**, the CLI generates an enhanced SVG file containing axes, a polyline, and data markers.
  - If it ends with **.png**, the tool converts the generated SVG content to a PNG image using `sharp`.
  - If it ends with **.pdf**, the tool generates a PDF file using `pdfkit` and `svg-to-pdfkit`.
- `--points`: (Optional) Specifies the number of data points to generate. Defaults to 10 if omitted.
- `--title`: (Optional) Specifies a custom plot title. If omitted, defaults to `Plot: <expression>`.
- `--xlabel` (or `--xLabel`): (Optional) Specifies a custom label for the X axis. Defaults to "X Axis" if not provided.
- `--ylabel` (or `--yLabel`): (Optional) Specifies a custom label for the Y axis. Defaults to "Y Axis" if not provided.
- `--marker-size`: (Optional) Specifies the size of the marker. Defaults to 3 if not provided.
- `--marker-color`: (Optional) Specifies the fill color for the marker. Defaults to "red" if not provided.
- `--marker-shape`: (Optional) Specifies the shape of the marker. Accepted value: "square". If set to "square", markers are rendered as squares; otherwise, they default to circles.
- `--bgColor`: (Optional) Specifies a background color for the plot. When provided, a background rectangle will cover the canvas in the SVG/PNG/PDF output.
- `--gridColor`: (Optional) Specifies a grid line color to overlay on the plot. Requires `--grid-dasharray` to specify the dash pattern.
- `--grid-dasharray`: (Optional) Specifies a custom dash pattern for the grid lines. Defaults to "4" if not provided.
- `--font-family`: (Optional) Specifies a custom font family for text elements in the plot (title, x-axis label, y-axis label). Defaults to "sans-serif" if not provided.
- `--width`: (Optional) Specifies the width (in pixels) of the output plot. Defaults to 500 if not provided.
- `--height`: (Optional) Specifies the height (in pixels) of the output plot. Defaults to 500 if not provided.
- `--config-yaml <filepath>`: Specifies a YAML file containing configuration options. YAML config values override the corresponding CLI options.

## PDF Output Support

The library now supports generating PDF outputs. When the `--file` argument ends with `.pdf`, the tool uses `pdfkit` and `svg-to-pdfkit` to create a PDF document of the plot. The SVG plot is rendered onto a PDF document with the specified dimensions, and a success message is logged upon completion.

#### Example PDF Command:

```
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.pdf
```

In this example, the tool will generate a plot for `y=sin(x)` over the range `x=-1:1`, render the plot as an SVG, convert it to PDF using `pdfkit` and `svg-to-pdfkit`, and save it as `output.pdf`.

## Generation Message Behavior

When all required options (`--expression`, `--range`, and `--file`) are provided:

- For SVG, PNG, or PDF outputs, the CLI logs the following message to stdout:

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
node src/lib/main.js --expression "y=double(x)" --range "x=0:10" --file output.svg --custom-functions '{ "double": "(x)=>2*x" }'
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
- A generation message is logged to stdout.
- The generated SVG is converted to a PNG image using `sharp` with dimensions 800x600 and saved as `output.png`.

#### 4. Generating a PDF Document

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.pdf
```

Expected Output:
- A generation message is logged to stdout.
- The tool generates an SVG plot, converts it to a PDF using `pdfkit` and `svg-to-pdfkit`, and saves it as `output.pdf`.

#### 5. Specifying a Custom Point Count

Command:
```
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --points 15 --file output.csv
```

Expected Output:
- A generation message is logged to stderr.
- The CSV output contains a header and exactly 15 data rows.

#### 6. Using YAML Configuration to Override Options

Command:
```
node src/lib/main.js --config-yaml custom_config.yaml --expression "y=sin(x)" --range "x=-1:1" --file output.svg
```

Expected Output:
- The settings specified in `custom_config.yaml` (e.g., custom title, axis labels, marker options, dimensions, and custom functions) will override corresponding CLI options.

## Piecewise Expression Examples

Piecewise expressions allow you to define multiple conditions for plotting.

Example:
```
node src/lib/main.js --expression "piecewise: if x < 0 then sin(x); if x >= 0 then cos(x)" --range "x=-1:1" --file output.svg
```

For x values less than 0, the plot uses sin(x), and for x values greater than or equal to 0, it uses cos(x). If no condition matches, the y value defaults to 0.

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

This guide details how to use **repository0-plot-code-lib** via its CLI to generate time series data and visual plots in CSV, SVG, PNG, or PDF formats. The advanced CLI options provide comprehensive customization, including the ability to register custom mathematical functions as either native functions or strings, and now, piecewise expressions, making the tool flexible and adaptable to various needs.
