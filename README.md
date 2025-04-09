# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Enhanced Numeric Parameter Validation

This release includes improvements in numeric parameter handling. The core numeric conversion logic is now implemented in the main module (`src/lib/main.js`) and has been refactored to use the Zod schema validation library for robust and declarative input transformation. Both the CLI and the web interface use this logic to:

1. Validate numeric tokens (integer, decimal, scientific notation) and support multiple indicators for Not-a-Number values. In addition to the traditional token 'NaN' (case insensitive, whitespace-tolerant), a configurable set of alternative aliases are accepted. By default, the following aliases are supported:

   - English: "nan", "not a number", "notanumber", "na", "not-a-number"
   - German: "nicht eine zahl"
   - French: "pas un nombre"
   - Spanish: "no es un número"
   - Italian: "non è un numero"

   Developers can provide locale-specific aliases via the environment variable `LOCALE_NAN_ALIASES` (as a JSON array) to override or extend the default set. If the provided configuration is invalid (either due to invalid JSON or not being an array), a unified warning message is emitted: "Invalid configuration for LOCALE_NAN_ALIASES. Using default NaN aliases." When the environment variable `LOCALE_NAN_OVERRIDE` is set (to any truthy value), only the provided aliases will be used.

2. Convert numeric string tokens to native JavaScript numbers, converting any token matching the accepted NaN indicators to the native NaN value (`Number.NaN`). Tokens that are near-misses (for example, "n/a") are strictly rejected with a clear error message detailing the accepted tokens (provided in sorted order).

3. Process all tokens using a unified normalization function that applies trimming, NFC Unicode normalization, and locale-aware lowercasing. This ensures consistent handling of both precomposed and decomposed Unicode forms, particularly for locale-specific NaN aliases.

4. Process numeric parameters by intelligently splitting on commas, semicolons, or whitespace, while gracefully ignoring extra delimiters, trailing commas, and multiple consecutive separators.

5. Provide detailed error messages when encountering invalid numeric inputs. The integration of Zod standardizes and simplifies this validation logic.

6. New Feature: JSON-Based Parameter Configuration

   Advanced plot functions now also accept a JSON configuration for more complex parameter setups. When using the `--advanced` flag (or in colon-separated non-advanced mode), if the parameter string starts with a `{` and ends with a `}`, it will be parsed as JSON. This allows you to pass additional options such as labels, colors, and other plot settings. For example:

   ```bash
   node src/lib/main.js --advanced boxPlot '{"data": [1, 2, 3, 4], "title": "My Box Plot", "color": "blue"}'
   ```

7. Customizable Error Handling Hooks

   The numeric parameter parsing function `parseNumericParams` now accepts an optional error handling callback. When provided, instead of terminating the process on encountering an invalid token or near-miss token (like "n/a"), the callback is invoked with a descriptive error message. This allows the CLI and web interfaces to implement custom error reporting and recovery strategies.

8. Debug Logging for Numeric Conversion

   Developers can enable debug logging to trace NaN alias normalization by setting the environment variable `DEBUG_NUMERIC` to a truthy value. For example:

   ```bash
   export DEBUG_NUMERIC=true
   node src/lib/main.js "quad: 1, na, 5"
   ```

   This will log messages such as:

   ```
   Normalized token 'na' to native NaN
   ```

9. Locale-Specific Number Formatting (New)

   By enabling thousands separator parsing using the environment variable `ENABLE_THOUSANDS_SEPARATOR`, the parser can now handle locale-specific number formats. Set `NUMERIC_LOCALE` to specify the format:

   - For English (e.g., "1,234.56" becomes 1234.56), set `NUMERIC_LOCALE=en`.
   - For European formats (e.g., "1.234,56" becomes 1234.56), set `NUMERIC_LOCALE=eu`.

   Example for English:

   ```bash
   export ENABLE_THOUSANDS_SEPARATOR=true
   export NUMERIC_LOCALE=en
   node src/lib/main.js "quad: 1,234.56, NaN, 7,890"
   ```

   Example for European:

   ```bash
   export ENABLE_THOUSANDS_SEPARATOR=true
   export NUMERIC_LOCALE=eu
   node src/lib/main.js "quad: 1.234,56, NaN, 7,890"
   ```

10. Optimization: The normalization of NaN aliases is now computed once per parsing call to improve performance and ensure consistency across both advanced and non-advanced modes.

## Examples

### CLI Usage with Advanced Plotting

Run the following command to see advanced plotting in action with robust numeric conversion (including handling of different delimiters, scientific notation, various NaN aliases including international variants, strict rejection of near-miss tokens, JSON configuration support, and locale-specific number formatting):

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

### CLI Usage in Non-Advanced Mode

When running without the `--advanced` flag, the CLI automatically parses arguments that are colon-separated into a label and numeric parameters or a JSON configuration. For example:

```bash
node src/lib/main.js "quad: 1 ; 2.14e-3  not a number   -3.5E+2"
node src/lib/main.js "chart:{\"data\": [10, 20, 30], \"label\": \"Test\"}"
```

**Expected Console Output:**

```
Run with: [["quad", [1, NaN, 5, -10, 10]]]
Run with: [["chart", { data: [10, 20, 30], label: "Test" }]]
```

### International NaN Aliases

The parser now natively recognizes international representations of NaN. For example:

```bash
node src/lib/main.js "quad: 1, pas un nombre, 5"
node src/lib/main.js "quad: 1, no es un número, 5"
node src/lib/main.js "quad: 1, non è un numero, 5"
```

All commands will interpret the international aliases as a NaN value.

### Locale-Specific Number Formatting

Enable locale-specific number formatting to correctly parse numbers with thousands separators:

For English:

```bash
export ENABLE_THOUSANDS_SEPARATOR=true
export NUMERIC_LOCALE=en
node src/lib/main.js "quad: 1,234.56, NaN, 7,890"
```

For European:

```bash
export ENABLE_THOUSANDS_SEPARATOR=true
export NUMERIC_LOCALE=eu
node src/lib/main.js "quad: 1.234,56, NaN, 7,890"
```

## Localization Support

Customize accepted NaN aliases by setting the `LOCALE_NAN_ALIASES` environment variable. For example, to accept the German alias "nicht eine zahl", the French alias "pas un nombre", the Spanish alias "no es un número", or the Italian alias "non è un numero":

```bash
export LOCALE_NAN_ALIASES='["nicht eine zahl"]'
node src/lib/main.js "quad: 1, your_alias, 5"
```

Furthermore, setting `LOCALE_NAN_OVERRIDE` ensures that only the provided aliases are recognized.

## Custom Error Handling

With the new error handling hook in `parseNumericParams`, users may supply an optional callback to customize error reporting, making this functionality flexible for different runtime environments.

## Utility Module

All logic for parsing and normalizing NaN aliases is incorporated in the main module (`src/lib/main.js`), enhancing maintainability and module resolution.

## License

MIT
