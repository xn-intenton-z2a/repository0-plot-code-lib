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

You can now define piecewise expressions using the following syntax:

```
piecewise: if <condition> then <expression>; if <condition> then <expression>; ...
```

Example:

```
piecewise: if x < 0 then sin(x); if x >= 0 then cos(x)
```

For each generated x value, the conditions are evaluated in order. The y value is determined by the first condition that is true. If none match, y defaults to 0.

### Multi-Expression Overlay Plotting and Automatic Legend Generation

A recent enhancement allows you to overlay multiple expressions in a single plot and automatically generate a legend. To plot more than one expression, provide them separated by a semicolon in the `--expression` parameter. For example:

```
node src/lib/main.js --expression "y=sin(x); y=cos(x)" --range "x=-1:1" --file output.svg
```

When multiple expressions are provided, the tool generates a separate data series for each and overlays them on the same plot with distinct styles. It also appends an automatic legend in the top right corner of the SVG. Each legend item includes a marker (matching your specified style via `--marker-size`, `--marker-color`, and `--marker-shape`) and a label in the format "Series 1", "Series 2", etc.

#### Example with Legend

```sh
node src/lib/main.js --expression "y=sin(x); y=cos(x)" --range "x=-1:1" --file output.svg \
  --marker-size "3,4" --marker-color "red,blue" --marker-shape "circle,square"
```

The generated SVG will include a legend group (`<g class="legend">`) positioned in the top right corner, helping you easily identify each series.

## Registering Custom Functions

Users can register custom functions to extend mathematical operations. They can be provided as native JavaScript functions or as strings evaluated using eval for backward compatibility.

#### CLI Example

```
node src/lib/main.js --expression "y=double(x)" --range "x=0:10" --file output.csv --custom-functions '{ "double": "(x)=>2*x" }'
```

#### YAML Configuration Example

```yaml
title: Custom Plot from YAML
xlabel: YAML X
ylabel: YAML Y
marker-size: 7
marker-color: blue
width: 700
height: 700
custom-functions:
  double: "(x)=>2*x"
fillColor: "#ff00ff"
```

Then run:

```
node src/lib/main.js --config-yaml config.yaml --expression "y=double(x)" --range "x=0:10" --file output.svg
```

## Fill Under Curve Option

Use the `--fillColor` flag to fill the area under the curve in your plot. When provided, the generated SVG will include a `<polygon>` element that fills the area between the plot and the baseline.

#### CLI Example

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --fillColor "#ff0000"
```

## Other CLI Options

- **Custom Marker Options:**
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --marker-size 5 --marker-color green --marker-shape square
  ```

- **Background and Grid Customization:**
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --bgColor "#f0f0f0" --gridColor "#cccccc" --grid-dasharray "2,2"
  ```

- **Custom Titles and Axis Labels:**
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --title "Custom Plot" --xlabel "X Axis" --ylabel "Y Axis"
  ```

- **Custom Dimensions:**
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --width 800 --height 600
  ```

- **YAML Configuration Overrides:**
  Create a YAML file (e.g., `config.yaml`) with your settings, then run:
  ```sh
  node src/lib/main.js --config-yaml config.yaml --expression "y=sin(x); y=cos(x)" --range "x=-1:1" --file output.svg
  ```

## PDF Output Support

When the output file ends with `.pdf`, a PDF document is generated using `pdfkit` and `svg-to-pdfkit`.

## Generation Message Behavior

- **CSV Output:** Generation message is logged to stderr; stdout outputs only the CSV data.
- **SVG/PNG/PDF Output:** Generation message is logged to stdout followed by file generation confirmation.

## Conclusion

**repository0-plot-code-lib** not only allows you to generate plots from mathematical expressions but now also automatically generates a legend for multi-series overlay plots. This feature makes it easier to distinguish between multiple data series in a single plot. Experiment with these options to create clear and informative visualizations.
