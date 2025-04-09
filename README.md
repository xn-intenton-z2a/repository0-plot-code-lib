# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Enhanced Numeric Parameter Validation

This release includes improvements in numeric parameter handling. The core numeric conversion logic is now implemented in the main module (`src/lib/main.js`) and has been refactored to use the Zod schema validation library for robust and declarative input transformation. Both the CLI and the web interface use this logic to:

1. Validate numeric tokens (integer, decimal, scientific notation) and support multiple indicators for Not-a-Number values. In addition to the traditional token 'NaN' (case insensitive, whitespace-tolerant), a configurable set of alternative aliases are accepted. By default, the following aliases are supported: "nan", "not a number", "notanumber", "na", and "not-a-number". Developers can provide locale-specific aliases via the environment variable `LOCALE_NAN_ALIASES` (as a JSON array) to override or extend the default set. If the provided configuration is invalid (either due to invalid JSON or not being an array), a unified warning message is emitted: "Invalid configuration for LOCALE_NAN_ALIASES. Using default NaN aliases."

2. Optionally, users can completely override the default NaN aliases by setting the environment variable `LOCALE_NAN_OVERRIDE` to a truthy value. When set, the parser will use only the aliases specified in `LOCALE_NAN_ALIASES` without merging them with the default list.

3. Convert numeric string tokens to native JavaScript numbers, converting any token matching the accepted NaN indicators to the native NaN value (`Number.NaN`). Tokens that are near-misses (for example, "n/a") are strictly rejected with a clear error message suggesting the correct accepted tokens.

4. Process all tokens using a unified normalization function that now applies trimming, NFC Unicode normalization, and locale-aware lowercasing. This ensures that both precomposed and decomposed Unicode forms are treated as equivalent, enhancing consistency when handling locale-specific NaN aliases.

5. Process numeric parameters by splitting on commas, semicolons, or whitespace as appropriate, without compromising strict validation of numeric inputs. Extra delimiters, trailing commas, and multiple consecutive separators are gracefully ignored.

6. Provide detailed error messages when encountering invalid numeric inputs. The integration of Zod standardizes and simplifies this validation logic.

7. New Feature: JSON-Based Parameter Configuration

Advanced plot functions now also accept a JSON configuration for more complex parameter setups. When using the `--advanced` flag (or in colon-separated non-advanced mode), if the parameter string starts with a `{` and ends with a `}`, it will be parsed as JSON. This allows you to pass additional options such as labels, colors, and other plot options. For example:

```bash
node src/lib/main.js --advanced boxPlot '{"data": [1, 2, 3, 4], "title": "My Box Plot", "color": "blue"}'
```

The advanced plot functions will then receive the configuration object, making it easy to set up more complex plots.

## Customizable Error Handling Hooks

In this release, the numeric parameter parsing function `parseNumericParams` has been enhanced to accept an optional error handling callback. When provided, instead of terminating the process on encountering an invalid token (or near-miss token like "n/a"), the callback is invoked with the error message. This allows CLI and web interfaces to implement custom error reporting, logging, or recovery strategies. For example:

```javascript
// Using a custom error handler
try {
  const params = parseNumericParams("1,abc,5", (errMsg) => {
    // Custom error processing
    console.error('Custom error handler:', errMsg);
  });
} catch (err) {
  // Handle the error as needed
}
```

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

Run the following command to see advanced plotting in action with robust numeric conversion (including handling of spaces, semicolons, mixed delimiters, scientific notation, various NaN aliases, localized aliases via `LOCALE_NAN_ALIASES`, standardized Unicode normalization, trailing delimiters, and JSON configuration):

```bash
# Example with advanced plotting using numeric parameters
node src/lib/main.js --advanced testPlot " 1, NaN ; 5  , -10, 10, 1;"

# Example with advanced plotting using JSON configuration
node src/lib/main.js --advanced boxPlot '{"data": [1, 2, 3, 4], "title": "My Box Plot", "color": "blue"}'
```

**Expected Console Output (Numeric):**

```
Advanced Plot: Test Plot
Test Plot with params: [ 1, NaN, 5, -10, 10, 1 ]
```

**Expected Console Output (JSON):**

```
Advanced Plot: Box Plot
Plotting box plot with params: { data: [1, 2, 3, 4], title: 'My Box Plot', color: 'blue' }
```

### Advanced Plotting: Contour Plot

```bash
node src/lib/main.js --advanced contourPlot "1; NaN  5, -10, 10"
```

**Expected Console Output:**

```
Advanced Plot: Contour Plot
Plotting contour plot with params: [ 1, NaN, 5, -10, 10 ]
```

### Advanced Plotting: Scatter Matrix

```bash
node src/lib/main.js --advanced scatterMatrix "1, NaN, 5, -10, 10, 1"
```

**Expected Console Output:**

```
Advanced Plot: Scatter Matrix
Plotting scatter matrix with params: [ 1, NaN, 5, -10, 10, 1 ]
```

### CLI Usage in Non-Advanced Mode

When running without the `--advanced` flag, the CLI automatically parses arguments that are colon-separated by splitting them into a label and numeric parameters or a JSON configuration. For example:

```bash
node src/lib/main.js "quad: 1 ; 2.14e-3  not a number   -3.5E+2"
node src/lib/main.js "chart:{\"data\": [10, 20, 30], \"label\": \"Test\"}"
```

**Expected Console Output:**

```
Run with: [["quad", [1, NaN, 5, -10, 10]]]
Run with: [["chart", { data: [10, 20, 30], label: "Test" }]]
```

(Note: When using JSON.stringify, native NaN values are serialized as null.)

### Web Interface Usage

The web interface provides similar numeric parameter validation. To test it locally:

1. Start the web server:

```bash
npm run start:web
```

2. Open your browser and navigate to `http://localhost:3000` (or the port specified by the `PORT` environment variable). Use the provided form to select an advanced plot type (e.g., "spiral", "contourPlot", or "scatterMatrix") and enter a set of parameters, either as numeric values or a JSON configuration.

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

Additionally, to completely override the default NaN aliases, set the environment variable `LOCALE_NAN_OVERRIDE` (to any truthy value). This ensures that only the aliases specified in `LOCALE_NAN_ALIASES` are recognized as NaN.

## Custom Error Handling

With the new error handling hook in `parseNumericParams`, users can now supply an optional callback to customize error reporting. This is especially useful when integrating the library into environments where default process termination is not desired (e.g., web servers or GUI applications). Refer to the example in the Customizable Error Handling Hooks section above.

## Utility Module

All logic for parsing and normalizing NaN aliases is now incorporated within the main module (`src/lib/main.js`), simplifying module resolution and reducing file dependencies. The integration of Zod for validation further enhances the reliability and maintainability of the numeric parameter processing.

## License

MIT
