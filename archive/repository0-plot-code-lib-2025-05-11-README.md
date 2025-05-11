# repository0-plot-code-lib

A CLI-driven plot and reseed tool for formula visualisations and repository state management.

## Installation

```bash
npm install -g @xn-intenton-z2a/repository0-plot-code-lib
```

## Usage

General syntax:
```bash
repository0-plot-code-lib <command> [flags]
```

Available Commands:
- plot      Generate plots from data files or mathematical expressions
- reseed    Reset repository files to seed state (dry-run available)

## Plot Subcommand

Supported Flags:
- --type <chartType>    Chart type: line, bar, scatter (default: line)
- --width <number>      Number of characters horizontally (default: 640)
- --height <number>     Number of characters vertically (default: 480)
- --data <filePath>     Path to JSON, YAML, or CSV data file
- --expression <expr>   Mathematical expression in x to plot
- --xmin <number>       Minimum x value for expression domain (default: -10)
- --xmax <number>       Maximum x value for expression domain (default: 10)
- --samples <integer>   Number of sample points (default: 100)
- --output <file>       Output file path for the rendered chart; omit to render to console
- --help                Show help for plot command

Examples:

Plot a bar chart 400x300 to the console:
```bash
repository0-plot-code-lib plot --type bar --width 400 --height 300
# Generates a bar chart 400x300 and prints a data summary to the console.
```

Read CSV data and write a line chart to a file:
```bash
repository0-plot-code-lib plot --data values.csv --type line --output chart.txt
# Reads CSV data, renders a line chart, and writes ASCII art to chart.txt.
```

## Reseed Subcommand

The reseed command resets core repository files to their initial seed state.

Flags:
- --dry-run    Show the list of files that would be reset without performing writes
- --force      (Planned) Overwrite each target file with its initial seed version

Example:
```bash
repository0-plot-code-lib reseed --dry-run
# Would reset README.md
# Would reset MISSION.md
# Would reset src/lib/main.js
# Would reset tests/unit/main.test.js
# Would reset tests/unit/plot-generation.test.js
# Would reset package.json
```

## License

MIT
