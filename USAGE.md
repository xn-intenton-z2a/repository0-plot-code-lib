# Usage Documentation for repository0-plot-code-lib

This library provides a CLI to generate plots from mathematical expressions and time series data.

## Command Line Usage

Execute the CLI by running:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --file output.svg

The tool parses the provided expression and range parameters to generate plots in SVG or PNG formats.

### Dual Output Modes

- If the `--file` parameter is provided with a valid file name ending in `.svg` or `.png`, the plot will be generated and saved to that file.
- If the `--file` parameter is omitted, a text preview of the plot (a list of computed points) will be displayed on the console.

#### Examples

**Generate an SVG file:**

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --file plot.svg
```

**Generate a PNG file (simulated output):**

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-5:5" --file plot.png
```

**Text Preview (no file output):**

```sh
node src/lib/main.js --expression "y=cos(x)" --range "x=0:10"
```

## CLI Argument Validation with Zod

This version of the CLI leverages the Zod library for schema-based validation of CLI arguments. Key validations include:

- Ensuring that both `--expression` and `--range` are provided. If either is missing, the error "Error: --expression and --range are required arguments." is shown.
- Validating that the `--expression` begins with `y=` and supports only `y=sin(x)` or `y=cos(x)`.
- Validating that the `--range` argument follows the format (e.g., `x=low:high` or `x=low:high,y=low:high`), with numerical bounds.
- Confirming that the `--file` argument, if provided, ends with `.svg` or `.png`.

## Refactored CLI Parsing

The CLI argument parsing and validation logic has been refactored into distinct, single-purpose functions:
- **parseArguments:** Converts raw CLI arguments into an object.
- **validateArguments:** Validates parsed arguments using Zod with consistent error handling.
- **processRange:** Processes the range string into numeric boundaries.
- A helper function **exitWithError** centralizes error logging and process termination for uniform error handling.

This refactored approach improves code readability, maintainability, and consistency in error reporting.

## API

The primary exported function is `main(args)`, which processes the command line arguments and executes the plot generation logic.

- **Parameters:**
  - `--expression` (required): A mathematical expression (currently supports `y=sin(x)` or `y=cos(x)`).
  - `--range` (required): The range of values; expected in format `x=low:high` (optionally, `y=low:high` can also be specified).
  - `--file` (optional): The output file. Must end with `.svg` or `.png`. When omitted, a text preview is displayed.

## Error Handling

- Missing required parameters or invalid formats will result in descriptive error messages displayed on the console using a centralized error handler.
- The `--range` argument is validated to ensure it contains numerical bounds in the correct format.
- The file output name is validated so that only `.svg` or `.png` formats are accepted.
