# TEXT_OUTPUT

## Overview
This feature consolidates all text-based output modes into a single, unified module. It merges functionality from the previous MARKDOWN_OUTPUT and ASCII_OUTPUT features and extends support to include CSV, HTML, and now JSON outputs. This unified renderer enables users to export plot data in multiple text formats, facilitating integration with documentation, web presentations, spreadsheets, and further programmatic processing.

## Key Objectives
- **Unified Renderer Module:** Develop a centralized module (e.g., `textRenderer.js`) that converts plot data into various text formats: Markdown, ASCII, CSV, HTML, and JSON.
- **CLI Flag Integration:** Extend CLI support to incorporate output flags such as `--markdown`, `--ascii`, `--csv`, `--html`, and the new `--json` flag.
- **Consistent Error Handling:** Leverage robust input validation and error messaging from the PLOT_ENGINE to ensure consistency across all output modes.
- **Documentation & Testing:** Update user guides and tests to capture usage examples for JSON output alongside the existing formats.

## Design & Implementation
### Module Implementation
- **Format Handling:**
  - *Markdown:* Encapsulate plot summaries or ASCII art within Markdown code blocks.
  - *ASCII:* Generate classic ASCII art representations suited for terminal displays.
  - *CSV:* Convert plot data into comma-separated values with appropriate headers and rows.
  - *HTML:* Produce an HTML representation of the plot data, potentially as a styled table or div structure.
  - *JSON:* Introduce JSON output to enable structured data interchange, facilitating integration with other tools and workflows. The JSON output will include keys for plot metadata, data points, and summary statistics.

### CLI Integration
- Update `src/lib/main.js` to delegate text-based outputs to the unified `textRenderer.js` module when one of the flags is provided.
- The introduction of the `--json` flag will trigger JSON conversion logic, ensuring that users can effortlessly export structured data.

### Testing & Documentation
- **Module Consolidation:** Ensure smooth merging of legacy modules related to MARKDOWN_OUTPUT and ASCII_OUTPUT into the enhanced TEXT_OUTPUT module.
- **Unit Testing:** Implement comprehensive tests (e.g., in `tests/unit/textRenderer.test.js`) to cover conversions for Markdown, ASCII, CSV, HTML, and JSON outputs.
- **Documentation:** Revise the README and CONTRIBUTING guides to reflect the unified text output approach and include examples demonstrating JSON output usage.

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
- **JSON Output:**
  ```bash
  node src/lib/main.js --json "expr:Math.sin(x)*x:-10,10,0.5"
  ```

This enhancement to the TEXT_OUTPUT feature ensures that the repository not only supports various text-based data formats but also fulfills the mission of being a versatile tool for formula visualization with robust pipeline integration.