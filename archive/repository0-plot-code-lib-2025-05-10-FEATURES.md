features/TIME_SERIES_EXPORT.md
# features/TIME_SERIES_EXPORT.md
# TIME_SERIES_EXPORT

## Value

- Enables users to save generated time series data to disk in standard formats for downstream analysis or sharing.
- Complements existing generation output to stdout by persisting data, meeting the mission of reading and writing data in standard formats.

## Behavior

1. Dependencies
   - Use builtin fs/promises for file I O.

2. CLI Arguments
   - --expression (required): Mathematical expression as before.
   - --range (required): Numeric range definition as before.
   - --outputFile (optional): File system path where the output will be saved.
   - --format (optional): Data export format, either json or csv. Default is json.

3. Generation and Export Logic
   - Reuse TIME_SERIES_GENERATION logic to produce an array of { x, y } data points.
   - If format is json, serialize the array with JSON stringify.
   - If format is csv, build a header line x,y and join each data point as comma separated values.
   - If outputFile is provided, write the serialized data to disk at that location.
   - If outputFile is omitted, print the serialized data to stdout.
   - Validate that the format flag matches the extension of outputFile when provided.

4. Output
   - On success, if data is written to a file, print a confirmation message with the path.
   - If writing fails or format is invalid, print an error and exit with a non zero status.

## Implementation Changes

- src/lib/main.js: Extend argument parsing to include outputFile and format flags; implement file write and serialization logic.
- tests/unit/time-series-export.test.js: Add tests to cover JSON and CSV export, file write behavior, stdout fallback, and error cases using mocks for fs.
- README.md: Update usage section with examples of exporting to a file in JSON and CSV formats.
- package.json: No new dependencies required; fs/promises is builtin.features/PLOT_EXPORT.md
# features/PLOT_EXPORT.md
# PLOT_EXPORT

This feature enables the CLI to generate graphical plots from time-series data and save them as SVG or PNG files.

## Value

- Realizes the mission of producing visual representations of mathematical expressions.
- Provides users with ready-to-use image files for reports, presentations, or further analysis.
- Extends core functionality beyond raw data generation to include end-to-end plot creation.

## Behavior

1. Dependencies
   - Add chartjs-node-canvas and chart.js for rendering charts in Node.
   - Use builtin fs/promises for file I/O.

2. CLI Arguments
   - --expression (required): Mathematical expression as before.
   - --range (required): Numeric range definition as before.
   - --plotType (optional): Type of plot, one of line or scatter. Default is line.
   - --format (optional): Output image format, svg or png. Default is svg.
   - --output (optional): File path for the generated image. Default plot.svg or plot.png based on format.

3. Plot Generation Logic
   - Validate all flags with Zod schemas.
   - Reuse TIME_SERIES_GENERATION logic to produce an array of data points.
   - Initialize ChartJSCanvas with default dimensions (800x600).
   - Configure the dataset and chart options according to plotType.
   - Render the chart to the requested format buffer.
   - Write the buffer to disk at the output path.

4. Output
   - On success, print a message with the output file path.
   - On failure, print an error and exit with non-zero code.

## Implementation Changes

- src/lib/main.js: Import chartjs-node-canvas, chart.js, fs/promises, extend main to handle new flags and plotting logic.
- tests/unit/plot-export.test.js: Add tests to verify correct flag parsing, chart buffer generation, and file writing behavior (using mocks for fs).
- README.md: Update usage examples to include plot export commands and sample image outputs.
- package.json: Add chartjs-node-canvas and chart.js to dependencies.features/TIME_SERIES_GENERATION.md
# features/TIME_SERIES_GENERATION.md
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
