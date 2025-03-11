# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool for plotting and analyzing mathematical functions. Our mission is to "Be a go-to plot library with a CLI, be the jq of formulae visualisations."

## Overview

This tool provides a robust CLI with multiple modes including interactive, server, diagnostics, and various export and plotting options. It offers a wide range of plotting functionalities from basic functions (sine, cosine, exponential, logarithmic, quadratic, linear) to advanced visualizations (enhanced spiral, polar heatmap, dual axis, box plot, violin plot, damped oscillation, harmonics, modulated sine, statistical summary, parametric plot, cumulative average, inverse function plot, custom fancy plot, detailed sine-cosine plot, interactive guide, complex combined plot).

## Changelog

- Initial implementation with basic and extended plotting functions.
- Added advanced features: box plot, violin plot, damped oscillation, spiral colored, dual axis, harmonics, modulated sine, statistical summary, parametric plot, cumulative average, inverse function plotting.
- Added new features: custom fancy plot, interactive guide output, detailed sine-cosine plot (--plot-detailed flag), and complex combined plot (plotComplexFunctionReal).
- Enhanced internal logging and error handling to improve testability.
- Improved test coverage to nearly 100% with comprehensive unit tests and mocks for external resources.
- Updated documentation to align with CONTRIBUTING.md guidelines and prune outdated content.

## Key Features

- **Wide Range of Plots:**
  - Basic plots: Sine, Cosine, Exponential, Logarithmic, Quadratic, Linear.
  - Advanced visualizations: Enhanced spiral, Polar heatmap, Dual axis, Box plot, Violin plot, Damped oscillation, Harmonics, Modulated sine, Statistical summary, Parametric plot, Cumulative average, Inverse function plot, Custom fancy plot, Detailed sine-cosine plot, Interactive guide, Complex combined plot.

- **Multiple Output Formats:**
  - Generate outputs in CSV, Markdown, JSON, HTML, ASCII, SVG, XML, LaTeX, TXT, and more.

- **Analytical Functions:**
  - Calculate derivatives, approximate integrals, compute moving averages, and perform other statistical analyses.

- **Flexible CLI:**
  - Use flags like `--interactive`, `--serve`, `--diagnostics`, and various export and plotting options.
  - New flag `--plot-detailed` provides a detailed sine-cosine plot with additional statistics.
  - Easily reset overrides with `--reset` and use `--debug` for detailed function listings.

## Installation

**Prerequisites:** Node.js v20 or higher.

Install via npm:

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## Usage

Run the default demo:

```bash
npm run start
```

Other common commands:

- **Diagnostics:** `npm run diagnostics`
- **Interactive Mode:** `node src/lib/main.js --interactive`
- **Server Mode:** `node src/lib/main.js --serve`
- **Export Options:** Use flags like `--export-csv`, `--export-json`, etc.
- **Plot Options:** Use flags like `--plot-custom-fancy`, `--plot-detailed`, `--interactive-guide`, `--plot-complex` etc.
- **Reset Overrides:** `node src/lib/main.js --reset`
- **Debug Mode:** `node src/lib/main.js --debug`

## Testing

The project includes a comprehensive test suite using Vitest to ensure close to 100% code coverage. Tests cover CLI modes, plotting functions, and error handling for external resource loading. Run the tests with:

```bash
npm test
```

## Contributing

We welcome contributions! Please follow these steps:

1. **Open an Issue:**  
   Describe bugs, suggest improvements, or propose new features by opening an issue in the repository.
2. **Label as `automated`:**
   This triggers our automated workflow.
3. **Submit a Pull Request:**
   Include detailed commit messages and tests. See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

## License

MIT
