# Overview
Add a report generation mode that produces a standalone HTML report combining one or more plots with optional narrative sections. Users can supply a JSON or YAML configuration describing multiple plot tasks and textual sections. The tool renders each plot in memory and embeds it in an EJS-based HTML template to produce a single report file.

# CLI Interface
Introduce a new --report option that accepts a path to a configuration file in JSON or YAML format. Support the following additional flags:

--template <filePath>
  Path to a custom EJS template. If omitted, use a built-in default template that includes a title, date, and each plot with its caption or title.

--output <filePath>
  Path to write the generated HTML report. Default is report.html in the current working directory.

Example:
repository0-plot-code-lib --report report-config.yml --template custom-report.ejs --output summary.html

# Implementation
- Extend src/lib/main.js to detect the --report flag. Use fs.promises to read the configuration file and js-yaml to parse YAML or JSON.
- Define a Zod schema for the report configuration with an array of report sections. Each section can be either:
  - plotTask: same schema as in batch plotting (expression or dataFile, format, title, xLabel, yLabel)
  - markdown: a string containing narrative text in Markdown (optional)
- Loop through sections. For each plotTask, invoke the existing PLOT_RENDERER logic in memory to obtain a base64-encoded image. For each markdown section, convert the text to HTML using markdown-it.
- Load the EJS template (custom or use default built into the code). Supply template variables: reportTitle, generatedAt, and an array of renderedSections (each with HTML for text or <img> elements for plots).
- Render the EJS template to produce HTML. Write the output file using fs.promises.
- Handle errors at each step: configuration validation, file I/O, template rendering, plot generation. Exit with non-zero code and descriptive messages if errors occur.

# Testing
- Add tests in tests/unit/report-generation.test.js:
  - Mock fs.promises to provide sample config files in YAML and JSON.
  - Provide a minimal built-in template for testing. Mock PLOT_RENDERER to return predictable base64 data.
  - Invoke the CLI with the --report option and verify the HTML file is created.
  - Inspect the generated HTML string for expected tags: <html>, <head>, each <img src="data:image/png;base64,..."> and captions.
  - Test error conditions: malformed config, missing template file, template syntax error.
  - Clean up generated files after each test.

# Documentation Updates
- Update USAGE.md and README.md:
  - Add a "Report Generation" section under Usage.
  - Show examples of report configuration format, CLI invocation, and sample output.
  - Document default template features and how to supply a custom template.
