# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Mission

> "Be a go-to plot library with a CLI, be the jq of formulae visualisations."
>
> **plot-code-lib** is a JavaScript library and CLI tool designed to transform mathematical expressions and ranges into time series data, read/write data in standard formats, and generate SVG/PNG plots from those series.
>
> For the full mission statement and details, see [MISSION.md](./MISSION.md).

---

## CLI Usage

Use the CLI to display the mission, get help, generate data, or render plots:

```bash
node src/lib/main.js [options]
```

Options:

  --mission, -m        Show the mission statement and exit
  --help, -h           Show help information and exit
  --expression, -e     Time-series expression in form `y=<expression>`, e.g. `y=sin(x)`
  --parametric, -P     Parametric mode expressions in form `x=<expr>,y=<expr>`, e.g. `x=cos(t),y=sin(t)`
  --range, -r          Sampling range. For time-series: `x=start:end:step`; for parametric: `t=start:end:step`
  --format, -f         Data output format: `json` (default) or `csv`
  --plot-format, -p    Plot format: `svg` or `png` (requires `--file`)
  --width, -w          Plot width in pixels (default `800`)
  --height, -H         Plot height in pixels (default `600`)
  --file, -o           Output file path (writes data or plot to file; if omitted and not plotting, prints to stdout)

For a full reference and extended examples, see [USAGE.md](USAGE.md).

---

## Examples

### 1. Mission Flag

```bash
node src/lib/main.js --mission
```

Displays the mission statement and exits.

### 2. Help Flag

```bash
node src/lib/main.js --help
```

Displays the mission statement followed by detailed CLI usage and exits.

### 3. JSON Output to Stdout

```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=0:3.14:0.1"
```

Outputs a JSON array of sampled points, for example:

```json
[
  { "x": 0, "y": 0 },
  { "x": 0.1, "y": 0.0998 },
  { "x": 0.2, "y": 0.1987 },
  ...
]
```

### 4. CSV Output to File

```bash
node src/lib/main.js --expression "y=2*x" --range "x=0:5:1" --format csv --file data.csv
```

Creates a `data.csv` file containing:

```
x,y
0,0
1,2
2,4
3,6
4,8
5,10
```

### 5. SVG Plot of Time-Series

```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28:0.1" --plot-format svg --file chart.svg
```

Generates an SVG line chart saved to `chart.svg`.

### 6. PNG Plot with Custom Size

```bash
node src/lib/main.js --expression "y=2*x" --range "x=0:10:1" --plot-format png --width 1024 --height 768 --file chart.png
```

Generates a 1024×768 PNG image saved to `chart.png`.

### 7. Parametric SVG Curve

```bash
node src/lib/main.js --parametric "x=cos(t),y=sin(t)" --range "t=0:6.28:0.01" --plot-format svg --file circle.svg
```

Creates `circle.svg` containing a circular parametric plot.

---

## License

MIT

---
