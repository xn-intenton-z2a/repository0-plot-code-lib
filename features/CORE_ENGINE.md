# CORE_ENGINE Feature Specification (Enhanced)

## Overview
The CORE_ENGINE is the backbone of the plotting library, responsible for advanced plotting, diagnostics, numeric validation, interactive CLI wizard, preview mode, built-in help support, web integration, history logging, persistent user configuration, and now integrated formula evaluation. This enhancement unifies plotting and formula evaluation to better serve users looking to visualize mathematical expressions and their computed results.

## Description
- **Advanced Plotting:** Supports multiple output formats (SVG, JSON, CSV, Markdown, ASCII, HTML) with various plot types including spiral, polar heatmap, dual axis, box plot, violin plot, cumulative average, inverse function, modulated sine, extended 3D plot, test plot, contour plot, and scatter matrix.

- **Formula Evaluation:** Integrates a formula parser and evaluator using a library such as mathjs. Users can provide expressions (e.g., sin(x)+cos(x)) that are parsed and computed, supporting algebraic simplification, function plotting, and direct evaluation of formula parameters. Detailed error handling and validation ensure that users receive meaningful feedback for both syntactic and semantic errors in their formulas.

- **Diagnostics Mode:** Activated with the `--diagnostics` flag to run self-tests, health checks, and configuration verifications, ensuring robust operation and detailed troubleshooting insights.

- **Numeric Parameter Validation:** Implements regex-based validation for numeric inputs, converting accepted NaN aliases to a unified representation and providing clear error messages for invalid tokens.

- **Interactive Wizard & Logging:** Guides users through plot and formula configuration via a CLI wizard (triggered by `--wizard`), logging debugging information in real time.

- **Preview Mode:** Activated with the `--preview` flag to validate inputs, summarize attributes, and provide immediate feedback without full rendering.

- **Built-in CLI Help:** Accessible via `--help` for comprehensive usage instructions, command descriptions, flag details, and practical examples.

- **Web Interface Integration:** Provides an Express-based server for generating plots and evaluating formulas via an HTML form, ensuring consistency between CLI and web interactions.

- **History Logging:** Records executed commands (both plotting and formula evaluation), including parameters and timestamps, enabling users to review past commands with the `--history` flag.

- **User Configuration Management:** Supports persistent user settings via a configuration file (e.g., `~/.repo0_config.json`) that stores defaults for plot types, output formats, formula options, and other parameters, with CLI flags available to override the defaults.

## Implementation Details
1. **CLI & Web Parser Enhancements:**
   - Extend CLI and HTTP request handlers to recognize new flags and input fields for formula evaluation (e.g., `--formula`).
   - Merge numeric validation and formula tokenization under a common parsing module.

2. **Formula Evaluation Module:**
   - Integrate a dedicated formula evaluation component that utilizes mathjs for parsing and computing mathematical expressions.
   - Validate syntax and semantics, providing descriptive error messages upon failure.
   - Allow formula evaluation commands to be invoked independently or combined with advanced plotting commands.

3. **Integration and Testing:**
   - Incorporate formula evaluation logic into the main control flow (e.g., in `src/lib/main.js`), ensuring that CLI flags and web interface inputs correctly route to the evaluation functions.
   - Augment unit tests and integration tests to cover formula parsing, evaluation, and error handling scenarios.
   - Update documentation within README and CONTRIBUTING to include sample usage for formula evaluation.

## Usage Examples

**Advanced Plotting Example:**
```bash
node src/lib/main.js --advanced spiral "1,NaN,5,-10,10,1"
```

**Formula Evaluation Example:**
```bash
node src/lib/main.js --formula "sin(x) + cos(x)" --domain "0,10,0.1"
```

**Preview Mode (Plot and Formula):**
```bash
node src/lib/main.js --preview spiral "1,NaN,5,-10,10,1" --formula "x^2 + 3*x + 2"
```

**Using Persistent Configuration:**
Create or update your configuration file (e.g., `~/.repo0_config.json`):
```json
{
  "defaultPlotType": "spiral",
  "defaultOutputFormat": "SVG",
  "defaultParams": "1,NaN,5,-10,10,1",
  "defaultFormula": "sin(x)+cos(x)",
  "defaultDomain": "0,10,0.1"
}
```
Then run:
```bash
node src/lib/main.js --use-config
```

**Diagnostics Mode Example:**
```bash
node src/lib/main.js --diagnostics
```

This enhanced CORE_ENGINE not only streamlines advanced plotting and persistent configuration but also brings powerful formula evaluation capabilities directly into the library, reinforcing our mission to be the go-to solution for formula visualisations.