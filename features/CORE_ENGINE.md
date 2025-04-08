# CORE_ENGINE Feature Specification

## Description
This feature refines and consolidates the core plotting engine by integrating advanced CLI plotting, a new web interface, and an interactive wizard mode. In addition, it now supports multiple output formats for plots including SVG, JSON, CSV, Markdown, ASCII, and HTML. The core engine leverages robust numeric parameter validation and diagnostics to ensure high reliability and ease-of-use.

## Motivation
- **Enhanced Accessibility:** Offers diverse output formats to meet varied user needs.
- **Improved Usability:** Enables users to export plots directly in their desired format, simplifying reporting and further analysis.
- **Unified Experience:** Merges plotting, interactive wizard guidance, web interface interaction, and export options under a single cohesive module.

## Implementation Details
1. **Module Consolidation and Advanced Plotting:**
   - Consolidate advanced plotting routines into `src/lib/advancedPlots.js` and update `src/lib/main.js` to import these functionalities.
   - Preserve the handling of the `--advanced` flag to invoke specific plotting functions.

2. **Web Interface Integration:**
   - Extend the Express-based web server (`src/web/app.js`) to support plot generation along with export format selection via UI elements such as a dropdown menu.
   - Update the POST endpoint at `/plot` to process an additional parameter for the desired export format.

3. **Interactive Wizard Mode:**
   - Introduce a CLI flag `--wizard` to launch an interactive session.
   - Guide the user step-by-step to select the plot type, input parameters (validated using the `paramValidation` module), and choose an export format.

4. **Export Options:**
   - Add export functionality to support output formats: SVG, JSON, CSV, Markdown, ASCII, and HTML.
   - For CLI usage, enable an `--export <format>` flag to specify the desired output format.
   - Internally, transform the plot data to match the specified format before rendering or saving the output.

5. **CLI and Routing Updates:**
   - Modify the main CLI parser in `src/lib/main.js` to detect the export flag and validate it against supported formats.
   - Ensure that core functionalities (advanced plotting, diagnostics, and interactive mode) harmoniously incorporate export capabilities.

6. **Testing and Documentation:**
   - Add comprehensive unit tests to cover new export functionality alongside existing features.
   - Update the README and CONTRIBUTING documentation to include usage examples and guidelines on the export feature.

## Usage Examples
- **CLI Advanced Plotting with Export Option:**
  ```bash
  node src/lib/main.js --advanced spiral "1,NaN,5,-10,10,1" --export SVG
  ```

- **Interactive Wizard Mode:**
  ```bash
  node src/lib/main.js --wizard
  ```

- **Web Interface:**
  1. Start the web server:
     ```bash
     npm run start:web
     ```
  2. Access the application at `http://localhost:3000`, select the plot type, enter parameters, and choose an output format from the provided options.
