# Usage Guide for repository0-plot-code-lib

## Introduction

repository0-plot-code-lib is a CLI tool and library for generating plots from mathematical expressions and specified ranges. It supports both command line interactions and HTTP API access to generate plots dynamically. This version includes enhanced expression validation, dynamic axis labels for SVG plots, adaptive resolution, curve smoothing, detailed JSON export for plot data, environment variable interpolation for configuration files (with support for default fallback values), dynamic color gradient support for SVG outputs, custom SVG dimensions, optional marker support with accessibility improvements, and new SVG styling options for stroke width and dash patterns.

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

- **--width** and **--height**: Specify custom dimensions for the generated SVG plot. Both should be positive numbers. Defaults are 300 (width) and 150 (height).

- **--serve**: Runs the HTTP server mode with a `/plot` endpoint that supports content negotiation for `image/svg+xml`, `image/png`, and `application/json`.

- **--jsonExport**: When provided with the value `true` alongside `--expression` and `--range` (and optionally `--file`), the tool outputs a detailed JSON export of the plot data instead of an image. This JSON includes:
  - `expression`: The original mathematical expression.
  - `range`: The input range string.
  - `points`: An array of computed plot point objects (default 100 points, or as specified by the resolution parameter).
  - `computedXRange`: An object with keys `{ min, max }` reflecting the x-range limits from the input.
  - `computedYRange`: An object with keys `{ min, max }` representing the computed y-range based on evaluation.
  - `axisLabels`: Descriptive labels for the axes, e.g., "x-axis: 0 to 10".
  - `resolution`: The number of points computed.

- **--config**: Specifies a path to an external configuration file containing default parameters for generating plots. **Note:** Both JSON and YAML configuration files (with extensions .json, .yaml, or .yml) are supported. Environment variable placeholders (e.g., `${VAR}` or `${VAR:default}`) are supported, even in nested objects. CLI flags take precedence over configuration file values.

- **--env**: Specifies a custom path to a .env file. If provided, environment variables are loaded from the specified file instead of the default .env file.

- **--smooth**: Enable curve smoothing. When set to "true", the plot is rendered as a smooth curve using quadratic Bezier interpolation (using a `<path>` element instead of a `<polyline>`).

- **--smoothingFactor**: When smoothing is enabled, this floating-point number between 0 and 1 (default 0.5) fine-tunes the curve by adjusting the control points for quadratic Bezier interpolation.

- **--markerStart** and **--markerEnd**: When set to "true", these flags add arrowhead markers at the start and/or end of the plot curve. The SVG will include marker definitions and apply them to the curve via `marker-start` and/or `marker-end` attributes.

- **--svgRole**: Specifies a custom role (e.g., `img`) for the SVG root element to enhance accessibility.

- **--strokeWidth**: *New.* Specifies the width of the stroke for the plot curve. Must be a positive number. This applies to both smooth paths and polylines.

- **--strokeDashArray**: *New.* Specifies a dash pattern for the stroke (e.g., "5,5"). Must be a non-empty string. This defines the pattern of dashes and gaps in the stroke.

- **--colorGradient**, **--gradientStartColor**, and **--gradientEndColor**: Enable and configure a dynamic color gradient for the stroke of the plot. When `--colorGradient` is set to "true", the stroke uses a linear gradient defined by the start and end colors (default colors are blue and red respectively).

## Marker and Accessibility Enhancements

Optional enhancements:

- **Markers:** Use `--markerStart` and `--markerEnd` to add arrowheads. The SVG output will include `<marker>` definitions and apply them to the curve via `marker-start` and/or `marker-end` attributes.

- **Accessibility:** Use `--svgRole` to set a role attribute (e.g., `img`) on the SVG element, and customize ARIA labels with `--xlabelAriaLabel` and `--ylabelAriaLabel`.

## Dynamic Color Gradient Support

When `--colorGradient` is set to "true", the generated SVG includes a linear gradient for the stroke. You can further customize the gradient with `--gradientStartColor` and `--gradientEndColor`.

## Adaptive Resolution and Curve Smoothing

- **--resolution:** Specifies the number of points computed along the x-axis (default is 100).

- **--smooth:** When set to "true", renders the plot as a smooth curve using quadratic Bezier interpolation.

- **--smoothingFactor:** Adjusts the control points used in curve smoothing (accepts a value between 0 and 1, default 0.5).

## Nested Configuration Support

Configuration files can include nested objects. All environment variable placeholders in nested properties (e.g., `display.width`) are recursively interpolated. In case of invalid values for numeric fields in nested objects, error messages will include the full property path (for example, "display.width") to help you quickly identify and correct configuration issues.

## Examples

1. **Generate a Basic SVG Plot with Default Settings:**
   ```sh
   GET /plot?expression=y=sin(x)&range=x=-1:1,y=-1:1&fileType=svg
   ```

2. **Generate an SVG Plot with Custom Dimensions and 150 Points Resolution:**
   ```sh
   node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg --resolution 150 --width 500 --height 400
   ```

3. **Generate a Smooth SVG Plot with Custom Smoothing Factor:**
   ```sh
   GET /plot?expression=y=sin(x)&range=x=0:10,y=0:10&smooth=true&smoothingFactor=0.7&fileType=svg
   ```

4. **Detailed JSON Export with Custom Resolution:**
   ```sh
   GET /plot?expression=y=sin(x)&range=x=0:10,y=0:10&resolution=200&jsonExport=true
   ```

5. **Generate an SVG with a Dynamic Color Gradient:**
   ```sh
   GET /plot?expression=y=sin(x)&range=x=0:10,y=0:10&fileType=svg&colorGradient=true&gradientStartColor=green&gradientEndColor=yellow
   ```

6. **Generate an SVG with Markers and Custom Stroke Styles:**
   ```sh
   node src/lib/main.js --expression "y=sin(x)" --range "x=0:10,y=0:10" --file output.svg --markerStart true --markerEnd true --svgRole img --strokeWidth 2 --strokeDashArray "5,5"
   ```

7. **Using an External Configuration File with CLI Overrides:**
   ```sh
   node src/lib/main.js --config config.json --expression "y=sin(x)" --file output.svg --width 600 --height 400 --ylabel "CLI_YAxis"
   ```

**Note:** YAML configuration files (with .yaml or .yml extensions) are fully supported. Simply provide the path to a YAML file using the `--config` flag.
