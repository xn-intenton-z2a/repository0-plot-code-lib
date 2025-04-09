# PLOT_ENGINE

## Overview
This feature is the core plotting and diagnostics engine of the repository. It provides robust plot generation, enhanced debug logging, and integrated advanced numerical analysis. In this update, we extend the existing capabilities by not only including smoothing (moving average) functionality but also adding a new cumulative average analysis. This addition will help users better understand trends in their data by providing a running average alongside other statistical measures.

## Key Objectives
- **Comprehensive Plot Generation:** Continue to support various plot types (quadratic, linear, sine, cosine, tangent, polar, exponential, logarithmic, etc.) with consistent parsing and visualization.
- **Enhanced Input Validation:** Utilize advanced parsing (using mathjs) to verify mathematical expressions and provide clear and actionable error messages.
- **Integrated Debug Logging:** Ensure detailed logging during plotting and analysis processes when the `--debug` flag is provided, covering formula parsing, computation steps, and intermediate data.
- **Advanced Numerical Analysis:** 
  - Compute derivatives using finite difference methods.
  - Evaluate the area under a curve with numerical integration techniques such as the trapezoidal rule.
  - Provide basic statistical functions (average, standard deviation, median, mode) on plot data.
  - Support geometric transformations including rotation, reflection, scaling, and inversion.
  - **Smoothing (Moving Average):** Reduce noise in data series, enabling clearer visualization of trends.
  - **Cumulative Average Calculation:** Compute a running average over data points to highlight overall trend dynamics, useful for identifying long-term patterns.
- **Multi-Modal Support:** Seamlessly handle plotting, debugging, and analysis across CLI commands, interactive REPL sessions, and the Express-based web interface.
- **Robust Error Diagnostics:** Augment error handling with detailed diagnostic feedback to assist users in quickly resolving issues.

## Design & Implementation
### Core Plotting and Analysis
- Leverage existing core plotting functions to process plot specifications and generate visual outputs.
- Integrate additional numerical analysis routines including the smoothing and cumulative average modules.

### Numerical Analysis Module
- Extend the current module to include a function for moving average calculation to smooth out data fluctuations.
- Introduce a new function to compute the cumulative average of data series. This will accumulate the average value as data points are processed, providing insight into the evolving mean of the dataset over time.
- Ensure all analytical functions are accessible when the `--analyze` flag is provided alongside other CLI flags.

### CLI and API Integration
- Enhance the CLI parser to support an optional `--analyze` flag that triggers advanced analysis routines, including both smoothing and cumulative average calculations.
- Maintain a unified logger to output all analysis steps when debug mode is enabled.

### Testing & Quality Assurance
- Extend the unit test suite to include tests for the smoothing function and the new cumulative average calculation, alongside tests for derivative calculations, area estimations, transformation functions, and statistical computations.
- Update documentation, including README and CONTRIBUTING guides, to detail the new cumulative average functionality and provide usage examples.

## Usage Examples
- **Standard Plot Generation with Analysis:**
  ```bash
  node src/lib/main.js output.svg "quad:1,0,0,-10,10,1" --analyze
  ```
- **Debug Mode with Advanced Analysis (including Smoothing and Cumulative Average):**
  ```bash
  node src/lib/main.js output.svg "sine:1,1,0,0,360,30" --debug --analyze
  ```
- **Interactive Mode with Analysis Enabled:**
  ```bash
  node src/lib/main.js --interactive --analyze
  ```

This update to the PLOT_ENGINE consolidates robust plot generation with advanced numerical analysis, now enhanced with both smoothing and cumulative average functionalities, further supporting the repository’s mission of being the go-to tool for versatile and comprehensive mathematical visualizations.