# repository0-plot-code-lib

"_Be a go-to plot library with a CLI, be the jq of formulae visualisations._"

---

## Usage

You can use the library either as a JavaScript module or via the CLI. The CLI output is enhanced with ANSI colors to improve message clarity.

### As a JS Library

Import the main function and pass arguments as an array. Note that in the event of errors, the function will throw exceptions rather than exiting the process. This allows the consuming code to handle errors as needed.

```js
import { main } from '@src/lib/main.js';

try {
  main(['arg1', 'arg2']);
} catch (error) {
  // Handle error accordingly
  console.error('An error occurred:', error);
}
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

The CLI checks for any invalid numeric input (empty strings, non-numeric values such as alphabetic strings, the literal 'NaN', or any input that cannot be converted into a valid number after removing underscores and commas).

Note: The literal 'NaN' (in any case, e.g., 'NaN', 'nan', 'NAN') is explicitly rejected as it does not represent a valid number in this CLI.

If an invalid numeric value is provided, the CLI outputs a standardized error message. For example, if a non-numeric value is provided:

```bash
Error: Invalid numeric value for argument '--number=abc': 'abc' is not a valid number. Please provide a valid number such as '--number=42'.
```

If an invalid numeric value is provided in verbose mode, the error is logged along with a full stack trace:

```bash
Error: Invalid numeric value for argument '--number=abc': 'abc' is not a valid number. Please provide a valid number such as '--number=42'.
Stack trace: <full stack trace here>
```

In addition to using the `--verbose` flag, setting the `LOG_LEVEL` environment variable to `debug` will also enable detailed error reporting with stack traces.

For example:

```bash
repository0-plot-code-lib --number=42
```

If an invalid numeric value is provided:

```bash
repository0-plot-code-lib --number=abc
```

or

```bash
repository0-plot-code-lib --number=NaN
```

The CLI will output the standardized error message and exit with code 1.

*Note: The internal numeric argument validation logic has been refactored into a consolidated function to improve maintainability, while preserving all documented behaviors.*

### Automatic Error Reporting

When an error occurs, the CLI supports automatic error report submission. If the configuration parameter `ERROR_REPORTING_URL` is defined (either in the global configuration file `.repository0plotconfig.json` or via the environment variable), the CLI will automatically submit a POST request with the following error details:

- **errorMessage**: The error message.
- **stackTrace**: The error's stack trace (if available).
- **cliArgs**: The CLI arguments provided.
- **environment**: Relevant environment details (e.g., NODE_ENV).

Example configuration snippet:

```json
{
  "ERROR_REPORTING_URL": "http://example.com/report",
  "CLI_COLOR_SCHEME": "dark",
  "LOG_LEVEL": "debug",
  "defaultArgs": ["defaultArg1", "defaultArg2"]
}
```

When present, these settings will be merged with environment variables and command line arguments, with command line arguments taking precedence.

### Global Configuration File Support

A new feature allows you to set persistent default options without having to specify them every time you run the CLI.

The CLI will look for a global configuration file named `.repository0plotconfig.json` in the current working directory and in your home directory (using the `HOME` or `USERPROFILE` environment variable). This file now enforces a strict schema. Supported configuration keys are:

- `CLI_COLOR_SCHEME` (string, e.g., "dark", "light", or "default")
- `LOG_LEVEL` (string, e.g., "debug", "info", etc.)
- `ERROR_REPORTING_URL` (string, must be a valid URL)
- `defaultArgs` (array of strings)

If the configuration file does not adhere to this schema, the CLI will log a clear error message and revert to default settings, ensuring robust and predictable behavior.

#### Example `.repository0plotconfig.json` file:

```json
{
  "CLI_COLOR_SCHEME": "dark",
  "LOG_LEVEL": "debug",
  "ERROR_REPORTING_URL": "http://example.com/report",
  "defaultArgs": ["defaultArg1", "defaultArg2"]
}
```

When present, these settings will be merged with environment variables and command line arguments, with command line arguments taking precedence.

---

## License

MIT
