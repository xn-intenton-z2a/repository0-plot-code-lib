# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Enhanced Numeric Parameter Validation

This release includes improvements in numeric parameter handling. The CLI now performs the following actions for parameters with colon-delimited segments containing comma-separated numbers:

1. Detailed validation with error messages that specify the problematic token, its segment, and the reason (e.g., empty or not a valid number).
2. Consistent numeric conversion: Any token matching 'NaN' (case insensitive) is converted to the native JavaScript NaN value, while other valid numeric strings are converted to Number types. This conversion is now applied in both advanced and non-advanced modes, ensuring that downstream processing always receives numbers in a uniform format.
3. Regex-based validation: Numeric tokens are now validated using a regular expression to strictly enforce valid integer or decimal formats, improving robustness and maintainability.

This ensures that advanced plotting functions, as well as other components like the web interface, receive parameters in the correct numeric format, promoting consistency and correctness in mathematical operations.

## Web Interface

In addition to the CLI, a basic web interface has been implemented. This allows users to interact with our advanced plotting capabilities via a browser.

### Features:
- An Express-powered web server listening on a configurable port (default 3000).
- A GET endpoint at `/` that serves an HTML form letting users select an advanced plot type and enter parameters.
- A POST endpoint at `/plot` that processes the form submission, invokes the corresponding advanced plotting function, and returns a confirmation page.

### Usage:

To start the web server, run:

```bash
npm run start:web
```

Then, navigate to `http://localhost:3000` (or the port specified by the `PORT` environment variable) in your browser.

## Examples

### CLI Usage with Advanced Plotting

```bash
# Using advanced plotting with numeric conversion
node src/lib/main.js --advanced spiral "1,NaN,5,-10,10,1"
```

The above command will invoke the spiral plotting function with parameters converted to native numbers (with 'NaN' converted accordingly).

### CLI Usage in Non-Advanced Mode

When running without the `--advanced` flag, any parameter that includes comma-separated numbers is automatically converted. For example:

```bash
node src/lib/main.js "quad:1,0,5,-10,10,1"
```

The parameters will be split by colon and any segment containing commas will be converted to an array of native numbers.

## License

MIT
