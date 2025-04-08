# PLOTTING_ENGINE Feature Specification

## Description
This feature consolidates the automatic axis scaling and versatile plotting modes into one unified plotting engine. It integrates dynamic data-driven scaling with flexible rendering options such as graphical scatter plots, ASCII art plotting, and analytical trendline overlays. The unified module streamlines the plotting workflow and reduces complexity by merging the previously separate AUTO_SCALING and PLOTTING_MODES functionalities.

## Motivation
- **Enhanced Usability:** By automating axis scaling and offering multiple plotting modes under one umbrella, users can focus on data insights rather than configuration fine-tuning.
- **Streamlined Workflow:** Consolidating related features minimizes redundancy, simplifies the CLI flags and web interface, and makes the codebase more maintainable.
- **Mission Alignment:** This integrated approach supports our mission to be the go-to plot library for formula-based visualisations, providing a seamless and adaptable plotting experience in both CLI and web environments.

## Implementation Details
1. **Integrated Scaling and Modes:**
   - Merge auto-scaling algorithms that compute optimal axis ranges, tick intervals, and grid layouts based on data distribution with various plotting modes (e.g., scatter, ASCII, trendline overlay).
   - Ensure that scaling computations are applied uniformly regardless of the selected plotting mode.

2. **CLI and Web Interface Support:**
   - Introduce consolidated CLI flags (e.g., `--plot-engine`) that accepts parameters to control both the scaling and the desired plotting mode. For example: `--plot-engine mode:scatter;scaling:auto`.
   - In the web interface, provide an integrated settings panel where users can toggle auto scaling and select among available plotting modes with live preview of the computed scales.

3. **Rendering Pipeline Enhancements:**
   - Update the plotting engine to route rendering logic based on the selected mode, while sharing a common pre-processing step for automatic scaling.
   - Maintain consistency in themes, error handling, and output formats across all modes.

4. **Testing and Documentation:**
   - Expand unit and integration tests to cover various combinations of scaling parameters and plotting modes, ensuring robustness and graceful error handling.
   - Update the README and CONTRIBUTING documentation with detailed examples and usage instructions for the unified plotting engine.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js --plot-engine "mode:scatter;scaling:auto;params:1,NaN,5,-10,10,1"
  ```

- **Web Interface Example:**
   - Launch the web server using `npm run start:web`.
   - Navigate to the plotting configuration panel, select the desired plotting mode and enable auto scaling for immediate visual feedback.
