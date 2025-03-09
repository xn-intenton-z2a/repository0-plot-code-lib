# repository0-plot-code-lib

A CLI tool for precise mathematical plotting that lives by its mission:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

repository0-plot-code-lib is a flexible command-line utility for plotting and analyzing mathematical functions. It supports a wide range of output formats and diverse plotting modes. Our design emphasizes clarity, extensibility, and strict adherence to our contributing guidelines.

## Features

- **Plotting Functions:** Quadratic, linear, sine, cosine, tangent, exponential, logarithmic, square root, polar, parametric, ellipse, polynomial, spiral, modulated sine, custom function plots, Lissajous curves, and Bessel function plots.
- **Output Formats:** CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, plain text (TXT) and R-friendly formats.
- **Mathematical Tools:** Derivative calculation, area approximation, moving averages, numerical integration, and statistical analysis.
- **CLI Modes:** Demo, diagnostics, interactive, web server, and debug modes with various flags for tailored outputs.
- **Extended Helpers:** Functions such as solveQuadraticEquation, plotSinCosCombined, interpolateData, and plotBezier extend the library's capabilities.

## Installation

Ensure Node.js (v20 or higher) is installed. Then install via npm:

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## Usage

Run the default demo:

```bash
npm run start
```

Other available modes include:

- **Diagnostics:** `npm run diagnostics`
- **Interactive Mode:** `node src/lib/main.js --interactive`
- **Web Server:** `node src/lib/main.js --serve`
- **Export Modes:** Use flags such as `--export-csv`, `--export-md`, `--export-json`, `--export-html`, `--export-ascii`, `--export-svg`, `--export-xml`, `--export-latex`, `--export-txt`, and `--export-r`
- **Plot Modes:** Use flags like `--plot-abs`, `--scatter`, `--bar-chart`, `--plot-parametric`, `--plot-poly`, and the new `--lissajous` for generating Lissajous curve plots
- **Debug Mode:** `node src/lib/main.js --debug` to list all available plotting functions

For integrating plotting into your own scripts, import the library functions directly.

## Changelog

- **2023-10:** Refined CLI messaging and error handling; extended plotting functionalities across multiple formats.
- **2023-10:** Added new helper functions including solveQuadraticEquation, plotSinCosCombined, interpolateData, and plotBezier.
- **2023-10:** Introduced plotLissajous and the corresponding `--lissajous` flag for Lissajous curve plots.
- **2023-10:** Enhanced plotBessel functionality to correctly interface with mathjs or use a fallback for order 0.
- **2023-10:** Pruned code drift and streamlined CLI messaging to fully embody our mission statement.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Open an Issue:** Provide a detailed description of your bug, idea, or enhancement.
2. **Label as `automated`:** This initiates our automated workflow.
3. **Follow the Guidelines:** Refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed instructions and our project mission.

Your contributions help us maintain precision and uphold the spirit of our project.

## License

MIT
