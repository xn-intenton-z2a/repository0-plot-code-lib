# Generate Plot Feature

## Purpose
Add functionality to transform a mathematical expression and numeric range into a time series and generate a chart file in SVG or PNG format.

## CLI Interface
Define and validate these options in the main function:
- --expression <expr>   A mathematical expression in terms of x, eg. "sin(x) + x^2".
- --range <start:end[:step]>   Numeric range for x values, default step of 1 if omitted.
- --output <path>       File path for the generated plot, default output.svg.
- --format <svg|png>    Output format, default svg.

## Data Generation
1. Parse the expression using mathjs.
2. Compute x values from start to end by step.
3. Evaluate expression at each x to build a data series.

## Chart Rendering
1. Use chartjs-node-canvas to render a line chart from the data series.
2. Configure axes labels, line style, and title derived from the expression.
3. Export the chart in the requested format and write to the output path.

## Library API
Export a function generatePlot(options) that can be called programmatically with the same parameters.

## Testing
- Add unit tests for argument parsing and validation with zod.
- Add tests for data generation to ensure correct series for sample expressions.
- Mock file writing and chart rendering to test output format selection.

## Documentation
- Update README.md with usage examples for CLI invocation and programmatic API.
- Include sample commands: repository0-plot-code-lib --expression "sin(x)" --range "0:6.28:0.1" --output chart.png --format png
