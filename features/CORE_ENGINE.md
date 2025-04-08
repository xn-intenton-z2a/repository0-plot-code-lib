# CORE_ENGINE Feature Specification

## Description
This feature refines and consolidates the core plotting engine by integrating both advanced CLI plotting functions and a new web interface for plotting. The advanced plotting functions (such as spiral, polarHeatmap, dualAxis, boxPlot, violinPlot, cumulativeAverage, inverse, modulatedSine, extended3D) are encapsulated in a dedicated module, while the web interface provides an Express-powered user experience for inputting parameters and viewing plot results.

## Motivation
- **Maintainability:** Separates core engine logic from user interface concerns and centralizes advanced plotting functions, making the codebase cleaner.
- **Enhanced Accessibility:** Offers both CLI and web-based access to advanced plotting, broadening user engagement and real-world application.
- **Streamlined Testing:** Isolates functionality for robust unit and integration testing, ensuring consistency between web and CLI modes.
- **Mission Alignment:** Realizes the mission of being the go-to plot library by providing multiple interfaces (CLI and web) to interact with mathematical visualisations.

## Implementation Details
1. **Module Extraction:**
   - Consolidate advanced plotting routines into `src/lib/advancedPlots.js` and update `src/lib/main.js` to import from this module.
   - Ensure existing flag detections (e.g., `--advanced`) work seamlessly.

2. **Web Interface Integration:**
   - Implement an Express-based web server (located in `src/web/app.js`) with the following endpoints:
     - **GET /**: Serves an HTML form for selecting a plot type and entering parameters.
     - **POST /plot**: Processes form submissions to invoke the corresponding advanced plotting function and returns a confirmation or rendered output.
   - Update README and CONTRIBUTING documentation to reflect web interface usage and migration guidelines.

3. **CLI and Routing Updates:**
   - Retain CLI functionalities for diagnostics and parameter validation while ensuring that both CLI and web routes share the core plotting logic.

4. **Error Handling and Reporting:**
   - Maintain robust error reporting in numeric validations and advanced plotting functions for both interfaces.
   - Provide diagnostic outputs when triggered via the `--diagnostics` flag.

## Testing and Documentation
- **Unit and Integration Tests:**
  - Expand existing tests in `tests/unit/main.test.js` to cover CLI functionality.
  - Add integration tests (using `supertest` and Vitest) for the web endpoints to ensure proper routing and response.
- **Documentation:**
  - Update README.md and CONTRIBUTING.md to include detailed instructions, usage examples (both CLI and web), and migration information.

## Usage Examples
- **CLI Advanced Plotting:**
  ```bash
  node src/lib/main.js --advanced spiral "1,NaN,5,-10,10,1"
  ```
- **Web Interface:**
  1. Start the web server:
     ```bash
     npm run start:web
     ```
  2. Navigate to `http://localhost:3000` to access the plotting form, select a plot type, and enter parameters.
