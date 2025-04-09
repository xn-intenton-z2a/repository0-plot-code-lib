# CORE_ENGINE

## Overview

The CORE_ENGINE is the backbone of our plotting library. It manages advanced plotting, formula evaluation, diagnostics, and now an interactive CLI wizard. The engine integrates numeric parameter validation and supports dynamic plot types along with optional plugin extensions. This update enhances the user experience by offering a guided command-line interface for plot configuration and introduces a new diagnostics mode for improved debugging and configuration transparency.

## Motivation

- **Unified Experience:** Consolidate advanced plotting, configuration, plugin integration, and diagnostics under one cohesive engine.
- **User Guidance:** Lower the barrier for new users with an interactive CLI wizard that guides users through selecting plot types, entering numeric parameters, and choosing themes or plugins.
- **Debugging & Transparency:** Empower developers and users to easily inspect system configurations, environment variables, and plugin statuses via the diagnostics mode.
- **Extensibility:** Seamlessly integrate with the PLUGIN_SYSTEM to allow dynamic addition of new plot types without modifying core logic.

## Implementation Details

1. **Legacy Plotting Support:**
   - Maintain existing plotting functions (spiral, polarHeatmap, dualAxis, etc.) with robust numeric parameter conversion.
   - Ensure error handling is consistent and clear for all numeric inputs.

2. **Interactive CLI Wizard:**
   - **Trigger:** Activate wizard mode with a `--wizard` flag (in addition to the existing `--advanced` flag).
   - **Flow:**
     - Prompt the user to select a plot type from the list of supported plots.
     - Request numeric parameters with inline validation using the established numeric conversion utility.
     - Allow selection of visual themes and optional plugin usage if the PLUGIN_SYSTEM is enabled.
     - Confirm or allow cancellation of the configuration, reverting to default settings if necessary.
   - **Implementation:** Provided in a dedicated module (e.g., `src/lib/cliWizard.js`) and integrated into the main execution flow.

3. **Diagnostics Mode (New):**
   - **Trigger:** Activate using the `--diagnostics` flag.
   - **Behavior:**
     - Display detailed system diagnostics including current configuration settings, active environment variables (e.g., `LOCALE_NAN_ALIASES`, `DEBUG_NUMERIC`), and status of plugin registration.
     - Perform a self-check on numeric conversion utilities to validate accepted NaN aliases and other system settings.
     - Help developers quickly identify misconfigurations, validate expected behavior, and troubleshoot issues.
   - **Implementation:** Integrated into the main control flow (`src/lib/main.js`), with diagnostic information output to the console.

4. **Integration with Existing Functionality:**
   - Re-use the existing numeric validation and plugin integration components.
   - Ensure the new diagnostics mode does not interfere with the CLI wizard or advanced plotting functionalities.
   - Update documentation and tests to cover the new diagnostics feature.

## Usage Examples

**Running the Interactive CLI Wizard:**

```bash
node src/lib/main.js --wizard
```

**Running Advanced Plot Types:**

```bash
node src/lib/main.js --advanced contourPlot "1, NaN, 5, -10, 10, 1"
```

**Viewing Diagnostics Information:**

```bash
node src/lib/main.js --diagnostics
```

In diagnostics mode, users will see output detailing:
- The list of accepted NaN aliases and any localized additions.
- Current configuration settings and environment variable values.
- Status of any plugins loaded through the PLUGIN_SYSTEM.

This enhancement not only bolsters the plotting capabilities but also supports our mission to be the go-to plot library by offering deep insights for debugging, configuration validation, and improved user support.
