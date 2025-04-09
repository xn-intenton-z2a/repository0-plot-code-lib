# CORE_ENGINE

## Overview
The CORE_ENGINE is the backbone of our plotting library. It manages advanced plotting, formula evaluation, diagnostics, and now an interactive CLI wizard. The engine integrates numeric parameter validation and supports dynamic plot types along with optional plugin extensions. This update enhances the user experience by offering a guided command-line interface for plot configuration.

## Motivation
- **Unified Experience:** Consolidate advanced plotting, configuration, and plugin integration under one cohesive engine.
- **User Guidance:** Lower the barrier for new users with an interactive CLI wizard that guides users through selecting plot types, entering numeric parameters, and choosing themes or plugins.
- **Extensibility:** Seamlessly integrate with the PLUGIN_SYSTEM to allow dynamic addition of new plot types without modifying core logic.

## Implementation Details
1. **Legacy Plotting Support:**
   - Maintain existing plotting functions (spiral, polarHeatmap, dualAxis, etc.) with robust numeric parameter conversion.
   - Ensure error handling is consistent and clear for all numeric inputs.

2. **Interactive CLI Wizard:**
   - **Trigger:** Activate the wizard mode with a `--wizard` flag (in addition to the existing `--advanced` flag).
   - **Flow:**
     - Prompt the user to select a plot type from the list of supported plot types.
     - Request numeric parameters with inline validation using the established numeric conversion utility.
     - Allow selection of visual themes and optional plugin usage if the PLUGIN_SYSTEM is enabled.
     - Confirm or allow cancellation of the current configuration, gracefully falling back to default settings if needed.
   - **Single Source File:** The wizard will be implemented in a dedicated module (e.g., `src/lib/cliWizard.js`) and integrated into the main control flow in `src/lib/main.js` when `--wizard` is detected.

3. **Integration with Existing Functionality:**
   - Re-use the existing numeric validation and plugin integration.
   - Update documentation and tests to cover the new wizard mode.

## Usage Examples

**Running the Interactive CLI Wizard:**
```bash
node src/lib/main.js --wizard
```

During execution, the CLI will prompt the user to choose a plot type (e.g., spiral, contourPlot, scatterMatrix), enter required numeric parameters, and optionally select a theme or load a plugin. After confirmation, the engine invokes the appropriate plotting function.

**Fallback Behavior:**
If the user cancels any step, the wizard mode gracefully reverts to a default configuration, ensuring stable operation.

This enhancement aligns with our mission to be the go-to plot library, combining a powerful core engine with a user-friendly, guided configuration experience.