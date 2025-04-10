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

## Advanced Error Handling

The CLI now includes robust error handling with configurable logging levels. By default, errors are logged concisely, showing only the error message. To enable detailed logging (which includes a full stack trace and additional context), you can either:

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

Note: Error logging is handled inline within the main module to simplify dependencies.

## Configurable Color Themes

You can customize the CLI output color theme by setting the environment variable `CLI_COLOR_SCHEME`. The available themes are:

- **default**: Uses standard colors (red for errors, yellow for usage, green for info, and cyan for run messages).
- **dark**: Uses bold colors (bold red for errors, bold blue for usage, bold green for info, and bold cyan for run messages).
- **light**: Uses alternative colors (red for errors, magenta for usage, blue for info, and yellow for run messages).

For example, to run the CLI with the dark theme:

```bash
CLI_COLOR_SCHEME=dark repository0-plot-code-lib arg1 arg2
```

---

## License

MIT
