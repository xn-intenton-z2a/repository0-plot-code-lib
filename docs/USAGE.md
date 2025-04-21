# Comprehensive Usage Guide for repository0-plot-code-lib

## Introduction

**repository0-plot-code-lib** is a versatile JavaScript library and CLI tool designed to transform mathematical expressions into time series data and generate visualizations. The tool supports a variety of expressions and formats, making it easy to produce CSV, SVG, PNG, PDF, or JSON outputs.

## Repository Mission

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

This tool aims to facilitate the creation of plots from mathematical expressions. It transforms expressions into time series data and can output plots in multiple file formats.

## Quick Start

Generate an example plot with default parameters:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.svg
```

This command generates an SVG file containing a sine curve.

## CLI Usage and Examples

### Generating Different Output Formats

- **CSV Output:**

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.csv --points 10
  ```

  This outputs a CSV file with header "x,y" and ten data rows representing the sine curve.

- **PDF Output:**

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.pdf
  ```

  Generates a PDF file with the plotted sine curve.

- **SVG Output:**

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg
  ```

  Produces an SVG file that includes axes, grid lines, and data points marking the sine curve.

### Theme Functionality

The CLI supports a new `--theme` option to easily apply predetermined visual styles to your plot. The available themes are:

- **dark:** Applies a dark background along with light-colored markers and grid lines.
- **light:** Applies a light background with dark-colored markers and grid lines.
- **blue:** Applies a blue-themed aesthetic with the following settings:
  - **Background Color:** `#003366`
  - **Marker Color:** `#FFD700`
  - **Grid Line Color:** `#99CCFF`
  - **Font Family:** `Courier New`

**Example:**

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --theme blue
```

This command generates an SVG using the blue theme settings.

### Diagnostic Mode

Use the `--diagnostics` flag to output a JSON report containing merged CLI and YAML configuration options and environment details (current working directory, Node.js version, platform), instead of generating a plot.

**Example:**

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.svg --diagnostics
```

This outputs a JSON report for debugging configuration settings.

### Advanced Customizations

Additional CLI options allow you to customize various aspects of your plot:

- **Custom Points Count:** Adjust the data points using `--points`.
- **Marker Customization:** Define marker size (`--marker-size`), color (`--marker-color`), and shape (`--marker-shape`).
- **Logarithmic Scaling:** Enable log scale with `--logScaleX` and `--logScaleY`.
- **YAML Configuration:** Override CLI options with YAML by using the `--config-yaml` flag.

## API and Source Function Usage

### generateTimeSeriesData

Generates an array of data points for a given mathematical expression and range.

**Example:**

```js
import { generateTimeSeriesData } from 'repository0-plot-code-lib';

const data = generateTimeSeriesData('y=sin(x)', 'x=0:6.28', 10);
console.log(data);
```

### serializeTimeSeries

Serializes an array of data points into a CSV string.

**Example:**

```js
import { serializeTimeSeries } from 'repository0-plot-code-lib';

const data = [
  { x: 0, y: 0 },
  { x: 1, y: 0.8415 },
  { x: 2, y: 0.9093 }
];

const csv = serializeTimeSeries(data);
console.log(csv);
```

## Conclusion

**repository0-plot-code-lib** is your go-to tool for generating beautiful plots from mathematical expressions. With extensive CLI options, theme support, and diagnostic features, you can easily integrate it into your workflow to produce customizable visualizations.

Happy Plotting!
