# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Enhanced Numeric Parameter Validation

This release includes improvements in numeric parameter validation. When using parameters with colon-delimited segments containing comma-separated numbers, the CLI now provides detailed error messages if a value cannot be converted to a valid number. The error message specifies the problematic token, its segment, and the reason (e.g., empty or not a valid number), making troubleshooting more straightforward.

## License

MIT
