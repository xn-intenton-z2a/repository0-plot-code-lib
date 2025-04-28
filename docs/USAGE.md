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
  - **.svg**: Generates an SVG plot with annotations and a plot element representing the curve. The curve is rendered as a blue polyline or a smooth path when smoothing is enabled. With dynamic color gradient enabled, the stroke will reference a defined gradient.
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

- **--config**: **(New)** Specifies a path to an external JSON configuration file. The file should contain default configuration values for the plot (e.g., default resolution, smoothing, axis label customizations, and dimensions). When provided, the application reads this file, performs environment variable interpolation on all string properties (e.g., replacing placeholders like `${PORT}` with the corresponding environment variable values), validates its structure using a predefined Zod schema, and merges its values with the CLI flags, with CLI flags taking precedence.

- **--env**: **(New)** Specifies a custom path to a .env file. If provided, the application loads environment variables from the specified file instead of the default .env in the project root. For example:

  ```sh
  node src/lib/main.js --env ./config/.env --serve
  ```

## Dynamic Color Gradient Support

A new feature has been added to enhance SVG plot aesthetics. When the flag **--colorGradient** is set to "true", the generated SVG includes a dynamic linear gradient applied to the stroke of the plot element. You can also specify:

- **--gradientStartColor**: The color for the start of the gradient (defaults to blue if not provided).
- **--gradientEndColor**: The color for the end of the gradient (defaults to red if not provided).

When enabled, the SVG output will have a `<defs>` section containing a `<linearGradient>` element with two `<stop>` elements: one at 0% and one at 100%. The plot's stroke is then set to `url(#dynamicGradient)`, applying the defined gradient.

## Adaptive Resolution and Curve Smoothing

This release introduces two new optional parameters to enhance plot rendering:

- **--resolution / resolution query parameter**: Specifies the number of points to compute along the x-axis. By default, 100 points are used. Supplying a different positive integer (e.g., `--resolution 200`) will compute that number of points, thereby adapting the resolution of the plot. This affects both the JSON export and the rendered SVG or PNG output.

- **--smooth / smooth query parameter**: Enabling this flag (`--smooth true`) activates curve smoothing using a cubic interpolation algorithm. When smoothing is enabled, the generated SVG output uses a `<path>` element with quadratic Bezier commands to create a smoother curve, instead of a raw `<polyline>`.

## Examples

1. **Dynamic SVG Generation with Default Axis Labels and Dimensions:**
   ```sh
   GET /plot?expression=y=sin(x)&range=x=-1:1,y=-1:1&fileType=svg
   ```

2. **Generate an SVG Plot with Custom Dimensions and Adaptive Resolution (e.g., 150 points):**
   ```sh
   node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg --resolution 150 --width 500 --height 400
   ```

3. **Generate a Smooth SVG Plot with Curve Smoothing Enabled:**
   ```sh
   GET /plot?expression=y=sin(x)&range=x=0:10,y=0:10&smooth=true&fileType=svg
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

## Environment Variables and DOTENV Support

The application automatically loads environment variables from a `.env` file in the project root using the [dotenv](https://www.npmjs.com/package/dotenv) package. With the new **--env** flag, you can now specify a custom .env file path. This allows you to configure settings like the server port without modifying the source code.

## Enhanced Expression Validation

The tool now validates mathematical expressions before evaluation to catch common errors such as:

- **Missing Operators:** e.g., "y=2 3+x" triggers an error recommending the use of an operator.
- **Unbalanced Parentheses:** e.g., "y=(x+2" will indicate mismatched parentheses.

## HTTP API: Dynamic Plot Generation and Aggregated Error Reporting

The `/plot` endpoint supports dynamic plot generation using URL query parameters. It performs the following validations:

- Ensures that **expression** and **range** are provided and non-empty.
- Validates that **range** follows the required format with correct numeric order.
- Checks for either the `fileType` (or `format`) parameter or, when detailed data is needed, the `jsonExport=true` flag.

### Supported Output Formats

- **image/svg+xml**: Returns an SVG plot with dynamic axis labels and ARIA accessibility attributes. When the smooth or colorGradient parameter is enabled, the output will adjust accordingly.
- **image/png**: Returns a PNG image with placeholder content.
- **application/json**: Returns a minimal JSON response with basic plot details (unless the detailed export is requested).

### Detailed JSON Export

When the query parameter `jsonExport=true` is provided (or the CLI flag `--jsonExport true` is used), the endpoint and CLI output a detailed JSON object containing:

- `expression`: The mathematical expression provided by the user.
- `range`: The input range string.
- `points`: An array of computed plot point objects with numeric `x` and `y` values (the number of points is determined by the resolution parameter).
- `computedXRange`: An object with keys `{ min, max }` reflecting the x-range limits from the input.
- `computedYRange`: An object with keys `{ min, max }` representing the computed y-range based on evaluation.
- `axisLabels`: Descriptive labels for the axes, e.g., "x-axis: 0 to 10".

## Customization Options for SVG Output

Advanced query parameters allow customization of the generated SVG plots, including:

- **Custom Axis Labels:** Set via `xlabel` and `ylabel`.
- **Styling:** Directly set attributes like `xlabelFontSize`, `xlabelColor`, `ylabelFontSize`, and `ylabelColor`.
- **Precision and Locale:** Control number formatting using `xlabelPrecision`, `ylabelPrecision`, and `locale`.
- **Label Positioning and Rotation:** Customize positions with `xlabelX`, `xlabelY`, `ylabelX`, `ylabelY`, and rotations with `xlabelRotation`, `ylabelRotation`.
- **ARIA Attributes and Text Anchoring:** Override default accessibility attributes using `xlabelAriaLabel`, `ylabelAriaLabel` and specify text anchor alignment using `xlabelAnchor` and `ylabelAnchor` (allowed values: start, middle, end).
- **SVG Dimensions:** Specify the width and height of the SVG output using the `--width` and `--height` parameters (or corresponding query parameters in the HTTP API).

## Examples

1. **Dynamic SVG Generation with Default Axis Labels:**
   GET `/plot?expression=y=sin(x)&range=x=-1:1,y=-1:1&fileType=svg`

2. **Dynamic SVG with Custom Axis Labels, Styling, and Custom Dimensions:**
   GET `/plot?expression=y=sin(x)&range=x=0:10,y=0:10&fileType=svg&xlabel=MyCustomX&ylabel=MyCustomY&xlabelFontSize=16&xlabelColor=green&ylabelFontSize=18&ylabelColor=purple&width=500&height=400`

3. **Dynamic SVG with Adaptive Resolution and Smooth Curve Rendering:**
   GET `/plot?expression=y=sin(x)&range=x=0:10,y=0:10&resolution=200&smooth=true&fileType=svg`

4. **Detailed JSON Export via HTTP:**
   GET `/plot?expression=y=sin(x)&range=x=0:10,y=0:10&jsonExport=true`

5. **Using an External Configuration File with Custom Dimensions:**
   ```sh
   node src/lib/main.js --config config.json --expression "y=sin(x)" --file output.svg --width 600 --height 400
   ```
