USAGE.md
# USAGE.md
# Usage

repository0-plot-code-lib <command> [options]

Commands:
  plot      Generate plots from data files or mathematical expressions
  stats     Compute descriptive statistics for datasets
  reseed    Reset repository files to seed state (dry-run available)
  serve     Start HTTP API server for plot and stats endpoints

Options for plot:
  --expression <formula>   Mathematical expression in x to plot
  --xmin <number>          Minimum x value (default: -10)
  --xmax <number>          Maximum x value (default: 10)
  --samples <integer>      Number of samples (default: 100)
  --type <chartType>       Chart type: line, bar, scatter (default: line)
  --width <pixels>         Width of the plot in pixels (default: 640)
  --height <pixels>        Number of characters vertically in the chart (default: 480)
  --data <filePath>        Path to JSON, YAML, or CSV data file
  --output <file>          Output file path for the rendered chart
  --help                   Show help for commands

Options for stats:
  --expression <formula>   Mathematical expression in x to sample
  --data <filePath>        Path to JSON, YAML, or CSV data file
  --xmin <number>          Minimum x value (default: -10)
  --xmax <number>          Maximum x value (default: 10)
  --samples <integer>      Number of samples (default: 100)
  --precision <integer>    Decimal places in numeric output (default: 4)
  --format <table|json|csv> Output format (default: table)
  --output <file>          File to write statistics; omit to print

Examples:

Plot sine wave:
  repository0-plot-code-lib plot --expression "sin(x)"

Plot parabola to file:
  repository0-plot-code-lib plot --expression "x^2" --xmin 0 --xmax 5 --samples 50 --output parabola.txt

Plot data from JSON file:
  repository0-plot-code-lib plot --data data.json --width 80 --height 20

Plot data from CSV and write to file:
  repository0-plot-code-lib plot --data measurements.csv --type scatter --output chart.txt

Plot data from YAML file:
  repository0-plot-code-lib plot --data config.yaml

Reseed dry run:
  repository0-plot-code-lib reseed --dry-run

Serve HTTP API:
  repository0-plot-code-lib serve --port 3000

Stats command examples:
  repository0-plot-code-lib stats --expression "x^2" --samples 5
  repository0-plot-code-lib stats --data data.csv --format json --output summary.json

Endpoints:
  GET /plot?expression=<expr>&xmin=<num>&xmax=<num>&samples=<int>
    - Returns JSON array of { x, y } points. Default xmin=0 and xmax=samples-1 if not provided.
  GET /plot?expression=<expr>&samples=<int>&outputFormat=ascii
    - Returns ASCII art chart as text/plain.
  GET /stats?expression=<expr>&xmin=<num>&xmax=<num>&samples=<int>
    - Returns descriptive statistics JSON: x_min, x_max, x_mean, x_median, x_stddev, y_min, y_max, y_mean, y_median, y_stddev
