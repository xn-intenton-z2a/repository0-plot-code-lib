# TEXT_OUTPUT

## Overview
The TEXT_OUTPUT feature consolidates all text-based output modes into a single, unified module. This updated module merges functionality from the previous MARKDOWN_OUTPUT and ASCII_OUTPUT features and extends support with CSV and now HTML outputs. It enables users to export plot data in multiple text formats, facilitating integration with documentation, spreadsheets, and web presentations.

## Key Objectives
- **Unified Renderer Module:** Develop a centralized module (e.g., `textRenderer.js`) that converts plot data into various text formats: Markdown, ASCII, CSV, and HTML.
- **CLI Flag Integration:** Extend CLI support to include a `--html` flag in addition to the existing `--markdown`, `--ascii`, and `--csv` flags.
- **Consistent Error Handling:** Leverage robust input validation and error messaging from PLOT_ENGINE to ensure consistency across all output modes.
- **Documentation & Testing:** Update user guides and tests to cover the new HTML output alongside existing formats.

## Design & Implementation
### Module Implementation
- **Format Handling:**
  - *Markdown:* Wrap plot summaries or ASCII art within Markdown code blocks for embedding in Markdown documents.
  - *ASCII:* Generate classic ASCII art representations, suitable for terminal displays.
  - *CSV:* Convert plot data into comma-separated values, including headers and rows that represent data points.
  - *HTML:* Generate an HTML representation of the plot data. This may include a styled table or div structure, allowing users to embed the output directly into web pages or reports.

### CLI Integration
- Update `src/lib/main.js` to delegate text-based outputs to the unified `textRenderer.js` module when one of the flags is provided. The addition of the `--html` flag will trigger HTML conversion logic.

### User Experience & Error Handling
- Ensure that all text outputs follow a consistent format with actionable error messages. Update the README and CONTRIBUTING guidelines to include examples for HTML output.

## Usage Examples
- **Markdown Output:**
  ```bash
  node src/lib/main.js --markdown "quad:1,0,0,-10,10,1"
  ```
- **ASCII Output:**
  ```bash
  node src/lib/main.js --ascii "sine:1,1,0,0,360,30"
  ```
- **CSV Output:**
  ```bash
  node src/lib/main.js --csv "quad:1,0,0,-10,10,1"
  ```
- **HTML Output:**
  ```bash
  node src/lib/main.js --html "linear:2,3,-10,10,1"
  ```

## Migration & Testing
- **Module Consolidation:** Merge legacy modules related to MARKDOWN_OUTPUT and ASCII_OUTPUT into the updated TEXT_OUTPUT module.
- **Unit Testing:** Add comprehensive tests in `tests/unit/textRenderer.test.js` to cover conversions for Markdown, ASCII, CSV, and HTML outputs.
- **Documentation:** Revise README and CONTRIBUTING documents to reflect the unified text output approach and include HTML examples.
