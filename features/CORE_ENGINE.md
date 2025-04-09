# CORE_ENGINE Feature Specification (Enhanced with Visual Themes)

## Overview
The CORE_ENGINE is the backbone of the plotting library, responsible for advanced plotting, diagnostics, numeric validation, interactive CLI wizard, preview mode, built-in help support, web integration, history logging, persistent user configuration, and integrated formula evaluation. This update further extends CORE_ENGINE to include customizable visual themes, allowing users to modify the styling and presentation of plots and formula visualisations.

## Description
- **Advanced Plotting:** Supports multiple output formats (SVG, JSON, CSV, Markdown, ASCII, HTML) with diverse plot types including spiral, polar heatmap, dual axis, box plot, violin plot, cumulative average, inverse function, modulated sine, extended 3D plot, test plot, contour plot, and scatter matrix.

- **Formula Evaluation:** Integrates a formula parser and evaluator using a library such as mathjs. Users can provide expressions (e.g., sin(x)+cos(x)) that are parsed and computed, supporting algebraic simplification, function plotting, and direct evaluation. Detailed error handling and validation ensure meaningful feedback for both syntactic and semantic errors in formulas.

- **Visual Themes:** Introduces support for customizable visual themes to enhance plot aesthetics. Users can select or define themes that adjust color schemes, line styles, backgrounds, and other visual elements for both CLI and web outputs. Themes can be applied via a CLI flag (e.g., `--theme`) and configured persistently through user configuration files.

- **Diagnostics Mode:** Activated with the `--diagnostics` flag, running self-tests, health checks, and configuration verifications for robust operation.

- **Numeric Parameter Validation:** Implements regex-based validation for numeric inputs, converting accepted NaN aliases to a unified representation and providing clear error messages for invalid tokens.

- **Interactive Wizard & Logging:** Guides users through plot and formula configuration via a CLI wizard (triggered by `--wizard`), logging debugging information in real time.

- **Preview Mode:** Activated with the `--preview` flag to validate inputs, summarize attributes, and provide immediate feedback without full rendering.

- **Built-in CLI Help & Web Integration:** Provides a consolidated interface via CLI (`--help`) and an Express-based web server. Both interfaces offer consistent handling of input parameters, theme customization, and plugin integration.

- **History Logging & User Configuration Management:** Records executed commands and user preferences. Persistent user configuration (via a config file, e.g., `~/.repo0_config.json`) now includes default theme settings alongside plot, output, and formula parameters.

## Implementation Details
1. **CLI Enhancements:**
   - Extend CLI arguments to recognize a `--theme` flag that accepts a theme name or configuration file.
   - Update argument parsing to apply the selected theme during plot rendering.

2. **Theme Management:**
   - Develop a theme manager module responsible for loading, validating, and applying visual themes.
   - Provide a set of pre-defined themes with customizable properties (colors, line styles, backgrounds) and allow users to extend or override them via configuration.

3. **Integration with Plotting Logic:**
   - Integrate theme settings into the plotting routines so that each plot reflects the chosen visual style.
   - Ensure compatibility with both CLI output and web interface rendering.

4. **Testing and Documentation:**
   - Augment unit and integration tests to cover theme loading, validation, and application.
   - Update the README and CONTRIBUTING documents with instructions on how to configure and customize visual themes.

## Usage Examples

**CLI with Theme Selection:**
```bash
node src/lib/main.js --advanced spiral "1,NaN,5,-10,10,1" --theme darkMode
```

**Persistent Configuration Example:**
Create or update your configuration file (e.g., `~/.repo0_config.json`):
```json
{
  "defaultPlotType": "spiral",
  "defaultOutputFormat": "SVG",
  "defaultParams": "1,NaN,5,-10,10,1",
  "defaultFormula": "sin(x)+cos(x)",
  "defaultDomain": "0,10,0.1",
  "defaultTheme": "darkMode"
}
```

**Web Interface with Themes:**
When accessing the web interface at `http://localhost:3000`, users will have an option to select a visual theme from a dropdown menu, which will apply to the rendered plots in real time.

This enhanced CORE_ENGINE not only consolidates advanced plotting, formula evaluation, and configuration management but now empowers users with customizable visual themes, reinforcing our mission to be the go-to plot library for formula visualisations.
