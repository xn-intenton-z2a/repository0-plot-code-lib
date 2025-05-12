# Overview
Implement a new CLI subcommand stats to compute summary statistics (minimum, maximum, mean, median, and standard deviation) for a generated or imported data series. This mode complements existing plot and export workflows by providing quick quantitative insights without rendering images.

# CLI Subcommand
- New positional subcommand: stats
- Usage patterns:
  • repository0-plot-code-lib stats --expression <expr> --range <axis>=<min>:<max> [--samples <number>] [--json]
  • repository0-plot-code-lib stats --data-file <path> [--samples <number>] [--json]
- Flags:
  • --expression <expr>   Mathematical expression for data generation, exclusive with --data-file.
  • --range <axis>=min:max Numeric range for data generation, required with --expression.
  • --data-file <path>    Path to JSON, YAML, or CSV data file, exclusive with --expression.
  • --samples <number>    Number of intervals for data generation; default 100.
  • --json                Output results as a JSON object instead of plain text.

# Implementation
1. Subcommand Detection
   • In src/lib/main.js, before standard parseArgs, detect if first argument is 'stats'. Remove it from argument list and route to a new stats handler.
2. Stats Schema
   • Define a zod schema statsSchema requiring either expression+range or dataFile, optional samples (positive integer) and json flag (boolean).
3. Data Acquisition
   • If --data-file is provided, call existing parseDataFile to load an array of {x,y} points.
   • Otherwise use parseRange and generateData with samples to produce points.
4. Statistics Computation
   • Extract y-values from points array.
   • Compute:
     – min: Math.min over y-values
     – max: Math.max over y-values
     – mean: sum(y)/n
     – median: sorted y-values middle or average of two middle
     – stddev: sample standard deviation = sqrt(sum((y-mean)^2)/(n-1))
5. Output Formatting
   • If json flag is true, assemble {min, max, mean, median, stddev} and print JSON.stringify with two-space indentation.
   • Otherwise, print each statistic on its own line in key: value format with two decimal places.
6. Exit Behavior
   • On success exit with code 0. On missing or invalid inputs display an error and exit with code 1.

# Testing
- Add tests in tests/unit/stats-command.test.js:
  • Expression mode: verify correct numeric output for simple expressions and ranges.
  • Data-file mode: mock fs.readFileSync to return sample JSON, YAML, and CSV; verify computed statistics.
  • JSON output: --json flag produces valid JSON with expected keys and values.
  • Error cases: both expression and data-file provided, missing range, invalid samples, invalid data file path.

# Documentation
- Update USAGE.md:
  • Add a **stats** section under CLI Examples showing both plain-text and JSON output, e.g.:
    repository0-plot-code-lib stats --expression "y=x" --range x=0:10 --samples 10
    repository0-plot-code-lib stats --data-file data.csv --json
- Update README.md:
  • Under **CLI Flags** or **Examples**, add stats subcommand usage and sample output.
  • Reference the new subcommand in overview of available commands.