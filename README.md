# repository0-plot-code-lib

repository0-plot-code-lib is a CLI for plotting and analyzing mathematical functions. Our mission is to "Be a go-to plot library with a CLI, be the jq of formulae visualisations." This repository is built following automated workflows and agentic guidelines.

## Overview

This utility offers:

- Robust mathematical function plotting for various mathematical functions including quadratic, linear, sinusoidal, exponential, and more.
- Multiple output formats: CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, and R.
- Multiple modes such as diagnostic, interactive, web server, and debug mode.
- Extended debugging with a comprehensive list of available plotting functions.

## Installation

Prerequisites: Node.js (v20 or higher).

Install via npm:

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## Usage

Run the default demo:

```bash
npm run start
```

Other available commands:

- **Diagnostics:**
  ```bash
  npm run diagnostics
  ```
- **Interactive Mode:**
  ```bash
  node src/lib/main.js --interactive
  ```
- **Web Server Mode:**
  ```bash
  node src/lib/main.js --serve
  ```
- **Plot/Export Flags:**
  - `--plot-abs`: Outputs an absolute plot of sin(x).
  - `--export-csv`: Outputs CSV formatted plot data.
  - `--export-md`: Outputs Markdown table format.
  - `--export-json`: Outputs JSON data.
  - `--export-html`: Outputs HTML table.
  - `--export-ascii`: Outputs ASCII formatted table.
  - `--export-svg`: Outputs SVG content.
  - `--export-xml`: Outputs XML data.
  - `--export-latex`: Outputs LaTeX table.
  - `--export-txt`: Outputs plain text.
  - `--export-r`: Outputs R-friendly format.
  - `--scatter`, `--bar-chart`, `--plot-parametric`, `--plot-poly`, `--lissajous`, `--lemniscate`, `--hyperbola`, `--power-plot`: Demos for various plot types.
- **Debug Mode:**
  ```bash
  node src/lib/main.js --debug
  ```
- **Help:**
  ```bash
  node src/lib/main.js --help
  ```

For plot parameters, simply pass the parameters as arguments and the CLI will process them.

## Contributing

We welcome contributions! Please follow these steps:

1. Open an issue describing your suggestion or bug and label it as `automated` if applicable.
2. Follow the instructions in [CONTRIBUTING.md](./CONTRIBUTING.md) to adhere to our automated workflows.
3. Submit your changes following the guidelines.

## Changelog

- **2023-10:** Refreshed README and contributing guidelines to align with the project's mission and automated contribution process.

## License

MIT
