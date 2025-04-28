# Usage Guide for repository0-plot-code-lib

## Introduction

repository0-plot-code-lib is a CLI tool and library for generating plots from mathematical expressions and specified ranges. It supports both command line interactions and HTTP API access to generate plots dynamically. This version includes enhanced expression validation, dynamic axis labels for SVG plots, adaptive resolution, curve smoothing, detailed JSON export for plot data, environment variable interpolation for configuration files, dynamic color gradient support for SVG outputs, and custom SVG dimensions.

## CLI Plot Generation

You can generate plots directly from the command line by providing the following flags:

- **--help**: Displays this help message with usage information, flag details, and examples.
- **--version**: Displays the current version (read from package.json) and exits immediately without processing any other flags. Note that if --version is provided alongside other flags, it takes precedence.
- **--verbose**: Enables verbose mode, which outputs additional debugging information.
- **--expression**: The mathematical expression to plot (e.g., "y=sin(x)"). **Note:** The expression must include the variable 'x'.
- **--range**: The range for plotting (e.g., "x=-1:1,y=-1:1"). 
  - Must follow the pattern: `x=<min>:<max>,y=<min>:<max>` with numeric values. Extra whitespace is allowed.
  - **Numeric Order Enforcement:** The lower bound must be less than the upper bound for both x and y ranges.
  - **Enhanced Error Feedback:** 
    - If the range format is malformed (e.g., missing delimiters, non-numeric inputs, or extra whitespace), you will receive an error message such as:
      > Error: --range flag value is malformed. Expected format: x=<min>:<max>,y=<min>:<max> with numeric values.
    - If the numeric order is invalid (e.g., x min is not less than x max), the error message will be like:
      > Error: Invalid range for x (provided: x=5:1). Expected format: x=0:10. Ensure that the minimum value is less than the maximum value.

- **--file**: The output file path. The file extension determines the output type:
  - **.svg**: Generates an SVG plot with annotations and a plot element representing the curve. The curve is rendered as a blue polyline or a smooth path when smoothing is enabled. With dynamic color gradient enabled, the stroke will reference a defined gradient. **New Feature:** The generated SVG includes a `data-metadata` attribute on its root element. This attribute contains a JSON string with detailed plot metadata such as the original expression, input range, computed x and y ranges, axis labels, resolution, and any custom parameters provided. This metadata allows downstream tools to easily extract plot details for further processing.
  - **.png**: Generates a PNG plot using dummy placeholder image data.

- **--width** and **--height**: *(New)* Specify custom dimensions for the generated SVG plot. Both should be positive numbers. If omitted or invalid, the defaults of 300 (width) and 150 (height) are used.

- **--serve**: Runs the HTTP server mode with a `/plot` endpoint that supports content negotiation for `image/svg+xml`, `image/png`, and `application/json`.

- **--jsonExport**: When provided with the value `true` alongside `--expression` and `--range` (and optionally `--file`), the tool outputs a detailed JSON export of the plot data instead of an image. This JSON includes:
  - `expression`: The original mathematical expression.
  - `range`: The input range string.
  - `points`: An array of computed plot point objects (default 100 points, or as specified by the resolution parameter).
  - `computedXRange`: An object with keys `{ min, max }` reflecting the x-range limits from the input.
  - `computedYRange`: An object with keys `{ min, max }` representing the computed y-range based on evaluation.
  - `axisLabels`: Descriptive labels for the axes, e.g., "x-axis: 0 to 10".

- **--config**: **(New)** Specifies a path to an external JSON configuration file. The file should contain default configuration values for the plot (e.g., default resolution, smoothing, axis label customizations, and dimensions). When provided, the application reads this file, performs environment variable interpolation on all string properties (e.g., replacing placeholders like `${TEST_RES}` with the corresponding environment variable values), validates its structure using a predefined Zod schema, and merges its values with the CLI flags, with CLI flags taking precedence.

- **--env**: **(New)** Specifies a custom path to a .env file. If provided, the application loads environment variables from the specified file instead of the default .env in the project root.

- **--smooth**: Enable curve smoothing. When this flag is set to "true", the plot will be rendered as a smooth curve using quadratic Bezier interpolation. When smoothing is enabled, the generated SVG output uses a `<path>` element instead of a `<polyline>`.

- **--smoothingFactor**: *New.* Optional floating-point number between 0 and 1 (default is 0.5). When used with the `--smooth` flag, it adjusts the tension of the quadratic Bezier interpolation by modifying the control points, allowing fine-tuning of the curve’s smoothness.

## Dynamic Color Gradient Support

A new feature has been added to enhance SVG plot aesthetics. When the flag **--colorGradient** is set to "true", the generated SVG includes a dynamic linear gradient applied to the stroke of the plot element. You can also specify:

