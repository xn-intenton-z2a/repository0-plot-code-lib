# Overview

Introduce a new CLI subcommand `ascii` to render plots directly in the terminal as ASCII art. This feature leverages the existing data generation pipeline to produce a simple textual visualization without depending on external chart services.

# CLI ASCII Art Subcommand

Add a top-level subcommand `ascii` in `main` alongside `stats` and `plot`:

- Invocation: `repository0-plot-code-lib ascii [common plot flags] [--width-chars <number>] [--height-rows <number>] [--plot-char <char>]`
- Common plot flags: `--expression`, `--range`, `--dataFile`, `--samples` (as in `plot`).
- New flags:
  - `--width-chars <number>` Target number of character columns (default: 80).
  - `--height-rows <number>` Target number of rows in ASCII output (default: 20).
  - `--plot-char <char>` Character used to draw the line (default: `*`).

Behavior:
1. Parse arguments via `parseArgs`, validate expression or dataFile as in `runPlotCli`.
2. Generate or load data points using `generateData` or file parser.
3. Scale and map points onto an ASCII grid of specified dimensions.
4. Draw axes and plot line with the chosen character; empty cells use space.
5. Write the multi-line ASCII art string to stdout and exit with code 0.
6. On missing required flags, print error to stderr and exit with code 1.

# ASCII Renderer Implementation

Implement a helper `renderAsciiChart(points, options)`:

- Accepts an array of `{x, y}` and options `{ widthChars, heightRows, plotChar }`.
- Compute min/max of x and y, map each point to integer grid coordinates.
- Initialize a 2D array of spaces, draw axes at row 0 (x axis) and leftmost column (y axis).
- For each point, set the corresponding cell to `plotChar` (overwriting axes as needed).
- Join rows into lines with trailing spaces trimmed and return the joined string.

# Testing

Add unit tests in `tests/unit/plot-generation.test.js` or a new `tests/unit/ascii-art.test.js`:

- Test ASCII output for a simple line, e.g., `y=x` with `samples=5`, `width-chars=10`, `height-rows=5`, verifying diagonal shape.
- Test defaults produce 20 rows by 80 columns of ASCII chart with header row including axis labels.
- Test error handling when neither expression nor dataFile is provided.
- Mock `process.stdout.write` and `process.exitCode` to assert behavior.

# Documentation Updates

Update `USAGE.md` and `README.md`:

- Under CLI Subcommands, document `ascii` with its flags and defaults.
- Provide example:
  `repository0-plot-code-lib ascii --expression "y=x" --range "x=0:4" --samples 4 --width-chars 20 --height-rows 10 --plot-char #`
- Illustrate a sample ASCII chart in the README.
