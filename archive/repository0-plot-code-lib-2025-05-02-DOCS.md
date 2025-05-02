USAGE.md
# USAGE.md
# Usage Instructions

This CLI tool allows you to generate plots from mathematical expressions. It validates CLI parameters using robust Zod schema validation.

## Required Parameters

- --expression: A mathematical expression (e.g., "y=sin(x)").
- --range: A comma-separated list of ranges for variables. The expected format is key=min:max. Example: "x=-10:10,y=-1:1".
- --file: The output file name (e.g., output.svg or plot.png).

## Example

Run the CLI with valid parameters:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.svg

Upon successful validation, the CLI will simulate plot generation by displaying a summary:

  Plot generation simulated:
  Expression: y=sin(x)
  Range: x=-10:10,y=-1:1
  Output file: output.svg

If any parameter is missing or malformed, a clear error message will be printed detailing the issue.
