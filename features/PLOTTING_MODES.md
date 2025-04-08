# PLOTTING_MODES Feature Specification

## Description
This feature consolidates and enhances alternative plotting modes including scatter plotting, ASCII art plotting, and trendline overlays into a unified module. It is designed to provide users with versatile options to visualize data in different formats and styles—from graphical scatter plots to lightweight, text-based representations, along with analytical trend analyses. The unified module replaces separate implementations and streamlines the CLI and web interface integration for non-standard plot types.

## Motivation
- **Versatility:** Allows users to choose between detailed graphical scatter plots and quick ASCII-based previews directly from the terminal.
- **Enhanced Data Analysis:** The integrated trendline overlay adds statistical context to scatter plots, helping users identify correlations and data patterns easily.
- **Simplified Codebase:** By merging similar functionalities into a single feature, maintenance and future enhancements become more efficient.
- **Mission Alignment:** Supports our mission to be the go-to plot library by offering flexible, formula-based visualizations in both graphical and non-graphical environments.

## Implementation Details
1. **Unified CLI Options:**
   - Introduce consolidated CLI flags (e.g., `--plot-mode`) to select among scatter, ASCII, and trendline options.
   - Enhance the current argument parser in `src/lib/main.js` to interpret mode-specific parameters and route them to the appropriate rendering logic.

2. **Rendering Pipeline Enhancements:**
   - Integrate scatter plotting routines with an option to overlay computed trendlines using statistical methods from existing libraries (e.g., mathjs).
   - Extend the rendering engine to support ASCII output, reusing numeric validations and mapping plot data to a character grid.
   - Ensure that all visualization modes maintain consistency in theming, error handling, and output formats.

3. **Modular Code Design:**
   - Consolidate the existing implementations from `features/SCATTER_PLOTTING.md`, `features/ASCII_PLOTTING.md`, and `features/TRENDLINES.md` into a single module within the repository.
   - Maintain clear separation of concerns within the module by compartmentalizing functions for different output modes while sharing common data processing routines.

4. **Testing and Documentation:**
   - Update unit and integration tests to cover various combinations of plotting mode parameters, ensuring reliable fallbacks and error messages.
   - Revise the README and CONTRIBUTING documentation to provide clear examples and usage instructions for the unified plotting modes.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js output.svg "mode:scatter;params:1,2;3,4;trend:linear"
  ```
- **Alternative Mode (ASCII):**
  ```bash
  node src/lib/main.js --ascii "mode:ascii;params:1,2;3,4"
  ```
- **Web Interface:**
   - Users can select the desired mode (scatter, ASCII, or trendline overlay) from the plotting configuration panel before rendering a plot.
