# DATA_NORMALIZATION Feature Specification

## Description
This feature introduces automated data normalization capabilities into the plotting library. Before rendering plots, users have the option to normalize their datasets using standard techniques such as min-max scaling or z-score normalization. The normalized data helps in aligning disparate datasets, ensures consistency across scales, and enhances the comparative performance of multi-series plots. This feature integrates directly into the data import pipeline and can be activated via a dedicated CLI flag or through the web interface.

## Motivation
- **Improved Data Consistency:** Normalizing data ensures that varying scales and units do not distort the visualization, making comparisons intuitive and accurate.
- **Enhanced Plot Clarity:** With normalization, outlier effects are mitigated, and trends can be analyzed on a common scale, resulting in clearer and more informative plots.
- **Seamless Integration:** Aligns with our mission of being the go-to plot library for formula-based visualisations by enabling inline data transformation without needing external tools.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new flag (e.g., `--normalize`) to activate normalization during data import.
   - Allow users to specify the normalization method (e.g., `--normalize method=zscore` or `--normalize method=minmax`).
   - Integrate normalization routines into the preprocessing pipeline right after data import and filtering. The normalization logic will use established libraries like mathjs to compute necessary statistics (e.g., mean, standard deviation, min, max).

2. **Web Interface Integration:**
   - Add a toggle and dropdown in the data upload panel to enable normalization and select the desired method interactively.
   - Provide real-time preview of normalized data alongside raw data to assist users in understanding the transformation.

3. **Data Processing Enhancements:**
   - After importing data, check for the `--normalize` flag. If activated, process numerical columns based on the selected method:
     - **Min-Max Scaling:** Transform values to a [0, 1] range.
     - **Z-Score Normalization:** Center data by subtracting the mean and dividing by the standard deviation.
   - Validate that the data contains sufficient numerical information and handle edge cases (e.g., constant columns) gracefully by issuing warnings or defaulting to standard behavior.

4. **Testing and Documentation:**
   - Develop unit tests to cover typical normalization scenarios, ensuring that both min-max and z-score methods produce correct outputs.
   - Update the README and CONTRIBUTING documents with examples showing how to use the normalization feature via both CLI and web interface.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js --import data.csv --filter "age>=30" --normalize method=zscore --plot "bar:age,salary,-10,10,1"
  ```
- **Web Interface Example:**
   - Launch the web server with `npm run start:web`.
   - Navigate to the data import section, enable normalization by selecting a method (Min-Max or Z-Score), and preview the transformed data before generating the plot.
