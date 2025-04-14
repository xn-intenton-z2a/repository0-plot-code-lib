# EXPRESSION_PLOT

This feature extends the CLI functionality to parse and evaluate command-line arguments for generating plots from mathematical expressions. The feature adds support for the following arguments: `--expression`, `--range`, and `--file`.

## Overview

The objective of this feature is to transform the current `main` function to support input of an expression, a data range, and an output file name. When provided with valid arguments, the application will parse these inputs and simulate generating a plot. In future iterations, this could be extended to perform actual plotting using SVG/PNG generation libraries.

## Implementation

- Update the source file `src/lib/main.js` to parse command-line arguments using a simple parameter extraction method.
- Validate input parameters and print a summary message of received input for dry-run demonstration. If the required flags are not provided, the application should display a help message or usage instructions.
- Modify error handling to gracefully report missing or invalid parameters.

## Testing

- Update the test file `tests/unit/main.test.js` to include tests that invoke the application with the new CLI parameters. This will ensure that the new arguments are parsed correctly and the expected output is provided.

## Documentation

- Update the `README.md` file to include usage examples for the new command-line interface, for instance:

```
node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.svg
```

This feature aligns with the mission of providing a go-to plot library with an expressive CLI interface to generate and visualize formula-based plots.