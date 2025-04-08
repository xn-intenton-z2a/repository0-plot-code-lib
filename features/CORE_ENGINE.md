# CORE_ENGINE Feature Specification

## Description
This feature unifies and streamlines the core functionalities of the plotting library. It consolidates CLI plotting, advanced numerical parameter validation, advanced plotting, data processing, and integrated web interface endpoints into a single, robust engine. This update also addresses maintainability improvements by extracting inlined advanced plotting implementations into a dedicated module, and ensuring that all parts of the system work together seamlessly.

## Motivation
- **Streamlined Workflow:** Integrates formula parsing, parameter validation, advanced plotting, and data export into one cohesive engine.
- **Maintainability:** Removing inlined advanced plotting code and consolidating core functionalities into discrete modules makes future enhancements easier.
- **Enhanced User Experience:** Provides unified CLI and web interface interactions, ensuring consistency between different ways of using the library.
- **Mission Alignment:** This upgrade reinforces our mission to be the go-to plot library by offering a single, highly maintainable, and fully-featured tool.

## Implementation Details
1. **Unified CLI Operations & Integration:**
   - Merge advanced plotting functionalities by moving inlined implementations from `src/lib/main.js` into a dedicated module (e.g., `src/lib/advancedPlots.js`).
   - Update the CLI in `src/lib/main.js` to import advanced plotting functions from the new module instead of using inline definitions.
   - Ensure that numeric parameter validation continues to be handled by the dedicated PARAM_VALIDATION module.
   - Retain and further refactor the existing data processing and export capabilities from CSV, JSON, etc.

2. **Web Interface Enhancements:**
   - Integrate and extend the pre-existing web endpoints (GET `/` for the interactive form and POST `/plot` for processing) within the unified engine.
   - Ensure the Express web server is configured correctly for both basic interactions and advanced plot processing.
   
3. **Testing and Documentation:**
   - Update and expand unit and integration tests to cover the newly extracted advanced plotting module and ensure smooth operation of both CLI and web functionalities.
   - Revise the documentation in README and CONTRIBUTING files to reflect the new structure, including usage examples for both CLI and web endpoints.

## Usage Examples
- **CLI Example for Plotting a Formula:**
  ```bash
  node src/lib/main.js --formula "sin(x)" --advanced spiral
  ```

- **CLI Example for Data Import and Analysis:**
  ```bash
  node src/lib/main.js --import data.csv --stats console --export SVG
  ```

- **Web Interface Example:**
  - Start the server: `npm run start:web`
  - Navigate to `http://localhost:3000` to access the unified interface for plotting and data export.
