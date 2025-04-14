# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## CLI Usage

This library now supports plot generation from a mathematical expression and a range.

For example, you can generate a placeholder plot by running:

```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg
```

The above command will create an output file (either SVG or PNG based on your filename extension) containing a placeholder plot message.

## License

MIT

---
