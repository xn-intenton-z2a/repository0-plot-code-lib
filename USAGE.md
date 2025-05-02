# Usage Documentation for repository0-plot-code-lib

This library provides a CLI to generate plots from mathematical expressions and time series data.

## Command Line Usage

Execute the CLI by running:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --file output.svg

The tool parses the provided expression and range parameters to generate plots in SVG or PNG formats.

## API

The primary exported function is `main(args)`, which logs the provided arguments and serves as the entry point for CLI execution.

## Examples

### Running via CLI:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --file output.svg
```

### Using the API directly:

```js
import { main } from "@src/lib/main.js";

// Pass command-line arguments
main(["--expression", "y=cos(x)", "--range", "x=-5:5"]);
```
