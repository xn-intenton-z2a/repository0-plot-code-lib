# repository0-plot-code-lib

**A versatile mathematical plotting CLI tool aligned with our mission: "Be a go-to plot library with a CLI, be the jq of formulae visualisations."**

## Overview

repository0-plot-code-lib is a command-line tool designed for high-precision mathematical plotting and analysis. Built in strict adherence to our mission and contribution guidelines, it offers a comprehensive suite of plotting functions, statistical analysis tools, and diverse output formats for both demo and interactive use cases.

## Features

- **Plotting Functions:** Supports quadratic, linear, sine, cosine, tangent, exponential, logarithmic, square root, polar, parametric, and ellipse plots.
- **Multiple Output Formats:** Export plots in CSV, Markdown, JSON, HTML, ASCII, SVG, XML, and LaTeX table formats.
- **Data Analysis & Transformations:** Includes derivative calculation, area approximation, data smoothing (moving average, exponential moving average), and statistical analysis (standard deviation, Pearson correlation).
- **CLI Modes:** Offers demo, diagnostics, interactive, web server, and debug modes.
- **New Enhancements:**
  - Modulated sine plotting
  - Logarithm with arbitrary base calculation
  - Bar chart visualization
  - Parametric plotting for visualizing complex equations
  - **Added plotCosine:** Real implementation for cosine plotting now available.
  - **Added plotEllipse:** Generates ellipse coordinates based on center and radii.
  - **Added exportPlotAsLaTeX:** Exports plot data in a LaTeX tabular format.

## Installation

Ensure you have Node.js (v20 or higher) installed. Then install the package via npm:

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## Usage

### CLI Quickstart

Run the default demo:

```bash
npm run start
```

Other modes include:

- **Diagnostics Mode:**
  ```bash
  npm run diagnostics
  ```
- **Interactive Mode:**
  ```bash
  node src/lib/main.js --interactive
  ```
  You will be prompted for a plot command; a fallback timeout is triggered if no input is given.
- **Web Server Mode:**
  ```bash
  node src/lib/main.js --serve
  ```
- **CSV Export Mode:**
  ```bash
  node src/lib/main.js --export-csv
  ```
- **Markdown Export Mode:**
  ```bash
  node src/lib/main.js --export-md
  ```
- **JSON Export Mode:**
  ```bash
  node src/lib/main.js --export-json
  ```
- **HTML Export Mode:**
  ```bash
  node src/lib/main.js --export-html
  ```
- **ASCII Export Mode:**
  ```bash
  node src/lib/main.js --export-ascii
  ```
- **SVG Export Mode:**
  ```bash
  node src/lib/main.js --export-svg
  ```
- **XML Export Mode:**
  ```bash
  node src/lib/main.js --export-xml
  ```
- **LaTeX Export Mode:**
  ```bash
  node src/lib/main.js --export-latex
  ```
- **Scatter Plot Mode:**
  ```bash
  node src/lib/main.js --scatter
  ```
- **Bar Chart Mode:**
  ```bash
  node src/lib/main.js --bar-chart
  ```
- **Parametric Plot Mode:**
  ```bash
  node src/lib/main.js --plot-parametric
  ```
- **Debug Mode (list available functions):**
  ```bash
  node src/lib/main.js --debug
  ```

## Contributing

Contributions are automated. To contribute:

1. Open an issue describing your idea, bug, or improvement.
2. Label it as `automated` to trigger our workflow.
3. Follow the guidelines detailed in [CONTRIBUTING.md](./CONTRIBUTING.md).

Your contributions help us maintain the tool's high precision and alignment with our mission.

## Changelog

- **2023-10:** Refined CLI messaging and error handling per mission statement and updated CONTRIBUTING guidelines.
- **2023-10:** Added new export modes (Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX), scatter plot, bar chart, and parametric plotting.
- **2023-10:** Introduced functions for modulated sine and logarithm with arbitrary base calculations.
- **2023-10:** **Added plotCosine implementation for cosine plotting.**
- **2023-10:** **Added plotEllipse for generating ellipse coordinates and exportPlotAsLaTeX for LaTeX table export.**
- **2023-10:** Pruned code drift to fully align with the mission: "Be a go-to plot library with a CLI, be the jq of formulae visualisations." 
- Streamlined code and enhanced test coverage to adhere to our high-quality standards.

## License

MIT
