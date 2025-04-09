# Overview

The MARKDOWN_OUTPUT feature introduces a mode to generate plot outputs formatted in Markdown. This feature allows users to produce plots embedded within Markdown documents — using code blocks for ASCII art, inline text summaries, and other Markdown elements. It is designed to seamlessly integrate with the existing CLI and plotting engines, offering an alternative output format that enhances documentation and report generation workflows.

# Key Objectives

- **Markdown Renderer Module:** Develop a dedicated module that takes plot data and transforms it into a Markdown-formatted output. This involves wrapping ASCII art or plot summaries within Markdown code blocks and other relevant Markdown syntax.
- **CLI Flag Integration:** Extend the command-line interface to handle a new flag (e.g., `--markdown`). When this flag is detected, the application invokes the Markdown renderer instead of the default SVG or ASCII outputs.
- **Consistent Error Handling:** Reuse existing input validation and error handling logic to ensure that malformed inputs are reported clearly. Users should receive consistent feedback across all output modes.
- **Documentation and Testing:** Update documentation (README.md) with usage examples and ensure that unit tests cover both typical and edge case scenarios for Markdown rendering.

# Design & Implementation

- **Module Implementation:** Create a new module (e.g., `markdownRenderer.js`) responsible for converting plot data into a Markdown formatted string. This should support embedding ASCII art, descriptive text, and any additional formatting as required.
- **Input Processing:** Integrate the Markdown renderer with the main CLI logic. When the `--markdown` flag is present, the main execution should route to the Markdown renderer.
- **User Feedback:** Similar to the ASCII and SVG outputs, provide clear output and error messages directly in the console. The output should be formatted in Markdown style to be easily copy-pastable into documents.
- **Integration with Existing Features:** Ensure that this feature uses the plotting data produced by the PLOT_ENGINE, so that any enhancements in data formatting or validations carry over seamlessly.

# Usage Examples

- **CLI Markdown Output:**
  ```bash
  node src/lib/main.js --markdown "quad:1,0,0,-10,10,1"
  ```

- **Interactive Mode Support:**
  In interactive mode, allow switching to Markdown output by accepting user commands or flags, integrating with the existing REPL functionality.

# Testing & Documentation

- **Unit Tests:** Write unit tests for the `markdownRenderer.js` module covering the conversion of plot data into Markdown formatted output, ensuring edge cases (e.g., empty or malformed input) are well handled.
- **Documentation Updates:** Update the README.md and other documentation files to include a section on Markdown output usage, examples, and potential integration scenarios.
- **Compliance:** Ensure that the feature aligns with the coding standards and guidelines in CONTRIBUTING.md and supports node v20+ as per package.json requirements.
