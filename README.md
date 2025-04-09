# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Installation

Requires Node.js (v20 or higher):

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## Usage

The CLI now supports multiple modes of operation with robust argument parsing.

### CLI Quickstart

To generate a plot using a specified output file and plot specification:

```bash
node src/lib/main.js output.svg "quad:1,0,0,-10,10,1"
```

### Interactive CLI

Activate interactive mode to input formulas directly:

```bash
node src/lib/main.js --interactive
```

### Web Interface

Start the Express-based web interface:

```bash
node src/lib/main.js --serve
```

### ASCII Plot Mode

Generate an ASCII plot by providing the `--ascii` flag followed by a plot specification:

```bash
node src/lib/main.js --ascii "sine:1,1,0,0,360,30"
```

### Help

Display usage instructions:

```bash
node src/lib/main.js --help
```

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

## License

MIT
