# Purpose

Provide a robust command line interface driven by the commander library and Zod schema validation to replace manual parsing in mainCLI. Offer built in version, help output, clear flag definitions, subcommands for timeseries and plot, and consistent error reporting.

# Behavior

## Global Options

List of available flags and defaults:
--expression string required mathematical expression
--range string required numeric range start:end or start:end:step
--points integer optional positive number default 100
--format csv json ndjson optional default csv
--plot-format svg png optional default svg
--width integer optional positive number default 800
--height integer optional positive number default 600
--title string optional chart title
--output-file path optional file path to write output
--json-output flag optional force JSON output in timeseries
--version built in display tool version
--help built in display usage information

## Commands

timeseries (default) produces time series data in the selected format and writes to stdout or file
plot subcommand generates image plots in svg or png format and writes to stdout or file

# Implementation

In src/lib/main.js
1. Import Command from commander and existing Zod schemas.  
2. Instantiate new Command and set version and description.  
3. Register global options on the program.  
4. Define default command timeseries with action that calls getTimeSeries, applies serializeCSV serializeJSON or serializeNDJSON based on format, and writes to stdout or file.  
5. Define plot subcommand with its own options and action that calls getTimeSeries then generateSVG or generatePNG and writes output appropriately.  
6. In each action use Zod safeParse or parse for option validation and return or throw errors with clear messages.  
7. Remove manual argv parsing in mainCLI but maintain mainCLI export for backward compatibility or deprecate in favor of commander interface.  
8. Replace existing main function to call program.parseAsync and exit on errors.

# Testing

1. Retain existing mainCLI tests by preserving mainCLI export or adapt tests to invoke program.parseAsync for core scenarios.  
2. Add new tests to verify commander help output, version flag, unknown option handling, and validation error messages.  
3. Ensure coverage of both timeseries and plot commands through commander.  
4. Run npm test to validate all behavior remains consistent.