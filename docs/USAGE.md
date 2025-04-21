# Comprehensive Usage Guide for repository0-plot-code-lib

## Introduction

**repository0-plot-code-lib** is a versatile JavaScript library and CLI tool designed to transform mathematical expressions into time series data and generate visualizations. The tool supports a variety of expressions, enabling data generation and visual plotting in multiple formats, including CSV, SVG, PNG, PDF, and JSON.

## CLI Usage and Examples

The CLI allows you to generate plots using a range of parameters. Here are some examples:

- **Generate an SVG Plot:**

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg
  # Expected output: An SVG file with a sine curve, axes, and labels.
  ```

- **Generate a PNG Plot:**

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.png
  # Expected output: A PNG image generated using sharp.
  ```

- **Generate a CSV Data File:**

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.csv
  # Expected output: CSV content printed to stdout containing time series data.
  ```

- **Generate a PDF Plot:**

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.pdf
  # Expected output: A PDF document with the plot generated via pdfkit.
  ```

- **Generate a JSON Data File:**

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.json
  # Expected output: A JSON file containing the generated data points.
  ```

### Diagnostics Mode

A new diagnostics mode is available to output a comprehensive JSON report of the effective CLI options and environment details without generating any plot files. This is especially useful for debugging and validating configuration settings.

- **Usage Example:**

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=6.28" --file output.svg --diagnostics
  ```

  **Expected Output:**

  A JSON object printed to stdout containing:
  - `mergedOptions`: The effective CLI options after merging any YAML configurations and command-line arguments.
  - `envDetails`: Environment details including the current working directory, Node.js version, and platform.

### Additional CLI Options

Customize your plot with additional options:

- **Custom Points Count:** Use `--points` to specify the number of data points.

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --points 20 --file output.csv
  ```

- **Marker Customization:** Adjust marker size, color, and shape with `--marker-size`, `--marker-color`, and `--marker-shape`.

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg \
    --marker-size 5 --marker-color green --marker-shape diamond
  ```

- **Logarithmic Scaling:** Enable logarithmic scaling on axes with `--logScaleX` and/or `--logScaleY`.

  ```sh
  node src/lib/main.js --expression "y=exp(x)" --range "x=1:10" --file output.svg \
    --logScaleX true --logScaleY true
  ```

- **Interactive Tooltips:** Include tooltips that display the x and y values by adding the `--tooltip` flag.

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --tooltip
  ```

- **Custom Plot Themes:**

  Use the new `--theme` option to apply a predefined visual style to your plot. Available themes are:

  - `dark`: Applies a dark background with contrasting light-colored markers and grid lines.
  - `light`: Applies a light background with dark-colored markers and grid lines.
  - `blue`: Applies a blue-themed aesthetic with the following settings:
    - **Background Color:** `#003366`
    - **Marker Color:** `#FFD700`
    - **Grid Color:** `#99CCFF`
    - **Font Family:** `Courier New`

  **Examples:**

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --theme blue
  ```

- **YAML Configuration Overrides:** Provide a YAML configuration file to override CLI options.

  ```yaml
  # config.yaml
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

  Run the CLI with the YAML config:

  ```sh
  node src/lib/main.js --config-yaml config.yaml --expression "y=double(x)" --range "x=0:10" --file output.svg
  ```

## API and Source Function Usage

The library exports two key functions which can also be used programmatically:

### generateTimeSeriesData

Generates an array of data points for a given mathematical expression and range.

**Example:**

```js
import { generateTimeSeriesData } from 'repository0-plot-code-lib';

const data = generateTimeSeriesData('y=sin(x)', 'x=0:6.28', 10);
console.log(data);
// Output: [{ x: 0, y: 0 }, { x: 0.698, y: 0.642 }, ...]
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
// Output:
// x,y
// 0,0
// 1,0.8415
// 2,0.9093
```

## Configuration Details

The CLI accepts configuration via both command line flags and YAML configuration files. When a YAML config is provided (using `--config-yaml`), its settings override the corresponding CLI options. This allows for reproducible plots and easier management of complex configurations.

## Troubleshooting and Best Practices

- **File Paths:** Ensure that the file path provided to `--file` is writable and correctly specified.
- **Marker Customization:** If markers do not appear as expected, verify that the marker options (size, shape, color) are provided in a comma-separated format if multiple series are plotted.
- **Log Scale Configuration:** When enabling logarithmic scaling, make sure that all data points are positive, as log scaling does not support zero or negative values.
- **YAML Overrides:** When using a YAML file, ensure the file is properly formatted. Invalid YAML can cause the CLI to exit with an error.
- **Theme Options:** Use the `--theme` option to quickly apply a consistent visual style to your plot. In addition to the existing dark and light themes, the new blue theme applies a blue background (`#003366`), golden markers (`#FFD700`), light blue grid lines (`#99CCFF`), and uses the `Courier New` font.
- **Diagnostics Mode:** Use the `--diagnostics` flag to output a JSON report of the effective configuration and environment details instead of generating plots. This is useful for debugging and verifying your CLI options.
- **Testing:** Refer to the unit tests for examples of how each functionality is expected to work. Running `npm test` provides immediate feedback on any discrepancies.

## Conclusion

**repository0-plot-code-lib** offers a flexible and powerful interface for generating plots from mathematical expressions. Whether you use it via the CLI or import its functions directly into your code, the library supports extensive customization options – from marker styles to logarithmic axes and customizable themes – ensuring that you can tailor the visualizations to your exact requirements.

Happy Plotting!
