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

2. Convert numeric string tokens to native JavaScript numbers, converting any token matching the accepted NaN indicators to the native NaN value (`Number.NaN`). Note that due to the nature of JSON, when these NaN values are serialized using `JSON.stringify`, they will appear as `null`.

3. Process all tokens using a unified normalization function that applies trimming, NFC Unicode normalization, and locale-aware lowercasing. This ensures consistent handling of both precomposed and decomposed Unicode forms, including extended support for non-Latin scripts such as Cyrillic and Japanese, particularly for locale-specific NaN aliases.

4. Process numeric parameters by intelligently splitting on commas, semicolons, or whitespace, while gracefully ignoring extra delimiters, trailing commas, and multiple consecutive separators.

5. Provide detailed error messages when encountering invalid numeric inputs. The integration of Zod standardizes and simplifies this validation logic.

6. **New Feature: JSON-Based Parameter Configuration**

   Advanced plot functions now also accept a JSON configuration for more complex parameter setups. When using the `--advanced` flag (or in colon-separated non-advanced mode), if the parameter string starts with a `{` and ends with a `}`, it will be parsed as JSON. This allows you to pass additional options such as labels, colors, and other plot settings. For example:

   ```bash
   node src/lib/main.js --advanced boxPlot '{"data": [1, 2, 3, 4], "title": "My Box Plot", "color": "blue"}'
   ```

7. **New Feature: Batch Plotting Commands**

   You can now pass multiple plotting commands in a single CLI invocation. Both advanced and non-advanced commands are processed sequentially. For instance, you can run:

   ```bash
   node src/lib/main.js "quad: 1,2,3,4" --advanced spiral "1, NaN, 5, 10"
   ```

   This will process two separate plotting commands in one execution.

8. Customizable Error Handling Hooks

   The numeric parameter parsing function `parseNumericParams` now accepts an optional error handling callback. When provided, instead of terminating the process on encountering an invalid token or near-miss token (like "n/a"), the callback is invoked with a descriptive error message.

9. Debug Logging for Numeric Conversion

   Developers can enable debug logging to trace NaN alias normalization by setting the environment variable `DEBUG_NUMERIC` to a truthy value. For example:

   ```bash
   export DEBUG_NUMERIC=true
   node src/lib/main.js "quad: 1, na, 5"
   ```

   This will log messages such as:

   ```
   Normalized token 'na' to native NaN
   ```

10. Locale-Specific Number Formatting

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

11. JSON Serialization Note

    It is important to note that while the parser converts recognized NaN tokens to JavaScript's native `NaN`, when serialized to JSON using `JSON.stringify`, these values appear as `null`. This behavior is inherent to JSON and should be accounted for when integrating with web interfaces or other components that consume JSON data.

12. Strict NaN Mode

    With this new mode, if the environment variable `STRICT_NAN_MODE` is enabled, only the canonical (normalized) 'NaN' token is accepted as a valid NaN indicator. All alternative aliases (e.g., "na", "not a number") will be rejected, enforcing unambiguous numeric input.

## Extended Unicode Support

This update further enhances Unicode normalization to correctly process extended Unicode representations, including non-Latin scripts such as Cyrillic and Japanese. Users can now configure custom NaN aliases in any Unicode script, and the normalization logic will accurately transform decomposed forms to their canonical representations.

## Batch Plotting Commands

You can now execute multiple distinct plotting commands in a single CLI invocation. Commands can be mixed between advanced (prefixed with `--advanced`) and non-advanced (colon-separated format). Each command is processed sequentially with independent validation and logging. For example:

```bash
node src/lib/main.js "quad: 1,2,3,4" --advanced testPlot "1, NaN, 5" "chart:{\"data\":[10,20,30],\"label\":\"Test\"}"
```

This command will execute three plotting operations in order.

## Examples

### CLI Usage with Advanced Plotting

Run the following command to see advanced plotting in action with robust numeric conversion (including handling of different delimiters, scientific notation, various NaN aliases including international and extended Unicode variants, strict rejection of near-miss tokens, JSON configuration support, locale-specific number formatting, and strict NaN mode if enabled):

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

### Batch Plotting Commands

Multiple plotting commands can now be executed in a single invocation. For instance:

```bash
node src/lib/main.js "quad: 1,2,3,4" --advanced spiral "1, NaN, 5, 10"
```

This command will process two separate plotting operations one after the other.

### International and Extended Unicode NaN Aliases

The parser now natively recognizes international representations of NaN as well as extended Unicode representations in non-Latin scripts. For example:

```bash
node src/lib/main.js "quad: 1, pas un nombre, 5"
node src/lib/main.js "quad: 1, не число, 5"   # Cyrillic example
node src/lib/main.js "quad: 1, 非数, 5"       # Japanese example
```

All commands will interpret the international and extended Unicode aliases as a NaN value.

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

### Strict NaN Mode

If you prefer unambiguous numeric input, enable strict mode by setting the `STRICT_NAN_MODE` environment variable. When enabled, only the canonical 'NaN' token is accepted. For example:

```bash
export STRICT_NAN_MODE=true
node src/lib/main.js "quad: 1, NaN, 5"   # Valid
node src/lib/main.js "quad: 1, na, 5"    # Will be rejected
```

## Localization Support

Customize accepted NaN aliases by setting the `LOCALE_NAN_ALIASES` environment variable. For example, to accept a custom alias:

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
