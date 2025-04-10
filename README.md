# repository0-plot-code-lib

"_Be a go-to plot library with a CLI, be the jq of formulae visualisations._"

---

## Usage

You can use the library either as a JavaScript module or via the CLI. The CLI output is enhanced with ANSI colors to improve message clarity.

### As a JS Library

Import the main function and pass arguments as an array. Note that in the event of errors, the function will throw exceptions rather than exiting the process. This allows the consuming code to handle errors as needed.

```js
import { main } from '@src/lib/main.js';

(async () => {
  try {
    await main(['arg1', 'arg2']);
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

### Numeric Argument Validation

The CLI supports numeric validation via the `--number=VALUE` flag. The following number formats are supported:

- Standard numbers (e.g., `42`)
- Scientific notation (e.g., `1e3`)
- Numbers with underscores for readability (e.g., `1_000`)
- Numbers with commas as thousand separators (e.g., `1,000`)

The CLI validates numeric values by normalizing the input (trimming whitespace and removing underscores and commas) and then attempting a numeric conversion. If the conversion fails, a clear error message is provided. In verbose mode (or when `LOG_LEVEL` is set to `debug`), the error message includes a full stack trace to aid in debugging.

For example:

```bash
repository0-plot-code-lib --number=42
```

If an invalid numeric value is provided:

```bash
repository0-plot-code-lib --number=NaN
```

The CLI will output a clear error message, with additional stack trace details in verbose mode.

### Automatic Error Reporting

When an error occurs, the CLI supports automatic error report submission. If the configuration parameter `ERROR_REPORTING_URL` is defined (either in the global configuration file `.repository0plotconfig.json` or via the environment variable), the CLI will automatically submit a POST request with extended error details including:

- **errorMessage**: The error message.
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
  "defaultArgs": ["defaultArg1", "defaultArg2"]
}
```

### Global Configuration File Support

A new feature allows you to set persistent default options without having to specify them every time you run the CLI.

The CLI will look for a global configuration file named `.repository0plotconfig.json` in the current working directory and in your home directory (using the `HOME` or `USERPROFILE` environment variable). This file enforces a strict schema. Supported configuration keys are:

- `CLI_COLOR_SCHEME` (string, e.g., "dark", "light", or "default")
- `LOG_LEVEL` (string, e.g., "debug", "info", etc.)
- `ERROR_REPORTING_URL` (string, must be a valid URL)
- `defaultArgs` (array of strings)

If the configuration file does not adhere to this schema, the CLI will log a clear error message and revert to default settings.

Additionally, you can use the new `--show-config` flag to display the effective global configuration being applied by the CLI. This outputs a formatted JSON showing the merged configuration from config files and environment variables.

#### Example `.repository0plotconfig.json` file:

```json
{
  "CLI_COLOR_SCHEME": "dark",
  "LOG_LEVEL": "debug",
  "ERROR_REPORTING_URL": "http://example.com/report",
  "defaultArgs": ["defaultArg1", "defaultArg2"]
}
```

---

## License

MIT
