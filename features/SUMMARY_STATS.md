# SUMMARY_STATS Feature Specification

## Description
This feature introduces automated calculation and visualization of summary statistics for datasets used within the plotting library. In addition to generating plots, the tool will compute and display key statistical measures (mean, median, mode, standard deviation, quartiles, min, and max) for the underlying data. These statistics can be optionally overlaid on the plot as annotations or output as a separate report, providing deeper insights into the data distribution and characteristics.

## Motivation
- **Enhanced Data Insight:** Users can quickly understand central tendencies and variability of their data, aiding in rapid data interpretation and decision making.
- **Streamlined Analysis:** Integrates statistical computation within the existing plotting workflow, eliminating the need for external analysis tools.
- **Mission Alignment:** By furnishing comprehensive data visualizations complemented with statistical summaries, the tool reinforces its role as the go-to library for detailed, formula-based visualisations.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI flag (e.g., `--stats`) that, when used alongside data import and plot commands, triggers the computation of summary statistics.
   - Allow users to specify whether the stats should be overlaid on the plot, printed to the console, or exported to a separate file (e.g., JSON or Markdown).

2. **Data Processing Pipeline:**
   - Leverage existing data import and filtering functionalities to access the dataset.
   - Integrate with a statistical library (e.g., mathjs) to calculate measures such as mean, median, standard deviation, quartiles, and range.
   - Ensure that the statistical computation gracefully handles non-numeric or missing values, providing informative error messages when necessary.

3. **Rendering Engine Enhancements:**
   - Modify the plotting pipeline to optionally overlay summary statistics on the graph (e.g., as a side panel or inline annotations).
   - For CLI-based outputs, print a nicely formatted textual table of statistics to the console.

4. **Web Interface Integration:**
   - Add an optional summary statistics panel in the web interface, displaying computed metrics in real-time as users adjust their data filtering or plotting parameters.
   - Provide interactive options for users to toggle the visibility of the statistics panel.

5. **Testing and Documentation:**
   - Develop comprehensive unit and integration tests to cover a variety of dataset scenarios, ensuring the accuracy of statistical computations and robustness of error handling.
   - Update the README and CONTRIBUTING documentation with detailed examples on how to use the `--stats` flag, including CLI command usage and web interface interaction.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js --import data.csv --filter "age>=30" --plot "bar:age,salary" --stats overlay
  ```
- **Web Interface Example:**
   - Launch the web server using `npm run start:web`.
   - Navigate to the plotting interface and activate the statistics panel to view live summary statistics alongside generated plots.