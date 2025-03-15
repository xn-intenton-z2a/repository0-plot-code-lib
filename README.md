# repository0-plot-code-lib

repository0-plot-code-lib is a versatile CLI tool for plotting and analyzing mathematical functions. Our mission is to "Be a go-to plot library with a CLI, be the jq of formulae visualisations." This tool supports a broad range of plotting functionalities—from basic functions like sine, cosine, exponential, and logarithmic plots to advanced visualizations including enhanced spiral, polar heatmap, dual axis, box plot, violin plot, damped oscillation, harmonics, modulated sine, statistical summary, parametric plot, cumulative average, inverse function plotting, enhanced parametric plots, random walk and phyllotaxis plots, and more. Recent updates include extended 3D plotting, enhanced exponential decay plotting functions, a new modulo plotting function, a scatter plot function, and significant improvements in test coverage with enhanced external resource mocks.

## Overview

This tool offers a robust command-line interface with multiple modes:

- **Interactive Mode:** Launch an interactive session to input commands.
- **Server Mode:** Run a basic Express server.
- **Diagnostics Mode:** Check runtime diagnostics.
- **Various Export/Plot Modes:** Generate plots and exports in formats like CSV, JSON, Markdown, HTML, ASCII, SVG, XML, LaTeX, TXT, and more.

Advanced flags such as `--plot-detailed`, `--plot-cumprod`, `--plot-ema`, `--plot-exp-sine`, `--plot-cos-cumsum`, `--plot-enhanced-parametric`, `--plot-random-walk`, `--plot-phyllotaxis`, `--plot-spiral-3d`, `--plot-exp-decay-enhanced`, `--plot-modulo`, and `--scatter` provide extended capabilities. 

**Changelog**

- **Drift Pruning:** Removed legacy demo implementations and pruned code drift to remain aligned with our mission statement.
- **Documentation & Messaging:** Updated inline documentation, error messages, and CLI help to clearly reference CONTRIBUTING guidelines.
- **Enhanced Testing:** Improved test coverage with deeper external resource mocks for a more robust integration.
- **New Features:** Added functions such as `plotRandomWalkReal`, `plotPhyllotaxisReal`, `mockExternalResourceTest`, `plotSpiral3DReal`, `plotExponentialDecayEnhancedReal`, `plotModuloReal`, and `plotScatterReal` to extend the library's capabilities.

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
- **Export Options:** e.g., `--export-csv`, `--export-json`, etc.
- **Plot Options:** e.g., `--plot-custom-fancy`, `--plot-detailed`, `--interactive-guide`, `--plot-enhanced-parametric`, `--plot-random-walk`, `--plot-phyllotaxis`, `--plot-spiral-3d`, `--plot-exp-decay-enhanced`, `--plot-modulo`, `--scatter`, etc.
- **Test Coverage Hook:** `node src/lib/main.js --test-coverage-hook`
- **Reset Overrides:** `node src/lib/main.js --reset`
- **Debug Mode:** `node src/lib/main.js --debug`

## Testing

The project includes a comprehensive test suite with Vitest. Run the tests with:

```bash
npm test
```

### Mocking External Resources

The test suite includes mocks for external modules such as Express and Readline to ensure robust testing of network and file system dependencies. Use functions like `testCoverageHook` and `mockExternalResourceTest` for deep external resource testing.

## Contributing

We welcome contributions! Please follow these steps:

1. **Open an Issue:** Describe your idea, report a bug, or suggest an improvement by opening an issue in our repository.
2. **Label as `automated`:** This triggers our automated contribution workflows.
3. **Submit a Pull Request:** Include detailed commit messages and tests. See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

## License

MIT
