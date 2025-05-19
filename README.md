# @xn-intenton-z2a/repository0-plot-code-lib

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

---

## Project Overview

`repository0-plot-code-lib` is a JavaScript library and CLI tool for generating visual plots from mathematical expressions. It provides both a simple command-line interface and a programmatic API to parse expressions and numeric ranges, sample data points, and output charts in SVG or PNG format.

## Installation

Install the package from npm:

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## CLI Usage

Generate a plot using the CLI:

```bash
node src/lib/main.js --expression "y=sin(x)" \
  --range "x=0:6.28" \
  --format svg \
  --output plot.svg
```

Flags:

- `--expression`: Mathematical expression to plot (e.g., `"y=sin(x)"`).
- `--range`: Range of the independent variable (e.g., `"x=0:6.28"`). Supports multiple variables like `"x=0:10,y=-1:1"`.
- `--format`: Output format (`svg` or `png`).
- `--output`: Filename for the generated plot.
- `--mission`: Display the project mission statement.

## API Usage

Use the programmatic API to generate a plot in your code:

```js
import { plotExpression } from '@xn-intenton-z2a/repository0-plot-code-lib';

plotExpression({
  expression: 'y=sin(x)',
  range: { x: [0, 6.28] },
  format: 'png',
  output: 'plot.png',
})
  .then(() => console.log('Plot generated'))
  .catch(console.error);
```

## Links & References

- View the mission statement with the `--mission` flag or in [MISSION.md](MISSION.md).
- Detailed CLI and API usage in [USAGE.md](USAGE.md).
- Feature specification in [features/PLOT_GENERATION.md](features/PLOT_GENERATION.md).

---

## License

MIT
