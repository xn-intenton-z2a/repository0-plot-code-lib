# repository0-plot-code-lib

"_Be a go-to plot library with a CLI, be the jq of formulae visualisations._"

---

## Usage

You can use the library either as a JavaScript module or via the CLI.

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

If no arguments are provided, the CLI will display a usage message:

```
No arguments provided. Please provide valid arguments.
Usage: repository0-plot-code-lib <arguments>
```

## Advanced Error Handling

The CLI now includes robust error handling. If an unexpected error occurs during execution, a detailed error message along with a stack trace will be logged. For testing or diagnostic purposes, you can trigger a simulated error using the `--simulate-error` flag:

```bash
repository0-plot-code-lib --simulate-error
```

This feature is designed to assist both users and developers in troubleshooting issues effectively.

---

## License

MIT
