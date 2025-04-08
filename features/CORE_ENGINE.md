# CORE_ENGINE Feature Specification (Updated)

## Description
This feature unifies the core functionalities of the plotting library by integrating CLI plotting, numeric parameter validation (via the PARAM_VALIDATION module), and advanced plotting. In this update, advanced plotting implementations in the main CLI file will be extracted into a dedicated module (e.g., `src/lib/advancedPlots.js`) to improve maintainability, separation of concerns, and ease of testing. The updated engine continues to support both CLI and web interface endpoints.

## Motivation
- **Streamlined Workflow:** Centralizes all core operations (plotting, data processing, validation, and web endpoints) under one engine while clearly separating concerns.
- **Maintainability:** Extracting inline advanced plotting implementations to a standalone module facilitates future enhancements, debugging, and contribution from the community.
- **Enhanced User Experience:** Uniform error handling and consistent functionality across both CLI and web interfaces.
- **Mission Alignment:** Reinforces our mission to be the go-to plot library by offering a robust, maintainable tool with clear module boundaries.

## Implementation Details
1. **Advanced Plotting Extraction:**
   - Create a new module, `src/lib/advancedPlots.js`, and move all advanced plotting functions (spiral, polarHeatmap, dualAxis, boxPlot, violinPlot, cumulativeAverage, inverse, modulatedSine, extended3D) from the inlined code in `src/lib/main.js` into this module.
   - Refactor the advanced plotting implementations, ensuring they follow consistent logging and error reporting patterns.

2. **CLI Integration:**
   - Update `src/lib/main.js` to import the advanced plotting functions from `src/lib/advancedPlots.js` rather than using the inline definitions.
   - Ensure that the CLI argument parsing correctly delegates to the new module based on the provided plot type and parameters.

3. **Web Interface Enhancements:**
   - Verify that the Express-based web endpoints (GET `/` and POST `/plot`) reference the updated core engine and advanced plotting module.
   - Ensure that the integration between numeric parameter validation and advanced plotting remains seamless.

4. **Testing and Documentation:**
   - Expand unit and integration tests to cover the newly created advanced plotting module.
   - Update documentation in the README and CONTRIBUTING files to reflect the new module structure and usage examples for both CLI and web endpoints.
   - Provide clear migration guidelines for developers referencing the old inline implementations.

## Usage Examples
- **CLI Example for Advanced Plotting:**
  ```bash
  node src/lib/main.js --advanced spiral "1,NaN,5,-10,10,1"
  ```
- **Web Interface:**
  - Start the web server using `npm run start:web` and navigate to `http://localhost:3000` to interact with the unified plotting engine.
