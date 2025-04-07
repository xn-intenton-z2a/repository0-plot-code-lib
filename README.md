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

Generate a simple quadratic plot as SVG with evaluated math expressions:

```bash
node src/lib/main.js output.svg "quad:2+2,1,0,-10,10,1"
```

In the above example, the expression `2+2` is evaluated to `4` at runtime, showcasing enhanced parameter parsing.

The CLI now features enhanced argument parsing with clear error reporting and structured diagnostic logging. For example, if an invalid mathematical expression is provided, the CLI will immediately halt execution and display a detailed error message such as:

```
Error evaluating parameter at index 0: value '2+unknown' is not a valid expression. Details: [error details]
```

Additionally, error objects include a structured `diagnostic` property containing details (e.g., parameter index, provided value) to aid debugging.

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

### Enhanced Error Reporting and Expression Support

The CLI now uses mathjs to evaluate each plot parameter, allowing mathematical expressions such as `2+2` or `Math.sin(0.5)` as valid inputs. This provides a more flexible and powerful input mechanism for dynamic plotting. If an expression is invalid or does not evaluate to a finite number, the CLI will report a clear and specific error message.

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

**Quadratic Plot (SVG) with Expression Evaluation:**

```bash
node src/lib/main.js quad.svg "quad:2+2,1,0,-10,10,1"
```

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
