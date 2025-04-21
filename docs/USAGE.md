DOCS_FILE_START
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

When multiple expressions are provided, the tool generates a separate data series for each and overlays them on the same plot with distinct styles. It also appends an automatic legend in the plot. Legend options can be customized even for a single data series if desired.

#### Legend Customization Options

- **--legend-position**: Position of the legend. Acceptable values: `top-right` (default), `top-left`, `bottom-right`, `bottom-left`.
- **--legend-font**: Font family for legend text.
- **--legend-font-size**: Font size for legend labels.
- **--legend-background**: Background color for the legend group.
- **--legend-title**: An optional title for the legend.

Example with legend customization:

```sh
node src/lib/main.js --expression "y=sin(x); y=cos(x)" --range "x=-1:1" --file output.svg \
  --legend-position "top-left" --legend-font "Arial" --legend-font-size 14 \
  --legend-background "#f0f0f0" --legend-title "Data Series Legend"
```

### Interactive Tooltip Support

A new feature has been added to include interactive tooltips in the SVG output. When the CLI flag **--tooltip** is provided, each data point marker in the SVG will include a `<title>` element that shows the x and y values for that point. These tooltips will appear when you hover over the markers in an SVG viewer.

Example:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --tooltip
```

The tooltip text is in the format: `x: <value>, y: <value>`.

### Logarithmic Scale Support for Plot Axes

This release introduces support for logarithmic scaling on the x and/or y axes. When enabled, the corresponding axis will transform the values logarithmically (base 10) before plotting. Note that all data values on an axis using logarithmic scaling must be positive.

#### CLI Options

- **--logScaleX**: When set to "true", the x-axis will use logarithmic scaling. Example:

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=1:100" --file output.svg --logScaleX true
  ```

- **--logScaleY**: When set to "true", the y-axis will use logarithmic scaling. Example:

  ```sh
  node src/lib/main.js --expression "y=exp(x)" --range "x=1:3" --file output.svg --logScaleY true
  ```

You can enable both axes by providing both options.

### Registering Custom Functions

Users can register custom functions to extend mathematical operations. They can be provided as native JavaScript functions or as strings evaluated using eval for backward compatibility.

#### CLI Example

```sh
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
legend-position: "top-right"
legend-font: "Verdana"
legend-font-size: 16
legend-background: "#123456"
legend-title: "YAML Legend"
```

Then run:

```sh
node src/lib/main.js --config-yaml config.yaml --expression "y=double(x)" --range "x=0:10" --file output.svg
```

### Fill Under Curve Option

Use the `--fillColor` flag to fill the area under the curve in your plot. When a single solid color is provided, the generated SVG will include a `<polygon>` element with that fill color. 

To specify a gradient fill, provide a comma-separated list of color values (e.g. "#ff0000,#0000ff"). In this case, the tool generates a `<defs>` section with a `<linearGradient>` element that includes `<stop>` elements, and the `<polygon>` will reference the gradient.

#### CLI Examples

- **Solid Fill**:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --fillColor "#ff0000"
```

- **Gradient Fill**:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --fillColor "#ff0000,#0000ff"
```

### Custom Marker Options

Customize the appearance of data point markers using the following options:

- **--marker-size**: Sets the size of the marker. For circle markers, this determines the radius. For square markers, this is half the side length. For triangle markers, the side length will be twice the marker size.
- **--marker-color**: Specifies the fill color of the marker.
- **--marker-shape**: Specifies the shape of the marker. Supported values are:
  - `circle` (default)
  - `square`
  - `triangle`
  - `star`
  - `diamond`  *(new feature: rendered as a four-point polygon with vertices computed based on the marker size)*

#### Diamond Marker Details

When using `--marker-shape diamond`, each data point is rendered as a diamond shape. The diamond is constructed as a polygon with four vertices calculated as follows:

- Top vertex: (x, y - r)
- Right vertex: (x + r, y)
- Bottom vertex: (x, y + r)
- Left vertex: (x - r, y)

where r is the marker size.

Example (CLI):

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg \
  --marker-shape diamond --marker-size 5 --marker-color orange
```

Example (YAML):

```yaml
marker-shape: diamond
marker-size: 5
marker-color: orange
```

### Background and Grid Customization

Customize the plot's background and grid lines:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg \
  --bgColor "#f0f0f0" --gridColor "#cccccc" --grid-dasharray "2,2"
```

### Custom Titles and Axis Labels

Set custom titles and axis labels with:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg \
  --title "Custom Plot" --xlabel "X Axis" --ylabel "Y Axis"
```

### Custom Dimensions

Specify custom dimensions for the output file:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg \
  --width 800 --height 600
```

### YAML Configuration Overrides

Create a YAML file (e.g., `config.yaml`) with your settings, then run:

```sh
node src/lib/main.js --config-yaml config.yaml --expression "y=sin(x); y=cos(x)" --range "x=-1:1" --file output.svg
```

### PDF Output Support

When the output file ends with `.pdf`, a PDF document is generated using `pdfkit` and `svg-to-pdfkit`.

### Generation Message Behavior

- **CSV Output:** Generation message is logged to stderr; stdout outputs only the CSV data.
- **SVG/PNG/PDF/JSON Output:** Generation message is logged to stdout followed by file generation confirmation.

## Conclusion

**repository0-plot-code-lib** enables you to generate plots from mathematical expressions, with options for customization such as tooltips, multi-series overlays, logarithmic scales, and more. Experiment with these options to create clear, informative, and versatile visualizations.

DOCS_FILE_END
