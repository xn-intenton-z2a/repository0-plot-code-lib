# Usage

## Library Purpose
This CLI tool is designed to generate plots (in SVG format) and time series data (in CSV format) from mathematical expressions. It serves as a go-to plot library, similar to how jq works for formula visualisations, aligning with our mission to become the leading tool for generating formula-based plots and visualisations.

## Supported Expressions and Input Format
- Expressions:
  - "y=sin(x)": Computes the sine of x.
  - "y=cos(x)": Computes the cosine of x.
  - Note: If any other expression is provided, the tool defaults to y=0.

- Range Input: The expected range format is "x=start:end". For example, "x=0:6.28".

## Output Types
- CSV Output: The tool generates numerical time series data by calculating the expression over the specified range. When the output file ends with ".csv", the CLI prints the CSV content to stdout with a header "x,y" and at least 10 data rows.
- SVG Output: When the output file does not end with ".csv", the CLI creates a dummy SVG file that contains text elements displaying the provided expression and range.

## Usage Examples

### CSV Output Example
Command:

  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.csv

Expected Behavior:
- The CLI processes the provided mathematical expression.
- Prints CSV content to stdout starting with the header "x,y" followed by at least 10 rows of time series data.

### SVG Output Example
Command:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg

Expected Behavior:
- The CLI generates an SVG file containing text elements that show the expression and range. For example:
  <svg><text x='10' y='20'>Expression: y=sin(x)</text><text x='10' y='40'>Range: x=-1:1</text></svg>

## Requirements
- Node 20+ with ECMAScript Module (ESM) support.

## Additional Resources
- [Mission Statement](../MISSION.md)
- [Contributing Guidelines](../CONTRIBUTING.md)
