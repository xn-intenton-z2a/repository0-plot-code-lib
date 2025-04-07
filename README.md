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

Generate a simple quadratic plot as SVG with evaluated math expressions and enhanced diagnostic reporting for errors (such as when an expression evaluates to NaN or a non-finite number):

```bash
node src/lib/main.js output.svg "quad:2+2,1,0,-10,10,1"
```

Generate a linear plot:

```bash
node src/lib/main.js output.svg "linear:2,3,-10,10,1"
```

Generate a plot based on a custom mathematical expression:

```bash
node src/lib/main.js output.svg "expr:Math.sin(x)*x:-10,10,0.5"
```

**Note:** The CLI does not allow the literal 'NaN' (in any case variant) as a valid numeric parameter. If such a value is provided, an error with detailed diagnostic information will be thrown. Replace any occurrence of literal 'NaN' with a valid numeric expression.

### Modes and Features

- **Interactive Mode:**

  ```bash
  node src/lib/main.js --interactive
  ```

  Starts an interactive CLI to enter plot commands directly.

- **Web Server Mode:**

  ```bash
  node src/lib/main.js --serve
  ```

  Launches an Express-based web interface (placeholder) for plotting.

- **ASCII Plot Output:**

  ```bash
  node src/lib/main.js --ascii
  ```

  Generates an ASCII plot output (placeholder).

- **Diagnostics Mode:**

  ```bash
  node src/lib/main.js --diagnostics
  ```

  Activates diagnostics mode, providing detailed error information (placeholder).

### Enhanced Plot Commands

- **Quadratic Plot (SVG) with Expression Evaluation:**

  ```bash
  node src/lib/main.js quad.svg "quad:2+2,1,0,-10,10,1"
  ```

- **Linear Plot (SVG):**

  ```bash
  node src/lib/main.js linear.svg "linear:2,3,-10,10,1"
  ```

- **Custom Expression Plot (SVG):**

  ```bash
  node src/lib/main.js expression.svg "expr:Math.sin(x)*x:-10,10,0.5"
  ```

---

## Note on Enhanced Error Diagnostics

This release includes improved error handling for cases where expressions evaluate to NaN, non-finite values, or when a literal 'NaN' is supplied. If a literal 'NaN' (or any case variant thereof) or an expression that does not yield a valid numeric value is provided, the error message and diagnostic information instruct you to replace it with a valid number or adjust your expression accordingly.

## License

MIT
