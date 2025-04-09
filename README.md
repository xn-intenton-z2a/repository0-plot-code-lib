# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Enhanced Numeric Parameter Validation

This release includes improvements in numeric parameter handling. The core numeric conversion logic is now directly implemented in the main module with enhanced regex-based validation. Both the CLI and the web interface use this logic to:

1. Validate numeric tokens (integer, decimal, scientific notation) and support multiple indicators for Not-a-Number values. In addition to the traditional token 'NaN' (case insensitive, whitespace-tolerant), the following alternative aliases are now accepted: "not a number", "notanumber", and "na".
2. Convert numeric string tokens to native JavaScript numbers, converting any token matching the accepted NaN indicators to the string "NaN" for a unified representation across advanced and non-advanced modes.
3. Provide detailed error messages when encountering invalid numeric inputs. In particular, near-miss tokens like 'n/a' now produce an error message suggesting the accepted alternatives.

This approach ensures that both the CLI output and the advanced plotting functions work with a consistent representation for NaN.

## Debug Logging for Numeric Conversion

Developers can enable debug logging to trace when NaN aliases are normalized. Set the environment variable `DEBUG_NUMERIC` to any truthy value to activate detailed logging. For example:

```bash
export DEBUG_NUMERIC=true
node src/lib/main.js "quad: 1 , na, 5"
```

This will log messages like:

```
Normalized token 'na' to "NaN"
```

## Examples

### CLI Usage with Advanced Plotting

Run the following command to see advanced plotting in action with robust numeric conversion (including handling of spaces, scientific notation, and various NaN aliases):

```bash
# Example with advanced plotting using the --advanced flag
node src/lib/main.js --advanced testPlot " 1, NaN , 5, -10, 10, 1"
```

**Expected Console Output:**
```
Advanced Plot: Test Plot
Test Plot with params: [ 1, "NaN", 5, -10, 10, 1 ]
```

### Advanced Plotting: Contour Plot

A new advanced plotting feature for contour plots has been added. To render a contour plot, use the --advanced flag with the contourPlot option:

```bash
node src/lib/main.js --advanced contourPlot "1, NaN, 5, -10, 10, 1"
```

**Expected Console Output:**
```
Advanced Plot: Contour Plot
Plotting contour plot with params: [ 1, "NaN", 5, -10, 10, 1 ]
```

### Advanced Plotting: Scatter Matrix

A new advanced plotting feature for scatter matrix plots has been introduced. This feature visualizes correlations among multiple variables in a grid layout. Use the --advanced flag with the scatterMatrix option:

```bash
node src/lib/main.js --advanced scatterMatrix "1, NaN, 5, -10, 10, 1"
```

**Expected Console Output:**
```
Advanced Plot: Scatter Matrix
Plotting scatter matrix with params: [ 1, "NaN", 5, -10, 10, 1 ]
```

### CLI Usage in Non-Advanced Mode

When running without the `--advanced` flag, the CLI automatically parses any parameter that is a comma-separated string, converting numbers accordingly. For example:

```bash
node src/lib/main.js "quad: 1 , 2.14e-3 , not a number , -3.5E+2"
```

**Expected Console Output:**
```
Run with: ["quad", [1, 2.14e-3, "NaN", -350]]
```

### Web Interface Usage

The web interface provides similar numeric parameter validation. To test it locally:

1. Start the web server:

```bash
npm run start:web
```

2. Open your browser and navigate to `http://localhost:3000` (or the port specified by the `PORT` environment variable). Use the provided form to select an advanced plot type (e.g., "spiral", "contourPlot", or "scatterMatrix") and enter a set of parameters, such as:

```
1, na, 5, -10, 10, 1
```

3. Submit the form to see the converted parameters and a confirmation page indicating that the correct plotting function was invoked.

You can also test using a simple cURL command:

```bash
curl -X POST http://localhost:3000/plot -d "plotType=spiral&params=1, not anumber ,5, -10, 10, 1"
```

## Additional Details

- Valid numeric inputs include integers, decimals, and numbers in scientific notation (e.g., `1e4`, `2.14e-3`, `-3.5E+2`).
- Various representations of NaN ("NaN", "not a number", "notanumber", "na") are accepted and converted to the string "NaN" to ensure a consistent interface.
- Near-miss tokens like "n/a" now trigger an error message with suggestions for the accepted tokens.
- Debug logging can be enabled via `DEBUG_NUMERIC` to track NaN normalization.
- The CLI and web interface now provide a unified behavior in handling numeric parameters, ensuring a robust and user-friendly experience.

## License

MIT