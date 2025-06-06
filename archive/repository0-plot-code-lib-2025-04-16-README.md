# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Usage

### CLI

The CLI now requires three parameters: --expression, --range, and --file. Additional optional flags include --evaluate, --diagnostics, --json, --color, --stroke, --width, --height, --padding, --samples, --grid, --grid-color, --grid-stroke, --grid-dash, --marker, --no-legend, --logscale, --title, --title-font-family, and --title-font-size.

- --expression: A non-empty string representing one or more mathematical expressions. For a single expression, use the format (e.g., "y=sin(x)"). For multiple expressions, separate them with a semicolon (e.g., "y=sin(x);y=cos(x)"). In each expression, if the string starts with "y=", the prefix is removed and basic math functions (like sin, cos, tan, sqrt, log, exp, and abs) are translated for JavaScript evaluation.
- --range: A string specifying the range for the x-axis and optionally the y-axis. It can be provided in the format 'x=min:max' or 'x=min:max,y=min:max'. When a y-range is provided, its boundaries will be used for plotting rather than auto scaling based on computed values.
- --file: The output file name which must end with .svg, .png, or .csv. When a .png file is specified, the generated SVG plot is converted to PNG using the sharp library. When a .csv file is specified, the computed time series data is exported in CSV format. Note: CSV export now supports multiple expressions by including additional y columns (e.g., y1, y2, etc.).
- --evaluate: (Optional) When provided, the CLI evaluates the given expression(s) over the x-range and generates time series data. By default, the data is printed to the console (except when exporting CSV).
- --json: (Optional) When used in combination with --evaluate, the computed time series data is exported to a JSON file instead of being printed. The JSON file will have the same base name as the file specified by --file but with a .json extension.
- --diagnostics: (Optional) When provided, the CLI outputs diagnostic details including the raw parsed CLI arguments before proceeding with validation. This aids in debugging.
- --color: (Optional) A valid CSS color string (e.g., 'red', '#FF0000'). For single expression plots, this sets the stroke color. For multiple expressions, if a color is provided, it is used for all curves; if not, a default palette (e.g., black, red, blue, etc.) is applied to distinguish each curve.
- --stroke: (Optional) A positive number representing the stroke width of the plot. Defaults to 2 if not provided.
- --width: (Optional) A positive integer to specify the canvas width of the generated plot. Defaults to 500 if not provided.
- --height: (Optional) A positive integer to specify the canvas height of the generated plot. Defaults to 500 if not provided.
- --padding: (Optional) A positive integer to set the padding within the canvas, affecting the plot margins. Defaults to 20 if not provided.
- --samples: (Optional) A positive integer specifying the number of sample points to generate the plot. Defaults to 100 if not provided.
- --grid: (Optional) When provided, gridlines are drawn on the plot.
- --grid-color: (Optional) A valid CSS color string for gridlines. When used with --grid, it customizes the gridline color (default is #ddd).
- --grid-stroke: (Optional) A positive number specifying the stroke width of the gridlines when --grid is used (default is 1).
- --grid-dash: (Optional) A comma-separated list of positive integers to define the dash pattern for gridlines (e.g., "5,3"). This sets the stroke-dasharray attribute in the generated SVG grid lines.
- --marker: (Optional) When provided, small circle markers (with a default radius of 3) are drawn at each computed data point using the stroke color.
- --no-legend: (Optional) When provided, the legend is disabled in multi-expression plots. By default a legend is generated if multiple expressions are provided.
- --logscale: (Optional) When provided, the plot’s y-axis will use a logarithmic scale. This transforms y-values using the natural logarithm. Note: All y-axis values must be positive when using this option.
- --title: (Optional) A non-empty string to add a custom title to the plot. When provided, a text element is added at the top center of the plot.
- --title-font-family: (Optional) A non-empty CSS font family string to customize the plot title's font family.
- --title-font-size: (Optional) A positive number to set the plot title's font size in pixels.

#### CSV Export with Multiple Expressions

When exporting to CSV, you can now provide multiple expressions. The CSV file will include a header with additional y columns (e.g., "x,y1,y2,...") and each row will contain the x value followed by the corresponding y values for each expression.

#### JSON Export for Evaluation Data

When using the --evaluate flag in combination with the new --json flag, the CLI will export the computed time series data to a JSON file. The JSON file will be named after the given output file with its extension replaced by .json. For example:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6,y=-1:1" --file output.svg --evaluate --json
```

This will generate a file named output.json containing the evaluation data in JSON format.

#### Additional Math Functions

In addition to sin, cos, tan, sqrt, log, and exp, the CLI now supports the abs function. Use abs(x) in your expression to compute the absolute value, which will be translated to Math.abs(x) during evaluation.

#### Custom Grid Styling

When the --grid flag is provided, you can customize gridline appearance using the following additional flags:
- --grid-color: Specify a custom color for the gridlines (e.g., "#00FF00").
- --grid-stroke: Specify a custom stroke width for the gridlines (e.g., 2).
- --grid-dash: Specify a dash pattern as a comma-separated list of positive integers (e.g., "5,3") to create dashed gridlines.

#### Custom Title

When the --title flag is provided, the plot will include a centered title at the top. Additionally, you can customize the title's font family and font size using the --title-font-family and --title-font-size flags. For example:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file plot.svg --title "My Custom Plot" --title-font-family "Arial" --title-font-size 24
```

This will generate a plot with the title "My Custom Plot" styled with a 24px Arial font.

#### Valid Usage Examples

Display help information:

```sh
node src/lib/main.js --help
# Output: Usage: node src/lib/main.js --expression <exp> --range <range> --file <filepath> [--evaluate] [--diagnostics] [--json] [--color <color>] [--stroke <number>] [--width <number>] [--height <number>] [--padding <number>] [--samples <number>] [--grid] [--grid-color <color>] [--grid-stroke <number>] [--grid-dash <dash_pattern>] [--marker] [--no-legend] [--logscale] [--title <string>] [--title-font-family <fontFamily>] [--title-font-size <fontSize>]
```

Run the CLI with a single expression (SVG plot generation):

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:-1,y=-1:-1" --file output.svg
# Output:
# Validated arguments: {"expression":"y=sin(x)","range":"x=-1:-1,y=-1:-1","file":"output.svg"}
# Generating plot for expression: y=sin(x) with range: x=-1:-1,y=-1:-1
# Plot saved to output.svg
```

Run the CLI with multiple expressions and custom grid styling (SVG plot generation):

```sh
node src/lib/main.js --expression "y=sin(x);y=cos(x)" --range "x=0:10,y=-1:1" --file customGrid.svg --grid --grid-color "#00FF00" --grid-stroke 2 --grid-dash "5,3"
```

Run the CLI with PNG output (PNG plot generation):

```sh
node src/lib/main.js --expression "y=cos(x)" --range "x=0:10,y=0:5" --file output.png
```

Run the CLI with CSV export (supports multiple expressions):

```sh
node src/lib/main.js --expression "y=sin(x);y=cos(x)" --range "x=0:6,y=-1:1" --file output.csv
```

Run the CLI with JSON export for evaluation data:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6,y=-1:1" --file output.svg --evaluate --json
```

Run the CLI with logarithmic y-axis scaling (valid usage):

```sh
node src/lib/main.js --expression "y=exp(x)" --range "x=0:2,y=1:100" --file logscale.svg --logscale
```

Run the CLI with a custom title and custom title font styling:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file plot.svg --title "My Custom Plot" --title-font-family "Arial" --title-font-size 24
```

#### Programmatic

You can also use the library programmatically:

```js
import { main } from "@src/lib/main.js";

main([
  "--expression", "y=sin(x);y=cos(x)",
  "--range", "x=0:6,y=-1:1",
  "--file", "output.svg", // or use output.png for PNG output or output.csv for CSV export
  "--evaluate",         // optional flag to output time series data (when not exporting CSV)
  "--diagnostics",      // optional flag to output diagnostic information
  "--json",             // optional flag to export evaluation data to JSON
  "--color", "green",  // optional flag to set the stroke color
  "--stroke", "3",     // optional flag to set the stroke width
  "--width", "800",    // optional custom canvas width
  "--height", "600",   // optional custom canvas height
  "--padding", "30",   // optional custom padding
  "--samples", "120",  // optional custom sample count
  "--grid",             // optional flag to add gridlines
  "--grid-color", "#00FF00",
  "--grid-stroke", "2",
  "--grid-dash", "5,3",
  "--marker",           // optional flag to add markers at data points
  "--no-legend",        // optional flag to disable the legend
  "--logscale",         // optional flag to enable logarithmic scaling of the y-axis
  "--title", "Custom Plot Title",
  "--title-font-family", "Arial",
  "--title-font-size", "24"
]);
```

After successfully running the CLI with valid parameters, a plot is generated and saved to the specified file, CSV data is exported if .csv is used, or a JSON file is created for evaluation data when --json is provided with --evaluate.
