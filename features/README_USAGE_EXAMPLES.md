# README Usage Examples

Add clear, runnable examples in README.md illustrating common CLI workflows for the plot and reseed commands.

# Plot Command Examples

Show how to invoke the plot subcommand with flags for chart type, dimensions, and output file:

repository0-plot-code-lib plot --type bar --width 400 --height 300
Generates a bar chart 400x300 and prints a data summary to the console.

repository0-plot-code-lib plot --type scatter --output scatter.png
Generates a scatter plot 640x480 and writes it to scatter.png.

# Reseed Command Examples

Demonstrate dry-run mode to preview files that would be reset:

repository0-plot-code-lib reseed --dry-run
Would reset README.md
Would reset MISSION.md
Would reset src/lib/main.js
Would reset tests/unit/main.test.js
Would reset tests/unit/plot-generation.test.js
Would reset package.json

# Verification

Manually confirm README.md includes each example and matches actual CLI output. Optionally, add a simple test to assert README contains key usage lines.