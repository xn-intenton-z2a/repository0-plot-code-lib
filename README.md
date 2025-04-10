# repository0-plot-code-lib

"_Be a go-to plot library with a CLI, be the jq of formulae visualisations._"

---

## Usage

You can use the library either as a JavaScript module or via the CLI. The CLI output is enhanced with ANSI colors to improve message clarity.

### As a JS Library

Import the main function and pass arguments as an array:

```js
import { main } from '@src/lib/main.js';

main(['arg1', 'arg2']);
```

### Command Line Interface (CLI)

Run the CLI directly:

```bash
repository0-plot-code-lib arg1 arg2
```

If no arguments are provided, the CLI will display a colored usage message:

```
(No arguments provided message in colored output)
Usage: repository0-plot-code-lib <arguments>
```

### Numeric Argument Validation

The CLI supports numeric validation via the `--number=VALUE` flag. The validation unifies error messaging as follows:

- The CLI checks for any invalid numeric input (empty strings, non-numeric values such as alphabetic strings, or the literal 'NaN').
- In non-verbose mode, if an invalid value is provided, it logs an error message like:

  ```
  Error: Invalid numeric value for argument '--number=abc': 'abc' is not a valid number.
  ```

- In verbose mode (using the `--verbose` flag or setting `LOG_LEVEL=debug`), the error is logged along with a full stack trace:

  ```
  Error: Invalid numeric value for argument '--number=abc': 'abc' is not a valid number.
  Stack trace: <full stack trace here>
  ```

In addition, during testing (NODE_ENV set to "test"), the CLI throws an error with the message:

```
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

The CLI will output an error as detailed above, depending on the verbose setting.

### Advanced Error Handling

The CLI includes robust error handling with configurable logging levels. By default, errors are logged concisely, showing only the error message. To enable detailed logging (which includes a full stack trace and additional context), you can either:

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

Note: The error logging now utilizes the actual error object's stack trace for more accurate debugging information when an Error is passed to the logger.

### Configurable Color Themes

You can customize the CLI output color theme by setting the environment variable `CLI_COLOR_SCHEME`. The available themes are:

- **default**: Uses standard colors (red for errors, yellow for usage, green for info, and cyan for run messages).
- **dark**: Uses bold colors (bold red for errors, bold blue for usage, bold green for info, and bold cyan for run messages).
- **light**: Uses alternative colors (red for errors, magenta for usage, blue for info, and yellow for run messages).

For example, to run the CLI with the dark theme:

```bash
CLI_COLOR_SCHEME=dark repository0-plot-code-lib arg1 arg2
```

### Custom Color Theme Configuration

In addition to using preset themes via the `CLI_COLOR_SCHEME` environment variable, you can override the default theme by providing a custom configuration file named `cli-theme.json` in the working directory. This JSON file should define the theme colors for the following keys: `error`, `usage`, `info`, and `run`. The values should be dot-separated strings representing chalk methods.

For example, a custom configuration file could look like this:

```json
{
  "error": "bold.red",
  "usage": "underline.blue",
  "info": "italic.green",
  "run": "inverse.cyan"
}
```

If the custom configuration file is invalid (either malformed JSON or missing required keys), the CLI will log an enhanced error message indicating the file path, the specific error, and recommendations to correct the JSON format or schema. It will then fall back to the default theme.

---

## License

MIT
