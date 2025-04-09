# EXAMPLES Feature Specification

## Overview
This feature provides a dedicated set of usage examples and demos for both new users and experienced developers. By offering clear, accessible examples of the CLI commands, HTTP API requests, and library integrations, the repository enhances its mission to be the go-to plot library for formula visualizations.

## Implementation Details
- **Documentation File:**
  - Create an `EXAMPLES.md` file at the repository root.
  - Include sections for CLI usage, HTTP API usage, and programmatic (library) integration.
- **CLI Examples:**
  - Showcase common commands such as plotting a basic function (`--plot "sin(x)"`) with and without color, diagnostics (`--diagnostics`), and file export (`--export myplot.txt`).
  - Provide command-line snippets with expected outputs.
- **HTTP API Examples:**
  - Detail how to invoke the `/plot` endpoint using both GET and POST methods with sample parameters.
  - Include sample curl commands and JSON payloads.
- **Library Integration:**
  - Demonstrate importing and using the plotting function directly in a JavaScript module, with a simple code snippet.

## Testing and Documentation
- **Verification:**
  - Ensure all example commands work as intended in the current environment.
  - Validate that examples are updated in both the `EXAMPLES.md` and linked from the README.md.
- **Integration:**
  - Update the README.md with a pointer to `EXAMPLES.md` for additional details on usage.

## Usage Example
- **CLI Command:**
  - Run: `node src/lib/main.js --plot "sin(x)"`
  - Expected output: ASCII plot of sin(x) with default settings.
- **HTTP Request:**
  - Command: `curl "http://localhost:3000/plot?formula=sin(x)&interval=-15,15&step=0.5"`
  - Expected: JSON response containing the ASCII plot or an error message if parameters are invalid.
- **Library Example:**
  - Include a code snippet demonstrating how to import and use the plotting function from the repository.
