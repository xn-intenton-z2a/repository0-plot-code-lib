# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool for plotting and analyzing mathematical functions. Our mission is to "Be a go-to plot library with a CLI, be the jq of formulae visualisations." This project follows automated workflows and updated contribution guidelines.

## Overview

This CLI utility provides:

- Plotting of various mathematical functions with support for stub and real implementations.
- Multiple output formats: CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, R, and PNG (stub).
- Modes including diagnostic, interactive, web server, and debug mode.
- Extended debugging with a comprehensive list of plotting functions.
- Real implementations for key functions such as calculateDerivative and generateRange.

## Installation

**Prerequisites:** Node.js v20 or higher

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
  - `--export-md`: Outputs a Markdown table.
  - `--export-json`: Outputs JSON data.
  - `--export-html`: Outputs an HTML table.
  - `--export-ascii`: Outputs ASCII formatted table.
  - `--export-svg`: Outputs SVG content.
  - `--export-xml`: Outputs XML data.
  - `--export-latex`: Outputs a LaTeX formatted table.
  - `--export-txt`: Outputs plain text data.
  - `--export-r`: Outputs data in R-friendly format.
  - `--export-png`: Stub for PNG output.
  - Additional flags: `--scatter`, `--bar-chart`, `--plot-parametric`, `--plot-poly`, `--lissajous`, `--lemniscate`, `--hyperbola`, `--power-plot` for various plots.

- **Debug Mode:**
  ```bash
  node src/lib/main.js --debug
  ```

- **Help:**
  ```bash
  node src/lib/main.js --help
  ```

For plot parameters, simply pass them as arguments and the CLI will process the request accordingly.

## Extended Library Functions

This release includes real implementations for some library functions:

- **calculateDerivative:** Uses mathjs to compute the derivative of a given expression at a specific value.
- **generateRange:** Generates a numeric sequence between two values with an optional step.

## Contributing

We welcome contributions! Please follow these steps:

1. **Open an Issue:**
   Describe your idea or report a bug by opening an issue. Label it as `automated` if applicable.

2. **Review CONTRIBUTING Guidelines:**
   Refer to [CONTRIBUTING.md](./CONTRIBUTING.md) to ensure your changes align with our automated workflows and mission.

3. **Submit Your Changes:**
   Commit your changes with clear messages and ensure compliance with the project mission.

## Changelog

- **2024-01:** Refreshed README to align with updated CONTRIBUTING guidelines and pruned outdated content.
- **2024-04:** Updated the source file to prune drift and align fully with the mission statement per the latest CONTRIBUTING guidelines.

## License

MIT
