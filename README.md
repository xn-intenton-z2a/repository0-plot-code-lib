# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Enhanced Numeric Parameter Validation

This release includes improvements in numeric parameter handling. The core numeric conversion logic is now implemented in the main module (`src/lib/main.js`) and has been refactored to use the Zod schema validation library for robust and declarative input transformation. Both the CLI and the web interface use this logic to:

1. Validate numeric tokens (integer, decimal, scientific notation) and support multiple indicators for Not-a-Number values. In addition to the traditional token 'NaN' (case insensitive, whitespace-tolerant), a configurable set of alternative aliases are accepted. By default, the following aliases are supported: "nan", "not a number", "notanumber", "na", and "not-a-number". Developers can provide locale-specific aliases via the environment variable `LOCALE_NAN_ALIASES` (as a JSON array) to override or extend the default set. If the provided configuration is invalid (either due to invalid JSON or not being an array), a unified warning message is emitted: "Invalid configuration for LOCALE_NAN_ALIASES. Using default NaN aliases."

2. Optionally, users can completely override the default NaN aliases by setting the environment variable `LOCALE_NAN_OVERRIDE` to a truthy value. When set, the parser will use only the custom aliases provided in `LOCALE_NAN_ALIASES` without merging them with the default list.

3. Convert numeric string tokens to native JavaScript numbers, converting any token matching the accepted NaN indicators to the native NaN value (`Number.NaN`) for a unified representation across advanced and non-advanced modes.

4. Process all tokens using Unicode normalization (NFC) in addition to lower-casing and trimming. Numeric parameters are split by commas or semicolons when present, preserving multi-word NaN aliases, and fallback to splitting by whitespace if no comma or semicolon is found. This ensures that visually equivalent Unicode representations and multi-word aliases are recognized as valid.

5. Provide detailed error messages when encountering invalid numeric inputs. In particular, near-miss tokens like "n/a" now trigger an error message that clearly states the token is invalid and suggests the accepted aliases. The integration of Zod helps standardize and simplify this validation logic.

6. Gracefully ignore empty tokens resulting from extra delimiters (including trailing delimiters and multiple consecutive commas, semicolons, or spaces), enhancing usability without compromising strict validation of numeric inputs.

7. Improve performance and maintainability by leveraging Zod's schema-based validation, making the code more declarative and robust against edge case errors.

**New Feature:**

Numeric parameter parsing now supports additional delimiters including semicolons. For example, both "1, NaN, 5" and "1;NaN;5" or even "1  NaN  5" (whitespace-separated) are correctly parsed. Additionally, you can fully override the default NaN aliases using the `LOCALE_NAN_OVERRIDE` flag.

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

Run the following command to see advanced plotting in action with robust numeric conversion (including handling of spaces, semicolons, mixed delimiters, scientific notation, various NaN aliases, localized aliases via `LOCALE_NAN_ALIASES`, Unicode normalization, and trailing delimiters):

```bash
# Example with advanced plotting using the --advanced flag
node src/lib/main.js --advanced testPlot " 1, NaN ; 5  , -10, 10, 1;"
```

**Expected Console Output:**

```
Advanced Plot: Test Plot
Test Plot with params: [ 1, NaN, 5, -10, 10, 1 ]
```

### Advanced Plotting: Contour Plot

To render a contour plot, use the --advanced flag with the contourPlot option:

```bash
node src/lib/main.js --advanced contourPlot "1; NaN  5, -10, 10"
```

**Expected Console Output:**

```
Advanced Plot: Contour Plot
Plotting contour plot with params: [ 1, NaN, 5, -10, 10 ]
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

When running without the `--advanced` flag, the CLI automatically parses arguments that are colon-separated by splitting them into a label and numeric parameters. For example:

```bash
node src/lib/main.js "quad: 1 ; 2.14e-3  not a number   -3.5E+2"
```

**Expected Console Output:**

```
Run with: [["quad", [1,0,5,-10,10]]]
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
1; na; 5 , -10  10, 1
```

3. Submit the form to see the converted parameters and a confirmation page indicating that the correct plotting function was invoked.

You can also test using a simple cURL command:

```bash
curl -X POST http://localhost:3000/plot -d "plotType=spiral&params=1, not anumber ,5"
```

## Localization Support

To support users from different locales, you can customize the accepted NaN aliases by setting the `LOCALE_NAN_ALIASES` environment variable. For example, to accept the German alias "nicht eine zahl" as NaN, run:

```bash
export LOCALE_NAN_ALIASES='["nicht eine zahl"]'
node src/lib/main.js "quad: 1, nicht eine zahl, 5"
```

Additionally, to completely override the default NaN aliases, set the `LOCALE_NAN_OVERRIDE` environment variable (to any truthy value). This ensures that only the aliases specified in `LOCALE_NAN_ALIASES` are recognized as NaN.

## Utility Module

All logic for parsing and normalizing NaN aliases is now incorporated within the main module (`src/lib/main.js`), simplifying module resolution and reducing file dependencies. The integration of Zod for validation further enhances the reliability and maintainability of the numeric parameter processing.

## License

MIT
