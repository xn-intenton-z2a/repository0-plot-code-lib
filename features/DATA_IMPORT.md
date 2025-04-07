# DATA_IMPORT Feature Specification

## Description
This feature introduces the ability to import data files directly into the plotting library. Users can provide data files (CSV or JSON) through a dedicated CLI flag, and the tool will automatically parse the file, extract relevant columns, and generate plots based on the imported data. This functionality bridges the gap between raw data and visual insights, streamlining workflows where data is sourced from external systems.

## Motivation
- **Seamless Data Integration:** Enables users to visualize data without manual transcription, improving workflow efficiency and reducing potential errors.
- **Broadens Usability:** Caters to data analysts and scientists who work with CSV and JSON datasets, aligning with our mission to be the go-to plotting tool for formulae visualizations.
- **Automation and Scalability:** Facilitates batch and automated processes by allowing plots to be generated directly from data files in integration pipelines.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI flag (e.g., `--import <filePath>`) to specify the path to the data file.
   - Optionally, include parameters to select data columns and specify plot types for the imported data.
   - Modify the main entry point (`src/lib/main.js`) to detect and process the `--import` flag.

2. **Data Parsing and Validation:**
   - **File Format Detection:** Automatically detect the file type based on its extension (`.csv` or `.json`).
   - **CSV Parsing:** Use a lightweight CSV parser to read and convert CSV data into an array of objects.
   - **JSON Parsing:** Use the built-in JSON parser to handle JSON datasets.
   - Validate that the imported data contains sufficient numerical data for plotting, and provide clear error messages for malformed files.

3. **Plot Generation:**
   - Map selected data columns to the plot’s axes or series, reusing the existing numeric parsing and rendering logic.
   - Allow users to define visualization parameters (such as plot type, colors, and data ranges) either in the CLI or via a configuration file.
   - Integrate with existing output formats (SVG, PNG, etc.) to ensure consistency with current capabilities.

4. **Testing and Documentation:**
   - Develop unit tests to simulate importing both CSV and JSON data, ensuring proper parsing and error handling.
   - Update README and CONTRIBUTING guides with usage examples and configuration details. Sample usage:
     ```bash
     node src/lib/main.js --import data.csv --plot "linear:column1,column2,-10,10,1"
     ```

This feature enhances the versatility of our plotting tool by allowing direct data inputs, making it a powerful asset for users who work with dynamic or externally sourced datasets.