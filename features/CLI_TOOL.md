# Purpose

Provide a robust command line interface driven by commander and Zod schema validation to replace the existing manual parser. Deliver built-in version and help outputs, explicit flag definitions, subcommands for timeseries and plot, and consistent error reporting.

# Behavior

## Global Options

- --expression <expr>   required mathematical expression in x
- --range <start:end[:step]>   required numeric range; step overrides points
- --points <number>   optional positive integer default 100
- --format <csv|json|ndjson>   optional default csv
- --plot-format <svg|png>   optional default svg (plot command only)
- --width <number>   optional positive integer default 800 (plot command only)
- --height <number>  optional positive integer default 600 (plot command only)
- --title <string>   optional chart title (plot command only)
- --output-file <path>   optional file path to write output
- --version   built-in display tool version
- --help   built-in display usage information

## Commands

- timeseries (default) produces time series data in selected format and writes to stdout or file
- plot generates SVG or PNG plots from the expression, writes to stdout or file

# Implementation

1. In src/lib/main.js, remove manual argv parsing in mainCLI and import Command from commander.
2. Instantiate program using new Command(), set version to package.json version, and add a description.
3. Register global options on program and plot subcommand with required, default, and choice constraints.
4. Integrate Zod schemas via a preAction hook to validate and coerce options before command actions.
5. Define timeseries as the default command: action calls getTimeSeries, serializes output based on format, writes to file if output-file is set or to stdout.
6. Define plot subcommand: action calls getTimeSeries, then generateSVG or generatePNG, writes to file or stdout.
7. Invoke program.parseAsync(process.argv) in main(), handle errors via exitOverride to print messages and exit with code 1.
8. Retain legacy mainCLI export for backward compatibility but deprecate internally after tests are updated.

# Testing

- Adapt existing mainCLI tests to invoke program.parseAsync for core scenarios.
- Add tests to verify commander help output, version flag, unknown option handling, and validation error messages.
- Ensure coverage of both timeseries and plot commands through commander, including writing to files and streams.