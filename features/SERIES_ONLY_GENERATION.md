# Overview

Introduce a focused `generate` subcommand that only handles time series data generation with robust CLI parsing. This isolates core series functionality, making the CLI clearer and easier to extend.

# Behavior

When invoked as `repository0-plot-code-lib generate`:

- Options:
  • `--expression, -e` (string, required): Formula in the form y=<expr> or <expr>.
  • `--range, -r` (string, required): Range in the form x=<start>:<end>:<step>.
  • `--format, -f` (string, optional): Output format json (default) or csv.
  • `--output, -o` (string, optional): File path to write output; prints to stdout if omitted.
  • `--help, -h`: Show help and exit 0.
  • `--version, -v`: Show version and exit 0.

- Validation:
  1. Strip optional y= prefix and compile expression via mathjs; invalid expressions exit 1 with Error: Invalid expression.
  2. Parse range syntax; enforce step > 0 and start ≤ end; invalid ranges exit 1 with Error: Invalid range.

- Output:
  • JSON: pretty-printed array of `{ x, y }` points when format=json.
  • CSV: header x,y plus comma-separated rows when format=csv.

- On success: write to file or stdout, exit 0.
- On failure: print Error: <message> and exit 1.

# CLI Interface

```
repository0-plot-code-lib generate -e "y=x" -r "x=0:2:1" -f csv -o series.csv
```