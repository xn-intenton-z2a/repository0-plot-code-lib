# repository0-plot-code-lib

repository0-plot-code-lib is a versatile command-line interface tool designed to plot and analyze mathematical functions. 
Our mission is to "Be a go-to plot library with a CLI, be the jq of formulae visualisations." 

## Overview

This CLI utility provides:

- Plotting of various mathematical functions with both stub and real implementations.
- Multiple output formats including CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, R, and PNG (stub).
- Modes for diagnostics, interactive input, web service, and debug output.
- Extended functionalities such as calculating derivatives and generating numeric ranges.

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

For custom plot parameters, simply pass them as arguments to the CLI.

## Extended Library Functions

This release includes real implementations for some core functions:

- **calculateDerivative:** Uses mathjs to compute the derivative of a given expression at a specific value.
- **generateRange:** Generates a numeric sequence between two values with an optional step.
- **New Real Plot Functions:**
  - **plotSineReal:** Generates a sine plot for a specified range.
  - **plotCosineReal:** Generates a cosine plot for a specified range.
  - **plotExponentialReal:** Generates an exponential plot for a specified range.
  - **plotLogarithmicReal:** Generates a logarithmic plot (for positive values) for a specified range.

## Contributing

We welcome contributions! Please follow these steps:

1. **Open an Issue:**
   Describe your idea, report a bug, or suggest an improvement by opening an issue.

2. **Review CONTRIBUTING Guidelines:**
   Please see [CONTRIBUTING.md](./CONTRIBUTING.md) to ensure your changes align with our mission and automated workflows.

3. **Submit Your Changes:**
   Commit your updates with clear messages.

## Changelog

- **2024-01:** Refreshed README to align with updated CONTRIBUTING guidelines and pruned outdated content.
- **2024-04:** Updated the source file to remove drift and align with the mission statement.
- **2024-05:** Extended library functions by adding real implementations for plotSineReal, plotCosineReal, plotExponentialReal, and plotLogarithmicReal.

## License

MIT
