# DATA_AGGREGATION Feature Specification

## Description
This feature introduces data aggregation capabilities into the plotting library. Users will be able to group and summarize data sets by applying aggregation functions (such as sum, average, count, minimum, and maximum) on selected columns. The aggregated output can then be visualized through various plot types. This functionality is designed to work seamlessly with the data import, filtering, and visualization modules, providing an end-to-end solution for summarizing large and complex datasets before plotting.

## Motivation
- **Enhanced Data Analysis:** Aggregating data helps uncover trends and patterns that might be obscured in raw datasets. Users can identify key metrics at a glance by summarizing their data.
- **Workflow Efficiency:** By integrating aggregation directly into the plotting tool, users no longer need to resort to external tools for data summarization. This streamlines the analysis process.
- **Mission Alignment:** Supporting our mission to be the go-to plot library for formula-based visualisations, this feature allows users to perform powerful, inline data transformations that turn raw data into actionable insights.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new flag (e.g., `--aggregate`) to activate data aggregation mode.
   - Allow users to specify the aggregation function (sum, average, count, min, max) and the column(s) to group by using a structured syntax (e.g., `--aggregate "groupBy:region;func:sum(sales)"`).
   - Reuse the existing data import and filtering logic to operate on the dataset before plotting.

2. **Data Processing Pipeline:**
   - Parse the aggregation parameters and validate that the specified columns exist and contain numeric data where needed.
   - Apply grouping and aggregation functions, leveraging a library like mathjs for numeric calculations.
   - Generate an aggregated data structure that can be fed into the existing plotting functions.

3. **Web Interface Integration:**
   - Add an interactive panel where users can select columns to group by and choose one or more aggregation functions.
   - Provide real-time previews of the aggregated data and enable users to modify the parameters before generating the final visualization.

4. **Testing and Documentation:**
   - Develop unit and integration tests to ensure that aggregation functions work reliably on various dataset scenarios, including edge cases (e.g., empty groups or non-numeric values).
   - Update the README and CONTRIBUTING documentation to include usage examples, configuration details, and troubleshooting guidelines for aggregation-based plots.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js --import data.csv --filter "region!=''" --aggregate "groupBy:region;func:sum(sales)" --plot "bar:region,sales,-10,10,1"
  ```

- **Web Interface Example:**
   - Launch the web server using `npm run start:web`.
   - Navigate to the data aggregation section, select the column to group by (e.g., region), choose an aggregation function (e.g., sum, average), and preview the aggregated results before generating the plot.
