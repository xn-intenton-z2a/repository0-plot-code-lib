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

- **SVG/PNG Output:**

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg
  ```

  Produces an SVG file that includes axes, grid lines, and data points marking the sine curve.

### Range Format and Variable Flexibility

The CLI now supports arbitrary independent variable names in the range specification. The format should be provided as:

```sh
<variable>=start:end
```

For example, to generate data with the variable t:

```sh
node src/lib/main.js --expression "y=cos(t)" --range "t=-1:1" --file output.svg
```

This command generates data by applying the cosine function on t ranging from -1 to 1.

### Theme Functionality

The CLI supports theme customization via two options:

- **--theme**: Applies one of the built-in themes (dark, light, blue).

- **--theme-config <file>**: Provides a path to an external JSON configuration file that defines custom theme settings. The JSON file can include properties such as:

```json
{
  "bgColor": "#customBgColor",
  "markerColor": ["#customMarker"],
  "gridColor": "#customGridColor",
  "fontFamily": "CustomFont"
}
```

When both options are provided, the settings from the JSON configuration take precedence over the built-in theme. 

**Example using custom theme config:**

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --theme blue --theme-config customTheme.json
```

This command generates an SVG file using the custom theme settings defined in customTheme.json.

### Diagnostic Mode

Use the **--diagnostics** flag to output a JSON report containing merged CLI and YAML configuration options and environment details (current working directory, Node.js version, platform), instead of generating a plot.

**Example:**

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.svg --diagnostics
```

This outputs a JSON report for debugging configuration settings.

### Verbose Progress Indicator

A new flag, **--verbose-progress**, has been added to provide real-time feedback during long-running operations. When enabled, the CLI will output progress messages at key stages:

- **Starting generation of time series data...**: Indicates the beginning of data generation.
- **Generating SVG content...**: Shown before creating the SVG representation of the plot.
- **Writing output file...**: Displayed just before the file is written to disk.

**Example:**

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --verbose-progress
```

This command will generate an SVG file while displaying progress messages on the console.

### Advanced Customizations

Additional CLI options allow you to customize various aspects of your plot:

- **Custom Points Count:** Adjust the data points using **--points**.
- **Marker Customization:** Define marker size (**--marker-size**), color (**--marker-color**), and shape (**--marker-shape**).
- **Logarithmic Scaling:** Enable log scale with **--logScaleX** and **--logScaleY**.
- **YAML Configuration:** Override CLI options with YAML by using the **--config-yaml** flag.

## API and Source Function Usage

### generateTimeSeriesData

Generates an array of data points for a given mathematical expression and range. The function now supports arbitrary variable identifiers. 

**Example:**

```js
import { generateTimeSeriesData } from 'repository0-plot-code-lib';

// Using default variable x
const dataX = generateTimeSeriesData('y=sin(x)', 'x=0:6.28', 10);
console.log(dataX);

// Using a different variable, e.g., t, with cosine
const dataT = generateTimeSeriesData('y=cos(t)', 't=-1:1', 10);
console.log(dataT);
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

**repository0-plot-code-lib** is your go-to tool for generating beautiful plots from mathematical expressions. With extensive CLI options, theme support (including custom theme configuration via external JSON), diagnostic features, and now a verbose progress indicator to keep you informed during processing, you can easily integrate it into your workflow to produce customizable visualizations.

Happy Plotting!
