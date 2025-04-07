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

**Note:** The CLI requires that all numeric parameters evaluate to a finite number. Invalid inputs — such as a literal 'NaN' (even with extra whitespace, varied casing, or other non-numeric representations) or expressions that yield non-finite numbers (e.g., expressions like "2+NaN") — will trigger an error with detailed diagnostic information. Error messages report both the raw and trimmed input values along with clear guidance to replace them with a valid numeric expression (e.g., 0).

### Improved NaN Handling and Diagnostic Messaging

- Explicitly rejects any numeric parameter that, when trimmed, exactly matches 'NaN' (case-insensitive), including inputs with extra whitespace.
- Provides enhanced error diagnostics by reporting both the raw and trimmed values along with clear guidance for replacing invalid inputs with a valid finite number (e.g., 0).

This refinement ensures that all edge cases, including varied casing and extra whitespace, are handled consistently.

---

## Enhanced Plot Commands

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

This update improves error reporting for numeric parameters. All numeric inputs must evaluate to a finite number. In particular, literal representations of 'NaN' (including those with extra whitespace or varied casing) and any expression that results in a non-finite number are strictly rejected, with detailed diagnostic messages providing both the raw and trimmed input values along with guidance to replace them with a valid numeric expression (e.g., 0).

---

## License

MIT
