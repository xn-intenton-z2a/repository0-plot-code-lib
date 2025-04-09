# PLOT_ENGINE

The PLOT_ENGINE feature is the core of our repository, designed to convert mathematical formulae into visual plots and now extended with analytical capabilities. This feature is a self-contained module that can handle multiple output formats and modes, including direct CLI plots, an interactive mode, and a web interface via an Express server.

# Overview

The updated PLOT_ENGINE now includes:

- **Plot Generation:** Conversion of formulae (e.g., quadratic, linear, sine, cosine, exponential, logarithmic) into visual plots in various formats such as SVG, ASCII, CSV, JSON, Markdown, and HTML.

- **Mode Integration:**
  - **CLI Mode:** Generates a plot file directly and prints a summary to the console.
  - **Interactive Mode:** Prompts for user input with real-time feedback.
  - **Web Interface:** Launches an Express server with HTTP endpoints for plotting.

- **Advanced Analysis:**
  - **Area Under Curve (AUC):** Computes the area under a function curve using the trapezoidal rule.
  - **Derivative Calculation:** Uses finite differences for estimating the derivative of functions.
  - **Statistical Metrics:** Calculate average, standard deviation, median, and mode of plotted data.
  - **Data Transformations:** Offers operations such as rotation, reflection, scaling, and inversion on plots.

- **Robust Error Handling:** Ensures graceful exits and informative error messages on invalid input or calculation errors.

# Design

## Input Parsing

- Accept command-line arguments with the first argument as the output target (e.g., output file or CLI flag) and the second as the formula definition (e.g., `quad:1,0,0,-10,10,1`).
- Support additional flags such as `--interactive` and `--serve` to initiate different operational modes.

## Plot Computation & Analysis

- **Formula Evaluation:** Leverage the mathjs library to parse and evaluate mathematical expressions over a defined range.
- **Plot Construction:** Generate plot visuals based on the evaluated data and supported plot types.
- **Analytical Extensions:** Calculate area under the curve, numerical derivatives, and statistical measures. Implement transformation operations to modify the plot data.

## Output Generation

- Dynamically produce the desired output format (SVG, ASCII, CSV, JSON, Markdown, HTML) based on user parameters.
- Integrate analytical results within the output when applicable.
- Maintain robust error handling for incorrect inputs or edge cases.

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

# Examples

1. **Basic Quadratic Plot with Analysis:**
   Generates a quadratic plot with computed area under the curve and derivative information.
   ```bash
   node src/lib/main.js quad.svg "quad:1,0,0,-10,10,1"
   ```

2. **Linear Plot with Statistical Metrics:**
   Computes average, standard deviation, and other statistics alongside a linear plot.
   ```bash
   node src/lib/main.js linear.svg "linear:2,3,-10,10,1"
   ```

3. **Custom Expression Plot with Transformations:**
   Applies rotation, reflection, or scaling transformations and computes the derivative of the data.
   ```bash
   node src/lib/main.js expression.svg "expr:Math.sin(x)*x:-10,10,0.5"
   ```

# Integration & Maintenance

- The updated PLOT_ENGINE is maintained in a single repository file for simplicity.
- Unit tests using vitest ensure the reliability of both plotting and analytical computations.
- Contributions should follow the guidelines in CONTRIBUTING.md to maintain code quality and consistency.
