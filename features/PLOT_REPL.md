# Purpose

This feature adds an interactive REPL mode to allow users to enter formulas and options dynamically at the command line and immediately view plots.

# Behavior

When invoked as repository0-plot-code-lib repl, the CLI enters an interactive mode. Users see a prompt where they can type commands:
- Enter a mathematical formula to plot.
- Optionally specify parameters inline using syntax range=min,max format=ascii|json|svg width=n height=n.
- The REPL evaluates the input, generates the plot using existing logic, and displays the result.
- Typing exit or quit ends the session.

# Implementation

In src/lib/main.js update main to detect 'repl'. When repl is invoked:
- Use Node's readline module to create an interactive prompt.
- For each input line, parse the formula and inline option flags using zod or simple parsing.
- Reuse existing plot-generation functionality from the plot command to compute data points and format output.
- Write output to stdout and re-display the prompt.
- Handle invalid input by printing an error message without exiting the REPL.

# Testing

In tests/unit/main.test.js add unit tests for REPL mode:
- Mock readline.createInterface to simulate user inputs and capture console output.
- Provide a sequence of valid and invalid inputs, verify correct plot output or error messages.
- Ensure that exit and quit commands close the interface.

# Documentation

Update README.md and USAGE.md to include a new section "REPL Mode". Describe how to start the REPL, show sample interactive session including formula input and resulting ASCII or JSON output.