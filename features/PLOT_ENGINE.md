# PLOT_ENGINE

The PLOT_ENGINE remains the core plotting module, now enhanced with additional statistical visualizations to better fulfill our mission of being the go-to plot library for formulae visualisations. This update consolidates the plotting capabilities, ensuring the module remains robust, extensible, and streamlined for both command-line and web-based usage.

## Overview

The updated PLOT_ENGINE now supports:

- **Plot Generation:** Conversion of a wide range of mathematical functions into visual plots. Beyond the existing support for quadratic, linear, sine, cosine, exponential, and logarithmic plots, the engine has been extended with:
  - **Tangent Plots:** Visualization of tangent functions.
  - **Polar Plots:** Radial and angular representations for polar equations.
  - **Parametric Plots:** Support for functions described by parametric equations.
  - **Inverse Function Plots:** Graphs representing inverse relationships.
  - **Cumulative Average & Gradient Visualization:** Display of running averages and detailed gradient heatmaps.
  - **Box Plot & Violin Plot:** New statistical plot types for representing data distributions to enhance the analytical capabilities of the module.

- **Mode Integration:**
  - **CLI Mode:** Generate plots directly via command-line with options for file output and summary results.
  - **Interactive Mode:** Real-time user input prompting and immediate feedback.
  - **Web Interface:** An Express-based HTTP API for dynamic plotting requests.

- **Advanced Analysis & Transformations:**
  - **Area Under Curve (AUC):** Computed using the trapezoidal rule.
  - **Derivative Calculation:** Estimation via finite differences, now enhanced with gradient visualizations.
  - **Statistical Metrics:** Calculation of average, standard deviation, median, and mode, supplemented with box and violin plots for distribution insights.
  - **Data Transformations:** Operations including rotation, reflection, scaling, inversion, and smoothing (moving average).

- **Robust Error Handling:** Detailed, consistent error messages ensuring graceful exits and clear diagnostics in response to invalid inputs.

## Design

### Input Parsing

- **Command-line Arguments:** The first argument specifies the output type (file or option), and subsequent arguments define the mathematical formula (e.g., `quad:1,0,0,-10,10,1`). Additional flags such as `--interactive` or `--serve` modify the operation mode.

### Plot Computation & Construction

- **Formula Evaluation:** Leveraging the mathjs library to process mathematical expressions across defined ranges.
- **Plot Construction:** Building visual outputs in multiple formats (SVG, ASCII, CSV, JSON, Markdown, HTML) based on evaluated data.
- **Extended Statistical Plots:** Addition of box plots and violin plots to visually summarise statistical properties of the dataset.

### Output Generation

- The module generates outputs containing both the visual plot and associated analytical results.
- Detailed output formatting is applied to ensure clarity and utility in both CLI and web contexts.

## Usage

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

## Integration & Maintenance

- **Self-Contained Module:** The PLOT_ENGINE is designed for deployment as a single repository module.
- **Testing & Quality Assurance:** Comprehensive unit tests (using vitest) cover plotting, statistical computation, and error handling.
- **Contribution Guidelines:** Developers are encouraged to adhere to the repository style guidelines and ensure that any new functionality is accompanied by appropriate tests and documentation updates.
