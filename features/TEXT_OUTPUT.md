# TEXT_OUTPUT

## Overview
The TEXT_OUTPUT feature consolidates all text-based output modes into a single, unified module. This new feature merges the existing MARKDOWN_OUTPUT and ASCII_OUTPUT functionalities and adds support for CSV output. It provides users with flexible export options for plot data in text formats, enabling integration with documentation, spreadsheets, and other text-based reporting tools.

## Key Objectives
- **Unified Renderer Module:** Develop a centralized module (e.g., `textRenderer.js`) that can output plot data in multiple text formats including Markdown, ASCII art, and CSV.
- **CLI Flag Integration:** Update the CLI to support distinct flags (e.g., `--markdown`, `--ascii`, and `--csv`) which trigger the appropriate text output mode through the unified module.
- **Consistent Error Handling:** Reuse the robust input validation and error messaging from the PLOT_ENGINE to ensure all output modes handle errors gracefully and provide actionable feedback.
- **Documentation and Testing:** Enhance documentation with usage examples for all text output modes and write comprehensive unit tests covering typical and edge-case scenarios across all formats.

## Design & Implementation
- **Module Implementation:** Create or refactor a module named `textRenderer.js` that inspects command-line flags and converts the plot data (from PLOT_ENGINE) into the selected text format. 
- **Format Handling:**
  - *Markdown:* Wrap plot summaries or ASCII art within Markdown code blocks for seamless embedding in Markdown documents.
  - *ASCII:* Generate traditional ASCII art representations, ideal for terminal-based visualization.
  - *CSV:* Convert computed plot data into comma-separated values, including headers and rows that represent coordinate points or related data.
- **CLI Integration:** Modify `src/lib/main.js` to delegate text-based outputs to the new TEXT_OUTPUT module when one of the flags is provided.
- **User Experience:** Ensure that error messages, usage instructions, and output formatting remain consistent with other output modes. Update the README and other documentation files accordingly.

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

## Migration & Testing
- Merge functionality from existing `MARKDOWN_OUTPUT` and `ASCII_OUTPUT` modules into `TEXT_OUTPUT`, deprecating the former.
- Write unit tests in `tests/unit/textRenderer.test.js` to cover format conversions and edge-case validations for Markdown, ASCII, and CSV outputs.
- Update documentation and CONTRIBUTING guidelines to reflect the new unified text output approach.
