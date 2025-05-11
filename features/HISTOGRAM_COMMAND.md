# Summary

Introduce a histogram subcommand to compute frequency distributions of sampled or file-based data sets and render results in ASCII histograms, tables, JSON, or CSV formats. This feature helps users quickly visualize and analyze the distribution of y values (or x values) without external tools.

# Behavior

When the user runs repository0-plot-code-lib histogram [flags]:
• If both --expression and --data are provided, log a warning and use only the expression source.
• If --expression is given, sample y values over the configured domain and number of samples.
• Otherwise if --data is given, load an array of x,y points from JSON, YAML, or CSV file, then extract the y values (or x if --axis x is set).
• Require a --bins flag specifying the number of histogram bins (integer >=1).
• Compute bin boundaries between min and max of the selected values, group values into bins, and count frequencies.
• Format the output according to --format flag: ascii (text-based bar chart), table (aligned text), json or csv.
• If --output <file> is provided, write the formatted results to the file and print confirmation; otherwise print to console.

# CLI Flags

--expression <expr>      Generate series by evaluating a JavaScript expression in x
--data <filePath>        Load points from a JSON, YAML, or CSV file
--axis <x|y>             Select axis for histogram (default y)
--xmin <number>          Minimum x value for sampling (default -10)
--xmax <number>          Maximum x value for sampling (default 10)
--samples <integer>      Number of sample points (default 100)
--bins <integer>         Number of histogram bins (required, must be >=1)
--format <ascii|table|json|csv>  Output format (default ascii)
--output <file>          File path to write histogram; omit to print to console
--help                   Show help for histogram command and exit

# Implementation Details

1. Extend main command router to handle cmd equal to histogram and invoke runHistogram(rest).
2. Create parseHistogramOptions(args) to extract flags, validate required bins and source flags, and enforce samples >=1.
3. Implement runHistogram(opts):
   • Load or generate dataPoints via generateExpressionData or loadDataFromFile.
   • Extract the array of values: y values by default or x values if opts.axis is x.
   • Compute min and max of values and determine bin width = (max - min) / bins.
   • Initialize an array of bin counts of length bins, iterate values to increment the appropriate bin index (edge values fall into first or last bin).
   • Build a result array of { binStart, binEnd, count } objects.
   • Based on opts.format:
     – ascii: render each bin as a line with a range label and a bar of '*' scaled to the maximum count.
     – table: use formatTable helper to display binStart-binEnd and count columns.
     – json: JSON.stringify(result, null, 2).
     – csv: header range,count and rows with values.
   • Write to opts.output via fs.writeFileSync if set, otherwise console.log.
   • On file errors console.error and exit with code 1.

# Testing

- Add tests in tests/unit/histogram.test.js using Vitest:
  • Expression mode: sample a known linear series, compute histogram for a small bins value and assert bin counts.
  • Data file mode: mock fs.readFileSync for JSON, YAML, and CSV, run histogram with various axis options and verify output in ascii, table, json, and csv formats.
  • Edge cases: all values identical, bins equal to one, noisy values on bin boundaries.
  • Error conditions: missing --bins, bins less than 1, missing both --expression and --data, unknown format flag, assert descriptive error messages and process.exit(1).

# Documentation

- Update README.md and USAGE.md under Available Commands to list histogram with brief summary.
- Add a Histogram section showing flags and example invocations:
  repository0-plot-code-lib histogram --expression "x" --bins 5 --format ascii
  repository0-plot-code-lib histogram --data data.csv --axis x --bins 10 --output hist.csv
- Provide sample ASCII histogram and table outputs in documentation.