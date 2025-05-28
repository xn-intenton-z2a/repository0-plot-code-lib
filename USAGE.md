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
repository0-plot-code-lib -e "y=x*2" -r "x=0:5:1"

# CSV output to file
repository0-plot-code-lib -e "x^2" -r "x=0:5:0.5" -f csv -o output.csv
```

## Plot Rendering
Generate a line plot from JSON time series data as an SVG or PNG image.

**CLI Entry Point**

```
repository0-plot-code-lib plot -i <input.json> -o <output.png|svg> -f <svg|png> -w <width> -h <height>
```

Options:

  -i, --input <string>       JSON input file path; reads from stdin if omitted
  -o, --output <string>      Output image file path (default: `plot.svg`)
  -f, --format <svg|png>     Output format, `svg` (default) or `png`
  -w, --width <number>       Width in pixels (default: 800)
  -h, --height <number>      Height in pixels (default: 600)

Examples:

```bash
# Generate SVG plot from data.json
repository0-plot-code-lib plot -i data.json -o plot.svg -f svg -w 800 -h 600

# Generate PNG plot from stdin data
cat data.json | repository0-plot-code-lib plot -f png -o plot.png
```
