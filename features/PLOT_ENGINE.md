# PLOT_ENGINE

The PLOT_ENGINE feature remains the core plotting module of our repository, providing a versatile and unified interface for visualizing mathematical functions and performing analytical computations. This update expands its capabilities with additional supported plot types that align with our mission of offering a go-to plot library for formulae visualisations.

# Overview

The updated PLOT_ENGINE now supports:

- **Plot Generation:** Conversion of a wide range of mathematical functions into visual plots. Beyond existing support for quadratic, linear, sine, cosine, exponential, and logarithmic plots, the module now includes:
  - **Tangent Plots:** Visualization of tangent functions.
  - **Polar Plots:** Radial and angular representations for polar equations.
  - **Parametric Plots:** Support for plotting functions defined by parametric equations.
  - **Inverse Function Plots:** Graphs for inverse relationships.
  - **Cumulative Average & Gradient Visualization:** Display of cumulative averages and gradient heatmaps to provide deeper insight into function dynamics.

- **Mode Integration:**
  - **CLI Mode:** Generate plots directly via command-line with file output and summary information.
  - **Interactive Mode:** Real-time input prompting and feedback.
  - **Web Interface:** An Express server providing HTTP endpoints for dynamic plotting.

- **Advanced Analysis & Transformations:**
  - **Area Under Curve (AUC):** Calculation using the trapezoidal rule.
  - **Derivative Calculation:** Estimation via finite differences, now extended with gradient visualization.
  - **Statistical Metrics:** Computation of average, standard deviation, median, and mode of plotted data.
  - **Data Transformations:** Operations such as rotation, reflection, scaling, inversion, and smoothing (moving average).

- **Robust Error Handling:** Detailed error messages and graceful exits for invalid input scenarios.

# Design

## Input Parsing

- Command-line arguments are parsed where the first argument designates the output target (file or CLI option) and the second describes the formula (e.g., `quad:1,0,0,-10,10,1`).
- Additional flags such as `--interactive` and `--serve` are used to switch between operation modes.

## Plot Computation & Analysis

- **Formula Evaluation:** Uses the mathjs library to evaluate mathematical expressions over a specified range.
- **Plot Construction:** Based on evaluated data, the engine builds the corresponding visual representation supporting multiple output formats.
- **Extended Plot Types:** Incorporates tangent, polar, parametric, inverse, cumulative average, and gradient visualization, expanding the analytical capabilities of the earlier version.

## Output Generation

- The module dynamically generates desired outputs in formats including SVG, ASCII, CSV, JSON, Markdown, and HTML.
- Analytical results are integrated with the visual plots when applicable.
- Consistent and robust error handling ensures correct responses to any user errors or edge cases.

# Usage

### CLI Plot Generation

```bash
node src/lib/main.js output.svg "quad:1,0,0,-10,10,1"
```

### Interactive CLI

```bash
node src/lib/main.js --interactive
```

### Web Interface

```bash
node src/lib/main.js --serve
```

# Integration & Maintenance

- The updated PLOT_ENGINE is maintained as a self-contained module suitable for a single repository deployment, following the guidelines in CONTRIBUTING.md.
- Unit tests (using vitest) ensure reliability across both the plotting and analytical components.
- Contributions should adhere to repository style guides and ensure that new features are covered by corresponding tests.
