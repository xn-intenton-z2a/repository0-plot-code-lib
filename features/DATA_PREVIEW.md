# DATA_PREVIEW Feature Specification

## Description
This feature introduces an interactive data preview capability to the plotting library. Before generating plots, users can inspect a sample of the imported dataset, view column data types, and examine basic statistics. The preview helps in verifying that data has been imported correctly and enables users to identify errors or unexpected data formats prior to plotting.

## Motivation
- **Enhanced Data Transparency:** Allows users to quickly review the head of the dataset and understand data distributions. This can help in early detection of anomalies or misconfigurations.
- **Streamlined Workflow:** Reduces the need to switch to external tools for initial data inspection. Users can verify their data and then directly proceed to filtering, transformation, and plotting within the same tool.
- **Mission Alignment:** By integrating an interactive data preview, the repository further solidifies its reputation as the go-to plotting library. It supports the mission to be the jq of formulae visualisations by embedding data-centric features that improve end-to-end workflows.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new flag (e.g., `--preview`) that, when used with the `--import` flag, displays a tabulated preview of the first few rows of the dataset along with column types and basic summary statistics.
   - Extend the existing data import module to compute and format the preview output, making use of libraries like `mathjs` for statistical summaries where applicable.
   - Ensure that the preview functionality supports multiple file types (CSV and JSON) with clear error messages for malformed files.

2. **Web Interface Integration:**
   - Add a dedicated preview panel in the web interface which shows a scrollable table of the imported dataset and summary boxes indicating key statistics (e.g., count, min, max, mean).
   - Allow users to interact with the preview by sorting columns, searching for specific entries, and toggling between full data views and summarized views.
   - Integrate with existing data import views so that the user experience remains consistent.

3. **Data Processing and Validation:**
   - Leverage the current data import logic to load datasets, followed by a processing step that extracts a sample (e.g., the first 10 rows) and computes basic metrics for each column.
   - Ensure robust error handling and user-friendly messages if data preview generation fails due to incompatible formats or missing values.

4. **Testing and Documentation:**
   - Develop unit and integration tests to simulate data preview scenarios for both CLI and the web interface. These tests should cover various file formats and edge cases such as empty files or files with missing headers.
   - Update the README and CONTRIBUTING documents to include usage examples, expected output format, and troubleshooting guidelines.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js --import data.csv --preview
  ```
  This command imports the specified CSV file and displays a preview, including the first few rows and summary statistics.

- **Web Interface Example:**
   - Launch the web server with `npm run start:web`.
   - Navigate to the data import section, upload a file, and the preview panel will automatically display a sample of the data along with key metrics.
