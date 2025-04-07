# ADVANCED_ANALYTICS Feature Specification

## Description
This feature introduces advanced analytics capabilities to the plotting tool. In addition to generating plots, users can now obtain key mathematical analyses such as derivative calculations, integration (area under the curve), and statistical summaries (average, median, standard deviation). The analytics results can be overlaid on the existing plots or exported as additional output information.

## Motivation
- **Enhanced Analysis:** Provides users with deeper insights by automatically computing derivative curves and integration values of plotted functions.
- **Immediate Feedback:** Enables users to see both the original plot and its analysis simultaneously, aiding in understanding function behavior.
- **Mission Alignment:** Furthers our mission to be the go-to plot library for formula visualisations by integrating comprehensive mathematical analytics directly into the plotting workflow.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI flag (e.g., `--analytics`) that triggers the analytics mode alongside standard plotting.
   - Extend the main processing logic in `src/lib/main.js` to detect the `--analytics` flag and branch into analytics computation.

2. **Analytical Computations:**
   - **Derivative Calculation:** Utilize numerical methods (e.g., finite differences) to compute the derivative of the plotted function. Optionally, overlay the derivative plot on the original graph.
   - **Integration:** Calculate the area under the curve using numerical integration techniques such as the trapezoidal rule and report the value.
   - **Statistical Summaries:** Compute statistics (average, median, standard deviation) of the function values over the defined domain.
   - Leverage existing dependencies (e.g., `mathjs`) to carry out these computations.

3. **Output Reporting:**
   - Results from analytics computations should be integrated into the output. For console output, display a summary report detailing derivative information, integration results, and statistical metrics.
   - For file outputs (SVG, TXT, etc.), include an option to overlay these analytics or output them as a separate report.

4. **Error Handling and Testing:**
   - Ensure that invalid inputs or numerical issues are handled gracefully, outputting clear error messages without interrupting the overall process.
   - Extend unit tests to cover scenarios where analytics computations are performed, including both successful calculations and controlled error conditions.

## Usage
- **Basic Analytics Mode:**
  ```bash
  node src/lib/main.js --analytics output.svg "quad:1,0,0,-10,10,1"
  ```
- **Overlay Derivative Example:**
  ```bash
  node src/lib/main.js --analytics --overlay output.svg "sine:1,1,0,0,360,30"
  ```
- **Output Detailed Report:**
  ```bash
  node src/lib/main.js --analytics --report output.txt "expr:Math.sin(x)*x:-10,10,0.5"
  ```

With these enhancements, users gain immediate insights into both the visual and analytical aspects of the plotted functions, making the tool a more comprehensive resource for mathematical visualisations.