# CORE_ENGINE Feature Update

## Description
This update refines the core plotting engine by extracting the inlined advanced plotting implementations from the main CLI file into a dedicated module (`src/lib/advancedPlots.js`). This change will improve maintainability, separation of concerns, and streamline both testing and future enhancements.

## Motivation
- **Maintainability:** Moving the advanced plotting functions out of the main file makes the codebase cleaner and easier to update.
- **Separation of Concerns:** Distinguishes core engine operations from specialized plotting routines.
- **Enhanced Testing:** Isolates advanced plotting functionality, enabling focused unit and integration tests without interference from CLI routing logic.

## Implementation Details
1. **Module Extraction:**
   - Create a new file `src/lib/advancedPlots.js` and move all inlined advanced plotting functions (spiral, polarHeatmap, dualAxis, boxPlot, violinPlot, cumulativeAverage, inverse, modulatedSine, extended3D) from `src/lib/main.js` to this new module.
   - Ensure that each function maintains its logging, error handling, and parameter processing behavior.

2. **CLI Integration Update:**
   - Modify `src/lib/main.js` to import the advanced plotting functions from `src/lib/advancedPlots.js` instead of relying on the inlined version.
   - Ensure the CLI parser correctly routes calls (via the `--advanced` flag) to the corresponding functions in the new module.
   - Remove the inlined advanced plotting object from `src/lib/main.js` after confirming that the new module is fully integrated.

3. **Testing and Documentation:**
   - Update and expand unit tests to target the new `advancedPlots.js` module, ensuring that all advanced plotting routines behave as expected.
   - Revise the CONTRIBUTING and README files to reflect the module refactoring, offering clear migration guidelines and usage examples for developers.
   - Validate that both CLI and web interface endpoints continue to function seamlessly with the updated core engine.

## Usage Examples
- **CLI Invocation for Advanced Plotting:**
  ```bash
  node src/lib/main.js --advanced spiral "1,NaN,5,-10,10,1"
  ```
- **Web Interface:**
  The Express-based web endpoints will automatically use the new advanced plotting module, ensuring consistent behavior across CLI and web.
