# Usage

## Time Series Generation
Generate a numeric time series from a mathematical expression over a specified range.

**CLI Entry Point**

```
repository0-plot-code-lib -e <expression> -r <range> [options]
```

Options:

  -e, --expression <string>  Formula in the form `y=<expression>` or `<expression>` (required)
  -r, --range <string>       Range in the form `x=<start>:<end>:<step>` (required)
  -f, --format <json|csv>    Output format, `json` (default) or `csv`
  -o, --output <string>      File path to write output; prints to stdout if omitted
  -h, --help                 Display help information
  -v, --version              Display version information

Examples:

```bash
# JSON output to stdout
trepository0-plot-code-lib -e "y=x*2" -r "x=0:5:1"

# CSV output to file
trepository0-plot-code-lib -e "x^2" -r "x=0:5:0.5" -f csv -o output.csv
```