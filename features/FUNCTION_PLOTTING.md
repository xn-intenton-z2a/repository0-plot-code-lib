# Summary

Extend the plot subcommand to support generating data from mathematical expressions using the --expression flag. This enables users to define functions of x and render them as ASCII charts or write output to a file.

# Behavior

When the first argument is plot and the --expression flag is provided:

- Ignore any --data file and generate data points by evaluating the expression at sample positions.
- Default domain is from xmin -10 to xmax 10 with 100 samples unless overridden.
- Expressions support basic arithmetic, power, and math functions such as sin, cos, tan, exp, log, sqrt.
- On evaluation errors, display a descriptive error message and exit with code 1.
- After data generation, delegate to existing chart rendering logic to produce ASCII art or write to a file.

# CLI Flags

- --expression <formula>   Mathematical expression in x to plot.
- --xmin <number>          Minimum x value; default -10.
- --xmax <number>          Maximum x value; default 10.
- --samples <integer>      Number of samples; default 100.
- Other existing flags: --type, --width, --height, --output remain supported.

# Examples

repository0-plot-code-lib plot --expression 'sin(x)'
Generate a sine wave sampled from -10 to 10 and render a line chart as ASCII art in the console.

repository0-plot-code-lib plot --expression 'x^2' --xmin 0 --xmax 5 --samples 50 --output parabola.txt
Generate 50 samples of x squared between 0 and 5 and write ASCII chart to parabola.txt.

# Testing

Add or update tests in tests/unit/plot-generation.test.js:

- Test valid expressions produce expected data arrays; for example, invoking main with args ['plot','--expression','sin(x)'] returns an array where the value at x=0 is 0.
- Test sampling respects xmin, xmax, and samples flags by verifying first and last x coordinates.
- Test error case for invalid expression, for example sin(, throws and logs a descriptive message with exit code 1.
- Integration test: mock evaluation library and capture console.log output to assert ASCII chart rendering for a simple expression like x.
- Ensure code coverage includes the --expression branch in coverage reports.

# Documentation

Update README.md to include Usage Examples for the --expression flag under Plot Command Examples:

- Add an example for plot --expression 'sin(x)' showing expected ASCII art output or summary.
- Confirm that README examples match actual CLI output by running the command and copying output.
