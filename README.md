# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Enhanced Numeric Parameter Validation

This release includes improvements in numeric parameter handling. The core numeric conversion logic is now implemented in the main module (`src/lib/main.js`) with consolidated and optimized regex-based validation. Both the CLI and the web interface use this logic to:

1. Validate numeric tokens (integer, decimal, scientific notation) and support multiple indicators for Not-a-Number values. In addition to the traditional token 'NaN' (case insensitive, whitespace-tolerant), a configurable set of alternative aliases are accepted. By default, the following aliases are supported: "nan", "not a number", "notanumber", "na", and "not-a-number". Developers can provide locale-specific aliases via the environment variable `LOCALE_NAN_ALIASES` (as a JSON array) to override or extend the default set. If the provided JSON is invalid, a warning will be emitted and the default set will be used.

2. Convert numeric string tokens to native JavaScript numbers, converting any token matching the accepted NaN indicators to the native NaN value (Number.NaN) for a unified representation across advanced and non-advanced modes.

3. Process all tokens and aliases using Unicode normalization (NFC) in addition to lower-casing and trimming, ensuring that visually equivalent Unicode representations are recognized as valid.

4. Provide detailed error messages when encountering invalid numeric inputs. In particular, near-miss tokens like "n/a" now trigger an error message that clearly states the token is invalid and suggests the accepted aliases.

5. Gracefully ignore empty tokens resulting from extra commas (including trailing commas), enhancing usability without compromising strict validation of numeric inputs.

6. Improve performance by caching the set of accepted NaN aliases when no locale-specific configuration is provided, avoiding redundant parsing of the environment variable on every numeric conversion. Note that when `LOCALE_NAN_ALIASES` is provided, caching is bypassed to ensure the latest configuration is used.

**Refactoring Note:**

The logic for parsing and normalizing NaN aliases has been implemented inline within the main module (`src/lib/main.js`), eliminating the need for a separate utility module. This promotes tighter integration, ease of maintenance, and improved performance via caching when applicable.

Additionally, debug logging can be enabled via the environment variable `DEBUG_NUMERIC` to trace when NaN aliases are normalized.

## Debug Logging for Numeric Conversion

Developers can enable debug logging to trace when NaN aliases are normalized. Set the environment variable `DEBUG_NUMERIC` to any truthy value to activate detailed logging. For example:

```bash
export DEBUG_NUMERIC=true
node src/lib/main.js "quad: 1 , na, 5"
```

This will log messages like:

```
Normalized token 'na' to native NaN
```

## Examples

### CLI Usage with Advanced Plotting

Run the following command to see advanced plotting in action with robust numeric conversion (including handling of spaces, scientific notation, various NaN aliases, localized aliases via `LOCALE_NAN_ALIASES`, Unicode normalization, and trailing commas):

```bash
# Example with advanced plotting using the --advanced flag
node src/lib/main.js --advanced testPlot " 1, NaN , 5, -10, 10, 1,"
```

**Expected Console Output:**

```
Advanced Plot: Test Plot
Test Plot with params: [ 1, NaN, 5, -10, 10, 1 ]
```

### Advanced Plotting: Contour Plot

To render a contour plot, use the --advanced flag with the contourPlot option:

```bash
node src/lib/main.js --advanced contourPlot "1, NaN, 5, -10, 10, 1"
```

**Expected Console Output:**

```
Advanced Plot: Contour Plot
Plotting contour plot with params: [ 1, NaN, 5, -10, 10, 1 ]
```

### Advanced Plotting: Scatter Matrix

For scatter matrix plots, use the --advanced flag with the scatterMatrix option:

```bash
node src/lib/main.js --advanced scatterMatrix "1, NaN, 5, -10, 10, 1"
```

**Expected Console Output:**

```
Advanced Plot: Scatter Matrix
Plotting scatter matrix with params: [ 1, NaN, 5, -10, 10, 1 ]
```

### CLI Usage in Non-Advanced Mode

When running without the `--advanced` flag, the CLI automatically parses any parameter that is a comma-separated string, converting numbers accordingly. For example:

```bash
node src/lib/main.js "quad: 1 , 2.14e-3 , not a number , -3.5E+2"
```

**Expected Console Output:**

```
Run with: ["quad", [1, 0.00214, null, -350]]
```

(Note: In JSON conversion, native NaN is represented as null.)

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

## Localization Support

To support users from different locales, you can customize the accepted NaN aliases by setting the `LOCALE_NAN_ALIASES` environment variable. For example, to accept the German alias "nicht eine zahl" as NaN, run:

```bash
export LOCALE_NAN_ALIASES='["nicht eine zahl"]'
node src/lib/main.js "quad: 1, nicht eine zahl, 5"
```

This feature ensures that numeric validation can adapt to various regional formats and terminologies. Additionally, if the environment variable `LOCALE_NAN_ALIASES` contains invalid JSON, a warning is logged and the default set of aliases is used.

## Additional Details

- Valid numeric inputs include integers, decimals, and numbers in scientific notation (e.g., `1e4`, `2.14e-3`, `-3.5E+2`).
- Various representations of NaN (default or localized) are accepted and converted to the native NaN value (Number.NaN) to ensure a consistent interface.
- Near-miss tokens like "n/a" now trigger an error message that clearly states the token is invalid and suggests the accepted aliases.
- Empty tokens resulting from extra commas (including trailing commas) are now gracefully ignored.
- Debug logging can be enabled via `DEBUG_NUMERIC` to track NaN normalization.
- Caching of accepted NaN aliases is applied when no locale-specific configuration is provided to optimize performance, while always using the current configuration when `LOCALE_NAN_ALIASES` is set.
- The CLI and web interface now provide unified behavior in handling numeric parameters, ensuring a robust and user-friendly experience.

## Utility Module

The normalization of NaN aliases is now implemented inline within the main module (`src/lib/main.js`), eliminating the need for a separate utility module.

## License

MIT
