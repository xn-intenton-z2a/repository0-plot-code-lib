# repository0-plot-code-lib

"_Be a go-to plot library with a CLI, be the jq of formulae visualisations._"

---

## Usage

You can use the library either as a JavaScript module or via the CLI. The CLI output is enhanced with ANSI colors to improve message clarity.

### As a JS Library

Import the main function and pass arguments as an array. In the event of errors, the function will throw exceptions allowing the consuming code to handle them appropriately.

```js
import { main, parseCSV, normalizeNumberString, validateNumericArg } from '@src/lib/main.js';

(async () => {
  try {
    // Example of running the main function with unified 'NaN' handling
    // This example demonstrates how NaN variants (e.g., 'NaN', '+NaN', '-NaN') are processed.
    // When an invalid numeric input is provided without permitting explicit NaN values, if a fallback is provided via '--fallback-number' or the global configuration,
    // the fallback value will be used (with a warning logged). Otherwise, an error is thrown. Consider enabling '--allow-nan' if you wish to accept NaN values.
    await main(['--number=NaN', '--fallback-number=100']);

    // Use the integrated CSV importer function
    const data = parseCSV('path/to/data.csv');
    console.log(data);
    
    // Numeric parsing utilities are available directly from the main module
    // normalizeNumberString removes formatting characters. When preserveDecimal is enabled, decimals are retained.
    console.log(normalizeNumberString('1,000'));
    console.log(validateNumericArg('2_000', false, { info: msg => msg, error: msg => msg }));

    // Scientific Notation Support:
    // The library now supports numeric inputs in scientific notation. For example:
    // '1e3' is parsed as 1000 and '1.2e-3' is parsed as 0.0012. Extra formatting characters in the coefficient are stripped.
    console.log(normalizeNumberString('1,000e3', false)); // outputs "1000e3"
    console.log(validateNumericArg('1.2e-3', false, { info: msg => msg, error: msg => msg }, undefined, false, true));
  } catch (error) {
    // Handle error accordingly
    console.error('An error occurred:', error);
  }
})();
```

### Command Line Interface (CLI)

Run the CLI directly. A dedicated CLI wrapper catches errors thrown by the main function and exits the process to ensure proper CLI behavior.

```bash
repository0-plot-code-lib arg1 arg2
```

If no arguments are provided and no STDIN or CSV file is detected, the CLI will display a colored usage message.

```
(No arguments provided message in colored output, or default arguments if configured)
Usage: repository0-plot-code-lib <arguments>
```

### Unified 'NaN' Handling

All numeric inputs, including signed variants, follow a consistent handling approach across CSV, CLI, and environment variables. Variants such as `NaN`, `nan`, `+NaN`, and `-NaN` are normalized using a unified function.

When an invalid numeric input is provided without permitting explicit NaN values, consider providing a fallback value using `--fallback-number`. If no fallback is provided, an error is thrown with guidance on either enabling explicit NaN acceptance using `--allow-nan` or supplying a valid fallback.

#### Example Usage:

Allowing explicit NaN:

```bash
repository0-plot-code-lib --number=NaN --allow-nan
```

Using a fallback for NaN input:

```bash
repository0-plot-code-lib --number=NaN --fallback-number=100
```

### Decimal Point Parsing

A configuration option controls whether periods in numeric inputs are preserved as decimal points. To preserve decimals, use the `--preserve-decimal` flag or set `PRESERVE_DECIMAL=true`:

```bash
repository0-plot-code-lib --preserve-decimal --number=1,234.56
```

When enabled, underscores, commas, and spaces are removed while periods are retained (e.g., `1,234.56` becomes `1234.56`).

### CSV Data Import

Import numeric data from a CSV file using the `--csv-file=<path>` flag or via STDIN if no file is specified. The CLI supports a custom delimiter via the `--csv-delimiter=<delimiter>` flag. If no delimiter is provided, the tool auto-detects one.

For example, with a semicolon delimiter:

```bash
repository0-plot-code-lib --csv-file=path/to/data.csv --csv-delimiter=";" --fallback-number=100
```

Or piping data via STDIN:

```bash
echo "1;2;3\n4;5;6" | repository0-plot-code-lib --csv-delimiter=";" --fallback-number=100
```

The imported CSV data is parsed into an array of arrays of numbers and printed using the current CLI theme.

### Automatic Error Reporting with Configurable Retry

When an error occurs, the CLI automatically submits an error report (if `ERROR_REPORTING_URL` is defined). The report includes detailed information such as the error message, stack trace, CLI arguments, library version, timestamp, and more.

An automatic retry mechanism is implemented. You can configure retry delays and the maximum number of attempts via `ERROR_RETRY_DELAYS` and `ERROR_MAX_ATTEMPTS` (set in the global configuration or as environment variables).

For example:

```json
{
  "ERROR_REPORTING_URL": "http://example.com/report",
  "CLI_COLOR_SCHEME": "dark",
  "LOG_LEVEL": "debug",
  "defaultArgs": ["defaultArg1", "defaultArg2"],
  "FALLBACK_NUMBER": "100",
  "ERROR_RETRY_DELAYS": "500,1000,2000",
  "ERROR_MAX_ATTEMPTS": "3"
}
```

### Global Configuration File Support

Set persistent default options in a global configuration file named `.repository0plotconfig.json` located in the current working directory or your home directory. Supported keys include:

- `CLI_COLOR_SCHEME`
- `LOG_LEVEL`
- `ERROR_REPORTING_URL`
- `defaultArgs`
- `FALLBACK_NUMBER`
- `ERROR_RETRY_DELAYS`
- `ERROR_MAX_ATTEMPTS`

Use the `--show-config` flag to display the effective configuration.

---

## License

MIT
