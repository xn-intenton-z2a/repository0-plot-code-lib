# PLOT_ENGINE

## Overview
This feature is the core plotting and diagnostics engine of the repository. It now integrates extended plot types alongside the existing functionalities. In addition to the traditional plots (quadratic, linear, sine, cosine, tangent, polar, exponential, logarithmic), the updated PLOT_ENGINE provides support for new plot types such as dual axis plots, box plots, and violin plots. This enhancement further empowers users to analyze and visualize complex data patterns while maintaining robust numerical analysis capabilities including smoothing, cumulative average, derivative calculations, and area under the curve estimations.

## Key Objectives
- **Comprehensive Plot Generation:**
  - Support for traditional plot types: quadratic, linear, sine, cosine, tangent, polar, exponential, and logarithmic.
  - **Extended Plot Types:** Introduce dual axis plots for comparing two related data series, box plots for statistical distribution, and violin plots for a detailed view of data density.
- **Advanced Numerical Analysis:**
  - Perform derivatives calculations using finite difference methods.
  - Compute numerical integration (area under curve) via the trapezoidal rule.
  - Provide statistical functions such as average, standard deviation, median, mode, smoothing (moving average), and cumulative average calculations.
- **Robust Debug Logging:**
  - Detailed logging for plot computations, parsing, and analysis when the `--debug` flag is enabled.
- **CLI and API Integration:**
  - Enhance CLI flags to support new analysis features with an optional `--analyze` flag, ensuring smooth integration with both interactive and web interfaces.

## Extended Plot Types
- **Dual Axis Plotting:** Facilitate the visualization of two related datasets on different axes for direct comparison within one plot.
- **Box Plot:** Provide statistical summaries including quartiles and outliers, enabling effective distribution analysis.
- **Violin Plot:** Combine box plot features with a rotated kernel density plot for detailed examination of data distribution.

## Design & Implementation
- **Core Integration:**
  - Leverage existing plotting functions and extend them to accommodate the new plot types.
  - Ensure input validation, error handling, and consistent logging across all plot types.
- **Modular Enhancements:**
  - Implement additional functions for dual axis, box, and violin plotting within the numerical analysis module.
  - Maintain backward compatibility with existing plot specifications.
- **Testing & Documentation:**
  - Expand the unit tests to cover all extended plot types and analytical functions (including smoothing and cumulative average).
  - Update README and CONTRIBUTING documentation with new usage examples.

## Usage Examples
- **Generating a Dual Axis Plot:**
  ```bash
  node src/lib/main.js dual_axis.svg "dual:dataset1,0,10,1;dataset2,0,10,1"
  ```
- **Creating a Box Plot with Analysis:**
  ```bash
  node src/lib/main.js boxplot.svg "box:1,2,3,4,5,6,7,8,9" --analyze
  ```
- **Debug Mode with Extended Plot Types:**
  ```bash
  node src/lib/main.js debug_plot.svg "violin:dataset" --debug --analyze
  ```

This update to the PLOT_ENGINE solidifies its role as the heart of the repository, empowering users with an even broader array of plotting options and in-depth numerical analysis to better visualize and interpret their data.