# Overview
Finalize and merge the renderPlot implementation from agentic-lib-issue-2907 to enable end-to-end SVG and PNG rendering via both CLI and programmatic API. Add comprehensive unit and integration tests for both output formats. Update USAGE.md and README.md with concrete rendering examples for users.

# CLI Interface
Add and document a --plot command that accepts:

--plot <expression|dataFile>
  Provide a mathematical expression (for example y=sin(x)) or a path to a JSON or CSV data file containing x and y arrays

--format <svg|png>
  Output format, default svg

--output <filePath>
  Path for the generated plot file; extension must match the format

Examples:
repository0-plot-code-lib --plot "y=sin(x)" --format=png --output=plot.png
repository0-plot-code-lib --plot data.json --output=chart.svg

# Programmatic API
Export an async function renderPlot(input, options):

  input: expression string or file path to JSON/CSV data
  options: {
    format: "svg" | "png",
    width?: number,
    height?: number,
    title?: string,
    xLabel?: string,
    yLabel?: string
  }

Returns:
- Promise<Buffer> when format is png
- Promise<string> when format is svg

Validate parameters with Zod, load files with fs.promises, and invoke chartjs-node-canvas for rendering.

# Implementation
- Merge the pending patch from agentic-lib-issue-2907 into src/lib/main.js.
- Refactor core plotting logic into a helper function renderPlot in src/lib/main.js or a new module under src/lib.
- Use mathjs.evaluate or compile for expressions and parse JSON/CSV data when provided.
- Use chartjs-node-canvas to generate SVG or PNG based on options.
- In CLI entrypoint detect --plot, parse inputs, call renderPlot, and write the output file using fs.promises. Exit with non-zero code on errors.
- Ensure robust error handling for invalid formulas, missing files, unsupported formats, and surface descriptive messages.

# Testing

## Unit Tests
- Add tests in tests/unit/plot-renderer.unit.test.js:
  - Mock chartjs-node-canvas and fs.promises to simulate rendering and file operations.
  - Test renderPlot returns a string when format is svg and a Buffer when format is png.
  - Validate that invalid inputs (missing expression and dataFile, unsupported format) cause Promise rejections with descriptive messages.
  - Test CLI invocation mocking process.argv, verify process exits successfully and writes output to correct path.

## Integration Tests
- Add tests in tests/integration/plot-renderer.test.js:
  - Use real chartjs-node-canvas to generate actual SVG and PNG outputs in a temporary directory.
  - Spawn the CLI with expression and sample JSON data. Verify files are created and inspect header bytes:
    - SVG files start with '<svg'
    - PNG buffers begin with the PNG signature bytes (0x89,0x50,0x4E,0x47)
  - Import renderPlot directly and invoke with valid inputs. Assert returned data matches expected type and includes chart elements.
  - Test error scenarios: invalid formula syntax, missing data file, expecting process exit code or Promise rejection.
  - Clean up generated files after tests.

# Documentation Updates
- Update USAGE.md:
  - Add a "Plot Generation" section describing --plot, --format, and --output flags with examples.
  - Show sample CLI commands and expected file output.

- Update README.md:
  - Add a "Plot Generation" section demonstrating both CLI and programmatic API usage:
    - Example import of renderPlot and calling it in code with options.
    - Provide code snippets and explain return types and error handling.
  - Ensure all new flags and API signatures are clearly documented.