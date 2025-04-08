# AUTO_SCALING Feature Specification

## Description
This feature introduces an automated scaling mechanism to the plotting library. AUTO_SCALING analyzes the imported dataset and dynamically determines optimal axis ranges, tick intervals, and grid layouts for the generated plots. Rather than relying on manual adjustments, this feature computes scaling parameters based on the data distribution, ensuring that plots are both visually appealing and informative.

## Motivation
- **Enhanced Readability:** Automatically adjusting scales improves plot clarity, letting users focus on data insights without tweaking parameters manually.
- **User Convenience:** By reducing the need for manual scaling, users can generate plots faster, which is especially beneficial for large or dynamic datasets.
- **Mission Alignment:** In our quest to be the go-to plot library for formula-based visualisations, AUTO_SCALING simplifies the plotting process, making our tool even more accessible to both beginners and advanced users.

## Implementation Details
1. **Data Analysis:**
   - Integrate data processing logic to calculate key metrics such as minimum, maximum, mean, and standard deviation for numerical columns.
   - Apply statistical heuristics (e.g., use of quartiles) to determine optimal axis limits and tick spacing that best represent data variability.

2. **CLI and Web Interface Integration:**
   - Introduce a CLI flag (e.g., `--auto-scale`) that, when enabled, bypasses manual scale specification and activates automatic scaling.
   - On the web interface, provide an option (toggle button) for users to enable or disable auto scaling, offering a live preview of the computed scales.

3. **Rendering Engine Enhancements:**
   - Modify the existing rendering pipeline to accept computed scaling parameters, integrating them with current numeric validations and theme settings.
   - Ensure compatibility across all output formats including SVG, PNG, and ASCII art.

4. **Testing and Documentation:**
   - Develop unit and integration tests to verify that AUTO_SCALING accurately computes axis limits and that plots remain clear across a variety of datasets.
   - Update the README and CONTRIBUTING documentation with usage examples, troubleshooting tips, and detailed explanations of the automatic scaling algorithm.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js --import data.csv --plot "line:column1,column2,-10,10,1" --auto-scale
  ```

- **Web Interface Example:**
   - Launch the web server using `npm run start:web`.
   - Navigate to the plotting interface and enable the AUTO_SCALING toggle to see plots rendered with optimally computed axis parameters.
