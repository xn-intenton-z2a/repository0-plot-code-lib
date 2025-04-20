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

### SVG Output Example
Command:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg

Expected Behavior:
- The CLI generates an SVG file containing text elements that show the expression and range. For example:
  <svg><text x='10' y='20'>Expression: y=sin(x)</text><text x='10' y='40'>Range: x=-1:1</text></svg>

### Generating CSV Output
When invoking the CLI tool with the --file parameter ending with ".csv", the tool outputs CSV content directly to stdout instead of writing to a file. The CSV output consists of a header row "x,y" followed by at least 10 rows of numerical time series data computed based on the provided expression and range.

#### Example Usage:

  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.csv

#### Sample Output:

  x,y
  0,0
  0.698,0.6428
  1.396,0.9848
  2.093,0.866
  2.791,0.342
  3.489,-0.342
  4.186,-0.866
  4.884,-0.9848
  5.582,-0.6428
  6.28,0

Note: Numerical values are approximate and based on generating at least 10 data points over the given range.

## Requirements
- Node 20+ with ECMAScript Module (ESM) support.

## Additional Resources
- [Mission Statement](../MISSION.md)
- [Contributing Guidelines](../CONTRIBUTING.md)
