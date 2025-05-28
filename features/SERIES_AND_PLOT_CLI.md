# Overview

Consolidate time series generation and plot rendering into a single structured CLI tool. Users can generate numeric data series from a formula and range or render that data into a line plot as SVG or PNG, all under the same entrypoint.

# Commands

## Generate Series

Users invoke:

    repository0-plot-code-lib generate \
      --expression "y=<expr>" --range "x=<start>:<end>:<step>" \
      [--format json|csv] [--output <file>]

Options:

- --expression, -e (required): Formula in form y=<expr> or <expr>.
- --range, -r (required): Range in form x=<start>:<end>:<step>.
- --format, -f (optional): Output format json (default) or csv.
- --output, -o (optional): Path to write data; prints to stdout if omitted.

## Plot Rendering

Users invoke:

    repository0-plot-code-lib plot \
      --input <data.json> [--format svg|png] [--output <file>] [--width <px>] [--height <px>]

Options:

- --input, -i (optional): JSON input file path; reads stdin if omitted.
- --format, -f (optional): svg (default) or png.
- --output, -o (optional): Path to write image; default plot.svg.
- --width, -w (optional): Canvas width in pixels; default 800.
- --height, -h (optional): Canvas height in pixels; default 600.

# CLI Structure

- Built with yargs commands: generate and plot under one entrypoint.
- Built-in flags: --help/-h and --version/-v.
- Exit code 0 on success; exit code 1 with descriptive Error: messages on failure.