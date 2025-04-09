# CORE_ENGINE

## Overview
The CORE_ENGINE is the backbone of our plotting library. It manages advanced plotting functions (such as spiral, polarHeatmap, dualAxis, boxPlot, violinPlot, cumulativeAverage, inverse, modulatedSine, extended3D, testPlot, contourPlot, scatterMatrix), robust numeric parameter validation, interactive CLI wizard operations, and system diagnostics. It seamlessly integrates with the plugin system to offer dynamic plot extensions and is aligned with our mission to be the go-to plot library for formulae visualisations.

## Numeric Parameter Validation
- **Consolidated Validation:** Uses a dedicated utility to parse numeric parameters. The regex validates integer, decimal, and scientific notation values.
- **NaN Handling:** Converts tokens matching accepted NaN aliases (by default: "nan", "not a number", "notanumber", "na", "not-a-number") into native NaN values. Locale-specific aliases can be provided using the `LOCALE_NAN_ALIASES` environment variable.
- **Normalization & Caching:** Applies lower-casing, Unicode NFC normalization, and whitespace trimming to ensure consistent token processing. Caching accelerates repeated lookups when no locale customization is provided.
- **Error Messaging:** Provides detailed error messages for malformed inputs, including near-miss tokens like "n/a" with suggestion notes.

## Interactive CLI Wizard & Diagnostics Mode
- **CLI Wizard:** Triggered with the `--wizard` flag, it guides users through plot configuration while providing real-time numeric validation feedback.
- **Diagnostics Mode:** Activated with the `--diagnostics` flag, it outputs system diagnostics including numeric configuration, environment variables (e.g., `LOCALE_NAN_ALIASES`, `DEBUG_NUMERIC`), and plugin status information for troubleshooting.

## Integration with Plugins and Web API
- **Plugin Integration:** The engine loads and manages plugins that can extend or modify plotting behavior. Plugin status is displayed in both the CLI wizard and diagnostics mode.
- **Web API Re-use:** Shares utilities such as numeric validation and error handling with the unified WEB_API to ensure a consistent experience across CLI and web interactions.

## Formula Parsing
In response to user needs for more dynamic formula input, the CORE_ENGINE now incorporates a formula parsing module:

### Overview
- **Purpose:** Allows users to input mathematical formulae (e.g., "sin(x)", "x^2 + 3x + 2") directly, which are then parsed to generate parameters or configuration required by the plotting functions.
- **Mission Alignment:** This enhancement directly supports our mission of providing formulae visualisations by enabling users to convert algebraic expressions into meaningful plot data.

### Implementation Details
- **Parser Integration:** Utilizes the `mathjs` library to parse and evaluate mathematical expressions.
- **Command-line Flag:** A new flag `--formula` can be introduced, accepting a formula string. The parser then extracts parameters such as coefficients, function type, or range values to streamline plot setup.
- **Error Handling:** Built-in error detection for malformed formulae with detailed messaging to guide users in correcting input errors.
- **Interoperability:** The parsed output integrates seamlessly with existing numeric parameter handling, allowing further refinements and validations as needed.

### Usage Examples
- **CLI Example:** 
```bash
node src/lib/main.js --formula "sin(x)" 
```
This will parse the trigonometric formula, determine appropriate parameter ranges, and provide a prompt for further plot customization.

- **Combined Usage:** Users can mix formula input with explicit numeric parameters for complex plotting scenarios (e.g., combining a parsed quadratic formula with advanced plot templates).

## Testing & Documentation
- **Test Coverage:** Unit tests and integration tests are updated to cover formula parsing scenarios, ensuring robust error handling and accurate parameter extraction.
- **Documentation Updates:** README and CONTRIBUTING guides now include sections on how to use and extend formula parsing, with examples provided for both CLI and web interactions.

## Benefits
- **Ease of Use:** Users can quickly transition from mathematical expressions to visual plots without manual conversion of parameters.
- **Error Reduction:** Automated parsing reduces manual input errors when configuring advanced plots.
- **Enhanced Flexibility:** Supports a broader range of plotting scenarios by allowing dynamic, text-based configuration of plot parameters.
