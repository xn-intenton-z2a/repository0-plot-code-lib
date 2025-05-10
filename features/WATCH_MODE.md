# Overview
Add a watch mode that monitors input data and configuration files and automatically regenerates plots, batches, and reports when files change without exiting the process.

# CLI Interface
Add a new --watch or -w flag. When specified alongside --plot, --batch, --report, or --transform, the tool enters watch mode and watches the relevant file paths for changes:

- Single Plot:
  repository0-plot-code-lib --plot data.csv --output chart.svg --watch

- Batch:
  repository0-plot-code-lib --batch tasks.yml --watch

- Report:
  repository0-plot-code-lib --report report-config.json --watch

- Transform:
  repository0-plot-code-lib --plot data.csv --transform ops.yml --watch

The process remains running until interrupted, and each time a watched file changes the same command is re-executed with updated inputs. Console logs indicate file events and regeneration results.

# Implementation

- Add chokidar dependency at version ^3.5.0 to package.json.
- In src/lib/main.js, after parsing CLI flags, detect the --watch flag. Determine watch targets:
  - For --plot: watch the dataFile path if provided and the source script for expression inputs.
  - For --batch or --report: parse the configuration file (YAML or JSON) and extract any dataFile references to watch alongside the config file itself.
  - For --transform: watch the transform specification file.
- Use chokidar.watch to monitor the determined paths. On 'change' events, debounce triggers (500ms) and invoke the original plot, batch, or report generation logic instead of exiting.
- Ensure only one generation runs at a time and queue or skip rapid successive events within the debounce window.
- On each regeneration, catch and log errors without terminating the watcher process, returning to watch state on error.

# Testing

- Add tests in tests/unit/watch-mode.test.js mocking chokidar.watch to simulate file change events.
- Verify that the CLI does not exit on watch initialization, and that regeneration logic is invoked on mock events.
- Test combinations with --plot and --batch by mocking file system reads and spying on the core rendering calls.
- Assert debounce behavior by simulating rapid change events.

# Documentation Updates

- Update USAGE.md and README.md to add a "Watch Mode" section describing the --watch flag, watched targets, and usage examples.
- Show examples for each command combination and describe console output on file change events.