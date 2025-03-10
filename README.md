# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool designed to plot and analyze mathematical functions. Our mission remains: "Be a go-to plot library with a CLI, be the jq of formulae visualisations." This tool supports multiple output formats and a wide range of plotting functionalities. This release updates the documentation in line with our CONTRIBUTING guidelines, pruning outdated details while retaining essential information.

## Overview

- **Mathematical Plotting:**
  Supports plotting of functions including sine, cosine, exponential, logarithmic, quadratic, linear, tangent, sigmoid, histogram, polar, logistic, cubic, gaussian, and the new heatmap, scatter, bar chart, Lissajous, and spiral visualizations.
- **Multiple Output Formats:**
  Provides outputs in CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, and R; with PNG support as a stub.
- **Interactive CLI:**
  Offers an interactive mode, diagnostic mode, server mode, and debug features.
- **Extended Library Functions:**
  Incorporates real implementations for derivative calculations, numeric range generation, and various plotting functions, alongside legacy stubs for backward compatibility.

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
  Pass flags such as `--plot-abs`, `--export-csv`, `--export-md`, etc., to generate specific plot outputs.
- **New Visualizations:**
  Use flags like `--heatmap`, `--scatter`, `--bar-chart`, `--lissajous`, and `--plot-spiral` for advanced visualizations.
- **Debug Mode:**
  ```bash
  node src/lib/main.js --debug
  ```

For custom plot parameters, simply pass them as arguments to the CLI.

## Changelog

- **2024-12.12:** Refreshed the README and documentation per CONTRIBUTING guidelines; pruned outdated content and updated descriptions of extended plotting features, including spiral plotting.

## Contributing

We welcome contributions! Please follow our guidelines:

1. **Open an Issue:** Describe your idea, report a bug, or suggest an improvement via an issue in our tracker.
2. **Review Guidelines:** Please refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our workflow and mission.
3. **Submit Your Changes:** Commit your improvements with clear and descriptive messages.

Thank you for helping improve repository0-plot-code-lib!

## License

MIT
