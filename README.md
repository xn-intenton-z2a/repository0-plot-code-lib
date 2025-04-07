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

**Note:** The CLI requires that all numeric parameters evaluate to a finite number. Invalid inputs — such as a literal 'NaN' (even with extra whitespace, varied casing, or other non-numeric representations) or expressions that yield non-finite values (e.g., expressions like "2+NaN") — will trigger an error with detailed diagnostic information. The error messages include both the raw input and the trimmed input values and provide a clear suggestion to replace such values with a valid numeric expression (e.g., 0).

---

## Enhanced NaN Validation

This version includes robust rejection of any numeric input formatted as 'NaN' — whether it appears with extra whitespace or in varied casing. Additionally, expressions that evaluate to non-finite numbers (such as "2+NaN") are similarly rejected. All such invalid representations are explicitly rejected, ensuring clear and actionable diagnostic feedback. Now, any instance of literal 'NaN' (even with extra whitespace or different casing) will be detected and rejected.

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

This release improves error reporting for numeric parameters. All numeric inputs must evaluate to a finite number. In particular, literal representations of 'NaN' (including those with extra whitespace or varied casing) and any expression that results in a non-finite number are strictly rejected with detailed diagnostic messages that specify both the raw and trimmed input values and provide clear guidance on replacing them with valid numeric expressions (e.g., 0).

---

## License

MIT
