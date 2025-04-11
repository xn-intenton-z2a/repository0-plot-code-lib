# repository0-plot-code-lib

"_Be a go-to plot library with a CLI, be the jq of formulae visualisations._"

---

## Usage

You can use the library either as a JavaScript module or via the CLI. The CLI output is enhanced with ANSI colors to improve message clarity.

### As a JS Library

Import the main function and pass arguments as an array. Note that in the event of errors, the function will throw exceptions rather than exiting the process. This allows the consuming code to handle errors as needed.

```js
import { main, parseCSV, normalizeNumberString, validateNumericArg } from '@src/lib/main.js';

(async () => {
  try {
    await main(['arg1', 'arg2']);
    // You can also use the integrated CSV importer function
    const data = parseCSV('path/to/data.csv');
    console.log(data);
    
    // Numeric parsing utilities are available directly from the main module
    console.log(normalizeNumberString('1,000'));
    console.log(validateNumericArg('2_000', false, { info: msg => msg, error: msg => msg }));
  } catch (error) {
    // Handle error accordingly
    console.error('An error occurred:', error);
  }
})();
```

### Command Line Interface (CLI)

Run the CLI directly. A dedicated CLI wrapper catches errors thrown by the main function and exits the process, ensuring proper CLI behavior.

```bash
repository0-plot-code-lib arg1 arg2
```

If no arguments are provided and no STDIN or CSV file is detected, the CLI will display a colored usage message. However, you can set default arguments in a global configuration file to be used when no CLI arguments are provided.

```
(No arguments provided message in colored output, or default arguments if configured)
Usage: repository0-plot-code-lib <arguments>
```

### Dynamic Theme Switching

A new CLI flag has been introduced to dynamically switch the color theme at runtime. Use the `--theme=<value>` flag to override the default theme selection, environment variables, or custom configuration files (`cli-theme.json`). Supported values are:

- `default`
- `dark`
- `light`

For example:

```bash
repository0-plot-code-lib --theme=dark arg1 arg2
```

This flag will take precedence over any theme specified in the environment variable `CLI_COLOR_SCHEME` or in the `cli-theme.json` custom configuration file.

### Numeric Argument Validation & Standardized NaN Handling

The CLI supports numeric validation via the `--number=VALUE` flag. The following number formats are supported:

- Standard numbers (e.g., `42`)
- Scientific notation (e.g., `1e3`)
- Numbers with underscores for readability (e.g., `1_000`)
- Numbers with commas as thousand separators (e.g., `1,000`)
- Numbers with spaces as thousand separators (e.g., `1 000`)
- Numbers with periods as thousand separators when appropriate (e.g., `1.000` interpreted as 1000 if used for grouping)

**Unified 'NaN' Handling and Fallback Mechanism:**

All numeric inputs are processed using a consolidated logic that treats any case variant of `NaN` (e.g., `NaN`, `nan`, `NAN`, as well as signed variants like `+NaN` and `-NaN`) uniformly. In addition, all variants of 'NaN' are now handled identically:

1. If the `--allow-nan` flag is provided (or the environment variable `ALLOW_EXPLICIT_NAN` is set to `true`), the value is accepted as JavaScript’s `NaN`.
2. If the flag is not provided and a fallback value is available via the `--fallback-number` flag or the `FALLBACK_NUMBER` environment variable, that fallback is used uniformly.
3. Otherwise, a detailed error message is thrown. This error message includes guidance on acceptable numeric formats (e.g., 42, 1e3, 1_000, 1,000) and instructs the user to either provide a valid number or use the `--fallback-number` flag.

For example, to allow explicit NaN:

```bash
repository0-plot-code-lib --number=NaN --allow-nan
```

Or with a fallback when not allowed:

```bash
repository0-plot-code-lib --number=NaN --fallback-number=100
```

### Decimal Point Parsing

A new configuration option controls whether periods in numeric inputs are preserved as decimal points. By default, periods are removed as thousand separators for backward compatibility. To preserve decimals, use the CLI flag `--preserve-decimal` or set the environment variable `PRESERVE_DECIMAL=true`.

```bash
repository0-plot-code-lib --preserve-decimal --number=1,234.56
```

or

```bash
export PRESERVE_DECIMAL=true
repository0-plot-code-lib --number=1,234.56
```

When enabled, underscores, commas, and spaces are removed, but periods are retained so that decimal numbers are correctly interpreted (e.g., `1,234.56` becomes `1234.56`).

### CSV Data Import

The CLI supports importing numeric data from a CSV file using the `--csv-file=<path>` flag or directly from STDIN when no file is provided. Additionally, the `--csv-delimiter=<delimiter>` flag allows you to specify a custom delimiter. If no delimiter is specified, the tool will automatically detect the delimiter based on the CSV content. Supported delimiters include comma, semicolon, pipe, and tab.

For example, from a file with a semicolon delimiter:

```bash
repository0-plot-code-lib --csv-file=path/to/data.csv --csv-delimiter=";" --fallback-number=100
```

Or piping data via STDIN:

```bash
echo "1;2;3\n4;5;6" | repository0-plot-code-lib --csv-delimiter=";" --fallback-number=100
```

The imported CSV data will be parsed into an array of arrays of numbers and printed to the console using the current CLI theme.

### Automatic Error Reporting with Configurable Retry Mechanism

When an error occurs, the CLI automatically submits an error report if the `ERROR_REPORTING_URL` is defined (either in the global configuration file or as an environment variable). The report includes detailed information such as the error message, stack trace, CLI arguments, library version, timestamp, and relevant environment variables, as well as the original numeric input if applicable.

A new automatic retry mechanism has been implemented for error report submission. The retry delays and maximum number of retry attempts are now configurable via the configuration options `ERROR_RETRY_DELAYS` and `ERROR_MAX_ATTEMPTS` (set either in the global configuration file or as environment variables). For example:

- Set `ERROR_RETRY_DELAYS` to a comma-separated list of delays in milliseconds (e.g., `500,1000,2000`).
- Set `ERROR_MAX_ATTEMPTS` to the maximum number of retry attempts. If not provided, the system defaults to using the length of the retry delays array.

If the initial POST request fails (e.g., because of transient network issues), the CLI will automatically retry using the specified delays. Log messages will indicate each attempt and the final outcome if all retries fail.

#### Example Global Configuration File (.repository0plotconfig.json):

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

You can set persistent default options in a global configuration file named `.repository0plotconfig.json` located in the current working directory or your home directory. Supported configuration keys include:

- `CLI_COLOR_SCHEME` (e.g., "dark", "light", or "default")
- `LOG_LEVEL` (e.g., "debug", "info", etc.)
- `ERROR_REPORTING_URL` (must be a valid URL)
- `defaultArgs` (array of strings)
- `FALLBACK_NUMBER` (string representing a numeric fallback value)
- `ERROR_RETRY_DELAYS` (comma-separated string or array of numbers for retry delays in milliseconds)
- `ERROR_MAX_ATTEMPTS` (string representing the maximum number of retry attempts)

Use the `--show-config` flag to display the effective global configuration.

---

## License

MIT
