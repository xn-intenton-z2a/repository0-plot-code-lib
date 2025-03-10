# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool for plotting and analyzing mathematical functions. Our mission is to "Be a go-to plot library with a CLI, be the jq of formulae visualisations." This project is built following automated workflows and agentic contribution guidelines.

## Overview

This CLI utility provides:

- Plotting of various mathematical functions including quadratic, linear, sine, cosine, exponential, logarithmic, Lissajous curves, and more (with many stub implementations to support future enhancements).
- Multiple output formats: CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, R, and PNG (stub implementation).
- Different modes: diagnostic, interactive, web server, and debug mode.
- Extended debugging with a comprehensive list of plotting functions.

## Installation

**Prerequisites:** Node.js (v20 or higher)

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
  - `--export-ascii`: Outputs an ASCII formatted table.
  - `--export-svg`: Outputs SVG content.
  - `--export-xml`: Outputs XML data.
  - `--export-latex`: Outputs a LaTeX formatted table.
  - `--export-txt`: Outputs plain text.
  - `--export-r`: Outputs data in R-friendly format.
  - `--export-png`: Outputs a PNG formatted plot (stub implementation).
  - `--scatter`, `--bar-chart`, `--plot-parametric`, `--plot-poly`, `--lissajous`, `--lemniscate`, `--hyperbola`, `--power-plot`: Demonstrate various plot types.

- **Debug Mode:**
  ```bash
  node src/lib/main.js --debug
  ```

- **Help:**
  ```bash
  node src/lib/main.js --help
  ```

For plot parameters, simply pass them as arguments and the CLI will process the request accordingly.

## Additional Plotting Functions

This library now includes a range of stub implementations for various plotting and mathematical functions, including a new stub for PNG export. These are intended to be extended in future updates to fully realize our mission statement.

## Contributing

We welcome contributions! Please follow these steps:

1. **Open an Issue:**  
   Describe your idea or report a bug by opening an issue. Label it as `automated` if applicable.

2. **Review CONTRIBUTING Guidelines:**
   Follow the instructions in [CONTRIBUTING.md](./CONTRIBUTING.md) to adhere to our automated workflows.

3. **Submit Your Changes:**
   Commit your changes with clear messages and ensure your code aligns with the project mission.

## Changelog

- **2023-10:** Extended stub functionality by adding PNG export and refined interactive and export modes in line with the mission statement.
- **2023-10 (previous):** Brought test coverage near 100% by adding stub implementations for numerous plotting and mathematical functions. Enhanced error handling and refined the CLI modes to fully align with our mission statement.

## License

MIT
