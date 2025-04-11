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
    // Example: Running the main function with unified 'NaN' handling.
    // Numeric inputs such as 'NaN', 'nan', '+NaN', '-NaN' (even with extra spaces) are uniformly processed using a consolidated fallback mechanism.
    // When explicit NaN values are not allowed and no valid fallback is provided, an error is thrown with detailed guidance including the normalized value and recognized custom NaN variants.
    // If a fallback value is provided, it is applied and a standardized warning is logged.
    await main(['--number=NaN', '--fallback-number=100']);

    // Use the integrated CSV importer function
    const data = parseCSV('path/to/data.csv');
    console.log(data);
    
    // Numeric parsing utilities
    console.log(normalizeNumberString('1,000'));
    console.log(validateNumericArg('2_000', false, { info: msg => msg, error: msg => msg }));

    // Scientific Notation Support
    console.log(normalizeNumberString('1,000e3', false)); // outputs "1000e3"
    console.log(validateNumericArg('1.2e-3', false, { info: msg => msg, error: msg => msg }, undefined, false, true));
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
```

### Command Line Interface (CLI)

Run the CLI directly. A dedicated CLI wrapper catches errors thrown by the main function and exits the process to ensure proper CLI behavior.

```bash
repository0-plot-code-lib arg1 arg2
```

If no arguments are provided and no STDIN or CSV file is detected, the CLI will display a colored usage message:

```
(No arguments provided message in colored output, or default arguments if configured)
Usage: repository0-plot-code-lib <arguments>
```

### File-based Logging

A new feature allows you to log all CLI output to a file by specifying the `--log-file=<path>` flag. When provided, all logs (information, warnings, errors, and debug messages) will be appended to the specified log file in addition to being printed to the console. If the log file does not exist, it will be created. If it exists, new log entries are appended.

#### Examples:

Using file-based logging with the CLI:

```bash
repository0-plot-code-lib --log-file=./cli.log arg1 arg2
```

Piping data and logging to file:

```bash
echo "1;2;3\n4;5;6" | repository0-plot-code-lib --csv-delimiter=";" --fallback-number=100 --log-file=./cli.log
```

### Unified 'NaN' Handling

- All numeric inputs, including variants like 'NaN', 'nan', '+NaN', '-NaN' (with extra spaces allowed), are processed via a unified function that normalizes the input and applies a consistent fallback logic.
- When explicit NaN values are not allowed, providing them triggers the fallback mechanism (if a valid fallback is given) and logs a standardized warning message that includes the normalized input and details on recognized custom NaN variants.
- To explicitly accept NaN inputs, use the `--allow-nan` flag.

### Custom NaN Variants

You can define additional string values to be recognized as NaN using the global configuration file (.repository0plotconfig.json) or an environment variable. Custom NaN variants are compared in a case-insensitive manner after trimming whitespace. For example, add the following to your configuration file:

```json
{
  "additionalNaNValues": ["foo", "bar"]
}
```

This configuration ensures that occurrences of "foo" or "bar" in numeric inputs are treated as NaN, following the same fallback and warning mechanisms as standard NaN inputs. The warning messages will explicitly list these custom variants when applied.

### Locale-Aware Numeric Parsing

A new configuration option, `LOCALE`, allows the library to correctly parse numeric inputs according to locale-specific formatting rules.

- For en-US (default): commas are treated as thousand separators and the period as the decimal point.
- For de-DE: periods are treated as thousand separators and commas as the decimal separator. When preserving decimals, the comma is converted to a period for proper numeric conversion.

You can specify the locale in the global configuration file or via the environment variable `LOCALE`:

```json
{
  "LOCALE": "de-DE"
}
```

### Global Configuration for NaN and Locale Handling

Set the `ALLOW_NAN` property in your `.repository0plotconfig.json` to control how NaN inputs are handled globally, and the `LOCALE` option to adjust numeric parsing.

```json
{
  "ERROR_REPORTING_URL": "http://example.com/report",
  "CLI_COLOR_SCHEME": "dark",
  "LOG_LEVEL": "debug",
  "defaultArgs": ["defaultArg1", "defaultArg2"],
  "FALLBACK_NUMBER": "100",
  "ERROR_RETRY_DELAYS": "500,1000,2000",
  "ERROR_MAX_ATTEMPTS": "3",
  "ALLOW_NAN": false,
  "LOCALE": "en-US"
}
```

### Decimal Point Parsing

To preserve decimal points in numeric inputs, use the `--preserve-decimal` flag or set `PRESERVE_DECIMAL=true` in your environment.

```bash
repository0-plot-code-lib --preserve-decimal --number=1,234.56
```

### CSV Data Import

Import numeric data from a CSV file using the `--csv-file=<path>` flag or through STDIN. A custom delimiter can be specified with `--csv-delimiter=<delimiter>`. If omitted, the tool auto-detects the delimiter.

#### Examples:

Using a semicolon delimiter:

```bash
repository0-plot-code-lib --csv-file=path/to/data.csv --csv-delimiter=";" --fallback-number=100
```

Piping data via STDIN:

```bash
echo "1;2;3\n4;5;6" | repository0-plot-code-lib --csv-delimiter=";" --fallback-number=100
```

### Automatic Error Reporting with Configurable Retry

When an error occurs, the CLI automatically submits an error report (if `ERROR_REPORTING_URL` is set). The report includes error details, CLI arguments, library version, timestamp, and more. A retry mechanism (configurable via `ERROR_RETRY_DELAYS` and `ERROR_MAX_ATTEMPTS`) ensures robust error reporting.

---

## License

MIT
