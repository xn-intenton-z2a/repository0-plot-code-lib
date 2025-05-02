# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Overview

repository0-plot-code-lib is a command-line tool designed to transform mathematical expressions into visual plots in both SVG and PNG formats. The tool supports both single and multiple expressions (separated by semicolons) and offers options for customizing the plot dimensions and labels. Key features include:

- Generating SVG plots with customizable width, height, and segment height (for multiple expressions).
- Option to convert SVG plots to PNG using the sharp library.
- Support for axis labels using the --xlabel and --ylabel flags; error messages are displayed if empty values are provided.
- Displaying range information via the --range flag.
- **Auto-Segmentation:** Use the --autoSegment flag to dynamically adjust segment heights based on expression complexity and additional elements, ensuring appropriate spacing for multi-expression plots.
- **Annotation Support:** Add custom annotations to the plot using the --annotation flag; the annotation is rendered in the top-right corner with styling based on the --textColor flag.

While the current implementation logs received command-line arguments and produces plots, further enhancements and extended plotting capabilities are planned for future releases.

## Usage

For basic usage, run:

  node src/lib/main.js [arguments]

For detailed usage instructions, including examples for generating SVG and PNG plots, please see the [Usage Guide](docs/USAGE.md).

## License

MIT