# `plot-code-lib`

## Overview

`plot-code-lib` is a demo repository that showcases GitHub workflows imported from intentïon agentic‑lib. It serves as a seed for the Equation Plotter — a CLI tool that generates plots for mathematical functions including quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic functions. The tool supports multiple output formats (SVG, JSON, CSV, Markdown, ASCII, and HTML).

- **Interactive Mode:** Allows real-time user input via the `--interactive` flag. The interactive mode now includes improved error handling, resource cleanup, and an option (`--stats`) to display summary statistics for the plotted data.
- **Default Behavior:** When no arguments are provided, the CLI prints a usage message, outputs a demo SVG file (`output.svg`) with example plots, and terminates immediately.
- **Automatic Format Selection:** The output format is inferred from flags or the extension of the output file name (e.g., `.md` for Markdown).
- **Improved Consistency:** The code has been refactored for better consistency and formatting in line with our contributing guidelines. Linting issues were resolved by addressing regex warnings and ensuring proper trailing commas per Prettier guidelines.
- **Extended Functionality:** In addition to various plot types, the tool now supports tangent plotting, advanced query filtering, summary statistics, plot rotation, and new geometric computations (centroid and bounding box calculations).

**Version:** Equation Plotter Library version 0.2.1-12

Generated using:
```bash
npm run start output.svg
```
[Example output](examples/output.png)

## What’s Inside

- **GitHub Workflows:**
  Workflows in the `.github/workflows/` directory consume reusable workflows from intentïon agentic‑lib.

- **Source Code:**
  The main functionality is implemented in `src/lib/main.js`, including plotting logic, formula parsing, CLI management, summary statistics, rotation, advanced query filtering, and new geometric computations. It follows the guidelines outlined in [CONTRIBUTING.md](CONTRIBUTING.md) and reflects our mission: "Be a go-to plot library with a CLI, be the jq of formulae visualisations." 

- **Dependencies:**
  Refer to `package.json` for dependencies required for CLI argument parsing, file generation, testing, and various output conversions.

- **Tests:**
  Unit tests in the `tests/unit/` directory validate core functions, CLI behavior (including interactive mode and default demo output), error handling, and additional exported functions. New tests ensure that summary statistics, tangent plotting, rotation, advanced query filtering, and geometric computation functions (centroid and bounding box) are correctly handled.

## Running the CLI

- **No Arguments (Default Demo Output):**
  When run without arguments, the CLI prints a usage message, creates an `output.svg` file with demo plots, and terminates immediately. For example:
  ```bash
  node src/lib/main.js
  ```

- **Generate JSON Output:**
  ```bash
  node src/lib/main.js output.json "sine:1,1,0,0,360,30"
  ```

- **Generate CSV Output:**
  ```bash
  node src/lib/main.js output.csv "quad:1,0,0,-10,10,1"
  ```

- **Generate Markdown Output:**
  (Automatically detected if the output file ends with `.md` or using the `--md` flag):
  ```bash
  node src/lib/main.js output.md "y=2x+3:-10,10,1"
  ```

- **Generate ASCII Art Output:**
  ```bash
  node src/lib/main.js output.txt "sine:1,1,0,0,360,30"
  ```

- **Generate HTML Output with Grid Overlay:**
  ```bash
  node src/lib/main.js output.html --grid "y=2x+3:-10,10,1"
  ```

- **Display Summary Statistics:**
  Use the `--stats` flag to output summary statistics alongside the file generation.
  ```bash
  node src/lib/main.js output.svg --stats "quad:1,0,0,-10,10,1"
  ```

- **Rotate Plots:**
  Use the `--rotate [angle]` flag to rotate the plot outputs by the specified angle in degrees. For example:
  ```bash
  node src/lib/main.js output.svg --rotate 90 "quad:1,0,0,-10,10,1"
  ```

- **Interactive Mode:**
  ```bash
  node src/lib/main.js --interactive
  ```
  You will be prompted to enter semicolon-separated formula strings.

Other available flags include `--help`/`-h` for help and `--version` to display version information.

## Contributing

We welcome contributions to improve `plot-code-lib`. Please follow these steps:

1. **Open an Issue:** Describe your idea, report a bug, or suggest an improvement by opening an issue in our repository.
2. **Label It as `automated`:** This triggers our automated contribution workflow, guided by our [CONTRIBUTING.md](CONTRIBUTING.md) guidelines.
3. **Submit Your Changes:** Ensure your changes adhere to our code standards, including proper formatting and linting. Contributions are reviewed based on our mission: "Be a go-to plot library with a CLI, be the jq of formulae visualisations." 

Refer to [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on our automated workflow and contribution process.

## Future Enhancements

- **Advanced Rotation and Custom Titles:** Allow users to specify rotation angles and custom plot titles.
- **Enhanced Summary Statistics:** Further refine the statistical calculations for plot data.
- **PNG Conversion:** Expand the PNG export functionality beyond the current stub.
- **Enhanced Interactive Mode:** Streamline real-time user interactions and improve error handling.
- **Additional Plot Types:** Explore adding support for more mathematical functions.
- **Advanced Query Filtering:** Utilize the new `advancedQueryPlotData` function to allow complex filtering scenarios, reinforcing our commitment to flexible data analysis.
- **Geometric Computations:** Added functions to calculate the centroid and bounding box of plot data.

## Linting

ESLint and Prettier are used to maintain code quality and formatting. In this release, regex warnings have been addressed and missing trailing commas added per Prettier guidelines.

## Test Coverage

Unit tests covering core CLI functions, exported methods, error handling, and new features such as summary statistics, rotation, advanced query filtering, and geometric computations are located in the `tests/unit/` directory.

## Tuning the Agentic Coding System

As the project evolves, please review the following files as needed:

- `README.md`
- `package.json`
- `src/lib/main.js`
- `tests/unit/main.test.js`
- `CONTRIBUTING.md`
- `eslint.config.js`

## Change Log

- Updated mission statement to "Be a go-to plot library with a CLI, be the jq of formulae visualisations." and pruned outdated feature references.
- Added support for advanced query filtering, summary statistics, and plot rotation.
- Added new geometric computation functions: computeCentroid and computeBoundingBox.
- Retained PNG conversion stub as a placeholder for future implementation.
