# CORE_ENGINE

## Overview
The CORE_ENGINE remains the backbone of our plotting library, handling advanced plotting, formula evaluation, diagnostics, interactive CLI wizard, preview mode, built-in help, web integration, and persistent user configuration. This update enriches the feature set by incorporating an Interactive CLI Wizard, enabling users to configure plots and formulas through a guided, step-by-step interface.

## Motivation
- **Advanced Plotting:** Continue supporting diverse output formats (SVG, JSON, CSV, Markdown, ASCII, HTML) and a variety of plot types including spiral, polar heatmap, dual axis, and more.
- **User Guidance:** Lower the entry barrier for new users via an interactive CLI wizard that walks them through plot configuration, parameter input, and theme selection.
- **Unified Experience:** Consolidate configuration management (including numeric parameter validation, theme customizations, and plugin integrations) under a single, extensible core.

## Implementation Details
1. **Plotting and Formula Evaluation:**
   - Retain existing capabilities for numeric validation, regex-based parsing, and formula evaluation through libraries like mathjs.
   - Ensure advanced plot types (e.g., spiral, contour plot, scatter matrix) continue to be invoked correctly with parsed parameters.

2. **Visual Themes and Diagnostics:**
   - Integrate customizable visual themes. Users can pass a `--theme` flag or persist preferences through configuration files.
   - Maintain diagnostics mode (`--diagnostics`) that runs self-tests and health checks.

3. **Interactive CLI Wizard:**
   - **Design:** Introduce a guided CLI wizard (triggered via a `--wizard` flag) that interactively prompts users for plot type, numeric parameters, theme selection, and optional plugin usage.
   - **Flow:** 
     - Start by asking the user to select a plot type from a list of supported types.
     - Prompt for numeric inputs with inline validation (leveraging the existing numeric conversion logic).
     - Provide an option to choose or define a visual theme.
     - Optionally, offer plugin integration if the PLUGIN_SYSTEM is active.
   - **Integration:** Embed the wizard logic within a single module (e.g., `src/lib/cliWizard.js`) that is invoked from the main entry point when the `--wizard` flag is detected. The wizard should gracefully fallback to default settings if the user opts to cancel any step.

4. **Testing and Documentation:**
   - Update unit and integration tests to cover the interactive CLI wizard functionality.
   - Revise the README and CONTRIBUTING guides with usage examples of the wizard mode, including step-by-step prompts and fallback behaviors.

## Usage Examples

**Running a Guided CLI Wizard:**
```bash
node src/lib/main.js --wizard
```

During execution, the user is prompted to:
- Select a plot type (e.g., spiral, contourPlot, scatterMatrix)
- Enter numeric parameters with real-time validation
- Choose a visual theme (from a list of pre-defined options such as darkMode or lightMode)
- Confirm or modify plugin integrations (if desired)

The wizard then consolidates these inputs and triggers the corresponding plotting function in the CORE_ENGINE.

This enhancement reinforces our mission to be the go-to plot library by making advanced plotting more accessible and user-friendly, while keeping the repository lean and maintainable.