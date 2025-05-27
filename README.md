# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Time Series Generation

Generates a sequence of (x, y) values from a mathematical expression over a numeric range, with optional JSON or CSV output.

### Installation

```bash
npm install -g @xn-intenton-z2a/repository0-plot-code-lib
```

### CLI Usage

```bash
repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:6.28:0.1"
```

Use `--format csv` to produce CSV instead of JSON (default):

```bash
repository0-plot-code-lib -e "y=x" -r "x=0:5:1" -f csv
```

Write output to a file with `--output` or `-o`:

```bash
repository0-plot-code-lib -e "2*x+1" -r "x=0:5:1" -f json -o series.json
```

Built-in flags:

- `--help`, `-h`: Show help and exit
- `--version`, `-v`: Show version and exit

---

## License

MIT
