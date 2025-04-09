# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Enhanced Numeric Parameter Validation

This release includes improvements in numeric parameter handling. The core numeric conversion logic is now implemented in the main module (`src/lib/main.js`) and has been refactored to use the Zod schema validation library for robust and declarative input transformation. Both the CLI and the web interface use this logic to:

1. Validate numeric tokens (integer, decimal, scientific notation) and support multiple indicators for Not-a-Number (NaN) values. In addition to the canonical token 'NaN' (case insensitive, whitespace-tolerant), a configurable set of alternative aliases are accepted. By default, the following aliases are supported:

   - English: "nan", "not a number", "notanumber", "na", "not-a-number"
   - German: "nicht eine zahl"
   - French: "pas un nombre"
   - Spanish: "no es un número"
   - Italian: "non è un numero"

   Developers can provide locale-specific aliases via the environment variable `LOCALE_NAN_ALIASES` (as a JSON array) to override or extend the default set. If the provided configuration is invalid (either due to invalid JSON or not being an array), a warning is emitted: "Invalid configuration for LOCALE_NAN_ALIASES. Using default NaN aliases." When the environment variable `LOCALE_NAN_OVERRIDE` is set, only the provided aliases will be used.

2. Convert numeric string tokens to native JavaScript numbers, converting any token matching an accepted NaN alias to the native `NaN` value. Note that when these values are serialized using `JSON.stringify`, they appear as `null` (per JSON specification).

3. Process all tokens using a unified normalization function that applies trimming, NFC Unicode normalization, and locale-aware lowercasing. This ensures consistent handling of both precomposed and decomposed Unicode forms, including extended support for non-Latin scripts.

4. Process numeric parameters by intelligently splitting on commas, semicolons, or whitespace while gracefully ignoring extra delimiters, trailing commas, and multiple consecutive separators.

5. Provide detailed error messages when encountering invalid numeric inputs. The integration of Zod standardizes and simplifies this validation logic. In strict mode (enabled via `STRICT_NAN_MODE`), only the canonical 'NaN' token is accepted, and all alternative aliases (such as "na" or "not a number") are rejected.

6. **New Feature: JSON-Based Parameter Configuration**

   Advanced plot functions now also accept a JSON configuration for more complex parameter setups. When using the `--advanced` flag (or in colon-separated non-advanced mode), if the parameter string starts with a `{` and ends with a `}`, it will be parsed as JSON. This allows you to pass additional options such as labels, colors, and other plot settings. For example:

   ```bash
   node src/lib/main.js --advanced boxPlot '{"data": [1, 2, 3, 4], "title": "My Box Plot", "color": "blue"}'
   ```

7. **New Feature: Batch Plotting Commands**

   You can now pass multiple plotting commands in a single CLI invocation. Both advanced and non-advanced commands are processed sequentially. For instance:

   ```bash
   node src/lib/main.js "quad: 1,2,3,4" --advanced spiral "1, NaN, 5, 10"
   ```

8. Customizable Error Handling Hooks

   The numeric parameter parsing function `parseNumericParams` now accepts an optional error handling callback. Instead of terminating on encountering an invalid token, the callback is invoked with a descriptive error message.

9. Debug Logging for Numeric Conversion

   Enable debug logging for numeric conversion (including NaN alias normalization) by setting the environment variable `DEBUG_NUMERIC` to a truthy value.

10. Locale-Specific Number Formatting

    By enabling thousands separator parsing (via `ENABLE_THOUSANDS_SEPARATOR`), the parser handles locale-specific number formats. Set `NUMERIC_LOCALE` to specify the format (e.g., `en` for English, `eu` for European).

## Extended Unicode Support

This update enhances Unicode normalization to correctly process extended Unicode representations, including non-Latin scripts such as Cyrillic and Japanese. Custom NaN aliases provided via `LOCALE_NAN_ALIASES` will be properly normalized.

## Batch Plotting Commands

Multiple plotting commands can now be executed in a single CLI invocation. Commands are processed sequentially with independent validation and logging. For example:

```bash
node src/lib/main.js "quad: 1,2,3,4" --advanced testPlot "1, NaN, 5" "chart:{\"data\":[10,20,30],\"label\":\"Test\"}"
```

## Examples

### CLI Usage with Advanced Plotting

```bash
# Using numeric parameters
node src/lib/main.js --advanced testPlot " 1, NaN ; 5  , -10, 10, 1;"

# Using JSON configuration
node src/lib/main.js --advanced boxPlot '{"data": [1, 2, 3, 4], "title": "My Box Plot", "color": "blue"}'
```

### CLI Usage in Non-Advanced Mode

```bash
node src/lib/main.js "quad: 1 ; 2.14e-3  not a number   -3.5E+2"
node src/lib/main.js "chart:{\"data\":[10,20,30],\"label\":\"Test\"}"
```

### International and Extended Unicode NaN Aliases

```bash
node src/lib/main.js "quad: 1, pas un nombre, 5"
node src/lib/main.js "quad: 1, не число, 5"   # Cyrillic example
node src/lib/main.js "quad: 1, 非数, 5"       # Japanese example
```

### Locale-Specific Number Formatting

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

```bash
export STRICT_NAN_MODE=true
node src/lib/main.js "quad: 1, NaN, 5"   # Valid
node src/lib/main.js "quad: 1, na, 5"    # Will be rejected
```

## Localization Support

Customize accepted NaN aliases by setting the `LOCALE_NAN_ALIASES` environment variable. For example:

```bash
export LOCALE_NAN_ALIASES='["nicht eine zahl"]'
node src/lib/main.js "quad: 1, your_alias, 5"
```

Setting `LOCALE_NAN_OVERRIDE` ensures that only the provided aliases are used.

## Custom Error Handling

The optional error handling callback in `parseNumericParams` enables custom error reporting, making the parser flexible for different runtime environments.

## Utility Module

All numeric parsing and NaN normalization logic is encapsulated in the main module (`src/lib/main.js`), supporting maintainability and modularity.

## Note on JSON Serialization

When converting numeric values to JSON (e.g., via `JSON.stringify`), native NaN values are serialized as `null`, as per the JSON standard.

## License

MIT
