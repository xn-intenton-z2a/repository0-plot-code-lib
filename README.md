# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Enhanced Numeric Parameter Validation

This release includes improvements in numeric parameter handling. The core numeric conversion logic has been extracted into a dedicated utility module (src/lib/numericUtil.js). Both the CLI and the web interface now use this common utility to:

1. Validate numeric tokens (integer, decimal, or scientific notation) using a robust regular expression.
2. Convert numeric string tokens to native JavaScript numbers, converting any token matching 'NaN' (case insensitive) to the native NaN value.
3. Trim whitespace and provide detailed error messages when encountering invalid numeric inputs.

This centralized approach ensures consistent behavior across advanced and non-advanced mode operations, simplifying future maintenance and enhancements.

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
# Using advanced plotting with numeric conversion (supports scientific notation)
node src/lib/main.js --advanced spiral "1,NaN,5,-10,10,1"
```

The above command will invoke the spiral plotting function with parameters converted to native numbers (with 'NaN' converted accordingly).

### CLI Usage in Non-Advanced Mode

When running without the `--advanced` flag, any parameter that includes comma-separated numbers is automatically converted. For example:

```bash
node src/lib/main.js "quad:1,0,5,-10,10,1"
```

The parameters will be split by colon and any segment containing commas will be converted to an array of native numbers. The CLI output now accurately represents native NaN values as "NaN" in the JSON output.

## License

MIT
