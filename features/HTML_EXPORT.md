# HTML_EXPORT Feature Enhancement

This feature introduces an option to export the generated plot as a complete HTML document. When the CLI is invoked with an output file that ends with ".html", the tool will wrap the existing SVG output within a minimal HTML structure. This allows users to open the file directly in a browser and interact with the plot without needing to embed the SVG manually.

## Overview

- **Objective:** Provide an extra export format that delivers a self-contained HTML file embedding the SVG plot.
- **Benefit:** Users can quickly preview and share plots in a web-friendly format without additional steps.

## Implementation Details

### Source File Changes (src/lib/main.js):

- **Output File Detection:** Update the main function to check if the `--file` argument ends with ".html".
- **HTML Wrapping Logic:**
  - If an HTML export is requested, call the existing SVG generation routine to produce the SVG string.
  - Wrap the SVG string in a basic HTML5 template. For example:
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Plot Output</title>
      <style>
        body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; background-color: #fff; }
      </style>
    </head>
    <body>
      <!-- Embedded SVG -->
      {{SVG_CONTENT}}
    </body>
    </html>
    ```
  - Replace `{{SVG_CONTENT}}` with the generated SVG content.
- **File Writing:** Write the resulting HTML string to the specified file path.

### Testing Enhancements (tests/unit/main.test.js):

- **New Test Cases:** Add tests to simulate the CLI invocation with `--file output.html` and verify that:
  - The output file contains a standard HTML structure (e.g., contains `<!DOCTYPE html>` and `<html>` tags).
  - The embedded SVG content is present in the output.

### Documentation Updates (README.md):

- Add a section describing the new `--html` export option:

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.html
  ```

- Explain that when the output file has a `.html` extension, the tool generates a complete HTML document embedding the SVG plot. This allows for easy preview in web browsers.

## Conformance with Guidelines

- **Scope:** The changes are confined to the source file, test file, README file, and (if necessary) minor updates in the dependencies file.
- **Mission Alignment:** This enhancement contributes to making our CLI the go-to tool for formula visualisations by offering versatile and immediately viewable output formats.
- **Achievability:** The feature is achievable in a single repository and aligns with existing export functionalities without overlapping them.
