# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Installation

Requires Node.js (v20 or higher):

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## Usage

### CLI Quickstart

Generate a simple quadratic plot as SVG:

```bash
node src/lib/main.js output.svg "quad:1,0,0,-10,10,1"
```

### Interactive CLI

Interactive mode prompts the user to input formulas directly:

```bash
node src/lib/main.js --interactive
```

### Web Interface

Start the Express-based interactive plotting web interface:

```bash
node src/lib/main.js --serve
```

### Advanced Plotting

Enhance your visualizations with advanced plotting capabilities. Use the `--advanced` flag followed by the plot type and parameters. The supported advanced plot types include:

- spiral
- polarHeatmap
- dualAxis
- boxPlot
- violinPlot
- cumulativeAverage
- inverse
- modulatedSine
- extended3D

_Note: The advanced plotting functionality is implemented in the separate module file `advancedPlots.js`, which is required to be present in the same directory as `main.js`._

#### Examples

**Spiral Plot (CLI):**

```bash
node src/lib/main.js --advanced spiral "radius:1,2,3,4"
```

**Polar Heatmap:**

```bash
node src/lib/main.js --advanced polarHeatmap "heat:0.5,0.8,1,2"
```

**Cumulative Average Plot:**

```bash
node src/lib/main.js --advanced cumulativeAverage "data:5,10,15,20"
```

Explore and combine these advanced plotting options to suit your complex visualization needs!

---

## Examples

**Linear Plot (SVG):**

```bash
node src/lib/main.js linear.svg "linear:2,3,-10,10,1"
```

**Custom Mathematical Expression:**

```bash
node src/lib/main.js expression.svg "expr:Math.sin(x)*x:-10,10,0.5"
```

**ASCII Plot Output:**

```bash
node src/lib/main.js --ascii "sine:1,1,0,0,360,30"
```

---

## Input Validation

This tool now includes robust input validation for numerical parameters. If any numeric parameter cannot be parsed correctly (resulting in NaN), the CLI will display an error message indicating the invalid input and terminate with a non-zero exit code.

---

## License

MIT
