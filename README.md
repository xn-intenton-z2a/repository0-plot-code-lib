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
    // Numeric inputs such as 'NaN', 'nan', '+NaN', '-NaN' (even with extra spaces) are uniformly processed.
    // When explicit NaN is not allowed and no valid fallback is provided, an error is thrown.
    // If a fallback value is provided, it is applied and a warning is logged.
    // To accept NaN values without fallback, use the '--allow-nan' flag.
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

### Unified 'NaN' Handling

- All numeric inputs, including variants like 'NaN', 'nan', '+NaN', '-NaN' (with extra spaces allowed), are processed in a unified manner.
- When explicit NaN values are not allowed (default), providing them will trigger a fallback mechanism if a valid fallback is given; a warning is logged indicating the fallback.
- To explicitly accept NaN inputs, use the `--allow-nan` flag.

### Global Configuration for NaN Handling

Set the `ALLOW_NAN` property in your `.repository0plotconfig.json` to control how NaN inputs are handled globally. For example:

```json
{
  "ERROR_REPORTING_URL": "http://example.com/report",
  "CLI_COLOR_SCHEME": "dark",
  "LOG_LEVEL": "debug",
  "defaultArgs": ["defaultArg1", "defaultArg2"],
  "FALLBACK_NUMBER": "100",
  "ERROR_RETRY_DELAYS": "500,1000,2000",
  "ERROR_MAX_ATTEMPTS": "3",
  "ALLOW_NAN": false
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

When an error occurs, the CLI automatically submits an error report (if `ERROR_REPORTING_URL` is set). The report includes error details, CLI arguments, library version, timestamp, and more.

A retry mechanism is in place, configurable via `ERROR_RETRY_DELAYS` and `ERROR_MAX_ATTEMPTS` in your configuration or environment variables.

---

## License

MIT
