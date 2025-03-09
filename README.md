# repository0-plot-code-lib

A powerful CLI tool for accurate mathematical plotting, aligned with our mission:

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

repository0-plot-code-lib is a versatile command-line utility designed for plotting and analyzing mathematical functions with precision. With clear, extensible, and well-documented code, this tool supports a wide range of plotting modes and output formats while strictly adhering to our contributing guidelines.

## Features

- **Mathematical Plots:** Quadratic, linear, sine, cosine, tangent, exponential, logarithmic, square root, polar, parametric, elliptical, polynomial, spiral, modulated sine, custom plots, Lissajous curves, Bessel functions, Lemniscate plots, Hyperbola plots, Power function plots, and new functions including Sigmoid, Sinc, ReLU, and moving median plots.
- **Numerical Tools:** Derivative approximation, area calculation, moving average, numerical integration, definite integration, and statistical analysis.
- **Output Formats:** CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, plain text (TXT), and R-friendly formats.
- **CLI Modes:** Demo, diagnostics, interactive, debug, web server modes, plus various export options including the new --power-plot mode.
- **Extended Library:** Now includes additional functions like plotReLU and movingMedian to further extend capabilities.

For integrating plotting into your own projects, simply import the required functions from the library.

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
- **Export/Plot Modes:** Flags such as `--export-csv`, `--export-md`, `--export-json`, `--export-html`, `--export-ascii`, `--export-svg`, `--export-xml`, `--export-latex`, `--export-txt`, `--export-r`, `--plot-abs`, `--scatter`, `--plot-parametric`, `--plot-poly`, `--lissajous`, `--lemniscate`, `--hyperbola`, `--power-plot` for various outputs.
- **Debug Mode:** `node src/lib/main.js --debug` to list available plotting functions.

## Changelog

- **2023-10:** Refined CLI messaging and extended plotting functionalities.
- **2023-10:** Added new features: solveQuadraticEquation, plotSinCosCombined, interpolateData, plotBezier, plotLissajous, plotLemniscate, plotHyperbola.
- **2023-10 (Update):** Introduced plotPolynomial, plotModulatedSine, plotSpiral, calculateDefiniteIntegral, plotCustom, plotEllipse, plotPower, and new plotting functions: plotSigmoid, plotSinc.
- **2023-10 (Extended):** Added additional library functions: plotReLU and movingMedian.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Open an Issue:** Describe your idea, report a bug, or suggest an improvement on GitHub.
2. **Label as `automated`:** This triggers our automated workflow.
3. **Follow Guidelines:** See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed instructions and our mission statement.

Your contributions help ensure this tool remains precise, functional, and true to our vision.

## License

MIT
