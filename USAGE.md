# Usage

repository0-plot-code-lib <command> [options]

Commands:
  plot      Generate plots from data files or mathematical expressions
  reseed    Reset repository files to seed state (dry-run available)

Options for plot:
  --expression <formula>   Mathematical expression in x to plot
  --xmin <number>          Minimum x value (default: -10)
  --xmax <number>          Maximum x value (default: 10)
  --samples <integer>      Number of samples (default: 100)
  --type <chartType>       Chart type: line, bar, scatter (default: line)
  --width <pixels>         Width of the plot in pixels (default: 640)
  --height <pixels>        Height of the plot in pixels (default: 480)
  --data <filePath>        Path to JSON or YAML data file
  --output <file>          Output file path for the rendered chart
  --help                   Show help for commands

Examples:

Plot sine wave:
  repository0-plot-code-lib plot --expression "sin(x)"

Plot parabola to file:
  repository0-plot-code-lib plot --expression "x^2" --xmin 0 --xmax 5 --samples 50 --output parabola.txt

Reseed dry run:
  repository0-plot-code-lib reseed --dry-run
