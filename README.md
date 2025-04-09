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

   Developers can provide locale-specific aliases via the environment variable `LOCALE_NAN_ALIASES` (as a JSON array) to override or extend the default set. If the provided configuration is invalid, a warning is emitted and the default aliases are used. Setting `LOCALE_NAN_OVERRIDE` ensures that only the specified custom aliases are used.

2. Convert numeric string tokens to native JavaScript numbers, converting any token matching an accepted NaN alias to the native `NaN` value. When serialized using `JSON.stringify`, these values appear as `null` per the JSON specification.

3. Normalize all tokens using Unicode NFC normalization along with trimming and lowercasing to support both precomposed and decomposed Unicode forms across various languages.

4. Process numeric parameters by intelligently splitting on commas, semicolons, or whitespace while gracefully handling extraneous delimiters and trailing commas.

5. Leverage Zod for input validation and transformation, supporting scientific notation and locale-specific formatting (e.g., thousands separators) based on environment configurations (`ENABLE_THOUSANDS_SEPARATOR` and `NUMERIC_LOCALE`).

6. **New Feature: JSON-Based Parameter Configuration**

   Advanced plot functions now accept JSON configuration for complex parameter setups. When using the `--advanced` flag (or colon-separated non-advanced mode), if the parameter string begins with a `{` and ends with a `}`, it is parsed as JSON. This allows passing options such as labels, colors, and other settings. For example:

   ```bash
   node src/lib/main.js --advanced boxPlot '{"data": [1, 2, 3, 4], "title": "My Box Plot", "color": "blue"}'
   ```

7. **Batch Plotting Commands**

   You can now pass multiple plotting commands in a single CLI invocation. Commands are processed sequentially with independent validation and logging. For example:

   ```bash
   node src/lib/main.js "quad: 1,2,3,4" --advanced spiral "1, NaN, 5, 10"
   ```

8. Customizable error handling hooks allow the parsing function to use a custom callback for reporting errors.

9. Debug logging for numeric conversion can be enabled via the `DEBUG_NUMERIC` environment variable.

10. Locale-Specific Number Formatting processes numeric strings using locale-based separators when `ENABLE_THOUSANDS_SEPARATOR` is set.

## Extended Unicode Support

This update enhances Unicode normalization to correctly process extended Unicode representations, including non-Latin scripts such as Cyrillic and Japanese. Custom NaN aliases provided via `LOCALE_NAN_ALIASES` will be normalized accordingly.

## Batch Plotting Commands

Multiple plotting commands can now be executed in a single CLI invocation, with both advanced and non-advanced commands processed sequentially.

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

## Custom Error Handling

The numeric parameter parsing function supports an optional error handling callback, allowing custom error reporting instead of immediate termination.

## License

MIT
