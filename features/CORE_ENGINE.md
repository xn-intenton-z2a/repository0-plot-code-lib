# CORE_ENGINE Feature Specification

## Overview
The CORE_ENGINE is the backbone of the plotting library. It brings together advanced plotting, diagnostics, numeric parameter validation, an interactive CLI wizard, integrated preview mode, built-in help support, web-interface integration, history logging, and now persistent user configuration management. This unified engine ensures a consistent and intuitive user experience across both CLI and web interactions.

## Description
- **Advanced Plotting:** Supports multiple output formats (SVG, JSON, CSV, Markdown, ASCII, HTML) and a variety of plot types including spiral, polar heatmap, dual axis, box plot, violin plot, cumulative average, inverse function, modulated sine, extended 3D plot, test plot, contour plot, and scatter matrix.

- **Diagnostics Mode:** Activated using the `--diagnostics` flag. Runs self-tests, health checks, and configuration verifications, providing detailed troubleshooting insights.

- **Numeric Parameter Validation:** Implements robust regex-based validation for numeric inputs (integers, decimals, scientific notation) and consistently converts accepted NaN aliases ("NaN", "not a number", "notanumber", "na", "not-a-number") to a normalized representation. Detailed error messages help users correct near-miss tokens such as "n/a".

- **Interactive Wizard & Logging:** Guides users through plot configuration via the CLI wizard (triggered by `--wizard`), while logging debugging information in real time.

- **Preview Mode:** Triggered by the `--preview` flag. Validates inputs, summarizes plot attributes, and provides immediate feedback without full plot rendering.

- **Built-in CLI Help:** Comprehensive help accessible with the `--help` flag. Displays usage instructions, command descriptions, flag details, and practical examples derived from repository documentation.

- **Web Interface Integration:** Provides an Express-based server for generating plots via an HTML form, ensuring consistency between CLI and web interactions.

- **History Logging:** Records every executed plot command, along with parameters and timestamps, into a local JSON file. Users can review past commands using the `--history` flag.

- **User Configuration Management:** Introduces persistent user settings. Users can create a configuration file (e.g., `~/.repo0_config.json`) to store preferred defaults such as plot type, output format, and other plotting parameters. The CORE_ENGINE reads these defaults at startup, allowing users to override them via CLI flags. This enhancement streamlines repetitive tasks and personalizes the plotting experience.

## Implementation Details
1. **CLI Parser Enhancements:**
   - Extend the CLI parser to detect additional flags for configuration management (e.g., `--set-defaults`, `--use-config`).
   - Ensure the configuration file is read from a standard location (such as the user's home directory) and merged with command-line arguments.

2. **Help Handler Updates:**
   - Update the help system to include instructions on managing user configurations and setting default parameters.

3. **Integration and Testing:**
   - Incorporate the user configuration module into the main control flow in `src/lib/main.js`.
   - Augment unit tests to validate that default configurations are correctly loaded and that CLI flags override these values as intended.
   - Update the README and CONTRIBUTING files with usage examples and configuration file format details.

## Usage Examples

**Advanced Plotting Example:**
```bash
node src/lib/main.js --advanced spiral "1,NaN,5,-10,10,1"
```

**Preview Mode Example:**
```bash
node src/lib/main.js --preview spiral "1,NaN,5,-10,10,1"
```

**User Configuration Setup:**
Create a file at `~/.repo0_config.json` with content like:
```json
{
  "defaultPlotType": "spiral",
  "defaultOutputFormat": "SVG",
  "defaultParams": "1,NaN,5,-10,10,1"
}
```
Then run:
```bash
node src/lib/main.js --use-config
```
This will load your defaults, allowing you to omit common parameters from the command line.

**Diagnostics Mode Example:**
```bash
node src/lib/main.js --diagnostics
```

This updated CORE_ENGINE not only supports a comprehensive range of plotting functionalities but also enhances usability by allowing persistent user configurations, further aligning with our mission to be a go-to plot library for formulae visualisations.
