# Overview
Finalize and merge the PLOT_RENDERER feature by implementing the renderPlot function and completing end-to-end SVG and PNG plot generation via the CLI and programmatic API. Ensure integration tests validate actual rendering and update documentation to guide users through CLI, API, and example workflows.

# CLI Interface
Add and document a new --plot command that accepts:

--plot <expression|dataFile>
  Provide a mathematical expression (e.g. y=sin(x)) or a path to a JSON/CSV file with x and y arrays.

--format <svg|png>
  Output format, default svg.

--output <filePath>
  Path for the generated plot file. Extension must match format.

Examples:
repository0-plot-code-lib --plot "y=sin(x)" --format=png --output=plot.png
repository0-plot-code-lib --plot data.json --output=chart.svg

# Programmatic API
Export a new async function renderPlot(input, options):
- input: expression string or file path to JSON/CSV data.
- options: { format: "svg"|"png", width?: number, height?: number, title?: string, xLabel?: string, yLabel?: string }
- Returns: Promise<Buffer> for png or string for svg.
- Validate parameters with Zod, read files with fs.promises, and invoke chartjs-node-canvas for rendering.

# Implementation
- Merge pending patch from agentic-lib-issue-2907 into src/lib/main.js.
- Refactor plot logic into a helper function renderPlot in the same file or a new module under src/lib.
- Add chartjs-node-canvas dependency at version ^4.1.0 if not present.
- Detect CLI args for --plot, parse input, pass into renderPlot, and write output file. Exit with non-zero code on errors.
- Ensure robust error handling for invalid formulas, missing files, and unsupported formats.

# Integration Tests
Add a new test file tests/integration/plot-renderer.test.js:
- Use real chartjs-node-canvas to generate actual SVG and PNG outputs in a temporary directory.
- Spawn the CLI with sample expression and sample JSON data. Verify files are created and inspect header bytes:
  - SVG: output starts with '<svg'.
  - PNG: output buffer begins with PNG signature (0x89,0x50,0x4E,0x47).
- Import renderPlot directly and invoke with valid inputs. Assert returned data matches expected type and contains chart elements.
- Clean up generated files after tests.
- Test error scenarios: invalid formula syntax, missing data file, and expect process exit code or Promise rejection with descriptive messages.

# Documentation Updates
- Update README.md:
  - Add a "Plot Generation" section showing CLI and API usage examples with code snippets.
- Update USAGE.md:
  - Provide reference for --plot flags, expected inputs, and sample invocations.
  - Include guidance on installing chartjs-node-canvas if needed.
- Ensure CHANGELOG.md notes the merge of PLOT_RENDERER and inclusion of integration tests.