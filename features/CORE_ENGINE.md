# CORE_ENGINE Feature Specification

## Description
This feature refines and consolidates the core plotting engine by integrating advanced CLI plotting, a new web interface, and an interactive wizard mode. The engine supports a wide range of advanced plotting functions (e.g., spiral, polarHeatmap, dualAxis, boxPlot, violinPlot, cumulativeAverage, inverse, modulatedSine, extended3D) and now includes an interactive help mode that guides users in constructing valid plot commands.

## Motivation
- **Enhanced Accessibility:** In addition to CLI and web-based plotting, the interactive wizard mode provides a guided experience for new or unsure users to build plot commands step-by-step.
- **Improved Usability:** Clear prompts and on-the-fly validation help users avoid common input errors, complementing the robust parameter validation provided by the dedicated module.
- **Unified Experience:** By integrating CLI, web, and interactive wizard functionality under the core engine, we streamline testing, maintenance, and user engagement while staying true to our mission of being the go-to plot library for formulae visualisations.

## Implementation Details
1. **Module Consolidation and Advanced Plotting**
   - Consolidate advanced plotting routines into `src/lib/advancedPlots.js` and update `src/lib/main.js` to import functionality from this module.
   - Maintain support for the `--advanced` flag to invoke advanced plotting functions.

2. **Web Interface Integration**
   - Retain the Express-based web server (`src/web/app.js`) with endpoints for serving an HTML form and processing plot submissions.
   - Ensure that the web interface uses the same core plotting logic for consistency.

3. **Interactive Wizard Mode**
   - Introduce a new CLI flag `--wizard` that triggers an interactive session in the terminal.
   - In wizard mode, prompt the user for input step-by-step: select plot type, enter parameters, and receive real-time validation using the `paramValidation` module.
   - Upon successful input, invoke the corresponding plotting function from the advanced plotting module and display a confirmation message or preview output.

4. **CLI and Routing Updates**
   - Update the main CLI parser in `src/lib/main.js` to detect and route the `--wizard` flag.
   - Ensure that other CLI functionalities (e.g., diagnostics via `--diagnostics`) remain fully operational.

5. **Testing and Documentation**
   - Expand unit tests (in `tests/unit/main.test.js`) to cover the new interactive wizard mode, including input validation and flow control.
   - Update the README and CONTRIBUTING documentation to include usage examples for the interactive wizard, CLI advanced plotting, and web interface usage.

## Usage Examples
- **CLI Advanced Plotting:**
  ```bash
  node src/lib/main.js --advanced spiral "1,NaN,5,-10,10,1"
  ```

- **Interactive Wizard Mode:**
  ```bash
  node src/lib/main.js --wizard
  ```
  This will launch an interactive session guiding you through selecting a plot type and entering parameters.

- **Web Interface:**
  1. Start the web server:
     ```bash
     npm run start:web
     ```
  2. Navigate to `http://localhost:3000` to access the plotting form.
