# TIME_SERIES_GENERATION

This feature enables the CLI to parse a mathematical expression and a numeric range, then generate and output a time-series dataset as JSON. It forms the core of the plot-code-lib by converting user input into raw data for downstream plotting or analysis.

## Value

- Directly addresses the mission of transforming an expression and range into time-series data.
- Provides users immediate actionable output in JSON, enabling integration into pipelines or further processing.
- Lays the foundation for later plotting and file I/O features.

## Behavior

1. **Dependencies**
   - Add `mathjs` for expression parsing and evaluation.
   - Add `minimist` for CLI argument parsing.

2. **CLI Arguments**
   - `--expression` (required): A string in the form `y=sin(x)` or any valid single-variable formula.
   - `--range` (required): A string defining the variable, start, end, and optional step: `x=0:10:0.5`.

3. **Validation**
   - Use Zod schemas to ensure both `expression` and `range` flags are provided and correctly formatted.

4. **Generation Logic**
   - Parse the range into variable name, start, end, and step (default step = 1 if omitted).
   - Use mathjs to compile the right side of the expression.
   - For each value in the range, evaluate the expression and collect `{ x: number, y: number }` objects into an array.

5. **Output**
   - Print the resulting array in JSON format to stdout.

## Implementation Changes

- **src/lib/main.js**: Import `minimist` and `mathjs`, define Zod schemas, implement parsing, generation, and JSON output logic.
- **tests/unit/plot-generation.test.js**: Add tests covering valid input, missing flags, invalid formats, and correct numeric output for a known expression.
- **README.md**: Document new flags, usage examples, and sample output JSON.
- **package.json**: Add `mathjs` and `minimist` to dependencies.
