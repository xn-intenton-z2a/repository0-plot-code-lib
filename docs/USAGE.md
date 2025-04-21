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

When multiple expressions are provided, the tool generates a separate data series for each and overlays them on the same plot with distinct styles. It also appends an automatic legend in the plot. With the latest update, legend options can also be customized even for a single data series if desired.

#### Legend Customization Options

The legend can be fully customized using the following options via CLI or YAML configuration:

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

If both options are enabled, both axes will be transformed logarithmically.

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

To specify a gradient fill, provide a comma-separated list of color values (e.g. "#ff0000,#0000ff"). In this case, the tool generates a `<defs>` section with a `<linearGradient>` element that includes `<stop>` elements at evenly distributed offsets across the gradient. The `<polygon>` element will then reference the gradient via the `fill` attribute in the format `fill="url(#gradient_fill_0)"` (or similar unique ID for each series).

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

You can customize the appearance of data point markers using the following options:

- **--marker-size**: Sets the size of the marker. For circle markers, this determines the radius. For square markers, this is half the side length. For triangle markers, the side length will be twice the marker size.
- **--marker-color**: Specifies the fill color of the marker.
- **--marker-shape**: Specifies the shape of the marker. Supported values are:
  - `circle` (default)
  - `square`
  - `triangle`
  - `star`  *(new feature)*

#### Star Marker Details

When `--marker-shape star` is specified, each data point is rendered as a five-pointed star using an SVG `<polygon>` element. The star is centered at the data point, with its outer radius determined by twice the marker size, and an inner radius at half that value. 

#### Example (CLI):

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg \
  --marker-shape star --marker-size 5 --marker-color purple
```

#### Example (YAML):

```yaml
marker-shape: star
marker-size: 5
marker-color: purple
```

### Background and Grid Customization

Customize the plot's background and grid lines using the following options:

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

**repository0-plot-code-lib** not only allows you to generate plots from mathematical expressions but now also supports exporting the underlying data as JSON. Experiment with these options to create clear, informative, and versatile visualizations.
