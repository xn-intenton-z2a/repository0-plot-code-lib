# PLOTTING_ENGINE Feature Specification

## Description
This feature consolidates both basic and advanced plotting capabilities into one unified engine. It now also includes integrated formula parsing to allow users to specify mathematical expressions directly for plotting. In addition to supporting a variety of plot types (scatter, spiral, polar heatmap, etc.) and dynamic data-driven axis scaling, the engine accepts inline mathematical formulas which are parsed and evaluated before visualization.

## Motivation
- **Enhanced Usability:** Users can plot directly from mathematical formulae without pre-processing data manually. This reduces steps in the workflow and makes the tool more accessible.
- **Streamlined Workflow:** Combining plotting, advanced visualization, and formula parsing into one module leverages shared routines for pre-processing, auto-scaling, and parameter validation.
- **Mission Alignment:** By incorporating formula parsing, the library reinforces its mission to be the go-to plot library for formula-based visualizations across both CLI and web interfaces.

## Implementation Details
1. **Unified Plotting and Formula Parsing:**
   - Extend the engine to parse mathematical expressions (e.g., "sin(x)", "x^2+3x+2") provided as input. Convert these expressions to data points with appropriate sampling.
   - Integrate the formula parser using existing libraries (if needed, e.g., mathjs) to evaluate the expression over a defined range.
   - Maintain existing plotting modes (basic and advanced) with additional support for plotting computed functions.

2. **CLI and Web Interface Enhancements:**
   - Introduce a new CLI flag `--formula` to accept a mathematical expression. When provided, the engine will parse, evaluate, and generate plot data automatically.
   - On the web interface, add an input field in the plotting configuration panel for users to enter a mathematical formula. Provide live previews of the computed values alongside traditional parameter inputs.
   - Ensure robust error handling and detailed error messages leveraging the existing parameter validation module.

3. **Rendering and Pre-processing Pipeline:**
   - Before plotting, detect if the input is a formula (via the `--formula` flag) and process it to generate a dataset.
   - Use common routines for axis auto-scaling, rendering, and error checking, ensuring a seamless integration with existing plotting functions.

4. **Testing and Documentation:**
   - Update unit and integration tests to cover new input types, ensuring formula parsing and evaluation works for valid and invalid expressions.
   - Document usage examples in both CLI and web contexts within the README and CONTRIBUTING guides.

## Usage Examples
- **CLI Plotting a Formula:**
   ```bash
   node src/lib/main.js --formula "sin(x)" --plot-engine "range:-10,10;samples:100"
   ```

- **CLI Advanced Plot with Formula Parsing:**
   ```bash
   node src/lib/main.js --advanced polarHeatmap --formula "x^2 + y^2" "params:..."
   ```

- **Web Interface:**
   - Start the web server using `npm run start:web`.
   - Navigate to the configuration panel, enter a mathematical expression in the formula input field, choose the desired plot mode, and view a live preview.
