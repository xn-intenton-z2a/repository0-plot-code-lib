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
    // Example: Running the main function with unified 'NaN' handling. The improved numeric parsing functions now feature enhanced logging.
    // Numeric inputs such as 'NaN', 'nan', '+NaN', '-NaN' (even with extra spaces) are processed using a consolidated fallback mechanism that logs structured JSON warnings.
    // To enforce strict numeric validation (rejecting any NaN input), use the --strict-numeric flag.
    await main(['--number=NaN', '--fallback-number=100']);

    // Use the integrated CSV importer function with auto-detection or custom delimiters
    const data = parseCSV('path/to/data.csv');
    console.log(data);
    
    // Numeric parsing utilities
    console.log(normalizeNumberString('1,000'));
    console.log(validateNumericArg('2_000', false, { info: msg => msg, error: msg => msg }));

    // Scientific Notation Support
    console.log(normalizeNumberString('1,000e3', false));
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

#### New Flag: --strict-numeric

Use the new `--strict-numeric` flag to enforce strict numeric input validation. When enabled, any input recognized as a NaN variant (including custom variants) will trigger an error without falling back.

### File-based Logging

You can log all CLI output to a file by specifying the `--log-file=<path>` flag. When provided, all logs (info, warnings, errors, and debug messages) will be appended to the specified file in addition to being printed to the console.

#### Examples:

Logging CLI output to a file:

```bash
repository0-plot-code-lib --log-file=./cli.log arg1 arg2
```

Piping data and logging to a file:

```bash
echo "1;2;3\n4;5;6" | repository0-plot-code-lib --csv-delimiter=";" --fallback-number=100 --log-file=./cli.log
```

### Unified 'NaN' Handling & Structured Logging

- All numeric inputs (including variants like 'NaN', 'nan', '+NaN', '-NaN' with extra spaces) are processed via unified functions that apply locale-aware normalization.
- If an input is detected as a NaN variant and explicit NaN values are not allowed, a structured JSON warning is logged with details such as the original input, its normalized form, the fallback value used, and any custom NaN variants.
- To enforce strict validation without fallback, use the `--strict-numeric` flag.

### Custom NaN Variants

You can define additional strings to be recognized as NaN using the global configuration file (.repository0plotconfig.json) or environment variables. Custom variants are compared case-insensitively after trimming whitespace.

Example configuration:

```json
{
  "additionalNaNValues": ["foo", "bar"]
}
```

This ensures that "foo" or "bar" are treated as NaN, following the same fallback and logging mechanisms as standard NaN inputs.

### Locale-Aware Numeric Parsing

A new configuration option, `LOCALE`, allows numbers to be parsed correctly based on locale.
- For en-US (default): commas are treated as thousand separators and the period as a decimal point.
- For de-DE: periods are thousand separators and commas are used as decimal points (with conversion applied if preserving decimals).

Set the locale in your configuration file or via the `LOCALE` environment variable:

```json
{
  "LOCALE": "de-DE"
}
```

### Global Configuration

Use the .repository0plotconfig.json file to set global parameters such as error reporting URL, CLI color scheme, fallback number, retry delays, ALLOW_NAN, and warning suppression (DISABLE_FALLBACK_WARNINGS).

Example:

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
  "LOCALE": "en-US",
  "DISABLE_FALLBACK_WARNINGS": true
}
```

### Decimal Preservation

To preserve decimal points, use the `--preserve-decimal` flag or set the appropriate environment variable.

```bash
repository0-plot-code-lib --preserve-decimal --number=1,234.56
```

### CSV Data Import

Import numeric data from a CSV file using the `--csv-file=<path>` flag or through STDIN. A custom delimiter can be set with `--csv-delimiter=<delimiter>`. If omitted, the tool auto-detects the delimiter.

Examples:

Using a semicolon delimiter:

```bash
repository0-plot-code-lib --csv-file=path/to/data.csv --csv-delimiter=";" --fallback-number=100
```

Piping CSV data via STDIN:

```bash
echo "1;2;3\n4;5;6" | repository0-plot-code-lib --csv-delimiter=";" --fallback-number=100
```

### Automatic Error Reporting with Retry

When an error occurs, the CLI submits an error report (if ERROR_REPORTING_URL is set) that includes error details, CLI arguments, library version, and more. Configurable retry delays and max attempts ensure robust error reporting.

---

## License

MIT
