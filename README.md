# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Enhanced Numeric Parameter Validation

This release includes improvements in numeric parameter validation. When using parameters with colon-delimited segments containing comma-separated numbers, the CLI now provides detailed error messages if a value cannot be converted to a valid number. The error message specifies the problematic token, its segment, and the reason (e.g., empty or not a valid number), making troubleshooting more straightforward.

Note: The literal 'NaN' (case-insensitive) is now accepted as a valid numeric parameter token and treated as a special numeric value.

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

## License

MIT
