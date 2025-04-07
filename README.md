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

Generate a simple quadratic plot as SVG with evaluated math expressions and enhanced diagnostic reporting for errors (such as when an expression does not evaluate to a valid finite number):

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

**Note:** The CLI requires that all numeric parameters evaluate to a finite number. Invalid inputs—such as a literal 'NaN' (even with extra whitespace, varied casing, or other non-numeric representations) or expressions that yield non-finite values—will trigger an error with detailed diagnostic information. The diagnostic information includes both the raw input and the trimmed input values, along with a clear suggestion for correction. Replace any occurrence of literal 'NaN' with a valid numeric expression (e.g., use 0 or another valid number).

---

## Enhanced NaN Validation

This version includes robust rejection of any numeric input formatted as 'NaN' (with any casing or extra whitespace). All invalid 'NaN' representations (including extra whitespace and varied casing) are explicitly rejected, ensuring clear and actionable diagnostic feedback.

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

This release improves error reporting for numeric parameters. All numeric inputs must evaluate to a finite number. In particular, literal representations of 'NaN' (even with extra whitespace, varied casing, or other non-numeric formats) are now explicitly rejected. The error message includes both the raw input and the trimmed value, along with a suggestion for correction.

---

## License

MIT