- **--gradientStartColor**: The color for the start of the gradient (defaults to blue if not provided).
- **--gradientEndColor**: The color for the end of the gradient (defaults to red if not provided).

When enabled, the SVG output will have a `<defs>` section containing a `<linearGradient>` element with two `<stop>` elements: one at 0% and one at 100%. The plot's stroke is then set to `url(#dynamicGradient)`, applying the defined gradient.

## Adaptive Resolution and Curve Smoothing

This release introduces two new optional parameters to enhance plot rendering:

- **--resolution / resolution query parameter**: Specifies the number of points to compute along the x-axis. By default, 100 points are used. Supplying a different positive integer (e.g., `--resolution 200`) will compute that number of points, thereby adapting the resolution of the plot. This affects both the JSON export and the rendered SVG or PNG output.

- **--smooth / smooth query parameter**: Enabling this flag (`--smooth true`) activates curve smoothing using quadratic Bezier interpolation. When smoothing is enabled, the generated SVG output uses a `<path>` element instead of a `<polyline>`.

- **--smoothingFactor**: *New.* This parameter allows additional customization of the smooth curve. It accepts a floating-point number between 0 and 1 (default 0.5) to fine-tune the curvature by adjusting the control points used in quadratic Bezier interpolation.

## CONFIG MANAGEMENT

The tool supports external configuration files via the `--config` flag. This file must be a well-formed JSON file containing default parameters for generating plots. The expected JSON format is:

```json
{
  "expression": "y=sin(x)",
  "range": "x=-1:1,y=-1:1",
  "resolution": 100,
  "xlabel": "x-axis label",
  "ylabel": "y-axis label",
  "xlabelPrecision": 2,
  "ylabelPrecision": 2,
  "smooth": "true",
  "smoothingFactor": 0.5,
  "width": 300,
  "height": 150,
  "colorGradient": "true",
  "gradientStartColor": "blue",
  "gradientEndColor": "red"
}
```

Environment variable interpolation is performed on all string values. For example, if your config file contains:

```json
{
  "resolution": "${TEST_RES}"
}
```

and you have set the environment variable `TEST_RES=150` (e.g. via a custom .env file specified by `--env`), then the placeholder will be replaced with the value "150".

When both a configuration file and CLI flags are provided, the CLI flags take precedence over the configuration file values.

### Example Configuration File

```json
{
  "resolution": "${TEST_RES}",
  "xlabel": "Default X Label",
  "ylabel": "Default Y Label"
}
```

### Common Error Scenarios

- **Malformed JSON**: If the configuration file is not valid JSON, an error will be thrown:
  > Error: Unable to read or parse configuration file: [specific error message]

- **Invalid Numeric Values**: If numeric configuration items (e.g., `resolution`) are provided with non-numeric values, an error message will indicate the invalid parameter, such as:
  > Error: Invalid numeric value for resolution. Expected a positive integer.

### Usage with Configuration File

```sh
node src/lib/main.js --config config.json --expression "y=sin(x)" --file output.svg --width 600 --height 400
```

## Runtime Configuration Reloading

When running in server mode (using the `--serve` flag) with a configuration file provided via `--config`, the application supports runtime reloading of its configuration. To trigger a reload, send a SIGHUP signal to the server process (for example, using `kill -SIGHUP <pid>`). The configuration file will be re-read and merged with any CLI flags, ensuring that CLI overrides remain in effect. Any errors during reload will be logged to the console.

## Examples

1. **Dynamic SVG Generation with Default Axis Labels and Dimensions:**
   ```sh
   GET /plot?expression=y=sin(x)&range=x=-1:1,y=-1:1&fileType=svg
   ```

2. **Generate an SVG Plot with Custom Dimensions and Adaptive Resolution (e.g., 150 points):**
   ```sh
   node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg --resolution 150 --width 500 --height 400
   ```

3. **Generate a Smooth SVG Plot with Curve Smoothing Enabled and Custom Smoothing Factor:**
   ```sh
   GET /plot?expression=y=sin(x)&range=x=0:10,y=0:10&smooth=true&smoothingFactor=0.7&fileType=svg
   ```

4. **Detailed JSON Export with Custom Resolution:**
   ```sh
   GET /plot?expression=y=sin(x)&range=x=0:10,y=0:10&resolution=200&jsonExport=true
   ```

5. **Generate an SVG with Dynamic Color Gradient:**
   ```sh
   GET /plot?expression=y=sin(x)&range=x=0:10,y=0:10&fileType=svg&colorGradient=true&gradientStartColor=green&gradientEndColor=yellow
   ```

6. **Using an External Configuration File with Environment Variable Interpolation and Custom Dimensions:**
   ```sh
   node src/lib/main.js --config config.json --expression "y=sin(x)" --file output.svg --width 600 --height 400
   ```
