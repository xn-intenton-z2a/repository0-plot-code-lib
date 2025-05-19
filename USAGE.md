# Usage

## CLI Options

- `--expression`: mathematical expression to plot, e.g., `"y=sin(x)"`
- `--range`: range of the independent variable, e.g., `x=0:6.28`
- `--format`: output format (`svg` or `png`)
- `--output`: output filename for the generated plot
- `--mission`: display the project mission statement

### Display Mission Statement

To view the full project mission from the command line:

```bash
node src/lib/main.js --mission
```

This prints the contents of the `MISSION.md` file, for example:

```
# Mission Statement

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

**plot-code-lib** is a JavaScript library and CLI tool designed to:
- Transform and given range and a simple expression syntax...
- Read and write time series data in a standard format...
- Generate SVG and PNG plots from the time series data and save these as files.
```
