# CORE_ENGINE

## Overview
The CORE_ENGINE is the backbone of our plotting library. It not only manages advanced plotting functions such as spiral, polarHeatmap, dualAxis, and more, but also now robustly handles numeric parameter validation, interactive CLI wizard operations, and system diagnostics. This integration ensures that numeric inputs are safely and consistently converted using features like Unicode normalization and caching of NaN aliases.

## Motivation
- **Unified Experience:** Bring advanced plotting, precise numeric parameter validation, plugin integration, and diagnostics into one cohesive engine.
- **Improved Reliability:** Ensure all numeric inputs are processed with rigorous validation using a well-defined set of accepted NaN aliases (e.g., "nan", "not a number", "notanumber", "na", "not-a-number") and locale-specific configurations.
- **User Guidance:** Provide an interactive CLI wizard to guide users through plot configuration, along with a diagnostics mode for error-checking and system configuration review.

## Numeric Parameter Validation
- **Consolidated Validation:** Utilizes a dedicated utility within the CORE_ENGINE to parse numeric parameters. The utility applies a strict regex for integer, decimal, and scientific notation values.
- **NaN Handling:** Automatically converts any token matching the accepted NaN aliases to the native JavaScript NaN. The system supports locale-specific aliases via the `LOCALE_NAN_ALIASES` environment variable, with caching applied when no locale customization is provided.
- **Error Messaging:** Provides clear error messages if malformed inputs or near-miss tokens (e.g., "n/a") are detected, suggesting the accepted tokens.
- **Integration:** This validation mechanism is used uniformly across both CLI and WEB_API inputs, ensuring consistency across the repository.

## Interactive CLI Wizard
- **Guided Workflow:** When triggered with the `--wizard` flag, the CLI presents a step-by-step interface that helps users choose the plot type, enter numeric parameters with inline validation, and optionally select plugins.
- **Validation Integration:** The wizard leverages the numeric parameter utility to ensure all inputs meet strict standards, incorporating detailed real-time feedback when errors are detected.
- **User Flexibility:** Users can confirm or cancel the configuration, reverting to defaults if needed.

## Diagnostics Mode
- **Comprehensive Diagnostics:** Activated using the `--diagnostics` flag, this mode displays detailed system diagnostics including current numeric configuration, environment variables (like `LOCALE_NAN_ALIASES` and `DEBUG_NUMERIC`), and plugin status information.
- **Self-Check Capabilities:** Performs a self-check on numeric conversion utilities to verify that accepted aliases are applied correctly, and that caching is operational to optimize performance.
- **Troubleshooting Support:** Provides clear logging for any issues encountered during numeric conversion or plugin integration, making it easier for developers and users to diagnose problems.

## Integration with Other Components
- **Plugin System:** Seamlessly integrates with the PLUGIN_SYSTEM, so that any dynamic extensions can contribute to both interactive plotting and diagnostics reports.
- **Web API:** Shares common utilities (numeric validation, error handling) with the WEB_API, ensuring consistency throughout CLI and web-based interactions.

## Usage Examples

**Running the Interactive CLI Wizard:**
```bash
node src/lib/main.js --wizard
```

**Running Advanced Plot Types with Validation:**
```bash
node src/lib/main.js --advanced contourPlot "1, NaN, 5, -10, 10, 1"
```

**Viewing Diagnostics Information:**
```bash
node src/lib/main.js --diagnostics
```

This comprehensive CORE_ENGINE update not only bolsters the plotting capabilities but also embeds robust input validation and diagnostic support, reinforcing our mission to be the go-to plot library for formulae visualisations.