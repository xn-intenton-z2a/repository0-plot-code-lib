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

If no arguments are provided, the CLI will display a colored usage message. However, you can set default arguments in a global configuration file to be used when no CLI arguments are provided.

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

### Numeric Argument Validation

The CLI supports numeric validation via the `--number=VALUE` flag. The following number formats are supported:

- Standard numbers (e.g., `42`)
- Scientific notation (e.g., `1e3`)
- Numbers with underscores for readability (e.g., `1_000`)
- Numbers with commas as thousand separators (e.g., `1,000`)
- Numbers with spaces as thousand separators (e.g., `1 000`)
- Numbers with periods as thousand separators when appropriate (e.g., `1.000` interpreted as 1000 if used for grouping)

**Enhancement:** The numeric validation logic has been refactored into the main module. The functions `normalizeNumberString` and `validateNumericArg` now serve as a single source of truth for numeric parsing. This change immediately rejects inputs equating to "NaN" (case-insensitive) before normalization and applies a fallback if provided via the `--fallback-number` flag or the `FALLBACK_NUMBER` environment variable. 

For example:

```bash
repository0-plot-code-lib --number=42
```

Or using a fallback:

```bash
repository0-plot-code-lib --number=NaN --fallback-number=100
```

If an invalid numeric value is provided without a valid fallback:

```bash
repository0-plot-code-lib --number=NaN
```

The CLI will output a concise error message with enhanced context to aid debugging. In verbose mode (or when `LOG_LEVEL` is set to `debug`), the full stack trace is included in the logs and error reports.

### CSV Data Import

The CLI now supports importing numeric data from a CSV file using the `--csv-file=<path>` flag. The CSV importer functionality has been integrated into the main module. The CSV file should contain numeric values separated by commas and newlines. Various numeric formats are supported including underscores, commas, spaces, and periods (used as thousand separators).

**Enhancement:** If a cell in the CSV file contains the literal `NaN` (in any capitalization), the importer will use the fallback number provided via the `--fallback-number` flag or the `FALLBACK_NUMBER` environment variable, instead of throwing an error. If no fallback is provided, an error is raised.

For example:

```bash
repository0-plot-code-lib --csv-file=path/to/data.csv --fallback-number=100
```

The imported CSV data will be parsed into an array of arrays of numbers and printed to the console using the current CLI theme. This data can be used for plotting or further processing.

### Automatic Error Reporting

When an error occurs, the CLI supports automatic error report submission. If the configuration parameter `ERROR_REPORTING_URL` is defined (either in the global configuration file `.repository0plotconfig.json` or via the environment variable), the CLI will automatically submit a POST request with extended error details including:

- **errorMessage**: The error message (which now includes detailed context for numeric validation errors).
- **stackTrace**: The error's stack trace (if available).
- **cliArgs**: The CLI arguments provided.
- **libraryVersion**: The current version of the library (sourced from package.json).
- **timestamp**: The ISO timestamp when the error occurred.
- **envContext**: Additional environment variables that can help diagnose issues (e.g., NODE_ENV, CLI_COLOR_SCHEME, LOG_LEVEL, HOME).

The CLI awaits the completion of the error reporting process before exiting, ensuring that error reports are fully transmitted even under slow network conditions.

Example configuration snippet:

```json
{
  "ERROR_REPORTING_URL": "http://example.com/report",
  "CLI_COLOR_SCHEME": "dark",
  "LOG_LEVEL": "debug",
  "defaultArgs": ["defaultArg1", "defaultArg2"],
  "FALLBACK_NUMBER": "100"
}
```

### Global Configuration File Support

A new feature allows you to set persistent default options without having to specify them every time you run the CLI.

The CLI will look for a global configuration file named `.repository0plotconfig.json` in the current working directory and in your home directory (using the `HOME` or `USERPROFILE` environment variable). This file enforces a strict schema. Supported configuration keys are:

- `CLI_COLOR_SCHEME` (string, e.g., "dark", "light", or "default")
- `LOG_LEVEL` (string, e.g., "debug", "info", etc.)
- `ERROR_REPORTING_URL` (string, must be a valid URL)
- `defaultArgs` (array of strings)
- `FALLBACK_NUMBER` (string, representing a numeric fallback value)

If the configuration file does not adhere to this schema, the CLI will log a clear error message and revert to default settings.

Additionally, you can use the new `--show-config` flag to display the effective global configuration being applied by the CLI. This outputs a formatted JSON showing the merged configuration from config files and environment variables.

#### Example `.repository0plotconfig.json` file:

```json
{
  "CLI_COLOR_SCHEME": "dark",
  "LOG_LEVEL": "debug",
  "ERROR_REPORTING_URL": "http://example.com/report",
  "defaultArgs": ["defaultArg1", "defaultArg2"],
  "FALLBACK_NUMBER": "100"
}
```

---

## License

MIT
