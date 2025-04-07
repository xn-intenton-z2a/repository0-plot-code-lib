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

The CLI now features enhanced argument parsing and improved error reporting. For example, if a non-numeric parameter is provided,
a detailed error message will be displayed such as:

```
Invalid parameter: "NaN" provided. All parameters must be numeric. Example valid input: quad:1,0,0,-10,10,1
```

In addition to standard plot commands, you can use the following flags:

- **Interactive Mode:**

  ```bash
  node src/lib/main.js --interactive
  ```

- **Web Server Mode:**

  ```bash
  node src/lib/main.js --serve
  ```

- **ASCII Plot Output:**

  ```bash
  node src/lib/main.js --ascii
  ```

- **Diagnostics Mode:**

  ```bash
  node src/lib/main.js --diagnostics
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
