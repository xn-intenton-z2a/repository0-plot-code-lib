# ADVANCED_PLOTTING Feature Specification

## Description
This feature consolidates and expands the advanced plotting capabilities available in the CLI. By activating the `--advanced` flag, users can access a suite of specialized plot types that go beyond basic visualizations. Supported advanced plots include:
- Spiral
- Polar Heatmap
- Dual Axis
- Box Plot
- Violin Plot
- Cumulative Average
- Inverse Function
- Modulated Sine
- Extended 3D Plot

These advanced options allow users to visualize complex mathematical functions and datasets, catering to both exploratory data analysis and detailed, publication-ready visualizations.

## Motivation
- **Expanded Visualization Options:** Provides users with a wide array of plot types to capture intricate data relationships and advanced mathematical functions.
- **Enhanced Data Analysis:** Facilitates deeper insights by offering specialized visualizations for phenomena that require more than standard plot types.
- **Mission Alignment:** Strengthens our mission to be the go-to plotting tool for formula-based visualizations by incorporating both basic and advanced plotting techniques in one cohesive environment.

## Implementation Details
1. **CLI Integration:**
   - Introduce the `--advanced` flag in the CLI to activate advanced plotting mode.
   - Interpret the first parameter following the flag as the advanced plot type (e.g., `spiral`, `polarHeatmap`, etc.) and subsequent parameters as configuration values.
   - Leverage the existing numeric parameter validation logic to handle comma-separated numeric tokens, with special handling for the token 'NaN'.

2. **Advanced Plot Functions:**
   - Consolidate advanced plotting functions into an `advancedPlots` module which includes implementations for each advanced plot type.
   - Each function in the module processes the provided parameters, logs the plot action, and generates the specialized visualization.
   - Provide clear error messages if an unknown plot type is specified or if parameters are invalid.

3. **Testing and Documentation:**
   - Extend unit tests to cover various advanced plot scenarios, ensuring each advanced plot type is properly validated and executed.
   - Update the README and CONTRIBUTING documentation with detailed examples of how to invoke advanced plotting via the CLI.
   - Include sample commands and usage guidelines for each of the advanced plotting modes.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js --advanced spiral "param1,param2,..."
  ```
- **Alternate Example:**
  ```bash
  node src/lib/main.js --advanced polarHeatmap "data:1,2,3,4"
  ```
