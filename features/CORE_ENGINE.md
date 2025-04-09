# CORE_ENGINE Feature

## Overview
The CORE_ENGINE is the backbone of our plotting library. It is responsible for advanced plotting functions, robust numeric parameter validation, an interactive CLI wizard, formula parsing, diagnostics mode, and configuration file support. In this update, the CORE_ENGINE is enhanced not only to include configuration file support but also to incorporate a unified logging system for improved diagnostics and maintainability.

## Configuration File Support
- **Purpose:** Allow users to define plot configurations via external JSON or YAML files. This enables pre-setting parameters and defaults without relying solely on CLI arguments.
- **Implementation:**
  - A dedicated configuration loader module reads the file specified via the `--config` flag.
  - Determines file format by extension and loads configuration data accordingly.
  - Merges or overrides command-line parameters with configuration file settings (with CLI arguments taking precedence).
  - Provides clear error messages when the configuration file is missing or malformed.

## Advanced Plotting and CLI Wizard
- **Interactive CLI:** The engine drives an interactive wizard for plot selection and dynamic parameter input.
- **Advanced Flag:** With the `--advanced` flag, users can invoke advanced plotting routines that include multiple plot types (e.g., spiral, polarHeatmap, dualAxis, etc.) with validated numeric parameters.
- **Numeric Parameter Validation:** Implements robust regex-based numeric validation supporting integers, decimals, and scientific notation. It also handles various NaN aliases (including localized aliases via the `LOCALE_NAN_ALIASES` environment variable) with unicode normalization.

## Enhanced Logging and Diagnostics
- **Unified Logging Module:** Introduces a centralized logging solution that replaces ad hoc console logging. This module provides:
  - **Consistent Format:** Timestamped and severity-based logs (e.g., INFO, DEBUG, ERROR).
  - **Dynamic Verbosity:** Controlled via environment variables (such as `DEBUG_NUMERIC`, `DEBUG_WEB`, `LOG_LEVEL`, etc.)
  - **Integration:** Logging is integrated across the configuration loader, numeric parameter conversion, CLI wizard, and diagnostics modes, offering a consistent view of internal operations.
  - **Optional File Logging:** If enabled via an environment variable (e.g., `LOG_FILE`), logs can also be written to a designated file.
- **Benefits:** Improves troubleshooting by providing clear, uniform diagnostic messages and facilitating easier maintenance.

## Implementation Details
- Expand the main module (`src/lib/main.js`) to include the logging utility functions.
- Refactor existing console calls to use the new logging module where appropriate.
- Maintain backward compatibility with existing outputs while adding enhanced structure and detail.
- Update unit tests to verify both functional outcomes and proper log outputs when debug modes are enabled.

## Usage Examples
- **CLI Invocation with Config File:**
  ```bash
  node src/lib/main.js --config config.json "quad: 1, NaN, 5,-10,10,1"
  ```
- **Advanced Plotting with Enhanced Logging:**
  ```bash
  export DEBUG_NUMERIC=true
  export LOG_LEVEL=DEBUG
  node src/lib/main.js --advanced testPlot "1, NaN, 5, -10, 10, 1"
  ```
- **Error Scenario:**
  If a configuration file is missing or malformed, the unified logger outputs a timestamped error message, and the system falls back to default settings.

## Testing and Documentation
- All changes are covered with unit tests in the `tests/unit` and `tests/web` directories.
- Documentation is updated in the README and CONTRIBUTING files to explain configuration file usage, debug logging, and diagnostics enhancements.

This update brings the CORE_ENGINE in line with our mission by not only enhancing the plotting and configuration capabilities but also by ensuring maintainability and ease-of-troubleshooting through a unified logging system.