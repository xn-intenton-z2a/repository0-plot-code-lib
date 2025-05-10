# Summary

Extend the plot subcommand to support generating data from mathematical expressions. Users can pass an expression of x and plot functions (e.g. sin(x), x^2, exp(-x)). The CLI will sample the expression over a configurable domain and render ASCII charts or write output to file.

# Behavior

When the first argument is plot and the --expression flag is provided:
- Ignore any --data file; generate data points by evaluating the expression for x values.
- By default, sample x from -10 to 10 with 100 evenly spaced steps.
- Support expressions using basic arithmetic, power, and common math functions (sin, cos, tan, exp, log, sqrt).
- On evaluation errors (invalid syntax, domain errors), display a descriptive error and exit with code 1.
- After data generation, delegate to existing chart rendering logic to produce ASCII art or write to a file.

# CLI Flags

--expression <formula>   Mathematical expression in x to plot.
--xmin <number>          Minimum x value; default -10.
--xmax <number>          Maximum x value; default 10.
--samples <integer>      Number of samples; default 100.
(Existing flags: --type, --width, --height, --output remain supported.)

# Examples

repository0-plot-code-lib plot --expression "sin(x)"
Generate a sine wave sampled from -10 to 10 and render a line chart as ASCII art in the console.

repository0-plot-code-lib plot --expression "x^2" --xmin 0 --xmax 5 --samples 50 --output parabola.txt
Generate 50 samples of x squared between 0 and 5 and write ASCII chart to parabola.txt.

# Testing

- Add tests in tests/unit/plot-generation.test.js to cover:
  - Valid expressions produce expected data arrays (e.g. sin(0) equals 0).
  - Sampling respects xmin, xmax, and samples flags.
  - Error case for invalid expression (e.g. "sin(") throws and logs descriptive message.
  - Integration test: mock evaluation library and console.log to assert ASCII output for a simple expression.
- Mock math evaluation (use mathjs or custom parser) to simulate function evaluation and verify chart logic is invoked.
- Ensure existing JSON/YAML data path tests remain unaffected.