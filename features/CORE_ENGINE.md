# CORE_ENGINE Feature Specification

## Description
This feature consolidates the plotting and data processing functionalities into a single core engine. It merges the previous plotting engine and data engine features to provide a unified CLI tool for formula-based visualizations as well as data ingestion, analysis, and export. In addition, it integrates the basic web endpoints previously implemented in the repository, ensuring a seamless experience for both command-line and web users.

## Motivation
- **Streamlined Workflow:** By merging plotting and data processing, users can leverage powerful formula parsing, advanced plot types, and statistical analysis all from one tool.
- **Enhanced Usability:** A unified engine reduces the overhead of switching between modules and simplifies maintenance and testing.
- **Mission Alignment:** This change reinforces our mission to be the "go-to plot library for formulae visualisations" by integrating all core functionalities into a single, robust module.

## Implementation Details
1. **Unified CLI Operations:**
   - Integrate formula parsing (e.g., "sin(x)") and a variety of plot types (scatter, spiral, polar heatmap, etc.) into one engine.
   - Support dynamic CLI flags for both plotting (e.g., `--advanced`, `--formula`) and data operations (e.g., `--import`, `--stats`, `--export`).
   - Maintain and update robust parameter validation through the dedicated PARAM_VALIDATION module.

2. **Data Processing and Export:**
   - Enable data ingestion from CSV and JSON files with inline statistical analysis (mean, median, mode, standard deviation, etc.).
   - Offer export capabilities in multiple formats (SVG, JSON, CSV, Markdown, ASCII, HTML).
   - Ensure that error handling and validation are consistent across data and plotting operations.

3. **Web Interface Integration:**
   - Incorporate the pre-existing web endpoints (GET `/` for form interface and POST `/plot` for processing submissions) into the core engine.
   - Provide a unified configuration for both CLI and web usage to allow live previews and interactive functionalities.

4. **Testing and Documentation:**
   - Update unit and integration tests to cover the merged CLI and web functionalities.
   - Revise documentation and usage examples in the README and CONTRIBUTING files to reflect the new unified engine's capabilities.

## Usage Examples
- **CLI Example for Plotting a Formula:**
  ```bash
  node src/lib/main.js --formula "sin(x)" --advanced spiral
  ```

- **CLI Example for Data Import and Analysis:**
  ```bash
  node src/lib/main.js --import data.csv --stats console --export SVG
  ```

- **Web Interface Example:**
  - Start the server: `npm run start:web`
  - Open the browser at `http://localhost:3000` to access the unified interface for plotting and data export.
