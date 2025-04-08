# PLOTTING_ENGINE Feature Specification

## Description
This feature consolidates both basic and advanced plotting capabilities into one unified engine. It integrates dynamic data-driven axis scaling with a variety of plotting modes, including scatter, ASCII art plotting, and trendline overlays, as well as a set of advanced plotting functions (e.g., spiral, polar heatmap, dual axis, box plot, violin plot, cumulative average, inverse function, modulated sine, and extended 3D plot). The module is designed to work seamlessly through both a command-line interface (CLI) and a web interface.

## Motivation
- **Enhanced Usability:** Users can effortlessly switch between simple and complex plotting functionalities within a single tool, reducing the need to learn multiple interfaces.
- **Streamlined Workflow:** Combining basic and advanced modes minimizes configuration overhead, leveraging shared routines for pre-processing (such as auto-scaling) to ensure consistency across outputs.
- **Mission Alignment:** By offering a comprehensive plotting solution, this feature supports our mission to be the go-to plot library for formula-based visualizations, whether for quick CLI checks or detailed, high-quality web outputs.

## Implementation Details
1. **Unified Plotting Functionality:**
   - Merge auto-scaling and basic plotting (e.g., scatter, ASCII, trendline) with advanced plotting functions (spiral, polar heatmap, dual axis, etc.).
   - Introduce an integrated CLI flag (`--plot-engine`) for standard operations and an additional flag (`--advanced`) to invoke advanced plotting routines.

2. **CLI and Web Interface Support:**
   - Enhance CLI parameter validation and error reporting, ensuring detailed messages for invalid numeric inputs, including the special handling of 'NaN'.
   - Update the web interface to include configuration panels that allow users to select between basic and advanced plotting modes, preview auto-scaled outputs, and adjust parameters interactively.

3. **Rendering Pipeline Enhancements:**
   - Establish a common pre-processing step for calculating optimal axis ranges, tick intervals, and grid layouts applicable to all plotting modes.
   - Route rendering logic based on the selected mode, while maintaining consistent error handling, theming, and output formatting.

4. **Testing and Documentation:**
   - Expand unit and integration tests to cover both CLI and web interactions, ensuring robust operation across all plotting modes.
   - Update the README and CONTRIBUTING documentation with comprehensive examples and guidelines for both basic and advanced plotting usage.

## Usage

- **CLI Example (Basic Plot):**
  ```bash
  node src/lib/main.js --plot-engine "mode:scatter;scaling:auto;params:1,NaN,5,-10,10,1"
  ```

- **CLI Example (Advanced Plot):**
  ```bash
  node src/lib/main.js --advanced spiral "params:..."
  ```

- **Web Interface Example:**
  - Start the web server using `npm run start:web`.
  - Navigate to the plotting configuration panel to select between basic and advanced modes, adjust parameters, and view a live preview of auto-scaled outputs.
