# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Installation

Requires Node.js (v20 or higher):

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## Usage

The CLI now supports multiple modes of operation with robust argument parsing, enhanced alias normalization, and clear error handling. The NaN alias resolution mechanism has been refactored for improved clarity. A helper function now handles normalization (trimming and lowercasing) of aliases.

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

### Help

Display usage instructions:

```bash
node src/lib/main.js --help
```

---

## Environment Configuration for NaN Alias Resolution

This library supports dynamic and locale-aware NaN alias resolution. Aliases are normalized by a dedicated helper function (which trims whitespace and converts to lowercase). Configure using the following environment variables:

- **STRICT_NAN_MODE**: When set to "true", only the canonical alias `nan` is accepted.
- **LOCALE_NAN_ALIASES**: A list (comma or semicolon separated) of additional aliases to merge with the defaults (defaults are: `nan`, `notanumber`, `undefined`).
- **LOCALE_NAN_OVERRIDE**: A list (comma or semicolon separated) that completely overrides the default aliases.

For example, to enable strict mode:

```bash
export STRICT_NAN_MODE=true
```

Or to add custom aliases using semicolon delimiters:

```bash
export LOCALE_NAN_ALIASES="NaNValue; NotA-Number"
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
