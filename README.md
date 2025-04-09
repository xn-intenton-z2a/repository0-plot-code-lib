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

Generate a simple quadratic plot as SVG using the CLI entrypoint:

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

---

## Environment Configuration for NaN Alias Resolution

This library now supports dynamic and locale-aware NaN alias resolution. The following environment variables can be used to configure its behavior:

- **STRICT_NAN_MODE**: When set to "true", only the canonical alias `nan` is accepted.
- **LOCALE_NAN_ALIASES**: A comma-separated list of additional aliases to merge with the defaults (defaults are: `nan`, `notanumber`, `undefined`).
- **LOCALE_NAN_OVERRIDE**: A comma-separated list that overrides the default aliases entirely.

For example, to enable strict mode:

```bash
export STRICT_NAN_MODE=true
```

Or to add custom aliases:

```bash
export LOCALE_NAN_ALIASES="NaNValue, NotA-Number"
```

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
