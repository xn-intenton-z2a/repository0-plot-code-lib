# ADVANCED_PLOTS Feature Specification

## Description
Introduce a dedicated module for advanced plotting functionalities. This module will encapsulate all advanced plot types (such as spiral, polar heatmap, dual axis, box plot, violin plot, cumulative average, inverse, modulated sine, and extended 3D) that are currently inlined in the main module. Extracting these functions into a separate module improves code clarity, maintainability, and testability.

## Motivation
- **Modularity:** Separates advanced plotting logic from the core engine, making the codebase easier to manage.
- **Testability:** Facilitates unit testing of each advanced plotting function in isolation.
- **Extensibility:** Simplifies adding new advanced plot types and enhancements without impacting the core engine or parameter validation logic.

## Implementation Details
1. **Module Extraction:**
   - Create a new module file (e.g., `src/lib/advancedPlots.js`).
   - Move all advanced plotting functions (spiral, polarHeatmap, dualAxis, boxPlot, violinPlot, cumulativeAverage, inverse, modulatedSine, extended3D) from `src/lib/main.js` into this new module.
   - Export each function as named exports, so they can be imported and used by both the CLI and the web interface.

2. **Integration:**
   - Update `src/lib/main.js` to import the advanced plotting functions from `src/lib/advancedPlots.js` instead of relying on inline definitions.
   - Ensure the CLI logic properly maps the `--advanced` flag to call the corresponding functions from the new module.
   - Verify that the web interface endpoints (e.g., POST `/plot`) correctly utilize the functions from the advanced plots module.

3. **Testing and Documentation:**
   - Extend the unit tests to cover each advanced plotting function, ensuring they handle parameters and error conditions correctly.
   - Update the documentation in README and CONTRIBUTING files to reflect the new module structure and usage examples.

## Usage Examples
- **CLI Example for Advanced Plotting:**
  ```bash
  node src/lib/main.js --advanced spiral "quad:1,NaN,5,-10,10,1"
  ```
- **Web Example:**
  The HTTP endpoints should be updated to import and use functions from the advanced plots module for processing plotting requests.
