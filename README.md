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
(No arguments provided message in yellow)
Usage: repository0-plot-code-lib <arguments>
```

## Advanced Error Handling

The CLI now includes robust error handling with configurable logging levels. By default, errors are logged concisely, showing only the error message. To enable detailed logging (which includes the full stack trace), you can either:

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

This detailed logging is especially useful for troubleshooting and debugging. In non-verbose mode, only a succinct error message is displayed.

---

## License

MIT
