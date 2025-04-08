# TRENDLINES Feature Specification

## Description
This feature introduces the capability to overlay trendlines on existing plots. It enables users to add statistical trend analysis, such as linear or polynomial regressions, to their visualizations. Trendlines provide a clear visual representation of overall data trends and assist in identifying correlations and patterns over time.

## Motivation
- **Enhanced Data Analysis:** Trendlines help users quickly grasp underlying trends in complex datasets, making the plots more insightful.
- **Complementary to Existing Features:** While features like SCATTER_PLOTTING and LINEAR plots exist, TRENDLINES extend these by adding statistical context to the visualizations.
- **Mission Alignment:** By facilitating deeper data insights without requiring external statistical tools, this feature reinforces our mission to be the go-to plot library for formula-based visualisations.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI flag (e.g., `--trendline`) that can be appended to an existing plot command.
   - Allow users to specify the type of trendline (e.g., linear, polynomial) and optional parameters such as degree for polynomial trendlines.

2. **Data Processing and Regression Calculation:**
   - Utilize existing data parsing functionality to extract coordinate data from plots.
   - Integrate with a regression library or utilize mathjs to compute the best-fit trendline for the provided dataset.
   - Ensure correct handling of edge cases, such as insufficient data points or non-numeric inputs.

3. **Rendering Engine Enhancements:**
   - Modify the rendering pipeline to overlay the computed trendline on the existing plot. This includes adding options for customizing the appearance (color, line style, thickness) of the trendline.
   - Support integration with both CLI outputs (SVG, PNG, ASCII) and the web interface, ensuring consistent visualization across formats.

4. **Web Interface Integration:**
   - Extend the web-based plotting interface to include controls for enabling/disabling trendlines and selecting trendline types.
   - Provide real-time previews as users adjust trendline settings.

5. **Testing and Documentation:**
   - Develop comprehensive unit and integration tests covering regression calculations, overlay rendering, and CLI input validation.
   - Update the README and CONTRIBUTING documentation with examples and usage guidelines for trendline functionality.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js --trendline linear output.svg "scatter:1,2;3,4;5,6;7,8"
  ```
- **Web Interface Example:**
   - Launch the web server and enable the trendline toggle in the plotting settings to overlay a linear or polynomial regression trendline on the generated plot.
