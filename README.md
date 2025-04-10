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

The CLI supports numeric validation via the `--number=VALUE` flag. The validation unifies error messaging as follows:

- The CLI checks for any invalid numeric input (empty strings, non-numeric values such as alphabetic strings, the literal 'NaN', or any input that cannot be converted to a valid number).
- If an invalid numeric value is provided, the CLI outputs an error indicating the invalid input and also suggests the proper format. For example:

```bash
Error: Invalid numeric value for argument '--number=abc': 'abc' is not a valid number. Please provide a valid number such as '--number=42'.
```

- In verbose mode (using the `--verbose` flag or setting `LOG_LEVEL=debug`), the error is logged along with a full stack trace:

```bash
Error: Invalid numeric value for argument '--number=abc': 'abc' is not a valid number. Please provide a valid number such as '--number=42'.
Stack trace: <full stack trace here>
```

During testing (when NODE_ENV is set to "test"), the CLI will throw an error with the message:

```bash
Invalid numeric value: abc
```

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

The CLI will output an error as detailed above, ensuring the error message consistently includes the invalid input and, in verbose mode, the additional stack trace along with a suggestion for the correct format.

### Automatic Error Reporting

When an error occurs, the CLI now supports automatic error report submission. If the configuration parameter `ERROR_REPORTING_URL` is defined (either in the global configuration file `.repository0plotconfig.json` or via the environment variable), the CLI will automatically submit a POST request with the following error details:

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

When an error is encountered (for example, using the `--simulate-error` flag), the CLI will send the error report to the specified URL and log a confirmation message upon a successful submission.

### Advanced Error Handling

The CLI includes robust error handling with configurable logging levels. By default, errors are thrown as exceptions, allowing consuming code or the dedicated CLI wrapper to decide on process termination. To enable detailed logging (which includes a full stack trace and additional context), you can either:

- Use the command line flag: `--verbose`
- Set the environment variable: `LOG_LEVEL=debug`

For example:

```bash
repository0-plot-code-lib --simulate-error --verbose
```

or

```bash
LOG_LEVEL=debug repository0-plot-code-lib --simulate-error
```

### Global Configuration File Support

A new feature allows you to set persistent default options without having to specify them every time you run the CLI.

The CLI will look for a global configuration file named `.repository0plotconfig.json` in the current working directory and in your home directory (using the `HOME` or `USERPROFILE` environment variable). This file supports the following options:

- `CLI_COLOR_SCHEME`: Set a default color theme (e.g., "dark", "light", or "default").
- `LOG_LEVEL`: Set a default logging level (e.g., "debug").
- `ERROR_REPORTING_URL`: Set the URL for automatic error report submissions.
- `defaultArgs`: An array of default command line arguments to be used when no arguments are provided.

#### Example `.repository0plotconfig.json` file:

```json
{
  "CLI_COLOR_SCHEME": "dark",
  "LOG_LEVEL": "debug",
  "ERROR_REPORTING_URL": "http://example.com/report",
  "defaultArgs": ["defaultArg1", "defaultArg2"]
}
```

When present, these settings will be merged with environment variables and command line arguments, with command line arguments taking precedence. This provides a convenient way to configure persistent defaults for your CLI usage.

---

## License

MIT
