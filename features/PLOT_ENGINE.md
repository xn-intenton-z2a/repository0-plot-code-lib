# PLOT_ENGINE

## Overview
This update extends the core plotting module to not only enhance expression parsing, asynchronous plotting, and caching but also to integrate advanced analysis functionalities. In addition to generating plots from various mathematical expressions, the updated PLOT_ENGINE will now support numerical analysis such as area under curve (using the trapezoidal rule), derivative calculation (via finite differences), and basic statistical computations (average, standard deviation, median, mode) as well as transformations (rotation, reflection, scaling, inversion, smoothing).

## Key Objectives
- **Expression Parsing & Validation:**
  - Continue to process and validate plot specification strings with prefixes like "quad:" and "expr:".
  - Support both legacy and modern input protocols with integration of mathjs for syntactic and semantic checks.

- **Enhanced Plot Generation:**
  - Maintain support for various plot types (quadratic, linear, trigonometric, polar, exponential, logarithmic, etc).
  - Implement asynchronous evaluation to ensure responsive performance during heavy computations.

- **Advanced Analysis Integration:**
  - **Area Under Curve:** Calculate the area under the plotted curve using the trapezoidal rule.
  - **Derivative Calculation:** Compute approximate derivatives using finite differences for better insight into the behavior of functions.
  - **Statistical Functions:** Offer basic statistical metrics including mean, standard deviation, median, and mode for the generated data points.
  - **Transformations:** Provide functions for rotation, reflection, scaling, and smoothing of plots (e.g., moving average) to aid further data analysis.

- **Robust Logging & Caching:**
  - Leverage existing asynchronous processing and caching mechanisms to log both plotting and analysis operations.
  - Integrate detailed error handling to capture issues arising from both plotting and analysis computations.

## Design & Implementation
### Parser and Evaluation
- Refine the parser module (e.g., `src/lib/parser.js`) to not only validate expressions but also to route the computed data to the new analysis routines.
- Continue using mathjs for robust validation and introduce new helper functions for numerical analysis.

### Analysis Routines
- Implement numerical methods for:
  - **Area Under Curve:** Using the trapezoidal rule over computed plot data points.
  - **Derivative Calculation:** Approximating derivatives via finite differences.
  - **Statistics:** Calculating average, standard deviation, median, and mode from the data set.
  - **Data Transformations:** Applying rotation, reflection, scaling, inversion, or smoothing (e.g., moving average) to the plot data.
- Embed these routines directly within the PLOT_ENGINE to ensure a streamlined user experience.

### CLI and Integration
- Update `src/lib/main.js` to handle extended plotting requests that include analysis. Optionally, use a modifier flag (e.g., `--analyze`) within the plot specification to trigger analysis routines along with the plot generation.
- Expand logging to include both plotting and analysis outputs, ensuring that the user is informed of both processes concurrently.

### Testing and Documentation
- Develop additional unit tests to cover the new analysis functionality, ensuring coverage for area calculation, derivative approximation, and statistical metrics.
- Update user documentation (README.md and CONTRIBUTING.md) to include examples for invoking advanced analysis alongside plot generation.

## Usage Examples

- **Generate Plot with Analysis:**
  ```bash
  node src/lib/main.js output.svg "expr:Math.sin(x)*x:-10,10,0.5 --analyze"
  ```

- **Standard Plot Generation:**
  ```bash
  node src/lib/main.js output.svg "quad:1,0,0,-10,10,1"
  ```

This integration reinforces the mission of providing a versatile, go-to plotting tool by merging visualisation and advanced numerical analysis within a single, cohesive module.
